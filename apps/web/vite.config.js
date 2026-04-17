import path from 'node:path';
import react from '@vitejs/plugin-react';
import { createLogger, defineConfig } from 'vite';

const isDev = process.env.NODE_ENV === 'development';

export default defineConfig(async () => {
  const plugins = [];

  if (isDev) {
    try {
      const { default: inlineEditPlugin } = await import('./plugins/visual-editor/vite-plugin-react-inline-editor.js');
      const { default: editModeDevPlugin } = await import('./plugins/visual-editor/vite-plugin-edit-mode.js');
      const { default: selectionModePlugin } = await import('./plugins/selection-mode/vite-plugin-selection-mode.js');
      const { default: iframeRouteRestorationPlugin } = await import('./plugins/vite-plugin-iframe-route-restoration.js');
      const { default: pocketbaseAuthPlugin } = await import('./plugins/vite-plugin-pocketbase-auth.js');
      plugins.push(inlineEditPlugin(), editModeDevPlugin(), selectionModePlugin(), iframeRouteRestorationPlugin(), pocketbaseAuthPlugin());
    } catch (e) {
      console.warn('Dev plugins not loaded:', e.message);
    }
  }

  return {
    plugins: [
      ...plugins,
      react(),
    ],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
    build: {
      outDir: '../../dist/apps/web',
      emptyOutDir: true,
    },
  };
});
