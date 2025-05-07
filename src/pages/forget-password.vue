<template>
        <div
            class="flex flex-row flex-1 rounded-xl shadow-xl bg-white/10 backdrop-blur-md m-5 sm:m-20"
        >
            <div class="flex flex-1 justify-center items-center py-10">
                <div class="w-full h-full lg:flex hidden justify-center items-center">
                    <!-- <img src="../public/logo1.png" alt="" class="h-full object-contain" /> -->
                </div>
            </div>
            <div class="max-w-xl w-full min-w-sm h-full min-h-fit bg-white rounded-xl py-15 px-10">
                <div class="w-full h-full min-h-fit flex flex-col justify-center">
                    <h2 class="font-semibold text-3xl text-center text-emerald-400 pb-5">
                        QUÊN MẬT KHẨU
                    </h2>

                    <!-- Hiển thị các bước khác nhau -->
                    <div v-if="step === 1">
                        <!-- Bước 1: Nhập email -->
                        <div class="mb-5">
                            <p class="text-gray-600 text-center">
                                Vui lòng nhập email của bạn để nhận mã xác nhận
                            </p>
                        </div>

                        <form @submit.prevent="requestOtp">
                            <div class="my-5">
                                <label class="block mb-2">Email</label>
                                <input
                                    v-model="email"
                                    type="email"
                                    required
                                    placeholder="Nhập email"
                                    class="w-full p-3 rounded-lg bg-zinc-100 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-400"
                                />
                            </div>

                            <p v-if="errorMessage" class="text-red-500 text-center mt-2">
                                {{ errorMessage }}
                            </p>

                            <button
                                type="submit"
                                class="w-full bg-emerald-400 hover:bg-emerald-500 font-semibold p-3 rounded-lg transition mt-8 cursor-pointer"
                                :disabled="isLoading"
                            >
                                {{ isLoading ? "Đang gửi..." : "Gửi mã xác nhận" }}
                            </button>
                        </form>
                    </div>

                    <div v-else-if="step === 2">
                        <!-- Bước 2: Nhập OTP -->
                        <div class="bg-emerald-50 p-4 rounded-lg mb-5">
                            <p class="text-sm text-emerald-700">
                                Mã xác nhận đã được gửi đến email {{ email }}.<br />
                                Mã này sẽ hết hạn sau 60 giây.
                            </p>
                        </div>

                        <form @submit.prevent="verifyOtp">
                            <div class="my-5">
                                <label class="block mb-2">Mã xác nhận</label>
                                <input
                                    v-model="otp"
                                    type="text"
                                    required
                                    placeholder="Nhập mã xác nhận"
                                    class="w-full p-3 rounded-lg bg-zinc-100 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-400"
                                />
                            </div>

                            <p v-if="errorMessage" class="text-red-500 text-center mt-2">
                                {{ errorMessage }}
                            </p>

                            <button
                                type="submit"
                                class="w-full bg-emerald-400 hover:bg-emerald-500 font-semibold p-3 rounded-lg transition mt-8 cursor-pointer"
                                :disabled="isLoading"
                            >
                                {{ isLoading ? "Đang xác thực..." : "Xác nhận" }}
                            </button>

                            <button
                                type="button"
                                class="w-full text-emerald-400 mt-4 hover:underline cursor-pointer"
                                @click="requestOtp"
                                :disabled="isLoading"
                            >
                                Gửi lại mã xác nhận
                            </button>
                        </form>
                    </div>

                    <div v-else-if="step === 3">
                        <!-- Bước 3: Đặt mật khẩu mới -->
                        <div class="mb-5">
                            <p class="text-gray-600 text-center">
                                Vui lòng nhập mật khẩu mới cho tài khoản của bạn
                            </p>
                        </div>

                        <form @submit.prevent="resetPassword">
                            <div class="my-5">
                                <label class="block mb-2">Mật khẩu mới</label>
                                <input
                                    v-model="newPassword"
                                    type="password"
                                    required
                                    placeholder="Nhập mật khẩu mới"
                                    class="w-full p-3 rounded-lg bg-zinc-100 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-400"
                                />
                            </div>

                            <div class="mb-5">
                                <label class="block mb-2">Xác nhận mật khẩu</label>
                                <input
                                    v-model="confirmPassword"
                                    type="password"
                                    required
                                    placeholder="Nhập lại mật khẩu mới"
                                    class="w-full p-3 rounded-lg bg-zinc-100 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-400"
                                />
                            </div>

                            <p v-if="errorMessage" class="text-red-500 text-center mt-2">
                                {{ errorMessage }}
                            </p>

                            <button
                                type="submit"
                                class="w-full bg-emerald-400 hover:bg-emerald-500 font-semibold p-3 rounded-lg transition mt-8 cursor-pointer"
                                :disabled="isLoading"
                            >
                                {{ isLoading ? "Đang cập nhật..." : "Cập nhật mật khẩu" }}
                            </button>
                        </form>
                    </div>

                    <div v-else-if="step === 4">
                        <!-- Bước 4: Thành công -->
                        <div class="bg-emerald-50 p-4 rounded-lg my-5">
                            <p class="text-center text-emerald-700">Đặt lại mật khẩu thành công!</p>
                        </div>

                        <button
                            @click="goToLogin"
                            class="w-full bg-emerald-400 hover:bg-emerald-500 font-semibold p-3 rounded-lg transition mt-8 cursor-pointer"
                        >
                            Quay lại đăng nhập
                        </button>
                    </div>

                    <div class="col-span-2 mt-6 text-center text-sm">
                        <NuxtLink
                            to="/login"
                            class="text-emerald-400 hover:underline cursor-pointer"
                        >
                            Quay lại đăng nhập
                        </NuxtLink>
                    </div>
                </div>
            </div>
        </div>
</template>

<script setup>
const router = useRouter();

definePageMeta({
    layout: "login",
});

// Data
const email = ref("");
const otp = ref("");
const newPassword = ref("");
const confirmPassword = ref("");
const step = ref(1);
const isLoading = ref(false);
const errorMessage = ref("");
const token = ref("");

const { $api } = useNuxtApp();

// Gửi yêu cầu OTP
async function requestOtp() {
    try {
        isLoading.value = true;
        errorMessage.value = "";

        const res = await $api.post("/auth/password/send-otp", {
            email: email.value,
        });

        if (res.data && res.data.success) {
            step.value = 2;
        } else {
            errorMessage.value = "Không thể gửi mã xác nhận. Vui lòng kiểm tra lại email.";
        }
    } catch (error) {
        console.error("Lỗi gửi mã xác nhận:", error);
        errorMessage.value = error.response?.data?.message || "Email không tồn tại trong hệ thống.";
    } finally {
        isLoading.value = false;
    }
}

// Xác nhận OTP
async function verifyOtp() {
    try {
        isLoading.value = true;
        errorMessage.value = "";

        const res = await $api.post("/auth/verify-otp", {
            email: email.value,
            otp: otp.value,
        });
        if (res.data && res.data.accessToken) {
            // Đổi 'token' thành 'accessToken'
            token.value = res.data.accessToken;
            step.value = 3;
        } else {
            errorMessage.value = "Xác thực thất bại. Vui lòng thử lại.";
        }
    } catch (error) {
        console.error("Lỗi xác thực OTP:", error);
        errorMessage.value =
            error.response?.data?.message || "Mã xác nhận không hợp lệ hoặc đã hết hạn";
    } finally {
        isLoading.value = false;
    }
}

// Đặt lại mật khẩu
async function resetPassword() {
    if (newPassword.value !== confirmPassword.value) {
        errorMessage.value = "Mật khẩu xác nhận không trùng khớp";
        return;
    }

    try {
        isLoading.value = true;
        errorMessage.value = "";

        const res = await $api.post("/auth/password/reset", {
            email: email.value,
            accessToken: token.value,
            newPassword: newPassword.value,
        });

        if (res.data && res.data.success) {
            step.value = 4;
        } else {
            errorMessage.value = "Không thể cập nhật mật khẩu. Vui lòng thử lại.";
        }
    } catch (error) {
        console.error("Lỗi đặt lại mật khẩu:", error);
        errorMessage.value = error.response?.data?.message || "Có lỗi xảy ra khi đặt lại mật khẩu";
    } finally {
        isLoading.value = false;
    }
}

// Quay lại trang đăng nhập
function goToLogin() {
    router.push("/login");
}
</script>
