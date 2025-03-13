// babel-plugin-demo/tests/test.js
import { describe, it, expect } from "vitest";
import { transformSync } from "@babel/core";
import myBabelPlugin from "../index";

describe("my-babel-plugin", () => {
  it("should replace 'hello' with 'world'", () => {
    const inputCode = `
        import fs from 'node:fs';
        import path from 'node:path';

        const dynamic = import('node:url');
        const fs2 = require('node:fs');
        const path2 = require.resolve('node:path');

        export * as fs from 'node:fs';
        export * from 'node:crypto';
        export { readFile } from 'node:fs';

        module.exports = { fs: require('node:fs') };
        module.exports.fs = require('node:fs');

        /** ignore */
        console.log('node:fs');
        fn('node:fs');
    `
    const output = transformSync(inputCode, { plugins: [myBabelPlugin] });
    console.log('输出:', output.code)
    expect(output.code).toMatchSnapshot();
  });
});

