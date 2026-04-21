import { AVAILABLE_COLLECTIONS as t, RECOMMENDED_COLLECTIONS as E } from "./types.mjs";
import { createIconifyComponent as I, getIconData as C, iconExists as L, parseIconName as O } from "./iconify.mjs";
import { COMMON_ICONS as n, DEFAULT_ENABLED_PRESETS as N, PREFIX_ALIAS as S, PRESETS as c, getPreset as A } from "./presets.mjs";
import { ICON_COLLECTIONS as m, getAllPrefixes as p, getCollection as x } from "./collections.mjs";
import { Icon as T, YhIcon as a, __test__ as i } from "./vue/icon.mjs";
export {
  t as AVAILABLE_COLLECTIONS,
  n as COMMON_ICONS,
  N as DEFAULT_ENABLED_PRESETS,
  m as ICON_COLLECTIONS,
  T as Icon,
  S as PREFIX_ALIAS,
  c as PRESETS,
  E as RECOMMENDED_COLLECTIONS,
  a as YhIcon,
  i as __test__,
  I as createIconifyComponent,
  p as getAllPrefixes,
  x as getCollection,
  C as getIconData,
  A as getPreset,
  L as iconExists,
  O as parseIconName
};
