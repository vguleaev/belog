import belog from '../dist/index.mjs';

belog('debug javascript', { name: 'test' }).toFile('esm-belog.log').inColor('magenta').withPrefix('rente').when(false);
