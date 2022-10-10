import { ref } from "vue";
import { defineStore } from "pinia";

export const useAlertStore = defineStore("alert", () => {
  const isShow = ref(false);
  const title = ref("");
  const callbackFn = ref(null);
  const showAlert = (val = true, text = "", callback = null) => {
    isShow.value = val;
    title.value = text;
    callbackFn.value = callback;
  };

  return { isShow, title, callbackFn, showAlert };
});
