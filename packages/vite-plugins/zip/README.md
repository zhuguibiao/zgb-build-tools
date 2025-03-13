# @zgb-tools/vite-plugin-zip&middot; [![npm version](https://img.shields.io/npm/v/@zgb-tools/vite-plugin-zip)](https://www.npmjs.com/package/@zgb-tools/vite-plugin-zip)

This plugin zip your dist each time at the end of the build.

## Installation

```bash
npm i -D @zgb-tools/vite-plugin-zip

or pnpm add -D @zgb-tools/vite-plugin-zip 

or yarn add -D @zgb-tools/vite-plugin-zip 
```

## Usage
```ts
import VitePluginZip from "@zgb-tools/vite-plugin-zip"

export default defineConfig({
  plugins: [vitePluginZip()],
})
```