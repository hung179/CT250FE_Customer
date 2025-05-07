<template>
    <div v-if="isVisible" class="fixed inset-0 z-50 flex items-center justify-center">
        <!-- Overlay mờ phía sau -->
        <div class="absolute inset-0 bg-black/75 backdrop-blur-sm" @click="closeModal"></div>

        <div
            class="bg-white rounded-lg w-full max-w-4xl mx-auto flex flex-col shadow-lg relative z-10 max-h-[85vh]"
        >
            <!-- Header với nút đóng -->
            <div
                class="px-6 py-4 border-b border-gray-200 flex justify-between items-center sticky top-0 bg-white z-20"
            >
                <h2 class="text-xl font-bold">Chi tiết sản phẩm</h2>
                <button @click="closeModal" class="text-gray-500 hover:text-gray-700">
                    <span class="text-2xl">&times;</span>
                </button>
            </div>

            <div class="flex-1 overflow-y-auto">
                <div class="flex flex-col md:flex-row">
                    <div class="relative"></div>
                    <div
                        class="sticky top-20 md:w-2/5 h-64 md:h-80 p-4 flex items-center justify-center"
                    >
                        <img
                            :src="productData?.anhBia_SP?.url || ''"
                            alt="Product"
                            class="max-w-full max-h-full object-contain"
                            loading="eager"
                        />
                    </div>

                    <!-- Tab content container -->
                    <div class="md:w-3/5 flex flex-col">
                        <!-- Tabs Navigation - giữ cố định -->
                        <div class="flex border-b px-6 bg-white sticky top-0 z-10">
                            <button
                                v-for="(tab, index) in tabs"
                                :key="index"
                                @click="activeTab = index"
                                :class="[
                                    'px-4 py-2 font-medium transition-colors duration-200',
                                    activeTab === index
                                        ? 'border-b-2 border-blue-600 text-blue-600'
                                        : 'text-gray-600 hover:text-gray-800',
                                ]"
                            >
                                {{ tab }}
                            </button>
                        </div>

                        <div class="p-6">
                            <!-- Tab 1: Thông tin sản phẩm -->
                            <div v-show="activeTab === 0">
                                <h3 class="text-2xl font-bold mb-4">
                                    {{ productData?.ten_SP || "Đang tải..." }}
                                </h3>

                                <!-- Giá theo tuỳ chọn đã chọn -->
                                <div
                                    v-if="currentVariantPrice"
                                    class="text-2xl font-bold text-blue-600 mb-4"
                                >
                                    {{ formatPrice(currentVariantPrice) }}
                                </div>

                                <!-- Số lượng tồn kho theo tuỳ chọn đã chọn -->
                                <div class="flex items-center mb-6">
                                    <h4 class="font-medium mr-2">Còn lại:</h4>
                                    <div v-if="currentVariantStock" class="text-gray-500">
                                        {{ currentVariantStock }} sản phẩm
                                    </div>
                                </div>

                                <!-- Product Variants -->
                                <div
                                    v-if="
                                        productData?.phanLoai_SP &&
                                        productData.phanLoai_SP.length > 0
                                    "
                                    class="mb-6"
                                >
                                    <div
                                        v-for="(phanLoai, plIndex) in productData.phanLoai_SP"
                                        :key="plIndex"
                                        class="mb-4"
                                    >
                                        <h4 class="font-medium mb-2">{{ phanLoai.ten_PL }}:</h4>
                                        <div class="flex flex-wrap gap-2">
                                            <button
                                                v-for="(option, optIndex) in phanLoai.tuyChon_PL"
                                                :key="optIndex"
                                                :class="[
                                                    'px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500',
                                                    selectedOptions[plIndex] === optIndex
                                                        ? 'border-blue-600 bg-blue-50'
                                                        : 'border-gray-300 hover:border-blue-600',
                                                ]"
                                                @click="selectOption(plIndex, optIndex)"
                                            >
                                                {{ option.ten_TC }}
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                <div class="mb-6 flex items-center">
                                    <h4 class="font-medium mr-2">Trọng lượng:</h4>
                                    <p class="text-gray-600">
                                        {{
                                            currentVariant?.trongLuong_BH ||
                                            productData?.trongLuong_SP ||
                                            "-"
                                        }}
                                        gram
                                    </p>
                                </div>

                                <div class="mb-6">
                                    <h4 class="font-medium mb-2">Số lượng:</h4>
                                    <div class="flex items-center">
                                        <button
                                            @click="decrementQuantity"
                                            class="w-10 h-10 bg-gray-100 flex items-center justify-center rounded-l-md border border-gray-300"
                                        >
                                            <span class="text-gray-600">-</span>
                                        </button>
                                        <input
                                            v-model="quantity"
                                            type="number"
                                            min="1"
                                            class="w-16 h-10 text-center border-t border-b border-gray-300 focus:outline-none"
                                        />
                                        <button
                                            @click="incrementQuantity"
                                            class="w-10 h-10 bg-gray-100 flex items-center justify-center rounded-r-md border border-gray-300"
                                        >
                                            <span class="text-gray-600">+</span>
                                        </button>
                                    </div>
                                </div>

                                <button
                                    @click="addToCart"
                                    class="w-full bg-emerald-400 hover:bg-emerald-500 text-white px-6 py-3 rounded-md font-medium transition duration-300"
                                >
                                    Thêm vào giỏ hàng
                                </button>
                            </div>

                            <!-- Tab 2: Mô tả sản phẩm -->
                            <div v-show="activeTab === 1" class="space-y-6">
                                <h3 class="text-2xl font-bold mb-4">Mô tả sản phẩm</h3>

                                <!-- Product description text -->
                                <p class="text-gray-600">
                                    {{ productData?.moTa_SP || "Không có mô tả" }}
                                </p>
                                <!-- Product images gallery -->
                                <div
                                    v-if="productData?.anh_SP && productData.anh_SP.length > 0"
                                    class="mt-6"
                                >
                                    <h4 class="text-lg font-medium mb-3">Hình ảnh sản phẩm</h4>
                                    <div class="grid grid-cols-2 md:grid-cols-3 gap-4">
                                        <div
                                            v-for="(image, index) in productData.anh_SP"
                                            :key="image._id || index"
                                            class="aspect-square overflow-hidden rounded-lg border border-gray-200"
                                        >
                                            <img
                                                :src="image.url"
                                                :alt="`Hình ảnh ${index + 1} của sản phẩm ${productData.ten_SP}`"
                                                class="w-full h-full object-contain cursor-pointer hover:scale-105 transition-transform duration-300"
                                                loading="lazy"
                                                @click="openFullImage(image.url)"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <!-- Tab 3: Thông số kỹ thuật -->
                            <div v-show="activeTab === 2">
                                <h3 class="text-2xl font-bold mb-4">Thông số kỹ thuật</h3>

                                <!-- Hiển thị thông số kỹ thuật với tên thuộc tính được load từ API -->
                                <div
                                    v-if="
                                        productData?.ttChiTiet_SP &&
                                        productData.ttChiTiet_SP.length > 0
                                    "
                                >
                                    <div
                                        v-for="(detail, index) in productData.ttChiTiet_SP"
                                        :key="index"
                                        class="flex py-2 border-b border-gray-100"
                                    >
                                        <div class="font-medium text-gray-600 w-1/3">
                                            <!-- Hiển thị tên thuộc tính hoặc loading state -->
                                            {{ getAttributeName(detail.thuocTinh_CTSP) }}:
                                        </div>
                                        <div class="text-gray-800 w-2/3">
                                            {{ detail.giaTri_CTSP }}
                                        </div>
                                    </div>
                                    <!-- Hiển thị skeleton khi đang tải thông tin thuộc tính -->
                                    <div v-if="loadingAttributes" class="flex items-center mt-2">
                                        <div
                                            class="w-5 h-5 border-t-2 border-blue-500 rounded-full animate-spin mr-2"
                                        ></div>
                                        <span class="text-sm text-gray-500"
                                            >Đang tải thông tin thuộc tính...</span
                                        >
                                    </div>
                                </div>

                                <div v-else>
                                    <div
                                        v-if="!productData?.ttChiTiet_SP"
                                        class="text-gray-600 mt-4"
                                    >
                                        Không có thông số kỹ thuật chi tiết khác
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Footer -->
            <div class="px-6 py-4 border-t border-gray-200 flex justify-end">
                <button
                    @click="closeModal"
                    class="bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-2 rounded-md font-medium transition duration-300"
                >
                    Đóng
                </button>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, computed, watch, onMounted, onBeforeUnmount } from "vue";
const { $api } = useNuxtApp();

const props = defineProps({
    isVisible: {
        type: Boolean,
        default: false,
    },
    product: {
        type: Object,
        default: () => ({}),
    },
});

const emit = defineEmits(["close", "add-to-cart"]);

const productData = ref(null);
const activeTab = ref(0);
const quantity = ref(1);
const selectedOptions = ref({});
const tabs = ref(["Thông tin", "Mô tả", "Thông số"]);

const attributeCache = ref({}); 
const loadingAttributes = ref(false);

const formatPrice = (price) => {
    return new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(price);
};

const currentVariant = computed(() => {
    if (
        !productData.value ||
        !productData.value.ttBanHang_SP ||
        productData.value.ttBanHang_SP.length === 0
    ) {
        return null;
    }

    if (!productData.value.phanLoai_SP || productData.value.phanLoai_SP.length === 0) {
        return productData.value.ttBanHang_SP[0];
    }

    const option1 = selectedOptions.value[0] !== undefined ? selectedOptions.value[0] : 0;
    const option2 = selectedOptions.value[1] !== undefined ? selectedOptions.value[1] : 0;

    return (
        productData.value.ttBanHang_SP.find(
            (variant) =>
                variant.tuyChonPhanLoai1_BH === option1 && variant.tuyChonPhanLoai2_BH === option2
        ) || productData.value.ttBanHang_SP[0]
    );
});

const currentVariantPrice = computed(() => {
    return currentVariant.value?.giaBan_BH || 0;
});

const currentVariantStock = computed(() => {
    return currentVariant.value?.khoHang_BH || 0;
});

const decrementQuantity = () => {
    if (quantity.value > 1) {
        quantity.value--;
    }
};

const incrementQuantity = () => {
    if (currentVariantStock.value && quantity.value < currentVariantStock.value) {
        quantity.value++;
    }
};

const addToCart = () => {
    if (productData.value && currentVariant.value) {
        const formattedOptions = {};
        if (productData.value.phanLoai_SP) {
            productData.value.phanLoai_SP.forEach((phanLoai, index) => {
                const optionIndex = selectedOptions.value[index] || 0;
                if (phanLoai.tuyChon_PL && phanLoai.tuyChon_PL[optionIndex]) {
                    formattedOptions[phanLoai.ten_PL] = phanLoai.tuyChon_PL[optionIndex].ten_TC;
                }
            });
        }
        emit("add-to-cart", {
            product: productData.value,
            variant: currentVariant.value,
            quantity: quantity.value,
            selectedOptions: formattedOptions,
        });
        closeModal();
    }
};

const closeModal = () => {
    emit("close");
};

const selectOption = (categoryIndex, optionIndex) => {
    selectedOptions.value = {
        ...selectedOptions.value,
        [categoryIndex]: optionIndex,
    };
};

const getAttributeName = (attributeId) => {
    return attributeCache.value[attributeId] || "Đang tải...";
};

const fetchAttributes = async () => {
    if (
        !productData.value ||
        !productData.value.ttChiTiet_SP ||
        productData.value.ttChiTiet_SP.length === 0
    ) {
        return;
    }

    const attributeIds = productData.value.ttChiTiet_SP
        .map((item) => item.thuocTinh_CTSP)
        .filter((id) => !attributeCache.value[id]);
    if (attributeIds.length === 0) {
        return;
    }

    loadingAttributes.value = true;

    try {
        const promises = attributeIds.map((id) => $api.get(`/attributes/${id}`));
        const responses = await Promise.all(promises);
        responses.forEach((response) => {
            if (response.data.data && response.data.data._id) {
                attributeCache.value[response.data.data._id] =
                    response.data.data.ten_TT || "Không xác định";
            }
        });
    } catch (error) {
        console.error("Lỗi khi lấy thông tin thuộc tính:", error);
    } finally {
        loadingAttributes.value = false;
    }
};

const fetchAttributesBatch = async () => {
    if (
        !productData.value ||
        !productData.value.ttChiTiet_SP ||
        productData.value.ttChiTiet_SP.length === 0
    ) {
        return;
    }

    const attributeIds = productData.value.ttChiTiet_SP
        .map((item) => item.thuocTinh_CTSP)
        .filter((id) => !attributeCache.value[id]);

    if (attributeIds.length === 0) return;

    loadingAttributes.value = true;

    try {
        const response = await $api.get("/attributes", {
            params: { ids: attributeIds.join(",") },
        });

        if (response.data && Array.isArray(response.data)) {
            response.data.forEach((attr) => {
                if (attr._id) {
                    attributeCache.value[attr._id] = attr.ten_TT || "Không xác định";
                }
            });
        }
    } catch (error) {
        console.error("Lỗi khi lấy thông tin thuộc tính hàng loạt:", error);
    } finally {
        loadingAttributes.value = false;
    }
};

const disableBodyScroll = () => {
    document.body.style.overflow = "hidden";
};

const enableBodyScroll = () => {
    document.body.style.overflow = "";
};

const handleKeyDown = (event) => {
    if (event.key === "Escape" && props.isVisible) {
        closeModal();
    }
};

const openFullImage = (imageUrl) => {
    window.open(imageUrl, "_blank");
};

watch(
    () => props.product,
    (newProduct) => {
        if (newProduct) {
            productData.value = {
                ...newProduct,
                ten_SP: newProduct.ten_SP
                    ? newProduct.ten_SP.replace(/"/g, "")
                    : "Sản phẩm không tên",
            };

            selectedOptions.value = {};

            if (newProduct.phanLoai_SP) {
                newProduct.phanLoai_SP.forEach((_, index) => {
                    selectedOptions.value[index] = 0;
                });
            }

            fetchAttributes();
        }
    },
    { immediate: true, deep: true }
);

watch(
    () => props.isVisible,
    (newValue) => {
        if (newValue) {
            disableBodyScroll();
            activeTab.value = 0;
            quantity.value = 1;

            if (productData.value?.phanLoai_SP) {
                productData.value.phanLoai_SP.forEach((_, index) => {
                    selectedOptions.value[index] = 0;
                });
            }

            fetchAttributes();
        } else {
            enableBodyScroll();
        }
    }
);

watch(
    () => activeTab.value,
    (newTab) => {
        if (newTab === 2) {
            fetchAttributes();
        }
    }
);

onMounted(() => {
    document.addEventListener("keydown", handleKeyDown);
    console.log(productData.value);
});

onBeforeUnmount(() => {
    document.removeEventListener("keydown", handleKeyDown);
    enableBodyScroll();
});
</script>
