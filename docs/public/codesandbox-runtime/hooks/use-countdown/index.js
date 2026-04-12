import { ref, computed, onUnmounted } from "vue";
function useCountdown(options) {
  const { time, interval = 1e3, onFinish, onChange } = options;
  const remain = ref(time);
  const timer = ref(null);
  const isRunning = computed(() => timer.value !== null);
  const stop = () => {
    if (timer.value) {
      clearInterval(timer.value);
      timer.value = null;
    }
  };
  const start = () => {
    if (isRunning.value) return;
    if (remain.value <= 0) return;
    timer.value = setInterval(() => {
      remain.value -= interval;
      if (onChange) onChange(remain.value);
      if (remain.value <= 0) {
        remain.value = 0;
        stop();
        if (onFinish) onFinish();
      }
    }, interval);
  };
  const reset = (newTime) => {
    stop();
    remain.value = newTime !== void 0 ? newTime : time;
  };
  onUnmounted(() => {
    stop();
  });
  return {
    remain,
    isRunning,
    start,
    stop,
    reset
  };
}
export {
  useCountdown
};
