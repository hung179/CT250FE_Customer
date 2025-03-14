import { defineNuxtPlugin } from "#app";
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";

export default defineNuxtPlugin((nuxtApp) => {
    nuxtApp.vueApp.use(Toast, {
        position: "top-right", // Vị trí hiển thị
        timeout: 1500, // Thời gian hiển thị
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        transition: "Vue-Toastification__bounce",
    });
});
