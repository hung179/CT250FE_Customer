<template>
    <div class="p-6 bg-white rounded-lg shadow-md">
        <h2 class="text-lg font-semibold mb-4">Chọn địa chỉ nhận hàng</h2>

        <!-- Chọn Tỉnh/Thành -->
        <div class="mb-4">
            <label class="block text-sm font-medium">Tỉnh/Thành</label>
            <select v-model="selectedProvince" @change="fetchDistricts" class="input">
                <option value="" disabled>Chọn tỉnh/thành</option>
                <option v-for="province in provinces" :key="province.code" :value="province">
                    {{ province.name }}
                </option>
            </select>
        </div>

        <!-- Chọn Quận/Huyện -->
        <div class="mb-4" v-if="districts.length > 0">
            <label class="block text-sm font-medium">Quận/Huyện</label>
            <select v-model="selectedDistrict" @change="fetchWards" class="input">
                <option value="" disabled>Chọn quận/huyện</option>
                <option v-for="district in districts" :key="district.code" :value="district">
                    {{ district.name }}
                </option>
            </select>
        </div>

        <!-- Chọn Phường/Xã -->
        <div class="mb-4" v-if="wards.length > 0">
            <label class="block text-sm font-medium">Phường/Xã</label>
            <select v-model="selectedWard" class="input">
                <option value="" disabled>Chọn phường/xã</option>
                <option v-for="ward in wards" :key="ward.code" :value="ward">
                    {{ ward.name }}
                </option>
            </select>
        </div>

        <!-- Hiển thị địa chỉ đã chọn -->
        <div v-if="selectedWard" class="mt-4 p-4 border rounded bg-gray-100">
            <h3 class="font-semibold">Địa chỉ nhận hàng:</h3>
            <p>{{ fullAddress }}</p>
        </div>
    </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";

const provinces = ref([]);
const districts = ref([]);
const wards = ref([]);

const selectedProvince = ref(null);
const selectedDistrict = ref(null);
const selectedWard = ref(null);

onMounted(async () => {
    await fetchProvinces();
});

// Lấy danh sách tỉnh/thành từ API
const fetchProvinces = async () => {
    try {
        const response = await fetch("https://provinces.open-api.vn/api/p/");
        provinces.value = await response.json();
    } catch (error) {
        console.error("Lỗi lấy danh sách tỉnh/thành:", error);
    }
};

// Lấy danh sách quận/huyện theo tỉnh đã chọn
const fetchDistricts = async () => {
    selectedDistrict.value = null;
    selectedWard.value = null;
    districts.value = [];
    wards.value = [];

    if (!selectedProvince.value) return;

    try {
        const response = await fetch(
            `https://provinces.open-api.vn/api/p/${selectedProvince.value.code}?depth=2`
        );
        const data = await response.json();
        districts.value = data.districts;
    } catch (error) {
        console.error("Lỗi lấy danh sách quận/huyện:", error);
    }
};

// Lấy danh sách phường/xã theo quận đã chọn
const fetchWards = async () => {
    selectedWard.value = null;
    wards.value = [];

    if (!selectedDistrict.value) return;

    try {
        const response = await fetch(
            `https://provinces.open-api.vn/api/d/${selectedDistrict.value.code}?depth=2`
        );
        const data = await response.json();
        wards.value = data.wards;
    } catch (error) {
        console.error("Lỗi lấy danh sách phường/xã:", error);
    }
};

// Tạo địa chỉ đầy đủ
const fullAddress = computed(() => {
    if (!selectedProvince.value || !selectedDistrict.value || !selectedWard.value)
        return "Chưa chọn đủ địa chỉ";
    return `${selectedWard.value.name}, ${selectedDistrict.value.name}, ${selectedProvince.value.name}`;
});
</script>

<style scoped>
.input {
    width: 100%;
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 4px;
    outline: none;
}
</style>
