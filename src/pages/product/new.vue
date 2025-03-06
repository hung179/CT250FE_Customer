<template>
    <NuxtLayout :scrollPosition="scrollPosition">
        <template #sidebar>
            <div class="w-48 min-w-48 h-fit bg-zinc-50">
                <ul class="pt-4 pl-4 space-y-4">
                    <li
                        v-for="(section, index) in sections"
                        :key="index"
                        @click="scrollTo(section.id)"
                        class="text-sm cursor-pointer transition-colors duration-300 text-zinc-400 hover:text-zinc-600"
                    >
                        {{ section.name }}
                    </li>
                </ul>
            </div>
        </template>

        <div class="h-fit w-full rounded-lg space-y-5">
            <div id="baseInf"><BaseInf /></div>
            <div id="detailInf"><DetailInf /></div>
            <div id="salesInf"><SalesInf /></div>

            <div
                class="w-full h-fit px-8 py-4 rounded-lg bg-white sticky bottom-0 shadow-[0px_0px_10px_rgba(0,0,0,0.1)]"
            >
                <div class="w-full h-fit flex items-center round-t-md justify-end space-x-4">
                    <button
                        @click="cancel()"
                        class="py-auto px-6 bg-transparent h-10 text-sm text-zinc-700 rounded-md cursor-pointer border-[1px] border-zinc-400 hover:bg-zinc-100 box-border"
                    >
                        Hủy
                    </button>
                    <button
                        @click="saveAndHide()"
                        class="py-auto px-6 bg-transparent h-10 text-sm text-zinc-700 rounded-md cursor-pointer border-[1px] border-zinc-400 hover:bg-zinc-100 box-border"
                    >
                        Lưu & Ẩn
                    </button>

                    <button
                        @click="saveAndShow()"
                        class="py-auto px-6 bg-emerald-400 h-10 text-sm text-white rounded-md hover:bg-emerald-500 cursor-pointer"
                    >
                        Lưu & Hiển thị
                    </button>
                </div>
            </div>
        </div>
    </NuxtLayout>
</template>

<script setup>
import { ref } from "vue";
import Swal from "sweetalert2";

import BaseInf from "@/components/product/base-inf.vue";
import DetailInf from "@/components/product/detail-inf.vue";
import SalesInf from "@/components/product/sales-inf.vue";

const sections = [
    { id: "baseInf", name: "Thông tin cơ bản" },
    { id: "detailInf", name: "Thông tin chi tiết" },
    { id: "salesInf", name: "Thông tin bán hàng" },
];

const scrollTo = (id) => {
    const element = document.getElementById(id);
    if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "start" });
        activeSection.value = id;
    }
};

const saveAndHide = () => {
    Swal.fire({
        title: "Xác nhận",
        text: "Lưu và ẩn sản phẩm ?",
        showCancelButton: true,
        confirmButtonText: "Đồng ý",
        cancelButtonText: "Hủy",
        confirmButtonColor: "#34D399",
    }).then((result) => {
        if (result.isConfirmed) {
            console.log("Cancelled");
        } else {
            console.log("not cancelled");
        }
    });
};

const saveAndShow = () => {
    Swal.fire({
        title: "Xác nhận",
        text: "Lưu và hiển thị sản phẩm ?",
        showCancelButton: true,
        confirmButtonText: "Đồng ý",
        cancelButtonText: "Hủy",
        confirmButtonColor: "#34D399",
    }).then((result) => {
        if (result.isConfirmed) {
            console.log("Cancelled");
        } else {
            console.log("not cancelled");
        }
    });
};

const cancel = () => {
    Swal.fire({
        title: "Xác nhận",
        text: "Hủy thay đổi ?",
        showCancelButton: true,
        confirmButtonText: "Đồng ý",
        cancelButtonText: "Hủy",
        confirmButtonColor: "#34D399",
    }).then((result) => {
        if (result.isConfirmed) {
            console.log("Cancelled");
        } else {
            console.log("not cancelled");
        }
    });
};
</script>

<style></style>
