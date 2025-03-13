# @zgb-tools/swc-plugin-remove-node-prefix&middot; [![npm version](https://img.shields.io/npm/v/@zgb-tools/swc-plugin-remove-node-prefix)](https://www.npmjs.com/package/@zgb-tools/swc-plugin-remove-node-prefix)

An SWC plugin to remove "node:" 

## Installation
Install with your favorite package manager as devDependency.

```bash
npm i -D @zgb-tools/swc-plugin-remove-node-prefix

or pnpm add -D @zgb-tools/swc-plugin-remove-node-prefix 

or yarn add -D @zgb-tools/swc-plugin-remove-node-prefix 
```
You can check the compatibility of versions on https://plugins.swc.rs/

## Usage
Via `.swcrc`

```json
{
  "jsc": {
    "experimental": {
      "plugins": [
        [
          "@zgb-tools/swc-plugin-remove-node-prefix"
        ]
      ]
    }
  }
}
```
Input Code:
```ts
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
```
Output:  
``` ts
    import fs from 'fs';
    import path from 'path';
    
    const dynamic = import('url');
    const fs2 = require('fs');
    const path2 = require.resolve('path');
    
    export * as fs3 from 'fs';
    export * from 'crypto';
    export { readFile } from 'fs';

    module.exports = {fs: require('fs')};
    module.exports.fs = require('fs');

    console.log('node:fs');
    fn('node:fs');

```

## Dev
environment:
- [swc](https://swc.rs/docs/plugin/ecmascript/getting-started)
- [rust](https://doc.rust-lang.org/book/)
```
pnpm install

pnpm run prepack 

pnpm run test

cargo test
```