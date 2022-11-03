import {createApp} from "vue";
import App from "./App.vue";
import router from "./router";
import {createPinia} from "pinia";
import mitts from "mitt";

const pinia = createPinia();
const emitter = mitts();
const app = createApp(App);
app.config.globalProperties.emitter = emitter;

app.use(router).use(pinia).mount("#app");
