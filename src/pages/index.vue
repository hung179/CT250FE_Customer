<template>
    <NuxtLayout>
        <template #sidebar>
            <SidebarA />
        </template>

        <div class="bg-white w-full h-full rounded-lg"></div>
    </NuxtLayout>
</template>
<script setup>
import SidebarA from "@/components/sidebar.vue";
definePageMeta({
    middleware: "auth", // Áp dụng middleware cho tất cả các page
});
</script>
