/*
  Hero "liquid shell": three translucent, noise-displaced shells drawn additively with a fresnel rim.
  Loaded as its own chunk after first paint (see LiquidCanvas in components/Hero.jsx).

  Performance budget vs the previous version:
  - Indexed partial sphere (top ~70%, the lower part is always below the fold) instead of a
    non-indexed IcosahedronGeometry(1.8, 96): ~13k vertices per shell instead of 564,540.
  - forceSinglePass: additive blending is order-independent, so the back+front double pass for
    DoubleSide transparent materials is wasted work. 3 draws per frame instead of 6.
  - The per-pixel "folds" noise moved to the vertex shader; the fragment shader has no noise.
  - Pixel ratio capped at 1.5 (1.25 on small screens), MSAA only on low-DPR screens, and the
    pixel ratio steps down automatically if frames run slow. Last resort is 30fps.
  - Shaders compile asynchronously before the first frame, the loop pauses off-screen, and a
    single static frame is drawn for prefers-reduced-motion.
*/
import {
  WebGLRenderer, Scene, PerspectiveCamera, SphereGeometry, ShaderMaterial, Mesh, Group, Vector3,
  BufferGeometry, BufferAttribute, Points, PointsMaterial, DoubleSide, AdditiveBlending,
} from 'three';

const NOISE_GLSL = /* glsl */`
  vec3 mod289(vec3 x){return x-floor(x*(1.0/289.0))*289.0;}
  vec4 mod289(vec4 x){return x-floor(x*(1.0/289.0))*289.0;}
  vec4 permute(vec4 x){return mod289(((x*34.0)+1.0)*x);}
  vec4 taylorInvSqrt(vec4 r){return 1.79284291400159-0.85373472095314*r;}
  float snoise(vec3 v){
    const vec2 C=vec2(1.0/6.0,1.0/3.0); const vec4 D=vec4(0.0,0.5,1.0,2.0);
    vec3 i=floor(v+dot(v,C.yyy)); vec3 x0=v-i+dot(i,C.xxx);
    vec3 g=step(x0.yzx,x0.xyz); vec3 l=1.0-g; vec3 i1=min(g.xyz,l.zxy); vec3 i2=max(g.xyz,l.zxy);
    vec3 x1=x0-i1+C.xxx; vec3 x2=x0-i2+C.yyy; vec3 x3=x0-D.yyy;
    i=mod289(i);
    vec4 p=permute(permute(permute(i.z+vec4(0.0,i1.z,i2.z,1.0))+i.y+vec4(0.0,i1.y,i2.y,1.0))+i.x+vec4(0.0,i1.x,i2.x,1.0));
    float n_=0.142857142857; vec3 ns=n_*D.wyz-D.xzx;
    vec4 j=p-49.0*floor(p*ns.z*ns.z); vec4 x_=floor(j*ns.z); vec4 y_=floor(j-7.0*x_);
    vec4 x=x_*ns.x+ns.yyyy; vec4 y=y_*ns.x+ns.yyyy; vec4 h=1.0-abs(x)-abs(y);
    vec4 b0=vec4(x.xy,y.xy); vec4 b1=vec4(x.zw,y.zw);
    vec4 s0=floor(b0)*2.0+1.0; vec4 s1=floor(b1)*2.0+1.0; vec4 sh=-step(h,vec4(0.0));
    vec4 a0=b0.xzyw+s0.xzyw*sh.xxyy; vec4 a1=b1.xzyw+s1.xzyw*sh.zzww;
    vec3 p0=vec3(a0.xy,h.x); vec3 p1=vec3(a0.zw,h.y); vec3 p2=vec3(a1.xy,h.z); vec3 p3=vec3(a1.zw,h.w);
    vec4 norm=taylorInvSqrt(vec4(dot(p0,p0),dot(p1,p1),dot(p2,p2),dot(p3,p3)));
    p0*=norm.x; p1*=norm.y; p2*=norm.z; p3*=norm.w;
    vec4 m=max(0.6-vec4(dot(x0,x0),dot(x1,x1),dot(x2,x2),dot(x3,x3)),0.0); m=m*m;
    return 42.0*dot(m*m,vec4(dot(p0,x0),dot(p1,x1),dot(p2,x2),dot(p3,x3)));
  }`;

const VERT = NOISE_GLSL + /* glsl */`
  uniform float uTime; uniform float uAmp; uniform float uFreq; uniform float uSeed;
  varying vec3 vN; varying vec3 vV; varying float vFold;
  vec3 disp(vec3 p) {
    vec3 q = p + vec3(uSeed);
    float n = snoise(q * uFreq + vec3(0.0, uTime * 0.25, uTime * 0.15));
    float n2 = snoise(q * uFreq * 2.2 - vec3(uTime * 0.18)) * 0.35;
    return p * (1.0 + (n + n2) * uAmp);
  }
  void main() {
    vec3 nrm = normalize(normal);
    vec3 tng = normalize(cross(nrm, abs(nrm.y) < 0.99 ? vec3(0.0,1.0,0.0) : vec3(1.0,0.0,0.0)));
    vec3 btg = cross(nrm, tng);
    float eps = 0.015;
    vec3 d0 = disp(position), d1 = disp(position + tng * eps), d2 = disp(position + btg * eps);
    vec4 mv = modelViewMatrix * vec4(d0, 1.0);
    vN = normalize(normalMatrix * normalize(cross(d1 - d0, d2 - d0)));
    vV = normalize(-mv.xyz);
    vFold = 0.55 + 0.45 * snoise(d0 * 1.6 + vec3(0.0, uTime * 0.12, 0.0));
    gl_Position = projectionMatrix * mv;
  }`;

const FRAG = /* glsl */`
  uniform vec3 uColor; uniform float uRimPow; uniform float uRimStr; uniform float uFill;
  varying vec3 vN; varying vec3 vV; varying float vFold;
  void main() {
    float ndv = abs(dot(normalize(vN), normalize(vV)));
    float rim = pow(1.0 - ndv, uRimPow);
    float edge = rim * uRimStr;
    float body = uFill * vFold * (0.4 + 0.6 * (1.0 - ndv));
    float r2 = rim * rim; float r6 = r2 * r2 * r2;
    vec3 col = uColor * (edge + body) + vec3(1.0, 0.97, 0.85) * r6 * 0.5;
    gl_FragColor = vec4(col, clamp(edge + body, 0.0, 1.0));
  }`;

export function mountHeroScene(el) {
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const small = el.clientWidth < 900;
  const maxDpr = Math.min(window.devicePixelRatio || 1, small ? 1.25 : 1.5);

  let renderer;
  try {
    renderer = new WebGLRenderer({ antialias: maxDpr < 1.5, alpha: true, powerPreference: 'default' });
  } catch {
    return () => {};                                   // no WebGL: the CSS glow behind the canvas stays as the visual
  }
  let dpr = maxDpr;
  renderer.setPixelRatio(dpr);
  renderer.setClearColor(0x000000, 0);
  el.appendChild(renderer.domElement);

  const scene = new Scene();
  const camera = new PerspectiveCamera(34, 1, .1, 60);
  camera.position.set(0, 0.15, 7.2);

  // Only the top 70% of the sphere is ever on screen, so the bottom is never built.
  const geo = small
    ? new SphereGeometry(1.8, 112, 48, 0, Math.PI * 2, 0, Math.PI * 0.7)
    : new SphereGeometry(1.8, 176, 72, 0, Math.PI * 2, 0, Math.PI * 0.7);
  const accent = new Vector3(0xe5 / 255, 0xbe / 255, 0x3e / 255);   // raw sRGB values, as the shader writes them straight out
  const group = new Group(); scene.add(group);
  const shells = [[1.00, 0.0, 2.6, 1.15, .045, .11], [0.93, 3.7, 3.2, .75, .035, .13], [0.85, 8.1, 3.8, .55, .03, .15]].map(([scale, seed, rimPow, rimStr, fill, amp]) => {
    const material = new ShaderMaterial({
      uniforms: { uTime: { value: 0 }, uAmp: { value: amp }, uFreq: { value: .7 }, uSeed: { value: seed }, uColor: { value: accent },
        uRimPow: { value: rimPow }, uRimStr: { value: rimStr }, uFill: { value: fill } },
      vertexShader: VERT, fragmentShader: FRAG,
      transparent: true, depthWrite: false, side: DoubleSide, blending: AdditiveBlending,
    });
    material.forceSinglePass = true;
    const mesh = new Mesh(geo, material); mesh.scale.setScalar(scale); group.add(mesh);
    return material;
  });

  // Stars
  const sGeo = new BufferGeometry();
  const sPos = new Float32Array(360 * 3);
  for (let i = 0; i < 360; i++) { sPos[i * 3] = (Math.random() - .5) * 26; sPos[i * 3 + 1] = (Math.random() - .3) * 14; sPos[i * 3 + 2] = -6 - Math.random() * 10; }
  sGeo.setAttribute('position', new BufferAttribute(sPos, 3));
  const sMat = new PointsMaterial({ color: 0xffffff, size: .045, transparent: true, opacity: .7, sizeAttenuation: true });
  const stars = new Points(sGeo, sMat);
  scene.add(stars);

  // Layout: on wide screens the shell rises from the bottom right, leaving the copy column clear.
  const resize = () => {
    const w = el.clientWidth || 1, h = el.clientHeight || 1;
    renderer.setSize(w, h, false); camera.aspect = w / h; camera.updateProjectionMatrix();
    const visH = 2 * camera.position.z * Math.tan(camera.fov * Math.PI / 360);
    const wide = w >= 900;
    group.position.set(wide ? visH * camera.aspect * 0.2 : 0, -visH * .5 + 0.05, 0);
    const s = Math.min(1.25, Math.max(.8, w / 1200));
    group.scale.set(1.35 * s, s, s);
  };
  const ro = new ResizeObserver(resize); ro.observe(el); resize();

  // Pointer parallax on real pointers only
  const target = { x: 0, y: 0 }, cur = { x: 0, y: 0 };
  const host = el.parentElement;
  const fine = matchMedia('(hover: hover) and (pointer: fine)').matches;
  const onMove = e => { const r = host.getBoundingClientRect(); target.x = (e.clientX - r.left) / r.width - .5; target.y = (e.clientY - r.top) / r.height - .5; };
  if (fine && !reduced) host.addEventListener('pointermove', onMove, { passive: true });

  let raf = 0, visible = true, alive = true, last = 0, acc = 0, n = 0, every = 1, tick = 0;
  const t0 = performance.now();
  const draw = now => {
    const t = (now - t0) / 1000;
    for (const m of shells) m.uniforms.uTime.value = t;
    cur.x += (target.x - cur.x) * .04; cur.y += (target.y - cur.y) * .04;
    group.rotation.y = t * .05 + cur.x * .35;
    group.rotation.x = cur.y * .2;
    stars.rotation.z = t * .004;
    renderer.render(scene, camera);
  };
  const frame = now => {
    raf = 0;
    if (!alive || !visible) return;
    raf = requestAnimationFrame(frame);
    // Adaptive quality: after a 1.5s warm-up, average frame time over 45 frames. If it is below
    // ~45fps, step the pixel ratio down to 0.75, then fall back to drawing every other frame.
    if (last && now - t0 > 1500) {
      const dt = now - last;
      if (dt < 120) { acc += dt; n++; }               // ignore gaps from tab switches
      if (n === 45) {
        if (acc / n > 22) {
          if (dpr > .75) { dpr = Math.max(.75, dpr - .25); renderer.setPixelRatio(dpr); resize(); }
          else every = 2;
        }
        acc = n = 0;
      }
    }
    last = now;
    if (++tick % every === 0) draw(now);
  };
  const start = () => { if (alive && visible && !raf && !reduced) { last = 0; raf = requestAnimationFrame(frame); } };

  // Pause while the hero is scrolled out of view.
  const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting; if (visible) start(); });
  io.observe(el);

  const onLost = e => { e.preventDefault(); alive = false; cancelAnimationFrame(raf); };
  renderer.domElement.addEventListener('webglcontextlost', onLost);

  // Compile shaders off the critical path where supported, then reveal the canvas.
  const ready = renderer.compileAsync ? renderer.compileAsync(scene, camera) : Promise.resolve();
  ready.catch(() => {}).then(() => {
    if (!alive) return;
    draw(performance.now());
    el.classList.add('is-ready');
    start();
  });

  return () => {
    alive = false; cancelAnimationFrame(raf); ro.disconnect(); io.disconnect();
    host.removeEventListener('pointermove', onMove);
    renderer.domElement.removeEventListener('webglcontextlost', onLost);
    geo.dispose(); shells.forEach(m => m.dispose()); sGeo.dispose(); sMat.dispose();
    renderer.dispose(); renderer.domElement.remove();
  };
}
