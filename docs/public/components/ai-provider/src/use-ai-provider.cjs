"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useAiProvider = useAiProvider;
var _vue = require("vue");
var _aiProvider = require("./ai-provider.cjs");
function useAiProvider() {
  return (0, _vue.inject)(_aiProvider.AI_PROVIDER_KEY, {});
}