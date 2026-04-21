var __defProp = Object.defineProperty;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __glob = (map) => (path) => {
  var fn = map[path];
  if (fn) return fn();
  throw new Error("Module not found in bundle: " + path);
};
var __esm = (fn, res) => function __init() {
  return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};

// public/codesandbox-runtime/components/dayjs.js
import dayjs2 from "dayjs";
var stdin_default2;
var init_dayjs = __esm({
  "public/codesandbox-runtime/components/dayjs.js"() {
    "use strict";
    stdin_default2 = dayjs2;
  }
});

// public/codesandbox-runtime/dayjs-locale/af.js
var af_exports = {};
__export(af_exports, {
  default: () => af_default
});
var locale, af_default;
var init_af = __esm({
  "public/codesandbox-runtime/dayjs-locale/af.js"() {
    "use strict";
    init_dayjs();
    locale = {
      name: "af",
      weekdays: "Sondag_Maandag_Dinsdag_Woensdag_Donderdag_Vrydag_Saterdag".split("_"),
      months: "Januarie_Februarie_Maart_April_Mei_Junie_Julie_Augustus_September_Oktober_November_Desember".split("_"),
      weekStart: 1,
      weekdaysShort: "Son_Maa_Din_Woe_Don_Vry_Sat".split("_"),
      monthsShort: "Jan_Feb_Mrt_Apr_Mei_Jun_Jul_Aug_Sep_Okt_Nov_Des".split("_"),
      weekdaysMin: "So_Ma_Di_Wo_Do_Vr_Sa".split("_"),
      ordinal: function ordinal(n) {
        return n;
      },
      formats: {
        LT: "HH:mm",
        LTS: "HH:mm:ss",
        L: "DD/MM/YYYY",
        LL: "D MMMM YYYY",
        LLL: "D MMMM YYYY HH:mm",
        LLLL: "dddd, D MMMM YYYY HH:mm"
      },
      relativeTime: {
        future: "oor %s",
        past: "%s gelede",
        s: "'n paar sekondes",
        m: "'n minuut",
        mm: "%d minute",
        h: "'n uur",
        hh: "%d ure",
        d: "'n dag",
        dd: "%d dae",
        M: "'n maand",
        MM: "%d maande",
        y: "'n jaar",
        yy: "%d jaar"
      }
    };
    stdin_default2.locale(locale, null, true);
    af_default = locale;
  }
});

// public/codesandbox-runtime/dayjs-locale/am.js
var am_exports = {};
__export(am_exports, {
  default: () => am_default
});
var locale2, am_default;
var init_am = __esm({
  "public/codesandbox-runtime/dayjs-locale/am.js"() {
    "use strict";
    init_dayjs();
    locale2 = {
      name: "am",
      weekdays: "\u12A5\u1211\u12F5_\u1230\u129E_\u121B\u12AD\u1230\u129E_\u1228\u1261\u12D5_\u1210\u1219\u1235_\u12A0\u122D\u1265_\u1245\u12F3\u121C".split("_"),
      weekdaysShort: "\u12A5\u1211\u12F5_\u1230\u129E_\u121B\u12AD\u1230_\u1228\u1261\u12D5_\u1210\u1219\u1235_\u12A0\u122D\u1265_\u1245\u12F3\u121C".split("_"),
      weekdaysMin: "\u12A5\u1211_\u1230\u129E_\u121B\u12AD_\u1228\u1261_\u1210\u1219_\u12A0\u122D_\u1245\u12F3".split("_"),
      months: "\u1303\u1295\u12CB\u122A_\u134C\u1265\u122F\u122A_\u121B\u122D\u127D_\u12A4\u1355\u122A\u120D_\u121C\u12ED_\u1301\u1295_\u1301\u120B\u12ED_\u12A6\u1308\u1235\u1275_\u1234\u1355\u1274\u121D\u1260\u122D_\u12A6\u12AD\u1276\u1260\u122D_\u1296\u126C\u121D\u1260\u122D_\u12F2\u1234\u121D\u1260\u122D".split("_"),
      monthsShort: "\u1303\u1295\u12CB_\u134C\u1265\u122F_\u121B\u122D\u127D_\u12A4\u1355\u122A_\u121C\u12ED_\u1301\u1295_\u1301\u120B\u12ED_\u12A6\u1308\u1235_\u1234\u1355\u1274_\u12A6\u12AD\u1276_\u1296\u126C\u121D_\u12F2\u1234\u121D".split("_"),
      weekStart: 1,
      yearStart: 4,
      relativeTime: {
        future: "\u1260%s",
        past: "%s \u1260\u134A\u1275",
        s: "\u1325\u1242\u1275 \u1230\u12A8\u1295\u12F6\u127D",
        m: "\u12A0\u1295\u12F5 \u12F0\u1242\u1243",
        mm: "%d \u12F0\u1242\u1243\u12CE\u127D",
        h: "\u12A0\u1295\u12F5 \u1230\u12D3\u1275",
        hh: "%d \u1230\u12D3\u1273\u1275",
        d: "\u12A0\u1295\u12F5 \u1240\u1295",
        dd: "%d \u1240\u1293\u1275",
        M: "\u12A0\u1295\u12F5 \u12C8\u122D",
        MM: "%d \u12C8\u122B\u1275",
        y: "\u12A0\u1295\u12F5 \u12D3\u1218\u1275",
        yy: "%d \u12D3\u1218\u1273\u1275"
      },
      formats: {
        LT: "HH:mm",
        LTS: "HH:mm:ss",
        L: "DD/MM/YYYY",
        LL: "MMMM D \u1363 YYYY",
        LLL: "MMMM D \u1363 YYYY HH:mm",
        LLLL: "dddd \u1363 MMMM D \u1363 YYYY HH:mm"
      },
      ordinal: function ordinal2(n) {
        return n + "\u129B";
      }
    };
    stdin_default2.locale(locale2, null, true);
    am_default = locale2;
  }
});

// public/codesandbox-runtime/dayjs-locale/ar-dz.js
var ar_dz_exports = {};
__export(ar_dz_exports, {
  default: () => ar_dz_default
});
var locale3, ar_dz_default;
var init_ar_dz = __esm({
  "public/codesandbox-runtime/dayjs-locale/ar-dz.js"() {
    "use strict";
    init_dayjs();
    locale3 = {
      name: "ar-dz",
      weekdays: "\u0627\u0644\u0623\u062D\u062F_\u0627\u0644\u0625\u062B\u0646\u064A\u0646_\u0627\u0644\u062B\u0644\u0627\u062B\u0627\u0621_\u0627\u0644\u0623\u0631\u0628\u0639\u0627\u0621_\u0627\u0644\u062E\u0645\u064A\u0633_\u0627\u0644\u062C\u0645\u0639\u0629_\u0627\u0644\u0633\u0628\u062A".split("_"),
      months: "\u062C\u0627\u0646\u0641\u064A_\u0641\u064A\u0641\u0631\u064A_\u0645\u0627\u0631\u0633_\u0623\u0641\u0631\u064A\u0644_\u0645\u0627\u064A_\u062C\u0648\u0627\u0646_\u062C\u0648\u064A\u0644\u064A\u0629_\u0623\u0648\u062A_\u0633\u0628\u062A\u0645\u0628\u0631_\u0623\u0643\u062A\u0648\u0628\u0631_\u0646\u0648\u0641\u0645\u0628\u0631_\u062F\u064A\u0633\u0645\u0628\u0631".split("_"),
      weekdaysShort: "\u0627\u062D\u062F_\u0627\u062B\u0646\u064A\u0646_\u062B\u0644\u0627\u062B\u0627\u0621_\u0627\u0631\u0628\u0639\u0627\u0621_\u062E\u0645\u064A\u0633_\u062C\u0645\u0639\u0629_\u0633\u0628\u062A".split("_"),
      monthsShort: "\u062C\u0627\u0646\u0641\u064A_\u0641\u064A\u0641\u0631\u064A_\u0645\u0627\u0631\u0633_\u0623\u0641\u0631\u064A\u0644_\u0645\u0627\u064A_\u062C\u0648\u0627\u0646_\u062C\u0648\u064A\u0644\u064A\u0629_\u0623\u0648\u062A_\u0633\u0628\u062A\u0645\u0628\u0631_\u0623\u0643\u062A\u0648\u0628\u0631_\u0646\u0648\u0641\u0645\u0628\u0631_\u062F\u064A\u0633\u0645\u0628\u0631".split("_"),
      weekdaysMin: "\u0623\u062D_\u0625\u062B_\u062B\u0644\u0627_\u0623\u0631_\u062E\u0645_\u062C\u0645_\u0633\u0628".split("_"),
      ordinal: function ordinal3(n) {
        return n;
      },
      formats: {
        LT: "HH:mm",
        LTS: "HH:mm:ss",
        L: "DD/MM/YYYY",
        LL: "D MMMM YYYY",
        LLL: "D MMMM YYYY HH:mm",
        LLLL: "dddd D MMMM YYYY HH:mm"
      },
      meridiem: function meridiem(hour) {
        return hour > 12 ? "\u0645" : "\u0635";
      },
      relativeTime: {
        future: "\u0641\u064A %s",
        past: "\u0645\u0646\u0630 %s",
        s: "\u062B\u0648\u0627\u0646",
        m: "\u062F\u0642\u064A\u0642\u0629",
        mm: "%d \u062F\u0642\u0627\u0626\u0642",
        h: "\u0633\u0627\u0639\u0629",
        hh: "%d \u0633\u0627\u0639\u0627\u062A",
        d: "\u064A\u0648\u0645",
        dd: "%d \u0623\u064A\u0627\u0645",
        M: "\u0634\u0647\u0631",
        MM: "%d \u0623\u0634\u0647\u0631",
        y: "\u0633\u0646\u0629",
        yy: "%d \u0633\u0646\u0648\u0627\u062A"
      }
    };
    stdin_default2.locale(locale3, null, true);
    ar_dz_default = locale3;
  }
});

// public/codesandbox-runtime/dayjs-locale/ar-iq.js
var ar_iq_exports = {};
__export(ar_iq_exports, {
  default: () => ar_iq_default
});
var locale4, ar_iq_default;
var init_ar_iq = __esm({
  "public/codesandbox-runtime/dayjs-locale/ar-iq.js"() {
    "use strict";
    init_dayjs();
    locale4 = {
      name: "ar-iq",
      weekdays: "\u0627\u0644\u0623\u062D\u062F_\u0627\u0644\u0625\u062B\u0646\u064A\u0646_\u0627\u0644\u062B\u0644\u0627\u062B\u0627\u0621_\u0627\u0644\u0623\u0631\u0628\u0639\u0627\u0621_\u0627\u0644\u062E\u0645\u064A\u0633_\u0627\u0644\u062C\u0645\u0639\u0629_\u0627\u0644\u0633\u0628\u062A".split("_"),
      months: "\u0643\u0627\u0646\u0648\u0646 \u0627\u0644\u062B\u0627\u0646\u064A_\u0634\u0628\u0627\u0637_\u0622\u0630\u0627\u0631_\u0646\u064A\u0633\u0627\u0646_\u0623\u064A\u0627\u0631_\u062D\u0632\u064A\u0631\u0627\u0646_\u062A\u0645\u0648\u0632_\u0622\u0628_\u0623\u064A\u0644\u0648\u0644_\u062A\u0634\u0631\u064A\u0646 \u0627\u0644\u0623\u0648\u0644_ \u062A\u0634\u0631\u064A\u0646 \u0627\u0644\u062B\u0627\u0646\u064A_\u0643\u0627\u0646\u0648\u0646 \u0627\u0644\u0623\u0648\u0644".split("_"),
      weekStart: 1,
      weekdaysShort: "\u0623\u062D\u062F_\u0625\u062B\u0646\u064A\u0646_\u062B\u0644\u0627\u062B\u0627\u0621_\u0623\u0631\u0628\u0639\u0627\u0621_\u062E\u0645\u064A\u0633_\u062C\u0645\u0639\u0629_\u0633\u0628\u062A".split("_"),
      monthsShort: "\u0643\u0627\u0646\u0648\u0646 \u0627\u0644\u062B\u0627\u0646\u064A_\u0634\u0628\u0627\u0637_\u0622\u0630\u0627\u0631_\u0646\u064A\u0633\u0627\u0646_\u0623\u064A\u0627\u0631_\u062D\u0632\u064A\u0631\u0627\u0646_\u062A\u0645\u0648\u0632_\u0622\u0628_\u0623\u064A\u0644\u0648\u0644_\u062A\u0634\u0631\u064A\u0646 \u0627\u0644\u0623\u0648\u0644_ \u062A\u0634\u0631\u064A\u0646 \u0627\u0644\u062B\u0627\u0646\u064A_\u0643\u0627\u0646\u0648\u0646 \u0627\u0644\u0623\u0648\u0644".split("_"),
      weekdaysMin: "\u062D_\u0646_\u062B_\u0631_\u062E_\u062C_\u0633".split("_"),
      ordinal: function ordinal4(n) {
        return n;
      },
      formats: {
        LT: "HH:mm",
        LTS: "HH:mm:ss",
        L: "DD/MM/YYYY",
        LL: "D MMMM YYYY",
        LLL: "D MMMM YYYY HH:mm",
        LLLL: "dddd D MMMM YYYY HH:mm"
      },
      meridiem: function meridiem2(hour) {
        return hour > 12 ? "\u0645" : "\u0635";
      },
      relativeTime: {
        future: "\u0641\u064A %s",
        past: "\u0645\u0646\u0630 %s",
        s: "\u062B\u0648\u0627\u0646",
        m: "\u062F\u0642\u064A\u0642\u0629",
        mm: "%d \u062F\u0642\u0627\u0626\u0642",
        h: "\u0633\u0627\u0639\u0629",
        hh: "%d \u0633\u0627\u0639\u0627\u062A",
        d: "\u064A\u0648\u0645",
        dd: "%d \u0623\u064A\u0627\u0645",
        M: "\u0634\u0647\u0631",
        MM: "%d \u0623\u0634\u0647\u0631",
        y: "\u0633\u0646\u0629",
        yy: "%d \u0633\u0646\u0648\u0627\u062A"
      }
    };
    stdin_default2.locale(locale4, null, true);
    ar_iq_default = locale4;
  }
});

// public/codesandbox-runtime/dayjs-locale/ar-kw.js
var ar_kw_exports = {};
__export(ar_kw_exports, {
  default: () => ar_kw_default
});
var locale5, ar_kw_default;
var init_ar_kw = __esm({
  "public/codesandbox-runtime/dayjs-locale/ar-kw.js"() {
    "use strict";
    init_dayjs();
    locale5 = {
      name: "ar-kw",
      weekdays: "\u0627\u0644\u0623\u062D\u062F_\u0627\u0644\u0625\u062B\u0646\u064A\u0646_\u0627\u0644\u062B\u0644\u0627\u062B\u0627\u0621_\u0627\u0644\u0623\u0631\u0628\u0639\u0627\u0621_\u0627\u0644\u062E\u0645\u064A\u0633_\u0627\u0644\u062C\u0645\u0639\u0629_\u0627\u0644\u0633\u0628\u062A".split("_"),
      months: "\u064A\u0646\u0627\u064A\u0631_\u0641\u0628\u0631\u0627\u064A\u0631_\u0645\u0627\u0631\u0633_\u0623\u0628\u0631\u064A\u0644_\u0645\u0627\u064A_\u064A\u0648\u0646\u064A\u0648_\u064A\u0648\u0644\u064A\u0648\u0632_\u063A\u0634\u062A_\u0634\u062A\u0646\u0628\u0631_\u0623\u0643\u062A\u0648\u0628\u0631_\u0646\u0648\u0646\u0628\u0631_\u062F\u062C\u0646\u0628\u0631".split("_"),
      weekdaysShort: "\u0627\u062D\u062F_\u0627\u062B\u0646\u064A\u0646_\u062B\u0644\u0627\u062B\u0627\u0621_\u0627\u0631\u0628\u0639\u0627\u0621_\u062E\u0645\u064A\u0633_\u062C\u0645\u0639\u0629_\u0633\u0628\u062A".split("_"),
      monthsShort: "\u064A\u0646\u0627\u064A\u0631_\u0641\u0628\u0631\u0627\u064A\u0631_\u0645\u0627\u0631\u0633_\u0623\u0628\u0631\u064A\u0644_\u0645\u0627\u064A_\u064A\u0648\u0646\u064A\u0648_\u064A\u0648\u0644\u064A\u0648\u0632_\u063A\u0634\u062A_\u0634\u062A\u0646\u0628\u0631_\u0623\u0643\u062A\u0648\u0628\u0631_\u0646\u0648\u0646\u0628\u0631_\u062F\u062C\u0646\u0628\u0631".split("_"),
      weekdaysMin: "\u062D_\u0646_\u062B_\u0631_\u062E_\u062C_\u0633".split("_"),
      ordinal: function ordinal5(n) {
        return n;
      },
      formats: {
        LT: "HH:mm",
        LTS: "HH:mm:ss",
        L: "DD/MM/YYYY",
        LL: "D MMMM YYYY",
        LLL: "D MMMM YYYY HH:mm",
        LLLL: "dddd D MMMM YYYY HH:mm"
      },
      meridiem: function meridiem3(hour) {
        return hour > 12 ? "\u0645" : "\u0635";
      },
      relativeTime: {
        future: "\u0641\u064A %s",
        past: "\u0645\u0646\u0630 %s",
        s: "\u062B\u0648\u0627\u0646",
        m: "\u062F\u0642\u064A\u0642\u0629",
        mm: "%d \u062F\u0642\u0627\u0626\u0642",
        h: "\u0633\u0627\u0639\u0629",
        hh: "%d \u0633\u0627\u0639\u0627\u062A",
        d: "\u064A\u0648\u0645",
        dd: "%d \u0623\u064A\u0627\u0645",
        M: "\u0634\u0647\u0631",
        MM: "%d \u0623\u0634\u0647\u0631",
        y: "\u0633\u0646\u0629",
        yy: "%d \u0633\u0646\u0648\u0627\u062A"
      }
    };
    stdin_default2.locale(locale5, null, true);
    ar_kw_default = locale5;
  }
});

// public/codesandbox-runtime/dayjs-locale/ar-ly.js
var ar_ly_exports = {};
__export(ar_ly_exports, {
  default: () => ar_ly_default
});
var locale6, ar_ly_default;
var init_ar_ly = __esm({
  "public/codesandbox-runtime/dayjs-locale/ar-ly.js"() {
    "use strict";
    init_dayjs();
    locale6 = {
      name: "ar-ly",
      weekdays: "\u0627\u0644\u0623\u062D\u062F_\u0627\u0644\u0625\u062B\u0646\u064A\u0646_\u0627\u0644\u062B\u0644\u0627\u062B\u0627\u0621_\u0627\u0644\u0623\u0631\u0628\u0639\u0627\u0621_\u0627\u0644\u062E\u0645\u064A\u0633_\u0627\u0644\u062C\u0645\u0639\u0629_\u0627\u0644\u0633\u0628\u062A".split("_"),
      months: "\u064A\u0646\u0627\u064A\u0631_\u0641\u0628\u0631\u0627\u064A\u0631_\u0645\u0627\u0631\u0633_\u0623\u0628\u0631\u064A\u0644_\u0645\u0627\u064A\u0648_\u064A\u0648\u0646\u064A\u0648_\u064A\u0648\u0644\u064A\u0648_\u0623\u063A\u0633\u0637\u0633_\u0633\u0628\u062A\u0645\u0628\u0631_\u0623\u0643\u062A\u0648\u0628\u0631_\u0646\u0648\u0641\u0645\u0628\u0631_\u062F\u064A\u0633\u0645\u0628\u0631".split("_"),
      weekStart: 6,
      weekdaysShort: "\u0623\u062D\u062F_\u0625\u062B\u0646\u064A\u0646_\u062B\u0644\u0627\u062B\u0627\u0621_\u0623\u0631\u0628\u0639\u0627\u0621_\u062E\u0645\u064A\u0633_\u062C\u0645\u0639\u0629_\u0633\u0628\u062A".split("_"),
      monthsShort: "\u064A\u0646\u0627\u064A\u0631_\u0641\u0628\u0631\u0627\u064A\u0631_\u0645\u0627\u0631\u0633_\u0623\u0628\u0631\u064A\u0644_\u0645\u0627\u064A\u0648_\u064A\u0648\u0646\u064A\u0648_\u064A\u0648\u0644\u064A\u0648_\u0623\u063A\u0633\u0637\u0633_\u0633\u0628\u062A\u0645\u0628\u0631_\u0623\u0643\u062A\u0648\u0628\u0631_\u0646\u0648\u0641\u0645\u0628\u0631_\u062F\u064A\u0633\u0645\u0628\u0631".split("_"),
      weekdaysMin: "\u062D_\u0646_\u062B_\u0631_\u062E_\u062C_\u0633".split("_"),
      ordinal: function ordinal6(n) {
        return n;
      },
      meridiem: function meridiem4(hour) {
        return hour > 12 ? "\u0645" : "\u0635";
      },
      formats: {
        LT: "HH:mm",
        LTS: "HH:mm:ss",
        L: "D/\u200FM/\u200FYYYY",
        LL: "D MMMM YYYY",
        LLL: "D MMMM YYYY HH:mm",
        LLLL: "dddd D MMMM YYYY HH:mm"
      }
    };
    stdin_default2.locale(locale6, null, true);
    ar_ly_default = locale6;
  }
});

// public/codesandbox-runtime/dayjs-locale/ar-ma.js
var ar_ma_exports = {};
__export(ar_ma_exports, {
  default: () => ar_ma_default
});
var locale7, ar_ma_default;
var init_ar_ma = __esm({
  "public/codesandbox-runtime/dayjs-locale/ar-ma.js"() {
    "use strict";
    init_dayjs();
    locale7 = {
      name: "ar-ma",
      weekdays: "\u0627\u0644\u0623\u062D\u062F_\u0627\u0644\u0625\u062B\u0646\u064A\u0646_\u0627\u0644\u062B\u0644\u0627\u062B\u0627\u0621_\u0627\u0644\u0623\u0631\u0628\u0639\u0627\u0621_\u0627\u0644\u062E\u0645\u064A\u0633_\u0627\u0644\u062C\u0645\u0639\u0629_\u0627\u0644\u0633\u0628\u062A".split("_"),
      months: "\u064A\u0646\u0627\u064A\u0631_\u0641\u0628\u0631\u0627\u064A\u0631_\u0645\u0627\u0631\u0633_\u0623\u0628\u0631\u064A\u0644_\u0645\u0627\u064A_\u064A\u0648\u0646\u064A\u0648_\u064A\u0648\u0644\u064A\u0648\u0632_\u063A\u0634\u062A_\u0634\u062A\u0646\u0628\u0631_\u0623\u0643\u062A\u0648\u0628\u0631_\u0646\u0648\u0646\u0628\u0631_\u062F\u062C\u0646\u0628\u0631".split("_"),
      weekStart: 6,
      weekdaysShort: "\u0627\u062D\u062F_\u0625\u062B\u0646\u064A\u0646_\u062B\u0644\u0627\u062B\u0627\u0621_\u0627\u0631\u0628\u0639\u0627\u0621_\u062E\u0645\u064A\u0633_\u062C\u0645\u0639\u0629_\u0633\u0628\u062A".split("_"),
      monthsShort: "\u064A\u0646\u0627\u064A\u0631_\u0641\u0628\u0631\u0627\u064A\u0631_\u0645\u0627\u0631\u0633_\u0623\u0628\u0631\u064A\u0644_\u0645\u0627\u064A_\u064A\u0648\u0646\u064A\u0648_\u064A\u0648\u0644\u064A\u0648\u0632_\u063A\u0634\u062A_\u0634\u062A\u0646\u0628\u0631_\u0623\u0643\u062A\u0648\u0628\u0631_\u0646\u0648\u0646\u0628\u0631_\u062F\u062C\u0646\u0628\u0631".split("_"),
      weekdaysMin: "\u062D_\u0646_\u062B_\u0631_\u062E_\u062C_\u0633".split("_"),
      ordinal: function ordinal7(n) {
        return n;
      },
      formats: {
        LT: "HH:mm",
        LTS: "HH:mm:ss",
        L: "DD/MM/YYYY",
        LL: "D MMMM YYYY",
        LLL: "D MMMM YYYY HH:mm",
        LLLL: "dddd D MMMM YYYY HH:mm"
      },
      meridiem: function meridiem5(hour) {
        return hour > 12 ? "\u0645" : "\u0635";
      },
      relativeTime: {
        future: "\u0641\u064A %s",
        past: "\u0645\u0646\u0630 %s",
        s: "\u062B\u0648\u0627\u0646",
        m: "\u062F\u0642\u064A\u0642\u0629",
        mm: "%d \u062F\u0642\u0627\u0626\u0642",
        h: "\u0633\u0627\u0639\u0629",
        hh: "%d \u0633\u0627\u0639\u0627\u062A",
        d: "\u064A\u0648\u0645",
        dd: "%d \u0623\u064A\u0627\u0645",
        M: "\u0634\u0647\u0631",
        MM: "%d \u0623\u0634\u0647\u0631",
        y: "\u0633\u0646\u0629",
        yy: "%d \u0633\u0646\u0648\u0627\u062A"
      }
    };
    stdin_default2.locale(locale7, null, true);
    ar_ma_default = locale7;
  }
});

// public/codesandbox-runtime/dayjs-locale/ar-sa.js
var ar_sa_exports = {};
__export(ar_sa_exports, {
  default: () => ar_sa_default
});
var locale8, ar_sa_default;
var init_ar_sa = __esm({
  "public/codesandbox-runtime/dayjs-locale/ar-sa.js"() {
    "use strict";
    init_dayjs();
    locale8 = {
      name: "ar-sa",
      weekdays: "\u0627\u0644\u0623\u062D\u062F_\u0627\u0644\u0625\u062B\u0646\u064A\u0646_\u0627\u0644\u062B\u0644\u0627\u062B\u0627\u0621_\u0627\u0644\u0623\u0631\u0628\u0639\u0627\u0621_\u0627\u0644\u062E\u0645\u064A\u0633_\u0627\u0644\u062C\u0645\u0639\u0629_\u0627\u0644\u0633\u0628\u062A".split("_"),
      months: "\u064A\u0646\u0627\u064A\u0631_\u0641\u0628\u0631\u0627\u064A\u0631_\u0645\u0627\u0631\u0633_\u0623\u0628\u0631\u064A\u0644_\u0645\u0627\u064A\u0648_\u064A\u0648\u0646\u064A\u0648_\u064A\u0648\u0644\u064A\u0648_\u0623\u063A\u0633\u0637\u0633_\u0633\u0628\u062A\u0645\u0628\u0631_\u0623\u0643\u062A\u0648\u0628\u0631_\u0646\u0648\u0641\u0645\u0628\u0631_\u062F\u064A\u0633\u0645\u0628\u0631".split("_"),
      weekdaysShort: "\u0623\u062D\u062F_\u0625\u062B\u0646\u064A\u0646_\u062B\u0644\u0627\u062B\u0627\u0621_\u0623\u0631\u0628\u0639\u0627\u0621_\u062E\u0645\u064A\u0633_\u062C\u0645\u0639\u0629_\u0633\u0628\u062A".split("_"),
      monthsShort: "\u064A\u0646\u0627\u064A\u0631_\u0641\u0628\u0631\u0627\u064A\u0631_\u0645\u0627\u0631\u0633_\u0623\u0628\u0631\u064A\u0644_\u0645\u0627\u064A\u0648_\u064A\u0648\u0646\u064A\u0648_\u064A\u0648\u0644\u064A\u0648_\u0623\u063A\u0633\u0637\u0633_\u0633\u0628\u062A\u0645\u0628\u0631_\u0623\u0643\u062A\u0648\u0628\u0631_\u0646\u0648\u0641\u0645\u0628\u0631_\u062F\u064A\u0633\u0645\u0628\u0631".split("_"),
      weekdaysMin: "\u062D_\u0646_\u062B_\u0631_\u062E_\u062C_\u0633".split("_"),
      ordinal: function ordinal8(n) {
        return n;
      },
      formats: {
        LT: "HH:mm",
        LTS: "HH:mm:ss",
        L: "DD/MM/YYYY",
        LL: "D MMMM YYYY",
        LLL: "D MMMM YYYY HH:mm",
        LLLL: "dddd D MMMM YYYY HH:mm"
      },
      meridiem: function meridiem6(hour) {
        return hour > 12 ? "\u0645" : "\u0635";
      },
      relativeTime: {
        future: "\u0641\u064A %s",
        past: "\u0645\u0646\u0630 %s",
        s: "\u062B\u0648\u0627\u0646",
        m: "\u062F\u0642\u064A\u0642\u0629",
        mm: "%d \u062F\u0642\u0627\u0626\u0642",
        h: "\u0633\u0627\u0639\u0629",
        hh: "%d \u0633\u0627\u0639\u0627\u062A",
        d: "\u064A\u0648\u0645",
        dd: "%d \u0623\u064A\u0627\u0645",
        M: "\u0634\u0647\u0631",
        MM: "%d \u0623\u0634\u0647\u0631",
        y: "\u0633\u0646\u0629",
        yy: "%d \u0633\u0646\u0648\u0627\u062A"
      }
    };
    stdin_default2.locale(locale8, null, true);
    ar_sa_default = locale8;
  }
});

// public/codesandbox-runtime/dayjs-locale/ar-tn.js
var ar_tn_exports = {};
__export(ar_tn_exports, {
  default: () => ar_tn_default
});
var locale9, ar_tn_default;
var init_ar_tn = __esm({
  "public/codesandbox-runtime/dayjs-locale/ar-tn.js"() {
    "use strict";
    init_dayjs();
    locale9 = {
      name: "ar-tn",
      weekdays: "\u0627\u0644\u0623\u062D\u062F_\u0627\u0644\u0625\u062B\u0646\u064A\u0646_\u0627\u0644\u062B\u0644\u0627\u062B\u0627\u0621_\u0627\u0644\u0623\u0631\u0628\u0639\u0627\u0621_\u0627\u0644\u062E\u0645\u064A\u0633_\u0627\u0644\u062C\u0645\u0639\u0629_\u0627\u0644\u0633\u0628\u062A".split("_"),
      months: "\u062C\u0627\u0646\u0641\u064A_\u0641\u064A\u0641\u0631\u064A_\u0645\u0627\u0631\u0633_\u0623\u0641\u0631\u064A\u0644_\u0645\u0627\u064A_\u062C\u0648\u0627\u0646_\u062C\u0648\u064A\u0644\u064A\u0629_\u0623\u0648\u062A_\u0633\u0628\u062A\u0645\u0628\u0631_\u0623\u0643\u062A\u0648\u0628\u0631_\u0646\u0648\u0641\u0645\u0628\u0631_\u062F\u064A\u0633\u0645\u0628\u0631".split("_"),
      weekStart: 1,
      weekdaysShort: "\u0623\u062D\u062F_\u0625\u062B\u0646\u064A\u0646_\u062B\u0644\u0627\u062B\u0627\u0621_\u0623\u0631\u0628\u0639\u0627\u0621_\u062E\u0645\u064A\u0633_\u062C\u0645\u0639\u0629_\u0633\u0628\u062A".split("_"),
      monthsShort: "\u062C\u0627\u0646\u0641\u064A_\u0641\u064A\u0641\u0631\u064A_\u0645\u0627\u0631\u0633_\u0623\u0641\u0631\u064A\u0644_\u0645\u0627\u064A_\u062C\u0648\u0627\u0646_\u062C\u0648\u064A\u0644\u064A\u0629_\u0623\u0648\u062A_\u0633\u0628\u062A\u0645\u0628\u0631_\u0623\u0643\u062A\u0648\u0628\u0631_\u0646\u0648\u0641\u0645\u0628\u0631_\u062F\u064A\u0633\u0645\u0628\u0631".split("_"),
      weekdaysMin: "\u062D_\u0646_\u062B_\u0631_\u062E_\u062C_\u0633".split("_"),
      ordinal: function ordinal9(n) {
        return n;
      },
      formats: {
        LT: "HH:mm",
        LTS: "HH:mm:ss",
        L: "DD/MM/YYYY",
        LL: "D MMMM YYYY",
        LLL: "D MMMM YYYY HH:mm",
        LLLL: "dddd D MMMM YYYY HH:mm"
      },
      meridiem: function meridiem7(hour) {
        return hour > 12 ? "\u0645" : "\u0635";
      },
      relativeTime: {
        future: "\u0641\u064A %s",
        past: "\u0645\u0646\u0630 %s",
        s: "\u062B\u0648\u0627\u0646",
        m: "\u062F\u0642\u064A\u0642\u0629",
        mm: "%d \u062F\u0642\u0627\u0626\u0642",
        h: "\u0633\u0627\u0639\u0629",
        hh: "%d \u0633\u0627\u0639\u0627\u062A",
        d: "\u064A\u0648\u0645",
        dd: "%d \u0623\u064A\u0627\u0645",
        M: "\u0634\u0647\u0631",
        MM: "%d \u0623\u0634\u0647\u0631",
        y: "\u0633\u0646\u0629",
        yy: "%d \u0633\u0646\u0648\u0627\u062A"
      }
    };
    stdin_default2.locale(locale9, null, true);
    ar_tn_default = locale9;
  }
});

// public/codesandbox-runtime/dayjs-locale/ar.js
var ar_exports = {};
__export(ar_exports, {
  default: () => ar_default
});
var months, symbolMap, numberMap, fromArabNumeralsRegex, fromArabComaRegex, toArabNumeralsRegex, toArabComaRegex, locale10, ar_default;
var init_ar = __esm({
  "public/codesandbox-runtime/dayjs-locale/ar.js"() {
    "use strict";
    init_dayjs();
    months = "\u064A\u0646\u0627\u064A\u0631_\u0641\u0628\u0631\u0627\u064A\u0631_\u0645\u0627\u0631\u0633_\u0623\u0628\u0631\u064A\u0644_\u0645\u0627\u064A\u0648_\u064A\u0648\u0646\u064A\u0648_\u064A\u0648\u0644\u064A\u0648_\u0623\u063A\u0633\u0637\u0633_\u0633\u0628\u062A\u0645\u0628\u0631_\u0623\u0643\u062A\u0648\u0628\u0631_\u0646\u0648\u0641\u0645\u0628\u0631_\u062F\u064A\u0633\u0645\u0628\u0631".split("_");
    symbolMap = {
      1: "\u0661",
      2: "\u0662",
      3: "\u0663",
      4: "\u0664",
      5: "\u0665",
      6: "\u0666",
      7: "\u0667",
      8: "\u0668",
      9: "\u0669",
      0: "\u0660"
    };
    numberMap = {
      "\u0661": "1",
      "\u0662": "2",
      "\u0663": "3",
      "\u0664": "4",
      "\u0665": "5",
      "\u0666": "6",
      "\u0667": "7",
      "\u0668": "8",
      "\u0669": "9",
      "\u0660": "0"
    };
    fromArabNumeralsRegex = /[١٢٣٤٥٦٧٨٩٠]/g;
    fromArabComaRegex = /،/g;
    toArabNumeralsRegex = /\d/g;
    toArabComaRegex = /,/g;
    locale10 = {
      name: "ar",
      weekdays: "\u0627\u0644\u0623\u062D\u062F_\u0627\u0644\u0625\u062B\u0646\u064A\u0646_\u0627\u0644\u062B\u0644\u0627\u062B\u0627\u0621_\u0627\u0644\u0623\u0631\u0628\u0639\u0627\u0621_\u0627\u0644\u062E\u0645\u064A\u0633_\u0627\u0644\u062C\u0645\u0639\u0629_\u0627\u0644\u0633\u0628\u062A".split("_"),
      weekdaysShort: "\u0623\u062D\u062F_\u0625\u062B\u0646\u064A\u0646_\u062B\u0644\u0627\u062B\u0627\u0621_\u0623\u0631\u0628\u0639\u0627\u0621_\u062E\u0645\u064A\u0633_\u062C\u0645\u0639\u0629_\u0633\u0628\u062A".split("_"),
      weekdaysMin: "\u062D_\u0646_\u062B_\u0631_\u062E_\u062C_\u0633".split("_"),
      months,
      monthsShort: months,
      weekStart: 6,
      meridiem: function meridiem8(hour) {
        return hour > 12 ? "\u0645" : "\u0635";
      },
      relativeTime: {
        future: "\u0628\u0639\u062F %s",
        past: "\u0645\u0646\u0630 %s",
        s: "\u062B\u0627\u0646\u064A\u0629 \u0648\u0627\u062D\u062F\u0629",
        m: "\u062F\u0642\u064A\u0642\u0629 \u0648\u0627\u062D\u062F\u0629",
        mm: "%d \u062F\u0642\u0627\u0626\u0642",
        h: "\u0633\u0627\u0639\u0629 \u0648\u0627\u062D\u062F\u0629",
        hh: "%d \u0633\u0627\u0639\u0627\u062A",
        d: "\u064A\u0648\u0645 \u0648\u0627\u062D\u062F",
        dd: "%d \u0623\u064A\u0627\u0645",
        M: "\u0634\u0647\u0631 \u0648\u0627\u062D\u062F",
        MM: "%d \u0623\u0634\u0647\u0631",
        y: "\u0639\u0627\u0645 \u0648\u0627\u062D\u062F",
        yy: "%d \u0623\u0639\u0648\u0627\u0645"
      },
      preparse: function preparse(string) {
        return string.replace(fromArabNumeralsRegex, function(match) {
          return numberMap[match];
        }).replace(fromArabComaRegex, ",");
      },
      postformat: function postformat(string) {
        return string.replace(toArabNumeralsRegex, function(match) {
          return symbolMap[match];
        }).replace(toArabComaRegex, "\u060C");
      },
      ordinal: function ordinal10(n) {
        return n;
      },
      formats: {
        LT: "HH:mm",
        LTS: "HH:mm:ss",
        L: "D/\u200FM/\u200FYYYY",
        LL: "D MMMM YYYY",
        LLL: "D MMMM YYYY HH:mm",
        LLLL: "dddd D MMMM YYYY HH:mm"
      }
    };
    stdin_default2.locale(locale10, null, true);
    ar_default = locale10;
  }
});

// public/codesandbox-runtime/dayjs-locale/az.js
var az_exports = {};
__export(az_exports, {
  default: () => az_default
});
var locale11, az_default;
var init_az = __esm({
  "public/codesandbox-runtime/dayjs-locale/az.js"() {
    "use strict";
    init_dayjs();
    locale11 = {
      name: "az",
      weekdays: "Bazar_Bazar ert\u0259si_\xC7\u0259r\u015F\u0259nb\u0259 ax\u015Fam\u0131_\xC7\u0259r\u015F\u0259nb\u0259_C\xFCm\u0259 ax\u015Fam\u0131_C\xFCm\u0259_\u015E\u0259nb\u0259".split("_"),
      weekdaysShort: "Baz_BzE_\xC7Ax_\xC7\u0259r_CAx_C\xFCm_\u015E\u0259n".split("_"),
      weekdaysMin: "Bz_BE_\xC7A_\xC7\u0259_CA_C\xFC_\u015E\u0259".split("_"),
      months: "yanvar_fevral_mart_aprel_may_iyun_iyul_avqust_sentyabr_oktyabr_noyabr_dekabr".split("_"),
      monthsShort: "yan_fev_mar_apr_may_iyn_iyl_avq_sen_okt_noy_dek".split("_"),
      weekStart: 1,
      formats: {
        LT: "H:mm",
        LTS: "H:mm:ss",
        L: "DD.MM.YYYY",
        LL: "D MMMM YYYY \u0433.",
        LLL: "D MMMM YYYY \u0433., H:mm",
        LLLL: "dddd, D MMMM YYYY \u0433., H:mm"
      },
      relativeTime: {
        future: "%s sonra",
        past: "%s \u0259vv\u0259l",
        s: "bir ne\xE7\u0259 saniy\u0259",
        m: "bir d\u0259qiq\u0259",
        mm: "%d d\u0259qiq\u0259",
        h: "bir saat",
        hh: "%d saat",
        d: "bir g\xFCn",
        dd: "%d g\xFCn",
        M: "bir ay",
        MM: "%d ay",
        y: "bir il",
        yy: "%d il"
      },
      ordinal: function ordinal11(n) {
        return n;
      }
    };
    stdin_default2.locale(locale11, null, true);
    az_default = locale11;
  }
});

// public/codesandbox-runtime/dayjs-locale/be.js
var be_exports = {};
__export(be_exports, {
  default: () => be_default
});
function plural(word, num) {
  var forms = word.split("_");
  return num % 10 === 1 && num % 100 !== 11 ? forms[0] : num % 10 >= 2 && num % 10 <= 4 && (num % 100 < 10 || num % 100 >= 20) ? forms[1] : forms[2];
}
function relativeTimeWithPlural(number, withoutSuffix, key) {
  var format = {
    ss: withoutSuffix ? "\u0441\u0435\u043A\u0443\u043D\u0434\u0430_\u0441\u0435\u043A\u0443\u043D\u0434\u044B_\u0441\u0435\u043A\u0443\u043D\u0434" : "\u0441\u0435\u043A\u0443\u043D\u0434\u0443_\u0441\u0435\u043A\u0443\u043D\u0434\u044B_\u0441\u0435\u043A\u0443\u043D\u0434",
    mm: withoutSuffix ? "\u0445\u0432\u0456\u043B\u0456\u043D\u0430_\u0445\u0432\u0456\u043B\u0456\u043D\u044B_\u0445\u0432\u0456\u043B\u0456\u043D" : "\u0445\u0432\u0456\u043B\u0456\u043D\u0443_\u0445\u0432\u0456\u043B\u0456\u043D\u044B_\u0445\u0432\u0456\u043B\u0456\u043D",
    hh: withoutSuffix ? "\u0433\u0430\u0434\u0437\u0456\u043D\u0430_\u0433\u0430\u0434\u0437\u0456\u043D\u044B_\u0433\u0430\u0434\u0437\u0456\u043D" : "\u0433\u0430\u0434\u0437\u0456\u043D\u0443_\u0433\u0430\u0434\u0437\u0456\u043D\u044B_\u0433\u0430\u0434\u0437\u0456\u043D",
    dd: "\u0434\u0437\u0435\u043D\u044C_\u0434\u043D\u0456_\u0434\u0437\u0451\u043D",
    MM: "\u043C\u0435\u0441\u044F\u0446_\u043C\u0435\u0441\u044F\u0446\u044B_\u043C\u0435\u0441\u044F\u0446\u0430\u045E",
    yy: "\u0433\u043E\u0434_\u0433\u0430\u0434\u044B_\u0433\u0430\u0434\u043E\u045E"
  };
  if (key === "m") {
    return withoutSuffix ? "\u0445\u0432\u0456\u043B\u0456\u043D\u0430" : "\u0445\u0432\u0456\u043B\u0456\u043D\u0443";
  } else if (key === "h") {
    return withoutSuffix ? "\u0433\u0430\u0434\u0437\u0456\u043D\u0430" : "\u0433\u0430\u0434\u0437\u0456\u043D\u0443";
  }
  return number + " " + plural(format[key], +number);
}
var monthFormat, monthStandalone, monthShortFormat, monthShortStandalone, MONTHS_IN_FORMAT, months2, monthsShort, locale12, be_default;
var init_be = __esm({
  "public/codesandbox-runtime/dayjs-locale/be.js"() {
    "use strict";
    init_dayjs();
    monthFormat = "\u0441\u0442\u0443\u0434\u0437\u0435\u043D\u044F_\u043B\u044E\u0442\u0430\u0433\u0430_\u0441\u0430\u043A\u0430\u0432\u0456\u043A\u0430_\u043A\u0440\u0430\u0441\u0430\u0432\u0456\u043A\u0430_\u0442\u0440\u0430\u045E\u043D\u044F_\u0447\u044D\u0440\u0432\u0435\u043D\u044F_\u043B\u0456\u043F\u0435\u043D\u044F_\u0436\u043D\u0456\u045E\u043D\u044F_\u0432\u0435\u0440\u0430\u0441\u043D\u044F_\u043A\u0430\u0441\u0442\u0440\u044B\u0447\u043D\u0456\u043A\u0430_\u043B\u0456\u0441\u0442\u0430\u043F\u0430\u0434\u0430_\u0441\u043D\u0435\u0436\u043D\u044F".split("_");
    monthStandalone = "\u0441\u0442\u0443\u0434\u0437\u0435\u043D\u044C_\u043B\u044E\u0442\u044B\u0439_\u0441\u0430\u043A\u0430\u0432\u0456\u043A_\u043A\u0440\u0430\u0441\u0430\u0432\u0456\u043A_\u0442\u0440\u0430\u0432\u0435\u043D\u044C_\u0447\u044D\u0440\u0432\u0435\u043D\u044C_\u043B\u0456\u043F\u0435\u043D\u044C_\u0436\u043D\u0456\u0432\u0435\u043D\u044C_\u0432\u0435\u0440\u0430\u0441\u0435\u043D\u044C_\u043A\u0430\u0441\u0442\u0440\u044B\u0447\u043D\u0456\u043A_\u043B\u0456\u0441\u0442\u0430\u043F\u0430\u0434_\u0441\u043D\u0435\u0436\u0430\u043D\u044C".split("_");
    monthShortFormat = "\u0441\u0442\u0443\u0434_\u043B\u044E\u0442_\u0441\u0430\u043A_\u043A\u0440\u0430\u0441_\u0442\u0440\u0430\u0432_\u0447\u044D\u0440\u0432_\u043B\u0456\u043F_\u0436\u043D\u0456\u0432_\u0432\u0435\u0440_\u043A\u0430\u0441\u0442_\u043B\u0456\u0441\u0442_\u0441\u043D\u0435\u0436.".split("_");
    monthShortStandalone = "\u0441\u0442\u0443\u0434_\u043B\u044E\u0442_\u0441\u0430\u043A_\u043A\u0440\u0430\u0441_\u0442\u0440\u0430\u0432_\u0447\u044D\u0440\u0432_\u043B\u0456\u043F_\u0436\u043D\u0456\u0432_\u0432\u0435\u0440_\u043A\u0430\u0441\u0442_\u043B\u0456\u0441\u0442_\u0441\u043D\u0435\u0436".split("_");
    MONTHS_IN_FORMAT = /D[oD]?(\[[^[\]]*\]|\s)+MMMM?/;
    months2 = function months3(dayjsInstance, format) {
      if (MONTHS_IN_FORMAT.test(format)) {
        return monthFormat[dayjsInstance.month()];
      }
      return monthStandalone[dayjsInstance.month()];
    };
    months2.s = monthStandalone;
    months2.f = monthFormat;
    monthsShort = function monthsShort2(dayjsInstance, format) {
      if (MONTHS_IN_FORMAT.test(format)) {
        return monthShortFormat[dayjsInstance.month()];
      }
      return monthShortStandalone[dayjsInstance.month()];
    };
    monthsShort.s = monthShortStandalone;
    monthsShort.f = monthShortFormat;
    locale12 = {
      name: "be",
      weekdays: "\u043D\u044F\u0434\u0437\u0435\u043B\u044F_\u043F\u0430\u043D\u044F\u0434\u0437\u0435\u043B\u0430\u043A_\u0430\u045E\u0442\u043E\u0440\u0430\u043A_\u0441\u0435\u0440\u0430\u0434\u0430_\u0447\u0430\u0446\u0432\u0435\u0440_\u043F\u044F\u0442\u043D\u0456\u0446\u0430_\u0441\u0443\u0431\u043E\u0442\u0430".split("_"),
      weekdaysShort: "\u043D\u044F\u0434_\u043F\u043D\u0434_\u0430\u045E\u0442_\u0441\u0435\u0440_\u0447\u0446\u0432_\u043F\u044F\u0442_\u0441\u0443\u0431".split("_"),
      weekdaysMin: "\u043D\u0434_\u043F\u043D_\u0430\u045E_\u0441\u0440_\u0447\u0446_\u043F\u0442_\u0441\u0431".split("_"),
      months: months2,
      monthsShort,
      weekStart: 1,
      yearStart: 4,
      formats: {
        LT: "HH:mm",
        LTS: "HH:mm:ss",
        L: "DD.MM.YYYY",
        LL: "D MMMM YYYY \u0433.",
        LLL: "D MMMM YYYY \u0433., HH:mm",
        LLLL: "dddd, D MMMM YYYY \u0433., HH:mm"
      },
      relativeTime: {
        future: "\u043F\u0440\u0430\u0437 %s",
        past: "%s \u0442\u0430\u043C\u0443",
        s: "\u043D\u0435\u043A\u0430\u043B\u044C\u043A\u0456 \u0441\u0435\u043A\u0443\u043D\u0434",
        m: relativeTimeWithPlural,
        mm: relativeTimeWithPlural,
        h: relativeTimeWithPlural,
        hh: relativeTimeWithPlural,
        d: "\u0434\u0437\u0435\u043D\u044C",
        dd: relativeTimeWithPlural,
        M: "\u043C\u0435\u0441\u044F\u0446",
        MM: relativeTimeWithPlural,
        y: "\u0433\u043E\u0434",
        yy: relativeTimeWithPlural
      },
      ordinal: function ordinal12(n) {
        return n;
      },
      meridiem: function meridiem9(hour) {
        if (hour < 4) {
          return "\u043D\u043E\u0447\u044B";
        } else if (hour < 12) {
          return "\u0440\u0430\u043D\u0456\u0446\u044B";
        } else if (hour < 17) {
          return "\u0434\u043D\u044F";
        }
        return "\u0432\u0435\u0447\u0430\u0440\u0430";
      }
    };
    stdin_default2.locale(locale12, null, true);
    be_default = locale12;
  }
});

// public/codesandbox-runtime/dayjs-locale/bg.js
var bg_exports = {};
__export(bg_exports, {
  default: () => bg_default
});
var locale13, bg_default;
var init_bg = __esm({
  "public/codesandbox-runtime/dayjs-locale/bg.js"() {
    "use strict";
    init_dayjs();
    locale13 = {
      name: "bg",
      weekdays: "\u043D\u0435\u0434\u0435\u043B\u044F_\u043F\u043E\u043D\u0435\u0434\u0435\u043B\u043D\u0438\u043A_\u0432\u0442\u043E\u0440\u043D\u0438\u043A_\u0441\u0440\u044F\u0434\u0430_\u0447\u0435\u0442\u0432\u044A\u0440\u0442\u044A\u043A_\u043F\u0435\u0442\u044A\u043A_\u0441\u044A\u0431\u043E\u0442\u0430".split("_"),
      weekdaysShort: "\u043D\u0435\u0434_\u043F\u043E\u043D_\u0432\u0442\u043E_\u0441\u0440\u044F_\u0447\u0435\u0442_\u043F\u0435\u0442_\u0441\u044A\u0431".split("_"),
      weekdaysMin: "\u043D\u0434_\u043F\u043D_\u0432\u0442_\u0441\u0440_\u0447\u0442_\u043F\u0442_\u0441\u0431".split("_"),
      months: "\u044F\u043D\u0443\u0430\u0440\u0438_\u0444\u0435\u0432\u0440\u0443\u0430\u0440\u0438_\u043C\u0430\u0440\u0442_\u0430\u043F\u0440\u0438\u043B_\u043C\u0430\u0439_\u044E\u043D\u0438_\u044E\u043B\u0438_\u0430\u0432\u0433\u0443\u0441\u0442_\u0441\u0435\u043F\u0442\u0435\u043C\u0432\u0440\u0438_\u043E\u043A\u0442\u043E\u043C\u0432\u0440\u0438_\u043D\u043E\u0435\u043C\u0432\u0440\u0438_\u0434\u0435\u043A\u0435\u043C\u0432\u0440\u0438".split("_"),
      monthsShort: "\u044F\u043D\u0443_\u0444\u0435\u0432_\u043C\u0430\u0440_\u0430\u043F\u0440_\u043C\u0430\u0439_\u044E\u043D\u0438_\u044E\u043B\u0438_\u0430\u0432\u0433_\u0441\u0435\u043F_\u043E\u043A\u0442_\u043D\u043E\u0435_\u0434\u0435\u043A".split("_"),
      weekStart: 1,
      ordinal: function ordinal13(n) {
        var last2Digits = n % 100;
        if (last2Digits > 10 && last2Digits < 20) {
          return n + "-\u0442\u0438";
        }
        var lastDigit = n % 10;
        if (lastDigit === 1) {
          return n + "-\u0432\u0438";
        } else if (lastDigit === 2) {
          return n + "-\u0440\u0438";
        } else if (lastDigit === 7 || lastDigit === 8) {
          return n + "-\u043C\u0438";
        }
        return n + "-\u0442\u0438";
      },
      formats: {
        LT: "H:mm",
        LTS: "H:mm:ss",
        L: "D.MM.YYYY",
        LL: "D MMMM YYYY",
        LLL: "D MMMM YYYY H:mm",
        LLLL: "dddd, D MMMM YYYY H:mm"
      },
      relativeTime: {
        future: "\u0441\u043B\u0435\u0434 %s",
        past: "\u043F\u0440\u0435\u0434\u0438 %s",
        s: "\u043D\u044F\u043A\u043E\u043B\u043A\u043E \u0441\u0435\u043A\u0443\u043D\u0434\u0438",
        m: "\u043C\u0438\u043D\u0443\u0442\u0430",
        mm: "%d \u043C\u0438\u043D\u0443\u0442\u0438",
        h: "\u0447\u0430\u0441",
        hh: "%d \u0447\u0430\u0441\u0430",
        d: "\u0434\u0435\u043D",
        dd: "%d \u0434\u0435\u043D\u0430",
        M: "\u043C\u0435\u0441\u0435\u0446",
        MM: "%d \u043C\u0435\u0441\u0435\u0446\u0430",
        y: "\u0433\u043E\u0434\u0438\u043D\u0430",
        yy: "%d \u0433\u043E\u0434\u0438\u043D\u0438"
      }
    };
    stdin_default2.locale(locale13, null, true);
    bg_default = locale13;
  }
});

// public/codesandbox-runtime/dayjs-locale/bi.js
var bi_exports = {};
__export(bi_exports, {
  default: () => bi_default
});
var locale14, bi_default;
var init_bi = __esm({
  "public/codesandbox-runtime/dayjs-locale/bi.js"() {
    "use strict";
    init_dayjs();
    locale14 = {
      name: "bi",
      weekdays: "Sande_Mande_Tusde_Wenesde_Tosde_Fraede_Sarade".split("_"),
      months: "Januari_Februari_Maj_Eprel_Mei_Jun_Julae_Okis_Septemba_Oktoba_Novemba_Disemba".split("_"),
      weekStart: 1,
      weekdaysShort: "San_Man_Tus_Wen_Tos_Frae_Sar".split("_"),
      monthsShort: "Jan_Feb_Maj_Epr_Mai_Jun_Jul_Oki_Sep_Okt_Nov_Dis".split("_"),
      weekdaysMin: "San_Ma_Tu_We_To_Fr_Sar".split("_"),
      ordinal: function ordinal14(n) {
        return n;
      },
      formats: {
        LT: "h:mm A",
        LTS: "h:mm:ss A",
        L: "DD/MM/YYYY",
        LL: "D MMMM YYYY",
        LLL: "D MMMM YYYY h:mm A",
        LLLL: "dddd, D MMMM YYYY h:mm A"
      },
      relativeTime: {
        future: "lo %s",
        past: "%s bifo",
        s: "sam seken",
        m: "wan minit",
        mm: "%d minit",
        h: "wan haoa",
        hh: "%d haoa",
        d: "wan dei",
        dd: "%d dei",
        M: "wan manis",
        MM: "%d manis",
        y: "wan yia",
        yy: "%d yia"
      }
    };
    stdin_default2.locale(locale14, null, true);
    bi_default = locale14;
  }
});

// public/codesandbox-runtime/dayjs-locale/bm.js
var bm_exports = {};
__export(bm_exports, {
  default: () => bm_default
});
var locale15, bm_default;
var init_bm = __esm({
  "public/codesandbox-runtime/dayjs-locale/bm.js"() {
    "use strict";
    init_dayjs();
    locale15 = {
      name: "bm",
      weekdays: "Kari_Nt\u025Bn\u025Bn_Tarata_Araba_Alamisa_Juma_Sibiri".split("_"),
      months: "Zanwuyekalo_Fewuruyekalo_Marisikalo_Awirilikalo_M\u025Bkalo_Zuw\u025Bnkalo_Zuluyekalo_Utikalo_S\u025Btanburukalo_\u0254kut\u0254burukalo_Nowanburukalo_Desanburukalo".split("_"),
      weekStart: 1,
      weekdaysShort: "Kar_Nt\u025B_Tar_Ara_Ala_Jum_Sib".split("_"),
      monthsShort: "Zan_Few_Mar_Awi_M\u025B_Zuw_Zul_Uti_S\u025Bt_\u0254ku_Now_Des".split("_"),
      weekdaysMin: "Ka_Nt_Ta_Ar_Al_Ju_Si".split("_"),
      ordinal: function ordinal15(n) {
        return n;
      },
      formats: {
        LT: "HH:mm",
        LTS: "HH:mm:ss",
        L: "DD/MM/YYYY",
        LL: "MMMM [tile] D [san] YYYY",
        LLL: "MMMM [tile] D [san] YYYY [l\u025Br\u025B] HH:mm",
        LLLL: "dddd MMMM [tile] D [san] YYYY [l\u025Br\u025B] HH:mm"
      },
      relativeTime: {
        future: "%s k\u0254n\u0254",
        past: "a b\u025B %s b\u0254",
        s: "sanga dama dama",
        m: "miniti kelen",
        mm: "miniti %d",
        h: "l\u025Br\u025B kelen",
        hh: "l\u025Br\u025B %d",
        d: "tile kelen",
        dd: "tile %d",
        M: "kalo kelen",
        MM: "kalo %d",
        y: "san kelen",
        yy: "san %d"
      }
    };
    stdin_default2.locale(locale15, null, true);
    bm_default = locale15;
  }
});

// public/codesandbox-runtime/dayjs-locale/bn-bd.js
var bn_bd_exports = {};
__export(bn_bd_exports, {
  default: () => bn_bd_default
});
var symbolMap2, numberMap2, locale16, bn_bd_default;
var init_bn_bd = __esm({
  "public/codesandbox-runtime/dayjs-locale/bn-bd.js"() {
    "use strict";
    init_dayjs();
    symbolMap2 = {
      1: "\u09E7",
      2: "\u09E8",
      3: "\u09E9",
      4: "\u09EA",
      5: "\u09EB",
      6: "\u09EC",
      7: "\u09ED",
      8: "\u09EE",
      9: "\u09EF",
      0: "\u09E6"
    };
    numberMap2 = {
      "\u09E7": "1",
      "\u09E8": "2",
      "\u09E9": "3",
      "\u09EA": "4",
      "\u09EB": "5",
      "\u09EC": "6",
      "\u09ED": "7",
      "\u09EE": "8",
      "\u09EF": "9",
      "\u09E6": "0"
    };
    locale16 = {
      name: "bn-bd",
      weekdays: "\u09B0\u09AC\u09BF\u09AC\u09BE\u09B0_\u09B8\u09CB\u09AE\u09AC\u09BE\u09B0_\u09AE\u0999\u09CD\u0997\u09B2\u09AC\u09BE\u09B0_\u09AC\u09C1\u09A7\u09AC\u09BE\u09B0_\u09AC\u09C3\u09B9\u09B8\u09CD\u09AA\u09A4\u09BF\u09AC\u09BE\u09B0_\u09B6\u09C1\u0995\u09CD\u09B0\u09AC\u09BE\u09B0_\u09B6\u09A8\u09BF\u09AC\u09BE\u09B0".split("_"),
      months: "\u099C\u09BE\u09A8\u09C1\u09DF\u09BE\u09B0\u09BF_\u09AB\u09C7\u09AC\u09CD\u09B0\u09C1\u09DF\u09BE\u09B0\u09BF_\u09AE\u09BE\u09B0\u09CD\u099A_\u098F\u09AA\u09CD\u09B0\u09BF\u09B2_\u09AE\u09C7_\u099C\u09C1\u09A8_\u099C\u09C1\u09B2\u09BE\u0987_\u0986\u0997\u09B8\u09CD\u099F_\u09B8\u09C7\u09AA\u09CD\u099F\u09C7\u09AE\u09CD\u09AC\u09B0_\u0985\u0995\u09CD\u099F\u09CB\u09AC\u09B0_\u09A8\u09AD\u09C7\u09AE\u09CD\u09AC\u09B0_\u09A1\u09BF\u09B8\u09C7\u09AE\u09CD\u09AC\u09B0".split("_"),
      weekdaysShort: "\u09B0\u09AC\u09BF_\u09B8\u09CB\u09AE_\u09AE\u0999\u09CD\u0997\u09B2_\u09AC\u09C1\u09A7_\u09AC\u09C3\u09B9\u09B8\u09CD\u09AA\u09A4\u09BF_\u09B6\u09C1\u0995\u09CD\u09B0_\u09B6\u09A8\u09BF".split("_"),
      monthsShort: "\u099C\u09BE\u09A8\u09C1_\u09AB\u09C7\u09AC\u09CD\u09B0\u09C1_\u09AE\u09BE\u09B0\u09CD\u099A_\u098F\u09AA\u09CD\u09B0\u09BF\u09B2_\u09AE\u09C7_\u099C\u09C1\u09A8_\u099C\u09C1\u09B2\u09BE\u0987_\u0986\u0997\u09B8\u09CD\u099F_\u09B8\u09C7\u09AA\u09CD\u099F_\u0985\u0995\u09CD\u099F\u09CB_\u09A8\u09AD\u09C7_\u09A1\u09BF\u09B8\u09C7".split("_"),
      weekdaysMin: "\u09B0\u09AC\u09BF_\u09B8\u09CB\u09AE_\u09AE\u0999\u09CD\u0997_\u09AC\u09C1\u09A7_\u09AC\u09C3\u09B9\u0983_\u09B6\u09C1\u0995\u09CD\u09B0_\u09B6\u09A8\u09BF".split("_"),
      weekStart: 0,
      preparse: function preparse2(string) {
        return string.replace(/[১২৩৪৫৬৭৮৯০]/g, function(match) {
          return numberMap2[match];
        });
      },
      postformat: function postformat2(string) {
        return string.replace(/\d/g, function(match) {
          return symbolMap2[match];
        });
      },
      ordinal: function ordinal16(n) {
        var s2 = ["\u0987", "\u09B2\u09BE", "\u09B0\u09BE", "\u09A0\u09BE", "\u09B6\u09C7"];
        var v = n % 100;
        return "[" + n + (s2[(v - 20) % 10] || s2[v] || s2[0]) + "]";
      },
      formats: {
        LT: "A h:mm \u09B8\u09AE\u09DF",
        LTS: "A h:mm:ss \u09B8\u09AE\u09DF",
        L: "DD/MM/YYYY \u0996\u09CD\u09B0\u09BF\u09B8\u09CD\u099F\u09BE\u09AC\u09CD\u09A6",
        LL: "D MMMM YYYY \u0996\u09CD\u09B0\u09BF\u09B8\u09CD\u099F\u09BE\u09AC\u09CD\u09A6",
        LLL: "D MMMM YYYY \u0996\u09CD\u09B0\u09BF\u09B8\u09CD\u099F\u09BE\u09AC\u09CD\u09A6, A h:mm \u09B8\u09AE\u09DF",
        LLLL: "dddd, D MMMM YYYY \u0996\u09CD\u09B0\u09BF\u09B8\u09CD\u099F\u09BE\u09AC\u09CD\u09A6, A h:mm \u09B8\u09AE\u09DF"
      },
      meridiem: function meridiem10(hour) {
        return (
          /* eslint-disable no-nested-ternary */
          hour < 4 ? "\u09B0\u09BE\u09A4" : hour < 6 ? "\u09AD\u09CB\u09B0" : hour < 12 ? "\u09B8\u0995\u09BE\u09B2" : hour < 15 ? "\u09A6\u09C1\u09AA\u09C1\u09B0" : hour < 18 ? "\u09AC\u09BF\u0995\u09BE\u09B2" : hour < 20 ? "\u09B8\u09A8\u09CD\u09A7\u09CD\u09AF\u09BE" : "\u09B0\u09BE\u09A4"
        );
      },
      relativeTime: {
        future: "%s \u09AA\u09B0\u09C7",
        past: "%s \u0986\u0997\u09C7",
        s: "\u0995\u09DF\u09C7\u0995 \u09B8\u09C7\u0995\u09C7\u09A8\u09CD\u09A1",
        m: "\u098F\u0995 \u09AE\u09BF\u09A8\u09BF\u099F",
        mm: "%d \u09AE\u09BF\u09A8\u09BF\u099F",
        h: "\u098F\u0995 \u0998\u09A8\u09CD\u099F\u09BE",
        hh: "%d \u0998\u09A8\u09CD\u099F\u09BE",
        d: "\u098F\u0995 \u09A6\u09BF\u09A8",
        dd: "%d \u09A6\u09BF\u09A8",
        M: "\u098F\u0995 \u09AE\u09BE\u09B8",
        MM: "%d \u09AE\u09BE\u09B8",
        y: "\u098F\u0995 \u09AC\u099B\u09B0",
        yy: "%d \u09AC\u099B\u09B0"
      }
    };
    stdin_default2.locale(locale16, null, true);
    bn_bd_default = locale16;
  }
});

// public/codesandbox-runtime/dayjs-locale/bn.js
var bn_exports = {};
__export(bn_exports, {
  default: () => bn_default
});
var symbolMap3, numberMap3, locale17, bn_default;
var init_bn = __esm({
  "public/codesandbox-runtime/dayjs-locale/bn.js"() {
    "use strict";
    init_dayjs();
    symbolMap3 = {
      1: "\u09E7",
      2: "\u09E8",
      3: "\u09E9",
      4: "\u09EA",
      5: "\u09EB",
      6: "\u09EC",
      7: "\u09ED",
      8: "\u09EE",
      9: "\u09EF",
      0: "\u09E6"
    };
    numberMap3 = {
      "\u09E7": "1",
      "\u09E8": "2",
      "\u09E9": "3",
      "\u09EA": "4",
      "\u09EB": "5",
      "\u09EC": "6",
      "\u09ED": "7",
      "\u09EE": "8",
      "\u09EF": "9",
      "\u09E6": "0"
    };
    locale17 = {
      name: "bn",
      weekdays: "\u09B0\u09AC\u09BF\u09AC\u09BE\u09B0_\u09B8\u09CB\u09AE\u09AC\u09BE\u09B0_\u09AE\u0999\u09CD\u0997\u09B2\u09AC\u09BE\u09B0_\u09AC\u09C1\u09A7\u09AC\u09BE\u09B0_\u09AC\u09C3\u09B9\u09B8\u09CD\u09AA\u09A4\u09BF\u09AC\u09BE\u09B0_\u09B6\u09C1\u0995\u09CD\u09B0\u09AC\u09BE\u09B0_\u09B6\u09A8\u09BF\u09AC\u09BE\u09B0".split("_"),
      months: "\u099C\u09BE\u09A8\u09C1\u09DF\u09BE\u09B0\u09BF_\u09AB\u09C7\u09AC\u09CD\u09B0\u09C1\u09DF\u09BE\u09B0\u09BF_\u09AE\u09BE\u09B0\u09CD\u099A_\u098F\u09AA\u09CD\u09B0\u09BF\u09B2_\u09AE\u09C7_\u099C\u09C1\u09A8_\u099C\u09C1\u09B2\u09BE\u0987_\u0986\u0997\u09B8\u09CD\u099F_\u09B8\u09C7\u09AA\u09CD\u099F\u09C7\u09AE\u09CD\u09AC\u09B0_\u0985\u0995\u09CD\u099F\u09CB\u09AC\u09B0_\u09A8\u09AD\u09C7\u09AE\u09CD\u09AC\u09B0_\u09A1\u09BF\u09B8\u09C7\u09AE\u09CD\u09AC\u09B0".split("_"),
      weekdaysShort: "\u09B0\u09AC\u09BF_\u09B8\u09CB\u09AE_\u09AE\u0999\u09CD\u0997\u09B2_\u09AC\u09C1\u09A7_\u09AC\u09C3\u09B9\u09B8\u09CD\u09AA\u09A4\u09BF_\u09B6\u09C1\u0995\u09CD\u09B0_\u09B6\u09A8\u09BF".split("_"),
      monthsShort: "\u099C\u09BE\u09A8\u09C1_\u09AB\u09C7\u09AC\u09CD\u09B0\u09C1_\u09AE\u09BE\u09B0\u09CD\u099A_\u098F\u09AA\u09CD\u09B0\u09BF\u09B2_\u09AE\u09C7_\u099C\u09C1\u09A8_\u099C\u09C1\u09B2\u09BE\u0987_\u0986\u0997\u09B8\u09CD\u099F_\u09B8\u09C7\u09AA\u09CD\u099F_\u0985\u0995\u09CD\u099F\u09CB_\u09A8\u09AD\u09C7_\u09A1\u09BF\u09B8\u09C7".split("_"),
      weekdaysMin: "\u09B0\u09AC\u09BF_\u09B8\u09CB\u09AE_\u09AE\u0999\u09CD\u0997_\u09AC\u09C1\u09A7_\u09AC\u09C3\u09B9\u0983_\u09B6\u09C1\u0995\u09CD\u09B0_\u09B6\u09A8\u09BF".split("_"),
      preparse: function preparse3(string) {
        return string.replace(/[১২৩৪৫৬৭৮৯০]/g, function(match) {
          return numberMap3[match];
        });
      },
      postformat: function postformat3(string) {
        return string.replace(/\d/g, function(match) {
          return symbolMap3[match];
        });
      },
      ordinal: function ordinal17(n) {
        return n;
      },
      formats: {
        LT: "A h:mm \u09B8\u09AE\u09DF",
        LTS: "A h:mm:ss \u09B8\u09AE\u09DF",
        L: "DD/MM/YYYY",
        LL: "D MMMM YYYY",
        LLL: "D MMMM YYYY, A h:mm \u09B8\u09AE\u09DF",
        LLLL: "dddd, D MMMM YYYY, A h:mm \u09B8\u09AE\u09DF"
      },
      relativeTime: {
        future: "%s \u09AA\u09B0\u09C7",
        past: "%s \u0986\u0997\u09C7",
        s: "\u0995\u09DF\u09C7\u0995 \u09B8\u09C7\u0995\u09C7\u09A8\u09CD\u09A1",
        m: "\u098F\u0995 \u09AE\u09BF\u09A8\u09BF\u099F",
        mm: "%d \u09AE\u09BF\u09A8\u09BF\u099F",
        h: "\u098F\u0995 \u0998\u09A8\u09CD\u099F\u09BE",
        hh: "%d \u0998\u09A8\u09CD\u099F\u09BE",
        d: "\u098F\u0995 \u09A6\u09BF\u09A8",
        dd: "%d \u09A6\u09BF\u09A8",
        M: "\u098F\u0995 \u09AE\u09BE\u09B8",
        MM: "%d \u09AE\u09BE\u09B8",
        y: "\u098F\u0995 \u09AC\u099B\u09B0",
        yy: "%d \u09AC\u099B\u09B0"
      }
    };
    stdin_default2.locale(locale17, null, true);
    bn_default = locale17;
  }
});

// public/codesandbox-runtime/dayjs-locale/bo.js
var bo_exports = {};
__export(bo_exports, {
  default: () => bo_default
});
var locale18, bo_default;
var init_bo = __esm({
  "public/codesandbox-runtime/dayjs-locale/bo.js"() {
    "use strict";
    init_dayjs();
    locale18 = {
      name: "bo",
      weekdays: "\u0F42\u0F5F\u0F60\u0F0B\u0F49\u0F72\u0F0B\u0F58\u0F0B_\u0F42\u0F5F\u0F60\u0F0B\u0F5F\u0FB3\u0F0B\u0F56\u0F0B_\u0F42\u0F5F\u0F60\u0F0B\u0F58\u0F72\u0F42\u0F0B\u0F51\u0F58\u0F62\u0F0B_\u0F42\u0F5F\u0F60\u0F0B\u0F63\u0FB7\u0F42\u0F0B\u0F54\u0F0B_\u0F42\u0F5F\u0F60\u0F0B\u0F55\u0F74\u0F62\u0F0B\u0F56\u0F74_\u0F42\u0F5F\u0F60\u0F0B\u0F54\u0F0B\u0F66\u0F44\u0F66\u0F0B_\u0F42\u0F5F\u0F60\u0F0B\u0F66\u0FA4\u0F7A\u0F53\u0F0B\u0F54\u0F0B".split("_"),
      weekdaysShort: "\u0F49\u0F72\u0F0B\u0F58\u0F0B_\u0F5F\u0FB3\u0F0B\u0F56\u0F0B_\u0F58\u0F72\u0F42\u0F0B\u0F51\u0F58\u0F62\u0F0B_\u0F63\u0FB7\u0F42\u0F0B\u0F54\u0F0B_\u0F55\u0F74\u0F62\u0F0B\u0F56\u0F74_\u0F54\u0F0B\u0F66\u0F44\u0F66\u0F0B_\u0F66\u0FA4\u0F7A\u0F53\u0F0B\u0F54\u0F0B".split("_"),
      weekdaysMin: "\u0F49\u0F72\u0F0B\u0F58\u0F0B_\u0F5F\u0FB3\u0F0B\u0F56\u0F0B_\u0F58\u0F72\u0F42\u0F0B\u0F51\u0F58\u0F62\u0F0B_\u0F63\u0FB7\u0F42\u0F0B\u0F54\u0F0B_\u0F55\u0F74\u0F62\u0F0B\u0F56\u0F74_\u0F54\u0F0B\u0F66\u0F44\u0F66\u0F0B_\u0F66\u0FA4\u0F7A\u0F53\u0F0B\u0F54\u0F0B".split("_"),
      months: "\u0F5F\u0FB3\u0F0B\u0F56\u0F0B\u0F51\u0F44\u0F0B\u0F54\u0F7C_\u0F5F\u0FB3\u0F0B\u0F56\u0F0B\u0F42\u0F49\u0F72\u0F66\u0F0B\u0F54_\u0F5F\u0FB3\u0F0B\u0F56\u0F0B\u0F42\u0F66\u0F74\u0F58\u0F0B\u0F54_\u0F5F\u0FB3\u0F0B\u0F56\u0F0B\u0F56\u0F5E\u0F72\u0F0B\u0F54_\u0F5F\u0FB3\u0F0B\u0F56\u0F0B\u0F63\u0F94\u0F0B\u0F54_\u0F5F\u0FB3\u0F0B\u0F56\u0F0B\u0F51\u0FB2\u0F74\u0F42\u0F0B\u0F54_\u0F5F\u0FB3\u0F0B\u0F56\u0F0B\u0F56\u0F51\u0F74\u0F53\u0F0B\u0F54_\u0F5F\u0FB3\u0F0B\u0F56\u0F0B\u0F56\u0F62\u0F92\u0FB1\u0F51\u0F0B\u0F54_\u0F5F\u0FB3\u0F0B\u0F56\u0F0B\u0F51\u0F42\u0F74\u0F0B\u0F54_\u0F5F\u0FB3\u0F0B\u0F56\u0F0B\u0F56\u0F45\u0F74\u0F0B\u0F54_\u0F5F\u0FB3\u0F0B\u0F56\u0F0B\u0F56\u0F45\u0F74\u0F0B\u0F42\u0F45\u0F72\u0F42\u0F0B\u0F54_\u0F5F\u0FB3\u0F0B\u0F56\u0F0B\u0F56\u0F45\u0F74\u0F0B\u0F42\u0F49\u0F72\u0F66\u0F0B\u0F54".split("_"),
      monthsShort: "\u0F5F\u0FB3\u0F0B\u0F51\u0F44\u0F0B\u0F54\u0F7C_\u0F5F\u0FB3\u0F0B\u0F42\u0F49\u0F72\u0F66\u0F0B\u0F54_\u0F5F\u0FB3\u0F0B\u0F42\u0F66\u0F74\u0F58\u0F0B\u0F54_\u0F5F\u0FB3\u0F0B\u0F56\u0F5E\u0F72\u0F0B\u0F54_\u0F5F\u0FB3\u0F0B\u0F63\u0F94\u0F0B\u0F54_\u0F5F\u0FB3\u0F0B\u0F51\u0FB2\u0F74\u0F42\u0F0B\u0F54_\u0F5F\u0FB3\u0F0B\u0F56\u0F51\u0F74\u0F53\u0F0B\u0F54_\u0F5F\u0FB3\u0F0B\u0F56\u0F62\u0F92\u0FB1\u0F51\u0F0B\u0F54_\u0F5F\u0FB3\u0F0B\u0F51\u0F42\u0F74\u0F0B\u0F54_\u0F5F\u0FB3\u0F0B\u0F56\u0F45\u0F74\u0F0B\u0F54_\u0F5F\u0FB3\u0F0B\u0F56\u0F45\u0F74\u0F0B\u0F42\u0F45\u0F72\u0F42\u0F0B\u0F54_\u0F5F\u0FB3\u0F0B\u0F56\u0F45\u0F74\u0F0B\u0F42\u0F49\u0F72\u0F66\u0F0B\u0F54".split("_"),
      ordinal: function ordinal18(n) {
        return n;
      },
      formats: {
        LT: "A h:mm",
        LTS: "A h:mm:ss",
        L: "DD/MM/YYYY",
        LL: "D MMMM YYYY",
        LLL: "D MMMM YYYY, A h:mm",
        LLLL: "dddd, D MMMM YYYY, A h:mm"
      },
      relativeTime: {
        future: "%s \u0F63\u0F0B",
        past: "%s \u0F66\u0F94\u0F7C\u0F53\u0F0B\u0F63\u0F0B",
        s: "\u0F4F\u0F7C\u0F42\u0F0B\u0F59\u0F58\u0F0B",
        m: "\u0F66\u0F90\u0F62\u0F0B\u0F58\u0F0B\u0F42\u0F45\u0F72\u0F42\u0F0B",
        mm: "\u0F66\u0F90\u0F62\u0F0B\u0F58\u0F0B %d",
        h: "\u0F46\u0F74\u0F0B\u0F5A\u0F7C\u0F51\u0F0B\u0F42\u0F45\u0F72\u0F42\u0F0B",
        hh: "\u0F46\u0F74\u0F0B\u0F5A\u0F7C\u0F51\u0F0B %d",
        d: "\u0F49\u0F72\u0F53\u0F0B\u0F42\u0F45\u0F72\u0F42\u0F0B",
        dd: "\u0F49\u0F72\u0F53\u0F0B %d",
        M: "\u0F5F\u0FB3\u0F0B\u0F56\u0F0B\u0F42\u0F45\u0F72\u0F42\u0F0B",
        MM: "\u0F5F\u0FB3\u0F0B\u0F56\u0F0B %d",
        y: "\u0F63\u0F7C\u0F0B\u0F42\u0F45\u0F72\u0F42\u0F0B",
        yy: "\u0F63\u0F7C\u0F0B %d"
      }
    };
    stdin_default2.locale(locale18, null, true);
    bo_default = locale18;
  }
});

// public/codesandbox-runtime/dayjs-locale/br.js
var br_exports = {};
__export(br_exports, {
  default: () => br_default
});
function lastNumber(number) {
  if (number > 9) {
    return lastNumber(number % 10);
  }
  return number;
}
function softMutation(text) {
  var mutationTable = {
    m: "v",
    b: "v",
    d: "z"
  };
  return mutationTable[text.charAt(0)] + text.substring(1);
}
function mutation(text, number) {
  if (number === 2) {
    return softMutation(text);
  }
  return text;
}
function relativeTimeWithMutation(number, withoutSuffix, key) {
  var format = {
    mm: "munutenn",
    MM: "miz",
    dd: "devezh"
  };
  return number + " " + mutation(format[key], number);
}
function specialMutationForYears(number) {
  switch (lastNumber(number)) {
    case 1:
    case 3:
    case 4:
    case 5:
    case 9:
      return number + " bloaz";
    default:
      return number + " vloaz";
  }
}
var locale19, br_default;
var init_br = __esm({
  "public/codesandbox-runtime/dayjs-locale/br.js"() {
    "use strict";
    init_dayjs();
    locale19 = {
      name: "br",
      weekdays: "Sul_Lun_Meurzh_Merc\u02BCher_Yaou_Gwener_Sadorn".split("_"),
      months: "Genver_C\u02BChwevrer_Meurzh_Ebrel_Mae_Mezheven_Gouere_Eost_Gwengolo_Here_Du_Kerzu".split("_"),
      weekStart: 1,
      weekdaysShort: "Sul_Lun_Meu_Mer_Yao_Gwe_Sad".split("_"),
      monthsShort: "Gen_C\u02BChwe_Meu_Ebr_Mae_Eve_Gou_Eos_Gwe_Her_Du_Ker".split("_"),
      weekdaysMin: "Su_Lu_Me_Mer_Ya_Gw_Sa".split("_"),
      ordinal: function ordinal19(n) {
        return n;
      },
      formats: {
        LT: "h[e]mm A",
        LTS: "h[e]mm:ss A",
        L: "DD/MM/YYYY",
        LL: "D [a viz] MMMM YYYY",
        LLL: "D [a viz] MMMM YYYY h[e]mm A",
        LLLL: "dddd, D [a viz] MMMM YYYY h[e]mm A"
      },
      relativeTime: {
        future: "a-benn %s",
        past: "%s \u02BCzo",
        s: "un nebeud segondenno\xF9",
        m: "ur vunutenn",
        mm: relativeTimeWithMutation,
        h: "un eur",
        hh: "%d eur",
        d: "un devezh",
        dd: relativeTimeWithMutation,
        M: "ur miz",
        MM: relativeTimeWithMutation,
        y: "ur bloaz",
        yy: specialMutationForYears
      },
      meridiem: function meridiem11(hour) {
        return hour < 12 ? "a.m." : "g.m.";
      }
      // a-raok merenn | goude merenn
    };
    stdin_default2.locale(locale19, null, true);
    br_default = locale19;
  }
});

// public/codesandbox-runtime/dayjs-locale/bs.js
var bs_exports = {};
__export(bs_exports, {
  default: () => bs_default
});
var locale20, bs_default;
var init_bs = __esm({
  "public/codesandbox-runtime/dayjs-locale/bs.js"() {
    "use strict";
    init_dayjs();
    locale20 = {
      name: "bs",
      weekdays: "nedjelja_ponedjeljak_utorak_srijeda_\u010Detvrtak_petak_subota".split("_"),
      months: "januar_februar_mart_april_maj_juni_juli_august_septembar_oktobar_novembar_decembar".split("_"),
      weekStart: 1,
      weekdaysShort: "ned._pon._uto._sri._\u010Det._pet._sub.".split("_"),
      monthsShort: "jan._feb._mar._apr._maj._jun._jul._aug._sep._okt._nov._dec.".split("_"),
      weekdaysMin: "ne_po_ut_sr_\u010De_pe_su".split("_"),
      ordinal: function ordinal20(n) {
        return n;
      },
      formats: {
        LT: "H:mm",
        LTS: "H:mm:ss",
        L: "DD.MM.YYYY",
        LL: "D. MMMM YYYY",
        LLL: "D. MMMM YYYY H:mm",
        LLLL: "dddd, D. MMMM YYYY H:mm"
      }
    };
    stdin_default2.locale(locale20, null, true);
    bs_default = locale20;
  }
});

// public/codesandbox-runtime/dayjs-locale/ca.js
var ca_exports = {};
__export(ca_exports, {
  default: () => ca_default
});
var locale21, ca_default;
var init_ca = __esm({
  "public/codesandbox-runtime/dayjs-locale/ca.js"() {
    "use strict";
    init_dayjs();
    locale21 = {
      name: "ca",
      weekdays: "Diumenge_Dilluns_Dimarts_Dimecres_Dijous_Divendres_Dissabte".split("_"),
      weekdaysShort: "Dg._Dl._Dt._Dc._Dj._Dv._Ds.".split("_"),
      weekdaysMin: "Dg_Dl_Dt_Dc_Dj_Dv_Ds".split("_"),
      months: "Gener_Febrer_Mar\xE7_Abril_Maig_Juny_Juliol_Agost_Setembre_Octubre_Novembre_Desembre".split("_"),
      monthsShort: "Gen._Febr._Mar\xE7_Abr._Maig_Juny_Jul._Ag._Set._Oct._Nov._Des.".split("_"),
      weekStart: 1,
      formats: {
        LT: "H:mm",
        LTS: "H:mm:ss",
        L: "DD/MM/YYYY",
        LL: "D MMMM [de] YYYY",
        LLL: "D MMMM [de] YYYY [a les] H:mm",
        LLLL: "dddd D MMMM [de] YYYY [a les] H:mm",
        ll: "D MMM YYYY",
        lll: "D MMM YYYY, H:mm",
        llll: "ddd D MMM YYYY, H:mm"
      },
      relativeTime: {
        future: "d'aqu\xED %s",
        past: "fa %s",
        s: "uns segons",
        m: "un minut",
        mm: "%d minuts",
        h: "una hora",
        hh: "%d hores",
        d: "un dia",
        dd: "%d dies",
        M: "un mes",
        MM: "%d mesos",
        y: "un any",
        yy: "%d anys"
      },
      ordinal: function ordinal21(n) {
        var ord;
        if (n === 1 || n === 3) ord = "r";
        else if (n === 2) ord = "n";
        else if (n === 4) ord = "t";
        else ord = "\xE8";
        return "" + n + ord;
      }
    };
    stdin_default2.locale(locale21, null, true);
    ca_default = locale21;
  }
});

// public/codesandbox-runtime/dayjs-locale/cs.js
var cs_exports = {};
__export(cs_exports, {
  default: () => cs_default
});
function plural2(n) {
  return n > 1 && n < 5 && ~~(n / 10) !== 1;
}
function translate(number, withoutSuffix, key, isFuture) {
  var result = number + " ";
  switch (key) {
    case "s":
      return withoutSuffix || isFuture ? "p\xE1r sekund" : "p\xE1r sekundami";
    case "m":
      return withoutSuffix ? "minuta" : isFuture ? "minutu" : "minutou";
    case "mm":
      if (withoutSuffix || isFuture) {
        return result + (plural2(number) ? "minuty" : "minut");
      }
      return result + "minutami";
    case "h":
      return withoutSuffix ? "hodina" : isFuture ? "hodinu" : "hodinou";
    case "hh":
      if (withoutSuffix || isFuture) {
        return result + (plural2(number) ? "hodiny" : "hodin");
      }
      return result + "hodinami";
    case "d":
      return withoutSuffix || isFuture ? "den" : "dnem";
    case "dd":
      if (withoutSuffix || isFuture) {
        return result + (plural2(number) ? "dny" : "dn\xED");
      }
      return result + "dny";
    case "M":
      return withoutSuffix || isFuture ? "m\u011Bs\xEDc" : "m\u011Bs\xEDcem";
    case "MM":
      if (withoutSuffix || isFuture) {
        return result + (plural2(number) ? "m\u011Bs\xEDce" : "m\u011Bs\xEDc\u016F");
      }
      return result + "m\u011Bs\xEDci";
    case "y":
      return withoutSuffix || isFuture ? "rok" : "rokem";
    case "yy":
      if (withoutSuffix || isFuture) {
        return result + (plural2(number) ? "roky" : "let");
      }
      return result + "lety";
  }
}
var locale22, cs_default;
var init_cs = __esm({
  "public/codesandbox-runtime/dayjs-locale/cs.js"() {
    "use strict";
    init_dayjs();
    locale22 = {
      name: "cs",
      weekdays: "ned\u011Ble_pond\u011Bl\xED_\xFAter\xFD_st\u0159eda_\u010Dtvrtek_p\xE1tek_sobota".split("_"),
      weekdaysShort: "ne_po_\xFAt_st_\u010Dt_p\xE1_so".split("_"),
      weekdaysMin: "ne_po_\xFAt_st_\u010Dt_p\xE1_so".split("_"),
      months: "leden_\xFAnor_b\u0159ezen_duben_kv\u011Bten_\u010Derven_\u010Dervenec_srpen_z\xE1\u0159\xED_\u0159\xEDjen_listopad_prosinec".split("_"),
      monthsShort: "led_\xFAno_b\u0159e_dub_kv\u011B_\u010Dvn_\u010Dvc_srp_z\xE1\u0159_\u0159\xEDj_lis_pro".split("_"),
      weekStart: 1,
      yearStart: 4,
      ordinal: function ordinal22(n) {
        return n + ".";
      },
      formats: {
        LT: "H:mm",
        LTS: "H:mm:ss",
        L: "DD.MM.YYYY",
        LL: "D. MMMM YYYY",
        LLL: "D. MMMM YYYY H:mm",
        LLLL: "dddd D. MMMM YYYY H:mm",
        l: "D. M. YYYY"
      },
      relativeTime: {
        future: "za %s",
        past: "p\u0159ed %s",
        s: translate,
        m: translate,
        mm: translate,
        h: translate,
        hh: translate,
        d: translate,
        dd: translate,
        M: translate,
        MM: translate,
        y: translate,
        yy: translate
      }
    };
    stdin_default2.locale(locale22, null, true);
    cs_default = locale22;
  }
});

// public/codesandbox-runtime/dayjs-locale/cv.js
var cv_exports = {};
__export(cv_exports, {
  default: () => cv_default
});
var locale23, cv_default;
var init_cv = __esm({
  "public/codesandbox-runtime/dayjs-locale/cv.js"() {
    "use strict";
    init_dayjs();
    locale23 = {
      name: "cv",
      weekdays: "\u0432\u044B\u0440\u0441\u0430\u0440\u043D\u0438\u043A\u0443\u043D_\u0442\u0443\u043D\u0442\u0438\u043A\u0443\u043D_\u044B\u0442\u043B\u0430\u0440\u0438\u043A\u0443\u043D_\u044E\u043D\u043A\u0443\u043D_\u043A\u04D7\u04AB\u043D\u0435\u0440\u043D\u0438\u043A\u0443\u043D_\u044D\u0440\u043D\u0435\u043A\u0443\u043D_\u0448\u04D1\u043C\u0430\u0442\u043A\u0443\u043D".split("_"),
      months: "\u043A\u04D1\u0440\u043B\u0430\u0447_\u043D\u0430\u0440\u04D1\u0441_\u043F\u0443\u0448_\u0430\u043A\u0430_\u043C\u0430\u0439_\u04AB\u04D7\u0440\u0442\u043C\u0435_\u0443\u0442\u04D1_\u04AB\u0443\u0440\u043B\u0430_\u0430\u0432\u04D1\u043D_\u044E\u043F\u0430_\u0447\u04F3\u043A_\u0440\u0430\u0448\u0442\u0430\u0432".split("_"),
      weekStart: 1,
      weekdaysShort: "\u0432\u044B\u0440_\u0442\u0443\u043D_\u044B\u0442\u043B_\u044E\u043D_\u043A\u04D7\u04AB_\u044D\u0440\u043D_\u0448\u04D1\u043C".split("_"),
      monthsShort: "\u043A\u04D1\u0440_\u043D\u0430\u0440_\u043F\u0443\u0448_\u0430\u043A\u0430_\u043C\u0430\u0439_\u04AB\u04D7\u0440_\u0443\u0442\u04D1_\u04AB\u0443\u0440_\u0430\u0432\u043D_\u044E\u043F\u0430_\u0447\u04F3\u043A_\u0440\u0430\u0448".split("_"),
      weekdaysMin: "\u0432\u0440_\u0442\u043D_\u044B\u0442_\u044E\u043D_\u043A\u04AB_\u044D\u0440_\u0448\u043C".split("_"),
      ordinal: function ordinal23(n) {
        return n;
      },
      formats: {
        LT: "HH:mm",
        LTS: "HH:mm:ss",
        L: "DD-MM-YYYY",
        LL: "YYYY [\u04AB\u0443\u043B\u0445\u0438] MMMM [\u0443\u0439\u04D1\u0445\u04D7\u043D] D[-\u043C\u04D7\u0448\u04D7]",
        LLL: "YYYY [\u04AB\u0443\u043B\u0445\u0438] MMMM [\u0443\u0439\u04D1\u0445\u04D7\u043D] D[-\u043C\u04D7\u0448\u04D7], HH:mm",
        LLLL: "dddd, YYYY [\u04AB\u0443\u043B\u0445\u0438] MMMM [\u0443\u0439\u04D1\u0445\u04D7\u043D] D[-\u043C\u04D7\u0448\u04D7], HH:mm"
      }
    };
    stdin_default2.locale(locale23, null, true);
    cv_default = locale23;
  }
});

// public/codesandbox-runtime/dayjs-locale/cy.js
var cy_exports = {};
__export(cy_exports, {
  default: () => cy_default
});
var locale24, cy_default;
var init_cy = __esm({
  "public/codesandbox-runtime/dayjs-locale/cy.js"() {
    "use strict";
    init_dayjs();
    locale24 = {
      name: "cy",
      weekdays: "Dydd Sul_Dydd Llun_Dydd Mawrth_Dydd Mercher_Dydd Iau_Dydd Gwener_Dydd Sadwrn".split("_"),
      months: "Ionawr_Chwefror_Mawrth_Ebrill_Mai_Mehefin_Gorffennaf_Awst_Medi_Hydref_Tachwedd_Rhagfyr".split("_"),
      weekStart: 1,
      weekdaysShort: "Sul_Llun_Maw_Mer_Iau_Gwe_Sad".split("_"),
      monthsShort: "Ion_Chwe_Maw_Ebr_Mai_Meh_Gor_Aws_Med_Hyd_Tach_Rhag".split("_"),
      weekdaysMin: "Su_Ll_Ma_Me_Ia_Gw_Sa".split("_"),
      ordinal: function ordinal24(n) {
        return n;
      },
      formats: {
        LT: "HH:mm",
        LTS: "HH:mm:ss",
        L: "DD/MM/YYYY",
        LL: "D MMMM YYYY",
        LLL: "D MMMM YYYY HH:mm",
        LLLL: "dddd, D MMMM YYYY HH:mm"
      },
      relativeTime: {
        future: "mewn %s",
        past: "%s yn \xF4l",
        s: "ychydig eiliadau",
        m: "munud",
        mm: "%d munud",
        h: "awr",
        hh: "%d awr",
        d: "diwrnod",
        dd: "%d diwrnod",
        M: "mis",
        MM: "%d mis",
        y: "blwyddyn",
        yy: "%d flynedd"
      }
    };
    stdin_default2.locale(locale24, null, true);
    cy_default = locale24;
  }
});

// public/codesandbox-runtime/dayjs-locale/da.js
var da_exports = {};
__export(da_exports, {
  default: () => da_default
});
var locale25, da_default;
var init_da = __esm({
  "public/codesandbox-runtime/dayjs-locale/da.js"() {
    "use strict";
    init_dayjs();
    locale25 = {
      name: "da",
      weekdays: "s\xF8ndag_mandag_tirsdag_onsdag_torsdag_fredag_l\xF8rdag".split("_"),
      weekdaysShort: "s\xF8n._man._tirs._ons._tors._fre._l\xF8r.".split("_"),
      weekdaysMin: "s\xF8._ma._ti._on._to._fr._l\xF8.".split("_"),
      months: "januar_februar_marts_april_maj_juni_juli_august_september_oktober_november_december".split("_"),
      monthsShort: "jan._feb._mar._apr._maj_juni_juli_aug._sept._okt._nov._dec.".split("_"),
      weekStart: 1,
      yearStart: 4,
      ordinal: function ordinal25(n) {
        return n + ".";
      },
      formats: {
        LT: "HH:mm",
        LTS: "HH:mm:ss",
        L: "DD.MM.YYYY",
        LL: "D. MMMM YYYY",
        LLL: "D. MMMM YYYY HH:mm",
        LLLL: "dddd [d.] D. MMMM YYYY [kl.] HH:mm"
      },
      relativeTime: {
        future: "om %s",
        past: "%s siden",
        s: "f\xE5 sekunder",
        m: "et minut",
        mm: "%d minutter",
        h: "en time",
        hh: "%d timer",
        d: "en dag",
        dd: "%d dage",
        M: "en m\xE5ned",
        MM: "%d m\xE5neder",
        y: "et \xE5r",
        yy: "%d \xE5r"
      }
    };
    stdin_default2.locale(locale25, null, true);
    da_default = locale25;
  }
});

// public/codesandbox-runtime/dayjs-locale/de-at.js
var de_at_exports = {};
__export(de_at_exports, {
  default: () => de_at_default
});
function relativeTimeFormatter(number, withoutSuffix, key) {
  var l = texts[key];
  if (Array.isArray(l)) {
    l = l[withoutSuffix ? 0 : 1];
  }
  return l.replace("%d", number);
}
var texts, locale26, de_at_default;
var init_de_at = __esm({
  "public/codesandbox-runtime/dayjs-locale/de-at.js"() {
    "use strict";
    init_dayjs();
    texts = {
      s: "ein paar Sekunden",
      m: ["eine Minute", "einer Minute"],
      mm: "%d Minuten",
      h: ["eine Stunde", "einer Stunde"],
      hh: "%d Stunden",
      d: ["ein Tag", "einem Tag"],
      dd: ["%d Tage", "%d Tagen"],
      M: ["ein Monat", "einem Monat"],
      MM: ["%d Monate", "%d Monaten"],
      y: ["ein Jahr", "einem Jahr"],
      yy: ["%d Jahre", "%d Jahren"]
    };
    locale26 = {
      name: "de-at",
      weekdays: "Sonntag_Montag_Dienstag_Mittwoch_Donnerstag_Freitag_Samstag".split("_"),
      weekdaysShort: "So._Mo._Di._Mi._Do._Fr._Sa.".split("_"),
      weekdaysMin: "So_Mo_Di_Mi_Do_Fr_Sa".split("_"),
      months: "J\xE4nner_Februar_M\xE4rz_April_Mai_Juni_Juli_August_September_Oktober_November_Dezember".split("_"),
      monthsShort: "J\xE4n._Feb._M\xE4rz_Apr._Mai_Juni_Juli_Aug._Sep._Okt._Nov._Dez.".split("_"),
      ordinal: function ordinal26(n) {
        return n + ".";
      },
      weekStart: 1,
      formats: {
        LTS: "HH:mm:ss",
        LT: "HH:mm",
        L: "DD.MM.YYYY",
        LL: "D. MMMM YYYY",
        LLL: "D. MMMM YYYY HH:mm",
        LLLL: "dddd, D. MMMM YYYY HH:mm"
      },
      relativeTime: {
        future: "in %s",
        past: "vor %s",
        s: relativeTimeFormatter,
        m: relativeTimeFormatter,
        mm: relativeTimeFormatter,
        h: relativeTimeFormatter,
        hh: relativeTimeFormatter,
        d: relativeTimeFormatter,
        dd: relativeTimeFormatter,
        M: relativeTimeFormatter,
        MM: relativeTimeFormatter,
        y: relativeTimeFormatter,
        yy: relativeTimeFormatter
      }
    };
    stdin_default2.locale(locale26, null, true);
    de_at_default = locale26;
  }
});

// public/codesandbox-runtime/dayjs-locale/de-ch.js
var de_ch_exports = {};
__export(de_ch_exports, {
  default: () => de_ch_default
});
function relativeTimeFormatter2(number, withoutSuffix, key) {
  var l = texts2[key];
  if (Array.isArray(l)) {
    l = l[withoutSuffix ? 0 : 1];
  }
  return l.replace("%d", number);
}
var texts2, locale27, de_ch_default;
var init_de_ch = __esm({
  "public/codesandbox-runtime/dayjs-locale/de-ch.js"() {
    "use strict";
    init_dayjs();
    texts2 = {
      s: "ein paar Sekunden",
      m: ["eine Minute", "einer Minute"],
      mm: "%d Minuten",
      h: ["eine Stunde", "einer Stunde"],
      hh: "%d Stunden",
      d: ["ein Tag", "einem Tag"],
      dd: ["%d Tage", "%d Tagen"],
      M: ["ein Monat", "einem Monat"],
      MM: ["%d Monate", "%d Monaten"],
      y: ["ein Jahr", "einem Jahr"],
      yy: ["%d Jahre", "%d Jahren"]
    };
    locale27 = {
      name: "de-ch",
      weekdays: "Sonntag_Montag_Dienstag_Mittwoch_Donnerstag_Freitag_Samstag".split("_"),
      weekdaysShort: "So_Mo_Di_Mi_Do_Fr_Sa".split("_"),
      weekdaysMin: "So_Mo_Di_Mi_Do_Fr_Sa".split("_"),
      months: "Januar_Februar_M\xE4rz_April_Mai_Juni_Juli_August_September_Oktober_November_Dezember".split("_"),
      monthsShort: "Jan._Feb._M\xE4rz_Apr._Mai_Juni_Juli_Aug._Sep._Okt._Nov._Dez.".split("_"),
      ordinal: function ordinal27(n) {
        return n + ".";
      },
      weekStart: 1,
      formats: {
        LT: "HH:mm",
        LTS: "HH:mm:ss",
        L: "DD.MM.YYYY",
        LL: "D. MMMM YYYY",
        LLL: "D. MMMM YYYY HH:mm",
        LLLL: "dddd, D. MMMM YYYY HH:mm"
      },
      relativeTime: {
        future: "in %s",
        past: "vor %s",
        s: relativeTimeFormatter2,
        m: relativeTimeFormatter2,
        mm: relativeTimeFormatter2,
        h: relativeTimeFormatter2,
        hh: relativeTimeFormatter2,
        d: relativeTimeFormatter2,
        dd: relativeTimeFormatter2,
        M: relativeTimeFormatter2,
        MM: relativeTimeFormatter2,
        y: relativeTimeFormatter2,
        yy: relativeTimeFormatter2
      }
    };
    stdin_default2.locale(locale27, null, true);
    de_ch_default = locale27;
  }
});

// public/codesandbox-runtime/dayjs-locale/de.js
var de_exports = {};
__export(de_exports, {
  default: () => de_default
});
function relativeTimeFormatter3(number, withoutSuffix, key) {
  var l = texts3[key];
  if (Array.isArray(l)) {
    l = l[withoutSuffix ? 0 : 1];
  }
  return l.replace("%d", number);
}
var texts3, locale28, de_default;
var init_de = __esm({
  "public/codesandbox-runtime/dayjs-locale/de.js"() {
    "use strict";
    init_dayjs();
    texts3 = {
      s: "ein paar Sekunden",
      m: ["eine Minute", "einer Minute"],
      mm: "%d Minuten",
      h: ["eine Stunde", "einer Stunde"],
      hh: "%d Stunden",
      d: ["ein Tag", "einem Tag"],
      dd: ["%d Tage", "%d Tagen"],
      M: ["ein Monat", "einem Monat"],
      MM: ["%d Monate", "%d Monaten"],
      y: ["ein Jahr", "einem Jahr"],
      yy: ["%d Jahre", "%d Jahren"]
    };
    locale28 = {
      name: "de",
      weekdays: "Sonntag_Montag_Dienstag_Mittwoch_Donnerstag_Freitag_Samstag".split("_"),
      weekdaysShort: "So._Mo._Di._Mi._Do._Fr._Sa.".split("_"),
      weekdaysMin: "So_Mo_Di_Mi_Do_Fr_Sa".split("_"),
      months: "Januar_Februar_M\xE4rz_April_Mai_Juni_Juli_August_September_Oktober_November_Dezember".split("_"),
      monthsShort: "Jan._Feb._M\xE4rz_Apr._Mai_Juni_Juli_Aug._Sept._Okt._Nov._Dez.".split("_"),
      ordinal: function ordinal28(n) {
        return n + ".";
      },
      weekStart: 1,
      yearStart: 4,
      formats: {
        LTS: "HH:mm:ss",
        LT: "HH:mm",
        L: "DD.MM.YYYY",
        LL: "D. MMMM YYYY",
        LLL: "D. MMMM YYYY HH:mm",
        LLLL: "dddd, D. MMMM YYYY HH:mm"
      },
      relativeTime: {
        future: "in %s",
        past: "vor %s",
        s: relativeTimeFormatter3,
        m: relativeTimeFormatter3,
        mm: relativeTimeFormatter3,
        h: relativeTimeFormatter3,
        hh: relativeTimeFormatter3,
        d: relativeTimeFormatter3,
        dd: relativeTimeFormatter3,
        M: relativeTimeFormatter3,
        MM: relativeTimeFormatter3,
        y: relativeTimeFormatter3,
        yy: relativeTimeFormatter3
      }
    };
    stdin_default2.locale(locale28, null, true);
    de_default = locale28;
  }
});

// public/codesandbox-runtime/dayjs-locale/dv.js
var dv_exports = {};
__export(dv_exports, {
  default: () => dv_default
});
var locale29, dv_default;
var init_dv = __esm({
  "public/codesandbox-runtime/dayjs-locale/dv.js"() {
    "use strict";
    init_dayjs();
    locale29 = {
      name: "dv",
      weekdays: "\u0787\u07A7\u078B\u07A8\u0787\u07B0\u078C\u07A6_\u0780\u07AF\u0789\u07A6_\u0787\u07A6\u0782\u07B0\u078E\u07A7\u0783\u07A6_\u0784\u07AA\u078B\u07A6_\u0784\u07AA\u0783\u07A7\u0790\u07B0\u078A\u07A6\u078C\u07A8_\u0780\u07AA\u0786\u07AA\u0783\u07AA_\u0780\u07AE\u0782\u07A8\u0780\u07A8\u0783\u07AA".split("_"),
      months: "\u0796\u07AC\u0782\u07AA\u0787\u07A6\u0783\u07A9_\u078A\u07AC\u0784\u07B0\u0783\u07AA\u0787\u07A6\u0783\u07A9_\u0789\u07A7\u0783\u07A8\u0797\u07AA_\u0787\u07AD\u0795\u07B0\u0783\u07A9\u078D\u07AA_\u0789\u07AD_\u0796\u07AB\u0782\u07B0_\u0796\u07AA\u078D\u07A6\u0787\u07A8_\u0787\u07AF\u078E\u07A6\u0790\u07B0\u0793\u07AA_\u0790\u07AC\u0795\u07B0\u0793\u07AC\u0789\u07B0\u0784\u07A6\u0783\u07AA_\u0787\u07AE\u0786\u07B0\u0793\u07AF\u0784\u07A6\u0783\u07AA_\u0782\u07AE\u0788\u07AC\u0789\u07B0\u0784\u07A6\u0783\u07AA_\u0791\u07A8\u0790\u07AC\u0789\u07B0\u0784\u07A6\u0783\u07AA".split("_"),
      weekStart: 7,
      weekdaysShort: "\u0787\u07A7\u078B\u07A8\u0787\u07B0\u078C\u07A6_\u0780\u07AF\u0789\u07A6_\u0787\u07A6\u0782\u07B0\u078E\u07A7\u0783\u07A6_\u0784\u07AA\u078B\u07A6_\u0784\u07AA\u0783\u07A7\u0790\u07B0\u078A\u07A6\u078C\u07A8_\u0780\u07AA\u0786\u07AA\u0783\u07AA_\u0780\u07AE\u0782\u07A8\u0780\u07A8\u0783\u07AA".split("_"),
      monthsShort: "\u0796\u07AC\u0782\u07AA\u0787\u07A6\u0783\u07A9_\u078A\u07AC\u0784\u07B0\u0783\u07AA\u0787\u07A6\u0783\u07A9_\u0789\u07A7\u0783\u07A8\u0797\u07AA_\u0787\u07AD\u0795\u07B0\u0783\u07A9\u078D\u07AA_\u0789\u07AD_\u0796\u07AB\u0782\u07B0_\u0796\u07AA\u078D\u07A6\u0787\u07A8_\u0787\u07AF\u078E\u07A6\u0790\u07B0\u0793\u07AA_\u0790\u07AC\u0795\u07B0\u0793\u07AC\u0789\u07B0\u0784\u07A6\u0783\u07AA_\u0787\u07AE\u0786\u07B0\u0793\u07AF\u0784\u07A6\u0783\u07AA_\u0782\u07AE\u0788\u07AC\u0789\u07B0\u0784\u07A6\u0783\u07AA_\u0791\u07A8\u0790\u07AC\u0789\u07B0\u0784\u07A6\u0783\u07AA".split("_"),
      weekdaysMin: "\u0787\u07A7\u078B\u07A8_\u0780\u07AF\u0789\u07A6_\u0787\u07A6\u0782\u07B0_\u0784\u07AA\u078B\u07A6_\u0784\u07AA\u0783\u07A7_\u0780\u07AA\u0786\u07AA_\u0780\u07AE\u0782\u07A8".split("_"),
      ordinal: function ordinal29(n) {
        return n;
      },
      formats: {
        LT: "HH:mm",
        LTS: "HH:mm:ss",
        L: "D/M/YYYY",
        LL: "D MMMM YYYY",
        LLL: "D MMMM YYYY HH:mm",
        LLLL: "dddd D MMMM YYYY HH:mm"
      },
      relativeTime: {
        future: "\u078C\u07AC\u0783\u07AD\u078E\u07A6\u0787\u07A8 %s",
        past: "\u0786\u07AA\u0783\u07A8\u0782\u07B0 %s",
        s: "\u0790\u07A8\u0786\u07AA\u0782\u07B0\u078C\u07AA\u0786\u07AE\u0785\u07AC\u0787\u07B0",
        m: "\u0789\u07A8\u0782\u07A8\u0793\u07AC\u0787\u07B0",
        mm: "\u0789\u07A8\u0782\u07A8\u0793\u07AA %d",
        h: "\u078E\u07A6\u0791\u07A8\u0787\u07A8\u0783\u07AC\u0787\u07B0",
        hh: "\u078E\u07A6\u0791\u07A8\u0787\u07A8\u0783\u07AA %d",
        d: "\u078B\u07AA\u0788\u07A6\u0780\u07AC\u0787\u07B0",
        dd: "\u078B\u07AA\u0788\u07A6\u0790\u07B0 %d",
        M: "\u0789\u07A6\u0780\u07AC\u0787\u07B0",
        MM: "\u0789\u07A6\u0790\u07B0 %d",
        y: "\u0787\u07A6\u0780\u07A6\u0783\u07AC\u0787\u07B0",
        yy: "\u0787\u07A6\u0780\u07A6\u0783\u07AA %d"
      }
    };
    stdin_default2.locale(locale29, null, true);
    dv_default = locale29;
  }
});

// public/codesandbox-runtime/dayjs-locale/el.js
var el_exports = {};
__export(el_exports, {
  default: () => el_default
});
var locale30, el_default;
var init_el = __esm({
  "public/codesandbox-runtime/dayjs-locale/el.js"() {
    "use strict";
    init_dayjs();
    locale30 = {
      name: "el",
      weekdays: "\u039A\u03C5\u03C1\u03B9\u03B1\u03BA\u03AE_\u0394\u03B5\u03C5\u03C4\u03AD\u03C1\u03B1_\u03A4\u03C1\u03AF\u03C4\u03B7_\u03A4\u03B5\u03C4\u03AC\u03C1\u03C4\u03B7_\u03A0\u03AD\u03BC\u03C0\u03C4\u03B7_\u03A0\u03B1\u03C1\u03B1\u03C3\u03BA\u03B5\u03C5\u03AE_\u03A3\u03AC\u03B2\u03B2\u03B1\u03C4\u03BF".split("_"),
      weekdaysShort: "\u039A\u03C5\u03C1_\u0394\u03B5\u03C5_\u03A4\u03C1\u03B9_\u03A4\u03B5\u03C4_\u03A0\u03B5\u03BC_\u03A0\u03B1\u03C1_\u03A3\u03B1\u03B2".split("_"),
      weekdaysMin: "\u039A\u03C5_\u0394\u03B5_\u03A4\u03C1_\u03A4\u03B5_\u03A0\u03B5_\u03A0\u03B1_\u03A3\u03B1".split("_"),
      months: "\u0399\u03B1\u03BD\u03BF\u03C5\u03AC\u03C1\u03B9\u03BF\u03C2_\u03A6\u03B5\u03B2\u03C1\u03BF\u03C5\u03AC\u03C1\u03B9\u03BF\u03C2_\u039C\u03AC\u03C1\u03C4\u03B9\u03BF\u03C2_\u0391\u03C0\u03C1\u03AF\u03BB\u03B9\u03BF\u03C2_\u039C\u03AC\u03B9\u03BF\u03C2_\u0399\u03BF\u03CD\u03BD\u03B9\u03BF\u03C2_\u0399\u03BF\u03CD\u03BB\u03B9\u03BF\u03C2_\u0391\u03CD\u03B3\u03BF\u03C5\u03C3\u03C4\u03BF\u03C2_\u03A3\u03B5\u03C0\u03C4\u03AD\u03BC\u03B2\u03C1\u03B9\u03BF\u03C2_\u039F\u03BA\u03C4\u03CE\u03B2\u03C1\u03B9\u03BF\u03C2_\u039D\u03BF\u03AD\u03BC\u03B2\u03C1\u03B9\u03BF\u03C2_\u0394\u03B5\u03BA\u03AD\u03BC\u03B2\u03C1\u03B9\u03BF\u03C2".split("_"),
      monthsShort: "\u0399\u03B1\u03BD_\u03A6\u03B5\u03B2_\u039C\u03B1\u03C1_\u0391\u03C0\u03C1_\u039C\u03B1\u03B9_\u0399\u03BF\u03C5\u03BD_\u0399\u03BF\u03C5\u03BB_\u0391\u03C5\u03B3_\u03A3\u03B5\u03C0\u03C4_\u039F\u03BA\u03C4_\u039D\u03BF\u03B5_\u0394\u03B5\u03BA".split("_"),
      ordinal: function ordinal30(n) {
        return n;
      },
      weekStart: 1,
      relativeTime: {
        future: "\u03C3\u03B5 %s",
        past: "\u03C0\u03C1\u03B9\u03BD %s",
        s: "\u03BC\u03B5\u03C1\u03B9\u03BA\u03AC \u03B4\u03B5\u03C5\u03C4\u03B5\u03C1\u03CC\u03BB\u03B5\u03C0\u03C4\u03B1",
        m: "\u03AD\u03BD\u03B1 \u03BB\u03B5\u03C0\u03C4\u03CC",
        mm: "%d \u03BB\u03B5\u03C0\u03C4\u03AC",
        h: "\u03BC\u03AF\u03B1 \u03CE\u03C1\u03B1",
        hh: "%d \u03CE\u03C1\u03B5\u03C2",
        d: "\u03BC\u03AF\u03B1 \u03BC\u03AD\u03C1\u03B1",
        dd: "%d \u03BC\u03AD\u03C1\u03B5\u03C2",
        M: "\u03AD\u03BD\u03B1 \u03BC\u03AE\u03BD\u03B1",
        MM: "%d \u03BC\u03AE\u03BD\u03B5\u03C2",
        y: "\u03AD\u03BD\u03B1 \u03C7\u03C1\u03CC\u03BD\u03BF",
        yy: "%d \u03C7\u03C1\u03CC\u03BD\u03B9\u03B1"
      },
      formats: {
        LT: "h:mm A",
        LTS: "h:mm:ss A",
        L: "DD/MM/YYYY",
        LL: "D MMMM YYYY",
        LLL: "D MMMM YYYY h:mm A",
        LLLL: "dddd, D MMMM YYYY h:mm A"
      }
    };
    stdin_default2.locale(locale30, null, true);
    el_default = locale30;
  }
});

// public/codesandbox-runtime/dayjs-locale/en-au.js
var en_au_exports = {};
__export(en_au_exports, {
  default: () => en_au_default
});
var locale31, en_au_default;
var init_en_au = __esm({
  "public/codesandbox-runtime/dayjs-locale/en-au.js"() {
    "use strict";
    init_dayjs();
    locale31 = {
      name: "en-au",
      weekdays: "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),
      months: "January_February_March_April_May_June_July_August_September_October_November_December".split("_"),
      weekStart: 1,
      weekdaysShort: "Sun_Mon_Tue_Wed_Thu_Fri_Sat".split("_"),
      monthsShort: "Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec".split("_"),
      weekdaysMin: "Su_Mo_Tu_We_Th_Fr_Sa".split("_"),
      formats: {
        LT: "h:mm A",
        LTS: "h:mm:ss A",
        L: "DD/MM/YYYY",
        LL: "D MMMM YYYY",
        LLL: "D MMMM YYYY h:mm A",
        LLLL: "dddd, D MMMM YYYY h:mm A"
      },
      relativeTime: {
        future: "in %s",
        past: "%s ago",
        s: "a few seconds",
        m: "a minute",
        mm: "%d minutes",
        h: "an hour",
        hh: "%d hours",
        d: "a day",
        dd: "%d days",
        M: "a month",
        MM: "%d months",
        y: "a year",
        yy: "%d years"
      },
      ordinal: function ordinal31(n) {
        var s2 = ["th", "st", "nd", "rd"];
        var v = n % 100;
        return "[" + n + (s2[(v - 20) % 10] || s2[v] || s2[0]) + "]";
      }
    };
    stdin_default2.locale(locale31, null, true);
    en_au_default = locale31;
  }
});

// public/codesandbox-runtime/dayjs-locale/en-ca.js
var en_ca_exports = {};
__export(en_ca_exports, {
  default: () => en_ca_default
});
var locale32, en_ca_default;
var init_en_ca = __esm({
  "public/codesandbox-runtime/dayjs-locale/en-ca.js"() {
    "use strict";
    init_dayjs();
    locale32 = {
      name: "en-ca",
      weekdays: "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),
      months: "January_February_March_April_May_June_July_August_September_October_November_December".split("_"),
      weekdaysShort: "Sun_Mon_Tue_Wed_Thu_Fri_Sat".split("_"),
      monthsShort: "Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec".split("_"),
      weekdaysMin: "Su_Mo_Tu_We_Th_Fr_Sa".split("_"),
      ordinal: function ordinal32(n) {
        return n;
      },
      formats: {
        LT: "h:mm A",
        LTS: "h:mm:ss A",
        L: "YYYY-MM-DD",
        LL: "MMMM D, YYYY",
        LLL: "MMMM D, YYYY h:mm A",
        LLLL: "dddd, MMMM D, YYYY h:mm A"
      },
      relativeTime: {
        future: "in %s",
        past: "%s ago",
        s: "a few seconds",
        m: "a minute",
        mm: "%d minutes",
        h: "an hour",
        hh: "%d hours",
        d: "a day",
        dd: "%d days",
        M: "a month",
        MM: "%d months",
        y: "a year",
        yy: "%d years"
      }
    };
    stdin_default2.locale(locale32, null, true);
    en_ca_default = locale32;
  }
});

// public/codesandbox-runtime/dayjs-locale/en-gb.js
var en_gb_exports = {};
__export(en_gb_exports, {
  default: () => en_gb_default
});
var locale33, en_gb_default;
var init_en_gb = __esm({
  "public/codesandbox-runtime/dayjs-locale/en-gb.js"() {
    "use strict";
    init_dayjs();
    locale33 = {
      name: "en-gb",
      weekdays: "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),
      weekdaysShort: "Sun_Mon_Tue_Wed_Thu_Fri_Sat".split("_"),
      weekdaysMin: "Su_Mo_Tu_We_Th_Fr_Sa".split("_"),
      months: "January_February_March_April_May_June_July_August_September_October_November_December".split("_"),
      monthsShort: "Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec".split("_"),
      weekStart: 1,
      yearStart: 4,
      relativeTime: {
        future: "in %s",
        past: "%s ago",
        s: "a few seconds",
        m: "a minute",
        mm: "%d minutes",
        h: "an hour",
        hh: "%d hours",
        d: "a day",
        dd: "%d days",
        M: "a month",
        MM: "%d months",
        y: "a year",
        yy: "%d years"
      },
      formats: {
        LT: "HH:mm",
        LTS: "HH:mm:ss",
        L: "DD/MM/YYYY",
        LL: "D MMMM YYYY",
        LLL: "D MMMM YYYY HH:mm",
        LLLL: "dddd, D MMMM YYYY HH:mm"
      },
      ordinal: function ordinal33(n) {
        var s2 = ["th", "st", "nd", "rd"];
        var v = n % 100;
        return "[" + n + (s2[(v - 20) % 10] || s2[v] || s2[0]) + "]";
      }
    };
    stdin_default2.locale(locale33, null, true);
    en_gb_default = locale33;
  }
});

// public/codesandbox-runtime/dayjs-locale/en-ie.js
var en_ie_exports = {};
__export(en_ie_exports, {
  default: () => en_ie_default
});
var locale34, en_ie_default;
var init_en_ie = __esm({
  "public/codesandbox-runtime/dayjs-locale/en-ie.js"() {
    "use strict";
    init_dayjs();
    locale34 = {
      name: "en-ie",
      weekdays: "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),
      months: "January_February_March_April_May_June_July_August_September_October_November_December".split("_"),
      weekStart: 1,
      weekdaysShort: "Sun_Mon_Tue_Wed_Thu_Fri_Sat".split("_"),
      monthsShort: "Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec".split("_"),
      weekdaysMin: "Su_Mo_Tu_We_Th_Fr_Sa".split("_"),
      ordinal: function ordinal34(n) {
        return n;
      },
      formats: {
        LT: "HH:mm",
        LTS: "HH:mm:ss",
        L: "DD/MM/YYYY",
        LL: "D MMMM YYYY",
        LLL: "D MMMM YYYY HH:mm",
        LLLL: "dddd D MMMM YYYY HH:mm"
      },
      relativeTime: {
        future: "in %s",
        past: "%s ago",
        s: "a few seconds",
        m: "a minute",
        mm: "%d minutes",
        h: "an hour",
        hh: "%d hours",
        d: "a day",
        dd: "%d days",
        M: "a month",
        MM: "%d months",
        y: "a year",
        yy: "%d years"
      }
    };
    stdin_default2.locale(locale34, null, true);
    en_ie_default = locale34;
  }
});

// public/codesandbox-runtime/dayjs-locale/en-il.js
var en_il_exports = {};
__export(en_il_exports, {
  default: () => en_il_default
});
var locale35, en_il_default;
var init_en_il = __esm({
  "public/codesandbox-runtime/dayjs-locale/en-il.js"() {
    "use strict";
    init_dayjs();
    locale35 = {
      name: "en-il",
      weekdays: "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),
      months: "January_February_March_April_May_June_July_August_September_October_November_December".split("_"),
      weekdaysShort: "Sun_Mon_Tue_Wed_Thu_Fri_Sat".split("_"),
      monthsShort: "Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec".split("_"),
      weekdaysMin: "Su_Mo_Tu_We_Th_Fr_Sa".split("_"),
      ordinal: function ordinal35(n) {
        return n;
      },
      formats: {
        LT: "HH:mm",
        LTS: "HH:mm:ss",
        L: "DD/MM/YYYY",
        LL: "D MMMM YYYY",
        LLL: "D MMMM YYYY HH:mm",
        LLLL: "dddd, D MMMM YYYY HH:mm"
      },
      relativeTime: {
        future: "in %s",
        past: "%s ago",
        s: "a few seconds",
        m: "a minute",
        mm: "%d minutes",
        h: "an hour",
        hh: "%d hours",
        d: "a day",
        dd: "%d days",
        M: "a month",
        MM: "%d months",
        y: "a year",
        yy: "%d years"
      }
    };
    stdin_default2.locale(locale35, null, true);
    en_il_default = locale35;
  }
});

// public/codesandbox-runtime/dayjs-locale/en-in.js
var en_in_exports = {};
__export(en_in_exports, {
  default: () => en_in_default
});
var locale36, en_in_default;
var init_en_in = __esm({
  "public/codesandbox-runtime/dayjs-locale/en-in.js"() {
    "use strict";
    init_dayjs();
    locale36 = {
      name: "en-in",
      weekdays: "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),
      weekdaysShort: "Sun_Mon_Tue_Wed_Thu_Fri_Sat".split("_"),
      weekdaysMin: "Su_Mo_Tu_We_Th_Fr_Sa".split("_"),
      months: "January_February_March_April_May_June_July_August_September_October_November_December".split("_"),
      monthsShort: "Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec".split("_"),
      weekStart: 1,
      yearStart: 4,
      relativeTime: {
        future: "in %s",
        past: "%s ago",
        s: "a few seconds",
        m: "a minute",
        mm: "%d minutes",
        h: "an hour",
        hh: "%d hours",
        d: "a day",
        dd: "%d days",
        M: "a month",
        MM: "%d months",
        y: "a year",
        yy: "%d years"
      },
      formats: {
        LT: "HH:mm",
        LTS: "HH:mm:ss",
        L: "DD/MM/YYYY",
        LL: "D MMMM YYYY",
        LLL: "D MMMM YYYY HH:mm",
        LLLL: "dddd, D MMMM YYYY HH:mm"
      },
      ordinal: function ordinal36(n) {
        var s2 = ["th", "st", "nd", "rd"];
        var v = n % 100;
        return "[" + n + (s2[(v - 20) % 10] || s2[v] || s2[0]) + "]";
      }
    };
    stdin_default2.locale(locale36, null, true);
    en_in_default = locale36;
  }
});

// public/codesandbox-runtime/dayjs-locale/en-nz.js
var en_nz_exports = {};
__export(en_nz_exports, {
  default: () => en_nz_default
});
var locale37, en_nz_default;
var init_en_nz = __esm({
  "public/codesandbox-runtime/dayjs-locale/en-nz.js"() {
    "use strict";
    init_dayjs();
    locale37 = {
      name: "en-nz",
      weekdays: "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),
      months: "January_February_March_April_May_June_July_August_September_October_November_December".split("_"),
      weekStart: 1,
      weekdaysShort: "Sun_Mon_Tue_Wed_Thu_Fri_Sat".split("_"),
      monthsShort: "Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec".split("_"),
      weekdaysMin: "Su_Mo_Tu_We_Th_Fr_Sa".split("_"),
      ordinal: function ordinal37(n) {
        var s2 = ["th", "st", "nd", "rd"];
        var v = n % 100;
        return "[" + n + (s2[(v - 20) % 10] || s2[v] || s2[0]) + "]";
      },
      formats: {
        LT: "h:mm A",
        LTS: "h:mm:ss A",
        L: "DD/MM/YYYY",
        LL: "D MMMM YYYY",
        LLL: "D MMMM YYYY h:mm A",
        LLLL: "dddd, D MMMM YYYY h:mm A"
      },
      relativeTime: {
        future: "in %s",
        past: "%s ago",
        s: "a few seconds",
        m: "a minute",
        mm: "%d minutes",
        h: "an hour",
        hh: "%d hours",
        d: "a day",
        dd: "%d days",
        M: "a month",
        MM: "%d months",
        y: "a year",
        yy: "%d years"
      }
    };
    stdin_default2.locale(locale37, null, true);
    en_nz_default = locale37;
  }
});

// public/codesandbox-runtime/dayjs-locale/en-sg.js
var en_sg_exports = {};
__export(en_sg_exports, {
  default: () => en_sg_default
});
var locale38, en_sg_default;
var init_en_sg = __esm({
  "public/codesandbox-runtime/dayjs-locale/en-sg.js"() {
    "use strict";
    init_dayjs();
    locale38 = {
      name: "en-sg",
      weekdays: "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),
      months: "January_February_March_April_May_June_July_August_September_October_November_December".split("_"),
      weekStart: 1,
      weekdaysShort: "Sun_Mon_Tue_Wed_Thu_Fri_Sat".split("_"),
      monthsShort: "Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec".split("_"),
      weekdaysMin: "Su_Mo_Tu_We_Th_Fr_Sa".split("_"),
      ordinal: function ordinal38(n) {
        return n;
      },
      formats: {
        LT: "HH:mm",
        LTS: "HH:mm:ss",
        L: "DD/MM/YYYY",
        LL: "D MMMM YYYY",
        LLL: "D MMMM YYYY HH:mm",
        LLLL: "dddd, D MMMM YYYY HH:mm"
      },
      relativeTime: {
        future: "in %s",
        past: "%s ago",
        s: "a few seconds",
        m: "a minute",
        mm: "%d minutes",
        h: "an hour",
        hh: "%d hours",
        d: "a day",
        dd: "%d days",
        M: "a month",
        MM: "%d months",
        y: "a year",
        yy: "%d years"
      }
    };
    stdin_default2.locale(locale38, null, true);
    en_sg_default = locale38;
  }
});

// public/codesandbox-runtime/dayjs-locale/en-tt.js
var en_tt_exports = {};
__export(en_tt_exports, {
  default: () => en_tt_default
});
var locale39, en_tt_default;
var init_en_tt = __esm({
  "public/codesandbox-runtime/dayjs-locale/en-tt.js"() {
    "use strict";
    init_dayjs();
    locale39 = {
      name: "en-tt",
      weekdays: "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),
      weekdaysShort: "Sun_Mon_Tue_Wed_Thu_Fri_Sat".split("_"),
      weekdaysMin: "Su_Mo_Tu_We_Th_Fr_Sa".split("_"),
      months: "January_February_March_April_May_June_July_August_September_October_November_December".split("_"),
      monthsShort: "Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec".split("_"),
      weekStart: 1,
      yearStart: 4,
      relativeTime: {
        future: "in %s",
        past: "%s ago",
        s: "a few seconds",
        m: "a minute",
        mm: "%d minutes",
        h: "an hour",
        hh: "%d hours",
        d: "a day",
        dd: "%d days",
        M: "a month",
        MM: "%d months",
        y: "a year",
        yy: "%d years"
      },
      formats: {
        LT: "HH:mm",
        LTS: "HH:mm:ss",
        L: "DD/MM/YYYY",
        LL: "D MMMM YYYY",
        LLL: "D MMMM YYYY HH:mm",
        LLLL: "dddd, D MMMM YYYY HH:mm"
      },
      ordinal: function ordinal39(n) {
        var s2 = ["th", "st", "nd", "rd"];
        var v = n % 100;
        return "[" + n + (s2[(v - 20) % 10] || s2[v] || s2[0]) + "]";
      }
    };
    stdin_default2.locale(locale39, null, true);
    en_tt_default = locale39;
  }
});

// public/codesandbox-runtime/dayjs-locale/en.js
var en_exports = {};
__export(en_exports, {
  default: () => en_default
});
var en_default;
var init_en = __esm({
  "public/codesandbox-runtime/dayjs-locale/en.js"() {
    "use strict";
    en_default = {
      name: "en",
      weekdays: "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),
      months: "January_February_March_April_May_June_July_August_September_October_November_December".split("_"),
      ordinal: function ordinal40(n) {
        var s2 = ["th", "st", "nd", "rd"];
        var v = n % 100;
        return "[" + n + (s2[(v - 20) % 10] || s2[v] || s2[0]) + "]";
      }
    };
  }
});

// public/codesandbox-runtime/dayjs-locale/eo.js
var eo_exports = {};
__export(eo_exports, {
  default: () => eo_default
});
var locale40, eo_default;
var init_eo = __esm({
  "public/codesandbox-runtime/dayjs-locale/eo.js"() {
    "use strict";
    init_dayjs();
    locale40 = {
      name: "eo",
      weekdays: "diman\u0109o_lundo_mardo_merkredo_\u0135a\u016Ddo_vendredo_sabato".split("_"),
      months: "januaro_februaro_marto_aprilo_majo_junio_julio_a\u016Dgusto_septembro_oktobro_novembro_decembro".split("_"),
      weekStart: 1,
      weekdaysShort: "dim_lun_mard_merk_\u0135a\u016D_ven_sab".split("_"),
      monthsShort: "jan_feb_mar_apr_maj_jun_jul_a\u016Dg_sep_okt_nov_dec".split("_"),
      weekdaysMin: "di_lu_ma_me_\u0135a_ve_sa".split("_"),
      ordinal: function ordinal41(n) {
        return n;
      },
      formats: {
        LT: "HH:mm",
        LTS: "HH:mm:ss",
        L: "YYYY-MM-DD",
        LL: "D[-a de] MMMM, YYYY",
        LLL: "D[-a de] MMMM, YYYY HH:mm",
        LLLL: "dddd, [la] D[-a de] MMMM, YYYY HH:mm"
      },
      relativeTime: {
        future: "post %s",
        past: "anta\u016D %s",
        s: "sekundoj",
        m: "minuto",
        mm: "%d minutoj",
        h: "horo",
        hh: "%d horoj",
        d: "tago",
        dd: "%d tagoj",
        M: "monato",
        MM: "%d monatoj",
        y: "jaro",
        yy: "%d jaroj"
      }
    };
    stdin_default2.locale(locale40, null, true);
    eo_default = locale40;
  }
});

// public/codesandbox-runtime/dayjs-locale/es-do.js
var es_do_exports = {};
__export(es_do_exports, {
  default: () => es_do_default
});
var locale41, es_do_default;
var init_es_do = __esm({
  "public/codesandbox-runtime/dayjs-locale/es-do.js"() {
    "use strict";
    init_dayjs();
    locale41 = {
      name: "es-do",
      weekdays: "domingo_lunes_martes_mi\xE9rcoles_jueves_viernes_s\xE1bado".split("_"),
      weekdaysShort: "dom._lun._mar._mi\xE9._jue._vie._s\xE1b.".split("_"),
      weekdaysMin: "do_lu_ma_mi_ju_vi_s\xE1".split("_"),
      months: "enero_febrero_marzo_abril_mayo_junio_julio_agosto_septiembre_octubre_noviembre_diciembre".split("_"),
      monthsShort: "ene_feb_mar_abr_may_jun_jul_ago_sep_oct_nov_dic".split("_"),
      weekStart: 1,
      relativeTime: {
        future: "en %s",
        past: "hace %s",
        s: "unos segundos",
        m: "un minuto",
        mm: "%d minutos",
        h: "una hora",
        hh: "%d horas",
        d: "un d\xEDa",
        dd: "%d d\xEDas",
        M: "un mes",
        MM: "%d meses",
        y: "un a\xF1o",
        yy: "%d a\xF1os"
      },
      ordinal: function ordinal42(n) {
        return n + "\xBA";
      },
      formats: {
        LT: "h:mm A",
        LTS: "h:mm:ss A",
        L: "DD/MM/YYYY",
        LL: "D [de] MMMM [de] YYYY",
        LLL: "D [de] MMMM [de] YYYY h:mm A",
        LLLL: "dddd, D [de] MMMM [de] YYYY h:mm A"
      }
    };
    stdin_default2.locale(locale41, null, true);
    es_do_default = locale41;
  }
});

// public/codesandbox-runtime/dayjs-locale/es-mx.js
var es_mx_exports = {};
__export(es_mx_exports, {
  default: () => es_mx_default
});
var locale42, es_mx_default;
var init_es_mx = __esm({
  "public/codesandbox-runtime/dayjs-locale/es-mx.js"() {
    "use strict";
    init_dayjs();
    locale42 = {
      name: "es-mx",
      weekdays: "domingo_lunes_martes_mi\xE9rcoles_jueves_viernes_s\xE1bado".split("_"),
      weekdaysShort: "dom._lun._mar._mi\xE9._jue._vie._s\xE1b.".split("_"),
      weekdaysMin: "do_lu_ma_mi_ju_vi_s\xE1".split("_"),
      months: "enero_febrero_marzo_abril_mayo_junio_julio_agosto_septiembre_octubre_noviembre_diciembre".split("_"),
      monthsShort: "ene_feb_mar_abr_may_jun_jul_ago_sep_oct_nov_dic".split("_"),
      relativeTime: {
        future: "en %s",
        past: "hace %s",
        s: "unos segundos",
        m: "un minuto",
        mm: "%d minutos",
        h: "una hora",
        hh: "%d horas",
        d: "un d\xEDa",
        dd: "%d d\xEDas",
        M: "un mes",
        MM: "%d meses",
        y: "un a\xF1o",
        yy: "%d a\xF1os"
      },
      ordinal: function ordinal43(n) {
        return n + "\xBA";
      },
      formats: {
        LT: "H:mm",
        LTS: "H:mm:ss",
        L: "DD/MM/YYYY",
        LL: "D [de] MMMM [de] YYYY",
        LLL: "D [de] MMMM [de] YYYY H:mm",
        LLLL: "dddd, D [de] MMMM [de] YYYY H:mm"
      }
    };
    stdin_default2.locale(locale42, null, true);
    es_mx_default = locale42;
  }
});

// public/codesandbox-runtime/dayjs-locale/es-pr.js
var es_pr_exports = {};
__export(es_pr_exports, {
  default: () => es_pr_default
});
var locale43, es_pr_default;
var init_es_pr = __esm({
  "public/codesandbox-runtime/dayjs-locale/es-pr.js"() {
    "use strict";
    init_dayjs();
    locale43 = {
      name: "es-pr",
      monthsShort: "ene_feb_mar_abr_may_jun_jul_ago_sep_oct_nov_dic".split("_"),
      weekdays: "domingo_lunes_martes_mi\xE9rcoles_jueves_viernes_s\xE1bado".split("_"),
      weekdaysShort: "dom._lun._mar._mi\xE9._jue._vie._s\xE1b.".split("_"),
      weekdaysMin: "do_lu_ma_mi_ju_vi_s\xE1".split("_"),
      months: "enero_febrero_marzo_abril_mayo_junio_julio_agosto_septiembre_octubre_noviembre_diciembre".split("_"),
      weekStart: 1,
      formats: {
        LT: "h:mm A",
        LTS: "h:mm:ss A",
        L: "MM/DD/YYYY",
        LL: "D [de] MMMM [de] YYYY",
        LLL: "D [de] MMMM [de] YYYY h:mm A",
        LLLL: "dddd, D [de] MMMM [de] YYYY h:mm A"
      },
      relativeTime: {
        future: "en %s",
        past: "hace %s",
        s: "unos segundos",
        m: "un minuto",
        mm: "%d minutos",
        h: "una hora",
        hh: "%d horas",
        d: "un d\xEDa",
        dd: "%d d\xEDas",
        M: "un mes",
        MM: "%d meses",
        y: "un a\xF1o",
        yy: "%d a\xF1os"
      },
      ordinal: function ordinal44(n) {
        return n + "\xBA";
      }
    };
    stdin_default2.locale(locale43, null, true);
    es_pr_default = locale43;
  }
});

// public/codesandbox-runtime/dayjs-locale/es-us.js
var es_us_exports = {};
__export(es_us_exports, {
  default: () => es_us_default
});
var locale44, es_us_default;
var init_es_us = __esm({
  "public/codesandbox-runtime/dayjs-locale/es-us.js"() {
    "use strict";
    init_dayjs();
    locale44 = {
      name: "es-us",
      weekdays: "domingo_lunes_martes_mi\xE9rcoles_jueves_viernes_s\xE1bado".split("_"),
      weekdaysShort: "dom._lun._mar._mi\xE9._jue._vie._s\xE1b.".split("_"),
      weekdaysMin: "do_lu_ma_mi_ju_vi_s\xE1".split("_"),
      months: "enero_febrero_marzo_abril_mayo_junio_julio_agosto_septiembre_octubre_noviembre_diciembre".split("_"),
      monthsShort: "ene_feb_mar_abr_may_jun_jul_ago_sep_oct_nov_dic".split("_"),
      relativeTime: {
        future: "en %s",
        past: "hace %s",
        s: "unos segundos",
        m: "un minuto",
        mm: "%d minutos",
        h: "una hora",
        hh: "%d horas",
        d: "un d\xEDa",
        dd: "%d d\xEDas",
        M: "un mes",
        MM: "%d meses",
        y: "un a\xF1o",
        yy: "%d a\xF1os"
      },
      ordinal: function ordinal45(n) {
        return n + "\xBA";
      },
      formats: {
        LT: "h:mm A",
        LTS: "h:mm:ss A",
        L: "MM/DD/YYYY",
        LL: "D [de] MMMM [de] YYYY",
        LLL: "D [de] MMMM [de] YYYY h:mm A",
        LLLL: "dddd, D [de] MMMM [de] YYYY h:mm A"
      }
    };
    stdin_default2.locale(locale44, null, true);
    es_us_default = locale44;
  }
});

// public/codesandbox-runtime/dayjs-locale/es.js
var es_exports = {};
__export(es_exports, {
  default: () => es_default
});
var locale45, es_default;
var init_es = __esm({
  "public/codesandbox-runtime/dayjs-locale/es.js"() {
    "use strict";
    init_dayjs();
    locale45 = {
      name: "es",
      monthsShort: "ene_feb_mar_abr_may_jun_jul_ago_sep_oct_nov_dic".split("_"),
      weekdays: "domingo_lunes_martes_mi\xE9rcoles_jueves_viernes_s\xE1bado".split("_"),
      weekdaysShort: "dom._lun._mar._mi\xE9._jue._vie._s\xE1b.".split("_"),
      weekdaysMin: "do_lu_ma_mi_ju_vi_s\xE1".split("_"),
      months: "enero_febrero_marzo_abril_mayo_junio_julio_agosto_septiembre_octubre_noviembre_diciembre".split("_"),
      weekStart: 1,
      formats: {
        LT: "H:mm",
        LTS: "H:mm:ss",
        L: "DD/MM/YYYY",
        LL: "D [de] MMMM [de] YYYY",
        LLL: "D [de] MMMM [de] YYYY H:mm",
        LLLL: "dddd, D [de] MMMM [de] YYYY H:mm"
      },
      relativeTime: {
        future: "en %s",
        past: "hace %s",
        s: "unos segundos",
        m: "un minuto",
        mm: "%d minutos",
        h: "una hora",
        hh: "%d horas",
        d: "un d\xEDa",
        dd: "%d d\xEDas",
        M: "un mes",
        MM: "%d meses",
        y: "un a\xF1o",
        yy: "%d a\xF1os"
      },
      ordinal: function ordinal46(n) {
        return n + "\xBA";
      }
    };
    stdin_default2.locale(locale45, null, true);
    es_default = locale45;
  }
});

// public/codesandbox-runtime/dayjs-locale/et.js
var et_exports = {};
__export(et_exports, {
  default: () => et_default
});
function relativeTimeWithTense(number, withoutSuffix, key, isFuture) {
  var format = {
    s: ["m\xF5ne sekundi", "m\xF5ni sekund", "paar sekundit"],
    m: ["\xFChe minuti", "\xFCks minut"],
    mm: ["%d minuti", "%d minutit"],
    h: ["\xFChe tunni", "tund aega", "\xFCks tund"],
    hh: ["%d tunni", "%d tundi"],
    d: ["\xFChe p\xE4eva", "\xFCks p\xE4ev"],
    M: ["kuu aja", "kuu aega", "\xFCks kuu"],
    MM: ["%d kuu", "%d kuud"],
    y: ["\xFChe aasta", "aasta", "\xFCks aasta"],
    yy: ["%d aasta", "%d aastat"]
  };
  if (withoutSuffix) {
    return (format[key][2] ? format[key][2] : format[key][1]).replace("%d", number);
  }
  return (isFuture ? format[key][0] : format[key][1]).replace("%d", number);
}
var locale46, et_default;
var init_et = __esm({
  "public/codesandbox-runtime/dayjs-locale/et.js"() {
    "use strict";
    init_dayjs();
    locale46 = {
      name: "et",
      // Estonian
      weekdays: "p\xFChap\xE4ev_esmasp\xE4ev_teisip\xE4ev_kolmap\xE4ev_neljap\xE4ev_reede_laup\xE4ev".split("_"),
      // Note weekdays are not capitalized in Estonian
      weekdaysShort: "P_E_T_K_N_R_L".split("_"),
      // There is no short form of weekdays in Estonian except this 1 letter format so it is used for both 'weekdaysShort' and 'weekdaysMin'
      weekdaysMin: "P_E_T_K_N_R_L".split("_"),
      months: "jaanuar_veebruar_m\xE4rts_aprill_mai_juuni_juuli_august_september_oktoober_november_detsember".split("_"),
      // Note month names are not capitalized in Estonian
      monthsShort: "jaan_veebr_m\xE4rts_apr_mai_juuni_juuli_aug_sept_okt_nov_dets".split("_"),
      ordinal: function ordinal47(n) {
        return n + ".";
      },
      weekStart: 1,
      relativeTime: {
        future: "%s p\xE4rast",
        past: "%s tagasi",
        s: relativeTimeWithTense,
        m: relativeTimeWithTense,
        mm: relativeTimeWithTense,
        h: relativeTimeWithTense,
        hh: relativeTimeWithTense,
        d: relativeTimeWithTense,
        dd: "%d p\xE4eva",
        M: relativeTimeWithTense,
        MM: relativeTimeWithTense,
        y: relativeTimeWithTense,
        yy: relativeTimeWithTense
      },
      formats: {
        LT: "H:mm",
        LTS: "H:mm:ss",
        L: "DD.MM.YYYY",
        LL: "D. MMMM YYYY",
        LLL: "D. MMMM YYYY H:mm",
        LLLL: "dddd, D. MMMM YYYY H:mm"
      }
    };
    stdin_default2.locale(locale46, null, true);
    et_default = locale46;
  }
});

// public/codesandbox-runtime/dayjs-locale/eu.js
var eu_exports = {};
__export(eu_exports, {
  default: () => eu_default
});
var locale47, eu_default;
var init_eu = __esm({
  "public/codesandbox-runtime/dayjs-locale/eu.js"() {
    "use strict";
    init_dayjs();
    locale47 = {
      name: "eu",
      weekdays: "igandea_astelehena_asteartea_asteazkena_osteguna_ostirala_larunbata".split("_"),
      months: "urtarrila_otsaila_martxoa_apirila_maiatza_ekaina_uztaila_abuztua_iraila_urria_azaroa_abendua".split("_"),
      weekStart: 1,
      weekdaysShort: "ig._al._ar._az._og._ol._lr.".split("_"),
      monthsShort: "urt._ots._mar._api._mai._eka._uzt._abu._ira._urr._aza._abe.".split("_"),
      weekdaysMin: "ig_al_ar_az_og_ol_lr".split("_"),
      ordinal: function ordinal48(n) {
        return n;
      },
      formats: {
        LT: "HH:mm",
        LTS: "HH:mm:ss",
        L: "YYYY-MM-DD",
        LL: "YYYY[ko] MMMM[ren] D[a]",
        LLL: "YYYY[ko] MMMM[ren] D[a] HH:mm",
        LLLL: "dddd, YYYY[ko] MMMM[ren] D[a] HH:mm",
        l: "YYYY-M-D",
        ll: "YYYY[ko] MMM D[a]",
        lll: "YYYY[ko] MMM D[a] HH:mm",
        llll: "ddd, YYYY[ko] MMM D[a] HH:mm"
      },
      relativeTime: {
        future: "%s barru",
        past: "duela %s",
        s: "segundo batzuk",
        m: "minutu bat",
        mm: "%d minutu",
        h: "ordu bat",
        hh: "%d ordu",
        d: "egun bat",
        dd: "%d egun",
        M: "hilabete bat",
        MM: "%d hilabete",
        y: "urte bat",
        yy: "%d urte"
      }
    };
    stdin_default2.locale(locale47, null, true);
    eu_default = locale47;
  }
});

// public/codesandbox-runtime/dayjs-locale/fa.js
var fa_exports = {};
__export(fa_exports, {
  default: () => fa_default
});
var locale48, fa_default;
var init_fa = __esm({
  "public/codesandbox-runtime/dayjs-locale/fa.js"() {
    "use strict";
    init_dayjs();
    locale48 = {
      name: "fa",
      weekdays: "\u06CC\u06A9\u200C\u0634\u0646\u0628\u0647_\u062F\u0648\u0634\u0646\u0628\u0647_\u0633\u0647\u200C\u0634\u0646\u0628\u0647_\u0686\u0647\u0627\u0631\u0634\u0646\u0628\u0647_\u067E\u0646\u062C\u200C\u0634\u0646\u0628\u0647_\u062C\u0645\u0639\u0647_\u0634\u0646\u0628\u0647".split("_"),
      weekdaysShort: "\u06CC\u06A9\u200C\u0634\u0646\u0628\u0647_\u062F\u0648\u0634\u0646\u0628\u0647_\u0633\u0647\u200C\u0634\u0646\u0628\u0647_\u0686\u0647\u0627\u0631\u0634\u0646\u0628\u0647_\u067E\u0646\u062C\u200C\u0634\u0646\u0628\u0647_\u062C\u0645\u0639\u0647_\u0634\u0646\u0628\u0647".split("_"),
      weekdaysMin: "\u06CC_\u062F_\u0633_\u0686_\u067E_\u062C_\u0634".split("_"),
      weekStart: 6,
      months: "\u0698\u0627\u0646\u0648\u06CC\u0647_\u0641\u0648\u0631\u06CC\u0647_\u0645\u0627\u0631\u0633_\u0622\u0648\u0631\u06CC\u0644_\u0645\u0647_\u0698\u0648\u0626\u0646_\u0698\u0648\u0626\u06CC\u0647_\u0627\u0648\u062A_\u0633\u067E\u062A\u0627\u0645\u0628\u0631_\u0627\u06A9\u062A\u0628\u0631_\u0646\u0648\u0627\u0645\u0628\u0631_\u062F\u0633\u0627\u0645\u0628\u0631".split("_"),
      monthsShort: "\u0698\u0627\u0646\u0648\u06CC\u0647_\u0641\u0648\u0631\u06CC\u0647_\u0645\u0627\u0631\u0633_\u0622\u0648\u0631\u06CC\u0644_\u0645\u0647_\u0698\u0648\u0626\u0646_\u0698\u0648\u0626\u06CC\u0647_\u0627\u0648\u062A_\u0633\u067E\u062A\u0627\u0645\u0628\u0631_\u0627\u06A9\u062A\u0628\u0631_\u0646\u0648\u0627\u0645\u0628\u0631_\u062F\u0633\u0627\u0645\u0628\u0631".split("_"),
      ordinal: function ordinal49(n) {
        return n;
      },
      formats: {
        LT: "HH:mm",
        LTS: "HH:mm:ss",
        L: "DD/MM/YYYY",
        LL: "D MMMM YYYY",
        LLL: "D MMMM YYYY HH:mm",
        LLLL: "dddd, D MMMM YYYY HH:mm"
      },
      relativeTime: {
        future: "\u062F\u0631 %s",
        past: "%s \u067E\u06CC\u0634",
        s: "\u0686\u0646\u062F \u062B\u0627\u0646\u06CC\u0647",
        m: "\u06CC\u06A9 \u062F\u0642\u06CC\u0642\u0647",
        mm: "%d \u062F\u0642\u06CC\u0642\u0647",
        h: "\u06CC\u06A9 \u0633\u0627\u0639\u062A",
        hh: "%d \u0633\u0627\u0639\u062A",
        d: "\u06CC\u06A9 \u0631\u0648\u0632",
        dd: "%d \u0631\u0648\u0632",
        M: "\u06CC\u06A9 \u0645\u0627\u0647",
        MM: "%d \u0645\u0627\u0647",
        y: "\u06CC\u06A9 \u0633\u0627\u0644",
        yy: "%d \u0633\u0627\u0644"
      }
    };
    stdin_default2.locale(locale48, null, true);
    fa_default = locale48;
  }
});

// public/codesandbox-runtime/dayjs-locale/fi.js
var fi_exports = {};
__export(fi_exports, {
  default: () => fi_default
});
function relativeTimeFormatter4(number, withoutSuffix, key, isFuture) {
  var past = {
    s: "muutama sekunti",
    m: "minuutti",
    mm: "%d minuuttia",
    h: "tunti",
    hh: "%d tuntia",
    d: "p\xE4iv\xE4",
    dd: "%d p\xE4iv\xE4\xE4",
    M: "kuukausi",
    MM: "%d kuukautta",
    y: "vuosi",
    yy: "%d vuotta",
    numbers: "nolla_yksi_kaksi_kolme_nelj\xE4_viisi_kuusi_seitsem\xE4n_kahdeksan_yhdeks\xE4n".split("_")
  };
  var future = {
    s: "muutaman sekunnin",
    m: "minuutin",
    mm: "%d minuutin",
    h: "tunnin",
    hh: "%d tunnin",
    d: "p\xE4iv\xE4n",
    dd: "%d p\xE4iv\xE4n",
    M: "kuukauden",
    MM: "%d kuukauden",
    y: "vuoden",
    yy: "%d vuoden",
    numbers: "nollan_yhden_kahden_kolmen_nelj\xE4n_viiden_kuuden_seitsem\xE4n_kahdeksan_yhdeks\xE4n".split("_")
  };
  var words = isFuture && !withoutSuffix ? future : past;
  var result = words[key];
  if (number < 10) {
    return result.replace("%d", words.numbers[number]);
  }
  return result.replace("%d", number);
}
var locale49, fi_default;
var init_fi = __esm({
  "public/codesandbox-runtime/dayjs-locale/fi.js"() {
    "use strict";
    init_dayjs();
    locale49 = {
      name: "fi",
      // Finnish
      weekdays: "sunnuntai_maanantai_tiistai_keskiviikko_torstai_perjantai_lauantai".split("_"),
      // Note weekdays are not capitalized in Finnish
      weekdaysShort: "su_ma_ti_ke_to_pe_la".split("_"),
      // There is no short form of weekdays in Finnish except this 2 letter format so it is used for both 'weekdaysShort' and 'weekdaysMin'
      weekdaysMin: "su_ma_ti_ke_to_pe_la".split("_"),
      months: "tammikuu_helmikuu_maaliskuu_huhtikuu_toukokuu_kes\xE4kuu_hein\xE4kuu_elokuu_syyskuu_lokakuu_marraskuu_joulukuu".split("_"),
      // Note month names are not capitalized in Finnish
      monthsShort: "tammi_helmi_maalis_huhti_touko_kes\xE4_hein\xE4_elo_syys_loka_marras_joulu".split("_"),
      ordinal: function ordinal50(n) {
        return n + ".";
      },
      weekStart: 1,
      yearStart: 4,
      relativeTime: {
        future: "%s p\xE4\xE4st\xE4",
        past: "%s sitten",
        s: relativeTimeFormatter4,
        m: relativeTimeFormatter4,
        mm: relativeTimeFormatter4,
        h: relativeTimeFormatter4,
        hh: relativeTimeFormatter4,
        d: relativeTimeFormatter4,
        dd: relativeTimeFormatter4,
        M: relativeTimeFormatter4,
        MM: relativeTimeFormatter4,
        y: relativeTimeFormatter4,
        yy: relativeTimeFormatter4
      },
      formats: {
        LT: "HH.mm",
        LTS: "HH.mm.ss",
        L: "DD.MM.YYYY",
        LL: "D. MMMM[ta] YYYY",
        LLL: "D. MMMM[ta] YYYY, [klo] HH.mm",
        LLLL: "dddd, D. MMMM[ta] YYYY, [klo] HH.mm",
        l: "D.M.YYYY",
        ll: "D. MMM YYYY",
        lll: "D. MMM YYYY, [klo] HH.mm",
        llll: "ddd, D. MMM YYYY, [klo] HH.mm"
      }
    };
    stdin_default2.locale(locale49, null, true);
    fi_default = locale49;
  }
});

// public/codesandbox-runtime/dayjs-locale/fo.js
var fo_exports = {};
__export(fo_exports, {
  default: () => fo_default
});
var locale50, fo_default;
var init_fo = __esm({
  "public/codesandbox-runtime/dayjs-locale/fo.js"() {
    "use strict";
    init_dayjs();
    locale50 = {
      name: "fo",
      weekdays: "sunnudagur_m\xE1nadagur_t\xFDsdagur_mikudagur_h\xF3sdagur_fr\xEDggjadagur_leygardagur".split("_"),
      months: "januar_februar_mars_apr\xEDl_mai_juni_juli_august_september_oktober_november_desember".split("_"),
      weekStart: 1,
      weekdaysShort: "sun_m\xE1n_t\xFDs_mik_h\xF3s_fr\xED_ley".split("_"),
      monthsShort: "jan_feb_mar_apr_mai_jun_jul_aug_sep_okt_nov_des".split("_"),
      weekdaysMin: "su_m\xE1_t\xFD_mi_h\xF3_fr_le".split("_"),
      ordinal: function ordinal51(n) {
        return n;
      },
      formats: {
        LT: "HH:mm",
        LTS: "HH:mm:ss",
        L: "DD/MM/YYYY",
        LL: "D MMMM YYYY",
        LLL: "D MMMM YYYY HH:mm",
        LLLL: "dddd D. MMMM, YYYY HH:mm"
      },
      relativeTime: {
        future: "um %s",
        past: "%s s\xED\xF0ani",
        s: "f\xE1 sekund",
        m: "ein minuttur",
        mm: "%d minuttir",
        h: "ein t\xEDmi",
        hh: "%d t\xEDmar",
        d: "ein dagur",
        dd: "%d dagar",
        M: "ein m\xE1na\xF0ur",
        MM: "%d m\xE1na\xF0ir",
        y: "eitt \xE1r",
        yy: "%d \xE1r"
      }
    };
    stdin_default2.locale(locale50, null, true);
    fo_default = locale50;
  }
});

// public/codesandbox-runtime/dayjs-locale/fr-ca.js
var fr_ca_exports = {};
__export(fr_ca_exports, {
  default: () => fr_ca_default
});
var locale51, fr_ca_default;
var init_fr_ca = __esm({
  "public/codesandbox-runtime/dayjs-locale/fr-ca.js"() {
    "use strict";
    init_dayjs();
    locale51 = {
      name: "fr-ca",
      weekdays: "dimanche_lundi_mardi_mercredi_jeudi_vendredi_samedi".split("_"),
      months: "janvier_f\xE9vrier_mars_avril_mai_juin_juillet_ao\xFBt_septembre_octobre_novembre_d\xE9cembre".split("_"),
      weekdaysShort: "dim._lun._mar._mer._jeu._ven._sam.".split("_"),
      monthsShort: "janv._f\xE9vr._mars_avr._mai_juin_juil._ao\xFBt_sept._oct._nov._d\xE9c.".split("_"),
      weekdaysMin: "di_lu_ma_me_je_ve_sa".split("_"),
      ordinal: function ordinal52(n) {
        return n;
      },
      formats: {
        LT: "HH:mm",
        LTS: "HH:mm:ss",
        L: "YYYY-MM-DD",
        LL: "D MMMM YYYY",
        LLL: "D MMMM YYYY HH:mm",
        LLLL: "dddd D MMMM YYYY HH:mm"
      },
      relativeTime: {
        future: "dans %s",
        past: "il y a %s",
        s: "quelques secondes",
        m: "une minute",
        mm: "%d minutes",
        h: "une heure",
        hh: "%d heures",
        d: "un jour",
        dd: "%d jours",
        M: "un mois",
        MM: "%d mois",
        y: "un an",
        yy: "%d ans"
      }
    };
    stdin_default2.locale(locale51, null, true);
    fr_ca_default = locale51;
  }
});

// public/codesandbox-runtime/dayjs-locale/fr-ch.js
var fr_ch_exports = {};
__export(fr_ch_exports, {
  default: () => fr_ch_default
});
var locale52, fr_ch_default;
var init_fr_ch = __esm({
  "public/codesandbox-runtime/dayjs-locale/fr-ch.js"() {
    "use strict";
    init_dayjs();
    locale52 = {
      name: "fr-ch",
      weekdays: "dimanche_lundi_mardi_mercredi_jeudi_vendredi_samedi".split("_"),
      months: "janvier_f\xE9vrier_mars_avril_mai_juin_juillet_ao\xFBt_septembre_octobre_novembre_d\xE9cembre".split("_"),
      weekStart: 1,
      weekdaysShort: "dim._lun._mar._mer._jeu._ven._sam.".split("_"),
      monthsShort: "janv._f\xE9vr._mars_avr._mai_juin_juil._ao\xFBt_sept._oct._nov._d\xE9c.".split("_"),
      weekdaysMin: "di_lu_ma_me_je_ve_sa".split("_"),
      ordinal: function ordinal53(n) {
        return n;
      },
      formats: {
        LT: "HH:mm",
        LTS: "HH:mm:ss",
        L: "DD.MM.YYYY",
        LL: "D MMMM YYYY",
        LLL: "D MMMM YYYY HH:mm",
        LLLL: "dddd D MMMM YYYY HH:mm"
      },
      relativeTime: {
        future: "dans %s",
        past: "il y a %s",
        s: "quelques secondes",
        m: "une minute",
        mm: "%d minutes",
        h: "une heure",
        hh: "%d heures",
        d: "un jour",
        dd: "%d jours",
        M: "un mois",
        MM: "%d mois",
        y: "un an",
        yy: "%d ans"
      }
    };
    stdin_default2.locale(locale52, null, true);
    fr_ch_default = locale52;
  }
});

// public/codesandbox-runtime/dayjs-locale/fr.js
var fr_exports = {};
__export(fr_exports, {
  default: () => fr_default
});
var locale53, fr_default;
var init_fr = __esm({
  "public/codesandbox-runtime/dayjs-locale/fr.js"() {
    "use strict";
    init_dayjs();
    locale53 = {
      name: "fr",
      weekdays: "dimanche_lundi_mardi_mercredi_jeudi_vendredi_samedi".split("_"),
      weekdaysShort: "dim._lun._mar._mer._jeu._ven._sam.".split("_"),
      weekdaysMin: "di_lu_ma_me_je_ve_sa".split("_"),
      months: "janvier_f\xE9vrier_mars_avril_mai_juin_juillet_ao\xFBt_septembre_octobre_novembre_d\xE9cembre".split("_"),
      monthsShort: "janv._f\xE9vr._mars_avr._mai_juin_juil._ao\xFBt_sept._oct._nov._d\xE9c.".split("_"),
      weekStart: 1,
      yearStart: 4,
      formats: {
        LT: "HH:mm",
        LTS: "HH:mm:ss",
        L: "DD/MM/YYYY",
        LL: "D MMMM YYYY",
        LLL: "D MMMM YYYY HH:mm",
        LLLL: "dddd D MMMM YYYY HH:mm"
      },
      relativeTime: {
        future: "dans %s",
        past: "il y a %s",
        s: "quelques secondes",
        m: "une minute",
        mm: "%d minutes",
        h: "une heure",
        hh: "%d heures",
        d: "un jour",
        dd: "%d jours",
        M: "un mois",
        MM: "%d mois",
        y: "un an",
        yy: "%d ans"
      },
      ordinal: function ordinal54(n) {
        var o = n === 1 ? "er" : "";
        return "" + n + o;
      }
    };
    stdin_default2.locale(locale53, null, true);
    fr_default = locale53;
  }
});

// public/codesandbox-runtime/dayjs-locale/fy.js
var fy_exports = {};
__export(fy_exports, {
  default: () => fy_default
});
var locale54, fy_default;
var init_fy = __esm({
  "public/codesandbox-runtime/dayjs-locale/fy.js"() {
    "use strict";
    init_dayjs();
    locale54 = {
      name: "fy",
      weekdays: "snein_moandei_tiisdei_woansdei_tongersdei_freed_sneon".split("_"),
      months: "jannewaris_febrewaris_maart_april_maaie_juny_july_augustus_septimber_oktober_novimber_desimber".split("_"),
      monthsShort: "jan._feb._mrt._apr._mai_jun._jul._aug._sep._okt._nov._des.".split("_"),
      weekStart: 1,
      weekdaysShort: "si._mo._ti._wo._to._fr._so.".split("_"),
      weekdaysMin: "Si_Mo_Ti_Wo_To_Fr_So".split("_"),
      ordinal: function ordinal55(n) {
        return n;
      },
      formats: {
        LT: "HH:mm",
        LTS: "HH:mm:ss",
        L: "DD-MM-YYYY",
        LL: "D MMMM YYYY",
        LLL: "D MMMM YYYY HH:mm",
        LLLL: "dddd D MMMM YYYY HH:mm"
      },
      relativeTime: {
        future: "oer %s",
        past: "%s lyn",
        s: "in pear sekonden",
        m: "ien min\xFAt",
        mm: "%d minuten",
        h: "ien oere",
        hh: "%d oeren",
        d: "ien dei",
        dd: "%d dagen",
        M: "ien moanne",
        MM: "%d moannen",
        y: "ien jier",
        yy: "%d jierren"
      }
    };
    stdin_default2.locale(locale54, null, true);
    fy_default = locale54;
  }
});

// public/codesandbox-runtime/dayjs-locale/ga.js
var ga_exports = {};
__export(ga_exports, {
  default: () => ga_default
});
var locale55, ga_default;
var init_ga = __esm({
  "public/codesandbox-runtime/dayjs-locale/ga.js"() {
    "use strict";
    init_dayjs();
    locale55 = {
      name: "ga",
      weekdays: "D\xE9 Domhnaigh_D\xE9 Luain_D\xE9 M\xE1irt_D\xE9 C\xE9adaoin_D\xE9ardaoin_D\xE9 hAoine_D\xE9 Sathairn".split("_"),
      months: "Ean\xE1ir_Feabhra_M\xE1rta_Aibre\xE1n_Bealtaine_Meitheamh_I\xFAil_L\xFAnasa_Me\xE1n F\xF3mhair_Deireadh F\xF3mhair_Samhain_Nollaig".split("_"),
      weekStart: 1,
      weekdaysShort: "Dom_Lua_M\xE1i_C\xE9a_D\xE9a_Aoi_Sat".split("_"),
      monthsShort: "Ean_Fea_M\xE1r_Aib_Beal_Mei_I\xFAil_L\xFAn_MF\xF3mh_DF\xF3mh_Samh_Noll".split("_"),
      weekdaysMin: "Do_Lu_M\xE1_C\xE9_D\xE9_Ao_Sa".split("_"),
      ordinal: function ordinal56(n) {
        return n;
      },
      formats: {
        LT: "HH:mm",
        LTS: "HH:mm:ss",
        L: "DD/MM/YYYY",
        LL: "D MMMM YYYY",
        LLL: "D MMMM YYYY HH:mm",
        LLLL: "dddd, D MMMM YYYY HH:mm"
      },
      relativeTime: {
        future: "i %s",
        past: "%s \xF3 shin",
        s: "c\xFApla soicind",
        m: "n\xF3im\xE9ad",
        mm: "%d n\xF3im\xE9ad",
        h: "uair an chloig",
        hh: "%d uair an chloig",
        d: "l\xE1",
        dd: "%d l\xE1",
        M: "m\xED",
        MM: "%d m\xED",
        y: "bliain",
        yy: "%d bliain"
      }
    };
    stdin_default2.locale(locale55, null, true);
    ga_default = locale55;
  }
});

// public/codesandbox-runtime/dayjs-locale/gd.js
var gd_exports = {};
__export(gd_exports, {
  default: () => gd_default
});
var locale56, gd_default;
var init_gd = __esm({
  "public/codesandbox-runtime/dayjs-locale/gd.js"() {
    "use strict";
    init_dayjs();
    locale56 = {
      name: "gd",
      weekdays: "Did\xF2mhnaich_Diluain_Dim\xE0irt_Diciadain_Diardaoin_Dihaoine_Disathairne".split("_"),
      months: "Am Faoilleach_An Gearran_Am M\xE0rt_An Giblean_An C\xE8itean_An t-\xD2gmhios_An t-Iuchar_An L\xF9nastal_An t-Sultain_An D\xE0mhair_An t-Samhain_An D\xF9bhlachd".split("_"),
      weekStart: 1,
      weekdaysShort: "Did_Dil_Dim_Dic_Dia_Dih_Dis".split("_"),
      monthsShort: "Faoi_Gear_M\xE0rt_Gibl_C\xE8it_\xD2gmh_Iuch_L\xF9n_Sult_D\xE0mh_Samh_D\xF9bh".split("_"),
      weekdaysMin: "D\xF2_Lu_M\xE0_Ci_Ar_Ha_Sa".split("_"),
      ordinal: function ordinal57(n) {
        return n;
      },
      formats: {
        LT: "HH:mm",
        LTS: "HH:mm:ss",
        L: "DD/MM/YYYY",
        LL: "D MMMM YYYY",
        LLL: "D MMMM YYYY HH:mm",
        LLLL: "dddd, D MMMM YYYY HH:mm"
      },
      relativeTime: {
        future: "ann an %s",
        past: "bho chionn %s",
        s: "beagan diogan",
        m: "mionaid",
        mm: "%d mionaidean",
        h: "uair",
        hh: "%d uairean",
        d: "latha",
        dd: "%d latha",
        M: "m\xECos",
        MM: "%d m\xECosan",
        y: "bliadhna",
        yy: "%d bliadhna"
      }
    };
    stdin_default2.locale(locale56, null, true);
    gd_default = locale56;
  }
});

// public/codesandbox-runtime/dayjs-locale/gl.js
var gl_exports = {};
__export(gl_exports, {
  default: () => gl_default
});
var locale57, gl_default;
var init_gl = __esm({
  "public/codesandbox-runtime/dayjs-locale/gl.js"() {
    "use strict";
    init_dayjs();
    locale57 = {
      name: "gl",
      weekdays: "domingo_luns_martes_m\xE9rcores_xoves_venres_s\xE1bado".split("_"),
      months: "xaneiro_febreiro_marzo_abril_maio_xu\xF1o_xullo_agosto_setembro_outubro_novembro_decembro".split("_"),
      weekStart: 1,
      weekdaysShort: "dom._lun._mar._m\xE9r._xov._ven._s\xE1b.".split("_"),
      monthsShort: "xan._feb._mar._abr._mai._xu\xF1._xul._ago._set._out._nov._dec.".split("_"),
      weekdaysMin: "do_lu_ma_m\xE9_xo_ve_s\xE1".split("_"),
      ordinal: function ordinal58(n) {
        return n + "\xBA";
      },
      formats: {
        LT: "H:mm",
        LTS: "H:mm:ss",
        L: "DD/MM/YYYY",
        LL: "D [de] MMMM [de] YYYY",
        LLL: "D [de] MMMM [de] YYYY H:mm",
        LLLL: "dddd, D [de] MMMM [de] YYYY H:mm"
      },
      relativeTime: {
        future: "en %s",
        past: "fai %s",
        s: "uns segundos",
        m: "un minuto",
        mm: "%d minutos",
        h: "unha hora",
        hh: "%d horas",
        d: "un d\xEDa",
        dd: "%d d\xEDas",
        M: "un mes",
        MM: "%d meses",
        y: "un ano",
        yy: "%d anos"
      }
    };
    stdin_default2.locale(locale57, null, true);
    gl_default = locale57;
  }
});

// public/codesandbox-runtime/dayjs-locale/gom-latn.js
var gom_latn_exports = {};
__export(gom_latn_exports, {
  default: () => gom_latn_default
});
var locale58, gom_latn_default;
var init_gom_latn = __esm({
  "public/codesandbox-runtime/dayjs-locale/gom-latn.js"() {
    "use strict";
    init_dayjs();
    locale58 = {
      name: "gom-latn",
      weekdays: "Aitar_Somar_Mongllar_Budvar_Brestar_Sukrar_Son'var".split("_"),
      months: "Janer_Febrer_Mars_Abril_Mai_Jun_Julai_Agost_Setembr_Otubr_Novembr_Dezembr".split("_"),
      weekStart: 1,
      weekdaysShort: "Ait._Som._Mon._Bud._Bre._Suk._Son.".split("_"),
      monthsShort: "Jan._Feb._Mars_Abr._Mai_Jun_Jul._Ago._Set._Otu._Nov._Dez.".split("_"),
      weekdaysMin: "Ai_Sm_Mo_Bu_Br_Su_Sn".split("_"),
      ordinal: function ordinal59(n) {
        return n;
      },
      formats: {
        LT: "A h:mm [vazta]",
        LTS: "A h:mm:ss [vazta]",
        L: "DD-MM-YYYY",
        LL: "D MMMM YYYY",
        LLL: "D MMMM YYYY A h:mm [vazta]",
        LLLL: "dddd, MMMM[achea] Do, YYYY, A h:mm [vazta]",
        llll: "ddd, D MMM YYYY, A h:mm [vazta]"
      }
    };
    stdin_default2.locale(locale58, null, true);
    gom_latn_default = locale58;
  }
});

// public/codesandbox-runtime/dayjs-locale/gu.js
var gu_exports = {};
__export(gu_exports, {
  default: () => gu_default
});
var locale59, gu_default;
var init_gu = __esm({
  "public/codesandbox-runtime/dayjs-locale/gu.js"() {
    "use strict";
    init_dayjs();
    locale59 = {
      name: "gu",
      weekdays: "\u0AB0\u0AB5\u0ABF\u0AB5\u0ABE\u0AB0_\u0AB8\u0ACB\u0AAE\u0AB5\u0ABE\u0AB0_\u0AAE\u0A82\u0A97\u0AB3\u0AB5\u0ABE\u0AB0_\u0AAC\u0AC1\u0AA7\u0ACD\u0AB5\u0ABE\u0AB0_\u0A97\u0AC1\u0AB0\u0AC1\u0AB5\u0ABE\u0AB0_\u0AB6\u0AC1\u0A95\u0ACD\u0AB0\u0AB5\u0ABE\u0AB0_\u0AB6\u0AA8\u0ABF\u0AB5\u0ABE\u0AB0".split("_"),
      months: "\u0A9C\u0ABE\u0AA8\u0ACD\u0AAF\u0AC1\u0A86\u0AB0\u0AC0_\u0AAB\u0AC7\u0AAC\u0ACD\u0AB0\u0AC1\u0A86\u0AB0\u0AC0_\u0AAE\u0ABE\u0AB0\u0ACD\u0A9A_\u0A8F\u0AAA\u0ACD\u0AB0\u0ABF\u0AB2_\u0AAE\u0AC7_\u0A9C\u0AC2\u0AA8_\u0A9C\u0AC1\u0AB2\u0ABE\u0A88_\u0A91\u0A97\u0AB8\u0ACD\u0A9F_\u0AB8\u0AAA\u0ACD\u0A9F\u0AC7\u0AAE\u0ACD\u0AAC\u0AB0_\u0A91\u0A95\u0ACD\u0A9F\u0ACD\u0AAC\u0AB0_\u0AA8\u0AB5\u0AC7\u0AAE\u0ACD\u0AAC\u0AB0_\u0AA1\u0ABF\u0AB8\u0AC7\u0AAE\u0ACD\u0AAC\u0AB0".split("_"),
      weekdaysShort: "\u0AB0\u0AB5\u0ABF_\u0AB8\u0ACB\u0AAE_\u0AAE\u0A82\u0A97\u0AB3_\u0AAC\u0AC1\u0AA7\u0ACD_\u0A97\u0AC1\u0AB0\u0AC1_\u0AB6\u0AC1\u0A95\u0ACD\u0AB0_\u0AB6\u0AA8\u0ABF".split("_"),
      monthsShort: "\u0A9C\u0ABE\u0AA8\u0ACD\u0AAF\u0AC1._\u0AAB\u0AC7\u0AAC\u0ACD\u0AB0\u0AC1._\u0AAE\u0ABE\u0AB0\u0ACD\u0A9A_\u0A8F\u0AAA\u0ACD\u0AB0\u0ABF._\u0AAE\u0AC7_\u0A9C\u0AC2\u0AA8_\u0A9C\u0AC1\u0AB2\u0ABE._\u0A91\u0A97._\u0AB8\u0AAA\u0ACD\u0A9F\u0AC7._\u0A91\u0A95\u0ACD\u0A9F\u0ACD._\u0AA8\u0AB5\u0AC7._\u0AA1\u0ABF\u0AB8\u0AC7.".split("_"),
      weekdaysMin: "\u0AB0_\u0AB8\u0ACB_\u0AAE\u0A82_\u0AAC\u0AC1_\u0A97\u0AC1_\u0AB6\u0AC1_\u0AB6".split("_"),
      ordinal: function ordinal60(n) {
        return n;
      },
      formats: {
        LT: "A h:mm \u0AB5\u0ABE\u0A97\u0ACD\u0AAF\u0AC7",
        LTS: "A h:mm:ss \u0AB5\u0ABE\u0A97\u0ACD\u0AAF\u0AC7",
        L: "DD/MM/YYYY",
        LL: "D MMMM YYYY",
        LLL: "D MMMM YYYY, A h:mm \u0AB5\u0ABE\u0A97\u0ACD\u0AAF\u0AC7",
        LLLL: "dddd, D MMMM YYYY, A h:mm \u0AB5\u0ABE\u0A97\u0ACD\u0AAF\u0AC7"
      },
      relativeTime: {
        future: "%s \u0AAE\u0ABE",
        past: "%s \u0AAA\u0AC7\u0AB9\u0AB2\u0ABE",
        s: "\u0A85\u0AAE\u0AC1\u0A95 \u0AAA\u0AB3\u0ACB",
        m: "\u0A8F\u0A95 \u0AAE\u0ABF\u0AA8\u0ABF\u0A9F",
        mm: "%d \u0AAE\u0ABF\u0AA8\u0ABF\u0A9F",
        h: "\u0A8F\u0A95 \u0A95\u0AB2\u0ABE\u0A95",
        hh: "%d \u0A95\u0AB2\u0ABE\u0A95",
        d: "\u0A8F\u0A95 \u0AA6\u0ABF\u0AB5\u0AB8",
        dd: "%d \u0AA6\u0ABF\u0AB5\u0AB8",
        M: "\u0A8F\u0A95 \u0AAE\u0AB9\u0ABF\u0AA8\u0ACB",
        MM: "%d \u0AAE\u0AB9\u0ABF\u0AA8\u0ACB",
        y: "\u0A8F\u0A95 \u0AB5\u0AB0\u0ACD\u0AB7",
        yy: "%d \u0AB5\u0AB0\u0ACD\u0AB7"
      }
    };
    stdin_default2.locale(locale59, null, true);
    gu_default = locale59;
  }
});

// public/codesandbox-runtime/dayjs-locale/he.js
var he_exports = {};
__export(he_exports, {
  default: () => he_default
});
function relativeTimeFormatter5(number, withoutSuffix, key) {
  var text = texts4[key + (number === 2 ? "2" : "")] || texts4[key];
  return text.replace("%d", number);
}
var texts4, locale60, he_default;
var init_he = __esm({
  "public/codesandbox-runtime/dayjs-locale/he.js"() {
    "use strict";
    init_dayjs();
    texts4 = {
      s: "\u05DE\u05E1\u05E4\u05E8 \u05E9\u05E0\u05D9\u05D5\u05EA",
      ss: "%d \u05E9\u05E0\u05D9\u05D5\u05EA",
      m: "\u05D3\u05E7\u05D4",
      mm: "%d \u05D3\u05E7\u05D5\u05EA",
      h: "\u05E9\u05E2\u05D4",
      hh: "%d \u05E9\u05E2\u05D5\u05EA",
      hh2: "\u05E9\u05E2\u05EA\u05D9\u05D9\u05DD",
      d: "\u05D9\u05D5\u05DD",
      dd: "%d \u05D9\u05DE\u05D9\u05DD",
      dd2: "\u05D9\u05D5\u05DE\u05D9\u05D9\u05DD",
      M: "\u05D7\u05D5\u05D3\u05E9",
      MM: "%d \u05D7\u05D5\u05D3\u05E9\u05D9\u05DD",
      MM2: "\u05D7\u05D5\u05D3\u05E9\u05D9\u05D9\u05DD",
      y: "\u05E9\u05E0\u05D4",
      yy: "%d \u05E9\u05E0\u05D9\u05DD",
      yy2: "\u05E9\u05E0\u05EA\u05D9\u05D9\u05DD"
    };
    locale60 = {
      name: "he",
      weekdays: "\u05E8\u05D0\u05E9\u05D5\u05DF_\u05E9\u05E0\u05D9_\u05E9\u05DC\u05D9\u05E9\u05D9_\u05E8\u05D1\u05D9\u05E2\u05D9_\u05D7\u05DE\u05D9\u05E9\u05D9_\u05E9\u05D9\u05E9\u05D9_\u05E9\u05D1\u05EA".split("_"),
      weekdaysShort: "\u05D0\u05F3_\u05D1\u05F3_\u05D2\u05F3_\u05D3\u05F3_\u05D4\u05F3_\u05D5\u05F3_\u05E9\u05F3".split("_"),
      weekdaysMin: "\u05D0\u05F3_\u05D1\u05F3_\u05D2\u05F3_\u05D3\u05F3_\u05D4\u05F3_\u05D5_\u05E9\u05F3".split("_"),
      months: "\u05D9\u05E0\u05D5\u05D0\u05E8_\u05E4\u05D1\u05E8\u05D5\u05D0\u05E8_\u05DE\u05E8\u05E5_\u05D0\u05E4\u05E8\u05D9\u05DC_\u05DE\u05D0\u05D9_\u05D9\u05D5\u05E0\u05D9_\u05D9\u05D5\u05DC\u05D9_\u05D0\u05D5\u05D2\u05D5\u05E1\u05D8_\u05E1\u05E4\u05D8\u05DE\u05D1\u05E8_\u05D0\u05D5\u05E7\u05D8\u05D5\u05D1\u05E8_\u05E0\u05D5\u05D1\u05DE\u05D1\u05E8_\u05D3\u05E6\u05DE\u05D1\u05E8".split("_"),
      monthsShort: "\u05D9\u05E0\u05D5_\u05E4\u05D1\u05E8_\u05DE\u05E8\u05E5_\u05D0\u05E4\u05E8_\u05DE\u05D0\u05D9_\u05D9\u05D5\u05E0_\u05D9\u05D5\u05DC_\u05D0\u05D5\u05D2_\u05E1\u05E4\u05D8_\u05D0\u05D5\u05E7_\u05E0\u05D5\u05D1_\u05D3\u05E6\u05DE".split("_"),
      relativeTime: {
        future: "\u05D1\u05E2\u05D5\u05D3 %s",
        past: "\u05DC\u05E4\u05E0\u05D9 %s",
        s: relativeTimeFormatter5,
        m: relativeTimeFormatter5,
        mm: relativeTimeFormatter5,
        h: relativeTimeFormatter5,
        hh: relativeTimeFormatter5,
        d: relativeTimeFormatter5,
        dd: relativeTimeFormatter5,
        M: relativeTimeFormatter5,
        MM: relativeTimeFormatter5,
        y: relativeTimeFormatter5,
        yy: relativeTimeFormatter5
      },
      ordinal: function ordinal61(n) {
        return n;
      },
      format: {
        LT: "HH:mm",
        LTS: "HH:mm:ss",
        L: "DD/MM/YYYY",
        LL: "D [\u05D1]MMMM YYYY",
        LLL: "D [\u05D1]MMMM YYYY HH:mm",
        LLLL: "dddd, D [\u05D1]MMMM YYYY HH:mm",
        l: "D/M/YYYY",
        ll: "D MMM YYYY",
        lll: "D MMM YYYY HH:mm",
        llll: "ddd, D MMM YYYY HH:mm"
      },
      formats: {
        LT: "HH:mm",
        LTS: "HH:mm:ss",
        L: "DD/MM/YYYY",
        LL: "D [\u05D1]MMMM YYYY",
        LLL: "D [\u05D1]MMMM YYYY HH:mm",
        LLLL: "dddd, D [\u05D1]MMMM YYYY HH:mm",
        l: "D/M/YYYY",
        ll: "D MMM YYYY",
        lll: "D MMM YYYY HH:mm",
        llll: "ddd, D MMM YYYY HH:mm"
      }
    };
    stdin_default2.locale(locale60, null, true);
    he_default = locale60;
  }
});

// public/codesandbox-runtime/dayjs-locale/hi.js
var hi_exports = {};
__export(hi_exports, {
  default: () => hi_default
});
var locale61, hi_default;
var init_hi = __esm({
  "public/codesandbox-runtime/dayjs-locale/hi.js"() {
    "use strict";
    init_dayjs();
    locale61 = {
      name: "hi",
      weekdays: "\u0930\u0935\u093F\u0935\u093E\u0930_\u0938\u094B\u092E\u0935\u093E\u0930_\u092E\u0902\u0917\u0932\u0935\u093E\u0930_\u092C\u0941\u0927\u0935\u093E\u0930_\u0917\u0941\u0930\u0942\u0935\u093E\u0930_\u0936\u0941\u0915\u094D\u0930\u0935\u093E\u0930_\u0936\u0928\u093F\u0935\u093E\u0930".split("_"),
      months: "\u091C\u0928\u0935\u0930\u0940_\u092B\u093C\u0930\u0935\u0930\u0940_\u092E\u093E\u0930\u094D\u091A_\u0905\u092A\u094D\u0930\u0948\u0932_\u092E\u0908_\u091C\u0942\u0928_\u091C\u0941\u0932\u093E\u0908_\u0905\u0917\u0938\u094D\u0924_\u0938\u093F\u0924\u092E\u094D\u092C\u0930_\u0905\u0915\u094D\u091F\u0942\u092C\u0930_\u0928\u0935\u092E\u094D\u092C\u0930_\u0926\u093F\u0938\u092E\u094D\u092C\u0930".split("_"),
      weekdaysShort: "\u0930\u0935\u093F_\u0938\u094B\u092E_\u092E\u0902\u0917\u0932_\u092C\u0941\u0927_\u0917\u0941\u0930\u0942_\u0936\u0941\u0915\u094D\u0930_\u0936\u0928\u093F".split("_"),
      monthsShort: "\u091C\u0928._\u092B\u093C\u0930._\u092E\u093E\u0930\u094D\u091A_\u0905\u092A\u094D\u0930\u0948._\u092E\u0908_\u091C\u0942\u0928_\u091C\u0941\u0932._\u0905\u0917._\u0938\u093F\u0924._\u0905\u0915\u094D\u091F\u0942._\u0928\u0935._\u0926\u093F\u0938.".split("_"),
      weekdaysMin: "\u0930_\u0938\u094B_\u092E\u0902_\u092C\u0941_\u0917\u0941_\u0936\u0941_\u0936".split("_"),
      ordinal: function ordinal62(n) {
        return n;
      },
      formats: {
        LT: "A h:mm \u092C\u091C\u0947",
        LTS: "A h:mm:ss \u092C\u091C\u0947",
        L: "DD/MM/YYYY",
        LL: "D MMMM YYYY",
        LLL: "D MMMM YYYY, A h:mm \u092C\u091C\u0947",
        LLLL: "dddd, D MMMM YYYY, A h:mm \u092C\u091C\u0947"
      },
      relativeTime: {
        future: "%s \u092E\u0947\u0902",
        past: "%s \u092A\u0939\u0932\u0947",
        s: "\u0915\u0941\u091B \u0939\u0940 \u0915\u094D\u0937\u0923",
        m: "\u090F\u0915 \u092E\u093F\u0928\u091F",
        mm: "%d \u092E\u093F\u0928\u091F",
        h: "\u090F\u0915 \u0918\u0902\u091F\u093E",
        hh: "%d \u0918\u0902\u091F\u0947",
        d: "\u090F\u0915 \u0926\u093F\u0928",
        dd: "%d \u0926\u093F\u0928",
        M: "\u090F\u0915 \u092E\u0939\u0940\u0928\u0947",
        MM: "%d \u092E\u0939\u0940\u0928\u0947",
        y: "\u090F\u0915 \u0935\u0930\u094D\u0937",
        yy: "%d \u0935\u0930\u094D\u0937"
      }
    };
    stdin_default2.locale(locale61, null, true);
    hi_default = locale61;
  }
});

// public/codesandbox-runtime/dayjs-locale/hr.js
var hr_exports = {};
__export(hr_exports, {
  default: () => hr_default
});
var monthFormat2, monthStandalone2, MONTHS_IN_FORMAT2, months4, locale62, hr_default;
var init_hr = __esm({
  "public/codesandbox-runtime/dayjs-locale/hr.js"() {
    "use strict";
    init_dayjs();
    monthFormat2 = "sije\u010Dnja_velja\u010De_o\u017Eujka_travnja_svibnja_lipnja_srpnja_kolovoza_rujna_listopada_studenoga_prosinca".split("_");
    monthStandalone2 = "sije\u010Danj_velja\u010Da_o\u017Eujak_travanj_svibanj_lipanj_srpanj_kolovoz_rujan_listopad_studeni_prosinac".split("_");
    MONTHS_IN_FORMAT2 = /D[oD]?(\[[^[\]]*\]|\s)+MMMM?/;
    months4 = function months5(dayjsInstance, format) {
      if (MONTHS_IN_FORMAT2.test(format)) {
        return monthFormat2[dayjsInstance.month()];
      }
      return monthStandalone2[dayjsInstance.month()];
    };
    months4.s = monthStandalone2;
    months4.f = monthFormat2;
    locale62 = {
      name: "hr",
      weekdays: "nedjelja_ponedjeljak_utorak_srijeda_\u010Detvrtak_petak_subota".split("_"),
      weekdaysShort: "ned._pon._uto._sri._\u010Det._pet._sub.".split("_"),
      weekdaysMin: "ne_po_ut_sr_\u010De_pe_su".split("_"),
      months: months4,
      monthsShort: "sij._velj._o\u017Eu._tra._svi._lip._srp._kol._ruj._lis._stu._pro.".split("_"),
      weekStart: 1,
      formats: {
        LT: "H:mm",
        LTS: "H:mm:ss",
        L: "DD.MM.YYYY",
        LL: "D. MMMM YYYY",
        LLL: "D. MMMM YYYY H:mm",
        LLLL: "dddd, D. MMMM YYYY H:mm"
      },
      relativeTime: {
        future: "za %s",
        past: "prije %s",
        s: "sekunda",
        m: "minuta",
        mm: "%d minuta",
        h: "sat",
        hh: "%d sati",
        d: "dan",
        dd: "%d dana",
        M: "mjesec",
        MM: "%d mjeseci",
        y: "godina",
        yy: "%d godine"
      },
      ordinal: function ordinal63(n) {
        return n + ".";
      }
    };
    stdin_default2.locale(locale62, null, true);
    hr_default = locale62;
  }
});

// public/codesandbox-runtime/dayjs-locale/ht.js
var ht_exports = {};
__export(ht_exports, {
  default: () => ht_default
});
var locale63, ht_default;
var init_ht = __esm({
  "public/codesandbox-runtime/dayjs-locale/ht.js"() {
    "use strict";
    init_dayjs();
    locale63 = {
      name: "ht",
      weekdays: "dimanch_lendi_madi_m\xE8kredi_jedi_vandredi_samdi".split("_"),
      months: "janvye_fevriye_mas_avril_me_jen_jiy\xE8_out_septanm_okt\xF2b_novanm_desanm".split("_"),
      weekdaysShort: "dim._len._mad._m\xE8k._jed._van._sam.".split("_"),
      monthsShort: "jan._fev._mas_avr._me_jen_jiy\xE8._out_sept._okt._nov._des.".split("_"),
      weekdaysMin: "di_le_ma_m\xE8_je_va_sa".split("_"),
      ordinal: function ordinal64(n) {
        return n;
      },
      formats: {
        LT: "HH:mm",
        LTS: "HH:mm:ss",
        L: "DD/MM/YYYY",
        LL: "D MMMM YYYY",
        LLL: "D MMMM YYYY HH:mm",
        LLLL: "dddd D MMMM YYYY HH:mm"
      },
      relativeTime: {
        future: "nan %s",
        past: "sa gen %s",
        s: "k\xE8k segond",
        m: "yon minit",
        mm: "%d minit",
        h: "in\xE8dtan",
        hh: "%d z\xE8",
        d: "yon jou",
        dd: "%d jou",
        M: "yon mwa",
        MM: "%d mwa",
        y: "yon ane",
        yy: "%d ane"
      }
    };
    stdin_default2.locale(locale63, null, true);
    ht_default = locale63;
  }
});

// public/codesandbox-runtime/dayjs-locale/hu.js
var hu_exports = {};
__export(hu_exports, {
  default: () => hu_default
});
var locale64, hu_default;
var init_hu = __esm({
  "public/codesandbox-runtime/dayjs-locale/hu.js"() {
    "use strict";
    init_dayjs();
    locale64 = {
      name: "hu",
      weekdays: "vas\xE1rnap_h\xE9tf\u0151_kedd_szerda_cs\xFCt\xF6rt\xF6k_p\xE9ntek_szombat".split("_"),
      weekdaysShort: "vas_h\xE9t_kedd_sze_cs\xFCt_p\xE9n_szo".split("_"),
      weekdaysMin: "v_h_k_sze_cs_p_szo".split("_"),
      months: "janu\xE1r_febru\xE1r_m\xE1rcius_\xE1prilis_m\xE1jus_j\xFAnius_j\xFAlius_augusztus_szeptember_okt\xF3ber_november_december".split("_"),
      monthsShort: "jan_feb_m\xE1rc_\xE1pr_m\xE1j_j\xFAn_j\xFAl_aug_szept_okt_nov_dec".split("_"),
      ordinal: function ordinal65(n) {
        return n + ".";
      },
      weekStart: 1,
      relativeTime: {
        future: "%s m\xFAlva",
        past: "%s",
        s: function s(_, _s, ___, isFuture) {
          return "n\xE9h\xE1ny m\xE1sodperc" + (isFuture || _s ? "" : "e");
        },
        m: function m(_, s2, ___, isFuture) {
          return "egy perc" + (isFuture || s2 ? "" : "e");
        },
        mm: function mm(n, s2, ___, isFuture) {
          return n + " perc" + (isFuture || s2 ? "" : "e");
        },
        h: function h(_, s2, ___, isFuture) {
          return "egy " + (isFuture || s2 ? "\xF3ra" : "\xF3r\xE1ja");
        },
        hh: function hh(n, s2, ___, isFuture) {
          return n + " " + (isFuture || s2 ? "\xF3ra" : "\xF3r\xE1ja");
        },
        d: function d(_, s2, ___, isFuture) {
          return "egy " + (isFuture || s2 ? "nap" : "napja");
        },
        dd: function dd(n, s2, ___, isFuture) {
          return n + " " + (isFuture || s2 ? "nap" : "napja");
        },
        M: function M(_, s2, ___, isFuture) {
          return "egy " + (isFuture || s2 ? "h\xF3nap" : "h\xF3napja");
        },
        MM: function MM(n, s2, ___, isFuture) {
          return n + " " + (isFuture || s2 ? "h\xF3nap" : "h\xF3napja");
        },
        y: function y(_, s2, ___, isFuture) {
          return "egy " + (isFuture || s2 ? "\xE9v" : "\xE9ve");
        },
        yy: function yy(n, s2, ___, isFuture) {
          return n + " " + (isFuture || s2 ? "\xE9v" : "\xE9ve");
        }
      },
      formats: {
        LT: "H:mm",
        LTS: "H:mm:ss",
        L: "YYYY.MM.DD.",
        LL: "YYYY. MMMM D.",
        LLL: "YYYY. MMMM D. H:mm",
        LLLL: "YYYY. MMMM D., dddd H:mm"
      }
    };
    stdin_default2.locale(locale64, null, true);
    hu_default = locale64;
  }
});

// public/codesandbox-runtime/dayjs-locale/hy-am.js
var hy_am_exports = {};
__export(hy_am_exports, {
  default: () => hy_am_default
});
var locale65, hy_am_default;
var init_hy_am = __esm({
  "public/codesandbox-runtime/dayjs-locale/hy-am.js"() {
    "use strict";
    init_dayjs();
    locale65 = {
      name: "hy-am",
      weekdays: "\u056F\u056B\u0580\u0561\u056F\u056B_\u0565\u0580\u056F\u0578\u0582\u0577\u0561\u0562\u0569\u056B_\u0565\u0580\u0565\u0584\u0577\u0561\u0562\u0569\u056B_\u0579\u0578\u0580\u0565\u0584\u0577\u0561\u0562\u0569\u056B_\u0570\u056B\u0576\u0563\u0577\u0561\u0562\u0569\u056B_\u0578\u0582\u0580\u0562\u0561\u0569_\u0577\u0561\u0562\u0561\u0569".split("_"),
      months: "\u0570\u0578\u0582\u0576\u057E\u0561\u0580\u056B_\u0583\u0565\u057F\u0580\u057E\u0561\u0580\u056B_\u0574\u0561\u0580\u057F\u056B_\u0561\u057A\u0580\u056B\u056C\u056B_\u0574\u0561\u0575\u056B\u057D\u056B_\u0570\u0578\u0582\u0576\u056B\u057D\u056B_\u0570\u0578\u0582\u056C\u056B\u057D\u056B_\u0585\u0563\u0578\u057D\u057F\u0578\u057D\u056B_\u057D\u0565\u057A\u057F\u0565\u0574\u0562\u0565\u0580\u056B_\u0570\u0578\u056F\u057F\u0565\u0574\u0562\u0565\u0580\u056B_\u0576\u0578\u0575\u0565\u0574\u0562\u0565\u0580\u056B_\u0564\u0565\u056F\u057F\u0565\u0574\u0562\u0565\u0580\u056B".split("_"),
      weekStart: 1,
      weekdaysShort: "\u056F\u0580\u056F_\u0565\u0580\u056F_\u0565\u0580\u0584_\u0579\u0580\u0584_\u0570\u0576\u0563_\u0578\u0582\u0580\u0562_\u0577\u0562\u0569".split("_"),
      monthsShort: "\u0570\u0576\u057E_\u0583\u057F\u0580_\u0574\u0580\u057F_\u0561\u057A\u0580_\u0574\u0575\u057D_\u0570\u0576\u057D_\u0570\u056C\u057D_\u0585\u0563\u057D_\u057D\u057A\u057F_\u0570\u056F\u057F_\u0576\u0574\u0562_\u0564\u056F\u057F".split("_"),
      weekdaysMin: "\u056F\u0580\u056F_\u0565\u0580\u056F_\u0565\u0580\u0584_\u0579\u0580\u0584_\u0570\u0576\u0563_\u0578\u0582\u0580\u0562_\u0577\u0562\u0569".split("_"),
      ordinal: function ordinal66(n) {
        return n;
      },
      formats: {
        LT: "HH:mm",
        LTS: "HH:mm:ss",
        L: "DD.MM.YYYY",
        LL: "D MMMM YYYY \u0569.",
        LLL: "D MMMM YYYY \u0569., HH:mm",
        LLLL: "dddd, D MMMM YYYY \u0569., HH:mm"
      },
      relativeTime: {
        future: "%s \u0570\u0565\u057F\u0578",
        past: "%s \u0561\u057C\u0561\u057B",
        s: "\u0574\u056B \u0584\u0561\u0576\u056B \u057E\u0561\u0575\u0580\u056F\u0575\u0561\u0576",
        m: "\u0580\u0578\u057A\u0565",
        mm: "%d \u0580\u0578\u057A\u0565",
        h: "\u056A\u0561\u0574",
        hh: "%d \u056A\u0561\u0574",
        d: "\u0585\u0580",
        dd: "%d \u0585\u0580",
        M: "\u0561\u0574\u056B\u057D",
        MM: "%d \u0561\u0574\u056B\u057D",
        y: "\u057F\u0561\u0580\u056B",
        yy: "%d \u057F\u0561\u0580\u056B"
      }
    };
    stdin_default2.locale(locale65, null, true);
    hy_am_default = locale65;
  }
});

// public/codesandbox-runtime/dayjs-locale/id.js
var id_exports = {};
__export(id_exports, {
  default: () => id_default
});
var locale66, id_default;
var init_id = __esm({
  "public/codesandbox-runtime/dayjs-locale/id.js"() {
    "use strict";
    init_dayjs();
    locale66 = {
      name: "id",
      weekdays: "Minggu_Senin_Selasa_Rabu_Kamis_Jumat_Sabtu".split("_"),
      months: "Januari_Februari_Maret_April_Mei_Juni_Juli_Agustus_September_Oktober_November_Desember".split("_"),
      weekdaysShort: "Min_Sen_Sel_Rab_Kam_Jum_Sab".split("_"),
      monthsShort: "Jan_Feb_Mar_Apr_Mei_Jun_Jul_Agt_Sep_Okt_Nov_Des".split("_"),
      weekdaysMin: "Mg_Sn_Sl_Rb_Km_Jm_Sb".split("_"),
      weekStart: 1,
      formats: {
        LT: "HH.mm",
        LTS: "HH.mm.ss",
        L: "DD/MM/YYYY",
        LL: "D MMMM YYYY",
        LLL: "D MMMM YYYY [pukul] HH.mm",
        LLLL: "dddd, D MMMM YYYY [pukul] HH.mm"
      },
      relativeTime: {
        future: "dalam %s",
        past: "%s yang lalu",
        s: "beberapa detik",
        m: "semenit",
        mm: "%d menit",
        h: "sejam",
        hh: "%d jam",
        d: "sehari",
        dd: "%d hari",
        M: "sebulan",
        MM: "%d bulan",
        y: "setahun",
        yy: "%d tahun"
      },
      ordinal: function ordinal67(n) {
        return n + ".";
      }
    };
    stdin_default2.locale(locale66, null, true);
    id_default = locale66;
  }
});

// public/codesandbox-runtime/dayjs-locale/is.js
var is_exports = {};
__export(is_exports, {
  default: () => is_default
});
function resolveTemplate(key, number, isFuture, withoutSuffix) {
  var suffixIndex = isFuture ? 1 : 2;
  var index = withoutSuffix ? 0 : suffixIndex;
  var keyShouldBeSingular = key.length === 2 && number % 10 === 1;
  var correctedKey = keyShouldBeSingular ? key[0] : key;
  var unitText = texts5[correctedKey];
  var text = unitText[index];
  return key.length === 1 ? text : "%d " + text;
}
function relativeTimeFormatter6(number, withoutSuffix, key, isFuture) {
  var template = resolveTemplate(key, number, isFuture, withoutSuffix);
  return template.replace("%d", number);
}
var texts5, locale67, is_default;
var init_is = __esm({
  "public/codesandbox-runtime/dayjs-locale/is.js"() {
    "use strict";
    init_dayjs();
    texts5 = {
      s: ["nokkrar sek\xFAndur", "nokkrar sek\xFAndur", "nokkrum sek\xFAndum"],
      m: ["m\xEDn\xFAta", "m\xEDn\xFAtu", "m\xEDn\xFAtu"],
      mm: ["m\xEDn\xFAtur", "m\xEDn\xFAtur", "m\xEDn\xFAtum"],
      h: ["klukkustund", "klukkustund", "klukkustund"],
      hh: ["klukkustundir", "klukkustundir", "klukkustundum"],
      d: ["dagur", "dag", "degi"],
      dd: ["dagar", "daga", "d\xF6gum"],
      M: ["m\xE1nu\xF0ur", "m\xE1nu\xF0", "m\xE1nu\xF0i"],
      MM: ["m\xE1nu\xF0ir", "m\xE1nu\xF0i", "m\xE1nu\xF0um"],
      y: ["\xE1r", "\xE1r", "\xE1ri"],
      yy: ["\xE1r", "\xE1r", "\xE1rum"]
    };
    locale67 = {
      name: "is",
      weekdays: "sunnudagur_m\xE1nudagur_\xFEri\xF0judagur_mi\xF0vikudagur_fimmtudagur_f\xF6studagur_laugardagur".split("_"),
      months: "jan\xFAar_febr\xFAar_mars_apr\xEDl_ma\xED_j\xFAn\xED_j\xFAl\xED_\xE1g\xFAst_september_okt\xF3ber_n\xF3vember_desember".split("_"),
      weekStart: 1,
      weekdaysShort: "sun_m\xE1n_\xFEri_mi\xF0_fim_f\xF6s_lau".split("_"),
      monthsShort: "jan_feb_mar_apr_ma\xED_j\xFAn_j\xFAl_\xE1g\xFA_sep_okt_n\xF3v_des".split("_"),
      weekdaysMin: "Su_M\xE1_\xDEr_Mi_Fi_F\xF6_La".split("_"),
      ordinal: function ordinal68(n) {
        return n;
      },
      formats: {
        LT: "H:mm",
        LTS: "H:mm:ss",
        L: "DD.MM.YYYY",
        LL: "D. MMMM YYYY",
        LLL: "D. MMMM YYYY [kl.] H:mm",
        LLLL: "dddd, D. MMMM YYYY [kl.] H:mm"
      },
      relativeTime: {
        future: "eftir %s",
        past: "fyrir %s s\xED\xF0an",
        s: relativeTimeFormatter6,
        m: relativeTimeFormatter6,
        mm: relativeTimeFormatter6,
        h: relativeTimeFormatter6,
        hh: relativeTimeFormatter6,
        d: relativeTimeFormatter6,
        dd: relativeTimeFormatter6,
        M: relativeTimeFormatter6,
        MM: relativeTimeFormatter6,
        y: relativeTimeFormatter6,
        yy: relativeTimeFormatter6
      }
    };
    stdin_default2.locale(locale67, null, true);
    is_default = locale67;
  }
});

// public/codesandbox-runtime/dayjs-locale/it-ch.js
var it_ch_exports = {};
__export(it_ch_exports, {
  default: () => it_ch_default
});
var locale68, it_ch_default;
var init_it_ch = __esm({
  "public/codesandbox-runtime/dayjs-locale/it-ch.js"() {
    "use strict";
    init_dayjs();
    locale68 = {
      name: "it-ch",
      weekdays: "domenica_luned\xEC_marted\xEC_mercoled\xEC_gioved\xEC_venerd\xEC_sabato".split("_"),
      months: "gennaio_febbraio_marzo_aprile_maggio_giugno_luglio_agosto_settembre_ottobre_novembre_dicembre".split("_"),
      weekStart: 1,
      weekdaysShort: "dom_lun_mar_mer_gio_ven_sab".split("_"),
      monthsShort: "gen_feb_mar_apr_mag_giu_lug_ago_set_ott_nov_dic".split("_"),
      weekdaysMin: "do_lu_ma_me_gi_ve_sa".split("_"),
      ordinal: function ordinal69(n) {
        return n;
      },
      formats: {
        LT: "HH:mm",
        LTS: "HH:mm:ss",
        L: "DD.MM.YYYY",
        LL: "D MMMM YYYY",
        LLL: "D MMMM YYYY HH:mm",
        LLLL: "dddd D MMMM YYYY HH:mm"
      },
      relativeTime: {
        future: "tra %s",
        past: "%s fa",
        s: "alcuni secondi",
        m: "un minuto",
        mm: "%d minuti",
        h: "un'ora",
        hh: "%d ore",
        d: "un giorno",
        dd: "%d giorni",
        M: "un mese",
        MM: "%d mesi",
        y: "un anno",
        yy: "%d anni"
      }
    };
    stdin_default2.locale(locale68, null, true);
    it_ch_default = locale68;
  }
});

// public/codesandbox-runtime/dayjs-locale/it.js
var it_exports = {};
__export(it_exports, {
  default: () => it_default
});
var locale69, it_default;
var init_it = __esm({
  "public/codesandbox-runtime/dayjs-locale/it.js"() {
    "use strict";
    init_dayjs();
    locale69 = {
      name: "it",
      weekdays: "domenica_luned\xEC_marted\xEC_mercoled\xEC_gioved\xEC_venerd\xEC_sabato".split("_"),
      weekdaysShort: "dom_lun_mar_mer_gio_ven_sab".split("_"),
      weekdaysMin: "do_lu_ma_me_gi_ve_sa".split("_"),
      months: "gennaio_febbraio_marzo_aprile_maggio_giugno_luglio_agosto_settembre_ottobre_novembre_dicembre".split("_"),
      weekStart: 1,
      monthsShort: "gen_feb_mar_apr_mag_giu_lug_ago_set_ott_nov_dic".split("_"),
      formats: {
        LT: "HH:mm",
        LTS: "HH:mm:ss",
        L: "DD/MM/YYYY",
        LL: "D MMMM YYYY",
        LLL: "D MMMM YYYY HH:mm",
        LLLL: "dddd D MMMM YYYY HH:mm"
      },
      relativeTime: {
        future: "tra %s",
        past: "%s fa",
        s: "qualche secondo",
        m: "un minuto",
        mm: "%d minuti",
        h: "un'ora",
        hh: "%d ore",
        d: "un giorno",
        dd: "%d giorni",
        M: "un mese",
        MM: "%d mesi",
        y: "un anno",
        yy: "%d anni"
      },
      ordinal: function ordinal70(n) {
        return n + "\xBA";
      }
    };
    stdin_default2.locale(locale69, null, true);
    it_default = locale69;
  }
});

// public/codesandbox-runtime/dayjs-locale/ja.js
var ja_exports = {};
__export(ja_exports, {
  default: () => ja_default
});
var locale70, ja_default;
var init_ja = __esm({
  "public/codesandbox-runtime/dayjs-locale/ja.js"() {
    "use strict";
    init_dayjs();
    locale70 = {
      name: "ja",
      weekdays: "\u65E5\u66DC\u65E5_\u6708\u66DC\u65E5_\u706B\u66DC\u65E5_\u6C34\u66DC\u65E5_\u6728\u66DC\u65E5_\u91D1\u66DC\u65E5_\u571F\u66DC\u65E5".split("_"),
      weekdaysShort: "\u65E5_\u6708_\u706B_\u6C34_\u6728_\u91D1_\u571F".split("_"),
      weekdaysMin: "\u65E5_\u6708_\u706B_\u6C34_\u6728_\u91D1_\u571F".split("_"),
      months: "1\u6708_2\u6708_3\u6708_4\u6708_5\u6708_6\u6708_7\u6708_8\u6708_9\u6708_10\u6708_11\u6708_12\u6708".split("_"),
      monthsShort: "1\u6708_2\u6708_3\u6708_4\u6708_5\u6708_6\u6708_7\u6708_8\u6708_9\u6708_10\u6708_11\u6708_12\u6708".split("_"),
      ordinal: function ordinal71(n) {
        return n + "\u65E5";
      },
      formats: {
        LT: "HH:mm",
        LTS: "HH:mm:ss",
        L: "YYYY/MM/DD",
        LL: "YYYY\u5E74M\u6708D\u65E5",
        LLL: "YYYY\u5E74M\u6708D\u65E5 HH:mm",
        LLLL: "YYYY\u5E74M\u6708D\u65E5 dddd HH:mm",
        l: "YYYY/MM/DD",
        ll: "YYYY\u5E74M\u6708D\u65E5",
        lll: "YYYY\u5E74M\u6708D\u65E5 HH:mm",
        llll: "YYYY\u5E74M\u6708D\u65E5(ddd) HH:mm"
      },
      meridiem: function meridiem12(hour) {
        return hour < 12 ? "\u5348\u524D" : "\u5348\u5F8C";
      },
      relativeTime: {
        future: "%s\u5F8C",
        past: "%s\u524D",
        s: "\u6570\u79D2",
        m: "1\u5206",
        mm: "%d\u5206",
        h: "1\u6642\u9593",
        hh: "%d\u6642\u9593",
        d: "1\u65E5",
        dd: "%d\u65E5",
        M: "1\u30F6\u6708",
        MM: "%d\u30F6\u6708",
        y: "1\u5E74",
        yy: "%d\u5E74"
      }
    };
    stdin_default2.locale(locale70, null, true);
    ja_default = locale70;
  }
});

// public/codesandbox-runtime/dayjs-locale/jv.js
var jv_exports = {};
__export(jv_exports, {
  default: () => jv_default
});
var locale71, jv_default;
var init_jv = __esm({
  "public/codesandbox-runtime/dayjs-locale/jv.js"() {
    "use strict";
    init_dayjs();
    locale71 = {
      name: "jv",
      weekdays: "Minggu_Senen_Seloso_Rebu_Kemis_Jemuwah_Septu".split("_"),
      months: "Januari_Februari_Maret_April_Mei_Juni_Juli_Agustus_September_Oktober_Nopember_Desember".split("_"),
      weekStart: 1,
      weekdaysShort: "Min_Sen_Sel_Reb_Kem_Jem_Sep".split("_"),
      monthsShort: "Jan_Feb_Mar_Apr_Mei_Jun_Jul_Ags_Sep_Okt_Nop_Des".split("_"),
      weekdaysMin: "Mg_Sn_Sl_Rb_Km_Jm_Sp".split("_"),
      ordinal: function ordinal72(n) {
        return n;
      },
      formats: {
        LT: "HH.mm",
        LTS: "HH.mm.ss",
        L: "DD/MM/YYYY",
        LL: "D MMMM YYYY",
        LLL: "D MMMM YYYY [pukul] HH.mm",
        LLLL: "dddd, D MMMM YYYY [pukul] HH.mm"
      },
      relativeTime: {
        future: "wonten ing %s",
        past: "%s ingkang kepengker",
        s: "sawetawis detik",
        m: "setunggal menit",
        mm: "%d menit",
        h: "setunggal jam",
        hh: "%d jam",
        d: "sedinten",
        dd: "%d dinten",
        M: "sewulan",
        MM: "%d wulan",
        y: "setaun",
        yy: "%d taun"
      }
    };
    stdin_default2.locale(locale71, null, true);
    jv_default = locale71;
  }
});

// public/codesandbox-runtime/dayjs-locale/ka.js
var ka_exports = {};
__export(ka_exports, {
  default: () => ka_default
});
var locale72, ka_default;
var init_ka = __esm({
  "public/codesandbox-runtime/dayjs-locale/ka.js"() {
    "use strict";
    init_dayjs();
    locale72 = {
      name: "ka",
      weekdays: "\u10D9\u10D5\u10D8\u10E0\u10D0_\u10DD\u10E0\u10E8\u10D0\u10D1\u10D0\u10D7\u10D8_\u10E1\u10D0\u10DB\u10E8\u10D0\u10D1\u10D0\u10D7\u10D8_\u10DD\u10D7\u10EE\u10E8\u10D0\u10D1\u10D0\u10D7\u10D8_\u10EE\u10E3\u10D7\u10E8\u10D0\u10D1\u10D0\u10D7\u10D8_\u10DE\u10D0\u10E0\u10D0\u10E1\u10D9\u10D4\u10D5\u10D8_\u10E8\u10D0\u10D1\u10D0\u10D7\u10D8".split("_"),
      weekdaysShort: "\u10D9\u10D5\u10D8_\u10DD\u10E0\u10E8_\u10E1\u10D0\u10DB_\u10DD\u10D7\u10EE_\u10EE\u10E3\u10D7_\u10DE\u10D0\u10E0_\u10E8\u10D0\u10D1".split("_"),
      weekdaysMin: "\u10D9\u10D5_\u10DD\u10E0_\u10E1\u10D0_\u10DD\u10D7_\u10EE\u10E3_\u10DE\u10D0_\u10E8\u10D0".split("_"),
      months: "\u10D8\u10D0\u10DC\u10D5\u10D0\u10E0\u10D8_\u10D7\u10D4\u10D1\u10D4\u10E0\u10D5\u10D0\u10DA\u10D8_\u10DB\u10D0\u10E0\u10E2\u10D8_\u10D0\u10DE\u10E0\u10D8\u10DA\u10D8_\u10DB\u10D0\u10D8\u10E1\u10D8_\u10D8\u10D5\u10DC\u10D8\u10E1\u10D8_\u10D8\u10D5\u10DA\u10D8\u10E1\u10D8_\u10D0\u10D2\u10D5\u10D8\u10E1\u10E2\u10DD_\u10E1\u10D4\u10E5\u10E2\u10D4\u10DB\u10D1\u10D4\u10E0\u10D8_\u10DD\u10E5\u10E2\u10DD\u10DB\u10D1\u10D4\u10E0\u10D8_\u10DC\u10DD\u10D4\u10DB\u10D1\u10D4\u10E0\u10D8_\u10D3\u10D4\u10D9\u10D4\u10DB\u10D1\u10D4\u10E0\u10D8".split("_"),
      monthsShort: "\u10D8\u10D0\u10DC_\u10D7\u10D4\u10D1_\u10DB\u10D0\u10E0_\u10D0\u10DE\u10E0_\u10DB\u10D0\u10D8_\u10D8\u10D5\u10DC_\u10D8\u10D5\u10DA_\u10D0\u10D2\u10D5_\u10E1\u10D4\u10E5_\u10DD\u10E5\u10E2_\u10DC\u10DD\u10D4_\u10D3\u10D4\u10D9".split("_"),
      weekStart: 1,
      formats: {
        LT: "h:mm A",
        LTS: "h:mm:ss A",
        L: "DD/MM/YYYY",
        LL: "D MMMM YYYY",
        LLL: "D MMMM YYYY h:mm A",
        LLLL: "dddd, D MMMM YYYY h:mm A"
      },
      relativeTime: {
        future: "%s \u10E8\u10D4\u10DB\u10D3\u10D4\u10D2",
        past: "%s \u10EC\u10D8\u10DC",
        s: "\u10EC\u10D0\u10DB\u10D8",
        m: "\u10EC\u10E3\u10D7\u10D8",
        mm: "%d \u10EC\u10E3\u10D7\u10D8",
        h: "\u10E1\u10D0\u10D0\u10D7\u10D8",
        hh: "%d \u10E1\u10D0\u10D0\u10D7\u10D8\u10E1",
        d: "\u10D3\u10E6\u10D4\u10E1",
        dd: "%d \u10D3\u10E6\u10D8\u10E1 \u10D2\u10D0\u10DC\u10DB\u10D0\u10D5\u10DA\u10DD\u10D1\u10D0\u10E8\u10D8",
        M: "\u10D7\u10D5\u10D8\u10E1",
        MM: "%d \u10D7\u10D5\u10D8\u10E1",
        y: "\u10EC\u10D4\u10DA\u10D8",
        yy: "%d \u10EC\u10DA\u10D8\u10E1"
      },
      ordinal: function ordinal73(n) {
        return n;
      }
    };
    stdin_default2.locale(locale72, null, true);
    ka_default = locale72;
  }
});

// public/codesandbox-runtime/dayjs-locale/kk.js
var kk_exports = {};
__export(kk_exports, {
  default: () => kk_default
});
var locale73, kk_default;
var init_kk = __esm({
  "public/codesandbox-runtime/dayjs-locale/kk.js"() {
    "use strict";
    init_dayjs();
    locale73 = {
      name: "kk",
      weekdays: "\u0436\u0435\u043A\u0441\u0435\u043D\u0431\u0456_\u0434\u04AF\u0439\u0441\u0435\u043D\u0431\u0456_\u0441\u0435\u0439\u0441\u0435\u043D\u0431\u0456_\u0441\u04D9\u0440\u0441\u0435\u043D\u0431\u0456_\u0431\u0435\u0439\u0441\u0435\u043D\u0431\u0456_\u0436\u04B1\u043C\u0430_\u0441\u0435\u043D\u0431\u0456".split("_"),
      weekdaysShort: "\u0436\u0435\u043A_\u0434\u04AF\u0439_\u0441\u0435\u0439_\u0441\u04D9\u0440_\u0431\u0435\u0439_\u0436\u04B1\u043C_\u0441\u0435\u043D".split("_"),
      weekdaysMin: "\u0436\u043A_\u0434\u0439_\u0441\u0439_\u0441\u0440_\u0431\u0439_\u0436\u043C_\u0441\u043D".split("_"),
      months: "\u049B\u0430\u04A3\u0442\u0430\u0440_\u0430\u049B\u043F\u0430\u043D_\u043D\u0430\u0443\u0440\u044B\u0437_\u0441\u04D9\u0443\u0456\u0440_\u043C\u0430\u043C\u044B\u0440_\u043C\u0430\u0443\u0441\u044B\u043C_\u0448\u0456\u043B\u0434\u0435_\u0442\u0430\u043C\u044B\u0437_\u049B\u044B\u0440\u043A\u04AF\u0439\u0435\u043A_\u049B\u0430\u0437\u0430\u043D_\u049B\u0430\u0440\u0430\u0448\u0430_\u0436\u0435\u043B\u0442\u043E\u049B\u0441\u0430\u043D".split("_"),
      monthsShort: "\u049B\u0430\u04A3_\u0430\u049B\u043F_\u043D\u0430\u0443_\u0441\u04D9\u0443_\u043C\u0430\u043C_\u043C\u0430\u0443_\u0448\u0456\u043B_\u0442\u0430\u043C_\u049B\u044B\u0440_\u049B\u0430\u0437_\u049B\u0430\u0440_\u0436\u0435\u043B".split("_"),
      weekStart: 1,
      relativeTime: {
        future: "%s \u0456\u0448\u0456\u043D\u0434\u0435",
        past: "%s \u0431\u04B1\u0440\u044B\u043D",
        s: "\u0431\u0456\u0440\u043D\u0435\u0448\u0435 \u0441\u0435\u043A\u0443\u043D\u0434",
        m: "\u0431\u0456\u0440 \u043C\u0438\u043D\u0443\u0442",
        mm: "%d \u043C\u0438\u043D\u0443\u0442",
        h: "\u0431\u0456\u0440 \u0441\u0430\u0493\u0430\u0442",
        hh: "%d \u0441\u0430\u0493\u0430\u0442",
        d: "\u0431\u0456\u0440 \u043A\u04AF\u043D",
        dd: "%d \u043A\u04AF\u043D",
        M: "\u0431\u0456\u0440 \u0430\u0439",
        MM: "%d \u0430\u0439",
        y: "\u0431\u0456\u0440 \u0436\u044B\u043B",
        yy: "%d \u0436\u044B\u043B"
      },
      ordinal: function ordinal74(n) {
        return n;
      },
      formats: {
        LT: "HH:mm",
        LTS: "HH:mm:ss",
        L: "DD.MM.YYYY",
        LL: "D MMMM YYYY",
        LLL: "D MMMM YYYY HH:mm",
        LLLL: "dddd, D MMMM YYYY HH:mm"
      }
    };
    stdin_default2.locale(locale73, null, true);
    kk_default = locale73;
  }
});

// public/codesandbox-runtime/dayjs-locale/km.js
var km_exports = {};
__export(km_exports, {
  default: () => km_default
});
var locale74, km_default;
var init_km = __esm({
  "public/codesandbox-runtime/dayjs-locale/km.js"() {
    "use strict";
    init_dayjs();
    locale74 = {
      name: "km",
      weekdays: "\u17A2\u17B6\u1791\u17B7\u178F\u17D2\u1799_\u1785\u17D0\u1793\u17D2\u1791_\u17A2\u1784\u17D2\u1782\u17B6\u179A_\u1796\u17BB\u1792_\u1796\u17D2\u179A\u17A0\u179F\u17D2\u1794\u178F\u17B7\u17CD_\u179F\u17BB\u1780\u17D2\u179A_\u179F\u17C5\u179A\u17CD".split("_"),
      months: "\u1798\u1780\u179A\u17B6_\u1780\u17BB\u1798\u17D2\u1797\u17C8_\u1798\u17B8\u1793\u17B6_\u1798\u17C1\u179F\u17B6_\u17A7\u179F\u1797\u17B6_\u1798\u17B7\u1790\u17BB\u1793\u17B6_\u1780\u1780\u17D2\u1780\u178A\u17B6_\u179F\u17B8\u17A0\u17B6_\u1780\u1789\u17D2\u1789\u17B6_\u178F\u17BB\u179B\u17B6_\u179C\u17B7\u1785\u17D2\u1786\u17B7\u1780\u17B6_\u1792\u17D2\u1793\u17BC".split("_"),
      weekStart: 1,
      weekdaysShort: "\u17A2\u17B6_\u1785_\u17A2_\u1796_\u1796\u17D2\u179A_\u179F\u17BB_\u179F".split("_"),
      monthsShort: "\u1798\u1780\u179A\u17B6_\u1780\u17BB\u1798\u17D2\u1797\u17C8_\u1798\u17B8\u1793\u17B6_\u1798\u17C1\u179F\u17B6_\u17A7\u179F\u1797\u17B6_\u1798\u17B7\u1790\u17BB\u1793\u17B6_\u1780\u1780\u17D2\u1780\u178A\u17B6_\u179F\u17B8\u17A0\u17B6_\u1780\u1789\u17D2\u1789\u17B6_\u178F\u17BB\u179B\u17B6_\u179C\u17B7\u1785\u17D2\u1786\u17B7\u1780\u17B6_\u1792\u17D2\u1793\u17BC".split("_"),
      weekdaysMin: "\u17A2\u17B6_\u1785_\u17A2_\u1796_\u1796\u17D2\u179A_\u179F\u17BB_\u179F".split("_"),
      ordinal: function ordinal75(n) {
        return n;
      },
      formats: {
        LT: "HH:mm",
        LTS: "HH:mm:ss",
        L: "DD/MM/YYYY",
        LL: "D MMMM YYYY",
        LLL: "D MMMM YYYY HH:mm",
        LLLL: "dddd, D MMMM YYYY HH:mm"
      },
      relativeTime: {
        future: "%s\u1791\u17C0\u178F",
        past: "%s\u1798\u17BB\u1793",
        s: "\u1794\u17C9\u17BB\u1793\u17D2\u1798\u17B6\u1793\u179C\u17B7\u1793\u17B6\u1791\u17B8",
        m: "\u1798\u17BD\u1799\u1793\u17B6\u1791\u17B8",
        mm: "%d \u1793\u17B6\u1791\u17B8",
        h: "\u1798\u17BD\u1799\u1798\u17C9\u17C4\u1784",
        hh: "%d \u1798\u17C9\u17C4\u1784",
        d: "\u1798\u17BD\u1799\u1790\u17D2\u1784\u17C3",
        dd: "%d \u1790\u17D2\u1784\u17C3",
        M: "\u1798\u17BD\u1799\u1781\u17C2",
        MM: "%d \u1781\u17C2",
        y: "\u1798\u17BD\u1799\u1786\u17D2\u1793\u17B6\u17C6",
        yy: "%d \u1786\u17D2\u1793\u17B6\u17C6"
      }
    };
    stdin_default2.locale(locale74, null, true);
    km_default = locale74;
  }
});

// public/codesandbox-runtime/dayjs-locale/kn.js
var kn_exports = {};
__export(kn_exports, {
  default: () => kn_default
});
var locale75, kn_default;
var init_kn = __esm({
  "public/codesandbox-runtime/dayjs-locale/kn.js"() {
    "use strict";
    init_dayjs();
    locale75 = {
      name: "kn",
      weekdays: "\u0CAD\u0CBE\u0CA8\u0CC1\u0CB5\u0CBE\u0CB0_\u0CB8\u0CC6\u0CC2\u0CD5\u0CAE\u0CB5\u0CBE\u0CB0_\u0CAE\u0C82\u0C97\u0CB3\u0CB5\u0CBE\u0CB0_\u0CAC\u0CC1\u0CA7\u0CB5\u0CBE\u0CB0_\u0C97\u0CC1\u0CB0\u0CC1\u0CB5\u0CBE\u0CB0_\u0CB6\u0CC1\u0C95\u0CCD\u0CB0\u0CB5\u0CBE\u0CB0_\u0CB6\u0CA8\u0CBF\u0CB5\u0CBE\u0CB0".split("_"),
      months: "\u0C9C\u0CA8\u0CB5\u0CB0\u0CBF_\u0CAB\u0CC6\u0CAC\u0CCD\u0CB0\u0CB5\u0CB0\u0CBF_\u0CAE\u0CBE\u0CB0\u0CCD\u0C9A\u0CCD_\u0C8F\u0CAA\u0CCD\u0CB0\u0CBF\u0CB2\u0CCD_\u0CAE\u0CC6\u0CD5_\u0C9C\u0CC2\u0CA8\u0CCD_\u0C9C\u0CC1\u0CB2\u0CC6\u0CD6_\u0C86\u0C97\u0CB8\u0CCD\u0C9F\u0CCD_\u0CB8\u0CC6\u0CAA\u0CCD\u0C9F\u0CC6\u0C82\u0CAC\u0CB0\u0CCD_\u0C85\u0C95\u0CCD\u0C9F\u0CC6\u0CC2\u0CD5\u0CAC\u0CB0\u0CCD_\u0CA8\u0CB5\u0CC6\u0C82\u0CAC\u0CB0\u0CCD_\u0CA1\u0CBF\u0CB8\u0CC6\u0C82\u0CAC\u0CB0\u0CCD".split("_"),
      weekdaysShort: "\u0CAD\u0CBE\u0CA8\u0CC1_\u0CB8\u0CC6\u0CC2\u0CD5\u0CAE_\u0CAE\u0C82\u0C97\u0CB3_\u0CAC\u0CC1\u0CA7_\u0C97\u0CC1\u0CB0\u0CC1_\u0CB6\u0CC1\u0C95\u0CCD\u0CB0_\u0CB6\u0CA8\u0CBF".split("_"),
      monthsShort: "\u0C9C\u0CA8_\u0CAB\u0CC6\u0CAC\u0CCD\u0CB0_\u0CAE\u0CBE\u0CB0\u0CCD\u0C9A\u0CCD_\u0C8F\u0CAA\u0CCD\u0CB0\u0CBF\u0CB2\u0CCD_\u0CAE\u0CC6\u0CD5_\u0C9C\u0CC2\u0CA8\u0CCD_\u0C9C\u0CC1\u0CB2\u0CC6\u0CD6_\u0C86\u0C97\u0CB8\u0CCD\u0C9F\u0CCD_\u0CB8\u0CC6\u0CAA\u0CCD\u0C9F\u0CC6\u0C82_\u0C85\u0C95\u0CCD\u0C9F\u0CC6\u0CC2\u0CD5_\u0CA8\u0CB5\u0CC6\u0C82_\u0CA1\u0CBF\u0CB8\u0CC6\u0C82".split("_"),
      weekdaysMin: "\u0CAD\u0CBE_\u0CB8\u0CC6\u0CC2\u0CD5_\u0CAE\u0C82_\u0CAC\u0CC1_\u0C97\u0CC1_\u0CB6\u0CC1_\u0CB6".split("_"),
      ordinal: function ordinal76(n) {
        return n;
      },
      formats: {
        LT: "A h:mm",
        LTS: "A h:mm:ss",
        L: "DD/MM/YYYY",
        LL: "D MMMM YYYY",
        LLL: "D MMMM YYYY, A h:mm",
        LLLL: "dddd, D MMMM YYYY, A h:mm"
      },
      relativeTime: {
        future: "%s \u0CA8\u0C82\u0CA4\u0CB0",
        past: "%s \u0CB9\u0CBF\u0C82\u0CA6\u0CC6",
        s: "\u0C95\u0CC6\u0CB2\u0CB5\u0CC1 \u0C95\u0CCD\u0CB7\u0CA3\u0C97\u0CB3\u0CC1",
        m: "\u0C92\u0C82\u0CA6\u0CC1 \u0CA8\u0CBF\u0CAE\u0CBF\u0CB7",
        mm: "%d \u0CA8\u0CBF\u0CAE\u0CBF\u0CB7",
        h: "\u0C92\u0C82\u0CA6\u0CC1 \u0C97\u0C82\u0C9F\u0CC6",
        hh: "%d \u0C97\u0C82\u0C9F\u0CC6",
        d: "\u0C92\u0C82\u0CA6\u0CC1 \u0CA6\u0CBF\u0CA8",
        dd: "%d \u0CA6\u0CBF\u0CA8",
        M: "\u0C92\u0C82\u0CA6\u0CC1 \u0CA4\u0CBF\u0C82\u0C97\u0CB3\u0CC1",
        MM: "%d \u0CA4\u0CBF\u0C82\u0C97\u0CB3\u0CC1",
        y: "\u0C92\u0C82\u0CA6\u0CC1 \u0CB5\u0CB0\u0CCD\u0CB7",
        yy: "%d \u0CB5\u0CB0\u0CCD\u0CB7"
      }
    };
    stdin_default2.locale(locale75, null, true);
    kn_default = locale75;
  }
});

// public/codesandbox-runtime/dayjs-locale/ko.js
var ko_exports = {};
__export(ko_exports, {
  default: () => ko_default
});
var locale76, ko_default;
var init_ko = __esm({
  "public/codesandbox-runtime/dayjs-locale/ko.js"() {
    "use strict";
    init_dayjs();
    locale76 = {
      name: "ko",
      weekdays: "\uC77C\uC694\uC77C_\uC6D4\uC694\uC77C_\uD654\uC694\uC77C_\uC218\uC694\uC77C_\uBAA9\uC694\uC77C_\uAE08\uC694\uC77C_\uD1A0\uC694\uC77C".split("_"),
      weekdaysShort: "\uC77C_\uC6D4_\uD654_\uC218_\uBAA9_\uAE08_\uD1A0".split("_"),
      weekdaysMin: "\uC77C_\uC6D4_\uD654_\uC218_\uBAA9_\uAE08_\uD1A0".split("_"),
      months: "1\uC6D4_2\uC6D4_3\uC6D4_4\uC6D4_5\uC6D4_6\uC6D4_7\uC6D4_8\uC6D4_9\uC6D4_10\uC6D4_11\uC6D4_12\uC6D4".split("_"),
      monthsShort: "1\uC6D4_2\uC6D4_3\uC6D4_4\uC6D4_5\uC6D4_6\uC6D4_7\uC6D4_8\uC6D4_9\uC6D4_10\uC6D4_11\uC6D4_12\uC6D4".split("_"),
      ordinal: function ordinal77(n) {
        return n + "\uC77C";
      },
      formats: {
        LT: "A h:mm",
        LTS: "A h:mm:ss",
        L: "YYYY.MM.DD.",
        LL: "YYYY\uB144 MMMM D\uC77C",
        LLL: "YYYY\uB144 MMMM D\uC77C A h:mm",
        LLLL: "YYYY\uB144 MMMM D\uC77C dddd A h:mm",
        l: "YYYY.MM.DD.",
        ll: "YYYY\uB144 MMMM D\uC77C",
        lll: "YYYY\uB144 MMMM D\uC77C A h:mm",
        llll: "YYYY\uB144 MMMM D\uC77C dddd A h:mm"
      },
      meridiem: function meridiem13(hour) {
        return hour < 12 ? "\uC624\uC804" : "\uC624\uD6C4";
      },
      relativeTime: {
        future: "%s \uD6C4",
        past: "%s \uC804",
        s: "\uBA87 \uCD08",
        m: "1\uBD84",
        mm: "%d\uBD84",
        h: "\uD55C \uC2DC\uAC04",
        hh: "%d\uC2DC\uAC04",
        d: "\uD558\uB8E8",
        dd: "%d\uC77C",
        M: "\uD55C \uB2EC",
        MM: "%d\uB2EC",
        y: "\uC77C \uB144",
        yy: "%d\uB144"
      }
    };
    stdin_default2.locale(locale76, null, true);
    ko_default = locale76;
  }
});

// public/codesandbox-runtime/dayjs-locale/ku.js
var ku_exports = {};
__export(ku_exports, {
  default: () => ku_default,
  englishToArabicNumbersMap: () => englishToArabicNumbersMap
});
var englishToArabicNumbersMap, arabicToEnglishNumbersMap, months6, locale77, ku_default;
var init_ku = __esm({
  "public/codesandbox-runtime/dayjs-locale/ku.js"() {
    "use strict";
    init_dayjs();
    englishToArabicNumbersMap = {
      1: "\u0661",
      2: "\u0662",
      3: "\u0663",
      4: "\u0664",
      5: "\u0665",
      6: "\u0666",
      7: "\u0667",
      8: "\u0668",
      9: "\u0669",
      0: "\u0660"
    };
    arabicToEnglishNumbersMap = {
      "\u0661": "1",
      "\u0662": "2",
      "\u0663": "3",
      "\u0664": "4",
      "\u0665": "5",
      "\u0666": "6",
      "\u0667": "7",
      "\u0668": "8",
      "\u0669": "9",
      "\u0660": "0"
    };
    months6 = ["\u06A9\u0627\u0646\u0648\u0648\u0646\u06CC \u062F\u0648\u0648\u06D5\u0645", "\u0634\u0648\u0628\u0627\u062A", "\u0626\u0627\u062F\u0627\u0631", "\u0646\u06CC\u0633\u0627\u0646", "\u0626\u0627\u06CC\u0627\u0631", "\u062D\u0648\u0632\u06D5\u06CC\u0631\u0627\u0646", "\u062A\u06D5\u0645\u0645\u0648\u0648\u0632", "\u0626\u0627\u0628", "\u0626\u06D5\u06CC\u0644\u0648\u0648\u0644", "\u062A\u0634\u0631\u06CC\u0646\u06CC \u06CC\u06D5\u06A9\u06D5\u0645", "\u062A\u0634\u0631\u06CC\u0646\u06CC \u062F\u0648\u0648\u06D5\u0645", "\u06A9\u0627\u0646\u0648\u0648\u0646\u06CC \u06CC\u06D5\u06A9\u06D5\u0645"];
    locale77 = {
      name: "ku",
      months: months6,
      monthsShort: months6,
      weekdays: "\u06CC\u06D5\u06A9\u0634\u06D5\u0645\u0645\u06D5_\u062F\u0648\u0648\u0634\u06D5\u0645\u0645\u06D5_\u0633\u06CE\u0634\u06D5\u0645\u0645\u06D5_\u0686\u0648\u0627\u0631\u0634\u06D5\u0645\u0645\u06D5_\u067E\u06CE\u0646\u062C\u0634\u06D5\u0645\u0645\u06D5_\u0647\u06D5\u06CC\u0646\u06CC_\u0634\u06D5\u0645\u0645\u06D5".split("_"),
      weekdaysShort: "\u06CC\u06D5\u06A9\u0634\u06D5\u0645_\u062F\u0648\u0648\u0634\u06D5\u0645_\u0633\u06CE\u0634\u06D5\u0645_\u0686\u0648\u0627\u0631\u0634\u06D5\u0645_\u067E\u06CE\u0646\u062C\u0634\u06D5\u0645_\u0647\u06D5\u06CC\u0646\u06CC_\u0634\u06D5\u0645\u0645\u06D5".split("_"),
      weekStart: 6,
      weekdaysMin: "\u06CC_\u062F_\u0633_\u0686_\u067E_\u0647\u0640_\u0634".split("_"),
      preparse: function preparse4(string) {
        return string.replace(/[١٢٣٤٥٦٧٨٩٠]/g, function(match) {
          return arabicToEnglishNumbersMap[match];
        }).replace(/،/g, ",");
      },
      postformat: function postformat4(string) {
        return string.replace(/\d/g, function(match) {
          return englishToArabicNumbersMap[match];
        }).replace(/,/g, "\u060C");
      },
      ordinal: function ordinal78(n) {
        return n;
      },
      formats: {
        LT: "HH:mm",
        LTS: "HH:mm:ss",
        L: "DD/MM/YYYY",
        LL: "D MMMM YYYY",
        LLL: "D MMMM YYYY HH:mm",
        LLLL: "dddd, D MMMM YYYY HH:mm"
      },
      meridiem: function meridiem14(hour) {
        return hour < 12 ? "\u067E.\u0646" : "\u062F.\u0646";
      },
      relativeTime: {
        future: "\u0644\u06D5 %s",
        past: "\u0644\u06D5\u0645\u06D5\u0648\u067E\u06CE\u0634 %s",
        s: "\u0686\u06D5\u0646\u062F \u0686\u0631\u06A9\u06D5\u06CC\u06D5\u06A9",
        m: "\u06CC\u06D5\u06A9 \u062E\u0648\u0644\u06D5\u06A9",
        mm: "%d \u062E\u0648\u0644\u06D5\u06A9",
        h: "\u06CC\u06D5\u06A9 \u06A9\u0627\u062A\u0698\u0645\u06CE\u0631",
        hh: "%d \u06A9\u0627\u062A\u0698\u0645\u06CE\u0631",
        d: "\u06CC\u06D5\u06A9 \u0695\u06C6\u0698",
        dd: "%d \u0695\u06C6\u0698",
        M: "\u06CC\u06D5\u06A9 \u0645\u0627\u0646\u06AF",
        MM: "%d \u0645\u0627\u0646\u06AF",
        y: "\u06CC\u06D5\u06A9 \u0633\u0627\u06B5",
        yy: "%d \u0633\u0627\u06B5"
      }
    };
    stdin_default2.locale(locale77, null, true);
    ku_default = locale77;
  }
});

// public/codesandbox-runtime/dayjs-locale/ky.js
var ky_exports = {};
__export(ky_exports, {
  default: () => ky_default
});
var locale78, ky_default;
var init_ky = __esm({
  "public/codesandbox-runtime/dayjs-locale/ky.js"() {
    "use strict";
    init_dayjs();
    locale78 = {
      name: "ky",
      weekdays: "\u0416\u0435\u043A\u0448\u0435\u043C\u0431\u0438_\u0414\u04AF\u0439\u0448\u04E9\u043C\u0431\u04AF_\u0428\u0435\u0439\u0448\u0435\u043C\u0431\u0438_\u0428\u0430\u0440\u0448\u0435\u043C\u0431\u0438_\u0411\u0435\u0439\u0448\u0435\u043C\u0431\u0438_\u0416\u0443\u043C\u0430_\u0418\u0448\u0435\u043C\u0431\u0438".split("_"),
      months: "\u044F\u043D\u0432\u0430\u0440\u044C_\u0444\u0435\u0432\u0440\u0430\u043B\u044C_\u043C\u0430\u0440\u0442_\u0430\u043F\u0440\u0435\u043B\u044C_\u043C\u0430\u0439_\u0438\u044E\u043D\u044C_\u0438\u044E\u043B\u044C_\u0430\u0432\u0433\u0443\u0441\u0442_\u0441\u0435\u043D\u0442\u044F\u0431\u0440\u044C_\u043E\u043A\u0442\u044F\u0431\u0440\u044C_\u043D\u043E\u044F\u0431\u0440\u044C_\u0434\u0435\u043A\u0430\u0431\u0440\u044C".split("_"),
      weekStart: 1,
      weekdaysShort: "\u0416\u0435\u043A_\u0414\u04AF\u0439_\u0428\u0435\u0439_\u0428\u0430\u0440_\u0411\u0435\u0439_\u0416\u0443\u043C_\u0418\u0448\u0435".split("_"),
      monthsShort: "\u044F\u043D\u0432_\u0444\u0435\u0432_\u043C\u0430\u0440\u0442_\u0430\u043F\u0440_\u043C\u0430\u0439_\u0438\u044E\u043D\u044C_\u0438\u044E\u043B\u044C_\u0430\u0432\u0433_\u0441\u0435\u043D_\u043E\u043A\u0442_\u043D\u043E\u044F_\u0434\u0435\u043A".split("_"),
      weekdaysMin: "\u0416\u043A_\u0414\u0439_\u0428\u0439_\u0428\u0440_\u0411\u0439_\u0416\u043C_\u0418\u0448".split("_"),
      ordinal: function ordinal79(n) {
        return n;
      },
      formats: {
        LT: "HH:mm",
        LTS: "HH:mm:ss",
        L: "DD.MM.YYYY",
        LL: "D MMMM YYYY",
        LLL: "D MMMM YYYY HH:mm",
        LLLL: "dddd, D MMMM YYYY HH:mm"
      },
      relativeTime: {
        future: "%s \u0438\u0447\u0438\u043D\u0434\u0435",
        past: "%s \u043C\u0443\u0440\u0443\u043D",
        s: "\u0431\u0438\u0440\u043D\u0435\u0447\u0435 \u0441\u0435\u043A\u0443\u043D\u0434",
        m: "\u0431\u0438\u0440 \u043C\u04AF\u043D\u04E9\u0442",
        mm: "%d \u043C\u04AF\u043D\u04E9\u0442",
        h: "\u0431\u0438\u0440 \u0441\u0430\u0430\u0442",
        hh: "%d \u0441\u0430\u0430\u0442",
        d: "\u0431\u0438\u0440 \u043A\u04AF\u043D",
        dd: "%d \u043A\u04AF\u043D",
        M: "\u0431\u0438\u0440 \u0430\u0439",
        MM: "%d \u0430\u0439",
        y: "\u0431\u0438\u0440 \u0436\u044B\u043B",
        yy: "%d \u0436\u044B\u043B"
      }
    };
    stdin_default2.locale(locale78, null, true);
    ky_default = locale78;
  }
});

// public/codesandbox-runtime/dayjs-locale/lb.js
var lb_exports = {};
__export(lb_exports, {
  default: () => lb_default
});
var locale79, lb_default;
var init_lb = __esm({
  "public/codesandbox-runtime/dayjs-locale/lb.js"() {
    "use strict";
    init_dayjs();
    locale79 = {
      name: "lb",
      weekdays: "Sonndeg_M\xE9indeg_D\xEBnschdeg_M\xEBttwoch_Donneschdeg_Freideg_Samschdeg".split("_"),
      months: "Januar_Februar_M\xE4erz_Abr\xEBll_Mee_Juni_Juli_August_September_Oktober_November_Dezember".split("_"),
      weekStart: 1,
      weekdaysShort: "So._M\xE9._D\xEB._M\xEB._Do._Fr._Sa.".split("_"),
      monthsShort: "Jan._Febr._Mrz._Abr._Mee_Jun._Jul._Aug._Sept._Okt._Nov._Dez.".split("_"),
      weekdaysMin: "So_M\xE9_D\xEB_M\xEB_Do_Fr_Sa".split("_"),
      ordinal: function ordinal80(n) {
        return n;
      },
      formats: {
        LT: "H:mm [Auer]",
        LTS: "H:mm:ss [Auer]",
        L: "DD.MM.YYYY",
        LL: "D. MMMM YYYY",
        LLL: "D. MMMM YYYY H:mm [Auer]",
        LLLL: "dddd, D. MMMM YYYY H:mm [Auer]"
      }
    };
    stdin_default2.locale(locale79, null, true);
    lb_default = locale79;
  }
});

// public/codesandbox-runtime/dayjs-locale/lo.js
var lo_exports = {};
__export(lo_exports, {
  default: () => lo_default
});
var locale80, lo_default;
var init_lo = __esm({
  "public/codesandbox-runtime/dayjs-locale/lo.js"() {
    "use strict";
    init_dayjs();
    locale80 = {
      name: "lo",
      weekdays: "\u0EAD\u0EB2\u0E97\u0EB4\u0E94_\u0E88\u0EB1\u0E99_\u0EAD\u0EB1\u0E87\u0E84\u0EB2\u0E99_\u0E9E\u0EB8\u0E94_\u0E9E\u0EB0\u0EAB\u0EB1\u0E94_\u0EAA\u0EB8\u0E81_\u0EC0\u0EAA\u0EBB\u0EB2".split("_"),
      months: "\u0EA1\u0EB1\u0E87\u0E81\u0EAD\u0E99_\u0E81\u0EB8\u0EA1\u0E9E\u0EB2_\u0EA1\u0EB5\u0E99\u0EB2_\u0EC0\u0EA1\u0EAA\u0EB2_\u0E9E\u0EB6\u0E94\u0EAA\u0EB0\u0E9E\u0EB2_\u0EA1\u0EB4\u0E96\u0EB8\u0E99\u0EB2_\u0E81\u0ECD\u0EA5\u0EB0\u0E81\u0EBB\u0E94_\u0EAA\u0EB4\u0E87\u0EAB\u0EB2_\u0E81\u0EB1\u0E99\u0E8D\u0EB2_\u0E95\u0EB8\u0EA5\u0EB2_\u0E9E\u0EB0\u0E88\u0EB4\u0E81_\u0E97\u0EB1\u0E99\u0EA7\u0EB2".split("_"),
      weekdaysShort: "\u0E97\u0EB4\u0E94_\u0E88\u0EB1\u0E99_\u0EAD\u0EB1\u0E87\u0E84\u0EB2\u0E99_\u0E9E\u0EB8\u0E94_\u0E9E\u0EB0\u0EAB\u0EB1\u0E94_\u0EAA\u0EB8\u0E81_\u0EC0\u0EAA\u0EBB\u0EB2".split("_"),
      monthsShort: "\u0EA1\u0EB1\u0E87\u0E81\u0EAD\u0E99_\u0E81\u0EB8\u0EA1\u0E9E\u0EB2_\u0EA1\u0EB5\u0E99\u0EB2_\u0EC0\u0EA1\u0EAA\u0EB2_\u0E9E\u0EB6\u0E94\u0EAA\u0EB0\u0E9E\u0EB2_\u0EA1\u0EB4\u0E96\u0EB8\u0E99\u0EB2_\u0E81\u0ECD\u0EA5\u0EB0\u0E81\u0EBB\u0E94_\u0EAA\u0EB4\u0E87\u0EAB\u0EB2_\u0E81\u0EB1\u0E99\u0E8D\u0EB2_\u0E95\u0EB8\u0EA5\u0EB2_\u0E9E\u0EB0\u0E88\u0EB4\u0E81_\u0E97\u0EB1\u0E99\u0EA7\u0EB2".split("_"),
      weekdaysMin: "\u0E97_\u0E88_\u0EAD\u0E84_\u0E9E_\u0E9E\u0EAB_\u0EAA\u0E81_\u0EAA".split("_"),
      ordinal: function ordinal81(n) {
        return n;
      },
      formats: {
        LT: "HH:mm",
        LTS: "HH:mm:ss",
        L: "DD/MM/YYYY",
        LL: "D MMMM YYYY",
        LLL: "D MMMM YYYY HH:mm",
        LLLL: "\u0EA7\u0EB1\u0E99dddd D MMMM YYYY HH:mm"
      },
      relativeTime: {
        future: "\u0EAD\u0EB5\u0E81 %s",
        past: "%s\u0E9C\u0EC8\u0EB2\u0E99\u0EA1\u0EB2",
        s: "\u0E9A\u0ECD\u0EC8\u0EC0\u0E97\u0EBB\u0EC8\u0EB2\u0EC3\u0E94\u0EA7\u0EB4\u0E99\u0EB2\u0E97\u0EB5",
        m: "1 \u0E99\u0EB2\u0E97\u0EB5",
        mm: "%d \u0E99\u0EB2\u0E97\u0EB5",
        h: "1 \u0E8A\u0EBB\u0EC8\u0EA7\u0EC2\u0EA1\u0E87",
        hh: "%d \u0E8A\u0EBB\u0EC8\u0EA7\u0EC2\u0EA1\u0E87",
        d: "1 \u0EA1\u0EB7\u0EC9",
        dd: "%d \u0EA1\u0EB7\u0EC9",
        M: "1 \u0EC0\u0E94\u0EB7\u0EAD\u0E99",
        MM: "%d \u0EC0\u0E94\u0EB7\u0EAD\u0E99",
        y: "1 \u0E9B\u0EB5",
        yy: "%d \u0E9B\u0EB5"
      }
    };
    stdin_default2.locale(locale80, null, true);
    lo_default = locale80;
  }
});

// public/codesandbox-runtime/dayjs-locale/lt.js
var lt_exports = {};
__export(lt_exports, {
  default: () => lt_default
});
var monthFormat3, monthStandalone3, MONTHS_IN_FORMAT3, months7, locale81, lt_default;
var init_lt = __esm({
  "public/codesandbox-runtime/dayjs-locale/lt.js"() {
    "use strict";
    init_dayjs();
    monthFormat3 = "sausio_vasario_kovo_baland\u017Eio_gegu\u017E\u0117s_bir\u017Eelio_liepos_rugpj\u016B\u010Dio_rugs\u0117jo_spalio_lapkri\u010Dio_gruod\u017Eio".split("_");
    monthStandalone3 = "sausis_vasaris_kovas_balandis_gegu\u017E\u0117_bir\u017Eelis_liepa_rugpj\u016Btis_rugs\u0117jis_spalis_lapkritis_gruodis".split("_");
    MONTHS_IN_FORMAT3 = /D[oD]?(\[[^\[\]]*\]|\s)+MMMM?|MMMM?(\[[^\[\]]*\]|\s)+D[oD]?/;
    months7 = function months8(dayjsInstance, format) {
      if (MONTHS_IN_FORMAT3.test(format)) {
        return monthFormat3[dayjsInstance.month()];
      }
      return monthStandalone3[dayjsInstance.month()];
    };
    months7.s = monthStandalone3;
    months7.f = monthFormat3;
    locale81 = {
      name: "lt",
      weekdays: "sekmadienis_pirmadienis_antradienis_tre\u010Diadienis_ketvirtadienis_penktadienis_\u0161e\u0161tadienis".split("_"),
      weekdaysShort: "sek_pir_ant_tre_ket_pen_\u0161e\u0161".split("_"),
      weekdaysMin: "s_p_a_t_k_pn_\u0161".split("_"),
      months: months7,
      monthsShort: "sau_vas_kov_bal_geg_bir_lie_rgp_rgs_spa_lap_grd".split("_"),
      ordinal: function ordinal82(n) {
        return n + ".";
      },
      weekStart: 1,
      relativeTime: {
        future: "u\u017E %s",
        past: "prie\u0161 %s",
        s: "kelias sekundes",
        m: "minut\u0119",
        mm: "%d minutes",
        h: "valand\u0105",
        hh: "%d valandas",
        d: "dien\u0105",
        dd: "%d dienas",
        M: "m\u0117nes\u012F",
        MM: "%d m\u0117nesius",
        y: "metus",
        yy: "%d metus"
      },
      format: {
        LT: "HH:mm",
        LTS: "HH:mm:ss",
        L: "YYYY-MM-DD",
        LL: "YYYY [m.] MMMM D [d.]",
        LLL: "YYYY [m.] MMMM D [d.], HH:mm [val.]",
        LLLL: "YYYY [m.] MMMM D [d.], dddd, HH:mm [val.]",
        l: "YYYY-MM-DD",
        ll: "YYYY [m.] MMMM D [d.]",
        lll: "YYYY [m.] MMMM D [d.], HH:mm [val.]",
        llll: "YYYY [m.] MMMM D [d.], ddd, HH:mm [val.]"
      },
      formats: {
        LT: "HH:mm",
        LTS: "HH:mm:ss",
        L: "YYYY-MM-DD",
        LL: "YYYY [m.] MMMM D [d.]",
        LLL: "YYYY [m.] MMMM D [d.], HH:mm [val.]",
        LLLL: "YYYY [m.] MMMM D [d.], dddd, HH:mm [val.]",
        l: "YYYY-MM-DD",
        ll: "YYYY [m.] MMMM D [d.]",
        lll: "YYYY [m.] MMMM D [d.], HH:mm [val.]",
        llll: "YYYY [m.] MMMM D [d.], ddd, HH:mm [val.]"
      }
    };
    stdin_default2.locale(locale81, null, true);
    lt_default = locale81;
  }
});

// public/codesandbox-runtime/dayjs-locale/lv.js
var lv_exports = {};
__export(lv_exports, {
  default: () => lv_default
});
var locale82, lv_default;
var init_lv = __esm({
  "public/codesandbox-runtime/dayjs-locale/lv.js"() {
    "use strict";
    init_dayjs();
    locale82 = {
      name: "lv",
      weekdays: "sv\u0113tdiena_pirmdiena_otrdiena_tre\u0161diena_ceturtdiena_piektdiena_sestdiena".split("_"),
      months: "janv\u0101ris_febru\u0101ris_marts_apr\u012Blis_maijs_j\u016Bnijs_j\u016Blijs_augusts_septembris_oktobris_novembris_decembris".split("_"),
      weekStart: 1,
      weekdaysShort: "Sv_P_O_T_C_Pk_S".split("_"),
      monthsShort: "jan_feb_mar_apr_mai_j\u016Bn_j\u016Bl_aug_sep_okt_nov_dec".split("_"),
      weekdaysMin: "Sv_P_O_T_C_Pk_S".split("_"),
      ordinal: function ordinal83(n) {
        return n;
      },
      formats: {
        LT: "HH:mm",
        LTS: "HH:mm:ss",
        L: "DD.MM.YYYY.",
        LL: "YYYY. [gada] D. MMMM",
        LLL: "YYYY. [gada] D. MMMM, HH:mm",
        LLLL: "YYYY. [gada] D. MMMM, dddd, HH:mm"
      },
      relativeTime: {
        future: "p\u0113c %s",
        past: "pirms %s",
        s: "da\u017E\u0101m sekund\u0113m",
        m: "min\u016Btes",
        mm: "%d min\u016Bt\u0113m",
        h: "stundas",
        hh: "%d stund\u0101m",
        d: "dienas",
        dd: "%d dien\u0101m",
        M: "m\u0113ne\u0161a",
        MM: "%d m\u0113ne\u0161iem",
        y: "gada",
        yy: "%d gadiem"
      }
    };
    stdin_default2.locale(locale82, null, true);
    lv_default = locale82;
  }
});

// public/codesandbox-runtime/dayjs-locale/me.js
var me_exports = {};
__export(me_exports, {
  default: () => me_default
});
var locale83, me_default;
var init_me = __esm({
  "public/codesandbox-runtime/dayjs-locale/me.js"() {
    "use strict";
    init_dayjs();
    locale83 = {
      name: "me",
      weekdays: "nedjelja_ponedjeljak_utorak_srijeda_\u010Detvrtak_petak_subota".split("_"),
      months: "januar_februar_mart_april_maj_jun_jul_avgust_septembar_oktobar_novembar_decembar".split("_"),
      weekStart: 1,
      weekdaysShort: "ned._pon._uto._sri._\u010Det._pet._sub.".split("_"),
      monthsShort: "jan._feb._mar._apr._maj_jun_jul_avg._sep._okt._nov._dec.".split("_"),
      weekdaysMin: "ne_po_ut_sr_\u010De_pe_su".split("_"),
      ordinal: function ordinal84(n) {
        return n;
      },
      formats: {
        LT: "H:mm",
        LTS: "H:mm:ss",
        L: "DD.MM.YYYY",
        LL: "D. MMMM YYYY",
        LLL: "D. MMMM YYYY H:mm",
        LLLL: "dddd, D. MMMM YYYY H:mm"
      }
    };
    stdin_default2.locale(locale83, null, true);
    me_default = locale83;
  }
});

// public/codesandbox-runtime/dayjs-locale/mi.js
var mi_exports = {};
__export(mi_exports, {
  default: () => mi_default
});
var locale84, mi_default;
var init_mi = __esm({
  "public/codesandbox-runtime/dayjs-locale/mi.js"() {
    "use strict";
    init_dayjs();
    locale84 = {
      name: "mi",
      weekdays: "R\u0101tapu_Mane_T\u016Brei_Wenerei_T\u0101ite_Paraire_H\u0101tarei".split("_"),
      months: "Kohi-t\u0101te_Hui-tanguru_Pout\u016B-te-rangi_Paenga-wh\u0101wh\u0101_Haratua_Pipiri_H\u014Dngoingoi_Here-turi-k\u014Dk\u0101_Mahuru_Whiringa-\u0101-nuku_Whiringa-\u0101-rangi_Hakihea".split("_"),
      weekStart: 1,
      weekdaysShort: "Ta_Ma_T\u016B_We_T\u0101i_Pa_H\u0101".split("_"),
      monthsShort: "Kohi_Hui_Pou_Pae_Hara_Pipi_H\u014Dngoi_Here_Mahu_Whi-nu_Whi-ra_Haki".split("_"),
      weekdaysMin: "Ta_Ma_T\u016B_We_T\u0101i_Pa_H\u0101".split("_"),
      ordinal: function ordinal85(n) {
        return n;
      },
      formats: {
        LT: "HH:mm",
        LTS: "HH:mm:ss",
        L: "DD/MM/YYYY",
        LL: "D MMMM YYYY",
        LLL: "D MMMM YYYY [i] HH:mm",
        LLLL: "dddd, D MMMM YYYY [i] HH:mm"
      },
      relativeTime: {
        future: "i roto i %s",
        past: "%s i mua",
        s: "te h\u0113kona ruarua",
        m: "he meneti",
        mm: "%d meneti",
        h: "te haora",
        hh: "%d haora",
        d: "he ra",
        dd: "%d ra",
        M: "he marama",
        MM: "%d marama",
        y: "he tau",
        yy: "%d tau"
      }
    };
    stdin_default2.locale(locale84, null, true);
    mi_default = locale84;
  }
});

// public/codesandbox-runtime/dayjs-locale/mk.js
var mk_exports = {};
__export(mk_exports, {
  default: () => mk_default
});
var locale85, mk_default;
var init_mk = __esm({
  "public/codesandbox-runtime/dayjs-locale/mk.js"() {
    "use strict";
    init_dayjs();
    locale85 = {
      name: "mk",
      weekdays: "\u043D\u0435\u0434\u0435\u043B\u0430_\u043F\u043E\u043D\u0435\u0434\u0435\u043B\u043D\u0438\u043A_\u0432\u0442\u043E\u0440\u043D\u0438\u043A_\u0441\u0440\u0435\u0434\u0430_\u0447\u0435\u0442\u0432\u0440\u0442\u043E\u043A_\u043F\u0435\u0442\u043E\u043A_\u0441\u0430\u0431\u043E\u0442\u0430".split("_"),
      months: "\u0458\u0430\u043D\u0443\u0430\u0440\u0438_\u0444\u0435\u0432\u0440\u0443\u0430\u0440\u0438_\u043C\u0430\u0440\u0442_\u0430\u043F\u0440\u0438\u043B_\u043C\u0430\u0458_\u0458\u0443\u043D\u0438_\u0458\u0443\u043B\u0438_\u0430\u0432\u0433\u0443\u0441\u0442_\u0441\u0435\u043F\u0442\u0435\u043C\u0432\u0440\u0438_\u043E\u043A\u0442\u043E\u043C\u0432\u0440\u0438_\u043D\u043E\u0435\u043C\u0432\u0440\u0438_\u0434\u0435\u043A\u0435\u043C\u0432\u0440\u0438".split("_"),
      weekStart: 1,
      weekdaysShort: "\u043D\u0435\u0434_\u043F\u043E\u043D_\u0432\u0442\u043E_\u0441\u0440\u0435_\u0447\u0435\u0442_\u043F\u0435\u0442_\u0441\u0430\u0431".split("_"),
      monthsShort: "\u0458\u0430\u043D_\u0444\u0435\u0432_\u043C\u0430\u0440_\u0430\u043F\u0440_\u043C\u0430\u0458_\u0458\u0443\u043D_\u0458\u0443\u043B_\u0430\u0432\u0433_\u0441\u0435\u043F_\u043E\u043A\u0442_\u043D\u043E\u0435_\u0434\u0435\u043A".split("_"),
      weekdaysMin: "\u043De_\u043Fo_\u0432\u0442_\u0441\u0440_\u0447\u0435_\u043F\u0435_\u0441a".split("_"),
      ordinal: function ordinal86(n) {
        return n;
      },
      formats: {
        LT: "H:mm",
        LTS: "H:mm:ss",
        L: "D.MM.YYYY",
        LL: "D MMMM YYYY",
        LLL: "D MMMM YYYY H:mm",
        LLLL: "dddd, D MMMM YYYY H:mm"
      },
      relativeTime: {
        future: "\u043F\u043E\u0441\u043B\u0435 %s",
        past: "\u043F\u0440\u0435\u0434 %s",
        s: "\u043D\u0435\u043A\u043E\u043B\u043A\u0443 \u0441\u0435\u043A\u0443\u043D\u0434\u0438",
        m: "\u043C\u0438\u043D\u0443\u0442\u0430",
        mm: "%d \u043C\u0438\u043D\u0443\u0442\u0438",
        h: "\u0447\u0430\u0441",
        hh: "%d \u0447\u0430\u0441\u0430",
        d: "\u0434\u0435\u043D",
        dd: "%d \u0434\u0435\u043D\u0430",
        M: "\u043C\u0435\u0441\u0435\u0446",
        MM: "%d \u043C\u0435\u0441\u0435\u0446\u0438",
        y: "\u0433\u043E\u0434\u0438\u043D\u0430",
        yy: "%d \u0433\u043E\u0434\u0438\u043D\u0438"
      }
    };
    stdin_default2.locale(locale85, null, true);
    mk_default = locale85;
  }
});

// public/codesandbox-runtime/dayjs-locale/ml.js
var ml_exports = {};
__export(ml_exports, {
  default: () => ml_default
});
var locale86, ml_default;
var init_ml = __esm({
  "public/codesandbox-runtime/dayjs-locale/ml.js"() {
    "use strict";
    init_dayjs();
    locale86 = {
      name: "ml",
      weekdays: "\u0D1E\u0D3E\u0D2F\u0D31\u0D3E\u0D34\u0D4D\u0D1A_\u0D24\u0D3F\u0D19\u0D4D\u0D15\u0D33\u0D3E\u0D34\u0D4D\u0D1A_\u0D1A\u0D4A\u0D35\u0D4D\u0D35\u0D3E\u0D34\u0D4D\u0D1A_\u0D2C\u0D41\u0D27\u0D28\u0D3E\u0D34\u0D4D\u0D1A_\u0D35\u0D4D\u0D2F\u0D3E\u0D34\u0D3E\u0D34\u0D4D\u0D1A_\u0D35\u0D46\u0D33\u0D4D\u0D33\u0D3F\u0D2F\u0D3E\u0D34\u0D4D\u0D1A_\u0D36\u0D28\u0D3F\u0D2F\u0D3E\u0D34\u0D4D\u0D1A".split("_"),
      months: "\u0D1C\u0D28\u0D41\u0D35\u0D30\u0D3F_\u0D2B\u0D46\u0D2C\u0D4D\u0D30\u0D41\u0D35\u0D30\u0D3F_\u0D2E\u0D3E\u0D7C\u0D1A\u0D4D\u0D1A\u0D4D_\u0D0F\u0D2A\u0D4D\u0D30\u0D3F\u0D7D_\u0D2E\u0D47\u0D2F\u0D4D_\u0D1C\u0D42\u0D7A_\u0D1C\u0D42\u0D32\u0D48_\u0D13\u0D17\u0D38\u0D4D\u0D31\u0D4D\u0D31\u0D4D_\u0D38\u0D46\u0D2A\u0D4D\u0D31\u0D4D\u0D31\u0D02\u0D2C\u0D7C_\u0D12\u0D15\u0D4D\u0D1F\u0D4B\u0D2C\u0D7C_\u0D28\u0D35\u0D02\u0D2C\u0D7C_\u0D21\u0D3F\u0D38\u0D02\u0D2C\u0D7C".split("_"),
      weekdaysShort: "\u0D1E\u0D3E\u0D2F\u0D7C_\u0D24\u0D3F\u0D19\u0D4D\u0D15\u0D7E_\u0D1A\u0D4A\u0D35\u0D4D\u0D35_\u0D2C\u0D41\u0D27\u0D7B_\u0D35\u0D4D\u0D2F\u0D3E\u0D34\u0D02_\u0D35\u0D46\u0D33\u0D4D\u0D33\u0D3F_\u0D36\u0D28\u0D3F".split("_"),
      monthsShort: "\u0D1C\u0D28\u0D41._\u0D2B\u0D46\u0D2C\u0D4D\u0D30\u0D41._\u0D2E\u0D3E\u0D7C._\u0D0F\u0D2A\u0D4D\u0D30\u0D3F._\u0D2E\u0D47\u0D2F\u0D4D_\u0D1C\u0D42\u0D7A_\u0D1C\u0D42\u0D32\u0D48._\u0D13\u0D17._\u0D38\u0D46\u0D2A\u0D4D\u0D31\u0D4D\u0D31._\u0D12\u0D15\u0D4D\u0D1F\u0D4B._\u0D28\u0D35\u0D02._\u0D21\u0D3F\u0D38\u0D02.".split("_"),
      weekdaysMin: "\u0D1E\u0D3E_\u0D24\u0D3F_\u0D1A\u0D4A_\u0D2C\u0D41_\u0D35\u0D4D\u0D2F\u0D3E_\u0D35\u0D46_\u0D36".split("_"),
      ordinal: function ordinal87(n) {
        return n;
      },
      formats: {
        LT: "A h:mm -\u0D28\u0D41",
        LTS: "A h:mm:ss -\u0D28\u0D41",
        L: "DD/MM/YYYY",
        LL: "D MMMM YYYY",
        LLL: "D MMMM YYYY, A h:mm -\u0D28\u0D41",
        LLLL: "dddd, D MMMM YYYY, A h:mm -\u0D28\u0D41"
      },
      relativeTime: {
        future: "%s \u0D15\u0D34\u0D3F\u0D1E\u0D4D\u0D1E\u0D4D",
        past: "%s \u0D2E\u0D41\u0D7B\u0D2A\u0D4D",
        s: "\u0D05\u0D7D\u0D2A \u0D28\u0D3F\u0D2E\u0D3F\u0D37\u0D19\u0D4D\u0D19\u0D7E",
        m: "\u0D12\u0D30\u0D41 \u0D2E\u0D3F\u0D28\u0D3F\u0D31\u0D4D\u0D31\u0D4D",
        mm: "%d \u0D2E\u0D3F\u0D28\u0D3F\u0D31\u0D4D\u0D31\u0D4D",
        h: "\u0D12\u0D30\u0D41 \u0D2E\u0D23\u0D3F\u0D15\u0D4D\u0D15\u0D42\u0D7C",
        hh: "%d \u0D2E\u0D23\u0D3F\u0D15\u0D4D\u0D15\u0D42\u0D7C",
        d: "\u0D12\u0D30\u0D41 \u0D26\u0D3F\u0D35\u0D38\u0D02",
        dd: "%d \u0D26\u0D3F\u0D35\u0D38\u0D02",
        M: "\u0D12\u0D30\u0D41 \u0D2E\u0D3E\u0D38\u0D02",
        MM: "%d \u0D2E\u0D3E\u0D38\u0D02",
        y: "\u0D12\u0D30\u0D41 \u0D35\u0D7C\u0D37\u0D02",
        yy: "%d \u0D35\u0D7C\u0D37\u0D02"
      }
    };
    stdin_default2.locale(locale86, null, true);
    ml_default = locale86;
  }
});

// public/codesandbox-runtime/dayjs-locale/mn.js
var mn_exports = {};
__export(mn_exports, {
  default: () => mn_default
});
var locale87, mn_default;
var init_mn = __esm({
  "public/codesandbox-runtime/dayjs-locale/mn.js"() {
    "use strict";
    init_dayjs();
    locale87 = {
      name: "mn",
      weekdays: "\u041D\u044F\u043C_\u0414\u0430\u0432\u0430\u0430_\u041C\u044F\u0433\u043C\u0430\u0440_\u041B\u0445\u0430\u0433\u0432\u0430_\u041F\u04AF\u0440\u044D\u0432_\u0411\u0430\u0430\u0441\u0430\u043D_\u0411\u044F\u043C\u0431\u0430".split("_"),
      months: "\u041D\u044D\u0433\u0434\u04AF\u0433\u044D\u044D\u0440 \u0441\u0430\u0440_\u0425\u043E\u0451\u0440\u0434\u0443\u0433\u0430\u0430\u0440 \u0441\u0430\u0440_\u0413\u0443\u0440\u0430\u0432\u0434\u0443\u0433\u0430\u0430\u0440 \u0441\u0430\u0440_\u0414\u04E9\u0440\u04E9\u0432\u0434\u04AF\u0433\u044D\u044D\u0440 \u0441\u0430\u0440_\u0422\u0430\u0432\u0434\u0443\u0433\u0430\u0430\u0440 \u0441\u0430\u0440_\u0417\u0443\u0440\u0433\u0430\u0434\u0443\u0433\u0430\u0430\u0440 \u0441\u0430\u0440_\u0414\u043E\u043B\u0434\u0443\u0433\u0430\u0430\u0440 \u0441\u0430\u0440_\u041D\u0430\u0439\u043C\u0434\u0443\u0433\u0430\u0430\u0440 \u0441\u0430\u0440_\u0415\u0441\u0434\u04AF\u0433\u044D\u044D\u0440 \u0441\u0430\u0440_\u0410\u0440\u0430\u0432\u0434\u0443\u0433\u0430\u0430\u0440 \u0441\u0430\u0440_\u0410\u0440\u0432\u0430\u043D \u043D\u044D\u0433\u0434\u04AF\u0433\u044D\u044D\u0440 \u0441\u0430\u0440_\u0410\u0440\u0432\u0430\u043D \u0445\u043E\u0451\u0440\u0434\u0443\u0433\u0430\u0430\u0440 \u0441\u0430\u0440".split("_"),
      weekdaysShort: "\u041D\u044F\u043C_\u0414\u0430\u0432_\u041C\u044F\u0433_\u041B\u0445\u0430_\u041F\u04AF\u0440_\u0411\u0430\u0430_\u0411\u044F\u043C".split("_"),
      monthsShort: "1 \u0441\u0430\u0440_2 \u0441\u0430\u0440_3 \u0441\u0430\u0440_4 \u0441\u0430\u0440_5 \u0441\u0430\u0440_6 \u0441\u0430\u0440_7 \u0441\u0430\u0440_8 \u0441\u0430\u0440_9 \u0441\u0430\u0440_10 \u0441\u0430\u0440_11 \u0441\u0430\u0440_12 \u0441\u0430\u0440".split("_"),
      weekdaysMin: "\u041D\u044F_\u0414\u0430_\u041C\u044F_\u041B\u0445_\u041F\u04AF_\u0411\u0430_\u0411\u044F".split("_"),
      ordinal: function ordinal88(n) {
        return n;
      },
      formats: {
        LT: "HH:mm",
        LTS: "HH:mm:ss",
        L: "YYYY-MM-DD",
        LL: "YYYY \u043E\u043D\u044B MMMM\u044B\u043D D",
        LLL: "YYYY \u043E\u043D\u044B MMMM\u044B\u043D D HH:mm",
        LLLL: "dddd, YYYY \u043E\u043D\u044B MMMM\u044B\u043D D HH:mm"
      },
      relativeTime: {
        future: "%s",
        past: "%s",
        s: "\u0441\u0430\u044F\u0445\u0430\u043D",
        m: "\u043C",
        mm: "%d\u043C",
        h: "1\u0446",
        hh: "%d\u0446",
        d: "1\u04E9",
        dd: "%d\u04E9",
        M: "1\u0441",
        MM: "%d\u0441",
        y: "1\u0436",
        yy: "%d\u0436"
      }
    };
    stdin_default2.locale(locale87, null, true);
    mn_default = locale87;
  }
});

// public/codesandbox-runtime/dayjs-locale/mr.js
var mr_exports = {};
__export(mr_exports, {
  default: () => mr_default
});
var locale88, mr_default;
var init_mr = __esm({
  "public/codesandbox-runtime/dayjs-locale/mr.js"() {
    "use strict";
    init_dayjs();
    locale88 = {
      name: "mr",
      weekdays: "\u0930\u0935\u093F\u0935\u093E\u0930_\u0938\u094B\u092E\u0935\u093E\u0930_\u092E\u0902\u0917\u0933\u0935\u093E\u0930_\u092C\u0941\u0927\u0935\u093E\u0930_\u0917\u0941\u0930\u0942\u0935\u093E\u0930_\u0936\u0941\u0915\u094D\u0930\u0935\u093E\u0930_\u0936\u0928\u093F\u0935\u093E\u0930".split("_"),
      months: "\u091C\u093E\u0928\u0947\u0935\u093E\u0930\u0940_\u092B\u0947\u092C\u094D\u0930\u0941\u0935\u093E\u0930\u0940_\u092E\u093E\u0930\u094D\u091A_\u090F\u092A\u094D\u0930\u093F\u0932_\u092E\u0947_\u091C\u0942\u0928_\u091C\u0941\u0932\u0948_\u0911\u0917\u0938\u094D\u091F_\u0938\u092A\u094D\u091F\u0947\u0902\u092C\u0930_\u0911\u0915\u094D\u091F\u094B\u092C\u0930_\u0928\u094B\u0935\u094D\u0939\u0947\u0902\u092C\u0930_\u0921\u093F\u0938\u0947\u0902\u092C\u0930".split("_"),
      weekdaysShort: "\u0930\u0935\u093F_\u0938\u094B\u092E_\u092E\u0902\u0917\u0933_\u092C\u0941\u0927_\u0917\u0941\u0930\u0942_\u0936\u0941\u0915\u094D\u0930_\u0936\u0928\u093F".split("_"),
      monthsShort: "\u091C\u093E\u0928\u0947._\u092B\u0947\u092C\u094D\u0930\u0941._\u092E\u093E\u0930\u094D\u091A._\u090F\u092A\u094D\u0930\u093F._\u092E\u0947._\u091C\u0942\u0928._\u091C\u0941\u0932\u0948._\u0911\u0917._\u0938\u092A\u094D\u091F\u0947\u0902._\u0911\u0915\u094D\u091F\u094B._\u0928\u094B\u0935\u094D\u0939\u0947\u0902._\u0921\u093F\u0938\u0947\u0902.".split("_"),
      weekdaysMin: "\u0930_\u0938\u094B_\u092E\u0902_\u092C\u0941_\u0917\u0941_\u0936\u0941_\u0936".split("_"),
      ordinal: function ordinal89(n) {
        return n;
      },
      formats: {
        LT: "A h:mm \u0935\u093E\u091C\u0924\u093E",
        LTS: "A h:mm:ss \u0935\u093E\u091C\u0924\u093E",
        L: "DD/MM/YYYY",
        LL: "D MMMM YYYY",
        LLL: "D MMMM YYYY, A h:mm \u0935\u093E\u091C\u0924\u093E",
        LLLL: "dddd, D MMMM YYYY, A h:mm \u0935\u093E\u091C\u0924\u093E"
      }
    };
    stdin_default2.locale(locale88, null, true);
    mr_default = locale88;
  }
});

// public/codesandbox-runtime/dayjs-locale/ms-my.js
var ms_my_exports = {};
__export(ms_my_exports, {
  default: () => ms_my_default
});
var locale89, ms_my_default;
var init_ms_my = __esm({
  "public/codesandbox-runtime/dayjs-locale/ms-my.js"() {
    "use strict";
    init_dayjs();
    locale89 = {
      name: "ms-my",
      weekdays: "Ahad_Isnin_Selasa_Rabu_Khamis_Jumaat_Sabtu".split("_"),
      months: "Januari_Februari_Mac_April_Mei_Jun_Julai_Ogos_September_Oktober_November_Disember".split("_"),
      weekStart: 1,
      weekdaysShort: "Ahd_Isn_Sel_Rab_Kha_Jum_Sab".split("_"),
      monthsShort: "Jan_Feb_Mac_Apr_Mei_Jun_Jul_Ogs_Sep_Okt_Nov_Dis".split("_"),
      weekdaysMin: "Ah_Is_Sl_Rb_Km_Jm_Sb".split("_"),
      ordinal: function ordinal90(n) {
        return n;
      },
      formats: {
        LT: "HH.mm",
        LTS: "HH.mm.ss",
        L: "DD/MM/YYYY",
        LL: "D MMMM YYYY",
        LLL: "D MMMM YYYY [pukul] HH.mm",
        LLLL: "dddd, D MMMM YYYY [pukul] HH.mm"
      },
      relativeTime: {
        future: "dalam %s",
        past: "%s yang lepas",
        s: "beberapa saat",
        m: "seminit",
        mm: "%d minit",
        h: "sejam",
        hh: "%d jam",
        d: "sehari",
        dd: "%d hari",
        M: "sebulan",
        MM: "%d bulan",
        y: "setahun",
        yy: "%d tahun"
      }
    };
    stdin_default2.locale(locale89, null, true);
    ms_my_default = locale89;
  }
});

// public/codesandbox-runtime/dayjs-locale/ms.js
var ms_exports = {};
__export(ms_exports, {
  default: () => ms_default
});
var locale90, ms_default;
var init_ms = __esm({
  "public/codesandbox-runtime/dayjs-locale/ms.js"() {
    "use strict";
    init_dayjs();
    locale90 = {
      name: "ms",
      weekdays: "Ahad_Isnin_Selasa_Rabu_Khamis_Jumaat_Sabtu".split("_"),
      weekdaysShort: "Ahd_Isn_Sel_Rab_Kha_Jum_Sab".split("_"),
      weekdaysMin: "Ah_Is_Sl_Rb_Km_Jm_Sb".split("_"),
      months: "Januari_Februari_Mac_April_Mei_Jun_Julai_Ogos_September_Oktober_November_Disember".split("_"),
      monthsShort: "Jan_Feb_Mac_Apr_Mei_Jun_Jul_Ogs_Sep_Okt_Nov_Dis".split("_"),
      weekStart: 1,
      formats: {
        LT: "HH.mm",
        LTS: "HH.mm.ss",
        L: "DD/MM/YYYY",
        LL: "D MMMM YYYY",
        LLL: "D MMMM YYYY HH.mm",
        LLLL: "dddd, D MMMM YYYY HH.mm"
      },
      relativeTime: {
        future: "dalam %s",
        past: "%s yang lepas",
        s: "beberapa saat",
        m: "seminit",
        mm: "%d minit",
        h: "sejam",
        hh: "%d jam",
        d: "sehari",
        dd: "%d hari",
        M: "sebulan",
        MM: "%d bulan",
        y: "setahun",
        yy: "%d tahun"
      },
      ordinal: function ordinal91(n) {
        return n + ".";
      }
    };
    stdin_default2.locale(locale90, null, true);
    ms_default = locale90;
  }
});

// public/codesandbox-runtime/dayjs-locale/mt.js
var mt_exports = {};
__export(mt_exports, {
  default: () => mt_default
});
var locale91, mt_default;
var init_mt = __esm({
  "public/codesandbox-runtime/dayjs-locale/mt.js"() {
    "use strict";
    init_dayjs();
    locale91 = {
      name: "mt",
      weekdays: "Il-\u0126add_It-Tnejn_It-Tlieta_L-Erbg\u0127a_Il-\u0126amis_Il-\u0120img\u0127a_Is-Sibt".split("_"),
      months: "Jannar_Frar_Marzu_April_Mejju_\u0120unju_Lulju_Awwissu_Settembru_Ottubru_Novembru_Di\u010Bembru".split("_"),
      weekStart: 1,
      weekdaysShort: "\u0126ad_Tne_Tli_Erb_\u0126am_\u0120im_Sib".split("_"),
      monthsShort: "Jan_Fra_Mar_Apr_Mej_\u0120un_Lul_Aww_Set_Ott_Nov_Di\u010B".split("_"),
      weekdaysMin: "\u0126a_Tn_Tl_Er_\u0126a_\u0120i_Si".split("_"),
      ordinal: function ordinal92(n) {
        return n;
      },
      formats: {
        LT: "HH:mm",
        LTS: "HH:mm:ss",
        L: "DD/MM/YYYY",
        LL: "D MMMM YYYY",
        LLL: "D MMMM YYYY HH:mm",
        LLLL: "dddd, D MMMM YYYY HH:mm"
      },
      relativeTime: {
        future: "f\u2019 %s",
        past: "%s ilu",
        s: "ftit sekondi",
        m: "minuta",
        mm: "%d minuti",
        h: "sieg\u0127a",
        hh: "%d sieg\u0127at",
        d: "\u0121urnata",
        dd: "%d \u0121ranet",
        M: "xahar",
        MM: "%d xhur",
        y: "sena",
        yy: "%d sni"
      }
    };
    stdin_default2.locale(locale91, null, true);
    mt_default = locale91;
  }
});

// public/codesandbox-runtime/dayjs-locale/my.js
var my_exports = {};
__export(my_exports, {
  default: () => my_default
});
var locale92, my_default;
var init_my = __esm({
  "public/codesandbox-runtime/dayjs-locale/my.js"() {
    "use strict";
    init_dayjs();
    locale92 = {
      name: "my",
      weekdays: "\u1010\u1014\u1004\u103A\u1039\u1002\u1014\u103D\u1031_\u1010\u1014\u1004\u103A\u1039\u101C\u102C_\u1021\u1004\u103A\u1039\u1002\u102B_\u1017\u102F\u1012\u1039\u1013\u101F\u1030\u1038_\u1000\u103C\u102C\u101E\u1015\u1010\u1031\u1038_\u101E\u1031\u102C\u1000\u103C\u102C_\u1005\u1014\u1031".split("_"),
      months: "\u1007\u1014\u103A\u1014\u101D\u102B\u101B\u102E_\u1016\u1031\u1016\u1031\u102C\u103A\u101D\u102B\u101B\u102E_\u1019\u1010\u103A_\u1027\u1015\u103C\u102E_\u1019\u1031_\u1007\u103D\u1014\u103A_\u1007\u1030\u101C\u102D\u102F\u1004\u103A_\u101E\u103C\u1002\u102F\u1010\u103A_\u1005\u1000\u103A\u1010\u1004\u103A\u1018\u102C_\u1021\u1031\u102C\u1000\u103A\u1010\u102D\u102F\u1018\u102C_\u1014\u102D\u102F\u101D\u1004\u103A\u1018\u102C_\u1012\u102E\u1007\u1004\u103A\u1018\u102C".split("_"),
      weekStart: 1,
      weekdaysShort: "\u1014\u103D\u1031_\u101C\u102C_\u1002\u102B_\u101F\u1030\u1038_\u1000\u103C\u102C_\u101E\u1031\u102C_\u1014\u1031".split("_"),
      monthsShort: "\u1007\u1014\u103A_\u1016\u1031_\u1019\u1010\u103A_\u1015\u103C\u102E_\u1019\u1031_\u1007\u103D\u1014\u103A_\u101C\u102D\u102F\u1004\u103A_\u101E\u103C_\u1005\u1000\u103A_\u1021\u1031\u102C\u1000\u103A_\u1014\u102D\u102F_\u1012\u102E".split("_"),
      weekdaysMin: "\u1014\u103D\u1031_\u101C\u102C_\u1002\u102B_\u101F\u1030\u1038_\u1000\u103C\u102C_\u101E\u1031\u102C_\u1014\u1031".split("_"),
      ordinal: function ordinal93(n) {
        return n;
      },
      formats: {
        LT: "HH:mm",
        LTS: "HH:mm:ss",
        L: "DD/MM/YYYY",
        LL: "D MMMM YYYY",
        LLL: "D MMMM YYYY HH:mm",
        LLLL: "dddd D MMMM YYYY HH:mm"
      },
      relativeTime: {
        future: "\u101C\u102C\u1019\u100A\u103A\u1037 %s \u1019\u103E\u102C",
        past: "\u101C\u103D\u1014\u103A\u1001\u1032\u1037\u101E\u1031\u102C %s \u1000",
        s: "\u1005\u1000\u1039\u1000\u1014\u103A.\u1021\u1014\u100A\u103A\u1038\u1004\u101A\u103A",
        m: "\u1010\u1005\u103A\u1019\u102D\u1014\u1005\u103A",
        mm: "%d \u1019\u102D\u1014\u1005\u103A",
        h: "\u1010\u1005\u103A\u1014\u102C\u101B\u102E",
        hh: "%d \u1014\u102C\u101B\u102E",
        d: "\u1010\u1005\u103A\u101B\u1000\u103A",
        dd: "%d \u101B\u1000\u103A",
        M: "\u1010\u1005\u103A\u101C",
        MM: "%d \u101C",
        y: "\u1010\u1005\u103A\u1014\u103E\u1005\u103A",
        yy: "%d \u1014\u103E\u1005\u103A"
      }
    };
    stdin_default2.locale(locale92, null, true);
    my_default = locale92;
  }
});

// public/codesandbox-runtime/dayjs-locale/nb.js
var nb_exports = {};
__export(nb_exports, {
  default: () => nb_default
});
var locale93, nb_default;
var init_nb = __esm({
  "public/codesandbox-runtime/dayjs-locale/nb.js"() {
    "use strict";
    init_dayjs();
    locale93 = {
      name: "nb",
      weekdays: "s\xF8ndag_mandag_tirsdag_onsdag_torsdag_fredag_l\xF8rdag".split("_"),
      weekdaysShort: "s\xF8._ma._ti._on._to._fr._l\xF8.".split("_"),
      weekdaysMin: "s\xF8_ma_ti_on_to_fr_l\xF8".split("_"),
      months: "januar_februar_mars_april_mai_juni_juli_august_september_oktober_november_desember".split("_"),
      monthsShort: "jan._feb._mars_april_mai_juni_juli_aug._sep._okt._nov._des.".split("_"),
      ordinal: function ordinal94(n) {
        return n + ".";
      },
      weekStart: 1,
      yearStart: 4,
      formats: {
        LT: "HH:mm",
        LTS: "HH:mm:ss",
        L: "DD.MM.YYYY",
        LL: "D. MMMM YYYY",
        LLL: "D. MMMM YYYY [kl.] HH:mm",
        LLLL: "dddd D. MMMM YYYY [kl.] HH:mm"
      },
      relativeTime: {
        future: "om %s",
        past: "%s siden",
        s: "noen sekunder",
        m: "ett minutt",
        mm: "%d minutter",
        h: "en time",
        hh: "%d timer",
        d: "en dag",
        dd: "%d dager",
        M: "en m\xE5ned",
        MM: "%d m\xE5neder",
        y: "ett \xE5r",
        yy: "%d \xE5r"
      }
    };
    stdin_default2.locale(locale93, null, true);
    nb_default = locale93;
  }
});

// public/codesandbox-runtime/dayjs-locale/ne.js
var ne_exports = {};
__export(ne_exports, {
  default: () => ne_default
});
var locale94, ne_default;
var init_ne = __esm({
  "public/codesandbox-runtime/dayjs-locale/ne.js"() {
    "use strict";
    init_dayjs();
    locale94 = {
      name: "ne",
      weekdays: "\u0906\u0907\u0924\u092C\u093E\u0930_\u0938\u094B\u092E\u092C\u093E\u0930_\u092E\u0919\u094D\u0917\u0932\u092C\u093E\u0930_\u092C\u0941\u0927\u092C\u093E\u0930_\u092C\u093F\u0939\u093F\u092C\u093E\u0930_\u0936\u0941\u0915\u094D\u0930\u092C\u093E\u0930_\u0936\u0928\u093F\u092C\u093E\u0930".split("_"),
      weekdaysShort: "\u0906\u0907\u0924._\u0938\u094B\u092E._\u092E\u0919\u094D\u0917\u0932._\u092C\u0941\u0927._\u092C\u093F\u0939\u093F._\u0936\u0941\u0915\u094D\u0930._\u0936\u0928\u093F.".split("_"),
      weekdaysMin: "\u0906._\u0938\u094B._\u092E\u0902._\u092C\u0941._\u092C\u093F._\u0936\u0941._\u0936.".split("_"),
      months: "\u091C\u0928\u0935\u0930\u0940_\u092B\u0947\u092C\u094D\u0930\u0941\u0935\u0930\u0940_\u092E\u093E\u0930\u094D\u091A_\u0905\u092A\u094D\u0930\u093F\u0932_\u092E\u0947_\u091C\u0941\u0928_\u091C\u0941\u0932\u093E\u0908_\u0905\u0917\u0937\u094D\u091F_\u0938\u0947\u092A\u094D\u091F\u0947\u092E\u094D\u092C\u0930_\u0905\u0915\u094D\u091F\u094B\u092C\u0930_\u0928\u094B\u092D\u0947\u092E\u094D\u092C\u0930_\u0921\u093F\u0938\u0947\u092E\u094D\u092C\u0930".split("_"),
      monthsShort: "\u091C\u0928._\u092B\u0947\u092C\u094D\u0930\u0941._\u092E\u093E\u0930\u094D\u091A_\u0905\u092A\u094D\u0930\u093F._\u092E\u0908_\u091C\u0941\u0928_\u091C\u0941\u0932\u093E\u0908._\u0905\u0917._\u0938\u0947\u092A\u094D\u091F._\u0905\u0915\u094D\u091F\u094B._\u0928\u094B\u092D\u0947._\u0921\u093F\u0938\u0947.".split("_"),
      relativeTime: {
        future: "%s \u092A\u091B\u093F",
        past: "%s \u0905\u0918\u093F",
        s: "\u0938\u0947\u0915\u0947\u0928\u094D\u0921",
        m: "\u090F\u0915 \u092E\u093F\u0928\u0947\u091F",
        mm: "%d \u092E\u093F\u0928\u0947\u091F",
        h: "\u0918\u0928\u094D\u091F\u093E",
        hh: "%d \u0918\u0928\u094D\u091F\u093E",
        d: "\u090F\u0915 \u0926\u093F\u0928",
        dd: "%d \u0926\u093F\u0928",
        M: "\u090F\u0915 \u092E\u0939\u093F\u0928\u093E",
        MM: "%d \u092E\u0939\u093F\u0928\u093E",
        y: "\u090F\u0915 \u0935\u0930\u094D\u0937",
        yy: "%d \u0935\u0930\u094D\u0937"
      },
      ordinal: function ordinal95(n) {
        return ("" + n).replace(/\d/g, function(i) {
          return "\u0966\u0967\u0968\u0969\u096A\u096B\u096C\u096D\u096E\u096F"[i];
        });
      },
      formats: {
        LT: "A\u0915\u094B h:mm \u092C\u091C\u0947",
        LTS: "A\u0915\u094B h:mm:ss \u092C\u091C\u0947",
        L: "DD/MM/YYYY",
        LL: "D MMMM YYYY",
        LLL: "D MMMM YYYY, A\u0915\u094B h:mm \u092C\u091C\u0947",
        LLLL: "dddd, D MMMM YYYY, A\u0915\u094B h:mm \u092C\u091C\u0947"
      }
    };
    stdin_default2.locale(locale94, null, true);
    ne_default = locale94;
  }
});

// public/codesandbox-runtime/dayjs-locale/nl-be.js
var nl_be_exports = {};
__export(nl_be_exports, {
  default: () => nl_be_default
});
var locale95, nl_be_default;
var init_nl_be = __esm({
  "public/codesandbox-runtime/dayjs-locale/nl-be.js"() {
    "use strict";
    init_dayjs();
    locale95 = {
      name: "nl-be",
      weekdays: "zondag_maandag_dinsdag_woensdag_donderdag_vrijdag_zaterdag".split("_"),
      months: "januari_februari_maart_april_mei_juni_juli_augustus_september_oktober_november_december".split("_"),
      monthsShort: "jan._feb._mrt._apr._mei_jun._jul._aug._sep._okt._nov._dec.".split("_"),
      weekStart: 1,
      weekdaysShort: "zo._ma._di._wo._do._vr._za.".split("_"),
      weekdaysMin: "zo_ma_di_wo_do_vr_za".split("_"),
      ordinal: function ordinal96(n) {
        return n;
      },
      formats: {
        LT: "HH:mm",
        LTS: "HH:mm:ss",
        L: "DD/MM/YYYY",
        LL: "D MMMM YYYY",
        LLL: "D MMMM YYYY HH:mm",
        LLLL: "dddd D MMMM YYYY HH:mm"
      },
      relativeTime: {
        future: "over %s",
        past: "%s geleden",
        s: "een paar seconden",
        m: "\xE9\xE9n minuut",
        mm: "%d minuten",
        h: "\xE9\xE9n uur",
        hh: "%d uur",
        d: "\xE9\xE9n dag",
        dd: "%d dagen",
        M: "\xE9\xE9n maand",
        MM: "%d maanden",
        y: "\xE9\xE9n jaar",
        yy: "%d jaar"
      }
    };
    stdin_default2.locale(locale95, null, true);
    nl_be_default = locale95;
  }
});

// public/codesandbox-runtime/dayjs-locale/nl.js
var nl_exports = {};
__export(nl_exports, {
  default: () => nl_default
});
var locale96, nl_default;
var init_nl = __esm({
  "public/codesandbox-runtime/dayjs-locale/nl.js"() {
    "use strict";
    init_dayjs();
    locale96 = {
      name: "nl",
      weekdays: "zondag_maandag_dinsdag_woensdag_donderdag_vrijdag_zaterdag".split("_"),
      weekdaysShort: "zo._ma._di._wo._do._vr._za.".split("_"),
      weekdaysMin: "zo_ma_di_wo_do_vr_za".split("_"),
      months: "januari_februari_maart_april_mei_juni_juli_augustus_september_oktober_november_december".split("_"),
      monthsShort: "jan_feb_mrt_apr_mei_jun_jul_aug_sep_okt_nov_dec".split("_"),
      ordinal: function ordinal97(n) {
        return "[" + n + (n === 1 || n === 8 || n >= 20 ? "ste" : "de") + "]";
      },
      weekStart: 1,
      yearStart: 4,
      formats: {
        LT: "HH:mm",
        LTS: "HH:mm:ss",
        L: "DD-MM-YYYY",
        LL: "D MMMM YYYY",
        LLL: "D MMMM YYYY HH:mm",
        LLLL: "dddd D MMMM YYYY HH:mm"
      },
      relativeTime: {
        future: "over %s",
        past: "%s geleden",
        s: "een paar seconden",
        m: "een minuut",
        mm: "%d minuten",
        h: "een uur",
        hh: "%d uur",
        d: "een dag",
        dd: "%d dagen",
        M: "een maand",
        MM: "%d maanden",
        y: "een jaar",
        yy: "%d jaar"
      }
    };
    stdin_default2.locale(locale96, null, true);
    nl_default = locale96;
  }
});

// public/codesandbox-runtime/dayjs-locale/nn.js
var nn_exports = {};
__export(nn_exports, {
  default: () => nn_default
});
var locale97, nn_default;
var init_nn = __esm({
  "public/codesandbox-runtime/dayjs-locale/nn.js"() {
    "use strict";
    init_dayjs();
    locale97 = {
      name: "nn",
      weekdays: "sundag_m\xE5ndag_tysdag_onsdag_torsdag_fredag_laurdag".split("_"),
      weekdaysShort: "sun_m\xE5n_tys_ons_tor_fre_lau".split("_"),
      weekdaysMin: "su_m\xE5_ty_on_to_fr_la".split("_"),
      months: "januar_februar_mars_april_mai_juni_juli_august_september_oktober_november_desember".split("_"),
      monthsShort: "jan_feb_mar_apr_mai_jun_jul_aug_sep_okt_nov_des".split("_"),
      ordinal: function ordinal98(n) {
        return n + ".";
      },
      weekStart: 1,
      relativeTime: {
        future: "om %s",
        past: "for %s sidan",
        s: "nokre sekund",
        m: "eitt minutt",
        mm: "%d minutt",
        h: "ein time",
        hh: "%d timar",
        d: "ein dag",
        dd: "%d dagar",
        M: "ein m\xE5nad",
        MM: "%d m\xE5nadar",
        y: "eitt \xE5r",
        yy: "%d \xE5r"
      },
      formats: {
        LT: "HH:mm",
        LTS: "HH:mm:ss",
        L: "DD.MM.YYYY",
        LL: "D. MMMM YYYY",
        LLL: "D. MMMM YYYY [kl.] H:mm",
        LLLL: "dddd D. MMMM YYYY [kl.] HH:mm"
      }
    };
    stdin_default2.locale(locale97, null, true);
    nn_default = locale97;
  }
});

// public/codesandbox-runtime/dayjs-locale/oc-lnc.js
var oc_lnc_exports = {};
__export(oc_lnc_exports, {
  default: () => oc_lnc_default
});
var locale98, oc_lnc_default;
var init_oc_lnc = __esm({
  "public/codesandbox-runtime/dayjs-locale/oc-lnc.js"() {
    "use strict";
    init_dayjs();
    locale98 = {
      name: "oc-lnc",
      weekdays: "dimenge_diluns_dimars_dim\xE8cres_dij\xF2us_divendres_dissabte".split("_"),
      weekdaysShort: "Dg_Dl_Dm_Dc_Dj_Dv_Ds".split("_"),
      weekdaysMin: "dg_dl_dm_dc_dj_dv_ds".split("_"),
      months: "geni\xE8r_febri\xE8r_mar\xE7_abrial_mai_junh_julhet_agost_setembre_oct\xF2bre_novembre_decembre".split("_"),
      monthsShort: "gen_feb_mar\xE7_abr_mai_junh_julh_ago_set_oct_nov_dec".split("_"),
      weekStart: 1,
      formats: {
        LT: "H:mm",
        LTS: "H:mm:ss",
        L: "DD/MM/YYYY",
        LL: "D MMMM [de] YYYY",
        LLL: "D MMMM [de] YYYY [a] H:mm",
        LLLL: "dddd D MMMM [de] YYYY [a] H:mm"
      },
      relativeTime: {
        future: "d'aqu\xED %s",
        past: "fa %s",
        s: "unas segondas",
        m: "una minuta",
        mm: "%d minutas",
        h: "una ora",
        hh: "%d oras",
        d: "un jorn",
        dd: "%d jorns",
        M: "un mes",
        MM: "%d meses",
        y: "un an",
        yy: "%d ans"
      },
      ordinal: function ordinal99(n) {
        return n + "\xBA";
      }
    };
    stdin_default2.locale(locale98, null, true);
    oc_lnc_default = locale98;
  }
});

// public/codesandbox-runtime/dayjs-locale/pa-in.js
var pa_in_exports = {};
__export(pa_in_exports, {
  default: () => pa_in_default
});
var locale99, pa_in_default;
var init_pa_in = __esm({
  "public/codesandbox-runtime/dayjs-locale/pa-in.js"() {
    "use strict";
    init_dayjs();
    locale99 = {
      name: "pa-in",
      weekdays: "\u0A10\u0A24\u0A35\u0A3E\u0A30_\u0A38\u0A4B\u0A2E\u0A35\u0A3E\u0A30_\u0A2E\u0A70\u0A17\u0A32\u0A35\u0A3E\u0A30_\u0A2C\u0A41\u0A27\u0A35\u0A3E\u0A30_\u0A35\u0A40\u0A30\u0A35\u0A3E\u0A30_\u0A38\u0A3C\u0A41\u0A71\u0A15\u0A30\u0A35\u0A3E\u0A30_\u0A38\u0A3C\u0A28\u0A40\u0A1A\u0A30\u0A35\u0A3E\u0A30".split("_"),
      months: "\u0A1C\u0A28\u0A35\u0A30\u0A40_\u0A2B\u0A3C\u0A30\u0A35\u0A30\u0A40_\u0A2E\u0A3E\u0A30\u0A1A_\u0A05\u0A2A\u0A4D\u0A30\u0A48\u0A32_\u0A2E\u0A08_\u0A1C\u0A42\u0A28_\u0A1C\u0A41\u0A32\u0A3E\u0A08_\u0A05\u0A17\u0A38\u0A24_\u0A38\u0A24\u0A70\u0A2C\u0A30_\u0A05\u0A15\u0A24\u0A42\u0A2C\u0A30_\u0A28\u0A35\u0A70\u0A2C\u0A30_\u0A26\u0A38\u0A70\u0A2C\u0A30".split("_"),
      weekdaysShort: "\u0A10\u0A24_\u0A38\u0A4B\u0A2E_\u0A2E\u0A70\u0A17\u0A32_\u0A2C\u0A41\u0A27_\u0A35\u0A40\u0A30_\u0A38\u0A3C\u0A41\u0A15\u0A30_\u0A38\u0A3C\u0A28\u0A40".split("_"),
      monthsShort: "\u0A1C\u0A28\u0A35\u0A30\u0A40_\u0A2B\u0A3C\u0A30\u0A35\u0A30\u0A40_\u0A2E\u0A3E\u0A30\u0A1A_\u0A05\u0A2A\u0A4D\u0A30\u0A48\u0A32_\u0A2E\u0A08_\u0A1C\u0A42\u0A28_\u0A1C\u0A41\u0A32\u0A3E\u0A08_\u0A05\u0A17\u0A38\u0A24_\u0A38\u0A24\u0A70\u0A2C\u0A30_\u0A05\u0A15\u0A24\u0A42\u0A2C\u0A30_\u0A28\u0A35\u0A70\u0A2C\u0A30_\u0A26\u0A38\u0A70\u0A2C\u0A30".split("_"),
      weekdaysMin: "\u0A10\u0A24_\u0A38\u0A4B\u0A2E_\u0A2E\u0A70\u0A17\u0A32_\u0A2C\u0A41\u0A27_\u0A35\u0A40\u0A30_\u0A38\u0A3C\u0A41\u0A15\u0A30_\u0A38\u0A3C\u0A28\u0A40".split("_"),
      ordinal: function ordinal100(n) {
        return n;
      },
      formats: {
        LT: "A h:mm \u0A35\u0A1C\u0A47",
        LTS: "A h:mm:ss \u0A35\u0A1C\u0A47",
        L: "DD/MM/YYYY",
        LL: "D MMMM YYYY",
        LLL: "D MMMM YYYY, A h:mm \u0A35\u0A1C\u0A47",
        LLLL: "dddd, D MMMM YYYY, A h:mm \u0A35\u0A1C\u0A47"
      },
      relativeTime: {
        future: "%s \u0A35\u0A3F\u0A71\u0A1A",
        past: "%s \u0A2A\u0A3F\u0A1B\u0A32\u0A47",
        s: "\u0A15\u0A41\u0A1D \u0A38\u0A15\u0A3F\u0A70\u0A1F",
        m: "\u0A07\u0A15 \u0A2E\u0A3F\u0A70\u0A1F",
        mm: "%d \u0A2E\u0A3F\u0A70\u0A1F",
        h: "\u0A07\u0A71\u0A15 \u0A18\u0A70\u0A1F\u0A3E",
        hh: "%d \u0A18\u0A70\u0A1F\u0A47",
        d: "\u0A07\u0A71\u0A15 \u0A26\u0A3F\u0A28",
        dd: "%d \u0A26\u0A3F\u0A28",
        M: "\u0A07\u0A71\u0A15 \u0A2E\u0A39\u0A40\u0A28\u0A3E",
        MM: "%d \u0A2E\u0A39\u0A40\u0A28\u0A47",
        y: "\u0A07\u0A71\u0A15 \u0A38\u0A3E\u0A32",
        yy: "%d \u0A38\u0A3E\u0A32"
      }
    };
    stdin_default2.locale(locale99, null, true);
    pa_in_default = locale99;
  }
});

// public/codesandbox-runtime/dayjs-locale/pl.js
var pl_exports = {};
__export(pl_exports, {
  default: () => pl_default
});
function plural3(n) {
  return n % 10 < 5 && n % 10 > 1 && ~~(n / 10) % 10 !== 1;
}
function translate2(number, withoutSuffix, key) {
  var result = number + " ";
  switch (key) {
    case "m":
      return withoutSuffix ? "minuta" : "minut\u0119";
    case "mm":
      return result + (plural3(number) ? "minuty" : "minut");
    case "h":
      return withoutSuffix ? "godzina" : "godzin\u0119";
    case "hh":
      return result + (plural3(number) ? "godziny" : "godzin");
    case "MM":
      return result + (plural3(number) ? "miesi\u0105ce" : "miesi\u0119cy");
    case "yy":
      return result + (plural3(number) ? "lata" : "lat");
  }
}
var monthFormat4, monthStandalone4, MONTHS_IN_FORMAT4, months9, locale100, pl_default;
var init_pl = __esm({
  "public/codesandbox-runtime/dayjs-locale/pl.js"() {
    "use strict";
    init_dayjs();
    monthFormat4 = "stycznia_lutego_marca_kwietnia_maja_czerwca_lipca_sierpnia_wrze\u015Bnia_pa\u017Adziernika_listopada_grudnia".split("_");
    monthStandalone4 = "stycze\u0144_luty_marzec_kwiecie\u0144_maj_czerwiec_lipiec_sierpie\u0144_wrzesie\u0144_pa\u017Adziernik_listopad_grudzie\u0144".split("_");
    MONTHS_IN_FORMAT4 = /D MMMM/;
    months9 = function months10(dayjsInstance, format) {
      if (MONTHS_IN_FORMAT4.test(format)) {
        return monthFormat4[dayjsInstance.month()];
      }
      return monthStandalone4[dayjsInstance.month()];
    };
    months9.s = monthStandalone4;
    months9.f = monthFormat4;
    locale100 = {
      name: "pl",
      weekdays: "niedziela_poniedzia\u0142ek_wtorek_\u015Broda_czwartek_pi\u0105tek_sobota".split("_"),
      weekdaysShort: "ndz_pon_wt_\u015Br_czw_pt_sob".split("_"),
      weekdaysMin: "Nd_Pn_Wt_\u015Ar_Cz_Pt_So".split("_"),
      months: months9,
      monthsShort: "sty_lut_mar_kwi_maj_cze_lip_sie_wrz_pa\u017A_lis_gru".split("_"),
      ordinal: function ordinal101(n) {
        return n + ".";
      },
      weekStart: 1,
      yearStart: 4,
      relativeTime: {
        future: "za %s",
        past: "%s temu",
        s: "kilka sekund",
        m: translate2,
        mm: translate2,
        h: translate2,
        hh: translate2,
        d: "1 dzie\u0144",
        dd: "%d dni",
        M: "miesi\u0105c",
        MM: translate2,
        y: "rok",
        yy: translate2
      },
      formats: {
        LT: "HH:mm",
        LTS: "HH:mm:ss",
        L: "DD.MM.YYYY",
        LL: "D MMMM YYYY",
        LLL: "D MMMM YYYY HH:mm",
        LLLL: "dddd, D MMMM YYYY HH:mm"
      }
    };
    stdin_default2.locale(locale100, null, true);
    pl_default = locale100;
  }
});

// public/codesandbox-runtime/dayjs-locale/pt-br.js
var pt_br_exports = {};
__export(pt_br_exports, {
  default: () => pt_br_default
});
var locale101, pt_br_default;
var init_pt_br = __esm({
  "public/codesandbox-runtime/dayjs-locale/pt-br.js"() {
    "use strict";
    init_dayjs();
    locale101 = {
      name: "pt-br",
      weekdays: "domingo_segunda-feira_ter\xE7a-feira_quarta-feira_quinta-feira_sexta-feira_s\xE1bado".split("_"),
      weekdaysShort: "dom_seg_ter_qua_qui_sex_s\xE1b".split("_"),
      weekdaysMin: "Do_2\xAA_3\xAA_4\xAA_5\xAA_6\xAA_S\xE1".split("_"),
      months: "janeiro_fevereiro_mar\xE7o_abril_maio_junho_julho_agosto_setembro_outubro_novembro_dezembro".split("_"),
      monthsShort: "jan_fev_mar_abr_mai_jun_jul_ago_set_out_nov_dez".split("_"),
      ordinal: function ordinal102(n) {
        return n + "\xBA";
      },
      formats: {
        LT: "HH:mm",
        LTS: "HH:mm:ss",
        L: "DD/MM/YYYY",
        LL: "D [de] MMMM [de] YYYY",
        LLL: "D [de] MMMM [de] YYYY [\xE0s] HH:mm",
        LLLL: "dddd, D [de] MMMM [de] YYYY [\xE0s] HH:mm"
      },
      relativeTime: {
        future: "em %s",
        past: "h\xE1 %s",
        s: "poucos segundos",
        m: "um minuto",
        mm: "%d minutos",
        h: "uma hora",
        hh: "%d horas",
        d: "um dia",
        dd: "%d dias",
        M: "um m\xEAs",
        MM: "%d meses",
        y: "um ano",
        yy: "%d anos"
      }
    };
    stdin_default2.locale(locale101, null, true);
    pt_br_default = locale101;
  }
});

// public/codesandbox-runtime/dayjs-locale/pt.js
var pt_exports = {};
__export(pt_exports, {
  default: () => pt_default
});
var locale102, pt_default;
var init_pt = __esm({
  "public/codesandbox-runtime/dayjs-locale/pt.js"() {
    "use strict";
    init_dayjs();
    locale102 = {
      name: "pt",
      weekdays: "domingo_segunda-feira_ter\xE7a-feira_quarta-feira_quinta-feira_sexta-feira_s\xE1bado".split("_"),
      weekdaysShort: "dom_seg_ter_qua_qui_sex_sab".split("_"),
      weekdaysMin: "Do_2\xAA_3\xAA_4\xAA_5\xAA_6\xAA_Sa".split("_"),
      months: "janeiro_fevereiro_mar\xE7o_abril_maio_junho_julho_agosto_setembro_outubro_novembro_dezembro".split("_"),
      monthsShort: "jan_fev_mar_abr_mai_jun_jul_ago_set_out_nov_dez".split("_"),
      ordinal: function ordinal103(n) {
        return n + "\xBA";
      },
      weekStart: 1,
      yearStart: 4,
      formats: {
        LT: "HH:mm",
        LTS: "HH:mm:ss",
        L: "DD/MM/YYYY",
        LL: "D [de] MMMM [de] YYYY",
        LLL: "D [de] MMMM [de] YYYY [\xE0s] HH:mm",
        LLLL: "dddd, D [de] MMMM [de] YYYY [\xE0s] HH:mm"
      },
      relativeTime: {
        future: "em %s",
        past: "h\xE1 %s",
        s: "alguns segundos",
        m: "um minuto",
        mm: "%d minutos",
        h: "uma hora",
        hh: "%d horas",
        d: "um dia",
        dd: "%d dias",
        M: "um m\xEAs",
        MM: "%d meses",
        y: "um ano",
        yy: "%d anos"
      }
    };
    stdin_default2.locale(locale102, null, true);
    pt_default = locale102;
  }
});

// public/codesandbox-runtime/dayjs-locale/rn.js
var rn_exports = {};
__export(rn_exports, {
  default: () => rn_default
});
var locale103, rn_default;
var init_rn = __esm({
  "public/codesandbox-runtime/dayjs-locale/rn.js"() {
    "use strict";
    init_dayjs();
    locale103 = {
      name: "rn",
      weekdays: "Ku wa Mungu_Ku wa Mbere_Ku wa Kabiri_Ku wa Gatatu_Ku wa Kane_Ku wa Gatanu_Ku wa Gatandatu".split("_"),
      weekdaysShort: "Kngu_Kmbr_Kbri_Ktat_Kkan_Ktan_Kdat".split("_"),
      weekdaysMin: "K7_K1_K2_K3_K4_K5_K6".split("_"),
      months: "Nzero_Ruhuhuma_Ntwarante_Ndamukiza_Rusama_Ruhenshi_Mukakaro_Myandagaro_Nyakanga_Gitugutu_Munyonyo_Kigarama".split("_"),
      monthsShort: "Nzer_Ruhuh_Ntwar_Ndam_Rus_Ruhen_Muk_Myand_Nyak_Git_Muny_Kig".split("_"),
      weekStart: 1,
      ordinal: function ordinal104(n) {
        return n;
      },
      relativeTime: {
        future: "mu %s",
        past: "%s",
        s: "amasegonda",
        m: "Umunota",
        mm: "%d iminota",
        h: "isaha",
        hh: "%d amasaha",
        d: "Umunsi",
        dd: "%d iminsi",
        M: "ukwezi",
        MM: "%d amezi",
        y: "umwaka",
        yy: "%d imyaka"
      },
      formats: {
        LT: "HH:mm",
        LTS: "HH:mm:ss",
        L: "DD/MM/YYYY",
        LL: "D MMMM YYYY",
        LLL: "D MMMM YYYY HH:mm",
        LLLL: "dddd, D MMMM YYYY HH:mm"
      }
    };
    stdin_default2.locale(locale103, null, true);
    rn_default = locale103;
  }
});

// public/codesandbox-runtime/dayjs-locale/ro.js
var ro_exports = {};
__export(ro_exports, {
  default: () => ro_default
});
var locale104, ro_default;
var init_ro = __esm({
  "public/codesandbox-runtime/dayjs-locale/ro.js"() {
    "use strict";
    init_dayjs();
    locale104 = {
      name: "ro",
      weekdays: "Duminic\u0103_Luni_Mar\u021Bi_Miercuri_Joi_Vineri_S\xE2mb\u0103t\u0103".split("_"),
      weekdaysShort: "Dum_Lun_Mar_Mie_Joi_Vin_S\xE2m".split("_"),
      weekdaysMin: "Du_Lu_Ma_Mi_Jo_Vi_S\xE2".split("_"),
      months: "Ianuarie_Februarie_Martie_Aprilie_Mai_Iunie_Iulie_August_Septembrie_Octombrie_Noiembrie_Decembrie".split("_"),
      monthsShort: "Ian._Febr._Mart._Apr._Mai_Iun._Iul._Aug._Sept._Oct._Nov._Dec.".split("_"),
      weekStart: 1,
      formats: {
        LT: "H:mm",
        LTS: "H:mm:ss",
        L: "DD.MM.YYYY",
        LL: "D MMMM YYYY",
        LLL: "D MMMM YYYY H:mm",
        LLLL: "dddd, D MMMM YYYY H:mm"
      },
      relativeTime: {
        future: "peste %s",
        past: "acum %s",
        s: "c\xE2teva secunde",
        m: "un minut",
        mm: "%d minute",
        h: "o or\u0103",
        hh: "%d ore",
        d: "o zi",
        dd: "%d zile",
        M: "o lun\u0103",
        MM: "%d luni",
        y: "un an",
        yy: "%d ani"
      },
      ordinal: function ordinal105(n) {
        return n;
      }
    };
    stdin_default2.locale(locale104, null, true);
    ro_default = locale104;
  }
});

// public/codesandbox-runtime/dayjs-locale/ru.js
var ru_exports = {};
__export(ru_exports, {
  default: () => ru_default
});
function plural4(word, num) {
  var forms = word.split("_");
  return num % 10 === 1 && num % 100 !== 11 ? forms[0] : num % 10 >= 2 && num % 10 <= 4 && (num % 100 < 10 || num % 100 >= 20) ? forms[1] : forms[2];
}
function relativeTimeWithPlural2(number, withoutSuffix, key) {
  var format = {
    mm: withoutSuffix ? "\u043C\u0438\u043D\u0443\u0442\u0430_\u043C\u0438\u043D\u0443\u0442\u044B_\u043C\u0438\u043D\u0443\u0442" : "\u043C\u0438\u043D\u0443\u0442\u0443_\u043C\u0438\u043D\u0443\u0442\u044B_\u043C\u0438\u043D\u0443\u0442",
    hh: "\u0447\u0430\u0441_\u0447\u0430\u0441\u0430_\u0447\u0430\u0441\u043E\u0432",
    dd: "\u0434\u0435\u043D\u044C_\u0434\u043D\u044F_\u0434\u043D\u0435\u0439",
    MM: "\u043C\u0435\u0441\u044F\u0446_\u043C\u0435\u0441\u044F\u0446\u0430_\u043C\u0435\u0441\u044F\u0446\u0435\u0432",
    yy: "\u0433\u043E\u0434_\u0433\u043E\u0434\u0430_\u043B\u0435\u0442"
  };
  if (key === "m") {
    return withoutSuffix ? "\u043C\u0438\u043D\u0443\u0442\u0430" : "\u043C\u0438\u043D\u0443\u0442\u0443";
  }
  return number + " " + plural4(format[key], +number);
}
var monthFormat5, monthStandalone5, monthShortFormat2, monthShortStandalone2, MONTHS_IN_FORMAT5, months11, monthsShort3, locale105, ru_default;
var init_ru = __esm({
  "public/codesandbox-runtime/dayjs-locale/ru.js"() {
    "use strict";
    init_dayjs();
    monthFormat5 = "\u044F\u043D\u0432\u0430\u0440\u044F_\u0444\u0435\u0432\u0440\u0430\u043B\u044F_\u043C\u0430\u0440\u0442\u0430_\u0430\u043F\u0440\u0435\u043B\u044F_\u043C\u0430\u044F_\u0438\u044E\u043D\u044F_\u0438\u044E\u043B\u044F_\u0430\u0432\u0433\u0443\u0441\u0442\u0430_\u0441\u0435\u043D\u0442\u044F\u0431\u0440\u044F_\u043E\u043A\u0442\u044F\u0431\u0440\u044F_\u043D\u043E\u044F\u0431\u0440\u044F_\u0434\u0435\u043A\u0430\u0431\u0440\u044F".split("_");
    monthStandalone5 = "\u044F\u043D\u0432\u0430\u0440\u044C_\u0444\u0435\u0432\u0440\u0430\u043B\u044C_\u043C\u0430\u0440\u0442_\u0430\u043F\u0440\u0435\u043B\u044C_\u043C\u0430\u0439_\u0438\u044E\u043D\u044C_\u0438\u044E\u043B\u044C_\u0430\u0432\u0433\u0443\u0441\u0442_\u0441\u0435\u043D\u0442\u044F\u0431\u0440\u044C_\u043E\u043A\u0442\u044F\u0431\u0440\u044C_\u043D\u043E\u044F\u0431\u0440\u044C_\u0434\u0435\u043A\u0430\u0431\u0440\u044C".split("_");
    monthShortFormat2 = "\u044F\u043D\u0432._\u0444\u0435\u0432\u0440._\u043C\u0430\u0440._\u0430\u043F\u0440._\u043C\u0430\u044F_\u0438\u044E\u043D\u044F_\u0438\u044E\u043B\u044F_\u0430\u0432\u0433._\u0441\u0435\u043D\u0442._\u043E\u043A\u0442._\u043D\u043E\u044F\u0431._\u0434\u0435\u043A.".split("_");
    monthShortStandalone2 = "\u044F\u043D\u0432._\u0444\u0435\u0432\u0440._\u043C\u0430\u0440\u0442_\u0430\u043F\u0440._\u043C\u0430\u0439_\u0438\u044E\u043D\u044C_\u0438\u044E\u043B\u044C_\u0430\u0432\u0433._\u0441\u0435\u043D\u0442._\u043E\u043A\u0442._\u043D\u043E\u044F\u0431._\u0434\u0435\u043A.".split("_");
    MONTHS_IN_FORMAT5 = /D[oD]?(\[[^[\]]*\]|\s)+MMMM?/;
    months11 = function months12(dayjsInstance, format) {
      if (MONTHS_IN_FORMAT5.test(format)) {
        return monthFormat5[dayjsInstance.month()];
      }
      return monthStandalone5[dayjsInstance.month()];
    };
    months11.s = monthStandalone5;
    months11.f = monthFormat5;
    monthsShort3 = function monthsShort4(dayjsInstance, format) {
      if (MONTHS_IN_FORMAT5.test(format)) {
        return monthShortFormat2[dayjsInstance.month()];
      }
      return monthShortStandalone2[dayjsInstance.month()];
    };
    monthsShort3.s = monthShortStandalone2;
    monthsShort3.f = monthShortFormat2;
    locale105 = {
      name: "ru",
      weekdays: "\u0432\u043E\u0441\u043A\u0440\u0435\u0441\u0435\u043D\u044C\u0435_\u043F\u043E\u043D\u0435\u0434\u0435\u043B\u044C\u043D\u0438\u043A_\u0432\u0442\u043E\u0440\u043D\u0438\u043A_\u0441\u0440\u0435\u0434\u0430_\u0447\u0435\u0442\u0432\u0435\u0440\u0433_\u043F\u044F\u0442\u043D\u0438\u0446\u0430_\u0441\u0443\u0431\u0431\u043E\u0442\u0430".split("_"),
      weekdaysShort: "\u0432\u0441\u043A_\u043F\u043D\u0434_\u0432\u0442\u0440_\u0441\u0440\u0434_\u0447\u0442\u0432_\u043F\u0442\u043D_\u0441\u0431\u0442".split("_"),
      weekdaysMin: "\u0432\u0441_\u043F\u043D_\u0432\u0442_\u0441\u0440_\u0447\u0442_\u043F\u0442_\u0441\u0431".split("_"),
      months: months11,
      monthsShort: monthsShort3,
      weekStart: 1,
      yearStart: 4,
      formats: {
        LT: "H:mm",
        LTS: "H:mm:ss",
        L: "DD.MM.YYYY",
        LL: "D MMMM YYYY \u0433.",
        LLL: "D MMMM YYYY \u0433., H:mm",
        LLLL: "dddd, D MMMM YYYY \u0433., H:mm"
      },
      relativeTime: {
        future: "\u0447\u0435\u0440\u0435\u0437 %s",
        past: "%s \u043D\u0430\u0437\u0430\u0434",
        s: "\u043D\u0435\u0441\u043A\u043E\u043B\u044C\u043A\u043E \u0441\u0435\u043A\u0443\u043D\u0434",
        m: relativeTimeWithPlural2,
        mm: relativeTimeWithPlural2,
        h: "\u0447\u0430\u0441",
        hh: relativeTimeWithPlural2,
        d: "\u0434\u0435\u043D\u044C",
        dd: relativeTimeWithPlural2,
        M: "\u043C\u0435\u0441\u044F\u0446",
        MM: relativeTimeWithPlural2,
        y: "\u0433\u043E\u0434",
        yy: relativeTimeWithPlural2
      },
      ordinal: function ordinal106(n) {
        return n;
      },
      meridiem: function meridiem15(hour) {
        if (hour < 4) {
          return "\u043D\u043E\u0447\u0438";
        } else if (hour < 12) {
          return "\u0443\u0442\u0440\u0430";
        } else if (hour < 17) {
          return "\u0434\u043D\u044F";
        }
        return "\u0432\u0435\u0447\u0435\u0440\u0430";
      }
    };
    stdin_default2.locale(locale105, null, true);
    ru_default = locale105;
  }
});

// public/codesandbox-runtime/dayjs-locale/rw.js
var rw_exports = {};
__export(rw_exports, {
  default: () => rw_default
});
var locale106, rw_default;
var init_rw = __esm({
  "public/codesandbox-runtime/dayjs-locale/rw.js"() {
    "use strict";
    init_dayjs();
    locale106 = {
      name: "rw",
      weekdays: "Ku Cyumweru_Kuwa Mbere_Kuwa Kabiri_Kuwa Gatatu_Kuwa Kane_Kuwa Gatanu_Kuwa Gatandatu".split("_"),
      months: "Mutarama_Gashyantare_Werurwe_Mata_Gicurasi_Kamena_Nyakanga_Kanama_Nzeri_Ukwakira_Ugushyingo_Ukuboza".split("_"),
      relativeTime: {
        future: "mu %s",
        past: "%s",
        s: "amasegonda",
        m: "Umunota",
        mm: "%d iminota",
        h: "isaha",
        hh: "%d amasaha",
        d: "Umunsi",
        dd: "%d iminsi",
        M: "ukwezi",
        MM: "%d amezi",
        y: "umwaka",
        yy: "%d imyaka"
      },
      formats: {
        LT: "HH:mm",
        LTS: "HH:mm:ss",
        L: "DD/MM/YYYY",
        LL: "D MMMM YYYY",
        LLL: "D MMMM YYYY HH:mm",
        LLLL: "dddd, D MMMM YYYY HH:mm"
      },
      ordinal: function ordinal107(n) {
        return n;
      }
    };
    stdin_default2.locale(locale106, null, true);
    rw_default = locale106;
  }
});

// public/codesandbox-runtime/dayjs-locale/sd.js
var sd_exports = {};
__export(sd_exports, {
  default: () => sd_default
});
var locale107, sd_default;
var init_sd = __esm({
  "public/codesandbox-runtime/dayjs-locale/sd.js"() {
    "use strict";
    init_dayjs();
    locale107 = {
      name: "sd",
      weekdays: "\u0622\u0686\u0631_\u0633\u0648\u0645\u0631_\u0627\u06B1\u0627\u0631\u0648_\u0627\u0631\u0628\u0639_\u062E\u0645\u064A\u0633_\u062C\u0645\u0639_\u0687\u0646\u0687\u0631".split("_"),
      months: "\u062C\u0646\u0648\u0631\u064A_\u0641\u064A\u0628\u0631\u0648\u0631\u064A_\u0645\u0627\u0631\u0686_\u0627\u067E\u0631\u064A\u0644_\u0645\u0626\u064A_\u062C\u0648\u0646_\u062C\u0648\u0644\u0627\u0621\u0650_\u0622\u06AF\u0633\u067D_\u0633\u064A\u067E\u067D\u0645\u0628\u0631_\u0622\u06AA\u067D\u0648\u0628\u0631_\u0646\u0648\u0645\u0628\u0631_\u068A\u0633\u0645\u0628\u0631".split("_"),
      weekStart: 1,
      weekdaysShort: "\u0622\u0686\u0631_\u0633\u0648\u0645\u0631_\u0627\u06B1\u0627\u0631\u0648_\u0627\u0631\u0628\u0639_\u062E\u0645\u064A\u0633_\u062C\u0645\u0639_\u0687\u0646\u0687\u0631".split("_"),
      monthsShort: "\u062C\u0646\u0648\u0631\u064A_\u0641\u064A\u0628\u0631\u0648\u0631\u064A_\u0645\u0627\u0631\u0686_\u0627\u067E\u0631\u064A\u0644_\u0645\u0626\u064A_\u062C\u0648\u0646_\u062C\u0648\u0644\u0627\u0621\u0650_\u0622\u06AF\u0633\u067D_\u0633\u064A\u067E\u067D\u0645\u0628\u0631_\u0622\u06AA\u067D\u0648\u0628\u0631_\u0646\u0648\u0645\u0628\u0631_\u068A\u0633\u0645\u0628\u0631".split("_"),
      weekdaysMin: "\u0622\u0686\u0631_\u0633\u0648\u0645\u0631_\u0627\u06B1\u0627\u0631\u0648_\u0627\u0631\u0628\u0639_\u062E\u0645\u064A\u0633_\u062C\u0645\u0639_\u0687\u0646\u0687\u0631".split("_"),
      ordinal: function ordinal108(n) {
        return n;
      },
      formats: {
        LT: "HH:mm",
        LTS: "HH:mm:ss",
        L: "DD/MM/YYYY",
        LL: "D MMMM YYYY",
        LLL: "D MMMM YYYY HH:mm",
        LLLL: "dddd\u060C D MMMM YYYY HH:mm"
      },
      relativeTime: {
        future: "%s \u067E\u0648\u0621",
        past: "%s \u0627\u06B3",
        s: "\u0686\u0646\u062F \u0633\u064A\u06AA\u0646\u068A",
        m: "\u0647\u06AA \u0645\u0646\u067D",
        mm: "%d \u0645\u0646\u067D",
        h: "\u0647\u06AA \u06AA\u0644\u0627\u06AA",
        hh: "%d \u06AA\u0644\u0627\u06AA",
        d: "\u0647\u06AA \u068F\u064A\u0646\u0647\u0646",
        dd: "%d \u068F\u064A\u0646\u0647\u0646",
        M: "\u0647\u06AA \u0645\u0647\u064A\u0646\u0648",
        MM: "%d \u0645\u0647\u064A\u0646\u0627",
        y: "\u0647\u06AA \u0633\u0627\u0644",
        yy: "%d \u0633\u0627\u0644"
      }
    };
    stdin_default2.locale(locale107, null, true);
    sd_default = locale107;
  }
});

// public/codesandbox-runtime/dayjs-locale/se.js
var se_exports = {};
__export(se_exports, {
  default: () => se_default
});
var locale108, se_default;
var init_se = __esm({
  "public/codesandbox-runtime/dayjs-locale/se.js"() {
    "use strict";
    init_dayjs();
    locale108 = {
      name: "se",
      weekdays: "sotnabeaivi_vuoss\xE1rga_ma\u014B\u014Beb\xE1rga_gaskavahkku_duorastat_bearjadat_l\xE1vvardat".split("_"),
      months: "o\u0111\u0111ajagem\xE1nnu_guovvam\xE1nnu_njuk\u010Dam\xE1nnu_cuo\u014Bom\xE1nnu_miessem\xE1nnu_geassem\xE1nnu_suoidnem\xE1nnu_borgem\xE1nnu_\u010Dak\u010Dam\xE1nnu_golggotm\xE1nnu_sk\xE1bmam\xE1nnu_juovlam\xE1nnu".split("_"),
      weekStart: 1,
      weekdaysShort: "sotn_vuos_ma\u014B_gask_duor_bear_l\xE1v".split("_"),
      monthsShort: "o\u0111\u0111j_guov_njuk_cuo_mies_geas_suoi_borg_\u010Dak\u010D_golg_sk\xE1b_juov".split("_"),
      weekdaysMin: "s_v_m_g_d_b_L".split("_"),
      ordinal: function ordinal109(n) {
        return n;
      },
      formats: {
        LT: "HH:mm",
        LTS: "HH:mm:ss",
        L: "DD.MM.YYYY",
        LL: "MMMM D. [b.] YYYY",
        LLL: "MMMM D. [b.] YYYY [ti.] HH:mm",
        LLLL: "dddd, MMMM D. [b.] YYYY [ti.] HH:mm"
      },
      relativeTime: {
        future: "%s gea\u017Ees",
        past: "ma\u014Bit %s",
        s: "moadde sekunddat",
        m: "okta minuhta",
        mm: "%d minuhtat",
        h: "okta diimmu",
        hh: "%d diimmut",
        d: "okta beaivi",
        dd: "%d beaivvit",
        M: "okta m\xE1nnu",
        MM: "%d m\xE1nut",
        y: "okta jahki",
        yy: "%d jagit"
      }
    };
    stdin_default2.locale(locale108, null, true);
    se_default = locale108;
  }
});

// public/codesandbox-runtime/dayjs-locale/si.js
var si_exports = {};
__export(si_exports, {
  default: () => si_default
});
var locale109, si_default;
var init_si = __esm({
  "public/codesandbox-runtime/dayjs-locale/si.js"() {
    "use strict";
    init_dayjs();
    locale109 = {
      name: "si",
      weekdays: "\u0D89\u0DBB\u0DD2\u0DAF\u0DCF_\u0DC3\u0DB3\u0DD4\u0DAF\u0DCF_\u0D85\u0D9F\u0DC4\u0DBB\u0DD4\u0DC0\u0DCF\u0DAF\u0DCF_\u0DB6\u0DAF\u0DCF\u0DAF\u0DCF_\u0DB6\u0DCA\u200D\u0DBB\u0DC4\u0DC3\u0DCA\u0DB4\u0DAD\u0DD2\u0DB1\u0DCA\u0DAF\u0DCF_\u0DC3\u0DD2\u0D9A\u0DD4\u0DBB\u0DCF\u0DAF\u0DCF_\u0DC3\u0DD9\u0DB1\u0DC3\u0DD4\u0DBB\u0DCF\u0DAF\u0DCF".split("_"),
      months: "\u0DAF\u0DD4\u0DBB\u0DD4\u0DAD\u0DD4_\u0DB1\u0DC0\u0DB8\u0DCA_\u0DB8\u0DD0\u0DAF\u0DD2\u0DB1\u0DCA_\u0DB6\u0D9A\u0DCA_\u0DC0\u0DD9\u0DC3\u0D9A\u0DCA_\u0DB4\u0DDC\u0DC3\u0DDC\u0DB1\u0DCA_\u0D87\u0DC3\u0DC5_\u0DB1\u0DD2\u0D9A\u0DD2\u0DAB\u0DD2_\u0DB6\u0DD2\u0DB1\u0DBB_\u0DC0\u0DB4\u0DCA_\u0D89\u0DBD\u0DCA_\u0D8B\u0DB3\u0DD4\u0DC0\u0DB4\u0DCA".split("_"),
      weekdaysShort: "\u0D89\u0DBB\u0DD2_\u0DC3\u0DB3\u0DD4_\u0D85\u0D9F_\u0DB6\u0DAF\u0DCF_\u0DB6\u0DCA\u200D\u0DBB\u0DC4_\u0DC3\u0DD2\u0D9A\u0DD4_\u0DC3\u0DD9\u0DB1".split("_"),
      monthsShort: "\u0DAF\u0DD4\u0DBB\u0DD4_\u0DB1\u0DC0_\u0DB8\u0DD0\u0DAF\u0DD2_\u0DB6\u0D9A\u0DCA_\u0DC0\u0DD9\u0DC3_\u0DB4\u0DDC\u0DC3\u0DDC_\u0D87\u0DC3_\u0DB1\u0DD2\u0D9A\u0DD2_\u0DB6\u0DD2\u0DB1_\u0DC0\u0DB4\u0DCA_\u0D89\u0DBD\u0DCA_\u0D8B\u0DB3\u0DD4".split("_"),
      weekdaysMin: "\u0D89_\u0DC3_\u0D85_\u0DB6_\u0DB6\u0DCA\u200D\u0DBB_\u0DC3\u0DD2_\u0DC3\u0DD9".split("_"),
      ordinal: function ordinal110(n) {
        return n;
      },
      formats: {
        LT: "a h:mm",
        LTS: "a h:mm:ss",
        L: "YYYY/MM/DD",
        LL: "YYYY MMMM D",
        LLL: "YYYY MMMM D, a h:mm",
        LLLL: "YYYY MMMM D [\u0DC0\u0DD0\u0DB1\u0DD2] dddd, a h:mm:ss"
      },
      relativeTime: {
        future: "%s\u0D9A\u0DD2\u0DB1\u0DCA",
        past: "%s\u0D9A\u0DA7 \u0DB4\u0DD9\u0DBB",
        s: "\u0DAD\u0DAD\u0DCA\u0DB4\u0DBB \u0D9A\u0DD2\u0DC4\u0DD2\u0DB4\u0DBA",
        m: "\u0DC0\u0DD2\u0DB1\u0DCF\u0DA9\u0DD2\u0DBA",
        mm: "\u0DC0\u0DD2\u0DB1\u0DCF\u0DA9\u0DD2 %d",
        h: "\u0DB4\u0DD0\u0DBA",
        hh: "\u0DB4\u0DD0\u0DBA %d",
        d: "\u0DAF\u0DD2\u0DB1\u0DBA",
        dd: "\u0DAF\u0DD2\u0DB1 %d",
        M: "\u0DB8\u0DCF\u0DC3\u0DBA",
        MM: "\u0DB8\u0DCF\u0DC3 %d",
        y: "\u0DC0\u0DC3\u0DBB",
        yy: "\u0DC0\u0DC3\u0DBB %d"
      }
    };
    stdin_default2.locale(locale109, null, true);
    si_default = locale109;
  }
});

// public/codesandbox-runtime/dayjs-locale/sk.js
var sk_exports = {};
__export(sk_exports, {
  default: () => sk_default
});
function plural5(n) {
  return n > 1 && n < 5 && ~~(n / 10) !== 1;
}
function translate3(number, withoutSuffix, key, isFuture) {
  var result = number + " ";
  switch (key) {
    case "s":
      return withoutSuffix || isFuture ? "p\xE1r sek\xFAnd" : "p\xE1r sekundami";
    case "m":
      return withoutSuffix ? "min\xFAta" : isFuture ? "min\xFAtu" : "min\xFAtou";
    case "mm":
      if (withoutSuffix || isFuture) {
        return result + (plural5(number) ? "min\xFAty" : "min\xFAt");
      }
      return result + "min\xFAtami";
    case "h":
      return withoutSuffix ? "hodina" : isFuture ? "hodinu" : "hodinou";
    case "hh":
      if (withoutSuffix || isFuture) {
        return result + (plural5(number) ? "hodiny" : "hod\xEDn");
      }
      return result + "hodinami";
    case "d":
      return withoutSuffix || isFuture ? "de\u0148" : "d\u0148om";
    case "dd":
      if (withoutSuffix || isFuture) {
        return result + (plural5(number) ? "dni" : "dn\xED");
      }
      return result + "d\u0148ami";
    case "M":
      return withoutSuffix || isFuture ? "mesiac" : "mesiacom";
    case "MM":
      if (withoutSuffix || isFuture) {
        return result + (plural5(number) ? "mesiace" : "mesiacov");
      }
      return result + "mesiacmi";
    case "y":
      return withoutSuffix || isFuture ? "rok" : "rokom";
    case "yy":
      if (withoutSuffix || isFuture) {
        return result + (plural5(number) ? "roky" : "rokov");
      }
      return result + "rokmi";
  }
}
var locale110, sk_default;
var init_sk = __esm({
  "public/codesandbox-runtime/dayjs-locale/sk.js"() {
    "use strict";
    init_dayjs();
    locale110 = {
      name: "sk",
      weekdays: "nede\u013Ea_pondelok_utorok_streda_\u0161tvrtok_piatok_sobota".split("_"),
      weekdaysShort: "ne_po_ut_st_\u0161t_pi_so".split("_"),
      weekdaysMin: "ne_po_ut_st_\u0161t_pi_so".split("_"),
      months: "janu\xE1r_febru\xE1r_marec_apr\xEDl_m\xE1j_j\xFAn_j\xFAl_august_september_okt\xF3ber_november_december".split("_"),
      monthsShort: "jan_feb_mar_apr_m\xE1j_j\xFAn_j\xFAl_aug_sep_okt_nov_dec".split("_"),
      weekStart: 1,
      yearStart: 4,
      ordinal: function ordinal111(n) {
        return n + ".";
      },
      formats: {
        LT: "H:mm",
        LTS: "H:mm:ss",
        L: "DD.MM.YYYY",
        LL: "D. MMMM YYYY",
        LLL: "D. MMMM YYYY H:mm",
        LLLL: "dddd D. MMMM YYYY H:mm",
        l: "D. M. YYYY"
      },
      relativeTime: {
        future: "za %s",
        // Should be `o %s` (change when moment/moment#5408 is fixed)
        past: "pred %s",
        s: translate3,
        m: translate3,
        mm: translate3,
        h: translate3,
        hh: translate3,
        d: translate3,
        dd: translate3,
        M: translate3,
        MM: translate3,
        y: translate3,
        yy: translate3
      }
    };
    stdin_default2.locale(locale110, null, true);
    sk_default = locale110;
  }
});

// public/codesandbox-runtime/dayjs-locale/sl.js
var sl_exports = {};
__export(sl_exports, {
  default: () => sl_default
});
function dual(n) {
  return n % 100 == 2;
}
function threeFour(n) {
  return n % 100 == 3 || n % 100 == 4;
}
function translate4(number, withoutSuffix, key, isFuture) {
  var result = number + " ";
  switch (key) {
    case "s":
      return withoutSuffix || isFuture ? "nekaj sekund" : "nekaj sekundami";
    case "m":
      return withoutSuffix ? "ena minuta" : "eno minuto";
    case "mm":
      if (dual(number)) {
        return result + (withoutSuffix || isFuture ? "minuti" : "minutama");
      }
      if (threeFour(number)) {
        return result + (withoutSuffix || isFuture ? "minute" : "minutami");
      }
      return result + (withoutSuffix || isFuture ? "minut" : "minutami");
    case "h":
      return withoutSuffix ? "ena ura" : isFuture ? "eno uro" : "eno uro";
    case "hh":
      if (dual(number)) {
        return result + (withoutSuffix || isFuture ? "uri" : "urama");
      }
      if (threeFour(number)) {
        return result + (withoutSuffix || isFuture ? "ure" : "urami");
      }
      return result + (withoutSuffix || isFuture ? "ur" : "urami");
    case "d":
      return withoutSuffix || isFuture ? "en dan" : "enim dnem";
    case "dd":
      if (dual(number)) {
        return result + (withoutSuffix || isFuture ? "dneva" : "dnevoma");
      }
      return result + (withoutSuffix || isFuture ? "dni" : "dnevi");
    case "M":
      return withoutSuffix || isFuture ? "en mesec" : "enim mesecem";
    case "MM":
      if (dual(number)) {
        return result + (withoutSuffix || isFuture ? "meseca" : "mesecema");
      }
      if (threeFour(number)) {
        return result + (withoutSuffix || isFuture ? "mesece" : "meseci");
      }
      return result + (withoutSuffix || isFuture ? "mesecev" : "meseci");
    case "y":
      return withoutSuffix || isFuture ? "eno leto" : "enim letom";
    case "yy":
      if (dual(number)) {
        return result + (withoutSuffix || isFuture ? "leti" : "letoma");
      }
      if (threeFour(number)) {
        return result + (withoutSuffix || isFuture ? "leta" : "leti");
      }
      return result + (withoutSuffix || isFuture ? "let" : "leti");
  }
}
var locale111, sl_default;
var init_sl = __esm({
  "public/codesandbox-runtime/dayjs-locale/sl.js"() {
    "use strict";
    init_dayjs();
    locale111 = {
      name: "sl",
      weekdays: "nedelja_ponedeljek_torek_sreda_\u010Detrtek_petek_sobota".split("_"),
      months: "januar_februar_marec_april_maj_junij_julij_avgust_september_oktober_november_december".split("_"),
      weekStart: 1,
      weekdaysShort: "ned._pon._tor._sre._\u010Det._pet._sob.".split("_"),
      monthsShort: "jan._feb._mar._apr._maj._jun._jul._avg._sep._okt._nov._dec.".split("_"),
      weekdaysMin: "ne_po_to_sr_\u010De_pe_so".split("_"),
      ordinal: function ordinal112(n) {
        return n + ".";
      },
      formats: {
        LT: "H:mm",
        LTS: "H:mm:ss",
        L: "DD.MM.YYYY",
        LL: "D. MMMM YYYY",
        LLL: "D. MMMM YYYY H:mm",
        LLLL: "dddd, D. MMMM YYYY H:mm",
        l: "D. M. YYYY"
      },
      relativeTime: {
        future: "\u010Dez %s",
        past: "pred %s",
        s: translate4,
        m: translate4,
        mm: translate4,
        h: translate4,
        hh: translate4,
        d: translate4,
        dd: translate4,
        M: translate4,
        MM: translate4,
        y: translate4,
        yy: translate4
      }
    };
    stdin_default2.locale(locale111, null, true);
    sl_default = locale111;
  }
});

// public/codesandbox-runtime/dayjs-locale/sq.js
var sq_exports = {};
__export(sq_exports, {
  default: () => sq_default
});
var locale112, sq_default;
var init_sq = __esm({
  "public/codesandbox-runtime/dayjs-locale/sq.js"() {
    "use strict";
    init_dayjs();
    locale112 = {
      name: "sq",
      weekdays: "E Diel_E H\xEBn\xEB_E Mart\xEB_E M\xEBrkur\xEB_E Enjte_E Premte_E Shtun\xEB".split("_"),
      months: "Janar_Shkurt_Mars_Prill_Maj_Qershor_Korrik_Gusht_Shtator_Tetor_N\xEBntor_Dhjetor".split("_"),
      weekStart: 1,
      weekdaysShort: "Die_H\xEBn_Mar_M\xEBr_Enj_Pre_Sht".split("_"),
      monthsShort: "Jan_Shk_Mar_Pri_Maj_Qer_Kor_Gus_Sht_Tet_N\xEBn_Dhj".split("_"),
      weekdaysMin: "D_H_Ma_M\xEB_E_P_Sh".split("_"),
      ordinal: function ordinal113(n) {
        return n;
      },
      formats: {
        LT: "HH:mm",
        LTS: "HH:mm:ss",
        L: "DD/MM/YYYY",
        LL: "D MMMM YYYY",
        LLL: "D MMMM YYYY HH:mm",
        LLLL: "dddd, D MMMM YYYY HH:mm"
      },
      relativeTime: {
        future: "n\xEB %s",
        past: "%s m\xEB par\xEB",
        s: "disa sekonda",
        m: "nj\xEB minut\xEB",
        mm: "%d minuta",
        h: "nj\xEB or\xEB",
        hh: "%d or\xEB",
        d: "nj\xEB dit\xEB",
        dd: "%d dit\xEB",
        M: "nj\xEB muaj",
        MM: "%d muaj",
        y: "nj\xEB vit",
        yy: "%d vite"
      }
    };
    stdin_default2.locale(locale112, null, true);
    sq_default = locale112;
  }
});

// public/codesandbox-runtime/dayjs-locale/sr-cyrl.js
var sr_cyrl_exports = {};
__export(sr_cyrl_exports, {
  default: () => sr_cyrl_default
});
var translator, locale113, sr_cyrl_default;
var init_sr_cyrl = __esm({
  "public/codesandbox-runtime/dayjs-locale/sr-cyrl.js"() {
    "use strict";
    init_dayjs();
    translator = {
      words: {
        m: ["\u0458\u0435\u0434\u0430\u043D \u043C\u0438\u043D\u0443\u0442", "\u0458\u0435\u0434\u043D\u043E\u0433 \u043C\u0438\u043D\u0443\u0442\u0430"],
        mm: ["%d \u043C\u0438\u043D\u0443\u0442", "%d \u043C\u0438\u043D\u0443\u0442\u0430", "%d \u043C\u0438\u043D\u0443\u0442\u0430"],
        h: ["\u0458\u0435\u0434\u0430\u043D \u0441\u0430\u0442", "\u0458\u0435\u0434\u043D\u043E\u0433 \u0441\u0430\u0442\u0430"],
        hh: ["%d \u0441\u0430\u0442", "%d \u0441\u0430\u0442\u0430", "%d \u0441\u0430\u0442\u0438"],
        d: ["\u0458\u0435\u0434\u0430\u043D \u0434\u0430\u043D", "\u0458\u0435\u0434\u043D\u043E\u0433 \u0434\u0430\u043D\u0430"],
        dd: ["%d \u0434\u0430\u043D", "%d \u0434\u0430\u043D\u0430", "%d \u0434\u0430\u043D\u0430"],
        M: ["\u0458\u0435\u0434\u0430\u043D \u043C\u0435\u0441\u0435\u0446", "\u0458\u0435\u0434\u043D\u043E\u0433 \u043C\u0435\u0441\u0435\u0446\u0430"],
        MM: ["%d \u043C\u0435\u0441\u0435\u0446", "%d \u043C\u0435\u0441\u0435\u0446\u0430", "%d \u043C\u0435\u0441\u0435\u0446\u0438"],
        y: ["\u0458\u0435\u0434\u043D\u0443 \u0433\u043E\u0434\u0438\u043D\u0443", "\u0458\u0435\u0434\u043D\u0435 \u0433\u043E\u0434\u0438\u043D\u0435"],
        yy: ["%d \u0433\u043E\u0434\u0438\u043D\u0443", "%d \u0433\u043E\u0434\u0438\u043D\u0435", "%d \u0433\u043E\u0434\u0438\u043D\u0430"]
      },
      correctGrammarCase: function correctGrammarCase(number, wordKey) {
        if (number % 10 >= 1 && number % 10 <= 4 && (number % 100 < 10 || number % 100 >= 20)) {
          return number % 10 === 1 ? wordKey[0] : wordKey[1];
        }
        return wordKey[2];
      },
      relativeTimeFormatter: function relativeTimeFormatter7(number, withoutSuffix, key, isFuture) {
        var wordKey = translator.words[key];
        if (key.length === 1) {
          if (key === "y" && withoutSuffix) return "\u0458\u0435\u0434\u043D\u0430 \u0433\u043E\u0434\u0438\u043D\u0430";
          return isFuture || withoutSuffix ? wordKey[0] : wordKey[1];
        }
        var word = translator.correctGrammarCase(number, wordKey);
        if (key === "yy" && withoutSuffix && word === "%d \u0433\u043E\u0434\u0438\u043D\u0443") return number + " \u0433\u043E\u0434\u0438\u043D\u0430";
        return word.replace("%d", number);
      }
    };
    locale113 = {
      name: "sr-cyrl",
      weekdays: "\u041D\u0435\u0434\u0435\u0459\u0430_\u041F\u043E\u043D\u0435\u0434\u0435\u0459\u0430\u043A_\u0423\u0442\u043E\u0440\u0430\u043A_\u0421\u0440\u0435\u0434\u0430_\u0427\u0435\u0442\u0432\u0440\u0442\u0430\u043A_\u041F\u0435\u0442\u0430\u043A_\u0421\u0443\u0431\u043E\u0442\u0430".split("_"),
      weekdaysShort: "\u041D\u0435\u0434._\u041F\u043E\u043D._\u0423\u0442\u043E._\u0421\u0440\u0435._\u0427\u0435\u0442._\u041F\u0435\u0442._\u0421\u0443\u0431.".split("_"),
      weekdaysMin: "\u043D\u0435_\u043F\u043E_\u0443\u0442_\u0441\u0440_\u0447\u0435_\u043F\u0435_\u0441\u0443".split("_"),
      months: "\u0408\u0430\u043D\u0443\u0430\u0440_\u0424\u0435\u0431\u0440\u0443\u0430\u0440_\u041C\u0430\u0440\u0442_\u0410\u043F\u0440\u0438\u043B_\u041C\u0430\u0458_\u0408\u0443\u043D_\u0408\u0443\u043B_\u0410\u0432\u0433\u0443\u0441\u0442_\u0421\u0435\u043F\u0442\u0435\u043C\u0431\u0430\u0440_\u041E\u043A\u0442\u043E\u0431\u0430\u0440_\u041D\u043E\u0432\u0435\u043C\u0431\u0430\u0440_\u0414\u0435\u0446\u0435\u043C\u0431\u0430\u0440".split("_"),
      monthsShort: "\u0408\u0430\u043D._\u0424\u0435\u0431._\u041C\u0430\u0440._\u0410\u043F\u0440._\u041C\u0430\u0458_\u0408\u0443\u043D_\u0408\u0443\u043B_\u0410\u0432\u0433._\u0421\u0435\u043F._\u041E\u043A\u0442._\u041D\u043E\u0432._\u0414\u0435\u0446.".split("_"),
      weekStart: 1,
      relativeTime: {
        future: "\u0437\u0430 %s",
        past: "\u043F\u0440\u0435 %s",
        s: "\u043D\u0435\u043A\u043E\u043B\u0438\u043A\u043E \u0441\u0435\u043A\u0443\u043D\u0434\u0438",
        m: translator.relativeTimeFormatter,
        mm: translator.relativeTimeFormatter,
        h: translator.relativeTimeFormatter,
        hh: translator.relativeTimeFormatter,
        d: translator.relativeTimeFormatter,
        dd: translator.relativeTimeFormatter,
        M: translator.relativeTimeFormatter,
        MM: translator.relativeTimeFormatter,
        y: translator.relativeTimeFormatter,
        yy: translator.relativeTimeFormatter
      },
      ordinal: function ordinal114(n) {
        return n + ".";
      },
      formats: {
        LT: "H:mm",
        LTS: "H:mm:ss",
        L: "D. M. YYYY.",
        LL: "D. MMMM YYYY.",
        LLL: "D. MMMM YYYY. H:mm",
        LLLL: "dddd, D. MMMM YYYY. H:mm"
      }
    };
    stdin_default2.locale(locale113, null, true);
    sr_cyrl_default = locale113;
  }
});

// public/codesandbox-runtime/dayjs-locale/sr.js
var sr_exports = {};
__export(sr_exports, {
  default: () => sr_default
});
var translator2, locale114, sr_default;
var init_sr = __esm({
  "public/codesandbox-runtime/dayjs-locale/sr.js"() {
    "use strict";
    init_dayjs();
    translator2 = {
      words: {
        m: ["jedan minut", "jednog minuta"],
        mm: ["%d minut", "%d minuta", "%d minuta"],
        h: ["jedan sat", "jednog sata"],
        hh: ["%d sat", "%d sata", "%d sati"],
        d: ["jedan dan", "jednog dana"],
        dd: ["%d dan", "%d dana", "%d dana"],
        M: ["jedan mesec", "jednog meseca"],
        MM: ["%d mesec", "%d meseca", "%d meseci"],
        y: ["jednu godinu", "jedne godine"],
        yy: ["%d godinu", "%d godine", "%d godina"]
      },
      correctGrammarCase: function correctGrammarCase2(number, wordKey) {
        if (number % 10 >= 1 && number % 10 <= 4 && (number % 100 < 10 || number % 100 >= 20)) {
          return number % 10 === 1 ? wordKey[0] : wordKey[1];
        }
        return wordKey[2];
      },
      relativeTimeFormatter: function relativeTimeFormatter8(number, withoutSuffix, key, isFuture) {
        var wordKey = translator2.words[key];
        if (key.length === 1) {
          if (key === "y" && withoutSuffix) return "jedna godina";
          return isFuture || withoutSuffix ? wordKey[0] : wordKey[1];
        }
        var word = translator2.correctGrammarCase(number, wordKey);
        if (key === "yy" && withoutSuffix && word === "%d godinu") return number + " godina";
        return word.replace("%d", number);
      }
    };
    locale114 = {
      name: "sr",
      weekdays: "Nedelja_Ponedeljak_Utorak_Sreda_\u010Cetvrtak_Petak_Subota".split("_"),
      weekdaysShort: "Ned._Pon._Uto._Sre._\u010Cet._Pet._Sub.".split("_"),
      weekdaysMin: "ne_po_ut_sr_\u010De_pe_su".split("_"),
      months: "Januar_Februar_Mart_April_Maj_Jun_Jul_Avgust_Septembar_Oktobar_Novembar_Decembar".split("_"),
      monthsShort: "Jan._Feb._Mar._Apr._Maj_Jun_Jul_Avg._Sep._Okt._Nov._Dec.".split("_"),
      weekStart: 1,
      relativeTime: {
        future: "za %s",
        past: "pre %s",
        s: "nekoliko sekundi",
        m: translator2.relativeTimeFormatter,
        mm: translator2.relativeTimeFormatter,
        h: translator2.relativeTimeFormatter,
        hh: translator2.relativeTimeFormatter,
        d: translator2.relativeTimeFormatter,
        dd: translator2.relativeTimeFormatter,
        M: translator2.relativeTimeFormatter,
        MM: translator2.relativeTimeFormatter,
        y: translator2.relativeTimeFormatter,
        yy: translator2.relativeTimeFormatter
      },
      ordinal: function ordinal115(n) {
        return n + ".";
      },
      formats: {
        LT: "H:mm",
        LTS: "H:mm:ss",
        L: "D. M. YYYY.",
        LL: "D. MMMM YYYY.",
        LLL: "D. MMMM YYYY. H:mm",
        LLLL: "dddd, D. MMMM YYYY. H:mm"
      }
    };
    stdin_default2.locale(locale114, null, true);
    sr_default = locale114;
  }
});

// public/codesandbox-runtime/dayjs-locale/ss.js
var ss_exports = {};
__export(ss_exports, {
  default: () => ss_default
});
var locale115, ss_default;
var init_ss = __esm({
  "public/codesandbox-runtime/dayjs-locale/ss.js"() {
    "use strict";
    init_dayjs();
    locale115 = {
      name: "ss",
      weekdays: "Lisontfo_Umsombuluko_Lesibili_Lesitsatfu_Lesine_Lesihlanu_Umgcibelo".split("_"),
      months: "Bhimbidvwane_Indlovana_Indlov'lenkhulu_Mabasa_Inkhwekhweti_Inhlaba_Kholwane_Ingci_Inyoni_Imphala_Lweti_Ingongoni".split("_"),
      weekStart: 1,
      weekdaysShort: "Lis_Umb_Lsb_Les_Lsi_Lsh_Umg".split("_"),
      monthsShort: "Bhi_Ina_Inu_Mab_Ink_Inh_Kho_Igc_Iny_Imp_Lwe_Igo".split("_"),
      weekdaysMin: "Li_Us_Lb_Lt_Ls_Lh_Ug".split("_"),
      ordinal: function ordinal116(n) {
        return n;
      },
      formats: {
        LT: "h:mm A",
        LTS: "h:mm:ss A",
        L: "DD/MM/YYYY",
        LL: "D MMMM YYYY",
        LLL: "D MMMM YYYY h:mm A",
        LLLL: "dddd, D MMMM YYYY h:mm A"
      },
      relativeTime: {
        future: "nga %s",
        past: "wenteka nga %s",
        s: "emizuzwana lomcane",
        m: "umzuzu",
        mm: "%d emizuzu",
        h: "lihora",
        hh: "%d emahora",
        d: "lilanga",
        dd: "%d emalanga",
        M: "inyanga",
        MM: "%d tinyanga",
        y: "umnyaka",
        yy: "%d iminyaka"
      }
    };
    stdin_default2.locale(locale115, null, true);
    ss_default = locale115;
  }
});

// public/codesandbox-runtime/dayjs-locale/sv-fi.js
var sv_fi_exports = {};
__export(sv_fi_exports, {
  default: () => sv_fi_default
});
var locale116, sv_fi_default;
var init_sv_fi = __esm({
  "public/codesandbox-runtime/dayjs-locale/sv-fi.js"() {
    "use strict";
    init_dayjs();
    locale116 = {
      name: "sv-fi",
      weekdays: "s\xF6ndag_m\xE5ndag_tisdag_onsdag_torsdag_fredag_l\xF6rdag".split("_"),
      weekdaysShort: "s\xF6n_m\xE5n_tis_ons_tor_fre_l\xF6r".split("_"),
      weekdaysMin: "s\xF6_m\xE5_ti_on_to_fr_l\xF6".split("_"),
      months: "januari_februari_mars_april_maj_juni_juli_augusti_september_oktober_november_december".split("_"),
      monthsShort: "jan_feb_mar_apr_maj_jun_jul_aug_sep_okt_nov_dec".split("_"),
      weekStart: 1,
      yearStart: 4,
      ordinal: function ordinal117(n) {
        var b = n % 10;
        var o = b === 1 || b === 2 ? "a" : "e";
        return "[" + n + o + "]";
      },
      formats: {
        LT: "HH.mm",
        LTS: "HH.mm.ss",
        L: "DD.MM.YYYY",
        LL: "D. MMMM YYYY",
        LLL: "D. MMMM YYYY, [kl.] HH.mm",
        LLLL: "dddd, D. MMMM YYYY, [kl.] HH.mm",
        l: "D.M.YYYY",
        ll: "D. MMM YYYY",
        lll: "D. MMM YYYY, [kl.] HH.mm",
        llll: "ddd, D. MMM YYYY, [kl.] HH.mm"
      },
      relativeTime: {
        future: "om %s",
        past: "f\xF6r %s sedan",
        s: "n\xE5gra sekunder",
        m: "en minut",
        mm: "%d minuter",
        h: "en timme",
        hh: "%d timmar",
        d: "en dag",
        dd: "%d dagar",
        M: "en m\xE5nad",
        MM: "%d m\xE5nader",
        y: "ett \xE5r",
        yy: "%d \xE5r"
      }
    };
    stdin_default2.locale(locale116, null, true);
    sv_fi_default = locale116;
  }
});

// public/codesandbox-runtime/dayjs-locale/sv.js
var sv_exports = {};
__export(sv_exports, {
  default: () => sv_default
});
var locale117, sv_default;
var init_sv = __esm({
  "public/codesandbox-runtime/dayjs-locale/sv.js"() {
    "use strict";
    init_dayjs();
    locale117 = {
      name: "sv",
      weekdays: "s\xF6ndag_m\xE5ndag_tisdag_onsdag_torsdag_fredag_l\xF6rdag".split("_"),
      weekdaysShort: "s\xF6n_m\xE5n_tis_ons_tor_fre_l\xF6r".split("_"),
      weekdaysMin: "s\xF6_m\xE5_ti_on_to_fr_l\xF6".split("_"),
      months: "januari_februari_mars_april_maj_juni_juli_augusti_september_oktober_november_december".split("_"),
      monthsShort: "jan_feb_mar_apr_maj_jun_jul_aug_sep_okt_nov_dec".split("_"),
      weekStart: 1,
      yearStart: 4,
      ordinal: function ordinal118(n) {
        var b = n % 10;
        var o = b === 1 || b === 2 ? "a" : "e";
        return "[" + n + o + "]";
      },
      formats: {
        LT: "HH:mm",
        LTS: "HH:mm:ss",
        L: "YYYY-MM-DD",
        LL: "D MMMM YYYY",
        LLL: "D MMMM YYYY [kl.] HH:mm",
        LLLL: "dddd D MMMM YYYY [kl.] HH:mm",
        lll: "D MMM YYYY HH:mm",
        llll: "ddd D MMM YYYY HH:mm"
      },
      relativeTime: {
        future: "om %s",
        past: "f\xF6r %s sedan",
        s: "n\xE5gra sekunder",
        m: "en minut",
        mm: "%d minuter",
        h: "en timme",
        hh: "%d timmar",
        d: "en dag",
        dd: "%d dagar",
        M: "en m\xE5nad",
        MM: "%d m\xE5nader",
        y: "ett \xE5r",
        yy: "%d \xE5r"
      }
    };
    stdin_default2.locale(locale117, null, true);
    sv_default = locale117;
  }
});

// public/codesandbox-runtime/dayjs-locale/sw.js
var sw_exports = {};
__export(sw_exports, {
  default: () => sw_default
});
var locale118, sw_default;
var init_sw = __esm({
  "public/codesandbox-runtime/dayjs-locale/sw.js"() {
    "use strict";
    init_dayjs();
    locale118 = {
      name: "sw",
      weekdays: "Jumapili_Jumatatu_Jumanne_Jumatano_Alhamisi_Ijumaa_Jumamosi".split("_"),
      weekdaysShort: "Jpl_Jtat_Jnne_Jtan_Alh_Ijm_Jmos".split("_"),
      weekdaysMin: "J2_J3_J4_J5_Al_Ij_J1".split("_"),
      months: "Januari_Februari_Machi_Aprili_Mei_Juni_Julai_Agosti_Septemba_Oktoba_Novemba_Desemba".split("_"),
      monthsShort: "Jan_Feb_Mac_Apr_Mei_Jun_Jul_Ago_Sep_Okt_Nov_Des".split("_"),
      weekStart: 1,
      ordinal: function ordinal119(n) {
        return n;
      },
      relativeTime: {
        future: "%s baadaye",
        past: "tokea %s",
        s: "hivi punde",
        m: "dakika moja",
        mm: "dakika %d",
        h: "saa limoja",
        hh: "masaa %d",
        d: "siku moja",
        dd: "masiku %d",
        M: "mwezi mmoja",
        MM: "miezi %d",
        y: "mwaka mmoja",
        yy: "miaka %d"
      },
      formats: {
        LT: "HH:mm",
        LTS: "HH:mm:ss",
        L: "DD.MM.YYYY",
        LL: "D MMMM YYYY",
        LLL: "D MMMM YYYY HH:mm",
        LLLL: "dddd, D MMMM YYYY HH:mm"
      }
    };
    stdin_default2.locale(locale118, null, true);
    sw_default = locale118;
  }
});

// public/codesandbox-runtime/dayjs-locale/ta.js
var ta_exports = {};
__export(ta_exports, {
  default: () => ta_default
});
var locale119, ta_default;
var init_ta = __esm({
  "public/codesandbox-runtime/dayjs-locale/ta.js"() {
    "use strict";
    init_dayjs();
    locale119 = {
      name: "ta",
      weekdays: "\u0B9E\u0BBE\u0BAF\u0BBF\u0BB1\u0BCD\u0BB1\u0BC1\u0B95\u0BCD\u0B95\u0BBF\u0BB4\u0BAE\u0BC8_\u0BA4\u0BBF\u0B99\u0BCD\u0B95\u0B9F\u0BCD\u0B95\u0BBF\u0BB4\u0BAE\u0BC8_\u0B9A\u0BC6\u0BB5\u0BCD\u0BB5\u0BBE\u0BAF\u0BCD\u0B95\u0BBF\u0BB4\u0BAE\u0BC8_\u0BAA\u0BC1\u0BA4\u0BA9\u0BCD\u0B95\u0BBF\u0BB4\u0BAE\u0BC8_\u0BB5\u0BBF\u0BAF\u0BBE\u0BB4\u0B95\u0BCD\u0B95\u0BBF\u0BB4\u0BAE\u0BC8_\u0BB5\u0BC6\u0BB3\u0BCD\u0BB3\u0BBF\u0B95\u0BCD\u0B95\u0BBF\u0BB4\u0BAE\u0BC8_\u0B9A\u0BA9\u0BBF\u0B95\u0BCD\u0B95\u0BBF\u0BB4\u0BAE\u0BC8".split("_"),
      months: "\u0B9C\u0BA9\u0BB5\u0BB0\u0BBF_\u0BAA\u0BBF\u0BAA\u0BCD\u0BB0\u0BB5\u0BB0\u0BBF_\u0BAE\u0BBE\u0BB0\u0BCD\u0B9A\u0BCD_\u0B8F\u0BAA\u0BCD\u0BB0\u0BB2\u0BCD_\u0BAE\u0BC7_\u0B9C\u0BC2\u0BA9\u0BCD_\u0B9C\u0BC2\u0BB2\u0BC8_\u0B86\u0B95\u0BB8\u0BCD\u0B9F\u0BCD_\u0B9A\u0BC6\u0BAA\u0BCD\u0B9F\u0BC6\u0BAE\u0BCD\u0BAA\u0BB0\u0BCD_\u0B85\u0B95\u0BCD\u0B9F\u0BC7\u0BBE\u0BAA\u0BB0\u0BCD_\u0BA8\u0BB5\u0BAE\u0BCD\u0BAA\u0BB0\u0BCD_\u0B9F\u0BBF\u0B9A\u0BAE\u0BCD\u0BAA\u0BB0\u0BCD".split("_"),
      weekdaysShort: "\u0B9E\u0BBE\u0BAF\u0BBF\u0BB1\u0BC1_\u0BA4\u0BBF\u0B99\u0BCD\u0B95\u0BB3\u0BCD_\u0B9A\u0BC6\u0BB5\u0BCD\u0BB5\u0BBE\u0BAF\u0BCD_\u0BAA\u0BC1\u0BA4\u0BA9\u0BCD_\u0BB5\u0BBF\u0BAF\u0BBE\u0BB4\u0BA9\u0BCD_\u0BB5\u0BC6\u0BB3\u0BCD\u0BB3\u0BBF_\u0B9A\u0BA9\u0BBF".split("_"),
      monthsShort: "\u0B9C\u0BA9\u0BB5\u0BB0\u0BBF_\u0BAA\u0BBF\u0BAA\u0BCD\u0BB0\u0BB5\u0BB0\u0BBF_\u0BAE\u0BBE\u0BB0\u0BCD\u0B9A\u0BCD_\u0B8F\u0BAA\u0BCD\u0BB0\u0BB2\u0BCD_\u0BAE\u0BC7_\u0B9C\u0BC2\u0BA9\u0BCD_\u0B9C\u0BC2\u0BB2\u0BC8_\u0B86\u0B95\u0BB8\u0BCD\u0B9F\u0BCD_\u0B9A\u0BC6\u0BAA\u0BCD\u0B9F\u0BC6\u0BAE\u0BCD\u0BAA\u0BB0\u0BCD_\u0B85\u0B95\u0BCD\u0B9F\u0BC7\u0BBE\u0BAA\u0BB0\u0BCD_\u0BA8\u0BB5\u0BAE\u0BCD\u0BAA\u0BB0\u0BCD_\u0B9F\u0BBF\u0B9A\u0BAE\u0BCD\u0BAA\u0BB0\u0BCD".split("_"),
      weekdaysMin: "\u0B9E\u0BBE_\u0BA4\u0BBF_\u0B9A\u0BC6_\u0BAA\u0BC1_\u0BB5\u0BBF_\u0BB5\u0BC6_\u0B9A".split("_"),
      ordinal: function ordinal120(n) {
        return n;
      },
      formats: {
        LT: "HH:mm",
        LTS: "HH:mm:ss",
        L: "DD/MM/YYYY",
        LL: "D MMMM YYYY",
        LLL: "D MMMM YYYY, HH:mm",
        LLLL: "dddd, D MMMM YYYY, HH:mm"
      },
      relativeTime: {
        future: "%s \u0B87\u0BB2\u0BCD",
        past: "%s \u0BAE\u0BC1\u0BA9\u0BCD",
        s: "\u0B92\u0BB0\u0BC1 \u0B9A\u0BBF\u0BB2 \u0BB5\u0BBF\u0BA8\u0BBE\u0B9F\u0BBF\u0B95\u0BB3\u0BCD",
        m: "\u0B92\u0BB0\u0BC1 \u0BA8\u0BBF\u0BAE\u0BBF\u0B9F\u0BAE\u0BCD",
        mm: "%d \u0BA8\u0BBF\u0BAE\u0BBF\u0B9F\u0B99\u0BCD\u0B95\u0BB3\u0BCD",
        h: "\u0B92\u0BB0\u0BC1 \u0BAE\u0BA3\u0BBF \u0BA8\u0BC7\u0BB0\u0BAE\u0BCD",
        hh: "%d \u0BAE\u0BA3\u0BBF \u0BA8\u0BC7\u0BB0\u0BAE\u0BCD",
        d: "\u0B92\u0BB0\u0BC1 \u0BA8\u0BBE\u0BB3\u0BCD",
        dd: "%d \u0BA8\u0BBE\u0B9F\u0BCD\u0B95\u0BB3\u0BCD",
        M: "\u0B92\u0BB0\u0BC1 \u0BAE\u0BBE\u0BA4\u0BAE\u0BCD",
        MM: "%d \u0BAE\u0BBE\u0BA4\u0B99\u0BCD\u0B95\u0BB3\u0BCD",
        y: "\u0B92\u0BB0\u0BC1 \u0BB5\u0BB0\u0BC1\u0B9F\u0BAE\u0BCD",
        yy: "%d \u0B86\u0BA3\u0BCD\u0B9F\u0BC1\u0B95\u0BB3\u0BCD"
      }
    };
    stdin_default2.locale(locale119, null, true);
    ta_default = locale119;
  }
});

// public/codesandbox-runtime/dayjs-locale/te.js
var te_exports = {};
__export(te_exports, {
  default: () => te_default
});
var locale120, te_default;
var init_te = __esm({
  "public/codesandbox-runtime/dayjs-locale/te.js"() {
    "use strict";
    init_dayjs();
    locale120 = {
      name: "te",
      weekdays: "\u0C06\u0C26\u0C3F\u0C35\u0C3E\u0C30\u0C02_\u0C38\u0C4B\u0C2E\u0C35\u0C3E\u0C30\u0C02_\u0C2E\u0C02\u0C17\u0C33\u0C35\u0C3E\u0C30\u0C02_\u0C2C\u0C41\u0C27\u0C35\u0C3E\u0C30\u0C02_\u0C17\u0C41\u0C30\u0C41\u0C35\u0C3E\u0C30\u0C02_\u0C36\u0C41\u0C15\u0C4D\u0C30\u0C35\u0C3E\u0C30\u0C02_\u0C36\u0C28\u0C3F\u0C35\u0C3E\u0C30\u0C02".split("_"),
      months: "\u0C1C\u0C28\u0C35\u0C30\u0C3F_\u0C2B\u0C3F\u0C2C\u0C4D\u0C30\u0C35\u0C30\u0C3F_\u0C2E\u0C3E\u0C30\u0C4D\u0C1A\u0C3F_\u0C0F\u0C2A\u0C4D\u0C30\u0C3F\u0C32\u0C4D_\u0C2E\u0C47_\u0C1C\u0C42\u0C28\u0C4D_\u0C1C\u0C41\u0C32\u0C48_\u0C06\u0C17\u0C38\u0C4D\u0C1F\u0C41_\u0C38\u0C46\u0C2A\u0C4D\u0C1F\u0C46\u0C02\u0C2C\u0C30\u0C4D_\u0C05\u0C15\u0C4D\u0C1F\u0C4B\u0C2C\u0C30\u0C4D_\u0C28\u0C35\u0C02\u0C2C\u0C30\u0C4D_\u0C21\u0C3F\u0C38\u0C46\u0C02\u0C2C\u0C30\u0C4D".split("_"),
      weekdaysShort: "\u0C06\u0C26\u0C3F_\u0C38\u0C4B\u0C2E_\u0C2E\u0C02\u0C17\u0C33_\u0C2C\u0C41\u0C27_\u0C17\u0C41\u0C30\u0C41_\u0C36\u0C41\u0C15\u0C4D\u0C30_\u0C36\u0C28\u0C3F".split("_"),
      monthsShort: "\u0C1C\u0C28._\u0C2B\u0C3F\u0C2C\u0C4D\u0C30._\u0C2E\u0C3E\u0C30\u0C4D\u0C1A\u0C3F_\u0C0F\u0C2A\u0C4D\u0C30\u0C3F._\u0C2E\u0C47_\u0C1C\u0C42\u0C28\u0C4D_\u0C1C\u0C41\u0C32\u0C48_\u0C06\u0C17._\u0C38\u0C46\u0C2A\u0C4D._\u0C05\u0C15\u0C4D\u0C1F\u0C4B._\u0C28\u0C35._\u0C21\u0C3F\u0C38\u0C46.".split("_"),
      weekdaysMin: "\u0C06_\u0C38\u0C4B_\u0C2E\u0C02_\u0C2C\u0C41_\u0C17\u0C41_\u0C36\u0C41_\u0C36".split("_"),
      ordinal: function ordinal121(n) {
        return n;
      },
      formats: {
        LT: "A h:mm",
        LTS: "A h:mm:ss",
        L: "DD/MM/YYYY",
        LL: "D MMMM YYYY",
        LLL: "D MMMM YYYY, A h:mm",
        LLLL: "dddd, D MMMM YYYY, A h:mm"
      },
      relativeTime: {
        future: "%s \u0C32\u0C4B",
        past: "%s \u0C15\u0C4D\u0C30\u0C3F\u0C24\u0C02",
        s: "\u0C15\u0C4A\u0C28\u0C4D\u0C28\u0C3F \u0C15\u0C4D\u0C37\u0C23\u0C3E\u0C32\u0C41",
        m: "\u0C12\u0C15 \u0C28\u0C3F\u0C2E\u0C3F\u0C37\u0C02",
        mm: "%d \u0C28\u0C3F\u0C2E\u0C3F\u0C37\u0C3E\u0C32\u0C41",
        h: "\u0C12\u0C15 \u0C17\u0C02\u0C1F",
        hh: "%d \u0C17\u0C02\u0C1F\u0C32\u0C41",
        d: "\u0C12\u0C15 \u0C30\u0C4B\u0C1C\u0C41",
        dd: "%d \u0C30\u0C4B\u0C1C\u0C41\u0C32\u0C41",
        M: "\u0C12\u0C15 \u0C28\u0C46\u0C32",
        MM: "%d \u0C28\u0C46\u0C32\u0C32\u0C41",
        y: "\u0C12\u0C15 \u0C38\u0C02\u0C35\u0C24\u0C4D\u0C38\u0C30\u0C02",
        yy: "%d \u0C38\u0C02\u0C35\u0C24\u0C4D\u0C38\u0C30\u0C3E\u0C32\u0C41"
      }
    };
    stdin_default2.locale(locale120, null, true);
    te_default = locale120;
  }
});

// public/codesandbox-runtime/dayjs-locale/tet.js
var tet_exports = {};
__export(tet_exports, {
  default: () => tet_default
});
var locale121, tet_default;
var init_tet = __esm({
  "public/codesandbox-runtime/dayjs-locale/tet.js"() {
    "use strict";
    init_dayjs();
    locale121 = {
      name: "tet",
      weekdays: "Domingu_Segunda_Tersa_Kuarta_Kinta_Sesta_Sabadu".split("_"),
      months: "Janeiru_Fevereiru_Marsu_Abril_Maiu_Ju\xF1u_Jullu_Agustu_Setembru_Outubru_Novembru_Dezembru".split("_"),
      weekStart: 1,
      weekdaysShort: "Dom_Seg_Ters_Kua_Kint_Sest_Sab".split("_"),
      monthsShort: "Jan_Fev_Mar_Abr_Mai_Jun_Jul_Ago_Set_Out_Nov_Dez".split("_"),
      weekdaysMin: "Do_Seg_Te_Ku_Ki_Ses_Sa".split("_"),
      ordinal: function ordinal122(n) {
        return n;
      },
      formats: {
        LT: "HH:mm",
        LTS: "HH:mm:ss",
        L: "DD/MM/YYYY",
        LL: "D MMMM YYYY",
        LLL: "D MMMM YYYY HH:mm",
        LLLL: "dddd, D MMMM YYYY HH:mm"
      },
      relativeTime: {
        future: "iha %s",
        past: "%s liuba",
        s: "minutu balun",
        m: "minutu ida",
        mm: "minutu %d",
        h: "oras ida",
        hh: "oras %d",
        d: "loron ida",
        dd: "loron %d",
        M: "fulan ida",
        MM: "fulan %d",
        y: "tinan ida",
        yy: "tinan %d"
      }
    };
    stdin_default2.locale(locale121, null, true);
    tet_default = locale121;
  }
});

// public/codesandbox-runtime/dayjs-locale/tg.js
var tg_exports = {};
__export(tg_exports, {
  default: () => tg_default
});
var locale122, tg_default;
var init_tg = __esm({
  "public/codesandbox-runtime/dayjs-locale/tg.js"() {
    "use strict";
    init_dayjs();
    locale122 = {
      name: "tg",
      weekdays: "\u044F\u043A\u0448\u0430\u043D\u0431\u0435_\u0434\u0443\u0448\u0430\u043D\u0431\u0435_\u0441\u0435\u0448\u0430\u043D\u0431\u0435_\u0447\u043E\u0440\u0448\u0430\u043D\u0431\u0435_\u043F\u0430\u043D\u04B7\u0448\u0430\u043D\u0431\u0435_\u04B7\u0443\u043C\u044A\u0430_\u0448\u0430\u043D\u0431\u0435".split("_"),
      months: "\u044F\u043D\u0432\u0430\u0440_\u0444\u0435\u0432\u0440\u0430\u043B_\u043C\u0430\u0440\u0442_\u0430\u043F\u0440\u0435\u043B_\u043C\u0430\u0439_\u0438\u044E\u043D_\u0438\u044E\u043B_\u0430\u0432\u0433\u0443\u0441\u0442_\u0441\u0435\u043D\u0442\u044F\u0431\u0440_\u043E\u043A\u0442\u044F\u0431\u0440_\u043D\u043E\u044F\u0431\u0440_\u0434\u0435\u043A\u0430\u0431\u0440".split("_"),
      weekStart: 1,
      weekdaysShort: "\u044F\u0448\u0431_\u0434\u0448\u0431_\u0441\u0448\u0431_\u0447\u0448\u0431_\u043F\u0448\u0431_\u04B7\u0443\u043C_\u0448\u043D\u0431".split("_"),
      monthsShort: "\u044F\u043D\u0432_\u0444\u0435\u0432_\u043C\u0430\u0440_\u0430\u043F\u0440_\u043C\u0430\u0439_\u0438\u044E\u043D_\u0438\u044E\u043B_\u0430\u0432\u0433_\u0441\u0435\u043D_\u043E\u043A\u0442_\u043D\u043E\u044F_\u0434\u0435\u043A".split("_"),
      weekdaysMin: "\u044F\u0448_\u0434\u0448_\u0441\u0448_\u0447\u0448_\u043F\u0448_\u04B7\u043C_\u0448\u0431".split("_"),
      ordinal: function ordinal123(n) {
        return n;
      },
      formats: {
        LT: "HH:mm",
        LTS: "HH:mm:ss",
        L: "DD/MM/YYYY",
        LL: "D MMMM YYYY",
        LLL: "D MMMM YYYY HH:mm",
        LLLL: "dddd, D MMMM YYYY HH:mm"
      },
      relativeTime: {
        future: "\u0431\u0430\u044A\u0434\u0438 %s",
        past: "%s \u043F\u0435\u0448",
        s: "\u044F\u043A\u0447\u0430\u043D\u0434 \u0441\u043E\u043D\u0438\u044F",
        m: "\u044F\u043A \u0434\u0430\u049B\u0438\u049B\u0430",
        mm: "%d \u0434\u0430\u049B\u0438\u049B\u0430",
        h: "\u044F\u043A \u0441\u043E\u0430\u0442",
        hh: "%d \u0441\u043E\u0430\u0442",
        d: "\u044F\u043A \u0440\u04EF\u0437",
        dd: "%d \u0440\u04EF\u0437",
        M: "\u044F\u043A \u043C\u043E\u04B3",
        MM: "%d \u043C\u043E\u04B3",
        y: "\u044F\u043A \u0441\u043E\u043B",
        yy: "%d \u0441\u043E\u043B"
      }
    };
    stdin_default2.locale(locale122, null, true);
    tg_default = locale122;
  }
});

// public/codesandbox-runtime/dayjs-locale/th.js
var th_exports = {};
__export(th_exports, {
  default: () => th_default
});
var locale123, th_default;
var init_th = __esm({
  "public/codesandbox-runtime/dayjs-locale/th.js"() {
    "use strict";
    init_dayjs();
    locale123 = {
      name: "th",
      weekdays: "\u0E2D\u0E32\u0E17\u0E34\u0E15\u0E22\u0E4C_\u0E08\u0E31\u0E19\u0E17\u0E23\u0E4C_\u0E2D\u0E31\u0E07\u0E04\u0E32\u0E23_\u0E1E\u0E38\u0E18_\u0E1E\u0E24\u0E2B\u0E31\u0E2A\u0E1A\u0E14\u0E35_\u0E28\u0E38\u0E01\u0E23\u0E4C_\u0E40\u0E2A\u0E32\u0E23\u0E4C".split("_"),
      weekdaysShort: "\u0E2D\u0E32\u0E17\u0E34\u0E15\u0E22\u0E4C_\u0E08\u0E31\u0E19\u0E17\u0E23\u0E4C_\u0E2D\u0E31\u0E07\u0E04\u0E32\u0E23_\u0E1E\u0E38\u0E18_\u0E1E\u0E24\u0E2B\u0E31\u0E2A_\u0E28\u0E38\u0E01\u0E23\u0E4C_\u0E40\u0E2A\u0E32\u0E23\u0E4C".split("_"),
      weekdaysMin: "\u0E2D\u0E32._\u0E08._\u0E2D._\u0E1E._\u0E1E\u0E24._\u0E28._\u0E2A.".split("_"),
      months: "\u0E21\u0E01\u0E23\u0E32\u0E04\u0E21_\u0E01\u0E38\u0E21\u0E20\u0E32\u0E1E\u0E31\u0E19\u0E18\u0E4C_\u0E21\u0E35\u0E19\u0E32\u0E04\u0E21_\u0E40\u0E21\u0E29\u0E32\u0E22\u0E19_\u0E1E\u0E24\u0E29\u0E20\u0E32\u0E04\u0E21_\u0E21\u0E34\u0E16\u0E38\u0E19\u0E32\u0E22\u0E19_\u0E01\u0E23\u0E01\u0E0E\u0E32\u0E04\u0E21_\u0E2A\u0E34\u0E07\u0E2B\u0E32\u0E04\u0E21_\u0E01\u0E31\u0E19\u0E22\u0E32\u0E22\u0E19_\u0E15\u0E38\u0E25\u0E32\u0E04\u0E21_\u0E1E\u0E24\u0E28\u0E08\u0E34\u0E01\u0E32\u0E22\u0E19_\u0E18\u0E31\u0E19\u0E27\u0E32\u0E04\u0E21".split("_"),
      monthsShort: "\u0E21.\u0E04._\u0E01.\u0E1E._\u0E21\u0E35.\u0E04._\u0E40\u0E21.\u0E22._\u0E1E.\u0E04._\u0E21\u0E34.\u0E22._\u0E01.\u0E04._\u0E2A.\u0E04._\u0E01.\u0E22._\u0E15.\u0E04._\u0E1E.\u0E22._\u0E18.\u0E04.".split("_"),
      formats: {
        LT: "H:mm",
        LTS: "H:mm:ss",
        L: "DD/MM/YYYY",
        LL: "D MMMM YYYY",
        LLL: "D MMMM YYYY \u0E40\u0E27\u0E25\u0E32 H:mm",
        LLLL: "\u0E27\u0E31\u0E19dddd\u0E17\u0E35\u0E48 D MMMM YYYY \u0E40\u0E27\u0E25\u0E32 H:mm"
      },
      relativeTime: {
        future: "\u0E2D\u0E35\u0E01 %s",
        past: "%s\u0E17\u0E35\u0E48\u0E41\u0E25\u0E49\u0E27",
        s: "\u0E44\u0E21\u0E48\u0E01\u0E35\u0E48\u0E27\u0E34\u0E19\u0E32\u0E17\u0E35",
        m: "1 \u0E19\u0E32\u0E17\u0E35",
        mm: "%d \u0E19\u0E32\u0E17\u0E35",
        h: "1 \u0E0A\u0E31\u0E48\u0E27\u0E42\u0E21\u0E07",
        hh: "%d \u0E0A\u0E31\u0E48\u0E27\u0E42\u0E21\u0E07",
        d: "1 \u0E27\u0E31\u0E19",
        dd: "%d \u0E27\u0E31\u0E19",
        M: "1 \u0E40\u0E14\u0E37\u0E2D\u0E19",
        MM: "%d \u0E40\u0E14\u0E37\u0E2D\u0E19",
        y: "1 \u0E1B\u0E35",
        yy: "%d \u0E1B\u0E35"
      },
      ordinal: function ordinal124(n) {
        return n + ".";
      }
    };
    stdin_default2.locale(locale123, null, true);
    th_default = locale123;
  }
});

// public/codesandbox-runtime/dayjs-locale/tk.js
var tk_exports = {};
__export(tk_exports, {
  default: () => tk_default
});
var locale124, tk_default;
var init_tk = __esm({
  "public/codesandbox-runtime/dayjs-locale/tk.js"() {
    "use strict";
    init_dayjs();
    locale124 = {
      name: "tk",
      weekdays: "\xDDek\u015Fenbe_Du\u015Fenbe_Si\u015Fenbe_\xC7ar\u015Fenbe_Pen\u015Fenbe_Anna_\u015Eenbe".split("_"),
      weekdaysShort: "\xDDek_Du\u015F_Si\u015F_\xC7ar_Pen_Ann_\u015Een".split("_"),
      weekdaysMin: "\xDDk_D\u015F_S\u015F_\xC7r_Pn_An_\u015En".split("_"),
      months: "\xDDanwar_Fewral_Mart_Aprel_Ma\xFD_I\xFDun_I\xFDul_Awgust_Sent\xFDabr_Okt\xFDabr_No\xFDabr_Dekabr".split("_"),
      monthsShort: "\xDDan_Few_Mar_Apr_Ma\xFD_I\xFDn_I\xFDl_Awg_Sen_Okt_No\xFD_Dek".split("_"),
      weekStart: 1,
      formats: {
        LT: "HH:mm",
        LTS: "HH:mm:ss",
        L: "DD.MM.YYYY",
        LL: "D MMMM YYYY",
        LLL: "D MMMM YYYY HH:mm",
        LLLL: "dddd, D MMMM YYYY HH:mm"
      },
      relativeTime: {
        future: "%s so\u0148",
        past: "%s \xF6\u0148",
        s: "birn\xE4\xE7e sekunt",
        m: "bir minut",
        mm: "%d minut",
        h: "bir sagat",
        hh: "%d sagat",
        d: "bir g\xFCn",
        dd: "%d g\xFCn",
        M: "bir a\xFD",
        MM: "%d a\xFD",
        y: "bir \xFDyl",
        yy: "%d \xFDyl"
      },
      ordinal: function ordinal125(n) {
        return n + ".";
      }
    };
    stdin_default2.locale(locale124, null, true);
    tk_default = locale124;
  }
});

// public/codesandbox-runtime/dayjs-locale/tl-ph.js
var tl_ph_exports = {};
__export(tl_ph_exports, {
  default: () => tl_ph_default
});
var locale125, tl_ph_default;
var init_tl_ph = __esm({
  "public/codesandbox-runtime/dayjs-locale/tl-ph.js"() {
    "use strict";
    init_dayjs();
    locale125 = {
      name: "tl-ph",
      weekdays: "Linggo_Lunes_Martes_Miyerkules_Huwebes_Biyernes_Sabado".split("_"),
      months: "Enero_Pebrero_Marso_Abril_Mayo_Hunyo_Hulyo_Agosto_Setyembre_Oktubre_Nobyembre_Disyembre".split("_"),
      weekStart: 1,
      weekdaysShort: "Lin_Lun_Mar_Miy_Huw_Biy_Sab".split("_"),
      monthsShort: "Ene_Peb_Mar_Abr_May_Hun_Hul_Ago_Set_Okt_Nob_Dis".split("_"),
      weekdaysMin: "Li_Lu_Ma_Mi_Hu_Bi_Sab".split("_"),
      ordinal: function ordinal126(n) {
        return n;
      },
      formats: {
        LT: "HH:mm",
        LTS: "HH:mm:ss",
        L: "MM/D/YYYY",
        LL: "MMMM D, YYYY",
        LLL: "MMMM D, YYYY HH:mm",
        LLLL: "dddd, MMMM DD, YYYY HH:mm"
      },
      relativeTime: {
        future: "sa loob ng %s",
        past: "%s ang nakalipas",
        s: "ilang segundo",
        m: "isang minuto",
        mm: "%d minuto",
        h: "isang oras",
        hh: "%d oras",
        d: "isang araw",
        dd: "%d araw",
        M: "isang buwan",
        MM: "%d buwan",
        y: "isang taon",
        yy: "%d taon"
      }
    };
    stdin_default2.locale(locale125, null, true);
    tl_ph_default = locale125;
  }
});

// public/codesandbox-runtime/dayjs-locale/tlh.js
var tlh_exports = {};
__export(tlh_exports, {
  default: () => tlh_default
});
var locale126, tlh_default;
var init_tlh = __esm({
  "public/codesandbox-runtime/dayjs-locale/tlh.js"() {
    "use strict";
    init_dayjs();
    locale126 = {
      name: "tlh",
      weekdays: "lojmItjaj_DaSjaj_povjaj_ghItlhjaj_loghjaj_buqjaj_ghInjaj".split("_"),
      months: "tera\u2019 jar wa\u2019_tera\u2019 jar cha\u2019_tera\u2019 jar wej_tera\u2019 jar loS_tera\u2019 jar vagh_tera\u2019 jar jav_tera\u2019 jar Soch_tera\u2019 jar chorgh_tera\u2019 jar Hut_tera\u2019 jar wa\u2019maH_tera\u2019 jar wa\u2019maH wa\u2019_tera\u2019 jar wa\u2019maH cha\u2019".split("_"),
      weekStart: 1,
      weekdaysShort: "lojmItjaj_DaSjaj_povjaj_ghItlhjaj_loghjaj_buqjaj_ghInjaj".split("_"),
      monthsShort: "jar wa\u2019_jar cha\u2019_jar wej_jar loS_jar vagh_jar jav_jar Soch_jar chorgh_jar Hut_jar wa\u2019maH_jar wa\u2019maH wa\u2019_jar wa\u2019maH cha\u2019".split("_"),
      weekdaysMin: "lojmItjaj_DaSjaj_povjaj_ghItlhjaj_loghjaj_buqjaj_ghInjaj".split("_"),
      ordinal: function ordinal127(n) {
        return n;
      },
      formats: {
        LT: "HH:mm",
        LTS: "HH:mm:ss",
        L: "DD.MM.YYYY",
        LL: "D MMMM YYYY",
        LLL: "D MMMM YYYY HH:mm",
        LLLL: "dddd, D MMMM YYYY HH:mm"
      }
    };
    stdin_default2.locale(locale126, null, true);
    tlh_default = locale126;
  }
});

// public/codesandbox-runtime/dayjs-locale/tr.js
var tr_exports = {};
__export(tr_exports, {
  default: () => tr_default
});
var locale127, tr_default;
var init_tr = __esm({
  "public/codesandbox-runtime/dayjs-locale/tr.js"() {
    "use strict";
    init_dayjs();
    locale127 = {
      name: "tr",
      weekdays: "Pazar_Pazartesi_Sal\u0131_\xC7ar\u015Famba_Per\u015Fembe_Cuma_Cumartesi".split("_"),
      weekdaysShort: "Paz_Pts_Sal_\xC7ar_Per_Cum_Cts".split("_"),
      weekdaysMin: "Pz_Pt_Sa_\xC7a_Pe_Cu_Ct".split("_"),
      months: "Ocak_\u015Eubat_Mart_Nisan_May\u0131s_Haziran_Temmuz_A\u011Fustos_Eyl\xFCl_Ekim_Kas\u0131m_Aral\u0131k".split("_"),
      monthsShort: "Oca_\u015Eub_Mar_Nis_May_Haz_Tem_A\u011Fu_Eyl_Eki_Kas_Ara".split("_"),
      weekStart: 1,
      formats: {
        LT: "HH:mm",
        LTS: "HH:mm:ss",
        L: "DD.MM.YYYY",
        LL: "D MMMM YYYY",
        LLL: "D MMMM YYYY HH:mm",
        LLLL: "dddd, D MMMM YYYY HH:mm"
      },
      relativeTime: {
        future: "%s sonra",
        past: "%s \xF6nce",
        s: "birka\xE7 saniye",
        m: "bir dakika",
        mm: "%d dakika",
        h: "bir saat",
        hh: "%d saat",
        d: "bir g\xFCn",
        dd: "%d g\xFCn",
        M: "bir ay",
        MM: "%d ay",
        y: "bir y\u0131l",
        yy: "%d y\u0131l"
      },
      ordinal: function ordinal128(n) {
        return n + ".";
      }
    };
    stdin_default2.locale(locale127, null, true);
    tr_default = locale127;
  }
});

// public/codesandbox-runtime/dayjs-locale/tzl.js
var tzl_exports = {};
__export(tzl_exports, {
  default: () => tzl_default
});
var locale128, tzl_default;
var init_tzl = __esm({
  "public/codesandbox-runtime/dayjs-locale/tzl.js"() {
    "use strict";
    init_dayjs();
    locale128 = {
      name: "tzl",
      weekdays: "S\xFAladi_L\xFAne\xE7i_Maitzi_M\xE1rcuri_Xh\xFAadi_Vi\xE9ner\xE7i_S\xE1turi".split("_"),
      months: "Januar_Fevraglh_Mar\xE7_Avr\xEFu_Mai_G\xFCn_Julia_Guscht_Setemvar_Listop\xE4ts_Noemvar_Zecemvar".split("_"),
      weekStart: 1,
      weekdaysShort: "S\xFAl_L\xFAn_Mai_M\xE1r_Xh\xFA_Vi\xE9_S\xE1t".split("_"),
      monthsShort: "Jan_Fev_Mar_Avr_Mai_G\xFCn_Jul_Gus_Set_Lis_Noe_Zec".split("_"),
      weekdaysMin: "S\xFA_L\xFA_Ma_M\xE1_Xh_Vi_S\xE1".split("_"),
      ordinal: function ordinal129(n) {
        return n;
      },
      formats: {
        LT: "HH.mm",
        LTS: "HH.mm.ss",
        L: "DD.MM.YYYY",
        LL: "D. MMMM [dallas] YYYY",
        LLL: "D. MMMM [dallas] YYYY HH.mm",
        LLLL: "dddd, [li] D. MMMM [dallas] YYYY HH.mm"
      }
    };
    stdin_default2.locale(locale128, null, true);
    tzl_default = locale128;
  }
});

// public/codesandbox-runtime/dayjs-locale/tzm-latn.js
var tzm_latn_exports = {};
__export(tzm_latn_exports, {
  default: () => tzm_latn_default
});
var locale129, tzm_latn_default;
var init_tzm_latn = __esm({
  "public/codesandbox-runtime/dayjs-locale/tzm-latn.js"() {
    "use strict";
    init_dayjs();
    locale129 = {
      name: "tzm-latn",
      weekdays: "asamas_aynas_asinas_akras_akwas_asimwas_asi\u1E0Dyas".split("_"),
      months: "innayr_br\u02E4ayr\u02E4_mar\u02E4s\u02E4_ibrir_mayyw_ywnyw_ywlywz_\u0263w\u0161t_\u0161wtanbir_kt\u02E4wbr\u02E4_nwwanbir_dwjnbir".split("_"),
      weekStart: 6,
      weekdaysShort: "asamas_aynas_asinas_akras_akwas_asimwas_asi\u1E0Dyas".split("_"),
      monthsShort: "innayr_br\u02E4ayr\u02E4_mar\u02E4s\u02E4_ibrir_mayyw_ywnyw_ywlywz_\u0263w\u0161t_\u0161wtanbir_kt\u02E4wbr\u02E4_nwwanbir_dwjnbir".split("_"),
      weekdaysMin: "asamas_aynas_asinas_akras_akwas_asimwas_asi\u1E0Dyas".split("_"),
      ordinal: function ordinal130(n) {
        return n;
      },
      formats: {
        LT: "HH:mm",
        LTS: "HH:mm:ss",
        L: "DD/MM/YYYY",
        LL: "D MMMM YYYY",
        LLL: "D MMMM YYYY HH:mm",
        LLLL: "dddd D MMMM YYYY HH:mm"
      },
      relativeTime: {
        future: "dadkh s yan %s",
        past: "yan %s",
        s: "imik",
        m: "minu\u1E0D",
        mm: "%d minu\u1E0D",
        h: "sa\u025Ba",
        hh: "%d tassa\u025Bin",
        d: "ass",
        dd: "%d ossan",
        M: "ayowr",
        MM: "%d iyyirn",
        y: "asgas",
        yy: "%d isgasn"
      }
    };
    stdin_default2.locale(locale129, null, true);
    tzm_latn_default = locale129;
  }
});

// public/codesandbox-runtime/dayjs-locale/tzm.js
var tzm_exports = {};
__export(tzm_exports, {
  default: () => tzm_default
});
var locale130, tzm_default;
var init_tzm = __esm({
  "public/codesandbox-runtime/dayjs-locale/tzm.js"() {
    "use strict";
    init_dayjs();
    locale130 = {
      name: "tzm",
      weekdays: "\u2D30\u2D59\u2D30\u2D4E\u2D30\u2D59_\u2D30\u2D62\u2D4F\u2D30\u2D59_\u2D30\u2D59\u2D49\u2D4F\u2D30\u2D59_\u2D30\u2D3D\u2D54\u2D30\u2D59_\u2D30\u2D3D\u2D61\u2D30\u2D59_\u2D30\u2D59\u2D49\u2D4E\u2D61\u2D30\u2D59_\u2D30\u2D59\u2D49\u2D39\u2D62\u2D30\u2D59".split("_"),
      months: "\u2D49\u2D4F\u2D4F\u2D30\u2D62\u2D54_\u2D31\u2D55\u2D30\u2D62\u2D55_\u2D4E\u2D30\u2D55\u2D5A_\u2D49\u2D31\u2D54\u2D49\u2D54_\u2D4E\u2D30\u2D62\u2D62\u2D53_\u2D62\u2D53\u2D4F\u2D62\u2D53_\u2D62\u2D53\u2D4D\u2D62\u2D53\u2D63_\u2D56\u2D53\u2D5B\u2D5C_\u2D5B\u2D53\u2D5C\u2D30\u2D4F\u2D31\u2D49\u2D54_\u2D3D\u2D5F\u2D53\u2D31\u2D55_\u2D4F\u2D53\u2D61\u2D30\u2D4F\u2D31\u2D49\u2D54_\u2D37\u2D53\u2D4A\u2D4F\u2D31\u2D49\u2D54".split("_"),
      weekStart: 6,
      weekdaysShort: "\u2D30\u2D59\u2D30\u2D4E\u2D30\u2D59_\u2D30\u2D62\u2D4F\u2D30\u2D59_\u2D30\u2D59\u2D49\u2D4F\u2D30\u2D59_\u2D30\u2D3D\u2D54\u2D30\u2D59_\u2D30\u2D3D\u2D61\u2D30\u2D59_\u2D30\u2D59\u2D49\u2D4E\u2D61\u2D30\u2D59_\u2D30\u2D59\u2D49\u2D39\u2D62\u2D30\u2D59".split("_"),
      monthsShort: "\u2D49\u2D4F\u2D4F\u2D30\u2D62\u2D54_\u2D31\u2D55\u2D30\u2D62\u2D55_\u2D4E\u2D30\u2D55\u2D5A_\u2D49\u2D31\u2D54\u2D49\u2D54_\u2D4E\u2D30\u2D62\u2D62\u2D53_\u2D62\u2D53\u2D4F\u2D62\u2D53_\u2D62\u2D53\u2D4D\u2D62\u2D53\u2D63_\u2D56\u2D53\u2D5B\u2D5C_\u2D5B\u2D53\u2D5C\u2D30\u2D4F\u2D31\u2D49\u2D54_\u2D3D\u2D5F\u2D53\u2D31\u2D55_\u2D4F\u2D53\u2D61\u2D30\u2D4F\u2D31\u2D49\u2D54_\u2D37\u2D53\u2D4A\u2D4F\u2D31\u2D49\u2D54".split("_"),
      weekdaysMin: "\u2D30\u2D59\u2D30\u2D4E\u2D30\u2D59_\u2D30\u2D62\u2D4F\u2D30\u2D59_\u2D30\u2D59\u2D49\u2D4F\u2D30\u2D59_\u2D30\u2D3D\u2D54\u2D30\u2D59_\u2D30\u2D3D\u2D61\u2D30\u2D59_\u2D30\u2D59\u2D49\u2D4E\u2D61\u2D30\u2D59_\u2D30\u2D59\u2D49\u2D39\u2D62\u2D30\u2D59".split("_"),
      ordinal: function ordinal131(n) {
        return n;
      },
      formats: {
        LT: "HH:mm",
        LTS: "HH:mm:ss",
        L: "DD/MM/YYYY",
        LL: "D MMMM YYYY",
        LLL: "D MMMM YYYY HH:mm",
        LLLL: "dddd D MMMM YYYY HH:mm"
      },
      relativeTime: {
        future: "\u2D37\u2D30\u2D37\u2D45 \u2D59 \u2D62\u2D30\u2D4F %s",
        past: "\u2D62\u2D30\u2D4F %s",
        s: "\u2D49\u2D4E\u2D49\u2D3D",
        m: "\u2D4E\u2D49\u2D4F\u2D53\u2D3A",
        mm: "%d \u2D4E\u2D49\u2D4F\u2D53\u2D3A",
        h: "\u2D59\u2D30\u2D44\u2D30",
        hh: "%d \u2D5C\u2D30\u2D59\u2D59\u2D30\u2D44\u2D49\u2D4F",
        d: "\u2D30\u2D59\u2D59",
        dd: "%d o\u2D59\u2D59\u2D30\u2D4F",
        M: "\u2D30\u2D62o\u2D53\u2D54",
        MM: "%d \u2D49\u2D62\u2D62\u2D49\u2D54\u2D4F",
        y: "\u2D30\u2D59\u2D33\u2D30\u2D59",
        yy: "%d \u2D49\u2D59\u2D33\u2D30\u2D59\u2D4F"
      }
    };
    stdin_default2.locale(locale130, null, true);
    tzm_default = locale130;
  }
});

// public/codesandbox-runtime/dayjs-locale/ug-cn.js
var ug_cn_exports = {};
__export(ug_cn_exports, {
  default: () => ug_cn_default
});
var locale131, ug_cn_default;
var init_ug_cn = __esm({
  "public/codesandbox-runtime/dayjs-locale/ug-cn.js"() {
    "use strict";
    init_dayjs();
    locale131 = {
      name: "ug-cn",
      weekdays: "\u064A\u06D5\u0643\u0634\u06D5\u0646\u0628\u06D5_\u062F\u06C8\u0634\u06D5\u0646\u0628\u06D5_\u0633\u06D5\u064A\u0634\u06D5\u0646\u0628\u06D5_\u0686\u0627\u0631\u0634\u06D5\u0646\u0628\u06D5_\u067E\u06D5\u064A\u0634\u06D5\u0646\u0628\u06D5_\u062C\u06C8\u0645\u06D5_\u0634\u06D5\u0646\u0628\u06D5".split("_"),
      months: "\u064A\u0627\u0646\u06CB\u0627\u0631_\u0641\u06D0\u06CB\u0631\u0627\u0644_\u0645\u0627\u0631\u062A_\u0626\u0627\u067E\u0631\u06D0\u0644_\u0645\u0627\u064A_\u0626\u0649\u064A\u06C7\u0646_\u0626\u0649\u064A\u06C7\u0644_\u0626\u0627\u06CB\u063A\u06C7\u0633\u062A_\u0633\u06D0\u0646\u062A\u06D5\u0628\u0649\u0631_\u0626\u06C6\u0643\u062A\u06D5\u0628\u0649\u0631_\u0646\u0648\u064A\u0627\u0628\u0649\u0631_\u062F\u06D0\u0643\u0627\u0628\u0649\u0631".split("_"),
      weekStart: 1,
      weekdaysShort: "\u064A\u06D5_\u062F\u06C8_\u0633\u06D5_\u0686\u0627_\u067E\u06D5_\u062C\u06C8_\u0634\u06D5".split("_"),
      monthsShort: "\u064A\u0627\u0646\u06CB\u0627\u0631_\u0641\u06D0\u06CB\u0631\u0627\u0644_\u0645\u0627\u0631\u062A_\u0626\u0627\u067E\u0631\u06D0\u0644_\u0645\u0627\u064A_\u0626\u0649\u064A\u06C7\u0646_\u0626\u0649\u064A\u06C7\u0644_\u0626\u0627\u06CB\u063A\u06C7\u0633\u062A_\u0633\u06D0\u0646\u062A\u06D5\u0628\u0649\u0631_\u0626\u06C6\u0643\u062A\u06D5\u0628\u0649\u0631_\u0646\u0648\u064A\u0627\u0628\u0649\u0631_\u062F\u06D0\u0643\u0627\u0628\u0649\u0631".split("_"),
      weekdaysMin: "\u064A\u06D5_\u062F\u06C8_\u0633\u06D5_\u0686\u0627_\u067E\u06D5_\u062C\u06C8_\u0634\u06D5".split("_"),
      ordinal: function ordinal132(n) {
        return n;
      },
      formats: {
        LT: "HH:mm",
        LTS: "HH:mm:ss",
        L: "YYYY-MM-DD",
        LL: "YYYY-\u064A\u0649\u0644\u0649M-\u0626\u0627\u064A\u0646\u0649\u06ADD-\u0643\u06C8\u0646\u0649",
        LLL: "YYYY-\u064A\u0649\u0644\u0649M-\u0626\u0627\u064A\u0646\u0649\u06ADD-\u0643\u06C8\u0646\u0649\u060C HH:mm",
        LLLL: "dddd\u060C YYYY-\u064A\u0649\u0644\u0649M-\u0626\u0627\u064A\u0646\u0649\u06ADD-\u0643\u06C8\u0646\u0649\u060C HH:mm"
      },
      relativeTime: {
        future: "%s \u0643\u06D0\u064A\u0649\u0646",
        past: "%s \u0628\u06C7\u0631\u06C7\u0646",
        s: "\u0646\u06D5\u0686\u0686\u06D5 \u0633\u06D0\u0643\u0648\u0646\u062A",
        m: "\u0628\u0649\u0631 \u0645\u0649\u0646\u06C7\u062A",
        mm: "%d \u0645\u0649\u0646\u06C7\u062A",
        h: "\u0628\u0649\u0631 \u0633\u0627\u0626\u06D5\u062A",
        hh: "%d \u0633\u0627\u0626\u06D5\u062A",
        d: "\u0628\u0649\u0631 \u0643\u06C8\u0646",
        dd: "%d \u0643\u06C8\u0646",
        M: "\u0628\u0649\u0631 \u0626\u0627\u064A",
        MM: "%d \u0626\u0627\u064A",
        y: "\u0628\u0649\u0631 \u064A\u0649\u0644",
        yy: "%d \u064A\u0649\u0644"
      }
    };
    stdin_default2.locale(locale131, null, true);
    ug_cn_default = locale131;
  }
});

// public/codesandbox-runtime/dayjs-locale/uk.js
var uk_exports = {};
__export(uk_exports, {
  default: () => uk_default
});
function plural6(word, num) {
  var forms = word.split("_");
  return num % 10 === 1 && num % 100 !== 11 ? forms[0] : num % 10 >= 2 && num % 10 <= 4 && (num % 100 < 10 || num % 100 >= 20) ? forms[1] : forms[2];
}
function relativeTimeWithPlural3(number, withoutSuffix, key) {
  var format = {
    ss: withoutSuffix ? "\u0441\u0435\u043A\u0443\u043D\u0434\u0430_\u0441\u0435\u043A\u0443\u043D\u0434\u0438_\u0441\u0435\u043A\u0443\u043D\u0434" : "\u0441\u0435\u043A\u0443\u043D\u0434\u0443_\u0441\u0435\u043A\u0443\u043D\u0434\u0438_\u0441\u0435\u043A\u0443\u043D\u0434",
    mm: withoutSuffix ? "\u0445\u0432\u0438\u043B\u0438\u043D\u0430_\u0445\u0432\u0438\u043B\u0438\u043D\u0438_\u0445\u0432\u0438\u043B\u0438\u043D" : "\u0445\u0432\u0438\u043B\u0438\u043D\u0443_\u0445\u0432\u0438\u043B\u0438\u043D\u0438_\u0445\u0432\u0438\u043B\u0438\u043D",
    hh: withoutSuffix ? "\u0433\u043E\u0434\u0438\u043D\u0430_\u0433\u043E\u0434\u0438\u043D\u0438_\u0433\u043E\u0434\u0438\u043D" : "\u0433\u043E\u0434\u0438\u043D\u0443_\u0433\u043E\u0434\u0438\u043D\u0438_\u0433\u043E\u0434\u0438\u043D",
    dd: "\u0434\u0435\u043D\u044C_\u0434\u043D\u0456_\u0434\u043D\u0456\u0432",
    MM: "\u043C\u0456\u0441\u044F\u0446\u044C_\u043C\u0456\u0441\u044F\u0446\u0456_\u043C\u0456\u0441\u044F\u0446\u0456\u0432",
    yy: "\u0440\u0456\u043A_\u0440\u043E\u043A\u0438_\u0440\u043E\u043A\u0456\u0432"
  };
  if (key === "m") {
    return withoutSuffix ? "\u0445\u0432\u0438\u043B\u0438\u043D\u0430" : "\u0445\u0432\u0438\u043B\u0438\u043D\u0443";
  } else if (key === "h") {
    return withoutSuffix ? "\u0433\u043E\u0434\u0438\u043D\u0430" : "\u0433\u043E\u0434\u0438\u043D\u0443";
  }
  return number + " " + plural6(format[key], +number);
}
var monthFormat6, monthStandalone6, MONTHS_IN_FORMAT6, months13, locale132, uk_default;
var init_uk = __esm({
  "public/codesandbox-runtime/dayjs-locale/uk.js"() {
    "use strict";
    init_dayjs();
    monthFormat6 = "\u0441\u0456\u0447\u043D\u044F_\u043B\u044E\u0442\u043E\u0433\u043E_\u0431\u0435\u0440\u0435\u0437\u043D\u044F_\u043A\u0432\u0456\u0442\u043D\u044F_\u0442\u0440\u0430\u0432\u043D\u044F_\u0447\u0435\u0440\u0432\u043D\u044F_\u043B\u0438\u043F\u043D\u044F_\u0441\u0435\u0440\u043F\u043D\u044F_\u0432\u0435\u0440\u0435\u0441\u043D\u044F_\u0436\u043E\u0432\u0442\u043D\u044F_\u043B\u0438\u0441\u0442\u043E\u043F\u0430\u0434\u0430_\u0433\u0440\u0443\u0434\u043D\u044F".split("_");
    monthStandalone6 = "\u0441\u0456\u0447\u0435\u043D\u044C_\u043B\u044E\u0442\u0438\u0439_\u0431\u0435\u0440\u0435\u0437\u0435\u043D\u044C_\u043A\u0432\u0456\u0442\u0435\u043D\u044C_\u0442\u0440\u0430\u0432\u0435\u043D\u044C_\u0447\u0435\u0440\u0432\u0435\u043D\u044C_\u043B\u0438\u043F\u0435\u043D\u044C_\u0441\u0435\u0440\u043F\u0435\u043D\u044C_\u0432\u0435\u0440\u0435\u0441\u0435\u043D\u044C_\u0436\u043E\u0432\u0442\u0435\u043D\u044C_\u043B\u0438\u0441\u0442\u043E\u043F\u0430\u0434_\u0433\u0440\u0443\u0434\u0435\u043D\u044C".split("_");
    MONTHS_IN_FORMAT6 = /D[oD]?(\[[^[\]]*\]|\s)+MMMM?/;
    months13 = function months14(dayjsInstance, format) {
      if (MONTHS_IN_FORMAT6.test(format)) {
        return monthFormat6[dayjsInstance.month()];
      }
      return monthStandalone6[dayjsInstance.month()];
    };
    months13.s = monthStandalone6;
    months13.f = monthFormat6;
    locale132 = {
      name: "uk",
      weekdays: "\u043D\u0435\u0434\u0456\u043B\u044F_\u043F\u043E\u043D\u0435\u0434\u0456\u043B\u043E\u043A_\u0432\u0456\u0432\u0442\u043E\u0440\u043E\u043A_\u0441\u0435\u0440\u0435\u0434\u0430_\u0447\u0435\u0442\u0432\u0435\u0440_\u043F\u2019\u044F\u0442\u043D\u0438\u0446\u044F_\u0441\u0443\u0431\u043E\u0442\u0430".split("_"),
      weekdaysShort: "\u043D\u0434\u043B_\u043F\u043D\u0434_\u0432\u0442\u0440_\u0441\u0440\u0434_\u0447\u0442\u0432_\u043F\u0442\u043D_\u0441\u0431\u0442".split("_"),
      weekdaysMin: "\u043D\u0434_\u043F\u043D_\u0432\u0442_\u0441\u0440_\u0447\u0442_\u043F\u0442_\u0441\u0431".split("_"),
      months: months13,
      monthsShort: "\u0441\u0456\u0447_\u043B\u044E\u0442_\u0431\u0435\u0440_\u043A\u0432\u0456\u0442_\u0442\u0440\u0430\u0432_\u0447\u0435\u0440\u0432_\u043B\u0438\u043F_\u0441\u0435\u0440\u043F_\u0432\u0435\u0440_\u0436\u043E\u0432\u0442_\u043B\u0438\u0441\u0442_\u0433\u0440\u0443\u0434".split("_"),
      weekStart: 1,
      relativeTime: {
        future: "\u0437\u0430 %s",
        past: "%s \u0442\u043E\u043C\u0443",
        s: "\u0434\u0435\u043A\u0456\u043B\u044C\u043A\u0430 \u0441\u0435\u043A\u0443\u043D\u0434",
        m: relativeTimeWithPlural3,
        mm: relativeTimeWithPlural3,
        h: relativeTimeWithPlural3,
        hh: relativeTimeWithPlural3,
        d: "\u0434\u0435\u043D\u044C",
        dd: relativeTimeWithPlural3,
        M: "\u043C\u0456\u0441\u044F\u0446\u044C",
        MM: relativeTimeWithPlural3,
        y: "\u0440\u0456\u043A",
        yy: relativeTimeWithPlural3
      },
      ordinal: function ordinal133(n) {
        return n;
      },
      formats: {
        LT: "HH:mm",
        LTS: "HH:mm:ss",
        L: "DD.MM.YYYY",
        LL: "D MMMM YYYY \u0440.",
        LLL: "D MMMM YYYY \u0440., HH:mm",
        LLLL: "dddd, D MMMM YYYY \u0440., HH:mm"
      }
    };
    stdin_default2.locale(locale132, null, true);
    uk_default = locale132;
  }
});

// public/codesandbox-runtime/dayjs-locale/ur.js
var ur_exports = {};
__export(ur_exports, {
  default: () => ur_default
});
var locale133, ur_default;
var init_ur = __esm({
  "public/codesandbox-runtime/dayjs-locale/ur.js"() {
    "use strict";
    init_dayjs();
    locale133 = {
      name: "ur",
      weekdays: "\u0627\u062A\u0648\u0627\u0631_\u067E\u06CC\u0631_\u0645\u0646\u06AF\u0644_\u0628\u062F\u06BE_\u062C\u0645\u0639\u0631\u0627\u062A_\u062C\u0645\u0639\u06C1_\u06C1\u0641\u062A\u06C1".split("_"),
      months: "\u062C\u0646\u0648\u0631\u06CC_\u0641\u0631\u0648\u0631\u06CC_\u0645\u0627\u0631\u0686_\u0627\u067E\u0631\u06CC\u0644_\u0645\u0626\u06CC_\u062C\u0648\u0646_\u062C\u0648\u0644\u0627\u0626\u06CC_\u0627\u06AF\u0633\u062A_\u0633\u062A\u0645\u0628\u0631_\u0627\u06A9\u062A\u0648\u0628\u0631_\u0646\u0648\u0645\u0628\u0631_\u062F\u0633\u0645\u0628\u0631".split("_"),
      weekStart: 1,
      weekdaysShort: "\u0627\u062A\u0648\u0627\u0631_\u067E\u06CC\u0631_\u0645\u0646\u06AF\u0644_\u0628\u062F\u06BE_\u062C\u0645\u0639\u0631\u0627\u062A_\u062C\u0645\u0639\u06C1_\u06C1\u0641\u062A\u06C1".split("_"),
      monthsShort: "\u062C\u0646\u0648\u0631\u06CC_\u0641\u0631\u0648\u0631\u06CC_\u0645\u0627\u0631\u0686_\u0627\u067E\u0631\u06CC\u0644_\u0645\u0626\u06CC_\u062C\u0648\u0646_\u062C\u0648\u0644\u0627\u0626\u06CC_\u0627\u06AF\u0633\u062A_\u0633\u062A\u0645\u0628\u0631_\u0627\u06A9\u062A\u0648\u0628\u0631_\u0646\u0648\u0645\u0628\u0631_\u062F\u0633\u0645\u0628\u0631".split("_"),
      weekdaysMin: "\u0627\u062A\u0648\u0627\u0631_\u067E\u06CC\u0631_\u0645\u0646\u06AF\u0644_\u0628\u062F\u06BE_\u062C\u0645\u0639\u0631\u0627\u062A_\u062C\u0645\u0639\u06C1_\u06C1\u0641\u062A\u06C1".split("_"),
      ordinal: function ordinal134(n) {
        return n;
      },
      formats: {
        LT: "HH:mm",
        LTS: "HH:mm:ss",
        L: "DD/MM/YYYY",
        LL: "D MMMM YYYY",
        LLL: "D MMMM YYYY HH:mm",
        LLLL: "dddd\u060C D MMMM YYYY HH:mm"
      },
      relativeTime: {
        future: "%s \u0628\u0639\u062F",
        past: "%s \u0642\u0628\u0644",
        s: "\u0686\u0646\u062F \u0633\u06CC\u06A9\u0646\u0688",
        m: "\u0627\u06CC\u06A9 \u0645\u0646\u0679",
        mm: "%d \u0645\u0646\u0679",
        h: "\u0627\u06CC\u06A9 \u06AF\u06BE\u0646\u0679\u06C1",
        hh: "%d \u06AF\u06BE\u0646\u0679\u06D2",
        d: "\u0627\u06CC\u06A9 \u062F\u0646",
        dd: "%d \u062F\u0646",
        M: "\u0627\u06CC\u06A9 \u0645\u0627\u06C1",
        MM: "%d \u0645\u0627\u06C1",
        y: "\u0627\u06CC\u06A9 \u0633\u0627\u0644",
        yy: "%d \u0633\u0627\u0644"
      }
    };
    stdin_default2.locale(locale133, null, true);
    ur_default = locale133;
  }
});

// public/codesandbox-runtime/dayjs-locale/uz-latn.js
var uz_latn_exports = {};
__export(uz_latn_exports, {
  default: () => uz_latn_default
});
var locale134, uz_latn_default;
var init_uz_latn = __esm({
  "public/codesandbox-runtime/dayjs-locale/uz-latn.js"() {
    "use strict";
    init_dayjs();
    locale134 = {
      name: "uz-latn",
      weekdays: "Yakshanba_Dushanba_Seshanba_Chorshanba_Payshanba_Juma_Shanba".split("_"),
      months: "Yanvar_Fevral_Mart_Aprel_May_Iyun_Iyul_Avgust_Sentabr_Oktabr_Noyabr_Dekabr".split("_"),
      weekStart: 1,
      weekdaysShort: "Yak_Dush_Sesh_Chor_Pay_Jum_Shan".split("_"),
      monthsShort: "Yan_Fev_Mar_Apr_May_Iyun_Iyul_Avg_Sen_Okt_Noy_Dek".split("_"),
      weekdaysMin: "Ya_Du_Se_Cho_Pa_Ju_Sha".split("_"),
      ordinal: function ordinal135(n) {
        return n;
      },
      formats: {
        LT: "HH:mm",
        LTS: "HH:mm:ss",
        L: "DD/MM/YYYY",
        LL: "D MMMM YYYY",
        LLL: "D MMMM YYYY HH:mm",
        LLLL: "D MMMM YYYY, dddd HH:mm"
      },
      relativeTime: {
        future: "Yaqin %s ichida",
        past: "%s oldin",
        s: "soniya",
        m: "bir daqiqa",
        mm: "%d daqiqa",
        h: "bir soat",
        hh: "%d soat",
        d: "bir kun",
        dd: "%d kun",
        M: "bir oy",
        MM: "%d oy",
        y: "bir yil",
        yy: "%d yil"
      }
    };
    stdin_default2.locale(locale134, null, true);
    uz_latn_default = locale134;
  }
});

// public/codesandbox-runtime/dayjs-locale/uz.js
var uz_exports = {};
__export(uz_exports, {
  default: () => uz_default
});
var locale135, uz_default;
var init_uz = __esm({
  "public/codesandbox-runtime/dayjs-locale/uz.js"() {
    "use strict";
    init_dayjs();
    locale135 = {
      name: "uz",
      weekdays: "\u042F\u043A\u0448\u0430\u043D\u0431\u0430_\u0414\u0443\u0448\u0430\u043D\u0431\u0430_\u0421\u0435\u0448\u0430\u043D\u0431\u0430_\u0427\u043E\u0440\u0448\u0430\u043D\u0431\u0430_\u041F\u0430\u0439\u0448\u0430\u043D\u0431\u0430_\u0416\u0443\u043C\u0430_\u0428\u0430\u043D\u0431\u0430".split("_"),
      months: "\u044F\u043D\u0432\u0430\u0440_\u0444\u0435\u0432\u0440\u0430\u043B_\u043C\u0430\u0440\u0442_\u0430\u043F\u0440\u0435\u043B_\u043C\u0430\u0439_\u0438\u044E\u043D_\u0438\u044E\u043B_\u0430\u0432\u0433\u0443\u0441\u0442_\u0441\u0435\u043D\u0442\u044F\u0431\u0440_\u043E\u043A\u0442\u044F\u0431\u0440_\u043D\u043E\u044F\u0431\u0440_\u0434\u0435\u043A\u0430\u0431\u0440".split("_"),
      weekStart: 1,
      weekdaysShort: "\u042F\u043A\u0448_\u0414\u0443\u0448_\u0421\u0435\u0448_\u0427\u043E\u0440_\u041F\u0430\u0439_\u0416\u0443\u043C_\u0428\u0430\u043D".split("_"),
      monthsShort: "\u044F\u043D\u0432_\u0444\u0435\u0432_\u043C\u0430\u0440_\u0430\u043F\u0440_\u043C\u0430\u0439_\u0438\u044E\u043D_\u0438\u044E\u043B_\u0430\u0432\u0433_\u0441\u0435\u043D_\u043E\u043A\u0442_\u043D\u043E\u044F_\u0434\u0435\u043A".split("_"),
      weekdaysMin: "\u042F\u043A_\u0414\u0443_\u0421\u0435_\u0427\u043E_\u041F\u0430_\u0416\u0443_\u0428\u0430".split("_"),
      ordinal: function ordinal136(n) {
        return n;
      },
      formats: {
        LT: "HH:mm",
        LTS: "HH:mm:ss",
        L: "DD/MM/YYYY",
        LL: "D MMMM YYYY",
        LLL: "D MMMM YYYY HH:mm",
        LLLL: "D MMMM YYYY, dddd HH:mm"
      },
      relativeTime: {
        future: "\u042F\u043A\u0438\u043D %s \u0438\u0447\u0438\u0434\u0430",
        past: "%s \u043E\u043B\u0434\u0438\u043D",
        s: "\u0444\u0443\u0440\u0441\u0430\u0442",
        m: "\u0431\u0438\u0440 \u0434\u0430\u043A\u0438\u043A\u0430",
        mm: "%d \u0434\u0430\u043A\u0438\u043A\u0430",
        h: "\u0431\u0438\u0440 \u0441\u043E\u0430\u0442",
        hh: "%d \u0441\u043E\u0430\u0442",
        d: "\u0431\u0438\u0440 \u043A\u0443\u043D",
        dd: "%d \u043A\u0443\u043D",
        M: "\u0431\u0438\u0440 \u043E\u0439",
        MM: "%d \u043E\u0439",
        y: "\u0431\u0438\u0440 \u0439\u0438\u043B",
        yy: "%d \u0439\u0438\u043B"
      }
    };
    stdin_default2.locale(locale135, null, true);
    uz_default = locale135;
  }
});

// public/codesandbox-runtime/dayjs-locale/vi.js
var vi_exports = {};
__export(vi_exports, {
  default: () => vi_default
});
var locale136, vi_default;
var init_vi = __esm({
  "public/codesandbox-runtime/dayjs-locale/vi.js"() {
    "use strict";
    init_dayjs();
    locale136 = {
      name: "vi",
      weekdays: "ch\u1EE7 nh\u1EADt_th\u1EE9 hai_th\u1EE9 ba_th\u1EE9 t\u01B0_th\u1EE9 n\u0103m_th\u1EE9 s\xE1u_th\u1EE9 b\u1EA3y".split("_"),
      months: "th\xE1ng 1_th\xE1ng 2_th\xE1ng 3_th\xE1ng 4_th\xE1ng 5_th\xE1ng 6_th\xE1ng 7_th\xE1ng 8_th\xE1ng 9_th\xE1ng 10_th\xE1ng 11_th\xE1ng 12".split("_"),
      weekStart: 1,
      weekdaysShort: "CN_T2_T3_T4_T5_T6_T7".split("_"),
      monthsShort: "Th01_Th02_Th03_Th04_Th05_Th06_Th07_Th08_Th09_Th10_Th11_Th12".split("_"),
      weekdaysMin: "CN_T2_T3_T4_T5_T6_T7".split("_"),
      ordinal: function ordinal137(n) {
        return n;
      },
      formats: {
        LT: "HH:mm",
        LTS: "HH:mm:ss",
        L: "DD/MM/YYYY",
        LL: "D MMMM [n\u0103m] YYYY",
        LLL: "D MMMM [n\u0103m] YYYY HH:mm",
        LLLL: "dddd, D MMMM [n\u0103m] YYYY HH:mm",
        l: "DD/M/YYYY",
        ll: "D MMM YYYY",
        lll: "D MMM YYYY HH:mm",
        llll: "ddd, D MMM YYYY HH:mm"
      },
      relativeTime: {
        future: "%s t\u1EDBi",
        past: "%s tr\u01B0\u1EDBc",
        s: "v\xE0i gi\xE2y",
        m: "m\u1ED9t ph\xFAt",
        mm: "%d ph\xFAt",
        h: "m\u1ED9t gi\u1EDD",
        hh: "%d gi\u1EDD",
        d: "m\u1ED9t ng\xE0y",
        dd: "%d ng\xE0y",
        M: "m\u1ED9t th\xE1ng",
        MM: "%d th\xE1ng",
        y: "m\u1ED9t n\u0103m",
        yy: "%d n\u0103m"
      }
    };
    stdin_default2.locale(locale136, null, true);
    vi_default = locale136;
  }
});

// public/codesandbox-runtime/dayjs-locale/x-pseudo.js
var x_pseudo_exports = {};
__export(x_pseudo_exports, {
  default: () => x_pseudo_default
});
var locale137, x_pseudo_default;
var init_x_pseudo = __esm({
  "public/codesandbox-runtime/dayjs-locale/x-pseudo.js"() {
    "use strict";
    init_dayjs();
    locale137 = {
      name: "x-pseudo",
      weekdays: "S~\xFA\xF1d\xE1~\xFD_M\xF3~\xF1d\xE1\xFD~_T\xFA\xE9~sd\xE1\xFD~_W\xE9d~\xF1\xE9sd~\xE1\xFD_T~h\xFArs~d\xE1\xFD_~Fr\xEDd~\xE1\xFD_S~\xE1t\xFAr~d\xE1\xFD".split("_"),
      months: "J~\xE1\xF1\xFA\xE1~r\xFD_F~\xE9br\xFA~\xE1r\xFD_~M\xE1rc~h_\xC1p~r\xEDl_~M\xE1\xFD_~J\xFA\xF1\xE9~_J\xFAl~\xFD_\xC1\xFA~g\xFAst~_S\xE9p~t\xE9mb~\xE9r_\xD3~ct\xF3b~\xE9r_\xD1~\xF3v\xE9m~b\xE9r_~D\xE9c\xE9~mb\xE9r".split("_"),
      weekStart: 1,
      weekdaysShort: "S~\xFA\xF1_~M\xF3\xF1_~T\xFA\xE9_~W\xE9d_~Th\xFA_~Fr\xED_~S\xE1t".split("_"),
      monthsShort: "J~\xE1\xF1_~F\xE9b_~M\xE1r_~\xC1pr_~M\xE1\xFD_~J\xFA\xF1_~J\xFAl_~\xC1\xFAg_~S\xE9p_~\xD3ct_~\xD1\xF3v_~D\xE9c".split("_"),
      weekdaysMin: "S~\xFA_M\xF3~_T\xFA_~W\xE9_T~h_Fr~_S\xE1".split("_"),
      ordinal: function ordinal138(n) {
        return n;
      },
      formats: {
        LT: "HH:mm",
        LTS: "HH:mm:ss",
        L: "DD/MM/YYYY",
        LL: "D MMMM YYYY",
        LLL: "D MMMM YYYY HH:mm",
        LLLL: "dddd, D MMMM YYYY HH:mm"
      },
      relativeTime: {
        future: "\xED~\xF1 %s",
        past: "%s \xE1~g\xF3",
        s: "\xE1 ~f\xE9w ~s\xE9c\xF3~\xF1ds",
        m: "\xE1 ~m\xED\xF1~\xFAt\xE9",
        mm: "%d m~\xED\xF1\xFA~t\xE9s",
        h: "\xE1~\xF1 h\xF3~\xFAr",
        hh: "%d h~\xF3\xFArs",
        d: "\xE1 ~d\xE1\xFD",
        dd: "%d d~\xE1\xFDs",
        M: "\xE1 ~m\xF3\xF1~th",
        MM: "%d m~\xF3\xF1t~hs",
        y: "\xE1 ~\xFD\xE9\xE1r",
        yy: "%d \xFD~\xE9\xE1rs"
      }
    };
    stdin_default2.locale(locale137, null, true);
    x_pseudo_default = locale137;
  }
});

// public/codesandbox-runtime/dayjs-locale/yo.js
var yo_exports = {};
__export(yo_exports, {
  default: () => yo_default
});
var locale138, yo_default;
var init_yo = __esm({
  "public/codesandbox-runtime/dayjs-locale/yo.js"() {
    "use strict";
    init_dayjs();
    locale138 = {
      name: "yo",
      weekdays: "A\u0300i\u0300ku\u0301_Aje\u0301_I\u0300s\u1EB9\u0301gun_\u1ECCj\u1ECD\u0301ru\u0301_\u1ECCj\u1ECD\u0301b\u1ECD_\u1EB8ti\u0300_A\u0300ba\u0301m\u1EB9\u0301ta".split("_"),
      months: "S\u1EB9\u0301r\u1EB9\u0301_E\u0300re\u0300le\u0300_\u1EB8r\u1EB9\u0300na\u0300_I\u0300gbe\u0301_E\u0300bibi_O\u0300ku\u0300du_Ag\u1EB9mo_O\u0300gu\u0301n_Owewe_\u1ECC\u0300wa\u0300ra\u0300_Be\u0301lu\u0301_\u1ECC\u0300p\u1EB9\u0300\u0300".split("_"),
      weekStart: 1,
      weekdaysShort: "A\u0300i\u0300k_Aje\u0301_I\u0300s\u1EB9\u0301_\u1ECCjr_\u1ECCjb_\u1EB8ti\u0300_A\u0300ba\u0301".split("_"),
      monthsShort: "S\u1EB9\u0301r_E\u0300rl_\u1EB8rn_I\u0300gb_E\u0300bi_O\u0300ku\u0300_Ag\u1EB9_O\u0300gu\u0301_Owe_\u1ECC\u0300wa\u0300_Be\u0301l_\u1ECC\u0300p\u1EB9\u0300\u0300".split("_"),
      weekdaysMin: "A\u0300i\u0300_Aj_I\u0300s_\u1ECCr_\u1ECCb_\u1EB8t_A\u0300b".split("_"),
      ordinal: function ordinal139(n) {
        return n;
      },
      formats: {
        LT: "h:mm A",
        LTS: "h:mm:ss A",
        L: "DD/MM/YYYY",
        LL: "D MMMM YYYY",
        LLL: "D MMMM YYYY h:mm A",
        LLLL: "dddd, D MMMM YYYY h:mm A"
      },
      relativeTime: {
        future: "ni\u0301 %s",
        past: "%s k\u1ECDja\u0301",
        s: "i\u0300s\u1EB9ju\u0301 aaya\u0301 die",
        m: "i\u0300s\u1EB9ju\u0301 kan",
        mm: "i\u0300s\u1EB9ju\u0301 %d",
        h: "wa\u0301kati kan",
        hh: "wa\u0301kati %d",
        d: "\u1ECDj\u1ECD\u0301 kan",
        dd: "\u1ECDj\u1ECD\u0301 %d",
        M: "osu\u0300 kan",
        MM: "osu\u0300 %d",
        y: "\u1ECDdu\u0301n kan",
        yy: "\u1ECDdu\u0301n %d"
      }
    };
    stdin_default2.locale(locale138, null, true);
    yo_default = locale138;
  }
});

// public/codesandbox-runtime/dayjs-locale/zh-cn.js
var zh_cn_exports = {};
__export(zh_cn_exports, {
  default: () => zh_cn_default
});
var locale139, zh_cn_default;
var init_zh_cn = __esm({
  "public/codesandbox-runtime/dayjs-locale/zh-cn.js"() {
    "use strict";
    init_dayjs();
    locale139 = {
      name: "zh-cn",
      weekdays: "\u661F\u671F\u65E5_\u661F\u671F\u4E00_\u661F\u671F\u4E8C_\u661F\u671F\u4E09_\u661F\u671F\u56DB_\u661F\u671F\u4E94_\u661F\u671F\u516D".split("_"),
      weekdaysShort: "\u5468\u65E5_\u5468\u4E00_\u5468\u4E8C_\u5468\u4E09_\u5468\u56DB_\u5468\u4E94_\u5468\u516D".split("_"),
      weekdaysMin: "\u65E5_\u4E00_\u4E8C_\u4E09_\u56DB_\u4E94_\u516D".split("_"),
      months: "\u4E00\u6708_\u4E8C\u6708_\u4E09\u6708_\u56DB\u6708_\u4E94\u6708_\u516D\u6708_\u4E03\u6708_\u516B\u6708_\u4E5D\u6708_\u5341\u6708_\u5341\u4E00\u6708_\u5341\u4E8C\u6708".split("_"),
      monthsShort: "1\u6708_2\u6708_3\u6708_4\u6708_5\u6708_6\u6708_7\u6708_8\u6708_9\u6708_10\u6708_11\u6708_12\u6708".split("_"),
      ordinal: function ordinal140(number, period) {
        switch (period) {
          case "W":
            return number + "\u5468";
          default:
            return number + "\u65E5";
        }
      },
      weekStart: 1,
      yearStart: 4,
      formats: {
        LT: "HH:mm",
        LTS: "HH:mm:ss",
        L: "YYYY/MM/DD",
        LL: "YYYY\u5E74M\u6708D\u65E5",
        LLL: "YYYY\u5E74M\u6708D\u65E5Ah\u70B9mm\u5206",
        LLLL: "YYYY\u5E74M\u6708D\u65E5ddddAh\u70B9mm\u5206",
        l: "YYYY/M/D",
        ll: "YYYY\u5E74M\u6708D\u65E5",
        lll: "YYYY\u5E74M\u6708D\u65E5 HH:mm",
        llll: "YYYY\u5E74M\u6708D\u65E5dddd HH:mm"
      },
      relativeTime: {
        future: "%s\u5185",
        past: "%s\u524D",
        s: "\u51E0\u79D2",
        m: "1 \u5206\u949F",
        mm: "%d \u5206\u949F",
        h: "1 \u5C0F\u65F6",
        hh: "%d \u5C0F\u65F6",
        d: "1 \u5929",
        dd: "%d \u5929",
        M: "1 \u4E2A\u6708",
        MM: "%d \u4E2A\u6708",
        y: "1 \u5E74",
        yy: "%d \u5E74"
      },
      meridiem: function meridiem16(hour, minute) {
        var hm = hour * 100 + minute;
        if (hm < 600) {
          return "\u51CC\u6668";
        } else if (hm < 900) {
          return "\u65E9\u4E0A";
        } else if (hm < 1100) {
          return "\u4E0A\u5348";
        } else if (hm < 1300) {
          return "\u4E2D\u5348";
        } else if (hm < 1800) {
          return "\u4E0B\u5348";
        }
        return "\u665A\u4E0A";
      }
    };
    stdin_default2.locale(locale139, null, true);
    zh_cn_default = locale139;
  }
});

// public/codesandbox-runtime/dayjs-locale/zh-hk.js
var zh_hk_exports = {};
__export(zh_hk_exports, {
  default: () => zh_hk_default
});
var locale140, zh_hk_default;
var init_zh_hk = __esm({
  "public/codesandbox-runtime/dayjs-locale/zh-hk.js"() {
    "use strict";
    init_dayjs();
    locale140 = {
      name: "zh-hk",
      months: "\u4E00\u6708_\u4E8C\u6708_\u4E09\u6708_\u56DB\u6708_\u4E94\u6708_\u516D\u6708_\u4E03\u6708_\u516B\u6708_\u4E5D\u6708_\u5341\u6708_\u5341\u4E00\u6708_\u5341\u4E8C\u6708".split("_"),
      monthsShort: "1\u6708_2\u6708_3\u6708_4\u6708_5\u6708_6\u6708_7\u6708_8\u6708_9\u6708_10\u6708_11\u6708_12\u6708".split("_"),
      weekdays: "\u661F\u671F\u65E5_\u661F\u671F\u4E00_\u661F\u671F\u4E8C_\u661F\u671F\u4E09_\u661F\u671F\u56DB_\u661F\u671F\u4E94_\u661F\u671F\u516D".split("_"),
      weekdaysShort: "\u9031\u65E5_\u9031\u4E00_\u9031\u4E8C_\u9031\u4E09_\u9031\u56DB_\u9031\u4E94_\u9031\u516D".split("_"),
      weekdaysMin: "\u65E5_\u4E00_\u4E8C_\u4E09_\u56DB_\u4E94_\u516D".split("_"),
      ordinal: function ordinal141(number, period) {
        switch (period) {
          case "W":
            return number + "\u9031";
          default:
            return number + "\u65E5";
        }
      },
      formats: {
        LT: "HH:mm",
        LTS: "HH:mm:ss",
        L: "YYYY/MM/DD",
        LL: "YYYY\u5E74M\u6708D\u65E5",
        LLL: "YYYY\u5E74M\u6708D\u65E5 HH:mm",
        LLLL: "YYYY\u5E74M\u6708D\u65E5dddd HH:mm",
        l: "YYYY/M/D",
        ll: "YYYY\u5E74M\u6708D\u65E5",
        lll: "YYYY\u5E74M\u6708D\u65E5 HH:mm",
        llll: "YYYY\u5E74M\u6708D\u65E5dddd HH:mm"
      },
      relativeTime: {
        future: "%s\u5167",
        past: "%s\u524D",
        s: "\u5E7E\u79D2",
        m: "\u4E00\u5206\u9418",
        mm: "%d \u5206\u9418",
        h: "\u4E00\u5C0F\u6642",
        hh: "%d \u5C0F\u6642",
        d: "\u4E00\u5929",
        dd: "%d \u5929",
        M: "\u4E00\u500B\u6708",
        MM: "%d \u500B\u6708",
        y: "\u4E00\u5E74",
        yy: "%d \u5E74"
      },
      meridiem: function meridiem17(hour, minute) {
        var hm = hour * 100 + minute;
        if (hm < 600) {
          return "\u51CC\u6668";
        } else if (hm < 900) {
          return "\u65E9\u4E0A";
        } else if (hm < 1100) {
          return "\u4E0A\u5348";
        } else if (hm < 1300) {
          return "\u4E2D\u5348";
        } else if (hm < 1800) {
          return "\u4E0B\u5348";
        }
        return "\u665A\u4E0A";
      }
    };
    stdin_default2.locale(locale140, null, true);
    zh_hk_default = locale140;
  }
});

// public/codesandbox-runtime/dayjs-locale/zh-tw.js
var zh_tw_exports = {};
__export(zh_tw_exports, {
  default: () => zh_tw_default
});
var locale141, zh_tw_default;
var init_zh_tw = __esm({
  "public/codesandbox-runtime/dayjs-locale/zh-tw.js"() {
    "use strict";
    init_dayjs();
    locale141 = {
      name: "zh-tw",
      weekdays: "\u661F\u671F\u65E5_\u661F\u671F\u4E00_\u661F\u671F\u4E8C_\u661F\u671F\u4E09_\u661F\u671F\u56DB_\u661F\u671F\u4E94_\u661F\u671F\u516D".split("_"),
      weekdaysShort: "\u9031\u65E5_\u9031\u4E00_\u9031\u4E8C_\u9031\u4E09_\u9031\u56DB_\u9031\u4E94_\u9031\u516D".split("_"),
      weekdaysMin: "\u65E5_\u4E00_\u4E8C_\u4E09_\u56DB_\u4E94_\u516D".split("_"),
      months: "\u4E00\u6708_\u4E8C\u6708_\u4E09\u6708_\u56DB\u6708_\u4E94\u6708_\u516D\u6708_\u4E03\u6708_\u516B\u6708_\u4E5D\u6708_\u5341\u6708_\u5341\u4E00\u6708_\u5341\u4E8C\u6708".split("_"),
      monthsShort: "1\u6708_2\u6708_3\u6708_4\u6708_5\u6708_6\u6708_7\u6708_8\u6708_9\u6708_10\u6708_11\u6708_12\u6708".split("_"),
      ordinal: function ordinal142(number, period) {
        switch (period) {
          case "W":
            return number + "\u9031";
          default:
            return number + "\u65E5";
        }
      },
      formats: {
        LT: "HH:mm",
        LTS: "HH:mm:ss",
        L: "YYYY/MM/DD",
        LL: "YYYY\u5E74M\u6708D\u65E5",
        LLL: "YYYY\u5E74M\u6708D\u65E5 HH:mm",
        LLLL: "YYYY\u5E74M\u6708D\u65E5dddd HH:mm",
        l: "YYYY/M/D",
        ll: "YYYY\u5E74M\u6708D\u65E5",
        lll: "YYYY\u5E74M\u6708D\u65E5 HH:mm",
        llll: "YYYY\u5E74M\u6708D\u65E5dddd HH:mm"
      },
      relativeTime: {
        future: "%s\u5167",
        past: "%s\u524D",
        s: "\u5E7E\u79D2",
        m: "1 \u5206\u9418",
        mm: "%d \u5206\u9418",
        h: "1 \u5C0F\u6642",
        hh: "%d \u5C0F\u6642",
        d: "1 \u5929",
        dd: "%d \u5929",
        M: "1 \u500B\u6708",
        MM: "%d \u500B\u6708",
        y: "1 \u5E74",
        yy: "%d \u5E74"
      },
      meridiem: function meridiem18(hour, minute) {
        var hm = hour * 100 + minute;
        if (hm < 600) {
          return "\u51CC\u6668";
        } else if (hm < 900) {
          return "\u65E9\u4E0A";
        } else if (hm < 1100) {
          return "\u4E0A\u5348";
        } else if (hm < 1300) {
          return "\u4E2D\u5348";
        } else if (hm < 1800) {
          return "\u4E0B\u5348";
        }
        return "\u665A\u4E0A";
      }
    };
    stdin_default2.locale(locale141, null, true);
    zh_tw_default = locale141;
  }
});

// public/codesandbox-runtime/dayjs-locale/zh.js
var zh_exports = {};
__export(zh_exports, {
  default: () => zh_default
});
var locale142, zh_default;
var init_zh = __esm({
  "public/codesandbox-runtime/dayjs-locale/zh.js"() {
    "use strict";
    init_dayjs();
    locale142 = {
      name: "zh",
      weekdays: "\u661F\u671F\u65E5_\u661F\u671F\u4E00_\u661F\u671F\u4E8C_\u661F\u671F\u4E09_\u661F\u671F\u56DB_\u661F\u671F\u4E94_\u661F\u671F\u516D".split("_"),
      weekdaysShort: "\u5468\u65E5_\u5468\u4E00_\u5468\u4E8C_\u5468\u4E09_\u5468\u56DB_\u5468\u4E94_\u5468\u516D".split("_"),
      weekdaysMin: "\u65E5_\u4E00_\u4E8C_\u4E09_\u56DB_\u4E94_\u516D".split("_"),
      months: "\u4E00\u6708_\u4E8C\u6708_\u4E09\u6708_\u56DB\u6708_\u4E94\u6708_\u516D\u6708_\u4E03\u6708_\u516B\u6708_\u4E5D\u6708_\u5341\u6708_\u5341\u4E00\u6708_\u5341\u4E8C\u6708".split("_"),
      monthsShort: "1\u6708_2\u6708_3\u6708_4\u6708_5\u6708_6\u6708_7\u6708_8\u6708_9\u6708_10\u6708_11\u6708_12\u6708".split("_"),
      ordinal: function ordinal143(number, period) {
        switch (period) {
          case "W":
            return number + "\u5468";
          default:
            return number + "\u65E5";
        }
      },
      weekStart: 1,
      yearStart: 4,
      formats: {
        LT: "HH:mm",
        LTS: "HH:mm:ss",
        L: "YYYY/MM/DD",
        LL: "YYYY\u5E74M\u6708D\u65E5",
        LLL: "YYYY\u5E74M\u6708D\u65E5Ah\u70B9mm\u5206",
        LLLL: "YYYY\u5E74M\u6708D\u65E5ddddAh\u70B9mm\u5206",
        l: "YYYY/M/D",
        ll: "YYYY\u5E74M\u6708D\u65E5",
        lll: "YYYY\u5E74M\u6708D\u65E5 HH:mm",
        llll: "YYYY\u5E74M\u6708D\u65E5dddd HH:mm"
      },
      relativeTime: {
        future: "%s\u540E",
        past: "%s\u524D",
        s: "\u51E0\u79D2",
        m: "1 \u5206\u949F",
        mm: "%d \u5206\u949F",
        h: "1 \u5C0F\u65F6",
        hh: "%d \u5C0F\u65F6",
        d: "1 \u5929",
        dd: "%d \u5929",
        M: "1 \u4E2A\u6708",
        MM: "%d \u4E2A\u6708",
        y: "1 \u5E74",
        yy: "%d \u5E74"
      },
      meridiem: function meridiem19(hour, minute) {
        var hm = hour * 100 + minute;
        if (hm < 600) {
          return "\u51CC\u6668";
        } else if (hm < 900) {
          return "\u65E9\u4E0A";
        } else if (hm < 1100) {
          return "\u4E0A\u5348";
        } else if (hm < 1300) {
          return "\u4E2D\u5348";
        } else if (hm < 1800) {
          return "\u4E0B\u5348";
        }
        return "\u665A\u4E0A";
      }
    };
    stdin_default2.locale(locale142, null, true);
    zh_default = locale142;
  }
});

// public/codesandbox-runtime/components/date-picker/src/date-picker.js
import { createCommentVNode as _createCommentVNode2, renderSlot as _renderSlot2, resolveDynamicComponent as _resolveDynamicComponent, openBlock as _openBlock5, createBlock as _createBlock, createElementVNode as _createElementVNode5, createElementBlock as _createElementBlock5, normalizeClass as _normalizeClass5, toDisplayString as _toDisplayString5, withModifiers as _withModifiers, normalizeProps as _normalizeProps, guardReactiveProps as _guardReactiveProps, withCtx as _withCtx, renderList as _renderList5, Fragment as _Fragment5, normalizeStyle as _normalizeStyle, Transition as _Transition, createVNode as _createVNode } from "vue";
import { ref as ref12, computed as computed15, watch as watch4, onMounted as onMounted3, onBeforeUnmount as onBeforeUnmount2 } from "vue";

// public/codesandbox-runtime/hooks/use-namespace/index.js
import { inject, ref, unref } from "vue";
var defaultNamespace = "yh";
var statePrefix = "is-";
var namespaceContextKey = Symbol("namespaceContextKey");
var useGlobalNamespace = () => {
  return inject(namespaceContextKey, ref(defaultNamespace));
};
var useNamespace = (block) => {
  const namespace = useGlobalNamespace();
  const b = (blockSuffix = "") => {
    const ns = unref(namespace);
    return blockSuffix ? `${ns}-${block}-${blockSuffix}` : `${ns}-${block}`;
  };
  const e = (element) => {
    return element ? `${b()}__${element}` : "";
  };
  const m2 = (modifier) => {
    return modifier ? `${b()}--${modifier}` : "";
  };
  const bem = (blockSuffix, element, modifier) => {
    let cls = b(blockSuffix);
    if (element) cls += `__${element}`;
    if (modifier) cls += `--${modifier}`;
    return cls;
  };
  const em = (element, modifier) => {
    return element && modifier ? `${b()}__${element}--${modifier}` : "";
  };
  function is(state, value) {
    if (arguments.length === 1) {
      return `${statePrefix}${state}`;
    }
    return value ? `${statePrefix}${state}` : "";
  }
  const cssVar = (name) => {
    return `--${unref(namespace)}-${block}-${name}`;
  };
  const cssVarObj = (vars) => {
    const obj = {};
    Object.entries(vars).forEach(([key, value]) => {
      obj[cssVar(key)] = value;
    });
    return obj;
  };
  const cssVarBlock = (name) => {
    return `--${unref(namespace)}-${name}`;
  };
  const cssVarBlockObj = (vars) => {
    const obj = {};
    Object.entries(vars).forEach(([key, value]) => {
      obj[cssVarBlock(key)] = value;
    });
    return obj;
  };
  return {
    namespace,
    b,
    e,
    m: m2,
    bem,
    em,
    is,
    cssVar,
    cssVarObj,
    cssVarBlock,
    cssVarBlockObj
  };
};

// public/codesandbox-runtime/hooks/use-z-index/index.js
import { computed, inject as inject2, unref as unref2 } from "vue";
var zIndexContextKey = Symbol("zIndexContextKey");
var zIndexCounterKey = Symbol("zIndexCounterKey");

// public/codesandbox-runtime/hooks/use-sku/index.js
import { ref as ref2, computed as computed2 } from "vue";

// public/codesandbox-runtime/hooks/use-countdown/index.js
import { ref as ref3, computed as computed3, onUnmounted } from "vue";

// public/codesandbox-runtime/hooks/use-locale/index.js
import { computed as computed5, unref as unref4, watch } from "vue";

// public/codesandbox-runtime/locale/lang/zh-cn.js
var zhCn = {
  name: "zh-cn",
  yh: {
    // 通用
    common: {
      yes: "\u662F",
      no: "\u5426",
      confirm: "\u786E\u8BA4",
      cancel: "\u53D6\u6D88",
      loading: "\u52A0\u8F7D\u4E2D",
      close: "\u5173\u95ED",
      clear: "\u6E05\u7A7A",
      reset: "\u91CD\u7F6E",
      save: "\u4FDD\u5B58",
      delete: "\u5220\u9664",
      edit: "\u7F16\u8F91",
      add: "\u65B0\u589E",
      search: "\u641C\u7D22",
      refresh: "\u5237\u65B0",
      expand: "\u5C55\u5F00",
      collapse: "\u6536\u8D77",
      more: "\u66F4\u591A",
      noData: "\u6682\u65E0\u6570\u636E",
      noMatch: "\u65E0\u5339\u914D\u6570\u636E",
      selectAll: "\u5168\u9009",
      unselectAll: "\u53D6\u6D88\u5168\u9009"
    },
    // 颜色选择器
    colorpicker: {
      confirm: "\u786E\u5B9A",
      clear: "\u6E05\u7A7A",
      eyeDropper: "\u5438\u8272\u5668",
      suggestionDark: "\u767D\u8272\u6587\u5B57\u6700\u4F73",
      suggestionLight: "\u9ED1\u8272\u6587\u5B57\u6700\u4F73",
      recentColors: "\u6700\u8FD1\u4F7F\u7528",
      presetColors: "\u9884\u8BBE\u989C\u8272"
    },
    // 日期选择器
    datepicker: {
      now: "\u6B64\u523B",
      today: "\u4ECA\u5929",
      cancel: "\u53D6\u6D88",
      clear: "\u6E05\u7A7A",
      confirm: "\u786E\u5B9A",
      selectDate: "\u9009\u62E9\u65E5\u671F",
      selectTime: "\u9009\u62E9\u65F6\u95F4",
      startDate: "\u5F00\u59CB\u65E5\u671F",
      startTime: "\u5F00\u59CB\u65F6\u95F4",
      endDate: "\u7ED3\u675F\u65E5\u671F",
      endTime: "\u7ED3\u675F\u65F6\u95F4",
      year: "\u5E74",
      month: "\u6708",
      day: "\u65E5",
      week: "\u5468",
      monthBeforeYear: false,
      prevYear: "\u4E0A\u4E00\u5E74",
      nextYear: "\u4E0B\u4E00\u5E74",
      prevMonth: "\u4E0A\u4E2A\u6708",
      nextMonth: "\u4E0B\u4E2A\u6708",
      weeks: {
        sun: "\u65E5",
        mon: "\u4E00",
        tue: "\u4E8C",
        wed: "\u4E09",
        thu: "\u56DB",
        fri: "\u4E94",
        sat: "\u516D"
      },
      months: {
        jan: "\u4E00\u6708",
        feb: "\u4E8C\u6708",
        mar: "\u4E09\u6708",
        apr: "\u56DB\u6708",
        may: "\u4E94\u6708",
        jun: "\u516D\u6708",
        jul: "\u4E03\u6708",
        aug: "\u516B\u6708",
        sep: "\u4E5D\u6708",
        oct: "\u5341\u6708",
        nov: "\u5341\u4E00\u6708",
        dec: "\u5341\u4E8C\u6708"
      },
      quarters: {
        q1: "\u7B2C\u4E00\u5B63\u5EA6",
        q2: "\u7B2C\u4E8C\u5B63\u5EA6",
        q3: "\u7B2C\u4E09\u5B63\u5EA6",
        q4: "\u7B2C\u56DB\u5B63\u5EA6"
      }
    },
    // 时间选择器
    timepicker: {
      confirm: "\u786E\u5B9A",
      cancel: "\u53D6\u6D88",
      now: "\u6B64\u523B",
      placeholder: "\u9009\u62E9\u65F6\u95F4",
      startPlaceholder: "\u5F00\u59CB\u65F6\u95F4",
      endPlaceholder: "\u7ED3\u675F\u65F6\u95F4",
      selectTime: "\u9009\u62E9\u65F6\u95F4"
    },
    // 时间选择
    timeselect: {
      placeholder: "\u9009\u62E9\u65F6\u95F4"
    },
    // 树
    tree: {
      emptyText: "\u6682\u65E0\u6570\u636E",
      loading: "\u52A0\u8F7D\u4E2D...",
      checkAll: "\u5168\u9009",
      uncheckAll: "\u53D6\u6D88\u5168\u9009",
      expandAll: "\u5C55\u5F00\u5168\u90E8",
      collapseAll: "\u6536\u8D77\u5168\u90E8"
    },
    // 树选择
    treeselect: {
      placeholder: "\u8BF7\u9009\u62E9",
      emptyText: "\u6682\u65E0\u6570\u636E",
      loading: "\u52A0\u8F7D\u4E2D...",
      noMatch: "\u65E0\u5339\u914D\u6570\u636E"
    },
    // 日历
    calendar: {
      prevMonth: "\u4E0A\u4E2A\u6708",
      nextMonth: "\u4E0B\u4E2A\u6708",
      prevYear: "\u4E0A\u4E00\u5E74",
      nextYear: "\u4E0B\u4E00\u5E74",
      today: "\u4ECA\u5929",
      week: "\u5468",
      holiday: "\u4F11",
      workday: "\u73ED",
      monthHeaderFormat: "YYYY\u5E74M\u6708",
      weeks: {
        sun: "\u65E5",
        mon: "\u4E00",
        tue: "\u4E8C",
        wed: "\u4E09",
        thu: "\u56DB",
        fri: "\u4E94",
        sat: "\u516D"
      }
    },
    // 自动完成
    autocomplete: {
      loading: "\u52A0\u8F7D\u4E2D...",
      placeholder: "\u8BF7\u8F93\u5165",
      noData: "\u6682\u65E0\u6570\u636E",
      noMatch: "\u65E0\u5339\u914D\u6570\u636E"
    },
    // 倒计时
    countdown: {
      days: "\u5929",
      hours: "\u65F6",
      minutes: "\u5206",
      seconds: "\u79D2",
      milliseconds: "\u6BEB\u79D2",
      finished: "\u5DF2\u7ED3\u675F"
    },
    // 级联选择
    cascader: {
      noMatch: "\u65E0\u5339\u914D\u6570\u636E",
      placeholder: "\u8BF7\u9009\u62E9",
      loading: "\u52A0\u8F7D\u4E2D...",
      noData: "\u6682\u65E0\u6570\u636E"
    },
    // 穿梭框
    transfer: {
      noMatch: "\u65E0\u5339\u914D\u6570\u636E",
      noData: "\u65E0\u6570\u636E",
      titles: ["\u5217\u8868 1", "\u5217\u8868 2"],
      filterPlaceholder: "\u8BF7\u8F93\u5165\u641C\u7D22\u5185\u5BB9",
      noCheckedFormat: "\u5171 {total} \u9879",
      hasCheckedFormat: "\u5DF2\u9009 {checked}/{total} \u9879",
      searchPlaceholder: "\u8BF7\u8F93\u5165\u5173\u952E\u8BCD"
    },
    // 表格
    table: {
      emptyText: "\u6682\u65E0\u6570\u636E",
      confirmFilter: "\u7B5B\u9009",
      resetFilter: "\u91CD\u7F6E",
      clearFilter: "\u5168\u90E8",
      sumText: "\u5408\u8BA1",
      loading: "\u6B63\u5728\u52A0\u8F7D...",
      index: "\u5E8F\u53F7",
      print: "\u6253 \u5370",
      cancel: "\u53D6 \u6D88",
      preview: "\u6253\u5370\u9884\u89C8",
      printTime: "\u6253\u5370\u65F6\u95F4",
      total: "\u5171 {total} \u6761",
      page: "\u7B2C {page} \u9875",
      yes: "\u662F",
      no: "\u5426",
      // 工具栏
      toolbar: {
        refresh: "\u5237\u65B0",
        density: "\u5BC6\u5EA6",
        densityDefault: "\u9ED8\u8BA4",
        densityLarge: "\u5BBD\u677E",
        densitySmall: "\u7D27\u51D1",
        columnSetting: "\u5217\u8BBE\u7F6E",
        fullscreen: "\u5168\u5C4F",
        exitFullscreen: "\u9000\u51FA\u5168\u5C4F",
        export: "\u5BFC\u51FA",
        import: "\u5BFC\u5165",
        search: "\u641C\u7D22",
        searchPlaceholder: "\u8BF7\u8F93\u5165\u5173\u952E\u8BCD\u641C\u7D22"
      },
      // 筛选
      filter: {
        selectAll: "\u5168\u9009",
        selectInvert: "\u53CD\u9009",
        empty: "\u4E3A\u7A7A",
        notEmpty: "\u4E0D\u4E3A\u7A7A",
        contains: "\u5305\u542B",
        notContains: "\u4E0D\u5305\u542B",
        equals: "\u7B49\u4E8E",
        notEquals: "\u4E0D\u7B49\u4E8E",
        startsWith: "\u5F00\u5934\u662F",
        endsWith: "\u7ED3\u5C3E\u662F",
        greaterThan: "\u5927\u4E8E",
        lessThan: "\u5C0F\u4E8E",
        between: "\u4ECB\u4E8E"
      },
      // 排序
      sort: {
        asc: "\u5347\u5E8F",
        desc: "\u964D\u5E8F",
        clear: "\u53D6\u6D88\u6392\u5E8F"
      },
      // 导出
      export: {
        title: "\u5BFC\u51FA\u6570\u636E",
        filename: "\u6587\u4EF6\u540D",
        type: "\u6587\u4EF6\u7C7B\u578B",
        scope: "\u5BFC\u51FA\u8303\u56F4",
        scopeAll: "\u5168\u90E8\u6570\u636E",
        scopeSelected: "\u9009\u4E2D\u6570\u636E",
        scopeCurrentPage: "\u5F53\u524D\u9875\u6570\u636E",
        includeHeader: "\u5305\u542B\u8868\u5934",
        exporting: "\u6B63\u5728\u5BFC\u51FA...",
        success: "\u5BFC\u51FA\u6210\u529F",
        error: "\u5BFC\u51FA\u5931\u8D25"
      },
      // 导入
      import: {
        title: "\u5BFC\u5165\u6570\u636E",
        selectFile: "\u9009\u62E9\u6587\u4EF6",
        dragTip: "\u70B9\u51FB\u6216\u62D6\u62FD\u6587\u4EF6\u5230\u6B64\u5904\u4E0A\u4F20",
        importing: "\u6B63\u5728\u5BFC\u5165...",
        success: "\u5BFC\u5165\u6210\u529F",
        error: "\u5BFC\u5165\u5931\u8D25",
        preview: "\u6570\u636E\u9884\u89C8",
        confirm: "\u786E\u8BA4\u5BFC\u5165"
      },
      // 打印
      printConfig: {
        title: "\u6253\u5370\u8BBE\u7F6E",
        pageTitle: "\u9875\u9762\u6807\u9898",
        pageHeader: "\u9875\u7709",
        pageFooter: "\u9875\u811A",
        printAll: "\u6253\u5370\u5168\u90E8",
        printSelected: "\u6253\u5370\u9009\u4E2D",
        printCurrentPage: "\u6253\u5370\u5F53\u524D\u9875",
        landscape: "\u6A2A\u5411",
        portrait: "\u7EB5\u5411",
        printing: "\u6B63\u5728\u6253\u5370..."
      },
      // 列设置
      columnSetting: {
        title: "\u5217\u8BBE\u7F6E",
        showAll: "\u663E\u793A\u5168\u90E8",
        hideAll: "\u9690\u85CF\u5168\u90E8",
        reset: "\u91CD\u7F6E",
        fixedLeft: "\u56FA\u5B9A\u5728\u5DE6\u4FA7",
        fixedRight: "\u56FA\u5B9A\u5728\u53F3\u4FA7",
        unfixed: "\u53D6\u6D88\u56FA\u5B9A"
      },
      // 右键菜单
      contextMenu: {
        copy: "\u590D\u5236",
        copyRow: "\u590D\u5236\u884C",
        copyCell: "\u590D\u5236\u5355\u5143\u683C",
        paste: "\u7C98\u8D34",
        insertRowAbove: "\u5728\u4E0A\u65B9\u63D2\u5165\u884C",
        insertRowBelow: "\u5728\u4E0B\u65B9\u63D2\u5165\u884C",
        deleteRow: "\u5220\u9664\u884C",
        deleteSelectedRows: "\u5220\u9664\u9009\u4E2D\u884C",
        exportSelected: "\u5BFC\u51FA\u9009\u4E2D\u6570\u636E"
      },
      // 选择
      selection: {
        selectAll: "\u5168\u9009",
        selectInvert: "\u53CD\u9009",
        selectNone: "\u53D6\u6D88\u9009\u62E9",
        selected: "\u5DF2\u9009\u62E9 {count} \u9879"
      },
      // 展开
      expand: {
        expandAll: "\u5C55\u5F00\u5168\u90E8",
        collapseAll: "\u6536\u8D77\u5168\u90E8"
      },
      // 树形
      tree: {
        expandAll: "\u5C55\u5F00\u5168\u90E8",
        collapseAll: "\u6536\u8D77\u5168\u90E8",
        expandLevel: "\u5C55\u5F00\u5230\u7B2C {level} \u5C42"
      },
      // 拖拽
      drag: {
        dragTip: "\u62D6\u62FD\u4EE5\u8C03\u6574\u987A\u5E8F",
        dropTip: "\u91CA\u653E\u4EE5\u653E\u7F6E"
      }
    },
    // 消息框
    messagebox: {
      title: "\u63D0\u793A",
      confirm: "\u786E\u5B9A",
      cancel: "\u53D6\u6D88",
      close: "\u5173\u95ED",
      error: "\u8F93\u5165\u7684\u6570\u636E\u4E0D\u5408\u6CD5!",
      alert: "\u8B66\u544A",
      prompt: "\u8BF7\u8F93\u5165",
      inputPlaceholder: "\u8BF7\u8F93\u5165\u5185\u5BB9"
    },
    // 上传
    upload: {
      deleteTip: "\u6309 delete \u952E\u53EF\u5220\u9664",
      delete: "\u5220\u9664",
      preview: "\u67E5\u770B\u56FE\u7247",
      continue: "\u7EE7\u7EED\u4E0A\u4F20",
      upload: "\u70B9\u51FB\u4E0A\u4F20",
      tip: "\u70B9\u51FB\u6216\u62D6\u62FD\u6587\u4EF6\u5230\u6B64\u5904<em>\u4E0A\u4F20</em>",
      dragTip: "\u5C06\u6587\u4EF6\u62D6\u5230\u6B64\u5904\uFF0C\u6216\u70B9\u51FB\u4E0A\u4F20",
      uploading: "\u4E0A\u4F20\u4E2D...",
      success: "\u4E0A\u4F20\u6210\u529F",
      error: "\u4E0A\u4F20\u5931\u8D25",
      retry: "\u91CD\u65B0\u4E0A\u4F20",
      cancel: "\u53D6\u6D88\u4E0A\u4F20",
      fileTypeError: "\u6587\u4EF6\u7C7B\u578B\u4E0D\u652F\u6301",
      fileSizeError: "\u6587\u4EF6\u5927\u5C0F\u8D85\u51FA\u9650\u5236",
      fileCountError: "\u6587\u4EF6\u6570\u91CF\u8D85\u51FA\u9650\u5236"
    },
    // 表单
    form: {
      validationFailed: "\u6821\u9A8C\u5931\u8D25",
      required: "\u5FC5\u586B\u9879",
      pleaseInput: "\u8BF7\u8F93\u5165",
      pleaseSelect: "\u8BF7\u9009\u62E9"
    },
    // 按钮
    button: {
      loading: "\u52A0\u8F7D\u4E2D..."
    },
    // 输入框
    input: {
      placeholder: "\u8BF7\u8F93\u5165\u5185\u5BB9",
      clear: "\u6E05\u7A7A",
      showPassword: "\u663E\u793A\u5BC6\u7801",
      hidePassword: "\u9690\u85CF\u5BC6\u7801",
      copy: "\u590D\u5236",
      copied: "\u5DF2\u590D\u5236"
    },
    // 数字输入框
    inputnumber: {
      placeholder: "\u8BF7\u8F93\u5165\u6570\u5B57",
      increase: "\u589E\u52A0",
      decrease: "\u51CF\u5C11"
    },
    // 标签输入
    inputtag: {
      placeholder: "\u8BF7\u8F93\u5165",
      add: "\u6DFB\u52A0",
      remove: "\u79FB\u9664"
    },
    // 面包屑
    breadcrumb: {
      label: "\u9762\u5305\u5C51",
      more: "\u66F4\u591A"
    },
    // 返回顶部
    backtop: {
      text: "\u56DE\u5230\u9876\u90E8"
    },
    // 选择器
    select: {
      placeholder: "\u8BF7\u9009\u62E9",
      noData: "\u6682\u65E0\u6570\u636E",
      loading: "\u52A0\u8F7D\u4E2D...",
      noMatch: "\u65E0\u5339\u914D\u6570\u636E",
      selectAll: "\u5168\u9009",
      clearAll: "\u6E05\u7A7A"
    },
    // 分页
    pagination: {
      goto: "\u524D\u5F80",
      page: "\u9875",
      total: "\u5171 {total} \u6761",
      pageSize: "\u6761/\u9875",
      prev: "\u4E0A\u4E00\u9875",
      next: "\u4E0B\u4E00\u9875",
      first: "\u9996\u9875",
      last: "\u672B\u9875",
      pageClassifier: "\u9875"
    },
    // 气泡确认
    popconfirm: {
      confirm: "\u786E\u5B9A",
      cancel: "\u53D6\u6D88",
      dontAskAgain: "\u4E0D\u518D\u63D0\u793A"
    },
    // 对话框
    dialog: {
      confirm: "\u786E\u5B9A",
      cancel: "\u53D6\u6D88",
      close: "\u5173\u95ED",
      maximize: "\u6700\u5927\u5316",
      restore: "\u8FD8\u539F"
    },
    // 抽屉
    drawer: {
      close: "\u5173\u95ED",
      confirm: "\u786E\u5B9A",
      cancel: "\u53D6\u6D88"
    },
    // 下拉菜单
    dropdown: {
      loading: "\u52A0\u8F7D\u4E2D..."
    },
    // 图片
    image: {
      error: "\u52A0\u8F7D\u5931\u8D25",
      loading: "\u52A0\u8F7D\u4E2D...",
      preview: "\u9884\u89C8",
      zoomIn: "\u653E\u5927",
      zoomOut: "\u7F29\u5C0F",
      rotateLeft: "\u5411\u5DE6\u65CB\u8F6C",
      rotateRight: "\u5411\u53F3\u65CB\u8F6C",
      originalSize: "\u539F\u59CB\u5927\u5C0F",
      fullscreen: "\u5168\u5C4F"
    },
    // 图片预览
    imageviewer: {
      close: "\u5173\u95ED",
      prev: "\u4E0A\u4E00\u5F20",
      next: "\u4E0B\u4E00\u5F20",
      zoomIn: "\u653E\u5927",
      zoomOut: "\u7F29\u5C0F",
      rotateLeft: "\u5411\u5DE6\u65CB\u8F6C",
      rotateRight: "\u5411\u53F3\u65CB\u8F6C",
      reset: "\u91CD\u7F6E",
      fullscreen: "\u5168\u5C4F",
      exitFullscreen: "\u9000\u51FA\u5168\u5C4F"
    },
    // 无限滚动
    infinitescroll: {
      loading: "\u52A0\u8F7D\u4E2D...",
      finished: "\u6CA1\u6709\u66F4\u591A\u4E86",
      error: "\u52A0\u8F7D\u5931\u8D25\uFF0C\u70B9\u51FB\u91CD\u8BD5",
      retry: "\u70B9\u51FB\u91CD\u8BD5"
    },
    // 消息
    message: {
      close: "\u5173\u95ED"
    },
    // 通知
    notification: {
      close: "\u5173\u95ED"
    },
    // 加载
    loading: {
      text: "\u52A0\u8F7D\u4E2D..."
    },
    // 加载中
    spin: {
      text: "\u52A0\u8F7D\u4E2D..."
    },
    // 评分
    rate: {
      texts: ["\u6781\u5DEE", "\u5931\u671B", "\u4E00\u822C", "\u6EE1\u610F", "\u60CA\u559C"]
    },
    // 警告
    alert: {
      close: "\u5173\u95ED"
    },
    // 标签
    tag: {
      close: "\u5173\u95ED"
    },
    // 标签页
    tabs: {
      close: "\u5173\u95ED",
      add: "\u65B0\u589E",
      more: "\u66F4\u591A"
    },
    // 步骤条
    steps: {
      finish: "\u5DF2\u5B8C\u6210",
      process: "\u8FDB\u884C\u4E2D",
      wait: "\u7B49\u5F85\u4E2D",
      error: "\u9519\u8BEF"
    },
    // 进度条
    progress: {
      success: "\u6210\u529F",
      exception: "\u5F02\u5E38",
      warning: "\u8B66\u544A"
    },
    // 骨架屏
    skeleton: {
      loading: "\u52A0\u8F7D\u4E2D..."
    },
    // 空状态
    empty: {
      description: "\u6682\u65E0\u6570\u636E",
      noData: "\u6682\u65E0\u6570\u636E",
      noResult: "\u6682\u65E0\u7ED3\u679C",
      networkError: "\u7F51\u7EDC\u9519\u8BEF",
      serverError: "\u670D\u52A1\u5668\u9519\u8BEF"
    },
    // 结果
    result: {
      success: "\u64CD\u4F5C\u6210\u529F",
      error: "\u64CD\u4F5C\u5931\u8D25",
      warning: "\u8B66\u544A",
      info: "\u63D0\u793A",
      backHome: "\u8FD4\u56DE\u9996\u9875"
    },
    // 瀑布流
    waterfall: {
      loading: "\u52A0\u8F7D\u4E2D...",
      noMore: "\u6CA1\u6709\u66F4\u591A\u4E86",
      empty: "\u6682\u65E0\u6570\u636E"
    },
    // 描述列表
    descriptions: {
      colon: "\uFF1A"
    },
    // 滑块
    slider: {
      tipFormatter: "{value}"
    },
    // 开关
    switch: {
      on: "\u5F00",
      off: "\u5173"
    },
    // 复选框
    checkbox: {
      selectAll: "\u5168\u9009"
    },
    // 单选框
    radio: {},
    // 菜单
    menu: {
      collapse: "\u6536\u8D77\u83DC\u5355",
      expand: "\u5C55\u5F00\u83DC\u5355"
    },
    // 卡片
    card: {
      collapse: "\u6536\u8D77",
      expand: "\u5C55\u5F00"
    },
    // 折叠面板
    collapse: {
      expand: "\u5C55\u5F00",
      collapse: "\u6536\u8D77"
    },
    // 工具提示
    tooltip: {},
    // 气泡卡片
    popover: {},
    // 徽标
    badge: {},
    // 头像
    avatar: {
      error: "\u52A0\u8F7D\u5931\u8D25"
    },
    // 水印
    watermark: {},
    // 分割线
    divider: {},
    // 走马灯
    carousel: {
      prev: "\u4E0A\u4E00\u5F20",
      next: "\u4E0B\u4E00\u5F20"
    },
    // 跑马灯
    marquee: {},
    // 固钉
    affix: {},
    // 流程图
    flow: {
      zoomIn: "\u653E\u5927\u753B\u5E03",
      zoomOut: "\u7F29\u5C0F\u753B\u5E03",
      fitView: "\u81EA\u9002\u5E94\u89C6\u56FE",
      lock: "\u9501\u5B9A/\u89E3\u9501\u753B\u5E03"
    },
    // 锚点
    anchor: {},
    // 提及
    mention: {
      placeholder: "\u8BF7\u8F93\u5165",
      loading: "\u52A0\u8F7D\u4E2D...",
      noData: "\u6682\u65E0\u6570\u636E"
    },
    // SKU 选择器
    skuselector: {
      placeholder: "\u8BF7\u9009\u62E9\u89C4\u683C",
      emptyText: "\u6682\u65E0\u89C4\u683C",
      stock: "\u5E93\u5B58",
      price: "\u4EF7\u683C",
      selected: "\u5DF2\u9009",
      outOfStock: "\u6682\u65F6\u65E0\u8D27"
    },
    // 商品卡片
    productcard: {
      viewDetails: "\u67E5\u770B\u8BE6\u60C5",
      buyNow: "\u7ACB\u5373\u8D2D\u4E70",
      addToCart: "\u52A0\u5165\u8D2D\u7269\u8F66",
      sold: "\u5DF2\u552E",
      soldOut: "\u552E\u7F44",
      vip: "\u4F1A\u5458"
    },
    // 价格
    price: {
      original: "\u539F\u4EF7"
    },
    // 优惠券
    couponcard: {
      available: "\u70B9\u51FB\u9886\u53D6",
      used: "\u5DF2\u4F7F\u7528",
      expired: "\u5DF2\u8FC7\u671F",
      received: "\u5DF2\u9886\u53D6",
      limit: "\u6EE1 {threshold} \u5143\u53EF\u7528",
      noThreshold: "\u65E0\u95E8\u69DB",
      validPeriod: "\u6709\u6548\u671F",
      ruleTitle: "\u4F7F\u7528\u8BF4\u660E\u53CA\u89C4\u5219"
    },
    // 幸运抽奖
    luckydraw: {
      start: "\u5F00\u59CB\u62BD\u5956",
      drawing: "\u62BD\u5956\u4E2D...",
      end: "\u4E2D\u5956\u4E86",
      retry: "\u518D\u8BD5\u4E00\u6B21"
    },
    // 筛选排序栏
    filterbar: {
      all: "\u5168\u90E8",
      sort: "\u6392\u5E8F",
      filter: "\u7B5B\u9009",
      cancel: "\u53D6\u6D88",
      reset: "\u91CD\u7F6E",
      confirm: "\u786E\u5B9A",
      noOptions: "\u6682\u65E0\u7B5B\u9009\u9879",
      asc: "\u5347\u5E8F",
      desc: "\u964D\u5E8F",
      selected: "\u5DF2\u9009"
    },
    // 结算栏
    submitbar: {
      total: "\u5C0F\u8BA1\uFF1A",
      selected: "\u5DF2\u9009 {count} \u4EF6",
      submit: "\u53BB\u7ED3\u7B97",
      allSelect: "\u5168\u9009"
    },
    // 品类导航
    categorynav: {
      all: "\u5168\u90E8",
      noData: "\u6682\u65E0\u6570\u636E",
      loading: "\u52A0\u8F7D\u4E2D..."
    },
    // 智能地址
    smartaddress: {
      placeholder: "\u8BF7\u7C98\u8D34\u6536\u8D27\u5730\u5740\uFF0C\u81EA\u52A8\u8BC6\u522B\u59D3\u540D\u3001\u624B\u673A\u53F7\u3001\u5730\u5740",
      parse: "\u667A\u80FD\u8BC6\u522B",
      province: "\u7701/\u5E02/\u533A",
      city: "\u5E02",
      district: "\u533A/\u53BF",
      street: "\u8857\u9053/\u9547",
      detail: "\u8BE6\u7EC6\u5730\u5740",
      phone: "\u624B\u673A\u53F7",
      name: "\u6536\u8D27\u4EBA",
      parseSuccess: "\u5730\u5740\u8BC6\u522B\u6210\u529F",
      parseFailed: "\u672A\u80FD\u8BC6\u522B\uFF0C\u8BF7\u624B\u52A8\u586B\u5199",
      required: "\u8BF7\u586B\u5199\u5B8C\u6574\u5730\u5740",
      provinceKeywords: ["\u7701", "\u81EA\u6CBB\u533A", "\u7279\u522B\u884C\u653F\u533A"],
      cityKeywords: ["\u5E02", "\u5DDE", "\u76DF"],
      districtKeywords: ["\u533A", "\u53BF", "\u65D7", "\u9547", "\u5E02"],
      streetKeywords: ["\u8857\u9053", "\u9547", "\u4E61", "\u6751"]
    },
    // AI 组件
    ai: {
      bubble: {
        citations: "\u53C2\u8003\u5F15\u7528"
      },
      mention: {
        placeholder: "@ \u547C\u53EB Agent\u3001\u6587\u6863\u6216\u8868\u683C...",
        agent: "\u667A\u80FD\u4F53",
        document: "\u6587\u6863",
        table: "\u8868\u683C",
        knowledge: "\u77E5\u8BC6\u5E93"
      },
      codeBlock: {
        copyCode: "\u590D\u5236\u4EE3\u7801",
        copied: "\u5DF2\u590D\u5236\uFF01",
        run: "\u8FD0\u884C\u4EE3\u7801",
        edit: "\u7F16\u8F91",
        save: "\u4FDD\u5B58",
        cancel: "\u53D6\u6D88"
      },
      codeRunner: {
        run: "\u8FD0\u884C",
        stop: "\u505C\u6B62",
        clear: "\u6E05\u7A7A",
        reset: "\u91CD\u7F6E",
        placeholder: "\u70B9\u51FB\u8FD0\u884C\u6309\u94AE\u6267\u884C\u4EE3\u7801..."
      },
      sender: {
        placeholder: "\u53D1\u9001\u6D88\u606F...",
        dragTip: "\u91CA\u653E\u9F20\u6807\u4EE5\u4E0A\u4F20\u6587\u4EF6"
      },
      thoughtChain: {
        thoughtProcess: "\u601D\u8003\u8FC7\u7A0B",
        thinking: "\u601D\u8003\u4E2D...",
        defaultTitle: "\u65B0\u6B65\u9AA4",
        addNode: "\u6DFB\u52A0\u8282\u70B9"
      },
      thinking: {
        start: "\u5F00\u59CB\u601D\u8003",
        thinking: "\u601D\u8003\u4E2D...",
        complete: "\u5DF2\u5B8C\u6210\u601D\u8003",
        error: "\u601D\u8003\u51FA\u9519\u4E86"
      },
      welcome: {
        title: "\u4F60\u597D\uFF0C\u6211\u662F YH AI",
        description: "\u6211\u53EF\u4EE5\u5E2E\u4F60\u5199\u4EE3\u7801\u3001\u7FFB\u8BD1\u6587\u6863\u6216\u8FDB\u884C\u521B\u610F\u5199\u4F5C\u3002\u4ECA\u5929\u6211\u80FD\u4E3A\u4F60\u505A\u70B9\u4EC0\u4E48\uFF1F"
      },
      action: {
        copy: "\u590D\u5236",
        regenerate: "\u91CD\u65B0\u751F\u6210",
        share: "\u5206\u4EAB",
        like: "\u8D5E\u540C",
        dislike: "\u53CD\u5BF9",
        edit: "\u7F16\u8F91",
        delete: "\u5220\u9664"
      },
      artifacts: {
        preview: "\u9884\u89C8",
        inline: "\u884C\u5185",
        code: "\u6E90\u7801",
        versions: "\u7248\u672C\u5386\u53F2",
        rendering: "\u6B63\u5728\u6E32\u67D3\u7EC4\u4EF6...",
        renderingChart: "\u6B63\u5728\u6E32\u67D3\u56FE\u8868...",
        renderingCanvas: "\u6B63\u5728\u51C6\u5907\u753B\u677F..."
      },
      voice: {
        trigger: "\u70B9\u51FB\u8BF4\u8BDD",
        listening: "\u8046\u542C\u4E2D..."
      },
      // AiAgentCard
      agent: {
        uses: "\u6B21\u8C03\u7528",
        use: "\u7ACB\u5373\u4F7F\u7528",
        favorite: "\u6536\u85CF",
        unfavorite: "\u53D6\u6D88\u6536\u85CF",
        share: "\u5206\u4EAB",
        online: "\u5728\u7EBF",
        offline: "\u79BB\u7EBF",
        busy: "\u5FD9\u788C",
        verified: "\u5B98\u65B9\u8BA4\u8BC1",
        rating: "\u8BC4\u5206",
        reviews: "\u6761\u8BC4\u4EF7",
        responseTime: "\u54CD\u5E94\u65F6\u95F4",
        ms: "ms"
      },
      // AiSources
      sources: {
        references: "\u53C2\u8003\u6765\u6E90",
        referencedSources: "\u5F15\u7528\u6765\u6E90",
        relevant: "\u76F8\u5173\u5EA6",
        viewOriginal: "\u67E5\u770B\u539F\u6587",
        showAll: "\u663E\u793A\u5168\u90E8",
        more: "\u66F4\u591A\u6765\u6E90",
        drawerTitle: "\u53C2\u8003\u6765\u6E90",
        expandMore: "\u5C55\u5F00\u66F4\u591A",
        collapseMore: "\u6536\u8D77",
        noSources: "\u6682\u65E0\u6765\u6E90",
        today: "\u4ECA\u5929",
        last7Days: "\u6700\u8FD1 7 \u5929",
        last30Days: "\u6700\u8FD1 30 \u5929",
        earlier: "\u66F4\u65E9",
        pinned: "\u5DF2\u7F6E\u9876"
      },
      // AiConversations groups
      conversations: {
        today: "\u4ECA\u5929",
        last7Days: "\u6700\u8FD1 7 \u5929",
        last30Days: "\u6700\u8FD1 30 \u5929",
        earlier: "\u66F4\u65E9",
        pinned: "\u7F6E\u9876",
        pin: "\u7F6E\u9876",
        unpin: "\u53D6\u6D88\u7F6E\u9876",
        newConversation: "\u65B0\u5EFA\u5BF9\u8BDD",
        noData: "\u6682\u65E0\u5BF9\u8BDD\u8BB0\u5F55",
        rename: "\u91CD\u547D\u540D",
        delete: "\u5220\u9664",
        deleteConfirm: "\u786E\u8BA4\u5220\u9664\u6B64\u5BF9\u8BDD\uFF1F"
      },
      // AiAttachments
      attachments: {
        dropTip: "\u91CA\u653E\u9F20\u6807\u4EE5\u4E0A\u4F20\u6587\u4EF6",
        clickToUpload: "\u70B9\u51FB\u6216\u62D6\u62FD\u6587\u4EF6\u5230\u6B64\u5904\u4E0A\u4F20",
        uploadSuccess: "\u4E0A\u4F20\u6210\u529F",
        uploadError: "\u4E0A\u4F20\u5931\u8D25",
        deleteConfirm: "\u786E\u5B9A\u5220\u9664\u6B64\u6587\u4EF6\uFF1F",
        fileTooLarge: "\u6587\u4EF6\u5927\u5C0F\u4E0D\u80FD\u8D85\u8FC7 {size}",
        invalidFileType: "\u4E0D\u652F\u6301\u7684\u6587\u4EF6\u7C7B\u578B"
      },
      // AiMermaid
      mermaid: {
        image: "\u56FE\u7247",
        code: "\u4EE3\u7801",
        zoomIn: "\u653E\u5927",
        zoomOut: "\u7F29\u5C0F",
        reset: "\u91CD\u7F6E",
        download: "\u4E0B\u8F7D",
        copyCode: "\u590D\u5236\u4EE3\u7801",
        rendering: "\u6B63\u5728\u6E32\u67D3...",
        renderError: "\u6E32\u67D3\u5931\u8D25",
        renderSuccess: "\u6E32\u67D3\u6210\u529F",
        retry: "\u91CD\u8BD5"
      }
    }
  }
};

// public/codesandbox-runtime/locale/lang/en.js
var en = {
  name: "en",
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
      monthBeforeYear: true,
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
};

// public/codesandbox-runtime/hooks/use-config/index.js
import { inject as inject3, computed as computed4, unref as unref3 } from "vue";
var configProviderContextKey = Symbol(
  "configProviderContextKey"
);
var useConfig = () => {
  const configRef = inject3(configProviderContextKey, null);
  const globalSize = computed4(() => {
    const config = unref3(configRef);
    return (config == null ? void 0 : config.size) || "default";
  });
  const globalZIndex = computed4(() => {
    const config = unref3(configRef);
    return (config == null ? void 0 : config.zIndex) || 2e3;
  });
  const globalLocale = computed4(() => {
    const config = unref3(configRef);
    return config == null ? void 0 : config.locale;
  });
  return {
    config: configRef,
    globalSize,
    globalZIndex,
    globalLocale
  };
};

// public/codesandbox-runtime/hooks/dayjs.js
import * as dayjsModule from "dayjs";
var _a;
var dayjs = "default" in dayjsModule ? (_a = dayjsModule.default) != null ? _a : dayjsModule : dayjsModule;
var stdin_default = dayjs;

// import("../../dayjs-locale/**/*.js") in public/codesandbox-runtime/hooks/use-locale/dayjs-locale.js
var globImport_dayjs_locale_js = __glob({
  "../../dayjs-locale/af.js": () => Promise.resolve().then(() => (init_af(), af_exports)),
  "../../dayjs-locale/am.js": () => Promise.resolve().then(() => (init_am(), am_exports)),
  "../../dayjs-locale/ar-dz.js": () => Promise.resolve().then(() => (init_ar_dz(), ar_dz_exports)),
  "../../dayjs-locale/ar-iq.js": () => Promise.resolve().then(() => (init_ar_iq(), ar_iq_exports)),
  "../../dayjs-locale/ar-kw.js": () => Promise.resolve().then(() => (init_ar_kw(), ar_kw_exports)),
  "../../dayjs-locale/ar-ly.js": () => Promise.resolve().then(() => (init_ar_ly(), ar_ly_exports)),
  "../../dayjs-locale/ar-ma.js": () => Promise.resolve().then(() => (init_ar_ma(), ar_ma_exports)),
  "../../dayjs-locale/ar-sa.js": () => Promise.resolve().then(() => (init_ar_sa(), ar_sa_exports)),
  "../../dayjs-locale/ar-tn.js": () => Promise.resolve().then(() => (init_ar_tn(), ar_tn_exports)),
  "../../dayjs-locale/ar.js": () => Promise.resolve().then(() => (init_ar(), ar_exports)),
  "../../dayjs-locale/az.js": () => Promise.resolve().then(() => (init_az(), az_exports)),
  "../../dayjs-locale/be.js": () => Promise.resolve().then(() => (init_be(), be_exports)),
  "../../dayjs-locale/bg.js": () => Promise.resolve().then(() => (init_bg(), bg_exports)),
  "../../dayjs-locale/bi.js": () => Promise.resolve().then(() => (init_bi(), bi_exports)),
  "../../dayjs-locale/bm.js": () => Promise.resolve().then(() => (init_bm(), bm_exports)),
  "../../dayjs-locale/bn-bd.js": () => Promise.resolve().then(() => (init_bn_bd(), bn_bd_exports)),
  "../../dayjs-locale/bn.js": () => Promise.resolve().then(() => (init_bn(), bn_exports)),
  "../../dayjs-locale/bo.js": () => Promise.resolve().then(() => (init_bo(), bo_exports)),
  "../../dayjs-locale/br.js": () => Promise.resolve().then(() => (init_br(), br_exports)),
  "../../dayjs-locale/bs.js": () => Promise.resolve().then(() => (init_bs(), bs_exports)),
  "../../dayjs-locale/ca.js": () => Promise.resolve().then(() => (init_ca(), ca_exports)),
  "../../dayjs-locale/cs.js": () => Promise.resolve().then(() => (init_cs(), cs_exports)),
  "../../dayjs-locale/cv.js": () => Promise.resolve().then(() => (init_cv(), cv_exports)),
  "../../dayjs-locale/cy.js": () => Promise.resolve().then(() => (init_cy(), cy_exports)),
  "../../dayjs-locale/da.js": () => Promise.resolve().then(() => (init_da(), da_exports)),
  "../../dayjs-locale/de-at.js": () => Promise.resolve().then(() => (init_de_at(), de_at_exports)),
  "../../dayjs-locale/de-ch.js": () => Promise.resolve().then(() => (init_de_ch(), de_ch_exports)),
  "../../dayjs-locale/de.js": () => Promise.resolve().then(() => (init_de(), de_exports)),
  "../../dayjs-locale/dv.js": () => Promise.resolve().then(() => (init_dv(), dv_exports)),
  "../../dayjs-locale/el.js": () => Promise.resolve().then(() => (init_el(), el_exports)),
  "../../dayjs-locale/en-au.js": () => Promise.resolve().then(() => (init_en_au(), en_au_exports)),
  "../../dayjs-locale/en-ca.js": () => Promise.resolve().then(() => (init_en_ca(), en_ca_exports)),
  "../../dayjs-locale/en-gb.js": () => Promise.resolve().then(() => (init_en_gb(), en_gb_exports)),
  "../../dayjs-locale/en-ie.js": () => Promise.resolve().then(() => (init_en_ie(), en_ie_exports)),
  "../../dayjs-locale/en-il.js": () => Promise.resolve().then(() => (init_en_il(), en_il_exports)),
  "../../dayjs-locale/en-in.js": () => Promise.resolve().then(() => (init_en_in(), en_in_exports)),
  "../../dayjs-locale/en-nz.js": () => Promise.resolve().then(() => (init_en_nz(), en_nz_exports)),
  "../../dayjs-locale/en-sg.js": () => Promise.resolve().then(() => (init_en_sg(), en_sg_exports)),
  "../../dayjs-locale/en-tt.js": () => Promise.resolve().then(() => (init_en_tt(), en_tt_exports)),
  "../../dayjs-locale/en.js": () => Promise.resolve().then(() => (init_en(), en_exports)),
  "../../dayjs-locale/eo.js": () => Promise.resolve().then(() => (init_eo(), eo_exports)),
  "../../dayjs-locale/es-do.js": () => Promise.resolve().then(() => (init_es_do(), es_do_exports)),
  "../../dayjs-locale/es-mx.js": () => Promise.resolve().then(() => (init_es_mx(), es_mx_exports)),
  "../../dayjs-locale/es-pr.js": () => Promise.resolve().then(() => (init_es_pr(), es_pr_exports)),
  "../../dayjs-locale/es-us.js": () => Promise.resolve().then(() => (init_es_us(), es_us_exports)),
  "../../dayjs-locale/es.js": () => Promise.resolve().then(() => (init_es(), es_exports)),
  "../../dayjs-locale/et.js": () => Promise.resolve().then(() => (init_et(), et_exports)),
  "../../dayjs-locale/eu.js": () => Promise.resolve().then(() => (init_eu(), eu_exports)),
  "../../dayjs-locale/fa.js": () => Promise.resolve().then(() => (init_fa(), fa_exports)),
  "../../dayjs-locale/fi.js": () => Promise.resolve().then(() => (init_fi(), fi_exports)),
  "../../dayjs-locale/fo.js": () => Promise.resolve().then(() => (init_fo(), fo_exports)),
  "../../dayjs-locale/fr-ca.js": () => Promise.resolve().then(() => (init_fr_ca(), fr_ca_exports)),
  "../../dayjs-locale/fr-ch.js": () => Promise.resolve().then(() => (init_fr_ch(), fr_ch_exports)),
  "../../dayjs-locale/fr.js": () => Promise.resolve().then(() => (init_fr(), fr_exports)),
  "../../dayjs-locale/fy.js": () => Promise.resolve().then(() => (init_fy(), fy_exports)),
  "../../dayjs-locale/ga.js": () => Promise.resolve().then(() => (init_ga(), ga_exports)),
  "../../dayjs-locale/gd.js": () => Promise.resolve().then(() => (init_gd(), gd_exports)),
  "../../dayjs-locale/gl.js": () => Promise.resolve().then(() => (init_gl(), gl_exports)),
  "../../dayjs-locale/gom-latn.js": () => Promise.resolve().then(() => (init_gom_latn(), gom_latn_exports)),
  "../../dayjs-locale/gu.js": () => Promise.resolve().then(() => (init_gu(), gu_exports)),
  "../../dayjs-locale/he.js": () => Promise.resolve().then(() => (init_he(), he_exports)),
  "../../dayjs-locale/hi.js": () => Promise.resolve().then(() => (init_hi(), hi_exports)),
  "../../dayjs-locale/hr.js": () => Promise.resolve().then(() => (init_hr(), hr_exports)),
  "../../dayjs-locale/ht.js": () => Promise.resolve().then(() => (init_ht(), ht_exports)),
  "../../dayjs-locale/hu.js": () => Promise.resolve().then(() => (init_hu(), hu_exports)),
  "../../dayjs-locale/hy-am.js": () => Promise.resolve().then(() => (init_hy_am(), hy_am_exports)),
  "../../dayjs-locale/id.js": () => Promise.resolve().then(() => (init_id(), id_exports)),
  "../../dayjs-locale/is.js": () => Promise.resolve().then(() => (init_is(), is_exports)),
  "../../dayjs-locale/it-ch.js": () => Promise.resolve().then(() => (init_it_ch(), it_ch_exports)),
  "../../dayjs-locale/it.js": () => Promise.resolve().then(() => (init_it(), it_exports)),
  "../../dayjs-locale/ja.js": () => Promise.resolve().then(() => (init_ja(), ja_exports)),
  "../../dayjs-locale/jv.js": () => Promise.resolve().then(() => (init_jv(), jv_exports)),
  "../../dayjs-locale/ka.js": () => Promise.resolve().then(() => (init_ka(), ka_exports)),
  "../../dayjs-locale/kk.js": () => Promise.resolve().then(() => (init_kk(), kk_exports)),
  "../../dayjs-locale/km.js": () => Promise.resolve().then(() => (init_km(), km_exports)),
  "../../dayjs-locale/kn.js": () => Promise.resolve().then(() => (init_kn(), kn_exports)),
  "../../dayjs-locale/ko.js": () => Promise.resolve().then(() => (init_ko(), ko_exports)),
  "../../dayjs-locale/ku.js": () => Promise.resolve().then(() => (init_ku(), ku_exports)),
  "../../dayjs-locale/ky.js": () => Promise.resolve().then(() => (init_ky(), ky_exports)),
  "../../dayjs-locale/lb.js": () => Promise.resolve().then(() => (init_lb(), lb_exports)),
  "../../dayjs-locale/lo.js": () => Promise.resolve().then(() => (init_lo(), lo_exports)),
  "../../dayjs-locale/lt.js": () => Promise.resolve().then(() => (init_lt(), lt_exports)),
  "../../dayjs-locale/lv.js": () => Promise.resolve().then(() => (init_lv(), lv_exports)),
  "../../dayjs-locale/me.js": () => Promise.resolve().then(() => (init_me(), me_exports)),
  "../../dayjs-locale/mi.js": () => Promise.resolve().then(() => (init_mi(), mi_exports)),
  "../../dayjs-locale/mk.js": () => Promise.resolve().then(() => (init_mk(), mk_exports)),
  "../../dayjs-locale/ml.js": () => Promise.resolve().then(() => (init_ml(), ml_exports)),
  "../../dayjs-locale/mn.js": () => Promise.resolve().then(() => (init_mn(), mn_exports)),
  "../../dayjs-locale/mr.js": () => Promise.resolve().then(() => (init_mr(), mr_exports)),
  "../../dayjs-locale/ms-my.js": () => Promise.resolve().then(() => (init_ms_my(), ms_my_exports)),
  "../../dayjs-locale/ms.js": () => Promise.resolve().then(() => (init_ms(), ms_exports)),
  "../../dayjs-locale/mt.js": () => Promise.resolve().then(() => (init_mt(), mt_exports)),
  "../../dayjs-locale/my.js": () => Promise.resolve().then(() => (init_my(), my_exports)),
  "../../dayjs-locale/nb.js": () => Promise.resolve().then(() => (init_nb(), nb_exports)),
  "../../dayjs-locale/ne.js": () => Promise.resolve().then(() => (init_ne(), ne_exports)),
  "../../dayjs-locale/nl-be.js": () => Promise.resolve().then(() => (init_nl_be(), nl_be_exports)),
  "../../dayjs-locale/nl.js": () => Promise.resolve().then(() => (init_nl(), nl_exports)),
  "../../dayjs-locale/nn.js": () => Promise.resolve().then(() => (init_nn(), nn_exports)),
  "../../dayjs-locale/oc-lnc.js": () => Promise.resolve().then(() => (init_oc_lnc(), oc_lnc_exports)),
  "../../dayjs-locale/pa-in.js": () => Promise.resolve().then(() => (init_pa_in(), pa_in_exports)),
  "../../dayjs-locale/pl.js": () => Promise.resolve().then(() => (init_pl(), pl_exports)),
  "../../dayjs-locale/pt-br.js": () => Promise.resolve().then(() => (init_pt_br(), pt_br_exports)),
  "../../dayjs-locale/pt.js": () => Promise.resolve().then(() => (init_pt(), pt_exports)),
  "../../dayjs-locale/rn.js": () => Promise.resolve().then(() => (init_rn(), rn_exports)),
  "../../dayjs-locale/ro.js": () => Promise.resolve().then(() => (init_ro(), ro_exports)),
  "../../dayjs-locale/ru.js": () => Promise.resolve().then(() => (init_ru(), ru_exports)),
  "../../dayjs-locale/rw.js": () => Promise.resolve().then(() => (init_rw(), rw_exports)),
  "../../dayjs-locale/sd.js": () => Promise.resolve().then(() => (init_sd(), sd_exports)),
  "../../dayjs-locale/se.js": () => Promise.resolve().then(() => (init_se(), se_exports)),
  "../../dayjs-locale/si.js": () => Promise.resolve().then(() => (init_si(), si_exports)),
  "../../dayjs-locale/sk.js": () => Promise.resolve().then(() => (init_sk(), sk_exports)),
  "../../dayjs-locale/sl.js": () => Promise.resolve().then(() => (init_sl(), sl_exports)),
  "../../dayjs-locale/sq.js": () => Promise.resolve().then(() => (init_sq(), sq_exports)),
  "../../dayjs-locale/sr-cyrl.js": () => Promise.resolve().then(() => (init_sr_cyrl(), sr_cyrl_exports)),
  "../../dayjs-locale/sr.js": () => Promise.resolve().then(() => (init_sr(), sr_exports)),
  "../../dayjs-locale/ss.js": () => Promise.resolve().then(() => (init_ss(), ss_exports)),
  "../../dayjs-locale/sv-fi.js": () => Promise.resolve().then(() => (init_sv_fi(), sv_fi_exports)),
  "../../dayjs-locale/sv.js": () => Promise.resolve().then(() => (init_sv(), sv_exports)),
  "../../dayjs-locale/sw.js": () => Promise.resolve().then(() => (init_sw(), sw_exports)),
  "../../dayjs-locale/ta.js": () => Promise.resolve().then(() => (init_ta(), ta_exports)),
  "../../dayjs-locale/te.js": () => Promise.resolve().then(() => (init_te(), te_exports)),
  "../../dayjs-locale/tet.js": () => Promise.resolve().then(() => (init_tet(), tet_exports)),
  "../../dayjs-locale/tg.js": () => Promise.resolve().then(() => (init_tg(), tg_exports)),
  "../../dayjs-locale/th.js": () => Promise.resolve().then(() => (init_th(), th_exports)),
  "../../dayjs-locale/tk.js": () => Promise.resolve().then(() => (init_tk(), tk_exports)),
  "../../dayjs-locale/tl-ph.js": () => Promise.resolve().then(() => (init_tl_ph(), tl_ph_exports)),
  "../../dayjs-locale/tlh.js": () => Promise.resolve().then(() => (init_tlh(), tlh_exports)),
  "../../dayjs-locale/tr.js": () => Promise.resolve().then(() => (init_tr(), tr_exports)),
  "../../dayjs-locale/tzl.js": () => Promise.resolve().then(() => (init_tzl(), tzl_exports)),
  "../../dayjs-locale/tzm-latn.js": () => Promise.resolve().then(() => (init_tzm_latn(), tzm_latn_exports)),
  "../../dayjs-locale/tzm.js": () => Promise.resolve().then(() => (init_tzm(), tzm_exports)),
  "../../dayjs-locale/ug-cn.js": () => Promise.resolve().then(() => (init_ug_cn(), ug_cn_exports)),
  "../../dayjs-locale/uk.js": () => Promise.resolve().then(() => (init_uk(), uk_exports)),
  "../../dayjs-locale/ur.js": () => Promise.resolve().then(() => (init_ur(), ur_exports)),
  "../../dayjs-locale/uz-latn.js": () => Promise.resolve().then(() => (init_uz_latn(), uz_latn_exports)),
  "../../dayjs-locale/uz.js": () => Promise.resolve().then(() => (init_uz(), uz_exports)),
  "../../dayjs-locale/vi.js": () => Promise.resolve().then(() => (init_vi(), vi_exports)),
  "../../dayjs-locale/x-pseudo.js": () => Promise.resolve().then(() => (init_x_pseudo(), x_pseudo_exports)),
  "../../dayjs-locale/yo.js": () => Promise.resolve().then(() => (init_yo(), yo_exports)),
  "../../dayjs-locale/zh-cn.js": () => Promise.resolve().then(() => (init_zh_cn(), zh_cn_exports)),
  "../../dayjs-locale/zh-hk.js": () => Promise.resolve().then(() => (init_zh_hk(), zh_hk_exports)),
  "../../dayjs-locale/zh-tw.js": () => Promise.resolve().then(() => (init_zh_tw(), zh_tw_exports)),
  "../../dayjs-locale/zh.js": () => Promise.resolve().then(() => (init_zh(), zh_exports))
});

// public/codesandbox-runtime/hooks/use-locale/dayjs-locale.js
var loadedLocales = /* @__PURE__ */ new Set(["en"]);
var localeMapping = {
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
};
var loadDayjsLocale = async (dayjsLocale) => {
  try {
    await globImport_dayjs_locale_js(`../../dayjs-locale/${dayjsLocale}.js`);
    return true;
  } catch (e) {
    return false;
  }
};
var getDayjsLocale = (localeCode) => {
  return localeMapping[localeCode.toLowerCase()] || "en";
};
var setDayjsLocale = async (localeCode) => {
  const dayjsLocale = getDayjsLocale(localeCode);
  if (loadedLocales.has(dayjsLocale)) {
    stdin_default.locale(dayjsLocale);
    return;
  }
  if (dayjsLocale === "en") {
    stdin_default.locale("en");
    return;
  }
  try {
    const loaded = await loadDayjsLocale(dayjsLocale);
    if (!loaded) {
      stdin_default.locale("en");
      return;
    }
    loadedLocales.add(dayjsLocale);
    stdin_default.locale(dayjsLocale);
  } catch (e) {
    stdin_default.locale("en");
  }
};

// public/codesandbox-runtime/hooks/use-locale/index.js
var useLocale = (localeOverrides) => {
  const { globalLocale } = useConfig();
  const locale143 = computed5(() => {
    var _a2, _b;
    return (_b = (_a2 = unref4(localeOverrides)) != null ? _a2 : unref4(globalLocale)) != null ? _b : zhCn;
  });
  const lang = computed5(() => locale143.value.name);
  watch(
    lang,
    (newLang) => {
      setDayjsLocale(newLang);
    },
    { immediate: true }
  );
  const resolveLocaleValue = (path) => {
    const keys = path.split(".");
    const sources = [locale143.value.yh, zhCn.yh, en.yh];
    for (const source of sources) {
      let result = source;
      for (const key of keys) {
        if (result && typeof result === "object") {
          result = result[key];
        } else {
          result = void 0;
          break;
        }
      }
      if (result !== void 0) return result;
    }
    return void 0;
  };
  const t = (path, options) => {
    const result = resolveLocaleValue(path);
    if (typeof result !== "string") return path;
    if (options) {
      return result.replace(/\{(\w+)\}/g, (_match, key) => {
        const val = options[key];
        return val !== void 0 ? String(val) : `{${key}}`;
      });
    }
    return result;
  };
  const tRaw = (path) => {
    const result = resolveLocaleValue(path);
    if (result === void 0) return path;
    return result;
  };
  return {
    locale: locale143,
    lang,
    t,
    tRaw
  };
};

// public/codesandbox-runtime/hooks/use-id/index.js
import { computed as computed6, inject as inject4, unref as unref5, useId as useVueId } from "vue";
var idInjectionKey = Symbol("idInjectionKey");

// public/codesandbox-runtime/hooks/use-form-item/index.js
import { inject as inject5 } from "vue";
var FormContextKey = Symbol("FormContextKey");
var FormItemContextKey = Symbol("FormItemContextKey");
var useFormItem = () => {
  const form = inject5(FormContextKey, void 0);
  const formItem = inject5(FormItemContextKey, void 0);
  return {
    form,
    formItem,
    // 触发校验
    validate: (trigger) => {
      if (formItem) {
        return formItem.validate(trigger).catch(() => {
          return false;
        });
      }
      return Promise.resolve(true);
    }
  };
};

// public/codesandbox-runtime/hooks/use-virtual-scroll/index.js
import { ref as ref4, computed as computed7, unref as unref6 } from "vue";

// public/codesandbox-runtime/hooks/use-cache/index.js
import { shallowRef } from "vue";

// public/codesandbox-runtime/hooks/use-event-listener/index.js
import { onMounted, onBeforeUnmount, isRef, watch as watch2, unref as unref7 } from "vue";

// public/codesandbox-runtime/hooks/use-scroll-lock/index.js
import { ref as ref5, watch as watch3, onUnmounted as onUnmounted2 } from "vue";

// public/codesandbox-runtime/hooks/use-click-outside/index.js
import { unref as unref8 } from "vue";

// public/codesandbox-runtime/hooks/use-ai/use-ai-chat.js
import { ref as ref7, computed as computed8 } from "vue";

// public/codesandbox-runtime/hooks/use-ai/use-ai-stream.js
import { ref as ref6 } from "vue";

// public/codesandbox-runtime/hooks/use-ai/use-ai-conversations.js
import { ref as ref8, computed as computed9 } from "vue";

// public/codesandbox-runtime/hooks/use-ai/use-ai-request.js
import { ref as ref9 } from "vue";

// public/codesandbox-runtime/hooks/use-ai/use-ai-voice.js
import { ref as ref10, onUnmounted as onUnmounted3, shallowRef as shallowRef2 } from "vue";

// public/codesandbox-runtime/hooks/use-ai/use-ai-persistence.js
import { ref as ref11, onMounted as onMounted2 } from "vue";

// public/codesandbox-runtime/theme/component-theme.js
import { inject as inject6, provide, computed as computed10, unref as unref9 } from "vue";
var __defProp2 = Object.defineProperty;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp2(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
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
var COMPONENT_THEME_KEY = Symbol("component-theme");
function useComponentTheme(componentName, localOverrides) {
  const globalThemes = inject6(COMPONENT_THEME_KEY, {});
  const mergedVars = computed10(() => {
    const globalVars = globalThemes[componentName] || {};
    const local = unref9(localOverrides) || {};
    return __spreadValues(__spreadValues({}, globalVars), local);
  });
  const themeStyle = computed10(() => {
    const vars = mergedVars.value;
    const style = {};
    Object.entries(vars).forEach(([key, value]) => {
      if (value !== void 0) {
        const cssVarName = `--yh-${componentName}-${key.replace(/([A-Z])/g, "-$1").toLowerCase()}`;
        style[cssVarName] = value;
      }
    });
    return style;
  });
  const hasCustomTheme = computed10(() => {
    return Object.keys(mergedVars.value).length > 0;
  });
  return {
    themeVars: mergedVars,
    themeStyle,
    hasCustomTheme
  };
}

// public/codesandbox-runtime/components/date-picker/src/date-table.js
import { renderList as _renderList, Fragment as _Fragment, openBlock as _openBlock, createElementBlock as _createElementBlock, toDisplayString as _toDisplayString, createElementVNode as _createElementVNode, renderSlot as _renderSlot, normalizeClass as _normalizeClass, createCommentVNode as _createCommentVNode } from "vue";
import { computed as computed11 } from "vue";

// public/codesandbox-runtime/components/date-picker/src/panel-utils.js
init_dayjs();
import isBetweenPluginModule from "dayjs/plugin/isBetween.js";
import weekOfYearPluginModule from "dayjs/plugin/weekOfYear.js";
import isoWeekPluginModule from "dayjs/plugin/isoWeek.js";
import quarterOfYearPluginModule from "dayjs/plugin/quarterOfYear.js";
import advancedFormatPluginModule from "dayjs/plugin/advancedFormat.js";
import customParseFormatPluginModule from "dayjs/plugin/customParseFormat.js";
stdin_default2.extend(isBetweenPluginModule);
stdin_default2.extend(weekOfYearPluginModule);
stdin_default2.extend(isoWeekPluginModule);
stdin_default2.extend(quarterOfYearPluginModule);
stdin_default2.extend(advancedFormatPluginModule);
stdin_default2.extend(customParseFormatPluginModule);
var DEFAULT_FORMATS = {
  date: "YYYY-MM-DD",
  datetime: "YYYY-MM-DD HH:mm:ss",
  month: "YYYY-MM",
  year: "YYYY",
  week: "gggg [\u7B2C] ww [\u5468]",
  quarter: "YYYY-[Q]Q",
  daterange: "YYYY-MM-DD",
  datetimerange: "YYYY-MM-DD HH:mm:ss",
  monthrange: "YYYY-MM",
  yearrange: "YYYY",
  quarterrange: "YYYY-[Q]Q"
};
var generateCalendar = (date, firstDayOfWeek = 7, disabledDate) => {
  const startOfMonth = stdin_default2(date).startOf("month");
  const endOfMonth = stdin_default2(date).endOf("month");
  const startDay = startOfMonth.day();
  const offset = (startDay - firstDayOfWeek % 7 + 7) % 7;
  const startDate = startOfMonth.subtract(offset, "day");
  const rows = [];
  let current = startDate;
  const today = stdin_default2().startOf("day");
  for (let i = 0; i < 6; i++) {
    const row = [];
    for (let j = 0; j < 7; j++) {
      const isPrevMonth = current.isBefore(startOfMonth, "day");
      const isNextMonth = current.isAfter(endOfMonth, "day");
      const dateObj = current.toDate();
      let type = "current-month";
      if (isPrevMonth) type = "prev-month";
      if (isNextMonth) type = "next-month";
      row.push({
        date: dateObj,
        dayjs: current,
        type,
        text: current.date(),
        disabled: disabledDate ? disabledDate(dateObj) : false,
        isToday: current.isSame(today, "day")
      });
      current = current.add(1, "day");
    }
    rows.push(row);
  }
  return rows;
};
var formatDate = (date, format) => {
  if (!date) return "";
  return stdin_default2(date).format(format);
};

// public/codesandbox-runtime/components/date-picker/src/date-table.js
init_dayjs();
var _hoisted_1 = ["onClick", "onMouseenter"];
function render(_ctx, _cache, $props, $setup, $data, $options) {
  return _openBlock(), _createElementBlock(
    "table",
    {
      class: _normalizeClass([$setup.ns.e("table"), $setup.ns.is("week-mode", $props.selectionMode === "week")]),
      onMouseleave: _cache[0] || (_cache[0] = ($event) => $setup.emit("hover", null))
    },
    [
      _createElementVNode("thead", null, [
        _createElementVNode("tr", null, [
          (_openBlock(true), _createElementBlock(
            _Fragment,
            null,
            _renderList($setup.weekDays, (day) => {
              return _openBlock(), _createElementBlock(
                "th",
                { key: day },
                _toDisplayString(day),
                1
                /* TEXT */
              );
            }),
            128
            /* KEYED_FRAGMENT */
          ))
        ])
      ]),
      _createElementVNode("tbody", null, [
        (_openBlock(true), _createElementBlock(
          _Fragment,
          null,
          _renderList($setup.rows, (row, i) => {
            return _openBlock(), _createElementBlock(
              "tr",
              {
                key: i,
                class: _normalizeClass($setup.ns.e("table-row"))
              },
              [
                (_openBlock(true), _createElementBlock(
                  _Fragment,
                  null,
                  _renderList(row, (cell, j) => {
                    return _openBlock(), _createElementBlock("td", {
                      key: j,
                      class: _normalizeClass($setup.getCellClasses(cell)),
                      onClick: ($event) => $setup.handleClick(cell),
                      onMouseenter: ($event) => $setup.handleMouseEnter(cell)
                    }, [
                      _createElementVNode(
                        "div",
                        {
                          class: _normalizeClass($setup.ns.e("cell-content"))
                        },
                        [
                          _renderSlot(_ctx.$slots, "date-cell", { cell }, () => {
                            var _a2, _b;
                            return [
                              _createElementVNode(
                                "span",
                                {
                                  class: _normalizeClass($setup.ns.e("cell-date"))
                                },
                                _toDisplayString(cell.text),
                                3
                                /* TEXT, CLASS */
                              ),
                              $setup.getCellExtra(cell.date) ? (_openBlock(), _createElementBlock(
                                "span",
                                {
                                  key: 0,
                                  class: _normalizeClass([$setup.ns.e("cell-extra"), (_a2 = $setup.getCellExtra(cell.date)) == null ? void 0 : _a2.className])
                                },
                                _toDisplayString((_b = $setup.getCellExtra(cell.date)) == null ? void 0 : _b.text),
                                3
                                /* TEXT, CLASS */
                              )) : _createCommentVNode("v-if", true)
                            ];
                          })
                        ],
                        2
                        /* CLASS */
                      )
                    ], 42, _hoisted_1);
                  }),
                  128
                  /* KEYED_FRAGMENT */
                ))
              ],
              2
              /* CLASS */
            );
          }),
          128
          /* KEYED_FRAGMENT */
        ))
      ])
    ],
    34
    /* CLASS, NEED_HYDRATION */
  );
}
var __sfc__ = {
  __name: "date-table",
  props: {
    date: { type: Date, required: true },
    selectedDate: { type: [Date, Array, null], required: false },
    selectionMode: { type: String, required: false },
    rangeState: { type: Object, required: false },
    disabledDate: { type: Function, required: false },
    firstDayOfWeek: { type: Number, required: false },
    cellShape: { type: String, required: false },
    cellRender: { type: Function, required: false }
  },
  emits: ["select", "hover"],
  setup(__props, { expose: __expose, emit: __emit }) {
    __expose();
    const props = __props;
    const emit = __emit;
    const ns = useNamespace("date-picker");
    const { t } = useLocale();
    const getCellExtra = (date) => {
      if (!props.cellRender) return null;
      const res = props.cellRender(date);
      return typeof res === "string" ? { text: res } : res;
    };
    const rows = computed11(() => {
      return generateCalendar(props.date, props.firstDayOfWeek, props.disabledDate);
    });
    const weekDays = computed11(() => {
      const days = [
        t("datepicker.weeks.sun"),
        t("datepicker.weeks.mon"),
        t("datepicker.weeks.tue"),
        t("datepicker.weeks.wed"),
        t("datepicker.weeks.thu"),
        t("datepicker.weeks.fri"),
        t("datepicker.weeks.sat")
      ];
      const start = props.firstDayOfWeek ? props.firstDayOfWeek % 7 : 0;
      const result = [];
      for (let i = 0; i < 7; i++) {
        result.push(days[(start + i) % 7]);
      }
      return result;
    });
    const getCellClasses = (cell) => {
      const classes = [ns.e("cell"), ns.is(cell.type), ns.is(props.cellShape || "round")];
      if (cell.isToday) classes.push("is-today");
      if (cell.disabled) classes.push("is-disabled");
      const cellDay = cell.dayjs.startOf("day");
      if (props.selectedDate && !Array.isArray(props.selectedDate)) {
        const selectedDay = stdin_default2(props.selectedDate).startOf("day");
        if (props.selectionMode === "week") {
          if (cell.dayjs.isSame(selectedDay, "week")) {
            classes.push("is-selected");
            if (cell.dayjs.day() === (props.firstDayOfWeek || 7) % 7) classes.push("is-week-start");
            if (cell.dayjs.day() === ((props.firstDayOfWeek || 7) + 6) % 7) classes.push("is-week-end");
          }
        } else {
          if (cellDay.isSame(selectedDay)) {
            classes.push("is-selected");
          }
        }
      }
      if (props.rangeState) {
        const { from, to, hovering } = props.rangeState;
        const start = from ? stdin_default2(from).startOf("day") : null;
        const end = to ? stdin_default2(to).startOf("day") : null;
        const hover = hovering ? stdin_default2(hovering).startOf("day") : null;
        if (start && cellDay.isSame(start)) classes.push("is-range-start", "is-selected");
        if (end && cellDay.isSame(end)) classes.push("is-range-end", "is-selected");
        if (start && !end && hover) {
          const min = start.isBefore(hover) ? start : hover;
          const max = start.isBefore(hover) ? hover : start;
          if (cellDay.isAfter(min) && cellDay.isBefore(max)) {
            classes.push("is-in-range");
          }
          if (cellDay.isSame(hover) && !cellDay.isSame(start)) {
            classes.push("is-range-end", "is-selected", "is-hover-end");
          }
        } else if (start && end) {
          const min = start.isBefore(end) ? start : end;
          const max = start.isBefore(end) ? end : start;
          if (cellDay.isAfter(min) && cellDay.isBefore(max)) {
            classes.push("is-in-range");
          }
        }
      }
      return classes;
    };
    const handleClick = (cell) => {
      if (cell.disabled) return;
      if (props.selectionMode === "week") {
        const firstDay = cell.dayjs.startOf("week").toDate();
        emit("select", firstDay);
      } else {
        emit("select", cell.date);
      }
    };
    const handleMouseEnter = (cell) => {
      if (cell.disabled) return;
      emit("hover", cell.date);
    };
    const __returned__ = { props, emit, ns, t, getCellExtra, rows, weekDays, getCellClasses, handleClick, handleMouseEnter, computed: computed11, get useNamespace() {
      return useNamespace;
    }, get useLocale() {
      return useLocale;
    }, get generateCalendar() {
      return generateCalendar;
    }, get dayjs() {
      return stdin_default2;
    } };
    Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
    return __returned__;
  }
};
__sfc__.render = render;
var stdin_default3 = __sfc__;

// public/codesandbox-runtime/components/date-picker/src/month-table.js
import { renderList as _renderList2, Fragment as _Fragment2, openBlock as _openBlock2, createElementBlock as _createElementBlock2, toDisplayString as _toDisplayString2, normalizeClass as _normalizeClass2, createElementVNode as _createElementVNode2 } from "vue";
import { computed as computed12 } from "vue";
init_dayjs();
var _hoisted_12 = ["onClick", "onMouseenter"];
function render2(_ctx, _cache, $props, $setup, $data, $options) {
  return _openBlock2(), _createElementBlock2(
    "div",
    {
      class: _normalizeClass2([$setup.ns.e("table"), $setup.ns.em("table", "month")])
    },
    [
      (_openBlock2(true), _createElementBlock2(
        _Fragment2,
        null,
        _renderList2($setup.months, (m2, i) => {
          return _openBlock2(), _createElementBlock2("div", {
            key: i,
            class: _normalizeClass2($setup.getCellClasses(i)),
            onClick: ($event) => $setup.handleClick(i),
            onMouseenter: ($event) => $setup.emit("hover", $setup.dayjs($props.date).month(i).startOf("month").toDate())
          }, [
            _createElementVNode2(
              "span",
              {
                class: _normalizeClass2($setup.ns.e("cell-content"))
              },
              _toDisplayString2(m2),
              3
              /* TEXT, CLASS */
            )
          ], 42, _hoisted_12);
        }),
        128
        /* KEYED_FRAGMENT */
      ))
    ],
    2
    /* CLASS */
  );
}
var __sfc__2 = {
  __name: "month-table",
  props: {
    date: { type: Date, required: true },
    selectedDate: { type: [Date, Array, null], required: false },
    rangeState: { type: Object, required: false },
    disabledDate: { type: Function, required: false },
    cellShape: { type: String, required: false }
  },
  emits: ["select", "hover"],
  setup(__props, { expose: __expose, emit: __emit }) {
    __expose();
    const props = __props;
    const emit = __emit;
    const ns = useNamespace("date-picker");
    const { t } = useLocale();
    const months15 = computed12(() => [
      t("datepicker.months.jan"),
      t("datepicker.months.feb"),
      t("datepicker.months.mar"),
      t("datepicker.months.apr"),
      t("datepicker.months.may"),
      t("datepicker.months.jun"),
      t("datepicker.months.jul"),
      t("datepicker.months.aug"),
      t("datepicker.months.sep"),
      t("datepicker.months.oct"),
      t("datepicker.months.nov"),
      t("datepicker.months.dec")
    ]);
    const getCellClasses = (month) => {
      const classes = [ns.e("cell"), ns.is(props.cellShape || "round")];
      const cellDate = stdin_default2(props.date).month(month).startOf("month");
      const today = stdin_default2().startOf("month");
      if (cellDate.isSame(today, "month")) classes.push("is-today");
      if (props.disabledDate && props.disabledDate(cellDate.toDate())) classes.push("is-disabled");
      const isSelected = (val) => {
        if (!val || Array.isArray(val)) return false;
        const d2 = stdin_default2(val);
        return d2.year() === stdin_default2(props.date).year() && d2.month() === month;
      };
      if (props.selectedDate && !Array.isArray(props.selectedDate)) {
        if (isSelected(props.selectedDate)) {
          classes.push("is-selected");
        }
      }
      if (props.rangeState) {
        const { from, to, hovering } = props.rangeState;
        const start = from ? stdin_default2(from).startOf("month") : null;
        const end = to ? stdin_default2(to).startOf("month") : hovering ? stdin_default2(hovering).startOf("month") : null;
        if (start && cellDate.isSame(start, "month")) classes.push("is-range-start", "is-selected");
        if (end && cellDate.isSame(end, "month")) classes.push("is-range-end", "is-selected");
        if (start && end) {
          const min = start.isBefore(end) ? start : end;
          const max = start.isBefore(end) ? end : start;
          if (cellDate.isAfter(min, "month") && cellDate.isBefore(max, "month")) {
            classes.push("is-in-range");
          }
        }
      }
      return classes;
    };
    const handleClick = (month) => {
      const cellDate = stdin_default2(props.date).month(month).startOf("month").toDate();
      if (props.disabledDate && props.disabledDate(cellDate)) return;
      emit("select", month);
    };
    const __returned__ = { props, emit, ns, t, months: months15, getCellClasses, handleClick, computed: computed12, get useNamespace() {
      return useNamespace;
    }, get useLocale() {
      return useLocale;
    }, get dayjs() {
      return stdin_default2;
    } };
    Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
    return __returned__;
  }
};
__sfc__2.render = render2;
var stdin_default4 = __sfc__2;

// public/codesandbox-runtime/components/date-picker/src/year-table.js
import { renderList as _renderList3, Fragment as _Fragment3, openBlock as _openBlock3, createElementBlock as _createElementBlock3, toDisplayString as _toDisplayString3, normalizeClass as _normalizeClass3, createElementVNode as _createElementVNode3 } from "vue";
import { computed as computed13 } from "vue";
init_dayjs();
var _hoisted_13 = ["onClick", "onMouseenter"];
function render3(_ctx, _cache, $props, $setup, $data, $options) {
  return _openBlock3(), _createElementBlock3(
    "div",
    {
      class: _normalizeClass3([$setup.ns.e("table"), $setup.ns.em("table", "year")])
    },
    [
      (_openBlock3(true), _createElementBlock3(
        _Fragment3,
        null,
        _renderList3($setup.years, (year) => {
          return _openBlock3(), _createElementBlock3("div", {
            key: year,
            class: _normalizeClass3($setup.getCellClasses(year)),
            onClick: ($event) => $setup.handleClick(year),
            onMouseenter: ($event) => $setup.emit("hover", $setup.dayjs().year(year).startOf("year").toDate())
          }, [
            _createElementVNode3(
              "span",
              {
                class: _normalizeClass3($setup.ns.e("cell-content"))
              },
              _toDisplayString3(year),
              3
              /* TEXT, CLASS */
            )
          ], 42, _hoisted_13);
        }),
        128
        /* KEYED_FRAGMENT */
      ))
    ],
    2
    /* CLASS */
  );
}
var __sfc__3 = {
  __name: "year-table",
  props: {
    date: { type: Date, required: true },
    selectedDate: { type: [Date, Array, null], required: false },
    rangeState: { type: Object, required: false },
    disabledDate: { type: Function, required: false },
    cellShape: { type: String, required: false }
  },
  emits: ["select", "hover"],
  setup(__props, { expose: __expose, emit: __emit }) {
    __expose();
    const props = __props;
    const emit = __emit;
    const ns = useNamespace("date-picker");
    const startYear = computed13(() => {
      return Math.floor(stdin_default2(props.date).year() / 10) * 10;
    });
    const years = computed13(() => {
      const start = startYear.value;
      const res = [];
      for (let i = 0; i < 10; i++) {
        res.push(start + i);
      }
      return res;
    });
    const getCellClasses = (year) => {
      const classes = [ns.e("cell"), ns.is(props.cellShape || "round")];
      const cellDate = stdin_default2().year(year).startOf("year");
      const today = stdin_default2().startOf("year");
      if (cellDate.isSame(today, "year")) classes.push("is-today");
      if (props.disabledDate && props.disabledDate(cellDate.toDate())) classes.push("is-disabled");
      const isSelected = (val) => {
        if (!val || Array.isArray(val)) return false;
        const d2 = stdin_default2(val);
        return d2.year() === year;
      };
      if (props.selectedDate && !Array.isArray(props.selectedDate)) {
        if (isSelected(props.selectedDate)) {
          classes.push("is-selected");
        }
      }
      if (props.rangeState) {
        const { from, to, hovering } = props.rangeState;
        const start = from ? stdin_default2(from).startOf("year") : null;
        const end = to ? stdin_default2(to).startOf("year") : hovering ? stdin_default2(hovering).startOf("year") : null;
        if (start && cellDate.isSame(start)) classes.push("is-range-start", "is-selected");
        if (end && cellDate.isSame(end)) classes.push("is-range-end", "is-selected");
        if (start && end) {
          const min = start.isBefore(end) ? start : end;
          const max = start.isBefore(end) ? end : start;
          if (cellDate.isAfter(min) && cellDate.isBefore(max)) {
            classes.push("is-in-range");
          }
        }
      }
      return classes;
    };
    const handleClick = (year) => {
      const cellDate = stdin_default2().year(year).startOf("year").toDate();
      if (props.disabledDate && props.disabledDate(cellDate)) return;
      emit("select", year);
    };
    const __returned__ = { props, emit, ns, startYear, years, getCellClasses, handleClick, computed: computed13, get useNamespace() {
      return useNamespace;
    }, get dayjs() {
      return stdin_default2;
    } };
    Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
    return __returned__;
  }
};
__sfc__3.render = render3;
var stdin_default5 = __sfc__3;

// public/codesandbox-runtime/components/date-picker/src/quarter-table.js
import { renderList as _renderList4, Fragment as _Fragment4, openBlock as _openBlock4, createElementBlock as _createElementBlock4, toDisplayString as _toDisplayString4, normalizeClass as _normalizeClass4, createElementVNode as _createElementVNode4 } from "vue";
import { computed as computed14 } from "vue";
init_dayjs();
var _hoisted_14 = ["onClick", "onMouseenter"];
function render4(_ctx, _cache, $props, $setup, $data, $options) {
  return _openBlock4(), _createElementBlock4(
    "div",
    {
      class: _normalizeClass4([$setup.ns.e("table"), $setup.ns.em("table", "quarter")])
    },
    [
      (_openBlock4(true), _createElementBlock4(
        _Fragment4,
        null,
        _renderList4($setup.quarters, (q) => {
          return _openBlock4(), _createElementBlock4("div", {
            key: q.value,
            class: _normalizeClass4($setup.getCellClasses(q.value)),
            onClick: ($event) => $setup.handleClick(q.value),
            onMouseenter: ($event) => $setup.emit("hover", $setup.dayjs($props.date).month((q.value - 1) * 3).startOf("month").toDate())
          }, [
            _createElementVNode4(
              "span",
              {
                class: _normalizeClass4($setup.ns.e("cell-content"))
              },
              _toDisplayString4(q.text),
              3
              /* TEXT, CLASS */
            )
          ], 42, _hoisted_14);
        }),
        128
        /* KEYED_FRAGMENT */
      ))
    ],
    2
    /* CLASS */
  );
}
var __sfc__4 = {
  __name: "quarter-table",
  props: {
    date: { type: Date, required: true },
    selectedDate: { type: [Date, Array, null], required: false },
    rangeState: { type: Object, required: false },
    disabledDate: { type: Function, required: false },
    cellShape: { type: String, required: false }
  },
  emits: ["select", "hover"],
  setup(__props, { expose: __expose, emit: __emit }) {
    __expose();
    const props = __props;
    const emit = __emit;
    const ns = useNamespace("date-picker");
    const { t } = useLocale();
    const quarters = computed14(() => [
      { text: t("datepicker.quarters.q1"), value: 1 },
      { text: t("datepicker.quarters.q2"), value: 2 },
      { text: t("datepicker.quarters.q3"), value: 3 },
      { text: t("datepicker.quarters.q4"), value: 4 }
    ]);
    const getCellClasses = (quarter) => {
      const classes = [ns.e("cell"), ns.is(props.cellShape || "round")];
      const month = (quarter - 1) * 3;
      const cellDate = stdin_default2(props.date).month(month).startOf("month");
      const today = stdin_default2().startOf("month");
      if (today.year() === cellDate.year() && Math.floor(today.month() / 3) === quarter - 1) {
        classes.push("is-today");
      }
      if (props.disabledDate && props.disabledDate(cellDate.toDate())) classes.push("is-disabled");
      const isSelected = (val) => {
        if (!val || Array.isArray(val)) return false;
        const d2 = stdin_default2(val);
        return d2.year() === stdin_default2(props.date).year() && Math.floor(d2.month() / 3) === quarter - 1;
      };
      if (props.selectedDate && !Array.isArray(props.selectedDate)) {
        if (isSelected(props.selectedDate)) {
          classes.push("is-selected");
        }
      }
      if (props.rangeState) {
        const { from, to, hovering } = props.rangeState;
        const start = from ? stdin_default2(from).startOf("month").month(Math.floor(stdin_default2(from).month() / 3) * 3) : null;
        const end = to ? stdin_default2(to).startOf("month").month(Math.floor(stdin_default2(to).month() / 3) * 3) : hovering ? stdin_default2(hovering).startOf("month").month(Math.floor(stdin_default2(hovering).month() / 3) * 3) : null;
        const current = cellDate.startOf("month");
        if (start && current.isSame(start, "month")) classes.push("is-range-start", "is-selected");
        if (end && current.isSame(end, "month")) classes.push("is-range-end", "is-selected");
        if (start && end) {
          const min = start.isBefore(end) ? start : end;
          const max = start.isBefore(end) ? end : start;
          if (current.isAfter(min, "month") && current.isBefore(max, "month")) {
            classes.push("is-in-range");
          }
        }
      }
      return classes;
    };
    const handleClick = (quarter) => {
      const month = (quarter - 1) * 3;
      const cellDate = stdin_default2(props.date).month(month).startOf("month").toDate();
      if (props.disabledDate && props.disabledDate(cellDate)) return;
      emit("select", quarter);
    };
    const __returned__ = { props, emit, ns, t, quarters, getCellClasses, handleClick, computed: computed14, get useNamespace() {
      return useNamespace;
    }, get useLocale() {
      return useLocale;
    }, get dayjs() {
      return stdin_default2;
    } };
    Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
    return __returned__;
  }
};
__sfc__4.render = render4;
var stdin_default6 = __sfc__4;

// public/codesandbox-runtime/components/date-picker/src/date-picker-meta.js
var datePickerProps = {
  /** 绑定值 */
  modelValue: {
    type: [String, Number, Date, Array],
    default: null
  },
  /** 类型 */
  type: {
    type: String,
    default: "date"
  },
  /** 是否禁用 */
  disabled: {
    type: Boolean,
    default: false
  },
  /** 是否只读 */
  readonly: {
    type: Boolean,
    default: false
  },
  /** 是否可清空 */
  clearable: {
    type: Boolean,
    default: true
  },
  /** 尺寸 */
  size: {
    type: String,
    default: "default"
  },
  /** 占位符 */
  placeholder: {
    type: String,
    default: void 0
  },
  /** 范围选择时的开始占位符 */
  startPlaceholder: {
    type: String,
    default: void 0
  },
  /** 范围选择时的结束占位符 */
  endPlaceholder: {
    type: String,
    default: void 0
  },
  /** 格式化显示 */
  format: {
    type: String,
    default: ""
  },
  /** 绑定值的格式 */
  valueFormat: {
    type: String,
    default: ""
  },
  /** 面板显示的日期格式 */
  dateFormat: {
    type: String,
    default: "YYYY-MM-DD"
  },
  /** 面板显示的时间格式 */
  timeFormat: {
    type: String,
    default: "HH:mm:ss"
  },
  /** 范围分隔符 */
  rangeSeparator: {
    type: String,
    default: "-"
  },
  /** 第一天是星期几 */
  firstDayOfWeek: {
    type: Number,
    default: 7
    // 1-7, 7 代表周日
  },
  /** 禁用日期函数 */
  disabledDate: {
    type: Function,
    default: void 0
  },
  /** 预设快捷选项 */
  presets: {
    type: Array,
    default: () => []
  },
  /** 预设选项的位置 */
  presetPosition: {
    type: String,
    default: "bottom"
  },
  /** 是否显示底部操作栏 */
  showFooter: {
    type: Boolean,
    default: true
  },
  /** 状态 */
  status: {
    type: String,
    default: void 0
  },
  /** 是否自动排序范围（当结束日期早于开始日期时） */
  orderOnConfirm: {
    type: Boolean,
    default: false
  },
  /** 自定义前缀图标 */
  prefixIcon: {
    type: [String, Object],
    default: ""
  },
  /** 自定义清除图标 */
  clearIcon: {
    type: [String, Object],
    default: ""
  },
  /** 选择器打开时默认显示的日期 */
  defaultValue: {
    type: [Date, Array],
    default: void 0
  },
  /** 是否内联显示（只显示面板） */
  panelOnly: {
    type: Boolean,
    default: false
  },
  /** 默认时间（datetime 模式下） */
  defaultTime: {
    type: [Date, Array],
    default: void 0
  },
  /** 下拉框类名 */
  popperClass: {
    type: String,
    default: ""
  },
  /** 是否将面板插入到 body */
  teleported: {
    type: Boolean,
    default: true
  },
  /** 是否触发表单验证 */
  validateEvent: {
    type: Boolean,
    default: true
  },
  /** 小名/标识 */
  name: {
    type: String,
    default: ""
  },
  /** ID */
  id: {
    type: String,
    default: ""
  },
  /** 单元格形状 */
  cellShape: {
    type: String,
    default: "round"
  },
  /** 自定义单元格渲染函数 */
  cellRender: {
    type: Function,
    default: void 0
  },
  /** 主题覆盖变量 */
  themeOverrides: {
    type: Object,
    default: void 0
  }
};

// public/codesandbox-runtime/components/date-picker/src/date-picker.js
init_dayjs();
var __defProp3 = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols2 = Object.getOwnPropertySymbols;
var __hasOwnProp2 = Object.prototype.hasOwnProperty;
var __propIsEnum2 = Object.prototype.propertyIsEnumerable;
var __defNormalProp2 = (obj, key, value) => key in obj ? __defProp3(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues2 = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp2.call(b, prop))
      __defNormalProp2(a, prop, b[prop]);
  if (__getOwnPropSymbols2)
    for (var prop of __getOwnPropSymbols2(b)) {
      if (__propIsEnum2.call(b, prop))
        __defNormalProp2(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
var _hoisted_15 = {
  key: 1,
  viewBox: "0 0 24 24",
  width: "1em",
  height: "1em"
};
var _hoisted_2 = ["placeholder", "value"];
var _hoisted_3 = ["placeholder", "value"];
var _hoisted_4 = ["placeholder", "value"];
var _hoisted_5 = {
  key: 1,
  viewBox: "0 0 1024 1024",
  width: "1em",
  height: "1em"
};
var _hoisted_6 = ["onClick"];
function render5(_ctx, _cache, $props, $setup, $data, $options) {
  var _a2, _b, _c;
  return _openBlock5(), _createElementBlock5(
    "div",
    {
      ref: "wrapperRef",
      class: _normalizeClass5($setup.wrapperClasses),
      style: _normalizeStyle($setup.themeStyle),
      onClick: $setup.togglePanel,
      onMouseenter: _cache[10] || (_cache[10] = ($event) => $setup.hovering = true),
      onMouseleave: _cache[11] || (_cache[11] = ($event) => $setup.hovering = false)
    },
    [
      _createCommentVNode2(" \u8F93\u5165\u6846\u90E8\u5206 "),
      !_ctx.panelOnly ? (_openBlock5(), _createElementBlock5(
        "div",
        {
          key: 0,
          class: _normalizeClass5($setup.ns.e("wrapper"))
        },
        [
          _createElementVNode5(
            "span",
            {
              class: _normalizeClass5($setup.ns.e("icon"))
            },
            [
              _renderSlot2(_ctx.$slots, "prefix-icon", {}, () => [
                _ctx.prefixIcon ? (_openBlock5(), _createBlock(_resolveDynamicComponent(_ctx.prefixIcon), { key: 0 })) : (_openBlock5(), _createElementBlock5("svg", _hoisted_15, [..._cache[12] || (_cache[12] = [
                  _createElementVNode5(
                    "path",
                    {
                      fill: "currentColor",
                      d: "M19 4h-1V2h-2v2H8V2H6v2H5c-1.11 0-1.99.9-1.99 2L3 20a2 2 0 0 0 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2m0 16H5V10h14zM9 14H7v-2h2zm4 0h-2v-2h2zm4 0h-2v-2h2zm-8 4H7v-2h2zm4 4H11V16h2z"
                    },
                    null,
                    -1
                    /* CACHED */
                  )
                ])]))
              ])
            ],
            2
            /* CLASS */
          ),
          !$setup.isRange ? (_openBlock5(), _createElementBlock5("input", {
            key: 0,
            class: _normalizeClass5($setup.ns.e("inner")),
            placeholder: (_a2 = _ctx.placeholder) != null ? _a2 : $setup.t("datepicker.selectDate"),
            value: $setup.displayValue,
            readonly: ""
          }, null, 10, _hoisted_2)) : (_openBlock5(), _createElementBlock5(
            "div",
            {
              key: 1,
              class: _normalizeClass5($setup.ns.e("range-input-wrapper"))
            },
            [
              _createElementVNode5("input", {
                class: _normalizeClass5($setup.ns.e("range-input")),
                placeholder: (_b = _ctx.startPlaceholder) != null ? _b : $setup.t("datepicker.startDate"),
                value: $setup.rangeDisplayValue[0],
                readonly: ""
              }, null, 10, _hoisted_3),
              _createElementVNode5(
                "span",
                {
                  class: _normalizeClass5($setup.ns.e("range-separator"))
                },
                _toDisplayString5(_ctx.rangeSeparator),
                3
                /* TEXT, CLASS */
              ),
              _createElementVNode5("input", {
                class: _normalizeClass5($setup.ns.e("range-input")),
                placeholder: (_c = _ctx.endPlaceholder) != null ? _c : $setup.t("datepicker.endDate"),
                value: $setup.rangeDisplayValue[1],
                readonly: ""
              }, null, 10, _hoisted_4)
            ],
            2
            /* CLASS */
          )),
          _createElementVNode5(
            "span",
            {
              class: _normalizeClass5($setup.ns.e("suffix"))
            },
            [
              _ctx.clearable && _ctx.modelValue && $setup.hovering && !_ctx.disabled ? (_openBlock5(), _createElementBlock5(
                "span",
                {
                  key: 0,
                  class: _normalizeClass5($setup.ns.e("clear")),
                  onClick: _withModifiers($setup.handleClear, ["stop"])
                },
                [
                  _renderSlot2(_ctx.$slots, "clear-icon", {}, () => [
                    _ctx.clearIcon ? (_openBlock5(), _createBlock(_resolveDynamicComponent(_ctx.clearIcon), { key: 0 })) : (_openBlock5(), _createElementBlock5("svg", _hoisted_5, [..._cache[13] || (_cache[13] = [
                      _createElementVNode5(
                        "path",
                        {
                          fill: "currentColor",
                          d: "M512 64a448 448 0 1 1 0 896 448 448 0 0 1 0-896zm0 393.664L407.936 353.6a38.4 38.4 0 1 0-54.336 54.336L457.664 512 353.6 616.064a38.4 38.4 0 1 0 54.336 54.336L512 566.336 616.064 670.4a38.4 38.4 0 1 0 54.336-54.336L566.336 512 670.4 407.936a38.4 38.4 0 1 0-54.336-54.336L512 457.664z"
                        },
                        null,
                        -1
                        /* CACHED */
                      )
                    ])]))
                  ])
                ],
                2
                /* CLASS */
              )) : _createCommentVNode2("v-if", true)
            ],
            2
            /* CLASS */
          )
        ],
        2
        /* CLASS */
      )) : _createCommentVNode2("v-if", true),
      _createCommentVNode2(" \u5F39\u7A97\u9762\u677F "),
      (_openBlock5(), _createBlock(_resolveDynamicComponent(_ctx.panelOnly ? "div" : "Teleport"), {
        to: "body",
        disabled: !_ctx.teleported || _ctx.panelOnly
      }, {
        default: _withCtx(() => [
          _createVNode(_Transition, {
            name: _ctx.panelOnly ? "" : $setup.ns.b("panel")
          }, {
            default: _withCtx(() => [
              $setup.visible ? (_openBlock5(), _createElementBlock5(
                "div",
                {
                  key: 0,
                  class: _normalizeClass5([$setup.ns.e("panel"), _ctx.popperClass, $setup.ns.is("plain", _ctx.panelOnly)]),
                  style: _normalizeStyle(!_ctx.panelOnly && _ctx.teleported ? $setup.dropdownStyle : {}),
                  onClick: _cache[9] || (_cache[9] = _withModifiers(() => {
                  }, ["stop"]))
                },
                [
                  _createElementVNode5(
                    "div",
                    {
                      class: _normalizeClass5($setup.ns.e("header"))
                    },
                    [
                      _createElementVNode5(
                        "div",
                        {
                          class: _normalizeClass5($setup.ns.e("header-group"))
                        },
                        [
                          _createElementVNode5(
                            "button",
                            {
                              class: _normalizeClass5([$setup.ns.e("header-btns"), $setup.ns.em("header-btns", "double-left")]),
                              onClick: _cache[0] || (_cache[0] = ($event) => $setup.moveYear(-1))
                            },
                            " \xAB ",
                            2
                            /* CLASS */
                          ),
                          $setup.currentView === "date" ? (_openBlock5(), _createElementBlock5(
                            "button",
                            {
                              key: 0,
                              class: _normalizeClass5([$setup.ns.e("header-btns"), $setup.ns.em("header-btns", "left")]),
                              onClick: _cache[1] || (_cache[1] = ($event) => $setup.moveMonth(-1))
                            },
                            " \u2039 ",
                            2
                            /* CLASS */
                          )) : _createCommentVNode2("v-if", true)
                        ],
                        2
                        /* CLASS */
                      ),
                      _createElementVNode5(
                        "span",
                        {
                          class: _normalizeClass5($setup.ns.e("header-label")),
                          onClick: $setup.handleHeaderClick
                        },
                        _toDisplayString5($setup.headerLabel),
                        3
                        /* TEXT, CLASS */
                      ),
                      _createElementVNode5(
                        "div",
                        {
                          class: _normalizeClass5($setup.ns.e("header-group"))
                        },
                        [
                          $setup.currentView === "date" ? (_openBlock5(), _createElementBlock5(
                            "button",
                            {
                              key: 0,
                              class: _normalizeClass5([$setup.ns.e("header-btns"), $setup.ns.em("header-btns", "right")]),
                              onClick: _cache[2] || (_cache[2] = ($event) => $setup.moveMonth(1))
                            },
                            " \u203A ",
                            2
                            /* CLASS */
                          )) : _createCommentVNode2("v-if", true),
                          _createElementVNode5(
                            "button",
                            {
                              class: _normalizeClass5([$setup.ns.e("header-btns"), $setup.ns.em("header-btns", "double-right")]),
                              onClick: _cache[3] || (_cache[3] = ($event) => $setup.moveYear(1))
                            },
                            " \xBB ",
                            2
                            /* CLASS */
                          )
                        ],
                        2
                        /* CLASS */
                      )
                    ],
                    2
                    /* CLASS */
                  ),
                  _createElementVNode5(
                    "div",
                    {
                      class: _normalizeClass5($setup.ns.e("content"))
                    },
                    [
                      $setup.currentView === "date" ? (_openBlock5(), _createBlock($setup["DateTable"], {
                        key: 0,
                        date: $setup.innerDate,
                        "selected-date": $setup.parsedSelectedDate,
                        "selection-mode": _ctx.type === "week" ? "week" : "date",
                        "range-state": $setup.parsedRangeState,
                        "disabled-date": _ctx.disabledDate,
                        "first-day-of-week": _ctx.firstDayOfWeek,
                        "cell-shape": _ctx.cellShape,
                        "cell-render": _ctx.cellRender,
                        onSelect: $setup.handleSelect,
                        onHover: _cache[4] || (_cache[4] = (val) => $setup.rangeHoverDate = val)
                      }, {
                        "date-cell": _withCtx((slotProps) => [
                          _renderSlot2(_ctx.$slots, "date-cell", _normalizeProps(_guardReactiveProps(slotProps)))
                        ]),
                        _: 3
                        /* FORWARDED */
                      }, 8, ["date", "selected-date", "selection-mode", "range-state", "disabled-date", "first-day-of-week", "cell-shape", "cell-render"])) : $setup.currentView === "month" ? (_openBlock5(), _createBlock($setup["MonthTable"], {
                        key: 1,
                        date: $setup.innerDate,
                        "selected-date": $setup.parsedSelectedDate,
                        "range-state": $setup.parsedRangeState,
                        "disabled-date": _ctx.disabledDate,
                        "cell-shape": _ctx.cellShape,
                        onSelect: $setup.handleSelect,
                        onHover: _cache[5] || (_cache[5] = (val) => $setup.rangeHoverDate = val)
                      }, null, 8, ["date", "selected-date", "range-state", "disabled-date", "cell-shape"])) : $setup.currentView === "year" ? (_openBlock5(), _createBlock($setup["YearTable"], {
                        key: 2,
                        date: $setup.innerDate,
                        "selected-date": $setup.parsedSelectedDate,
                        "range-state": $setup.parsedRangeState,
                        "disabled-date": _ctx.disabledDate,
                        "cell-shape": _ctx.cellShape,
                        onSelect: $setup.handleSelect,
                        onHover: _cache[6] || (_cache[6] = (val) => $setup.rangeHoverDate = val)
                      }, null, 8, ["date", "selected-date", "range-state", "disabled-date", "cell-shape"])) : $setup.currentView === "quarter" ? (_openBlock5(), _createBlock($setup["QuarterTable"], {
                        key: 3,
                        date: $setup.innerDate,
                        "selected-date": $setup.parsedSelectedDate,
                        "range-state": $setup.parsedRangeState,
                        "disabled-date": _ctx.disabledDate,
                        "cell-shape": _ctx.cellShape,
                        onSelect: $setup.handleSelect,
                        onHover: _cache[7] || (_cache[7] = (val) => $setup.rangeHoverDate = val)
                      }, null, 8, ["date", "selected-date", "range-state", "disabled-date", "cell-shape"])) : _createCommentVNode2("v-if", true)
                    ],
                    2
                    /* CLASS */
                  ),
                  _ctx.$slots.extra ? (_openBlock5(), _createElementBlock5(
                    "div",
                    {
                      key: 0,
                      class: _normalizeClass5($setup.ns.e("extra"))
                    },
                    [
                      _renderSlot2(_ctx.$slots, "extra")
                    ],
                    2
                    /* CLASS */
                  )) : _createCommentVNode2("v-if", true),
                  _ctx.presets.length > 0 ? (_openBlock5(), _createElementBlock5(
                    "div",
                    {
                      key: 1,
                      class: _normalizeClass5($setup.ns.e("presets"))
                    },
                    [
                      (_openBlock5(true), _createElementBlock5(
                        _Fragment5,
                        null,
                        _renderList5(_ctx.presets, (p) => {
                          return _openBlock5(), _createElementBlock5("button", {
                            key: p.label,
                            class: _normalizeClass5($setup.ns.e("preset-item")),
                            onClick: ($event) => $setup.handleSelect(typeof p.value === "function" ? p.value() : p.value)
                          }, _toDisplayString5(p.label), 11, _hoisted_6);
                        }),
                        128
                        /* KEYED_FRAGMENT */
                      ))
                    ],
                    2
                    /* CLASS */
                  )) : _createCommentVNode2("v-if", true),
                  $setup.shouldShowFooter ? (_openBlock5(), _createElementBlock5(
                    "div",
                    {
                      key: 2,
                      class: _normalizeClass5($setup.ns.e("footer"))
                    },
                    [
                      _renderSlot2(_ctx.$slots, "footer", {}, () => [
                        _ctx.type.includes("datetime") && !$setup.isRange ? (_openBlock5(), _createElementBlock5(
                          "div",
                          {
                            key: 0,
                            class: _normalizeClass5($setup.ns.e("footer-time"))
                          },
                          _toDisplayString5($setup.dayjs(_ctx.modelValue || /* @__PURE__ */ new Date()).format($setup.props.timeFormat || "HH:mm:ss")),
                          3
                          /* TEXT, CLASS */
                        )) : _createCommentVNode2("v-if", true),
                        _createElementVNode5(
                          "div",
                          {
                            class: _normalizeClass5($setup.ns.e("footer-btns"))
                          },
                          [
                            $setup.isRange || _ctx.type.includes("datetime") ? (_openBlock5(), _createElementBlock5(
                              "button",
                              {
                                key: 0,
                                class: _normalizeClass5($setup.ns.e("footer-btn")),
                                onClick: _cache[8] || (_cache[8] = ($event) => $setup.visible = false)
                              },
                              _toDisplayString5($setup.t("datepicker.cancel")),
                              3
                              /* TEXT, CLASS */
                            )) : _createCommentVNode2("v-if", true),
                            _createElementVNode5(
                              "button",
                              {
                                class: _normalizeClass5([$setup.ns.e("footer-btn"), $setup.ns.e("footer-btn--confirm")]),
                                onClick: $setup.handleConfirmClick
                              },
                              _toDisplayString5($setup.t("datepicker.confirm")),
                              3
                              /* TEXT, CLASS */
                            )
                          ],
                          2
                          /* CLASS */
                        )
                      ])
                    ],
                    2
                    /* CLASS */
                  )) : _createCommentVNode2("v-if", true)
                ],
                6
                /* CLASS, STYLE */
              )) : _createCommentVNode2("v-if", true)
            ]),
            _: 3
            /* FORWARDED */
          }, 8, ["name"])
        ]),
        _: 3
        /* FORWARDED */
      }, 8, ["disabled"]))
    ],
    38
    /* CLASS, STYLE, NEED_HYDRATION */
  );
}
var __sfc__5 = /* @__PURE__ */ Object.assign({
  name: "YhDatePicker"
}, {
  __name: "date-picker",
  props: datePickerProps,
  emits: ["update:modelValue", "change", "focus", "blur", "clear", "confirm", "panel-change", "visible-change"],
  setup(__props, { expose: __expose, emit: __emit }) {
    __expose();
    const props = __props;
    const emit = __emit;
    const ns = useNamespace("date-picker");
    const { t, locale: locale143 } = useLocale();
    const { form, formItem, validate: triggerValidate } = useFormItem();
    const { globalSize } = useConfig();
    const { themeStyle } = useComponentTheme(
      "date-picker",
      computed15(() => props.themeOverrides)
    );
    const visible = ref12(props.panelOnly);
    const hovering = ref12(false);
    const getInitialView = (type) => {
      if (type.includes("year")) return "year";
      if (type.includes("month")) return "month";
      if (type.includes("quarter")) return "quarter";
      if (type === "week") return "date";
      return "date";
    };
    const currentView = ref12(getInitialView(props.type));
    const innerDate = ref12(/* @__PURE__ */ new Date());
    const rangeHoverDate = ref12(null);
    const wrapperRef = ref12();
    const isRange = computed15(() => props.type.includes("range"));
    const selectSize = computed15(
      () => props.size || (formItem == null ? void 0 : formItem.size) || (form == null ? void 0 : form.size) || globalSize.value || "default"
    );
    const getFormat = () => {
      if (props.format) return props.format;
      return DEFAULT_FORMATS[props.type] || "YYYY-MM-DD";
    };
    const displayValue = computed15(() => {
      if (isRange.value) return "";
      if (!props.modelValue || props.modelValue === "") return "";
      const dateVal = Array.isArray(props.modelValue) ? props.modelValue[0] : props.modelValue;
      if (!dateVal) return "";
      const result = formatDate(dateVal, getFormat());
      return result === "Invalid Date" ? "" : result;
    });
    const rangeDisplayValue = computed15(() => {
      if (!isRange.value || !Array.isArray(props.modelValue)) return ["", ""];
      const fmt = getFormat();
      const [start, end] = props.modelValue;
      return [start ? formatDate(start, fmt) : "", end ? formatDate(end, fmt) : ""];
    });
    const parsedSelectedDate = computed15(() => {
      const val = props.modelValue;
      if (val === "" || val === null || val === void 0) return null;
      if (Array.isArray(val)) {
        return val.map((v) => v && v !== "" ? stdin_default2(v).toDate() : null).filter((v) => v !== null);
      }
      const d2 = stdin_default2(val);
      return d2.isValid() ? d2.toDate() : null;
    });
    const parsedRangeState = computed15(() => {
      if (!isRange.value) return void 0;
      const val = props.modelValue;
      const from = Array.isArray(val) && val[0] ? stdin_default2(val[0]).toDate() : null;
      const to = Array.isArray(val) && val[1] ? stdin_default2(val[1]).toDate() : null;
      return {
        from,
        to,
        hovering: rangeHoverDate.value
      };
    });
    const wrapperClasses = computed15(() => [
      ns.b(),
      ns.m(selectSize.value),
      ns.is("disabled", props.disabled),
      ns.is("focused", visible.value),
      ns.is("range", isRange.value),
      ns.is("panel-only", props.panelOnly),
      ns.m(props.status)
    ]);
    const monthKeys = [
      "jan",
      "feb",
      "mar",
      "apr",
      "may",
      "jun",
      "jul",
      "aug",
      "sep",
      "oct",
      "nov",
      "dec"
    ];
    const headerLabel = computed15(() => {
      const d2 = stdin_default2(innerDate.value);
      const dateLocale = locale143.value.yh.datepicker;
      if (currentView.value === "year") {
        const start = Math.floor(d2.year() / 10) * 10;
        return `${start} - ${start + 9}`;
      }
      if (currentView.value === "month" || currentView.value === "quarter") {
        return dateLocale.monthBeforeYear ? d2.format("YYYY") : `${d2.year()}${dateLocale.year || ""}`;
      }
      const monthName = dateLocale.months[monthKeys[d2.month()]];
      if (!dateLocale.monthBeforeYear) {
        return `${d2.year()}${dateLocale.year || ""}${monthName}`;
      }
      return `${monthName} ${d2.year()}`;
    });
    const moveMonth = (offset) => {
      innerDate.value = stdin_default2(innerDate.value).add(offset, "month").toDate();
    };
    const moveYear = (offset) => {
      const step = currentView.value === "year" ? 10 : 1;
      innerDate.value = stdin_default2(innerDate.value).add(offset * step, "year").toDate();
    };
    const handleHeaderClick = () => {
      if (currentView.value === "date") currentView.value = "month";
      else if (currentView.value === "month") currentView.value = "year";
    };
    const emitChange = (val) => {
      const fmt = props.valueFormat || "";
      let result = val;
      if (fmt && val) {
        if (Array.isArray(val)) {
          result = [val[0] ? formatDate(val[0], fmt) : null, val[1] ? formatDate(val[1], fmt) : null];
        } else {
          result = formatDate(val, fmt);
        }
      }
      emit("update:modelValue", result);
      emit("change", result);
      if (props.validateEvent) triggerValidate("change");
    };
    const handleSelect = (val) => {
      if (Array.isArray(val)) {
        if (isRange.value) emitChange([val[0], val[1]]);
        else emitChange(val[0]);
        if (!props.panelOnly) visible.value = false;
        return;
      }
      let targetDate;
      if (typeof val === "number") {
        if (currentView.value === "year") {
          targetDate = stdin_default2(innerDate.value).year(val).toDate();
          if (props.type.includes("year")) {
            performFinalSelect(targetDate);
          } else {
            innerDate.value = targetDate;
            currentView.value = "month";
          }
        } else if (currentView.value === "month") {
          targetDate = stdin_default2(innerDate.value).month(val).toDate();
          if (props.type.includes("month")) {
            performFinalSelect(targetDate);
          } else {
            innerDate.value = targetDate;
            currentView.value = "date";
          }
        } else if (currentView.value === "quarter") {
          targetDate = stdin_default2(innerDate.value).month((val - 1) * 3).toDate();
          performFinalSelect(targetDate);
        }
      } else {
        performFinalSelect(val);
      }
    };
    const performFinalSelect = (date) => {
      if (isRange.value) {
        const current = props.modelValue || [null, null];
        if (!current[0] || current[0] && current[1]) {
          emit("update:modelValue", [date, null]);
        } else {
          let start = stdin_default2(current[0]).toDate();
          let end = date;
          if (stdin_default2(end).isBefore(stdin_default2(start))) {
            if (props.orderOnConfirm) [start, end] = [end, start];
            else {
              start = date;
              end = null;
            }
          }
          emitChange([start, end]);
          if (end && !props.panelOnly) visible.value = false;
        }
      } else {
        emitChange(date);
        if (!props.panelOnly && !props.type.includes("datetime")) {
          visible.value = false;
        }
      }
    };
    const dropdownStyle = ref12({});
    const updatePosition = () => {
      if (!wrapperRef.value || !props.teleported || props.panelOnly) return;
      const rect = wrapperRef.value.getBoundingClientRect();
      const styles = window.getComputedStyle(wrapperRef.value);
      const primary = styles.getPropertyValue("--yh-color-primary").trim();
      const primaryRgb = styles.getPropertyValue("--yh-color-primary-rgb").trim();
      const primaryLight9 = styles.getPropertyValue("--yh-color-primary-light-9").trim();
      dropdownStyle.value = __spreadProps(__spreadValues2({}, themeStyle.value), {
        position: "fixed",
        top: `${rect.bottom + 4}px`,
        left: `${rect.left}px`,
        zIndex: "2000",
        "--yh-color-primary": primary,
        "--yh-color-primary-rgb": primaryRgb,
        "--yh-color-primary-light-9": primaryLight9
      });
    };
    const syncInnerDate = () => {
      const modelVal = Array.isArray(props.modelValue) ? props.modelValue[0] : props.modelValue;
      const defaultVal = Array.isArray(props.defaultValue) ? props.defaultValue[0] : props.defaultValue;
      if (modelVal && stdin_default2(modelVal).isValid()) {
        innerDate.value = stdin_default2(modelVal).toDate();
      } else if (defaultVal && stdin_default2(defaultVal).isValid()) {
        innerDate.value = stdin_default2(defaultVal).toDate();
      } else {
        innerDate.value = /* @__PURE__ */ new Date();
      }
    };
    watch4(visible, (val) => {
      if (val) {
        currentView.value = getInitialView(props.type);
        updatePosition();
        syncInnerDate();
      }
    });
    const handleClear = (e) => {
      e.stopPropagation();
      emitChange(null);
      emit("clear");
    };
    const togglePanel = (e) => {
      if (props.disabled || props.readonly || props.panelOnly) return;
      if (e) e.stopPropagation();
      visible.value = !visible.value;
    };
    const handleOutsideClick = (e) => {
      var _a2;
      if (!visible.value || props.panelOnly) return;
      const target = e.target;
      if ((_a2 = wrapperRef.value) == null ? void 0 : _a2.contains(target)) return;
      const poppers = document.querySelectorAll(`.${ns.e("panel")}`);
      for (const p of poppers) {
        if (p.contains(target)) return;
      }
      visible.value = false;
    };
    const shouldShowFooter = computed15(() => {
      if (props.showFooter === false) return false;
      return props.type.includes("datetime") || isRange.value || props.presets.length > 0;
    });
    const handleConfirmClick = () => {
      emit("confirm", props.modelValue);
      visible.value = false;
    };
    onMounted3(() => {
      syncInnerDate();
      if (!props.panelOnly) {
        window.addEventListener("click", handleOutsideClick, true);
        if (props.teleported) {
          window.addEventListener("scroll", updatePosition, true);
          window.addEventListener("resize", updatePosition);
        }
      }
    });
    onBeforeUnmount2(() => {
      window.removeEventListener("click", handleOutsideClick, true);
      window.removeEventListener("scroll", updatePosition, true);
      window.removeEventListener("resize", updatePosition);
    });
    const __returned__ = { props, emit, ns, t, locale: locale143, form, formItem, triggerValidate, globalSize, themeStyle, visible, hovering, getInitialView, currentView, innerDate, rangeHoverDate, wrapperRef, isRange, selectSize, getFormat, displayValue, rangeDisplayValue, parsedSelectedDate, parsedRangeState, wrapperClasses, monthKeys, headerLabel, moveMonth, moveYear, handleHeaderClick, emitChange, handleSelect, performFinalSelect, dropdownStyle, updatePosition, syncInnerDate, handleClear, togglePanel, handleOutsideClick, shouldShowFooter, handleConfirmClick, ref: ref12, computed: computed15, watch: watch4, onMounted: onMounted3, onBeforeUnmount: onBeforeUnmount2, get useNamespace() {
      return useNamespace;
    }, get useFormItem() {
      return useFormItem;
    }, get useLocale() {
      return useLocale;
    }, get useComponentTheme() {
      return useComponentTheme;
    }, get useConfig() {
      return useConfig;
    }, DateTable: stdin_default3, MonthTable: stdin_default4, YearTable: stdin_default5, QuarterTable: stdin_default6, get datePickerProps() {
      return datePickerProps;
    }, get DEFAULT_FORMATS() {
      return DEFAULT_FORMATS;
    }, get formatDate() {
      return formatDate;
    }, get dayjs() {
      return stdin_default2;
    } };
    Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
    return __returned__;
  }
});
__sfc__5.render = render5;
var stdin_default7 = __sfc__5;
export {
  stdin_default7 as default
};
