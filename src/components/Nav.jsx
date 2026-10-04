import { useEffect, useState } from 'react';
import { m, AnimatePresence } from 'motion/react';
import { PROFILE, PHOTOS } from '../data.js';
import { I, scrollToId } from '../ui.jsx';
import { NAV_LINKS } from './Hero.jsx';

// Floating pill navigation that appears once the hero is scrolled past. No per-frame scroll handler:
// two IntersectionObservers drive visibility and the active section.
export function FloatingNav({ onContact }) {
  const [show, setShow] = useState(false), [active, setActive] = useState('');
  useEffect(() => {
    const hero = document.querySelector('.hero');
    const heroIO = new IntersectionObserver(([e]) => { setShow(!e.isIntersecting); if (e.isIntersecting) setActive(''); }, { rootMargin: '-75% 0px 0px 0px' });
    hero && heroIO.observe(hero);
    // Highlight whichever section crosses a thin band just above the middle of the screen.
    const sectionIO = new IntersectionObserver(entries => entries.forEach(e => e.isIntersecting && setActive(e.target.id)), { rootMargin: '-40% 0px -55% 0px' });
    ['projects', 'resume', 'about', 'stack', 'now', 'contact'].forEach(id => { const el = document.getElementById(id); el && sectionIO.observe(el); });
    return () => { heroIO.disconnect(); sectionIO.disconnect(); };
  }, []);
  return (
    <AnimatePresence>
      {show && (
        <m.nav className="dock" aria-label="Section navigation"
          initial={{ y: -80, opacity: 0, x: '-50%' }} animate={{ y: 0, opacity: 1, x: '-50%' }} exit={{ y: -80, opacity: 0, x: '-50%' }}
          transition={{ type: 'spring', duration: .45, bounce: .12 }}>
          <a className="dock-avatar" href="#top" onClick={e => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }} aria-label="Back to top">
            <img src={PHOTOS[0].src} alt="" width="34" height="34" />
          </a>
          {NAV_LINKS.map(([t, id]) => (
            <a key={id} href={`#${id}`} className="dock-link" data-active={active === id} aria-current={active === id ? 'true' : undefined} onClick={e => scrollToId(id, e)}>
              {active === id && <m.span layoutId="dock-pill" className="dock-pill" transition={{ type: 'spring', stiffness: 420, damping: 34 }} />}
              <span style={{ position: 'relative' }}>{t}</span>
            </a>
          ))}
          <a className="dock-link dock-resume" href={PROFILE.resume} target="_blank" rel="noopener">Resume{I.out}</a>
          <button className="dock-cta" onClick={onContact}>Get in touch</button>
        </m.nav>
      )}
    </AnimatePresence>
  );
}
