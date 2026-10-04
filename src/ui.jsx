import { useRef } from 'react';
import { createTheme, Box, Stack, Typography } from '@mui/material';
import { m, useInView, useMotionValue, useMotionTemplate } from 'motion/react';
import { GithubLogo, LinkedinLogo, EnvelopeSimple, ArrowUpRight, X } from '@phosphor-icons/react';

/* ================= THEME ================= */
export const ACCENT = '#E5BE3E';
const pressable = { transition: 'transform 160ms cubic-bezier(0.23, 1, 0.32, 1), background-color 200ms ease, border-color 200ms ease, color 200ms ease', '&:active': { transform: 'scale(0.97)' } };

export const theme = createTheme({
  palette: {
    mode: 'light',
    primary: { main: ACCENT, contrastText: '#1c1917' },
    secondary: { main: '#1c1917' },
    background: { default: '#fafaf9', paper: '#ffffff' },
    text: { primary: '#1c1917', secondary: '#57534e' },
    divider: '#e7e5e4',
  },
  shape: { borderRadius: 12 },
  typography: {
    fontFamily: "Geist, 'Geist Fallback', system-ui, sans-serif",
    h1: { fontWeight: 600, letterSpacing: '-0.045em' },
    h2: { fontWeight: 600, letterSpacing: '-0.035em', fontSize: 'clamp(1.75rem, 3.2vw, 2.4rem)', lineHeight: 1.12 },
    h3: { fontWeight: 600, letterSpacing: '-0.025em' },
    body1: { lineHeight: 1.7 },
    button: { textTransform: 'none', fontWeight: 600, letterSpacing: '-0.01em' },
  },
  components: {
    MuiButtonBase: { defaultProps: { disableRipple: true } },
    MuiButton: { styleOverrides: {
      root: { borderRadius: 999, paddingInline: 18, boxShadow: 'none', '&:hover': { boxShadow: 'none' }, ...pressable },
      containedPrimary: { '&:hover': { backgroundColor: '#EDCB5A' } },
    } },
    MuiIconButton: { styleOverrides: { root: pressable } },
    MuiChip: { styleOverrides: { root: { borderRadius: 999, fontWeight: 500 } } },
    MuiCard: { styleOverrides: { root: { border: '1px solid #e7e5e4', boxShadow: 'none', borderRadius: 16 } } },
    MuiOutlinedInput: { styleOverrides: { root: { borderRadius: 12, backgroundColor: '#fff',
      '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: '#1c1917', borderWidth: 1.5 } } } },
  },
});

/* ================= ICONS (Phosphor) ================= */
export const I = {
  github: <GithubLogo size={18} aria-hidden="true" />,
  linkedin: <LinkedinLogo size={18} aria-hidden="true" />,
  mail: <EnvelopeSimple size={18} aria-hidden="true" />,
  out: <ArrowUpRight size={14} weight="bold" aria-hidden="true" />,
  x: <X size={18} aria-hidden="true" />,
};

/* ================= HELPERS ================= */
// Scroll reveal: CSS transition on transform/opacity, toggled once by an IntersectionObserver.
// Content is only hidden when JS runs (html.js), so prerendered HTML stays readable without it.
export function Reveal({ children, delay = 0, style, className = '', ...rest }) {
  const ref = useRef(null);
  const seen = useInView(ref, { once: true, margin: '0px 0px -10% 0px' });
  return <div ref={ref} className={`reveal ${seen ? 'is-in' : ''} ${className}`} style={{ ...style, transitionDelay: seen ? `${delay}s` : '0s' }} {...rest}>{children}</div>;
}

export const SectionHead = ({ title, right }) => (
  <Reveal>
    <Stack direction={{ xs: 'column', md: 'row' }} spacing={2.5} sx={{ justifyContent: 'space-between', alignItems: { md: 'flex-end' }, mb: { xs: 5, md: 7 } }}>
      <Typography variant="h2" sx={{ maxWidth: 680 }}>{title}</Typography>
      {right}
    </Stack>
  </Reveal>
);

// Card with a yellow glow that follows the cursor across the surface and along the border.
// Motion values update outside React's render cycle, so pointer movement never re-renders.
export function SpotlightCard({ children, bg = '#fff', innerSx, sx, glow = .1, ...rest }) {
  const mx = useMotionValue(-500), my = useMotionValue(-500);
  const surface = useMotionTemplate`radial-gradient(380px circle at ${mx}px ${my}px, rgba(229,190,62,${glow}), transparent 70%)`;
  const edge = useMotionTemplate`radial-gradient(240px circle at ${mx}px ${my}px, rgba(229,190,62,.7), transparent 70%)`;
  const move = e => { const r = e.currentTarget.getBoundingClientRect(); mx.set(e.clientX - r.left); my.set(e.clientY - r.top); };
  const leave = () => { mx.set(-500); my.set(-500); };
  return (
    <Box onMouseMove={move} onMouseLeave={leave} {...rest}
      sx={{ position: 'relative', height: '100%', borderRadius: '17px', p: '1px', bgcolor: bg === '#0c0a09' ? '#292524' : '#e7e5e4', overflow: 'hidden', ...sx }}>
      <m.div aria-hidden style={{ position: 'absolute', inset: 0, background: edge }} />
      <Box sx={{ position: 'relative', height: '100%', borderRadius: '16px', bgcolor: bg, overflow: 'hidden' }}>
        <m.div aria-hidden style={{ position: 'absolute', inset: 0, background: surface, pointerEvents: 'none' }} />
        <Box sx={{ position: 'relative', height: '100%', ...innerSx }}>{children}</Box>
      </Box>
    </Box>
  );
}

export const TechIcon = ({ item, size = 16 }) => item.icon
  ? <img src={`https://cdn.simpleicons.org/${item.icon}/111111`} alt="" width={size} height={size} loading="lazy" decoding="async" style={{ display: 'block' }} />
  : <span style={{ fontSize: 9, fontWeight: 650, letterSpacing: '-.02em', lineHeight: 1 }}>{item.mono}</span>;

export const Bullets = ({ items, dot = 5, variant = 'body2' }) => (
  <Stack spacing={.75}>
    {items.map(b => (
      <Stack key={b} direction="row" spacing={1.25}>
        <Box sx={{ mt: variant === 'body2' ? '9.4px' : '10.6px', width: dot, height: dot, borderRadius: 99, bgcolor: ACCENT, flexShrink: 0 }} />
        <Typography variant={variant} color={variant === 'body2' ? 'text.secondary' : undefined} sx={{ lineHeight: 1.7 }}>{b}</Typography>
      </Stack>
    ))}
  </Stack>
);

// Smooth-scroll to an in-page anchor, honoring reduced motion, and keep the hash in the URL.
export const scrollToId = (id, e) => {
  const el = typeof document !== 'undefined' && document.getElementById(id);
  if (!el) return;
  e && e.preventDefault();
  el.scrollIntoView({ behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth', block: 'start' });
  history.replaceState(null, '', `#${id}`);
};
