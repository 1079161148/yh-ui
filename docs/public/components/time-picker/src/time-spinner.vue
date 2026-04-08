<script setup>
import { ref, computed, watch, nextTick, onMounted } from "vue";
import { useNamespace } from "@yh-ui/hooks";
import { generateNumberList } from "./time-picker";
defineOptions({
  name: "YhTimeSpinner"
});
const props = defineProps({
  modelValue: { type: Object, required: true },
  showSeconds: { type: Boolean, required: false, default: true },
  arrowControl: { type: Boolean, required: false, default: false },
  hourStep: { type: Number, required: false, default: 1 },
  minuteStep: { type: Number, required: false, default: 1 },
  secondStep: { type: Number, required: false, default: 1 },
  disabledTime: { type: Object, required: false, default: void 0 },
  use12Hours: { type: Boolean, required: false, default: false },
  hourOptions: { type: Array, required: false, default: void 0 },
  minuteOptions: { type: Array, required: false, default: void 0 },
  secondOptions: { type: Array, required: false, default: void 0 }
});
const emit = defineEmits(["update:modelValue", "change"]);
const ns = useNamespace("time-spinner");
const hoursRef = ref();
const minutesRef = ref();
const secondsRef = ref();
const ampmRef = ref();
const ITEM_HEIGHT = 32;
const disabledHours = computed(() => {
  return props.disabledTime?.disabledHours?.() || [];
});
const disabledMinutes = computed(() => {
  return props.disabledTime?.disabledMinutes?.(props.modelValue.hours) || [];
});
const disabledSeconds = computed(() => {
  return props.disabledTime?.disabledSeconds?.(props.modelValue.hours, props.modelValue.minutes) || [];
});
const hoursList = computed(() => {
  const max = props.use12Hours ? 12 : 23;
  const list = generateNumberList(max, props.hourStep, disabledHours.value, props.hourOptions);
  if (props.use12Hours) {
    return list.map((item) => ({
      ...item,
      value: item.value === 0 ? 12 : item.value
    }));
  }
  return list;
});
const minutesList = computed(() => {
  return generateNumberList(59, props.minuteStep, disabledMinutes.value, props.minuteOptions);
});
const secondsList = computed(() => {
  return generateNumberList(59, props.secondStep, disabledSeconds.value, props.secondOptions);
});
const ampmList = computed(() => [
  { value: "AM", label: "AM", disabled: false },
  { value: "PM", label: "PM", disabled: false }
]);
const currentAmpm = computed(() => props.modelValue.hours >= 12 ? "PM" : "AM");
const formatNumber = (n) => String(n).padStart(2, "0");
const scrollToItem = (container, index, smooth = false) => {
  if (!container) return;
  const scrollTop = index * ITEM_HEIGHT;
  if (smooth && typeof container.scrollTo === "function") {
    container.scrollTo({ top: scrollTop, behavior: "smooth" });
  } else {
    container.scrollTop = scrollTop;
  }
};
const adjustScrollPosition = (container) => {
  if (!container) return;
  const scrollTop = container.scrollTop;
  const index = Math.round(scrollTop / ITEM_HEIGHT);
  scrollToItem(container, index, true);
};
const handleScrollEnd = (type, container) => {
  if (!container) return;
  const scrollTop = container.scrollTop;
  const index = Math.round(scrollTop / ITEM_HEIGHT);
  if (type === "ampm") {
    const isAM = index === 0;
    const newHours = isAM ? props.modelValue.hours >= 12 ? props.modelValue.hours - 12 : props.modelValue.hours : props.modelValue.hours < 12 ? props.modelValue.hours + 12 : props.modelValue.hours;
    if (newHours !== props.modelValue.hours) {
      const newState = { ...props.modelValue, hours: newHours };
      emit("update:modelValue", newState);
      emit("change", newState);
    }
  } else {
    const list = type === "hours" ? hoursList.value : type === "minutes" ? minutesList.value : secondsList.value;
    if (index >= 0 && index < list.length) {
      const item = list[index];
      if (item && !item.disabled) {
        let value = item.value;
        if (type === "hours" && props.use12Hours) {
          const isPM = props.modelValue.hours >= 12;
          value = value === 12 ? isPM ? 12 : 0 : isPM ? value + 12 : value;
        }
        if (props.modelValue[type] !== value) {
          const newState = { ...props.modelValue, [type]: value };
          emit("update:modelValue", newState);
          emit("change", newState);
        }
      }
    }
  }
};
let scrollTimer = null;
const handleScroll = (type, event) => {
  const container = event.target;
  if (scrollTimer) {
    clearTimeout(scrollTimer);
  }
  scrollTimer = setTimeout(() => {
    adjustScrollPosition(container);
    handleScrollEnd(type, container);
  }, 100);
};
const handleArrowClick = (type, direction) => {
  const list = type === "hours" ? hoursList.value : type === "minutes" ? minutesList.value : secondsList.value;
  let currentValue = props.modelValue[type];
  if (type === "hours" && props.use12Hours) {
    currentValue = currentValue % 12 || 12;
  }
  const currentIndex = list.findIndex((item) => item.value === currentValue);
  let newIndex = direction === "up" ? currentIndex - 1 : currentIndex + 1;
  if (newIndex < 0) newIndex = list.length - 1;
  if (newIndex >= list.length) newIndex = 0;
  let attempts = 0;
  while (list[newIndex]?.disabled && attempts < list.length) {
    newIndex = direction === "up" ? newIndex - 1 : newIndex + 1;
    if (newIndex < 0) newIndex = list.length - 1;
    if (newIndex >= list.length) newIndex = 0;
    attempts++;
  }
  if (!list[newIndex]?.disabled) {
    let value = list[newIndex].value;
    if (type === "hours" && props.use12Hours) {
      const isPM = props.modelValue.hours >= 12;
      value = value === 12 ? isPM ? 12 : 0 : isPM ? value + 12 : value;
    }
    const newState = { ...props.modelValue, [type]: value };
    emit("update:modelValue", newState);
    emit("change", newState);
  }
};
const handleItemClick = (type, value, disabled) => {
  if (disabled) return;
  if (type === "ampm") {
    const isAM = value === "AM";
    const currentHours = props.modelValue.hours;
    let newHours = currentHours;
    if (isAM && currentHours >= 12) {
      newHours = currentHours - 12;
    } else if (!isAM && currentHours < 12) {
      newHours = currentHours + 12;
    }
    if (newHours !== currentHours) {
      const newState = { ...props.modelValue, hours: newHours };
      emit("update:modelValue", newState);
      emit("change", newState);
    }
  } else {
    let numValue = value;
    if (type === "hours" && props.use12Hours) {
      const isPM = props.modelValue.hours >= 12;
      numValue = numValue === 12 ? isPM ? 12 : 0 : isPM ? numValue + 12 : numValue;
    }
    if (props.modelValue[type] !== numValue) {
      const newState = { ...props.modelValue, [type]: numValue };
      emit("update:modelValue", newState);
      emit("change", newState);
    }
  }
};
const getCurrentIndex = (type) => {
  const list = type === "hours" ? hoursList.value : type === "minutes" ? minutesList.value : secondsList.value;
  let value = props.modelValue[type];
  if (type === "hours" && props.use12Hours) {
    value = value % 12 || 12;
  }
  return list.findIndex((item) => item.value === value);
};
const scrollToCurrentValues = (smooth = false) => {
  nextTick(() => {
    scrollToItem(hoursRef.value, getCurrentIndex("hours"), smooth);
    scrollToItem(minutesRef.value, getCurrentIndex("minutes"), smooth);
    if (props.showSeconds) {
      scrollToItem(secondsRef.value, getCurrentIndex("seconds"), smooth);
    }
    if (props.use12Hours) {
      scrollToItem(ampmRef.value, props.modelValue.hours >= 12 ? 1 : 0, smooth);
    }
  });
};
watch(
  () => props.modelValue,
  () => {
    scrollToCurrentValues(true);
  },
  { deep: true }
);
onMounted(() => {
  scrollToCurrentValues(false);
});
defineExpose({
  scrollToCurrentValues
});
</script>

<template>
  <div :class="ns.b()">
    <!-- 小时列 -->
    <div :class="ns.e('column')">
      <template v-if="arrowControl">
        <button :class="ns.e('arrow')" type="button" @click="handleArrowClick('hours', 'up')">
          <svg viewBox="0 0 1024 1024" width="1em" height="1em">
            <path
              fill="currentColor"
              d="M831.872 683.136L512 371.328 192.128 683.136a30.592 30.592 0 0 1-42.752 0 29.12 29.12 0 0 1 0-41.6l340.288-331.712a32 32 0 0 1 44.672 0l340.288 331.776a29.12 29.12 0 0 1 0 41.6 30.592 30.592 0 0 1-42.752 0z"
            />
          </svg>
        </button>
        <div :class="ns.e('value')">
          {{ formatNumber(use12Hours ? modelValue.hours % 12 || 12 : modelValue.hours) }}
        </div>
        <button :class="ns.e('arrow')" type="button" @click="handleArrowClick('hours', 'down')">
          <svg viewBox="0 0 1024 1024" width="1em" height="1em">
            <path
              fill="currentColor"
              d="M831.872 340.864L512 652.672 192.128 340.864a30.592 30.592 0 0 0-42.752 0 29.12 29.12 0 0 0 0 41.6L489.664 714.24a32 32 0 0 0 44.672 0l340.288-331.712a29.12 29.12 0 0 0 0-41.728 30.592 30.592 0 0 0-42.752 0z"
            />
          </svg>
        </button>
      </template>
      <template v-else>
        <div ref="hoursRef" :class="ns.e('list')" @scroll="handleScroll('hours', $event)">
          <div :class="ns.e('list-inner')">
            <div
              v-for="item in hoursList"
              :key="item.value"
              :class="[ns.e('item'), ns.is('selected', use12Hours ? (modelValue.hours % 12 || 12) === item.value : modelValue.hours === item.value), ns.is('disabled', item.disabled)]"
              @click="handleItemClick('hours', item.value, item.disabled)"
            >
              {{ formatNumber(item.value) }}
            </div>
          </div>
        </div>
      </template>
    </div>

    <!-- 分隔符 -->
    <div :class="ns.e('separator')">:</div>

    <!-- 分钟列 -->
    <div :class="ns.e('column')">
      <template v-if="arrowControl">
        <button :class="ns.e('arrow')" type="button" @click="handleArrowClick('minutes', 'up')">
          <svg viewBox="0 0 1024 1024" width="1em" height="1em">
            <path
              fill="currentColor"
              d="M831.872 683.136L512 371.328 192.128 683.136a30.592 30.592 0 0 1-42.752 0 29.12 29.12 0 0 1 0-41.6l340.288-331.712a32 32 0 0 1 44.672 0l340.288 331.776a29.12 29.12 0 0 1 0 41.6 30.592 30.592 0 0 1-42.752 0z"
            />
          </svg>
        </button>
        <div :class="ns.e('value')">{{ formatNumber(modelValue.minutes) }}</div>
        <button :class="ns.e('arrow')" type="button" @click="handleArrowClick('minutes', 'down')">
          <svg viewBox="0 0 1024 1024" width="1em" height="1em">
            <path
              fill="currentColor"
              d="M831.872 340.864L512 652.672 192.128 340.864a30.592 30.592 0 0 0-42.752 0 29.12 29.12 0 0 0 0 41.6L489.664 714.24a32 32 0 0 0 44.672 0l340.288-331.712a29.12 29.12 0 0 0 0-41.728 30.592 30.592 0 0 0-42.752 0z"
            />
          </svg>
        </button>
      </template>
      <template v-else>
        <div ref="minutesRef" :class="ns.e('list')" @scroll="handleScroll('minutes', $event)">
          <div :class="ns.e('list-inner')">
            <div
              v-for="item in minutesList"
              :key="item.value"
              :class="[ns.e('item'), ns.is('selected', modelValue.minutes === item.value), ns.is('disabled', item.disabled)]"
              @click="handleItemClick('minutes', item.value, item.disabled)"
            >
              {{ formatNumber(item.value) }}
            </div>
          </div>
        </div>
      </template>
    </div>

    <!-- 秒分隔符 -->
    <template v-if="showSeconds">
      <div :class="ns.e('separator')">:</div>

      <!-- 秒列 -->
      <div :class="ns.e('column')">
        <template v-if="arrowControl">
          <button :class="ns.e('arrow')" type="button" @click="handleArrowClick('seconds', 'up')">
            <svg viewBox="0 0 1024 1024" width="1em" height="1em">
              <path
                fill="currentColor"
                d="M831.872 683.136L512 371.328 192.128 683.136a30.592 30.592 0 0 1-42.752 0 29.12 29.12 0 0 1 0-41.6l340.288-331.712a32 32 0 0 1 44.672 0l340.288 331.776a29.12 29.12 0 0 1 0 41.6 30.592 30.592 0 0 1-42.752 0z"
              />
            </svg>
          </button>
          <div :class="ns.e('value')">{{ formatNumber(modelValue.seconds) }}</div>
          <button :class="ns.e('arrow')" type="button" @click="handleArrowClick('seconds', 'down')">
            <svg viewBox="0 0 1024 1024" width="1em" height="1em">
              <path
                fill="currentColor"
                d="M831.872 340.864L512 652.672 192.128 340.864a30.592 30.592 0 0 0-42.752 0 29.12 29.12 0 0 0 0 41.6L489.664 714.24a32 32 0 0 0 44.672 0l340.288-331.712a29.12 29.12 0 0 0 0-41.728 30.592 30.592 0 0 0-42.752 0z"
              />
            </svg>
          </button>
        </template>
        <template v-else>
          <div ref="secondsRef" :class="ns.e('list')" @scroll="handleScroll('seconds', $event)">
            <div :class="ns.e('list-inner')">
              <div
                v-for="item in secondsList"
                :key="item.value"
                :class="[ns.e('item'), ns.is('selected', modelValue.seconds === item.value), ns.is('disabled', item.disabled)]"
                @click="handleItemClick('seconds', item.value, item.disabled)"
              >
                {{ formatNumber(item.value) }}
              </div>
            </div>
          </div>
        </template>
      </div>
    </template>

    <!-- AM/PM 列 (12小时制) -->
    <template v-if="use12Hours && !arrowControl">
      <div :class="ns.e('column')">
        <div ref="ampmRef" :class="ns.e('list')" @scroll="handleScroll('ampm', $event)">
          <div :class="ns.e('list-inner')">
            <div
              v-for="item in ampmList"
              :key="item.value"
              :class="[ns.e('item'), ns.is('selected', currentAmpm === item.value), ns.is('disabled', item.disabled)]"
              @click="handleItemClick('ampm', item.value, item.disabled)"
            >
              {{ item.label }}
            </div>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<style>
.yh-time-spinner {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 8px 0;
}
.yh-time-spinner__column {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 60px;
  flex-shrink: 0;
}
.yh-time-spinner__list {
  height: 192px;
  width: 100%;
  overflow-y: auto;
  scroll-snap-type: y mandatory;
  scrollbar-width: none;
  -ms-overflow-style: none;
}
.yh-time-spinner__list::-webkit-scrollbar {
  display: none;
}
.yh-time-spinner__list-inner {
  padding: 80px 0;
}
.yh-time-spinner__item {
  box-sizing: border-box;
  height: 32px;
  width: 100%;
  line-height: 32px;
  text-align: center;
  font-size: 14px;
  font-variant-numeric: tabular-nums;
  font-feature-settings: "tnum";
  color: var(--yh-text-color-regular);
  cursor: pointer;
  scroll-snap-align: center;
  border-radius: 4px;
  margin: 0 auto;
  transition: background-color 0.15s ease, color 0.15s ease;
}
.yh-time-spinner__item:hover:not(.is-disabled):not(.is-selected) {
  background-color: var(--yh-time-picker-hover-bg);
}
.yh-time-spinner__item.is-selected {
  color: var(--yh-time-picker-active-color);
  background-color: var(--yh-time-picker-active-bg);
}
.yh-time-spinner__item.is-disabled {
  color: var(--yh-text-color-disabled);
  cursor: not-allowed;
}
.yh-time-spinner__separator {
  color: var(--yh-text-color-secondary);
  font-size: 16px;
  font-weight: 600;
  padding: 0 4px;
}
.yh-time-spinner__arrow {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border: none;
  background: transparent;
  cursor: pointer;
  color: var(--yh-text-color-regular);
  border-radius: 4px;
  transition: all 0.2s;
}
.yh-time-spinner__arrow:hover {
  background-color: var(--yh-fill-color-light);
  color: var(--yh-color-primary);
}
.yh-time-spinner__arrow svg {
  width: 14px;
  height: 14px;
}
.yh-time-spinner__value {
  font-size: 20px;
  font-weight: 600;
  color: var(--yh-text-color-primary);
  line-height: 40px;
  min-width: 40px;
  text-align: center;
}
</style>
