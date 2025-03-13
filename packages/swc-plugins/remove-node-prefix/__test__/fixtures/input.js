import fs from 'node:fs';
import path from 'node:path';

const dynamic = import('node:url');
const fs2 = require('node:fs');
const path2 = require.resolve('node:path');

export * as fs3 from 'node:fs';
export * from 'node:crypto';
export { readFile } from 'node:fs';

module.exports = { fs: require('node:fs') };
module.exports.fs = require('node:fs');

/** ignore */
console.log('node:fs');
fn('node:fs')