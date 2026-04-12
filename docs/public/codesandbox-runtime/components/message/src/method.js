var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
import { createVNode, render, shallowReactive } from "vue";
import MessageConstructor from "./message.js";
import "./message.css";
const instances = [];
let seed = 1;
const getOffset = (placement, offset) => {
  return instances.filter((ctx) => ctx.props.placement === placement).reduce((acc, ctx) => {
    const el = ctx.handler.el;
    if (el) {
      return acc + el.offsetHeight + 16;
    }
    return acc;
  }, offset);
};
const createMessage = (options) => {
  const placement = options.placement || "top";
  const defOffset = placement.startsWith("top") ? 64 : 20;
  if (options.grouping) {
    const existingCtx = instances.find((ctx) => {
      return ctx.props.message === options.message && (ctx.props.type || "info") === (options.type || "info") && !ctx.handler.closed;
    });
    if (existingCtx) {
      existingCtx.props.repeatNum = (existingCtx.props.repeatNum || 1) + 1;
      return existingCtx.handler;
    }
  }
  const id = `message_${seed++}`;
  const userOnClose = options.onClose;
  const props = shallowReactive(__spreadProps(__spreadValues({}, options), {
    id,
    placement,
    offset: getOffset(placement, options.offset || defOffset),
    repeatNum: options.repeatNum || 1,
    onClose: () => {
      closeMessage(id);
      userOnClose == null ? void 0 : userOnClose();
    }
  }));
  const container = document.createElement("div");
  container.className = `yh-message-container_${id}`;
  container.style.pointerEvents = "none";
  const onDestroy = () => {
    render(null, container);
    if (document.body.contains(container)) {
      document.body.removeChild(container);
    }
  };
  const vnodeProps = __spreadProps(__spreadValues({}, props), {
    onDestroy
  });
  const vnode = createVNode(MessageConstructor, vnodeProps, null);
  render(vnode, container);
  document.body.appendChild(container);
  const vm = vnode.component;
  const handler = {
    close: () => {
      handler.closed = true;
      vm.exposed.close();
    },
    get el() {
      var _a;
      return (_a = vm.proxy) == null ? void 0 : _a.$el;
    },
    closed: false
  };
  const context = {
    id,
    props,
    handler,
    vnode
  };
  instances.push(context);
  return handler;
};
const closeMessage = (id) => {
  var _a;
  const index = instances.findIndex((ctx2) => ctx2.id === id);
  if (index === -1) return;
  const ctx = instances[index];
  const placement = ctx.props.placement;
  const offset = ctx.props.offset;
  const height = ((_a = ctx.handler.el) == null ? void 0 : _a.offsetHeight) || 0;
  instances.splice(index, 1);
  const samePlacementInstances = instances.filter((c) => c.props.placement === placement);
  for (let i = 0; i < samePlacementInstances.length; i++) {
    const currentCtx = samePlacementInstances[i];
    if (currentCtx.props.offset > offset) {
      const nextEl = currentCtx.handler.el;
      if (!nextEl) continue;
      const newPos = currentCtx.props.offset - height - 16;
      currentCtx.props.offset = newPos;
      if (placement.startsWith("top")) {
        nextEl.style.top = `${newPos}px`;
      } else {
        nextEl.style.bottom = `${newPos}px`;
      }
    }
  }
};
const closeAll = () => {
  const activeInstances = [...instances];
  activeInstances.forEach((ctx) => {
    ctx.handler.close();
  });
};
const Message = ((options) => {
  if (typeof options === "string") {
    options = { message: options };
  }
  return createMessage(options);
});
Message.success = (message) => {
  const options = typeof message === "string" ? { message } : message;
  return createMessage(__spreadProps(__spreadValues({}, options), { type: "success" }));
};
Message.warning = (message) => {
  const options = typeof message === "string" ? { message } : message;
  return createMessage(__spreadProps(__spreadValues({}, options), { type: "warning" }));
};
Message.info = (message) => {
  const options = typeof message === "string" ? { message } : message;
  return createMessage(__spreadProps(__spreadValues({}, options), { type: "info" }));
};
Message.error = (message) => {
  const options = typeof message === "string" ? { message } : message;
  return createMessage(__spreadProps(__spreadValues({}, options), { type: "error" }));
};
Message.closeAll = closeAll;
var stdin_default = Message;
export {
  stdin_default as default
};
