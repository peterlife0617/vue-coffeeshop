<script setup>
import { ref, onMounted, watch, toRefs } from "vue";
const props = defineProps({
  modelValue: {
    type: Boolean,
    default: true,
  },
});
const { modelValue } = toRefs(props);
const emits = defineEmits(["update:modelValue"]);
const modal = ref("modal");

const hideModal = () => {
  emits("update:modelValue", false);
};

onMounted(() => {
  modal.value.addEventListener("click", (event) => {
    if (event.target === modal.value) {
      emits("update:modelValue", false);
    }
  });
});

watch(
  modelValue,
  (newVal) => {
    const body = document.querySelector("body");
    let hasExistShow = false;
    [...document.querySelectorAll(".modal")].forEach((modal) => {
      if (modal.style.display === "none") {
        hasExistShow = true;
      }
    });

    if (!newVal && !hasExistShow) {
      body.style.overflow = "auto";
    } else {
      body.style.overflow = "hidden";
    }
  },
  {
    immediate: true,
  }
);
</script>

<template>
  <div class="modal" ref="modal" v-show="modelValue">
    <div class="modal-content">
      <button class="btn btn-icon btn-close" @click="hideModal">
        <i class="fa-solid fa-xmark"></i>
      </button>
      <div class="modal-body"><slot :hide-modal="hideModal"></slot></div>
      <div class="modal-footer">
        <slot name="footer" :hide-modal="hideModal"></slot>
      </div>
    </div>
  </div>
</template>
