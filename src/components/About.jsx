import { useState } from 'react';
import { Box, Container, Grid, Stack, Typography } from '@mui/material';
import { m, AnimatePresence } from 'motion/react';
import { PHOTOS } from '../data.js';
import { Reveal } from '../ui.jsx';

export function About() {
  const [active, setActive] = useState(0);
  return (
    <Box component="section" id="about" sx={{ pt: { xs: 10, md: 14 }, pb: { xs: 11, md: 15 } }}>
      <Container maxWidth="lg">
        <Grid container spacing={{ xs: 5, md: 8 }} sx={{ alignItems: 'center' }}>
          <Grid size={{ xs: 12, md: 7 }}>
            <Reveal>
              <Typography variant="h2">I build practical, polished software that turns messy workflows into products people can actually use.</Typography>
              <Typography color="text.secondary" sx={{ mt: 3, lineHeight: 1.75, maxWidth: '62ch' }}>
                I am a Computer Science student at Stony Brook University and a software engineer in New York. My work sits between the data layer and the user: a live voting app that handled 219 votes at a campus show, the PostgreSQL data layer for a contract pharmacy refill platform, AI-driven web apps built as a Headstarter fellow, and a hackathon-winning trivia game.
              </Typography>
              <Typography color="text.secondary" sx={{ mt: 2, lineHeight: 1.75, maxWidth: '62ch' }}>
                At the NYC Department of Education I surveyed 500+ students across the nation's largest school district and presented key insights to the CIO and executive team.
              </Typography>
            </Reveal>
          </Grid>

          <Grid size={{ xs: 12, md: 5 }}>
            <Reveal delay={.12}>
              <Box sx={{ position: 'relative', aspectRatio: '4/5', maxHeight: 560, maxWidth: 448, mx: 'auto', borderRadius: 4, border: '1px solid', borderColor: 'divider', overflow: 'hidden', bgcolor: '#0c0a09',
                '& img': { transition: 'transform 800ms cubic-bezier(0.23, 1, 0.32, 1)' }, '@media (hover: hover) and (pointer: fine)': { '&:hover img': { transform: 'scale(1.03)' } } }}>
                <AnimatePresence mode="wait" initial={false}>
                  <m.img key={active} src={PHOTOS[active].src} alt={PHOTOS[active].caption} loading="lazy" decoding="async"
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: .45 }}
                    style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 22%', display: 'block' }} />
                </AnimatePresence>
              </Box>
              {PHOTOS.length > 1 && (
                <Stack direction="row" spacing={1} sx={{ mt: 1.5 }}>
                  {PHOTOS.map((ph, i) => (
                    <button key={ph.src} className="press" onClick={() => setActive(i)} aria-label={`Show photo: ${ph.caption}`}
                      style={{ flex: 1, height: 64, padding: 0, borderRadius: 10, overflow: 'hidden', cursor: 'pointer', border: `2px solid ${i === active ? '#E5BE3E' : '#e7e5e4'}`,
                        background: `#0c0a09 url(${ph.src}) center 25% / cover no-repeat`, opacity: i === active ? 1 : .7 }} />
                  ))}
                </Stack>
              )}
            </Reveal>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
