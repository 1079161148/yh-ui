"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.smartAddressProps = exports.smartAddressEmits = void 0;
const smartAddressProps = exports.smartAddressProps = {
  modelValue: {
    type: Object,
    default: () => ({
      name: "",
      phone: "",
      province: "",
      city: "",
      district: "",
      street: "",
      detail: ""
    })
  },
  showName: {
    type: Boolean,
    default: true
  },
  showPhone: {
    type: Boolean,
    default: true
  },
  showStreet: {
    type: Boolean,
    default: false
  },
  parsePlaceholder: {
    type: String,
    default: ""
  },
  required: {
    type: Boolean,
    default: false
  },
  disabled: {
    type: Boolean,
    default: false
  },
  parseButtonText: {
    type: String,
    default: ""
  },
  showParser: {
    type: Boolean,
    default: true
  },
  regionType: {
    type: String,
    default: "input"
  },
  regionOptions: {
    type: Array,
    default: () => []
  },
  labelField: {
    type: String,
    default: "label"
  },
  valueField: {
    type: String,
    default: "value"
  },
  childrenField: {
    type: String,
    default: "children"
  },
  labelPlacement: {
    type: String,
    default: "left"
  },
  parser: {
    type: Function,
    default: null
  },
  themeOverrides: {
    type: Object,
    default: () => ({})
  }
};
const smartAddressEmits = exports.smartAddressEmits = {
  "update:modelValue": val => val !== void 0,
  parsed: val => val !== void 0,
  change: val => val !== void 0
};