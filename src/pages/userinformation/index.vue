<template>
    <NuxtLayout>
        <div class="min-w-4xl max-w-2xl w-full h-full mx-auto">
            <div class="h-fit p-6">
                <div class="container mx-auto p-4">
                    <div class="max-w-3xl mx-auto bg-white rounded-lg shadow-md p-6">
                        <h1 class="text-2xl font-bold mb-6 text-center text-blue-600">
                            Thông Tin Khách Hàng
                        </h1>

                        <!-- Customer Information Form -->
                        <form @submit.prevent="updateCustomerInfo" class="space-y-6">
                            <!-- Customer Name -->
                            <div class="space-y-2">
                                <label for="hoTenKH" class="block text-sm font-medium text-gray-700"
                                    >Họ và tên</label
                                >
                                <input
                                    id="hoTenKH"
                                    v-model="customer.hoTenKH"
                                    type="text"
                                    required
                                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>

                            <!-- Email -->
                            <div class="space-y-2">
                                <label for="email" class="block text-sm font-medium text-gray-700"
                                    >Email</label
                                >
                                <input
                                    id="email"
                                    v-model="customer.email"
                                    type="email"
                                    required
                                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>

                            <!-- Phone Number -->
                            <div class="space-y-2">
                                <label for="sdtKH" class="block text-sm font-medium text-gray-700"
                                    >Số điện thoại</label
                                >
                                <input
                                    id="sdtKH"
                                    v-model="customer.sdtKH"
                                    type="text"
                                    required
                                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>

                            <!-- Gender -->
                            <div class="space-y-2">
                                <label class="block text-sm font-medium text-gray-700"
                                    >Giới tính</label
                                >
                                <div class="flex space-x-6">
                                    <div class="flex items-center">
                                        <input
                                            id="male"
                                            v-model="customer.gioiTinhKH"
                                            type="radio"
                                            value="nam"
                                            class="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                                        />
                                        <label for="male" class="ml-2 text-sm text-gray-700"
                                            >Nam</label
                                        >
                                    </div>
                                    <div class="flex items-center">
                                        <input
                                            id="female"
                                            v-model="customer.gioiTinhKH"
                                            type="radio"
                                            value="nu"
                                            class="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                                        />
                                        <label for="female" class="ml-2 text-sm text-gray-700"
                                            >Nữ</label
                                        >
                                    </div>
                                    <div class="flex items-center">
                                        <input
                                            id="orthers"
                                            v-model="customer.gioiTinhKH"
                                            type="radio"
                                            value="khac"
                                            class="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                                        />
                                        <label for="orthers" class="ml-2 text-sm text-gray-700"
                                            >Khác</label
                                        >
                                    </div>
                                </div>
                            </div>

                            <!-- Birth Date -->
                            <div class="space-y-2">
                                <label
                                    for="ngaySinhKH"
                                    class="block text-sm font-medium text-gray-700"
                                    >Ngày sinh</label
                                >
                                <input
                                    id="ngaySinhKH"
                                    v-model="customer.ngaySinhKH"
                                    type="date"
                                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>

                            <div class="pt-4">
                                <button
                                    type="submit"
                                    class="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md transition-colors"
                                >
                                    Cập nhật thông tin
                                </button>
                            </div>
                        </form>

                        <!-- Password Change Button -->
                        <div class="mt-10 pt-6 border-t border-gray-200">
                            <h2 class="text-xl font-semibold mb-4">Bảo mật tài khoản</h2>
                            <NuxtLink to="/userinformation/change-password" class="block">
                                <button
                                class="w-full bg-emerald-400 hover:bg-emerald-500 font-semibold p-3 rounded-lg transition mt-8 cursor-pointer"
                                >
                                    Đổi mật khẩu
                                </button>
                            </NuxtLink>
                        </div>

                        <!-- Alerts -->
                        <div
                            v-if="successMessage"
                            class="mt-4 p-3 bg-green-100 text-green-700 rounded-md"
                        >
                            {{ successMessage }}
                        </div>
                        <div
                            v-if="errorMessage"
                            class="mt-4 p-3 bg-red-100 text-red-700 rounded-md"
                        >
                            {{ errorMessage }}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </NuxtLayout>
</template>

<script setup>
import { ref, onMounted } from "vue";
import Swal from 'sweetalert2'

// Reactive state
const customer = ref({
    email: "",
    hoTenKH: "",
    sdtKH: "",
    gioiTinhKH: "nam",
    ngaySinhKH: "",
});
// Kết nối API lấy thông tin User
const successMessage = ref("");
const errorMessage = ref("");
const authStore = useAuthStore();
const userId = authStore.userId;
const { $api } = useNuxtApp();
const router = useRouter();

// Functions
const fetchCustomerData = async () => {
    try {
        await new Promise((resolve) => setTimeout(resolve, 500));

        const res = (await $api.get(`/customers/${userId}`)).data;
        if (res.success) {
            const data = res.data;
            customer.value = {
                email: data.email_KH,
                hoTenKH: data.hoTen_KH,
                sdtKH: data.sdt_KH,
                gioiTinhKH: data.gioiTinh_KH,
                ngaySinhKH: new Date(data.ngaySinh_KH).toISOString().split("T")[0],
            };
        }
    } catch (error) {
        throw error;
    }
};

const updateCustomerInfo = async () => {
    try {
        await new Promise((resolve) => setTimeout(resolve, 500));
        const dataUser = {
            email_KH: customer.value.email,
            hoTen_KH: customer.value.hoTenKH,
            sdt_KH: customer.value.sdtKH,
            gioiTinh_KH: customer.value.gioiTinhKH,
            ngaySinh_KH: customer.value.ngaySinhKH,
        };
        const res = (await $api.put(`/customers/${userId}`, dataUser)).data;
        if (res.success) {
            Swal.fire({
                icon: 'success',
                title: 'Cập nhật thành công',
                text: 'Thông tin của bạn đã được cập nhật thành công!',
            });
        }
    } catch (error) {
        successMessage.value = "";
        errorMessage.value = "Không thể cập nhật thông tin. Vui lòng thử lại sau.";
        console.error("Error updating customer information:", error);
    }
};

// Lifecycle hooks
onMounted(async () => {
    try {
        await fetchCustomerData();
    } catch (error) {
        errorMessage.value = "Không thể tải thông tin khách hàng. Vui lòng thử lại sau.";
        console.error("Error fetching customer data:", error);
    }
});
</script>
