<template>
    <footer class="bg-gray-800 text-gray-200 py-8">
        <div class="container mx-auto px-4">
            <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
                <div>
                    <h3 class="text-xl font-bold mb-4">B'Nok</h3>
                    <p class="mb-4">
                        Mang đến cho bạn những sản phẩm chất lượng với giá cả hợp lý.
                    </p>
                    <div class="flex space-x-4">
                        <a href="#" class="text-gray-200 hover:text-blue-400"
                            ><i class="fab fa-facebook-f"></i
                        ></a>
                        <a href="#" class="text-gray-200 hover:text-blue-400"
                            ><i class="fab fa-twitter"></i
                        ></a>
                        <a href="#" class="text-gray-200 hover:text-blue-400"
                            ><i class="fab fa-instagram"></i
                        ></a>
                    </div>
                </div>

                <div>
                    <h3 class="text-lg font-semibold mb-4">Thông tin</h3>
                    <ul class="space-y-2">
                        <li>
                            <NuxtLink to="/bookStoreInformation">
                                <a href="#" class="hover:text-blue-400">Về chúng tôi và thông tin liên hệ</a>

                            </NuxtLink>

                        </li>
                        
                    </ul>
                </div>

                <div>
                    <h3 class="text-lg font-semibold mb-4">Tài khoản</h3>
                    <ul class="space-y-2">

                        <li><NuxtLink to="/userinformation">
                            <a href="#" class="hover:text-blue-400">Thông tin cá nhân</a>
                        </NuxtLink>
                    </li>
                        <li>
                            <NuxtLink to="/address">
                                
                                <a href="address" class="hover:text-blue-400">Thông tin nhận hàng</a>
                            </NuxtLink>
                        </li>
                        <li>
                            <NuxtLink to="/cart">

                                <a href="#" class="hover:text-blue-400">Giỏ hàng</a>
                            </NuxtLink>
                        </li>
                        <li>
                            <NuxtLink to="/bill">

                                <a href="#" class="hover:text-blue-400">Lịch sử đơn hàng</a>
                            </NuxtLink>

                        </li>
                    </ul>
                </div>

                <div>
                    <h3 class="text-lg font-semibold mb-4">Liên hệ</h3>
                    <ul class="space-y-2">
                        <li>
                        <i class="fas fa-map-marker-alt mr-2"></i> 
                        Địa chỉ: {{ contactInfo.diaChi_NS }}
                        </li>
                        <li><i class="fas fa-phone mr-2"></i>
                         Số điện thoại: {{ contactInfo.sdt_NS }}
                        </li>
                        <li><i class="fas fa-envelope mr-2"></i> 
                        Email: {{ contactInfo.email_NS }}
                        </li>
                    </ul>
                </div>
            </div>

            <div class="border-t border-gray-700 mt-8 pt-6 text-center">
                <p>&copy; 2025 B'Nok. Tất cả quyền được bảo lưu.</p>
            </div>
        </div>
    </footer>
</template>

<script setup>  
const { $api } = useNuxtApp();

const contactInfo = reactive({
    email_NS: "",
    sdt_NS: "",
    diaChi_NS: "",
});

const getBookStoreInformation = async () => {
    try {
        const response = (await $api.get("/admin/information")).data.data;
        contactInfo.email_NS = response.email_NS;
        contactInfo.sdt_NS = response.sdt_NS;
        contactInfo.diaChi_NS = response.diaChi_NS;
    } catch (error) {
        console.error("Error fetching bookstore information:", error);
    }
};

onMounted(() => {
    getBookStoreInformation();
});
</script>