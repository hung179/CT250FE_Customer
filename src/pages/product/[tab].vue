<template>
    <NuxtLayout>
        <div class="min-w-6xl w-full h-full mx-auto">
            <div class="h-fit p-6">
                <div class="bg-zinc-50 h-fit w-full rounded-lg p-8">
                    <div class="w-full h-fit flex justify-between items-center">
                        <span class="text-xl font-medium">Sản Phẩm</span>
                        <NuxtLink to="/product/new"
                            ><button
                                class="h-fit py-3 flex items-center px-6 bg-emerald-400 hover:bg-emerald-500 rounded-lg cursor-pointer text-white text-sm font-medium align-middle"
                            >
                                <Icon name="ic:round-add" size="20" class="mr-2" />Thêm một sản phẩm
                                mới
                            </button></NuxtLink
                        >
                    </div>
                    <div class="w-full mt-5 bg-white">
                        <nav class="relative h-fit">
                            <ul class="flex">
                                <li
                                    v-for="(item, index) in navItems"
                                    :key="index"
                                    :ref="setRef(index)"
                                    class="py-4 px-6"
                                    :class="[
                                        activeIndex === index
                                            ? 'active text-emerald-400 font-semibold'
                                            : '',
                                    ]"
                                    @click="setActive(index)"
                                >
                                    <NuxtLink
                                        :to="
                                            tabItems[index]
                                                ? `/product/${tabItems[index]}`
                                                : '/product'
                                        "
                                        class="text-lg relative inline-block no-underline text-center"
                                    >
                                        {{ item }}
                                    </NuxtLink>
                                </li>
                            </ul>
                            <div class="w-full h-1 bg-zinc-300 rounded-lg absolute"></div>
                            <div
                                class="absolute h-1 top-full rounded-lg bg-emerald-400"
                                :style="{
                                    width: underlineWidth + 'px',
                                    left: underlineLeft + 'px',
                                }"
                            ></div>
                        </nav>
                    </div>
                    <div class="w-full h-fit bg-transparent rounded-lg mt-8">
                        <productTable />
                    </div>
                </div>
            </div>
        </div>
    </NuxtLayout>
</template>
<script setup>
import { ref, onMounted, watch, computed, nextTick } from "vue";
import { useRoute } from "vue-router";

import productTable from "~/components/product/product-table.vue";

const route = useRoute();
const tab = computed(() => route.params.tab || "live"); // Nếu không có tab, mặc định là "all"

const navItems = ["Tất cả", "Đang hoạt động", "Đã ẩn"];
const tabItems = ["all", "live", "hidden"];

const activeIndex = ref(tabItems.indexOf(tab.value) || 1);
const underlineWidth = ref(0);
const underlineLeft = ref(0);

const itemRefs = ref([]);

// Hàm cập nhật vị trí thanh underline
const setActive = async (index) => {
    if (index === -1) return; // Nếu tab không hợp lệ, bỏ qua
    activeIndex.value = index;

    await nextTick(); // Đảm bảo DOM đã cập nhật trước khi lấy vị trí
    const item = itemRefs.value[index];
    if (item) {
        underlineWidth.value = item.offsetWidth;
        underlineLeft.value = item.offsetLeft;
    }
};

// Gán ref cho từng item trong danh sách
const setRef = (index) => (el) => {
    itemRefs.value[index] = el;
};

onMounted(() => {
    const index = tabItems.indexOf(tab.value);
    setActive(index);
});

watch(tab, (newTab) => {
    const newIndex = tabItems.indexOf(newTab);
    if (newIndex !== -1) {
        setActive(newIndex);
    }
});
</script>
