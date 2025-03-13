module.exports = function removeNodeProtocol({ types: t }) {
  function removeNodeProtocolFn(node) {
    if (t.isStringLiteral(node) && node.value.startsWith("node:")) {
      return t.stringLiteral(node.value.slice(5));
    }
    return node;
  }
  return {
    name: "remove-node-prefix",
    visitor: {
      ImportDeclaration(path) {
        path.node.source = removeNodeProtocolFn(path.node.source);
      },
      CallExpression(path) {
        const { callee, arguments: args } = path.node;
        if (
          (t.isIdentifier(callee, { name: "require" }) ||
            (t.isMemberExpression(callee) &&
              t.isIdentifier(callee.object, { name: "require" }) &&
              t.isIdentifier(callee.property, { name: "resolve" }))) &&
          args.length > 0
        ) {
          args[0] = removeNodeProtocolFn(args[0]);
        }
        if (callee.type === "Import" && args.length > 0) {
          args[0] = removeNodeProtocolFn(args[0]);
        }
      },
      ExportAllDeclaration(path) {
        path.node.source = removeNodeProtocolFn(path.node.source);
      },
      ExportNamedDeclaration(path) {
        path.node.source = removeNodeProtocolFn(path.node.source);
      },
    },
  };
};
