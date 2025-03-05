<template>
    <div class="w-full min-h-14 h-14 bg-white shadow-sm flex z-20 fixed">
        <div class="w-48 min-w-48 mt-3 mb-2 m-auto">
            <img src="../public/logo2.png" alt="" class="w-full h-full object-contain" />
        </div>
        <div class="flex-1 flex items-center justify-between">
            <div class="flex flex-1 items-center whitespace-nowrap">
                <NuxtLink
                    class="pl-4 text-zinc-400 hover:text-zinc-500 cursor-pointer text-base"
                    to="/"
                    >Trang chủ</NuxtLink
                >
                <div v-for="(item, index) in breadcrumb" :key="index">
                    <span class="mx-2 text-zinc-400"> > </span>
                    <NuxtLink
                        :to="item.path"
                        :class="[
                            item.current ? 'text-zinc-900' : 'text-zinc-400 hover:text-zinc-500',
                            'cursor-pointer text-base',
                        ]"
                    >
                        {{ item.name }}
                    </NuxtLink>
                </div>
            </div>
            <div class="h-full w-fit relative ml-5">
                <div
                    class="absolute -left-1 top-1/2 -translate-y-1/2 h-1/2 w-[1px] bg-zinc-300"
                ></div>
                <LogoutButton />
            </div>
        </div>
    </div>
</template>

<script setup>
import { useRoute } from "vue-router";
import { computed } from "vue";

const route = useRoute();

const breadcrumb = computed(() => {
    // Quản lý sản phẩm - Product
    if (route.path.includes("/product/list")) {
        return [{ name: "Sản phẩm", path: "/product/list/all", current: true }];
    } else if (route.path.includes("/product/new")) {
        return [
            { name: "Sản phẩm", path: "/product/list/all" },
            { name: "Thêm sản phẩm mới", path: route.path, current: true },
        ];
    } else if (/\/product\/[a-zA-Z0-9]+$/.test(route.path)) {
        return [
            { name: "Sản phẩm", path: "/product/list/all" },
            { name: "Chi tiết sản phẩm", path: route.path, current: true },
        ];
    }
    return [];
});
</script>
