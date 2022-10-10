<script setup>
import ModalPopup from "@/components/ModalPopup.vue";
import { useAlertStore } from "@/stores/alert.js";

const alertStore = useAlertStore();
const confirm = () => {
  if (alertStore.callbackFn) {
    alertStore.callbackFn();
  }
  alertStore.showAlert(false);
};
</script>

<template>
  <ModalPopup v-model="alertStore.isShow">
    <div v-html="alertStore.title"></div>
    <div class="text-right">
      <button type="button" class="btn btn-primary mx-1" @click="confirm">
        確認
      </button>
    </div>
  </ModalPopup>
</template>
