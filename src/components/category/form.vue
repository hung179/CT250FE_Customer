<template>
    <NuxtLayout>
        <div class="min-w-4xl w-full h-full max-w-5xl mx-auto">
            <div class="h-fit p-6">
                <div class="h-fit w-full bg-white rounded-lg space-y-5">
                    <div class="w-full h-fit p-8 space-y-4 over">
                        <div
                            class="text-xl font-semibold text-zinc-900 w-full rounded-t-xl bg-zinc-50 mb-10"
                        >
                            Thêm ngành hàng
                        </div>
                        <div class="w-full h-fit flex items-center">
                            <div class="w-48 mr-6 flex justify-end text-sm text-zinc-900">
                                <span class="text-red-400 mr-1">*</span>
                                Tên ngành hàng
                            </div>
                            <div class="relative flex-1">
                                <input
                                    type="text"
                                    id="p_name"
                                    v-model="nganhHang.ten_NH"
                                    placeholder="Nhập tên ngành hàng"
                                    :maxlength="60"
                                    class="w-full text-sm text-zinc-900 bg-transparent border-[1px] border-zinc-300 hover:border-zinc-400 rounded-md h-10 outline-none pl-3 pr-20 focus:border-zinc-400"
                                />
                                <div class="absolute right-0 top-0 w-20 h-10 flex items-center">
                                    <div class="h-6 w-[1px] bg-zinc-300"></div>
                                    <p class="w-full text-center mx-2 text-zinc-400">
                                        {{ nganhHang.ten_NH.length }}/60
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div class="w-full h-fit flex items-center">
                            <div class="w-48 mr-6 flex justify-end text-sm text-zinc-900">
                                Ngành hàng cấp 1
                            </div>
                            <div class="relative flex-1">
                                <select
                                    v-model="nganhHangCha.idCap1"
                                    :disabled="nganhHang.dsThuocTinh_NH.length > 0"
                                    class="w-full text-sm text-zinc-900 bg-transparent border-[1px] border-zinc-300 hover:border-zinc-400 rounded-md h-10 outline-none pl-3 pr-10 focus:border-zinc-400 appearance-none disabled:cursor-not-allowed"
                                >
                                    <option value="" disabled selected>
                                        Chọn ngành hàng cấp 1
                                    </option>
                                    <option value="none">None</option>
                                    <option
                                        v-for="category in categoriesLevel1"
                                        :key="category._id"
                                        :value="category._id"
                                    >
                                        {{ category.ten_NH }}
                                    </option>
                                </select>
                                <!-- Mũi tên dropdown -->
                                <div
                                    class="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none flex items-center justify-center"
                                >
                                    <Icon
                                        name="material-symbols-light:arrow-drop-down"
                                        size="30"
                                    ></Icon>
                                </div>
                            </div>
                        </div>
                        <div class="w-full h-fit flex items-center">
                            <div class="w-48 mr-6 flex justify-end text-sm text-zinc-900">
                                Ngành hàng cấp 2
                            </div>
                            <div class="relative flex-1">
                                <select
                                    v-model="nganhHangCha.idCap2"
                                    :disabled="
                                        nganhHangCha.idCap1 && nganhHang.dsThuocTinh_NH.length > 0
                                    "
                                    class="w-full text-sm text-zinc-900 bg-transparent border-[1px] border-zinc-300 hover:border-zinc-400 rounded-md h-10 outline-none pl-3 pr-10 focus:border-zinc-400 appearance-none disabled:bg-gray-100 disabled:cursor-not-allowed"
                                >
                                    <option value="" disabled selected>
                                        Chọn ngành hàng cấp 2
                                    </option>
                                    <option value="none">None</option>
                                    <option
                                        v-for="category in categoriesLevel2"
                                        :key="category._id"
                                        :value="category._id"
                                    >
                                        {{ category.ten_NH }}
                                    </option>
                                </select>
                                <!-- Mũi tên dropdown -->
                                <div
                                    class="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none flex items-center justify-center"
                                >
                                    <Icon
                                        name="material-symbols-light:arrow-drop-down"
                                        size="30"
                                    ></Icon>
                                </div>
                            </div>
                        </div>
                        <div
                            class="w-full h-fit flex items-center"
                            v-if="selectedAttributes.length > 0"
                        >
                            <div
                                class="w-48 mr-6 flex justify-end text-right text-sm text-zinc-900"
                            >
                                Thông tin chi tiết sản phẩm thuộc ngành hàng
                            </div>
                            <div
                                class="flex-1 h-fit flex items-center min-h-10 bg-zinc-100 rounded"
                            >
                                <div class="relative flex-1">
                                    <ul class="flex flex-wrap">
                                        <li
                                            class="px-6 py-2 m-2 bg-emerald-300 rounded"
                                            v-for="attr in selectedAttributes"
                                            :key="attr._id"
                                        >
                                            {{ attr.ten_TT }}
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div class="w-full h-fit flex">
                            <!-- Tiêu đề -->
                            <div
                                class="w-48 mr-6 flex justify-end text-right text-sm text-zinc-900"
                            >
                                <div v-if="selectedAttributes.length == 0">
                                    Thông tin chi tiết sản phẩm thuộc ngành hàng
                                </div>
                            </div>

                            <div class="flex-1 h-fit">
                                <div class="flex-1 h-fit rounded">
                                    <div class="flex-1 h-fit rounded">
                                        <!-- Dropdown thêm thuộc tính -->
                                        <div class="relative flex h-10 items-center rounded-md">
                                            <select
                                                @change="addAttribute"
                                                class="w-full text-sm text-zinc-900 bg-transparent border-[1px] border-zinc-300 hover:border-zinc-400 rounded-md h-10 outline-none pl-3 pr-10 focus:border-zinc-400 appearance-none disabled:bg-gray-100 disabled:cursor-not-allowed"
                                            >
                                                <option value="" disabled selected>
                                                    Chọn thuộc tính
                                                </option>
                                                <option
                                                    v-for="attr in availableAttributes"
                                                    :key="attr._id"
                                                    :value="attr._id"
                                                >
                                                    {{ attr.ten_TT }}
                                                </option>
                                            </select>
                                            <!-- Mũi tên dropdown -->
                                            <div
                                                class="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none flex items-center justify-center"
                                            >
                                                <Icon
                                                    name="material-symbols-light:arrow-drop-down"
                                                    size="30"
                                                ></Icon>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div
                                    class="flex-1 h-fit border-box rounded bg-zinc-100 mt-5 flex flex-wrap"
                                >
                                    <!-- Danh sách thuộc tính đã thêm -->
                                    <div
                                        v-for="attr in addedAttributes"
                                        :key="attr._id"
                                        class="relative flex items-center bg-emerald-300 w-fit h-10 pl-4 rounded-md m-2"
                                    >
                                        <span>{{ attr.ten_TT }}</span>
                                        <button
                                            @click="removeAttribute(attr._id)"
                                            class="m-auto px-2 flex items-center cursor-pointer"
                                        >
                                            <Icon
                                                name="material-symbols-light:close-small-outline-rounded"
                                                size="24"
                                            >
                                            </Icon>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div
                        class="w-full h-fit px-8 py-4 rounded-lg bg-white sticky bottom-0 shadow-[0px_0px_10px_rgba(0,0,0,0.1)]"
                    >
                        <div
                            class="w-full h-fit flex items-center round-t-md justify-end space-x-4"
                        >
                            <button
                                @click="cancel()"
                                class="py-auto px-6 bg-transparent h-10 text-sm text-zinc-700 rounded-md cursor-pointer border-[1px] border-zinc-400 hover:bg-zinc-100 box-border"
                            >
                                Hủy
                            </button>

                            <button
                                @click="save()"
                                class="py-auto px-6 bg-emerald-400 h-10 text-sm text-white rounded-md hover:bg-emerald-500 cursor-pointer"
                            >
                                Lưu
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </NuxtLayout>
</template>

<script setup>
import { ref, computed, onBeforeMount } from "vue";
const props = defineProps(["id"]);

const nganhHang = ref({
    ten_NH: "",
    idCha_NH: "",
    cap_NH: "",
    dsThuocTinh_NH: [],
});

const nganhHangCha = ref({
    idCap1: "",
    idCap2: "",
});

import Swal from "sweetalert2";
import { useRouter } from "vue-router";

const router = useRouter();

const save = () => {
    Swal.fire({
        title: "Xác nhận",
        text: "Thêm ngành hàng mới ?",
        showCancelButton: true,
        confirmButtonText: "Đồng ý",
        cancelButtonText: "Hủy",
        confirmButtonColor: "#34D399",
    }).then((result) => {
        if (result.isConfirmed) {
            if (nganhHangCha.value.idCap2 && nganhHangCha.value.idCap2 !== "none") {
                nganhHang.value.idCha_NH = nganhHangCha.value.idCap2;
                nganhHang.value.cap_NH = 3;
            } else if (nganhHangCha.value.idCap1 && nganhHangCha.value.idCap1 !== "none") {
                nganhHang.value.idCha_NH = nganhHangCha.value.idCap1;
                nganhHang.value.cap_NH = 2;
            } else {
                nganhHang.value.idCha_NH = null;
                nganhHang.value.cap_NH = 1;
            }

            submit();
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
            router.push("/category");
        }
    });
};

const emit = defineEmits(["submit"]);
const submit = () => {
    emit("submit", nganhHang.value);
};

const authStore = useAuthStore();
const { $api } = useNuxtApp(); // ✅ Truy cập api từ plugin

const categories = ref([]);

// Lọc ngành hàng cấp 1
const categoriesLevel1 = computed(() => {
    return categories.value.filter((c) => c.cap_NH == 1);
});

const categoriesLevel2 = computed(() => {
    if (nganhHangCha.value.idCap1 !== "none") {
        return categories.value.filter(
            (c) => c.cap_NH == 2 && c.idCha_NH === nganhHangCha.value.idCap1
        );
    }
    return [];
});

const danhSachThuocTinh = ref([]);

const selectedAttributes = computed(() => {
    let attributes = new Set();

    if (nganhHangCha.value.idCap1 && nganhHangCha.value.idCap1 !== "none") {
        const category1 = categories.value.find((c) => c._id === nganhHangCha.value.idCap1);
        if (category1?.dsThuocTinh_NH) {
            category1.dsThuocTinh_NH.forEach((attr) => attributes.add(attr));
        }
    }

    if (nganhHangCha.value.idCap2 && nganhHangCha.value.idCap2 !== "none") {
        const category2 = categories.value.find((c) => c._id === nganhHangCha.value.idCap2);
        if (category2?.dsThuocTinh_NH) {
            category2.dsThuocTinh_NH.forEach((attr) => attributes.add(attr));
        }
    }

    return danhSachThuocTinh.value.filter((attr) => attributes.has(attr._id));
});

const addedAttributes = computed(() => {
    return danhSachThuocTinh.value.filter((attr) =>
        nganhHang.value.dsThuocTinh_NH.includes(attr._id)
    );
});

// Lọc danh sách thuộc tính chưa có
const availableAttributes = computed(() => {
    return danhSachThuocTinh.value.filter(
        (attr) =>
            !nganhHang.value.dsThuocTinh_NH.includes(attr._id) &&
            !selectedAttributes.value.some((selectedAttr) => selectedAttr._id === attr._id)
    );
});

// Thêm thuộc tính vào dsThuocTinh_NH
const addAttribute = (event) => {
    const attrId = event.target.value;
    if (!attrId) return;

    if (!nganhHang.value.dsThuocTinh_NH) {
        nganhHang.value.dsThuocTinh_NH = [];
    }

    if (!nganhHang.value.dsThuocTinh_NH.includes(attrId)) {
        nganhHang.value.dsThuocTinh_NH.push(attrId);
    }

    // Reset dropdown
    event.target.value = "";
};

// Xóa thuộc tính khỏi dsThuocTinh_NH
const removeAttribute = (attrId) => {
    nganhHang.value.dsThuocTinh_NH = nganhHang.value.dsThuocTinh_NH.filter((id) => id !== attrId);
};

const findCategoryById = (id) => {
    return categories.value.find((category) => category._id == id) || null;
};

async function getAttribute() {
    try {
        const res = await $api.get("/attributes");
        if (res.data.success) {
            danhSachThuocTinh.value = res.data.data;
        }
    } catch (error) {
        console.error("Lỗi:", error);
    }
}

async function getCategory() {
    try {
        const res = await $api.get("/categories");
        if (res.data.success) {
            categories.value = res.data.data;
        }
    } catch (error) {
        console.error("Lỗi:", error);
    }
}

onBeforeMount(async () => {
    await getAttribute();
    await getCategory();
    if (props.id) {
        const category = findCategoryById(props.id);
        if (category) {
            nganhHang.value.ten_NH = category.ten_NH;
            nganhHang.value.idCha_NH = category.idCha_NH;
            nganhHang.value.cap_NH = category.cap_NH;
            nganhHang.value.dsThuocTinh_NH = category.dsThuocTinh_NH;
            if (category.cap_NH == 3) {
                nganhHangCha.value.idCap2 = category.idCha_NH;

                const categoryLevel2 = findCategoryById(category.idCha_NH);
                if (categoryLevel2) {
                    nganhHangCha.value.idCap2 = categoryLevel2._id || "none";
                }
            } else if (category.cap_NH == 2) {
                nganhHangCha.value.idCap1 = category.idCha_NH;

                const categoryLevel1 = findCategoryById(category.idCha_NH);
                if (categoryLevel1) {
                    nganhHangCha.value.idCap1 = categoryLevel1._id || "none";
                }
            }
        }
    }
});
</script>

<style></style>
