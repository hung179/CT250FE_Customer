<template>
    <div class="h-fit w-full p-8 rounded-lg bg-white shadow-[0px_0px_10px_rgba(0,0,0,0.1)]">
        <div class="text-xl font-semibold text-zinc-900 w-full rounded-t-xl bg-zinc-50 mb-10">
            Thông tin bán hàng
        </div>
        <div class="flex w-full">
            <div class="w-48 mr-6 mt-2 h-full flex justify-end text-sm text-zinc-900">
                Phân loại hàng
            </div>
            <div class="flex-1">
                <div
                    v-for="(category, index) in categories"
                    :key="index"
                    class="w-full h-fit bg-zinc-100 p-5 rounded-md mb-5 relative"
                >
                    <div class="w-full h-fit flex mb-5">
                        <span class="mr-4 w-20 text-sm text-zinc-900 whitespace-break-spaces"
                            >Tên phân loại</span
                        >
                        <div class="flex-1 grid grid-cols-2 gap-x-4 gap-y-2">
                            <input
                                placeholder="Tên"
                                required
                                v-model="category.name"
                                maxlength="14"
                                class="border-[1px] border-zinc-300 focus:border-zinc-400 pl-3 pr-15 w-full h-10 rounded bg-zinc-50 outline-none text-sm text-zinc-900"
                            />
                        </div>
                    </div>
                    <div class="w-full h-full flex">
                        <span class="mr-4 w-20 text-sm text-zinc-900">Tùy chọn</span>
                        <div class="flex-1 grid grid-cols-2 gap-x-4 gap-y-2">
                            <div
                                class="mb-2"
                                v-for="(option, optIndex) in category.options"
                                :key="optIndex"
                            >
                                <div class="flex items-center">
                                    <div class="relative flex-1">
                                        <input
                                            v-model="category.options[optIndex]"
                                            @input="handleOptionInput(category, optIndex)"
                                            placeholder="Tên tùy chọn"
                                            required
                                            maxlength="20"
                                            class="border-[1px] pl-3 pr-15 w-full h-10 rounded bg-zinc-50 outline-none text-sm text-zinc-900"
                                            :class="[
                                                (optIndex !== category.options.length - 1 &&
                                                    category.options[optIndex].length === 0) ||
                                                isDuplicate(category.options, optIndex)
                                                    ? 'border-red-500 focus:border-red-500'
                                                    : 'border-zinc-300 focus:border-zinc-400',
                                            ]"
                                        />
                                        <div
                                            class="absolute right-0 top-0 w-fit h-10 flex items-center"
                                        >
                                            <div class="h-6 w-[1px] bg-zinc-300"></div>
                                            <span
                                                class="w-fit text-center text-sm mx-3 text-zinc-400"
                                                >{{ category.options[optIndex].length }}/20</span
                                            >
                                        </div>
                                    </div>
                                    <div class="w-8 h-full">
                                        <div
                                            @click="removeOption(category, optIndex)"
                                            class="w-full h-full flex items-center justify-center cursor-pointer"
                                            v-if="optIndex != category.options.length - 1"
                                        >
                                            <Icon
                                                name="material-symbols:delete-outline-rounded"
                                                size="18"
                                                class="text-zinc-400 hover:text-zinc-600 cursor-pointer"
                                            />
                                        </div>
                                    </div>
                                </div>
                                <span
                                    v-if="
                                        optIndex != category.options.length - 1 &&
                                        category.options[optIndex].length == 0
                                    "
                                    class="text-xs text-red-500"
                                    >Không được để trống ô</span
                                >
                                <span
                                    v-if="isDuplicate(category.options, optIndex)"
                                    class="text-xs text-red-500"
                                >
                                    Các phân loại hàng phải khác nhau
                                </span>
                            </div>
                        </div>
                    </div>
                    <div class="absolute right-0 top-0 w-12 h-12 bg-transparent p-2">
                        <div
                            @click="removeCategory(index)"
                            class="w-full h-full flex justify-center items-center bg-zinc-100 hover:bg-zinc-50 cursor-pointer rounded-full"
                        >
                            <Icon
                                name="material-symbols:close-rounded"
                                size="22"
                                class="text-zinc-700"
                            />
                        </div>
                    </div>
                </div>
                <div
                    v-if="categories.length < 2"
                    @click="addCategory"
                    class="w-fit flex items-center border-[1px] border-dashed cursor-pointer hover:bg-emerald-100/30 border-zinc-400 hover:border-emerald-400 rounded-md h-10 px-8"
                >
                    <span class="text-sm text-emerald-400">+ Thêm nhóm phân loại</span>
                </div>
            </div>
        </div>
        <div v-if="categories.length > 0" class="flex w-full mt-5">
            <div class="w-48 mr-6 mt-2 h-full flex justify-end text-sm text-zinc-900">
                Danh sách phân loại hàng
            </div>
            <div class="flex-1">
                <table class="w-full border border-zinc-300 table-fixed">
                    <thead>
                        <tr class="bg-zinc-200">
                            <th class="border border-zinc-300 p-2 w-40 h-10 text-zinc-700">
                                {{ categories[0]?.name || "Phân loại 1" }}
                            </th>
                            <th
                                v-if="categories.length > 1"
                                class="border border-zinc-300 p-2 w-40 h-10 text-zinc-700"
                            >
                                {{ categories[1]?.name || "Phân loại 2" }}
                            </th>
                            <th class="border border-zinc-300 p-2 w-40 h-10 text-zinc-700">
                                Giá bán (VNĐ)
                            </th>
                            <th class="border border-zinc-300 p-2 w-40 h-10 text-zinc-700">
                                Trọng lượng (g)
                            </th>
                            <th class="border border-zinc-300 p-2 w-40 h-10 text-zinc-700">
                                Kho hàng
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <template v-for="(option1, index1) in categories[0].options.slice(0, -1)">
                            <!-- Nếu có 2 phân loại -->
                            <template v-if="categories.length > 1">
                                <tr
                                    v-for="(option2, index2) in categories[1].options.slice(0, -1)"
                                    :key="index1 + '-' + index2"
                                >
                                    <!-- Gộp ô cho phân loại 1 -->
                                    <td
                                        v-if="index2 === 0"
                                        :rowspan="categories[1].options.length - 1"
                                        class="border border-zinc-300 p-2 text-center align-middle"
                                    >
                                        {{ option1 }}
                                    </td>
                                    <td class="p-2 text-center border border-zinc-300">
                                        {{ option2 }}
                                    </td>
                                    <td class="border border-zinc-300 p-2 relative">
                                        <span
                                            class="absolute top-1/2 -translate-y-1/2 left-6 h-6 border-r-[1px] border-zinc-300 pr-2 text-zinc-300"
                                            >đ</span
                                        >
                                        <input
                                            type="number"
                                            class="w-full text-zinc-700 relative text-left h-10 outline-none pr-3 pl-10 focus:border-zinc-400 border-[1px] border-zinc-300 hover:border-zinc-400 rounded-md"
                                            v-model="prices[`${option1}-${option2}`]"
                                            @input="updateSalesInf"
                                            placeholder="Nhập giá"
                                        />
                                    </td>
                                    <td class="border border-zinc-300 p-2 relative">
                                        <span
                                            class="absolute top-1/2 -translate-y-1/2 left-6 h-6 border-r-[1px] border-zinc-300 pr-2 text-zinc-300"
                                            >gr</span
                                        >
                                        <input
                                            type="number"
                                            class="w-full text-zinc-700 relative text-left h-10 outline-none pr-3 pl-11 focus:border-zinc-400 border-[1px] border-zinc-300 hover:border-zinc-400 rounded-md"
                                            v-model="weights[`${option1}-${option2}`]"
                                            @input="updateSalesInf"
                                            placeholder="Nhập giá"
                                        />
                                    </td>
                                    <td class="border border-zinc-300 p-2">
                                        <input
                                            type="number"
                                            class="w-full text-zinc-700 relative text-left h-10 outline-none p-3 focus:border-zinc-400 border-[1px] border-zinc-300 hover:border-zinc-400 rounded-md"
                                            v-model="quantity[`${option1}-${option2}`]"
                                            @input="updateSalesInf"
                                            placeholder="0"
                                        />
                                    </td>
                                </tr>
                            </template>

                            <!-- Nếu chỉ có 1 phân loại -->
                            <tr v-else :key="index1">
                                <td class="border border-zinc-300 p-2 text-center">
                                    {{ option1 }}
                                </td>
                                <td class="border border-zinc-300 p-2 relative">
                                    <span
                                        class="absolute top-1/2 -translate-y-1/2 left-6 h-6 border-r-[1px] border-zinc-300 pr-2 text-zinc-300"
                                        >đ</span
                                    >
                                    <input
                                        type="number"
                                        class="w-full relative text-zinc-700 text-left h-10 outline-none pr-3 pl-10 focus:border-zinc-400 border-[1px] border-zinc-300 hover:border-zinc-400 rounded-md"
                                        v-model="prices[`${option1}`]"
                                        @input="updateSalesInf"
                                        placeholder="Nhập giá"
                                    />
                                </td>
                                <td class="border border-zinc-300 p-2 relative">
                                    <span
                                        class="absolute top-1/2 -translate-y-1/2 left-6 h-6 border-r-[1px] border-zinc-300 pr-2 text-zinc-300"
                                        >gr</span
                                    >
                                    <input
                                        type="number"
                                        class="w-full relative text-zinc-700 text-left h-10 outline-none pr-3 pl-11 focus:border-zinc-400 border-[1px] border-zinc-300 hover:border-zinc-400 rounded-md"
                                        v-model="weights[`${option1}`]"
                                        @input="updateSalesInf"
                                        placeholder="Nhập giá"
                                    />
                                </td>
                                <td class="border border-zinc-300 p-2">
                                    <input
                                        type="number"
                                        class="w-full text-zinc-700 relative text-left h-10 outline-none p-3 focus:border-zinc-400 border-[1px] border-zinc-300 hover:border-zinc-400 rounded-md"
                                        v-model="quantity[`${option1}`]"
                                        @input="updateSalesInf"
                                        placeholder="0"
                                    />
                                </td>
                            </tr>
                        </template>
                    </tbody>
                </table>
            </div>
        </div>
        <div v-else>
            <div class="flex items-center mt-5">
                <div class="w-48 mr-6 flex justify-end text-sm text-zinc-900">
                    <span class="text-red-400 mr-1">*</span>
                    Giá bán
                </div>
                <div class="relative flex-1 grid grid-cols-2 gap-6">
                    <span
                        class="absolute top-1/2 -translate-y-1/2 left-4 h-6 border-r-[1px] border-zinc-300 pr-2 text-zinc-300"
                        >đ</span
                    >
                    <input
                        type="number"
                        class="w-full text-zinc-700 relative text-left h-10 outline-none pr-3 pl-10 focus:border-zinc-400 border-[1px] border-zinc-300 hover:border-zinc-400 rounded-md"
                        v-model="prices.product"
                        @input="updateSalesInf"
                        placeholder="Nhập giá"
                    />
                </div>
            </div>
            <div class="flex items-center mt-5">
                <div class="w-48 mr-6 flex justify-end text-sm text-zinc-900">
                    <span class="text-red-400 mr-1">*</span>
                    Trọng lượng
                </div>
                <div class="relative flex-1 grid grid-cols-2 gap-6">
                    <span
                        class="absolute top-1/2 -translate-y-1/2 left-4 h-6 border-r-[1px] border-zinc-300 pr-3 text-zinc-300"
                        >gr</span
                    >
                    <input
                        type="number"
                        class="w-full text-zinc-700 relative text-left h-10 outline-none pr-3 pl-11 focus:border-zinc-400 border-[1px] border-zinc-300 hover:border-zinc-400 rounded-md"
                        v-model="weights.product"
                        @input="updateSalesInf"
                        placeholder="Nhập trọng lượng"
                    />
                </div>
            </div>
            <div class="flex items-center mt-5">
                <div class="w-48 mr-6 flex justify-end text-sm text-zinc-900">
                    <span class="text-red-400 mr-1">*</span>
                    Kho hàng
                </div>
                <div class="relative flex-1 grid grid-cols-2 gap-6">
                    <input
                        type="number"
                        class="w-full text-zinc-700 relative text-left h-10 outline-none p-3 focus:border-zinc-400 border-[1px] border-zinc-300 hover:border-zinc-400 rounded-md"
                        v-model="quantity.product"
                        @input="updateSalesInf"
                        placeholder="0"
                    />
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
import { ref, reactive } from "vue";
const salesInf = ref([]);
watch(
    salesInf,
    (newVal) => {
        console.log("Cập nhật salesInf:", newVal);
    },
    { deep: true }
);

const categories = reactive([]);

const addCategory = () => {
    if (categories.length < 2) {
        categories.push({ name: "", options: [""] });
    }
};

const removeCategory = (index) => {
    categories.splice(index, 1);
};

const handleOptionInput = (category, index) => {
    if (category.options[index] !== "" && index === category.options.length - 1) {
        category.options.push("");
    }
};

const removeOption = (category, optIndex) => {
    category.options.splice(optIndex, 1);
};

const isDuplicate = (options, currentIndex) => {
    const currentValue = options[currentIndex];
    return (
        options.filter((opt, idx) => opt === currentValue && opt !== "" && idx !== currentIndex)
            .length > 0
    );
};
const prices = ref({});
const weights = ref({});
const quantity = ref({});

const updateSalesInf = () => {
    salesInf.value = []; // Reset danh sách trước khi cập nhật

    if (categories.length === 2) {
        categories[0]?.options.slice(0, -1).forEach((option1) => {
            categories[1]?.options.slice(0, -1).forEach((option2) => {
                salesInf.value.push({
                    option1,
                    option2,
                    price: prices.value[`${option1}-${option2}`] ?? 0,
                    weight: weights.value[`${option1}-${option2}`] ?? 0,
                    quantity: quantity.value[`${option1}-${option2}`] ?? 1,
                });
            });
        });
    } else if (categories.length === 1) {
        categories[0]?.options.slice(0, -1).forEach((option1) => {
            salesInf.value.push({
                option1,
                option2: null,
                price: prices.value[option1] ?? 0,
                weight: weights.value[option1] ?? 0,
                quantity: quantity.value[option1] ?? 1,
            });
        });
    } else {
        // Nếu không có phân loại => Lưu số lượng sản phẩm chính
        salesInf.value.push({
            option1: null,
            option2: null,
            price: prices.value.product ?? 0,
            weight: weights.value.product ?? 0,
            quantity: quantity.value.product ?? 1,
        });
    }
};
</script>

<style scoped>
input[type="number"]::-webkit-outer-spin-button,
input[type="number"]::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
}

/* Ẩn nút tăng giảm trên Firefox */
input[type="number"] {
    -moz-appearance: textfield;
}
</style>
