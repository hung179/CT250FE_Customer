<template>
    <NuxtLayout>
        <div class="min-h-screen bg-gray-50">
            <div class="bg-gradient-to-r from-blue-700 to-blue-500 py-16">
                <div class="container mx-auto px-4">
                    <h1 class="text-4xl font-bold text-white text-center">Liên Hệ Với Chúng Tôi</h1>
                    <p class="text-blue-100 text-center mt-4 text-lg">
                        Hãy kết nối với chúng tôi để biết thêm thông tin
                    </p>
                </div>
            </div>

            <!-- Contact section -->
            <div class="container mx-auto px-4 py-16 max-w-5xl">
                <div class="grid grid-cols-1 gap-10">
                    <!-- Contact information -->
                    <div class="bg-white rounded-xl shadow-lg p-8 border border-gray-100">
                        <h2 class="text-2xl font-semibold text-gray-800 mb-8 pb-4 border-b border-gray-100">Thông Tin Liên Hệ</h2>

                        <div class="space-y-6">
                            <!-- Email -->
                            <div class="flex items-start hover:bg-blue-50 p-3 rounded-lg transition-colors duration-200">
                                <div class="flex-shrink-0 mt-1 bg-blue-100 p-3 rounded-full">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        class="h-6 w-6 text-blue-600"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                            stroke-width="2"
                                            d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                                        />
                                    </svg>
                                </div>
                                <div class="ml-4">
                                    <h3 class="text-lg font-medium text-gray-800">Email</h3>
                                    <p class="text-blue-600 font-medium mt-1">{{ contactInfo.email_NS || 'Đang tải...' }}</p>
                                </div>
                            </div>

                            <!-- Phone -->
                            <div class="flex items-start hover:bg-blue-50 p-3 rounded-lg transition-colors duration-200">
                                <div class="flex-shrink-0 mt-1 bg-blue-100 p-3 rounded-full">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        class="h-6 w-6 text-blue-600"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                            stroke-width="2"
                                            d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                                        />
                                    </svg>
                                </div>
                                <div class="ml-4">
                                    <h3 class="text-lg font-medium text-gray-800">Số Điện Thoại</h3>
                                    <p class="text-blue-600 font-medium mt-1">{{ contactInfo.sdt_NS || 'Đang tải...' }}</p>
                                </div>
                            </div>

                            <!-- Address -->
                            <div class="flex items-start hover:bg-blue-50 p-3 rounded-lg transition-colors duration-200">
                                <div class="flex-shrink-0 mt-1 bg-blue-100 p-3 rounded-full">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        class="h-6 w-6 text-blue-600"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                            stroke-width="2"
                                            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                                        />
                                        <path
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                            stroke-width="2"
                                            d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                                        />
                                    </svg>
                                </div>
                                <div class="ml-4">
                                    <h3 class="text-lg font-medium text-gray-800">Địa Chỉ</h3>
                                    <p class="text-gray-600 mt-1">{{ contactInfo.diaChi_NS || 'Đang tải...' }}</p>
                                </div>
                            </div>
                        </div>

                        <!-- Introduction -->
                        <div class="mt-10 bg-blue-50 p-6 rounded-lg border border-blue-100">
                            <h3 class="text-lg font-medium text-gray-800 mb-3">Giới Thiệu</h3>
                            <p class="text-gray-600 leading-relaxed">{{ contactInfo.gioiThieu_NS || 'Đang tải thông tin...' }}</p>
                        </div>
                    </div>
                </div>
            </div>

            <div class="bg-gray-100 py-16">
                <div class="container mx-auto px-4 max-w-4xl">
                    <h2 class="text-2xl font-semibold text-gray-800 text-center mb-10">
                        Vị Trí Của Chúng Tôi
                    </h2>

                    <div class="bg-white rounded-xl shadow-lg overflow-hidden">
                        <div class="grid grid-cols-1 md:grid-cols-3">
                            <div class="bg-gradient-to-br from-blue-600 to-blue-400 flex items-center justify-center p-6">
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-32 w-32 text-white opacity-80" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                            </div>
                            
                            <div class="col-span-2 p-8">
                                <h3 class="text-xl font-medium text-gray-800 mb-4">Địa Chỉ Chi Tiết</h3>
                                
                                <div class="space-y-4">
                                    <div v-if="contactInfo.diaChi_NS">
                                        <div class="flex flex-col space-y-2">
                                            <span class="text-gray-500">Địa chỉ đầy đủ:</span>
                                            <span class="text-lg font-medium text-gray-800">{{ contactInfo.diaChi_NS }}</span>
                                        </div>
                                        
                                        <div class="mt-6 flex space-x-4">
                                            <div class="bg-blue-100 text-blue-800 px-4 py-2 rounded-lg font-medium">
                                                Hướng Dẫn Đường Đi
                                            </div>
                                            <div class="bg-gray-100 text-gray-800 px-4 py-2 rounded-lg font-medium">
                                                Thời Gian Mở Cửa: 8:00 - 22:00
                                            </div>
                                        </div>
                                    </div>
                                    <div v-else class="text-gray-500">Đang tải thông tin địa chỉ...</div>
                                </div>
                                
                                <div class="mt-6 text-gray-600">
                                    <p>Nếu bạn cần hỗ trợ tìm đường, vui lòng liên hệ với chúng tôi qua số điện thoại.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div class="mt-8 bg-white rounded-xl shadow-lg p-6">
                        <h3 class="text-xl font-medium text-gray-800 mb-4">Giờ Làm Việc</h3>
                        <div class="grid grid-cols-2 gap-4">
                            <div class="border-r border-gray-100 pr-4">
                                <p class="text-gray-600">Thứ Hai - Thứ Sáu:</p>
                                <p class="font-medium text-gray-800">8:00 - 20:00</p>
                            </div>
                            <div class="pl-4">
                                <p class="text-gray-600">Thứ Bảy - Chủ Nhật:</p>
                                <p class="font-medium text-gray-800">9:00 - 18:00</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </NuxtLayout>
</template>

<script setup>
import { ref, reactive } from "vue";

const { $api } = useNuxtApp();

const contactInfo = reactive({
    email_NS: "",
    sdt_NS: "",
    diaChi_NS: "",
    gioiThieu_NS: "",
});

const getBookStoreInformation = async () => {
    try {
        const response = (await $api.get("/admin/information")).data.data;
        contactInfo.email_NS = response.email_NS;
        contactInfo.sdt_NS = response.sdt_NS;
        contactInfo.diaChi_NS = response.diaChi_NS;
        contactInfo.gioiThieu_NS = response.gioiThieu_NS;
    } catch (error) {
        console.error("Error fetching bookstore information:", error);
    }
};

onMounted(() => {
    getBookStoreInformation();
});
</script>