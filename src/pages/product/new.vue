<template>
    <NuxtLayout>
        <template #sidebar>
            <div class="w-full h-full bg-zinc-50">
                <ul class="py-2">
                    <li class="text-sm text-zinc-600 hover:text-zinc-900 pl-5 py-2 cursor-pointer">
                        Thông tin cơ bản
                    </li>
                    <li class="text-sm text-zinc-600 hover:text-zinc-900 pl-5 py-2 cursor-pointer">
                        Thông tin cơ bản
                    </li>
                </ul>
            </div>
        </template>

        <div class="h-fit w-full rounded-2xl space-y-5">
            <BaseInf />
            <DetailInf />
        </div>
    </NuxtLayout>
</template>
<script setup>
import BaseInf from "@/components/product/base-inf.vue";
import DetailInf from "~/components/product/detail-inf.vue";
</script>

<style></style>
