<template>
    <div>
        <CategoryForm :id="id" @submit="handleSubmit" />
    </div>
</template>
<script setup>
const route = useRoute();
const id = route.params.id;

const handleSubmit = (nganhHang) => {
    update(nganhHang);
};

const authStore = useAuthStore();
const { $api } = useNuxtApp(); // ✅ Truy cập api từ plugin
import { useRouter } from "vue-router";

const router = useRouter();
async function update(nganhHang) {
    try {
        const res = await $api.put(`categories/${id}`, nganhHang);
        if (res.data.success) {
            showSuccess();
            router.push("/category");
        } else {
            router.push("/category");
        }
    } catch (error) {
        console.error("Lỗi:", error);
        showError();
        router.push("/category");
    }
}

import { useToast } from "vue-toastification";
const toast = useToast();

const showSuccess = () => {
    toast.success("Ngành hàng được cập nhật thành công");
};

const showError = () => {
    toast.error("Có lỗi xảy ra, không thể cập nhật ngành hàng!");
};
</script>
