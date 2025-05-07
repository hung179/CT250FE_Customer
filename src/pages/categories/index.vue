<template>
    <div class="flex flex-col min-h-screen">
        <Header class="w-full"></Header>

        <div class="flex my-4 mt-16">
            <!-- Sidebar -->
            <div
                class="sidebar-container h-full w-64 bg-white shadow-md rounded-lg overflow-hidden flex-shrink-0"
            >
                <div class="p-4 bg-gray-100 border-b">
                    <h2 class="font-bold text-xl text-gray-800">Danh Mục Sản Phẩm</h2>
                </div>

                <div class="category-list">
                    <!-- Danh mục cấp 1 -->
                    <div v-for="(category, index) in categories" :key="index">
                        <div v-if="isCategoryRoot(category)" class="category-item">
                            <!-- Danh mục cha (cấp 1) có thể click -->
                            <div
                                class="flex items-center justify-between p-3 hover:bg-gray-50 cursor-pointer transition-colors"
                                @click="toggleCategory(category._id)"
                            >
                                <span class="font-medium text-gray-800">{{ category.ten_NH }}</span>
                                <svg
                                    :class="[
                                        'w-4 h-4 transition-transform',
                                        expandedCategories.includes(category._id)
                                            ? 'transform rotate-180'
                                            : '',
                                    ]"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        stroke-width="2"
                                        d="M19 9l-7 7-7-7"
                                    ></path>
                                </svg>
                            </div>

                            <!-- Danh mục con (cấp 2) -->
                            <div
                                v-if="expandedCategories.includes(category._id)"
                                class="subcategory-container"
                            >
                                <div
                                    v-for="(firstChild, firstChildIndex) in getChildCategories(
                                        category._id,
                                        2
                                    )"
                                    :key="firstChildIndex"
                                    class="subcategory-item"
                                >
                                    <!-- Danh mục cấp 2 có thể click -->
                                    <div
                                        class="flex items-center justify-between pl-6 pr-3 py-2 hover:bg-gray-50 cursor-pointer border-l-2 border-gray-100 hover:border-blue-500 transition-colors"
                                        @click="toggleCategory(firstChild._id)"
                                    >
                                        <span class="text-gray-700">{{ firstChild.ten_NH }}</span>
                                        <svg
                                            v-if="hasChildren(firstChild._id)"
                                            :class="[
                                                'w-3 h-3 transition-transform',
                                                expandedCategories.includes(firstChild._id)
                                                    ? 'transform rotate-180'
                                                    : '',
                                            ]"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                stroke-linecap="round"
                                                stroke-linejoin="round"
                                                stroke-width="2"
                                                d="M19 9l-7 7-7-7"
                                            ></path>
                                        </svg>
                                    </div>

                                    <!-- Danh mục cấp 3 -->
                                    <div
                                        v-if="expandedCategories.includes(firstChild._id)"
                                        class="subcategory-level3"
                                    >
                                        <div
                                            v-for="(secondChild, secondIndex) in getChildCategories(
                                                firstChild._id,
                                                3
                                            )"
                                            :key="secondIndex"
                                            class="pl-10 pr-3 py-2 hover:bg-blue-50 cursor-pointer text-sm text-gray-600 border-l-2 border-gray-100 hover:border-blue-500 transition-colors"
                                            @click="selectCategory(secondChild)"
                                        >
                                            {{ secondChild.ten_NH }}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Products Grid và Pagination -->
            <div class="flex-1 p-6 flex flex-col">
                <div v-if="products.length === 0" class="p-6 flex-grow">
                    <div
                        class="flex items-center justify-center p-6 rounded-lg border border-dashed border-gray-300 bg-gray-50 text-center text-gray-600"
                    >
                        <div>
                            <div class="text-2xl mb-2">📦</div>
                            <div v-if="!selectedCategory" class="text-lg font-semibold">
                                Hãy chọn một ngành hàng để xem sản phẩm
                            </div>
                            <div v-else class="text-lg font-semibold">
                                Không có sản phẩm nào trong danh mục này
                            </div>
                        </div>
                    </div>
                </div>

                <div
                    v-else
                    class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                >
                    <div
                        v-for="(product, index) in displayedProducts"
                        :key="index"
                        class="bg-white rounded-lg overflow-hidden shadow-md hover:-translate-y-1 transition duration-300"
                    >
                        <div class="h-52 bg-gray-200">
                            <img
                                :src="product.anhBia_SP.url"
                                alt="Product"
                                class="w-full h-full object-cover"
                            />
                        </div>
                        <div class="p-4">
                            <h3 class="text-lg font-medium mb-2 line-clamp-2 h-14">
                                {{ product.ten_SP }}
                            </h3>
                            <div class="text-xl font-bold text-blue-600 mb-2">
                                {{ formatPrice(product.ttBanHang_SP[0].giaBan_BH) }}
                            </div>
                            <div class="text-sm text-gray-500 mb-4">
                                Còn lại: {{ product.ttBanHang_SP[0].khoHang_BH }} sản phẩm
                            </div>
                            <div class="flex space-x-2">
                                <button
                                    @click="showProductDetails(product)"
                                    class="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-800 px-4 py-2 rounded-md font-medium transition duration-300"
                                >
                                    Chi tiết
                                </button>
                                <button
                                    @click="addToCart(product)"
                                    class="flex-1 bg-emerald-400 hover:bg-emerald-500 text-white px-4 py-2 rounded-md font-medium transition duration-300"
                                >
                                    Thêm vào giỏ
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Pagination Component -->
                <div v-if="totalPages > 1" class="mt-8 flex justify-center items-center space-x-2">
                    <button
                        @click="goToPage(currentPage - 1)"
                        :disabled="currentPage === 1"
                        class="px-3 py-1 rounded-md border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        <span class="sr-only">Previous</span>
                        <svg
                            class="w-5 h-5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M15 19l-7-7 7-7"
                            ></path>
                        </svg>
                    </button>

                    <!-- Hiển thị số trang với giới hạn -->
                    <div v-for="page in displayedPageNumbers" :key="page">
                        <span v-if="page === '...'" class="px-3 py-1">...</span>
                        <button
                            v-else
                            @click="goToPage(page)"
                            :class="[
                                'px-3 py-1 rounded-md transition-colors',
                                currentPage === page
                                    ? 'bg-blue-600 text-white'
                                    : 'border border-gray-300 bg-white text-gray-700 hover:bg-gray-50',
                            ]"
                        >
                            {{ page }}
                        </button>
                    </div>

                    <button
                        @click="goToPage(currentPage + 1)"
                        :disabled="currentPage === totalPages"
                        class="px-3 py-1 rounded-md border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        <span class="sr-only">Next</span>
                        <svg
                            class="w-5 h-5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M9 5l7 7-7 7"
                            ></path>
                        </svg>
                    </button>
                </div>
            </div>
        </div>
        <!-- Product Detail Modal -->
        <Product
            :is-visible="isProductModalVisible"
            :product="selectedProduct"
            @close="closeProductModal"
            @add-to-cart="handleAddToCartFromModal"
        />
        <Footer/>
    </div>
</template>

<script setup>
import { ref, reactive, onMounted, computed } from "vue";
import Swal from 'sweetalert2'

const { $api } = useNuxtApp();
const categories = reactive([]);
const expandedCategories = ref([]);
const selectedCategory = ref(null);
const products = ref([]);
const authStore = useAuthStore();
const userId = authStore.userId;
const isProductModalVisible = ref(false);
const selectedProduct = ref(null);

// Pagination
const currentPage = ref(1);
const itemsPerPage = 12;
const totalProducts = ref(0);

// Tính toán số trang dựa trên tổng sản phẩm
const totalPages = computed(() => {
    return Math.ceil(totalProducts.value / itemsPerPage);
});

// Tính các sản phẩm sẽ hiển thị trên trang hiện tại
const displayedProducts = computed(() => {
    return products.value;
});

// Tạo mảng số trang để hiển thị (với dấu '...' cho các trang ẩn)
const displayedPageNumbers = computed(() => {
    const result = [];
    const maxVisiblePages = 5; // Số trang tối đa hiển thị

    if (totalPages.value <= maxVisiblePages) {
        // Hiển thị tất cả các trang nếu tổng số trang <= maxVisiblePages
        for (let i = 1; i <= totalPages.value; i++) {
            result.push(i);
        }
    } else {
        // Luôn hiển thị trang đầu tiên
        result.push(1);

        // Vị trí bắt đầu và kết thúc cho các trang ở giữa
        let startPage = Math.max(2, currentPage.value - 1);
        let endPage = Math.min(totalPages.value - 1, currentPage.value + 1);

        // Thêm dấu "..." sau trang đầu tiên nếu cần
        if (startPage > 2) {
            result.push("...");
        }

        // Thêm các trang ở giữa
        for (let i = startPage; i <= endPage; i++) {
            result.push(i);
        }

        // Thêm dấu "..." trước trang cuối cùng nếu cần
        if (endPage < totalPages.value - 1) {
            result.push("...");
        }

        // Luôn hiển thị trang cuối cùng
        result.push(totalPages.value);
    }

    return result;
});

onMounted(async () => {
    try {
        const response = (await $api.get("/categories")).data.data;
        categories.push(...response);
    } catch (error) {
        console.error("Error loading categories:", error);
    }
});

// Di chuyển đến trang được chọn
const goToPage = async (page) => {
    if (page < 1 || page > totalPages.value || page === currentPage.value) return;

    currentPage.value = page;
    await loadProductsForCurrentPage();
};

// Tải sản phẩm cho trang hiện tại
const loadProductsForCurrentPage = async () => {
    if (!selectedCategory.value) return;

    try {
        const response = (
            await $api.get(
                `/products/?category=${selectedCategory.value._id}&limit=${itemsPerPage}&page=${currentPage.value - 1}&state=1`
            )
        ).data.data;

        if (response) {
            products.value = response.products;
            totalProducts.value = response.totalProducts || response.products.length;
        } else {
            products.value = [];
            totalProducts.value = 0;
        }
    } catch (error) {
        console.error("Error loading products:", error);
        products.value = [];
        totalProducts.value = 0;
    }
};

// Kiểm tra xem danh mục có phải là danh mục gốc hay không
const isCategoryRoot = (category) => {
    return category.idCha_NH === null;
};

// Lấy danh sách các danh mục con của một danh mục cha
const getChildCategories = (parentId, level) => {
    return categories.filter((cat) => cat.idCha_NH === parentId && cat.cap_NH === level);
};

// Kiểm tra xem danh mục có danh mục con hay không
const hasChildren = (parentId) => {
    return categories.some((cat) => cat.idCha_NH === parentId);
};

// Mở rộng/thu gọn danh mục
const toggleCategory = (categoryId) => {
    const index = expandedCategories.value.indexOf(categoryId);
    if (index === -1) {
        expandedCategories.value.push(categoryId);
    } else {
        expandedCategories.value.splice(index, 1);
    }
};

// Chọn một danh mục
const selectCategory = async (category) => {
    selectedCategory.value = category;
    currentPage.value = 1; // Reset về trang đầu tiên khi chọn danh mục mới
    try {
        const response = (
            await $api.get(
                `/products/?category=${category._id}&limit=${itemsPerPage}&page=0&state=1`
            )
        ).data.data;
        console.log("Selected category products:", response);

        if (response) {
            products.value = response.products;
            totalProducts.value = response.totalProducts || response.products.length;
        } else {
            products.value = [];
            totalProducts.value = 0;
        }
    } catch (error) {
        console.error("Error loading products:", error);
        products.value = [];
        totalProducts.value = 0;
    }
};

const formatPrice = (price) => {
    return new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(price);
};

const showProductDetails = (product) => {
    // Giả sử biến này đã được định nghĩa trong component cha hoặc sử dụng global store
    selectedProduct.value = product;
    isProductModalVisible.value = true;
    console.log("Show product details:", product);
    // Cài đặt thêm logic hiển thị chi tiết sản phẩm ở đây
};

const addToCart = async (product, variant = null, quantity = 1) => {
    try {
        const data = {
            idKhachHang: userId,
            idSanPham: product._id,
            idTTBanHang: variant ? variant._id : product.ttBanHang_SP[0]._id,
            soLuong: quantity,
        };

        const response = (await $api.post(`/customers/cart`, data)).data;
        if (response.success) {
            Swal.fire({
                icon: "success",
                title: "Thành công",
                text: "Thêm vào giỏ hàng thành công",
            });
        }
    } catch (error) {
        console.error("Lỗi khi thêm sản phẩm vào giỏ hàng:", error);
    }
};

const closeProductModal = () => {
    isProductModalVisible.value = false;
};

const handleAddToCartFromModal = (data) => {
  addToCart(data.product, data.variant, data.quantity);
};
</script>

<style scoped>
.sidebar-container {
    height: calc(100vh - 64px);
    border-right: 1px solid #e5e7eb;
}

.category-list {
    max-height: calc(100vh - 128px);
    overflow-y: auto;
}

.subcategory-container,
.subcategory-level3 {
    overflow: hidden;
    transition: all 0.3s ease;
}

/* Custom scrollbar */
.category-list::-webkit-scrollbar {
    width: 4px;
}

.category-list::-webkit-scrollbar-track {
    background: #f1f1f1;
}

.category-list::-webkit-scrollbar-thumb {
    background: #d1d5db;
    border-radius: 4px;
}

.category-list::-webkit-scrollbar-thumb:hover {
    background: #9ca3af;
}
</style>
