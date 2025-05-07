<!-- Modal thanh toán -->
<template>
    <Teleport to="body">
        <div
            v-if="show"
            class="fixed inset-0 bg-black/75 bg-opacity-50 flex items-center justify-center z-50"
            @click.self="closeModal"
        >
            <div class="bg-white rounded-lg p-6 max-w-3xl w-full max-h-[90vh] overflow-y-auto">
                <div class="flex justify-between items-center mb-4">
                    <h3 class="text-xl font-bold">Thanh toán đơn hàng</h3>
                    <button @click="closeModal" class="text-gray-500 hover:text-gray-700">
                        <span class="text-2xl">&times;</span>
                    </button>
                </div>

                <!-- Sản phẩm thanh toán -->
                <div class="border rounded-lg mb-6">
                    <div class="bg-gray-50 p-3 border-b flex justify-between font-medium">
                        <span>Sản phẩm</span>
                        <span>Thành tiền</span>
                    </div>

                    <div
                        v-for="item in selectedProducts"
                        :key="item.idTTBanHang_GH"
                        class="p-4 border-b last:border-b-0"
                    >
                        <div class="flex justify-between">
                            <div class="flex gap-3">
                                <!-- Ảnh sản phẩm -->
                                <div class="w-16 h-16 bg-gray-100 rounded overflow-hidden">
                                    <img
                                        :src="item.thongTinSanPham.anh_SP.url"
                                        :alt="item.thongTinSanPham.ten_SP"
                                        class="w-full h-full object-cover"
                                    />
                                </div>

                                <!-- Thông tin sản phẩm -->
                                <div>
                                    <h4 class="font-medium">{{ item.thongTinSanPham.ten_SP }}</h4>

                                    <!-- Phân loại -->
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
                                    <div class="text-sm text-gray-500 mt-1">
                                        Trọng lượng
                                        {{ item.thongTinSanPham.ttBanHang_SP.trongLuong_BH }}g
                                    </div>
                                    <!-- Số lượng -->
                                    <div class="text-sm text-gray-500 mt-1">
                                        Số lượng: {{ item.soLuong_GH }}
                                    </div>
                                </div>
                            </div>

                            <!-- Giá -->
                            <div class="font-medium text-red-600">
                                {{
                                    formatPrice(
                                        item.soLuong_GH *
                                            item.thongTinSanPham.ttBanHang_SP.giaBan_BH
                                    )
                                }}
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Thông tin giao hàng và thanh toán -->
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <!-- Thông tin giao hàng -->
                    <div>
                        <h4 class="font-bold mb-3">Thông tin giao hàng</h4>

                        <!-- Chọn địa chỉ có sẵn -->
                        <div v-if="savedAddresses.length > 0" class="mb-4">
                            <label class="block text-sm font-medium text-gray-700 mb-2"
                                >Chọn địa chỉ đã lưu</label
                            >
                            <div class="space-y-2">
                                <div
                                    v-for="(address, index) in savedAddresses"
                                    :key="index"
                                    class="border rounded-md p-3 hover:border-blue-500 cursor-pointer"
                                    :class="{
                                        'border-blue-500 bg-blue-50':
                                            selectedAddressIndex === index,
                                    }"
                                    @click="selectAddress(index)"
                                >
                                    <div class="flex justify-between">
                                        <div>
                                            <div class="font-medium">
                                                {{ address.chiTiet_DC || "Không có chi tiết" }}
                                            </div>
                                            <div class="text-sm text-gray-600">
                                                {{ address.xa_DC }}, {{ address.huyen_DC }},
                                                {{ address.tinh_DC }}
                                            </div>
                                            <div
                                                class="text-sm text-gray-600"
                                                v-if="address.sdt_DC"
                                            >
                                                SĐT: {{ address.sdt_DC }}
                                            </div>
                                        </div>
                                        <div class="flex items-center">
                                            <input
                                                type="radio"
                                                :checked="selectedAddressIndex === index"
                                                @change="selectAddress(index)"
                                                class="h-4 w-4 text-blue-600"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="mt-3 flex items-center">
                                <span class="text-sm font-medium">hoặc</span>
                                <button
                                    @click="useNewAddress"
                                    class="ml-2 text-sm text-blue-600 hover:text-blue-800"
                                >
                                    Thêm địa chỉ mới
                                </button>
                            </div>
                        </div>
                    </div>

                    <!-- Thông tin thanh toán -->
                    <div>
                        <h4 class="font-bold mb-3">Thông tin thanh toán</h4>

                        <!-- Phương thức thanh toán -->
                        <div class="border rounded-lg p-4">
                            <h5 class="font-medium mb-3">Phương thức thanh toán</h5>

                            <div class="space-y-3">
                                <label
                                    class="flex items-center p-3 border rounded-md cursor-pointer hover:border-blue-500"
                                    :class="{
                                        'border-blue-500 bg-blue-50':
                                            checkoutInfo.paymentMethod === 'cod',
                                    }"
                                >
                                    <input
                                        type="radio"
                                        value="cod"
                                        v-model="checkoutInfo.paymentMethod"
                                        class="h-4 w-4 text-blue-600 focus:ring-blue-500 mr-3"
                                    />
                                    <div>
                                        <div class="font-medium">
                                            Thanh toán khi nhận hàng (COD)
                                        </div>
                                        <div class="text-sm text-gray-500">
                                            Thanh toán bằng tiền mặt khi nhận hàng
                                        </div>
                                    </div>
                                </label>

                                <label
                                    class="flex items-center p-3 border rounded-md cursor-pointer hover:border-blue-500"
                                    :class="{
                                        'border-blue-500 bg-blue-50':
                                            checkoutInfo.paymentMethod === 'banking',
                                    }"
                                >
                                    <input
                                        type="radio"
                                        value="banking"
                                        v-model="checkoutInfo.paymentMethod"
                                        class="h-4 w-4 text-blue-600 focus:ring-blue-500 mr-3"
                                    />
                                    <div>
                                        <div class="font-medium">Chuyển khoản ngân hàng</div>
                                        <div class="text-sm text-gray-500">
                                            Thanh toán qua chuyển khoản ngân hàng
                                        </div>
                                    </div>
                                </label>
                            </div>
                        </div>
                    </div>
                    <!-- Chi tiết giá vận chuyển -->
                    <div class="border rounded-lg p-4 mt-4">
                        <h5 class="font-medium mb-3">Chi tiết giá vận chuyển</h5>

                        <div v-if="shippingInfo">
                            <div class="space-y-3">
                                <!-- Địa điểm giao hàng và thời gian -->
                                <div class="flex justify-between text-sm">
                                    <span class="text-gray-600">Địa điểm giao hàng:</span>
                                    <span class="font-medium">{{ shippingInfo.tinh_VC }}</span>
                                </div>
                                <div class="flex justify-between text-sm">
                                    <span class="text-gray-600">Thời gian giao hàng dự kiến:</span>
                                    <span class="font-medium"
                                        >{{ shippingInfo.thoiGian_VC }} ngày</span
                                    >
                                </div>

                                <!-- Phí vận chuyển cơ bản -->
                                <div class="flex justify-between text-sm">
                                    <span class="text-gray-600">Phí vận chuyển cơ bản:</span>
                                    <span class="font-medium">{{
                                        formatPrice(shippingInfo.gia_VC)
                                    }}</span>
                                </div>

                                <!-- Trọng lượng sản phẩm -->
                                <div class="flex justify-between text-sm">
                                    <span class="text-gray-600">Tổng trọng lượng:</span>
                                    <span class="font-medium">{{ totalWeight }}g</span>
                                </div>

                                <!-- Phí vượt mức (nếu có) -->
                                <div
                                    v-if="excessWeightFee > 0"
                                    class="flex justify-between text-sm"
                                >
                                    <div>
                                        <span class="text-gray-600">Phí trọng lượng vượt mức:</span>
                                        <div class="text-xs text-gray-500 ml-1">
                                            (Vượt {{ excessWeight }}g so với mức
                                            {{ shippingInfo.mucVuot_VC }}g)
                                        </div>
                                    </div>
                                    <span class="font-medium">{{
                                        formatPrice(excessWeightFee)
                                    }}</span>
                                </div>

                                <!-- Tổng phí vận chuyển -->
                                <div class="border-t pt-2 mt-2 flex justify-between font-medium">
                                    <span>Tổng phí vận chuyển:</span>
                                    <span class="text-red-600">{{ formatPrice(shippingFee) }}</span>
                                </div>
                            </div>
                        </div>
                        <div v-else class="text-center text-gray-500 py-2">
                            Vui lòng chọn địa chỉ giao hàng để xem chi tiết phí vận chuyển
                        </div>
                    </div>
                    <!-- Tóm tắt đơn hàng -->
                    <div class="border rounded-lg p-4 mt-4">
                        <h5 class="font-medium mb-3">Tóm tắt đơn hàng</h5>

                        <div class="space-y-2">
                            <div class="flex justify-between">
                                <span class="text-gray-600">Tổng tiền hàng:</span>
                                <span>{{ formatPrice(totalPrice) }}</span>
                            </div>
                            <div class="flex justify-between">
                                <span class="text-gray-600">Phí vận chuyển:</span>
                                <span>{{ formatPrice(shippingFee) }}</span>
                            </div>
                            <div class="border-t pt-2 mt-2 flex justify-between font-bold">
                                <span>Tổng thanh toán:</span>
                                <span class="text-red-600">{{
                                    formatPrice(totalPrice + shippingFee)
                                }}</span>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- Nút đặt hàng -->
                <div class="mt-6 flex justify-end gap-3">
                    <button
                        @click="closeModal"
                        class="bg-gray-200 text-gray-800 hover:bg-gray-300 px-4 py-2 rounded-md"
                    >
                        Hủy
                    </button>
                    <button
                        @click="placeOrder"
                        :disabled="isPlacingOrder"
                        class="bg-emerald-400 text-white hover:bg-emerald-500 px-6 py-2 rounded-md font-medium flex items-center"
                    >
                        <span v-if="isPlacingOrder" class="mr-2">Đang xử lý...</span>
                        <span v-else>Đặt hàng</span>
                    </button>
                </div>
            </div>
        </div>
    </Teleport>
</template>
<script setup>
import { ref, computed, reactive, watch } from "vue";

const props = defineProps({
    show: Boolean,
    products: Array,
    userId: String,
});

const emit = defineEmits(["close", "order-success", "notification"]);

// State chính
const selectedProducts = ref([]);
const savedAddresses = ref([]);
const selectedAddressIndex = ref(-1);
const router = useRouter();
const shippingInfo = ref(null);
const isPlacingOrder = ref(false);
const { $api } = useNuxtApp();

// Thông tin thanh toán
const checkoutInfo = reactive({
    fullName: "",
    phone: "",
    province: "",
    district: "",
    ward: "",
    address: "",
    paymentMethod: "cod",
    saveAddress: false,
});

// Computed properties
const totalPrice = computed(() =>
    selectedProducts.value.reduce(
        (total, item) => total + item.soLuong_GH * item.thongTinSanPham.ttBanHang_SP.giaBan_BH,
        0
    )
);

const totalWeight = computed(() => {
    return selectedProducts.value.reduce(
        (total, item) =>
            total + (item.soLuong_GH * item.thongTinSanPham.ttBanHang_SP.trongLuong_BH || 0),
        0
    );
});

const excessWeight = computed(() => {
    if (!shippingInfo.value || totalWeight.value <= shippingInfo.value.mucVuot_VC) {
        return 0;
    }
    return totalWeight.value - shippingInfo.value.mucVuot_VC;
});

const excessWeightFee = computed(() => {
    if (!shippingInfo.value || excessWeight.value <= 0) {
        return 0;
    }
    const excessUnits = Math.ceil(excessWeight.value / shippingInfo.value.mucVuot_VC);
    return excessUnits * shippingInfo.value.giaVuotMuc_VC;
});

const shippingFee = computed(() => {
    if (!shippingInfo.value) {
        return 30000;
    }
    return shippingInfo.value.gia_VC + excessWeightFee.value;
});

// Xử lý chọn địa chỉ
function selectAddress(index) {
    selectedAddressIndex.value = index;
    const address = savedAddresses.value[index];
    if (address) {
        // Cập nhật thông tin từ địa chỉ đã chọn
        checkoutInfo.fullName = address.ten_DC || "";
        checkoutInfo.phone = address.sdt_DC || "";
        checkoutInfo.province = address.tinh_DC;
        checkoutInfo.district = address.huyen_DC;
        checkoutInfo.ward = address.xa_DC;
        checkoutInfo.address = address.chiTiet_DC || "";

        // Lấy thông tin vận chuyển
        fetchShippingInfo(address.tinh_DC);
    }
}

// Lấy danh sách địa chỉ đã lưu
async function fetchSavedAddresses() {
    try {
        const response = await $api.get(`addresses/user/${props.userId}`);
        if (response.data.success) {
            savedAddresses.value = response.data.data || [];
            if (savedAddresses.value.length > 0) {
                selectAddress(0);
            }
        }
    } catch (error) {
        console.error("Lỗi khi lấy danh sách địa chỉ:", error);
        emit("notification", {
            type: "error",
            message: "Không thể tải danh sách địa chỉ. Vui lòng thử lại sau.",
        });
    }
}

// Lấy thông tin vận chuyển
async function fetchShippingInfo(provinceName) {
    try {
        const response = (await $api.get(`shippingInformation/province?tinh=${provinceName}`)).data;
        if (response.success) {
            shippingInfo.value = response.data;
        }
    } catch (error) {
        console.error("Lỗi khi lấy thông tin vận chuyển:", error);
    }
}

// Xử lý đặt hàng
async function placeOrder() {
    // Kiểm tra thông tin bắt buộc
    if (savedAddresses.value.length === 0) {
        if (
            !checkoutInfo.fullName ||
            !checkoutInfo.phone ||
            !checkoutInfo.province ||
            !checkoutInfo.district ||
            !checkoutInfo.ward ||
            !checkoutInfo.address
        ) {
            emit("notification", {
                type: "error",
                message: "Vui lòng điền đầy đủ thông tin giao hàng",
            });
            return;
        }
    }

    try {
        isPlacingOrder.value = true;

        const tenKhachHang = (await $api.get(`customers/${props.userId}`)).data.data.hoTen_KH;

        const orderData = {
            idKhachHang: props.userId,
            ttNhanHang: {
                hoTen_NH: tenKhachHang,
                sdt_NH: checkoutInfo.phone,
                diaChi_NH: {
                    chiTiet_DC: checkoutInfo.address,
                    xa_DC: checkoutInfo.ward,
                    huyen_DC: checkoutInfo.district,
                    tinh_DC: checkoutInfo.province,
                },
            },
            giaVanChuyen: shippingFee.value,
            ttSanPham: selectedProducts.value.map((item) => ({
                idSanPham_CTDH: item.idSanPham_GH,
                idTTBanHang_CTDH: item.idTTBanHang_GH,
                soLuong_CTDH: item.soLuong_GH,
            })),
        };

        // Gọi API để tạo đơn hàng
        const response = await $api.post("order/", orderData);
        if (response.data.success) {
            // Thông báo thành công
            
            const productsData = selectedProducts.value.map((item) => ({
                idSanPham_GH: item.idSanPham_GH,
                idTTBanHang_GH: item.idTTBanHang_GH,
            }));

            const data = {
                idKhachHang_GH: props.userId,
                products: productsData,
            };
            // Gọi API để cập nhật số lượng sản phẩm trong giỏ hàng
            await $api.post("customers/cart/remove", data);

            // Gọi API để cập nhật số lượng sản phẩm trong kho
            const ttSanPham = selectedProducts.value.map((item) => (
              {
                idSanPham_CTDH: item.idSanPham_GH,
                idTTBanHang_CTDH: item.idTTBanHang_GH,
                tenSanPham_CTDH: item.thongTinSanPham.ten_SP,
                soLuong_CTDH: item.soLuong_GH,
                giaMua_CTDH: item.thongTinSanPham.ttBanHang_SP.giaBan_BH,
            }));
            console.log(ttSanPham);
            emit("notification", {
              type: "success",
              message: "Đặt hàng thành công! Cảm ơn bạn đã mua hàng.",
            });
            
            // Thông báo đặt hàng thành công để component cha cập nhật UI
            emit("order-success", {
              products: selectedProducts.value,
            });
            
            // Đóng modal
            closeModal();

        } else {
            emit("notification", {
                type: "error",
                message: response.data.message || "Có lỗi xảy ra khi đặt hàng",
            });
        }
    } catch (error) {
        console.error("Lỗi đặt hàng:", error);
    } finally {
        isPlacingOrder.value = false;
    }
}

// Watchers
watch(
    () => props.show,
    (newVal) => {
        if (newVal) {
            fetchSavedAddresses();
            shippingInfo.value = null;
        }
    }
);

watch(
    () => props.products,
    (newProducts) => {
        if (newProducts && newProducts.length > 0) {
            selectedProducts.value = [...newProducts];
        } else {
            selectedProducts.value = [];
        }
    },
    { immediate: true }
);

function formatPrice(price) {
    return new Intl.NumberFormat("vi-VN", {
        style: "currency",
        currency: "VND",
    }).format(price);
}

function closeModal() {
    emit("close");
}

const useNewAddress = () => {
    router.push("/address/");
    closeModal();
};
</script>
