"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.YhUIResolver = YhUIResolver;

function YhUIResolver(options = {}) {
  const {
    importStyle = true
  } = options;
  return {
    type: "component",
    resolve: name => {
      if (name.startsWith("Yh")) {
        return {
          name,
          from: "@yh-ui/components",
          sideEffects: importStyle ? "@yh-ui/components/style" : void 0
        };
      }
    }
  };
}
module.exports = YhUIResolver;