import { useState } from 'react';
import { Box, Container, Stack, Typography, Chip, OutlinedInput } from '@mui/material';
import { MagnifyingGlass } from '@phosphor-icons/react';
import { STACK, MARQUEE_ITEMS } from '../data.js';
import { Reveal, SectionHead, TechIcon } from '../ui.jsx';

export function StackSection() {
  const [q, setQ] = useState('');
  const groups = Object.entries(STACK).map(([group, items]) => [group, items.filter(s => s.n.toLowerCase().includes(q.trim().toLowerCase()))]).filter(([, l]) => l.length);
  return (
    <Box component="section" id="stack" sx={{ pt: { xs: 10, md: 14 }, pb: { xs: 11, md: 15 }, bgcolor: '#f5f5f4', borderTop: '1px solid', borderBottom: '1px solid', borderColor: 'divider' }}>
      <Container maxWidth="lg">
        <SectionHead title="Tools I use to build across interfaces, data, systems, and AI-assisted workflows."
          right={<OutlinedInput size="small" placeholder="Filter skills" value={q} onChange={e => setQ(e.target.value)} inputProps={{ 'aria-label': 'Filter skills', type: 'search' }}
            startAdornment={<MagnifyingGlass size={16} aria-hidden="true" style={{ marginRight: 8, color: '#57534e', flexShrink: 0 }} />}
            sx={{ width: { xs: '100%', md: 240 }, borderRadius: 999, bgcolor: '#fff', flexShrink: 0, '& input::placeholder': { color: '#57534e', opacity: 1 } }} />} />
        <Reveal>
          <Box className="marquee" aria-hidden="true" sx={{ mb: 6, py: 1.5, borderTop: '1px solid', borderBottom: '1px solid', borderColor: 'divider' }}>
            <div className="marquee-track">
              {[0, 1].map(copy => MARQUEE_ITEMS.map(s => (
                <Stack key={copy + s.n} direction="row" spacing={1.25} sx={{ alignItems: 'center', px: 3.5, flexShrink: 0, opacity: .7 }}>
                  <TechIcon item={s} size={22} />
                  <Typography sx={{ fontWeight: 700, fontSize: 15, whiteSpace: 'nowrap' }}>{s.n}</Typography>
                </Stack>
              )))}
            </div>
          </Box>
        </Reveal>
        <Stack spacing={4}>
          {groups.map(([group, list], gi) => (
            <Reveal key={group} delay={gi * .06}>
              <Typography component="h3" sx={{ fontWeight: 600, mb: 1.5, fontSize: 16 }}>{group}</Typography>
              <Stack direction="row" sx={{ flexWrap: 'wrap', gap: 1 }}>
                {list.map(s => (
                  <Box key={s.n} className="lift">
                    <Chip label={s.n} icon={<Box sx={{ ml: '6px !important', width: 22, height: 22, borderRadius: 99, bgcolor: '#f5f5f4', display: 'grid', placeItems: 'center' }}><TechIcon item={s} /></Box>}
                      sx={{ bgcolor: '#fff', border: '1px solid', borderColor: 'divider', pl: 0, pr: .5, height: 36, transition: 'border-color 200ms ease, background-color 200ms ease', '&:hover': { borderColor: '#E5BE3E', bgcolor: '#fbf6e3' } }} />
                  </Box>
                ))}
              </Stack>
            </Reveal>
          ))}
          {!groups.length && (
            <Typography color="text.secondary">No skills match "{q.trim()}". Try a language like Java or a tool like PostgreSQL.</Typography>
          )}
        </Stack>
      </Container>
    </Box>
  );
}
