<template>
    <NuxtLayout>
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
                        ĐĂNG NHẬP
                    </h2>
                    
                    <!-- Tab điều hướng -->
                    <div class="flex mb-5 border-b">
                        <button 
                            @click="activeTab = 'password'" 
                            class="flex-1 py-2 border-b-2 transition-colors"
                            :class="activeTab === 'password' ? 'border-emerald-400 text-emerald-500' : 'border-transparent text-gray-400'"
                        >
                            Đăng nhập bằng mật khẩu
                        </button>
                        <button 
                            @click="activeTab = 'otp'" 
                            class="flex-1 py-2 border-b-2 transition-colors"
                            :class="activeTab === 'otp' ? 'border-emerald-400 text-emerald-500' : 'border-transparent text-gray-400'"
                        >
                            Đăng nhập bằng OTP
                        </button>
                    </div>
                    
                    <!-- Tab đăng nhập bằng mật khẩu -->
                    <form v-if="activeTab === 'password'" @submit.prevent="login">
                        <div class="my-5">
                            <label class="block mb-2">Email</label>
                            <input
                                v-model="email_KH"
                                type="text"
                                required
                                placeholder="Nhập email"
                                class="w-full p-3 rounded-lg bg-zinc-100 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-400"
                            />
                        </div>

                        <div class="mb-4">
                            <label class="block mb-2">Mật khẩu</label>
                            <input
                                v-model="mk_KH"
                                type="password"
                                required
                                placeholder="Nhập mật khẩu"
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
                            {{ isLoading ? 'Đang đăng nhập...' : 'Đăng nhập' }}
                        </button>
                    </form>
                    
                    <!-- Tab đăng nhập bằng OTP -->
                    <div v-else>
                        <!-- Bước 1: Nhập email và yêu cầu OTP -->
                        <form v-if="!otpSent" @submit.prevent="requestOtp">
                            <div class="my-5">
                                <label class="block mb-2">Email</label>
                                <input
                                    v-model="email_KH"
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
                                {{ isLoading ? 'Đang gửi mã OTP...' : 'Gửi mã OTP' }}
                            </button>
                        </form>
                        
                        <!-- Bước 2: Nhập OTP -->
                        <form v-else @submit.prevent="loginWithOtp">
                            <div class="bg-emerald-50 p-4 rounded-lg mb-5">
                                <p class="text-sm text-emerald-700">
                                    Mã OTP đã được gửi đến email {{ email_KH }}.<br>
                                    Mã này sẽ hết hạn sau 60 giây.
                                </p>
                            </div>
                            
                            <div class="my-5">
                                <label class="block mb-2">Mã OTP</label>
                                <input
                                    v-model="otp"
                                    type="text"
                                    required
                                    placeholder="Nhập mã OTP"
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
                                {{ isLoading ? 'Đang xác thực...' : 'Xác nhận' }}
                            </button>
                            
                            <button
                                type="button"
                                class="w-full text-emerald-400 mt-4 hover:underline cursor-pointer"
                                @click="requestOtp"
                                :disabled="isLoading"
                            >
                                Gửi lại mã OTP
                            </button>
                        </form>
                    </div>

                    <p class="text-gray-300 text-center mt-4">
                        <NuxtLink
                            to="/forget-password" 
                            class="text-emerald-400 hover:underline cursor-pointer"
                            >Quên mật khẩu ?</NuxtLink
                        >
                    </p>
                </div>
                <div class="col-span-2 mt-2 text-center text-sm">
                    <NuxtLink
                        to="/register"
                        class="text-emerald-400 hover:underline cursor-pointer"
                        >Đăng ký</NuxtLink
                    >
                </div>
            </div>
        </div>
    </NuxtLayout>
</template>

<script setup>
const router = useRouter();

definePageMeta({
    layout: "login",
});

// Data
const mk_KH = ref('');
const email_KH = ref('');
const otp = ref('');
const activeTab = ref('password');
const otpSent = ref(false);
const isLoading = ref(false);
const errorMessage = ref('');

const authStore = useAuthStore();
const { $api } = useNuxtApp();

// Đăng nhập bằng mật khẩu
async function login() {
    try {
        isLoading.value = true;
        errorMessage.value = '';
        
        const res = await $api.post("/auth/customer-login", {
            email_KH: email_KH.value,
            password_KH: mk_KH.value,
        });
        
        const data = res.data;
        if (data.accessToken && data.userId) {
            authStore.setAuth(data.accessToken, data.userId);
            router.push('/');
        } else {
            errorMessage.value = 'Đăng nhập thất bại. Vui lòng kiểm tra lại thông tin.';
        }
    } catch (error) {
        console.error("Lỗi đăng nhập:", error);
        errorMessage.value = 'Email hoặc mật khẩu không đúng';
    } finally {
        isLoading.value = false;
    }
}

// Gửi yêu cầu OTP
async function requestOtp() {
    try {
        isLoading.value = true;
        errorMessage.value = '';
        
        const res = await $api.post("/auth/email/send-otp", {
            email: email_KH.value
        });
        
        if (res.data && res.data.success) {
            otpSent.value = true;
        } else {
            errorMessage.value = 'Không thể gửi mã OTP. Vui lòng kiểm tra lại email.';
        }
    } catch (error) {
        console.error("Lỗi gửi OTP:", error);
        errorMessage.value = error.response?.data?.message || 'Có lỗi xảy ra khi gửi OTP';
    } finally {
        isLoading.value = false;
    }
}

// Đăng nhập bằng OTP
async function loginWithOtp() {
    try {
        isLoading.value = true;
        errorMessage.value = '';
        
        const res = await $api.post("/auth/email/login", {
            email: email_KH.value,
            otp: otp.value
        });
        
        const data = res.data;
        if (data.accessToken && data.userId) {
            authStore.setAuth(data.accessToken, data.userId);
            router.push('/');
        } else {
            errorMessage.value = 'Xác thực thất bại. Vui lòng thử lại.';
        }
    } catch (error) {
        console.error("Lỗi đăng nhập bằng OTP:", error);
        errorMessage.value = error.response?.data?.message || 'Mã OTP không hợp lệ hoặc đã hết hạn';
    } finally {
        isLoading.value = false;
    }
}

// Reset form khi chuyển tab
watch(activeTab, (newValue) => {
    errorMessage.value = '';
    if (newValue === 'otp') {
        otpSent.value = false;
    }
});
</script>