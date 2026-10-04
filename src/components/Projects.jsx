import { useState } from 'react';
import { Box, Container, Stack, Typography, Button, Chip, IconButton, Card, CardContent, Dialog, DialogContent, Grid } from '@mui/material';
import { m, AnimatePresence } from 'motion/react';
import { PROJECTS } from '../data.js';
import { I, Reveal, SectionHead, SpotlightCard, Bullets } from '../ui.jsx';

function ProjectPreview({ p }) {
  const [first, second] = p.shots;
  if (p.layout === 'duo') return (
    <div className="preview preview-duo">
      <img className="duo-desktop" src={second.src} alt={second.alt} loading="lazy" decoding="async" />
      <img className="duo-phone" src={first.src} alt={first.alt} loading="lazy" decoding="async" />
    </div>
  );
  return (
    <div className="preview" style={{ background: first.bg }}>
      <img className="shot" src={first.src} alt={first.alt} loading="lazy" decoding="async" style={{ objectFit: first.fit || 'cover', objectPosition: first.pos || 'center top' }} />
    </div>
  );
}

function ProjectGallery({ p }) {
  const [i, setI] = useState(0);
  const s = p.shots[i];
  return (
    <Box>
      <Box sx={{ borderRadius: 3, overflow: 'hidden', border: '1px solid', borderColor: 'divider', bgcolor: s.bg || '#f5f5f4', display: 'grid', placeItems: 'center', minHeight: 220 }}>
        <AnimatePresence mode="wait">
          <m.img key={s.src} src={s.src} alt={s.alt} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: .25 }}
            style={{ display: 'block', maxWidth: '100%', maxHeight: 440, objectFit: 'contain' }} />
        </AnimatePresence>
      </Box>
      <Stack direction="row" spacing={2} sx={{ justifyContent: 'space-between', alignItems: 'center', mt: 1.25 }}>
        <Typography variant="caption" color="text.secondary">{s.caption}</Typography>
        {p.shots.length > 1 && (
          <Stack direction="row" spacing={1}>
            {p.shots.map((t, k) => (
              <Box key={t.src} component="button" onClick={() => setI(k)} aria-label={`Show ${t.caption}`} aria-pressed={k === i}
                sx={{ width: 64, height: 42, p: 0, borderRadius: 1.5, cursor: 'pointer', overflow: 'hidden', border: '2px solid', borderColor: k === i ? '#E5BE3E' : 'divider', background: `${t.bg || '#f5f5f4'} url(${t.src}) center top / cover no-repeat`, opacity: k === i ? 1 : .65 }} />
            ))}
          </Stack>
        )}
      </Stack>
    </Box>
  );
}

export function Projects({ onOpen }) {
  const spans = [7, 5, 5, 7];   // asymmetric 2x2: wide + narrow, then narrow + wide
  return (
    <Box component="section" id="projects" sx={{ pt: { xs: 9, md: 12 }, pb: { xs: 11, md: 15 } }}>
      <Container maxWidth="lg">
        <SectionHead title="Selected builds across live apps, databases, AI, and games." />
        <Box sx={{ display: 'grid', gap: { xs: 2, md: 2.5 }, gridTemplateColumns: { xs: '1fr', md: 'repeat(12, 1fr)' } }}>
          {PROJECTS.map((p, k) => (
            <Box key={p.id} sx={{ gridColumn: { md: `span ${spans[k % spans.length]}` }, minWidth: 0 }}>
              <Reveal delay={(k % 2) * .06} style={{ height: '100%' }}>
                <Box className="lift" sx={{ height: '100%' }}>
                  <SpotlightCard className="proj" onClick={() => onOpen(p)} sx={{ cursor: 'pointer' }} innerSx={{ display: 'flex', flexDirection: 'column' }}>
                    <ProjectPreview p={p} />
                    <CardContent sx={{ p: { xs: 3, md: 3.5 }, flex: 1, display: 'flex', flexDirection: 'column' }}>
                      <Stack direction="row" spacing={2} sx={{ justifyContent: 'space-between', alignItems: 'center' }}>
                        <span className="label"><span className="label-y">{p.tag}</span> · <span className="mono">{p.date}</span></span>
                        <Chip size="small" label={p.badge} sx={{ bgcolor: p.badge === 'Headstarter' ? '#f5f5f4' : '#E5BE3E', color: '#1c1917', height: 24, fontSize: 12 }} />
                      </Stack>
                      <Typography component="h3" sx={{ fontWeight: 600, fontSize: 21, mt: 1.5, letterSpacing: '-0.03em' }}>{p.title}</Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ mt: 1, lineHeight: 1.7, maxWidth: '62ch' }}>{p.desc}</Typography>
                      <Stack direction="row" sx={{ flexWrap: 'wrap', gap: .75, mt: 2 }}>
                        {p.stack.map(s => <Chip key={s} size="small" label={s} variant="outlined" sx={{ height: 24, fontSize: 12, borderColor: 'divider' }} />)}
                      </Stack>
                      <Stack direction="row" sx={{ flexWrap: 'wrap', gap: 1, mt: 'auto', pt: 3, '& .MuiButton-root': { whiteSpace: 'nowrap' } }} onClick={e => e.stopPropagation()}>
                        <Button variant="contained" size="small" onClick={() => onOpen(p)} aria-label={`View details: ${p.title}`}>View details</Button>
                        {p.links[0] && <Button variant="outlined" color="secondary" size="small" href={p.links[0].href} target="_blank" rel="noopener" endIcon={I.out} sx={{ borderColor: 'divider' }}>{p.links[0].label}</Button>}
                      </Stack>
                    </CardContent>
                  </SpotlightCard>
                </Box>
              </Reveal>
            </Box>
          ))}
        </Box>
      </Container>
    </Box>
  );
}

export function ProjectDialog({ p, onClose, onContact }) {
  return (
    <Dialog open={!!p} onClose={onClose} maxWidth="md" fullWidth slotProps={{ paper: { sx: { borderRadius: 4 } } }} aria-labelledby="project-title">
      {p && (
        <DialogContent sx={{ p: { xs: 3, md: 5 } }}>
          <IconButton onClick={onClose} sx={{ position: 'absolute', top: 14, right: 14 }} aria-label="Close">{I.x}</IconButton>
          <Stack direction="row" spacing={1} useFlexGap sx={{ alignItems: 'center', flexWrap: 'wrap' }}>
            <Chip size="small" label={p.badge} sx={{ bgcolor: '#E5BE3E', color: '#000' }} />
            <Chip size="small" label={p.tag} variant="outlined" />
            <span className="label mono">{p.date}</span>
          </Stack>
          <Typography id="project-title" variant="h2" sx={{ mt: 2, pr: 5 }}>{p.title}</Typography>
          <Stack direction="row" sx={{ flexWrap: 'wrap', gap: .75, mt: 1.5 }}>{p.stack.map(t => <Chip key={t} size="small" label={t} variant="outlined" sx={{ height: 24, fontSize: 11 }} />)}</Stack>
          <Typography color="text.secondary" sx={{ mt: 1 }}>{p.desc}</Typography>
          <Box sx={{ mt: 3 }}><ProjectGallery key={p.id} p={p} /></Box>
          <h3 className="label label-y" style={{ margin: '32px 0 12px' }}>Impact</h3>
          <Bullets items={p.highlights} dot={6} variant="body1" />
          <h3 className="label label-y" style={{ margin: '32px 0 12px' }}>Architecture</h3>
          <Grid container spacing={1.5}>
            {p.arch.map(([t, b]) => (
              <Grid size={{ xs: 12, sm: 6 }} key={t}>
                <Card sx={{ p: 2.5, height: '100%', bgcolor: '#f5f5f4', '&:hover': { borderColor: '#E5BE3E' } }}>
                  <Typography sx={{ fontWeight: 600 }}>{t}</Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mt: .75, lineHeight: 1.7 }}>{b}</Typography>
                </Card>
              </Grid>
            ))}
          </Grid>
          <Stack direction="row" spacing={1} useFlexGap sx={{ flexWrap: 'wrap', mt: 4 }}>
            {p.links.map((l, k) => <Button key={l.href} variant={k === 0 ? 'contained' : 'outlined'} color={k === 0 ? 'primary' : 'secondary'} href={l.href} target="_blank" rel="noopener" endIcon={I.out}>{l.label}</Button>)}
            {p.codePrivate && <Button variant="outlined" color="secondary" disabled>Code private (client work)</Button>}
            <Button variant="outlined" color="secondary" onClick={() => { onClose(); onContact(); }}>Get in touch</Button>
          </Stack>
        </DialogContent>
      )}
    </Dialog>
  );
}
