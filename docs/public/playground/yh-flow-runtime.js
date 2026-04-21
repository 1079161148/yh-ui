var zw = Object.defineProperty;
var Fw = (e, a, n) => a in e ? zw(e, a, { enumerable: !0, configurable: !0, writable: !0, value: n }) : e[a] = n;
var ye = (e, a, n) => Fw(e, typeof a != "symbol" ? a + "" : a, n);
import { inject as Bd, provide as Ag, ref as ee, computed as J, shallowRef as Ra, defineComponent as ie, onMounted as Ct, onBeforeUnmount as Gd, watch as Le, openBlock as H, createElementBlock as E, withModifiers as we, normalizeStyle as re, normalizeClass as te, createCommentVNode as I, createElementVNode as b, markRaw as Va, unref as De, Fragment as pe, renderList as ke, nextTick as Bw, toDisplayString as ae, renderSlot as ut, createBlock as Ve, Teleport as Ka, useCssVars as Gw, onUnmounted as Jw, mergeProps as Ht, resolveDynamicComponent as Pa, createVNode as We, Transition as Jd, withCtx as jt, withDirectives as je, withKeys as Ud, vModelText as Pe, vModelSelect as Uw, vModelCheckbox as Ww, createTextVNode as Vw, normalizeProps as vc, guardReactiveProps as yc, getCurrentInstance as Kw } from "vue";
function q(e, a) {
  for (var n = 0; n < a.length; n++) {
    const r = a[n];
    if (typeof r != "string" && !Array.isArray(r)) {
      for (const o in r)
        if (o !== "default" && !(o in e)) {
          const s = Object.getOwnPropertyDescriptor(r, o);
          s && Object.defineProperty(e, o, s.get ? s : {
            enumerable: !0,
            get: () => r[o]
          });
        }
    }
  }
  return Object.freeze(Object.defineProperty(e, Symbol.toStringTag, { value: "Module" }));
}
const Rg = Symbol("flow-context");
function X3(e, a, n, r = {}) {
  const o = /* @__PURE__ */ new Map();
  return {
    on: (u, l) => {
      o.has(u) || o.set(u, /* @__PURE__ */ new Set()), o.get(u).add(l);
    },
    off: (u, l) => {
      var d;
      (d = o.get(u)) == null || d.delete(l);
    },
    emit: (u, ...l) => {
      var d;
      (d = o.get(u)) == null || d.forEach((c) => c(...l));
    }
  };
}
function Z3() {
  const e = Bd(Rg);
  if (!e)
    throw new Error("useFlowContext must be used within a Flow component");
  return e;
}
function Q3(e) {
  Ag(Rg, e);
}
function Et(e, a, n) {
  return {
    x: (e - n.x) / n.zoom,
    y: (a - n.y) / n.zoom
  };
}
function Ia(e, a, n) {
  return {
    x: e * n.zoom + n.x,
    y: a * n.zoom + n.y
  };
}
function ez(e, a, n) {
  const r = Et(e.x, e.y, a);
  return Ia(r.x, r.y, n);
}
function Xw(e, a) {
  const n = a.getBoundingClientRect(), r = e.getBoundingClientRect();
  return {
    x: r.left - n.left,
    y: r.top - n.top
  };
}
function tz(e, a, n) {
  const r = Xw(e, a);
  return Et(r.x, r.y, n);
}
function rz(e, a) {
  return Math.sqrt(Math.pow(a.x - e.x, 2) + Math.pow(a.y - e.y, 2));
}
function nz(e, a) {
  return {
    x: a.x - e.x,
    y: a.y - e.y
  };
}
function Zw(e) {
  return Math.sqrt(e.x * e.x + e.y * e.y);
}
function az(e) {
  const a = Zw(e);
  return a === 0 ? { x: 0, y: 0 } : {
    x: e.x / a,
    y: e.y / a
  };
}
function gc(e, a) {
  return Math.round(e / a) * a;
}
function Qw(e, a) {
  return {
    x: gc(e.x, a[0]),
    y: gc(e.y, a[1])
  };
}
function ex(e, a = {}) {
  const { minZoom: n = 0.1, maxZoom: r = 5, zoomStep: o = 0.1, panZoomSpeed: s = 1 } = a, t = e, i = (g) => {
    t.value = {
      x: g.x,
      y: g.y,
      zoom: Math.min(Math.max(g.zoom, n), r)
    };
  }, u = (g, M, Y) => {
    i({ x: g, y: M, zoom: Y });
  }, l = (g = 1.2) => {
    const M = Math.min(t.value.zoom * g, r);
    t.value = { ...t.value, zoom: M };
  }, d = (g = 1.2) => {
    const M = Math.max(t.value.zoom / g, n);
    t.value = { ...t.value, zoom: M };
  }, c = (g, M) => {
    const Y = Math.min(Math.max(g, n), r);
    if (!M) {
      t.value = { ...t.value, zoom: Y };
      return;
    }
    const L = Et(M.x, M.y, t.value), D = {
      ...t.value,
      zoom: Y
    }, w = Ia(L.x, L.y, D), T = M.x - w.x, k = M.y - w.y;
    t.value = {
      ...D,
      x: D.x + T,
      y: D.y + k
    };
  }, _ = (g, M) => {
    t.value = {
      ...t.value,
      x: t.value.x + g * s,
      y: t.value.y + M * s
    };
  }, f = (g, M) => {
    t.value = { ...t.value, x: g, y: M };
  };
  return {
    transform: t,
    setTransform: i,
    setViewport: u,
    zoomIn: l,
    zoomOut: d,
    zoomTo: c,
    pan: _,
    panTo: f,
    fitView: (g, M, Y = {}) => {
      if (M.length === 0) return;
      const L = Y.padding ?? 50;
      let D = 1 / 0, w = 1 / 0, T = -1 / 0, k = -1 / 0;
      for (const z of M) {
        const W = z.width || 200, Z = z.height || 50;
        D = Math.min(D, z.position.x), w = Math.min(w, z.position.y), T = Math.max(T, z.position.x + W), k = Math.max(k, z.position.y + Z);
      }
      const S = T - D + L * 2, F = k - w + L * 2, B = g.width / S, $ = g.height / F, x = Math.min(B, $, 1), j = (g.width - S * x) / 2 - D * x + L * x, G = (g.height - F * x) / 2 - w * x + L * x;
      i({ x: j, y: G, zoom: x });
    },
    center: (g, M, Y = {}) => {
      if (M.length === 0) return;
      const L = Y.padding ?? 50;
      let D = 0, w = 0;
      for (const S of M) {
        const F = S.width || 200, B = S.height || 50;
        D += S.position.x + F / 2, w += S.position.y + B / 2;
      }
      D /= M.length, w /= M.length;
      const T = g.width / 2 - D * t.value.zoom + L, k = g.height / 2 - w * t.value.zoom + L;
      f(T, k);
    },
    screenToCanvas: (g, M) => Et(g, M, t.value),
    canvasToScreen: (g, M) => Ia(g, M, t.value),
    isNodeVisible: (g, M) => {
      const L = {
        x: -t.value.x / t.value.zoom - 100,
        y: -t.value.y / t.value.zoom - 100,
        width: M.width / t.value.zoom + 200,
        height: M.height / t.value.zoom + 200
      };
      return !(g.x + g.width < L.x || g.x > L.x + L.width || g.y + g.height < L.y || g.y > L.y + L.height);
    }
  };
}
function tx(e, a) {
  const { nodes: n, snapToGrid: r = !1, snapGrid: o = [15, 15], onNodesChange: s } = a;
  return {
    nodes: n,
    addNode: (p) => {
      n.value = [...n.value, p], s == null || s([{ type: "select", id: p.id, item: p, selected: !0 }]);
    },
    removeNode: (p) => {
      n.value = n.value.filter((v) => v.id !== p), s == null || s([{ type: "remove", id: p, item: {} }]);
    },
    updateNode: (p, v) => {
      n.value = n.value.map((g) => g.id === p ? { ...g, ...v } : g);
    },
    updateNodePosition: (p, v, g) => {
      let M = v;
      r && (M = Qw(v, o)), n.value = n.value.map((L) => L.id === p ? { ...L, position: M, dragging: (g == null ? void 0 : g.dragging) ?? !1 } : L);
      const Y = n.value.find((L) => L.id === p);
      Y && (s == null || s([
        {
          type: "position",
          id: p,
          item: Y,
          position: M,
          drag: g == null ? void 0 : g.dragging
        }
      ]));
    },
    setNodes: (p) => {
      n.value = p;
    },
    getNode: (p) => n.value.find((v) => v.id === p),
    getSelectedNodes: () => n.value.filter((p) => p.selected),
    selectNode: (p, v = !0, g = !1) => {
      n.value = n.value.map((Y) => g ? Y.id === p ? { ...Y, selected: v } : Y : Y.id === p ? { ...Y, selected: v } : { ...Y, selected: !1 });
      const M = n.value.find((Y) => Y.id === p);
      M && (s == null || s([{ type: "select", id: p, item: M, selected: v }]));
    },
    selectNodes: (p, v = !0) => {
      n.value = n.value.map((g) => p.includes(g.id) ? { ...g, selected: v } : g);
    },
    clearSelection: () => {
      n.value = n.value.map((p) => ({ ...p, selected: !1 }));
    },
    findNode: (p) => n.value.find((v) => v.id === p)
  };
}
function rx(e) {
  const { edges: a, nodes: n, onEdgesChange: r, isValidConnection: o } = e;
  return {
    edges: a,
    addEdge: (y) => {
      o && !o({
        source: y.source,
        target: y.target,
        sourceHandle: y.sourceHandle,
        targetHandle: y.targetHandle
      }) || a.value.some((v) => v.source === y.source && v.target === y.target) || (a.value = [...a.value, y], r == null || r([{ type: "select", id: y.id, item: y, selected: !0 }]));
    },
    removeEdge: (y) => {
      a.value = a.value.filter((p) => p.id !== y), r == null || r([{ type: "remove", id: y, item: {} }]);
    },
    updateEdge: (y, p) => {
      a.value = a.value.map((v) => v.id === y ? { ...v, ...p } : v);
    },
    setEdges: (y) => {
      a.value = y;
    },
    getEdge: (y) => a.value.find((p) => p.id === y),
    getSelectedEdges: () => a.value.filter((y) => y.selected),
    selectEdge: (y, p = !0, v = !1) => {
      a.value = a.value.map((M) => v ? M.id === y ? { ...M, selected: p } : M : M.id === y ? { ...M, selected: p } : { ...M, selected: !1 });
      const g = a.value.find((M) => M.id === y);
      g && (r == null || r([{ type: "select", id: y, item: g, selected: p }]));
    },
    selectEdges: (y, p = !0) => {
      a.value = a.value.map((v) => y.includes(v.id) ? { ...v, selected: p } : v);
    },
    clearSelection: () => {
      a.value = a.value.map((y) => ({ ...y, selected: !1 }));
    },
    getEdgesForNode: (y) => a.value.filter((p) => p.source === y || p.target === y),
    getConnectedEdges: (y) => a.value.filter((p) => p.source === y || p.target === y)
  };
}
function nx(e) {
  const { nodes: a, edges: n, onSelectionChange: r } = e, o = ee(null), s = ee(!1), t = ee({ x: 0, y: 0 }), i = J(() => a.value.filter((f) => f.selected)), u = J(() => n.value.filter((f) => f.selected));
  return {
    selectionRect: o,
    isSelecting: s,
    selectedNodes: i,
    selectedEdges: u,
    startSelection: (f, m) => {
      t.value = { x: f, y: m }, o.value = { x: f, y: m, width: 0, height: 0 }, s.value = !0;
    },
    updateSelection: (f, m) => {
      if (!s.value) return;
      const h = Math.min(t.value.x, f), y = Math.min(t.value.y, m), p = Math.max(t.value.x, f), v = Math.max(t.value.y, m);
      o.value = {
        x: h,
        y,
        width: p - h,
        height: v - y
      }, a.value = a.value.map((g) => {
        const M = g.width || 200, Y = g.height || 50, L = g.position.x >= h && g.position.y >= y && g.position.x + M <= p && g.position.y + Y <= v;
        return { ...g, selected: L };
      });
    },
    endSelection: () => {
      s.value = !1, o.value = null, r == null || r(i.value, u.value);
    },
    clearSelection: () => {
      a.value = a.value.map((f) => ({ ...f, selected: !1 })), n.value = n.value.map((f) => ({ ...f, selected: !1 })), r == null || r([], []);
    }
  };
}
function ax(e, a, n = {}) {
  const { maxHistory: r = 50, onHistoryChange: o } = n, s = Ra([]), t = ee(-1), i = J(() => t.value > 0), u = J(() => t.value < s.value.length - 1);
  return {
    canUndo: i,
    canRedo: u,
    undo: () => {
      if (!i.value) return;
      t.value--;
      const f = s.value[t.value];
      f && (e.value = JSON.parse(JSON.stringify(f.nodes)), a.value = JSON.parse(JSON.stringify(f.edges))), o == null || o(i.value, u.value);
    },
    redo: () => {
      if (!u.value) return;
      t.value++;
      const f = s.value[t.value];
      f && (e.value = JSON.parse(JSON.stringify(f.nodes)), a.value = JSON.parse(JSON.stringify(f.edges))), o == null || o(i.value, u.value);
    },
    push: (f) => {
      const m = s.value.slice(0, t.value + 1);
      m.push({
        nodes: JSON.parse(JSON.stringify(f.nodes)),
        edges: JSON.parse(JSON.stringify(f.edges))
      }), m.length > r && m.shift(), s.value = m, t.value = m.length - 1, o == null || o(i.value, u.value);
    },
    clear: () => {
      s.value = [], t.value = -1, o == null || o(!1, !1);
    }
  };
}
function ox(e = {}) {
  const {
    enabled: a = !0,
    onDelete: n,
    onCopy: r,
    onPaste: o,
    onUndo: s,
    onRedo: t,
    onSelectAll: i,
    onEscape: u
  } = e;
  return {
    handleKeyDown: (d) => {
      var f;
      if (!a) return;
      const c = d.key, _ = d.ctrlKey || d.metaKey;
      (c === "Delete" || c === "Backspace") && !((f = d.target) != null && f.toString().includes("Input")) && (d.preventDefault(), n == null || n()), _ && c === "c" && (r == null || r()), _ && c === "v" && (o == null || o({ nodes: [], edges: [] })), _ && c === "z" && !d.shiftKey && (d.preventDefault(), s == null || s()), (_ && c === "z" && d.shiftKey || _ && c === "y") && (d.preventDefault(), t == null || t()), _ && c === "a" && (d.preventDefault(), i == null || i()), c === "Escape" && (u == null || u());
    }
  };
}
function sx(e) {
  const { nodes: a, snapThreshold: n = 10 } = e, r = ee([]), o = ee([]), s = (i, u) => {
    const l = a.value.find((p) => p.id === i);
    if (!l)
      return { x: u.x, y: u.y, snappedX: !1, snappedY: !1 };
    const d = l.width || 200, c = l.height || 50, _ = a.value.filter((p) => p.id !== i);
    let f = !1, m = !1;
    const h = [u.y, u.y + c / 2, u.y + c];
    for (const p of _) {
      const v = p.height || 50, g = [
        p.position.y,
        p.position.y + v / 2,
        p.position.y + v
      ];
      for (let M = 0; M < h.length; M++) {
        for (const Y of g)
          if (Math.abs(h[M] - Y) < n) {
            M === 0 ? u.y = Y : M === 1 ? u.y = Y - c / 2 : u.y = Y - c, m = !0;
            break;
          }
        if (m) break;
      }
      if (m) break;
    }
    const y = [u.x, u.x + d / 2, u.x + d];
    for (const p of _) {
      const v = p.width || 200, g = [
        p.position.x,
        p.position.x + v / 2,
        p.position.x + v
      ];
      for (let M = 0; M < y.length; M++) {
        for (const Y of g)
          if (Math.abs(y[M] - Y) < n) {
            M === 0 ? u.x = Y : M === 1 ? u.x = Y - d / 2 : u.x = Y - v, f = !0;
            break;
          }
        if (f) break;
      }
    }
    return { x: u.x, y: u.y, snappedX: f, snappedY: m };
  };
  return {
    snapToAlignment: (i, u) => {
      const l = s(i, u);
      return { x: l.x, y: l.y };
    },
    getAlignmentSnap: s,
    horizontalSnapLines: r,
    verticalSnapLines: o
  };
}
function oz(e) {
  const { nodes: a } = e;
  return {
    distributeHorizontally: (t, i = 50) => {
      const u = t || a.value.filter((y) => y.selected).map((y) => y.id);
      if (u.length < 3) return;
      const l = a.value.filter((y) => u.includes(y.id));
      l.sort((y, p) => y.position.x - p.position.x);
      const d = l[0], c = l[l.length - 1], _ = c.width || 200, f = l.reduce((y, p) => y + (p.width || 200), 0), m = i * (l.length - 1);
      if (c.position.x + _ - d.position.x - f - m <= 0) {
        let y = d.position.x;
        l.forEach((p) => {
          const v = a.value.findIndex((g) => g.id === p.id);
          v >= 0 && (a.value[v] = {
            ...a.value[v],
            position: { ...a.value[v].position, x: y }
          }), y += (p.width || 200) + i;
        });
      } else {
        let y = d.position.x;
        l.forEach((p) => {
          const v = a.value.findIndex((g) => g.id === p.id);
          v >= 0 && (a.value[v] = {
            ...a.value[v],
            position: { ...a.value[v].position, x: y }
          }), y += (p.width || 200) + i;
        });
      }
    },
    distributeVertically: (t, i = 50) => {
      const u = t || a.value.filter((y) => y.selected).map((y) => y.id);
      if (u.length < 3) return;
      const l = a.value.filter((y) => u.includes(y.id));
      l.sort((y, p) => y.position.y - p.position.y);
      const d = l[0], c = l[l.length - 1], _ = c.height || 50, f = l.reduce((y, p) => y + (p.height || 50), 0), m = i * (l.length - 1);
      if (c.position.y + _ - d.position.y - f - m <= 0) {
        let y = d.position.y;
        l.forEach((p) => {
          const v = a.value.findIndex((g) => g.id === p.id);
          v >= 0 && (a.value[v] = {
            ...a.value[v],
            position: { ...a.value[v].position, y }
          }), y += (p.height || 50) + i;
        });
      } else {
        let y = d.position.y;
        l.forEach((p) => {
          const v = a.value.findIndex((g) => g.id === p.id);
          v >= 0 && (a.value[v] = {
            ...a.value[v],
            position: { ...a.value[v].position, y }
          }), y += (p.height || 50) + i;
        });
      }
    },
    alignNodesHorizontal: (t, i = "left") => {
      const u = t || a.value.filter((c) => c.selected).map((c) => c.id);
      if (u.length < 2) return;
      const l = a.value.filter((c) => u.includes(c.id));
      let d;
      if (i === "left")
        d = Math.min(...l.map((c) => c.position.x));
      else if (i === "right")
        d = Math.max(...l.map((c) => c.position.x + (c.width || 200)));
      else {
        const c = l.map((_) => _.position.x + (_.width || 200) / 2);
        d = c.reduce((_, f) => _ + f, 0) / c.length;
      }
      l.forEach((c) => {
        const _ = a.value.findIndex((f) => f.id === c.id);
        if (_ >= 0) {
          let f;
          i === "left" ? f = d : i === "right" ? f = d - (c.width || 200) : f = d - (c.width || 200) / 2, a.value[_] = {
            ...a.value[_],
            position: { ...a.value[_].position, x: f }
          };
        }
      });
    },
    alignNodesVertical: (t, i = "top") => {
      const u = t || a.value.filter((c) => c.selected).map((c) => c.id);
      if (u.length < 2) return;
      const l = a.value.filter((c) => u.includes(c.id));
      let d;
      if (i === "top")
        d = Math.min(...l.map((c) => c.position.y));
      else if (i === "bottom")
        d = Math.max(...l.map((c) => c.position.y + (c.height || 50)));
      else {
        const c = l.map((_) => _.position.y + (_.height || 50) / 2);
        d = c.reduce((_, f) => _ + f, 0) / c.length;
      }
      l.forEach((c) => {
        const _ = a.value.findIndex((f) => f.id === c.id);
        if (_ >= 0) {
          let f;
          i === "top" ? f = d : i === "bottom" ? f = d - (c.height || 50) : f = d - (c.height || 50) / 2, a.value[_] = {
            ...a.value[_],
            position: { ...a.value[_].position, y: f }
          };
        }
      });
    }
  };
}
function yt(e) {
  switch (e) {
    case "top":
      return { x: 0, y: -1 };
    case "bottom":
      return { x: 0, y: 1 };
    case "right":
      return { x: 1, y: 0 };
    case "left":
      return { x: -1, y: 0 };
  }
}
function gt(e, a = "right", n) {
  var i, u;
  const r = e.position.x, o = e.position.y;
  let s = e.width, t = e.height;
  if (s === void 0 && ((i = e.style) != null && i.width)) {
    const l = parseInt(String(e.style.width));
    isNaN(l) || (s = l);
  }
  if (t === void 0 && ((u = e.style) != null && u.height)) {
    const l = parseInt(String(e.style.height));
    isNaN(l) || (t = l);
  }
  switch (s = s || 150, t = t || 40, a) {
    case "top":
      return { x: r + s / 2, y: o };
    case "bottom":
      return { x: r + s / 2, y: o + t };
    case "left":
      return { x: r, y: o + t / 2 };
    case "right":
      return { x: r + s, y: o + t / 2 };
    default:
      return { x: r + s / 2, y: o + t / 2 };
  }
}
function sz(e, a, n, r, o, s) {
  return { sx: e, sy: a, tx: n, ty: r };
}
function Mc(e) {
  const {
    sourceX: a,
    sourceY: n,
    targetX: r,
    targetY: o,
    sourcePosition: s,
    targetPosition: t,
    curvature: i = 0.25
  } = e, u = yt(s), l = yt(t), d = Math.abs(r - a), c = Math.abs(o - n), _ = Math.sqrt(d * d + c * c), f = Math.min(Math.max(_ * i, 20), _ / 2), m = a + u.x * f, h = n + u.y * f, y = r + l.x * f, p = o + l.y * f;
  return `M${a},${n} C${m},${h} ${y},${p} ${r},${o}`;
}
function ix(e) {
  const { sourceX: a, sourceY: n, targetX: r, targetY: o } = e;
  return `M${a},${n} L${r},${o}`;
}
function ux(e) {
  const { sourceX: a, sourceY: n, targetX: r, targetY: o, sourcePosition: s, targetPosition: t } = e, i = s === "left" || s === "right", u = t === "left" || t === "right";
  if (i && !u) {
    const l = (a + r) / 2;
    return `M${a},${n} L${l},${n} L${l},${o} L${r},${o}`;
  } else if (!i && u) {
    const l = (n + o) / 2;
    return `M${a},${n} L${a},${l} L${r},${l} L${r},${o}`;
  } else if (i && u) {
    const l = (a + r) / 2;
    return `M${a},${n} L${l},${n} L${l},${o} L${r},${o}`;
  } else {
    const l = (n + o) / 2;
    return `M${a},${n} L${a},${l} L${r},${l} L${r},${o}`;
  }
}
function lx(e) {
  const { sourceX: a, sourceY: n, targetX: r, targetY: o, sourcePosition: s, targetPosition: t } = e, i = yt(s), u = yt(t), l = Math.abs(r - a), d = Math.abs(o - n), c = Math.min(10, Math.min(l, d) / 2);
  if (s === "left" || s === "right") {
    const f = (a + r) / 2, m = i.x, h = u.y || (o > n ? 1 : -1);
    return [
      `M${a},${n}`,
      `L${f - m * c},${n}`,
      `Q${f},${n} ${f},${n + h * c}`,
      `L${f},${o - h * c}`,
      `Q${f},${o} ${f + m * c},${o}`,
      `L${r},${o}`
    ].join(" ");
  } else {
    const f = (n + o) / 2, m = i.y, h = u.x || (r > a ? 1 : -1);
    return [
      `M${a},${n}`,
      `L${a},${f - m * c}`,
      `Q${a},${f} ${a + h * c},${f}`,
      `L${r - h * c},${f}`,
      `Q${r},${f} ${r},${f + m * c}`,
      `L${r},${o}`
    ].join(" ");
  }
}
function Pg(e, a) {
  switch (e) {
    case "bezier":
    case "default":
      return Mc(a);
    case "straight":
      return ix(a);
    case "step":
      return ux(a);
    case "smoothstep":
      return lx(a);
    default:
      return Mc(a);
  }
}
function dx(e) {
  const { sourceX: a, sourceY: n, targetX: r, targetY: o, type: s = "bezier" } = e;
  if (s === "bezier" || s === "default") {
    const t = e.curvature ?? 0.25, i = yt(e.sourcePosition), u = yt(e.targetPosition), l = Math.abs(r - a), d = Math.abs(o - n), c = Math.sqrt(l * l + d * d), _ = Math.min(Math.max(c * t, 20), c / 2), f = a + i.x * _, m = n + i.y * _, h = r + u.x * _, y = o + u.y * _;
    return {
      x: 0.125 * a + 0.375 * f + 0.375 * h + 0.125 * r,
      y: 0.125 * n + 0.375 * m + 0.375 * y + 0.125 * o,
      ox: (r - a) / 2,
      oy: (o - n) / 2
    };
  }
  return {
    x: (a + r) / 2,
    y: (n + o) / 2,
    ox: (r - a) / 2,
    oy: (o - n) / 2
  };
}
function iz(e, a, n, r, o) {
  const s = e - n, t = a - r, i = Math.sqrt(s * s + t * t);
  if (i < o * 2) return { x: e, y: a };
  const u = o / i;
  return { x: e - s * u, y: a - t * u };
}
function cx(e, a, n = /* @__PURE__ */ new Set(), r = /* @__PURE__ */ new Set()) {
  n.add(a), r.add(a);
  const o = e.filter((s) => s.source === a);
  for (const s of o)
    if (n.has(s.target)) {
      if (r.has(s.target))
        return !0;
    } else if (cx(e, s.target, n, r))
      return !0;
  return r.delete(a), !1;
}
function uz(e, a) {
  const n = /* @__PURE__ */ new Map(), r = /* @__PURE__ */ new Map();
  for (const t of e)
    n.set(t.id, 0), r.set(t.id, []);
  for (const t of a) {
    const i = n.get(t.target) || 0;
    n.set(t.target, i + 1);
    const u = r.get(t.source) || [];
    u.push(t.target), r.set(t.source, u);
  }
  const o = [];
  for (const [t, i] of n)
    i === 0 && o.push(t);
  const s = [];
  for (; o.length > 0; ) {
    const t = o.shift();
    s.push(t);
    const i = r.get(t) || [];
    for (const u of i) {
      const l = n.get(u) - 1;
      n.set(u, l), l === 0 && o.push(u);
    }
  }
  return s;
}
function lz(e, a, n) {
  const r = /* @__PURE__ */ new Map();
  for (const i of e) {
    const u = r.get(i.source) || [];
    u.push(i.target), r.set(i.source, u);
  }
  const o = [], s = [];
  function t(i) {
    if (s.push(i), i === n)
      o.push([...s]);
    else {
      const u = r.get(i) || [];
      for (const l of u)
        s.includes(l) || t(l);
    }
    s.pop();
  }
  return t(a), o;
}
function dz(e, a) {
  const n = /* @__PURE__ */ new Map();
  for (const s of e)
    n.set(s.id, []);
  for (const s of a) {
    const t = n.get(s.source) || [];
    t.push(s.target), n.set(s.source, t);
    const i = n.get(s.target) || [];
    i.push(s.source), n.set(s.target, i);
  }
  const r = /* @__PURE__ */ new Set(), o = [];
  for (const s of e)
    if (!r.has(s.id)) {
      const t = [], i = [s.id];
      for (; i.length > 0; ) {
        const u = i.shift();
        if (!r.has(u)) {
          r.add(u), t.push(u);
          const l = n.get(u) || [];
          for (const d of l)
            r.has(d) || i.push(d);
        }
      }
      o.push(t);
    }
  return o;
}
function cz(e, a) {
  const n = /* @__PURE__ */ new Set([a]), r = [a], o = [];
  for (; r.length > 0; ) {
    const s = r.shift();
    o.push(s);
    const t = e.get(s) || [];
    for (const i of t)
      n.has(i) || (n.add(i), r.push(i));
  }
  return o;
}
function _z(e, a) {
  const n = /* @__PURE__ */ new Set(), r = [];
  function o(s) {
    n.add(s), r.push(s);
    const t = e.get(s) || [];
    for (const i of t)
      n.has(i) || o(i);
  }
  return o(a), r;
}
function fz(e, a) {
  return e.x >= a.x && e.x <= a.x + a.width && e.y >= a.y && e.y <= a.y + a.height;
}
function Ig(e, a) {
  return !(e.x + e.width < a.x || a.x + a.width < e.x || e.y + e.height < a.y || a.y + a.height < e.y);
}
function mz(e, a) {
  if (!Ig(e, a))
    return null;
  const n = Math.max(e.x, a.x), r = Math.max(e.y, a.y), o = Math.min(e.x + e.width, a.x + a.x) - n, s = Math.min(e.y + e.height, a.y + a.height) - r;
  return { x: n, y: r, width: o, height: s };
}
function _x(e) {
  if (e.length === 0)
    return { x: 0, y: 0, width: 0, height: 0 };
  let a = 1 / 0, n = 1 / 0, r = -1 / 0, o = -1 / 0;
  for (const s of e)
    a = Math.min(a, s.x), n = Math.min(n, s.y), r = Math.max(r, s.x), o = Math.max(o, s.y);
  return {
    x: a,
    y: n,
    width: r - a,
    height: o - n
  };
}
function pz(e) {
  const a = e.flatMap((n) => {
    const r = n.width || 0, o = n.height || 0;
    return [
      { x: n.position.x, y: n.position.y },
      { x: n.position.x + r, y: n.position.y + o }
    ];
  });
  return _x(a);
}
function hz(e, a, n) {
  const r = e.x - a.x, o = e.y - a.y, s = n.x - a.x, t = n.y - a.y, i = r * s + o * t, u = s * s + t * t;
  let l = -1;
  u !== 0 && (l = i / u);
  let d, c;
  l < 0 ? (d = a.x, c = a.y) : l > 1 ? (d = n.x, c = n.y) : (d = a.x + l * s, c = a.y + l * t);
  const _ = e.x - d, f = e.y - c;
  return Math.sqrt(_ * _ + f * f);
}
function vz(e, a) {
  const n = a.x - e.x, r = a.y - e.y;
  return Math.sqrt(n * n + r * r);
}
function yz(e) {
  return e * Math.PI / 180;
}
function gz(e) {
  return e * 180 / Math.PI;
}
function Mz(e, a, n, r) {
  const o = a.x - e.x, s = a.y - e.y, t = r.x - n.x, i = r.y - n.y, u = o * i - s * t;
  if (Math.abs(u) < 1e-10)
    return null;
  const l = {
    x: e.x - n.x,
    y: e.y - n.y
  }, d = (l.x * i - l.y * t) / u;
  return {
    x: e.x + d * o,
    y: e.y + d * s
  };
}
function bz(e, a) {
  return Math.atan2(a.y - e.y, a.x - e.x);
}
function Yz(e, a, n) {
  return Math.atan2(a.y - n.y, a.x - n.x) - Math.atan2(e.y - n.y, e.x - n.x);
}
function wz(e) {
  return -e;
}
function xz(e, a) {
  let n = !1;
  for (let r = 0, o = a.length - 1; r < a.length; o = r++) {
    const s = a[r].x, t = a[r].y, i = a[o].x, u = a[o].y;
    t > e.y != u > e.y && e.x < (i - s) * (e.y - t) / (u - t) + s && (n = !n);
  }
  return n;
}
function Lz(e, a) {
  const n = a.x + a.width, r = a.y + a.height, o = Math.max(a.x - e.x, 0, e.x - n), s = Math.max(a.y - e.y, 0, e.y - r);
  return Math.sqrt(o * o + s * s);
}
function kz(e, a, n) {
  const r = {
    x: a.x * n,
    y: a.y * n,
    width: a.width * n,
    height: a.height * n
  };
  return Ig(e, r);
}
function Sz(e) {
  return (a) => {
    if (!e || e.length === 0)
      return !0;
    for (const n of e) {
      const r = Od(a.source, n.source), o = Od(a.target, n.target), s = bc(a.sourceHandle, n.sourceHandle), t = bc(a.targetHandle, n.targetHandle);
      if (r && o && s && t)
        return !0;
    }
    return !1;
  };
}
function Od(e, a) {
  if (!a) return !0;
  if (Array.isArray(a))
    return a.includes(e);
  if (a === "*") return !0;
  try {
    return new RegExp(a).test(e);
  } catch {
    return e === a;
  }
}
function bc(e, a) {
  return a == null ? !0 : !e && a ? !1 : Od(e, a);
}
function Yc(e, a, n) {
  return e ? a ? n.source === n.target ? { isValid: !1, message: "Cannot connect to the same node" } : n.target === n.source ? { isValid: !1, message: "Cannot create self-loop" } : { isValid: !0 } : { isValid: !1, message: "Target node not found" } : { isValid: !1, message: "Source node not found" };
}
function fx(e, a) {
  const n = /* @__PURE__ */ new Map();
  for (const t of e)
    n.has(t.source) || n.set(t.source, []), n.get(t.source).push(t.target);
  n.has(a.source) || n.set(a.source, []), n.get(a.source).push(a.target);
  const r = /* @__PURE__ */ new Set(), o = /* @__PURE__ */ new Set();
  function s(t) {
    r.add(t), o.add(t);
    const i = n.get(t) || [];
    for (const u of i)
      if (r.has(u)) {
        if (o.has(u))
          return !0;
      } else if (s(u)) return !0;
    return o.delete(t), !1;
  }
  for (const t of n.keys())
    if (!r.has(t) && s(t))
      return !0;
  return !1;
}
const qt = /* @__PURE__ */ new Map();
function Dz(e) {
  qt.set(e.type, e);
}
function mx(e) {
  return qt.get(e);
}
function px() {
  return Array.from(qt.values());
}
function Tz(e) {
  return qt.has(e);
}
const lt = /* @__PURE__ */ new Map();
function $z(e) {
  lt.set(e.type, e);
}
function Ng(e) {
  return lt.get(e);
}
function Hz() {
  return Array.from(lt.values());
}
function jz(e) {
  return lt.has(e);
}
function hx(e, a, n, r) {
  const o = Ng(e);
  return o ? {
    id: a,
    type: e,
    position: n,
    data: { ...o.defaultData, ...r == null ? void 0 : r.data },
    width: (r == null ? void 0 : r.width) ?? o.defaultWidth ?? 180,
    height: (r == null ? void 0 : r.height) ?? o.defaultHeight ?? 60,
    selected: !1,
    dragging: !1,
    ...r
  } : null;
}
const At = /* @__PURE__ */ new Map();
function $e(e) {
  lt.has(e.type) || lt.set(e.type, {
    type: e.type,
    component: e.component,
    defaultData: e.defaultData
  }), At.set(e.type, e);
}
function vx(e) {
  return At.get(e);
}
function Ez() {
  return Array.from(At.values());
}
function Cz(e) {
  return At.has(e);
}
function yx(e) {
  return !!e.parentId;
}
function gx(e, a) {
  return e.id ? a.filter((n) => n.parentId === e.id) : [];
}
function Mx(e, a) {
  if (e.parentId)
    return a.find((n) => n.id === e.parentId);
}
const Xa = /* @__PURE__ */ new Map();
function qz(e) {
  Xa.set(e.type, e);
}
function Az(e) {
  return Xa.get(e);
}
function bx() {
  return Array.from(Xa.values());
}
function Yx(e, a, n) {
  return JSON.stringify({
    nodes: e,
    edges: a,
    viewport: n,
    version: "1.0.0"
  }, null, 2);
}
function wx(e) {
  try {
    const a = JSON.parse(e);
    return !a.nodes || !Array.isArray(a.nodes) ? null : a;
  } catch {
    return null;
  }
}
function Rz() {
  qt.clear(), At.clear(), lt.clear(), Xa.clear();
}
class Pz {
  constructor() {
    ye(this, "_nodes", Ra([]));
    ye(this, "_edges", Ra([]));
  }
  get nodes() {
    return this._nodes.value;
  }
  set nodes(a) {
    this._nodes.value = a;
  }
  get edges() {
    return this._edges.value;
  }
  set edges(a) {
    this._edges.value = a;
  }
  // Get edges connected to a specific node
  getConnectedEdges(a) {
    return this._edges.value.filter((n) => n.source === a || n.target === a);
  }
  // Get nodes connected to a specific node
  getConnectedNodes(a) {
    const n = /* @__PURE__ */ new Set(), r = this.getConnectedEdges(a);
    for (const o of r)
      o.source === a ? n.add(o.target) : n.add(o.source);
    return this._nodes.value.filter((o) => n.has(o.id));
  }
  // Batch update nodes without triggering multiple renders
  batchUpdateNodes(a) {
    this._nodes.value = a(this._nodes.value);
  }
  // Batch update edges without triggering multiple renders
  batchUpdateEdges(a) {
    this._edges.value = a(this._edges.value);
  }
}
let xx = 0;
function Iz(e = "id") {
  return `${e}-${Date.now()}-${++xx}`;
}
function Nz(e, a) {
  let n = null;
  return (...r) => {
    n && clearTimeout(n), n = setTimeout(() => {
      e(...r), n = null;
    }, a);
  };
}
function Oz(e, a) {
  let n = !1;
  return (...r) => {
    n || (e(...r), n = !0, setTimeout(() => {
      n = !1;
    }, a));
  };
}
const Qt = /* @__PURE__ */ new Map();
function zz(e, a) {
  if (Qt.has(e))
    return Qt.get(e);
  const n = a();
  return Qt.set(e, n), n;
}
function Fz() {
  Qt.clear();
}
const Lx = {
  png: "image/png",
  jpeg: "image/jpeg",
  webp: "image/webp"
}, kx = {
  png: "png",
  jpeg: "jpeg",
  webp: "webp"
};
function Sx(e, a) {
  return fetch(e).then((n) => n.blob());
}
async function Dx(e, a) {
  const { imageType: n, imageQuality: r, pixelRatio: o, backgroundColor: s } = a, t = await Promise.resolve().then(() => QT), i = typeof t.toPng == "function" ? t : t.default, u = {
    backgroundColor: s,
    pixelRatio: o
  };
  let l, d = n;
  switch (n) {
    case "jpeg":
      l = await i.toJpeg(e, { ...u, quality: r });
      break;
    case "webp":
      typeof i.toWebp == "function" ? l = await i.toWebp(e, { ...u, quality: r }) : (d = "png", l = await i.toPng(e, u));
      break;
    case "png":
    default:
      l = await i.toPng(e, u);
      break;
  }
  const c = Lx[d], _ = await Sx(l), f = Math.round(e.offsetWidth * o), m = Math.round(e.offsetHeight * o);
  return {
    dataUrl: l,
    blob: _,
    width: f,
    height: m,
    mimeType: c,
    extension: kx[d]
  };
}
function Tx(e, a, n) {
  const r = document.createElement("a");
  r.download = `${a}.${n}`, r.href = e, r.click();
}
async function $x(e) {
  var a;
  if (typeof ((a = navigator == null ? void 0 : navigator.clipboard) == null ? void 0 : a.write) == "function")
    await navigator.clipboard.write([new ClipboardItem({ [e.type]: e })]);
  else
    throw new Error("[Flow Screenshot] Clipboard API not available");
}
const it = "http://www.omg.org/spec/BPMN/20100524/MODEL", zd = "http://www.omg.org/spec/BPMN/20100524/DI", Og = "http://www.omg.org/spec/BPMN/20100524/DC";
function $t(e, a, n) {
  const r = er(e, a, n);
  return r.length > 0 ? r[0] : null;
}
function er(e, a, n) {
  const r = e.getElementsByTagNameNS(a, n);
  if (r.length > 0) return Array.from(r);
  const o = [], s = e.getElementsByTagName("*");
  for (let t = 0; t < s.length; t++) {
    const i = s[t];
    i.localName === n && i.namespaceURI === a && o.push(i);
  }
  return o;
}
const Hx = {
  "bpmn-start": "startEvent",
  "bpmn-end": "endEvent",
  "bpmn-task": "task",
  "bpmn-service-task": "serviceTask",
  "bpmn-user-task": "userTask",
  "bpmn-exclusive-gateway": "exclusiveGateway",
  "bpmn-parallel-gateway": "parallelGateway",
  "bpmn-inclusive-gateway": "inclusiveGateway"
}, jx = {
  startEvent: "bpmn-start",
  endEvent: "bpmn-end",
  task: "bpmn-task",
  serviceTask: "bpmn-service-task",
  userTask: "bpmn-user-task",
  exclusiveGateway: "bpmn-exclusive-gateway",
  parallelGateway: "bpmn-parallel-gateway",
  inclusiveGateway: "bpmn-inclusive-gateway"
}, Ex = {
  "bpmn-exclusive-gateway": "diverging",
  "bpmn-parallel-gateway": "diverging",
  "bpmn-inclusive-gateway": "diverging"
}, zg = () => typeof DOMParser > "u" ? null : new DOMParser();
function Cx(e, a, n = {}) {
  var _, f, m, h, y, p;
  const {
    processId: r = "Process_" + Date.now(),
    processName: o = "Flow Process",
    includeDi: s = !0,
    defaultNodeWidth: t = 100,
    defaultNodeHeight: i = 80
  } = n, u = [], l = [], d = [];
  for (const v of e) {
    const g = Hx[v.type];
    if (!g) continue;
    const M = v.width || t, Y = v.height || i;
    let L = `id="${v.id}"`;
    const D = ((_ = v.data) == null ? void 0 : _.name) || ((f = v.data) == null ? void 0 : f.label) || v.id;
    if (D && (L += ` name="${D}"`), g.includes("Gateway")) {
      const w = Ex[v.type] || "diverging";
      L += ` gatewayDirection="${w}"`;
    }
    g === "serviceTask" && (L += ' implementation="delegateExpression"', (m = v.data) != null && m.implementation && (L += ` delegateExpression="${v.data.implementation}"`)), g === "userTask" && ((h = v.data) != null && h.assignee && (L += ` assignee="${v.data.assignee}"`), (y = v.data) != null && y.candidateUsers && (L += ` candidateUsers="${v.data.candidateUsers}"`)), d.push(`    <bpmn:${g} ${L}/>`), s && u.push({
      id: `${v.id}_gui`,
      x: v.position.x,
      y: v.position.y,
      width: M,
      height: Y
    });
  }
  for (const v of a) {
    let g = `id="${v.id}"`;
    if (v.source && v.target && (g += ` sourceRef="${v.source}" targetRef="${v.target}"`), v.type && v.type !== "default") {
      const M = v.type.replace("Edge", "").toLowerCase();
      ["smooth", "step", "bezier"].includes(M) && (g += ' messageVisibleKind="signal"');
    }
    (p = v.data) != null && p.conditionExpression ? d.push(
      `    <bpmn:sequenceFlow id="${v.id}" sourceRef="${v.source}" targetRef="${v.target}">
      <bpmn:conditionExpression xsi:type="tFormalExpression" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">${v.data.conditionExpression}</bpmn:conditionExpression>
    </bpmn:sequenceFlow>`
    ) : d.push(`    <bpmn:sequenceFlow ${g}/>`), s && l.push({
      id: `${v.id}_di`,
      sourceRef: v.source || "",
      targetRef: v.target || ""
    });
  }
  let c = `<?xml version="1.0" encoding="UTF-8"?>
<bpmn:definitions xmlns:bpmn="${it}" xmlns:bpmndi="${zd}" xmlns:dc="${Og}" xmlns:di="${zd}" id="definitions_${r}" targetNamespace="http://bpmn.io/schema/bpmn">
  <bpmn:process id="${r}" name="${o}" isExecutable="false">
${d.join(`
`)}
  </bpmn:process>`;
  if (s) {
    c += `
  <bpmndi:BPMNDiagram id="BPMNDiagram_1">
    <bpmndi:BPMNPlane id="BPMNPlane_1" bpmnElement="${r}">`;
    for (const v of u)
      c += `
      <bpmndi:BPMNShape id="${v.id}" bpmnElement="${v.id.replace("_gui", "")}">
        <dc:Bounds x="${v.x}" y="${v.y}" width="${v.width}" height="${v.height}"/>
      </bpmndi:BPMNShape>`;
    for (const v of l)
      c += `
      <bpmndi:BPMNEdge id="${v.id}_di" bpmnElement="${v.id}"/>`;
    c += `
    </bpmndi:BPMNPlane>
  </bpmndi:BPMNDiagram>`;
  }
  return c += `
</bpmn:definitions>`, { xml: c, processId: r };
}
function Bz(e, a = {}) {
  var g;
  const { defaultPosition: n = { x: 100, y: 100 }, nodeSpacing: r = 150 } = a, o = [], s = [], t = zg();
  if (!t)
    return { nodes: o, edges: s };
  const i = t.parseFromString(e, "text/xml"), u = i.querySelector("parsererror");
  if (u)
    throw new Error(`BPMN XML 解析失败: ${u.textContent}`);
  const l = $t(i, it, "process"), d = (l == null ? void 0 : l.getAttribute("id")) || "", c = (l == null ? void 0 : l.getAttribute("name")) || "", _ = /* @__PURE__ */ new Map(), f = er(i, zd, "BPMNShape");
  for (const M of f) {
    const Y = M.getAttribute("bpmnElement"), L = $t(M, Og, "Bounds");
    Y && L && _.set(Y, {
      x: parseFloat(L.getAttribute("x") || "0"),
      y: parseFloat(L.getAttribute("y") || "0"),
      width: parseFloat(L.getAttribute("width") || "100"),
      height: parseFloat(L.getAttribute("height") || "80")
    });
  }
  const h = ((M) => {
    const Y = [
      "startEvent",
      "endEvent",
      "task",
      "serviceTask",
      "userTask",
      "exclusiveGateway",
      "parallelGateway",
      "inclusiveGateway"
    ], L = [];
    for (const D of Y)
      L.push(...er(M, it, D));
    return L;
  })(i), y = /* @__PURE__ */ new Map();
  let p = n.y;
  for (const M of h) {
    const Y = M.getAttribute("id"), L = M.getAttribute("name") || "", D = M.localName, w = jx[D];
    if (!w || !Y) continue;
    const T = _.get(Y), k = T ? { x: T.x, y: T.y } : { x: n.x, y: n.y + p }, S = (T == null ? void 0 : T.width) || 100, F = (T == null ? void 0 : T.height) || 80, B = { label: L || Y };
    D === "userTask" && (B.assignee = M.getAttribute("assignee") || "", B.candidateUsers = M.getAttribute("candidateUsers") || ""), D === "serviceTask" && (B.implementation = M.getAttribute("delegateExpression") || "");
    const $ = {
      id: Y,
      type: w,
      position: k,
      data: B,
      width: S,
      height: F,
      selected: !1,
      dragging: !1
    };
    o.push($), y.set(Y, {
      x: k.x,
      y: k.y,
      width: S,
      height: F,
      outgoing: []
    }), p += r;
  }
  const v = er(i, it, "sequenceFlow");
  for (const M of v) {
    const Y = M.getAttribute("id"), L = M.getAttribute("sourceRef"), D = M.getAttribute("targetRef");
    if (!Y || !L || !D) continue;
    const w = $t(M, it, "conditionExpression"), T = (g = w == null ? void 0 : w.textContent) == null ? void 0 : g.trim(), k = y.get(L);
    k && k.outgoing.push(Y);
    const S = {
      id: Y,
      source: L,
      target: D,
      type: "smoothstep",
      animated: !1,
      selected: !1,
      data: T ? { conditionExpression: T } : {}
    };
    s.push(S);
  }
  return _.size === 0 && qx(o, s, r), { nodes: o, edges: s, processId: d, processName: c };
}
function qx(e, a, n) {
  const r = /* @__PURE__ */ new Map(), o = /* @__PURE__ */ new Map();
  for (const d of e)
    r.set(d.id, 0), o.set(d.id, []);
  for (const d of a)
    if (d.source && d.target) {
      const c = r.get(d.target) || 0;
      r.set(d.target, c + 1);
      const _ = o.get(d.source) || [];
      _.push(d.target), o.set(d.source, _);
    }
  const s = [];
  for (const [d, c] of r)
    c === 0 && s.push(d);
  const t = /* @__PURE__ */ new Map(), i = /* @__PURE__ */ new Set();
  let u = 0;
  for (; s.length > 0; ) {
    const d = s.length;
    for (let c = 0; c < d; c++) {
      const _ = s.shift();
      if (i.has(_)) continue;
      i.add(_), t.set(_, u);
      const f = o.get(_) || [];
      for (const m of f)
        i.has(m) || s.push(m);
    }
    u++;
  }
  for (const d of e)
    t.has(d.id) || t.set(d.id, u);
  const l = /* @__PURE__ */ new Map();
  for (const d of e) {
    const c = t.get(d.id) || 0, _ = l.get(c) || [];
    _.push(d), l.set(c, _);
  }
  for (const [d, c] of l)
    c.forEach((_, f) => {
      _.position = {
        x: 100 + d * 250,
        y: 100 + f * n
      };
    });
}
function Gz(e) {
  try {
    const a = zg();
    if (!a)
      return { valid: !1, error: "DOMParser is not available in the current environment" };
    const n = a.parseFromString(e, "text/xml");
    return n.querySelector("parsererror") ? { valid: !1, error: "XML 格式错误" } : $t(n, it, "definitions") ? $t(n, it, "process") ? { valid: !0 } : { valid: !1, error: "缺少 BPMN process 元素" } : { valid: !1, error: "缺少 BPMN definitions 根元素" };
  } catch (a) {
    return { valid: !1, error: a instanceof Error ? a.message : "未知错误" };
  }
}
function Jz() {
  return Cx([
    {
      id: "start",
      type: "bpmn-start",
      position: { x: 100, y: 200 },
      data: { label: "开始", name: "开始" },
      width: 40,
      height: 40,
      selected: !1,
      dragging: !1
    },
    {
      id: "task1",
      type: "bpmn-user-task",
      position: { x: 250, y: 180 },
      data: { label: "审批任务", name: "审批任务", assignee: "admin" },
      width: 120,
      height: 80,
      selected: !1,
      dragging: !1
    },
    {
      id: "gateway",
      type: "bpmn-exclusive-gateway",
      position: { x: 450, y: 200 },
      data: { label: "是否通过", name: "是否通过" },
      width: 50,
      height: 50,
      selected: !1,
      dragging: !1
    },
    {
      id: "task2",
      type: "bpmn-service-task",
      position: { x: 600, y: 100 },
      data: { label: "处理业务", name: "处理业务", implementation: "${myService}" },
      width: 120,
      height: 80,
      selected: !1,
      dragging: !1
    },
    {
      id: "end",
      type: "bpmn-end",
      position: { x: 800, y: 200 },
      data: { label: "结束", name: "结束" },
      width: 40,
      height: 40,
      selected: !1,
      dragging: !1
    }
  ], [
    {
      id: "e1",
      source: "start",
      target: "task1",
      type: "smoothstep",
      selected: !1,
      animated: !1
    },
    {
      id: "e2",
      source: "task1",
      target: "gateway",
      type: "smoothstep",
      selected: !1,
      animated: !1
    },
    {
      id: "e3",
      source: "gateway",
      target: "task2",
      type: "smoothstep",
      selected: !1,
      animated: !1,
      data: { conditionExpression: "${approved == true}" }
    },
    {
      id: "e4",
      source: "gateway",
      target: "end",
      type: "smoothstep",
      selected: !1,
      animated: !1
    },
    { id: "e5", source: "task2", target: "end", type: "smooth", selected: !1, animated: !1 }
  ], {
    processId: "SampleProcess",
    processName: "示例流程"
  }).xml;
}
function Ax(e, a) {
  try {
    const n = e.match(/\$\{(.+)\}/);
    if (!n) return !!e;
    const r = n[1].trim();
    if (r.includes("==")) {
      const [s, t] = r.split("==").map((i) => i.trim());
      return a[s] == t.replace(/['"]/g, "");
    }
    if (r.includes("!=")) {
      const [s, t] = r.split("!=").map((i) => i.trim());
      return a[s] != t.replace(/['"]/g, "");
    }
    if (r.includes(">")) {
      const [s, t] = r.split(">").map((i) => i.trim());
      return Number(a[s]) > Number(t);
    }
    if (r.includes("<")) {
      const [s, t] = r.split("<").map((i) => i.trim());
      return Number(a[s]) < Number(t);
    }
    const o = a[r];
    return typeof o == "boolean" ? o : r === "true" ? !0 : r === "false" ? !1 : !!o;
  } catch {
    return !1;
  }
}
class Rx {
  constructor(a = {}) {
    ye(this, "nodes", /* @__PURE__ */ new Map());
    ye(this, "edges", /* @__PURE__ */ new Map());
    ye(this, "instances", /* @__PURE__ */ new Map());
    ye(this, "options");
    ye(this, "instanceCounter", 0);
    this.options = {
      variableEvaluator: a.variableEvaluator || Ax,
      taskExecutor: a.taskExecutor || (async () => {
      }),
      eventListener: a.eventListener || (() => {
      }),
      autoExecute: a.autoExecute ?? !0,
      executionDelay: a.executionDelay ?? 500
    };
  }
  /**
   * 加载流程定义
   */
  loadProcess(a, n) {
    this.nodes.clear(), this.edges.clear();
    for (const r of a)
      this.nodes.set(r.id, r);
    for (const r of n)
      r.source && r.target && this.edges.set(r.id, r);
  }
  /**
   * 创建流程实例
   */
  createInstance(a = {}) {
    const n = `instance_${++this.instanceCounter}`, r = {
      id: n,
      processDefinitionId: "process",
      state: "idle",
      startTime: Date.now(),
      nodes: /* @__PURE__ */ new Map(),
      edges: /* @__PURE__ */ new Map(),
      tokens: /* @__PURE__ */ new Map(),
      variables: { ...a },
      currentNodes: [],
      completedNodes: [],
      history: []
    };
    for (const [o, s] of this.nodes)
      r.nodes.set(o, {
        nodeId: s.id,
        nodeType: s.type,
        status: "waiting",
        variables: {},
        incomingTokens: [],
        outgoingTokens: []
      });
    for (const [o, s] of this.edges)
      r.edges.set(o, {
        edgeId: s.id,
        sourceNodeId: s.source || "",
        targetNodeId: s.target || "",
        taken: !1
      });
    return this.instances.set(n, r), r;
  }
  /**
   * 启动流程实例
   */
  async start(a) {
    const n = this.instances.get(a);
    if (!n) return null;
    n.state = "running";
    const r = Array.from(this.nodes.values()).filter((o) => o.type === "bpmn-start");
    if (r.length === 0)
      return n.state = "completed", n.endTime = Date.now(), n;
    for (const o of r)
      await this.enterNode(n, o.id);
    return this.options.autoExecute && await this.executeAll(n), n;
  }
  /**
   * 进入节点
   */
  async enterNode(a, n) {
    const r = a.nodes.get(n);
    if (!r) return;
    const o = this.nodes.get(n);
    if (!o) return;
    const s = `token_${n}_${Date.now()}`;
    if (a.tokens.set(s, { nodeId: n, state: "active" }), r.incomingTokens.push(s), this.emitEvent(a, {
      type: "node_entered",
      timestamp: Date.now(),
      nodeId: n,
      tokenId: s
    }), r.status = "active", r.startTime = Date.now(), a.currentNodes.includes(n) || a.currentNodes.push(n), await this.executeNode(a, o), o.type === "bpmn-end") {
      r.status = "completed", r.endTime = Date.now(), a.completedNodes.push(n), a.currentNodes = a.currentNodes.filter((t) => t !== n);
      for (const t of [...r.incomingTokens])
        a.tokens.delete(t), this.emitEvent(a, {
          type: "token_consumed",
          timestamp: Date.now(),
          nodeId: n,
          tokenId: t
        });
      a.tokens.size === 0 && a.currentNodes.length === 0 && (a.state = "completed", a.endTime = Date.now());
      return;
    }
    await this.exitNode(a, n);
  }
  /**
   * 执行节点
   */
  async executeNode(a, n) {
    const r = a.nodes.get(n.id);
    r && (["bpmn-task", "bpmn-service-task", "bpmn-user-task"].includes(n.type) && await this.options.taskExecutor(r, a.variables), this.emitEvent(a, {
      type: "node_exited",
      timestamp: Date.now(),
      nodeId: n.id,
      data: a.variables
    }));
  }
  /**
   * 离开节点
   */
  async exitNode(a, n) {
    const r = a.nodes.get(n);
    if (!r) return;
    const o = this.nodes.get(n);
    if (!o) return;
    for (const t of r.incomingTokens)
      a.tokens.delete(t), this.emitEvent(a, {
        type: "token_consumed",
        timestamp: Date.now(),
        nodeId: n,
        tokenId: t
      });
    const s = Array.from(this.edges.values()).filter((t) => t.source === n);
    if (o.type === "bpmn-exclusive-gateway") {
      let t = !1;
      for (const i of s)
        if (this.evaluateEdgeCondition(a, i)) {
          await this.takeFlow(a, i), t = !0;
          break;
        }
      if (!t && s.length > 0) {
        const i = s.find((u) => {
          var l;
          return !((l = u.data) != null && l.conditionExpression);
        }) || s[0];
        await this.takeFlow(a, i);
      }
    } else
      for (const t of s)
        this.evaluateEdgeCondition(a, t) && await this.takeFlow(a, t);
    r.status = "completed", r.endTime = Date.now(), a.currentNodes = a.currentNodes.filter((t) => t !== n), a.completedNodes.push(n);
  }
  /**
   * 评估边的条件
   */
  evaluateEdgeCondition(a, n) {
    var o;
    if (!((o = n.data) != null && o.conditionExpression)) return !0;
    const r = !!this.options.variableEvaluator(
      n.data.conditionExpression,
      a.variables
    );
    return this.emitEvent(a, {
      type: "condition_evaluated",
      timestamp: Date.now(),
      edgeId: n.id,
      nodeId: n.source,
      data: { expression: n.data.conditionExpression, result: r }
    }), r;
  }
  /**
   * 采用流（连线）
   */
  async takeFlow(a, n) {
    const r = a.edges.get(n.id);
    if (!r) return;
    r.taken = !0;
    const o = `token_${n.target}_${Date.now()}`;
    a.tokens.set(o, { nodeId: n.target, state: "waiting" });
    const s = a.nodes.get(n.target);
    s && s.outgoingTokens.push(o), this.emitEvent(a, {
      type: "token_created",
      timestamp: Date.now(),
      edgeId: n.id,
      tokenId: o,
      targetRef: n.target
    }), setTimeout(() => {
      this.enterNode(a, n.target);
    }, 10);
  }
  /**
   * 执行所有待处理节点
   */
  async executeAll(a) {
    for (; a.currentNodes.length > 0 && a.state === "running"; )
      await new Promise((n) => setTimeout(n, this.options.executionDelay)), a.currentNodes.length === 0 && (Array.from(a.tokens.values()).some(
        (r) => r.state === "active"
      ) || (a.state = "completed", a.endTime = Date.now()));
  }
  /**
   * 触发事件
   */
  emitEvent(a, n) {
    a.history.push(n), this.options.eventListener(n);
  }
  /**
   * 获取实例状态
   */
  getInstance(a) {
    return this.instances.get(a);
  }
  /**
   * 设置变量
   */
  setVariable(a, n, r) {
    const o = this.instances.get(a);
    o && (o.variables[n] = r);
  }
  /**
   * 获取变量
   */
  getVariable(a, n) {
    const r = this.instances.get(a);
    return r == null ? void 0 : r.variables[n];
  }
  /**
   * 暂停流程
   */
  pause(a) {
    const n = this.instances.get(a);
    n && n.state === "running" && (n.state = "paused");
  }
  /**
   * 恢复流程
   */
  async resume(a) {
    const n = this.instances.get(a);
    n && n.state === "paused" && (n.state = "running", await this.executeAll(n));
  }
  /**
   * 终止流程
   */
  terminate(a) {
    const n = this.instances.get(a);
    n && (n.state = "terminated", n.endTime = Date.now());
  }
  /**
   * 获取所有实例
   */
  getAllInstances() {
    return Array.from(this.instances.values());
  }
  /**
   * 获取可用的开始节点
   */
  getStartNodes() {
    return Array.from(this.nodes.values()).filter((a) => a.type === "bpmn-start");
  }
  /**
   * 获取可用的结束节点
   */
  getEndNodes() {
    return Array.from(this.nodes.values()).filter((a) => a.type === "bpmn-end");
  }
  /**
   * 获取节点的输出边
   */
  getOutgoingEdges(a) {
    return Array.from(this.edges.values()).filter((n) => n.source === a);
  }
  /**
   * 获取节点的输入边
   */
  getIncomingEdges(a) {
    return Array.from(this.edges.values()).filter((n) => n.target === a);
  }
}
function Uz(e) {
  return new Rx(e);
}
const Fg = {
  // 节点样式
  "flow-node-background": "#ffffff",
  "flow-node-border": "#dcdfe6",
  "flow-node-border-radius": "8px",
  "flow-node-padding": "10px",
  "flow-node-shadow": "0 2px 4px rgba(0, 0, 0, 0.1)",
  "flow-node-selected-border": "#409eff",
  "flow-node-selected-shadow": "0 0 8px rgba(64, 158, 255, 0.4)",
  "flow-node-dragging-opacity": "0.8",
  // 节点文字
  "flow-node-label-color": "#303133",
  "flow-node-label-font-size": "14px",
  "flow-node-label-font-weight": "500",
  "flow-node-description-color": "#909399",
  "flow-node-description-font-size": "12px",
  // 连接点（Handle）
  "flow-handle-background": "#ffffff",
  "flow-handle-border": "#409eff",
  "flow-handle-border-radius": "50%",
  "flow-handle-size": "12px",
  "flow-handle-hover-background": "#409eff",
  "flow-handle-connected-background": "#67c23a",
  // 连线样式
  "flow-edge-stroke": "#b1b3b8",
  "flow-edge-stroke-width": "2",
  "flow-edge-selected-stroke": "#409eff",
  "flow-edge-animated-stroke": "#409eff",
  "flow-edge-label-background": "#ffffff",
  "flow-edge-label-color": "#606266",
  // BPMN 节点
  "flow-bpmn-start-fill": "#e6f7ed",
  "flow-bpmn-start-stroke": "#67c23a",
  "flow-bpmn-end-fill": "#fef0f0",
  "flow-bpmn-end-stroke": "#f56c6c",
  "flow-bpmn-task-fill": "#ecf5ff",
  "flow-bpmn-task-stroke": "#409eff",
  "flow-bpmn-gateway-fill": "#fdf6ec",
  "flow-bpmn-gateway-stroke": "#e6a23c",
  "flow-bpmn-gateway-color": "#e6a23c",
  // AI 节点
  "flow-ai-node-background": "#f0f9ff",
  "flow-ai-node-border": "#0ea5e9",
  "flow-ai-node-accent": "#0284c7",
  // 背景
  "flow-background-color": "#fafafa",
  "flow-grid-color": "#e4e7ed",
  "flow-grid-size": "20",
  // 辅助线
  "flow-alignment-line-color": "#c0c4cc",
  "flow-alignment-line-active-color": "#409eff",
  // 选框
  "flow-selection-box-border": "#409eff",
  "flow-selection-box-background": "rgba(64, 158, 255, 0.1)",
  // 控制按钮
  "flow-control-background": "#ffffff",
  "flow-control-border": "#dcdfe6",
  "flow-control-icon-color": "#606266",
  "flow-control-hover-background": "#f5f7fa",
  "flow-control-active-background": "#ecf5ff",
  // 小地图
  "flow-minimap-background": "#f5f7fa",
  "flow-minimap-mask-background": "rgba(255, 255, 255, 0.8)",
  "flow-minimap-node-color": "#c0c4cc",
  "flow-minimap-viewport-border": "#409eff",
  // 编辑面板
  "flow-panel-background": "#ffffff",
  "flow-panel-border": "#e4e7ed",
  "flow-panel-shadow": "0 4px 12px rgba(0, 0, 0, 0.15)",
  "flow-panel-header-background": "#fafafa",
  "flow-panel-title-color": "#303133",
  // 工具栏
  "flow-toolbar-background": "#ffffff",
  "flow-toolbar-border": "#e4e7ed",
  "flow-toolbar-icon-color": "#606266",
  "flow-toolbar-hover-background": "#f5f7fa",
  "flow-toolbar-active-background": "#ecf5ff"
}, Px = {
  // 节点样式
  "flow-node-background": "#1f1f1f",
  "flow-node-border": "#3a3a3a",
  "flow-node-border-radius": "8px",
  "flow-node-padding": "10px",
  "flow-node-shadow": "0 2px 8px rgba(0, 0, 0, 0.3)",
  "flow-node-selected-border": "#409eff",
  "flow-node-selected-shadow": "0 0 8px rgba(64, 158, 255, 0.5)",
  "flow-node-dragging-opacity": "0.7",
  // 节点文字
  "flow-node-label-color": "#e5e5e5",
  "flow-node-label-font-size": "14px",
  "flow-node-label-font-weight": "500",
  "flow-node-description-color": "#8c8c8c",
  "flow-node-description-font-size": "12px",
  // 连接点（Handle）
  "flow-handle-background": "#262626",
  "flow-handle-border": "#409eff",
  "flow-handle-border-radius": "50%",
  "flow-handle-size": "12px",
  "flow-handle-hover-background": "#409eff",
  "flow-handle-connected-background": "#67c23a",
  // 连线样式
  "flow-edge-stroke": "#5c5c5c",
  "flow-edge-stroke-width": "2",
  "flow-edge-selected-stroke": "#409eff",
  "flow-edge-animated-stroke": "#409eff",
  "flow-edge-label-background": "#1f1f1f",
  "flow-edge-label-color": "#e5e5e5",
  // BPMN 节点
  "flow-bpmn-start-fill": "#1a2e1a",
  "flow-bpmn-start-stroke": "#67c23a",
  "flow-bpmn-end-fill": "#2e1a1a",
  "flow-bpmn-end-stroke": "#f56c6c",
  "flow-bpmn-task-fill": "#1a2a33",
  "flow-bpmn-task-stroke": "#409eff",
  "flow-bpmn-gateway-fill": "#2e2a1a",
  "flow-bpmn-gateway-stroke": "#e6a23c",
  "flow-bpmn-gateway-color": "#e6a23c",
  // AI 节点
  "flow-ai-node-background": "#1a1a2e",
  "flow-ai-node-border": "#0ea5e9",
  "flow-ai-node-accent": "#38bdf8",
  // 背景
  "flow-background-color": "#141414",
  "flow-grid-color": "#2a2a2a",
  "flow-grid-size": "20",
  // 辅助线
  "flow-alignment-line-color": "#404040",
  "flow-alignment-line-active-color": "#409eff",
  // 选框
  "flow-selection-box-border": "#409eff",
  "flow-selection-box-background": "rgba(64, 158, 255, 0.2)",
  // 控制按钮
  "flow-control-background": "#1f1f1f",
  "flow-control-border": "#3a3a3a",
  "flow-control-icon-color": "#8c8c8c",
  "flow-control-hover-background": "#2a2a2a",
  "flow-control-active-background": "#1a2a33",
  // 小地图
  "flow-minimap-background": "#1a1a1a",
  "flow-minimap-mask-background": "rgba(0, 0, 0, 0.7)",
  "flow-minimap-node-color": "#404040",
  "flow-minimap-viewport-border": "#409eff",
  // 编辑面板
  "flow-panel-background": "#1f1f1f",
  "flow-panel-border": "#3a3a3a",
  "flow-panel-shadow": "0 4px 12px rgba(0, 0, 0, 0.5)",
  "flow-panel-header-background": "#262626",
  "flow-panel-title-color": "#e5e5e5",
  // 工具栏
  "flow-toolbar-background": "#1f1f1f",
  "flow-toolbar-border": "#3a3a3a",
  "flow-toolbar-icon-color": "#8c8c8c",
  "flow-toolbar-hover-background": "#2a2a2a",
  "flow-toolbar-active-background": "#1a2a33"
};
function Wz(e, a = document) {
  const n = a instanceof Document ? a.documentElement : a;
  for (const [r, o] of Object.entries(e))
    n.style.setProperty(`--${r}`, o);
}
function Yo(e) {
  return { ...Fg, ...e };
}
const Vz = {
  default: Fg,
  dark: Px,
  blue: Yo({
    "flow-node-background": "#e6f7ff",
    "flow-node-border": "#91d5ff",
    "flow-node-selected-border": "#1890ff",
    "flow-node-selected-shadow": "0 0 8px rgba(24, 144, 255, 0.4)",
    "flow-handle-border": "#1890ff",
    "flow-edge-selected-stroke": "#1890ff",
    "flow-edge-animated-stroke": "#1890ff",
    "flow-background-color": "#f0f7ff",
    "flow-grid-color": "#d0e6ff",
    "flow-bpmn-start-stroke": "#52c41a",
    "flow-bpmn-task-stroke": "#1890ff",
    "flow-bpmn-gateway-stroke": "#faad14",
    "flow-ai-node-border": "#722ed1",
    "flow-ai-node-accent": "#b37feb"
  }),
  green: Yo({
    "flow-node-background": "#f6ffed",
    "flow-node-border": "#b7eb8f",
    "flow-node-selected-border": "#52c41a",
    "flow-node-selected-shadow": "0 0 8px rgba(82, 196, 26, 0.4)",
    "flow-handle-border": "#52c41a",
    "flow-edge-selected-stroke": "#52c41a",
    "flow-edge-animated-stroke": "#52c41a",
    "flow-background-color": "#f6ffed",
    "flow-grid-color": "#d9f7be",
    "flow-bpmn-start-stroke": "#52c41a",
    "flow-bpmn-task-stroke": "#1890ff",
    "flow-bpmn-gateway-stroke": "#faad14",
    "flow-ai-node-border": "#13c2c2",
    "flow-ai-node-accent": "#36cfc9"
  }),
  purple: Yo({
    "flow-node-background": "#f9f0ff",
    "flow-node-border": "#d3adf7",
    "flow-node-selected-border": "#722ed1",
    "flow-node-selected-shadow": "0 0 8px rgba(114, 46, 209, 0.4)",
    "flow-handle-border": "#722ed1",
    "flow-edge-selected-stroke": "#722ed1",
    "flow-edge-animated-stroke": "#722ed1",
    "flow-background-color": "#f9f0ff",
    "flow-grid-color": "#efdbff",
    "flow-bpmn-start-stroke": "#52c41a",
    "flow-bpmn-task-stroke": "#1890ff",
    "flow-bpmn-gateway-stroke": "#faad14",
    "flow-ai-node-border": "#722ed1",
    "flow-ai-node-accent": "#b37feb"
  })
};
class Ix {
  constructor() {
    ye(this, "roomId", "");
    ye(this, "userId", "");
    ye(this, "userName", "");
    ye(this, "userColor", "");
    ye(this, "state");
    ye(this, "ws", null);
    ye(this, "connectionState", "disconnected");
    ye(this, "eventListeners", /* @__PURE__ */ new Map());
    ye(this, "reconnectAttempts", 0);
    ye(this, "maxReconnectAttempts", 5);
    ye(this, "reconnectDelay", 1e3);
    ye(this, "pingInterval", null);
    ye(this, "pendingOperations", /* @__PURE__ */ new Map());
    ye(this, "versionVector", /* @__PURE__ */ new Map());
    // 用户光标信息
    ye(this, "cursors", /* @__PURE__ */ new Map());
    this.state = {
      nodes: /* @__PURE__ */ new Map(),
      edges: /* @__PURE__ */ new Map(),
      viewport: { x: 0, y: 0, zoom: 1 },
      version: 0,
      pendingOps: [],
      acknowledgedOps: []
    };
  }
  /**
   * 连接到协作房间
   */
  async connect(a) {
    const { serverUrl: n, roomId: r, userId: o, userName: s, initialNodes: t = [], initialEdges: i = [] } = a;
    return this.roomId = r, this.userId = o, this.userName = s, this.userColor = this.generateUserColor(o), this.state.nodes = new Map(t.map((u) => [u.id, u])), this.state.edges = new Map(i.map((u) => [u.id, u])), new Promise((u, l) => {
      try {
        this.setConnectionState("connecting"), this.ws = new WebSocket(n), this.ws.onopen = () => {
          this.setConnectionState("connected"), this.reconnectAttempts = 0, this.send({
            type: "join",
            roomId: this.roomId,
            userId: this.userId,
            payload: {
              userName: this.userName,
              userColor: this.userColor,
              nodes: t,
              edges: i
            },
            timestamp: Date.now()
          }), this.startPing(), u();
        }, this.ws.onmessage = (d) => {
          const { data: c } = d;
          if (typeof c == "string")
            try {
              const _ = JSON.parse(c);
              this.isValidWSMessage(_) && this.handleMessage(_);
            } catch {
            }
        }, this.ws.onerror = (d) => {
          console.error("WebSocket error:", d), this.emitEvent("error", { type: "error", error: d, timestamp: Date.now() });
        }, this.ws.onclose = () => {
          this.setConnectionState("disconnected"), this.stopPing(), this.handleDisconnect();
        };
      } catch (d) {
        this.setConnectionState("disconnected"), l(d);
      }
    });
  }
  /**
   * 断开连接
   */
  disconnect() {
    this.ws && (this.send({
      type: "leave",
      roomId: this.roomId,
      userId: this.userId,
      payload: {},
      timestamp: Date.now()
    }), this.ws.close(), this.ws = null), this.setConnectionState("disconnected"), this.stopPing();
  }
  /**
   * 添加节点
   */
  addNode(a) {
    const n = {
      id: `op_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      type: "node_add",
      timestamp: Date.now(),
      userId: this.userId,
      nodeId: a.id,
      data: a,
      version: this.state.version + 1
    };
    this.applyOperation(n), this.broadcastOperation(n);
  }
  /**
   * 更新节点
   */
  updateNode(a, n) {
    const r = {
      id: `op_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      type: "node_update",
      timestamp: Date.now(),
      userId: this.userId,
      nodeId: a,
      data: n,
      version: this.state.version + 1
    };
    this.applyOperation(r), this.broadcastOperation(r);
  }
  /**
   * 删除节点
   */
  deleteNode(a) {
    const n = {
      id: `op_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      type: "node_delete",
      timestamp: Date.now(),
      userId: this.userId,
      nodeId: a,
      version: this.state.version + 1
    };
    this.applyOperation(n), this.broadcastOperation(n);
  }
  /**
   * 添加边
   */
  addEdge(a) {
    const n = {
      id: `op_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      type: "edge_add",
      timestamp: Date.now(),
      userId: this.userId,
      edgeId: a.id,
      data: a,
      version: this.state.version + 1
    };
    this.applyOperation(n), this.broadcastOperation(n);
  }
  /**
   * 更新边
   */
  updateEdge(a, n) {
    const r = {
      id: `op_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      type: "edge_update",
      timestamp: Date.now(),
      userId: this.userId,
      edgeId: a,
      data: n,
      version: this.state.version + 1
    };
    this.applyOperation(r), this.broadcastOperation(r);
  }
  /**
   * 删除边
   */
  deleteEdge(a) {
    const n = {
      id: `op_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      type: "edge_delete",
      timestamp: Date.now(),
      userId: this.userId,
      edgeId: a,
      version: this.state.version + 1
    };
    this.applyOperation(n), this.broadcastOperation(n);
  }
  /**
   * 更新视口
   */
  updateViewport(a) {
    const n = {
      id: `op_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      type: "viewport_change",
      timestamp: Date.now(),
      userId: this.userId,
      data: a,
      version: this.state.version + 1
    };
    this.state.viewport = a, this.broadcastOperation(n, !0);
  }
  /**
   * 更新光标位置
   */
  updateCursor(a, n) {
    this.send({
      type: "cursor",
      roomId: this.roomId,
      userId: this.userId,
      payload: { x: a, y: n, name: this.userName, color: this.userColor },
      timestamp: Date.now()
    });
  }
  /**
   * 更新选区
   */
  updateSelection(a) {
    this.send({
      type: "selection",
      roomId: this.roomId,
      userId: this.userId,
      payload: { nodeIds: a },
      timestamp: Date.now()
    });
  }
  /**
   * 获取当前状态
   */
  getState() {
    return {
      nodes: Array.from(this.state.nodes.values()),
      edges: Array.from(this.state.edges.values()),
      viewport: this.state.viewport
    };
  }
  /**
   * 获取连接状态
   */
  getConnectionState() {
    return this.connectionState;
  }
  /**
   * 获取其他用户光标
   */
  getCursors() {
    return this.cursors;
  }
  /**
   * 注册事件监听
   */
  on(a, n) {
    const r = this.eventListeners.get(a) || [];
    r.push(n), this.eventListeners.set(a, r);
  }
  /**
   * 移除事件监听
   */
  off(a, n) {
    const r = this.eventListeners.get(a) || [], o = r.indexOf(n);
    o > -1 && r.splice(o, 1);
  }
  // ==================== 私有方法 ====================
  /**
   * 严谨校验消息是否符合 WSMessage 协议结构
   */
  isValidWSMessage(a) {
    if (a && typeof a == "object") {
      const n = a;
      return typeof n.type == "string" && typeof n.roomId == "string" && typeof n.userId == "string" && "payload" in n;
    }
    return !1;
  }
  send(a) {
    this.ws && this.ws.readyState === WebSocket.OPEN && this.ws.send(JSON.stringify(a));
  }
  handleMessage(a) {
    switch (a.type) {
      case "sync":
        this.handleSync(a.payload);
        break;
      case "operation":
        this.handleRemoteOperation(a.payload);
        break;
      case "cursor":
        this.handleCursorUpdate(
          a.userId,
          a.payload
        );
        break;
      case "selection":
        this.handleSelectionUpdate(
          a.userId,
          a.payload
        );
        break;
      case "join":
        this.handleUserJoin(
          a.userId,
          a.payload
        );
        break;
      case "leave":
        this.handleUserLeave(a.userId);
        break;
    }
  }
  handleSync(a) {
    this.state.nodes = new Map(a.nodes.map((n) => [n.id, n])), this.state.edges = new Map(a.edges.map((n) => [n.id, n])), this.state.viewport = a.viewport, this.state.version = a.version, this.emitEvent("sync", {
      type: "sync",
      data: a,
      timestamp: Date.now()
    });
  }
  handleRemoteOperation(a) {
    a.userId !== this.userId && (this.applyOperation(a), this.emitEvent("operation", {
      type: "operation",
      userId: a.userId,
      data: a,
      timestamp: Date.now()
    }));
  }
  applyOperation(a) {
    switch (a.type) {
      case "node_add":
        a.nodeId && a.data && this.state.nodes.set(a.nodeId, a.data);
        break;
      case "node_update":
        if (a.nodeId) {
          const n = this.state.nodes.get(a.nodeId);
          n && this.state.nodes.set(a.nodeId, {
            ...n,
            ...a.data
          });
        }
        break;
      case "node_delete":
        if (a.nodeId) {
          this.state.nodes.delete(a.nodeId);
          for (const [n, r] of this.state.edges)
            (r.source === a.nodeId || r.target === a.nodeId) && this.state.edges.delete(n);
        }
        break;
      case "edge_add":
        a.edgeId && a.data && this.state.edges.set(a.edgeId, a.data);
        break;
      case "edge_update":
        if (a.edgeId) {
          const n = this.state.edges.get(a.edgeId);
          n && this.state.edges.set(a.edgeId, {
            ...n,
            ...a.data
          });
        }
        break;
      case "edge_delete":
        a.edgeId && this.state.edges.delete(a.edgeId);
        break;
      case "viewport_change":
        a.data && (this.state.viewport = a.data);
        break;
    }
    this.state.version = a.version, this.versionVector.set(a.userId, (this.versionVector.get(a.userId) || 0) + 1);
  }
  broadcastOperation(a, n = !1) {
    this.pendingOperations.set(a.id, a), this.send({
      type: "operation",
      roomId: this.roomId,
      userId: this.userId,
      payload: a,
      timestamp: Date.now()
    }), n && this.pendingOperations.delete(a.id);
  }
  handleCursorUpdate(a, n) {
    this.cursors.set(a, {
      x: n.x,
      y: n.y,
      name: n.name,
      color: n.color
    }), this.emitEvent("cursor_update", {
      type: "cursor_update",
      userId: a,
      data: n,
      timestamp: Date.now()
    });
  }
  handleSelectionUpdate(a, n) {
    this.emitEvent("selection_update", {
      type: "selection_update",
      userId: a,
      data: n,
      timestamp: Date.now()
    });
  }
  handleUserJoin(a, n) {
    this.emitEvent("user_joined", {
      type: "user_joined",
      userId: a,
      data: n,
      timestamp: Date.now()
    });
  }
  handleUserLeave(a) {
    this.cursors.delete(a), this.emitEvent("user_left", {
      type: "user_left",
      userId: a,
      timestamp: Date.now()
    });
  }
  setConnectionState(a) {
    this.connectionState = a, this.emitEvent(a, { type: "sync", timestamp: Date.now() });
  }
  handleDisconnect() {
    if (this.reconnectAttempts < this.maxReconnectAttempts) {
      this.reconnectAttempts++;
      const a = this.reconnectDelay * Math.pow(2, this.reconnectAttempts - 1);
      this.setConnectionState("reconnecting"), setTimeout(() => {
        this.reconnect();
      }, a);
    }
  }
  async reconnect() {
    console.log(`Reconnect attempt ${this.reconnectAttempts}/${this.maxReconnectAttempts}`);
  }
  startPing() {
    this.pingInterval = window.setInterval(() => {
      this.send({
        type: "ping",
        roomId: this.roomId,
        userId: this.userId,
        payload: {},
        timestamp: Date.now()
      });
    }, 3e4);
  }
  stopPing() {
    this.pingInterval && (clearInterval(this.pingInterval), this.pingInterval = null);
  }
  emitEvent(a, n) {
    const r = this.eventListeners.get(a) || [];
    for (const s of r)
      s(n);
    const o = this.eventListeners.get("*") || [];
    for (const s of o)
      s(n);
  }
  generateUserColor(a) {
    const n = [
      "#f56565",
      "#ed8936",
      "#48bb78",
      "#4299e1",
      "#667eea",
      "#ed64a6",
      "#a0aec0",
      "#fc8181"
    ];
    let r = 0;
    for (let o = 0; o < a.length; o++)
      r = a.charCodeAt(o) + ((r << 5) - r);
    return n[Math.abs(r) % n.length];
  }
}
function Kz() {
  return new Ix();
}
const Bg = Symbol("yh-flow-context");
function Nx(e) {
  e && Ag(Bg, e);
}
function Rt() {
  const e = Bd(Bg, null);
  if (!e)
    throw new Error("[YhFlow] FlowContext is not provided");
  return e;
}
const Ox = ["width", "height"], zx = ["width", "height", "viewBox"], Fx = ["fill", "stroke", "stroke-width"], Bx = {
  key: 0,
  class: "yh-flow-minimap__layout-controls"
}, Gx = /* @__PURE__ */ ie({
  __name: "Minimap",
  props: {
    nodeColor: { type: [String, Function] },
    nodeStrokeColor: { type: [String, Function] },
    nodeStrokeWidth: {},
    maskColor: {},
    maskStrokeColor: {},
    maskStrokeWidth: {},
    width: {},
    height: {},
    position: {},
    pannable: { type: Boolean },
    zoomable: { type: Boolean },
    interactive: { type: Boolean },
    showLayoutControls: { type: Boolean },
    layoutType: {},
    layoutDirection: {}
  },
  emits: ["layoutChange", "directionChange"],
  setup(e, { emit: a }) {
    const n = e, r = a, o = J(() => n.width || 200), s = J(() => n.height || 150), t = ee(), i = ee(), u = Rt(), l = u.nodes, d = u.edges, c = u.viewport;
    let _ = 1, f = 0, m = 0, h = 0, y = 0;
    const p = () => {
      const k = l.value;
      if (!k.length) return { minX: 0, minY: 0, maxX: 1, maxY: 1 };
      let S = 1 / 0, F = 1 / 0, B = -1 / 0, $ = -1 / 0;
      for (let x = 0; x < k.length; x++) {
        const j = k[x];
        if (j.hidden) continue;
        const G = j.width || 120, z = j.height || 50;
        j.position.x < S && (S = j.position.x), j.position.y < F && (F = j.position.y), j.position.x + G > B && (B = j.position.x + G), j.position.y + z > $ && ($ = j.position.y + z);
      }
      return S === 1 / 0 ? { minX: 0, minY: 0, maxX: 1, maxY: 1 } : { minX: S, minY: F, maxX: B, maxY: $ };
    }, v = (k) => (k - f) * _ + h, g = (k) => (k - m) * _ + y, M = () => {
      const k = t.value;
      if (!k) return;
      const S = k.getContext("2d", { alpha: !0 });
      if (!S) return;
      const F = p();
      f = F.minX, m = F.minY;
      const B = F.maxX - F.minX || 1, $ = F.maxY - F.minY || 1, x = 4;
      if (_ = Math.min((o.value - x * 2) / B, (s.value - x * 2) / $), h = (o.value - B * _) / 2, y = (s.value - $ * _) / 2, S.clearRect(0, 0, o.value, s.value), !l.value.length) {
        Y(c.value);
        return;
      }
      const j = /* @__PURE__ */ new Map();
      l.value.forEach((K) => j.set(K.id, K));
      const G = getComputedStyle(k), z = G.getPropertyValue("--flow-edge-stroke").trim() || "#94a3b8", W = G.getPropertyValue("--flow-minimap-node-color").trim() || "#cbd5e1", Z = G.getPropertyValue("--flow-node-selected-border").trim() || "#3b82f6";
      S.strokeStyle = z, S.lineWidth = 1.2, S.globalAlpha = 0.5, S.beginPath(), d.value.forEach((K) => {
        if (K.hidden) return;
        const ne = j.get(K.source), se = j.get(K.target);
        !ne || !se || (S.moveTo(
          v(ne.position.x + (ne.width || 120) / 2),
          g(ne.position.y + (ne.height || 50) / 2)
        ), S.lineTo(
          v(se.position.x + (se.width || 120) / 2),
          g(se.position.y + (se.height || 50) / 2)
        ));
      }), S.stroke(), S.globalAlpha = 0.85, l.value.forEach((K) => {
        if (K.hidden) return;
        let ne = K.selected ? Z : W;
        !K.selected && n.nodeColor && (ne = typeof n.nodeColor == "function" ? n.nodeColor(K) : n.nodeColor), S.fillStyle = ne;
        const se = Math.max((K.width || 120) * _, 3), R = Math.max((K.height || 50) * _, 3), O = v(K.position.x), U = g(K.position.y);
        if (S.fillRect(O, U, se, R), n.nodeStrokeWidth || n.nodeStrokeColor) {
          let V = "#94a3b8";
          n.nodeStrokeColor && (V = typeof n.nodeStrokeColor == "function" ? n.nodeStrokeColor(K) : n.nodeStrokeColor), S.strokeStyle = V, S.lineWidth = n.nodeStrokeWidth || 0.5, S.strokeRect(O, U, se, R);
        }
      }), S.globalAlpha = 1, Y(c.value);
    }, Y = (k) => {
      const S = i.value;
      if (!S || !_) return;
      const F = u.$el, B = (F == null ? void 0 : F.clientWidth) || 800, $ = (F == null ? void 0 : F.clientHeight) || 600, x = -k.x / k.zoom, j = -k.y / k.zoom, G = B / k.zoom, z = $ / k.zoom, W = (x - f) * _ + h, Z = (j - m) * _ + y, K = Math.max(G * _, 2), ne = Math.max(z * _, 2);
      S.setAttribute("x", String(W)), S.setAttribute("y", String(Z)), S.setAttribute("width", String(K)), S.setAttribute("height", String(ne));
    };
    let L = !1;
    const D = (k) => {
      var ne;
      if (!L || n.pannable === !1) return;
      const S = (ne = t.value) == null ? void 0 : ne.getBoundingClientRect();
      if (!S) return;
      const F = k.clientX - S.left, B = k.clientY - S.top, $ = (F - h) / _ + f, x = (B - y) / _ + m, j = c.value.zoom, G = u.$el, z = (G == null ? void 0 : G.clientWidth) || 800, W = (G == null ? void 0 : G.clientHeight) || 600, Z = z / 2 - $ * j, K = W / 2 - x * j;
      u.setViewport({ x: Z, y: K, zoom: j });
    }, w = () => {
      L = !1, document.removeEventListener("mousemove", D), document.removeEventListener("mouseup", w);
    }, T = (k) => {
      var S;
      if (n.interactive && !L) {
        const F = (S = t.value) == null ? void 0 : S.getBoundingClientRect();
        if (F) {
          const B = k.clientX - F.left, $ = k.clientY - F.top, x = (B - h) / _ + f, j = ($ - y) / _ + m, G = c.value.zoom, z = u.$el, W = (z == null ? void 0 : z.clientWidth) || 800, Z = (z == null ? void 0 : z.clientHeight) || 600, K = W / 2 - x * G, ne = Z / 2 - j * G;
          u.setViewport({ x: K, y: ne, zoom: G });
        }
        return;
      }
      n.pannable !== !1 && (L = !0, D(k), document.addEventListener("mousemove", D), document.addEventListener("mouseup", w));
    };
    return Ct(M), Gd(w), Le([l, d], M, { deep: !0, flush: "post" }), Le(c, (k) => Y(k), { flush: "sync" }), (k, S) => (H(), E(
      "div",
      {
        class: te(["yh-flow-minimap", [e.position]]),
        style: re({ width: o.value + "px", height: s.value + "px" }),
        onMousedown: we(T, ["stop"])
      },
      [
        I(" Canvas：绘制节点+连线（静态部分，节点变化才重绘） "),
        b("canvas", {
          ref_key: "canvasRef",
          ref: t,
          width: o.value,
          height: s.value,
          class: "yh-flow-minimap__canvas"
        }, null, 8, Ox),
        I(" SVG：视口框 "),
        (H(), E("svg", {
          ref: "svgRef",
          class: "yh-flow-minimap__vp",
          width: o.value,
          height: s.value,
          viewBox: `0 0 ${o.value} ${s.value}`,
          style: re({ background: n.maskColor || "transparent" })
        }, [
          b("rect", {
            ref_key: "vpRectEl",
            ref: i,
            x: "0",
            y: "0",
            width: "20",
            height: "20",
            fill: n.maskColor || "rgba(59,130,246,0.08)",
            stroke: n.maskStrokeColor || "#3b82f6",
            "stroke-width": n.maskStrokeWidth || 1.2,
            rx: "2",
            class: "yh-flow-minimap__rect"
          }, null, 8, Fx)
        ], 12, zx)),
        I(" Layout Controls (optional) "),
        n.showLayoutControls ? (H(), E("div", Bx, [
          b(
            "button",
            {
              class: te(["layout-btn", { active: n.layoutType === "dagre" }]),
              title: "Dagre Layout",
              onClick: S[0] || (S[0] = we((F) => r("layoutChange", "dagre"), ["stop"]))
            },
            " D ",
            2
            /* CLASS */
          ),
          b(
            "button",
            {
              class: te(["layout-btn", { active: n.layoutType === "elk" }]),
              title: "ELK Layout",
              onClick: S[1] || (S[1] = we((F) => r("layoutChange", "elk"), ["stop"]))
            },
            " E ",
            2
            /* CLASS */
          ),
          b(
            "button",
            {
              class: te(["layout-btn", { active: n.layoutType === "force" }]),
              title: "Force Layout",
              onClick: S[2] || (S[2] = we((F) => r("layoutChange", "force"), ["stop"]))
            },
            " F ",
            2
            /* CLASS */
          ),
          b(
            "button",
            {
              class: te(["layout-btn", { active: n.layoutDirection === "TB" }]),
              title: "Top to Bottom",
              onClick: S[3] || (S[3] = we((F) => r("directionChange", "TB"), ["stop"]))
            },
            " TB ",
            2
            /* CLASS */
          ),
          b(
            "button",
            {
              class: te(["layout-btn", { active: n.layoutDirection === "LR" }]),
              title: "Left to Right",
              onClick: S[4] || (S[4] = we((F) => r("directionChange", "LR"), ["stop"]))
            },
            " LR ",
            2
            /* CLASS */
          )
        ])) : I("v-if", !0)
      ],
      38
      /* CLASS, STYLE, NEED_HYDRATION */
    ));
  }
}), ue = (e, a) => {
  const n = e.__vccOpts || e;
  for (const [r, o] of a)
    n[r] = o;
  return n;
}, Jx = /* @__PURE__ */ ue(Gx, [["__scopeId", "data-v-c1fc9228"]]), Ux = {
  enabled: !0,
  nodeColor: () => "#fff",
  nodeStrokeColor: () => "#999",
  nodeStrokeWidth: 1,
  maskColor: "rgba(240, 240, 240, 0.6)",
  maskStrokeColor: "#ddd",
  maskStrokeWidth: 1,
  pannable: !0,
  zoomable: !0,
  position: "bottom-right",
  width: 200,
  height: 150,
  interactive: !1,
  showLayoutControls: !1,
  layoutType: "none",
  layoutDirection: "TB"
};
function Na(e = {}) {
  const a = { ...Ux, ...e };
  return {
    id: "minimap",
    name: "Minimap",
    version: "1.0.0",
    description: "Displays a minimap for navigation",
    component: Va(Jx),
    componentProps: {
      position: a.position,
      width: a.width,
      height: a.height,
      nodeColor: a.nodeColor,
      nodeStrokeColor: a.nodeStrokeColor,
      nodeStrokeWidth: a.nodeStrokeWidth,
      maskColor: a.maskColor,
      maskStrokeColor: a.maskStrokeColor,
      maskStrokeWidth: a.maskStrokeWidth,
      pannable: a.pannable,
      zoomable: a.zoomable,
      interactive: a.interactive,
      showLayoutControls: a.showLayoutControls,
      layoutType: a.layoutType,
      layoutDirection: a.layoutDirection
    },
    install(n) {
      console.log("[Minimap Plugin] Installed", n);
    }
  };
}
const wc = {
  name: "zh-cn",
  yh: {
    // 通用
    common: {
      yes: "是",
      no: "否",
      confirm: "确认",
      cancel: "取消",
      loading: "加载中",
      close: "关闭",
      clear: "清空",
      reset: "重置",
      save: "保存",
      delete: "删除",
      edit: "编辑",
      add: "新增",
      search: "搜索",
      refresh: "刷新",
      expand: "展开",
      collapse: "收起",
      more: "更多",
      noData: "暂无数据",
      noMatch: "无匹配数据",
      selectAll: "全选",
      unselectAll: "取消全选"
    },
    // 颜色选择器
    colorpicker: {
      confirm: "确定",
      clear: "清空",
      eyeDropper: "吸色器",
      suggestionDark: "白色文字最佳",
      suggestionLight: "黑色文字最佳",
      recentColors: "最近使用",
      presetColors: "预设颜色"
    },
    // 日期选择器
    datepicker: {
      now: "此刻",
      today: "今天",
      cancel: "取消",
      clear: "清空",
      confirm: "确定",
      selectDate: "选择日期",
      selectTime: "选择时间",
      startDate: "开始日期",
      startTime: "开始时间",
      endDate: "结束日期",
      endTime: "结束时间",
      year: "年",
      month: "月",
      day: "日",
      week: "周",
      monthBeforeYear: !1,
      prevYear: "上一年",
      nextYear: "下一年",
      prevMonth: "上个月",
      nextMonth: "下个月",
      weeks: {
        sun: "日",
        mon: "一",
        tue: "二",
        wed: "三",
        thu: "四",
        fri: "五",
        sat: "六"
      },
      months: {
        jan: "一月",
        feb: "二月",
        mar: "三月",
        apr: "四月",
        may: "五月",
        jun: "六月",
        jul: "七月",
        aug: "八月",
        sep: "九月",
        oct: "十月",
        nov: "十一月",
        dec: "十二月"
      },
      quarters: {
        q1: "第一季度",
        q2: "第二季度",
        q3: "第三季度",
        q4: "第四季度"
      }
    },
    // 时间选择器
    timepicker: {
      confirm: "确定",
      cancel: "取消",
      now: "此刻",
      placeholder: "选择时间",
      startPlaceholder: "开始时间",
      endPlaceholder: "结束时间",
      selectTime: "选择时间"
    },
    // 时间选择
    timeselect: {
      placeholder: "选择时间"
    },
    // 树
    tree: {
      emptyText: "暂无数据",
      loading: "加载中...",
      checkAll: "全选",
      uncheckAll: "取消全选",
      expandAll: "展开全部",
      collapseAll: "收起全部"
    },
    // 树选择
    treeselect: {
      placeholder: "请选择",
      emptyText: "暂无数据",
      loading: "加载中...",
      noMatch: "无匹配数据"
    },
    // 日历
    calendar: {
      prevMonth: "上个月",
      nextMonth: "下个月",
      prevYear: "上一年",
      nextYear: "下一年",
      today: "今天",
      week: "周",
      holiday: "休",
      workday: "班",
      monthHeaderFormat: "YYYY年M月",
      weeks: {
        sun: "日",
        mon: "一",
        tue: "二",
        wed: "三",
        thu: "四",
        fri: "五",
        sat: "六"
      }
    },
    // 自动完成
    autocomplete: {
      loading: "加载中...",
      placeholder: "请输入",
      noData: "暂无数据",
      noMatch: "无匹配数据"
    },
    // 倒计时
    countdown: {
      days: "天",
      hours: "时",
      minutes: "分",
      seconds: "秒",
      milliseconds: "毫秒",
      finished: "已结束"
    },
    // 级联选择
    cascader: {
      noMatch: "无匹配数据",
      placeholder: "请选择",
      loading: "加载中...",
      noData: "暂无数据"
    },
    // 穿梭框
    transfer: {
      noMatch: "无匹配数据",
      noData: "无数据",
      titles: ["列表 1", "列表 2"],
      filterPlaceholder: "请输入搜索内容",
      noCheckedFormat: "共 {total} 项",
      hasCheckedFormat: "已选 {checked}/{total} 项",
      searchPlaceholder: "请输入关键词"
    },
    // 表格
    table: {
      emptyText: "暂无数据",
      confirmFilter: "筛选",
      resetFilter: "重置",
      clearFilter: "全部",
      sumText: "合计",
      loading: "正在加载...",
      index: "序号",
      print: "打 印",
      cancel: "取 消",
      preview: "打印预览",
      printTime: "打印时间",
      total: "共 {total} 条",
      page: "第 {page} 页",
      yes: "是",
      no: "否",
      // 工具栏
      toolbar: {
        refresh: "刷新",
        density: "密度",
        densityDefault: "默认",
        densityLarge: "宽松",
        densitySmall: "紧凑",
        columnSetting: "列设置",
        fullscreen: "全屏",
        exitFullscreen: "退出全屏",
        export: "导出",
        import: "导入",
        search: "搜索",
        searchPlaceholder: "请输入关键词搜索"
      },
      // 筛选
      filter: {
        selectAll: "全选",
        selectInvert: "反选",
        empty: "为空",
        notEmpty: "不为空",
        contains: "包含",
        notContains: "不包含",
        equals: "等于",
        notEquals: "不等于",
        startsWith: "开头是",
        endsWith: "结尾是",
        greaterThan: "大于",
        lessThan: "小于",
        between: "介于"
      },
      // 排序
      sort: {
        asc: "升序",
        desc: "降序",
        clear: "取消排序"
      },
      // 导出
      export: {
        title: "导出数据",
        filename: "文件名",
        type: "文件类型",
        scope: "导出范围",
        scopeAll: "全部数据",
        scopeSelected: "选中数据",
        scopeCurrentPage: "当前页数据",
        includeHeader: "包含表头",
        exporting: "正在导出...",
        success: "导出成功",
        error: "导出失败"
      },
      // 导入
      import: {
        title: "导入数据",
        selectFile: "选择文件",
        dragTip: "点击或拖拽文件到此处上传",
        importing: "正在导入...",
        success: "导入成功",
        error: "导入失败",
        preview: "数据预览",
        confirm: "确认导入"
      },
      // 打印
      printConfig: {
        title: "打印设置",
        pageTitle: "页面标题",
        pageHeader: "页眉",
        pageFooter: "页脚",
        printAll: "打印全部",
        printSelected: "打印选中",
        printCurrentPage: "打印当前页",
        landscape: "横向",
        portrait: "纵向",
        printing: "正在打印..."
      },
      // 列设置
      columnSetting: {
        title: "列设置",
        showAll: "显示全部",
        hideAll: "隐藏全部",
        reset: "重置",
        fixedLeft: "固定在左侧",
        fixedRight: "固定在右侧",
        unfixed: "取消固定"
      },
      // 右键菜单
      contextMenu: {
        copy: "复制",
        copyRow: "复制行",
        copyCell: "复制单元格",
        paste: "粘贴",
        insertRowAbove: "在上方插入行",
        insertRowBelow: "在下方插入行",
        deleteRow: "删除行",
        deleteSelectedRows: "删除选中行",
        exportSelected: "导出选中数据"
      },
      // 选择
      selection: {
        selectAll: "全选",
        selectInvert: "反选",
        selectNone: "取消选择",
        selected: "已选择 {count} 项"
      },
      // 展开
      expand: {
        expandAll: "展开全部",
        collapseAll: "收起全部"
      },
      // 树形
      tree: {
        expandAll: "展开全部",
        collapseAll: "收起全部",
        expandLevel: "展开到第 {level} 层"
      },
      // 拖拽
      drag: {
        dragTip: "拖拽以调整顺序",
        dropTip: "释放以放置"
      }
    },
    // 消息框
    messagebox: {
      title: "提示",
      confirm: "确定",
      cancel: "取消",
      close: "关闭",
      error: "输入的数据不合法!",
      alert: "警告",
      prompt: "请输入",
      inputPlaceholder: "请输入内容"
    },
    // 上传
    upload: {
      deleteTip: "按 delete 键可删除",
      delete: "删除",
      preview: "查看图片",
      continue: "继续上传",
      upload: "点击上传",
      tip: "点击或拖拽文件到此处<em>上传</em>",
      dragTip: "将文件拖到此处，或点击上传",
      uploading: "上传中...",
      success: "上传成功",
      error: "上传失败",
      retry: "重新上传",
      cancel: "取消上传",
      fileTypeError: "文件类型不支持",
      fileSizeError: "文件大小超出限制",
      fileCountError: "文件数量超出限制"
    },
    // 表单
    form: {
      validationFailed: "校验失败",
      required: "必填项",
      pleaseInput: "请输入",
      pleaseSelect: "请选择"
    },
    // 按钮
    button: {
      loading: "加载中..."
    },
    // 输入框
    input: {
      placeholder: "请输入内容",
      clear: "清空",
      showPassword: "显示密码",
      hidePassword: "隐藏密码",
      copy: "复制",
      copied: "已复制"
    },
    // 数字输入框
    inputnumber: {
      placeholder: "请输入数字",
      increase: "增加",
      decrease: "减少"
    },
    // 标签输入
    inputtag: {
      placeholder: "请输入",
      add: "添加",
      remove: "移除"
    },
    // 面包屑
    breadcrumb: {
      label: "面包屑",
      more: "更多"
    },
    // 返回顶部
    backtop: {
      text: "回到顶部"
    },
    // 选择器
    select: {
      placeholder: "请选择",
      noData: "暂无数据",
      loading: "加载中...",
      noMatch: "无匹配数据",
      selectAll: "全选",
      clearAll: "清空"
    },
    // 分页
    pagination: {
      goto: "前往",
      page: "页",
      total: "共 {total} 条",
      pageSize: "条/页",
      prev: "上一页",
      next: "下一页",
      first: "首页",
      last: "末页",
      pageClassifier: "页"
    },
    // 气泡确认
    popconfirm: {
      confirm: "确定",
      cancel: "取消",
      dontAskAgain: "不再提示"
    },
    // 对话框
    dialog: {
      confirm: "确定",
      cancel: "取消",
      close: "关闭",
      maximize: "最大化",
      restore: "还原"
    },
    // 抽屉
    drawer: {
      close: "关闭",
      confirm: "确定",
      cancel: "取消"
    },
    // 下拉菜单
    dropdown: {
      loading: "加载中..."
    },
    // 图片
    image: {
      error: "加载失败",
      loading: "加载中...",
      preview: "预览",
      zoomIn: "放大",
      zoomOut: "缩小",
      rotateLeft: "向左旋转",
      rotateRight: "向右旋转",
      originalSize: "原始大小",
      fullscreen: "全屏"
    },
    // 图片预览
    imageviewer: {
      close: "关闭",
      prev: "上一张",
      next: "下一张",
      zoomIn: "放大",
      zoomOut: "缩小",
      rotateLeft: "向左旋转",
      rotateRight: "向右旋转",
      reset: "重置",
      fullscreen: "全屏",
      exitFullscreen: "退出全屏"
    },
    // 无限滚动
    infinitescroll: {
      loading: "加载中...",
      finished: "没有更多了",
      error: "加载失败，点击重试",
      retry: "点击重试"
    },
    // 消息
    message: {
      close: "关闭"
    },
    // 通知
    notification: {
      close: "关闭"
    },
    // 加载
    loading: {
      text: "加载中..."
    },
    // 加载中
    spin: {
      text: "加载中..."
    },
    // 评分
    rate: {
      texts: ["极差", "失望", "一般", "满意", "惊喜"]
    },
    // 警告
    alert: {
      close: "关闭"
    },
    // 标签
    tag: {
      close: "关闭"
    },
    // 标签页
    tabs: {
      close: "关闭",
      add: "新增",
      more: "更多"
    },
    // 步骤条
    steps: {
      finish: "已完成",
      process: "进行中",
      wait: "等待中",
      error: "错误"
    },
    // 进度条
    progress: {
      success: "成功",
      exception: "异常",
      warning: "警告"
    },
    // 骨架屏
    skeleton: {
      loading: "加载中..."
    },
    // 空状态
    empty: {
      description: "暂无数据",
      noData: "暂无数据",
      noResult: "暂无结果",
      networkError: "网络错误",
      serverError: "服务器错误"
    },
    // 结果
    result: {
      success: "操作成功",
      error: "操作失败",
      warning: "警告",
      info: "提示",
      backHome: "返回首页"
    },
    // 瀑布流
    waterfall: {
      loading: "加载中...",
      noMore: "没有更多了",
      empty: "暂无数据"
    },
    // 描述列表
    descriptions: {
      colon: "："
    },
    // 滑块
    slider: {
      tipFormatter: "{value}"
    },
    // 开关
    switch: {
      on: "开",
      off: "关"
    },
    // 复选框
    checkbox: {
      selectAll: "全选"
    },
    // 单选框
    radio: {},
    // 菜单
    menu: {
      collapse: "收起菜单",
      expand: "展开菜单"
    },
    // 卡片
    card: {
      collapse: "收起",
      expand: "展开"
    },
    // 折叠面板
    collapse: {
      expand: "展开",
      collapse: "收起"
    },
    // 工具提示
    tooltip: {},
    // 气泡卡片
    popover: {},
    // 徽标
    badge: {},
    // 头像
    avatar: {
      error: "加载失败"
    },
    // 水印
    watermark: {},
    // 分割线
    divider: {},
    // 走马灯
    carousel: {
      prev: "上一张",
      next: "下一张"
    },
    // 跑马灯
    marquee: {},
    // 固钉
    affix: {},
    // 流程图
    flow: {
      zoomIn: "放大画布",
      zoomOut: "缩小画布",
      fitView: "自适应视图",
      lock: "锁定/解锁画布"
    },
    // 锚点
    anchor: {},
    // 提及
    mention: {
      placeholder: "请输入",
      loading: "加载中...",
      noData: "暂无数据"
    },
    // SKU 选择器
    skuselector: {
      placeholder: "请选择规格",
      emptyText: "暂无规格",
      stock: "库存",
      price: "价格",
      selected: "已选",
      outOfStock: "暂时无货"
    },
    // 商品卡片
    productcard: {
      viewDetails: "查看详情",
      buyNow: "立即购买",
      addToCart: "加入购物车",
      sold: "已售",
      soldOut: "售罄",
      vip: "会员"
    },
    // 价格
    price: {
      original: "原价"
    },
    // 优惠券
    couponcard: {
      available: "点击领取",
      used: "已使用",
      expired: "已过期",
      received: "已领取",
      limit: "满 {threshold} 元可用",
      noThreshold: "无门槛",
      validPeriod: "有效期",
      ruleTitle: "使用说明及规则"
    },
    // 幸运抽奖
    luckydraw: {
      start: "开始抽奖",
      drawing: "抽奖中...",
      end: "中奖了",
      retry: "再试一次"
    },
    // 筛选排序栏
    filterbar: {
      all: "全部",
      sort: "排序",
      filter: "筛选",
      cancel: "取消",
      reset: "重置",
      confirm: "确定",
      noOptions: "暂无筛选项",
      asc: "升序",
      desc: "降序",
      selected: "已选"
    },
    // 结算栏
    submitbar: {
      total: "小计：",
      selected: "已选 {count} 件",
      submit: "去结算",
      allSelect: "全选"
    },
    // 品类导航
    categorynav: {
      all: "全部",
      noData: "暂无数据",
      loading: "加载中..."
    },
    // 智能地址
    smartaddress: {
      placeholder: "请粘贴收货地址，自动识别姓名、手机号、地址",
      parse: "智能识别",
      province: "省/市/区",
      city: "市",
      district: "区/县",
      street: "街道/镇",
      detail: "详细地址",
      phone: "手机号",
      name: "收货人",
      parseSuccess: "地址识别成功",
      parseFailed: "未能识别，请手动填写",
      required: "请填写完整地址",
      provinceKeywords: ["省", "自治区", "特别行政区"],
      cityKeywords: ["市", "州", "盟"],
      districtKeywords: ["区", "县", "旗", "镇", "市"],
      streetKeywords: ["街道", "镇", "乡", "村"]
    },
    // AI 组件
    ai: {
      bubble: {
        citations: "参考引用"
      },
      mention: {
        placeholder: "@ 呼叫 Agent、文档或表格...",
        agent: "智能体",
        document: "文档",
        table: "表格",
        knowledge: "知识库"
      },
      codeBlock: {
        copyCode: "复制代码",
        copied: "已复制！",
        run: "运行代码",
        edit: "编辑",
        save: "保存",
        cancel: "取消"
      },
      codeRunner: {
        run: "运行",
        stop: "停止",
        clear: "清空",
        reset: "重置",
        placeholder: "点击运行按钮执行代码..."
      },
      sender: {
        placeholder: "发送消息...",
        dragTip: "释放鼠标以上传文件"
      },
      thoughtChain: {
        thoughtProcess: "思考过程",
        thinking: "思考中...",
        defaultTitle: "新步骤",
        addNode: "添加节点"
      },
      thinking: {
        start: "开始思考",
        thinking: "思考中...",
        complete: "已完成思考",
        error: "思考出错了"
      },
      welcome: {
        title: "你好，我是 YH AI",
        description: "我可以帮你写代码、翻译文档或进行创意写作。今天我能为你做点什么？"
      },
      action: {
        copy: "复制",
        regenerate: "重新生成",
        share: "分享",
        like: "赞同",
        dislike: "反对",
        edit: "编辑",
        delete: "删除"
      },
      artifacts: {
        preview: "预览",
        inline: "行内",
        code: "源码",
        versions: "版本历史",
        rendering: "正在渲染组件...",
        renderingChart: "正在渲染图表...",
        renderingCanvas: "正在准备画板..."
      },
      voice: {
        trigger: "点击说话",
        listening: "聆听中..."
      },
      // AiAgentCard
      agent: {
        uses: "次调用",
        use: "立即使用",
        favorite: "收藏",
        unfavorite: "取消收藏",
        share: "分享",
        online: "在线",
        offline: "离线",
        busy: "忙碌",
        verified: "官方认证",
        rating: "评分",
        reviews: "条评价",
        responseTime: "响应时间",
        ms: "ms"
      },
      // AiSources
      sources: {
        references: "参考来源",
        referencedSources: "引用来源",
        relevant: "相关度",
        viewOriginal: "查看原文",
        showAll: "显示全部",
        more: "更多来源",
        drawerTitle: "参考来源",
        expandMore: "展开更多",
        collapseMore: "收起",
        noSources: "暂无来源",
        today: "今天",
        last7Days: "最近 7 天",
        last30Days: "最近 30 天",
        earlier: "更早",
        pinned: "已置顶"
      },
      // AiConversations groups
      conversations: {
        today: "今天",
        last7Days: "最近 7 天",
        last30Days: "最近 30 天",
        earlier: "更早",
        pinned: "置顶",
        pin: "置顶",
        unpin: "取消置顶",
        newConversation: "新建对话",
        noData: "暂无对话记录",
        rename: "重命名",
        delete: "删除",
        deleteConfirm: "确认删除此对话？"
      },
      // AiAttachments
      attachments: {
        dropTip: "释放鼠标以上传文件",
        clickToUpload: "点击或拖拽文件到此处上传",
        uploadSuccess: "上传成功",
        uploadError: "上传失败",
        deleteConfirm: "确定删除此文件？",
        fileTooLarge: "文件大小不能超过 {size}",
        invalidFileType: "不支持的文件类型"
      },
      // AiMermaid
      mermaid: {
        image: "图片",
        code: "代码",
        zoomIn: "放大",
        zoomOut: "缩小",
        reset: "重置",
        download: "下载",
        copyCode: "复制代码",
        rendering: "正在渲染...",
        renderError: "渲染失败",
        renderSuccess: "渲染成功",
        retry: "重试"
      }
    }
  }
}, Wx = {
  yh: {
    // Common
    common: {
      yes: "Yes",
      no: "No",
      confirm: "Confirm",
      cancel: "Cancel",
      loading: "Loading",
      close: "Close",
      clear: "Clear",
      reset: "Reset",
      save: "Save",
      delete: "Delete",
      edit: "Edit",
      add: "Add",
      search: "Search",
      refresh: "Refresh",
      expand: "Expand",
      collapse: "Collapse",
      more: "More",
      noData: "No Data",
      noMatch: "No matching data",
      selectAll: "Select All",
      unselectAll: "Unselect All"
    },
    // Color Picker
    colorpicker: {
      confirm: "OK",
      clear: "Clear",
      eyeDropper: "Eye Dropper",
      suggestionDark: "White text is best",
      suggestionLight: "Black text is best",
      recentColors: "Recent Colors",
      presetColors: "Preset Colors"
    },
    // Date Picker
    datepicker: {
      now: "Now",
      today: "Today",
      cancel: "Cancel",
      clear: "Clear",
      confirm: "OK",
      selectDate: "Select date",
      selectTime: "Select time",
      startDate: "Start Date",
      startTime: "Start Time",
      endDate: "End Date",
      endTime: "End Time",
      year: "",
      month: "",
      day: "",
      week: "Week",
      monthBeforeYear: !0,
      prevYear: "Previous Year",
      nextYear: "Next Year",
      prevMonth: "Previous Month",
      nextMonth: "Next Month",
      weeks: {
        sun: "Sun",
        mon: "Mon",
        tue: "Tue",
        wed: "Wed",
        thu: "Thu",
        fri: "Fri",
        sat: "Sat"
      },
      months: {
        jan: "Jan",
        feb: "Feb",
        mar: "Mar",
        apr: "Apr",
        may: "May",
        jun: "Jun",
        jul: "Jul",
        aug: "Aug",
        sep: "Sep",
        oct: "Oct",
        nov: "Nov",
        dec: "Dec"
      },
      quarters: {
        q1: "Q1",
        q2: "Q2",
        q3: "Q3",
        q4: "Q4"
      }
    },
    // Time Picker
    timepicker: {
      confirm: "OK",
      cancel: "Cancel",
      now: "Now",
      placeholder: "Select time",
      startPlaceholder: "Start time",
      endPlaceholder: "End time",
      selectTime: "Select time"
    },
    // Time Select
    timeselect: {
      placeholder: "Select time"
    },
    // Tree
    tree: {
      emptyText: "No Data",
      loading: "Loading...",
      checkAll: "Check All",
      uncheckAll: "Uncheck All",
      expandAll: "Expand All",
      collapseAll: "Collapse All"
    },
    // Tree Select
    treeselect: {
      placeholder: "Select",
      emptyText: "No Data",
      loading: "Loading...",
      noMatch: "No matching data"
    },
    // Calendar
    calendar: {
      prevMonth: "Previous Month",
      nextMonth: "Next Month",
      prevYear: "Previous Year",
      nextYear: "Next Year",
      today: "Today",
      week: "Week",
      holiday: "Holiday",
      workday: "Work",
      monthHeaderFormat: "MMMM YYYY",
      weeks: {
        sun: "Sun",
        mon: "Mon",
        tue: "Tue",
        wed: "Wed",
        thu: "Thu",
        fri: "Fri",
        sat: "Sat"
      }
    },
    // Autocomplete
    autocomplete: {
      loading: "Loading...",
      placeholder: "Please input",
      noData: "No Data",
      noMatch: "No matching data"
    },
    // Countdown
    countdown: {
      days: "days",
      hours: "hours",
      minutes: "minutes",
      seconds: "seconds",
      milliseconds: "milliseconds",
      finished: "Finished"
    },
    // Cascader
    cascader: {
      noMatch: "No matching data",
      placeholder: "Select",
      loading: "Loading...",
      noData: "No Data"
    },
    // Transfer
    transfer: {
      noMatch: "No matching data",
      noData: "No data",
      titles: ["List 1", "List 2"],
      filterPlaceholder: "Enter keyword",
      noCheckedFormat: "{total} items",
      hasCheckedFormat: "{checked}/{total} checked",
      searchPlaceholder: "Enter keyword"
    },
    // Table
    table: {
      emptyText: "No Data",
      confirmFilter: "Confirm",
      resetFilter: "Reset",
      clearFilter: "All",
      sumText: "Sum",
      loading: "Loading...",
      index: "Index",
      print: "Print",
      cancel: "Cancel",
      preview: "Print Preview",
      printTime: "Print Time",
      total: "Total {total} items",
      page: "Page {page}",
      yes: "Yes",
      no: "No",
      // Toolbar
      toolbar: {
        refresh: "Refresh",
        density: "Density",
        densityDefault: "Default",
        densityLarge: "Large",
        densitySmall: "Small",
        columnSetting: "Column Settings",
        fullscreen: "Fullscreen",
        exitFullscreen: "Exit Fullscreen",
        export: "Export",
        import: "Import",
        search: "Search",
        searchPlaceholder: "Enter keywords to search"
      },
      // Filter
      filter: {
        selectAll: "Select All",
        selectInvert: "Invert Selection",
        empty: "Is Empty",
        notEmpty: "Is Not Empty",
        contains: "Contains",
        notContains: "Does Not Contain",
        equals: "Equals",
        notEquals: "Does Not Equal",
        startsWith: "Starts With",
        endsWith: "Ends With",
        greaterThan: "Greater Than",
        lessThan: "Less Than",
        between: "Between"
      },
      // Sort
      sort: {
        asc: "Ascending",
        desc: "Descending",
        clear: "Clear Sort"
      },
      // Export
      export: {
        title: "Export Data",
        filename: "Filename",
        type: "File Type",
        scope: "Export Scope",
        scopeAll: "All Data",
        scopeSelected: "Selected Data",
        scopeCurrentPage: "Current Page",
        includeHeader: "Include Header",
        exporting: "Exporting...",
        success: "Export Successful",
        error: "Export Failed"
      },
      // Import
      import: {
        title: "Import Data",
        selectFile: "Select File",
        dragTip: "Click or drag file here to upload",
        importing: "Importing...",
        success: "Import Successful",
        error: "Import Failed",
        preview: "Data Preview",
        confirm: "Confirm Import"
      },
      // Print
      printConfig: {
        title: "Print Settings",
        pageTitle: "Page Title",
        pageHeader: "Header",
        pageFooter: "Footer",
        printAll: "Print All",
        printSelected: "Print Selected",
        printCurrentPage: "Print Current Page",
        landscape: "Landscape",
        portrait: "Portrait",
        printing: "Printing..."
      },
      // Column Settings
      columnSetting: {
        title: "Column Settings",
        showAll: "Show All",
        hideAll: "Hide All",
        reset: "Reset",
        fixedLeft: "Fix to Left",
        fixedRight: "Fix to Right",
        unfixed: "Unfix"
      },
      // Context Menu
      contextMenu: {
        copy: "Copy",
        copyRow: "Copy Row",
        copyCell: "Copy Cell",
        paste: "Paste",
        insertRowAbove: "Insert Row Above",
        insertRowBelow: "Insert Row Below",
        deleteRow: "Delete Row",
        deleteSelectedRows: "Delete Selected Rows",
        exportSelected: "Export Selected"
      },
      // Selection
      selection: {
        selectAll: "Select All",
        selectInvert: "Invert Selection",
        selectNone: "Clear Selection",
        selected: "{count} items selected"
      },
      // Expand
      expand: {
        expandAll: "Expand All",
        collapseAll: "Collapse All"
      },
      // Tree
      tree: {
        expandAll: "Expand All",
        collapseAll: "Collapse All",
        expandLevel: "Expand to Level {level}"
      },
      // Drag
      drag: {
        dragTip: "Drag to reorder",
        dropTip: "Drop to place"
      }
    },
    // Message Box
    messagebox: {
      title: "Message",
      confirm: "OK",
      cancel: "Cancel",
      close: "Close",
      error: "Illegal input",
      alert: "Alert",
      prompt: "Prompt",
      inputPlaceholder: "Please input"
    },
    // Upload
    upload: {
      deleteTip: "press delete to remove",
      delete: "Delete",
      preview: "Preview",
      continue: "Continue",
      upload: "Click to upload",
      tip: "Click or drag file to this area to <em>upload</em>",
      dragTip: "Drop file here or click to upload",
      uploading: "Uploading...",
      success: "Upload successful",
      error: "Upload failed",
      retry: "Retry",
      cancel: "Cancel upload",
      fileTypeError: "File type not supported",
      fileSizeError: "File size exceeds limit",
      fileCountError: "File count exceeds limit"
    },
    // Form
    form: {
      validationFailed: "Validation failed",
      required: "Required",
      pleaseInput: "Please input",
      pleaseSelect: "Please select"
    },
    // Button
    button: {
      loading: "Loading..."
    },
    // Input
    input: {
      placeholder: "Please input",
      clear: "Clear",
      showPassword: "Show password",
      hidePassword: "Hide password",
      copy: "Copy",
      copied: "Copied"
    },
    // Input Number
    inputnumber: {
      placeholder: "Please input number",
      increase: "Increase",
      decrease: "Decrease"
    },
    // Input Tag
    inputtag: {
      placeholder: "Please input",
      add: "Add",
      remove: "Remove"
    },
    // Breadcrumb
    breadcrumb: {
      label: "Breadcrumb",
      more: "More"
    },
    // Back Top
    backtop: {
      text: "Back to Top"
    },
    // Select
    select: {
      placeholder: "Please select",
      noData: "No Data",
      loading: "Loading...",
      noMatch: "No matching data",
      selectAll: "Select All",
      clearAll: "Clear All"
    },
    // Pagination
    pagination: {
      goto: "Go to",
      page: "",
      total: "Total {total}",
      pageSize: "/page",
      prev: "Previous",
      next: "Next",
      first: "First",
      last: "Last",
      pageClassifier: ""
    },
    // Popconfirm
    popconfirm: {
      confirm: "OK",
      cancel: "Cancel",
      dontAskAgain: "Don't ask again"
    },
    // Dialog
    dialog: {
      confirm: "OK",
      cancel: "Cancel",
      close: "Close",
      maximize: "Maximize",
      restore: "Restore"
    },
    // Drawer
    drawer: {
      close: "Close",
      confirm: "OK",
      cancel: "Cancel"
    },
    // Dropdown
    dropdown: {
      loading: "Loading..."
    },
    // Image
    image: {
      error: "FAILED",
      loading: "Loading...",
      preview: "Preview",
      zoomIn: "Zoom In",
      zoomOut: "Zoom Out",
      rotateLeft: "Rotate Left",
      rotateRight: "Rotate Right",
      originalSize: "Original Size",
      fullscreen: "Fullscreen"
    },
    // Image Viewer
    imageviewer: {
      close: "Close",
      prev: "Previous",
      next: "Next",
      zoomIn: "Zoom In",
      zoomOut: "Zoom Out",
      rotateLeft: "Rotate Left",
      rotateRight: "Rotate Right",
      reset: "Reset",
      fullscreen: "Fullscreen",
      exitFullscreen: "Exit Fullscreen"
    },
    // Infinite Scroll
    infinitescroll: {
      loading: "Loading...",
      finished: "No more data",
      error: "Load failed, click to retry",
      retry: "Click to retry"
    },
    // Message
    message: {
      close: "Close"
    },
    // Notification
    notification: {
      close: "Close"
    },
    // Loading
    loading: {
      text: "Loading..."
    },
    // Spin
    spin: {
      text: "Loading..."
    },
    // Rate
    rate: {
      texts: ["Extremely poor", "Disappointed", "Fair", "Satisfied", "Surprised"]
    },
    // Alert
    alert: {
      close: "Close"
    },
    // Tag
    tag: {
      close: "Close"
    },
    // Tabs
    tabs: {
      close: "Close",
      add: "Add",
      more: "More"
    },
    // Steps
    steps: {
      finish: "Finished",
      process: "In Progress",
      wait: "Waiting",
      error: "Error"
    },
    // Progress
    progress: {
      success: "Success",
      exception: "Exception",
      warning: "Warning"
    },
    // Skeleton
    skeleton: {
      loading: "Loading..."
    },
    // Empty
    empty: {
      description: "No Data",
      noData: "No Data",
      noResult: "No Results",
      networkError: "Network Error",
      serverError: "Server Error"
    },
    // Result
    result: {
      success: "Success",
      error: "Error",
      warning: "Warning",
      info: "Info",
      backHome: "Back to Home"
    },
    // Waterfall
    waterfall: {
      loading: "Loading...",
      noMore: "No more data",
      empty: "No Data"
    },
    // Descriptions
    descriptions: {
      colon: ":"
    },
    // Slider
    slider: {
      tipFormatter: "{value}"
    },
    // Switch
    switch: {
      on: "ON",
      off: "OFF"
    },
    // Checkbox
    checkbox: {
      selectAll: "Select All"
    },
    // Radio
    radio: {},
    // Menu
    menu: {
      collapse: "Collapse Menu",
      expand: "Expand Menu"
    },
    // Card
    card: {
      collapse: "Collapse",
      expand: "Expand"
    },
    // Collapse
    collapse: {
      expand: "Expand",
      collapse: "Collapse"
    },
    // Tooltip
    tooltip: {},
    // Popover
    popover: {},
    // Badge
    badge: {},
    // Avatar
    avatar: {
      error: "Load failed"
    },
    // Watermark
    watermark: {},
    // Divider
    divider: {},
    // Carousel
    carousel: {
      prev: "Previous",
      next: "Next"
    },
    // Marquee
    marquee: {},
    // Affix
    affix: {},
    // Flow
    flow: {
      zoomIn: "Zoom In",
      zoomOut: "Zoom Out",
      fitView: "Fit View",
      lock: "Toggle Interactivity"
    },
    // Anchor
    anchor: {},
    // Mention
    mention: {
      placeholder: "Please input",
      loading: "Loading...",
      noData: "No Data"
    },
    // SKU Selector
    skuselector: {
      placeholder: "Select specifications",
      emptyText: "No specifications",
      stock: "Stock",
      price: "Price",
      selected: "Selected",
      outOfStock: "Out of Stock"
    },
    // Product Card
    productcard: {
      viewDetails: "View Details",
      buyNow: "Buy Now",
      addToCart: "Add to Cart",
      sold: "Sold",
      soldOut: "Sold Out",
      vip: "VIP"
    },
    // Price
    price: {
      original: "Original"
    },
    // Coupon Card
    couponcard: {
      available: "Claim Now",
      used: "Used",
      expired: "Expired",
      received: "Received",
      limit: "Orders over {threshold}",
      noThreshold: "No threshold",
      validPeriod: "Validity",
      ruleTitle: "Usage Rules"
    },
    // Lucky Draw
    luckydraw: {
      start: "Start",
      drawing: "Drawing...",
      end: "Winner!",
      retry: "Retry"
    },
    // Filter Bar
    filterbar: {
      all: "All",
      sort: "Sort",
      filter: "Filter",
      cancel: "Cancel",
      reset: "Reset",
      confirm: "Confirm",
      noOptions: "No options",
      asc: "Ascending",
      desc: "Descending",
      selected: "Selected"
    },
    // Submit Bar
    submitbar: {
      total: "Total: ",
      selected: "{count} selected",
      submit: "Checkout",
      allSelect: "Select All"
    },
    // Category Nav
    categorynav: {
      all: "All",
      noData: "No Data",
      loading: "Loading..."
    },
    // Smart Address
    smartaddress: {
      placeholder: "Paste address here, auto-detect name, phone, location",
      parse: "Smart Parse",
      province: "Province/City/District",
      city: "City",
      district: "District/County",
      street: "Street/Town",
      detail: "Detailed Address",
      phone: "Phone",
      name: "Recipient",
      parseSuccess: "Address parsed successfully",
      parseFailed: "Parse failed, please fill manually",
      required: "Please fill complete address",
      provinceKeywords: ["Province", "State"],
      cityKeywords: ["City", "Prefecture"],
      districtKeywords: ["District", "County", "Township"],
      streetKeywords: ["Street", "Road", "Ave", "Lane"]
    },
    ganttchart: {
      taskName: "Task Name",
      searchPlaceholder: "Search tasks...",
      zoom: "Zoom",
      day: "Day",
      week: "Week",
      month: "Month",
      year: "Year",
      milestone: "Milestone"
    },
    imagemagnifier: {
      switchToImage: "Switch to image {index}",
      galleryItem: "Gallery {index}",
      close: "Close"
    },
    // AI Components
    ai: {
      bubble: {
        citations: "Citations"
      },
      mention: {
        placeholder: "@ Mention Agent, Doc or Table...",
        agent: "Agent",
        document: "Document",
        table: "Table",
        knowledge: "Knowledge"
      },
      codeBlock: {
        copyCode: "Copy code",
        copied: "Copied!",
        run: "Run Code",
        edit: "Edit",
        save: "Save",
        cancel: "Cancel"
      },
      codeRunner: {
        run: "Run",
        stop: "Stop",
        clear: "Clear",
        reset: "Reset",
        placeholder: "Click Run to execute the code..."
      },
      sender: {
        placeholder: "Send a message...",
        dragTip: "Release to upload files"
      },
      thoughtChain: {
        thoughtProcess: "Thought Process",
        thinking: "Thinking...",
        defaultTitle: "New Step",
        addNode: "Add Step"
      },
      thinking: {
        start: "Start thinking",
        thinking: "Thinking...",
        complete: "Thinking complete",
        error: "Thinking error"
      },
      welcome: {
        title: "Hello, I am YH AI",
        description: "I can help you with coding, translating documents, or creative writing. What can I do for you today?"
      },
      action: {
        copy: "Copy",
        regenerate: "Regenerate",
        share: "Share",
        like: "Like",
        dislike: "Dislike",
        edit: "Edit",
        delete: "Delete"
      },
      artifacts: {
        preview: "Preview",
        inline: "Inline",
        code: "Source",
        versions: "Versions",
        rendering: "Rendering component...",
        renderingChart: "Rendering chart...",
        renderingCanvas: "Preparing canvas..."
      },
      voice: {
        trigger: "Click to Speak",
        listening: "Listening..."
      },
      // AiAgentCard
      agent: {
        uses: "uses",
        use: "Use Now",
        favorite: "Favorite",
        unfavorite: "Unfavorite",
        share: "Share",
        online: "Online",
        offline: "Offline",
        busy: "Busy",
        verified: "Verified",
        rating: "Rating",
        reviews: "reviews",
        responseTime: "Avg. Response",
        ms: "ms"
      },
      // AiSources
      sources: {
        references: "References",
        referencedSources: "Referenced Sources",
        relevant: "Relevance",
        viewOriginal: "View Original",
        showAll: "Show All",
        more: "more sources",
        drawerTitle: "References",
        expandMore: "Show More",
        collapseMore: "Collapse",
        noSources: "No sources",
        today: "Today",
        last7Days: "Last 7 Days",
        last30Days: "Last 30 Days",
        earlier: "Earlier",
        pinned: "Pinned"
      },
      // AiConversations groups
      conversations: {
        today: "Today",
        last7Days: "Last 7 Days",
        last30Days: "Last 30 Days",
        earlier: "Earlier",
        pinned: "Pinned",
        pin: "Pin",
        unpin: "Unpin",
        newConversation: "New Conversation",
        noData: "No conversations yet",
        rename: "Rename",
        delete: "Delete",
        deleteConfirm: "Confirm delete this conversation?"
      },
      // AiAttachments
      attachments: {
        dropTip: "Drop files here to upload",
        clickToUpload: "Click or drag files to upload",
        uploadSuccess: "Upload success",
        uploadError: "Upload failed",
        deleteConfirm: "Are you sure to delete this file?",
        fileTooLarge: "File size cannot exceed {size}",
        invalidFileType: "Invalid file type"
      },
      // AiMermaid
      mermaid: {
        image: "Image",
        code: "Code",
        zoomIn: "Zoom In",
        zoomOut: "Zoom Out",
        reset: "Reset",
        download: "Download",
        copyCode: "Copy Code",
        rendering: "Rendering...",
        renderError: "Render failed",
        renderSuccess: "Render success",
        retry: "Retry"
      }
    }
  }
}, Vx = Symbol(
  "configProviderContextKey"
), Kx = () => {
  const e = Bd(Vx, null), a = J(() => {
    const o = De(e);
    return (o == null ? void 0 : o.size) || "default";
  }), n = J(() => {
    const o = De(e);
    return (o == null ? void 0 : o.zIndex) || 2e3;
  }), r = J(() => {
    const o = De(e);
    return o == null ? void 0 : o.locale;
  });
  return {
    config: e,
    globalSize: a,
    globalZIndex: n,
    globalLocale: r
  };
};
var Zt = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function A(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
var tr = { exports: {} }, Xx = tr.exports, xc;
function P() {
  return xc || (xc = 1, (function(e, a) {
    (function(n, r) {
      e.exports = r();
    })(Xx, (function() {
      var n = 1e3, r = 6e4, o = 36e5, s = "millisecond", t = "second", i = "minute", u = "hour", l = "day", d = "week", c = "month", _ = "quarter", f = "year", m = "date", h = "Invalid Date", y = /^(\d{4})[-/]?(\d{1,2})?[-/]?(\d{0,2})[Tt\s]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?[.:]?(\d+)?$/, p = /\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g, v = { name: "en", weekdays: "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"), months: "January_February_March_April_May_June_July_August_September_October_November_December".split("_"), ordinal: function($) {
        var x = ["th", "st", "nd", "rd"], j = $ % 100;
        return "[" + $ + (x[(j - 20) % 10] || x[j] || x[0]) + "]";
      } }, g = function($, x, j) {
        var G = String($);
        return !G || G.length >= x ? $ : "" + Array(x + 1 - G.length).join(j) + $;
      }, M = { s: g, z: function($) {
        var x = -$.utcOffset(), j = Math.abs(x), G = Math.floor(j / 60), z = j % 60;
        return (x <= 0 ? "+" : "-") + g(G, 2, "0") + ":" + g(z, 2, "0");
      }, m: function $(x, j) {
        if (x.date() < j.date()) return -$(j, x);
        var G = 12 * (j.year() - x.year()) + (j.month() - x.month()), z = x.clone().add(G, c), W = j - z < 0, Z = x.clone().add(G + (W ? -1 : 1), c);
        return +(-(G + (j - z) / (W ? z - Z : Z - z)) || 0);
      }, a: function($) {
        return $ < 0 ? Math.ceil($) || 0 : Math.floor($);
      }, p: function($) {
        return { M: c, y: f, w: d, d: l, D: m, h: u, m: i, s: t, ms: s, Q: _ }[$] || String($ || "").toLowerCase().replace(/s$/, "");
      }, u: function($) {
        return $ === void 0;
      } }, Y = "en", L = {};
      L[Y] = v;
      var D = "$isDayjsObject", w = function($) {
        return $ instanceof F || !(!$ || !$[D]);
      }, T = function $(x, j, G) {
        var z;
        if (!x) return Y;
        if (typeof x == "string") {
          var W = x.toLowerCase();
          L[W] && (z = W), j && (L[W] = j, z = W);
          var Z = x.split("-");
          if (!z && Z.length > 1) return $(Z[0]);
        } else {
          var K = x.name;
          L[K] = x, z = K;
        }
        return !G && z && (Y = z), z || !G && Y;
      }, k = function($, x) {
        if (w($)) return $.clone();
        var j = typeof x == "object" ? x : {};
        return j.date = $, j.args = arguments, new F(j);
      }, S = M;
      S.l = T, S.i = w, S.w = function($, x) {
        return k($, { locale: x.$L, utc: x.$u, x: x.$x, $offset: x.$offset });
      };
      var F = (function() {
        function $(j) {
          this.$L = T(j.locale, null, !0), this.parse(j), this.$x = this.$x || j.x || {}, this[D] = !0;
        }
        var x = $.prototype;
        return x.parse = function(j) {
          this.$d = (function(G) {
            var z = G.date, W = G.utc;
            if (z === null) return /* @__PURE__ */ new Date(NaN);
            if (S.u(z)) return /* @__PURE__ */ new Date();
            if (z instanceof Date) return new Date(z);
            if (typeof z == "string" && !/Z$/i.test(z)) {
              var Z = z.match(y);
              if (Z) {
                var K = Z[2] - 1 || 0, ne = (Z[7] || "0").substring(0, 3);
                return W ? new Date(Date.UTC(Z[1], K, Z[3] || 1, Z[4] || 0, Z[5] || 0, Z[6] || 0, ne)) : new Date(Z[1], K, Z[3] || 1, Z[4] || 0, Z[5] || 0, Z[6] || 0, ne);
              }
            }
            return new Date(z);
          })(j), this.init();
        }, x.init = function() {
          var j = this.$d;
          this.$y = j.getFullYear(), this.$M = j.getMonth(), this.$D = j.getDate(), this.$W = j.getDay(), this.$H = j.getHours(), this.$m = j.getMinutes(), this.$s = j.getSeconds(), this.$ms = j.getMilliseconds();
        }, x.$utils = function() {
          return S;
        }, x.isValid = function() {
          return this.$d.toString() !== h;
        }, x.isSame = function(j, G) {
          var z = k(j);
          return this.startOf(G) <= z && z <= this.endOf(G);
        }, x.isAfter = function(j, G) {
          return k(j) < this.startOf(G);
        }, x.isBefore = function(j, G) {
          return this.endOf(G) < k(j);
        }, x.$g = function(j, G, z) {
          return S.u(j) ? this[G] : this.set(z, j);
        }, x.unix = function() {
          return Math.floor(this.valueOf() / 1e3);
        }, x.valueOf = function() {
          return this.$d.getTime();
        }, x.startOf = function(j, G) {
          var z = this, W = !!S.u(G) || G, Z = S.p(j), K = function(ce, le) {
            var he = S.w(z.$u ? Date.UTC(z.$y, le, ce) : new Date(z.$y, le, ce), z);
            return W ? he : he.endOf(l);
          }, ne = function(ce, le) {
            return S.w(z.toDate()[ce].apply(z.toDate("s"), (W ? [0, 0, 0, 0] : [23, 59, 59, 999]).slice(le)), z);
          }, se = this.$W, R = this.$M, O = this.$D, U = "set" + (this.$u ? "UTC" : "");
          switch (Z) {
            case f:
              return W ? K(1, 0) : K(31, 11);
            case c:
              return W ? K(1, R) : K(0, R + 1);
            case d:
              var V = this.$locale().weekStart || 0, oe = (se < V ? se + 7 : se) - V;
              return K(W ? O - oe : O + (6 - oe), R);
            case l:
            case m:
              return ne(U + "Hours", 0);
            case u:
              return ne(U + "Minutes", 1);
            case i:
              return ne(U + "Seconds", 2);
            case t:
              return ne(U + "Milliseconds", 3);
            default:
              return this.clone();
          }
        }, x.endOf = function(j) {
          return this.startOf(j, !1);
        }, x.$set = function(j, G) {
          var z, W = S.p(j), Z = "set" + (this.$u ? "UTC" : ""), K = (z = {}, z[l] = Z + "Date", z[m] = Z + "Date", z[c] = Z + "Month", z[f] = Z + "FullYear", z[u] = Z + "Hours", z[i] = Z + "Minutes", z[t] = Z + "Seconds", z[s] = Z + "Milliseconds", z)[W], ne = W === l ? this.$D + (G - this.$W) : G;
          if (W === c || W === f) {
            var se = this.clone().set(m, 1);
            se.$d[K](ne), se.init(), this.$d = se.set(m, Math.min(this.$D, se.daysInMonth())).$d;
          } else K && this.$d[K](ne);
          return this.init(), this;
        }, x.set = function(j, G) {
          return this.clone().$set(j, G);
        }, x.get = function(j) {
          return this[S.p(j)]();
        }, x.add = function(j, G) {
          var z, W = this;
          j = Number(j);
          var Z = S.p(G), K = function(R) {
            var O = k(W);
            return S.w(O.date(O.date() + Math.round(R * j)), W);
          };
          if (Z === c) return this.set(c, this.$M + j);
          if (Z === f) return this.set(f, this.$y + j);
          if (Z === l) return K(1);
          if (Z === d) return K(7);
          var ne = (z = {}, z[i] = r, z[u] = o, z[t] = n, z)[Z] || 1, se = this.$d.getTime() + j * ne;
          return S.w(se, this);
        }, x.subtract = function(j, G) {
          return this.add(-1 * j, G);
        }, x.format = function(j) {
          var G = this, z = this.$locale();
          if (!this.isValid()) return z.invalidDate || h;
          var W = j || "YYYY-MM-DDTHH:mm:ssZ", Z = S.z(this), K = this.$H, ne = this.$m, se = this.$M, R = z.weekdays, O = z.months, U = z.meridiem, V = function(le, he, Ae, be) {
            return le && (le[he] || le(G, W)) || Ae[he].slice(0, be);
          }, oe = function(le) {
            return S.s(K % 12 || 12, le, "0");
          }, ce = U || function(le, he, Ae) {
            var be = le < 12 ? "AM" : "PM";
            return Ae ? be.toLowerCase() : be;
          };
          return W.replace(p, (function(le, he) {
            return he || (function(Ae) {
              switch (Ae) {
                case "YY":
                  return String(G.$y).slice(-2);
                case "YYYY":
                  return S.s(G.$y, 4, "0");
                case "M":
                  return se + 1;
                case "MM":
                  return S.s(se + 1, 2, "0");
                case "MMM":
                  return V(z.monthsShort, se, O, 3);
                case "MMMM":
                  return V(O, se);
                case "D":
                  return G.$D;
                case "DD":
                  return S.s(G.$D, 2, "0");
                case "d":
                  return String(G.$W);
                case "dd":
                  return V(z.weekdaysMin, G.$W, R, 2);
                case "ddd":
                  return V(z.weekdaysShort, G.$W, R, 3);
                case "dddd":
                  return R[G.$W];
                case "H":
                  return String(K);
                case "HH":
                  return S.s(K, 2, "0");
                case "h":
                  return oe(1);
                case "hh":
                  return oe(2);
                case "a":
                  return ce(K, ne, !0);
                case "A":
                  return ce(K, ne, !1);
                case "m":
                  return String(ne);
                case "mm":
                  return S.s(ne, 2, "0");
                case "s":
                  return String(G.$s);
                case "ss":
                  return S.s(G.$s, 2, "0");
                case "SSS":
                  return S.s(G.$ms, 3, "0");
                case "Z":
                  return Z;
              }
              return null;
            })(le) || Z.replace(":", "");
          }));
        }, x.utcOffset = function() {
          return 15 * -Math.round(this.$d.getTimezoneOffset() / 15);
        }, x.diff = function(j, G, z) {
          var W, Z = this, K = S.p(G), ne = k(j), se = (ne.utcOffset() - this.utcOffset()) * r, R = this - ne, O = function() {
            return S.m(Z, ne);
          };
          switch (K) {
            case f:
              W = O() / 12;
              break;
            case c:
              W = O();
              break;
            case _:
              W = O() / 3;
              break;
            case d:
              W = (R - se) / 6048e5;
              break;
            case l:
              W = (R - se) / 864e5;
              break;
            case u:
              W = R / o;
              break;
            case i:
              W = R / r;
              break;
            case t:
              W = R / n;
              break;
            default:
              W = R;
          }
          return z ? W : S.a(W);
        }, x.daysInMonth = function() {
          return this.endOf(c).$D;
        }, x.$locale = function() {
          return L[this.$L];
        }, x.locale = function(j, G) {
          if (!j) return this.$L;
          var z = this.clone(), W = T(j, G, !0);
          return W && (z.$L = W), z;
        }, x.clone = function() {
          return S.w(this.$d, this);
        }, x.toDate = function() {
          return new Date(this.valueOf());
        }, x.toJSON = function() {
          return this.isValid() ? this.toISOString() : null;
        }, x.toISOString = function() {
          return this.$d.toISOString();
        }, x.toString = function() {
          return this.$d.toUTCString();
        }, $;
      })(), B = F.prototype;
      return k.prototype = B, [["$ms", s], ["$s", t], ["$m", i], ["$H", u], ["$W", l], ["$M", c], ["$y", f], ["$D", m]].forEach((function($) {
        B[$[1]] = function(x) {
          return this.$g(x, $[0], $[1]);
        };
      })), k.extend = function($, x) {
        return $.$i || ($(x, F, k), $.$i = !0), k;
      }, k.locale = T, k.isDayjs = w, k.unix = function($) {
        return k(1e3 * $);
      }, k.en = L[Y], k.Ls = L, k.p = {}, k;
    }));
  })(tr)), tr.exports;
}
var Gg = P();
const Jg = /* @__PURE__ */ A(Gg), Zx = /* @__PURE__ */ q({
  __proto__: null,
  default: Jg
}, [Gg]), Lt = Jg ?? Zx, Qx = /* @__PURE__ */ Object.assign({
  "../../../../node_modules/dayjs/locale/af.js": () => Promise.resolve().then(() => n$),
  "../../../../node_modules/dayjs/locale/am.js": () => Promise.resolve().then(() => i$),
  "../../../../node_modules/dayjs/locale/ar-dz.js": () => Promise.resolve().then(() => c$),
  "../../../../node_modules/dayjs/locale/ar-iq.js": () => Promise.resolve().then(() => p$),
  "../../../../node_modules/dayjs/locale/ar-kw.js": () => Promise.resolve().then(() => g$),
  "../../../../node_modules/dayjs/locale/ar-ly.js": () => Promise.resolve().then(() => w$),
  "../../../../node_modules/dayjs/locale/ar-ma.js": () => Promise.resolve().then(() => S$),
  "../../../../node_modules/dayjs/locale/ar-sa.js": () => Promise.resolve().then(() => H$),
  "../../../../node_modules/dayjs/locale/ar-tn.js": () => Promise.resolve().then(() => q$),
  "../../../../node_modules/dayjs/locale/ar.js": () => Promise.resolve().then(() => I$),
  "../../../../node_modules/dayjs/locale/az.js": () => Promise.resolve().then(() => F$),
  "../../../../node_modules/dayjs/locale/be.js": () => Promise.resolve().then(() => U$),
  "../../../../node_modules/dayjs/locale/bg.js": () => Promise.resolve().then(() => X$),
  "../../../../node_modules/dayjs/locale/bi.js": () => Promise.resolve().then(() => tH),
  "../../../../node_modules/dayjs/locale/bm.js": () => Promise.resolve().then(() => oH),
  "../../../../node_modules/dayjs/locale/bn-bd.js": () => Promise.resolve().then(() => lH),
  "../../../../node_modules/dayjs/locale/bn.js": () => Promise.resolve().then(() => fH),
  "../../../../node_modules/dayjs/locale/bo.js": () => Promise.resolve().then(() => vH),
  "../../../../node_modules/dayjs/locale/br.js": () => Promise.resolve().then(() => bH),
  "../../../../node_modules/dayjs/locale/bs.js": () => Promise.resolve().then(() => LH),
  "../../../../node_modules/dayjs/locale/ca.js": () => Promise.resolve().then(() => TH),
  "../../../../node_modules/dayjs/locale/cs.js": () => Promise.resolve().then(() => EH),
  "../../../../node_modules/dayjs/locale/cv.js": () => Promise.resolve().then(() => RH),
  "../../../../node_modules/dayjs/locale/cy.js": () => Promise.resolve().then(() => OH),
  "../../../../node_modules/dayjs/locale/da.js": () => Promise.resolve().then(() => GH),
  "../../../../node_modules/dayjs/locale/de-at.js": () => Promise.resolve().then(() => VH),
  "../../../../node_modules/dayjs/locale/de-ch.js": () => Promise.resolve().then(() => QH),
  "../../../../node_modules/dayjs/locale/de.js": () => Promise.resolve().then(() => nj),
  "../../../../node_modules/dayjs/locale/dv.js": () => Promise.resolve().then(() => ij),
  "../../../../node_modules/dayjs/locale/el.js": () => Promise.resolve().then(() => cj),
  "../../../../node_modules/dayjs/locale/en-au.js": () => Promise.resolve().then(() => pj),
  "../../../../node_modules/dayjs/locale/en-ca.js": () => Promise.resolve().then(() => gj),
  "../../../../node_modules/dayjs/locale/en-gb.js": () => Promise.resolve().then(() => wj),
  "../../../../node_modules/dayjs/locale/en-ie.js": () => Promise.resolve().then(() => Sj),
  "../../../../node_modules/dayjs/locale/en-il.js": () => Promise.resolve().then(() => Hj),
  "../../../../node_modules/dayjs/locale/en-in.js": () => Promise.resolve().then(() => qj),
  "../../../../node_modules/dayjs/locale/en-nz.js": () => Promise.resolve().then(() => Ij),
  "../../../../node_modules/dayjs/locale/en-sg.js": () => Promise.resolve().then(() => Fj),
  "../../../../node_modules/dayjs/locale/en-tt.js": () => Promise.resolve().then(() => Uj),
  "../../../../node_modules/dayjs/locale/en.js": () => Promise.resolve().then(() => Xj),
  "../../../../node_modules/dayjs/locale/eo.js": () => Promise.resolve().then(() => tE),
  "../../../../node_modules/dayjs/locale/es-do.js": () => Promise.resolve().then(() => oE),
  "../../../../node_modules/dayjs/locale/es-mx.js": () => Promise.resolve().then(() => lE),
  "../../../../node_modules/dayjs/locale/es-pr.js": () => Promise.resolve().then(() => fE),
  "../../../../node_modules/dayjs/locale/es-us.js": () => Promise.resolve().then(() => vE),
  "../../../../node_modules/dayjs/locale/es.js": () => Promise.resolve().then(() => bE),
  "../../../../node_modules/dayjs/locale/et.js": () => Promise.resolve().then(() => LE),
  "../../../../node_modules/dayjs/locale/eu.js": () => Promise.resolve().then(() => TE),
  "../../../../node_modules/dayjs/locale/fa.js": () => Promise.resolve().then(() => EE),
  "../../../../node_modules/dayjs/locale/fi.js": () => Promise.resolve().then(() => RE),
  "../../../../node_modules/dayjs/locale/fo.js": () => Promise.resolve().then(() => OE),
  "../../../../node_modules/dayjs/locale/fr-ca.js": () => Promise.resolve().then(() => GE),
  "../../../../node_modules/dayjs/locale/fr-ch.js": () => Promise.resolve().then(() => VE),
  "../../../../node_modules/dayjs/locale/fr.js": () => Promise.resolve().then(() => QE),
  "../../../../node_modules/dayjs/locale/fy.js": () => Promise.resolve().then(() => n2),
  "../../../../node_modules/dayjs/locale/ga.js": () => Promise.resolve().then(() => i2),
  "../../../../node_modules/dayjs/locale/gd.js": () => Promise.resolve().then(() => c2),
  "../../../../node_modules/dayjs/locale/gl.js": () => Promise.resolve().then(() => p2),
  "../../../../node_modules/dayjs/locale/gom-latn.js": () => Promise.resolve().then(() => g2),
  "../../../../node_modules/dayjs/locale/gu.js": () => Promise.resolve().then(() => w2),
  "../../../../node_modules/dayjs/locale/he.js": () => Promise.resolve().then(() => S2),
  "../../../../node_modules/dayjs/locale/hi.js": () => Promise.resolve().then(() => H2),
  "../../../../node_modules/dayjs/locale/hr.js": () => Promise.resolve().then(() => q2),
  "../../../../node_modules/dayjs/locale/ht.js": () => Promise.resolve().then(() => I2),
  "../../../../node_modules/dayjs/locale/hu.js": () => Promise.resolve().then(() => F2),
  "../../../../node_modules/dayjs/locale/hy-am.js": () => Promise.resolve().then(() => U2),
  "../../../../node_modules/dayjs/locale/id.js": () => Promise.resolve().then(() => X2),
  "../../../../node_modules/dayjs/locale/is.js": () => Promise.resolve().then(() => tC),
  "../../../../node_modules/dayjs/locale/it-ch.js": () => Promise.resolve().then(() => oC),
  "../../../../node_modules/dayjs/locale/it.js": () => Promise.resolve().then(() => lC),
  "../../../../node_modules/dayjs/locale/ja.js": () => Promise.resolve().then(() => fC),
  "../../../../node_modules/dayjs/locale/jv.js": () => Promise.resolve().then(() => vC),
  "../../../../node_modules/dayjs/locale/ka.js": () => Promise.resolve().then(() => bC),
  "../../../../node_modules/dayjs/locale/kk.js": () => Promise.resolve().then(() => LC),
  "../../../../node_modules/dayjs/locale/km.js": () => Promise.resolve().then(() => TC),
  "../../../../node_modules/dayjs/locale/kn.js": () => Promise.resolve().then(() => EC),
  "../../../../node_modules/dayjs/locale/ko.js": () => Promise.resolve().then(() => RC),
  "../../../../node_modules/dayjs/locale/ku.js": () => Promise.resolve().then(() => OC),
  "../../../../node_modules/dayjs/locale/ky.js": () => Promise.resolve().then(() => GC),
  "../../../../node_modules/dayjs/locale/lb.js": () => Promise.resolve().then(() => VC),
  "../../../../node_modules/dayjs/locale/lo.js": () => Promise.resolve().then(() => QC),
  "../../../../node_modules/dayjs/locale/lt.js": () => Promise.resolve().then(() => nq),
  "../../../../node_modules/dayjs/locale/lv.js": () => Promise.resolve().then(() => iq),
  "../../../../node_modules/dayjs/locale/me.js": () => Promise.resolve().then(() => cq),
  "../../../../node_modules/dayjs/locale/mi.js": () => Promise.resolve().then(() => pq),
  "../../../../node_modules/dayjs/locale/mk.js": () => Promise.resolve().then(() => gq),
  "../../../../node_modules/dayjs/locale/ml.js": () => Promise.resolve().then(() => wq),
  "../../../../node_modules/dayjs/locale/mn.js": () => Promise.resolve().then(() => Sq),
  "../../../../node_modules/dayjs/locale/mr.js": () => Promise.resolve().then(() => Hq),
  "../../../../node_modules/dayjs/locale/ms-my.js": () => Promise.resolve().then(() => qq),
  "../../../../node_modules/dayjs/locale/ms.js": () => Promise.resolve().then(() => Iq),
  "../../../../node_modules/dayjs/locale/mt.js": () => Promise.resolve().then(() => Fq),
  "../../../../node_modules/dayjs/locale/my.js": () => Promise.resolve().then(() => Uq),
  "../../../../node_modules/dayjs/locale/nb.js": () => Promise.resolve().then(() => Xq),
  "../../../../node_modules/dayjs/locale/ne.js": () => Promise.resolve().then(() => tA),
  "../../../../node_modules/dayjs/locale/nl-be.js": () => Promise.resolve().then(() => oA),
  "../../../../node_modules/dayjs/locale/nl.js": () => Promise.resolve().then(() => lA),
  "../../../../node_modules/dayjs/locale/nn.js": () => Promise.resolve().then(() => fA),
  "../../../../node_modules/dayjs/locale/oc-lnc.js": () => Promise.resolve().then(() => vA),
  "../../../../node_modules/dayjs/locale/pa-in.js": () => Promise.resolve().then(() => bA),
  "../../../../node_modules/dayjs/locale/pl.js": () => Promise.resolve().then(() => LA),
  "../../../../node_modules/dayjs/locale/pt-br.js": () => Promise.resolve().then(() => TA),
  "../../../../node_modules/dayjs/locale/pt.js": () => Promise.resolve().then(() => EA),
  "../../../../node_modules/dayjs/locale/rn.js": () => Promise.resolve().then(() => RA),
  "../../../../node_modules/dayjs/locale/ro.js": () => Promise.resolve().then(() => OA),
  "../../../../node_modules/dayjs/locale/ru.js": () => Promise.resolve().then(() => GA),
  "../../../../node_modules/dayjs/locale/rw.js": () => Promise.resolve().then(() => VA),
  "../../../../node_modules/dayjs/locale/sd.js": () => Promise.resolve().then(() => QA),
  "../../../../node_modules/dayjs/locale/se.js": () => Promise.resolve().then(() => nR),
  "../../../../node_modules/dayjs/locale/si.js": () => Promise.resolve().then(() => iR),
  "../../../../node_modules/dayjs/locale/sk.js": () => Promise.resolve().then(() => cR),
  "../../../../node_modules/dayjs/locale/sl.js": () => Promise.resolve().then(() => pR),
  "../../../../node_modules/dayjs/locale/sq.js": () => Promise.resolve().then(() => gR),
  "../../../../node_modules/dayjs/locale/sr-cyrl.js": () => Promise.resolve().then(() => wR),
  "../../../../node_modules/dayjs/locale/sr.js": () => Promise.resolve().then(() => SR),
  "../../../../node_modules/dayjs/locale/ss.js": () => Promise.resolve().then(() => HR),
  "../../../../node_modules/dayjs/locale/sv-fi.js": () => Promise.resolve().then(() => qR),
  "../../../../node_modules/dayjs/locale/sv.js": () => Promise.resolve().then(() => IR),
  "../../../../node_modules/dayjs/locale/sw.js": () => Promise.resolve().then(() => FR),
  "../../../../node_modules/dayjs/locale/ta.js": () => Promise.resolve().then(() => UR),
  "../../../../node_modules/dayjs/locale/te.js": () => Promise.resolve().then(() => XR),
  "../../../../node_modules/dayjs/locale/tet.js": () => Promise.resolve().then(() => tP),
  "../../../../node_modules/dayjs/locale/tg.js": () => Promise.resolve().then(() => oP),
  "../../../../node_modules/dayjs/locale/th.js": () => Promise.resolve().then(() => lP),
  "../../../../node_modules/dayjs/locale/tk.js": () => Promise.resolve().then(() => fP),
  "../../../../node_modules/dayjs/locale/tl-ph.js": () => Promise.resolve().then(() => vP),
  "../../../../node_modules/dayjs/locale/tlh.js": () => Promise.resolve().then(() => bP),
  "../../../../node_modules/dayjs/locale/tr.js": () => Promise.resolve().then(() => LP),
  "../../../../node_modules/dayjs/locale/tzl.js": () => Promise.resolve().then(() => TP),
  "../../../../node_modules/dayjs/locale/tzm-latn.js": () => Promise.resolve().then(() => EP),
  "../../../../node_modules/dayjs/locale/tzm.js": () => Promise.resolve().then(() => RP),
  "../../../../node_modules/dayjs/locale/ug-cn.js": () => Promise.resolve().then(() => OP),
  "../../../../node_modules/dayjs/locale/uk.js": () => Promise.resolve().then(() => GP),
  "../../../../node_modules/dayjs/locale/ur.js": () => Promise.resolve().then(() => VP),
  "../../../../node_modules/dayjs/locale/uz-latn.js": () => Promise.resolve().then(() => QP),
  "../../../../node_modules/dayjs/locale/uz.js": () => Promise.resolve().then(() => nI),
  "../../../../node_modules/dayjs/locale/vi.js": () => Promise.resolve().then(() => iI),
  "../../../../node_modules/dayjs/locale/x-pseudo.js": () => Promise.resolve().then(() => cI),
  "../../../../node_modules/dayjs/locale/yo.js": () => Promise.resolve().then(() => pI),
  "../../../../node_modules/dayjs/locale/zh-cn.js": () => Promise.resolve().then(() => gI),
  "../../../../node_modules/dayjs/locale/zh-hk.js": () => Promise.resolve().then(() => wI),
  "../../../../node_modules/dayjs/locale/zh-tw.js": () => Promise.resolve().then(() => SI),
  "../../../../node_modules/dayjs/locale/zh.js": () => Promise.resolve().then(() => HI)
}), Lc = /* @__PURE__ */ new Set(["en"]), e1 = {
  "zh-cn": "zh-cn",
  "zh-tw": "zh-tw",
  "zh-hk": "zh-hk",
  "zh-mo": "zh-tw",
  en: "en",
  ja: "ja",
  ko: "ko",
  de: "de",
  fr: "fr",
  es: "es",
  pt: "pt",
  "pt-br": "pt-br",
  ru: "ru",
  ar: "ar",
  "ar-eg": "ar",
  tr: "tr",
  it: "it",
  nl: "nl",
  pl: "pl",
  th: "th",
  vi: "vi",
  id: "id",
  ms: "ms",
  da: "da",
  sv: "sv",
  fi: "fi",
  no: "nb",
  "nb-NO": "nb",
  cs: "cs",
  sk: "sk",
  uk: "uk",
  hu: "hu",
  ro: "ro",
  bg: "bg",
  az: "az",
  fa: "fa",
  hi: "hi",
  pa: "pa-in",
  el: "el",
  ca: "ca",
  tk: "tk",
  ta: "ta",
  lv: "lv",
  af: "af",
  et: "et",
  sl: "sl",
  he: "he",
  lo: "lo",
  lt: "lt",
  mn: "mn",
  kk: "kk",
  ku: "ku",
  ckb: "ku",
  "ug-cn": "ug-cn",
  km: "km",
  sr: "sr",
  eu: "eu",
  ky: "ky",
  "hy-am": "hy-am",
  hr: "hr",
  eo: "eo",
  bn: "bn",
  mg: "mg",
  sw: "sw",
  "uz-uz": "uz",
  my: "my",
  te: "te"
}, t1 = async (e) => {
  const a = `../../../../node_modules/dayjs/locale/${e}.js`, n = Qx[a];
  if (n)
    return await n(), !0;
  try {
    return await import(
      /* @vite-ignore */
      `dayjs/locale/${e}.js`
    ), !0;
  } catch {
    return !1;
  }
}, r1 = (e) => e1[e.toLowerCase()] || "en", n1 = async (e) => {
  const a = r1(e);
  if (Lc.has(a)) {
    Lt.locale(a);
    return;
  }
  if (a === "en") {
    Lt.locale("en");
    return;
  }
  try {
    if (!await t1(a)) {
      Lt.locale("en");
      return;
    }
    Lc.add(a), Lt.locale(a);
  } catch {
    Lt.locale("en");
  }
}, a1 = (e) => {
  const { globalLocale: a } = Kx(), n = J(() => De(e) ?? De(a) ?? wc), r = J(() => n.value.name);
  Le(
    r,
    (i) => {
      n1(i);
    },
    { immediate: !0 }
  );
  const o = (i) => {
    const u = i.split("."), l = [n.value.yh, wc.yh, Wx.yh];
    for (const d of l) {
      let c = d;
      for (const _ of u)
        if (c && typeof c == "object")
          c = c[_];
        else {
          c = void 0;
          break;
        }
      if (c !== void 0) return c;
    }
  };
  return {
    locale: n,
    lang: r,
    t: (i, u) => {
      const l = o(i);
      return typeof l != "string" ? i : u ? l.replace(/\{(\w+)\}/g, (d, c) => {
        const _ = u[c];
        return _ !== void 0 ? String(_) : `{${c}}`;
      }) : l;
    },
    tRaw: (i) => {
      const u = o(i);
      return u === void 0 ? i : u;
    }
  };
}, o1 = ["title"], s1 = ["title"], i1 = {
  key: 2,
  class: "yh-flow-controls__divider"
}, u1 = ["title"], l1 = ["title"], d1 = {
  key: 0,
  viewBox: "0 0 24 24",
  width: "16",
  height: "16"
}, c1 = {
  key: 1,
  viewBox: "0 0 24 24",
  width: "16",
  height: "16"
}, _1 = /* @__PURE__ */ ie({
  __name: "Controls",
  props: {
    position: { default: "bottom-right" },
    showZoom: { type: Boolean, default: !0 },
    showFitView: { type: Boolean, default: !0 },
    showInteractive: { type: Boolean, default: !0 }
  },
  setup(e) {
    const { t: a } = a1(), n = Rt(), r = J(() => {
      var u;
      return ((u = n.isLocked) == null ? void 0 : u.value) || !1;
    }), o = () => n.zoomIn(), s = () => n.zoomOut(), t = () => n.fitView(), i = () => {
      n.setInteractive && n.setInteractive(r.value);
    };
    return (u, l) => (H(), E(
      "div",
      {
        class: te(["yh-flow-controls", [e.position]])
      },
      [
        e.showZoom ? (H(), E("button", {
          key: 0,
          class: "yh-flow-controls__btn",
          title: De(a)("flow.zoomIn"),
          onClick: o
        }, [...l[0] || (l[0] = [
          b(
            "svg",
            {
              viewBox: "0 0 24 24",
              width: "16",
              height: "16"
            },
            [
              b("path", {
                fill: "currentColor",
                d: "M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"
              })
            ],
            -1
            /* CACHED */
          )
        ])], 8, o1)) : I("v-if", !0),
        e.showZoom ? (H(), E("button", {
          key: 1,
          class: "yh-flow-controls__btn",
          title: De(a)("flow.zoomOut"),
          onClick: s
        }, [...l[1] || (l[1] = [
          b(
            "svg",
            {
              viewBox: "0 0 24 24",
              width: "16",
              height: "16"
            },
            [
              b("path", {
                fill: "currentColor",
                d: "M19 13H5v-2h14v2z"
              })
            ],
            -1
            /* CACHED */
          )
        ])], 8, s1)) : I("v-if", !0),
        e.showZoom && e.showFitView ? (H(), E("div", i1)) : I("v-if", !0),
        e.showFitView ? (H(), E("button", {
          key: 3,
          class: "yh-flow-controls__btn",
          title: De(a)("flow.fitView"),
          onClick: t
        }, [...l[2] || (l[2] = [
          b(
            "svg",
            {
              viewBox: "0 0 24 24",
              width: "16",
              height: "16"
            },
            [
              b("path", {
                fill: "currentColor",
                d: "M15 3l2.3 2.3-2.89 2.87 1.42 1.42L18.7 6.7 21 9V3h-6zM3 9l2.3-2.3 2.87 2.89 1.42-1.42L6.7 5.3 9 3H3v6zm6 12l-2.3-2.3 2.89-2.87-1.42-1.42L5.3 17.3 3 15v6zm12-6l-2.3 2.3-2.87-2.89-1.42 1.42 2.89 2.87L15 21h6v-6z"
              })
            ],
            -1
            /* CACHED */
          )
        ])], 8, u1)) : I("v-if", !0),
        e.showInteractive ? (H(), E("button", {
          key: 4,
          class: te(["yh-flow-controls__btn", { "is-active": r.value }]),
          title: De(a)("flow.lock"),
          onClick: i
        }, [
          r.value ? (H(), E("svg", d1, [...l[3] || (l[3] = [
            b(
              "path",
              {
                fill: "currentColor",
                d: "M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z"
              },
              null,
              -1
              /* CACHED */
            )
          ])])) : (H(), E("svg", c1, [...l[4] || (l[4] = [
            b(
              "path",
              {
                fill: "currentColor",
                d: "M12 17c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm6-9h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6h1.9c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm0 12H6V10h12v10z"
              },
              null,
              -1
              /* CACHED */
            )
          ])]))
        ], 10, l1)) : I("v-if", !0)
      ],
      2
      /* CLASS */
    ));
  }
}), f1 = /* @__PURE__ */ ue(_1, [["__scopeId", "data-v-0b42efde"]]), m1 = {
  enabled: !0,
  position: "bottom-left",
  showZoom: !0,
  showFitView: !0,
  showInteractive: !0
};
function Oa(e = {}) {
  const a = { ...m1, ...e };
  return {
    id: "controls",
    name: "Controls",
    version: "1.0.0",
    description: "Displays a set of controls for zooming and fitting the view",
    component: Va(f1),
    componentProps: {
      position: a.position,
      showZoom: a.showZoom,
      showFitView: a.showFitView,
      showInteractive: a.showInteractive
    },
    install(n) {
      console.log("[Controls Plugin] Installed");
    }
  };
}
const p1 = ["width", "height"], h1 = /* @__PURE__ */ ie({
  __name: "Background",
  props: {
    type: {},
    color: {},
    gap: {}
  },
  setup(e) {
    const a = e, n = ee(), r = ee(2e3), o = ee(2e3), s = Rt(), t = s.viewport, i = J(() => ({
      backgroundColor: "var(--flow-background-color, #f8f9fa)"
    })), u = () => {
      const l = n.value;
      if (!l) return;
      const d = l.getContext("2d");
      if (!d) return;
      const _ = getComputedStyle(l).getPropertyValue("--flow-grid-color").trim(), f = a.type || "dots", m = a.color || _ || (f === "dots" ? "#b1b1b7" : "#e5e7eb"), h = a.gap || 20, y = t.value.zoom, p = { x: t.value.x, y: t.value.y }, v = s.$el;
      if (v) {
        const w = v.clientWidth || 2e3, T = v.clientHeight || 2e3;
        (l.width !== w || l.height !== T) && (l.width = w, l.height = T, r.value = w, o.value = T);
      }
      const g = l.width, M = l.height;
      d.clearRect(0, 0, g, M);
      const Y = h * y, L = p.x % Y, D = p.y % Y;
      if (f === "dots") {
        d.fillStyle = m;
        for (let w = L; w < g; w += Y)
          for (let T = D; T < M; T += Y)
            d.beginPath(), d.arc(w, T, 0.7 * y, 0, Math.PI * 2), d.fill();
      } else if (f === "grid") {
        d.strokeStyle = m, d.lineWidth = 0.5;
        for (let w = L; w < g; w += Y)
          d.beginPath(), d.moveTo(w, 0), d.lineTo(w, M), d.stroke();
        for (let w = D; w < M; w += Y)
          d.beginPath(), d.moveTo(0, w), d.lineTo(g, w), d.stroke();
      }
    };
    return Ct(u), Le([t, () => a.type, () => a.color, () => a.gap], u, {
      deep: !0
    }), (l, d) => (H(), E(
      "div",
      {
        class: "yh-flow-background",
        style: re(i.value)
      },
      [
        b("canvas", {
          ref_key: "canvasRef",
          ref: n,
          width: r.value,
          height: o.value
        }, null, 8, p1)
      ],
      4
      /* STYLE */
    ));
  }
}), v1 = /* @__PURE__ */ ue(h1, [["__scopeId", "data-v-f22cccfe"]]), y1 = {
  enabled: !0,
  type: "dots",
  color: "#e5e5e5",
  gap: 20
};
function za(e = {}) {
  const a = { ...y1, ...e };
  return {
    id: "grid",
    name: "Grid",
    version: "1.0.0",
    description: "Displays a grid or dots background",
    component: Va(v1),
    componentProps: {
      type: a.type,
      color: a.color,
      gap: a.gap
    },
    install(n) {
      console.log("[Grid Plugin] Installed");
    }
  };
}
const g1 = {
  key: 0,
  class: "yh-flow-alignment-lines"
}, M1 = ["y1", "x2", "y2"], b1 = ["x1", "x2", "y2"], Y1 = /* @__PURE__ */ ie({
  __name: "AlignmentLines",
  props: {
    snapThreshold: {}
  },
  setup(e) {
    const a = e, n = Rt(), r = n.nodes, o = n.draggingNodeId, s = n.draggingPosition, t = J(() => {
      var c;
      return ((c = n.$el) == null ? void 0 : c.clientWidth) || 800;
    }), i = J(() => {
      var c;
      return ((c = n.$el) == null ? void 0 : c.clientHeight) || 600;
    }), u = a.snapThreshold ?? 10, l = J(() => {
      const c = o.value, _ = s.value;
      if (!c || !_) return [];
      const f = [], m = r.value.find((v) => v.id === c);
      if (!m) return [];
      const h = m.height || 50, y = r.value.filter((v) => v.id !== c && !v.hidden), p = [
        { y: m.position.y, key: "top" },
        { y: m.position.y + h / 2, key: "center" },
        { y: m.position.y + h, key: "bottom" }
      ];
      for (const v of p)
        for (const g of y) {
          const M = g.height || 50, Y = [
            { y: g.position.y, key: "top" },
            { y: g.position.y + M / 2, key: "center" },
            { y: g.position.y + M, key: "bottom" }
          ];
          for (const L of Y)
            if (Math.abs(v.y - L.y) < u) {
              f.push({ y: L.y, active: !0 });
              break;
            }
        }
      return f;
    }), d = J(() => {
      const c = o.value, _ = s.value;
      if (!c || !_) return [];
      const f = [], m = r.value.find((v) => v.id === c);
      if (!m) return [];
      const h = m.width || 200, y = r.value.filter((v) => v.id !== c && !v.hidden), p = [
        { x: m.position.x, key: "left" },
        { x: m.position.x + h / 2, key: "center" },
        { x: m.position.x + h, key: "right" }
      ];
      for (const v of p)
        for (const g of y) {
          const M = g.width || 200, Y = [
            { x: g.position.x, key: "left" },
            { x: g.position.x + M / 2, key: "center" },
            { x: g.position.x + M, key: "right" }
          ];
          for (const L of Y)
            if (Math.abs(v.x - L.x) < u) {
              f.push({ x: L.x, active: !0 });
              break;
            }
        }
      return f;
    });
    return (c, _) => De(o) && De(s) ? (H(), E("svg", g1, [
      I(" Horizontal alignment lines "),
      (H(!0), E(
        pe,
        null,
        ke(l.value, (f, m) => (H(), E("line", {
          key: `h-${m}`,
          x1: 0,
          y1: f.y,
          x2: t.value,
          y2: f.y,
          class: te(["alignment-line horizontal", { active: f.active }])
        }, null, 10, M1))),
        128
        /* KEYED_FRAGMENT */
      )),
      I(" Vertical alignment lines "),
      (H(!0), E(
        pe,
        null,
        ke(d.value, (f, m) => (H(), E("line", {
          key: `v-${m}`,
          x1: f.x,
          y1: 0,
          x2: f.x,
          y2: i.value,
          class: te(["alignment-line vertical", { active: f.active }])
        }, null, 10, b1))),
        128
        /* KEYED_FRAGMENT */
      ))
    ])) : I("v-if", !0);
  }
}), w1 = /* @__PURE__ */ ue(Y1, [["__scopeId", "data-v-8f2975ee"]]), x1 = {
  enabled: !0,
  snapToGrid: !0,
  gridSize: 15,
  snapThreshold: 10,
  showAlignmentLines: !0
};
function Fa(e = {}) {
  const a = { ...x1, ...e };
  return {
    id: "snap",
    name: "Snap",
    version: "1.0.0",
    description: "Enables grid snapping and alignment lines",
    component: a.showAlignmentLines ? Va(w1) : void 0,
    componentProps: {
      snapThreshold: a.snapThreshold
    },
    install(n) {
      a.enabled && console.log("[Snap Plugin] Installed with options:", a, n);
    }
  };
}
const L1 = {
  enabled: !0,
  delete: !0,
  backspace: !0,
  ctrlZ: !0,
  ctrlY: !0,
  escape: !0
};
function Ug(e = {}) {
  const a = { ...L1, ...e };
  return {
    id: "keyboard",
    name: "Keyboard",
    install(n) {
      console.log("Keyboard plugin installed", a);
    }
  };
}
const k1 = {
  enabled: !0,
  fileName: "flow-chart",
  exportImage: !0,
  exportJson: !0,
  imageType: "png",
  imageQuality: 1,
  pixelRatio: 2,
  backgroundColor: "#ffffff"
};
function S1(e, a) {
  return a == null ? {} : a instanceof HTMLElement ? { container: a } : { ...a };
}
function D1(e, a) {
  return {
    imageType: a.imageType ?? e.imageType,
    imageQuality: a.imageQuality ?? e.imageQuality,
    pixelRatio: a.pixelRatio ?? e.pixelRatio,
    backgroundColor: a.backgroundColor ?? e.backgroundColor
  };
}
function Ba(e = {}) {
  const a = { ...k1, ...e };
  return {
    id: "export",
    name: "Export",
    version: "1.0.0",
    description: "Provides methods to export the flow chart as JSON or Image",
    install(n) {
      a.enabled && (a.exportJson && (n.exportJson = () => JSON.stringify(
        {
          nodes: n.nodes.value,
          edges: n.edges.value,
          viewport: n.viewport.value
        },
        null,
        2
      )), a.exportImage && (n.exportImage = async (r) => {
        var _;
        const o = S1(a, r), s = o.container ?? n.$el;
        if (!s)
          throw new Error("[Export Plugin] No element found for export");
        const t = o.mode ?? "viewport", i = o.download !== !1, u = o.copyToClipboard === !0, l = o.fileName ?? a.fileName, d = o.fullModePadding ?? 20;
        let c = null;
        try {
          t === "full" && (c = { ...n.getViewport() }, (_ = n.fitView) == null || _.call(n, { padding: d }), await Bw());
          const f = D1(a, o), m = await Dx(s, f);
          return i && Tx(m.dataUrl, l, m.extension), u && await $x(m.blob), m;
        } finally {
          c && n.setViewport(c);
        }
      }));
    }
  };
}
const T1 = {
  enabled: !0,
  type: "dagre",
  direction: "TB",
  nodeSpacing: 50,
  rankSpacing: 80,
  animate: !0,
  elkOptions: {},
  forceOptions: {},
  gridOptions: { columns: 4 },
  useWebWorker: !1,
  workerUrl: ""
};
async function $1(e, a, n) {
  const r = await Promise.resolve().then(() => W3), o = r.default || r, s = r.graphlib || o.graphlib, t = new s.Graph();
  return t.setGraph({
    rankdir: n.direction,
    nodesep: n.nodeSpacing,
    ranksep: n.rankSpacing,
    marginx: 0,
    marginy: 0
  }), t.setDefaultEdgeLabel(() => ({})), e.forEach((u) => {
    t.setNode(u.id, {
      width: u.width || 150,
      height: u.height || 50
    });
  }), a.forEach((u) => {
    t.setEdge(u.source, u.target);
  }), o.layout(t), { nodes: e.map((u) => {
    const l = t.node(u.id);
    return l ? {
      ...u,
      position: {
        x: l.x - (u.width || 150) / 2,
        y: l.y - (u.height || 50) / 2
      }
    } : u;
  }), edges: a };
}
async function H1(e, a, n) {
  const r = "elkjs/lib/elk.bundled.js", o = "elkjs";
  let s;
  try {
    s = await import(
      /* @vite-ignore */
      r
    );
  } catch {
    s = await import(
      /* @vite-ignore */
      o
    );
  }
  const t = s.default || s, i = new t(), u = {
    TB: "DOWN",
    BT: "UP",
    LR: "RIGHT",
    RL: "LEFT"
  }, l = n.elkOptions || {}, d = {
    id: "root",
    layoutOptions: {
      "elk.algorithm": l.algorithm || "layered",
      "elk.direction": l.direction || u[n.direction] || "DOWN",
      "elk.spacing.nodeNode": l.spacing || n.nodeSpacing,
      "elk.edgeRouting": l.edgeRouting || "POLYLINE"
    },
    children: e.map((f) => ({
      id: f.id,
      width: f.width || 150,
      height: f.height || 50
    })),
    edges: a.map((f, m) => ({
      id: f.id || `edge-${m}`,
      sources: [f.source],
      targets: [f.target]
    }))
  }, c = await i.layout(d);
  return { nodes: e.map((f) => {
    var h;
    const m = (h = c.children) == null ? void 0 : h.find((y) => y.id === f.id);
    return m ? {
      ...f,
      position: {
        x: m.x || 0,
        y: m.y || 0
      }
    } : f;
  }), edges: a };
}
async function j1(e, a, n, r) {
  const s = await import("d3-force"), t = s.default || s, i = e.map((h) => ({
    id: h.id,
    x: h.position.x,
    y: h.position.y
  })), u = t.forceSimulation(i), l = n.forceOptions || {};
  u.force("charge", t.forceManyBody().strength(l.strength || -300));
  const d = t.forceLink();
  d.id((h) => h.id), d.distance(l.distance || 100), u.force("link", d), u.force("collision", t.forceCollide().radius(50)), u.force("center", t.forceCenter(400, 300));
  const f = l.iterations || 300, m = Math.max(1, Math.floor(f / 10));
  return new Promise((h) => {
    let y = 0;
    const p = () => {
      const v = Math.min(m, f - y);
      for (let D = 0; D < v; D++)
        u.tick();
      y += v;
      let g = 1 / 0, M = 1 / 0;
      i.forEach((D) => {
        D.x < g && (g = D.x), D.y < M && (M = D.y);
      });
      const Y = g < 0 ? -g + 50 : 50, L = M < 0 ? -M + 50 : 50;
      if (n.animate && r && i.forEach((D) => {
        r.updateNode(D.id, {
          position: { x: D.x + Y, y: D.y + L }
        });
      }), y < f && u.alpha() > 5e-3)
        typeof window < "u" && window.requestAnimationFrame ? window.requestAnimationFrame(p) : setTimeout(p, 0);
      else {
        u.stop();
        const D = e.map((w) => {
          const T = i.find((k) => k.id === w.id);
          return T ? {
            ...w,
            position: { x: T.x + Y, y: T.y + L }
          } : w;
        });
        h({ nodes: D, edges: a });
      }
    };
    p();
  });
}
function E1(e, a, n) {
  var d, c;
  const r = n.gridOptions || {}, o = r.columns || 4, s = r.startX || 50, t = r.startY || 50, i = n.nodeSpacing + (((d = e[0]) == null ? void 0 : d.width) || 150), u = n.rankSpacing + (((c = e[0]) == null ? void 0 : c.height) || 50);
  return { nodes: e.map((_, f) => {
    const m = f % o, h = Math.floor(f / o);
    return {
      ..._,
      position: {
        x: s + m * i,
        y: t + h * u
      }
    };
  }), edges: a };
}
function Ga(e = {}) {
  const a = { ...T1, ...e };
  return {
    id: "layout",
    name: "Layout",
    version: "1.0.0",
    description: "Provides automatic layout algorithms for flow charts (dagre, elk, force)",
    install(n) {
      a.enabled && (n.applyLayout = async (r) => {
        const o = { ...a, ...r }, s = [...n.nodes.value], t = [...n.edges.value];
        try {
          let i;
          if (o.type === "dagre")
            i = await $1(s, t, o), console.log("[Layout Plugin] Dagre layout applied successfully");
          else if (o.type === "elk")
            i = await H1(s, t, o), console.log("[Layout Plugin] ELK layout applied successfully");
          else if (o.type === "force")
            i = await j1(s, t, o, n), console.log("[Layout Plugin] Force layout applied asynchronously");
          else if (o.type === "grid")
            i = E1(s, t, o), console.log("[Layout Plugin] Grid layout applied successfully");
          else {
            console.warn(`[Layout Plugin] Unknown layout type '${o.type}'`);
            return;
          }
          i.nodes.forEach((u) => {
            n.updateNode(u.id, {
              position: {
                x: u.position.x,
                y: u.position.y
              }
            });
          }), o.animate && setTimeout(() => {
            var u;
            (u = n.fitView) == null || u.call(n, { padding: 50 });
          }, 100);
        } catch (i) {
          console.error("[Layout Plugin] Layout calculation failed:", i);
        }
      });
    }
  };
}
const C1 = {
  enabled: !0,
  groupNodeType: "group",
  paddingX: 40,
  paddingY: 50,
  groupIdPrefix: "group",
  collapseMode: "hide"
};
function q1(e, a, n) {
  if (e.length === 0) return { x: 0, y: 0, width: 200, height: 150 };
  let r = 1 / 0, o = 1 / 0, s = -1 / 0, t = -1 / 0;
  return e.forEach((i) => {
    const u = i.width || 150, l = i.height || 50;
    r = Math.min(r, i.position.x), o = Math.min(o, i.position.y), s = Math.max(s, i.position.x + u), t = Math.max(t, i.position.y + l);
  }), {
    x: r - a,
    y: o - n,
    width: s - r + a * 2,
    height: t - o + n * 2
  };
}
function A1(e, a) {
  let n = 1;
  for (; a.includes(`${e}-${n}`); ) n++;
  return `${e}-${n}`;
}
function Wg(e = {}) {
  const a = { ...C1, ...e }, n = /* @__PURE__ */ new Map();
  return {
    id: "node-group",
    name: "NodeGroup",
    version: "1.0.0",
    description: "Enable node grouping, sub-flow nesting and collapse/expand features",
    install(r) {
      a.enabled && (r.groupSelectedNodes = (o = "Group") => {
        const s = r.nodes.value.filter(
          (c) => c.selected && c.type !== a.groupNodeType
        );
        if (s.length < 2)
          return console.warn("[NodeGroup] Please select at least 2 nodes to group"), null;
        const t = r.nodes.value.map((c) => c.id), i = A1(a.groupIdPrefix, t), u = q1(s, a.paddingX, a.paddingY), l = {};
        s.forEach((c) => {
          l[c.id] = { x: c.position.x, y: c.position.y };
        });
        const d = {
          id: i,
          type: a.groupNodeType,
          position: { x: u.x, y: u.y },
          data: {
            label: o,
            style: { backgroundColor: "rgba(241, 245, 249, 0.8)" }
          },
          style: {
            width: u.width,
            height: u.height,
            minWidth: u.width,
            minHeight: u.height
          },
          width: u.width,
          height: u.height,
          selectable: !0,
          draggable: !0,
          zIndex: -1
        };
        return r.addNode(d), s.forEach((c) => {
          r.updateNode(c.id, {
            parentId: i,
            extent: "parent",
            position: {
              x: c.position.x - u.x,
              y: c.position.y - u.y
            },
            selected: !1
          });
        }), n.set(i, {
          groupId: i,
          childIds: s.map((c) => c.id),
          collapsed: !1,
          originalPositions: l
        }), console.log(`[NodeGroup] Created group "${i}" with ${s.length} nodes`), i;
      }, r.ungroupNodes = (o) => {
        const s = r.getNode(o);
        if (!s) {
          console.warn(`[NodeGroup] Group "${o}" not found`);
          return;
        }
        const t = n.get(o), i = s.position;
        r.nodes.value.filter((l) => l.parentId === o).forEach((l) => {
          const d = (t == null ? void 0 : t.originalPositions[l.id]) ?? {
            x: i.x + l.position.x,
            y: i.y + l.position.y
          };
          r.updateNode(l.id, {
            parentId: void 0,
            extent: void 0,
            position: d
          });
        }), r.removeNode(o), n.delete(o), console.log(`[NodeGroup] Ungrouped "${o}"`);
      }, r.toggleGroupCollapse = (o) => {
        const s = n.get(o);
        if (!s) {
          console.warn(`[NodeGroup] Group "${o}" not found in registry`);
          return;
        }
        s.collapsed = !s.collapsed;
        const t = s.collapsed;
        if (s.childIds.forEach((i) => {
          r.updateNode(i, { hidden: t });
        }), r.edges.value.forEach((i) => {
          const u = s.childIds.includes(i.source), l = s.childIds.includes(i.target);
          (u || l) && r.updateEdge(i.id, { hidden: t });
        }), t)
          r.updateNode(o, {
            style: { width: 160, height: 50, minWidth: 160, minHeight: 50 },
            width: 160,
            height: 50
          });
        else {
          const i = r.getNode(o);
          if (i) {
            const u = i.data._origWidth, l = i.data._origHeight;
            r.updateNode(o, {
              style: {
                width: u || 200,
                height: l || 150,
                minWidth: u || 200,
                minHeight: l || 150
              },
              width: u || 200,
              height: l || 150
            });
          }
        }
        console.log(`[NodeGroup] Group "${o}" ${t ? "collapsed" : "expanded"}`);
      }, r.isGroupCollapsed = (o) => {
        var s;
        return ((s = n.get(o)) == null ? void 0 : s.collapsed) ?? !1;
      }, r.getGroupChildren = (o) => r.nodes.value.filter((s) => s.parentId === o), r.getGroupRegistry = () => n);
    },
    destroy() {
      n.clear();
    }
  };
}
const R1 = {
  enabled: !0,
  maxHistory: 100,
  enableKeyboard: !0,
  onHistoryChange: () => {
  },
  autoCapture: !1
};
function tt(e) {
  return JSON.parse(JSON.stringify(e));
}
function Vg(e = {}) {
  const a = { ...R1, ...e }, n = ee([]), r = ee(-1), o = J(() => r.value > 0), s = J(() => r.value < n.value.length - 1), t = J(() => n.value.length);
  let i = null, u = null;
  const l = () => {
    a.onHistoryChange(o.value, s.value, n.value.length);
  }, d = (p) => {
    if (!i) return;
    const v = n.value.slice(0, r.value + 1);
    v.push({
      nodes: tt(i.nodes.value),
      edges: tt(i.edges.value),
      timestamp: Date.now(),
      description: p
    }), v.length > a.maxHistory && v.shift(), n.value = v, r.value = v.length - 1, l();
  }, c = () => {
    if (!i || !o.value) return;
    r.value--;
    const p = n.value[r.value];
    p && (i.nodes.value = tt(p.nodes), i.edges.value = tt(p.edges)), l();
  }, _ = () => {
    if (!i || !s.value) return;
    r.value++;
    const p = n.value[r.value];
    p && (i.nodes.value = tt(p.nodes), i.edges.value = tt(p.edges)), l();
  }, f = () => {
    n.value = [], r.value = -1, l();
  }, m = () => n.value, h = (p) => {
    if (!i || p < 0 || p >= n.value.length) return;
    r.value = p;
    const v = n.value[p];
    v && (i.nodes.value = tt(v.nodes), i.edges.value = tt(v.edges)), l();
  };
  return {
    id: "history",
    name: "History",
    version: "1.0.0",
    description: "Provides undo/redo history for flow graph with keyboard shortcut support",
    // 将响应式状态和方法挂到插件上，方便外部访问
    canUndo: o,
    canRedo: s,
    historyLength: t,
    saveSnapshot: d,
    undo: c,
    redo: _,
    clearHistory: f,
    getHistory: m,
    jumpToStep: h,
    install(p) {
      a.enabled && (i = p, p.undo = c, p.redo = _, p.saveSnapshot = d, p.canUndo = o, p.canRedo = s, p.historyLength = t, p.clearHistory = f, p.getHistory = m, p.jumpToStep = h, d("initial"), a.enableKeyboard && (u = (v) => {
        (v.ctrlKey || v.metaKey) && (v.key === "z" && !v.shiftKey ? (v.preventDefault(), c()) : (v.key === "y" || v.key === "z" && v.shiftKey) && (v.preventDefault(), _()));
      }, window.addEventListener("keydown", u)), console.log("[History Plugin] Installed — Ctrl+Z to undo, Ctrl+Y to redo"));
    },
    destroy() {
      u && (window.removeEventListener("keydown", u), u = null), i = null, n.value = [], r.value = -1;
    }
  };
}
class P1 {
  constructor() {
    ye(this, "plugins", /* @__PURE__ */ new Map());
    ye(this, "flowInstance", null);
  }
  /**
   * 初始化插件管理器
   */
  init(a) {
    this.flowInstance = a;
  }
  /**
   * 注册插件
   */
  register(a, n) {
    if (this.plugins.has(a.id)) {
      console.warn(`[YhFlow] Plugin ${a.id} is already registered, skipping...`);
      return;
    }
    const r = this.flowInstance || n;
    if (!r) {
      console.error(
        "[YhFlow] PluginManager not initialized, call init() first or provide flow instance"
      );
      return;
    }
    a.install(r, n), this.plugins.set(a.id, a), console.log(`[YhFlow] Plugin ${a.name} (${a.id}) registered`);
  }
  /**
   * 卸载插件
   */
  unregister(a) {
    const n = this.plugins.get(a);
    if (!n) {
      console.warn(`[YhFlow] Plugin ${a} not found`);
      return;
    }
    n.destroy && n.destroy(), this.plugins.delete(a), console.log(`[YhFlow] Plugin ${n.name} (${a}) unregistered`);
  }
  /**
   * 获取已注册的插件
   */
  getPlugin(a) {
    return this.plugins.get(a);
  }
  /**
   * 获取所有插件
   */
  getPlugins() {
    return Array.from(this.plugins.values());
  }
  /**
   * 检查插件是否已注册
   */
  hasPlugin(a) {
    return this.plugins.has(a);
  }
  /**
   * 销毁所有插件
   */
  destroyAll() {
    this.plugins.forEach((a) => {
      a.destroy && a.destroy();
    }), this.plugins.clear();
  }
}
function Xz(e, a) {
  return {
    id: e.id,
    name: e.name,
    version: e.version,
    description: e.description,
    enabled: e.enabled ?? !0,
    install: (n) => {
      e.enabled !== !1 && a(n, e);
    }
  };
}
function Zz(e, a) {
  const n = e.install;
  return {
    ...e,
    install: (r, o) => {
      var s;
      n(r, o), (s = a.onInit) == null || s.call(a), a.onViewportChange && r.on("viewport:change", (t) => {
        var i;
        return (i = a.onViewportChange) == null ? void 0 : i.call(a, t.transform);
      }), a.onNodesChange && r.on("node:selected", () => {
        var t;
        return (t = a.onNodesChange) == null ? void 0 : t.call(a, r.nodes.value);
      }), a.onEdgesChange && r.on("edge:selected", () => {
        var t;
        return (t = a.onEdgesChange) == null ? void 0 : t.call(a, r.edges.value);
      });
    },
    destroy: () => {
      var r, o;
      (r = a.onDestroy) == null || r.call(a), (o = e.destroy) == null || o.call(e);
    }
  };
}
const Qz = {
  minimap: Na,
  controls: Oa,
  grid: za,
  snap: Fa,
  keyboard: Ug,
  export: Ba,
  layout: Ga,
  history: Vg,
  nodeGroup: Wg
};
function eF(e) {
  return [
    Na(e == null ? void 0 : e.minimap),
    Oa(e == null ? void 0 : e.controls),
    za(e == null ? void 0 : e.grid),
    Fa(e == null ? void 0 : e.snap),
    Ug(e == null ? void 0 : e.keyboard),
    Ba(e == null ? void 0 : e.export),
    Ga(e == null ? void 0 : e.layout),
    Vg(e == null ? void 0 : e.history),
    Wg(e == null ? void 0 : e.nodeGroup)
  ].filter(Boolean);
}
const tF = {
  /**
   * @description 节点数据
   */
  nodes: {
    type: Array,
    default: () => []
  },
  /**
   * @description 连线数据
   */
  edges: {
    type: Array,
    default: () => []
  },
  /**
   * @description 视口变换 (支持 v-model)
   */
  modelValue: {
    type: Object,
    default: () => ({ x: 0, y: 0, zoom: 1 })
  },
  /**
   * @description 最小缩放比例
   */
  minZoom: {
    type: Number,
    default: 0.1
  },
  /**
   * @description 最大缩放比例
   */
  maxZoom: {
    type: Number,
    default: 5
  },
  /**
   * @description 缩放步长
   */
  zoomStep: {
    type: Number,
    default: 0.1
  },
  /**
   * @description 平移速度
   */
  panZoomSpeed: {
    type: Number,
    default: 1
  },
  /**
   * @description 默认节点类型
   */
  defaultNodeType: {
    type: String,
    default: "default"
  },
  /**
   * @description 默认连线类型
   */
  defaultEdgeType: {
    type: String,
    default: "bezier"
  },
  /**
   * @description 是否启用拖拽
   */
  nodesDraggable: {
    type: Boolean,
    default: !0
  },
  /**
   * @description 是否启用连线
   */
  edgesConnectable: {
    type: Boolean,
    default: !0
  },
  /**
   * @description 是否启用选择
   */
  selectable: {
    type: Boolean,
    default: !0
  },
  /**
   * @description 是否支持多选
   */
  multiSelectKey: {
    type: String,
    default: "Shift"
  },
  /**
   * @description 背景类型
   */
  background: {
    type: String,
    default: "dots"
  },
  /**
   * @description 背景颜色
   */
  backgroundColor: {
    type: String,
    default: "#f8f9fa"
  },
  /**
   * @description 网格大小
   */
  gridSize: {
    type: Number,
    default: 20
  },
  /**
   * @description 是否吸附到网格
   */
  snapToGrid: {
    type: Boolean,
    default: !1
  },
  /**
   * @description 吸附间距
   */
  snapGrid: {
    type: Array,
    default: () => [15, 15]
  },
  /**
   * @description 是否只读
   */
  readonly: {
    type: Boolean,
    default: !1
  },
  /**
   * @description 是否启用键盘快捷键
   */
  keyboardShortcuts: {
    type: Boolean,
    default: !0
  },
  /**
   * @description 是否显示控制栏
   */
  showControls: {
    type: Boolean,
    default: !0
  },
  /**
   * @description 是否显示小地图
   */
  showMinimap: {
    type: Boolean,
    default: !1
  },
  /**
   * @description 小地图颜色
   */
  minimapNodeColor: {
    type: String,
    default: "#b1b1b7"
  },
  /**
   * @description 是否显示对齐线
   */
  showAlignmentGuides: {
    type: Boolean,
    default: !0
  },
  /**
   * @description 是否启用撤销/重做
   */
  history: {
    type: Boolean,
    default: !0
  },
  /**
   * @description 最大历史记录数
   */
  maxHistory: {
    type: Number,
    default: 50
  },
  /**
   * @description 是否启用虚拟滚动
   */
  virtualized: {
    type: Boolean,
    default: !1
  },
  /**
   * @description 虚拟滚动缓冲区
   */
  virtualizationThreshold: {
    type: Number,
    default: 100
  },
  /**
   * @description 连接校验函数
   */
  isValidConnection: {
    type: Function,
    default: null
  },
  /**
   * @description 主题覆盖变量
   */
  themeOverrides: {
    type: Object,
    default: void 0
  }
}, rF = {
  "update:modelValue": (e) => typeof e.x == "number" && typeof e.y == "number" && typeof e.zoom == "number",
  "update:nodes": (e) => Array.isArray(e),
  "update:edges": (e) => Array.isArray(e),
  nodeClick: (e) => !!e,
  nodeDblClick: (e) => !!e,
  nodeDragStart: (e) => !!e,
  nodeDrag: (e) => !!e,
  nodeDragEnd: (e) => !!e,
  nodeContextMenu: (e) => !!e,
  edgeClick: (e) => !!e,
  edgeDblClick: (e) => !!e,
  edgeContextMenu: (e) => !!e,
  edgeConnect: (e) => !0,
  selectionChange: (e) => !!e,
  historyChange: (e) => !!e,
  viewportChange: (e) => !!e
}, I1 = ["data-handle-id", "data-handle-type", "data-handle-position"], N1 = /* @__PURE__ */ ie({
  __name: "BaseNode",
  props: {
    id: {},
    type: {},
    data: {},
    selected: { type: Boolean, default: !1 },
    dragging: { type: Boolean, default: !1 },
    connectable: { type: Boolean, default: !0 },
    style: { default: () => ({}) },
    handles: { default: () => [
      { type: "source", position: "right", isConnectable: !0 },
      { type: "target", position: "left", isConnectable: !0 }
    ] },
    label: { default: "" },
    labelColor: { default: "" },
    descriptionColor: { default: "" }
  },
  setup(e) {
    const a = e, n = J(() => {
      const o = {
        padding: "var(--flow-node-padding, 10px)",
        borderRadius: "var(--flow-node-border-radius, 8px)",
        border: "1px solid var(--flow-node-border, #dcdfe6)",
        backgroundColor: "var(--flow-node-background, #fff)",
        minWidth: "100px",
        textAlign: "center",
        transition: "all 0.2s"
      };
      return a.selected && (o.border = "2px solid var(--flow-node-selected-border, #409eff)", o.boxShadow = "var(--flow-node-selected-shadow, 0 0 8px rgba(64, 158, 255, 0.4))"), a.dragging && (o.opacity = "var(--flow-node-dragging-opacity, 0.8)", o.cursor = "grabbing"), { ...o, ...a.style };
    });
    function r(o) {
      const s = {
        width: "var(--flow-handle-size, 12px)",
        height: "var(--flow-handle-size, 12px)",
        backgroundColor: "var(--flow-handle-background, #fff)",
        border: "2px solid var(--flow-handle-border, #409eff)",
        borderRadius: "var(--flow-handle-border-radius, 50%)",
        cursor: "crosshair"
      };
      return o.style && Object.assign(s, o.style), s;
    }
    return (o, s) => {
      var t, i, u, l;
      return H(), E(
        "div",
        {
          class: te(["flow-base-node", { selected: e.selected, dragging: e.dragging }]),
          style: re(n.value)
        },
        [
          b(
            "div",
            {
              class: "flow-node-label",
              style: re({ color: e.labelColor || ((t = e.data) == null ? void 0 : t.labelColor) || "var(--flow-node-label-color, #303133)" })
            },
            ae(e.label || ((i = e.data) == null ? void 0 : i.label) || e.type),
            5
            /* TEXT, STYLE */
          ),
          (u = e.data) != null && u.description ? (H(), E(
            "div",
            {
              key: 0,
              class: "flow-node-description",
              style: re({
                color: e.descriptionColor || ((l = e.data) == null ? void 0 : l.descriptionColor) || "var(--flow-node-description-color, #909399)"
              })
            },
            ae(e.data.description),
            5
            /* TEXT, STYLE */
          )) : I("v-if", !0),
          (H(!0), E(
            pe,
            null,
            ke(e.handles, (d) => (H(), E(
              pe,
              {
                key: `${d.type}-${d.position}`
              },
              [
                d.isConnectable !== !1 && e.connectable ? (H(), E("div", {
                  key: 0,
                  class: te(["flow-handle", [`flow-handle-${d.type}`, `flow-handle-position-${d.position}`]]),
                  style: re(r(d)),
                  "data-handle-id": d.id,
                  "data-handle-type": d.type,
                  "data-handle-position": d.position
                }, null, 14, I1)) : I("v-if", !0)
              ],
              64
              /* STABLE_FRAGMENT */
            ))),
            128
            /* KEYED_FRAGMENT */
          ))
        ],
        6
        /* CLASS, STYLE */
      );
    };
  }
}), nF = /* @__PURE__ */ ue(N1, [["__scopeId", "data-v-068cd406"]]), O1 = {
  key: 1,
  class: "flow-handle-right",
  "data-handle-type": "source",
  "data-handle-position": "right"
}, z1 = /* @__PURE__ */ ie({
  __name: "InputNode",
  props: {
    id: {},
    type: {},
    data: {},
    selected: { type: Boolean, default: !1 },
    dragging: { type: Boolean, default: !1 },
    connectable: { type: Boolean, default: !0 },
    style: { default: () => ({}) },
    label: { default: "" },
    labelColor: { default: "" },
    descriptionColor: { default: "" }
  },
  setup(e) {
    const a = e, n = J(() => {
      const r = {
        padding: "10px 15px",
        borderRadius: "4px 4px 12px 4px",
        border: "1px solid #67c23a",
        backgroundColor: "#f0f9ff",
        minWidth: "80px",
        textAlign: "center",
        transition: "all 0.2s"
      };
      return a.selected && (r.border = "2px solid #67c23a", r.boxShadow = "0 0 8px rgba(103, 194, 58, 0.4)"), { ...r, ...a.style };
    });
    return (r, o) => {
      var s, t, i, u;
      return H(), E(
        "div",
        {
          class: te(["flow-input-node", { selected: e.selected, dragging: e.dragging }]),
          style: re(n.value)
        },
        [
          b(
            "div",
            {
              class: "flow-node-label",
              style: re({ color: e.labelColor || ((s = e.data) == null ? void 0 : s.labelColor) || "#000" })
            },
            ae(e.label || ((t = e.data) == null ? void 0 : t.label) || "Input"),
            5
            /* TEXT, STYLE */
          ),
          (i = e.data) != null && i.description ? (H(), E(
            "div",
            {
              key: 0,
              class: "flow-node-description",
              style: re({
                color: e.descriptionColor || ((u = e.data) == null ? void 0 : u.descriptionColor) || "var(--flow-node-description-color, #909399)"
              })
            },
            ae(e.data.description),
            5
            /* TEXT, STYLE */
          )) : I("v-if", !0),
          e.connectable ? (H(), E("div", O1)) : I("v-if", !0)
        ],
        6
        /* CLASS, STYLE */
      );
    };
  }
}), aF = /* @__PURE__ */ ue(z1, [["__scopeId", "data-v-67bca1f5"]]), F1 = {
  key: 0,
  class: "flow-handle-left",
  "data-handle-type": "target",
  "data-handle-position": "left"
}, B1 = /* @__PURE__ */ ie({
  __name: "OutputNode",
  props: {
    id: {},
    type: {},
    data: {},
    selected: { type: Boolean, default: !1 },
    dragging: { type: Boolean, default: !1 },
    connectable: { type: Boolean, default: !0 },
    style: { default: () => ({}) },
    label: { default: "" },
    labelColor: { default: "" }
  },
  setup(e) {
    const a = e, n = J(() => {
      const r = {
        padding: "10px 15px",
        borderRadius: "12px 4px 4px 4px",
        border: "1px solid #e6a23c",
        backgroundColor: "#fff7e6",
        minWidth: "80px",
        textAlign: "center",
        transition: "all 0.2s"
      };
      return a.selected && (r.border = "2px solid #e6a23c", r.boxShadow = "0 0 8px rgba(230, 162, 60, 0.4)"), { ...r, ...a.style };
    });
    return (r, o) => {
      var s, t;
      return H(), E(
        "div",
        {
          class: te(["flow-output-node", { selected: e.selected, dragging: e.dragging }]),
          style: re(n.value)
        },
        [
          e.connectable ? (H(), E("div", F1)) : I("v-if", !0),
          b(
            "div",
            {
              class: "flow-node-label",
              style: re({ color: e.labelColor || ((s = e.data) == null ? void 0 : s.labelColor) || "#000" })
            },
            ae(e.label || ((t = e.data) == null ? void 0 : t.label) || "Output"),
            5
            /* TEXT, STYLE */
          )
        ],
        6
        /* CLASS, STYLE */
      );
    };
  }
}), oF = /* @__PURE__ */ ue(B1, [["__scopeId", "data-v-29b9773e"]]), G1 = { class: "flow-group-header" }, J1 = { class: "flow-group-label" }, U1 = { class: "flow-group-content" }, W1 = /* @__PURE__ */ ie({
  __name: "GroupNode",
  props: {
    id: {},
    type: {},
    data: {},
    selected: { type: Boolean, default: !1 },
    dragging: { type: Boolean, default: !1 },
    connectable: { type: Boolean, default: !1 },
    style: { default: () => ({}) },
    label: { default: "" },
    expanded: { type: Boolean, default: !0 }
  },
  setup(e) {
    const a = e, n = J(() => {
      const r = {
        padding: "15px",
        borderRadius: "8px",
        border: "2px dashed #909399",
        backgroundColor: "#f5f7fa",
        minWidth: "200px",
        minHeight: "150px",
        transition: "all 0.2s"
      };
      return a.selected && (r.border = "2px solid #409eff"), { ...r, ...a.style };
    });
    return (r, o) => {
      var s;
      return H(), E(
        "div",
        {
          class: te(["flow-group-node", { selected: e.selected, dragging: e.dragging, expanded: e.expanded }]),
          style: re(n.value)
        },
        [
          b("div", G1, [
            b(
              "span",
              J1,
              ae(e.label || ((s = e.data) == null ? void 0 : s.label) || "Group"),
              1
              /* TEXT */
            )
          ]),
          b("div", U1, [
            ut(r.$slots, "default", {}, void 0, !0)
          ])
        ],
        6
        /* CLASS, STYLE */
      );
    };
  }
}), sF = /* @__PURE__ */ ue(W1, [["__scopeId", "data-v-594387f4"]]), V1 = /* @__PURE__ */ ie({
  __name: "CustomNode",
  props: {
    id: {},
    type: {},
    data: {},
    selected: { type: Boolean, default: !1 },
    dragging: { type: Boolean, default: !1 },
    connectable: { type: Boolean, default: !0 },
    style: { default: () => ({}) },
    label: { default: "" }
  },
  setup(e) {
    const a = e, n = J(() => {
      const r = {
        padding: "12px",
        borderRadius: "8px",
        border: "1px solid #dcdfe6",
        backgroundColor: "#ffffff",
        minWidth: "120px",
        transition: "all 0.2s"
      };
      return a.selected && (r.border = "2px solid #409eff", r.boxShadow = "0 0 8px rgba(64, 158, 255, 0.4)"), a.dragging && (r.opacity = "0.8"), { ...r, ...a.style };
    });
    return (r, o) => (H(), E(
      "div",
      {
        class: te(["flow-custom-node", { selected: e.selected, dragging: e.dragging }]),
        style: re(n.value)
      },
      [
        ut(r.$slots, "default", {
          node: { id: e.id, type: e.type, data: e.data, selected: e.selected }
        }, void 0, !0)
      ],
      6
      /* CLASS, STYLE */
    ));
  }
}), iF = /* @__PURE__ */ ue(V1, [["__scopeId", "data-v-68714fae"]]), K1 = ["onMousedown"], X1 = /* @__PURE__ */ ie({
  __name: "NodeResizer",
  props: {
    nodeId: {},
    selected: { type: Boolean },
    minWidth: {},
    minHeight: {},
    keepAspectRatio: { type: Boolean }
  },
  emits: ["resize", "resizeStart", "resizeEnd"],
  setup(e, { emit: a }) {
    const n = e, r = Rt(), o = a, s = J(() => n.selected), t = ["n", "s", "e", "w", "ne", "nw", "se", "sw"];
    let i = 0, u = 0, l = 0, d = 0, c = 0, _ = 0, f = "";
    const m = (p, v) => {
      p.preventDefault(), i = p.clientX, u = p.clientY, l = p.clientX, d = p.clientY, f = v;
      const g = document.getElementById(`node-${n.nodeId}`);
      g && (c = g.offsetWidth, _ = g.offsetHeight, o("resizeStart", p), document.addEventListener("mousemove", h), document.addEventListener("mouseup", y));
    }, h = (p) => {
      const v = r.viewport.value.zoom || 1, g = (p.clientX - i) / v, M = (p.clientY - u) / v, Y = (p.clientX - l) / v, L = (p.clientY - d) / v;
      l = p.clientX, d = p.clientY;
      let D = c, w = _, T = 0, k = 0;
      f.includes("e") && (D = c + g), f.includes("w") && (D = c - g, T = Y), f.includes("s") && (w = _ + M), f.includes("n") && (w = _ - M, k = L), D = Math.max(D, n.minWidth || 50), w = Math.max(w, n.minHeight || 30), o("resize", { width: D, height: w, x: T, y: k });
    }, y = (p) => {
      o("resizeEnd", p), document.removeEventListener("mousemove", h), document.removeEventListener("mouseup", y);
    };
    return (p, v) => s.value ? (H(), E(
      "div",
      {
        key: 0,
        class: "yh-flow-node-resizer",
        onMousedown: v[1] || (v[1] = we(() => {
        }, ["stop"])),
        onClick: v[2] || (v[2] = we(() => {
        }, ["stop"]))
      },
      [
        (H(), E(
          pe,
          null,
          ke(t, (g) => b("div", {
            key: g,
            class: te(["resizer-handle", `handle-${g}`]),
            onMousedown: we((M) => m(M, g), ["stop"]),
            onClick: v[0] || (v[0] = we(() => {
            }, ["stop"]))
          }, null, 42, K1)),
          64
          /* STABLE_FRAGMENT */
        ))
      ],
      32
      /* NEED_HYDRATION */
    )) : I("v-if", !0);
  }
}), uF = /* @__PURE__ */ ue(X1, [["__scopeId", "data-v-a0e3f161"]]), Z1 = { class: "default-toolbar" }, Q1 = /* @__PURE__ */ ie({
  __name: "NodeToolbar",
  props: {
    nodeId: {},
    selected: { type: Boolean },
    position: { default: "top" },
    offset: { default: 10 },
    teleportTo: { default: "body" }
  },
  emits: ["delete", "copy"],
  setup(e, { expose: a, emit: n }) {
    const r = e, o = n, s = ee(), t = J(() => r.selected), i = ee({
      position: "absolute",
      top: "0px",
      left: "0px",
      zIndex: 99999,
      transform: ""
    }), u = J(() => r.teleportTo);
    let l = 0;
    const d = () => {
      if (!t.value) return;
      const c = document.getElementById(`node-${r.nodeId}`);
      if (!c) {
        l = requestAnimationFrame(d);
        return;
      }
      const _ = c.getBoundingClientRect(), f = window.scrollX, m = window.scrollY;
      let h = 0, y = 0;
      r.position === "top" ? (h = _.top + m - r.offset - 40, y = _.left + f + _.width / 2) : r.position === "bottom" ? (h = _.bottom + m + r.offset, y = _.left + f + _.width / 2) : r.position === "left" ? (h = _.top + m + _.height / 2, y = _.left + f - r.offset - 60) : r.position === "right" && (h = _.top + m + _.height / 2, y = _.right + f + r.offset), i.value = {
        ...i.value,
        top: `${h}px`,
        left: `${y}px`,
        transform: r.position === "top" || r.position === "bottom" ? "translateX(-50%)" : "translateY(-50%)"
      }, l = requestAnimationFrame(d);
    };
    return Le(t, (c) => {
      c ? d() : l && (cancelAnimationFrame(l), l = 0);
    }), Ct(() => {
      t.value && d();
    }), Gd(() => {
      l && cancelAnimationFrame(l);
    }), a({
      updatePosition: d
    }), (c, _) => (H(), Ve(Ka, { to: u.value }, [
      t.value ? (H(), E(
        "div",
        {
          key: 0,
          ref_key: "toolbarRef",
          ref: s,
          class: "yh-flow-node-toolbar",
          style: re(i.value),
          onMousedown: _[2] || (_[2] = we(() => {
          }, ["stop"])),
          onClick: _[3] || (_[3] = we(() => {
          }, ["stop"]))
        },
        [
          ut(c.$slots, "default", {}, () => [
            I(" 默认工具栏内容 "),
            b("div", Z1, [
              b("button", {
                onClick: _[0] || (_[0] = (f) => o("delete"))
              }, "Delete"),
              b("button", {
                onClick: _[1] || (_[1] = (f) => o("copy"))
              }, "Copy")
            ])
          ], !0)
        ],
        36
        /* STYLE, NEED_HYDRATION */
      )) : I("v-if", !0)
    ], 8, ["to"]));
  }
}), lF = /* @__PURE__ */ ue(Q1, [["__scopeId", "data-v-978b7d5a"]]), eL = { class: "yh-flow-node-diamond__content" }, tL = { class: "yh-flow-node-diamond__label" }, rL = {
  key: 0,
  class: "flow-handle position-top",
  "data-handle-type": "target",
  "data-handle-position": "top"
}, nL = {
  key: 1,
  class: "flow-handle position-bottom",
  "data-handle-type": "source",
  "data-handle-position": "bottom"
}, aL = {
  key: 2,
  class: "flow-handle position-left",
  "data-handle-type": "source",
  "data-handle-position": "left"
}, oL = {
  key: 3,
  class: "flow-handle position-right",
  "data-handle-type": "source",
  "data-handle-position": "right"
}, sL = /* @__PURE__ */ ie({
  __name: "DiamondNode",
  props: {
    id: {},
    type: {},
    data: {},
    selected: { type: Boolean, default: !1 },
    dragging: { type: Boolean, default: !1 },
    connectable: { type: Boolean, default: !0 },
    style: { default: () => ({}) },
    label: { default: "" }
  },
  setup(e) {
    const a = e, n = J(() => ({ ...a.style }));
    return (r, o) => {
      var s, t;
      return H(), E(
        "div",
        {
          class: te(["flow-diamond-node", { selected: e.selected, dragging: e.dragging }]),
          style: re(n.value)
        },
        [
          I(" Decision Node (Diamond shape using CSS transform) "),
          b("div", eL, [
            b(
              "div",
              {
                class: "yh-flow-node-diamond__shape",
                style: re((s = e.data) == null ? void 0 : s.style)
              },
              [
                b(
                  "span",
                  tL,
                  ae(e.label || ((t = e.data) == null ? void 0 : t.label)),
                  1
                  /* TEXT */
                )
              ],
              4
              /* STYLE */
            ),
            I(" Handles "),
            e.connectable ? (H(), E("div", rL)) : I("v-if", !0),
            e.connectable ? (H(), E("div", nL)) : I("v-if", !0),
            e.connectable ? (H(), E("div", aL)) : I("v-if", !0),
            e.connectable ? (H(), E("div", oL)) : I("v-if", !0)
          ])
        ],
        6
        /* CLASS, STYLE */
      );
    };
  }
}), iL = /* @__PURE__ */ ue(sL, [["__scopeId", "data-v-3c748647"]]), uL = { class: "yh-flow-node-database__body" }, lL = { class: "yh-flow-node-database__label" }, dL = {
  key: 0,
  class: "flow-handle position-top",
  "data-handle-type": "target",
  "data-handle-position": "top"
}, cL = {
  key: 1,
  class: "flow-handle position-bottom",
  "data-handle-type": "source",
  "data-handle-position": "bottom"
}, _L = {
  key: 2,
  class: "flow-handle position-left",
  "data-handle-type": "target",
  "data-handle-position": "left"
}, fL = {
  key: 3,
  class: "flow-handle position-right",
  "data-handle-type": "source",
  "data-handle-position": "right"
}, mL = /* @__PURE__ */ ie({
  __name: "DatabaseNode",
  props: {
    id: {},
    type: {},
    data: {},
    selected: { type: Boolean, default: !1 },
    dragging: { type: Boolean, default: !1 },
    connectable: { type: Boolean, default: !0 },
    style: { default: () => ({}) },
    label: { default: "" }
  },
  setup(e) {
    const a = e, n = J(() => ({ ...a.style }));
    return (r, o) => {
      var s, t;
      return H(), E(
        "div",
        {
          class: te(["flow-database-node", { selected: e.selected, dragging: e.dragging }]),
          style: re(n.value)
        },
        [
          b(
            "div",
            {
              class: "yh-flow-node-database__content",
              style: re((s = e.data) == null ? void 0 : s.style)
            },
            [
              o[0] || (o[0] = b(
                "div",
                { class: "yh-flow-node-database__top" },
                null,
                -1
                /* CACHED */
              )),
              b("div", uL, [
                b(
                  "span",
                  lL,
                  ae(e.label || ((t = e.data) == null ? void 0 : t.label)),
                  1
                  /* TEXT */
                )
              ]),
              I(" Handles "),
              e.connectable ? (H(), E("div", dL)) : I("v-if", !0),
              e.connectable ? (H(), E("div", cL)) : I("v-if", !0),
              e.connectable ? (H(), E("div", _L)) : I("v-if", !0),
              e.connectable ? (H(), E("div", fL)) : I("v-if", !0)
            ],
            4
            /* STYLE */
          )
        ],
        6
        /* CLASS, STYLE */
      );
    };
  }
}), pL = /* @__PURE__ */ ue(mL, [["__scopeId", "data-v-cb2bef3f"]]), hL = { class: "bpmn-start-event-label" }, vL = {
  key: 0,
  class: "bpmn-handle bpmn-handle-source",
  "data-handle-type": "source",
  "data-handle-position": "right"
}, yL = /* @__PURE__ */ ie({
  __name: "BpmnStartEvent",
  props: {
    id: {},
    type: {},
    data: {},
    selected: { type: Boolean, default: !1 },
    dragging: { type: Boolean, default: !1 },
    connectable: { type: Boolean, default: !0 },
    style: { default: () => ({}) },
    label: { default: "开始" }
  },
  setup(e) {
    const a = e, n = J(() => {
      const r = {
        width: "40px",
        height: "40px",
        borderRadius: "50%",
        border: "2px solid #52c41a",
        backgroundColor: "#f6ffed",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        transition: "all 0.2s"
      };
      return a.selected && (r.border = "3px solid #52c41a", r.boxShadow = "0 0 8px rgba(82, 196, 26, 0.5)"), { ...r, ...a.style };
    });
    return (r, o) => {
      var s;
      return H(), E(
        "div",
        {
          class: te(["bpmn-start-event", { selected: e.selected, dragging: e.dragging }]),
          style: re(n.value)
        },
        [
          b(
            "span",
            hL,
            ae(e.label || ((s = e.data) == null ? void 0 : s.label) || "开始"),
            1
            /* TEXT */
          ),
          e.connectable ? (H(), E("div", vL)) : I("v-if", !0)
        ],
        6
        /* CLASS, STYLE */
      );
    };
  }
}), gL = /* @__PURE__ */ ue(yL, [["__scopeId", "data-v-392a3802"]]), ML = { class: "bpmn-end-event-label" }, bL = {
  key: 0,
  class: "bpmn-handle bpmn-handle-target",
  "data-handle-type": "target",
  "data-handle-position": "left"
}, YL = /* @__PURE__ */ ie({
  __name: "BpmnEndEvent",
  props: {
    id: {},
    type: {},
    data: {},
    selected: { type: Boolean, default: !1 },
    dragging: { type: Boolean, default: !1 },
    connectable: { type: Boolean, default: !0 },
    style: { default: () => ({}) },
    label: { default: "结束" }
  },
  setup(e) {
    const a = e, n = J(() => {
      const r = {
        width: "40px",
        height: "40px",
        borderRadius: "50%",
        border: "3px solid #ff4d4f",
        backgroundColor: "#fff2f0",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        transition: "all 0.2s"
      };
      return a.selected && (r.border = "4px solid #ff4d4f", r.boxShadow = "0 0 8px rgba(255, 77, 79, 0.5)"), { ...r, ...a.style };
    });
    return (r, o) => {
      var s;
      return H(), E(
        "div",
        {
          class: te(["bpmn-end-event", { selected: e.selected, dragging: e.dragging }]),
          style: re(n.value)
        },
        [
          b(
            "span",
            ML,
            ae(e.label || ((s = e.data) == null ? void 0 : s.label) || "结束"),
            1
            /* TEXT */
          ),
          e.connectable ? (H(), E("div", bL)) : I("v-if", !0)
        ],
        6
        /* CLASS, STYLE */
      );
    };
  }
}), wL = /* @__PURE__ */ ue(YL, [["__scopeId", "data-v-bffae76f"]]), xL = {
  key: 0,
  class: "bpmn-handle bpmn-handle-target",
  "data-handle-type": "target",
  "data-handle-position": "left"
}, LL = { class: "bpmn-task-label" }, kL = {
  key: 1,
  class: "bpmn-handle bpmn-handle-source",
  "data-handle-type": "source",
  "data-handle-position": "right"
}, SL = /* @__PURE__ */ ie({
  __name: "BpmnTask",
  props: {
    id: {},
    type: {},
    data: {},
    selected: { type: Boolean, default: !1 },
    dragging: { type: Boolean, default: !1 },
    connectable: { type: Boolean, default: !0 },
    style: { default: () => ({}) },
    label: { default: "任务" }
  },
  setup(e) {
    const a = e, n = J(() => {
      const r = {
        padding: "10px 16px",
        minWidth: "100px",
        borderRadius: "4px",
        border: "1px solid #1890ff",
        backgroundColor: "#e6f7ff",
        textAlign: "center",
        transition: "all 0.2s"
      };
      return a.selected && (r.border = "2px solid #1890ff", r.boxShadow = "0 0 8px rgba(24, 144, 255, 0.4)"), { ...r, ...a.style };
    });
    return (r, o) => {
      var s;
      return H(), E(
        "div",
        {
          class: te(["bpmn-task", { selected: e.selected, dragging: e.dragging }]),
          style: re(n.value)
        },
        [
          e.connectable ? (H(), E("div", xL)) : I("v-if", !0),
          b(
            "span",
            LL,
            ae(e.label || ((s = e.data) == null ? void 0 : s.label) || "任务"),
            1
            /* TEXT */
          ),
          e.connectable ? (H(), E("div", kL)) : I("v-if", !0)
        ],
        6
        /* CLASS, STYLE */
      );
    };
  }
}), DL = /* @__PURE__ */ ue(SL, [["__scopeId", "data-v-ca562524"]]), TL = {
  key: 0,
  class: "bpmn-handle bpmn-handle-target",
  "data-handle-type": "target",
  "data-handle-position": "left"
}, $L = { class: "bpmn-task-label" }, HL = {
  key: 1,
  class: "bpmn-handle bpmn-handle-source",
  "data-handle-type": "source",
  "data-handle-position": "right"
}, jL = /* @__PURE__ */ ie({
  __name: "BpmnServiceTask",
  props: {
    id: {},
    type: {},
    data: {},
    selected: { type: Boolean, default: !1 },
    dragging: { type: Boolean, default: !1 },
    connectable: { type: Boolean, default: !0 },
    style: { default: () => ({}) },
    label: { default: "服务任务" }
  },
  setup(e) {
    const a = e, n = J(() => {
      const r = {
        padding: "10px 16px 10px 36px",
        minWidth: "100px",
        borderRadius: "4px",
        border: "1px solid #722ed1",
        backgroundColor: "#f9f0ff",
        textAlign: "center",
        transition: "all 0.2s"
      };
      return a.selected && (r.border = "2px solid #722ed1", r.boxShadow = "0 0 8px rgba(114, 46, 209, 0.4)"), { ...r, ...a.style };
    });
    return (r, o) => {
      var s;
      return H(), E(
        "div",
        {
          class: te(["bpmn-service-task", { selected: e.selected, dragging: e.dragging }]),
          style: re(n.value)
        },
        [
          e.connectable ? (H(), E("div", TL)) : I("v-if", !0),
          o[0] || (o[0] = b(
            "span",
            {
              class: "bpmn-service-icon",
              "aria-hidden": "true"
            },
            "⚙",
            -1
            /* CACHED */
          )),
          b(
            "span",
            $L,
            ae(e.label || ((s = e.data) == null ? void 0 : s.label) || "服务任务"),
            1
            /* TEXT */
          ),
          e.connectable ? (H(), E("div", HL)) : I("v-if", !0)
        ],
        6
        /* CLASS, STYLE */
      );
    };
  }
}), EL = /* @__PURE__ */ ue(jL, [["__scopeId", "data-v-a8938e02"]]), CL = {
  key: 0,
  class: "bpmn-handle bpmn-handle-target",
  "data-handle-type": "target",
  "data-handle-position": "left"
}, qL = { class: "bpmn-task-label" }, AL = {
  key: 1,
  class: "bpmn-handle bpmn-handle-source",
  "data-handle-type": "source",
  "data-handle-position": "right"
}, RL = /* @__PURE__ */ ie({
  __name: "BpmnUserTask",
  props: {
    id: {},
    type: {},
    data: {},
    selected: { type: Boolean, default: !1 },
    dragging: { type: Boolean, default: !1 },
    connectable: { type: Boolean, default: !0 },
    style: { default: () => ({}) },
    label: { default: "用户任务" }
  },
  setup(e) {
    const a = e, n = J(() => {
      const r = {
        padding: "10px 16px 10px 36px",
        minWidth: "100px",
        borderRadius: "4px",
        border: "1px solid #fa8c16",
        backgroundColor: "#fff7e6",
        textAlign: "center",
        transition: "all 0.2s"
      };
      return a.selected && (r.border = "2px solid #fa8c16", r.boxShadow = "0 0 8px rgba(250, 140, 22, 0.4)"), { ...r, ...a.style };
    });
    return (r, o) => {
      var s;
      return H(), E(
        "div",
        {
          class: te(["bpmn-user-task", { selected: e.selected, dragging: e.dragging }]),
          style: re(n.value)
        },
        [
          e.connectable ? (H(), E("div", CL)) : I("v-if", !0),
          o[0] || (o[0] = b(
            "span",
            {
              class: "bpmn-user-icon",
              "aria-hidden": "true"
            },
            "👤",
            -1
            /* CACHED */
          )),
          b(
            "span",
            qL,
            ae(e.label || ((s = e.data) == null ? void 0 : s.label) || "用户任务"),
            1
            /* TEXT */
          ),
          e.connectable ? (H(), E("div", AL)) : I("v-if", !0)
        ],
        6
        /* CLASS, STYLE */
      );
    };
  }
}), PL = /* @__PURE__ */ ue(RL, [["__scopeId", "data-v-8d8bbd20"]]), IL = {
  key: 0,
  class: "bpmn-handle bpmn-handle-target",
  "data-handle-type": "target",
  "data-handle-position": "left"
}, NL = {
  key: 1,
  class: "bpmn-handle bpmn-handle-source",
  "data-handle-type": "source",
  "data-handle-position": "right"
}, OL = {
  key: 2,
  class: "bpmn-handle bpmn-handle-source-bottom",
  "data-handle-type": "source",
  "data-handle-position": "bottom"
}, zL = /* @__PURE__ */ ie({
  __name: "BpmnExclusiveGateway",
  props: {
    id: {},
    type: {},
    data: {},
    selected: { type: Boolean, default: !1 },
    dragging: { type: Boolean, default: !1 },
    connectable: { type: Boolean, default: !0 },
    style: { default: () => ({}) },
    label: { default: "排他网关" }
  },
  setup(e) {
    const a = e, n = J(() => {
      const o = {
        width: "44px",
        height: "44px",
        border: "2px solid #faad14",
        backgroundColor: "#fffbe6",
        transform: "rotate(45deg)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        transition: "all 0.2s"
      };
      return a.selected && (o.border = "3px solid #faad14", o.boxShadow = "0 0 8px rgba(250, 173, 20, 0.5)"), { ...o, ...a.style };
    });
    return (r, o) => (H(), E(
      "div",
      {
        class: te(["bpmn-gateway bpmn-exclusive-gateway", { selected: e.selected, dragging: e.dragging }]),
        style: re(n.value)
      },
      [
        o[0] || (o[0] = b(
          "span",
          { class: "bpmn-gateway-inner" },
          "×",
          -1
          /* CACHED */
        )),
        e.connectable ? (H(), E("div", IL)) : I("v-if", !0),
        e.connectable ? (H(), E("div", NL)) : I("v-if", !0),
        e.connectable ? (H(), E("div", OL)) : I("v-if", !0)
      ],
      6
      /* CLASS, STYLE */
    ));
  }
}), FL = /* @__PURE__ */ ue(zL, [["__scopeId", "data-v-2bc3a60e"]]), BL = {
  key: 0,
  class: "bpmn-handle bpmn-handle-target",
  "data-handle-type": "target",
  "data-handle-position": "left"
}, GL = {
  key: 1,
  class: "bpmn-handle bpmn-handle-source",
  "data-handle-type": "source",
  "data-handle-position": "right"
}, JL = {
  key: 2,
  class: "bpmn-handle bpmn-handle-source-bottom",
  "data-handle-type": "source",
  "data-handle-position": "bottom"
}, UL = /* @__PURE__ */ ie({
  __name: "BpmnParallelGateway",
  props: {
    id: {},
    type: {},
    data: {},
    selected: { type: Boolean, default: !1 },
    dragging: { type: Boolean, default: !1 },
    connectable: { type: Boolean, default: !0 },
    style: { default: () => ({}) },
    label: { default: "并行网关" }
  },
  setup(e) {
    const a = e, n = J(() => {
      const o = {
        width: "44px",
        height: "44px",
        border: "2px solid #13c2c2",
        backgroundColor: "#e6fffb",
        transform: "rotate(45deg)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        transition: "all 0.2s"
      };
      return a.selected && (o.border = "3px solid #13c2c2", o.boxShadow = "0 0 8px rgba(19, 194, 194, 0.5)"), { ...o, ...a.style };
    });
    return (r, o) => (H(), E(
      "div",
      {
        class: te(["bpmn-gateway bpmn-parallel-gateway", { selected: e.selected, dragging: e.dragging }]),
        style: re(n.value)
      },
      [
        o[0] || (o[0] = b(
          "span",
          { class: "bpmn-gateway-inner" },
          "+",
          -1
          /* CACHED */
        )),
        e.connectable ? (H(), E("div", BL)) : I("v-if", !0),
        e.connectable ? (H(), E("div", GL)) : I("v-if", !0),
        e.connectable ? (H(), E("div", JL)) : I("v-if", !0)
      ],
      6
      /* CLASS, STYLE */
    ));
  }
}), WL = /* @__PURE__ */ ue(UL, [["__scopeId", "data-v-948f521d"]]), VL = {
  key: 0,
  class: "bpmn-handle bpmn-handle-target",
  "data-handle-type": "target",
  "data-handle-position": "left"
}, KL = {
  key: 1,
  class: "bpmn-handle bpmn-handle-source",
  "data-handle-type": "source",
  "data-handle-position": "right"
}, XL = {
  key: 2,
  class: "bpmn-handle bpmn-handle-source-bottom",
  "data-handle-type": "source",
  "data-handle-position": "bottom"
}, ZL = /* @__PURE__ */ ie({
  __name: "BpmnInclusiveGateway",
  props: {
    id: {},
    type: {},
    data: {},
    selected: { type: Boolean, default: !1 },
    dragging: { type: Boolean, default: !1 },
    connectable: { type: Boolean, default: !0 },
    style: { default: () => ({}) },
    label: { default: "包含网关" }
  },
  setup(e) {
    const a = e, n = J(() => {
      const o = {
        width: "44px",
        height: "44px",
        border: "2px solid #eb2f96",
        backgroundColor: "#fff0f6",
        transform: "rotate(45deg)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        transition: "all 0.2s"
      };
      return a.selected && (o.border = "3px solid #eb2f96", o.boxShadow = "0 0 8px rgba(235, 47, 150, 0.5)"), { ...o, ...a.style };
    });
    return (r, o) => (H(), E(
      "div",
      {
        class: te(["bpmn-gateway bpmn-inclusive-gateway", { selected: e.selected, dragging: e.dragging }]),
        style: re(n.value)
      },
      [
        o[0] || (o[0] = b(
          "span",
          { class: "bpmn-gateway-inner" },
          "○",
          -1
          /* CACHED */
        )),
        e.connectable ? (H(), E("div", VL)) : I("v-if", !0),
        e.connectable ? (H(), E("div", KL)) : I("v-if", !0),
        e.connectable ? (H(), E("div", XL)) : I("v-if", !0)
      ],
      6
      /* CLASS, STYLE */
    ));
  }
}), QL = /* @__PURE__ */ ue(ZL, [["__scopeId", "data-v-57d60355"]]), rt = {
  StartEvent: "bpmn-start",
  EndEvent: "bpmn-end",
  Task: "bpmn-task",
  ServiceTask: "bpmn-service-task",
  UserTask: "bpmn-user-task",
  ExclusiveGateway: "bpmn-exclusive-gateway",
  ParallelGateway: "bpmn-parallel-gateway",
  InclusiveGateway: "bpmn-inclusive-gateway"
};
function dF() {
  $e({ type: rt.StartEvent, component: gL }), $e({ type: rt.EndEvent, component: wL }), $e({ type: rt.Task, component: DL }), $e({ type: rt.ServiceTask, component: EL }), $e({ type: rt.UserTask, component: PL }), $e({ type: rt.ExclusiveGateway, component: FL }), $e({ type: rt.ParallelGateway, component: WL }), $e({ type: rt.InclusiveGateway, component: QL });
}
const ek = {
  key: 0,
  class: "ai-handle ai-handle-target",
  "data-handle-type": "target",
  "data-handle-position": "left"
}, tk = { class: "ai-node-header" }, rk = { class: "ai-node-title" }, nk = { class: "ai-node-body" }, ak = { class: "ai-node-model" }, ok = {
  key: 1,
  class: "ai-handle ai-handle-source",
  "data-handle-type": "source",
  "data-handle-position": "right"
}, sk = /* @__PURE__ */ ie({
  __name: "AiLlmNode",
  props: {
    id: {},
    type: {},
    data: {},
    selected: { type: Boolean, default: !1 },
    dragging: { type: Boolean, default: !1 },
    connectable: { type: Boolean, default: !0 },
    style: { default: () => ({}) },
    label: { default: "LLM" }
  },
  setup(e) {
    const a = e, n = J(() => {
      const r = {
        padding: "12px 16px",
        minWidth: "180px",
        borderRadius: "12px",
        border: "1px solid #8b5cf6",
        backgroundColor: "#f5f3ff",
        transition: "all 0.2s"
      };
      return a.selected && (r.border = "2px solid #8b5cf6", r.boxShadow = "0 0 12px rgba(139, 92, 246, 0.4)"), { ...r, ...a.style };
    });
    return (r, o) => {
      var s, t, i;
      return H(), E(
        "div",
        {
          class: te(["ai-llm-node", { selected: e.selected, dragging: e.dragging }]),
          style: re(n.value)
        },
        [
          e.connectable ? (H(), E("div", ek)) : I("v-if", !0),
          b("div", tk, [
            o[0] || (o[0] = b(
              "span",
              { class: "ai-node-icon" },
              "🧠",
              -1
              /* CACHED */
            )),
            b(
              "span",
              rk,
              ae(e.label || ((s = e.data) == null ? void 0 : s.label) || "LLM"),
              1
              /* TEXT */
            )
          ]),
          b("div", nk, [
            b(
              "div",
              ak,
              ae(((t = e.data) == null ? void 0 : t.model) || "GPT-4"),
              1
              /* TEXT */
            ),
            (i = e.data) != null && i.status ? (H(), E(
              "div",
              {
                key: 0,
                class: te(["ai-node-status", `status-${e.data.status}`])
              },
              ae(e.data.status === "running" ? "● 运行中" : e.data.status === "success" ? "✓ 成功" : "○ 待运行"),
              3
              /* TEXT, CLASS */
            )) : I("v-if", !0)
          ]),
          e.connectable ? (H(), E("div", ok)) : I("v-if", !0)
        ],
        6
        /* CLASS, STYLE */
      );
    };
  }
}), ik = /* @__PURE__ */ ue(sk, [["__scopeId", "data-v-6a45f3e9"]]), uk = {
  key: 0,
  class: "ai-handle ai-handle-target",
  "data-handle-type": "target",
  "data-handle-position": "left"
}, lk = { class: "ai-node-header" }, dk = { class: "ai-node-title" }, ck = { class: "ai-node-body" }, _k = { class: "ai-node-preview" }, fk = {
  key: 1,
  class: "ai-handle ai-handle-source",
  "data-handle-type": "source",
  "data-handle-position": "right"
}, mk = /* @__PURE__ */ ie({
  __name: "AiPromptNode",
  props: {
    id: {},
    type: {},
    data: {},
    selected: { type: Boolean, default: !1 },
    dragging: { type: Boolean, default: !1 },
    connectable: { type: Boolean, default: !0 },
    style: { default: () => ({}) },
    label: { default: "提示词" }
  },
  setup(e) {
    const a = e, n = J(() => {
      const r = {
        padding: "12px 16px",
        minWidth: "160px",
        borderRadius: "12px",
        border: "1px solid #06b6d4",
        backgroundColor: "#ecfeff",
        transition: "all 0.2s"
      };
      return a.selected && (r.border = "2px solid #06b6d4", r.boxShadow = "0 0 12px rgba(6, 182, 212, 0.4)"), { ...r, ...a.style };
    });
    return (r, o) => {
      var s, t;
      return H(), E(
        "div",
        {
          class: te(["ai-prompt-node", { selected: e.selected, dragging: e.dragging }]),
          style: re(n.value)
        },
        [
          e.connectable ? (H(), E("div", uk)) : I("v-if", !0),
          b("div", lk, [
            o[0] || (o[0] = b(
              "span",
              { class: "ai-node-icon" },
              "💬",
              -1
              /* CACHED */
            )),
            b(
              "span",
              dk,
              ae(e.label || ((s = e.data) == null ? void 0 : s.label) || "提示词"),
              1
              /* TEXT */
            )
          ]),
          b("div", ck, [
            b(
              "div",
              _k,
              ae(String(((t = e.data) == null ? void 0 : t.prompt) || "").slice(0, 30) || "点击编辑提示词...") + "... ",
              1
              /* TEXT */
            )
          ]),
          e.connectable ? (H(), E("div", fk)) : I("v-if", !0)
        ],
        6
        /* CLASS, STYLE */
      );
    };
  }
}), pk = /* @__PURE__ */ ue(mk, [["__scopeId", "data-v-accac64d"]]), hk = {
  key: 0,
  class: "ai-handle ai-handle-target",
  "data-handle-type": "target",
  "data-handle-position": "left"
}, vk = { class: "ai-node-header" }, yk = { class: "ai-node-title" }, gk = { class: "ai-node-body" }, Mk = { class: "ai-node-tools" }, bk = {
  key: 1,
  class: "ai-handle ai-handle-source",
  "data-handle-type": "source",
  "data-handle-position": "right"
}, Yk = /* @__PURE__ */ ie({
  __name: "AiAgentNode",
  props: {
    id: {},
    type: {},
    data: { default: () => ({}) },
    selected: { type: Boolean, default: !1 },
    dragging: { type: Boolean, default: !1 },
    connectable: { type: Boolean, default: !0 },
    style: { default: () => ({}) },
    label: { default: "Agent" }
  },
  setup(e) {
    const a = e, n = J(() => {
      const r = {
        padding: "12px 16px",
        minWidth: "160px",
        borderRadius: "12px",
        border: "1px solid #f97316",
        backgroundColor: "#fff7ed",
        transition: "all 0.2s"
      };
      return a.selected && (r.border = "2px solid #f97316", r.boxShadow = "0 0 12px rgba(249, 115, 22, 0.4)"), { ...r, ...a.style };
    });
    return (r, o) => {
      var s, t, i;
      return H(), E(
        "div",
        {
          class: te(["ai-agent-node", { selected: e.selected, dragging: e.dragging }]),
          style: re(n.value)
        },
        [
          e.connectable ? (H(), E("div", hk)) : I("v-if", !0),
          b("div", vk, [
            o[0] || (o[0] = b(
              "span",
              { class: "ai-node-icon" },
              "🤖",
              -1
              /* CACHED */
            )),
            b(
              "span",
              yk,
              ae(e.label || ((s = e.data) == null ? void 0 : s.label) || "Agent"),
              1
              /* TEXT */
            )
          ]),
          b("div", gk, [
            b(
              "div",
              Mk,
              ae(((i = (t = a.data) == null ? void 0 : t.tools) == null ? void 0 : i.length) || 0) + " 个工具",
              1
              /* TEXT */
            )
          ]),
          e.connectable ? (H(), E("div", bk)) : I("v-if", !0)
        ],
        6
        /* CLASS, STYLE */
      );
    };
  }
}), wk = /* @__PURE__ */ ue(Yk, [["__scopeId", "data-v-6f2a727b"]]), xk = {
  key: 0,
  class: "ai-handle ai-handle-target",
  "data-handle-type": "target",
  "data-handle-position": "left"
}, Lk = { class: "ai-node-header" }, kk = { class: "ai-node-title" }, Sk = { class: "ai-node-body" }, Dk = { class: "ai-node-tool-name" }, Tk = {
  key: 1,
  class: "ai-handle ai-handle-source",
  "data-handle-type": "source",
  "data-handle-position": "right"
}, $k = /* @__PURE__ */ ie({
  __name: "AiToolNode",
  props: {
    id: {},
    type: {},
    data: {},
    selected: { type: Boolean, default: !1 },
    dragging: { type: Boolean, default: !1 },
    connectable: { type: Boolean, default: !0 },
    style: { default: () => ({}) },
    label: { default: "工具" }
  },
  setup(e) {
    const a = e, n = J(() => {
      const r = {
        padding: "12px 16px",
        minWidth: "140px",
        borderRadius: "12px",
        border: "1px solid #10b981",
        backgroundColor: "#ecfdf5",
        transition: "all 0.2s"
      };
      return a.selected && (r.border = "2px solid #10b981", r.boxShadow = "0 0 12px rgba(16, 185, 129, 0.4)"), { ...r, ...a.style };
    });
    return (r, o) => {
      var s, t;
      return H(), E(
        "div",
        {
          class: te(["ai-tool-node", { selected: e.selected, dragging: e.dragging }]),
          style: re(n.value)
        },
        [
          e.connectable ? (H(), E("div", xk)) : I("v-if", !0),
          b("div", Lk, [
            o[0] || (o[0] = b(
              "span",
              { class: "ai-node-icon" },
              "🔧",
              -1
              /* CACHED */
            )),
            b(
              "span",
              kk,
              ae(e.label || ((s = e.data) == null ? void 0 : s.label) || "工具"),
              1
              /* TEXT */
            )
          ]),
          b("div", Sk, [
            b(
              "div",
              Dk,
              ae(((t = e.data) == null ? void 0 : t.toolName) || "选择一个工具"),
              1
              /* TEXT */
            )
          ]),
          e.connectable ? (H(), E("div", Tk)) : I("v-if", !0)
        ],
        6
        /* CLASS, STYLE */
      );
    };
  }
}), Hk = /* @__PURE__ */ ue($k, [["__scopeId", "data-v-14c6f30f"]]), jk = {
  key: 0,
  class: "ai-handle ai-handle-target",
  "data-handle-type": "target",
  "data-handle-position": "left"
}, Ek = { class: "ai-node-header" }, Ck = { class: "ai-node-title" }, qk = { class: "ai-node-body" }, Ak = { class: "ai-node-condition" }, Rk = {
  key: 1,
  class: "ai-handle ai-handle-source",
  "data-handle-type": "source",
  "data-handle-position": "right"
}, Pk = {
  key: 2,
  class: "ai-handle ai-handle-source-bottom",
  "data-handle-type": "source",
  "data-handle-position": "bottom"
}, Ik = /* @__PURE__ */ ie({
  __name: "AiConditionNode",
  props: {
    id: {},
    type: {},
    data: {},
    selected: { type: Boolean, default: !1 },
    dragging: { type: Boolean, default: !1 },
    connectable: { type: Boolean, default: !0 },
    style: { default: () => ({}) },
    label: { default: "条件分支" }
  },
  setup(e) {
    const a = e, n = J(() => {
      const r = {
        padding: "12px 16px",
        minWidth: "140px",
        borderRadius: "12px",
        border: "1px solid #f43f5e",
        backgroundColor: "#fff1f2",
        transition: "all 0.2s"
      };
      return a.selected && (r.border = "2px solid #f43f5e", r.boxShadow = "0 0 12px rgba(244, 63, 94, 0.4)"), { ...r, ...a.style };
    });
    return (r, o) => {
      var s, t;
      return H(), E(
        "div",
        {
          class: te(["ai-condition-node", { selected: e.selected, dragging: e.dragging }]),
          style: re(n.value)
        },
        [
          e.connectable ? (H(), E("div", jk)) : I("v-if", !0),
          b("div", Ek, [
            o[0] || (o[0] = b(
              "span",
              { class: "ai-node-icon" },
              "🔀",
              -1
              /* CACHED */
            )),
            b(
              "span",
              Ck,
              ae(e.label || ((s = e.data) == null ? void 0 : s.label) || "条件分支"),
              1
              /* TEXT */
            )
          ]),
          b("div", qk, [
            b(
              "div",
              Ak,
              ae(((t = e.data) == null ? void 0 : t.condition) || "设置条件..."),
              1
              /* TEXT */
            )
          ]),
          e.connectable ? (H(), E("div", Rk)) : I("v-if", !0),
          e.connectable ? (H(), E("div", Pk)) : I("v-if", !0)
        ],
        6
        /* CLASS, STYLE */
      );
    };
  }
}), Nk = /* @__PURE__ */ ue(Ik, [["__scopeId", "data-v-a8d72181"]]), Ok = {
  key: 0,
  class: "ai-handle ai-handle-source",
  "data-handle-type": "source",
  "data-handle-position": "right"
}, zk = /* @__PURE__ */ ie({
  __name: "AiStartNode",
  props: {
    id: {},
    type: {},
    data: {},
    selected: { type: Boolean, default: !1 },
    dragging: { type: Boolean, default: !1 },
    connectable: { type: Boolean, default: !0 },
    style: { default: () => ({}) },
    label: { default: "开始" }
  },
  setup(e) {
    const a = e, n = J(() => {
      const r = {
        width: "48px",
        height: "48px",
        borderRadius: "50%",
        border: "2px solid #22c55e",
        backgroundColor: "#f0fdf4",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        transition: "all 0.2s"
      };
      return a.selected && (r.border = "3px solid #22c55e", r.boxShadow = "0 0 12px rgba(34, 197, 94, 0.5)"), { ...r, ...a.style };
    });
    return (r, o) => (H(), E(
      "div",
      {
        class: te(["ai-start-node", { selected: e.selected, dragging: e.dragging }]),
        style: re(n.value)
      },
      [
        o[0] || (o[0] = b(
          "span",
          { class: "ai-start-icon" },
          "▶",
          -1
          /* CACHED */
        )),
        e.connectable ? (H(), E("div", Ok)) : I("v-if", !0)
      ],
      6
      /* CLASS, STYLE */
    ));
  }
}), Fk = /* @__PURE__ */ ue(zk, [["__scopeId", "data-v-8093cf3c"]]), Bk = {
  key: 0,
  class: "ai-handle ai-handle-target",
  "data-handle-type": "target",
  "data-handle-position": "left"
}, Gk = /* @__PURE__ */ ie({
  __name: "AiEndNode",
  props: {
    id: {},
    type: {},
    data: {},
    selected: { type: Boolean, default: !1 },
    dragging: { type: Boolean, default: !1 },
    connectable: { type: Boolean, default: !0 },
    style: { default: () => ({}) },
    label: { default: "结束" }
  },
  setup(e) {
    const a = e, n = J(() => {
      const r = {
        width: "48px",
        height: "48px",
        borderRadius: "50%",
        border: "3px solid #ef4444",
        backgroundColor: "#fef2f2",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        transition: "all 0.2s"
      };
      return a.selected && (r.border = "4px solid #ef4444", r.boxShadow = "0 0 12px rgba(239, 68, 68, 0.5)"), { ...r, ...a.style };
    });
    return (r, o) => (H(), E(
      "div",
      {
        class: te(["ai-end-node", { selected: e.selected, dragging: e.dragging }]),
        style: re(n.value)
      },
      [
        o[0] || (o[0] = b(
          "span",
          { class: "ai-end-icon" },
          "■",
          -1
          /* CACHED */
        )),
        e.connectable ? (H(), E("div", Bk)) : I("v-if", !0)
      ],
      6
      /* CLASS, STYLE */
    ));
  }
}), Jk = /* @__PURE__ */ ue(Gk, [["__scopeId", "data-v-83555e5c"]]), Uk = {
  key: 0,
  class: "ai-handle ai-handle-target",
  "data-handle-type": "target",
  "data-handle-position": "left"
}, Wk = { class: "ai-node-header" }, Vk = { class: "ai-node-title" }, Kk = { class: "ai-node-body" }, Xk = { class: "ai-node-memory" }, Zk = {
  key: 1,
  class: "ai-handle ai-handle-source",
  "data-handle-type": "source",
  "data-handle-position": "right"
}, Qk = /* @__PURE__ */ ie({
  __name: "AiMemoryNode",
  props: {
    id: {},
    type: {},
    data: {},
    selected: { type: Boolean, default: !1 },
    dragging: { type: Boolean, default: !1 },
    connectable: { type: Boolean, default: !0 },
    style: { default: () => ({}) },
    label: { default: "记忆" }
  },
  setup(e) {
    const a = e, n = J(() => {
      const r = {
        padding: "12px 16px",
        minWidth: "140px",
        borderRadius: "12px",
        border: "1px solid #3b82f6",
        backgroundColor: "#eff6ff",
        transition: "all 0.2s"
      };
      return a.selected && (r.border = "2px solid #3b82f6", r.boxShadow = "0 0 12px rgba(59, 130, 246, 0.4)"), { ...r, ...a.style };
    });
    return (r, o) => {
      var s, t;
      return H(), E(
        "div",
        {
          class: te(["ai-memory-node", { selected: e.selected, dragging: e.dragging }]),
          style: re(n.value)
        },
        [
          e.connectable ? (H(), E("div", Uk)) : I("v-if", !0),
          b("div", Wk, [
            o[0] || (o[0] = b(
              "span",
              { class: "ai-node-icon" },
              "💾",
              -1
              /* CACHED */
            )),
            b(
              "span",
              Vk,
              ae(e.label || ((s = e.data) == null ? void 0 : s.label) || "记忆"),
              1
              /* TEXT */
            )
          ]),
          b("div", Kk, [
            b(
              "div",
              Xk,
              ae(((t = e.data) == null ? void 0 : t.memoryType) || "短期记忆"),
              1
              /* TEXT */
            )
          ]),
          e.connectable ? (H(), E("div", Zk)) : I("v-if", !0)
        ],
        6
        /* CLASS, STYLE */
      );
    };
  }
}), eS = /* @__PURE__ */ ue(Qk, [["__scopeId", "data-v-8db793a7"]]), nt = {
  LLM: "ai-llm",
  Prompt: "ai-prompt",
  Agent: "ai-agent",
  Tool: "ai-tool",
  Condition: "ai-condition",
  Start: "ai-start",
  End: "ai-end",
  Memory: "ai-memory"
};
function cF() {
  $e({ type: nt.LLM, component: ik }), $e({ type: nt.Prompt, component: pk }), $e({ type: nt.Agent, component: wk }), $e({ type: nt.Tool, component: Hk }), $e({ type: nt.Condition, component: Nk }), $e({ type: nt.Start, component: Fk }), $e({ type: nt.End, component: Jk }), $e({ type: nt.Memory, component: eS });
}
const tS = ["d"], rS = ["d"], nS = ["x", "y"], aS = { class: "flow-edge-label" }, oS = /* @__PURE__ */ ie({
  __name: "BaseEdge",
  props: {
    id: {},
    sourceX: {},
    sourceY: {},
    targetX: {},
    targetY: {},
    sourcePosition: { default: "right" },
    targetPosition: { default: "left" },
    style: { default: () => ({}) },
    selected: { type: Boolean, default: !1 },
    animated: { type: Boolean, default: !1 },
    label: { default: "" }
  },
  setup(e) {
    const a = e, n = J(() => {
      const { sourceX: o, sourceY: s, targetX: t, targetY: i } = a;
      return `M ${o} ${s} L ${t} ${i}`;
    }), r = J(() => ({
      ...a.style,
      strokeDasharray: a.animated ? "5,5" : void 0,
      animation: a.animated ? "dash 0.5s linear infinite" : void 0
    }));
    return (o, s) => (H(), E(
      "g",
      {
        class: te(["flow-base-edge", { selected: e.selected, animated: e.animated }])
      },
      [
        b("path", {
          d: n.value,
          fill: "none",
          style: re(r.value),
          "stroke-width": "2",
          stroke: "#b1b1b7"
        }, null, 12, tS),
        e.label ? (H(), E("path", {
          key: 0,
          d: n.value,
          fill: "none",
          stroke: "transparent",
          "stroke-width": "20",
          class: "flow-edge-label-path"
        }, null, 8, rS)) : I("v-if", !0),
        e.label ? (H(), E("foreignObject", {
          key: 1,
          x: (e.sourceX + e.targetX) / 2 - 30,
          y: (e.sourceY + e.targetY) / 2 - 10,
          width: "60",
          height: "20"
        }, [
          b(
            "div",
            aS,
            ae(e.label),
            1
            /* TEXT */
          )
        ], 8, nS)) : I("v-if", !0)
      ],
      2
      /* CLASS */
    ));
  }
}), _F = /* @__PURE__ */ ue(oS, [["__scopeId", "data-v-37f87f1e"]]), sS = ["d"], iS = ["x", "y"], uS = { class: "flow-edge-label" }, lS = /* @__PURE__ */ ie({
  __name: "SmoothEdge",
  props: {
    sourceX: {},
    sourceY: {},
    targetX: {},
    targetY: {},
    sourcePosition: { default: "right" },
    targetPosition: { default: "left" },
    style: { default: () => ({}) },
    selected: { type: Boolean, default: !1 },
    animated: { type: Boolean, default: !1 },
    label: { default: "" }
  },
  setup(e) {
    const a = e, n = J(() => (a.sourceX + a.targetX) / 2), r = J(() => (a.sourceY + a.targetY) / 2), o = J(() => {
      const { sourceX: t, sourceY: i, targetX: u, targetY: l, sourcePosition: d, targetPosition: c } = a, _ = Math.abs(u - t) * 0.5, f = Math.abs(l - i) * 0.5;
      let m = t, h = i, y = u, p = l;
      return d === "right" ? m += _ : d === "left" ? m -= _ : d === "bottom" ? h += f : d === "top" && (h -= f), c === "right" ? y += _ : c === "left" ? y -= _ : c === "bottom" ? p += f : c === "top" && (p -= f), `M ${t} ${i} C ${m} ${h}, ${y} ${p}, ${u} ${l}`;
    }), s = J(() => ({
      ...a.style,
      strokeDasharray: a.animated ? "5,5" : void 0,
      animation: a.animated ? "dash 0.5s linear infinite" : void 0
    }));
    return (t, i) => (H(), E(
      "g",
      {
        class: te(["flow-smooth-edge", { selected: e.selected, animated: e.animated }])
      },
      [
        b("path", {
          d: o.value,
          fill: "none",
          style: re(s.value),
          "stroke-width": "2",
          stroke: "#b1b1b7"
        }, null, 12, sS),
        e.label ? (H(), E("foreignObject", {
          key: 0,
          x: n.value - 30,
          y: r.value - 10,
          width: "60",
          height: "20"
        }, [
          b(
            "div",
            uS,
            ae(e.label),
            1
            /* TEXT */
          )
        ], 8, iS)) : I("v-if", !0)
      ],
      2
      /* CLASS */
    ));
  }
}), fF = /* @__PURE__ */ ue(lS, [["__scopeId", "data-v-3ae148d5"]]), dS = ["d"], cS = ["x", "y"], _S = { class: "flow-edge-label" }, fS = /* @__PURE__ */ ie({
  __name: "StepEdge",
  props: {
    sourceX: {},
    sourceY: {},
    targetX: {},
    targetY: {},
    sourcePosition: { default: "right" },
    targetPosition: { default: "left" },
    style: { default: () => ({}) },
    selected: { type: Boolean, default: !1 },
    animated: { type: Boolean, default: !1 },
    label: { default: "" }
  },
  setup(e) {
    const a = e, n = J(() => {
      const { sourceX: t, sourceY: i, targetX: u, targetY: l } = a, d = (t + u) / 2;
      return `M ${t} ${i} H ${d} V ${l} H ${u}`;
    }), r = J(() => (a.sourceX + a.targetX) / 2), o = J(() => (a.sourceY + a.targetY) / 2), s = J(() => ({
      ...a.style,
      strokeDasharray: a.animated ? "5,5" : void 0
    }));
    return (t, i) => (H(), E(
      "g",
      {
        class: te(["flow-step-edge", { selected: e.selected, animated: e.animated }])
      },
      [
        b("path", {
          d: n.value,
          fill: "none",
          style: re(s.value),
          "stroke-width": "2",
          stroke: "#b1b1b7"
        }, null, 12, dS),
        e.label ? (H(), E("foreignObject", {
          key: 0,
          x: r.value - 30,
          y: o.value - 10,
          width: "60",
          height: "20"
        }, [
          b(
            "div",
            _S,
            ae(e.label),
            1
            /* TEXT */
          )
        ], 8, cS)) : I("v-if", !0)
      ],
      2
      /* CLASS */
    ));
  }
}), mF = /* @__PURE__ */ ue(fS, [["__scopeId", "data-v-11cb7800"]]), mS = ["d"], pS = ["x", "y"], hS = { class: "flow-edge-label" }, vS = /* @__PURE__ */ ie({
  __name: "BezierEdge",
  props: {
    sourceX: {},
    sourceY: {},
    targetX: {},
    targetY: {},
    sourcePosition: { default: "right" },
    targetPosition: { default: "left" },
    style: { default: () => ({}) },
    selected: { type: Boolean, default: !1 },
    animated: { type: Boolean, default: !1 },
    label: { default: "" }
  },
  setup(e) {
    const a = e, n = J(() => {
      const { sourceX: t, sourceY: i, targetX: u, targetY: l, sourcePosition: d, targetPosition: c } = a, _ = 0.5;
      let f = t, m = i, h = u, y = l;
      const p = Math.abs(u - t) * _, v = Math.abs(l - i) * _;
      return d === "right" ? f += p : d === "left" ? f -= p : d === "bottom" ? m += v : d === "top" && (m -= v), c === "right" ? h += p : c === "left" ? h -= p : c === "bottom" ? y += v : c === "top" && (y -= v), `M ${t} ${i} C ${f} ${m}, ${h} ${y}, ${u} ${l}`;
    }), r = J(() => (a.sourceX + a.targetX) / 2), o = J(() => (a.sourceY + a.targetY) / 2), s = J(() => ({
      ...a.style,
      strokeDasharray: a.animated ? "5,5" : void 0,
      animation: a.animated ? "dash 0.5s linear infinite" : void 0
    }));
    return (t, i) => (H(), E(
      "g",
      {
        class: te(["flow-bezier-edge", { selected: e.selected, animated: e.animated }])
      },
      [
        b("path", {
          d: n.value,
          fill: "none",
          style: re(s.value),
          "stroke-width": "2",
          stroke: "#b1b1b7"
        }, null, 12, mS),
        e.label ? (H(), E("foreignObject", {
          key: 0,
          x: r.value - 30,
          y: o.value - 10,
          width: "60",
          height: "20"
        }, [
          b(
            "div",
            hS,
            ae(e.label),
            1
            /* TEXT */
          )
        ], 8, pS)) : I("v-if", !0)
      ],
      2
      /* CLASS */
    ));
  }
}), pF = /* @__PURE__ */ ue(vS, [["__scopeId", "data-v-5753d51f"]]), yS = ["id"], gS = ["stdDeviation"], MS = ["id"], bS = ["stop-color"], YS = ["stop-color"], wS = ["d"], xS = ["d", "filter"], LS = ["d"], kS = ["d"], SS = ["id", "d"], DS = ["fill"], TS = ["dur", "begin"], $S = ["href"], HS = ["d"], jS = ["x", "y"], ES = { class: "flow-data-flow-label" }, CS = ["transform"], qS = ["fill"], AS = ["fill"], RS = /* @__PURE__ */ ie({
  __name: "DataFlowEdge",
  props: {
    edge: {},
    path: {},
    sourceX: {},
    sourceY: {},
    targetX: {},
    targetY: {},
    labelX: { default: void 0 },
    labelY: { default: void 0 },
    style: { default: () => ({}) },
    stroke: { default: "#b1b1b7" },
    strokeWidth: { default: 2 },
    sourcePosition: { default: "right" },
    targetPosition: { default: "left" }
  },
  setup(e) {
    Gw((B) => ({
      v0d0272c7: `${i.value}s`
    }));
    const a = e, n = J(() => {
      var B;
      return ((B = a.edge) == null ? void 0 : B.data) ?? {};
    }), r = J(() => n.value.flowStatus ?? "idle"), o = J(() => n.value.flowEffect ?? "particles"), s = J(() => n.value.glowIntensity ?? 8), t = J(() => n.value.particleCount ?? 3), i = J(() => n.value.animationDuration ?? 2), u = J(() => {
      var B;
      return ((B = a.edge) == null ? void 0 : B.selected) ?? !1;
    }), l = J(() => {
      var B;
      return ((B = a.edge) == null ? void 0 : B.animated) ?? !1;
    }), d = J(() => {
      var B;
      return ((B = a.edge) == null ? void 0 : B.label) ?? "";
    }), c = J(() => {
      var B;
      return ((B = a.edge) == null ? void 0 : B.id) ?? "";
    }), _ = J(() => a.strokeWidth ?? 2), f = {
      idle: { primary: "#b1b1b7", glow: "#b1b1b7", particle: "#d1d1d7" },
      processing: { primary: "#6366f1", glow: "#4f46e5", particle: "#818cf8" },
      success: { primary: "#10b981", glow: "#059669", particle: "#34d399" },
      error: { primary: "#ef4444", glow: "#dc2626", particle: "#f87171" },
      warning: { primary: "#f59e0b", glow: "#d97706", particle: "#fcd34d" }
    }, m = J(() => f[r.value]), h = J(() => a.labelX ?? (a.sourceX + a.targetX) / 2), y = J(() => a.labelY ?? (a.sourceY + a.targetY) / 2), p = J(() => `data-flow-glow-${c.value}`), v = J(() => `data-flow-grad-${c.value}`), g = J(() => `data-flow-path-${c.value}`), M = J(
      () => Array.from({ length: t.value }, (B, $) => ({
        key: $,
        delay: $ / t.value * i.value
      }))
    ), Y = J(
      () => r.value === "processing" || r.value === "success" || r.value === "error" || r.value === "warning"
    ), L = J(
      () => Y.value && (o.value === "glow" || o.value === "particles")
    ), D = J(() => ({
      stroke: m.value.primary,
      strokeWidth: _.value,
      strokeDasharray: l.value && !Y.value ? "5,5" : void 0,
      ...a.style ?? {}
    })), w = J(() => ({
      stroke: "transparent",
      strokeWidth: Math.max(_.value * 5, 20),
      fill: "none"
    })), T = ee(0.8);
    let k = null;
    function S() {
      k && clearInterval(k), k = setInterval(
        () => {
          T.value = T.value === 0.8 ? 0.2 : 0.8;
        },
        i.value * 1e3 / 2
      );
    }
    function F() {
      k && (clearInterval(k), k = null);
    }
    return Ct(() => {
      o.value === "pulse" && Y.value && S();
    }), Jw(() => F()), Le([o, Y], ([B, $]) => {
      F(), B === "pulse" && $ && S();
    }), (B, $) => (H(), E(
      "g",
      {
        class: te([
          "flow-data-flow-edge",
          `status-${r.value}`,
          `effect-${o.value}`,
          { selected: u.value, animated: l.value }
        ])
      },
      [
        I(" SVG 滤镜/渐变定义 "),
        b("defs", null, [
          I(" 发光模糊滤镜 "),
          b("filter", {
            id: p.value,
            x: "-60%",
            y: "-60%",
            width: "220%",
            height: "220%"
          }, [
            b("feGaussianBlur", {
              stdDeviation: s.value / 3,
              result: "blur"
            }, null, 8, gS),
            $[0] || ($[0] = b(
              "feMerge",
              null,
              [
                b("feMergeNode", { in: "blur" }),
                b("feMergeNode", { in: "SourceGraphic" })
              ],
              -1
              /* CACHED */
            ))
          ], 8, yS),
          I(" 粒子径向渐变（中心亮、边缘透明） "),
          b("radialGradient", {
            id: v.value,
            cx: "50%",
            cy: "50%",
            r: "50%"
          }, [
            b("stop", {
              offset: "0%",
              "stop-color": m.value.particle,
              "stop-opacity": "1"
            }, null, 8, bS),
            b("stop", {
              offset: "100%",
              "stop-color": m.value.primary,
              "stop-opacity": "0"
            }, null, 8, YS)
          ], 8, MS)
        ]),
        I(" ① 发光底层（glow / particles 模式下激活） "),
        L.value ? (H(), E("path", {
          key: 0,
          d: e.path,
          class: "flow-edge-glow",
          style: re({
            stroke: m.value.glow,
            strokeWidth: _.value * 4,
            opacity: 0.35,
            filter: `url(#${p.value})`
          }),
          fill: "none"
        }, null, 12, wS)) : I("v-if", !0),
        I(" ② 主线条 "),
        b("path", {
          d: e.path,
          class: "flow-edge-main",
          style: re(D.value),
          fill: "none",
          filter: L.value ? `url(#${p.value})` : void 0
        }, null, 12, xS),
        I(" ③ pulse 模式：叠加闪烁层 "),
        o.value === "pulse" && Y.value ? (H(), E("path", {
          key: 1,
          d: e.path,
          class: "flow-edge-pulse",
          style: re({
            stroke: m.value.primary,
            strokeWidth: _.value + 2,
            opacity: T.value,
            transition: `opacity ${i.value / 2}s ease-in-out`,
            filter: `url(#${p.value})`
          }),
          fill: "none"
        }, null, 12, LS)) : I("v-if", !0),
        I(" ④ wave 模式：流动虚线 "),
        o.value === "wave" && Y.value ? (H(), E("path", {
          key: 2,
          d: e.path,
          class: "flow-edge-wave",
          style: re({
            stroke: m.value.particle,
            strokeWidth: _.value,
            strokeDasharray: "8 4",
            fill: "none"
          })
        }, null, 12, kS)) : I("v-if", !0),
        I(" ⑤ particles 模式：粒子沿路径流动 "),
        o.value === "particles" && Y.value ? (H(), E(
          pe,
          { key: 3 },
          [
            I(" 供 animateMotion 引用的命名路径（不可见） "),
            b("path", {
              id: g.value,
              d: e.path,
              fill: "none",
              stroke: "none"
            }, null, 8, SS),
            (H(!0), E(
              pe,
              null,
              ke(M.value, (x) => (H(), E("circle", {
                key: x.key,
                r: "4",
                fill: `url(#${v.value})`,
                class: "flow-particle"
              }, [
                b("animateMotion", {
                  dur: `${i.value}s`,
                  begin: `${x.delay}s`,
                  repeatCount: "indefinite",
                  calcMode: "spline",
                  keySplines: "0.5 0 0.5 1",
                  keyTimes: "0;1",
                  rotate: "auto"
                }, [
                  b("mpath", {
                    href: `#${g.value}`
                  }, null, 8, $S)
                ], 8, TS)
              ], 8, DS))),
              128
              /* KEYED_FRAGMENT */
            ))
          ],
          64
          /* STABLE_FRAGMENT */
        )) : I("v-if", !0),
        I(" ⑥ 点击热区（扩大交互面积，不可见） "),
        b("path", {
          d: e.path,
          style: re(w.value),
          class: "flow-edge-hitarea"
        }, null, 12, HS),
        I(" ⑦ 连线标签 "),
        d.value ? (H(), E("foreignObject", {
          key: 4,
          x: h.value - 38,
          y: y.value - 14,
          width: "76",
          height: "28"
        }, [
          b(
            "div",
            ES,
            ae(d.value),
            1
            /* TEXT */
          )
        ], 8, jS)) : I("v-if", !0),
        I(" ⑧ 状态指示点（无标签时显示） "),
        r.value !== "idle" && !d.value ? (H(), E("g", {
          key: 5,
          transform: `translate(${h.value}, ${y.value})`
        }, [
          b("circle", {
            r: "9",
            fill: m.value.primary,
            opacity: "0.12"
          }, null, 8, qS),
          b("circle", {
            r: "4",
            fill: m.value.primary
          }, null, 8, AS)
        ], 8, CS)) : I("v-if", !0)
      ],
      2
      /* CLASS */
    ));
  }
}), hF = /* @__PURE__ */ ue(RS, [["__scopeId", "data-v-bf3b4bf1"]]), PS = {
  class: "yh-flow-edges",
  style: { overflow: "visible", position: "absolute", top: "0", left: "0", width: "100%", height: "100%", "pointer-events": "none", "z-index": "5" }
}, IS = ["id"], NS = ["x", "y", "width"], OS = ["data-edge-id", "onClick", "onDblclick", "onContextmenu"], zS = ["d"], FS = ["d", "stroke", "stroke-width", "mask"], BS = ["x", "y"], GS = { style: { width: "100%", height: "100%", display: "flex", "align-items": "center", "justify-content": "center" } }, JS = /* @__PURE__ */ ie({
  __name: "EdgeRenderer",
  props: {
    edges: {},
    nodes: {},
    edgeTypes: {},
    transform: {},
    connectingEdge: {},
    updatingEdgeId: {}
  },
  emits: ["edge-click", "edge-dblclick", "edge-contextmenu", "edge-update-start"],
  setup(e, { emit: a }) {
    const n = e, r = (u) => {
      var l;
      return n.edgeTypes && n.edgeTypes[u] ? n.edgeTypes[u] : (l = mx(u || "default")) == null ? void 0 : l.component;
    }, o = a, s = J(() => {
      const u = /* @__PURE__ */ new Map();
      return n.nodes.forEach((l) => u.set(l.id, l)), u;
    }), t = (u) => {
      if (!u) return {};
      const l = {
        color: u.labelColor || "var(--flow-edge-label-color, #000)",
        ...u.labelStyle
      };
      return u.labelShowBg === !0 ? (l.backgroundColor = u.labelBgColor || "var(--flow-edge-label-background, #f1f5f9)", l.padding = "0 6px", l.borderRadius = "2px", l.border = "1px solid var(--flow-edge-stroke, #ddd)") : l.backgroundColor = "transparent", l;
    }, i = J(() => {
      var l, d;
      const u = [];
      for (const c of n.edges) {
        if (!c || c.hidden || n.updatingEdgeId && c.id === n.updatingEdgeId) continue;
        const _ = s.value.get(c.source), f = s.value.get(c.target);
        if (!_ || !f) continue;
        const m = c.sourceHandle || "right", h = c.targetHandle || "left", y = gt(_, m, c.sourceHandle), p = gt(f, h, c.targetHandle), v = {
          sourceX: y.x,
          sourceY: y.y,
          targetX: p.x,
          targetY: p.y,
          sourcePosition: m,
          targetPosition: h
        }, g = c.type || "bezier", M = Pg(g, v), Y = dx({ ...v, type: g }), D = (c.label || "").replace(/<[^>]*>/g, ""), w = Math.min(D.length * 7, 120), T = ((l = c.style) == null ? void 0 : l.stroke) || (c.selected ? "var(--flow-edge-selected-stroke, #3b82f6)" : "var(--flow-edge-stroke, #b1b1b7)"), k = ((d = c.style) == null ? void 0 : d.strokeWidth) ?? 1.5;
        u.push({
          edge: c,
          style: c.style,
          path: M,
          sourceX: y.x,
          sourceY: y.y,
          targetX: p.x,
          targetY: p.y,
          labelX: Y.x,
          labelY: Y.y,
          labelWidth: w,
          stroke: T,
          strokeWidth: k
        });
      }
      return u;
    });
    return (u, l) => (H(), E("svg", PS, [
      b("defs", null, [
        I(" Dynamic masks to create a true gap in the line behind the label "),
        (H(!0), E(
          pe,
          null,
          ke(i.value, (d) => (H(), E("mask", {
            key: `mask-${d.edge.id}`,
            id: `yh-mask-${d.edge.id.replace(/\s/g, "")}`
          }, [
            l[0] || (l[0] = b(
              "rect",
              {
                x: "-5000",
                y: "-5000",
                width: "10000",
                height: "10000",
                fill: "white"
              },
              null,
              -1
              /* CACHED */
            )),
            b("rect", {
              x: d.labelX - d.labelWidth / 2 - 4,
              y: d.labelY - 10,
              width: d.labelWidth + 8,
              height: "20",
              fill: "black"
            }, null, 8, NS)
          ], 8, IS))),
          128
          /* KEYED_FRAGMENT */
        ))
      ]),
      (H(!0), E(
        pe,
        null,
        ke(i.value, (d) => (H(), E("g", {
          key: d.edge.id,
          class: te(["yh-flow-edge-group", { "is-selected": d.edge.selected, "is-animated": d.edge.animated }]),
          "data-edge-id": d.edge.id,
          style: re({
            color: d.stroke,
            pointerEvents: "auto",
            cursor: "pointer",
            "--stroke-width": d.strokeWidth + "px"
          }),
          onClick: we((c) => o("edge-click", c, d.edge), ["stop"]),
          onDblclick: we((c) => o("edge-dblclick", c, d.edge), ["stop"]),
          onContextmenu: we((c) => o("edge-contextmenu", c, d.edge), ["stop", "prevent"])
        }, [
          ut(u.$slots, "edge", Ht({ ref_for: !0 }, d), () => [
            I(" Automatic Custom Edge Component "),
            r(d.edge.type || "default") ? (H(), Ve(
              Pa(r(d.edge.type || "default")),
              Ht({
                key: 0,
                ref_for: !0
              }, d),
              null,
              16
              /* FULL_PROPS */
            )) : (H(), E(
              pe,
              { key: 1 },
              [
                I(" Interaction Path (Hitbox) "),
                b("path", {
                  d: d.path,
                  stroke: "transparent",
                  "stroke-width": "20",
                  fill: "none",
                  style: { cursor: "pointer", "pointer-events": "all" }
                }, null, 8, zS),
                I(" Visible Path "),
                b("path", {
                  d: d.path,
                  stroke: d.stroke,
                  "stroke-width": d.strokeWidth,
                  fill: "none",
                  class: te({ "yh-flow-edge-path": !0, "is-animated": d.edge.animated }),
                  mask: d.edge.label ? `url(#yh-mask-${d.edge.id.replace(/\s/g, "")})` : void 0,
                  style: re({
                    pointerEvents: "none",
                    transition: "stroke 0.2s, stroke-width 0.2s",
                    stroke: d.stroke
                  })
                }, null, 14, FS),
                I(" Default Label "),
                d.edge.label ? (H(), E("foreignObject", {
                  key: 0,
                  x: d.labelX - 75,
                  y: d.labelY - 15,
                  width: "150",
                  height: "30",
                  style: { "pointer-events": "auto" }
                }, [
                  b("div", GS, [
                    b(
                      "div",
                      {
                        class: "yh-flow-edge-label",
                        style: re(t(d.edge))
                      },
                      ae(d.edge.label),
                      5
                      /* TEXT, STYLE */
                    )
                  ])
                ], 8, BS)) : I("v-if", !0)
              ],
              64
              /* STABLE_FRAGMENT */
            ))
          ], !0)
        ], 46, OS))),
        128
        /* KEYED_FRAGMENT */
      ))
    ]));
  }
}), US = /* @__PURE__ */ ue(JS, [["__scopeId", "data-v-607ce8de"]]), WS = {
  class: "yh-flow-edge-handles",
  style: { overflow: "visible", position: "absolute", top: "0", left: "0", width: "100%", height: "100%", "pointer-events": "none", "z-index": "10" }
}, VS = ["onMousedown"], KS = ["cx", "cy"], XS = ["cx", "cy"], ZS = ["onMousedown"], QS = ["cx", "cy"], e0 = ["cx", "cy"], t0 = /* @__PURE__ */ ie({
  __name: "EdgeHandlesRenderer",
  props: {
    edges: {},
    nodes: {}
  },
  emits: ["edge-update-start"],
  setup(e, { emit: a }) {
    const n = e, r = a, o = J(() => {
      const t = /* @__PURE__ */ new Map();
      return n.nodes.forEach((i) => t.set(i.id, i)), t;
    }), s = J(() => {
      const t = [];
      for (const i of n.edges)
        if (i && i.selected && i.updatable) {
          const u = o.value.get(i.source), l = o.value.get(i.target);
          if (!u || !l) continue;
          const d = i.sourceHandle || "right", c = i.targetHandle || "left", _ = gt(u, d, i.sourceHandle), f = gt(l, c, i.targetHandle);
          t.push({
            edge: i,
            sourceX: _.x,
            sourceY: _.y,
            targetX: f.x,
            targetY: f.y
          });
        }
      return t;
    });
    return (t, i) => (H(), E("svg", WS, [
      (H(!0), E(
        pe,
        null,
        ke(s.value, (u) => (H(), E("g", {
          key: u.edge.id
        }, [
          I(" Source Handle with interaction overlay "),
          u.edge.updatable === !0 || u.edge.updatable === "source" ? (H(), E("g", {
            key: 0,
            class: "yh-flow-edge-handle-group",
            style: { cursor: "crosshair", "pointer-events": "auto" },
            onMousedown: we((l) => r("edge-update-start", l, u.edge, "source"), ["stop"])
          }, [
            b("circle", {
              cx: u.sourceX,
              cy: u.sourceY,
              r: "10",
              fill: "transparent"
            }, null, 8, KS),
            b("circle", {
              cx: u.sourceX,
              cy: u.sourceY,
              r: "4",
              fill: "#3b82f6"
            }, null, 8, XS)
          ], 40, VS)) : I("v-if", !0),
          I(" Target Handle with interaction overlay "),
          u.edge.updatable === !0 || u.edge.updatable === "target" ? (H(), E("g", {
            key: 1,
            class: "yh-flow-edge-handle-group",
            style: { cursor: "crosshair", "pointer-events": "auto" },
            onMousedown: we((l) => r("edge-update-start", l, u.edge, "target"), ["stop"])
          }, [
            b("circle", {
              cx: u.targetX,
              cy: u.targetY,
              r: "10",
              fill: "transparent"
            }, null, 8, QS),
            b("circle", {
              cx: u.targetX,
              cy: u.targetY,
              r: "4",
              fill: "#1a192b"
            }, null, 8, e0)
          ], 40, ZS)) : I("v-if", !0)
        ]))),
        128
        /* KEYED_FRAGMENT */
      ))
    ]));
  }
}), r0 = { class: "yh-flow-nodes" }, n0 = ["id", "onMousedown", "onClick", "onDblclick", "onContextmenu"], a0 = ["data-handle-id", "onMousedown"], o0 = ["data-handle-id", "onMousedown"], s0 = { class: "yh-flow-node__content" }, kc = 3, i0 = /* @__PURE__ */ ie({
  __name: "NodeRenderer",
  props: {
    nodes: {},
    nodeTypes: { default: () => ({}) },
    transform: {},
    draggable: { type: Boolean, default: !0 },
    connectable: { type: Boolean, default: !0 },
    readonly: { type: Boolean, default: !1 }
  },
  emits: ["node-click", "node-dblclick", "node-contextmenu", "node-drag-start", "node-drag", "node-drag-end", "connect-start", "node-select-toggle"],
  setup(e, { emit: a }) {
    const n = e, r = a, o = (w) => {
      var T, k;
      return w === "diamond" ? iL : w === "database" ? pL : n.nodeTypes && n.nodeTypes[w] ? n.nodeTypes[w] : ((T = Ng(w)) == null ? void 0 : T.component) || ((k = vx(w)) == null ? void 0 : k.component);
    }, s = J(() => n.nodes.filter((w) => !w.hidden)), t = (w) => {
      const T = w.width || 150, k = w.height || 40;
      let S = w.zIndex || 10;
      return w.type === "group" ? S = w.selected ? 2 : 1 : S = w.selected ? 100 : Math.max(10, S), {
        transform: `translate(${w.position.x}px, ${w.position.y}px)`,
        width: `${T}px`,
        height: `${k}px`,
        zIndex: S,
        "--flow-node-label-color": w.labelColor,
        "--flow-node-description-color": w.descriptionColor,
        ...w.style
      };
    }, i = (w) => {
      const {
        id: T,
        type: k,
        data: S,
        position: F,
        width: B,
        height: $,
        selected: x,
        dragging: j,
        connectable: G,
        zIndex: z,
        style: W,
        labelColor: Z,
        descriptionColor: K
      } = w;
      return {
        id: T,
        type: k,
        data: S,
        position: F,
        width: B,
        height: $,
        selected: x,
        dragging: j,
        connectable: G,
        zIndex: z,
        style: W,
        labelColor: Z,
        descriptionColor: K
      };
    }, u = (w, T) => {
      if (w.handleBounds) {
        const k = [];
        return w.handleBounds.top && k.push(...w.handleBounds.top), w.handleBounds.right && k.push(...w.handleBounds.right), w.handleBounds.bottom && k.push(...w.handleBounds.bottom), w.handleBounds.left && k.push(...w.handleBounds.left), k.filter((S) => S.type === T);
      }
      return w.type === "group" ? [] : w.type === "input" ? T === "source" ? [{ type: "source", position: "right" }] : [] : w.type === "output" ? T === "target" ? [{ type: "target", position: "left" }] : [] : w.type === "bpmn-start" ? T === "source" ? [{ type: "source", position: "right" }] : [] : w.type === "bpmn-end" ? T === "target" ? [{ type: "target", position: "left" }] : [] : w.type === "bpmn-task" || w.type === "bpmn-service-task" || w.type === "bpmn-user-task" ? T === "source" ? [{ type: "source", position: "right" }] : [{ type: "target", position: "left" }] : w.type === "bpmn-exclusive-gateway" || w.type === "bpmn-parallel-gateway" || w.type === "bpmn-inclusive-gateway" ? T === "source" ? [
        { type: "source", position: "right" },
        { type: "source", position: "bottom" }
      ] : [{ type: "target", position: "left" }] : w.type === "ai-start" ? T === "source" ? [{ type: "source", position: "right" }] : [] : w.type === "ai-end" ? T === "target" ? [{ type: "target", position: "left" }] : [] : w.type === "ai-llm" || w.type === "ai-prompt" || w.type === "ai-agent" || w.type === "ai-tool" || w.type === "ai-memory" ? T === "source" ? [{ type: "source", position: "right" }] : [{ type: "target", position: "left" }] : w.type === "ai-condition" ? T === "source" ? [
        { type: "source", position: "right" },
        { type: "source", position: "bottom" }
      ] : [{ type: "target", position: "left" }] : T === "source" ? [
        { type: "source", position: "right" },
        { type: "source", position: "bottom" }
      ] : [
        { type: "target", position: "left" },
        { type: "target", position: "top" }
      ];
    }, l = ee(null), d = ee({ x: 0, y: 0 }), c = ee({ x: 0, y: 0 }), _ = ee([]), f = ee(/* @__PURE__ */ new Map()), m = ee(!1), h = ee(null), y = ee(null), p = (w, T) => {
      if (n.readonly || !n.draggable || T.draggable === !1) return;
      const k = w.target;
      if (k.closest(".yh-flow-handle") || k.closest(".resizer-handle") || k.closest(".yh-flow-node-toolbar"))
        return;
      const S = window.getSelection();
      S && S.removeAllRanges(), h.value = T, y.value = w, m.value = !1;
      const F = T.selected, B = /* @__PURE__ */ new Set(), $ = (z) => {
        B.has(z) || (B.add(z), n.nodes.forEach((W) => {
          W.parentId === z && $(W.id);
        }));
      }, x = w.shiftKey || w.metaKey || w.ctrlKey, j = n.nodes.filter((z) => z.selected && z.id !== T.id);
      let G = [T.id];
      (x || F) && j.length > 0 && (G = [T.id, ...j.map((z) => z.id)]), G.forEach($), _.value = Array.from(B), f.value = /* @__PURE__ */ new Map(), _.value.forEach((z) => {
        const W = n.nodes.find((Z) => Z.id === z);
        W && f.value.set(z, { ...W.position });
      }), _.value.length === 1 ? (l.value = T.id, c.value = { ...T.position }) : l.value = null, d.value = { x: w.clientX, y: w.clientY }, document.addEventListener("mousemove", v), document.addEventListener("mouseup", g);
    }, v = (w) => {
      if (_.value.length === 0) return;
      const T = w.clientX - d.value.x, k = w.clientY - d.value.y;
      if (!m.value && Math.abs(T) < kc && Math.abs(k) < kc)
        return;
      if (!m.value) {
        m.value = !0;
        const B = h.value;
        B && r("node-drag-start", w, B);
      }
      const S = (w.clientX - d.value.x) / n.transform.zoom, F = (w.clientY - d.value.y) / n.transform.zoom;
      _.value.forEach((B) => {
        const $ = f.value.get(B);
        if ($) {
          const x = {
            x: $.x + S,
            y: $.y + F
          }, j = n.nodes.find((G) => G.id === B);
          j && r("node-drag", w, j, x);
        }
      });
    }, g = (w) => {
      _.value.length > 0 && (m.value && _.value.forEach((T) => {
        const k = n.nodes.find((S) => S.id === T);
        k && r("node-drag-end", w, k);
      }), _.value = [], f.value = /* @__PURE__ */ new Map()), !m.value && h.value && r("node-click", w, h.value), l.value = null, h.value = null, y.value = null, document.removeEventListener("mousemove", v), document.removeEventListener("mouseup", g);
    }, M = (w, T) => {
    }, Y = (w, T) => {
      r("node-dblclick", w, T);
    }, L = (w, T) => {
      r("node-contextmenu", w, T);
    }, D = (w, T, k) => {
      r("connect-start", w, T.id, k.id || k.position || "", k.type);
    };
    return (w, T) => (H(), E("div", r0, [
      (H(!0), E(
        pe,
        null,
        ke(s.value, (k) => (H(), E("div", {
          key: k.id,
          id: `node-${k.id}`,
          class: te(["yh-flow-node", {
            "is-selected": k.selected,
            "is-dragging": k.dragging,
            "is-hidden": k.hidden,
            [`type-${k.type}`]: !0
          }]),
          style: re(t(k)),
          onMousedown: (S) => p(S, k),
          onClick: (S) => M(),
          onDblclick: (S) => Y(S, k),
          onContextmenu: (S) => L(S, k)
        }, [
          I(" Handle (连接点) "),
          n.connectable !== !1 && k.connectable !== !1 ? (H(), E(
            pe,
            { key: 0 },
            [
              I(" Source handles "),
              (H(!0), E(
                pe,
                null,
                ke(u(k, "source"), (S) => (H(), E("div", {
                  key: `handle-source-${S.id || S.position}`,
                  class: te(["yh-flow-handle is-source", `position-${S.position}`]),
                  "data-handle-id": S.id,
                  "data-handle-type": "source",
                  onMousedown: we((F) => D(F, k, S), ["stop"])
                }, null, 42, a0))),
                128
                /* KEYED_FRAGMENT */
              )),
              I(" Target handles "),
              (H(!0), E(
                pe,
                null,
                ke(u(k, "target"), (S) => (H(), E("div", {
                  key: `handle-target-${S.id || S.position}`,
                  class: te(["yh-flow-handle is-target", `position-${S.position}`]),
                  "data-handle-id": S.id,
                  "data-handle-type": "target",
                  onMousedown: we((F) => D(F, k, S), ["stop"])
                }, null, 42, o0))),
                128
                /* KEYED_FRAGMENT */
              ))
            ],
            64
            /* STABLE_FRAGMENT */
          )) : I("v-if", !0),
          I(" 节点内容 "),
          b("div", s0, [
            ut(w.$slots, "node", { node: k }, () => {
              var S;
              return [
                I(" Automatic Custom Node Component "),
                o(k.type) ? (H(), Ve(Pa(o(k.type)), Ht({
                  key: 0,
                  ref_for: !0
                }, i(k), { node: k }), null, 16, ["node"])) : (H(), E(
                  "div",
                  {
                    key: 1,
                    class: "yh-flow-node__header",
                    style: re({ color: k.labelColor })
                  },
                  ae(((S = k.data) == null ? void 0 : S.label) || k.id),
                  5
                  /* TEXT, STYLE */
                ))
              ];
            }, !0)
          ])
        ], 46, n0))),
        128
        /* KEYED_FRAGMENT */
      ))
    ]));
  }
}), u0 = /* @__PURE__ */ ue(i0, [["__scopeId", "data-v-94f30314"]]), l0 = /* @__PURE__ */ ie({
  __name: "SelectionBox",
  props: {
    selectionRect: {},
    transform: {}
  },
  setup(e) {
    const a = e, n = J(() => {
      if (!a.selectionRect) return {};
      const r = a.selectionRect.x * a.transform.zoom + a.transform.x, o = a.selectionRect.y * a.transform.zoom + a.transform.y, s = a.selectionRect.width * a.transform.zoom, t = a.selectionRect.height * a.transform.zoom;
      return {
        left: `${r}px`,
        top: `${o}px`,
        width: `${s}px`,
        height: `${t}px`
      };
    });
    return (r, o) => e.selectionRect ? (H(), E(
      "div",
      {
        key: 0,
        class: "yh-flow-selection-box",
        style: re(n.value)
      },
      null,
      4
      /* STYLE */
    )) : I("v-if", !0);
  }
}), d0 = /* @__PURE__ */ ue(l0, [["__scopeId", "data-v-8a84ee03"]]), c0 = {
  key: 0,
  class: "node-edit-panel"
}, _0 = { class: "panel-content" }, f0 = { class: "form-group" }, m0 = { class: "form-group" }, p0 = { class: "form-group" }, h0 = { class: "size-inputs" }, v0 = { class: "form-group" }, y0 = { class: "color-picker-row" }, g0 = ["value"], M0 = { class: "color-value" }, b0 = { class: "form-group" }, Y0 = { class: "color-picker-row" }, w0 = ["value"], x0 = { class: "color-value" }, L0 = { class: "form-group" }, k0 = ["value"], S0 = { class: "form-group" }, D0 = { class: "color-picker-row" }, T0 = ["value"], $0 = { class: "color-value" }, H0 = { class: "form-group" }, j0 = { class: "color-picker-row" }, E0 = ["value"], C0 = { class: "color-value" }, q0 = /* @__PURE__ */ ie({
  __name: "NodeEditPanel",
  props: {
    node: {},
    visible: { type: Boolean }
  },
  emits: ["update", "close"],
  setup(e, { emit: a }) {
    const n = e, r = a, o = ee({
      label: "",
      description: ""
    });
    Le(
      () => n.node,
      (m) => {
        var h, y;
        if (m) {
          const p = m.data, v = p.label || p.title || p.name || p.text || m.id;
          o.value = {
            label: String(v),
            description: p.description || p.desc || "",
            labelColor: m.labelColor || "#303133",
            descriptionColor: m.descriptionColor || "#909399",
            width: m.width || ((h = document.getElementById(`node-${m.id}`)) == null ? void 0 : h.offsetWidth) || 150,
            height: m.height || ((y = document.getElementById(`node-${m.id}`)) == null ? void 0 : y.offsetHeight) || 40,
            type: m.type
          };
        }
      },
      { immediate: !0 }
    );
    const s = (m) => {
      o.value.labelColor = m, r("update", { labelColor: m });
    }, t = (m) => {
      o.value.descriptionColor = m, r("update", { descriptionColor: m });
    }, i = () => {
      if (!n.node) return;
      const m = { ...n.node.data };
      "label" in m || !("title" in m || "name" in m || "text" in m) ? m.label = o.value.label : "title" in m ? m.title = o.value.label : "name" in m ? m.name = o.value.label : "text" in m && (m.text = o.value.label), r("update", { data: m });
    }, u = () => {
      if (!n.node) return;
      const m = { ...n.node.data };
      "description" in m || !("desc" in m) ? m.description = o.value.description : m.desc = o.value.description, r("update", { data: m });
    }, l = (m, h) => {
      var p;
      const y = { ...(p = n.node) == null ? void 0 : p.style, [m]: h };
      r("update", { style: y });
    }, d = () => {
      r("update", {
        width: o.value.width,
        height: o.value.height
      });
    }, c = () => {
      r("close");
    }, _ = (m) => {
      const h = m.target.value;
      l("borderRadius", `${h}px`);
    }, f = () => {
      var h, y;
      const m = (y = (h = n.node) == null ? void 0 : h.style) == null ? void 0 : y.border;
      if (typeof m == "string") {
        const p = m.match(/#(?:[0-9a-fA-F]{3}){1,2}|rgb\(.*?\)|rgba\(.*?\)/);
        return p ? p[0] : "#dddddd";
      }
      return "#dddddd";
    };
    return (m, h) => (H(), Ve(Ka, { to: "body" }, [
      We(Jd, { name: "slide-fade" }, {
        default: jt(() => {
          var y, p, v;
          return [
            e.visible && e.node ? (H(), E("div", c0, [
              b("div", { class: "panel-header" }, [
                h[8] || (h[8] = b(
                  "span",
                  { class: "panel-title" },
                  "编辑节点",
                  -1
                  /* CACHED */
                )),
                b("button", {
                  class: "close-btn",
                  onClick: c
                }, "×")
              ]),
              b("div", _0, [
                b("div", f0, [
                  h[9] || (h[9] = b(
                    "label",
                    null,
                    "标签",
                    -1
                    /* CACHED */
                  )),
                  je(b(
                    "input",
                    {
                      "onUpdate:modelValue": h[0] || (h[0] = (g) => o.value.label = g),
                      type: "text",
                      placeholder: "节点标签",
                      onBlur: i,
                      onKeyup: Ud(i, ["enter"])
                    },
                    null,
                    544
                    /* NEED_HYDRATION, NEED_PATCH */
                  ), [
                    [Pe, o.value.label]
                  ])
                ]),
                b("div", m0, [
                  h[10] || (h[10] = b(
                    "label",
                    null,
                    "描述",
                    -1
                    /* CACHED */
                  )),
                  je(b(
                    "textarea",
                    {
                      "onUpdate:modelValue": h[1] || (h[1] = (g) => o.value.description = g),
                      placeholder: "节点描述",
                      rows: "2",
                      onBlur: u
                    },
                    null,
                    544
                    /* NEED_HYDRATION, NEED_PATCH */
                  ), [
                    [Pe, o.value.description]
                  ])
                ]),
                b("div", p0, [
                  h[12] || (h[12] = b(
                    "label",
                    null,
                    "尺寸",
                    -1
                    /* CACHED */
                  )),
                  b("div", h0, [
                    je(b(
                      "input",
                      {
                        "onUpdate:modelValue": h[2] || (h[2] = (g) => o.value.width = g),
                        type: "number",
                        min: "50",
                        max: "800",
                        placeholder: "宽度",
                        onBlur: d
                      },
                      null,
                      544
                      /* NEED_HYDRATION, NEED_PATCH */
                    ), [
                      [
                        Pe,
                        o.value.width,
                        void 0,
                        { number: !0 }
                      ]
                    ]),
                    h[11] || (h[11] = b(
                      "span",
                      null,
                      "×",
                      -1
                      /* CACHED */
                    )),
                    je(b(
                      "input",
                      {
                        "onUpdate:modelValue": h[3] || (h[3] = (g) => o.value.height = g),
                        type: "number",
                        min: "30",
                        max: "600",
                        placeholder: "高度",
                        onBlur: d
                      },
                      null,
                      544
                      /* NEED_HYDRATION, NEED_PATCH */
                    ), [
                      [
                        Pe,
                        o.value.height,
                        void 0,
                        { number: !0 }
                      ]
                    ])
                  ])
                ]),
                b("div", v0, [
                  h[13] || (h[13] = b(
                    "label",
                    null,
                    "背景色",
                    -1
                    /* CACHED */
                  )),
                  b("div", y0, [
                    b("input", {
                      type: "color",
                      value: ((y = e.node.style) == null ? void 0 : y.backgroundColor) || "#ffffff",
                      class: "modern-color-picker",
                      onInput: h[4] || (h[4] = (g) => l("backgroundColor", g.target.value))
                    }, null, 40, g0),
                    b(
                      "span",
                      M0,
                      ae(((p = e.node.style) == null ? void 0 : p.backgroundColor) || "#ffffff"),
                      1
                      /* TEXT */
                    )
                  ])
                ]),
                b("div", b0, [
                  h[14] || (h[14] = b(
                    "label",
                    null,
                    "边框颜色",
                    -1
                    /* CACHED */
                  )),
                  b("div", Y0, [
                    b("input", {
                      type: "color",
                      value: f(),
                      class: "modern-color-picker",
                      onInput: h[5] || (h[5] = (g) => l("border", `1px solid ${g.target.value}`))
                    }, null, 40, w0),
                    b(
                      "span",
                      x0,
                      ae(f()),
                      1
                      /* TEXT */
                    )
                  ])
                ]),
                b("div", L0, [
                  h[15] || (h[15] = b(
                    "label",
                    null,
                    "圆角",
                    -1
                    /* CACHED */
                  )),
                  b("input", {
                    value: parseInt(String(((v = e.node.style) == null ? void 0 : v.borderRadius) || "8")),
                    type: "range",
                    min: "0",
                    max: "20",
                    onInput: _
                  }, null, 40, k0)
                ]),
                b("div", S0, [
                  h[16] || (h[16] = b(
                    "label",
                    null,
                    "标签文字颜色",
                    -1
                    /* CACHED */
                  )),
                  b("div", D0, [
                    b("input", {
                      type: "color",
                      value: o.value.labelColor,
                      class: "modern-color-picker",
                      onInput: h[6] || (h[6] = (g) => s(g.target.value))
                    }, null, 40, T0),
                    b(
                      "span",
                      $0,
                      ae(o.value.labelColor),
                      1
                      /* TEXT */
                    )
                  ])
                ]),
                b("div", H0, [
                  h[17] || (h[17] = b(
                    "label",
                    null,
                    "文字描述颜色",
                    -1
                    /* CACHED */
                  )),
                  b("div", j0, [
                    b("input", {
                      type: "color",
                      value: o.value.descriptionColor,
                      class: "modern-color-picker",
                      onInput: h[7] || (h[7] = (g) => t(g.target.value))
                    }, null, 40, E0),
                    b(
                      "span",
                      C0,
                      ae(o.value.descriptionColor),
                      1
                      /* TEXT */
                    )
                  ])
                ])
              ])
            ])) : I("v-if", !0)
          ];
        }),
        _: 1
        /* STABLE */
      })
    ]));
  }
}), A0 = /* @__PURE__ */ ue(q0, [["__scopeId", "data-v-3542b442"]]), R0 = {
  key: 0,
  class: "ai-node-edit-panel"
}, P0 = { class: "panel-header" }, I0 = { class: "panel-title" }, N0 = { key: 0 }, O0 = { key: 1 }, z0 = { key: 2 }, F0 = { key: 3 }, B0 = { key: 4 }, G0 = { key: 5 }, J0 = { key: 6 }, U0 = { class: "panel-content" }, W0 = { class: "form-group" }, V0 = { class: "form-group" }, K0 = ["value"], X0 = ["value"], Z0 = { class: "form-group" }, Q0 = ["value"], eD = { class: "form-group" }, tD = ["value"], rD = { class: "form-group" }, nD = { class: "status-badges" }, aD = {
  key: 0,
  class: "form-group"
}, oD = { class: "stream-preview" }, sD = { class: "stream-text" }, iD = {
  key: 1,
  class: "form-group"
}, uD = {
  key: 2,
  class: "form-group"
}, lD = { class: "tools-checkboxes" }, dD = ["checked", "onChange"], cD = {
  key: 3,
  class: "form-group"
}, _D = {
  key: 4,
  class: "form-group"
}, fD = {
  key: 5,
  class: "form-group"
}, mD = ["value"], pD = ["value"], hD = { class: "form-group" }, vD = { class: "size-inputs" }, yD = { class: "form-group" }, gD = { class: "color-picker" }, MD = ["onClick"], bD = { class: "form-group" }, YD = { class: "color-picker" }, wD = ["onClick"], xD = /* @__PURE__ */ ie({
  __name: "AiNodeEditPanel",
  props: {
    node: {},
    visible: { type: Boolean }
  },
  emits: ["update", "close"],
  setup(e, { emit: a }) {
    const n = e, r = a, o = ee({
      label: "",
      description: ""
    }), s = J(() => {
      if (!n.node) return !1;
      const $ = n.node.type;
      return $ == null ? void 0 : $.startsWith("ai-");
    }), t = J(() => {
      var $;
      return (($ = n.node) == null ? void 0 : $.type) === "ai-llm";
    }), i = J(() => {
      var $;
      return (($ = n.node) == null ? void 0 : $.type) === "ai-prompt";
    }), u = J(() => {
      var $;
      return (($ = n.node) == null ? void 0 : $.type) === "ai-agent";
    }), l = J(() => {
      var $;
      return (($ = n.node) == null ? void 0 : $.type) === "ai-tool";
    }), d = J(() => {
      var $;
      return (($ = n.node) == null ? void 0 : $.type) === "ai-condition";
    }), c = J(() => {
      var $;
      return (($ = n.node) == null ? void 0 : $.type) === "ai-memory";
    }), _ = [
      { value: "gpt-4", label: "GPT-4" },
      { value: "gpt-4-turbo", label: "GPT-4 Turbo" },
      { value: "gpt-3.5-turbo", label: "GPT-3.5 Turbo" },
      { value: "claude-3-opus", label: "Claude 3 Opus" },
      { value: "claude-3-sonnet", label: "Claude 3 Sonnet" },
      { value: "claude-3-haiku", label: "Claude 3 Haiku" }
    ], f = [
      { value: "search", label: "🔍 搜索" },
      { value: "calculator", label: "🧮 计算器" },
      { value: "weather", label: "🌤️ 天气查询" },
      { value: "code_interpreter", label: "💻 代码执行" },
      { value: "web_fetch", label: "🌐 网页获取" }
    ], m = [
      { value: "short", label: "短期记忆" },
      { value: "long", label: "长期记忆" },
      { value: "session", label: "会话记忆" }
    ];
    Le(
      () => n.node,
      ($) => {
        if ($) {
          const x = $.data, j = x.label || x.title || x.name || x.text || $.id;
          o.value = {
            label: String(j),
            description: x.description || x.desc || "",
            style: { ...$.style },
            width: $.width,
            height: $.height,
            type: $.type,
            // AI workflow fields - explicitly cast to correct types
            model: (x == null ? void 0 : x.model) || "gpt-4",
            prompt: (x == null ? void 0 : x.prompt) || "",
            temperature: (x == null ? void 0 : x.temperature) ?? 0.7,
            maxTokens: (x == null ? void 0 : x.maxTokens) ?? 2e3,
            tools: (x == null ? void 0 : x.tools) || [],
            toolName: (x == null ? void 0 : x.toolName) || "",
            condition: (x == null ? void 0 : x.condition) || "",
            memoryType: (x == null ? void 0 : x.memoryType) || "short",
            status: (x == null ? void 0 : x.status) || "pending",
            streamOutput: (x == null ? void 0 : x.streamOutput) || ""
          };
        }
      },
      { immediate: !0 }
    );
    const h = ($, x) => {
      var G;
      const j = { ...(G = n.node) == null ? void 0 : G.data };
      j[$] = x, r("update", { data: j });
    }, y = () => {
      if (!n.node) return;
      const $ = { ...n.node.data };
      "label" in $ || !("title" in $ || "name" in $ || "text" in $) ? $.label = o.value.label : "title" in $ ? $.title = o.value.label : "name" in $ ? $.name = o.value.label : "text" in $ && ($.text = o.value.label), r("update", { data: $ });
    }, p = ($) => {
      const x = $.target.value;
      h("model", x);
    }, v = () => {
      h("prompt", o.value.prompt);
    }, g = ($) => {
      const x = parseFloat($.target.value);
      h("temperature", x);
    }, M = ($) => {
      const x = parseInt($.target.value);
      h("maxTokens", x);
    }, Y = ($) => {
      const x = o.value.tools || [], j = x.includes($) ? x.filter((G) => G !== $) : [...x, $];
      o.value.tools = j, h("tools", j);
    }, L = () => {
      h("toolName", o.value.toolName);
    }, D = () => {
      h("condition", o.value.condition);
    }, w = ($) => {
      const x = $.target.value;
      h("memoryType", x);
    }, T = () => {
      r("close");
    }, k = ($, x) => {
      var G;
      const j = { ...(G = n.node) == null ? void 0 : G.style, [$]: x };
      r("update", { style: j });
    }, S = () => {
      r("update", {
        width: o.value.width,
        height: o.value.height
      });
    }, F = [
      "#fff",
      "#f8f9fa",
      "#e9ecef",
      "#dee2e6",
      "#ced4da",
      "#3b82f6",
      "#10b981",
      "#f59e0b",
      "#ef4444",
      "#8b5cf6"
    ], B = [
      "#ddd",
      "#3b82f6",
      "#10b981",
      "#f59e0b",
      "#ef4444",
      "#8b5cf6",
      "#ec4899",
      "#06b6d4"
    ];
    return ($, x) => (H(), Ve(Ka, { to: "body" }, [
      We(Jd, { name: "slide-fade" }, {
        default: jt(() => [
          e.visible && e.node ? (H(), E("div", R0, [
            b("div", P0, [
              b("span", I0, [
                t.value ? (H(), E("span", N0, "🧠 LLM 配置")) : i.value ? (H(), E("span", O0, "💬 提示词配置")) : u.value ? (H(), E("span", z0, "🤖 Agent 配置")) : l.value ? (H(), E("span", F0, "🔧 工具配置")) : d.value ? (H(), E("span", B0, "🔀 条件配置")) : c.value ? (H(), E("span", G0, "💾 记忆配置")) : (H(), E("span", J0, "编辑节点"))
              ]),
              b("button", {
                class: "close-btn",
                onClick: T
              }, "×")
            ]),
            b("div", U0, [
              I(" 通用字段 "),
              b("div", W0, [
                x[6] || (x[6] = b(
                  "label",
                  null,
                  "标签",
                  -1
                  /* CACHED */
                )),
                je(b(
                  "input",
                  {
                    "onUpdate:modelValue": x[0] || (x[0] = (j) => o.value.label = j),
                    type: "text",
                    placeholder: "节点标签",
                    onBlur: y,
                    onKeyup: Ud(y, ["enter"])
                  },
                  null,
                  544
                  /* NEED_HYDRATION, NEED_PATCH */
                ), [
                  [Pe, o.value.label]
                ])
              ]),
              I(" LLM 节点配置 "),
              t.value ? (H(), E(
                pe,
                { key: 0 },
                [
                  b("div", V0, [
                    x[7] || (x[7] = b(
                      "label",
                      null,
                      "模型",
                      -1
                      /* CACHED */
                    )),
                    b("select", {
                      value: o.value.model,
                      class: "form-select",
                      onChange: p
                    }, [
                      (H(), E(
                        pe,
                        null,
                        ke(_, (j) => b("option", {
                          key: j.value,
                          value: j.value
                        }, ae(j.label), 9, X0)),
                        64
                        /* STABLE_FRAGMENT */
                      ))
                    ], 40, K0)
                  ]),
                  b("div", Z0, [
                    b(
                      "label",
                      null,
                      "Temperature (" + ae(o.value.temperature) + ")",
                      1
                      /* TEXT */
                    ),
                    b("input", {
                      value: o.value.temperature,
                      type: "range",
                      min: "0",
                      max: "2",
                      step: "0.1",
                      onInput: g
                    }, null, 40, Q0),
                    x[8] || (x[8] = b(
                      "div",
                      { class: "range-labels" },
                      [
                        b("span", null, "精确"),
                        b("span", null, "创意")
                      ],
                      -1
                      /* CACHED */
                    ))
                  ]),
                  b("div", eD, [
                    x[9] || (x[9] = b(
                      "label",
                      null,
                      "Max Tokens",
                      -1
                      /* CACHED */
                    )),
                    b("input", {
                      value: o.value.maxTokens,
                      type: "number",
                      min: "100",
                      max: "32000",
                      onChange: M
                    }, null, 40, tD)
                  ]),
                  b("div", rD, [
                    x[10] || (x[10] = b(
                      "label",
                      null,
                      "状态",
                      -1
                      /* CACHED */
                    )),
                    b("div", nD, [
                      b(
                        "span",
                        {
                          class: te(["status-badge", { active: o.value.status === "pending", "status-pending": !0 }])
                        },
                        "○ 待运行",
                        2
                        /* CLASS */
                      ),
                      b(
                        "span",
                        {
                          class: te(["status-badge", { active: o.value.status === "running", "status-running": !0 }])
                        },
                        "● 运行中",
                        2
                        /* CLASS */
                      ),
                      b(
                        "span",
                        {
                          class: te(["status-badge", { active: o.value.status === "success", "status-success": !0 }])
                        },
                        "✓ 成功",
                        2
                        /* CLASS */
                      ),
                      b(
                        "span",
                        {
                          class: te(["status-badge", { active: o.value.status === "error", "status-error": !0 }])
                        },
                        "✗ 错误",
                        2
                        /* CLASS */
                      )
                    ])
                  ]),
                  I(" 流式输出预览 "),
                  o.value.status === "running" ? (H(), E("div", aD, [
                    x[12] || (x[12] = b(
                      "label",
                      null,
                      "流式输出",
                      -1
                      /* CACHED */
                    )),
                    b("div", oD, [
                      x[11] || (x[11] = b(
                        "span",
                        { class: "streaming-cursor" },
                        "▊",
                        -1
                        /* CACHED */
                      )),
                      b(
                        "span",
                        sD,
                        ae(o.value.streamOutput || "正在生成..."),
                        1
                        /* TEXT */
                      )
                    ])
                  ])) : I("v-if", !0)
                ],
                64
                /* STABLE_FRAGMENT */
              )) : I("v-if", !0),
              I(" 提示词节点配置 "),
              i.value ? (H(), E("div", iD, [
                x[13] || (x[13] = b(
                  "label",
                  null,
                  "提示词内容",
                  -1
                  /* CACHED */
                )),
                je(b(
                  "textarea",
                  {
                    "onUpdate:modelValue": x[1] || (x[1] = (j) => o.value.prompt = j),
                    placeholder: "输入提示词模板，可以使用 {{variable}} 语法",
                    rows: "6",
                    onBlur: v
                  },
                  null,
                  544
                  /* NEED_HYDRATION, NEED_PATCH */
                ), [
                  [Pe, o.value.prompt]
                ]),
                x[14] || (x[14] = b(
                  "div",
                  { class: "form-hint" },
                  "支持 {{variable}} 变量语法",
                  -1
                  /* CACHED */
                ))
              ])) : I("v-if", !0),
              I(" Agent 节点配置 "),
              u.value ? (H(), E("div", uD, [
                x[15] || (x[15] = b(
                  "label",
                  null,
                  "选择工具",
                  -1
                  /* CACHED */
                )),
                b("div", lD, [
                  (H(), E(
                    pe,
                    null,
                    ke(f, (j) => {
                      var G;
                      return b("label", {
                        key: j.value,
                        class: "tool-checkbox"
                      }, [
                        b("input", {
                          type: "checkbox",
                          checked: (G = o.value.tools) == null ? void 0 : G.includes(j.value),
                          onChange: (z) => Y(j.value)
                        }, null, 40, dD),
                        b(
                          "span",
                          null,
                          ae(j.label),
                          1
                          /* TEXT */
                        )
                      ]);
                    }),
                    64
                    /* STABLE_FRAGMENT */
                  ))
                ])
              ])) : I("v-if", !0),
              I(" 工具节点配置 "),
              l.value ? (H(), E("div", cD, [
                x[16] || (x[16] = b(
                  "label",
                  null,
                  "工具名称",
                  -1
                  /* CACHED */
                )),
                je(b(
                  "input",
                  {
                    "onUpdate:modelValue": x[2] || (x[2] = (j) => o.value.toolName = j),
                    type: "text",
                    placeholder: "输入工具名称",
                    onBlur: L
                  },
                  null,
                  544
                  /* NEED_HYDRATION, NEED_PATCH */
                ), [
                  [Pe, o.value.toolName]
                ])
              ])) : I("v-if", !0),
              I(" 条件节点配置 "),
              d.value ? (H(), E("div", _D, [
                x[17] || (x[17] = b(
                  "label",
                  null,
                  "条件表达式",
                  -1
                  /* CACHED */
                )),
                je(b(
                  "input",
                  {
                    "onUpdate:modelValue": x[3] || (x[3] = (j) => o.value.condition = j),
                    type: "text",
                    placeholder: "例如: score > 60",
                    onBlur: D
                  },
                  null,
                  544
                  /* NEED_HYDRATION, NEED_PATCH */
                ), [
                  [Pe, o.value.condition]
                ]),
                x[18] || (x[18] = b(
                  "div",
                  { class: "form-hint" },
                  "满足条件走下方输出，不满足走右侧输出",
                  -1
                  /* CACHED */
                ))
              ])) : I("v-if", !0),
              I(" 记忆节点配置 "),
              c.value ? (H(), E("div", fD, [
                x[19] || (x[19] = b(
                  "label",
                  null,
                  "记忆类型",
                  -1
                  /* CACHED */
                )),
                b("select", {
                  value: o.value.memoryType,
                  class: "form-select",
                  onChange: w
                }, [
                  (H(), E(
                    pe,
                    null,
                    ke(m, (j) => b("option", {
                      key: j.value,
                      value: j.value
                    }, ae(j.label), 9, pD)),
                    64
                    /* STABLE_FRAGMENT */
                  ))
                ], 40, mD)
              ])) : I("v-if", !0),
              I(" 通用样式配置 "),
              s.value ? I("v-if", !0) : (H(), E(
                pe,
                { key: 6 },
                [
                  b("div", hD, [
                    x[21] || (x[21] = b(
                      "label",
                      null,
                      "尺寸",
                      -1
                      /* CACHED */
                    )),
                    b("div", vD, [
                      je(b(
                        "input",
                        {
                          "onUpdate:modelValue": x[4] || (x[4] = (j) => o.value.width = j),
                          type: "number",
                          min: "50",
                          max: "800",
                          onBlur: S
                        },
                        null,
                        544
                        /* NEED_HYDRATION, NEED_PATCH */
                      ), [
                        [
                          Pe,
                          o.value.width,
                          void 0,
                          { number: !0 }
                        ]
                      ]),
                      x[20] || (x[20] = b(
                        "span",
                        null,
                        "×",
                        -1
                        /* CACHED */
                      )),
                      je(b(
                        "input",
                        {
                          "onUpdate:modelValue": x[5] || (x[5] = (j) => o.value.height = j),
                          type: "number",
                          min: "30",
                          max: "600",
                          onBlur: S
                        },
                        null,
                        544
                        /* NEED_HYDRATION, NEED_PATCH */
                      ), [
                        [
                          Pe,
                          o.value.height,
                          void 0,
                          { number: !0 }
                        ]
                      ])
                    ])
                  ]),
                  b("div", yD, [
                    x[22] || (x[22] = b(
                      "label",
                      null,
                      "背景色",
                      -1
                      /* CACHED */
                    )),
                    b("div", gD, [
                      (H(), E(
                        pe,
                        null,
                        ke(F, (j) => {
                          var G;
                          return b("button", {
                            key: j,
                            class: te(["color-swatch", { active: ((G = e.node.style) == null ? void 0 : G.backgroundColor) === j }]),
                            style: re({ backgroundColor: j }),
                            onClick: (z) => k("backgroundColor", j)
                          }, null, 14, MD);
                        }),
                        64
                        /* STABLE_FRAGMENT */
                      ))
                    ])
                  ]),
                  b("div", bD, [
                    x[23] || (x[23] = b(
                      "label",
                      null,
                      "边框颜色",
                      -1
                      /* CACHED */
                    )),
                    b("div", YD, [
                      (H(), E(
                        pe,
                        null,
                        ke(B, (j) => b("button", {
                          key: j,
                          class: "color-swatch",
                          style: re({ backgroundColor: j }),
                          onClick: (G) => k("border", `1px solid ${j}`)
                        }, null, 12, wD)),
                        64
                        /* STABLE_FRAGMENT */
                      ))
                    ])
                  ])
                ],
                64
                /* STABLE_FRAGMENT */
              ))
            ])
          ])) : I("v-if", !0)
        ]),
        _: 1
        /* STABLE */
      })
    ]));
  }
}), LD = /* @__PURE__ */ ue(xD, [["__scopeId", "data-v-71c97ea4"]]), kD = {
  key: 0,
  class: "edge-edit-panel"
}, SD = { class: "panel-content" }, DD = { class: "form-group" }, TD = { class: "form-group" }, $D = ["value"], HD = { class: "form-group" }, jD = { class: "checkbox-label" }, ED = { class: "form-group" }, CD = { class: "color-picker-row" }, qD = ["value"], AD = { class: "color-value" }, RD = { class: "form-group" }, PD = ["value"], ID = { class: "form-group" }, ND = { class: "color-picker-row" }, OD = ["value"], zD = { class: "color-value" }, FD = { class: "form-group" }, BD = { class: "color-picker-row" }, GD = { class: "color-value" }, JD = /* @__PURE__ */ ie({
  __name: "EdgeEditPanel",
  props: {
    edge: {},
    visible: { type: Boolean },
    edgeTypes: {}
  },
  emits: ["update", "close"],
  setup(e, { emit: a }) {
    const n = e, r = a, o = ee({});
    Le(
      () => n.edge,
      (m) => {
        m && (o.value = {
          label: m.label || "",
          type: m.type || "bezier",
          animated: m.animated || !1,
          style: { ...m.style },
          labelStyle: { ...m.labelStyle },
          labelColor: m.labelColor || "#000000",
          labelShowBg: !!m.labelShowBg,
          labelBgColor: m.labelBgColor || "#ffffff"
        });
      },
      { immediate: !0 }
    );
    const s = () => {
      r("update", { label: o.value.label });
    }, t = () => {
      r("update", { type: o.value.type });
    }, i = () => {
      r("update", { animated: o.value.animated });
    }, u = (m, h) => {
      var p;
      const y = { ...(p = n.edge) == null ? void 0 : p.style, [m]: h };
      r("update", { style: y });
    }, l = (m) => {
      o.value.labelColor = m, r("update", { labelColor: m });
    }, d = (m) => {
      m === null ? (o.value.labelShowBg = !1, r("update", { labelShowBg: !1 })) : (o.value.labelShowBg = !0, o.value.labelBgColor = m, r("update", { labelShowBg: !0, labelBgColor: m }));
    }, c = () => {
      r("close");
    }, _ = (m) => {
      const h = parseFloat(m.target.value);
      u("strokeWidth", h);
    }, f = J(() => {
      var y;
      const m = /* @__PURE__ */ new Map();
      return [
        { value: "bezier", label: "贝塞尔曲线" },
        { value: "smoothstep", label: "平滑阶梯" },
        { value: "step", label: "阶梯" },
        { value: "straight", label: "直线" }
      ].forEach((p) => m.set(p.value, p)), px().forEach((p) => {
        m.has(p.type) || m.set(p.type, { value: p.type, label: p.label || `自定义: ${p.type}` });
      }), bx().forEach((p) => {
        m.has(p.type) || m.set(p.type, { value: p.type, label: p.label || `模板: ${p.type}` });
      }), n.edgeTypes && Object.keys(n.edgeTypes).forEach((p) => {
        m.has(p) || m.set(p, { value: p, label: `局部组件: ${p}` });
      }), (y = n.edge) != null && y.type && !m.has(n.edge.type) && m.set(n.edge.type, { value: n.edge.type, label: `未知类型: ${n.edge.type}` }), Array.from(m.values());
    });
    return (m, h) => (H(), Ve(Ka, { to: "body" }, [
      We(Jd, { name: "slide-fade" }, {
        default: jt(() => {
          var y, p, v;
          return [
            e.visible && e.edge ? (H(), E("div", kD, [
              b("div", { class: "panel-header" }, [
                h[9] || (h[9] = b(
                  "span",
                  { class: "panel-title" },
                  "编辑连线",
                  -1
                  /* CACHED */
                )),
                b("button", {
                  class: "close-btn",
                  onClick: c
                }, "×")
              ]),
              b("div", SD, [
                b("div", DD, [
                  h[10] || (h[10] = b(
                    "label",
                    null,
                    "标签",
                    -1
                    /* CACHED */
                  )),
                  je(b(
                    "input",
                    {
                      "onUpdate:modelValue": h[0] || (h[0] = (g) => o.value.label = g),
                      type: "text",
                      placeholder: "连线标签",
                      onBlur: s,
                      onKeyup: Ud(s, ["enter"])
                    },
                    null,
                    544
                    /* NEED_HYDRATION, NEED_PATCH */
                  ), [
                    [Pe, o.value.label]
                  ])
                ]),
                b("div", TD, [
                  h[11] || (h[11] = b(
                    "label",
                    null,
                    "连线类型",
                    -1
                    /* CACHED */
                  )),
                  je(b(
                    "select",
                    {
                      "onUpdate:modelValue": h[1] || (h[1] = (g) => o.value.type = g),
                      onChange: t
                    },
                    [
                      (H(!0), E(
                        pe,
                        null,
                        ke(f.value, (g) => (H(), E("option", {
                          key: g.value,
                          value: g.value
                        }, ae(g.label), 9, $D))),
                        128
                        /* KEYED_FRAGMENT */
                      ))
                    ],
                    544
                    /* NEED_HYDRATION, NEED_PATCH */
                  ), [
                    [Uw, o.value.type]
                  ])
                ]),
                b("div", HD, [
                  b("label", jD, [
                    je(b(
                      "input",
                      {
                        "onUpdate:modelValue": h[2] || (h[2] = (g) => o.value.animated = g),
                        type: "checkbox",
                        onChange: i
                      },
                      null,
                      544
                      /* NEED_HYDRATION, NEED_PATCH */
                    ), [
                      [Ww, o.value.animated]
                    ]),
                    h[12] || (h[12] = Vw(
                      " 动画连线 ",
                      -1
                      /* CACHED */
                    ))
                  ])
                ]),
                b("div", ED, [
                  h[13] || (h[13] = b(
                    "label",
                    null,
                    "线条颜色",
                    -1
                    /* CACHED */
                  )),
                  b("div", CD, [
                    b("input", {
                      type: "color",
                      value: ((y = e.edge.style) == null ? void 0 : y.stroke) || "#b1b1b7",
                      class: "modern-color-picker",
                      onInput: h[3] || (h[3] = (g) => u("stroke", g.target.value))
                    }, null, 40, qD),
                    b(
                      "span",
                      AD,
                      ae(((p = e.edge.style) == null ? void 0 : p.stroke) || "#b1b1b7"),
                      1
                      /* TEXT */
                    )
                  ])
                ]),
                b("div", RD, [
                  h[14] || (h[14] = b(
                    "label",
                    null,
                    "线条宽度",
                    -1
                    /* CACHED */
                  )),
                  b("input", {
                    value: ((v = e.edge.style) == null ? void 0 : v.strokeWidth) || 1.5,
                    type: "range",
                    min: "1",
                    max: "6",
                    step: "0.5",
                    onInput: _
                  }, null, 40, PD)
                ]),
                b("div", ID, [
                  h[15] || (h[15] = b(
                    "label",
                    null,
                    "标签文字颜色",
                    -1
                    /* CACHED */
                  )),
                  b("div", ND, [
                    b("input", {
                      type: "color",
                      value: o.value.labelColor,
                      class: "modern-color-picker",
                      onInput: h[4] || (h[4] = (g) => l(g.target.value))
                    }, null, 40, OD),
                    b(
                      "span",
                      zD,
                      ae(o.value.labelColor),
                      1
                      /* TEXT */
                    )
                  ])
                ]),
                b("div", FD, [
                  h[16] || (h[16] = b(
                    "label",
                    null,
                    "标签背景颜色",
                    -1
                    /* CACHED */
                  )),
                  b("div", BD, [
                    b(
                      "button",
                      {
                        class: te(["color-swatch none-swatch", { active: !o.value.labelShowBg }]),
                        onClick: h[5] || (h[5] = (g) => d(null))
                      },
                      " × ",
                      2
                      /* CLASS */
                    ),
                    o.value.labelShowBg ? (H(), E(
                      pe,
                      { key: 0 },
                      [
                        je(b(
                          "input",
                          {
                            type: "color",
                            "onUpdate:modelValue": h[6] || (h[6] = (g) => o.value.labelBgColor = g),
                            class: "modern-color-picker",
                            onInput: h[7] || (h[7] = (g) => d(o.value.labelBgColor || "#ffffff"))
                          },
                          null,
                          544
                          /* NEED_HYDRATION, NEED_PATCH */
                        ), [
                          [Pe, o.value.labelBgColor]
                        ]),
                        b(
                          "span",
                          GD,
                          ae(o.value.labelBgColor),
                          1
                          /* TEXT */
                        )
                      ],
                      64
                      /* STABLE_FRAGMENT */
                    )) : (H(), E("button", {
                      key: 1,
                      class: "add-bg-btn",
                      onClick: h[8] || (h[8] = (g) => d("#ffffff"))
                    }, " 启用背景 "))
                  ])
                ])
              ])
            ])) : I("v-if", !0)
          ];
        }),
        _: 1
        /* STABLE */
      })
    ]));
  }
}), UD = /* @__PURE__ */ ue(JD, [["__scopeId", "data-v-c6ec35b4"]]);
class WD {
  constructor() {
    ye(this, "handlers", /* @__PURE__ */ new Map());
  }
  /**
   * 订阅事件
   */
  on(a, n) {
    this.handlers.has(a) || this.handlers.set(a, /* @__PURE__ */ new Set()), this.handlers.get(a).add(n);
  }
  /**
   * 取消订阅
   */
  off(a, n) {
    const r = this.handlers.get(a);
    r && (r.delete(n), r.size === 0 && this.handlers.delete(a));
  }
  /**
   * 触发事件
   */
  emit(a, n) {
    const r = this.handlers.get(a);
    r && r.forEach((o) => {
      try {
        n !== void 0 ? o(n) : o();
      } catch (s) {
        console.error(`[YhFlow EventBus] Error in event handler for "${a}":`, s);
      }
    });
  }
  /**
   * 单次订阅
   */
  once(a, n) {
    const r = ((...o) => {
      n(...o), this.off(a, n);
    });
    this.on(a, r);
  }
  /**
   * 清空所有事件处理函数
   */
  clear() {
    this.handlers.clear();
  }
  /**
   * 获取事件处理器数量
   */
  listenerCount(a) {
    var r;
    if (a)
      return ((r = this.handlers.get(a)) == null ? void 0 : r.size) || 0;
    let n = 0;
    return this.handlers.forEach((o) => {
      n += o.size;
    }), n;
  }
}
function VD() {
  return new WD();
}
const KD = {
  key: 0,
  class: "yh-flow__connection-line"
}, XD = ["d"], ZD = /* @__PURE__ */ ie({
  __name: "Flow",
  props: {
    nodes: { default: () => [] },
    edges: { default: () => [] },
    modelValue: { default: () => ({ x: 0, y: 0, zoom: 1 }) },
    minZoom: { default: 0.1 },
    maxZoom: { default: 2 },
    zoomStep: { default: 0.1 },
    nodesDraggable: { type: Boolean, default: !0 },
    edgesConnectable: { type: Boolean, default: !0 },
    selectable: { type: Boolean, default: !0 },
    background: { default: "none" },
    backgroundColor: { default: "transparent" },
    gridSize: { default: 20 },
    snapToGrid: { type: Boolean, default: !1 },
    snapGrid: { default: () => [20, 20] },
    readonly: { type: Boolean, default: !1 },
    showControls: { type: Boolean, default: !1 },
    showMinimap: { type: Boolean, default: !1 },
    minimapNodeColor: { default: "#cbd5e1" },
    history: { type: Boolean, default: !1 },
    maxHistory: { default: 50 },
    keyboardShortcuts: { type: Boolean, default: !0 },
    connectionValidator: { type: Function, default: void 0 },
    noCycleValidation: { type: Boolean, default: !1 },
    showAlignmentLines: { type: Boolean, default: !1 },
    snapThreshold: { default: 5 },
    customNodeTemplates: { default: () => ({}) },
    nodeTypes: { default: () => ({}) },
    edgeTypes: { default: () => ({}) },
    interactiveMinimap: { type: Boolean, default: !1 },
    showLayoutControls: { type: Boolean, default: !1 },
    layoutType: { default: "none" },
    layoutDirection: { default: "TB" },
    enableExport: { type: Boolean, default: !1 },
    exportFileName: { default: "flow-chart" }
  },
  emits: ["update:modelValue", "update:nodes", "update:edges", "nodeClick", "nodeDblClick", "nodeDragStart", "nodeDrag", "nodeDragEnd", "nodeContextMenu", "edgeClick", "edgeDblClick", "edgeContextMenu", "edgeConnect", "selectionChange", "historyChange", "viewportChange", "edgeUpdate"],
  setup(e, { expose: a, emit: n }) {
    typeof window < "u" && (window.__YH_FLOW_VERSION__ = "1.0.1");
    const r = (C, N, X) => {
      const Q = Yc(C, N, X);
      return Q.isValid ? o.connectionValidator && !o.connectionValidator(X) ? { isValid: !1, message: "Connection not allowed by custom validator" } : !o.noCycleValidation && fx(d.value, {
        source: X.source,
        target: X.target
      }) ? { isValid: !1, message: "Connection would create a cycle" } : { isValid: !0 } : Q;
    }, o = e, s = n, t = ee(), i = ee(800), u = ee(600), l = ee(o.nodes || []), d = ee(o.edges || []), c = Ra(o.modelValue || { x: 0, y: 0, zoom: 1 }), _ = ee(o.readonly || !1), f = VD(), m = new P1(), h = ee(o.snapThreshold ?? 10), y = ex(c, {
      minZoom: o.minZoom || 0.1,
      maxZoom: o.maxZoom || 5,
      zoomStep: o.zoomStep || 0.1
    }), p = ee([]), v = J(
      () => p.value.filter((C) => !C.id.includes("minimap") && !C.id.includes("controls"))
    ), g = J(
      () => p.value.filter((C) => C.id.includes("minimap") || C.id.includes("controls"))
    ), M = (C) => {
      m.register(C), p.value = m.getPlugins();
    }, Y = (C) => {
      m.unregister(C), p.value = m.getPlugins();
    }, L = tx(c, {
      nodes: l,
      snapToGrid: o.snapToGrid || !1,
      snapGrid: o.snapGrid || [15, 15]
    }), D = rx({
      edges: d,
      nodes: l
    }), w = nx({
      nodes: l,
      edges: d
    }), T = ax(l, d, {
      maxHistory: o.maxHistory || 50,
      onHistoryChange: (C, N) => {
        s("historyChange", { canUndo: C, canRedo: N });
      }
    }), k = sx({
      nodes: l,
      snapThreshold: h.value
    }), S = J(() => {
      if (!t.value) return l.value;
      const C = 100, N = {
        x: -c.value.x / c.value.zoom - C,
        y: -c.value.y / c.value.zoom - C,
        width: i.value / c.value.zoom + C * 2,
        height: u.value / c.value.zoom + C * 2
      };
      return l.value.filter((X) => {
        const Q = X.width || 200, ve = X.height || 50;
        return !(X.position.x + Q < N.x || X.position.x > N.x + N.width || X.position.y + ve < N.y || X.position.y > N.y + N.height);
      });
    }), F = J(() => ({
      transform: `translate(${c.value.x}px, ${c.value.y}px) scale(${c.value.zoom})`,
      transformOrigin: "0 0"
    })), B = ee(!1), $ = ee({ x: 0, y: 0 }), x = ee(!1), j = ee(null), G = ee(null), z = ee(!1), W = ee(null), Z = ee({ x: 0, y: 0 }), K = ee(null), ne = ee(!1), se = ee(null), R = ee(!1), O = ee(null), U = J(() => !z.value || !W.value ? null : {
      path: V.value,
      tx: Z.value.x,
      ty: Z.value.y
    }), V = J(() => W.value ? Pg("bezier", {
      sourceX: W.value.x * c.value.zoom + c.value.x,
      sourceY: W.value.y * c.value.zoom + c.value.y,
      targetX: Z.value.x,
      targetY: Z.value.y,
      sourcePosition: W.value.position,
      targetPosition: "left"
    }) : ""), oe = (C) => {
      var Q;
      C.preventDefault();
      const N = C.deltaY > 0 ? 0.9 : 1.1, X = (Q = t.value) == null ? void 0 : Q.getBoundingClientRect();
      X && y.zoomTo(c.value.zoom * N, {
        x: C.clientX - X.left,
        y: C.clientY - X.top
      });
    }, ce = (C) => {
      var de, me;
      const N = C.target;
      if (!((de = t.value) != null && de.contains(N)) || N.closest(".yh-flow-node") || N.closest(".yh-flow-handle") || N.closest(".yh-flow-edge-group") || N.closest(".yh-flow__connection-line") || N.closest(".yh-flow-controls") || N.closest(".yh-flow-minimap")) return;
      const X = (me = t.value) == null ? void 0 : me.getBoundingClientRect();
      if (!X) return;
      const Q = C.clientX - X.left, ve = C.clientY - X.top;
      if (C.altKey && o.selectable && !_.value) {
        const Me = {
          x: (Q - c.value.x) / c.value.zoom,
          y: (ve - c.value.y) / c.value.zoom
        };
        x.value = !0, w.startSelection(Me.x, Me.y), w.clearSelection();
      } else _.value || (B.value = !0, $.value = { x: C.clientX, y: C.clientY });
    }, le = (C) => {
      var N, X;
      if (B.value) {
        const Q = C.clientX - $.value.x, ve = C.clientY - $.value.y;
        y.pan(Q, ve), $.value = { x: C.clientX, y: C.clientY };
      }
      if (x.value) {
        const Q = (N = t.value) == null ? void 0 : N.getBoundingClientRect();
        if (Q) {
          const ve = C.clientX - Q.left, de = C.clientY - Q.top, me = {
            x: (ve - c.value.x) / c.value.zoom,
            y: (de - c.value.y) / c.value.zoom
          };
          w.updateSelection(me.x, me.y);
        }
      }
      if (z.value) {
        const Q = (X = t.value) == null ? void 0 : X.getBoundingClientRect();
        Q && (Z.value = {
          x: C.clientX - Q.left,
          y: C.clientY - Q.top
        });
      }
    }, he = (C) => {
      var N, X, Q, ve;
      if (B.value = !1, x.value && (x.value = !1, w.endSelection()), z.value && W.value) {
        const de = (N = t.value) == null ? void 0 : N.getBoundingClientRect();
        if (de) {
          const me = C.clientX - de.left, Me = C.clientY - de.top, He = {
            x: (me - c.value.x) / c.value.zoom,
            y: (Me - c.value.y) / c.value.zoom
          }, Re = Ae(He);
          if (Re) {
            const Kt = K.value ? K.value.handleType === "source" ? Re.id : K.value.edge.source : W.value.nodeId, pc = K.value ? K.value.handleType === "target" ? Re.id : K.value.edge.target : Re.id, Ow = l.value.find((Ye) => Ye.id === Kt), hc = r(
              Ow,
              l.value.find((Ye) => Ye.id === pc),
              {
                source: Kt,
                target: pc,
                sourceHandle: K.value && K.value.handleType === "source" ? void 0 : ((X = K.value) == null ? void 0 : X.edge.sourceHandle) || ((Q = W.value) == null ? void 0 : Q.handleId),
                targetHandle: K.value && K.value.handleType === "target" || (ve = K.value) == null ? void 0 : ve.edge.targetHandle
              }
            );
            if (!hc.isValid) {
              console.warn("Invalid connection:", hc.message), z.value = !1, W.value = null, K.value = null;
              return;
            }
            if (K.value) {
              const { edge: Ye, handleType: Xt } = K.value, bo = {
                source: Xt === "source" ? Re.id : Ye.source,
                target: Xt === "target" ? Re.id : Ye.target,
                sourceHandle: Xt === "source" ? void 0 : Ye.sourceHandle,
                targetHandle: Xt === "target" ? void 0 : Ye.targetHandle
              };
              D.updateEdge(Ye.id, bo), s("edgeUpdate", { edge: Ye, connection: bo }), f.emit("edge:update", { edge: Ye, connection: bo });
            } else {
              const Ye = {
                id: `edge-${Date.now()}`,
                source: W.value.nodeId,
                target: Re.id,
                sourceHandle: W.value.handleId || void 0,
                targetHandle: void 0,
                type: "bezier"
              };
              D.addEdge(Ye), s("edgeConnect", {
                source: Ye.source,
                target: Ye.target,
                sourceHandle: Ye.sourceHandle,
                targetHandle: Ye.targetHandle
              }), f.emit("edge:connect", {
                connection: {
                  source: Ye.source,
                  target: Ye.target,
                  sourceHandle: Ye.sourceHandle,
                  targetHandle: Ye.targetHandle
                }
              });
            }
          }
        }
        z.value = !1, W.value = null, K.value = null;
      }
    }, Ae = (C) => {
      for (const N of l.value) {
        const X = N.width || 200, Q = N.height || 50;
        if (C.x >= N.position.x && C.x <= N.position.x + X && C.y >= N.position.y && C.y <= N.position.y + Q && W.value && N.id !== W.value.nodeId)
          return N;
      }
      return null;
    }, be = (C, N) => {
      const X = C.shiftKey || C.metaKey || C.ctrlKey;
      X || D.clearSelection(), L.selectNode(N.id, !0, X), s("nodeClick", { node: N, nativeEvent: C }), f.emit("node:click", { node: N, nativeEvent: C });
    }, Se = (C) => {
      const N = l.value.find((X) => X.id === C);
      N && (N.selected = !N.selected);
    }, _e = (C, N) => {
      s("nodeDblClick", { node: N, nativeEvent: C }), f.emit("node:dblclick", { node: N, nativeEvent: C }), _.value || (R.value = !1, se.value = N, ne.value = !0);
    }, Ue = (C, N) => {
      s("nodeContextMenu", { node: N, nativeEvent: C }), f.emit("node:contextmenu", { node: N, nativeEvent: C });
    }, fe = (C, N) => {
      T.push({ nodes: l.value, edges: d.value }), j.value = N.id, G.value = { ...N.position }, s("nodeDragStart", { node: N, nativeEvent: C }), f.emit("node:dragstart", { node: N, nativeEvent: C });
    }, Ze = (C, N, X) => {
      const Q = k.getAlignmentSnap(N.id, X);
      L.updateNodePosition(N.id, Q, { dragging: !0 }), G.value = Q, s("nodeDrag", { node: N, nativeEvent: C, position: Q }), f.emit("node:drag", { node: N, nativeEvent: C, position: Q }), s("update:nodes", l.value);
    }, Qe = (C, N) => {
      L.updateNodePosition(N.id, N.position, { dragging: !1 }), j.value = null, G.value = null, s("nodeDragEnd", { node: N, nativeEvent: C }), f.emit("node:dragend", { node: N, nativeEvent: C }), s("update:nodes", l.value), s("update:edges", d.value);
    }, vo = (C, N) => {
      console.log("Edge click:", N.id), C.stopPropagation(), !C.ctrlKey && !C.metaKey && !C.shiftKey && d.value.forEach((X) => {
        X.id !== N.id && (X.selected = !1);
      }), N.selected = !N.selected, s("edgeClick", { edge: N, nativeEvent: C }), _.value || (ne.value = !1, O.value = N, R.value = !0), f.emit("edge:click", { edge: N, nativeEvent: C });
    }, mt = (C, N) => {
      console.log("Edge dblclick:", N.id), s("edgeDblClick", { edge: N, nativeEvent: C }), f.emit("edge:dblclick", { edge: N, nativeEvent: C }), _.value || (ne.value = !1, O.value = N, R.value = !0);
    }, Be = (C, N) => {
      s("edgeContextMenu", { edge: N, nativeEvent: C }), f.emit("edge:contextmenu", { edge: N, nativeEvent: C });
    }, Te = (C, N, X) => {
      var Re;
      if (_.value) return;
      const Q = (Re = t.value) == null ? void 0 : Re.getBoundingClientRect();
      if (!Q) return;
      K.value = { edge: N, handleType: X };
      const ve = X === "source" ? N.target : N.source, de = X === "source" ? N.targetHandle : N.sourceHandle, me = l.value.find((Kt) => Kt.id === ve);
      if (!me) return;
      const Me = X === "source" ? de ?? "left" : de ?? "right", He = gt(me, Me);
      z.value = !0, W.value = {
        nodeId: ve,
        handleId: de || "",
        handleType: X === "source" ? "target" : "source",
        // 反转类型
        position: Me,
        x: He.x,
        y: He.y
      }, Z.value = {
        x: C.clientX - Q.left,
        y: C.clientY - Q.top
      };
    }, pt = (C, N, X, Q) => {
      var He;
      const ve = l.value.find((Re) => Re.id === N);
      if (!ve) return;
      const de = (He = t.value) == null ? void 0 : He.getBoundingClientRect();
      if (!de) return;
      const me = X || (Q === "source" ? "right" : "left"), Me = gt(ve, me);
      z.value = !0, W.value = {
        nodeId: N,
        handleId: X,
        handleType: Q,
        position: me,
        x: Me.x,
        y: Me.y
      }, Z.value = {
        x: C.clientX - de.left,
        y: C.clientY - de.top
      };
    }, st = (C) => {
      se.value && (T.push({ nodes: l.value, edges: d.value }), L.updateNode(se.value.id, C), se.value = l.value.find((N) => {
        var X;
        return N.id === ((X = se.value) == null ? void 0 : X.id);
      }) || null, s("update:nodes", l.value));
    }, Bt = () => {
      ne.value = !1, se.value = null;
    }, Gt = (C) => {
      O.value && (T.push({ nodes: l.value, edges: d.value }), D.updateEdge(O.value.id, C), O.value = d.value.find((N) => {
        var X;
        return N.id === ((X = O.value) == null ? void 0 : X.id);
      }) || null, s("update:edges", d.value));
    }, et = () => {
      R.value = !1, O.value = null;
    }, Jt = () => l.value, Ut = () => d.value, yo = (C, N) => {
      f.on(C, N);
    }, Wt = (C, N) => {
      f.off(C, N);
    }, Ge = (C, N) => {
      f.emit(C, N);
    }, Oe = {
      nodes: l,
      edges: d,
      viewport: c,
      addNode: L.addNode,
      removeNode: L.removeNode,
      updateNode: L.updateNode,
      getNode: L.getNode,
      addEdge: D.addEdge,
      removeEdge: D.removeEdge,
      updateEdge: D.updateEdge,
      getEdge: D.getEdge,
      setViewport: (C) => y.setViewport(C.x, C.y, C.zoom),
      fitView: (C) => y.fitView(
        { width: i.value, height: u.value },
        l.value,
        C
      ),
      zoomIn: y.zoomIn,
      zoomOut: y.zoomOut,
      centerView: y.center,
      selectNode: L.selectNode,
      selectEdge: D.selectEdge,
      clearSelection: w.clearSelection,
      on: yo,
      off: Wt,
      emit: Ge,
      isValidConnection: (C) => Yc(
        l.value.find((N) => N.id === C.source),
        l.value.find((N) => N.id === C.target),
        C
      ).isValid,
      getNodes: Jt,
      getEdges: Ut,
      getViewport: () => c.value,
      screenToCanvas: (C, N) => Et(C, N, c.value),
      canvasToScreen: (C, N) => Ia(C, N, c.value),
      // ============================================
      // New 5-star feature methods
      // ============================================
      createNodeFromTemplate: (C, N, X, Q) => hx(C, N, X, Q),
      exportFlowData: (C) => Yx(l.value, d.value, C),
      importFlowData: (C) => wx(C),
      isNestedNode: (C) => yx(C),
      getNodeChildren: (C) => gx(C, l.value),
      getNodeParent: (C) => Mx(C, l.value),
      get $el() {
        return t.value;
      },
      draggingNodeId: j,
      draggingPosition: G,
      isLocked: _,
      setInteractive: (C) => {
        _.value = !C;
      },
      usePlugin: M,
      removePlugin: Y,
      // Placeholders for plugin methods to be exposed via defineExpose
      exportJson: void 0,
      exportImage: void 0,
      applyLayout: void 0
    };
    Nx(Oe), m.init(Oe), a(Oe), Le(
      () => o.nodes,
      (C) => {
        j.value || (l.value = C || []);
      },
      { deep: !0 }
    ), Le(
      () => o.edges,
      (C) => {
        d.value = C || [];
      },
      { deep: !0 }
    );
    const go = ee(/* @__PURE__ */ new Set()), Mo = ee(/* @__PURE__ */ new Set());
    Le(
      [l, d],
      ([C, N]) => {
        const X = C.filter((me) => me.selected), Q = N.filter((me) => me.selected), ve = new Set(X.map((me) => me.id)), de = new Set(Q.map((me) => me.id));
        for (const me of ve)
          if (!go.value.has(me)) {
            const Me = C.find((He) => He.id === me);
            Me && f.emit("node:selected", { node: Me });
          }
        for (const me of go.value)
          if (!ve.has(me)) {
            const Me = C.find((He) => He.id === me);
            Me && f.emit("node:unselected", { node: Me });
          }
        for (const me of de)
          if (!Mo.value.has(me)) {
            const Me = N.find((He) => He.id === me);
            Me && f.emit("edge:selected", { edge: Me });
          }
        for (const me of Mo.value)
          if (!de.has(me)) {
            const Me = N.find((He) => He.id === me);
            Me && f.emit("edge:unselected", { edge: Me });
          }
        f.emit("selection:change", { selectedNodes: X, selectedEdges: Q }), s("selectionChange", { selectedNodes: X, selectedEdges: Q }), s("update:nodes", C), s("update:edges", N), go.value = ve, Mo.value = de;
      },
      { deep: !0 }
    ), Le(
      c,
      (C) => {
        s("update:modelValue", C), s("viewportChange", C), f.emit("viewport:change", { transform: C });
      },
      { deep: !0 }
    );
    let Vt;
    return Ct(() => {
      document.addEventListener("mousemove", le), document.addEventListener("mouseup", he), t.value && (i.value = t.value.clientWidth, u.value = t.value.clientHeight, new ResizeObserver((N) => {
        for (const X of N)
          i.value = X.contentRect.width, u.value = X.contentRect.height;
      }).observe(t.value)), o.background && o.background !== "none" && M(
        za({
          type: o.background === "dots" ? "dots" : "grid",
          color: o.backgroundColor,
          gap: o.gridSize
        })
      ), o.showControls && M(Oa({})), o.showMinimap && M(
        Na({
          nodeColor: o.minimapNodeColor ? () => o.minimapNodeColor : void 0,
          interactive: o.interactiveMinimap,
          showLayoutControls: o.showLayoutControls,
          layoutType: o.layoutType,
          layoutDirection: o.layoutDirection
        })
      ), o.showAlignmentLines && M(
        Fa({
          showAlignmentLines: !0,
          snapThreshold: o.snapThreshold
        })
      ), o.enableExport && M(
        Ba({
          fileName: o.exportFileName,
          enabled: !0
        })
      ), o.layoutType && o.layoutType !== "none" && M(
        Ga({
          type: o.layoutType,
          direction: o.layoutDirection
        })
      ), Le(
        () => [o.background, o.backgroundColor, o.gridSize],
        ([C, N, X]) => {
          Y("grid"), C && C !== "none" && M(
            za({
              type: C === "dots" ? "dots" : "grid",
              color: N,
              gap: X || 20
            })
          );
        }
      ), Le(
        () => o.showControls,
        (C) => {
          Y("controls"), C && M(Oa({}));
        }
      ), Le(
        () => [
          o.showMinimap,
          o.minimapNodeColor,
          o.interactiveMinimap,
          o.showLayoutControls,
          o.layoutType,
          o.layoutDirection
        ],
        ([C, N, X, Q, ve, de]) => {
          Y("minimap"), C && M(
            Na({
              nodeColor: N ? () => N : void 0,
              interactive: X,
              showLayoutControls: Q,
              layoutType: ve,
              layoutDirection: de
            })
          );
        }
      ), Le(
        () => [o.showAlignmentLines, o.snapThreshold],
        ([C, N]) => {
          Y("snap"), C && M(
            Fa({
              showAlignmentLines: !0,
              snapThreshold: N || 10
            })
          );
        }
      ), Le(
        () => [o.enableExport, o.exportFileName],
        ([C, N]) => {
          Y("export"), C && M(
            Ba({
              fileName: N,
              enabled: !0
            })
          );
        }
      ), Le(
        () => [o.layoutType, o.layoutDirection],
        ([C, N]) => {
          Y("layout"), C && C !== "none" && M(
            Ga({
              type: C,
              direction: N
            })
          );
        }
      ), o.keyboardShortcuts && (Vt = ox({
        enabled: !0,
        onDelete: () => {
          const N = l.value.filter((Q) => Q.selected), X = d.value.filter((Q) => Q.selected);
          N.forEach((Q) => L.removeNode(Q.id)), X.forEach((Q) => D.removeEdge(Q.id)), s("update:nodes", l.value), s("update:edges", d.value);
        },
        onUndo: () => T.undo(),
        onRedo: () => T.redo(),
        onSelectAll: () => {
          l.value.forEach((N) => {
            N.selected = !0;
          }), d.value.forEach((N) => {
            N.selected = !0;
          });
        },
        onEscape: () => w.clearSelection()
      }).handleKeyDown, document.addEventListener("keydown", Vt));
    }), Gd(() => {
      o.keyboardShortcuts && Vt && document.removeEventListener("keydown", Vt), document.removeEventListener("mousemove", le), document.removeEventListener("mouseup", he), m.destroyAll(), f.clear();
    }), (C, N) => {
      var X, Q, ve;
      return H(), E(
        "div",
        {
          ref_key: "containerRef",
          ref: t,
          class: te(["yh-flow", {
            "is-readonly": _.value,
            "is-panning": B.value
          }]),
          tabindex: "0",
          onWheel: we(oe, ["prevent"]),
          onMousedown: ce
        },
        [
          I(" Plugin Components (Background, etc.) "),
          (H(!0), E(
            pe,
            null,
            ke(v.value, (de) => (H(), E(
              pe,
              {
                key: de.id
              },
              [
                de.component ? (H(), Ve(
                  Pa(de.component),
                  Ht({
                    key: 0,
                    ref_for: !0
                  }, de.componentProps),
                  null,
                  16
                  /* FULL_PROPS */
                )) : I("v-if", !0)
              ],
              64
              /* STABLE_FRAGMENT */
            ))),
            128
            /* KEYED_FRAGMENT */
          )),
          I(" Main Content "),
          b(
            "div",
            {
              class: "yh-flow__content",
              style: re(F.value)
            },
            [
              I(" Edges "),
              We(US, {
                edges: d.value || [],
                nodes: l.value || [],
                "edge-types": e.edgeTypes,
                transform: c.value,
                "connecting-edge": U.value,
                onEdgeClick: vo,
                onEdgeDblclick: mt,
                onEdgeContextmenu: Be,
                onEdgeUpdateStart: Te,
                "updating-edge-id": (X = K.value) == null ? void 0 : X.edge.id
              }, {
                edge: jt((de) => [
                  ut(C.$slots, "edge", vc(yc(de)), void 0, !0)
                ]),
                _: 3
                /* FORWARDED */
              }, 8, ["edges", "nodes", "edge-types", "transform", "connecting-edge", "updating-edge-id"]),
              I(" Edge Handles (for updating/reconnecting edges) "),
              We(t0, {
                edges: d.value || [],
                nodes: l.value || [],
                onEdgeUpdateStart: Te
              }, null, 8, ["edges", "nodes"]),
              I(" Nodes "),
              We(u0, {
                nodes: S.value || [],
                "node-types": e.nodeTypes,
                transform: c.value,
                draggable: e.nodesDraggable && !_.value,
                readonly: _.value,
                onNodeClick: be,
                onNodeDblclick: _e,
                onNodeContextmenu: Ue,
                onNodeDragStart: fe,
                onNodeDrag: Ze,
                onNodeDragEnd: Qe,
                onConnectStart: pt,
                onNodeSelectToggle: Se
              }, {
                node: jt((de) => [
                  ut(C.$slots, "node", vc(yc(de)), void 0, !0)
                ]),
                _: 3
                /* FORWARDED */
              }, 8, ["nodes", "node-types", "transform", "draggable", "readonly"]),
              I(" Selection Box "),
              We(d0, {
                "selection-rect": De(w).selectionRect.value,
                transform: c.value
              }, null, 8, ["selection-rect", "transform"])
            ],
            4
            /* STYLE */
          ),
          I(" UI Overlay Plugin Components (Controls, Minimap, etc.) "),
          (H(!0), E(
            pe,
            null,
            ke(g.value, (de) => (H(), E(
              pe,
              {
                key: de.id
              },
              [
                de.component ? (H(), Ve(
                  Pa(de.component),
                  Ht({
                    key: 0,
                    ref_for: !0
                  }, de.componentProps),
                  null,
                  16
                  /* FULL_PROPS */
                )) : I("v-if", !0)
              ],
              64
              /* STABLE_FRAGMENT */
            ))),
            128
            /* KEYED_FRAGMENT */
          )),
          I(" Connection Line (dragging) "),
          z.value ? (H(), E("svg", KD, [
            b("path", {
              d: V.value,
              stroke: "var(--flow-edge-animated-stroke, #409eff)",
              "stroke-width": "2",
              fill: "none",
              "stroke-dasharray": "5,5"
            }, null, 8, XD)
          ])) : I("v-if", !0),
          I(" Node Edit Panel "),
          I(" AI 工作流节点使用 AI 配置面板 "),
          (ve = (Q = se.value) == null ? void 0 : Q.type) != null && ve.startsWith("ai-") ? (H(), Ve(LD, {
            key: 1,
            node: se.value,
            visible: ne.value,
            onUpdate: st,
            onClose: Bt
          }, null, 8, ["node", "visible"])) : (H(), E(
            pe,
            { key: 2 },
            [
              I(" 普通节点使用基础编辑面板 "),
              We(A0, {
                node: se.value,
                visible: ne.value,
                onUpdate: st,
                onClose: Bt
              }, null, 8, ["node", "visible"])
            ],
            2112
            /* STABLE_FRAGMENT, DEV_ROOT_FRAGMENT */
          )),
          I(" Edge Edit Panel "),
          We(UD, {
            edge: O.value,
            visible: R.value,
            "edge-types": e.edgeTypes,
            onUpdate: Gt,
            onClose: et
          }, null, 8, ["edge", "visible", "edge-types"])
        ],
        34
        /* CLASS, NEED_HYDRATION */
      );
    };
  }
}), vF = /* @__PURE__ */ ue(ZD, [["__scopeId", "data-v-43f1653b"]]), QD = ["width", "height"], eT = ["cx", "cy", "fill"], tT = ["d", "stroke"], rT = ["fill"], nT = /* @__PURE__ */ ie({
  __name: "FlowBackground",
  props: {
    type: {},
    color: {},
    gap: {}
  },
  setup(e, { expose: a }) {
    var _;
    const n = e, o = `yh-bg-pattern-${((_ = Kw()) == null ? void 0 : _.uid) ?? Math.random().toString(36).slice(2)}`, s = ee(), t = ee(), i = ee(), u = ee(), d = n.gap || 20;
    function c(f) {
      const m = t.value;
      if (!m) return;
      const y = (n.gap || 20) * f.zoom, p = f.x % y, v = f.y % y;
      if (m.setAttribute("x", String(p)), m.setAttribute("y", String(v)), m.setAttribute("width", String(y)), m.setAttribute("height", String(y)), n.type === "dots" && i.value) {
        const g = y / 2;
        i.value.setAttribute("cx", String(g)), i.value.setAttribute("cy", String(g)), i.value.setAttribute("r", String(Math.max(0.8, 1.5 * f.zoom)));
      } else n.type === "grid" && u.value && u.value.setAttribute("d", `M ${y} 0 L 0 0 0 ${y}`);
    }
    return a({ updateViewport: c }), (f, m) => (H(), E(
      pe,
      null,
      [
        I(`
    ★ 性能优化背景：
    - 不依赖 Vue 响应式，改由父组件手动调用 update(viewport) 驱动
    - SVG pattern：只改 x/y/width/height 属性，浏览器不需要重绘
  `),
        (H(), E(
          "svg",
          {
            ref_key: "svgRef",
            ref: s,
            class: "yh-flow-background",
            xmlns: "http://www.w3.org/2000/svg"
          },
          [
            b("defs", null, [
              b("pattern", {
                ref_key: "patternRef",
                ref: t,
                id: o,
                x: "0",
                y: "0",
                width: De(d),
                height: De(d),
                patternUnits: "userSpaceOnUse"
              }, [
                e.type === "dots" ? (H(), E("circle", {
                  key: 0,
                  ref_key: "dotRef",
                  ref: i,
                  cx: De(d) / 2,
                  cy: De(d) / 2,
                  r: "1",
                  fill: e.color || "#b1b1b7"
                }, null, 8, eT)) : e.type === "grid" ? (H(), E("path", {
                  key: 1,
                  ref_key: "gridPathRef",
                  ref: u,
                  d: `M ${De(d)} 0 L 0 0 0 ${De(d)}`,
                  fill: "none",
                  stroke: e.color || "#e5e7eb",
                  "stroke-width": "0.5"
                }, null, 8, tT)) : I("v-if", !0)
              ], 8, QD)
            ]),
            b("rect", {
              width: "100%",
              height: "100%",
              fill: `url(#${o})`
            }, null, 8, rT)
          ],
          512
          /* NEED_PATCH */
        ))
      ],
      2112
      /* STABLE_FRAGMENT, DEV_ROOT_FRAGMENT */
    ));
  }
}), yF = /* @__PURE__ */ ue(nT, [["__scopeId", "data-v-f7d7420a"]]);
function aT(e, a) {
  if (e.match(/^[a-z]+:\/\//i))
    return e;
  if (e.match(/^\/\//))
    return window.location.protocol + e;
  if (e.match(/^[a-z]+:/i))
    return e;
  const n = document.implementation.createHTMLDocument(), r = n.createElement("base"), o = n.createElement("a");
  return n.head.appendChild(r), n.body.appendChild(o), a && (r.href = a), o.href = e, o.href;
}
const oT = /* @__PURE__ */ (() => {
  let e = 0;
  const a = () => (
    // eslint-disable-next-line no-bitwise
    `0000${(Math.random() * 36 ** 4 << 0).toString(36)}`.slice(-4)
  );
  return () => (e += 1, `u${a()}${e}`);
})();
function at(e) {
  const a = [];
  for (let n = 0, r = e.length; n < r; n++)
    a.push(e[n]);
  return a;
}
let ht = null;
function Kg(e = {}) {
  return ht || (e.includeStyleProperties ? (ht = e.includeStyleProperties, ht) : (ht = at(window.getComputedStyle(document.documentElement)), ht));
}
function Ja(e, a) {
  const r = (e.ownerDocument.defaultView || window).getComputedStyle(e).getPropertyValue(a);
  return r ? parseFloat(r.replace("px", "")) : 0;
}
function sT(e) {
  const a = Ja(e, "border-left-width"), n = Ja(e, "border-right-width");
  return e.clientWidth + a + n;
}
function iT(e) {
  const a = Ja(e, "border-top-width"), n = Ja(e, "border-bottom-width");
  return e.clientHeight + a + n;
}
function Wd(e, a = {}) {
  const n = a.width || sT(e), r = a.height || iT(e);
  return { width: n, height: r };
}
function uT() {
  let e, a;
  try {
    a = process;
  } catch {
  }
  const n = a && a.env ? a.env.devicePixelRatio : null;
  return n && (e = parseInt(n, 10), Number.isNaN(e) && (e = 1)), e || window.devicePixelRatio || 1;
}
const qe = 16384;
function lT(e) {
  (e.width > qe || e.height > qe) && (e.width > qe && e.height > qe ? e.width > e.height ? (e.height *= qe / e.width, e.width = qe) : (e.width *= qe / e.height, e.height = qe) : e.width > qe ? (e.height *= qe / e.width, e.width = qe) : (e.width *= qe / e.height, e.height = qe));
}
function dT(e, a = {}) {
  return e.toBlob ? new Promise((n) => {
    e.toBlob(n, a.type ? a.type : "image/png", a.quality ? a.quality : 1);
  }) : new Promise((n) => {
    const r = window.atob(e.toDataURL(a.type ? a.type : void 0, a.quality ? a.quality : void 0).split(",")[1]), o = r.length, s = new Uint8Array(o);
    for (let t = 0; t < o; t += 1)
      s[t] = r.charCodeAt(t);
    n(new Blob([s], {
      type: a.type ? a.type : "image/png"
    }));
  });
}
function Ua(e) {
  return new Promise((a, n) => {
    const r = new Image();
    r.onload = () => {
      r.decode().then(() => {
        requestAnimationFrame(() => a(r));
      });
    }, r.onerror = n, r.crossOrigin = "anonymous", r.decoding = "async", r.src = e;
  });
}
async function cT(e) {
  return Promise.resolve().then(() => new XMLSerializer().serializeToString(e)).then(encodeURIComponent).then((a) => `data:image/svg+xml;charset=utf-8,${a}`);
}
async function _T(e, a, n) {
  const r = "http://www.w3.org/2000/svg", o = document.createElementNS(r, "svg"), s = document.createElementNS(r, "foreignObject");
  return o.setAttribute("width", `${a}`), o.setAttribute("height", `${n}`), o.setAttribute("viewBox", `0 0 ${a} ${n}`), s.setAttribute("width", "100%"), s.setAttribute("height", "100%"), s.setAttribute("x", "0"), s.setAttribute("y", "0"), s.setAttribute("externalResourcesRequired", "true"), o.appendChild(s), s.appendChild(e), cT(o);
}
const Ee = (e, a) => {
  if (e instanceof a)
    return !0;
  const n = Object.getPrototypeOf(e);
  return n === null ? !1 : n.constructor.name === a.name || Ee(n, a);
};
function fT(e) {
  const a = e.getPropertyValue("content");
  return `${e.cssText} content: '${a.replace(/'|"/g, "")}';`;
}
function mT(e, a) {
  return Kg(a).map((n) => {
    const r = e.getPropertyValue(n), o = e.getPropertyPriority(n);
    return `${n}: ${r}${o ? " !important" : ""};`;
  }).join(" ");
}
function pT(e, a, n, r) {
  const o = `.${e}:${a}`, s = n.cssText ? fT(n) : mT(n, r);
  return document.createTextNode(`${o}{${s}}`);
}
function Sc(e, a, n, r) {
  const o = window.getComputedStyle(e, n), s = o.getPropertyValue("content");
  if (s === "" || s === "none")
    return;
  const t = oT();
  try {
    a.className = `${a.className} ${t}`;
  } catch {
    return;
  }
  const i = document.createElement("style");
  i.appendChild(pT(t, n, o, r)), a.appendChild(i);
}
function hT(e, a, n) {
  Sc(e, a, ":before", n), Sc(e, a, ":after", n);
}
const Dc = "application/font-woff", Tc = "image/jpeg", vT = {
  woff: Dc,
  woff2: Dc,
  ttf: "application/font-truetype",
  eot: "application/vnd.ms-fontobject",
  png: "image/png",
  jpg: Tc,
  jpeg: Tc,
  gif: "image/gif",
  tiff: "image/tiff",
  svg: "image/svg+xml",
  webp: "image/webp"
};
function yT(e) {
  const a = /\.([^./]*?)$/g.exec(e);
  return a ? a[1] : "";
}
function Vd(e) {
  const a = yT(e).toLowerCase();
  return vT[a] || "";
}
function gT(e) {
  return e.split(/,/)[1];
}
function Fd(e) {
  return e.search(/^(data:)/) !== -1;
}
function MT(e, a) {
  return `data:${a};base64,${e}`;
}
async function Xg(e, a, n) {
  const r = await fetch(e, a);
  if (r.status === 404)
    throw new Error(`Resource "${r.url}" not found`);
  const o = await r.blob();
  return new Promise((s, t) => {
    const i = new FileReader();
    i.onerror = t, i.onloadend = () => {
      try {
        s(n({ res: r, result: i.result }));
      } catch (u) {
        t(u);
      }
    }, i.readAsDataURL(o);
  });
}
const wo = {};
function bT(e, a, n) {
  let r = e.replace(/\?.*/, "");
  return n && (r = e), /ttf|otf|eot|woff2?/i.test(r) && (r = r.replace(/.*\//, "")), a ? `[${a}]${r}` : r;
}
async function Kd(e, a, n) {
  const r = bT(e, a, n.includeQueryParams);
  if (wo[r] != null)
    return wo[r];
  n.cacheBust && (e += (/\?/.test(e) ? "&" : "?") + (/* @__PURE__ */ new Date()).getTime());
  let o;
  try {
    const s = await Xg(e, n.fetchRequestInit, ({ res: t, result: i }) => (a || (a = t.headers.get("Content-Type") || ""), gT(i)));
    o = MT(s, a);
  } catch (s) {
    o = n.imagePlaceholder || "";
    let t = `Failed to fetch resource: ${e}`;
    s && (t = typeof s == "string" ? s : s.message), t && console.warn(t);
  }
  return wo[r] = o, o;
}
async function YT(e) {
  const a = e.toDataURL();
  return a === "data:," ? e.cloneNode(!1) : Ua(a);
}
async function wT(e, a) {
  if (e.currentSrc) {
    const s = document.createElement("canvas"), t = s.getContext("2d");
    s.width = e.clientWidth, s.height = e.clientHeight, t == null || t.drawImage(e, 0, 0, s.width, s.height);
    const i = s.toDataURL();
    return Ua(i);
  }
  const n = e.poster, r = Vd(n), o = await Kd(n, r, a);
  return Ua(o);
}
async function xT(e, a) {
  var n;
  try {
    if (!((n = e == null ? void 0 : e.contentDocument) === null || n === void 0) && n.body)
      return await Za(e.contentDocument.body, a, !0);
  } catch {
  }
  return e.cloneNode(!1);
}
async function LT(e, a) {
  return Ee(e, HTMLCanvasElement) ? YT(e) : Ee(e, HTMLVideoElement) ? wT(e, a) : Ee(e, HTMLIFrameElement) ? xT(e, a) : e.cloneNode(Zg(e));
}
const kT = (e) => e.tagName != null && e.tagName.toUpperCase() === "SLOT", Zg = (e) => e.tagName != null && e.tagName.toUpperCase() === "SVG";
async function ST(e, a, n) {
  var r, o;
  if (Zg(a))
    return a;
  let s = [];
  return kT(e) && e.assignedNodes ? s = at(e.assignedNodes()) : Ee(e, HTMLIFrameElement) && (!((r = e.contentDocument) === null || r === void 0) && r.body) ? s = at(e.contentDocument.body.childNodes) : s = at(((o = e.shadowRoot) !== null && o !== void 0 ? o : e).childNodes), s.length === 0 || Ee(e, HTMLVideoElement) || await s.reduce((t, i) => t.then(() => Za(i, n)).then((u) => {
    u && a.appendChild(u);
  }), Promise.resolve()), a;
}
function DT(e, a, n) {
  const r = a.style;
  if (!r)
    return;
  const o = window.getComputedStyle(e);
  o.cssText ? (r.cssText = o.cssText, r.transformOrigin = o.transformOrigin) : Kg(n).forEach((s) => {
    let t = o.getPropertyValue(s);
    s === "font-size" && t.endsWith("px") && (t = `${Math.floor(parseFloat(t.substring(0, t.length - 2))) - 0.1}px`), Ee(e, HTMLIFrameElement) && s === "display" && t === "inline" && (t = "block"), s === "d" && a.getAttribute("d") && (t = `path(${a.getAttribute("d")})`), r.setProperty(s, t, o.getPropertyPriority(s));
  });
}
function TT(e, a) {
  Ee(e, HTMLTextAreaElement) && (a.innerHTML = e.value), Ee(e, HTMLInputElement) && a.setAttribute("value", e.value);
}
function $T(e, a) {
  if (Ee(e, HTMLSelectElement)) {
    const r = Array.from(a.children).find((o) => e.value === o.getAttribute("value"));
    r && r.setAttribute("selected", "");
  }
}
function HT(e, a, n) {
  return Ee(a, Element) && (DT(e, a, n), hT(e, a, n), TT(e, a), $T(e, a)), a;
}
async function jT(e, a) {
  const n = e.querySelectorAll ? e.querySelectorAll("use") : [];
  if (n.length === 0)
    return e;
  const r = {};
  for (let s = 0; s < n.length; s++) {
    const i = n[s].getAttribute("xlink:href");
    if (i) {
      const u = e.querySelector(i), l = document.querySelector(i);
      !u && l && !r[i] && (r[i] = await Za(l, a, !0));
    }
  }
  const o = Object.values(r);
  if (o.length) {
    const s = "http://www.w3.org/1999/xhtml", t = document.createElementNS(s, "svg");
    t.setAttribute("xmlns", s), t.style.position = "absolute", t.style.width = "0", t.style.height = "0", t.style.overflow = "hidden", t.style.display = "none";
    const i = document.createElementNS(s, "defs");
    t.appendChild(i);
    for (let u = 0; u < o.length; u++)
      i.appendChild(o[u]);
    e.appendChild(t);
  }
  return e;
}
async function Za(e, a, n) {
  return !n && a.filter && !a.filter(e) ? null : Promise.resolve(e).then((r) => LT(r, a)).then((r) => ST(e, r, a)).then((r) => HT(e, r, a)).then((r) => jT(r, a));
}
const Qg = /url\((['"]?)([^'"]+?)\1\)/g, ET = /url\([^)]+\)\s*format\((["']?)([^"']+)\1\)/g, CT = /src:\s*(?:url\([^)]+\)\s*format\([^)]+\)[,;]\s*)+/g;
function qT(e) {
  const a = e.replace(/([.*+?^${}()|\[\]\/\\])/g, "\\$1");
  return new RegExp(`(url\\(['"]?)(${a})(['"]?\\))`, "g");
}
function AT(e) {
  const a = [];
  return e.replace(Qg, (n, r, o) => (a.push(o), n)), a.filter((n) => !Fd(n));
}
async function RT(e, a, n, r, o) {
  try {
    const s = n ? aT(a, n) : a, t = Vd(a);
    let i;
    return o || (i = await Kd(s, t, r)), e.replace(qT(a), `$1${i}$3`);
  } catch {
  }
  return e;
}
function PT(e, { preferredFontFormat: a }) {
  return a ? e.replace(CT, (n) => {
    for (; ; ) {
      const [r, , o] = ET.exec(n) || [];
      if (!o)
        return "";
      if (o === a)
        return `src: ${r};`;
    }
  }) : e;
}
function eM(e) {
  return e.search(Qg) !== -1;
}
async function tM(e, a, n) {
  if (!eM(e))
    return e;
  const r = PT(e, n);
  return AT(r).reduce((s, t) => s.then((i) => RT(i, t, a, n)), Promise.resolve(r));
}
async function vt(e, a, n) {
  var r;
  const o = (r = a.style) === null || r === void 0 ? void 0 : r.getPropertyValue(e);
  if (o) {
    const s = await tM(o, null, n);
    return a.style.setProperty(e, s, a.style.getPropertyPriority(e)), !0;
  }
  return !1;
}
async function IT(e, a) {
  await vt("background", e, a) || await vt("background-image", e, a), await vt("mask", e, a) || await vt("-webkit-mask", e, a) || await vt("mask-image", e, a) || await vt("-webkit-mask-image", e, a);
}
async function NT(e, a) {
  const n = Ee(e, HTMLImageElement);
  if (!(n && !Fd(e.src)) && !(Ee(e, SVGImageElement) && !Fd(e.href.baseVal)))
    return;
  const r = n ? e.src : e.href.baseVal, o = await Kd(r, Vd(r), a);
  await new Promise((s, t) => {
    e.onload = s, e.onerror = a.onImageErrorHandler ? (...u) => {
      try {
        s(a.onImageErrorHandler(...u));
      } catch (l) {
        t(l);
      }
    } : t;
    const i = e;
    i.decode && (i.decode = s), i.loading === "lazy" && (i.loading = "eager"), n ? (e.srcset = "", e.src = o) : e.href.baseVal = o;
  });
}
async function OT(e, a) {
  const r = at(e.childNodes).map((o) => rM(o, a));
  await Promise.all(r).then(() => e);
}
async function rM(e, a) {
  Ee(e, Element) && (await IT(e, a), await NT(e, a), await OT(e, a));
}
function zT(e, a) {
  const { style: n } = e;
  a.backgroundColor && (n.backgroundColor = a.backgroundColor), a.width && (n.width = `${a.width}px`), a.height && (n.height = `${a.height}px`);
  const r = a.style;
  return r != null && Object.keys(r).forEach((o) => {
    n[o] = r[o];
  }), e;
}
const $c = {};
async function Hc(e) {
  let a = $c[e];
  if (a != null)
    return a;
  const r = await (await fetch(e)).text();
  return a = { url: e, cssText: r }, $c[e] = a, a;
}
async function jc(e, a) {
  let n = e.cssText;
  const r = /url\(["']?([^"')]+)["']?\)/g, s = (n.match(/url\([^)]+\)/g) || []).map(async (t) => {
    let i = t.replace(r, "$1");
    return i.startsWith("https://") || (i = new URL(i, e.url).href), Xg(i, a.fetchRequestInit, ({ result: u }) => (n = n.replace(t, `url(${u})`), [t, u]));
  });
  return Promise.all(s).then(() => n);
}
function Ec(e) {
  if (e == null)
    return [];
  const a = [], n = /(\/\*[\s\S]*?\*\/)/gi;
  let r = e.replace(n, "");
  const o = new RegExp("((@.*?keyframes [\\s\\S]*?){([\\s\\S]*?}\\s*?)})", "gi");
  for (; ; ) {
    const u = o.exec(r);
    if (u === null)
      break;
    a.push(u[0]);
  }
  r = r.replace(o, "");
  const s = /@import[\s\S]*?url\([^)]*\)[\s\S]*?;/gi, t = "((\\s*?(?:\\/\\*[\\s\\S]*?\\*\\/)?\\s*?@media[\\s\\S]*?){([\\s\\S]*?)}\\s*?})|(([\\s\\S]*?){([\\s\\S]*?)})", i = new RegExp(t, "gi");
  for (; ; ) {
    let u = s.exec(r);
    if (u === null) {
      if (u = i.exec(r), u === null)
        break;
      s.lastIndex = i.lastIndex;
    } else
      i.lastIndex = s.lastIndex;
    a.push(u[0]);
  }
  return a;
}
async function FT(e, a) {
  const n = [], r = [];
  return e.forEach((o) => {
    if ("cssRules" in o)
      try {
        at(o.cssRules || []).forEach((s, t) => {
          if (s.type === CSSRule.IMPORT_RULE) {
            let i = t + 1;
            const u = s.href, l = Hc(u).then((d) => jc(d, a)).then((d) => Ec(d).forEach((c) => {
              try {
                o.insertRule(c, c.startsWith("@import") ? i += 1 : o.cssRules.length);
              } catch (_) {
                console.error("Error inserting rule from remote css", {
                  rule: c,
                  error: _
                });
              }
            })).catch((d) => {
              console.error("Error loading remote css", d.toString());
            });
            r.push(l);
          }
        });
      } catch (s) {
        const t = e.find((i) => i.href == null) || document.styleSheets[0];
        o.href != null && r.push(Hc(o.href).then((i) => jc(i, a)).then((i) => Ec(i).forEach((u) => {
          t.insertRule(u, t.cssRules.length);
        })).catch((i) => {
          console.error("Error loading remote stylesheet", i);
        })), console.error("Error inlining remote css file", s);
      }
  }), Promise.all(r).then(() => (e.forEach((o) => {
    if ("cssRules" in o)
      try {
        at(o.cssRules || []).forEach((s) => {
          n.push(s);
        });
      } catch (s) {
        console.error(`Error while reading CSS rules from ${o.href}`, s);
      }
  }), n));
}
function BT(e) {
  return e.filter((a) => a.type === CSSRule.FONT_FACE_RULE).filter((a) => eM(a.style.getPropertyValue("src")));
}
async function GT(e, a) {
  if (e.ownerDocument == null)
    throw new Error("Provided element is not within a Document");
  const n = at(e.ownerDocument.styleSheets), r = await FT(n, a);
  return BT(r);
}
function nM(e) {
  return e.trim().replace(/["']/g, "");
}
function JT(e) {
  const a = /* @__PURE__ */ new Set();
  function n(r) {
    (r.style.fontFamily || getComputedStyle(r).fontFamily).split(",").forEach((s) => {
      a.add(nM(s));
    }), Array.from(r.children).forEach((s) => {
      s instanceof HTMLElement && n(s);
    });
  }
  return n(e), a;
}
async function aM(e, a) {
  const n = await GT(e, a), r = JT(e);
  return (await Promise.all(n.filter((s) => r.has(nM(s.style.fontFamily))).map((s) => {
    const t = s.parentStyleSheet ? s.parentStyleSheet.href : null;
    return tM(s.cssText, t, a);
  }))).join(`
`);
}
async function UT(e, a) {
  const n = a.fontEmbedCSS != null ? a.fontEmbedCSS : a.skipFonts ? null : await aM(e, a);
  if (n) {
    const r = document.createElement("style"), o = document.createTextNode(n);
    r.appendChild(o), e.firstChild ? e.insertBefore(r, e.firstChild) : e.appendChild(r);
  }
}
async function oM(e, a = {}) {
  const { width: n, height: r } = Wd(e, a), o = await Za(e, a, !0);
  return await UT(o, a), await rM(o, a), zT(o, a), await _T(o, n, r);
}
async function Pt(e, a = {}) {
  const { width: n, height: r } = Wd(e, a), o = await oM(e, a), s = await Ua(o), t = document.createElement("canvas"), i = t.getContext("2d"), u = a.pixelRatio || uT(), l = a.canvasWidth || n, d = a.canvasHeight || r;
  return t.width = l * u, t.height = d * u, a.skipAutoScale || lT(t), t.style.width = `${l}`, t.style.height = `${d}`, a.backgroundColor && (i.fillStyle = a.backgroundColor, i.fillRect(0, 0, t.width, t.height)), i.drawImage(s, 0, 0, t.width, t.height), t;
}
async function WT(e, a = {}) {
  const { width: n, height: r } = Wd(e, a);
  return (await Pt(e, a)).getContext("2d").getImageData(0, 0, n, r).data;
}
async function VT(e, a = {}) {
  return (await Pt(e, a)).toDataURL();
}
async function KT(e, a = {}) {
  return (await Pt(e, a)).toDataURL("image/jpeg", a.quality || 1);
}
async function XT(e, a = {}) {
  const n = await Pt(e, a);
  return await dT(n);
}
async function ZT(e, a = {}) {
  return aM(e, a);
}
const QT = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  getFontEmbedCSS: ZT,
  toBlob: XT,
  toCanvas: Pt,
  toJpeg: KT,
  toPixelData: WT,
  toPng: VT,
  toSvg: oM
}, Symbol.toStringTag, { value: "Module" }));
var rr = { exports: {} }, e$ = rr.exports, Cc;
function t$() {
  return Cc || (Cc = 1, (function(e, a) {
    (function(n, r) {
      e.exports = r(P());
    })(e$, (function(n) {
      function r(t) {
        return t && typeof t == "object" && "default" in t ? t : { default: t };
      }
      var o = r(n), s = { name: "af", weekdays: "Sondag_Maandag_Dinsdag_Woensdag_Donderdag_Vrydag_Saterdag".split("_"), months: "Januarie_Februarie_Maart_April_Mei_Junie_Julie_Augustus_September_Oktober_November_Desember".split("_"), weekStart: 1, weekdaysShort: "Son_Maa_Din_Woe_Don_Vry_Sat".split("_"), monthsShort: "Jan_Feb_Mrt_Apr_Mei_Jun_Jul_Aug_Sep_Okt_Nov_Des".split("_"), weekdaysMin: "So_Ma_Di_Wo_Do_Vr_Sa".split("_"), ordinal: function(t) {
        return t;
      }, formats: { LT: "HH:mm", LTS: "HH:mm:ss", L: "DD/MM/YYYY", LL: "D MMMM YYYY", LLL: "D MMMM YYYY HH:mm", LLLL: "dddd, D MMMM YYYY HH:mm" }, relativeTime: { future: "oor %s", past: "%s gelede", s: "'n paar sekondes", m: "'n minuut", mm: "%d minute", h: "'n uur", hh: "%d ure", d: "'n dag", dd: "%d dae", M: "'n maand", MM: "%d maande", y: "'n jaar", yy: "%d jaar" } };
      return o.default.locale(s, null, !0), s;
    }));
  })(rr)), rr.exports;
}
var sM = t$();
const r$ = /* @__PURE__ */ A(sM), n$ = /* @__PURE__ */ q({
  __proto__: null,
  default: r$
}, [sM]);
var nr = { exports: {} }, a$ = nr.exports, qc;
function o$() {
  return qc || (qc = 1, (function(e, a) {
    (function(n, r) {
      e.exports = r(P());
    })(a$, (function(n) {
      function r(t) {
        return t && typeof t == "object" && "default" in t ? t : { default: t };
      }
      var o = r(n), s = { name: "am", weekdays: "እሑድ_ሰኞ_ማክሰኞ_ረቡዕ_ሐሙስ_አርብ_ቅዳሜ".split("_"), weekdaysShort: "እሑድ_ሰኞ_ማክሰ_ረቡዕ_ሐሙስ_አርብ_ቅዳሜ".split("_"), weekdaysMin: "እሑ_ሰኞ_ማክ_ረቡ_ሐሙ_አር_ቅዳ".split("_"), months: "ጃንዋሪ_ፌብሯሪ_ማርች_ኤፕሪል_ሜይ_ጁን_ጁላይ_ኦገስት_ሴፕቴምበር_ኦክቶበር_ኖቬምበር_ዲሴምበር".split("_"), monthsShort: "ጃንዋ_ፌብሯ_ማርች_ኤፕሪ_ሜይ_ጁን_ጁላይ_ኦገስ_ሴፕቴ_ኦክቶ_ኖቬም_ዲሴም".split("_"), weekStart: 1, yearStart: 4, relativeTime: { future: "በ%s", past: "%s በፊት", s: "ጥቂት ሰከንዶች", m: "አንድ ደቂቃ", mm: "%d ደቂቃዎች", h: "አንድ ሰዓት", hh: "%d ሰዓታት", d: "አንድ ቀን", dd: "%d ቀናት", M: "አንድ ወር", MM: "%d ወራት", y: "አንድ ዓመት", yy: "%d ዓመታት" }, formats: { LT: "HH:mm", LTS: "HH:mm:ss", L: "DD/MM/YYYY", LL: "MMMM D ፣ YYYY", LLL: "MMMM D ፣ YYYY HH:mm", LLLL: "dddd ፣ MMMM D ፣ YYYY HH:mm" }, ordinal: function(t) {
        return t + "ኛ";
      } };
      return o.default.locale(s, null, !0), s;
    }));
  })(nr)), nr.exports;
}
var iM = o$();
const s$ = /* @__PURE__ */ A(iM), i$ = /* @__PURE__ */ q({
  __proto__: null,
  default: s$
}, [iM]);
var ar = { exports: {} }, u$ = ar.exports, Ac;
function l$() {
  return Ac || (Ac = 1, (function(e, a) {
    (function(n, r) {
      e.exports = r(P());
    })(u$, (function(n) {
      function r(t) {
        return t && typeof t == "object" && "default" in t ? t : { default: t };
      }
      var o = r(n), s = { name: "ar-dz", weekdays: "الأحد_الإثنين_الثلاثاء_الأربعاء_الخميس_الجمعة_السبت".split("_"), months: "جانفي_فيفري_مارس_أفريل_ماي_جوان_جويلية_أوت_سبتمبر_أكتوبر_نوفمبر_ديسمبر".split("_"), weekdaysShort: "احد_اثنين_ثلاثاء_اربعاء_خميس_جمعة_سبت".split("_"), monthsShort: "جانفي_فيفري_مارس_أفريل_ماي_جوان_جويلية_أوت_سبتمبر_أكتوبر_نوفمبر_ديسمبر".split("_"), weekdaysMin: "أح_إث_ثلا_أر_خم_جم_سب".split("_"), ordinal: function(t) {
        return t;
      }, formats: { LT: "HH:mm", LTS: "HH:mm:ss", L: "DD/MM/YYYY", LL: "D MMMM YYYY", LLL: "D MMMM YYYY HH:mm", LLLL: "dddd D MMMM YYYY HH:mm" }, meridiem: function(t) {
        return t > 12 ? "م" : "ص";
      }, relativeTime: { future: "في %s", past: "منذ %s", s: "ثوان", m: "دقيقة", mm: "%d دقائق", h: "ساعة", hh: "%d ساعات", d: "يوم", dd: "%d أيام", M: "شهر", MM: "%d أشهر", y: "سنة", yy: "%d سنوات" } };
      return o.default.locale(s, null, !0), s;
    }));
  })(ar)), ar.exports;
}
var uM = l$();
const d$ = /* @__PURE__ */ A(uM), c$ = /* @__PURE__ */ q({
  __proto__: null,
  default: d$
}, [uM]);
var or = { exports: {} }, _$ = or.exports, Rc;
function f$() {
  return Rc || (Rc = 1, (function(e, a) {
    (function(n, r) {
      e.exports = r(P());
    })(_$, (function(n) {
      function r(t) {
        return t && typeof t == "object" && "default" in t ? t : { default: t };
      }
      var o = r(n), s = { name: "ar-iq", weekdays: "الأحد_الإثنين_الثلاثاء_الأربعاء_الخميس_الجمعة_السبت".split("_"), months: "كانون الثاني_شباط_آذار_نيسان_أيار_حزيران_تموز_آب_أيلول_تشرين الأول_ تشرين الثاني_كانون الأول".split("_"), weekStart: 1, weekdaysShort: "أحد_إثنين_ثلاثاء_أربعاء_خميس_جمعة_سبت".split("_"), monthsShort: "كانون الثاني_شباط_آذار_نيسان_أيار_حزيران_تموز_آب_أيلول_تشرين الأول_ تشرين الثاني_كانون الأول".split("_"), weekdaysMin: "ح_ن_ث_ر_خ_ج_س".split("_"), ordinal: function(t) {
        return t;
      }, formats: { LT: "HH:mm", LTS: "HH:mm:ss", L: "DD/MM/YYYY", LL: "D MMMM YYYY", LLL: "D MMMM YYYY HH:mm", LLLL: "dddd D MMMM YYYY HH:mm" }, meridiem: function(t) {
        return t > 12 ? "م" : "ص";
      }, relativeTime: { future: "في %s", past: "منذ %s", s: "ثوان", m: "دقيقة", mm: "%d دقائق", h: "ساعة", hh: "%d ساعات", d: "يوم", dd: "%d أيام", M: "شهر", MM: "%d أشهر", y: "سنة", yy: "%d سنوات" } };
      return o.default.locale(s, null, !0), s;
    }));
  })(or)), or.exports;
}
var lM = f$();
const m$ = /* @__PURE__ */ A(lM), p$ = /* @__PURE__ */ q({
  __proto__: null,
  default: m$
}, [lM]);
var sr = { exports: {} }, h$ = sr.exports, Pc;
function v$() {
  return Pc || (Pc = 1, (function(e, a) {
    (function(n, r) {
      e.exports = r(P());
    })(h$, (function(n) {
      function r(t) {
        return t && typeof t == "object" && "default" in t ? t : { default: t };
      }
      var o = r(n), s = { name: "ar-kw", weekdays: "الأحد_الإثنين_الثلاثاء_الأربعاء_الخميس_الجمعة_السبت".split("_"), months: "يناير_فبراير_مارس_أبريل_ماي_يونيو_يوليوز_غشت_شتنبر_أكتوبر_نونبر_دجنبر".split("_"), weekdaysShort: "احد_اثنين_ثلاثاء_اربعاء_خميس_جمعة_سبت".split("_"), monthsShort: "يناير_فبراير_مارس_أبريل_ماي_يونيو_يوليوز_غشت_شتنبر_أكتوبر_نونبر_دجنبر".split("_"), weekdaysMin: "ح_ن_ث_ر_خ_ج_س".split("_"), ordinal: function(t) {
        return t;
      }, formats: { LT: "HH:mm", LTS: "HH:mm:ss", L: "DD/MM/YYYY", LL: "D MMMM YYYY", LLL: "D MMMM YYYY HH:mm", LLLL: "dddd D MMMM YYYY HH:mm" }, meridiem: function(t) {
        return t > 12 ? "م" : "ص";
      }, relativeTime: { future: "في %s", past: "منذ %s", s: "ثوان", m: "دقيقة", mm: "%d دقائق", h: "ساعة", hh: "%d ساعات", d: "يوم", dd: "%d أيام", M: "شهر", MM: "%d أشهر", y: "سنة", yy: "%d سنوات" } };
      return o.default.locale(s, null, !0), s;
    }));
  })(sr)), sr.exports;
}
var dM = v$();
const y$ = /* @__PURE__ */ A(dM), g$ = /* @__PURE__ */ q({
  __proto__: null,
  default: y$
}, [dM]);
var ir = { exports: {} }, M$ = ir.exports, Ic;
function b$() {
  return Ic || (Ic = 1, (function(e, a) {
    (function(n, r) {
      e.exports = r(P());
    })(M$, (function(n) {
      function r(t) {
        return t && typeof t == "object" && "default" in t ? t : { default: t };
      }
      var o = r(n), s = { name: "ar-ly", weekdays: "الأحد_الإثنين_الثلاثاء_الأربعاء_الخميس_الجمعة_السبت".split("_"), months: "يناير_فبراير_مارس_أبريل_مايو_يونيو_يوليو_أغسطس_سبتمبر_أكتوبر_نوفمبر_ديسمبر".split("_"), weekStart: 6, weekdaysShort: "أحد_إثنين_ثلاثاء_أربعاء_خميس_جمعة_سبت".split("_"), monthsShort: "يناير_فبراير_مارس_أبريل_مايو_يونيو_يوليو_أغسطس_سبتمبر_أكتوبر_نوفمبر_ديسمبر".split("_"), weekdaysMin: "ح_ن_ث_ر_خ_ج_س".split("_"), ordinal: function(t) {
        return t;
      }, meridiem: function(t) {
        return t > 12 ? "م" : "ص";
      }, formats: { LT: "HH:mm", LTS: "HH:mm:ss", L: "D/‏M/‏YYYY", LL: "D MMMM YYYY", LLL: "D MMMM YYYY HH:mm", LLLL: "dddd D MMMM YYYY HH:mm" } };
      return o.default.locale(s, null, !0), s;
    }));
  })(ir)), ir.exports;
}
var cM = b$();
const Y$ = /* @__PURE__ */ A(cM), w$ = /* @__PURE__ */ q({
  __proto__: null,
  default: Y$
}, [cM]);
var ur = { exports: {} }, x$ = ur.exports, Nc;
function L$() {
  return Nc || (Nc = 1, (function(e, a) {
    (function(n, r) {
      e.exports = r(P());
    })(x$, (function(n) {
      function r(t) {
        return t && typeof t == "object" && "default" in t ? t : { default: t };
      }
      var o = r(n), s = { name: "ar-ma", weekdays: "الأحد_الإثنين_الثلاثاء_الأربعاء_الخميس_الجمعة_السبت".split("_"), months: "يناير_فبراير_مارس_أبريل_ماي_يونيو_يوليوز_غشت_شتنبر_أكتوبر_نونبر_دجنبر".split("_"), weekStart: 6, weekdaysShort: "احد_إثنين_ثلاثاء_اربعاء_خميس_جمعة_سبت".split("_"), monthsShort: "يناير_فبراير_مارس_أبريل_ماي_يونيو_يوليوز_غشت_شتنبر_أكتوبر_نونبر_دجنبر".split("_"), weekdaysMin: "ح_ن_ث_ر_خ_ج_س".split("_"), ordinal: function(t) {
        return t;
      }, formats: { LT: "HH:mm", LTS: "HH:mm:ss", L: "DD/MM/YYYY", LL: "D MMMM YYYY", LLL: "D MMMM YYYY HH:mm", LLLL: "dddd D MMMM YYYY HH:mm" }, meridiem: function(t) {
        return t > 12 ? "م" : "ص";
      }, relativeTime: { future: "في %s", past: "منذ %s", s: "ثوان", m: "دقيقة", mm: "%d دقائق", h: "ساعة", hh: "%d ساعات", d: "يوم", dd: "%d أيام", M: "شهر", MM: "%d أشهر", y: "سنة", yy: "%d سنوات" } };
      return o.default.locale(s, null, !0), s;
    }));
  })(ur)), ur.exports;
}
var _M = L$();
const k$ = /* @__PURE__ */ A(_M), S$ = /* @__PURE__ */ q({
  __proto__: null,
  default: k$
}, [_M]);
var lr = { exports: {} }, D$ = lr.exports, Oc;
function T$() {
  return Oc || (Oc = 1, (function(e, a) {
    (function(n, r) {
      e.exports = r(P());
    })(D$, (function(n) {
      function r(t) {
        return t && typeof t == "object" && "default" in t ? t : { default: t };
      }
      var o = r(n), s = { name: "ar-sa", weekdays: "الأحد_الإثنين_الثلاثاء_الأربعاء_الخميس_الجمعة_السبت".split("_"), months: "يناير_فبراير_مارس_أبريل_مايو_يونيو_يوليو_أغسطس_سبتمبر_أكتوبر_نوفمبر_ديسمبر".split("_"), weekdaysShort: "أحد_إثنين_ثلاثاء_أربعاء_خميس_جمعة_سبت".split("_"), monthsShort: "يناير_فبراير_مارس_أبريل_مايو_يونيو_يوليو_أغسطس_سبتمبر_أكتوبر_نوفمبر_ديسمبر".split("_"), weekdaysMin: "ح_ن_ث_ر_خ_ج_س".split("_"), ordinal: function(t) {
        return t;
      }, formats: { LT: "HH:mm", LTS: "HH:mm:ss", L: "DD/MM/YYYY", LL: "D MMMM YYYY", LLL: "D MMMM YYYY HH:mm", LLLL: "dddd D MMMM YYYY HH:mm" }, meridiem: function(t) {
        return t > 12 ? "م" : "ص";
      }, relativeTime: { future: "في %s", past: "منذ %s", s: "ثوان", m: "دقيقة", mm: "%d دقائق", h: "ساعة", hh: "%d ساعات", d: "يوم", dd: "%d أيام", M: "شهر", MM: "%d أشهر", y: "سنة", yy: "%d سنوات" } };
      return o.default.locale(s, null, !0), s;
    }));
  })(lr)), lr.exports;
}
var fM = T$();
const $$ = /* @__PURE__ */ A(fM), H$ = /* @__PURE__ */ q({
  __proto__: null,
  default: $$
}, [fM]);
var dr = { exports: {} }, j$ = dr.exports, zc;
function E$() {
  return zc || (zc = 1, (function(e, a) {
    (function(n, r) {
      e.exports = r(P());
    })(j$, (function(n) {
      function r(t) {
        return t && typeof t == "object" && "default" in t ? t : { default: t };
      }
      var o = r(n), s = { name: "ar-tn", weekdays: "الأحد_الإثنين_الثلاثاء_الأربعاء_الخميس_الجمعة_السبت".split("_"), months: "جانفي_فيفري_مارس_أفريل_ماي_جوان_جويلية_أوت_سبتمبر_أكتوبر_نوفمبر_ديسمبر".split("_"), weekStart: 1, weekdaysShort: "أحد_إثنين_ثلاثاء_أربعاء_خميس_جمعة_سبت".split("_"), monthsShort: "جانفي_فيفري_مارس_أفريل_ماي_جوان_جويلية_أوت_سبتمبر_أكتوبر_نوفمبر_ديسمبر".split("_"), weekdaysMin: "ح_ن_ث_ر_خ_ج_س".split("_"), ordinal: function(t) {
        return t;
      }, formats: { LT: "HH:mm", LTS: "HH:mm:ss", L: "DD/MM/YYYY", LL: "D MMMM YYYY", LLL: "D MMMM YYYY HH:mm", LLLL: "dddd D MMMM YYYY HH:mm" }, meridiem: function(t) {
        return t > 12 ? "م" : "ص";
      }, relativeTime: { future: "في %s", past: "منذ %s", s: "ثوان", m: "دقيقة", mm: "%d دقائق", h: "ساعة", hh: "%d ساعات", d: "يوم", dd: "%d أيام", M: "شهر", MM: "%d أشهر", y: "سنة", yy: "%d سنوات" } };
      return o.default.locale(s, null, !0), s;
    }));
  })(dr)), dr.exports;
}
var mM = E$();
const C$ = /* @__PURE__ */ A(mM), q$ = /* @__PURE__ */ q({
  __proto__: null,
  default: C$
}, [mM]);
var cr = { exports: {} }, A$ = cr.exports, Fc;
function R$() {
  return Fc || (Fc = 1, (function(e, a) {
    (function(n, r) {
      e.exports = r(P());
    })(A$, (function(n) {
      function r(f) {
        return f && typeof f == "object" && "default" in f ? f : { default: f };
      }
      var o = r(n), s = "يناير_فبراير_مارس_أبريل_مايو_يونيو_يوليو_أغسطس_سبتمبر_أكتوبر_نوفمبر_ديسمبر".split("_"), t = { 1: "١", 2: "٢", 3: "٣", 4: "٤", 5: "٥", 6: "٦", 7: "٧", 8: "٨", 9: "٩", 0: "٠" }, i = { "١": "1", "٢": "2", "٣": "3", "٤": "4", "٥": "5", "٦": "6", "٧": "7", "٨": "8", "٩": "9", "٠": "0" }, u = /[١٢٣٤٥٦٧٨٩٠]/g, l = /،/g, d = /\d/g, c = /,/g, _ = { name: "ar", weekdays: "الأحد_الإثنين_الثلاثاء_الأربعاء_الخميس_الجمعة_السبت".split("_"), weekdaysShort: "أحد_إثنين_ثلاثاء_أربعاء_خميس_جمعة_سبت".split("_"), weekdaysMin: "ح_ن_ث_ر_خ_ج_س".split("_"), months: s, monthsShort: s, weekStart: 6, meridiem: function(f) {
        return f > 12 ? "م" : "ص";
      }, relativeTime: { future: "بعد %s", past: "منذ %s", s: "ثانية واحدة", m: "دقيقة واحدة", mm: "%d دقائق", h: "ساعة واحدة", hh: "%d ساعات", d: "يوم واحد", dd: "%d أيام", M: "شهر واحد", MM: "%d أشهر", y: "عام واحد", yy: "%d أعوام" }, preparse: function(f) {
        return f.replace(u, (function(m) {
          return i[m];
        })).replace(l, ",");
      }, postformat: function(f) {
        return f.replace(d, (function(m) {
          return t[m];
        })).replace(c, "،");
      }, ordinal: function(f) {
        return f;
      }, formats: { LT: "HH:mm", LTS: "HH:mm:ss", L: "D/‏M/‏YYYY", LL: "D MMMM YYYY", LLL: "D MMMM YYYY HH:mm", LLLL: "dddd D MMMM YYYY HH:mm" } };
      return o.default.locale(_, null, !0), _;
    }));
  })(cr)), cr.exports;
}
var pM = R$();
const P$ = /* @__PURE__ */ A(pM), I$ = /* @__PURE__ */ q({
  __proto__: null,
  default: P$
}, [pM]);
var _r = { exports: {} }, N$ = _r.exports, Bc;
function O$() {
  return Bc || (Bc = 1, (function(e, a) {
    (function(n, r) {
      e.exports = r(P());
    })(N$, (function(n) {
      function r(t) {
        return t && typeof t == "object" && "default" in t ? t : { default: t };
      }
      var o = r(n), s = { name: "az", weekdays: "Bazar_Bazar ertəsi_Çərşənbə axşamı_Çərşənbə_Cümə axşamı_Cümə_Şənbə".split("_"), weekdaysShort: "Baz_BzE_ÇAx_Çər_CAx_Cüm_Şən".split("_"), weekdaysMin: "Bz_BE_ÇA_Çə_CA_Cü_Şə".split("_"), months: "yanvar_fevral_mart_aprel_may_iyun_iyul_avqust_sentyabr_oktyabr_noyabr_dekabr".split("_"), monthsShort: "yan_fev_mar_apr_may_iyn_iyl_avq_sen_okt_noy_dek".split("_"), weekStart: 1, formats: { LT: "H:mm", LTS: "H:mm:ss", L: "DD.MM.YYYY", LL: "D MMMM YYYY г.", LLL: "D MMMM YYYY г., H:mm", LLLL: "dddd, D MMMM YYYY г., H:mm" }, relativeTime: { future: "%s sonra", past: "%s əvvəl", s: "bir neçə saniyə", m: "bir dəqiqə", mm: "%d dəqiqə", h: "bir saat", hh: "%d saat", d: "bir gün", dd: "%d gün", M: "bir ay", MM: "%d ay", y: "bir il", yy: "%d il" }, ordinal: function(t) {
        return t;
      } };
      return o.default.locale(s, null, !0), s;
    }));
  })(_r)), _r.exports;
}
var hM = O$();
const z$ = /* @__PURE__ */ A(hM), F$ = /* @__PURE__ */ q({
  __proto__: null,
  default: z$
}, [hM]);
var fr = { exports: {} }, B$ = fr.exports, Gc;
function G$() {
  return Gc || (Gc = 1, (function(e, a) {
    (function(n, r) {
      e.exports = r(P());
    })(B$, (function(n) {
      function r(m) {
        return m && typeof m == "object" && "default" in m ? m : { default: m };
      }
      var o = r(n), s = "студзеня_лютага_сакавіка_красавіка_траўня_чэрвеня_ліпеня_жніўня_верасня_кастрычніка_лістапада_снежня".split("_"), t = "студзень_лютый_сакавік_красавік_травень_чэрвень_ліпень_жнівень_верасень_кастрычнік_лістапад_снежань".split("_"), i = "студ_лют_сак_крас_трав_чэрв_ліп_жнів_вер_каст_ліст_снеж.".split("_"), u = "студ_лют_сак_крас_трав_чэрв_ліп_жнів_вер_каст_ліст_снеж".split("_"), l = /D[oD]?(\[[^[\]]*\]|\s)+MMMM?/;
      function d(m, h, y) {
        var p, v;
        return y === "m" ? h ? "хвіліна" : "хвіліну" : y === "h" ? h ? "гадзіна" : "гадзіну" : m + " " + (p = +m, v = { ss: h ? "секунда_секунды_секунд" : "секунду_секунды_секунд", mm: h ? "хвіліна_хвіліны_хвілін" : "хвіліну_хвіліны_хвілін", hh: h ? "гадзіна_гадзіны_гадзін" : "гадзіну_гадзіны_гадзін", dd: "дзень_дні_дзён", MM: "месяц_месяцы_месяцаў", yy: "год_гады_гадоў" }[y].split("_"), p % 10 == 1 && p % 100 != 11 ? v[0] : p % 10 >= 2 && p % 10 <= 4 && (p % 100 < 10 || p % 100 >= 20) ? v[1] : v[2]);
      }
      var c = function(m, h) {
        return l.test(h) ? s[m.month()] : t[m.month()];
      };
      c.s = t, c.f = s;
      var _ = function(m, h) {
        return l.test(h) ? i[m.month()] : u[m.month()];
      };
      _.s = u, _.f = i;
      var f = { name: "be", weekdays: "нядзеля_панядзелак_аўторак_серада_чацвер_пятніца_субота".split("_"), weekdaysShort: "няд_пнд_аўт_сер_чцв_пят_суб".split("_"), weekdaysMin: "нд_пн_аў_ср_чц_пт_сб".split("_"), months: c, monthsShort: _, weekStart: 1, yearStart: 4, formats: { LT: "HH:mm", LTS: "HH:mm:ss", L: "DD.MM.YYYY", LL: "D MMMM YYYY г.", LLL: "D MMMM YYYY г., HH:mm", LLLL: "dddd, D MMMM YYYY г., HH:mm" }, relativeTime: { future: "праз %s", past: "%s таму", s: "некалькі секунд", m: d, mm: d, h: d, hh: d, d: "дзень", dd: d, M: "месяц", MM: d, y: "год", yy: d }, ordinal: function(m) {
        return m;
      }, meridiem: function(m) {
        return m < 4 ? "ночы" : m < 12 ? "раніцы" : m < 17 ? "дня" : "вечара";
      } };
      return o.default.locale(f, null, !0), f;
    }));
  })(fr)), fr.exports;
}
var vM = G$();
const J$ = /* @__PURE__ */ A(vM), U$ = /* @__PURE__ */ q({
  __proto__: null,
  default: J$
}, [vM]);
var mr = { exports: {} }, W$ = mr.exports, Jc;
function V$() {
  return Jc || (Jc = 1, (function(e, a) {
    (function(n, r) {
      e.exports = r(P());
    })(W$, (function(n) {
      function r(t) {
        return t && typeof t == "object" && "default" in t ? t : { default: t };
      }
      var o = r(n), s = { name: "bg", weekdays: "неделя_понеделник_вторник_сряда_четвъртък_петък_събота".split("_"), weekdaysShort: "нед_пон_вто_сря_чет_пет_съб".split("_"), weekdaysMin: "нд_пн_вт_ср_чт_пт_сб".split("_"), months: "януари_февруари_март_април_май_юни_юли_август_септември_октомври_ноември_декември".split("_"), monthsShort: "яну_фев_мар_апр_май_юни_юли_авг_сеп_окт_ное_дек".split("_"), weekStart: 1, ordinal: function(t) {
        var i = t % 100;
        if (i > 10 && i < 20) return t + "-ти";
        var u = t % 10;
        return u === 1 ? t + "-ви" : u === 2 ? t + "-ри" : u === 7 || u === 8 ? t + "-ми" : t + "-ти";
      }, formats: { LT: "H:mm", LTS: "H:mm:ss", L: "D.MM.YYYY", LL: "D MMMM YYYY", LLL: "D MMMM YYYY H:mm", LLLL: "dddd, D MMMM YYYY H:mm" }, relativeTime: { future: "след %s", past: "преди %s", s: "няколко секунди", m: "минута", mm: "%d минути", h: "час", hh: "%d часа", d: "ден", dd: "%d дена", M: "месец", MM: "%d месеца", y: "година", yy: "%d години" } };
      return o.default.locale(s, null, !0), s;
    }));
  })(mr)), mr.exports;
}
var yM = V$();
const K$ = /* @__PURE__ */ A(yM), X$ = /* @__PURE__ */ q({
  __proto__: null,
  default: K$
}, [yM]);
var pr = { exports: {} }, Z$ = pr.exports, Uc;
function Q$() {
  return Uc || (Uc = 1, (function(e, a) {
    (function(n, r) {
      e.exports = r(P());
    })(Z$, (function(n) {
      function r(t) {
        return t && typeof t == "object" && "default" in t ? t : { default: t };
      }
      var o = r(n), s = { name: "bi", weekdays: "Sande_Mande_Tusde_Wenesde_Tosde_Fraede_Sarade".split("_"), months: "Januari_Februari_Maj_Eprel_Mei_Jun_Julae_Okis_Septemba_Oktoba_Novemba_Disemba".split("_"), weekStart: 1, weekdaysShort: "San_Man_Tus_Wen_Tos_Frae_Sar".split("_"), monthsShort: "Jan_Feb_Maj_Epr_Mai_Jun_Jul_Oki_Sep_Okt_Nov_Dis".split("_"), weekdaysMin: "San_Ma_Tu_We_To_Fr_Sar".split("_"), ordinal: function(t) {
        return t;
      }, formats: { LT: "h:mm A", LTS: "h:mm:ss A", L: "DD/MM/YYYY", LL: "D MMMM YYYY", LLL: "D MMMM YYYY h:mm A", LLLL: "dddd, D MMMM YYYY h:mm A" }, relativeTime: { future: "lo %s", past: "%s bifo", s: "sam seken", m: "wan minit", mm: "%d minit", h: "wan haoa", hh: "%d haoa", d: "wan dei", dd: "%d dei", M: "wan manis", MM: "%d manis", y: "wan yia", yy: "%d yia" } };
      return o.default.locale(s, null, !0), s;
    }));
  })(pr)), pr.exports;
}
var gM = Q$();
const eH = /* @__PURE__ */ A(gM), tH = /* @__PURE__ */ q({
  __proto__: null,
  default: eH
}, [gM]);
var hr = { exports: {} }, rH = hr.exports, Wc;
function nH() {
  return Wc || (Wc = 1, (function(e, a) {
    (function(n, r) {
      e.exports = r(P());
    })(rH, (function(n) {
      function r(t) {
        return t && typeof t == "object" && "default" in t ? t : { default: t };
      }
      var o = r(n), s = { name: "bm", weekdays: "Kari_Ntɛnɛn_Tarata_Araba_Alamisa_Juma_Sibiri".split("_"), months: "Zanwuyekalo_Fewuruyekalo_Marisikalo_Awirilikalo_Mɛkalo_Zuwɛnkalo_Zuluyekalo_Utikalo_Sɛtanburukalo_ɔkutɔburukalo_Nowanburukalo_Desanburukalo".split("_"), weekStart: 1, weekdaysShort: "Kar_Ntɛ_Tar_Ara_Ala_Jum_Sib".split("_"), monthsShort: "Zan_Few_Mar_Awi_Mɛ_Zuw_Zul_Uti_Sɛt_ɔku_Now_Des".split("_"), weekdaysMin: "Ka_Nt_Ta_Ar_Al_Ju_Si".split("_"), ordinal: function(t) {
        return t;
      }, formats: { LT: "HH:mm", LTS: "HH:mm:ss", L: "DD/MM/YYYY", LL: "MMMM [tile] D [san] YYYY", LLL: "MMMM [tile] D [san] YYYY [lɛrɛ] HH:mm", LLLL: "dddd MMMM [tile] D [san] YYYY [lɛrɛ] HH:mm" }, relativeTime: { future: "%s kɔnɔ", past: "a bɛ %s bɔ", s: "sanga dama dama", m: "miniti kelen", mm: "miniti %d", h: "lɛrɛ kelen", hh: "lɛrɛ %d", d: "tile kelen", dd: "tile %d", M: "kalo kelen", MM: "kalo %d", y: "san kelen", yy: "san %d" } };
      return o.default.locale(s, null, !0), s;
    }));
  })(hr)), hr.exports;
}
var MM = nH();
const aH = /* @__PURE__ */ A(MM), oH = /* @__PURE__ */ q({
  __proto__: null,
  default: aH
}, [MM]);
var vr = { exports: {} }, sH = vr.exports, Vc;
function iH() {
  return Vc || (Vc = 1, (function(e, a) {
    (function(n, r) {
      e.exports = r(P());
    })(sH, (function(n) {
      function r(u) {
        return u && typeof u == "object" && "default" in u ? u : { default: u };
      }
      var o = r(n), s = { 1: "১", 2: "২", 3: "৩", 4: "৪", 5: "৫", 6: "৬", 7: "৭", 8: "৮", 9: "৯", 0: "০" }, t = { "১": "1", "২": "2", "৩": "3", "৪": "4", "৫": "5", "৬": "6", "৭": "7", "৮": "8", "৯": "9", "০": "0" }, i = { name: "bn-bd", weekdays: "রবিবার_সোমবার_মঙ্গলবার_বুধবার_বৃহস্পতিবার_শুক্রবার_শনিবার".split("_"), months: "জানুয়ারি_ফেব্রুয়ারি_মার্চ_এপ্রিল_মে_জুন_জুলাই_আগস্ট_সেপ্টেম্বর_অক্টোবর_নভেম্বর_ডিসেম্বর".split("_"), weekdaysShort: "রবি_সোম_মঙ্গল_বুধ_বৃহস্পতি_শুক্র_শনি".split("_"), monthsShort: "জানু_ফেব্রু_মার্চ_এপ্রিল_মে_জুন_জুলাই_আগস্ট_সেপ্ট_অক্টো_নভে_ডিসে".split("_"), weekdaysMin: "রবি_সোম_মঙ্গ_বুধ_বৃহঃ_শুক্র_শনি".split("_"), weekStart: 0, preparse: function(u) {
        return u.replace(/[১২৩৪৫৬৭৮৯০]/g, (function(l) {
          return t[l];
        }));
      }, postformat: function(u) {
        return u.replace(/\d/g, (function(l) {
          return s[l];
        }));
      }, ordinal: function(u) {
        var l = ["ই", "লা", "রা", "ঠা", "শে"], d = u % 100;
        return "[" + u + (l[(d - 20) % 10] || l[d] || l[0]) + "]";
      }, formats: { LT: "A h:mm সময়", LTS: "A h:mm:ss সময়", L: "DD/MM/YYYY খ্রিস্টাব্দ", LL: "D MMMM YYYY খ্রিস্টাব্দ", LLL: "D MMMM YYYY খ্রিস্টাব্দ, A h:mm সময়", LLLL: "dddd, D MMMM YYYY খ্রিস্টাব্দ, A h:mm সময়" }, meridiem: function(u) {
        return u < 4 ? "রাত" : u < 6 ? "ভোর" : u < 12 ? "সকাল" : u < 15 ? "দুপুর" : u < 18 ? "বিকাল" : u < 20 ? "সন্ধ্যা" : "রাত";
      }, relativeTime: { future: "%s পরে", past: "%s আগে", s: "কয়েক সেকেন্ড", m: "এক মিনিট", mm: "%d মিনিট", h: "এক ঘন্টা", hh: "%d ঘন্টা", d: "এক দিন", dd: "%d দিন", M: "এক মাস", MM: "%d মাস", y: "এক বছর", yy: "%d বছর" } };
      return o.default.locale(i, null, !0), i;
    }));
  })(vr)), vr.exports;
}
var bM = iH();
const uH = /* @__PURE__ */ A(bM), lH = /* @__PURE__ */ q({
  __proto__: null,
  default: uH
}, [bM]);
var yr = { exports: {} }, dH = yr.exports, Kc;
function cH() {
  return Kc || (Kc = 1, (function(e, a) {
    (function(n, r) {
      e.exports = r(P());
    })(dH, (function(n) {
      function r(u) {
        return u && typeof u == "object" && "default" in u ? u : { default: u };
      }
      var o = r(n), s = { 1: "১", 2: "২", 3: "৩", 4: "৪", 5: "৫", 6: "৬", 7: "৭", 8: "৮", 9: "৯", 0: "০" }, t = { "১": "1", "২": "2", "৩": "3", "৪": "4", "৫": "5", "৬": "6", "৭": "7", "৮": "8", "৯": "9", "০": "0" }, i = { name: "bn", weekdays: "রবিবার_সোমবার_মঙ্গলবার_বুধবার_বৃহস্পতিবার_শুক্রবার_শনিবার".split("_"), months: "জানুয়ারি_ফেব্রুয়ারি_মার্চ_এপ্রিল_মে_জুন_জুলাই_আগস্ট_সেপ্টেম্বর_অক্টোবর_নভেম্বর_ডিসেম্বর".split("_"), weekdaysShort: "রবি_সোম_মঙ্গল_বুধ_বৃহস্পতি_শুক্র_শনি".split("_"), monthsShort: "জানু_ফেব্রু_মার্চ_এপ্রিল_মে_জুন_জুলাই_আগস্ট_সেপ্ট_অক্টো_নভে_ডিসে".split("_"), weekdaysMin: "রবি_সোম_মঙ্গ_বুধ_বৃহঃ_শুক্র_শনি".split("_"), preparse: function(u) {
        return u.replace(/[১২৩৪৫৬৭৮৯০]/g, (function(l) {
          return t[l];
        }));
      }, postformat: function(u) {
        return u.replace(/\d/g, (function(l) {
          return s[l];
        }));
      }, ordinal: function(u) {
        return u;
      }, formats: { LT: "A h:mm সময়", LTS: "A h:mm:ss সময়", L: "DD/MM/YYYY", LL: "D MMMM YYYY", LLL: "D MMMM YYYY, A h:mm সময়", LLLL: "dddd, D MMMM YYYY, A h:mm সময়" }, relativeTime: { future: "%s পরে", past: "%s আগে", s: "কয়েক সেকেন্ড", m: "এক মিনিট", mm: "%d মিনিট", h: "এক ঘন্টা", hh: "%d ঘন্টা", d: "এক দিন", dd: "%d দিন", M: "এক মাস", MM: "%d মাস", y: "এক বছর", yy: "%d বছর" } };
      return o.default.locale(i, null, !0), i;
    }));
  })(yr)), yr.exports;
}
var YM = cH();
const _H = /* @__PURE__ */ A(YM), fH = /* @__PURE__ */ q({
  __proto__: null,
  default: _H
}, [YM]);
var gr = { exports: {} }, mH = gr.exports, Xc;
function pH() {
  return Xc || (Xc = 1, (function(e, a) {
    (function(n, r) {
      e.exports = r(P());
    })(mH, (function(n) {
      function r(t) {
        return t && typeof t == "object" && "default" in t ? t : { default: t };
      }
      var o = r(n), s = { name: "bo", weekdays: "གཟའ་ཉི་མ་_གཟའ་ཟླ་བ་_གཟའ་མིག་དམར་_གཟའ་ལྷག་པ་_གཟའ་ཕུར་བུ_གཟའ་པ་སངས་_གཟའ་སྤེན་པ་".split("_"), weekdaysShort: "ཉི་མ་_ཟླ་བ་_མིག་དམར་_ལྷག་པ་_ཕུར་བུ_པ་སངས་_སྤེན་པ་".split("_"), weekdaysMin: "ཉི་མ་_ཟླ་བ་_མིག་དམར་_ལྷག་པ་_ཕུར་བུ_པ་སངས་_སྤེན་པ་".split("_"), months: "ཟླ་བ་དང་པོ_ཟླ་བ་གཉིས་པ_ཟླ་བ་གསུམ་པ_ཟླ་བ་བཞི་པ_ཟླ་བ་ལྔ་པ_ཟླ་བ་དྲུག་པ_ཟླ་བ་བདུན་པ_ཟླ་བ་བརྒྱད་པ_ཟླ་བ་དགུ་པ_ཟླ་བ་བཅུ་པ_ཟླ་བ་བཅུ་གཅིག་པ_ཟླ་བ་བཅུ་གཉིས་པ".split("_"), monthsShort: "ཟླ་དང་པོ_ཟླ་གཉིས་པ_ཟླ་གསུམ་པ_ཟླ་བཞི་པ_ཟླ་ལྔ་པ_ཟླ་དྲུག་པ_ཟླ་བདུན་པ_ཟླ་བརྒྱད་པ_ཟླ་དགུ་པ_ཟླ་བཅུ་པ_ཟླ་བཅུ་གཅིག་པ_ཟླ་བཅུ་གཉིས་པ".split("_"), ordinal: function(t) {
        return t;
      }, formats: { LT: "A h:mm", LTS: "A h:mm:ss", L: "DD/MM/YYYY", LL: "D MMMM YYYY", LLL: "D MMMM YYYY, A h:mm", LLLL: "dddd, D MMMM YYYY, A h:mm" }, relativeTime: { future: "%s ལ་", past: "%s སྔོན་ལ་", s: "ཏོག་ཙམ་", m: "སྐར་མ་གཅིག་", mm: "སྐར་མ་ %d", h: "ཆུ་ཚོད་གཅིག་", hh: "ཆུ་ཚོད་ %d", d: "ཉིན་གཅིག་", dd: "ཉིན་ %d", M: "ཟླ་བ་གཅིག་", MM: "ཟླ་བ་ %d", y: "ལོ་གཅིག་", yy: "ལོ་ %d" } };
      return o.default.locale(s, null, !0), s;
    }));
  })(gr)), gr.exports;
}
var wM = pH();
const hH = /* @__PURE__ */ A(wM), vH = /* @__PURE__ */ q({
  __proto__: null,
  default: hH
}, [wM]);
var Mr = { exports: {} }, yH = Mr.exports, Zc;
function gH() {
  return Zc || (Zc = 1, (function(e, a) {
    (function(n, r) {
      e.exports = r(P());
    })(yH, (function(n) {
      function r(u) {
        return u && typeof u == "object" && "default" in u ? u : { default: u };
      }
      var o = r(n);
      function s(u) {
        return u > 9 ? s(u % 10) : u;
      }
      function t(u, l, d) {
        return u + " " + (function(c, _) {
          return _ === 2 ? (function(f) {
            return { m: "v", b: "v", d: "z" }[f.charAt(0)] + f.substring(1);
          })(c) : c;
        })({ mm: "munutenn", MM: "miz", dd: "devezh" }[d], u);
      }
      var i = { name: "br", weekdays: "Sul_Lun_Meurzh_Mercʼher_Yaou_Gwener_Sadorn".split("_"), months: "Genver_Cʼhwevrer_Meurzh_Ebrel_Mae_Mezheven_Gouere_Eost_Gwengolo_Here_Du_Kerzu".split("_"), weekStart: 1, weekdaysShort: "Sul_Lun_Meu_Mer_Yao_Gwe_Sad".split("_"), monthsShort: "Gen_Cʼhwe_Meu_Ebr_Mae_Eve_Gou_Eos_Gwe_Her_Du_Ker".split("_"), weekdaysMin: "Su_Lu_Me_Mer_Ya_Gw_Sa".split("_"), ordinal: function(u) {
        return u;
      }, formats: { LT: "h[e]mm A", LTS: "h[e]mm:ss A", L: "DD/MM/YYYY", LL: "D [a viz] MMMM YYYY", LLL: "D [a viz] MMMM YYYY h[e]mm A", LLLL: "dddd, D [a viz] MMMM YYYY h[e]mm A" }, relativeTime: { future: "a-benn %s", past: "%s ʼzo", s: "un nebeud segondennoù", m: "ur vunutenn", mm: t, h: "un eur", hh: "%d eur", d: "un devezh", dd: t, M: "ur miz", MM: t, y: "ur bloaz", yy: function(u) {
        switch (s(u)) {
          case 1:
          case 3:
          case 4:
          case 5:
          case 9:
            return u + " bloaz";
          default:
            return u + " vloaz";
        }
      } }, meridiem: function(u) {
        return u < 12 ? "a.m." : "g.m.";
      } };
      return o.default.locale(i, null, !0), i;
    }));
  })(Mr)), Mr.exports;
}
var xM = gH();
const MH = /* @__PURE__ */ A(xM), bH = /* @__PURE__ */ q({
  __proto__: null,
  default: MH
}, [xM]);
var br = { exports: {} }, YH = br.exports, Qc;
function wH() {
  return Qc || (Qc = 1, (function(e, a) {
    (function(n, r) {
      e.exports = r(P());
    })(YH, (function(n) {
      function r(t) {
        return t && typeof t == "object" && "default" in t ? t : { default: t };
      }
      var o = r(n), s = { name: "bs", weekdays: "nedjelja_ponedjeljak_utorak_srijeda_četvrtak_petak_subota".split("_"), months: "januar_februar_mart_april_maj_juni_juli_august_septembar_oktobar_novembar_decembar".split("_"), weekStart: 1, weekdaysShort: "ned._pon._uto._sri._čet._pet._sub.".split("_"), monthsShort: "jan._feb._mar._apr._maj._jun._jul._aug._sep._okt._nov._dec.".split("_"), weekdaysMin: "ne_po_ut_sr_če_pe_su".split("_"), ordinal: function(t) {
        return t;
      }, formats: { LT: "H:mm", LTS: "H:mm:ss", L: "DD.MM.YYYY", LL: "D. MMMM YYYY", LLL: "D. MMMM YYYY H:mm", LLLL: "dddd, D. MMMM YYYY H:mm" } };
      return o.default.locale(s, null, !0), s;
    }));
  })(br)), br.exports;
}
var LM = wH();
const xH = /* @__PURE__ */ A(LM), LH = /* @__PURE__ */ q({
  __proto__: null,
  default: xH
}, [LM]);
var Yr = { exports: {} }, kH = Yr.exports, e_;
function SH() {
  return e_ || (e_ = 1, (function(e, a) {
    (function(n, r) {
      e.exports = r(P());
    })(kH, (function(n) {
      function r(t) {
        return t && typeof t == "object" && "default" in t ? t : { default: t };
      }
      var o = r(n), s = { name: "ca", weekdays: "Diumenge_Dilluns_Dimarts_Dimecres_Dijous_Divendres_Dissabte".split("_"), weekdaysShort: "Dg._Dl._Dt._Dc._Dj._Dv._Ds.".split("_"), weekdaysMin: "Dg_Dl_Dt_Dc_Dj_Dv_Ds".split("_"), months: "Gener_Febrer_Març_Abril_Maig_Juny_Juliol_Agost_Setembre_Octubre_Novembre_Desembre".split("_"), monthsShort: "Gen._Febr._Març_Abr._Maig_Juny_Jul._Ag._Set._Oct._Nov._Des.".split("_"), weekStart: 1, formats: { LT: "H:mm", LTS: "H:mm:ss", L: "DD/MM/YYYY", LL: "D MMMM [de] YYYY", LLL: "D MMMM [de] YYYY [a les] H:mm", LLLL: "dddd D MMMM [de] YYYY [a les] H:mm", ll: "D MMM YYYY", lll: "D MMM YYYY, H:mm", llll: "ddd D MMM YYYY, H:mm" }, relativeTime: { future: "d'aquí %s", past: "fa %s", s: "uns segons", m: "un minut", mm: "%d minuts", h: "una hora", hh: "%d hores", d: "un dia", dd: "%d dies", M: "un mes", MM: "%d mesos", y: "un any", yy: "%d anys" }, ordinal: function(t) {
        return "" + t + (t === 1 || t === 3 ? "r" : t === 2 ? "n" : t === 4 ? "t" : "è");
      } };
      return o.default.locale(s, null, !0), s;
    }));
  })(Yr)), Yr.exports;
}
var kM = SH();
const DH = /* @__PURE__ */ A(kM), TH = /* @__PURE__ */ q({
  __proto__: null,
  default: DH
}, [kM]);
var wr = { exports: {} }, $H = wr.exports, t_;
function HH() {
  return t_ || (t_ = 1, (function(e, a) {
    (function(n, r) {
      e.exports = r(P());
    })($H, (function(n) {
      function r(u) {
        return u && typeof u == "object" && "default" in u ? u : { default: u };
      }
      var o = r(n);
      function s(u) {
        return u > 1 && u < 5 && ~~(u / 10) != 1;
      }
      function t(u, l, d, c) {
        var _ = u + " ";
        switch (d) {
          case "s":
            return l || c ? "pár sekund" : "pár sekundami";
          case "m":
            return l ? "minuta" : c ? "minutu" : "minutou";
          case "mm":
            return l || c ? _ + (s(u) ? "minuty" : "minut") : _ + "minutami";
          case "h":
            return l ? "hodina" : c ? "hodinu" : "hodinou";
          case "hh":
            return l || c ? _ + (s(u) ? "hodiny" : "hodin") : _ + "hodinami";
          case "d":
            return l || c ? "den" : "dnem";
          case "dd":
            return l || c ? _ + (s(u) ? "dny" : "dní") : _ + "dny";
          case "M":
            return l || c ? "měsíc" : "měsícem";
          case "MM":
            return l || c ? _ + (s(u) ? "měsíce" : "měsíců") : _ + "měsíci";
          case "y":
            return l || c ? "rok" : "rokem";
          case "yy":
            return l || c ? _ + (s(u) ? "roky" : "let") : _ + "lety";
        }
      }
      var i = { name: "cs", weekdays: "neděle_pondělí_úterý_středa_čtvrtek_pátek_sobota".split("_"), weekdaysShort: "ne_po_út_st_čt_pá_so".split("_"), weekdaysMin: "ne_po_út_st_čt_pá_so".split("_"), months: "leden_únor_březen_duben_květen_červen_červenec_srpen_září_říjen_listopad_prosinec".split("_"), monthsShort: "led_úno_bře_dub_kvě_čvn_čvc_srp_zář_říj_lis_pro".split("_"), weekStart: 1, yearStart: 4, ordinal: function(u) {
        return u + ".";
      }, formats: { LT: "H:mm", LTS: "H:mm:ss", L: "DD.MM.YYYY", LL: "D. MMMM YYYY", LLL: "D. MMMM YYYY H:mm", LLLL: "dddd D. MMMM YYYY H:mm", l: "D. M. YYYY" }, relativeTime: { future: "za %s", past: "před %s", s: t, m: t, mm: t, h: t, hh: t, d: t, dd: t, M: t, MM: t, y: t, yy: t } };
      return o.default.locale(i, null, !0), i;
    }));
  })(wr)), wr.exports;
}
var SM = HH();
const jH = /* @__PURE__ */ A(SM), EH = /* @__PURE__ */ q({
  __proto__: null,
  default: jH
}, [SM]);
var xr = { exports: {} }, CH = xr.exports, r_;
function qH() {
  return r_ || (r_ = 1, (function(e, a) {
    (function(n, r) {
      e.exports = r(P());
    })(CH, (function(n) {
      function r(t) {
        return t && typeof t == "object" && "default" in t ? t : { default: t };
      }
      var o = r(n), s = { name: "cv", weekdays: "вырсарникун_тунтикун_ытларикун_юнкун_кӗҫнерникун_эрнекун_шӑматкун".split("_"), months: "кӑрлач_нарӑс_пуш_ака_май_ҫӗртме_утӑ_ҫурла_авӑн_юпа_чӳк_раштав".split("_"), weekStart: 1, weekdaysShort: "выр_тун_ытл_юн_кӗҫ_эрн_шӑм".split("_"), monthsShort: "кӑр_нар_пуш_ака_май_ҫӗр_утӑ_ҫур_авн_юпа_чӳк_раш".split("_"), weekdaysMin: "вр_тн_ыт_юн_кҫ_эр_шм".split("_"), ordinal: function(t) {
        return t;
      }, formats: { LT: "HH:mm", LTS: "HH:mm:ss", L: "DD-MM-YYYY", LL: "YYYY [ҫулхи] MMMM [уйӑхӗн] D[-мӗшӗ]", LLL: "YYYY [ҫулхи] MMMM [уйӑхӗн] D[-мӗшӗ], HH:mm", LLLL: "dddd, YYYY [ҫулхи] MMMM [уйӑхӗн] D[-мӗшӗ], HH:mm" } };
      return o.default.locale(s, null, !0), s;
    }));
  })(xr)), xr.exports;
}
var DM = qH();
const AH = /* @__PURE__ */ A(DM), RH = /* @__PURE__ */ q({
  __proto__: null,
  default: AH
}, [DM]);
var Lr = { exports: {} }, PH = Lr.exports, n_;
function IH() {
  return n_ || (n_ = 1, (function(e, a) {
    (function(n, r) {
      e.exports = r(P());
    })(PH, (function(n) {
      function r(t) {
        return t && typeof t == "object" && "default" in t ? t : { default: t };
      }
      var o = r(n), s = { name: "cy", weekdays: "Dydd Sul_Dydd Llun_Dydd Mawrth_Dydd Mercher_Dydd Iau_Dydd Gwener_Dydd Sadwrn".split("_"), months: "Ionawr_Chwefror_Mawrth_Ebrill_Mai_Mehefin_Gorffennaf_Awst_Medi_Hydref_Tachwedd_Rhagfyr".split("_"), weekStart: 1, weekdaysShort: "Sul_Llun_Maw_Mer_Iau_Gwe_Sad".split("_"), monthsShort: "Ion_Chwe_Maw_Ebr_Mai_Meh_Gor_Aws_Med_Hyd_Tach_Rhag".split("_"), weekdaysMin: "Su_Ll_Ma_Me_Ia_Gw_Sa".split("_"), ordinal: function(t) {
        return t;
      }, formats: { LT: "HH:mm", LTS: "HH:mm:ss", L: "DD/MM/YYYY", LL: "D MMMM YYYY", LLL: "D MMMM YYYY HH:mm", LLLL: "dddd, D MMMM YYYY HH:mm" }, relativeTime: { future: "mewn %s", past: "%s yn ôl", s: "ychydig eiliadau", m: "munud", mm: "%d munud", h: "awr", hh: "%d awr", d: "diwrnod", dd: "%d diwrnod", M: "mis", MM: "%d mis", y: "blwyddyn", yy: "%d flynedd" } };
      return o.default.locale(s, null, !0), s;
    }));
  })(Lr)), Lr.exports;
}
var TM = IH();
const NH = /* @__PURE__ */ A(TM), OH = /* @__PURE__ */ q({
  __proto__: null,
  default: NH
}, [TM]);
var kr = { exports: {} }, zH = kr.exports, a_;
function FH() {
  return a_ || (a_ = 1, (function(e, a) {
    (function(n, r) {
      e.exports = r(P());
    })(zH, (function(n) {
      function r(t) {
        return t && typeof t == "object" && "default" in t ? t : { default: t };
      }
      var o = r(n), s = { name: "da", weekdays: "søndag_mandag_tirsdag_onsdag_torsdag_fredag_lørdag".split("_"), weekdaysShort: "søn._man._tirs._ons._tors._fre._lør.".split("_"), weekdaysMin: "sø._ma._ti._on._to._fr._lø.".split("_"), months: "januar_februar_marts_april_maj_juni_juli_august_september_oktober_november_december".split("_"), monthsShort: "jan._feb._mar._apr._maj_juni_juli_aug._sept._okt._nov._dec.".split("_"), weekStart: 1, yearStart: 4, ordinal: function(t) {
        return t + ".";
      }, formats: { LT: "HH:mm", LTS: "HH:mm:ss", L: "DD.MM.YYYY", LL: "D. MMMM YYYY", LLL: "D. MMMM YYYY HH:mm", LLLL: "dddd [d.] D. MMMM YYYY [kl.] HH:mm" }, relativeTime: { future: "om %s", past: "%s siden", s: "få sekunder", m: "et minut", mm: "%d minutter", h: "en time", hh: "%d timer", d: "en dag", dd: "%d dage", M: "en måned", MM: "%d måneder", y: "et år", yy: "%d år" } };
      return o.default.locale(s, null, !0), s;
    }));
  })(kr)), kr.exports;
}
var $M = FH();
const BH = /* @__PURE__ */ A($M), GH = /* @__PURE__ */ q({
  __proto__: null,
  default: BH
}, [$M]);
var Sr = { exports: {} }, JH = Sr.exports, o_;
function UH() {
  return o_ || (o_ = 1, (function(e, a) {
    (function(n, r) {
      e.exports = r(P());
    })(JH, (function(n) {
      function r(u) {
        return u && typeof u == "object" && "default" in u ? u : { default: u };
      }
      var o = r(n), s = { s: "ein paar Sekunden", m: ["eine Minute", "einer Minute"], mm: "%d Minuten", h: ["eine Stunde", "einer Stunde"], hh: "%d Stunden", d: ["ein Tag", "einem Tag"], dd: ["%d Tage", "%d Tagen"], M: ["ein Monat", "einem Monat"], MM: ["%d Monate", "%d Monaten"], y: ["ein Jahr", "einem Jahr"], yy: ["%d Jahre", "%d Jahren"] };
      function t(u, l, d) {
        var c = s[d];
        return Array.isArray(c) && (c = c[l ? 0 : 1]), c.replace("%d", u);
      }
      var i = { name: "de-at", weekdays: "Sonntag_Montag_Dienstag_Mittwoch_Donnerstag_Freitag_Samstag".split("_"), weekdaysShort: "So._Mo._Di._Mi._Do._Fr._Sa.".split("_"), weekdaysMin: "So_Mo_Di_Mi_Do_Fr_Sa".split("_"), months: "Jänner_Februar_März_April_Mai_Juni_Juli_August_September_Oktober_November_Dezember".split("_"), monthsShort: "Jän._Feb._März_Apr._Mai_Juni_Juli_Aug._Sep._Okt._Nov._Dez.".split("_"), ordinal: function(u) {
        return u + ".";
      }, weekStart: 1, formats: { LTS: "HH:mm:ss", LT: "HH:mm", L: "DD.MM.YYYY", LL: "D. MMMM YYYY", LLL: "D. MMMM YYYY HH:mm", LLLL: "dddd, D. MMMM YYYY HH:mm" }, relativeTime: { future: "in %s", past: "vor %s", s: t, m: t, mm: t, h: t, hh: t, d: t, dd: t, M: t, MM: t, y: t, yy: t } };
      return o.default.locale(i, null, !0), i;
    }));
  })(Sr)), Sr.exports;
}
var HM = UH();
const WH = /* @__PURE__ */ A(HM), VH = /* @__PURE__ */ q({
  __proto__: null,
  default: WH
}, [HM]);
var Dr = { exports: {} }, KH = Dr.exports, s_;
function XH() {
  return s_ || (s_ = 1, (function(e, a) {
    (function(n, r) {
      e.exports = r(P());
    })(KH, (function(n) {
      function r(u) {
        return u && typeof u == "object" && "default" in u ? u : { default: u };
      }
      var o = r(n), s = { s: "ein paar Sekunden", m: ["eine Minute", "einer Minute"], mm: "%d Minuten", h: ["eine Stunde", "einer Stunde"], hh: "%d Stunden", d: ["ein Tag", "einem Tag"], dd: ["%d Tage", "%d Tagen"], M: ["ein Monat", "einem Monat"], MM: ["%d Monate", "%d Monaten"], y: ["ein Jahr", "einem Jahr"], yy: ["%d Jahre", "%d Jahren"] };
      function t(u, l, d) {
        var c = s[d];
        return Array.isArray(c) && (c = c[l ? 0 : 1]), c.replace("%d", u);
      }
      var i = { name: "de-ch", weekdays: "Sonntag_Montag_Dienstag_Mittwoch_Donnerstag_Freitag_Samstag".split("_"), weekdaysShort: "So_Mo_Di_Mi_Do_Fr_Sa".split("_"), weekdaysMin: "So_Mo_Di_Mi_Do_Fr_Sa".split("_"), months: "Januar_Februar_März_April_Mai_Juni_Juli_August_September_Oktober_November_Dezember".split("_"), monthsShort: "Jan._Feb._März_Apr._Mai_Juni_Juli_Aug._Sep._Okt._Nov._Dez.".split("_"), ordinal: function(u) {
        return u + ".";
      }, weekStart: 1, formats: { LT: "HH:mm", LTS: "HH:mm:ss", L: "DD.MM.YYYY", LL: "D. MMMM YYYY", LLL: "D. MMMM YYYY HH:mm", LLLL: "dddd, D. MMMM YYYY HH:mm" }, relativeTime: { future: "in %s", past: "vor %s", s: t, m: t, mm: t, h: t, hh: t, d: t, dd: t, M: t, MM: t, y: t, yy: t } };
      return o.default.locale(i, null, !0), i;
    }));
  })(Dr)), Dr.exports;
}
var jM = XH();
const ZH = /* @__PURE__ */ A(jM), QH = /* @__PURE__ */ q({
  __proto__: null,
  default: ZH
}, [jM]);
var Tr = { exports: {} }, ej = Tr.exports, i_;
function tj() {
  return i_ || (i_ = 1, (function(e, a) {
    (function(n, r) {
      e.exports = r(P());
    })(ej, (function(n) {
      function r(u) {
        return u && typeof u == "object" && "default" in u ? u : { default: u };
      }
      var o = r(n), s = { s: "ein paar Sekunden", m: ["eine Minute", "einer Minute"], mm: "%d Minuten", h: ["eine Stunde", "einer Stunde"], hh: "%d Stunden", d: ["ein Tag", "einem Tag"], dd: ["%d Tage", "%d Tagen"], M: ["ein Monat", "einem Monat"], MM: ["%d Monate", "%d Monaten"], y: ["ein Jahr", "einem Jahr"], yy: ["%d Jahre", "%d Jahren"] };
      function t(u, l, d) {
        var c = s[d];
        return Array.isArray(c) && (c = c[l ? 0 : 1]), c.replace("%d", u);
      }
      var i = { name: "de", weekdays: "Sonntag_Montag_Dienstag_Mittwoch_Donnerstag_Freitag_Samstag".split("_"), weekdaysShort: "So._Mo._Di._Mi._Do._Fr._Sa.".split("_"), weekdaysMin: "So_Mo_Di_Mi_Do_Fr_Sa".split("_"), months: "Januar_Februar_März_April_Mai_Juni_Juli_August_September_Oktober_November_Dezember".split("_"), monthsShort: "Jan._Feb._März_Apr._Mai_Juni_Juli_Aug._Sept._Okt._Nov._Dez.".split("_"), ordinal: function(u) {
        return u + ".";
      }, weekStart: 1, yearStart: 4, formats: { LTS: "HH:mm:ss", LT: "HH:mm", L: "DD.MM.YYYY", LL: "D. MMMM YYYY", LLL: "D. MMMM YYYY HH:mm", LLLL: "dddd, D. MMMM YYYY HH:mm" }, relativeTime: { future: "in %s", past: "vor %s", s: t, m: t, mm: t, h: t, hh: t, d: t, dd: t, M: t, MM: t, y: t, yy: t } };
      return o.default.locale(i, null, !0), i;
    }));
  })(Tr)), Tr.exports;
}
var EM = tj();
const rj = /* @__PURE__ */ A(EM), nj = /* @__PURE__ */ q({
  __proto__: null,
  default: rj
}, [EM]);
var $r = { exports: {} }, aj = $r.exports, u_;
function oj() {
  return u_ || (u_ = 1, (function(e, a) {
    (function(n, r) {
      e.exports = r(P());
    })(aj, (function(n) {
      function r(t) {
        return t && typeof t == "object" && "default" in t ? t : { default: t };
      }
      var o = r(n), s = { name: "dv", weekdays: "އާދިއްތަ_ހޯމަ_އަންގާރަ_ބުދަ_ބުރާސްފަތި_ހުކުރު_ހޮނިހިރު".split("_"), months: "ޖެނުއަރީ_ފެބްރުއަރީ_މާރިޗު_އޭޕްރީލު_މޭ_ޖޫން_ޖުލައި_އޯގަސްޓު_ސެޕްޓެމްބަރު_އޮކްޓޯބަރު_ނޮވެމްބަރު_ޑިސެމްބަރު".split("_"), weekStart: 7, weekdaysShort: "އާދިއްތަ_ހޯމަ_އަންގާރަ_ބުދަ_ބުރާސްފަތި_ހުކުރު_ހޮނިހިރު".split("_"), monthsShort: "ޖެނުއަރީ_ފެބްރުއަރީ_މާރިޗު_އޭޕްރީލު_މޭ_ޖޫން_ޖުލައި_އޯގަސްޓު_ސެޕްޓެމްބަރު_އޮކްޓޯބަރު_ނޮވެމްބަރު_ޑިސެމްބަރު".split("_"), weekdaysMin: "އާދި_ހޯމަ_އަން_ބުދަ_ބުރާ_ހުކު_ހޮނި".split("_"), ordinal: function(t) {
        return t;
      }, formats: { LT: "HH:mm", LTS: "HH:mm:ss", L: "D/M/YYYY", LL: "D MMMM YYYY", LLL: "D MMMM YYYY HH:mm", LLLL: "dddd D MMMM YYYY HH:mm" }, relativeTime: { future: "ތެރޭގައި %s", past: "ކުރިން %s", s: "ސިކުންތުކޮޅެއް", m: "މިނިޓެއް", mm: "މިނިޓު %d", h: "ގަޑިއިރެއް", hh: "ގަޑިއިރު %d", d: "ދުވަހެއް", dd: "ދުވަސް %d", M: "މަހެއް", MM: "މަސް %d", y: "އަހަރެއް", yy: "އަހަރު %d" } };
      return o.default.locale(s, null, !0), s;
    }));
  })($r)), $r.exports;
}
var CM = oj();
const sj = /* @__PURE__ */ A(CM), ij = /* @__PURE__ */ q({
  __proto__: null,
  default: sj
}, [CM]);
var Hr = { exports: {} }, uj = Hr.exports, l_;
function lj() {
  return l_ || (l_ = 1, (function(e, a) {
    (function(n, r) {
      e.exports = r(P());
    })(uj, (function(n) {
      function r(t) {
        return t && typeof t == "object" && "default" in t ? t : { default: t };
      }
      var o = r(n), s = { name: "el", weekdays: "Κυριακή_Δευτέρα_Τρίτη_Τετάρτη_Πέμπτη_Παρασκευή_Σάββατο".split("_"), weekdaysShort: "Κυρ_Δευ_Τρι_Τετ_Πεμ_Παρ_Σαβ".split("_"), weekdaysMin: "Κυ_Δε_Τρ_Τε_Πε_Πα_Σα".split("_"), months: "Ιανουάριος_Φεβρουάριος_Μάρτιος_Απρίλιος_Μάιος_Ιούνιος_Ιούλιος_Αύγουστος_Σεπτέμβριος_Οκτώβριος_Νοέμβριος_Δεκέμβριος".split("_"), monthsShort: "Ιαν_Φεβ_Μαρ_Απρ_Μαι_Ιουν_Ιουλ_Αυγ_Σεπτ_Οκτ_Νοε_Δεκ".split("_"), ordinal: function(t) {
        return t;
      }, weekStart: 1, relativeTime: { future: "σε %s", past: "πριν %s", s: "μερικά δευτερόλεπτα", m: "ένα λεπτό", mm: "%d λεπτά", h: "μία ώρα", hh: "%d ώρες", d: "μία μέρα", dd: "%d μέρες", M: "ένα μήνα", MM: "%d μήνες", y: "ένα χρόνο", yy: "%d χρόνια" }, formats: { LT: "h:mm A", LTS: "h:mm:ss A", L: "DD/MM/YYYY", LL: "D MMMM YYYY", LLL: "D MMMM YYYY h:mm A", LLLL: "dddd, D MMMM YYYY h:mm A" } };
      return o.default.locale(s, null, !0), s;
    }));
  })(Hr)), Hr.exports;
}
var qM = lj();
const dj = /* @__PURE__ */ A(qM), cj = /* @__PURE__ */ q({
  __proto__: null,
  default: dj
}, [qM]);
var jr = { exports: {} }, _j = jr.exports, d_;
function fj() {
  return d_ || (d_ = 1, (function(e, a) {
    (function(n, r) {
      e.exports = r(P());
    })(_j, (function(n) {
      function r(t) {
        return t && typeof t == "object" && "default" in t ? t : { default: t };
      }
      var o = r(n), s = { name: "en-au", weekdays: "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"), months: "January_February_March_April_May_June_July_August_September_October_November_December".split("_"), weekStart: 1, weekdaysShort: "Sun_Mon_Tue_Wed_Thu_Fri_Sat".split("_"), monthsShort: "Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec".split("_"), weekdaysMin: "Su_Mo_Tu_We_Th_Fr_Sa".split("_"), formats: { LT: "h:mm A", LTS: "h:mm:ss A", L: "DD/MM/YYYY", LL: "D MMMM YYYY", LLL: "D MMMM YYYY h:mm A", LLLL: "dddd, D MMMM YYYY h:mm A" }, relativeTime: { future: "in %s", past: "%s ago", s: "a few seconds", m: "a minute", mm: "%d minutes", h: "an hour", hh: "%d hours", d: "a day", dd: "%d days", M: "a month", MM: "%d months", y: "a year", yy: "%d years" }, ordinal: function(t) {
        var i = ["th", "st", "nd", "rd"], u = t % 100;
        return "[" + t + (i[(u - 20) % 10] || i[u] || i[0]) + "]";
      } };
      return o.default.locale(s, null, !0), s;
    }));
  })(jr)), jr.exports;
}
var AM = fj();
const mj = /* @__PURE__ */ A(AM), pj = /* @__PURE__ */ q({
  __proto__: null,
  default: mj
}, [AM]);
var Er = { exports: {} }, hj = Er.exports, c_;
function vj() {
  return c_ || (c_ = 1, (function(e, a) {
    (function(n, r) {
      e.exports = r(P());
    })(hj, (function(n) {
      function r(t) {
        return t && typeof t == "object" && "default" in t ? t : { default: t };
      }
      var o = r(n), s = { name: "en-ca", weekdays: "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"), months: "January_February_March_April_May_June_July_August_September_October_November_December".split("_"), weekdaysShort: "Sun_Mon_Tue_Wed_Thu_Fri_Sat".split("_"), monthsShort: "Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec".split("_"), weekdaysMin: "Su_Mo_Tu_We_Th_Fr_Sa".split("_"), ordinal: function(t) {
        return t;
      }, formats: { LT: "h:mm A", LTS: "h:mm:ss A", L: "YYYY-MM-DD", LL: "MMMM D, YYYY", LLL: "MMMM D, YYYY h:mm A", LLLL: "dddd, MMMM D, YYYY h:mm A" }, relativeTime: { future: "in %s", past: "%s ago", s: "a few seconds", m: "a minute", mm: "%d minutes", h: "an hour", hh: "%d hours", d: "a day", dd: "%d days", M: "a month", MM: "%d months", y: "a year", yy: "%d years" } };
      return o.default.locale(s, null, !0), s;
    }));
  })(Er)), Er.exports;
}
var RM = vj();
const yj = /* @__PURE__ */ A(RM), gj = /* @__PURE__ */ q({
  __proto__: null,
  default: yj
}, [RM]);
var Cr = { exports: {} }, Mj = Cr.exports, __;
function bj() {
  return __ || (__ = 1, (function(e, a) {
    (function(n, r) {
      e.exports = r(P());
    })(Mj, (function(n) {
      function r(t) {
        return t && typeof t == "object" && "default" in t ? t : { default: t };
      }
      var o = r(n), s = { name: "en-gb", weekdays: "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"), weekdaysShort: "Sun_Mon_Tue_Wed_Thu_Fri_Sat".split("_"), weekdaysMin: "Su_Mo_Tu_We_Th_Fr_Sa".split("_"), months: "January_February_March_April_May_June_July_August_September_October_November_December".split("_"), monthsShort: "Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec".split("_"), weekStart: 1, yearStart: 4, relativeTime: { future: "in %s", past: "%s ago", s: "a few seconds", m: "a minute", mm: "%d minutes", h: "an hour", hh: "%d hours", d: "a day", dd: "%d days", M: "a month", MM: "%d months", y: "a year", yy: "%d years" }, formats: { LT: "HH:mm", LTS: "HH:mm:ss", L: "DD/MM/YYYY", LL: "D MMMM YYYY", LLL: "D MMMM YYYY HH:mm", LLLL: "dddd, D MMMM YYYY HH:mm" }, ordinal: function(t) {
        var i = ["th", "st", "nd", "rd"], u = t % 100;
        return "[" + t + (i[(u - 20) % 10] || i[u] || i[0]) + "]";
      } };
      return o.default.locale(s, null, !0), s;
    }));
  })(Cr)), Cr.exports;
}
var PM = bj();
const Yj = /* @__PURE__ */ A(PM), wj = /* @__PURE__ */ q({
  __proto__: null,
  default: Yj
}, [PM]);
var qr = { exports: {} }, xj = qr.exports, f_;
function Lj() {
  return f_ || (f_ = 1, (function(e, a) {
    (function(n, r) {
      e.exports = r(P());
    })(xj, (function(n) {
      function r(t) {
        return t && typeof t == "object" && "default" in t ? t : { default: t };
      }
      var o = r(n), s = { name: "en-ie", weekdays: "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"), months: "January_February_March_April_May_June_July_August_September_October_November_December".split("_"), weekStart: 1, weekdaysShort: "Sun_Mon_Tue_Wed_Thu_Fri_Sat".split("_"), monthsShort: "Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec".split("_"), weekdaysMin: "Su_Mo_Tu_We_Th_Fr_Sa".split("_"), ordinal: function(t) {
        return t;
      }, formats: { LT: "HH:mm", LTS: "HH:mm:ss", L: "DD/MM/YYYY", LL: "D MMMM YYYY", LLL: "D MMMM YYYY HH:mm", LLLL: "dddd D MMMM YYYY HH:mm" }, relativeTime: { future: "in %s", past: "%s ago", s: "a few seconds", m: "a minute", mm: "%d minutes", h: "an hour", hh: "%d hours", d: "a day", dd: "%d days", M: "a month", MM: "%d months", y: "a year", yy: "%d years" } };
      return o.default.locale(s, null, !0), s;
    }));
  })(qr)), qr.exports;
}
var IM = Lj();
const kj = /* @__PURE__ */ A(IM), Sj = /* @__PURE__ */ q({
  __proto__: null,
  default: kj
}, [IM]);
var Ar = { exports: {} }, Dj = Ar.exports, m_;
function Tj() {
  return m_ || (m_ = 1, (function(e, a) {
    (function(n, r) {
      e.exports = r(P());
    })(Dj, (function(n) {
      function r(t) {
        return t && typeof t == "object" && "default" in t ? t : { default: t };
      }
      var o = r(n), s = { name: "en-il", weekdays: "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"), months: "January_February_March_April_May_June_July_August_September_October_November_December".split("_"), weekdaysShort: "Sun_Mon_Tue_Wed_Thu_Fri_Sat".split("_"), monthsShort: "Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec".split("_"), weekdaysMin: "Su_Mo_Tu_We_Th_Fr_Sa".split("_"), ordinal: function(t) {
        return t;
      }, formats: { LT: "HH:mm", LTS: "HH:mm:ss", L: "DD/MM/YYYY", LL: "D MMMM YYYY", LLL: "D MMMM YYYY HH:mm", LLLL: "dddd, D MMMM YYYY HH:mm" }, relativeTime: { future: "in %s", past: "%s ago", s: "a few seconds", m: "a minute", mm: "%d minutes", h: "an hour", hh: "%d hours", d: "a day", dd: "%d days", M: "a month", MM: "%d months", y: "a year", yy: "%d years" } };
      return o.default.locale(s, null, !0), s;
    }));
  })(Ar)), Ar.exports;
}
var NM = Tj();
const $j = /* @__PURE__ */ A(NM), Hj = /* @__PURE__ */ q({
  __proto__: null,
  default: $j
}, [NM]);
var Rr = { exports: {} }, jj = Rr.exports, p_;
function Ej() {
  return p_ || (p_ = 1, (function(e, a) {
    (function(n, r) {
      e.exports = r(P());
    })(jj, (function(n) {
      function r(t) {
        return t && typeof t == "object" && "default" in t ? t : { default: t };
      }
      var o = r(n), s = { name: "en-in", weekdays: "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"), weekdaysShort: "Sun_Mon_Tue_Wed_Thu_Fri_Sat".split("_"), weekdaysMin: "Su_Mo_Tu_We_Th_Fr_Sa".split("_"), months: "January_February_March_April_May_June_July_August_September_October_November_December".split("_"), monthsShort: "Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec".split("_"), weekStart: 1, yearStart: 4, relativeTime: { future: "in %s", past: "%s ago", s: "a few seconds", m: "a minute", mm: "%d minutes", h: "an hour", hh: "%d hours", d: "a day", dd: "%d days", M: "a month", MM: "%d months", y: "a year", yy: "%d years" }, formats: { LT: "HH:mm", LTS: "HH:mm:ss", L: "DD/MM/YYYY", LL: "D MMMM YYYY", LLL: "D MMMM YYYY HH:mm", LLLL: "dddd, D MMMM YYYY HH:mm" }, ordinal: function(t) {
        var i = ["th", "st", "nd", "rd"], u = t % 100;
        return "[" + t + (i[(u - 20) % 10] || i[u] || i[0]) + "]";
      } };
      return o.default.locale(s, null, !0), s;
    }));
  })(Rr)), Rr.exports;
}
var OM = Ej();
const Cj = /* @__PURE__ */ A(OM), qj = /* @__PURE__ */ q({
  __proto__: null,
  default: Cj
}, [OM]);
var Pr = { exports: {} }, Aj = Pr.exports, h_;
function Rj() {
  return h_ || (h_ = 1, (function(e, a) {
    (function(n, r) {
      e.exports = r(P());
    })(Aj, (function(n) {
      function r(t) {
        return t && typeof t == "object" && "default" in t ? t : { default: t };
      }
      var o = r(n), s = { name: "en-nz", weekdays: "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"), months: "January_February_March_April_May_June_July_August_September_October_November_December".split("_"), weekStart: 1, weekdaysShort: "Sun_Mon_Tue_Wed_Thu_Fri_Sat".split("_"), monthsShort: "Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec".split("_"), weekdaysMin: "Su_Mo_Tu_We_Th_Fr_Sa".split("_"), ordinal: function(t) {
        var i = ["th", "st", "nd", "rd"], u = t % 100;
        return "[" + t + (i[(u - 20) % 10] || i[u] || i[0]) + "]";
      }, formats: { LT: "h:mm A", LTS: "h:mm:ss A", L: "DD/MM/YYYY", LL: "D MMMM YYYY", LLL: "D MMMM YYYY h:mm A", LLLL: "dddd, D MMMM YYYY h:mm A" }, relativeTime: { future: "in %s", past: "%s ago", s: "a few seconds", m: "a minute", mm: "%d minutes", h: "an hour", hh: "%d hours", d: "a day", dd: "%d days", M: "a month", MM: "%d months", y: "a year", yy: "%d years" } };
      return o.default.locale(s, null, !0), s;
    }));
  })(Pr)), Pr.exports;
}
var zM = Rj();
const Pj = /* @__PURE__ */ A(zM), Ij = /* @__PURE__ */ q({
  __proto__: null,
  default: Pj
}, [zM]);
var Ir = { exports: {} }, Nj = Ir.exports, v_;
function Oj() {
  return v_ || (v_ = 1, (function(e, a) {
    (function(n, r) {
      e.exports = r(P());
    })(Nj, (function(n) {
      function r(t) {
        return t && typeof t == "object" && "default" in t ? t : { default: t };
      }
      var o = r(n), s = { name: "en-sg", weekdays: "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"), months: "January_February_March_April_May_June_July_August_September_October_November_December".split("_"), weekStart: 1, weekdaysShort: "Sun_Mon_Tue_Wed_Thu_Fri_Sat".split("_"), monthsShort: "Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec".split("_"), weekdaysMin: "Su_Mo_Tu_We_Th_Fr_Sa".split("_"), ordinal: function(t) {
        return t;
      }, formats: { LT: "HH:mm", LTS: "HH:mm:ss", L: "DD/MM/YYYY", LL: "D MMMM YYYY", LLL: "D MMMM YYYY HH:mm", LLLL: "dddd, D MMMM YYYY HH:mm" }, relativeTime: { future: "in %s", past: "%s ago", s: "a few seconds", m: "a minute", mm: "%d minutes", h: "an hour", hh: "%d hours", d: "a day", dd: "%d days", M: "a month", MM: "%d months", y: "a year", yy: "%d years" } };
      return o.default.locale(s, null, !0), s;
    }));
  })(Ir)), Ir.exports;
}
var FM = Oj();
const zj = /* @__PURE__ */ A(FM), Fj = /* @__PURE__ */ q({
  __proto__: null,
  default: zj
}, [FM]);
var Nr = { exports: {} }, Bj = Nr.exports, y_;
function Gj() {
  return y_ || (y_ = 1, (function(e, a) {
    (function(n, r) {
      e.exports = r(P());
    })(Bj, (function(n) {
      function r(t) {
        return t && typeof t == "object" && "default" in t ? t : { default: t };
      }
      var o = r(n), s = { name: "en-tt", weekdays: "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"), weekdaysShort: "Sun_Mon_Tue_Wed_Thu_Fri_Sat".split("_"), weekdaysMin: "Su_Mo_Tu_We_Th_Fr_Sa".split("_"), months: "January_February_March_April_May_June_July_August_September_October_November_December".split("_"), monthsShort: "Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec".split("_"), weekStart: 1, yearStart: 4, relativeTime: { future: "in %s", past: "%s ago", s: "a few seconds", m: "a minute", mm: "%d minutes", h: "an hour", hh: "%d hours", d: "a day", dd: "%d days", M: "a month", MM: "%d months", y: "a year", yy: "%d years" }, formats: { LT: "HH:mm", LTS: "HH:mm:ss", L: "DD/MM/YYYY", LL: "D MMMM YYYY", LLL: "D MMMM YYYY HH:mm", LLLL: "dddd, D MMMM YYYY HH:mm" }, ordinal: function(t) {
        var i = ["th", "st", "nd", "rd"], u = t % 100;
        return "[" + t + (i[(u - 20) % 10] || i[u] || i[0]) + "]";
      } };
      return o.default.locale(s, null, !0), s;
    }));
  })(Nr)), Nr.exports;
}
var BM = Gj();
const Jj = /* @__PURE__ */ A(BM), Uj = /* @__PURE__ */ q({
  __proto__: null,
  default: Jj
}, [BM]);
var Or = { exports: {} }, Wj = Or.exports, g_;
function Vj() {
  return g_ || (g_ = 1, (function(e, a) {
    (function(n, r) {
      e.exports = r();
    })(Wj, (function() {
      return { name: "en", weekdays: "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"), months: "January_February_March_April_May_June_July_August_September_October_November_December".split("_"), ordinal: function(n) {
        var r = ["th", "st", "nd", "rd"], o = n % 100;
        return "[" + n + (r[(o - 20) % 10] || r[o] || r[0]) + "]";
      } };
    }));
  })(Or)), Or.exports;
}
var GM = Vj();
const Kj = /* @__PURE__ */ A(GM), Xj = /* @__PURE__ */ q({
  __proto__: null,
  default: Kj
}, [GM]);
var zr = { exports: {} }, Zj = zr.exports, M_;
function Qj() {
  return M_ || (M_ = 1, (function(e, a) {
    (function(n, r) {
      e.exports = r(P());
    })(Zj, (function(n) {
      function r(t) {
        return t && typeof t == "object" && "default" in t ? t : { default: t };
      }
      var o = r(n), s = { name: "eo", weekdays: "dimanĉo_lundo_mardo_merkredo_ĵaŭdo_vendredo_sabato".split("_"), months: "januaro_februaro_marto_aprilo_majo_junio_julio_aŭgusto_septembro_oktobro_novembro_decembro".split("_"), weekStart: 1, weekdaysShort: "dim_lun_mard_merk_ĵaŭ_ven_sab".split("_"), monthsShort: "jan_feb_mar_apr_maj_jun_jul_aŭg_sep_okt_nov_dec".split("_"), weekdaysMin: "di_lu_ma_me_ĵa_ve_sa".split("_"), ordinal: function(t) {
        return t;
      }, formats: { LT: "HH:mm", LTS: "HH:mm:ss", L: "YYYY-MM-DD", LL: "D[-a de] MMMM, YYYY", LLL: "D[-a de] MMMM, YYYY HH:mm", LLLL: "dddd, [la] D[-a de] MMMM, YYYY HH:mm" }, relativeTime: { future: "post %s", past: "antaŭ %s", s: "sekundoj", m: "minuto", mm: "%d minutoj", h: "horo", hh: "%d horoj", d: "tago", dd: "%d tagoj", M: "monato", MM: "%d monatoj", y: "jaro", yy: "%d jaroj" } };
      return o.default.locale(s, null, !0), s;
    }));
  })(zr)), zr.exports;
}
var JM = Qj();
const eE = /* @__PURE__ */ A(JM), tE = /* @__PURE__ */ q({
  __proto__: null,
  default: eE
}, [JM]);
var Fr = { exports: {} }, rE = Fr.exports, b_;
function nE() {
  return b_ || (b_ = 1, (function(e, a) {
    (function(n, r) {
      e.exports = r(P());
    })(rE, (function(n) {
      function r(t) {
        return t && typeof t == "object" && "default" in t ? t : { default: t };
      }
      var o = r(n), s = { name: "es-do", weekdays: "domingo_lunes_martes_miércoles_jueves_viernes_sábado".split("_"), weekdaysShort: "dom._lun._mar._mié._jue._vie._sáb.".split("_"), weekdaysMin: "do_lu_ma_mi_ju_vi_sá".split("_"), months: "enero_febrero_marzo_abril_mayo_junio_julio_agosto_septiembre_octubre_noviembre_diciembre".split("_"), monthsShort: "ene_feb_mar_abr_may_jun_jul_ago_sep_oct_nov_dic".split("_"), weekStart: 1, relativeTime: { future: "en %s", past: "hace %s", s: "unos segundos", m: "un minuto", mm: "%d minutos", h: "una hora", hh: "%d horas", d: "un día", dd: "%d días", M: "un mes", MM: "%d meses", y: "un año", yy: "%d años" }, ordinal: function(t) {
        return t + "º";
      }, formats: { LT: "h:mm A", LTS: "h:mm:ss A", L: "DD/MM/YYYY", LL: "D [de] MMMM [de] YYYY", LLL: "D [de] MMMM [de] YYYY h:mm A", LLLL: "dddd, D [de] MMMM [de] YYYY h:mm A" } };
      return o.default.locale(s, null, !0), s;
    }));
  })(Fr)), Fr.exports;
}
var UM = nE();
const aE = /* @__PURE__ */ A(UM), oE = /* @__PURE__ */ q({
  __proto__: null,
  default: aE
}, [UM]);
var Br = { exports: {} }, sE = Br.exports, Y_;
function iE() {
  return Y_ || (Y_ = 1, (function(e, a) {
    (function(n, r) {
      e.exports = r(P());
    })(sE, (function(n) {
      function r(t) {
        return t && typeof t == "object" && "default" in t ? t : { default: t };
      }
      var o = r(n), s = { name: "es-mx", weekdays: "domingo_lunes_martes_miércoles_jueves_viernes_sábado".split("_"), weekdaysShort: "dom._lun._mar._mié._jue._vie._sáb.".split("_"), weekdaysMin: "do_lu_ma_mi_ju_vi_sá".split("_"), months: "enero_febrero_marzo_abril_mayo_junio_julio_agosto_septiembre_octubre_noviembre_diciembre".split("_"), monthsShort: "ene_feb_mar_abr_may_jun_jul_ago_sep_oct_nov_dic".split("_"), relativeTime: { future: "en %s", past: "hace %s", s: "unos segundos", m: "un minuto", mm: "%d minutos", h: "una hora", hh: "%d horas", d: "un día", dd: "%d días", M: "un mes", MM: "%d meses", y: "un año", yy: "%d años" }, ordinal: function(t) {
        return t + "º";
      }, formats: { LT: "H:mm", LTS: "H:mm:ss", L: "DD/MM/YYYY", LL: "D [de] MMMM [de] YYYY", LLL: "D [de] MMMM [de] YYYY H:mm", LLLL: "dddd, D [de] MMMM [de] YYYY H:mm" } };
      return o.default.locale(s, null, !0), s;
    }));
  })(Br)), Br.exports;
}
var WM = iE();
const uE = /* @__PURE__ */ A(WM), lE = /* @__PURE__ */ q({
  __proto__: null,
  default: uE
}, [WM]);
var Gr = { exports: {} }, dE = Gr.exports, w_;
function cE() {
  return w_ || (w_ = 1, (function(e, a) {
    (function(n, r) {
      e.exports = r(P());
    })(dE, (function(n) {
      function r(t) {
        return t && typeof t == "object" && "default" in t ? t : { default: t };
      }
      var o = r(n), s = { name: "es-pr", monthsShort: "ene_feb_mar_abr_may_jun_jul_ago_sep_oct_nov_dic".split("_"), weekdays: "domingo_lunes_martes_miércoles_jueves_viernes_sábado".split("_"), weekdaysShort: "dom._lun._mar._mié._jue._vie._sáb.".split("_"), weekdaysMin: "do_lu_ma_mi_ju_vi_sá".split("_"), months: "enero_febrero_marzo_abril_mayo_junio_julio_agosto_septiembre_octubre_noviembre_diciembre".split("_"), weekStart: 1, formats: { LT: "h:mm A", LTS: "h:mm:ss A", L: "MM/DD/YYYY", LL: "D [de] MMMM [de] YYYY", LLL: "D [de] MMMM [de] YYYY h:mm A", LLLL: "dddd, D [de] MMMM [de] YYYY h:mm A" }, relativeTime: { future: "en %s", past: "hace %s", s: "unos segundos", m: "un minuto", mm: "%d minutos", h: "una hora", hh: "%d horas", d: "un día", dd: "%d días", M: "un mes", MM: "%d meses", y: "un año", yy: "%d años" }, ordinal: function(t) {
        return t + "º";
      } };
      return o.default.locale(s, null, !0), s;
    }));
  })(Gr)), Gr.exports;
}
var VM = cE();
const _E = /* @__PURE__ */ A(VM), fE = /* @__PURE__ */ q({
  __proto__: null,
  default: _E
}, [VM]);
var Jr = { exports: {} }, mE = Jr.exports, x_;
function pE() {
  return x_ || (x_ = 1, (function(e, a) {
    (function(n, r) {
      e.exports = r(P());
    })(mE, (function(n) {
      function r(t) {
        return t && typeof t == "object" && "default" in t ? t : { default: t };
      }
      var o = r(n), s = { name: "es-us", weekdays: "domingo_lunes_martes_miércoles_jueves_viernes_sábado".split("_"), weekdaysShort: "dom._lun._mar._mié._jue._vie._sáb.".split("_"), weekdaysMin: "do_lu_ma_mi_ju_vi_sá".split("_"), months: "enero_febrero_marzo_abril_mayo_junio_julio_agosto_septiembre_octubre_noviembre_diciembre".split("_"), monthsShort: "ene_feb_mar_abr_may_jun_jul_ago_sep_oct_nov_dic".split("_"), relativeTime: { future: "en %s", past: "hace %s", s: "unos segundos", m: "un minuto", mm: "%d minutos", h: "una hora", hh: "%d horas", d: "un día", dd: "%d días", M: "un mes", MM: "%d meses", y: "un año", yy: "%d años" }, ordinal: function(t) {
        return t + "º";
      }, formats: { LT: "h:mm A", LTS: "h:mm:ss A", L: "MM/DD/YYYY", LL: "D [de] MMMM [de] YYYY", LLL: "D [de] MMMM [de] YYYY h:mm A", LLLL: "dddd, D [de] MMMM [de] YYYY h:mm A" } };
      return o.default.locale(s, null, !0), s;
    }));
  })(Jr)), Jr.exports;
}
var KM = pE();
const hE = /* @__PURE__ */ A(KM), vE = /* @__PURE__ */ q({
  __proto__: null,
  default: hE
}, [KM]);
var Ur = { exports: {} }, yE = Ur.exports, L_;
function gE() {
  return L_ || (L_ = 1, (function(e, a) {
    (function(n, r) {
      e.exports = r(P());
    })(yE, (function(n) {
      function r(t) {
        return t && typeof t == "object" && "default" in t ? t : { default: t };
      }
      var o = r(n), s = { name: "es", monthsShort: "ene_feb_mar_abr_may_jun_jul_ago_sep_oct_nov_dic".split("_"), weekdays: "domingo_lunes_martes_miércoles_jueves_viernes_sábado".split("_"), weekdaysShort: "dom._lun._mar._mié._jue._vie._sáb.".split("_"), weekdaysMin: "do_lu_ma_mi_ju_vi_sá".split("_"), months: "enero_febrero_marzo_abril_mayo_junio_julio_agosto_septiembre_octubre_noviembre_diciembre".split("_"), weekStart: 1, formats: { LT: "H:mm", LTS: "H:mm:ss", L: "DD/MM/YYYY", LL: "D [de] MMMM [de] YYYY", LLL: "D [de] MMMM [de] YYYY H:mm", LLLL: "dddd, D [de] MMMM [de] YYYY H:mm" }, relativeTime: { future: "en %s", past: "hace %s", s: "unos segundos", m: "un minuto", mm: "%d minutos", h: "una hora", hh: "%d horas", d: "un día", dd: "%d días", M: "un mes", MM: "%d meses", y: "un año", yy: "%d años" }, ordinal: function(t) {
        return t + "º";
      } };
      return o.default.locale(s, null, !0), s;
    }));
  })(Ur)), Ur.exports;
}
var XM = gE();
const ME = /* @__PURE__ */ A(XM), bE = /* @__PURE__ */ q({
  __proto__: null,
  default: ME
}, [XM]);
var Wr = { exports: {} }, YE = Wr.exports, k_;
function wE() {
  return k_ || (k_ = 1, (function(e, a) {
    (function(n, r) {
      e.exports = r(P());
    })(YE, (function(n) {
      function r(i) {
        return i && typeof i == "object" && "default" in i ? i : { default: i };
      }
      var o = r(n);
      function s(i, u, l, d) {
        var c = { s: ["mõne sekundi", "mõni sekund", "paar sekundit"], m: ["ühe minuti", "üks minut"], mm: ["%d minuti", "%d minutit"], h: ["ühe tunni", "tund aega", "üks tund"], hh: ["%d tunni", "%d tundi"], d: ["ühe päeva", "üks päev"], M: ["kuu aja", "kuu aega", "üks kuu"], MM: ["%d kuu", "%d kuud"], y: ["ühe aasta", "aasta", "üks aasta"], yy: ["%d aasta", "%d aastat"] };
        return u ? (c[l][2] ? c[l][2] : c[l][1]).replace("%d", i) : (d ? c[l][0] : c[l][1]).replace("%d", i);
      }
      var t = { name: "et", weekdays: "pühapäev_esmaspäev_teisipäev_kolmapäev_neljapäev_reede_laupäev".split("_"), weekdaysShort: "P_E_T_K_N_R_L".split("_"), weekdaysMin: "P_E_T_K_N_R_L".split("_"), months: "jaanuar_veebruar_märts_aprill_mai_juuni_juuli_august_september_oktoober_november_detsember".split("_"), monthsShort: "jaan_veebr_märts_apr_mai_juuni_juuli_aug_sept_okt_nov_dets".split("_"), ordinal: function(i) {
        return i + ".";
      }, weekStart: 1, relativeTime: { future: "%s pärast", past: "%s tagasi", s, m: s, mm: s, h: s, hh: s, d: s, dd: "%d päeva", M: s, MM: s, y: s, yy: s }, formats: { LT: "H:mm", LTS: "H:mm:ss", L: "DD.MM.YYYY", LL: "D. MMMM YYYY", LLL: "D. MMMM YYYY H:mm", LLLL: "dddd, D. MMMM YYYY H:mm" } };
      return o.default.locale(t, null, !0), t;
    }));
  })(Wr)), Wr.exports;
}
var ZM = wE();
const xE = /* @__PURE__ */ A(ZM), LE = /* @__PURE__ */ q({
  __proto__: null,
  default: xE
}, [ZM]);
var Vr = { exports: {} }, kE = Vr.exports, S_;
function SE() {
  return S_ || (S_ = 1, (function(e, a) {
    (function(n, r) {
      e.exports = r(P());
    })(kE, (function(n) {
      function r(t) {
        return t && typeof t == "object" && "default" in t ? t : { default: t };
      }
      var o = r(n), s = { name: "eu", weekdays: "igandea_astelehena_asteartea_asteazkena_osteguna_ostirala_larunbata".split("_"), months: "urtarrila_otsaila_martxoa_apirila_maiatza_ekaina_uztaila_abuztua_iraila_urria_azaroa_abendua".split("_"), weekStart: 1, weekdaysShort: "ig._al._ar._az._og._ol._lr.".split("_"), monthsShort: "urt._ots._mar._api._mai._eka._uzt._abu._ira._urr._aza._abe.".split("_"), weekdaysMin: "ig_al_ar_az_og_ol_lr".split("_"), ordinal: function(t) {
        return t;
      }, formats: { LT: "HH:mm", LTS: "HH:mm:ss", L: "YYYY-MM-DD", LL: "YYYY[ko] MMMM[ren] D[a]", LLL: "YYYY[ko] MMMM[ren] D[a] HH:mm", LLLL: "dddd, YYYY[ko] MMMM[ren] D[a] HH:mm", l: "YYYY-M-D", ll: "YYYY[ko] MMM D[a]", lll: "YYYY[ko] MMM D[a] HH:mm", llll: "ddd, YYYY[ko] MMM D[a] HH:mm" }, relativeTime: { future: "%s barru", past: "duela %s", s: "segundo batzuk", m: "minutu bat", mm: "%d minutu", h: "ordu bat", hh: "%d ordu", d: "egun bat", dd: "%d egun", M: "hilabete bat", MM: "%d hilabete", y: "urte bat", yy: "%d urte" } };
      return o.default.locale(s, null, !0), s;
    }));
  })(Vr)), Vr.exports;
}
var QM = SE();
const DE = /* @__PURE__ */ A(QM), TE = /* @__PURE__ */ q({
  __proto__: null,
  default: DE
}, [QM]);
var Kr = { exports: {} }, $E = Kr.exports, D_;
function HE() {
  return D_ || (D_ = 1, (function(e, a) {
    (function(n, r) {
      e.exports = r(P());
    })($E, (function(n) {
      function r(t) {
        return t && typeof t == "object" && "default" in t ? t : { default: t };
      }
      var o = r(n), s = { name: "fa", weekdays: "یک‌شنبه_دوشنبه_سه‌شنبه_چهارشنبه_پنج‌شنبه_جمعه_شنبه".split("_"), weekdaysShort: "یک‌شنبه_دوشنبه_سه‌شنبه_چهارشنبه_پنج‌شنبه_جمعه_شنبه".split("_"), weekdaysMin: "ی_د_س_چ_پ_ج_ش".split("_"), weekStart: 6, months: "ژانویه_فوریه_مارس_آوریل_مه_ژوئن_ژوئیه_اوت_سپتامبر_اکتبر_نوامبر_دسامبر".split("_"), monthsShort: "ژانویه_فوریه_مارس_آوریل_مه_ژوئن_ژوئیه_اوت_سپتامبر_اکتبر_نوامبر_دسامبر".split("_"), ordinal: function(t) {
        return t;
      }, formats: { LT: "HH:mm", LTS: "HH:mm:ss", L: "DD/MM/YYYY", LL: "D MMMM YYYY", LLL: "D MMMM YYYY HH:mm", LLLL: "dddd, D MMMM YYYY HH:mm" }, relativeTime: { future: "در %s", past: "%s پیش", s: "چند ثانیه", m: "یک دقیقه", mm: "%d دقیقه", h: "یک ساعت", hh: "%d ساعت", d: "یک روز", dd: "%d روز", M: "یک ماه", MM: "%d ماه", y: "یک سال", yy: "%d سال" } };
      return o.default.locale(s, null, !0), s;
    }));
  })(Kr)), Kr.exports;
}
var eb = HE();
const jE = /* @__PURE__ */ A(eb), EE = /* @__PURE__ */ q({
  __proto__: null,
  default: jE
}, [eb]);
var Xr = { exports: {} }, CE = Xr.exports, T_;
function qE() {
  return T_ || (T_ = 1, (function(e, a) {
    (function(n, r) {
      e.exports = r(P());
    })(CE, (function(n) {
      function r(i) {
        return i && typeof i == "object" && "default" in i ? i : { default: i };
      }
      var o = r(n);
      function s(i, u, l, d) {
        var c = { s: "muutama sekunti", m: "minuutti", mm: "%d minuuttia", h: "tunti", hh: "%d tuntia", d: "päivä", dd: "%d päivää", M: "kuukausi", MM: "%d kuukautta", y: "vuosi", yy: "%d vuotta", numbers: "nolla_yksi_kaksi_kolme_neljä_viisi_kuusi_seitsemän_kahdeksan_yhdeksän".split("_") }, _ = { s: "muutaman sekunnin", m: "minuutin", mm: "%d minuutin", h: "tunnin", hh: "%d tunnin", d: "päivän", dd: "%d päivän", M: "kuukauden", MM: "%d kuukauden", y: "vuoden", yy: "%d vuoden", numbers: "nollan_yhden_kahden_kolmen_neljän_viiden_kuuden_seitsemän_kahdeksan_yhdeksän".split("_") }, f = d && !u ? _ : c, m = f[l];
        return i < 10 ? m.replace("%d", f.numbers[i]) : m.replace("%d", i);
      }
      var t = { name: "fi", weekdays: "sunnuntai_maanantai_tiistai_keskiviikko_torstai_perjantai_lauantai".split("_"), weekdaysShort: "su_ma_ti_ke_to_pe_la".split("_"), weekdaysMin: "su_ma_ti_ke_to_pe_la".split("_"), months: "tammikuu_helmikuu_maaliskuu_huhtikuu_toukokuu_kesäkuu_heinäkuu_elokuu_syyskuu_lokakuu_marraskuu_joulukuu".split("_"), monthsShort: "tammi_helmi_maalis_huhti_touko_kesä_heinä_elo_syys_loka_marras_joulu".split("_"), ordinal: function(i) {
        return i + ".";
      }, weekStart: 1, yearStart: 4, relativeTime: { future: "%s päästä", past: "%s sitten", s, m: s, mm: s, h: s, hh: s, d: s, dd: s, M: s, MM: s, y: s, yy: s }, formats: { LT: "HH.mm", LTS: "HH.mm.ss", L: "DD.MM.YYYY", LL: "D. MMMM[ta] YYYY", LLL: "D. MMMM[ta] YYYY, [klo] HH.mm", LLLL: "dddd, D. MMMM[ta] YYYY, [klo] HH.mm", l: "D.M.YYYY", ll: "D. MMM YYYY", lll: "D. MMM YYYY, [klo] HH.mm", llll: "ddd, D. MMM YYYY, [klo] HH.mm" } };
      return o.default.locale(t, null, !0), t;
    }));
  })(Xr)), Xr.exports;
}
var tb = qE();
const AE = /* @__PURE__ */ A(tb), RE = /* @__PURE__ */ q({
  __proto__: null,
  default: AE
}, [tb]);
var Zr = { exports: {} }, PE = Zr.exports, $_;
function IE() {
  return $_ || ($_ = 1, (function(e, a) {
    (function(n, r) {
      e.exports = r(P());
    })(PE, (function(n) {
      function r(t) {
        return t && typeof t == "object" && "default" in t ? t : { default: t };
      }
      var o = r(n), s = { name: "fo", weekdays: "sunnudagur_mánadagur_týsdagur_mikudagur_hósdagur_fríggjadagur_leygardagur".split("_"), months: "januar_februar_mars_apríl_mai_juni_juli_august_september_oktober_november_desember".split("_"), weekStart: 1, weekdaysShort: "sun_mán_týs_mik_hós_frí_ley".split("_"), monthsShort: "jan_feb_mar_apr_mai_jun_jul_aug_sep_okt_nov_des".split("_"), weekdaysMin: "su_má_tý_mi_hó_fr_le".split("_"), ordinal: function(t) {
        return t;
      }, formats: { LT: "HH:mm", LTS: "HH:mm:ss", L: "DD/MM/YYYY", LL: "D MMMM YYYY", LLL: "D MMMM YYYY HH:mm", LLLL: "dddd D. MMMM, YYYY HH:mm" }, relativeTime: { future: "um %s", past: "%s síðani", s: "fá sekund", m: "ein minuttur", mm: "%d minuttir", h: "ein tími", hh: "%d tímar", d: "ein dagur", dd: "%d dagar", M: "ein mánaður", MM: "%d mánaðir", y: "eitt ár", yy: "%d ár" } };
      return o.default.locale(s, null, !0), s;
    }));
  })(Zr)), Zr.exports;
}
var rb = IE();
const NE = /* @__PURE__ */ A(rb), OE = /* @__PURE__ */ q({
  __proto__: null,
  default: NE
}, [rb]);
var Qr = { exports: {} }, zE = Qr.exports, H_;
function FE() {
  return H_ || (H_ = 1, (function(e, a) {
    (function(n, r) {
      e.exports = r(P());
    })(zE, (function(n) {
      function r(t) {
        return t && typeof t == "object" && "default" in t ? t : { default: t };
      }
      var o = r(n), s = { name: "fr-ca", weekdays: "dimanche_lundi_mardi_mercredi_jeudi_vendredi_samedi".split("_"), months: "janvier_février_mars_avril_mai_juin_juillet_août_septembre_octobre_novembre_décembre".split("_"), weekdaysShort: "dim._lun._mar._mer._jeu._ven._sam.".split("_"), monthsShort: "janv._févr._mars_avr._mai_juin_juil._août_sept._oct._nov._déc.".split("_"), weekdaysMin: "di_lu_ma_me_je_ve_sa".split("_"), ordinal: function(t) {
        return t;
      }, formats: { LT: "HH:mm", LTS: "HH:mm:ss", L: "YYYY-MM-DD", LL: "D MMMM YYYY", LLL: "D MMMM YYYY HH:mm", LLLL: "dddd D MMMM YYYY HH:mm" }, relativeTime: { future: "dans %s", past: "il y a %s", s: "quelques secondes", m: "une minute", mm: "%d minutes", h: "une heure", hh: "%d heures", d: "un jour", dd: "%d jours", M: "un mois", MM: "%d mois", y: "un an", yy: "%d ans" } };
      return o.default.locale(s, null, !0), s;
    }));
  })(Qr)), Qr.exports;
}
var nb = FE();
const BE = /* @__PURE__ */ A(nb), GE = /* @__PURE__ */ q({
  __proto__: null,
  default: BE
}, [nb]);
var en = { exports: {} }, JE = en.exports, j_;
function UE() {
  return j_ || (j_ = 1, (function(e, a) {
    (function(n, r) {
      e.exports = r(P());
    })(JE, (function(n) {
      function r(t) {
        return t && typeof t == "object" && "default" in t ? t : { default: t };
      }
      var o = r(n), s = { name: "fr-ch", weekdays: "dimanche_lundi_mardi_mercredi_jeudi_vendredi_samedi".split("_"), months: "janvier_février_mars_avril_mai_juin_juillet_août_septembre_octobre_novembre_décembre".split("_"), weekStart: 1, weekdaysShort: "dim._lun._mar._mer._jeu._ven._sam.".split("_"), monthsShort: "janv._févr._mars_avr._mai_juin_juil._août_sept._oct._nov._déc.".split("_"), weekdaysMin: "di_lu_ma_me_je_ve_sa".split("_"), ordinal: function(t) {
        return t;
      }, formats: { LT: "HH:mm", LTS: "HH:mm:ss", L: "DD.MM.YYYY", LL: "D MMMM YYYY", LLL: "D MMMM YYYY HH:mm", LLLL: "dddd D MMMM YYYY HH:mm" }, relativeTime: { future: "dans %s", past: "il y a %s", s: "quelques secondes", m: "une minute", mm: "%d minutes", h: "une heure", hh: "%d heures", d: "un jour", dd: "%d jours", M: "un mois", MM: "%d mois", y: "un an", yy: "%d ans" } };
      return o.default.locale(s, null, !0), s;
    }));
  })(en)), en.exports;
}
var ab = UE();
const WE = /* @__PURE__ */ A(ab), VE = /* @__PURE__ */ q({
  __proto__: null,
  default: WE
}, [ab]);
var tn = { exports: {} }, KE = tn.exports, E_;
function XE() {
  return E_ || (E_ = 1, (function(e, a) {
    (function(n, r) {
      e.exports = r(P());
    })(KE, (function(n) {
      function r(t) {
        return t && typeof t == "object" && "default" in t ? t : { default: t };
      }
      var o = r(n), s = { name: "fr", weekdays: "dimanche_lundi_mardi_mercredi_jeudi_vendredi_samedi".split("_"), weekdaysShort: "dim._lun._mar._mer._jeu._ven._sam.".split("_"), weekdaysMin: "di_lu_ma_me_je_ve_sa".split("_"), months: "janvier_février_mars_avril_mai_juin_juillet_août_septembre_octobre_novembre_décembre".split("_"), monthsShort: "janv._févr._mars_avr._mai_juin_juil._août_sept._oct._nov._déc.".split("_"), weekStart: 1, yearStart: 4, formats: { LT: "HH:mm", LTS: "HH:mm:ss", L: "DD/MM/YYYY", LL: "D MMMM YYYY", LLL: "D MMMM YYYY HH:mm", LLLL: "dddd D MMMM YYYY HH:mm" }, relativeTime: { future: "dans %s", past: "il y a %s", s: "quelques secondes", m: "une minute", mm: "%d minutes", h: "une heure", hh: "%d heures", d: "un jour", dd: "%d jours", M: "un mois", MM: "%d mois", y: "un an", yy: "%d ans" }, ordinal: function(t) {
        return "" + t + (t === 1 ? "er" : "");
      } };
      return o.default.locale(s, null, !0), s;
    }));
  })(tn)), tn.exports;
}
var ob = XE();
const ZE = /* @__PURE__ */ A(ob), QE = /* @__PURE__ */ q({
  __proto__: null,
  default: ZE
}, [ob]);
var rn = { exports: {} }, e2 = rn.exports, C_;
function t2() {
  return C_ || (C_ = 1, (function(e, a) {
    (function(n, r) {
      e.exports = r(P());
    })(e2, (function(n) {
      function r(t) {
        return t && typeof t == "object" && "default" in t ? t : { default: t };
      }
      var o = r(n), s = { name: "fy", weekdays: "snein_moandei_tiisdei_woansdei_tongersdei_freed_sneon".split("_"), months: "jannewaris_febrewaris_maart_april_maaie_juny_july_augustus_septimber_oktober_novimber_desimber".split("_"), monthsShort: "jan._feb._mrt._apr._mai_jun._jul._aug._sep._okt._nov._des.".split("_"), weekStart: 1, weekdaysShort: "si._mo._ti._wo._to._fr._so.".split("_"), weekdaysMin: "Si_Mo_Ti_Wo_To_Fr_So".split("_"), ordinal: function(t) {
        return t;
      }, formats: { LT: "HH:mm", LTS: "HH:mm:ss", L: "DD-MM-YYYY", LL: "D MMMM YYYY", LLL: "D MMMM YYYY HH:mm", LLLL: "dddd D MMMM YYYY HH:mm" }, relativeTime: { future: "oer %s", past: "%s lyn", s: "in pear sekonden", m: "ien minút", mm: "%d minuten", h: "ien oere", hh: "%d oeren", d: "ien dei", dd: "%d dagen", M: "ien moanne", MM: "%d moannen", y: "ien jier", yy: "%d jierren" } };
      return o.default.locale(s, null, !0), s;
    }));
  })(rn)), rn.exports;
}
var sb = t2();
const r2 = /* @__PURE__ */ A(sb), n2 = /* @__PURE__ */ q({
  __proto__: null,
  default: r2
}, [sb]);
var nn = { exports: {} }, a2 = nn.exports, q_;
function o2() {
  return q_ || (q_ = 1, (function(e, a) {
    (function(n, r) {
      e.exports = r(P());
    })(a2, (function(n) {
      function r(t) {
        return t && typeof t == "object" && "default" in t ? t : { default: t };
      }
      var o = r(n), s = { name: "ga", weekdays: "Dé Domhnaigh_Dé Luain_Dé Máirt_Dé Céadaoin_Déardaoin_Dé hAoine_Dé Sathairn".split("_"), months: "Eanáir_Feabhra_Márta_Aibreán_Bealtaine_Meitheamh_Iúil_Lúnasa_Meán Fómhair_Deireadh Fómhair_Samhain_Nollaig".split("_"), weekStart: 1, weekdaysShort: "Dom_Lua_Mái_Céa_Déa_Aoi_Sat".split("_"), monthsShort: "Ean_Fea_Már_Aib_Beal_Mei_Iúil_Lún_MFómh_DFómh_Samh_Noll".split("_"), weekdaysMin: "Do_Lu_Má_Cé_Dé_Ao_Sa".split("_"), ordinal: function(t) {
        return t;
      }, formats: { LT: "HH:mm", LTS: "HH:mm:ss", L: "DD/MM/YYYY", LL: "D MMMM YYYY", LLL: "D MMMM YYYY HH:mm", LLLL: "dddd, D MMMM YYYY HH:mm" }, relativeTime: { future: "i %s", past: "%s ó shin", s: "cúpla soicind", m: "nóiméad", mm: "%d nóiméad", h: "uair an chloig", hh: "%d uair an chloig", d: "lá", dd: "%d lá", M: "mí", MM: "%d mí", y: "bliain", yy: "%d bliain" } };
      return o.default.locale(s, null, !0), s;
    }));
  })(nn)), nn.exports;
}
var ib = o2();
const s2 = /* @__PURE__ */ A(ib), i2 = /* @__PURE__ */ q({
  __proto__: null,
  default: s2
}, [ib]);
var an = { exports: {} }, u2 = an.exports, A_;
function l2() {
  return A_ || (A_ = 1, (function(e, a) {
    (function(n, r) {
      e.exports = r(P());
    })(u2, (function(n) {
      function r(t) {
        return t && typeof t == "object" && "default" in t ? t : { default: t };
      }
      var o = r(n), s = { name: "gd", weekdays: "Didòmhnaich_Diluain_Dimàirt_Diciadain_Diardaoin_Dihaoine_Disathairne".split("_"), months: "Am Faoilleach_An Gearran_Am Màrt_An Giblean_An Cèitean_An t-Ògmhios_An t-Iuchar_An Lùnastal_An t-Sultain_An Dàmhair_An t-Samhain_An Dùbhlachd".split("_"), weekStart: 1, weekdaysShort: "Did_Dil_Dim_Dic_Dia_Dih_Dis".split("_"), monthsShort: "Faoi_Gear_Màrt_Gibl_Cèit_Ògmh_Iuch_Lùn_Sult_Dàmh_Samh_Dùbh".split("_"), weekdaysMin: "Dò_Lu_Mà_Ci_Ar_Ha_Sa".split("_"), ordinal: function(t) {
        return t;
      }, formats: { LT: "HH:mm", LTS: "HH:mm:ss", L: "DD/MM/YYYY", LL: "D MMMM YYYY", LLL: "D MMMM YYYY HH:mm", LLLL: "dddd, D MMMM YYYY HH:mm" }, relativeTime: { future: "ann an %s", past: "bho chionn %s", s: "beagan diogan", m: "mionaid", mm: "%d mionaidean", h: "uair", hh: "%d uairean", d: "latha", dd: "%d latha", M: "mìos", MM: "%d mìosan", y: "bliadhna", yy: "%d bliadhna" } };
      return o.default.locale(s, null, !0), s;
    }));
  })(an)), an.exports;
}
var ub = l2();
const d2 = /* @__PURE__ */ A(ub), c2 = /* @__PURE__ */ q({
  __proto__: null,
  default: d2
}, [ub]);
var on = { exports: {} }, _2 = on.exports, R_;
function f2() {
  return R_ || (R_ = 1, (function(e, a) {
    (function(n, r) {
      e.exports = r(P());
    })(_2, (function(n) {
      function r(t) {
        return t && typeof t == "object" && "default" in t ? t : { default: t };
      }
      var o = r(n), s = { name: "gl", weekdays: "domingo_luns_martes_mércores_xoves_venres_sábado".split("_"), months: "xaneiro_febreiro_marzo_abril_maio_xuño_xullo_agosto_setembro_outubro_novembro_decembro".split("_"), weekStart: 1, weekdaysShort: "dom._lun._mar._mér._xov._ven._sáb.".split("_"), monthsShort: "xan._feb._mar._abr._mai._xuñ._xul._ago._set._out._nov._dec.".split("_"), weekdaysMin: "do_lu_ma_mé_xo_ve_sá".split("_"), ordinal: function(t) {
        return t + "º";
      }, formats: { LT: "H:mm", LTS: "H:mm:ss", L: "DD/MM/YYYY", LL: "D [de] MMMM [de] YYYY", LLL: "D [de] MMMM [de] YYYY H:mm", LLLL: "dddd, D [de] MMMM [de] YYYY H:mm" }, relativeTime: { future: "en %s", past: "fai %s", s: "uns segundos", m: "un minuto", mm: "%d minutos", h: "unha hora", hh: "%d horas", d: "un día", dd: "%d días", M: "un mes", MM: "%d meses", y: "un ano", yy: "%d anos" } };
      return o.default.locale(s, null, !0), s;
    }));
  })(on)), on.exports;
}
var lb = f2();
const m2 = /* @__PURE__ */ A(lb), p2 = /* @__PURE__ */ q({
  __proto__: null,
  default: m2
}, [lb]);
var sn = { exports: {} }, h2 = sn.exports, P_;
function v2() {
  return P_ || (P_ = 1, (function(e, a) {
    (function(n, r) {
      e.exports = r(P());
    })(h2, (function(n) {
      function r(t) {
        return t && typeof t == "object" && "default" in t ? t : { default: t };
      }
      var o = r(n), s = { name: "gom-latn", weekdays: "Aitar_Somar_Mongllar_Budvar_Brestar_Sukrar_Son'var".split("_"), months: "Janer_Febrer_Mars_Abril_Mai_Jun_Julai_Agost_Setembr_Otubr_Novembr_Dezembr".split("_"), weekStart: 1, weekdaysShort: "Ait._Som._Mon._Bud._Bre._Suk._Son.".split("_"), monthsShort: "Jan._Feb._Mars_Abr._Mai_Jun_Jul._Ago._Set._Otu._Nov._Dez.".split("_"), weekdaysMin: "Ai_Sm_Mo_Bu_Br_Su_Sn".split("_"), ordinal: function(t) {
        return t;
      }, formats: { LT: "A h:mm [vazta]", LTS: "A h:mm:ss [vazta]", L: "DD-MM-YYYY", LL: "D MMMM YYYY", LLL: "D MMMM YYYY A h:mm [vazta]", LLLL: "dddd, MMMM[achea] Do, YYYY, A h:mm [vazta]", llll: "ddd, D MMM YYYY, A h:mm [vazta]" } };
      return o.default.locale(s, null, !0), s;
    }));
  })(sn)), sn.exports;
}
var db = v2();
const y2 = /* @__PURE__ */ A(db), g2 = /* @__PURE__ */ q({
  __proto__: null,
  default: y2
}, [db]);
var un = { exports: {} }, M2 = un.exports, I_;
function b2() {
  return I_ || (I_ = 1, (function(e, a) {
    (function(n, r) {
      e.exports = r(P());
    })(M2, (function(n) {
      function r(t) {
        return t && typeof t == "object" && "default" in t ? t : { default: t };
      }
      var o = r(n), s = { name: "gu", weekdays: "રવિવાર_સોમવાર_મંગળવાર_બુધ્વાર_ગુરુવાર_શુક્રવાર_શનિવાર".split("_"), months: "જાન્યુઆરી_ફેબ્રુઆરી_માર્ચ_એપ્રિલ_મે_જૂન_જુલાઈ_ઑગસ્ટ_સપ્ટેમ્બર_ઑક્ટ્બર_નવેમ્બર_ડિસેમ્બર".split("_"), weekdaysShort: "રવિ_સોમ_મંગળ_બુધ્_ગુરુ_શુક્ર_શનિ".split("_"), monthsShort: "જાન્યુ._ફેબ્રુ._માર્ચ_એપ્રિ._મે_જૂન_જુલા._ઑગ._સપ્ટે._ઑક્ટ્._નવે._ડિસે.".split("_"), weekdaysMin: "ર_સો_મં_બુ_ગુ_શુ_શ".split("_"), ordinal: function(t) {
        return t;
      }, formats: { LT: "A h:mm વાગ્યે", LTS: "A h:mm:ss વાગ્યે", L: "DD/MM/YYYY", LL: "D MMMM YYYY", LLL: "D MMMM YYYY, A h:mm વાગ્યે", LLLL: "dddd, D MMMM YYYY, A h:mm વાગ્યે" }, relativeTime: { future: "%s મા", past: "%s પેહલા", s: "અમુક પળો", m: "એક મિનિટ", mm: "%d મિનિટ", h: "એક કલાક", hh: "%d કલાક", d: "એક દિવસ", dd: "%d દિવસ", M: "એક મહિનો", MM: "%d મહિનો", y: "એક વર્ષ", yy: "%d વર્ષ" } };
      return o.default.locale(s, null, !0), s;
    }));
  })(un)), un.exports;
}
var cb = b2();
const Y2 = /* @__PURE__ */ A(cb), w2 = /* @__PURE__ */ q({
  __proto__: null,
  default: Y2
}, [cb]);
var ln = { exports: {} }, x2 = ln.exports, N_;
function L2() {
  return N_ || (N_ = 1, (function(e, a) {
    (function(n, r) {
      e.exports = r(P());
    })(x2, (function(n) {
      function r(u) {
        return u && typeof u == "object" && "default" in u ? u : { default: u };
      }
      var o = r(n), s = { s: "מספר שניות", ss: "%d שניות", m: "דקה", mm: "%d דקות", h: "שעה", hh: "%d שעות", hh2: "שעתיים", d: "יום", dd: "%d ימים", dd2: "יומיים", M: "חודש", MM: "%d חודשים", MM2: "חודשיים", y: "שנה", yy: "%d שנים", yy2: "שנתיים" };
      function t(u, l, d) {
        return (s[d + (u === 2 ? "2" : "")] || s[d]).replace("%d", u);
      }
      var i = { name: "he", weekdays: "ראשון_שני_שלישי_רביעי_חמישי_שישי_שבת".split("_"), weekdaysShort: "א׳_ב׳_ג׳_ד׳_ה׳_ו׳_ש׳".split("_"), weekdaysMin: "א׳_ב׳_ג׳_ד׳_ה׳_ו_ש׳".split("_"), months: "ינואר_פברואר_מרץ_אפריל_מאי_יוני_יולי_אוגוסט_ספטמבר_אוקטובר_נובמבר_דצמבר".split("_"), monthsShort: "ינו_פבר_מרץ_אפר_מאי_יונ_יול_אוג_ספט_אוק_נוב_דצמ".split("_"), relativeTime: { future: "בעוד %s", past: "לפני %s", s: t, m: t, mm: t, h: t, hh: t, d: t, dd: t, M: t, MM: t, y: t, yy: t }, ordinal: function(u) {
        return u;
      }, format: { LT: "HH:mm", LTS: "HH:mm:ss", L: "DD/MM/YYYY", LL: "D [ב]MMMM YYYY", LLL: "D [ב]MMMM YYYY HH:mm", LLLL: "dddd, D [ב]MMMM YYYY HH:mm", l: "D/M/YYYY", ll: "D MMM YYYY", lll: "D MMM YYYY HH:mm", llll: "ddd, D MMM YYYY HH:mm" }, formats: { LT: "HH:mm", LTS: "HH:mm:ss", L: "DD/MM/YYYY", LL: "D [ב]MMMM YYYY", LLL: "D [ב]MMMM YYYY HH:mm", LLLL: "dddd, D [ב]MMMM YYYY HH:mm", l: "D/M/YYYY", ll: "D MMM YYYY", lll: "D MMM YYYY HH:mm", llll: "ddd, D MMM YYYY HH:mm" } };
      return o.default.locale(i, null, !0), i;
    }));
  })(ln)), ln.exports;
}
var _b = L2();
const k2 = /* @__PURE__ */ A(_b), S2 = /* @__PURE__ */ q({
  __proto__: null,
  default: k2
}, [_b]);
var dn = { exports: {} }, D2 = dn.exports, O_;
function T2() {
  return O_ || (O_ = 1, (function(e, a) {
    (function(n, r) {
      e.exports = r(P());
    })(D2, (function(n) {
      function r(t) {
        return t && typeof t == "object" && "default" in t ? t : { default: t };
      }
      var o = r(n), s = { name: "hi", weekdays: "रविवार_सोमवार_मंगलवार_बुधवार_गुरूवार_शुक्रवार_शनिवार".split("_"), months: "जनवरी_फ़रवरी_मार्च_अप्रैल_मई_जून_जुलाई_अगस्त_सितम्बर_अक्टूबर_नवम्बर_दिसम्बर".split("_"), weekdaysShort: "रवि_सोम_मंगल_बुध_गुरू_शुक्र_शनि".split("_"), monthsShort: "जन._फ़र._मार्च_अप्रै._मई_जून_जुल._अग._सित._अक्टू._नव._दिस.".split("_"), weekdaysMin: "र_सो_मं_बु_गु_शु_श".split("_"), ordinal: function(t) {
        return t;
      }, formats: { LT: "A h:mm बजे", LTS: "A h:mm:ss बजे", L: "DD/MM/YYYY", LL: "D MMMM YYYY", LLL: "D MMMM YYYY, A h:mm बजे", LLLL: "dddd, D MMMM YYYY, A h:mm बजे" }, relativeTime: { future: "%s में", past: "%s पहले", s: "कुछ ही क्षण", m: "एक मिनट", mm: "%d मिनट", h: "एक घंटा", hh: "%d घंटे", d: "एक दिन", dd: "%d दिन", M: "एक महीने", MM: "%d महीने", y: "एक वर्ष", yy: "%d वर्ष" } };
      return o.default.locale(s, null, !0), s;
    }));
  })(dn)), dn.exports;
}
var fb = T2();
const $2 = /* @__PURE__ */ A(fb), H2 = /* @__PURE__ */ q({
  __proto__: null,
  default: $2
}, [fb]);
var cn = { exports: {} }, j2 = cn.exports, z_;
function E2() {
  return z_ || (z_ = 1, (function(e, a) {
    (function(n, r) {
      e.exports = r(P());
    })(j2, (function(n) {
      function r(d) {
        return d && typeof d == "object" && "default" in d ? d : { default: d };
      }
      var o = r(n), s = "siječnja_veljače_ožujka_travnja_svibnja_lipnja_srpnja_kolovoza_rujna_listopada_studenoga_prosinca".split("_"), t = "siječanj_veljača_ožujak_travanj_svibanj_lipanj_srpanj_kolovoz_rujan_listopad_studeni_prosinac".split("_"), i = /D[oD]?(\[[^[\]]*\]|\s)+MMMM?/, u = function(d, c) {
        return i.test(c) ? s[d.month()] : t[d.month()];
      };
      u.s = t, u.f = s;
      var l = { name: "hr", weekdays: "nedjelja_ponedjeljak_utorak_srijeda_četvrtak_petak_subota".split("_"), weekdaysShort: "ned._pon._uto._sri._čet._pet._sub.".split("_"), weekdaysMin: "ne_po_ut_sr_če_pe_su".split("_"), months: u, monthsShort: "sij._velj._ožu._tra._svi._lip._srp._kol._ruj._lis._stu._pro.".split("_"), weekStart: 1, formats: { LT: "H:mm", LTS: "H:mm:ss", L: "DD.MM.YYYY", LL: "D. MMMM YYYY", LLL: "D. MMMM YYYY H:mm", LLLL: "dddd, D. MMMM YYYY H:mm" }, relativeTime: { future: "za %s", past: "prije %s", s: "sekunda", m: "minuta", mm: "%d minuta", h: "sat", hh: "%d sati", d: "dan", dd: "%d dana", M: "mjesec", MM: "%d mjeseci", y: "godina", yy: "%d godine" }, ordinal: function(d) {
        return d + ".";
      } };
      return o.default.locale(l, null, !0), l;
    }));
  })(cn)), cn.exports;
}
var mb = E2();
const C2 = /* @__PURE__ */ A(mb), q2 = /* @__PURE__ */ q({
  __proto__: null,
  default: C2
}, [mb]);
var _n = { exports: {} }, A2 = _n.exports, F_;
function R2() {
  return F_ || (F_ = 1, (function(e, a) {
    (function(n, r) {
      e.exports = r(P());
    })(A2, (function(n) {
      function r(t) {
        return t && typeof t == "object" && "default" in t ? t : { default: t };
      }
      var o = r(n), s = { name: "ht", weekdays: "dimanch_lendi_madi_mèkredi_jedi_vandredi_samdi".split("_"), months: "janvye_fevriye_mas_avril_me_jen_jiyè_out_septanm_oktòb_novanm_desanm".split("_"), weekdaysShort: "dim._len._mad._mèk._jed._van._sam.".split("_"), monthsShort: "jan._fev._mas_avr._me_jen_jiyè._out_sept._okt._nov._des.".split("_"), weekdaysMin: "di_le_ma_mè_je_va_sa".split("_"), ordinal: function(t) {
        return t;
      }, formats: { LT: "HH:mm", LTS: "HH:mm:ss", L: "DD/MM/YYYY", LL: "D MMMM YYYY", LLL: "D MMMM YYYY HH:mm", LLLL: "dddd D MMMM YYYY HH:mm" }, relativeTime: { future: "nan %s", past: "sa gen %s", s: "kèk segond", m: "yon minit", mm: "%d minit", h: "inèdtan", hh: "%d zè", d: "yon jou", dd: "%d jou", M: "yon mwa", MM: "%d mwa", y: "yon ane", yy: "%d ane" } };
      return o.default.locale(s, null, !0), s;
    }));
  })(_n)), _n.exports;
}
var pb = R2();
const P2 = /* @__PURE__ */ A(pb), I2 = /* @__PURE__ */ q({
  __proto__: null,
  default: P2
}, [pb]);
var fn = { exports: {} }, N2 = fn.exports, B_;
function O2() {
  return B_ || (B_ = 1, (function(e, a) {
    (function(n, r) {
      e.exports = r(P());
    })(N2, (function(n) {
      function r(t) {
        return t && typeof t == "object" && "default" in t ? t : { default: t };
      }
      var o = r(n), s = { name: "hu", weekdays: "vasárnap_hétfő_kedd_szerda_csütörtök_péntek_szombat".split("_"), weekdaysShort: "vas_hét_kedd_sze_csüt_pén_szo".split("_"), weekdaysMin: "v_h_k_sze_cs_p_szo".split("_"), months: "január_február_március_április_május_június_július_augusztus_szeptember_október_november_december".split("_"), monthsShort: "jan_feb_márc_ápr_máj_jún_júl_aug_szept_okt_nov_dec".split("_"), ordinal: function(t) {
        return t + ".";
      }, weekStart: 1, relativeTime: { future: "%s múlva", past: "%s", s: function(t, i, u, l) {
        return "néhány másodperc" + (l || i ? "" : "e");
      }, m: function(t, i, u, l) {
        return "egy perc" + (l || i ? "" : "e");
      }, mm: function(t, i, u, l) {
        return t + " perc" + (l || i ? "" : "e");
      }, h: function(t, i, u, l) {
        return "egy " + (l || i ? "óra" : "órája");
      }, hh: function(t, i, u, l) {
        return t + " " + (l || i ? "óra" : "órája");
      }, d: function(t, i, u, l) {
        return "egy " + (l || i ? "nap" : "napja");
      }, dd: function(t, i, u, l) {
        return t + " " + (l || i ? "nap" : "napja");
      }, M: function(t, i, u, l) {
        return "egy " + (l || i ? "hónap" : "hónapja");
      }, MM: function(t, i, u, l) {
        return t + " " + (l || i ? "hónap" : "hónapja");
      }, y: function(t, i, u, l) {
        return "egy " + (l || i ? "év" : "éve");
      }, yy: function(t, i, u, l) {
        return t + " " + (l || i ? "év" : "éve");
      } }, formats: { LT: "H:mm", LTS: "H:mm:ss", L: "YYYY.MM.DD.", LL: "YYYY. MMMM D.", LLL: "YYYY. MMMM D. H:mm", LLLL: "YYYY. MMMM D., dddd H:mm" } };
      return o.default.locale(s, null, !0), s;
    }));
  })(fn)), fn.exports;
}
var hb = O2();
const z2 = /* @__PURE__ */ A(hb), F2 = /* @__PURE__ */ q({
  __proto__: null,
  default: z2
}, [hb]);
var mn = { exports: {} }, B2 = mn.exports, G_;
function G2() {
  return G_ || (G_ = 1, (function(e, a) {
    (function(n, r) {
      e.exports = r(P());
    })(B2, (function(n) {
      function r(t) {
        return t && typeof t == "object" && "default" in t ? t : { default: t };
      }
      var o = r(n), s = { name: "hy-am", weekdays: "կիրակի_երկուշաբթի_երեքշաբթի_չորեքշաբթի_հինգշաբթի_ուրբաթ_շաբաթ".split("_"), months: "հունվարի_փետրվարի_մարտի_ապրիլի_մայիսի_հունիսի_հուլիսի_օգոստոսի_սեպտեմբերի_հոկտեմբերի_նոյեմբերի_դեկտեմբերի".split("_"), weekStart: 1, weekdaysShort: "կրկ_երկ_երք_չրք_հնգ_ուրբ_շբթ".split("_"), monthsShort: "հնվ_փտր_մրտ_ապր_մյս_հնս_հլս_օգս_սպտ_հկտ_նմբ_դկտ".split("_"), weekdaysMin: "կրկ_երկ_երք_չրք_հնգ_ուրբ_շբթ".split("_"), ordinal: function(t) {
        return t;
      }, formats: { LT: "HH:mm", LTS: "HH:mm:ss", L: "DD.MM.YYYY", LL: "D MMMM YYYY թ.", LLL: "D MMMM YYYY թ., HH:mm", LLLL: "dddd, D MMMM YYYY թ., HH:mm" }, relativeTime: { future: "%s հետո", past: "%s առաջ", s: "մի քանի վայրկյան", m: "րոպե", mm: "%d րոպե", h: "ժամ", hh: "%d ժամ", d: "օր", dd: "%d օր", M: "ամիս", MM: "%d ամիս", y: "տարի", yy: "%d տարի" } };
      return o.default.locale(s, null, !0), s;
    }));
  })(mn)), mn.exports;
}
var vb = G2();
const J2 = /* @__PURE__ */ A(vb), U2 = /* @__PURE__ */ q({
  __proto__: null,
  default: J2
}, [vb]);
var pn = { exports: {} }, W2 = pn.exports, J_;
function V2() {
  return J_ || (J_ = 1, (function(e, a) {
    (function(n, r) {
      e.exports = r(P());
    })(W2, (function(n) {
      function r(t) {
        return t && typeof t == "object" && "default" in t ? t : { default: t };
      }
      var o = r(n), s = { name: "id", weekdays: "Minggu_Senin_Selasa_Rabu_Kamis_Jumat_Sabtu".split("_"), months: "Januari_Februari_Maret_April_Mei_Juni_Juli_Agustus_September_Oktober_November_Desember".split("_"), weekdaysShort: "Min_Sen_Sel_Rab_Kam_Jum_Sab".split("_"), monthsShort: "Jan_Feb_Mar_Apr_Mei_Jun_Jul_Agt_Sep_Okt_Nov_Des".split("_"), weekdaysMin: "Mg_Sn_Sl_Rb_Km_Jm_Sb".split("_"), weekStart: 1, formats: { LT: "HH.mm", LTS: "HH.mm.ss", L: "DD/MM/YYYY", LL: "D MMMM YYYY", LLL: "D MMMM YYYY [pukul] HH.mm", LLLL: "dddd, D MMMM YYYY [pukul] HH.mm" }, relativeTime: { future: "dalam %s", past: "%s yang lalu", s: "beberapa detik", m: "semenit", mm: "%d menit", h: "sejam", hh: "%d jam", d: "sehari", dd: "%d hari", M: "sebulan", MM: "%d bulan", y: "setahun", yy: "%d tahun" }, ordinal: function(t) {
        return t + ".";
      } };
      return o.default.locale(s, null, !0), s;
    }));
  })(pn)), pn.exports;
}
var yb = V2();
const K2 = /* @__PURE__ */ A(yb), X2 = /* @__PURE__ */ q({
  __proto__: null,
  default: K2
}, [yb]);
var hn = { exports: {} }, Z2 = hn.exports, U_;
function Q2() {
  return U_ || (U_ = 1, (function(e, a) {
    (function(n, r) {
      e.exports = r(P());
    })(Z2, (function(n) {
      function r(u) {
        return u && typeof u == "object" && "default" in u ? u : { default: u };
      }
      var o = r(n), s = { s: ["nokkrar sekúndur", "nokkrar sekúndur", "nokkrum sekúndum"], m: ["mínúta", "mínútu", "mínútu"], mm: ["mínútur", "mínútur", "mínútum"], h: ["klukkustund", "klukkustund", "klukkustund"], hh: ["klukkustundir", "klukkustundir", "klukkustundum"], d: ["dagur", "dag", "degi"], dd: ["dagar", "daga", "dögum"], M: ["mánuður", "mánuð", "mánuði"], MM: ["mánuðir", "mánuði", "mánuðum"], y: ["ár", "ár", "ári"], yy: ["ár", "ár", "árum"] };
      function t(u, l, d, c) {
        var _ = (function(f, m, h, y) {
          var p = y ? 0 : h ? 1 : 2, v = f.length === 2 && m % 10 == 1 ? f[0] : f, g = s[v][p];
          return f.length === 1 ? g : "%d " + g;
        })(d, u, c, l);
        return _.replace("%d", u);
      }
      var i = { name: "is", weekdays: "sunnudagur_mánudagur_þriðjudagur_miðvikudagur_fimmtudagur_föstudagur_laugardagur".split("_"), months: "janúar_febrúar_mars_apríl_maí_júní_júlí_ágúst_september_október_nóvember_desember".split("_"), weekStart: 1, weekdaysShort: "sun_mán_þri_mið_fim_fös_lau".split("_"), monthsShort: "jan_feb_mar_apr_maí_jún_júl_ágú_sep_okt_nóv_des".split("_"), weekdaysMin: "Su_Má_Þr_Mi_Fi_Fö_La".split("_"), ordinal: function(u) {
        return u;
      }, formats: { LT: "H:mm", LTS: "H:mm:ss", L: "DD.MM.YYYY", LL: "D. MMMM YYYY", LLL: "D. MMMM YYYY [kl.] H:mm", LLLL: "dddd, D. MMMM YYYY [kl.] H:mm" }, relativeTime: { future: "eftir %s", past: "fyrir %s síðan", s: t, m: t, mm: t, h: t, hh: t, d: t, dd: t, M: t, MM: t, y: t, yy: t } };
      return o.default.locale(i, null, !0), i;
    }));
  })(hn)), hn.exports;
}
var gb = Q2();
const eC = /* @__PURE__ */ A(gb), tC = /* @__PURE__ */ q({
  __proto__: null,
  default: eC
}, [gb]);
var vn = { exports: {} }, rC = vn.exports, W_;
function nC() {
  return W_ || (W_ = 1, (function(e, a) {
    (function(n, r) {
      e.exports = r(P());
    })(rC, (function(n) {
      function r(t) {
        return t && typeof t == "object" && "default" in t ? t : { default: t };
      }
      var o = r(n), s = { name: "it-ch", weekdays: "domenica_lunedì_martedì_mercoledì_giovedì_venerdì_sabato".split("_"), months: "gennaio_febbraio_marzo_aprile_maggio_giugno_luglio_agosto_settembre_ottobre_novembre_dicembre".split("_"), weekStart: 1, weekdaysShort: "dom_lun_mar_mer_gio_ven_sab".split("_"), monthsShort: "gen_feb_mar_apr_mag_giu_lug_ago_set_ott_nov_dic".split("_"), weekdaysMin: "do_lu_ma_me_gi_ve_sa".split("_"), ordinal: function(t) {
        return t;
      }, formats: { LT: "HH:mm", LTS: "HH:mm:ss", L: "DD.MM.YYYY", LL: "D MMMM YYYY", LLL: "D MMMM YYYY HH:mm", LLLL: "dddd D MMMM YYYY HH:mm" }, relativeTime: { future: "tra %s", past: "%s fa", s: "alcuni secondi", m: "un minuto", mm: "%d minuti", h: "un'ora", hh: "%d ore", d: "un giorno", dd: "%d giorni", M: "un mese", MM: "%d mesi", y: "un anno", yy: "%d anni" } };
      return o.default.locale(s, null, !0), s;
    }));
  })(vn)), vn.exports;
}
var Mb = nC();
const aC = /* @__PURE__ */ A(Mb), oC = /* @__PURE__ */ q({
  __proto__: null,
  default: aC
}, [Mb]);
var yn = { exports: {} }, sC = yn.exports, V_;
function iC() {
  return V_ || (V_ = 1, (function(e, a) {
    (function(n, r) {
      e.exports = r(P());
    })(sC, (function(n) {
      function r(t) {
        return t && typeof t == "object" && "default" in t ? t : { default: t };
      }
      var o = r(n), s = { name: "it", weekdays: "domenica_lunedì_martedì_mercoledì_giovedì_venerdì_sabato".split("_"), weekdaysShort: "dom_lun_mar_mer_gio_ven_sab".split("_"), weekdaysMin: "do_lu_ma_me_gi_ve_sa".split("_"), months: "gennaio_febbraio_marzo_aprile_maggio_giugno_luglio_agosto_settembre_ottobre_novembre_dicembre".split("_"), weekStart: 1, monthsShort: "gen_feb_mar_apr_mag_giu_lug_ago_set_ott_nov_dic".split("_"), formats: { LT: "HH:mm", LTS: "HH:mm:ss", L: "DD/MM/YYYY", LL: "D MMMM YYYY", LLL: "D MMMM YYYY HH:mm", LLLL: "dddd D MMMM YYYY HH:mm" }, relativeTime: { future: "tra %s", past: "%s fa", s: "qualche secondo", m: "un minuto", mm: "%d minuti", h: "un'ora", hh: "%d ore", d: "un giorno", dd: "%d giorni", M: "un mese", MM: "%d mesi", y: "un anno", yy: "%d anni" }, ordinal: function(t) {
        return t + "º";
      } };
      return o.default.locale(s, null, !0), s;
    }));
  })(yn)), yn.exports;
}
var bb = iC();
const uC = /* @__PURE__ */ A(bb), lC = /* @__PURE__ */ q({
  __proto__: null,
  default: uC
}, [bb]);
var gn = { exports: {} }, dC = gn.exports, K_;
function cC() {
  return K_ || (K_ = 1, (function(e, a) {
    (function(n, r) {
      e.exports = r(P());
    })(dC, (function(n) {
      function r(t) {
        return t && typeof t == "object" && "default" in t ? t : { default: t };
      }
      var o = r(n), s = { name: "ja", weekdays: "日曜日_月曜日_火曜日_水曜日_木曜日_金曜日_土曜日".split("_"), weekdaysShort: "日_月_火_水_木_金_土".split("_"), weekdaysMin: "日_月_火_水_木_金_土".split("_"), months: "1月_2月_3月_4月_5月_6月_7月_8月_9月_10月_11月_12月".split("_"), monthsShort: "1月_2月_3月_4月_5月_6月_7月_8月_9月_10月_11月_12月".split("_"), ordinal: function(t) {
        return t + "日";
      }, formats: { LT: "HH:mm", LTS: "HH:mm:ss", L: "YYYY/MM/DD", LL: "YYYY年M月D日", LLL: "YYYY年M月D日 HH:mm", LLLL: "YYYY年M月D日 dddd HH:mm", l: "YYYY/MM/DD", ll: "YYYY年M月D日", lll: "YYYY年M月D日 HH:mm", llll: "YYYY年M月D日(ddd) HH:mm" }, meridiem: function(t) {
        return t < 12 ? "午前" : "午後";
      }, relativeTime: { future: "%s後", past: "%s前", s: "数秒", m: "1分", mm: "%d分", h: "1時間", hh: "%d時間", d: "1日", dd: "%d日", M: "1ヶ月", MM: "%dヶ月", y: "1年", yy: "%d年" } };
      return o.default.locale(s, null, !0), s;
    }));
  })(gn)), gn.exports;
}
var Yb = cC();
const _C = /* @__PURE__ */ A(Yb), fC = /* @__PURE__ */ q({
  __proto__: null,
  default: _C
}, [Yb]);
var Mn = { exports: {} }, mC = Mn.exports, X_;
function pC() {
  return X_ || (X_ = 1, (function(e, a) {
    (function(n, r) {
      e.exports = r(P());
    })(mC, (function(n) {
      function r(t) {
        return t && typeof t == "object" && "default" in t ? t : { default: t };
      }
      var o = r(n), s = { name: "jv", weekdays: "Minggu_Senen_Seloso_Rebu_Kemis_Jemuwah_Septu".split("_"), months: "Januari_Februari_Maret_April_Mei_Juni_Juli_Agustus_September_Oktober_Nopember_Desember".split("_"), weekStart: 1, weekdaysShort: "Min_Sen_Sel_Reb_Kem_Jem_Sep".split("_"), monthsShort: "Jan_Feb_Mar_Apr_Mei_Jun_Jul_Ags_Sep_Okt_Nop_Des".split("_"), weekdaysMin: "Mg_Sn_Sl_Rb_Km_Jm_Sp".split("_"), ordinal: function(t) {
        return t;
      }, formats: { LT: "HH.mm", LTS: "HH.mm.ss", L: "DD/MM/YYYY", LL: "D MMMM YYYY", LLL: "D MMMM YYYY [pukul] HH.mm", LLLL: "dddd, D MMMM YYYY [pukul] HH.mm" }, relativeTime: { future: "wonten ing %s", past: "%s ingkang kepengker", s: "sawetawis detik", m: "setunggal menit", mm: "%d menit", h: "setunggal jam", hh: "%d jam", d: "sedinten", dd: "%d dinten", M: "sewulan", MM: "%d wulan", y: "setaun", yy: "%d taun" } };
      return o.default.locale(s, null, !0), s;
    }));
  })(Mn)), Mn.exports;
}
var wb = pC();
const hC = /* @__PURE__ */ A(wb), vC = /* @__PURE__ */ q({
  __proto__: null,
  default: hC
}, [wb]);
var bn = { exports: {} }, yC = bn.exports, Z_;
function gC() {
  return Z_ || (Z_ = 1, (function(e, a) {
    (function(n, r) {
      e.exports = r(P());
    })(yC, (function(n) {
      function r(t) {
        return t && typeof t == "object" && "default" in t ? t : { default: t };
      }
      var o = r(n), s = { name: "ka", weekdays: "კვირა_ორშაბათი_სამშაბათი_ოთხშაბათი_ხუთშაბათი_პარასკევი_შაბათი".split("_"), weekdaysShort: "კვი_ორშ_სამ_ოთხ_ხუთ_პარ_შაბ".split("_"), weekdaysMin: "კვ_ორ_სა_ოთ_ხუ_პა_შა".split("_"), months: "იანვარი_თებერვალი_მარტი_აპრილი_მაისი_ივნისი_ივლისი_აგვისტო_სექტემბერი_ოქტომბერი_ნოემბერი_დეკემბერი".split("_"), monthsShort: "იან_თებ_მარ_აპრ_მაი_ივნ_ივლ_აგვ_სექ_ოქტ_ნოე_დეკ".split("_"), weekStart: 1, formats: { LT: "h:mm A", LTS: "h:mm:ss A", L: "DD/MM/YYYY", LL: "D MMMM YYYY", LLL: "D MMMM YYYY h:mm A", LLLL: "dddd, D MMMM YYYY h:mm A" }, relativeTime: { future: "%s შემდეგ", past: "%s წინ", s: "წამი", m: "წუთი", mm: "%d წუთი", h: "საათი", hh: "%d საათის", d: "დღეს", dd: "%d დღის განმავლობაში", M: "თვის", MM: "%d თვის", y: "წელი", yy: "%d წლის" }, ordinal: function(t) {
        return t;
      } };
      return o.default.locale(s, null, !0), s;
    }));
  })(bn)), bn.exports;
}
var xb = gC();
const MC = /* @__PURE__ */ A(xb), bC = /* @__PURE__ */ q({
  __proto__: null,
  default: MC
}, [xb]);
var Yn = { exports: {} }, YC = Yn.exports, Q_;
function wC() {
  return Q_ || (Q_ = 1, (function(e, a) {
    (function(n, r) {
      e.exports = r(P());
    })(YC, (function(n) {
      function r(t) {
        return t && typeof t == "object" && "default" in t ? t : { default: t };
      }
      var o = r(n), s = { name: "kk", weekdays: "жексенбі_дүйсенбі_сейсенбі_сәрсенбі_бейсенбі_жұма_сенбі".split("_"), weekdaysShort: "жек_дүй_сей_сәр_бей_жұм_сен".split("_"), weekdaysMin: "жк_дй_сй_ср_бй_жм_сн".split("_"), months: "қаңтар_ақпан_наурыз_сәуір_мамыр_маусым_шілде_тамыз_қыркүйек_қазан_қараша_желтоқсан".split("_"), monthsShort: "қаң_ақп_нау_сәу_мам_мау_шіл_там_қыр_қаз_қар_жел".split("_"), weekStart: 1, relativeTime: { future: "%s ішінде", past: "%s бұрын", s: "бірнеше секунд", m: "бір минут", mm: "%d минут", h: "бір сағат", hh: "%d сағат", d: "бір күн", dd: "%d күн", M: "бір ай", MM: "%d ай", y: "бір жыл", yy: "%d жыл" }, ordinal: function(t) {
        return t;
      }, formats: { LT: "HH:mm", LTS: "HH:mm:ss", L: "DD.MM.YYYY", LL: "D MMMM YYYY", LLL: "D MMMM YYYY HH:mm", LLLL: "dddd, D MMMM YYYY HH:mm" } };
      return o.default.locale(s, null, !0), s;
    }));
  })(Yn)), Yn.exports;
}
var Lb = wC();
const xC = /* @__PURE__ */ A(Lb), LC = /* @__PURE__ */ q({
  __proto__: null,
  default: xC
}, [Lb]);
var wn = { exports: {} }, kC = wn.exports, ef;
function SC() {
  return ef || (ef = 1, (function(e, a) {
    (function(n, r) {
      e.exports = r(P());
    })(kC, (function(n) {
      function r(t) {
        return t && typeof t == "object" && "default" in t ? t : { default: t };
      }
      var o = r(n), s = { name: "km", weekdays: "អាទិត្យ_ច័ន្ទ_អង្គារ_ពុធ_ព្រហស្បតិ៍_សុក្រ_សៅរ៍".split("_"), months: "មករា_កុម្ភៈ_មីនា_មេសា_ឧសភា_មិថុនា_កក្កដា_សីហា_កញ្ញា_តុលា_វិច្ឆិកា_ធ្នូ".split("_"), weekStart: 1, weekdaysShort: "អា_ច_អ_ព_ព្រ_សុ_ស".split("_"), monthsShort: "មករា_កុម្ភៈ_មីនា_មេសា_ឧសភា_មិថុនា_កក្កដា_សីហា_កញ្ញា_តុលា_វិច្ឆិកា_ធ្នូ".split("_"), weekdaysMin: "អា_ច_អ_ព_ព្រ_សុ_ស".split("_"), ordinal: function(t) {
        return t;
      }, formats: { LT: "HH:mm", LTS: "HH:mm:ss", L: "DD/MM/YYYY", LL: "D MMMM YYYY", LLL: "D MMMM YYYY HH:mm", LLLL: "dddd, D MMMM YYYY HH:mm" }, relativeTime: { future: "%sទៀត", past: "%sមុន", s: "ប៉ុន្មានវិនាទី", m: "មួយនាទី", mm: "%d នាទី", h: "មួយម៉ោង", hh: "%d ម៉ោង", d: "មួយថ្ងៃ", dd: "%d ថ្ងៃ", M: "មួយខែ", MM: "%d ខែ", y: "មួយឆ្នាំ", yy: "%d ឆ្នាំ" } };
      return o.default.locale(s, null, !0), s;
    }));
  })(wn)), wn.exports;
}
var kb = SC();
const DC = /* @__PURE__ */ A(kb), TC = /* @__PURE__ */ q({
  __proto__: null,
  default: DC
}, [kb]);
var xn = { exports: {} }, $C = xn.exports, tf;
function HC() {
  return tf || (tf = 1, (function(e, a) {
    (function(n, r) {
      e.exports = r(P());
    })($C, (function(n) {
      function r(t) {
        return t && typeof t == "object" && "default" in t ? t : { default: t };
      }
      var o = r(n), s = { name: "kn", weekdays: "ಭಾನುವಾರ_ಸೋಮವಾರ_ಮಂಗಳವಾರ_ಬುಧವಾರ_ಗುರುವಾರ_ಶುಕ್ರವಾರ_ಶನಿವಾರ".split("_"), months: "ಜನವರಿ_ಫೆಬ್ರವರಿ_ಮಾರ್ಚ್_ಏಪ್ರಿಲ್_ಮೇ_ಜೂನ್_ಜುಲೈ_ಆಗಸ್ಟ್_ಸೆಪ್ಟೆಂಬರ್_ಅಕ್ಟೋಬರ್_ನವೆಂಬರ್_ಡಿಸೆಂಬರ್".split("_"), weekdaysShort: "ಭಾನು_ಸೋಮ_ಮಂಗಳ_ಬುಧ_ಗುರು_ಶುಕ್ರ_ಶನಿ".split("_"), monthsShort: "ಜನ_ಫೆಬ್ರ_ಮಾರ್ಚ್_ಏಪ್ರಿಲ್_ಮೇ_ಜೂನ್_ಜುಲೈ_ಆಗಸ್ಟ್_ಸೆಪ್ಟೆಂ_ಅಕ್ಟೋ_ನವೆಂ_ಡಿಸೆಂ".split("_"), weekdaysMin: "ಭಾ_ಸೋ_ಮಂ_ಬು_ಗು_ಶು_ಶ".split("_"), ordinal: function(t) {
        return t;
      }, formats: { LT: "A h:mm", LTS: "A h:mm:ss", L: "DD/MM/YYYY", LL: "D MMMM YYYY", LLL: "D MMMM YYYY, A h:mm", LLLL: "dddd, D MMMM YYYY, A h:mm" }, relativeTime: { future: "%s ನಂತರ", past: "%s ಹಿಂದೆ", s: "ಕೆಲವು ಕ್ಷಣಗಳು", m: "ಒಂದು ನಿಮಿಷ", mm: "%d ನಿಮಿಷ", h: "ಒಂದು ಗಂಟೆ", hh: "%d ಗಂಟೆ", d: "ಒಂದು ದಿನ", dd: "%d ದಿನ", M: "ಒಂದು ತಿಂಗಳು", MM: "%d ತಿಂಗಳು", y: "ಒಂದು ವರ್ಷ", yy: "%d ವರ್ಷ" } };
      return o.default.locale(s, null, !0), s;
    }));
  })(xn)), xn.exports;
}
var Sb = HC();
const jC = /* @__PURE__ */ A(Sb), EC = /* @__PURE__ */ q({
  __proto__: null,
  default: jC
}, [Sb]);
var Ln = { exports: {} }, CC = Ln.exports, rf;
function qC() {
  return rf || (rf = 1, (function(e, a) {
    (function(n, r) {
      e.exports = r(P());
    })(CC, (function(n) {
      function r(t) {
        return t && typeof t == "object" && "default" in t ? t : { default: t };
      }
      var o = r(n), s = { name: "ko", weekdays: "일요일_월요일_화요일_수요일_목요일_금요일_토요일".split("_"), weekdaysShort: "일_월_화_수_목_금_토".split("_"), weekdaysMin: "일_월_화_수_목_금_토".split("_"), months: "1월_2월_3월_4월_5월_6월_7월_8월_9월_10월_11월_12월".split("_"), monthsShort: "1월_2월_3월_4월_5월_6월_7월_8월_9월_10월_11월_12월".split("_"), ordinal: function(t) {
        return t + "일";
      }, formats: { LT: "A h:mm", LTS: "A h:mm:ss", L: "YYYY.MM.DD.", LL: "YYYY년 MMMM D일", LLL: "YYYY년 MMMM D일 A h:mm", LLLL: "YYYY년 MMMM D일 dddd A h:mm", l: "YYYY.MM.DD.", ll: "YYYY년 MMMM D일", lll: "YYYY년 MMMM D일 A h:mm", llll: "YYYY년 MMMM D일 dddd A h:mm" }, meridiem: function(t) {
        return t < 12 ? "오전" : "오후";
      }, relativeTime: { future: "%s 후", past: "%s 전", s: "몇 초", m: "1분", mm: "%d분", h: "한 시간", hh: "%d시간", d: "하루", dd: "%d일", M: "한 달", MM: "%d달", y: "일 년", yy: "%d년" } };
      return o.default.locale(s, null, !0), s;
    }));
  })(Ln)), Ln.exports;
}
var Db = qC();
const AC = /* @__PURE__ */ A(Db), RC = /* @__PURE__ */ q({
  __proto__: null,
  default: AC
}, [Db]);
var kt = { exports: {} }, PC = kt.exports, nf;
function IC() {
  return nf || (nf = 1, (function(e, a) {
    (function(n, r) {
      r(a, P());
    })(PC, (function(n, r) {
      function o(d) {
        return d && typeof d == "object" && "default" in d ? d : { default: d };
      }
      var s = o(r), t = { 1: "١", 2: "٢", 3: "٣", 4: "٤", 5: "٥", 6: "٦", 7: "٧", 8: "٨", 9: "٩", 0: "٠" }, i = { "١": "1", "٢": "2", "٣": "3", "٤": "4", "٥": "5", "٦": "6", "٧": "7", "٨": "8", "٩": "9", "٠": "0" }, u = ["کانوونی دووەم", "شوبات", "ئادار", "نیسان", "ئایار", "حوزەیران", "تەممووز", "ئاب", "ئەیلوول", "تشرینی یەکەم", "تشرینی دووەم", "کانوونی یەکەم"], l = { name: "ku", months: u, monthsShort: u, weekdays: "یەکشەممە_دووشەممە_سێشەممە_چوارشەممە_پێنجشەممە_هەینی_شەممە".split("_"), weekdaysShort: "یەکشەم_دووشەم_سێشەم_چوارشەم_پێنجشەم_هەینی_شەممە".split("_"), weekStart: 6, weekdaysMin: "ی_د_س_چ_پ_هـ_ش".split("_"), preparse: function(d) {
        return d.replace(/[١٢٣٤٥٦٧٨٩٠]/g, (function(c) {
          return i[c];
        })).replace(/،/g, ",");
      }, postformat: function(d) {
        return d.replace(/\d/g, (function(c) {
          return t[c];
        })).replace(/,/g, "،");
      }, ordinal: function(d) {
        return d;
      }, formats: { LT: "HH:mm", LTS: "HH:mm:ss", L: "DD/MM/YYYY", LL: "D MMMM YYYY", LLL: "D MMMM YYYY HH:mm", LLLL: "dddd, D MMMM YYYY HH:mm" }, meridiem: function(d) {
        return d < 12 ? "پ.ن" : "د.ن";
      }, relativeTime: { future: "لە %s", past: "لەمەوپێش %s", s: "چەند چرکەیەک", m: "یەک خولەک", mm: "%d خولەک", h: "یەک کاتژمێر", hh: "%d کاتژمێر", d: "یەک ڕۆژ", dd: "%d ڕۆژ", M: "یەک مانگ", MM: "%d مانگ", y: "یەک ساڵ", yy: "%d ساڵ" } };
      s.default.locale(l, null, !0), n.default = l, n.englishToArabicNumbersMap = t, Object.defineProperty(n, "__esModule", { value: !0 });
    }));
  })(kt, kt.exports)), kt.exports;
}
var Tb = IC();
const NC = /* @__PURE__ */ A(Tb), OC = /* @__PURE__ */ q({
  __proto__: null,
  default: NC
}, [Tb]);
var kn = { exports: {} }, zC = kn.exports, af;
function FC() {
  return af || (af = 1, (function(e, a) {
    (function(n, r) {
      e.exports = r(P());
    })(zC, (function(n) {
      function r(t) {
        return t && typeof t == "object" && "default" in t ? t : { default: t };
      }
      var o = r(n), s = { name: "ky", weekdays: "Жекшемби_Дүйшөмбү_Шейшемби_Шаршемби_Бейшемби_Жума_Ишемби".split("_"), months: "январь_февраль_март_апрель_май_июнь_июль_август_сентябрь_октябрь_ноябрь_декабрь".split("_"), weekStart: 1, weekdaysShort: "Жек_Дүй_Шей_Шар_Бей_Жум_Ише".split("_"), monthsShort: "янв_фев_март_апр_май_июнь_июль_авг_сен_окт_ноя_дек".split("_"), weekdaysMin: "Жк_Дй_Шй_Шр_Бй_Жм_Иш".split("_"), ordinal: function(t) {
        return t;
      }, formats: { LT: "HH:mm", LTS: "HH:mm:ss", L: "DD.MM.YYYY", LL: "D MMMM YYYY", LLL: "D MMMM YYYY HH:mm", LLLL: "dddd, D MMMM YYYY HH:mm" }, relativeTime: { future: "%s ичинде", past: "%s мурун", s: "бирнече секунд", m: "бир мүнөт", mm: "%d мүнөт", h: "бир саат", hh: "%d саат", d: "бир күн", dd: "%d күн", M: "бир ай", MM: "%d ай", y: "бир жыл", yy: "%d жыл" } };
      return o.default.locale(s, null, !0), s;
    }));
  })(kn)), kn.exports;
}
var $b = FC();
const BC = /* @__PURE__ */ A($b), GC = /* @__PURE__ */ q({
  __proto__: null,
  default: BC
}, [$b]);
var Sn = { exports: {} }, JC = Sn.exports, of;
function UC() {
  return of || (of = 1, (function(e, a) {
    (function(n, r) {
      e.exports = r(P());
    })(JC, (function(n) {
      function r(t) {
        return t && typeof t == "object" && "default" in t ? t : { default: t };
      }
      var o = r(n), s = { name: "lb", weekdays: "Sonndeg_Méindeg_Dënschdeg_Mëttwoch_Donneschdeg_Freideg_Samschdeg".split("_"), months: "Januar_Februar_Mäerz_Abrëll_Mee_Juni_Juli_August_September_Oktober_November_Dezember".split("_"), weekStart: 1, weekdaysShort: "So._Mé._Dë._Më._Do._Fr._Sa.".split("_"), monthsShort: "Jan._Febr._Mrz._Abr._Mee_Jun._Jul._Aug._Sept._Okt._Nov._Dez.".split("_"), weekdaysMin: "So_Mé_Dë_Më_Do_Fr_Sa".split("_"), ordinal: function(t) {
        return t;
      }, formats: { LT: "H:mm [Auer]", LTS: "H:mm:ss [Auer]", L: "DD.MM.YYYY", LL: "D. MMMM YYYY", LLL: "D. MMMM YYYY H:mm [Auer]", LLLL: "dddd, D. MMMM YYYY H:mm [Auer]" } };
      return o.default.locale(s, null, !0), s;
    }));
  })(Sn)), Sn.exports;
}
var Hb = UC();
const WC = /* @__PURE__ */ A(Hb), VC = /* @__PURE__ */ q({
  __proto__: null,
  default: WC
}, [Hb]);
var Dn = { exports: {} }, KC = Dn.exports, sf;
function XC() {
  return sf || (sf = 1, (function(e, a) {
    (function(n, r) {
      e.exports = r(P());
    })(KC, (function(n) {
      function r(t) {
        return t && typeof t == "object" && "default" in t ? t : { default: t };
      }
      var o = r(n), s = { name: "lo", weekdays: "ອາທິດ_ຈັນ_ອັງຄານ_ພຸດ_ພະຫັດ_ສຸກ_ເສົາ".split("_"), months: "ມັງກອນ_ກຸມພາ_ມີນາ_ເມສາ_ພຶດສະພາ_ມິຖຸນາ_ກໍລະກົດ_ສິງຫາ_ກັນຍາ_ຕຸລາ_ພະຈິກ_ທັນວາ".split("_"), weekdaysShort: "ທິດ_ຈັນ_ອັງຄານ_ພຸດ_ພະຫັດ_ສຸກ_ເສົາ".split("_"), monthsShort: "ມັງກອນ_ກຸມພາ_ມີນາ_ເມສາ_ພຶດສະພາ_ມິຖຸນາ_ກໍລະກົດ_ສິງຫາ_ກັນຍາ_ຕຸລາ_ພະຈິກ_ທັນວາ".split("_"), weekdaysMin: "ທ_ຈ_ອຄ_ພ_ພຫ_ສກ_ສ".split("_"), ordinal: function(t) {
        return t;
      }, formats: { LT: "HH:mm", LTS: "HH:mm:ss", L: "DD/MM/YYYY", LL: "D MMMM YYYY", LLL: "D MMMM YYYY HH:mm", LLLL: "ວັນdddd D MMMM YYYY HH:mm" }, relativeTime: { future: "ອີກ %s", past: "%sຜ່ານມາ", s: "ບໍ່ເທົ່າໃດວິນາທີ", m: "1 ນາທີ", mm: "%d ນາທີ", h: "1 ຊົ່ວໂມງ", hh: "%d ຊົ່ວໂມງ", d: "1 ມື້", dd: "%d ມື້", M: "1 ເດືອນ", MM: "%d ເດືອນ", y: "1 ປີ", yy: "%d ປີ" } };
      return o.default.locale(s, null, !0), s;
    }));
  })(Dn)), Dn.exports;
}
var jb = XC();
const ZC = /* @__PURE__ */ A(jb), QC = /* @__PURE__ */ q({
  __proto__: null,
  default: ZC
}, [jb]);
var Tn = { exports: {} }, eq = Tn.exports, uf;
function tq() {
  return uf || (uf = 1, (function(e, a) {
    (function(n, r) {
      e.exports = r(P());
    })(eq, (function(n) {
      function r(d) {
        return d && typeof d == "object" && "default" in d ? d : { default: d };
      }
      var o = r(n), s = "sausio_vasario_kovo_balandžio_gegužės_birželio_liepos_rugpjūčio_rugsėjo_spalio_lapkričio_gruodžio".split("_"), t = "sausis_vasaris_kovas_balandis_gegužė_birželis_liepa_rugpjūtis_rugsėjis_spalis_lapkritis_gruodis".split("_"), i = /D[oD]?(\[[^\[\]]*\]|\s)+MMMM?|MMMM?(\[[^\[\]]*\]|\s)+D[oD]?/, u = function(d, c) {
        return i.test(c) ? s[d.month()] : t[d.month()];
      };
      u.s = t, u.f = s;
      var l = { name: "lt", weekdays: "sekmadienis_pirmadienis_antradienis_trečiadienis_ketvirtadienis_penktadienis_šeštadienis".split("_"), weekdaysShort: "sek_pir_ant_tre_ket_pen_šeš".split("_"), weekdaysMin: "s_p_a_t_k_pn_š".split("_"), months: u, monthsShort: "sau_vas_kov_bal_geg_bir_lie_rgp_rgs_spa_lap_grd".split("_"), ordinal: function(d) {
        return d + ".";
      }, weekStart: 1, relativeTime: { future: "už %s", past: "prieš %s", s: "kelias sekundes", m: "minutę", mm: "%d minutes", h: "valandą", hh: "%d valandas", d: "dieną", dd: "%d dienas", M: "mėnesį", MM: "%d mėnesius", y: "metus", yy: "%d metus" }, format: { LT: "HH:mm", LTS: "HH:mm:ss", L: "YYYY-MM-DD", LL: "YYYY [m.] MMMM D [d.]", LLL: "YYYY [m.] MMMM D [d.], HH:mm [val.]", LLLL: "YYYY [m.] MMMM D [d.], dddd, HH:mm [val.]", l: "YYYY-MM-DD", ll: "YYYY [m.] MMMM D [d.]", lll: "YYYY [m.] MMMM D [d.], HH:mm [val.]", llll: "YYYY [m.] MMMM D [d.], ddd, HH:mm [val.]" }, formats: { LT: "HH:mm", LTS: "HH:mm:ss", L: "YYYY-MM-DD", LL: "YYYY [m.] MMMM D [d.]", LLL: "YYYY [m.] MMMM D [d.], HH:mm [val.]", LLLL: "YYYY [m.] MMMM D [d.], dddd, HH:mm [val.]", l: "YYYY-MM-DD", ll: "YYYY [m.] MMMM D [d.]", lll: "YYYY [m.] MMMM D [d.], HH:mm [val.]", llll: "YYYY [m.] MMMM D [d.], ddd, HH:mm [val.]" } };
      return o.default.locale(l, null, !0), l;
    }));
  })(Tn)), Tn.exports;
}
var Eb = tq();
const rq = /* @__PURE__ */ A(Eb), nq = /* @__PURE__ */ q({
  __proto__: null,
  default: rq
}, [Eb]);
var $n = { exports: {} }, aq = $n.exports, lf;
function oq() {
  return lf || (lf = 1, (function(e, a) {
    (function(n, r) {
      e.exports = r(P());
    })(aq, (function(n) {
      function r(t) {
        return t && typeof t == "object" && "default" in t ? t : { default: t };
      }
      var o = r(n), s = { name: "lv", weekdays: "svētdiena_pirmdiena_otrdiena_trešdiena_ceturtdiena_piektdiena_sestdiena".split("_"), months: "janvāris_februāris_marts_aprīlis_maijs_jūnijs_jūlijs_augusts_septembris_oktobris_novembris_decembris".split("_"), weekStart: 1, weekdaysShort: "Sv_P_O_T_C_Pk_S".split("_"), monthsShort: "jan_feb_mar_apr_mai_jūn_jūl_aug_sep_okt_nov_dec".split("_"), weekdaysMin: "Sv_P_O_T_C_Pk_S".split("_"), ordinal: function(t) {
        return t;
      }, formats: { LT: "HH:mm", LTS: "HH:mm:ss", L: "DD.MM.YYYY.", LL: "YYYY. [gada] D. MMMM", LLL: "YYYY. [gada] D. MMMM, HH:mm", LLLL: "YYYY. [gada] D. MMMM, dddd, HH:mm" }, relativeTime: { future: "pēc %s", past: "pirms %s", s: "dažām sekundēm", m: "minūtes", mm: "%d minūtēm", h: "stundas", hh: "%d stundām", d: "dienas", dd: "%d dienām", M: "mēneša", MM: "%d mēnešiem", y: "gada", yy: "%d gadiem" } };
      return o.default.locale(s, null, !0), s;
    }));
  })($n)), $n.exports;
}
var Cb = oq();
const sq = /* @__PURE__ */ A(Cb), iq = /* @__PURE__ */ q({
  __proto__: null,
  default: sq
}, [Cb]);
var Hn = { exports: {} }, uq = Hn.exports, df;
function lq() {
  return df || (df = 1, (function(e, a) {
    (function(n, r) {
      e.exports = r(P());
    })(uq, (function(n) {
      function r(t) {
        return t && typeof t == "object" && "default" in t ? t : { default: t };
      }
      var o = r(n), s = { name: "me", weekdays: "nedjelja_ponedjeljak_utorak_srijeda_četvrtak_petak_subota".split("_"), months: "januar_februar_mart_april_maj_jun_jul_avgust_septembar_oktobar_novembar_decembar".split("_"), weekStart: 1, weekdaysShort: "ned._pon._uto._sri._čet._pet._sub.".split("_"), monthsShort: "jan._feb._mar._apr._maj_jun_jul_avg._sep._okt._nov._dec.".split("_"), weekdaysMin: "ne_po_ut_sr_če_pe_su".split("_"), ordinal: function(t) {
        return t;
      }, formats: { LT: "H:mm", LTS: "H:mm:ss", L: "DD.MM.YYYY", LL: "D. MMMM YYYY", LLL: "D. MMMM YYYY H:mm", LLLL: "dddd, D. MMMM YYYY H:mm" } };
      return o.default.locale(s, null, !0), s;
    }));
  })(Hn)), Hn.exports;
}
var qb = lq();
const dq = /* @__PURE__ */ A(qb), cq = /* @__PURE__ */ q({
  __proto__: null,
  default: dq
}, [qb]);
var jn = { exports: {} }, _q = jn.exports, cf;
function fq() {
  return cf || (cf = 1, (function(e, a) {
    (function(n, r) {
      e.exports = r(P());
    })(_q, (function(n) {
      function r(t) {
        return t && typeof t == "object" && "default" in t ? t : { default: t };
      }
      var o = r(n), s = { name: "mi", weekdays: "Rātapu_Mane_Tūrei_Wenerei_Tāite_Paraire_Hātarei".split("_"), months: "Kohi-tāte_Hui-tanguru_Poutū-te-rangi_Paenga-whāwhā_Haratua_Pipiri_Hōngoingoi_Here-turi-kōkā_Mahuru_Whiringa-ā-nuku_Whiringa-ā-rangi_Hakihea".split("_"), weekStart: 1, weekdaysShort: "Ta_Ma_Tū_We_Tāi_Pa_Hā".split("_"), monthsShort: "Kohi_Hui_Pou_Pae_Hara_Pipi_Hōngoi_Here_Mahu_Whi-nu_Whi-ra_Haki".split("_"), weekdaysMin: "Ta_Ma_Tū_We_Tāi_Pa_Hā".split("_"), ordinal: function(t) {
        return t;
      }, formats: { LT: "HH:mm", LTS: "HH:mm:ss", L: "DD/MM/YYYY", LL: "D MMMM YYYY", LLL: "D MMMM YYYY [i] HH:mm", LLLL: "dddd, D MMMM YYYY [i] HH:mm" }, relativeTime: { future: "i roto i %s", past: "%s i mua", s: "te hēkona ruarua", m: "he meneti", mm: "%d meneti", h: "te haora", hh: "%d haora", d: "he ra", dd: "%d ra", M: "he marama", MM: "%d marama", y: "he tau", yy: "%d tau" } };
      return o.default.locale(s, null, !0), s;
    }));
  })(jn)), jn.exports;
}
var Ab = fq();
const mq = /* @__PURE__ */ A(Ab), pq = /* @__PURE__ */ q({
  __proto__: null,
  default: mq
}, [Ab]);
var En = { exports: {} }, hq = En.exports, _f;
function vq() {
  return _f || (_f = 1, (function(e, a) {
    (function(n, r) {
      e.exports = r(P());
    })(hq, (function(n) {
      function r(t) {
        return t && typeof t == "object" && "default" in t ? t : { default: t };
      }
      var o = r(n), s = { name: "mk", weekdays: "недела_понеделник_вторник_среда_четврток_петок_сабота".split("_"), months: "јануари_февруари_март_април_мај_јуни_јули_август_септември_октомври_ноември_декември".split("_"), weekStart: 1, weekdaysShort: "нед_пон_вто_сре_чет_пет_саб".split("_"), monthsShort: "јан_фев_мар_апр_мај_јун_јул_авг_сеп_окт_ное_дек".split("_"), weekdaysMin: "нe_пo_вт_ср_че_пе_сa".split("_"), ordinal: function(t) {
        return t;
      }, formats: { LT: "H:mm", LTS: "H:mm:ss", L: "D.MM.YYYY", LL: "D MMMM YYYY", LLL: "D MMMM YYYY H:mm", LLLL: "dddd, D MMMM YYYY H:mm" }, relativeTime: { future: "после %s", past: "пред %s", s: "неколку секунди", m: "минута", mm: "%d минути", h: "час", hh: "%d часа", d: "ден", dd: "%d дена", M: "месец", MM: "%d месеци", y: "година", yy: "%d години" } };
      return o.default.locale(s, null, !0), s;
    }));
  })(En)), En.exports;
}
var Rb = vq();
const yq = /* @__PURE__ */ A(Rb), gq = /* @__PURE__ */ q({
  __proto__: null,
  default: yq
}, [Rb]);
var Cn = { exports: {} }, Mq = Cn.exports, ff;
function bq() {
  return ff || (ff = 1, (function(e, a) {
    (function(n, r) {
      e.exports = r(P());
    })(Mq, (function(n) {
      function r(t) {
        return t && typeof t == "object" && "default" in t ? t : { default: t };
      }
      var o = r(n), s = { name: "ml", weekdays: "ഞായറാഴ്ച_തിങ്കളാഴ്ച_ചൊവ്വാഴ്ച_ബുധനാഴ്ച_വ്യാഴാഴ്ച_വെള്ളിയാഴ്ച_ശനിയാഴ്ച".split("_"), months: "ജനുവരി_ഫെബ്രുവരി_മാർച്ച്_ഏപ്രിൽ_മേയ്_ജൂൺ_ജൂലൈ_ഓഗസ്റ്റ്_സെപ്റ്റംബർ_ഒക്ടോബർ_നവംബർ_ഡിസംബർ".split("_"), weekdaysShort: "ഞായർ_തിങ്കൾ_ചൊവ്വ_ബുധൻ_വ്യാഴം_വെള്ളി_ശനി".split("_"), monthsShort: "ജനു._ഫെബ്രു._മാർ._ഏപ്രി._മേയ്_ജൂൺ_ജൂലൈ._ഓഗ._സെപ്റ്റ._ഒക്ടോ._നവം._ഡിസം.".split("_"), weekdaysMin: "ഞാ_തി_ചൊ_ബു_വ്യാ_വെ_ശ".split("_"), ordinal: function(t) {
        return t;
      }, formats: { LT: "A h:mm -നു", LTS: "A h:mm:ss -നു", L: "DD/MM/YYYY", LL: "D MMMM YYYY", LLL: "D MMMM YYYY, A h:mm -നു", LLLL: "dddd, D MMMM YYYY, A h:mm -നു" }, relativeTime: { future: "%s കഴിഞ്ഞ്", past: "%s മുൻപ്", s: "അൽപ നിമിഷങ്ങൾ", m: "ഒരു മിനിറ്റ്", mm: "%d മിനിറ്റ്", h: "ഒരു മണിക്കൂർ", hh: "%d മണിക്കൂർ", d: "ഒരു ദിവസം", dd: "%d ദിവസം", M: "ഒരു മാസം", MM: "%d മാസം", y: "ഒരു വർഷം", yy: "%d വർഷം" } };
      return o.default.locale(s, null, !0), s;
    }));
  })(Cn)), Cn.exports;
}
var Pb = bq();
const Yq = /* @__PURE__ */ A(Pb), wq = /* @__PURE__ */ q({
  __proto__: null,
  default: Yq
}, [Pb]);
var qn = { exports: {} }, xq = qn.exports, mf;
function Lq() {
  return mf || (mf = 1, (function(e, a) {
    (function(n, r) {
      e.exports = r(P());
    })(xq, (function(n) {
      function r(t) {
        return t && typeof t == "object" && "default" in t ? t : { default: t };
      }
      var o = r(n), s = { name: "mn", weekdays: "Ням_Даваа_Мягмар_Лхагва_Пүрэв_Баасан_Бямба".split("_"), months: "Нэгдүгээр сар_Хоёрдугаар сар_Гуравдугаар сар_Дөрөвдүгээр сар_Тавдугаар сар_Зургадугаар сар_Долдугаар сар_Наймдугаар сар_Есдүгээр сар_Аравдугаар сар_Арван нэгдүгээр сар_Арван хоёрдугаар сар".split("_"), weekdaysShort: "Ням_Дав_Мяг_Лха_Пүр_Баа_Бям".split("_"), monthsShort: "1 сар_2 сар_3 сар_4 сар_5 сар_6 сар_7 сар_8 сар_9 сар_10 сар_11 сар_12 сар".split("_"), weekdaysMin: "Ня_Да_Мя_Лх_Пү_Ба_Бя".split("_"), ordinal: function(t) {
        return t;
      }, formats: { LT: "HH:mm", LTS: "HH:mm:ss", L: "YYYY-MM-DD", LL: "YYYY оны MMMMын D", LLL: "YYYY оны MMMMын D HH:mm", LLLL: "dddd, YYYY оны MMMMын D HH:mm" }, relativeTime: { future: "%s", past: "%s", s: "саяхан", m: "м", mm: "%dм", h: "1ц", hh: "%dц", d: "1ө", dd: "%dө", M: "1с", MM: "%dс", y: "1ж", yy: "%dж" } };
      return o.default.locale(s, null, !0), s;
    }));
  })(qn)), qn.exports;
}
var Ib = Lq();
const kq = /* @__PURE__ */ A(Ib), Sq = /* @__PURE__ */ q({
  __proto__: null,
  default: kq
}, [Ib]);
var An = { exports: {} }, Dq = An.exports, pf;
function Tq() {
  return pf || (pf = 1, (function(e, a) {
    (function(n, r) {
      e.exports = r(P());
    })(Dq, (function(n) {
      function r(t) {
        return t && typeof t == "object" && "default" in t ? t : { default: t };
      }
      var o = r(n), s = { name: "mr", weekdays: "रविवार_सोमवार_मंगळवार_बुधवार_गुरूवार_शुक्रवार_शनिवार".split("_"), months: "जानेवारी_फेब्रुवारी_मार्च_एप्रिल_मे_जून_जुलै_ऑगस्ट_सप्टेंबर_ऑक्टोबर_नोव्हेंबर_डिसेंबर".split("_"), weekdaysShort: "रवि_सोम_मंगळ_बुध_गुरू_शुक्र_शनि".split("_"), monthsShort: "जाने._फेब्रु._मार्च._एप्रि._मे._जून._जुलै._ऑग._सप्टें._ऑक्टो._नोव्हें._डिसें.".split("_"), weekdaysMin: "र_सो_मं_बु_गु_शु_श".split("_"), ordinal: function(t) {
        return t;
      }, formats: { LT: "A h:mm वाजता", LTS: "A h:mm:ss वाजता", L: "DD/MM/YYYY", LL: "D MMMM YYYY", LLL: "D MMMM YYYY, A h:mm वाजता", LLLL: "dddd, D MMMM YYYY, A h:mm वाजता" } };
      return o.default.locale(s, null, !0), s;
    }));
  })(An)), An.exports;
}
var Nb = Tq();
const $q = /* @__PURE__ */ A(Nb), Hq = /* @__PURE__ */ q({
  __proto__: null,
  default: $q
}, [Nb]);
var Rn = { exports: {} }, jq = Rn.exports, hf;
function Eq() {
  return hf || (hf = 1, (function(e, a) {
    (function(n, r) {
      e.exports = r(P());
    })(jq, (function(n) {
      function r(t) {
        return t && typeof t == "object" && "default" in t ? t : { default: t };
      }
      var o = r(n), s = { name: "ms-my", weekdays: "Ahad_Isnin_Selasa_Rabu_Khamis_Jumaat_Sabtu".split("_"), months: "Januari_Februari_Mac_April_Mei_Jun_Julai_Ogos_September_Oktober_November_Disember".split("_"), weekStart: 1, weekdaysShort: "Ahd_Isn_Sel_Rab_Kha_Jum_Sab".split("_"), monthsShort: "Jan_Feb_Mac_Apr_Mei_Jun_Jul_Ogs_Sep_Okt_Nov_Dis".split("_"), weekdaysMin: "Ah_Is_Sl_Rb_Km_Jm_Sb".split("_"), ordinal: function(t) {
        return t;
      }, formats: { LT: "HH.mm", LTS: "HH.mm.ss", L: "DD/MM/YYYY", LL: "D MMMM YYYY", LLL: "D MMMM YYYY [pukul] HH.mm", LLLL: "dddd, D MMMM YYYY [pukul] HH.mm" }, relativeTime: { future: "dalam %s", past: "%s yang lepas", s: "beberapa saat", m: "seminit", mm: "%d minit", h: "sejam", hh: "%d jam", d: "sehari", dd: "%d hari", M: "sebulan", MM: "%d bulan", y: "setahun", yy: "%d tahun" } };
      return o.default.locale(s, null, !0), s;
    }));
  })(Rn)), Rn.exports;
}
var Ob = Eq();
const Cq = /* @__PURE__ */ A(Ob), qq = /* @__PURE__ */ q({
  __proto__: null,
  default: Cq
}, [Ob]);
var Pn = { exports: {} }, Aq = Pn.exports, vf;
function Rq() {
  return vf || (vf = 1, (function(e, a) {
    (function(n, r) {
      e.exports = r(P());
    })(Aq, (function(n) {
      function r(t) {
        return t && typeof t == "object" && "default" in t ? t : { default: t };
      }
      var o = r(n), s = { name: "ms", weekdays: "Ahad_Isnin_Selasa_Rabu_Khamis_Jumaat_Sabtu".split("_"), weekdaysShort: "Ahd_Isn_Sel_Rab_Kha_Jum_Sab".split("_"), weekdaysMin: "Ah_Is_Sl_Rb_Km_Jm_Sb".split("_"), months: "Januari_Februari_Mac_April_Mei_Jun_Julai_Ogos_September_Oktober_November_Disember".split("_"), monthsShort: "Jan_Feb_Mac_Apr_Mei_Jun_Jul_Ogs_Sep_Okt_Nov_Dis".split("_"), weekStart: 1, formats: { LT: "HH.mm", LTS: "HH.mm.ss", L: "DD/MM/YYYY", LL: "D MMMM YYYY", LLL: "D MMMM YYYY HH.mm", LLLL: "dddd, D MMMM YYYY HH.mm" }, relativeTime: { future: "dalam %s", past: "%s yang lepas", s: "beberapa saat", m: "seminit", mm: "%d minit", h: "sejam", hh: "%d jam", d: "sehari", dd: "%d hari", M: "sebulan", MM: "%d bulan", y: "setahun", yy: "%d tahun" }, ordinal: function(t) {
        return t + ".";
      } };
      return o.default.locale(s, null, !0), s;
    }));
  })(Pn)), Pn.exports;
}
var zb = Rq();
const Pq = /* @__PURE__ */ A(zb), Iq = /* @__PURE__ */ q({
  __proto__: null,
  default: Pq
}, [zb]);
var In = { exports: {} }, Nq = In.exports, yf;
function Oq() {
  return yf || (yf = 1, (function(e, a) {
    (function(n, r) {
      e.exports = r(P());
    })(Nq, (function(n) {
      function r(t) {
        return t && typeof t == "object" && "default" in t ? t : { default: t };
      }
      var o = r(n), s = { name: "mt", weekdays: "Il-Ħadd_It-Tnejn_It-Tlieta_L-Erbgħa_Il-Ħamis_Il-Ġimgħa_Is-Sibt".split("_"), months: "Jannar_Frar_Marzu_April_Mejju_Ġunju_Lulju_Awwissu_Settembru_Ottubru_Novembru_Diċembru".split("_"), weekStart: 1, weekdaysShort: "Ħad_Tne_Tli_Erb_Ħam_Ġim_Sib".split("_"), monthsShort: "Jan_Fra_Mar_Apr_Mej_Ġun_Lul_Aww_Set_Ott_Nov_Diċ".split("_"), weekdaysMin: "Ħa_Tn_Tl_Er_Ħa_Ġi_Si".split("_"), ordinal: function(t) {
        return t;
      }, formats: { LT: "HH:mm", LTS: "HH:mm:ss", L: "DD/MM/YYYY", LL: "D MMMM YYYY", LLL: "D MMMM YYYY HH:mm", LLLL: "dddd, D MMMM YYYY HH:mm" }, relativeTime: { future: "f’ %s", past: "%s ilu", s: "ftit sekondi", m: "minuta", mm: "%d minuti", h: "siegħa", hh: "%d siegħat", d: "ġurnata", dd: "%d ġranet", M: "xahar", MM: "%d xhur", y: "sena", yy: "%d sni" } };
      return o.default.locale(s, null, !0), s;
    }));
  })(In)), In.exports;
}
var Fb = Oq();
const zq = /* @__PURE__ */ A(Fb), Fq = /* @__PURE__ */ q({
  __proto__: null,
  default: zq
}, [Fb]);
var Nn = { exports: {} }, Bq = Nn.exports, gf;
function Gq() {
  return gf || (gf = 1, (function(e, a) {
    (function(n, r) {
      e.exports = r(P());
    })(Bq, (function(n) {
      function r(t) {
        return t && typeof t == "object" && "default" in t ? t : { default: t };
      }
      var o = r(n), s = { name: "my", weekdays: "တနင်္ဂနွေ_တနင်္လာ_အင်္ဂါ_ဗုဒ္ဓဟူး_ကြာသပတေး_သောကြာ_စနေ".split("_"), months: "ဇန်နဝါရီ_ဖေဖော်ဝါရီ_မတ်_ဧပြီ_မေ_ဇွန်_ဇူလိုင်_သြဂုတ်_စက်တင်ဘာ_အောက်တိုဘာ_နိုဝင်ဘာ_ဒီဇင်ဘာ".split("_"), weekStart: 1, weekdaysShort: "နွေ_လာ_ဂါ_ဟူး_ကြာ_သော_နေ".split("_"), monthsShort: "ဇန်_ဖေ_မတ်_ပြီ_မေ_ဇွန်_လိုင်_သြ_စက်_အောက်_နို_ဒီ".split("_"), weekdaysMin: "နွေ_လာ_ဂါ_ဟူး_ကြာ_သော_နေ".split("_"), ordinal: function(t) {
        return t;
      }, formats: { LT: "HH:mm", LTS: "HH:mm:ss", L: "DD/MM/YYYY", LL: "D MMMM YYYY", LLL: "D MMMM YYYY HH:mm", LLLL: "dddd D MMMM YYYY HH:mm" }, relativeTime: { future: "လာမည့် %s မှာ", past: "လွန်ခဲ့သော %s က", s: "စက္ကန်.အနည်းငယ်", m: "တစ်မိနစ်", mm: "%d မိနစ်", h: "တစ်နာရီ", hh: "%d နာရီ", d: "တစ်ရက်", dd: "%d ရက်", M: "တစ်လ", MM: "%d လ", y: "တစ်နှစ်", yy: "%d နှစ်" } };
      return o.default.locale(s, null, !0), s;
    }));
  })(Nn)), Nn.exports;
}
var Bb = Gq();
const Jq = /* @__PURE__ */ A(Bb), Uq = /* @__PURE__ */ q({
  __proto__: null,
  default: Jq
}, [Bb]);
var On = { exports: {} }, Wq = On.exports, Mf;
function Vq() {
  return Mf || (Mf = 1, (function(e, a) {
    (function(n, r) {
      e.exports = r(P());
    })(Wq, (function(n) {
      function r(t) {
        return t && typeof t == "object" && "default" in t ? t : { default: t };
      }
      var o = r(n), s = { name: "nb", weekdays: "søndag_mandag_tirsdag_onsdag_torsdag_fredag_lørdag".split("_"), weekdaysShort: "sø._ma._ti._on._to._fr._lø.".split("_"), weekdaysMin: "sø_ma_ti_on_to_fr_lø".split("_"), months: "januar_februar_mars_april_mai_juni_juli_august_september_oktober_november_desember".split("_"), monthsShort: "jan._feb._mars_april_mai_juni_juli_aug._sep._okt._nov._des.".split("_"), ordinal: function(t) {
        return t + ".";
      }, weekStart: 1, yearStart: 4, formats: { LT: "HH:mm", LTS: "HH:mm:ss", L: "DD.MM.YYYY", LL: "D. MMMM YYYY", LLL: "D. MMMM YYYY [kl.] HH:mm", LLLL: "dddd D. MMMM YYYY [kl.] HH:mm" }, relativeTime: { future: "om %s", past: "%s siden", s: "noen sekunder", m: "ett minutt", mm: "%d minutter", h: "en time", hh: "%d timer", d: "en dag", dd: "%d dager", M: "en måned", MM: "%d måneder", y: "ett år", yy: "%d år" } };
      return o.default.locale(s, null, !0), s;
    }));
  })(On)), On.exports;
}
var Gb = Vq();
const Kq = /* @__PURE__ */ A(Gb), Xq = /* @__PURE__ */ q({
  __proto__: null,
  default: Kq
}, [Gb]);
var zn = { exports: {} }, Zq = zn.exports, bf;
function Qq() {
  return bf || (bf = 1, (function(e, a) {
    (function(n, r) {
      e.exports = r(P());
    })(Zq, (function(n) {
      function r(t) {
        return t && typeof t == "object" && "default" in t ? t : { default: t };
      }
      var o = r(n), s = { name: "ne", weekdays: "आइतबार_सोमबार_मङ्गलबार_बुधबार_बिहिबार_शुक्रबार_शनिबार".split("_"), weekdaysShort: "आइत._सोम._मङ्गल._बुध._बिहि._शुक्र._शनि.".split("_"), weekdaysMin: "आ._सो._मं._बु._बि._शु._श.".split("_"), months: "जनवरी_फेब्रुवरी_मार्च_अप्रिल_मे_जुन_जुलाई_अगष्ट_सेप्टेम्बर_अक्टोबर_नोभेम्बर_डिसेम्बर".split("_"), monthsShort: "जन._फेब्रु._मार्च_अप्रि._मई_जुन_जुलाई._अग._सेप्ट._अक्टो._नोभे._डिसे.".split("_"), relativeTime: { future: "%s पछि", past: "%s अघि", s: "सेकेन्ड", m: "एक मिनेट", mm: "%d मिनेट", h: "घन्टा", hh: "%d घन्टा", d: "एक दिन", dd: "%d दिन", M: "एक महिना", MM: "%d महिना", y: "एक वर्ष", yy: "%d वर्ष" }, ordinal: function(t) {
        return ("" + t).replace(/\d/g, (function(i) {
          return "०१२३४५६७८९"[i];
        }));
      }, formats: { LT: "Aको h:mm बजे", LTS: "Aको h:mm:ss बजे", L: "DD/MM/YYYY", LL: "D MMMM YYYY", LLL: "D MMMM YYYY, Aको h:mm बजे", LLLL: "dddd, D MMMM YYYY, Aको h:mm बजे" } };
      return o.default.locale(s, null, !0), s;
    }));
  })(zn)), zn.exports;
}
var Jb = Qq();
const eA = /* @__PURE__ */ A(Jb), tA = /* @__PURE__ */ q({
  __proto__: null,
  default: eA
}, [Jb]);
var Fn = { exports: {} }, rA = Fn.exports, Yf;
function nA() {
  return Yf || (Yf = 1, (function(e, a) {
    (function(n, r) {
      e.exports = r(P());
    })(rA, (function(n) {
      function r(t) {
        return t && typeof t == "object" && "default" in t ? t : { default: t };
      }
      var o = r(n), s = { name: "nl-be", weekdays: "zondag_maandag_dinsdag_woensdag_donderdag_vrijdag_zaterdag".split("_"), months: "januari_februari_maart_april_mei_juni_juli_augustus_september_oktober_november_december".split("_"), monthsShort: "jan._feb._mrt._apr._mei_jun._jul._aug._sep._okt._nov._dec.".split("_"), weekStart: 1, weekdaysShort: "zo._ma._di._wo._do._vr._za.".split("_"), weekdaysMin: "zo_ma_di_wo_do_vr_za".split("_"), ordinal: function(t) {
        return t;
      }, formats: { LT: "HH:mm", LTS: "HH:mm:ss", L: "DD/MM/YYYY", LL: "D MMMM YYYY", LLL: "D MMMM YYYY HH:mm", LLLL: "dddd D MMMM YYYY HH:mm" }, relativeTime: { future: "over %s", past: "%s geleden", s: "een paar seconden", m: "één minuut", mm: "%d minuten", h: "één uur", hh: "%d uur", d: "één dag", dd: "%d dagen", M: "één maand", MM: "%d maanden", y: "één jaar", yy: "%d jaar" } };
      return o.default.locale(s, null, !0), s;
    }));
  })(Fn)), Fn.exports;
}
var Ub = nA();
const aA = /* @__PURE__ */ A(Ub), oA = /* @__PURE__ */ q({
  __proto__: null,
  default: aA
}, [Ub]);
var Bn = { exports: {} }, sA = Bn.exports, wf;
function iA() {
  return wf || (wf = 1, (function(e, a) {
    (function(n, r) {
      e.exports = r(P());
    })(sA, (function(n) {
      function r(t) {
        return t && typeof t == "object" && "default" in t ? t : { default: t };
      }
      var o = r(n), s = { name: "nl", weekdays: "zondag_maandag_dinsdag_woensdag_donderdag_vrijdag_zaterdag".split("_"), weekdaysShort: "zo._ma._di._wo._do._vr._za.".split("_"), weekdaysMin: "zo_ma_di_wo_do_vr_za".split("_"), months: "januari_februari_maart_april_mei_juni_juli_augustus_september_oktober_november_december".split("_"), monthsShort: "jan_feb_mrt_apr_mei_jun_jul_aug_sep_okt_nov_dec".split("_"), ordinal: function(t) {
        return "[" + t + (t === 1 || t === 8 || t >= 20 ? "ste" : "de") + "]";
      }, weekStart: 1, yearStart: 4, formats: { LT: "HH:mm", LTS: "HH:mm:ss", L: "DD-MM-YYYY", LL: "D MMMM YYYY", LLL: "D MMMM YYYY HH:mm", LLLL: "dddd D MMMM YYYY HH:mm" }, relativeTime: { future: "over %s", past: "%s geleden", s: "een paar seconden", m: "een minuut", mm: "%d minuten", h: "een uur", hh: "%d uur", d: "een dag", dd: "%d dagen", M: "een maand", MM: "%d maanden", y: "een jaar", yy: "%d jaar" } };
      return o.default.locale(s, null, !0), s;
    }));
  })(Bn)), Bn.exports;
}
var Wb = iA();
const uA = /* @__PURE__ */ A(Wb), lA = /* @__PURE__ */ q({
  __proto__: null,
  default: uA
}, [Wb]);
var Gn = { exports: {} }, dA = Gn.exports, xf;
function cA() {
  return xf || (xf = 1, (function(e, a) {
    (function(n, r) {
      e.exports = r(P());
    })(dA, (function(n) {
      function r(t) {
        return t && typeof t == "object" && "default" in t ? t : { default: t };
      }
      var o = r(n), s = { name: "nn", weekdays: "sundag_måndag_tysdag_onsdag_torsdag_fredag_laurdag".split("_"), weekdaysShort: "sun_mån_tys_ons_tor_fre_lau".split("_"), weekdaysMin: "su_må_ty_on_to_fr_la".split("_"), months: "januar_februar_mars_april_mai_juni_juli_august_september_oktober_november_desember".split("_"), monthsShort: "jan_feb_mar_apr_mai_jun_jul_aug_sep_okt_nov_des".split("_"), ordinal: function(t) {
        return t + ".";
      }, weekStart: 1, relativeTime: { future: "om %s", past: "for %s sidan", s: "nokre sekund", m: "eitt minutt", mm: "%d minutt", h: "ein time", hh: "%d timar", d: "ein dag", dd: "%d dagar", M: "ein månad", MM: "%d månadar", y: "eitt år", yy: "%d år" }, formats: { LT: "HH:mm", LTS: "HH:mm:ss", L: "DD.MM.YYYY", LL: "D. MMMM YYYY", LLL: "D. MMMM YYYY [kl.] H:mm", LLLL: "dddd D. MMMM YYYY [kl.] HH:mm" } };
      return o.default.locale(s, null, !0), s;
    }));
  })(Gn)), Gn.exports;
}
var Vb = cA();
const _A = /* @__PURE__ */ A(Vb), fA = /* @__PURE__ */ q({
  __proto__: null,
  default: _A
}, [Vb]);
var Jn = { exports: {} }, mA = Jn.exports, Lf;
function pA() {
  return Lf || (Lf = 1, (function(e, a) {
    (function(n, r) {
      e.exports = r(P());
    })(mA, (function(n) {
      function r(t) {
        return t && typeof t == "object" && "default" in t ? t : { default: t };
      }
      var o = r(n), s = { name: "oc-lnc", weekdays: "dimenge_diluns_dimars_dimècres_dijòus_divendres_dissabte".split("_"), weekdaysShort: "Dg_Dl_Dm_Dc_Dj_Dv_Ds".split("_"), weekdaysMin: "dg_dl_dm_dc_dj_dv_ds".split("_"), months: "genièr_febrièr_març_abrial_mai_junh_julhet_agost_setembre_octòbre_novembre_decembre".split("_"), monthsShort: "gen_feb_març_abr_mai_junh_julh_ago_set_oct_nov_dec".split("_"), weekStart: 1, formats: { LT: "H:mm", LTS: "H:mm:ss", L: "DD/MM/YYYY", LL: "D MMMM [de] YYYY", LLL: "D MMMM [de] YYYY [a] H:mm", LLLL: "dddd D MMMM [de] YYYY [a] H:mm" }, relativeTime: { future: "d'aquí %s", past: "fa %s", s: "unas segondas", m: "una minuta", mm: "%d minutas", h: "una ora", hh: "%d oras", d: "un jorn", dd: "%d jorns", M: "un mes", MM: "%d meses", y: "un an", yy: "%d ans" }, ordinal: function(t) {
        return t + "º";
      } };
      return o.default.locale(s, null, !0), s;
    }));
  })(Jn)), Jn.exports;
}
var Kb = pA();
const hA = /* @__PURE__ */ A(Kb), vA = /* @__PURE__ */ q({
  __proto__: null,
  default: hA
}, [Kb]);
var Un = { exports: {} }, yA = Un.exports, kf;
function gA() {
  return kf || (kf = 1, (function(e, a) {
    (function(n, r) {
      e.exports = r(P());
    })(yA, (function(n) {
      function r(t) {
        return t && typeof t == "object" && "default" in t ? t : { default: t };
      }
      var o = r(n), s = { name: "pa-in", weekdays: "ਐਤਵਾਰ_ਸੋਮਵਾਰ_ਮੰਗਲਵਾਰ_ਬੁਧਵਾਰ_ਵੀਰਵਾਰ_ਸ਼ੁੱਕਰਵਾਰ_ਸ਼ਨੀਚਰਵਾਰ".split("_"), months: "ਜਨਵਰੀ_ਫ਼ਰਵਰੀ_ਮਾਰਚ_ਅਪ੍ਰੈਲ_ਮਈ_ਜੂਨ_ਜੁਲਾਈ_ਅਗਸਤ_ਸਤੰਬਰ_ਅਕਤੂਬਰ_ਨਵੰਬਰ_ਦਸੰਬਰ".split("_"), weekdaysShort: "ਐਤ_ਸੋਮ_ਮੰਗਲ_ਬੁਧ_ਵੀਰ_ਸ਼ੁਕਰ_ਸ਼ਨੀ".split("_"), monthsShort: "ਜਨਵਰੀ_ਫ਼ਰਵਰੀ_ਮਾਰਚ_ਅਪ੍ਰੈਲ_ਮਈ_ਜੂਨ_ਜੁਲਾਈ_ਅਗਸਤ_ਸਤੰਬਰ_ਅਕਤੂਬਰ_ਨਵੰਬਰ_ਦਸੰਬਰ".split("_"), weekdaysMin: "ਐਤ_ਸੋਮ_ਮੰਗਲ_ਬੁਧ_ਵੀਰ_ਸ਼ੁਕਰ_ਸ਼ਨੀ".split("_"), ordinal: function(t) {
        return t;
      }, formats: { LT: "A h:mm ਵਜੇ", LTS: "A h:mm:ss ਵਜੇ", L: "DD/MM/YYYY", LL: "D MMMM YYYY", LLL: "D MMMM YYYY, A h:mm ਵਜੇ", LLLL: "dddd, D MMMM YYYY, A h:mm ਵਜੇ" }, relativeTime: { future: "%s ਵਿੱਚ", past: "%s ਪਿਛਲੇ", s: "ਕੁਝ ਸਕਿੰਟ", m: "ਇਕ ਮਿੰਟ", mm: "%d ਮਿੰਟ", h: "ਇੱਕ ਘੰਟਾ", hh: "%d ਘੰਟੇ", d: "ਇੱਕ ਦਿਨ", dd: "%d ਦਿਨ", M: "ਇੱਕ ਮਹੀਨਾ", MM: "%d ਮਹੀਨੇ", y: "ਇੱਕ ਸਾਲ", yy: "%d ਸਾਲ" } };
      return o.default.locale(s, null, !0), s;
    }));
  })(Un)), Un.exports;
}
var Xb = gA();
const MA = /* @__PURE__ */ A(Xb), bA = /* @__PURE__ */ q({
  __proto__: null,
  default: MA
}, [Xb]);
var Wn = { exports: {} }, YA = Wn.exports, Sf;
function wA() {
  return Sf || (Sf = 1, (function(e, a) {
    (function(n, r) {
      e.exports = r(P());
    })(YA, (function(n) {
      function r(_) {
        return _ && typeof _ == "object" && "default" in _ ? _ : { default: _ };
      }
      var o = r(n);
      function s(_) {
        return _ % 10 < 5 && _ % 10 > 1 && ~~(_ / 10) % 10 != 1;
      }
      function t(_, f, m) {
        var h = _ + " ";
        switch (m) {
          case "m":
            return f ? "minuta" : "minutę";
          case "mm":
            return h + (s(_) ? "minuty" : "minut");
          case "h":
            return f ? "godzina" : "godzinę";
          case "hh":
            return h + (s(_) ? "godziny" : "godzin");
          case "MM":
            return h + (s(_) ? "miesiące" : "miesięcy");
          case "yy":
            return h + (s(_) ? "lata" : "lat");
        }
      }
      var i = "stycznia_lutego_marca_kwietnia_maja_czerwca_lipca_sierpnia_września_października_listopada_grudnia".split("_"), u = "styczeń_luty_marzec_kwiecień_maj_czerwiec_lipiec_sierpień_wrzesień_październik_listopad_grudzień".split("_"), l = /D MMMM/, d = function(_, f) {
        return l.test(f) ? i[_.month()] : u[_.month()];
      };
      d.s = u, d.f = i;
      var c = { name: "pl", weekdays: "niedziela_poniedziałek_wtorek_środa_czwartek_piątek_sobota".split("_"), weekdaysShort: "ndz_pon_wt_śr_czw_pt_sob".split("_"), weekdaysMin: "Nd_Pn_Wt_Śr_Cz_Pt_So".split("_"), months: d, monthsShort: "sty_lut_mar_kwi_maj_cze_lip_sie_wrz_paź_lis_gru".split("_"), ordinal: function(_) {
        return _ + ".";
      }, weekStart: 1, yearStart: 4, relativeTime: { future: "za %s", past: "%s temu", s: "kilka sekund", m: t, mm: t, h: t, hh: t, d: "1 dzień", dd: "%d dni", M: "miesiąc", MM: t, y: "rok", yy: t }, formats: { LT: "HH:mm", LTS: "HH:mm:ss", L: "DD.MM.YYYY", LL: "D MMMM YYYY", LLL: "D MMMM YYYY HH:mm", LLLL: "dddd, D MMMM YYYY HH:mm" } };
      return o.default.locale(c, null, !0), c;
    }));
  })(Wn)), Wn.exports;
}
var Zb = wA();
const xA = /* @__PURE__ */ A(Zb), LA = /* @__PURE__ */ q({
  __proto__: null,
  default: xA
}, [Zb]);
var Vn = { exports: {} }, kA = Vn.exports, Df;
function SA() {
  return Df || (Df = 1, (function(e, a) {
    (function(n, r) {
      e.exports = r(P());
    })(kA, (function(n) {
      function r(t) {
        return t && typeof t == "object" && "default" in t ? t : { default: t };
      }
      var o = r(n), s = { name: "pt-br", weekdays: "domingo_segunda-feira_terça-feira_quarta-feira_quinta-feira_sexta-feira_sábado".split("_"), weekdaysShort: "dom_seg_ter_qua_qui_sex_sáb".split("_"), weekdaysMin: "Do_2ª_3ª_4ª_5ª_6ª_Sá".split("_"), months: "janeiro_fevereiro_março_abril_maio_junho_julho_agosto_setembro_outubro_novembro_dezembro".split("_"), monthsShort: "jan_fev_mar_abr_mai_jun_jul_ago_set_out_nov_dez".split("_"), ordinal: function(t) {
        return t + "º";
      }, formats: { LT: "HH:mm", LTS: "HH:mm:ss", L: "DD/MM/YYYY", LL: "D [de] MMMM [de] YYYY", LLL: "D [de] MMMM [de] YYYY [às] HH:mm", LLLL: "dddd, D [de] MMMM [de] YYYY [às] HH:mm" }, relativeTime: { future: "em %s", past: "há %s", s: "poucos segundos", m: "um minuto", mm: "%d minutos", h: "uma hora", hh: "%d horas", d: "um dia", dd: "%d dias", M: "um mês", MM: "%d meses", y: "um ano", yy: "%d anos" } };
      return o.default.locale(s, null, !0), s;
    }));
  })(Vn)), Vn.exports;
}
var Qb = SA();
const DA = /* @__PURE__ */ A(Qb), TA = /* @__PURE__ */ q({
  __proto__: null,
  default: DA
}, [Qb]);
var Kn = { exports: {} }, $A = Kn.exports, Tf;
function HA() {
  return Tf || (Tf = 1, (function(e, a) {
    (function(n, r) {
      e.exports = r(P());
    })($A, (function(n) {
      function r(t) {
        return t && typeof t == "object" && "default" in t ? t : { default: t };
      }
      var o = r(n), s = { name: "pt", weekdays: "domingo_segunda-feira_terça-feira_quarta-feira_quinta-feira_sexta-feira_sábado".split("_"), weekdaysShort: "dom_seg_ter_qua_qui_sex_sab".split("_"), weekdaysMin: "Do_2ª_3ª_4ª_5ª_6ª_Sa".split("_"), months: "janeiro_fevereiro_março_abril_maio_junho_julho_agosto_setembro_outubro_novembro_dezembro".split("_"), monthsShort: "jan_fev_mar_abr_mai_jun_jul_ago_set_out_nov_dez".split("_"), ordinal: function(t) {
        return t + "º";
      }, weekStart: 1, yearStart: 4, formats: { LT: "HH:mm", LTS: "HH:mm:ss", L: "DD/MM/YYYY", LL: "D [de] MMMM [de] YYYY", LLL: "D [de] MMMM [de] YYYY [às] HH:mm", LLLL: "dddd, D [de] MMMM [de] YYYY [às] HH:mm" }, relativeTime: { future: "em %s", past: "há %s", s: "alguns segundos", m: "um minuto", mm: "%d minutos", h: "uma hora", hh: "%d horas", d: "um dia", dd: "%d dias", M: "um mês", MM: "%d meses", y: "um ano", yy: "%d anos" } };
      return o.default.locale(s, null, !0), s;
    }));
  })(Kn)), Kn.exports;
}
var eY = HA();
const jA = /* @__PURE__ */ A(eY), EA = /* @__PURE__ */ q({
  __proto__: null,
  default: jA
}, [eY]);
var Xn = { exports: {} }, CA = Xn.exports, $f;
function qA() {
  return $f || ($f = 1, (function(e, a) {
    (function(n, r) {
      e.exports = r(P());
    })(CA, (function(n) {
      function r(t) {
        return t && typeof t == "object" && "default" in t ? t : { default: t };
      }
      var o = r(n), s = { name: "rn", weekdays: "Ku wa Mungu_Ku wa Mbere_Ku wa Kabiri_Ku wa Gatatu_Ku wa Kane_Ku wa Gatanu_Ku wa Gatandatu".split("_"), weekdaysShort: "Kngu_Kmbr_Kbri_Ktat_Kkan_Ktan_Kdat".split("_"), weekdaysMin: "K7_K1_K2_K3_K4_K5_K6".split("_"), months: "Nzero_Ruhuhuma_Ntwarante_Ndamukiza_Rusama_Ruhenshi_Mukakaro_Myandagaro_Nyakanga_Gitugutu_Munyonyo_Kigarama".split("_"), monthsShort: "Nzer_Ruhuh_Ntwar_Ndam_Rus_Ruhen_Muk_Myand_Nyak_Git_Muny_Kig".split("_"), weekStart: 1, ordinal: function(t) {
        return t;
      }, relativeTime: { future: "mu %s", past: "%s", s: "amasegonda", m: "Umunota", mm: "%d iminota", h: "isaha", hh: "%d amasaha", d: "Umunsi", dd: "%d iminsi", M: "ukwezi", MM: "%d amezi", y: "umwaka", yy: "%d imyaka" }, formats: { LT: "HH:mm", LTS: "HH:mm:ss", L: "DD/MM/YYYY", LL: "D MMMM YYYY", LLL: "D MMMM YYYY HH:mm", LLLL: "dddd, D MMMM YYYY HH:mm" } };
      return o.default.locale(s, null, !0), s;
    }));
  })(Xn)), Xn.exports;
}
var tY = qA();
const AA = /* @__PURE__ */ A(tY), RA = /* @__PURE__ */ q({
  __proto__: null,
  default: AA
}, [tY]);
var Zn = { exports: {} }, PA = Zn.exports, Hf;
function IA() {
  return Hf || (Hf = 1, (function(e, a) {
    (function(n, r) {
      e.exports = r(P());
    })(PA, (function(n) {
      function r(t) {
        return t && typeof t == "object" && "default" in t ? t : { default: t };
      }
      var o = r(n), s = { name: "ro", weekdays: "Duminică_Luni_Marți_Miercuri_Joi_Vineri_Sâmbătă".split("_"), weekdaysShort: "Dum_Lun_Mar_Mie_Joi_Vin_Sâm".split("_"), weekdaysMin: "Du_Lu_Ma_Mi_Jo_Vi_Sâ".split("_"), months: "Ianuarie_Februarie_Martie_Aprilie_Mai_Iunie_Iulie_August_Septembrie_Octombrie_Noiembrie_Decembrie".split("_"), monthsShort: "Ian._Febr._Mart._Apr._Mai_Iun._Iul._Aug._Sept._Oct._Nov._Dec.".split("_"), weekStart: 1, formats: { LT: "H:mm", LTS: "H:mm:ss", L: "DD.MM.YYYY", LL: "D MMMM YYYY", LLL: "D MMMM YYYY H:mm", LLLL: "dddd, D MMMM YYYY H:mm" }, relativeTime: { future: "peste %s", past: "acum %s", s: "câteva secunde", m: "un minut", mm: "%d minute", h: "o oră", hh: "%d ore", d: "o zi", dd: "%d zile", M: "o lună", MM: "%d luni", y: "un an", yy: "%d ani" }, ordinal: function(t) {
        return t;
      } };
      return o.default.locale(s, null, !0), s;
    }));
  })(Zn)), Zn.exports;
}
var rY = IA();
const NA = /* @__PURE__ */ A(rY), OA = /* @__PURE__ */ q({
  __proto__: null,
  default: NA
}, [rY]);
var Qn = { exports: {} }, zA = Qn.exports, jf;
function FA() {
  return jf || (jf = 1, (function(e, a) {
    (function(n, r) {
      e.exports = r(P());
    })(zA, (function(n) {
      function r(m) {
        return m && typeof m == "object" && "default" in m ? m : { default: m };
      }
      var o = r(n), s = "января_февраля_марта_апреля_мая_июня_июля_августа_сентября_октября_ноября_декабря".split("_"), t = "январь_февраль_март_апрель_май_июнь_июль_август_сентябрь_октябрь_ноябрь_декабрь".split("_"), i = "янв._февр._мар._апр._мая_июня_июля_авг._сент._окт._нояб._дек.".split("_"), u = "янв._февр._март_апр._май_июнь_июль_авг._сент._окт._нояб._дек.".split("_"), l = /D[oD]?(\[[^[\]]*\]|\s)+MMMM?/;
      function d(m, h, y) {
        var p, v;
        return y === "m" ? h ? "минута" : "минуту" : m + " " + (p = +m, v = { mm: h ? "минута_минуты_минут" : "минуту_минуты_минут", hh: "час_часа_часов", dd: "день_дня_дней", MM: "месяц_месяца_месяцев", yy: "год_года_лет" }[y].split("_"), p % 10 == 1 && p % 100 != 11 ? v[0] : p % 10 >= 2 && p % 10 <= 4 && (p % 100 < 10 || p % 100 >= 20) ? v[1] : v[2]);
      }
      var c = function(m, h) {
        return l.test(h) ? s[m.month()] : t[m.month()];
      };
      c.s = t, c.f = s;
      var _ = function(m, h) {
        return l.test(h) ? i[m.month()] : u[m.month()];
      };
      _.s = u, _.f = i;
      var f = { name: "ru", weekdays: "воскресенье_понедельник_вторник_среда_четверг_пятница_суббота".split("_"), weekdaysShort: "вск_пнд_втр_срд_чтв_птн_сбт".split("_"), weekdaysMin: "вс_пн_вт_ср_чт_пт_сб".split("_"), months: c, monthsShort: _, weekStart: 1, yearStart: 4, formats: { LT: "H:mm", LTS: "H:mm:ss", L: "DD.MM.YYYY", LL: "D MMMM YYYY г.", LLL: "D MMMM YYYY г., H:mm", LLLL: "dddd, D MMMM YYYY г., H:mm" }, relativeTime: { future: "через %s", past: "%s назад", s: "несколько секунд", m: d, mm: d, h: "час", hh: d, d: "день", dd: d, M: "месяц", MM: d, y: "год", yy: d }, ordinal: function(m) {
        return m;
      }, meridiem: function(m) {
        return m < 4 ? "ночи" : m < 12 ? "утра" : m < 17 ? "дня" : "вечера";
      } };
      return o.default.locale(f, null, !0), f;
    }));
  })(Qn)), Qn.exports;
}
var nY = FA();
const BA = /* @__PURE__ */ A(nY), GA = /* @__PURE__ */ q({
  __proto__: null,
  default: BA
}, [nY]);
var ea = { exports: {} }, JA = ea.exports, Ef;
function UA() {
  return Ef || (Ef = 1, (function(e, a) {
    (function(n, r) {
      e.exports = r(P());
    })(JA, (function(n) {
      function r(t) {
        return t && typeof t == "object" && "default" in t ? t : { default: t };
      }
      var o = r(n), s = { name: "rw", weekdays: "Ku Cyumweru_Kuwa Mbere_Kuwa Kabiri_Kuwa Gatatu_Kuwa Kane_Kuwa Gatanu_Kuwa Gatandatu".split("_"), months: "Mutarama_Gashyantare_Werurwe_Mata_Gicurasi_Kamena_Nyakanga_Kanama_Nzeri_Ukwakira_Ugushyingo_Ukuboza".split("_"), relativeTime: { future: "mu %s", past: "%s", s: "amasegonda", m: "Umunota", mm: "%d iminota", h: "isaha", hh: "%d amasaha", d: "Umunsi", dd: "%d iminsi", M: "ukwezi", MM: "%d amezi", y: "umwaka", yy: "%d imyaka" }, formats: { LT: "HH:mm", LTS: "HH:mm:ss", L: "DD/MM/YYYY", LL: "D MMMM YYYY", LLL: "D MMMM YYYY HH:mm", LLLL: "dddd, D MMMM YYYY HH:mm" }, ordinal: function(t) {
        return t;
      } };
      return o.default.locale(s, null, !0), s;
    }));
  })(ea)), ea.exports;
}
var aY = UA();
const WA = /* @__PURE__ */ A(aY), VA = /* @__PURE__ */ q({
  __proto__: null,
  default: WA
}, [aY]);
var ta = { exports: {} }, KA = ta.exports, Cf;
function XA() {
  return Cf || (Cf = 1, (function(e, a) {
    (function(n, r) {
      e.exports = r(P());
    })(KA, (function(n) {
      function r(t) {
        return t && typeof t == "object" && "default" in t ? t : { default: t };
      }
      var o = r(n), s = { name: "sd", weekdays: "آچر_سومر_اڱارو_اربع_خميس_جمع_ڇنڇر".split("_"), months: "جنوري_فيبروري_مارچ_اپريل_مئي_جون_جولاءِ_آگسٽ_سيپٽمبر_آڪٽوبر_نومبر_ڊسمبر".split("_"), weekStart: 1, weekdaysShort: "آچر_سومر_اڱارو_اربع_خميس_جمع_ڇنڇر".split("_"), monthsShort: "جنوري_فيبروري_مارچ_اپريل_مئي_جون_جولاءِ_آگسٽ_سيپٽمبر_آڪٽوبر_نومبر_ڊسمبر".split("_"), weekdaysMin: "آچر_سومر_اڱارو_اربع_خميس_جمع_ڇنڇر".split("_"), ordinal: function(t) {
        return t;
      }, formats: { LT: "HH:mm", LTS: "HH:mm:ss", L: "DD/MM/YYYY", LL: "D MMMM YYYY", LLL: "D MMMM YYYY HH:mm", LLLL: "dddd، D MMMM YYYY HH:mm" }, relativeTime: { future: "%s پوء", past: "%s اڳ", s: "چند سيڪنڊ", m: "هڪ منٽ", mm: "%d منٽ", h: "هڪ ڪلاڪ", hh: "%d ڪلاڪ", d: "هڪ ڏينهن", dd: "%d ڏينهن", M: "هڪ مهينو", MM: "%d مهينا", y: "هڪ سال", yy: "%d سال" } };
      return o.default.locale(s, null, !0), s;
    }));
  })(ta)), ta.exports;
}
var oY = XA();
const ZA = /* @__PURE__ */ A(oY), QA = /* @__PURE__ */ q({
  __proto__: null,
  default: ZA
}, [oY]);
var ra = { exports: {} }, eR = ra.exports, qf;
function tR() {
  return qf || (qf = 1, (function(e, a) {
    (function(n, r) {
      e.exports = r(P());
    })(eR, (function(n) {
      function r(t) {
        return t && typeof t == "object" && "default" in t ? t : { default: t };
      }
      var o = r(n), s = { name: "se", weekdays: "sotnabeaivi_vuossárga_maŋŋebárga_gaskavahkku_duorastat_bearjadat_lávvardat".split("_"), months: "ođđajagemánnu_guovvamánnu_njukčamánnu_cuoŋománnu_miessemánnu_geassemánnu_suoidnemánnu_borgemánnu_čakčamánnu_golggotmánnu_skábmamánnu_juovlamánnu".split("_"), weekStart: 1, weekdaysShort: "sotn_vuos_maŋ_gask_duor_bear_láv".split("_"), monthsShort: "ođđj_guov_njuk_cuo_mies_geas_suoi_borg_čakč_golg_skáb_juov".split("_"), weekdaysMin: "s_v_m_g_d_b_L".split("_"), ordinal: function(t) {
        return t;
      }, formats: { LT: "HH:mm", LTS: "HH:mm:ss", L: "DD.MM.YYYY", LL: "MMMM D. [b.] YYYY", LLL: "MMMM D. [b.] YYYY [ti.] HH:mm", LLLL: "dddd, MMMM D. [b.] YYYY [ti.] HH:mm" }, relativeTime: { future: "%s geažes", past: "maŋit %s", s: "moadde sekunddat", m: "okta minuhta", mm: "%d minuhtat", h: "okta diimmu", hh: "%d diimmut", d: "okta beaivi", dd: "%d beaivvit", M: "okta mánnu", MM: "%d mánut", y: "okta jahki", yy: "%d jagit" } };
      return o.default.locale(s, null, !0), s;
    }));
  })(ra)), ra.exports;
}
var sY = tR();
const rR = /* @__PURE__ */ A(sY), nR = /* @__PURE__ */ q({
  __proto__: null,
  default: rR
}, [sY]);
var na = { exports: {} }, aR = na.exports, Af;
function oR() {
  return Af || (Af = 1, (function(e, a) {
    (function(n, r) {
      e.exports = r(P());
    })(aR, (function(n) {
      function r(t) {
        return t && typeof t == "object" && "default" in t ? t : { default: t };
      }
      var o = r(n), s = { name: "si", weekdays: "ඉරිදා_සඳුදා_අඟහරුවාදා_බදාදා_බ්‍රහස්පතින්දා_සිකුරාදා_සෙනසුරාදා".split("_"), months: "දුරුතු_නවම්_මැදින්_බක්_වෙසක්_පොසොන්_ඇසළ_නිකිණි_බිනර_වප්_ඉල්_උඳුවප්".split("_"), weekdaysShort: "ඉරි_සඳු_අඟ_බදා_බ්‍රහ_සිකු_සෙන".split("_"), monthsShort: "දුරු_නව_මැදි_බක්_වෙස_පොසො_ඇස_නිකි_බින_වප්_ඉල්_උඳු".split("_"), weekdaysMin: "ඉ_ස_අ_බ_බ්‍ර_සි_සෙ".split("_"), ordinal: function(t) {
        return t;
      }, formats: { LT: "a h:mm", LTS: "a h:mm:ss", L: "YYYY/MM/DD", LL: "YYYY MMMM D", LLL: "YYYY MMMM D, a h:mm", LLLL: "YYYY MMMM D [වැනි] dddd, a h:mm:ss" }, relativeTime: { future: "%sකින්", past: "%sකට පෙර", s: "තත්පර කිහිපය", m: "විනාඩිය", mm: "විනාඩි %d", h: "පැය", hh: "පැය %d", d: "දිනය", dd: "දින %d", M: "මාසය", MM: "මාස %d", y: "වසර", yy: "වසර %d" } };
      return o.default.locale(s, null, !0), s;
    }));
  })(na)), na.exports;
}
var iY = oR();
const sR = /* @__PURE__ */ A(iY), iR = /* @__PURE__ */ q({
  __proto__: null,
  default: sR
}, [iY]);
var aa = { exports: {} }, uR = aa.exports, Rf;
function lR() {
  return Rf || (Rf = 1, (function(e, a) {
    (function(n, r) {
      e.exports = r(P());
    })(uR, (function(n) {
      function r(u) {
        return u && typeof u == "object" && "default" in u ? u : { default: u };
      }
      var o = r(n);
      function s(u) {
        return u > 1 && u < 5 && ~~(u / 10) != 1;
      }
      function t(u, l, d, c) {
        var _ = u + " ";
        switch (d) {
          case "s":
            return l || c ? "pár sekúnd" : "pár sekundami";
          case "m":
            return l ? "minúta" : c ? "minútu" : "minútou";
          case "mm":
            return l || c ? _ + (s(u) ? "minúty" : "minút") : _ + "minútami";
          case "h":
            return l ? "hodina" : c ? "hodinu" : "hodinou";
          case "hh":
            return l || c ? _ + (s(u) ? "hodiny" : "hodín") : _ + "hodinami";
          case "d":
            return l || c ? "deň" : "dňom";
          case "dd":
            return l || c ? _ + (s(u) ? "dni" : "dní") : _ + "dňami";
          case "M":
            return l || c ? "mesiac" : "mesiacom";
          case "MM":
            return l || c ? _ + (s(u) ? "mesiace" : "mesiacov") : _ + "mesiacmi";
          case "y":
            return l || c ? "rok" : "rokom";
          case "yy":
            return l || c ? _ + (s(u) ? "roky" : "rokov") : _ + "rokmi";
        }
      }
      var i = { name: "sk", weekdays: "nedeľa_pondelok_utorok_streda_štvrtok_piatok_sobota".split("_"), weekdaysShort: "ne_po_ut_st_št_pi_so".split("_"), weekdaysMin: "ne_po_ut_st_št_pi_so".split("_"), months: "január_február_marec_apríl_máj_jún_júl_august_september_október_november_december".split("_"), monthsShort: "jan_feb_mar_apr_máj_jún_júl_aug_sep_okt_nov_dec".split("_"), weekStart: 1, yearStart: 4, ordinal: function(u) {
        return u + ".";
      }, formats: { LT: "H:mm", LTS: "H:mm:ss", L: "DD.MM.YYYY", LL: "D. MMMM YYYY", LLL: "D. MMMM YYYY H:mm", LLLL: "dddd D. MMMM YYYY H:mm", l: "D. M. YYYY" }, relativeTime: { future: "za %s", past: "pred %s", s: t, m: t, mm: t, h: t, hh: t, d: t, dd: t, M: t, MM: t, y: t, yy: t } };
      return o.default.locale(i, null, !0), i;
    }));
  })(aa)), aa.exports;
}
var uY = lR();
const dR = /* @__PURE__ */ A(uY), cR = /* @__PURE__ */ q({
  __proto__: null,
  default: dR
}, [uY]);
var oa = { exports: {} }, _R = oa.exports, Pf;
function fR() {
  return Pf || (Pf = 1, (function(e, a) {
    (function(n, r) {
      e.exports = r(P());
    })(_R, (function(n) {
      function r(l) {
        return l && typeof l == "object" && "default" in l ? l : { default: l };
      }
      var o = r(n);
      function s(l) {
        return l % 100 == 2;
      }
      function t(l) {
        return l % 100 == 3 || l % 100 == 4;
      }
      function i(l, d, c, _) {
        var f = l + " ";
        switch (c) {
          case "s":
            return d || _ ? "nekaj sekund" : "nekaj sekundami";
          case "m":
            return d ? "ena minuta" : "eno minuto";
          case "mm":
            return s(l) ? f + (d || _ ? "minuti" : "minutama") : t(l) ? f + (d || _ ? "minute" : "minutami") : f + (d || _ ? "minut" : "minutami");
          case "h":
            return d ? "ena ura" : "eno uro";
          case "hh":
            return s(l) ? f + (d || _ ? "uri" : "urama") : t(l) ? f + (d || _ ? "ure" : "urami") : f + (d || _ ? "ur" : "urami");
          case "d":
            return d || _ ? "en dan" : "enim dnem";
          case "dd":
            return s(l) ? f + (d || _ ? "dneva" : "dnevoma") : f + (d || _ ? "dni" : "dnevi");
          case "M":
            return d || _ ? "en mesec" : "enim mesecem";
          case "MM":
            return s(l) ? f + (d || _ ? "meseca" : "mesecema") : t(l) ? f + (d || _ ? "mesece" : "meseci") : f + (d || _ ? "mesecev" : "meseci");
          case "y":
            return d || _ ? "eno leto" : "enim letom";
          case "yy":
            return s(l) ? f + (d || _ ? "leti" : "letoma") : t(l) ? f + (d || _ ? "leta" : "leti") : f + (d || _ ? "let" : "leti");
        }
      }
      var u = { name: "sl", weekdays: "nedelja_ponedeljek_torek_sreda_četrtek_petek_sobota".split("_"), months: "januar_februar_marec_april_maj_junij_julij_avgust_september_oktober_november_december".split("_"), weekStart: 1, weekdaysShort: "ned._pon._tor._sre._čet._pet._sob.".split("_"), monthsShort: "jan._feb._mar._apr._maj._jun._jul._avg._sep._okt._nov._dec.".split("_"), weekdaysMin: "ne_po_to_sr_če_pe_so".split("_"), ordinal: function(l) {
        return l + ".";
      }, formats: { LT: "H:mm", LTS: "H:mm:ss", L: "DD.MM.YYYY", LL: "D. MMMM YYYY", LLL: "D. MMMM YYYY H:mm", LLLL: "dddd, D. MMMM YYYY H:mm", l: "D. M. YYYY" }, relativeTime: { future: "čez %s", past: "pred %s", s: i, m: i, mm: i, h: i, hh: i, d: i, dd: i, M: i, MM: i, y: i, yy: i } };
      return o.default.locale(u, null, !0), u;
    }));
  })(oa)), oa.exports;
}
var lY = fR();
const mR = /* @__PURE__ */ A(lY), pR = /* @__PURE__ */ q({
  __proto__: null,
  default: mR
}, [lY]);
var sa = { exports: {} }, hR = sa.exports, If;
function vR() {
  return If || (If = 1, (function(e, a) {
    (function(n, r) {
      e.exports = r(P());
    })(hR, (function(n) {
      function r(t) {
        return t && typeof t == "object" && "default" in t ? t : { default: t };
      }
      var o = r(n), s = { name: "sq", weekdays: "E Diel_E Hënë_E Martë_E Mërkurë_E Enjte_E Premte_E Shtunë".split("_"), months: "Janar_Shkurt_Mars_Prill_Maj_Qershor_Korrik_Gusht_Shtator_Tetor_Nëntor_Dhjetor".split("_"), weekStart: 1, weekdaysShort: "Die_Hën_Mar_Mër_Enj_Pre_Sht".split("_"), monthsShort: "Jan_Shk_Mar_Pri_Maj_Qer_Kor_Gus_Sht_Tet_Nën_Dhj".split("_"), weekdaysMin: "D_H_Ma_Më_E_P_Sh".split("_"), ordinal: function(t) {
        return t;
      }, formats: { LT: "HH:mm", LTS: "HH:mm:ss", L: "DD/MM/YYYY", LL: "D MMMM YYYY", LLL: "D MMMM YYYY HH:mm", LLLL: "dddd, D MMMM YYYY HH:mm" }, relativeTime: { future: "në %s", past: "%s më parë", s: "disa sekonda", m: "një minutë", mm: "%d minuta", h: "një orë", hh: "%d orë", d: "një ditë", dd: "%d ditë", M: "një muaj", MM: "%d muaj", y: "një vit", yy: "%d vite" } };
      return o.default.locale(s, null, !0), s;
    }));
  })(sa)), sa.exports;
}
var dY = vR();
const yR = /* @__PURE__ */ A(dY), gR = /* @__PURE__ */ q({
  __proto__: null,
  default: yR
}, [dY]);
var ia = { exports: {} }, MR = ia.exports, Nf;
function bR() {
  return Nf || (Nf = 1, (function(e, a) {
    (function(n, r) {
      e.exports = r(P());
    })(MR, (function(n) {
      function r(i) {
        return i && typeof i == "object" && "default" in i ? i : { default: i };
      }
      var o = r(n), s = { words: { m: ["један минут", "једног минута"], mm: ["%d минут", "%d минута", "%d минута"], h: ["један сат", "једног сата"], hh: ["%d сат", "%d сата", "%d сати"], d: ["један дан", "једног дана"], dd: ["%d дан", "%d дана", "%d дана"], M: ["један месец", "једног месеца"], MM: ["%d месец", "%d месеца", "%d месеци"], y: ["једну годину", "једне године"], yy: ["%d годину", "%d године", "%d година"] }, correctGrammarCase: function(i, u) {
        return i % 10 >= 1 && i % 10 <= 4 && (i % 100 < 10 || i % 100 >= 20) ? i % 10 == 1 ? u[0] : u[1] : u[2];
      }, relativeTimeFormatter: function(i, u, l, d) {
        var c = s.words[l];
        if (l.length === 1) return l === "y" && u ? "једна година" : d || u ? c[0] : c[1];
        var _ = s.correctGrammarCase(i, c);
        return l === "yy" && u && _ === "%d годину" ? i + " година" : _.replace("%d", i);
      } }, t = { name: "sr-cyrl", weekdays: "Недеља_Понедељак_Уторак_Среда_Четвртак_Петак_Субота".split("_"), weekdaysShort: "Нед._Пон._Уто._Сре._Чет._Пет._Суб.".split("_"), weekdaysMin: "не_по_ут_ср_че_пе_су".split("_"), months: "Јануар_Фебруар_Март_Април_Мај_Јун_Јул_Август_Септембар_Октобар_Новембар_Децембар".split("_"), monthsShort: "Јан._Феб._Мар._Апр._Мај_Јун_Јул_Авг._Сеп._Окт._Нов._Дец.".split("_"), weekStart: 1, relativeTime: { future: "за %s", past: "пре %s", s: "неколико секунди", m: s.relativeTimeFormatter, mm: s.relativeTimeFormatter, h: s.relativeTimeFormatter, hh: s.relativeTimeFormatter, d: s.relativeTimeFormatter, dd: s.relativeTimeFormatter, M: s.relativeTimeFormatter, MM: s.relativeTimeFormatter, y: s.relativeTimeFormatter, yy: s.relativeTimeFormatter }, ordinal: function(i) {
        return i + ".";
      }, formats: { LT: "H:mm", LTS: "H:mm:ss", L: "D. M. YYYY.", LL: "D. MMMM YYYY.", LLL: "D. MMMM YYYY. H:mm", LLLL: "dddd, D. MMMM YYYY. H:mm" } };
      return o.default.locale(t, null, !0), t;
    }));
  })(ia)), ia.exports;
}
var cY = bR();
const YR = /* @__PURE__ */ A(cY), wR = /* @__PURE__ */ q({
  __proto__: null,
  default: YR
}, [cY]);
var ua = { exports: {} }, xR = ua.exports, Of;
function LR() {
  return Of || (Of = 1, (function(e, a) {
    (function(n, r) {
      e.exports = r(P());
    })(xR, (function(n) {
      function r(i) {
        return i && typeof i == "object" && "default" in i ? i : { default: i };
      }
      var o = r(n), s = { words: { m: ["jedan minut", "jednog minuta"], mm: ["%d minut", "%d minuta", "%d minuta"], h: ["jedan sat", "jednog sata"], hh: ["%d sat", "%d sata", "%d sati"], d: ["jedan dan", "jednog dana"], dd: ["%d dan", "%d dana", "%d dana"], M: ["jedan mesec", "jednog meseca"], MM: ["%d mesec", "%d meseca", "%d meseci"], y: ["jednu godinu", "jedne godine"], yy: ["%d godinu", "%d godine", "%d godina"] }, correctGrammarCase: function(i, u) {
        return i % 10 >= 1 && i % 10 <= 4 && (i % 100 < 10 || i % 100 >= 20) ? i % 10 == 1 ? u[0] : u[1] : u[2];
      }, relativeTimeFormatter: function(i, u, l, d) {
        var c = s.words[l];
        if (l.length === 1) return l === "y" && u ? "jedna godina" : d || u ? c[0] : c[1];
        var _ = s.correctGrammarCase(i, c);
        return l === "yy" && u && _ === "%d godinu" ? i + " godina" : _.replace("%d", i);
      } }, t = { name: "sr", weekdays: "Nedelja_Ponedeljak_Utorak_Sreda_Četvrtak_Petak_Subota".split("_"), weekdaysShort: "Ned._Pon._Uto._Sre._Čet._Pet._Sub.".split("_"), weekdaysMin: "ne_po_ut_sr_če_pe_su".split("_"), months: "Januar_Februar_Mart_April_Maj_Jun_Jul_Avgust_Septembar_Oktobar_Novembar_Decembar".split("_"), monthsShort: "Jan._Feb._Mar._Apr._Maj_Jun_Jul_Avg._Sep._Okt._Nov._Dec.".split("_"), weekStart: 1, relativeTime: { future: "za %s", past: "pre %s", s: "nekoliko sekundi", m: s.relativeTimeFormatter, mm: s.relativeTimeFormatter, h: s.relativeTimeFormatter, hh: s.relativeTimeFormatter, d: s.relativeTimeFormatter, dd: s.relativeTimeFormatter, M: s.relativeTimeFormatter, MM: s.relativeTimeFormatter, y: s.relativeTimeFormatter, yy: s.relativeTimeFormatter }, ordinal: function(i) {
        return i + ".";
      }, formats: { LT: "H:mm", LTS: "H:mm:ss", L: "D. M. YYYY.", LL: "D. MMMM YYYY.", LLL: "D. MMMM YYYY. H:mm", LLLL: "dddd, D. MMMM YYYY. H:mm" } };
      return o.default.locale(t, null, !0), t;
    }));
  })(ua)), ua.exports;
}
var _Y = LR();
const kR = /* @__PURE__ */ A(_Y), SR = /* @__PURE__ */ q({
  __proto__: null,
  default: kR
}, [_Y]);
var la = { exports: {} }, DR = la.exports, zf;
function TR() {
  return zf || (zf = 1, (function(e, a) {
    (function(n, r) {
      e.exports = r(P());
    })(DR, (function(n) {
      function r(t) {
        return t && typeof t == "object" && "default" in t ? t : { default: t };
      }
      var o = r(n), s = { name: "ss", weekdays: "Lisontfo_Umsombuluko_Lesibili_Lesitsatfu_Lesine_Lesihlanu_Umgcibelo".split("_"), months: "Bhimbidvwane_Indlovana_Indlov'lenkhulu_Mabasa_Inkhwekhweti_Inhlaba_Kholwane_Ingci_Inyoni_Imphala_Lweti_Ingongoni".split("_"), weekStart: 1, weekdaysShort: "Lis_Umb_Lsb_Les_Lsi_Lsh_Umg".split("_"), monthsShort: "Bhi_Ina_Inu_Mab_Ink_Inh_Kho_Igc_Iny_Imp_Lwe_Igo".split("_"), weekdaysMin: "Li_Us_Lb_Lt_Ls_Lh_Ug".split("_"), ordinal: function(t) {
        return t;
      }, formats: { LT: "h:mm A", LTS: "h:mm:ss A", L: "DD/MM/YYYY", LL: "D MMMM YYYY", LLL: "D MMMM YYYY h:mm A", LLLL: "dddd, D MMMM YYYY h:mm A" }, relativeTime: { future: "nga %s", past: "wenteka nga %s", s: "emizuzwana lomcane", m: "umzuzu", mm: "%d emizuzu", h: "lihora", hh: "%d emahora", d: "lilanga", dd: "%d emalanga", M: "inyanga", MM: "%d tinyanga", y: "umnyaka", yy: "%d iminyaka" } };
      return o.default.locale(s, null, !0), s;
    }));
  })(la)), la.exports;
}
var fY = TR();
const $R = /* @__PURE__ */ A(fY), HR = /* @__PURE__ */ q({
  __proto__: null,
  default: $R
}, [fY]);
var da = { exports: {} }, jR = da.exports, Ff;
function ER() {
  return Ff || (Ff = 1, (function(e, a) {
    (function(n, r) {
      e.exports = r(P());
    })(jR, (function(n) {
      function r(t) {
        return t && typeof t == "object" && "default" in t ? t : { default: t };
      }
      var o = r(n), s = { name: "sv-fi", weekdays: "söndag_måndag_tisdag_onsdag_torsdag_fredag_lördag".split("_"), weekdaysShort: "sön_mån_tis_ons_tor_fre_lör".split("_"), weekdaysMin: "sö_må_ti_on_to_fr_lö".split("_"), months: "januari_februari_mars_april_maj_juni_juli_augusti_september_oktober_november_december".split("_"), monthsShort: "jan_feb_mar_apr_maj_jun_jul_aug_sep_okt_nov_dec".split("_"), weekStart: 1, yearStart: 4, ordinal: function(t) {
        var i = t % 10;
        return "[" + t + (i === 1 || i === 2 ? "a" : "e") + "]";
      }, formats: { LT: "HH.mm", LTS: "HH.mm.ss", L: "DD.MM.YYYY", LL: "D. MMMM YYYY", LLL: "D. MMMM YYYY, [kl.] HH.mm", LLLL: "dddd, D. MMMM YYYY, [kl.] HH.mm", l: "D.M.YYYY", ll: "D. MMM YYYY", lll: "D. MMM YYYY, [kl.] HH.mm", llll: "ddd, D. MMM YYYY, [kl.] HH.mm" }, relativeTime: { future: "om %s", past: "för %s sedan", s: "några sekunder", m: "en minut", mm: "%d minuter", h: "en timme", hh: "%d timmar", d: "en dag", dd: "%d dagar", M: "en månad", MM: "%d månader", y: "ett år", yy: "%d år" } };
      return o.default.locale(s, null, !0), s;
    }));
  })(da)), da.exports;
}
var mY = ER();
const CR = /* @__PURE__ */ A(mY), qR = /* @__PURE__ */ q({
  __proto__: null,
  default: CR
}, [mY]);
var ca = { exports: {} }, AR = ca.exports, Bf;
function RR() {
  return Bf || (Bf = 1, (function(e, a) {
    (function(n, r) {
      e.exports = r(P());
    })(AR, (function(n) {
      function r(t) {
        return t && typeof t == "object" && "default" in t ? t : { default: t };
      }
      var o = r(n), s = { name: "sv", weekdays: "söndag_måndag_tisdag_onsdag_torsdag_fredag_lördag".split("_"), weekdaysShort: "sön_mån_tis_ons_tor_fre_lör".split("_"), weekdaysMin: "sö_må_ti_on_to_fr_lö".split("_"), months: "januari_februari_mars_april_maj_juni_juli_augusti_september_oktober_november_december".split("_"), monthsShort: "jan_feb_mar_apr_maj_jun_jul_aug_sep_okt_nov_dec".split("_"), weekStart: 1, yearStart: 4, ordinal: function(t) {
        var i = t % 10;
        return "[" + t + (i === 1 || i === 2 ? "a" : "e") + "]";
      }, formats: { LT: "HH:mm", LTS: "HH:mm:ss", L: "YYYY-MM-DD", LL: "D MMMM YYYY", LLL: "D MMMM YYYY [kl.] HH:mm", LLLL: "dddd D MMMM YYYY [kl.] HH:mm", lll: "D MMM YYYY HH:mm", llll: "ddd D MMM YYYY HH:mm" }, relativeTime: { future: "om %s", past: "för %s sedan", s: "några sekunder", m: "en minut", mm: "%d minuter", h: "en timme", hh: "%d timmar", d: "en dag", dd: "%d dagar", M: "en månad", MM: "%d månader", y: "ett år", yy: "%d år" } };
      return o.default.locale(s, null, !0), s;
    }));
  })(ca)), ca.exports;
}
var pY = RR();
const PR = /* @__PURE__ */ A(pY), IR = /* @__PURE__ */ q({
  __proto__: null,
  default: PR
}, [pY]);
var _a = { exports: {} }, NR = _a.exports, Gf;
function OR() {
  return Gf || (Gf = 1, (function(e, a) {
    (function(n, r) {
      e.exports = r(P());
    })(NR, (function(n) {
      function r(t) {
        return t && typeof t == "object" && "default" in t ? t : { default: t };
      }
      var o = r(n), s = { name: "sw", weekdays: "Jumapili_Jumatatu_Jumanne_Jumatano_Alhamisi_Ijumaa_Jumamosi".split("_"), weekdaysShort: "Jpl_Jtat_Jnne_Jtan_Alh_Ijm_Jmos".split("_"), weekdaysMin: "J2_J3_J4_J5_Al_Ij_J1".split("_"), months: "Januari_Februari_Machi_Aprili_Mei_Juni_Julai_Agosti_Septemba_Oktoba_Novemba_Desemba".split("_"), monthsShort: "Jan_Feb_Mac_Apr_Mei_Jun_Jul_Ago_Sep_Okt_Nov_Des".split("_"), weekStart: 1, ordinal: function(t) {
        return t;
      }, relativeTime: { future: "%s baadaye", past: "tokea %s", s: "hivi punde", m: "dakika moja", mm: "dakika %d", h: "saa limoja", hh: "masaa %d", d: "siku moja", dd: "masiku %d", M: "mwezi mmoja", MM: "miezi %d", y: "mwaka mmoja", yy: "miaka %d" }, formats: { LT: "HH:mm", LTS: "HH:mm:ss", L: "DD.MM.YYYY", LL: "D MMMM YYYY", LLL: "D MMMM YYYY HH:mm", LLLL: "dddd, D MMMM YYYY HH:mm" } };
      return o.default.locale(s, null, !0), s;
    }));
  })(_a)), _a.exports;
}
var hY = OR();
const zR = /* @__PURE__ */ A(hY), FR = /* @__PURE__ */ q({
  __proto__: null,
  default: zR
}, [hY]);
var fa = { exports: {} }, BR = fa.exports, Jf;
function GR() {
  return Jf || (Jf = 1, (function(e, a) {
    (function(n, r) {
      e.exports = r(P());
    })(BR, (function(n) {
      function r(t) {
        return t && typeof t == "object" && "default" in t ? t : { default: t };
      }
      var o = r(n), s = { name: "ta", weekdays: "ஞாயிற்றுக்கிழமை_திங்கட்கிழமை_செவ்வாய்கிழமை_புதன்கிழமை_வியாழக்கிழமை_வெள்ளிக்கிழமை_சனிக்கிழமை".split("_"), months: "ஜனவரி_பிப்ரவரி_மார்ச்_ஏப்ரல்_மே_ஜூன்_ஜூலை_ஆகஸ்ட்_செப்டெம்பர்_அக்டோபர்_நவம்பர்_டிசம்பர்".split("_"), weekdaysShort: "ஞாயிறு_திங்கள்_செவ்வாய்_புதன்_வியாழன்_வெள்ளி_சனி".split("_"), monthsShort: "ஜனவரி_பிப்ரவரி_மார்ச்_ஏப்ரல்_மே_ஜூன்_ஜூலை_ஆகஸ்ட்_செப்டெம்பர்_அக்டோபர்_நவம்பர்_டிசம்பர்".split("_"), weekdaysMin: "ஞா_தி_செ_பு_வி_வெ_ச".split("_"), ordinal: function(t) {
        return t;
      }, formats: { LT: "HH:mm", LTS: "HH:mm:ss", L: "DD/MM/YYYY", LL: "D MMMM YYYY", LLL: "D MMMM YYYY, HH:mm", LLLL: "dddd, D MMMM YYYY, HH:mm" }, relativeTime: { future: "%s இல்", past: "%s முன்", s: "ஒரு சில விநாடிகள்", m: "ஒரு நிமிடம்", mm: "%d நிமிடங்கள்", h: "ஒரு மணி நேரம்", hh: "%d மணி நேரம்", d: "ஒரு நாள்", dd: "%d நாட்கள்", M: "ஒரு மாதம்", MM: "%d மாதங்கள்", y: "ஒரு வருடம்", yy: "%d ஆண்டுகள்" } };
      return o.default.locale(s, null, !0), s;
    }));
  })(fa)), fa.exports;
}
var vY = GR();
const JR = /* @__PURE__ */ A(vY), UR = /* @__PURE__ */ q({
  __proto__: null,
  default: JR
}, [vY]);
var ma = { exports: {} }, WR = ma.exports, Uf;
function VR() {
  return Uf || (Uf = 1, (function(e, a) {
    (function(n, r) {
      e.exports = r(P());
    })(WR, (function(n) {
      function r(t) {
        return t && typeof t == "object" && "default" in t ? t : { default: t };
      }
      var o = r(n), s = { name: "te", weekdays: "ఆదివారం_సోమవారం_మంగళవారం_బుధవారం_గురువారం_శుక్రవారం_శనివారం".split("_"), months: "జనవరి_ఫిబ్రవరి_మార్చి_ఏప్రిల్_మే_జూన్_జులై_ఆగస్టు_సెప్టెంబర్_అక్టోబర్_నవంబర్_డిసెంబర్".split("_"), weekdaysShort: "ఆది_సోమ_మంగళ_బుధ_గురు_శుక్ర_శని".split("_"), monthsShort: "జన._ఫిబ్ర._మార్చి_ఏప్రి._మే_జూన్_జులై_ఆగ._సెప్._అక్టో._నవ._డిసె.".split("_"), weekdaysMin: "ఆ_సో_మం_బు_గు_శు_శ".split("_"), ordinal: function(t) {
        return t;
      }, formats: { LT: "A h:mm", LTS: "A h:mm:ss", L: "DD/MM/YYYY", LL: "D MMMM YYYY", LLL: "D MMMM YYYY, A h:mm", LLLL: "dddd, D MMMM YYYY, A h:mm" }, relativeTime: { future: "%s లో", past: "%s క్రితం", s: "కొన్ని క్షణాలు", m: "ఒక నిమిషం", mm: "%d నిమిషాలు", h: "ఒక గంట", hh: "%d గంటలు", d: "ఒక రోజు", dd: "%d రోజులు", M: "ఒక నెల", MM: "%d నెలలు", y: "ఒక సంవత్సరం", yy: "%d సంవత్సరాలు" } };
      return o.default.locale(s, null, !0), s;
    }));
  })(ma)), ma.exports;
}
var yY = VR();
const KR = /* @__PURE__ */ A(yY), XR = /* @__PURE__ */ q({
  __proto__: null,
  default: KR
}, [yY]);
var pa = { exports: {} }, ZR = pa.exports, Wf;
function QR() {
  return Wf || (Wf = 1, (function(e, a) {
    (function(n, r) {
      e.exports = r(P());
    })(ZR, (function(n) {
      function r(t) {
        return t && typeof t == "object" && "default" in t ? t : { default: t };
      }
      var o = r(n), s = { name: "tet", weekdays: "Domingu_Segunda_Tersa_Kuarta_Kinta_Sesta_Sabadu".split("_"), months: "Janeiru_Fevereiru_Marsu_Abril_Maiu_Juñu_Jullu_Agustu_Setembru_Outubru_Novembru_Dezembru".split("_"), weekStart: 1, weekdaysShort: "Dom_Seg_Ters_Kua_Kint_Sest_Sab".split("_"), monthsShort: "Jan_Fev_Mar_Abr_Mai_Jun_Jul_Ago_Set_Out_Nov_Dez".split("_"), weekdaysMin: "Do_Seg_Te_Ku_Ki_Ses_Sa".split("_"), ordinal: function(t) {
        return t;
      }, formats: { LT: "HH:mm", LTS: "HH:mm:ss", L: "DD/MM/YYYY", LL: "D MMMM YYYY", LLL: "D MMMM YYYY HH:mm", LLLL: "dddd, D MMMM YYYY HH:mm" }, relativeTime: { future: "iha %s", past: "%s liuba", s: "minutu balun", m: "minutu ida", mm: "minutu %d", h: "oras ida", hh: "oras %d", d: "loron ida", dd: "loron %d", M: "fulan ida", MM: "fulan %d", y: "tinan ida", yy: "tinan %d" } };
      return o.default.locale(s, null, !0), s;
    }));
  })(pa)), pa.exports;
}
var gY = QR();
const eP = /* @__PURE__ */ A(gY), tP = /* @__PURE__ */ q({
  __proto__: null,
  default: eP
}, [gY]);
var ha = { exports: {} }, rP = ha.exports, Vf;
function nP() {
  return Vf || (Vf = 1, (function(e, a) {
    (function(n, r) {
      e.exports = r(P());
    })(rP, (function(n) {
      function r(t) {
        return t && typeof t == "object" && "default" in t ? t : { default: t };
      }
      var o = r(n), s = { name: "tg", weekdays: "якшанбе_душанбе_сешанбе_чоршанбе_панҷшанбе_ҷумъа_шанбе".split("_"), months: "январ_феврал_март_апрел_май_июн_июл_август_сентябр_октябр_ноябр_декабр".split("_"), weekStart: 1, weekdaysShort: "яшб_дшб_сшб_чшб_пшб_ҷум_шнб".split("_"), monthsShort: "янв_фев_мар_апр_май_июн_июл_авг_сен_окт_ноя_дек".split("_"), weekdaysMin: "яш_дш_сш_чш_пш_ҷм_шб".split("_"), ordinal: function(t) {
        return t;
      }, formats: { LT: "HH:mm", LTS: "HH:mm:ss", L: "DD/MM/YYYY", LL: "D MMMM YYYY", LLL: "D MMMM YYYY HH:mm", LLLL: "dddd, D MMMM YYYY HH:mm" }, relativeTime: { future: "баъди %s", past: "%s пеш", s: "якчанд сония", m: "як дақиқа", mm: "%d дақиқа", h: "як соат", hh: "%d соат", d: "як рӯз", dd: "%d рӯз", M: "як моҳ", MM: "%d моҳ", y: "як сол", yy: "%d сол" } };
      return o.default.locale(s, null, !0), s;
    }));
  })(ha)), ha.exports;
}
var MY = nP();
const aP = /* @__PURE__ */ A(MY), oP = /* @__PURE__ */ q({
  __proto__: null,
  default: aP
}, [MY]);
var va = { exports: {} }, sP = va.exports, Kf;
function iP() {
  return Kf || (Kf = 1, (function(e, a) {
    (function(n, r) {
      e.exports = r(P());
    })(sP, (function(n) {
      function r(t) {
        return t && typeof t == "object" && "default" in t ? t : { default: t };
      }
      var o = r(n), s = { name: "th", weekdays: "อาทิตย์_จันทร์_อังคาร_พุธ_พฤหัสบดี_ศุกร์_เสาร์".split("_"), weekdaysShort: "อาทิตย์_จันทร์_อังคาร_พุธ_พฤหัส_ศุกร์_เสาร์".split("_"), weekdaysMin: "อา._จ._อ._พ._พฤ._ศ._ส.".split("_"), months: "มกราคม_กุมภาพันธ์_มีนาคม_เมษายน_พฤษภาคม_มิถุนายน_กรกฎาคม_สิงหาคม_กันยายน_ตุลาคม_พฤศจิกายน_ธันวาคม".split("_"), monthsShort: "ม.ค._ก.พ._มี.ค._เม.ย._พ.ค._มิ.ย._ก.ค._ส.ค._ก.ย._ต.ค._พ.ย._ธ.ค.".split("_"), formats: { LT: "H:mm", LTS: "H:mm:ss", L: "DD/MM/YYYY", LL: "D MMMM YYYY", LLL: "D MMMM YYYY เวลา H:mm", LLLL: "วันddddที่ D MMMM YYYY เวลา H:mm" }, relativeTime: { future: "อีก %s", past: "%sที่แล้ว", s: "ไม่กี่วินาที", m: "1 นาที", mm: "%d นาที", h: "1 ชั่วโมง", hh: "%d ชั่วโมง", d: "1 วัน", dd: "%d วัน", M: "1 เดือน", MM: "%d เดือน", y: "1 ปี", yy: "%d ปี" }, ordinal: function(t) {
        return t + ".";
      } };
      return o.default.locale(s, null, !0), s;
    }));
  })(va)), va.exports;
}
var bY = iP();
const uP = /* @__PURE__ */ A(bY), lP = /* @__PURE__ */ q({
  __proto__: null,
  default: uP
}, [bY]);
var ya = { exports: {} }, dP = ya.exports, Xf;
function cP() {
  return Xf || (Xf = 1, (function(e, a) {
    (function(n, r) {
      e.exports = r(P());
    })(dP, (function(n) {
      function r(t) {
        return t && typeof t == "object" && "default" in t ? t : { default: t };
      }
      var o = r(n), s = { name: "tk", weekdays: "Ýekşenbe_Duşenbe_Sişenbe_Çarşenbe_Penşenbe_Anna_Şenbe".split("_"), weekdaysShort: "Ýek_Duş_Siş_Çar_Pen_Ann_Şen".split("_"), weekdaysMin: "Ýk_Dş_Sş_Çr_Pn_An_Şn".split("_"), months: "Ýanwar_Fewral_Mart_Aprel_Maý_Iýun_Iýul_Awgust_Sentýabr_Oktýabr_Noýabr_Dekabr".split("_"), monthsShort: "Ýan_Few_Mar_Apr_Maý_Iýn_Iýl_Awg_Sen_Okt_Noý_Dek".split("_"), weekStart: 1, formats: { LT: "HH:mm", LTS: "HH:mm:ss", L: "DD.MM.YYYY", LL: "D MMMM YYYY", LLL: "D MMMM YYYY HH:mm", LLLL: "dddd, D MMMM YYYY HH:mm" }, relativeTime: { future: "%s soň", past: "%s öň", s: "birnäçe sekunt", m: "bir minut", mm: "%d minut", h: "bir sagat", hh: "%d sagat", d: "bir gün", dd: "%d gün", M: "bir aý", MM: "%d aý", y: "bir ýyl", yy: "%d ýyl" }, ordinal: function(t) {
        return t + ".";
      } };
      return o.default.locale(s, null, !0), s;
    }));
  })(ya)), ya.exports;
}
var YY = cP();
const _P = /* @__PURE__ */ A(YY), fP = /* @__PURE__ */ q({
  __proto__: null,
  default: _P
}, [YY]);
var ga = { exports: {} }, mP = ga.exports, Zf;
function pP() {
  return Zf || (Zf = 1, (function(e, a) {
    (function(n, r) {
      e.exports = r(P());
    })(mP, (function(n) {
      function r(t) {
        return t && typeof t == "object" && "default" in t ? t : { default: t };
      }
      var o = r(n), s = { name: "tl-ph", weekdays: "Linggo_Lunes_Martes_Miyerkules_Huwebes_Biyernes_Sabado".split("_"), months: "Enero_Pebrero_Marso_Abril_Mayo_Hunyo_Hulyo_Agosto_Setyembre_Oktubre_Nobyembre_Disyembre".split("_"), weekStart: 1, weekdaysShort: "Lin_Lun_Mar_Miy_Huw_Biy_Sab".split("_"), monthsShort: "Ene_Peb_Mar_Abr_May_Hun_Hul_Ago_Set_Okt_Nob_Dis".split("_"), weekdaysMin: "Li_Lu_Ma_Mi_Hu_Bi_Sab".split("_"), ordinal: function(t) {
        return t;
      }, formats: { LT: "HH:mm", LTS: "HH:mm:ss", L: "MM/D/YYYY", LL: "MMMM D, YYYY", LLL: "MMMM D, YYYY HH:mm", LLLL: "dddd, MMMM DD, YYYY HH:mm" }, relativeTime: { future: "sa loob ng %s", past: "%s ang nakalipas", s: "ilang segundo", m: "isang minuto", mm: "%d minuto", h: "isang oras", hh: "%d oras", d: "isang araw", dd: "%d araw", M: "isang buwan", MM: "%d buwan", y: "isang taon", yy: "%d taon" } };
      return o.default.locale(s, null, !0), s;
    }));
  })(ga)), ga.exports;
}
var wY = pP();
const hP = /* @__PURE__ */ A(wY), vP = /* @__PURE__ */ q({
  __proto__: null,
  default: hP
}, [wY]);
var Ma = { exports: {} }, yP = Ma.exports, Qf;
function gP() {
  return Qf || (Qf = 1, (function(e, a) {
    (function(n, r) {
      e.exports = r(P());
    })(yP, (function(n) {
      function r(t) {
        return t && typeof t == "object" && "default" in t ? t : { default: t };
      }
      var o = r(n), s = { name: "tlh", weekdays: "lojmItjaj_DaSjaj_povjaj_ghItlhjaj_loghjaj_buqjaj_ghInjaj".split("_"), months: "tera’ jar wa’_tera’ jar cha’_tera’ jar wej_tera’ jar loS_tera’ jar vagh_tera’ jar jav_tera’ jar Soch_tera’ jar chorgh_tera’ jar Hut_tera’ jar wa’maH_tera’ jar wa’maH wa’_tera’ jar wa’maH cha’".split("_"), weekStart: 1, weekdaysShort: "lojmItjaj_DaSjaj_povjaj_ghItlhjaj_loghjaj_buqjaj_ghInjaj".split("_"), monthsShort: "jar wa’_jar cha’_jar wej_jar loS_jar vagh_jar jav_jar Soch_jar chorgh_jar Hut_jar wa’maH_jar wa’maH wa’_jar wa’maH cha’".split("_"), weekdaysMin: "lojmItjaj_DaSjaj_povjaj_ghItlhjaj_loghjaj_buqjaj_ghInjaj".split("_"), ordinal: function(t) {
        return t;
      }, formats: { LT: "HH:mm", LTS: "HH:mm:ss", L: "DD.MM.YYYY", LL: "D MMMM YYYY", LLL: "D MMMM YYYY HH:mm", LLLL: "dddd, D MMMM YYYY HH:mm" } };
      return o.default.locale(s, null, !0), s;
    }));
  })(Ma)), Ma.exports;
}
var xY = gP();
const MP = /* @__PURE__ */ A(xY), bP = /* @__PURE__ */ q({
  __proto__: null,
  default: MP
}, [xY]);
var ba = { exports: {} }, YP = ba.exports, em;
function wP() {
  return em || (em = 1, (function(e, a) {
    (function(n, r) {
      e.exports = r(P());
    })(YP, (function(n) {
      function r(t) {
        return t && typeof t == "object" && "default" in t ? t : { default: t };
      }
      var o = r(n), s = { name: "tr", weekdays: "Pazar_Pazartesi_Salı_Çarşamba_Perşembe_Cuma_Cumartesi".split("_"), weekdaysShort: "Paz_Pts_Sal_Çar_Per_Cum_Cts".split("_"), weekdaysMin: "Pz_Pt_Sa_Ça_Pe_Cu_Ct".split("_"), months: "Ocak_Şubat_Mart_Nisan_Mayıs_Haziran_Temmuz_Ağustos_Eylül_Ekim_Kasım_Aralık".split("_"), monthsShort: "Oca_Şub_Mar_Nis_May_Haz_Tem_Ağu_Eyl_Eki_Kas_Ara".split("_"), weekStart: 1, formats: { LT: "HH:mm", LTS: "HH:mm:ss", L: "DD.MM.YYYY", LL: "D MMMM YYYY", LLL: "D MMMM YYYY HH:mm", LLLL: "dddd, D MMMM YYYY HH:mm" }, relativeTime: { future: "%s sonra", past: "%s önce", s: "birkaç saniye", m: "bir dakika", mm: "%d dakika", h: "bir saat", hh: "%d saat", d: "bir gün", dd: "%d gün", M: "bir ay", MM: "%d ay", y: "bir yıl", yy: "%d yıl" }, ordinal: function(t) {
        return t + ".";
      } };
      return o.default.locale(s, null, !0), s;
    }));
  })(ba)), ba.exports;
}
var LY = wP();
const xP = /* @__PURE__ */ A(LY), LP = /* @__PURE__ */ q({
  __proto__: null,
  default: xP
}, [LY]);
var Ya = { exports: {} }, kP = Ya.exports, tm;
function SP() {
  return tm || (tm = 1, (function(e, a) {
    (function(n, r) {
      e.exports = r(P());
    })(kP, (function(n) {
      function r(t) {
        return t && typeof t == "object" && "default" in t ? t : { default: t };
      }
      var o = r(n), s = { name: "tzl", weekdays: "Súladi_Lúneçi_Maitzi_Márcuri_Xhúadi_Viénerçi_Sáturi".split("_"), months: "Januar_Fevraglh_Març_Avrïu_Mai_Gün_Julia_Guscht_Setemvar_Listopäts_Noemvar_Zecemvar".split("_"), weekStart: 1, weekdaysShort: "Súl_Lún_Mai_Már_Xhú_Vié_Sát".split("_"), monthsShort: "Jan_Fev_Mar_Avr_Mai_Gün_Jul_Gus_Set_Lis_Noe_Zec".split("_"), weekdaysMin: "Sú_Lú_Ma_Má_Xh_Vi_Sá".split("_"), ordinal: function(t) {
        return t;
      }, formats: { LT: "HH.mm", LTS: "HH.mm.ss", L: "DD.MM.YYYY", LL: "D. MMMM [dallas] YYYY", LLL: "D. MMMM [dallas] YYYY HH.mm", LLLL: "dddd, [li] D. MMMM [dallas] YYYY HH.mm" } };
      return o.default.locale(s, null, !0), s;
    }));
  })(Ya)), Ya.exports;
}
var kY = SP();
const DP = /* @__PURE__ */ A(kY), TP = /* @__PURE__ */ q({
  __proto__: null,
  default: DP
}, [kY]);
var wa = { exports: {} }, $P = wa.exports, rm;
function HP() {
  return rm || (rm = 1, (function(e, a) {
    (function(n, r) {
      e.exports = r(P());
    })($P, (function(n) {
      function r(t) {
        return t && typeof t == "object" && "default" in t ? t : { default: t };
      }
      var o = r(n), s = { name: "tzm-latn", weekdays: "asamas_aynas_asinas_akras_akwas_asimwas_asiḍyas".split("_"), months: "innayr_brˤayrˤ_marˤsˤ_ibrir_mayyw_ywnyw_ywlywz_ɣwšt_šwtanbir_ktˤwbrˤ_nwwanbir_dwjnbir".split("_"), weekStart: 6, weekdaysShort: "asamas_aynas_asinas_akras_akwas_asimwas_asiḍyas".split("_"), monthsShort: "innayr_brˤayrˤ_marˤsˤ_ibrir_mayyw_ywnyw_ywlywz_ɣwšt_šwtanbir_ktˤwbrˤ_nwwanbir_dwjnbir".split("_"), weekdaysMin: "asamas_aynas_asinas_akras_akwas_asimwas_asiḍyas".split("_"), ordinal: function(t) {
        return t;
      }, formats: { LT: "HH:mm", LTS: "HH:mm:ss", L: "DD/MM/YYYY", LL: "D MMMM YYYY", LLL: "D MMMM YYYY HH:mm", LLLL: "dddd D MMMM YYYY HH:mm" }, relativeTime: { future: "dadkh s yan %s", past: "yan %s", s: "imik", m: "minuḍ", mm: "%d minuḍ", h: "saɛa", hh: "%d tassaɛin", d: "ass", dd: "%d ossan", M: "ayowr", MM: "%d iyyirn", y: "asgas", yy: "%d isgasn" } };
      return o.default.locale(s, null, !0), s;
    }));
  })(wa)), wa.exports;
}
var SY = HP();
const jP = /* @__PURE__ */ A(SY), EP = /* @__PURE__ */ q({
  __proto__: null,
  default: jP
}, [SY]);
var xa = { exports: {} }, CP = xa.exports, nm;
function qP() {
  return nm || (nm = 1, (function(e, a) {
    (function(n, r) {
      e.exports = r(P());
    })(CP, (function(n) {
      function r(t) {
        return t && typeof t == "object" && "default" in t ? t : { default: t };
      }
      var o = r(n), s = { name: "tzm", weekdays: "ⴰⵙⴰⵎⴰⵙ_ⴰⵢⵏⴰⵙ_ⴰⵙⵉⵏⴰⵙ_ⴰⴽⵔⴰⵙ_ⴰⴽⵡⴰⵙ_ⴰⵙⵉⵎⵡⴰⵙ_ⴰⵙⵉⴹⵢⴰⵙ".split("_"), months: "ⵉⵏⵏⴰⵢⵔ_ⴱⵕⴰⵢⵕ_ⵎⴰⵕⵚ_ⵉⴱⵔⵉⵔ_ⵎⴰⵢⵢⵓ_ⵢⵓⵏⵢⵓ_ⵢⵓⵍⵢⵓⵣ_ⵖⵓⵛⵜ_ⵛⵓⵜⴰⵏⴱⵉⵔ_ⴽⵟⵓⴱⵕ_ⵏⵓⵡⴰⵏⴱⵉⵔ_ⴷⵓⵊⵏⴱⵉⵔ".split("_"), weekStart: 6, weekdaysShort: "ⴰⵙⴰⵎⴰⵙ_ⴰⵢⵏⴰⵙ_ⴰⵙⵉⵏⴰⵙ_ⴰⴽⵔⴰⵙ_ⴰⴽⵡⴰⵙ_ⴰⵙⵉⵎⵡⴰⵙ_ⴰⵙⵉⴹⵢⴰⵙ".split("_"), monthsShort: "ⵉⵏⵏⴰⵢⵔ_ⴱⵕⴰⵢⵕ_ⵎⴰⵕⵚ_ⵉⴱⵔⵉⵔ_ⵎⴰⵢⵢⵓ_ⵢⵓⵏⵢⵓ_ⵢⵓⵍⵢⵓⵣ_ⵖⵓⵛⵜ_ⵛⵓⵜⴰⵏⴱⵉⵔ_ⴽⵟⵓⴱⵕ_ⵏⵓⵡⴰⵏⴱⵉⵔ_ⴷⵓⵊⵏⴱⵉⵔ".split("_"), weekdaysMin: "ⴰⵙⴰⵎⴰⵙ_ⴰⵢⵏⴰⵙ_ⴰⵙⵉⵏⴰⵙ_ⴰⴽⵔⴰⵙ_ⴰⴽⵡⴰⵙ_ⴰⵙⵉⵎⵡⴰⵙ_ⴰⵙⵉⴹⵢⴰⵙ".split("_"), ordinal: function(t) {
        return t;
      }, formats: { LT: "HH:mm", LTS: "HH:mm:ss", L: "DD/MM/YYYY", LL: "D MMMM YYYY", LLL: "D MMMM YYYY HH:mm", LLLL: "dddd D MMMM YYYY HH:mm" }, relativeTime: { future: "ⴷⴰⴷⵅ ⵙ ⵢⴰⵏ %s", past: "ⵢⴰⵏ %s", s: "ⵉⵎⵉⴽ", m: "ⵎⵉⵏⵓⴺ", mm: "%d ⵎⵉⵏⵓⴺ", h: "ⵙⴰⵄⴰ", hh: "%d ⵜⴰⵙⵙⴰⵄⵉⵏ", d: "ⴰⵙⵙ", dd: "%d oⵙⵙⴰⵏ", M: "ⴰⵢoⵓⵔ", MM: "%d ⵉⵢⵢⵉⵔⵏ", y: "ⴰⵙⴳⴰⵙ", yy: "%d ⵉⵙⴳⴰⵙⵏ" } };
      return o.default.locale(s, null, !0), s;
    }));
  })(xa)), xa.exports;
}
var DY = qP();
const AP = /* @__PURE__ */ A(DY), RP = /* @__PURE__ */ q({
  __proto__: null,
  default: AP
}, [DY]);
var La = { exports: {} }, PP = La.exports, am;
function IP() {
  return am || (am = 1, (function(e, a) {
    (function(n, r) {
      e.exports = r(P());
    })(PP, (function(n) {
      function r(t) {
        return t && typeof t == "object" && "default" in t ? t : { default: t };
      }
      var o = r(n), s = { name: "ug-cn", weekdays: "يەكشەنبە_دۈشەنبە_سەيشەنبە_چارشەنبە_پەيشەنبە_جۈمە_شەنبە".split("_"), months: "يانۋار_فېۋرال_مارت_ئاپرېل_ماي_ئىيۇن_ئىيۇل_ئاۋغۇست_سېنتەبىر_ئۆكتەبىر_نويابىر_دېكابىر".split("_"), weekStart: 1, weekdaysShort: "يە_دۈ_سە_چا_پە_جۈ_شە".split("_"), monthsShort: "يانۋار_فېۋرال_مارت_ئاپرېل_ماي_ئىيۇن_ئىيۇل_ئاۋغۇست_سېنتەبىر_ئۆكتەبىر_نويابىر_دېكابىر".split("_"), weekdaysMin: "يە_دۈ_سە_چا_پە_جۈ_شە".split("_"), ordinal: function(t) {
        return t;
      }, formats: { LT: "HH:mm", LTS: "HH:mm:ss", L: "YYYY-MM-DD", LL: "YYYY-يىلىM-ئاينىڭD-كۈنى", LLL: "YYYY-يىلىM-ئاينىڭD-كۈنى، HH:mm", LLLL: "dddd، YYYY-يىلىM-ئاينىڭD-كۈنى، HH:mm" }, relativeTime: { future: "%s كېيىن", past: "%s بۇرۇن", s: "نەچچە سېكونت", m: "بىر مىنۇت", mm: "%d مىنۇت", h: "بىر سائەت", hh: "%d سائەت", d: "بىر كۈن", dd: "%d كۈن", M: "بىر ئاي", MM: "%d ئاي", y: "بىر يىل", yy: "%d يىل" } };
      return o.default.locale(s, null, !0), s;
    }));
  })(La)), La.exports;
}
var TY = IP();
const NP = /* @__PURE__ */ A(TY), OP = /* @__PURE__ */ q({
  __proto__: null,
  default: NP
}, [TY]);
var ka = { exports: {} }, zP = ka.exports, om;
function FP() {
  return om || (om = 1, (function(e, a) {
    (function(n, r) {
      e.exports = r(P());
    })(zP, (function(n) {
      function r(c) {
        return c && typeof c == "object" && "default" in c ? c : { default: c };
      }
      var o = r(n), s = "січня_лютого_березня_квітня_травня_червня_липня_серпня_вересня_жовтня_листопада_грудня".split("_"), t = "січень_лютий_березень_квітень_травень_червень_липень_серпень_вересень_жовтень_листопад_грудень".split("_"), i = /D[oD]?(\[[^[\]]*\]|\s)+MMMM?/;
      function u(c, _, f) {
        var m, h;
        return f === "m" ? _ ? "хвилина" : "хвилину" : f === "h" ? _ ? "година" : "годину" : c + " " + (m = +c, h = { ss: _ ? "секунда_секунди_секунд" : "секунду_секунди_секунд", mm: _ ? "хвилина_хвилини_хвилин" : "хвилину_хвилини_хвилин", hh: _ ? "година_години_годин" : "годину_години_годин", dd: "день_дні_днів", MM: "місяць_місяці_місяців", yy: "рік_роки_років" }[f].split("_"), m % 10 == 1 && m % 100 != 11 ? h[0] : m % 10 >= 2 && m % 10 <= 4 && (m % 100 < 10 || m % 100 >= 20) ? h[1] : h[2]);
      }
      var l = function(c, _) {
        return i.test(_) ? s[c.month()] : t[c.month()];
      };
      l.s = t, l.f = s;
      var d = { name: "uk", weekdays: "неділя_понеділок_вівторок_середа_четвер_п’ятниця_субота".split("_"), weekdaysShort: "ндл_пнд_втр_срд_чтв_птн_сбт".split("_"), weekdaysMin: "нд_пн_вт_ср_чт_пт_сб".split("_"), months: l, monthsShort: "січ_лют_бер_квіт_трав_черв_лип_серп_вер_жовт_лист_груд".split("_"), weekStart: 1, relativeTime: { future: "за %s", past: "%s тому", s: "декілька секунд", m: u, mm: u, h: u, hh: u, d: "день", dd: u, M: "місяць", MM: u, y: "рік", yy: u }, ordinal: function(c) {
        return c;
      }, formats: { LT: "HH:mm", LTS: "HH:mm:ss", L: "DD.MM.YYYY", LL: "D MMMM YYYY р.", LLL: "D MMMM YYYY р., HH:mm", LLLL: "dddd, D MMMM YYYY р., HH:mm" } };
      return o.default.locale(d, null, !0), d;
    }));
  })(ka)), ka.exports;
}
var $Y = FP();
const BP = /* @__PURE__ */ A($Y), GP = /* @__PURE__ */ q({
  __proto__: null,
  default: BP
}, [$Y]);
var Sa = { exports: {} }, JP = Sa.exports, sm;
function UP() {
  return sm || (sm = 1, (function(e, a) {
    (function(n, r) {
      e.exports = r(P());
    })(JP, (function(n) {
      function r(t) {
        return t && typeof t == "object" && "default" in t ? t : { default: t };
      }
      var o = r(n), s = { name: "ur", weekdays: "اتوار_پیر_منگل_بدھ_جمعرات_جمعہ_ہفتہ".split("_"), months: "جنوری_فروری_مارچ_اپریل_مئی_جون_جولائی_اگست_ستمبر_اکتوبر_نومبر_دسمبر".split("_"), weekStart: 1, weekdaysShort: "اتوار_پیر_منگل_بدھ_جمعرات_جمعہ_ہفتہ".split("_"), monthsShort: "جنوری_فروری_مارچ_اپریل_مئی_جون_جولائی_اگست_ستمبر_اکتوبر_نومبر_دسمبر".split("_"), weekdaysMin: "اتوار_پیر_منگل_بدھ_جمعرات_جمعہ_ہفتہ".split("_"), ordinal: function(t) {
        return t;
      }, formats: { LT: "HH:mm", LTS: "HH:mm:ss", L: "DD/MM/YYYY", LL: "D MMMM YYYY", LLL: "D MMMM YYYY HH:mm", LLLL: "dddd، D MMMM YYYY HH:mm" }, relativeTime: { future: "%s بعد", past: "%s قبل", s: "چند سیکنڈ", m: "ایک منٹ", mm: "%d منٹ", h: "ایک گھنٹہ", hh: "%d گھنٹے", d: "ایک دن", dd: "%d دن", M: "ایک ماہ", MM: "%d ماہ", y: "ایک سال", yy: "%d سال" } };
      return o.default.locale(s, null, !0), s;
    }));
  })(Sa)), Sa.exports;
}
var HY = UP();
const WP = /* @__PURE__ */ A(HY), VP = /* @__PURE__ */ q({
  __proto__: null,
  default: WP
}, [HY]);
var Da = { exports: {} }, KP = Da.exports, im;
function XP() {
  return im || (im = 1, (function(e, a) {
    (function(n, r) {
      e.exports = r(P());
    })(KP, (function(n) {
      function r(t) {
        return t && typeof t == "object" && "default" in t ? t : { default: t };
      }
      var o = r(n), s = { name: "uz-latn", weekdays: "Yakshanba_Dushanba_Seshanba_Chorshanba_Payshanba_Juma_Shanba".split("_"), months: "Yanvar_Fevral_Mart_Aprel_May_Iyun_Iyul_Avgust_Sentabr_Oktabr_Noyabr_Dekabr".split("_"), weekStart: 1, weekdaysShort: "Yak_Dush_Sesh_Chor_Pay_Jum_Shan".split("_"), monthsShort: "Yan_Fev_Mar_Apr_May_Iyun_Iyul_Avg_Sen_Okt_Noy_Dek".split("_"), weekdaysMin: "Ya_Du_Se_Cho_Pa_Ju_Sha".split("_"), ordinal: function(t) {
        return t;
      }, formats: { LT: "HH:mm", LTS: "HH:mm:ss", L: "DD/MM/YYYY", LL: "D MMMM YYYY", LLL: "D MMMM YYYY HH:mm", LLLL: "D MMMM YYYY, dddd HH:mm" }, relativeTime: { future: "Yaqin %s ichida", past: "%s oldin", s: "soniya", m: "bir daqiqa", mm: "%d daqiqa", h: "bir soat", hh: "%d soat", d: "bir kun", dd: "%d kun", M: "bir oy", MM: "%d oy", y: "bir yil", yy: "%d yil" } };
      return o.default.locale(s, null, !0), s;
    }));
  })(Da)), Da.exports;
}
var jY = XP();
const ZP = /* @__PURE__ */ A(jY), QP = /* @__PURE__ */ q({
  __proto__: null,
  default: ZP
}, [jY]);
var Ta = { exports: {} }, eI = Ta.exports, um;
function tI() {
  return um || (um = 1, (function(e, a) {
    (function(n, r) {
      e.exports = r(P());
    })(eI, (function(n) {
      function r(t) {
        return t && typeof t == "object" && "default" in t ? t : { default: t };
      }
      var o = r(n), s = { name: "uz", weekdays: "Якшанба_Душанба_Сешанба_Чоршанба_Пайшанба_Жума_Шанба".split("_"), months: "январ_феврал_март_апрел_май_июн_июл_август_сентябр_октябр_ноябр_декабр".split("_"), weekStart: 1, weekdaysShort: "Якш_Душ_Сеш_Чор_Пай_Жум_Шан".split("_"), monthsShort: "янв_фев_мар_апр_май_июн_июл_авг_сен_окт_ноя_дек".split("_"), weekdaysMin: "Як_Ду_Се_Чо_Па_Жу_Ша".split("_"), ordinal: function(t) {
        return t;
      }, formats: { LT: "HH:mm", LTS: "HH:mm:ss", L: "DD/MM/YYYY", LL: "D MMMM YYYY", LLL: "D MMMM YYYY HH:mm", LLLL: "D MMMM YYYY, dddd HH:mm" }, relativeTime: { future: "Якин %s ичида", past: "%s олдин", s: "фурсат", m: "бир дакика", mm: "%d дакика", h: "бир соат", hh: "%d соат", d: "бир кун", dd: "%d кун", M: "бир ой", MM: "%d ой", y: "бир йил", yy: "%d йил" } };
      return o.default.locale(s, null, !0), s;
    }));
  })(Ta)), Ta.exports;
}
var EY = tI();
const rI = /* @__PURE__ */ A(EY), nI = /* @__PURE__ */ q({
  __proto__: null,
  default: rI
}, [EY]);
var $a = { exports: {} }, aI = $a.exports, lm;
function oI() {
  return lm || (lm = 1, (function(e, a) {
    (function(n, r) {
      e.exports = r(P());
    })(aI, (function(n) {
      function r(t) {
        return t && typeof t == "object" && "default" in t ? t : { default: t };
      }
      var o = r(n), s = { name: "vi", weekdays: "chủ nhật_thứ hai_thứ ba_thứ tư_thứ năm_thứ sáu_thứ bảy".split("_"), months: "tháng 1_tháng 2_tháng 3_tháng 4_tháng 5_tháng 6_tháng 7_tháng 8_tháng 9_tháng 10_tháng 11_tháng 12".split("_"), weekStart: 1, weekdaysShort: "CN_T2_T3_T4_T5_T6_T7".split("_"), monthsShort: "Th01_Th02_Th03_Th04_Th05_Th06_Th07_Th08_Th09_Th10_Th11_Th12".split("_"), weekdaysMin: "CN_T2_T3_T4_T5_T6_T7".split("_"), ordinal: function(t) {
        return t;
      }, formats: { LT: "HH:mm", LTS: "HH:mm:ss", L: "DD/MM/YYYY", LL: "D MMMM [năm] YYYY", LLL: "D MMMM [năm] YYYY HH:mm", LLLL: "dddd, D MMMM [năm] YYYY HH:mm", l: "DD/M/YYYY", ll: "D MMM YYYY", lll: "D MMM YYYY HH:mm", llll: "ddd, D MMM YYYY HH:mm" }, relativeTime: { future: "%s tới", past: "%s trước", s: "vài giây", m: "một phút", mm: "%d phút", h: "một giờ", hh: "%d giờ", d: "một ngày", dd: "%d ngày", M: "một tháng", MM: "%d tháng", y: "một năm", yy: "%d năm" } };
      return o.default.locale(s, null, !0), s;
    }));
  })($a)), $a.exports;
}
var CY = oI();
const sI = /* @__PURE__ */ A(CY), iI = /* @__PURE__ */ q({
  __proto__: null,
  default: sI
}, [CY]);
var Ha = { exports: {} }, uI = Ha.exports, dm;
function lI() {
  return dm || (dm = 1, (function(e, a) {
    (function(n, r) {
      e.exports = r(P());
    })(uI, (function(n) {
      function r(t) {
        return t && typeof t == "object" && "default" in t ? t : { default: t };
      }
      var o = r(n), s = { name: "x-pseudo", weekdays: "S~úñdá~ý_Mó~ñdáý~_Túé~sdáý~_Wéd~ñésd~áý_T~húrs~dáý_~Fríd~áý_S~átúr~dáý".split("_"), months: "J~áñúá~rý_F~ébrú~árý_~Márc~h_Áp~ríl_~Máý_~Júñé~_Júl~ý_Áú~gúst~_Sép~témb~ér_Ó~ctób~ér_Ñ~óvém~bér_~Décé~mbér".split("_"), weekStart: 1, weekdaysShort: "S~úñ_~Móñ_~Túé_~Wéd_~Thú_~Frí_~Sát".split("_"), monthsShort: "J~áñ_~Féb_~Már_~Ápr_~Máý_~Júñ_~Júl_~Áúg_~Sép_~Óct_~Ñóv_~Déc".split("_"), weekdaysMin: "S~ú_Mó~_Tú_~Wé_T~h_Fr~_Sá".split("_"), ordinal: function(t) {
        return t;
      }, formats: { LT: "HH:mm", LTS: "HH:mm:ss", L: "DD/MM/YYYY", LL: "D MMMM YYYY", LLL: "D MMMM YYYY HH:mm", LLLL: "dddd, D MMMM YYYY HH:mm" }, relativeTime: { future: "í~ñ %s", past: "%s á~gó", s: "á ~féw ~sécó~ñds", m: "á ~míñ~úté", mm: "%d m~íñú~tés", h: "á~ñ hó~úr", hh: "%d h~óúrs", d: "á ~dáý", dd: "%d d~áýs", M: "á ~móñ~th", MM: "%d m~óñt~hs", y: "á ~ýéár", yy: "%d ý~éárs" } };
      return o.default.locale(s, null, !0), s;
    }));
  })(Ha)), Ha.exports;
}
var qY = lI();
const dI = /* @__PURE__ */ A(qY), cI = /* @__PURE__ */ q({
  __proto__: null,
  default: dI
}, [qY]);
var ja = { exports: {} }, _I = ja.exports, cm;
function fI() {
  return cm || (cm = 1, (function(e, a) {
    (function(n, r) {
      e.exports = r(P());
    })(_I, (function(n) {
      function r(t) {
        return t && typeof t == "object" && "default" in t ? t : { default: t };
      }
      var o = r(n), s = { name: "yo", weekdays: "Àìkú_Ajé_Ìsẹ́gun_Ọjọ́rú_Ọjọ́bọ_Ẹtì_Àbámẹ́ta".split("_"), months: "Sẹ́rẹ́_Èrèlè_Ẹrẹ̀nà_Ìgbé_Èbibi_Òkùdu_Agẹmo_Ògún_Owewe_Ọ̀wàrà_Bélú_Ọ̀pẹ̀̀".split("_"), weekStart: 1, weekdaysShort: "Àìk_Ajé_Ìsẹ́_Ọjr_Ọjb_Ẹtì_Àbá".split("_"), monthsShort: "Sẹ́r_Èrl_Ẹrn_Ìgb_Èbi_Òkù_Agẹ_Ògú_Owe_Ọ̀wà_Bél_Ọ̀pẹ̀̀".split("_"), weekdaysMin: "Àì_Aj_Ìs_Ọr_Ọb_Ẹt_Àb".split("_"), ordinal: function(t) {
        return t;
      }, formats: { LT: "h:mm A", LTS: "h:mm:ss A", L: "DD/MM/YYYY", LL: "D MMMM YYYY", LLL: "D MMMM YYYY h:mm A", LLLL: "dddd, D MMMM YYYY h:mm A" }, relativeTime: { future: "ní %s", past: "%s kọjá", s: "ìsẹjú aayá die", m: "ìsẹjú kan", mm: "ìsẹjú %d", h: "wákati kan", hh: "wákati %d", d: "ọjọ́ kan", dd: "ọjọ́ %d", M: "osù kan", MM: "osù %d", y: "ọdún kan", yy: "ọdún %d" } };
      return o.default.locale(s, null, !0), s;
    }));
  })(ja)), ja.exports;
}
var AY = fI();
const mI = /* @__PURE__ */ A(AY), pI = /* @__PURE__ */ q({
  __proto__: null,
  default: mI
}, [AY]);
var Ea = { exports: {} }, hI = Ea.exports, _m;
function vI() {
  return _m || (_m = 1, (function(e, a) {
    (function(n, r) {
      e.exports = r(P());
    })(hI, (function(n) {
      function r(t) {
        return t && typeof t == "object" && "default" in t ? t : { default: t };
      }
      var o = r(n), s = { name: "zh-cn", weekdays: "星期日_星期一_星期二_星期三_星期四_星期五_星期六".split("_"), weekdaysShort: "周日_周一_周二_周三_周四_周五_周六".split("_"), weekdaysMin: "日_一_二_三_四_五_六".split("_"), months: "一月_二月_三月_四月_五月_六月_七月_八月_九月_十月_十一月_十二月".split("_"), monthsShort: "1月_2月_3月_4月_5月_6月_7月_8月_9月_10月_11月_12月".split("_"), ordinal: function(t, i) {
        return i === "W" ? t + "周" : t + "日";
      }, weekStart: 1, yearStart: 4, formats: { LT: "HH:mm", LTS: "HH:mm:ss", L: "YYYY/MM/DD", LL: "YYYY年M月D日", LLL: "YYYY年M月D日Ah点mm分", LLLL: "YYYY年M月D日ddddAh点mm分", l: "YYYY/M/D", ll: "YYYY年M月D日", lll: "YYYY年M月D日 HH:mm", llll: "YYYY年M月D日dddd HH:mm" }, relativeTime: { future: "%s内", past: "%s前", s: "几秒", m: "1 分钟", mm: "%d 分钟", h: "1 小时", hh: "%d 小时", d: "1 天", dd: "%d 天", M: "1 个月", MM: "%d 个月", y: "1 年", yy: "%d 年" }, meridiem: function(t, i) {
        var u = 100 * t + i;
        return u < 600 ? "凌晨" : u < 900 ? "早上" : u < 1100 ? "上午" : u < 1300 ? "中午" : u < 1800 ? "下午" : "晚上";
      } };
      return o.default.locale(s, null, !0), s;
    }));
  })(Ea)), Ea.exports;
}
var RY = vI();
const yI = /* @__PURE__ */ A(RY), gI = /* @__PURE__ */ q({
  __proto__: null,
  default: yI
}, [RY]);
var Ca = { exports: {} }, MI = Ca.exports, fm;
function bI() {
  return fm || (fm = 1, (function(e, a) {
    (function(n, r) {
      e.exports = r(P());
    })(MI, (function(n) {
      function r(t) {
        return t && typeof t == "object" && "default" in t ? t : { default: t };
      }
      var o = r(n), s = { name: "zh-hk", months: "一月_二月_三月_四月_五月_六月_七月_八月_九月_十月_十一月_十二月".split("_"), monthsShort: "1月_2月_3月_4月_5月_6月_7月_8月_9月_10月_11月_12月".split("_"), weekdays: "星期日_星期一_星期二_星期三_星期四_星期五_星期六".split("_"), weekdaysShort: "週日_週一_週二_週三_週四_週五_週六".split("_"), weekdaysMin: "日_一_二_三_四_五_六".split("_"), ordinal: function(t, i) {
        return i === "W" ? t + "週" : t + "日";
      }, formats: { LT: "HH:mm", LTS: "HH:mm:ss", L: "YYYY/MM/DD", LL: "YYYY年M月D日", LLL: "YYYY年M月D日 HH:mm", LLLL: "YYYY年M月D日dddd HH:mm", l: "YYYY/M/D", ll: "YYYY年M月D日", lll: "YYYY年M月D日 HH:mm", llll: "YYYY年M月D日dddd HH:mm" }, relativeTime: { future: "%s內", past: "%s前", s: "幾秒", m: "一分鐘", mm: "%d 分鐘", h: "一小時", hh: "%d 小時", d: "一天", dd: "%d 天", M: "一個月", MM: "%d 個月", y: "一年", yy: "%d 年" }, meridiem: function(t, i) {
        var u = 100 * t + i;
        return u < 600 ? "凌晨" : u < 900 ? "早上" : u < 1100 ? "上午" : u < 1300 ? "中午" : u < 1800 ? "下午" : "晚上";
      } };
      return o.default.locale(s, null, !0), s;
    }));
  })(Ca)), Ca.exports;
}
var PY = bI();
const YI = /* @__PURE__ */ A(PY), wI = /* @__PURE__ */ q({
  __proto__: null,
  default: YI
}, [PY]);
var qa = { exports: {} }, xI = qa.exports, mm;
function LI() {
  return mm || (mm = 1, (function(e, a) {
    (function(n, r) {
      e.exports = r(P());
    })(xI, (function(n) {
      function r(t) {
        return t && typeof t == "object" && "default" in t ? t : { default: t };
      }
      var o = r(n), s = { name: "zh-tw", weekdays: "星期日_星期一_星期二_星期三_星期四_星期五_星期六".split("_"), weekdaysShort: "週日_週一_週二_週三_週四_週五_週六".split("_"), weekdaysMin: "日_一_二_三_四_五_六".split("_"), months: "一月_二月_三月_四月_五月_六月_七月_八月_九月_十月_十一月_十二月".split("_"), monthsShort: "1月_2月_3月_4月_5月_6月_7月_8月_9月_10月_11月_12月".split("_"), ordinal: function(t, i) {
        return i === "W" ? t + "週" : t + "日";
      }, formats: { LT: "HH:mm", LTS: "HH:mm:ss", L: "YYYY/MM/DD", LL: "YYYY年M月D日", LLL: "YYYY年M月D日 HH:mm", LLLL: "YYYY年M月D日dddd HH:mm", l: "YYYY/M/D", ll: "YYYY年M月D日", lll: "YYYY年M月D日 HH:mm", llll: "YYYY年M月D日dddd HH:mm" }, relativeTime: { future: "%s內", past: "%s前", s: "幾秒", m: "1 分鐘", mm: "%d 分鐘", h: "1 小時", hh: "%d 小時", d: "1 天", dd: "%d 天", M: "1 個月", MM: "%d 個月", y: "1 年", yy: "%d 年" }, meridiem: function(t, i) {
        var u = 100 * t + i;
        return u < 600 ? "凌晨" : u < 900 ? "早上" : u < 1100 ? "上午" : u < 1300 ? "中午" : u < 1800 ? "下午" : "晚上";
      } };
      return o.default.locale(s, null, !0), s;
    }));
  })(qa)), qa.exports;
}
var IY = LI();
const kI = /* @__PURE__ */ A(IY), SI = /* @__PURE__ */ q({
  __proto__: null,
  default: kI
}, [IY]);
var Aa = { exports: {} }, DI = Aa.exports, pm;
function TI() {
  return pm || (pm = 1, (function(e, a) {
    (function(n, r) {
      e.exports = r(P());
    })(DI, (function(n) {
      function r(t) {
        return t && typeof t == "object" && "default" in t ? t : { default: t };
      }
      var o = r(n), s = { name: "zh", weekdays: "星期日_星期一_星期二_星期三_星期四_星期五_星期六".split("_"), weekdaysShort: "周日_周一_周二_周三_周四_周五_周六".split("_"), weekdaysMin: "日_一_二_三_四_五_六".split("_"), months: "一月_二月_三月_四月_五月_六月_七月_八月_九月_十月_十一月_十二月".split("_"), monthsShort: "1月_2月_3月_4月_5月_6月_7月_8月_9月_10月_11月_12月".split("_"), ordinal: function(t, i) {
        return i === "W" ? t + "周" : t + "日";
      }, weekStart: 1, yearStart: 4, formats: { LT: "HH:mm", LTS: "HH:mm:ss", L: "YYYY/MM/DD", LL: "YYYY年M月D日", LLL: "YYYY年M月D日Ah点mm分", LLLL: "YYYY年M月D日ddddAh点mm分", l: "YYYY/M/D", ll: "YYYY年M月D日", lll: "YYYY年M月D日 HH:mm", llll: "YYYY年M月D日dddd HH:mm" }, relativeTime: { future: "%s后", past: "%s前", s: "几秒", m: "1 分钟", mm: "%d 分钟", h: "1 小时", hh: "%d 小时", d: "1 天", dd: "%d 天", M: "1 个月", MM: "%d 个月", y: "1 年", yy: "%d 年" }, meridiem: function(t, i) {
        var u = 100 * t + i;
        return u < 600 ? "凌晨" : u < 900 ? "早上" : u < 1100 ? "上午" : u < 1300 ? "中午" : u < 1800 ? "下午" : "晚上";
      } };
      return o.default.locale(s, null, !0), s;
    }));
  })(Aa)), Aa.exports;
}
var NY = TI();
const $I = /* @__PURE__ */ A(NY), HI = /* @__PURE__ */ q({
  __proto__: null,
  default: $I
}, [NY]);
function Xd(e) {
  throw new Error('Could not dynamically require "' + e + '". Please configure the dynamicRequireTargets or/and ignoreDynamicRequires option of @rollup/plugin-commonjs appropriately for this require call to work.');
}
var xo, hm;
function jI() {
  if (hm) return xo;
  hm = 1;
  function e() {
    this.__data__ = [], this.size = 0;
  }
  return xo = e, xo;
}
var Lo, vm;
function Mt() {
  if (vm) return Lo;
  vm = 1;
  function e(a, n) {
    return a === n || a !== a && n !== n;
  }
  return Lo = e, Lo;
}
var ko, ym;
function Qa() {
  if (ym) return ko;
  ym = 1;
  var e = Mt();
  function a(n, r) {
    for (var o = n.length; o--; )
      if (e(n[o][0], r))
        return o;
    return -1;
  }
  return ko = a, ko;
}
var So, gm;
function EI() {
  if (gm) return So;
  gm = 1;
  var e = Qa(), a = Array.prototype, n = a.splice;
  function r(o) {
    var s = this.__data__, t = e(s, o);
    if (t < 0)
      return !1;
    var i = s.length - 1;
    return t == i ? s.pop() : n.call(s, t, 1), --this.size, !0;
  }
  return So = r, So;
}
var Do, Mm;
function CI() {
  if (Mm) return Do;
  Mm = 1;
  var e = Qa();
  function a(n) {
    var r = this.__data__, o = e(r, n);
    return o < 0 ? void 0 : r[o][1];
  }
  return Do = a, Do;
}
var To, bm;
function qI() {
  if (bm) return To;
  bm = 1;
  var e = Qa();
  function a(n) {
    return e(this.__data__, n) > -1;
  }
  return To = a, To;
}
var $o, Ym;
function AI() {
  if (Ym) return $o;
  Ym = 1;
  var e = Qa();
  function a(n, r) {
    var o = this.__data__, s = e(o, n);
    return s < 0 ? (++this.size, o.push([n, r])) : o[s][1] = r, this;
  }
  return $o = a, $o;
}
var Ho, wm;
function eo() {
  if (wm) return Ho;
  wm = 1;
  var e = jI(), a = EI(), n = CI(), r = qI(), o = AI();
  function s(t) {
    var i = -1, u = t == null ? 0 : t.length;
    for (this.clear(); ++i < u; ) {
      var l = t[i];
      this.set(l[0], l[1]);
    }
  }
  return s.prototype.clear = e, s.prototype.delete = a, s.prototype.get = n, s.prototype.has = r, s.prototype.set = o, Ho = s, Ho;
}
var jo, xm;
function RI() {
  if (xm) return jo;
  xm = 1;
  var e = eo();
  function a() {
    this.__data__ = new e(), this.size = 0;
  }
  return jo = a, jo;
}
var Eo, Lm;
function PI() {
  if (Lm) return Eo;
  Lm = 1;
  function e(a) {
    var n = this.__data__, r = n.delete(a);
    return this.size = n.size, r;
  }
  return Eo = e, Eo;
}
var Co, km;
function II() {
  if (km) return Co;
  km = 1;
  function e(a) {
    return this.__data__.get(a);
  }
  return Co = e, Co;
}
var qo, Sm;
function NI() {
  if (Sm) return qo;
  Sm = 1;
  function e(a) {
    return this.__data__.has(a);
  }
  return qo = e, qo;
}
var Ao, Dm;
function OY() {
  if (Dm) return Ao;
  Dm = 1;
  var e = typeof Zt == "object" && Zt && Zt.Object === Object && Zt;
  return Ao = e, Ao;
}
var Ro, Tm;
function Fe() {
  if (Tm) return Ro;
  Tm = 1;
  var e = OY(), a = typeof self == "object" && self && self.Object === Object && self, n = e || a || Function("return this")();
  return Ro = n, Ro;
}
var Po, $m;
function bt() {
  if ($m) return Po;
  $m = 1;
  var e = Fe(), a = e.Symbol;
  return Po = a, Po;
}
var Io, Hm;
function OI() {
  if (Hm) return Io;
  Hm = 1;
  var e = bt(), a = Object.prototype, n = a.hasOwnProperty, r = a.toString, o = e ? e.toStringTag : void 0;
  function s(t) {
    var i = n.call(t, o), u = t[o];
    try {
      t[o] = void 0;
      var l = !0;
    } catch {
    }
    var d = r.call(t);
    return l && (i ? t[o] = u : delete t[o]), d;
  }
  return Io = s, Io;
}
var No, jm;
function zI() {
  if (jm) return No;
  jm = 1;
  var e = Object.prototype, a = e.toString;
  function n(r) {
    return a.call(r);
  }
  return No = n, No;
}
var Oo, Em;
function dt() {
  if (Em) return Oo;
  Em = 1;
  var e = bt(), a = OI(), n = zI(), r = "[object Null]", o = "[object Undefined]", s = e ? e.toStringTag : void 0;
  function t(i) {
    return i == null ? i === void 0 ? o : r : s && s in Object(i) ? a(i) : n(i);
  }
  return Oo = t, Oo;
}
var zo, Cm;
function Ie() {
  if (Cm) return zo;
  Cm = 1;
  function e(a) {
    var n = typeof a;
    return a != null && (n == "object" || n == "function");
  }
  return zo = e, zo;
}
var Fo, qm;
function It() {
  if (qm) return Fo;
  qm = 1;
  var e = dt(), a = Ie(), n = "[object AsyncFunction]", r = "[object Function]", o = "[object GeneratorFunction]", s = "[object Proxy]";
  function t(i) {
    if (!a(i))
      return !1;
    var u = e(i);
    return u == r || u == o || u == n || u == s;
  }
  return Fo = t, Fo;
}
var Bo, Am;
function FI() {
  if (Am) return Bo;
  Am = 1;
  var e = Fe(), a = e["__core-js_shared__"];
  return Bo = a, Bo;
}
var Go, Rm;
function BI() {
  if (Rm) return Go;
  Rm = 1;
  var e = FI(), a = (function() {
    var r = /[^.]+$/.exec(e && e.keys && e.keys.IE_PROTO || "");
    return r ? "Symbol(src)_1." + r : "";
  })();
  function n(r) {
    return !!a && a in r;
  }
  return Go = n, Go;
}
var Jo, Pm;
function zY() {
  if (Pm) return Jo;
  Pm = 1;
  var e = Function.prototype, a = e.toString;
  function n(r) {
    if (r != null) {
      try {
        return a.call(r);
      } catch {
      }
      try {
        return r + "";
      } catch {
      }
    }
    return "";
  }
  return Jo = n, Jo;
}
var Uo, Im;
function GI() {
  if (Im) return Uo;
  Im = 1;
  var e = It(), a = BI(), n = Ie(), r = zY(), o = /[\\^$.*+?()[\]{}|]/g, s = /^\[object .+?Constructor\]$/, t = Function.prototype, i = Object.prototype, u = t.toString, l = i.hasOwnProperty, d = RegExp(
    "^" + u.call(l).replace(o, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"
  );
  function c(_) {
    if (!n(_) || a(_))
      return !1;
    var f = e(_) ? d : s;
    return f.test(r(_));
  }
  return Uo = c, Uo;
}
var Wo, Nm;
function JI() {
  if (Nm) return Wo;
  Nm = 1;
  function e(a, n) {
    return a == null ? void 0 : a[n];
  }
  return Wo = e, Wo;
}
var Vo, Om;
function ct() {
  if (Om) return Vo;
  Om = 1;
  var e = GI(), a = JI();
  function n(r, o) {
    var s = a(r, o);
    return e(s) ? s : void 0;
  }
  return Vo = n, Vo;
}
var Ko, zm;
function Zd() {
  if (zm) return Ko;
  zm = 1;
  var e = ct(), a = Fe(), n = e(a, "Map");
  return Ko = n, Ko;
}
var Xo, Fm;
function to() {
  if (Fm) return Xo;
  Fm = 1;
  var e = ct(), a = e(Object, "create");
  return Xo = a, Xo;
}
var Zo, Bm;
function UI() {
  if (Bm) return Zo;
  Bm = 1;
  var e = to();
  function a() {
    this.__data__ = e ? e(null) : {}, this.size = 0;
  }
  return Zo = a, Zo;
}
var Qo, Gm;
function WI() {
  if (Gm) return Qo;
  Gm = 1;
  function e(a) {
    var n = this.has(a) && delete this.__data__[a];
    return this.size -= n ? 1 : 0, n;
  }
  return Qo = e, Qo;
}
var es, Jm;
function VI() {
  if (Jm) return es;
  Jm = 1;
  var e = to(), a = "__lodash_hash_undefined__", n = Object.prototype, r = n.hasOwnProperty;
  function o(s) {
    var t = this.__data__;
    if (e) {
      var i = t[s];
      return i === a ? void 0 : i;
    }
    return r.call(t, s) ? t[s] : void 0;
  }
  return es = o, es;
}
var ts, Um;
function KI() {
  if (Um) return ts;
  Um = 1;
  var e = to(), a = Object.prototype, n = a.hasOwnProperty;
  function r(o) {
    var s = this.__data__;
    return e ? s[o] !== void 0 : n.call(s, o);
  }
  return ts = r, ts;
}
var rs, Wm;
function XI() {
  if (Wm) return rs;
  Wm = 1;
  var e = to(), a = "__lodash_hash_undefined__";
  function n(r, o) {
    var s = this.__data__;
    return this.size += this.has(r) ? 0 : 1, s[r] = e && o === void 0 ? a : o, this;
  }
  return rs = n, rs;
}
var ns, Vm;
function ZI() {
  if (Vm) return ns;
  Vm = 1;
  var e = UI(), a = WI(), n = VI(), r = KI(), o = XI();
  function s(t) {
    var i = -1, u = t == null ? 0 : t.length;
    for (this.clear(); ++i < u; ) {
      var l = t[i];
      this.set(l[0], l[1]);
    }
  }
  return s.prototype.clear = e, s.prototype.delete = a, s.prototype.get = n, s.prototype.has = r, s.prototype.set = o, ns = s, ns;
}
var as, Km;
function QI() {
  if (Km) return as;
  Km = 1;
  var e = ZI(), a = eo(), n = Zd();
  function r() {
    this.size = 0, this.__data__ = {
      hash: new e(),
      map: new (n || a)(),
      string: new e()
    };
  }
  return as = r, as;
}
var os, Xm;
function eN() {
  if (Xm) return os;
  Xm = 1;
  function e(a) {
    var n = typeof a;
    return n == "string" || n == "number" || n == "symbol" || n == "boolean" ? a !== "__proto__" : a === null;
  }
  return os = e, os;
}
var ss, Zm;
function ro() {
  if (Zm) return ss;
  Zm = 1;
  var e = eN();
  function a(n, r) {
    var o = n.__data__;
    return e(r) ? o[typeof r == "string" ? "string" : "hash"] : o.map;
  }
  return ss = a, ss;
}
var is, Qm;
function tN() {
  if (Qm) return is;
  Qm = 1;
  var e = ro();
  function a(n) {
    var r = e(this, n).delete(n);
    return this.size -= r ? 1 : 0, r;
  }
  return is = a, is;
}
var us, ep;
function rN() {
  if (ep) return us;
  ep = 1;
  var e = ro();
  function a(n) {
    return e(this, n).get(n);
  }
  return us = a, us;
}
var ls, tp;
function nN() {
  if (tp) return ls;
  tp = 1;
  var e = ro();
  function a(n) {
    return e(this, n).has(n);
  }
  return ls = a, ls;
}
var ds, rp;
function aN() {
  if (rp) return ds;
  rp = 1;
  var e = ro();
  function a(n, r) {
    var o = e(this, n), s = o.size;
    return o.set(n, r), this.size += o.size == s ? 0 : 1, this;
  }
  return ds = a, ds;
}
var cs, np;
function Qd() {
  if (np) return cs;
  np = 1;
  var e = QI(), a = tN(), n = rN(), r = nN(), o = aN();
  function s(t) {
    var i = -1, u = t == null ? 0 : t.length;
    for (this.clear(); ++i < u; ) {
      var l = t[i];
      this.set(l[0], l[1]);
    }
  }
  return s.prototype.clear = e, s.prototype.delete = a, s.prototype.get = n, s.prototype.has = r, s.prototype.set = o, cs = s, cs;
}
var _s, ap;
function oN() {
  if (ap) return _s;
  ap = 1;
  var e = eo(), a = Zd(), n = Qd(), r = 200;
  function o(s, t) {
    var i = this.__data__;
    if (i instanceof e) {
      var u = i.__data__;
      if (!a || u.length < r - 1)
        return u.push([s, t]), this.size = ++i.size, this;
      i = this.__data__ = new n(u);
    }
    return i.set(s, t), this.size = i.size, this;
  }
  return _s = o, _s;
}
var fs, op;
function no() {
  if (op) return fs;
  op = 1;
  var e = eo(), a = RI(), n = PI(), r = II(), o = NI(), s = oN();
  function t(i) {
    var u = this.__data__ = new e(i);
    this.size = u.size;
  }
  return t.prototype.clear = a, t.prototype.delete = n, t.prototype.get = r, t.prototype.has = o, t.prototype.set = s, fs = t, fs;
}
var ms, sp;
function ec() {
  if (sp) return ms;
  sp = 1;
  function e(a, n) {
    for (var r = -1, o = a == null ? 0 : a.length; ++r < o && n(a[r], r, a) !== !1; )
      ;
    return a;
  }
  return ms = e, ms;
}
var ps, ip;
function FY() {
  if (ip) return ps;
  ip = 1;
  var e = ct(), a = (function() {
    try {
      var n = e(Object, "defineProperty");
      return n({}, "", {}), n;
    } catch {
    }
  })();
  return ps = a, ps;
}
var hs, up;
function ao() {
  if (up) return hs;
  up = 1;
  var e = FY();
  function a(n, r, o) {
    r == "__proto__" && e ? e(n, r, {
      configurable: !0,
      enumerable: !0,
      value: o,
      writable: !0
    }) : n[r] = o;
  }
  return hs = a, hs;
}
var vs, lp;
function oo() {
  if (lp) return vs;
  lp = 1;
  var e = ao(), a = Mt(), n = Object.prototype, r = n.hasOwnProperty;
  function o(s, t, i) {
    var u = s[t];
    (!(r.call(s, t) && a(u, i)) || i === void 0 && !(t in s)) && e(s, t, i);
  }
  return vs = o, vs;
}
var ys, dp;
function Nt() {
  if (dp) return ys;
  dp = 1;
  var e = oo(), a = ao();
  function n(r, o, s, t) {
    var i = !s;
    s || (s = {});
    for (var u = -1, l = o.length; ++u < l; ) {
      var d = o[u], c = t ? t(s[d], r[d], d, s, r) : void 0;
      c === void 0 && (c = r[d]), i ? a(s, d, c) : e(s, d, c);
    }
    return s;
  }
  return ys = n, ys;
}
var gs, cp;
function sN() {
  if (cp) return gs;
  cp = 1;
  function e(a, n) {
    for (var r = -1, o = Array(a); ++r < a; )
      o[r] = n(r);
    return o;
  }
  return gs = e, gs;
}
var Ms, _p;
function Je() {
  if (_p) return Ms;
  _p = 1;
  function e(a) {
    return a != null && typeof a == "object";
  }
  return Ms = e, Ms;
}
var bs, fp;
function iN() {
  if (fp) return bs;
  fp = 1;
  var e = dt(), a = Je(), n = "[object Arguments]";
  function r(o) {
    return a(o) && e(o) == n;
  }
  return bs = r, bs;
}
var Ys, mp;
function Ot() {
  if (mp) return Ys;
  mp = 1;
  var e = iN(), a = Je(), n = Object.prototype, r = n.hasOwnProperty, o = n.propertyIsEnumerable, s = e(/* @__PURE__ */ (function() {
    return arguments;
  })()) ? e : function(t) {
    return a(t) && r.call(t, "callee") && !o.call(t, "callee");
  };
  return Ys = s, Ys;
}
var ws, pp;
function xe() {
  if (pp) return ws;
  pp = 1;
  var e = Array.isArray;
  return ws = e, ws;
}
var St = { exports: {} }, xs, hp;
function uN() {
  if (hp) return xs;
  hp = 1;
  function e() {
    return !1;
  }
  return xs = e, xs;
}
St.exports;
var vp;
function Yt() {
  return vp || (vp = 1, (function(e, a) {
    var n = Fe(), r = uN(), o = a && !a.nodeType && a, s = o && !0 && e && !e.nodeType && e, t = s && s.exports === o, i = t ? n.Buffer : void 0, u = i ? i.isBuffer : void 0, l = u || r;
    e.exports = l;
  })(St, St.exports)), St.exports;
}
var Ls, yp;
function so() {
  if (yp) return Ls;
  yp = 1;
  var e = 9007199254740991, a = /^(?:0|[1-9]\d*)$/;
  function n(r, o) {
    var s = typeof r;
    return o = o ?? e, !!o && (s == "number" || s != "symbol" && a.test(r)) && r > -1 && r % 1 == 0 && r < o;
  }
  return Ls = n, Ls;
}
var ks, gp;
function tc() {
  if (gp) return ks;
  gp = 1;
  var e = 9007199254740991;
  function a(n) {
    return typeof n == "number" && n > -1 && n % 1 == 0 && n <= e;
  }
  return ks = a, ks;
}
var Ss, Mp;
function lN() {
  if (Mp) return Ss;
  Mp = 1;
  var e = dt(), a = tc(), n = Je(), r = "[object Arguments]", o = "[object Array]", s = "[object Boolean]", t = "[object Date]", i = "[object Error]", u = "[object Function]", l = "[object Map]", d = "[object Number]", c = "[object Object]", _ = "[object RegExp]", f = "[object Set]", m = "[object String]", h = "[object WeakMap]", y = "[object ArrayBuffer]", p = "[object DataView]", v = "[object Float32Array]", g = "[object Float64Array]", M = "[object Int8Array]", Y = "[object Int16Array]", L = "[object Int32Array]", D = "[object Uint8Array]", w = "[object Uint8ClampedArray]", T = "[object Uint16Array]", k = "[object Uint32Array]", S = {};
  S[v] = S[g] = S[M] = S[Y] = S[L] = S[D] = S[w] = S[T] = S[k] = !0, S[r] = S[o] = S[y] = S[s] = S[p] = S[t] = S[i] = S[u] = S[l] = S[d] = S[c] = S[_] = S[f] = S[m] = S[h] = !1;
  function F(B) {
    return n(B) && a(B.length) && !!S[e(B)];
  }
  return Ss = F, Ss;
}
var Ds, bp;
function io() {
  if (bp) return Ds;
  bp = 1;
  function e(a) {
    return function(n) {
      return a(n);
    };
  }
  return Ds = e, Ds;
}
var Dt = { exports: {} };
Dt.exports;
var Yp;
function rc() {
  return Yp || (Yp = 1, (function(e, a) {
    var n = OY(), r = a && !a.nodeType && a, o = r && !0 && e && !e.nodeType && e, s = o && o.exports === r, t = s && n.process, i = (function() {
      try {
        var u = o && o.require && o.require("util").types;
        return u || t && t.binding && t.binding("util");
      } catch {
      }
    })();
    e.exports = i;
  })(Dt, Dt.exports)), Dt.exports;
}
var Ts, wp;
function zt() {
  if (wp) return Ts;
  wp = 1;
  var e = lN(), a = io(), n = rc(), r = n && n.isTypedArray, o = r ? a(r) : e;
  return Ts = o, Ts;
}
var $s, xp;
function BY() {
  if (xp) return $s;
  xp = 1;
  var e = sN(), a = Ot(), n = xe(), r = Yt(), o = so(), s = zt(), t = Object.prototype, i = t.hasOwnProperty;
  function u(l, d) {
    var c = n(l), _ = !c && a(l), f = !c && !_ && r(l), m = !c && !_ && !f && s(l), h = c || _ || f || m, y = h ? e(l.length, String) : [], p = y.length;
    for (var v in l)
      (d || i.call(l, v)) && !(h && // Safari 9 has enumerable `arguments.length` in strict mode.
      (v == "length" || // Node.js 0.10 has enumerable non-index properties on buffers.
      f && (v == "offset" || v == "parent") || // PhantomJS 2 has enumerable non-index properties on typed arrays.
      m && (v == "buffer" || v == "byteLength" || v == "byteOffset") || // Skip index properties.
      o(v, p))) && y.push(v);
    return y;
  }
  return $s = u, $s;
}
var Hs, Lp;
function uo() {
  if (Lp) return Hs;
  Lp = 1;
  var e = Object.prototype;
  function a(n) {
    var r = n && n.constructor, o = typeof r == "function" && r.prototype || e;
    return n === o;
  }
  return Hs = a, Hs;
}
var js, kp;
function GY() {
  if (kp) return js;
  kp = 1;
  function e(a, n) {
    return function(r) {
      return a(n(r));
    };
  }
  return js = e, js;
}
var Es, Sp;
function dN() {
  if (Sp) return Es;
  Sp = 1;
  var e = GY(), a = e(Object.keys, Object);
  return Es = a, Es;
}
var Cs, Dp;
function nc() {
  if (Dp) return Cs;
  Dp = 1;
  var e = uo(), a = dN(), n = Object.prototype, r = n.hasOwnProperty;
  function o(s) {
    if (!e(s))
      return a(s);
    var t = [];
    for (var i in Object(s))
      r.call(s, i) && i != "constructor" && t.push(i);
    return t;
  }
  return Cs = o, Cs;
}
var qs, Tp;
function Ke() {
  if (Tp) return qs;
  Tp = 1;
  var e = It(), a = tc();
  function n(r) {
    return r != null && a(r.length) && !e(r);
  }
  return qs = n, qs;
}
var As, $p;
function ot() {
  if ($p) return As;
  $p = 1;
  var e = BY(), a = nc(), n = Ke();
  function r(o) {
    return n(o) ? e(o) : a(o);
  }
  return As = r, As;
}
var Rs, Hp;
function cN() {
  if (Hp) return Rs;
  Hp = 1;
  var e = Nt(), a = ot();
  function n(r, o) {
    return r && e(o, a(o), r);
  }
  return Rs = n, Rs;
}
var Ps, jp;
function _N() {
  if (jp) return Ps;
  jp = 1;
  function e(a) {
    var n = [];
    if (a != null)
      for (var r in Object(a))
        n.push(r);
    return n;
  }
  return Ps = e, Ps;
}
var Is, Ep;
function fN() {
  if (Ep) return Is;
  Ep = 1;
  var e = Ie(), a = uo(), n = _N(), r = Object.prototype, o = r.hasOwnProperty;
  function s(t) {
    if (!e(t))
      return n(t);
    var i = a(t), u = [];
    for (var l in t)
      l == "constructor" && (i || !o.call(t, l)) || u.push(l);
    return u;
  }
  return Is = s, Is;
}
var Ns, Cp;
function _t() {
  if (Cp) return Ns;
  Cp = 1;
  var e = BY(), a = fN(), n = Ke();
  function r(o) {
    return n(o) ? e(o, !0) : a(o);
  }
  return Ns = r, Ns;
}
var Os, qp;
function mN() {
  if (qp) return Os;
  qp = 1;
  var e = Nt(), a = _t();
  function n(r, o) {
    return r && e(o, a(o), r);
  }
  return Os = n, Os;
}
var Tt = { exports: {} };
Tt.exports;
var Ap;
function JY() {
  return Ap || (Ap = 1, (function(e, a) {
    var n = Fe(), r = a && !a.nodeType && a, o = r && !0 && e && !e.nodeType && e, s = o && o.exports === r, t = s ? n.Buffer : void 0, i = t ? t.allocUnsafe : void 0;
    function u(l, d) {
      if (d)
        return l.slice();
      var c = l.length, _ = i ? i(c) : new l.constructor(c);
      return l.copy(_), _;
    }
    e.exports = u;
  })(Tt, Tt.exports)), Tt.exports;
}
var zs, Rp;
function UY() {
  if (Rp) return zs;
  Rp = 1;
  function e(a, n) {
    var r = -1, o = a.length;
    for (n || (n = Array(o)); ++r < o; )
      n[r] = a[r];
    return n;
  }
  return zs = e, zs;
}
var Fs, Pp;
function WY() {
  if (Pp) return Fs;
  Pp = 1;
  function e(a, n) {
    for (var r = -1, o = a == null ? 0 : a.length, s = 0, t = []; ++r < o; ) {
      var i = a[r];
      n(i, r, a) && (t[s++] = i);
    }
    return t;
  }
  return Fs = e, Fs;
}
var Bs, Ip;
function VY() {
  if (Ip) return Bs;
  Ip = 1;
  function e() {
    return [];
  }
  return Bs = e, Bs;
}
var Gs, Np;
function ac() {
  if (Np) return Gs;
  Np = 1;
  var e = WY(), a = VY(), n = Object.prototype, r = n.propertyIsEnumerable, o = Object.getOwnPropertySymbols, s = o ? function(t) {
    return t == null ? [] : (t = Object(t), e(o(t), function(i) {
      return r.call(t, i);
    }));
  } : a;
  return Gs = s, Gs;
}
var Js, Op;
function pN() {
  if (Op) return Js;
  Op = 1;
  var e = Nt(), a = ac();
  function n(r, o) {
    return e(r, a(r), o);
  }
  return Js = n, Js;
}
var Us, zp;
function oc() {
  if (zp) return Us;
  zp = 1;
  function e(a, n) {
    for (var r = -1, o = n.length, s = a.length; ++r < o; )
      a[s + r] = n[r];
    return a;
  }
  return Us = e, Us;
}
var Ws, Fp;
function lo() {
  if (Fp) return Ws;
  Fp = 1;
  var e = GY(), a = e(Object.getPrototypeOf, Object);
  return Ws = a, Ws;
}
var Vs, Bp;
function KY() {
  if (Bp) return Vs;
  Bp = 1;
  var e = oc(), a = lo(), n = ac(), r = VY(), o = Object.getOwnPropertySymbols, s = o ? function(t) {
    for (var i = []; t; )
      e(i, n(t)), t = a(t);
    return i;
  } : r;
  return Vs = s, Vs;
}
var Ks, Gp;
function hN() {
  if (Gp) return Ks;
  Gp = 1;
  var e = Nt(), a = KY();
  function n(r, o) {
    return e(r, a(r), o);
  }
  return Ks = n, Ks;
}
var Xs, Jp;
function XY() {
  if (Jp) return Xs;
  Jp = 1;
  var e = oc(), a = xe();
  function n(r, o, s) {
    var t = o(r);
    return a(r) ? t : e(t, s(r));
  }
  return Xs = n, Xs;
}
var Zs, Up;
function ZY() {
  if (Up) return Zs;
  Up = 1;
  var e = XY(), a = ac(), n = ot();
  function r(o) {
    return e(o, n, a);
  }
  return Zs = r, Zs;
}
var Qs, Wp;
function vN() {
  if (Wp) return Qs;
  Wp = 1;
  var e = XY(), a = KY(), n = _t();
  function r(o) {
    return e(o, n, a);
  }
  return Qs = r, Qs;
}
var ei, Vp;
function yN() {
  if (Vp) return ei;
  Vp = 1;
  var e = ct(), a = Fe(), n = e(a, "DataView");
  return ei = n, ei;
}
var ti, Kp;
function gN() {
  if (Kp) return ti;
  Kp = 1;
  var e = ct(), a = Fe(), n = e(a, "Promise");
  return ti = n, ti;
}
var ri, Xp;
function QY() {
  if (Xp) return ri;
  Xp = 1;
  var e = ct(), a = Fe(), n = e(a, "Set");
  return ri = n, ri;
}
var ni, Zp;
function MN() {
  if (Zp) return ni;
  Zp = 1;
  var e = ct(), a = Fe(), n = e(a, "WeakMap");
  return ni = n, ni;
}
var ai, Qp;
function wt() {
  if (Qp) return ai;
  Qp = 1;
  var e = yN(), a = Zd(), n = gN(), r = QY(), o = MN(), s = dt(), t = zY(), i = "[object Map]", u = "[object Object]", l = "[object Promise]", d = "[object Set]", c = "[object WeakMap]", _ = "[object DataView]", f = t(e), m = t(a), h = t(n), y = t(r), p = t(o), v = s;
  return (e && v(new e(new ArrayBuffer(1))) != _ || a && v(new a()) != i || n && v(n.resolve()) != l || r && v(new r()) != d || o && v(new o()) != c) && (v = function(g) {
    var M = s(g), Y = M == u ? g.constructor : void 0, L = Y ? t(Y) : "";
    if (L)
      switch (L) {
        case f:
          return _;
        case m:
          return i;
        case h:
          return l;
        case y:
          return d;
        case p:
          return c;
      }
    return M;
  }), ai = v, ai;
}
var oi, eh;
function bN() {
  if (eh) return oi;
  eh = 1;
  var e = Object.prototype, a = e.hasOwnProperty;
  function n(r) {
    var o = r.length, s = new r.constructor(o);
    return o && typeof r[0] == "string" && a.call(r, "index") && (s.index = r.index, s.input = r.input), s;
  }
  return oi = n, oi;
}
var si, th;
function ew() {
  if (th) return si;
  th = 1;
  var e = Fe(), a = e.Uint8Array;
  return si = a, si;
}
var ii, rh;
function sc() {
  if (rh) return ii;
  rh = 1;
  var e = ew();
  function a(n) {
    var r = new n.constructor(n.byteLength);
    return new e(r).set(new e(n)), r;
  }
  return ii = a, ii;
}
var ui, nh;
function YN() {
  if (nh) return ui;
  nh = 1;
  var e = sc();
  function a(n, r) {
    var o = r ? e(n.buffer) : n.buffer;
    return new n.constructor(o, n.byteOffset, n.byteLength);
  }
  return ui = a, ui;
}
var li, ah;
function wN() {
  if (ah) return li;
  ah = 1;
  var e = /\w*$/;
  function a(n) {
    var r = new n.constructor(n.source, e.exec(n));
    return r.lastIndex = n.lastIndex, r;
  }
  return li = a, li;
}
var di, oh;
function xN() {
  if (oh) return di;
  oh = 1;
  var e = bt(), a = e ? e.prototype : void 0, n = a ? a.valueOf : void 0;
  function r(o) {
    return n ? Object(n.call(o)) : {};
  }
  return di = r, di;
}
var ci, sh;
function tw() {
  if (sh) return ci;
  sh = 1;
  var e = sc();
  function a(n, r) {
    var o = r ? e(n.buffer) : n.buffer;
    return new n.constructor(o, n.byteOffset, n.length);
  }
  return ci = a, ci;
}
var _i, ih;
function LN() {
  if (ih) return _i;
  ih = 1;
  var e = sc(), a = YN(), n = wN(), r = xN(), o = tw(), s = "[object Boolean]", t = "[object Date]", i = "[object Map]", u = "[object Number]", l = "[object RegExp]", d = "[object Set]", c = "[object String]", _ = "[object Symbol]", f = "[object ArrayBuffer]", m = "[object DataView]", h = "[object Float32Array]", y = "[object Float64Array]", p = "[object Int8Array]", v = "[object Int16Array]", g = "[object Int32Array]", M = "[object Uint8Array]", Y = "[object Uint8ClampedArray]", L = "[object Uint16Array]", D = "[object Uint32Array]";
  function w(T, k, S) {
    var F = T.constructor;
    switch (k) {
      case f:
        return e(T);
      case s:
      case t:
        return new F(+T);
      case m:
        return a(T, S);
      case h:
      case y:
      case p:
      case v:
      case g:
      case M:
      case Y:
      case L:
      case D:
        return o(T, S);
      case i:
        return new F();
      case u:
      case c:
        return new F(T);
      case l:
        return n(T);
      case d:
        return new F();
      case _:
        return r(T);
    }
  }
  return _i = w, _i;
}
var fi, uh;
function rw() {
  if (uh) return fi;
  uh = 1;
  var e = Ie(), a = Object.create, n = /* @__PURE__ */ (function() {
    function r() {
    }
    return function(o) {
      if (!e(o))
        return {};
      if (a)
        return a(o);
      r.prototype = o;
      var s = new r();
      return r.prototype = void 0, s;
    };
  })();
  return fi = n, fi;
}
var mi, lh;
function nw() {
  if (lh) return mi;
  lh = 1;
  var e = rw(), a = lo(), n = uo();
  function r(o) {
    return typeof o.constructor == "function" && !n(o) ? e(a(o)) : {};
  }
  return mi = r, mi;
}
var pi, dh;
function kN() {
  if (dh) return pi;
  dh = 1;
  var e = wt(), a = Je(), n = "[object Map]";
  function r(o) {
    return a(o) && e(o) == n;
  }
  return pi = r, pi;
}
var hi, ch;
function SN() {
  if (ch) return hi;
  ch = 1;
  var e = kN(), a = io(), n = rc(), r = n && n.isMap, o = r ? a(r) : e;
  return hi = o, hi;
}
var vi, _h;
function DN() {
  if (_h) return vi;
  _h = 1;
  var e = wt(), a = Je(), n = "[object Set]";
  function r(o) {
    return a(o) && e(o) == n;
  }
  return vi = r, vi;
}
var yi, fh;
function TN() {
  if (fh) return yi;
  fh = 1;
  var e = DN(), a = io(), n = rc(), r = n && n.isSet, o = r ? a(r) : e;
  return yi = o, yi;
}
var gi, mh;
function aw() {
  if (mh) return gi;
  mh = 1;
  var e = no(), a = ec(), n = oo(), r = cN(), o = mN(), s = JY(), t = UY(), i = pN(), u = hN(), l = ZY(), d = vN(), c = wt(), _ = bN(), f = LN(), m = nw(), h = xe(), y = Yt(), p = SN(), v = Ie(), g = TN(), M = ot(), Y = _t(), L = 1, D = 2, w = 4, T = "[object Arguments]", k = "[object Array]", S = "[object Boolean]", F = "[object Date]", B = "[object Error]", $ = "[object Function]", x = "[object GeneratorFunction]", j = "[object Map]", G = "[object Number]", z = "[object Object]", W = "[object RegExp]", Z = "[object Set]", K = "[object String]", ne = "[object Symbol]", se = "[object WeakMap]", R = "[object ArrayBuffer]", O = "[object DataView]", U = "[object Float32Array]", V = "[object Float64Array]", oe = "[object Int8Array]", ce = "[object Int16Array]", le = "[object Int32Array]", he = "[object Uint8Array]", Ae = "[object Uint8ClampedArray]", be = "[object Uint16Array]", Se = "[object Uint32Array]", _e = {};
  _e[T] = _e[k] = _e[R] = _e[O] = _e[S] = _e[F] = _e[U] = _e[V] = _e[oe] = _e[ce] = _e[le] = _e[j] = _e[G] = _e[z] = _e[W] = _e[Z] = _e[K] = _e[ne] = _e[he] = _e[Ae] = _e[be] = _e[Se] = !0, _e[B] = _e[$] = _e[se] = !1;
  function Ue(fe, Ze, Qe, vo, mt, Be) {
    var Te, pt = Ze & L, st = Ze & D, Bt = Ze & w;
    if (Qe && (Te = mt ? Qe(fe, vo, mt, Be) : Qe(fe)), Te !== void 0)
      return Te;
    if (!v(fe))
      return fe;
    var Gt = h(fe);
    if (Gt) {
      if (Te = _(fe), !pt)
        return t(fe, Te);
    } else {
      var et = c(fe), Jt = et == $ || et == x;
      if (y(fe))
        return s(fe, pt);
      if (et == z || et == T || Jt && !mt) {
        if (Te = st || Jt ? {} : m(fe), !pt)
          return st ? u(fe, o(Te, fe)) : i(fe, r(Te, fe));
      } else {
        if (!_e[et])
          return mt ? fe : {};
        Te = f(fe, et, pt);
      }
    }
    Be || (Be = new e());
    var Ut = Be.get(fe);
    if (Ut)
      return Ut;
    Be.set(fe, Te), g(fe) ? fe.forEach(function(Ge) {
      Te.add(Ue(Ge, Ze, Qe, Ge, fe, Be));
    }) : p(fe) && fe.forEach(function(Ge, Oe) {
      Te.set(Oe, Ue(Ge, Ze, Qe, Oe, fe, Be));
    });
    var yo = Bt ? st ? d : l : st ? Y : M, Wt = Gt ? void 0 : yo(fe);
    return a(Wt || fe, function(Ge, Oe) {
      Wt && (Oe = Ge, Ge = fe[Oe]), n(Te, Oe, Ue(Ge, Ze, Qe, Oe, fe, Be));
    }), Te;
  }
  return gi = Ue, gi;
}
var Mi, ph;
function $N() {
  if (ph) return Mi;
  ph = 1;
  var e = aw(), a = 4;
  function n(r) {
    return e(r, a);
  }
  return Mi = n, Mi;
}
var bi, hh;
function ic() {
  if (hh) return bi;
  hh = 1;
  function e(a) {
    return function() {
      return a;
    };
  }
  return bi = e, bi;
}
var Yi, vh;
function HN() {
  if (vh) return Yi;
  vh = 1;
  function e(a) {
    return function(n, r, o) {
      for (var s = -1, t = Object(n), i = o(n), u = i.length; u--; ) {
        var l = i[a ? u : ++s];
        if (r(t[l], l, t) === !1)
          break;
      }
      return n;
    };
  }
  return Yi = e, Yi;
}
var wi, yh;
function uc() {
  if (yh) return wi;
  yh = 1;
  var e = HN(), a = e();
  return wi = a, wi;
}
var xi, gh;
function lc() {
  if (gh) return xi;
  gh = 1;
  var e = uc(), a = ot();
  function n(r, o) {
    return r && e(r, o, a);
  }
  return xi = n, xi;
}
var Li, Mh;
function jN() {
  if (Mh) return Li;
  Mh = 1;
  var e = Ke();
  function a(n, r) {
    return function(o, s) {
      if (o == null)
        return o;
      if (!e(o))
        return n(o, s);
      for (var t = o.length, i = r ? t : -1, u = Object(o); (r ? i-- : ++i < t) && s(u[i], i, u) !== !1; )
        ;
      return o;
    };
  }
  return Li = a, Li;
}
var ki, bh;
function co() {
  if (bh) return ki;
  bh = 1;
  var e = lc(), a = jN(), n = a(e);
  return ki = n, ki;
}
var Si, Yh;
function ft() {
  if (Yh) return Si;
  Yh = 1;
  function e(a) {
    return a;
  }
  return Si = e, Si;
}
var Di, wh;
function ow() {
  if (wh) return Di;
  wh = 1;
  var e = ft();
  function a(n) {
    return typeof n == "function" ? n : e;
  }
  return Di = a, Di;
}
var Ti, xh;
function sw() {
  if (xh) return Ti;
  xh = 1;
  var e = ec(), a = co(), n = ow(), r = xe();
  function o(s, t) {
    var i = r(s) ? e : a;
    return i(s, n(t));
  }
  return Ti = o, Ti;
}
var $i, Lh;
function iw() {
  return Lh || (Lh = 1, $i = sw()), $i;
}
var Hi, kh;
function EN() {
  if (kh) return Hi;
  kh = 1;
  var e = co();
  function a(n, r) {
    var o = [];
    return e(n, function(s, t, i) {
      r(s, t, i) && o.push(s);
    }), o;
  }
  return Hi = a, Hi;
}
var ji, Sh;
function CN() {
  if (Sh) return ji;
  Sh = 1;
  var e = "__lodash_hash_undefined__";
  function a(n) {
    return this.__data__.set(n, e), this;
  }
  return ji = a, ji;
}
var Ei, Dh;
function qN() {
  if (Dh) return Ei;
  Dh = 1;
  function e(a) {
    return this.__data__.has(a);
  }
  return Ei = e, Ei;
}
var Ci, Th;
function uw() {
  if (Th) return Ci;
  Th = 1;
  var e = Qd(), a = CN(), n = qN();
  function r(o) {
    var s = -1, t = o == null ? 0 : o.length;
    for (this.__data__ = new e(); ++s < t; )
      this.add(o[s]);
  }
  return r.prototype.add = r.prototype.push = a, r.prototype.has = n, Ci = r, Ci;
}
var qi, $h;
function AN() {
  if ($h) return qi;
  $h = 1;
  function e(a, n) {
    for (var r = -1, o = a == null ? 0 : a.length; ++r < o; )
      if (n(a[r], r, a))
        return !0;
    return !1;
  }
  return qi = e, qi;
}
var Ai, Hh;
function lw() {
  if (Hh) return Ai;
  Hh = 1;
  function e(a, n) {
    return a.has(n);
  }
  return Ai = e, Ai;
}
var Ri, jh;
function dw() {
  if (jh) return Ri;
  jh = 1;
  var e = uw(), a = AN(), n = lw(), r = 1, o = 2;
  function s(t, i, u, l, d, c) {
    var _ = u & r, f = t.length, m = i.length;
    if (f != m && !(_ && m > f))
      return !1;
    var h = c.get(t), y = c.get(i);
    if (h && y)
      return h == i && y == t;
    var p = -1, v = !0, g = u & o ? new e() : void 0;
    for (c.set(t, i), c.set(i, t); ++p < f; ) {
      var M = t[p], Y = i[p];
      if (l)
        var L = _ ? l(Y, M, p, i, t, c) : l(M, Y, p, t, i, c);
      if (L !== void 0) {
        if (L)
          continue;
        v = !1;
        break;
      }
      if (g) {
        if (!a(i, function(D, w) {
          if (!n(g, w) && (M === D || d(M, D, u, l, c)))
            return g.push(w);
        })) {
          v = !1;
          break;
        }
      } else if (!(M === Y || d(M, Y, u, l, c))) {
        v = !1;
        break;
      }
    }
    return c.delete(t), c.delete(i), v;
  }
  return Ri = s, Ri;
}
var Pi, Eh;
function RN() {
  if (Eh) return Pi;
  Eh = 1;
  function e(a) {
    var n = -1, r = Array(a.size);
    return a.forEach(function(o, s) {
      r[++n] = [s, o];
    }), r;
  }
  return Pi = e, Pi;
}
var Ii, Ch;
function dc() {
  if (Ch) return Ii;
  Ch = 1;
  function e(a) {
    var n = -1, r = Array(a.size);
    return a.forEach(function(o) {
      r[++n] = o;
    }), r;
  }
  return Ii = e, Ii;
}
var Ni, qh;
function PN() {
  if (qh) return Ni;
  qh = 1;
  var e = bt(), a = ew(), n = Mt(), r = dw(), o = RN(), s = dc(), t = 1, i = 2, u = "[object Boolean]", l = "[object Date]", d = "[object Error]", c = "[object Map]", _ = "[object Number]", f = "[object RegExp]", m = "[object Set]", h = "[object String]", y = "[object Symbol]", p = "[object ArrayBuffer]", v = "[object DataView]", g = e ? e.prototype : void 0, M = g ? g.valueOf : void 0;
  function Y(L, D, w, T, k, S, F) {
    switch (w) {
      case v:
        if (L.byteLength != D.byteLength || L.byteOffset != D.byteOffset)
          return !1;
        L = L.buffer, D = D.buffer;
      case p:
        return !(L.byteLength != D.byteLength || !S(new a(L), new a(D)));
      case u:
      case l:
      case _:
        return n(+L, +D);
      case d:
        return L.name == D.name && L.message == D.message;
      case f:
      case h:
        return L == D + "";
      case c:
        var B = o;
      case m:
        var $ = T & t;
        if (B || (B = s), L.size != D.size && !$)
          return !1;
        var x = F.get(L);
        if (x)
          return x == D;
        T |= i, F.set(L, D);
        var j = r(B(L), B(D), T, k, S, F);
        return F.delete(L), j;
      case y:
        if (M)
          return M.call(L) == M.call(D);
    }
    return !1;
  }
  return Ni = Y, Ni;
}
var Oi, Ah;
function IN() {
  if (Ah) return Oi;
  Ah = 1;
  var e = ZY(), a = 1, n = Object.prototype, r = n.hasOwnProperty;
  function o(s, t, i, u, l, d) {
    var c = i & a, _ = e(s), f = _.length, m = e(t), h = m.length;
    if (f != h && !c)
      return !1;
    for (var y = f; y--; ) {
      var p = _[y];
      if (!(c ? p in t : r.call(t, p)))
        return !1;
    }
    var v = d.get(s), g = d.get(t);
    if (v && g)
      return v == t && g == s;
    var M = !0;
    d.set(s, t), d.set(t, s);
    for (var Y = c; ++y < f; ) {
      p = _[y];
      var L = s[p], D = t[p];
      if (u)
        var w = c ? u(D, L, p, t, s, d) : u(L, D, p, s, t, d);
      if (!(w === void 0 ? L === D || l(L, D, i, u, d) : w)) {
        M = !1;
        break;
      }
      Y || (Y = p == "constructor");
    }
    if (M && !Y) {
      var T = s.constructor, k = t.constructor;
      T != k && "constructor" in s && "constructor" in t && !(typeof T == "function" && T instanceof T && typeof k == "function" && k instanceof k) && (M = !1);
    }
    return d.delete(s), d.delete(t), M;
  }
  return Oi = o, Oi;
}
var zi, Rh;
function NN() {
  if (Rh) return zi;
  Rh = 1;
  var e = no(), a = dw(), n = PN(), r = IN(), o = wt(), s = xe(), t = Yt(), i = zt(), u = 1, l = "[object Arguments]", d = "[object Array]", c = "[object Object]", _ = Object.prototype, f = _.hasOwnProperty;
  function m(h, y, p, v, g, M) {
    var Y = s(h), L = s(y), D = Y ? d : o(h), w = L ? d : o(y);
    D = D == l ? c : D, w = w == l ? c : w;
    var T = D == c, k = w == c, S = D == w;
    if (S && t(h)) {
      if (!t(y))
        return !1;
      Y = !0, T = !1;
    }
    if (S && !T)
      return M || (M = new e()), Y || i(h) ? a(h, y, p, v, g, M) : n(h, y, D, p, v, g, M);
    if (!(p & u)) {
      var F = T && f.call(h, "__wrapped__"), B = k && f.call(y, "__wrapped__");
      if (F || B) {
        var $ = F ? h.value() : h, x = B ? y.value() : y;
        return M || (M = new e()), g($, x, p, v, M);
      }
    }
    return S ? (M || (M = new e()), r(h, y, p, v, g, M)) : !1;
  }
  return zi = m, zi;
}
var Fi, Ph;
function cw() {
  if (Ph) return Fi;
  Ph = 1;
  var e = NN(), a = Je();
  function n(r, o, s, t, i) {
    return r === o ? !0 : r == null || o == null || !a(r) && !a(o) ? r !== r && o !== o : e(r, o, s, t, n, i);
  }
  return Fi = n, Fi;
}
var Bi, Ih;
function ON() {
  if (Ih) return Bi;
  Ih = 1;
  var e = no(), a = cw(), n = 1, r = 2;
  function o(s, t, i, u) {
    var l = i.length, d = l, c = !u;
    if (s == null)
      return !d;
    for (s = Object(s); l--; ) {
      var _ = i[l];
      if (c && _[2] ? _[1] !== s[_[0]] : !(_[0] in s))
        return !1;
    }
    for (; ++l < d; ) {
      _ = i[l];
      var f = _[0], m = s[f], h = _[1];
      if (c && _[2]) {
        if (m === void 0 && !(f in s))
          return !1;
      } else {
        var y = new e();
        if (u)
          var p = u(m, h, f, s, t, y);
        if (!(p === void 0 ? a(h, m, n | r, u, y) : p))
          return !1;
      }
    }
    return !0;
  }
  return Bi = o, Bi;
}
var Gi, Nh;
function _w() {
  if (Nh) return Gi;
  Nh = 1;
  var e = Ie();
  function a(n) {
    return n === n && !e(n);
  }
  return Gi = a, Gi;
}
var Ji, Oh;
function zN() {
  if (Oh) return Ji;
  Oh = 1;
  var e = _w(), a = ot();
  function n(r) {
    for (var o = a(r), s = o.length; s--; ) {
      var t = o[s], i = r[t];
      o[s] = [t, i, e(i)];
    }
    return o;
  }
  return Ji = n, Ji;
}
var Ui, zh;
function fw() {
  if (zh) return Ui;
  zh = 1;
  function e(a, n) {
    return function(r) {
      return r == null ? !1 : r[a] === n && (n !== void 0 || a in Object(r));
    };
  }
  return Ui = e, Ui;
}
var Wi, Fh;
function FN() {
  if (Fh) return Wi;
  Fh = 1;
  var e = ON(), a = zN(), n = fw();
  function r(o) {
    var s = a(o);
    return s.length == 1 && s[0][2] ? n(s[0][0], s[0][1]) : function(t) {
      return t === o || e(t, o, s);
    };
  }
  return Wi = r, Wi;
}
var Vi, Bh;
function xt() {
  if (Bh) return Vi;
  Bh = 1;
  var e = dt(), a = Je(), n = "[object Symbol]";
  function r(o) {
    return typeof o == "symbol" || a(o) && e(o) == n;
  }
  return Vi = r, Vi;
}
var Ki, Gh;
function cc() {
  if (Gh) return Ki;
  Gh = 1;
  var e = xe(), a = xt(), n = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/, r = /^\w*$/;
  function o(s, t) {
    if (e(s))
      return !1;
    var i = typeof s;
    return i == "number" || i == "symbol" || i == "boolean" || s == null || a(s) ? !0 : r.test(s) || !n.test(s) || t != null && s in Object(t);
  }
  return Ki = o, Ki;
}
var Xi, Jh;
function BN() {
  if (Jh) return Xi;
  Jh = 1;
  var e = Qd(), a = "Expected a function";
  function n(r, o) {
    if (typeof r != "function" || o != null && typeof o != "function")
      throw new TypeError(a);
    var s = function() {
      var t = arguments, i = o ? o.apply(this, t) : t[0], u = s.cache;
      if (u.has(i))
        return u.get(i);
      var l = r.apply(this, t);
      return s.cache = u.set(i, l) || u, l;
    };
    return s.cache = new (n.Cache || e)(), s;
  }
  return n.Cache = e, Xi = n, Xi;
}
var Zi, Uh;
function GN() {
  if (Uh) return Zi;
  Uh = 1;
  var e = BN(), a = 500;
  function n(r) {
    var o = e(r, function(t) {
      return s.size === a && s.clear(), t;
    }), s = o.cache;
    return o;
  }
  return Zi = n, Zi;
}
var Qi, Wh;
function JN() {
  if (Wh) return Qi;
  Wh = 1;
  var e = GN(), a = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g, n = /\\(\\)?/g, r = e(function(o) {
    var s = [];
    return o.charCodeAt(0) === 46 && s.push(""), o.replace(a, function(t, i, u, l) {
      s.push(u ? l.replace(n, "$1") : i || t);
    }), s;
  });
  return Qi = r, Qi;
}
var eu, Vh;
function _o() {
  if (Vh) return eu;
  Vh = 1;
  function e(a, n) {
    for (var r = -1, o = a == null ? 0 : a.length, s = Array(o); ++r < o; )
      s[r] = n(a[r], r, a);
    return s;
  }
  return eu = e, eu;
}
var tu, Kh;
function UN() {
  if (Kh) return tu;
  Kh = 1;
  var e = bt(), a = _o(), n = xe(), r = xt(), o = e ? e.prototype : void 0, s = o ? o.toString : void 0;
  function t(i) {
    if (typeof i == "string")
      return i;
    if (n(i))
      return a(i, t) + "";
    if (r(i))
      return s ? s.call(i) : "";
    var u = i + "";
    return u == "0" && 1 / i == -1 / 0 ? "-0" : u;
  }
  return tu = t, tu;
}
var ru, Xh;
function mw() {
  if (Xh) return ru;
  Xh = 1;
  var e = UN();
  function a(n) {
    return n == null ? "" : e(n);
  }
  return ru = a, ru;
}
var nu, Zh;
function fo() {
  if (Zh) return nu;
  Zh = 1;
  var e = xe(), a = cc(), n = JN(), r = mw();
  function o(s, t) {
    return e(s) ? s : a(s, t) ? [s] : n(r(s));
  }
  return nu = o, nu;
}
var au, Qh;
function Ft() {
  if (Qh) return au;
  Qh = 1;
  var e = xt();
  function a(n) {
    if (typeof n == "string" || e(n))
      return n;
    var r = n + "";
    return r == "0" && 1 / n == -1 / 0 ? "-0" : r;
  }
  return au = a, au;
}
var ou, ev;
function mo() {
  if (ev) return ou;
  ev = 1;
  var e = fo(), a = Ft();
  function n(r, o) {
    o = e(o, r);
    for (var s = 0, t = o.length; r != null && s < t; )
      r = r[a(o[s++])];
    return s && s == t ? r : void 0;
  }
  return ou = n, ou;
}
var su, tv;
function WN() {
  if (tv) return su;
  tv = 1;
  var e = mo();
  function a(n, r, o) {
    var s = n == null ? void 0 : e(n, r);
    return s === void 0 ? o : s;
  }
  return su = a, su;
}
var iu, rv;
function VN() {
  if (rv) return iu;
  rv = 1;
  function e(a, n) {
    return a != null && n in Object(a);
  }
  return iu = e, iu;
}
var uu, nv;
function pw() {
  if (nv) return uu;
  nv = 1;
  var e = fo(), a = Ot(), n = xe(), r = so(), o = tc(), s = Ft();
  function t(i, u, l) {
    u = e(u, i);
    for (var d = -1, c = u.length, _ = !1; ++d < c; ) {
      var f = s(u[d]);
      if (!(_ = i != null && l(i, f)))
        break;
      i = i[f];
    }
    return _ || ++d != c ? _ : (c = i == null ? 0 : i.length, !!c && o(c) && r(f, c) && (n(i) || a(i)));
  }
  return uu = t, uu;
}
var lu, av;
function hw() {
  if (av) return lu;
  av = 1;
  var e = VN(), a = pw();
  function n(r, o) {
    return r != null && a(r, o, e);
  }
  return lu = n, lu;
}
var du, ov;
function KN() {
  if (ov) return du;
  ov = 1;
  var e = cw(), a = WN(), n = hw(), r = cc(), o = _w(), s = fw(), t = Ft(), i = 1, u = 2;
  function l(d, c) {
    return r(d) && o(c) ? s(t(d), c) : function(_) {
      var f = a(_, d);
      return f === void 0 && f === c ? n(_, d) : e(c, f, i | u);
    };
  }
  return du = l, du;
}
var cu, sv;
function vw() {
  if (sv) return cu;
  sv = 1;
  function e(a) {
    return function(n) {
      return n == null ? void 0 : n[a];
    };
  }
  return cu = e, cu;
}
var _u, iv;
function XN() {
  if (iv) return _u;
  iv = 1;
  var e = mo();
  function a(n) {
    return function(r) {
      return e(r, n);
    };
  }
  return _u = a, _u;
}
var fu, uv;
function ZN() {
  if (uv) return fu;
  uv = 1;
  var e = vw(), a = XN(), n = cc(), r = Ft();
  function o(s) {
    return n(s) ? e(r(s)) : a(s);
  }
  return fu = o, fu;
}
var mu, lv;
function Xe() {
  if (lv) return mu;
  lv = 1;
  var e = FN(), a = KN(), n = ft(), r = xe(), o = ZN();
  function s(t) {
    return typeof t == "function" ? t : t == null ? n : typeof t == "object" ? r(t) ? a(t[0], t[1]) : e(t) : o(t);
  }
  return mu = s, mu;
}
var pu, dv;
function yw() {
  if (dv) return pu;
  dv = 1;
  var e = WY(), a = EN(), n = Xe(), r = xe();
  function o(s, t) {
    var i = r(s) ? e : a;
    return i(s, n(t, 3));
  }
  return pu = o, pu;
}
var hu, cv;
function QN() {
  if (cv) return hu;
  cv = 1;
  var e = Object.prototype, a = e.hasOwnProperty;
  function n(r, o) {
    return r != null && a.call(r, o);
  }
  return hu = n, hu;
}
var vu, _v;
function gw() {
  if (_v) return vu;
  _v = 1;
  var e = QN(), a = pw();
  function n(r, o) {
    return r != null && a(r, o, e);
  }
  return vu = n, vu;
}
var yu, fv;
function eO() {
  if (fv) return yu;
  fv = 1;
  var e = nc(), a = wt(), n = Ot(), r = xe(), o = Ke(), s = Yt(), t = uo(), i = zt(), u = "[object Map]", l = "[object Set]", d = Object.prototype, c = d.hasOwnProperty;
  function _(f) {
    if (f == null)
      return !0;
    if (o(f) && (r(f) || typeof f == "string" || typeof f.splice == "function" || s(f) || i(f) || n(f)))
      return !f.length;
    var m = a(f);
    if (m == u || m == l)
      return !f.size;
    if (t(f))
      return !e(f).length;
    for (var h in f)
      if (c.call(f, h))
        return !1;
    return !0;
  }
  return yu = _, yu;
}
var gu, mv;
function Mw() {
  if (mv) return gu;
  mv = 1;
  function e(a) {
    return a === void 0;
  }
  return gu = e, gu;
}
var Mu, pv;
function bw() {
  if (pv) return Mu;
  pv = 1;
  var e = co(), a = Ke();
  function n(r, o) {
    var s = -1, t = a(r) ? Array(r.length) : [];
    return e(r, function(i, u, l) {
      t[++s] = o(i, u, l);
    }), t;
  }
  return Mu = n, Mu;
}
var bu, hv;
function Yw() {
  if (hv) return bu;
  hv = 1;
  var e = _o(), a = Xe(), n = bw(), r = xe();
  function o(s, t) {
    var i = r(s) ? e : n;
    return i(s, a(t, 3));
  }
  return bu = o, bu;
}
var Yu, vv;
function tO() {
  if (vv) return Yu;
  vv = 1;
  function e(a, n, r, o) {
    var s = -1, t = a == null ? 0 : a.length;
    for (o && t && (r = a[++s]); ++s < t; )
      r = n(r, a[s], s, a);
    return r;
  }
  return Yu = e, Yu;
}
var wu, yv;
function rO() {
  if (yv) return wu;
  yv = 1;
  function e(a, n, r, o, s) {
    return s(a, function(t, i, u) {
      r = o ? (o = !1, t) : n(r, t, i, u);
    }), r;
  }
  return wu = e, wu;
}
var xu, gv;
function ww() {
  if (gv) return xu;
  gv = 1;
  var e = tO(), a = co(), n = Xe(), r = rO(), o = xe();
  function s(t, i, u) {
    var l = o(t) ? e : r, d = arguments.length < 3;
    return l(t, n(i, 4), u, d, a);
  }
  return xu = s, xu;
}
var Lu, Mv;
function nO() {
  if (Mv) return Lu;
  Mv = 1;
  var e = dt(), a = xe(), n = Je(), r = "[object String]";
  function o(s) {
    return typeof s == "string" || !a(s) && n(s) && e(s) == r;
  }
  return Lu = o, Lu;
}
var ku, bv;
function aO() {
  if (bv) return ku;
  bv = 1;
  var e = vw(), a = e("length");
  return ku = a, ku;
}
var Su, Yv;
function oO() {
  if (Yv) return Su;
  Yv = 1;
  var e = "\\ud800-\\udfff", a = "\\u0300-\\u036f", n = "\\ufe20-\\ufe2f", r = "\\u20d0-\\u20ff", o = a + n + r, s = "\\ufe0e\\ufe0f", t = "\\u200d", i = RegExp("[" + t + e + o + s + "]");
  function u(l) {
    return i.test(l);
  }
  return Su = u, Su;
}
var Du, wv;
function sO() {
  if (wv) return Du;
  wv = 1;
  var e = "\\ud800-\\udfff", a = "\\u0300-\\u036f", n = "\\ufe20-\\ufe2f", r = "\\u20d0-\\u20ff", o = a + n + r, s = "\\ufe0e\\ufe0f", t = "[" + e + "]", i = "[" + o + "]", u = "\\ud83c[\\udffb-\\udfff]", l = "(?:" + i + "|" + u + ")", d = "[^" + e + "]", c = "(?:\\ud83c[\\udde6-\\uddff]){2}", _ = "[\\ud800-\\udbff][\\udc00-\\udfff]", f = "\\u200d", m = l + "?", h = "[" + s + "]?", y = "(?:" + f + "(?:" + [d, c, _].join("|") + ")" + h + m + ")*", p = h + m + y, v = "(?:" + [d + i + "?", i, c, _, t].join("|") + ")", g = RegExp(u + "(?=" + u + ")|" + v + p, "g");
  function M(Y) {
    for (var L = g.lastIndex = 0; g.test(Y); )
      ++L;
    return L;
  }
  return Du = M, Du;
}
var Tu, xv;
function iO() {
  if (xv) return Tu;
  xv = 1;
  var e = aO(), a = oO(), n = sO();
  function r(o) {
    return a(o) ? n(o) : e(o);
  }
  return Tu = r, Tu;
}
var $u, Lv;
function uO() {
  if (Lv) return $u;
  Lv = 1;
  var e = nc(), a = wt(), n = Ke(), r = nO(), o = iO(), s = "[object Map]", t = "[object Set]";
  function i(u) {
    if (u == null)
      return 0;
    if (n(u))
      return r(u) ? o(u) : u.length;
    var l = a(u);
    return l == s || l == t ? u.size : e(u).length;
  }
  return $u = i, $u;
}
var Hu, kv;
function lO() {
  if (kv) return Hu;
  kv = 1;
  var e = ec(), a = rw(), n = lc(), r = Xe(), o = lo(), s = xe(), t = Yt(), i = It(), u = Ie(), l = zt();
  function d(c, _, f) {
    var m = s(c), h = m || t(c) || l(c);
    if (_ = r(_, 4), f == null) {
      var y = c && c.constructor;
      h ? f = m ? new y() : [] : u(c) ? f = i(y) ? a(o(c)) : {} : f = {};
    }
    return (h ? e : n)(c, function(p, v, g) {
      return _(f, p, v, g);
    }), f;
  }
  return Hu = d, Hu;
}
var ju, Sv;
function dO() {
  if (Sv) return ju;
  Sv = 1;
  var e = bt(), a = Ot(), n = xe(), r = e ? e.isConcatSpreadable : void 0;
  function o(s) {
    return n(s) || a(s) || !!(r && s && s[r]);
  }
  return ju = o, ju;
}
var Eu, Dv;
function _c() {
  if (Dv) return Eu;
  Dv = 1;
  var e = oc(), a = dO();
  function n(r, o, s, t, i) {
    var u = -1, l = r.length;
    for (s || (s = a), i || (i = []); ++u < l; ) {
      var d = r[u];
      o > 0 && s(d) ? o > 1 ? n(d, o - 1, s, t, i) : e(i, d) : t || (i[i.length] = d);
    }
    return i;
  }
  return Eu = n, Eu;
}
var Cu, Tv;
function cO() {
  if (Tv) return Cu;
  Tv = 1;
  function e(a, n, r) {
    switch (r.length) {
      case 0:
        return a.call(n);
      case 1:
        return a.call(n, r[0]);
      case 2:
        return a.call(n, r[0], r[1]);
      case 3:
        return a.call(n, r[0], r[1], r[2]);
    }
    return a.apply(n, r);
  }
  return Cu = e, Cu;
}
var qu, $v;
function xw() {
  if ($v) return qu;
  $v = 1;
  var e = cO(), a = Math.max;
  function n(r, o, s) {
    return o = a(o === void 0 ? r.length - 1 : o, 0), function() {
      for (var t = arguments, i = -1, u = a(t.length - o, 0), l = Array(u); ++i < u; )
        l[i] = t[o + i];
      i = -1;
      for (var d = Array(o + 1); ++i < o; )
        d[i] = t[i];
      return d[o] = s(l), e(r, this, d);
    };
  }
  return qu = n, qu;
}
var Au, Hv;
function _O() {
  if (Hv) return Au;
  Hv = 1;
  var e = ic(), a = FY(), n = ft(), r = a ? function(o, s) {
    return a(o, "toString", {
      configurable: !0,
      enumerable: !1,
      value: e(s),
      writable: !0
    });
  } : n;
  return Au = r, Au;
}
var Ru, jv;
function fO() {
  if (jv) return Ru;
  jv = 1;
  var e = 800, a = 16, n = Date.now;
  function r(o) {
    var s = 0, t = 0;
    return function() {
      var i = n(), u = a - (i - t);
      if (t = i, u > 0) {
        if (++s >= e)
          return arguments[0];
      } else
        s = 0;
      return o.apply(void 0, arguments);
    };
  }
  return Ru = r, Ru;
}
var Pu, Ev;
function Lw() {
  if (Ev) return Pu;
  Ev = 1;
  var e = _O(), a = fO(), n = a(e);
  return Pu = n, Pu;
}
var Iu, Cv;
function po() {
  if (Cv) return Iu;
  Cv = 1;
  var e = ft(), a = xw(), n = Lw();
  function r(o, s) {
    return n(a(o, s, e), o + "");
  }
  return Iu = r, Iu;
}
var Nu, qv;
function kw() {
  if (qv) return Nu;
  qv = 1;
  function e(a, n, r, o) {
    for (var s = a.length, t = r + (o ? 1 : -1); o ? t-- : ++t < s; )
      if (n(a[t], t, a))
        return t;
    return -1;
  }
  return Nu = e, Nu;
}
var Ou, Av;
function mO() {
  if (Av) return Ou;
  Av = 1;
  function e(a) {
    return a !== a;
  }
  return Ou = e, Ou;
}
var zu, Rv;
function pO() {
  if (Rv) return zu;
  Rv = 1;
  function e(a, n, r) {
    for (var o = r - 1, s = a.length; ++o < s; )
      if (a[o] === n)
        return o;
    return -1;
  }
  return zu = e, zu;
}
var Fu, Pv;
function hO() {
  if (Pv) return Fu;
  Pv = 1;
  var e = kw(), a = mO(), n = pO();
  function r(o, s, t) {
    return s === s ? n(o, s, t) : e(o, a, t);
  }
  return Fu = r, Fu;
}
var Bu, Iv;
function vO() {
  if (Iv) return Bu;
  Iv = 1;
  var e = hO();
  function a(n, r) {
    var o = n == null ? 0 : n.length;
    return !!o && e(n, r, 0) > -1;
  }
  return Bu = a, Bu;
}
var Gu, Nv;
function yO() {
  if (Nv) return Gu;
  Nv = 1;
  function e(a, n, r) {
    for (var o = -1, s = a == null ? 0 : a.length; ++o < s; )
      if (r(n, a[o]))
        return !0;
    return !1;
  }
  return Gu = e, Gu;
}
var Ju, Ov;
function gO() {
  if (Ov) return Ju;
  Ov = 1;
  function e() {
  }
  return Ju = e, Ju;
}
var Uu, zv;
function MO() {
  if (zv) return Uu;
  zv = 1;
  var e = QY(), a = gO(), n = dc(), r = 1 / 0, o = e && 1 / n(new e([, -0]))[1] == r ? function(s) {
    return new e(s);
  } : a;
  return Uu = o, Uu;
}
var Wu, Fv;
function bO() {
  if (Fv) return Wu;
  Fv = 1;
  var e = uw(), a = vO(), n = yO(), r = lw(), o = MO(), s = dc(), t = 200;
  function i(u, l, d) {
    var c = -1, _ = a, f = u.length, m = !0, h = [], y = h;
    if (d)
      m = !1, _ = n;
    else if (f >= t) {
      var p = l ? null : o(u);
      if (p)
        return s(p);
      m = !1, _ = r, y = new e();
    } else
      y = l ? [] : h;
    e:
      for (; ++c < f; ) {
        var v = u[c], g = l ? l(v) : v;
        if (v = d || v !== 0 ? v : 0, m && g === g) {
          for (var M = y.length; M--; )
            if (y[M] === g)
              continue e;
          l && y.push(g), h.push(v);
        } else _(y, g, d) || (y !== h && y.push(g), h.push(v));
      }
    return h;
  }
  return Wu = i, Wu;
}
var Vu, Bv;
function Sw() {
  if (Bv) return Vu;
  Bv = 1;
  var e = Ke(), a = Je();
  function n(r) {
    return a(r) && e(r);
  }
  return Vu = n, Vu;
}
var Ku, Gv;
function YO() {
  if (Gv) return Ku;
  Gv = 1;
  var e = _c(), a = po(), n = bO(), r = Sw(), o = a(function(s) {
    return n(e(s, 1, r, !0));
  });
  return Ku = o, Ku;
}
var Xu, Jv;
function wO() {
  if (Jv) return Xu;
  Jv = 1;
  var e = _o();
  function a(n, r) {
    return e(r, function(o) {
      return n[o];
    });
  }
  return Xu = a, Xu;
}
var Zu, Uv;
function Dw() {
  if (Uv) return Zu;
  Uv = 1;
  var e = wO(), a = ot();
  function n(r) {
    return r == null ? [] : e(r, a(r));
  }
  return Zu = n, Zu;
}
var Qu, Wv;
function Ne() {
  if (Wv) return Qu;
  Wv = 1;
  var e;
  if (typeof Xd == "function")
    try {
      e = {
        clone: $N(),
        constant: ic(),
        each: iw(),
        filter: yw(),
        has: gw(),
        isArray: xe(),
        isEmpty: eO(),
        isFunction: It(),
        isUndefined: Mw(),
        keys: ot(),
        map: Yw(),
        reduce: ww(),
        size: uO(),
        transform: lO(),
        union: YO(),
        values: Dw()
      };
    } catch {
    }
  return e || (e = window._), Qu = e, Qu;
}
var el, Vv;
function fc() {
  if (Vv) return el;
  Vv = 1;
  var e = Ne();
  el = o;
  var a = "\0", n = "\0", r = "";
  function o(d) {
    this._isDirected = e.has(d, "directed") ? d.directed : !0, this._isMultigraph = e.has(d, "multigraph") ? d.multigraph : !1, this._isCompound = e.has(d, "compound") ? d.compound : !1, this._label = void 0, this._defaultNodeLabelFn = e.constant(void 0), this._defaultEdgeLabelFn = e.constant(void 0), this._nodes = {}, this._isCompound && (this._parent = {}, this._children = {}, this._children[n] = {}), this._in = {}, this._preds = {}, this._out = {}, this._sucs = {}, this._edgeObjs = {}, this._edgeLabels = {};
  }
  o.prototype._nodeCount = 0, o.prototype._edgeCount = 0, o.prototype.isDirected = function() {
    return this._isDirected;
  }, o.prototype.isMultigraph = function() {
    return this._isMultigraph;
  }, o.prototype.isCompound = function() {
    return this._isCompound;
  }, o.prototype.setGraph = function(d) {
    return this._label = d, this;
  }, o.prototype.graph = function() {
    return this._label;
  }, o.prototype.setDefaultNodeLabel = function(d) {
    return e.isFunction(d) || (d = e.constant(d)), this._defaultNodeLabelFn = d, this;
  }, o.prototype.nodeCount = function() {
    return this._nodeCount;
  }, o.prototype.nodes = function() {
    return e.keys(this._nodes);
  }, o.prototype.sources = function() {
    var d = this;
    return e.filter(this.nodes(), function(c) {
      return e.isEmpty(d._in[c]);
    });
  }, o.prototype.sinks = function() {
    var d = this;
    return e.filter(this.nodes(), function(c) {
      return e.isEmpty(d._out[c]);
    });
  }, o.prototype.setNodes = function(d, c) {
    var _ = arguments, f = this;
    return e.each(d, function(m) {
      _.length > 1 ? f.setNode(m, c) : f.setNode(m);
    }), this;
  }, o.prototype.setNode = function(d, c) {
    return e.has(this._nodes, d) ? (arguments.length > 1 && (this._nodes[d] = c), this) : (this._nodes[d] = arguments.length > 1 ? c : this._defaultNodeLabelFn(d), this._isCompound && (this._parent[d] = n, this._children[d] = {}, this._children[n][d] = !0), this._in[d] = {}, this._preds[d] = {}, this._out[d] = {}, this._sucs[d] = {}, ++this._nodeCount, this);
  }, o.prototype.node = function(d) {
    return this._nodes[d];
  }, o.prototype.hasNode = function(d) {
    return e.has(this._nodes, d);
  }, o.prototype.removeNode = function(d) {
    var c = this;
    if (e.has(this._nodes, d)) {
      var _ = function(f) {
        c.removeEdge(c._edgeObjs[f]);
      };
      delete this._nodes[d], this._isCompound && (this._removeFromParentsChildList(d), delete this._parent[d], e.each(this.children(d), function(f) {
        c.setParent(f);
      }), delete this._children[d]), e.each(e.keys(this._in[d]), _), delete this._in[d], delete this._preds[d], e.each(e.keys(this._out[d]), _), delete this._out[d], delete this._sucs[d], --this._nodeCount;
    }
    return this;
  }, o.prototype.setParent = function(d, c) {
    if (!this._isCompound)
      throw new Error("Cannot set parent in a non-compound graph");
    if (e.isUndefined(c))
      c = n;
    else {
      c += "";
      for (var _ = c; !e.isUndefined(_); _ = this.parent(_))
        if (_ === d)
          throw new Error("Setting " + c + " as parent of " + d + " would create a cycle");
      this.setNode(c);
    }
    return this.setNode(d), this._removeFromParentsChildList(d), this._parent[d] = c, this._children[c][d] = !0, this;
  }, o.prototype._removeFromParentsChildList = function(d) {
    delete this._children[this._parent[d]][d];
  }, o.prototype.parent = function(d) {
    if (this._isCompound) {
      var c = this._parent[d];
      if (c !== n)
        return c;
    }
  }, o.prototype.children = function(d) {
    if (e.isUndefined(d) && (d = n), this._isCompound) {
      var c = this._children[d];
      if (c)
        return e.keys(c);
    } else {
      if (d === n)
        return this.nodes();
      if (this.hasNode(d))
        return [];
    }
  }, o.prototype.predecessors = function(d) {
    var c = this._preds[d];
    if (c)
      return e.keys(c);
  }, o.prototype.successors = function(d) {
    var c = this._sucs[d];
    if (c)
      return e.keys(c);
  }, o.prototype.neighbors = function(d) {
    var c = this.predecessors(d);
    if (c)
      return e.union(c, this.successors(d));
  }, o.prototype.isLeaf = function(d) {
    var c;
    return this.isDirected() ? c = this.successors(d) : c = this.neighbors(d), c.length === 0;
  }, o.prototype.filterNodes = function(d) {
    var c = new this.constructor({
      directed: this._isDirected,
      multigraph: this._isMultigraph,
      compound: this._isCompound
    });
    c.setGraph(this.graph());
    var _ = this;
    e.each(this._nodes, function(h, y) {
      d(y) && c.setNode(y, h);
    }), e.each(this._edgeObjs, function(h) {
      c.hasNode(h.v) && c.hasNode(h.w) && c.setEdge(h, _.edge(h));
    });
    var f = {};
    function m(h) {
      var y = _.parent(h);
      return y === void 0 || c.hasNode(y) ? (f[h] = y, y) : y in f ? f[y] : m(y);
    }
    return this._isCompound && e.each(c.nodes(), function(h) {
      c.setParent(h, m(h));
    }), c;
  }, o.prototype.setDefaultEdgeLabel = function(d) {
    return e.isFunction(d) || (d = e.constant(d)), this._defaultEdgeLabelFn = d, this;
  }, o.prototype.edgeCount = function() {
    return this._edgeCount;
  }, o.prototype.edges = function() {
    return e.values(this._edgeObjs);
  }, o.prototype.setPath = function(d, c) {
    var _ = this, f = arguments;
    return e.reduce(d, function(m, h) {
      return f.length > 1 ? _.setEdge(m, h, c) : _.setEdge(m, h), h;
    }), this;
  }, o.prototype.setEdge = function() {
    var d, c, _, f, m = !1, h = arguments[0];
    typeof h == "object" && h !== null && "v" in h ? (d = h.v, c = h.w, _ = h.name, arguments.length === 2 && (f = arguments[1], m = !0)) : (d = h, c = arguments[1], _ = arguments[3], arguments.length > 2 && (f = arguments[2], m = !0)), d = "" + d, c = "" + c, e.isUndefined(_) || (_ = "" + _);
    var y = i(this._isDirected, d, c, _);
    if (e.has(this._edgeLabels, y))
      return m && (this._edgeLabels[y] = f), this;
    if (!e.isUndefined(_) && !this._isMultigraph)
      throw new Error("Cannot set a named edge when isMultigraph = false");
    this.setNode(d), this.setNode(c), this._edgeLabels[y] = m ? f : this._defaultEdgeLabelFn(d, c, _);
    var p = u(this._isDirected, d, c, _);
    return d = p.v, c = p.w, Object.freeze(p), this._edgeObjs[y] = p, s(this._preds[c], d), s(this._sucs[d], c), this._in[c][y] = p, this._out[d][y] = p, this._edgeCount++, this;
  }, o.prototype.edge = function(d, c, _) {
    var f = arguments.length === 1 ? l(this._isDirected, arguments[0]) : i(this._isDirected, d, c, _);
    return this._edgeLabels[f];
  }, o.prototype.hasEdge = function(d, c, _) {
    var f = arguments.length === 1 ? l(this._isDirected, arguments[0]) : i(this._isDirected, d, c, _);
    return e.has(this._edgeLabels, f);
  }, o.prototype.removeEdge = function(d, c, _) {
    var f = arguments.length === 1 ? l(this._isDirected, arguments[0]) : i(this._isDirected, d, c, _), m = this._edgeObjs[f];
    return m && (d = m.v, c = m.w, delete this._edgeLabels[f], delete this._edgeObjs[f], t(this._preds[c], d), t(this._sucs[d], c), delete this._in[c][f], delete this._out[d][f], this._edgeCount--), this;
  }, o.prototype.inEdges = function(d, c) {
    var _ = this._in[d];
    if (_) {
      var f = e.values(_);
      return c ? e.filter(f, function(m) {
        return m.v === c;
      }) : f;
    }
  }, o.prototype.outEdges = function(d, c) {
    var _ = this._out[d];
    if (_) {
      var f = e.values(_);
      return c ? e.filter(f, function(m) {
        return m.w === c;
      }) : f;
    }
  }, o.prototype.nodeEdges = function(d, c) {
    var _ = this.inEdges(d, c);
    if (_)
      return _.concat(this.outEdges(d, c));
  };
  function s(d, c) {
    d[c] ? d[c]++ : d[c] = 1;
  }
  function t(d, c) {
    --d[c] || delete d[c];
  }
  function i(d, c, _, f) {
    var m = "" + c, h = "" + _;
    if (!d && m > h) {
      var y = m;
      m = h, h = y;
    }
    return m + r + h + r + (e.isUndefined(f) ? a : f);
  }
  function u(d, c, _, f) {
    var m = "" + c, h = "" + _;
    if (!d && m > h) {
      var y = m;
      m = h, h = y;
    }
    var p = { v: m, w: h };
    return f && (p.name = f), p;
  }
  function l(d, c) {
    return i(d, c.v, c.w, c.name);
  }
  return el;
}
var tl, Kv;
function xO() {
  return Kv || (Kv = 1, tl = "2.1.8"), tl;
}
var rl, Xv;
function LO() {
  return Xv || (Xv = 1, rl = {
    Graph: fc(),
    version: xO()
  }), rl;
}
var nl, Zv;
function kO() {
  if (Zv) return nl;
  Zv = 1;
  var e = Ne(), a = fc();
  nl = {
    write: n,
    read: s
  };
  function n(t) {
    var i = {
      options: {
        directed: t.isDirected(),
        multigraph: t.isMultigraph(),
        compound: t.isCompound()
      },
      nodes: r(t),
      edges: o(t)
    };
    return e.isUndefined(t.graph()) || (i.value = e.clone(t.graph())), i;
  }
  function r(t) {
    return e.map(t.nodes(), function(i) {
      var u = t.node(i), l = t.parent(i), d = { v: i };
      return e.isUndefined(u) || (d.value = u), e.isUndefined(l) || (d.parent = l), d;
    });
  }
  function o(t) {
    return e.map(t.edges(), function(i) {
      var u = t.edge(i), l = { v: i.v, w: i.w };
      return e.isUndefined(i.name) || (l.name = i.name), e.isUndefined(u) || (l.value = u), l;
    });
  }
  function s(t) {
    var i = new a(t.options).setGraph(t.value);
    return e.each(t.nodes, function(u) {
      i.setNode(u.v, u.value), u.parent && i.setParent(u.v, u.parent);
    }), e.each(t.edges, function(u) {
      i.setEdge({ v: u.v, w: u.w, name: u.name }, u.value);
    }), i;
  }
  return nl;
}
var al, Qv;
function SO() {
  if (Qv) return al;
  Qv = 1;
  var e = Ne();
  al = a;
  function a(n) {
    var r = {}, o = [], s;
    function t(i) {
      e.has(r, i) || (r[i] = !0, s.push(i), e.each(n.successors(i), t), e.each(n.predecessors(i), t));
    }
    return e.each(n.nodes(), function(i) {
      s = [], t(i), s.length && o.push(s);
    }), o;
  }
  return al;
}
var ol, ey;
function Tw() {
  if (ey) return ol;
  ey = 1;
  var e = Ne();
  ol = a;
  function a() {
    this._arr = [], this._keyIndices = {};
  }
  return a.prototype.size = function() {
    return this._arr.length;
  }, a.prototype.keys = function() {
    return this._arr.map(function(n) {
      return n.key;
    });
  }, a.prototype.has = function(n) {
    return e.has(this._keyIndices, n);
  }, a.prototype.priority = function(n) {
    var r = this._keyIndices[n];
    if (r !== void 0)
      return this._arr[r].priority;
  }, a.prototype.min = function() {
    if (this.size() === 0)
      throw new Error("Queue underflow");
    return this._arr[0].key;
  }, a.prototype.add = function(n, r) {
    var o = this._keyIndices;
    if (n = String(n), !e.has(o, n)) {
      var s = this._arr, t = s.length;
      return o[n] = t, s.push({ key: n, priority: r }), this._decrease(t), !0;
    }
    return !1;
  }, a.prototype.removeMin = function() {
    this._swap(0, this._arr.length - 1);
    var n = this._arr.pop();
    return delete this._keyIndices[n.key], this._heapify(0), n.key;
  }, a.prototype.decrease = function(n, r) {
    var o = this._keyIndices[n];
    if (r > this._arr[o].priority)
      throw new Error("New priority is greater than current priority. Key: " + n + " Old: " + this._arr[o].priority + " New: " + r);
    this._arr[o].priority = r, this._decrease(o);
  }, a.prototype._heapify = function(n) {
    var r = this._arr, o = 2 * n, s = o + 1, t = n;
    o < r.length && (t = r[o].priority < r[t].priority ? o : t, s < r.length && (t = r[s].priority < r[t].priority ? s : t), t !== n && (this._swap(n, t), this._heapify(t)));
  }, a.prototype._decrease = function(n) {
    for (var r = this._arr, o = r[n].priority, s; n !== 0 && (s = n >> 1, !(r[s].priority < o)); )
      this._swap(n, s), n = s;
  }, a.prototype._swap = function(n, r) {
    var o = this._arr, s = this._keyIndices, t = o[n], i = o[r];
    o[n] = i, o[r] = t, s[i.key] = n, s[t.key] = r;
  }, ol;
}
var sl, ty;
function $w() {
  if (ty) return sl;
  ty = 1;
  var e = Ne(), a = Tw();
  sl = r;
  var n = e.constant(1);
  function r(s, t, i, u) {
    return o(
      s,
      String(t),
      i || n,
      u || function(l) {
        return s.outEdges(l);
      }
    );
  }
  function o(s, t, i, u) {
    var l = {}, d = new a(), c, _, f = function(m) {
      var h = m.v !== c ? m.v : m.w, y = l[h], p = i(m), v = _.distance + p;
      if (p < 0)
        throw new Error("dijkstra does not allow negative edge weights. Bad edge: " + m + " Weight: " + p);
      v < y.distance && (y.distance = v, y.predecessor = c, d.decrease(h, v));
    };
    for (s.nodes().forEach(function(m) {
      var h = m === t ? 0 : Number.POSITIVE_INFINITY;
      l[m] = { distance: h }, d.add(m, h);
    }); d.size() > 0 && (c = d.removeMin(), _ = l[c], _.distance !== Number.POSITIVE_INFINITY); )
      u(c).forEach(f);
    return l;
  }
  return sl;
}
var il, ry;
function DO() {
  if (ry) return il;
  ry = 1;
  var e = $w(), a = Ne();
  il = n;
  function n(r, o, s) {
    return a.transform(r.nodes(), function(t, i) {
      t[i] = e(r, i, o, s);
    }, {});
  }
  return il;
}
var ul, ny;
function Hw() {
  if (ny) return ul;
  ny = 1;
  var e = Ne();
  ul = a;
  function a(n) {
    var r = 0, o = [], s = {}, t = [];
    function i(u) {
      var l = s[u] = {
        onStack: !0,
        lowlink: r,
        index: r++
      };
      if (o.push(u), n.successors(u).forEach(function(_) {
        e.has(s, _) ? s[_].onStack && (l.lowlink = Math.min(l.lowlink, s[_].index)) : (i(_), l.lowlink = Math.min(l.lowlink, s[_].lowlink));
      }), l.lowlink === l.index) {
        var d = [], c;
        do
          c = o.pop(), s[c].onStack = !1, d.push(c);
        while (u !== c);
        t.push(d);
      }
    }
    return n.nodes().forEach(function(u) {
      e.has(s, u) || i(u);
    }), t;
  }
  return ul;
}
var ll, ay;
function TO() {
  if (ay) return ll;
  ay = 1;
  var e = Ne(), a = Hw();
  ll = n;
  function n(r) {
    return e.filter(a(r), function(o) {
      return o.length > 1 || o.length === 1 && r.hasEdge(o[0], o[0]);
    });
  }
  return ll;
}
var dl, oy;
function $O() {
  if (oy) return dl;
  oy = 1;
  var e = Ne();
  dl = n;
  var a = e.constant(1);
  function n(o, s, t) {
    return r(
      o,
      s || a,
      t || function(i) {
        return o.outEdges(i);
      }
    );
  }
  function r(o, s, t) {
    var i = {}, u = o.nodes();
    return u.forEach(function(l) {
      i[l] = {}, i[l][l] = { distance: 0 }, u.forEach(function(d) {
        l !== d && (i[l][d] = { distance: Number.POSITIVE_INFINITY });
      }), t(l).forEach(function(d) {
        var c = d.v === l ? d.w : d.v, _ = s(d);
        i[l][c] = { distance: _, predecessor: l };
      });
    }), u.forEach(function(l) {
      var d = i[l];
      u.forEach(function(c) {
        var _ = i[c];
        u.forEach(function(f) {
          var m = _[l], h = d[f], y = _[f], p = m.distance + h.distance;
          p < y.distance && (y.distance = p, y.predecessor = h.predecessor);
        });
      });
    }), i;
  }
  return dl;
}
var cl, sy;
function jw() {
  if (sy) return cl;
  sy = 1;
  var e = Ne();
  cl = a, a.CycleException = n;
  function a(r) {
    var o = {}, s = {}, t = [];
    function i(u) {
      if (e.has(s, u))
        throw new n();
      e.has(o, u) || (s[u] = !0, o[u] = !0, e.each(r.predecessors(u), i), delete s[u], t.push(u));
    }
    if (e.each(r.sinks(), i), e.size(o) !== r.nodeCount())
      throw new n();
    return t;
  }
  function n() {
  }
  return n.prototype = new Error(), cl;
}
var _l, iy;
function HO() {
  if (iy) return _l;
  iy = 1;
  var e = jw();
  _l = a;
  function a(n) {
    try {
      e(n);
    } catch (r) {
      if (r instanceof e.CycleException)
        return !1;
      throw r;
    }
    return !0;
  }
  return _l;
}
var fl, uy;
function Ew() {
  if (uy) return fl;
  uy = 1;
  var e = Ne();
  fl = a;
  function a(r, o, s) {
    e.isArray(o) || (o = [o]);
    var t = (r.isDirected() ? r.successors : r.neighbors).bind(r), i = [], u = {};
    return e.each(o, function(l) {
      if (!r.hasNode(l))
        throw new Error("Graph does not have node: " + l);
      n(r, l, s === "post", u, t, i);
    }), i;
  }
  function n(r, o, s, t, i, u) {
    e.has(t, o) || (t[o] = !0, s || u.push(o), e.each(i(o), function(l) {
      n(r, l, s, t, i, u);
    }), s && u.push(o));
  }
  return fl;
}
var ml, ly;
function jO() {
  if (ly) return ml;
  ly = 1;
  var e = Ew();
  ml = a;
  function a(n, r) {
    return e(n, r, "post");
  }
  return ml;
}
var pl, dy;
function EO() {
  if (dy) return pl;
  dy = 1;
  var e = Ew();
  pl = a;
  function a(n, r) {
    return e(n, r, "pre");
  }
  return pl;
}
var hl, cy;
function CO() {
  if (cy) return hl;
  cy = 1;
  var e = Ne(), a = fc(), n = Tw();
  hl = r;
  function r(o, s) {
    var t = new a(), i = {}, u = new n(), l;
    function d(_) {
      var f = _.v === l ? _.w : _.v, m = u.priority(f);
      if (m !== void 0) {
        var h = s(_);
        h < m && (i[f] = l, u.decrease(f, h));
      }
    }
    if (o.nodeCount() === 0)
      return t;
    e.each(o.nodes(), function(_) {
      u.add(_, Number.POSITIVE_INFINITY), t.setNode(_);
    }), u.decrease(o.nodes()[0], 0);
    for (var c = !1; u.size() > 0; ) {
      if (l = u.removeMin(), e.has(i, l))
        t.setEdge(l, i[l]);
      else {
        if (c)
          throw new Error("Input graph is not connected: " + o);
        c = !0;
      }
      o.nodeEdges(l).forEach(d);
    }
    return t;
  }
  return hl;
}
var vl, _y;
function qO() {
  return _y || (_y = 1, vl = {
    components: SO(),
    dijkstra: $w(),
    dijkstraAll: DO(),
    findCycles: TO(),
    floydWarshall: $O(),
    isAcyclic: HO(),
    postorder: jO(),
    preorder: EO(),
    prim: CO(),
    tarjan: Hw(),
    topsort: jw()
  }), vl;
}
var yl, fy;
function AO() {
  if (fy) return yl;
  fy = 1;
  var e = LO();
  return yl = {
    Graph: e.Graph,
    json: kO(),
    alg: qO(),
    version: e.version
  }, yl;
}
var gl, my;
function ze() {
  if (my) return gl;
  my = 1;
  var e;
  if (typeof Xd == "function")
    try {
      e = AO();
    } catch {
    }
  return e || (e = window.graphlib), gl = e, gl;
}
var Ml, py;
function RO() {
  if (py) return Ml;
  py = 1;
  var e = aw(), a = 1, n = 4;
  function r(o) {
    return e(o, a | n);
  }
  return Ml = r, Ml;
}
var bl, hy;
function ho() {
  if (hy) return bl;
  hy = 1;
  var e = Mt(), a = Ke(), n = so(), r = Ie();
  function o(s, t, i) {
    if (!r(i))
      return !1;
    var u = typeof t;
    return (u == "number" ? a(i) && n(t, i.length) : u == "string" && t in i) ? e(i[t], s) : !1;
  }
  return bl = o, bl;
}
var Yl, vy;
function PO() {
  if (vy) return Yl;
  vy = 1;
  var e = po(), a = Mt(), n = ho(), r = _t(), o = Object.prototype, s = o.hasOwnProperty, t = e(function(i, u) {
    i = Object(i);
    var l = -1, d = u.length, c = d > 2 ? u[2] : void 0;
    for (c && n(u[0], u[1], c) && (d = 1); ++l < d; )
      for (var _ = u[l], f = r(_), m = -1, h = f.length; ++m < h; ) {
        var y = f[m], p = i[y];
        (p === void 0 || a(p, o[y]) && !s.call(i, y)) && (i[y] = _[y]);
      }
    return i;
  });
  return Yl = t, Yl;
}
var wl, yy;
function IO() {
  if (yy) return wl;
  yy = 1;
  var e = Xe(), a = Ke(), n = ot();
  function r(o) {
    return function(s, t, i) {
      var u = Object(s);
      if (!a(s)) {
        var l = e(t, 3);
        s = n(s), t = function(c) {
          return l(u[c], c, u);
        };
      }
      var d = o(s, t, i);
      return d > -1 ? u[l ? s[d] : d] : void 0;
    };
  }
  return wl = r, wl;
}
var xl, gy;
function NO() {
  if (gy) return xl;
  gy = 1;
  var e = /\s/;
  function a(n) {
    for (var r = n.length; r-- && e.test(n.charAt(r)); )
      ;
    return r;
  }
  return xl = a, xl;
}
var Ll, My;
function OO() {
  if (My) return Ll;
  My = 1;
  var e = NO(), a = /^\s+/;
  function n(r) {
    return r && r.slice(0, e(r) + 1).replace(a, "");
  }
  return Ll = n, Ll;
}
var kl, by;
function zO() {
  if (by) return kl;
  by = 1;
  var e = OO(), a = Ie(), n = xt(), r = NaN, o = /^[-+]0x[0-9a-f]+$/i, s = /^0b[01]+$/i, t = /^0o[0-7]+$/i, i = parseInt;
  function u(l) {
    if (typeof l == "number")
      return l;
    if (n(l))
      return r;
    if (a(l)) {
      var d = typeof l.valueOf == "function" ? l.valueOf() : l;
      l = a(d) ? d + "" : d;
    }
    if (typeof l != "string")
      return l === 0 ? l : +l;
    l = e(l);
    var c = s.test(l);
    return c || t.test(l) ? i(l.slice(2), c ? 2 : 8) : o.test(l) ? r : +l;
  }
  return kl = u, kl;
}
var Sl, Yy;
function Cw() {
  if (Yy) return Sl;
  Yy = 1;
  var e = zO(), a = 1 / 0, n = 17976931348623157e292;
  function r(o) {
    if (!o)
      return o === 0 ? o : 0;
    if (o = e(o), o === a || o === -a) {
      var s = o < 0 ? -1 : 1;
      return s * n;
    }
    return o === o ? o : 0;
  }
  return Sl = r, Sl;
}
var Dl, wy;
function FO() {
  if (wy) return Dl;
  wy = 1;
  var e = Cw();
  function a(n) {
    var r = e(n), o = r % 1;
    return r === r ? o ? r - o : r : 0;
  }
  return Dl = a, Dl;
}
var Tl, xy;
function BO() {
  if (xy) return Tl;
  xy = 1;
  var e = kw(), a = Xe(), n = FO(), r = Math.max;
  function o(s, t, i) {
    var u = s == null ? 0 : s.length;
    if (!u)
      return -1;
    var l = i == null ? 0 : n(i);
    return l < 0 && (l = r(u + l, 0)), e(s, a(t, 3), l);
  }
  return Tl = o, Tl;
}
var $l, Ly;
function GO() {
  if (Ly) return $l;
  Ly = 1;
  var e = IO(), a = BO(), n = e(a);
  return $l = n, $l;
}
var Hl, ky;
function qw() {
  if (ky) return Hl;
  ky = 1;
  var e = _c();
  function a(n) {
    var r = n == null ? 0 : n.length;
    return r ? e(n, 1) : [];
  }
  return Hl = a, Hl;
}
var jl, Sy;
function JO() {
  if (Sy) return jl;
  Sy = 1;
  var e = uc(), a = ow(), n = _t();
  function r(o, s) {
    return o == null ? o : e(o, a(s), n);
  }
  return jl = r, jl;
}
var El, Dy;
function UO() {
  if (Dy) return El;
  Dy = 1;
  function e(a) {
    var n = a == null ? 0 : a.length;
    return n ? a[n - 1] : void 0;
  }
  return El = e, El;
}
var Cl, Ty;
function WO() {
  if (Ty) return Cl;
  Ty = 1;
  var e = ao(), a = lc(), n = Xe();
  function r(o, s) {
    var t = {};
    return s = n(s, 3), a(o, function(i, u, l) {
      e(t, u, s(i, u, l));
    }), t;
  }
  return Cl = r, Cl;
}
var ql, $y;
function mc() {
  if ($y) return ql;
  $y = 1;
  var e = xt();
  function a(n, r, o) {
    for (var s = -1, t = n.length; ++s < t; ) {
      var i = n[s], u = r(i);
      if (u != null && (l === void 0 ? u === u && !e(u) : o(u, l)))
        var l = u, d = i;
    }
    return d;
  }
  return ql = a, ql;
}
var Al, Hy;
function VO() {
  if (Hy) return Al;
  Hy = 1;
  function e(a, n) {
    return a > n;
  }
  return Al = e, Al;
}
var Rl, jy;
function KO() {
  if (jy) return Rl;
  jy = 1;
  var e = mc(), a = VO(), n = ft();
  function r(o) {
    return o && o.length ? e(o, n, a) : void 0;
  }
  return Rl = r, Rl;
}
var Pl, Ey;
function Aw() {
  if (Ey) return Pl;
  Ey = 1;
  var e = ao(), a = Mt();
  function n(r, o, s) {
    (s !== void 0 && !a(r[o], s) || s === void 0 && !(o in r)) && e(r, o, s);
  }
  return Pl = n, Pl;
}
var Il, Cy;
function XO() {
  if (Cy) return Il;
  Cy = 1;
  var e = dt(), a = lo(), n = Je(), r = "[object Object]", o = Function.prototype, s = Object.prototype, t = o.toString, i = s.hasOwnProperty, u = t.call(Object);
  function l(d) {
    if (!n(d) || e(d) != r)
      return !1;
    var c = a(d);
    if (c === null)
      return !0;
    var _ = i.call(c, "constructor") && c.constructor;
    return typeof _ == "function" && _ instanceof _ && t.call(_) == u;
  }
  return Il = l, Il;
}
var Nl, qy;
function Rw() {
  if (qy) return Nl;
  qy = 1;
  function e(a, n) {
    if (!(n === "constructor" && typeof a[n] == "function") && n != "__proto__")
      return a[n];
  }
  return Nl = e, Nl;
}
var Ol, Ay;
function ZO() {
  if (Ay) return Ol;
  Ay = 1;
  var e = Nt(), a = _t();
  function n(r) {
    return e(r, a(r));
  }
  return Ol = n, Ol;
}
var zl, Ry;
function QO() {
  if (Ry) return zl;
  Ry = 1;
  var e = Aw(), a = JY(), n = tw(), r = UY(), o = nw(), s = Ot(), t = xe(), i = Sw(), u = Yt(), l = It(), d = Ie(), c = XO(), _ = zt(), f = Rw(), m = ZO();
  function h(y, p, v, g, M, Y, L) {
    var D = f(y, v), w = f(p, v), T = L.get(w);
    if (T) {
      e(y, v, T);
      return;
    }
    var k = Y ? Y(D, w, v + "", y, p, L) : void 0, S = k === void 0;
    if (S) {
      var F = t(w), B = !F && u(w), $ = !F && !B && _(w);
      k = w, F || B || $ ? t(D) ? k = D : i(D) ? k = r(D) : B ? (S = !1, k = a(w, !0)) : $ ? (S = !1, k = n(w, !0)) : k = [] : c(w) || s(w) ? (k = D, s(D) ? k = m(D) : (!d(D) || l(D)) && (k = o(w))) : S = !1;
    }
    S && (L.set(w, k), M(k, w, g, Y, L), L.delete(w)), e(y, v, k);
  }
  return zl = h, zl;
}
var Fl, Py;
function e3() {
  if (Py) return Fl;
  Py = 1;
  var e = no(), a = Aw(), n = uc(), r = QO(), o = Ie(), s = _t(), t = Rw();
  function i(u, l, d, c, _) {
    u !== l && n(l, function(f, m) {
      if (_ || (_ = new e()), o(f))
        r(u, l, m, d, i, c, _);
      else {
        var h = c ? c(t(u, m), f, m + "", u, l, _) : void 0;
        h === void 0 && (h = f), a(u, m, h);
      }
    }, s);
  }
  return Fl = i, Fl;
}
var Bl, Iy;
function t3() {
  if (Iy) return Bl;
  Iy = 1;
  var e = po(), a = ho();
  function n(r) {
    return e(function(o, s) {
      var t = -1, i = s.length, u = i > 1 ? s[i - 1] : void 0, l = i > 2 ? s[2] : void 0;
      for (u = r.length > 3 && typeof u == "function" ? (i--, u) : void 0, l && a(s[0], s[1], l) && (u = i < 3 ? void 0 : u, i = 1), o = Object(o); ++t < i; ) {
        var d = s[t];
        d && r(o, d, t, u);
      }
      return o;
    });
  }
  return Bl = n, Bl;
}
var Gl, Ny;
function r3() {
  if (Ny) return Gl;
  Ny = 1;
  var e = e3(), a = t3(), n = a(function(r, o, s) {
    e(r, o, s);
  });
  return Gl = n, Gl;
}
var Jl, Oy;
function Pw() {
  if (Oy) return Jl;
  Oy = 1;
  function e(a, n) {
    return a < n;
  }
  return Jl = e, Jl;
}
var Ul, zy;
function n3() {
  if (zy) return Ul;
  zy = 1;
  var e = mc(), a = Pw(), n = ft();
  function r(o) {
    return o && o.length ? e(o, n, a) : void 0;
  }
  return Ul = r, Ul;
}
var Wl, Fy;
function a3() {
  if (Fy) return Wl;
  Fy = 1;
  var e = mc(), a = Xe(), n = Pw();
  function r(o, s) {
    return o && o.length ? e(o, a(s, 2), n) : void 0;
  }
  return Wl = r, Wl;
}
var Vl, By;
function o3() {
  if (By) return Vl;
  By = 1;
  var e = Fe(), a = function() {
    return e.Date.now();
  };
  return Vl = a, Vl;
}
var Kl, Gy;
function s3() {
  if (Gy) return Kl;
  Gy = 1;
  var e = oo(), a = fo(), n = so(), r = Ie(), o = Ft();
  function s(t, i, u, l) {
    if (!r(t))
      return t;
    i = a(i, t);
    for (var d = -1, c = i.length, _ = c - 1, f = t; f != null && ++d < c; ) {
      var m = o(i[d]), h = u;
      if (m === "__proto__" || m === "constructor" || m === "prototype")
        return t;
      if (d != _) {
        var y = f[m];
        h = l ? l(y, m, f) : void 0, h === void 0 && (h = r(y) ? y : n(i[d + 1]) ? [] : {});
      }
      e(f, m, h), f = f[m];
    }
    return t;
  }
  return Kl = s, Kl;
}
var Xl, Jy;
function i3() {
  if (Jy) return Xl;
  Jy = 1;
  var e = mo(), a = s3(), n = fo();
  function r(o, s, t) {
    for (var i = -1, u = s.length, l = {}; ++i < u; ) {
      var d = s[i], c = e(o, d);
      t(c, d) && a(l, n(d, o), c);
    }
    return l;
  }
  return Xl = r, Xl;
}
var Zl, Uy;
function u3() {
  if (Uy) return Zl;
  Uy = 1;
  var e = i3(), a = hw();
  function n(r, o) {
    return e(r, o, function(s, t) {
      return a(r, t);
    });
  }
  return Zl = n, Zl;
}
var Ql, Wy;
function l3() {
  if (Wy) return Ql;
  Wy = 1;
  var e = qw(), a = xw(), n = Lw();
  function r(o) {
    return n(a(o, void 0, e), o + "");
  }
  return Ql = r, Ql;
}
var ed, Vy;
function d3() {
  if (Vy) return ed;
  Vy = 1;
  var e = u3(), a = l3(), n = a(function(r, o) {
    return r == null ? {} : e(r, o);
  });
  return ed = n, ed;
}
var td, Ky;
function c3() {
  if (Ky) return td;
  Ky = 1;
  var e = Math.ceil, a = Math.max;
  function n(r, o, s, t) {
    for (var i = -1, u = a(e((o - r) / (s || 1)), 0), l = Array(u); u--; )
      l[t ? u : ++i] = r, r += s;
    return l;
  }
  return td = n, td;
}
var rd, Xy;
function _3() {
  if (Xy) return rd;
  Xy = 1;
  var e = c3(), a = ho(), n = Cw();
  function r(o) {
    return function(s, t, i) {
      return i && typeof i != "number" && a(s, t, i) && (t = i = void 0), s = n(s), t === void 0 ? (t = s, s = 0) : t = n(t), i = i === void 0 ? s < t ? 1 : -1 : n(i), e(s, t, i, o);
    };
  }
  return rd = r, rd;
}
var nd, Zy;
function f3() {
  if (Zy) return nd;
  Zy = 1;
  var e = _3(), a = e();
  return nd = a, nd;
}
var ad, Qy;
function m3() {
  if (Qy) return ad;
  Qy = 1;
  function e(a, n) {
    var r = a.length;
    for (a.sort(n); r--; )
      a[r] = a[r].value;
    return a;
  }
  return ad = e, ad;
}
var od, eg;
function p3() {
  if (eg) return od;
  eg = 1;
  var e = xt();
  function a(n, r) {
    if (n !== r) {
      var o = n !== void 0, s = n === null, t = n === n, i = e(n), u = r !== void 0, l = r === null, d = r === r, c = e(r);
      if (!l && !c && !i && n > r || i && u && d && !l && !c || s && u && d || !o && d || !t)
        return 1;
      if (!s && !i && !c && n < r || c && o && t && !s && !i || l && o && t || !u && t || !d)
        return -1;
    }
    return 0;
  }
  return od = a, od;
}
var sd, tg;
function h3() {
  if (tg) return sd;
  tg = 1;
  var e = p3();
  function a(n, r, o) {
    for (var s = -1, t = n.criteria, i = r.criteria, u = t.length, l = o.length; ++s < u; ) {
      var d = e(t[s], i[s]);
      if (d) {
        if (s >= l)
          return d;
        var c = o[s];
        return d * (c == "desc" ? -1 : 1);
      }
    }
    return n.index - r.index;
  }
  return sd = a, sd;
}
var id, rg;
function v3() {
  if (rg) return id;
  rg = 1;
  var e = _o(), a = mo(), n = Xe(), r = bw(), o = m3(), s = io(), t = h3(), i = ft(), u = xe();
  function l(d, c, _) {
    c.length ? c = e(c, function(h) {
      return u(h) ? function(y) {
        return a(y, h.length === 1 ? h[0] : h);
      } : h;
    }) : c = [i];
    var f = -1;
    c = e(c, s(n));
    var m = r(d, function(h, y, p) {
      var v = e(c, function(g) {
        return g(h);
      });
      return { criteria: v, index: ++f, value: h };
    });
    return o(m, function(h, y) {
      return t(h, y, _);
    });
  }
  return id = l, id;
}
var ud, ng;
function y3() {
  if (ng) return ud;
  ng = 1;
  var e = _c(), a = v3(), n = po(), r = ho(), o = n(function(s, t) {
    if (s == null)
      return [];
    var i = t.length;
    return i > 1 && r(s, t[0], t[1]) ? t = [] : i > 2 && r(t[0], t[1], t[2]) && (t = [t[0]]), a(s, e(t, 1), []);
  });
  return ud = o, ud;
}
var ld, ag;
function g3() {
  if (ag) return ld;
  ag = 1;
  var e = mw(), a = 0;
  function n(r) {
    var o = ++a;
    return e(r) + o;
  }
  return ld = n, ld;
}
var dd, og;
function M3() {
  if (og) return dd;
  og = 1;
  function e(a, n, r) {
    for (var o = -1, s = a.length, t = n.length, i = {}; ++o < s; ) {
      var u = o < t ? n[o] : void 0;
      r(i, a[o], u);
    }
    return i;
  }
  return dd = e, dd;
}
var cd, sg;
function b3() {
  if (sg) return cd;
  sg = 1;
  var e = oo(), a = M3();
  function n(r, o) {
    return a(r || [], o || [], e);
  }
  return cd = n, cd;
}
var _d, ig;
function ge() {
  if (ig) return _d;
  ig = 1;
  var e;
  if (typeof Xd == "function")
    try {
      e = {
        cloneDeep: RO(),
        constant: ic(),
        defaults: PO(),
        each: iw(),
        filter: yw(),
        find: GO(),
        flatten: qw(),
        forEach: sw(),
        forIn: JO(),
        has: gw(),
        isUndefined: Mw(),
        last: UO(),
        map: Yw(),
        mapValues: WO(),
        max: KO(),
        merge: r3(),
        min: n3(),
        minBy: a3(),
        now: o3(),
        pick: d3(),
        range: f3(),
        reduce: ww(),
        sortBy: y3(),
        uniqueId: g3(),
        values: Dw(),
        zipObject: b3()
      };
    } catch {
    }
  return e || (e = window._), _d = e, _d;
}
var fd, ug;
function Y3() {
  if (ug) return fd;
  ug = 1, fd = e;
  function e() {
    var r = {};
    r._next = r._prev = r, this._sentinel = r;
  }
  e.prototype.dequeue = function() {
    var r = this._sentinel, o = r._prev;
    if (o !== r)
      return a(o), o;
  }, e.prototype.enqueue = function(r) {
    var o = this._sentinel;
    r._prev && r._next && a(r), r._next = o._next, o._next._prev = r, o._next = r, r._prev = o;
  }, e.prototype.toString = function() {
    for (var r = [], o = this._sentinel, s = o._prev; s !== o; )
      r.push(JSON.stringify(s, n)), s = s._prev;
    return "[" + r.join(", ") + "]";
  };
  function a(r) {
    r._prev._next = r._next, r._next._prev = r._prev, delete r._next, delete r._prev;
  }
  function n(r, o) {
    if (r !== "_next" && r !== "_prev")
      return o;
  }
  return fd;
}
var md, lg;
function w3() {
  if (lg) return md;
  lg = 1;
  var e = ge(), a = ze().Graph, n = Y3();
  md = o;
  var r = e.constant(1);
  function o(l, d) {
    if (l.nodeCount() <= 1)
      return [];
    var c = i(l, d || r), _ = s(c.graph, c.buckets, c.zeroIdx);
    return e.flatten(e.map(_, function(f) {
      return l.outEdges(f.v, f.w);
    }), !0);
  }
  function s(l, d, c) {
    for (var _ = [], f = d[d.length - 1], m = d[0], h; l.nodeCount(); ) {
      for (; h = m.dequeue(); )
        t(l, d, c, h);
      for (; h = f.dequeue(); )
        t(l, d, c, h);
      if (l.nodeCount()) {
        for (var y = d.length - 2; y > 0; --y)
          if (h = d[y].dequeue(), h) {
            _ = _.concat(t(l, d, c, h, !0));
            break;
          }
      }
    }
    return _;
  }
  function t(l, d, c, _, f) {
    var m = f ? [] : void 0;
    return e.forEach(l.inEdges(_.v), function(h) {
      var y = l.edge(h), p = l.node(h.v);
      f && m.push({ v: h.v, w: h.w }), p.out -= y, u(d, c, p);
    }), e.forEach(l.outEdges(_.v), function(h) {
      var y = l.edge(h), p = h.w, v = l.node(p);
      v.in -= y, u(d, c, v);
    }), l.removeNode(_.v), m;
  }
  function i(l, d) {
    var c = new a(), _ = 0, f = 0;
    e.forEach(l.nodes(), function(y) {
      c.setNode(y, { v: y, in: 0, out: 0 });
    }), e.forEach(l.edges(), function(y) {
      var p = c.edge(y.v, y.w) || 0, v = d(y), g = p + v;
      c.setEdge(y.v, y.w, g), f = Math.max(f, c.node(y.v).out += v), _ = Math.max(_, c.node(y.w).in += v);
    });
    var m = e.range(f + _ + 3).map(function() {
      return new n();
    }), h = _ + 1;
    return e.forEach(c.nodes(), function(y) {
      u(m, h, c.node(y));
    }), { graph: c, buckets: m, zeroIdx: h };
  }
  function u(l, d, c) {
    c.out ? c.in ? l[c.out - c.in + d].enqueue(c) : l[l.length - 1].enqueue(c) : l[0].enqueue(c);
  }
  return md;
}
var pd, dg;
function x3() {
  if (dg) return pd;
  dg = 1;
  var e = ge(), a = w3();
  pd = {
    run: n,
    undo: o
  };
  function n(s) {
    var t = s.graph().acyclicer === "greedy" ? a(s, i(s)) : r(s);
    e.forEach(t, function(u) {
      var l = s.edge(u);
      s.removeEdge(u), l.forwardName = u.name, l.reversed = !0, s.setEdge(u.w, u.v, l, e.uniqueId("rev"));
    });
    function i(u) {
      return function(l) {
        return u.edge(l).weight;
      };
    }
  }
  function r(s) {
    var t = [], i = {}, u = {};
    function l(d) {
      e.has(u, d) || (u[d] = !0, i[d] = !0, e.forEach(s.outEdges(d), function(c) {
        e.has(i, c.w) ? t.push(c) : l(c.w);
      }), delete i[d]);
    }
    return e.forEach(s.nodes(), l), t;
  }
  function o(s) {
    e.forEach(s.edges(), function(t) {
      var i = s.edge(t);
      if (i.reversed) {
        s.removeEdge(t);
        var u = i.forwardName;
        delete i.reversed, delete i.forwardName, s.setEdge(t.w, t.v, i, u);
      }
    });
  }
  return pd;
}
var hd, cg;
function Ce() {
  if (cg) return hd;
  cg = 1;
  var e = ge(), a = ze().Graph;
  hd = {
    addDummyNode: n,
    simplify: r,
    asNonCompoundGraph: o,
    successorWeights: s,
    predecessorWeights: t,
    intersectRect: i,
    buildLayerMatrix: u,
    normalizeRanks: l,
    removeEmptyRanks: d,
    addBorderNode: c,
    maxRank: _,
    partition: f,
    time: m,
    notime: h
  };
  function n(y, p, v, g) {
    var M;
    do
      M = e.uniqueId(g);
    while (y.hasNode(M));
    return v.dummy = p, y.setNode(M, v), M;
  }
  function r(y) {
    var p = new a().setGraph(y.graph());
    return e.forEach(y.nodes(), function(v) {
      p.setNode(v, y.node(v));
    }), e.forEach(y.edges(), function(v) {
      var g = p.edge(v.v, v.w) || { weight: 0, minlen: 1 }, M = y.edge(v);
      p.setEdge(v.v, v.w, {
        weight: g.weight + M.weight,
        minlen: Math.max(g.minlen, M.minlen)
      });
    }), p;
  }
  function o(y) {
    var p = new a({ multigraph: y.isMultigraph() }).setGraph(y.graph());
    return e.forEach(y.nodes(), function(v) {
      y.children(v).length || p.setNode(v, y.node(v));
    }), e.forEach(y.edges(), function(v) {
      p.setEdge(v, y.edge(v));
    }), p;
  }
  function s(y) {
    var p = e.map(y.nodes(), function(v) {
      var g = {};
      return e.forEach(y.outEdges(v), function(M) {
        g[M.w] = (g[M.w] || 0) + y.edge(M).weight;
      }), g;
    });
    return e.zipObject(y.nodes(), p);
  }
  function t(y) {
    var p = e.map(y.nodes(), function(v) {
      var g = {};
      return e.forEach(y.inEdges(v), function(M) {
        g[M.v] = (g[M.v] || 0) + y.edge(M).weight;
      }), g;
    });
    return e.zipObject(y.nodes(), p);
  }
  function i(y, p) {
    var v = y.x, g = y.y, M = p.x - v, Y = p.y - g, L = y.width / 2, D = y.height / 2;
    if (!M && !Y)
      throw new Error("Not possible to find intersection inside of the rectangle");
    var w, T;
    return Math.abs(Y) * L > Math.abs(M) * D ? (Y < 0 && (D = -D), w = D * M / Y, T = D) : (M < 0 && (L = -L), w = L, T = L * Y / M), { x: v + w, y: g + T };
  }
  function u(y) {
    var p = e.map(e.range(_(y) + 1), function() {
      return [];
    });
    return e.forEach(y.nodes(), function(v) {
      var g = y.node(v), M = g.rank;
      e.isUndefined(M) || (p[M][g.order] = v);
    }), p;
  }
  function l(y) {
    var p = e.min(e.map(y.nodes(), function(v) {
      return y.node(v).rank;
    }));
    e.forEach(y.nodes(), function(v) {
      var g = y.node(v);
      e.has(g, "rank") && (g.rank -= p);
    });
  }
  function d(y) {
    var p = e.min(e.map(y.nodes(), function(Y) {
      return y.node(Y).rank;
    })), v = [];
    e.forEach(y.nodes(), function(Y) {
      var L = y.node(Y).rank - p;
      v[L] || (v[L] = []), v[L].push(Y);
    });
    var g = 0, M = y.graph().nodeRankFactor;
    e.forEach(v, function(Y, L) {
      e.isUndefined(Y) && L % M !== 0 ? --g : g && e.forEach(Y, function(D) {
        y.node(D).rank += g;
      });
    });
  }
  function c(y, p, v, g) {
    var M = {
      width: 0,
      height: 0
    };
    return arguments.length >= 4 && (M.rank = v, M.order = g), n(y, "border", M, p);
  }
  function _(y) {
    return e.max(e.map(y.nodes(), function(p) {
      var v = y.node(p).rank;
      if (!e.isUndefined(v))
        return v;
    }));
  }
  function f(y, p) {
    var v = { lhs: [], rhs: [] };
    return e.forEach(y, function(g) {
      p(g) ? v.lhs.push(g) : v.rhs.push(g);
    }), v;
  }
  function m(y, p) {
    var v = e.now();
    try {
      return p();
    } finally {
      console.log(y + " time: " + (e.now() - v) + "ms");
    }
  }
  function h(y, p) {
    return p();
  }
  return hd;
}
var vd, _g;
function L3() {
  if (_g) return vd;
  _g = 1;
  var e = ge(), a = Ce();
  vd = {
    run: n,
    undo: o
  };
  function n(s) {
    s.graph().dummyChains = [], e.forEach(s.edges(), function(t) {
      r(s, t);
    });
  }
  function r(s, t) {
    var i = t.v, u = s.node(i).rank, l = t.w, d = s.node(l).rank, c = t.name, _ = s.edge(t), f = _.labelRank;
    if (d !== u + 1) {
      s.removeEdge(t);
      var m, h, y;
      for (y = 0, ++u; u < d; ++y, ++u)
        _.points = [], h = {
          width: 0,
          height: 0,
          edgeLabel: _,
          edgeObj: t,
          rank: u
        }, m = a.addDummyNode(s, "edge", h, "_d"), u === f && (h.width = _.width, h.height = _.height, h.dummy = "edge-label", h.labelpos = _.labelpos), s.setEdge(i, m, { weight: _.weight }, c), y === 0 && s.graph().dummyChains.push(m), i = m;
      s.setEdge(i, l, { weight: _.weight }, c);
    }
  }
  function o(s) {
    e.forEach(s.graph().dummyChains, function(t) {
      var i = s.node(t), u = i.edgeLabel, l;
      for (s.setEdge(i.edgeObj, u); i.dummy; )
        l = s.successors(t)[0], s.removeNode(t), u.points.push({ x: i.x, y: i.y }), i.dummy === "edge-label" && (u.x = i.x, u.y = i.y, u.width = i.width, u.height = i.height), t = l, i = s.node(t);
    });
  }
  return vd;
}
var yd, fg;
function Wa() {
  if (fg) return yd;
  fg = 1;
  var e = ge();
  yd = {
    longestPath: a,
    slack: n
  };
  function a(r) {
    var o = {};
    function s(t) {
      var i = r.node(t);
      if (e.has(o, t))
        return i.rank;
      o[t] = !0;
      var u = e.min(e.map(r.outEdges(t), function(l) {
        return s(l.w) - r.edge(l).minlen;
      }));
      return (u === Number.POSITIVE_INFINITY || // return value of _.map([]) for Lodash 3
      u === void 0 || // return value of _.map([]) for Lodash 4
      u === null) && (u = 0), i.rank = u;
    }
    e.forEach(r.sources(), s);
  }
  function n(r, o) {
    return r.node(o.w).rank - r.node(o.v).rank - r.edge(o).minlen;
  }
  return yd;
}
var gd, mg;
function Iw() {
  if (mg) return gd;
  mg = 1;
  var e = ge(), a = ze().Graph, n = Wa().slack;
  gd = r;
  function r(i) {
    var u = new a({ directed: !1 }), l = i.nodes()[0], d = i.nodeCount();
    u.setNode(l, {});
    for (var c, _; o(u, i) < d; )
      c = s(u, i), _ = u.hasNode(c.v) ? n(i, c) : -n(i, c), t(u, i, _);
    return u;
  }
  function o(i, u) {
    function l(d) {
      e.forEach(u.nodeEdges(d), function(c) {
        var _ = c.v, f = d === _ ? c.w : _;
        !i.hasNode(f) && !n(u, c) && (i.setNode(f, {}), i.setEdge(d, f, {}), l(f));
      });
    }
    return e.forEach(i.nodes(), l), i.nodeCount();
  }
  function s(i, u) {
    return e.minBy(u.edges(), function(l) {
      if (i.hasNode(l.v) !== i.hasNode(l.w))
        return n(u, l);
    });
  }
  function t(i, u, l) {
    e.forEach(i.nodes(), function(d) {
      u.node(d).rank += l;
    });
  }
  return gd;
}
var Md, pg;
function k3() {
  if (pg) return Md;
  pg = 1;
  var e = ge(), a = Iw(), n = Wa().slack, r = Wa().longestPath, o = ze().alg.preorder, s = ze().alg.postorder, t = Ce().simplify;
  Md = i, i.initLowLimValues = c, i.initCutValues = u, i.calcCutValue = d, i.leaveEdge = f, i.enterEdge = m, i.exchangeEdges = h;
  function i(g) {
    g = t(g), r(g);
    var M = a(g);
    c(M), u(M, g);
    for (var Y, L; Y = f(M); )
      L = m(M, g, Y), h(M, g, Y, L);
  }
  function u(g, M) {
    var Y = s(g, g.nodes());
    Y = Y.slice(0, Y.length - 1), e.forEach(Y, function(L) {
      l(g, M, L);
    });
  }
  function l(g, M, Y) {
    var L = g.node(Y), D = L.parent;
    g.edge(Y, D).cutvalue = d(g, M, Y);
  }
  function d(g, M, Y) {
    var L = g.node(Y), D = L.parent, w = !0, T = M.edge(Y, D), k = 0;
    return T || (w = !1, T = M.edge(D, Y)), k = T.weight, e.forEach(M.nodeEdges(Y), function(S) {
      var F = S.v === Y, B = F ? S.w : S.v;
      if (B !== D) {
        var $ = F === w, x = M.edge(S).weight;
        if (k += $ ? x : -x, p(g, Y, B)) {
          var j = g.edge(Y, B).cutvalue;
          k += $ ? -j : j;
        }
      }
    }), k;
  }
  function c(g, M) {
    arguments.length < 2 && (M = g.nodes()[0]), _(g, {}, 1, M);
  }
  function _(g, M, Y, L, D) {
    var w = Y, T = g.node(L);
    return M[L] = !0, e.forEach(g.neighbors(L), function(k) {
      e.has(M, k) || (Y = _(g, M, Y, k, L));
    }), T.low = w, T.lim = Y++, D ? T.parent = D : delete T.parent, Y;
  }
  function f(g) {
    return e.find(g.edges(), function(M) {
      return g.edge(M).cutvalue < 0;
    });
  }
  function m(g, M, Y) {
    var L = Y.v, D = Y.w;
    M.hasEdge(L, D) || (L = Y.w, D = Y.v);
    var w = g.node(L), T = g.node(D), k = w, S = !1;
    w.lim > T.lim && (k = T, S = !0);
    var F = e.filter(M.edges(), function(B) {
      return S === v(g, g.node(B.v), k) && S !== v(g, g.node(B.w), k);
    });
    return e.minBy(F, function(B) {
      return n(M, B);
    });
  }
  function h(g, M, Y, L) {
    var D = Y.v, w = Y.w;
    g.removeEdge(D, w), g.setEdge(L.v, L.w, {}), c(g), u(g, M), y(g, M);
  }
  function y(g, M) {
    var Y = e.find(g.nodes(), function(D) {
      return !M.node(D).parent;
    }), L = o(g, Y);
    L = L.slice(1), e.forEach(L, function(D) {
      var w = g.node(D).parent, T = M.edge(D, w), k = !1;
      T || (T = M.edge(w, D), k = !0), M.node(D).rank = M.node(w).rank + (k ? T.minlen : -T.minlen);
    });
  }
  function p(g, M, Y) {
    return g.hasEdge(M, Y);
  }
  function v(g, M, Y) {
    return Y.low <= M.lim && M.lim <= Y.lim;
  }
  return Md;
}
var bd, hg;
function S3() {
  if (hg) return bd;
  hg = 1;
  var e = Wa(), a = e.longestPath, n = Iw(), r = k3();
  bd = o;
  function o(u) {
    switch (u.graph().ranker) {
      case "network-simplex":
        i(u);
        break;
      case "tight-tree":
        t(u);
        break;
      case "longest-path":
        s(u);
        break;
      default:
        i(u);
    }
  }
  var s = a;
  function t(u) {
    a(u), n(u);
  }
  function i(u) {
    r(u);
  }
  return bd;
}
var Yd, vg;
function D3() {
  if (vg) return Yd;
  vg = 1;
  var e = ge();
  Yd = a;
  function a(o) {
    var s = r(o);
    e.forEach(o.graph().dummyChains, function(t) {
      for (var i = o.node(t), u = i.edgeObj, l = n(o, s, u.v, u.w), d = l.path, c = l.lca, _ = 0, f = d[_], m = !0; t !== u.w; ) {
        if (i = o.node(t), m) {
          for (; (f = d[_]) !== c && o.node(f).maxRank < i.rank; )
            _++;
          f === c && (m = !1);
        }
        if (!m) {
          for (; _ < d.length - 1 && o.node(f = d[_ + 1]).minRank <= i.rank; )
            _++;
          f = d[_];
        }
        o.setParent(t, f), t = o.successors(t)[0];
      }
    });
  }
  function n(o, s, t, i) {
    var u = [], l = [], d = Math.min(s[t].low, s[i].low), c = Math.max(s[t].lim, s[i].lim), _, f;
    _ = t;
    do
      _ = o.parent(_), u.push(_);
    while (_ && (s[_].low > d || c > s[_].lim));
    for (f = _, _ = i; (_ = o.parent(_)) !== f; )
      l.push(_);
    return { path: u.concat(l.reverse()), lca: f };
  }
  function r(o) {
    var s = {}, t = 0;
    function i(u) {
      var l = t;
      e.forEach(o.children(u), i), s[u] = { low: l, lim: t++ };
    }
    return e.forEach(o.children(), i), s;
  }
  return Yd;
}
var wd, yg;
function T3() {
  if (yg) return wd;
  yg = 1;
  var e = ge(), a = Ce();
  wd = {
    run: n,
    cleanup: t
  };
  function n(i) {
    var u = a.addDummyNode(i, "root", {}, "_root"), l = o(i), d = e.max(e.values(l)) - 1, c = 2 * d + 1;
    i.graph().nestingRoot = u, e.forEach(i.edges(), function(f) {
      i.edge(f).minlen *= c;
    });
    var _ = s(i) + 1;
    e.forEach(i.children(), function(f) {
      r(i, u, c, _, d, l, f);
    }), i.graph().nodeRankFactor = c;
  }
  function r(i, u, l, d, c, _, f) {
    var m = i.children(f);
    if (!m.length) {
      f !== u && i.setEdge(u, f, { weight: 0, minlen: l });
      return;
    }
    var h = a.addBorderNode(i, "_bt"), y = a.addBorderNode(i, "_bb"), p = i.node(f);
    i.setParent(h, f), p.borderTop = h, i.setParent(y, f), p.borderBottom = y, e.forEach(m, function(v) {
      r(i, u, l, d, c, _, v);
      var g = i.node(v), M = g.borderTop ? g.borderTop : v, Y = g.borderBottom ? g.borderBottom : v, L = g.borderTop ? d : 2 * d, D = M !== Y ? 1 : c - _[f] + 1;
      i.setEdge(h, M, {
        weight: L,
        minlen: D,
        nestingEdge: !0
      }), i.setEdge(Y, y, {
        weight: L,
        minlen: D,
        nestingEdge: !0
      });
    }), i.parent(f) || i.setEdge(u, h, { weight: 0, minlen: c + _[f] });
  }
  function o(i) {
    var u = {};
    function l(d, c) {
      var _ = i.children(d);
      _ && _.length && e.forEach(_, function(f) {
        l(f, c + 1);
      }), u[d] = c;
    }
    return e.forEach(i.children(), function(d) {
      l(d, 1);
    }), u;
  }
  function s(i) {
    return e.reduce(i.edges(), function(u, l) {
      return u + i.edge(l).weight;
    }, 0);
  }
  function t(i) {
    var u = i.graph();
    i.removeNode(u.nestingRoot), delete u.nestingRoot, e.forEach(i.edges(), function(l) {
      var d = i.edge(l);
      d.nestingEdge && i.removeEdge(l);
    });
  }
  return wd;
}
var xd, gg;
function $3() {
  if (gg) return xd;
  gg = 1;
  var e = ge(), a = Ce();
  xd = n;
  function n(o) {
    function s(t) {
      var i = o.children(t), u = o.node(t);
      if (i.length && e.forEach(i, s), e.has(u, "minRank")) {
        u.borderLeft = [], u.borderRight = [];
        for (var l = u.minRank, d = u.maxRank + 1; l < d; ++l)
          r(o, "borderLeft", "_bl", t, u, l), r(o, "borderRight", "_br", t, u, l);
      }
    }
    e.forEach(o.children(), s);
  }
  function r(o, s, t, i, u, l) {
    var d = { width: 0, height: 0, rank: l, borderType: s }, c = u[s][l - 1], _ = a.addDummyNode(o, "border", d, t);
    u[s][l] = _, o.setParent(_, i), c && o.setEdge(c, _, { weight: 1 });
  }
  return xd;
}
var Ld, Mg;
function H3() {
  if (Mg) return Ld;
  Mg = 1;
  var e = ge();
  Ld = {
    adjust: a,
    undo: n
  };
  function a(l) {
    var d = l.graph().rankdir.toLowerCase();
    (d === "lr" || d === "rl") && r(l);
  }
  function n(l) {
    var d = l.graph().rankdir.toLowerCase();
    (d === "bt" || d === "rl") && s(l), (d === "lr" || d === "rl") && (i(l), r(l));
  }
  function r(l) {
    e.forEach(l.nodes(), function(d) {
      o(l.node(d));
    }), e.forEach(l.edges(), function(d) {
      o(l.edge(d));
    });
  }
  function o(l) {
    var d = l.width;
    l.width = l.height, l.height = d;
  }
  function s(l) {
    e.forEach(l.nodes(), function(d) {
      t(l.node(d));
    }), e.forEach(l.edges(), function(d) {
      var c = l.edge(d);
      e.forEach(c.points, t), e.has(c, "y") && t(c);
    });
  }
  function t(l) {
    l.y = -l.y;
  }
  function i(l) {
    e.forEach(l.nodes(), function(d) {
      u(l.node(d));
    }), e.forEach(l.edges(), function(d) {
      var c = l.edge(d);
      e.forEach(c.points, u), e.has(c, "x") && u(c);
    });
  }
  function u(l) {
    var d = l.x;
    l.x = l.y, l.y = d;
  }
  return Ld;
}
var kd, bg;
function j3() {
  if (bg) return kd;
  bg = 1;
  var e = ge();
  kd = a;
  function a(n) {
    var r = {}, o = e.filter(n.nodes(), function(l) {
      return !n.children(l).length;
    }), s = e.max(e.map(o, function(l) {
      return n.node(l).rank;
    })), t = e.map(e.range(s + 1), function() {
      return [];
    });
    function i(l) {
      if (!e.has(r, l)) {
        r[l] = !0;
        var d = n.node(l);
        t[d.rank].push(l), e.forEach(n.successors(l), i);
      }
    }
    var u = e.sortBy(o, function(l) {
      return n.node(l).rank;
    });
    return e.forEach(u, i), t;
  }
  return kd;
}
var Sd, Yg;
function E3() {
  if (Yg) return Sd;
  Yg = 1;
  var e = ge();
  Sd = a;
  function a(r, o) {
    for (var s = 0, t = 1; t < o.length; ++t)
      s += n(r, o[t - 1], o[t]);
    return s;
  }
  function n(r, o, s) {
    for (var t = e.zipObject(
      s,
      e.map(s, function(_, f) {
        return f;
      })
    ), i = e.flatten(e.map(o, function(_) {
      return e.sortBy(e.map(r.outEdges(_), function(f) {
        return { pos: t[f.w], weight: r.edge(f).weight };
      }), "pos");
    }), !0), u = 1; u < s.length; ) u <<= 1;
    var l = 2 * u - 1;
    u -= 1;
    var d = e.map(new Array(l), function() {
      return 0;
    }), c = 0;
    return e.forEach(i.forEach(function(_) {
      var f = _.pos + u;
      d[f] += _.weight;
      for (var m = 0; f > 0; )
        f % 2 && (m += d[f + 1]), f = f - 1 >> 1, d[f] += _.weight;
      c += _.weight * m;
    })), c;
  }
  return Sd;
}
var Dd, wg;
function C3() {
  if (wg) return Dd;
  wg = 1;
  var e = ge();
  Dd = a;
  function a(n, r) {
    return e.map(r, function(o) {
      var s = n.inEdges(o);
      if (s.length) {
        var t = e.reduce(s, function(i, u) {
          var l = n.edge(u), d = n.node(u.v);
          return {
            sum: i.sum + l.weight * d.order,
            weight: i.weight + l.weight
          };
        }, { sum: 0, weight: 0 });
        return {
          v: o,
          barycenter: t.sum / t.weight,
          weight: t.weight
        };
      } else
        return { v: o };
    });
  }
  return Dd;
}
var Td, xg;
function q3() {
  if (xg) return Td;
  xg = 1;
  var e = ge();
  Td = a;
  function a(o, s) {
    var t = {};
    e.forEach(o, function(u, l) {
      var d = t[u.v] = {
        indegree: 0,
        in: [],
        out: [],
        vs: [u.v],
        i: l
      };
      e.isUndefined(u.barycenter) || (d.barycenter = u.barycenter, d.weight = u.weight);
    }), e.forEach(s.edges(), function(u) {
      var l = t[u.v], d = t[u.w];
      !e.isUndefined(l) && !e.isUndefined(d) && (d.indegree++, l.out.push(t[u.w]));
    });
    var i = e.filter(t, function(u) {
      return !u.indegree;
    });
    return n(i);
  }
  function n(o) {
    var s = [];
    function t(l) {
      return function(d) {
        d.merged || (e.isUndefined(d.barycenter) || e.isUndefined(l.barycenter) || d.barycenter >= l.barycenter) && r(l, d);
      };
    }
    function i(l) {
      return function(d) {
        d.in.push(l), --d.indegree === 0 && o.push(d);
      };
    }
    for (; o.length; ) {
      var u = o.pop();
      s.push(u), e.forEach(u.in.reverse(), t(u)), e.forEach(u.out, i(u));
    }
    return e.map(
      e.filter(s, function(l) {
        return !l.merged;
      }),
      function(l) {
        return e.pick(l, ["vs", "i", "barycenter", "weight"]);
      }
    );
  }
  function r(o, s) {
    var t = 0, i = 0;
    o.weight && (t += o.barycenter * o.weight, i += o.weight), s.weight && (t += s.barycenter * s.weight, i += s.weight), o.vs = s.vs.concat(o.vs), o.barycenter = t / i, o.weight = i, o.i = Math.min(s.i, o.i), s.merged = !0;
  }
  return Td;
}
var $d, Lg;
function A3() {
  if (Lg) return $d;
  Lg = 1;
  var e = ge(), a = Ce();
  $d = n;
  function n(s, t) {
    var i = a.partition(s, function(h) {
      return e.has(h, "barycenter");
    }), u = i.lhs, l = e.sortBy(i.rhs, function(h) {
      return -h.i;
    }), d = [], c = 0, _ = 0, f = 0;
    u.sort(o(!!t)), f = r(d, l, f), e.forEach(u, function(h) {
      f += h.vs.length, d.push(h.vs), c += h.barycenter * h.weight, _ += h.weight, f = r(d, l, f);
    });
    var m = { vs: e.flatten(d, !0) };
    return _ && (m.barycenter = c / _, m.weight = _), m;
  }
  function r(s, t, i) {
    for (var u; t.length && (u = e.last(t)).i <= i; )
      t.pop(), s.push(u.vs), i++;
    return i;
  }
  function o(s) {
    return function(t, i) {
      return t.barycenter < i.barycenter ? -1 : t.barycenter > i.barycenter ? 1 : s ? i.i - t.i : t.i - i.i;
    };
  }
  return $d;
}
var Hd, kg;
function R3() {
  if (kg) return Hd;
  kg = 1;
  var e = ge(), a = C3(), n = q3(), r = A3();
  Hd = o;
  function o(i, u, l, d) {
    var c = i.children(u), _ = i.node(u), f = _ ? _.borderLeft : void 0, m = _ ? _.borderRight : void 0, h = {};
    f && (c = e.filter(c, function(Y) {
      return Y !== f && Y !== m;
    }));
    var y = a(i, c);
    e.forEach(y, function(Y) {
      if (i.children(Y.v).length) {
        var L = o(i, Y.v, l, d);
        h[Y.v] = L, e.has(L, "barycenter") && t(Y, L);
      }
    });
    var p = n(y, l);
    s(p, h);
    var v = r(p, d);
    if (f && (v.vs = e.flatten([f, v.vs, m], !0), i.predecessors(f).length)) {
      var g = i.node(i.predecessors(f)[0]), M = i.node(i.predecessors(m)[0]);
      e.has(v, "barycenter") || (v.barycenter = 0, v.weight = 0), v.barycenter = (v.barycenter * v.weight + g.order + M.order) / (v.weight + 2), v.weight += 2;
    }
    return v;
  }
  function s(i, u) {
    e.forEach(i, function(l) {
      l.vs = e.flatten(l.vs.map(function(d) {
        return u[d] ? u[d].vs : d;
      }), !0);
    });
  }
  function t(i, u) {
    e.isUndefined(i.barycenter) ? (i.barycenter = u.barycenter, i.weight = u.weight) : (i.barycenter = (i.barycenter * i.weight + u.barycenter * u.weight) / (i.weight + u.weight), i.weight += u.weight);
  }
  return Hd;
}
var jd, Sg;
function P3() {
  if (Sg) return jd;
  Sg = 1;
  var e = ge(), a = ze().Graph;
  jd = n;
  function n(o, s, t) {
    var i = r(o), u = new a({ compound: !0 }).setGraph({ root: i }).setDefaultNodeLabel(function(l) {
      return o.node(l);
    });
    return e.forEach(o.nodes(), function(l) {
      var d = o.node(l), c = o.parent(l);
      (d.rank === s || d.minRank <= s && s <= d.maxRank) && (u.setNode(l), u.setParent(l, c || i), e.forEach(o[t](l), function(_) {
        var f = _.v === l ? _.w : _.v, m = u.edge(f, l), h = e.isUndefined(m) ? 0 : m.weight;
        u.setEdge(f, l, { weight: o.edge(_).weight + h });
      }), e.has(d, "minRank") && u.setNode(l, {
        borderLeft: d.borderLeft[s],
        borderRight: d.borderRight[s]
      }));
    }), u;
  }
  function r(o) {
    for (var s; o.hasNode(s = e.uniqueId("_root")); ) ;
    return s;
  }
  return jd;
}
var Ed, Dg;
function I3() {
  if (Dg) return Ed;
  Dg = 1;
  var e = ge();
  Ed = a;
  function a(n, r, o) {
    var s = {}, t;
    e.forEach(o, function(i) {
      for (var u = n.parent(i), l, d; u; ) {
        if (l = n.parent(u), l ? (d = s[l], s[l] = u) : (d = t, t = u), d && d !== u) {
          r.setEdge(d, u);
          return;
        }
        u = l;
      }
    });
  }
  return Ed;
}
var Cd, Tg;
function N3() {
  if (Tg) return Cd;
  Tg = 1;
  var e = ge(), a = j3(), n = E3(), r = R3(), o = P3(), s = I3(), t = ze().Graph, i = Ce();
  Cd = u;
  function u(_) {
    var f = i.maxRank(_), m = l(_, e.range(1, f + 1), "inEdges"), h = l(_, e.range(f - 1, -1, -1), "outEdges"), y = a(_);
    c(_, y);
    for (var p = Number.POSITIVE_INFINITY, v, g = 0, M = 0; M < 4; ++g, ++M) {
      d(g % 2 ? m : h, g % 4 >= 2), y = i.buildLayerMatrix(_);
      var Y = n(_, y);
      Y < p && (M = 0, v = e.cloneDeep(y), p = Y);
    }
    c(_, v);
  }
  function l(_, f, m) {
    return e.map(f, function(h) {
      return o(_, h, m);
    });
  }
  function d(_, f) {
    var m = new t();
    e.forEach(_, function(h) {
      var y = h.graph().root, p = r(h, y, m, f);
      e.forEach(p.vs, function(v, g) {
        h.node(v).order = g;
      }), s(h, m, p.vs);
    });
  }
  function c(_, f) {
    e.forEach(f, function(m) {
      e.forEach(m, function(h, y) {
        _.node(h).order = y;
      });
    });
  }
  return Cd;
}
var qd, $g;
function O3() {
  if ($g) return qd;
  $g = 1;
  var e = ge(), a = ze().Graph, n = Ce();
  qd = {
    positionX: m,
    findType1Conflicts: r,
    findType2Conflicts: o,
    addConflict: t,
    hasConflict: i,
    verticalAlignment: u,
    horizontalCompaction: l,
    alignCoordinates: _,
    findSmallestWidthAlignment: c,
    balance: f
  };
  function r(p, v) {
    var g = {};
    function M(Y, L) {
      var D = 0, w = 0, T = Y.length, k = e.last(L);
      return e.forEach(L, function(S, F) {
        var B = s(p, S), $ = B ? p.node(B).order : T;
        (B || S === k) && (e.forEach(L.slice(w, F + 1), function(x) {
          e.forEach(p.predecessors(x), function(j) {
            var G = p.node(j), z = G.order;
            (z < D || $ < z) && !(G.dummy && p.node(x).dummy) && t(g, j, x);
          });
        }), w = F + 1, D = $);
      }), L;
    }
    return e.reduce(v, M), g;
  }
  function o(p, v) {
    var g = {};
    function M(L, D, w, T, k) {
      var S;
      e.forEach(e.range(D, w), function(F) {
        S = L[F], p.node(S).dummy && e.forEach(p.predecessors(S), function(B) {
          var $ = p.node(B);
          $.dummy && ($.order < T || $.order > k) && t(g, B, S);
        });
      });
    }
    function Y(L, D) {
      var w = -1, T, k = 0;
      return e.forEach(D, function(S, F) {
        if (p.node(S).dummy === "border") {
          var B = p.predecessors(S);
          B.length && (T = p.node(B[0]).order, M(D, k, F, w, T), k = F, w = T);
        }
        M(D, k, D.length, T, L.length);
      }), D;
    }
    return e.reduce(v, Y), g;
  }
  function s(p, v) {
    if (p.node(v).dummy)
      return e.find(p.predecessors(v), function(g) {
        return p.node(g).dummy;
      });
  }
  function t(p, v, g) {
    if (v > g) {
      var M = v;
      v = g, g = M;
    }
    var Y = p[v];
    Y || (p[v] = Y = {}), Y[g] = !0;
  }
  function i(p, v, g) {
    if (v > g) {
      var M = v;
      v = g, g = M;
    }
    return e.has(p[v], g);
  }
  function u(p, v, g, M) {
    var Y = {}, L = {}, D = {};
    return e.forEach(v, function(w) {
      e.forEach(w, function(T, k) {
        Y[T] = T, L[T] = T, D[T] = k;
      });
    }), e.forEach(v, function(w) {
      var T = -1;
      e.forEach(w, function(k) {
        var S = M(k);
        if (S.length) {
          S = e.sortBy(S, function(j) {
            return D[j];
          });
          for (var F = (S.length - 1) / 2, B = Math.floor(F), $ = Math.ceil(F); B <= $; ++B) {
            var x = S[B];
            L[k] === k && T < D[x] && !i(g, k, x) && (L[x] = k, L[k] = Y[k] = Y[x], T = D[x]);
          }
        }
      });
    }), { root: Y, align: L };
  }
  function l(p, v, g, M, Y) {
    var L = {}, D = d(p, v, g, Y), w = Y ? "borderLeft" : "borderRight";
    function T(F, B) {
      for (var $ = D.nodes(), x = $.pop(), j = {}; x; )
        j[x] ? F(x) : (j[x] = !0, $.push(x), $ = $.concat(B(x))), x = $.pop();
    }
    function k(F) {
      L[F] = D.inEdges(F).reduce(function(B, $) {
        return Math.max(B, L[$.v] + D.edge($));
      }, 0);
    }
    function S(F) {
      var B = D.outEdges(F).reduce(function(x, j) {
        return Math.min(x, L[j.w] - D.edge(j));
      }, Number.POSITIVE_INFINITY), $ = p.node(F);
      B !== Number.POSITIVE_INFINITY && $.borderType !== w && (L[F] = Math.max(L[F], B));
    }
    return T(k, D.predecessors.bind(D)), T(S, D.successors.bind(D)), e.forEach(M, function(F) {
      L[F] = L[g[F]];
    }), L;
  }
  function d(p, v, g, M) {
    var Y = new a(), L = p.graph(), D = h(L.nodesep, L.edgesep, M);
    return e.forEach(v, function(w) {
      var T;
      e.forEach(w, function(k) {
        var S = g[k];
        if (Y.setNode(S), T) {
          var F = g[T], B = Y.edge(F, S);
          Y.setEdge(F, S, Math.max(D(p, k, T), B || 0));
        }
        T = k;
      });
    }), Y;
  }
  function c(p, v) {
    return e.minBy(e.values(v), function(g) {
      var M = Number.NEGATIVE_INFINITY, Y = Number.POSITIVE_INFINITY;
      return e.forIn(g, function(L, D) {
        var w = y(p, D) / 2;
        M = Math.max(L + w, M), Y = Math.min(L - w, Y);
      }), M - Y;
    });
  }
  function _(p, v) {
    var g = e.values(v), M = e.min(g), Y = e.max(g);
    e.forEach(["u", "d"], function(L) {
      e.forEach(["l", "r"], function(D) {
        var w = L + D, T = p[w], k;
        if (T !== v) {
          var S = e.values(T);
          k = D === "l" ? M - e.min(S) : Y - e.max(S), k && (p[w] = e.mapValues(T, function(F) {
            return F + k;
          }));
        }
      });
    });
  }
  function f(p, v) {
    return e.mapValues(p.ul, function(g, M) {
      if (v)
        return p[v.toLowerCase()][M];
      var Y = e.sortBy(e.map(p, M));
      return (Y[1] + Y[2]) / 2;
    });
  }
  function m(p) {
    var v = n.buildLayerMatrix(p), g = e.merge(
      r(p, v),
      o(p, v)
    ), M = {}, Y;
    e.forEach(["u", "d"], function(D) {
      Y = D === "u" ? v : e.values(v).reverse(), e.forEach(["l", "r"], function(w) {
        w === "r" && (Y = e.map(Y, function(F) {
          return e.values(F).reverse();
        }));
        var T = (D === "u" ? p.predecessors : p.successors).bind(p), k = u(p, Y, g, T), S = l(
          p,
          Y,
          k.root,
          k.align,
          w === "r"
        );
        w === "r" && (S = e.mapValues(S, function(F) {
          return -F;
        })), M[D + w] = S;
      });
    });
    var L = c(p, M);
    return _(M, L), f(M, p.graph().align);
  }
  function h(p, v, g) {
    return function(M, Y, L) {
      var D = M.node(Y), w = M.node(L), T = 0, k;
      if (T += D.width / 2, e.has(D, "labelpos"))
        switch (D.labelpos.toLowerCase()) {
          case "l":
            k = -D.width / 2;
            break;
          case "r":
            k = D.width / 2;
            break;
        }
      if (k && (T += g ? k : -k), k = 0, T += (D.dummy ? v : p) / 2, T += (w.dummy ? v : p) / 2, T += w.width / 2, e.has(w, "labelpos"))
        switch (w.labelpos.toLowerCase()) {
          case "l":
            k = w.width / 2;
            break;
          case "r":
            k = -w.width / 2;
            break;
        }
      return k && (T += g ? k : -k), k = 0, T;
    };
  }
  function y(p, v) {
    return p.node(v).width;
  }
  return qd;
}
var Ad, Hg;
function z3() {
  if (Hg) return Ad;
  Hg = 1;
  var e = ge(), a = Ce(), n = O3().positionX;
  Ad = r;
  function r(s) {
    s = a.asNonCompoundGraph(s), o(s), e.forEach(n(s), function(t, i) {
      s.node(i).x = t;
    });
  }
  function o(s) {
    var t = a.buildLayerMatrix(s), i = s.graph().ranksep, u = 0;
    e.forEach(t, function(l) {
      var d = e.max(e.map(l, function(c) {
        return s.node(c).height;
      }));
      e.forEach(l, function(c) {
        s.node(c).y = u + d / 2;
      }), u += d + i;
    });
  }
  return Ad;
}
var Rd, jg;
function F3() {
  if (jg) return Rd;
  jg = 1;
  var e = ge(), a = x3(), n = L3(), r = S3(), o = Ce().normalizeRanks, s = D3(), t = Ce().removeEmptyRanks, i = T3(), u = $3(), l = H3(), d = N3(), c = z3(), _ = Ce(), f = ze().Graph;
  Rd = m;
  function m(R, O) {
    var U = O && O.debugTiming ? _.time : _.notime;
    U("layout", function() {
      var V = U("  buildLayoutGraph", function() {
        return T(R);
      });
      U("  runLayout", function() {
        h(V, U);
      }), U("  updateInputGraph", function() {
        y(R, V);
      });
    });
  }
  function h(R, O) {
    O("    makeSpaceForEdgeLabels", function() {
      k(R);
    }), O("    removeSelfEdges", function() {
      W(R);
    }), O("    acyclic", function() {
      a.run(R);
    }), O("    nestingGraph.run", function() {
      i.run(R);
    }), O("    rank", function() {
      r(_.asNonCompoundGraph(R));
    }), O("    injectEdgeLabelProxies", function() {
      S(R);
    }), O("    removeEmptyRanks", function() {
      t(R);
    }), O("    nestingGraph.cleanup", function() {
      i.cleanup(R);
    }), O("    normalizeRanks", function() {
      o(R);
    }), O("    assignRankMinMax", function() {
      F(R);
    }), O("    removeEdgeLabelProxies", function() {
      B(R);
    }), O("    normalize.run", function() {
      n.run(R);
    }), O("    parentDummyChains", function() {
      s(R);
    }), O("    addBorderSegments", function() {
      u(R);
    }), O("    order", function() {
      d(R);
    }), O("    insertSelfEdges", function() {
      Z(R);
    }), O("    adjustCoordinateSystem", function() {
      l.adjust(R);
    }), O("    position", function() {
      c(R);
    }), O("    positionSelfEdges", function() {
      K(R);
    }), O("    removeBorderNodes", function() {
      z(R);
    }), O("    normalize.undo", function() {
      n.undo(R);
    }), O("    fixupEdgeLabelCoords", function() {
      j(R);
    }), O("    undoCoordinateSystem", function() {
      l.undo(R);
    }), O("    translateGraph", function() {
      $(R);
    }), O("    assignNodeIntersects", function() {
      x(R);
    }), O("    reversePoints", function() {
      G(R);
    }), O("    acyclic.undo", function() {
      a.undo(R);
    });
  }
  function y(R, O) {
    e.forEach(R.nodes(), function(U) {
      var V = R.node(U), oe = O.node(U);
      V && (V.x = oe.x, V.y = oe.y, O.children(U).length && (V.width = oe.width, V.height = oe.height));
    }), e.forEach(R.edges(), function(U) {
      var V = R.edge(U), oe = O.edge(U);
      V.points = oe.points, e.has(oe, "x") && (V.x = oe.x, V.y = oe.y);
    }), R.graph().width = O.graph().width, R.graph().height = O.graph().height;
  }
  var p = ["nodesep", "edgesep", "ranksep", "marginx", "marginy"], v = { ranksep: 50, edgesep: 20, nodesep: 50, rankdir: "tb" }, g = ["acyclicer", "ranker", "rankdir", "align"], M = ["width", "height"], Y = { width: 0, height: 0 }, L = ["minlen", "weight", "width", "height", "labeloffset"], D = {
    minlen: 1,
    weight: 1,
    width: 0,
    height: 0,
    labeloffset: 10,
    labelpos: "r"
  }, w = ["labelpos"];
  function T(R) {
    var O = new f({ multigraph: !0, compound: !0 }), U = se(R.graph());
    return O.setGraph(e.merge(
      {},
      v,
      ne(U, p),
      e.pick(U, g)
    )), e.forEach(R.nodes(), function(V) {
      var oe = se(R.node(V));
      O.setNode(V, e.defaults(ne(oe, M), Y)), O.setParent(V, R.parent(V));
    }), e.forEach(R.edges(), function(V) {
      var oe = se(R.edge(V));
      O.setEdge(V, e.merge(
        {},
        D,
        ne(oe, L),
        e.pick(oe, w)
      ));
    }), O;
  }
  function k(R) {
    var O = R.graph();
    O.ranksep /= 2, e.forEach(R.edges(), function(U) {
      var V = R.edge(U);
      V.minlen *= 2, V.labelpos.toLowerCase() !== "c" && (O.rankdir === "TB" || O.rankdir === "BT" ? V.width += V.labeloffset : V.height += V.labeloffset);
    });
  }
  function S(R) {
    e.forEach(R.edges(), function(O) {
      var U = R.edge(O);
      if (U.width && U.height) {
        var V = R.node(O.v), oe = R.node(O.w), ce = { rank: (oe.rank - V.rank) / 2 + V.rank, e: O };
        _.addDummyNode(R, "edge-proxy", ce, "_ep");
      }
    });
  }
  function F(R) {
    var O = 0;
    e.forEach(R.nodes(), function(U) {
      var V = R.node(U);
      V.borderTop && (V.minRank = R.node(V.borderTop).rank, V.maxRank = R.node(V.borderBottom).rank, O = e.max(O, V.maxRank));
    }), R.graph().maxRank = O;
  }
  function B(R) {
    e.forEach(R.nodes(), function(O) {
      var U = R.node(O);
      U.dummy === "edge-proxy" && (R.edge(U.e).labelRank = U.rank, R.removeNode(O));
    });
  }
  function $(R) {
    var O = Number.POSITIVE_INFINITY, U = 0, V = Number.POSITIVE_INFINITY, oe = 0, ce = R.graph(), le = ce.marginx || 0, he = ce.marginy || 0;
    function Ae(be) {
      var Se = be.x, _e = be.y, Ue = be.width, fe = be.height;
      O = Math.min(O, Se - Ue / 2), U = Math.max(U, Se + Ue / 2), V = Math.min(V, _e - fe / 2), oe = Math.max(oe, _e + fe / 2);
    }
    e.forEach(R.nodes(), function(be) {
      Ae(R.node(be));
    }), e.forEach(R.edges(), function(be) {
      var Se = R.edge(be);
      e.has(Se, "x") && Ae(Se);
    }), O -= le, V -= he, e.forEach(R.nodes(), function(be) {
      var Se = R.node(be);
      Se.x -= O, Se.y -= V;
    }), e.forEach(R.edges(), function(be) {
      var Se = R.edge(be);
      e.forEach(Se.points, function(_e) {
        _e.x -= O, _e.y -= V;
      }), e.has(Se, "x") && (Se.x -= O), e.has(Se, "y") && (Se.y -= V);
    }), ce.width = U - O + le, ce.height = oe - V + he;
  }
  function x(R) {
    e.forEach(R.edges(), function(O) {
      var U = R.edge(O), V = R.node(O.v), oe = R.node(O.w), ce, le;
      U.points ? (ce = U.points[0], le = U.points[U.points.length - 1]) : (U.points = [], ce = oe, le = V), U.points.unshift(_.intersectRect(V, ce)), U.points.push(_.intersectRect(oe, le));
    });
  }
  function j(R) {
    e.forEach(R.edges(), function(O) {
      var U = R.edge(O);
      if (e.has(U, "x"))
        switch ((U.labelpos === "l" || U.labelpos === "r") && (U.width -= U.labeloffset), U.labelpos) {
          case "l":
            U.x -= U.width / 2 + U.labeloffset;
            break;
          case "r":
            U.x += U.width / 2 + U.labeloffset;
            break;
        }
    });
  }
  function G(R) {
    e.forEach(R.edges(), function(O) {
      var U = R.edge(O);
      U.reversed && U.points.reverse();
    });
  }
  function z(R) {
    e.forEach(R.nodes(), function(O) {
      if (R.children(O).length) {
        var U = R.node(O), V = R.node(U.borderTop), oe = R.node(U.borderBottom), ce = R.node(e.last(U.borderLeft)), le = R.node(e.last(U.borderRight));
        U.width = Math.abs(le.x - ce.x), U.height = Math.abs(oe.y - V.y), U.x = ce.x + U.width / 2, U.y = V.y + U.height / 2;
      }
    }), e.forEach(R.nodes(), function(O) {
      R.node(O).dummy === "border" && R.removeNode(O);
    });
  }
  function W(R) {
    e.forEach(R.edges(), function(O) {
      if (O.v === O.w) {
        var U = R.node(O.v);
        U.selfEdges || (U.selfEdges = []), U.selfEdges.push({ e: O, label: R.edge(O) }), R.removeEdge(O);
      }
    });
  }
  function Z(R) {
    var O = _.buildLayerMatrix(R);
    e.forEach(O, function(U) {
      var V = 0;
      e.forEach(U, function(oe, ce) {
        var le = R.node(oe);
        le.order = ce + V, e.forEach(le.selfEdges, function(he) {
          _.addDummyNode(R, "selfedge", {
            width: he.label.width,
            height: he.label.height,
            rank: le.rank,
            order: ce + ++V,
            e: he.e,
            label: he.label
          }, "_se");
        }), delete le.selfEdges;
      });
    });
  }
  function K(R) {
    e.forEach(R.nodes(), function(O) {
      var U = R.node(O);
      if (U.dummy === "selfedge") {
        var V = R.node(U.e.v), oe = V.x + V.width / 2, ce = V.y, le = U.x - oe, he = V.height / 2;
        R.setEdge(U.e, U.label), R.removeNode(O), U.label.points = [
          { x: oe + 2 * le / 3, y: ce - he },
          { x: oe + 5 * le / 6, y: ce - he },
          { x: oe + le, y: ce },
          { x: oe + 5 * le / 6, y: ce + he },
          { x: oe + 2 * le / 3, y: ce + he }
        ], U.label.x = U.x, U.label.y = U.y;
      }
    });
  }
  function ne(R, O) {
    return e.mapValues(e.pick(R, O), Number);
  }
  function se(R) {
    var O = {};
    return e.forEach(R, function(U, V) {
      O[V.toLowerCase()] = U;
    }), O;
  }
  return Rd;
}
var Pd, Eg;
function B3() {
  if (Eg) return Pd;
  Eg = 1;
  var e = ge(), a = Ce(), n = ze().Graph;
  Pd = {
    debugOrdering: r
  };
  function r(o) {
    var s = a.buildLayerMatrix(o), t = new n({ compound: !0, multigraph: !0 }).setGraph({});
    return e.forEach(o.nodes(), function(i) {
      t.setNode(i, { label: i }), t.setParent(i, "layer" + o.node(i).rank);
    }), e.forEach(o.edges(), function(i) {
      t.setEdge(i.v, i.w, {}, i.name);
    }), e.forEach(s, function(i, u) {
      var l = "layer" + u;
      t.setNode(l, { rank: "same" }), e.reduce(i, function(d, c) {
        return t.setEdge(d, c, { style: "invis" }), c;
      });
    }), t;
  }
  return Pd;
}
var Id, Cg;
function G3() {
  return Cg || (Cg = 1, Id = "0.8.5"), Id;
}
var Nd, qg;
function J3() {
  return qg || (qg = 1, Nd = {
    graphlib: ze(),
    layout: F3(),
    debug: B3(),
    util: {
      time: Ce().time,
      notime: Ce().notime
    },
    version: G3()
  }), Nd;
}
var Nw = J3();
const U3 = /* @__PURE__ */ A(Nw), W3 = /* @__PURE__ */ q({
  __proto__: null,
  default: U3
}, [Nw]);
export {
  nt as AI_WORKFLOW_NODE_TYPES,
  wk as AiAgentNode,
  Nk as AiConditionNode,
  Jk as AiEndNode,
  ik as AiLlmNode,
  eS as AiMemoryNode,
  LD as AiNodeEditPanel,
  pk as AiPromptNode,
  Fk as AiStartNode,
  Hk as AiToolNode,
  rt as BPMN_NODE_TYPES,
  _F as BaseEdge,
  nF as BaseNode,
  pF as BezierEdge,
  wL as BpmnEndEvent,
  FL as BpmnExclusiveGateway,
  QL as BpmnInclusiveGateway,
  WL as BpmnParallelGateway,
  Rx as BpmnProcessEngine,
  EL as BpmnServiceTask,
  gL as BpmnStartEvent,
  DL as BpmnTask,
  PL as BpmnUserTask,
  f1 as Controls,
  iF as CustomNode,
  hF as DataFlowEdge,
  pL as DatabaseNode,
  iL as DiamondNode,
  UD as EdgeEditPanel,
  vF as Flow,
  yF as FlowBackground,
  Ix as FlowCollaborationEngine,
  sF as GroupNode,
  aF as InputNode,
  Jx as Minimap,
  A0 as NodeEditPanel,
  uF as NodeResizer,
  lF as NodeToolbar,
  oF as OutputNode,
  P1 as PluginManager,
  Pz as ReactiveGraph,
  fF as SmoothEdge,
  mF as StepEdge,
  wz as angleToCanvasCoordinateSystem,
  Wz as applyFlowTheme,
  cz as bfs,
  Bz as bpmnXmlToFlow,
  Ia as canvasToScreen,
  Dx as captureElement,
  Rz as clearCustomTypes,
  Fz as clearMemoCache,
  $x as copyBlobToClipboard,
  Uz as createBpmnEngine,
  Kz as createCollaborationEngine,
  Sz as createConnectionValidator,
  Oa as createControlsPlugin,
  Yo as createCustomTheme,
  eF as createDefaultPluginSet,
  Ba as createExportPlugin,
  X3 as createFlowContext,
  za as createGridPlugin,
  Vg as createHistoryPlugin,
  Ug as createKeyboardPlugin,
  Ga as createLayoutPlugin,
  Na as createMiniMapPlugin,
  hx as createNodeFromTemplate,
  Wg as createNodeGroupPlugin,
  Xz as createPlugin,
  Fa as createSnapPlugin,
  Nz as debounce,
  Qz as defaultPlugins,
  yz as degToRad,
  fx as detectCycles,
  _z as dfs,
  rz as distanceBetweenPoints,
  Yx as exportFlowData,
  lz as findAllPaths,
  dz as findConnectedComponents,
  rF as flowEmits,
  tF as flowProps,
  Fg as flowTheme,
  Px as flowThemeDark,
  Vz as flowThemePresets,
  Cx as flowToBpmnXml,
  Iz as generateId,
  Jz as generateSampleBpmnXml,
  px as getAllCustomEdges,
  Hz as getAllCustomNodeTemplates,
  Ez as getAllCustomNodes,
  bx as getAllEdgeTemplates,
  bz as getAngle,
  Yz as getAngleBetweenPoints,
  Mc as getBezierPath,
  _x as getBoundingBox,
  mx as getCustomEdge,
  vx as getCustomNode,
  Ng as getCustomNodeTemplate,
  dx as getEdgeCenter,
  Pg as getEdgePath,
  sz as getEdgePosition,
  Az as getEdgeTemplate,
  tz as getElementCanvasPosition,
  Xw as getElementPosition,
  gt as getHandlePosition,
  Mz as getLineIntersection,
  pz as getNodeBounds,
  gx as getNodeChildren,
  Mx as getNodeParent,
  mz as getRectIntersection,
  lx as getSmoothStepPath,
  ux as getStepPath,
  ix as getStraightPath,
  nz as getVector,
  Zw as getVectorMagnitude,
  Tz as hasCustomEdge,
  Cz as hasCustomNode,
  jz as hasCustomNodeTemplate,
  cx as hasCycle,
  wx as importFlowData,
  yx as isNestedNode,
  xz as isPointInPolygon,
  fz as isPointInRect,
  Yc as isValidConnection,
  zz as memo,
  az as normalizeVector,
  hz as pointToLineDistance,
  vz as pointToPointDistance,
  Lz as pointToRectDistance,
  ez as projectNodePosition,
  Q3 as provideFlowContext,
  gz as radToDeg,
  Ig as rectIntersect,
  cF as registerAiWorkflowNodes,
  dF as registerBpmnNodes,
  Dz as registerCustomEdge,
  $e as registerCustomNode,
  $z as registerCustomNodeTemplate,
  qz as registerEdgeTemplate,
  Et as screenToCanvas,
  iz as shortenEndpoint,
  Qw as snapPositionToGrid,
  gc as snapToGrid,
  Oz as throttle,
  uz as topologicalSort,
  Tx as triggerDownload,
  sx as useAlignment,
  rx as useEdges,
  Z3 as useFlowContext,
  ax as useHistory,
  ox as useKeyboard,
  oz as useNodeDistribution,
  tx as useNodes,
  nx as useSelection,
  ex as useViewport,
  Gz as validateBpmnXml,
  kz as viewportIntersectsBounds,
  Zz as withHooks
};
