const PHONE_RE = /(?:\+?\d{1,4}[-.\s]?)?1[3-9]\d{9}|(?:\+?\d{1,4}[-.\s]?)?\d{7,14}/;
const CN_NAME_RE = /[\u4e00-\u9fa5]{2,5}/;
const EN_NAME_RE = /\b[A-Za-z]+(?:\s[A-Z a-z]+){1,2}\b/;
const DEFAULT_PROVINCE_KW = ["\u7701", "\u81EA\u6CBB\u533A", "\u7279\u522B\u884C\u653F\u533A", "Province", "State"];
const DEFAULT_CITY_KW = ["\u5E02", "\u5DDE", "\u76DF", "City", "Prefecture"];
const DEFAULT_DISTRICT_KW = ["\u533A", "\u53BF", "\u65D7", "District", "County", "Township"];
const DEFAULT_STREET_KW = ["\u8857\u9053", "\u9547", "\u4E61", "\u6751", "Street", "Road", "Ave", "Lane"];
function parseAddress(raw, options = {}) {
  let text = raw.replace(/\r?\n/g, " ").replace(/\s{2,}/g, " ").trim();
  const result = {
    name: "",
    phone: "",
    province: "",
    city: "",
    district: "",
    street: "",
    detail: "",
    raw
  };
  const phoneMatch = text.match(PHONE_RE);
  let textAfterPhone = text;
  if (phoneMatch) {
    result.phone = phoneMatch[0];
    const phoneIdx = text.indexOf(phoneMatch[0]);
    const textBeforePhone = text.slice(0, phoneIdx).trim();
    if (textBeforePhone && textBeforePhone.length <= 20) {
      if (!/\d/.test(textBeforePhone)) {
        result.name = textBeforePhone;
      }
    }
    textAfterPhone = text.replace(phoneMatch[0], " ").trim();
  }
  let remaining = textAfterPhone;
  if (!result.name) {
    const namePrefixMatch = remaining.match(
      /^([A-Za-z\s]{2,15}|[\u4e00-\u9fa5]{2,5})[,，\s:：\-_|]/
    );
    if (namePrefixMatch) {
      result.name = namePrefixMatch[1].trim();
      remaining = remaining.slice(namePrefixMatch[0].length).trim();
    }
  } else {
    if (remaining.startsWith(result.name)) {
      remaining = remaining.slice(result.name.length).trim();
      remaining = remaining.replace(/^[,，\s:：\-_|]+/, "").trim();
    }
  }
  if (remaining.includes(",") || remaining.includes("\uFF0C")) {
    remaining = parseByDelimiter(remaining, result, options);
  } else {
    remaining = extractRegion(remaining, result, options);
  }
  result.detail = remaining.replace(/^[;；,，\s]+/, "").trim();
  if (!result.name) {
    const potentialName = remaining.match(EN_NAME_RE) || remaining.match(CN_NAME_RE);
    if (potentialName && remaining.indexOf(potentialName[0]) < 10) {
      result.name = potentialName[0];
    }
  }
  return result;
}
function parseByDelimiter(text, result, options) {
  const segments = text.split(/[,，]/).map((s) => s.trim()).filter(Boolean);
  const pK = options.provinceKeywords || DEFAULT_PROVINCE_KW;
  const cK = options.cityKeywords || DEFAULT_CITY_KW;
  const dK = options.districtKeywords || DEFAULT_DISTRICT_KW;
  const sK = options.streetKeywords || DEFAULT_STREET_KW;
  const matchedIndices = /* @__PURE__ */ new Set();
  segments.forEach((seg, idx) => {
    if (dK.some((k) => seg.includes(k)) && !result.district) {
      result.district = seg;
      matchedIndices.add(idx);
    } else if (cK.some((k) => seg.includes(k)) && !result.city) {
      result.city = seg;
      matchedIndices.add(idx);
    } else if (pK.some((k) => seg.includes(k)) && !result.province) {
      result.province = seg;
      matchedIndices.add(idx);
    } else if (sK.some((k) => seg.includes(k)) && !result.street) {
      result.street = seg;
      matchedIndices.add(idx);
    }
  });
  segments.forEach((seg, idx) => {
    if (matchedIndices.has(idx)) return;
    if (idx > 0 && matchedIndices.has(idx - 1) && segments[idx - 1] === result.district && !result.city) {
      result.city = seg;
      matchedIndices.add(idx);
    } else if (idx > 0 && matchedIndices.has(idx - 1) && segments[idx - 1] === result.city && !result.province) {
      result.province = seg;
      matchedIndices.add(idx);
    } else if (idx === 0 && segments.length >= 2 && matchedIndices.has(1) && !result.city) {
      if (pK.some((k) => segments[1].includes(k)) && !result.province && !result.city) {
        result.city = seg;
        matchedIndices.add(idx);
      } else if (cK.some((k) => segments[1].includes(k)) && !result.city) {
        if (pK.some((k) => segments[1].includes(k)) && !result.city) {
          result.city = seg;
          matchedIndices.add(idx);
        }
      }
    }
  });
  const remainingSegments = segments.filter((_, idx) => !matchedIndices.has(idx));
  return remainingSegments.join(", ");
}
function extractRegion(text, result, options) {
  let remaining = text;
  const pK = options.provinceKeywords || DEFAULT_PROVINCE_KW;
  const cK = options.cityKeywords || DEFAULT_CITY_KW;
  const dK = options.districtKeywords || DEFAULT_DISTRICT_KW;
  const sK = options.streetKeywords || DEFAULT_STREET_KW;
  const processSuffix = (field, keywords, maxWords) => {
    for (const kw of keywords) {
      const idx = remaining.indexOf(kw);
      if (idx >= 0 && idx <= maxWords) {
        result[field] = remaining.slice(0, idx + kw.length);
        remaining = remaining.slice(idx + kw.length).trim();
        return true;
      }
    }
    return false;
  };
  processSuffix("province", pK, 12);
  processSuffix("city", cK, 12);
  processSuffix("district", dK, 12);
  processSuffix("street", sK, 15);
  return remaining;
}
function formatAddress(parsed) {
  return [parsed.province, parsed.city, parsed.district, parsed.street, parsed.detail].filter(Boolean).join("");
}
export {
  formatAddress,
  parseAddress
};
