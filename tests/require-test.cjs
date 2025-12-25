const belog = require('../dist/index.cjs');

belog('debug javascript', { name: 'test' }).toFile('cjs-belog.log').inColor('magenta').withPrefix('rente').when(false);
