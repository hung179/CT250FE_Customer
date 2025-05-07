<template>
    <NuxtLayout>
        <div class="min-h-screen bg-gray-50">
            <!-- Banner Slider -->
            <div class="relative bg-gray-100 h-96 overflow-hidden">
                <div
                    class="flex transition-transform duration-500 ease-in-out h-full"
                    :style="{ transform: `translateX(-${currentSlide * 100}%)` }"
                >
                    <div
                        v-for="(slide, index) in bannerSlides"
                        :key="index"
                        class="min-w-full h-full relative"
                    >
                        <!-- Hình ảnh banner -->
                        <img :src="slide.image" alt="Banner" class="w-full h-full object-cover" />

                        <div
                            class="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"
                        ></div>

                        <div class="absolute bottom-16 left-16 max-w-lg text-white">
                            <h2 class="text-3xl font-bold mb-3 text-shadow-lg">
                                {{ slide.title }}
                            </h2>
                            <p class="text-lg mb-5 text-shadow-md">{{ slide.description }}</p>
                        </div>
                    </div>
                </div>

                <!-- Slider Navigation -->
                <div class="absolute bottom-5 left-1/2 transform -translate-x-1/2 flex space-x-2">
                    <button
                        v-for="(_, index) in bannerSlides"
                        :key="index"
                        @click="currentSlide = index"
                        :class="[
                            'w-3 h-3 rounded-full transition-colors duration-300',
                            currentSlide === index ? 'bg-white' : 'bg-white bg-opacity-50',
                        ]"
                    ></button>
                </div>
            </div>

            <main class="container mx-auto px-4 py-8">
                <!-- Categories Section -->
                <section class="mb-12">
                    <h2 class="text-2xl font-bold text-center mb-8 relative pb-3">
                        Danh Mục Sản Phẩm
                        <span
                            class="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-20 h-1 bg-blue-600"
                        ></span>
                    </h2>

                    <div class="grid grid-cols-2 md:grid-cols-4 gap-6">
                        <div
                            v-for="(category, index) in categories"
                            :key="index"
                            class="bg-white rounded-lg overflow-hidden shadow-md hover:-translate-y-1 transition duration-300"
                        >
                            <NuxtLink to="categories">
                                <h3 class="text-lg font-medium text-center py-4">
                                    {{ category.ten_NH }}
                                </h3>
                            </NuxtLink>
                        </div>
                    </div>
                </section>

                <!-- Products Section -->
                <section class="mb-12">
                    <h2 class="text-2xl font-bold text-center mb-8 relative pb-3">
                        Sản Phẩm Nổi Bật
                        <span
                            class="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-20 h-1 bg-blue-600"
                        ></span>
                    </h2>

                    <div
                        class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
                    >
                        <div
                            v-for="(product, index) in products"
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
                </section>
            </main>

            <!-- Product Detail Modal -->
            <Product
                :is-visible="isProductModalVisible"
                :product="selectedProduct"
                @close="closeProductModal"
                @add-to-cart="handleAddToCartFromModal"
            />
        </div>
    </NuxtLayout>
</template>

<script setup>
import Swal from "sweetalert2";
import { ref, onMounted, onBeforeUnmount } from "vue";
import Product from "../components/product/index.vue";

// State
const currentSlide = ref(0);
const cartCount = ref(0);
const isProductModalVisible = ref(false);
const selectedProduct = ref(null);
const { $api } = useNuxtApp();
const authStore = useAuthStore();
const userId = authStore.userId;
// Banner slides data
const bannerSlides = ref([
    {
        image: "sale.jpg",
        title: "Ưu đãi mùa hè",
        description: "Giảm giá lên đến 50% cho các sản phẩm công nghệ mới nhất",
        buttonText: "Mua ngay",
    },
    {
        image: "newproduct2.jpg",
        title: "Sản phẩm mới",
        description: "Khám phá những sản phẩm mới nhất của chúng tôi",
        buttonText: "Xem ngay",
    },
    {
        image: "shipping.jpg",
        title: "Miễn phí vận chuyển",
        description: "Miễn phí vận chuyển cho đơn hàng từ 500.000đ",
        buttonText: "Tìm hiểu thêm",
    },
]);

// Categories data
const categories = ref([]);

const getCategories = async () => {
    try {
        const response = (await $api.get(`/categories/byPage?page=0&limit=4`)).data;
        const data = await response.data;
        categories.value = data.filter((item) => item.idCha_NH === null);
    } catch (error) {
        console.error("Lỗi khi lấy danh mục:", error);
    }
};

const getProduct = async () => {
    try {
        const response = (
            await $api.get(`/products/all`, {
                params: {
                    limit: 8,
                    page: 0,
                    state: 1,
                },
            })
        ).data;
        const data = await response.data;
        products.value = data.products;
    } catch (error) {
        console.error("Lỗi khi lấy sản phẩm:", error);
    }
};

const products = ref([]);

// Auto slide interval
let slideInterval;

// Format currency
const formatPrice = (price) => {
    return new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(price);
};

// Start auto slide
const startAutoSlide = () => {
    slideInterval = setInterval(() => {
        currentSlide.value = (currentSlide.value + 1) % bannerSlides.value.length;
    }, 5000);
};

// Stop auto slide
const stopAutoSlide = () => {
    clearInterval(slideInterval);
};

// Add to cart
const addToCart = async (product, variant = null, quantity = 1) => {
    try {
        const data = {
            idKhachHang: userId,
            idSanPham: product._id,
            idTTBanHang: variant ? variant._id : product.ttBanHang_SP[0]._id,
            soLuong: quantity,
        };
        console.log("Data to add to cart:", data);
        const response = (await $api.post(`/customers/cart`, data)).data;
        console.log("Response from add to cart:", response);
        if (response.success) {
            cartCount.value++;
            Swal.fire({
                icon: "success",
                title: "Thành công",
                text: "Thêm vào giỏ hàng thành công",
            });
        }
    } catch (error) {
        console.error("Lỗi khi thêm sản phẩm vào giỏ hàng:", error);
        Swal.fire({
            icon: "error",
            title: "Lỗi",
            text: "Không thể thêm sản phẩm vào giỏ hàng",
        });
    }
};

// Show product details
const showProductDetails = (product) => {
    selectedProduct.value = product;
    isProductModalVisible.value = true;
};

// Close product modal
const closeProductModal = () => {
    isProductModalVisible.value = false;
};

// Handle add to cart from modal
const handleAddToCartFromModal = (data) => {
    addToCart(data.product, data.variant, data.quantity);
};

// Lifecycle hooks
onMounted(() => {
    startAutoSlide();
    getProduct();
    getCategories();
});

onBeforeUnmount(() => {
    stopAutoSlide();
});
</script>

<style>
.text-shadow-lg {
    text-shadow:
        0 2px 4px rgba(0, 0, 0, 0.8),
        0 4px 12px rgba(0, 0, 0, 0.5);
}
.text-shadow-md {
    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.6);
}
</style>
