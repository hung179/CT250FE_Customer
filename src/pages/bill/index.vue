<template>
    <NuxtLayout>
        <div class="min-w-4xl max-w-2xl w-full h-full mx-auto">
            <div class="h-fit p-6">
                <div class="bg-zinc-50 h-fit w-full rounded-lg p-8">
                    <div class="max-w-7xl mx-auto p-4 md:p-6">
                        <div
                            class="flex flex-col md:flex-row justify-between items-start md:items-center mb-6"
                        >
                            <h1 class="text-2xl font-bold text-gray-800 mb-4 md:mb-0">
                                Hệ thống theo dõi hóa đơn
                            </h1>
                            <div class="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
                                <input
                                    v-model="searchQuery"
                                    placeholder="Tìm kiếm hóa đơn..."
                                    class="px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 w-full"
                                />
                                <select
                                    v-model="statusFilter"
                                    class="px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 bg-white"
                                >
                                    <option value="all">Tất cả trạng thái</option>
                                    <option value="1">Chờ xác nhận</option>
                                    <option value="2">Chờ giao hàng</option>
                                    <option value="3">Đang giao</option>
                                    <option value="4">Đã giao</option>
                                    <option value="5">Hủy đơn</option>
                                    <option value="6">Đã hủy</option>
                                </select>
                            </div>
                        </div>

                        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                            <div class="bg-white p-5 rounded-lg shadow">
                                <h3 class="text-sm font-medium text-gray-500 mb-2">Tổng hóa đơn</h3>
                                <p class="text-2xl font-bold text-gray-800">
                                    {{ invoices.length }}
                                </p>
                            </div>
                            <div class="bg-white p-5 rounded-lg shadow">
                                <h3 class="text-sm font-medium text-gray-500 mb-2">Chờ xác nhận</h3>
                                <p class="text-2xl font-bold text-blue-600">
                                    {{ pendingInvoicesCount }}
                                </p>
                            </div>
                            <div class="bg-white p-5 rounded-lg shadow">
                                <h3 class="text-sm font-medium text-gray-500 mb-2">
                                    Chờ giao hàng
                                </h3>
                                <p class="text-2xl font-bold text-yellow-500">
                                    {{ awaitingInvoicesCount }}
                                </p>
                            </div>
                            <div class="bg-white p-5 rounded-lg shadow">
                                <h3 class="text-sm font-medium text-gray-500 mb-2">Đang giao</h3>
                                <p class="text-2xl font-bold text-purple-600">
                                    {{ transitInvoicesCount }}
                                </p>
                            </div>
                            <div class="bg-white p-5 rounded-lg shadow">
                                <h3 class="text-sm font-medium text-gray-500 mb-2">Đã giao</h3>
                                <p class="text-2xl font-bold text-green-600">
                                    {{ deliveredInvoicesCount }}
                                </p>
                            </div>
                            <div class="bg-white p-5 rounded-lg shadow">
                                <h3 class="text-sm font-medium text-gray-500 mb-2">Hủy đơn</h3>
                                <p class="text-2xl font-bold text-orange-600">
                                    {{ orderCanceledInvoicesCount }}
                                </p>
                            </div>
                            <div class="bg-white p-5 rounded-lg shadow">
                                <h3 class="text-sm font-medium text-gray-500 mb-2">Đã hủy</h3>
                                <p class="text-2xl font-bold text-red-600">
                                    {{ canceledInvoicesCount }}
                                </p>
                            </div>
                        </div>

                        <div class="bg-white rounded-lg shadow overflow-hidden">
                            <div class="overflow-x-auto">
                                <table class="min-w-full divide-y divide-gray-200">
                                    <thead class="bg-gray-50">
                                        <tr>
                                            <th
                                                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                            >
                                                Mã hóa đơn
                                            </th>

                                            <th
                                                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                            >
                                                Trạng thái
                                            </th>
                                            <th
                                                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                            >
                                                Số tiền
                                            </th>
                                            <th
                                                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                            >
                                                Hành động
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody class="bg-white divide-y divide-gray-200">
                                        <tr
                                            v-for="invoice in filteredInvoices"
                                            :key="invoice.ma_DH"
                                            :class="{
                                                'bg-blue-100': invoice.trangThai_DH === 1,
                                                'bg-yellow-100': invoice.trangThai_DH === 2,
                                                'bg-purple-100': invoice.trangThai_DH === 3,
                                                'bg-green-100': invoice.trangThai_DH === 4,
                                                'bg-orange-100': invoice.trangThai_DH === 5,
                                                'bg-red-100': invoice.trangThai_DH === 6,
                                            }"
                                        >
                                            <td
                                                class="px-6 py-4 whitespace-nowrap font-medium text-gray-900"
                                            >
                                                {{ invoice.ma_DH }}
                                            </td>
                                            <td class="px-6 py-4 whitespace-nowrap">
                                                <span
                                                    class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full py-1"
                                                    :class="{
                                                        'bg-blue-100 text-blue-800':
                                                            invoice.trangThai_DH === 1,
                                                        'bg-yellow-100 text-yellow-800':
                                                            invoice.trangThai_DH === 2,
                                                        'bg-purple-100 text-purple-800':
                                                            invoice.trangThai_DH === 3,
                                                        'bg-green-100 text-green-800':
                                                            invoice.trangThai_DH === 4,
                                                        'bg-orange-100 text-orange-800':
                                                            invoice.trangThai_DH === 5,
                                                        'bg-red-100 text-red-800':
                                                            invoice.trangThai_DH === 6,
                                                    }"
                                                >
                                                    {{ translateStatus(invoice.trangThai_DH) }}
                                                </span>
                                            </td>
                                            <td class="px-6 py-4 whitespace-nowrap text-gray-900">
                                                {{ formatCurrency(tongTien(invoice)) }}
                                            </td>

                                            <td
                                                class="px-6 py-4 whitespace-nowrap text-sm font-medium"
                                            >
                                                <button
                                                    @click="viewInvoice(invoice.ma_DH)"
                                                    class="bg-gray-500 hover:bg-gray-700 text-white py-1 px-3 rounded text-xs mr-2"
                                                >
                                                    Chi tiết
                                                </button>
                                                <button
                                                    v-if="invoice.trangThai_DH === 1"
                                                    @click="cancelledInvoice(invoice.ma_DH)"
                                                    class="bg-red-500 hover:bg-red-700 text-white py-1 px-3 rounded text-xs"
                                                >
                                                    Hủy đơn hàng
                                                </button>
                                            </td>
                                        </tr>
                                        <tr v-if="filteredInvoices.length === 0">
                                            <td
                                                colspan="6"
                                                class="px-6 py-10 text-center text-gray-500"
                                            >
                                                Không tìm thấy hóa đơn nào
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        <!-- Chi tiết hóa đơn với cấu trúc mới -->
                        <div
                            v-if="selectedInvoice"
                            class="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50"
                        >
                            <div
                                class="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-screen overflow-y-auto"
                            >
                                <div class="flex items-center justify-between p-4 border-b">
                                    <h2 class="text-xl font-bold text-gray-800">
                                        Chi tiết hóa đơn #{{ selectedInvoice.ma_DH }}
                                    </h2>
                                    <button
                                        @click="closeDetail"
                                        class="text-gray-400 hover:text-gray-500 text-2xl font-bold"
                                    >
                                        &times;
                                    </button>
                                </div>

                                <div class="p-6">
                                    <!-- Thông tin cơ bản của hóa đơn -->
                                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                                        <div class="flex flex-col space-y-4">
                                            <div class="flex">
                                                <span class="font-semibold w-40">Mã hóa đơn:</span>
                                                <span>{{ selectedInvoice.ma_DH }}</span>
                                            </div>

                                            <div class="flex">
                                                <span class="font-semibold w-40">Vận chuyển:</span>
                                                <span>{{
                                                    formatCurrency(
                                                        selectedInvoice.vanChuyen_DH || 0
                                                    )
                                                }}</span>
                                            </div>

                                            <div class="flex">
                                                <span class="font-semibold w-40">Ngày tạo:</span>
                                                <span>{{
                                                    formattedDate(selectedInvoice.ngayTao_DH)
                                                }}</span>
                                            </div>
                                        </div>

                                        <div class="flex flex-col space-y-4">
                                            <div class="flex">
                                                <span class="font-semibold w-40">Trạng thái:</span>
                                                <span
                                                    class="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full"
                                                    :class="{
                                                        'bg-blue-100 text-blue-800':
                                                            selectedInvoice.trangThai_DH === 1,
                                                        'bg-yellow-100 text-yellow-800':
                                                            selectedInvoice.trangThai_DH === 2,
                                                        'bg-purple-100 text-purple-800':
                                                            selectedInvoice.trangThai_DH === 3,
                                                        'bg-green-100 text-green-800':
                                                            selectedInvoice.trangThai_DH === 4,
                                                        'bg-orange-100 text-orange-800':
                                                            selectedInvoice.trangThai_DH === 5,
                                                        'bg-red-100 text-red-800':
                                                            selectedInvoice.trangThai_DH === 6,
                                                    }"
                                                >
                                                    {{
                                                        translateStatus(
                                                            selectedInvoice.trangThai_DH
                                                        )
                                                    }}
                                                </span>
                                            </div>
                                            <div class="flex">
                                                <span class="font-semibold w-40">Số tiền:</span>
                                                <span class="font-bold text-red-600">{{
                                                    formatCurrency(tongTien(selectedInvoice))
                                                }}</span>
                                            </div>
                                        </div>
                                    </div>

                                    <!-- Thông tin người nhận hàng -->
                                    <h3 class="text-lg font-semibold mb-4 border-b pb-2">
                                        Thông tin người nhận hàng
                                    </h3>
                                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                                        <div class="flex flex-col space-y-4">
                                            <div class="flex">
                                                <span class="font-semibold w-40">Họ tên:</span>
                                                <span>{{
                                                    selectedInvoice.ttNhanHang_DH?.hoTen_NH || "N/A"
                                                }}</span>
                                            </div>
                                            <div class="flex">
                                                <span class="font-semibold w-40"
                                                    >Số điện thoại:</span
                                                >
                                                <span>{{
                                                    selectedInvoice.ttNhanHang_DH?.sdt_NH || "N/A"
                                                }}</span>
                                            </div>
                                        </div>

                                        <div class="flex flex-col space-y-4">
                                            <div class="flex">
                                                <span class="font-semibold w-40">Địa chỉ:</span>
                                                <span>
                                                    {{
                                                        formatAddress(
                                                            selectedInvoice.ttNhanHang_DH?.diaChi_NH
                                                        )
                                                    }}
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                    <!-- Chi tiết đơn hàng -->
                                    <h3 class="text-lg font-semibold mb-4 border-b pb-2">
                                        Chi tiết đơn hàng
                                    </h3>
                                    <div class="overflow-x-auto">
                                        <table class="min-w-full divide-y divide-gray-200">
                                            <thead class="bg-gray-50">
                                                <tr>
                                                    <th
                                                        class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                                    >
                                                        Mã sản phẩm
                                                    </th>
                                                    <th
                                                        class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                                    >
                                                        Tên sản phẩm
                                                    </th>
                                                    <th
                                                        class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                                    >
                                                        Số lượng
                                                    </th>
                                                    <th
                                                        class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                                    >
                                                        Đơn giá
                                                    </th>
                                                    <th
                                                        class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                                    >
                                                        Thành tiền
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody class="bg-white divide-y divide-gray-200">
                                                <tr
                                                    v-for="(
                                                        item, index
                                                    ) in selectedInvoice.chiTiet_DH"
                                                    :key="index"
                                                >
                                                    <td class="px-6 py-4 whitespace-nowrap">
                                                        {{
                                                            item.maSanPham_CTDH || item.id || "N/A"
                                                        }}
                                                    </td>
                                                    <td class="px-6 py-4 whitespace-nowrap">
                                                        {{
                                                            item.tenSanPham_CTDH ||
                                                            item.name ||
                                                            "N/A"
                                                        }}
                                                    </td>
                                                    <td class="px-6 py-4 whitespace-nowrap">
                                                        {{
                                                            item.soLuong_CTDH || item.quantity || 0
                                                        }}
                                                    </td>
                                                    <td class="px-6 py-4 whitespace-nowrap">
                                                        {{
                                                            formatCurrency(
                                                                item.giaMua_CTDH || item.price || 0
                                                            )
                                                        }}
                                                    </td>
                                                    <td
                                                        class="px-6 py-4 whitespace-nowrap font-medium"
                                                    >
                                                        {{
                                                            formatCurrency(
                                                                (item.soLuong_CTDH ||
                                                                    item.quantity ||
                                                                    0) *
                                                                    (item.giaMua_CTDH ||
                                                                        item.price ||
                                                                        0)
                                                            )
                                                        }}
                                                    </td>
                                                </tr>
                                            </tbody>
                                            <tfoot>
                                                <tr>
                                                    <td
                                                        colspan="4"
                                                        class="px-6 py-4 text-right font-bold"
                                                    >
                                                        Tổng cộng:
                                                    </td>
                                                    <td
                                                        class="px-6 py-4 whitespace-nowrap font-bold"
                                                    >
                                                        {{
                                                            formatCurrency(
                                                                tienSanPham(selectedInvoice)
                                                            )
                                                        }}
                                                    </td>
                                                </tr>
                                            </tfoot>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </NuxtLayout>
</template>

<script setup>
import { ref, computed } from "vue";
import Swal from "sweetalert2";

// Reactive state
const searchQuery = ref("");
const statusFilter = ref("all");
const selectedInvoice = ref(null);

const authStore = useAuthStore();
const userId = authStore.userId;
const { $api } = useNuxtApp();
const router = useRouter();

const getData = async () => {
    try {
        const response = (await $api.get(`/order/user/${userId}`)).data;
        invoices.value = response.data;
    } catch (error) {
        console.error("Error fetching data:", error);
    }
};

onMounted(async () => {
    await getData();
});

const tienSanPham = (invoice) => {
    return invoice.chiTiet_DH.reduce((total, item) => {
        return total + item.giaMua_CTDH * item.soLuong_CTDH;
    }, 0);
};

// Tổng tiền của hóa đơn
const tongTien = (invoice) => {
    return tienSanPham(invoice) + invoice.vanChuyen_DH;
};

const invoices = ref([]);

const pendingInvoicesCount = computed(
    () => invoices.value.filter((invoice) => invoice.trangThai_DH === 1).length
);

const awaitingInvoicesCount = computed(
    () => invoices.value.filter((invoice) => invoice.trangThai_DH === 2).length
);

const transitInvoicesCount = computed(
    () => invoices.value.filter((invoice) => invoice.trangThai_DH === 3).length
);

const deliveredInvoicesCount = computed(
    () => invoices.value.filter((invoice) => invoice.trangThai_DH === 4).length
);

const orderCanceledInvoicesCount = computed(
    () => invoices.value.filter((invoice) => invoice.trangThai_DH === 5).length
);

const canceledInvoicesCount = computed(
    () => invoices.value.filter((invoice) => invoice.trangThai_DH === 6).length
);

// Lọc hóa đơn theo search và status filter
const filteredInvoices = computed(() => {
    return invoices.value.filter((invoice) => {
        // Lọc theo trạng thái
        const statusMatch =
            statusFilter.value === "all" || invoice.trangThai_DH.toString() === statusFilter.value;

        // Lọc theo query tìm kiếm
        const searchMatch = invoice.ma_DH.toLowerCase().includes(searchQuery.value.toLowerCase());

        return statusMatch && searchMatch;
    });
});

// Định dạng tiền tệ VND
const formatCurrency = (amount) => {
    return new Intl.NumberFormat("vi-VN", {
        style: "currency",
        currency: "VND",
    }).format(amount);
};

// Định dạng địa chỉ đầy đủ
const formatAddress = (address) => {
    if (!address) return "N/A";
    return `${address.chiTiet_DC}, ${address.xa_DC}, ${address.huyen_DC}, ${address.tinh_DC}`;
};

// Chuyển đổi mã trạng thái thành text
const translateStatus = (status) => {
    switch (status) {
        case 1:
            return "Chờ xác nhận";
        case 2:
            return "Chờ giao hàng";
        case 3:
            return "Đang giao";
        case 4:
            return "Đã giao";
        case 5:
            return "Hủy đơn";
        case 6:
            return "Đã hủy";
        default:
            return "Không xác định";
    }
};

// Xem chi tiết hóa đơn
const viewInvoice = (invoiceId) => {
    const invoice = invoices.value.find((inv) => inv.ma_DH === invoiceId);
    if (invoice) {
        selectedInvoice.value = invoice;
    }
};

// Đóng modal chi tiết
const closeDetail = () => {
    selectedInvoice.value = null;
};

// Hủy đơn hàng
const cancelledInvoice = async (invoiceId) => {
    const invoice = invoices.value.find((inv) => inv.ma_DH === invoiceId);
    if (invoice && invoice.trangThai_DH === 1) {
        await $api
            .put(`/order/${invoice._id}?state=5`)
            .then(() => {
                invoice.trangThai_DH = 5;
                closeDetail();
                Swal.fire({
                    icon: "success",
                    title: "Đơn hàng đã được hủy thành công",
                    showConfirmButton: false,
                    timer: 1500,
                });
                getData(); // Refresh data after cancellation
            })
            .catch((error) => {
                console.error("Error cancelling invoice:", error);
            });
    }
};
// Xử lý dữ liệu Date
const formattedDate = (ngayTao_DH) => {
    if (!ngayTao_DH) return "";

    const date = new Date(ngayTao_DH);

    // Kiểm tra xem đây có phải là ngày hợp lệ không
    if (isNaN(date.getTime())) return ngayTao_DH;

    // Định dạng: DD/MM/YYYY
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
};
</script>

<style scoped>
.min-w-4xl {
    min-width: 56rem;
}
</style>
