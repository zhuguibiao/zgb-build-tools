// babel-plugin-demo/demo/index.js
const fs = require("fs");
const path = require("path");

const { transformSync } = require("@babel/core");

const inputCode = `
  import { readFile } from 'node:fs';
  import * as fs from 'node:fs';
  export * from 'node:crypto';
  export { readFile } from 'node:fs';
  const path2 = require.resolve('node:path');
  const dynamic = import('node:url');
`;

const output = transformSync(inputCode, {
  plugins: [require.resolve("../index.js")],
});

console.log("Transformed Code:\n", output.code);

// Run this file with: node demo/index.js
