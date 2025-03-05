<template>
    <ul class="w-full h-full overflow-y-auto">
        <li
            v-for="(category, index) in categories"
            :key="category.id"
            @click="selectCategory(index, category)"
            :class="[selected === index ? 'text-emerald-400 font-medium' : 'text-zinc-900']"
            class="h-8 px-4 text-sm hover:bg-zinc-100 cursor-pointer flex items-center"
        >
            {{ category.name }}
        </li>
    </ul>
</template>

<script setup>
import { ref } from "vue";
defineProps({
    categories: Array,
});

const selected = ref(null);

const emit = defineEmits(["categorySelected"]);

const selectCategory = (index, category) => {
    selected.value = index;
    emit("categorySelected", category); // Gửi sự kiện với dữ liệu danh mục được chọn
};
</script>
<style>
::-webkit-scrollbar {
    width: 6px;
}

/* Track scrollbar */
::-webkit-scrollbar-track {
    background: transparent;
    border-radius: 10px;
}
::-webkit-scrollbar-thumb {
    background: #e4e4e7;
    border-radius: 10px;
}
</style>
