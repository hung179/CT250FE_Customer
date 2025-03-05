<template>
    <NuxtLayout>
        <template #sidebar>
            <SidebarA />
        </template>

        <div class="bg-zinc-50 h-fit w-full rounded-lg">
            <div class="w-full h-fit flex justify-between items-center p-6">
                <span class="text-xl">Sản Phẩm</span>
                <NuxtLink to="/product/new"
                    ><button
                        class="py-3 px-6 bg-emerald-400 hover:bg-emerald-500 rounded-lg cursor-pointer text-white text-sm align-middle"
                    >
                        Thêm một sản phẩm mới
                    </button></NuxtLink
                >
            </div>
            <div class="w-full mt-4">
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
                            <a
                                href="#"
                                class="text-lg relative inline-block no-underline text-center"
                                >{{ item }} ({{ total }})</a
                            >
                        </li>
                    </ul>
                    <div class="w-full h-1 rounded-lg bg-zinc-300 absolute"></div>
                    <div
                        class="animation absolute h-1 top-full rounded-lg bg-emerald-400 transition-all duration-200 ease-linear delay-0"
                        :style="{
                            width: underlineWidth + 'px',
                            left: underlineLeft + 'px',
                        }"
                    ></div>
                </nav>
            </div>
        </div>
    </NuxtLayout>
</template>
<script setup>
import SidebarA from "@/components/sidebar.vue";
import { ref, onMounted } from "vue";

const navItems = ["Tất cả", "Đang hoạt động", "Đã ẩn", "Hết hàng"];

const activeIndex = ref(0);
const underlineWidth = ref(0);
const underlineLeft = ref(0);

const itemRefs = ref([]);

const setActive = (index) => {
    activeIndex.value = index;
    const item = itemRefs.value[index];
    underlineWidth.value = item.offsetWidth;
    underlineLeft.value = item.offsetLeft;
};

onMounted(() => {
    setActive(activeIndex.value);
});

const setRef = (index) => (el) => {
    itemRefs.value[index] = el;
};

const total = 0;
</script>
