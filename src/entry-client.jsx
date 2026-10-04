import { hydrateRoot } from 'react-dom/client';
import createCache from '@emotion/cache';
import { CacheProvider } from '@emotion/react';
import { App } from './App.jsx';

// The HTML is prerendered at build time (scripts/build.mjs); this attaches React to it.
// Emotion picks up the server-rendered <style data-emotion="css ..."> tags from the same cache key.
const cache = createCache({ key: 'css' });
hydrateRoot(document.getElementById('root'), <CacheProvider value={cache}><App /></CacheProvider>);
window.__hydrated = true;
