import { createApp } from "vue";
import App from "./App.vue";
import vuetify from "./plugins/vuetify";
import { loadFonts } from "./plugins/webfontloader";
import router from "./router";
import axios from "axios";
import VueAxios from "vue-axios";

loadFonts();

const app = createApp(App);
app.use(vuetify);
app.use(router);
app.use(VueAxios, axios);
app.mount("#app");
