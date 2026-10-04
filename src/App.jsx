import { useState } from 'react';
import { ThemeProvider, CssBaseline, Box, Container, Stack, Snackbar, Alert } from '@mui/material';
import { MotionConfig, LazyMotion } from 'motion/react';
import { PROFILE } from './data.js';
import { theme, scrollToId } from './ui.jsx';
import { Hero, ProofStrip } from './components/Hero.jsx';
import { FloatingNav } from './components/Nav.jsx';
import { Projects, ProjectDialog } from './components/Projects.jsx';
import { Experience } from './components/Experience.jsx';
import { About } from './components/About.jsx';
import { StackSection } from './components/Stack.jsx';
import { Now } from './components/Now.jsx';
import { Contact } from './components/Contact.jsx';

const loadMotionFeatures = () => import('./motion-features.js').then(r => r.default);

// Section order follows what a recruiter scans for: proof, projects, experience, then the person.
export function App() {
  const [proj, setProj] = useState(null);
  const [snack, setSnack] = useState(null);
  const notify = (msg, type = 'success') => setSnack({ msg, type });
  const toContact = () => scrollToId('contact');
  return (
    <ThemeProvider theme={theme}>
      <LazyMotion features={loadMotionFeatures} strict>
      <MotionConfig reducedMotion="user">
        <CssBaseline />
        <a href="#main" className="skip-link">Skip to content</a>
        <FloatingNav onContact={toContact} />
        <Hero onContact={toContact} />
        <Box component="main" id="main" tabIndex={-1}>
          <ProofStrip />
          <Projects onOpen={setProj} />
          <Experience />
          <About />
          <StackSection />
          <Now />
          <Contact notify={notify} />
        </Box>
        <Box component="footer" sx={{ borderTop: '1px solid', borderColor: 'divider', py: 4 }}>
          <Container maxWidth="lg">
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.5} sx={{ justifyContent: 'space-between', alignItems: { sm: 'center' }, fontSize: 14, color: 'text.secondary' }}>
              <span>© {__BUILD_YEAR__} {PROFILE.name}. Built with React, Material UI, and Three.js.</span>
              <Stack direction="row" spacing={2.5} sx={{ '& a': { color: 'inherit', textDecoration: 'none', transition: 'color 200ms ease' }, '& a:hover': { color: 'text.primary' } }}>
                <a href={PROFILE.github} target="_blank" rel="noopener">GitHub</a>
                <a href={PROFILE.linkedin} target="_blank" rel="noopener">LinkedIn</a>
                <a href={`mailto:${PROFILE.email}`}>Email</a>
                <a href={PROFILE.resume} target="_blank" rel="noopener">Resume</a>
              </Stack>
            </Stack>
          </Container>
        </Box>
        <ProjectDialog p={proj} onClose={() => setProj(null)} onContact={toContact} />
        <Snackbar open={!!snack} autoHideDuration={4500} onClose={() => setSnack(null)} anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}>
          {snack ? <Alert onClose={() => setSnack(null)} severity={snack.type} variant="filled" sx={{ borderRadius: 3, bgcolor: snack.type === 'success' ? '#E5BE3E' : undefined, color: snack.type === 'success' ? '#000' : undefined, fontWeight: 600 }}>{snack.msg}</Alert> : <span />}
        </Snackbar>
      </MotionConfig>
      </LazyMotion>
    </ThemeProvider>
  );
}
