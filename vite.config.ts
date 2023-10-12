import * as path from 'path';

import react from '@vitejs/plugin-react-swc';
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';
import svgr from 'vite-plugin-svgr';

import pkg from './package.json';

export default defineConfig(({ command }) => {
  const alias = [
    { find: '@', replacement: path.resolve(__dirname, 'src') },
    {
      find: '@assets',
      replacement: path.resolve(__dirname, 'src/assets')
    },
    {
      find: '@components',
      replacement: path.resolve(__dirname, 'src/components')
    },
    {
      find: '@utils',
      replacement: path.resolve(__dirname, 'src/utils')
    }
  ];

  if (command === 'serve') {
    return {
      plugins: [
        svgr({
          include: '**/*.svg'
        })
      ],
      resolve: {
        alias
      }
    };
  }

  return {
    build: {
      lib: {
        entry: 'src/index.ts',
        name: 'cocstorage-ui-icons',
        formats: ['cjs', 'es'],
        fileName: (fileName) => (fileName === 'cjs' ? 'index.js' : 'index.es.js')
      },
      rollupOptions: {
        external: [...Object.keys(pkg.peerDependencies), /@emotion/g],
        output: {
          exports: 'named',
          interop: 'auto'
        }
      }
    },
    plugins: [
      react({
        jsxImportSource: '@emotion/react'
      }),
      dts({ insertTypesEntry: true }),
      svgr({
        include: '**/*.svg'
      })
    ],
    resolve: {
      alias
    },
    define: {
      'process.env.NODE_ENV': '"production"'
    }
  };
});
