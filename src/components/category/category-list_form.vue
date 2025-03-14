<template>
    <ul class="w-full h-full overflow-y-auto">
        <li
            v-for="category in filteredCategories"
            :key="category._id"
            @click="selectCategory(category)"
            :class="[
                selected && selected._id === category._id
                    ? 'text-emerald-400 font-medium'
                    : 'text-zinc-900',
            ]"
            class="h-8 px-4 text-sm hover:bg-zinc-100 cursor-pointer flex items-center"
        >
            {{ category.ten_NH }}
        </li>
    </ul>
</template>

<script setup>
import { ref } from "vue";
const props = defineProps({
    categories: Array,
    selected: Object,
    parent: Object,
});

const selected = ref(props.selected || null);

const filteredCategories = computed(() => {
    return props.parent
        ? props.categories.filter((category) => category.idCha_NH === props.parent._id)
        : [];
});

const emit = defineEmits(["categorySelected"]);

const selectCategory = (category) => {
    if (selected && category != selected.value) {
        selected.value = category;
        emit("categorySelected", category); // Gửi sự kiện với dữ liệu danh mục được chọn
    }
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
