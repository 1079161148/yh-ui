import { AVAILABLE_COLLECTIONS as E, RECOMMENDED_COLLECTIONS as t } from "./types.mjs";
import { createIconifyComponent as I, getIconData as C, iconExists as L, parseIconName as O } from "./iconify.mjs";
import { COMMON_ICONS as N, DEFAULT_ENABLED_PRESETS as S, PREFIX_ALIAS as c, PRESETS as A, getPreset as f } from "./presets.mjs";
import { ICON_COLLECTIONS as p, getAllPrefixes as x, getCollection as _ } from "./collections.mjs";
import { Icon as a, YhIcon as i } from "./vue/icon.mjs";
export {
  E as AVAILABLE_COLLECTIONS,
  N as COMMON_ICONS,
  S as DEFAULT_ENABLED_PRESETS,
  p as ICON_COLLECTIONS,
  a as Icon,
  c as PREFIX_ALIAS,
  A as PRESETS,
  t as RECOMMENDED_COLLECTIONS,
  i as YhIcon,
  I as createIconifyComponent,
  x as getAllPrefixes,
  _ as getCollection,
  C as getIconData,
  f as getPreset,
  L as iconExists,
  O as parseIconName
};
