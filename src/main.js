import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";

import "./styles/main.scss";

// fontawesome-free
import "@fortawesome/fontawesome-free/scss/fontawesome.scss";
import "@fortawesome/fontawesome-free/scss/brands.scss";
import "@fortawesome/fontawesome-free/scss/regular.scss";
import "@fortawesome/fontawesome-free/scss/solid.scss";
import "@fortawesome/fontawesome-free/scss/v4-shims.scss";

import UUID from "vue3-uuid";
const app = createApp(App);

app.use(createPinia());
app.use(router);
app.use(UUID);

app.mount("#app");
