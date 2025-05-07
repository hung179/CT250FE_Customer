<template>
    <div class="flex flex-row flex-1 rounded-xl shadow-xl bg-white/10 backdrop-blur-md m-5 sm:m-20">
        <div class="flex flex-1 justify-center items-center py-10">
            <div class="w-full h-full lg:flex hidden justify-center items-center">
                <!-- <img src="../public/logo1.png" alt="" class="h-full object-contain" /> -->
            </div>
        </div>
        <div class="max-w-xl w-full min-w-sm h-full min-h-fit bg-white rounded-xl py-10 px-10">
            <div class="w-full h-full min-h-fit flex flex-col justify-center">
                <h2 class="font-semibold text-2xl text-center text-emerald-400 pb-3">ĐĂNG KÝ</h2>
                <form @submit.prevent="handleSubmit" class="grid grid-cols-2 gap-3">
                    <!-- Email -->
                    <div class="col-span-2">
                        <label class="text-sm mb-1 block">Email</label>
                        <input
                            v-model="email_KH"
                            type="email"
                            required
                            placeholder="Nhập email"
                            class="w-full p-2 rounded-lg bg-zinc-100 placeholder-gray-300 focus:outline-none focus:ring-1 focus:ring-emerald-400"
                        />
                    </div>

                    <!-- Mật khẩu và Xác nhận mật khẩu -->
                    <div>
                        <label class="text-sm mb-1 block">Mật khẩu</label>
                        <input
                            v-model="password_KH"
                            type="password"
                            required
                            placeholder="Nhập mật khẩu"
                            class="w-full p-2 rounded-lg bg-zinc-100 placeholder-gray-300 focus:outline-none focus:ring-1 focus:ring-emerald-400"
                        />
                    </div>
                    <div>
                        <label class="text-sm mb-1 block">Xác nhận</label>
                        <input
                            v-model="confirmPassword"
                            type="password"
                            required
                            placeholder="Nhập lại mật khẩu"
                            class="w-full p-2 rounded-lg bg-zinc-100 placeholder-gray-300 focus:outline-none focus:ring-1 focus:ring-emerald-400"
                        />
                    </div>

                    <!-- Họ tên -->
                    <div class="col-span-2">
                        <label class="text-sm mb-1 block">Họ và tên</label>
                        <input
                            v-model="hoTen_KH"
                            type="text"
                            required
                            placeholder="Nhập họ và tên"
                            class="w-full p-2 rounded-lg bg-zinc-100 placeholder-gray-300 focus:outline-none focus:ring-1 focus:ring-emerald-400"
                        />
                    </div>

                    <!-- Số điện thoại -->
                    <div>
                        <label class="text-sm mb-1 block">Số điện thoại</label>
                        <input
                            v-model="sdt_KH"
                            type="tel"
                            required
                            placeholder="Nhập số điện thoại"
                            class="w-full p-2 rounded-lg bg-zinc-100 placeholder-gray-300 focus:outline-none focus:ring-1 focus:ring-emerald-400"
                        />
                    </div>

                    <!-- Ngày sinh -->
                    <div>
                        <label class="text-sm mb-1 block">Ngày sinh</label>
                        <input
                            v-model="ngaySinh_KH"
                            type="date"
                            class="w-full p-2 rounded-lg bg-zinc-100 placeholder-gray-300 focus:outline-none focus:ring-1 focus:ring-emerald-400"
                        />
                    </div>

                    <!-- Giới tính -->
                    <div class="col-span-2">
                        <label class="text-sm mb-1 block">Giới tính</label>
                        <div class="flex gap-4">
                            <label class="flex items-center text-sm">
                                <input
                                    type="radio"
                                    v-model="gioiTinh_KH"
                                    value="nam"
                                    required
                                    class="mr-1"
                                />
                                Nam
                            </label>
                            <label class="flex items-center text-sm">
                                <input type="radio" v-model="gioiTinh_KH" value="nu" class="mr-1" />
                                Nữ
                            </label>
                            <label class="flex items-center text-sm">
                                <input
                                    type="radio"
                                    v-model="gioiTinh_KH"
                                    value="khac"
                                    class="mr-1"
                                />
                                Khác
                            </label>
                        </div>
                    </div>

                    <!-- Nút đăng ký -->
                    <button
                        type="submit"
                        class="col-span-2 mt-4 py-2 bg-emerald-400 text-white font-semibold rounded-lg hover:bg-emerald-500 transition-colors focus:outline-none focus:ring-1 focus:ring-emerald-400"
                    >
                        ĐĂNG KÝ
                    </button>

                    <!-- Link đăng nhập -->
                    <div class="col-span-2 mt-2 text-center text-sm">
                        <NuxtLink
                            to="/login"
                            class="text-emerald-400 hover:underline cursor-pointer"
                            >Đã có tài khoản</NuxtLink
                        >
                    </div>
                </form>
            </div>
        </div>
        <Notification
            v-model="showModal"
            title="Thông báo"
            message="Đăng ký thành công"
            @close="router.push('/login')"
        />
    </div>
</template>

<script setup>
import { ref } from "vue";
const router = useRouter();

const { $api } = useNuxtApp();
const showModal = ref(false);
const email_KH = ref("");
const password_KH = ref("");
const confirmPassword = ref("");
const hoTen_KH = ref("");
const sdt_KH = ref("");
const gioiTinh_KH = ref("");
const ngaySinh_KH = ref("");

// Xử lý sự kiện submit form
const handleSubmit = async () => {
    // Kiểm tra mật khẩu xác nhận
    if (password_KH.value !== confirmPassword.value) {
        alert("Mật khẩu xác nhận không khớp!");
        return;
    }

    const userData = {
        email_KH: email_KH.value,
        password_KH: password_KH.value,
        hoTen_KH: hoTen_KH.value,
        sdt_KH: sdt_KH.value,
        gioiTinh_KH: gioiTinh_KH.value,
        ngaySinh_KH: ngaySinh_KH.value ? new Date(ngaySinh_KH.value) : null,
    };

    try {
        const result = await $api.post("/customers", 
            userData,
        );
        if (result.data.success) {
            showModal.value = true;
        }
    } catch (e) {
        console.error("Lỗi đăng ký:", e);
    }
};


</script>