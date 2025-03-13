# @zgb-tools/webpack-plugin-zip&middot; [![npm version](https://img.shields.io/npm/v/@zgb-tools/webpack-plugin-zip)](https://www.npmjs.com/package/@zgb-tools/webpack-plugin-zip)

This plugin zip your dist each time at the end of the build.

## Installation

```bash
npm i -D @zgb-tools/webpack-plugin-zip

or pnpm add -D @zgb-tools/webpack-plugin-zip 

or yarn add -D @zgb-tools/webpack-plugin-zip 
```

## Usage
```ts
import webpackPluginZip from "@zgb-tools/webpack-plugin-zip"

plugins: [new webpackPluginZip()],
```