<template>
    <NuxtLayout>
        <div class="container mx-auto px-4 py-8">
            <h1 class="text-2xl font-bold mb-6">Giỏ hàng của bạn</h1>

            <!-- Thông báo -->
            <div
                v-if="notification.show"
                :class="`mb-4 p-4 rounded-md ${notification.type === 'error' ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`"
            >
                {{ notification.message }}
                <button @click="notification.show = false" class="ml-2 font-bold">×</button>
            </div>

            <!-- Giỏ hàng trống -->
            <div v-if="cartItems.length == 0" class="bg-white p-8 rounded-lg shadow text-center">
                <p class="text-xl mb-4">Giỏ hàng của bạn đang trống</p>
                <button class="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded">
                    Tiếp tục mua sắm
                </button>
            </div>

            <!-- Giỏ hàng có sản phẩm -->
            <div v-else class="flex flex-col lg:flex-row gap-6">
                <!-- Danh sách sản phẩm -->
                <div class="lg:w-2/3">
                    <div class="bg-white rounded-lg shadow mb-4">
                        <div class="p-4 border-b flex items-center">
                            <input
                                type="checkbox"
                                :checked="areAllSelected"
                                @change="toggleSelectAll"
                                class="mr-3 h-4 w-4"
                            />
                            <span class="font-medium"
                                >Chọn tất cả ({{ cartItems.length }} sản phẩm)</span
                            >

                            <button
                                @click="showDeleteSelectedModal"
                                :disabled="!hasSelectedItems"
                                :class="`ml-auto ${hasSelectedItems ? 'text-red-500 hover:text-red-700' : 'text-gray-300 cursor-not-allowed'}`"
                            >
                                Xóa đã chọn
                            </button>
                        </div>

                        <!-- Từng sản phẩm -->
                        <div
                            v-for="item in cartItems"
                            :key="item.idTTBanHang_GH"
                            class="border-b last:border-b-0"
                        >
                            <div class="p-4 flex flex-col sm:flex-row items-start">
                                <!-- Checkbox chọn sản phẩm -->
                                <div class="flex items-center mb-3 sm:mb-0">
                                    <input
                                        type="checkbox"
                                        v-model="item.selected"
                                        class="mr-3 h-4 w-4"
                                    />

                                    <!-- Ảnh sản phẩm -->
                                    <div class="w-16 h-16 bg-gray-100 rounded overflow-hidden">
                                        <img
                                            :src="item.thongTinSanPham.anh_SP.url"
                                            :alt="item.thongTinSanPham.ten_SP"
                                            class="w-full h-full object-cover"
                                        />
                                    </div>
                                </div>

                                <!-- Thông tin sản phẩm -->
                                <div class="flex-grow px-4">
                                    <h3 class="font-medium">{{ item.thongTinSanPham.ten_SP }}</h3>

                                    <!-- Phân loại sản phẩm -->
                                    <div
                                        v-if="
                                            item.thongTinSanPham.phanLoai_SP &&
                                            item.thongTinSanPham.phanLoai_SP.length > 0
                                        "
                                        class="text-sm text-gray-500 mt-1"
                                    >
                                        <span
                                            v-for="(option, idx) in item.thongTinSanPham
                                                .phanLoai_SP"
                                            :key="idx"
                                            class="mr-2"
                                        >
                                            {{ option.ten_PL }}:
                                            <span
                                                v-if="
                                                    option.tuyChon_PL &&
                                                    option.tuyChon_PL.length > 0
                                                "
                                            >
                                                {{
                                                    option.tuyChon_PL[
                                                        item.thongTinSanPham.ttBanHang_SP
                                                            .tuyChonPhanLoai1_BH || 0
                                                    ]?.ten_TC || "N/A"
                                                }}
                                            </span>
                                        </span>
                                    </div>
                                    <!-- Trọng lượng -->
                                     <div class="text-sm text-gray-500 mt-1">
                                        Trọng lượng: {{ item.thongTinSanPham.ttBanHang_SP.trongLuong_BH }}g
                                     </div>
                                </div>

                                <!-- Giá và số lượng -->
                                <div class="flex flex-col items-end mt-3 sm:mt-0">
                                    <span class="font-medium text-red-600 mb-2">{{
                                        formatPrice(item.thongTinSanPham.ttBanHang_SP.giaBan_BH)
                                    }}</span>

                                    <!-- Điều chỉnh số lượng -->
                                    <div class="flex items-center border border-gray-300 rounded">                                        
                                        <input
                                            v-model.number="item.soLuong_GH"
                                            @change="updateQuantity(item)"
                                            type="number"
                                            min="1"
                                            class="w-12 text-center border-x border-gray-300 py-1"
                                            disabled
                                        />
                                    </div>

                                    <!-- Nút xóa -->
                                    <button
                                        @click="showDeleteModal(item)"
                                        class="text-red-500 hover:text-red-700 mt-3"
                                    >
                                        Xóa
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Tổng thanh toán -->
                <div class="lg:w-1/3">
                    <div class="bg-white rounded-lg shadow p-4 sticky top-4">
                        <h2 class="text-lg font-bold mb-4">Tổng thanh toán</h2>

                        <div class="space-y-2 mb-4">
                            <div class="flex justify-between">
                                <span>Tổng sản phẩm:</span>
                                <span>{{ selectedItemsTotalQuantity }}</span>
                            </div>
                            <div class="flex justify-between">
                                <span>Tạm tính:</span>
                                <span>{{ formatPrice(selectedItemsTotalPrice) }}</span>
                            </div>
                        </div>

                        <div class="border-t pt-3 mt-3">
                            <div class="flex justify-between items-center mb-4">
                                <span class="font-bold">Thành tiền:</span>
                                <span class="text-xl font-bold text-red-600">{{
                                    formatPrice(selectedItemsTotalPrice)
                                }}</span>
                            </div>

                            <button
                                @click="checkout"
                                :disabled="!hasSelectedItems"
                                :class="`w-full py-3 rounded font-medium ${hasSelectedItems ? 'bg-emerald-400 hover:bg-emerald-500 text-white' : 'bg-gray-200 text-gray-500 cursor-not-allowed'}`"
                            >
                                Thanh toán
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Modal xác nhận xóa sản phẩm -->
            <Teleport to="body">
                <div
                    v-if="deleteModal.show"
                    class="fixed inset-0 bg-black/75 bg-opacity-50 flex items-center justify-center z-50"
                >
                    <div class="bg-white rounded-lg p-6 max-w-md w-full">
                        <h3 class="text-lg font-medium mb-4">Xác nhận xóa</h3>
                        <p>
                            Bạn có chắc chắn muốn xóa
                            {{ deleteModal.multiple ? "các sản phẩm đã chọn" : "sản phẩm này" }}
                            khỏi giỏ hàng?
                        </p>
                        <div class="mt-6 flex justify-end">
                            <button
                                @click="deleteModal.show = false"
                                class="bg-gray-200 text-gray-800 hover:bg-gray-300 px-4 py-2 rounded-md mr-2"
                            >
                                Hủy
                            </button>
                            <button
                                @click="confirmDelete"
                                class="bg-red-500 text-white hover:bg-red-600 px-4 py-2 rounded-md"
                            >
                                Xóa
                            </button>
                        </div>
                    </div>
                </div>
            </Teleport>

            <!-- Modal thông báo số lượng không đủ -->
            <Teleport to="body">
                <div
                    v-if="quantityModal.show"
                    class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
                >
                    <div class="bg-white rounded-lg p-6 max-w-md w-full">
                        <h3 class="text-lg font-medium mb-4">Số lượng không đủ</h3>
                        <p>
                            Sản phẩm
                            <span class="font-medium">{{ quantityModal.productName }}</span> hiện
                            chỉ còn {{ quantityModal.availableQuantity }} sản phẩm.
                        </p>
                        <div class="mt-6 flex justify-end">
                            <button
                                @click="adjustQuantity"
                                class="bg-blue-500 text-white hover:bg-blue-600 px-4 py-2 rounded-md mr-2"
                            >
                                Điều chỉnh số lượng
                            </button>
                            <button
                                @click="quantityModal.show = false"
                                class="bg-gray-200 text-gray-800 hover:bg-gray-300 px-4 py-2 rounded-md"
                            >
                                Đóng
                            </button>
                        </div>
                    </div>
                </div>
            </Teleport>
        </div>
        <Checkout
            :show="isCheckoutModalVisible"
            :products="cartItems.filter((item) => item.selected)"
            :userId="userId"
            @close="isCheckoutModalVisible = false"
            @order-success="handleOrderSuccess"
            @notification="handleNotification"
        />
    </NuxtLayout>
</template>

<script setup>
import { ref, computed, reactive, onMounted } from "vue";

// ID của khách hàng hiện tại - lấy từ auth store
const { $api } = useNuxtApp();
const authStore = useAuthStore();
const userId = authStore.userId;

// State của trang giỏ hàng
const cartItems = ref([]);
const isLoading = ref(false);
const notification = reactive({
    show: false,
    type: "success",
    message: "",
});
const deleteModal = reactive({
    show: false,
    multiple: false,
    itemToDelete: null,
});
const quantityModal = reactive({
    show: false,
    productName: "",
    availableQuantity: 0,
    itemToAdjust: null,
});

// Computed properties
const hasSelectedItems = computed(() => cartItems.value.some((item) => item.selected));
const areAllSelected = computed(
    () => cartItems.value.length > 0 && cartItems.value.every((item) => item.selected)
);
const selectedItemsTotalQuantity = computed(() =>
    cartItems.value
        .filter((item) => item.selected)
        .reduce((total, item) => total + item.soLuong_GH, 0)
);
const selectedItemsTotalPrice = computed(() =>
    cartItems.value
        .filter((item) => item.selected)
        .reduce(
            (total, item) => total + item.soLuong_GH * item.thongTinSanPham.ttBanHang_SP.giaBan_BH,
            0
        )
);

// Format giá tiền theo định dạng VND
function formatPrice(price) {
    return new Intl.NumberFormat("vi-VN", {
        style: "currency",
        currency: "VND",
    }).format(price);
}

// Chọn/bỏ chọn tất cả sản phẩm
function toggleSelectAll() {
    const newValue = !areAllSelected.value;
    cartItems.value.forEach((item) => {
        item.selected = newValue;
    });
}

// Tăng số lượng sản phẩm
function increaseQuantity(item) {
    item.soLuong_GH++;
    updateQuantity(item);
}

// Giảm số lượng sản phẩm
function decreaseQuantity(item) {
    if (item.soLuong_GH > 1) {
        item.soLuong_GH--;
        updateQuantity(item);
    }
}

// Cập nhật số lượng và kiểm tra hàng tồn kho
async function updateQuantity(item) {
    // Đảm bảo số lượng ít nhất là 1
    if (item.soLuong_GH < 1) {
        item.soLuong_GH = 1;
    }

    try {
        // Kiểm tra số lượng trong kho
        await checkProductStock(item);

        // Gọi API để cập nhật số lượng sản phẩm trong giỏ hàng
        await $api.put(`customers/cart/update`, {
            idKhachHang_GH: userId,
            idSanPham_GH: item.idSanPham_GH,
            idTTBanHang_GH: item.idTTBanHang_GH,
            soLuong_GH: item.soLuong_GH,
        });
    } catch (error) {
        console.error("Lỗi cập nhật số lượng:", error);
        notification.type = "error";
        notification.message = "Có lỗi xảy ra khi cập nhật số lượng";
        notification.show = true;
    }
}

// Kiểm tra số lượng sản phẩm trong kho
async function checkProductStock(item) {
    try {
        // Lấy số lượng tồn kho từ dữ liệu sản phẩm
        const availableStock = item.thongTinSanPham.ttBanHang_SP.khoHang_BH;

        if (item.soLuong_GH > availableStock) {
            // Hiển thị modal thông báo số lượng không đủ
            quantityModal.productName = item.thongTinSanPham.ten_SP;
            quantityModal.availableQuantity = availableStock;
            quantityModal.itemToAdjust = item;
            quantityModal.show = true;
            return false;
        }

        return true;
    } catch (error) {
        console.error("Lỗi kiểm tra tồn kho:", error);
        return false;
    }
}

// Điều chỉnh số lượng theo tồn kho
function adjustQuantity() {
    if (quantityModal.itemToAdjust) {
        quantityModal.itemToAdjust.soLuong_GH = quantityModal.availableQuantity;
        updateQuantity(quantityModal.itemToAdjust);
    }
    quantityModal.show = false;
}

// Hiển thị modal xác nhận xóa 1 sản phẩm
function showDeleteModal(item) {
    deleteModal.itemToDelete = item;
    deleteModal.multiple = false;
    deleteModal.show = true;
}

// Hiển thị modal xác nhận xóa nhiều sản phẩm
function showDeleteSelectedModal() {
    if (!hasSelectedItems.value) return;

    deleteModal.multiple = true;
    deleteModal.show = true;
}

// Xác nhận xóa sản phẩm
async function confirmDelete() {
    try {
        let products = [];

        if (deleteModal.multiple) {
            // Xóa nhiều sản phẩm đã chọn
            products = cartItems.value
                .filter((item) => item.selected)
                .map((item) => ({
                    idSanPham_GH: item.idSanPham_GH,
                    idTTBanHang_GH: item.idTTBanHang_GH,
                }));

            // Cập nhật UI - loại bỏ sản phẩm đã chọn
            cartItems.value = cartItems.value.filter((item) => !item.selected);
            notification.message = "Đã xóa các sản phẩm đã chọn";
        } else if (deleteModal.itemToDelete) {
            // Xóa 1 sản phẩm
            products = [
                {
                    idSanPham_GH: deleteModal.itemToDelete.idSanPham_GH,
                    idTTBanHang_GH: deleteModal.itemToDelete.idTTBanHang_GH,
                },
            ];
            // Cập nhật UI - loại bỏ sản phẩm đã xóa
            cartItems.value = cartItems.value.filter(
                (item) =>
                    !(
                        item.idSanPham_GH === deleteModal.itemToDelete.idSanPham_GH &&
                        item.idTTBanHang_GH === deleteModal.itemToDelete.idTTBanHang_GH
                    )
            );
            notification.message = "Đã xóa sản phẩm";
        }

        // Gọi API để xóa sản phẩm
        if (products.length > 0) {
            const itemsToDelete = {
                idKhachHang_GH: userId,
                products: products,
            };

            await $api.post(`customers/cart/remove`, itemsToDelete);
        }

        notification.type = "success";
        notification.show = true;
    } catch (error) {
        console.error("Lỗi xóa sản phẩm:", error);
        notification.type = "error";
        notification.message = "Có lỗi xảy ra khi xóa sản phẩm";
        notification.show = true;
    } finally {
        deleteModal.show = false;
    }
}

// Tiến hành thanh toán
function checkout() {
    if (!hasSelectedItems.value) return;

    // Hiển thị modal thanh toán
    isCheckoutModalVisible.value = true;
}

// Thêm state quản lý hiển thị modal checkout
const isCheckoutModalVisible = ref(false);

// Xử lý khi đặt hàng thành công
function handleOrderSuccess(orderData) {
    // Cập nhật UI - loại bỏ sản phẩm đã đặt hàng khỏi giỏ hàng
    cartItems.value = cartItems.value.filter((item) => !item.selected);

    if (orderData.orderId) {
        navigateTo(`/orders/${orderData.orderId}`);
    }
}

// Xử lý hiển thị thông báo
function handleNotification(notificationData) {
    notification.type = notificationData.type;
    notification.message = notificationData.message;
    notification.show = true;
}

// Lấy giỏ hàng từ API
async function fetchCartItems() {
    try {
        isLoading.value = true;
        const response = (await $api.get(`customers/cart/${userId}`)).data;
        if (response.success) {
            // Thêm thuộc tính selected cho từng mục trong giỏ hàng
            if (response.data.chiTiet_GH && Array.isArray(response.data.chiTiet_GH)) {
                cartItems.value = response.data.chiTiet_GH.map((item) => ({
                    ...item,
                    selected: false, // Mặc định không chọn sản phẩm nào
                }));
            } else {
                cartItems.value = [];
                console.error("Định dạng dữ liệu giỏ hàng không hợp lệ:", response.data);
            }
        } else {
            notification.type = "error";
            notification.message = "Không thể tải giỏ hàng";
            notification.show = true;
        }
    } catch (error) {
        console.error("Lỗi lấy giỏ hàng:", error);
        notification.type = "error";
        notification.message = "Có lỗi xảy ra khi tải giỏ hàng";
        notification.show = true;
    } finally {
        isLoading.value = false;
    }
}

// Khởi tạo dữ liệu khi component được mount
onMounted(() => {
    fetchCartItems();
});
</script>

<style scoped>
/* Ẩn mũi tên tăng/giảm của input number */
input[type="number"]::-webkit-inner-spin-button,
input[type="number"]::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
}

input[type="number"] {
    -moz-appearance: textfield;
}
</style>
