"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _vue = require("vue");
var _message = _interopRequireDefault(require("./message.vue"));
require("./message.css");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const instances = [];
let seed = 1;
const getOffset = (placement, offset) => {
  return instances.filter(ctx => ctx.props.placement === placement).reduce((acc, ctx) => {
    const el = ctx.handler.el;
    if (el) {
      return acc + el.offsetHeight + 16;
    }
    return acc;
  }, offset);
};
const createMessage = options => {
  const placement = options.placement || "top";
  const defOffset = placement.startsWith("top") ? 64 : 20;
  if (options.grouping) {
    const existingCtx = instances.find(ctx => {
      return ctx.props.message === options.message && (ctx.props.type || "info") === (options.type || "info") && !ctx.handler.closed;
    });
    if (existingCtx) {
      existingCtx.props.repeatNum = (existingCtx.props.repeatNum || 1) + 1;
      return existingCtx.handler;
    }
  }
  const id = `message_${seed++}`;
  const userOnClose = options.onClose;
  const props = (0, _vue.shallowReactive)({
    ...options,
    id,
    placement,
    offset: getOffset(placement, options.offset || defOffset),
    repeatNum: options.repeatNum || 1,
    onClose: () => {
      closeMessage(id);
      userOnClose?.();
    }
  });
  const container = document.createElement("div");
  container.className = `yh-message-container_${id}`;
  container.style.pointerEvents = "none";
  const onDestroy = () => {
    (0, _vue.render)(null, container);
    if (document.body.contains(container)) {
      document.body.removeChild(container);
    }
  };
  const vnodeProps = {
    ...props,
    onDestroy
  };
  const vnode = (0, _vue.createVNode)(_message.default, vnodeProps, null);
  (0, _vue.render)(vnode, container);
  document.body.appendChild(container);
  const vm = vnode.component;
  const handler = {
    close: () => {
      handler.closed = true;
      vm.exposed.close();
    },
    get el() {
      return vm.proxy?.$el;
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
const closeMessage = id => {
  const index = instances.findIndex(ctx2 => ctx2.id === id);
  if (index === -1) return;
  const ctx = instances[index];
  const placement = ctx.props.placement;
  const offset = ctx.props.offset;
  const height = ctx.handler.el?.offsetHeight || 0;
  instances.splice(index, 1);
  const samePlacementInstances = instances.filter(c => c.props.placement === placement);
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
  activeInstances.forEach(ctx => {
    ctx.handler.close();
  });
};
const Message = options => {
  if (typeof options === "string") {
    options = {
      message: options
    };
  }
  return createMessage(options);
};
Message.success = message => {
  const options = typeof message === "string" ? {
    message
  } : message;
  return createMessage({
    ...options,
    type: "success"
  });
};
Message.warning = message => {
  const options = typeof message === "string" ? {
    message
  } : message;
  return createMessage({
    ...options,
    type: "warning"
  });
};
Message.info = message => {
  const options = typeof message === "string" ? {
    message
  } : message;
  return createMessage({
    ...options,
    type: "info"
  });
};
Message.error = message => {
  const options = typeof message === "string" ? {
    message
  } : message;
  return createMessage({
    ...options,
    type: "error"
  });
};
Message.closeAll = closeAll;
module.exports = Message;