import { renderToString } from 'react-dom/server';
import createCache from '@emotion/cache';
import { CacheProvider } from '@emotion/react';
import createEmotionServer from '@emotion/server/create-instance';
import { App } from './App.jsx';

// Build-time render: returns the page HTML plus only the Emotion/MUI CSS that HTML uses.
export function render() {
  const cache = createCache({ key: 'css' });
  const { extractCriticalToChunks, constructStyleTagsFromChunks } = createEmotionServer(cache);
  const html = renderToString(<CacheProvider value={cache}><App /></CacheProvider>);
  return { html, styles: constructStyleTagsFromChunks(extractCriticalToChunks(html)) };
}
