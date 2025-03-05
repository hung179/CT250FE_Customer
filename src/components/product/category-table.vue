<template>
    <div class="fixed top-0 left-0 w-full h-full z-31 bg-zinc-900/30">
        <div class="flex justify-center w-full h-full py-20">
            <div class="w-fit h-full flex flex-col overflow-hidden justify-center">
                <div
                    class="min-w-5xl w-5xl h-auto overflow-auto flex flex-col bg-zinc-50 rounded-lg"
                >
                    <div class="w-full min-h-18 h-18 p-6 flex items-center">
                        <div class="flex-1 text-base font-medium text-zinc-700">
                            Chỉnh sửa ngành hàng
                        </div>
                        <div
                            class="h-full w-fit bg-transparent rounded-full hover:bg-zinc-100 cursor-pointer"
                            @click="emit('close')"
                        >
                            <Icon
                                name="material-symbols:close-rounded"
                                size="23"
                                class="text-zinc-700"
                            />
                        </div>
                    </div>
                    <div class="w-full min-h-18 h-fit px-6 overflow-auto">
                        <div class="w-full h-fit p-4 bg-zinc-100 rounded-md">
                            <div class="w-full h-8 flex flex-row">
                                <div
                                    class="w-64 px-3 h-full bg-zinc-50 rounded-sm border-[1px] border-zinc-300 flex items-center space-x-2 cursor-pointer group focus-within:border-zinc-400"
                                >
                                    <input
                                        type="text"
                                        placeholder="Vui lòng nhập tối thiểu 1 ký tự."
                                        class="h-full w-full focus:ring-0 outline-none py-2 text-xs text-zinc-600"
                                    />
                                    <Icon
                                        name="material-symbols:search-rounded"
                                        size="22"
                                        class="text-zinc-400"
                                    />
                                </div>
                            </div>
                            <div
                                class="w-full h-fit overflow-auto flex flex-row mt-4 bg-zinc-50 rounded-md py-4"
                            >
                                <div class="flex-1 h-76 overflow-y-auto">
                                    <categoryList
                                        :categories="categories"
                                        @categorySelected="handleCategory1Selected"
                                    />
                                </div>
                                <div
                                    class="flex-1 h-76 overflow-y-auto border-x-[1px] border-zinc-200"
                                >
                                    <categoryList
                                        :categories="categories"
                                        @categorySelected="handleCategory2Selected"
                                    />
                                </div>
                                <div class="flex-1 h-76 overflow-y-auto">
                                    <categoryList
                                        :categories="categories"
                                        @categorySelected="handleCategory3Selected"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="w-full h-20 min-h-20 p-6 flex justify-between items-center">
                        <div class="w-fit h-full flex items-center space-x-2">
                            <span class="text-sm text-zinc-700">Đã chọn : </span>
                            <span class="text-sm text-zinc-700 font-semibold">
                                {{ category1 }}
                            </span>
                            <span v-if="category2" class="text-sm text-zinc-700 font-semibold">
                                <span> > </span> {{ category2 }}
                            </span>
                            <span v-if="category3" class="text-sm text-zinc-700 font-semibold">
                                <span> > </span> {{ category3 }}
                            </span>
                        </div>
                        <div class="flex h-full w-fit items-center space-x-4">
                            <button
                                @click="emit('close')"
                                class="px-4 h-full text-sm font-medium bg-zinc-50 hover:bg-zinc-100 border-[1px] border-zinc-300 text-zinc-600 rounded-md cursor-pointer"
                            >
                                <span>Hủy</span>
                            </button>
                            <button
                                class="px-4 h-full text-sm font-medium bg-emerald-400 hover:bg-emerald-500 text-white rounded-md cursor-pointer"
                            >
                                <span>Xác nhận</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
import categoryList from "./category-list.vue";

const category1 = ref("");
const category2 = ref("");
const category3 = ref("");

const handleCategory1Selected = (category) => {
    console.log(category);
    category1.value = category.name;
};
const handleCategory2Selected = (category) => {
    console.log(category);
    category2.value = category.name;
};
const handleCategory3Selected = (category) => {
    console.log(category);
    category3.value = category.name;
};

const categories = [];
const emit = defineEmits(["close"]);
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
