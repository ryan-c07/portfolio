import { useEffect, useRef } from 'react';
import { Box, Container, Stack, Button } from '@mui/material';
import { PROFILE, PROOF } from '../data.js';
import { I, scrollToId } from '../ui.jsx';

export const NAV_LINKS = [['Projects', 'projects'], ['Experience', 'resume'], ['About', 'about'], ['Stack', 'stack']];

// The WebGL scene is a separate chunk, fetched after the page has loaded and the browser is idle,
// so it never competes with the hero text for first paint. Skipped entirely on Save-Data.
function LiquidCanvas() {
  const ref = useRef(null);
  useEffect(() => {
    if (navigator.connection && navigator.connection.saveData) return;
    let stop, dead = false, handle;
    const boot = () => import('../hero-scene.js').then(m => { if (!dead && ref.current) stop = m.mountHeroScene(ref.current); }).catch(() => {});
    const schedule = () => { handle = 'requestIdleCallback' in window ? requestIdleCallback(boot, { timeout: 1500 }) : setTimeout(boot, 200); };
    if (document.readyState === 'complete') schedule(); else addEventListener('load', schedule, { once: true });
    return () => {
      dead = true; removeEventListener('load', schedule);
      if (handle) ('cancelIdleCallback' in window ? cancelIdleCallback : clearTimeout)(handle);
      stop && stop();
    };
  }, []);
  return <div ref={ref} className="hero-canvas" aria-hidden="true" />;
}

export function Hero({ onContact }) {
  return (
    <Box component="header" sx={{ p: { xs: 0, md: 1.5 }, bgcolor: 'background.default' }}>
      <section className="hero" aria-label="Introduction">
        <div className="hero-glow" />
        <LiquidCanvas />
        <div className="hero-vignette" />

        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 2, pt: 3 }}>
          <Stack component="nav" aria-label="Primary" direction="row" sx={{ justifyContent: 'space-between', alignItems: 'center' }}>
            <a href="#top" className="intro hero-brand">Ryan Chen<span>.</span></a>
            <Stack direction="row" spacing={4} sx={{ display: { xs: 'none', md: 'flex' } }}>
              {NAV_LINKS.map(([t, id], i) => (
                <a key={id} href={`#${id}`} onClick={e => scrollToId(id, e)} className="hero-link intro" style={{ '--d': `${.08 + i * .05}s` }}>{t}</a>
              ))}
              <a href={PROFILE.resume} target="_blank" rel="noopener" className="hero-link intro" style={{ '--d': '.28s' }}>Resume<span className="hero-link-icon">{I.out}</span></a>
            </Stack>
            <Stack direction="row" spacing={1} className="intro">
              <Button href={PROFILE.github} target="_blank" rel="noopener" sx={{ color: '#fff', bgcolor: 'rgba(255,255,255,.08)', display: { xs: 'none', sm: 'inline-flex' }, '&:hover': { bgcolor: 'rgba(255,255,255,.14)' } }}>GitHub</Button>
              <Button onClick={onContact} sx={{ bgcolor: '#fff', color: '#000', '&:hover': { bgcolor: '#E5BE3E' } }}>Get in touch</Button>
            </Stack>
          </Stack>
        </Container>

        {/* Left-aligned copy; the liquid shell rises from the bottom right on wide screens */}
        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 2, pt: { xs: 6, md: 12 }, pb: { xs: 8, md: 12 } }}>
          <div className="intro" style={{ '--d': '.06s' }}>
            <span className="status"><span className="status-dot" aria-hidden="true" />{PROFILE.status}</span>
          </div>
          <h1 className="intro hero-title" style={{ '--d': '.12s' }}>I build live apps and the databases behind them.</h1>
          <p className="intro hero-sub" style={{ '--d': '.22s' }}>
            I'm Ryan Chen, a Stony Brook CS student (class of 2029). I ship with Next.js, PostgreSQL, and AI APIs.
          </p>
          <Stack direction="row" spacing={1.5} className="intro" style={{ '--d': '.32s' }} sx={{ mt: { xs: 3.5, md: 4.5 } }}>
            <Button href="#projects" onClick={e => scrollToId('projects', e)} size="large" sx={{ bgcolor: '#fff', color: '#000', px: 3, '&:hover': { bgcolor: '#E5BE3E' } }}>View projects</Button>
            <Button size="large" href={PROFILE.resume} target="_blank" rel="noopener" endIcon={I.out}
              sx={{ color: '#fff', px: 3, bgcolor: 'rgba(12,10,9,.62)', border: '1px solid rgba(255,255,255,.18)', '&:hover': { bgcolor: 'rgba(12,10,9,.85)', borderColor: 'rgba(255,255,255,.34)' } }}>Resume</Button>
          </Stack>
        </Container>
      </section>
    </Box>
  );
}

// Resume-backed numbers directly under the hero, so the strongest evidence is visible on the first scroll.
export function ProofStrip() {
  return (
    <Box component="section" aria-label="Highlights" sx={{ pt: { xs: 4, md: 5 }, pb: { xs: 2, md: 3 } }}>
      <Container maxWidth="lg">
        <ul className="proof">
          {PROOF.map((p, i) => (
            <li key={p.v} className="intro" style={{ '--d': `${.4 + i * .06}s` }}>
              <span className="proof-v">{p.v}</span>
              <span className="proof-l">{p.l}</span>
            </li>
          ))}
        </ul>
      </Container>
    </Box>
  );
}
