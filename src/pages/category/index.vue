<template>
    <NuxtLayout>
        <div class="min-w-5xl w-full h-full mx-auto">
            <div class="h-fit p-6">
                <div class="bg-zinc-50 h-fit w-full rounded-lg p-8">
                    <div class="w-full h-fit flex justify-between items-center">
                        <span class="text-xl font-medium">Danh mục</span>
                        <div class="flex space-x-4">
                            <div
                                @click="openAttributes = true"
                                class="h-fit py-3 flex items-center px-6 bg-white border-[1px] border-zinc-600 hover:bg-zinc-100 rounded-lg cursor-pointer text-zinc-600 text-sm font-medium align-middle"
                            >
                                Danh sách thuộc tính
                            </div>
                            <AttributeTable
                                v-if="openAttributes"
                                @close="openAttributes = false"
                            ></AttributeTable>
                            <NuxtLink to="/category/new"
                                ><button
                                    class="h-fit py-3 flex items-center px-6 bg-emerald-400 hover:bg-emerald-500 rounded-lg cursor-pointer text-white text-sm font-medium align-middle"
                                >
                                    <Icon name="ic:round-add" size="20" class="mr-2" />Thêm một
                                    ngành hàng
                                </button></NuxtLink
                            >
                        </div>
                    </div>
                    <div class="w-full h-fit bg-transparent rounded-lg mt-8">
                        <CategoryTable></CategoryTable>
                    </div>
                </div>
            </div>
        </div>
    </NuxtLayout>
</template>
<script setup>
import { ref, onMounted, watch, computed, nextTick } from "vue";
import { useRoute } from "vue-router";

const openAttributes = ref(false);

const test = () => {
    console.log(openAttributes.value);
};
</script>
