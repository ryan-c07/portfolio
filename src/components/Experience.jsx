import { useRef } from 'react';
import { Box, Container, Stack, Typography, Button, Chip, Card, Grid } from '@mui/material';
import { m, useScroll, useSpring, useInView } from 'motion/react';
import { PROFILE, EXPERIENCE, EDUCATION } from '../data.js';
import { I, Reveal, SectionHead, SpotlightCard, Bullets } from '../ui.jsx';

// Vertical timeline whose yellow line fills as you scroll; each dot lights up as its role reaches the middle of the screen.
function ExperienceTimeline() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 70%', 'end 55%'] });
  const fill = useSpring(scrollYProgress, { stiffness: 140, damping: 30, restDelta: .001 });
  return (
    <Box ref={ref} sx={{ position: 'relative', pl: 5 }}>
      <Box sx={{ position: 'absolute', left: 11, top: 10, bottom: 10, width: 2, bgcolor: 'divider', borderRadius: 2 }} />
      <m.div aria-hidden style={{ position: 'absolute', left: 11, top: 10, bottom: 10, width: 2, background: '#E5BE3E', borderRadius: 2, transformOrigin: 'top', scaleY: fill }} />
      <Stack spacing={2.5}>{EXPERIENCE.map(x => <TimelineItem key={x.role + x.when} x={x} />)}</Stack>
    </Box>
  );
}

function TimelineItem({ x }) {
  const ref = useRef(null);
  const lit = useInView(ref, { margin: '0px 0px -45% 0px' });
  return (
    <Box ref={ref} sx={{ position: 'relative' }}>
      <m.span aria-hidden animate={{ backgroundColor: lit ? '#E5BE3E' : '#ffffff', borderColor: lit ? '#0c0a09' : '#d6d3d1', scale: lit ? 1 : .8 }}
        transition={{ duration: .35 }} style={{ position: 'absolute', left: -36, top: 22, width: 16, height: 16, borderRadius: 99, border: '2px solid', boxShadow: lit ? '0 0 0 5px rgba(229,190,62,.22)' : 'none' }} />
      <Reveal>
        <SpotlightCard bg="#fafaf9" innerSx={{ p: 3 }}>
          <Stack direction="row" spacing={2} sx={{ justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <Box><span className="label label-y">{x.org}</span><Typography component="h4" sx={{ fontWeight: 650, mt: .5 }}>{x.role}</Typography></Box>
            <Chip size="small" label={x.when} className="mono" sx={{ bgcolor: '#1c1917', color: '#fff', flexShrink: 0, fontSize: 12 }} />
          </Stack>
          <Box sx={{ mt: 1.5 }}><Bullets items={x.bullets} /></Box>
        </SpotlightCard>
      </Reveal>
    </Box>
  );
}

// Section id stays "resume" so existing #resume links keep working.
export function Experience() {
  return (
    <Box component="section" id="resume" sx={{ pt: { xs: 10, md: 14 }, pb: { xs: 11, md: 15 }, bgcolor: '#f5f5f4', borderTop: '1px solid', borderBottom: '1px solid', borderColor: 'divider' }}>
      <Container maxWidth="lg">
        <SectionHead title="Experience, education, and the teams that shaped how I build."
          right={<Button variant="contained" href={PROFILE.resume} target="_blank" rel="noopener" endIcon={I.out} sx={{ flexShrink: 0, alignSelf: { xs: 'flex-start', md: 'auto' } }}>Resume</Button>} />
        <Grid container spacing={4}>
          <Grid size={{ xs: 12, md: 7 }}>
            <Typography component="h3" sx={{ fontWeight: 600, mb: 2, fontSize: 16 }}>Experience</Typography>
            <ExperienceTimeline />
          </Grid>
          <Grid size={{ xs: 12, md: 5 }}>
            <Typography component="h3" sx={{ fontWeight: 600, mb: 2, fontSize: 16 }}>Education</Typography>
            <Reveal delay={.1}>
              <Card sx={{ p: 3, bgcolor: '#fff', transition: 'border-color 200ms ease', '&:hover': { borderColor: '#E5BE3E' } }}>
                <Stack direction="row" spacing={2} sx={{ justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <Box><span className="label label-y">{EDUCATION.school}</span><Typography component="h4" sx={{ fontWeight: 650, mt: .5 }}>{EDUCATION.degree}</Typography></Box>
                  <Chip size="small" label={EDUCATION.when} className="mono" sx={{ bgcolor: '#1c1917', color: '#fff', flexShrink: 0, fontSize: 12 }} />
                </Stack>
                <Box sx={{ mt: 2 }}><Bullets items={EDUCATION.bullets} /></Box>
              </Card>
            </Reveal>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
