<template>
    <div class="h-fit w-full p-8 rounded-xl bg-white">
        <div class="text-xl font-semibold text-zinc-900 w-full rounded-t-xl bg-zinc-50 mb-10">
            Thông tin cơ bản
        </div>
        <!-- Ảnh bìa -->
        <div class="w-full h-fit">
            <div class="w-full h-fit flex">
                <div class="w-64 mr-6 flex justify-end text-sm text-zinc-900">
                    <span class="text-red-400 mr-1">*</span>
                    Ảnh bìa sản phẩm
                </div>
                <div class="flex-1 flex">
                    <div v-if="imageCover" class="relative group w-20 h-20">
                        <!-- Hiển thị ảnh sau khi chọn -->
                        <img
                            :src="imageCover"
                            alt="Product Image"
                            class="w-full h-full object-cover border-[1px] border-zinc-300 rounded-md"
                        />
                        <div
                            @click="removeImgCover"
                            class="absolute bottom-0 w-full h-fit bg-zinc-200 rounded-b-md group-hover:flex justify-center items-center py-1 hidden cursor-pointer"
                        >
                            <Icon
                                name="material-symbols:delete-outline-rounded"
                                size="18"
                                class="text-white"
                            />
                        </div>
                    </div>
                    <div
                        v-else
                        @click="$refs.file.click()"
                        class="w-20 h-20 border-[1px] border-zinc-400 rounded-md border-dashed bg-transparent hover:bg-emerald-200/20 hover:border-emerald-400 cursor-pointer"
                    >
                        <div class="w-full h-full flex flex-col justify-center items-center">
                            <Icon
                                name="material-symbols:add-photo-alternate-outline-rounded"
                                size="28px"
                                class="text-emerald-400"
                            />
                            <p class="text-xs text-center">Thêm hình ảnh</p>
                        </div>
                    </div>
                    <div class="h-full flex-1 ml-10 mt-2 text-xs text-zinc-600">
                        <ul class="list-disc">
                            <li>Tải lên hình ảnh 1:1.</li>
                            <li>
                                Ảnh bìa sẽ được hiển thị tại các trang Kết quả tìm kiếm, Gợi ý,...
                                Việc sử dụng ảnh bìa đẹp sẽ thu hút thêm lượt truy cập vào sản phẩm
                                của bạn
                            </li>
                        </ul>
                    </div>
                </div>
                <input
                    ref="file"
                    type="file"
                    class="hidden"
                    accept="image/*"
                    @change="handleFileChange_imgCover"
                />
            </div>
        </div>

        <!-- Ảnh sản phẩm -->
        <div class="w-full h-fit mt-10">
            <div class="w-full h-fit flex">
                <div class="w-64 mr-6 flex justify-end text-sm text-zinc-900">
                    <span class="text-red-400 mr-1">*</span>
                    Ảnh sản phẩm
                </div>
                <div class="flex-1">
                    <div class="flex space-x-2 flex-wrap">
                        <!-- Hiển thị các ảnh đã chọn -->
                        <div
                            v-for="(image, index) in images"
                            :key="index"
                            class="relative group w-20 h-20 rounded-md"
                        >
                            <!-- Hiển thị ảnh -->
                            <img
                                :src="image"
                                alt="Product Image"
                                class="w-full h-full object-cover rounded-md border-[1px] border-zinc-300"
                            />
                            <div
                                @click="removeImg(index)"
                                class="absolute bottom-0 w-full h-fit bg-zinc-200/90 rounded-b-md group-hover:flex justify-center items-center py-1 hidden cursor-pointer"
                            >
                                <Icon
                                    name="material-symbols:delete-outline-rounded"
                                    size="18"
                                    class="text-white"
                                />
                            </div>
                        </div>

                        <!-- Nếu chưa đủ 9 ảnh, hiển thị thêm ô chọn ảnh -->
                        <div
                            v-if="images.length < 9"
                            @click="$refs.files.click()"
                            class="w-20 h-20 border-[1px] border-zinc-400 rounded-md border-dashed bg-transparent hover:bg-emerald-200/20 hover:border-emerald-400 cursor-pointer"
                        >
                            <div class="w-full h-full flex flex-col justify-center items-center">
                                <Icon
                                    name="material-symbols:add-photo-alternate-outline-rounded"
                                    size="28px"
                                    class="text-emerald-400"
                                />
                                <p class="text-xs text-center">
                                    Thêm hình ảnh ({{ totalImg }}/{{ maxFiles }})
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Input file ẩn -->
                <input
                    ref="files"
                    type="file"
                    multiple
                    class="hidden"
                    accept="image/*"
                    @change="handleFileChange_imgs"
                    :disabled="images.length >= 9"
                />
            </div>
        </div>

        <!-- Tên sản phẩm  -->
        <div class="w-full h-fit mt-10">
            <div class="w-full h-fit flex items-center">
                <div class="w-64 mr-6 flex justify-end text-sm text-zinc-900">
                    <span class="text-red-400 mr-1">*</span>
                    Tên sản phẩm
                </div>
                <div class="relative flex-1">
                    <input
                        type="text"
                        id="p_name"
                        @input="countNameCharacters"
                        v-model="name"
                        :maxlength="120"
                        class="w-full text-sm text-zinc-900 bg-transparent border-[1px] border-zinc-300 hover:border-zinc-400 rounded-md h-10 outline-none pl-2 pr-20 focus:border-zinc-400"
                    />
                    <div class="absolute right-0 top-0 w-20 h-10 flex items-center">
                        <div class="h-8 w-[1px] bg-zinc-300"></div>
                        <p class="w-full text-center mx-2 text-zinc-400">{{ nameCharCount }}/120</p>
                    </div>
                </div>
            </div>
        </div>

        <!-- Ngành hàng -->
        <div class="w-full h-fit mt-10">
            <div class="w-full h-fit flex items-center">
                <div class="w-64 mr-6 flex justify-end text-sm text-zinc-900">
                    <span class="text-red-400 mr-1">*</span>
                    Ngành hàng
                </div>
                <div class="relative flex-1 cursor-pointer group" @click="showCategoryTable = true">
                    <input
                        type="text"
                        id="p_category"
                        v-model="category"
                        disabled
                        class="w-full pointer-events-none cursor-pointer text-sm text-zinc-900 bg-transparent border-[1px] border-zinc-300 group-hover:border-zinc-400 rounded-md h-10 outline-none pl-2 pr-20 focus:border-zinc-400"
                    />
                    <div class="absolute right-0 top-0 w-fit h-10 flex items-center justify-center">
                        <div class="h-8 w-[1px] bg-zinc-300"></div>
                        <Icon name="ic:outline-edit" class="text-zinc-400 mx-4" size="20px" />
                    </div>
                </div>
            </div>
        </div>
        <categoryTable v-if="showCategoryTable" @close="showCategoryTable = false" />

        <!-- Mô tả sản phẩm -->
        <div class="w-full h-fit mt-10">
            <div class="w-full h-fit flex">
                <div class="w-64 mr-6 flex justify-end text-sm text-zinc-900">
                    <span class="text-red-400 mr-1">*</span>
                    Mô tả sản phẩm
                </div>
                <div class="flex-1 flex flex-col items-end">
                    <textarea
                        id="p_describe"
                        @input="countDescribeCharacters"
                        v-model="describe"
                        :maxlength="3000"
                        class="w-full text-sm text-zinc-900 bg-transparent border-[1px] border-zinc-300 hover:border-zinc-400 rounded-md h-48 outline-none p-2 focus:border-zinc-400 resize-none overflow-y-auto"
                    ></textarea>
                    <div class="right-0 w-fit h-fit flex items-center">
                        <p class="w-full text-center mx-2 text-zinc-400">
                            {{ describeCharCount }}/3000
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
import { ref } from "vue";

import categoryTable from "~/components/product/category-table.vue";

const totalImg = ref(0);
const imageCover = ref(null);

const handleFileChange_imgCover = (event) => {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = () => {
            imageCover.value = reader.result;
        };
        reader.readAsDataURL(file);
    }
};

const images = ref([]);
const maxFiles = 9;

const handleFileChange_imgs = (event) => {
    const files = event.target.files;
    const filesArray = Array.from(files);
    if (filesArray.length > 0) {
        const filesToProcess = filesArray.slice(0, maxFiles - images.value.length);

        filesToProcess.forEach((file) => {
            totalImg.value++;
            const reader = new FileReader();
            reader.onload = () => {
                images.value.push(reader.result);
            };
            reader.readAsDataURL(file);
        });
    }
};

const removeImgCover = () => {
    imageCover.value = null;
};

const removeImg = (index) => {
    totalImg.value--;
    images.value.splice(index, 1);
};

const name = ref("");
const nameCharCount = ref(120);
const countNameCharacters = () => {
    if (name.value.length > 120) {
        name.value = name.value.slice(0, 120); // Cắt chuỗi nếu quá dài
    }
    nameCharCount.value = name.value.length; // Cập nhật số ký tự
};

const describe = ref("");
const describeCharCount = ref(3000);
const countDescribeCharacters = () => {
    if (describe.value.length > 3000) {
        describe.value = describe.value.slice(0, 3000); // Cắt chuỗi nếu quá dài
    }
    describeCharCount.value = describe.value.length; // Cập nhật số ký tự
};

const showCategoryTable = ref(false);
</script>
