var F1 = Object.defineProperty
var R1 = (e, a, n) =>
  a in e ? F1(e, a, { enumerable: !0, configurable: !0, writable: !0, value: n }) : (e[a] = n)
var ye = (e, a, n) => R1(e, typeof a != 'symbol' ? a + '' : a, n)
import {
  inject as Bd,
  provide as jg,
  ref as ee,
  computed as J,
  shallowRef as Ca,
  defineComponent as ie,
  onMounted as Ht,
  onBeforeUnmount as Nd,
  watch as Le,
  openBlock as $,
  createElementBlock as j,
  withModifiers as we,
  normalizeStyle as re,
  normalizeClass as te,
  createCommentVNode as I,
  createElementVNode as b,
  markRaw as Ja,
  unref as De,
  Fragment as pe,
  renderList as ke,
  nextTick as I1,
  toDisplayString as ae,
  renderSlot as it,
  createBlock as Ve,
  Teleport as Ua,
  useCssVars as P1,
  onUnmounted as B1,
  mergeProps as Et,
  resolveDynamicComponent as Aa,
  createVNode as We,
  Transition as Od,
  withCtx as Tt,
  withDirectives as He,
  withKeys as zd,
  vModelText as Re,
  vModelSelect as N1,
  vModelCheckbox as O1,
  createTextVNode as z1,
  normalizeProps as mc,
  guardReactiveProps as pc,
  getCurrentInstance as G1
} from 'vue'
function q(e, a) {
  for (var n = 0; n < a.length; n++) {
    const r = a[n]
    if (typeof r != 'string' && !Array.isArray(r)) {
      for (const o in r)
        if (o !== 'default' && !(o in e)) {
          const s = Object.getOwnPropertyDescriptor(r, o)
          s &&
            Object.defineProperty(
              e,
              o,
              s.get
                ? s
                : {
                    enumerable: !0,
                    get: () => r[o]
                  }
            )
        }
    }
  }
  return Object.freeze(Object.defineProperty(e, Symbol.toStringTag, { value: 'Module' }))
}
const Cg = Symbol('flow-context')
function GR(e, a, n, r = {}) {
  const o = /* @__PURE__ */ new Map()
  return {
    on: (u, l) => {
      ;(o.has(u) || o.set(u, /* @__PURE__ */ new Set()), o.get(u).add(l))
    },
    off: (u, l) => {
      var d
      ;(d = o.get(u)) == null || d.delete(l)
    },
    emit: (u, ...l) => {
      var d
      ;(d = o.get(u)) == null || d.forEach((c) => c(...l))
    }
  }
}
function JR() {
  const e = Bd(Cg)
  if (!e) throw new Error('useFlowContext must be used within a Flow component')
  return e
}
function UR(e) {
  jg(Cg, e)
}
function $t(e, a, n) {
  return {
    x: (e - n.x) / n.zoom,
    y: (a - n.y) / n.zoom
  }
}
function qa(e, a, n) {
  return {
    x: e * n.zoom + n.x,
    y: a * n.zoom + n.y
  }
}
function WR(e, a, n) {
  const r = $t(e.x, e.y, a)
  return qa(r.x, r.y, n)
}
function J1(e, a) {
  const n = a.getBoundingClientRect(),
    r = e.getBoundingClientRect()
  return {
    x: r.left - n.left,
    y: r.top - n.top
  }
}
function VR(e, a, n) {
  const r = J1(e, a)
  return $t(r.x, r.y, n)
}
function KR(e, a) {
  return Math.sqrt(Math.pow(a.x - e.x, 2) + Math.pow(a.y - e.y, 2))
}
function XR(e, a) {
  return {
    x: a.x - e.x,
    y: a.y - e.y
  }
}
function U1(e) {
  return Math.sqrt(e.x * e.x + e.y * e.y)
}
function ZR(e) {
  const a = U1(e)
  return a === 0
    ? { x: 0, y: 0 }
    : {
        x: e.x / a,
        y: e.y / a
      }
}
function hc(e, a) {
  return Math.round(e / a) * a
}
function W1(e, a) {
  return {
    x: hc(e.x, a[0]),
    y: hc(e.y, a[1])
  }
}
function V1(e, a = {}) {
  const { minZoom: n = 0.1, maxZoom: r = 5, zoomStep: o = 0.1, panZoomSpeed: s = 1 } = a,
    t = e,
    i = (g) => {
      t.value = {
        x: g.x,
        y: g.y,
        zoom: Math.min(Math.max(g.zoom, n), r)
      }
    },
    u = (g, M, w) => {
      i({ x: g, y: M, zoom: w })
    },
    l = (g = 1.2) => {
      const M = Math.min(t.value.zoom * g, r)
      t.value = { ...t.value, zoom: M }
    },
    d = (g = 1.2) => {
      const M = Math.max(t.value.zoom / g, n)
      t.value = { ...t.value, zoom: M }
    },
    c = (g, M) => {
      const w = Math.min(Math.max(g, n), r)
      if (!M) {
        t.value = { ...t.value, zoom: w }
        return
      }
      const L = $t(M.x, M.y, t.value),
        D = {
          ...t.value,
          zoom: w
        },
        Y = qa(L.x, L.y, D),
        E = M.x - Y.x,
        k = M.y - Y.y
      t.value = {
        ...D,
        x: D.x + E,
        y: D.y + k
      }
    },
    _ = (g, M) => {
      t.value = {
        ...t.value,
        x: t.value.x + g * s,
        y: t.value.y + M * s
      }
    },
    f = (g, M) => {
      t.value = { ...t.value, x: g, y: M }
    }
  return {
    transform: t,
    setTransform: i,
    setViewport: u,
    zoomIn: l,
    zoomOut: d,
    zoomTo: c,
    pan: _,
    panTo: f,
    fitView: (g, M, w = {}) => {
      if (M.length === 0) return
      const L = w.padding ?? 50
      let D = 1 / 0,
        Y = 1 / 0,
        E = -1 / 0,
        k = -1 / 0
      for (const N of M) {
        const W = N.width || 200,
          Z = N.height || 50
        ;((D = Math.min(D, N.position.x)),
          (Y = Math.min(Y, N.position.y)),
          (E = Math.max(E, N.position.x + W)),
          (k = Math.max(k, N.position.y + Z)))
      }
      const S = E - D + L * 2,
        O = k - Y + L * 2,
        z = g.width / S,
        T = g.height / O,
        x = Math.min(z, T, 1),
        H = (g.width - S * x) / 2 - D * x + L * x,
        G = (g.height - O * x) / 2 - Y * x + L * x
      i({ x: H, y: G, zoom: x })
    },
    center: (g, M, w = {}) => {
      if (M.length === 0) return
      const L = w.padding ?? 50
      let D = 0,
        Y = 0
      for (const S of M) {
        const O = S.width || 200,
          z = S.height || 50
        ;((D += S.position.x + O / 2), (Y += S.position.y + z / 2))
      }
      ;((D /= M.length), (Y /= M.length))
      const E = g.width / 2 - D * t.value.zoom + L,
        k = g.height / 2 - Y * t.value.zoom + L
      f(E, k)
    },
    screenToCanvas: (g, M) => $t(g, M, t.value),
    canvasToScreen: (g, M) => qa(g, M, t.value),
    isNodeVisible: (g, M) => {
      const L = {
        x: -t.value.x / t.value.zoom - 100,
        y: -t.value.y / t.value.zoom - 100,
        width: M.width / t.value.zoom + 200,
        height: M.height / t.value.zoom + 200
      }
      return !(
        g.x + g.width < L.x ||
        g.x > L.x + L.width ||
        g.y + g.height < L.y ||
        g.y > L.y + L.height
      )
    }
  }
}
function K1(e, a) {
  const { nodes: n, snapToGrid: r = !1, snapGrid: o = [15, 15], onNodesChange: s } = a
  return {
    nodes: n,
    addNode: (p) => {
      ;((n.value = [...n.value, p]),
        s == null || s([{ type: 'select', id: p.id, item: p, selected: !0 }]))
    },
    removeNode: (p) => {
      ;((n.value = n.value.filter((v) => v.id !== p)),
        s == null || s([{ type: 'remove', id: p, item: {} }]))
    },
    updateNode: (p, v) => {
      n.value = n.value.map((g) => (g.id === p ? { ...g, ...v } : g))
    },
    updateNodePosition: (p, v, g) => {
      let M = v
      ;(r && (M = W1(v, o)),
        (n.value = n.value.map((L) =>
          L.id === p ? { ...L, position: M, dragging: (g == null ? void 0 : g.dragging) ?? !1 } : L
        )))
      const w = n.value.find((L) => L.id === p)
      w &&
        (s == null ||
          s([
            {
              type: 'position',
              id: p,
              item: w,
              position: M,
              drag: g == null ? void 0 : g.dragging
            }
          ]))
    },
    setNodes: (p) => {
      n.value = p
    },
    getNode: (p) => n.value.find((v) => v.id === p),
    getSelectedNodes: () => n.value.filter((p) => p.selected),
    selectNode: (p, v = !0, g = !1) => {
      n.value = n.value.map((w) =>
        g
          ? w.id === p
            ? { ...w, selected: v }
            : w
          : w.id === p
            ? { ...w, selected: v }
            : { ...w, selected: !1 }
      )
      const M = n.value.find((w) => w.id === p)
      M && (s == null || s([{ type: 'select', id: p, item: M, selected: v }]))
    },
    selectNodes: (p, v = !0) => {
      n.value = n.value.map((g) => (p.includes(g.id) ? { ...g, selected: v } : g))
    },
    clearSelection: () => {
      n.value = n.value.map((p) => ({ ...p, selected: !1 }))
    },
    findNode: (p) => n.value.find((v) => v.id === p)
  }
}
function X1(e) {
  const { edges: a, nodes: n, onEdgesChange: r, isValidConnection: o } = e
  return {
    edges: a,
    addEdge: (y) => {
      ;(o &&
        !o({
          source: y.source,
          target: y.target,
          sourceHandle: y.sourceHandle,
          targetHandle: y.targetHandle
        })) ||
        a.value.some((v) => v.source === y.source && v.target === y.target) ||
        ((a.value = [...a.value, y]),
        r == null || r([{ type: 'select', id: y.id, item: y, selected: !0 }]))
    },
    removeEdge: (y) => {
      ;((a.value = a.value.filter((p) => p.id !== y)),
        r == null || r([{ type: 'remove', id: y, item: {} }]))
    },
    updateEdge: (y, p) => {
      a.value = a.value.map((v) => (v.id === y ? { ...v, ...p } : v))
    },
    setEdges: (y) => {
      a.value = y
    },
    getEdge: (y) => a.value.find((p) => p.id === y),
    getSelectedEdges: () => a.value.filter((y) => y.selected),
    selectEdge: (y, p = !0, v = !1) => {
      a.value = a.value.map((M) =>
        v
          ? M.id === y
            ? { ...M, selected: p }
            : M
          : M.id === y
            ? { ...M, selected: p }
            : { ...M, selected: !1 }
      )
      const g = a.value.find((M) => M.id === y)
      g && (r == null || r([{ type: 'select', id: y, item: g, selected: p }]))
    },
    selectEdges: (y, p = !0) => {
      a.value = a.value.map((v) => (y.includes(v.id) ? { ...v, selected: p } : v))
    },
    clearSelection: () => {
      a.value = a.value.map((y) => ({ ...y, selected: !1 }))
    },
    getEdgesForNode: (y) => a.value.filter((p) => p.source === y || p.target === y),
    getConnectedEdges: (y) => a.value.filter((p) => p.source === y || p.target === y)
  }
}
function Z1(e) {
  const { nodes: a, edges: n, onSelectionChange: r } = e,
    o = ee(null),
    s = ee(!1),
    t = ee({ x: 0, y: 0 }),
    i = J(() => a.value.filter((f) => f.selected)),
    u = J(() => n.value.filter((f) => f.selected))
  return {
    selectionRect: o,
    isSelecting: s,
    selectedNodes: i,
    selectedEdges: u,
    startSelection: (f, m) => {
      ;((t.value = { x: f, y: m }), (o.value = { x: f, y: m, width: 0, height: 0 }), (s.value = !0))
    },
    updateSelection: (f, m) => {
      if (!s.value) return
      const h = Math.min(t.value.x, f),
        y = Math.min(t.value.y, m),
        p = Math.max(t.value.x, f),
        v = Math.max(t.value.y, m)
      ;((o.value = {
        x: h,
        y,
        width: p - h,
        height: v - y
      }),
        (a.value = a.value.map((g) => {
          const M = g.width || 200,
            w = g.height || 50,
            L =
              g.position.x >= h &&
              g.position.y >= y &&
              g.position.x + M <= p &&
              g.position.y + w <= v
          return { ...g, selected: L }
        })))
    },
    endSelection: () => {
      ;((s.value = !1), (o.value = null), r == null || r(i.value, u.value))
    },
    clearSelection: () => {
      ;((a.value = a.value.map((f) => ({ ...f, selected: !1 }))),
        (n.value = n.value.map((f) => ({ ...f, selected: !1 }))),
        r == null || r([], []))
    }
  }
}
function Q1(e, a, n = {}) {
  const { maxHistory: r = 50, onHistoryChange: o } = n,
    s = Ca([]),
    t = ee(-1),
    i = J(() => t.value > 0),
    u = J(() => t.value < s.value.length - 1)
  return {
    canUndo: i,
    canRedo: u,
    undo: () => {
      if (!i.value) return
      t.value--
      const f = s.value[t.value]
      ;(f &&
        ((e.value = JSON.parse(JSON.stringify(f.nodes))),
        (a.value = JSON.parse(JSON.stringify(f.edges)))),
        o == null || o(i.value, u.value))
    },
    redo: () => {
      if (!u.value) return
      t.value++
      const f = s.value[t.value]
      ;(f &&
        ((e.value = JSON.parse(JSON.stringify(f.nodes))),
        (a.value = JSON.parse(JSON.stringify(f.edges)))),
        o == null || o(i.value, u.value))
    },
    push: (f) => {
      const m = s.value.slice(0, t.value + 1)
      ;(m.push({
        nodes: JSON.parse(JSON.stringify(f.nodes)),
        edges: JSON.parse(JSON.stringify(f.edges))
      }),
        m.length > r && m.shift(),
        (s.value = m),
        (t.value = m.length - 1),
        o == null || o(i.value, u.value))
    },
    clear: () => {
      ;((s.value = []), (t.value = -1), o == null || o(!1, !1))
    }
  }
}
function ew(e = {}) {
  const {
    enabled: a = !0,
    onDelete: n,
    onCopy: r,
    onPaste: o,
    onUndo: s,
    onRedo: t,
    onSelectAll: i,
    onEscape: u
  } = e
  return {
    handleKeyDown: (d) => {
      var f
      if (!a) return
      const c = d.key,
        _ = d.ctrlKey || d.metaKey
      ;((c === 'Delete' || c === 'Backspace') &&
        !((f = d.target) != null && f.toString().includes('Input')) &&
        (d.preventDefault(), n == null || n()),
        _ && c === 'c' && (r == null || r()),
        _ && c === 'v' && (o == null || o({ nodes: [], edges: [] })),
        _ && c === 'z' && !d.shiftKey && (d.preventDefault(), s == null || s()),
        ((_ && c === 'z' && d.shiftKey) || (_ && c === 'y')) &&
          (d.preventDefault(), t == null || t()),
        _ && c === 'a' && (d.preventDefault(), i == null || i()),
        c === 'Escape' && (u == null || u()))
    }
  }
}
function tw(e) {
  const { nodes: a, snapThreshold: n = 10 } = e,
    r = ee([]),
    o = ee([]),
    s = (i, u) => {
      const l = a.value.find((p) => p.id === i)
      if (!l) return { x: u.x, y: u.y, snappedX: !1, snappedY: !1 }
      const d = l.width || 200,
        c = l.height || 50,
        _ = a.value.filter((p) => p.id !== i)
      let f = !1,
        m = !1
      const h = [u.y, u.y + c / 2, u.y + c]
      for (const p of _) {
        const v = p.height || 50,
          g = [p.position.y, p.position.y + v / 2, p.position.y + v]
        for (let M = 0; M < h.length; M++) {
          for (const w of g)
            if (Math.abs(h[M] - w) < n) {
              ;(M === 0 ? (u.y = w) : M === 1 ? (u.y = w - c / 2) : (u.y = w - c), (m = !0))
              break
            }
          if (m) break
        }
        if (m) break
      }
      const y = [u.x, u.x + d / 2, u.x + d]
      for (const p of _) {
        const v = p.width || 200,
          g = [p.position.x, p.position.x + v / 2, p.position.x + v]
        for (let M = 0; M < y.length; M++) {
          for (const w of g)
            if (Math.abs(y[M] - w) < n) {
              ;(M === 0 ? (u.x = w) : M === 1 ? (u.x = w - d / 2) : (u.x = w - v), (f = !0))
              break
            }
          if (f) break
        }
      }
      return { x: u.x, y: u.y, snappedX: f, snappedY: m }
    }
  return {
    snapToAlignment: (i, u) => {
      const l = s(i, u)
      return { x: l.x, y: l.y }
    },
    getAlignmentSnap: s,
    horizontalSnapLines: r,
    verticalSnapLines: o
  }
}
function QR(e) {
  const { nodes: a } = e
  return {
    distributeHorizontally: (t, i = 50) => {
      const u = t || a.value.filter((y) => y.selected).map((y) => y.id)
      if (u.length < 3) return
      const l = a.value.filter((y) => u.includes(y.id))
      l.sort((y, p) => y.position.x - p.position.x)
      const d = l[0],
        c = l[l.length - 1],
        _ = c.width || 200,
        f = l.reduce((y, p) => y + (p.width || 200), 0),
        m = i * (l.length - 1)
      if (c.position.x + _ - d.position.x - f - m <= 0) {
        let y = d.position.x
        l.forEach((p) => {
          const v = a.value.findIndex((g) => g.id === p.id)
          ;(v >= 0 &&
            (a.value[v] = {
              ...a.value[v],
              position: { ...a.value[v].position, x: y }
            }),
            (y += (p.width || 200) + i))
        })
      } else {
        let y = d.position.x
        l.forEach((p) => {
          const v = a.value.findIndex((g) => g.id === p.id)
          ;(v >= 0 &&
            (a.value[v] = {
              ...a.value[v],
              position: { ...a.value[v].position, x: y }
            }),
            (y += (p.width || 200) + i))
        })
      }
    },
    distributeVertically: (t, i = 50) => {
      const u = t || a.value.filter((y) => y.selected).map((y) => y.id)
      if (u.length < 3) return
      const l = a.value.filter((y) => u.includes(y.id))
      l.sort((y, p) => y.position.y - p.position.y)
      const d = l[0],
        c = l[l.length - 1],
        _ = c.height || 50,
        f = l.reduce((y, p) => y + (p.height || 50), 0),
        m = i * (l.length - 1)
      if (c.position.y + _ - d.position.y - f - m <= 0) {
        let y = d.position.y
        l.forEach((p) => {
          const v = a.value.findIndex((g) => g.id === p.id)
          ;(v >= 0 &&
            (a.value[v] = {
              ...a.value[v],
              position: { ...a.value[v].position, y }
            }),
            (y += (p.height || 50) + i))
        })
      } else {
        let y = d.position.y
        l.forEach((p) => {
          const v = a.value.findIndex((g) => g.id === p.id)
          ;(v >= 0 &&
            (a.value[v] = {
              ...a.value[v],
              position: { ...a.value[v].position, y }
            }),
            (y += (p.height || 50) + i))
        })
      }
    },
    alignNodesHorizontal: (t, i = 'left') => {
      const u = t || a.value.filter((c) => c.selected).map((c) => c.id)
      if (u.length < 2) return
      const l = a.value.filter((c) => u.includes(c.id))
      let d
      if (i === 'left') d = Math.min(...l.map((c) => c.position.x))
      else if (i === 'right') d = Math.max(...l.map((c) => c.position.x + (c.width || 200)))
      else {
        const c = l.map((_) => _.position.x + (_.width || 200) / 2)
        d = c.reduce((_, f) => _ + f, 0) / c.length
      }
      l.forEach((c) => {
        const _ = a.value.findIndex((f) => f.id === c.id)
        if (_ >= 0) {
          let f
          ;(i === 'left'
            ? (f = d)
            : i === 'right'
              ? (f = d - (c.width || 200))
              : (f = d - (c.width || 200) / 2),
            (a.value[_] = {
              ...a.value[_],
              position: { ...a.value[_].position, x: f }
            }))
        }
      })
    },
    alignNodesVertical: (t, i = 'top') => {
      const u = t || a.value.filter((c) => c.selected).map((c) => c.id)
      if (u.length < 2) return
      const l = a.value.filter((c) => u.includes(c.id))
      let d
      if (i === 'top') d = Math.min(...l.map((c) => c.position.y))
      else if (i === 'bottom') d = Math.max(...l.map((c) => c.position.y + (c.height || 50)))
      else {
        const c = l.map((_) => _.position.y + (_.height || 50) / 2)
        d = c.reduce((_, f) => _ + f, 0) / c.length
      }
      l.forEach((c) => {
        const _ = a.value.findIndex((f) => f.id === c.id)
        if (_ >= 0) {
          let f
          ;(i === 'top'
            ? (f = d)
            : i === 'bottom'
              ? (f = d - (c.height || 50))
              : (f = d - (c.height || 50) / 2),
            (a.value[_] = {
              ...a.value[_],
              position: { ...a.value[_].position, y: f }
            }))
        }
      })
    }
  }
}
function vt(e) {
  switch (e) {
    case 'top':
      return { x: 0, y: -1 }
    case 'bottom':
      return { x: 0, y: 1 }
    case 'right':
      return { x: 1, y: 0 }
    case 'left':
      return { x: -1, y: 0 }
  }
}
function yt(e, a = 'right', n) {
  var i, u
  const r = e.position.x,
    o = e.position.y
  let s = e.width,
    t = e.height
  if (s === void 0 && (i = e.style) != null && i.width) {
    const l = parseInt(String(e.style.width))
    isNaN(l) || (s = l)
  }
  if (t === void 0 && (u = e.style) != null && u.height) {
    const l = parseInt(String(e.style.height))
    isNaN(l) || (t = l)
  }
  switch (((s = s || 150), (t = t || 40), a)) {
    case 'top':
      return { x: r + s / 2, y: o }
    case 'bottom':
      return { x: r + s / 2, y: o + t }
    case 'left':
      return { x: r, y: o + t / 2 }
    case 'right':
      return { x: r + s, y: o + t / 2 }
    default:
      return { x: r + s / 2, y: o + t / 2 }
  }
}
function e4(e, a, n, r, o, s) {
  return { sx: e, sy: a, tx: n, ty: r }
}
function vc(e) {
  const {
      sourceX: a,
      sourceY: n,
      targetX: r,
      targetY: o,
      sourcePosition: s,
      targetPosition: t,
      curvature: i = 0.25
    } = e,
    u = vt(s),
    l = vt(t),
    d = Math.abs(r - a),
    c = Math.abs(o - n),
    _ = Math.sqrt(d * d + c * c),
    f = Math.min(Math.max(_ * i, 20), _ / 2),
    m = a + u.x * f,
    h = n + u.y * f,
    y = r + l.x * f,
    p = o + l.y * f
  return `M${a},${n} C${m},${h} ${y},${p} ${r},${o}`
}
function rw(e) {
  const { sourceX: a, sourceY: n, targetX: r, targetY: o } = e
  return `M${a},${n} L${r},${o}`
}
function nw(e) {
  const {
      sourceX: a,
      sourceY: n,
      targetX: r,
      targetY: o,
      sourcePosition: s,
      targetPosition: t
    } = e,
    i = s === 'left' || s === 'right',
    u = t === 'left' || t === 'right'
  if (i && !u) {
    const l = (a + r) / 2
    return `M${a},${n} L${l},${n} L${l},${o} L${r},${o}`
  } else if (!i && u) {
    const l = (n + o) / 2
    return `M${a},${n} L${a},${l} L${r},${l} L${r},${o}`
  } else if (i && u) {
    const l = (a + r) / 2
    return `M${a},${n} L${l},${n} L${l},${o} L${r},${o}`
  } else {
    const l = (n + o) / 2
    return `M${a},${n} L${a},${l} L${r},${l} L${r},${o}`
  }
}
function aw(e) {
  const {
      sourceX: a,
      sourceY: n,
      targetX: r,
      targetY: o,
      sourcePosition: s,
      targetPosition: t
    } = e,
    i = vt(s),
    u = vt(t),
    l = Math.abs(r - a),
    d = Math.abs(o - n),
    c = Math.min(10, Math.min(l, d) / 2)
  if (s === 'left' || s === 'right') {
    const f = (a + r) / 2,
      m = i.x,
      h = u.y || (o > n ? 1 : -1)
    return [
      `M${a},${n}`,
      `L${f - m * c},${n}`,
      `Q${f},${n} ${f},${n + h * c}`,
      `L${f},${o - h * c}`,
      `Q${f},${o} ${f + m * c},${o}`,
      `L${r},${o}`
    ].join(' ')
  } else {
    const f = (n + o) / 2,
      m = i.y,
      h = u.x || (r > a ? 1 : -1)
    return [
      `M${a},${n}`,
      `L${a},${f - m * c}`,
      `Q${a},${f} ${a + h * c},${f}`,
      `L${r - h * c},${f}`,
      `Q${r},${f} ${r},${f + m * c}`,
      `L${r},${o}`
    ].join(' ')
  }
}
function Ag(e, a) {
  switch (e) {
    case 'bezier':
    case 'default':
      return vc(a)
    case 'straight':
      return rw(a)
    case 'step':
      return nw(a)
    case 'smoothstep':
      return aw(a)
    default:
      return vc(a)
  }
}
function ow(e) {
  const { sourceX: a, sourceY: n, targetX: r, targetY: o, type: s = 'bezier' } = e
  if (s === 'bezier' || s === 'default') {
    const t = e.curvature ?? 0.25,
      i = vt(e.sourcePosition),
      u = vt(e.targetPosition),
      l = Math.abs(r - a),
      d = Math.abs(o - n),
      c = Math.sqrt(l * l + d * d),
      _ = Math.min(Math.max(c * t, 20), c / 2),
      f = a + i.x * _,
      m = n + i.y * _,
      h = r + u.x * _,
      y = o + u.y * _
    return {
      x: 0.125 * a + 0.375 * f + 0.375 * h + 0.125 * r,
      y: 0.125 * n + 0.375 * m + 0.375 * y + 0.125 * o,
      ox: (r - a) / 2,
      oy: (o - n) / 2
    }
  }
  return {
    x: (a + r) / 2,
    y: (n + o) / 2,
    ox: (r - a) / 2,
    oy: (o - n) / 2
  }
}
function t4(e, a, n, r, o) {
  const s = e - n,
    t = a - r,
    i = Math.sqrt(s * s + t * t)
  if (i < o * 2) return { x: e, y: a }
  const u = o / i
  return { x: e - s * u, y: a - t * u }
}
function sw(e, a, n = /* @__PURE__ */ new Set(), r = /* @__PURE__ */ new Set()) {
  ;(n.add(a), r.add(a))
  const o = e.filter((s) => s.source === a)
  for (const s of o)
    if (n.has(s.target)) {
      if (r.has(s.target)) return !0
    } else if (sw(e, s.target, n, r)) return !0
  return (r.delete(a), !1)
}
function r4(e, a) {
  const n = /* @__PURE__ */ new Map(),
    r = /* @__PURE__ */ new Map()
  for (const t of e) (n.set(t.id, 0), r.set(t.id, []))
  for (const t of a) {
    const i = n.get(t.target) || 0
    n.set(t.target, i + 1)
    const u = r.get(t.source) || []
    ;(u.push(t.target), r.set(t.source, u))
  }
  const o = []
  for (const [t, i] of n) i === 0 && o.push(t)
  const s = []
  for (; o.length > 0; ) {
    const t = o.shift()
    s.push(t)
    const i = r.get(t) || []
    for (const u of i) {
      const l = n.get(u) - 1
      ;(n.set(u, l), l === 0 && o.push(u))
    }
  }
  return s
}
function n4(e, a, n) {
  const r = /* @__PURE__ */ new Map()
  for (const i of e) {
    const u = r.get(i.source) || []
    ;(u.push(i.target), r.set(i.source, u))
  }
  const o = [],
    s = []
  function t(i) {
    if ((s.push(i), i === n)) o.push([...s])
    else {
      const u = r.get(i) || []
      for (const l of u) s.includes(l) || t(l)
    }
    s.pop()
  }
  return (t(a), o)
}
function a4(e, a) {
  const n = /* @__PURE__ */ new Map()
  for (const s of e) n.set(s.id, [])
  for (const s of a) {
    const t = n.get(s.source) || []
    ;(t.push(s.target), n.set(s.source, t))
    const i = n.get(s.target) || []
    ;(i.push(s.source), n.set(s.target, i))
  }
  const r = /* @__PURE__ */ new Set(),
    o = []
  for (const s of e)
    if (!r.has(s.id)) {
      const t = [],
        i = [s.id]
      for (; i.length > 0; ) {
        const u = i.shift()
        if (!r.has(u)) {
          ;(r.add(u), t.push(u))
          const l = n.get(u) || []
          for (const d of l) r.has(d) || i.push(d)
        }
      }
      o.push(t)
    }
  return o
}
function o4(e, a) {
  const n = /* @__PURE__ */ new Set([a]),
    r = [a],
    o = []
  for (; r.length > 0; ) {
    const s = r.shift()
    o.push(s)
    const t = e.get(s) || []
    for (const i of t) n.has(i) || (n.add(i), r.push(i))
  }
  return o
}
function s4(e, a) {
  const n = /* @__PURE__ */ new Set(),
    r = []
  function o(s) {
    ;(n.add(s), r.push(s))
    const t = e.get(s) || []
    for (const i of t) n.has(i) || o(i)
  }
  return (o(a), r)
}
function i4(e, a) {
  return e.x >= a.x && e.x <= a.x + a.width && e.y >= a.y && e.y <= a.y + a.height
}
function qg(e, a) {
  return !(
    e.x + e.width < a.x ||
    a.x + a.width < e.x ||
    e.y + e.height < a.y ||
    a.y + a.height < e.y
  )
}
function u4(e, a) {
  if (!qg(e, a)) return null
  const n = Math.max(e.x, a.x),
    r = Math.max(e.y, a.y),
    o = Math.min(e.x + e.width, a.x + a.x) - n,
    s = Math.min(e.y + e.height, a.y + a.height) - r
  return { x: n, y: r, width: o, height: s }
}
function iw(e) {
  if (e.length === 0) return { x: 0, y: 0, width: 0, height: 0 }
  let a = 1 / 0,
    n = 1 / 0,
    r = -1 / 0,
    o = -1 / 0
  for (const s of e)
    ((a = Math.min(a, s.x)), (n = Math.min(n, s.y)), (r = Math.max(r, s.x)), (o = Math.max(o, s.y)))
  return {
    x: a,
    y: n,
    width: r - a,
    height: o - n
  }
}
function l4(e) {
  const a = e.flatMap((n) => {
    const r = n.width || 0,
      o = n.height || 0
    return [
      { x: n.position.x, y: n.position.y },
      { x: n.position.x + r, y: n.position.y + o }
    ]
  })
  return iw(a)
}
function d4(e, a, n) {
  const r = e.x - a.x,
    o = e.y - a.y,
    s = n.x - a.x,
    t = n.y - a.y,
    i = r * s + o * t,
    u = s * s + t * t
  let l = -1
  u !== 0 && (l = i / u)
  let d, c
  l < 0
    ? ((d = a.x), (c = a.y))
    : l > 1
      ? ((d = n.x), (c = n.y))
      : ((d = a.x + l * s), (c = a.y + l * t))
  const _ = e.x - d,
    f = e.y - c
  return Math.sqrt(_ * _ + f * f)
}
function c4(e, a) {
  const n = a.x - e.x,
    r = a.y - e.y
  return Math.sqrt(n * n + r * r)
}
function _4(e) {
  return (e * Math.PI) / 180
}
function f4(e) {
  return (e * 180) / Math.PI
}
function m4(e, a, n, r) {
  const o = a.x - e.x,
    s = a.y - e.y,
    t = r.x - n.x,
    i = r.y - n.y,
    u = o * i - s * t
  if (Math.abs(u) < 1e-10) return null
  const l = {
      x: e.x - n.x,
      y: e.y - n.y
    },
    d = (l.x * i - l.y * t) / u
  return {
    x: e.x + d * o,
    y: e.y + d * s
  }
}
function p4(e, a) {
  return Math.atan2(a.y - e.y, a.x - e.x)
}
function h4(e, a, n) {
  return Math.atan2(a.y - n.y, a.x - n.x) - Math.atan2(e.y - n.y, e.x - n.x)
}
function v4(e) {
  return -e
}
function y4(e, a) {
  let n = !1
  for (let r = 0, o = a.length - 1; r < a.length; o = r++) {
    const s = a[r].x,
      t = a[r].y,
      i = a[o].x,
      u = a[o].y
    t > e.y != u > e.y && e.x < ((i - s) * (e.y - t)) / (u - t) + s && (n = !n)
  }
  return n
}
function g4(e, a) {
  const n = a.x + a.width,
    r = a.y + a.height,
    o = Math.max(a.x - e.x, 0, e.x - n),
    s = Math.max(a.y - e.y, 0, e.y - r)
  return Math.sqrt(o * o + s * s)
}
function M4(e, a, n) {
  const r = {
    x: a.x * n,
    y: a.y * n,
    width: a.width * n,
    height: a.height * n
  }
  return qg(e, r)
}
function b4(e) {
  return (a) => {
    if (!e || e.length === 0) return !0
    for (const n of e) {
      const r = Rd(a.source, n.source),
        o = Rd(a.target, n.target),
        s = yc(a.sourceHandle, n.sourceHandle),
        t = yc(a.targetHandle, n.targetHandle)
      if (r && o && s && t) return !0
    }
    return !1
  }
}
function Rd(e, a) {
  if (!a) return !0
  if (Array.isArray(a)) return a.includes(e)
  if (a === '*') return !0
  try {
    return new RegExp(a).test(e)
  } catch {
    return e === a
  }
}
function yc(e, a) {
  return a == null ? !0 : !e && a ? !1 : Rd(e, a)
}
function gc(e, a, n) {
  return e
    ? a
      ? n.source === n.target
        ? { isValid: !1, message: 'Cannot connect to the same node' }
        : n.target === n.source
          ? { isValid: !1, message: 'Cannot create self-loop' }
          : { isValid: !0 }
      : { isValid: !1, message: 'Target node not found' }
    : { isValid: !1, message: 'Source node not found' }
}
function uw(e, a) {
  const n = /* @__PURE__ */ new Map()
  for (const t of e) (n.has(t.source) || n.set(t.source, []), n.get(t.source).push(t.target))
  ;(n.has(a.source) || n.set(a.source, []), n.get(a.source).push(a.target))
  const r = /* @__PURE__ */ new Set(),
    o = /* @__PURE__ */ new Set()
  function s(t) {
    ;(r.add(t), o.add(t))
    const i = n.get(t) || []
    for (const u of i)
      if (r.has(u)) {
        if (o.has(u)) return !0
      } else if (s(u)) return !0
    return (o.delete(t), !1)
  }
  for (const t of n.keys()) if (!r.has(t) && s(t)) return !0
  return !1
}
const jt = /* @__PURE__ */ new Map()
function Y4(e) {
  jt.set(e.type, e)
}
function lw(e) {
  return jt.get(e)
}
function dw() {
  return Array.from(jt.values())
}
function w4(e) {
  return jt.has(e)
}
const ut = /* @__PURE__ */ new Map()
function x4(e) {
  ut.set(e.type, e)
}
function Fg(e) {
  return ut.get(e)
}
function L4() {
  return Array.from(ut.values())
}
function k4(e) {
  return ut.has(e)
}
function cw(e, a, n, r) {
  const o = Fg(e)
  return o
    ? {
        id: a,
        type: e,
        position: n,
        data: { ...o.defaultData, ...(r == null ? void 0 : r.data) },
        width: (r == null ? void 0 : r.width) ?? o.defaultWidth ?? 180,
        height: (r == null ? void 0 : r.height) ?? o.defaultHeight ?? 60,
        selected: !1,
        dragging: !1,
        ...r
      }
    : null
}
const Ct = /* @__PURE__ */ new Map()
function Te(e) {
  ;(ut.has(e.type) ||
    ut.set(e.type, {
      type: e.type,
      component: e.component,
      defaultData: e.defaultData
    }),
    Ct.set(e.type, e))
}
function _w(e) {
  return Ct.get(e)
}
function S4() {
  return Array.from(Ct.values())
}
function D4(e) {
  return Ct.has(e)
}
function fw(e) {
  return !!e.parentId
}
function mw(e, a) {
  return e.id ? a.filter((n) => n.parentId === e.id) : []
}
function pw(e, a) {
  if (e.parentId) return a.find((n) => n.id === e.parentId)
}
const Wa = /* @__PURE__ */ new Map()
function E4(e) {
  Wa.set(e.type, e)
}
function T4(e) {
  return Wa.get(e)
}
function hw() {
  return Array.from(Wa.values())
}
function vw(e, a, n) {
  return JSON.stringify(
    {
      nodes: e,
      edges: a,
      viewport: n,
      version: '1.0.0'
    },
    null,
    2
  )
}
function yw(e) {
  try {
    const a = JSON.parse(e)
    return !a.nodes || !Array.isArray(a.nodes) ? null : a
  } catch {
    return null
  }
}
function $4() {
  ;(jt.clear(), Ct.clear(), ut.clear(), Wa.clear())
}
class H4 {
  constructor() {
    ye(this, '_nodes', Ca([]))
    ye(this, '_edges', Ca([]))
  }
  get nodes() {
    return this._nodes.value
  }
  set nodes(a) {
    this._nodes.value = a
  }
  get edges() {
    return this._edges.value
  }
  set edges(a) {
    this._edges.value = a
  }
  // Get edges connected to a specific node
  getConnectedEdges(a) {
    return this._edges.value.filter((n) => n.source === a || n.target === a)
  }
  // Get nodes connected to a specific node
  getConnectedNodes(a) {
    const n = /* @__PURE__ */ new Set(),
      r = this.getConnectedEdges(a)
    for (const o of r) o.source === a ? n.add(o.target) : n.add(o.source)
    return this._nodes.value.filter((o) => n.has(o.id))
  }
  // Batch update nodes without triggering multiple renders
  batchUpdateNodes(a) {
    this._nodes.value = a(this._nodes.value)
  }
  // Batch update edges without triggering multiple renders
  batchUpdateEdges(a) {
    this._edges.value = a(this._edges.value)
  }
}
let gw = 0
function j4(e = 'id') {
  return `${e}-${Date.now()}-${++gw}`
}
function C4(e, a) {
  let n = null
  return (...r) => {
    ;(n && clearTimeout(n),
      (n = setTimeout(() => {
        ;(e(...r), (n = null))
      }, a)))
  }
}
function A4(e, a) {
  let n = !1
  return (...r) => {
    n ||
      (e(...r),
      (n = !0),
      setTimeout(() => {
        n = !1
      }, a))
  }
}
const Xt = /* @__PURE__ */ new Map()
function q4(e, a) {
  if (Xt.has(e)) return Xt.get(e)
  const n = a()
  return (Xt.set(e, n), n)
}
function F4() {
  Xt.clear()
}
const Mw = {
    png: 'image/png',
    jpeg: 'image/jpeg',
    webp: 'image/webp'
  },
  bw = {
    png: 'png',
    jpeg: 'jpeg',
    webp: 'webp'
  }
function Yw(e, a) {
  return fetch(e).then((n) => n.blob())
}
async function ww(e, a) {
  const { imageType: n, imageQuality: r, pixelRatio: o, backgroundColor: s } = a,
    t = await Promise.resolve().then(() => XE),
    i = typeof t.toPng == 'function' ? t : t.default,
    u = {
      backgroundColor: s,
      pixelRatio: o
    }
  let l,
    d = n
  switch (n) {
    case 'jpeg':
      l = await i.toJpeg(e, { ...u, quality: r })
      break
    case 'webp':
      typeof i.toWebp == 'function'
        ? (l = await i.toWebp(e, { ...u, quality: r }))
        : ((d = 'png'), (l = await i.toPng(e, u)))
      break
    case 'png':
    default:
      l = await i.toPng(e, u)
      break
  }
  const c = Mw[d],
    _ = await Yw(l),
    f = Math.round(e.offsetWidth * o),
    m = Math.round(e.offsetHeight * o)
  return {
    dataUrl: l,
    blob: _,
    width: f,
    height: m,
    mimeType: c,
    extension: bw[d]
  }
}
function xw(e, a, n) {
  const r = document.createElement('a')
  ;((r.download = `${a}.${n}`), (r.href = e), r.click())
}
async function Lw(e) {
  var a
  if (
    typeof ((a = navigator == null ? void 0 : navigator.clipboard) == null ? void 0 : a.write) ==
    'function'
  )
    await navigator.clipboard.write([new ClipboardItem({ [e.type]: e })])
  else throw new Error('[Flow Screenshot] Clipboard API not available')
}
const Id = 'http://www.omg.org/spec/BPMN/20100524/MODEL',
  Mc = 'http://www.omg.org/spec/BPMN/20100524/DI',
  kw = 'http://www.omg.org/spec/BPMN/20100524/DC',
  Sw = {
    'bpmn-start': 'startEvent',
    'bpmn-end': 'endEvent',
    'bpmn-task': 'task',
    'bpmn-service-task': 'serviceTask',
    'bpmn-user-task': 'userTask',
    'bpmn-exclusive-gateway': 'exclusiveGateway',
    'bpmn-parallel-gateway': 'parallelGateway',
    'bpmn-inclusive-gateway': 'inclusiveGateway'
  },
  Dw = {
    startEvent: 'bpmn-start',
    endEvent: 'bpmn-end',
    task: 'bpmn-task',
    serviceTask: 'bpmn-service-task',
    userTask: 'bpmn-user-task',
    exclusiveGateway: 'bpmn-exclusive-gateway',
    parallelGateway: 'bpmn-parallel-gateway',
    inclusiveGateway: 'bpmn-inclusive-gateway'
  },
  Ew = {
    'bpmn-exclusive-gateway': 'diverging',
    'bpmn-parallel-gateway': 'diverging',
    'bpmn-inclusive-gateway': 'diverging'
  },
  Rg = () => (typeof DOMParser > 'u' ? null : new DOMParser())
function Tw(e, a, n = {}) {
  var _, f, m, h, y, p
  const {
      processId: r = 'Process_' + Date.now(),
      processName: o = 'Flow Process',
      includeDi: s = !0,
      defaultNodeWidth: t = 100,
      defaultNodeHeight: i = 80
    } = n,
    u = [],
    l = [],
    d = []
  for (const v of e) {
    const g = Sw[v.type]
    if (!g) continue
    const M = v.width || t,
      w = v.height || i
    let L = `id="${v.id}"`
    const D =
      ((_ = v.data) == null ? void 0 : _.name) || ((f = v.data) == null ? void 0 : f.label) || v.id
    if ((D && (L += ` name="${D}"`), g.includes('Gateway'))) {
      const Y = Ew[v.type] || 'diverging'
      L += ` gatewayDirection="${Y}"`
    }
    ;(g === 'serviceTask' &&
      ((L += ' implementation="delegateExpression"'),
      (m = v.data) != null &&
        m.implementation &&
        (L += ` delegateExpression="${v.data.implementation}"`)),
      g === 'userTask' &&
        ((h = v.data) != null && h.assignee && (L += ` assignee="${v.data.assignee}"`),
        (y = v.data) != null &&
          y.candidateUsers &&
          (L += ` candidateUsers="${v.data.candidateUsers}"`)),
      d.push(`    <bpmn:${g} ${L}/>`),
      s &&
        u.push({
          id: `${v.id}_gui`,
          x: v.position.x,
          y: v.position.y,
          width: M,
          height: w
        }))
  }
  for (const v of a) {
    let g = `id="${v.id}"`
    if (
      (v.source && v.target && (g += ` sourceRef="${v.source}" targetRef="${v.target}"`),
      v.type && v.type !== 'default')
    ) {
      const M = v.type.replace('Edge', '').toLowerCase()
      ;['smooth', 'step', 'bezier'].includes(M) && (g += ' messageVisibleKind="signal"')
    }
    ;((p = v.data) != null && p.conditionExpression
      ? d.push(
          `    <bpmn:sequenceFlow id="${v.id}" sourceRef="${v.source}" targetRef="${v.target}">
      <bpmn:conditionExpression xsi:type="tFormalExpression" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">${v.data.conditionExpression}</bpmn:conditionExpression>
    </bpmn:sequenceFlow>`
        )
      : d.push(`    <bpmn:sequenceFlow ${g}/>`),
      s &&
        l.push({
          id: `${v.id}_di`,
          sourceRef: v.source || '',
          targetRef: v.target || ''
        }))
  }
  let c = `<?xml version="1.0" encoding="UTF-8"?>
<bpmn:definitions xmlns:bpmn="${Id}" xmlns:bpmndi="${Mc}" xmlns:dc="${kw}" xmlns:di="${Mc}" id="definitions_${r}" targetNamespace="http://bpmn.io/schema/bpmn">
  <bpmn:process id="${r}" name="${o}" isExecutable="false">
${d.join(`
`)}
  </bpmn:process>`
  if (s) {
    c += `
  <bpmndi:BPMNDiagram id="BPMNDiagram_1">
    <bpmndi:BPMNPlane id="BPMNPlane_1" bpmnElement="${r}">`
    for (const v of u)
      c += `
      <bpmndi:BPMNShape id="${v.id}" bpmnElement="${v.id.replace('_gui', '')}">
        <dc:Bounds x="${v.x}" y="${v.y}" width="${v.width}" height="${v.height}"/>
      </bpmndi:BPMNShape>`
    for (const v of l)
      c += `
      <bpmndi:BPMNEdge id="${v.id}_di" bpmnElement="${v.id}"/>`
    c += `
    </bpmndi:BPMNPlane>
  </bpmndi:BPMNDiagram>`
  }
  return (
    (c += `
</bpmn:definitions>`),
    { xml: c, processId: r }
  )
}
function R4(e, a = {}) {
  var g
  const { defaultPosition: n = { x: 100, y: 100 }, nodeSpacing: r = 150 } = a,
    o = [],
    s = [],
    t = Rg()
  if (!t) return { nodes: o, edges: s }
  const i = t.parseFromString(e, 'text/xml'),
    u = i.querySelector('parsererror')
  if (u) throw new Error(`BPMN XML 解析失败: ${u.textContent}`)
  const l = i.querySelector('bpmn\\:process, process'),
    d = (l == null ? void 0 : l.getAttribute('id')) || '',
    c = (l == null ? void 0 : l.getAttribute('name')) || '',
    _ = /* @__PURE__ */ new Map(),
    f = Array.from(i.querySelectorAll('bpmndi\\:BPMNShape, BPMNShape'))
  for (const M of f) {
    const w = M.getAttribute('bpmnElement'),
      L = M.querySelector('dc\\:Bounds, Bounds')
    w &&
      L &&
      _.set(w, {
        x: parseFloat(L.getAttribute('x') || '0'),
        y: parseFloat(L.getAttribute('y') || '0'),
        width: parseFloat(L.getAttribute('width') || '100'),
        height: parseFloat(L.getAttribute('height') || '80')
      })
  }
  const h = ((M) => {
      const w = [
          'startEvent',
          'endEvent',
          'task',
          'serviceTask',
          'userTask',
          'exclusiveGateway',
          'parallelGateway',
          'inclusiveGateway'
        ],
        L = []
      return (
        w.forEach((D) => {
          const Y = []
          ;(Y.push(...Array.from(M.getElementsByTagNameNS(Id, D))),
            Y.push(...Array.from(M.getElementsByTagName(D)).filter((E) => !E.prefix)),
            Y.length === 0 && Y.push(...Array.from(M.querySelectorAll(`[localName="${D}"]`))),
            L.push(...Y))
        }),
        L
      )
    })(i),
    y = /* @__PURE__ */ new Map()
  let p = n.y
  for (const M of h) {
    const w = M.getAttribute('id'),
      L = M.getAttribute('name') || '',
      D = M.localName,
      Y = Dw[D]
    if (!Y || !w) continue
    const E = _.get(w),
      k = E ? { x: E.x, y: E.y } : { x: n.x, y: n.y + p },
      S = (E == null ? void 0 : E.width) || 100,
      O = (E == null ? void 0 : E.height) || 80,
      z = { label: L || w }
    ;(D === 'userTask' &&
      ((z.assignee = M.getAttribute('assignee') || ''),
      (z.candidateUsers = M.getAttribute('candidateUsers') || '')),
      D === 'serviceTask' && (z.implementation = M.getAttribute('delegateExpression') || ''))
    const T = {
      id: w,
      type: Y,
      position: k,
      data: z,
      width: S,
      height: O,
      selected: !1,
      dragging: !1
    }
    ;(o.push(T),
      y.set(w, {
        x: k.x,
        y: k.y,
        width: S,
        height: O,
        outgoing: []
      }),
      (p += r))
  }
  const v = [
    ...Array.from(i.getElementsByTagNameNS(Id, 'sequenceFlow')),
    ...Array.from(i.getElementsByTagName('sequenceFlow')).filter((M) => !M.prefix)
  ]
  for (const M of v) {
    const w = M.getAttribute('id'),
      L = M.getAttribute('sourceRef'),
      D = M.getAttribute('targetRef')
    if (!w || !L || !D) continue
    const Y = M.querySelector('bpmn\\:conditionExpression, conditionExpression'),
      E = (g = Y == null ? void 0 : Y.textContent) == null ? void 0 : g.trim(),
      k = y.get(L)
    k && k.outgoing.push(w)
    const S = {
      id: w,
      source: L,
      target: D,
      type: 'smoothstep',
      animated: !1,
      selected: !1,
      data: E ? { conditionExpression: E } : {}
    }
    s.push(S)
  }
  return (_.size === 0 && $w(o, s, r), { nodes: o, edges: s, processId: d, processName: c })
}
function $w(e, a, n) {
  const r = /* @__PURE__ */ new Map(),
    o = /* @__PURE__ */ new Map()
  for (const d of e) (r.set(d.id, 0), o.set(d.id, []))
  for (const d of a)
    if (d.source && d.target) {
      const c = r.get(d.target) || 0
      r.set(d.target, c + 1)
      const _ = o.get(d.source) || []
      ;(_.push(d.target), o.set(d.source, _))
    }
  const s = []
  for (const [d, c] of r) c === 0 && s.push(d)
  const t = /* @__PURE__ */ new Map(),
    i = /* @__PURE__ */ new Set()
  let u = 0
  for (; s.length > 0; ) {
    const d = s.length
    for (let c = 0; c < d; c++) {
      const _ = s.shift()
      if (i.has(_)) continue
      ;(i.add(_), t.set(_, u))
      const f = o.get(_) || []
      for (const m of f) i.has(m) || s.push(m)
    }
    u++
  }
  for (const d of e) t.has(d.id) || t.set(d.id, u)
  const l = /* @__PURE__ */ new Map()
  for (const d of e) {
    const c = t.get(d.id) || 0,
      _ = l.get(c) || []
    ;(_.push(d), l.set(c, _))
  }
  for (const [d, c] of l)
    c.forEach((_, f) => {
      _.position = {
        x: 100 + d * 250,
        y: 100 + f * n
      }
    })
}
function I4(e) {
  try {
    const a = Rg()
    if (!a) return { valid: !1, error: 'DOMParser is not available in the current environment' }
    const n = a.parseFromString(e, 'text/xml')
    return n.querySelector('parsererror')
      ? { valid: !1, error: 'XML 格式错误' }
      : n.querySelector('bpmn\\:definitions, definitions')
        ? n.querySelector('bpmn\\:process, process')
          ? { valid: !0 }
          : { valid: !1, error: '缺少 BPMN process 元素' }
        : { valid: !1, error: '缺少 BPMN definitions 根元素' }
  } catch (a) {
    return { valid: !1, error: a instanceof Error ? a.message : '未知错误' }
  }
}
function P4() {
  return Tw(
    [
      {
        id: 'start',
        type: 'bpmn-start',
        position: { x: 100, y: 200 },
        data: { label: '开始', name: '开始' },
        width: 40,
        height: 40,
        selected: !1,
        dragging: !1
      },
      {
        id: 'task1',
        type: 'bpmn-user-task',
        position: { x: 250, y: 180 },
        data: { label: '审批任务', name: '审批任务', assignee: 'admin' },
        width: 120,
        height: 80,
        selected: !1,
        dragging: !1
      },
      {
        id: 'gateway',
        type: 'bpmn-exclusive-gateway',
        position: { x: 450, y: 200 },
        data: { label: '是否通过', name: '是否通过' },
        width: 50,
        height: 50,
        selected: !1,
        dragging: !1
      },
      {
        id: 'task2',
        type: 'bpmn-service-task',
        position: { x: 600, y: 100 },
        data: { label: '处理业务', name: '处理业务', implementation: '${myService}' },
        width: 120,
        height: 80,
        selected: !1,
        dragging: !1
      },
      {
        id: 'end',
        type: 'bpmn-end',
        position: { x: 800, y: 200 },
        data: { label: '结束', name: '结束' },
        width: 40,
        height: 40,
        selected: !1,
        dragging: !1
      }
    ],
    [
      {
        id: 'e1',
        source: 'start',
        target: 'task1',
        type: 'smoothstep',
        selected: !1,
        animated: !1
      },
      {
        id: 'e2',
        source: 'task1',
        target: 'gateway',
        type: 'smoothstep',
        selected: !1,
        animated: !1
      },
      {
        id: 'e3',
        source: 'gateway',
        target: 'task2',
        type: 'smoothstep',
        selected: !1,
        animated: !1,
        data: { conditionExpression: '${approved == true}' }
      },
      {
        id: 'e4',
        source: 'gateway',
        target: 'end',
        type: 'smoothstep',
        selected: !1,
        animated: !1
      },
      { id: 'e5', source: 'task2', target: 'end', type: 'smooth', selected: !1, animated: !1 }
    ],
    {
      processId: 'SampleProcess',
      processName: '示例流程'
    }
  ).xml
}
function Hw(e, a) {
  try {
    const n = e.match(/\$\{(.+)\}/)
    if (!n) return !!e
    const r = n[1].trim()
    if (r.includes('==')) {
      const [s, t] = r.split('==').map((i) => i.trim())
      return a[s] == t.replace(/['"]/g, '')
    }
    if (r.includes('!=')) {
      const [s, t] = r.split('!=').map((i) => i.trim())
      return a[s] != t.replace(/['"]/g, '')
    }
    if (r.includes('>')) {
      const [s, t] = r.split('>').map((i) => i.trim())
      return Number(a[s]) > Number(t)
    }
    if (r.includes('<')) {
      const [s, t] = r.split('<').map((i) => i.trim())
      return Number(a[s]) < Number(t)
    }
    const o = a[r]
    return typeof o == 'boolean' ? o : r === 'true' ? !0 : r === 'false' ? !1 : !!o
  } catch {
    return !1
  }
}
class jw {
  constructor(a = {}) {
    ye(this, 'nodes', /* @__PURE__ */ new Map())
    ye(this, 'edges', /* @__PURE__ */ new Map())
    ye(this, 'instances', /* @__PURE__ */ new Map())
    ye(this, 'options')
    ye(this, 'instanceCounter', 0)
    this.options = {
      variableEvaluator: a.variableEvaluator || Hw,
      taskExecutor: a.taskExecutor || (async () => {}),
      eventListener: a.eventListener || (() => {}),
      autoExecute: a.autoExecute ?? !0,
      executionDelay: a.executionDelay ?? 500
    }
  }
  /**
   * 加载流程定义
   */
  loadProcess(a, n) {
    ;(this.nodes.clear(), this.edges.clear())
    for (const r of a) this.nodes.set(r.id, r)
    for (const r of n) r.source && r.target && this.edges.set(r.id, r)
  }
  /**
   * 创建流程实例
   */
  createInstance(a = {}) {
    const n = `instance_${++this.instanceCounter}`,
      r = {
        id: n,
        processDefinitionId: 'process',
        state: 'idle',
        startTime: Date.now(),
        nodes: /* @__PURE__ */ new Map(),
        edges: /* @__PURE__ */ new Map(),
        tokens: /* @__PURE__ */ new Map(),
        variables: { ...a },
        currentNodes: [],
        completedNodes: [],
        history: []
      }
    for (const [o, s] of this.nodes)
      r.nodes.set(o, {
        nodeId: s.id,
        nodeType: s.type,
        status: 'waiting',
        variables: {},
        incomingTokens: [],
        outgoingTokens: []
      })
    for (const [o, s] of this.edges)
      r.edges.set(o, {
        edgeId: s.id,
        sourceNodeId: s.source || '',
        targetNodeId: s.target || '',
        taken: !1
      })
    return (this.instances.set(n, r), r)
  }
  /**
   * 启动流程实例
   */
  async start(a) {
    const n = this.instances.get(a)
    if (!n) return null
    n.state = 'running'
    const r = Array.from(this.nodes.values()).filter((o) => o.type === 'bpmn-start')
    if (r.length === 0) return ((n.state = 'completed'), (n.endTime = Date.now()), n)
    for (const o of r) await this.enterNode(n, o.id)
    return (this.options.autoExecute && (await this.executeAll(n)), n)
  }
  /**
   * 进入节点
   */
  async enterNode(a, n) {
    const r = a.nodes.get(n)
    if (!r) return
    const o = this.nodes.get(n)
    if (!o) return
    const s = `token_${n}_${Date.now()}`
    if (
      (a.tokens.set(s, { nodeId: n, state: 'active' }),
      r.incomingTokens.push(s),
      this.emitEvent(a, {
        type: 'node_entered',
        timestamp: Date.now(),
        nodeId: n,
        tokenId: s
      }),
      (r.status = 'active'),
      (r.startTime = Date.now()),
      a.currentNodes.includes(n) || a.currentNodes.push(n),
      await this.executeNode(a, o),
      o.type === 'bpmn-end')
    ) {
      ;((r.status = 'completed'),
        (r.endTime = Date.now()),
        a.completedNodes.push(n),
        (a.currentNodes = a.currentNodes.filter((t) => t !== n)))
      for (const t of [...r.incomingTokens])
        (a.tokens.delete(t),
          this.emitEvent(a, {
            type: 'token_consumed',
            timestamp: Date.now(),
            nodeId: n,
            tokenId: t
          }))
      a.tokens.size === 0 &&
        a.currentNodes.length === 0 &&
        ((a.state = 'completed'), (a.endTime = Date.now()))
      return
    }
    await this.exitNode(a, n)
  }
  /**
   * 执行节点
   */
  async executeNode(a, n) {
    const r = a.nodes.get(n.id)
    r &&
      (['bpmn-task', 'bpmn-service-task', 'bpmn-user-task'].includes(n.type) &&
        (await this.options.taskExecutor(r, a.variables)),
      this.emitEvent(a, {
        type: 'node_exited',
        timestamp: Date.now(),
        nodeId: n.id,
        data: a.variables
      }))
  }
  /**
   * 离开节点
   */
  async exitNode(a, n) {
    const r = a.nodes.get(n)
    if (!r) return
    const o = this.nodes.get(n)
    if (!o) return
    for (const t of r.incomingTokens)
      (a.tokens.delete(t),
        this.emitEvent(a, {
          type: 'token_consumed',
          timestamp: Date.now(),
          nodeId: n,
          tokenId: t
        }))
    const s = Array.from(this.edges.values()).filter((t) => t.source === n)
    if (o.type === 'bpmn-exclusive-gateway') {
      let t = !1
      for (const i of s)
        if (this.evaluateEdgeCondition(a, i)) {
          ;(await this.takeFlow(a, i), (t = !0))
          break
        }
      if (!t && s.length > 0) {
        const i =
          s.find((u) => {
            var l
            return !((l = u.data) != null && l.conditionExpression)
          }) || s[0]
        await this.takeFlow(a, i)
      }
    } else for (const t of s) this.evaluateEdgeCondition(a, t) && (await this.takeFlow(a, t))
    ;((r.status = 'completed'),
      (r.endTime = Date.now()),
      (a.currentNodes = a.currentNodes.filter((t) => t !== n)),
      a.completedNodes.push(n))
  }
  /**
   * 评估边的条件
   */
  evaluateEdgeCondition(a, n) {
    var o
    if (!((o = n.data) != null && o.conditionExpression)) return !0
    const r = !!this.options.variableEvaluator(n.data.conditionExpression, a.variables)
    return (
      this.emitEvent(a, {
        type: 'condition_evaluated',
        timestamp: Date.now(),
        edgeId: n.id,
        nodeId: n.source,
        data: { expression: n.data.conditionExpression, result: r }
      }),
      r
    )
  }
  /**
   * 采用流（连线）
   */
  async takeFlow(a, n) {
    const r = a.edges.get(n.id)
    if (!r) return
    r.taken = !0
    const o = `token_${n.target}_${Date.now()}`
    a.tokens.set(o, { nodeId: n.target, state: 'waiting' })
    const s = a.nodes.get(n.target)
    ;(s && s.outgoingTokens.push(o),
      this.emitEvent(a, {
        type: 'token_created',
        timestamp: Date.now(),
        edgeId: n.id,
        tokenId: o,
        targetRef: n.target
      }),
      setTimeout(() => {
        this.enterNode(a, n.target)
      }, 10))
  }
  /**
   * 执行所有待处理节点
   */
  async executeAll(a) {
    for (; a.currentNodes.length > 0 && a.state === 'running'; )
      (await new Promise((n) => setTimeout(n, this.options.executionDelay)),
        a.currentNodes.length === 0 &&
          (Array.from(a.tokens.values()).some((r) => r.state === 'active') ||
            ((a.state = 'completed'), (a.endTime = Date.now()))))
  }
  /**
   * 触发事件
   */
  emitEvent(a, n) {
    ;(a.history.push(n), this.options.eventListener(n))
  }
  /**
   * 获取实例状态
   */
  getInstance(a) {
    return this.instances.get(a)
  }
  /**
   * 设置变量
   */
  setVariable(a, n, r) {
    const o = this.instances.get(a)
    o && (o.variables[n] = r)
  }
  /**
   * 获取变量
   */
  getVariable(a, n) {
    const r = this.instances.get(a)
    return r == null ? void 0 : r.variables[n]
  }
  /**
   * 暂停流程
   */
  pause(a) {
    const n = this.instances.get(a)
    n && n.state === 'running' && (n.state = 'paused')
  }
  /**
   * 恢复流程
   */
  async resume(a) {
    const n = this.instances.get(a)
    n && n.state === 'paused' && ((n.state = 'running'), await this.executeAll(n))
  }
  /**
   * 终止流程
   */
  terminate(a) {
    const n = this.instances.get(a)
    n && ((n.state = 'terminated'), (n.endTime = Date.now()))
  }
  /**
   * 获取所有实例
   */
  getAllInstances() {
    return Array.from(this.instances.values())
  }
  /**
   * 获取可用的开始节点
   */
  getStartNodes() {
    return Array.from(this.nodes.values()).filter((a) => a.type === 'bpmn-start')
  }
  /**
   * 获取可用的结束节点
   */
  getEndNodes() {
    return Array.from(this.nodes.values()).filter((a) => a.type === 'bpmn-end')
  }
  /**
   * 获取节点的输出边
   */
  getOutgoingEdges(a) {
    return Array.from(this.edges.values()).filter((n) => n.source === a)
  }
  /**
   * 获取节点的输入边
   */
  getIncomingEdges(a) {
    return Array.from(this.edges.values()).filter((n) => n.target === a)
  }
}
function B4(e) {
  return new jw(e)
}
const Ig = {
    // 节点样式
    'flow-node-background': '#ffffff',
    'flow-node-border': '#dcdfe6',
    'flow-node-border-radius': '8px',
    'flow-node-padding': '10px',
    'flow-node-shadow': '0 2px 4px rgba(0, 0, 0, 0.1)',
    'flow-node-selected-border': '#409eff',
    'flow-node-selected-shadow': '0 0 8px rgba(64, 158, 255, 0.4)',
    'flow-node-dragging-opacity': '0.8',
    // 节点文字
    'flow-node-label-color': '#303133',
    'flow-node-label-font-size': '14px',
    'flow-node-label-font-weight': '500',
    'flow-node-description-color': '#909399',
    'flow-node-description-font-size': '12px',
    // 连接点（Handle）
    'flow-handle-background': '#ffffff',
    'flow-handle-border': '#409eff',
    'flow-handle-border-radius': '50%',
    'flow-handle-size': '12px',
    'flow-handle-hover-background': '#409eff',
    'flow-handle-connected-background': '#67c23a',
    // 连线样式
    'flow-edge-stroke': '#b1b3b8',
    'flow-edge-stroke-width': '2',
    'flow-edge-selected-stroke': '#409eff',
    'flow-edge-animated-stroke': '#409eff',
    'flow-edge-label-background': '#ffffff',
    'flow-edge-label-color': '#606266',
    // BPMN 节点
    'flow-bpmn-start-fill': '#e6f7ed',
    'flow-bpmn-start-stroke': '#67c23a',
    'flow-bpmn-end-fill': '#fef0f0',
    'flow-bpmn-end-stroke': '#f56c6c',
    'flow-bpmn-task-fill': '#ecf5ff',
    'flow-bpmn-task-stroke': '#409eff',
    'flow-bpmn-gateway-fill': '#fdf6ec',
    'flow-bpmn-gateway-stroke': '#e6a23c',
    'flow-bpmn-gateway-color': '#e6a23c',
    // AI 节点
    'flow-ai-node-background': '#f0f9ff',
    'flow-ai-node-border': '#0ea5e9',
    'flow-ai-node-accent': '#0284c7',
    // 背景
    'flow-background-color': '#fafafa',
    'flow-grid-color': '#e4e7ed',
    'flow-grid-size': '20',
    // 辅助线
    'flow-alignment-line-color': '#c0c4cc',
    'flow-alignment-line-active-color': '#409eff',
    // 选框
    'flow-selection-box-border': '#409eff',
    'flow-selection-box-background': 'rgba(64, 158, 255, 0.1)',
    // 控制按钮
    'flow-control-background': '#ffffff',
    'flow-control-border': '#dcdfe6',
    'flow-control-icon-color': '#606266',
    'flow-control-hover-background': '#f5f7fa',
    'flow-control-active-background': '#ecf5ff',
    // 小地图
    'flow-minimap-background': '#f5f7fa',
    'flow-minimap-mask-background': 'rgba(255, 255, 255, 0.8)',
    'flow-minimap-node-color': '#c0c4cc',
    'flow-minimap-viewport-border': '#409eff',
    // 编辑面板
    'flow-panel-background': '#ffffff',
    'flow-panel-border': '#e4e7ed',
    'flow-panel-shadow': '0 4px 12px rgba(0, 0, 0, 0.15)',
    'flow-panel-header-background': '#fafafa',
    'flow-panel-title-color': '#303133',
    // 工具栏
    'flow-toolbar-background': '#ffffff',
    'flow-toolbar-border': '#e4e7ed',
    'flow-toolbar-icon-color': '#606266',
    'flow-toolbar-hover-background': '#f5f7fa',
    'flow-toolbar-active-background': '#ecf5ff'
  },
  Cw = {
    // 节点样式
    'flow-node-background': '#1f1f1f',
    'flow-node-border': '#3a3a3a',
    'flow-node-border-radius': '8px',
    'flow-node-padding': '10px',
    'flow-node-shadow': '0 2px 8px rgba(0, 0, 0, 0.3)',
    'flow-node-selected-border': '#409eff',
    'flow-node-selected-shadow': '0 0 8px rgba(64, 158, 255, 0.5)',
    'flow-node-dragging-opacity': '0.7',
    // 节点文字
    'flow-node-label-color': '#e5e5e5',
    'flow-node-label-font-size': '14px',
    'flow-node-label-font-weight': '500',
    'flow-node-description-color': '#8c8c8c',
    'flow-node-description-font-size': '12px',
    // 连接点（Handle）
    'flow-handle-background': '#262626',
    'flow-handle-border': '#409eff',
    'flow-handle-border-radius': '50%',
    'flow-handle-size': '12px',
    'flow-handle-hover-background': '#409eff',
    'flow-handle-connected-background': '#67c23a',
    // 连线样式
    'flow-edge-stroke': '#5c5c5c',
    'flow-edge-stroke-width': '2',
    'flow-edge-selected-stroke': '#409eff',
    'flow-edge-animated-stroke': '#409eff',
    'flow-edge-label-background': '#1f1f1f',
    'flow-edge-label-color': '#e5e5e5',
    // BPMN 节点
    'flow-bpmn-start-fill': '#1a2e1a',
    'flow-bpmn-start-stroke': '#67c23a',
    'flow-bpmn-end-fill': '#2e1a1a',
    'flow-bpmn-end-stroke': '#f56c6c',
    'flow-bpmn-task-fill': '#1a2a33',
    'flow-bpmn-task-stroke': '#409eff',
    'flow-bpmn-gateway-fill': '#2e2a1a',
    'flow-bpmn-gateway-stroke': '#e6a23c',
    'flow-bpmn-gateway-color': '#e6a23c',
    // AI 节点
    'flow-ai-node-background': '#1a1a2e',
    'flow-ai-node-border': '#0ea5e9',
    'flow-ai-node-accent': '#38bdf8',
    // 背景
    'flow-background-color': '#141414',
    'flow-grid-color': '#2a2a2a',
    'flow-grid-size': '20',
    // 辅助线
    'flow-alignment-line-color': '#404040',
    'flow-alignment-line-active-color': '#409eff',
    // 选框
    'flow-selection-box-border': '#409eff',
    'flow-selection-box-background': 'rgba(64, 158, 255, 0.2)',
    // 控制按钮
    'flow-control-background': '#1f1f1f',
    'flow-control-border': '#3a3a3a',
    'flow-control-icon-color': '#8c8c8c',
    'flow-control-hover-background': '#2a2a2a',
    'flow-control-active-background': '#1a2a33',
    // 小地图
    'flow-minimap-background': '#1a1a1a',
    'flow-minimap-mask-background': 'rgba(0, 0, 0, 0.7)',
    'flow-minimap-node-color': '#404040',
    'flow-minimap-viewport-border': '#409eff',
    // 编辑面板
    'flow-panel-background': '#1f1f1f',
    'flow-panel-border': '#3a3a3a',
    'flow-panel-shadow': '0 4px 12px rgba(0, 0, 0, 0.5)',
    'flow-panel-header-background': '#262626',
    'flow-panel-title-color': '#e5e5e5',
    // 工具栏
    'flow-toolbar-background': '#1f1f1f',
    'flow-toolbar-border': '#3a3a3a',
    'flow-toolbar-icon-color': '#8c8c8c',
    'flow-toolbar-hover-background': '#2a2a2a',
    'flow-toolbar-active-background': '#1a2a33'
  }
function N4(e, a = document) {
  const n = a instanceof Document ? a.documentElement : a
  for (const [r, o] of Object.entries(e)) n.style.setProperty(`--${r}`, o)
}
function go(e) {
  return { ...Ig, ...e }
}
const O4 = {
  default: Ig,
  dark: Cw,
  blue: go({
    'flow-node-background': '#e6f7ff',
    'flow-node-border': '#91d5ff',
    'flow-node-selected-border': '#1890ff',
    'flow-node-selected-shadow': '0 0 8px rgba(24, 144, 255, 0.4)',
    'flow-handle-border': '#1890ff',
    'flow-edge-selected-stroke': '#1890ff',
    'flow-edge-animated-stroke': '#1890ff',
    'flow-background-color': '#f0f7ff',
    'flow-grid-color': '#d0e6ff',
    'flow-bpmn-start-stroke': '#52c41a',
    'flow-bpmn-task-stroke': '#1890ff',
    'flow-bpmn-gateway-stroke': '#faad14',
    'flow-ai-node-border': '#722ed1',
    'flow-ai-node-accent': '#b37feb'
  }),
  green: go({
    'flow-node-background': '#f6ffed',
    'flow-node-border': '#b7eb8f',
    'flow-node-selected-border': '#52c41a',
    'flow-node-selected-shadow': '0 0 8px rgba(82, 196, 26, 0.4)',
    'flow-handle-border': '#52c41a',
    'flow-edge-selected-stroke': '#52c41a',
    'flow-edge-animated-stroke': '#52c41a',
    'flow-background-color': '#f6ffed',
    'flow-grid-color': '#d9f7be',
    'flow-bpmn-start-stroke': '#52c41a',
    'flow-bpmn-task-stroke': '#1890ff',
    'flow-bpmn-gateway-stroke': '#faad14',
    'flow-ai-node-border': '#13c2c2',
    'flow-ai-node-accent': '#36cfc9'
  }),
  purple: go({
    'flow-node-background': '#f9f0ff',
    'flow-node-border': '#d3adf7',
    'flow-node-selected-border': '#722ed1',
    'flow-node-selected-shadow': '0 0 8px rgba(114, 46, 209, 0.4)',
    'flow-handle-border': '#722ed1',
    'flow-edge-selected-stroke': '#722ed1',
    'flow-edge-animated-stroke': '#722ed1',
    'flow-background-color': '#f9f0ff',
    'flow-grid-color': '#efdbff',
    'flow-bpmn-start-stroke': '#52c41a',
    'flow-bpmn-task-stroke': '#1890ff',
    'flow-bpmn-gateway-stroke': '#faad14',
    'flow-ai-node-border': '#722ed1',
    'flow-ai-node-accent': '#b37feb'
  })
}
class Aw {
  constructor() {
    ye(this, 'roomId', '')
    ye(this, 'userId', '')
    ye(this, 'userName', '')
    ye(this, 'userColor', '')
    ye(this, 'state')
    ye(this, 'ws', null)
    ye(this, 'connectionState', 'disconnected')
    ye(this, 'eventListeners', /* @__PURE__ */ new Map())
    ye(this, 'reconnectAttempts', 0)
    ye(this, 'maxReconnectAttempts', 5)
    ye(this, 'reconnectDelay', 1e3)
    ye(this, 'pingInterval', null)
    ye(this, 'pendingOperations', /* @__PURE__ */ new Map())
    ye(this, 'versionVector', /* @__PURE__ */ new Map())
    // 用户光标信息
    ye(this, 'cursors', /* @__PURE__ */ new Map())
    this.state = {
      nodes: /* @__PURE__ */ new Map(),
      edges: /* @__PURE__ */ new Map(),
      viewport: { x: 0, y: 0, zoom: 1 },
      version: 0,
      pendingOps: [],
      acknowledgedOps: []
    }
  }
  /**
   * 连接到协作房间
   */
  async connect(a) {
    const {
      serverUrl: n,
      roomId: r,
      userId: o,
      userName: s,
      initialNodes: t = [],
      initialEdges: i = []
    } = a
    return (
      (this.roomId = r),
      (this.userId = o),
      (this.userName = s),
      (this.userColor = this.generateUserColor(o)),
      (this.state.nodes = new Map(t.map((u) => [u.id, u]))),
      (this.state.edges = new Map(i.map((u) => [u.id, u]))),
      new Promise((u, l) => {
        try {
          ;(this.setConnectionState('connecting'),
            (this.ws = new WebSocket(n)),
            (this.ws.onopen = () => {
              ;(this.setConnectionState('connected'),
                (this.reconnectAttempts = 0),
                this.send({
                  type: 'join',
                  roomId: this.roomId,
                  userId: this.userId,
                  payload: {
                    userName: this.userName,
                    userColor: this.userColor,
                    nodes: t,
                    edges: i
                  },
                  timestamp: Date.now()
                }),
                this.startPing(),
                u())
            }),
            (this.ws.onmessage = (d) => {
              const { data: c } = d
              if (typeof c == 'string')
                try {
                  const _ = JSON.parse(c)
                  this.isValidWSMessage(_) && this.handleMessage(_)
                } catch {}
            }),
            (this.ws.onerror = (d) => {
              ;(console.error('WebSocket error:', d),
                this.emitEvent('error', { type: 'error', error: d, timestamp: Date.now() }))
            }),
            (this.ws.onclose = () => {
              ;(this.setConnectionState('disconnected'), this.stopPing(), this.handleDisconnect())
            }))
        } catch (d) {
          ;(this.setConnectionState('disconnected'), l(d))
        }
      })
    )
  }
  /**
   * 断开连接
   */
  disconnect() {
    ;(this.ws &&
      (this.send({
        type: 'leave',
        roomId: this.roomId,
        userId: this.userId,
        payload: {},
        timestamp: Date.now()
      }),
      this.ws.close(),
      (this.ws = null)),
      this.setConnectionState('disconnected'),
      this.stopPing())
  }
  /**
   * 添加节点
   */
  addNode(a) {
    const n = {
      id: `op_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      type: 'node_add',
      timestamp: Date.now(),
      userId: this.userId,
      nodeId: a.id,
      data: a,
      version: this.state.version + 1
    }
    ;(this.applyOperation(n), this.broadcastOperation(n))
  }
  /**
   * 更新节点
   */
  updateNode(a, n) {
    const r = {
      id: `op_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      type: 'node_update',
      timestamp: Date.now(),
      userId: this.userId,
      nodeId: a,
      data: n,
      version: this.state.version + 1
    }
    ;(this.applyOperation(r), this.broadcastOperation(r))
  }
  /**
   * 删除节点
   */
  deleteNode(a) {
    const n = {
      id: `op_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      type: 'node_delete',
      timestamp: Date.now(),
      userId: this.userId,
      nodeId: a,
      version: this.state.version + 1
    }
    ;(this.applyOperation(n), this.broadcastOperation(n))
  }
  /**
   * 添加边
   */
  addEdge(a) {
    const n = {
      id: `op_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      type: 'edge_add',
      timestamp: Date.now(),
      userId: this.userId,
      edgeId: a.id,
      data: a,
      version: this.state.version + 1
    }
    ;(this.applyOperation(n), this.broadcastOperation(n))
  }
  /**
   * 更新边
   */
  updateEdge(a, n) {
    const r = {
      id: `op_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      type: 'edge_update',
      timestamp: Date.now(),
      userId: this.userId,
      edgeId: a,
      data: n,
      version: this.state.version + 1
    }
    ;(this.applyOperation(r), this.broadcastOperation(r))
  }
  /**
   * 删除边
   */
  deleteEdge(a) {
    const n = {
      id: `op_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      type: 'edge_delete',
      timestamp: Date.now(),
      userId: this.userId,
      edgeId: a,
      version: this.state.version + 1
    }
    ;(this.applyOperation(n), this.broadcastOperation(n))
  }
  /**
   * 更新视口
   */
  updateViewport(a) {
    const n = {
      id: `op_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      type: 'viewport_change',
      timestamp: Date.now(),
      userId: this.userId,
      data: a,
      version: this.state.version + 1
    }
    ;((this.state.viewport = a), this.broadcastOperation(n, !0))
  }
  /**
   * 更新光标位置
   */
  updateCursor(a, n) {
    this.send({
      type: 'cursor',
      roomId: this.roomId,
      userId: this.userId,
      payload: { x: a, y: n, name: this.userName, color: this.userColor },
      timestamp: Date.now()
    })
  }
  /**
   * 更新选区
   */
  updateSelection(a) {
    this.send({
      type: 'selection',
      roomId: this.roomId,
      userId: this.userId,
      payload: { nodeIds: a },
      timestamp: Date.now()
    })
  }
  /**
   * 获取当前状态
   */
  getState() {
    return {
      nodes: Array.from(this.state.nodes.values()),
      edges: Array.from(this.state.edges.values()),
      viewport: this.state.viewport
    }
  }
  /**
   * 获取连接状态
   */
  getConnectionState() {
    return this.connectionState
  }
  /**
   * 获取其他用户光标
   */
  getCursors() {
    return this.cursors
  }
  /**
   * 注册事件监听
   */
  on(a, n) {
    const r = this.eventListeners.get(a) || []
    ;(r.push(n), this.eventListeners.set(a, r))
  }
  /**
   * 移除事件监听
   */
  off(a, n) {
    const r = this.eventListeners.get(a) || [],
      o = r.indexOf(n)
    o > -1 && r.splice(o, 1)
  }
  // ==================== 私有方法 ====================
  /**
   * 严谨校验消息是否符合 WSMessage 协议结构
   */
  isValidWSMessage(a) {
    if (a && typeof a == 'object') {
      const n = a
      return (
        typeof n.type == 'string' &&
        typeof n.roomId == 'string' &&
        typeof n.userId == 'string' &&
        'payload' in n
      )
    }
    return !1
  }
  send(a) {
    this.ws && this.ws.readyState === WebSocket.OPEN && this.ws.send(JSON.stringify(a))
  }
  handleMessage(a) {
    switch (a.type) {
      case 'sync':
        this.handleSync(a.payload)
        break
      case 'operation':
        this.handleRemoteOperation(a.payload)
        break
      case 'cursor':
        this.handleCursorUpdate(a.userId, a.payload)
        break
      case 'selection':
        this.handleSelectionUpdate(a.userId, a.payload)
        break
      case 'join':
        this.handleUserJoin(a.userId, a.payload)
        break
      case 'leave':
        this.handleUserLeave(a.userId)
        break
    }
  }
  handleSync(a) {
    ;((this.state.nodes = new Map(a.nodes.map((n) => [n.id, n]))),
      (this.state.edges = new Map(a.edges.map((n) => [n.id, n]))),
      (this.state.viewport = a.viewport),
      (this.state.version = a.version),
      this.emitEvent('sync', {
        type: 'sync',
        data: a,
        timestamp: Date.now()
      }))
  }
  handleRemoteOperation(a) {
    a.userId !== this.userId &&
      (this.applyOperation(a),
      this.emitEvent('operation', {
        type: 'operation',
        userId: a.userId,
        data: a,
        timestamp: Date.now()
      }))
  }
  applyOperation(a) {
    switch (a.type) {
      case 'node_add':
        a.nodeId && a.data && this.state.nodes.set(a.nodeId, a.data)
        break
      case 'node_update':
        if (a.nodeId) {
          const n = this.state.nodes.get(a.nodeId)
          n &&
            this.state.nodes.set(a.nodeId, {
              ...n,
              ...a.data
            })
        }
        break
      case 'node_delete':
        if (a.nodeId) {
          this.state.nodes.delete(a.nodeId)
          for (const [n, r] of this.state.edges)
            (r.source === a.nodeId || r.target === a.nodeId) && this.state.edges.delete(n)
        }
        break
      case 'edge_add':
        a.edgeId && a.data && this.state.edges.set(a.edgeId, a.data)
        break
      case 'edge_update':
        if (a.edgeId) {
          const n = this.state.edges.get(a.edgeId)
          n &&
            this.state.edges.set(a.edgeId, {
              ...n,
              ...a.data
            })
        }
        break
      case 'edge_delete':
        a.edgeId && this.state.edges.delete(a.edgeId)
        break
      case 'viewport_change':
        a.data && (this.state.viewport = a.data)
        break
    }
    ;((this.state.version = a.version),
      this.versionVector.set(a.userId, (this.versionVector.get(a.userId) || 0) + 1))
  }
  broadcastOperation(a, n = !1) {
    ;(this.pendingOperations.set(a.id, a),
      this.send({
        type: 'operation',
        roomId: this.roomId,
        userId: this.userId,
        payload: a,
        timestamp: Date.now()
      }),
      n && this.pendingOperations.delete(a.id))
  }
  handleCursorUpdate(a, n) {
    ;(this.cursors.set(a, {
      x: n.x,
      y: n.y,
      name: n.name,
      color: n.color
    }),
      this.emitEvent('cursor_update', {
        type: 'cursor_update',
        userId: a,
        data: n,
        timestamp: Date.now()
      }))
  }
  handleSelectionUpdate(a, n) {
    this.emitEvent('selection_update', {
      type: 'selection_update',
      userId: a,
      data: n,
      timestamp: Date.now()
    })
  }
  handleUserJoin(a, n) {
    this.emitEvent('user_joined', {
      type: 'user_joined',
      userId: a,
      data: n,
      timestamp: Date.now()
    })
  }
  handleUserLeave(a) {
    ;(this.cursors.delete(a),
      this.emitEvent('user_left', {
        type: 'user_left',
        userId: a,
        timestamp: Date.now()
      }))
  }
  setConnectionState(a) {
    ;((this.connectionState = a), this.emitEvent(a, { type: 'sync', timestamp: Date.now() }))
  }
  handleDisconnect() {
    if (this.reconnectAttempts < this.maxReconnectAttempts) {
      this.reconnectAttempts++
      const a = this.reconnectDelay * Math.pow(2, this.reconnectAttempts - 1)
      ;(this.setConnectionState('reconnecting'),
        setTimeout(() => {
          this.reconnect()
        }, a))
    }
  }
  async reconnect() {
    console.log(`Reconnect attempt ${this.reconnectAttempts}/${this.maxReconnectAttempts}`)
  }
  startPing() {
    this.pingInterval = window.setInterval(() => {
      this.send({
        type: 'ping',
        roomId: this.roomId,
        userId: this.userId,
        payload: {},
        timestamp: Date.now()
      })
    }, 3e4)
  }
  stopPing() {
    this.pingInterval && (clearInterval(this.pingInterval), (this.pingInterval = null))
  }
  emitEvent(a, n) {
    const r = this.eventListeners.get(a) || []
    for (const s of r) s(n)
    const o = this.eventListeners.get('*') || []
    for (const s of o) s(n)
  }
  generateUserColor(a) {
    const n = [
      '#f56565',
      '#ed8936',
      '#48bb78',
      '#4299e1',
      '#667eea',
      '#ed64a6',
      '#a0aec0',
      '#fc8181'
    ]
    let r = 0
    for (let o = 0; o < a.length; o++) r = a.charCodeAt(o) + ((r << 5) - r)
    return n[Math.abs(r) % n.length]
  }
}
function z4() {
  return new Aw()
}
const Pg = Symbol('yh-flow-context')
function qw(e) {
  e && jg(Pg, e)
}
function At() {
  const e = Bd(Pg, null)
  if (!e) throw new Error('[YhFlow] FlowContext is not provided')
  return e
}
const Fw = ['width', 'height'],
  Rw = ['width', 'height', 'viewBox'],
  Iw = ['fill', 'stroke', 'stroke-width'],
  Pw = {
    key: 0,
    class: 'yh-flow-minimap__layout-controls'
  },
  Bw = /* @__PURE__ */ ie({
    __name: 'Minimap',
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
    emits: ['layoutChange', 'directionChange'],
    setup(e, { emit: a }) {
      const n = e,
        r = a,
        o = J(() => n.width || 200),
        s = J(() => n.height || 150),
        t = ee(),
        i = ee(),
        u = At(),
        l = u.nodes,
        d = u.edges,
        c = u.viewport
      let _ = 1,
        f = 0,
        m = 0,
        h = 0,
        y = 0
      const p = () => {
          const k = l.value
          if (!k.length) return { minX: 0, minY: 0, maxX: 1, maxY: 1 }
          let S = 1 / 0,
            O = 1 / 0,
            z = -1 / 0,
            T = -1 / 0
          for (let x = 0; x < k.length; x++) {
            const H = k[x]
            if (H.hidden) continue
            const G = H.width || 120,
              N = H.height || 50
            ;(H.position.x < S && (S = H.position.x),
              H.position.y < O && (O = H.position.y),
              H.position.x + G > z && (z = H.position.x + G),
              H.position.y + N > T && (T = H.position.y + N))
          }
          return S === 1 / 0
            ? { minX: 0, minY: 0, maxX: 1, maxY: 1 }
            : { minX: S, minY: O, maxX: z, maxY: T }
        },
        v = (k) => (k - f) * _ + h,
        g = (k) => (k - m) * _ + y,
        M = () => {
          const k = t.value
          if (!k) return
          const S = k.getContext('2d', { alpha: !0 })
          if (!S) return
          const O = p()
          ;((f = O.minX), (m = O.minY))
          const z = O.maxX - O.minX || 1,
            T = O.maxY - O.minY || 1,
            x = 4
          if (
            ((_ = Math.min((o.value - x * 2) / z, (s.value - x * 2) / T)),
            (h = (o.value - z * _) / 2),
            (y = (s.value - T * _) / 2),
            S.clearRect(0, 0, o.value, s.value),
            !l.value.length)
          ) {
            w(c.value)
            return
          }
          const H = /* @__PURE__ */ new Map()
          l.value.forEach((K) => H.set(K.id, K))
          const G = getComputedStyle(k),
            N = G.getPropertyValue('--flow-edge-stroke').trim() || '#94a3b8',
            W = G.getPropertyValue('--flow-minimap-node-color').trim() || '#cbd5e1',
            Z = G.getPropertyValue('--flow-node-selected-border').trim() || '#3b82f6'
          ;((S.strokeStyle = N),
            (S.lineWidth = 1.2),
            (S.globalAlpha = 0.5),
            S.beginPath(),
            d.value.forEach((K) => {
              if (K.hidden) return
              const ne = H.get(K.source),
                se = H.get(K.target)
              !ne ||
                !se ||
                (S.moveTo(
                  v(ne.position.x + (ne.width || 120) / 2),
                  g(ne.position.y + (ne.height || 50) / 2)
                ),
                S.lineTo(
                  v(se.position.x + (se.width || 120) / 2),
                  g(se.position.y + (se.height || 50) / 2)
                ))
            }),
            S.stroke(),
            (S.globalAlpha = 0.85),
            l.value.forEach((K) => {
              if (K.hidden) return
              let ne = K.selected ? Z : W
              ;(!K.selected &&
                n.nodeColor &&
                (ne = typeof n.nodeColor == 'function' ? n.nodeColor(K) : n.nodeColor),
                (S.fillStyle = ne))
              const se = Math.max((K.width || 120) * _, 3),
                A = Math.max((K.height || 50) * _, 3),
                B = v(K.position.x),
                U = g(K.position.y)
              if ((S.fillRect(B, U, se, A), n.nodeStrokeWidth || n.nodeStrokeColor)) {
                let V = '#94a3b8'
                ;(n.nodeStrokeColor &&
                  (V =
                    typeof n.nodeStrokeColor == 'function'
                      ? n.nodeStrokeColor(K)
                      : n.nodeStrokeColor),
                  (S.strokeStyle = V),
                  (S.lineWidth = n.nodeStrokeWidth || 0.5),
                  S.strokeRect(B, U, se, A))
              }
            }),
            (S.globalAlpha = 1),
            w(c.value))
        },
        w = (k) => {
          const S = i.value
          if (!S || !_) return
          const O = u.$el,
            z = (O == null ? void 0 : O.clientWidth) || 800,
            T = (O == null ? void 0 : O.clientHeight) || 600,
            x = -k.x / k.zoom,
            H = -k.y / k.zoom,
            G = z / k.zoom,
            N = T / k.zoom,
            W = (x - f) * _ + h,
            Z = (H - m) * _ + y,
            K = Math.max(G * _, 2),
            ne = Math.max(N * _, 2)
          ;(S.setAttribute('x', String(W)),
            S.setAttribute('y', String(Z)),
            S.setAttribute('width', String(K)),
            S.setAttribute('height', String(ne)))
        }
      let L = !1
      const D = (k) => {
          var ne
          if (!L || n.pannable === !1) return
          const S = (ne = t.value) == null ? void 0 : ne.getBoundingClientRect()
          if (!S) return
          const O = k.clientX - S.left,
            z = k.clientY - S.top,
            T = (O - h) / _ + f,
            x = (z - y) / _ + m,
            H = c.value.zoom,
            G = u.$el,
            N = (G == null ? void 0 : G.clientWidth) || 800,
            W = (G == null ? void 0 : G.clientHeight) || 600,
            Z = N / 2 - T * H,
            K = W / 2 - x * H
          u.setViewport({ x: Z, y: K, zoom: H })
        },
        Y = () => {
          ;((L = !1),
            document.removeEventListener('mousemove', D),
            document.removeEventListener('mouseup', Y))
        },
        E = (k) => {
          var S
          if (n.interactive && !L) {
            const O = (S = t.value) == null ? void 0 : S.getBoundingClientRect()
            if (O) {
              const z = k.clientX - O.left,
                T = k.clientY - O.top,
                x = (z - h) / _ + f,
                H = (T - y) / _ + m,
                G = c.value.zoom,
                N = u.$el,
                W = (N == null ? void 0 : N.clientWidth) || 800,
                Z = (N == null ? void 0 : N.clientHeight) || 600,
                K = W / 2 - x * G,
                ne = Z / 2 - H * G
              u.setViewport({ x: K, y: ne, zoom: G })
            }
            return
          }
          n.pannable !== !1 &&
            ((L = !0),
            D(k),
            document.addEventListener('mousemove', D),
            document.addEventListener('mouseup', Y))
        }
      return (
        Ht(M),
        Nd(Y),
        Le([l, d], M, { deep: !0, flush: 'post' }),
        Le(c, (k) => w(k), { flush: 'sync' }),
        (k, S) => (
          $(),
          j(
            'div',
            {
              class: te(['yh-flow-minimap', [e.position]]),
              style: re({ width: o.value + 'px', height: s.value + 'px' }),
              onMousedown: we(E, ['stop'])
            },
            [
              I(' Canvas：绘制节点+连线（静态部分，节点变化才重绘） '),
              b(
                'canvas',
                {
                  ref_key: 'canvasRef',
                  ref: t,
                  width: o.value,
                  height: s.value,
                  class: 'yh-flow-minimap__canvas'
                },
                null,
                8,
                Fw
              ),
              I(' SVG：视口框 '),
              ($(),
              j(
                'svg',
                {
                  ref: 'svgRef',
                  class: 'yh-flow-minimap__vp',
                  width: o.value,
                  height: s.value,
                  viewBox: `0 0 ${o.value} ${s.value}`,
                  style: re({ background: n.maskColor || 'transparent' })
                },
                [
                  b(
                    'rect',
                    {
                      ref_key: 'vpRectEl',
                      ref: i,
                      x: '0',
                      y: '0',
                      width: '20',
                      height: '20',
                      fill: n.maskColor || 'rgba(59,130,246,0.08)',
                      stroke: n.maskStrokeColor || '#3b82f6',
                      'stroke-width': n.maskStrokeWidth || 1.2,
                      rx: '2',
                      class: 'yh-flow-minimap__rect'
                    },
                    null,
                    8,
                    Iw
                  )
                ],
                12,
                Rw
              )),
              I(' Layout Controls (optional) '),
              n.showLayoutControls
                ? ($(),
                  j('div', Pw, [
                    b(
                      'button',
                      {
                        class: te(['layout-btn', { active: n.layoutType === 'dagre' }]),
                        title: 'Dagre Layout',
                        onClick: S[0] || (S[0] = we((O) => r('layoutChange', 'dagre'), ['stop']))
                      },
                      ' D ',
                      2
                      /* CLASS */
                    ),
                    b(
                      'button',
                      {
                        class: te(['layout-btn', { active: n.layoutType === 'elk' }]),
                        title: 'ELK Layout',
                        onClick: S[1] || (S[1] = we((O) => r('layoutChange', 'elk'), ['stop']))
                      },
                      ' E ',
                      2
                      /* CLASS */
                    ),
                    b(
                      'button',
                      {
                        class: te(['layout-btn', { active: n.layoutType === 'force' }]),
                        title: 'Force Layout',
                        onClick: S[2] || (S[2] = we((O) => r('layoutChange', 'force'), ['stop']))
                      },
                      ' F ',
                      2
                      /* CLASS */
                    ),
                    b(
                      'button',
                      {
                        class: te(['layout-btn', { active: n.layoutDirection === 'TB' }]),
                        title: 'Top to Bottom',
                        onClick: S[3] || (S[3] = we((O) => r('directionChange', 'TB'), ['stop']))
                      },
                      ' TB ',
                      2
                      /* CLASS */
                    ),
                    b(
                      'button',
                      {
                        class: te(['layout-btn', { active: n.layoutDirection === 'LR' }]),
                        title: 'Left to Right',
                        onClick: S[4] || (S[4] = we((O) => r('directionChange', 'LR'), ['stop']))
                      },
                      ' LR ',
                      2
                      /* CLASS */
                    )
                  ]))
                : I('v-if', !0)
            ],
            38
            /* CLASS, STYLE, NEED_HYDRATION */
          )
        )
      )
    }
  }),
  ue = (e, a) => {
    const n = e.__vccOpts || e
    for (const [r, o] of a) n[r] = o
    return n
  },
  Nw = /* @__PURE__ */ ue(Bw, [['__scopeId', 'data-v-280bb855']]),
  Ow = {
    enabled: !0,
    nodeColor: () => '#fff',
    nodeStrokeColor: () => '#999',
    nodeStrokeWidth: 1,
    maskColor: 'rgba(240, 240, 240, 0.6)',
    maskStrokeColor: '#ddd',
    maskStrokeWidth: 1,
    pannable: !0,
    zoomable: !0,
    position: 'bottom-right',
    width: 200,
    height: 150,
    interactive: !1,
    showLayoutControls: !1,
    layoutType: 'none',
    layoutDirection: 'TB'
  }
function Fa(e = {}) {
  const a = { ...Ow, ...e }
  return {
    id: 'minimap',
    name: 'Minimap',
    version: '1.0.0',
    description: 'Displays a minimap for navigation',
    component: Ja(Nw),
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
      console.log('[Minimap Plugin] Installed', n)
    }
  }
}
const zw = {
    name: 'zh-cn',
    yh: {
      // 通用
      common: {
        yes: '是',
        no: '否',
        confirm: '确认',
        cancel: '取消',
        loading: '加载中',
        close: '关闭',
        clear: '清空',
        reset: '重置',
        save: '保存',
        delete: '删除',
        edit: '编辑',
        add: '新增',
        search: '搜索',
        refresh: '刷新',
        expand: '展开',
        collapse: '收起',
        more: '更多',
        noData: '暂无数据',
        noMatch: '无匹配数据',
        selectAll: '全选',
        unselectAll: '取消全选'
      },
      // 颜色选择器
      colorpicker: {
        confirm: '确定',
        clear: '清空',
        eyeDropper: '吸色器',
        suggestionDark: '白色文字最佳',
        suggestionLight: '黑色文字最佳',
        recentColors: '最近使用',
        presetColors: '预设颜色'
      },
      // 日期选择器
      datepicker: {
        now: '此刻',
        today: '今天',
        cancel: '取消',
        clear: '清空',
        confirm: '确定',
        selectDate: '选择日期',
        selectTime: '选择时间',
        startDate: '开始日期',
        startTime: '开始时间',
        endDate: '结束日期',
        endTime: '结束时间',
        year: '年',
        month: '月',
        day: '日',
        week: '周',
        monthBeforeYear: !1,
        prevYear: '上一年',
        nextYear: '下一年',
        prevMonth: '上个月',
        nextMonth: '下个月',
        weeks: {
          sun: '日',
          mon: '一',
          tue: '二',
          wed: '三',
          thu: '四',
          fri: '五',
          sat: '六'
        },
        months: {
          jan: '一月',
          feb: '二月',
          mar: '三月',
          apr: '四月',
          may: '五月',
          jun: '六月',
          jul: '七月',
          aug: '八月',
          sep: '九月',
          oct: '十月',
          nov: '十一月',
          dec: '十二月'
        },
        quarters: {
          q1: '第一季度',
          q2: '第二季度',
          q3: '第三季度',
          q4: '第四季度'
        }
      },
      // 时间选择器
      timepicker: {
        confirm: '确定',
        cancel: '取消',
        now: '此刻',
        placeholder: '选择时间',
        startPlaceholder: '开始时间',
        endPlaceholder: '结束时间',
        selectTime: '选择时间'
      },
      // 时间选择
      timeselect: {
        placeholder: '选择时间'
      },
      // 树
      tree: {
        emptyText: '暂无数据',
        loading: '加载中...',
        checkAll: '全选',
        uncheckAll: '取消全选',
        expandAll: '展开全部',
        collapseAll: '收起全部'
      },
      // 树选择
      treeselect: {
        placeholder: '请选择',
        emptyText: '暂无数据',
        loading: '加载中...',
        noMatch: '无匹配数据'
      },
      // 日历
      calendar: {
        prevMonth: '上个月',
        nextMonth: '下个月',
        prevYear: '上一年',
        nextYear: '下一年',
        today: '今天',
        week: '周',
        holiday: '休',
        workday: '班',
        monthHeaderFormat: 'YYYY年M月',
        weeks: {
          sun: '日',
          mon: '一',
          tue: '二',
          wed: '三',
          thu: '四',
          fri: '五',
          sat: '六'
        }
      },
      // 自动完成
      autocomplete: {
        loading: '加载中...',
        placeholder: '请输入',
        noData: '暂无数据',
        noMatch: '无匹配数据'
      },
      // 倒计时
      countdown: {
        days: '天',
        hours: '时',
        minutes: '分',
        seconds: '秒',
        milliseconds: '毫秒',
        finished: '已结束'
      },
      // 级联选择
      cascader: {
        noMatch: '无匹配数据',
        placeholder: '请选择',
        loading: '加载中...',
        noData: '暂无数据'
      },
      // 穿梭框
      transfer: {
        noMatch: '无匹配数据',
        noData: '无数据',
        titles: ['列表 1', '列表 2'],
        filterPlaceholder: '请输入搜索内容',
        noCheckedFormat: '共 {total} 项',
        hasCheckedFormat: '已选 {checked}/{total} 项',
        searchPlaceholder: '请输入关键词'
      },
      // 表格
      table: {
        emptyText: '暂无数据',
        confirmFilter: '筛选',
        resetFilter: '重置',
        clearFilter: '全部',
        sumText: '合计',
        loading: '正在加载...',
        index: '序号',
        print: '打 印',
        cancel: '取 消',
        preview: '打印预览',
        printTime: '打印时间',
        total: '共 {total} 条',
        page: '第 {page} 页',
        yes: '是',
        no: '否',
        // 工具栏
        toolbar: {
          refresh: '刷新',
          density: '密度',
          densityDefault: '默认',
          densityLarge: '宽松',
          densitySmall: '紧凑',
          columnSetting: '列设置',
          fullscreen: '全屏',
          exitFullscreen: '退出全屏',
          export: '导出',
          import: '导入',
          search: '搜索',
          searchPlaceholder: '请输入关键词搜索'
        },
        // 筛选
        filter: {
          selectAll: '全选',
          selectInvert: '反选',
          empty: '为空',
          notEmpty: '不为空',
          contains: '包含',
          notContains: '不包含',
          equals: '等于',
          notEquals: '不等于',
          startsWith: '开头是',
          endsWith: '结尾是',
          greaterThan: '大于',
          lessThan: '小于',
          between: '介于'
        },
        // 排序
        sort: {
          asc: '升序',
          desc: '降序',
          clear: '取消排序'
        },
        // 导出
        export: {
          title: '导出数据',
          filename: '文件名',
          type: '文件类型',
          scope: '导出范围',
          scopeAll: '全部数据',
          scopeSelected: '选中数据',
          scopeCurrentPage: '当前页数据',
          includeHeader: '包含表头',
          exporting: '正在导出...',
          success: '导出成功',
          error: '导出失败'
        },
        // 导入
        import: {
          title: '导入数据',
          selectFile: '选择文件',
          dragTip: '点击或拖拽文件到此处上传',
          importing: '正在导入...',
          success: '导入成功',
          error: '导入失败',
          preview: '数据预览',
          confirm: '确认导入'
        },
        // 打印
        printConfig: {
          title: '打印设置',
          pageTitle: '页面标题',
          pageHeader: '页眉',
          pageFooter: '页脚',
          printAll: '打印全部',
          printSelected: '打印选中',
          printCurrentPage: '打印当前页',
          landscape: '横向',
          portrait: '纵向',
          printing: '正在打印...'
        },
        // 列设置
        columnSetting: {
          title: '列设置',
          showAll: '显示全部',
          hideAll: '隐藏全部',
          reset: '重置',
          fixedLeft: '固定在左侧',
          fixedRight: '固定在右侧',
          unfixed: '取消固定'
        },
        // 右键菜单
        contextMenu: {
          copy: '复制',
          copyRow: '复制行',
          copyCell: '复制单元格',
          paste: '粘贴',
          insertRowAbove: '在上方插入行',
          insertRowBelow: '在下方插入行',
          deleteRow: '删除行',
          deleteSelectedRows: '删除选中行',
          exportSelected: '导出选中数据'
        },
        // 选择
        selection: {
          selectAll: '全选',
          selectInvert: '反选',
          selectNone: '取消选择',
          selected: '已选择 {count} 项'
        },
        // 展开
        expand: {
          expandAll: '展开全部',
          collapseAll: '收起全部'
        },
        // 树形
        tree: {
          expandAll: '展开全部',
          collapseAll: '收起全部',
          expandLevel: '展开到第 {level} 层'
        },
        // 拖拽
        drag: {
          dragTip: '拖拽以调整顺序',
          dropTip: '释放以放置'
        }
      },
      // 消息框
      messagebox: {
        title: '提示',
        confirm: '确定',
        cancel: '取消',
        close: '关闭',
        error: '输入的数据不合法!',
        alert: '警告',
        prompt: '请输入',
        inputPlaceholder: '请输入内容'
      },
      // 上传
      upload: {
        deleteTip: '按 delete 键可删除',
        delete: '删除',
        preview: '查看图片',
        continue: '继续上传',
        upload: '点击上传',
        tip: '点击或拖拽文件到此处<em>上传</em>',
        dragTip: '将文件拖到此处，或点击上传',
        uploading: '上传中...',
        success: '上传成功',
        error: '上传失败',
        retry: '重新上传',
        cancel: '取消上传',
        fileTypeError: '文件类型不支持',
        fileSizeError: '文件大小超出限制',
        fileCountError: '文件数量超出限制'
      },
      // 表单
      form: {
        validationFailed: '校验失败',
        required: '必填项',
        pleaseInput: '请输入',
        pleaseSelect: '请选择'
      },
      // 按钮
      button: {
        loading: '加载中...'
      },
      // 输入框
      input: {
        placeholder: '请输入内容',
        clear: '清空',
        showPassword: '显示密码',
        hidePassword: '隐藏密码',
        copy: '复制',
        copied: '已复制'
      },
      // 数字输入框
      inputnumber: {
        placeholder: '请输入数字',
        increase: '增加',
        decrease: '减少'
      },
      // 标签输入
      inputtag: {
        placeholder: '请输入',
        add: '添加',
        remove: '移除'
      },
      // 面包屑
      breadcrumb: {
        label: '面包屑',
        more: '更多'
      },
      // 返回顶部
      backtop: {
        text: '回到顶部'
      },
      // 选择器
      select: {
        placeholder: '请选择',
        noData: '暂无数据',
        loading: '加载中...',
        noMatch: '无匹配数据',
        selectAll: '全选',
        clearAll: '清空'
      },
      // 分页
      pagination: {
        goto: '前往',
        page: '页',
        total: '共 {total} 条',
        pageSize: '条/页',
        prev: '上一页',
        next: '下一页',
        first: '首页',
        last: '末页',
        pageClassifier: '页'
      },
      // 气泡确认
      popconfirm: {
        confirm: '确定',
        cancel: '取消',
        dontAskAgain: '不再提示'
      },
      // 对话框
      dialog: {
        confirm: '确定',
        cancel: '取消',
        close: '关闭',
        maximize: '最大化',
        restore: '还原'
      },
      // 抽屉
      drawer: {
        close: '关闭',
        confirm: '确定',
        cancel: '取消'
      },
      // 下拉菜单
      dropdown: {
        loading: '加载中...'
      },
      // 图片
      image: {
        error: '加载失败',
        loading: '加载中...',
        preview: '预览',
        zoomIn: '放大',
        zoomOut: '缩小',
        rotateLeft: '向左旋转',
        rotateRight: '向右旋转',
        originalSize: '原始大小',
        fullscreen: '全屏'
      },
      // 图片预览
      imageviewer: {
        close: '关闭',
        prev: '上一张',
        next: '下一张',
        zoomIn: '放大',
        zoomOut: '缩小',
        rotateLeft: '向左旋转',
        rotateRight: '向右旋转',
        reset: '重置',
        fullscreen: '全屏',
        exitFullscreen: '退出全屏'
      },
      // 无限滚动
      infinitescroll: {
        loading: '加载中...',
        finished: '没有更多了',
        error: '加载失败，点击重试',
        retry: '点击重试'
      },
      // 消息
      message: {
        close: '关闭'
      },
      // 通知
      notification: {
        close: '关闭'
      },
      // 加载
      loading: {
        text: '加载中...'
      },
      // 加载中
      spin: {
        text: '加载中...'
      },
      // 评分
      rate: {
        texts: ['极差', '失望', '一般', '满意', '惊喜']
      },
      // 警告
      alert: {
        close: '关闭'
      },
      // 标签
      tag: {
        close: '关闭'
      },
      // 标签页
      tabs: {
        close: '关闭',
        add: '新增',
        more: '更多'
      },
      // 步骤条
      steps: {
        finish: '已完成',
        process: '进行中',
        wait: '等待中',
        error: '错误'
      },
      // 进度条
      progress: {
        success: '成功',
        exception: '异常',
        warning: '警告'
      },
      // 骨架屏
      skeleton: {
        loading: '加载中...'
      },
      // 空状态
      empty: {
        description: '暂无数据',
        noData: '暂无数据',
        noResult: '暂无结果',
        networkError: '网络错误',
        serverError: '服务器错误'
      },
      // 结果
      result: {
        success: '操作成功',
        error: '操作失败',
        warning: '警告',
        info: '提示',
        backHome: '返回首页'
      },
      // 瀑布流
      waterfall: {
        loading: '加载中...',
        noMore: '没有更多了',
        empty: '暂无数据'
      },
      // 描述列表
      descriptions: {
        colon: '：'
      },
      // 滑块
      slider: {
        tipFormatter: '{value}'
      },
      // 开关
      switch: {
        on: '开',
        off: '关'
      },
      // 复选框
      checkbox: {
        selectAll: '全选'
      },
      // 单选框
      radio: {},
      // 菜单
      menu: {
        collapse: '收起菜单',
        expand: '展开菜单'
      },
      // 卡片
      card: {
        collapse: '收起',
        expand: '展开'
      },
      // 折叠面板
      collapse: {
        expand: '展开',
        collapse: '收起'
      },
      // 工具提示
      tooltip: {},
      // 气泡卡片
      popover: {},
      // 徽标
      badge: {},
      // 头像
      avatar: {
        error: '加载失败'
      },
      // 水印
      watermark: {},
      // 分割线
      divider: {},
      // 走马灯
      carousel: {
        prev: '上一张',
        next: '下一张'
      },
      // 跑马灯
      marquee: {},
      // 固钉
      affix: {},
      // 流程图
      flow: {
        zoomIn: '放大画布',
        zoomOut: '缩小画布',
        fitView: '自适应视图',
        lock: '锁定/解锁画布'
      },
      // 锚点
      anchor: {},
      // 提及
      mention: {
        placeholder: '请输入',
        loading: '加载中...',
        noData: '暂无数据'
      },
      // SKU 选择器
      skuselector: {
        placeholder: '请选择规格',
        emptyText: '暂无规格',
        stock: '库存',
        price: '价格',
        selected: '已选',
        outOfStock: '暂时无货'
      },
      // 商品卡片
      productcard: {
        viewDetails: '查看详情',
        buyNow: '立即购买',
        addToCart: '加入购物车',
        sold: '已售'
      },
      // 价格
      price: {
        original: '原价'
      },
      // 优惠券
      couponcard: {
        available: '点击领取',
        used: '已使用',
        expired: '已过期',
        received: '已领取',
        limit: '满 {threshold} 元可用',
        noThreshold: '无门槛',
        validPeriod: '有效期',
        ruleTitle: '使用说明及规则'
      },
      // 幸运抽奖
      luckydraw: {
        start: '开始抽奖',
        drawing: '抽奖中...',
        end: '中奖了',
        retry: '再试一次'
      },
      // 筛选排序栏
      filterbar: {
        all: '全部',
        sort: '排序',
        filter: '筛选',
        reset: '重置',
        confirm: '确定',
        noOptions: '暂无筛选项',
        asc: '升序',
        desc: '降序',
        selected: '已选'
      },
      // 结算栏
      submitbar: {
        total: '小计：',
        selected: '已选 {count} 件',
        submit: '去结算',
        allSelect: '全选'
      },
      // 品类导航
      categorynav: {
        all: '全部',
        noData: '暂无数据',
        loading: '加载中...'
      },
      // 智能地址
      smartaddress: {
        placeholder: '请粘贴收货地址，自动识别姓名、手机号、地址',
        parse: '智能识别',
        province: '省/市/区',
        city: '市',
        district: '区/县',
        street: '街道/镇',
        detail: '详细地址',
        phone: '手机号',
        name: '收货人',
        parseSuccess: '地址识别成功',
        parseFailed: '未能识别，请手动填写',
        required: '请填写完整地址',
        provinceKeywords: ['省', '自治区', '特别行政区'],
        cityKeywords: ['市', '州', '盟'],
        districtKeywords: ['区', '县', '旗', '镇', '市'],
        streetKeywords: ['街道', '镇', '乡', '村']
      },
      // AI 组件
      ai: {
        bubble: {
          citations: '参考引用'
        },
        mention: {
          placeholder: '@ 呼叫 Agent、文档或表格...',
          agent: '智能体',
          document: '文档',
          table: '表格',
          knowledge: '知识库'
        },
        codeBlock: {
          copyCode: '复制代码',
          copied: '已复制！',
          run: '运行代码',
          edit: '编辑',
          save: '保存',
          cancel: '取消'
        },
        codeRunner: {
          run: '运行',
          stop: '停止',
          clear: '清空',
          reset: '重置',
          placeholder: '点击运行按钮执行代码...'
        },
        sender: {
          placeholder: '发送消息...',
          dragTip: '释放鼠标以上传文件'
        },
        thoughtChain: {
          thoughtProcess: '思考过程',
          thinking: '思考中...',
          defaultTitle: '新步骤',
          addNode: '添加节点'
        },
        thinking: {
          start: '开始思考',
          thinking: '思考中...',
          complete: '已完成思考',
          error: '思考出错了'
        },
        welcome: {
          title: '你好，我是 YH AI',
          description: '我可以帮你写代码、翻译文档或进行创意写作。今天我能为你做点什么？'
        },
        action: {
          copy: '复制',
          regenerate: '重新生成',
          share: '分享',
          like: '赞同',
          dislike: '反对',
          edit: '编辑',
          delete: '删除'
        },
        artifacts: {
          preview: '预览',
          inline: '行内',
          code: '源码',
          versions: '版本历史',
          rendering: '正在渲染组件...',
          renderingChart: '正在渲染图表...',
          renderingCanvas: '正在准备画板...'
        },
        voice: {
          trigger: '点击说话',
          listening: '聆听中...'
        },
        // AiAgentCard
        agent: {
          uses: '次调用',
          use: '立即使用',
          favorite: '收藏',
          unfavorite: '取消收藏',
          share: '分享',
          online: '在线',
          offline: '离线',
          busy: '忙碌',
          verified: '官方认证',
          rating: '评分',
          reviews: '条评价',
          responseTime: '响应时间',
          ms: 'ms'
        },
        // AiSources
        sources: {
          references: '参考来源',
          referencedSources: '引用来源',
          relevant: '相关度',
          viewOriginal: '查看原文',
          showAll: '显示全部',
          more: '更多来源',
          drawerTitle: '参考来源',
          expandMore: '展开更多',
          collapseMore: '收起',
          noSources: '暂无来源',
          today: '今天',
          last7Days: '最近 7 天',
          last30Days: '最近 30 天',
          earlier: '更早',
          pinned: '已置顶'
        },
        // AiConversations groups
        conversations: {
          today: '今天',
          last7Days: '最近 7 天',
          last30Days: '最近 30 天',
          earlier: '更早',
          pinned: '置顶',
          pin: '置顶',
          unpin: '取消置顶',
          newConversation: '新建对话',
          noData: '暂无对话记录',
          rename: '重命名',
          delete: '删除',
          deleteConfirm: '确认删除此对话？'
        },
        // AiAttachments
        attachments: {
          dropTip: '释放鼠标以上传文件',
          clickToUpload: '点击或拖拽文件到此处上传',
          uploadSuccess: '上传成功',
          uploadError: '上传失败',
          deleteConfirm: '确定删除此文件？',
          fileTooLarge: '文件大小不能超过 {size}',
          invalidFileType: '不支持的文件类型'
        },
        // AiMermaid
        mermaid: {
          image: '图片',
          code: '代码',
          zoomIn: '放大',
          zoomOut: '缩小',
          reset: '重置',
          download: '下载',
          copyCode: '复制代码',
          rendering: '正在渲染...',
          renderError: '渲染失败',
          renderSuccess: '渲染成功',
          retry: '重试'
        }
      }
    }
  },
  Gw = Symbol('configProviderContextKey'),
  Jw = () => {
    const e = Bd(Gw, null),
      a = J(() => {
        const o = De(e)
        return (o == null ? void 0 : o.size) || 'default'
      }),
      n = J(() => {
        const o = De(e)
        return (o == null ? void 0 : o.zIndex) || 2e3
      }),
      r = J(() => {
        const o = De(e)
        return o == null ? void 0 : o.locale
      })
    return {
      config: e,
      globalSize: a,
      globalZIndex: n,
      globalLocale: r
    }
  }
var Kt =
  typeof globalThis < 'u'
    ? globalThis
    : typeof window < 'u'
      ? window
      : typeof global < 'u'
        ? global
        : typeof self < 'u'
          ? self
          : {}
function F(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, 'default') ? e.default : e
}
var Zt = { exports: {} },
  Uw = Zt.exports,
  bc
function R() {
  return (
    bc ||
      ((bc = 1),
      (function (e, a) {
        ;(function (n, r) {
          e.exports = r()
        })(Uw, function () {
          var n = 1e3,
            r = 6e4,
            o = 36e5,
            s = 'millisecond',
            t = 'second',
            i = 'minute',
            u = 'hour',
            l = 'day',
            d = 'week',
            c = 'month',
            _ = 'quarter',
            f = 'year',
            m = 'date',
            h = 'Invalid Date',
            y =
              /^(\d{4})[-/]?(\d{1,2})?[-/]?(\d{0,2})[Tt\s]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?[.:]?(\d+)?$/,
            p =
              /\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g,
            v = {
              name: 'en',
              weekdays: 'Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday'.split('_'),
              months:
                'January_February_March_April_May_June_July_August_September_October_November_December'.split(
                  '_'
                ),
              ordinal: function (T) {
                var x = ['th', 'st', 'nd', 'rd'],
                  H = T % 100
                return '[' + T + (x[(H - 20) % 10] || x[H] || x[0]) + ']'
              }
            },
            g = function (T, x, H) {
              var G = String(T)
              return !G || G.length >= x ? T : '' + Array(x + 1 - G.length).join(H) + T
            },
            M = {
              s: g,
              z: function (T) {
                var x = -T.utcOffset(),
                  H = Math.abs(x),
                  G = Math.floor(H / 60),
                  N = H % 60
                return (x <= 0 ? '+' : '-') + g(G, 2, '0') + ':' + g(N, 2, '0')
              },
              m: function T(x, H) {
                if (x.date() < H.date()) return -T(H, x)
                var G = 12 * (H.year() - x.year()) + (H.month() - x.month()),
                  N = x.clone().add(G, c),
                  W = H - N < 0,
                  Z = x.clone().add(G + (W ? -1 : 1), c)
                return +(-(G + (H - N) / (W ? N - Z : Z - N)) || 0)
              },
              a: function (T) {
                return T < 0 ? Math.ceil(T) || 0 : Math.floor(T)
              },
              p: function (T) {
                return (
                  { M: c, y: f, w: d, d: l, D: m, h: u, m: i, s: t, ms: s, Q: _ }[T] ||
                  String(T || '')
                    .toLowerCase()
                    .replace(/s$/, '')
                )
              },
              u: function (T) {
                return T === void 0
              }
            },
            w = 'en',
            L = {}
          L[w] = v
          var D = '$isDayjsObject',
            Y = function (T) {
              return T instanceof O || !(!T || !T[D])
            },
            E = function T(x, H, G) {
              var N
              if (!x) return w
              if (typeof x == 'string') {
                var W = x.toLowerCase()
                ;(L[W] && (N = W), H && ((L[W] = H), (N = W)))
                var Z = x.split('-')
                if (!N && Z.length > 1) return T(Z[0])
              } else {
                var K = x.name
                ;((L[K] = x), (N = K))
              }
              return (!G && N && (w = N), N || (!G && w))
            },
            k = function (T, x) {
              if (Y(T)) return T.clone()
              var H = typeof x == 'object' ? x : {}
              return ((H.date = T), (H.args = arguments), new O(H))
            },
            S = M
          ;((S.l = E),
            (S.i = Y),
            (S.w = function (T, x) {
              return k(T, { locale: x.$L, utc: x.$u, x: x.$x, $offset: x.$offset })
            }))
          var O = (function () {
              function T(H) {
                ;((this.$L = E(H.locale, null, !0)),
                  this.parse(H),
                  (this.$x = this.$x || H.x || {}),
                  (this[D] = !0))
              }
              var x = T.prototype
              return (
                (x.parse = function (H) {
                  ;((this.$d = (function (G) {
                    var N = G.date,
                      W = G.utc
                    if (N === null) return /* @__PURE__ */ new Date(NaN)
                    if (S.u(N)) return /* @__PURE__ */ new Date()
                    if (N instanceof Date) return new Date(N)
                    if (typeof N == 'string' && !/Z$/i.test(N)) {
                      var Z = N.match(y)
                      if (Z) {
                        var K = Z[2] - 1 || 0,
                          ne = (Z[7] || '0').substring(0, 3)
                        return W
                          ? new Date(
                              Date.UTC(Z[1], K, Z[3] || 1, Z[4] || 0, Z[5] || 0, Z[6] || 0, ne)
                            )
                          : new Date(Z[1], K, Z[3] || 1, Z[4] || 0, Z[5] || 0, Z[6] || 0, ne)
                      }
                    }
                    return new Date(N)
                  })(H)),
                    this.init())
                }),
                (x.init = function () {
                  var H = this.$d
                  ;((this.$y = H.getFullYear()),
                    (this.$M = H.getMonth()),
                    (this.$D = H.getDate()),
                    (this.$W = H.getDay()),
                    (this.$H = H.getHours()),
                    (this.$m = H.getMinutes()),
                    (this.$s = H.getSeconds()),
                    (this.$ms = H.getMilliseconds()))
                }),
                (x.$utils = function () {
                  return S
                }),
                (x.isValid = function () {
                  return this.$d.toString() !== h
                }),
                (x.isSame = function (H, G) {
                  var N = k(H)
                  return this.startOf(G) <= N && N <= this.endOf(G)
                }),
                (x.isAfter = function (H, G) {
                  return k(H) < this.startOf(G)
                }),
                (x.isBefore = function (H, G) {
                  return this.endOf(G) < k(H)
                }),
                (x.$g = function (H, G, N) {
                  return S.u(H) ? this[G] : this.set(N, H)
                }),
                (x.unix = function () {
                  return Math.floor(this.valueOf() / 1e3)
                }),
                (x.valueOf = function () {
                  return this.$d.getTime()
                }),
                (x.startOf = function (H, G) {
                  var N = this,
                    W = !!S.u(G) || G,
                    Z = S.p(H),
                    K = function (ce, le) {
                      var he = S.w(N.$u ? Date.UTC(N.$y, le, ce) : new Date(N.$y, le, ce), N)
                      return W ? he : he.endOf(l)
                    },
                    ne = function (ce, le) {
                      return S.w(
                        N.toDate()[ce].apply(
                          N.toDate('s'),
                          (W ? [0, 0, 0, 0] : [23, 59, 59, 999]).slice(le)
                        ),
                        N
                      )
                    },
                    se = this.$W,
                    A = this.$M,
                    B = this.$D,
                    U = 'set' + (this.$u ? 'UTC' : '')
                  switch (Z) {
                    case f:
                      return W ? K(1, 0) : K(31, 11)
                    case c:
                      return W ? K(1, A) : K(0, A + 1)
                    case d:
                      var V = this.$locale().weekStart || 0,
                        oe = (se < V ? se + 7 : se) - V
                      return K(W ? B - oe : B + (6 - oe), A)
                    case l:
                    case m:
                      return ne(U + 'Hours', 0)
                    case u:
                      return ne(U + 'Minutes', 1)
                    case i:
                      return ne(U + 'Seconds', 2)
                    case t:
                      return ne(U + 'Milliseconds', 3)
                    default:
                      return this.clone()
                  }
                }),
                (x.endOf = function (H) {
                  return this.startOf(H, !1)
                }),
                (x.$set = function (H, G) {
                  var N,
                    W = S.p(H),
                    Z = 'set' + (this.$u ? 'UTC' : ''),
                    K = ((N = {}),
                    (N[l] = Z + 'Date'),
                    (N[m] = Z + 'Date'),
                    (N[c] = Z + 'Month'),
                    (N[f] = Z + 'FullYear'),
                    (N[u] = Z + 'Hours'),
                    (N[i] = Z + 'Minutes'),
                    (N[t] = Z + 'Seconds'),
                    (N[s] = Z + 'Milliseconds'),
                    N)[W],
                    ne = W === l ? this.$D + (G - this.$W) : G
                  if (W === c || W === f) {
                    var se = this.clone().set(m, 1)
                    ;(se.$d[K](ne),
                      se.init(),
                      (this.$d = se.set(m, Math.min(this.$D, se.daysInMonth())).$d))
                  } else K && this.$d[K](ne)
                  return (this.init(), this)
                }),
                (x.set = function (H, G) {
                  return this.clone().$set(H, G)
                }),
                (x.get = function (H) {
                  return this[S.p(H)]()
                }),
                (x.add = function (H, G) {
                  var N,
                    W = this
                  H = Number(H)
                  var Z = S.p(G),
                    K = function (A) {
                      var B = k(W)
                      return S.w(B.date(B.date() + Math.round(A * H)), W)
                    }
                  if (Z === c) return this.set(c, this.$M + H)
                  if (Z === f) return this.set(f, this.$y + H)
                  if (Z === l) return K(1)
                  if (Z === d) return K(7)
                  var ne = ((N = {}), (N[i] = r), (N[u] = o), (N[t] = n), N)[Z] || 1,
                    se = this.$d.getTime() + H * ne
                  return S.w(se, this)
                }),
                (x.subtract = function (H, G) {
                  return this.add(-1 * H, G)
                }),
                (x.format = function (H) {
                  var G = this,
                    N = this.$locale()
                  if (!this.isValid()) return N.invalidDate || h
                  var W = H || 'YYYY-MM-DDTHH:mm:ssZ',
                    Z = S.z(this),
                    K = this.$H,
                    ne = this.$m,
                    se = this.$M,
                    A = N.weekdays,
                    B = N.months,
                    U = N.meridiem,
                    V = function (le, he, qe, be) {
                      return (le && (le[he] || le(G, W))) || qe[he].slice(0, be)
                    },
                    oe = function (le) {
                      return S.s(K % 12 || 12, le, '0')
                    },
                    ce =
                      U ||
                      function (le, he, qe) {
                        var be = le < 12 ? 'AM' : 'PM'
                        return qe ? be.toLowerCase() : be
                      }
                  return W.replace(p, function (le, he) {
                    return (
                      he ||
                      (function (qe) {
                        switch (qe) {
                          case 'YY':
                            return String(G.$y).slice(-2)
                          case 'YYYY':
                            return S.s(G.$y, 4, '0')
                          case 'M':
                            return se + 1
                          case 'MM':
                            return S.s(se + 1, 2, '0')
                          case 'MMM':
                            return V(N.monthsShort, se, B, 3)
                          case 'MMMM':
                            return V(B, se)
                          case 'D':
                            return G.$D
                          case 'DD':
                            return S.s(G.$D, 2, '0')
                          case 'd':
                            return String(G.$W)
                          case 'dd':
                            return V(N.weekdaysMin, G.$W, A, 2)
                          case 'ddd':
                            return V(N.weekdaysShort, G.$W, A, 3)
                          case 'dddd':
                            return A[G.$W]
                          case 'H':
                            return String(K)
                          case 'HH':
                            return S.s(K, 2, '0')
                          case 'h':
                            return oe(1)
                          case 'hh':
                            return oe(2)
                          case 'a':
                            return ce(K, ne, !0)
                          case 'A':
                            return ce(K, ne, !1)
                          case 'm':
                            return String(ne)
                          case 'mm':
                            return S.s(ne, 2, '0')
                          case 's':
                            return String(G.$s)
                          case 'ss':
                            return S.s(G.$s, 2, '0')
                          case 'SSS':
                            return S.s(G.$ms, 3, '0')
                          case 'Z':
                            return Z
                        }
                        return null
                      })(le) ||
                      Z.replace(':', '')
                    )
                  })
                }),
                (x.utcOffset = function () {
                  return 15 * -Math.round(this.$d.getTimezoneOffset() / 15)
                }),
                (x.diff = function (H, G, N) {
                  var W,
                    Z = this,
                    K = S.p(G),
                    ne = k(H),
                    se = (ne.utcOffset() - this.utcOffset()) * r,
                    A = this - ne,
                    B = function () {
                      return S.m(Z, ne)
                    }
                  switch (K) {
                    case f:
                      W = B() / 12
                      break
                    case c:
                      W = B()
                      break
                    case _:
                      W = B() / 3
                      break
                    case d:
                      W = (A - se) / 6048e5
                      break
                    case l:
                      W = (A - se) / 864e5
                      break
                    case u:
                      W = A / o
                      break
                    case i:
                      W = A / r
                      break
                    case t:
                      W = A / n
                      break
                    default:
                      W = A
                  }
                  return N ? W : S.a(W)
                }),
                (x.daysInMonth = function () {
                  return this.endOf(c).$D
                }),
                (x.$locale = function () {
                  return L[this.$L]
                }),
                (x.locale = function (H, G) {
                  if (!H) return this.$L
                  var N = this.clone(),
                    W = E(H, G, !0)
                  return (W && (N.$L = W), N)
                }),
                (x.clone = function () {
                  return S.w(this.$d, this)
                }),
                (x.toDate = function () {
                  return new Date(this.valueOf())
                }),
                (x.toJSON = function () {
                  return this.isValid() ? this.toISOString() : null
                }),
                (x.toISOString = function () {
                  return this.$d.toISOString()
                }),
                (x.toString = function () {
                  return this.$d.toUTCString()
                }),
                T
              )
            })(),
            z = O.prototype
          return (
            (k.prototype = z),
            [
              ['$ms', s],
              ['$s', t],
              ['$m', i],
              ['$H', u],
              ['$W', l],
              ['$M', c],
              ['$y', f],
              ['$D', m]
            ].forEach(function (T) {
              z[T[1]] = function (x) {
                return this.$g(x, T[0], T[1])
              }
            }),
            (k.extend = function (T, x) {
              return (T.$i || (T(x, O, k), (T.$i = !0)), k)
            }),
            (k.locale = E),
            (k.isDayjs = Y),
            (k.unix = function (T) {
              return k(1e3 * T)
            }),
            (k.en = L[w]),
            (k.Ls = L),
            (k.p = {}),
            k
          )
        })
      })(Zt)),
    Zt.exports
  )
}
var Bg = R()
const Ng = /* @__PURE__ */ F(Bg),
  Ww = /* @__PURE__ */ q(
    {
      __proto__: null,
      default: Ng
    },
    [Bg]
  ),
  xt = Ng ?? Ww
var Qt = { exports: {} },
  Vw = Qt.exports,
  Yc
function Kw() {
  return (
    Yc ||
      ((Yc = 1),
      (function (e, a) {
        ;(function (n, r) {
          e.exports = r()
        })(Vw, function () {
          return {
            name: 'en',
            weekdays: 'Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday'.split('_'),
            months:
              'January_February_March_April_May_June_July_August_September_October_November_December'.split(
                '_'
              ),
            ordinal: function (n) {
              var r = ['th', 'st', 'nd', 'rd'],
                o = n % 100
              return '[' + n + (r[(o - 20) % 10] || r[o] || r[0]) + ']'
            }
          }
        })
      })(Qt)),
    Qt.exports
  )
}
Kw()
const Xw = /* @__PURE__ */ Object.assign({
    '../../../../node_modules/dayjs/locale/af.js': () => Promise.resolve().then(() => t2),
    '../../../../node_modules/dayjs/locale/am.js': () => Promise.resolve().then(() => o2),
    '../../../../node_modules/dayjs/locale/ar-dz.js': () => Promise.resolve().then(() => l2),
    '../../../../node_modules/dayjs/locale/ar-iq.js': () => Promise.resolve().then(() => f2),
    '../../../../node_modules/dayjs/locale/ar-kw.js': () => Promise.resolve().then(() => v2),
    '../../../../node_modules/dayjs/locale/ar-ly.js': () => Promise.resolve().then(() => b2),
    '../../../../node_modules/dayjs/locale/ar-ma.js': () => Promise.resolve().then(() => L2),
    '../../../../node_modules/dayjs/locale/ar-sa.js': () => Promise.resolve().then(() => E2),
    '../../../../node_modules/dayjs/locale/ar-tn.js': () => Promise.resolve().then(() => j2),
    '../../../../node_modules/dayjs/locale/ar.js': () => Promise.resolve().then(() => F2),
    '../../../../node_modules/dayjs/locale/az.js': () => Promise.resolve().then(() => B2),
    '../../../../node_modules/dayjs/locale/be.js': () => Promise.resolve().then(() => G2),
    '../../../../node_modules/dayjs/locale/bg.js': () => Promise.resolve().then(() => V2),
    '../../../../node_modules/dayjs/locale/bi.js': () => Promise.resolve().then(() => Q2),
    '../../../../node_modules/dayjs/locale/bm.js': () => Promise.resolve().then(() => n5),
    '../../../../node_modules/dayjs/locale/bn-bd.js': () => Promise.resolve().then(() => i5),
    '../../../../node_modules/dayjs/locale/bn.js': () => Promise.resolve().then(() => c5),
    '../../../../node_modules/dayjs/locale/bo.js': () => Promise.resolve().then(() => p5),
    '../../../../node_modules/dayjs/locale/br.js': () => Promise.resolve().then(() => g5),
    '../../../../node_modules/dayjs/locale/bs.js': () => Promise.resolve().then(() => w5),
    '../../../../node_modules/dayjs/locale/ca.js': () => Promise.resolve().then(() => S5),
    '../../../../node_modules/dayjs/locale/cs.js': () => Promise.resolve().then(() => $5),
    '../../../../node_modules/dayjs/locale/cv.js': () => Promise.resolve().then(() => A5),
    '../../../../node_modules/dayjs/locale/cy.js': () => Promise.resolve().then(() => I5),
    '../../../../node_modules/dayjs/locale/da.js': () => Promise.resolve().then(() => O5),
    '../../../../node_modules/dayjs/locale/de-at.js': () => Promise.resolve().then(() => U5),
    '../../../../node_modules/dayjs/locale/de-ch.js': () => Promise.resolve().then(() => X5),
    '../../../../node_modules/dayjs/locale/de.js': () => Promise.resolve().then(() => tT),
    '../../../../node_modules/dayjs/locale/dv.js': () => Promise.resolve().then(() => oT),
    '../../../../node_modules/dayjs/locale/el.js': () => Promise.resolve().then(() => lT),
    '../../../../node_modules/dayjs/locale/en-au.js': () => Promise.resolve().then(() => fT),
    '../../../../node_modules/dayjs/locale/en-ca.js': () => Promise.resolve().then(() => vT),
    '../../../../node_modules/dayjs/locale/en-gb.js': () => Promise.resolve().then(() => bT),
    '../../../../node_modules/dayjs/locale/en-ie.js': () => Promise.resolve().then(() => LT),
    '../../../../node_modules/dayjs/locale/en-il.js': () => Promise.resolve().then(() => ET),
    '../../../../node_modules/dayjs/locale/en-in.js': () => Promise.resolve().then(() => jT),
    '../../../../node_modules/dayjs/locale/en-nz.js': () => Promise.resolve().then(() => FT),
    '../../../../node_modules/dayjs/locale/en-sg.js': () => Promise.resolve().then(() => BT),
    '../../../../node_modules/dayjs/locale/en-tt.js': () => Promise.resolve().then(() => GT),
    '../../../../node_modules/dayjs/locale/eo.js': () => Promise.resolve().then(() => VT),
    '../../../../node_modules/dayjs/locale/es-do.js': () => Promise.resolve().then(() => QT),
    '../../../../node_modules/dayjs/locale/es-mx.js': () => Promise.resolve().then(() => n$),
    '../../../../node_modules/dayjs/locale/es-pr.js': () => Promise.resolve().then(() => i$),
    '../../../../node_modules/dayjs/locale/es-us.js': () => Promise.resolve().then(() => c$),
    '../../../../node_modules/dayjs/locale/es.js': () => Promise.resolve().then(() => p$),
    '../../../../node_modules/dayjs/locale/et.js': () => Promise.resolve().then(() => g$),
    '../../../../node_modules/dayjs/locale/eu.js': () => Promise.resolve().then(() => w$),
    '../../../../node_modules/dayjs/locale/fa.js': () => Promise.resolve().then(() => S$),
    '../../../../node_modules/dayjs/locale/fi.js': () => Promise.resolve().then(() => $$),
    '../../../../node_modules/dayjs/locale/fo.js': () => Promise.resolve().then(() => A$),
    '../../../../node_modules/dayjs/locale/fr-ca.js': () => Promise.resolve().then(() => I$),
    '../../../../node_modules/dayjs/locale/fr-ch.js': () => Promise.resolve().then(() => O$),
    '../../../../node_modules/dayjs/locale/fr.js': () => Promise.resolve().then(() => U$),
    '../../../../node_modules/dayjs/locale/fy.js': () => Promise.resolve().then(() => X$),
    '../../../../node_modules/dayjs/locale/ga.js': () => Promise.resolve().then(() => t6),
    '../../../../node_modules/dayjs/locale/gd.js': () => Promise.resolve().then(() => o6),
    '../../../../node_modules/dayjs/locale/gl.js': () => Promise.resolve().then(() => l6),
    '../../../../node_modules/dayjs/locale/gom-latn.js': () => Promise.resolve().then(() => f6),
    '../../../../node_modules/dayjs/locale/gu.js': () => Promise.resolve().then(() => v6),
    '../../../../node_modules/dayjs/locale/he.js': () => Promise.resolve().then(() => b6),
    '../../../../node_modules/dayjs/locale/hi.js': () => Promise.resolve().then(() => L6),
    '../../../../node_modules/dayjs/locale/hr.js': () => Promise.resolve().then(() => E6),
    '../../../../node_modules/dayjs/locale/ht.js': () => Promise.resolve().then(() => j6),
    '../../../../node_modules/dayjs/locale/hu.js': () => Promise.resolve().then(() => F6),
    '../../../../node_modules/dayjs/locale/hy-am.js': () => Promise.resolve().then(() => B6),
    '../../../../node_modules/dayjs/locale/id.js': () => Promise.resolve().then(() => G6),
    '../../../../node_modules/dayjs/locale/is.js': () => Promise.resolve().then(() => V6),
    '../../../../node_modules/dayjs/locale/it-ch.js': () => Promise.resolve().then(() => Q6),
    '../../../../node_modules/dayjs/locale/it.js': () => Promise.resolve().then(() => nH),
    '../../../../node_modules/dayjs/locale/ja.js': () => Promise.resolve().then(() => iH),
    '../../../../node_modules/dayjs/locale/jv.js': () => Promise.resolve().then(() => cH),
    '../../../../node_modules/dayjs/locale/ka.js': () => Promise.resolve().then(() => pH),
    '../../../../node_modules/dayjs/locale/kk.js': () => Promise.resolve().then(() => gH),
    '../../../../node_modules/dayjs/locale/km.js': () => Promise.resolve().then(() => wH),
    '../../../../node_modules/dayjs/locale/kn.js': () => Promise.resolve().then(() => SH),
    '../../../../node_modules/dayjs/locale/ko.js': () => Promise.resolve().then(() => $H),
    '../../../../node_modules/dayjs/locale/ku.js': () => Promise.resolve().then(() => AH),
    '../../../../node_modules/dayjs/locale/ky.js': () => Promise.resolve().then(() => IH),
    '../../../../node_modules/dayjs/locale/lb.js': () => Promise.resolve().then(() => OH),
    '../../../../node_modules/dayjs/locale/lo.js': () => Promise.resolve().then(() => UH),
    '../../../../node_modules/dayjs/locale/lt.js': () => Promise.resolve().then(() => XH),
    '../../../../node_modules/dayjs/locale/lv.js': () => Promise.resolve().then(() => tj),
    '../../../../node_modules/dayjs/locale/me.js': () => Promise.resolve().then(() => oj),
    '../../../../node_modules/dayjs/locale/mi.js': () => Promise.resolve().then(() => lj),
    '../../../../node_modules/dayjs/locale/mk.js': () => Promise.resolve().then(() => fj),
    '../../../../node_modules/dayjs/locale/ml.js': () => Promise.resolve().then(() => vj),
    '../../../../node_modules/dayjs/locale/mn.js': () => Promise.resolve().then(() => bj),
    '../../../../node_modules/dayjs/locale/mr.js': () => Promise.resolve().then(() => Lj),
    '../../../../node_modules/dayjs/locale/ms-my.js': () => Promise.resolve().then(() => Ej),
    '../../../../node_modules/dayjs/locale/ms.js': () => Promise.resolve().then(() => jj),
    '../../../../node_modules/dayjs/locale/mt.js': () => Promise.resolve().then(() => Fj),
    '../../../../node_modules/dayjs/locale/my.js': () => Promise.resolve().then(() => Bj),
    '../../../../node_modules/dayjs/locale/nb.js': () => Promise.resolve().then(() => Gj),
    '../../../../node_modules/dayjs/locale/ne.js': () => Promise.resolve().then(() => Vj),
    '../../../../node_modules/dayjs/locale/nl-be.js': () => Promise.resolve().then(() => Qj),
    '../../../../node_modules/dayjs/locale/nl.js': () => Promise.resolve().then(() => nC),
    '../../../../node_modules/dayjs/locale/nn.js': () => Promise.resolve().then(() => iC),
    '../../../../node_modules/dayjs/locale/oc-lnc.js': () => Promise.resolve().then(() => cC),
    '../../../../node_modules/dayjs/locale/pa-in.js': () => Promise.resolve().then(() => pC),
    '../../../../node_modules/dayjs/locale/pl.js': () => Promise.resolve().then(() => gC),
    '../../../../node_modules/dayjs/locale/pt-br.js': () => Promise.resolve().then(() => wC),
    '../../../../node_modules/dayjs/locale/pt.js': () => Promise.resolve().then(() => SC),
    '../../../../node_modules/dayjs/locale/rn.js': () => Promise.resolve().then(() => $C),
    '../../../../node_modules/dayjs/locale/ro.js': () => Promise.resolve().then(() => AC),
    '../../../../node_modules/dayjs/locale/ru.js': () => Promise.resolve().then(() => IC),
    '../../../../node_modules/dayjs/locale/rw.js': () => Promise.resolve().then(() => OC),
    '../../../../node_modules/dayjs/locale/sd.js': () => Promise.resolve().then(() => UC),
    '../../../../node_modules/dayjs/locale/se.js': () => Promise.resolve().then(() => XC),
    '../../../../node_modules/dayjs/locale/si.js': () => Promise.resolve().then(() => tA),
    '../../../../node_modules/dayjs/locale/sk.js': () => Promise.resolve().then(() => oA),
    '../../../../node_modules/dayjs/locale/sl.js': () => Promise.resolve().then(() => lA),
    '../../../../node_modules/dayjs/locale/sq.js': () => Promise.resolve().then(() => fA),
    '../../../../node_modules/dayjs/locale/sr-cyrl.js': () => Promise.resolve().then(() => vA),
    '../../../../node_modules/dayjs/locale/sr.js': () => Promise.resolve().then(() => bA),
    '../../../../node_modules/dayjs/locale/ss.js': () => Promise.resolve().then(() => LA),
    '../../../../node_modules/dayjs/locale/sv-fi.js': () => Promise.resolve().then(() => EA),
    '../../../../node_modules/dayjs/locale/sv.js': () => Promise.resolve().then(() => jA),
    '../../../../node_modules/dayjs/locale/sw.js': () => Promise.resolve().then(() => FA),
    '../../../../node_modules/dayjs/locale/ta.js': () => Promise.resolve().then(() => BA),
    '../../../../node_modules/dayjs/locale/te.js': () => Promise.resolve().then(() => GA),
    '../../../../node_modules/dayjs/locale/tet.js': () => Promise.resolve().then(() => VA),
    '../../../../node_modules/dayjs/locale/tg.js': () => Promise.resolve().then(() => QA),
    '../../../../node_modules/dayjs/locale/th.js': () => Promise.resolve().then(() => nq),
    '../../../../node_modules/dayjs/locale/tk.js': () => Promise.resolve().then(() => iq),
    '../../../../node_modules/dayjs/locale/tl-ph.js': () => Promise.resolve().then(() => cq),
    '../../../../node_modules/dayjs/locale/tlh.js': () => Promise.resolve().then(() => pq),
    '../../../../node_modules/dayjs/locale/tr.js': () => Promise.resolve().then(() => gq),
    '../../../../node_modules/dayjs/locale/tzl.js': () => Promise.resolve().then(() => wq),
    '../../../../node_modules/dayjs/locale/tzm-latn.js': () => Promise.resolve().then(() => Sq),
    '../../../../node_modules/dayjs/locale/tzm.js': () => Promise.resolve().then(() => $q),
    '../../../../node_modules/dayjs/locale/ug-cn.js': () => Promise.resolve().then(() => Aq),
    '../../../../node_modules/dayjs/locale/uk.js': () => Promise.resolve().then(() => Iq),
    '../../../../node_modules/dayjs/locale/ur.js': () => Promise.resolve().then(() => Oq),
    '../../../../node_modules/dayjs/locale/uz-latn.js': () => Promise.resolve().then(() => Uq),
    '../../../../node_modules/dayjs/locale/uz.js': () => Promise.resolve().then(() => Xq),
    '../../../../node_modules/dayjs/locale/vi.js': () => Promise.resolve().then(() => tF),
    '../../../../node_modules/dayjs/locale/x-pseudo.js': () => Promise.resolve().then(() => oF),
    '../../../../node_modules/dayjs/locale/yo.js': () => Promise.resolve().then(() => lF),
    '../../../../node_modules/dayjs/locale/zh-cn.js': () => Promise.resolve().then(() => fF),
    '../../../../node_modules/dayjs/locale/zh-hk.js': () => Promise.resolve().then(() => vF),
    '../../../../node_modules/dayjs/locale/zh-tw.js': () => Promise.resolve().then(() => bF),
    '../../../../node_modules/dayjs/locale/zh.js': () => Promise.resolve().then(() => LF)
  }),
  wc = /* @__PURE__ */ new Set(['en']),
  Zw = {
    'zh-cn': 'zh-cn',
    'zh-tw': 'zh-tw',
    'zh-hk': 'zh-hk',
    'zh-mo': 'zh-tw',
    en: 'en',
    ja: 'ja',
    ko: 'ko',
    de: 'de',
    fr: 'fr',
    es: 'es',
    pt: 'pt',
    'pt-br': 'pt-br',
    ru: 'ru',
    ar: 'ar',
    'ar-eg': 'ar',
    tr: 'tr',
    it: 'it',
    nl: 'nl',
    pl: 'pl',
    th: 'th',
    vi: 'vi',
    id: 'id',
    ms: 'ms',
    da: 'da',
    sv: 'sv',
    fi: 'fi',
    no: 'nb',
    'nb-NO': 'nb',
    cs: 'cs',
    sk: 'sk',
    uk: 'uk',
    hu: 'hu',
    ro: 'ro',
    bg: 'bg',
    az: 'az',
    fa: 'fa',
    hi: 'hi',
    pa: 'pa-in',
    el: 'el',
    ca: 'ca',
    tk: 'tk',
    ta: 'ta',
    lv: 'lv',
    af: 'af',
    et: 'et',
    sl: 'sl',
    he: 'he',
    lo: 'lo',
    lt: 'lt',
    mn: 'mn',
    kk: 'kk',
    ku: 'ku',
    ckb: 'ku',
    'ug-cn': 'ug-cn',
    km: 'km',
    sr: 'sr',
    eu: 'eu',
    ky: 'ky',
    'hy-am': 'hy-am',
    hr: 'hr',
    eo: 'eo',
    bn: 'bn',
    mg: 'mg',
    sw: 'sw',
    'uz-uz': 'uz',
    my: 'my',
    te: 'te'
  },
  Qw = async (e) => {
    const a = `../../../../node_modules/dayjs/locale/${e}.js`,
      n = Xw[a]
    if (n) return (await n(), !0)
    try {
      return (
        await import(
          /* @vite-ignore */
          `dayjs/locale/${e}.js`
        ),
        !0
      )
    } catch {
      return !1
    }
  },
  ex = (e) => Zw[e.toLowerCase()] || 'en',
  tx = async (e) => {
    const a = ex(e)
    if (wc.has(a)) {
      xt.locale(a)
      return
    }
    if (a === 'en') {
      xt.locale('en')
      return
    }
    try {
      if (!(await Qw(a))) {
        xt.locale('en')
        return
      }
      ;(wc.add(a), xt.locale(a))
    } catch {
      xt.locale('en')
    }
  },
  rx = (e) => {
    const { globalLocale: a } = Jw(),
      n = J(() => De(e) ?? De(a) ?? zw),
      r = J(() => n.value.name)
    return (
      Le(
        r,
        (t) => {
          tx(t)
        },
        { immediate: !0 }
      ),
      {
        locale: n,
        lang: r,
        t: (t, i) => {
          const u = t.split('.')
          let l = n.value.yh
          for (const d of u)
            if ((l && typeof l == 'object' ? (l = l[d]) : (l = void 0), l === void 0)) return t
          return typeof l != 'string'
            ? t
            : i
              ? l.replace(/\{(\w+)\}/g, (d, c) => {
                  const _ = i[c]
                  return _ !== void 0 ? String(_) : `{${c}}`
                })
              : l
        },
        tRaw: (t) => {
          const i = t.split('.')
          let u = n.value.yh
          for (const l of i)
            if ((u && typeof u == 'object' ? (u = u[l]) : (u = void 0), u === void 0)) return t
          return u
        }
      }
    )
  },
  nx = ['title'],
  ax = ['title'],
  ox = {
    key: 2,
    class: 'yh-flow-controls__divider'
  },
  sx = ['title'],
  ix = ['title'],
  ux = {
    key: 0,
    viewBox: '0 0 24 24',
    width: '16',
    height: '16'
  },
  lx = {
    key: 1,
    viewBox: '0 0 24 24',
    width: '16',
    height: '16'
  },
  dx = /* @__PURE__ */ ie({
    __name: 'Controls',
    props: {
      position: { default: 'bottom-right' },
      showZoom: { type: Boolean, default: !0 },
      showFitView: { type: Boolean, default: !0 },
      showInteractive: { type: Boolean, default: !0 }
    },
    setup(e) {
      const { t: a } = rx(),
        n = At(),
        r = J(() => {
          var u
          return ((u = n.isLocked) == null ? void 0 : u.value) || !1
        }),
        o = () => n.zoomIn(),
        s = () => n.zoomOut(),
        t = () => n.fitView(),
        i = () => {
          n.setInteractive && n.setInteractive(r.value)
        }
      return (u, l) => (
        $(),
        j(
          'div',
          {
            class: te(['yh-flow-controls', [e.position]])
          },
          [
            e.showZoom
              ? ($(),
                j(
                  'button',
                  {
                    key: 0,
                    class: 'yh-flow-controls__btn',
                    title: De(a)('flow.zoomIn'),
                    onClick: o
                  },
                  [
                    ...(l[0] ||
                      (l[0] = [
                        b(
                          'svg',
                          {
                            viewBox: '0 0 24 24',
                            width: '16',
                            height: '16'
                          },
                          [
                            b('path', {
                              fill: 'currentColor',
                              d: 'M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z'
                            })
                          ],
                          -1
                          /* CACHED */
                        )
                      ]))
                  ],
                  8,
                  nx
                ))
              : I('v-if', !0),
            e.showZoom
              ? ($(),
                j(
                  'button',
                  {
                    key: 1,
                    class: 'yh-flow-controls__btn',
                    title: De(a)('flow.zoomOut'),
                    onClick: s
                  },
                  [
                    ...(l[1] ||
                      (l[1] = [
                        b(
                          'svg',
                          {
                            viewBox: '0 0 24 24',
                            width: '16',
                            height: '16'
                          },
                          [
                            b('path', {
                              fill: 'currentColor',
                              d: 'M19 13H5v-2h14v2z'
                            })
                          ],
                          -1
                          /* CACHED */
                        )
                      ]))
                  ],
                  8,
                  ax
                ))
              : I('v-if', !0),
            e.showZoom && e.showFitView ? ($(), j('div', ox)) : I('v-if', !0),
            e.showFitView
              ? ($(),
                j(
                  'button',
                  {
                    key: 3,
                    class: 'yh-flow-controls__btn',
                    title: De(a)('flow.fitView'),
                    onClick: t
                  },
                  [
                    ...(l[2] ||
                      (l[2] = [
                        b(
                          'svg',
                          {
                            viewBox: '0 0 24 24',
                            width: '16',
                            height: '16'
                          },
                          [
                            b('path', {
                              fill: 'currentColor',
                              d: 'M15 3l2.3 2.3-2.89 2.87 1.42 1.42L18.7 6.7 21 9V3h-6zM3 9l2.3-2.3 2.87 2.89 1.42-1.42L6.7 5.3 9 3H3v6zm6 12l-2.3-2.3 2.89-2.87-1.42-1.42L5.3 17.3 3 15v6zm12-6l-2.3 2.3-2.87-2.89-1.42 1.42 2.89 2.87L15 21h6v-6z'
                            })
                          ],
                          -1
                          /* CACHED */
                        )
                      ]))
                  ],
                  8,
                  sx
                ))
              : I('v-if', !0),
            e.showInteractive
              ? ($(),
                j(
                  'button',
                  {
                    key: 4,
                    class: te(['yh-flow-controls__btn', { 'is-active': r.value }]),
                    title: De(a)('flow.lock'),
                    onClick: i
                  },
                  [
                    r.value
                      ? ($(),
                        j('svg', ux, [
                          ...(l[3] ||
                            (l[3] = [
                              b(
                                'path',
                                {
                                  fill: 'currentColor',
                                  d: 'M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z'
                                },
                                null,
                                -1
                                /* CACHED */
                              )
                            ]))
                        ]))
                      : ($(),
                        j('svg', lx, [
                          ...(l[4] ||
                            (l[4] = [
                              b(
                                'path',
                                {
                                  fill: 'currentColor',
                                  d: 'M12 17c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm6-9h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6h1.9c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm0 12H6V10h12v10z'
                                },
                                null,
                                -1
                                /* CACHED */
                              )
                            ]))
                        ]))
                  ],
                  10,
                  ix
                ))
              : I('v-if', !0)
          ],
          2
          /* CLASS */
        )
      )
    }
  }),
  cx = /* @__PURE__ */ ue(dx, [['__scopeId', 'data-v-c01219b7']]),
  _x = {
    enabled: !0,
    position: 'bottom-left',
    showZoom: !0,
    showFitView: !0,
    showInteractive: !0
  }
function Ra(e = {}) {
  const a = { ..._x, ...e }
  return {
    id: 'controls',
    name: 'Controls',
    version: '1.0.0',
    description: 'Displays a set of controls for zooming and fitting the view',
    component: Ja(cx),
    componentProps: {
      position: a.position,
      showZoom: a.showZoom,
      showFitView: a.showFitView,
      showInteractive: a.showInteractive
    },
    install(n) {
      console.log('[Controls Plugin] Installed')
    }
  }
}
const fx = ['width', 'height'],
  mx = /* @__PURE__ */ ie({
    __name: 'Background',
    props: {
      type: {},
      color: {},
      gap: {}
    },
    setup(e) {
      const a = e,
        n = ee(),
        r = ee(2e3),
        o = ee(2e3),
        s = At(),
        t = s.viewport,
        i = J(() => ({
          backgroundColor: 'var(--flow-background-color, #f8f9fa)'
        })),
        u = () => {
          const l = n.value
          if (!l) return
          const d = l.getContext('2d')
          if (!d) return
          const _ = getComputedStyle(l).getPropertyValue('--flow-grid-color').trim(),
            f = a.type || 'dots',
            m = a.color || _ || (f === 'dots' ? '#b1b1b7' : '#e5e7eb'),
            h = a.gap || 20,
            y = t.value.zoom,
            p = { x: t.value.x, y: t.value.y },
            v = s.$el
          if (v) {
            const Y = v.clientWidth || 2e3,
              E = v.clientHeight || 2e3
            ;(l.width !== Y || l.height !== E) &&
              ((l.width = Y), (l.height = E), (r.value = Y), (o.value = E))
          }
          const g = l.width,
            M = l.height
          d.clearRect(0, 0, g, M)
          const w = h * y,
            L = p.x % w,
            D = p.y % w
          if (f === 'dots') {
            d.fillStyle = m
            for (let Y = L; Y < g; Y += w)
              for (let E = D; E < M; E += w)
                (d.beginPath(), d.arc(Y, E, 0.7 * y, 0, Math.PI * 2), d.fill())
          } else if (f === 'grid') {
            ;((d.strokeStyle = m), (d.lineWidth = 0.5))
            for (let Y = L; Y < g; Y += w)
              (d.beginPath(), d.moveTo(Y, 0), d.lineTo(Y, M), d.stroke())
            for (let Y = D; Y < M; Y += w)
              (d.beginPath(), d.moveTo(0, Y), d.lineTo(g, Y), d.stroke())
          }
        }
      return (
        Ht(u),
        Le([t, () => a.type, () => a.color, () => a.gap], u, {
          deep: !0
        }),
        (l, d) => (
          $(),
          j(
            'div',
            {
              class: 'yh-flow-background',
              style: re(i.value)
            },
            [
              b(
                'canvas',
                {
                  ref_key: 'canvasRef',
                  ref: n,
                  width: r.value,
                  height: o.value
                },
                null,
                8,
                fx
              )
            ],
            4
            /* STYLE */
          )
        )
      )
    }
  }),
  px = /* @__PURE__ */ ue(mx, [['__scopeId', 'data-v-a18ac796']]),
  hx = {
    enabled: !0,
    type: 'dots',
    color: '#e5e5e5',
    gap: 20
  }
function Ia(e = {}) {
  const a = { ...hx, ...e }
  return {
    id: 'grid',
    name: 'Grid',
    version: '1.0.0',
    description: 'Displays a grid or dots background',
    component: Ja(px),
    componentProps: {
      type: a.type,
      color: a.color,
      gap: a.gap
    },
    install(n) {
      console.log('[Grid Plugin] Installed')
    }
  }
}
const vx = {
    key: 0,
    class: 'yh-flow-alignment-lines'
  },
  yx = ['y1', 'x2', 'y2'],
  gx = ['x1', 'x2', 'y2'],
  Mx = /* @__PURE__ */ ie({
    __name: 'AlignmentLines',
    props: {
      snapThreshold: {}
    },
    setup(e) {
      const a = e,
        n = At(),
        r = n.nodes,
        o = n.draggingNodeId,
        s = n.draggingPosition,
        t = J(() => {
          var c
          return ((c = n.$el) == null ? void 0 : c.clientWidth) || 800
        }),
        i = J(() => {
          var c
          return ((c = n.$el) == null ? void 0 : c.clientHeight) || 600
        }),
        u = a.snapThreshold ?? 10,
        l = J(() => {
          const c = o.value,
            _ = s.value
          if (!c || !_) return []
          const f = [],
            m = r.value.find((v) => v.id === c)
          if (!m) return []
          const h = m.height || 50,
            y = r.value.filter((v) => v.id !== c && !v.hidden),
            p = [
              { y: m.position.y, key: 'top' },
              { y: m.position.y + h / 2, key: 'center' },
              { y: m.position.y + h, key: 'bottom' }
            ]
          for (const v of p)
            for (const g of y) {
              const M = g.height || 50,
                w = [
                  { y: g.position.y, key: 'top' },
                  { y: g.position.y + M / 2, key: 'center' },
                  { y: g.position.y + M, key: 'bottom' }
                ]
              for (const L of w)
                if (Math.abs(v.y - L.y) < u) {
                  f.push({ y: L.y, active: !0 })
                  break
                }
            }
          return f
        }),
        d = J(() => {
          const c = o.value,
            _ = s.value
          if (!c || !_) return []
          const f = [],
            m = r.value.find((v) => v.id === c)
          if (!m) return []
          const h = m.width || 200,
            y = r.value.filter((v) => v.id !== c && !v.hidden),
            p = [
              { x: m.position.x, key: 'left' },
              { x: m.position.x + h / 2, key: 'center' },
              { x: m.position.x + h, key: 'right' }
            ]
          for (const v of p)
            for (const g of y) {
              const M = g.width || 200,
                w = [
                  { x: g.position.x, key: 'left' },
                  { x: g.position.x + M / 2, key: 'center' },
                  { x: g.position.x + M, key: 'right' }
                ]
              for (const L of w)
                if (Math.abs(v.x - L.x) < u) {
                  f.push({ x: L.x, active: !0 })
                  break
                }
            }
          return f
        })
      return (c, _) =>
        De(o) && De(s)
          ? ($(),
            j('svg', vx, [
              I(' Horizontal alignment lines '),
              ($(!0),
              j(
                pe,
                null,
                ke(
                  l.value,
                  (f, m) => (
                    $(),
                    j(
                      'line',
                      {
                        key: `h-${m}`,
                        x1: 0,
                        y1: f.y,
                        x2: t.value,
                        y2: f.y,
                        class: te(['alignment-line horizontal', { active: f.active }])
                      },
                      null,
                      10,
                      yx
                    )
                  )
                ),
                128
                /* KEYED_FRAGMENT */
              )),
              I(' Vertical alignment lines '),
              ($(!0),
              j(
                pe,
                null,
                ke(
                  d.value,
                  (f, m) => (
                    $(),
                    j(
                      'line',
                      {
                        key: `v-${m}`,
                        x1: f.x,
                        y1: 0,
                        x2: f.x,
                        y2: i.value,
                        class: te(['alignment-line vertical', { active: f.active }])
                      },
                      null,
                      10,
                      gx
                    )
                  )
                ),
                128
                /* KEYED_FRAGMENT */
              ))
            ]))
          : I('v-if', !0)
    }
  }),
  bx = /* @__PURE__ */ ue(Mx, [['__scopeId', 'data-v-62273701']]),
  Yx = {
    enabled: !0,
    snapToGrid: !0,
    gridSize: 15,
    snapThreshold: 10,
    showAlignmentLines: !0
  }
function Pa(e = {}) {
  const a = { ...Yx, ...e }
  return {
    id: 'snap',
    name: 'Snap',
    version: '1.0.0',
    description: 'Enables grid snapping and alignment lines',
    component: a.showAlignmentLines ? Ja(bx) : void 0,
    componentProps: {
      snapThreshold: a.snapThreshold
    },
    install(n) {
      a.enabled && console.log('[Snap Plugin] Installed with options:', a, n)
    }
  }
}
const wx = {
  enabled: !0,
  delete: !0,
  backspace: !0,
  ctrlZ: !0,
  ctrlY: !0,
  escape: !0
}
function Og(e = {}) {
  const a = { ...wx, ...e }
  return {
    id: 'keyboard',
    name: 'Keyboard',
    install(n) {
      console.log('Keyboard plugin installed', a)
    }
  }
}
const xx = {
  enabled: !0,
  fileName: 'flow-chart',
  exportImage: !0,
  exportJson: !0,
  imageType: 'png',
  imageQuality: 1,
  pixelRatio: 2,
  backgroundColor: '#ffffff'
}
function Lx(e, a) {
  return a == null ? {} : a instanceof HTMLElement ? { container: a } : { ...a }
}
function kx(e, a) {
  return {
    imageType: a.imageType ?? e.imageType,
    imageQuality: a.imageQuality ?? e.imageQuality,
    pixelRatio: a.pixelRatio ?? e.pixelRatio,
    backgroundColor: a.backgroundColor ?? e.backgroundColor
  }
}
function Ba(e = {}) {
  const a = { ...xx, ...e }
  return {
    id: 'export',
    name: 'Export',
    version: '1.0.0',
    description: 'Provides methods to export the flow chart as JSON or Image',
    install(n) {
      a.enabled &&
        (a.exportJson &&
          (n.exportJson = () =>
            JSON.stringify(
              {
                nodes: n.nodes.value,
                edges: n.edges.value,
                viewport: n.viewport.value
              },
              null,
              2
            )),
        a.exportImage &&
          (n.exportImage = async (r) => {
            var _
            const o = Lx(a, r),
              s = o.container ?? n.$el
            if (!s) throw new Error('[Export Plugin] No element found for export')
            const t = o.mode ?? 'viewport',
              i = o.download !== !1,
              u = o.copyToClipboard === !0,
              l = o.fileName ?? a.fileName,
              d = o.fullModePadding ?? 20
            let c = null
            try {
              t === 'full' &&
                ((c = { ...n.getViewport() }),
                (_ = n.fitView) == null || _.call(n, { padding: d }),
                await I1())
              const f = kx(a, o),
                m = await ww(s, f)
              return (i && xw(m.dataUrl, l, m.extension), u && (await Lw(m.blob)), m)
            } finally {
              c && n.setViewport(c)
            }
          }))
    }
  }
}
const Sx = {
  enabled: !0,
  type: 'dagre',
  direction: 'TB',
  nodeSpacing: 50,
  rankSpacing: 80,
  animate: !0,
  elkOptions: {},
  forceOptions: {},
  gridOptions: { columns: 4 },
  useWebWorker: !1,
  workerUrl: ''
}
async function Dx(e, a, n) {
  const r = await Promise.resolve().then(() => NR),
    o = r.default || r,
    s = r.graphlib || o.graphlib,
    t = new s.Graph()
  return (
    t.setGraph({
      rankdir: n.direction,
      nodesep: n.nodeSpacing,
      ranksep: n.rankSpacing,
      marginx: 0,
      marginy: 0
    }),
    t.setDefaultEdgeLabel(() => ({})),
    e.forEach((u) => {
      t.setNode(u.id, {
        width: u.width || 150,
        height: u.height || 50
      })
    }),
    a.forEach((u) => {
      t.setEdge(u.source, u.target)
    }),
    o.layout(t),
    {
      nodes: e.map((u) => {
        const l = t.node(u.id)
        return l
          ? {
              ...u,
              position: {
                x: l.x - (u.width || 150) / 2,
                y: l.y - (u.height || 50) / 2
              }
            }
          : u
      }),
      edges: a
    }
  )
}
async function Ex(e, a, n) {
  const r = 'elkjs/lib/elk.bundled.js',
    o = 'elkjs'
  let s
  try {
    s = await import(
      /* @vite-ignore */
      r
    )
  } catch {
    s = await import(
      /* @vite-ignore */
      o
    )
  }
  const t = s.default || s,
    i = new t(),
    u = {
      TB: 'DOWN',
      BT: 'UP',
      LR: 'RIGHT',
      RL: 'LEFT'
    },
    l = n.elkOptions || {},
    d = {
      id: 'root',
      layoutOptions: {
        'elk.algorithm': l.algorithm || 'layered',
        'elk.direction': l.direction || u[n.direction] || 'DOWN',
        'elk.spacing.nodeNode': l.spacing || n.nodeSpacing,
        'elk.edgeRouting': l.edgeRouting || 'POLYLINE'
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
    },
    c = await i.layout(d)
  return {
    nodes: e.map((f) => {
      var h
      const m = (h = c.children) == null ? void 0 : h.find((y) => y.id === f.id)
      return m
        ? {
            ...f,
            position: {
              x: m.x || 0,
              y: m.y || 0
            }
          }
        : f
    }),
    edges: a
  }
}
async function Tx(e, a, n, r) {
  const s = await import('d3-force'),
    t = s.default || s,
    i = e.map((h) => ({
      id: h.id,
      x: h.position.x,
      y: h.position.y
    })),
    u = t.forceSimulation(i),
    l = n.forceOptions || {}
  u.force('charge', t.forceManyBody().strength(l.strength || -300))
  const d = t.forceLink()
  ;(d.id((h) => h.id),
    d.distance(l.distance || 100),
    u.force('link', d),
    u.force('collision', t.forceCollide().radius(50)),
    u.force('center', t.forceCenter(400, 300)))
  const f = l.iterations || 300,
    m = Math.max(1, Math.floor(f / 10))
  return new Promise((h) => {
    let y = 0
    const p = () => {
      const v = Math.min(m, f - y)
      for (let D = 0; D < v; D++) u.tick()
      y += v
      let g = 1 / 0,
        M = 1 / 0
      i.forEach((D) => {
        ;(D.x < g && (g = D.x), D.y < M && (M = D.y))
      })
      const w = g < 0 ? -g + 50 : 50,
        L = M < 0 ? -M + 50 : 50
      if (
        (n.animate &&
          r &&
          i.forEach((D) => {
            r.updateNode(D.id, {
              position: { x: D.x + w, y: D.y + L }
            })
          }),
        y < f && u.alpha() > 5e-3)
      )
        typeof window < 'u' && window.requestAnimationFrame
          ? window.requestAnimationFrame(p)
          : setTimeout(p, 0)
      else {
        u.stop()
        const D = e.map((Y) => {
          const E = i.find((k) => k.id === Y.id)
          return E
            ? {
                ...Y,
                position: { x: E.x + w, y: E.y + L }
              }
            : Y
        })
        h({ nodes: D, edges: a })
      }
    }
    p()
  })
}
function $x(e, a, n) {
  var d, c
  const r = n.gridOptions || {},
    o = r.columns || 4,
    s = r.startX || 50,
    t = r.startY || 50,
    i = n.nodeSpacing + (((d = e[0]) == null ? void 0 : d.width) || 150),
    u = n.rankSpacing + (((c = e[0]) == null ? void 0 : c.height) || 50)
  return {
    nodes: e.map((_, f) => {
      const m = f % o,
        h = Math.floor(f / o)
      return {
        ..._,
        position: {
          x: s + m * i,
          y: t + h * u
        }
      }
    }),
    edges: a
  }
}
function Na(e = {}) {
  const a = { ...Sx, ...e }
  return {
    id: 'layout',
    name: 'Layout',
    version: '1.0.0',
    description: 'Provides automatic layout algorithms for flow charts (dagre, elk, force)',
    install(n) {
      a.enabled &&
        (n.applyLayout = async (r) => {
          const o = { ...a, ...r },
            s = [...n.nodes.value],
            t = [...n.edges.value]
          try {
            let i
            if (o.type === 'dagre')
              ((i = await Dx(s, t, o)),
                console.log('[Layout Plugin] Dagre layout applied successfully'))
            else if (o.type === 'elk')
              ((i = await Ex(s, t, o)),
                console.log('[Layout Plugin] ELK layout applied successfully'))
            else if (o.type === 'force')
              ((i = await Tx(s, t, o, n)),
                console.log('[Layout Plugin] Force layout applied asynchronously'))
            else if (o.type === 'grid')
              ((i = $x(s, t, o)), console.log('[Layout Plugin] Grid layout applied successfully'))
            else {
              console.warn(`[Layout Plugin] Unknown layout type '${o.type}'`)
              return
            }
            ;(i.nodes.forEach((u) => {
              n.updateNode(u.id, {
                position: {
                  x: u.position.x,
                  y: u.position.y
                }
              })
            }),
              o.animate &&
                setTimeout(() => {
                  var u
                  ;(u = n.fitView) == null || u.call(n, { padding: 50 })
                }, 100))
          } catch (i) {
            console.error('[Layout Plugin] Layout calculation failed:', i)
          }
        })
    }
  }
}
const Hx = {
  enabled: !0,
  groupNodeType: 'group',
  paddingX: 40,
  paddingY: 50,
  groupIdPrefix: 'group',
  collapseMode: 'hide'
}
function jx(e, a, n) {
  if (e.length === 0) return { x: 0, y: 0, width: 200, height: 150 }
  let r = 1 / 0,
    o = 1 / 0,
    s = -1 / 0,
    t = -1 / 0
  return (
    e.forEach((i) => {
      const u = i.width || 150,
        l = i.height || 50
      ;((r = Math.min(r, i.position.x)),
        (o = Math.min(o, i.position.y)),
        (s = Math.max(s, i.position.x + u)),
        (t = Math.max(t, i.position.y + l)))
    }),
    {
      x: r - a,
      y: o - n,
      width: s - r + a * 2,
      height: t - o + n * 2
    }
  )
}
function Cx(e, a) {
  let n = 1
  for (; a.includes(`${e}-${n}`); ) n++
  return `${e}-${n}`
}
function zg(e = {}) {
  const a = { ...Hx, ...e },
    n = /* @__PURE__ */ new Map()
  return {
    id: 'node-group',
    name: 'NodeGroup',
    version: '1.0.0',
    description: 'Enable node grouping, sub-flow nesting and collapse/expand features',
    install(r) {
      a.enabled &&
        ((r.groupSelectedNodes = (o = 'Group') => {
          const s = r.nodes.value.filter((c) => c.selected && c.type !== a.groupNodeType)
          if (s.length < 2)
            return (console.warn('[NodeGroup] Please select at least 2 nodes to group'), null)
          const t = r.nodes.value.map((c) => c.id),
            i = Cx(a.groupIdPrefix, t),
            u = jx(s, a.paddingX, a.paddingY),
            l = {}
          s.forEach((c) => {
            l[c.id] = { x: c.position.x, y: c.position.y }
          })
          const d = {
            id: i,
            type: a.groupNodeType,
            position: { x: u.x, y: u.y },
            data: {
              label: o,
              style: { backgroundColor: 'rgba(241, 245, 249, 0.8)' }
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
          }
          return (
            r.addNode(d),
            s.forEach((c) => {
              r.updateNode(c.id, {
                parentId: i,
                extent: 'parent',
                position: {
                  x: c.position.x - u.x,
                  y: c.position.y - u.y
                },
                selected: !1
              })
            }),
            n.set(i, {
              groupId: i,
              childIds: s.map((c) => c.id),
              collapsed: !1,
              originalPositions: l
            }),
            console.log(`[NodeGroup] Created group "${i}" with ${s.length} nodes`),
            i
          )
        }),
        (r.ungroupNodes = (o) => {
          const s = r.getNode(o)
          if (!s) {
            console.warn(`[NodeGroup] Group "${o}" not found`)
            return
          }
          const t = n.get(o),
            i = s.position
          ;(r.nodes.value
            .filter((l) => l.parentId === o)
            .forEach((l) => {
              const d = (t == null ? void 0 : t.originalPositions[l.id]) ?? {
                x: i.x + l.position.x,
                y: i.y + l.position.y
              }
              r.updateNode(l.id, {
                parentId: void 0,
                extent: void 0,
                position: d
              })
            }),
            r.removeNode(o),
            n.delete(o),
            console.log(`[NodeGroup] Ungrouped "${o}"`))
        }),
        (r.toggleGroupCollapse = (o) => {
          const s = n.get(o)
          if (!s) {
            console.warn(`[NodeGroup] Group "${o}" not found in registry`)
            return
          }
          s.collapsed = !s.collapsed
          const t = s.collapsed
          if (
            (s.childIds.forEach((i) => {
              r.updateNode(i, { hidden: t })
            }),
            r.edges.value.forEach((i) => {
              const u = s.childIds.includes(i.source),
                l = s.childIds.includes(i.target)
              ;(u || l) && r.updateEdge(i.id, { hidden: t })
            }),
            t)
          )
            r.updateNode(o, {
              style: { width: 160, height: 50, minWidth: 160, minHeight: 50 },
              width: 160,
              height: 50
            })
          else {
            const i = r.getNode(o)
            if (i) {
              const u = i.data._origWidth,
                l = i.data._origHeight
              r.updateNode(o, {
                style: {
                  width: u || 200,
                  height: l || 150,
                  minWidth: u || 200,
                  minHeight: l || 150
                },
                width: u || 200,
                height: l || 150
              })
            }
          }
          console.log(`[NodeGroup] Group "${o}" ${t ? 'collapsed' : 'expanded'}`)
        }),
        (r.isGroupCollapsed = (o) => {
          var s
          return ((s = n.get(o)) == null ? void 0 : s.collapsed) ?? !1
        }),
        (r.getGroupChildren = (o) => r.nodes.value.filter((s) => s.parentId === o)),
        (r.getGroupRegistry = () => n))
    },
    destroy() {
      n.clear()
    }
  }
}
const Ax = {
  enabled: !0,
  maxHistory: 100,
  enableKeyboard: !0,
  onHistoryChange: () => {},
  autoCapture: !1
}
function tt(e) {
  return JSON.parse(JSON.stringify(e))
}
function Gg(e = {}) {
  const a = { ...Ax, ...e },
    n = ee([]),
    r = ee(-1),
    o = J(() => r.value > 0),
    s = J(() => r.value < n.value.length - 1),
    t = J(() => n.value.length)
  let i = null,
    u = null
  const l = () => {
      a.onHistoryChange(o.value, s.value, n.value.length)
    },
    d = (p) => {
      if (!i) return
      const v = n.value.slice(0, r.value + 1)
      ;(v.push({
        nodes: tt(i.nodes.value),
        edges: tt(i.edges.value),
        timestamp: Date.now(),
        description: p
      }),
        v.length > a.maxHistory && v.shift(),
        (n.value = v),
        (r.value = v.length - 1),
        l())
    },
    c = () => {
      if (!i || !o.value) return
      r.value--
      const p = n.value[r.value]
      ;(p && ((i.nodes.value = tt(p.nodes)), (i.edges.value = tt(p.edges))), l())
    },
    _ = () => {
      if (!i || !s.value) return
      r.value++
      const p = n.value[r.value]
      ;(p && ((i.nodes.value = tt(p.nodes)), (i.edges.value = tt(p.edges))), l())
    },
    f = () => {
      ;((n.value = []), (r.value = -1), l())
    },
    m = () => n.value,
    h = (p) => {
      if (!i || p < 0 || p >= n.value.length) return
      r.value = p
      const v = n.value[p]
      ;(v && ((i.nodes.value = tt(v.nodes)), (i.edges.value = tt(v.edges))), l())
    }
  return {
    id: 'history',
    name: 'History',
    version: '1.0.0',
    description: 'Provides undo/redo history for flow graph with keyboard shortcut support',
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
      a.enabled &&
        ((i = p),
        (p.undo = c),
        (p.redo = _),
        (p.saveSnapshot = d),
        (p.canUndo = o),
        (p.canRedo = s),
        (p.historyLength = t),
        (p.clearHistory = f),
        (p.getHistory = m),
        (p.jumpToStep = h),
        d('initial'),
        a.enableKeyboard &&
          ((u = (v) => {
            ;(v.ctrlKey || v.metaKey) &&
              (v.key === 'z' && !v.shiftKey
                ? (v.preventDefault(), c())
                : (v.key === 'y' || (v.key === 'z' && v.shiftKey)) && (v.preventDefault(), _()))
          }),
          window.addEventListener('keydown', u)),
        console.log('[History Plugin] Installed — Ctrl+Z to undo, Ctrl+Y to redo'))
    },
    destroy() {
      ;(u && (window.removeEventListener('keydown', u), (u = null)),
        (i = null),
        (n.value = []),
        (r.value = -1))
    }
  }
}
class qx {
  constructor() {
    ye(this, 'plugins', /* @__PURE__ */ new Map())
    ye(this, 'flowInstance', null)
  }
  /**
   * 初始化插件管理器
   */
  init(a) {
    this.flowInstance = a
  }
  /**
   * 注册插件
   */
  register(a, n) {
    if (this.plugins.has(a.id)) {
      console.warn(`[YhFlow] Plugin ${a.id} is already registered, skipping...`)
      return
    }
    const r = this.flowInstance || n
    if (!r) {
      console.error(
        '[YhFlow] PluginManager not initialized, call init() first or provide flow instance'
      )
      return
    }
    ;(a.install(r, n),
      this.plugins.set(a.id, a),
      console.log(`[YhFlow] Plugin ${a.name} (${a.id}) registered`))
  }
  /**
   * 卸载插件
   */
  unregister(a) {
    const n = this.plugins.get(a)
    if (!n) {
      console.warn(`[YhFlow] Plugin ${a} not found`)
      return
    }
    ;(n.destroy && n.destroy(),
      this.plugins.delete(a),
      console.log(`[YhFlow] Plugin ${n.name} (${a}) unregistered`))
  }
  /**
   * 获取已注册的插件
   */
  getPlugin(a) {
    return this.plugins.get(a)
  }
  /**
   * 获取所有插件
   */
  getPlugins() {
    return Array.from(this.plugins.values())
  }
  /**
   * 检查插件是否已注册
   */
  hasPlugin(a) {
    return this.plugins.has(a)
  }
  /**
   * 销毁所有插件
   */
  destroyAll() {
    ;(this.plugins.forEach((a) => {
      a.destroy && a.destroy()
    }),
      this.plugins.clear())
  }
}
function G4(e, a) {
  return {
    id: e.id,
    name: e.name,
    version: e.version,
    description: e.description,
    enabled: e.enabled ?? !0,
    install: (n) => {
      e.enabled !== !1 && a(n, e)
    }
  }
}
function J4(e, a) {
  const n = e.install
  return {
    ...e,
    install: (r, o) => {
      var s
      ;(n(r, o),
        (s = a.onInit) == null || s.call(a),
        a.onViewportChange &&
          r.on('viewport:change', (t) => {
            var i
            return (i = a.onViewportChange) == null ? void 0 : i.call(a, t.transform)
          }),
        a.onNodesChange &&
          r.on('node:selected', () => {
            var t
            return (t = a.onNodesChange) == null ? void 0 : t.call(a, r.nodes.value)
          }),
        a.onEdgesChange &&
          r.on('edge:selected', () => {
            var t
            return (t = a.onEdgesChange) == null ? void 0 : t.call(a, r.edges.value)
          }))
    },
    destroy: () => {
      var r, o
      ;((r = a.onDestroy) == null || r.call(a), (o = e.destroy) == null || o.call(e))
    }
  }
}
const U4 = {
  minimap: Fa,
  controls: Ra,
  grid: Ia,
  snap: Pa,
  keyboard: Og,
  export: Ba,
  layout: Na,
  history: Gg,
  nodeGroup: zg
}
function W4(e) {
  return [
    Fa(e == null ? void 0 : e.minimap),
    Ra(e == null ? void 0 : e.controls),
    Ia(e == null ? void 0 : e.grid),
    Pa(e == null ? void 0 : e.snap),
    Og(e == null ? void 0 : e.keyboard),
    Ba(e == null ? void 0 : e.export),
    Na(e == null ? void 0 : e.layout),
    Gg(e == null ? void 0 : e.history),
    zg(e == null ? void 0 : e.nodeGroup)
  ].filter(Boolean)
}
const V4 = {
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
      default: 'default'
    },
    /**
     * @description 默认连线类型
     */
    defaultEdgeType: {
      type: String,
      default: 'bezier'
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
      default: 'Shift'
    },
    /**
     * @description 背景类型
     */
    background: {
      type: String,
      default: 'dots'
    },
    /**
     * @description 背景颜色
     */
    backgroundColor: {
      type: String,
      default: '#f8f9fa'
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
      default: '#b1b1b7'
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
  },
  K4 = {
    'update:modelValue': (e) =>
      typeof e.x == 'number' && typeof e.y == 'number' && typeof e.zoom == 'number',
    'update:nodes': (e) => Array.isArray(e),
    'update:edges': (e) => Array.isArray(e),
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
  },
  Fx = ['data-handle-id', 'data-handle-type', 'data-handle-position'],
  Rx = /* @__PURE__ */ ie({
    __name: 'BaseNode',
    props: {
      id: {},
      type: {},
      data: {},
      selected: { type: Boolean, default: !1 },
      dragging: { type: Boolean, default: !1 },
      connectable: { type: Boolean, default: !0 },
      style: { default: () => ({}) },
      handles: {
        default: () => [
          { type: 'source', position: 'right', isConnectable: !0 },
          { type: 'target', position: 'left', isConnectable: !0 }
        ]
      },
      label: { default: '' },
      labelColor: { default: '' },
      descriptionColor: { default: '' }
    },
    setup(e) {
      const a = e,
        n = J(() => {
          const o = {
            padding: 'var(--flow-node-padding, 10px)',
            borderRadius: 'var(--flow-node-border-radius, 8px)',
            border: '1px solid var(--flow-node-border, #dcdfe6)',
            backgroundColor: 'var(--flow-node-background, #fff)',
            minWidth: '100px',
            textAlign: 'center',
            transition: 'all 0.2s'
          }
          return (
            a.selected &&
              ((o.border = '2px solid var(--flow-node-selected-border, #409eff)'),
              (o.boxShadow = 'var(--flow-node-selected-shadow, 0 0 8px rgba(64, 158, 255, 0.4))')),
            a.dragging &&
              ((o.opacity = 'var(--flow-node-dragging-opacity, 0.8)'), (o.cursor = 'grabbing')),
            { ...o, ...a.style }
          )
        })
      function r(o) {
        const s = {
          width: 'var(--flow-handle-size, 12px)',
          height: 'var(--flow-handle-size, 12px)',
          backgroundColor: 'var(--flow-handle-background, #fff)',
          border: '2px solid var(--flow-handle-border, #409eff)',
          borderRadius: 'var(--flow-handle-border-radius, 50%)',
          cursor: 'crosshair'
        }
        return (o.style && Object.assign(s, o.style), s)
      }
      return (o, s) => {
        var t, i, u, l
        return (
          $(),
          j(
            'div',
            {
              class: te(['flow-base-node', { selected: e.selected, dragging: e.dragging }]),
              style: re(n.value)
            },
            [
              b(
                'div',
                {
                  class: 'flow-node-label',
                  style: re({
                    color:
                      e.labelColor ||
                      ((t = e.data) == null ? void 0 : t.labelColor) ||
                      'var(--flow-node-label-color, #303133)'
                  })
                },
                ae(e.label || ((i = e.data) == null ? void 0 : i.label) || e.type),
                5
                /* TEXT, STYLE */
              ),
              (u = e.data) != null && u.description
                ? ($(),
                  j(
                    'div',
                    {
                      key: 0,
                      class: 'flow-node-description',
                      style: re({
                        color:
                          e.descriptionColor ||
                          ((l = e.data) == null ? void 0 : l.descriptionColor) ||
                          'var(--flow-node-description-color, #909399)'
                      })
                    },
                    ae(e.data.description),
                    5
                    /* TEXT, STYLE */
                  ))
                : I('v-if', !0),
              ($(!0),
              j(
                pe,
                null,
                ke(
                  e.handles,
                  (d) => (
                    $(),
                    j(
                      pe,
                      {
                        key: `${d.type}-${d.position}`
                      },
                      [
                        d.isConnectable !== !1 && e.connectable
                          ? ($(),
                            j(
                              'div',
                              {
                                key: 0,
                                class: te([
                                  'flow-handle',
                                  [`flow-handle-${d.type}`, `flow-handle-position-${d.position}`]
                                ]),
                                style: re(r(d)),
                                'data-handle-id': d.id,
                                'data-handle-type': d.type,
                                'data-handle-position': d.position
                              },
                              null,
                              14,
                              Fx
                            ))
                          : I('v-if', !0)
                      ],
                      64
                      /* STABLE_FRAGMENT */
                    )
                  )
                ),
                128
                /* KEYED_FRAGMENT */
              ))
            ],
            6
            /* CLASS, STYLE */
          )
        )
      }
    }
  }),
  X4 = /* @__PURE__ */ ue(Rx, [['__scopeId', 'data-v-0e414c90']]),
  Ix = {
    key: 1,
    class: 'flow-handle-right',
    'data-handle-type': 'source',
    'data-handle-position': 'right'
  },
  Px = /* @__PURE__ */ ie({
    __name: 'InputNode',
    props: {
      id: {},
      type: {},
      data: {},
      selected: { type: Boolean, default: !1 },
      dragging: { type: Boolean, default: !1 },
      connectable: { type: Boolean, default: !0 },
      style: { default: () => ({}) },
      label: { default: '' },
      labelColor: { default: '' },
      descriptionColor: { default: '' }
    },
    setup(e) {
      const a = e,
        n = J(() => {
          const r = {
            padding: '10px 15px',
            borderRadius: '4px 4px 12px 4px',
            border: '1px solid #67c23a',
            backgroundColor: '#f0f9ff',
            minWidth: '80px',
            textAlign: 'center',
            transition: 'all 0.2s'
          }
          return (
            a.selected &&
              ((r.border = '2px solid #67c23a'), (r.boxShadow = '0 0 8px rgba(103, 194, 58, 0.4)')),
            { ...r, ...a.style }
          )
        })
      return (r, o) => {
        var s, t, i, u
        return (
          $(),
          j(
            'div',
            {
              class: te(['flow-input-node', { selected: e.selected, dragging: e.dragging }]),
              style: re(n.value)
            },
            [
              b(
                'div',
                {
                  class: 'flow-node-label',
                  style: re({
                    color: e.labelColor || ((s = e.data) == null ? void 0 : s.labelColor) || '#000'
                  })
                },
                ae(e.label || ((t = e.data) == null ? void 0 : t.label) || 'Input'),
                5
                /* TEXT, STYLE */
              ),
              (i = e.data) != null && i.description
                ? ($(),
                  j(
                    'div',
                    {
                      key: 0,
                      class: 'flow-node-description',
                      style: re({
                        color:
                          e.descriptionColor ||
                          ((u = e.data) == null ? void 0 : u.descriptionColor) ||
                          'var(--flow-node-description-color, #909399)'
                      })
                    },
                    ae(e.data.description),
                    5
                    /* TEXT, STYLE */
                  ))
                : I('v-if', !0),
              e.connectable ? ($(), j('div', Ix)) : I('v-if', !0)
            ],
            6
            /* CLASS, STYLE */
          )
        )
      }
    }
  }),
  Z4 = /* @__PURE__ */ ue(Px, [['__scopeId', 'data-v-4d9f5f86']]),
  Bx = {
    key: 0,
    class: 'flow-handle-left',
    'data-handle-type': 'target',
    'data-handle-position': 'left'
  },
  Nx = /* @__PURE__ */ ie({
    __name: 'OutputNode',
    props: {
      id: {},
      type: {},
      data: {},
      selected: { type: Boolean, default: !1 },
      dragging: { type: Boolean, default: !1 },
      connectable: { type: Boolean, default: !0 },
      style: { default: () => ({}) },
      label: { default: '' },
      labelColor: { default: '' }
    },
    setup(e) {
      const a = e,
        n = J(() => {
          const r = {
            padding: '10px 15px',
            borderRadius: '12px 4px 4px 4px',
            border: '1px solid #e6a23c',
            backgroundColor: '#fff7e6',
            minWidth: '80px',
            textAlign: 'center',
            transition: 'all 0.2s'
          }
          return (
            a.selected &&
              ((r.border = '2px solid #e6a23c'), (r.boxShadow = '0 0 8px rgba(230, 162, 60, 0.4)')),
            { ...r, ...a.style }
          )
        })
      return (r, o) => {
        var s, t
        return (
          $(),
          j(
            'div',
            {
              class: te(['flow-output-node', { selected: e.selected, dragging: e.dragging }]),
              style: re(n.value)
            },
            [
              e.connectable ? ($(), j('div', Bx)) : I('v-if', !0),
              b(
                'div',
                {
                  class: 'flow-node-label',
                  style: re({
                    color: e.labelColor || ((s = e.data) == null ? void 0 : s.labelColor) || '#000'
                  })
                },
                ae(e.label || ((t = e.data) == null ? void 0 : t.label) || 'Output'),
                5
                /* TEXT, STYLE */
              )
            ],
            6
            /* CLASS, STYLE */
          )
        )
      }
    }
  }),
  Q4 = /* @__PURE__ */ ue(Nx, [['__scopeId', 'data-v-e88ba761']]),
  Ox = { class: 'flow-group-header' },
  zx = { class: 'flow-group-label' },
  Gx = { class: 'flow-group-content' },
  Jx = /* @__PURE__ */ ie({
    __name: 'GroupNode',
    props: {
      id: {},
      type: {},
      data: {},
      selected: { type: Boolean, default: !1 },
      dragging: { type: Boolean, default: !1 },
      connectable: { type: Boolean, default: !1 },
      style: { default: () => ({}) },
      label: { default: '' },
      expanded: { type: Boolean, default: !0 }
    },
    setup(e) {
      const a = e,
        n = J(() => {
          const r = {
            padding: '15px',
            borderRadius: '8px',
            border: '2px dashed #909399',
            backgroundColor: '#f5f7fa',
            minWidth: '200px',
            minHeight: '150px',
            transition: 'all 0.2s'
          }
          return (a.selected && (r.border = '2px solid #409eff'), { ...r, ...a.style })
        })
      return (r, o) => {
        var s
        return (
          $(),
          j(
            'div',
            {
              class: te([
                'flow-group-node',
                { selected: e.selected, dragging: e.dragging, expanded: e.expanded }
              ]),
              style: re(n.value)
            },
            [
              b('div', Ox, [
                b(
                  'span',
                  zx,
                  ae(e.label || ((s = e.data) == null ? void 0 : s.label) || 'Group'),
                  1
                  /* TEXT */
                )
              ]),
              b('div', Gx, [it(r.$slots, 'default', {}, void 0, !0)])
            ],
            6
            /* CLASS, STYLE */
          )
        )
      }
    }
  }),
  eI = /* @__PURE__ */ ue(Jx, [['__scopeId', 'data-v-a90e1ebc']]),
  Ux = /* @__PURE__ */ ie({
    __name: 'CustomNode',
    props: {
      id: {},
      type: {},
      data: {},
      selected: { type: Boolean, default: !1 },
      dragging: { type: Boolean, default: !1 },
      connectable: { type: Boolean, default: !0 },
      style: { default: () => ({}) },
      label: { default: '' }
    },
    setup(e) {
      const a = e,
        n = J(() => {
          const r = {
            padding: '12px',
            borderRadius: '8px',
            border: '1px solid #dcdfe6',
            backgroundColor: '#ffffff',
            minWidth: '120px',
            transition: 'all 0.2s'
          }
          return (
            a.selected &&
              ((r.border = '2px solid #409eff'), (r.boxShadow = '0 0 8px rgba(64, 158, 255, 0.4)')),
            a.dragging && (r.opacity = '0.8'),
            { ...r, ...a.style }
          )
        })
      return (r, o) => (
        $(),
        j(
          'div',
          {
            class: te(['flow-custom-node', { selected: e.selected, dragging: e.dragging }]),
            style: re(n.value)
          },
          [
            it(
              r.$slots,
              'default',
              {
                node: { id: e.id, type: e.type, data: e.data, selected: e.selected }
              },
              void 0,
              !0
            )
          ],
          6
          /* CLASS, STYLE */
        )
      )
    }
  }),
  tI = /* @__PURE__ */ ue(Ux, [['__scopeId', 'data-v-6e55f6d4']]),
  Wx = ['onMousedown'],
  Vx = /* @__PURE__ */ ie({
    __name: 'NodeResizer',
    props: {
      nodeId: {},
      selected: { type: Boolean },
      minWidth: {},
      minHeight: {},
      keepAspectRatio: { type: Boolean }
    },
    emits: ['resize', 'resizeStart', 'resizeEnd'],
    setup(e, { emit: a }) {
      const n = e,
        r = At(),
        o = a,
        s = J(() => n.selected),
        t = ['n', 's', 'e', 'w', 'ne', 'nw', 'se', 'sw']
      let i = 0,
        u = 0,
        l = 0,
        d = 0,
        c = 0,
        _ = 0,
        f = ''
      const m = (p, v) => {
          ;(p.preventDefault(),
            (i = p.clientX),
            (u = p.clientY),
            (l = p.clientX),
            (d = p.clientY),
            (f = v))
          const g = document.getElementById(`node-${n.nodeId}`)
          g &&
            ((c = g.offsetWidth),
            (_ = g.offsetHeight),
            o('resizeStart', p),
            document.addEventListener('mousemove', h),
            document.addEventListener('mouseup', y))
        },
        h = (p) => {
          const v = r.viewport.value.zoom || 1,
            g = (p.clientX - i) / v,
            M = (p.clientY - u) / v,
            w = (p.clientX - l) / v,
            L = (p.clientY - d) / v
          ;((l = p.clientX), (d = p.clientY))
          let D = c,
            Y = _,
            E = 0,
            k = 0
          ;(f.includes('e') && (D = c + g),
            f.includes('w') && ((D = c - g), (E = w)),
            f.includes('s') && (Y = _ + M),
            f.includes('n') && ((Y = _ - M), (k = L)),
            (D = Math.max(D, n.minWidth || 50)),
            (Y = Math.max(Y, n.minHeight || 30)),
            o('resize', { width: D, height: Y, x: E, y: k }))
        },
        y = (p) => {
          ;(o('resizeEnd', p),
            document.removeEventListener('mousemove', h),
            document.removeEventListener('mouseup', y))
        }
      return (p, v) =>
        s.value
          ? ($(),
            j(
              'div',
              {
                key: 0,
                class: 'yh-flow-node-resizer',
                onMousedown: v[1] || (v[1] = we(() => {}, ['stop'])),
                onClick: v[2] || (v[2] = we(() => {}, ['stop']))
              },
              [
                ($(),
                j(
                  pe,
                  null,
                  ke(t, (g) =>
                    b(
                      'div',
                      {
                        key: g,
                        class: te(['resizer-handle', `handle-${g}`]),
                        onMousedown: we((M) => m(M, g), ['stop']),
                        onClick: v[0] || (v[0] = we(() => {}, ['stop']))
                      },
                      null,
                      42,
                      Wx
                    )
                  ),
                  64
                  /* STABLE_FRAGMENT */
                ))
              ],
              32
              /* NEED_HYDRATION */
            ))
          : I('v-if', !0)
    }
  }),
  rI = /* @__PURE__ */ ue(Vx, [['__scopeId', 'data-v-db242594']]),
  Kx = { class: 'default-toolbar' },
  Xx = /* @__PURE__ */ ie({
    __name: 'NodeToolbar',
    props: {
      nodeId: {},
      selected: { type: Boolean },
      position: { default: 'top' },
      offset: { default: 10 },
      teleportTo: { default: 'body' }
    },
    emits: ['delete', 'copy'],
    setup(e, { expose: a, emit: n }) {
      const r = e,
        o = n,
        s = ee(),
        t = J(() => r.selected),
        i = ee({
          position: 'absolute',
          top: '0px',
          left: '0px',
          zIndex: 99999,
          transform: ''
        }),
        u = J(() => r.teleportTo)
      let l = 0
      const d = () => {
        if (!t.value) return
        const c = document.getElementById(`node-${r.nodeId}`)
        if (!c) {
          l = requestAnimationFrame(d)
          return
        }
        const _ = c.getBoundingClientRect(),
          f = window.scrollX,
          m = window.scrollY
        let h = 0,
          y = 0
        ;(r.position === 'top'
          ? ((h = _.top + m - r.offset - 40), (y = _.left + f + _.width / 2))
          : r.position === 'bottom'
            ? ((h = _.bottom + m + r.offset), (y = _.left + f + _.width / 2))
            : r.position === 'left'
              ? ((h = _.top + m + _.height / 2), (y = _.left + f - r.offset - 60))
              : r.position === 'right' &&
                ((h = _.top + m + _.height / 2), (y = _.right + f + r.offset)),
          (i.value = {
            ...i.value,
            top: `${h}px`,
            left: `${y}px`,
            transform:
              r.position === 'top' || r.position === 'bottom'
                ? 'translateX(-50%)'
                : 'translateY(-50%)'
          }),
          (l = requestAnimationFrame(d)))
      }
      return (
        Le(t, (c) => {
          c ? d() : l && (cancelAnimationFrame(l), (l = 0))
        }),
        Ht(() => {
          t.value && d()
        }),
        Nd(() => {
          l && cancelAnimationFrame(l)
        }),
        a({
          updatePosition: d
        }),
        (c, _) => (
          $(),
          Ve(
            Ua,
            { to: u.value },
            [
              t.value
                ? ($(),
                  j(
                    'div',
                    {
                      key: 0,
                      ref_key: 'toolbarRef',
                      ref: s,
                      class: 'yh-flow-node-toolbar',
                      style: re(i.value),
                      onMousedown: _[2] || (_[2] = we(() => {}, ['stop'])),
                      onClick: _[3] || (_[3] = we(() => {}, ['stop']))
                    },
                    [
                      it(
                        c.$slots,
                        'default',
                        {},
                        () => [
                          I(' 默认工具栏内容 '),
                          b('div', Kx, [
                            b(
                              'button',
                              {
                                onClick: _[0] || (_[0] = (f) => o('delete'))
                              },
                              'Delete'
                            ),
                            b(
                              'button',
                              {
                                onClick: _[1] || (_[1] = (f) => o('copy'))
                              },
                              'Copy'
                            )
                          ])
                        ],
                        !0
                      )
                    ],
                    36
                    /* STYLE, NEED_HYDRATION */
                  ))
                : I('v-if', !0)
            ],
            8,
            ['to']
          )
        )
      )
    }
  }),
  nI = /* @__PURE__ */ ue(Xx, [['__scopeId', 'data-v-3fc94797']]),
  Zx = { class: 'yh-flow-node-diamond__content' },
  Qx = { class: 'yh-flow-node-diamond__label' },
  eL = {
    key: 0,
    class: 'flow-handle position-top',
    'data-handle-type': 'target',
    'data-handle-position': 'top'
  },
  tL = {
    key: 1,
    class: 'flow-handle position-bottom',
    'data-handle-type': 'source',
    'data-handle-position': 'bottom'
  },
  rL = {
    key: 2,
    class: 'flow-handle position-left',
    'data-handle-type': 'source',
    'data-handle-position': 'left'
  },
  nL = {
    key: 3,
    class: 'flow-handle position-right',
    'data-handle-type': 'source',
    'data-handle-position': 'right'
  },
  aL = /* @__PURE__ */ ie({
    __name: 'DiamondNode',
    props: {
      id: {},
      type: {},
      data: {},
      selected: { type: Boolean, default: !1 },
      dragging: { type: Boolean, default: !1 },
      connectable: { type: Boolean, default: !0 },
      style: { default: () => ({}) },
      label: { default: '' }
    },
    setup(e) {
      const a = e,
        n = J(() => ({ ...a.style }))
      return (r, o) => {
        var s, t
        return (
          $(),
          j(
            'div',
            {
              class: te(['flow-diamond-node', { selected: e.selected, dragging: e.dragging }]),
              style: re(n.value)
            },
            [
              I(' Decision Node (Diamond shape using CSS transform) '),
              b('div', Zx, [
                b(
                  'div',
                  {
                    class: 'yh-flow-node-diamond__shape',
                    style: re((s = e.data) == null ? void 0 : s.style)
                  },
                  [
                    b(
                      'span',
                      Qx,
                      ae(e.label || ((t = e.data) == null ? void 0 : t.label)),
                      1
                      /* TEXT */
                    )
                  ],
                  4
                  /* STYLE */
                ),
                I(' Handles '),
                e.connectable ? ($(), j('div', eL)) : I('v-if', !0),
                e.connectable ? ($(), j('div', tL)) : I('v-if', !0),
                e.connectable ? ($(), j('div', rL)) : I('v-if', !0),
                e.connectable ? ($(), j('div', nL)) : I('v-if', !0)
              ])
            ],
            6
            /* CLASS, STYLE */
          )
        )
      }
    }
  }),
  oL = /* @__PURE__ */ ue(aL, [['__scopeId', 'data-v-b542fb57']]),
  sL = { class: 'yh-flow-node-database__body' },
  iL = { class: 'yh-flow-node-database__label' },
  uL = {
    key: 0,
    class: 'flow-handle position-top',
    'data-handle-type': 'target',
    'data-handle-position': 'top'
  },
  lL = {
    key: 1,
    class: 'flow-handle position-bottom',
    'data-handle-type': 'source',
    'data-handle-position': 'bottom'
  },
  dL = {
    key: 2,
    class: 'flow-handle position-left',
    'data-handle-type': 'target',
    'data-handle-position': 'left'
  },
  cL = {
    key: 3,
    class: 'flow-handle position-right',
    'data-handle-type': 'source',
    'data-handle-position': 'right'
  },
  _L = /* @__PURE__ */ ie({
    __name: 'DatabaseNode',
    props: {
      id: {},
      type: {},
      data: {},
      selected: { type: Boolean, default: !1 },
      dragging: { type: Boolean, default: !1 },
      connectable: { type: Boolean, default: !0 },
      style: { default: () => ({}) },
      label: { default: '' }
    },
    setup(e) {
      const a = e,
        n = J(() => ({ ...a.style }))
      return (r, o) => {
        var s, t
        return (
          $(),
          j(
            'div',
            {
              class: te(['flow-database-node', { selected: e.selected, dragging: e.dragging }]),
              style: re(n.value)
            },
            [
              b(
                'div',
                {
                  class: 'yh-flow-node-database__content',
                  style: re((s = e.data) == null ? void 0 : s.style)
                },
                [
                  o[0] ||
                    (o[0] = b(
                      'div',
                      { class: 'yh-flow-node-database__top' },
                      null,
                      -1
                      /* CACHED */
                    )),
                  b('div', sL, [
                    b(
                      'span',
                      iL,
                      ae(e.label || ((t = e.data) == null ? void 0 : t.label)),
                      1
                      /* TEXT */
                    )
                  ]),
                  I(' Handles '),
                  e.connectable ? ($(), j('div', uL)) : I('v-if', !0),
                  e.connectable ? ($(), j('div', lL)) : I('v-if', !0),
                  e.connectable ? ($(), j('div', dL)) : I('v-if', !0),
                  e.connectable ? ($(), j('div', cL)) : I('v-if', !0)
                ],
                4
                /* STYLE */
              )
            ],
            6
            /* CLASS, STYLE */
          )
        )
      }
    }
  }),
  fL = /* @__PURE__ */ ue(_L, [['__scopeId', 'data-v-280242a4']]),
  mL = { class: 'bpmn-start-event-label' },
  pL = {
    key: 0,
    class: 'bpmn-handle bpmn-handle-source',
    'data-handle-type': 'source',
    'data-handle-position': 'right'
  },
  hL = /* @__PURE__ */ ie({
    __name: 'BpmnStartEvent',
    props: {
      id: {},
      type: {},
      data: {},
      selected: { type: Boolean, default: !1 },
      dragging: { type: Boolean, default: !1 },
      connectable: { type: Boolean, default: !0 },
      style: { default: () => ({}) },
      label: { default: '开始' }
    },
    setup(e) {
      const a = e,
        n = J(() => {
          const r = {
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            border: '2px solid #52c41a',
            backgroundColor: '#f6ffed',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'all 0.2s'
          }
          return (
            a.selected &&
              ((r.border = '3px solid #52c41a'), (r.boxShadow = '0 0 8px rgba(82, 196, 26, 0.5)')),
            { ...r, ...a.style }
          )
        })
      return (r, o) => {
        var s
        return (
          $(),
          j(
            'div',
            {
              class: te(['bpmn-start-event', { selected: e.selected, dragging: e.dragging }]),
              style: re(n.value)
            },
            [
              b(
                'span',
                mL,
                ae(e.label || ((s = e.data) == null ? void 0 : s.label) || '开始'),
                1
                /* TEXT */
              ),
              e.connectable ? ($(), j('div', pL)) : I('v-if', !0)
            ],
            6
            /* CLASS, STYLE */
          )
        )
      }
    }
  }),
  vL = /* @__PURE__ */ ue(hL, [['__scopeId', 'data-v-5881a0da']]),
  yL = { class: 'bpmn-end-event-label' },
  gL = {
    key: 0,
    class: 'bpmn-handle bpmn-handle-target',
    'data-handle-type': 'target',
    'data-handle-position': 'left'
  },
  ML = /* @__PURE__ */ ie({
    __name: 'BpmnEndEvent',
    props: {
      id: {},
      type: {},
      data: {},
      selected: { type: Boolean, default: !1 },
      dragging: { type: Boolean, default: !1 },
      connectable: { type: Boolean, default: !0 },
      style: { default: () => ({}) },
      label: { default: '结束' }
    },
    setup(e) {
      const a = e,
        n = J(() => {
          const r = {
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            border: '3px solid #ff4d4f',
            backgroundColor: '#fff2f0',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'all 0.2s'
          }
          return (
            a.selected &&
              ((r.border = '4px solid #ff4d4f'), (r.boxShadow = '0 0 8px rgba(255, 77, 79, 0.5)')),
            { ...r, ...a.style }
          )
        })
      return (r, o) => {
        var s
        return (
          $(),
          j(
            'div',
            {
              class: te(['bpmn-end-event', { selected: e.selected, dragging: e.dragging }]),
              style: re(n.value)
            },
            [
              b(
                'span',
                yL,
                ae(e.label || ((s = e.data) == null ? void 0 : s.label) || '结束'),
                1
                /* TEXT */
              ),
              e.connectable ? ($(), j('div', gL)) : I('v-if', !0)
            ],
            6
            /* CLASS, STYLE */
          )
        )
      }
    }
  }),
  bL = /* @__PURE__ */ ue(ML, [['__scopeId', 'data-v-5210e62a']]),
  YL = {
    key: 0,
    class: 'bpmn-handle bpmn-handle-target',
    'data-handle-type': 'target',
    'data-handle-position': 'left'
  },
  wL = { class: 'bpmn-task-label' },
  xL = {
    key: 1,
    class: 'bpmn-handle bpmn-handle-source',
    'data-handle-type': 'source',
    'data-handle-position': 'right'
  },
  LL = /* @__PURE__ */ ie({
    __name: 'BpmnTask',
    props: {
      id: {},
      type: {},
      data: {},
      selected: { type: Boolean, default: !1 },
      dragging: { type: Boolean, default: !1 },
      connectable: { type: Boolean, default: !0 },
      style: { default: () => ({}) },
      label: { default: '任务' }
    },
    setup(e) {
      const a = e,
        n = J(() => {
          const r = {
            padding: '10px 16px',
            minWidth: '100px',
            borderRadius: '4px',
            border: '1px solid #1890ff',
            backgroundColor: '#e6f7ff',
            textAlign: 'center',
            transition: 'all 0.2s'
          }
          return (
            a.selected &&
              ((r.border = '2px solid #1890ff'), (r.boxShadow = '0 0 8px rgba(24, 144, 255, 0.4)')),
            { ...r, ...a.style }
          )
        })
      return (r, o) => {
        var s
        return (
          $(),
          j(
            'div',
            {
              class: te(['bpmn-task', { selected: e.selected, dragging: e.dragging }]),
              style: re(n.value)
            },
            [
              e.connectable ? ($(), j('div', YL)) : I('v-if', !0),
              b(
                'span',
                wL,
                ae(e.label || ((s = e.data) == null ? void 0 : s.label) || '任务'),
                1
                /* TEXT */
              ),
              e.connectable ? ($(), j('div', xL)) : I('v-if', !0)
            ],
            6
            /* CLASS, STYLE */
          )
        )
      }
    }
  }),
  kL = /* @__PURE__ */ ue(LL, [['__scopeId', 'data-v-d1d58e1e']]),
  SL = {
    key: 0,
    class: 'bpmn-handle bpmn-handle-target',
    'data-handle-type': 'target',
    'data-handle-position': 'left'
  },
  DL = { class: 'bpmn-task-label' },
  EL = {
    key: 1,
    class: 'bpmn-handle bpmn-handle-source',
    'data-handle-type': 'source',
    'data-handle-position': 'right'
  },
  TL = /* @__PURE__ */ ie({
    __name: 'BpmnServiceTask',
    props: {
      id: {},
      type: {},
      data: {},
      selected: { type: Boolean, default: !1 },
      dragging: { type: Boolean, default: !1 },
      connectable: { type: Boolean, default: !0 },
      style: { default: () => ({}) },
      label: { default: '服务任务' }
    },
    setup(e) {
      const a = e,
        n = J(() => {
          const r = {
            padding: '10px 16px 10px 36px',
            minWidth: '100px',
            borderRadius: '4px',
            border: '1px solid #722ed1',
            backgroundColor: '#f9f0ff',
            textAlign: 'center',
            transition: 'all 0.2s'
          }
          return (
            a.selected &&
              ((r.border = '2px solid #722ed1'), (r.boxShadow = '0 0 8px rgba(114, 46, 209, 0.4)')),
            { ...r, ...a.style }
          )
        })
      return (r, o) => {
        var s
        return (
          $(),
          j(
            'div',
            {
              class: te(['bpmn-service-task', { selected: e.selected, dragging: e.dragging }]),
              style: re(n.value)
            },
            [
              e.connectable ? ($(), j('div', SL)) : I('v-if', !0),
              o[0] ||
                (o[0] = b(
                  'span',
                  {
                    class: 'bpmn-service-icon',
                    'aria-hidden': 'true'
                  },
                  '⚙',
                  -1
                  /* CACHED */
                )),
              b(
                'span',
                DL,
                ae(e.label || ((s = e.data) == null ? void 0 : s.label) || '服务任务'),
                1
                /* TEXT */
              ),
              e.connectable ? ($(), j('div', EL)) : I('v-if', !0)
            ],
            6
            /* CLASS, STYLE */
          )
        )
      }
    }
  }),
  $L = /* @__PURE__ */ ue(TL, [['__scopeId', 'data-v-12937925']]),
  HL = {
    key: 0,
    class: 'bpmn-handle bpmn-handle-target',
    'data-handle-type': 'target',
    'data-handle-position': 'left'
  },
  jL = { class: 'bpmn-task-label' },
  CL = {
    key: 1,
    class: 'bpmn-handle bpmn-handle-source',
    'data-handle-type': 'source',
    'data-handle-position': 'right'
  },
  AL = /* @__PURE__ */ ie({
    __name: 'BpmnUserTask',
    props: {
      id: {},
      type: {},
      data: {},
      selected: { type: Boolean, default: !1 },
      dragging: { type: Boolean, default: !1 },
      connectable: { type: Boolean, default: !0 },
      style: { default: () => ({}) },
      label: { default: '用户任务' }
    },
    setup(e) {
      const a = e,
        n = J(() => {
          const r = {
            padding: '10px 16px 10px 36px',
            minWidth: '100px',
            borderRadius: '4px',
            border: '1px solid #fa8c16',
            backgroundColor: '#fff7e6',
            textAlign: 'center',
            transition: 'all 0.2s'
          }
          return (
            a.selected &&
              ((r.border = '2px solid #fa8c16'), (r.boxShadow = '0 0 8px rgba(250, 140, 22, 0.4)')),
            { ...r, ...a.style }
          )
        })
      return (r, o) => {
        var s
        return (
          $(),
          j(
            'div',
            {
              class: te(['bpmn-user-task', { selected: e.selected, dragging: e.dragging }]),
              style: re(n.value)
            },
            [
              e.connectable ? ($(), j('div', HL)) : I('v-if', !0),
              o[0] ||
                (o[0] = b(
                  'span',
                  {
                    class: 'bpmn-user-icon',
                    'aria-hidden': 'true'
                  },
                  '👤',
                  -1
                  /* CACHED */
                )),
              b(
                'span',
                jL,
                ae(e.label || ((s = e.data) == null ? void 0 : s.label) || '用户任务'),
                1
                /* TEXT */
              ),
              e.connectable ? ($(), j('div', CL)) : I('v-if', !0)
            ],
            6
            /* CLASS, STYLE */
          )
        )
      }
    }
  }),
  qL = /* @__PURE__ */ ue(AL, [['__scopeId', 'data-v-df7225cb']]),
  FL = {
    key: 0,
    class: 'bpmn-handle bpmn-handle-target',
    'data-handle-type': 'target',
    'data-handle-position': 'left'
  },
  RL = {
    key: 1,
    class: 'bpmn-handle bpmn-handle-source',
    'data-handle-type': 'source',
    'data-handle-position': 'right'
  },
  IL = {
    key: 2,
    class: 'bpmn-handle bpmn-handle-source-bottom',
    'data-handle-type': 'source',
    'data-handle-position': 'bottom'
  },
  PL = /* @__PURE__ */ ie({
    __name: 'BpmnExclusiveGateway',
    props: {
      id: {},
      type: {},
      data: {},
      selected: { type: Boolean, default: !1 },
      dragging: { type: Boolean, default: !1 },
      connectable: { type: Boolean, default: !0 },
      style: { default: () => ({}) },
      label: { default: '排他网关' }
    },
    setup(e) {
      const a = e,
        n = J(() => {
          const o = {
            width: '44px',
            height: '44px',
            border: '2px solid #faad14',
            backgroundColor: '#fffbe6',
            transform: 'rotate(45deg)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'all 0.2s'
          }
          return (
            a.selected &&
              ((o.border = '3px solid #faad14'), (o.boxShadow = '0 0 8px rgba(250, 173, 20, 0.5)')),
            { ...o, ...a.style }
          )
        })
      return (r, o) => (
        $(),
        j(
          'div',
          {
            class: te([
              'bpmn-gateway bpmn-exclusive-gateway',
              { selected: e.selected, dragging: e.dragging }
            ]),
            style: re(n.value)
          },
          [
            o[0] ||
              (o[0] = b(
                'span',
                { class: 'bpmn-gateway-inner' },
                '×',
                -1
                /* CACHED */
              )),
            e.connectable ? ($(), j('div', FL)) : I('v-if', !0),
            e.connectable ? ($(), j('div', RL)) : I('v-if', !0),
            e.connectable ? ($(), j('div', IL)) : I('v-if', !0)
          ],
          6
          /* CLASS, STYLE */
        )
      )
    }
  }),
  BL = /* @__PURE__ */ ue(PL, [['__scopeId', 'data-v-f41d7d00']]),
  NL = {
    key: 0,
    class: 'bpmn-handle bpmn-handle-target',
    'data-handle-type': 'target',
    'data-handle-position': 'left'
  },
  OL = {
    key: 1,
    class: 'bpmn-handle bpmn-handle-source',
    'data-handle-type': 'source',
    'data-handle-position': 'right'
  },
  zL = {
    key: 2,
    class: 'bpmn-handle bpmn-handle-source-bottom',
    'data-handle-type': 'source',
    'data-handle-position': 'bottom'
  },
  GL = /* @__PURE__ */ ie({
    __name: 'BpmnParallelGateway',
    props: {
      id: {},
      type: {},
      data: {},
      selected: { type: Boolean, default: !1 },
      dragging: { type: Boolean, default: !1 },
      connectable: { type: Boolean, default: !0 },
      style: { default: () => ({}) },
      label: { default: '并行网关' }
    },
    setup(e) {
      const a = e,
        n = J(() => {
          const o = {
            width: '44px',
            height: '44px',
            border: '2px solid #13c2c2',
            backgroundColor: '#e6fffb',
            transform: 'rotate(45deg)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'all 0.2s'
          }
          return (
            a.selected &&
              ((o.border = '3px solid #13c2c2'), (o.boxShadow = '0 0 8px rgba(19, 194, 194, 0.5)')),
            { ...o, ...a.style }
          )
        })
      return (r, o) => (
        $(),
        j(
          'div',
          {
            class: te([
              'bpmn-gateway bpmn-parallel-gateway',
              { selected: e.selected, dragging: e.dragging }
            ]),
            style: re(n.value)
          },
          [
            o[0] ||
              (o[0] = b(
                'span',
                { class: 'bpmn-gateway-inner' },
                '+',
                -1
                /* CACHED */
              )),
            e.connectable ? ($(), j('div', NL)) : I('v-if', !0),
            e.connectable ? ($(), j('div', OL)) : I('v-if', !0),
            e.connectable ? ($(), j('div', zL)) : I('v-if', !0)
          ],
          6
          /* CLASS, STYLE */
        )
      )
    }
  }),
  JL = /* @__PURE__ */ ue(GL, [['__scopeId', 'data-v-a5b3ba29']]),
  UL = {
    key: 0,
    class: 'bpmn-handle bpmn-handle-target',
    'data-handle-type': 'target',
    'data-handle-position': 'left'
  },
  WL = {
    key: 1,
    class: 'bpmn-handle bpmn-handle-source',
    'data-handle-type': 'source',
    'data-handle-position': 'right'
  },
  VL = {
    key: 2,
    class: 'bpmn-handle bpmn-handle-source-bottom',
    'data-handle-type': 'source',
    'data-handle-position': 'bottom'
  },
  KL = /* @__PURE__ */ ie({
    __name: 'BpmnInclusiveGateway',
    props: {
      id: {},
      type: {},
      data: {},
      selected: { type: Boolean, default: !1 },
      dragging: { type: Boolean, default: !1 },
      connectable: { type: Boolean, default: !0 },
      style: { default: () => ({}) },
      label: { default: '包含网关' }
    },
    setup(e) {
      const a = e,
        n = J(() => {
          const o = {
            width: '44px',
            height: '44px',
            border: '2px solid #eb2f96',
            backgroundColor: '#fff0f6',
            transform: 'rotate(45deg)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'all 0.2s'
          }
          return (
            a.selected &&
              ((o.border = '3px solid #eb2f96'), (o.boxShadow = '0 0 8px rgba(235, 47, 150, 0.5)')),
            { ...o, ...a.style }
          )
        })
      return (r, o) => (
        $(),
        j(
          'div',
          {
            class: te([
              'bpmn-gateway bpmn-inclusive-gateway',
              { selected: e.selected, dragging: e.dragging }
            ]),
            style: re(n.value)
          },
          [
            o[0] ||
              (o[0] = b(
                'span',
                { class: 'bpmn-gateway-inner' },
                '○',
                -1
                /* CACHED */
              )),
            e.connectable ? ($(), j('div', UL)) : I('v-if', !0),
            e.connectable ? ($(), j('div', WL)) : I('v-if', !0),
            e.connectable ? ($(), j('div', VL)) : I('v-if', !0)
          ],
          6
          /* CLASS, STYLE */
        )
      )
    }
  }),
  XL = /* @__PURE__ */ ue(KL, [['__scopeId', 'data-v-cc152731']]),
  rt = {
    StartEvent: 'bpmn-start',
    EndEvent: 'bpmn-end',
    Task: 'bpmn-task',
    ServiceTask: 'bpmn-service-task',
    UserTask: 'bpmn-user-task',
    ExclusiveGateway: 'bpmn-exclusive-gateway',
    ParallelGateway: 'bpmn-parallel-gateway',
    InclusiveGateway: 'bpmn-inclusive-gateway'
  }
function aI() {
  ;(Te({ type: rt.StartEvent, component: vL }),
    Te({ type: rt.EndEvent, component: bL }),
    Te({ type: rt.Task, component: kL }),
    Te({ type: rt.ServiceTask, component: $L }),
    Te({ type: rt.UserTask, component: qL }),
    Te({ type: rt.ExclusiveGateway, component: BL }),
    Te({ type: rt.ParallelGateway, component: JL }),
    Te({ type: rt.InclusiveGateway, component: XL }))
}
const ZL = {
    key: 0,
    class: 'ai-handle ai-handle-target',
    'data-handle-type': 'target',
    'data-handle-position': 'left'
  },
  QL = { class: 'ai-node-header' },
  e0 = { class: 'ai-node-title' },
  t0 = { class: 'ai-node-body' },
  r0 = { class: 'ai-node-model' },
  n0 = {
    key: 1,
    class: 'ai-handle ai-handle-source',
    'data-handle-type': 'source',
    'data-handle-position': 'right'
  },
  a0 = /* @__PURE__ */ ie({
    __name: 'AiLlmNode',
    props: {
      id: {},
      type: {},
      data: {},
      selected: { type: Boolean, default: !1 },
      dragging: { type: Boolean, default: !1 },
      connectable: { type: Boolean, default: !0 },
      style: { default: () => ({}) },
      label: { default: 'LLM' }
    },
    setup(e) {
      const a = e,
        n = J(() => {
          const r = {
            padding: '12px 16px',
            minWidth: '180px',
            borderRadius: '12px',
            border: '1px solid #8b5cf6',
            backgroundColor: '#f5f3ff',
            transition: 'all 0.2s'
          }
          return (
            a.selected &&
              ((r.border = '2px solid #8b5cf6'),
              (r.boxShadow = '0 0 12px rgba(139, 92, 246, 0.4)')),
            { ...r, ...a.style }
          )
        })
      return (r, o) => {
        var s, t, i
        return (
          $(),
          j(
            'div',
            {
              class: te(['ai-llm-node', { selected: e.selected, dragging: e.dragging }]),
              style: re(n.value)
            },
            [
              e.connectable ? ($(), j('div', ZL)) : I('v-if', !0),
              b('div', QL, [
                o[0] ||
                  (o[0] = b(
                    'span',
                    { class: 'ai-node-icon' },
                    '🧠',
                    -1
                    /* CACHED */
                  )),
                b(
                  'span',
                  e0,
                  ae(e.label || ((s = e.data) == null ? void 0 : s.label) || 'LLM'),
                  1
                  /* TEXT */
                )
              ]),
              b('div', t0, [
                b(
                  'div',
                  r0,
                  ae(((t = e.data) == null ? void 0 : t.model) || 'GPT-4'),
                  1
                  /* TEXT */
                ),
                (i = e.data) != null && i.status
                  ? ($(),
                    j(
                      'div',
                      {
                        key: 0,
                        class: te(['ai-node-status', `status-${e.data.status}`])
                      },
                      ae(
                        e.data.status === 'running'
                          ? '● 运行中'
                          : e.data.status === 'success'
                            ? '✓ 成功'
                            : '○ 待运行'
                      ),
                      3
                      /* TEXT, CLASS */
                    ))
                  : I('v-if', !0)
              ]),
              e.connectable ? ($(), j('div', n0)) : I('v-if', !0)
            ],
            6
            /* CLASS, STYLE */
          )
        )
      }
    }
  }),
  o0 = /* @__PURE__ */ ue(a0, [['__scopeId', 'data-v-f4834e7b']]),
  s0 = {
    key: 0,
    class: 'ai-handle ai-handle-target',
    'data-handle-type': 'target',
    'data-handle-position': 'left'
  },
  i0 = { class: 'ai-node-header' },
  u0 = { class: 'ai-node-title' },
  l0 = { class: 'ai-node-body' },
  d0 = { class: 'ai-node-preview' },
  c0 = {
    key: 1,
    class: 'ai-handle ai-handle-source',
    'data-handle-type': 'source',
    'data-handle-position': 'right'
  },
  _0 = /* @__PURE__ */ ie({
    __name: 'AiPromptNode',
    props: {
      id: {},
      type: {},
      data: {},
      selected: { type: Boolean, default: !1 },
      dragging: { type: Boolean, default: !1 },
      connectable: { type: Boolean, default: !0 },
      style: { default: () => ({}) },
      label: { default: '提示词' }
    },
    setup(e) {
      const a = e,
        n = J(() => {
          const r = {
            padding: '12px 16px',
            minWidth: '160px',
            borderRadius: '12px',
            border: '1px solid #06b6d4',
            backgroundColor: '#ecfeff',
            transition: 'all 0.2s'
          }
          return (
            a.selected &&
              ((r.border = '2px solid #06b6d4'), (r.boxShadow = '0 0 12px rgba(6, 182, 212, 0.4)')),
            { ...r, ...a.style }
          )
        })
      return (r, o) => {
        var s, t
        return (
          $(),
          j(
            'div',
            {
              class: te(['ai-prompt-node', { selected: e.selected, dragging: e.dragging }]),
              style: re(n.value)
            },
            [
              e.connectable ? ($(), j('div', s0)) : I('v-if', !0),
              b('div', i0, [
                o[0] ||
                  (o[0] = b(
                    'span',
                    { class: 'ai-node-icon' },
                    '💬',
                    -1
                    /* CACHED */
                  )),
                b(
                  'span',
                  u0,
                  ae(e.label || ((s = e.data) == null ? void 0 : s.label) || '提示词'),
                  1
                  /* TEXT */
                )
              ]),
              b('div', l0, [
                b(
                  'div',
                  d0,
                  ae(
                    String(((t = e.data) == null ? void 0 : t.prompt) || '').slice(0, 30) ||
                      '点击编辑提示词...'
                  ) + '... ',
                  1
                  /* TEXT */
                )
              ]),
              e.connectable ? ($(), j('div', c0)) : I('v-if', !0)
            ],
            6
            /* CLASS, STYLE */
          )
        )
      }
    }
  }),
  f0 = /* @__PURE__ */ ue(_0, [['__scopeId', 'data-v-2f4fbb43']]),
  m0 = {
    key: 0,
    class: 'ai-handle ai-handle-target',
    'data-handle-type': 'target',
    'data-handle-position': 'left'
  },
  p0 = { class: 'ai-node-header' },
  h0 = { class: 'ai-node-title' },
  v0 = { class: 'ai-node-body' },
  y0 = { class: 'ai-node-tools' },
  g0 = {
    key: 1,
    class: 'ai-handle ai-handle-source',
    'data-handle-type': 'source',
    'data-handle-position': 'right'
  },
  M0 = /* @__PURE__ */ ie({
    __name: 'AiAgentNode',
    props: {
      id: {},
      type: {},
      data: { default: () => ({}) },
      selected: { type: Boolean, default: !1 },
      dragging: { type: Boolean, default: !1 },
      connectable: { type: Boolean, default: !0 },
      style: { default: () => ({}) },
      label: { default: 'Agent' }
    },
    setup(e) {
      const a = e,
        n = J(() => {
          const r = {
            padding: '12px 16px',
            minWidth: '160px',
            borderRadius: '12px',
            border: '1px solid #f97316',
            backgroundColor: '#fff7ed',
            transition: 'all 0.2s'
          }
          return (
            a.selected &&
              ((r.border = '2px solid #f97316'),
              (r.boxShadow = '0 0 12px rgba(249, 115, 22, 0.4)')),
            { ...r, ...a.style }
          )
        })
      return (r, o) => {
        var s, t, i
        return (
          $(),
          j(
            'div',
            {
              class: te(['ai-agent-node', { selected: e.selected, dragging: e.dragging }]),
              style: re(n.value)
            },
            [
              e.connectable ? ($(), j('div', m0)) : I('v-if', !0),
              b('div', p0, [
                o[0] ||
                  (o[0] = b(
                    'span',
                    { class: 'ai-node-icon' },
                    '🤖',
                    -1
                    /* CACHED */
                  )),
                b(
                  'span',
                  h0,
                  ae(e.label || ((s = e.data) == null ? void 0 : s.label) || 'Agent'),
                  1
                  /* TEXT */
                )
              ]),
              b('div', v0, [
                b(
                  'div',
                  y0,
                  ae(
                    ((i = (t = a.data) == null ? void 0 : t.tools) == null ? void 0 : i.length) || 0
                  ) + ' 个工具',
                  1
                  /* TEXT */
                )
              ]),
              e.connectable ? ($(), j('div', g0)) : I('v-if', !0)
            ],
            6
            /* CLASS, STYLE */
          )
        )
      }
    }
  }),
  b0 = /* @__PURE__ */ ue(M0, [['__scopeId', 'data-v-40365248']]),
  Y0 = {
    key: 0,
    class: 'ai-handle ai-handle-target',
    'data-handle-type': 'target',
    'data-handle-position': 'left'
  },
  w0 = { class: 'ai-node-header' },
  x0 = { class: 'ai-node-title' },
  L0 = { class: 'ai-node-body' },
  k0 = { class: 'ai-node-tool-name' },
  S0 = {
    key: 1,
    class: 'ai-handle ai-handle-source',
    'data-handle-type': 'source',
    'data-handle-position': 'right'
  },
  D0 = /* @__PURE__ */ ie({
    __name: 'AiToolNode',
    props: {
      id: {},
      type: {},
      data: {},
      selected: { type: Boolean, default: !1 },
      dragging: { type: Boolean, default: !1 },
      connectable: { type: Boolean, default: !0 },
      style: { default: () => ({}) },
      label: { default: '工具' }
    },
    setup(e) {
      const a = e,
        n = J(() => {
          const r = {
            padding: '12px 16px',
            minWidth: '140px',
            borderRadius: '12px',
            border: '1px solid #10b981',
            backgroundColor: '#ecfdf5',
            transition: 'all 0.2s'
          }
          return (
            a.selected &&
              ((r.border = '2px solid #10b981'),
              (r.boxShadow = '0 0 12px rgba(16, 185, 129, 0.4)')),
            { ...r, ...a.style }
          )
        })
      return (r, o) => {
        var s, t
        return (
          $(),
          j(
            'div',
            {
              class: te(['ai-tool-node', { selected: e.selected, dragging: e.dragging }]),
              style: re(n.value)
            },
            [
              e.connectable ? ($(), j('div', Y0)) : I('v-if', !0),
              b('div', w0, [
                o[0] ||
                  (o[0] = b(
                    'span',
                    { class: 'ai-node-icon' },
                    '🔧',
                    -1
                    /* CACHED */
                  )),
                b(
                  'span',
                  x0,
                  ae(e.label || ((s = e.data) == null ? void 0 : s.label) || '工具'),
                  1
                  /* TEXT */
                )
              ]),
              b('div', L0, [
                b(
                  'div',
                  k0,
                  ae(((t = e.data) == null ? void 0 : t.toolName) || '选择一个工具'),
                  1
                  /* TEXT */
                )
              ]),
              e.connectable ? ($(), j('div', S0)) : I('v-if', !0)
            ],
            6
            /* CLASS, STYLE */
          )
        )
      }
    }
  }),
  E0 = /* @__PURE__ */ ue(D0, [['__scopeId', 'data-v-4da7e402']]),
  T0 = {
    key: 0,
    class: 'ai-handle ai-handle-target',
    'data-handle-type': 'target',
    'data-handle-position': 'left'
  },
  $0 = { class: 'ai-node-header' },
  H0 = { class: 'ai-node-title' },
  j0 = { class: 'ai-node-body' },
  C0 = { class: 'ai-node-condition' },
  A0 = {
    key: 1,
    class: 'ai-handle ai-handle-source',
    'data-handle-type': 'source',
    'data-handle-position': 'right'
  },
  q0 = {
    key: 2,
    class: 'ai-handle ai-handle-source-bottom',
    'data-handle-type': 'source',
    'data-handle-position': 'bottom'
  },
  F0 = /* @__PURE__ */ ie({
    __name: 'AiConditionNode',
    props: {
      id: {},
      type: {},
      data: {},
      selected: { type: Boolean, default: !1 },
      dragging: { type: Boolean, default: !1 },
      connectable: { type: Boolean, default: !0 },
      style: { default: () => ({}) },
      label: { default: '条件分支' }
    },
    setup(e) {
      const a = e,
        n = J(() => {
          const r = {
            padding: '12px 16px',
            minWidth: '140px',
            borderRadius: '12px',
            border: '1px solid #f43f5e',
            backgroundColor: '#fff1f2',
            transition: 'all 0.2s'
          }
          return (
            a.selected &&
              ((r.border = '2px solid #f43f5e'), (r.boxShadow = '0 0 12px rgba(244, 63, 94, 0.4)')),
            { ...r, ...a.style }
          )
        })
      return (r, o) => {
        var s, t
        return (
          $(),
          j(
            'div',
            {
              class: te(['ai-condition-node', { selected: e.selected, dragging: e.dragging }]),
              style: re(n.value)
            },
            [
              e.connectable ? ($(), j('div', T0)) : I('v-if', !0),
              b('div', $0, [
                o[0] ||
                  (o[0] = b(
                    'span',
                    { class: 'ai-node-icon' },
                    '🔀',
                    -1
                    /* CACHED */
                  )),
                b(
                  'span',
                  H0,
                  ae(e.label || ((s = e.data) == null ? void 0 : s.label) || '条件分支'),
                  1
                  /* TEXT */
                )
              ]),
              b('div', j0, [
                b(
                  'div',
                  C0,
                  ae(((t = e.data) == null ? void 0 : t.condition) || '设置条件...'),
                  1
                  /* TEXT */
                )
              ]),
              e.connectable ? ($(), j('div', A0)) : I('v-if', !0),
              e.connectable ? ($(), j('div', q0)) : I('v-if', !0)
            ],
            6
            /* CLASS, STYLE */
          )
        )
      }
    }
  }),
  R0 = /* @__PURE__ */ ue(F0, [['__scopeId', 'data-v-b51f4ffc']]),
  I0 = {
    key: 0,
    class: 'ai-handle ai-handle-source',
    'data-handle-type': 'source',
    'data-handle-position': 'right'
  },
  P0 = /* @__PURE__ */ ie({
    __name: 'AiStartNode',
    props: {
      id: {},
      type: {},
      data: {},
      selected: { type: Boolean, default: !1 },
      dragging: { type: Boolean, default: !1 },
      connectable: { type: Boolean, default: !0 },
      style: { default: () => ({}) },
      label: { default: '开始' }
    },
    setup(e) {
      const a = e,
        n = J(() => {
          const r = {
            width: '48px',
            height: '48px',
            borderRadius: '50%',
            border: '2px solid #22c55e',
            backgroundColor: '#f0fdf4',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'all 0.2s'
          }
          return (
            a.selected &&
              ((r.border = '3px solid #22c55e'), (r.boxShadow = '0 0 12px rgba(34, 197, 94, 0.5)')),
            { ...r, ...a.style }
          )
        })
      return (r, o) => (
        $(),
        j(
          'div',
          {
            class: te(['ai-start-node', { selected: e.selected, dragging: e.dragging }]),
            style: re(n.value)
          },
          [
            o[0] ||
              (o[0] = b(
                'span',
                { class: 'ai-start-icon' },
                '▶',
                -1
                /* CACHED */
              )),
            e.connectable ? ($(), j('div', I0)) : I('v-if', !0)
          ],
          6
          /* CLASS, STYLE */
        )
      )
    }
  }),
  B0 = /* @__PURE__ */ ue(P0, [['__scopeId', 'data-v-49702265']]),
  N0 = {
    key: 0,
    class: 'ai-handle ai-handle-target',
    'data-handle-type': 'target',
    'data-handle-position': 'left'
  },
  O0 = /* @__PURE__ */ ie({
    __name: 'AiEndNode',
    props: {
      id: {},
      type: {},
      data: {},
      selected: { type: Boolean, default: !1 },
      dragging: { type: Boolean, default: !1 },
      connectable: { type: Boolean, default: !0 },
      style: { default: () => ({}) },
      label: { default: '结束' }
    },
    setup(e) {
      const a = e,
        n = J(() => {
          const r = {
            width: '48px',
            height: '48px',
            borderRadius: '50%',
            border: '3px solid #ef4444',
            backgroundColor: '#fef2f2',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'all 0.2s'
          }
          return (
            a.selected &&
              ((r.border = '4px solid #ef4444'), (r.boxShadow = '0 0 12px rgba(239, 68, 68, 0.5)')),
            { ...r, ...a.style }
          )
        })
      return (r, o) => (
        $(),
        j(
          'div',
          {
            class: te(['ai-end-node', { selected: e.selected, dragging: e.dragging }]),
            style: re(n.value)
          },
          [
            o[0] ||
              (o[0] = b(
                'span',
                { class: 'ai-end-icon' },
                '■',
                -1
                /* CACHED */
              )),
            e.connectable ? ($(), j('div', N0)) : I('v-if', !0)
          ],
          6
          /* CLASS, STYLE */
        )
      )
    }
  }),
  z0 = /* @__PURE__ */ ue(O0, [['__scopeId', 'data-v-5de5b23d']]),
  G0 = {
    key: 0,
    class: 'ai-handle ai-handle-target',
    'data-handle-type': 'target',
    'data-handle-position': 'left'
  },
  J0 = { class: 'ai-node-header' },
  U0 = { class: 'ai-node-title' },
  W0 = { class: 'ai-node-body' },
  V0 = { class: 'ai-node-memory' },
  K0 = {
    key: 1,
    class: 'ai-handle ai-handle-source',
    'data-handle-type': 'source',
    'data-handle-position': 'right'
  },
  X0 = /* @__PURE__ */ ie({
    __name: 'AiMemoryNode',
    props: {
      id: {},
      type: {},
      data: {},
      selected: { type: Boolean, default: !1 },
      dragging: { type: Boolean, default: !1 },
      connectable: { type: Boolean, default: !0 },
      style: { default: () => ({}) },
      label: { default: '记忆' }
    },
    setup(e) {
      const a = e,
        n = J(() => {
          const r = {
            padding: '12px 16px',
            minWidth: '140px',
            borderRadius: '12px',
            border: '1px solid #3b82f6',
            backgroundColor: '#eff6ff',
            transition: 'all 0.2s'
          }
          return (
            a.selected &&
              ((r.border = '2px solid #3b82f6'),
              (r.boxShadow = '0 0 12px rgba(59, 130, 246, 0.4)')),
            { ...r, ...a.style }
          )
        })
      return (r, o) => {
        var s, t
        return (
          $(),
          j(
            'div',
            {
              class: te(['ai-memory-node', { selected: e.selected, dragging: e.dragging }]),
              style: re(n.value)
            },
            [
              e.connectable ? ($(), j('div', G0)) : I('v-if', !0),
              b('div', J0, [
                o[0] ||
                  (o[0] = b(
                    'span',
                    { class: 'ai-node-icon' },
                    '💾',
                    -1
                    /* CACHED */
                  )),
                b(
                  'span',
                  U0,
                  ae(e.label || ((s = e.data) == null ? void 0 : s.label) || '记忆'),
                  1
                  /* TEXT */
                )
              ]),
              b('div', W0, [
                b(
                  'div',
                  V0,
                  ae(((t = e.data) == null ? void 0 : t.memoryType) || '短期记忆'),
                  1
                  /* TEXT */
                )
              ]),
              e.connectable ? ($(), j('div', K0)) : I('v-if', !0)
            ],
            6
            /* CLASS, STYLE */
          )
        )
      }
    }
  }),
  Z0 = /* @__PURE__ */ ue(X0, [['__scopeId', 'data-v-5f8e28c0']]),
  nt = {
    LLM: 'ai-llm',
    Prompt: 'ai-prompt',
    Agent: 'ai-agent',
    Tool: 'ai-tool',
    Condition: 'ai-condition',
    Start: 'ai-start',
    End: 'ai-end',
    Memory: 'ai-memory'
  }
function oI() {
  ;(Te({ type: nt.LLM, component: o0 }),
    Te({ type: nt.Prompt, component: f0 }),
    Te({ type: nt.Agent, component: b0 }),
    Te({ type: nt.Tool, component: E0 }),
    Te({ type: nt.Condition, component: R0 }),
    Te({ type: nt.Start, component: B0 }),
    Te({ type: nt.End, component: z0 }),
    Te({ type: nt.Memory, component: Z0 }))
}
const Q0 = ['d'],
  ek = ['d'],
  tk = ['x', 'y'],
  rk = { class: 'flow-edge-label' },
  nk = /* @__PURE__ */ ie({
    __name: 'BaseEdge',
    props: {
      id: {},
      sourceX: {},
      sourceY: {},
      targetX: {},
      targetY: {},
      sourcePosition: { default: 'right' },
      targetPosition: { default: 'left' },
      style: { default: () => ({}) },
      selected: { type: Boolean, default: !1 },
      animated: { type: Boolean, default: !1 },
      label: { default: '' }
    },
    setup(e) {
      const a = e,
        n = J(() => {
          const { sourceX: o, sourceY: s, targetX: t, targetY: i } = a
          return `M ${o} ${s} L ${t} ${i}`
        }),
        r = J(() => ({
          ...a.style,
          strokeDasharray: a.animated ? '5,5' : void 0,
          animation: a.animated ? 'dash 0.5s linear infinite' : void 0
        }))
      return (o, s) => (
        $(),
        j(
          'g',
          {
            class: te(['flow-base-edge', { selected: e.selected, animated: e.animated }])
          },
          [
            b(
              'path',
              {
                d: n.value,
                fill: 'none',
                style: re(r.value),
                'stroke-width': '2',
                stroke: '#b1b1b7'
              },
              null,
              12,
              Q0
            ),
            e.label
              ? ($(),
                j(
                  'path',
                  {
                    key: 0,
                    d: n.value,
                    fill: 'none',
                    stroke: 'transparent',
                    'stroke-width': '20',
                    class: 'flow-edge-label-path'
                  },
                  null,
                  8,
                  ek
                ))
              : I('v-if', !0),
            e.label
              ? ($(),
                j(
                  'foreignObject',
                  {
                    key: 1,
                    x: (e.sourceX + e.targetX) / 2 - 30,
                    y: (e.sourceY + e.targetY) / 2 - 10,
                    width: '60',
                    height: '20'
                  },
                  [
                    b(
                      'div',
                      rk,
                      ae(e.label),
                      1
                      /* TEXT */
                    )
                  ],
                  8,
                  tk
                ))
              : I('v-if', !0)
          ],
          2
          /* CLASS */
        )
      )
    }
  }),
  sI = /* @__PURE__ */ ue(nk, [['__scopeId', 'data-v-be7e1229']]),
  ak = ['d'],
  ok = ['x', 'y'],
  sk = { class: 'flow-edge-label' },
  ik = /* @__PURE__ */ ie({
    __name: 'SmoothEdge',
    props: {
      sourceX: {},
      sourceY: {},
      targetX: {},
      targetY: {},
      sourcePosition: { default: 'right' },
      targetPosition: { default: 'left' },
      style: { default: () => ({}) },
      selected: { type: Boolean, default: !1 },
      animated: { type: Boolean, default: !1 },
      label: { default: '' }
    },
    setup(e) {
      const a = e,
        n = J(() => (a.sourceX + a.targetX) / 2),
        r = J(() => (a.sourceY + a.targetY) / 2),
        o = J(() => {
          const {
              sourceX: t,
              sourceY: i,
              targetX: u,
              targetY: l,
              sourcePosition: d,
              targetPosition: c
            } = a,
            _ = Math.abs(u - t) * 0.5,
            f = Math.abs(l - i) * 0.5
          let m = t,
            h = i,
            y = u,
            p = l
          return (
            d === 'right'
              ? (m += _)
              : d === 'left'
                ? (m -= _)
                : d === 'bottom'
                  ? (h += f)
                  : d === 'top' && (h -= f),
            c === 'right'
              ? (y += _)
              : c === 'left'
                ? (y -= _)
                : c === 'bottom'
                  ? (p += f)
                  : c === 'top' && (p -= f),
            `M ${t} ${i} C ${m} ${h}, ${y} ${p}, ${u} ${l}`
          )
        }),
        s = J(() => ({
          ...a.style,
          strokeDasharray: a.animated ? '5,5' : void 0,
          animation: a.animated ? 'dash 0.5s linear infinite' : void 0
        }))
      return (t, i) => (
        $(),
        j(
          'g',
          {
            class: te(['flow-smooth-edge', { selected: e.selected, animated: e.animated }])
          },
          [
            b(
              'path',
              {
                d: o.value,
                fill: 'none',
                style: re(s.value),
                'stroke-width': '2',
                stroke: '#b1b1b7'
              },
              null,
              12,
              ak
            ),
            e.label
              ? ($(),
                j(
                  'foreignObject',
                  {
                    key: 0,
                    x: n.value - 30,
                    y: r.value - 10,
                    width: '60',
                    height: '20'
                  },
                  [
                    b(
                      'div',
                      sk,
                      ae(e.label),
                      1
                      /* TEXT */
                    )
                  ],
                  8,
                  ok
                ))
              : I('v-if', !0)
          ],
          2
          /* CLASS */
        )
      )
    }
  }),
  iI = /* @__PURE__ */ ue(ik, [['__scopeId', 'data-v-fddbf398']]),
  uk = ['d'],
  lk = ['x', 'y'],
  dk = { class: 'flow-edge-label' },
  ck = /* @__PURE__ */ ie({
    __name: 'StepEdge',
    props: {
      sourceX: {},
      sourceY: {},
      targetX: {},
      targetY: {},
      sourcePosition: { default: 'right' },
      targetPosition: { default: 'left' },
      style: { default: () => ({}) },
      selected: { type: Boolean, default: !1 },
      animated: { type: Boolean, default: !1 },
      label: { default: '' }
    },
    setup(e) {
      const a = e,
        n = J(() => {
          const { sourceX: t, sourceY: i, targetX: u, targetY: l } = a,
            d = (t + u) / 2
          return `M ${t} ${i} H ${d} V ${l} H ${u}`
        }),
        r = J(() => (a.sourceX + a.targetX) / 2),
        o = J(() => (a.sourceY + a.targetY) / 2),
        s = J(() => ({
          ...a.style,
          strokeDasharray: a.animated ? '5,5' : void 0
        }))
      return (t, i) => (
        $(),
        j(
          'g',
          {
            class: te(['flow-step-edge', { selected: e.selected, animated: e.animated }])
          },
          [
            b(
              'path',
              {
                d: n.value,
                fill: 'none',
                style: re(s.value),
                'stroke-width': '2',
                stroke: '#b1b1b7'
              },
              null,
              12,
              uk
            ),
            e.label
              ? ($(),
                j(
                  'foreignObject',
                  {
                    key: 0,
                    x: r.value - 30,
                    y: o.value - 10,
                    width: '60',
                    height: '20'
                  },
                  [
                    b(
                      'div',
                      dk,
                      ae(e.label),
                      1
                      /* TEXT */
                    )
                  ],
                  8,
                  lk
                ))
              : I('v-if', !0)
          ],
          2
          /* CLASS */
        )
      )
    }
  }),
  uI = /* @__PURE__ */ ue(ck, [['__scopeId', 'data-v-84f796b0']]),
  _k = ['d'],
  fk = ['x', 'y'],
  mk = { class: 'flow-edge-label' },
  pk = /* @__PURE__ */ ie({
    __name: 'BezierEdge',
    props: {
      sourceX: {},
      sourceY: {},
      targetX: {},
      targetY: {},
      sourcePosition: { default: 'right' },
      targetPosition: { default: 'left' },
      style: { default: () => ({}) },
      selected: { type: Boolean, default: !1 },
      animated: { type: Boolean, default: !1 },
      label: { default: '' }
    },
    setup(e) {
      const a = e,
        n = J(() => {
          const {
              sourceX: t,
              sourceY: i,
              targetX: u,
              targetY: l,
              sourcePosition: d,
              targetPosition: c
            } = a,
            _ = 0.5
          let f = t,
            m = i,
            h = u,
            y = l
          const p = Math.abs(u - t) * _,
            v = Math.abs(l - i) * _
          return (
            d === 'right'
              ? (f += p)
              : d === 'left'
                ? (f -= p)
                : d === 'bottom'
                  ? (m += v)
                  : d === 'top' && (m -= v),
            c === 'right'
              ? (h += p)
              : c === 'left'
                ? (h -= p)
                : c === 'bottom'
                  ? (y += v)
                  : c === 'top' && (y -= v),
            `M ${t} ${i} C ${f} ${m}, ${h} ${y}, ${u} ${l}`
          )
        }),
        r = J(() => (a.sourceX + a.targetX) / 2),
        o = J(() => (a.sourceY + a.targetY) / 2),
        s = J(() => ({
          ...a.style,
          strokeDasharray: a.animated ? '5,5' : void 0,
          animation: a.animated ? 'dash 0.5s linear infinite' : void 0
        }))
      return (t, i) => (
        $(),
        j(
          'g',
          {
            class: te(['flow-bezier-edge', { selected: e.selected, animated: e.animated }])
          },
          [
            b(
              'path',
              {
                d: n.value,
                fill: 'none',
                style: re(s.value),
                'stroke-width': '2',
                stroke: '#b1b1b7'
              },
              null,
              12,
              _k
            ),
            e.label
              ? ($(),
                j(
                  'foreignObject',
                  {
                    key: 0,
                    x: r.value - 30,
                    y: o.value - 10,
                    width: '60',
                    height: '20'
                  },
                  [
                    b(
                      'div',
                      mk,
                      ae(e.label),
                      1
                      /* TEXT */
                    )
                  ],
                  8,
                  fk
                ))
              : I('v-if', !0)
          ],
          2
          /* CLASS */
        )
      )
    }
  }),
  lI = /* @__PURE__ */ ue(pk, [['__scopeId', 'data-v-728aef68']]),
  hk = ['id'],
  vk = ['stdDeviation'],
  yk = ['id'],
  gk = ['stop-color'],
  Mk = ['stop-color'],
  bk = ['d'],
  Yk = ['d', 'filter'],
  wk = ['d'],
  xk = ['d'],
  Lk = ['id', 'd'],
  kk = ['fill'],
  Sk = ['dur', 'begin'],
  Dk = ['href'],
  Ek = ['d'],
  Tk = ['x', 'y'],
  $k = { class: 'flow-data-flow-label' },
  Hk = ['transform'],
  jk = ['fill'],
  Ck = ['fill'],
  Ak = /* @__PURE__ */ ie({
    __name: 'DataFlowEdge',
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
      stroke: { default: '#b1b1b7' },
      strokeWidth: { default: 2 },
      sourcePosition: { default: 'right' },
      targetPosition: { default: 'left' }
    },
    setup(e) {
      P1((z) => ({
        v3d120cd2: `${i.value}s`
      }))
      const a = e,
        n = J(() => {
          var z
          return ((z = a.edge) == null ? void 0 : z.data) ?? {}
        }),
        r = J(() => n.value.flowStatus ?? 'idle'),
        o = J(() => n.value.flowEffect ?? 'particles'),
        s = J(() => n.value.glowIntensity ?? 8),
        t = J(() => n.value.particleCount ?? 3),
        i = J(() => n.value.animationDuration ?? 2),
        u = J(() => {
          var z
          return ((z = a.edge) == null ? void 0 : z.selected) ?? !1
        }),
        l = J(() => {
          var z
          return ((z = a.edge) == null ? void 0 : z.animated) ?? !1
        }),
        d = J(() => {
          var z
          return ((z = a.edge) == null ? void 0 : z.label) ?? ''
        }),
        c = J(() => {
          var z
          return ((z = a.edge) == null ? void 0 : z.id) ?? ''
        }),
        _ = J(() => a.strokeWidth ?? 2),
        f = {
          idle: { primary: '#b1b1b7', glow: '#b1b1b7', particle: '#d1d1d7' },
          processing: { primary: '#6366f1', glow: '#4f46e5', particle: '#818cf8' },
          success: { primary: '#10b981', glow: '#059669', particle: '#34d399' },
          error: { primary: '#ef4444', glow: '#dc2626', particle: '#f87171' },
          warning: { primary: '#f59e0b', glow: '#d97706', particle: '#fcd34d' }
        },
        m = J(() => f[r.value]),
        h = J(() => a.labelX ?? (a.sourceX + a.targetX) / 2),
        y = J(() => a.labelY ?? (a.sourceY + a.targetY) / 2),
        p = J(() => `data-flow-glow-${c.value}`),
        v = J(() => `data-flow-grad-${c.value}`),
        g = J(() => `data-flow-path-${c.value}`),
        M = J(() =>
          Array.from({ length: t.value }, (z, T) => ({
            key: T,
            delay: (T / t.value) * i.value
          }))
        ),
        w = J(
          () =>
            r.value === 'processing' ||
            r.value === 'success' ||
            r.value === 'error' ||
            r.value === 'warning'
        ),
        L = J(() => w.value && (o.value === 'glow' || o.value === 'particles')),
        D = J(() => ({
          stroke: m.value.primary,
          strokeWidth: _.value,
          strokeDasharray: l.value && !w.value ? '5,5' : void 0,
          ...(a.style ?? {})
        })),
        Y = J(() => ({
          stroke: 'transparent',
          strokeWidth: Math.max(_.value * 5, 20),
          fill: 'none'
        })),
        E = ee(0.8)
      let k = null
      function S() {
        ;(k && clearInterval(k),
          (k = setInterval(
            () => {
              E.value = E.value === 0.8 ? 0.2 : 0.8
            },
            (i.value * 1e3) / 2
          )))
      }
      function O() {
        k && (clearInterval(k), (k = null))
      }
      return (
        Ht(() => {
          o.value === 'pulse' && w.value && S()
        }),
        B1(() => O()),
        Le([o, w], ([z, T]) => {
          ;(O(), z === 'pulse' && T && S())
        }),
        (z, T) => (
          $(),
          j(
            'g',
            {
              class: te([
                'flow-data-flow-edge',
                `status-${r.value}`,
                `effect-${o.value}`,
                { selected: u.value, animated: l.value }
              ])
            },
            [
              I(' SVG 滤镜/渐变定义 '),
              b('defs', null, [
                I(' 发光模糊滤镜 '),
                b(
                  'filter',
                  {
                    id: p.value,
                    x: '-60%',
                    y: '-60%',
                    width: '220%',
                    height: '220%'
                  },
                  [
                    b(
                      'feGaussianBlur',
                      {
                        stdDeviation: s.value / 3,
                        result: 'blur'
                      },
                      null,
                      8,
                      vk
                    ),
                    T[0] ||
                      (T[0] = b(
                        'feMerge',
                        null,
                        [
                          b('feMergeNode', { in: 'blur' }),
                          b('feMergeNode', { in: 'SourceGraphic' })
                        ],
                        -1
                        /* CACHED */
                      ))
                  ],
                  8,
                  hk
                ),
                I(' 粒子径向渐变（中心亮、边缘透明） '),
                b(
                  'radialGradient',
                  {
                    id: v.value,
                    cx: '50%',
                    cy: '50%',
                    r: '50%'
                  },
                  [
                    b(
                      'stop',
                      {
                        offset: '0%',
                        'stop-color': m.value.particle,
                        'stop-opacity': '1'
                      },
                      null,
                      8,
                      gk
                    ),
                    b(
                      'stop',
                      {
                        offset: '100%',
                        'stop-color': m.value.primary,
                        'stop-opacity': '0'
                      },
                      null,
                      8,
                      Mk
                    )
                  ],
                  8,
                  yk
                )
              ]),
              I(' ① 发光底层（glow / particles 模式下激活） '),
              L.value
                ? ($(),
                  j(
                    'path',
                    {
                      key: 0,
                      d: e.path,
                      class: 'flow-edge-glow',
                      style: re({
                        stroke: m.value.glow,
                        strokeWidth: _.value * 4,
                        opacity: 0.35,
                        filter: `url(#${p.value})`
                      }),
                      fill: 'none'
                    },
                    null,
                    12,
                    bk
                  ))
                : I('v-if', !0),
              I(' ② 主线条 '),
              b(
                'path',
                {
                  d: e.path,
                  class: 'flow-edge-main',
                  style: re(D.value),
                  fill: 'none',
                  filter: L.value ? `url(#${p.value})` : void 0
                },
                null,
                12,
                Yk
              ),
              I(' ③ pulse 模式：叠加闪烁层 '),
              o.value === 'pulse' && w.value
                ? ($(),
                  j(
                    'path',
                    {
                      key: 1,
                      d: e.path,
                      class: 'flow-edge-pulse',
                      style: re({
                        stroke: m.value.primary,
                        strokeWidth: _.value + 2,
                        opacity: E.value,
                        transition: `opacity ${i.value / 2}s ease-in-out`,
                        filter: `url(#${p.value})`
                      }),
                      fill: 'none'
                    },
                    null,
                    12,
                    wk
                  ))
                : I('v-if', !0),
              I(' ④ wave 模式：流动虚线 '),
              o.value === 'wave' && w.value
                ? ($(),
                  j(
                    'path',
                    {
                      key: 2,
                      d: e.path,
                      class: 'flow-edge-wave',
                      style: re({
                        stroke: m.value.particle,
                        strokeWidth: _.value,
                        strokeDasharray: '8 4',
                        fill: 'none'
                      })
                    },
                    null,
                    12,
                    xk
                  ))
                : I('v-if', !0),
              I(' ⑤ particles 模式：粒子沿路径流动 '),
              o.value === 'particles' && w.value
                ? ($(),
                  j(
                    pe,
                    { key: 3 },
                    [
                      I(' 供 animateMotion 引用的命名路径（不可见） '),
                      b(
                        'path',
                        {
                          id: g.value,
                          d: e.path,
                          fill: 'none',
                          stroke: 'none'
                        },
                        null,
                        8,
                        Lk
                      ),
                      ($(!0),
                      j(
                        pe,
                        null,
                        ke(
                          M.value,
                          (x) => (
                            $(),
                            j(
                              'circle',
                              {
                                key: x.key,
                                r: '4',
                                fill: `url(#${v.value})`,
                                class: 'flow-particle'
                              },
                              [
                                b(
                                  'animateMotion',
                                  {
                                    dur: `${i.value}s`,
                                    begin: `${x.delay}s`,
                                    repeatCount: 'indefinite',
                                    calcMode: 'spline',
                                    keySplines: '0.5 0 0.5 1',
                                    keyTimes: '0;1',
                                    rotate: 'auto'
                                  },
                                  [
                                    b(
                                      'mpath',
                                      {
                                        href: `#${g.value}`
                                      },
                                      null,
                                      8,
                                      Dk
                                    )
                                  ],
                                  8,
                                  Sk
                                )
                              ],
                              8,
                              kk
                            )
                          )
                        ),
                        128
                        /* KEYED_FRAGMENT */
                      ))
                    ],
                    64
                    /* STABLE_FRAGMENT */
                  ))
                : I('v-if', !0),
              I(' ⑥ 点击热区（扩大交互面积，不可见） '),
              b(
                'path',
                {
                  d: e.path,
                  style: re(Y.value),
                  class: 'flow-edge-hitarea'
                },
                null,
                12,
                Ek
              ),
              I(' ⑦ 连线标签 '),
              d.value
                ? ($(),
                  j(
                    'foreignObject',
                    {
                      key: 4,
                      x: h.value - 38,
                      y: y.value - 14,
                      width: '76',
                      height: '28'
                    },
                    [
                      b(
                        'div',
                        $k,
                        ae(d.value),
                        1
                        /* TEXT */
                      )
                    ],
                    8,
                    Tk
                  ))
                : I('v-if', !0),
              I(' ⑧ 状态指示点（无标签时显示） '),
              r.value !== 'idle' && !d.value
                ? ($(),
                  j(
                    'g',
                    {
                      key: 5,
                      transform: `translate(${h.value}, ${y.value})`
                    },
                    [
                      b(
                        'circle',
                        {
                          r: '9',
                          fill: m.value.primary,
                          opacity: '0.12'
                        },
                        null,
                        8,
                        jk
                      ),
                      b(
                        'circle',
                        {
                          r: '4',
                          fill: m.value.primary
                        },
                        null,
                        8,
                        Ck
                      )
                    ],
                    8,
                    Hk
                  ))
                : I('v-if', !0)
            ],
            2
            /* CLASS */
          )
        )
      )
    }
  }),
  dI = /* @__PURE__ */ ue(Ak, [['__scopeId', 'data-v-95cb5710']]),
  qk = {
    class: 'yh-flow-edges',
    style: {
      overflow: 'visible',
      position: 'absolute',
      top: '0',
      left: '0',
      width: '100%',
      height: '100%',
      'pointer-events': 'none',
      'z-index': '5'
    }
  },
  Fk = ['id'],
  Rk = ['x', 'y', 'width'],
  Ik = ['data-edge-id', 'onClick', 'onDblclick', 'onContextmenu'],
  Pk = ['d'],
  Bk = ['d', 'stroke', 'stroke-width', 'mask'],
  Nk = ['x', 'y'],
  Ok = {
    style: {
      width: '100%',
      height: '100%',
      display: 'flex',
      'align-items': 'center',
      'justify-content': 'center'
    }
  },
  zk = /* @__PURE__ */ ie({
    __name: 'EdgeRenderer',
    props: {
      edges: {},
      nodes: {},
      edgeTypes: {},
      transform: {},
      connectingEdge: {},
      updatingEdgeId: {}
    },
    emits: ['edge-click', 'edge-dblclick', 'edge-contextmenu', 'edge-update-start'],
    setup(e, { emit: a }) {
      const n = e,
        r = (u) => {
          var l
          return n.edgeTypes && n.edgeTypes[u]
            ? n.edgeTypes[u]
            : (l = lw(u || 'default')) == null
              ? void 0
              : l.component
        },
        o = a,
        s = J(() => {
          const u = /* @__PURE__ */ new Map()
          return (n.nodes.forEach((l) => u.set(l.id, l)), u)
        }),
        t = (u) => {
          if (!u) return {}
          const l = {
            color: u.labelColor || 'var(--flow-edge-label-color, #000)',
            ...u.labelStyle
          }
          return (
            u.labelShowBg === !0
              ? ((l.backgroundColor =
                  u.labelBgColor || 'var(--flow-edge-label-background, #f1f5f9)'),
                (l.padding = '0 6px'),
                (l.borderRadius = '2px'),
                (l.border = '1px solid var(--flow-edge-stroke, #ddd)'))
              : (l.backgroundColor = 'transparent'),
            l
          )
        },
        i = J(() => {
          var l, d
          const u = []
          for (const c of n.edges) {
            if (!c || c.hidden || (n.updatingEdgeId && c.id === n.updatingEdgeId)) continue
            const _ = s.value.get(c.source),
              f = s.value.get(c.target)
            if (!_ || !f) continue
            const m = c.sourceHandle || 'right',
              h = c.targetHandle || 'left',
              y = yt(_, m, c.sourceHandle),
              p = yt(f, h, c.targetHandle),
              v = {
                sourceX: y.x,
                sourceY: y.y,
                targetX: p.x,
                targetY: p.y,
                sourcePosition: m,
                targetPosition: h
              },
              g = c.type || 'bezier',
              M = Ag(g, v),
              w = ow({ ...v, type: g }),
              D = (c.label || '').replace(/<[^>]*>/g, ''),
              Y = Math.min(D.length * 7, 120),
              E =
                ((l = c.style) == null ? void 0 : l.stroke) ||
                (c.selected
                  ? 'var(--flow-edge-selected-stroke, #3b82f6)'
                  : 'var(--flow-edge-stroke, #b1b1b7)'),
              k = ((d = c.style) == null ? void 0 : d.strokeWidth) ?? 1.5
            u.push({
              edge: c,
              style: c.style,
              path: M,
              sourceX: y.x,
              sourceY: y.y,
              targetX: p.x,
              targetY: p.y,
              labelX: w.x,
              labelY: w.y,
              labelWidth: Y,
              stroke: E,
              strokeWidth: k
            })
          }
          return u
        })
      return (u, l) => (
        $(),
        j('svg', qk, [
          b('defs', null, [
            I(' Dynamic masks to create a true gap in the line behind the label '),
            ($(!0),
            j(
              pe,
              null,
              ke(
                i.value,
                (d) => (
                  $(),
                  j(
                    'mask',
                    {
                      key: `mask-${d.edge.id}`,
                      id: `yh-mask-${d.edge.id.replace(/\s/g, '')}`
                    },
                    [
                      l[0] ||
                        (l[0] = b(
                          'rect',
                          {
                            x: '-5000',
                            y: '-5000',
                            width: '10000',
                            height: '10000',
                            fill: 'white'
                          },
                          null,
                          -1
                          /* CACHED */
                        )),
                      b(
                        'rect',
                        {
                          x: d.labelX - d.labelWidth / 2 - 4,
                          y: d.labelY - 10,
                          width: d.labelWidth + 8,
                          height: '20',
                          fill: 'black'
                        },
                        null,
                        8,
                        Rk
                      )
                    ],
                    8,
                    Fk
                  )
                )
              ),
              128
              /* KEYED_FRAGMENT */
            ))
          ]),
          ($(!0),
          j(
            pe,
            null,
            ke(
              i.value,
              (d) => (
                $(),
                j(
                  'g',
                  {
                    key: d.edge.id,
                    class: te([
                      'yh-flow-edge-group',
                      { 'is-selected': d.edge.selected, 'is-animated': d.edge.animated }
                    ]),
                    'data-edge-id': d.edge.id,
                    style: re({
                      color: d.stroke,
                      pointerEvents: 'auto',
                      cursor: 'pointer',
                      '--stroke-width': d.strokeWidth + 'px'
                    }),
                    onClick: we((c) => o('edge-click', c, d.edge), ['stop']),
                    onDblclick: we((c) => o('edge-dblclick', c, d.edge), ['stop']),
                    onContextmenu: we((c) => o('edge-contextmenu', c, d.edge), ['stop', 'prevent'])
                  },
                  [
                    it(
                      u.$slots,
                      'edge',
                      Et({ ref_for: !0 }, d),
                      () => [
                        I(' Automatic Custom Edge Component '),
                        r(d.edge.type || 'default')
                          ? ($(),
                            Ve(
                              Aa(r(d.edge.type || 'default')),
                              Et(
                                {
                                  key: 0,
                                  ref_for: !0
                                },
                                d
                              ),
                              null,
                              16
                              /* FULL_PROPS */
                            ))
                          : ($(),
                            j(
                              pe,
                              { key: 1 },
                              [
                                I(' Interaction Path (Hitbox) '),
                                b(
                                  'path',
                                  {
                                    d: d.path,
                                    stroke: 'transparent',
                                    'stroke-width': '20',
                                    fill: 'none',
                                    style: { cursor: 'pointer', 'pointer-events': 'all' }
                                  },
                                  null,
                                  8,
                                  Pk
                                ),
                                I(' Visible Path '),
                                b(
                                  'path',
                                  {
                                    d: d.path,
                                    stroke: d.stroke,
                                    'stroke-width': d.strokeWidth,
                                    fill: 'none',
                                    class: te({
                                      'yh-flow-edge-path': !0,
                                      'is-animated': d.edge.animated
                                    }),
                                    mask: d.edge.label
                                      ? `url(#yh-mask-${d.edge.id.replace(/\s/g, '')})`
                                      : void 0,
                                    style: re({
                                      pointerEvents: 'none',
                                      transition: 'stroke 0.2s, stroke-width 0.2s',
                                      stroke: d.stroke
                                    })
                                  },
                                  null,
                                  14,
                                  Bk
                                ),
                                I(' Default Label '),
                                d.edge.label
                                  ? ($(),
                                    j(
                                      'foreignObject',
                                      {
                                        key: 0,
                                        x: d.labelX - 75,
                                        y: d.labelY - 15,
                                        width: '150',
                                        height: '30',
                                        style: { 'pointer-events': 'auto' }
                                      },
                                      [
                                        b('div', Ok, [
                                          b(
                                            'div',
                                            {
                                              class: 'yh-flow-edge-label',
                                              style: re(t(d.edge))
                                            },
                                            ae(d.edge.label),
                                            5
                                            /* TEXT, STYLE */
                                          )
                                        ])
                                      ],
                                      8,
                                      Nk
                                    ))
                                  : I('v-if', !0)
                              ],
                              64
                              /* STABLE_FRAGMENT */
                            ))
                      ],
                      !0
                    )
                  ],
                  46,
                  Ik
                )
              )
            ),
            128
            /* KEYED_FRAGMENT */
          ))
        ])
      )
    }
  }),
  Gk = /* @__PURE__ */ ue(zk, [['__scopeId', 'data-v-ea192faf']]),
  Jk = {
    class: 'yh-flow-edge-handles',
    style: {
      overflow: 'visible',
      position: 'absolute',
      top: '0',
      left: '0',
      width: '100%',
      height: '100%',
      'pointer-events': 'none',
      'z-index': '10'
    }
  },
  Uk = ['onMousedown'],
  Wk = ['cx', 'cy'],
  Vk = ['cx', 'cy'],
  Kk = ['onMousedown'],
  Xk = ['cx', 'cy'],
  Zk = ['cx', 'cy'],
  Qk = /* @__PURE__ */ ie({
    __name: 'EdgeHandlesRenderer',
    props: {
      edges: {},
      nodes: {}
    },
    emits: ['edge-update-start'],
    setup(e, { emit: a }) {
      const n = e,
        r = a,
        o = J(() => {
          const t = /* @__PURE__ */ new Map()
          return (n.nodes.forEach((i) => t.set(i.id, i)), t)
        }),
        s = J(() => {
          const t = []
          for (const i of n.edges)
            if (i && i.selected && i.updatable) {
              const u = o.value.get(i.source),
                l = o.value.get(i.target)
              if (!u || !l) continue
              const d = i.sourceHandle || 'right',
                c = i.targetHandle || 'left',
                _ = yt(u, d, i.sourceHandle),
                f = yt(l, c, i.targetHandle)
              t.push({
                edge: i,
                sourceX: _.x,
                sourceY: _.y,
                targetX: f.x,
                targetY: f.y
              })
            }
          return t
        })
      return (t, i) => (
        $(),
        j('svg', Jk, [
          ($(!0),
          j(
            pe,
            null,
            ke(
              s.value,
              (u) => (
                $(),
                j(
                  'g',
                  {
                    key: u.edge.id
                  },
                  [
                    I(' Source Handle with interaction overlay '),
                    u.edge.updatable === !0 || u.edge.updatable === 'source'
                      ? ($(),
                        j(
                          'g',
                          {
                            key: 0,
                            class: 'yh-flow-edge-handle-group',
                            style: { cursor: 'crosshair', 'pointer-events': 'auto' },
                            onMousedown: we(
                              (l) => r('edge-update-start', l, u.edge, 'source'),
                              ['stop']
                            )
                          },
                          [
                            b(
                              'circle',
                              {
                                cx: u.sourceX,
                                cy: u.sourceY,
                                r: '10',
                                fill: 'transparent'
                              },
                              null,
                              8,
                              Wk
                            ),
                            b(
                              'circle',
                              {
                                cx: u.sourceX,
                                cy: u.sourceY,
                                r: '4',
                                fill: '#3b82f6'
                              },
                              null,
                              8,
                              Vk
                            )
                          ],
                          40,
                          Uk
                        ))
                      : I('v-if', !0),
                    I(' Target Handle with interaction overlay '),
                    u.edge.updatable === !0 || u.edge.updatable === 'target'
                      ? ($(),
                        j(
                          'g',
                          {
                            key: 1,
                            class: 'yh-flow-edge-handle-group',
                            style: { cursor: 'crosshair', 'pointer-events': 'auto' },
                            onMousedown: we(
                              (l) => r('edge-update-start', l, u.edge, 'target'),
                              ['stop']
                            )
                          },
                          [
                            b(
                              'circle',
                              {
                                cx: u.targetX,
                                cy: u.targetY,
                                r: '10',
                                fill: 'transparent'
                              },
                              null,
                              8,
                              Xk
                            ),
                            b(
                              'circle',
                              {
                                cx: u.targetX,
                                cy: u.targetY,
                                r: '4',
                                fill: '#1a192b'
                              },
                              null,
                              8,
                              Zk
                            )
                          ],
                          40,
                          Kk
                        ))
                      : I('v-if', !0)
                  ]
                )
              )
            ),
            128
            /* KEYED_FRAGMENT */
          ))
        ])
      )
    }
  }),
  eS = { class: 'yh-flow-nodes' },
  tS = ['id', 'onMousedown', 'onClick', 'onDblclick', 'onContextmenu'],
  rS = ['data-handle-id', 'onMousedown'],
  nS = ['data-handle-id', 'onMousedown'],
  aS = { class: 'yh-flow-node__content' },
  xc = 3,
  oS = /* @__PURE__ */ ie({
    __name: 'NodeRenderer',
    props: {
      nodes: {},
      nodeTypes: { default: () => ({}) },
      transform: {},
      draggable: { type: Boolean, default: !0 },
      connectable: { type: Boolean, default: !0 },
      readonly: { type: Boolean, default: !1 }
    },
    emits: [
      'node-click',
      'node-dblclick',
      'node-contextmenu',
      'node-drag-start',
      'node-drag',
      'node-drag-end',
      'connect-start',
      'node-select-toggle'
    ],
    setup(e, { emit: a }) {
      const n = e,
        r = a,
        o = (Y) => {
          var E, k
          return Y === 'diamond'
            ? oL
            : Y === 'database'
              ? fL
              : n.nodeTypes && n.nodeTypes[Y]
                ? n.nodeTypes[Y]
                : ((E = Fg(Y)) == null ? void 0 : E.component) ||
                  ((k = _w(Y)) == null ? void 0 : k.component)
        },
        s = J(() => n.nodes.filter((Y) => !Y.hidden)),
        t = (Y) => {
          const E = Y.width || 150,
            k = Y.height || 40
          let S = Y.zIndex || 10
          return (
            Y.type === 'group'
              ? (S = Y.selected ? 2 : 1)
              : (S = Y.selected ? 100 : Math.max(10, S)),
            {
              transform: `translate(${Y.position.x}px, ${Y.position.y}px)`,
              width: `${E}px`,
              height: `${k}px`,
              zIndex: S,
              '--flow-node-label-color': Y.labelColor,
              '--flow-node-description-color': Y.descriptionColor,
              ...Y.style
            }
          )
        },
        i = (Y) => {
          const {
            id: E,
            type: k,
            data: S,
            position: O,
            width: z,
            height: T,
            selected: x,
            dragging: H,
            connectable: G,
            zIndex: N,
            style: W,
            labelColor: Z,
            descriptionColor: K
          } = Y
          return {
            id: E,
            type: k,
            data: S,
            position: O,
            width: z,
            height: T,
            selected: x,
            dragging: H,
            connectable: G,
            zIndex: N,
            style: W,
            labelColor: Z,
            descriptionColor: K
          }
        },
        u = (Y, E) => {
          if (Y.handleBounds) {
            const k = []
            return (
              Y.handleBounds.top && k.push(...Y.handleBounds.top),
              Y.handleBounds.right && k.push(...Y.handleBounds.right),
              Y.handleBounds.bottom && k.push(...Y.handleBounds.bottom),
              Y.handleBounds.left && k.push(...Y.handleBounds.left),
              k.filter((S) => S.type === E)
            )
          }
          return Y.type === 'group'
            ? []
            : Y.type === 'input'
              ? E === 'source'
                ? [{ type: 'source', position: 'right' }]
                : []
              : Y.type === 'output'
                ? E === 'target'
                  ? [{ type: 'target', position: 'left' }]
                  : []
                : Y.type === 'bpmn-start'
                  ? E === 'source'
                    ? [{ type: 'source', position: 'right' }]
                    : []
                  : Y.type === 'bpmn-end'
                    ? E === 'target'
                      ? [{ type: 'target', position: 'left' }]
                      : []
                    : Y.type === 'bpmn-task' ||
                        Y.type === 'bpmn-service-task' ||
                        Y.type === 'bpmn-user-task'
                      ? E === 'source'
                        ? [{ type: 'source', position: 'right' }]
                        : [{ type: 'target', position: 'left' }]
                      : Y.type === 'bpmn-exclusive-gateway' ||
                          Y.type === 'bpmn-parallel-gateway' ||
                          Y.type === 'bpmn-inclusive-gateway'
                        ? E === 'source'
                          ? [
                              { type: 'source', position: 'right' },
                              { type: 'source', position: 'bottom' }
                            ]
                          : [{ type: 'target', position: 'left' }]
                        : Y.type === 'ai-start'
                          ? E === 'source'
                            ? [{ type: 'source', position: 'right' }]
                            : []
                          : Y.type === 'ai-end'
                            ? E === 'target'
                              ? [{ type: 'target', position: 'left' }]
                              : []
                            : Y.type === 'ai-llm' ||
                                Y.type === 'ai-prompt' ||
                                Y.type === 'ai-agent' ||
                                Y.type === 'ai-tool' ||
                                Y.type === 'ai-memory'
                              ? E === 'source'
                                ? [{ type: 'source', position: 'right' }]
                                : [{ type: 'target', position: 'left' }]
                              : Y.type === 'ai-condition'
                                ? E === 'source'
                                  ? [
                                      { type: 'source', position: 'right' },
                                      { type: 'source', position: 'bottom' }
                                    ]
                                  : [{ type: 'target', position: 'left' }]
                                : E === 'source'
                                  ? [
                                      { type: 'source', position: 'right' },
                                      { type: 'source', position: 'bottom' }
                                    ]
                                  : [
                                      { type: 'target', position: 'left' },
                                      { type: 'target', position: 'top' }
                                    ]
        },
        l = ee(null),
        d = ee({ x: 0, y: 0 }),
        c = ee({ x: 0, y: 0 }),
        _ = ee([]),
        f = ee(/* @__PURE__ */ new Map()),
        m = ee(!1),
        h = ee(null),
        y = ee(null),
        p = (Y, E) => {
          if (n.readonly || !n.draggable || E.draggable === !1) return
          const k = Y.target
          if (
            k.closest('.yh-flow-handle') ||
            k.closest('.resizer-handle') ||
            k.closest('.yh-flow-node-toolbar')
          )
            return
          const S = window.getSelection()
          ;(S && S.removeAllRanges(), (h.value = E), (y.value = Y), (m.value = !1))
          const O = E.selected,
            z = /* @__PURE__ */ new Set(),
            T = (N) => {
              z.has(N) ||
                (z.add(N),
                n.nodes.forEach((W) => {
                  W.parentId === N && T(W.id)
                }))
            },
            x = Y.shiftKey || Y.metaKey || Y.ctrlKey,
            H = n.nodes.filter((N) => N.selected && N.id !== E.id)
          let G = [E.id]
          ;((x || O) && H.length > 0 && (G = [E.id, ...H.map((N) => N.id)]),
            G.forEach(T),
            (_.value = Array.from(z)),
            (f.value = /* @__PURE__ */ new Map()),
            _.value.forEach((N) => {
              const W = n.nodes.find((Z) => Z.id === N)
              W && f.value.set(N, { ...W.position })
            }),
            _.value.length === 1
              ? ((l.value = E.id), (c.value = { ...E.position }))
              : (l.value = null),
            (d.value = { x: Y.clientX, y: Y.clientY }),
            document.addEventListener('mousemove', v),
            document.addEventListener('mouseup', g))
        },
        v = (Y) => {
          if (_.value.length === 0) return
          const E = Y.clientX - d.value.x,
            k = Y.clientY - d.value.y
          if (!m.value && Math.abs(E) < xc && Math.abs(k) < xc) return
          if (!m.value) {
            m.value = !0
            const z = h.value
            z && r('node-drag-start', Y, z)
          }
          const S = (Y.clientX - d.value.x) / n.transform.zoom,
            O = (Y.clientY - d.value.y) / n.transform.zoom
          _.value.forEach((z) => {
            const T = f.value.get(z)
            if (T) {
              const x = {
                  x: T.x + S,
                  y: T.y + O
                },
                H = n.nodes.find((G) => G.id === z)
              H && r('node-drag', Y, H, x)
            }
          })
        },
        g = (Y) => {
          ;(_.value.length > 0 &&
            (m.value &&
              _.value.forEach((E) => {
                const k = n.nodes.find((S) => S.id === E)
                k && r('node-drag-end', Y, k)
              }),
            (_.value = []),
            (f.value = /* @__PURE__ */ new Map())),
            !m.value && h.value && r('node-click', Y, h.value),
            (l.value = null),
            (h.value = null),
            (y.value = null),
            document.removeEventListener('mousemove', v),
            document.removeEventListener('mouseup', g))
        },
        M = (Y, E) => {},
        w = (Y, E) => {
          r('node-dblclick', Y, E)
        },
        L = (Y, E) => {
          r('node-contextmenu', Y, E)
        },
        D = (Y, E, k) => {
          r('connect-start', Y, E.id, k.id || k.position || '', k.type)
        }
      return (Y, E) => (
        $(),
        j('div', eS, [
          ($(!0),
          j(
            pe,
            null,
            ke(
              s.value,
              (k) => (
                $(),
                j(
                  'div',
                  {
                    key: k.id,
                    id: `node-${k.id}`,
                    class: te([
                      'yh-flow-node',
                      {
                        'is-selected': k.selected,
                        'is-dragging': k.dragging,
                        'is-hidden': k.hidden,
                        [`type-${k.type}`]: !0
                      }
                    ]),
                    style: re(t(k)),
                    onMousedown: (S) => p(S, k),
                    onClick: (S) => M(),
                    onDblclick: (S) => w(S, k),
                    onContextmenu: (S) => L(S, k)
                  },
                  [
                    I(' Handle (连接点) '),
                    n.connectable !== !1 && k.connectable !== !1
                      ? ($(),
                        j(
                          pe,
                          { key: 0 },
                          [
                            I(' Source handles '),
                            ($(!0),
                            j(
                              pe,
                              null,
                              ke(
                                u(k, 'source'),
                                (S) => (
                                  $(),
                                  j(
                                    'div',
                                    {
                                      key: `handle-source-${S.id || S.position}`,
                                      class: te([
                                        'yh-flow-handle is-source',
                                        `position-${S.position}`
                                      ]),
                                      'data-handle-id': S.id,
                                      'data-handle-type': 'source',
                                      onMousedown: we((O) => D(O, k, S), ['stop'])
                                    },
                                    null,
                                    42,
                                    rS
                                  )
                                )
                              ),
                              128
                              /* KEYED_FRAGMENT */
                            )),
                            I(' Target handles '),
                            ($(!0),
                            j(
                              pe,
                              null,
                              ke(
                                u(k, 'target'),
                                (S) => (
                                  $(),
                                  j(
                                    'div',
                                    {
                                      key: `handle-target-${S.id || S.position}`,
                                      class: te([
                                        'yh-flow-handle is-target',
                                        `position-${S.position}`
                                      ]),
                                      'data-handle-id': S.id,
                                      'data-handle-type': 'target',
                                      onMousedown: we((O) => D(O, k, S), ['stop'])
                                    },
                                    null,
                                    42,
                                    nS
                                  )
                                )
                              ),
                              128
                              /* KEYED_FRAGMENT */
                            ))
                          ],
                          64
                          /* STABLE_FRAGMENT */
                        ))
                      : I('v-if', !0),
                    I(' 节点内容 '),
                    b('div', aS, [
                      it(
                        Y.$slots,
                        'node',
                        { node: k },
                        () => {
                          var S
                          return [
                            I(' Automatic Custom Node Component '),
                            o(k.type)
                              ? ($(),
                                Ve(
                                  Aa(o(k.type)),
                                  Et(
                                    {
                                      key: 0,
                                      ref_for: !0
                                    },
                                    i(k),
                                    { node: k }
                                  ),
                                  null,
                                  16,
                                  ['node']
                                ))
                              : ($(),
                                j(
                                  'div',
                                  {
                                    key: 1,
                                    class: 'yh-flow-node__header',
                                    style: re({ color: k.labelColor })
                                  },
                                  ae(((S = k.data) == null ? void 0 : S.label) || k.id),
                                  5
                                  /* TEXT, STYLE */
                                ))
                          ]
                        },
                        !0
                      )
                    ])
                  ],
                  46,
                  tS
                )
              )
            ),
            128
            /* KEYED_FRAGMENT */
          ))
        ])
      )
    }
  }),
  sS = /* @__PURE__ */ ue(oS, [['__scopeId', 'data-v-48ebb223']]),
  iS = /* @__PURE__ */ ie({
    __name: 'SelectionBox',
    props: {
      selectionRect: {},
      transform: {}
    },
    setup(e) {
      const a = e,
        n = J(() => {
          if (!a.selectionRect) return {}
          const r = a.selectionRect.x * a.transform.zoom + a.transform.x,
            o = a.selectionRect.y * a.transform.zoom + a.transform.y,
            s = a.selectionRect.width * a.transform.zoom,
            t = a.selectionRect.height * a.transform.zoom
          return {
            left: `${r}px`,
            top: `${o}px`,
            width: `${s}px`,
            height: `${t}px`
          }
        })
      return (r, o) =>
        e.selectionRect
          ? ($(),
            j(
              'div',
              {
                key: 0,
                class: 'yh-flow-selection-box',
                style: re(n.value)
              },
              null,
              4
              /* STYLE */
            ))
          : I('v-if', !0)
    }
  }),
  uS = /* @__PURE__ */ ue(iS, [['__scopeId', 'data-v-7a5e308e']]),
  lS = {
    key: 0,
    class: 'node-edit-panel'
  },
  dS = { class: 'panel-content' },
  cS = { class: 'form-group' },
  _S = { class: 'form-group' },
  fS = { class: 'form-group' },
  mS = { class: 'size-inputs' },
  pS = { class: 'form-group' },
  hS = { class: 'color-picker-row' },
  vS = ['value'],
  yS = { class: 'color-value' },
  gS = { class: 'form-group' },
  MS = { class: 'color-picker-row' },
  bS = ['value'],
  YS = { class: 'color-value' },
  wS = { class: 'form-group' },
  xS = ['value'],
  LS = { class: 'form-group' },
  kS = { class: 'color-picker-row' },
  SS = ['value'],
  DS = { class: 'color-value' },
  ES = { class: 'form-group' },
  TS = { class: 'color-picker-row' },
  $S = ['value'],
  HS = { class: 'color-value' },
  jS = /* @__PURE__ */ ie({
    __name: 'NodeEditPanel',
    props: {
      node: {},
      visible: { type: Boolean }
    },
    emits: ['update', 'close'],
    setup(e, { emit: a }) {
      const n = e,
        r = a,
        o = ee({
          label: '',
          description: ''
        })
      Le(
        () => n.node,
        (m) => {
          var h, y
          if (m) {
            const p = m.data,
              v = p.label || p.title || p.name || p.text || m.id
            o.value = {
              label: String(v),
              description: p.description || p.desc || '',
              labelColor: m.labelColor || '#303133',
              descriptionColor: m.descriptionColor || '#909399',
              width:
                m.width ||
                ((h = document.getElementById(`node-${m.id}`)) == null ? void 0 : h.offsetWidth) ||
                150,
              height:
                m.height ||
                ((y = document.getElementById(`node-${m.id}`)) == null ? void 0 : y.offsetHeight) ||
                40,
              type: m.type
            }
          }
        },
        { immediate: !0 }
      )
      const s = (m) => {
          ;((o.value.labelColor = m), r('update', { labelColor: m }))
        },
        t = (m) => {
          ;((o.value.descriptionColor = m), r('update', { descriptionColor: m }))
        },
        i = () => {
          if (!n.node) return
          const m = { ...n.node.data }
          ;('label' in m || !('title' in m || 'name' in m || 'text' in m)
            ? (m.label = o.value.label)
            : 'title' in m
              ? (m.title = o.value.label)
              : 'name' in m
                ? (m.name = o.value.label)
                : 'text' in m && (m.text = o.value.label),
            r('update', { data: m }))
        },
        u = () => {
          if (!n.node) return
          const m = { ...n.node.data }
          ;('description' in m || !('desc' in m)
            ? (m.description = o.value.description)
            : (m.desc = o.value.description),
            r('update', { data: m }))
        },
        l = (m, h) => {
          var p
          const y = { ...((p = n.node) == null ? void 0 : p.style), [m]: h }
          r('update', { style: y })
        },
        d = () => {
          r('update', {
            width: o.value.width,
            height: o.value.height
          })
        },
        c = () => {
          r('close')
        },
        _ = (m) => {
          const h = m.target.value
          l('borderRadius', `${h}px`)
        },
        f = () => {
          var h, y
          const m = (y = (h = n.node) == null ? void 0 : h.style) == null ? void 0 : y.border
          if (typeof m == 'string') {
            const p = m.match(/#(?:[0-9a-fA-F]{3}){1,2}|rgb\(.*?\)|rgba\(.*?\)/)
            return p ? p[0] : '#dddddd'
          }
          return '#dddddd'
        }
      return (m, h) => (
        $(),
        Ve(Ua, { to: 'body' }, [
          We(
            Od,
            { name: 'slide-fade' },
            {
              default: Tt(() => {
                var y, p, v
                return [
                  e.visible && e.node
                    ? ($(),
                      j('div', lS, [
                        b('div', { class: 'panel-header' }, [
                          h[8] ||
                            (h[8] = b(
                              'span',
                              { class: 'panel-title' },
                              '编辑节点',
                              -1
                              /* CACHED */
                            )),
                          b(
                            'button',
                            {
                              class: 'close-btn',
                              onClick: c
                            },
                            '×'
                          )
                        ]),
                        b('div', dS, [
                          b('div', cS, [
                            h[9] ||
                              (h[9] = b(
                                'label',
                                null,
                                '标签',
                                -1
                                /* CACHED */
                              )),
                            He(
                              b(
                                'input',
                                {
                                  'onUpdate:modelValue':
                                    h[0] || (h[0] = (g) => (o.value.label = g)),
                                  type: 'text',
                                  placeholder: '节点标签',
                                  onBlur: i,
                                  onKeyup: zd(i, ['enter'])
                                },
                                null,
                                544
                                /* NEED_HYDRATION, NEED_PATCH */
                              ),
                              [[Re, o.value.label]]
                            )
                          ]),
                          b('div', _S, [
                            h[10] ||
                              (h[10] = b(
                                'label',
                                null,
                                '描述',
                                -1
                                /* CACHED */
                              )),
                            He(
                              b(
                                'textarea',
                                {
                                  'onUpdate:modelValue':
                                    h[1] || (h[1] = (g) => (o.value.description = g)),
                                  placeholder: '节点描述',
                                  rows: '2',
                                  onBlur: u
                                },
                                null,
                                544
                                /* NEED_HYDRATION, NEED_PATCH */
                              ),
                              [[Re, o.value.description]]
                            )
                          ]),
                          b('div', fS, [
                            h[12] ||
                              (h[12] = b(
                                'label',
                                null,
                                '尺寸',
                                -1
                                /* CACHED */
                              )),
                            b('div', mS, [
                              He(
                                b(
                                  'input',
                                  {
                                    'onUpdate:modelValue':
                                      h[2] || (h[2] = (g) => (o.value.width = g)),
                                    type: 'number',
                                    min: '50',
                                    max: '800',
                                    placeholder: '宽度',
                                    onBlur: d
                                  },
                                  null,
                                  544
                                  /* NEED_HYDRATION, NEED_PATCH */
                                ),
                                [[Re, o.value.width, void 0, { number: !0 }]]
                              ),
                              h[11] ||
                                (h[11] = b(
                                  'span',
                                  null,
                                  '×',
                                  -1
                                  /* CACHED */
                                )),
                              He(
                                b(
                                  'input',
                                  {
                                    'onUpdate:modelValue':
                                      h[3] || (h[3] = (g) => (o.value.height = g)),
                                    type: 'number',
                                    min: '30',
                                    max: '600',
                                    placeholder: '高度',
                                    onBlur: d
                                  },
                                  null,
                                  544
                                  /* NEED_HYDRATION, NEED_PATCH */
                                ),
                                [[Re, o.value.height, void 0, { number: !0 }]]
                              )
                            ])
                          ]),
                          b('div', pS, [
                            h[13] ||
                              (h[13] = b(
                                'label',
                                null,
                                '背景色',
                                -1
                                /* CACHED */
                              )),
                            b('div', hS, [
                              b(
                                'input',
                                {
                                  type: 'color',
                                  value:
                                    ((y = e.node.style) == null ? void 0 : y.backgroundColor) ||
                                    '#ffffff',
                                  class: 'modern-color-picker',
                                  onInput:
                                    h[4] || (h[4] = (g) => l('backgroundColor', g.target.value))
                                },
                                null,
                                40,
                                vS
                              ),
                              b(
                                'span',
                                yS,
                                ae(
                                  ((p = e.node.style) == null ? void 0 : p.backgroundColor) ||
                                    '#ffffff'
                                ),
                                1
                                /* TEXT */
                              )
                            ])
                          ]),
                          b('div', gS, [
                            h[14] ||
                              (h[14] = b(
                                'label',
                                null,
                                '边框颜色',
                                -1
                                /* CACHED */
                              )),
                            b('div', MS, [
                              b(
                                'input',
                                {
                                  type: 'color',
                                  value: f(),
                                  class: 'modern-color-picker',
                                  onInput:
                                    h[5] ||
                                    (h[5] = (g) => l('border', `1px solid ${g.target.value}`))
                                },
                                null,
                                40,
                                bS
                              ),
                              b(
                                'span',
                                YS,
                                ae(f()),
                                1
                                /* TEXT */
                              )
                            ])
                          ]),
                          b('div', wS, [
                            h[15] ||
                              (h[15] = b(
                                'label',
                                null,
                                '圆角',
                                -1
                                /* CACHED */
                              )),
                            b(
                              'input',
                              {
                                value: parseInt(
                                  String(
                                    ((v = e.node.style) == null ? void 0 : v.borderRadius) || '8'
                                  )
                                ),
                                type: 'range',
                                min: '0',
                                max: '20',
                                onInput: _
                              },
                              null,
                              40,
                              xS
                            )
                          ]),
                          b('div', LS, [
                            h[16] ||
                              (h[16] = b(
                                'label',
                                null,
                                '标签文字颜色',
                                -1
                                /* CACHED */
                              )),
                            b('div', kS, [
                              b(
                                'input',
                                {
                                  type: 'color',
                                  value: o.value.labelColor,
                                  class: 'modern-color-picker',
                                  onInput: h[6] || (h[6] = (g) => s(g.target.value))
                                },
                                null,
                                40,
                                SS
                              ),
                              b(
                                'span',
                                DS,
                                ae(o.value.labelColor),
                                1
                                /* TEXT */
                              )
                            ])
                          ]),
                          b('div', ES, [
                            h[17] ||
                              (h[17] = b(
                                'label',
                                null,
                                '文字描述颜色',
                                -1
                                /* CACHED */
                              )),
                            b('div', TS, [
                              b(
                                'input',
                                {
                                  type: 'color',
                                  value: o.value.descriptionColor,
                                  class: 'modern-color-picker',
                                  onInput: h[7] || (h[7] = (g) => t(g.target.value))
                                },
                                null,
                                40,
                                $S
                              ),
                              b(
                                'span',
                                HS,
                                ae(o.value.descriptionColor),
                                1
                                /* TEXT */
                              )
                            ])
                          ])
                        ])
                      ]))
                    : I('v-if', !0)
                ]
              }),
              _: 1
              /* STABLE */
            }
          )
        ])
      )
    }
  }),
  CS = /* @__PURE__ */ ue(jS, [['__scopeId', 'data-v-153dda1b']]),
  AS = {
    key: 0,
    class: 'ai-node-edit-panel'
  },
  qS = { class: 'panel-header' },
  FS = { class: 'panel-title' },
  RS = { key: 0 },
  IS = { key: 1 },
  PS = { key: 2 },
  BS = { key: 3 },
  NS = { key: 4 },
  OS = { key: 5 },
  zS = { key: 6 },
  GS = { class: 'panel-content' },
  JS = { class: 'form-group' },
  US = { class: 'form-group' },
  WS = ['value'],
  VS = ['value'],
  KS = { class: 'form-group' },
  XS = ['value'],
  ZS = { class: 'form-group' },
  QS = ['value'],
  eD = { class: 'form-group' },
  tD = { class: 'status-badges' },
  rD = {
    key: 0,
    class: 'form-group'
  },
  nD = { class: 'stream-preview' },
  aD = { class: 'stream-text' },
  oD = {
    key: 1,
    class: 'form-group'
  },
  sD = {
    key: 2,
    class: 'form-group'
  },
  iD = { class: 'tools-checkboxes' },
  uD = ['checked', 'onChange'],
  lD = {
    key: 3,
    class: 'form-group'
  },
  dD = {
    key: 4,
    class: 'form-group'
  },
  cD = {
    key: 5,
    class: 'form-group'
  },
  _D = ['value'],
  fD = ['value'],
  mD = { class: 'form-group' },
  pD = { class: 'size-inputs' },
  hD = { class: 'form-group' },
  vD = { class: 'color-picker' },
  yD = ['onClick'],
  gD = { class: 'form-group' },
  MD = { class: 'color-picker' },
  bD = ['onClick'],
  YD = /* @__PURE__ */ ie({
    __name: 'AiNodeEditPanel',
    props: {
      node: {},
      visible: { type: Boolean }
    },
    emits: ['update', 'close'],
    setup(e, { emit: a }) {
      const n = e,
        r = a,
        o = ee({
          label: '',
          description: ''
        }),
        s = J(() => {
          if (!n.node) return !1
          const T = n.node.type
          return T == null ? void 0 : T.startsWith('ai-')
        }),
        t = J(() => {
          var T
          return ((T = n.node) == null ? void 0 : T.type) === 'ai-llm'
        }),
        i = J(() => {
          var T
          return ((T = n.node) == null ? void 0 : T.type) === 'ai-prompt'
        }),
        u = J(() => {
          var T
          return ((T = n.node) == null ? void 0 : T.type) === 'ai-agent'
        }),
        l = J(() => {
          var T
          return ((T = n.node) == null ? void 0 : T.type) === 'ai-tool'
        }),
        d = J(() => {
          var T
          return ((T = n.node) == null ? void 0 : T.type) === 'ai-condition'
        }),
        c = J(() => {
          var T
          return ((T = n.node) == null ? void 0 : T.type) === 'ai-memory'
        }),
        _ = [
          { value: 'gpt-4', label: 'GPT-4' },
          { value: 'gpt-4-turbo', label: 'GPT-4 Turbo' },
          { value: 'gpt-3.5-turbo', label: 'GPT-3.5 Turbo' },
          { value: 'claude-3-opus', label: 'Claude 3 Opus' },
          { value: 'claude-3-sonnet', label: 'Claude 3 Sonnet' },
          { value: 'claude-3-haiku', label: 'Claude 3 Haiku' }
        ],
        f = [
          { value: 'search', label: '🔍 搜索' },
          { value: 'calculator', label: '🧮 计算器' },
          { value: 'weather', label: '🌤️ 天气查询' },
          { value: 'code_interpreter', label: '💻 代码执行' },
          { value: 'web_fetch', label: '🌐 网页获取' }
        ],
        m = [
          { value: 'short', label: '短期记忆' },
          { value: 'long', label: '长期记忆' },
          { value: 'session', label: '会话记忆' }
        ]
      Le(
        () => n.node,
        (T) => {
          if (T) {
            const x = T.data,
              H = x.label || x.title || x.name || x.text || T.id
            o.value = {
              label: String(H),
              description: x.description || x.desc || '',
              style: { ...T.style },
              width: T.width,
              height: T.height,
              type: T.type,
              // AI workflow fields - explicitly cast to correct types
              model: (x == null ? void 0 : x.model) || 'gpt-4',
              prompt: (x == null ? void 0 : x.prompt) || '',
              temperature: (x == null ? void 0 : x.temperature) ?? 0.7,
              maxTokens: (x == null ? void 0 : x.maxTokens) ?? 2e3,
              tools: (x == null ? void 0 : x.tools) || [],
              toolName: (x == null ? void 0 : x.toolName) || '',
              condition: (x == null ? void 0 : x.condition) || '',
              memoryType: (x == null ? void 0 : x.memoryType) || 'short',
              status: (x == null ? void 0 : x.status) || 'pending',
              streamOutput: (x == null ? void 0 : x.streamOutput) || ''
            }
          }
        },
        { immediate: !0 }
      )
      const h = (T, x) => {
          var G
          const H = { ...((G = n.node) == null ? void 0 : G.data) }
          ;((H[T] = x), r('update', { data: H }))
        },
        y = () => {
          if (!n.node) return
          const T = { ...n.node.data }
          ;('label' in T || !('title' in T || 'name' in T || 'text' in T)
            ? (T.label = o.value.label)
            : 'title' in T
              ? (T.title = o.value.label)
              : 'name' in T
                ? (T.name = o.value.label)
                : 'text' in T && (T.text = o.value.label),
            r('update', { data: T }))
        },
        p = (T) => {
          const x = T.target.value
          h('model', x)
        },
        v = () => {
          h('prompt', o.value.prompt)
        },
        g = (T) => {
          const x = parseFloat(T.target.value)
          h('temperature', x)
        },
        M = (T) => {
          const x = parseInt(T.target.value)
          h('maxTokens', x)
        },
        w = (T) => {
          const x = o.value.tools || [],
            H = x.includes(T) ? x.filter((G) => G !== T) : [...x, T]
          ;((o.value.tools = H), h('tools', H))
        },
        L = () => {
          h('toolName', o.value.toolName)
        },
        D = () => {
          h('condition', o.value.condition)
        },
        Y = (T) => {
          const x = T.target.value
          h('memoryType', x)
        },
        E = () => {
          r('close')
        },
        k = (T, x) => {
          var G
          const H = { ...((G = n.node) == null ? void 0 : G.style), [T]: x }
          r('update', { style: H })
        },
        S = () => {
          r('update', {
            width: o.value.width,
            height: o.value.height
          })
        },
        O = [
          '#fff',
          '#f8f9fa',
          '#e9ecef',
          '#dee2e6',
          '#ced4da',
          '#3b82f6',
          '#10b981',
          '#f59e0b',
          '#ef4444',
          '#8b5cf6'
        ],
        z = ['#ddd', '#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899', '#06b6d4']
      return (T, x) => (
        $(),
        Ve(Ua, { to: 'body' }, [
          We(
            Od,
            { name: 'slide-fade' },
            {
              default: Tt(() => [
                e.visible && e.node
                  ? ($(),
                    j('div', AS, [
                      b('div', qS, [
                        b('span', FS, [
                          t.value
                            ? ($(), j('span', RS, '🧠 LLM 配置'))
                            : i.value
                              ? ($(), j('span', IS, '💬 提示词配置'))
                              : u.value
                                ? ($(), j('span', PS, '🤖 Agent 配置'))
                                : l.value
                                  ? ($(), j('span', BS, '🔧 工具配置'))
                                  : d.value
                                    ? ($(), j('span', NS, '🔀 条件配置'))
                                    : c.value
                                      ? ($(), j('span', OS, '💾 记忆配置'))
                                      : ($(), j('span', zS, '编辑节点'))
                        ]),
                        b(
                          'button',
                          {
                            class: 'close-btn',
                            onClick: E
                          },
                          '×'
                        )
                      ]),
                      b('div', GS, [
                        I(' 通用字段 '),
                        b('div', JS, [
                          x[6] ||
                            (x[6] = b(
                              'label',
                              null,
                              '标签',
                              -1
                              /* CACHED */
                            )),
                          He(
                            b(
                              'input',
                              {
                                'onUpdate:modelValue': x[0] || (x[0] = (H) => (o.value.label = H)),
                                type: 'text',
                                placeholder: '节点标签',
                                onBlur: y,
                                onKeyup: zd(y, ['enter'])
                              },
                              null,
                              544
                              /* NEED_HYDRATION, NEED_PATCH */
                            ),
                            [[Re, o.value.label]]
                          )
                        ]),
                        I(' LLM 节点配置 '),
                        t.value
                          ? ($(),
                            j(
                              pe,
                              { key: 0 },
                              [
                                b('div', US, [
                                  x[7] ||
                                    (x[7] = b(
                                      'label',
                                      null,
                                      '模型',
                                      -1
                                      /* CACHED */
                                    )),
                                  b(
                                    'select',
                                    {
                                      value: o.value.model,
                                      class: 'form-select',
                                      onChange: p
                                    },
                                    [
                                      ($(),
                                      j(
                                        pe,
                                        null,
                                        ke(_, (H) =>
                                          b(
                                            'option',
                                            {
                                              key: H.value,
                                              value: H.value
                                            },
                                            ae(H.label),
                                            9,
                                            VS
                                          )
                                        ),
                                        64
                                        /* STABLE_FRAGMENT */
                                      ))
                                    ],
                                    40,
                                    WS
                                  )
                                ]),
                                b('div', KS, [
                                  b(
                                    'label',
                                    null,
                                    'Temperature (' + ae(o.value.temperature) + ')',
                                    1
                                    /* TEXT */
                                  ),
                                  b(
                                    'input',
                                    {
                                      value: o.value.temperature,
                                      type: 'range',
                                      min: '0',
                                      max: '2',
                                      step: '0.1',
                                      onInput: g
                                    },
                                    null,
                                    40,
                                    XS
                                  ),
                                  x[8] ||
                                    (x[8] = b(
                                      'div',
                                      { class: 'range-labels' },
                                      [b('span', null, '精确'), b('span', null, '创意')],
                                      -1
                                      /* CACHED */
                                    ))
                                ]),
                                b('div', ZS, [
                                  x[9] ||
                                    (x[9] = b(
                                      'label',
                                      null,
                                      'Max Tokens',
                                      -1
                                      /* CACHED */
                                    )),
                                  b(
                                    'input',
                                    {
                                      value: o.value.maxTokens,
                                      type: 'number',
                                      min: '100',
                                      max: '32000',
                                      onChange: M
                                    },
                                    null,
                                    40,
                                    QS
                                  )
                                ]),
                                b('div', eD, [
                                  x[10] ||
                                    (x[10] = b(
                                      'label',
                                      null,
                                      '状态',
                                      -1
                                      /* CACHED */
                                    )),
                                  b('div', tD, [
                                    b(
                                      'span',
                                      {
                                        class: te([
                                          'status-badge',
                                          {
                                            active: o.value.status === 'pending',
                                            'status-pending': !0
                                          }
                                        ])
                                      },
                                      '○ 待运行',
                                      2
                                      /* CLASS */
                                    ),
                                    b(
                                      'span',
                                      {
                                        class: te([
                                          'status-badge',
                                          {
                                            active: o.value.status === 'running',
                                            'status-running': !0
                                          }
                                        ])
                                      },
                                      '● 运行中',
                                      2
                                      /* CLASS */
                                    ),
                                    b(
                                      'span',
                                      {
                                        class: te([
                                          'status-badge',
                                          {
                                            active: o.value.status === 'success',
                                            'status-success': !0
                                          }
                                        ])
                                      },
                                      '✓ 成功',
                                      2
                                      /* CLASS */
                                    ),
                                    b(
                                      'span',
                                      {
                                        class: te([
                                          'status-badge',
                                          { active: o.value.status === 'error', 'status-error': !0 }
                                        ])
                                      },
                                      '✗ 错误',
                                      2
                                      /* CLASS */
                                    )
                                  ])
                                ]),
                                I(' 流式输出预览 '),
                                o.value.status === 'running'
                                  ? ($(),
                                    j('div', rD, [
                                      x[12] ||
                                        (x[12] = b(
                                          'label',
                                          null,
                                          '流式输出',
                                          -1
                                          /* CACHED */
                                        )),
                                      b('div', nD, [
                                        x[11] ||
                                          (x[11] = b(
                                            'span',
                                            { class: 'streaming-cursor' },
                                            '▊',
                                            -1
                                            /* CACHED */
                                          )),
                                        b(
                                          'span',
                                          aD,
                                          ae(o.value.streamOutput || '正在生成...'),
                                          1
                                          /* TEXT */
                                        )
                                      ])
                                    ]))
                                  : I('v-if', !0)
                              ],
                              64
                              /* STABLE_FRAGMENT */
                            ))
                          : I('v-if', !0),
                        I(' 提示词节点配置 '),
                        i.value
                          ? ($(),
                            j('div', oD, [
                              x[13] ||
                                (x[13] = b(
                                  'label',
                                  null,
                                  '提示词内容',
                                  -1
                                  /* CACHED */
                                )),
                              He(
                                b(
                                  'textarea',
                                  {
                                    'onUpdate:modelValue':
                                      x[1] || (x[1] = (H) => (o.value.prompt = H)),
                                    placeholder: '输入提示词模板，可以使用 {{variable}} 语法',
                                    rows: '6',
                                    onBlur: v
                                  },
                                  null,
                                  544
                                  /* NEED_HYDRATION, NEED_PATCH */
                                ),
                                [[Re, o.value.prompt]]
                              ),
                              x[14] ||
                                (x[14] = b(
                                  'div',
                                  { class: 'form-hint' },
                                  '支持 {{variable}} 变量语法',
                                  -1
                                  /* CACHED */
                                ))
                            ]))
                          : I('v-if', !0),
                        I(' Agent 节点配置 '),
                        u.value
                          ? ($(),
                            j('div', sD, [
                              x[15] ||
                                (x[15] = b(
                                  'label',
                                  null,
                                  '选择工具',
                                  -1
                                  /* CACHED */
                                )),
                              b('div', iD, [
                                ($(),
                                j(
                                  pe,
                                  null,
                                  ke(f, (H) => {
                                    var G
                                    return b(
                                      'label',
                                      {
                                        key: H.value,
                                        class: 'tool-checkbox'
                                      },
                                      [
                                        b(
                                          'input',
                                          {
                                            type: 'checkbox',
                                            checked:
                                              (G = o.value.tools) == null
                                                ? void 0
                                                : G.includes(H.value),
                                            onChange: (N) => w(H.value)
                                          },
                                          null,
                                          40,
                                          uD
                                        ),
                                        b(
                                          'span',
                                          null,
                                          ae(H.label),
                                          1
                                          /* TEXT */
                                        )
                                      ]
                                    )
                                  }),
                                  64
                                  /* STABLE_FRAGMENT */
                                ))
                              ])
                            ]))
                          : I('v-if', !0),
                        I(' 工具节点配置 '),
                        l.value
                          ? ($(),
                            j('div', lD, [
                              x[16] ||
                                (x[16] = b(
                                  'label',
                                  null,
                                  '工具名称',
                                  -1
                                  /* CACHED */
                                )),
                              He(
                                b(
                                  'input',
                                  {
                                    'onUpdate:modelValue':
                                      x[2] || (x[2] = (H) => (o.value.toolName = H)),
                                    type: 'text',
                                    placeholder: '输入工具名称',
                                    onBlur: L
                                  },
                                  null,
                                  544
                                  /* NEED_HYDRATION, NEED_PATCH */
                                ),
                                [[Re, o.value.toolName]]
                              )
                            ]))
                          : I('v-if', !0),
                        I(' 条件节点配置 '),
                        d.value
                          ? ($(),
                            j('div', dD, [
                              x[17] ||
                                (x[17] = b(
                                  'label',
                                  null,
                                  '条件表达式',
                                  -1
                                  /* CACHED */
                                )),
                              He(
                                b(
                                  'input',
                                  {
                                    'onUpdate:modelValue':
                                      x[3] || (x[3] = (H) => (o.value.condition = H)),
                                    type: 'text',
                                    placeholder: '例如: score > 60',
                                    onBlur: D
                                  },
                                  null,
                                  544
                                  /* NEED_HYDRATION, NEED_PATCH */
                                ),
                                [[Re, o.value.condition]]
                              ),
                              x[18] ||
                                (x[18] = b(
                                  'div',
                                  { class: 'form-hint' },
                                  '满足条件走下方输出，不满足走右侧输出',
                                  -1
                                  /* CACHED */
                                ))
                            ]))
                          : I('v-if', !0),
                        I(' 记忆节点配置 '),
                        c.value
                          ? ($(),
                            j('div', cD, [
                              x[19] ||
                                (x[19] = b(
                                  'label',
                                  null,
                                  '记忆类型',
                                  -1
                                  /* CACHED */
                                )),
                              b(
                                'select',
                                {
                                  value: o.value.memoryType,
                                  class: 'form-select',
                                  onChange: Y
                                },
                                [
                                  ($(),
                                  j(
                                    pe,
                                    null,
                                    ke(m, (H) =>
                                      b(
                                        'option',
                                        {
                                          key: H.value,
                                          value: H.value
                                        },
                                        ae(H.label),
                                        9,
                                        fD
                                      )
                                    ),
                                    64
                                    /* STABLE_FRAGMENT */
                                  ))
                                ],
                                40,
                                _D
                              )
                            ]))
                          : I('v-if', !0),
                        I(' 通用样式配置 '),
                        s.value
                          ? I('v-if', !0)
                          : ($(),
                            j(
                              pe,
                              { key: 6 },
                              [
                                b('div', mD, [
                                  x[21] ||
                                    (x[21] = b(
                                      'label',
                                      null,
                                      '尺寸',
                                      -1
                                      /* CACHED */
                                    )),
                                  b('div', pD, [
                                    He(
                                      b(
                                        'input',
                                        {
                                          'onUpdate:modelValue':
                                            x[4] || (x[4] = (H) => (o.value.width = H)),
                                          type: 'number',
                                          min: '50',
                                          max: '800',
                                          onBlur: S
                                        },
                                        null,
                                        544
                                        /* NEED_HYDRATION, NEED_PATCH */
                                      ),
                                      [[Re, o.value.width, void 0, { number: !0 }]]
                                    ),
                                    x[20] ||
                                      (x[20] = b(
                                        'span',
                                        null,
                                        '×',
                                        -1
                                        /* CACHED */
                                      )),
                                    He(
                                      b(
                                        'input',
                                        {
                                          'onUpdate:modelValue':
                                            x[5] || (x[5] = (H) => (o.value.height = H)),
                                          type: 'number',
                                          min: '30',
                                          max: '600',
                                          onBlur: S
                                        },
                                        null,
                                        544
                                        /* NEED_HYDRATION, NEED_PATCH */
                                      ),
                                      [[Re, o.value.height, void 0, { number: !0 }]]
                                    )
                                  ])
                                ]),
                                b('div', hD, [
                                  x[22] ||
                                    (x[22] = b(
                                      'label',
                                      null,
                                      '背景色',
                                      -1
                                      /* CACHED */
                                    )),
                                  b('div', vD, [
                                    ($(),
                                    j(
                                      pe,
                                      null,
                                      ke(O, (H) => {
                                        var G
                                        return b(
                                          'button',
                                          {
                                            key: H,
                                            class: te([
                                              'color-swatch',
                                              {
                                                active:
                                                  ((G = e.node.style) == null
                                                    ? void 0
                                                    : G.backgroundColor) === H
                                              }
                                            ]),
                                            style: re({ backgroundColor: H }),
                                            onClick: (N) => k('backgroundColor', H)
                                          },
                                          null,
                                          14,
                                          yD
                                        )
                                      }),
                                      64
                                      /* STABLE_FRAGMENT */
                                    ))
                                  ])
                                ]),
                                b('div', gD, [
                                  x[23] ||
                                    (x[23] = b(
                                      'label',
                                      null,
                                      '边框颜色',
                                      -1
                                      /* CACHED */
                                    )),
                                  b('div', MD, [
                                    ($(),
                                    j(
                                      pe,
                                      null,
                                      ke(z, (H) =>
                                        b(
                                          'button',
                                          {
                                            key: H,
                                            class: 'color-swatch',
                                            style: re({ backgroundColor: H }),
                                            onClick: (G) => k('border', `1px solid ${H}`)
                                          },
                                          null,
                                          12,
                                          bD
                                        )
                                      ),
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
                    ]))
                  : I('v-if', !0)
              ]),
              _: 1
              /* STABLE */
            }
          )
        ])
      )
    }
  }),
  wD = /* @__PURE__ */ ue(YD, [['__scopeId', 'data-v-15fc68fd']]),
  xD = {
    key: 0,
    class: 'edge-edit-panel'
  },
  LD = { class: 'panel-content' },
  kD = { class: 'form-group' },
  SD = { class: 'form-group' },
  DD = ['value'],
  ED = { class: 'form-group' },
  TD = { class: 'checkbox-label' },
  $D = { class: 'form-group' },
  HD = { class: 'color-picker-row' },
  jD = ['value'],
  CD = { class: 'color-value' },
  AD = { class: 'form-group' },
  qD = ['value'],
  FD = { class: 'form-group' },
  RD = { class: 'color-picker-row' },
  ID = ['value'],
  PD = { class: 'color-value' },
  BD = { class: 'form-group' },
  ND = { class: 'color-picker-row' },
  OD = { class: 'color-value' },
  zD = /* @__PURE__ */ ie({
    __name: 'EdgeEditPanel',
    props: {
      edge: {},
      visible: { type: Boolean },
      edgeTypes: {}
    },
    emits: ['update', 'close'],
    setup(e, { emit: a }) {
      const n = e,
        r = a,
        o = ee({})
      Le(
        () => n.edge,
        (m) => {
          m &&
            (o.value = {
              label: m.label || '',
              type: m.type || 'bezier',
              animated: m.animated || !1,
              style: { ...m.style },
              labelStyle: { ...m.labelStyle },
              labelColor: m.labelColor || '#000000',
              labelShowBg: !!m.labelShowBg,
              labelBgColor: m.labelBgColor || '#ffffff'
            })
        },
        { immediate: !0 }
      )
      const s = () => {
          r('update', { label: o.value.label })
        },
        t = () => {
          r('update', { type: o.value.type })
        },
        i = () => {
          r('update', { animated: o.value.animated })
        },
        u = (m, h) => {
          var p
          const y = { ...((p = n.edge) == null ? void 0 : p.style), [m]: h }
          r('update', { style: y })
        },
        l = (m) => {
          ;((o.value.labelColor = m), r('update', { labelColor: m }))
        },
        d = (m) => {
          m === null
            ? ((o.value.labelShowBg = !1), r('update', { labelShowBg: !1 }))
            : ((o.value.labelShowBg = !0),
              (o.value.labelBgColor = m),
              r('update', { labelShowBg: !0, labelBgColor: m }))
        },
        c = () => {
          r('close')
        },
        _ = (m) => {
          const h = parseFloat(m.target.value)
          u('strokeWidth', h)
        },
        f = J(() => {
          var y
          const m = /* @__PURE__ */ new Map()
          return (
            [
              { value: 'bezier', label: '贝塞尔曲线' },
              { value: 'smoothstep', label: '平滑阶梯' },
              { value: 'step', label: '阶梯' },
              { value: 'straight', label: '直线' }
            ].forEach((p) => m.set(p.value, p)),
            dw().forEach((p) => {
              m.has(p.type) ||
                m.set(p.type, { value: p.type, label: p.label || `自定义: ${p.type}` })
            }),
            hw().forEach((p) => {
              m.has(p.type) || m.set(p.type, { value: p.type, label: p.label || `模板: ${p.type}` })
            }),
            n.edgeTypes &&
              Object.keys(n.edgeTypes).forEach((p) => {
                m.has(p) || m.set(p, { value: p, label: `局部组件: ${p}` })
              }),
            (y = n.edge) != null &&
              y.type &&
              !m.has(n.edge.type) &&
              m.set(n.edge.type, { value: n.edge.type, label: `未知类型: ${n.edge.type}` }),
            Array.from(m.values())
          )
        })
      return (m, h) => (
        $(),
        Ve(Ua, { to: 'body' }, [
          We(
            Od,
            { name: 'slide-fade' },
            {
              default: Tt(() => {
                var y, p, v
                return [
                  e.visible && e.edge
                    ? ($(),
                      j('div', xD, [
                        b('div', { class: 'panel-header' }, [
                          h[9] ||
                            (h[9] = b(
                              'span',
                              { class: 'panel-title' },
                              '编辑连线',
                              -1
                              /* CACHED */
                            )),
                          b(
                            'button',
                            {
                              class: 'close-btn',
                              onClick: c
                            },
                            '×'
                          )
                        ]),
                        b('div', LD, [
                          b('div', kD, [
                            h[10] ||
                              (h[10] = b(
                                'label',
                                null,
                                '标签',
                                -1
                                /* CACHED */
                              )),
                            He(
                              b(
                                'input',
                                {
                                  'onUpdate:modelValue':
                                    h[0] || (h[0] = (g) => (o.value.label = g)),
                                  type: 'text',
                                  placeholder: '连线标签',
                                  onBlur: s,
                                  onKeyup: zd(s, ['enter'])
                                },
                                null,
                                544
                                /* NEED_HYDRATION, NEED_PATCH */
                              ),
                              [[Re, o.value.label]]
                            )
                          ]),
                          b('div', SD, [
                            h[11] ||
                              (h[11] = b(
                                'label',
                                null,
                                '连线类型',
                                -1
                                /* CACHED */
                              )),
                            He(
                              b(
                                'select',
                                {
                                  'onUpdate:modelValue': h[1] || (h[1] = (g) => (o.value.type = g)),
                                  onChange: t
                                },
                                [
                                  ($(!0),
                                  j(
                                    pe,
                                    null,
                                    ke(
                                      f.value,
                                      (g) => (
                                        $(),
                                        j(
                                          'option',
                                          {
                                            key: g.value,
                                            value: g.value
                                          },
                                          ae(g.label),
                                          9,
                                          DD
                                        )
                                      )
                                    ),
                                    128
                                    /* KEYED_FRAGMENT */
                                  ))
                                ],
                                544
                                /* NEED_HYDRATION, NEED_PATCH */
                              ),
                              [[N1, o.value.type]]
                            )
                          ]),
                          b('div', ED, [
                            b('label', TD, [
                              He(
                                b(
                                  'input',
                                  {
                                    'onUpdate:modelValue':
                                      h[2] || (h[2] = (g) => (o.value.animated = g)),
                                    type: 'checkbox',
                                    onChange: i
                                  },
                                  null,
                                  544
                                  /* NEED_HYDRATION, NEED_PATCH */
                                ),
                                [[O1, o.value.animated]]
                              ),
                              h[12] ||
                                (h[12] = z1(
                                  ' 动画连线 ',
                                  -1
                                  /* CACHED */
                                ))
                            ])
                          ]),
                          b('div', $D, [
                            h[13] ||
                              (h[13] = b(
                                'label',
                                null,
                                '线条颜色',
                                -1
                                /* CACHED */
                              )),
                            b('div', HD, [
                              b(
                                'input',
                                {
                                  type: 'color',
                                  value:
                                    ((y = e.edge.style) == null ? void 0 : y.stroke) || '#b1b1b7',
                                  class: 'modern-color-picker',
                                  onInput: h[3] || (h[3] = (g) => u('stroke', g.target.value))
                                },
                                null,
                                40,
                                jD
                              ),
                              b(
                                'span',
                                CD,
                                ae(((p = e.edge.style) == null ? void 0 : p.stroke) || '#b1b1b7'),
                                1
                                /* TEXT */
                              )
                            ])
                          ]),
                          b('div', AD, [
                            h[14] ||
                              (h[14] = b(
                                'label',
                                null,
                                '线条宽度',
                                -1
                                /* CACHED */
                              )),
                            b(
                              'input',
                              {
                                value: ((v = e.edge.style) == null ? void 0 : v.strokeWidth) || 1.5,
                                type: 'range',
                                min: '1',
                                max: '6',
                                step: '0.5',
                                onInput: _
                              },
                              null,
                              40,
                              qD
                            )
                          ]),
                          b('div', FD, [
                            h[15] ||
                              (h[15] = b(
                                'label',
                                null,
                                '标签文字颜色',
                                -1
                                /* CACHED */
                              )),
                            b('div', RD, [
                              b(
                                'input',
                                {
                                  type: 'color',
                                  value: o.value.labelColor,
                                  class: 'modern-color-picker',
                                  onInput: h[4] || (h[4] = (g) => l(g.target.value))
                                },
                                null,
                                40,
                                ID
                              ),
                              b(
                                'span',
                                PD,
                                ae(o.value.labelColor),
                                1
                                /* TEXT */
                              )
                            ])
                          ]),
                          b('div', BD, [
                            h[16] ||
                              (h[16] = b(
                                'label',
                                null,
                                '标签背景颜色',
                                -1
                                /* CACHED */
                              )),
                            b('div', ND, [
                              b(
                                'button',
                                {
                                  class: te([
                                    'color-swatch none-swatch',
                                    { active: !o.value.labelShowBg }
                                  ]),
                                  onClick: h[5] || (h[5] = (g) => d(null))
                                },
                                ' × ',
                                2
                                /* CLASS */
                              ),
                              o.value.labelShowBg
                                ? ($(),
                                  j(
                                    pe,
                                    { key: 0 },
                                    [
                                      He(
                                        b(
                                          'input',
                                          {
                                            type: 'color',
                                            'onUpdate:modelValue':
                                              h[6] || (h[6] = (g) => (o.value.labelBgColor = g)),
                                            class: 'modern-color-picker',
                                            onInput:
                                              h[7] ||
                                              (h[7] = (g) => d(o.value.labelBgColor || '#ffffff'))
                                          },
                                          null,
                                          544
                                          /* NEED_HYDRATION, NEED_PATCH */
                                        ),
                                        [[Re, o.value.labelBgColor]]
                                      ),
                                      b(
                                        'span',
                                        OD,
                                        ae(o.value.labelBgColor),
                                        1
                                        /* TEXT */
                                      )
                                    ],
                                    64
                                    /* STABLE_FRAGMENT */
                                  ))
                                : ($(),
                                  j(
                                    'button',
                                    {
                                      key: 1,
                                      class: 'add-bg-btn',
                                      onClick: h[8] || (h[8] = (g) => d('#ffffff'))
                                    },
                                    ' 启用背景 '
                                  ))
                            ])
                          ])
                        ])
                      ]))
                    : I('v-if', !0)
                ]
              }),
              _: 1
              /* STABLE */
            }
          )
        ])
      )
    }
  }),
  GD = /* @__PURE__ */ ue(zD, [['__scopeId', 'data-v-e8d73726']])
class JD {
  constructor() {
    ye(this, 'handlers', /* @__PURE__ */ new Map())
  }
  /**
   * 订阅事件
   */
  on(a, n) {
    ;(this.handlers.has(a) || this.handlers.set(a, /* @__PURE__ */ new Set()),
      this.handlers.get(a).add(n))
  }
  /**
   * 取消订阅
   */
  off(a, n) {
    const r = this.handlers.get(a)
    r && (r.delete(n), r.size === 0 && this.handlers.delete(a))
  }
  /**
   * 触发事件
   */
  emit(a, n) {
    const r = this.handlers.get(a)
    r &&
      r.forEach((o) => {
        try {
          n !== void 0 ? o(n) : o()
        } catch (s) {
          console.error(`[YhFlow EventBus] Error in event handler for "${a}":`, s)
        }
      })
  }
  /**
   * 单次订阅
   */
  once(a, n) {
    const r = (...o) => {
      ;(n(...o), this.off(a, n))
    }
    this.on(a, r)
  }
  /**
   * 清空所有事件处理函数
   */
  clear() {
    this.handlers.clear()
  }
  /**
   * 获取事件处理器数量
   */
  listenerCount(a) {
    var r
    if (a) return ((r = this.handlers.get(a)) == null ? void 0 : r.size) || 0
    let n = 0
    return (
      this.handlers.forEach((o) => {
        n += o.size
      }),
      n
    )
  }
}
function UD() {
  return new JD()
}
const WD = {
    key: 0,
    class: 'yh-flow__connection-line'
  },
  VD = ['d'],
  KD = /* @__PURE__ */ ie({
    __name: 'Flow',
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
      background: { default: 'none' },
      backgroundColor: { default: 'transparent' },
      gridSize: { default: 20 },
      snapToGrid: { type: Boolean, default: !1 },
      snapGrid: { default: () => [20, 20] },
      readonly: { type: Boolean, default: !1 },
      showControls: { type: Boolean, default: !1 },
      showMinimap: { type: Boolean, default: !1 },
      minimapNodeColor: { default: '#cbd5e1' },
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
      layoutType: { default: 'none' },
      layoutDirection: { default: 'TB' },
      enableExport: { type: Boolean, default: !1 },
      exportFileName: { default: 'flow-chart' }
    },
    emits: [
      'update:modelValue',
      'update:nodes',
      'update:edges',
      'nodeClick',
      'nodeDblClick',
      'nodeDragStart',
      'nodeDrag',
      'nodeDragEnd',
      'nodeContextMenu',
      'edgeClick',
      'edgeDblClick',
      'edgeContextMenu',
      'edgeConnect',
      'selectionChange',
      'historyChange',
      'viewportChange',
      'edgeUpdate'
    ],
    setup(e, { expose: a, emit: n }) {
      typeof window < 'u' && (window.__YH_FLOW_VERSION__ = '1.0.1')
      const r = (C, P, X) => {
          const Q = gc(C, P, X)
          return Q.isValid
            ? o.connectionValidator && !o.connectionValidator(X)
              ? { isValid: !1, message: 'Connection not allowed by custom validator' }
              : !o.noCycleValidation &&
                  uw(d.value, {
                    source: X.source,
                    target: X.target
                  })
                ? { isValid: !1, message: 'Connection would create a cycle' }
                : { isValid: !0 }
            : Q
        },
        o = e,
        s = n,
        t = ee(),
        i = ee(800),
        u = ee(600),
        l = ee(o.nodes || []),
        d = ee(o.edges || []),
        c = Ca(o.modelValue || { x: 0, y: 0, zoom: 1 }),
        _ = ee(o.readonly || !1),
        f = UD(),
        m = new qx(),
        h = ee(o.snapThreshold ?? 10),
        y = V1(c, {
          minZoom: o.minZoom || 0.1,
          maxZoom: o.maxZoom || 5,
          zoomStep: o.zoomStep || 0.1
        }),
        p = ee([]),
        v = J(() => p.value.filter((C) => !C.id.includes('minimap') && !C.id.includes('controls'))),
        g = J(() => p.value.filter((C) => C.id.includes('minimap') || C.id.includes('controls'))),
        M = (C) => {
          ;(m.register(C), (p.value = m.getPlugins()))
        },
        w = (C) => {
          ;(m.unregister(C), (p.value = m.getPlugins()))
        },
        L = K1(c, {
          nodes: l,
          snapToGrid: o.snapToGrid || !1,
          snapGrid: o.snapGrid || [15, 15]
        }),
        D = X1({
          edges: d,
          nodes: l
        }),
        Y = Z1({
          nodes: l,
          edges: d
        }),
        E = Q1(l, d, {
          maxHistory: o.maxHistory || 50,
          onHistoryChange: (C, P) => {
            s('historyChange', { canUndo: C, canRedo: P })
          }
        }),
        k = tw({
          nodes: l,
          snapThreshold: h.value
        }),
        S = J(() => {
          if (!t.value) return l.value
          const C = 100,
            P = {
              x: -c.value.x / c.value.zoom - C,
              y: -c.value.y / c.value.zoom - C,
              width: i.value / c.value.zoom + C * 2,
              height: u.value / c.value.zoom + C * 2
            }
          return l.value.filter((X) => {
            const Q = X.width || 200,
              ve = X.height || 50
            return !(
              X.position.x + Q < P.x ||
              X.position.x > P.x + P.width ||
              X.position.y + ve < P.y ||
              X.position.y > P.y + P.height
            )
          })
        }),
        O = J(() => ({
          transform: `translate(${c.value.x}px, ${c.value.y}px) scale(${c.value.zoom})`,
          transformOrigin: '0 0'
        })),
        z = ee(!1),
        T = ee({ x: 0, y: 0 }),
        x = ee(!1),
        H = ee(null),
        G = ee(null),
        N = ee(!1),
        W = ee(null),
        Z = ee({ x: 0, y: 0 }),
        K = ee(null),
        ne = ee(!1),
        se = ee(null),
        A = ee(!1),
        B = ee(null),
        U = J(() =>
          !N.value || !W.value
            ? null
            : {
                path: V.value,
                tx: Z.value.x,
                ty: Z.value.y
              }
        ),
        V = J(() =>
          W.value
            ? Ag('bezier', {
                sourceX: W.value.x * c.value.zoom + c.value.x,
                sourceY: W.value.y * c.value.zoom + c.value.y,
                targetX: Z.value.x,
                targetY: Z.value.y,
                sourcePosition: W.value.position,
                targetPosition: 'left'
              })
            : ''
        ),
        oe = (C) => {
          var Q
          C.preventDefault()
          const P = C.deltaY > 0 ? 0.9 : 1.1,
            X = (Q = t.value) == null ? void 0 : Q.getBoundingClientRect()
          X &&
            y.zoomTo(c.value.zoom * P, {
              x: C.clientX - X.left,
              y: C.clientY - X.top
            })
        },
        ce = (C) => {
          var de, me
          const P = C.target
          if (
            !((de = t.value) != null && de.contains(P)) ||
            P.closest('.yh-flow-node') ||
            P.closest('.yh-flow-handle') ||
            P.closest('.yh-flow-edge-group') ||
            P.closest('.yh-flow__connection-line') ||
            P.closest('.yh-flow-controls') ||
            P.closest('.yh-flow-minimap')
          )
            return
          const X = (me = t.value) == null ? void 0 : me.getBoundingClientRect()
          if (!X) return
          const Q = C.clientX - X.left,
            ve = C.clientY - X.top
          if (C.altKey && o.selectable && !_.value) {
            const Me = {
              x: (Q - c.value.x) / c.value.zoom,
              y: (ve - c.value.y) / c.value.zoom
            }
            ;((x.value = !0), Y.startSelection(Me.x, Me.y), Y.clearSelection())
          } else _.value || ((z.value = !0), (T.value = { x: C.clientX, y: C.clientY }))
        },
        le = (C) => {
          var P, X
          if (z.value) {
            const Q = C.clientX - T.value.x,
              ve = C.clientY - T.value.y
            ;(y.pan(Q, ve), (T.value = { x: C.clientX, y: C.clientY }))
          }
          if (x.value) {
            const Q = (P = t.value) == null ? void 0 : P.getBoundingClientRect()
            if (Q) {
              const ve = C.clientX - Q.left,
                de = C.clientY - Q.top,
                me = {
                  x: (ve - c.value.x) / c.value.zoom,
                  y: (de - c.value.y) / c.value.zoom
                }
              Y.updateSelection(me.x, me.y)
            }
          }
          if (N.value) {
            const Q = (X = t.value) == null ? void 0 : X.getBoundingClientRect()
            Q &&
              (Z.value = {
                x: C.clientX - Q.left,
                y: C.clientY - Q.top
              })
          }
        },
        he = (C) => {
          var P, X, Q, ve
          if (((z.value = !1), x.value && ((x.value = !1), Y.endSelection()), N.value && W.value)) {
            const de = (P = t.value) == null ? void 0 : P.getBoundingClientRect()
            if (de) {
              const me = C.clientX - de.left,
                Me = C.clientY - de.top,
                $e = {
                  x: (me - c.value.x) / c.value.zoom,
                  y: (Me - c.value.y) / c.value.zoom
                },
                Fe = qe($e)
              if (Fe) {
                const Wt = K.value
                    ? K.value.handleType === 'source'
                      ? Fe.id
                      : K.value.edge.source
                    : W.value.nodeId,
                  _c = K.value
                    ? K.value.handleType === 'target'
                      ? Fe.id
                      : K.value.edge.target
                    : Fe.id,
                  q1 = l.value.find((Ye) => Ye.id === Wt),
                  fc = r(
                    q1,
                    l.value.find((Ye) => Ye.id === _c),
                    {
                      source: Wt,
                      target: _c,
                      sourceHandle:
                        K.value && K.value.handleType === 'source'
                          ? void 0
                          : ((X = K.value) == null ? void 0 : X.edge.sourceHandle) ||
                            ((Q = W.value) == null ? void 0 : Q.handleId),
                      targetHandle:
                        (K.value && K.value.handleType === 'target') || (ve = K.value) == null
                          ? void 0
                          : ve.edge.targetHandle
                    }
                  )
                if (!fc.isValid) {
                  ;(console.warn('Invalid connection:', fc.message),
                    (N.value = !1),
                    (W.value = null),
                    (K.value = null))
                  return
                }
                if (K.value) {
                  const { edge: Ye, handleType: Vt } = K.value,
                    yo = {
                      source: Vt === 'source' ? Fe.id : Ye.source,
                      target: Vt === 'target' ? Fe.id : Ye.target,
                      sourceHandle: Vt === 'source' ? void 0 : Ye.sourceHandle,
                      targetHandle: Vt === 'target' ? void 0 : Ye.targetHandle
                    }
                  ;(D.updateEdge(Ye.id, yo),
                    s('edgeUpdate', { edge: Ye, connection: yo }),
                    f.emit('edge:update', { edge: Ye, connection: yo }))
                } else {
                  const Ye = {
                    id: `edge-${Date.now()}`,
                    source: W.value.nodeId,
                    target: Fe.id,
                    sourceHandle: W.value.handleId || void 0,
                    targetHandle: void 0,
                    type: 'bezier'
                  }
                  ;(D.addEdge(Ye),
                    s('edgeConnect', {
                      source: Ye.source,
                      target: Ye.target,
                      sourceHandle: Ye.sourceHandle,
                      targetHandle: Ye.targetHandle
                    }),
                    f.emit('edge:connect', {
                      connection: {
                        source: Ye.source,
                        target: Ye.target,
                        sourceHandle: Ye.sourceHandle,
                        targetHandle: Ye.targetHandle
                      }
                    }))
                }
              }
            }
            ;((N.value = !1), (W.value = null), (K.value = null))
          }
        },
        qe = (C) => {
          for (const P of l.value) {
            const X = P.width || 200,
              Q = P.height || 50
            if (
              C.x >= P.position.x &&
              C.x <= P.position.x + X &&
              C.y >= P.position.y &&
              C.y <= P.position.y + Q &&
              W.value &&
              P.id !== W.value.nodeId
            )
              return P
          }
          return null
        },
        be = (C, P) => {
          const X = C.shiftKey || C.metaKey || C.ctrlKey
          ;(X || D.clearSelection(),
            L.selectNode(P.id, !0, X),
            s('nodeClick', { node: P, nativeEvent: C }),
            f.emit('node:click', { node: P, nativeEvent: C }))
        },
        Se = (C) => {
          const P = l.value.find((X) => X.id === C)
          P && (P.selected = !P.selected)
        },
        _e = (C, P) => {
          ;(s('nodeDblClick', { node: P, nativeEvent: C }),
            f.emit('node:dblclick', { node: P, nativeEvent: C }),
            _.value || ((A.value = !1), (se.value = P), (ne.value = !0)))
        },
        Ue = (C, P) => {
          ;(s('nodeContextMenu', { node: P, nativeEvent: C }),
            f.emit('node:contextmenu', { node: P, nativeEvent: C }))
        },
        fe = (C, P) => {
          ;(E.push({ nodes: l.value, edges: d.value }),
            (H.value = P.id),
            (G.value = { ...P.position }),
            s('nodeDragStart', { node: P, nativeEvent: C }),
            f.emit('node:dragstart', { node: P, nativeEvent: C }))
        },
        Ze = (C, P, X) => {
          const Q = k.getAlignmentSnap(P.id, X)
          ;(L.updateNodePosition(P.id, Q, { dragging: !0 }),
            (G.value = Q),
            s('nodeDrag', { node: P, nativeEvent: C, position: Q }),
            f.emit('node:drag', { node: P, nativeEvent: C, position: Q }),
            s('update:nodes', l.value))
        },
        Qe = (C, P) => {
          ;(L.updateNodePosition(P.id, P.position, { dragging: !1 }),
            (H.value = null),
            (G.value = null),
            s('nodeDragEnd', { node: P, nativeEvent: C }),
            f.emit('node:dragend', { node: P, nativeEvent: C }),
            s('update:nodes', l.value),
            s('update:edges', d.value))
        },
        mo = (C, P) => {
          ;(console.log('Edge click:', P.id),
            C.stopPropagation(),
            !C.ctrlKey &&
              !C.metaKey &&
              !C.shiftKey &&
              d.value.forEach((X) => {
                X.id !== P.id && (X.selected = !1)
              }),
            (P.selected = !P.selected),
            s('edgeClick', { edge: P, nativeEvent: C }),
            _.value || ((ne.value = !1), (B.value = P), (A.value = !0)),
            f.emit('edge:click', { edge: P, nativeEvent: C }))
        },
        ft = (C, P) => {
          ;(console.log('Edge dblclick:', P.id),
            s('edgeDblClick', { edge: P, nativeEvent: C }),
            f.emit('edge:dblclick', { edge: P, nativeEvent: C }),
            _.value || ((ne.value = !1), (B.value = P), (A.value = !0)))
        },
        ze = (C, P) => {
          ;(s('edgeContextMenu', { edge: P, nativeEvent: C }),
            f.emit('edge:contextmenu', { edge: P, nativeEvent: C }))
        },
        Ee = (C, P, X) => {
          var Fe
          if (_.value) return
          const Q = (Fe = t.value) == null ? void 0 : Fe.getBoundingClientRect()
          if (!Q) return
          K.value = { edge: P, handleType: X }
          const ve = X === 'source' ? P.target : P.source,
            de = X === 'source' ? P.targetHandle : P.sourceHandle,
            me = l.value.find((Wt) => Wt.id === ve)
          if (!me) return
          const Me = X === 'source' ? (de ?? 'left') : (de ?? 'right'),
            $e = yt(me, Me)
          ;((N.value = !0),
            (W.value = {
              nodeId: ve,
              handleId: de || '',
              handleType: X === 'source' ? 'target' : 'source',
              // 反转类型
              position: Me,
              x: $e.x,
              y: $e.y
            }),
            (Z.value = {
              x: C.clientX - Q.left,
              y: C.clientY - Q.top
            }))
        },
        mt = (C, P, X, Q) => {
          var $e
          const ve = l.value.find((Fe) => Fe.id === P)
          if (!ve) return
          const de = ($e = t.value) == null ? void 0 : $e.getBoundingClientRect()
          if (!de) return
          const me = X || (Q === 'source' ? 'right' : 'left'),
            Me = yt(ve, me)
          ;((N.value = !0),
            (W.value = {
              nodeId: P,
              handleId: X,
              handleType: Q,
              position: me,
              x: Me.x,
              y: Me.y
            }),
            (Z.value = {
              x: C.clientX - de.left,
              y: C.clientY - de.top
            }))
        },
        st = (C) => {
          se.value &&
            (E.push({ nodes: l.value, edges: d.value }),
            L.updateNode(se.value.id, C),
            (se.value =
              l.value.find((P) => {
                var X
                return P.id === ((X = se.value) == null ? void 0 : X.id)
              }) || null),
            s('update:nodes', l.value))
        },
        Nt = () => {
          ;((ne.value = !1), (se.value = null))
        },
        Ot = (C) => {
          B.value &&
            (E.push({ nodes: l.value, edges: d.value }),
            D.updateEdge(B.value.id, C),
            (B.value =
              d.value.find((P) => {
                var X
                return P.id === ((X = B.value) == null ? void 0 : X.id)
              }) || null),
            s('update:edges', d.value))
        },
        et = () => {
          ;((A.value = !1), (B.value = null))
        },
        zt = () => l.value,
        Gt = () => d.value,
        po = (C, P) => {
          f.on(C, P)
        },
        Jt = (C, P) => {
          f.off(C, P)
        },
        Ge = (C, P) => {
          f.emit(C, P)
        },
        Be = {
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
          fitView: (C) => y.fitView({ width: i.value, height: u.value }, l.value, C),
          zoomIn: y.zoomIn,
          zoomOut: y.zoomOut,
          centerView: y.center,
          selectNode: L.selectNode,
          selectEdge: D.selectEdge,
          clearSelection: Y.clearSelection,
          on: po,
          off: Jt,
          emit: Ge,
          isValidConnection: (C) =>
            gc(
              l.value.find((P) => P.id === C.source),
              l.value.find((P) => P.id === C.target),
              C
            ).isValid,
          getNodes: zt,
          getEdges: Gt,
          getViewport: () => c.value,
          screenToCanvas: (C, P) => $t(C, P, c.value),
          canvasToScreen: (C, P) => qa(C, P, c.value),
          // ============================================
          // New 5-star feature methods
          // ============================================
          createNodeFromTemplate: (C, P, X, Q) => cw(C, P, X, Q),
          exportFlowData: (C) => vw(l.value, d.value, C),
          importFlowData: (C) => yw(C),
          isNestedNode: (C) => fw(C),
          getNodeChildren: (C) => mw(C, l.value),
          getNodeParent: (C) => pw(C, l.value),
          get $el() {
            return t.value
          },
          draggingNodeId: H,
          draggingPosition: G,
          isLocked: _,
          setInteractive: (C) => {
            _.value = !C
          },
          usePlugin: M,
          removePlugin: w,
          // Placeholders for plugin methods to be exposed via defineExpose
          exportJson: void 0,
          exportImage: void 0,
          applyLayout: void 0
        }
      ;(qw(Be),
        m.init(Be),
        a(Be),
        Le(
          () => o.nodes,
          (C) => {
            H.value || (l.value = C || [])
          },
          { deep: !0 }
        ),
        Le(
          () => o.edges,
          (C) => {
            d.value = C || []
          },
          { deep: !0 }
        ))
      const ho = ee(/* @__PURE__ */ new Set()),
        vo = ee(/* @__PURE__ */ new Set())
      ;(Le(
        [l, d],
        ([C, P]) => {
          const X = C.filter((me) => me.selected),
            Q = P.filter((me) => me.selected),
            ve = new Set(X.map((me) => me.id)),
            de = new Set(Q.map((me) => me.id))
          for (const me of ve)
            if (!ho.value.has(me)) {
              const Me = C.find(($e) => $e.id === me)
              Me && f.emit('node:selected', { node: Me })
            }
          for (const me of ho.value)
            if (!ve.has(me)) {
              const Me = C.find(($e) => $e.id === me)
              Me && f.emit('node:unselected', { node: Me })
            }
          for (const me of de)
            if (!vo.value.has(me)) {
              const Me = P.find(($e) => $e.id === me)
              Me && f.emit('edge:selected', { edge: Me })
            }
          for (const me of vo.value)
            if (!de.has(me)) {
              const Me = P.find(($e) => $e.id === me)
              Me && f.emit('edge:unselected', { edge: Me })
            }
          ;(f.emit('selection:change', { selectedNodes: X, selectedEdges: Q }),
            s('selectionChange', { selectedNodes: X, selectedEdges: Q }),
            s('update:nodes', C),
            s('update:edges', P),
            (ho.value = ve),
            (vo.value = de))
        },
        { deep: !0 }
      ),
        Le(
          c,
          (C) => {
            ;(s('update:modelValue', C),
              s('viewportChange', C),
              f.emit('viewport:change', { transform: C }))
          },
          { deep: !0 }
        ))
      let Ut
      return (
        Ht(() => {
          ;(document.addEventListener('mousemove', le),
            document.addEventListener('mouseup', he),
            t.value &&
              ((i.value = t.value.clientWidth),
              (u.value = t.value.clientHeight),
              new ResizeObserver((P) => {
                for (const X of P)
                  ((i.value = X.contentRect.width), (u.value = X.contentRect.height))
              }).observe(t.value)),
            o.background &&
              o.background !== 'none' &&
              M(
                Ia({
                  type: o.background === 'dots' ? 'dots' : 'grid',
                  color: o.backgroundColor,
                  gap: o.gridSize
                })
              ),
            o.showControls && M(Ra({})),
            o.showMinimap &&
              M(
                Fa({
                  nodeColor: o.minimapNodeColor ? () => o.minimapNodeColor : void 0,
                  interactive: o.interactiveMinimap,
                  showLayoutControls: o.showLayoutControls,
                  layoutType: o.layoutType,
                  layoutDirection: o.layoutDirection
                })
              ),
            o.showAlignmentLines &&
              M(
                Pa({
                  showAlignmentLines: !0,
                  snapThreshold: o.snapThreshold
                })
              ),
            o.enableExport &&
              M(
                Ba({
                  fileName: o.exportFileName,
                  enabled: !0
                })
              ),
            o.layoutType &&
              o.layoutType !== 'none' &&
              M(
                Na({
                  type: o.layoutType,
                  direction: o.layoutDirection
                })
              ),
            Le(
              () => [o.background, o.backgroundColor, o.gridSize],
              ([C, P, X]) => {
                ;(w('grid'),
                  C &&
                    C !== 'none' &&
                    M(
                      Ia({
                        type: C === 'dots' ? 'dots' : 'grid',
                        color: P,
                        gap: X || 20
                      })
                    ))
              }
            ),
            Le(
              () => o.showControls,
              (C) => {
                ;(w('controls'), C && M(Ra({})))
              }
            ),
            Le(
              () => [
                o.showMinimap,
                o.minimapNodeColor,
                o.interactiveMinimap,
                o.showLayoutControls,
                o.layoutType,
                o.layoutDirection
              ],
              ([C, P, X, Q, ve, de]) => {
                ;(w('minimap'),
                  C &&
                    M(
                      Fa({
                        nodeColor: P ? () => P : void 0,
                        interactive: X,
                        showLayoutControls: Q,
                        layoutType: ve,
                        layoutDirection: de
                      })
                    ))
              }
            ),
            Le(
              () => [o.showAlignmentLines, o.snapThreshold],
              ([C, P]) => {
                ;(w('snap'),
                  C &&
                    M(
                      Pa({
                        showAlignmentLines: !0,
                        snapThreshold: P || 10
                      })
                    ))
              }
            ),
            Le(
              () => [o.enableExport, o.exportFileName],
              ([C, P]) => {
                ;(w('export'),
                  C &&
                    M(
                      Ba({
                        fileName: P,
                        enabled: !0
                      })
                    ))
              }
            ),
            Le(
              () => [o.layoutType, o.layoutDirection],
              ([C, P]) => {
                ;(w('layout'),
                  C &&
                    C !== 'none' &&
                    M(
                      Na({
                        type: C,
                        direction: P
                      })
                    ))
              }
            ),
            o.keyboardShortcuts &&
              ((Ut = ew({
                enabled: !0,
                onDelete: () => {
                  const P = l.value.filter((Q) => Q.selected),
                    X = d.value.filter((Q) => Q.selected)
                  ;(P.forEach((Q) => L.removeNode(Q.id)),
                    X.forEach((Q) => D.removeEdge(Q.id)),
                    s('update:nodes', l.value),
                    s('update:edges', d.value))
                },
                onUndo: () => E.undo(),
                onRedo: () => E.redo(),
                onSelectAll: () => {
                  ;(l.value.forEach((P) => {
                    P.selected = !0
                  }),
                    d.value.forEach((P) => {
                      P.selected = !0
                    }))
                },
                onEscape: () => Y.clearSelection()
              }).handleKeyDown),
              document.addEventListener('keydown', Ut)))
        }),
        Nd(() => {
          ;(o.keyboardShortcuts && Ut && document.removeEventListener('keydown', Ut),
            document.removeEventListener('mousemove', le),
            document.removeEventListener('mouseup', he),
            m.destroyAll(),
            f.clear())
        }),
        (C, P) => {
          var X, Q, ve
          return (
            $(),
            j(
              'div',
              {
                ref_key: 'containerRef',
                ref: t,
                class: te([
                  'yh-flow',
                  {
                    'is-readonly': _.value,
                    'is-panning': z.value
                  }
                ]),
                tabindex: '0',
                onWheel: we(oe, ['prevent']),
                onMousedown: ce
              },
              [
                I(' Plugin Components (Background, etc.) '),
                ($(!0),
                j(
                  pe,
                  null,
                  ke(
                    v.value,
                    (de) => (
                      $(),
                      j(
                        pe,
                        {
                          key: de.id
                        },
                        [
                          de.component
                            ? ($(),
                              Ve(
                                Aa(de.component),
                                Et(
                                  {
                                    key: 0,
                                    ref_for: !0
                                  },
                                  de.componentProps
                                ),
                                null,
                                16
                                /* FULL_PROPS */
                              ))
                            : I('v-if', !0)
                        ],
                        64
                        /* STABLE_FRAGMENT */
                      )
                    )
                  ),
                  128
                  /* KEYED_FRAGMENT */
                )),
                I(' Main Content '),
                b(
                  'div',
                  {
                    class: 'yh-flow__content',
                    style: re(O.value)
                  },
                  [
                    I(' Edges '),
                    We(
                      Gk,
                      {
                        edges: d.value || [],
                        nodes: l.value || [],
                        'edge-types': e.edgeTypes,
                        transform: c.value,
                        'connecting-edge': U.value,
                        onEdgeClick: mo,
                        onEdgeDblclick: ft,
                        onEdgeContextmenu: ze,
                        onEdgeUpdateStart: Ee,
                        'updating-edge-id': (X = K.value) == null ? void 0 : X.edge.id
                      },
                      {
                        edge: Tt((de) => [it(C.$slots, 'edge', mc(pc(de)), void 0, !0)]),
                        _: 3
                        /* FORWARDED */
                      },
                      8,
                      [
                        'edges',
                        'nodes',
                        'edge-types',
                        'transform',
                        'connecting-edge',
                        'updating-edge-id'
                      ]
                    ),
                    I(' Edge Handles (for updating/reconnecting edges) '),
                    We(
                      Qk,
                      {
                        edges: d.value || [],
                        nodes: l.value || [],
                        onEdgeUpdateStart: Ee
                      },
                      null,
                      8,
                      ['edges', 'nodes']
                    ),
                    I(' Nodes '),
                    We(
                      sS,
                      {
                        nodes: S.value || [],
                        'node-types': e.nodeTypes,
                        transform: c.value,
                        draggable: e.nodesDraggable && !_.value,
                        readonly: _.value,
                        onNodeClick: be,
                        onNodeDblclick: _e,
                        onNodeContextmenu: Ue,
                        onNodeDragStart: fe,
                        onNodeDrag: Ze,
                        onNodeDragEnd: Qe,
                        onConnectStart: mt,
                        onNodeSelectToggle: Se
                      },
                      {
                        node: Tt((de) => [it(C.$slots, 'node', mc(pc(de)), void 0, !0)]),
                        _: 3
                        /* FORWARDED */
                      },
                      8,
                      ['nodes', 'node-types', 'transform', 'draggable', 'readonly']
                    ),
                    I(' Selection Box '),
                    We(
                      uS,
                      {
                        'selection-rect': De(Y).selectionRect.value,
                        transform: c.value
                      },
                      null,
                      8,
                      ['selection-rect', 'transform']
                    )
                  ],
                  4
                  /* STYLE */
                ),
                I(' UI Overlay Plugin Components (Controls, Minimap, etc.) '),
                ($(!0),
                j(
                  pe,
                  null,
                  ke(
                    g.value,
                    (de) => (
                      $(),
                      j(
                        pe,
                        {
                          key: de.id
                        },
                        [
                          de.component
                            ? ($(),
                              Ve(
                                Aa(de.component),
                                Et(
                                  {
                                    key: 0,
                                    ref_for: !0
                                  },
                                  de.componentProps
                                ),
                                null,
                                16
                                /* FULL_PROPS */
                              ))
                            : I('v-if', !0)
                        ],
                        64
                        /* STABLE_FRAGMENT */
                      )
                    )
                  ),
                  128
                  /* KEYED_FRAGMENT */
                )),
                I(' Connection Line (dragging) '),
                N.value
                  ? ($(),
                    j('svg', WD, [
                      b(
                        'path',
                        {
                          d: V.value,
                          stroke: 'var(--flow-edge-animated-stroke, #409eff)',
                          'stroke-width': '2',
                          fill: 'none',
                          'stroke-dasharray': '5,5'
                        },
                        null,
                        8,
                        VD
                      )
                    ]))
                  : I('v-if', !0),
                I(' Node Edit Panel '),
                I(' AI 工作流节点使用 AI 配置面板 '),
                (ve = (Q = se.value) == null ? void 0 : Q.type) != null && ve.startsWith('ai-')
                  ? ($(),
                    Ve(
                      wD,
                      {
                        key: 1,
                        node: se.value,
                        visible: ne.value,
                        onUpdate: st,
                        onClose: Nt
                      },
                      null,
                      8,
                      ['node', 'visible']
                    ))
                  : ($(),
                    j(
                      pe,
                      { key: 2 },
                      [
                        I(' 普通节点使用基础编辑面板 '),
                        We(
                          CS,
                          {
                            node: se.value,
                            visible: ne.value,
                            onUpdate: st,
                            onClose: Nt
                          },
                          null,
                          8,
                          ['node', 'visible']
                        )
                      ],
                      2112
                      /* STABLE_FRAGMENT, DEV_ROOT_FRAGMENT */
                    )),
                I(' Edge Edit Panel '),
                We(
                  GD,
                  {
                    edge: B.value,
                    visible: A.value,
                    'edge-types': e.edgeTypes,
                    onUpdate: Ot,
                    onClose: et
                  },
                  null,
                  8,
                  ['edge', 'visible', 'edge-types']
                )
              ],
              34
              /* CLASS, NEED_HYDRATION */
            )
          )
        }
      )
    }
  }),
  cI = /* @__PURE__ */ ue(KD, [['__scopeId', 'data-v-2b01066f']]),
  XD = ['width', 'height'],
  ZD = ['cx', 'cy', 'fill'],
  QD = ['d', 'stroke'],
  eE = ['fill'],
  tE = /* @__PURE__ */ ie({
    __name: 'FlowBackground',
    props: {
      type: {},
      color: {},
      gap: {}
    },
    setup(e, { expose: a }) {
      var _
      const n = e,
        o = `yh-bg-pattern-${((_ = G1()) == null ? void 0 : _.uid) ?? Math.random().toString(36).slice(2)}`,
        s = ee(),
        t = ee(),
        i = ee(),
        u = ee(),
        d = n.gap || 20
      function c(f) {
        const m = t.value
        if (!m) return
        const y = (n.gap || 20) * f.zoom,
          p = f.x % y,
          v = f.y % y
        if (
          (m.setAttribute('x', String(p)),
          m.setAttribute('y', String(v)),
          m.setAttribute('width', String(y)),
          m.setAttribute('height', String(y)),
          n.type === 'dots' && i.value)
        ) {
          const g = y / 2
          ;(i.value.setAttribute('cx', String(g)),
            i.value.setAttribute('cy', String(g)),
            i.value.setAttribute('r', String(Math.max(0.8, 1.5 * f.zoom))))
        } else n.type === 'grid' && u.value && u.value.setAttribute('d', `M ${y} 0 L 0 0 0 ${y}`)
      }
      return (
        a({ updateViewport: c }),
        (f, m) => (
          $(),
          j(
            pe,
            null,
            [
              I(`
    ★ 性能优化背景：
    - 不依赖 Vue 响应式，改由父组件手动调用 update(viewport) 驱动
    - SVG pattern：只改 x/y/width/height 属性，浏览器不需要重绘
  `),
              ($(),
              j(
                'svg',
                {
                  ref_key: 'svgRef',
                  ref: s,
                  class: 'yh-flow-background',
                  xmlns: 'http://www.w3.org/2000/svg'
                },
                [
                  b('defs', null, [
                    b(
                      'pattern',
                      {
                        ref_key: 'patternRef',
                        ref: t,
                        id: o,
                        x: '0',
                        y: '0',
                        width: De(d),
                        height: De(d),
                        patternUnits: 'userSpaceOnUse'
                      },
                      [
                        e.type === 'dots'
                          ? ($(),
                            j(
                              'circle',
                              {
                                key: 0,
                                ref_key: 'dotRef',
                                ref: i,
                                cx: De(d) / 2,
                                cy: De(d) / 2,
                                r: '1',
                                fill: e.color || '#b1b1b7'
                              },
                              null,
                              8,
                              ZD
                            ))
                          : e.type === 'grid'
                            ? ($(),
                              j(
                                'path',
                                {
                                  key: 1,
                                  ref_key: 'gridPathRef',
                                  ref: u,
                                  d: `M ${De(d)} 0 L 0 0 0 ${De(d)}`,
                                  fill: 'none',
                                  stroke: e.color || '#e5e7eb',
                                  'stroke-width': '0.5'
                                },
                                null,
                                8,
                                QD
                              ))
                            : I('v-if', !0)
                      ],
                      8,
                      XD
                    )
                  ]),
                  b(
                    'rect',
                    {
                      width: '100%',
                      height: '100%',
                      fill: `url(#${o})`
                    },
                    null,
                    8,
                    eE
                  )
                ],
                512
                /* NEED_PATCH */
              ))
            ],
            2112
            /* STABLE_FRAGMENT, DEV_ROOT_FRAGMENT */
          )
        )
      )
    }
  }),
  _I = /* @__PURE__ */ ue(tE, [['__scopeId', 'data-v-f6632668']])
function rE(e, a) {
  if (e.match(/^[a-z]+:\/\//i)) return e
  if (e.match(/^\/\//)) return window.location.protocol + e
  if (e.match(/^[a-z]+:/i)) return e
  const n = document.implementation.createHTMLDocument(),
    r = n.createElement('base'),
    o = n.createElement('a')
  return (n.head.appendChild(r), n.body.appendChild(o), a && (r.href = a), (o.href = e), o.href)
}
const nE = /* @__PURE__ */ (() => {
  let e = 0
  const a = () =>
    // eslint-disable-next-line no-bitwise
    `0000${((Math.random() * 36 ** 4) << 0).toString(36)}`.slice(-4)
  return () => ((e += 1), `u${a()}${e}`)
})()
function at(e) {
  const a = []
  for (let n = 0, r = e.length; n < r; n++) a.push(e[n])
  return a
}
let pt = null
function Jg(e = {}) {
  return (
    pt ||
    (e.includeStyleProperties
      ? ((pt = e.includeStyleProperties), pt)
      : ((pt = at(window.getComputedStyle(document.documentElement))), pt))
  )
}
function Oa(e, a) {
  const r = (e.ownerDocument.defaultView || window).getComputedStyle(e).getPropertyValue(a)
  return r ? parseFloat(r.replace('px', '')) : 0
}
function aE(e) {
  const a = Oa(e, 'border-left-width'),
    n = Oa(e, 'border-right-width')
  return e.clientWidth + a + n
}
function oE(e) {
  const a = Oa(e, 'border-top-width'),
    n = Oa(e, 'border-bottom-width')
  return e.clientHeight + a + n
}
function Gd(e, a = {}) {
  const n = a.width || aE(e),
    r = a.height || oE(e)
  return { width: n, height: r }
}
function sE() {
  let e, a
  try {
    a = process
  } catch {}
  const n = a && a.env ? a.env.devicePixelRatio : null
  return (
    n && ((e = parseInt(n, 10)), Number.isNaN(e) && (e = 1)),
    e || window.devicePixelRatio || 1
  )
}
const Ae = 16384
function iE(e) {
  ;(e.width > Ae || e.height > Ae) &&
    (e.width > Ae && e.height > Ae
      ? e.width > e.height
        ? ((e.height *= Ae / e.width), (e.width = Ae))
        : ((e.width *= Ae / e.height), (e.height = Ae))
      : e.width > Ae
        ? ((e.height *= Ae / e.width), (e.width = Ae))
        : ((e.width *= Ae / e.height), (e.height = Ae)))
}
function uE(e, a = {}) {
  return e.toBlob
    ? new Promise((n) => {
        e.toBlob(n, a.type ? a.type : 'image/png', a.quality ? a.quality : 1)
      })
    : new Promise((n) => {
        const r = window.atob(
            e.toDataURL(a.type ? a.type : void 0, a.quality ? a.quality : void 0).split(',')[1]
          ),
          o = r.length,
          s = new Uint8Array(o)
        for (let t = 0; t < o; t += 1) s[t] = r.charCodeAt(t)
        n(
          new Blob([s], {
            type: a.type ? a.type : 'image/png'
          })
        )
      })
}
function za(e) {
  return new Promise((a, n) => {
    const r = new Image()
    ;((r.onload = () => {
      r.decode().then(() => {
        requestAnimationFrame(() => a(r))
      })
    }),
      (r.onerror = n),
      (r.crossOrigin = 'anonymous'),
      (r.decoding = 'async'),
      (r.src = e))
  })
}
async function lE(e) {
  return Promise.resolve()
    .then(() => new XMLSerializer().serializeToString(e))
    .then(encodeURIComponent)
    .then((a) => `data:image/svg+xml;charset=utf-8,${a}`)
}
async function dE(e, a, n) {
  const r = 'http://www.w3.org/2000/svg',
    o = document.createElementNS(r, 'svg'),
    s = document.createElementNS(r, 'foreignObject')
  return (
    o.setAttribute('width', `${a}`),
    o.setAttribute('height', `${n}`),
    o.setAttribute('viewBox', `0 0 ${a} ${n}`),
    s.setAttribute('width', '100%'),
    s.setAttribute('height', '100%'),
    s.setAttribute('x', '0'),
    s.setAttribute('y', '0'),
    s.setAttribute('externalResourcesRequired', 'true'),
    o.appendChild(s),
    s.appendChild(e),
    lE(o)
  )
}
const je = (e, a) => {
  if (e instanceof a) return !0
  const n = Object.getPrototypeOf(e)
  return n === null ? !1 : n.constructor.name === a.name || je(n, a)
}
function cE(e) {
  const a = e.getPropertyValue('content')
  return `${e.cssText} content: '${a.replace(/'|"/g, '')}';`
}
function _E(e, a) {
  return Jg(a)
    .map((n) => {
      const r = e.getPropertyValue(n),
        o = e.getPropertyPriority(n)
      return `${n}: ${r}${o ? ' !important' : ''};`
    })
    .join(' ')
}
function fE(e, a, n, r) {
  const o = `.${e}:${a}`,
    s = n.cssText ? cE(n) : _E(n, r)
  return document.createTextNode(`${o}{${s}}`)
}
function Lc(e, a, n, r) {
  const o = window.getComputedStyle(e, n),
    s = o.getPropertyValue('content')
  if (s === '' || s === 'none') return
  const t = nE()
  try {
    a.className = `${a.className} ${t}`
  } catch {
    return
  }
  const i = document.createElement('style')
  ;(i.appendChild(fE(t, n, o, r)), a.appendChild(i))
}
function mE(e, a, n) {
  ;(Lc(e, a, ':before', n), Lc(e, a, ':after', n))
}
const kc = 'application/font-woff',
  Sc = 'image/jpeg',
  pE = {
    woff: kc,
    woff2: kc,
    ttf: 'application/font-truetype',
    eot: 'application/vnd.ms-fontobject',
    png: 'image/png',
    jpg: Sc,
    jpeg: Sc,
    gif: 'image/gif',
    tiff: 'image/tiff',
    svg: 'image/svg+xml',
    webp: 'image/webp'
  }
function hE(e) {
  const a = /\.([^./]*?)$/g.exec(e)
  return a ? a[1] : ''
}
function Jd(e) {
  const a = hE(e).toLowerCase()
  return pE[a] || ''
}
function vE(e) {
  return e.split(/,/)[1]
}
function Pd(e) {
  return e.search(/^(data:)/) !== -1
}
function yE(e, a) {
  return `data:${a};base64,${e}`
}
async function Ug(e, a, n) {
  const r = await fetch(e, a)
  if (r.status === 404) throw new Error(`Resource "${r.url}" not found`)
  const o = await r.blob()
  return new Promise((s, t) => {
    const i = new FileReader()
    ;((i.onerror = t),
      (i.onloadend = () => {
        try {
          s(n({ res: r, result: i.result }))
        } catch (u) {
          t(u)
        }
      }),
      i.readAsDataURL(o))
  })
}
const Mo = {}
function gE(e, a, n) {
  let r = e.replace(/\?.*/, '')
  return (
    n && (r = e),
    /ttf|otf|eot|woff2?/i.test(r) && (r = r.replace(/.*\//, '')),
    a ? `[${a}]${r}` : r
  )
}
async function Ud(e, a, n) {
  const r = gE(e, a, n.includeQueryParams)
  if (Mo[r] != null) return Mo[r]
  n.cacheBust && (e += (/\?/.test(e) ? '&' : '?') + /* @__PURE__ */ new Date().getTime())
  let o
  try {
    const s = await Ug(
      e,
      n.fetchRequestInit,
      ({ res: t, result: i }) => (a || (a = t.headers.get('Content-Type') || ''), vE(i))
    )
    o = yE(s, a)
  } catch (s) {
    o = n.imagePlaceholder || ''
    let t = `Failed to fetch resource: ${e}`
    ;(s && (t = typeof s == 'string' ? s : s.message), t && console.warn(t))
  }
  return ((Mo[r] = o), o)
}
async function ME(e) {
  const a = e.toDataURL()
  return a === 'data:,' ? e.cloneNode(!1) : za(a)
}
async function bE(e, a) {
  if (e.currentSrc) {
    const s = document.createElement('canvas'),
      t = s.getContext('2d')
    ;((s.width = e.clientWidth),
      (s.height = e.clientHeight),
      t == null || t.drawImage(e, 0, 0, s.width, s.height))
    const i = s.toDataURL()
    return za(i)
  }
  const n = e.poster,
    r = Jd(n),
    o = await Ud(n, r, a)
  return za(o)
}
async function YE(e, a) {
  var n
  try {
    if (!((n = e == null ? void 0 : e.contentDocument) === null || n === void 0) && n.body)
      return await Va(e.contentDocument.body, a, !0)
  } catch {}
  return e.cloneNode(!1)
}
async function wE(e, a) {
  return je(e, HTMLCanvasElement)
    ? ME(e)
    : je(e, HTMLVideoElement)
      ? bE(e, a)
      : je(e, HTMLIFrameElement)
        ? YE(e, a)
        : e.cloneNode(Wg(e))
}
const xE = (e) => e.tagName != null && e.tagName.toUpperCase() === 'SLOT',
  Wg = (e) => e.tagName != null && e.tagName.toUpperCase() === 'SVG'
async function LE(e, a, n) {
  var r, o
  if (Wg(a)) return a
  let s = []
  return (
    xE(e) && e.assignedNodes
      ? (s = at(e.assignedNodes()))
      : je(e, HTMLIFrameElement) && !((r = e.contentDocument) === null || r === void 0) && r.body
        ? (s = at(e.contentDocument.body.childNodes))
        : (s = at(((o = e.shadowRoot) !== null && o !== void 0 ? o : e).childNodes)),
    s.length === 0 ||
      je(e, HTMLVideoElement) ||
      (await s.reduce(
        (t, i) =>
          t
            .then(() => Va(i, n))
            .then((u) => {
              u && a.appendChild(u)
            }),
        Promise.resolve()
      )),
    a
  )
}
function kE(e, a, n) {
  const r = a.style
  if (!r) return
  const o = window.getComputedStyle(e)
  o.cssText
    ? ((r.cssText = o.cssText), (r.transformOrigin = o.transformOrigin))
    : Jg(n).forEach((s) => {
        let t = o.getPropertyValue(s)
        ;(s === 'font-size' &&
          t.endsWith('px') &&
          (t = `${Math.floor(parseFloat(t.substring(0, t.length - 2))) - 0.1}px`),
          je(e, HTMLIFrameElement) && s === 'display' && t === 'inline' && (t = 'block'),
          s === 'd' && a.getAttribute('d') && (t = `path(${a.getAttribute('d')})`),
          r.setProperty(s, t, o.getPropertyPriority(s)))
      })
}
function SE(e, a) {
  ;(je(e, HTMLTextAreaElement) && (a.innerHTML = e.value),
    je(e, HTMLInputElement) && a.setAttribute('value', e.value))
}
function DE(e, a) {
  if (je(e, HTMLSelectElement)) {
    const r = Array.from(a.children).find((o) => e.value === o.getAttribute('value'))
    r && r.setAttribute('selected', '')
  }
}
function EE(e, a, n) {
  return (je(a, Element) && (kE(e, a, n), mE(e, a, n), SE(e, a), DE(e, a)), a)
}
async function TE(e, a) {
  const n = e.querySelectorAll ? e.querySelectorAll('use') : []
  if (n.length === 0) return e
  const r = {}
  for (let s = 0; s < n.length; s++) {
    const i = n[s].getAttribute('xlink:href')
    if (i) {
      const u = e.querySelector(i),
        l = document.querySelector(i)
      !u && l && !r[i] && (r[i] = await Va(l, a, !0))
    }
  }
  const o = Object.values(r)
  if (o.length) {
    const s = 'http://www.w3.org/1999/xhtml',
      t = document.createElementNS(s, 'svg')
    ;(t.setAttribute('xmlns', s),
      (t.style.position = 'absolute'),
      (t.style.width = '0'),
      (t.style.height = '0'),
      (t.style.overflow = 'hidden'),
      (t.style.display = 'none'))
    const i = document.createElementNS(s, 'defs')
    t.appendChild(i)
    for (let u = 0; u < o.length; u++) i.appendChild(o[u])
    e.appendChild(t)
  }
  return e
}
async function Va(e, a, n) {
  return !n && a.filter && !a.filter(e)
    ? null
    : Promise.resolve(e)
        .then((r) => wE(r, a))
        .then((r) => LE(e, r, a))
        .then((r) => EE(e, r, a))
        .then((r) => TE(r, a))
}
const Vg = /url\((['"]?)([^'"]+?)\1\)/g,
  $E = /url\([^)]+\)\s*format\((["']?)([^"']+)\1\)/g,
  HE = /src:\s*(?:url\([^)]+\)\s*format\([^)]+\)[,;]\s*)+/g
function jE(e) {
  const a = e.replace(/([.*+?^${}()|\[\]\/\\])/g, '\\$1')
  return new RegExp(`(url\\(['"]?)(${a})(['"]?\\))`, 'g')
}
function CE(e) {
  const a = []
  return (e.replace(Vg, (n, r, o) => (a.push(o), n)), a.filter((n) => !Pd(n)))
}
async function AE(e, a, n, r, o) {
  try {
    const s = n ? rE(a, n) : a,
      t = Jd(a)
    let i
    return (o || (i = await Ud(s, t, r)), e.replace(jE(a), `$1${i}$3`))
  } catch {}
  return e
}
function qE(e, { preferredFontFormat: a }) {
  return a
    ? e.replace(HE, (n) => {
        for (;;) {
          const [r, , o] = $E.exec(n) || []
          if (!o) return ''
          if (o === a) return `src: ${r};`
        }
      })
    : e
}
function Kg(e) {
  return e.search(Vg) !== -1
}
async function Xg(e, a, n) {
  if (!Kg(e)) return e
  const r = qE(e, n)
  return CE(r).reduce((s, t) => s.then((i) => AE(i, t, a, n)), Promise.resolve(r))
}
async function ht(e, a, n) {
  var r
  const o = (r = a.style) === null || r === void 0 ? void 0 : r.getPropertyValue(e)
  if (o) {
    const s = await Xg(o, null, n)
    return (a.style.setProperty(e, s, a.style.getPropertyPriority(e)), !0)
  }
  return !1
}
async function FE(e, a) {
  ;((await ht('background', e, a)) || (await ht('background-image', e, a)),
    (await ht('mask', e, a)) ||
      (await ht('-webkit-mask', e, a)) ||
      (await ht('mask-image', e, a)) ||
      (await ht('-webkit-mask-image', e, a)))
}
async function RE(e, a) {
  const n = je(e, HTMLImageElement)
  if (!(n && !Pd(e.src)) && !(je(e, SVGImageElement) && !Pd(e.href.baseVal))) return
  const r = n ? e.src : e.href.baseVal,
    o = await Ud(r, Jd(r), a)
  await new Promise((s, t) => {
    ;((e.onload = s),
      (e.onerror = a.onImageErrorHandler
        ? (...u) => {
            try {
              s(a.onImageErrorHandler(...u))
            } catch (l) {
              t(l)
            }
          }
        : t))
    const i = e
    ;(i.decode && (i.decode = s),
      i.loading === 'lazy' && (i.loading = 'eager'),
      n ? ((e.srcset = ''), (e.src = o)) : (e.href.baseVal = o))
  })
}
async function IE(e, a) {
  const r = at(e.childNodes).map((o) => Zg(o, a))
  await Promise.all(r).then(() => e)
}
async function Zg(e, a) {
  je(e, Element) && (await FE(e, a), await RE(e, a), await IE(e, a))
}
function PE(e, a) {
  const { style: n } = e
  ;(a.backgroundColor && (n.backgroundColor = a.backgroundColor),
    a.width && (n.width = `${a.width}px`),
    a.height && (n.height = `${a.height}px`))
  const r = a.style
  return (
    r != null &&
      Object.keys(r).forEach((o) => {
        n[o] = r[o]
      }),
    e
  )
}
const Dc = {}
async function Ec(e) {
  let a = Dc[e]
  if (a != null) return a
  const r = await (await fetch(e)).text()
  return ((a = { url: e, cssText: r }), (Dc[e] = a), a)
}
async function Tc(e, a) {
  let n = e.cssText
  const r = /url\(["']?([^"')]+)["']?\)/g,
    s = (n.match(/url\([^)]+\)/g) || []).map(async (t) => {
      let i = t.replace(r, '$1')
      return (
        i.startsWith('https://') || (i = new URL(i, e.url).href),
        Ug(i, a.fetchRequestInit, ({ result: u }) => ((n = n.replace(t, `url(${u})`)), [t, u]))
      )
    })
  return Promise.all(s).then(() => n)
}
function $c(e) {
  if (e == null) return []
  const a = [],
    n = /(\/\*[\s\S]*?\*\/)/gi
  let r = e.replace(n, '')
  const o = new RegExp('((@.*?keyframes [\\s\\S]*?){([\\s\\S]*?}\\s*?)})', 'gi')
  for (;;) {
    const u = o.exec(r)
    if (u === null) break
    a.push(u[0])
  }
  r = r.replace(o, '')
  const s = /@import[\s\S]*?url\([^)]*\)[\s\S]*?;/gi,
    t =
      '((\\s*?(?:\\/\\*[\\s\\S]*?\\*\\/)?\\s*?@media[\\s\\S]*?){([\\s\\S]*?)}\\s*?})|(([\\s\\S]*?){([\\s\\S]*?)})',
    i = new RegExp(t, 'gi')
  for (;;) {
    let u = s.exec(r)
    if (u === null) {
      if (((u = i.exec(r)), u === null)) break
      s.lastIndex = i.lastIndex
    } else i.lastIndex = s.lastIndex
    a.push(u[0])
  }
  return a
}
async function BE(e, a) {
  const n = [],
    r = []
  return (
    e.forEach((o) => {
      if ('cssRules' in o)
        try {
          at(o.cssRules || []).forEach((s, t) => {
            if (s.type === CSSRule.IMPORT_RULE) {
              let i = t + 1
              const u = s.href,
                l = Ec(u)
                  .then((d) => Tc(d, a))
                  .then((d) =>
                    $c(d).forEach((c) => {
                      try {
                        o.insertRule(c, c.startsWith('@import') ? (i += 1) : o.cssRules.length)
                      } catch (_) {
                        console.error('Error inserting rule from remote css', {
                          rule: c,
                          error: _
                        })
                      }
                    })
                  )
                  .catch((d) => {
                    console.error('Error loading remote css', d.toString())
                  })
              r.push(l)
            }
          })
        } catch (s) {
          const t = e.find((i) => i.href == null) || document.styleSheets[0]
          ;(o.href != null &&
            r.push(
              Ec(o.href)
                .then((i) => Tc(i, a))
                .then((i) =>
                  $c(i).forEach((u) => {
                    t.insertRule(u, t.cssRules.length)
                  })
                )
                .catch((i) => {
                  console.error('Error loading remote stylesheet', i)
                })
            ),
            console.error('Error inlining remote css file', s))
        }
    }),
    Promise.all(r).then(
      () => (
        e.forEach((o) => {
          if ('cssRules' in o)
            try {
              at(o.cssRules || []).forEach((s) => {
                n.push(s)
              })
            } catch (s) {
              console.error(`Error while reading CSS rules from ${o.href}`, s)
            }
        }),
        n
      )
    )
  )
}
function NE(e) {
  return e
    .filter((a) => a.type === CSSRule.FONT_FACE_RULE)
    .filter((a) => Kg(a.style.getPropertyValue('src')))
}
async function OE(e, a) {
  if (e.ownerDocument == null) throw new Error('Provided element is not within a Document')
  const n = at(e.ownerDocument.styleSheets),
    r = await BE(n, a)
  return NE(r)
}
function Qg(e) {
  return e.trim().replace(/["']/g, '')
}
function zE(e) {
  const a = /* @__PURE__ */ new Set()
  function n(r) {
    ;((r.style.fontFamily || getComputedStyle(r).fontFamily).split(',').forEach((s) => {
      a.add(Qg(s))
    }),
      Array.from(r.children).forEach((s) => {
        s instanceof HTMLElement && n(s)
      }))
  }
  return (n(e), a)
}
async function eM(e, a) {
  const n = await OE(e, a),
    r = zE(e)
  return (
    await Promise.all(
      n
        .filter((s) => r.has(Qg(s.style.fontFamily)))
        .map((s) => {
          const t = s.parentStyleSheet ? s.parentStyleSheet.href : null
          return Xg(s.cssText, t, a)
        })
    )
  ).join(`
`)
}
async function GE(e, a) {
  const n = a.fontEmbedCSS != null ? a.fontEmbedCSS : a.skipFonts ? null : await eM(e, a)
  if (n) {
    const r = document.createElement('style'),
      o = document.createTextNode(n)
    ;(r.appendChild(o), e.firstChild ? e.insertBefore(r, e.firstChild) : e.appendChild(r))
  }
}
async function tM(e, a = {}) {
  const { width: n, height: r } = Gd(e, a),
    o = await Va(e, a, !0)
  return (await GE(o, a), await Zg(o, a), PE(o, a), await dE(o, n, r))
}
async function qt(e, a = {}) {
  const { width: n, height: r } = Gd(e, a),
    o = await tM(e, a),
    s = await za(o),
    t = document.createElement('canvas'),
    i = t.getContext('2d'),
    u = a.pixelRatio || sE(),
    l = a.canvasWidth || n,
    d = a.canvasHeight || r
  return (
    (t.width = l * u),
    (t.height = d * u),
    a.skipAutoScale || iE(t),
    (t.style.width = `${l}`),
    (t.style.height = `${d}`),
    a.backgroundColor && ((i.fillStyle = a.backgroundColor), i.fillRect(0, 0, t.width, t.height)),
    i.drawImage(s, 0, 0, t.width, t.height),
    t
  )
}
async function JE(e, a = {}) {
  const { width: n, height: r } = Gd(e, a)
  return (await qt(e, a)).getContext('2d').getImageData(0, 0, n, r).data
}
async function UE(e, a = {}) {
  return (await qt(e, a)).toDataURL()
}
async function WE(e, a = {}) {
  return (await qt(e, a)).toDataURL('image/jpeg', a.quality || 1)
}
async function VE(e, a = {}) {
  const n = await qt(e, a)
  return await uE(n)
}
async function KE(e, a = {}) {
  return eM(e, a)
}
const XE = /* @__PURE__ */ Object.freeze(
  /* @__PURE__ */ Object.defineProperty(
    {
      __proto__: null,
      getFontEmbedCSS: KE,
      toBlob: VE,
      toCanvas: qt,
      toJpeg: WE,
      toPixelData: JE,
      toPng: UE,
      toSvg: tM
    },
    Symbol.toStringTag,
    { value: 'Module' }
  )
)
var er = { exports: {} },
  ZE = er.exports,
  Hc
function QE() {
  return (
    Hc ||
      ((Hc = 1),
      (function (e, a) {
        ;(function (n, r) {
          e.exports = r(R())
        })(ZE, function (n) {
          function r(t) {
            return t && typeof t == 'object' && 'default' in t ? t : { default: t }
          }
          var o = r(n),
            s = {
              name: 'af',
              weekdays: 'Sondag_Maandag_Dinsdag_Woensdag_Donderdag_Vrydag_Saterdag'.split('_'),
              months:
                'Januarie_Februarie_Maart_April_Mei_Junie_Julie_Augustus_September_Oktober_November_Desember'.split(
                  '_'
                ),
              weekStart: 1,
              weekdaysShort: 'Son_Maa_Din_Woe_Don_Vry_Sat'.split('_'),
              monthsShort: 'Jan_Feb_Mrt_Apr_Mei_Jun_Jul_Aug_Sep_Okt_Nov_Des'.split('_'),
              weekdaysMin: 'So_Ma_Di_Wo_Do_Vr_Sa'.split('_'),
              ordinal: function (t) {
                return t
              },
              formats: {
                LT: 'HH:mm',
                LTS: 'HH:mm:ss',
                L: 'DD/MM/YYYY',
                LL: 'D MMMM YYYY',
                LLL: 'D MMMM YYYY HH:mm',
                LLLL: 'dddd, D MMMM YYYY HH:mm'
              },
              relativeTime: {
                future: 'oor %s',
                past: '%s gelede',
                s: "'n paar sekondes",
                m: "'n minuut",
                mm: '%d minute',
                h: "'n uur",
                hh: '%d ure',
                d: "'n dag",
                dd: '%d dae',
                M: "'n maand",
                MM: '%d maande',
                y: "'n jaar",
                yy: '%d jaar'
              }
            }
          return (o.default.locale(s, null, !0), s)
        })
      })(er)),
    er.exports
  )
}
var rM = QE()
const e2 = /* @__PURE__ */ F(rM),
  t2 = /* @__PURE__ */ q(
    {
      __proto__: null,
      default: e2
    },
    [rM]
  )
var tr = { exports: {} },
  r2 = tr.exports,
  jc
function n2() {
  return (
    jc ||
      ((jc = 1),
      (function (e, a) {
        ;(function (n, r) {
          e.exports = r(R())
        })(r2, function (n) {
          function r(t) {
            return t && typeof t == 'object' && 'default' in t ? t : { default: t }
          }
          var o = r(n),
            s = {
              name: 'am',
              weekdays: 'እሑድ_ሰኞ_ማክሰኞ_ረቡዕ_ሐሙስ_አርብ_ቅዳሜ'.split('_'),
              weekdaysShort: 'እሑድ_ሰኞ_ማክሰ_ረቡዕ_ሐሙስ_አርብ_ቅዳሜ'.split('_'),
              weekdaysMin: 'እሑ_ሰኞ_ማክ_ረቡ_ሐሙ_አር_ቅዳ'.split('_'),
              months: 'ጃንዋሪ_ፌብሯሪ_ማርች_ኤፕሪል_ሜይ_ጁን_ጁላይ_ኦገስት_ሴፕቴምበር_ኦክቶበር_ኖቬምበር_ዲሴምበር'.split('_'),
              monthsShort: 'ጃንዋ_ፌብሯ_ማርች_ኤፕሪ_ሜይ_ጁን_ጁላይ_ኦገስ_ሴፕቴ_ኦክቶ_ኖቬም_ዲሴም'.split('_'),
              weekStart: 1,
              yearStart: 4,
              relativeTime: {
                future: 'በ%s',
                past: '%s በፊት',
                s: 'ጥቂት ሰከንዶች',
                m: 'አንድ ደቂቃ',
                mm: '%d ደቂቃዎች',
                h: 'አንድ ሰዓት',
                hh: '%d ሰዓታት',
                d: 'አንድ ቀን',
                dd: '%d ቀናት',
                M: 'አንድ ወር',
                MM: '%d ወራት',
                y: 'አንድ ዓመት',
                yy: '%d ዓመታት'
              },
              formats: {
                LT: 'HH:mm',
                LTS: 'HH:mm:ss',
                L: 'DD/MM/YYYY',
                LL: 'MMMM D ፣ YYYY',
                LLL: 'MMMM D ፣ YYYY HH:mm',
                LLLL: 'dddd ፣ MMMM D ፣ YYYY HH:mm'
              },
              ordinal: function (t) {
                return t + 'ኛ'
              }
            }
          return (o.default.locale(s, null, !0), s)
        })
      })(tr)),
    tr.exports
  )
}
var nM = n2()
const a2 = /* @__PURE__ */ F(nM),
  o2 = /* @__PURE__ */ q(
    {
      __proto__: null,
      default: a2
    },
    [nM]
  )
var rr = { exports: {} },
  s2 = rr.exports,
  Cc
function i2() {
  return (
    Cc ||
      ((Cc = 1),
      (function (e, a) {
        ;(function (n, r) {
          e.exports = r(R())
        })(s2, function (n) {
          function r(t) {
            return t && typeof t == 'object' && 'default' in t ? t : { default: t }
          }
          var o = r(n),
            s = {
              name: 'ar-dz',
              weekdays: 'الأحد_الإثنين_الثلاثاء_الأربعاء_الخميس_الجمعة_السبت'.split('_'),
              months:
                'جانفي_فيفري_مارس_أفريل_ماي_جوان_جويلية_أوت_سبتمبر_أكتوبر_نوفمبر_ديسمبر'.split('_'),
              weekdaysShort: 'احد_اثنين_ثلاثاء_اربعاء_خميس_جمعة_سبت'.split('_'),
              monthsShort:
                'جانفي_فيفري_مارس_أفريل_ماي_جوان_جويلية_أوت_سبتمبر_أكتوبر_نوفمبر_ديسمبر'.split('_'),
              weekdaysMin: 'أح_إث_ثلا_أر_خم_جم_سب'.split('_'),
              ordinal: function (t) {
                return t
              },
              formats: {
                LT: 'HH:mm',
                LTS: 'HH:mm:ss',
                L: 'DD/MM/YYYY',
                LL: 'D MMMM YYYY',
                LLL: 'D MMMM YYYY HH:mm',
                LLLL: 'dddd D MMMM YYYY HH:mm'
              },
              meridiem: function (t) {
                return t > 12 ? 'م' : 'ص'
              },
              relativeTime: {
                future: 'في %s',
                past: 'منذ %s',
                s: 'ثوان',
                m: 'دقيقة',
                mm: '%d دقائق',
                h: 'ساعة',
                hh: '%d ساعات',
                d: 'يوم',
                dd: '%d أيام',
                M: 'شهر',
                MM: '%d أشهر',
                y: 'سنة',
                yy: '%d سنوات'
              }
            }
          return (o.default.locale(s, null, !0), s)
        })
      })(rr)),
    rr.exports
  )
}
var aM = i2()
const u2 = /* @__PURE__ */ F(aM),
  l2 = /* @__PURE__ */ q(
    {
      __proto__: null,
      default: u2
    },
    [aM]
  )
var nr = { exports: {} },
  d2 = nr.exports,
  Ac
function c2() {
  return (
    Ac ||
      ((Ac = 1),
      (function (e, a) {
        ;(function (n, r) {
          e.exports = r(R())
        })(d2, function (n) {
          function r(t) {
            return t && typeof t == 'object' && 'default' in t ? t : { default: t }
          }
          var o = r(n),
            s = {
              name: 'ar-iq',
              weekdays: 'الأحد_الإثنين_الثلاثاء_الأربعاء_الخميس_الجمعة_السبت'.split('_'),
              months:
                'كانون الثاني_شباط_آذار_نيسان_أيار_حزيران_تموز_آب_أيلول_تشرين الأول_ تشرين الثاني_كانون الأول'.split(
                  '_'
                ),
              weekStart: 1,
              weekdaysShort: 'أحد_إثنين_ثلاثاء_أربعاء_خميس_جمعة_سبت'.split('_'),
              monthsShort:
                'كانون الثاني_شباط_آذار_نيسان_أيار_حزيران_تموز_آب_أيلول_تشرين الأول_ تشرين الثاني_كانون الأول'.split(
                  '_'
                ),
              weekdaysMin: 'ح_ن_ث_ر_خ_ج_س'.split('_'),
              ordinal: function (t) {
                return t
              },
              formats: {
                LT: 'HH:mm',
                LTS: 'HH:mm:ss',
                L: 'DD/MM/YYYY',
                LL: 'D MMMM YYYY',
                LLL: 'D MMMM YYYY HH:mm',
                LLLL: 'dddd D MMMM YYYY HH:mm'
              },
              meridiem: function (t) {
                return t > 12 ? 'م' : 'ص'
              },
              relativeTime: {
                future: 'في %s',
                past: 'منذ %s',
                s: 'ثوان',
                m: 'دقيقة',
                mm: '%d دقائق',
                h: 'ساعة',
                hh: '%d ساعات',
                d: 'يوم',
                dd: '%d أيام',
                M: 'شهر',
                MM: '%d أشهر',
                y: 'سنة',
                yy: '%d سنوات'
              }
            }
          return (o.default.locale(s, null, !0), s)
        })
      })(nr)),
    nr.exports
  )
}
var oM = c2()
const _2 = /* @__PURE__ */ F(oM),
  f2 = /* @__PURE__ */ q(
    {
      __proto__: null,
      default: _2
    },
    [oM]
  )
var ar = { exports: {} },
  m2 = ar.exports,
  qc
function p2() {
  return (
    qc ||
      ((qc = 1),
      (function (e, a) {
        ;(function (n, r) {
          e.exports = r(R())
        })(m2, function (n) {
          function r(t) {
            return t && typeof t == 'object' && 'default' in t ? t : { default: t }
          }
          var o = r(n),
            s = {
              name: 'ar-kw',
              weekdays: 'الأحد_الإثنين_الثلاثاء_الأربعاء_الخميس_الجمعة_السبت'.split('_'),
              months: 'يناير_فبراير_مارس_أبريل_ماي_يونيو_يوليوز_غشت_شتنبر_أكتوبر_نونبر_دجنبر'.split(
                '_'
              ),
              weekdaysShort: 'احد_اثنين_ثلاثاء_اربعاء_خميس_جمعة_سبت'.split('_'),
              monthsShort:
                'يناير_فبراير_مارس_أبريل_ماي_يونيو_يوليوز_غشت_شتنبر_أكتوبر_نونبر_دجنبر'.split('_'),
              weekdaysMin: 'ح_ن_ث_ر_خ_ج_س'.split('_'),
              ordinal: function (t) {
                return t
              },
              formats: {
                LT: 'HH:mm',
                LTS: 'HH:mm:ss',
                L: 'DD/MM/YYYY',
                LL: 'D MMMM YYYY',
                LLL: 'D MMMM YYYY HH:mm',
                LLLL: 'dddd D MMMM YYYY HH:mm'
              },
              meridiem: function (t) {
                return t > 12 ? 'م' : 'ص'
              },
              relativeTime: {
                future: 'في %s',
                past: 'منذ %s',
                s: 'ثوان',
                m: 'دقيقة',
                mm: '%d دقائق',
                h: 'ساعة',
                hh: '%d ساعات',
                d: 'يوم',
                dd: '%d أيام',
                M: 'شهر',
                MM: '%d أشهر',
                y: 'سنة',
                yy: '%d سنوات'
              }
            }
          return (o.default.locale(s, null, !0), s)
        })
      })(ar)),
    ar.exports
  )
}
var sM = p2()
const h2 = /* @__PURE__ */ F(sM),
  v2 = /* @__PURE__ */ q(
    {
      __proto__: null,
      default: h2
    },
    [sM]
  )
var or = { exports: {} },
  y2 = or.exports,
  Fc
function g2() {
  return (
    Fc ||
      ((Fc = 1),
      (function (e, a) {
        ;(function (n, r) {
          e.exports = r(R())
        })(y2, function (n) {
          function r(t) {
            return t && typeof t == 'object' && 'default' in t ? t : { default: t }
          }
          var o = r(n),
            s = {
              name: 'ar-ly',
              weekdays: 'الأحد_الإثنين_الثلاثاء_الأربعاء_الخميس_الجمعة_السبت'.split('_'),
              months:
                'يناير_فبراير_مارس_أبريل_مايو_يونيو_يوليو_أغسطس_سبتمبر_أكتوبر_نوفمبر_ديسمبر'.split(
                  '_'
                ),
              weekStart: 6,
              weekdaysShort: 'أحد_إثنين_ثلاثاء_أربعاء_خميس_جمعة_سبت'.split('_'),
              monthsShort:
                'يناير_فبراير_مارس_أبريل_مايو_يونيو_يوليو_أغسطس_سبتمبر_أكتوبر_نوفمبر_ديسمبر'.split(
                  '_'
                ),
              weekdaysMin: 'ح_ن_ث_ر_خ_ج_س'.split('_'),
              ordinal: function (t) {
                return t
              },
              meridiem: function (t) {
                return t > 12 ? 'م' : 'ص'
              },
              formats: {
                LT: 'HH:mm',
                LTS: 'HH:mm:ss',
                L: 'D/‏M/‏YYYY',
                LL: 'D MMMM YYYY',
                LLL: 'D MMMM YYYY HH:mm',
                LLLL: 'dddd D MMMM YYYY HH:mm'
              }
            }
          return (o.default.locale(s, null, !0), s)
        })
      })(or)),
    or.exports
  )
}
var iM = g2()
const M2 = /* @__PURE__ */ F(iM),
  b2 = /* @__PURE__ */ q(
    {
      __proto__: null,
      default: M2
    },
    [iM]
  )
var sr = { exports: {} },
  Y2 = sr.exports,
  Rc
function w2() {
  return (
    Rc ||
      ((Rc = 1),
      (function (e, a) {
        ;(function (n, r) {
          e.exports = r(R())
        })(Y2, function (n) {
          function r(t) {
            return t && typeof t == 'object' && 'default' in t ? t : { default: t }
          }
          var o = r(n),
            s = {
              name: 'ar-ma',
              weekdays: 'الأحد_الإثنين_الثلاثاء_الأربعاء_الخميس_الجمعة_السبت'.split('_'),
              months: 'يناير_فبراير_مارس_أبريل_ماي_يونيو_يوليوز_غشت_شتنبر_أكتوبر_نونبر_دجنبر'.split(
                '_'
              ),
              weekStart: 6,
              weekdaysShort: 'احد_إثنين_ثلاثاء_اربعاء_خميس_جمعة_سبت'.split('_'),
              monthsShort:
                'يناير_فبراير_مارس_أبريل_ماي_يونيو_يوليوز_غشت_شتنبر_أكتوبر_نونبر_دجنبر'.split('_'),
              weekdaysMin: 'ح_ن_ث_ر_خ_ج_س'.split('_'),
              ordinal: function (t) {
                return t
              },
              formats: {
                LT: 'HH:mm',
                LTS: 'HH:mm:ss',
                L: 'DD/MM/YYYY',
                LL: 'D MMMM YYYY',
                LLL: 'D MMMM YYYY HH:mm',
                LLLL: 'dddd D MMMM YYYY HH:mm'
              },
              meridiem: function (t) {
                return t > 12 ? 'م' : 'ص'
              },
              relativeTime: {
                future: 'في %s',
                past: 'منذ %s',
                s: 'ثوان',
                m: 'دقيقة',
                mm: '%d دقائق',
                h: 'ساعة',
                hh: '%d ساعات',
                d: 'يوم',
                dd: '%d أيام',
                M: 'شهر',
                MM: '%d أشهر',
                y: 'سنة',
                yy: '%d سنوات'
              }
            }
          return (o.default.locale(s, null, !0), s)
        })
      })(sr)),
    sr.exports
  )
}
var uM = w2()
const x2 = /* @__PURE__ */ F(uM),
  L2 = /* @__PURE__ */ q(
    {
      __proto__: null,
      default: x2
    },
    [uM]
  )
var ir = { exports: {} },
  k2 = ir.exports,
  Ic
function S2() {
  return (
    Ic ||
      ((Ic = 1),
      (function (e, a) {
        ;(function (n, r) {
          e.exports = r(R())
        })(k2, function (n) {
          function r(t) {
            return t && typeof t == 'object' && 'default' in t ? t : { default: t }
          }
          var o = r(n),
            s = {
              name: 'ar-sa',
              weekdays: 'الأحد_الإثنين_الثلاثاء_الأربعاء_الخميس_الجمعة_السبت'.split('_'),
              months:
                'يناير_فبراير_مارس_أبريل_مايو_يونيو_يوليو_أغسطس_سبتمبر_أكتوبر_نوفمبر_ديسمبر'.split(
                  '_'
                ),
              weekdaysShort: 'أحد_إثنين_ثلاثاء_أربعاء_خميس_جمعة_سبت'.split('_'),
              monthsShort:
                'يناير_فبراير_مارس_أبريل_مايو_يونيو_يوليو_أغسطس_سبتمبر_أكتوبر_نوفمبر_ديسمبر'.split(
                  '_'
                ),
              weekdaysMin: 'ح_ن_ث_ر_خ_ج_س'.split('_'),
              ordinal: function (t) {
                return t
              },
              formats: {
                LT: 'HH:mm',
                LTS: 'HH:mm:ss',
                L: 'DD/MM/YYYY',
                LL: 'D MMMM YYYY',
                LLL: 'D MMMM YYYY HH:mm',
                LLLL: 'dddd D MMMM YYYY HH:mm'
              },
              meridiem: function (t) {
                return t > 12 ? 'م' : 'ص'
              },
              relativeTime: {
                future: 'في %s',
                past: 'منذ %s',
                s: 'ثوان',
                m: 'دقيقة',
                mm: '%d دقائق',
                h: 'ساعة',
                hh: '%d ساعات',
                d: 'يوم',
                dd: '%d أيام',
                M: 'شهر',
                MM: '%d أشهر',
                y: 'سنة',
                yy: '%d سنوات'
              }
            }
          return (o.default.locale(s, null, !0), s)
        })
      })(ir)),
    ir.exports
  )
}
var lM = S2()
const D2 = /* @__PURE__ */ F(lM),
  E2 = /* @__PURE__ */ q(
    {
      __proto__: null,
      default: D2
    },
    [lM]
  )
var ur = { exports: {} },
  T2 = ur.exports,
  Pc
function $2() {
  return (
    Pc ||
      ((Pc = 1),
      (function (e, a) {
        ;(function (n, r) {
          e.exports = r(R())
        })(T2, function (n) {
          function r(t) {
            return t && typeof t == 'object' && 'default' in t ? t : { default: t }
          }
          var o = r(n),
            s = {
              name: 'ar-tn',
              weekdays: 'الأحد_الإثنين_الثلاثاء_الأربعاء_الخميس_الجمعة_السبت'.split('_'),
              months:
                'جانفي_فيفري_مارس_أفريل_ماي_جوان_جويلية_أوت_سبتمبر_أكتوبر_نوفمبر_ديسمبر'.split('_'),
              weekStart: 1,
              weekdaysShort: 'أحد_إثنين_ثلاثاء_أربعاء_خميس_جمعة_سبت'.split('_'),
              monthsShort:
                'جانفي_فيفري_مارس_أفريل_ماي_جوان_جويلية_أوت_سبتمبر_أكتوبر_نوفمبر_ديسمبر'.split('_'),
              weekdaysMin: 'ح_ن_ث_ر_خ_ج_س'.split('_'),
              ordinal: function (t) {
                return t
              },
              formats: {
                LT: 'HH:mm',
                LTS: 'HH:mm:ss',
                L: 'DD/MM/YYYY',
                LL: 'D MMMM YYYY',
                LLL: 'D MMMM YYYY HH:mm',
                LLLL: 'dddd D MMMM YYYY HH:mm'
              },
              meridiem: function (t) {
                return t > 12 ? 'م' : 'ص'
              },
              relativeTime: {
                future: 'في %s',
                past: 'منذ %s',
                s: 'ثوان',
                m: 'دقيقة',
                mm: '%d دقائق',
                h: 'ساعة',
                hh: '%d ساعات',
                d: 'يوم',
                dd: '%d أيام',
                M: 'شهر',
                MM: '%d أشهر',
                y: 'سنة',
                yy: '%d سنوات'
              }
            }
          return (o.default.locale(s, null, !0), s)
        })
      })(ur)),
    ur.exports
  )
}
var dM = $2()
const H2 = /* @__PURE__ */ F(dM),
  j2 = /* @__PURE__ */ q(
    {
      __proto__: null,
      default: H2
    },
    [dM]
  )
var lr = { exports: {} },
  C2 = lr.exports,
  Bc
function A2() {
  return (
    Bc ||
      ((Bc = 1),
      (function (e, a) {
        ;(function (n, r) {
          e.exports = r(R())
        })(C2, function (n) {
          function r(f) {
            return f && typeof f == 'object' && 'default' in f ? f : { default: f }
          }
          var o = r(n),
            s = 'يناير_فبراير_مارس_أبريل_مايو_يونيو_يوليو_أغسطس_سبتمبر_أكتوبر_نوفمبر_ديسمبر'.split(
              '_'
            ),
            t = { 1: '١', 2: '٢', 3: '٣', 4: '٤', 5: '٥', 6: '٦', 7: '٧', 8: '٨', 9: '٩', 0: '٠' },
            i = {
              '١': '1',
              '٢': '2',
              '٣': '3',
              '٤': '4',
              '٥': '5',
              '٦': '6',
              '٧': '7',
              '٨': '8',
              '٩': '9',
              '٠': '0'
            },
            u = /[١٢٣٤٥٦٧٨٩٠]/g,
            l = /،/g,
            d = /\d/g,
            c = /,/g,
            _ = {
              name: 'ar',
              weekdays: 'الأحد_الإثنين_الثلاثاء_الأربعاء_الخميس_الجمعة_السبت'.split('_'),
              weekdaysShort: 'أحد_إثنين_ثلاثاء_أربعاء_خميس_جمعة_سبت'.split('_'),
              weekdaysMin: 'ح_ن_ث_ر_خ_ج_س'.split('_'),
              months: s,
              monthsShort: s,
              weekStart: 6,
              meridiem: function (f) {
                return f > 12 ? 'م' : 'ص'
              },
              relativeTime: {
                future: 'بعد %s',
                past: 'منذ %s',
                s: 'ثانية واحدة',
                m: 'دقيقة واحدة',
                mm: '%d دقائق',
                h: 'ساعة واحدة',
                hh: '%d ساعات',
                d: 'يوم واحد',
                dd: '%d أيام',
                M: 'شهر واحد',
                MM: '%d أشهر',
                y: 'عام واحد',
                yy: '%d أعوام'
              },
              preparse: function (f) {
                return f
                  .replace(u, function (m) {
                    return i[m]
                  })
                  .replace(l, ',')
              },
              postformat: function (f) {
                return f
                  .replace(d, function (m) {
                    return t[m]
                  })
                  .replace(c, '،')
              },
              ordinal: function (f) {
                return f
              },
              formats: {
                LT: 'HH:mm',
                LTS: 'HH:mm:ss',
                L: 'D/‏M/‏YYYY',
                LL: 'D MMMM YYYY',
                LLL: 'D MMMM YYYY HH:mm',
                LLLL: 'dddd D MMMM YYYY HH:mm'
              }
            }
          return (o.default.locale(_, null, !0), _)
        })
      })(lr)),
    lr.exports
  )
}
var cM = A2()
const q2 = /* @__PURE__ */ F(cM),
  F2 = /* @__PURE__ */ q(
    {
      __proto__: null,
      default: q2
    },
    [cM]
  )
var dr = { exports: {} },
  R2 = dr.exports,
  Nc
function I2() {
  return (
    Nc ||
      ((Nc = 1),
      (function (e, a) {
        ;(function (n, r) {
          e.exports = r(R())
        })(R2, function (n) {
          function r(t) {
            return t && typeof t == 'object' && 'default' in t ? t : { default: t }
          }
          var o = r(n),
            s = {
              name: 'az',
              weekdays: 'Bazar_Bazar ertəsi_Çərşənbə axşamı_Çərşənbə_Cümə axşamı_Cümə_Şənbə'.split(
                '_'
              ),
              weekdaysShort: 'Baz_BzE_ÇAx_Çər_CAx_Cüm_Şən'.split('_'),
              weekdaysMin: 'Bz_BE_ÇA_Çə_CA_Cü_Şə'.split('_'),
              months:
                'yanvar_fevral_mart_aprel_may_iyun_iyul_avqust_sentyabr_oktyabr_noyabr_dekabr'.split(
                  '_'
                ),
              monthsShort: 'yan_fev_mar_apr_may_iyn_iyl_avq_sen_okt_noy_dek'.split('_'),
              weekStart: 1,
              formats: {
                LT: 'H:mm',
                LTS: 'H:mm:ss',
                L: 'DD.MM.YYYY',
                LL: 'D MMMM YYYY г.',
                LLL: 'D MMMM YYYY г., H:mm',
                LLLL: 'dddd, D MMMM YYYY г., H:mm'
              },
              relativeTime: {
                future: '%s sonra',
                past: '%s əvvəl',
                s: 'bir neçə saniyə',
                m: 'bir dəqiqə',
                mm: '%d dəqiqə',
                h: 'bir saat',
                hh: '%d saat',
                d: 'bir gün',
                dd: '%d gün',
                M: 'bir ay',
                MM: '%d ay',
                y: 'bir il',
                yy: '%d il'
              },
              ordinal: function (t) {
                return t
              }
            }
          return (o.default.locale(s, null, !0), s)
        })
      })(dr)),
    dr.exports
  )
}
var _M = I2()
const P2 = /* @__PURE__ */ F(_M),
  B2 = /* @__PURE__ */ q(
    {
      __proto__: null,
      default: P2
    },
    [_M]
  )
var cr = { exports: {} },
  N2 = cr.exports,
  Oc
function O2() {
  return (
    Oc ||
      ((Oc = 1),
      (function (e, a) {
        ;(function (n, r) {
          e.exports = r(R())
        })(N2, function (n) {
          function r(m) {
            return m && typeof m == 'object' && 'default' in m ? m : { default: m }
          }
          var o = r(n),
            s =
              'студзеня_лютага_сакавіка_красавіка_траўня_чэрвеня_ліпеня_жніўня_верасня_кастрычніка_лістапада_снежня'.split(
                '_'
              ),
            t =
              'студзень_лютый_сакавік_красавік_травень_чэрвень_ліпень_жнівень_верасень_кастрычнік_лістапад_снежань'.split(
                '_'
              ),
            i = 'студ_лют_сак_крас_трав_чэрв_ліп_жнів_вер_каст_ліст_снеж.'.split('_'),
            u = 'студ_лют_сак_крас_трав_чэрв_ліп_жнів_вер_каст_ліст_снеж'.split('_'),
            l = /D[oD]?(\[[^[\]]*\]|\s)+MMMM?/
          function d(m, h, y) {
            var p, v
            return y === 'm'
              ? h
                ? 'хвіліна'
                : 'хвіліну'
              : y === 'h'
                ? h
                  ? 'гадзіна'
                  : 'гадзіну'
                : m +
                  ' ' +
                  ((p = +m),
                  (v = {
                    ss: h ? 'секунда_секунды_секунд' : 'секунду_секунды_секунд',
                    mm: h ? 'хвіліна_хвіліны_хвілін' : 'хвіліну_хвіліны_хвілін',
                    hh: h ? 'гадзіна_гадзіны_гадзін' : 'гадзіну_гадзіны_гадзін',
                    dd: 'дзень_дні_дзён',
                    MM: 'месяц_месяцы_месяцаў',
                    yy: 'год_гады_гадоў'
                  }[y].split('_')),
                  p % 10 == 1 && p % 100 != 11
                    ? v[0]
                    : p % 10 >= 2 && p % 10 <= 4 && (p % 100 < 10 || p % 100 >= 20)
                      ? v[1]
                      : v[2])
          }
          var c = function (m, h) {
            return l.test(h) ? s[m.month()] : t[m.month()]
          }
          ;((c.s = t), (c.f = s))
          var _ = function (m, h) {
            return l.test(h) ? i[m.month()] : u[m.month()]
          }
          ;((_.s = u), (_.f = i))
          var f = {
            name: 'be',
            weekdays: 'нядзеля_панядзелак_аўторак_серада_чацвер_пятніца_субота'.split('_'),
            weekdaysShort: 'няд_пнд_аўт_сер_чцв_пят_суб'.split('_'),
            weekdaysMin: 'нд_пн_аў_ср_чц_пт_сб'.split('_'),
            months: c,
            monthsShort: _,
            weekStart: 1,
            yearStart: 4,
            formats: {
              LT: 'HH:mm',
              LTS: 'HH:mm:ss',
              L: 'DD.MM.YYYY',
              LL: 'D MMMM YYYY г.',
              LLL: 'D MMMM YYYY г., HH:mm',
              LLLL: 'dddd, D MMMM YYYY г., HH:mm'
            },
            relativeTime: {
              future: 'праз %s',
              past: '%s таму',
              s: 'некалькі секунд',
              m: d,
              mm: d,
              h: d,
              hh: d,
              d: 'дзень',
              dd: d,
              M: 'месяц',
              MM: d,
              y: 'год',
              yy: d
            },
            ordinal: function (m) {
              return m
            },
            meridiem: function (m) {
              return m < 4 ? 'ночы' : m < 12 ? 'раніцы' : m < 17 ? 'дня' : 'вечара'
            }
          }
          return (o.default.locale(f, null, !0), f)
        })
      })(cr)),
    cr.exports
  )
}
var fM = O2()
const z2 = /* @__PURE__ */ F(fM),
  G2 = /* @__PURE__ */ q(
    {
      __proto__: null,
      default: z2
    },
    [fM]
  )
var _r = { exports: {} },
  J2 = _r.exports,
  zc
function U2() {
  return (
    zc ||
      ((zc = 1),
      (function (e, a) {
        ;(function (n, r) {
          e.exports = r(R())
        })(J2, function (n) {
          function r(t) {
            return t && typeof t == 'object' && 'default' in t ? t : { default: t }
          }
          var o = r(n),
            s = {
              name: 'bg',
              weekdays: 'неделя_понеделник_вторник_сряда_четвъртък_петък_събота'.split('_'),
              weekdaysShort: 'нед_пон_вто_сря_чет_пет_съб'.split('_'),
              weekdaysMin: 'нд_пн_вт_ср_чт_пт_сб'.split('_'),
              months:
                'януари_февруари_март_април_май_юни_юли_август_септември_октомври_ноември_декември'.split(
                  '_'
                ),
              monthsShort: 'яну_фев_мар_апр_май_юни_юли_авг_сеп_окт_ное_дек'.split('_'),
              weekStart: 1,
              ordinal: function (t) {
                var i = t % 100
                if (i > 10 && i < 20) return t + '-ти'
                var u = t % 10
                return u === 1
                  ? t + '-ви'
                  : u === 2
                    ? t + '-ри'
                    : u === 7 || u === 8
                      ? t + '-ми'
                      : t + '-ти'
              },
              formats: {
                LT: 'H:mm',
                LTS: 'H:mm:ss',
                L: 'D.MM.YYYY',
                LL: 'D MMMM YYYY',
                LLL: 'D MMMM YYYY H:mm',
                LLLL: 'dddd, D MMMM YYYY H:mm'
              },
              relativeTime: {
                future: 'след %s',
                past: 'преди %s',
                s: 'няколко секунди',
                m: 'минута',
                mm: '%d минути',
                h: 'час',
                hh: '%d часа',
                d: 'ден',
                dd: '%d дена',
                M: 'месец',
                MM: '%d месеца',
                y: 'година',
                yy: '%d години'
              }
            }
          return (o.default.locale(s, null, !0), s)
        })
      })(_r)),
    _r.exports
  )
}
var mM = U2()
const W2 = /* @__PURE__ */ F(mM),
  V2 = /* @__PURE__ */ q(
    {
      __proto__: null,
      default: W2
    },
    [mM]
  )
var fr = { exports: {} },
  K2 = fr.exports,
  Gc
function X2() {
  return (
    Gc ||
      ((Gc = 1),
      (function (e, a) {
        ;(function (n, r) {
          e.exports = r(R())
        })(K2, function (n) {
          function r(t) {
            return t && typeof t == 'object' && 'default' in t ? t : { default: t }
          }
          var o = r(n),
            s = {
              name: 'bi',
              weekdays: 'Sande_Mande_Tusde_Wenesde_Tosde_Fraede_Sarade'.split('_'),
              months:
                'Januari_Februari_Maj_Eprel_Mei_Jun_Julae_Okis_Septemba_Oktoba_Novemba_Disemba'.split(
                  '_'
                ),
              weekStart: 1,
              weekdaysShort: 'San_Man_Tus_Wen_Tos_Frae_Sar'.split('_'),
              monthsShort: 'Jan_Feb_Maj_Epr_Mai_Jun_Jul_Oki_Sep_Okt_Nov_Dis'.split('_'),
              weekdaysMin: 'San_Ma_Tu_We_To_Fr_Sar'.split('_'),
              ordinal: function (t) {
                return t
              },
              formats: {
                LT: 'h:mm A',
                LTS: 'h:mm:ss A',
                L: 'DD/MM/YYYY',
                LL: 'D MMMM YYYY',
                LLL: 'D MMMM YYYY h:mm A',
                LLLL: 'dddd, D MMMM YYYY h:mm A'
              },
              relativeTime: {
                future: 'lo %s',
                past: '%s bifo',
                s: 'sam seken',
                m: 'wan minit',
                mm: '%d minit',
                h: 'wan haoa',
                hh: '%d haoa',
                d: 'wan dei',
                dd: '%d dei',
                M: 'wan manis',
                MM: '%d manis',
                y: 'wan yia',
                yy: '%d yia'
              }
            }
          return (o.default.locale(s, null, !0), s)
        })
      })(fr)),
    fr.exports
  )
}
var pM = X2()
const Z2 = /* @__PURE__ */ F(pM),
  Q2 = /* @__PURE__ */ q(
    {
      __proto__: null,
      default: Z2
    },
    [pM]
  )
var mr = { exports: {} },
  e5 = mr.exports,
  Jc
function t5() {
  return (
    Jc ||
      ((Jc = 1),
      (function (e, a) {
        ;(function (n, r) {
          e.exports = r(R())
        })(e5, function (n) {
          function r(t) {
            return t && typeof t == 'object' && 'default' in t ? t : { default: t }
          }
          var o = r(n),
            s = {
              name: 'bm',
              weekdays: 'Kari_Ntɛnɛn_Tarata_Araba_Alamisa_Juma_Sibiri'.split('_'),
              months:
                'Zanwuyekalo_Fewuruyekalo_Marisikalo_Awirilikalo_Mɛkalo_Zuwɛnkalo_Zuluyekalo_Utikalo_Sɛtanburukalo_ɔkutɔburukalo_Nowanburukalo_Desanburukalo'.split(
                  '_'
                ),
              weekStart: 1,
              weekdaysShort: 'Kar_Ntɛ_Tar_Ara_Ala_Jum_Sib'.split('_'),
              monthsShort: 'Zan_Few_Mar_Awi_Mɛ_Zuw_Zul_Uti_Sɛt_ɔku_Now_Des'.split('_'),
              weekdaysMin: 'Ka_Nt_Ta_Ar_Al_Ju_Si'.split('_'),
              ordinal: function (t) {
                return t
              },
              formats: {
                LT: 'HH:mm',
                LTS: 'HH:mm:ss',
                L: 'DD/MM/YYYY',
                LL: 'MMMM [tile] D [san] YYYY',
                LLL: 'MMMM [tile] D [san] YYYY [lɛrɛ] HH:mm',
                LLLL: 'dddd MMMM [tile] D [san] YYYY [lɛrɛ] HH:mm'
              },
              relativeTime: {
                future: '%s kɔnɔ',
                past: 'a bɛ %s bɔ',
                s: 'sanga dama dama',
                m: 'miniti kelen',
                mm: 'miniti %d',
                h: 'lɛrɛ kelen',
                hh: 'lɛrɛ %d',
                d: 'tile kelen',
                dd: 'tile %d',
                M: 'kalo kelen',
                MM: 'kalo %d',
                y: 'san kelen',
                yy: 'san %d'
              }
            }
          return (o.default.locale(s, null, !0), s)
        })
      })(mr)),
    mr.exports
  )
}
var hM = t5()
const r5 = /* @__PURE__ */ F(hM),
  n5 = /* @__PURE__ */ q(
    {
      __proto__: null,
      default: r5
    },
    [hM]
  )
var pr = { exports: {} },
  a5 = pr.exports,
  Uc
function o5() {
  return (
    Uc ||
      ((Uc = 1),
      (function (e, a) {
        ;(function (n, r) {
          e.exports = r(R())
        })(a5, function (n) {
          function r(u) {
            return u && typeof u == 'object' && 'default' in u ? u : { default: u }
          }
          var o = r(n),
            s = { 1: '১', 2: '২', 3: '৩', 4: '৪', 5: '৫', 6: '৬', 7: '৭', 8: '৮', 9: '৯', 0: '০' },
            t = {
              '১': '1',
              '২': '2',
              '৩': '3',
              '৪': '4',
              '৫': '5',
              '৬': '6',
              '৭': '7',
              '৮': '8',
              '৯': '9',
              '০': '0'
            },
            i = {
              name: 'bn-bd',
              weekdays: 'রবিবার_সোমবার_মঙ্গলবার_বুধবার_বৃহস্পতিবার_শুক্রবার_শনিবার'.split('_'),
              months:
                'জানুয়ারি_ফেব্রুয়ারি_মার্চ_এপ্রিল_মে_জুন_জুলাই_আগস্ট_সেপ্টেম্বর_অক্টোবর_নভেম্বর_ডিসেম্বর'.split(
                  '_'
                ),
              weekdaysShort: 'রবি_সোম_মঙ্গল_বুধ_বৃহস্পতি_শুক্র_শনি'.split('_'),
              monthsShort: 'জানু_ফেব্রু_মার্চ_এপ্রিল_মে_জুন_জুলাই_আগস্ট_সেপ্ট_অক্টো_নভে_ডিসে'.split(
                '_'
              ),
              weekdaysMin: 'রবি_সোম_মঙ্গ_বুধ_বৃহঃ_শুক্র_শনি'.split('_'),
              weekStart: 0,
              preparse: function (u) {
                return u.replace(/[১২৩৪৫৬৭৮৯০]/g, function (l) {
                  return t[l]
                })
              },
              postformat: function (u) {
                return u.replace(/\d/g, function (l) {
                  return s[l]
                })
              },
              ordinal: function (u) {
                var l = ['ই', 'লা', 'রা', 'ঠা', 'শে'],
                  d = u % 100
                return '[' + u + (l[(d - 20) % 10] || l[d] || l[0]) + ']'
              },
              formats: {
                LT: 'A h:mm সময়',
                LTS: 'A h:mm:ss সময়',
                L: 'DD/MM/YYYY খ্রিস্টাব্দ',
                LL: 'D MMMM YYYY খ্রিস্টাব্দ',
                LLL: 'D MMMM YYYY খ্রিস্টাব্দ, A h:mm সময়',
                LLLL: 'dddd, D MMMM YYYY খ্রিস্টাব্দ, A h:mm সময়'
              },
              meridiem: function (u) {
                return u < 4
                  ? 'রাত'
                  : u < 6
                    ? 'ভোর'
                    : u < 12
                      ? 'সকাল'
                      : u < 15
                        ? 'দুপুর'
                        : u < 18
                          ? 'বিকাল'
                          : u < 20
                            ? 'সন্ধ্যা'
                            : 'রাত'
              },
              relativeTime: {
                future: '%s পরে',
                past: '%s আগে',
                s: 'কয়েক সেকেন্ড',
                m: 'এক মিনিট',
                mm: '%d মিনিট',
                h: 'এক ঘন্টা',
                hh: '%d ঘন্টা',
                d: 'এক দিন',
                dd: '%d দিন',
                M: 'এক মাস',
                MM: '%d মাস',
                y: 'এক বছর',
                yy: '%d বছর'
              }
            }
          return (o.default.locale(i, null, !0), i)
        })
      })(pr)),
    pr.exports
  )
}
var vM = o5()
const s5 = /* @__PURE__ */ F(vM),
  i5 = /* @__PURE__ */ q(
    {
      __proto__: null,
      default: s5
    },
    [vM]
  )
var hr = { exports: {} },
  u5 = hr.exports,
  Wc
function l5() {
  return (
    Wc ||
      ((Wc = 1),
      (function (e, a) {
        ;(function (n, r) {
          e.exports = r(R())
        })(u5, function (n) {
          function r(u) {
            return u && typeof u == 'object' && 'default' in u ? u : { default: u }
          }
          var o = r(n),
            s = { 1: '১', 2: '২', 3: '৩', 4: '৪', 5: '৫', 6: '৬', 7: '৭', 8: '৮', 9: '৯', 0: '০' },
            t = {
              '১': '1',
              '২': '2',
              '৩': '3',
              '৪': '4',
              '৫': '5',
              '৬': '6',
              '৭': '7',
              '৮': '8',
              '৯': '9',
              '০': '0'
            },
            i = {
              name: 'bn',
              weekdays: 'রবিবার_সোমবার_মঙ্গলবার_বুধবার_বৃহস্পতিবার_শুক্রবার_শনিবার'.split('_'),
              months:
                'জানুয়ারি_ফেব্রুয়ারি_মার্চ_এপ্রিল_মে_জুন_জুলাই_আগস্ট_সেপ্টেম্বর_অক্টোবর_নভেম্বর_ডিসেম্বর'.split(
                  '_'
                ),
              weekdaysShort: 'রবি_সোম_মঙ্গল_বুধ_বৃহস্পতি_শুক্র_শনি'.split('_'),
              monthsShort: 'জানু_ফেব্রু_মার্চ_এপ্রিল_মে_জুন_জুলাই_আগস্ট_সেপ্ট_অক্টো_নভে_ডিসে'.split(
                '_'
              ),
              weekdaysMin: 'রবি_সোম_মঙ্গ_বুধ_বৃহঃ_শুক্র_শনি'.split('_'),
              preparse: function (u) {
                return u.replace(/[১২৩৪৫৬৭৮৯০]/g, function (l) {
                  return t[l]
                })
              },
              postformat: function (u) {
                return u.replace(/\d/g, function (l) {
                  return s[l]
                })
              },
              ordinal: function (u) {
                return u
              },
              formats: {
                LT: 'A h:mm সময়',
                LTS: 'A h:mm:ss সময়',
                L: 'DD/MM/YYYY',
                LL: 'D MMMM YYYY',
                LLL: 'D MMMM YYYY, A h:mm সময়',
                LLLL: 'dddd, D MMMM YYYY, A h:mm সময়'
              },
              relativeTime: {
                future: '%s পরে',
                past: '%s আগে',
                s: 'কয়েক সেকেন্ড',
                m: 'এক মিনিট',
                mm: '%d মিনিট',
                h: 'এক ঘন্টা',
                hh: '%d ঘন্টা',
                d: 'এক দিন',
                dd: '%d দিন',
                M: 'এক মাস',
                MM: '%d মাস',
                y: 'এক বছর',
                yy: '%d বছর'
              }
            }
          return (o.default.locale(i, null, !0), i)
        })
      })(hr)),
    hr.exports
  )
}
var yM = l5()
const d5 = /* @__PURE__ */ F(yM),
  c5 = /* @__PURE__ */ q(
    {
      __proto__: null,
      default: d5
    },
    [yM]
  )
var vr = { exports: {} },
  _5 = vr.exports,
  Vc
function f5() {
  return (
    Vc ||
      ((Vc = 1),
      (function (e, a) {
        ;(function (n, r) {
          e.exports = r(R())
        })(_5, function (n) {
          function r(t) {
            return t && typeof t == 'object' && 'default' in t ? t : { default: t }
          }
          var o = r(n),
            s = {
              name: 'bo',
              weekdays:
                'གཟའ་ཉི་མ་_གཟའ་ཟླ་བ་_གཟའ་མིག་དམར་_གཟའ་ལྷག་པ་_གཟའ་ཕུར་བུ_གཟའ་པ་སངས་_གཟའ་སྤེན་པ་'.split(
                  '_'
                ),
              weekdaysShort: 'ཉི་མ་_ཟླ་བ་_མིག་དམར་_ལྷག་པ་_ཕུར་བུ_པ་སངས་_སྤེན་པ་'.split('_'),
              weekdaysMin: 'ཉི་མ་_ཟླ་བ་_མིག་དམར་_ལྷག་པ་_ཕུར་བུ_པ་སངས་_སྤེན་པ་'.split('_'),
              months:
                'ཟླ་བ་དང་པོ_ཟླ་བ་གཉིས་པ_ཟླ་བ་གསུམ་པ_ཟླ་བ་བཞི་པ_ཟླ་བ་ལྔ་པ_ཟླ་བ་དྲུག་པ_ཟླ་བ་བདུན་པ_ཟླ་བ་བརྒྱད་པ_ཟླ་བ་དགུ་པ_ཟླ་བ་བཅུ་པ_ཟླ་བ་བཅུ་གཅིག་པ_ཟླ་བ་བཅུ་གཉིས་པ'.split(
                  '_'
                ),
              monthsShort:
                'ཟླ་དང་པོ_ཟླ་གཉིས་པ_ཟླ་གསུམ་པ_ཟླ་བཞི་པ_ཟླ་ལྔ་པ_ཟླ་དྲུག་པ_ཟླ་བདུན་པ_ཟླ་བརྒྱད་པ_ཟླ་དགུ་པ_ཟླ་བཅུ་པ_ཟླ་བཅུ་གཅིག་པ_ཟླ་བཅུ་གཉིས་པ'.split(
                  '_'
                ),
              ordinal: function (t) {
                return t
              },
              formats: {
                LT: 'A h:mm',
                LTS: 'A h:mm:ss',
                L: 'DD/MM/YYYY',
                LL: 'D MMMM YYYY',
                LLL: 'D MMMM YYYY, A h:mm',
                LLLL: 'dddd, D MMMM YYYY, A h:mm'
              },
              relativeTime: {
                future: '%s ལ་',
                past: '%s སྔོན་ལ་',
                s: 'ཏོག་ཙམ་',
                m: 'སྐར་མ་གཅིག་',
                mm: 'སྐར་མ་ %d',
                h: 'ཆུ་ཚོད་གཅིག་',
                hh: 'ཆུ་ཚོད་ %d',
                d: 'ཉིན་གཅིག་',
                dd: 'ཉིན་ %d',
                M: 'ཟླ་བ་གཅིག་',
                MM: 'ཟླ་བ་ %d',
                y: 'ལོ་གཅིག་',
                yy: 'ལོ་ %d'
              }
            }
          return (o.default.locale(s, null, !0), s)
        })
      })(vr)),
    vr.exports
  )
}
var gM = f5()
const m5 = /* @__PURE__ */ F(gM),
  p5 = /* @__PURE__ */ q(
    {
      __proto__: null,
      default: m5
    },
    [gM]
  )
var yr = { exports: {} },
  h5 = yr.exports,
  Kc
function v5() {
  return (
    Kc ||
      ((Kc = 1),
      (function (e, a) {
        ;(function (n, r) {
          e.exports = r(R())
        })(h5, function (n) {
          function r(u) {
            return u && typeof u == 'object' && 'default' in u ? u : { default: u }
          }
          var o = r(n)
          function s(u) {
            return u > 9 ? s(u % 10) : u
          }
          function t(u, l, d) {
            return (
              u +
              ' ' +
              (function (c, _) {
                return _ === 2
                  ? (function (f) {
                      return { m: 'v', b: 'v', d: 'z' }[f.charAt(0)] + f.substring(1)
                    })(c)
                  : c
              })({ mm: 'munutenn', MM: 'miz', dd: 'devezh' }[d], u)
            )
          }
          var i = {
            name: 'br',
            weekdays: 'Sul_Lun_Meurzh_Mercʼher_Yaou_Gwener_Sadorn'.split('_'),
            months:
              'Genver_Cʼhwevrer_Meurzh_Ebrel_Mae_Mezheven_Gouere_Eost_Gwengolo_Here_Du_Kerzu'.split(
                '_'
              ),
            weekStart: 1,
            weekdaysShort: 'Sul_Lun_Meu_Mer_Yao_Gwe_Sad'.split('_'),
            monthsShort: 'Gen_Cʼhwe_Meu_Ebr_Mae_Eve_Gou_Eos_Gwe_Her_Du_Ker'.split('_'),
            weekdaysMin: 'Su_Lu_Me_Mer_Ya_Gw_Sa'.split('_'),
            ordinal: function (u) {
              return u
            },
            formats: {
              LT: 'h[e]mm A',
              LTS: 'h[e]mm:ss A',
              L: 'DD/MM/YYYY',
              LL: 'D [a viz] MMMM YYYY',
              LLL: 'D [a viz] MMMM YYYY h[e]mm A',
              LLLL: 'dddd, D [a viz] MMMM YYYY h[e]mm A'
            },
            relativeTime: {
              future: 'a-benn %s',
              past: '%s ʼzo',
              s: 'un nebeud segondennoù',
              m: 'ur vunutenn',
              mm: t,
              h: 'un eur',
              hh: '%d eur',
              d: 'un devezh',
              dd: t,
              M: 'ur miz',
              MM: t,
              y: 'ur bloaz',
              yy: function (u) {
                switch (s(u)) {
                  case 1:
                  case 3:
                  case 4:
                  case 5:
                  case 9:
                    return u + ' bloaz'
                  default:
                    return u + ' vloaz'
                }
              }
            },
            meridiem: function (u) {
              return u < 12 ? 'a.m.' : 'g.m.'
            }
          }
          return (o.default.locale(i, null, !0), i)
        })
      })(yr)),
    yr.exports
  )
}
var MM = v5()
const y5 = /* @__PURE__ */ F(MM),
  g5 = /* @__PURE__ */ q(
    {
      __proto__: null,
      default: y5
    },
    [MM]
  )
var gr = { exports: {} },
  M5 = gr.exports,
  Xc
function b5() {
  return (
    Xc ||
      ((Xc = 1),
      (function (e, a) {
        ;(function (n, r) {
          e.exports = r(R())
        })(M5, function (n) {
          function r(t) {
            return t && typeof t == 'object' && 'default' in t ? t : { default: t }
          }
          var o = r(n),
            s = {
              name: 'bs',
              weekdays: 'nedjelja_ponedjeljak_utorak_srijeda_četvrtak_petak_subota'.split('_'),
              months:
                'januar_februar_mart_april_maj_juni_juli_august_septembar_oktobar_novembar_decembar'.split(
                  '_'
                ),
              weekStart: 1,
              weekdaysShort: 'ned._pon._uto._sri._čet._pet._sub.'.split('_'),
              monthsShort: 'jan._feb._mar._apr._maj._jun._jul._aug._sep._okt._nov._dec.'.split('_'),
              weekdaysMin: 'ne_po_ut_sr_če_pe_su'.split('_'),
              ordinal: function (t) {
                return t
              },
              formats: {
                LT: 'H:mm',
                LTS: 'H:mm:ss',
                L: 'DD.MM.YYYY',
                LL: 'D. MMMM YYYY',
                LLL: 'D. MMMM YYYY H:mm',
                LLLL: 'dddd, D. MMMM YYYY H:mm'
              }
            }
          return (o.default.locale(s, null, !0), s)
        })
      })(gr)),
    gr.exports
  )
}
var bM = b5()
const Y5 = /* @__PURE__ */ F(bM),
  w5 = /* @__PURE__ */ q(
    {
      __proto__: null,
      default: Y5
    },
    [bM]
  )
var Mr = { exports: {} },
  x5 = Mr.exports,
  Zc
function L5() {
  return (
    Zc ||
      ((Zc = 1),
      (function (e, a) {
        ;(function (n, r) {
          e.exports = r(R())
        })(x5, function (n) {
          function r(t) {
            return t && typeof t == 'object' && 'default' in t ? t : { default: t }
          }
          var o = r(n),
            s = {
              name: 'ca',
              weekdays: 'Diumenge_Dilluns_Dimarts_Dimecres_Dijous_Divendres_Dissabte'.split('_'),
              weekdaysShort: 'Dg._Dl._Dt._Dc._Dj._Dv._Ds.'.split('_'),
              weekdaysMin: 'Dg_Dl_Dt_Dc_Dj_Dv_Ds'.split('_'),
              months:
                'Gener_Febrer_Març_Abril_Maig_Juny_Juliol_Agost_Setembre_Octubre_Novembre_Desembre'.split(
                  '_'
                ),
              monthsShort: 'Gen._Febr._Març_Abr._Maig_Juny_Jul._Ag._Set._Oct._Nov._Des.'.split('_'),
              weekStart: 1,
              formats: {
                LT: 'H:mm',
                LTS: 'H:mm:ss',
                L: 'DD/MM/YYYY',
                LL: 'D MMMM [de] YYYY',
                LLL: 'D MMMM [de] YYYY [a les] H:mm',
                LLLL: 'dddd D MMMM [de] YYYY [a les] H:mm',
                ll: 'D MMM YYYY',
                lll: 'D MMM YYYY, H:mm',
                llll: 'ddd D MMM YYYY, H:mm'
              },
              relativeTime: {
                future: "d'aquí %s",
                past: 'fa %s',
                s: 'uns segons',
                m: 'un minut',
                mm: '%d minuts',
                h: 'una hora',
                hh: '%d hores',
                d: 'un dia',
                dd: '%d dies',
                M: 'un mes',
                MM: '%d mesos',
                y: 'un any',
                yy: '%d anys'
              },
              ordinal: function (t) {
                return '' + t + (t === 1 || t === 3 ? 'r' : t === 2 ? 'n' : t === 4 ? 't' : 'è')
              }
            }
          return (o.default.locale(s, null, !0), s)
        })
      })(Mr)),
    Mr.exports
  )
}
var YM = L5()
const k5 = /* @__PURE__ */ F(YM),
  S5 = /* @__PURE__ */ q(
    {
      __proto__: null,
      default: k5
    },
    [YM]
  )
var br = { exports: {} },
  D5 = br.exports,
  Qc
function E5() {
  return (
    Qc ||
      ((Qc = 1),
      (function (e, a) {
        ;(function (n, r) {
          e.exports = r(R())
        })(D5, function (n) {
          function r(u) {
            return u && typeof u == 'object' && 'default' in u ? u : { default: u }
          }
          var o = r(n)
          function s(u) {
            return u > 1 && u < 5 && ~~(u / 10) != 1
          }
          function t(u, l, d, c) {
            var _ = u + ' '
            switch (d) {
              case 's':
                return l || c ? 'pár sekund' : 'pár sekundami'
              case 'm':
                return l ? 'minuta' : c ? 'minutu' : 'minutou'
              case 'mm':
                return l || c ? _ + (s(u) ? 'minuty' : 'minut') : _ + 'minutami'
              case 'h':
                return l ? 'hodina' : c ? 'hodinu' : 'hodinou'
              case 'hh':
                return l || c ? _ + (s(u) ? 'hodiny' : 'hodin') : _ + 'hodinami'
              case 'd':
                return l || c ? 'den' : 'dnem'
              case 'dd':
                return l || c ? _ + (s(u) ? 'dny' : 'dní') : _ + 'dny'
              case 'M':
                return l || c ? 'měsíc' : 'měsícem'
              case 'MM':
                return l || c ? _ + (s(u) ? 'měsíce' : 'měsíců') : _ + 'měsíci'
              case 'y':
                return l || c ? 'rok' : 'rokem'
              case 'yy':
                return l || c ? _ + (s(u) ? 'roky' : 'let') : _ + 'lety'
            }
          }
          var i = {
            name: 'cs',
            weekdays: 'neděle_pondělí_úterý_středa_čtvrtek_pátek_sobota'.split('_'),
            weekdaysShort: 'ne_po_út_st_čt_pá_so'.split('_'),
            weekdaysMin: 'ne_po_út_st_čt_pá_so'.split('_'),
            months:
              'leden_únor_březen_duben_květen_červen_červenec_srpen_září_říjen_listopad_prosinec'.split(
                '_'
              ),
            monthsShort: 'led_úno_bře_dub_kvě_čvn_čvc_srp_zář_říj_lis_pro'.split('_'),
            weekStart: 1,
            yearStart: 4,
            ordinal: function (u) {
              return u + '.'
            },
            formats: {
              LT: 'H:mm',
              LTS: 'H:mm:ss',
              L: 'DD.MM.YYYY',
              LL: 'D. MMMM YYYY',
              LLL: 'D. MMMM YYYY H:mm',
              LLLL: 'dddd D. MMMM YYYY H:mm',
              l: 'D. M. YYYY'
            },
            relativeTime: {
              future: 'za %s',
              past: 'před %s',
              s: t,
              m: t,
              mm: t,
              h: t,
              hh: t,
              d: t,
              dd: t,
              M: t,
              MM: t,
              y: t,
              yy: t
            }
          }
          return (o.default.locale(i, null, !0), i)
        })
      })(br)),
    br.exports
  )
}
var wM = E5()
const T5 = /* @__PURE__ */ F(wM),
  $5 = /* @__PURE__ */ q(
    {
      __proto__: null,
      default: T5
    },
    [wM]
  )
var Yr = { exports: {} },
  H5 = Yr.exports,
  e_
function j5() {
  return (
    e_ ||
      ((e_ = 1),
      (function (e, a) {
        ;(function (n, r) {
          e.exports = r(R())
        })(H5, function (n) {
          function r(t) {
            return t && typeof t == 'object' && 'default' in t ? t : { default: t }
          }
          var o = r(n),
            s = {
              name: 'cv',
              weekdays: 'вырсарникун_тунтикун_ытларикун_юнкун_кӗҫнерникун_эрнекун_шӑматкун'.split(
                '_'
              ),
              months: 'кӑрлач_нарӑс_пуш_ака_май_ҫӗртме_утӑ_ҫурла_авӑн_юпа_чӳк_раштав'.split('_'),
              weekStart: 1,
              weekdaysShort: 'выр_тун_ытл_юн_кӗҫ_эрн_шӑм'.split('_'),
              monthsShort: 'кӑр_нар_пуш_ака_май_ҫӗр_утӑ_ҫур_авн_юпа_чӳк_раш'.split('_'),
              weekdaysMin: 'вр_тн_ыт_юн_кҫ_эр_шм'.split('_'),
              ordinal: function (t) {
                return t
              },
              formats: {
                LT: 'HH:mm',
                LTS: 'HH:mm:ss',
                L: 'DD-MM-YYYY',
                LL: 'YYYY [ҫулхи] MMMM [уйӑхӗн] D[-мӗшӗ]',
                LLL: 'YYYY [ҫулхи] MMMM [уйӑхӗн] D[-мӗшӗ], HH:mm',
                LLLL: 'dddd, YYYY [ҫулхи] MMMM [уйӑхӗн] D[-мӗшӗ], HH:mm'
              }
            }
          return (o.default.locale(s, null, !0), s)
        })
      })(Yr)),
    Yr.exports
  )
}
var xM = j5()
const C5 = /* @__PURE__ */ F(xM),
  A5 = /* @__PURE__ */ q(
    {
      __proto__: null,
      default: C5
    },
    [xM]
  )
var wr = { exports: {} },
  q5 = wr.exports,
  t_
function F5() {
  return (
    t_ ||
      ((t_ = 1),
      (function (e, a) {
        ;(function (n, r) {
          e.exports = r(R())
        })(q5, function (n) {
          function r(t) {
            return t && typeof t == 'object' && 'default' in t ? t : { default: t }
          }
          var o = r(n),
            s = {
              name: 'cy',
              weekdays:
                'Dydd Sul_Dydd Llun_Dydd Mawrth_Dydd Mercher_Dydd Iau_Dydd Gwener_Dydd Sadwrn'.split(
                  '_'
                ),
              months:
                'Ionawr_Chwefror_Mawrth_Ebrill_Mai_Mehefin_Gorffennaf_Awst_Medi_Hydref_Tachwedd_Rhagfyr'.split(
                  '_'
                ),
              weekStart: 1,
              weekdaysShort: 'Sul_Llun_Maw_Mer_Iau_Gwe_Sad'.split('_'),
              monthsShort: 'Ion_Chwe_Maw_Ebr_Mai_Meh_Gor_Aws_Med_Hyd_Tach_Rhag'.split('_'),
              weekdaysMin: 'Su_Ll_Ma_Me_Ia_Gw_Sa'.split('_'),
              ordinal: function (t) {
                return t
              },
              formats: {
                LT: 'HH:mm',
                LTS: 'HH:mm:ss',
                L: 'DD/MM/YYYY',
                LL: 'D MMMM YYYY',
                LLL: 'D MMMM YYYY HH:mm',
                LLLL: 'dddd, D MMMM YYYY HH:mm'
              },
              relativeTime: {
                future: 'mewn %s',
                past: '%s yn ôl',
                s: 'ychydig eiliadau',
                m: 'munud',
                mm: '%d munud',
                h: 'awr',
                hh: '%d awr',
                d: 'diwrnod',
                dd: '%d diwrnod',
                M: 'mis',
                MM: '%d mis',
                y: 'blwyddyn',
                yy: '%d flynedd'
              }
            }
          return (o.default.locale(s, null, !0), s)
        })
      })(wr)),
    wr.exports
  )
}
var LM = F5()
const R5 = /* @__PURE__ */ F(LM),
  I5 = /* @__PURE__ */ q(
    {
      __proto__: null,
      default: R5
    },
    [LM]
  )
var xr = { exports: {} },
  P5 = xr.exports,
  r_
function B5() {
  return (
    r_ ||
      ((r_ = 1),
      (function (e, a) {
        ;(function (n, r) {
          e.exports = r(R())
        })(P5, function (n) {
          function r(t) {
            return t && typeof t == 'object' && 'default' in t ? t : { default: t }
          }
          var o = r(n),
            s = {
              name: 'da',
              weekdays: 'søndag_mandag_tirsdag_onsdag_torsdag_fredag_lørdag'.split('_'),
              weekdaysShort: 'søn._man._tirs._ons._tors._fre._lør.'.split('_'),
              weekdaysMin: 'sø._ma._ti._on._to._fr._lø.'.split('_'),
              months:
                'januar_februar_marts_april_maj_juni_juli_august_september_oktober_november_december'.split(
                  '_'
                ),
              monthsShort: 'jan._feb._mar._apr._maj_juni_juli_aug._sept._okt._nov._dec.'.split('_'),
              weekStart: 1,
              yearStart: 4,
              ordinal: function (t) {
                return t + '.'
              },
              formats: {
                LT: 'HH:mm',
                LTS: 'HH:mm:ss',
                L: 'DD.MM.YYYY',
                LL: 'D. MMMM YYYY',
                LLL: 'D. MMMM YYYY HH:mm',
                LLLL: 'dddd [d.] D. MMMM YYYY [kl.] HH:mm'
              },
              relativeTime: {
                future: 'om %s',
                past: '%s siden',
                s: 'få sekunder',
                m: 'et minut',
                mm: '%d minutter',
                h: 'en time',
                hh: '%d timer',
                d: 'en dag',
                dd: '%d dage',
                M: 'en måned',
                MM: '%d måneder',
                y: 'et år',
                yy: '%d år'
              }
            }
          return (o.default.locale(s, null, !0), s)
        })
      })(xr)),
    xr.exports
  )
}
var kM = B5()
const N5 = /* @__PURE__ */ F(kM),
  O5 = /* @__PURE__ */ q(
    {
      __proto__: null,
      default: N5
    },
    [kM]
  )
var Lr = { exports: {} },
  z5 = Lr.exports,
  n_
function G5() {
  return (
    n_ ||
      ((n_ = 1),
      (function (e, a) {
        ;(function (n, r) {
          e.exports = r(R())
        })(z5, function (n) {
          function r(u) {
            return u && typeof u == 'object' && 'default' in u ? u : { default: u }
          }
          var o = r(n),
            s = {
              s: 'ein paar Sekunden',
              m: ['eine Minute', 'einer Minute'],
              mm: '%d Minuten',
              h: ['eine Stunde', 'einer Stunde'],
              hh: '%d Stunden',
              d: ['ein Tag', 'einem Tag'],
              dd: ['%d Tage', '%d Tagen'],
              M: ['ein Monat', 'einem Monat'],
              MM: ['%d Monate', '%d Monaten'],
              y: ['ein Jahr', 'einem Jahr'],
              yy: ['%d Jahre', '%d Jahren']
            }
          function t(u, l, d) {
            var c = s[d]
            return (Array.isArray(c) && (c = c[l ? 0 : 1]), c.replace('%d', u))
          }
          var i = {
            name: 'de-at',
            weekdays: 'Sonntag_Montag_Dienstag_Mittwoch_Donnerstag_Freitag_Samstag'.split('_'),
            weekdaysShort: 'So._Mo._Di._Mi._Do._Fr._Sa.'.split('_'),
            weekdaysMin: 'So_Mo_Di_Mi_Do_Fr_Sa'.split('_'),
            months:
              'Jänner_Februar_März_April_Mai_Juni_Juli_August_September_Oktober_November_Dezember'.split(
                '_'
              ),
            monthsShort: 'Jän._Feb._März_Apr._Mai_Juni_Juli_Aug._Sep._Okt._Nov._Dez.'.split('_'),
            ordinal: function (u) {
              return u + '.'
            },
            weekStart: 1,
            formats: {
              LTS: 'HH:mm:ss',
              LT: 'HH:mm',
              L: 'DD.MM.YYYY',
              LL: 'D. MMMM YYYY',
              LLL: 'D. MMMM YYYY HH:mm',
              LLLL: 'dddd, D. MMMM YYYY HH:mm'
            },
            relativeTime: {
              future: 'in %s',
              past: 'vor %s',
              s: t,
              m: t,
              mm: t,
              h: t,
              hh: t,
              d: t,
              dd: t,
              M: t,
              MM: t,
              y: t,
              yy: t
            }
          }
          return (o.default.locale(i, null, !0), i)
        })
      })(Lr)),
    Lr.exports
  )
}
var SM = G5()
const J5 = /* @__PURE__ */ F(SM),
  U5 = /* @__PURE__ */ q(
    {
      __proto__: null,
      default: J5
    },
    [SM]
  )
var kr = { exports: {} },
  W5 = kr.exports,
  a_
function V5() {
  return (
    a_ ||
      ((a_ = 1),
      (function (e, a) {
        ;(function (n, r) {
          e.exports = r(R())
        })(W5, function (n) {
          function r(u) {
            return u && typeof u == 'object' && 'default' in u ? u : { default: u }
          }
          var o = r(n),
            s = {
              s: 'ein paar Sekunden',
              m: ['eine Minute', 'einer Minute'],
              mm: '%d Minuten',
              h: ['eine Stunde', 'einer Stunde'],
              hh: '%d Stunden',
              d: ['ein Tag', 'einem Tag'],
              dd: ['%d Tage', '%d Tagen'],
              M: ['ein Monat', 'einem Monat'],
              MM: ['%d Monate', '%d Monaten'],
              y: ['ein Jahr', 'einem Jahr'],
              yy: ['%d Jahre', '%d Jahren']
            }
          function t(u, l, d) {
            var c = s[d]
            return (Array.isArray(c) && (c = c[l ? 0 : 1]), c.replace('%d', u))
          }
          var i = {
            name: 'de-ch',
            weekdays: 'Sonntag_Montag_Dienstag_Mittwoch_Donnerstag_Freitag_Samstag'.split('_'),
            weekdaysShort: 'So_Mo_Di_Mi_Do_Fr_Sa'.split('_'),
            weekdaysMin: 'So_Mo_Di_Mi_Do_Fr_Sa'.split('_'),
            months:
              'Januar_Februar_März_April_Mai_Juni_Juli_August_September_Oktober_November_Dezember'.split(
                '_'
              ),
            monthsShort: 'Jan._Feb._März_Apr._Mai_Juni_Juli_Aug._Sep._Okt._Nov._Dez.'.split('_'),
            ordinal: function (u) {
              return u + '.'
            },
            weekStart: 1,
            formats: {
              LT: 'HH:mm',
              LTS: 'HH:mm:ss',
              L: 'DD.MM.YYYY',
              LL: 'D. MMMM YYYY',
              LLL: 'D. MMMM YYYY HH:mm',
              LLLL: 'dddd, D. MMMM YYYY HH:mm'
            },
            relativeTime: {
              future: 'in %s',
              past: 'vor %s',
              s: t,
              m: t,
              mm: t,
              h: t,
              hh: t,
              d: t,
              dd: t,
              M: t,
              MM: t,
              y: t,
              yy: t
            }
          }
          return (o.default.locale(i, null, !0), i)
        })
      })(kr)),
    kr.exports
  )
}
var DM = V5()
const K5 = /* @__PURE__ */ F(DM),
  X5 = /* @__PURE__ */ q(
    {
      __proto__: null,
      default: K5
    },
    [DM]
  )
var Sr = { exports: {} },
  Z5 = Sr.exports,
  o_
function Q5() {
  return (
    o_ ||
      ((o_ = 1),
      (function (e, a) {
        ;(function (n, r) {
          e.exports = r(R())
        })(Z5, function (n) {
          function r(u) {
            return u && typeof u == 'object' && 'default' in u ? u : { default: u }
          }
          var o = r(n),
            s = {
              s: 'ein paar Sekunden',
              m: ['eine Minute', 'einer Minute'],
              mm: '%d Minuten',
              h: ['eine Stunde', 'einer Stunde'],
              hh: '%d Stunden',
              d: ['ein Tag', 'einem Tag'],
              dd: ['%d Tage', '%d Tagen'],
              M: ['ein Monat', 'einem Monat'],
              MM: ['%d Monate', '%d Monaten'],
              y: ['ein Jahr', 'einem Jahr'],
              yy: ['%d Jahre', '%d Jahren']
            }
          function t(u, l, d) {
            var c = s[d]
            return (Array.isArray(c) && (c = c[l ? 0 : 1]), c.replace('%d', u))
          }
          var i = {
            name: 'de',
            weekdays: 'Sonntag_Montag_Dienstag_Mittwoch_Donnerstag_Freitag_Samstag'.split('_'),
            weekdaysShort: 'So._Mo._Di._Mi._Do._Fr._Sa.'.split('_'),
            weekdaysMin: 'So_Mo_Di_Mi_Do_Fr_Sa'.split('_'),
            months:
              'Januar_Februar_März_April_Mai_Juni_Juli_August_September_Oktober_November_Dezember'.split(
                '_'
              ),
            monthsShort: 'Jan._Feb._März_Apr._Mai_Juni_Juli_Aug._Sept._Okt._Nov._Dez.'.split('_'),
            ordinal: function (u) {
              return u + '.'
            },
            weekStart: 1,
            yearStart: 4,
            formats: {
              LTS: 'HH:mm:ss',
              LT: 'HH:mm',
              L: 'DD.MM.YYYY',
              LL: 'D. MMMM YYYY',
              LLL: 'D. MMMM YYYY HH:mm',
              LLLL: 'dddd, D. MMMM YYYY HH:mm'
            },
            relativeTime: {
              future: 'in %s',
              past: 'vor %s',
              s: t,
              m: t,
              mm: t,
              h: t,
              hh: t,
              d: t,
              dd: t,
              M: t,
              MM: t,
              y: t,
              yy: t
            }
          }
          return (o.default.locale(i, null, !0), i)
        })
      })(Sr)),
    Sr.exports
  )
}
var EM = Q5()
const eT = /* @__PURE__ */ F(EM),
  tT = /* @__PURE__ */ q(
    {
      __proto__: null,
      default: eT
    },
    [EM]
  )
var Dr = { exports: {} },
  rT = Dr.exports,
  s_
function nT() {
  return (
    s_ ||
      ((s_ = 1),
      (function (e, a) {
        ;(function (n, r) {
          e.exports = r(R())
        })(rT, function (n) {
          function r(t) {
            return t && typeof t == 'object' && 'default' in t ? t : { default: t }
          }
          var o = r(n),
            s = {
              name: 'dv',
              weekdays: 'އާދިއްތަ_ހޯމަ_އަންގާރަ_ބުދަ_ބުރާސްފަތި_ހުކުރު_ހޮނިހިރު'.split('_'),
              months:
                'ޖެނުއަރީ_ފެބްރުއަރީ_މާރިޗު_އޭޕްރީލު_މޭ_ޖޫން_ޖުލައި_އޯގަސްޓު_ސެޕްޓެމްބަރު_އޮކްޓޯބަރު_ނޮވެމްބަރު_ޑިސެމްބަރު'.split(
                  '_'
                ),
              weekStart: 7,
              weekdaysShort: 'އާދިއްތަ_ހޯމަ_އަންގާރަ_ބުދަ_ބުރާސްފަތި_ހުކުރު_ހޮނިހިރު'.split('_'),
              monthsShort:
                'ޖެނުއަރީ_ފެބްރުއަރީ_މާރިޗު_އޭޕްރީލު_މޭ_ޖޫން_ޖުލައި_އޯގަސްޓު_ސެޕްޓެމްބަރު_އޮކްޓޯބަރު_ނޮވެމްބަރު_ޑިސެމްބަރު'.split(
                  '_'
                ),
              weekdaysMin: 'އާދި_ހޯމަ_އަން_ބުދަ_ބުރާ_ހުކު_ހޮނި'.split('_'),
              ordinal: function (t) {
                return t
              },
              formats: {
                LT: 'HH:mm',
                LTS: 'HH:mm:ss',
                L: 'D/M/YYYY',
                LL: 'D MMMM YYYY',
                LLL: 'D MMMM YYYY HH:mm',
                LLLL: 'dddd D MMMM YYYY HH:mm'
              },
              relativeTime: {
                future: 'ތެރޭގައި %s',
                past: 'ކުރިން %s',
                s: 'ސިކުންތުކޮޅެއް',
                m: 'މިނިޓެއް',
                mm: 'މިނިޓު %d',
                h: 'ގަޑިއިރެއް',
                hh: 'ގަޑިއިރު %d',
                d: 'ދުވަހެއް',
                dd: 'ދުވަސް %d',
                M: 'މަހެއް',
                MM: 'މަސް %d',
                y: 'އަހަރެއް',
                yy: 'އަހަރު %d'
              }
            }
          return (o.default.locale(s, null, !0), s)
        })
      })(Dr)),
    Dr.exports
  )
}
var TM = nT()
const aT = /* @__PURE__ */ F(TM),
  oT = /* @__PURE__ */ q(
    {
      __proto__: null,
      default: aT
    },
    [TM]
  )
var Er = { exports: {} },
  sT = Er.exports,
  i_
function iT() {
  return (
    i_ ||
      ((i_ = 1),
      (function (e, a) {
        ;(function (n, r) {
          e.exports = r(R())
        })(sT, function (n) {
          function r(t) {
            return t && typeof t == 'object' && 'default' in t ? t : { default: t }
          }
          var o = r(n),
            s = {
              name: 'el',
              weekdays: 'Κυριακή_Δευτέρα_Τρίτη_Τετάρτη_Πέμπτη_Παρασκευή_Σάββατο'.split('_'),
              weekdaysShort: 'Κυρ_Δευ_Τρι_Τετ_Πεμ_Παρ_Σαβ'.split('_'),
              weekdaysMin: 'Κυ_Δε_Τρ_Τε_Πε_Πα_Σα'.split('_'),
              months:
                'Ιανουάριος_Φεβρουάριος_Μάρτιος_Απρίλιος_Μάιος_Ιούνιος_Ιούλιος_Αύγουστος_Σεπτέμβριος_Οκτώβριος_Νοέμβριος_Δεκέμβριος'.split(
                  '_'
                ),
              monthsShort: 'Ιαν_Φεβ_Μαρ_Απρ_Μαι_Ιουν_Ιουλ_Αυγ_Σεπτ_Οκτ_Νοε_Δεκ'.split('_'),
              ordinal: function (t) {
                return t
              },
              weekStart: 1,
              relativeTime: {
                future: 'σε %s',
                past: 'πριν %s',
                s: 'μερικά δευτερόλεπτα',
                m: 'ένα λεπτό',
                mm: '%d λεπτά',
                h: 'μία ώρα',
                hh: '%d ώρες',
                d: 'μία μέρα',
                dd: '%d μέρες',
                M: 'ένα μήνα',
                MM: '%d μήνες',
                y: 'ένα χρόνο',
                yy: '%d χρόνια'
              },
              formats: {
                LT: 'h:mm A',
                LTS: 'h:mm:ss A',
                L: 'DD/MM/YYYY',
                LL: 'D MMMM YYYY',
                LLL: 'D MMMM YYYY h:mm A',
                LLLL: 'dddd, D MMMM YYYY h:mm A'
              }
            }
          return (o.default.locale(s, null, !0), s)
        })
      })(Er)),
    Er.exports
  )
}
var $M = iT()
const uT = /* @__PURE__ */ F($M),
  lT = /* @__PURE__ */ q(
    {
      __proto__: null,
      default: uT
    },
    [$M]
  )
var Tr = { exports: {} },
  dT = Tr.exports,
  u_
function cT() {
  return (
    u_ ||
      ((u_ = 1),
      (function (e, a) {
        ;(function (n, r) {
          e.exports = r(R())
        })(dT, function (n) {
          function r(t) {
            return t && typeof t == 'object' && 'default' in t ? t : { default: t }
          }
          var o = r(n),
            s = {
              name: 'en-au',
              weekdays: 'Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday'.split('_'),
              months:
                'January_February_March_April_May_June_July_August_September_October_November_December'.split(
                  '_'
                ),
              weekStart: 1,
              weekdaysShort: 'Sun_Mon_Tue_Wed_Thu_Fri_Sat'.split('_'),
              monthsShort: 'Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec'.split('_'),
              weekdaysMin: 'Su_Mo_Tu_We_Th_Fr_Sa'.split('_'),
              formats: {
                LT: 'h:mm A',
                LTS: 'h:mm:ss A',
                L: 'DD/MM/YYYY',
                LL: 'D MMMM YYYY',
                LLL: 'D MMMM YYYY h:mm A',
                LLLL: 'dddd, D MMMM YYYY h:mm A'
              },
              relativeTime: {
                future: 'in %s',
                past: '%s ago',
                s: 'a few seconds',
                m: 'a minute',
                mm: '%d minutes',
                h: 'an hour',
                hh: '%d hours',
                d: 'a day',
                dd: '%d days',
                M: 'a month',
                MM: '%d months',
                y: 'a year',
                yy: '%d years'
              },
              ordinal: function (t) {
                var i = ['th', 'st', 'nd', 'rd'],
                  u = t % 100
                return '[' + t + (i[(u - 20) % 10] || i[u] || i[0]) + ']'
              }
            }
          return (o.default.locale(s, null, !0), s)
        })
      })(Tr)),
    Tr.exports
  )
}
var HM = cT()
const _T = /* @__PURE__ */ F(HM),
  fT = /* @__PURE__ */ q(
    {
      __proto__: null,
      default: _T
    },
    [HM]
  )
var $r = { exports: {} },
  mT = $r.exports,
  l_
function pT() {
  return (
    l_ ||
      ((l_ = 1),
      (function (e, a) {
        ;(function (n, r) {
          e.exports = r(R())
        })(mT, function (n) {
          function r(t) {
            return t && typeof t == 'object' && 'default' in t ? t : { default: t }
          }
          var o = r(n),
            s = {
              name: 'en-ca',
              weekdays: 'Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday'.split('_'),
              months:
                'January_February_March_April_May_June_July_August_September_October_November_December'.split(
                  '_'
                ),
              weekdaysShort: 'Sun_Mon_Tue_Wed_Thu_Fri_Sat'.split('_'),
              monthsShort: 'Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec'.split('_'),
              weekdaysMin: 'Su_Mo_Tu_We_Th_Fr_Sa'.split('_'),
              ordinal: function (t) {
                return t
              },
              formats: {
                LT: 'h:mm A',
                LTS: 'h:mm:ss A',
                L: 'YYYY-MM-DD',
                LL: 'MMMM D, YYYY',
                LLL: 'MMMM D, YYYY h:mm A',
                LLLL: 'dddd, MMMM D, YYYY h:mm A'
              },
              relativeTime: {
                future: 'in %s',
                past: '%s ago',
                s: 'a few seconds',
                m: 'a minute',
                mm: '%d minutes',
                h: 'an hour',
                hh: '%d hours',
                d: 'a day',
                dd: '%d days',
                M: 'a month',
                MM: '%d months',
                y: 'a year',
                yy: '%d years'
              }
            }
          return (o.default.locale(s, null, !0), s)
        })
      })($r)),
    $r.exports
  )
}
var jM = pT()
const hT = /* @__PURE__ */ F(jM),
  vT = /* @__PURE__ */ q(
    {
      __proto__: null,
      default: hT
    },
    [jM]
  )
var Hr = { exports: {} },
  yT = Hr.exports,
  d_
function gT() {
  return (
    d_ ||
      ((d_ = 1),
      (function (e, a) {
        ;(function (n, r) {
          e.exports = r(R())
        })(yT, function (n) {
          function r(t) {
            return t && typeof t == 'object' && 'default' in t ? t : { default: t }
          }
          var o = r(n),
            s = {
              name: 'en-gb',
              weekdays: 'Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday'.split('_'),
              weekdaysShort: 'Sun_Mon_Tue_Wed_Thu_Fri_Sat'.split('_'),
              weekdaysMin: 'Su_Mo_Tu_We_Th_Fr_Sa'.split('_'),
              months:
                'January_February_March_April_May_June_July_August_September_October_November_December'.split(
                  '_'
                ),
              monthsShort: 'Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec'.split('_'),
              weekStart: 1,
              yearStart: 4,
              relativeTime: {
                future: 'in %s',
                past: '%s ago',
                s: 'a few seconds',
                m: 'a minute',
                mm: '%d minutes',
                h: 'an hour',
                hh: '%d hours',
                d: 'a day',
                dd: '%d days',
                M: 'a month',
                MM: '%d months',
                y: 'a year',
                yy: '%d years'
              },
              formats: {
                LT: 'HH:mm',
                LTS: 'HH:mm:ss',
                L: 'DD/MM/YYYY',
                LL: 'D MMMM YYYY',
                LLL: 'D MMMM YYYY HH:mm',
                LLLL: 'dddd, D MMMM YYYY HH:mm'
              },
              ordinal: function (t) {
                var i = ['th', 'st', 'nd', 'rd'],
                  u = t % 100
                return '[' + t + (i[(u - 20) % 10] || i[u] || i[0]) + ']'
              }
            }
          return (o.default.locale(s, null, !0), s)
        })
      })(Hr)),
    Hr.exports
  )
}
var CM = gT()
const MT = /* @__PURE__ */ F(CM),
  bT = /* @__PURE__ */ q(
    {
      __proto__: null,
      default: MT
    },
    [CM]
  )
var jr = { exports: {} },
  YT = jr.exports,
  c_
function wT() {
  return (
    c_ ||
      ((c_ = 1),
      (function (e, a) {
        ;(function (n, r) {
          e.exports = r(R())
        })(YT, function (n) {
          function r(t) {
            return t && typeof t == 'object' && 'default' in t ? t : { default: t }
          }
          var o = r(n),
            s = {
              name: 'en-ie',
              weekdays: 'Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday'.split('_'),
              months:
                'January_February_March_April_May_June_July_August_September_October_November_December'.split(
                  '_'
                ),
              weekStart: 1,
              weekdaysShort: 'Sun_Mon_Tue_Wed_Thu_Fri_Sat'.split('_'),
              monthsShort: 'Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec'.split('_'),
              weekdaysMin: 'Su_Mo_Tu_We_Th_Fr_Sa'.split('_'),
              ordinal: function (t) {
                return t
              },
              formats: {
                LT: 'HH:mm',
                LTS: 'HH:mm:ss',
                L: 'DD/MM/YYYY',
                LL: 'D MMMM YYYY',
                LLL: 'D MMMM YYYY HH:mm',
                LLLL: 'dddd D MMMM YYYY HH:mm'
              },
              relativeTime: {
                future: 'in %s',
                past: '%s ago',
                s: 'a few seconds',
                m: 'a minute',
                mm: '%d minutes',
                h: 'an hour',
                hh: '%d hours',
                d: 'a day',
                dd: '%d days',
                M: 'a month',
                MM: '%d months',
                y: 'a year',
                yy: '%d years'
              }
            }
          return (o.default.locale(s, null, !0), s)
        })
      })(jr)),
    jr.exports
  )
}
var AM = wT()
const xT = /* @__PURE__ */ F(AM),
  LT = /* @__PURE__ */ q(
    {
      __proto__: null,
      default: xT
    },
    [AM]
  )
var Cr = { exports: {} },
  kT = Cr.exports,
  __
function ST() {
  return (
    __ ||
      ((__ = 1),
      (function (e, a) {
        ;(function (n, r) {
          e.exports = r(R())
        })(kT, function (n) {
          function r(t) {
            return t && typeof t == 'object' && 'default' in t ? t : { default: t }
          }
          var o = r(n),
            s = {
              name: 'en-il',
              weekdays: 'Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday'.split('_'),
              months:
                'January_February_March_April_May_June_July_August_September_October_November_December'.split(
                  '_'
                ),
              weekdaysShort: 'Sun_Mon_Tue_Wed_Thu_Fri_Sat'.split('_'),
              monthsShort: 'Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec'.split('_'),
              weekdaysMin: 'Su_Mo_Tu_We_Th_Fr_Sa'.split('_'),
              ordinal: function (t) {
                return t
              },
              formats: {
                LT: 'HH:mm',
                LTS: 'HH:mm:ss',
                L: 'DD/MM/YYYY',
                LL: 'D MMMM YYYY',
                LLL: 'D MMMM YYYY HH:mm',
                LLLL: 'dddd, D MMMM YYYY HH:mm'
              },
              relativeTime: {
                future: 'in %s',
                past: '%s ago',
                s: 'a few seconds',
                m: 'a minute',
                mm: '%d minutes',
                h: 'an hour',
                hh: '%d hours',
                d: 'a day',
                dd: '%d days',
                M: 'a month',
                MM: '%d months',
                y: 'a year',
                yy: '%d years'
              }
            }
          return (o.default.locale(s, null, !0), s)
        })
      })(Cr)),
    Cr.exports
  )
}
var qM = ST()
const DT = /* @__PURE__ */ F(qM),
  ET = /* @__PURE__ */ q(
    {
      __proto__: null,
      default: DT
    },
    [qM]
  )
var Ar = { exports: {} },
  TT = Ar.exports,
  f_
function $T() {
  return (
    f_ ||
      ((f_ = 1),
      (function (e, a) {
        ;(function (n, r) {
          e.exports = r(R())
        })(TT, function (n) {
          function r(t) {
            return t && typeof t == 'object' && 'default' in t ? t : { default: t }
          }
          var o = r(n),
            s = {
              name: 'en-in',
              weekdays: 'Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday'.split('_'),
              weekdaysShort: 'Sun_Mon_Tue_Wed_Thu_Fri_Sat'.split('_'),
              weekdaysMin: 'Su_Mo_Tu_We_Th_Fr_Sa'.split('_'),
              months:
                'January_February_March_April_May_June_July_August_September_October_November_December'.split(
                  '_'
                ),
              monthsShort: 'Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec'.split('_'),
              weekStart: 1,
              yearStart: 4,
              relativeTime: {
                future: 'in %s',
                past: '%s ago',
                s: 'a few seconds',
                m: 'a minute',
                mm: '%d minutes',
                h: 'an hour',
                hh: '%d hours',
                d: 'a day',
                dd: '%d days',
                M: 'a month',
                MM: '%d months',
                y: 'a year',
                yy: '%d years'
              },
              formats: {
                LT: 'HH:mm',
                LTS: 'HH:mm:ss',
                L: 'DD/MM/YYYY',
                LL: 'D MMMM YYYY',
                LLL: 'D MMMM YYYY HH:mm',
                LLLL: 'dddd, D MMMM YYYY HH:mm'
              },
              ordinal: function (t) {
                var i = ['th', 'st', 'nd', 'rd'],
                  u = t % 100
                return '[' + t + (i[(u - 20) % 10] || i[u] || i[0]) + ']'
              }
            }
          return (o.default.locale(s, null, !0), s)
        })
      })(Ar)),
    Ar.exports
  )
}
var FM = $T()
const HT = /* @__PURE__ */ F(FM),
  jT = /* @__PURE__ */ q(
    {
      __proto__: null,
      default: HT
    },
    [FM]
  )
var qr = { exports: {} },
  CT = qr.exports,
  m_
function AT() {
  return (
    m_ ||
      ((m_ = 1),
      (function (e, a) {
        ;(function (n, r) {
          e.exports = r(R())
        })(CT, function (n) {
          function r(t) {
            return t && typeof t == 'object' && 'default' in t ? t : { default: t }
          }
          var o = r(n),
            s = {
              name: 'en-nz',
              weekdays: 'Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday'.split('_'),
              months:
                'January_February_March_April_May_June_July_August_September_October_November_December'.split(
                  '_'
                ),
              weekStart: 1,
              weekdaysShort: 'Sun_Mon_Tue_Wed_Thu_Fri_Sat'.split('_'),
              monthsShort: 'Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec'.split('_'),
              weekdaysMin: 'Su_Mo_Tu_We_Th_Fr_Sa'.split('_'),
              ordinal: function (t) {
                var i = ['th', 'st', 'nd', 'rd'],
                  u = t % 100
                return '[' + t + (i[(u - 20) % 10] || i[u] || i[0]) + ']'
              },
              formats: {
                LT: 'h:mm A',
                LTS: 'h:mm:ss A',
                L: 'DD/MM/YYYY',
                LL: 'D MMMM YYYY',
                LLL: 'D MMMM YYYY h:mm A',
                LLLL: 'dddd, D MMMM YYYY h:mm A'
              },
              relativeTime: {
                future: 'in %s',
                past: '%s ago',
                s: 'a few seconds',
                m: 'a minute',
                mm: '%d minutes',
                h: 'an hour',
                hh: '%d hours',
                d: 'a day',
                dd: '%d days',
                M: 'a month',
                MM: '%d months',
                y: 'a year',
                yy: '%d years'
              }
            }
          return (o.default.locale(s, null, !0), s)
        })
      })(qr)),
    qr.exports
  )
}
var RM = AT()
const qT = /* @__PURE__ */ F(RM),
  FT = /* @__PURE__ */ q(
    {
      __proto__: null,
      default: qT
    },
    [RM]
  )
var Fr = { exports: {} },
  RT = Fr.exports,
  p_
function IT() {
  return (
    p_ ||
      ((p_ = 1),
      (function (e, a) {
        ;(function (n, r) {
          e.exports = r(R())
        })(RT, function (n) {
          function r(t) {
            return t && typeof t == 'object' && 'default' in t ? t : { default: t }
          }
          var o = r(n),
            s = {
              name: 'en-sg',
              weekdays: 'Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday'.split('_'),
              months:
                'January_February_March_April_May_June_July_August_September_October_November_December'.split(
                  '_'
                ),
              weekStart: 1,
              weekdaysShort: 'Sun_Mon_Tue_Wed_Thu_Fri_Sat'.split('_'),
              monthsShort: 'Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec'.split('_'),
              weekdaysMin: 'Su_Mo_Tu_We_Th_Fr_Sa'.split('_'),
              ordinal: function (t) {
                return t
              },
              formats: {
                LT: 'HH:mm',
                LTS: 'HH:mm:ss',
                L: 'DD/MM/YYYY',
                LL: 'D MMMM YYYY',
                LLL: 'D MMMM YYYY HH:mm',
                LLLL: 'dddd, D MMMM YYYY HH:mm'
              },
              relativeTime: {
                future: 'in %s',
                past: '%s ago',
                s: 'a few seconds',
                m: 'a minute',
                mm: '%d minutes',
                h: 'an hour',
                hh: '%d hours',
                d: 'a day',
                dd: '%d days',
                M: 'a month',
                MM: '%d months',
                y: 'a year',
                yy: '%d years'
              }
            }
          return (o.default.locale(s, null, !0), s)
        })
      })(Fr)),
    Fr.exports
  )
}
var IM = IT()
const PT = /* @__PURE__ */ F(IM),
  BT = /* @__PURE__ */ q(
    {
      __proto__: null,
      default: PT
    },
    [IM]
  )
var Rr = { exports: {} },
  NT = Rr.exports,
  h_
function OT() {
  return (
    h_ ||
      ((h_ = 1),
      (function (e, a) {
        ;(function (n, r) {
          e.exports = r(R())
        })(NT, function (n) {
          function r(t) {
            return t && typeof t == 'object' && 'default' in t ? t : { default: t }
          }
          var o = r(n),
            s = {
              name: 'en-tt',
              weekdays: 'Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday'.split('_'),
              weekdaysShort: 'Sun_Mon_Tue_Wed_Thu_Fri_Sat'.split('_'),
              weekdaysMin: 'Su_Mo_Tu_We_Th_Fr_Sa'.split('_'),
              months:
                'January_February_March_April_May_June_July_August_September_October_November_December'.split(
                  '_'
                ),
              monthsShort: 'Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec'.split('_'),
              weekStart: 1,
              yearStart: 4,
              relativeTime: {
                future: 'in %s',
                past: '%s ago',
                s: 'a few seconds',
                m: 'a minute',
                mm: '%d minutes',
                h: 'an hour',
                hh: '%d hours',
                d: 'a day',
                dd: '%d days',
                M: 'a month',
                MM: '%d months',
                y: 'a year',
                yy: '%d years'
              },
              formats: {
                LT: 'HH:mm',
                LTS: 'HH:mm:ss',
                L: 'DD/MM/YYYY',
                LL: 'D MMMM YYYY',
                LLL: 'D MMMM YYYY HH:mm',
                LLLL: 'dddd, D MMMM YYYY HH:mm'
              },
              ordinal: function (t) {
                var i = ['th', 'st', 'nd', 'rd'],
                  u = t % 100
                return '[' + t + (i[(u - 20) % 10] || i[u] || i[0]) + ']'
              }
            }
          return (o.default.locale(s, null, !0), s)
        })
      })(Rr)),
    Rr.exports
  )
}
var PM = OT()
const zT = /* @__PURE__ */ F(PM),
  GT = /* @__PURE__ */ q(
    {
      __proto__: null,
      default: zT
    },
    [PM]
  )
var Ir = { exports: {} },
  JT = Ir.exports,
  v_
function UT() {
  return (
    v_ ||
      ((v_ = 1),
      (function (e, a) {
        ;(function (n, r) {
          e.exports = r(R())
        })(JT, function (n) {
          function r(t) {
            return t && typeof t == 'object' && 'default' in t ? t : { default: t }
          }
          var o = r(n),
            s = {
              name: 'eo',
              weekdays: 'dimanĉo_lundo_mardo_merkredo_ĵaŭdo_vendredo_sabato'.split('_'),
              months:
                'januaro_februaro_marto_aprilo_majo_junio_julio_aŭgusto_septembro_oktobro_novembro_decembro'.split(
                  '_'
                ),
              weekStart: 1,
              weekdaysShort: 'dim_lun_mard_merk_ĵaŭ_ven_sab'.split('_'),
              monthsShort: 'jan_feb_mar_apr_maj_jun_jul_aŭg_sep_okt_nov_dec'.split('_'),
              weekdaysMin: 'di_lu_ma_me_ĵa_ve_sa'.split('_'),
              ordinal: function (t) {
                return t
              },
              formats: {
                LT: 'HH:mm',
                LTS: 'HH:mm:ss',
                L: 'YYYY-MM-DD',
                LL: 'D[-a de] MMMM, YYYY',
                LLL: 'D[-a de] MMMM, YYYY HH:mm',
                LLLL: 'dddd, [la] D[-a de] MMMM, YYYY HH:mm'
              },
              relativeTime: {
                future: 'post %s',
                past: 'antaŭ %s',
                s: 'sekundoj',
                m: 'minuto',
                mm: '%d minutoj',
                h: 'horo',
                hh: '%d horoj',
                d: 'tago',
                dd: '%d tagoj',
                M: 'monato',
                MM: '%d monatoj',
                y: 'jaro',
                yy: '%d jaroj'
              }
            }
          return (o.default.locale(s, null, !0), s)
        })
      })(Ir)),
    Ir.exports
  )
}
var BM = UT()
const WT = /* @__PURE__ */ F(BM),
  VT = /* @__PURE__ */ q(
    {
      __proto__: null,
      default: WT
    },
    [BM]
  )
var Pr = { exports: {} },
  KT = Pr.exports,
  y_
function XT() {
  return (
    y_ ||
      ((y_ = 1),
      (function (e, a) {
        ;(function (n, r) {
          e.exports = r(R())
        })(KT, function (n) {
          function r(t) {
            return t && typeof t == 'object' && 'default' in t ? t : { default: t }
          }
          var o = r(n),
            s = {
              name: 'es-do',
              weekdays: 'domingo_lunes_martes_miércoles_jueves_viernes_sábado'.split('_'),
              weekdaysShort: 'dom._lun._mar._mié._jue._vie._sáb.'.split('_'),
              weekdaysMin: 'do_lu_ma_mi_ju_vi_sá'.split('_'),
              months:
                'enero_febrero_marzo_abril_mayo_junio_julio_agosto_septiembre_octubre_noviembre_diciembre'.split(
                  '_'
                ),
              monthsShort: 'ene_feb_mar_abr_may_jun_jul_ago_sep_oct_nov_dic'.split('_'),
              weekStart: 1,
              relativeTime: {
                future: 'en %s',
                past: 'hace %s',
                s: 'unos segundos',
                m: 'un minuto',
                mm: '%d minutos',
                h: 'una hora',
                hh: '%d horas',
                d: 'un día',
                dd: '%d días',
                M: 'un mes',
                MM: '%d meses',
                y: 'un año',
                yy: '%d años'
              },
              ordinal: function (t) {
                return t + 'º'
              },
              formats: {
                LT: 'h:mm A',
                LTS: 'h:mm:ss A',
                L: 'DD/MM/YYYY',
                LL: 'D [de] MMMM [de] YYYY',
                LLL: 'D [de] MMMM [de] YYYY h:mm A',
                LLLL: 'dddd, D [de] MMMM [de] YYYY h:mm A'
              }
            }
          return (o.default.locale(s, null, !0), s)
        })
      })(Pr)),
    Pr.exports
  )
}
var NM = XT()
const ZT = /* @__PURE__ */ F(NM),
  QT = /* @__PURE__ */ q(
    {
      __proto__: null,
      default: ZT
    },
    [NM]
  )
var Br = { exports: {} },
  e$ = Br.exports,
  g_
function t$() {
  return (
    g_ ||
      ((g_ = 1),
      (function (e, a) {
        ;(function (n, r) {
          e.exports = r(R())
        })(e$, function (n) {
          function r(t) {
            return t && typeof t == 'object' && 'default' in t ? t : { default: t }
          }
          var o = r(n),
            s = {
              name: 'es-mx',
              weekdays: 'domingo_lunes_martes_miércoles_jueves_viernes_sábado'.split('_'),
              weekdaysShort: 'dom._lun._mar._mié._jue._vie._sáb.'.split('_'),
              weekdaysMin: 'do_lu_ma_mi_ju_vi_sá'.split('_'),
              months:
                'enero_febrero_marzo_abril_mayo_junio_julio_agosto_septiembre_octubre_noviembre_diciembre'.split(
                  '_'
                ),
              monthsShort: 'ene_feb_mar_abr_may_jun_jul_ago_sep_oct_nov_dic'.split('_'),
              relativeTime: {
                future: 'en %s',
                past: 'hace %s',
                s: 'unos segundos',
                m: 'un minuto',
                mm: '%d minutos',
                h: 'una hora',
                hh: '%d horas',
                d: 'un día',
                dd: '%d días',
                M: 'un mes',
                MM: '%d meses',
                y: 'un año',
                yy: '%d años'
              },
              ordinal: function (t) {
                return t + 'º'
              },
              formats: {
                LT: 'H:mm',
                LTS: 'H:mm:ss',
                L: 'DD/MM/YYYY',
                LL: 'D [de] MMMM [de] YYYY',
                LLL: 'D [de] MMMM [de] YYYY H:mm',
                LLLL: 'dddd, D [de] MMMM [de] YYYY H:mm'
              }
            }
          return (o.default.locale(s, null, !0), s)
        })
      })(Br)),
    Br.exports
  )
}
var OM = t$()
const r$ = /* @__PURE__ */ F(OM),
  n$ = /* @__PURE__ */ q(
    {
      __proto__: null,
      default: r$
    },
    [OM]
  )
var Nr = { exports: {} },
  a$ = Nr.exports,
  M_
function o$() {
  return (
    M_ ||
      ((M_ = 1),
      (function (e, a) {
        ;(function (n, r) {
          e.exports = r(R())
        })(a$, function (n) {
          function r(t) {
            return t && typeof t == 'object' && 'default' in t ? t : { default: t }
          }
          var o = r(n),
            s = {
              name: 'es-pr',
              monthsShort: 'ene_feb_mar_abr_may_jun_jul_ago_sep_oct_nov_dic'.split('_'),
              weekdays: 'domingo_lunes_martes_miércoles_jueves_viernes_sábado'.split('_'),
              weekdaysShort: 'dom._lun._mar._mié._jue._vie._sáb.'.split('_'),
              weekdaysMin: 'do_lu_ma_mi_ju_vi_sá'.split('_'),
              months:
                'enero_febrero_marzo_abril_mayo_junio_julio_agosto_septiembre_octubre_noviembre_diciembre'.split(
                  '_'
                ),
              weekStart: 1,
              formats: {
                LT: 'h:mm A',
                LTS: 'h:mm:ss A',
                L: 'MM/DD/YYYY',
                LL: 'D [de] MMMM [de] YYYY',
                LLL: 'D [de] MMMM [de] YYYY h:mm A',
                LLLL: 'dddd, D [de] MMMM [de] YYYY h:mm A'
              },
              relativeTime: {
                future: 'en %s',
                past: 'hace %s',
                s: 'unos segundos',
                m: 'un minuto',
                mm: '%d minutos',
                h: 'una hora',
                hh: '%d horas',
                d: 'un día',
                dd: '%d días',
                M: 'un mes',
                MM: '%d meses',
                y: 'un año',
                yy: '%d años'
              },
              ordinal: function (t) {
                return t + 'º'
              }
            }
          return (o.default.locale(s, null, !0), s)
        })
      })(Nr)),
    Nr.exports
  )
}
var zM = o$()
const s$ = /* @__PURE__ */ F(zM),
  i$ = /* @__PURE__ */ q(
    {
      __proto__: null,
      default: s$
    },
    [zM]
  )
var Or = { exports: {} },
  u$ = Or.exports,
  b_
function l$() {
  return (
    b_ ||
      ((b_ = 1),
      (function (e, a) {
        ;(function (n, r) {
          e.exports = r(R())
        })(u$, function (n) {
          function r(t) {
            return t && typeof t == 'object' && 'default' in t ? t : { default: t }
          }
          var o = r(n),
            s = {
              name: 'es-us',
              weekdays: 'domingo_lunes_martes_miércoles_jueves_viernes_sábado'.split('_'),
              weekdaysShort: 'dom._lun._mar._mié._jue._vie._sáb.'.split('_'),
              weekdaysMin: 'do_lu_ma_mi_ju_vi_sá'.split('_'),
              months:
                'enero_febrero_marzo_abril_mayo_junio_julio_agosto_septiembre_octubre_noviembre_diciembre'.split(
                  '_'
                ),
              monthsShort: 'ene_feb_mar_abr_may_jun_jul_ago_sep_oct_nov_dic'.split('_'),
              relativeTime: {
                future: 'en %s',
                past: 'hace %s',
                s: 'unos segundos',
                m: 'un minuto',
                mm: '%d minutos',
                h: 'una hora',
                hh: '%d horas',
                d: 'un día',
                dd: '%d días',
                M: 'un mes',
                MM: '%d meses',
                y: 'un año',
                yy: '%d años'
              },
              ordinal: function (t) {
                return t + 'º'
              },
              formats: {
                LT: 'h:mm A',
                LTS: 'h:mm:ss A',
                L: 'MM/DD/YYYY',
                LL: 'D [de] MMMM [de] YYYY',
                LLL: 'D [de] MMMM [de] YYYY h:mm A',
                LLLL: 'dddd, D [de] MMMM [de] YYYY h:mm A'
              }
            }
          return (o.default.locale(s, null, !0), s)
        })
      })(Or)),
    Or.exports
  )
}
var GM = l$()
const d$ = /* @__PURE__ */ F(GM),
  c$ = /* @__PURE__ */ q(
    {
      __proto__: null,
      default: d$
    },
    [GM]
  )
var zr = { exports: {} },
  _$ = zr.exports,
  Y_
function f$() {
  return (
    Y_ ||
      ((Y_ = 1),
      (function (e, a) {
        ;(function (n, r) {
          e.exports = r(R())
        })(_$, function (n) {
          function r(t) {
            return t && typeof t == 'object' && 'default' in t ? t : { default: t }
          }
          var o = r(n),
            s = {
              name: 'es',
              monthsShort: 'ene_feb_mar_abr_may_jun_jul_ago_sep_oct_nov_dic'.split('_'),
              weekdays: 'domingo_lunes_martes_miércoles_jueves_viernes_sábado'.split('_'),
              weekdaysShort: 'dom._lun._mar._mié._jue._vie._sáb.'.split('_'),
              weekdaysMin: 'do_lu_ma_mi_ju_vi_sá'.split('_'),
              months:
                'enero_febrero_marzo_abril_mayo_junio_julio_agosto_septiembre_octubre_noviembre_diciembre'.split(
                  '_'
                ),
              weekStart: 1,
              formats: {
                LT: 'H:mm',
                LTS: 'H:mm:ss',
                L: 'DD/MM/YYYY',
                LL: 'D [de] MMMM [de] YYYY',
                LLL: 'D [de] MMMM [de] YYYY H:mm',
                LLLL: 'dddd, D [de] MMMM [de] YYYY H:mm'
              },
              relativeTime: {
                future: 'en %s',
                past: 'hace %s',
                s: 'unos segundos',
                m: 'un minuto',
                mm: '%d minutos',
                h: 'una hora',
                hh: '%d horas',
                d: 'un día',
                dd: '%d días',
                M: 'un mes',
                MM: '%d meses',
                y: 'un año',
                yy: '%d años'
              },
              ordinal: function (t) {
                return t + 'º'
              }
            }
          return (o.default.locale(s, null, !0), s)
        })
      })(zr)),
    zr.exports
  )
}
var JM = f$()
const m$ = /* @__PURE__ */ F(JM),
  p$ = /* @__PURE__ */ q(
    {
      __proto__: null,
      default: m$
    },
    [JM]
  )
var Gr = { exports: {} },
  h$ = Gr.exports,
  w_
function v$() {
  return (
    w_ ||
      ((w_ = 1),
      (function (e, a) {
        ;(function (n, r) {
          e.exports = r(R())
        })(h$, function (n) {
          function r(i) {
            return i && typeof i == 'object' && 'default' in i ? i : { default: i }
          }
          var o = r(n)
          function s(i, u, l, d) {
            var c = {
              s: ['mõne sekundi', 'mõni sekund', 'paar sekundit'],
              m: ['ühe minuti', 'üks minut'],
              mm: ['%d minuti', '%d minutit'],
              h: ['ühe tunni', 'tund aega', 'üks tund'],
              hh: ['%d tunni', '%d tundi'],
              d: ['ühe päeva', 'üks päev'],
              M: ['kuu aja', 'kuu aega', 'üks kuu'],
              MM: ['%d kuu', '%d kuud'],
              y: ['ühe aasta', 'aasta', 'üks aasta'],
              yy: ['%d aasta', '%d aastat']
            }
            return u
              ? (c[l][2] ? c[l][2] : c[l][1]).replace('%d', i)
              : (d ? c[l][0] : c[l][1]).replace('%d', i)
          }
          var t = {
            name: 'et',
            weekdays: 'pühapäev_esmaspäev_teisipäev_kolmapäev_neljapäev_reede_laupäev'.split('_'),
            weekdaysShort: 'P_E_T_K_N_R_L'.split('_'),
            weekdaysMin: 'P_E_T_K_N_R_L'.split('_'),
            months:
              'jaanuar_veebruar_märts_aprill_mai_juuni_juuli_august_september_oktoober_november_detsember'.split(
                '_'
              ),
            monthsShort: 'jaan_veebr_märts_apr_mai_juuni_juuli_aug_sept_okt_nov_dets'.split('_'),
            ordinal: function (i) {
              return i + '.'
            },
            weekStart: 1,
            relativeTime: {
              future: '%s pärast',
              past: '%s tagasi',
              s,
              m: s,
              mm: s,
              h: s,
              hh: s,
              d: s,
              dd: '%d päeva',
              M: s,
              MM: s,
              y: s,
              yy: s
            },
            formats: {
              LT: 'H:mm',
              LTS: 'H:mm:ss',
              L: 'DD.MM.YYYY',
              LL: 'D. MMMM YYYY',
              LLL: 'D. MMMM YYYY H:mm',
              LLLL: 'dddd, D. MMMM YYYY H:mm'
            }
          }
          return (o.default.locale(t, null, !0), t)
        })
      })(Gr)),
    Gr.exports
  )
}
var UM = v$()
const y$ = /* @__PURE__ */ F(UM),
  g$ = /* @__PURE__ */ q(
    {
      __proto__: null,
      default: y$
    },
    [UM]
  )
var Jr = { exports: {} },
  M$ = Jr.exports,
  x_
function b$() {
  return (
    x_ ||
      ((x_ = 1),
      (function (e, a) {
        ;(function (n, r) {
          e.exports = r(R())
        })(M$, function (n) {
          function r(t) {
            return t && typeof t == 'object' && 'default' in t ? t : { default: t }
          }
          var o = r(n),
            s = {
              name: 'eu',
              weekdays: 'igandea_astelehena_asteartea_asteazkena_osteguna_ostirala_larunbata'.split(
                '_'
              ),
              months:
                'urtarrila_otsaila_martxoa_apirila_maiatza_ekaina_uztaila_abuztua_iraila_urria_azaroa_abendua'.split(
                  '_'
                ),
              weekStart: 1,
              weekdaysShort: 'ig._al._ar._az._og._ol._lr.'.split('_'),
              monthsShort: 'urt._ots._mar._api._mai._eka._uzt._abu._ira._urr._aza._abe.'.split('_'),
              weekdaysMin: 'ig_al_ar_az_og_ol_lr'.split('_'),
              ordinal: function (t) {
                return t
              },
              formats: {
                LT: 'HH:mm',
                LTS: 'HH:mm:ss',
                L: 'YYYY-MM-DD',
                LL: 'YYYY[ko] MMMM[ren] D[a]',
                LLL: 'YYYY[ko] MMMM[ren] D[a] HH:mm',
                LLLL: 'dddd, YYYY[ko] MMMM[ren] D[a] HH:mm',
                l: 'YYYY-M-D',
                ll: 'YYYY[ko] MMM D[a]',
                lll: 'YYYY[ko] MMM D[a] HH:mm',
                llll: 'ddd, YYYY[ko] MMM D[a] HH:mm'
              },
              relativeTime: {
                future: '%s barru',
                past: 'duela %s',
                s: 'segundo batzuk',
                m: 'minutu bat',
                mm: '%d minutu',
                h: 'ordu bat',
                hh: '%d ordu',
                d: 'egun bat',
                dd: '%d egun',
                M: 'hilabete bat',
                MM: '%d hilabete',
                y: 'urte bat',
                yy: '%d urte'
              }
            }
          return (o.default.locale(s, null, !0), s)
        })
      })(Jr)),
    Jr.exports
  )
}
var WM = b$()
const Y$ = /* @__PURE__ */ F(WM),
  w$ = /* @__PURE__ */ q(
    {
      __proto__: null,
      default: Y$
    },
    [WM]
  )
var Ur = { exports: {} },
  x$ = Ur.exports,
  L_
function L$() {
  return (
    L_ ||
      ((L_ = 1),
      (function (e, a) {
        ;(function (n, r) {
          e.exports = r(R())
        })(x$, function (n) {
          function r(t) {
            return t && typeof t == 'object' && 'default' in t ? t : { default: t }
          }
          var o = r(n),
            s = {
              name: 'fa',
              weekdays: 'یک‌شنبه_دوشنبه_سه‌شنبه_چهارشنبه_پنج‌شنبه_جمعه_شنبه'.split('_'),
              weekdaysShort: 'یک‌شنبه_دوشنبه_سه‌شنبه_چهارشنبه_پنج‌شنبه_جمعه_شنبه'.split('_'),
              weekdaysMin: 'ی_د_س_چ_پ_ج_ش'.split('_'),
              weekStart: 6,
              months: 'ژانویه_فوریه_مارس_آوریل_مه_ژوئن_ژوئیه_اوت_سپتامبر_اکتبر_نوامبر_دسامبر'.split(
                '_'
              ),
              monthsShort:
                'ژانویه_فوریه_مارس_آوریل_مه_ژوئن_ژوئیه_اوت_سپتامبر_اکتبر_نوامبر_دسامبر'.split('_'),
              ordinal: function (t) {
                return t
              },
              formats: {
                LT: 'HH:mm',
                LTS: 'HH:mm:ss',
                L: 'DD/MM/YYYY',
                LL: 'D MMMM YYYY',
                LLL: 'D MMMM YYYY HH:mm',
                LLLL: 'dddd, D MMMM YYYY HH:mm'
              },
              relativeTime: {
                future: 'در %s',
                past: '%s پیش',
                s: 'چند ثانیه',
                m: 'یک دقیقه',
                mm: '%d دقیقه',
                h: 'یک ساعت',
                hh: '%d ساعت',
                d: 'یک روز',
                dd: '%d روز',
                M: 'یک ماه',
                MM: '%d ماه',
                y: 'یک سال',
                yy: '%d سال'
              }
            }
          return (o.default.locale(s, null, !0), s)
        })
      })(Ur)),
    Ur.exports
  )
}
var VM = L$()
const k$ = /* @__PURE__ */ F(VM),
  S$ = /* @__PURE__ */ q(
    {
      __proto__: null,
      default: k$
    },
    [VM]
  )
var Wr = { exports: {} },
  D$ = Wr.exports,
  k_
function E$() {
  return (
    k_ ||
      ((k_ = 1),
      (function (e, a) {
        ;(function (n, r) {
          e.exports = r(R())
        })(D$, function (n) {
          function r(i) {
            return i && typeof i == 'object' && 'default' in i ? i : { default: i }
          }
          var o = r(n)
          function s(i, u, l, d) {
            var c = {
                s: 'muutama sekunti',
                m: 'minuutti',
                mm: '%d minuuttia',
                h: 'tunti',
                hh: '%d tuntia',
                d: 'päivä',
                dd: '%d päivää',
                M: 'kuukausi',
                MM: '%d kuukautta',
                y: 'vuosi',
                yy: '%d vuotta',
                numbers:
                  'nolla_yksi_kaksi_kolme_neljä_viisi_kuusi_seitsemän_kahdeksan_yhdeksän'.split('_')
              },
              _ = {
                s: 'muutaman sekunnin',
                m: 'minuutin',
                mm: '%d minuutin',
                h: 'tunnin',
                hh: '%d tunnin',
                d: 'päivän',
                dd: '%d päivän',
                M: 'kuukauden',
                MM: '%d kuukauden',
                y: 'vuoden',
                yy: '%d vuoden',
                numbers:
                  'nollan_yhden_kahden_kolmen_neljän_viiden_kuuden_seitsemän_kahdeksan_yhdeksän'.split(
                    '_'
                  )
              },
              f = d && !u ? _ : c,
              m = f[l]
            return i < 10 ? m.replace('%d', f.numbers[i]) : m.replace('%d', i)
          }
          var t = {
            name: 'fi',
            weekdays: 'sunnuntai_maanantai_tiistai_keskiviikko_torstai_perjantai_lauantai'.split(
              '_'
            ),
            weekdaysShort: 'su_ma_ti_ke_to_pe_la'.split('_'),
            weekdaysMin: 'su_ma_ti_ke_to_pe_la'.split('_'),
            months:
              'tammikuu_helmikuu_maaliskuu_huhtikuu_toukokuu_kesäkuu_heinäkuu_elokuu_syyskuu_lokakuu_marraskuu_joulukuu'.split(
                '_'
              ),
            monthsShort:
              'tammi_helmi_maalis_huhti_touko_kesä_heinä_elo_syys_loka_marras_joulu'.split('_'),
            ordinal: function (i) {
              return i + '.'
            },
            weekStart: 1,
            yearStart: 4,
            relativeTime: {
              future: '%s päästä',
              past: '%s sitten',
              s,
              m: s,
              mm: s,
              h: s,
              hh: s,
              d: s,
              dd: s,
              M: s,
              MM: s,
              y: s,
              yy: s
            },
            formats: {
              LT: 'HH.mm',
              LTS: 'HH.mm.ss',
              L: 'DD.MM.YYYY',
              LL: 'D. MMMM[ta] YYYY',
              LLL: 'D. MMMM[ta] YYYY, [klo] HH.mm',
              LLLL: 'dddd, D. MMMM[ta] YYYY, [klo] HH.mm',
              l: 'D.M.YYYY',
              ll: 'D. MMM YYYY',
              lll: 'D. MMM YYYY, [klo] HH.mm',
              llll: 'ddd, D. MMM YYYY, [klo] HH.mm'
            }
          }
          return (o.default.locale(t, null, !0), t)
        })
      })(Wr)),
    Wr.exports
  )
}
var KM = E$()
const T$ = /* @__PURE__ */ F(KM),
  $$ = /* @__PURE__ */ q(
    {
      __proto__: null,
      default: T$
    },
    [KM]
  )
var Vr = { exports: {} },
  H$ = Vr.exports,
  S_
function j$() {
  return (
    S_ ||
      ((S_ = 1),
      (function (e, a) {
        ;(function (n, r) {
          e.exports = r(R())
        })(H$, function (n) {
          function r(t) {
            return t && typeof t == 'object' && 'default' in t ? t : { default: t }
          }
          var o = r(n),
            s = {
              name: 'fo',
              weekdays:
                'sunnudagur_mánadagur_týsdagur_mikudagur_hósdagur_fríggjadagur_leygardagur'.split(
                  '_'
                ),
              months:
                'januar_februar_mars_apríl_mai_juni_juli_august_september_oktober_november_desember'.split(
                  '_'
                ),
              weekStart: 1,
              weekdaysShort: 'sun_mán_týs_mik_hós_frí_ley'.split('_'),
              monthsShort: 'jan_feb_mar_apr_mai_jun_jul_aug_sep_okt_nov_des'.split('_'),
              weekdaysMin: 'su_má_tý_mi_hó_fr_le'.split('_'),
              ordinal: function (t) {
                return t
              },
              formats: {
                LT: 'HH:mm',
                LTS: 'HH:mm:ss',
                L: 'DD/MM/YYYY',
                LL: 'D MMMM YYYY',
                LLL: 'D MMMM YYYY HH:mm',
                LLLL: 'dddd D. MMMM, YYYY HH:mm'
              },
              relativeTime: {
                future: 'um %s',
                past: '%s síðani',
                s: 'fá sekund',
                m: 'ein minuttur',
                mm: '%d minuttir',
                h: 'ein tími',
                hh: '%d tímar',
                d: 'ein dagur',
                dd: '%d dagar',
                M: 'ein mánaður',
                MM: '%d mánaðir',
                y: 'eitt ár',
                yy: '%d ár'
              }
            }
          return (o.default.locale(s, null, !0), s)
        })
      })(Vr)),
    Vr.exports
  )
}
var XM = j$()
const C$ = /* @__PURE__ */ F(XM),
  A$ = /* @__PURE__ */ q(
    {
      __proto__: null,
      default: C$
    },
    [XM]
  )
var Kr = { exports: {} },
  q$ = Kr.exports,
  D_
function F$() {
  return (
    D_ ||
      ((D_ = 1),
      (function (e, a) {
        ;(function (n, r) {
          e.exports = r(R())
        })(q$, function (n) {
          function r(t) {
            return t && typeof t == 'object' && 'default' in t ? t : { default: t }
          }
          var o = r(n),
            s = {
              name: 'fr-ca',
              weekdays: 'dimanche_lundi_mardi_mercredi_jeudi_vendredi_samedi'.split('_'),
              months:
                'janvier_février_mars_avril_mai_juin_juillet_août_septembre_octobre_novembre_décembre'.split(
                  '_'
                ),
              weekdaysShort: 'dim._lun._mar._mer._jeu._ven._sam.'.split('_'),
              monthsShort: 'janv._févr._mars_avr._mai_juin_juil._août_sept._oct._nov._déc.'.split(
                '_'
              ),
              weekdaysMin: 'di_lu_ma_me_je_ve_sa'.split('_'),
              ordinal: function (t) {
                return t
              },
              formats: {
                LT: 'HH:mm',
                LTS: 'HH:mm:ss',
                L: 'YYYY-MM-DD',
                LL: 'D MMMM YYYY',
                LLL: 'D MMMM YYYY HH:mm',
                LLLL: 'dddd D MMMM YYYY HH:mm'
              },
              relativeTime: {
                future: 'dans %s',
                past: 'il y a %s',
                s: 'quelques secondes',
                m: 'une minute',
                mm: '%d minutes',
                h: 'une heure',
                hh: '%d heures',
                d: 'un jour',
                dd: '%d jours',
                M: 'un mois',
                MM: '%d mois',
                y: 'un an',
                yy: '%d ans'
              }
            }
          return (o.default.locale(s, null, !0), s)
        })
      })(Kr)),
    Kr.exports
  )
}
var ZM = F$()
const R$ = /* @__PURE__ */ F(ZM),
  I$ = /* @__PURE__ */ q(
    {
      __proto__: null,
      default: R$
    },
    [ZM]
  )
var Xr = { exports: {} },
  P$ = Xr.exports,
  E_
function B$() {
  return (
    E_ ||
      ((E_ = 1),
      (function (e, a) {
        ;(function (n, r) {
          e.exports = r(R())
        })(P$, function (n) {
          function r(t) {
            return t && typeof t == 'object' && 'default' in t ? t : { default: t }
          }
          var o = r(n),
            s = {
              name: 'fr-ch',
              weekdays: 'dimanche_lundi_mardi_mercredi_jeudi_vendredi_samedi'.split('_'),
              months:
                'janvier_février_mars_avril_mai_juin_juillet_août_septembre_octobre_novembre_décembre'.split(
                  '_'
                ),
              weekStart: 1,
              weekdaysShort: 'dim._lun._mar._mer._jeu._ven._sam.'.split('_'),
              monthsShort: 'janv._févr._mars_avr._mai_juin_juil._août_sept._oct._nov._déc.'.split(
                '_'
              ),
              weekdaysMin: 'di_lu_ma_me_je_ve_sa'.split('_'),
              ordinal: function (t) {
                return t
              },
              formats: {
                LT: 'HH:mm',
                LTS: 'HH:mm:ss',
                L: 'DD.MM.YYYY',
                LL: 'D MMMM YYYY',
                LLL: 'D MMMM YYYY HH:mm',
                LLLL: 'dddd D MMMM YYYY HH:mm'
              },
              relativeTime: {
                future: 'dans %s',
                past: 'il y a %s',
                s: 'quelques secondes',
                m: 'une minute',
                mm: '%d minutes',
                h: 'une heure',
                hh: '%d heures',
                d: 'un jour',
                dd: '%d jours',
                M: 'un mois',
                MM: '%d mois',
                y: 'un an',
                yy: '%d ans'
              }
            }
          return (o.default.locale(s, null, !0), s)
        })
      })(Xr)),
    Xr.exports
  )
}
var QM = B$()
const N$ = /* @__PURE__ */ F(QM),
  O$ = /* @__PURE__ */ q(
    {
      __proto__: null,
      default: N$
    },
    [QM]
  )
var Zr = { exports: {} },
  z$ = Zr.exports,
  T_
function G$() {
  return (
    T_ ||
      ((T_ = 1),
      (function (e, a) {
        ;(function (n, r) {
          e.exports = r(R())
        })(z$, function (n) {
          function r(t) {
            return t && typeof t == 'object' && 'default' in t ? t : { default: t }
          }
          var o = r(n),
            s = {
              name: 'fr',
              weekdays: 'dimanche_lundi_mardi_mercredi_jeudi_vendredi_samedi'.split('_'),
              weekdaysShort: 'dim._lun._mar._mer._jeu._ven._sam.'.split('_'),
              weekdaysMin: 'di_lu_ma_me_je_ve_sa'.split('_'),
              months:
                'janvier_février_mars_avril_mai_juin_juillet_août_septembre_octobre_novembre_décembre'.split(
                  '_'
                ),
              monthsShort: 'janv._févr._mars_avr._mai_juin_juil._août_sept._oct._nov._déc.'.split(
                '_'
              ),
              weekStart: 1,
              yearStart: 4,
              formats: {
                LT: 'HH:mm',
                LTS: 'HH:mm:ss',
                L: 'DD/MM/YYYY',
                LL: 'D MMMM YYYY',
                LLL: 'D MMMM YYYY HH:mm',
                LLLL: 'dddd D MMMM YYYY HH:mm'
              },
              relativeTime: {
                future: 'dans %s',
                past: 'il y a %s',
                s: 'quelques secondes',
                m: 'une minute',
                mm: '%d minutes',
                h: 'une heure',
                hh: '%d heures',
                d: 'un jour',
                dd: '%d jours',
                M: 'un mois',
                MM: '%d mois',
                y: 'un an',
                yy: '%d ans'
              },
              ordinal: function (t) {
                return '' + t + (t === 1 ? 'er' : '')
              }
            }
          return (o.default.locale(s, null, !0), s)
        })
      })(Zr)),
    Zr.exports
  )
}
var eb = G$()
const J$ = /* @__PURE__ */ F(eb),
  U$ = /* @__PURE__ */ q(
    {
      __proto__: null,
      default: J$
    },
    [eb]
  )
var Qr = { exports: {} },
  W$ = Qr.exports,
  $_
function V$() {
  return (
    $_ ||
      (($_ = 1),
      (function (e, a) {
        ;(function (n, r) {
          e.exports = r(R())
        })(W$, function (n) {
          function r(t) {
            return t && typeof t == 'object' && 'default' in t ? t : { default: t }
          }
          var o = r(n),
            s = {
              name: 'fy',
              weekdays: 'snein_moandei_tiisdei_woansdei_tongersdei_freed_sneon'.split('_'),
              months:
                'jannewaris_febrewaris_maart_april_maaie_juny_july_augustus_septimber_oktober_novimber_desimber'.split(
                  '_'
                ),
              monthsShort: 'jan._feb._mrt._apr._mai_jun._jul._aug._sep._okt._nov._des.'.split('_'),
              weekStart: 1,
              weekdaysShort: 'si._mo._ti._wo._to._fr._so.'.split('_'),
              weekdaysMin: 'Si_Mo_Ti_Wo_To_Fr_So'.split('_'),
              ordinal: function (t) {
                return t
              },
              formats: {
                LT: 'HH:mm',
                LTS: 'HH:mm:ss',
                L: 'DD-MM-YYYY',
                LL: 'D MMMM YYYY',
                LLL: 'D MMMM YYYY HH:mm',
                LLLL: 'dddd D MMMM YYYY HH:mm'
              },
              relativeTime: {
                future: 'oer %s',
                past: '%s lyn',
                s: 'in pear sekonden',
                m: 'ien minút',
                mm: '%d minuten',
                h: 'ien oere',
                hh: '%d oeren',
                d: 'ien dei',
                dd: '%d dagen',
                M: 'ien moanne',
                MM: '%d moannen',
                y: 'ien jier',
                yy: '%d jierren'
              }
            }
          return (o.default.locale(s, null, !0), s)
        })
      })(Qr)),
    Qr.exports
  )
}
var tb = V$()
const K$ = /* @__PURE__ */ F(tb),
  X$ = /* @__PURE__ */ q(
    {
      __proto__: null,
      default: K$
    },
    [tb]
  )
var en = { exports: {} },
  Z$ = en.exports,
  H_
function Q$() {
  return (
    H_ ||
      ((H_ = 1),
      (function (e, a) {
        ;(function (n, r) {
          e.exports = r(R())
        })(Z$, function (n) {
          function r(t) {
            return t && typeof t == 'object' && 'default' in t ? t : { default: t }
          }
          var o = r(n),
            s = {
              name: 'ga',
              weekdays:
                'Dé Domhnaigh_Dé Luain_Dé Máirt_Dé Céadaoin_Déardaoin_Dé hAoine_Dé Sathairn'.split(
                  '_'
                ),
              months:
                'Eanáir_Feabhra_Márta_Aibreán_Bealtaine_Meitheamh_Iúil_Lúnasa_Meán Fómhair_Deireadh Fómhair_Samhain_Nollaig'.split(
                  '_'
                ),
              weekStart: 1,
              weekdaysShort: 'Dom_Lua_Mái_Céa_Déa_Aoi_Sat'.split('_'),
              monthsShort: 'Ean_Fea_Már_Aib_Beal_Mei_Iúil_Lún_MFómh_DFómh_Samh_Noll'.split('_'),
              weekdaysMin: 'Do_Lu_Má_Cé_Dé_Ao_Sa'.split('_'),
              ordinal: function (t) {
                return t
              },
              formats: {
                LT: 'HH:mm',
                LTS: 'HH:mm:ss',
                L: 'DD/MM/YYYY',
                LL: 'D MMMM YYYY',
                LLL: 'D MMMM YYYY HH:mm',
                LLLL: 'dddd, D MMMM YYYY HH:mm'
              },
              relativeTime: {
                future: 'i %s',
                past: '%s ó shin',
                s: 'cúpla soicind',
                m: 'nóiméad',
                mm: '%d nóiméad',
                h: 'uair an chloig',
                hh: '%d uair an chloig',
                d: 'lá',
                dd: '%d lá',
                M: 'mí',
                MM: '%d mí',
                y: 'bliain',
                yy: '%d bliain'
              }
            }
          return (o.default.locale(s, null, !0), s)
        })
      })(en)),
    en.exports
  )
}
var rb = Q$()
const e6 = /* @__PURE__ */ F(rb),
  t6 = /* @__PURE__ */ q(
    {
      __proto__: null,
      default: e6
    },
    [rb]
  )
var tn = { exports: {} },
  r6 = tn.exports,
  j_
function n6() {
  return (
    j_ ||
      ((j_ = 1),
      (function (e, a) {
        ;(function (n, r) {
          e.exports = r(R())
        })(r6, function (n) {
          function r(t) {
            return t && typeof t == 'object' && 'default' in t ? t : { default: t }
          }
          var o = r(n),
            s = {
              name: 'gd',
              weekdays:
                'Didòmhnaich_Diluain_Dimàirt_Diciadain_Diardaoin_Dihaoine_Disathairne'.split('_'),
              months:
                'Am Faoilleach_An Gearran_Am Màrt_An Giblean_An Cèitean_An t-Ògmhios_An t-Iuchar_An Lùnastal_An t-Sultain_An Dàmhair_An t-Samhain_An Dùbhlachd'.split(
                  '_'
                ),
              weekStart: 1,
              weekdaysShort: 'Did_Dil_Dim_Dic_Dia_Dih_Dis'.split('_'),
              monthsShort: 'Faoi_Gear_Màrt_Gibl_Cèit_Ògmh_Iuch_Lùn_Sult_Dàmh_Samh_Dùbh'.split('_'),
              weekdaysMin: 'Dò_Lu_Mà_Ci_Ar_Ha_Sa'.split('_'),
              ordinal: function (t) {
                return t
              },
              formats: {
                LT: 'HH:mm',
                LTS: 'HH:mm:ss',
                L: 'DD/MM/YYYY',
                LL: 'D MMMM YYYY',
                LLL: 'D MMMM YYYY HH:mm',
                LLLL: 'dddd, D MMMM YYYY HH:mm'
              },
              relativeTime: {
                future: 'ann an %s',
                past: 'bho chionn %s',
                s: 'beagan diogan',
                m: 'mionaid',
                mm: '%d mionaidean',
                h: 'uair',
                hh: '%d uairean',
                d: 'latha',
                dd: '%d latha',
                M: 'mìos',
                MM: '%d mìosan',
                y: 'bliadhna',
                yy: '%d bliadhna'
              }
            }
          return (o.default.locale(s, null, !0), s)
        })
      })(tn)),
    tn.exports
  )
}
var nb = n6()
const a6 = /* @__PURE__ */ F(nb),
  o6 = /* @__PURE__ */ q(
    {
      __proto__: null,
      default: a6
    },
    [nb]
  )
var rn = { exports: {} },
  s6 = rn.exports,
  C_
function i6() {
  return (
    C_ ||
      ((C_ = 1),
      (function (e, a) {
        ;(function (n, r) {
          e.exports = r(R())
        })(s6, function (n) {
          function r(t) {
            return t && typeof t == 'object' && 'default' in t ? t : { default: t }
          }
          var o = r(n),
            s = {
              name: 'gl',
              weekdays: 'domingo_luns_martes_mércores_xoves_venres_sábado'.split('_'),
              months:
                'xaneiro_febreiro_marzo_abril_maio_xuño_xullo_agosto_setembro_outubro_novembro_decembro'.split(
                  '_'
                ),
              weekStart: 1,
              weekdaysShort: 'dom._lun._mar._mér._xov._ven._sáb.'.split('_'),
              monthsShort: 'xan._feb._mar._abr._mai._xuñ._xul._ago._set._out._nov._dec.'.split('_'),
              weekdaysMin: 'do_lu_ma_mé_xo_ve_sá'.split('_'),
              ordinal: function (t) {
                return t + 'º'
              },
              formats: {
                LT: 'H:mm',
                LTS: 'H:mm:ss',
                L: 'DD/MM/YYYY',
                LL: 'D [de] MMMM [de] YYYY',
                LLL: 'D [de] MMMM [de] YYYY H:mm',
                LLLL: 'dddd, D [de] MMMM [de] YYYY H:mm'
              },
              relativeTime: {
                future: 'en %s',
                past: 'fai %s',
                s: 'uns segundos',
                m: 'un minuto',
                mm: '%d minutos',
                h: 'unha hora',
                hh: '%d horas',
                d: 'un día',
                dd: '%d días',
                M: 'un mes',
                MM: '%d meses',
                y: 'un ano',
                yy: '%d anos'
              }
            }
          return (o.default.locale(s, null, !0), s)
        })
      })(rn)),
    rn.exports
  )
}
var ab = i6()
const u6 = /* @__PURE__ */ F(ab),
  l6 = /* @__PURE__ */ q(
    {
      __proto__: null,
      default: u6
    },
    [ab]
  )
var nn = { exports: {} },
  d6 = nn.exports,
  A_
function c6() {
  return (
    A_ ||
      ((A_ = 1),
      (function (e, a) {
        ;(function (n, r) {
          e.exports = r(R())
        })(d6, function (n) {
          function r(t) {
            return t && typeof t == 'object' && 'default' in t ? t : { default: t }
          }
          var o = r(n),
            s = {
              name: 'gom-latn',
              weekdays: "Aitar_Somar_Mongllar_Budvar_Brestar_Sukrar_Son'var".split('_'),
              months:
                'Janer_Febrer_Mars_Abril_Mai_Jun_Julai_Agost_Setembr_Otubr_Novembr_Dezembr'.split(
                  '_'
                ),
              weekStart: 1,
              weekdaysShort: 'Ait._Som._Mon._Bud._Bre._Suk._Son.'.split('_'),
              monthsShort: 'Jan._Feb._Mars_Abr._Mai_Jun_Jul._Ago._Set._Otu._Nov._Dez.'.split('_'),
              weekdaysMin: 'Ai_Sm_Mo_Bu_Br_Su_Sn'.split('_'),
              ordinal: function (t) {
                return t
              },
              formats: {
                LT: 'A h:mm [vazta]',
                LTS: 'A h:mm:ss [vazta]',
                L: 'DD-MM-YYYY',
                LL: 'D MMMM YYYY',
                LLL: 'D MMMM YYYY A h:mm [vazta]',
                LLLL: 'dddd, MMMM[achea] Do, YYYY, A h:mm [vazta]',
                llll: 'ddd, D MMM YYYY, A h:mm [vazta]'
              }
            }
          return (o.default.locale(s, null, !0), s)
        })
      })(nn)),
    nn.exports
  )
}
var ob = c6()
const _6 = /* @__PURE__ */ F(ob),
  f6 = /* @__PURE__ */ q(
    {
      __proto__: null,
      default: _6
    },
    [ob]
  )
var an = { exports: {} },
  m6 = an.exports,
  q_
function p6() {
  return (
    q_ ||
      ((q_ = 1),
      (function (e, a) {
        ;(function (n, r) {
          e.exports = r(R())
        })(m6, function (n) {
          function r(t) {
            return t && typeof t == 'object' && 'default' in t ? t : { default: t }
          }
          var o = r(n),
            s = {
              name: 'gu',
              weekdays: 'રવિવાર_સોમવાર_મંગળવાર_બુધ્વાર_ગુરુવાર_શુક્રવાર_શનિવાર'.split('_'),
              months:
                'જાન્યુઆરી_ફેબ્રુઆરી_માર્ચ_એપ્રિલ_મે_જૂન_જુલાઈ_ઑગસ્ટ_સપ્ટેમ્બર_ઑક્ટ્બર_નવેમ્બર_ડિસેમ્બર'.split(
                  '_'
                ),
              weekdaysShort: 'રવિ_સોમ_મંગળ_બુધ્_ગુરુ_શુક્ર_શનિ'.split('_'),
              monthsShort:
                'જાન્યુ._ફેબ્રુ._માર્ચ_એપ્રિ._મે_જૂન_જુલા._ઑગ._સપ્ટે._ઑક્ટ્._નવે._ડિસે.'.split('_'),
              weekdaysMin: 'ર_સો_મં_બુ_ગુ_શુ_શ'.split('_'),
              ordinal: function (t) {
                return t
              },
              formats: {
                LT: 'A h:mm વાગ્યે',
                LTS: 'A h:mm:ss વાગ્યે',
                L: 'DD/MM/YYYY',
                LL: 'D MMMM YYYY',
                LLL: 'D MMMM YYYY, A h:mm વાગ્યે',
                LLLL: 'dddd, D MMMM YYYY, A h:mm વાગ્યે'
              },
              relativeTime: {
                future: '%s મા',
                past: '%s પેહલા',
                s: 'અમુક પળો',
                m: 'એક મિનિટ',
                mm: '%d મિનિટ',
                h: 'એક કલાક',
                hh: '%d કલાક',
                d: 'એક દિવસ',
                dd: '%d દિવસ',
                M: 'એક મહિનો',
                MM: '%d મહિનો',
                y: 'એક વર્ષ',
                yy: '%d વર્ષ'
              }
            }
          return (o.default.locale(s, null, !0), s)
        })
      })(an)),
    an.exports
  )
}
var sb = p6()
const h6 = /* @__PURE__ */ F(sb),
  v6 = /* @__PURE__ */ q(
    {
      __proto__: null,
      default: h6
    },
    [sb]
  )
var on = { exports: {} },
  y6 = on.exports,
  F_
function g6() {
  return (
    F_ ||
      ((F_ = 1),
      (function (e, a) {
        ;(function (n, r) {
          e.exports = r(R())
        })(y6, function (n) {
          function r(u) {
            return u && typeof u == 'object' && 'default' in u ? u : { default: u }
          }
          var o = r(n),
            s = {
              s: 'מספר שניות',
              ss: '%d שניות',
              m: 'דקה',
              mm: '%d דקות',
              h: 'שעה',
              hh: '%d שעות',
              hh2: 'שעתיים',
              d: 'יום',
              dd: '%d ימים',
              dd2: 'יומיים',
              M: 'חודש',
              MM: '%d חודשים',
              MM2: 'חודשיים',
              y: 'שנה',
              yy: '%d שנים',
              yy2: 'שנתיים'
            }
          function t(u, l, d) {
            return (s[d + (u === 2 ? '2' : '')] || s[d]).replace('%d', u)
          }
          var i = {
            name: 'he',
            weekdays: 'ראשון_שני_שלישי_רביעי_חמישי_שישי_שבת'.split('_'),
            weekdaysShort: 'א׳_ב׳_ג׳_ד׳_ה׳_ו׳_ש׳'.split('_'),
            weekdaysMin: 'א׳_ב׳_ג׳_ד׳_ה׳_ו_ש׳'.split('_'),
            months: 'ינואר_פברואר_מרץ_אפריל_מאי_יוני_יולי_אוגוסט_ספטמבר_אוקטובר_נובמבר_דצמבר'.split(
              '_'
            ),
            monthsShort: 'ינו_פבר_מרץ_אפר_מאי_יונ_יול_אוג_ספט_אוק_נוב_דצמ'.split('_'),
            relativeTime: {
              future: 'בעוד %s',
              past: 'לפני %s',
              s: t,
              m: t,
              mm: t,
              h: t,
              hh: t,
              d: t,
              dd: t,
              M: t,
              MM: t,
              y: t,
              yy: t
            },
            ordinal: function (u) {
              return u
            },
            format: {
              LT: 'HH:mm',
              LTS: 'HH:mm:ss',
              L: 'DD/MM/YYYY',
              LL: 'D [ב]MMMM YYYY',
              LLL: 'D [ב]MMMM YYYY HH:mm',
              LLLL: 'dddd, D [ב]MMMM YYYY HH:mm',
              l: 'D/M/YYYY',
              ll: 'D MMM YYYY',
              lll: 'D MMM YYYY HH:mm',
              llll: 'ddd, D MMM YYYY HH:mm'
            },
            formats: {
              LT: 'HH:mm',
              LTS: 'HH:mm:ss',
              L: 'DD/MM/YYYY',
              LL: 'D [ב]MMMM YYYY',
              LLL: 'D [ב]MMMM YYYY HH:mm',
              LLLL: 'dddd, D [ב]MMMM YYYY HH:mm',
              l: 'D/M/YYYY',
              ll: 'D MMM YYYY',
              lll: 'D MMM YYYY HH:mm',
              llll: 'ddd, D MMM YYYY HH:mm'
            }
          }
          return (o.default.locale(i, null, !0), i)
        })
      })(on)),
    on.exports
  )
}
var ib = g6()
const M6 = /* @__PURE__ */ F(ib),
  b6 = /* @__PURE__ */ q(
    {
      __proto__: null,
      default: M6
    },
    [ib]
  )
var sn = { exports: {} },
  Y6 = sn.exports,
  R_
function w6() {
  return (
    R_ ||
      ((R_ = 1),
      (function (e, a) {
        ;(function (n, r) {
          e.exports = r(R())
        })(Y6, function (n) {
          function r(t) {
            return t && typeof t == 'object' && 'default' in t ? t : { default: t }
          }
          var o = r(n),
            s = {
              name: 'hi',
              weekdays: 'रविवार_सोमवार_मंगलवार_बुधवार_गुरूवार_शुक्रवार_शनिवार'.split('_'),
              months:
                'जनवरी_फ़रवरी_मार्च_अप्रैल_मई_जून_जुलाई_अगस्त_सितम्बर_अक्टूबर_नवम्बर_दिसम्बर'.split(
                  '_'
                ),
              weekdaysShort: 'रवि_सोम_मंगल_बुध_गुरू_शुक्र_शनि'.split('_'),
              monthsShort: 'जन._फ़र._मार्च_अप्रै._मई_जून_जुल._अग._सित._अक्टू._नव._दिस.'.split('_'),
              weekdaysMin: 'र_सो_मं_बु_गु_शु_श'.split('_'),
              ordinal: function (t) {
                return t
              },
              formats: {
                LT: 'A h:mm बजे',
                LTS: 'A h:mm:ss बजे',
                L: 'DD/MM/YYYY',
                LL: 'D MMMM YYYY',
                LLL: 'D MMMM YYYY, A h:mm बजे',
                LLLL: 'dddd, D MMMM YYYY, A h:mm बजे'
              },
              relativeTime: {
                future: '%s में',
                past: '%s पहले',
                s: 'कुछ ही क्षण',
                m: 'एक मिनट',
                mm: '%d मिनट',
                h: 'एक घंटा',
                hh: '%d घंटे',
                d: 'एक दिन',
                dd: '%d दिन',
                M: 'एक महीने',
                MM: '%d महीने',
                y: 'एक वर्ष',
                yy: '%d वर्ष'
              }
            }
          return (o.default.locale(s, null, !0), s)
        })
      })(sn)),
    sn.exports
  )
}
var ub = w6()
const x6 = /* @__PURE__ */ F(ub),
  L6 = /* @__PURE__ */ q(
    {
      __proto__: null,
      default: x6
    },
    [ub]
  )
var un = { exports: {} },
  k6 = un.exports,
  I_
function S6() {
  return (
    I_ ||
      ((I_ = 1),
      (function (e, a) {
        ;(function (n, r) {
          e.exports = r(R())
        })(k6, function (n) {
          function r(d) {
            return d && typeof d == 'object' && 'default' in d ? d : { default: d }
          }
          var o = r(n),
            s =
              'siječnja_veljače_ožujka_travnja_svibnja_lipnja_srpnja_kolovoza_rujna_listopada_studenoga_prosinca'.split(
                '_'
              ),
            t =
              'siječanj_veljača_ožujak_travanj_svibanj_lipanj_srpanj_kolovoz_rujan_listopad_studeni_prosinac'.split(
                '_'
              ),
            i = /D[oD]?(\[[^[\]]*\]|\s)+MMMM?/,
            u = function (d, c) {
              return i.test(c) ? s[d.month()] : t[d.month()]
            }
          ;((u.s = t), (u.f = s))
          var l = {
            name: 'hr',
            weekdays: 'nedjelja_ponedjeljak_utorak_srijeda_četvrtak_petak_subota'.split('_'),
            weekdaysShort: 'ned._pon._uto._sri._čet._pet._sub.'.split('_'),
            weekdaysMin: 'ne_po_ut_sr_če_pe_su'.split('_'),
            months: u,
            monthsShort: 'sij._velj._ožu._tra._svi._lip._srp._kol._ruj._lis._stu._pro.'.split('_'),
            weekStart: 1,
            formats: {
              LT: 'H:mm',
              LTS: 'H:mm:ss',
              L: 'DD.MM.YYYY',
              LL: 'D. MMMM YYYY',
              LLL: 'D. MMMM YYYY H:mm',
              LLLL: 'dddd, D. MMMM YYYY H:mm'
            },
            relativeTime: {
              future: 'za %s',
              past: 'prije %s',
              s: 'sekunda',
              m: 'minuta',
              mm: '%d minuta',
              h: 'sat',
              hh: '%d sati',
              d: 'dan',
              dd: '%d dana',
              M: 'mjesec',
              MM: '%d mjeseci',
              y: 'godina',
              yy: '%d godine'
            },
            ordinal: function (d) {
              return d + '.'
            }
          }
          return (o.default.locale(l, null, !0), l)
        })
      })(un)),
    un.exports
  )
}
var lb = S6()
const D6 = /* @__PURE__ */ F(lb),
  E6 = /* @__PURE__ */ q(
    {
      __proto__: null,
      default: D6
    },
    [lb]
  )
var ln = { exports: {} },
  T6 = ln.exports,
  P_
function $6() {
  return (
    P_ ||
      ((P_ = 1),
      (function (e, a) {
        ;(function (n, r) {
          e.exports = r(R())
        })(T6, function (n) {
          function r(t) {
            return t && typeof t == 'object' && 'default' in t ? t : { default: t }
          }
          var o = r(n),
            s = {
              name: 'ht',
              weekdays: 'dimanch_lendi_madi_mèkredi_jedi_vandredi_samdi'.split('_'),
              months: 'janvye_fevriye_mas_avril_me_jen_jiyè_out_septanm_oktòb_novanm_desanm'.split(
                '_'
              ),
              weekdaysShort: 'dim._len._mad._mèk._jed._van._sam.'.split('_'),
              monthsShort: 'jan._fev._mas_avr._me_jen_jiyè._out_sept._okt._nov._des.'.split('_'),
              weekdaysMin: 'di_le_ma_mè_je_va_sa'.split('_'),
              ordinal: function (t) {
                return t
              },
              formats: {
                LT: 'HH:mm',
                LTS: 'HH:mm:ss',
                L: 'DD/MM/YYYY',
                LL: 'D MMMM YYYY',
                LLL: 'D MMMM YYYY HH:mm',
                LLLL: 'dddd D MMMM YYYY HH:mm'
              },
              relativeTime: {
                future: 'nan %s',
                past: 'sa gen %s',
                s: 'kèk segond',
                m: 'yon minit',
                mm: '%d minit',
                h: 'inèdtan',
                hh: '%d zè',
                d: 'yon jou',
                dd: '%d jou',
                M: 'yon mwa',
                MM: '%d mwa',
                y: 'yon ane',
                yy: '%d ane'
              }
            }
          return (o.default.locale(s, null, !0), s)
        })
      })(ln)),
    ln.exports
  )
}
var db = $6()
const H6 = /* @__PURE__ */ F(db),
  j6 = /* @__PURE__ */ q(
    {
      __proto__: null,
      default: H6
    },
    [db]
  )
var dn = { exports: {} },
  C6 = dn.exports,
  B_
function A6() {
  return (
    B_ ||
      ((B_ = 1),
      (function (e, a) {
        ;(function (n, r) {
          e.exports = r(R())
        })(C6, function (n) {
          function r(t) {
            return t && typeof t == 'object' && 'default' in t ? t : { default: t }
          }
          var o = r(n),
            s = {
              name: 'hu',
              weekdays: 'vasárnap_hétfő_kedd_szerda_csütörtök_péntek_szombat'.split('_'),
              weekdaysShort: 'vas_hét_kedd_sze_csüt_pén_szo'.split('_'),
              weekdaysMin: 'v_h_k_sze_cs_p_szo'.split('_'),
              months:
                'január_február_március_április_május_június_július_augusztus_szeptember_október_november_december'.split(
                  '_'
                ),
              monthsShort: 'jan_feb_márc_ápr_máj_jún_júl_aug_szept_okt_nov_dec'.split('_'),
              ordinal: function (t) {
                return t + '.'
              },
              weekStart: 1,
              relativeTime: {
                future: '%s múlva',
                past: '%s',
                s: function (t, i, u, l) {
                  return 'néhány másodperc' + (l || i ? '' : 'e')
                },
                m: function (t, i, u, l) {
                  return 'egy perc' + (l || i ? '' : 'e')
                },
                mm: function (t, i, u, l) {
                  return t + ' perc' + (l || i ? '' : 'e')
                },
                h: function (t, i, u, l) {
                  return 'egy ' + (l || i ? 'óra' : 'órája')
                },
                hh: function (t, i, u, l) {
                  return t + ' ' + (l || i ? 'óra' : 'órája')
                },
                d: function (t, i, u, l) {
                  return 'egy ' + (l || i ? 'nap' : 'napja')
                },
                dd: function (t, i, u, l) {
                  return t + ' ' + (l || i ? 'nap' : 'napja')
                },
                M: function (t, i, u, l) {
                  return 'egy ' + (l || i ? 'hónap' : 'hónapja')
                },
                MM: function (t, i, u, l) {
                  return t + ' ' + (l || i ? 'hónap' : 'hónapja')
                },
                y: function (t, i, u, l) {
                  return 'egy ' + (l || i ? 'év' : 'éve')
                },
                yy: function (t, i, u, l) {
                  return t + ' ' + (l || i ? 'év' : 'éve')
                }
              },
              formats: {
                LT: 'H:mm',
                LTS: 'H:mm:ss',
                L: 'YYYY.MM.DD.',
                LL: 'YYYY. MMMM D.',
                LLL: 'YYYY. MMMM D. H:mm',
                LLLL: 'YYYY. MMMM D., dddd H:mm'
              }
            }
          return (o.default.locale(s, null, !0), s)
        })
      })(dn)),
    dn.exports
  )
}
var cb = A6()
const q6 = /* @__PURE__ */ F(cb),
  F6 = /* @__PURE__ */ q(
    {
      __proto__: null,
      default: q6
    },
    [cb]
  )
var cn = { exports: {} },
  R6 = cn.exports,
  N_
function I6() {
  return (
    N_ ||
      ((N_ = 1),
      (function (e, a) {
        ;(function (n, r) {
          e.exports = r(R())
        })(R6, function (n) {
          function r(t) {
            return t && typeof t == 'object' && 'default' in t ? t : { default: t }
          }
          var o = r(n),
            s = {
              name: 'hy-am',
              weekdays: 'կիրակի_երկուշաբթի_երեքշաբթի_չորեքշաբթի_հինգշաբթի_ուրբաթ_շաբաթ'.split('_'),
              months:
                'հունվարի_փետրվարի_մարտի_ապրիլի_մայիսի_հունիսի_հուլիսի_օգոստոսի_սեպտեմբերի_հոկտեմբերի_նոյեմբերի_դեկտեմբերի'.split(
                  '_'
                ),
              weekStart: 1,
              weekdaysShort: 'կրկ_երկ_երք_չրք_հնգ_ուրբ_շբթ'.split('_'),
              monthsShort: 'հնվ_փտր_մրտ_ապր_մյս_հնս_հլս_օգս_սպտ_հկտ_նմբ_դկտ'.split('_'),
              weekdaysMin: 'կրկ_երկ_երք_չրք_հնգ_ուրբ_շբթ'.split('_'),
              ordinal: function (t) {
                return t
              },
              formats: {
                LT: 'HH:mm',
                LTS: 'HH:mm:ss',
                L: 'DD.MM.YYYY',
                LL: 'D MMMM YYYY թ.',
                LLL: 'D MMMM YYYY թ., HH:mm',
                LLLL: 'dddd, D MMMM YYYY թ., HH:mm'
              },
              relativeTime: {
                future: '%s հետո',
                past: '%s առաջ',
                s: 'մի քանի վայրկյան',
                m: 'րոպե',
                mm: '%d րոպե',
                h: 'ժամ',
                hh: '%d ժամ',
                d: 'օր',
                dd: '%d օր',
                M: 'ամիս',
                MM: '%d ամիս',
                y: 'տարի',
                yy: '%d տարի'
              }
            }
          return (o.default.locale(s, null, !0), s)
        })
      })(cn)),
    cn.exports
  )
}
var _b = I6()
const P6 = /* @__PURE__ */ F(_b),
  B6 = /* @__PURE__ */ q(
    {
      __proto__: null,
      default: P6
    },
    [_b]
  )
var _n = { exports: {} },
  N6 = _n.exports,
  O_
function O6() {
  return (
    O_ ||
      ((O_ = 1),
      (function (e, a) {
        ;(function (n, r) {
          e.exports = r(R())
        })(N6, function (n) {
          function r(t) {
            return t && typeof t == 'object' && 'default' in t ? t : { default: t }
          }
          var o = r(n),
            s = {
              name: 'id',
              weekdays: 'Minggu_Senin_Selasa_Rabu_Kamis_Jumat_Sabtu'.split('_'),
              months:
                'Januari_Februari_Maret_April_Mei_Juni_Juli_Agustus_September_Oktober_November_Desember'.split(
                  '_'
                ),
              weekdaysShort: 'Min_Sen_Sel_Rab_Kam_Jum_Sab'.split('_'),
              monthsShort: 'Jan_Feb_Mar_Apr_Mei_Jun_Jul_Agt_Sep_Okt_Nov_Des'.split('_'),
              weekdaysMin: 'Mg_Sn_Sl_Rb_Km_Jm_Sb'.split('_'),
              weekStart: 1,
              formats: {
                LT: 'HH.mm',
                LTS: 'HH.mm.ss',
                L: 'DD/MM/YYYY',
                LL: 'D MMMM YYYY',
                LLL: 'D MMMM YYYY [pukul] HH.mm',
                LLLL: 'dddd, D MMMM YYYY [pukul] HH.mm'
              },
              relativeTime: {
                future: 'dalam %s',
                past: '%s yang lalu',
                s: 'beberapa detik',
                m: 'semenit',
                mm: '%d menit',
                h: 'sejam',
                hh: '%d jam',
                d: 'sehari',
                dd: '%d hari',
                M: 'sebulan',
                MM: '%d bulan',
                y: 'setahun',
                yy: '%d tahun'
              },
              ordinal: function (t) {
                return t + '.'
              }
            }
          return (o.default.locale(s, null, !0), s)
        })
      })(_n)),
    _n.exports
  )
}
var fb = O6()
const z6 = /* @__PURE__ */ F(fb),
  G6 = /* @__PURE__ */ q(
    {
      __proto__: null,
      default: z6
    },
    [fb]
  )
var fn = { exports: {} },
  J6 = fn.exports,
  z_
function U6() {
  return (
    z_ ||
      ((z_ = 1),
      (function (e, a) {
        ;(function (n, r) {
          e.exports = r(R())
        })(J6, function (n) {
          function r(u) {
            return u && typeof u == 'object' && 'default' in u ? u : { default: u }
          }
          var o = r(n),
            s = {
              s: ['nokkrar sekúndur', 'nokkrar sekúndur', 'nokkrum sekúndum'],
              m: ['mínúta', 'mínútu', 'mínútu'],
              mm: ['mínútur', 'mínútur', 'mínútum'],
              h: ['klukkustund', 'klukkustund', 'klukkustund'],
              hh: ['klukkustundir', 'klukkustundir', 'klukkustundum'],
              d: ['dagur', 'dag', 'degi'],
              dd: ['dagar', 'daga', 'dögum'],
              M: ['mánuður', 'mánuð', 'mánuði'],
              MM: ['mánuðir', 'mánuði', 'mánuðum'],
              y: ['ár', 'ár', 'ári'],
              yy: ['ár', 'ár', 'árum']
            }
          function t(u, l, d, c) {
            var _ = (function (f, m, h, y) {
              var p = y ? 0 : h ? 1 : 2,
                v = f.length === 2 && m % 10 == 1 ? f[0] : f,
                g = s[v][p]
              return f.length === 1 ? g : '%d ' + g
            })(d, u, c, l)
            return _.replace('%d', u)
          }
          var i = {
            name: 'is',
            weekdays:
              'sunnudagur_mánudagur_þriðjudagur_miðvikudagur_fimmtudagur_föstudagur_laugardagur'.split(
                '_'
              ),
            months:
              'janúar_febrúar_mars_apríl_maí_júní_júlí_ágúst_september_október_nóvember_desember'.split(
                '_'
              ),
            weekStart: 1,
            weekdaysShort: 'sun_mán_þri_mið_fim_fös_lau'.split('_'),
            monthsShort: 'jan_feb_mar_apr_maí_jún_júl_ágú_sep_okt_nóv_des'.split('_'),
            weekdaysMin: 'Su_Má_Þr_Mi_Fi_Fö_La'.split('_'),
            ordinal: function (u) {
              return u
            },
            formats: {
              LT: 'H:mm',
              LTS: 'H:mm:ss',
              L: 'DD.MM.YYYY',
              LL: 'D. MMMM YYYY',
              LLL: 'D. MMMM YYYY [kl.] H:mm',
              LLLL: 'dddd, D. MMMM YYYY [kl.] H:mm'
            },
            relativeTime: {
              future: 'eftir %s',
              past: 'fyrir %s síðan',
              s: t,
              m: t,
              mm: t,
              h: t,
              hh: t,
              d: t,
              dd: t,
              M: t,
              MM: t,
              y: t,
              yy: t
            }
          }
          return (o.default.locale(i, null, !0), i)
        })
      })(fn)),
    fn.exports
  )
}
var mb = U6()
const W6 = /* @__PURE__ */ F(mb),
  V6 = /* @__PURE__ */ q(
    {
      __proto__: null,
      default: W6
    },
    [mb]
  )
var mn = { exports: {} },
  K6 = mn.exports,
  G_
function X6() {
  return (
    G_ ||
      ((G_ = 1),
      (function (e, a) {
        ;(function (n, r) {
          e.exports = r(R())
        })(K6, function (n) {
          function r(t) {
            return t && typeof t == 'object' && 'default' in t ? t : { default: t }
          }
          var o = r(n),
            s = {
              name: 'it-ch',
              weekdays: 'domenica_lunedì_martedì_mercoledì_giovedì_venerdì_sabato'.split('_'),
              months:
                'gennaio_febbraio_marzo_aprile_maggio_giugno_luglio_agosto_settembre_ottobre_novembre_dicembre'.split(
                  '_'
                ),
              weekStart: 1,
              weekdaysShort: 'dom_lun_mar_mer_gio_ven_sab'.split('_'),
              monthsShort: 'gen_feb_mar_apr_mag_giu_lug_ago_set_ott_nov_dic'.split('_'),
              weekdaysMin: 'do_lu_ma_me_gi_ve_sa'.split('_'),
              ordinal: function (t) {
                return t
              },
              formats: {
                LT: 'HH:mm',
                LTS: 'HH:mm:ss',
                L: 'DD.MM.YYYY',
                LL: 'D MMMM YYYY',
                LLL: 'D MMMM YYYY HH:mm',
                LLLL: 'dddd D MMMM YYYY HH:mm'
              },
              relativeTime: {
                future: 'tra %s',
                past: '%s fa',
                s: 'alcuni secondi',
                m: 'un minuto',
                mm: '%d minuti',
                h: "un'ora",
                hh: '%d ore',
                d: 'un giorno',
                dd: '%d giorni',
                M: 'un mese',
                MM: '%d mesi',
                y: 'un anno',
                yy: '%d anni'
              }
            }
          return (o.default.locale(s, null, !0), s)
        })
      })(mn)),
    mn.exports
  )
}
var pb = X6()
const Z6 = /* @__PURE__ */ F(pb),
  Q6 = /* @__PURE__ */ q(
    {
      __proto__: null,
      default: Z6
    },
    [pb]
  )
var pn = { exports: {} },
  eH = pn.exports,
  J_
function tH() {
  return (
    J_ ||
      ((J_ = 1),
      (function (e, a) {
        ;(function (n, r) {
          e.exports = r(R())
        })(eH, function (n) {
          function r(t) {
            return t && typeof t == 'object' && 'default' in t ? t : { default: t }
          }
          var o = r(n),
            s = {
              name: 'it',
              weekdays: 'domenica_lunedì_martedì_mercoledì_giovedì_venerdì_sabato'.split('_'),
              weekdaysShort: 'dom_lun_mar_mer_gio_ven_sab'.split('_'),
              weekdaysMin: 'do_lu_ma_me_gi_ve_sa'.split('_'),
              months:
                'gennaio_febbraio_marzo_aprile_maggio_giugno_luglio_agosto_settembre_ottobre_novembre_dicembre'.split(
                  '_'
                ),
              weekStart: 1,
              monthsShort: 'gen_feb_mar_apr_mag_giu_lug_ago_set_ott_nov_dic'.split('_'),
              formats: {
                LT: 'HH:mm',
                LTS: 'HH:mm:ss',
                L: 'DD/MM/YYYY',
                LL: 'D MMMM YYYY',
                LLL: 'D MMMM YYYY HH:mm',
                LLLL: 'dddd D MMMM YYYY HH:mm'
              },
              relativeTime: {
                future: 'tra %s',
                past: '%s fa',
                s: 'qualche secondo',
                m: 'un minuto',
                mm: '%d minuti',
                h: "un'ora",
                hh: '%d ore',
                d: 'un giorno',
                dd: '%d giorni',
                M: 'un mese',
                MM: '%d mesi',
                y: 'un anno',
                yy: '%d anni'
              },
              ordinal: function (t) {
                return t + 'º'
              }
            }
          return (o.default.locale(s, null, !0), s)
        })
      })(pn)),
    pn.exports
  )
}
var hb = tH()
const rH = /* @__PURE__ */ F(hb),
  nH = /* @__PURE__ */ q(
    {
      __proto__: null,
      default: rH
    },
    [hb]
  )
var hn = { exports: {} },
  aH = hn.exports,
  U_
function oH() {
  return (
    U_ ||
      ((U_ = 1),
      (function (e, a) {
        ;(function (n, r) {
          e.exports = r(R())
        })(aH, function (n) {
          function r(t) {
            return t && typeof t == 'object' && 'default' in t ? t : { default: t }
          }
          var o = r(n),
            s = {
              name: 'ja',
              weekdays: '日曜日_月曜日_火曜日_水曜日_木曜日_金曜日_土曜日'.split('_'),
              weekdaysShort: '日_月_火_水_木_金_土'.split('_'),
              weekdaysMin: '日_月_火_水_木_金_土'.split('_'),
              months: '1月_2月_3月_4月_5月_6月_7月_8月_9月_10月_11月_12月'.split('_'),
              monthsShort: '1月_2月_3月_4月_5月_6月_7月_8月_9月_10月_11月_12月'.split('_'),
              ordinal: function (t) {
                return t + '日'
              },
              formats: {
                LT: 'HH:mm',
                LTS: 'HH:mm:ss',
                L: 'YYYY/MM/DD',
                LL: 'YYYY年M月D日',
                LLL: 'YYYY年M月D日 HH:mm',
                LLLL: 'YYYY年M月D日 dddd HH:mm',
                l: 'YYYY/MM/DD',
                ll: 'YYYY年M月D日',
                lll: 'YYYY年M月D日 HH:mm',
                llll: 'YYYY年M月D日(ddd) HH:mm'
              },
              meridiem: function (t) {
                return t < 12 ? '午前' : '午後'
              },
              relativeTime: {
                future: '%s後',
                past: '%s前',
                s: '数秒',
                m: '1分',
                mm: '%d分',
                h: '1時間',
                hh: '%d時間',
                d: '1日',
                dd: '%d日',
                M: '1ヶ月',
                MM: '%dヶ月',
                y: '1年',
                yy: '%d年'
              }
            }
          return (o.default.locale(s, null, !0), s)
        })
      })(hn)),
    hn.exports
  )
}
var vb = oH()
const sH = /* @__PURE__ */ F(vb),
  iH = /* @__PURE__ */ q(
    {
      __proto__: null,
      default: sH
    },
    [vb]
  )
var vn = { exports: {} },
  uH = vn.exports,
  W_
function lH() {
  return (
    W_ ||
      ((W_ = 1),
      (function (e, a) {
        ;(function (n, r) {
          e.exports = r(R())
        })(uH, function (n) {
          function r(t) {
            return t && typeof t == 'object' && 'default' in t ? t : { default: t }
          }
          var o = r(n),
            s = {
              name: 'jv',
              weekdays: 'Minggu_Senen_Seloso_Rebu_Kemis_Jemuwah_Septu'.split('_'),
              months:
                'Januari_Februari_Maret_April_Mei_Juni_Juli_Agustus_September_Oktober_Nopember_Desember'.split(
                  '_'
                ),
              weekStart: 1,
              weekdaysShort: 'Min_Sen_Sel_Reb_Kem_Jem_Sep'.split('_'),
              monthsShort: 'Jan_Feb_Mar_Apr_Mei_Jun_Jul_Ags_Sep_Okt_Nop_Des'.split('_'),
              weekdaysMin: 'Mg_Sn_Sl_Rb_Km_Jm_Sp'.split('_'),
              ordinal: function (t) {
                return t
              },
              formats: {
                LT: 'HH.mm',
                LTS: 'HH.mm.ss',
                L: 'DD/MM/YYYY',
                LL: 'D MMMM YYYY',
                LLL: 'D MMMM YYYY [pukul] HH.mm',
                LLLL: 'dddd, D MMMM YYYY [pukul] HH.mm'
              },
              relativeTime: {
                future: 'wonten ing %s',
                past: '%s ingkang kepengker',
                s: 'sawetawis detik',
                m: 'setunggal menit',
                mm: '%d menit',
                h: 'setunggal jam',
                hh: '%d jam',
                d: 'sedinten',
                dd: '%d dinten',
                M: 'sewulan',
                MM: '%d wulan',
                y: 'setaun',
                yy: '%d taun'
              }
            }
          return (o.default.locale(s, null, !0), s)
        })
      })(vn)),
    vn.exports
  )
}
var yb = lH()
const dH = /* @__PURE__ */ F(yb),
  cH = /* @__PURE__ */ q(
    {
      __proto__: null,
      default: dH
    },
    [yb]
  )
var yn = { exports: {} },
  _H = yn.exports,
  V_
function fH() {
  return (
    V_ ||
      ((V_ = 1),
      (function (e, a) {
        ;(function (n, r) {
          e.exports = r(R())
        })(_H, function (n) {
          function r(t) {
            return t && typeof t == 'object' && 'default' in t ? t : { default: t }
          }
          var o = r(n),
            s = {
              name: 'ka',
              weekdays: 'კვირა_ორშაბათი_სამშაბათი_ოთხშაბათი_ხუთშაბათი_პარასკევი_შაბათი'.split('_'),
              weekdaysShort: 'კვი_ორშ_სამ_ოთხ_ხუთ_პარ_შაბ'.split('_'),
              weekdaysMin: 'კვ_ორ_სა_ოთ_ხუ_პა_შა'.split('_'),
              months:
                'იანვარი_თებერვალი_მარტი_აპრილი_მაისი_ივნისი_ივლისი_აგვისტო_სექტემბერი_ოქტომბერი_ნოემბერი_დეკემბერი'.split(
                  '_'
                ),
              monthsShort: 'იან_თებ_მარ_აპრ_მაი_ივნ_ივლ_აგვ_სექ_ოქტ_ნოე_დეკ'.split('_'),
              weekStart: 1,
              formats: {
                LT: 'h:mm A',
                LTS: 'h:mm:ss A',
                L: 'DD/MM/YYYY',
                LL: 'D MMMM YYYY',
                LLL: 'D MMMM YYYY h:mm A',
                LLLL: 'dddd, D MMMM YYYY h:mm A'
              },
              relativeTime: {
                future: '%s შემდეგ',
                past: '%s წინ',
                s: 'წამი',
                m: 'წუთი',
                mm: '%d წუთი',
                h: 'საათი',
                hh: '%d საათის',
                d: 'დღეს',
                dd: '%d დღის განმავლობაში',
                M: 'თვის',
                MM: '%d თვის',
                y: 'წელი',
                yy: '%d წლის'
              },
              ordinal: function (t) {
                return t
              }
            }
          return (o.default.locale(s, null, !0), s)
        })
      })(yn)),
    yn.exports
  )
}
var gb = fH()
const mH = /* @__PURE__ */ F(gb),
  pH = /* @__PURE__ */ q(
    {
      __proto__: null,
      default: mH
    },
    [gb]
  )
var gn = { exports: {} },
  hH = gn.exports,
  K_
function vH() {
  return (
    K_ ||
      ((K_ = 1),
      (function (e, a) {
        ;(function (n, r) {
          e.exports = r(R())
        })(hH, function (n) {
          function r(t) {
            return t && typeof t == 'object' && 'default' in t ? t : { default: t }
          }
          var o = r(n),
            s = {
              name: 'kk',
              weekdays: 'жексенбі_дүйсенбі_сейсенбі_сәрсенбі_бейсенбі_жұма_сенбі'.split('_'),
              weekdaysShort: 'жек_дүй_сей_сәр_бей_жұм_сен'.split('_'),
              weekdaysMin: 'жк_дй_сй_ср_бй_жм_сн'.split('_'),
              months:
                'қаңтар_ақпан_наурыз_сәуір_мамыр_маусым_шілде_тамыз_қыркүйек_қазан_қараша_желтоқсан'.split(
                  '_'
                ),
              monthsShort: 'қаң_ақп_нау_сәу_мам_мау_шіл_там_қыр_қаз_қар_жел'.split('_'),
              weekStart: 1,
              relativeTime: {
                future: '%s ішінде',
                past: '%s бұрын',
                s: 'бірнеше секунд',
                m: 'бір минут',
                mm: '%d минут',
                h: 'бір сағат',
                hh: '%d сағат',
                d: 'бір күн',
                dd: '%d күн',
                M: 'бір ай',
                MM: '%d ай',
                y: 'бір жыл',
                yy: '%d жыл'
              },
              ordinal: function (t) {
                return t
              },
              formats: {
                LT: 'HH:mm',
                LTS: 'HH:mm:ss',
                L: 'DD.MM.YYYY',
                LL: 'D MMMM YYYY',
                LLL: 'D MMMM YYYY HH:mm',
                LLLL: 'dddd, D MMMM YYYY HH:mm'
              }
            }
          return (o.default.locale(s, null, !0), s)
        })
      })(gn)),
    gn.exports
  )
}
var Mb = vH()
const yH = /* @__PURE__ */ F(Mb),
  gH = /* @__PURE__ */ q(
    {
      __proto__: null,
      default: yH
    },
    [Mb]
  )
var Mn = { exports: {} },
  MH = Mn.exports,
  X_
function bH() {
  return (
    X_ ||
      ((X_ = 1),
      (function (e, a) {
        ;(function (n, r) {
          e.exports = r(R())
        })(MH, function (n) {
          function r(t) {
            return t && typeof t == 'object' && 'default' in t ? t : { default: t }
          }
          var o = r(n),
            s = {
              name: 'km',
              weekdays: 'អាទិត្យ_ច័ន្ទ_អង្គារ_ពុធ_ព្រហស្បតិ៍_សុក្រ_សៅរ៍'.split('_'),
              months:
                'មករា_កុម្ភៈ_មីនា_មេសា_ឧសភា_មិថុនា_កក្កដា_សីហា_កញ្ញា_តុលា_វិច្ឆិកា_ធ្នូ'.split('_'),
              weekStart: 1,
              weekdaysShort: 'អា_ច_អ_ព_ព្រ_សុ_ស'.split('_'),
              monthsShort:
                'មករា_កុម្ភៈ_មីនា_មេសា_ឧសភា_មិថុនា_កក្កដា_សីហា_កញ្ញា_តុលា_វិច្ឆិកា_ធ្នូ'.split('_'),
              weekdaysMin: 'អា_ច_អ_ព_ព្រ_សុ_ស'.split('_'),
              ordinal: function (t) {
                return t
              },
              formats: {
                LT: 'HH:mm',
                LTS: 'HH:mm:ss',
                L: 'DD/MM/YYYY',
                LL: 'D MMMM YYYY',
                LLL: 'D MMMM YYYY HH:mm',
                LLLL: 'dddd, D MMMM YYYY HH:mm'
              },
              relativeTime: {
                future: '%sទៀត',
                past: '%sមុន',
                s: 'ប៉ុន្មានវិនាទី',
                m: 'មួយនាទី',
                mm: '%d នាទី',
                h: 'មួយម៉ោង',
                hh: '%d ម៉ោង',
                d: 'មួយថ្ងៃ',
                dd: '%d ថ្ងៃ',
                M: 'មួយខែ',
                MM: '%d ខែ',
                y: 'មួយឆ្នាំ',
                yy: '%d ឆ្នាំ'
              }
            }
          return (o.default.locale(s, null, !0), s)
        })
      })(Mn)),
    Mn.exports
  )
}
var bb = bH()
const YH = /* @__PURE__ */ F(bb),
  wH = /* @__PURE__ */ q(
    {
      __proto__: null,
      default: YH
    },
    [bb]
  )
var bn = { exports: {} },
  xH = bn.exports,
  Z_
function LH() {
  return (
    Z_ ||
      ((Z_ = 1),
      (function (e, a) {
        ;(function (n, r) {
          e.exports = r(R())
        })(xH, function (n) {
          function r(t) {
            return t && typeof t == 'object' && 'default' in t ? t : { default: t }
          }
          var o = r(n),
            s = {
              name: 'kn',
              weekdays: 'ಭಾನುವಾರ_ಸೋಮವಾರ_ಮಂಗಳವಾರ_ಬುಧವಾರ_ಗುರುವಾರ_ಶುಕ್ರವಾರ_ಶನಿವಾರ'.split('_'),
              months:
                'ಜನವರಿ_ಫೆಬ್ರವರಿ_ಮಾರ್ಚ್_ಏಪ್ರಿಲ್_ಮೇ_ಜೂನ್_ಜುಲೈ_ಆಗಸ್ಟ್_ಸೆಪ್ಟೆಂಬರ್_ಅಕ್ಟೋಬರ್_ನವೆಂಬರ್_ಡಿಸೆಂಬರ್'.split(
                  '_'
                ),
              weekdaysShort: 'ಭಾನು_ಸೋಮ_ಮಂಗಳ_ಬುಧ_ಗುರು_ಶುಕ್ರ_ಶನಿ'.split('_'),
              monthsShort:
                'ಜನ_ಫೆಬ್ರ_ಮಾರ್ಚ್_ಏಪ್ರಿಲ್_ಮೇ_ಜೂನ್_ಜುಲೈ_ಆಗಸ್ಟ್_ಸೆಪ್ಟೆಂ_ಅಕ್ಟೋ_ನವೆಂ_ಡಿಸೆಂ'.split(
                  '_'
                ),
              weekdaysMin: 'ಭಾ_ಸೋ_ಮಂ_ಬು_ಗು_ಶು_ಶ'.split('_'),
              ordinal: function (t) {
                return t
              },
              formats: {
                LT: 'A h:mm',
                LTS: 'A h:mm:ss',
                L: 'DD/MM/YYYY',
                LL: 'D MMMM YYYY',
                LLL: 'D MMMM YYYY, A h:mm',
                LLLL: 'dddd, D MMMM YYYY, A h:mm'
              },
              relativeTime: {
                future: '%s ನಂತರ',
                past: '%s ಹಿಂದೆ',
                s: 'ಕೆಲವು ಕ್ಷಣಗಳು',
                m: 'ಒಂದು ನಿಮಿಷ',
                mm: '%d ನಿಮಿಷ',
                h: 'ಒಂದು ಗಂಟೆ',
                hh: '%d ಗಂಟೆ',
                d: 'ಒಂದು ದಿನ',
                dd: '%d ದಿನ',
                M: 'ಒಂದು ತಿಂಗಳು',
                MM: '%d ತಿಂಗಳು',
                y: 'ಒಂದು ವರ್ಷ',
                yy: '%d ವರ್ಷ'
              }
            }
          return (o.default.locale(s, null, !0), s)
        })
      })(bn)),
    bn.exports
  )
}
var Yb = LH()
const kH = /* @__PURE__ */ F(Yb),
  SH = /* @__PURE__ */ q(
    {
      __proto__: null,
      default: kH
    },
    [Yb]
  )
var Yn = { exports: {} },
  DH = Yn.exports,
  Q_
function EH() {
  return (
    Q_ ||
      ((Q_ = 1),
      (function (e, a) {
        ;(function (n, r) {
          e.exports = r(R())
        })(DH, function (n) {
          function r(t) {
            return t && typeof t == 'object' && 'default' in t ? t : { default: t }
          }
          var o = r(n),
            s = {
              name: 'ko',
              weekdays: '일요일_월요일_화요일_수요일_목요일_금요일_토요일'.split('_'),
              weekdaysShort: '일_월_화_수_목_금_토'.split('_'),
              weekdaysMin: '일_월_화_수_목_금_토'.split('_'),
              months: '1월_2월_3월_4월_5월_6월_7월_8월_9월_10월_11월_12월'.split('_'),
              monthsShort: '1월_2월_3월_4월_5월_6월_7월_8월_9월_10월_11월_12월'.split('_'),
              ordinal: function (t) {
                return t + '일'
              },
              formats: {
                LT: 'A h:mm',
                LTS: 'A h:mm:ss',
                L: 'YYYY.MM.DD.',
                LL: 'YYYY년 MMMM D일',
                LLL: 'YYYY년 MMMM D일 A h:mm',
                LLLL: 'YYYY년 MMMM D일 dddd A h:mm',
                l: 'YYYY.MM.DD.',
                ll: 'YYYY년 MMMM D일',
                lll: 'YYYY년 MMMM D일 A h:mm',
                llll: 'YYYY년 MMMM D일 dddd A h:mm'
              },
              meridiem: function (t) {
                return t < 12 ? '오전' : '오후'
              },
              relativeTime: {
                future: '%s 후',
                past: '%s 전',
                s: '몇 초',
                m: '1분',
                mm: '%d분',
                h: '한 시간',
                hh: '%d시간',
                d: '하루',
                dd: '%d일',
                M: '한 달',
                MM: '%d달',
                y: '일 년',
                yy: '%d년'
              }
            }
          return (o.default.locale(s, null, !0), s)
        })
      })(Yn)),
    Yn.exports
  )
}
var wb = EH()
const TH = /* @__PURE__ */ F(wb),
  $H = /* @__PURE__ */ q(
    {
      __proto__: null,
      default: TH
    },
    [wb]
  )
var Lt = { exports: {} },
  HH = Lt.exports,
  ef
function jH() {
  return (
    ef ||
      ((ef = 1),
      (function (e, a) {
        ;(function (n, r) {
          r(a, R())
        })(HH, function (n, r) {
          function o(d) {
            return d && typeof d == 'object' && 'default' in d ? d : { default: d }
          }
          var s = o(r),
            t = { 1: '١', 2: '٢', 3: '٣', 4: '٤', 5: '٥', 6: '٦', 7: '٧', 8: '٨', 9: '٩', 0: '٠' },
            i = {
              '١': '1',
              '٢': '2',
              '٣': '3',
              '٤': '4',
              '٥': '5',
              '٦': '6',
              '٧': '7',
              '٨': '8',
              '٩': '9',
              '٠': '0'
            },
            u = [
              'کانوونی دووەم',
              'شوبات',
              'ئادار',
              'نیسان',
              'ئایار',
              'حوزەیران',
              'تەممووز',
              'ئاب',
              'ئەیلوول',
              'تشرینی یەکەم',
              'تشرینی دووەم',
              'کانوونی یەکەم'
            ],
            l = {
              name: 'ku',
              months: u,
              monthsShort: u,
              weekdays: 'یەکشەممە_دووشەممە_سێشەممە_چوارشەممە_پێنجشەممە_هەینی_شەممە'.split('_'),
              weekdaysShort: 'یەکشەم_دووشەم_سێشەم_چوارشەم_پێنجشەم_هەینی_شەممە'.split('_'),
              weekStart: 6,
              weekdaysMin: 'ی_د_س_چ_پ_هـ_ش'.split('_'),
              preparse: function (d) {
                return d
                  .replace(/[١٢٣٤٥٦٧٨٩٠]/g, function (c) {
                    return i[c]
                  })
                  .replace(/،/g, ',')
              },
              postformat: function (d) {
                return d
                  .replace(/\d/g, function (c) {
                    return t[c]
                  })
                  .replace(/,/g, '،')
              },
              ordinal: function (d) {
                return d
              },
              formats: {
                LT: 'HH:mm',
                LTS: 'HH:mm:ss',
                L: 'DD/MM/YYYY',
                LL: 'D MMMM YYYY',
                LLL: 'D MMMM YYYY HH:mm',
                LLLL: 'dddd, D MMMM YYYY HH:mm'
              },
              meridiem: function (d) {
                return d < 12 ? 'پ.ن' : 'د.ن'
              },
              relativeTime: {
                future: 'لە %s',
                past: 'لەمەوپێش %s',
                s: 'چەند چرکەیەک',
                m: 'یەک خولەک',
                mm: '%d خولەک',
                h: 'یەک کاتژمێر',
                hh: '%d کاتژمێر',
                d: 'یەک ڕۆژ',
                dd: '%d ڕۆژ',
                M: 'یەک مانگ',
                MM: '%d مانگ',
                y: 'یەک ساڵ',
                yy: '%d ساڵ'
              }
            }
          ;(s.default.locale(l, null, !0),
            (n.default = l),
            (n.englishToArabicNumbersMap = t),
            Object.defineProperty(n, '__esModule', { value: !0 }))
        })
      })(Lt, Lt.exports)),
    Lt.exports
  )
}
var xb = jH()
const CH = /* @__PURE__ */ F(xb),
  AH = /* @__PURE__ */ q(
    {
      __proto__: null,
      default: CH
    },
    [xb]
  )
var wn = { exports: {} },
  qH = wn.exports,
  tf
function FH() {
  return (
    tf ||
      ((tf = 1),
      (function (e, a) {
        ;(function (n, r) {
          e.exports = r(R())
        })(qH, function (n) {
          function r(t) {
            return t && typeof t == 'object' && 'default' in t ? t : { default: t }
          }
          var o = r(n),
            s = {
              name: 'ky',
              weekdays: 'Жекшемби_Дүйшөмбү_Шейшемби_Шаршемби_Бейшемби_Жума_Ишемби'.split('_'),
              months:
                'январь_февраль_март_апрель_май_июнь_июль_август_сентябрь_октябрь_ноябрь_декабрь'.split(
                  '_'
                ),
              weekStart: 1,
              weekdaysShort: 'Жек_Дүй_Шей_Шар_Бей_Жум_Ише'.split('_'),
              monthsShort: 'янв_фев_март_апр_май_июнь_июль_авг_сен_окт_ноя_дек'.split('_'),
              weekdaysMin: 'Жк_Дй_Шй_Шр_Бй_Жм_Иш'.split('_'),
              ordinal: function (t) {
                return t
              },
              formats: {
                LT: 'HH:mm',
                LTS: 'HH:mm:ss',
                L: 'DD.MM.YYYY',
                LL: 'D MMMM YYYY',
                LLL: 'D MMMM YYYY HH:mm',
                LLLL: 'dddd, D MMMM YYYY HH:mm'
              },
              relativeTime: {
                future: '%s ичинде',
                past: '%s мурун',
                s: 'бирнече секунд',
                m: 'бир мүнөт',
                mm: '%d мүнөт',
                h: 'бир саат',
                hh: '%d саат',
                d: 'бир күн',
                dd: '%d күн',
                M: 'бир ай',
                MM: '%d ай',
                y: 'бир жыл',
                yy: '%d жыл'
              }
            }
          return (o.default.locale(s, null, !0), s)
        })
      })(wn)),
    wn.exports
  )
}
var Lb = FH()
const RH = /* @__PURE__ */ F(Lb),
  IH = /* @__PURE__ */ q(
    {
      __proto__: null,
      default: RH
    },
    [Lb]
  )
var xn = { exports: {} },
  PH = xn.exports,
  rf
function BH() {
  return (
    rf ||
      ((rf = 1),
      (function (e, a) {
        ;(function (n, r) {
          e.exports = r(R())
        })(PH, function (n) {
          function r(t) {
            return t && typeof t == 'object' && 'default' in t ? t : { default: t }
          }
          var o = r(n),
            s = {
              name: 'lb',
              weekdays: 'Sonndeg_Méindeg_Dënschdeg_Mëttwoch_Donneschdeg_Freideg_Samschdeg'.split(
                '_'
              ),
              months:
                'Januar_Februar_Mäerz_Abrëll_Mee_Juni_Juli_August_September_Oktober_November_Dezember'.split(
                  '_'
                ),
              weekStart: 1,
              weekdaysShort: 'So._Mé._Dë._Më._Do._Fr._Sa.'.split('_'),
              monthsShort: 'Jan._Febr._Mrz._Abr._Mee_Jun._Jul._Aug._Sept._Okt._Nov._Dez.'.split(
                '_'
              ),
              weekdaysMin: 'So_Mé_Dë_Më_Do_Fr_Sa'.split('_'),
              ordinal: function (t) {
                return t
              },
              formats: {
                LT: 'H:mm [Auer]',
                LTS: 'H:mm:ss [Auer]',
                L: 'DD.MM.YYYY',
                LL: 'D. MMMM YYYY',
                LLL: 'D. MMMM YYYY H:mm [Auer]',
                LLLL: 'dddd, D. MMMM YYYY H:mm [Auer]'
              }
            }
          return (o.default.locale(s, null, !0), s)
        })
      })(xn)),
    xn.exports
  )
}
var kb = BH()
const NH = /* @__PURE__ */ F(kb),
  OH = /* @__PURE__ */ q(
    {
      __proto__: null,
      default: NH
    },
    [kb]
  )
var Ln = { exports: {} },
  zH = Ln.exports,
  nf
function GH() {
  return (
    nf ||
      ((nf = 1),
      (function (e, a) {
        ;(function (n, r) {
          e.exports = r(R())
        })(zH, function (n) {
          function r(t) {
            return t && typeof t == 'object' && 'default' in t ? t : { default: t }
          }
          var o = r(n),
            s = {
              name: 'lo',
              weekdays: 'ອາທິດ_ຈັນ_ອັງຄານ_ພຸດ_ພະຫັດ_ສຸກ_ເສົາ'.split('_'),
              months:
                'ມັງກອນ_ກຸມພາ_ມີນາ_ເມສາ_ພຶດສະພາ_ມິຖຸນາ_ກໍລະກົດ_ສິງຫາ_ກັນຍາ_ຕຸລາ_ພະຈິກ_ທັນວາ'.split(
                  '_'
                ),
              weekdaysShort: 'ທິດ_ຈັນ_ອັງຄານ_ພຸດ_ພະຫັດ_ສຸກ_ເສົາ'.split('_'),
              monthsShort:
                'ມັງກອນ_ກຸມພາ_ມີນາ_ເມສາ_ພຶດສະພາ_ມິຖຸນາ_ກໍລະກົດ_ສິງຫາ_ກັນຍາ_ຕຸລາ_ພະຈິກ_ທັນວາ'.split(
                  '_'
                ),
              weekdaysMin: 'ທ_ຈ_ອຄ_ພ_ພຫ_ສກ_ສ'.split('_'),
              ordinal: function (t) {
                return t
              },
              formats: {
                LT: 'HH:mm',
                LTS: 'HH:mm:ss',
                L: 'DD/MM/YYYY',
                LL: 'D MMMM YYYY',
                LLL: 'D MMMM YYYY HH:mm',
                LLLL: 'ວັນdddd D MMMM YYYY HH:mm'
              },
              relativeTime: {
                future: 'ອີກ %s',
                past: '%sຜ່ານມາ',
                s: 'ບໍ່ເທົ່າໃດວິນາທີ',
                m: '1 ນາທີ',
                mm: '%d ນາທີ',
                h: '1 ຊົ່ວໂມງ',
                hh: '%d ຊົ່ວໂມງ',
                d: '1 ມື້',
                dd: '%d ມື້',
                M: '1 ເດືອນ',
                MM: '%d ເດືອນ',
                y: '1 ປີ',
                yy: '%d ປີ'
              }
            }
          return (o.default.locale(s, null, !0), s)
        })
      })(Ln)),
    Ln.exports
  )
}
var Sb = GH()
const JH = /* @__PURE__ */ F(Sb),
  UH = /* @__PURE__ */ q(
    {
      __proto__: null,
      default: JH
    },
    [Sb]
  )
var kn = { exports: {} },
  WH = kn.exports,
  af
function VH() {
  return (
    af ||
      ((af = 1),
      (function (e, a) {
        ;(function (n, r) {
          e.exports = r(R())
        })(WH, function (n) {
          function r(d) {
            return d && typeof d == 'object' && 'default' in d ? d : { default: d }
          }
          var o = r(n),
            s =
              'sausio_vasario_kovo_balandžio_gegužės_birželio_liepos_rugpjūčio_rugsėjo_spalio_lapkričio_gruodžio'.split(
                '_'
              ),
            t =
              'sausis_vasaris_kovas_balandis_gegužė_birželis_liepa_rugpjūtis_rugsėjis_spalis_lapkritis_gruodis'.split(
                '_'
              ),
            i = /D[oD]?(\[[^\[\]]*\]|\s)+MMMM?|MMMM?(\[[^\[\]]*\]|\s)+D[oD]?/,
            u = function (d, c) {
              return i.test(c) ? s[d.month()] : t[d.month()]
            }
          ;((u.s = t), (u.f = s))
          var l = {
            name: 'lt',
            weekdays:
              'sekmadienis_pirmadienis_antradienis_trečiadienis_ketvirtadienis_penktadienis_šeštadienis'.split(
                '_'
              ),
            weekdaysShort: 'sek_pir_ant_tre_ket_pen_šeš'.split('_'),
            weekdaysMin: 's_p_a_t_k_pn_š'.split('_'),
            months: u,
            monthsShort: 'sau_vas_kov_bal_geg_bir_lie_rgp_rgs_spa_lap_grd'.split('_'),
            ordinal: function (d) {
              return d + '.'
            },
            weekStart: 1,
            relativeTime: {
              future: 'už %s',
              past: 'prieš %s',
              s: 'kelias sekundes',
              m: 'minutę',
              mm: '%d minutes',
              h: 'valandą',
              hh: '%d valandas',
              d: 'dieną',
              dd: '%d dienas',
              M: 'mėnesį',
              MM: '%d mėnesius',
              y: 'metus',
              yy: '%d metus'
            },
            format: {
              LT: 'HH:mm',
              LTS: 'HH:mm:ss',
              L: 'YYYY-MM-DD',
              LL: 'YYYY [m.] MMMM D [d.]',
              LLL: 'YYYY [m.] MMMM D [d.], HH:mm [val.]',
              LLLL: 'YYYY [m.] MMMM D [d.], dddd, HH:mm [val.]',
              l: 'YYYY-MM-DD',
              ll: 'YYYY [m.] MMMM D [d.]',
              lll: 'YYYY [m.] MMMM D [d.], HH:mm [val.]',
              llll: 'YYYY [m.] MMMM D [d.], ddd, HH:mm [val.]'
            },
            formats: {
              LT: 'HH:mm',
              LTS: 'HH:mm:ss',
              L: 'YYYY-MM-DD',
              LL: 'YYYY [m.] MMMM D [d.]',
              LLL: 'YYYY [m.] MMMM D [d.], HH:mm [val.]',
              LLLL: 'YYYY [m.] MMMM D [d.], dddd, HH:mm [val.]',
              l: 'YYYY-MM-DD',
              ll: 'YYYY [m.] MMMM D [d.]',
              lll: 'YYYY [m.] MMMM D [d.], HH:mm [val.]',
              llll: 'YYYY [m.] MMMM D [d.], ddd, HH:mm [val.]'
            }
          }
          return (o.default.locale(l, null, !0), l)
        })
      })(kn)),
    kn.exports
  )
}
var Db = VH()
const KH = /* @__PURE__ */ F(Db),
  XH = /* @__PURE__ */ q(
    {
      __proto__: null,
      default: KH
    },
    [Db]
  )
var Sn = { exports: {} },
  ZH = Sn.exports,
  of
function QH() {
  return (
    of ||
      ((of = 1),
      (function (e, a) {
        ;(function (n, r) {
          e.exports = r(R())
        })(ZH, function (n) {
          function r(t) {
            return t && typeof t == 'object' && 'default' in t ? t : { default: t }
          }
          var o = r(n),
            s = {
              name: 'lv',
              weekdays:
                'svētdiena_pirmdiena_otrdiena_trešdiena_ceturtdiena_piektdiena_sestdiena'.split(
                  '_'
                ),
              months:
                'janvāris_februāris_marts_aprīlis_maijs_jūnijs_jūlijs_augusts_septembris_oktobris_novembris_decembris'.split(
                  '_'
                ),
              weekStart: 1,
              weekdaysShort: 'Sv_P_O_T_C_Pk_S'.split('_'),
              monthsShort: 'jan_feb_mar_apr_mai_jūn_jūl_aug_sep_okt_nov_dec'.split('_'),
              weekdaysMin: 'Sv_P_O_T_C_Pk_S'.split('_'),
              ordinal: function (t) {
                return t
              },
              formats: {
                LT: 'HH:mm',
                LTS: 'HH:mm:ss',
                L: 'DD.MM.YYYY.',
                LL: 'YYYY. [gada] D. MMMM',
                LLL: 'YYYY. [gada] D. MMMM, HH:mm',
                LLLL: 'YYYY. [gada] D. MMMM, dddd, HH:mm'
              },
              relativeTime: {
                future: 'pēc %s',
                past: 'pirms %s',
                s: 'dažām sekundēm',
                m: 'minūtes',
                mm: '%d minūtēm',
                h: 'stundas',
                hh: '%d stundām',
                d: 'dienas',
                dd: '%d dienām',
                M: 'mēneša',
                MM: '%d mēnešiem',
                y: 'gada',
                yy: '%d gadiem'
              }
            }
          return (o.default.locale(s, null, !0), s)
        })
      })(Sn)),
    Sn.exports
  )
}
var Eb = QH()
const ej = /* @__PURE__ */ F(Eb),
  tj = /* @__PURE__ */ q(
    {
      __proto__: null,
      default: ej
    },
    [Eb]
  )
var Dn = { exports: {} },
  rj = Dn.exports,
  sf
function nj() {
  return (
    sf ||
      ((sf = 1),
      (function (e, a) {
        ;(function (n, r) {
          e.exports = r(R())
        })(rj, function (n) {
          function r(t) {
            return t && typeof t == 'object' && 'default' in t ? t : { default: t }
          }
          var o = r(n),
            s = {
              name: 'me',
              weekdays: 'nedjelja_ponedjeljak_utorak_srijeda_četvrtak_petak_subota'.split('_'),
              months:
                'januar_februar_mart_april_maj_jun_jul_avgust_septembar_oktobar_novembar_decembar'.split(
                  '_'
                ),
              weekStart: 1,
              weekdaysShort: 'ned._pon._uto._sri._čet._pet._sub.'.split('_'),
              monthsShort: 'jan._feb._mar._apr._maj_jun_jul_avg._sep._okt._nov._dec.'.split('_'),
              weekdaysMin: 'ne_po_ut_sr_če_pe_su'.split('_'),
              ordinal: function (t) {
                return t
              },
              formats: {
                LT: 'H:mm',
                LTS: 'H:mm:ss',
                L: 'DD.MM.YYYY',
                LL: 'D. MMMM YYYY',
                LLL: 'D. MMMM YYYY H:mm',
                LLLL: 'dddd, D. MMMM YYYY H:mm'
              }
            }
          return (o.default.locale(s, null, !0), s)
        })
      })(Dn)),
    Dn.exports
  )
}
var Tb = nj()
const aj = /* @__PURE__ */ F(Tb),
  oj = /* @__PURE__ */ q(
    {
      __proto__: null,
      default: aj
    },
    [Tb]
  )
var En = { exports: {} },
  sj = En.exports,
  uf
function ij() {
  return (
    uf ||
      ((uf = 1),
      (function (e, a) {
        ;(function (n, r) {
          e.exports = r(R())
        })(sj, function (n) {
          function r(t) {
            return t && typeof t == 'object' && 'default' in t ? t : { default: t }
          }
          var o = r(n),
            s = {
              name: 'mi',
              weekdays: 'Rātapu_Mane_Tūrei_Wenerei_Tāite_Paraire_Hātarei'.split('_'),
              months:
                'Kohi-tāte_Hui-tanguru_Poutū-te-rangi_Paenga-whāwhā_Haratua_Pipiri_Hōngoingoi_Here-turi-kōkā_Mahuru_Whiringa-ā-nuku_Whiringa-ā-rangi_Hakihea'.split(
                  '_'
                ),
              weekStart: 1,
              weekdaysShort: 'Ta_Ma_Tū_We_Tāi_Pa_Hā'.split('_'),
              monthsShort: 'Kohi_Hui_Pou_Pae_Hara_Pipi_Hōngoi_Here_Mahu_Whi-nu_Whi-ra_Haki'.split(
                '_'
              ),
              weekdaysMin: 'Ta_Ma_Tū_We_Tāi_Pa_Hā'.split('_'),
              ordinal: function (t) {
                return t
              },
              formats: {
                LT: 'HH:mm',
                LTS: 'HH:mm:ss',
                L: 'DD/MM/YYYY',
                LL: 'D MMMM YYYY',
                LLL: 'D MMMM YYYY [i] HH:mm',
                LLLL: 'dddd, D MMMM YYYY [i] HH:mm'
              },
              relativeTime: {
                future: 'i roto i %s',
                past: '%s i mua',
                s: 'te hēkona ruarua',
                m: 'he meneti',
                mm: '%d meneti',
                h: 'te haora',
                hh: '%d haora',
                d: 'he ra',
                dd: '%d ra',
                M: 'he marama',
                MM: '%d marama',
                y: 'he tau',
                yy: '%d tau'
              }
            }
          return (o.default.locale(s, null, !0), s)
        })
      })(En)),
    En.exports
  )
}
var $b = ij()
const uj = /* @__PURE__ */ F($b),
  lj = /* @__PURE__ */ q(
    {
      __proto__: null,
      default: uj
    },
    [$b]
  )
var Tn = { exports: {} },
  dj = Tn.exports,
  lf
function cj() {
  return (
    lf ||
      ((lf = 1),
      (function (e, a) {
        ;(function (n, r) {
          e.exports = r(R())
        })(dj, function (n) {
          function r(t) {
            return t && typeof t == 'object' && 'default' in t ? t : { default: t }
          }
          var o = r(n),
            s = {
              name: 'mk',
              weekdays: 'недела_понеделник_вторник_среда_четврток_петок_сабота'.split('_'),
              months:
                'јануари_февруари_март_април_мај_јуни_јули_август_септември_октомври_ноември_декември'.split(
                  '_'
                ),
              weekStart: 1,
              weekdaysShort: 'нед_пон_вто_сре_чет_пет_саб'.split('_'),
              monthsShort: 'јан_фев_мар_апр_мај_јун_јул_авг_сеп_окт_ное_дек'.split('_'),
              weekdaysMin: 'нe_пo_вт_ср_че_пе_сa'.split('_'),
              ordinal: function (t) {
                return t
              },
              formats: {
                LT: 'H:mm',
                LTS: 'H:mm:ss',
                L: 'D.MM.YYYY',
                LL: 'D MMMM YYYY',
                LLL: 'D MMMM YYYY H:mm',
                LLLL: 'dddd, D MMMM YYYY H:mm'
              },
              relativeTime: {
                future: 'после %s',
                past: 'пред %s',
                s: 'неколку секунди',
                m: 'минута',
                mm: '%d минути',
                h: 'час',
                hh: '%d часа',
                d: 'ден',
                dd: '%d дена',
                M: 'месец',
                MM: '%d месеци',
                y: 'година',
                yy: '%d години'
              }
            }
          return (o.default.locale(s, null, !0), s)
        })
      })(Tn)),
    Tn.exports
  )
}
var Hb = cj()
const _j = /* @__PURE__ */ F(Hb),
  fj = /* @__PURE__ */ q(
    {
      __proto__: null,
      default: _j
    },
    [Hb]
  )
var $n = { exports: {} },
  mj = $n.exports,
  df
function pj() {
  return (
    df ||
      ((df = 1),
      (function (e, a) {
        ;(function (n, r) {
          e.exports = r(R())
        })(mj, function (n) {
          function r(t) {
            return t && typeof t == 'object' && 'default' in t ? t : { default: t }
          }
          var o = r(n),
            s = {
              name: 'ml',
              weekdays:
                'ഞായറാഴ്ച_തിങ്കളാഴ്ച_ചൊവ്വാഴ്ച_ബുധനാഴ്ച_വ്യാഴാഴ്ച_വെള്ളിയാഴ്ച_ശനിയാഴ്ച'.split('_'),
              months:
                'ജനുവരി_ഫെബ്രുവരി_മാർച്ച്_ഏപ്രിൽ_മേയ്_ജൂൺ_ജൂലൈ_ഓഗസ്റ്റ്_സെപ്റ്റംബർ_ഒക്ടോബർ_നവംബർ_ഡിസംബർ'.split(
                  '_'
                ),
              weekdaysShort: 'ഞായർ_തിങ്കൾ_ചൊവ്വ_ബുധൻ_വ്യാഴം_വെള്ളി_ശനി'.split('_'),
              monthsShort:
                'ജനു._ഫെബ്രു._മാർ._ഏപ്രി._മേയ്_ജൂൺ_ജൂലൈ._ഓഗ._സെപ്റ്റ._ഒക്ടോ._നവം._ഡിസം.'.split('_'),
              weekdaysMin: 'ഞാ_തി_ചൊ_ബു_വ്യാ_വെ_ശ'.split('_'),
              ordinal: function (t) {
                return t
              },
              formats: {
                LT: 'A h:mm -നു',
                LTS: 'A h:mm:ss -നു',
                L: 'DD/MM/YYYY',
                LL: 'D MMMM YYYY',
                LLL: 'D MMMM YYYY, A h:mm -നു',
                LLLL: 'dddd, D MMMM YYYY, A h:mm -നു'
              },
              relativeTime: {
                future: '%s കഴിഞ്ഞ്',
                past: '%s മുൻപ്',
                s: 'അൽപ നിമിഷങ്ങൾ',
                m: 'ഒരു മിനിറ്റ്',
                mm: '%d മിനിറ്റ്',
                h: 'ഒരു മണിക്കൂർ',
                hh: '%d മണിക്കൂർ',
                d: 'ഒരു ദിവസം',
                dd: '%d ദിവസം',
                M: 'ഒരു മാസം',
                MM: '%d മാസം',
                y: 'ഒരു വർഷം',
                yy: '%d വർഷം'
              }
            }
          return (o.default.locale(s, null, !0), s)
        })
      })($n)),
    $n.exports
  )
}
var jb = pj()
const hj = /* @__PURE__ */ F(jb),
  vj = /* @__PURE__ */ q(
    {
      __proto__: null,
      default: hj
    },
    [jb]
  )
var Hn = { exports: {} },
  yj = Hn.exports,
  cf
function gj() {
  return (
    cf ||
      ((cf = 1),
      (function (e, a) {
        ;(function (n, r) {
          e.exports = r(R())
        })(yj, function (n) {
          function r(t) {
            return t && typeof t == 'object' && 'default' in t ? t : { default: t }
          }
          var o = r(n),
            s = {
              name: 'mn',
              weekdays: 'Ням_Даваа_Мягмар_Лхагва_Пүрэв_Баасан_Бямба'.split('_'),
              months:
                'Нэгдүгээр сар_Хоёрдугаар сар_Гуравдугаар сар_Дөрөвдүгээр сар_Тавдугаар сар_Зургадугаар сар_Долдугаар сар_Наймдугаар сар_Есдүгээр сар_Аравдугаар сар_Арван нэгдүгээр сар_Арван хоёрдугаар сар'.split(
                  '_'
                ),
              weekdaysShort: 'Ням_Дав_Мяг_Лха_Пүр_Баа_Бям'.split('_'),
              monthsShort:
                '1 сар_2 сар_3 сар_4 сар_5 сар_6 сар_7 сар_8 сар_9 сар_10 сар_11 сар_12 сар'.split(
                  '_'
                ),
              weekdaysMin: 'Ня_Да_Мя_Лх_Пү_Ба_Бя'.split('_'),
              ordinal: function (t) {
                return t
              },
              formats: {
                LT: 'HH:mm',
                LTS: 'HH:mm:ss',
                L: 'YYYY-MM-DD',
                LL: 'YYYY оны MMMMын D',
                LLL: 'YYYY оны MMMMын D HH:mm',
                LLLL: 'dddd, YYYY оны MMMMын D HH:mm'
              },
              relativeTime: {
                future: '%s',
                past: '%s',
                s: 'саяхан',
                m: 'м',
                mm: '%dм',
                h: '1ц',
                hh: '%dц',
                d: '1ө',
                dd: '%dө',
                M: '1с',
                MM: '%dс',
                y: '1ж',
                yy: '%dж'
              }
            }
          return (o.default.locale(s, null, !0), s)
        })
      })(Hn)),
    Hn.exports
  )
}
var Cb = gj()
const Mj = /* @__PURE__ */ F(Cb),
  bj = /* @__PURE__ */ q(
    {
      __proto__: null,
      default: Mj
    },
    [Cb]
  )
var jn = { exports: {} },
  Yj = jn.exports,
  _f
function wj() {
  return (
    _f ||
      ((_f = 1),
      (function (e, a) {
        ;(function (n, r) {
          e.exports = r(R())
        })(Yj, function (n) {
          function r(t) {
            return t && typeof t == 'object' && 'default' in t ? t : { default: t }
          }
          var o = r(n),
            s = {
              name: 'mr',
              weekdays: 'रविवार_सोमवार_मंगळवार_बुधवार_गुरूवार_शुक्रवार_शनिवार'.split('_'),
              months:
                'जानेवारी_फेब्रुवारी_मार्च_एप्रिल_मे_जून_जुलै_ऑगस्ट_सप्टेंबर_ऑक्टोबर_नोव्हेंबर_डिसेंबर'.split(
                  '_'
                ),
              weekdaysShort: 'रवि_सोम_मंगळ_बुध_गुरू_शुक्र_शनि'.split('_'),
              monthsShort:
                'जाने._फेब्रु._मार्च._एप्रि._मे._जून._जुलै._ऑग._सप्टें._ऑक्टो._नोव्हें._डिसें.'.split(
                  '_'
                ),
              weekdaysMin: 'र_सो_मं_बु_गु_शु_श'.split('_'),
              ordinal: function (t) {
                return t
              },
              formats: {
                LT: 'A h:mm वाजता',
                LTS: 'A h:mm:ss वाजता',
                L: 'DD/MM/YYYY',
                LL: 'D MMMM YYYY',
                LLL: 'D MMMM YYYY, A h:mm वाजता',
                LLLL: 'dddd, D MMMM YYYY, A h:mm वाजता'
              }
            }
          return (o.default.locale(s, null, !0), s)
        })
      })(jn)),
    jn.exports
  )
}
var Ab = wj()
const xj = /* @__PURE__ */ F(Ab),
  Lj = /* @__PURE__ */ q(
    {
      __proto__: null,
      default: xj
    },
    [Ab]
  )
var Cn = { exports: {} },
  kj = Cn.exports,
  ff
function Sj() {
  return (
    ff ||
      ((ff = 1),
      (function (e, a) {
        ;(function (n, r) {
          e.exports = r(R())
        })(kj, function (n) {
          function r(t) {
            return t && typeof t == 'object' && 'default' in t ? t : { default: t }
          }
          var o = r(n),
            s = {
              name: 'ms-my',
              weekdays: 'Ahad_Isnin_Selasa_Rabu_Khamis_Jumaat_Sabtu'.split('_'),
              months:
                'Januari_Februari_Mac_April_Mei_Jun_Julai_Ogos_September_Oktober_November_Disember'.split(
                  '_'
                ),
              weekStart: 1,
              weekdaysShort: 'Ahd_Isn_Sel_Rab_Kha_Jum_Sab'.split('_'),
              monthsShort: 'Jan_Feb_Mac_Apr_Mei_Jun_Jul_Ogs_Sep_Okt_Nov_Dis'.split('_'),
              weekdaysMin: 'Ah_Is_Sl_Rb_Km_Jm_Sb'.split('_'),
              ordinal: function (t) {
                return t
              },
              formats: {
                LT: 'HH.mm',
                LTS: 'HH.mm.ss',
                L: 'DD/MM/YYYY',
                LL: 'D MMMM YYYY',
                LLL: 'D MMMM YYYY [pukul] HH.mm',
                LLLL: 'dddd, D MMMM YYYY [pukul] HH.mm'
              },
              relativeTime: {
                future: 'dalam %s',
                past: '%s yang lepas',
                s: 'beberapa saat',
                m: 'seminit',
                mm: '%d minit',
                h: 'sejam',
                hh: '%d jam',
                d: 'sehari',
                dd: '%d hari',
                M: 'sebulan',
                MM: '%d bulan',
                y: 'setahun',
                yy: '%d tahun'
              }
            }
          return (o.default.locale(s, null, !0), s)
        })
      })(Cn)),
    Cn.exports
  )
}
var qb = Sj()
const Dj = /* @__PURE__ */ F(qb),
  Ej = /* @__PURE__ */ q(
    {
      __proto__: null,
      default: Dj
    },
    [qb]
  )
var An = { exports: {} },
  Tj = An.exports,
  mf
function $j() {
  return (
    mf ||
      ((mf = 1),
      (function (e, a) {
        ;(function (n, r) {
          e.exports = r(R())
        })(Tj, function (n) {
          function r(t) {
            return t && typeof t == 'object' && 'default' in t ? t : { default: t }
          }
          var o = r(n),
            s = {
              name: 'ms',
              weekdays: 'Ahad_Isnin_Selasa_Rabu_Khamis_Jumaat_Sabtu'.split('_'),
              weekdaysShort: 'Ahd_Isn_Sel_Rab_Kha_Jum_Sab'.split('_'),
              weekdaysMin: 'Ah_Is_Sl_Rb_Km_Jm_Sb'.split('_'),
              months:
                'Januari_Februari_Mac_April_Mei_Jun_Julai_Ogos_September_Oktober_November_Disember'.split(
                  '_'
                ),
              monthsShort: 'Jan_Feb_Mac_Apr_Mei_Jun_Jul_Ogs_Sep_Okt_Nov_Dis'.split('_'),
              weekStart: 1,
              formats: {
                LT: 'HH.mm',
                LTS: 'HH.mm.ss',
                L: 'DD/MM/YYYY',
                LL: 'D MMMM YYYY',
                LLL: 'D MMMM YYYY HH.mm',
                LLLL: 'dddd, D MMMM YYYY HH.mm'
              },
              relativeTime: {
                future: 'dalam %s',
                past: '%s yang lepas',
                s: 'beberapa saat',
                m: 'seminit',
                mm: '%d minit',
                h: 'sejam',
                hh: '%d jam',
                d: 'sehari',
                dd: '%d hari',
                M: 'sebulan',
                MM: '%d bulan',
                y: 'setahun',
                yy: '%d tahun'
              },
              ordinal: function (t) {
                return t + '.'
              }
            }
          return (o.default.locale(s, null, !0), s)
        })
      })(An)),
    An.exports
  )
}
var Fb = $j()
const Hj = /* @__PURE__ */ F(Fb),
  jj = /* @__PURE__ */ q(
    {
      __proto__: null,
      default: Hj
    },
    [Fb]
  )
var qn = { exports: {} },
  Cj = qn.exports,
  pf
function Aj() {
  return (
    pf ||
      ((pf = 1),
      (function (e, a) {
        ;(function (n, r) {
          e.exports = r(R())
        })(Cj, function (n) {
          function r(t) {
            return t && typeof t == 'object' && 'default' in t ? t : { default: t }
          }
          var o = r(n),
            s = {
              name: 'mt',
              weekdays: 'Il-Ħadd_It-Tnejn_It-Tlieta_L-Erbgħa_Il-Ħamis_Il-Ġimgħa_Is-Sibt'.split('_'),
              months:
                'Jannar_Frar_Marzu_April_Mejju_Ġunju_Lulju_Awwissu_Settembru_Ottubru_Novembru_Diċembru'.split(
                  '_'
                ),
              weekStart: 1,
              weekdaysShort: 'Ħad_Tne_Tli_Erb_Ħam_Ġim_Sib'.split('_'),
              monthsShort: 'Jan_Fra_Mar_Apr_Mej_Ġun_Lul_Aww_Set_Ott_Nov_Diċ'.split('_'),
              weekdaysMin: 'Ħa_Tn_Tl_Er_Ħa_Ġi_Si'.split('_'),
              ordinal: function (t) {
                return t
              },
              formats: {
                LT: 'HH:mm',
                LTS: 'HH:mm:ss',
                L: 'DD/MM/YYYY',
                LL: 'D MMMM YYYY',
                LLL: 'D MMMM YYYY HH:mm',
                LLLL: 'dddd, D MMMM YYYY HH:mm'
              },
              relativeTime: {
                future: 'f’ %s',
                past: '%s ilu',
                s: 'ftit sekondi',
                m: 'minuta',
                mm: '%d minuti',
                h: 'siegħa',
                hh: '%d siegħat',
                d: 'ġurnata',
                dd: '%d ġranet',
                M: 'xahar',
                MM: '%d xhur',
                y: 'sena',
                yy: '%d sni'
              }
            }
          return (o.default.locale(s, null, !0), s)
        })
      })(qn)),
    qn.exports
  )
}
var Rb = Aj()
const qj = /* @__PURE__ */ F(Rb),
  Fj = /* @__PURE__ */ q(
    {
      __proto__: null,
      default: qj
    },
    [Rb]
  )
var Fn = { exports: {} },
  Rj = Fn.exports,
  hf
function Ij() {
  return (
    hf ||
      ((hf = 1),
      (function (e, a) {
        ;(function (n, r) {
          e.exports = r(R())
        })(Rj, function (n) {
          function r(t) {
            return t && typeof t == 'object' && 'default' in t ? t : { default: t }
          }
          var o = r(n),
            s = {
              name: 'my',
              weekdays: 'တနင်္ဂနွေ_တနင်္လာ_အင်္ဂါ_ဗုဒ္ဓဟူး_ကြာသပတေး_သောကြာ_စနေ'.split('_'),
              months:
                'ဇန်နဝါရီ_ဖေဖော်ဝါရီ_မတ်_ဧပြီ_မေ_ဇွန်_ဇူလိုင်_သြဂုတ်_စက်တင်ဘာ_အောက်တိုဘာ_နိုဝင်ဘာ_ဒီဇင်ဘာ'.split(
                  '_'
                ),
              weekStart: 1,
              weekdaysShort: 'နွေ_လာ_ဂါ_ဟူး_ကြာ_သော_နေ'.split('_'),
              monthsShort: 'ဇန်_ဖေ_မတ်_ပြီ_မေ_ဇွန်_လိုင်_သြ_စက်_အောက်_နို_ဒီ'.split('_'),
              weekdaysMin: 'နွေ_လာ_ဂါ_ဟူး_ကြာ_သော_နေ'.split('_'),
              ordinal: function (t) {
                return t
              },
              formats: {
                LT: 'HH:mm',
                LTS: 'HH:mm:ss',
                L: 'DD/MM/YYYY',
                LL: 'D MMMM YYYY',
                LLL: 'D MMMM YYYY HH:mm',
                LLLL: 'dddd D MMMM YYYY HH:mm'
              },
              relativeTime: {
                future: 'လာမည့် %s မှာ',
                past: 'လွန်ခဲ့သော %s က',
                s: 'စက္ကန်.အနည်းငယ်',
                m: 'တစ်မိနစ်',
                mm: '%d မိနစ်',
                h: 'တစ်နာရီ',
                hh: '%d နာရီ',
                d: 'တစ်ရက်',
                dd: '%d ရက်',
                M: 'တစ်လ',
                MM: '%d လ',
                y: 'တစ်နှစ်',
                yy: '%d နှစ်'
              }
            }
          return (o.default.locale(s, null, !0), s)
        })
      })(Fn)),
    Fn.exports
  )
}
var Ib = Ij()
const Pj = /* @__PURE__ */ F(Ib),
  Bj = /* @__PURE__ */ q(
    {
      __proto__: null,
      default: Pj
    },
    [Ib]
  )
var Rn = { exports: {} },
  Nj = Rn.exports,
  vf
function Oj() {
  return (
    vf ||
      ((vf = 1),
      (function (e, a) {
        ;(function (n, r) {
          e.exports = r(R())
        })(Nj, function (n) {
          function r(t) {
            return t && typeof t == 'object' && 'default' in t ? t : { default: t }
          }
          var o = r(n),
            s = {
              name: 'nb',
              weekdays: 'søndag_mandag_tirsdag_onsdag_torsdag_fredag_lørdag'.split('_'),
              weekdaysShort: 'sø._ma._ti._on._to._fr._lø.'.split('_'),
              weekdaysMin: 'sø_ma_ti_on_to_fr_lø'.split('_'),
              months:
                'januar_februar_mars_april_mai_juni_juli_august_september_oktober_november_desember'.split(
                  '_'
                ),
              monthsShort: 'jan._feb._mars_april_mai_juni_juli_aug._sep._okt._nov._des.'.split('_'),
              ordinal: function (t) {
                return t + '.'
              },
              weekStart: 1,
              yearStart: 4,
              formats: {
                LT: 'HH:mm',
                LTS: 'HH:mm:ss',
                L: 'DD.MM.YYYY',
                LL: 'D. MMMM YYYY',
                LLL: 'D. MMMM YYYY [kl.] HH:mm',
                LLLL: 'dddd D. MMMM YYYY [kl.] HH:mm'
              },
              relativeTime: {
                future: 'om %s',
                past: '%s siden',
                s: 'noen sekunder',
                m: 'ett minutt',
                mm: '%d minutter',
                h: 'en time',
                hh: '%d timer',
                d: 'en dag',
                dd: '%d dager',
                M: 'en måned',
                MM: '%d måneder',
                y: 'ett år',
                yy: '%d år'
              }
            }
          return (o.default.locale(s, null, !0), s)
        })
      })(Rn)),
    Rn.exports
  )
}
var Pb = Oj()
const zj = /* @__PURE__ */ F(Pb),
  Gj = /* @__PURE__ */ q(
    {
      __proto__: null,
      default: zj
    },
    [Pb]
  )
var In = { exports: {} },
  Jj = In.exports,
  yf
function Uj() {
  return (
    yf ||
      ((yf = 1),
      (function (e, a) {
        ;(function (n, r) {
          e.exports = r(R())
        })(Jj, function (n) {
          function r(t) {
            return t && typeof t == 'object' && 'default' in t ? t : { default: t }
          }
          var o = r(n),
            s = {
              name: 'ne',
              weekdays: 'आइतबार_सोमबार_मङ्गलबार_बुधबार_बिहिबार_शुक्रबार_शनिबार'.split('_'),
              weekdaysShort: 'आइत._सोम._मङ्गल._बुध._बिहि._शुक्र._शनि.'.split('_'),
              weekdaysMin: 'आ._सो._मं._बु._बि._शु._श.'.split('_'),
              months:
                'जनवरी_फेब्रुवरी_मार्च_अप्रिल_मे_जुन_जुलाई_अगष्ट_सेप्टेम्बर_अक्टोबर_नोभेम्बर_डिसेम्बर'.split(
                  '_'
                ),
              monthsShort:
                'जन._फेब्रु._मार्च_अप्रि._मई_जुन_जुलाई._अग._सेप्ट._अक्टो._नोभे._डिसे.'.split('_'),
              relativeTime: {
                future: '%s पछि',
                past: '%s अघि',
                s: 'सेकेन्ड',
                m: 'एक मिनेट',
                mm: '%d मिनेट',
                h: 'घन्टा',
                hh: '%d घन्टा',
                d: 'एक दिन',
                dd: '%d दिन',
                M: 'एक महिना',
                MM: '%d महिना',
                y: 'एक वर्ष',
                yy: '%d वर्ष'
              },
              ordinal: function (t) {
                return ('' + t).replace(/\d/g, function (i) {
                  return '०१२३४५६७८९'[i]
                })
              },
              formats: {
                LT: 'Aको h:mm बजे',
                LTS: 'Aको h:mm:ss बजे',
                L: 'DD/MM/YYYY',
                LL: 'D MMMM YYYY',
                LLL: 'D MMMM YYYY, Aको h:mm बजे',
                LLLL: 'dddd, D MMMM YYYY, Aको h:mm बजे'
              }
            }
          return (o.default.locale(s, null, !0), s)
        })
      })(In)),
    In.exports
  )
}
var Bb = Uj()
const Wj = /* @__PURE__ */ F(Bb),
  Vj = /* @__PURE__ */ q(
    {
      __proto__: null,
      default: Wj
    },
    [Bb]
  )
var Pn = { exports: {} },
  Kj = Pn.exports,
  gf
function Xj() {
  return (
    gf ||
      ((gf = 1),
      (function (e, a) {
        ;(function (n, r) {
          e.exports = r(R())
        })(Kj, function (n) {
          function r(t) {
            return t && typeof t == 'object' && 'default' in t ? t : { default: t }
          }
          var o = r(n),
            s = {
              name: 'nl-be',
              weekdays: 'zondag_maandag_dinsdag_woensdag_donderdag_vrijdag_zaterdag'.split('_'),
              months:
                'januari_februari_maart_april_mei_juni_juli_augustus_september_oktober_november_december'.split(
                  '_'
                ),
              monthsShort: 'jan._feb._mrt._apr._mei_jun._jul._aug._sep._okt._nov._dec.'.split('_'),
              weekStart: 1,
              weekdaysShort: 'zo._ma._di._wo._do._vr._za.'.split('_'),
              weekdaysMin: 'zo_ma_di_wo_do_vr_za'.split('_'),
              ordinal: function (t) {
                return t
              },
              formats: {
                LT: 'HH:mm',
                LTS: 'HH:mm:ss',
                L: 'DD/MM/YYYY',
                LL: 'D MMMM YYYY',
                LLL: 'D MMMM YYYY HH:mm',
                LLLL: 'dddd D MMMM YYYY HH:mm'
              },
              relativeTime: {
                future: 'over %s',
                past: '%s geleden',
                s: 'een paar seconden',
                m: 'één minuut',
                mm: '%d minuten',
                h: 'één uur',
                hh: '%d uur',
                d: 'één dag',
                dd: '%d dagen',
                M: 'één maand',
                MM: '%d maanden',
                y: 'één jaar',
                yy: '%d jaar'
              }
            }
          return (o.default.locale(s, null, !0), s)
        })
      })(Pn)),
    Pn.exports
  )
}
var Nb = Xj()
const Zj = /* @__PURE__ */ F(Nb),
  Qj = /* @__PURE__ */ q(
    {
      __proto__: null,
      default: Zj
    },
    [Nb]
  )
var Bn = { exports: {} },
  eC = Bn.exports,
  Mf
function tC() {
  return (
    Mf ||
      ((Mf = 1),
      (function (e, a) {
        ;(function (n, r) {
          e.exports = r(R())
        })(eC, function (n) {
          function r(t) {
            return t && typeof t == 'object' && 'default' in t ? t : { default: t }
          }
          var o = r(n),
            s = {
              name: 'nl',
              weekdays: 'zondag_maandag_dinsdag_woensdag_donderdag_vrijdag_zaterdag'.split('_'),
              weekdaysShort: 'zo._ma._di._wo._do._vr._za.'.split('_'),
              weekdaysMin: 'zo_ma_di_wo_do_vr_za'.split('_'),
              months:
                'januari_februari_maart_april_mei_juni_juli_augustus_september_oktober_november_december'.split(
                  '_'
                ),
              monthsShort: 'jan_feb_mrt_apr_mei_jun_jul_aug_sep_okt_nov_dec'.split('_'),
              ordinal: function (t) {
                return '[' + t + (t === 1 || t === 8 || t >= 20 ? 'ste' : 'de') + ']'
              },
              weekStart: 1,
              yearStart: 4,
              formats: {
                LT: 'HH:mm',
                LTS: 'HH:mm:ss',
                L: 'DD-MM-YYYY',
                LL: 'D MMMM YYYY',
                LLL: 'D MMMM YYYY HH:mm',
                LLLL: 'dddd D MMMM YYYY HH:mm'
              },
              relativeTime: {
                future: 'over %s',
                past: '%s geleden',
                s: 'een paar seconden',
                m: 'een minuut',
                mm: '%d minuten',
                h: 'een uur',
                hh: '%d uur',
                d: 'een dag',
                dd: '%d dagen',
                M: 'een maand',
                MM: '%d maanden',
                y: 'een jaar',
                yy: '%d jaar'
              }
            }
          return (o.default.locale(s, null, !0), s)
        })
      })(Bn)),
    Bn.exports
  )
}
var Ob = tC()
const rC = /* @__PURE__ */ F(Ob),
  nC = /* @__PURE__ */ q(
    {
      __proto__: null,
      default: rC
    },
    [Ob]
  )
var Nn = { exports: {} },
  aC = Nn.exports,
  bf
function oC() {
  return (
    bf ||
      ((bf = 1),
      (function (e, a) {
        ;(function (n, r) {
          e.exports = r(R())
        })(aC, function (n) {
          function r(t) {
            return t && typeof t == 'object' && 'default' in t ? t : { default: t }
          }
          var o = r(n),
            s = {
              name: 'nn',
              weekdays: 'sundag_måndag_tysdag_onsdag_torsdag_fredag_laurdag'.split('_'),
              weekdaysShort: 'sun_mån_tys_ons_tor_fre_lau'.split('_'),
              weekdaysMin: 'su_må_ty_on_to_fr_la'.split('_'),
              months:
                'januar_februar_mars_april_mai_juni_juli_august_september_oktober_november_desember'.split(
                  '_'
                ),
              monthsShort: 'jan_feb_mar_apr_mai_jun_jul_aug_sep_okt_nov_des'.split('_'),
              ordinal: function (t) {
                return t + '.'
              },
              weekStart: 1,
              relativeTime: {
                future: 'om %s',
                past: 'for %s sidan',
                s: 'nokre sekund',
                m: 'eitt minutt',
                mm: '%d minutt',
                h: 'ein time',
                hh: '%d timar',
                d: 'ein dag',
                dd: '%d dagar',
                M: 'ein månad',
                MM: '%d månadar',
                y: 'eitt år',
                yy: '%d år'
              },
              formats: {
                LT: 'HH:mm',
                LTS: 'HH:mm:ss',
                L: 'DD.MM.YYYY',
                LL: 'D. MMMM YYYY',
                LLL: 'D. MMMM YYYY [kl.] H:mm',
                LLLL: 'dddd D. MMMM YYYY [kl.] HH:mm'
              }
            }
          return (o.default.locale(s, null, !0), s)
        })
      })(Nn)),
    Nn.exports
  )
}
var zb = oC()
const sC = /* @__PURE__ */ F(zb),
  iC = /* @__PURE__ */ q(
    {
      __proto__: null,
      default: sC
    },
    [zb]
  )
var On = { exports: {} },
  uC = On.exports,
  Yf
function lC() {
  return (
    Yf ||
      ((Yf = 1),
      (function (e, a) {
        ;(function (n, r) {
          e.exports = r(R())
        })(uC, function (n) {
          function r(t) {
            return t && typeof t == 'object' && 'default' in t ? t : { default: t }
          }
          var o = r(n),
            s = {
              name: 'oc-lnc',
              weekdays: 'dimenge_diluns_dimars_dimècres_dijòus_divendres_dissabte'.split('_'),
              weekdaysShort: 'Dg_Dl_Dm_Dc_Dj_Dv_Ds'.split('_'),
              weekdaysMin: 'dg_dl_dm_dc_dj_dv_ds'.split('_'),
              months:
                'genièr_febrièr_març_abrial_mai_junh_julhet_agost_setembre_octòbre_novembre_decembre'.split(
                  '_'
                ),
              monthsShort: 'gen_feb_març_abr_mai_junh_julh_ago_set_oct_nov_dec'.split('_'),
              weekStart: 1,
              formats: {
                LT: 'H:mm',
                LTS: 'H:mm:ss',
                L: 'DD/MM/YYYY',
                LL: 'D MMMM [de] YYYY',
                LLL: 'D MMMM [de] YYYY [a] H:mm',
                LLLL: 'dddd D MMMM [de] YYYY [a] H:mm'
              },
              relativeTime: {
                future: "d'aquí %s",
                past: 'fa %s',
                s: 'unas segondas',
                m: 'una minuta',
                mm: '%d minutas',
                h: 'una ora',
                hh: '%d oras',
                d: 'un jorn',
                dd: '%d jorns',
                M: 'un mes',
                MM: '%d meses',
                y: 'un an',
                yy: '%d ans'
              },
              ordinal: function (t) {
                return t + 'º'
              }
            }
          return (o.default.locale(s, null, !0), s)
        })
      })(On)),
    On.exports
  )
}
var Gb = lC()
const dC = /* @__PURE__ */ F(Gb),
  cC = /* @__PURE__ */ q(
    {
      __proto__: null,
      default: dC
    },
    [Gb]
  )
var zn = { exports: {} },
  _C = zn.exports,
  wf
function fC() {
  return (
    wf ||
      ((wf = 1),
      (function (e, a) {
        ;(function (n, r) {
          e.exports = r(R())
        })(_C, function (n) {
          function r(t) {
            return t && typeof t == 'object' && 'default' in t ? t : { default: t }
          }
          var o = r(n),
            s = {
              name: 'pa-in',
              weekdays: 'ਐਤਵਾਰ_ਸੋਮਵਾਰ_ਮੰਗਲਵਾਰ_ਬੁਧਵਾਰ_ਵੀਰਵਾਰ_ਸ਼ੁੱਕਰਵਾਰ_ਸ਼ਨੀਚਰਵਾਰ'.split('_'),
              months: 'ਜਨਵਰੀ_ਫ਼ਰਵਰੀ_ਮਾਰਚ_ਅਪ੍ਰੈਲ_ਮਈ_ਜੂਨ_ਜੁਲਾਈ_ਅਗਸਤ_ਸਤੰਬਰ_ਅਕਤੂਬਰ_ਨਵੰਬਰ_ਦਸੰਬਰ'.split(
                '_'
              ),
              weekdaysShort: 'ਐਤ_ਸੋਮ_ਮੰਗਲ_ਬੁਧ_ਵੀਰ_ਸ਼ੁਕਰ_ਸ਼ਨੀ'.split('_'),
              monthsShort:
                'ਜਨਵਰੀ_ਫ਼ਰਵਰੀ_ਮਾਰਚ_ਅਪ੍ਰੈਲ_ਮਈ_ਜੂਨ_ਜੁਲਾਈ_ਅਗਸਤ_ਸਤੰਬਰ_ਅਕਤੂਬਰ_ਨਵੰਬਰ_ਦਸੰਬਰ'.split('_'),
              weekdaysMin: 'ਐਤ_ਸੋਮ_ਮੰਗਲ_ਬੁਧ_ਵੀਰ_ਸ਼ੁਕਰ_ਸ਼ਨੀ'.split('_'),
              ordinal: function (t) {
                return t
              },
              formats: {
                LT: 'A h:mm ਵਜੇ',
                LTS: 'A h:mm:ss ਵਜੇ',
                L: 'DD/MM/YYYY',
                LL: 'D MMMM YYYY',
                LLL: 'D MMMM YYYY, A h:mm ਵਜੇ',
                LLLL: 'dddd, D MMMM YYYY, A h:mm ਵਜੇ'
              },
              relativeTime: {
                future: '%s ਵਿੱਚ',
                past: '%s ਪਿਛਲੇ',
                s: 'ਕੁਝ ਸਕਿੰਟ',
                m: 'ਇਕ ਮਿੰਟ',
                mm: '%d ਮਿੰਟ',
                h: 'ਇੱਕ ਘੰਟਾ',
                hh: '%d ਘੰਟੇ',
                d: 'ਇੱਕ ਦਿਨ',
                dd: '%d ਦਿਨ',
                M: 'ਇੱਕ ਮਹੀਨਾ',
                MM: '%d ਮਹੀਨੇ',
                y: 'ਇੱਕ ਸਾਲ',
                yy: '%d ਸਾਲ'
              }
            }
          return (o.default.locale(s, null, !0), s)
        })
      })(zn)),
    zn.exports
  )
}
var Jb = fC()
const mC = /* @__PURE__ */ F(Jb),
  pC = /* @__PURE__ */ q(
    {
      __proto__: null,
      default: mC
    },
    [Jb]
  )
var Gn = { exports: {} },
  hC = Gn.exports,
  xf
function vC() {
  return (
    xf ||
      ((xf = 1),
      (function (e, a) {
        ;(function (n, r) {
          e.exports = r(R())
        })(hC, function (n) {
          function r(_) {
            return _ && typeof _ == 'object' && 'default' in _ ? _ : { default: _ }
          }
          var o = r(n)
          function s(_) {
            return _ % 10 < 5 && _ % 10 > 1 && ~~(_ / 10) % 10 != 1
          }
          function t(_, f, m) {
            var h = _ + ' '
            switch (m) {
              case 'm':
                return f ? 'minuta' : 'minutę'
              case 'mm':
                return h + (s(_) ? 'minuty' : 'minut')
              case 'h':
                return f ? 'godzina' : 'godzinę'
              case 'hh':
                return h + (s(_) ? 'godziny' : 'godzin')
              case 'MM':
                return h + (s(_) ? 'miesiące' : 'miesięcy')
              case 'yy':
                return h + (s(_) ? 'lata' : 'lat')
            }
          }
          var i =
              'stycznia_lutego_marca_kwietnia_maja_czerwca_lipca_sierpnia_września_października_listopada_grudnia'.split(
                '_'
              ),
            u =
              'styczeń_luty_marzec_kwiecień_maj_czerwiec_lipiec_sierpień_wrzesień_październik_listopad_grudzień'.split(
                '_'
              ),
            l = /D MMMM/,
            d = function (_, f) {
              return l.test(f) ? i[_.month()] : u[_.month()]
            }
          ;((d.s = u), (d.f = i))
          var c = {
            name: 'pl',
            weekdays: 'niedziela_poniedziałek_wtorek_środa_czwartek_piątek_sobota'.split('_'),
            weekdaysShort: 'ndz_pon_wt_śr_czw_pt_sob'.split('_'),
            weekdaysMin: 'Nd_Pn_Wt_Śr_Cz_Pt_So'.split('_'),
            months: d,
            monthsShort: 'sty_lut_mar_kwi_maj_cze_lip_sie_wrz_paź_lis_gru'.split('_'),
            ordinal: function (_) {
              return _ + '.'
            },
            weekStart: 1,
            yearStart: 4,
            relativeTime: {
              future: 'za %s',
              past: '%s temu',
              s: 'kilka sekund',
              m: t,
              mm: t,
              h: t,
              hh: t,
              d: '1 dzień',
              dd: '%d dni',
              M: 'miesiąc',
              MM: t,
              y: 'rok',
              yy: t
            },
            formats: {
              LT: 'HH:mm',
              LTS: 'HH:mm:ss',
              L: 'DD.MM.YYYY',
              LL: 'D MMMM YYYY',
              LLL: 'D MMMM YYYY HH:mm',
              LLLL: 'dddd, D MMMM YYYY HH:mm'
            }
          }
          return (o.default.locale(c, null, !0), c)
        })
      })(Gn)),
    Gn.exports
  )
}
var Ub = vC()
const yC = /* @__PURE__ */ F(Ub),
  gC = /* @__PURE__ */ q(
    {
      __proto__: null,
      default: yC
    },
    [Ub]
  )
var Jn = { exports: {} },
  MC = Jn.exports,
  Lf
function bC() {
  return (
    Lf ||
      ((Lf = 1),
      (function (e, a) {
        ;(function (n, r) {
          e.exports = r(R())
        })(MC, function (n) {
          function r(t) {
            return t && typeof t == 'object' && 'default' in t ? t : { default: t }
          }
          var o = r(n),
            s = {
              name: 'pt-br',
              weekdays:
                'domingo_segunda-feira_terça-feira_quarta-feira_quinta-feira_sexta-feira_sábado'.split(
                  '_'
                ),
              weekdaysShort: 'dom_seg_ter_qua_qui_sex_sáb'.split('_'),
              weekdaysMin: 'Do_2ª_3ª_4ª_5ª_6ª_Sá'.split('_'),
              months:
                'janeiro_fevereiro_março_abril_maio_junho_julho_agosto_setembro_outubro_novembro_dezembro'.split(
                  '_'
                ),
              monthsShort: 'jan_fev_mar_abr_mai_jun_jul_ago_set_out_nov_dez'.split('_'),
              ordinal: function (t) {
                return t + 'º'
              },
              formats: {
                LT: 'HH:mm',
                LTS: 'HH:mm:ss',
                L: 'DD/MM/YYYY',
                LL: 'D [de] MMMM [de] YYYY',
                LLL: 'D [de] MMMM [de] YYYY [às] HH:mm',
                LLLL: 'dddd, D [de] MMMM [de] YYYY [às] HH:mm'
              },
              relativeTime: {
                future: 'em %s',
                past: 'há %s',
                s: 'poucos segundos',
                m: 'um minuto',
                mm: '%d minutos',
                h: 'uma hora',
                hh: '%d horas',
                d: 'um dia',
                dd: '%d dias',
                M: 'um mês',
                MM: '%d meses',
                y: 'um ano',
                yy: '%d anos'
              }
            }
          return (o.default.locale(s, null, !0), s)
        })
      })(Jn)),
    Jn.exports
  )
}
var Wb = bC()
const YC = /* @__PURE__ */ F(Wb),
  wC = /* @__PURE__ */ q(
    {
      __proto__: null,
      default: YC
    },
    [Wb]
  )
var Un = { exports: {} },
  xC = Un.exports,
  kf
function LC() {
  return (
    kf ||
      ((kf = 1),
      (function (e, a) {
        ;(function (n, r) {
          e.exports = r(R())
        })(xC, function (n) {
          function r(t) {
            return t && typeof t == 'object' && 'default' in t ? t : { default: t }
          }
          var o = r(n),
            s = {
              name: 'pt',
              weekdays:
                'domingo_segunda-feira_terça-feira_quarta-feira_quinta-feira_sexta-feira_sábado'.split(
                  '_'
                ),
              weekdaysShort: 'dom_seg_ter_qua_qui_sex_sab'.split('_'),
              weekdaysMin: 'Do_2ª_3ª_4ª_5ª_6ª_Sa'.split('_'),
              months:
                'janeiro_fevereiro_março_abril_maio_junho_julho_agosto_setembro_outubro_novembro_dezembro'.split(
                  '_'
                ),
              monthsShort: 'jan_fev_mar_abr_mai_jun_jul_ago_set_out_nov_dez'.split('_'),
              ordinal: function (t) {
                return t + 'º'
              },
              weekStart: 1,
              yearStart: 4,
              formats: {
                LT: 'HH:mm',
                LTS: 'HH:mm:ss',
                L: 'DD/MM/YYYY',
                LL: 'D [de] MMMM [de] YYYY',
                LLL: 'D [de] MMMM [de] YYYY [às] HH:mm',
                LLLL: 'dddd, D [de] MMMM [de] YYYY [às] HH:mm'
              },
              relativeTime: {
                future: 'em %s',
                past: 'há %s',
                s: 'alguns segundos',
                m: 'um minuto',
                mm: '%d minutos',
                h: 'uma hora',
                hh: '%d horas',
                d: 'um dia',
                dd: '%d dias',
                M: 'um mês',
                MM: '%d meses',
                y: 'um ano',
                yy: '%d anos'
              }
            }
          return (o.default.locale(s, null, !0), s)
        })
      })(Un)),
    Un.exports
  )
}
var Vb = LC()
const kC = /* @__PURE__ */ F(Vb),
  SC = /* @__PURE__ */ q(
    {
      __proto__: null,
      default: kC
    },
    [Vb]
  )
var Wn = { exports: {} },
  DC = Wn.exports,
  Sf
function EC() {
  return (
    Sf ||
      ((Sf = 1),
      (function (e, a) {
        ;(function (n, r) {
          e.exports = r(R())
        })(DC, function (n) {
          function r(t) {
            return t && typeof t == 'object' && 'default' in t ? t : { default: t }
          }
          var o = r(n),
            s = {
              name: 'rn',
              weekdays:
                'Ku wa Mungu_Ku wa Mbere_Ku wa Kabiri_Ku wa Gatatu_Ku wa Kane_Ku wa Gatanu_Ku wa Gatandatu'.split(
                  '_'
                ),
              weekdaysShort: 'Kngu_Kmbr_Kbri_Ktat_Kkan_Ktan_Kdat'.split('_'),
              weekdaysMin: 'K7_K1_K2_K3_K4_K5_K6'.split('_'),
              months:
                'Nzero_Ruhuhuma_Ntwarante_Ndamukiza_Rusama_Ruhenshi_Mukakaro_Myandagaro_Nyakanga_Gitugutu_Munyonyo_Kigarama'.split(
                  '_'
                ),
              monthsShort: 'Nzer_Ruhuh_Ntwar_Ndam_Rus_Ruhen_Muk_Myand_Nyak_Git_Muny_Kig'.split('_'),
              weekStart: 1,
              ordinal: function (t) {
                return t
              },
              relativeTime: {
                future: 'mu %s',
                past: '%s',
                s: 'amasegonda',
                m: 'Umunota',
                mm: '%d iminota',
                h: 'isaha',
                hh: '%d amasaha',
                d: 'Umunsi',
                dd: '%d iminsi',
                M: 'ukwezi',
                MM: '%d amezi',
                y: 'umwaka',
                yy: '%d imyaka'
              },
              formats: {
                LT: 'HH:mm',
                LTS: 'HH:mm:ss',
                L: 'DD/MM/YYYY',
                LL: 'D MMMM YYYY',
                LLL: 'D MMMM YYYY HH:mm',
                LLLL: 'dddd, D MMMM YYYY HH:mm'
              }
            }
          return (o.default.locale(s, null, !0), s)
        })
      })(Wn)),
    Wn.exports
  )
}
var Kb = EC()
const TC = /* @__PURE__ */ F(Kb),
  $C = /* @__PURE__ */ q(
    {
      __proto__: null,
      default: TC
    },
    [Kb]
  )
var Vn = { exports: {} },
  HC = Vn.exports,
  Df
function jC() {
  return (
    Df ||
      ((Df = 1),
      (function (e, a) {
        ;(function (n, r) {
          e.exports = r(R())
        })(HC, function (n) {
          function r(t) {
            return t && typeof t == 'object' && 'default' in t ? t : { default: t }
          }
          var o = r(n),
            s = {
              name: 'ro',
              weekdays: 'Duminică_Luni_Marți_Miercuri_Joi_Vineri_Sâmbătă'.split('_'),
              weekdaysShort: 'Dum_Lun_Mar_Mie_Joi_Vin_Sâm'.split('_'),
              weekdaysMin: 'Du_Lu_Ma_Mi_Jo_Vi_Sâ'.split('_'),
              months:
                'Ianuarie_Februarie_Martie_Aprilie_Mai_Iunie_Iulie_August_Septembrie_Octombrie_Noiembrie_Decembrie'.split(
                  '_'
                ),
              monthsShort: 'Ian._Febr._Mart._Apr._Mai_Iun._Iul._Aug._Sept._Oct._Nov._Dec.'.split(
                '_'
              ),
              weekStart: 1,
              formats: {
                LT: 'H:mm',
                LTS: 'H:mm:ss',
                L: 'DD.MM.YYYY',
                LL: 'D MMMM YYYY',
                LLL: 'D MMMM YYYY H:mm',
                LLLL: 'dddd, D MMMM YYYY H:mm'
              },
              relativeTime: {
                future: 'peste %s',
                past: 'acum %s',
                s: 'câteva secunde',
                m: 'un minut',
                mm: '%d minute',
                h: 'o oră',
                hh: '%d ore',
                d: 'o zi',
                dd: '%d zile',
                M: 'o lună',
                MM: '%d luni',
                y: 'un an',
                yy: '%d ani'
              },
              ordinal: function (t) {
                return t
              }
            }
          return (o.default.locale(s, null, !0), s)
        })
      })(Vn)),
    Vn.exports
  )
}
var Xb = jC()
const CC = /* @__PURE__ */ F(Xb),
  AC = /* @__PURE__ */ q(
    {
      __proto__: null,
      default: CC
    },
    [Xb]
  )
var Kn = { exports: {} },
  qC = Kn.exports,
  Ef
function FC() {
  return (
    Ef ||
      ((Ef = 1),
      (function (e, a) {
        ;(function (n, r) {
          e.exports = r(R())
        })(qC, function (n) {
          function r(m) {
            return m && typeof m == 'object' && 'default' in m ? m : { default: m }
          }
          var o = r(n),
            s =
              'января_февраля_марта_апреля_мая_июня_июля_августа_сентября_октября_ноября_декабря'.split(
                '_'
              ),
            t =
              'январь_февраль_март_апрель_май_июнь_июль_август_сентябрь_октябрь_ноябрь_декабрь'.split(
                '_'
              ),
            i = 'янв._февр._мар._апр._мая_июня_июля_авг._сент._окт._нояб._дек.'.split('_'),
            u = 'янв._февр._март_апр._май_июнь_июль_авг._сент._окт._нояб._дек.'.split('_'),
            l = /D[oD]?(\[[^[\]]*\]|\s)+MMMM?/
          function d(m, h, y) {
            var p, v
            return y === 'm'
              ? h
                ? 'минута'
                : 'минуту'
              : m +
                  ' ' +
                  ((p = +m),
                  (v = {
                    mm: h ? 'минута_минуты_минут' : 'минуту_минуты_минут',
                    hh: 'час_часа_часов',
                    dd: 'день_дня_дней',
                    MM: 'месяц_месяца_месяцев',
                    yy: 'год_года_лет'
                  }[y].split('_')),
                  p % 10 == 1 && p % 100 != 11
                    ? v[0]
                    : p % 10 >= 2 && p % 10 <= 4 && (p % 100 < 10 || p % 100 >= 20)
                      ? v[1]
                      : v[2])
          }
          var c = function (m, h) {
            return l.test(h) ? s[m.month()] : t[m.month()]
          }
          ;((c.s = t), (c.f = s))
          var _ = function (m, h) {
            return l.test(h) ? i[m.month()] : u[m.month()]
          }
          ;((_.s = u), (_.f = i))
          var f = {
            name: 'ru',
            weekdays: 'воскресенье_понедельник_вторник_среда_четверг_пятница_суббота'.split('_'),
            weekdaysShort: 'вск_пнд_втр_срд_чтв_птн_сбт'.split('_'),
            weekdaysMin: 'вс_пн_вт_ср_чт_пт_сб'.split('_'),
            months: c,
            monthsShort: _,
            weekStart: 1,
            yearStart: 4,
            formats: {
              LT: 'H:mm',
              LTS: 'H:mm:ss',
              L: 'DD.MM.YYYY',
              LL: 'D MMMM YYYY г.',
              LLL: 'D MMMM YYYY г., H:mm',
              LLLL: 'dddd, D MMMM YYYY г., H:mm'
            },
            relativeTime: {
              future: 'через %s',
              past: '%s назад',
              s: 'несколько секунд',
              m: d,
              mm: d,
              h: 'час',
              hh: d,
              d: 'день',
              dd: d,
              M: 'месяц',
              MM: d,
              y: 'год',
              yy: d
            },
            ordinal: function (m) {
              return m
            },
            meridiem: function (m) {
              return m < 4 ? 'ночи' : m < 12 ? 'утра' : m < 17 ? 'дня' : 'вечера'
            }
          }
          return (o.default.locale(f, null, !0), f)
        })
      })(Kn)),
    Kn.exports
  )
}
var Zb = FC()
const RC = /* @__PURE__ */ F(Zb),
  IC = /* @__PURE__ */ q(
    {
      __proto__: null,
      default: RC
    },
    [Zb]
  )
var Xn = { exports: {} },
  PC = Xn.exports,
  Tf
function BC() {
  return (
    Tf ||
      ((Tf = 1),
      (function (e, a) {
        ;(function (n, r) {
          e.exports = r(R())
        })(PC, function (n) {
          function r(t) {
            return t && typeof t == 'object' && 'default' in t ? t : { default: t }
          }
          var o = r(n),
            s = {
              name: 'rw',
              weekdays:
                'Ku Cyumweru_Kuwa Mbere_Kuwa Kabiri_Kuwa Gatatu_Kuwa Kane_Kuwa Gatanu_Kuwa Gatandatu'.split(
                  '_'
                ),
              months:
                'Mutarama_Gashyantare_Werurwe_Mata_Gicurasi_Kamena_Nyakanga_Kanama_Nzeri_Ukwakira_Ugushyingo_Ukuboza'.split(
                  '_'
                ),
              relativeTime: {
                future: 'mu %s',
                past: '%s',
                s: 'amasegonda',
                m: 'Umunota',
                mm: '%d iminota',
                h: 'isaha',
                hh: '%d amasaha',
                d: 'Umunsi',
                dd: '%d iminsi',
                M: 'ukwezi',
                MM: '%d amezi',
                y: 'umwaka',
                yy: '%d imyaka'
              },
              formats: {
                LT: 'HH:mm',
                LTS: 'HH:mm:ss',
                L: 'DD/MM/YYYY',
                LL: 'D MMMM YYYY',
                LLL: 'D MMMM YYYY HH:mm',
                LLLL: 'dddd, D MMMM YYYY HH:mm'
              },
              ordinal: function (t) {
                return t
              }
            }
          return (o.default.locale(s, null, !0), s)
        })
      })(Xn)),
    Xn.exports
  )
}
var Qb = BC()
const NC = /* @__PURE__ */ F(Qb),
  OC = /* @__PURE__ */ q(
    {
      __proto__: null,
      default: NC
    },
    [Qb]
  )
var Zn = { exports: {} },
  zC = Zn.exports,
  $f
function GC() {
  return (
    $f ||
      (($f = 1),
      (function (e, a) {
        ;(function (n, r) {
          e.exports = r(R())
        })(zC, function (n) {
          function r(t) {
            return t && typeof t == 'object' && 'default' in t ? t : { default: t }
          }
          var o = r(n),
            s = {
              name: 'sd',
              weekdays: 'آچر_سومر_اڱارو_اربع_خميس_جمع_ڇنڇر'.split('_'),
              months:
                'جنوري_فيبروري_مارچ_اپريل_مئي_جون_جولاءِ_آگسٽ_سيپٽمبر_آڪٽوبر_نومبر_ڊسمبر'.split(
                  '_'
                ),
              weekStart: 1,
              weekdaysShort: 'آچر_سومر_اڱارو_اربع_خميس_جمع_ڇنڇر'.split('_'),
              monthsShort:
                'جنوري_فيبروري_مارچ_اپريل_مئي_جون_جولاءِ_آگسٽ_سيپٽمبر_آڪٽوبر_نومبر_ڊسمبر'.split(
                  '_'
                ),
              weekdaysMin: 'آچر_سومر_اڱارو_اربع_خميس_جمع_ڇنڇر'.split('_'),
              ordinal: function (t) {
                return t
              },
              formats: {
                LT: 'HH:mm',
                LTS: 'HH:mm:ss',
                L: 'DD/MM/YYYY',
                LL: 'D MMMM YYYY',
                LLL: 'D MMMM YYYY HH:mm',
                LLLL: 'dddd، D MMMM YYYY HH:mm'
              },
              relativeTime: {
                future: '%s پوء',
                past: '%s اڳ',
                s: 'چند سيڪنڊ',
                m: 'هڪ منٽ',
                mm: '%d منٽ',
                h: 'هڪ ڪلاڪ',
                hh: '%d ڪلاڪ',
                d: 'هڪ ڏينهن',
                dd: '%d ڏينهن',
                M: 'هڪ مهينو',
                MM: '%d مهينا',
                y: 'هڪ سال',
                yy: '%d سال'
              }
            }
          return (o.default.locale(s, null, !0), s)
        })
      })(Zn)),
    Zn.exports
  )
}
var eY = GC()
const JC = /* @__PURE__ */ F(eY),
  UC = /* @__PURE__ */ q(
    {
      __proto__: null,
      default: JC
    },
    [eY]
  )
var Qn = { exports: {} },
  WC = Qn.exports,
  Hf
function VC() {
  return (
    Hf ||
      ((Hf = 1),
      (function (e, a) {
        ;(function (n, r) {
          e.exports = r(R())
        })(WC, function (n) {
          function r(t) {
            return t && typeof t == 'object' && 'default' in t ? t : { default: t }
          }
          var o = r(n),
            s = {
              name: 'se',
              weekdays:
                'sotnabeaivi_vuossárga_maŋŋebárga_gaskavahkku_duorastat_bearjadat_lávvardat'.split(
                  '_'
                ),
              months:
                'ođđajagemánnu_guovvamánnu_njukčamánnu_cuoŋománnu_miessemánnu_geassemánnu_suoidnemánnu_borgemánnu_čakčamánnu_golggotmánnu_skábmamánnu_juovlamánnu'.split(
                  '_'
                ),
              weekStart: 1,
              weekdaysShort: 'sotn_vuos_maŋ_gask_duor_bear_láv'.split('_'),
              monthsShort: 'ođđj_guov_njuk_cuo_mies_geas_suoi_borg_čakč_golg_skáb_juov'.split('_'),
              weekdaysMin: 's_v_m_g_d_b_L'.split('_'),
              ordinal: function (t) {
                return t
              },
              formats: {
                LT: 'HH:mm',
                LTS: 'HH:mm:ss',
                L: 'DD.MM.YYYY',
                LL: 'MMMM D. [b.] YYYY',
                LLL: 'MMMM D. [b.] YYYY [ti.] HH:mm',
                LLLL: 'dddd, MMMM D. [b.] YYYY [ti.] HH:mm'
              },
              relativeTime: {
                future: '%s geažes',
                past: 'maŋit %s',
                s: 'moadde sekunddat',
                m: 'okta minuhta',
                mm: '%d minuhtat',
                h: 'okta diimmu',
                hh: '%d diimmut',
                d: 'okta beaivi',
                dd: '%d beaivvit',
                M: 'okta mánnu',
                MM: '%d mánut',
                y: 'okta jahki',
                yy: '%d jagit'
              }
            }
          return (o.default.locale(s, null, !0), s)
        })
      })(Qn)),
    Qn.exports
  )
}
var tY = VC()
const KC = /* @__PURE__ */ F(tY),
  XC = /* @__PURE__ */ q(
    {
      __proto__: null,
      default: KC
    },
    [tY]
  )
var ea = { exports: {} },
  ZC = ea.exports,
  jf
function QC() {
  return (
    jf ||
      ((jf = 1),
      (function (e, a) {
        ;(function (n, r) {
          e.exports = r(R())
        })(ZC, function (n) {
          function r(t) {
            return t && typeof t == 'object' && 'default' in t ? t : { default: t }
          }
          var o = r(n),
            s = {
              name: 'si',
              weekdays: 'ඉරිදා_සඳුදා_අඟහරුවාදා_බදාදා_බ්‍රහස්පතින්දා_සිකුරාදා_සෙනසුරාදා'.split('_'),
              months: 'දුරුතු_නවම්_මැදින්_බක්_වෙසක්_පොසොන්_ඇසළ_නිකිණි_බිනර_වප්_ඉල්_උඳුවප්'.split(
                '_'
              ),
              weekdaysShort: 'ඉරි_සඳු_අඟ_බදා_බ්‍රහ_සිකු_සෙන'.split('_'),
              monthsShort: 'දුරු_නව_මැදි_බක්_වෙස_පොසො_ඇස_නිකි_බින_වප්_ඉල්_උඳු'.split('_'),
              weekdaysMin: 'ඉ_ස_අ_බ_බ්‍ර_සි_සෙ'.split('_'),
              ordinal: function (t) {
                return t
              },
              formats: {
                LT: 'a h:mm',
                LTS: 'a h:mm:ss',
                L: 'YYYY/MM/DD',
                LL: 'YYYY MMMM D',
                LLL: 'YYYY MMMM D, a h:mm',
                LLLL: 'YYYY MMMM D [වැනි] dddd, a h:mm:ss'
              },
              relativeTime: {
                future: '%sකින්',
                past: '%sකට පෙර',
                s: 'තත්පර කිහිපය',
                m: 'විනාඩිය',
                mm: 'විනාඩි %d',
                h: 'පැය',
                hh: 'පැය %d',
                d: 'දිනය',
                dd: 'දින %d',
                M: 'මාසය',
                MM: 'මාස %d',
                y: 'වසර',
                yy: 'වසර %d'
              }
            }
          return (o.default.locale(s, null, !0), s)
        })
      })(ea)),
    ea.exports
  )
}
var rY = QC()
const eA = /* @__PURE__ */ F(rY),
  tA = /* @__PURE__ */ q(
    {
      __proto__: null,
      default: eA
    },
    [rY]
  )
var ta = { exports: {} },
  rA = ta.exports,
  Cf
function nA() {
  return (
    Cf ||
      ((Cf = 1),
      (function (e, a) {
        ;(function (n, r) {
          e.exports = r(R())
        })(rA, function (n) {
          function r(u) {
            return u && typeof u == 'object' && 'default' in u ? u : { default: u }
          }
          var o = r(n)
          function s(u) {
            return u > 1 && u < 5 && ~~(u / 10) != 1
          }
          function t(u, l, d, c) {
            var _ = u + ' '
            switch (d) {
              case 's':
                return l || c ? 'pár sekúnd' : 'pár sekundami'
              case 'm':
                return l ? 'minúta' : c ? 'minútu' : 'minútou'
              case 'mm':
                return l || c ? _ + (s(u) ? 'minúty' : 'minút') : _ + 'minútami'
              case 'h':
                return l ? 'hodina' : c ? 'hodinu' : 'hodinou'
              case 'hh':
                return l || c ? _ + (s(u) ? 'hodiny' : 'hodín') : _ + 'hodinami'
              case 'd':
                return l || c ? 'deň' : 'dňom'
              case 'dd':
                return l || c ? _ + (s(u) ? 'dni' : 'dní') : _ + 'dňami'
              case 'M':
                return l || c ? 'mesiac' : 'mesiacom'
              case 'MM':
                return l || c ? _ + (s(u) ? 'mesiace' : 'mesiacov') : _ + 'mesiacmi'
              case 'y':
                return l || c ? 'rok' : 'rokom'
              case 'yy':
                return l || c ? _ + (s(u) ? 'roky' : 'rokov') : _ + 'rokmi'
            }
          }
          var i = {
            name: 'sk',
            weekdays: 'nedeľa_pondelok_utorok_streda_štvrtok_piatok_sobota'.split('_'),
            weekdaysShort: 'ne_po_ut_st_št_pi_so'.split('_'),
            weekdaysMin: 'ne_po_ut_st_št_pi_so'.split('_'),
            months:
              'január_február_marec_apríl_máj_jún_júl_august_september_október_november_december'.split(
                '_'
              ),
            monthsShort: 'jan_feb_mar_apr_máj_jún_júl_aug_sep_okt_nov_dec'.split('_'),
            weekStart: 1,
            yearStart: 4,
            ordinal: function (u) {
              return u + '.'
            },
            formats: {
              LT: 'H:mm',
              LTS: 'H:mm:ss',
              L: 'DD.MM.YYYY',
              LL: 'D. MMMM YYYY',
              LLL: 'D. MMMM YYYY H:mm',
              LLLL: 'dddd D. MMMM YYYY H:mm',
              l: 'D. M. YYYY'
            },
            relativeTime: {
              future: 'za %s',
              past: 'pred %s',
              s: t,
              m: t,
              mm: t,
              h: t,
              hh: t,
              d: t,
              dd: t,
              M: t,
              MM: t,
              y: t,
              yy: t
            }
          }
          return (o.default.locale(i, null, !0), i)
        })
      })(ta)),
    ta.exports
  )
}
var nY = nA()
const aA = /* @__PURE__ */ F(nY),
  oA = /* @__PURE__ */ q(
    {
      __proto__: null,
      default: aA
    },
    [nY]
  )
var ra = { exports: {} },
  sA = ra.exports,
  Af
function iA() {
  return (
    Af ||
      ((Af = 1),
      (function (e, a) {
        ;(function (n, r) {
          e.exports = r(R())
        })(sA, function (n) {
          function r(l) {
            return l && typeof l == 'object' && 'default' in l ? l : { default: l }
          }
          var o = r(n)
          function s(l) {
            return l % 100 == 2
          }
          function t(l) {
            return l % 100 == 3 || l % 100 == 4
          }
          function i(l, d, c, _) {
            var f = l + ' '
            switch (c) {
              case 's':
                return d || _ ? 'nekaj sekund' : 'nekaj sekundami'
              case 'm':
                return d ? 'ena minuta' : 'eno minuto'
              case 'mm':
                return s(l)
                  ? f + (d || _ ? 'minuti' : 'minutama')
                  : t(l)
                    ? f + (d || _ ? 'minute' : 'minutami')
                    : f + (d || _ ? 'minut' : 'minutami')
              case 'h':
                return d ? 'ena ura' : 'eno uro'
              case 'hh':
                return s(l)
                  ? f + (d || _ ? 'uri' : 'urama')
                  : t(l)
                    ? f + (d || _ ? 'ure' : 'urami')
                    : f + (d || _ ? 'ur' : 'urami')
              case 'd':
                return d || _ ? 'en dan' : 'enim dnem'
              case 'dd':
                return s(l) ? f + (d || _ ? 'dneva' : 'dnevoma') : f + (d || _ ? 'dni' : 'dnevi')
              case 'M':
                return d || _ ? 'en mesec' : 'enim mesecem'
              case 'MM':
                return s(l)
                  ? f + (d || _ ? 'meseca' : 'mesecema')
                  : t(l)
                    ? f + (d || _ ? 'mesece' : 'meseci')
                    : f + (d || _ ? 'mesecev' : 'meseci')
              case 'y':
                return d || _ ? 'eno leto' : 'enim letom'
              case 'yy':
                return s(l)
                  ? f + (d || _ ? 'leti' : 'letoma')
                  : t(l)
                    ? f + (d || _ ? 'leta' : 'leti')
                    : f + (d || _ ? 'let' : 'leti')
            }
          }
          var u = {
            name: 'sl',
            weekdays: 'nedelja_ponedeljek_torek_sreda_četrtek_petek_sobota'.split('_'),
            months:
              'januar_februar_marec_april_maj_junij_julij_avgust_september_oktober_november_december'.split(
                '_'
              ),
            weekStart: 1,
            weekdaysShort: 'ned._pon._tor._sre._čet._pet._sob.'.split('_'),
            monthsShort: 'jan._feb._mar._apr._maj._jun._jul._avg._sep._okt._nov._dec.'.split('_'),
            weekdaysMin: 'ne_po_to_sr_če_pe_so'.split('_'),
            ordinal: function (l) {
              return l + '.'
            },
            formats: {
              LT: 'H:mm',
              LTS: 'H:mm:ss',
              L: 'DD.MM.YYYY',
              LL: 'D. MMMM YYYY',
              LLL: 'D. MMMM YYYY H:mm',
              LLLL: 'dddd, D. MMMM YYYY H:mm',
              l: 'D. M. YYYY'
            },
            relativeTime: {
              future: 'čez %s',
              past: 'pred %s',
              s: i,
              m: i,
              mm: i,
              h: i,
              hh: i,
              d: i,
              dd: i,
              M: i,
              MM: i,
              y: i,
              yy: i
            }
          }
          return (o.default.locale(u, null, !0), u)
        })
      })(ra)),
    ra.exports
  )
}
var aY = iA()
const uA = /* @__PURE__ */ F(aY),
  lA = /* @__PURE__ */ q(
    {
      __proto__: null,
      default: uA
    },
    [aY]
  )
var na = { exports: {} },
  dA = na.exports,
  qf
function cA() {
  return (
    qf ||
      ((qf = 1),
      (function (e, a) {
        ;(function (n, r) {
          e.exports = r(R())
        })(dA, function (n) {
          function r(t) {
            return t && typeof t == 'object' && 'default' in t ? t : { default: t }
          }
          var o = r(n),
            s = {
              name: 'sq',
              weekdays: 'E Diel_E Hënë_E Martë_E Mërkurë_E Enjte_E Premte_E Shtunë'.split('_'),
              months:
                'Janar_Shkurt_Mars_Prill_Maj_Qershor_Korrik_Gusht_Shtator_Tetor_Nëntor_Dhjetor'.split(
                  '_'
                ),
              weekStart: 1,
              weekdaysShort: 'Die_Hën_Mar_Mër_Enj_Pre_Sht'.split('_'),
              monthsShort: 'Jan_Shk_Mar_Pri_Maj_Qer_Kor_Gus_Sht_Tet_Nën_Dhj'.split('_'),
              weekdaysMin: 'D_H_Ma_Më_E_P_Sh'.split('_'),
              ordinal: function (t) {
                return t
              },
              formats: {
                LT: 'HH:mm',
                LTS: 'HH:mm:ss',
                L: 'DD/MM/YYYY',
                LL: 'D MMMM YYYY',
                LLL: 'D MMMM YYYY HH:mm',
                LLLL: 'dddd, D MMMM YYYY HH:mm'
              },
              relativeTime: {
                future: 'në %s',
                past: '%s më parë',
                s: 'disa sekonda',
                m: 'një minutë',
                mm: '%d minuta',
                h: 'një orë',
                hh: '%d orë',
                d: 'një ditë',
                dd: '%d ditë',
                M: 'një muaj',
                MM: '%d muaj',
                y: 'një vit',
                yy: '%d vite'
              }
            }
          return (o.default.locale(s, null, !0), s)
        })
      })(na)),
    na.exports
  )
}
var oY = cA()
const _A = /* @__PURE__ */ F(oY),
  fA = /* @__PURE__ */ q(
    {
      __proto__: null,
      default: _A
    },
    [oY]
  )
var aa = { exports: {} },
  mA = aa.exports,
  Ff
function pA() {
  return (
    Ff ||
      ((Ff = 1),
      (function (e, a) {
        ;(function (n, r) {
          e.exports = r(R())
        })(mA, function (n) {
          function r(i) {
            return i && typeof i == 'object' && 'default' in i ? i : { default: i }
          }
          var o = r(n),
            s = {
              words: {
                m: ['један минут', 'једног минута'],
                mm: ['%d минут', '%d минута', '%d минута'],
                h: ['један сат', 'једног сата'],
                hh: ['%d сат', '%d сата', '%d сати'],
                d: ['један дан', 'једног дана'],
                dd: ['%d дан', '%d дана', '%d дана'],
                M: ['један месец', 'једног месеца'],
                MM: ['%d месец', '%d месеца', '%d месеци'],
                y: ['једну годину', 'једне године'],
                yy: ['%d годину', '%d године', '%d година']
              },
              correctGrammarCase: function (i, u) {
                return i % 10 >= 1 && i % 10 <= 4 && (i % 100 < 10 || i % 100 >= 20)
                  ? i % 10 == 1
                    ? u[0]
                    : u[1]
                  : u[2]
              },
              relativeTimeFormatter: function (i, u, l, d) {
                var c = s.words[l]
                if (l.length === 1) return l === 'y' && u ? 'једна година' : d || u ? c[0] : c[1]
                var _ = s.correctGrammarCase(i, c)
                return l === 'yy' && u && _ === '%d годину' ? i + ' година' : _.replace('%d', i)
              }
            },
            t = {
              name: 'sr-cyrl',
              weekdays: 'Недеља_Понедељак_Уторак_Среда_Четвртак_Петак_Субота'.split('_'),
              weekdaysShort: 'Нед._Пон._Уто._Сре._Чет._Пет._Суб.'.split('_'),
              weekdaysMin: 'не_по_ут_ср_че_пе_су'.split('_'),
              months:
                'Јануар_Фебруар_Март_Април_Мај_Јун_Јул_Август_Септембар_Октобар_Новембар_Децембар'.split(
                  '_'
                ),
              monthsShort: 'Јан._Феб._Мар._Апр._Мај_Јун_Јул_Авг._Сеп._Окт._Нов._Дец.'.split('_'),
              weekStart: 1,
              relativeTime: {
                future: 'за %s',
                past: 'пре %s',
                s: 'неколико секунди',
                m: s.relativeTimeFormatter,
                mm: s.relativeTimeFormatter,
                h: s.relativeTimeFormatter,
                hh: s.relativeTimeFormatter,
                d: s.relativeTimeFormatter,
                dd: s.relativeTimeFormatter,
                M: s.relativeTimeFormatter,
                MM: s.relativeTimeFormatter,
                y: s.relativeTimeFormatter,
                yy: s.relativeTimeFormatter
              },
              ordinal: function (i) {
                return i + '.'
              },
              formats: {
                LT: 'H:mm',
                LTS: 'H:mm:ss',
                L: 'D. M. YYYY.',
                LL: 'D. MMMM YYYY.',
                LLL: 'D. MMMM YYYY. H:mm',
                LLLL: 'dddd, D. MMMM YYYY. H:mm'
              }
            }
          return (o.default.locale(t, null, !0), t)
        })
      })(aa)),
    aa.exports
  )
}
var sY = pA()
const hA = /* @__PURE__ */ F(sY),
  vA = /* @__PURE__ */ q(
    {
      __proto__: null,
      default: hA
    },
    [sY]
  )
var oa = { exports: {} },
  yA = oa.exports,
  Rf
function gA() {
  return (
    Rf ||
      ((Rf = 1),
      (function (e, a) {
        ;(function (n, r) {
          e.exports = r(R())
        })(yA, function (n) {
          function r(i) {
            return i && typeof i == 'object' && 'default' in i ? i : { default: i }
          }
          var o = r(n),
            s = {
              words: {
                m: ['jedan minut', 'jednog minuta'],
                mm: ['%d minut', '%d minuta', '%d minuta'],
                h: ['jedan sat', 'jednog sata'],
                hh: ['%d sat', '%d sata', '%d sati'],
                d: ['jedan dan', 'jednog dana'],
                dd: ['%d dan', '%d dana', '%d dana'],
                M: ['jedan mesec', 'jednog meseca'],
                MM: ['%d mesec', '%d meseca', '%d meseci'],
                y: ['jednu godinu', 'jedne godine'],
                yy: ['%d godinu', '%d godine', '%d godina']
              },
              correctGrammarCase: function (i, u) {
                return i % 10 >= 1 && i % 10 <= 4 && (i % 100 < 10 || i % 100 >= 20)
                  ? i % 10 == 1
                    ? u[0]
                    : u[1]
                  : u[2]
              },
              relativeTimeFormatter: function (i, u, l, d) {
                var c = s.words[l]
                if (l.length === 1) return l === 'y' && u ? 'jedna godina' : d || u ? c[0] : c[1]
                var _ = s.correctGrammarCase(i, c)
                return l === 'yy' && u && _ === '%d godinu' ? i + ' godina' : _.replace('%d', i)
              }
            },
            t = {
              name: 'sr',
              weekdays: 'Nedelja_Ponedeljak_Utorak_Sreda_Četvrtak_Petak_Subota'.split('_'),
              weekdaysShort: 'Ned._Pon._Uto._Sre._Čet._Pet._Sub.'.split('_'),
              weekdaysMin: 'ne_po_ut_sr_če_pe_su'.split('_'),
              months:
                'Januar_Februar_Mart_April_Maj_Jun_Jul_Avgust_Septembar_Oktobar_Novembar_Decembar'.split(
                  '_'
                ),
              monthsShort: 'Jan._Feb._Mar._Apr._Maj_Jun_Jul_Avg._Sep._Okt._Nov._Dec.'.split('_'),
              weekStart: 1,
              relativeTime: {
                future: 'za %s',
                past: 'pre %s',
                s: 'nekoliko sekundi',
                m: s.relativeTimeFormatter,
                mm: s.relativeTimeFormatter,
                h: s.relativeTimeFormatter,
                hh: s.relativeTimeFormatter,
                d: s.relativeTimeFormatter,
                dd: s.relativeTimeFormatter,
                M: s.relativeTimeFormatter,
                MM: s.relativeTimeFormatter,
                y: s.relativeTimeFormatter,
                yy: s.relativeTimeFormatter
              },
              ordinal: function (i) {
                return i + '.'
              },
              formats: {
                LT: 'H:mm',
                LTS: 'H:mm:ss',
                L: 'D. M. YYYY.',
                LL: 'D. MMMM YYYY.',
                LLL: 'D. MMMM YYYY. H:mm',
                LLLL: 'dddd, D. MMMM YYYY. H:mm'
              }
            }
          return (o.default.locale(t, null, !0), t)
        })
      })(oa)),
    oa.exports
  )
}
var iY = gA()
const MA = /* @__PURE__ */ F(iY),
  bA = /* @__PURE__ */ q(
    {
      __proto__: null,
      default: MA
    },
    [iY]
  )
var sa = { exports: {} },
  YA = sa.exports,
  If
function wA() {
  return (
    If ||
      ((If = 1),
      (function (e, a) {
        ;(function (n, r) {
          e.exports = r(R())
        })(YA, function (n) {
          function r(t) {
            return t && typeof t == 'object' && 'default' in t ? t : { default: t }
          }
          var o = r(n),
            s = {
              name: 'ss',
              weekdays: 'Lisontfo_Umsombuluko_Lesibili_Lesitsatfu_Lesine_Lesihlanu_Umgcibelo'.split(
                '_'
              ),
              months:
                "Bhimbidvwane_Indlovana_Indlov'lenkhulu_Mabasa_Inkhwekhweti_Inhlaba_Kholwane_Ingci_Inyoni_Imphala_Lweti_Ingongoni".split(
                  '_'
                ),
              weekStart: 1,
              weekdaysShort: 'Lis_Umb_Lsb_Les_Lsi_Lsh_Umg'.split('_'),
              monthsShort: 'Bhi_Ina_Inu_Mab_Ink_Inh_Kho_Igc_Iny_Imp_Lwe_Igo'.split('_'),
              weekdaysMin: 'Li_Us_Lb_Lt_Ls_Lh_Ug'.split('_'),
              ordinal: function (t) {
                return t
              },
              formats: {
                LT: 'h:mm A',
                LTS: 'h:mm:ss A',
                L: 'DD/MM/YYYY',
                LL: 'D MMMM YYYY',
                LLL: 'D MMMM YYYY h:mm A',
                LLLL: 'dddd, D MMMM YYYY h:mm A'
              },
              relativeTime: {
                future: 'nga %s',
                past: 'wenteka nga %s',
                s: 'emizuzwana lomcane',
                m: 'umzuzu',
                mm: '%d emizuzu',
                h: 'lihora',
                hh: '%d emahora',
                d: 'lilanga',
                dd: '%d emalanga',
                M: 'inyanga',
                MM: '%d tinyanga',
                y: 'umnyaka',
                yy: '%d iminyaka'
              }
            }
          return (o.default.locale(s, null, !0), s)
        })
      })(sa)),
    sa.exports
  )
}
var uY = wA()
const xA = /* @__PURE__ */ F(uY),
  LA = /* @__PURE__ */ q(
    {
      __proto__: null,
      default: xA
    },
    [uY]
  )
var ia = { exports: {} },
  kA = ia.exports,
  Pf
function SA() {
  return (
    Pf ||
      ((Pf = 1),
      (function (e, a) {
        ;(function (n, r) {
          e.exports = r(R())
        })(kA, function (n) {
          function r(t) {
            return t && typeof t == 'object' && 'default' in t ? t : { default: t }
          }
          var o = r(n),
            s = {
              name: 'sv-fi',
              weekdays: 'söndag_måndag_tisdag_onsdag_torsdag_fredag_lördag'.split('_'),
              weekdaysShort: 'sön_mån_tis_ons_tor_fre_lör'.split('_'),
              weekdaysMin: 'sö_må_ti_on_to_fr_lö'.split('_'),
              months:
                'januari_februari_mars_april_maj_juni_juli_augusti_september_oktober_november_december'.split(
                  '_'
                ),
              monthsShort: 'jan_feb_mar_apr_maj_jun_jul_aug_sep_okt_nov_dec'.split('_'),
              weekStart: 1,
              yearStart: 4,
              ordinal: function (t) {
                var i = t % 10
                return '[' + t + (i === 1 || i === 2 ? 'a' : 'e') + ']'
              },
              formats: {
                LT: 'HH.mm',
                LTS: 'HH.mm.ss',
                L: 'DD.MM.YYYY',
                LL: 'D. MMMM YYYY',
                LLL: 'D. MMMM YYYY, [kl.] HH.mm',
                LLLL: 'dddd, D. MMMM YYYY, [kl.] HH.mm',
                l: 'D.M.YYYY',
                ll: 'D. MMM YYYY',
                lll: 'D. MMM YYYY, [kl.] HH.mm',
                llll: 'ddd, D. MMM YYYY, [kl.] HH.mm'
              },
              relativeTime: {
                future: 'om %s',
                past: 'för %s sedan',
                s: 'några sekunder',
                m: 'en minut',
                mm: '%d minuter',
                h: 'en timme',
                hh: '%d timmar',
                d: 'en dag',
                dd: '%d dagar',
                M: 'en månad',
                MM: '%d månader',
                y: 'ett år',
                yy: '%d år'
              }
            }
          return (o.default.locale(s, null, !0), s)
        })
      })(ia)),
    ia.exports
  )
}
var lY = SA()
const DA = /* @__PURE__ */ F(lY),
  EA = /* @__PURE__ */ q(
    {
      __proto__: null,
      default: DA
    },
    [lY]
  )
var ua = { exports: {} },
  TA = ua.exports,
  Bf
function $A() {
  return (
    Bf ||
      ((Bf = 1),
      (function (e, a) {
        ;(function (n, r) {
          e.exports = r(R())
        })(TA, function (n) {
          function r(t) {
            return t && typeof t == 'object' && 'default' in t ? t : { default: t }
          }
          var o = r(n),
            s = {
              name: 'sv',
              weekdays: 'söndag_måndag_tisdag_onsdag_torsdag_fredag_lördag'.split('_'),
              weekdaysShort: 'sön_mån_tis_ons_tor_fre_lör'.split('_'),
              weekdaysMin: 'sö_må_ti_on_to_fr_lö'.split('_'),
              months:
                'januari_februari_mars_april_maj_juni_juli_augusti_september_oktober_november_december'.split(
                  '_'
                ),
              monthsShort: 'jan_feb_mar_apr_maj_jun_jul_aug_sep_okt_nov_dec'.split('_'),
              weekStart: 1,
              yearStart: 4,
              ordinal: function (t) {
                var i = t % 10
                return '[' + t + (i === 1 || i === 2 ? 'a' : 'e') + ']'
              },
              formats: {
                LT: 'HH:mm',
                LTS: 'HH:mm:ss',
                L: 'YYYY-MM-DD',
                LL: 'D MMMM YYYY',
                LLL: 'D MMMM YYYY [kl.] HH:mm',
                LLLL: 'dddd D MMMM YYYY [kl.] HH:mm',
                lll: 'D MMM YYYY HH:mm',
                llll: 'ddd D MMM YYYY HH:mm'
              },
              relativeTime: {
                future: 'om %s',
                past: 'för %s sedan',
                s: 'några sekunder',
                m: 'en minut',
                mm: '%d minuter',
                h: 'en timme',
                hh: '%d timmar',
                d: 'en dag',
                dd: '%d dagar',
                M: 'en månad',
                MM: '%d månader',
                y: 'ett år',
                yy: '%d år'
              }
            }
          return (o.default.locale(s, null, !0), s)
        })
      })(ua)),
    ua.exports
  )
}
var dY = $A()
const HA = /* @__PURE__ */ F(dY),
  jA = /* @__PURE__ */ q(
    {
      __proto__: null,
      default: HA
    },
    [dY]
  )
var la = { exports: {} },
  CA = la.exports,
  Nf
function AA() {
  return (
    Nf ||
      ((Nf = 1),
      (function (e, a) {
        ;(function (n, r) {
          e.exports = r(R())
        })(CA, function (n) {
          function r(t) {
            return t && typeof t == 'object' && 'default' in t ? t : { default: t }
          }
          var o = r(n),
            s = {
              name: 'sw',
              weekdays: 'Jumapili_Jumatatu_Jumanne_Jumatano_Alhamisi_Ijumaa_Jumamosi'.split('_'),
              weekdaysShort: 'Jpl_Jtat_Jnne_Jtan_Alh_Ijm_Jmos'.split('_'),
              weekdaysMin: 'J2_J3_J4_J5_Al_Ij_J1'.split('_'),
              months:
                'Januari_Februari_Machi_Aprili_Mei_Juni_Julai_Agosti_Septemba_Oktoba_Novemba_Desemba'.split(
                  '_'
                ),
              monthsShort: 'Jan_Feb_Mac_Apr_Mei_Jun_Jul_Ago_Sep_Okt_Nov_Des'.split('_'),
              weekStart: 1,
              ordinal: function (t) {
                return t
              },
              relativeTime: {
                future: '%s baadaye',
                past: 'tokea %s',
                s: 'hivi punde',
                m: 'dakika moja',
                mm: 'dakika %d',
                h: 'saa limoja',
                hh: 'masaa %d',
                d: 'siku moja',
                dd: 'masiku %d',
                M: 'mwezi mmoja',
                MM: 'miezi %d',
                y: 'mwaka mmoja',
                yy: 'miaka %d'
              },
              formats: {
                LT: 'HH:mm',
                LTS: 'HH:mm:ss',
                L: 'DD.MM.YYYY',
                LL: 'D MMMM YYYY',
                LLL: 'D MMMM YYYY HH:mm',
                LLLL: 'dddd, D MMMM YYYY HH:mm'
              }
            }
          return (o.default.locale(s, null, !0), s)
        })
      })(la)),
    la.exports
  )
}
var cY = AA()
const qA = /* @__PURE__ */ F(cY),
  FA = /* @__PURE__ */ q(
    {
      __proto__: null,
      default: qA
    },
    [cY]
  )
var da = { exports: {} },
  RA = da.exports,
  Of
function IA() {
  return (
    Of ||
      ((Of = 1),
      (function (e, a) {
        ;(function (n, r) {
          e.exports = r(R())
        })(RA, function (n) {
          function r(t) {
            return t && typeof t == 'object' && 'default' in t ? t : { default: t }
          }
          var o = r(n),
            s = {
              name: 'ta',
              weekdays:
                'ஞாயிற்றுக்கிழமை_திங்கட்கிழமை_செவ்வாய்கிழமை_புதன்கிழமை_வியாழக்கிழமை_வெள்ளிக்கிழமை_சனிக்கிழமை'.split(
                  '_'
                ),
              months:
                'ஜனவரி_பிப்ரவரி_மார்ச்_ஏப்ரல்_மே_ஜூன்_ஜூலை_ஆகஸ்ட்_செப்டெம்பர்_அக்டோபர்_நவம்பர்_டிசம்பர்'.split(
                  '_'
                ),
              weekdaysShort: 'ஞாயிறு_திங்கள்_செவ்வாய்_புதன்_வியாழன்_வெள்ளி_சனி'.split('_'),
              monthsShort:
                'ஜனவரி_பிப்ரவரி_மார்ச்_ஏப்ரல்_மே_ஜூன்_ஜூலை_ஆகஸ்ட்_செப்டெம்பர்_அக்டோபர்_நவம்பர்_டிசம்பர்'.split(
                  '_'
                ),
              weekdaysMin: 'ஞா_தி_செ_பு_வி_வெ_ச'.split('_'),
              ordinal: function (t) {
                return t
              },
              formats: {
                LT: 'HH:mm',
                LTS: 'HH:mm:ss',
                L: 'DD/MM/YYYY',
                LL: 'D MMMM YYYY',
                LLL: 'D MMMM YYYY, HH:mm',
                LLLL: 'dddd, D MMMM YYYY, HH:mm'
              },
              relativeTime: {
                future: '%s இல்',
                past: '%s முன்',
                s: 'ஒரு சில விநாடிகள்',
                m: 'ஒரு நிமிடம்',
                mm: '%d நிமிடங்கள்',
                h: 'ஒரு மணி நேரம்',
                hh: '%d மணி நேரம்',
                d: 'ஒரு நாள்',
                dd: '%d நாட்கள்',
                M: 'ஒரு மாதம்',
                MM: '%d மாதங்கள்',
                y: 'ஒரு வருடம்',
                yy: '%d ஆண்டுகள்'
              }
            }
          return (o.default.locale(s, null, !0), s)
        })
      })(da)),
    da.exports
  )
}
var _Y = IA()
const PA = /* @__PURE__ */ F(_Y),
  BA = /* @__PURE__ */ q(
    {
      __proto__: null,
      default: PA
    },
    [_Y]
  )
var ca = { exports: {} },
  NA = ca.exports,
  zf
function OA() {
  return (
    zf ||
      ((zf = 1),
      (function (e, a) {
        ;(function (n, r) {
          e.exports = r(R())
        })(NA, function (n) {
          function r(t) {
            return t && typeof t == 'object' && 'default' in t ? t : { default: t }
          }
          var o = r(n),
            s = {
              name: 'te',
              weekdays: 'ఆదివారం_సోమవారం_మంగళవారం_బుధవారం_గురువారం_శుక్రవారం_శనివారం'.split('_'),
              months:
                'జనవరి_ఫిబ్రవరి_మార్చి_ఏప్రిల్_మే_జూన్_జులై_ఆగస్టు_సెప్టెంబర్_అక్టోబర్_నవంబర్_డిసెంబర్'.split(
                  '_'
                ),
              weekdaysShort: 'ఆది_సోమ_మంగళ_బుధ_గురు_శుక్ర_శని'.split('_'),
              monthsShort: 'జన._ఫిబ్ర._మార్చి_ఏప్రి._మే_జూన్_జులై_ఆగ._సెప్._అక్టో._నవ._డిసె.'.split(
                '_'
              ),
              weekdaysMin: 'ఆ_సో_మం_బు_గు_శు_శ'.split('_'),
              ordinal: function (t) {
                return t
              },
              formats: {
                LT: 'A h:mm',
                LTS: 'A h:mm:ss',
                L: 'DD/MM/YYYY',
                LL: 'D MMMM YYYY',
                LLL: 'D MMMM YYYY, A h:mm',
                LLLL: 'dddd, D MMMM YYYY, A h:mm'
              },
              relativeTime: {
                future: '%s లో',
                past: '%s క్రితం',
                s: 'కొన్ని క్షణాలు',
                m: 'ఒక నిమిషం',
                mm: '%d నిమిషాలు',
                h: 'ఒక గంట',
                hh: '%d గంటలు',
                d: 'ఒక రోజు',
                dd: '%d రోజులు',
                M: 'ఒక నెల',
                MM: '%d నెలలు',
                y: 'ఒక సంవత్సరం',
                yy: '%d సంవత్సరాలు'
              }
            }
          return (o.default.locale(s, null, !0), s)
        })
      })(ca)),
    ca.exports
  )
}
var fY = OA()
const zA = /* @__PURE__ */ F(fY),
  GA = /* @__PURE__ */ q(
    {
      __proto__: null,
      default: zA
    },
    [fY]
  )
var _a = { exports: {} },
  JA = _a.exports,
  Gf
function UA() {
  return (
    Gf ||
      ((Gf = 1),
      (function (e, a) {
        ;(function (n, r) {
          e.exports = r(R())
        })(JA, function (n) {
          function r(t) {
            return t && typeof t == 'object' && 'default' in t ? t : { default: t }
          }
          var o = r(n),
            s = {
              name: 'tet',
              weekdays: 'Domingu_Segunda_Tersa_Kuarta_Kinta_Sesta_Sabadu'.split('_'),
              months:
                'Janeiru_Fevereiru_Marsu_Abril_Maiu_Juñu_Jullu_Agustu_Setembru_Outubru_Novembru_Dezembru'.split(
                  '_'
                ),
              weekStart: 1,
              weekdaysShort: 'Dom_Seg_Ters_Kua_Kint_Sest_Sab'.split('_'),
              monthsShort: 'Jan_Fev_Mar_Abr_Mai_Jun_Jul_Ago_Set_Out_Nov_Dez'.split('_'),
              weekdaysMin: 'Do_Seg_Te_Ku_Ki_Ses_Sa'.split('_'),
              ordinal: function (t) {
                return t
              },
              formats: {
                LT: 'HH:mm',
                LTS: 'HH:mm:ss',
                L: 'DD/MM/YYYY',
                LL: 'D MMMM YYYY',
                LLL: 'D MMMM YYYY HH:mm',
                LLLL: 'dddd, D MMMM YYYY HH:mm'
              },
              relativeTime: {
                future: 'iha %s',
                past: '%s liuba',
                s: 'minutu balun',
                m: 'minutu ida',
                mm: 'minutu %d',
                h: 'oras ida',
                hh: 'oras %d',
                d: 'loron ida',
                dd: 'loron %d',
                M: 'fulan ida',
                MM: 'fulan %d',
                y: 'tinan ida',
                yy: 'tinan %d'
              }
            }
          return (o.default.locale(s, null, !0), s)
        })
      })(_a)),
    _a.exports
  )
}
var mY = UA()
const WA = /* @__PURE__ */ F(mY),
  VA = /* @__PURE__ */ q(
    {
      __proto__: null,
      default: WA
    },
    [mY]
  )
var fa = { exports: {} },
  KA = fa.exports,
  Jf
function XA() {
  return (
    Jf ||
      ((Jf = 1),
      (function (e, a) {
        ;(function (n, r) {
          e.exports = r(R())
        })(KA, function (n) {
          function r(t) {
            return t && typeof t == 'object' && 'default' in t ? t : { default: t }
          }
          var o = r(n),
            s = {
              name: 'tg',
              weekdays: 'якшанбе_душанбе_сешанбе_чоршанбе_панҷшанбе_ҷумъа_шанбе'.split('_'),
              months:
                'январ_феврал_март_апрел_май_июн_июл_август_сентябр_октябр_ноябр_декабр'.split('_'),
              weekStart: 1,
              weekdaysShort: 'яшб_дшб_сшб_чшб_пшб_ҷум_шнб'.split('_'),
              monthsShort: 'янв_фев_мар_апр_май_июн_июл_авг_сен_окт_ноя_дек'.split('_'),
              weekdaysMin: 'яш_дш_сш_чш_пш_ҷм_шб'.split('_'),
              ordinal: function (t) {
                return t
              },
              formats: {
                LT: 'HH:mm',
                LTS: 'HH:mm:ss',
                L: 'DD/MM/YYYY',
                LL: 'D MMMM YYYY',
                LLL: 'D MMMM YYYY HH:mm',
                LLLL: 'dddd, D MMMM YYYY HH:mm'
              },
              relativeTime: {
                future: 'баъди %s',
                past: '%s пеш',
                s: 'якчанд сония',
                m: 'як дақиқа',
                mm: '%d дақиқа',
                h: 'як соат',
                hh: '%d соат',
                d: 'як рӯз',
                dd: '%d рӯз',
                M: 'як моҳ',
                MM: '%d моҳ',
                y: 'як сол',
                yy: '%d сол'
              }
            }
          return (o.default.locale(s, null, !0), s)
        })
      })(fa)),
    fa.exports
  )
}
var pY = XA()
const ZA = /* @__PURE__ */ F(pY),
  QA = /* @__PURE__ */ q(
    {
      __proto__: null,
      default: ZA
    },
    [pY]
  )
var ma = { exports: {} },
  eq = ma.exports,
  Uf
function tq() {
  return (
    Uf ||
      ((Uf = 1),
      (function (e, a) {
        ;(function (n, r) {
          e.exports = r(R())
        })(eq, function (n) {
          function r(t) {
            return t && typeof t == 'object' && 'default' in t ? t : { default: t }
          }
          var o = r(n),
            s = {
              name: 'th',
              weekdays: 'อาทิตย์_จันทร์_อังคาร_พุธ_พฤหัสบดี_ศุกร์_เสาร์'.split('_'),
              weekdaysShort: 'อาทิตย์_จันทร์_อังคาร_พุธ_พฤหัส_ศุกร์_เสาร์'.split('_'),
              weekdaysMin: 'อา._จ._อ._พ._พฤ._ศ._ส.'.split('_'),
              months:
                'มกราคม_กุมภาพันธ์_มีนาคม_เมษายน_พฤษภาคม_มิถุนายน_กรกฎาคม_สิงหาคม_กันยายน_ตุลาคม_พฤศจิกายน_ธันวาคม'.split(
                  '_'
                ),
              monthsShort: 'ม.ค._ก.พ._มี.ค._เม.ย._พ.ค._มิ.ย._ก.ค._ส.ค._ก.ย._ต.ค._พ.ย._ธ.ค.'.split(
                '_'
              ),
              formats: {
                LT: 'H:mm',
                LTS: 'H:mm:ss',
                L: 'DD/MM/YYYY',
                LL: 'D MMMM YYYY',
                LLL: 'D MMMM YYYY เวลา H:mm',
                LLLL: 'วันddddที่ D MMMM YYYY เวลา H:mm'
              },
              relativeTime: {
                future: 'อีก %s',
                past: '%sที่แล้ว',
                s: 'ไม่กี่วินาที',
                m: '1 นาที',
                mm: '%d นาที',
                h: '1 ชั่วโมง',
                hh: '%d ชั่วโมง',
                d: '1 วัน',
                dd: '%d วัน',
                M: '1 เดือน',
                MM: '%d เดือน',
                y: '1 ปี',
                yy: '%d ปี'
              },
              ordinal: function (t) {
                return t + '.'
              }
            }
          return (o.default.locale(s, null, !0), s)
        })
      })(ma)),
    ma.exports
  )
}
var hY = tq()
const rq = /* @__PURE__ */ F(hY),
  nq = /* @__PURE__ */ q(
    {
      __proto__: null,
      default: rq
    },
    [hY]
  )
var pa = { exports: {} },
  aq = pa.exports,
  Wf
function oq() {
  return (
    Wf ||
      ((Wf = 1),
      (function (e, a) {
        ;(function (n, r) {
          e.exports = r(R())
        })(aq, function (n) {
          function r(t) {
            return t && typeof t == 'object' && 'default' in t ? t : { default: t }
          }
          var o = r(n),
            s = {
              name: 'tk',
              weekdays: 'Ýekşenbe_Duşenbe_Sişenbe_Çarşenbe_Penşenbe_Anna_Şenbe'.split('_'),
              weekdaysShort: 'Ýek_Duş_Siş_Çar_Pen_Ann_Şen'.split('_'),
              weekdaysMin: 'Ýk_Dş_Sş_Çr_Pn_An_Şn'.split('_'),
              months:
                'Ýanwar_Fewral_Mart_Aprel_Maý_Iýun_Iýul_Awgust_Sentýabr_Oktýabr_Noýabr_Dekabr'.split(
                  '_'
                ),
              monthsShort: 'Ýan_Few_Mar_Apr_Maý_Iýn_Iýl_Awg_Sen_Okt_Noý_Dek'.split('_'),
              weekStart: 1,
              formats: {
                LT: 'HH:mm',
                LTS: 'HH:mm:ss',
                L: 'DD.MM.YYYY',
                LL: 'D MMMM YYYY',
                LLL: 'D MMMM YYYY HH:mm',
                LLLL: 'dddd, D MMMM YYYY HH:mm'
              },
              relativeTime: {
                future: '%s soň',
                past: '%s öň',
                s: 'birnäçe sekunt',
                m: 'bir minut',
                mm: '%d minut',
                h: 'bir sagat',
                hh: '%d sagat',
                d: 'bir gün',
                dd: '%d gün',
                M: 'bir aý',
                MM: '%d aý',
                y: 'bir ýyl',
                yy: '%d ýyl'
              },
              ordinal: function (t) {
                return t + '.'
              }
            }
          return (o.default.locale(s, null, !0), s)
        })
      })(pa)),
    pa.exports
  )
}
var vY = oq()
const sq = /* @__PURE__ */ F(vY),
  iq = /* @__PURE__ */ q(
    {
      __proto__: null,
      default: sq
    },
    [vY]
  )
var ha = { exports: {} },
  uq = ha.exports,
  Vf
function lq() {
  return (
    Vf ||
      ((Vf = 1),
      (function (e, a) {
        ;(function (n, r) {
          e.exports = r(R())
        })(uq, function (n) {
          function r(t) {
            return t && typeof t == 'object' && 'default' in t ? t : { default: t }
          }
          var o = r(n),
            s = {
              name: 'tl-ph',
              weekdays: 'Linggo_Lunes_Martes_Miyerkules_Huwebes_Biyernes_Sabado'.split('_'),
              months:
                'Enero_Pebrero_Marso_Abril_Mayo_Hunyo_Hulyo_Agosto_Setyembre_Oktubre_Nobyembre_Disyembre'.split(
                  '_'
                ),
              weekStart: 1,
              weekdaysShort: 'Lin_Lun_Mar_Miy_Huw_Biy_Sab'.split('_'),
              monthsShort: 'Ene_Peb_Mar_Abr_May_Hun_Hul_Ago_Set_Okt_Nob_Dis'.split('_'),
              weekdaysMin: 'Li_Lu_Ma_Mi_Hu_Bi_Sab'.split('_'),
              ordinal: function (t) {
                return t
              },
              formats: {
                LT: 'HH:mm',
                LTS: 'HH:mm:ss',
                L: 'MM/D/YYYY',
                LL: 'MMMM D, YYYY',
                LLL: 'MMMM D, YYYY HH:mm',
                LLLL: 'dddd, MMMM DD, YYYY HH:mm'
              },
              relativeTime: {
                future: 'sa loob ng %s',
                past: '%s ang nakalipas',
                s: 'ilang segundo',
                m: 'isang minuto',
                mm: '%d minuto',
                h: 'isang oras',
                hh: '%d oras',
                d: 'isang araw',
                dd: '%d araw',
                M: 'isang buwan',
                MM: '%d buwan',
                y: 'isang taon',
                yy: '%d taon'
              }
            }
          return (o.default.locale(s, null, !0), s)
        })
      })(ha)),
    ha.exports
  )
}
var yY = lq()
const dq = /* @__PURE__ */ F(yY),
  cq = /* @__PURE__ */ q(
    {
      __proto__: null,
      default: dq
    },
    [yY]
  )
var va = { exports: {} },
  _q = va.exports,
  Kf
function fq() {
  return (
    Kf ||
      ((Kf = 1),
      (function (e, a) {
        ;(function (n, r) {
          e.exports = r(R())
        })(_q, function (n) {
          function r(t) {
            return t && typeof t == 'object' && 'default' in t ? t : { default: t }
          }
          var o = r(n),
            s = {
              name: 'tlh',
              weekdays: 'lojmItjaj_DaSjaj_povjaj_ghItlhjaj_loghjaj_buqjaj_ghInjaj'.split('_'),
              months:
                'tera’ jar wa’_tera’ jar cha’_tera’ jar wej_tera’ jar loS_tera’ jar vagh_tera’ jar jav_tera’ jar Soch_tera’ jar chorgh_tera’ jar Hut_tera’ jar wa’maH_tera’ jar wa’maH wa’_tera’ jar wa’maH cha’'.split(
                  '_'
                ),
              weekStart: 1,
              weekdaysShort: 'lojmItjaj_DaSjaj_povjaj_ghItlhjaj_loghjaj_buqjaj_ghInjaj'.split('_'),
              monthsShort:
                'jar wa’_jar cha’_jar wej_jar loS_jar vagh_jar jav_jar Soch_jar chorgh_jar Hut_jar wa’maH_jar wa’maH wa’_jar wa’maH cha’'.split(
                  '_'
                ),
              weekdaysMin: 'lojmItjaj_DaSjaj_povjaj_ghItlhjaj_loghjaj_buqjaj_ghInjaj'.split('_'),
              ordinal: function (t) {
                return t
              },
              formats: {
                LT: 'HH:mm',
                LTS: 'HH:mm:ss',
                L: 'DD.MM.YYYY',
                LL: 'D MMMM YYYY',
                LLL: 'D MMMM YYYY HH:mm',
                LLLL: 'dddd, D MMMM YYYY HH:mm'
              }
            }
          return (o.default.locale(s, null, !0), s)
        })
      })(va)),
    va.exports
  )
}
var gY = fq()
const mq = /* @__PURE__ */ F(gY),
  pq = /* @__PURE__ */ q(
    {
      __proto__: null,
      default: mq
    },
    [gY]
  )
var ya = { exports: {} },
  hq = ya.exports,
  Xf
function vq() {
  return (
    Xf ||
      ((Xf = 1),
      (function (e, a) {
        ;(function (n, r) {
          e.exports = r(R())
        })(hq, function (n) {
          function r(t) {
            return t && typeof t == 'object' && 'default' in t ? t : { default: t }
          }
          var o = r(n),
            s = {
              name: 'tr',
              weekdays: 'Pazar_Pazartesi_Salı_Çarşamba_Perşembe_Cuma_Cumartesi'.split('_'),
              weekdaysShort: 'Paz_Pts_Sal_Çar_Per_Cum_Cts'.split('_'),
              weekdaysMin: 'Pz_Pt_Sa_Ça_Pe_Cu_Ct'.split('_'),
              months:
                'Ocak_Şubat_Mart_Nisan_Mayıs_Haziran_Temmuz_Ağustos_Eylül_Ekim_Kasım_Aralık'.split(
                  '_'
                ),
              monthsShort: 'Oca_Şub_Mar_Nis_May_Haz_Tem_Ağu_Eyl_Eki_Kas_Ara'.split('_'),
              weekStart: 1,
              formats: {
                LT: 'HH:mm',
                LTS: 'HH:mm:ss',
                L: 'DD.MM.YYYY',
                LL: 'D MMMM YYYY',
                LLL: 'D MMMM YYYY HH:mm',
                LLLL: 'dddd, D MMMM YYYY HH:mm'
              },
              relativeTime: {
                future: '%s sonra',
                past: '%s önce',
                s: 'birkaç saniye',
                m: 'bir dakika',
                mm: '%d dakika',
                h: 'bir saat',
                hh: '%d saat',
                d: 'bir gün',
                dd: '%d gün',
                M: 'bir ay',
                MM: '%d ay',
                y: 'bir yıl',
                yy: '%d yıl'
              },
              ordinal: function (t) {
                return t + '.'
              }
            }
          return (o.default.locale(s, null, !0), s)
        })
      })(ya)),
    ya.exports
  )
}
var MY = vq()
const yq = /* @__PURE__ */ F(MY),
  gq = /* @__PURE__ */ q(
    {
      __proto__: null,
      default: yq
    },
    [MY]
  )
var ga = { exports: {} },
  Mq = ga.exports,
  Zf
function bq() {
  return (
    Zf ||
      ((Zf = 1),
      (function (e, a) {
        ;(function (n, r) {
          e.exports = r(R())
        })(Mq, function (n) {
          function r(t) {
            return t && typeof t == 'object' && 'default' in t ? t : { default: t }
          }
          var o = r(n),
            s = {
              name: 'tzl',
              weekdays: 'Súladi_Lúneçi_Maitzi_Márcuri_Xhúadi_Viénerçi_Sáturi'.split('_'),
              months:
                'Januar_Fevraglh_Març_Avrïu_Mai_Gün_Julia_Guscht_Setemvar_Listopäts_Noemvar_Zecemvar'.split(
                  '_'
                ),
              weekStart: 1,
              weekdaysShort: 'Súl_Lún_Mai_Már_Xhú_Vié_Sát'.split('_'),
              monthsShort: 'Jan_Fev_Mar_Avr_Mai_Gün_Jul_Gus_Set_Lis_Noe_Zec'.split('_'),
              weekdaysMin: 'Sú_Lú_Ma_Má_Xh_Vi_Sá'.split('_'),
              ordinal: function (t) {
                return t
              },
              formats: {
                LT: 'HH.mm',
                LTS: 'HH.mm.ss',
                L: 'DD.MM.YYYY',
                LL: 'D. MMMM [dallas] YYYY',
                LLL: 'D. MMMM [dallas] YYYY HH.mm',
                LLLL: 'dddd, [li] D. MMMM [dallas] YYYY HH.mm'
              }
            }
          return (o.default.locale(s, null, !0), s)
        })
      })(ga)),
    ga.exports
  )
}
var bY = bq()
const Yq = /* @__PURE__ */ F(bY),
  wq = /* @__PURE__ */ q(
    {
      __proto__: null,
      default: Yq
    },
    [bY]
  )
var Ma = { exports: {} },
  xq = Ma.exports,
  Qf
function Lq() {
  return (
    Qf ||
      ((Qf = 1),
      (function (e, a) {
        ;(function (n, r) {
          e.exports = r(R())
        })(xq, function (n) {
          function r(t) {
            return t && typeof t == 'object' && 'default' in t ? t : { default: t }
          }
          var o = r(n),
            s = {
              name: 'tzm-latn',
              weekdays: 'asamas_aynas_asinas_akras_akwas_asimwas_asiḍyas'.split('_'),
              months:
                'innayr_brˤayrˤ_marˤsˤ_ibrir_mayyw_ywnyw_ywlywz_ɣwšt_šwtanbir_ktˤwbrˤ_nwwanbir_dwjnbir'.split(
                  '_'
                ),
              weekStart: 6,
              weekdaysShort: 'asamas_aynas_asinas_akras_akwas_asimwas_asiḍyas'.split('_'),
              monthsShort:
                'innayr_brˤayrˤ_marˤsˤ_ibrir_mayyw_ywnyw_ywlywz_ɣwšt_šwtanbir_ktˤwbrˤ_nwwanbir_dwjnbir'.split(
                  '_'
                ),
              weekdaysMin: 'asamas_aynas_asinas_akras_akwas_asimwas_asiḍyas'.split('_'),
              ordinal: function (t) {
                return t
              },
              formats: {
                LT: 'HH:mm',
                LTS: 'HH:mm:ss',
                L: 'DD/MM/YYYY',
                LL: 'D MMMM YYYY',
                LLL: 'D MMMM YYYY HH:mm',
                LLLL: 'dddd D MMMM YYYY HH:mm'
              },
              relativeTime: {
                future: 'dadkh s yan %s',
                past: 'yan %s',
                s: 'imik',
                m: 'minuḍ',
                mm: '%d minuḍ',
                h: 'saɛa',
                hh: '%d tassaɛin',
                d: 'ass',
                dd: '%d ossan',
                M: 'ayowr',
                MM: '%d iyyirn',
                y: 'asgas',
                yy: '%d isgasn'
              }
            }
          return (o.default.locale(s, null, !0), s)
        })
      })(Ma)),
    Ma.exports
  )
}
var YY = Lq()
const kq = /* @__PURE__ */ F(YY),
  Sq = /* @__PURE__ */ q(
    {
      __proto__: null,
      default: kq
    },
    [YY]
  )
var ba = { exports: {} },
  Dq = ba.exports,
  em
function Eq() {
  return (
    em ||
      ((em = 1),
      (function (e, a) {
        ;(function (n, r) {
          e.exports = r(R())
        })(Dq, function (n) {
          function r(t) {
            return t && typeof t == 'object' && 'default' in t ? t : { default: t }
          }
          var o = r(n),
            s = {
              name: 'tzm',
              weekdays: 'ⴰⵙⴰⵎⴰⵙ_ⴰⵢⵏⴰⵙ_ⴰⵙⵉⵏⴰⵙ_ⴰⴽⵔⴰⵙ_ⴰⴽⵡⴰⵙ_ⴰⵙⵉⵎⵡⴰⵙ_ⴰⵙⵉⴹⵢⴰⵙ'.split('_'),
              months:
                'ⵉⵏⵏⴰⵢⵔ_ⴱⵕⴰⵢⵕ_ⵎⴰⵕⵚ_ⵉⴱⵔⵉⵔ_ⵎⴰⵢⵢⵓ_ⵢⵓⵏⵢⵓ_ⵢⵓⵍⵢⵓⵣ_ⵖⵓⵛⵜ_ⵛⵓⵜⴰⵏⴱⵉⵔ_ⴽⵟⵓⴱⵕ_ⵏⵓⵡⴰⵏⴱⵉⵔ_ⴷⵓⵊⵏⴱⵉⵔ'.split(
                  '_'
                ),
              weekStart: 6,
              weekdaysShort: 'ⴰⵙⴰⵎⴰⵙ_ⴰⵢⵏⴰⵙ_ⴰⵙⵉⵏⴰⵙ_ⴰⴽⵔⴰⵙ_ⴰⴽⵡⴰⵙ_ⴰⵙⵉⵎⵡⴰⵙ_ⴰⵙⵉⴹⵢⴰⵙ'.split('_'),
              monthsShort:
                'ⵉⵏⵏⴰⵢⵔ_ⴱⵕⴰⵢⵕ_ⵎⴰⵕⵚ_ⵉⴱⵔⵉⵔ_ⵎⴰⵢⵢⵓ_ⵢⵓⵏⵢⵓ_ⵢⵓⵍⵢⵓⵣ_ⵖⵓⵛⵜ_ⵛⵓⵜⴰⵏⴱⵉⵔ_ⴽⵟⵓⴱⵕ_ⵏⵓⵡⴰⵏⴱⵉⵔ_ⴷⵓⵊⵏⴱⵉⵔ'.split(
                  '_'
                ),
              weekdaysMin: 'ⴰⵙⴰⵎⴰⵙ_ⴰⵢⵏⴰⵙ_ⴰⵙⵉⵏⴰⵙ_ⴰⴽⵔⴰⵙ_ⴰⴽⵡⴰⵙ_ⴰⵙⵉⵎⵡⴰⵙ_ⴰⵙⵉⴹⵢⴰⵙ'.split('_'),
              ordinal: function (t) {
                return t
              },
              formats: {
                LT: 'HH:mm',
                LTS: 'HH:mm:ss',
                L: 'DD/MM/YYYY',
                LL: 'D MMMM YYYY',
                LLL: 'D MMMM YYYY HH:mm',
                LLLL: 'dddd D MMMM YYYY HH:mm'
              },
              relativeTime: {
                future: 'ⴷⴰⴷⵅ ⵙ ⵢⴰⵏ %s',
                past: 'ⵢⴰⵏ %s',
                s: 'ⵉⵎⵉⴽ',
                m: 'ⵎⵉⵏⵓⴺ',
                mm: '%d ⵎⵉⵏⵓⴺ',
                h: 'ⵙⴰⵄⴰ',
                hh: '%d ⵜⴰⵙⵙⴰⵄⵉⵏ',
                d: 'ⴰⵙⵙ',
                dd: '%d oⵙⵙⴰⵏ',
                M: 'ⴰⵢoⵓⵔ',
                MM: '%d ⵉⵢⵢⵉⵔⵏ',
                y: 'ⴰⵙⴳⴰⵙ',
                yy: '%d ⵉⵙⴳⴰⵙⵏ'
              }
            }
          return (o.default.locale(s, null, !0), s)
        })
      })(ba)),
    ba.exports
  )
}
var wY = Eq()
const Tq = /* @__PURE__ */ F(wY),
  $q = /* @__PURE__ */ q(
    {
      __proto__: null,
      default: Tq
    },
    [wY]
  )
var Ya = { exports: {} },
  Hq = Ya.exports,
  tm
function jq() {
  return (
    tm ||
      ((tm = 1),
      (function (e, a) {
        ;(function (n, r) {
          e.exports = r(R())
        })(Hq, function (n) {
          function r(t) {
            return t && typeof t == 'object' && 'default' in t ? t : { default: t }
          }
          var o = r(n),
            s = {
              name: 'ug-cn',
              weekdays: 'يەكشەنبە_دۈشەنبە_سەيشەنبە_چارشەنبە_پەيشەنبە_جۈمە_شەنبە'.split('_'),
              months:
                'يانۋار_فېۋرال_مارت_ئاپرېل_ماي_ئىيۇن_ئىيۇل_ئاۋغۇست_سېنتەبىر_ئۆكتەبىر_نويابىر_دېكابىر'.split(
                  '_'
                ),
              weekStart: 1,
              weekdaysShort: 'يە_دۈ_سە_چا_پە_جۈ_شە'.split('_'),
              monthsShort:
                'يانۋار_فېۋرال_مارت_ئاپرېل_ماي_ئىيۇن_ئىيۇل_ئاۋغۇست_سېنتەبىر_ئۆكتەبىر_نويابىر_دېكابىر'.split(
                  '_'
                ),
              weekdaysMin: 'يە_دۈ_سە_چا_پە_جۈ_شە'.split('_'),
              ordinal: function (t) {
                return t
              },
              formats: {
                LT: 'HH:mm',
                LTS: 'HH:mm:ss',
                L: 'YYYY-MM-DD',
                LL: 'YYYY-يىلىM-ئاينىڭD-كۈنى',
                LLL: 'YYYY-يىلىM-ئاينىڭD-كۈنى، HH:mm',
                LLLL: 'dddd، YYYY-يىلىM-ئاينىڭD-كۈنى، HH:mm'
              },
              relativeTime: {
                future: '%s كېيىن',
                past: '%s بۇرۇن',
                s: 'نەچچە سېكونت',
                m: 'بىر مىنۇت',
                mm: '%d مىنۇت',
                h: 'بىر سائەت',
                hh: '%d سائەت',
                d: 'بىر كۈن',
                dd: '%d كۈن',
                M: 'بىر ئاي',
                MM: '%d ئاي',
                y: 'بىر يىل',
                yy: '%d يىل'
              }
            }
          return (o.default.locale(s, null, !0), s)
        })
      })(Ya)),
    Ya.exports
  )
}
var xY = jq()
const Cq = /* @__PURE__ */ F(xY),
  Aq = /* @__PURE__ */ q(
    {
      __proto__: null,
      default: Cq
    },
    [xY]
  )
var wa = { exports: {} },
  qq = wa.exports,
  rm
function Fq() {
  return (
    rm ||
      ((rm = 1),
      (function (e, a) {
        ;(function (n, r) {
          e.exports = r(R())
        })(qq, function (n) {
          function r(c) {
            return c && typeof c == 'object' && 'default' in c ? c : { default: c }
          }
          var o = r(n),
            s =
              'січня_лютого_березня_квітня_травня_червня_липня_серпня_вересня_жовтня_листопада_грудня'.split(
                '_'
              ),
            t =
              'січень_лютий_березень_квітень_травень_червень_липень_серпень_вересень_жовтень_листопад_грудень'.split(
                '_'
              ),
            i = /D[oD]?(\[[^[\]]*\]|\s)+MMMM?/
          function u(c, _, f) {
            var m, h
            return f === 'm'
              ? _
                ? 'хвилина'
                : 'хвилину'
              : f === 'h'
                ? _
                  ? 'година'
                  : 'годину'
                : c +
                  ' ' +
                  ((m = +c),
                  (h = {
                    ss: _ ? 'секунда_секунди_секунд' : 'секунду_секунди_секунд',
                    mm: _ ? 'хвилина_хвилини_хвилин' : 'хвилину_хвилини_хвилин',
                    hh: _ ? 'година_години_годин' : 'годину_години_годин',
                    dd: 'день_дні_днів',
                    MM: 'місяць_місяці_місяців',
                    yy: 'рік_роки_років'
                  }[f].split('_')),
                  m % 10 == 1 && m % 100 != 11
                    ? h[0]
                    : m % 10 >= 2 && m % 10 <= 4 && (m % 100 < 10 || m % 100 >= 20)
                      ? h[1]
                      : h[2])
          }
          var l = function (c, _) {
            return i.test(_) ? s[c.month()] : t[c.month()]
          }
          ;((l.s = t), (l.f = s))
          var d = {
            name: 'uk',
            weekdays: 'неділя_понеділок_вівторок_середа_четвер_п’ятниця_субота'.split('_'),
            weekdaysShort: 'ндл_пнд_втр_срд_чтв_птн_сбт'.split('_'),
            weekdaysMin: 'нд_пн_вт_ср_чт_пт_сб'.split('_'),
            months: l,
            monthsShort: 'січ_лют_бер_квіт_трав_черв_лип_серп_вер_жовт_лист_груд'.split('_'),
            weekStart: 1,
            relativeTime: {
              future: 'за %s',
              past: '%s тому',
              s: 'декілька секунд',
              m: u,
              mm: u,
              h: u,
              hh: u,
              d: 'день',
              dd: u,
              M: 'місяць',
              MM: u,
              y: 'рік',
              yy: u
            },
            ordinal: function (c) {
              return c
            },
            formats: {
              LT: 'HH:mm',
              LTS: 'HH:mm:ss',
              L: 'DD.MM.YYYY',
              LL: 'D MMMM YYYY р.',
              LLL: 'D MMMM YYYY р., HH:mm',
              LLLL: 'dddd, D MMMM YYYY р., HH:mm'
            }
          }
          return (o.default.locale(d, null, !0), d)
        })
      })(wa)),
    wa.exports
  )
}
var LY = Fq()
const Rq = /* @__PURE__ */ F(LY),
  Iq = /* @__PURE__ */ q(
    {
      __proto__: null,
      default: Rq
    },
    [LY]
  )
var xa = { exports: {} },
  Pq = xa.exports,
  nm
function Bq() {
  return (
    nm ||
      ((nm = 1),
      (function (e, a) {
        ;(function (n, r) {
          e.exports = r(R())
        })(Pq, function (n) {
          function r(t) {
            return t && typeof t == 'object' && 'default' in t ? t : { default: t }
          }
          var o = r(n),
            s = {
              name: 'ur',
              weekdays: 'اتوار_پیر_منگل_بدھ_جمعرات_جمعہ_ہفتہ'.split('_'),
              months: 'جنوری_فروری_مارچ_اپریل_مئی_جون_جولائی_اگست_ستمبر_اکتوبر_نومبر_دسمبر'.split(
                '_'
              ),
              weekStart: 1,
              weekdaysShort: 'اتوار_پیر_منگل_بدھ_جمعرات_جمعہ_ہفتہ'.split('_'),
              monthsShort:
                'جنوری_فروری_مارچ_اپریل_مئی_جون_جولائی_اگست_ستمبر_اکتوبر_نومبر_دسمبر'.split('_'),
              weekdaysMin: 'اتوار_پیر_منگل_بدھ_جمعرات_جمعہ_ہفتہ'.split('_'),
              ordinal: function (t) {
                return t
              },
              formats: {
                LT: 'HH:mm',
                LTS: 'HH:mm:ss',
                L: 'DD/MM/YYYY',
                LL: 'D MMMM YYYY',
                LLL: 'D MMMM YYYY HH:mm',
                LLLL: 'dddd، D MMMM YYYY HH:mm'
              },
              relativeTime: {
                future: '%s بعد',
                past: '%s قبل',
                s: 'چند سیکنڈ',
                m: 'ایک منٹ',
                mm: '%d منٹ',
                h: 'ایک گھنٹہ',
                hh: '%d گھنٹے',
                d: 'ایک دن',
                dd: '%d دن',
                M: 'ایک ماہ',
                MM: '%d ماہ',
                y: 'ایک سال',
                yy: '%d سال'
              }
            }
          return (o.default.locale(s, null, !0), s)
        })
      })(xa)),
    xa.exports
  )
}
var kY = Bq()
const Nq = /* @__PURE__ */ F(kY),
  Oq = /* @__PURE__ */ q(
    {
      __proto__: null,
      default: Nq
    },
    [kY]
  )
var La = { exports: {} },
  zq = La.exports,
  am
function Gq() {
  return (
    am ||
      ((am = 1),
      (function (e, a) {
        ;(function (n, r) {
          e.exports = r(R())
        })(zq, function (n) {
          function r(t) {
            return t && typeof t == 'object' && 'default' in t ? t : { default: t }
          }
          var o = r(n),
            s = {
              name: 'uz-latn',
              weekdays: 'Yakshanba_Dushanba_Seshanba_Chorshanba_Payshanba_Juma_Shanba'.split('_'),
              months:
                'Yanvar_Fevral_Mart_Aprel_May_Iyun_Iyul_Avgust_Sentabr_Oktabr_Noyabr_Dekabr'.split(
                  '_'
                ),
              weekStart: 1,
              weekdaysShort: 'Yak_Dush_Sesh_Chor_Pay_Jum_Shan'.split('_'),
              monthsShort: 'Yan_Fev_Mar_Apr_May_Iyun_Iyul_Avg_Sen_Okt_Noy_Dek'.split('_'),
              weekdaysMin: 'Ya_Du_Se_Cho_Pa_Ju_Sha'.split('_'),
              ordinal: function (t) {
                return t
              },
              formats: {
                LT: 'HH:mm',
                LTS: 'HH:mm:ss',
                L: 'DD/MM/YYYY',
                LL: 'D MMMM YYYY',
                LLL: 'D MMMM YYYY HH:mm',
                LLLL: 'D MMMM YYYY, dddd HH:mm'
              },
              relativeTime: {
                future: 'Yaqin %s ichida',
                past: '%s oldin',
                s: 'soniya',
                m: 'bir daqiqa',
                mm: '%d daqiqa',
                h: 'bir soat',
                hh: '%d soat',
                d: 'bir kun',
                dd: '%d kun',
                M: 'bir oy',
                MM: '%d oy',
                y: 'bir yil',
                yy: '%d yil'
              }
            }
          return (o.default.locale(s, null, !0), s)
        })
      })(La)),
    La.exports
  )
}
var SY = Gq()
const Jq = /* @__PURE__ */ F(SY),
  Uq = /* @__PURE__ */ q(
    {
      __proto__: null,
      default: Jq
    },
    [SY]
  )
var ka = { exports: {} },
  Wq = ka.exports,
  om
function Vq() {
  return (
    om ||
      ((om = 1),
      (function (e, a) {
        ;(function (n, r) {
          e.exports = r(R())
        })(Wq, function (n) {
          function r(t) {
            return t && typeof t == 'object' && 'default' in t ? t : { default: t }
          }
          var o = r(n),
            s = {
              name: 'uz',
              weekdays: 'Якшанба_Душанба_Сешанба_Чоршанба_Пайшанба_Жума_Шанба'.split('_'),
              months:
                'январ_феврал_март_апрел_май_июн_июл_август_сентябр_октябр_ноябр_декабр'.split('_'),
              weekStart: 1,
              weekdaysShort: 'Якш_Душ_Сеш_Чор_Пай_Жум_Шан'.split('_'),
              monthsShort: 'янв_фев_мар_апр_май_июн_июл_авг_сен_окт_ноя_дек'.split('_'),
              weekdaysMin: 'Як_Ду_Се_Чо_Па_Жу_Ша'.split('_'),
              ordinal: function (t) {
                return t
              },
              formats: {
                LT: 'HH:mm',
                LTS: 'HH:mm:ss',
                L: 'DD/MM/YYYY',
                LL: 'D MMMM YYYY',
                LLL: 'D MMMM YYYY HH:mm',
                LLLL: 'D MMMM YYYY, dddd HH:mm'
              },
              relativeTime: {
                future: 'Якин %s ичида',
                past: '%s олдин',
                s: 'фурсат',
                m: 'бир дакика',
                mm: '%d дакика',
                h: 'бир соат',
                hh: '%d соат',
                d: 'бир кун',
                dd: '%d кун',
                M: 'бир ой',
                MM: '%d ой',
                y: 'бир йил',
                yy: '%d йил'
              }
            }
          return (o.default.locale(s, null, !0), s)
        })
      })(ka)),
    ka.exports
  )
}
var DY = Vq()
const Kq = /* @__PURE__ */ F(DY),
  Xq = /* @__PURE__ */ q(
    {
      __proto__: null,
      default: Kq
    },
    [DY]
  )
var Sa = { exports: {} },
  Zq = Sa.exports,
  sm
function Qq() {
  return (
    sm ||
      ((sm = 1),
      (function (e, a) {
        ;(function (n, r) {
          e.exports = r(R())
        })(Zq, function (n) {
          function r(t) {
            return t && typeof t == 'object' && 'default' in t ? t : { default: t }
          }
          var o = r(n),
            s = {
              name: 'vi',
              weekdays: 'chủ nhật_thứ hai_thứ ba_thứ tư_thứ năm_thứ sáu_thứ bảy'.split('_'),
              months:
                'tháng 1_tháng 2_tháng 3_tháng 4_tháng 5_tháng 6_tháng 7_tháng 8_tháng 9_tháng 10_tháng 11_tháng 12'.split(
                  '_'
                ),
              weekStart: 1,
              weekdaysShort: 'CN_T2_T3_T4_T5_T6_T7'.split('_'),
              monthsShort: 'Th01_Th02_Th03_Th04_Th05_Th06_Th07_Th08_Th09_Th10_Th11_Th12'.split('_'),
              weekdaysMin: 'CN_T2_T3_T4_T5_T6_T7'.split('_'),
              ordinal: function (t) {
                return t
              },
              formats: {
                LT: 'HH:mm',
                LTS: 'HH:mm:ss',
                L: 'DD/MM/YYYY',
                LL: 'D MMMM [năm] YYYY',
                LLL: 'D MMMM [năm] YYYY HH:mm',
                LLLL: 'dddd, D MMMM [năm] YYYY HH:mm',
                l: 'DD/M/YYYY',
                ll: 'D MMM YYYY',
                lll: 'D MMM YYYY HH:mm',
                llll: 'ddd, D MMM YYYY HH:mm'
              },
              relativeTime: {
                future: '%s tới',
                past: '%s trước',
                s: 'vài giây',
                m: 'một phút',
                mm: '%d phút',
                h: 'một giờ',
                hh: '%d giờ',
                d: 'một ngày',
                dd: '%d ngày',
                M: 'một tháng',
                MM: '%d tháng',
                y: 'một năm',
                yy: '%d năm'
              }
            }
          return (o.default.locale(s, null, !0), s)
        })
      })(Sa)),
    Sa.exports
  )
}
var EY = Qq()
const eF = /* @__PURE__ */ F(EY),
  tF = /* @__PURE__ */ q(
    {
      __proto__: null,
      default: eF
    },
    [EY]
  )
var Da = { exports: {} },
  rF = Da.exports,
  im
function nF() {
  return (
    im ||
      ((im = 1),
      (function (e, a) {
        ;(function (n, r) {
          e.exports = r(R())
        })(rF, function (n) {
          function r(t) {
            return t && typeof t == 'object' && 'default' in t ? t : { default: t }
          }
          var o = r(n),
            s = {
              name: 'x-pseudo',
              weekdays:
                'S~úñdá~ý_Mó~ñdáý~_Túé~sdáý~_Wéd~ñésd~áý_T~húrs~dáý_~Fríd~áý_S~átúr~dáý'.split('_'),
              months:
                'J~áñúá~rý_F~ébrú~árý_~Márc~h_Áp~ríl_~Máý_~Júñé~_Júl~ý_Áú~gúst~_Sép~témb~ér_Ó~ctób~ér_Ñ~óvém~bér_~Décé~mbér'.split(
                  '_'
                ),
              weekStart: 1,
              weekdaysShort: 'S~úñ_~Móñ_~Túé_~Wéd_~Thú_~Frí_~Sát'.split('_'),
              monthsShort: 'J~áñ_~Féb_~Már_~Ápr_~Máý_~Júñ_~Júl_~Áúg_~Sép_~Óct_~Ñóv_~Déc'.split('_'),
              weekdaysMin: 'S~ú_Mó~_Tú_~Wé_T~h_Fr~_Sá'.split('_'),
              ordinal: function (t) {
                return t
              },
              formats: {
                LT: 'HH:mm',
                LTS: 'HH:mm:ss',
                L: 'DD/MM/YYYY',
                LL: 'D MMMM YYYY',
                LLL: 'D MMMM YYYY HH:mm',
                LLLL: 'dddd, D MMMM YYYY HH:mm'
              },
              relativeTime: {
                future: 'í~ñ %s',
                past: '%s á~gó',
                s: 'á ~féw ~sécó~ñds',
                m: 'á ~míñ~úté',
                mm: '%d m~íñú~tés',
                h: 'á~ñ hó~úr',
                hh: '%d h~óúrs',
                d: 'á ~dáý',
                dd: '%d d~áýs',
                M: 'á ~móñ~th',
                MM: '%d m~óñt~hs',
                y: 'á ~ýéár',
                yy: '%d ý~éárs'
              }
            }
          return (o.default.locale(s, null, !0), s)
        })
      })(Da)),
    Da.exports
  )
}
var TY = nF()
const aF = /* @__PURE__ */ F(TY),
  oF = /* @__PURE__ */ q(
    {
      __proto__: null,
      default: aF
    },
    [TY]
  )
var Ea = { exports: {} },
  sF = Ea.exports,
  um
function iF() {
  return (
    um ||
      ((um = 1),
      (function (e, a) {
        ;(function (n, r) {
          e.exports = r(R())
        })(sF, function (n) {
          function r(t) {
            return t && typeof t == 'object' && 'default' in t ? t : { default: t }
          }
          var o = r(n),
            s = {
              name: 'yo',
              weekdays: 'Àìkú_Ajé_Ìsẹ́gun_Ọjọ́rú_Ọjọ́bọ_Ẹtì_Àbámẹ́ta'.split('_'),
              months: 'Sẹ́rẹ́_Èrèlè_Ẹrẹ̀nà_Ìgbé_Èbibi_Òkùdu_Agẹmo_Ògún_Owewe_Ọ̀wàrà_Bélú_Ọ̀pẹ̀̀'.split(
                '_'
              ),
              weekStart: 1,
              weekdaysShort: 'Àìk_Ajé_Ìsẹ́_Ọjr_Ọjb_Ẹtì_Àbá'.split('_'),
              monthsShort: 'Sẹ́r_Èrl_Ẹrn_Ìgb_Èbi_Òkù_Agẹ_Ògú_Owe_Ọ̀wà_Bél_Ọ̀pẹ̀̀'.split('_'),
              weekdaysMin: 'Àì_Aj_Ìs_Ọr_Ọb_Ẹt_Àb'.split('_'),
              ordinal: function (t) {
                return t
              },
              formats: {
                LT: 'h:mm A',
                LTS: 'h:mm:ss A',
                L: 'DD/MM/YYYY',
                LL: 'D MMMM YYYY',
                LLL: 'D MMMM YYYY h:mm A',
                LLLL: 'dddd, D MMMM YYYY h:mm A'
              },
              relativeTime: {
                future: 'ní %s',
                past: '%s kọjá',
                s: 'ìsẹjú aayá die',
                m: 'ìsẹjú kan',
                mm: 'ìsẹjú %d',
                h: 'wákati kan',
                hh: 'wákati %d',
                d: 'ọjọ́ kan',
                dd: 'ọjọ́ %d',
                M: 'osù kan',
                MM: 'osù %d',
                y: 'ọdún kan',
                yy: 'ọdún %d'
              }
            }
          return (o.default.locale(s, null, !0), s)
        })
      })(Ea)),
    Ea.exports
  )
}
var $Y = iF()
const uF = /* @__PURE__ */ F($Y),
  lF = /* @__PURE__ */ q(
    {
      __proto__: null,
      default: uF
    },
    [$Y]
  )
var Ta = { exports: {} },
  dF = Ta.exports,
  lm
function cF() {
  return (
    lm ||
      ((lm = 1),
      (function (e, a) {
        ;(function (n, r) {
          e.exports = r(R())
        })(dF, function (n) {
          function r(t) {
            return t && typeof t == 'object' && 'default' in t ? t : { default: t }
          }
          var o = r(n),
            s = {
              name: 'zh-cn',
              weekdays: '星期日_星期一_星期二_星期三_星期四_星期五_星期六'.split('_'),
              weekdaysShort: '周日_周一_周二_周三_周四_周五_周六'.split('_'),
              weekdaysMin: '日_一_二_三_四_五_六'.split('_'),
              months: '一月_二月_三月_四月_五月_六月_七月_八月_九月_十月_十一月_十二月'.split('_'),
              monthsShort: '1月_2月_3月_4月_5月_6月_7月_8月_9月_10月_11月_12月'.split('_'),
              ordinal: function (t, i) {
                return i === 'W' ? t + '周' : t + '日'
              },
              weekStart: 1,
              yearStart: 4,
              formats: {
                LT: 'HH:mm',
                LTS: 'HH:mm:ss',
                L: 'YYYY/MM/DD',
                LL: 'YYYY年M月D日',
                LLL: 'YYYY年M月D日Ah点mm分',
                LLLL: 'YYYY年M月D日ddddAh点mm分',
                l: 'YYYY/M/D',
                ll: 'YYYY年M月D日',
                lll: 'YYYY年M月D日 HH:mm',
                llll: 'YYYY年M月D日dddd HH:mm'
              },
              relativeTime: {
                future: '%s内',
                past: '%s前',
                s: '几秒',
                m: '1 分钟',
                mm: '%d 分钟',
                h: '1 小时',
                hh: '%d 小时',
                d: '1 天',
                dd: '%d 天',
                M: '1 个月',
                MM: '%d 个月',
                y: '1 年',
                yy: '%d 年'
              },
              meridiem: function (t, i) {
                var u = 100 * t + i
                return u < 600
                  ? '凌晨'
                  : u < 900
                    ? '早上'
                    : u < 1100
                      ? '上午'
                      : u < 1300
                        ? '中午'
                        : u < 1800
                          ? '下午'
                          : '晚上'
              }
            }
          return (o.default.locale(s, null, !0), s)
        })
      })(Ta)),
    Ta.exports
  )
}
var HY = cF()
const _F = /* @__PURE__ */ F(HY),
  fF = /* @__PURE__ */ q(
    {
      __proto__: null,
      default: _F
    },
    [HY]
  )
var $a = { exports: {} },
  mF = $a.exports,
  dm
function pF() {
  return (
    dm ||
      ((dm = 1),
      (function (e, a) {
        ;(function (n, r) {
          e.exports = r(R())
        })(mF, function (n) {
          function r(t) {
            return t && typeof t == 'object' && 'default' in t ? t : { default: t }
          }
          var o = r(n),
            s = {
              name: 'zh-hk',
              months: '一月_二月_三月_四月_五月_六月_七月_八月_九月_十月_十一月_十二月'.split('_'),
              monthsShort: '1月_2月_3月_4月_5月_6月_7月_8月_9月_10月_11月_12月'.split('_'),
              weekdays: '星期日_星期一_星期二_星期三_星期四_星期五_星期六'.split('_'),
              weekdaysShort: '週日_週一_週二_週三_週四_週五_週六'.split('_'),
              weekdaysMin: '日_一_二_三_四_五_六'.split('_'),
              ordinal: function (t, i) {
                return i === 'W' ? t + '週' : t + '日'
              },
              formats: {
                LT: 'HH:mm',
                LTS: 'HH:mm:ss',
                L: 'YYYY/MM/DD',
                LL: 'YYYY年M月D日',
                LLL: 'YYYY年M月D日 HH:mm',
                LLLL: 'YYYY年M月D日dddd HH:mm',
                l: 'YYYY/M/D',
                ll: 'YYYY年M月D日',
                lll: 'YYYY年M月D日 HH:mm',
                llll: 'YYYY年M月D日dddd HH:mm'
              },
              relativeTime: {
                future: '%s內',
                past: '%s前',
                s: '幾秒',
                m: '一分鐘',
                mm: '%d 分鐘',
                h: '一小時',
                hh: '%d 小時',
                d: '一天',
                dd: '%d 天',
                M: '一個月',
                MM: '%d 個月',
                y: '一年',
                yy: '%d 年'
              },
              meridiem: function (t, i) {
                var u = 100 * t + i
                return u < 600
                  ? '凌晨'
                  : u < 900
                    ? '早上'
                    : u < 1100
                      ? '上午'
                      : u < 1300
                        ? '中午'
                        : u < 1800
                          ? '下午'
                          : '晚上'
              }
            }
          return (o.default.locale(s, null, !0), s)
        })
      })($a)),
    $a.exports
  )
}
var jY = pF()
const hF = /* @__PURE__ */ F(jY),
  vF = /* @__PURE__ */ q(
    {
      __proto__: null,
      default: hF
    },
    [jY]
  )
var Ha = { exports: {} },
  yF = Ha.exports,
  cm
function gF() {
  return (
    cm ||
      ((cm = 1),
      (function (e, a) {
        ;(function (n, r) {
          e.exports = r(R())
        })(yF, function (n) {
          function r(t) {
            return t && typeof t == 'object' && 'default' in t ? t : { default: t }
          }
          var o = r(n),
            s = {
              name: 'zh-tw',
              weekdays: '星期日_星期一_星期二_星期三_星期四_星期五_星期六'.split('_'),
              weekdaysShort: '週日_週一_週二_週三_週四_週五_週六'.split('_'),
              weekdaysMin: '日_一_二_三_四_五_六'.split('_'),
              months: '一月_二月_三月_四月_五月_六月_七月_八月_九月_十月_十一月_十二月'.split('_'),
              monthsShort: '1月_2月_3月_4月_5月_6月_7月_8月_9月_10月_11月_12月'.split('_'),
              ordinal: function (t, i) {
                return i === 'W' ? t + '週' : t + '日'
              },
              formats: {
                LT: 'HH:mm',
                LTS: 'HH:mm:ss',
                L: 'YYYY/MM/DD',
                LL: 'YYYY年M月D日',
                LLL: 'YYYY年M月D日 HH:mm',
                LLLL: 'YYYY年M月D日dddd HH:mm',
                l: 'YYYY/M/D',
                ll: 'YYYY年M月D日',
                lll: 'YYYY年M月D日 HH:mm',
                llll: 'YYYY年M月D日dddd HH:mm'
              },
              relativeTime: {
                future: '%s內',
                past: '%s前',
                s: '幾秒',
                m: '1 分鐘',
                mm: '%d 分鐘',
                h: '1 小時',
                hh: '%d 小時',
                d: '1 天',
                dd: '%d 天',
                M: '1 個月',
                MM: '%d 個月',
                y: '1 年',
                yy: '%d 年'
              },
              meridiem: function (t, i) {
                var u = 100 * t + i
                return u < 600
                  ? '凌晨'
                  : u < 900
                    ? '早上'
                    : u < 1100
                      ? '上午'
                      : u < 1300
                        ? '中午'
                        : u < 1800
                          ? '下午'
                          : '晚上'
              }
            }
          return (o.default.locale(s, null, !0), s)
        })
      })(Ha)),
    Ha.exports
  )
}
var CY = gF()
const MF = /* @__PURE__ */ F(CY),
  bF = /* @__PURE__ */ q(
    {
      __proto__: null,
      default: MF
    },
    [CY]
  )
var ja = { exports: {} },
  YF = ja.exports,
  _m
function wF() {
  return (
    _m ||
      ((_m = 1),
      (function (e, a) {
        ;(function (n, r) {
          e.exports = r(R())
        })(YF, function (n) {
          function r(t) {
            return t && typeof t == 'object' && 'default' in t ? t : { default: t }
          }
          var o = r(n),
            s = {
              name: 'zh',
              weekdays: '星期日_星期一_星期二_星期三_星期四_星期五_星期六'.split('_'),
              weekdaysShort: '周日_周一_周二_周三_周四_周五_周六'.split('_'),
              weekdaysMin: '日_一_二_三_四_五_六'.split('_'),
              months: '一月_二月_三月_四月_五月_六月_七月_八月_九月_十月_十一月_十二月'.split('_'),
              monthsShort: '1月_2月_3月_4月_5月_6月_7月_8月_9月_10月_11月_12月'.split('_'),
              ordinal: function (t, i) {
                return i === 'W' ? t + '周' : t + '日'
              },
              weekStart: 1,
              yearStart: 4,
              formats: {
                LT: 'HH:mm',
                LTS: 'HH:mm:ss',
                L: 'YYYY/MM/DD',
                LL: 'YYYY年M月D日',
                LLL: 'YYYY年M月D日Ah点mm分',
                LLLL: 'YYYY年M月D日ddddAh点mm分',
                l: 'YYYY/M/D',
                ll: 'YYYY年M月D日',
                lll: 'YYYY年M月D日 HH:mm',
                llll: 'YYYY年M月D日dddd HH:mm'
              },
              relativeTime: {
                future: '%s后',
                past: '%s前',
                s: '几秒',
                m: '1 分钟',
                mm: '%d 分钟',
                h: '1 小时',
                hh: '%d 小时',
                d: '1 天',
                dd: '%d 天',
                M: '1 个月',
                MM: '%d 个月',
                y: '1 年',
                yy: '%d 年'
              },
              meridiem: function (t, i) {
                var u = 100 * t + i
                return u < 600
                  ? '凌晨'
                  : u < 900
                    ? '早上'
                    : u < 1100
                      ? '上午'
                      : u < 1300
                        ? '中午'
                        : u < 1800
                          ? '下午'
                          : '晚上'
              }
            }
          return (o.default.locale(s, null, !0), s)
        })
      })(ja)),
    ja.exports
  )
}
var AY = wF()
const xF = /* @__PURE__ */ F(AY),
  LF = /* @__PURE__ */ q(
    {
      __proto__: null,
      default: xF
    },
    [AY]
  )
function Wd(e) {
  throw new Error(
    'Could not dynamically require "' +
      e +
      '". Please configure the dynamicRequireTargets or/and ignoreDynamicRequires option of @rollup/plugin-commonjs appropriately for this require call to work.'
  )
}
var bo, fm
function kF() {
  if (fm) return bo
  fm = 1
  function e() {
    ;((this.__data__ = []), (this.size = 0))
  }
  return ((bo = e), bo)
}
var Yo, mm
function gt() {
  if (mm) return Yo
  mm = 1
  function e(a, n) {
    return a === n || (a !== a && n !== n)
  }
  return ((Yo = e), Yo)
}
var wo, pm
function Ka() {
  if (pm) return wo
  pm = 1
  var e = gt()
  function a(n, r) {
    for (var o = n.length; o--; ) if (e(n[o][0], r)) return o
    return -1
  }
  return ((wo = a), wo)
}
var xo, hm
function SF() {
  if (hm) return xo
  hm = 1
  var e = Ka(),
    a = Array.prototype,
    n = a.splice
  function r(o) {
    var s = this.__data__,
      t = e(s, o)
    if (t < 0) return !1
    var i = s.length - 1
    return (t == i ? s.pop() : n.call(s, t, 1), --this.size, !0)
  }
  return ((xo = r), xo)
}
var Lo, vm
function DF() {
  if (vm) return Lo
  vm = 1
  var e = Ka()
  function a(n) {
    var r = this.__data__,
      o = e(r, n)
    return o < 0 ? void 0 : r[o][1]
  }
  return ((Lo = a), Lo)
}
var ko, ym
function EF() {
  if (ym) return ko
  ym = 1
  var e = Ka()
  function a(n) {
    return e(this.__data__, n) > -1
  }
  return ((ko = a), ko)
}
var So, gm
function TF() {
  if (gm) return So
  gm = 1
  var e = Ka()
  function a(n, r) {
    var o = this.__data__,
      s = e(o, n)
    return (s < 0 ? (++this.size, o.push([n, r])) : (o[s][1] = r), this)
  }
  return ((So = a), So)
}
var Do, Mm
function Xa() {
  if (Mm) return Do
  Mm = 1
  var e = kF(),
    a = SF(),
    n = DF(),
    r = EF(),
    o = TF()
  function s(t) {
    var i = -1,
      u = t == null ? 0 : t.length
    for (this.clear(); ++i < u; ) {
      var l = t[i]
      this.set(l[0], l[1])
    }
  }
  return (
    (s.prototype.clear = e),
    (s.prototype.delete = a),
    (s.prototype.get = n),
    (s.prototype.has = r),
    (s.prototype.set = o),
    (Do = s),
    Do
  )
}
var Eo, bm
function $F() {
  if (bm) return Eo
  bm = 1
  var e = Xa()
  function a() {
    ;((this.__data__ = new e()), (this.size = 0))
  }
  return ((Eo = a), Eo)
}
var To, Ym
function HF() {
  if (Ym) return To
  Ym = 1
  function e(a) {
    var n = this.__data__,
      r = n.delete(a)
    return ((this.size = n.size), r)
  }
  return ((To = e), To)
}
var $o, wm
function jF() {
  if (wm) return $o
  wm = 1
  function e(a) {
    return this.__data__.get(a)
  }
  return (($o = e), $o)
}
var Ho, xm
function CF() {
  if (xm) return Ho
  xm = 1
  function e(a) {
    return this.__data__.has(a)
  }
  return ((Ho = e), Ho)
}
var jo, Lm
function qY() {
  if (Lm) return jo
  Lm = 1
  var e = typeof Kt == 'object' && Kt && Kt.Object === Object && Kt
  return ((jo = e), jo)
}
var Co, km
function Oe() {
  if (km) return Co
  km = 1
  var e = qY(),
    a = typeof self == 'object' && self && self.Object === Object && self,
    n = e || a || Function('return this')()
  return ((Co = n), Co)
}
var Ao, Sm
function Mt() {
  if (Sm) return Ao
  Sm = 1
  var e = Oe(),
    a = e.Symbol
  return ((Ao = a), Ao)
}
var qo, Dm
function AF() {
  if (Dm) return qo
  Dm = 1
  var e = Mt(),
    a = Object.prototype,
    n = a.hasOwnProperty,
    r = a.toString,
    o = e ? e.toStringTag : void 0
  function s(t) {
    var i = n.call(t, o),
      u = t[o]
    try {
      t[o] = void 0
      var l = !0
    } catch {}
    var d = r.call(t)
    return (l && (i ? (t[o] = u) : delete t[o]), d)
  }
  return ((qo = s), qo)
}
var Fo, Em
function qF() {
  if (Em) return Fo
  Em = 1
  var e = Object.prototype,
    a = e.toString
  function n(r) {
    return a.call(r)
  }
  return ((Fo = n), Fo)
}
var Ro, Tm
function lt() {
  if (Tm) return Ro
  Tm = 1
  var e = Mt(),
    a = AF(),
    n = qF(),
    r = '[object Null]',
    o = '[object Undefined]',
    s = e ? e.toStringTag : void 0
  function t(i) {
    return i == null ? (i === void 0 ? o : r) : s && s in Object(i) ? a(i) : n(i)
  }
  return ((Ro = t), Ro)
}
var Io, $m
function Ie() {
  if ($m) return Io
  $m = 1
  function e(a) {
    var n = typeof a
    return a != null && (n == 'object' || n == 'function')
  }
  return ((Io = e), Io)
}
var Po, Hm
function Ft() {
  if (Hm) return Po
  Hm = 1
  var e = lt(),
    a = Ie(),
    n = '[object AsyncFunction]',
    r = '[object Function]',
    o = '[object GeneratorFunction]',
    s = '[object Proxy]'
  function t(i) {
    if (!a(i)) return !1
    var u = e(i)
    return u == r || u == o || u == n || u == s
  }
  return ((Po = t), Po)
}
var Bo, jm
function FF() {
  if (jm) return Bo
  jm = 1
  var e = Oe(),
    a = e['__core-js_shared__']
  return ((Bo = a), Bo)
}
var No, Cm
function RF() {
  if (Cm) return No
  Cm = 1
  var e = FF(),
    a = (function () {
      var r = /[^.]+$/.exec((e && e.keys && e.keys.IE_PROTO) || '')
      return r ? 'Symbol(src)_1.' + r : ''
    })()
  function n(r) {
    return !!a && a in r
  }
  return ((No = n), No)
}
var Oo, Am
function FY() {
  if (Am) return Oo
  Am = 1
  var e = Function.prototype,
    a = e.toString
  function n(r) {
    if (r != null) {
      try {
        return a.call(r)
      } catch {}
      try {
        return r + ''
      } catch {}
    }
    return ''
  }
  return ((Oo = n), Oo)
}
var zo, qm
function IF() {
  if (qm) return zo
  qm = 1
  var e = Ft(),
    a = RF(),
    n = Ie(),
    r = FY(),
    o = /[\\^$.*+?()[\]{}|]/g,
    s = /^\[object .+?Constructor\]$/,
    t = Function.prototype,
    i = Object.prototype,
    u = t.toString,
    l = i.hasOwnProperty,
    d = RegExp(
      '^' +
        u
          .call(l)
          .replace(o, '\\$&')
          .replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') +
        '$'
    )
  function c(_) {
    if (!n(_) || a(_)) return !1
    var f = e(_) ? d : s
    return f.test(r(_))
  }
  return ((zo = c), zo)
}
var Go, Fm
function PF() {
  if (Fm) return Go
  Fm = 1
  function e(a, n) {
    return a == null ? void 0 : a[n]
  }
  return ((Go = e), Go)
}
var Jo, Rm
function dt() {
  if (Rm) return Jo
  Rm = 1
  var e = IF(),
    a = PF()
  function n(r, o) {
    var s = a(r, o)
    return e(s) ? s : void 0
  }
  return ((Jo = n), Jo)
}
var Uo, Im
function Vd() {
  if (Im) return Uo
  Im = 1
  var e = dt(),
    a = Oe(),
    n = e(a, 'Map')
  return ((Uo = n), Uo)
}
var Wo, Pm
function Za() {
  if (Pm) return Wo
  Pm = 1
  var e = dt(),
    a = e(Object, 'create')
  return ((Wo = a), Wo)
}
var Vo, Bm
function BF() {
  if (Bm) return Vo
  Bm = 1
  var e = Za()
  function a() {
    ;((this.__data__ = e ? e(null) : {}), (this.size = 0))
  }
  return ((Vo = a), Vo)
}
var Ko, Nm
function NF() {
  if (Nm) return Ko
  Nm = 1
  function e(a) {
    var n = this.has(a) && delete this.__data__[a]
    return ((this.size -= n ? 1 : 0), n)
  }
  return ((Ko = e), Ko)
}
var Xo, Om
function OF() {
  if (Om) return Xo
  Om = 1
  var e = Za(),
    a = '__lodash_hash_undefined__',
    n = Object.prototype,
    r = n.hasOwnProperty
  function o(s) {
    var t = this.__data__
    if (e) {
      var i = t[s]
      return i === a ? void 0 : i
    }
    return r.call(t, s) ? t[s] : void 0
  }
  return ((Xo = o), Xo)
}
var Zo, zm
function zF() {
  if (zm) return Zo
  zm = 1
  var e = Za(),
    a = Object.prototype,
    n = a.hasOwnProperty
  function r(o) {
    var s = this.__data__
    return e ? s[o] !== void 0 : n.call(s, o)
  }
  return ((Zo = r), Zo)
}
var Qo, Gm
function GF() {
  if (Gm) return Qo
  Gm = 1
  var e = Za(),
    a = '__lodash_hash_undefined__'
  function n(r, o) {
    var s = this.__data__
    return ((this.size += this.has(r) ? 0 : 1), (s[r] = e && o === void 0 ? a : o), this)
  }
  return ((Qo = n), Qo)
}
var es, Jm
function JF() {
  if (Jm) return es
  Jm = 1
  var e = BF(),
    a = NF(),
    n = OF(),
    r = zF(),
    o = GF()
  function s(t) {
    var i = -1,
      u = t == null ? 0 : t.length
    for (this.clear(); ++i < u; ) {
      var l = t[i]
      this.set(l[0], l[1])
    }
  }
  return (
    (s.prototype.clear = e),
    (s.prototype.delete = a),
    (s.prototype.get = n),
    (s.prototype.has = r),
    (s.prototype.set = o),
    (es = s),
    es
  )
}
var ts, Um
function UF() {
  if (Um) return ts
  Um = 1
  var e = JF(),
    a = Xa(),
    n = Vd()
  function r() {
    ;((this.size = 0),
      (this.__data__ = {
        hash: new e(),
        map: new (n || a)(),
        string: new e()
      }))
  }
  return ((ts = r), ts)
}
var rs, Wm
function WF() {
  if (Wm) return rs
  Wm = 1
  function e(a) {
    var n = typeof a
    return n == 'string' || n == 'number' || n == 'symbol' || n == 'boolean'
      ? a !== '__proto__'
      : a === null
  }
  return ((rs = e), rs)
}
var ns, Vm
function Qa() {
  if (Vm) return ns
  Vm = 1
  var e = WF()
  function a(n, r) {
    var o = n.__data__
    return e(r) ? o[typeof r == 'string' ? 'string' : 'hash'] : o.map
  }
  return ((ns = a), ns)
}
var as, Km
function VF() {
  if (Km) return as
  Km = 1
  var e = Qa()
  function a(n) {
    var r = e(this, n).delete(n)
    return ((this.size -= r ? 1 : 0), r)
  }
  return ((as = a), as)
}
var os, Xm
function KF() {
  if (Xm) return os
  Xm = 1
  var e = Qa()
  function a(n) {
    return e(this, n).get(n)
  }
  return ((os = a), os)
}
var ss, Zm
function XF() {
  if (Zm) return ss
  Zm = 1
  var e = Qa()
  function a(n) {
    return e(this, n).has(n)
  }
  return ((ss = a), ss)
}
var is, Qm
function ZF() {
  if (Qm) return is
  Qm = 1
  var e = Qa()
  function a(n, r) {
    var o = e(this, n),
      s = o.size
    return (o.set(n, r), (this.size += o.size == s ? 0 : 1), this)
  }
  return ((is = a), is)
}
var us, ep
function Kd() {
  if (ep) return us
  ep = 1
  var e = UF(),
    a = VF(),
    n = KF(),
    r = XF(),
    o = ZF()
  function s(t) {
    var i = -1,
      u = t == null ? 0 : t.length
    for (this.clear(); ++i < u; ) {
      var l = t[i]
      this.set(l[0], l[1])
    }
  }
  return (
    (s.prototype.clear = e),
    (s.prototype.delete = a),
    (s.prototype.get = n),
    (s.prototype.has = r),
    (s.prototype.set = o),
    (us = s),
    us
  )
}
var ls, tp
function QF() {
  if (tp) return ls
  tp = 1
  var e = Xa(),
    a = Vd(),
    n = Kd(),
    r = 200
  function o(s, t) {
    var i = this.__data__
    if (i instanceof e) {
      var u = i.__data__
      if (!a || u.length < r - 1) return (u.push([s, t]), (this.size = ++i.size), this)
      i = this.__data__ = new n(u)
    }
    return (i.set(s, t), (this.size = i.size), this)
  }
  return ((ls = o), ls)
}
var ds, rp
function eo() {
  if (rp) return ds
  rp = 1
  var e = Xa(),
    a = $F(),
    n = HF(),
    r = jF(),
    o = CF(),
    s = QF()
  function t(i) {
    var u = (this.__data__ = new e(i))
    this.size = u.size
  }
  return (
    (t.prototype.clear = a),
    (t.prototype.delete = n),
    (t.prototype.get = r),
    (t.prototype.has = o),
    (t.prototype.set = s),
    (ds = t),
    ds
  )
}
var cs, np
function Xd() {
  if (np) return cs
  np = 1
  function e(a, n) {
    for (var r = -1, o = a == null ? 0 : a.length; ++r < o && n(a[r], r, a) !== !1; );
    return a
  }
  return ((cs = e), cs)
}
var _s, ap
function RY() {
  if (ap) return _s
  ap = 1
  var e = dt(),
    a = (function () {
      try {
        var n = e(Object, 'defineProperty')
        return (n({}, '', {}), n)
      } catch {}
    })()
  return ((_s = a), _s)
}
var fs, op
function to() {
  if (op) return fs
  op = 1
  var e = RY()
  function a(n, r, o) {
    r == '__proto__' && e
      ? e(n, r, {
          configurable: !0,
          enumerable: !0,
          value: o,
          writable: !0
        })
      : (n[r] = o)
  }
  return ((fs = a), fs)
}
var ms, sp
function ro() {
  if (sp) return ms
  sp = 1
  var e = to(),
    a = gt(),
    n = Object.prototype,
    r = n.hasOwnProperty
  function o(s, t, i) {
    var u = s[t]
    ;(!(r.call(s, t) && a(u, i)) || (i === void 0 && !(t in s))) && e(s, t, i)
  }
  return ((ms = o), ms)
}
var ps, ip
function Rt() {
  if (ip) return ps
  ip = 1
  var e = ro(),
    a = to()
  function n(r, o, s, t) {
    var i = !s
    s || (s = {})
    for (var u = -1, l = o.length; ++u < l; ) {
      var d = o[u],
        c = t ? t(s[d], r[d], d, s, r) : void 0
      ;(c === void 0 && (c = r[d]), i ? a(s, d, c) : e(s, d, c))
    }
    return s
  }
  return ((ps = n), ps)
}
var hs, up
function e3() {
  if (up) return hs
  up = 1
  function e(a, n) {
    for (var r = -1, o = Array(a); ++r < a; ) o[r] = n(r)
    return o
  }
  return ((hs = e), hs)
}
var vs, lp
function Je() {
  if (lp) return vs
  lp = 1
  function e(a) {
    return a != null && typeof a == 'object'
  }
  return ((vs = e), vs)
}
var ys, dp
function t3() {
  if (dp) return ys
  dp = 1
  var e = lt(),
    a = Je(),
    n = '[object Arguments]'
  function r(o) {
    return a(o) && e(o) == n
  }
  return ((ys = r), ys)
}
var gs, cp
function It() {
  if (cp) return gs
  cp = 1
  var e = t3(),
    a = Je(),
    n = Object.prototype,
    r = n.hasOwnProperty,
    o = n.propertyIsEnumerable,
    s = e(
      /* @__PURE__ */ (function () {
        return arguments
      })()
    )
      ? e
      : function (t) {
          return a(t) && r.call(t, 'callee') && !o.call(t, 'callee')
        }
  return ((gs = s), gs)
}
var Ms, _p
function xe() {
  if (_p) return Ms
  _p = 1
  var e = Array.isArray
  return ((Ms = e), Ms)
}
var kt = { exports: {} },
  bs,
  fp
function r3() {
  if (fp) return bs
  fp = 1
  function e() {
    return !1
  }
  return ((bs = e), bs)
}
kt.exports
var mp
function bt() {
  return (
    mp ||
      ((mp = 1),
      (function (e, a) {
        var n = Oe(),
          r = r3(),
          o = a && !a.nodeType && a,
          s = o && !0 && e && !e.nodeType && e,
          t = s && s.exports === o,
          i = t ? n.Buffer : void 0,
          u = i ? i.isBuffer : void 0,
          l = u || r
        e.exports = l
      })(kt, kt.exports)),
    kt.exports
  )
}
var Ys, pp
function no() {
  if (pp) return Ys
  pp = 1
  var e = 9007199254740991,
    a = /^(?:0|[1-9]\d*)$/
  function n(r, o) {
    var s = typeof r
    return (
      (o = o ?? e),
      !!o && (s == 'number' || (s != 'symbol' && a.test(r))) && r > -1 && r % 1 == 0 && r < o
    )
  }
  return ((Ys = n), Ys)
}
var ws, hp
function Zd() {
  if (hp) return ws
  hp = 1
  var e = 9007199254740991
  function a(n) {
    return typeof n == 'number' && n > -1 && n % 1 == 0 && n <= e
  }
  return ((ws = a), ws)
}
var xs, vp
function n3() {
  if (vp) return xs
  vp = 1
  var e = lt(),
    a = Zd(),
    n = Je(),
    r = '[object Arguments]',
    o = '[object Array]',
    s = '[object Boolean]',
    t = '[object Date]',
    i = '[object Error]',
    u = '[object Function]',
    l = '[object Map]',
    d = '[object Number]',
    c = '[object Object]',
    _ = '[object RegExp]',
    f = '[object Set]',
    m = '[object String]',
    h = '[object WeakMap]',
    y = '[object ArrayBuffer]',
    p = '[object DataView]',
    v = '[object Float32Array]',
    g = '[object Float64Array]',
    M = '[object Int8Array]',
    w = '[object Int16Array]',
    L = '[object Int32Array]',
    D = '[object Uint8Array]',
    Y = '[object Uint8ClampedArray]',
    E = '[object Uint16Array]',
    k = '[object Uint32Array]',
    S = {}
  ;((S[v] = S[g] = S[M] = S[w] = S[L] = S[D] = S[Y] = S[E] = S[k] = !0),
    (S[r] =
      S[o] =
      S[y] =
      S[s] =
      S[p] =
      S[t] =
      S[i] =
      S[u] =
      S[l] =
      S[d] =
      S[c] =
      S[_] =
      S[f] =
      S[m] =
      S[h] =
        !1))
  function O(z) {
    return n(z) && a(z.length) && !!S[e(z)]
  }
  return ((xs = O), xs)
}
var Ls, yp
function ao() {
  if (yp) return Ls
  yp = 1
  function e(a) {
    return function (n) {
      return a(n)
    }
  }
  return ((Ls = e), Ls)
}
var St = { exports: {} }
St.exports
var gp
function Qd() {
  return (
    gp ||
      ((gp = 1),
      (function (e, a) {
        var n = qY(),
          r = a && !a.nodeType && a,
          o = r && !0 && e && !e.nodeType && e,
          s = o && o.exports === r,
          t = s && n.process,
          i = (function () {
            try {
              var u = o && o.require && o.require('util').types
              return u || (t && t.binding && t.binding('util'))
            } catch {}
          })()
        e.exports = i
      })(St, St.exports)),
    St.exports
  )
}
var ks, Mp
function Pt() {
  if (Mp) return ks
  Mp = 1
  var e = n3(),
    a = ao(),
    n = Qd(),
    r = n && n.isTypedArray,
    o = r ? a(r) : e
  return ((ks = o), ks)
}
var Ss, bp
function IY() {
  if (bp) return Ss
  bp = 1
  var e = e3(),
    a = It(),
    n = xe(),
    r = bt(),
    o = no(),
    s = Pt(),
    t = Object.prototype,
    i = t.hasOwnProperty
  function u(l, d) {
    var c = n(l),
      _ = !c && a(l),
      f = !c && !_ && r(l),
      m = !c && !_ && !f && s(l),
      h = c || _ || f || m,
      y = h ? e(l.length, String) : [],
      p = y.length
    for (var v in l)
      (d || i.call(l, v)) &&
        !(
          h && // Safari 9 has enumerable `arguments.length` in strict mode.
          (v == 'length' || // Node.js 0.10 has enumerable non-index properties on buffers.
            (f && (v == 'offset' || v == 'parent')) || // PhantomJS 2 has enumerable non-index properties on typed arrays.
            (m && (v == 'buffer' || v == 'byteLength' || v == 'byteOffset')) || // Skip index properties.
            o(v, p))
        ) &&
        y.push(v)
    return y
  }
  return ((Ss = u), Ss)
}
var Ds, Yp
function oo() {
  if (Yp) return Ds
  Yp = 1
  var e = Object.prototype
  function a(n) {
    var r = n && n.constructor,
      o = (typeof r == 'function' && r.prototype) || e
    return n === o
  }
  return ((Ds = a), Ds)
}
var Es, wp
function PY() {
  if (wp) return Es
  wp = 1
  function e(a, n) {
    return function (r) {
      return a(n(r))
    }
  }
  return ((Es = e), Es)
}
var Ts, xp
function a3() {
  if (xp) return Ts
  xp = 1
  var e = PY(),
    a = e(Object.keys, Object)
  return ((Ts = a), Ts)
}
var $s, Lp
function ec() {
  if (Lp) return $s
  Lp = 1
  var e = oo(),
    a = a3(),
    n = Object.prototype,
    r = n.hasOwnProperty
  function o(s) {
    if (!e(s)) return a(s)
    var t = []
    for (var i in Object(s)) r.call(s, i) && i != 'constructor' && t.push(i)
    return t
  }
  return (($s = o), $s)
}
var Hs, kp
function Ke() {
  if (kp) return Hs
  kp = 1
  var e = Ft(),
    a = Zd()
  function n(r) {
    return r != null && a(r.length) && !e(r)
  }
  return ((Hs = n), Hs)
}
var js, Sp
function ot() {
  if (Sp) return js
  Sp = 1
  var e = IY(),
    a = ec(),
    n = Ke()
  function r(o) {
    return n(o) ? e(o) : a(o)
  }
  return ((js = r), js)
}
var Cs, Dp
function o3() {
  if (Dp) return Cs
  Dp = 1
  var e = Rt(),
    a = ot()
  function n(r, o) {
    return r && e(o, a(o), r)
  }
  return ((Cs = n), Cs)
}
var As, Ep
function s3() {
  if (Ep) return As
  Ep = 1
  function e(a) {
    var n = []
    if (a != null) for (var r in Object(a)) n.push(r)
    return n
  }
  return ((As = e), As)
}
var qs, Tp
function i3() {
  if (Tp) return qs
  Tp = 1
  var e = Ie(),
    a = oo(),
    n = s3(),
    r = Object.prototype,
    o = r.hasOwnProperty
  function s(t) {
    if (!e(t)) return n(t)
    var i = a(t),
      u = []
    for (var l in t) (l == 'constructor' && (i || !o.call(t, l))) || u.push(l)
    return u
  }
  return ((qs = s), qs)
}
var Fs, $p
function ct() {
  if ($p) return Fs
  $p = 1
  var e = IY(),
    a = i3(),
    n = Ke()
  function r(o) {
    return n(o) ? e(o, !0) : a(o)
  }
  return ((Fs = r), Fs)
}
var Rs, Hp
function u3() {
  if (Hp) return Rs
  Hp = 1
  var e = Rt(),
    a = ct()
  function n(r, o) {
    return r && e(o, a(o), r)
  }
  return ((Rs = n), Rs)
}
var Dt = { exports: {} }
Dt.exports
var jp
function BY() {
  return (
    jp ||
      ((jp = 1),
      (function (e, a) {
        var n = Oe(),
          r = a && !a.nodeType && a,
          o = r && !0 && e && !e.nodeType && e,
          s = o && o.exports === r,
          t = s ? n.Buffer : void 0,
          i = t ? t.allocUnsafe : void 0
        function u(l, d) {
          if (d) return l.slice()
          var c = l.length,
            _ = i ? i(c) : new l.constructor(c)
          return (l.copy(_), _)
        }
        e.exports = u
      })(Dt, Dt.exports)),
    Dt.exports
  )
}
var Is, Cp
function NY() {
  if (Cp) return Is
  Cp = 1
  function e(a, n) {
    var r = -1,
      o = a.length
    for (n || (n = Array(o)); ++r < o; ) n[r] = a[r]
    return n
  }
  return ((Is = e), Is)
}
var Ps, Ap
function OY() {
  if (Ap) return Ps
  Ap = 1
  function e(a, n) {
    for (var r = -1, o = a == null ? 0 : a.length, s = 0, t = []; ++r < o; ) {
      var i = a[r]
      n(i, r, a) && (t[s++] = i)
    }
    return t
  }
  return ((Ps = e), Ps)
}
var Bs, qp
function zY() {
  if (qp) return Bs
  qp = 1
  function e() {
    return []
  }
  return ((Bs = e), Bs)
}
var Ns, Fp
function tc() {
  if (Fp) return Ns
  Fp = 1
  var e = OY(),
    a = zY(),
    n = Object.prototype,
    r = n.propertyIsEnumerable,
    o = Object.getOwnPropertySymbols,
    s = o
      ? function (t) {
          return t == null
            ? []
            : ((t = Object(t)),
              e(o(t), function (i) {
                return r.call(t, i)
              }))
        }
      : a
  return ((Ns = s), Ns)
}
var Os, Rp
function l3() {
  if (Rp) return Os
  Rp = 1
  var e = Rt(),
    a = tc()
  function n(r, o) {
    return e(r, a(r), o)
  }
  return ((Os = n), Os)
}
var zs, Ip
function rc() {
  if (Ip) return zs
  Ip = 1
  function e(a, n) {
    for (var r = -1, o = n.length, s = a.length; ++r < o; ) a[s + r] = n[r]
    return a
  }
  return ((zs = e), zs)
}
var Gs, Pp
function so() {
  if (Pp) return Gs
  Pp = 1
  var e = PY(),
    a = e(Object.getPrototypeOf, Object)
  return ((Gs = a), Gs)
}
var Js, Bp
function GY() {
  if (Bp) return Js
  Bp = 1
  var e = rc(),
    a = so(),
    n = tc(),
    r = zY(),
    o = Object.getOwnPropertySymbols,
    s = o
      ? function (t) {
          for (var i = []; t; ) (e(i, n(t)), (t = a(t)))
          return i
        }
      : r
  return ((Js = s), Js)
}
var Us, Np
function d3() {
  if (Np) return Us
  Np = 1
  var e = Rt(),
    a = GY()
  function n(r, o) {
    return e(r, a(r), o)
  }
  return ((Us = n), Us)
}
var Ws, Op
function JY() {
  if (Op) return Ws
  Op = 1
  var e = rc(),
    a = xe()
  function n(r, o, s) {
    var t = o(r)
    return a(r) ? t : e(t, s(r))
  }
  return ((Ws = n), Ws)
}
var Vs, zp
function UY() {
  if (zp) return Vs
  zp = 1
  var e = JY(),
    a = tc(),
    n = ot()
  function r(o) {
    return e(o, n, a)
  }
  return ((Vs = r), Vs)
}
var Ks, Gp
function c3() {
  if (Gp) return Ks
  Gp = 1
  var e = JY(),
    a = GY(),
    n = ct()
  function r(o) {
    return e(o, n, a)
  }
  return ((Ks = r), Ks)
}
var Xs, Jp
function _3() {
  if (Jp) return Xs
  Jp = 1
  var e = dt(),
    a = Oe(),
    n = e(a, 'DataView')
  return ((Xs = n), Xs)
}
var Zs, Up
function f3() {
  if (Up) return Zs
  Up = 1
  var e = dt(),
    a = Oe(),
    n = e(a, 'Promise')
  return ((Zs = n), Zs)
}
var Qs, Wp
function WY() {
  if (Wp) return Qs
  Wp = 1
  var e = dt(),
    a = Oe(),
    n = e(a, 'Set')
  return ((Qs = n), Qs)
}
var ei, Vp
function m3() {
  if (Vp) return ei
  Vp = 1
  var e = dt(),
    a = Oe(),
    n = e(a, 'WeakMap')
  return ((ei = n), ei)
}
var ti, Kp
function Yt() {
  if (Kp) return ti
  Kp = 1
  var e = _3(),
    a = Vd(),
    n = f3(),
    r = WY(),
    o = m3(),
    s = lt(),
    t = FY(),
    i = '[object Map]',
    u = '[object Object]',
    l = '[object Promise]',
    d = '[object Set]',
    c = '[object WeakMap]',
    _ = '[object DataView]',
    f = t(e),
    m = t(a),
    h = t(n),
    y = t(r),
    p = t(o),
    v = s
  return (
    ((e && v(new e(new ArrayBuffer(1))) != _) ||
      (a && v(new a()) != i) ||
      (n && v(n.resolve()) != l) ||
      (r && v(new r()) != d) ||
      (o && v(new o()) != c)) &&
      (v = function (g) {
        var M = s(g),
          w = M == u ? g.constructor : void 0,
          L = w ? t(w) : ''
        if (L)
          switch (L) {
            case f:
              return _
            case m:
              return i
            case h:
              return l
            case y:
              return d
            case p:
              return c
          }
        return M
      }),
    (ti = v),
    ti
  )
}
var ri, Xp
function p3() {
  if (Xp) return ri
  Xp = 1
  var e = Object.prototype,
    a = e.hasOwnProperty
  function n(r) {
    var o = r.length,
      s = new r.constructor(o)
    return (
      o &&
        typeof r[0] == 'string' &&
        a.call(r, 'index') &&
        ((s.index = r.index), (s.input = r.input)),
      s
    )
  }
  return ((ri = n), ri)
}
var ni, Zp
function VY() {
  if (Zp) return ni
  Zp = 1
  var e = Oe(),
    a = e.Uint8Array
  return ((ni = a), ni)
}
var ai, Qp
function nc() {
  if (Qp) return ai
  Qp = 1
  var e = VY()
  function a(n) {
    var r = new n.constructor(n.byteLength)
    return (new e(r).set(new e(n)), r)
  }
  return ((ai = a), ai)
}
var oi, eh
function h3() {
  if (eh) return oi
  eh = 1
  var e = nc()
  function a(n, r) {
    var o = r ? e(n.buffer) : n.buffer
    return new n.constructor(o, n.byteOffset, n.byteLength)
  }
  return ((oi = a), oi)
}
var si, th
function v3() {
  if (th) return si
  th = 1
  var e = /\w*$/
  function a(n) {
    var r = new n.constructor(n.source, e.exec(n))
    return ((r.lastIndex = n.lastIndex), r)
  }
  return ((si = a), si)
}
var ii, rh
function y3() {
  if (rh) return ii
  rh = 1
  var e = Mt(),
    a = e ? e.prototype : void 0,
    n = a ? a.valueOf : void 0
  function r(o) {
    return n ? Object(n.call(o)) : {}
  }
  return ((ii = r), ii)
}
var ui, nh
function KY() {
  if (nh) return ui
  nh = 1
  var e = nc()
  function a(n, r) {
    var o = r ? e(n.buffer) : n.buffer
    return new n.constructor(o, n.byteOffset, n.length)
  }
  return ((ui = a), ui)
}
var li, ah
function g3() {
  if (ah) return li
  ah = 1
  var e = nc(),
    a = h3(),
    n = v3(),
    r = y3(),
    o = KY(),
    s = '[object Boolean]',
    t = '[object Date]',
    i = '[object Map]',
    u = '[object Number]',
    l = '[object RegExp]',
    d = '[object Set]',
    c = '[object String]',
    _ = '[object Symbol]',
    f = '[object ArrayBuffer]',
    m = '[object DataView]',
    h = '[object Float32Array]',
    y = '[object Float64Array]',
    p = '[object Int8Array]',
    v = '[object Int16Array]',
    g = '[object Int32Array]',
    M = '[object Uint8Array]',
    w = '[object Uint8ClampedArray]',
    L = '[object Uint16Array]',
    D = '[object Uint32Array]'
  function Y(E, k, S) {
    var O = E.constructor
    switch (k) {
      case f:
        return e(E)
      case s:
      case t:
        return new O(+E)
      case m:
        return a(E, S)
      case h:
      case y:
      case p:
      case v:
      case g:
      case M:
      case w:
      case L:
      case D:
        return o(E, S)
      case i:
        return new O()
      case u:
      case c:
        return new O(E)
      case l:
        return n(E)
      case d:
        return new O()
      case _:
        return r(E)
    }
  }
  return ((li = Y), li)
}
var di, oh
function XY() {
  if (oh) return di
  oh = 1
  var e = Ie(),
    a = Object.create,
    n = /* @__PURE__ */ (function () {
      function r() {}
      return function (o) {
        if (!e(o)) return {}
        if (a) return a(o)
        r.prototype = o
        var s = new r()
        return ((r.prototype = void 0), s)
      }
    })()
  return ((di = n), di)
}
var ci, sh
function ZY() {
  if (sh) return ci
  sh = 1
  var e = XY(),
    a = so(),
    n = oo()
  function r(o) {
    return typeof o.constructor == 'function' && !n(o) ? e(a(o)) : {}
  }
  return ((ci = r), ci)
}
var _i, ih
function M3() {
  if (ih) return _i
  ih = 1
  var e = Yt(),
    a = Je(),
    n = '[object Map]'
  function r(o) {
    return a(o) && e(o) == n
  }
  return ((_i = r), _i)
}
var fi, uh
function b3() {
  if (uh) return fi
  uh = 1
  var e = M3(),
    a = ao(),
    n = Qd(),
    r = n && n.isMap,
    o = r ? a(r) : e
  return ((fi = o), fi)
}
var mi, lh
function Y3() {
  if (lh) return mi
  lh = 1
  var e = Yt(),
    a = Je(),
    n = '[object Set]'
  function r(o) {
    return a(o) && e(o) == n
  }
  return ((mi = r), mi)
}
var pi, dh
function w3() {
  if (dh) return pi
  dh = 1
  var e = Y3(),
    a = ao(),
    n = Qd(),
    r = n && n.isSet,
    o = r ? a(r) : e
  return ((pi = o), pi)
}
var hi, ch
function QY() {
  if (ch) return hi
  ch = 1
  var e = eo(),
    a = Xd(),
    n = ro(),
    r = o3(),
    o = u3(),
    s = BY(),
    t = NY(),
    i = l3(),
    u = d3(),
    l = UY(),
    d = c3(),
    c = Yt(),
    _ = p3(),
    f = g3(),
    m = ZY(),
    h = xe(),
    y = bt(),
    p = b3(),
    v = Ie(),
    g = w3(),
    M = ot(),
    w = ct(),
    L = 1,
    D = 2,
    Y = 4,
    E = '[object Arguments]',
    k = '[object Array]',
    S = '[object Boolean]',
    O = '[object Date]',
    z = '[object Error]',
    T = '[object Function]',
    x = '[object GeneratorFunction]',
    H = '[object Map]',
    G = '[object Number]',
    N = '[object Object]',
    W = '[object RegExp]',
    Z = '[object Set]',
    K = '[object String]',
    ne = '[object Symbol]',
    se = '[object WeakMap]',
    A = '[object ArrayBuffer]',
    B = '[object DataView]',
    U = '[object Float32Array]',
    V = '[object Float64Array]',
    oe = '[object Int8Array]',
    ce = '[object Int16Array]',
    le = '[object Int32Array]',
    he = '[object Uint8Array]',
    qe = '[object Uint8ClampedArray]',
    be = '[object Uint16Array]',
    Se = '[object Uint32Array]',
    _e = {}
  ;((_e[E] =
    _e[k] =
    _e[A] =
    _e[B] =
    _e[S] =
    _e[O] =
    _e[U] =
    _e[V] =
    _e[oe] =
    _e[ce] =
    _e[le] =
    _e[H] =
    _e[G] =
    _e[N] =
    _e[W] =
    _e[Z] =
    _e[K] =
    _e[ne] =
    _e[he] =
    _e[qe] =
    _e[be] =
    _e[Se] =
      !0),
    (_e[z] = _e[T] = _e[se] = !1))
  function Ue(fe, Ze, Qe, mo, ft, ze) {
    var Ee,
      mt = Ze & L,
      st = Ze & D,
      Nt = Ze & Y
    if ((Qe && (Ee = ft ? Qe(fe, mo, ft, ze) : Qe(fe)), Ee !== void 0)) return Ee
    if (!v(fe)) return fe
    var Ot = h(fe)
    if (Ot) {
      if (((Ee = _(fe)), !mt)) return t(fe, Ee)
    } else {
      var et = c(fe),
        zt = et == T || et == x
      if (y(fe)) return s(fe, mt)
      if (et == N || et == E || (zt && !ft)) {
        if (((Ee = st || zt ? {} : m(fe)), !mt)) return st ? u(fe, o(Ee, fe)) : i(fe, r(Ee, fe))
      } else {
        if (!_e[et]) return ft ? fe : {}
        Ee = f(fe, et, mt)
      }
    }
    ze || (ze = new e())
    var Gt = ze.get(fe)
    if (Gt) return Gt
    ;(ze.set(fe, Ee),
      g(fe)
        ? fe.forEach(function (Ge) {
            Ee.add(Ue(Ge, Ze, Qe, Ge, fe, ze))
          })
        : p(fe) &&
          fe.forEach(function (Ge, Be) {
            Ee.set(Be, Ue(Ge, Ze, Qe, Be, fe, ze))
          }))
    var po = Nt ? (st ? d : l) : st ? w : M,
      Jt = Ot ? void 0 : po(fe)
    return (
      a(Jt || fe, function (Ge, Be) {
        ;(Jt && ((Be = Ge), (Ge = fe[Be])), n(Ee, Be, Ue(Ge, Ze, Qe, Be, fe, ze)))
      }),
      Ee
    )
  }
  return ((hi = Ue), hi)
}
var vi, _h
function x3() {
  if (_h) return vi
  _h = 1
  var e = QY(),
    a = 4
  function n(r) {
    return e(r, a)
  }
  return ((vi = n), vi)
}
var yi, fh
function ac() {
  if (fh) return yi
  fh = 1
  function e(a) {
    return function () {
      return a
    }
  }
  return ((yi = e), yi)
}
var gi, mh
function L3() {
  if (mh) return gi
  mh = 1
  function e(a) {
    return function (n, r, o) {
      for (var s = -1, t = Object(n), i = o(n), u = i.length; u--; ) {
        var l = i[a ? u : ++s]
        if (r(t[l], l, t) === !1) break
      }
      return n
    }
  }
  return ((gi = e), gi)
}
var Mi, ph
function oc() {
  if (ph) return Mi
  ph = 1
  var e = L3(),
    a = e()
  return ((Mi = a), Mi)
}
var bi, hh
function sc() {
  if (hh) return bi
  hh = 1
  var e = oc(),
    a = ot()
  function n(r, o) {
    return r && e(r, o, a)
  }
  return ((bi = n), bi)
}
var Yi, vh
function k3() {
  if (vh) return Yi
  vh = 1
  var e = Ke()
  function a(n, r) {
    return function (o, s) {
      if (o == null) return o
      if (!e(o)) return n(o, s)
      for (
        var t = o.length, i = r ? t : -1, u = Object(o);
        (r ? i-- : ++i < t) && s(u[i], i, u) !== !1;
      );
      return o
    }
  }
  return ((Yi = a), Yi)
}
var wi, yh
function io() {
  if (yh) return wi
  yh = 1
  var e = sc(),
    a = k3(),
    n = a(e)
  return ((wi = n), wi)
}
var xi, gh
function _t() {
  if (gh) return xi
  gh = 1
  function e(a) {
    return a
  }
  return ((xi = e), xi)
}
var Li, Mh
function e1() {
  if (Mh) return Li
  Mh = 1
  var e = _t()
  function a(n) {
    return typeof n == 'function' ? n : e
  }
  return ((Li = a), Li)
}
var ki, bh
function t1() {
  if (bh) return ki
  bh = 1
  var e = Xd(),
    a = io(),
    n = e1(),
    r = xe()
  function o(s, t) {
    var i = r(s) ? e : a
    return i(s, n(t))
  }
  return ((ki = o), ki)
}
var Si, Yh
function r1() {
  return (Yh || ((Yh = 1), (Si = t1())), Si)
}
var Di, wh
function S3() {
  if (wh) return Di
  wh = 1
  var e = io()
  function a(n, r) {
    var o = []
    return (
      e(n, function (s, t, i) {
        r(s, t, i) && o.push(s)
      }),
      o
    )
  }
  return ((Di = a), Di)
}
var Ei, xh
function D3() {
  if (xh) return Ei
  xh = 1
  var e = '__lodash_hash_undefined__'
  function a(n) {
    return (this.__data__.set(n, e), this)
  }
  return ((Ei = a), Ei)
}
var Ti, Lh
function E3() {
  if (Lh) return Ti
  Lh = 1
  function e(a) {
    return this.__data__.has(a)
  }
  return ((Ti = e), Ti)
}
var $i, kh
function n1() {
  if (kh) return $i
  kh = 1
  var e = Kd(),
    a = D3(),
    n = E3()
  function r(o) {
    var s = -1,
      t = o == null ? 0 : o.length
    for (this.__data__ = new e(); ++s < t; ) this.add(o[s])
  }
  return ((r.prototype.add = r.prototype.push = a), (r.prototype.has = n), ($i = r), $i)
}
var Hi, Sh
function T3() {
  if (Sh) return Hi
  Sh = 1
  function e(a, n) {
    for (var r = -1, o = a == null ? 0 : a.length; ++r < o; ) if (n(a[r], r, a)) return !0
    return !1
  }
  return ((Hi = e), Hi)
}
var ji, Dh
function a1() {
  if (Dh) return ji
  Dh = 1
  function e(a, n) {
    return a.has(n)
  }
  return ((ji = e), ji)
}
var Ci, Eh
function o1() {
  if (Eh) return Ci
  Eh = 1
  var e = n1(),
    a = T3(),
    n = a1(),
    r = 1,
    o = 2
  function s(t, i, u, l, d, c) {
    var _ = u & r,
      f = t.length,
      m = i.length
    if (f != m && !(_ && m > f)) return !1
    var h = c.get(t),
      y = c.get(i)
    if (h && y) return h == i && y == t
    var p = -1,
      v = !0,
      g = u & o ? new e() : void 0
    for (c.set(t, i), c.set(i, t); ++p < f; ) {
      var M = t[p],
        w = i[p]
      if (l) var L = _ ? l(w, M, p, i, t, c) : l(M, w, p, t, i, c)
      if (L !== void 0) {
        if (L) continue
        v = !1
        break
      }
      if (g) {
        if (
          !a(i, function (D, Y) {
            if (!n(g, Y) && (M === D || d(M, D, u, l, c))) return g.push(Y)
          })
        ) {
          v = !1
          break
        }
      } else if (!(M === w || d(M, w, u, l, c))) {
        v = !1
        break
      }
    }
    return (c.delete(t), c.delete(i), v)
  }
  return ((Ci = s), Ci)
}
var Ai, Th
function $3() {
  if (Th) return Ai
  Th = 1
  function e(a) {
    var n = -1,
      r = Array(a.size)
    return (
      a.forEach(function (o, s) {
        r[++n] = [s, o]
      }),
      r
    )
  }
  return ((Ai = e), Ai)
}
var qi, $h
function ic() {
  if ($h) return qi
  $h = 1
  function e(a) {
    var n = -1,
      r = Array(a.size)
    return (
      a.forEach(function (o) {
        r[++n] = o
      }),
      r
    )
  }
  return ((qi = e), qi)
}
var Fi, Hh
function H3() {
  if (Hh) return Fi
  Hh = 1
  var e = Mt(),
    a = VY(),
    n = gt(),
    r = o1(),
    o = $3(),
    s = ic(),
    t = 1,
    i = 2,
    u = '[object Boolean]',
    l = '[object Date]',
    d = '[object Error]',
    c = '[object Map]',
    _ = '[object Number]',
    f = '[object RegExp]',
    m = '[object Set]',
    h = '[object String]',
    y = '[object Symbol]',
    p = '[object ArrayBuffer]',
    v = '[object DataView]',
    g = e ? e.prototype : void 0,
    M = g ? g.valueOf : void 0
  function w(L, D, Y, E, k, S, O) {
    switch (Y) {
      case v:
        if (L.byteLength != D.byteLength || L.byteOffset != D.byteOffset) return !1
        ;((L = L.buffer), (D = D.buffer))
      case p:
        return !(L.byteLength != D.byteLength || !S(new a(L), new a(D)))
      case u:
      case l:
      case _:
        return n(+L, +D)
      case d:
        return L.name == D.name && L.message == D.message
      case f:
      case h:
        return L == D + ''
      case c:
        var z = o
      case m:
        var T = E & t
        if ((z || (z = s), L.size != D.size && !T)) return !1
        var x = O.get(L)
        if (x) return x == D
        ;((E |= i), O.set(L, D))
        var H = r(z(L), z(D), E, k, S, O)
        return (O.delete(L), H)
      case y:
        if (M) return M.call(L) == M.call(D)
    }
    return !1
  }
  return ((Fi = w), Fi)
}
var Ri, jh
function j3() {
  if (jh) return Ri
  jh = 1
  var e = UY(),
    a = 1,
    n = Object.prototype,
    r = n.hasOwnProperty
  function o(s, t, i, u, l, d) {
    var c = i & a,
      _ = e(s),
      f = _.length,
      m = e(t),
      h = m.length
    if (f != h && !c) return !1
    for (var y = f; y--; ) {
      var p = _[y]
      if (!(c ? p in t : r.call(t, p))) return !1
    }
    var v = d.get(s),
      g = d.get(t)
    if (v && g) return v == t && g == s
    var M = !0
    ;(d.set(s, t), d.set(t, s))
    for (var w = c; ++y < f; ) {
      p = _[y]
      var L = s[p],
        D = t[p]
      if (u) var Y = c ? u(D, L, p, t, s, d) : u(L, D, p, s, t, d)
      if (!(Y === void 0 ? L === D || l(L, D, i, u, d) : Y)) {
        M = !1
        break
      }
      w || (w = p == 'constructor')
    }
    if (M && !w) {
      var E = s.constructor,
        k = t.constructor
      E != k &&
        'constructor' in s &&
        'constructor' in t &&
        !(typeof E == 'function' && E instanceof E && typeof k == 'function' && k instanceof k) &&
        (M = !1)
    }
    return (d.delete(s), d.delete(t), M)
  }
  return ((Ri = o), Ri)
}
var Ii, Ch
function C3() {
  if (Ch) return Ii
  Ch = 1
  var e = eo(),
    a = o1(),
    n = H3(),
    r = j3(),
    o = Yt(),
    s = xe(),
    t = bt(),
    i = Pt(),
    u = 1,
    l = '[object Arguments]',
    d = '[object Array]',
    c = '[object Object]',
    _ = Object.prototype,
    f = _.hasOwnProperty
  function m(h, y, p, v, g, M) {
    var w = s(h),
      L = s(y),
      D = w ? d : o(h),
      Y = L ? d : o(y)
    ;((D = D == l ? c : D), (Y = Y == l ? c : Y))
    var E = D == c,
      k = Y == c,
      S = D == Y
    if (S && t(h)) {
      if (!t(y)) return !1
      ;((w = !0), (E = !1))
    }
    if (S && !E)
      return (M || (M = new e()), w || i(h) ? a(h, y, p, v, g, M) : n(h, y, D, p, v, g, M))
    if (!(p & u)) {
      var O = E && f.call(h, '__wrapped__'),
        z = k && f.call(y, '__wrapped__')
      if (O || z) {
        var T = O ? h.value() : h,
          x = z ? y.value() : y
        return (M || (M = new e()), g(T, x, p, v, M))
      }
    }
    return S ? (M || (M = new e()), r(h, y, p, v, g, M)) : !1
  }
  return ((Ii = m), Ii)
}
var Pi, Ah
function s1() {
  if (Ah) return Pi
  Ah = 1
  var e = C3(),
    a = Je()
  function n(r, o, s, t, i) {
    return r === o
      ? !0
      : r == null || o == null || (!a(r) && !a(o))
        ? r !== r && o !== o
        : e(r, o, s, t, n, i)
  }
  return ((Pi = n), Pi)
}
var Bi, qh
function A3() {
  if (qh) return Bi
  qh = 1
  var e = eo(),
    a = s1(),
    n = 1,
    r = 2
  function o(s, t, i, u) {
    var l = i.length,
      d = l,
      c = !u
    if (s == null) return !d
    for (s = Object(s); l--; ) {
      var _ = i[l]
      if (c && _[2] ? _[1] !== s[_[0]] : !(_[0] in s)) return !1
    }
    for (; ++l < d; ) {
      _ = i[l]
      var f = _[0],
        m = s[f],
        h = _[1]
      if (c && _[2]) {
        if (m === void 0 && !(f in s)) return !1
      } else {
        var y = new e()
        if (u) var p = u(m, h, f, s, t, y)
        if (!(p === void 0 ? a(h, m, n | r, u, y) : p)) return !1
      }
    }
    return !0
  }
  return ((Bi = o), Bi)
}
var Ni, Fh
function i1() {
  if (Fh) return Ni
  Fh = 1
  var e = Ie()
  function a(n) {
    return n === n && !e(n)
  }
  return ((Ni = a), Ni)
}
var Oi, Rh
function q3() {
  if (Rh) return Oi
  Rh = 1
  var e = i1(),
    a = ot()
  function n(r) {
    for (var o = a(r), s = o.length; s--; ) {
      var t = o[s],
        i = r[t]
      o[s] = [t, i, e(i)]
    }
    return o
  }
  return ((Oi = n), Oi)
}
var zi, Ih
function u1() {
  if (Ih) return zi
  Ih = 1
  function e(a, n) {
    return function (r) {
      return r == null ? !1 : r[a] === n && (n !== void 0 || a in Object(r))
    }
  }
  return ((zi = e), zi)
}
var Gi, Ph
function F3() {
  if (Ph) return Gi
  Ph = 1
  var e = A3(),
    a = q3(),
    n = u1()
  function r(o) {
    var s = a(o)
    return s.length == 1 && s[0][2]
      ? n(s[0][0], s[0][1])
      : function (t) {
          return t === o || e(t, o, s)
        }
  }
  return ((Gi = r), Gi)
}
var Ji, Bh
function wt() {
  if (Bh) return Ji
  Bh = 1
  var e = lt(),
    a = Je(),
    n = '[object Symbol]'
  function r(o) {
    return typeof o == 'symbol' || (a(o) && e(o) == n)
  }
  return ((Ji = r), Ji)
}
var Ui, Nh
function uc() {
  if (Nh) return Ui
  Nh = 1
  var e = xe(),
    a = wt(),
    n = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/,
    r = /^\w*$/
  function o(s, t) {
    if (e(s)) return !1
    var i = typeof s
    return i == 'number' || i == 'symbol' || i == 'boolean' || s == null || a(s)
      ? !0
      : r.test(s) || !n.test(s) || (t != null && s in Object(t))
  }
  return ((Ui = o), Ui)
}
var Wi, Oh
function R3() {
  if (Oh) return Wi
  Oh = 1
  var e = Kd(),
    a = 'Expected a function'
  function n(r, o) {
    if (typeof r != 'function' || (o != null && typeof o != 'function')) throw new TypeError(a)
    var s = function () {
      var t = arguments,
        i = o ? o.apply(this, t) : t[0],
        u = s.cache
      if (u.has(i)) return u.get(i)
      var l = r.apply(this, t)
      return ((s.cache = u.set(i, l) || u), l)
    }
    return ((s.cache = new (n.Cache || e)()), s)
  }
  return ((n.Cache = e), (Wi = n), Wi)
}
var Vi, zh
function I3() {
  if (zh) return Vi
  zh = 1
  var e = R3(),
    a = 500
  function n(r) {
    var o = e(r, function (t) {
        return (s.size === a && s.clear(), t)
      }),
      s = o.cache
    return o
  }
  return ((Vi = n), Vi)
}
var Ki, Gh
function P3() {
  if (Gh) return Ki
  Gh = 1
  var e = I3(),
    a =
      /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g,
    n = /\\(\\)?/g,
    r = e(function (o) {
      var s = []
      return (
        o.charCodeAt(0) === 46 && s.push(''),
        o.replace(a, function (t, i, u, l) {
          s.push(u ? l.replace(n, '$1') : i || t)
        }),
        s
      )
    })
  return ((Ki = r), Ki)
}
var Xi, Jh
function uo() {
  if (Jh) return Xi
  Jh = 1
  function e(a, n) {
    for (var r = -1, o = a == null ? 0 : a.length, s = Array(o); ++r < o; ) s[r] = n(a[r], r, a)
    return s
  }
  return ((Xi = e), Xi)
}
var Zi, Uh
function B3() {
  if (Uh) return Zi
  Uh = 1
  var e = Mt(),
    a = uo(),
    n = xe(),
    r = wt(),
    o = e ? e.prototype : void 0,
    s = o ? o.toString : void 0
  function t(i) {
    if (typeof i == 'string') return i
    if (n(i)) return a(i, t) + ''
    if (r(i)) return s ? s.call(i) : ''
    var u = i + ''
    return u == '0' && 1 / i == -1 / 0 ? '-0' : u
  }
  return ((Zi = t), Zi)
}
var Qi, Wh
function l1() {
  if (Wh) return Qi
  Wh = 1
  var e = B3()
  function a(n) {
    return n == null ? '' : e(n)
  }
  return ((Qi = a), Qi)
}
var eu, Vh
function lo() {
  if (Vh) return eu
  Vh = 1
  var e = xe(),
    a = uc(),
    n = P3(),
    r = l1()
  function o(s, t) {
    return e(s) ? s : a(s, t) ? [s] : n(r(s))
  }
  return ((eu = o), eu)
}
var tu, Kh
function Bt() {
  if (Kh) return tu
  Kh = 1
  var e = wt()
  function a(n) {
    if (typeof n == 'string' || e(n)) return n
    var r = n + ''
    return r == '0' && 1 / n == -1 / 0 ? '-0' : r
  }
  return ((tu = a), tu)
}
var ru, Xh
function co() {
  if (Xh) return ru
  Xh = 1
  var e = lo(),
    a = Bt()
  function n(r, o) {
    o = e(o, r)
    for (var s = 0, t = o.length; r != null && s < t; ) r = r[a(o[s++])]
    return s && s == t ? r : void 0
  }
  return ((ru = n), ru)
}
var nu, Zh
function N3() {
  if (Zh) return nu
  Zh = 1
  var e = co()
  function a(n, r, o) {
    var s = n == null ? void 0 : e(n, r)
    return s === void 0 ? o : s
  }
  return ((nu = a), nu)
}
var au, Qh
function O3() {
  if (Qh) return au
  Qh = 1
  function e(a, n) {
    return a != null && n in Object(a)
  }
  return ((au = e), au)
}
var ou, ev
function d1() {
  if (ev) return ou
  ev = 1
  var e = lo(),
    a = It(),
    n = xe(),
    r = no(),
    o = Zd(),
    s = Bt()
  function t(i, u, l) {
    u = e(u, i)
    for (var d = -1, c = u.length, _ = !1; ++d < c; ) {
      var f = s(u[d])
      if (!(_ = i != null && l(i, f))) break
      i = i[f]
    }
    return _ || ++d != c
      ? _
      : ((c = i == null ? 0 : i.length), !!c && o(c) && r(f, c) && (n(i) || a(i)))
  }
  return ((ou = t), ou)
}
var su, tv
function c1() {
  if (tv) return su
  tv = 1
  var e = O3(),
    a = d1()
  function n(r, o) {
    return r != null && a(r, o, e)
  }
  return ((su = n), su)
}
var iu, rv
function z3() {
  if (rv) return iu
  rv = 1
  var e = s1(),
    a = N3(),
    n = c1(),
    r = uc(),
    o = i1(),
    s = u1(),
    t = Bt(),
    i = 1,
    u = 2
  function l(d, c) {
    return r(d) && o(c)
      ? s(t(d), c)
      : function (_) {
          var f = a(_, d)
          return f === void 0 && f === c ? n(_, d) : e(c, f, i | u)
        }
  }
  return ((iu = l), iu)
}
var uu, nv
function _1() {
  if (nv) return uu
  nv = 1
  function e(a) {
    return function (n) {
      return n == null ? void 0 : n[a]
    }
  }
  return ((uu = e), uu)
}
var lu, av
function G3() {
  if (av) return lu
  av = 1
  var e = co()
  function a(n) {
    return function (r) {
      return e(r, n)
    }
  }
  return ((lu = a), lu)
}
var du, ov
function J3() {
  if (ov) return du
  ov = 1
  var e = _1(),
    a = G3(),
    n = uc(),
    r = Bt()
  function o(s) {
    return n(s) ? e(r(s)) : a(s)
  }
  return ((du = o), du)
}
var cu, sv
function Xe() {
  if (sv) return cu
  sv = 1
  var e = F3(),
    a = z3(),
    n = _t(),
    r = xe(),
    o = J3()
  function s(t) {
    return typeof t == 'function'
      ? t
      : t == null
        ? n
        : typeof t == 'object'
          ? r(t)
            ? a(t[0], t[1])
            : e(t)
          : o(t)
  }
  return ((cu = s), cu)
}
var _u, iv
function f1() {
  if (iv) return _u
  iv = 1
  var e = OY(),
    a = S3(),
    n = Xe(),
    r = xe()
  function o(s, t) {
    var i = r(s) ? e : a
    return i(s, n(t, 3))
  }
  return ((_u = o), _u)
}
var fu, uv
function U3() {
  if (uv) return fu
  uv = 1
  var e = Object.prototype,
    a = e.hasOwnProperty
  function n(r, o) {
    return r != null && a.call(r, o)
  }
  return ((fu = n), fu)
}
var mu, lv
function m1() {
  if (lv) return mu
  lv = 1
  var e = U3(),
    a = d1()
  function n(r, o) {
    return r != null && a(r, o, e)
  }
  return ((mu = n), mu)
}
var pu, dv
function W3() {
  if (dv) return pu
  dv = 1
  var e = ec(),
    a = Yt(),
    n = It(),
    r = xe(),
    o = Ke(),
    s = bt(),
    t = oo(),
    i = Pt(),
    u = '[object Map]',
    l = '[object Set]',
    d = Object.prototype,
    c = d.hasOwnProperty
  function _(f) {
    if (f == null) return !0
    if (
      o(f) &&
      (r(f) || typeof f == 'string' || typeof f.splice == 'function' || s(f) || i(f) || n(f))
    )
      return !f.length
    var m = a(f)
    if (m == u || m == l) return !f.size
    if (t(f)) return !e(f).length
    for (var h in f) if (c.call(f, h)) return !1
    return !0
  }
  return ((pu = _), pu)
}
var hu, cv
function p1() {
  if (cv) return hu
  cv = 1
  function e(a) {
    return a === void 0
  }
  return ((hu = e), hu)
}
var vu, _v
function h1() {
  if (_v) return vu
  _v = 1
  var e = io(),
    a = Ke()
  function n(r, o) {
    var s = -1,
      t = a(r) ? Array(r.length) : []
    return (
      e(r, function (i, u, l) {
        t[++s] = o(i, u, l)
      }),
      t
    )
  }
  return ((vu = n), vu)
}
var yu, fv
function v1() {
  if (fv) return yu
  fv = 1
  var e = uo(),
    a = Xe(),
    n = h1(),
    r = xe()
  function o(s, t) {
    var i = r(s) ? e : n
    return i(s, a(t, 3))
  }
  return ((yu = o), yu)
}
var gu, mv
function V3() {
  if (mv) return gu
  mv = 1
  function e(a, n, r, o) {
    var s = -1,
      t = a == null ? 0 : a.length
    for (o && t && (r = a[++s]); ++s < t; ) r = n(r, a[s], s, a)
    return r
  }
  return ((gu = e), gu)
}
var Mu, pv
function K3() {
  if (pv) return Mu
  pv = 1
  function e(a, n, r, o, s) {
    return (
      s(a, function (t, i, u) {
        r = o ? ((o = !1), t) : n(r, t, i, u)
      }),
      r
    )
  }
  return ((Mu = e), Mu)
}
var bu, hv
function y1() {
  if (hv) return bu
  hv = 1
  var e = V3(),
    a = io(),
    n = Xe(),
    r = K3(),
    o = xe()
  function s(t, i, u) {
    var l = o(t) ? e : r,
      d = arguments.length < 3
    return l(t, n(i, 4), u, d, a)
  }
  return ((bu = s), bu)
}
var Yu, vv
function X3() {
  if (vv) return Yu
  vv = 1
  var e = lt(),
    a = xe(),
    n = Je(),
    r = '[object String]'
  function o(s) {
    return typeof s == 'string' || (!a(s) && n(s) && e(s) == r)
  }
  return ((Yu = o), Yu)
}
var wu, yv
function Z3() {
  if (yv) return wu
  yv = 1
  var e = _1(),
    a = e('length')
  return ((wu = a), wu)
}
var xu, gv
function Q3() {
  if (gv) return xu
  gv = 1
  var e = '\\ud800-\\udfff',
    a = '\\u0300-\\u036f',
    n = '\\ufe20-\\ufe2f',
    r = '\\u20d0-\\u20ff',
    o = a + n + r,
    s = '\\ufe0e\\ufe0f',
    t = '\\u200d',
    i = RegExp('[' + t + e + o + s + ']')
  function u(l) {
    return i.test(l)
  }
  return ((xu = u), xu)
}
var Lu, Mv
function e8() {
  if (Mv) return Lu
  Mv = 1
  var e = '\\ud800-\\udfff',
    a = '\\u0300-\\u036f',
    n = '\\ufe20-\\ufe2f',
    r = '\\u20d0-\\u20ff',
    o = a + n + r,
    s = '\\ufe0e\\ufe0f',
    t = '[' + e + ']',
    i = '[' + o + ']',
    u = '\\ud83c[\\udffb-\\udfff]',
    l = '(?:' + i + '|' + u + ')',
    d = '[^' + e + ']',
    c = '(?:\\ud83c[\\udde6-\\uddff]){2}',
    _ = '[\\ud800-\\udbff][\\udc00-\\udfff]',
    f = '\\u200d',
    m = l + '?',
    h = '[' + s + ']?',
    y = '(?:' + f + '(?:' + [d, c, _].join('|') + ')' + h + m + ')*',
    p = h + m + y,
    v = '(?:' + [d + i + '?', i, c, _, t].join('|') + ')',
    g = RegExp(u + '(?=' + u + ')|' + v + p, 'g')
  function M(w) {
    for (var L = (g.lastIndex = 0); g.test(w); ) ++L
    return L
  }
  return ((Lu = M), Lu)
}
var ku, bv
function t8() {
  if (bv) return ku
  bv = 1
  var e = Z3(),
    a = Q3(),
    n = e8()
  function r(o) {
    return a(o) ? n(o) : e(o)
  }
  return ((ku = r), ku)
}
var Su, Yv
function r8() {
  if (Yv) return Su
  Yv = 1
  var e = ec(),
    a = Yt(),
    n = Ke(),
    r = X3(),
    o = t8(),
    s = '[object Map]',
    t = '[object Set]'
  function i(u) {
    if (u == null) return 0
    if (n(u)) return r(u) ? o(u) : u.length
    var l = a(u)
    return l == s || l == t ? u.size : e(u).length
  }
  return ((Su = i), Su)
}
var Du, wv
function n8() {
  if (wv) return Du
  wv = 1
  var e = Xd(),
    a = XY(),
    n = sc(),
    r = Xe(),
    o = so(),
    s = xe(),
    t = bt(),
    i = Ft(),
    u = Ie(),
    l = Pt()
  function d(c, _, f) {
    var m = s(c),
      h = m || t(c) || l(c)
    if (((_ = r(_, 4)), f == null)) {
      var y = c && c.constructor
      h ? (f = m ? new y() : []) : u(c) ? (f = i(y) ? a(o(c)) : {}) : (f = {})
    }
    return (
      (h ? e : n)(c, function (p, v, g) {
        return _(f, p, v, g)
      }),
      f
    )
  }
  return ((Du = d), Du)
}
var Eu, xv
function a8() {
  if (xv) return Eu
  xv = 1
  var e = Mt(),
    a = It(),
    n = xe(),
    r = e ? e.isConcatSpreadable : void 0
  function o(s) {
    return n(s) || a(s) || !!(r && s && s[r])
  }
  return ((Eu = o), Eu)
}
var Tu, Lv
function lc() {
  if (Lv) return Tu
  Lv = 1
  var e = rc(),
    a = a8()
  function n(r, o, s, t, i) {
    var u = -1,
      l = r.length
    for (s || (s = a), i || (i = []); ++u < l; ) {
      var d = r[u]
      o > 0 && s(d) ? (o > 1 ? n(d, o - 1, s, t, i) : e(i, d)) : t || (i[i.length] = d)
    }
    return i
  }
  return ((Tu = n), Tu)
}
var $u, kv
function o8() {
  if (kv) return $u
  kv = 1
  function e(a, n, r) {
    switch (r.length) {
      case 0:
        return a.call(n)
      case 1:
        return a.call(n, r[0])
      case 2:
        return a.call(n, r[0], r[1])
      case 3:
        return a.call(n, r[0], r[1], r[2])
    }
    return a.apply(n, r)
  }
  return (($u = e), $u)
}
var Hu, Sv
function g1() {
  if (Sv) return Hu
  Sv = 1
  var e = o8(),
    a = Math.max
  function n(r, o, s) {
    return (
      (o = a(o === void 0 ? r.length - 1 : o, 0)),
      function () {
        for (var t = arguments, i = -1, u = a(t.length - o, 0), l = Array(u); ++i < u; )
          l[i] = t[o + i]
        i = -1
        for (var d = Array(o + 1); ++i < o; ) d[i] = t[i]
        return ((d[o] = s(l)), e(r, this, d))
      }
    )
  }
  return ((Hu = n), Hu)
}
var ju, Dv
function s8() {
  if (Dv) return ju
  Dv = 1
  var e = ac(),
    a = RY(),
    n = _t(),
    r = a
      ? function (o, s) {
          return a(o, 'toString', {
            configurable: !0,
            enumerable: !1,
            value: e(s),
            writable: !0
          })
        }
      : n
  return ((ju = r), ju)
}
var Cu, Ev
function i8() {
  if (Ev) return Cu
  Ev = 1
  var e = 800,
    a = 16,
    n = Date.now
  function r(o) {
    var s = 0,
      t = 0
    return function () {
      var i = n(),
        u = a - (i - t)
      if (((t = i), u > 0)) {
        if (++s >= e) return arguments[0]
      } else s = 0
      return o.apply(void 0, arguments)
    }
  }
  return ((Cu = r), Cu)
}
var Au, Tv
function M1() {
  if (Tv) return Au
  Tv = 1
  var e = s8(),
    a = i8(),
    n = a(e)
  return ((Au = n), Au)
}
var qu, $v
function _o() {
  if ($v) return qu
  $v = 1
  var e = _t(),
    a = g1(),
    n = M1()
  function r(o, s) {
    return n(a(o, s, e), o + '')
  }
  return ((qu = r), qu)
}
var Fu, Hv
function b1() {
  if (Hv) return Fu
  Hv = 1
  function e(a, n, r, o) {
    for (var s = a.length, t = r + (o ? 1 : -1); o ? t-- : ++t < s; ) if (n(a[t], t, a)) return t
    return -1
  }
  return ((Fu = e), Fu)
}
var Ru, jv
function u8() {
  if (jv) return Ru
  jv = 1
  function e(a) {
    return a !== a
  }
  return ((Ru = e), Ru)
}
var Iu, Cv
function l8() {
  if (Cv) return Iu
  Cv = 1
  function e(a, n, r) {
    for (var o = r - 1, s = a.length; ++o < s; ) if (a[o] === n) return o
    return -1
  }
  return ((Iu = e), Iu)
}
var Pu, Av
function d8() {
  if (Av) return Pu
  Av = 1
  var e = b1(),
    a = u8(),
    n = l8()
  function r(o, s, t) {
    return s === s ? n(o, s, t) : e(o, a, t)
  }
  return ((Pu = r), Pu)
}
var Bu, qv
function c8() {
  if (qv) return Bu
  qv = 1
  var e = d8()
  function a(n, r) {
    var o = n == null ? 0 : n.length
    return !!o && e(n, r, 0) > -1
  }
  return ((Bu = a), Bu)
}
var Nu, Fv
function _8() {
  if (Fv) return Nu
  Fv = 1
  function e(a, n, r) {
    for (var o = -1, s = a == null ? 0 : a.length; ++o < s; ) if (r(n, a[o])) return !0
    return !1
  }
  return ((Nu = e), Nu)
}
var Ou, Rv
function f8() {
  if (Rv) return Ou
  Rv = 1
  function e() {}
  return ((Ou = e), Ou)
}
var zu, Iv
function m8() {
  if (Iv) return zu
  Iv = 1
  var e = WY(),
    a = f8(),
    n = ic(),
    r = 1 / 0,
    o =
      e && 1 / n(new e([, -0]))[1] == r
        ? function (s) {
            return new e(s)
          }
        : a
  return ((zu = o), zu)
}
var Gu, Pv
function p8() {
  if (Pv) return Gu
  Pv = 1
  var e = n1(),
    a = c8(),
    n = _8(),
    r = a1(),
    o = m8(),
    s = ic(),
    t = 200
  function i(u, l, d) {
    var c = -1,
      _ = a,
      f = u.length,
      m = !0,
      h = [],
      y = h
    if (d) ((m = !1), (_ = n))
    else if (f >= t) {
      var p = l ? null : o(u)
      if (p) return s(p)
      ;((m = !1), (_ = r), (y = new e()))
    } else y = l ? [] : h
    e: for (; ++c < f; ) {
      var v = u[c],
        g = l ? l(v) : v
      if (((v = d || v !== 0 ? v : 0), m && g === g)) {
        for (var M = y.length; M--; ) if (y[M] === g) continue e
        ;(l && y.push(g), h.push(v))
      } else _(y, g, d) || (y !== h && y.push(g), h.push(v))
    }
    return h
  }
  return ((Gu = i), Gu)
}
var Ju, Bv
function Y1() {
  if (Bv) return Ju
  Bv = 1
  var e = Ke(),
    a = Je()
  function n(r) {
    return a(r) && e(r)
  }
  return ((Ju = n), Ju)
}
var Uu, Nv
function h8() {
  if (Nv) return Uu
  Nv = 1
  var e = lc(),
    a = _o(),
    n = p8(),
    r = Y1(),
    o = a(function (s) {
      return n(e(s, 1, r, !0))
    })
  return ((Uu = o), Uu)
}
var Wu, Ov
function v8() {
  if (Ov) return Wu
  Ov = 1
  var e = uo()
  function a(n, r) {
    return e(r, function (o) {
      return n[o]
    })
  }
  return ((Wu = a), Wu)
}
var Vu, zv
function w1() {
  if (zv) return Vu
  zv = 1
  var e = v8(),
    a = ot()
  function n(r) {
    return r == null ? [] : e(r, a(r))
  }
  return ((Vu = n), Vu)
}
var Ku, Gv
function Pe() {
  if (Gv) return Ku
  Gv = 1
  var e
  if (typeof Wd == 'function')
    try {
      e = {
        clone: x3(),
        constant: ac(),
        each: r1(),
        filter: f1(),
        has: m1(),
        isArray: xe(),
        isEmpty: W3(),
        isFunction: Ft(),
        isUndefined: p1(),
        keys: ot(),
        map: v1(),
        reduce: y1(),
        size: r8(),
        transform: n8(),
        union: h8(),
        values: w1()
      }
    } catch {}
  return (e || (e = window._), (Ku = e), Ku)
}
var Xu, Jv
function dc() {
  if (Jv) return Xu
  Jv = 1
  var e = Pe()
  Xu = o
  var a = '\0',
    n = '\0',
    r = ''
  function o(d) {
    ;((this._isDirected = e.has(d, 'directed') ? d.directed : !0),
      (this._isMultigraph = e.has(d, 'multigraph') ? d.multigraph : !1),
      (this._isCompound = e.has(d, 'compound') ? d.compound : !1),
      (this._label = void 0),
      (this._defaultNodeLabelFn = e.constant(void 0)),
      (this._defaultEdgeLabelFn = e.constant(void 0)),
      (this._nodes = {}),
      this._isCompound && ((this._parent = {}), (this._children = {}), (this._children[n] = {})),
      (this._in = {}),
      (this._preds = {}),
      (this._out = {}),
      (this._sucs = {}),
      (this._edgeObjs = {}),
      (this._edgeLabels = {}))
  }
  ;((o.prototype._nodeCount = 0),
    (o.prototype._edgeCount = 0),
    (o.prototype.isDirected = function () {
      return this._isDirected
    }),
    (o.prototype.isMultigraph = function () {
      return this._isMultigraph
    }),
    (o.prototype.isCompound = function () {
      return this._isCompound
    }),
    (o.prototype.setGraph = function (d) {
      return ((this._label = d), this)
    }),
    (o.prototype.graph = function () {
      return this._label
    }),
    (o.prototype.setDefaultNodeLabel = function (d) {
      return (e.isFunction(d) || (d = e.constant(d)), (this._defaultNodeLabelFn = d), this)
    }),
    (o.prototype.nodeCount = function () {
      return this._nodeCount
    }),
    (o.prototype.nodes = function () {
      return e.keys(this._nodes)
    }),
    (o.prototype.sources = function () {
      var d = this
      return e.filter(this.nodes(), function (c) {
        return e.isEmpty(d._in[c])
      })
    }),
    (o.prototype.sinks = function () {
      var d = this
      return e.filter(this.nodes(), function (c) {
        return e.isEmpty(d._out[c])
      })
    }),
    (o.prototype.setNodes = function (d, c) {
      var _ = arguments,
        f = this
      return (
        e.each(d, function (m) {
          _.length > 1 ? f.setNode(m, c) : f.setNode(m)
        }),
        this
      )
    }),
    (o.prototype.setNode = function (d, c) {
      return e.has(this._nodes, d)
        ? (arguments.length > 1 && (this._nodes[d] = c), this)
        : ((this._nodes[d] = arguments.length > 1 ? c : this._defaultNodeLabelFn(d)),
          this._isCompound &&
            ((this._parent[d] = n), (this._children[d] = {}), (this._children[n][d] = !0)),
          (this._in[d] = {}),
          (this._preds[d] = {}),
          (this._out[d] = {}),
          (this._sucs[d] = {}),
          ++this._nodeCount,
          this)
    }),
    (o.prototype.node = function (d) {
      return this._nodes[d]
    }),
    (o.prototype.hasNode = function (d) {
      return e.has(this._nodes, d)
    }),
    (o.prototype.removeNode = function (d) {
      var c = this
      if (e.has(this._nodes, d)) {
        var _ = function (f) {
          c.removeEdge(c._edgeObjs[f])
        }
        ;(delete this._nodes[d],
          this._isCompound &&
            (this._removeFromParentsChildList(d),
            delete this._parent[d],
            e.each(this.children(d), function (f) {
              c.setParent(f)
            }),
            delete this._children[d]),
          e.each(e.keys(this._in[d]), _),
          delete this._in[d],
          delete this._preds[d],
          e.each(e.keys(this._out[d]), _),
          delete this._out[d],
          delete this._sucs[d],
          --this._nodeCount)
      }
      return this
    }),
    (o.prototype.setParent = function (d, c) {
      if (!this._isCompound) throw new Error('Cannot set parent in a non-compound graph')
      if (e.isUndefined(c)) c = n
      else {
        c += ''
        for (var _ = c; !e.isUndefined(_); _ = this.parent(_))
          if (_ === d)
            throw new Error('Setting ' + c + ' as parent of ' + d + ' would create a cycle')
        this.setNode(c)
      }
      return (
        this.setNode(d),
        this._removeFromParentsChildList(d),
        (this._parent[d] = c),
        (this._children[c][d] = !0),
        this
      )
    }),
    (o.prototype._removeFromParentsChildList = function (d) {
      delete this._children[this._parent[d]][d]
    }),
    (o.prototype.parent = function (d) {
      if (this._isCompound) {
        var c = this._parent[d]
        if (c !== n) return c
      }
    }),
    (o.prototype.children = function (d) {
      if ((e.isUndefined(d) && (d = n), this._isCompound)) {
        var c = this._children[d]
        if (c) return e.keys(c)
      } else {
        if (d === n) return this.nodes()
        if (this.hasNode(d)) return []
      }
    }),
    (o.prototype.predecessors = function (d) {
      var c = this._preds[d]
      if (c) return e.keys(c)
    }),
    (o.prototype.successors = function (d) {
      var c = this._sucs[d]
      if (c) return e.keys(c)
    }),
    (o.prototype.neighbors = function (d) {
      var c = this.predecessors(d)
      if (c) return e.union(c, this.successors(d))
    }),
    (o.prototype.isLeaf = function (d) {
      var c
      return (
        this.isDirected() ? (c = this.successors(d)) : (c = this.neighbors(d)),
        c.length === 0
      )
    }),
    (o.prototype.filterNodes = function (d) {
      var c = new this.constructor({
        directed: this._isDirected,
        multigraph: this._isMultigraph,
        compound: this._isCompound
      })
      c.setGraph(this.graph())
      var _ = this
      ;(e.each(this._nodes, function (h, y) {
        d(y) && c.setNode(y, h)
      }),
        e.each(this._edgeObjs, function (h) {
          c.hasNode(h.v) && c.hasNode(h.w) && c.setEdge(h, _.edge(h))
        }))
      var f = {}
      function m(h) {
        var y = _.parent(h)
        return y === void 0 || c.hasNode(y) ? ((f[h] = y), y) : y in f ? f[y] : m(y)
      }
      return (
        this._isCompound &&
          e.each(c.nodes(), function (h) {
            c.setParent(h, m(h))
          }),
        c
      )
    }),
    (o.prototype.setDefaultEdgeLabel = function (d) {
      return (e.isFunction(d) || (d = e.constant(d)), (this._defaultEdgeLabelFn = d), this)
    }),
    (o.prototype.edgeCount = function () {
      return this._edgeCount
    }),
    (o.prototype.edges = function () {
      return e.values(this._edgeObjs)
    }),
    (o.prototype.setPath = function (d, c) {
      var _ = this,
        f = arguments
      return (
        e.reduce(d, function (m, h) {
          return (f.length > 1 ? _.setEdge(m, h, c) : _.setEdge(m, h), h)
        }),
        this
      )
    }),
    (o.prototype.setEdge = function () {
      var d,
        c,
        _,
        f,
        m = !1,
        h = arguments[0]
      ;(typeof h == 'object' && h !== null && 'v' in h
        ? ((d = h.v),
          (c = h.w),
          (_ = h.name),
          arguments.length === 2 && ((f = arguments[1]), (m = !0)))
        : ((d = h),
          (c = arguments[1]),
          (_ = arguments[3]),
          arguments.length > 2 && ((f = arguments[2]), (m = !0))),
        (d = '' + d),
        (c = '' + c),
        e.isUndefined(_) || (_ = '' + _))
      var y = i(this._isDirected, d, c, _)
      if (e.has(this._edgeLabels, y)) return (m && (this._edgeLabels[y] = f), this)
      if (!e.isUndefined(_) && !this._isMultigraph)
        throw new Error('Cannot set a named edge when isMultigraph = false')
      ;(this.setNode(d),
        this.setNode(c),
        (this._edgeLabels[y] = m ? f : this._defaultEdgeLabelFn(d, c, _)))
      var p = u(this._isDirected, d, c, _)
      return (
        (d = p.v),
        (c = p.w),
        Object.freeze(p),
        (this._edgeObjs[y] = p),
        s(this._preds[c], d),
        s(this._sucs[d], c),
        (this._in[c][y] = p),
        (this._out[d][y] = p),
        this._edgeCount++,
        this
      )
    }),
    (o.prototype.edge = function (d, c, _) {
      var f =
        arguments.length === 1 ? l(this._isDirected, arguments[0]) : i(this._isDirected, d, c, _)
      return this._edgeLabels[f]
    }),
    (o.prototype.hasEdge = function (d, c, _) {
      var f =
        arguments.length === 1 ? l(this._isDirected, arguments[0]) : i(this._isDirected, d, c, _)
      return e.has(this._edgeLabels, f)
    }),
    (o.prototype.removeEdge = function (d, c, _) {
      var f =
          arguments.length === 1 ? l(this._isDirected, arguments[0]) : i(this._isDirected, d, c, _),
        m = this._edgeObjs[f]
      return (
        m &&
          ((d = m.v),
          (c = m.w),
          delete this._edgeLabels[f],
          delete this._edgeObjs[f],
          t(this._preds[c], d),
          t(this._sucs[d], c),
          delete this._in[c][f],
          delete this._out[d][f],
          this._edgeCount--),
        this
      )
    }),
    (o.prototype.inEdges = function (d, c) {
      var _ = this._in[d]
      if (_) {
        var f = e.values(_)
        return c
          ? e.filter(f, function (m) {
              return m.v === c
            })
          : f
      }
    }),
    (o.prototype.outEdges = function (d, c) {
      var _ = this._out[d]
      if (_) {
        var f = e.values(_)
        return c
          ? e.filter(f, function (m) {
              return m.w === c
            })
          : f
      }
    }),
    (o.prototype.nodeEdges = function (d, c) {
      var _ = this.inEdges(d, c)
      if (_) return _.concat(this.outEdges(d, c))
    }))
  function s(d, c) {
    d[c] ? d[c]++ : (d[c] = 1)
  }
  function t(d, c) {
    --d[c] || delete d[c]
  }
  function i(d, c, _, f) {
    var m = '' + c,
      h = '' + _
    if (!d && m > h) {
      var y = m
      ;((m = h), (h = y))
    }
    return m + r + h + r + (e.isUndefined(f) ? a : f)
  }
  function u(d, c, _, f) {
    var m = '' + c,
      h = '' + _
    if (!d && m > h) {
      var y = m
      ;((m = h), (h = y))
    }
    var p = { v: m, w: h }
    return (f && (p.name = f), p)
  }
  function l(d, c) {
    return i(d, c.v, c.w, c.name)
  }
  return Xu
}
var Zu, Uv
function y8() {
  return (Uv || ((Uv = 1), (Zu = '2.1.8')), Zu)
}
var Qu, Wv
function g8() {
  return (
    Wv ||
      ((Wv = 1),
      (Qu = {
        Graph: dc(),
        version: y8()
      })),
    Qu
  )
}
var el, Vv
function M8() {
  if (Vv) return el
  Vv = 1
  var e = Pe(),
    a = dc()
  el = {
    write: n,
    read: s
  }
  function n(t) {
    var i = {
      options: {
        directed: t.isDirected(),
        multigraph: t.isMultigraph(),
        compound: t.isCompound()
      },
      nodes: r(t),
      edges: o(t)
    }
    return (e.isUndefined(t.graph()) || (i.value = e.clone(t.graph())), i)
  }
  function r(t) {
    return e.map(t.nodes(), function (i) {
      var u = t.node(i),
        l = t.parent(i),
        d = { v: i }
      return (e.isUndefined(u) || (d.value = u), e.isUndefined(l) || (d.parent = l), d)
    })
  }
  function o(t) {
    return e.map(t.edges(), function (i) {
      var u = t.edge(i),
        l = { v: i.v, w: i.w }
      return (e.isUndefined(i.name) || (l.name = i.name), e.isUndefined(u) || (l.value = u), l)
    })
  }
  function s(t) {
    var i = new a(t.options).setGraph(t.value)
    return (
      e.each(t.nodes, function (u) {
        ;(i.setNode(u.v, u.value), u.parent && i.setParent(u.v, u.parent))
      }),
      e.each(t.edges, function (u) {
        i.setEdge({ v: u.v, w: u.w, name: u.name }, u.value)
      }),
      i
    )
  }
  return el
}
var tl, Kv
function b8() {
  if (Kv) return tl
  Kv = 1
  var e = Pe()
  tl = a
  function a(n) {
    var r = {},
      o = [],
      s
    function t(i) {
      e.has(r, i) ||
        ((r[i] = !0), s.push(i), e.each(n.successors(i), t), e.each(n.predecessors(i), t))
    }
    return (
      e.each(n.nodes(), function (i) {
        ;((s = []), t(i), s.length && o.push(s))
      }),
      o
    )
  }
  return tl
}
var rl, Xv
function x1() {
  if (Xv) return rl
  Xv = 1
  var e = Pe()
  rl = a
  function a() {
    ;((this._arr = []), (this._keyIndices = {}))
  }
  return (
    (a.prototype.size = function () {
      return this._arr.length
    }),
    (a.prototype.keys = function () {
      return this._arr.map(function (n) {
        return n.key
      })
    }),
    (a.prototype.has = function (n) {
      return e.has(this._keyIndices, n)
    }),
    (a.prototype.priority = function (n) {
      var r = this._keyIndices[n]
      if (r !== void 0) return this._arr[r].priority
    }),
    (a.prototype.min = function () {
      if (this.size() === 0) throw new Error('Queue underflow')
      return this._arr[0].key
    }),
    (a.prototype.add = function (n, r) {
      var o = this._keyIndices
      if (((n = String(n)), !e.has(o, n))) {
        var s = this._arr,
          t = s.length
        return ((o[n] = t), s.push({ key: n, priority: r }), this._decrease(t), !0)
      }
      return !1
    }),
    (a.prototype.removeMin = function () {
      this._swap(0, this._arr.length - 1)
      var n = this._arr.pop()
      return (delete this._keyIndices[n.key], this._heapify(0), n.key)
    }),
    (a.prototype.decrease = function (n, r) {
      var o = this._keyIndices[n]
      if (r > this._arr[o].priority)
        throw new Error(
          'New priority is greater than current priority. Key: ' +
            n +
            ' Old: ' +
            this._arr[o].priority +
            ' New: ' +
            r
        )
      ;((this._arr[o].priority = r), this._decrease(o))
    }),
    (a.prototype._heapify = function (n) {
      var r = this._arr,
        o = 2 * n,
        s = o + 1,
        t = n
      o < r.length &&
        ((t = r[o].priority < r[t].priority ? o : t),
        s < r.length && (t = r[s].priority < r[t].priority ? s : t),
        t !== n && (this._swap(n, t), this._heapify(t)))
    }),
    (a.prototype._decrease = function (n) {
      for (
        var r = this._arr, o = r[n].priority, s;
        n !== 0 && ((s = n >> 1), !(r[s].priority < o));
      )
        (this._swap(n, s), (n = s))
    }),
    (a.prototype._swap = function (n, r) {
      var o = this._arr,
        s = this._keyIndices,
        t = o[n],
        i = o[r]
      ;((o[n] = i), (o[r] = t), (s[i.key] = n), (s[t.key] = r))
    }),
    rl
  )
}
var nl, Zv
function L1() {
  if (Zv) return nl
  Zv = 1
  var e = Pe(),
    a = x1()
  nl = r
  var n = e.constant(1)
  function r(s, t, i, u) {
    return o(
      s,
      String(t),
      i || n,
      u ||
        function (l) {
          return s.outEdges(l)
        }
    )
  }
  function o(s, t, i, u) {
    var l = {},
      d = new a(),
      c,
      _,
      f = function (m) {
        var h = m.v !== c ? m.v : m.w,
          y = l[h],
          p = i(m),
          v = _.distance + p
        if (p < 0)
          throw new Error(
            'dijkstra does not allow negative edge weights. Bad edge: ' + m + ' Weight: ' + p
          )
        v < y.distance && ((y.distance = v), (y.predecessor = c), d.decrease(h, v))
      }
    for (
      s.nodes().forEach(function (m) {
        var h = m === t ? 0 : Number.POSITIVE_INFINITY
        ;((l[m] = { distance: h }), d.add(m, h))
      });
      d.size() > 0 && ((c = d.removeMin()), (_ = l[c]), _.distance !== Number.POSITIVE_INFINITY);
    )
      u(c).forEach(f)
    return l
  }
  return nl
}
var al, Qv
function Y8() {
  if (Qv) return al
  Qv = 1
  var e = L1(),
    a = Pe()
  al = n
  function n(r, o, s) {
    return a.transform(
      r.nodes(),
      function (t, i) {
        t[i] = e(r, i, o, s)
      },
      {}
    )
  }
  return al
}
var ol, ey
function k1() {
  if (ey) return ol
  ey = 1
  var e = Pe()
  ol = a
  function a(n) {
    var r = 0,
      o = [],
      s = {},
      t = []
    function i(u) {
      var l = (s[u] = {
        onStack: !0,
        lowlink: r,
        index: r++
      })
      if (
        (o.push(u),
        n.successors(u).forEach(function (_) {
          e.has(s, _)
            ? s[_].onStack && (l.lowlink = Math.min(l.lowlink, s[_].index))
            : (i(_), (l.lowlink = Math.min(l.lowlink, s[_].lowlink)))
        }),
        l.lowlink === l.index)
      ) {
        var d = [],
          c
        do ((c = o.pop()), (s[c].onStack = !1), d.push(c))
        while (u !== c)
        t.push(d)
      }
    }
    return (
      n.nodes().forEach(function (u) {
        e.has(s, u) || i(u)
      }),
      t
    )
  }
  return ol
}
var sl, ty
function w8() {
  if (ty) return sl
  ty = 1
  var e = Pe(),
    a = k1()
  sl = n
  function n(r) {
    return e.filter(a(r), function (o) {
      return o.length > 1 || (o.length === 1 && r.hasEdge(o[0], o[0]))
    })
  }
  return sl
}
var il, ry
function x8() {
  if (ry) return il
  ry = 1
  var e = Pe()
  il = n
  var a = e.constant(1)
  function n(o, s, t) {
    return r(
      o,
      s || a,
      t ||
        function (i) {
          return o.outEdges(i)
        }
    )
  }
  function r(o, s, t) {
    var i = {},
      u = o.nodes()
    return (
      u.forEach(function (l) {
        ;((i[l] = {}),
          (i[l][l] = { distance: 0 }),
          u.forEach(function (d) {
            l !== d && (i[l][d] = { distance: Number.POSITIVE_INFINITY })
          }),
          t(l).forEach(function (d) {
            var c = d.v === l ? d.w : d.v,
              _ = s(d)
            i[l][c] = { distance: _, predecessor: l }
          }))
      }),
      u.forEach(function (l) {
        var d = i[l]
        u.forEach(function (c) {
          var _ = i[c]
          u.forEach(function (f) {
            var m = _[l],
              h = d[f],
              y = _[f],
              p = m.distance + h.distance
            p < y.distance && ((y.distance = p), (y.predecessor = h.predecessor))
          })
        })
      }),
      i
    )
  }
  return il
}
var ul, ny
function S1() {
  if (ny) return ul
  ny = 1
  var e = Pe()
  ;((ul = a), (a.CycleException = n))
  function a(r) {
    var o = {},
      s = {},
      t = []
    function i(u) {
      if (e.has(s, u)) throw new n()
      e.has(o, u) ||
        ((s[u] = !0), (o[u] = !0), e.each(r.predecessors(u), i), delete s[u], t.push(u))
    }
    if ((e.each(r.sinks(), i), e.size(o) !== r.nodeCount())) throw new n()
    return t
  }
  function n() {}
  return ((n.prototype = new Error()), ul)
}
var ll, ay
function L8() {
  if (ay) return ll
  ay = 1
  var e = S1()
  ll = a
  function a(n) {
    try {
      e(n)
    } catch (r) {
      if (r instanceof e.CycleException) return !1
      throw r
    }
    return !0
  }
  return ll
}
var dl, oy
function D1() {
  if (oy) return dl
  oy = 1
  var e = Pe()
  dl = a
  function a(r, o, s) {
    e.isArray(o) || (o = [o])
    var t = (r.isDirected() ? r.successors : r.neighbors).bind(r),
      i = [],
      u = {}
    return (
      e.each(o, function (l) {
        if (!r.hasNode(l)) throw new Error('Graph does not have node: ' + l)
        n(r, l, s === 'post', u, t, i)
      }),
      i
    )
  }
  function n(r, o, s, t, i, u) {
    e.has(t, o) ||
      ((t[o] = !0),
      s || u.push(o),
      e.each(i(o), function (l) {
        n(r, l, s, t, i, u)
      }),
      s && u.push(o))
  }
  return dl
}
var cl, sy
function k8() {
  if (sy) return cl
  sy = 1
  var e = D1()
  cl = a
  function a(n, r) {
    return e(n, r, 'post')
  }
  return cl
}
var _l, iy
function S8() {
  if (iy) return _l
  iy = 1
  var e = D1()
  _l = a
  function a(n, r) {
    return e(n, r, 'pre')
  }
  return _l
}
var fl, uy
function D8() {
  if (uy) return fl
  uy = 1
  var e = Pe(),
    a = dc(),
    n = x1()
  fl = r
  function r(o, s) {
    var t = new a(),
      i = {},
      u = new n(),
      l
    function d(_) {
      var f = _.v === l ? _.w : _.v,
        m = u.priority(f)
      if (m !== void 0) {
        var h = s(_)
        h < m && ((i[f] = l), u.decrease(f, h))
      }
    }
    if (o.nodeCount() === 0) return t
    ;(e.each(o.nodes(), function (_) {
      ;(u.add(_, Number.POSITIVE_INFINITY), t.setNode(_))
    }),
      u.decrease(o.nodes()[0], 0))
    for (var c = !1; u.size() > 0; ) {
      if (((l = u.removeMin()), e.has(i, l))) t.setEdge(l, i[l])
      else {
        if (c) throw new Error('Input graph is not connected: ' + o)
        c = !0
      }
      o.nodeEdges(l).forEach(d)
    }
    return t
  }
  return fl
}
var ml, ly
function E8() {
  return (
    ly ||
      ((ly = 1),
      (ml = {
        components: b8(),
        dijkstra: L1(),
        dijkstraAll: Y8(),
        findCycles: w8(),
        floydWarshall: x8(),
        isAcyclic: L8(),
        postorder: k8(),
        preorder: S8(),
        prim: D8(),
        tarjan: k1(),
        topsort: S1()
      })),
    ml
  )
}
var pl, dy
function T8() {
  if (dy) return pl
  dy = 1
  var e = g8()
  return (
    (pl = {
      Graph: e.Graph,
      json: M8(),
      alg: E8(),
      version: e.version
    }),
    pl
  )
}
var hl, cy
function Ne() {
  if (cy) return hl
  cy = 1
  var e
  if (typeof Wd == 'function')
    try {
      e = T8()
    } catch {}
  return (e || (e = window.graphlib), (hl = e), hl)
}
var vl, _y
function $8() {
  if (_y) return vl
  _y = 1
  var e = QY(),
    a = 1,
    n = 4
  function r(o) {
    return e(o, a | n)
  }
  return ((vl = r), vl)
}
var yl, fy
function fo() {
  if (fy) return yl
  fy = 1
  var e = gt(),
    a = Ke(),
    n = no(),
    r = Ie()
  function o(s, t, i) {
    if (!r(i)) return !1
    var u = typeof t
    return (u == 'number' ? a(i) && n(t, i.length) : u == 'string' && t in i) ? e(i[t], s) : !1
  }
  return ((yl = o), yl)
}
var gl, my
function H8() {
  if (my) return gl
  my = 1
  var e = _o(),
    a = gt(),
    n = fo(),
    r = ct(),
    o = Object.prototype,
    s = o.hasOwnProperty,
    t = e(function (i, u) {
      i = Object(i)
      var l = -1,
        d = u.length,
        c = d > 2 ? u[2] : void 0
      for (c && n(u[0], u[1], c) && (d = 1); ++l < d; )
        for (var _ = u[l], f = r(_), m = -1, h = f.length; ++m < h; ) {
          var y = f[m],
            p = i[y]
          ;(p === void 0 || (a(p, o[y]) && !s.call(i, y))) && (i[y] = _[y])
        }
      return i
    })
  return ((gl = t), gl)
}
var Ml, py
function j8() {
  if (py) return Ml
  py = 1
  var e = Xe(),
    a = Ke(),
    n = ot()
  function r(o) {
    return function (s, t, i) {
      var u = Object(s)
      if (!a(s)) {
        var l = e(t, 3)
        ;((s = n(s)),
          (t = function (c) {
            return l(u[c], c, u)
          }))
      }
      var d = o(s, t, i)
      return d > -1 ? u[l ? s[d] : d] : void 0
    }
  }
  return ((Ml = r), Ml)
}
var bl, hy
function C8() {
  if (hy) return bl
  hy = 1
  var e = /\s/
  function a(n) {
    for (var r = n.length; r-- && e.test(n.charAt(r)); );
    return r
  }
  return ((bl = a), bl)
}
var Yl, vy
function A8() {
  if (vy) return Yl
  vy = 1
  var e = C8(),
    a = /^\s+/
  function n(r) {
    return r && r.slice(0, e(r) + 1).replace(a, '')
  }
  return ((Yl = n), Yl)
}
var wl, yy
function q8() {
  if (yy) return wl
  yy = 1
  var e = A8(),
    a = Ie(),
    n = wt(),
    r = NaN,
    o = /^[-+]0x[0-9a-f]+$/i,
    s = /^0b[01]+$/i,
    t = /^0o[0-7]+$/i,
    i = parseInt
  function u(l) {
    if (typeof l == 'number') return l
    if (n(l)) return r
    if (a(l)) {
      var d = typeof l.valueOf == 'function' ? l.valueOf() : l
      l = a(d) ? d + '' : d
    }
    if (typeof l != 'string') return l === 0 ? l : +l
    l = e(l)
    var c = s.test(l)
    return c || t.test(l) ? i(l.slice(2), c ? 2 : 8) : o.test(l) ? r : +l
  }
  return ((wl = u), wl)
}
var xl, gy
function E1() {
  if (gy) return xl
  gy = 1
  var e = q8(),
    a = 1 / 0,
    n = 17976931348623157e292
  function r(o) {
    if (!o) return o === 0 ? o : 0
    if (((o = e(o)), o === a || o === -a)) {
      var s = o < 0 ? -1 : 1
      return s * n
    }
    return o === o ? o : 0
  }
  return ((xl = r), xl)
}
var Ll, My
function F8() {
  if (My) return Ll
  My = 1
  var e = E1()
  function a(n) {
    var r = e(n),
      o = r % 1
    return r === r ? (o ? r - o : r) : 0
  }
  return ((Ll = a), Ll)
}
var kl, by
function R8() {
  if (by) return kl
  by = 1
  var e = b1(),
    a = Xe(),
    n = F8(),
    r = Math.max
  function o(s, t, i) {
    var u = s == null ? 0 : s.length
    if (!u) return -1
    var l = i == null ? 0 : n(i)
    return (l < 0 && (l = r(u + l, 0)), e(s, a(t, 3), l))
  }
  return ((kl = o), kl)
}
var Sl, Yy
function I8() {
  if (Yy) return Sl
  Yy = 1
  var e = j8(),
    a = R8(),
    n = e(a)
  return ((Sl = n), Sl)
}
var Dl, wy
function T1() {
  if (wy) return Dl
  wy = 1
  var e = lc()
  function a(n) {
    var r = n == null ? 0 : n.length
    return r ? e(n, 1) : []
  }
  return ((Dl = a), Dl)
}
var El, xy
function P8() {
  if (xy) return El
  xy = 1
  var e = oc(),
    a = e1(),
    n = ct()
  function r(o, s) {
    return o == null ? o : e(o, a(s), n)
  }
  return ((El = r), El)
}
var Tl, Ly
function B8() {
  if (Ly) return Tl
  Ly = 1
  function e(a) {
    var n = a == null ? 0 : a.length
    return n ? a[n - 1] : void 0
  }
  return ((Tl = e), Tl)
}
var $l, ky
function N8() {
  if (ky) return $l
  ky = 1
  var e = to(),
    a = sc(),
    n = Xe()
  function r(o, s) {
    var t = {}
    return (
      (s = n(s, 3)),
      a(o, function (i, u, l) {
        e(t, u, s(i, u, l))
      }),
      t
    )
  }
  return (($l = r), $l)
}
var Hl, Sy
function cc() {
  if (Sy) return Hl
  Sy = 1
  var e = wt()
  function a(n, r, o) {
    for (var s = -1, t = n.length; ++s < t; ) {
      var i = n[s],
        u = r(i)
      if (u != null && (l === void 0 ? u === u && !e(u) : o(u, l)))
        var l = u,
          d = i
    }
    return d
  }
  return ((Hl = a), Hl)
}
var jl, Dy
function O8() {
  if (Dy) return jl
  Dy = 1
  function e(a, n) {
    return a > n
  }
  return ((jl = e), jl)
}
var Cl, Ey
function z8() {
  if (Ey) return Cl
  Ey = 1
  var e = cc(),
    a = O8(),
    n = _t()
  function r(o) {
    return o && o.length ? e(o, n, a) : void 0
  }
  return ((Cl = r), Cl)
}
var Al, Ty
function $1() {
  if (Ty) return Al
  Ty = 1
  var e = to(),
    a = gt()
  function n(r, o, s) {
    ;((s !== void 0 && !a(r[o], s)) || (s === void 0 && !(o in r))) && e(r, o, s)
  }
  return ((Al = n), Al)
}
var ql, $y
function G8() {
  if ($y) return ql
  $y = 1
  var e = lt(),
    a = so(),
    n = Je(),
    r = '[object Object]',
    o = Function.prototype,
    s = Object.prototype,
    t = o.toString,
    i = s.hasOwnProperty,
    u = t.call(Object)
  function l(d) {
    if (!n(d) || e(d) != r) return !1
    var c = a(d)
    if (c === null) return !0
    var _ = i.call(c, 'constructor') && c.constructor
    return typeof _ == 'function' && _ instanceof _ && t.call(_) == u
  }
  return ((ql = l), ql)
}
var Fl, Hy
function H1() {
  if (Hy) return Fl
  Hy = 1
  function e(a, n) {
    if (!(n === 'constructor' && typeof a[n] == 'function') && n != '__proto__') return a[n]
  }
  return ((Fl = e), Fl)
}
var Rl, jy
function J8() {
  if (jy) return Rl
  jy = 1
  var e = Rt(),
    a = ct()
  function n(r) {
    return e(r, a(r))
  }
  return ((Rl = n), Rl)
}
var Il, Cy
function U8() {
  if (Cy) return Il
  Cy = 1
  var e = $1(),
    a = BY(),
    n = KY(),
    r = NY(),
    o = ZY(),
    s = It(),
    t = xe(),
    i = Y1(),
    u = bt(),
    l = Ft(),
    d = Ie(),
    c = G8(),
    _ = Pt(),
    f = H1(),
    m = J8()
  function h(y, p, v, g, M, w, L) {
    var D = f(y, v),
      Y = f(p, v),
      E = L.get(Y)
    if (E) {
      e(y, v, E)
      return
    }
    var k = w ? w(D, Y, v + '', y, p, L) : void 0,
      S = k === void 0
    if (S) {
      var O = t(Y),
        z = !O && u(Y),
        T = !O && !z && _(Y)
      ;((k = Y),
        O || z || T
          ? t(D)
            ? (k = D)
            : i(D)
              ? (k = r(D))
              : z
                ? ((S = !1), (k = a(Y, !0)))
                : T
                  ? ((S = !1), (k = n(Y, !0)))
                  : (k = [])
          : c(Y) || s(Y)
            ? ((k = D), s(D) ? (k = m(D)) : (!d(D) || l(D)) && (k = o(Y)))
            : (S = !1))
    }
    ;(S && (L.set(Y, k), M(k, Y, g, w, L), L.delete(Y)), e(y, v, k))
  }
  return ((Il = h), Il)
}
var Pl, Ay
function W8() {
  if (Ay) return Pl
  Ay = 1
  var e = eo(),
    a = $1(),
    n = oc(),
    r = U8(),
    o = Ie(),
    s = ct(),
    t = H1()
  function i(u, l, d, c, _) {
    u !== l &&
      n(
        l,
        function (f, m) {
          if ((_ || (_ = new e()), o(f))) r(u, l, m, d, i, c, _)
          else {
            var h = c ? c(t(u, m), f, m + '', u, l, _) : void 0
            ;(h === void 0 && (h = f), a(u, m, h))
          }
        },
        s
      )
  }
  return ((Pl = i), Pl)
}
var Bl, qy
function V8() {
  if (qy) return Bl
  qy = 1
  var e = _o(),
    a = fo()
  function n(r) {
    return e(function (o, s) {
      var t = -1,
        i = s.length,
        u = i > 1 ? s[i - 1] : void 0,
        l = i > 2 ? s[2] : void 0
      for (
        u = r.length > 3 && typeof u == 'function' ? (i--, u) : void 0,
          l && a(s[0], s[1], l) && ((u = i < 3 ? void 0 : u), (i = 1)),
          o = Object(o);
        ++t < i;
      ) {
        var d = s[t]
        d && r(o, d, t, u)
      }
      return o
    })
  }
  return ((Bl = n), Bl)
}
var Nl, Fy
function K8() {
  if (Fy) return Nl
  Fy = 1
  var e = W8(),
    a = V8(),
    n = a(function (r, o, s) {
      e(r, o, s)
    })
  return ((Nl = n), Nl)
}
var Ol, Ry
function j1() {
  if (Ry) return Ol
  Ry = 1
  function e(a, n) {
    return a < n
  }
  return ((Ol = e), Ol)
}
var zl, Iy
function X8() {
  if (Iy) return zl
  Iy = 1
  var e = cc(),
    a = j1(),
    n = _t()
  function r(o) {
    return o && o.length ? e(o, n, a) : void 0
  }
  return ((zl = r), zl)
}
var Gl, Py
function Z8() {
  if (Py) return Gl
  Py = 1
  var e = cc(),
    a = Xe(),
    n = j1()
  function r(o, s) {
    return o && o.length ? e(o, a(s, 2), n) : void 0
  }
  return ((Gl = r), Gl)
}
var Jl, By
function Q8() {
  if (By) return Jl
  By = 1
  var e = Oe(),
    a = function () {
      return e.Date.now()
    }
  return ((Jl = a), Jl)
}
var Ul, Ny
function eR() {
  if (Ny) return Ul
  Ny = 1
  var e = ro(),
    a = lo(),
    n = no(),
    r = Ie(),
    o = Bt()
  function s(t, i, u, l) {
    if (!r(t)) return t
    i = a(i, t)
    for (var d = -1, c = i.length, _ = c - 1, f = t; f != null && ++d < c; ) {
      var m = o(i[d]),
        h = u
      if (m === '__proto__' || m === 'constructor' || m === 'prototype') return t
      if (d != _) {
        var y = f[m]
        ;((h = l ? l(y, m, f) : void 0), h === void 0 && (h = r(y) ? y : n(i[d + 1]) ? [] : {}))
      }
      ;(e(f, m, h), (f = f[m]))
    }
    return t
  }
  return ((Ul = s), Ul)
}
var Wl, Oy
function tR() {
  if (Oy) return Wl
  Oy = 1
  var e = co(),
    a = eR(),
    n = lo()
  function r(o, s, t) {
    for (var i = -1, u = s.length, l = {}; ++i < u; ) {
      var d = s[i],
        c = e(o, d)
      t(c, d) && a(l, n(d, o), c)
    }
    return l
  }
  return ((Wl = r), Wl)
}
var Vl, zy
function rR() {
  if (zy) return Vl
  zy = 1
  var e = tR(),
    a = c1()
  function n(r, o) {
    return e(r, o, function (s, t) {
      return a(r, t)
    })
  }
  return ((Vl = n), Vl)
}
var Kl, Gy
function nR() {
  if (Gy) return Kl
  Gy = 1
  var e = T1(),
    a = g1(),
    n = M1()
  function r(o) {
    return n(a(o, void 0, e), o + '')
  }
  return ((Kl = r), Kl)
}
var Xl, Jy
function aR() {
  if (Jy) return Xl
  Jy = 1
  var e = rR(),
    a = nR(),
    n = a(function (r, o) {
      return r == null ? {} : e(r, o)
    })
  return ((Xl = n), Xl)
}
var Zl, Uy
function oR() {
  if (Uy) return Zl
  Uy = 1
  var e = Math.ceil,
    a = Math.max
  function n(r, o, s, t) {
    for (var i = -1, u = a(e((o - r) / (s || 1)), 0), l = Array(u); u--; )
      ((l[t ? u : ++i] = r), (r += s))
    return l
  }
  return ((Zl = n), Zl)
}
var Ql, Wy
function sR() {
  if (Wy) return Ql
  Wy = 1
  var e = oR(),
    a = fo(),
    n = E1()
  function r(o) {
    return function (s, t, i) {
      return (
        i && typeof i != 'number' && a(s, t, i) && (t = i = void 0),
        (s = n(s)),
        t === void 0 ? ((t = s), (s = 0)) : (t = n(t)),
        (i = i === void 0 ? (s < t ? 1 : -1) : n(i)),
        e(s, t, i, o)
      )
    }
  }
  return ((Ql = r), Ql)
}
var ed, Vy
function iR() {
  if (Vy) return ed
  Vy = 1
  var e = sR(),
    a = e()
  return ((ed = a), ed)
}
var td, Ky
function uR() {
  if (Ky) return td
  Ky = 1
  function e(a, n) {
    var r = a.length
    for (a.sort(n); r--; ) a[r] = a[r].value
    return a
  }
  return ((td = e), td)
}
var rd, Xy
function lR() {
  if (Xy) return rd
  Xy = 1
  var e = wt()
  function a(n, r) {
    if (n !== r) {
      var o = n !== void 0,
        s = n === null,
        t = n === n,
        i = e(n),
        u = r !== void 0,
        l = r === null,
        d = r === r,
        c = e(r)
      if (
        (!l && !c && !i && n > r) ||
        (i && u && d && !l && !c) ||
        (s && u && d) ||
        (!o && d) ||
        !t
      )
        return 1
      if (
        (!s && !i && !c && n < r) ||
        (c && o && t && !s && !i) ||
        (l && o && t) ||
        (!u && t) ||
        !d
      )
        return -1
    }
    return 0
  }
  return ((rd = a), rd)
}
var nd, Zy
function dR() {
  if (Zy) return nd
  Zy = 1
  var e = lR()
  function a(n, r, o) {
    for (var s = -1, t = n.criteria, i = r.criteria, u = t.length, l = o.length; ++s < u; ) {
      var d = e(t[s], i[s])
      if (d) {
        if (s >= l) return d
        var c = o[s]
        return d * (c == 'desc' ? -1 : 1)
      }
    }
    return n.index - r.index
  }
  return ((nd = a), nd)
}
var ad, Qy
function cR() {
  if (Qy) return ad
  Qy = 1
  var e = uo(),
    a = co(),
    n = Xe(),
    r = h1(),
    o = uR(),
    s = ao(),
    t = dR(),
    i = _t(),
    u = xe()
  function l(d, c, _) {
    c.length
      ? (c = e(c, function (h) {
          return u(h)
            ? function (y) {
                return a(y, h.length === 1 ? h[0] : h)
              }
            : h
        }))
      : (c = [i])
    var f = -1
    c = e(c, s(n))
    var m = r(d, function (h, y, p) {
      var v = e(c, function (g) {
        return g(h)
      })
      return { criteria: v, index: ++f, value: h }
    })
    return o(m, function (h, y) {
      return t(h, y, _)
    })
  }
  return ((ad = l), ad)
}
var od, eg
function _R() {
  if (eg) return od
  eg = 1
  var e = lc(),
    a = cR(),
    n = _o(),
    r = fo(),
    o = n(function (s, t) {
      if (s == null) return []
      var i = t.length
      return (
        i > 1 && r(s, t[0], t[1]) ? (t = []) : i > 2 && r(t[0], t[1], t[2]) && (t = [t[0]]),
        a(s, e(t, 1), [])
      )
    })
  return ((od = o), od)
}
var sd, tg
function fR() {
  if (tg) return sd
  tg = 1
  var e = l1(),
    a = 0
  function n(r) {
    var o = ++a
    return e(r) + o
  }
  return ((sd = n), sd)
}
var id, rg
function mR() {
  if (rg) return id
  rg = 1
  function e(a, n, r) {
    for (var o = -1, s = a.length, t = n.length, i = {}; ++o < s; ) {
      var u = o < t ? n[o] : void 0
      r(i, a[o], u)
    }
    return i
  }
  return ((id = e), id)
}
var ud, ng
function pR() {
  if (ng) return ud
  ng = 1
  var e = ro(),
    a = mR()
  function n(r, o) {
    return a(r || [], o || [], e)
  }
  return ((ud = n), ud)
}
var ld, ag
function ge() {
  if (ag) return ld
  ag = 1
  var e
  if (typeof Wd == 'function')
    try {
      e = {
        cloneDeep: $8(),
        constant: ac(),
        defaults: H8(),
        each: r1(),
        filter: f1(),
        find: I8(),
        flatten: T1(),
        forEach: t1(),
        forIn: P8(),
        has: m1(),
        isUndefined: p1(),
        last: B8(),
        map: v1(),
        mapValues: N8(),
        max: z8(),
        merge: K8(),
        min: X8(),
        minBy: Z8(),
        now: Q8(),
        pick: aR(),
        range: iR(),
        reduce: y1(),
        sortBy: _R(),
        uniqueId: fR(),
        values: w1(),
        zipObject: pR()
      }
    } catch {}
  return (e || (e = window._), (ld = e), ld)
}
var dd, og
function hR() {
  if (og) return dd
  ;((og = 1), (dd = e))
  function e() {
    var r = {}
    ;((r._next = r._prev = r), (this._sentinel = r))
  }
  ;((e.prototype.dequeue = function () {
    var r = this._sentinel,
      o = r._prev
    if (o !== r) return (a(o), o)
  }),
    (e.prototype.enqueue = function (r) {
      var o = this._sentinel
      ;(r._prev && r._next && a(r),
        (r._next = o._next),
        (o._next._prev = r),
        (o._next = r),
        (r._prev = o))
    }),
    (e.prototype.toString = function () {
      for (var r = [], o = this._sentinel, s = o._prev; s !== o; )
        (r.push(JSON.stringify(s, n)), (s = s._prev))
      return '[' + r.join(', ') + ']'
    }))
  function a(r) {
    ;((r._prev._next = r._next), (r._next._prev = r._prev), delete r._next, delete r._prev)
  }
  function n(r, o) {
    if (r !== '_next' && r !== '_prev') return o
  }
  return dd
}
var cd, sg
function vR() {
  if (sg) return cd
  sg = 1
  var e = ge(),
    a = Ne().Graph,
    n = hR()
  cd = o
  var r = e.constant(1)
  function o(l, d) {
    if (l.nodeCount() <= 1) return []
    var c = i(l, d || r),
      _ = s(c.graph, c.buckets, c.zeroIdx)
    return e.flatten(
      e.map(_, function (f) {
        return l.outEdges(f.v, f.w)
      }),
      !0
    )
  }
  function s(l, d, c) {
    for (var _ = [], f = d[d.length - 1], m = d[0], h; l.nodeCount(); ) {
      for (; (h = m.dequeue()); ) t(l, d, c, h)
      for (; (h = f.dequeue()); ) t(l, d, c, h)
      if (l.nodeCount()) {
        for (var y = d.length - 2; y > 0; --y)
          if (((h = d[y].dequeue()), h)) {
            _ = _.concat(t(l, d, c, h, !0))
            break
          }
      }
    }
    return _
  }
  function t(l, d, c, _, f) {
    var m = f ? [] : void 0
    return (
      e.forEach(l.inEdges(_.v), function (h) {
        var y = l.edge(h),
          p = l.node(h.v)
        ;(f && m.push({ v: h.v, w: h.w }), (p.out -= y), u(d, c, p))
      }),
      e.forEach(l.outEdges(_.v), function (h) {
        var y = l.edge(h),
          p = h.w,
          v = l.node(p)
        ;((v.in -= y), u(d, c, v))
      }),
      l.removeNode(_.v),
      m
    )
  }
  function i(l, d) {
    var c = new a(),
      _ = 0,
      f = 0
    ;(e.forEach(l.nodes(), function (y) {
      c.setNode(y, { v: y, in: 0, out: 0 })
    }),
      e.forEach(l.edges(), function (y) {
        var p = c.edge(y.v, y.w) || 0,
          v = d(y),
          g = p + v
        ;(c.setEdge(y.v, y.w, g),
          (f = Math.max(f, (c.node(y.v).out += v))),
          (_ = Math.max(_, (c.node(y.w).in += v))))
      }))
    var m = e.range(f + _ + 3).map(function () {
        return new n()
      }),
      h = _ + 1
    return (
      e.forEach(c.nodes(), function (y) {
        u(m, h, c.node(y))
      }),
      { graph: c, buckets: m, zeroIdx: h }
    )
  }
  function u(l, d, c) {
    c.out ? (c.in ? l[c.out - c.in + d].enqueue(c) : l[l.length - 1].enqueue(c)) : l[0].enqueue(c)
  }
  return cd
}
var _d, ig
function yR() {
  if (ig) return _d
  ig = 1
  var e = ge(),
    a = vR()
  _d = {
    run: n,
    undo: o
  }
  function n(s) {
    var t = s.graph().acyclicer === 'greedy' ? a(s, i(s)) : r(s)
    e.forEach(t, function (u) {
      var l = s.edge(u)
      ;(s.removeEdge(u),
        (l.forwardName = u.name),
        (l.reversed = !0),
        s.setEdge(u.w, u.v, l, e.uniqueId('rev')))
    })
    function i(u) {
      return function (l) {
        return u.edge(l).weight
      }
    }
  }
  function r(s) {
    var t = [],
      i = {},
      u = {}
    function l(d) {
      e.has(u, d) ||
        ((u[d] = !0),
        (i[d] = !0),
        e.forEach(s.outEdges(d), function (c) {
          e.has(i, c.w) ? t.push(c) : l(c.w)
        }),
        delete i[d])
    }
    return (e.forEach(s.nodes(), l), t)
  }
  function o(s) {
    e.forEach(s.edges(), function (t) {
      var i = s.edge(t)
      if (i.reversed) {
        s.removeEdge(t)
        var u = i.forwardName
        ;(delete i.reversed, delete i.forwardName, s.setEdge(t.w, t.v, i, u))
      }
    })
  }
  return _d
}
var fd, ug
function Ce() {
  if (ug) return fd
  ug = 1
  var e = ge(),
    a = Ne().Graph
  fd = {
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
  }
  function n(y, p, v, g) {
    var M
    do M = e.uniqueId(g)
    while (y.hasNode(M))
    return ((v.dummy = p), y.setNode(M, v), M)
  }
  function r(y) {
    var p = new a().setGraph(y.graph())
    return (
      e.forEach(y.nodes(), function (v) {
        p.setNode(v, y.node(v))
      }),
      e.forEach(y.edges(), function (v) {
        var g = p.edge(v.v, v.w) || { weight: 0, minlen: 1 },
          M = y.edge(v)
        p.setEdge(v.v, v.w, {
          weight: g.weight + M.weight,
          minlen: Math.max(g.minlen, M.minlen)
        })
      }),
      p
    )
  }
  function o(y) {
    var p = new a({ multigraph: y.isMultigraph() }).setGraph(y.graph())
    return (
      e.forEach(y.nodes(), function (v) {
        y.children(v).length || p.setNode(v, y.node(v))
      }),
      e.forEach(y.edges(), function (v) {
        p.setEdge(v, y.edge(v))
      }),
      p
    )
  }
  function s(y) {
    var p = e.map(y.nodes(), function (v) {
      var g = {}
      return (
        e.forEach(y.outEdges(v), function (M) {
          g[M.w] = (g[M.w] || 0) + y.edge(M).weight
        }),
        g
      )
    })
    return e.zipObject(y.nodes(), p)
  }
  function t(y) {
    var p = e.map(y.nodes(), function (v) {
      var g = {}
      return (
        e.forEach(y.inEdges(v), function (M) {
          g[M.v] = (g[M.v] || 0) + y.edge(M).weight
        }),
        g
      )
    })
    return e.zipObject(y.nodes(), p)
  }
  function i(y, p) {
    var v = y.x,
      g = y.y,
      M = p.x - v,
      w = p.y - g,
      L = y.width / 2,
      D = y.height / 2
    if (!M && !w) throw new Error('Not possible to find intersection inside of the rectangle')
    var Y, E
    return (
      Math.abs(w) * L > Math.abs(M) * D
        ? (w < 0 && (D = -D), (Y = (D * M) / w), (E = D))
        : (M < 0 && (L = -L), (Y = L), (E = (L * w) / M)),
      { x: v + Y, y: g + E }
    )
  }
  function u(y) {
    var p = e.map(e.range(_(y) + 1), function () {
      return []
    })
    return (
      e.forEach(y.nodes(), function (v) {
        var g = y.node(v),
          M = g.rank
        e.isUndefined(M) || (p[M][g.order] = v)
      }),
      p
    )
  }
  function l(y) {
    var p = e.min(
      e.map(y.nodes(), function (v) {
        return y.node(v).rank
      })
    )
    e.forEach(y.nodes(), function (v) {
      var g = y.node(v)
      e.has(g, 'rank') && (g.rank -= p)
    })
  }
  function d(y) {
    var p = e.min(
        e.map(y.nodes(), function (w) {
          return y.node(w).rank
        })
      ),
      v = []
    e.forEach(y.nodes(), function (w) {
      var L = y.node(w).rank - p
      ;(v[L] || (v[L] = []), v[L].push(w))
    })
    var g = 0,
      M = y.graph().nodeRankFactor
    e.forEach(v, function (w, L) {
      e.isUndefined(w) && L % M !== 0
        ? --g
        : g &&
          e.forEach(w, function (D) {
            y.node(D).rank += g
          })
    })
  }
  function c(y, p, v, g) {
    var M = {
      width: 0,
      height: 0
    }
    return (arguments.length >= 4 && ((M.rank = v), (M.order = g)), n(y, 'border', M, p))
  }
  function _(y) {
    return e.max(
      e.map(y.nodes(), function (p) {
        var v = y.node(p).rank
        if (!e.isUndefined(v)) return v
      })
    )
  }
  function f(y, p) {
    var v = { lhs: [], rhs: [] }
    return (
      e.forEach(y, function (g) {
        p(g) ? v.lhs.push(g) : v.rhs.push(g)
      }),
      v
    )
  }
  function m(y, p) {
    var v = e.now()
    try {
      return p()
    } finally {
      console.log(y + ' time: ' + (e.now() - v) + 'ms')
    }
  }
  function h(y, p) {
    return p()
  }
  return fd
}
var md, lg
function gR() {
  if (lg) return md
  lg = 1
  var e = ge(),
    a = Ce()
  md = {
    run: n,
    undo: o
  }
  function n(s) {
    ;((s.graph().dummyChains = []),
      e.forEach(s.edges(), function (t) {
        r(s, t)
      }))
  }
  function r(s, t) {
    var i = t.v,
      u = s.node(i).rank,
      l = t.w,
      d = s.node(l).rank,
      c = t.name,
      _ = s.edge(t),
      f = _.labelRank
    if (d !== u + 1) {
      s.removeEdge(t)
      var m, h, y
      for (y = 0, ++u; u < d; ++y, ++u)
        ((_.points = []),
          (h = {
            width: 0,
            height: 0,
            edgeLabel: _,
            edgeObj: t,
            rank: u
          }),
          (m = a.addDummyNode(s, 'edge', h, '_d')),
          u === f &&
            ((h.width = _.width),
            (h.height = _.height),
            (h.dummy = 'edge-label'),
            (h.labelpos = _.labelpos)),
          s.setEdge(i, m, { weight: _.weight }, c),
          y === 0 && s.graph().dummyChains.push(m),
          (i = m))
      s.setEdge(i, l, { weight: _.weight }, c)
    }
  }
  function o(s) {
    e.forEach(s.graph().dummyChains, function (t) {
      var i = s.node(t),
        u = i.edgeLabel,
        l
      for (s.setEdge(i.edgeObj, u); i.dummy; )
        ((l = s.successors(t)[0]),
          s.removeNode(t),
          u.points.push({ x: i.x, y: i.y }),
          i.dummy === 'edge-label' &&
            ((u.x = i.x), (u.y = i.y), (u.width = i.width), (u.height = i.height)),
          (t = l),
          (i = s.node(t)))
    })
  }
  return md
}
var pd, dg
function Ga() {
  if (dg) return pd
  dg = 1
  var e = ge()
  pd = {
    longestPath: a,
    slack: n
  }
  function a(r) {
    var o = {}
    function s(t) {
      var i = r.node(t)
      if (e.has(o, t)) return i.rank
      o[t] = !0
      var u = e.min(
        e.map(r.outEdges(t), function (l) {
          return s(l.w) - r.edge(l).minlen
        })
      )
      return (
        (u === Number.POSITIVE_INFINITY || // return value of _.map([]) for Lodash 3
          u === void 0 || // return value of _.map([]) for Lodash 4
          u === null) &&
          (u = 0),
        (i.rank = u)
      )
    }
    e.forEach(r.sources(), s)
  }
  function n(r, o) {
    return r.node(o.w).rank - r.node(o.v).rank - r.edge(o).minlen
  }
  return pd
}
var hd, cg
function C1() {
  if (cg) return hd
  cg = 1
  var e = ge(),
    a = Ne().Graph,
    n = Ga().slack
  hd = r
  function r(i) {
    var u = new a({ directed: !1 }),
      l = i.nodes()[0],
      d = i.nodeCount()
    u.setNode(l, {})
    for (var c, _; o(u, i) < d; )
      ((c = s(u, i)), (_ = u.hasNode(c.v) ? n(i, c) : -n(i, c)), t(u, i, _))
    return u
  }
  function o(i, u) {
    function l(d) {
      e.forEach(u.nodeEdges(d), function (c) {
        var _ = c.v,
          f = d === _ ? c.w : _
        !i.hasNode(f) && !n(u, c) && (i.setNode(f, {}), i.setEdge(d, f, {}), l(f))
      })
    }
    return (e.forEach(i.nodes(), l), i.nodeCount())
  }
  function s(i, u) {
    return e.minBy(u.edges(), function (l) {
      if (i.hasNode(l.v) !== i.hasNode(l.w)) return n(u, l)
    })
  }
  function t(i, u, l) {
    e.forEach(i.nodes(), function (d) {
      u.node(d).rank += l
    })
  }
  return hd
}
var vd, _g
function MR() {
  if (_g) return vd
  _g = 1
  var e = ge(),
    a = C1(),
    n = Ga().slack,
    r = Ga().longestPath,
    o = Ne().alg.preorder,
    s = Ne().alg.postorder,
    t = Ce().simplify
  ;((vd = i),
    (i.initLowLimValues = c),
    (i.initCutValues = u),
    (i.calcCutValue = d),
    (i.leaveEdge = f),
    (i.enterEdge = m),
    (i.exchangeEdges = h))
  function i(g) {
    ;((g = t(g)), r(g))
    var M = a(g)
    ;(c(M), u(M, g))
    for (var w, L; (w = f(M)); ) ((L = m(M, g, w)), h(M, g, w, L))
  }
  function u(g, M) {
    var w = s(g, g.nodes())
    ;((w = w.slice(0, w.length - 1)),
      e.forEach(w, function (L) {
        l(g, M, L)
      }))
  }
  function l(g, M, w) {
    var L = g.node(w),
      D = L.parent
    g.edge(w, D).cutvalue = d(g, M, w)
  }
  function d(g, M, w) {
    var L = g.node(w),
      D = L.parent,
      Y = !0,
      E = M.edge(w, D),
      k = 0
    return (
      E || ((Y = !1), (E = M.edge(D, w))),
      (k = E.weight),
      e.forEach(M.nodeEdges(w), function (S) {
        var O = S.v === w,
          z = O ? S.w : S.v
        if (z !== D) {
          var T = O === Y,
            x = M.edge(S).weight
          if (((k += T ? x : -x), p(g, w, z))) {
            var H = g.edge(w, z).cutvalue
            k += T ? -H : H
          }
        }
      }),
      k
    )
  }
  function c(g, M) {
    ;(arguments.length < 2 && (M = g.nodes()[0]), _(g, {}, 1, M))
  }
  function _(g, M, w, L, D) {
    var Y = w,
      E = g.node(L)
    return (
      (M[L] = !0),
      e.forEach(g.neighbors(L), function (k) {
        e.has(M, k) || (w = _(g, M, w, k, L))
      }),
      (E.low = Y),
      (E.lim = w++),
      D ? (E.parent = D) : delete E.parent,
      w
    )
  }
  function f(g) {
    return e.find(g.edges(), function (M) {
      return g.edge(M).cutvalue < 0
    })
  }
  function m(g, M, w) {
    var L = w.v,
      D = w.w
    M.hasEdge(L, D) || ((L = w.w), (D = w.v))
    var Y = g.node(L),
      E = g.node(D),
      k = Y,
      S = !1
    Y.lim > E.lim && ((k = E), (S = !0))
    var O = e.filter(M.edges(), function (z) {
      return S === v(g, g.node(z.v), k) && S !== v(g, g.node(z.w), k)
    })
    return e.minBy(O, function (z) {
      return n(M, z)
    })
  }
  function h(g, M, w, L) {
    var D = w.v,
      Y = w.w
    ;(g.removeEdge(D, Y), g.setEdge(L.v, L.w, {}), c(g), u(g, M), y(g, M))
  }
  function y(g, M) {
    var w = e.find(g.nodes(), function (D) {
        return !M.node(D).parent
      }),
      L = o(g, w)
    ;((L = L.slice(1)),
      e.forEach(L, function (D) {
        var Y = g.node(D).parent,
          E = M.edge(D, Y),
          k = !1
        ;(E || ((E = M.edge(Y, D)), (k = !0)),
          (M.node(D).rank = M.node(Y).rank + (k ? E.minlen : -E.minlen)))
      }))
  }
  function p(g, M, w) {
    return g.hasEdge(M, w)
  }
  function v(g, M, w) {
    return w.low <= M.lim && M.lim <= w.lim
  }
  return vd
}
var yd, fg
function bR() {
  if (fg) return yd
  fg = 1
  var e = Ga(),
    a = e.longestPath,
    n = C1(),
    r = MR()
  yd = o
  function o(u) {
    switch (u.graph().ranker) {
      case 'network-simplex':
        i(u)
        break
      case 'tight-tree':
        t(u)
        break
      case 'longest-path':
        s(u)
        break
      default:
        i(u)
    }
  }
  var s = a
  function t(u) {
    ;(a(u), n(u))
  }
  function i(u) {
    r(u)
  }
  return yd
}
var gd, mg
function YR() {
  if (mg) return gd
  mg = 1
  var e = ge()
  gd = a
  function a(o) {
    var s = r(o)
    e.forEach(o.graph().dummyChains, function (t) {
      for (
        var i = o.node(t),
          u = i.edgeObj,
          l = n(o, s, u.v, u.w),
          d = l.path,
          c = l.lca,
          _ = 0,
          f = d[_],
          m = !0;
        t !== u.w;
      ) {
        if (((i = o.node(t)), m)) {
          for (; (f = d[_]) !== c && o.node(f).maxRank < i.rank; ) _++
          f === c && (m = !1)
        }
        if (!m) {
          for (; _ < d.length - 1 && o.node((f = d[_ + 1])).minRank <= i.rank; ) _++
          f = d[_]
        }
        ;(o.setParent(t, f), (t = o.successors(t)[0]))
      }
    })
  }
  function n(o, s, t, i) {
    var u = [],
      l = [],
      d = Math.min(s[t].low, s[i].low),
      c = Math.max(s[t].lim, s[i].lim),
      _,
      f
    _ = t
    do ((_ = o.parent(_)), u.push(_))
    while (_ && (s[_].low > d || c > s[_].lim))
    for (f = _, _ = i; (_ = o.parent(_)) !== f; ) l.push(_)
    return { path: u.concat(l.reverse()), lca: f }
  }
  function r(o) {
    var s = {},
      t = 0
    function i(u) {
      var l = t
      ;(e.forEach(o.children(u), i), (s[u] = { low: l, lim: t++ }))
    }
    return (e.forEach(o.children(), i), s)
  }
  return gd
}
var Md, pg
function wR() {
  if (pg) return Md
  pg = 1
  var e = ge(),
    a = Ce()
  Md = {
    run: n,
    cleanup: t
  }
  function n(i) {
    var u = a.addDummyNode(i, 'root', {}, '_root'),
      l = o(i),
      d = e.max(e.values(l)) - 1,
      c = 2 * d + 1
    ;((i.graph().nestingRoot = u),
      e.forEach(i.edges(), function (f) {
        i.edge(f).minlen *= c
      }))
    var _ = s(i) + 1
    ;(e.forEach(i.children(), function (f) {
      r(i, u, c, _, d, l, f)
    }),
      (i.graph().nodeRankFactor = c))
  }
  function r(i, u, l, d, c, _, f) {
    var m = i.children(f)
    if (!m.length) {
      f !== u && i.setEdge(u, f, { weight: 0, minlen: l })
      return
    }
    var h = a.addBorderNode(i, '_bt'),
      y = a.addBorderNode(i, '_bb'),
      p = i.node(f)
    ;(i.setParent(h, f),
      (p.borderTop = h),
      i.setParent(y, f),
      (p.borderBottom = y),
      e.forEach(m, function (v) {
        r(i, u, l, d, c, _, v)
        var g = i.node(v),
          M = g.borderTop ? g.borderTop : v,
          w = g.borderBottom ? g.borderBottom : v,
          L = g.borderTop ? d : 2 * d,
          D = M !== w ? 1 : c - _[f] + 1
        ;(i.setEdge(h, M, {
          weight: L,
          minlen: D,
          nestingEdge: !0
        }),
          i.setEdge(w, y, {
            weight: L,
            minlen: D,
            nestingEdge: !0
          }))
      }),
      i.parent(f) || i.setEdge(u, h, { weight: 0, minlen: c + _[f] }))
  }
  function o(i) {
    var u = {}
    function l(d, c) {
      var _ = i.children(d)
      ;(_ &&
        _.length &&
        e.forEach(_, function (f) {
          l(f, c + 1)
        }),
        (u[d] = c))
    }
    return (
      e.forEach(i.children(), function (d) {
        l(d, 1)
      }),
      u
    )
  }
  function s(i) {
    return e.reduce(
      i.edges(),
      function (u, l) {
        return u + i.edge(l).weight
      },
      0
    )
  }
  function t(i) {
    var u = i.graph()
    ;(i.removeNode(u.nestingRoot),
      delete u.nestingRoot,
      e.forEach(i.edges(), function (l) {
        var d = i.edge(l)
        d.nestingEdge && i.removeEdge(l)
      }))
  }
  return Md
}
var bd, hg
function xR() {
  if (hg) return bd
  hg = 1
  var e = ge(),
    a = Ce()
  bd = n
  function n(o) {
    function s(t) {
      var i = o.children(t),
        u = o.node(t)
      if ((i.length && e.forEach(i, s), e.has(u, 'minRank'))) {
        ;((u.borderLeft = []), (u.borderRight = []))
        for (var l = u.minRank, d = u.maxRank + 1; l < d; ++l)
          (r(o, 'borderLeft', '_bl', t, u, l), r(o, 'borderRight', '_br', t, u, l))
      }
    }
    e.forEach(o.children(), s)
  }
  function r(o, s, t, i, u, l) {
    var d = { width: 0, height: 0, rank: l, borderType: s },
      c = u[s][l - 1],
      _ = a.addDummyNode(o, 'border', d, t)
    ;((u[s][l] = _), o.setParent(_, i), c && o.setEdge(c, _, { weight: 1 }))
  }
  return bd
}
var Yd, vg
function LR() {
  if (vg) return Yd
  vg = 1
  var e = ge()
  Yd = {
    adjust: a,
    undo: n
  }
  function a(l) {
    var d = l.graph().rankdir.toLowerCase()
    ;(d === 'lr' || d === 'rl') && r(l)
  }
  function n(l) {
    var d = l.graph().rankdir.toLowerCase()
    ;((d === 'bt' || d === 'rl') && s(l), (d === 'lr' || d === 'rl') && (i(l), r(l)))
  }
  function r(l) {
    ;(e.forEach(l.nodes(), function (d) {
      o(l.node(d))
    }),
      e.forEach(l.edges(), function (d) {
        o(l.edge(d))
      }))
  }
  function o(l) {
    var d = l.width
    ;((l.width = l.height), (l.height = d))
  }
  function s(l) {
    ;(e.forEach(l.nodes(), function (d) {
      t(l.node(d))
    }),
      e.forEach(l.edges(), function (d) {
        var c = l.edge(d)
        ;(e.forEach(c.points, t), e.has(c, 'y') && t(c))
      }))
  }
  function t(l) {
    l.y = -l.y
  }
  function i(l) {
    ;(e.forEach(l.nodes(), function (d) {
      u(l.node(d))
    }),
      e.forEach(l.edges(), function (d) {
        var c = l.edge(d)
        ;(e.forEach(c.points, u), e.has(c, 'x') && u(c))
      }))
  }
  function u(l) {
    var d = l.x
    ;((l.x = l.y), (l.y = d))
  }
  return Yd
}
var wd, yg
function kR() {
  if (yg) return wd
  yg = 1
  var e = ge()
  wd = a
  function a(n) {
    var r = {},
      o = e.filter(n.nodes(), function (l) {
        return !n.children(l).length
      }),
      s = e.max(
        e.map(o, function (l) {
          return n.node(l).rank
        })
      ),
      t = e.map(e.range(s + 1), function () {
        return []
      })
    function i(l) {
      if (!e.has(r, l)) {
        r[l] = !0
        var d = n.node(l)
        ;(t[d.rank].push(l), e.forEach(n.successors(l), i))
      }
    }
    var u = e.sortBy(o, function (l) {
      return n.node(l).rank
    })
    return (e.forEach(u, i), t)
  }
  return wd
}
var xd, gg
function SR() {
  if (gg) return xd
  gg = 1
  var e = ge()
  xd = a
  function a(r, o) {
    for (var s = 0, t = 1; t < o.length; ++t) s += n(r, o[t - 1], o[t])
    return s
  }
  function n(r, o, s) {
    for (
      var t = e.zipObject(
          s,
          e.map(s, function (_, f) {
            return f
          })
        ),
        i = e.flatten(
          e.map(o, function (_) {
            return e.sortBy(
              e.map(r.outEdges(_), function (f) {
                return { pos: t[f.w], weight: r.edge(f).weight }
              }),
              'pos'
            )
          }),
          !0
        ),
        u = 1;
      u < s.length;
    )
      u <<= 1
    var l = 2 * u - 1
    u -= 1
    var d = e.map(new Array(l), function () {
        return 0
      }),
      c = 0
    return (
      e.forEach(
        i.forEach(function (_) {
          var f = _.pos + u
          d[f] += _.weight
          for (var m = 0; f > 0; )
            (f % 2 && (m += d[f + 1]), (f = (f - 1) >> 1), (d[f] += _.weight))
          c += _.weight * m
        })
      ),
      c
    )
  }
  return xd
}
var Ld, Mg
function DR() {
  if (Mg) return Ld
  Mg = 1
  var e = ge()
  Ld = a
  function a(n, r) {
    return e.map(r, function (o) {
      var s = n.inEdges(o)
      if (s.length) {
        var t = e.reduce(
          s,
          function (i, u) {
            var l = n.edge(u),
              d = n.node(u.v)
            return {
              sum: i.sum + l.weight * d.order,
              weight: i.weight + l.weight
            }
          },
          { sum: 0, weight: 0 }
        )
        return {
          v: o,
          barycenter: t.sum / t.weight,
          weight: t.weight
        }
      } else return { v: o }
    })
  }
  return Ld
}
var kd, bg
function ER() {
  if (bg) return kd
  bg = 1
  var e = ge()
  kd = a
  function a(o, s) {
    var t = {}
    ;(e.forEach(o, function (u, l) {
      var d = (t[u.v] = {
        indegree: 0,
        in: [],
        out: [],
        vs: [u.v],
        i: l
      })
      e.isUndefined(u.barycenter) || ((d.barycenter = u.barycenter), (d.weight = u.weight))
    }),
      e.forEach(s.edges(), function (u) {
        var l = t[u.v],
          d = t[u.w]
        !e.isUndefined(l) && !e.isUndefined(d) && (d.indegree++, l.out.push(t[u.w]))
      }))
    var i = e.filter(t, function (u) {
      return !u.indegree
    })
    return n(i)
  }
  function n(o) {
    var s = []
    function t(l) {
      return function (d) {
        d.merged ||
          ((e.isUndefined(d.barycenter) ||
            e.isUndefined(l.barycenter) ||
            d.barycenter >= l.barycenter) &&
            r(l, d))
      }
    }
    function i(l) {
      return function (d) {
        ;(d.in.push(l), --d.indegree === 0 && o.push(d))
      }
    }
    for (; o.length; ) {
      var u = o.pop()
      ;(s.push(u), e.forEach(u.in.reverse(), t(u)), e.forEach(u.out, i(u)))
    }
    return e.map(
      e.filter(s, function (l) {
        return !l.merged
      }),
      function (l) {
        return e.pick(l, ['vs', 'i', 'barycenter', 'weight'])
      }
    )
  }
  function r(o, s) {
    var t = 0,
      i = 0
    ;(o.weight && ((t += o.barycenter * o.weight), (i += o.weight)),
      s.weight && ((t += s.barycenter * s.weight), (i += s.weight)),
      (o.vs = s.vs.concat(o.vs)),
      (o.barycenter = t / i),
      (o.weight = i),
      (o.i = Math.min(s.i, o.i)),
      (s.merged = !0))
  }
  return kd
}
var Sd, Yg
function TR() {
  if (Yg) return Sd
  Yg = 1
  var e = ge(),
    a = Ce()
  Sd = n
  function n(s, t) {
    var i = a.partition(s, function (h) {
        return e.has(h, 'barycenter')
      }),
      u = i.lhs,
      l = e.sortBy(i.rhs, function (h) {
        return -h.i
      }),
      d = [],
      c = 0,
      _ = 0,
      f = 0
    ;(u.sort(o(!!t)),
      (f = r(d, l, f)),
      e.forEach(u, function (h) {
        ;((f += h.vs.length),
          d.push(h.vs),
          (c += h.barycenter * h.weight),
          (_ += h.weight),
          (f = r(d, l, f)))
      }))
    var m = { vs: e.flatten(d, !0) }
    return (_ && ((m.barycenter = c / _), (m.weight = _)), m)
  }
  function r(s, t, i) {
    for (var u; t.length && (u = e.last(t)).i <= i; ) (t.pop(), s.push(u.vs), i++)
    return i
  }
  function o(s) {
    return function (t, i) {
      return t.barycenter < i.barycenter
        ? -1
        : t.barycenter > i.barycenter
          ? 1
          : s
            ? i.i - t.i
            : t.i - i.i
    }
  }
  return Sd
}
var Dd, wg
function $R() {
  if (wg) return Dd
  wg = 1
  var e = ge(),
    a = DR(),
    n = ER(),
    r = TR()
  Dd = o
  function o(i, u, l, d) {
    var c = i.children(u),
      _ = i.node(u),
      f = _ ? _.borderLeft : void 0,
      m = _ ? _.borderRight : void 0,
      h = {}
    f &&
      (c = e.filter(c, function (w) {
        return w !== f && w !== m
      }))
    var y = a(i, c)
    e.forEach(y, function (w) {
      if (i.children(w.v).length) {
        var L = o(i, w.v, l, d)
        ;((h[w.v] = L), e.has(L, 'barycenter') && t(w, L))
      }
    })
    var p = n(y, l)
    s(p, h)
    var v = r(p, d)
    if (f && ((v.vs = e.flatten([f, v.vs, m], !0)), i.predecessors(f).length)) {
      var g = i.node(i.predecessors(f)[0]),
        M = i.node(i.predecessors(m)[0])
      ;(e.has(v, 'barycenter') || ((v.barycenter = 0), (v.weight = 0)),
        (v.barycenter = (v.barycenter * v.weight + g.order + M.order) / (v.weight + 2)),
        (v.weight += 2))
    }
    return v
  }
  function s(i, u) {
    e.forEach(i, function (l) {
      l.vs = e.flatten(
        l.vs.map(function (d) {
          return u[d] ? u[d].vs : d
        }),
        !0
      )
    })
  }
  function t(i, u) {
    e.isUndefined(i.barycenter)
      ? ((i.barycenter = u.barycenter), (i.weight = u.weight))
      : ((i.barycenter =
          (i.barycenter * i.weight + u.barycenter * u.weight) / (i.weight + u.weight)),
        (i.weight += u.weight))
  }
  return Dd
}
var Ed, xg
function HR() {
  if (xg) return Ed
  xg = 1
  var e = ge(),
    a = Ne().Graph
  Ed = n
  function n(o, s, t) {
    var i = r(o),
      u = new a({ compound: !0 }).setGraph({ root: i }).setDefaultNodeLabel(function (l) {
        return o.node(l)
      })
    return (
      e.forEach(o.nodes(), function (l) {
        var d = o.node(l),
          c = o.parent(l)
        ;(d.rank === s || (d.minRank <= s && s <= d.maxRank)) &&
          (u.setNode(l),
          u.setParent(l, c || i),
          e.forEach(o[t](l), function (_) {
            var f = _.v === l ? _.w : _.v,
              m = u.edge(f, l),
              h = e.isUndefined(m) ? 0 : m.weight
            u.setEdge(f, l, { weight: o.edge(_).weight + h })
          }),
          e.has(d, 'minRank') &&
            u.setNode(l, {
              borderLeft: d.borderLeft[s],
              borderRight: d.borderRight[s]
            }))
      }),
      u
    )
  }
  function r(o) {
    for (var s; o.hasNode((s = e.uniqueId('_root'))); );
    return s
  }
  return Ed
}
var Td, Lg
function jR() {
  if (Lg) return Td
  Lg = 1
  var e = ge()
  Td = a
  function a(n, r, o) {
    var s = {},
      t
    e.forEach(o, function (i) {
      for (var u = n.parent(i), l, d; u; ) {
        if (((l = n.parent(u)), l ? ((d = s[l]), (s[l] = u)) : ((d = t), (t = u)), d && d !== u)) {
          r.setEdge(d, u)
          return
        }
        u = l
      }
    })
  }
  return Td
}
var $d, kg
function CR() {
  if (kg) return $d
  kg = 1
  var e = ge(),
    a = kR(),
    n = SR(),
    r = $R(),
    o = HR(),
    s = jR(),
    t = Ne().Graph,
    i = Ce()
  $d = u
  function u(_) {
    var f = i.maxRank(_),
      m = l(_, e.range(1, f + 1), 'inEdges'),
      h = l(_, e.range(f - 1, -1, -1), 'outEdges'),
      y = a(_)
    c(_, y)
    for (var p = Number.POSITIVE_INFINITY, v, g = 0, M = 0; M < 4; ++g, ++M) {
      ;(d(g % 2 ? m : h, g % 4 >= 2), (y = i.buildLayerMatrix(_)))
      var w = n(_, y)
      w < p && ((M = 0), (v = e.cloneDeep(y)), (p = w))
    }
    c(_, v)
  }
  function l(_, f, m) {
    return e.map(f, function (h) {
      return o(_, h, m)
    })
  }
  function d(_, f) {
    var m = new t()
    e.forEach(_, function (h) {
      var y = h.graph().root,
        p = r(h, y, m, f)
      ;(e.forEach(p.vs, function (v, g) {
        h.node(v).order = g
      }),
        s(h, m, p.vs))
    })
  }
  function c(_, f) {
    e.forEach(f, function (m) {
      e.forEach(m, function (h, y) {
        _.node(h).order = y
      })
    })
  }
  return $d
}
var Hd, Sg
function AR() {
  if (Sg) return Hd
  Sg = 1
  var e = ge(),
    a = Ne().Graph,
    n = Ce()
  Hd = {
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
  }
  function r(p, v) {
    var g = {}
    function M(w, L) {
      var D = 0,
        Y = 0,
        E = w.length,
        k = e.last(L)
      return (
        e.forEach(L, function (S, O) {
          var z = s(p, S),
            T = z ? p.node(z).order : E
          ;(z || S === k) &&
            (e.forEach(L.slice(Y, O + 1), function (x) {
              e.forEach(p.predecessors(x), function (H) {
                var G = p.node(H),
                  N = G.order
                ;(N < D || T < N) && !(G.dummy && p.node(x).dummy) && t(g, H, x)
              })
            }),
            (Y = O + 1),
            (D = T))
        }),
        L
      )
    }
    return (e.reduce(v, M), g)
  }
  function o(p, v) {
    var g = {}
    function M(L, D, Y, E, k) {
      var S
      e.forEach(e.range(D, Y), function (O) {
        ;((S = L[O]),
          p.node(S).dummy &&
            e.forEach(p.predecessors(S), function (z) {
              var T = p.node(z)
              T.dummy && (T.order < E || T.order > k) && t(g, z, S)
            }))
      })
    }
    function w(L, D) {
      var Y = -1,
        E,
        k = 0
      return (
        e.forEach(D, function (S, O) {
          if (p.node(S).dummy === 'border') {
            var z = p.predecessors(S)
            z.length && ((E = p.node(z[0]).order), M(D, k, O, Y, E), (k = O), (Y = E))
          }
          M(D, k, D.length, E, L.length)
        }),
        D
      )
    }
    return (e.reduce(v, w), g)
  }
  function s(p, v) {
    if (p.node(v).dummy)
      return e.find(p.predecessors(v), function (g) {
        return p.node(g).dummy
      })
  }
  function t(p, v, g) {
    if (v > g) {
      var M = v
      ;((v = g), (g = M))
    }
    var w = p[v]
    ;(w || (p[v] = w = {}), (w[g] = !0))
  }
  function i(p, v, g) {
    if (v > g) {
      var M = v
      ;((v = g), (g = M))
    }
    return e.has(p[v], g)
  }
  function u(p, v, g, M) {
    var w = {},
      L = {},
      D = {}
    return (
      e.forEach(v, function (Y) {
        e.forEach(Y, function (E, k) {
          ;((w[E] = E), (L[E] = E), (D[E] = k))
        })
      }),
      e.forEach(v, function (Y) {
        var E = -1
        e.forEach(Y, function (k) {
          var S = M(k)
          if (S.length) {
            S = e.sortBy(S, function (H) {
              return D[H]
            })
            for (var O = (S.length - 1) / 2, z = Math.floor(O), T = Math.ceil(O); z <= T; ++z) {
              var x = S[z]
              L[k] === k &&
                E < D[x] &&
                !i(g, k, x) &&
                ((L[x] = k), (L[k] = w[k] = w[x]), (E = D[x]))
            }
          }
        })
      }),
      { root: w, align: L }
    )
  }
  function l(p, v, g, M, w) {
    var L = {},
      D = d(p, v, g, w),
      Y = w ? 'borderLeft' : 'borderRight'
    function E(O, z) {
      for (var T = D.nodes(), x = T.pop(), H = {}; x; )
        (H[x] ? O(x) : ((H[x] = !0), T.push(x), (T = T.concat(z(x)))), (x = T.pop()))
    }
    function k(O) {
      L[O] = D.inEdges(O).reduce(function (z, T) {
        return Math.max(z, L[T.v] + D.edge(T))
      }, 0)
    }
    function S(O) {
      var z = D.outEdges(O).reduce(function (x, H) {
          return Math.min(x, L[H.w] - D.edge(H))
        }, Number.POSITIVE_INFINITY),
        T = p.node(O)
      z !== Number.POSITIVE_INFINITY && T.borderType !== Y && (L[O] = Math.max(L[O], z))
    }
    return (
      E(k, D.predecessors.bind(D)),
      E(S, D.successors.bind(D)),
      e.forEach(M, function (O) {
        L[O] = L[g[O]]
      }),
      L
    )
  }
  function d(p, v, g, M) {
    var w = new a(),
      L = p.graph(),
      D = h(L.nodesep, L.edgesep, M)
    return (
      e.forEach(v, function (Y) {
        var E
        e.forEach(Y, function (k) {
          var S = g[k]
          if ((w.setNode(S), E)) {
            var O = g[E],
              z = w.edge(O, S)
            w.setEdge(O, S, Math.max(D(p, k, E), z || 0))
          }
          E = k
        })
      }),
      w
    )
  }
  function c(p, v) {
    return e.minBy(e.values(v), function (g) {
      var M = Number.NEGATIVE_INFINITY,
        w = Number.POSITIVE_INFINITY
      return (
        e.forIn(g, function (L, D) {
          var Y = y(p, D) / 2
          ;((M = Math.max(L + Y, M)), (w = Math.min(L - Y, w)))
        }),
        M - w
      )
    })
  }
  function _(p, v) {
    var g = e.values(v),
      M = e.min(g),
      w = e.max(g)
    e.forEach(['u', 'd'], function (L) {
      e.forEach(['l', 'r'], function (D) {
        var Y = L + D,
          E = p[Y],
          k
        if (E !== v) {
          var S = e.values(E)
          ;((k = D === 'l' ? M - e.min(S) : w - e.max(S)),
            k &&
              (p[Y] = e.mapValues(E, function (O) {
                return O + k
              })))
        }
      })
    })
  }
  function f(p, v) {
    return e.mapValues(p.ul, function (g, M) {
      if (v) return p[v.toLowerCase()][M]
      var w = e.sortBy(e.map(p, M))
      return (w[1] + w[2]) / 2
    })
  }
  function m(p) {
    var v = n.buildLayerMatrix(p),
      g = e.merge(r(p, v), o(p, v)),
      M = {},
      w
    e.forEach(['u', 'd'], function (D) {
      ;((w = D === 'u' ? v : e.values(v).reverse()),
        e.forEach(['l', 'r'], function (Y) {
          Y === 'r' &&
            (w = e.map(w, function (O) {
              return e.values(O).reverse()
            }))
          var E = (D === 'u' ? p.predecessors : p.successors).bind(p),
            k = u(p, w, g, E),
            S = l(p, w, k.root, k.align, Y === 'r')
          ;(Y === 'r' &&
            (S = e.mapValues(S, function (O) {
              return -O
            })),
            (M[D + Y] = S))
        }))
    })
    var L = c(p, M)
    return (_(M, L), f(M, p.graph().align))
  }
  function h(p, v, g) {
    return function (M, w, L) {
      var D = M.node(w),
        Y = M.node(L),
        E = 0,
        k
      if (((E += D.width / 2), e.has(D, 'labelpos')))
        switch (D.labelpos.toLowerCase()) {
          case 'l':
            k = -D.width / 2
            break
          case 'r':
            k = D.width / 2
            break
        }
      if (
        (k && (E += g ? k : -k),
        (k = 0),
        (E += (D.dummy ? v : p) / 2),
        (E += (Y.dummy ? v : p) / 2),
        (E += Y.width / 2),
        e.has(Y, 'labelpos'))
      )
        switch (Y.labelpos.toLowerCase()) {
          case 'l':
            k = Y.width / 2
            break
          case 'r':
            k = -Y.width / 2
            break
        }
      return (k && (E += g ? k : -k), (k = 0), E)
    }
  }
  function y(p, v) {
    return p.node(v).width
  }
  return Hd
}
var jd, Dg
function qR() {
  if (Dg) return jd
  Dg = 1
  var e = ge(),
    a = Ce(),
    n = AR().positionX
  jd = r
  function r(s) {
    ;((s = a.asNonCompoundGraph(s)),
      o(s),
      e.forEach(n(s), function (t, i) {
        s.node(i).x = t
      }))
  }
  function o(s) {
    var t = a.buildLayerMatrix(s),
      i = s.graph().ranksep,
      u = 0
    e.forEach(t, function (l) {
      var d = e.max(
        e.map(l, function (c) {
          return s.node(c).height
        })
      )
      ;(e.forEach(l, function (c) {
        s.node(c).y = u + d / 2
      }),
        (u += d + i))
    })
  }
  return jd
}
var Cd, Eg
function FR() {
  if (Eg) return Cd
  Eg = 1
  var e = ge(),
    a = yR(),
    n = gR(),
    r = bR(),
    o = Ce().normalizeRanks,
    s = YR(),
    t = Ce().removeEmptyRanks,
    i = wR(),
    u = xR(),
    l = LR(),
    d = CR(),
    c = qR(),
    _ = Ce(),
    f = Ne().Graph
  Cd = m
  function m(A, B) {
    var U = B && B.debugTiming ? _.time : _.notime
    U('layout', function () {
      var V = U('  buildLayoutGraph', function () {
        return E(A)
      })
      ;(U('  runLayout', function () {
        h(V, U)
      }),
        U('  updateInputGraph', function () {
          y(A, V)
        }))
    })
  }
  function h(A, B) {
    ;(B('    makeSpaceForEdgeLabels', function () {
      k(A)
    }),
      B('    removeSelfEdges', function () {
        W(A)
      }),
      B('    acyclic', function () {
        a.run(A)
      }),
      B('    nestingGraph.run', function () {
        i.run(A)
      }),
      B('    rank', function () {
        r(_.asNonCompoundGraph(A))
      }),
      B('    injectEdgeLabelProxies', function () {
        S(A)
      }),
      B('    removeEmptyRanks', function () {
        t(A)
      }),
      B('    nestingGraph.cleanup', function () {
        i.cleanup(A)
      }),
      B('    normalizeRanks', function () {
        o(A)
      }),
      B('    assignRankMinMax', function () {
        O(A)
      }),
      B('    removeEdgeLabelProxies', function () {
        z(A)
      }),
      B('    normalize.run', function () {
        n.run(A)
      }),
      B('    parentDummyChains', function () {
        s(A)
      }),
      B('    addBorderSegments', function () {
        u(A)
      }),
      B('    order', function () {
        d(A)
      }),
      B('    insertSelfEdges', function () {
        Z(A)
      }),
      B('    adjustCoordinateSystem', function () {
        l.adjust(A)
      }),
      B('    position', function () {
        c(A)
      }),
      B('    positionSelfEdges', function () {
        K(A)
      }),
      B('    removeBorderNodes', function () {
        N(A)
      }),
      B('    normalize.undo', function () {
        n.undo(A)
      }),
      B('    fixupEdgeLabelCoords', function () {
        H(A)
      }),
      B('    undoCoordinateSystem', function () {
        l.undo(A)
      }),
      B('    translateGraph', function () {
        T(A)
      }),
      B('    assignNodeIntersects', function () {
        x(A)
      }),
      B('    reversePoints', function () {
        G(A)
      }),
      B('    acyclic.undo', function () {
        a.undo(A)
      }))
  }
  function y(A, B) {
    ;(e.forEach(A.nodes(), function (U) {
      var V = A.node(U),
        oe = B.node(U)
      V &&
        ((V.x = oe.x),
        (V.y = oe.y),
        B.children(U).length && ((V.width = oe.width), (V.height = oe.height)))
    }),
      e.forEach(A.edges(), function (U) {
        var V = A.edge(U),
          oe = B.edge(U)
        ;((V.points = oe.points), e.has(oe, 'x') && ((V.x = oe.x), (V.y = oe.y)))
      }),
      (A.graph().width = B.graph().width),
      (A.graph().height = B.graph().height))
  }
  var p = ['nodesep', 'edgesep', 'ranksep', 'marginx', 'marginy'],
    v = { ranksep: 50, edgesep: 20, nodesep: 50, rankdir: 'tb' },
    g = ['acyclicer', 'ranker', 'rankdir', 'align'],
    M = ['width', 'height'],
    w = { width: 0, height: 0 },
    L = ['minlen', 'weight', 'width', 'height', 'labeloffset'],
    D = {
      minlen: 1,
      weight: 1,
      width: 0,
      height: 0,
      labeloffset: 10,
      labelpos: 'r'
    },
    Y = ['labelpos']
  function E(A) {
    var B = new f({ multigraph: !0, compound: !0 }),
      U = se(A.graph())
    return (
      B.setGraph(e.merge({}, v, ne(U, p), e.pick(U, g))),
      e.forEach(A.nodes(), function (V) {
        var oe = se(A.node(V))
        ;(B.setNode(V, e.defaults(ne(oe, M), w)), B.setParent(V, A.parent(V)))
      }),
      e.forEach(A.edges(), function (V) {
        var oe = se(A.edge(V))
        B.setEdge(V, e.merge({}, D, ne(oe, L), e.pick(oe, Y)))
      }),
      B
    )
  }
  function k(A) {
    var B = A.graph()
    ;((B.ranksep /= 2),
      e.forEach(A.edges(), function (U) {
        var V = A.edge(U)
        ;((V.minlen *= 2),
          V.labelpos.toLowerCase() !== 'c' &&
            (B.rankdir === 'TB' || B.rankdir === 'BT'
              ? (V.width += V.labeloffset)
              : (V.height += V.labeloffset)))
      }))
  }
  function S(A) {
    e.forEach(A.edges(), function (B) {
      var U = A.edge(B)
      if (U.width && U.height) {
        var V = A.node(B.v),
          oe = A.node(B.w),
          ce = { rank: (oe.rank - V.rank) / 2 + V.rank, e: B }
        _.addDummyNode(A, 'edge-proxy', ce, '_ep')
      }
    })
  }
  function O(A) {
    var B = 0
    ;(e.forEach(A.nodes(), function (U) {
      var V = A.node(U)
      V.borderTop &&
        ((V.minRank = A.node(V.borderTop).rank),
        (V.maxRank = A.node(V.borderBottom).rank),
        (B = e.max(B, V.maxRank)))
    }),
      (A.graph().maxRank = B))
  }
  function z(A) {
    e.forEach(A.nodes(), function (B) {
      var U = A.node(B)
      U.dummy === 'edge-proxy' && ((A.edge(U.e).labelRank = U.rank), A.removeNode(B))
    })
  }
  function T(A) {
    var B = Number.POSITIVE_INFINITY,
      U = 0,
      V = Number.POSITIVE_INFINITY,
      oe = 0,
      ce = A.graph(),
      le = ce.marginx || 0,
      he = ce.marginy || 0
    function qe(be) {
      var Se = be.x,
        _e = be.y,
        Ue = be.width,
        fe = be.height
      ;((B = Math.min(B, Se - Ue / 2)),
        (U = Math.max(U, Se + Ue / 2)),
        (V = Math.min(V, _e - fe / 2)),
        (oe = Math.max(oe, _e + fe / 2)))
    }
    ;(e.forEach(A.nodes(), function (be) {
      qe(A.node(be))
    }),
      e.forEach(A.edges(), function (be) {
        var Se = A.edge(be)
        e.has(Se, 'x') && qe(Se)
      }),
      (B -= le),
      (V -= he),
      e.forEach(A.nodes(), function (be) {
        var Se = A.node(be)
        ;((Se.x -= B), (Se.y -= V))
      }),
      e.forEach(A.edges(), function (be) {
        var Se = A.edge(be)
        ;(e.forEach(Se.points, function (_e) {
          ;((_e.x -= B), (_e.y -= V))
        }),
          e.has(Se, 'x') && (Se.x -= B),
          e.has(Se, 'y') && (Se.y -= V))
      }),
      (ce.width = U - B + le),
      (ce.height = oe - V + he))
  }
  function x(A) {
    e.forEach(A.edges(), function (B) {
      var U = A.edge(B),
        V = A.node(B.v),
        oe = A.node(B.w),
        ce,
        le
      ;(U.points
        ? ((ce = U.points[0]), (le = U.points[U.points.length - 1]))
        : ((U.points = []), (ce = oe), (le = V)),
        U.points.unshift(_.intersectRect(V, ce)),
        U.points.push(_.intersectRect(oe, le)))
    })
  }
  function H(A) {
    e.forEach(A.edges(), function (B) {
      var U = A.edge(B)
      if (e.has(U, 'x'))
        switch (
          ((U.labelpos === 'l' || U.labelpos === 'r') && (U.width -= U.labeloffset), U.labelpos)
        ) {
          case 'l':
            U.x -= U.width / 2 + U.labeloffset
            break
          case 'r':
            U.x += U.width / 2 + U.labeloffset
            break
        }
    })
  }
  function G(A) {
    e.forEach(A.edges(), function (B) {
      var U = A.edge(B)
      U.reversed && U.points.reverse()
    })
  }
  function N(A) {
    ;(e.forEach(A.nodes(), function (B) {
      if (A.children(B).length) {
        var U = A.node(B),
          V = A.node(U.borderTop),
          oe = A.node(U.borderBottom),
          ce = A.node(e.last(U.borderLeft)),
          le = A.node(e.last(U.borderRight))
        ;((U.width = Math.abs(le.x - ce.x)),
          (U.height = Math.abs(oe.y - V.y)),
          (U.x = ce.x + U.width / 2),
          (U.y = V.y + U.height / 2))
      }
    }),
      e.forEach(A.nodes(), function (B) {
        A.node(B).dummy === 'border' && A.removeNode(B)
      }))
  }
  function W(A) {
    e.forEach(A.edges(), function (B) {
      if (B.v === B.w) {
        var U = A.node(B.v)
        ;(U.selfEdges || (U.selfEdges = []),
          U.selfEdges.push({ e: B, label: A.edge(B) }),
          A.removeEdge(B))
      }
    })
  }
  function Z(A) {
    var B = _.buildLayerMatrix(A)
    e.forEach(B, function (U) {
      var V = 0
      e.forEach(U, function (oe, ce) {
        var le = A.node(oe)
        ;((le.order = ce + V),
          e.forEach(le.selfEdges, function (he) {
            _.addDummyNode(
              A,
              'selfedge',
              {
                width: he.label.width,
                height: he.label.height,
                rank: le.rank,
                order: ce + ++V,
                e: he.e,
                label: he.label
              },
              '_se'
            )
          }),
          delete le.selfEdges)
      })
    })
  }
  function K(A) {
    e.forEach(A.nodes(), function (B) {
      var U = A.node(B)
      if (U.dummy === 'selfedge') {
        var V = A.node(U.e.v),
          oe = V.x + V.width / 2,
          ce = V.y,
          le = U.x - oe,
          he = V.height / 2
        ;(A.setEdge(U.e, U.label),
          A.removeNode(B),
          (U.label.points = [
            { x: oe + (2 * le) / 3, y: ce - he },
            { x: oe + (5 * le) / 6, y: ce - he },
            { x: oe + le, y: ce },
            { x: oe + (5 * le) / 6, y: ce + he },
            { x: oe + (2 * le) / 3, y: ce + he }
          ]),
          (U.label.x = U.x),
          (U.label.y = U.y))
      }
    })
  }
  function ne(A, B) {
    return e.mapValues(e.pick(A, B), Number)
  }
  function se(A) {
    var B = {}
    return (
      e.forEach(A, function (U, V) {
        B[V.toLowerCase()] = U
      }),
      B
    )
  }
  return Cd
}
var Ad, Tg
function RR() {
  if (Tg) return Ad
  Tg = 1
  var e = ge(),
    a = Ce(),
    n = Ne().Graph
  Ad = {
    debugOrdering: r
  }
  function r(o) {
    var s = a.buildLayerMatrix(o),
      t = new n({ compound: !0, multigraph: !0 }).setGraph({})
    return (
      e.forEach(o.nodes(), function (i) {
        ;(t.setNode(i, { label: i }), t.setParent(i, 'layer' + o.node(i).rank))
      }),
      e.forEach(o.edges(), function (i) {
        t.setEdge(i.v, i.w, {}, i.name)
      }),
      e.forEach(s, function (i, u) {
        var l = 'layer' + u
        ;(t.setNode(l, { rank: 'same' }),
          e.reduce(i, function (d, c) {
            return (t.setEdge(d, c, { style: 'invis' }), c)
          }))
      }),
      t
    )
  }
  return Ad
}
var qd, $g
function IR() {
  return ($g || (($g = 1), (qd = '0.8.5')), qd)
}
var Fd, Hg
function PR() {
  return (
    Hg ||
      ((Hg = 1),
      (Fd = {
        graphlib: Ne(),
        layout: FR(),
        debug: RR(),
        util: {
          time: Ce().time,
          notime: Ce().notime
        },
        version: IR()
      })),
    Fd
  )
}
var A1 = PR()
const BR = /* @__PURE__ */ F(A1),
  NR = /* @__PURE__ */ q(
    {
      __proto__: null,
      default: BR
    },
    [A1]
  )
export {
  nt as AI_WORKFLOW_NODE_TYPES,
  b0 as AiAgentNode,
  R0 as AiConditionNode,
  z0 as AiEndNode,
  o0 as AiLlmNode,
  Z0 as AiMemoryNode,
  wD as AiNodeEditPanel,
  f0 as AiPromptNode,
  B0 as AiStartNode,
  E0 as AiToolNode,
  rt as BPMN_NODE_TYPES,
  sI as BaseEdge,
  X4 as BaseNode,
  lI as BezierEdge,
  bL as BpmnEndEvent,
  BL as BpmnExclusiveGateway,
  XL as BpmnInclusiveGateway,
  JL as BpmnParallelGateway,
  jw as BpmnProcessEngine,
  $L as BpmnServiceTask,
  vL as BpmnStartEvent,
  kL as BpmnTask,
  qL as BpmnUserTask,
  cx as Controls,
  tI as CustomNode,
  dI as DataFlowEdge,
  fL as DatabaseNode,
  oL as DiamondNode,
  GD as EdgeEditPanel,
  cI as Flow,
  _I as FlowBackground,
  Aw as FlowCollaborationEngine,
  eI as GroupNode,
  Z4 as InputNode,
  Nw as Minimap,
  CS as NodeEditPanel,
  rI as NodeResizer,
  nI as NodeToolbar,
  Q4 as OutputNode,
  qx as PluginManager,
  H4 as ReactiveGraph,
  iI as SmoothEdge,
  uI as StepEdge,
  v4 as angleToCanvasCoordinateSystem,
  N4 as applyFlowTheme,
  o4 as bfs,
  R4 as bpmnXmlToFlow,
  qa as canvasToScreen,
  ww as captureElement,
  $4 as clearCustomTypes,
  F4 as clearMemoCache,
  Lw as copyBlobToClipboard,
  B4 as createBpmnEngine,
  z4 as createCollaborationEngine,
  b4 as createConnectionValidator,
  Ra as createControlsPlugin,
  go as createCustomTheme,
  W4 as createDefaultPluginSet,
  Ba as createExportPlugin,
  GR as createFlowContext,
  Ia as createGridPlugin,
  Gg as createHistoryPlugin,
  Og as createKeyboardPlugin,
  Na as createLayoutPlugin,
  Fa as createMiniMapPlugin,
  cw as createNodeFromTemplate,
  zg as createNodeGroupPlugin,
  G4 as createPlugin,
  Pa as createSnapPlugin,
  C4 as debounce,
  U4 as defaultPlugins,
  _4 as degToRad,
  uw as detectCycles,
  s4 as dfs,
  KR as distanceBetweenPoints,
  vw as exportFlowData,
  n4 as findAllPaths,
  a4 as findConnectedComponents,
  K4 as flowEmits,
  V4 as flowProps,
  Ig as flowTheme,
  Cw as flowThemeDark,
  O4 as flowThemePresets,
  Tw as flowToBpmnXml,
  j4 as generateId,
  P4 as generateSampleBpmnXml,
  dw as getAllCustomEdges,
  L4 as getAllCustomNodeTemplates,
  S4 as getAllCustomNodes,
  hw as getAllEdgeTemplates,
  p4 as getAngle,
  h4 as getAngleBetweenPoints,
  vc as getBezierPath,
  iw as getBoundingBox,
  lw as getCustomEdge,
  _w as getCustomNode,
  Fg as getCustomNodeTemplate,
  ow as getEdgeCenter,
  Ag as getEdgePath,
  e4 as getEdgePosition,
  T4 as getEdgeTemplate,
  VR as getElementCanvasPosition,
  J1 as getElementPosition,
  yt as getHandlePosition,
  m4 as getLineIntersection,
  l4 as getNodeBounds,
  mw as getNodeChildren,
  pw as getNodeParent,
  u4 as getRectIntersection,
  aw as getSmoothStepPath,
  nw as getStepPath,
  rw as getStraightPath,
  XR as getVector,
  U1 as getVectorMagnitude,
  w4 as hasCustomEdge,
  D4 as hasCustomNode,
  k4 as hasCustomNodeTemplate,
  sw as hasCycle,
  yw as importFlowData,
  fw as isNestedNode,
  y4 as isPointInPolygon,
  i4 as isPointInRect,
  gc as isValidConnection,
  q4 as memo,
  ZR as normalizeVector,
  d4 as pointToLineDistance,
  c4 as pointToPointDistance,
  g4 as pointToRectDistance,
  WR as projectNodePosition,
  UR as provideFlowContext,
  f4 as radToDeg,
  qg as rectIntersect,
  oI as registerAiWorkflowNodes,
  aI as registerBpmnNodes,
  Y4 as registerCustomEdge,
  Te as registerCustomNode,
  x4 as registerCustomNodeTemplate,
  E4 as registerEdgeTemplate,
  $t as screenToCanvas,
  t4 as shortenEndpoint,
  W1 as snapPositionToGrid,
  hc as snapToGrid,
  A4 as throttle,
  r4 as topologicalSort,
  xw as triggerDownload,
  tw as useAlignment,
  X1 as useEdges,
  JR as useFlowContext,
  Q1 as useHistory,
  ew as useKeyboard,
  QR as useNodeDistribution,
  K1 as useNodes,
  Z1 as useSelection,
  V1 as useViewport,
  I4 as validateBpmnXml,
  M4 as viewportIntersectsBounds,
  J4 as withHooks
}
