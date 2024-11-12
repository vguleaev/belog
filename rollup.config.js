import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';

export default [
  // Node.js build
  {
    input: 'src/index.js',
    output: [
      {
        file: 'dist/index.cjs',
        format: 'cjs'
      },
      {
        file: 'dist/index.mjs',
        format: 'esm'
      }
    ],
    plugins: [resolve(), commonjs()],
    external: ['fs'] // Exclude fs from bundling for Node.js
  },
  // Browser build
  {
    input: 'src/index.js',
    output: {
      file: 'dist/browser.js',
      format: 'esm'
    },
    plugins: [
      resolve({
        browser: true, // Use browser-specific builds
      }),
      commonjs()
    ]
  }
];
