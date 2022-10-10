<script setup>
import { RouterView } from "vue-router";
import AlertPopup from "@/components/AlertPopup.vue";
</script>

<template>
  <div class="container">
    <RouterView />
  </div>
  <AlertPopup></AlertPopup>
</template>

<style></style>
