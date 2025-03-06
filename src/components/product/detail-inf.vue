<template>
    <div class="h-fit w-full p-8 rounded-lg bg-white shadow-[0px_0px_10px_rgba(0,0,0,0.1)]">
        <div class="text-xl font-semibold text-zinc-900 w-full rounded-t-xl bg-zinc-50 mb-10">
            Thông tin chi tiết
        </div>
        <div class="grid grid-cols-2 gap-6">
            <!-- Danh sách các trường nhập liệu -->
            <div class="flex items-center">
                <div class="w-48 mr-6 flex justify-end text-sm text-zinc-900">
                    <span class="text-red-400 mr-1">*</span>
                    Tên thuộc tính
                </div>
                <div class="relative flex-1">
                    <input
                        type="text"
                        id="temp"
                        v-model="temp"
                        placeholder="Vui lòng nhập giá trị"
                        class="w-full text-sm text-zinc-900 bg-transparent border-[1px] border-zinc-300 hover:border-zinc-400 rounded-md h-10 outline-none p-2 focus:border-zinc-400"
                    />
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
import { ref } from "vue";
</script>
