import { DEFAULT_EXTENSIONS } from '@babel/core';
import babel from '@rollup/plugin-babel';
import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import terser from '@rollup/plugin-terser';
import typescript from '@rollup/plugin-typescript';
import svgr from '@svgr/rollup';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';

import packageJson from './package.json';

const outputs = [
  {
    file: packageJson.main,
    format: 'cjs',
    exports: 'auto'
  },
  {
    file: packageJson.module,
    format: 'esm',
    exports: 'auto'
  }
];

const extensions = [...DEFAULT_EXTENSIONS, '.ts', '.tsx'];

export default outputs.map((output) => {
  return {
    input: 'src/index.ts',
    output,
    external: [/@babel\/runtime/],
    plugins: [
      peerDepsExternal(),
      babel({
        babelHelpers: 'runtime',
        exclude: 'node_modules/**',
        plugins: ['@babel/plugin-transform-runtime'],
        extensions
      }),
      commonjs({
        extensions
      }),
      typescript({ tsconfig: './tsconfig.json' }),
      resolve({
        extensions
      }),
      svgr(),
      terser()
    ]
  };
});
