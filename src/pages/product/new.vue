<template>
    <NuxtLayout>
        <template #sidebar>
            <div class="w-full h-full bg-amber-300">
                <ul>
                    <li
                        class="text-sm text-[var(--color-gray)] hover:text-[var(--color-main)] pl-5 pt-5 cursor-pointer"
                    >
                        Thông tin cơ bản
                    </li>
                </ul>
            </div>
        </template>

        <div class="w-full h-full overflow-y-auto">
            <div class="h-fit w-full p-6 rounded-xl bg-white">
                <span>Thông tin cơ bản</span>
                <div class="w-full h-fit mt-10">
                    <div class="w-full h-fit flex space-x-6">
                        <div class="w-64 text-right">Ảnh bìa sản phẩm</div>
                        <div class="flex-1">
                            <div
                                class="w-20 h-20 border-[1px] border-zinc-400 rounded-md border-dashed bg-transparent hover:bg-emerald-200/10 hover:border-emerald-400 cursor-pointer"
                            >
                                <div
                                    class="w-full h-full flex flex-col justify-center items-center"
                                >
                                    <Icon
                                        name="material-symbols:add-photo-alternate-outline-rounded"
                                        size="28px"
                                        class="text-emerald-400"
                                    />
                                    <p class="text-xs text-center">Thêm hình ảnh</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </NuxtLayout>
</template>
<script setup></script>
