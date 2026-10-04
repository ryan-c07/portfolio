import { useState } from 'react';
import { Box, Container, Grid, Stack, Typography, Button, Card, OutlinedInput, FormHelperText } from '@mui/material';
import { PROFILE } from '../data.js';
import { I, Reveal } from '../ui.jsx';

const RULES = {
  name: x => x.trim().length >= 2 || 'Please enter your name (at least 2 characters).',
  email: x => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(x.trim()) || 'Email must include an @ and a domain.',
  subject: x => x.trim().length >= 2 || 'Please add a short subject.',
  message: x => x.trim().length >= 10 || 'Message should be at least 10 characters.',
};

export function Contact({ notify }) {
  const [v, setV] = useState({ name: '', email: '', subject: '', message: '' });
  const [err, setErr] = useState({}); const [busy, setBusy] = useState(false);
  const check = k => { const r = RULES[k](v[k]); setErr(e => ({ ...e, [k]: r === true ? '' : r })); return r === true; };
  const submit = e => {
    e.preventDefault();
    const ok = Object.keys(RULES).map(check).every(Boolean);
    if (!ok) { notify('Fix the highlighted fields and try again.', 'error'); return; }
    setBusy(true);
    setTimeout(() => {
      const body = `${v.message}\n\n- ${v.name} (${v.email})`;
      window.location.href = `mailto:${PROFILE.email}?subject=${encodeURIComponent(v.subject)}&body=${encodeURIComponent(body)}`;
      notify(`Thanks ${v.name.split(' ')[0]}. Your mail client should open now.`, 'success');
      setV({ name: '', email: '', subject: '', message: '' }); setErr({}); setBusy(false);
    }, 700);
  };
  // Label above the input (never placeholder-as-label); the error text sits below and is tied to the field.
  const f = (k, label, extra = {}) => (
    <Box>
      <Box component="label" htmlFor={`field-${k}`} sx={{ display: 'block', fontSize: 14, fontWeight: 500, mb: .75 }}>{label}</Box>
      <OutlinedInput id={`field-${k}`} name={k} fullWidth value={v[k]} onChange={e => setV({ ...v, [k]: e.target.value })} onBlur={() => check(k)}
        error={!!err[k]} inputProps={{ 'aria-describedby': `help-${k}`, 'aria-invalid': !!err[k] }} {...extra} />
      <FormHelperText id={`help-${k}`} error={!!err[k]} sx={{ mx: 0, minHeight: 20 }}>{err[k] || ' '}</FormHelperText>
    </Box>
  );
  return (
    <Box component="section" id="contact" sx={{ pt: { xs: 10, md: 14 }, pb: { xs: 11, md: 15 }, borderTop: '1px solid', borderColor: 'divider' }}>
      <Container maxWidth="lg">
        <Grid container spacing={6}>
          <Grid size={{ xs: 12, md: 5 }}>
            <Reveal>
              <Typography variant="h2">Let's talk.</Typography>
              <Typography color="text.secondary" sx={{ mt: 2.5, lineHeight: 1.75, maxWidth: '44ch' }}>Internship, freelance database work, or a hackathon team. My inbox is open.</Typography>
              <Stack sx={{ mt: 4 }} spacing={0}>
                {[[PROFILE.email, `mailto:${PROFILE.email}`], [PROFILE.phone, `tel:${PROFILE.phone.replace(/-/g, '')}`], ['ryanchen.xyz', PROFILE.site], ['linkedin.com/in/ryanchen07', PROFILE.linkedin], ['github.com/ryan-c07', PROFILE.github]].map(([t, h]) => (
                  <Box component="a" key={t} href={h} target={h.startsWith('http') ? '_blank' : undefined} rel="noopener"
                    sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', py: 1.75, borderBottom: '1px solid', borderColor: 'divider', color: 'text.primary', textDecoration: 'none', fontWeight: 500,
                      '& .arrow': { color: 'var(--yellow-ink)', display: 'inline-flex', transition: 'transform 220ms cubic-bezier(0.23, 1, 0.32, 1)' },
                      '@media (hover: hover) and (pointer: fine)': { '&:hover .arrow': { transform: 'translate(2px, -2px)' } } }}>
                    <span>{t}</span><span className="arrow">{I.out}</span>
                  </Box>
                ))}
              </Stack>
            </Reveal>
          </Grid>
          <Grid size={{ xs: 12, md: 7 }}>
            <Reveal delay={.1}>
              <Card component="form" noValidate onSubmit={submit} aria-label="Contact form" sx={{ p: { xs: 3, md: 4 }, bgcolor: '#fff' }}>
                <Grid container spacing={2}>
                  <Grid size={{ xs: 12, sm: 6 }}>{f('name', 'Name', { autoComplete: 'name' })}</Grid>
                  <Grid size={{ xs: 12, sm: 6 }}>{f('email', 'Email', { type: 'email', autoComplete: 'email' })}</Grid>
                  <Grid size={12}>{f('subject', 'Subject')}</Grid>
                  <Grid size={12}>{f('message', 'Message', { multiline: true, minRows: 4 })}</Grid>
                </Grid>
                <Button type="submit" variant="contained" size="large" fullWidth disabled={busy} sx={{ mt: 1 }}>{busy ? 'Opening mail app' : 'Send message'}</Button>
                <Typography variant="caption" color="text.secondary" sx={{ display: 'block', textAlign: 'center', mt: 1.5 }}>Opens your mail client with the message pre-filled.</Typography>
              </Card>
            </Reveal>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
