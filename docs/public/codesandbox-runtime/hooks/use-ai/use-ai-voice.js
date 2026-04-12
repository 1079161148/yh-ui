import { ref, onUnmounted, shallowRef } from "vue";
function useAiVoice(options = {}) {
  const {
    language = "zh-CN",
    interimResults = true,
    continuous = false,
    vad = true,
    vadThreshold = 2e3,
    volumeThreshold = 0.05,
    waveCount = 20,
    useSTT = true
  } = options;
  const isRecording = ref(false);
  const transcript = ref("");
  const interimTranscript = ref("");
  const volume = ref(0);
  const amplitudes = ref(new Array(waveCount).fill(5));
  const audioBlob = ref(null);
  const recognition = shallowRef(null);
  const audioContext = shallowRef(null);
  const analyser = shallowRef(null);
  const stream = shallowRef(null);
  const mediaRecorder = shallowRef(null);
  let chunks = [];
  let animationId = null;
  let silenceStart = null;
  const _window = typeof window !== "undefined" ? window : null;
  const SpeechRecognition = (_window == null ? void 0 : _window.SpeechRecognition) || (_window == null ? void 0 : _window.webkitSpeechRecognition);
  const sttSupported = !!SpeechRecognition;
  const initMediaRecorder = (mediaStream) => {
    chunks = [];
    const recorder = new MediaRecorder(mediaStream);
    recorder.ondataavailable = (e) => {
      if (e.data.size > 0) chunks.push(e.data);
    };
    recorder.onstop = () => {
      var _a;
      const blob = chunks.length > 0 ? new Blob(chunks, { type: "audio/webm" }) : null;
      audioBlob.value = blob;
      if (!isRecording.value) {
        (_a = options.onStop) == null ? void 0 : _a.call(options, transcript.value, blob);
      }
    };
    mediaRecorder.value = recorder;
  };
  const initRecognition = () => {
    if (!sttSupported || !useSTT) return;
    const recognitionInstance = new SpeechRecognition();
    recognitionInstance.lang = language;
    recognitionInstance.interimResults = interimResults;
    recognitionInstance.continuous = continuous;
    recognitionInstance.onresult = (event) => {
      var _a, _b;
      let currentInterim = "";
      for (let i = event.resultIndex; i < event.results.length; ++i) {
        if (event.results[i].isFinal) {
          transcript.value += event.results[i][0].transcript;
          (_a = options.onResult) == null ? void 0 : _a.call(options, transcript.value);
        } else {
          currentInterim += event.results[i][0].transcript;
        }
      }
      interimTranscript.value = currentInterim;
      (_b = options.onPartialResult) == null ? void 0 : _b.call(options, currentInterim);
    };
    recognitionInstance.onerror = (event) => {
      var _a;
      if (event.error !== "no-speech" && event.error !== "aborted") {
        (_a = options.onError) == null ? void 0 : _a.call(options, event);
      }
    };
    recognition.value = recognitionInstance;
  };
  const initAudioAnalyzer = async (mediaStream) => {
    var _a;
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      audioContext.value = new AudioCtx();
      if (audioContext.value.state === "suspended") {
        await audioContext.value.resume();
      }
      analyser.value = audioContext.value.createAnalyser();
      analyser.value.fftSize = 256;
      const source = audioContext.value.createMediaStreamSource(mediaStream);
      source.connect(analyser.value);
      const bufferLength = analyser.value.frequencyBinCount;
      const dataArray = new Uint8Array(bufferLength);
      const process = () => {
        if (!isRecording.value) {
          amplitudes.value = new Array(waveCount).fill(5);
          volume.value = 0;
          return;
        }
        animationId = requestAnimationFrame(process);
        analyser.value.getByteFrequencyData(dataArray);
        let total = 0;
        for (let i = 0; i < bufferLength; i++) total += dataArray[i];
        const avg = total / bufferLength;
        volume.value = Math.min(100, avg / 128 * 100);
        const step = Math.floor(bufferLength / waveCount);
        const newAmps = [];
        for (let i = 0; i < waveCount; i++) {
          const val = dataArray[i * step];
          newAmps.push(6 + val / 255 * 34);
        }
        amplitudes.value = newAmps;
        if (vad) {
          const normalizedVol = avg / 255;
          if (normalizedVol < volumeThreshold) {
            if (silenceStart === null) silenceStart = Date.now();
            else if (Date.now() - silenceStart > vadThreshold) {
              stop();
            }
          } else {
            silenceStart = null;
          }
        }
      };
      process();
    } catch (err) {
      (_a = options.onError) == null ? void 0 : _a.call(options, err);
    }
  };
  const start = async () => {
    var _a, _b, _c, _d;
    if (stream.value) return;
    try {
      transcript.value = "";
      interimTranscript.value = "";
      audioBlob.value = null;
      silenceStart = null;
      stream.value = await navigator.mediaDevices.getUserMedia({ audio: true });
      isRecording.value = true;
      initMediaRecorder(stream.value);
      initRecognition();
      await initAudioAnalyzer(stream.value);
      (_a = mediaRecorder.value) == null ? void 0 : _a.start(1e3);
      (_b = recognition.value) == null ? void 0 : _b.start();
      (_c = options.onStart) == null ? void 0 : _c.call(options);
    } catch (err) {
      isRecording.value = false;
      if (stream.value) {
        stream.value.getTracks().forEach((t) => t.stop());
        stream.value = null;
      }
      console.error("[yh-ui/hooks] useAiVoice start failed:", err);
      (_d = options.onError) == null ? void 0 : _d.call(options, err);
    }
  };
  const stop = () => {
    if (!stream.value) return;
    isRecording.value = false;
    if (mediaRecorder.value && mediaRecorder.value.state !== "inactive") {
      try {
        mediaRecorder.value.stop();
      } catch (e) {
      }
    }
    if (recognition.value) {
      try {
        recognition.value.stop();
      } catch (e) {
      }
    }
    if (stream.value) {
      stream.value.getTracks().forEach((track) => track.stop());
      stream.value = null;
    }
    cleanup();
  };
  const cancel = () => {
    if (!isRecording.value && !stream.value) return;
    isRecording.value = false;
    if (recognition.value) {
      try {
        recognition.value.abort();
      } catch (e) {
      }
    }
    if (mediaRecorder.value && mediaRecorder.value.state !== "inactive") {
      try {
        mediaRecorder.value.stop();
      } catch (e) {
      }
    }
    if (stream.value) {
      stream.value.getTracks().forEach((track) => track.stop());
      stream.value = null;
    }
    cleanup();
  };
  const cleanup = () => {
    if (animationId) {
      cancelAnimationFrame(animationId);
      animationId = null;
    }
    if (audioContext.value && audioContext.value.state !== "closed") {
      audioContext.value.close().catch((_err) => {
      });
      audioContext.value = null;
    }
    amplitudes.value = new Array(waveCount).fill(5);
    volume.value = 0;
  };
  onUnmounted(() => {
    if (isRecording.value) stop();
    else cleanup();
  });
  return {
    isRecording,
    transcript,
    interimTranscript,
    amplitudes,
    volume,
    audioBlob,
    start,
    stop,
    cancel,
    sttSupported
  };
}
export {
  useAiVoice
};
