<template>
    <div class="h-fit w-full p-8 rounded-lg bg-white shadow-[0px_0px_10px_rgba(0,0,0,0.1)]">
        <div
            @click="test"
            class="text-xl font-semibold text-zinc-900 w-full rounded-t-xl bg-zinc-50 mb-10"
        >
            Thông tin chi tiết
        </div>

        <div class="grid grid-cols-2 gap-6">
            <div
                v-for="thuocTinh in productDetails"
                :key="thuocTinh.thuocTinh_CTSP"
                class="flex items-center"
            >
                <!-- Lấy tên thuộc tính từ productAttributes -->
                <div class="w-48 mr-6 flex justify-end text-sm text-zinc-900">
                    {{ getAttributeName(thuocTinh.thuocTinh_CTSP) }}
                </div>

                <!-- Ô nhập giá trị thuộc tính -->
                <div class="relative flex-1">
                    <!-- Kiểu text -->
                    <input
                        v-if="getAttributeType(thuocTinh.thuocTinh_CTSP) == 'String'"
                        type="text"
                        :disabled="disable(thuocTinh.thuocTinh_CTSP)"
                        v-model="thuocTinh.giaTri_CTSP"
                        class="w-full text-sm text-zinc-900 bg-transparent border-[1px] border-zinc-300 hover:border-zinc-400 rounded-md h-10 outline-none p-2 focus:border-zinc-400"
                        placeholder="Nhập giá trị"
                        :class="{ 'cursor-not-allowed': disable(thuocTinh.thuocTinh_CTSP) }"
                    />

                    <!-- Kiểu number -->
                    <input
                        v-else-if="getAttributeType(thuocTinh.thuocTinh_CTSP) == 'Number'"
                        type="number"
                        v-model="thuocTinh.giaTri_CTSP"
                        class="w-full text-sm text-zinc-900 bg-transparent border-[1px] border-zinc-300 hover:border-zinc-400 rounded-md h-10 outline-none p-2 focus:border-zinc-400"
                        placeholder="Nhập số"
                    />

                    <!-- Kiểu date -->
                    <input
                        v-else-if="getAttributeType(thuocTinh.thuocTinh_CTSP) == 'Date'"
                        type="date"
                        v-model="thuocTinh.giaTri_CTSP"
                        class="w-full text-sm text-zinc-900 bg-transparent border-[1px] border-zinc-300 hover:border-zinc-400 rounded-md h-10 outline-none p-2 focus:border-zinc-400"
                    />
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { reactive, onMounted, computed } from "vue";
const props = defineProps(["sanPham"]);

const productAttributes = ref([]);

const authStore = useAuthStore();
const { $api } = useNuxtApp(); // ✅ Truy cập api từ plugin
import { useRouter } from "vue-router";

const productDetails = computed(() => {
    return props.sanPham.ttChiTiet_SP || [];
});

const router = useRouter();
async function getAttribute() {
    try {
        const res = await $api.get("/attributes");
        if (res.data.success) {
            productAttributes.value = res.data.data;
        }
    } catch (error) {
        console.error("Lỗi:", error);
    }
}
// Lấy tên thuộc tính từ productAttributes
const getAttributeName = (id) => {
    const attr = productAttributes.value.find((attr) => attr._id.toString() == id);
    return attr ? attr.ten_TT : "Không xác định";
};

// Lấy kiểu dữ liệu của thuộc tính
const getAttributeType = (id) => {
    const attr = productAttributes.value.find((attr) => attr._id.toString() == id);
    return attr ? attr.kieuDuLieu_TT : "String";
};

const disable = (id) => {
    const attr = productAttributes.value.find((attr) => attr._id.toString() == id);
    return !attr;
};

const test = () => {
    console.log(productDetails.value);
};

onMounted(async () => {
    await getAttribute();
});
</script>
