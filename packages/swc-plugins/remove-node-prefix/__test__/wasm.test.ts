import { expect, test } from "vitest";
import { transform } from "@swc/core";
import path from "node:path";
import url from "node:url";
import fs from "node:fs/promises";

const pluginName = "swc_plugin_remove_node_prefix.wasm";
const transformCode = async (code: string, options = {}) => {
  return transform(code, {
    jsc: {
      parser: {
        syntax: "ecmascript",
      },
      target: "es2018",
      experimental: {
        plugins: [
          [
            path.join(
              path.dirname(url.fileURLToPath(import.meta.url)),
              "..",
              pluginName,
            ),
            options,
          ],
        ],
      },
    },
    filename: "test.js",
  });
};

test("Should load remove-console wasm plugin correctly", async () => {
  const input = await fs.readFile(
    new URL("./fixtures/input.js", import.meta.url),
    "utf-8",
  );

  const { code } = await transformCode(input);
  console.log('input:---',input)
  console.log('output:---',code)
  expect(code).toMatchSnapshot();
});
