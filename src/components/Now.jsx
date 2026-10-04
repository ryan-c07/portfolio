import { useEffect, useRef, useState } from 'react';
import { Box, Container, Stack, Typography, Chip, Skeleton } from '@mui/material';
import { useInView } from 'motion/react';
import { PROFILE, NOW } from '../data.js';
import { I, Reveal, SectionHead, SpotlightCard } from '../ui.jsx';

const timeAgo = iso => {
  const sec = (Date.now() - new Date(iso)) / 1000;
  for (const [n, u] of [[31536000, 'y'], [2592000, 'mo'], [604800, 'w'], [86400, 'd'], [3600, 'h'], [60, 'm']]) if (sec >= n) return `${Math.floor(sec / n)}${u} ago`;
  return 'just now';
};

// Public GitHub activity. Push events no longer carry commit messages, so each latest push's head commit is looked up.
// Fetched only once the card is near the viewport, and cached for 10 minutes per tab to stay under the
// unauthenticated rate limit (60 requests/hour).
function useGitHubActivity(user, enabled) {
  const [state, setState] = useState({ status: 'loading' });
  useEffect(() => {
    if (!enabled) return;
    let alive = true;
    const key = `gh-activity:${user}`;
    try {
      const cached = JSON.parse(sessionStorage.getItem(key) || 'null');
      if (cached && Date.now() - cached.t < 600000) { setState({ status: 'ready', ...cached.d }); return; }
    } catch {}
    (async () => {
      try {
        const res = await fetch(`https://api.github.com/users/${user}/events/public?per_page=100`, { headers: { Accept: 'application/vnd.github+json' } });
        if (!res.ok) throw new Error(`GitHub ${res.status}`);
        const events = (await res.json()).sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
        const pushes = events.filter(e => e.type === 'PushEvent' && e.payload && e.payload.head);
        const weekAgo = Date.now() - 7 * 864e5;
        const thisWeek = pushes.filter(e => new Date(e.created_at) > weekAgo);
        const latest = [];
        for (const e of pushes) {
          if (latest.length === 3) break;
          if (!latest.some(x => x.sha === e.payload.head)) latest.push({ repo: e.repo.name, sha: e.payload.head, at: e.created_at });
        }
        const items = await Promise.all(latest.map(async it => {
          try {
            const c = await (await fetch(`https://api.github.com/repos/${it.repo}/commits/${it.sha}`)).json();
            return { ...it, msg: (c.commit && c.commit.message || '').split('\n')[0], url: c.html_url || `https://github.com/${it.repo}` };
          } catch { return { ...it, msg: '', url: `https://github.com/${it.repo}` }; }
        }));
        const d = { items, weekPushes: thisWeek.length, weekRepos: new Set(thisWeek.map(e => e.repo.name)).size, lastAt: events[0] && events[0].created_at };
        try { sessionStorage.setItem(key, JSON.stringify({ t: Date.now(), d })); } catch {}
        if (alive) setState({ status: 'ready', ...d });
      } catch { if (alive) setState({ status: 'error' }); }
    })();
    return () => { alive = false; };
  }, [user, enabled]);
  return state;
}

function GitHubActivity() {
  const ref = useRef(null);
  const near = useInView(ref, { once: true, margin: '600px 0px' });
  const user = PROFILE.github.split('/').pop();
  const gh = useGitHubActivity(user, near);
  const profile = <a href={PROFILE.github} target="_blank" rel="noopener" style={{ color: 'inherit', fontWeight: 700, fontSize: 13, display: 'inline-flex', alignItems: 'center', gap: 4 }}>@{user} on GitHub {I.out}</a>;
  let body;
  if (gh.status === 'loading') body = (
    <Stack spacing={1.25} sx={{ mt: 2 }} aria-busy="true" aria-label="Loading GitHub activity">{[0, 1, 2].map(k => <Skeleton key={k} variant="rounded" height={44} sx={{ borderRadius: 2 }} />)}</Stack>
  );
  else if (gh.status === 'error' || !gh.items.length) body = (
    <Box sx={{ mt: 1.5 }}>
      <Typography color="text.secondary" sx={{ lineHeight: 1.7 }}>GitHub activity could not load right now. See the latest work on my profile.</Typography>
      <Box sx={{ mt: 1.5 }}>{profile}</Box>
    </Box>
  );
  else body = (
    <Box sx={{ mt: 1.5 }}>
      <Typography color="text.secondary" sx={{ lineHeight: 1.7 }}>
        {gh.weekPushes > 0 ? `${gh.weekPushes} push${gh.weekPushes === 1 ? '' : 'es'} across ${gh.weekRepos} repo${gh.weekRepos === 1 ? '' : 's'} this week` : 'Latest public pushes'}
        {gh.lastAt && `, last active ${timeAgo(gh.lastAt)}`}
      </Typography>
      <Stack spacing={1} sx={{ mt: 1.75 }}>
        {gh.items.map(it => (
          <Box key={it.sha} component="a" href={it.url} target="_blank" rel="noopener"
            sx={{ display: 'flex', alignItems: 'center', gap: 1.5, px: 1.75, py: 1.25, borderRadius: 2, border: '1px solid', borderColor: 'divider', color: 'inherit', textDecoration: 'none', bgcolor: '#fafaf9', transition: 'border-color 200ms ease, transform 220ms cubic-bezier(0.23, 1, 0.32, 1)', '&:hover': { borderColor: '#E5BE3E' }, '@media (hover: hover) and (pointer: fine)': { '&:hover': { transform: 'translateX(3px)' } } }}>
            <Box sx={{ color: '#1c1917', display: 'grid', placeItems: 'center', flexShrink: 0 }}>{I.github}</Box>
            <Box sx={{ minWidth: 0, flex: 1 }}>
              <Typography sx={{ fontWeight: 650, fontSize: 14 }}>{it.repo.split('/').pop()}</Typography>
              <Typography variant="body2" color="text.secondary" noWrap>{it.msg || 'Pushed new commits'}</Typography>
            </Box>
            <Stack direction="row" spacing={1.5} className="mono" sx={{ color: 'text.secondary', flexShrink: 0, fontSize: 12, display: { xs: 'none', sm: 'flex' } }}><span>{it.sha.slice(0, 7)}</span><span>{timeAgo(it.at)}</span></Stack>
          </Box>
        ))}
      </Stack>
      <Box sx={{ mt: 1.75 }}>{profile}</Box>
    </Box>
  );
  return <div ref={ref}>{body}</div>;
}

export function Now() {
  return (
    <Box component="section" id="now" sx={{ pt: { xs: 10, md: 14 }, pb: { xs: 11, md: 15 } }}>
      <Container maxWidth="lg">
        <SectionHead title="A live snapshot of what I am listening to, working on, and building." />
        <Box sx={{ display: 'grid', gap: 2, gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' } }}>
          {NOW.map((n, i) => {
            const span = i === 0 ? 'span 1' : i === 1 ? 'span 2' : '1 / -1';   // bento: 1 + 2 on the first row, GitHub full width below
            const dark = i === 1;                     // the "working on" tile is the dark feature tile
            return (
              <Box key={n.label} sx={{ gridColumn: { md: span } }}>
                <Reveal delay={i * .08} style={{ height: '100%' }}>
                  <SpotlightCard bg={dark ? '#0c0a09' : '#fff'} glow={dark ? .1 : .12} innerSx={{ p: 3, minHeight: 190, display: 'flex', flexDirection: 'column' }}>
                    <Stack direction="row" sx={{ justifyContent: 'space-between', alignItems: 'center' }}>
                      <span className="label" style={dark ? { color: 'rgba(255,255,255,.62)' } : undefined}>{n.label}</span>
                      {n.tag && <Chip size="small" label={n.tag} sx={{ bgcolor: '#E5BE3E', color: '#000', height: 22 }} />}
                      {dark && <Typography sx={{ color: '#E5BE3E', fontSize: 13, fontWeight: 500 }}>In progress</Typography>}
                    </Stack>
                    {n.title && <Typography component="h3" sx={{ mt: 2, fontWeight: 650, fontSize: dark ? 26 : 19, letterSpacing: '-0.02em', color: dark ? '#fff' : 'inherit', lineHeight: 1.2 }}>{n.title}</Typography>}
                    {n.body && <Typography sx={{ mt: 1.25, lineHeight: 1.7, color: dark ? 'rgba(255,255,255,.7)' : 'text.secondary', maxWidth: 560 }}>{n.body}</Typography>}
                    {n.github && <GitHubActivity />}
                    {n.label === 'Now listening to' && <Box sx={{ mt: 'auto', pt: 2 }}><div className="eq" aria-hidden="true"><span /><span /><span /><span /><span /></div></Box>}
                  </SpotlightCard>
                </Reveal>
              </Box>
            );
          })}
        </Box>
      </Container>
    </Box>
  );
}
