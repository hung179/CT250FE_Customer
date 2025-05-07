<template>
    <NuxtLayout>
        <div class="min-w-4xl max-w-2xl w-full h-full mx-auto">
            <div class="h-fit p-6">
                <div class="p-4 bg-gray-50 min-h-screen">
                    <div class="max-w-6xl mx-auto">
                        <h1 class="text-2xl font-bold text-gray-900 mb-6">
                            Quản lý địa chỉ khách hàng
                        </h1>

                        <!-- Form tìm kiếm -->
                        <div class="bg-white p-6 rounded-lg shadow-md mb-6">
                            <div class="flex items-center mb-4">
                                <input
                                    v-model="searchQuery"
                                    type="text"
                                    placeholder="Nhập địa chỉ tìm kiếm"
                                    class="flex-1 px-4 py-2 border rounded-l focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                />
                                <button
                                    @click="searchAddresses"
                                    class="bg-blue-600 text-white px-4 py-2 rounded-r hover:bg-blue-700 transition"
                                >
                                    Tìm kiếm
                                </button>
                            </div>
                        </div>

                        <!-- Danh sách địa chỉ -->
                        <div class="bg-white p-6 rounded-lg shadow-md mb-4">
                            <h2 class="text-xl font-semibold mb-4">Danh sách địa chỉ</h2>

                            <div v-if="loading" class="py-8 flex justify-center">
                                <div
                                    class="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"
                                ></div>
                            </div>

                            <div
                                v-else-if="addresses.length === 0"
                                class="py-8 text-center text-gray-500"
                            >
                                Không có địa chỉ nào.
                            </div>

                            <div v-else class="overflow-x-auto">
                                <table class="min-w-full divide-y divide-gray-200">
                                    <thead class="bg-gray-50">
                                        <tr>
                                            <th
                                                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                            >
                                                Địa chỉ
                                            </th>
                                            <th
                                                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                            >
                                                Số điện thoại
                                            </th>
                                            <th
                                                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                            >
                                                Thao tác
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody class="bg-white divide-y divide-gray-200">
                                        <tr
                                            v-for="(address) in addresses"
                                            :key="address._id"
                                        >
                                            <td class="px-6 py-4 text-sm text-gray-500">
                                                <div>
                                                    {{
                                                        address.chiTiet_DC
                                                            ? `${address.chiTiet_DC}, `
                                                            : ""
                                                    }}{{ address.xa_DC }}
                                                </div>
                                                <div>
                                                    {{ address.huyen_DC }}, {{ address.tinh_DC }}
                                                </div>
                                            </td>
                                            <td
                                                class="px-6 py-4 whitespace-nowrap text-sm text-gray-500"
                                            >
                                                {{ address.sdt_DC || "Không có" }}
                                            </td>
                                            <td
                                                class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium"
                                            >
                                                <button
                                                    @click="editAddress(address)"
                                                    class="text-blue-600 hover:text-blue-900 mr-3"
                                                >
                                                    Sửa
                                                </button>
                                                <button
                                                    @click="deleteAddress(address._id)"
                                                    class="text-red-600 hover:text-red-900"
                                                >
                                                    Xóa
                                                </button>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        <!-- Form thêm/cập nhật địa chỉ -->
                        <div class="bg-white p-6 rounded-lg shadow-md mb-6">
                            <h2 class="text-xl font-semibold mb-4">
                                {{ isEditing ? "Cập nhật địa chỉ" : "Thêm địa chỉ mới" }}
                            </h2>
                            <form @submit.prevent="saveAddress" class="space-y-4">
                                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label class="block text-sm font-medium text-gray-700 mb-1"
                                            >Tỉnh/Thành phố
                                            <span class="text-red-500">*</span></label
                                        >
                                        <select
                                            v-model="selectedProvinceCode"
                                            required
                                            class="w-full px-3 py-2 border rounded focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                            @change="onProvinceChange"
                                        >
                                            <option value="" disabled selected>
                                                Chọn Tỉnh/Thành phố
                                            </option>
                                            <option
                                                v-for="province in provinces"
                                                :key="province.code"
                                                :value="province.code"
                                            >
                                                {{ province.name }}
                                            </option>
                                        </select>
                                    </div>

                                    <div>
                                        <label class="block text-sm font-medium text-gray-700 mb-1"
                                            >Quận/Huyện <span class="text-red-500">*</span></label
                                        >
                                        <select
                                            v-model="selectedDistrictCode"
                                            required
                                            class="w-full px-3 py-2 border rounded focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                            :disabled="!selectedProvinceCode"
                                            @change="onDistrictChange"
                                        >
                                            <option value="" disabled selected>
                                                Chọn Quận/Huyện
                                            </option>
                                            <option
                                                v-for="district in districts"
                                                :key="district.code"
                                                :value="district.code"
                                            >
                                                {{ district.name }}
                                            </option>
                                        </select>
                                    </div>

                                    <div>
                                        <label class="block text-sm font-medium text-gray-700 mb-1"
                                            >Phường/Xã <span class="text-red-500">*</span></label
                                        >
                                        <select
                                            v-model="selectedWardCode"
                                            required
                                            class="w-full px-3 py-2 border rounded focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                            :disabled="!selectedDistrictCode"
                                            @change="onWardChange"
                                        >
                                            <option value="" disabled selected>
                                                Chọn Phường/Xã
                                            </option>
                                            <option
                                                v-for="ward in wards"
                                                :key="ward.code"
                                                :value="ward.code"
                                            >
                                                {{ ward.name }}
                                            </option>
                                        </select>
                                    </div>

                                    <div>
                                        <label class="block text-sm font-medium text-gray-700 mb-1"
                                            >Số điện thoại</label
                                        >
                                        <input
                                            v-model="addressForm.sdt_DC"
                                            type="text"
                                            class="w-full px-3 py-2 border rounded focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                            placeholder="Nhập số điện thoại"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label class="block text-sm font-medium text-gray-700 mb-1"
                                        >Chi tiết địa chỉ</label
                                    >
                                    <textarea
                                        v-model="addressForm.chiTiet_DC"
                                        class="w-full px-3 py-2 border rounded focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                        rows="2"
                                        placeholder="Số nhà, tên đường, tòa nhà,..."
                                    ></textarea>
                                </div>

                                <div class="flex justify-end space-x-2">
                                    <button
                                        type="button"
                                        @click="resetForm"
                                        class="px-4 py-2 border border-gray-300 rounded text-gray-700 hover:bg-gray-100 transition"
                                    >
                                        Hủy
                                    </button>
                                    <button
                                        type="submit"
                                        class="px-4 py-2 bg-emerald-400 text-white rounded hover:bg-blue-700 transition"
                                    >
                                        {{ isEditing ? "Cập nhật" : "Thêm mới" }}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <Notification
            v-model="showModal"
            title="Thông báo"
            :message="message"
            @close="handleNotificationClose"
        />
    </NuxtLayout>
</template>

<script setup>
import { ref, reactive, computed, watch, onMounted } from "vue";
import Swal from 'sweetalert2'

const addresses = ref([]);
const loading = ref(false);
const isEditing = ref(false);
const currentEditId = ref(null);
const searchQuery = ref("");
const message = ref("");
const showModal = ref(false);
const router = useRouter();

const provinces = ref([]);
const districts = ref([]);
const wards = ref([]);

const selectedProvinceCode = ref("");
const selectedDistrictCode = ref("");
const selectedWardCode = ref("");

const addressForm = ref({
    tinh_DC: "",
    huyen_DC: "",
    xa_DC: "",
    chiTiet_DC: "",
    sdt_DC: "",
    idKhachHang_DC: "",
});

const toast = {
    success: (message) => alert(message),
    error: (message) => alert(message),
    warning: (message) => alert(message),
};

const fetchProvinces = async () => {
    try {
        const response = await fetch("https://provinces.open-api.vn/api/p/");
        const data = await response.json();
        provinces.value = data;
    } catch (error) {
        console.error("Lỗi khi tải dữ liệu tỉnh/thành phố:", error);
        toast.error("Không thể tải dữ liệu tỉnh/thành phố. Vui lòng tải lại trang.");
    }
};

const fetchDistricts = async (provinceCode) => {
    if (!provinceCode) return;

    try {
        const response = await fetch(`https://provinces.open-api.vn/api/p/${provinceCode}?depth=2`);
        const data = await response.json();
        districts.value = data.districts || [];
        wards.value = [];
        selectedDistrictCode.value = "";
        selectedWardCode.value = "";
    } catch (error) {
        console.error("Lỗi khi tải dữ liệu quận/huyện:", error);
        toast.error("Không thể tải dữ liệu quận/huyện. Vui lòng thử lại.");
    }
};

const fetchWards = async (districtCode) => {
    if (!districtCode) return;

    try {
        const response = await fetch(`https://provinces.open-api.vn/api/d/${districtCode}?depth=2`);
        const data = await response.json();
        wards.value = data.wards || [];
        selectedWardCode.value = "";
    } catch (error) {
        console.error("Lỗi khi tải dữ liệu phường/xã:", error);
        toast.error("Không thể tải dữ liệu phường/xã. Vui lòng thử lại.");
    }
};

const onProvinceChange = () => {
    const selectedProvince = provinces.value.find((p) => p.code === selectedProvinceCode.value);
    if (selectedProvince) {
        addressForm.value.tinh_DC = selectedProvince.name;
    }

    fetchDistricts(selectedProvinceCode.value);
};

const onDistrictChange = () => {
    const selectedDistrict = districts.value.find((d) => d.code === selectedDistrictCode.value);
    if (selectedDistrict) {
        addressForm.value.huyen_DC = selectedDistrict.name;
    }

    fetchWards(selectedDistrictCode.value);
};

const onWardChange = () => {
    const selectedWard = wards.value.find((w) => w.code === selectedWardCode.value);
    if (selectedWard) {
        addressForm.value.xa_DC = selectedWard.name;
    }
};

const authStore = useAuthStore();
const { $api } = useNuxtApp();
const userId = authStore.userId;

const fetchAddresses = async () => {
    loading.value = true;
    try {
        const result = (await $api.get(`addresses/user/${userId}`)).data;
        if (result.success) {
            addresses.value = result.data;
        }
    } catch (error) {
        console.error("Lỗi khi tải danh sách địa chỉ:", error);
        toast.error("Không thể tải danh sách địa chỉ. Vui lòng thử lại sau.");
    } finally {
        loading.value = false;
    }
};

watch(searchQuery, (newQuery) => {
  if (newQuery.trim() === '') {
    fetchAddresses();
  } else {
    searchAddresses();
  }
});

const searchAddresses = async () => {
  loading.value = true;
  try {
    const query = searchQuery.value.toLowerCase().trim();
    
    const allAddresses = await $api.get(`addresses/user/${userId}`);
    const addressList = allAddresses.data.data;

    addresses.value = addressList.filter((addr) => {
      const matchChiTiet = addr.chiTiet_DC?.toLowerCase().includes(query);
      const matchXa = addr.xa_DC?.toLowerCase().includes(query);
      const matchHuyen = addr.huyen_DC?.toLowerCase().includes(query);
      const matchTinh = addr.tinh_DC?.toLowerCase().includes(query);
      const matchSDT = addr.sdt_DC?.toLowerCase().includes(query);

      let matchScore = 0;
      if (matchChiTiet) matchScore += 4;
      if (matchXa) matchScore += 3;
      if (matchHuyen) matchScore += 2;
      if (matchTinh) matchScore += 1;
      if (matchSDT) matchScore += 1;

      addr.matchScore = matchScore;

      return matchScore > 0;
    });

    addresses.value.sort((a, b) => b.matchScore - a.matchScore);
  } catch (error) {
    console.error("Lỗi khi tìm kiếm địa chỉ:", error);
    toast.error("Không thể tìm kiếm địa chỉ. Vui lòng thử lại sau.");
  } finally {
    loading.value = false;
  }
};

const saveAddress = async () => {
    try {
        if (!addressForm.value.tinh_DC || !addressForm.value.huyen_DC || !addressForm.value.xa_DC) {
            toast.error("Vui lòng điền đầy đủ thông tin bắt buộc.");
            return;
        }

        const addressData = { ...addressForm.value };
        addressData.idKhachHang_DC = userId;

        if (!isEditing.value) {
            const result = (await $api.post("/addresses/", addressData)).data;
            if (result.success) {
                Swal.fire({
                icon: "success",
                title: "Thành công",
                text: "Thêm địa chỉ thành công",
            });
                await fetchAddresses(); 
            }
        } else {
            const result = (await $api.put(`/addresses/${currentEditId.value}`, addressData)).data;
            if (result.success) {
                Swal.fire({
                icon: "success",
                title: "Thành công",
                text: "Cập nhật địa chỉ thành công",
            });
                await fetchAddresses(); // Refresh danh sách địa chỉ
            }
        }

        resetForm();
    } catch (error) {
        Swal.fire({
                icon: "error",
                title: "Thất bại",
                text: "Cập nhật địa chỉ không thành công",
            });    }
};

const editAddress = (address) => {
    const addressCopy = { ...address };

    isEditing.value = true;
    currentEditId.value = addressCopy._id;
    addressForm.value = addressCopy;

    const province = provinces.value.find((p) => p.name === addressCopy.tinh_DC);
    if (province) {
        selectedProvinceCode.value = province.code;
        fetchDistricts(province.code).then(() => {
            const district = districts.value.find((d) => d.name === addressCopy.huyen_DC);
            if (district) {
                selectedDistrictCode.value = district.code;
                fetchWards(district.code).then(() => {
                    const ward = wards.value.find((w) => w.name === addressCopy.xa_DC);
                    if (ward) {
                        selectedWardCode.value = ward.code;
                    }
                });
            }
        });
    }
};

const deleteAddress = async (id) => {
    try {
        const result = (await $api.delete(`/addresses/${id}`)).data;
        if (result.success) {
            Swal.fire({
                icon: "success",
                title: "Thành công",
                text: "Xóa địa chỉ thành công",
            });
            await fetchAddresses(); // Refresh danh sách địa chỉ
        }

        if (currentEditId.value === id) {
            resetForm();
        }
    } catch (error) {
        Swal.fire({
                icon: "error",
                title: "Thất bại",
                text: "Xóa địa chỉ thất bại",
            });
    }
};

const resetForm = () => {
    isEditing.value = false;
    currentEditId.value = null;

    // Reset form values
    addressForm.value = {
        tinh_DC: "",
        huyen_DC: "",
        xa_DC: "",
        chiTiet_DC: "",
        sdt_DC: "",
        idKhachHang_DC: "",
    };

    // Reset selected codes
    selectedProvinceCode.value = "";
    selectedDistrictCode.value = "";
    selectedWardCode.value = "";

    // Reset danh sách districts và wards
    districts.value = [];
    wards.value = [];
};

const handleNotificationClose = () => {
    showModal.value = false;
    fetchAddresses(); // Refresh danh sách địa chỉ khi đóng modal
    router.push("/address/");
};

onMounted(() => {
    // Tải dữ liệu tỉnh/thành phố
    fetchProvinces();

    // Tải danh sách địa chỉ
    fetchAddresses();
});
</script>
