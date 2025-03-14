<template>
    <CategoryForm @submit="handleSubmit"></CategoryForm>
</template>
<script setup>
import { useRouter } from "vue-router";

const router = useRouter();

const handleSubmit = (nganhHang) => {
    addCategory(nganhHang);
};

const authStore = useAuthStore();
const { $api } = useNuxtApp(); // ✅ Truy cập api từ plugin

async function addCategory(data) {
    try {
        console.log(data);
        const res = await $api.post("/categories", data);
        console.log(res);
        if (res.data.success) {
            router.push("/category");
        }
    } catch (error) {
        console.error("Lỗi:", error);
    }
}
</script>
