<template>
    <div class="w-full min-h-14 h-14 bg-white shadow-sm flex z-20 fixed">
        <div class="w-48 min-w-48 mt-3 mb-2 m-auto">
            <NuxtLink to="/">
                <img src="/logo2.png" alt="" class="w-full h-full object-contain" />
            </NuxtLink>
        </div>
        <div class="mt-3 mb-2 m-auto">
            <NuxtLink to="/categories">
                <img src="/menu1.png" alt="" class="w-full h-full object-contain" />
            </NuxtLink>
        </div>
        <div class="flex-1 flex items-center justify-between">
            <div class="flex flex-1 items-center whitespace-nowrap">
                <NuxtLink
                    class="pl-4 text-zinc-400 hover:text-zinc-500 cursor-pointer text-base"
                    to="/"
                    >Trang chủ</NuxtLink
                >
                <div v-for="(item, index) in breadcrumb" :key="index">
                    <span class="mx-2 text-zinc-400"> > </span>
                    <NuxtLink
                        :to="item.path"
                        :class="[
                            item.current ? 'text-zinc-900' : 'text-zinc-400 hover:text-zinc-500',
                            'cursor-pointer text-base',
                        ]"
                    >
                        {{ item.name }}
                    </NuxtLink>
                </div>
            </div>
            <!-- Search Form -->
            <div class="h-full w-fit relative ml-5 mt-4">
                <div class="relative hidden md:block">
                    <SearchBar />
                </div>
            </div>
            <!-- Thêm nút giỏ hàng ở đây -->
            <div class="h-full w-fit relative ml-5">
                <NuxtLink to="/cart" class="flex items-center">
                    <div
                        class="absolute -left-1 top-1/2 -translate-y-1/2 h-1/2 w-[1px] bg-zinc-300"
                    ></div>

                    <img
                        class="pt-4 pl-2 w-10 h-10 object-contain cursor-pointer"
                        src="/shopping-cart.png"
                        alt=""
                    />
                </NuxtLink>
            </div>
            <div class="h-full w-fit relative ml-5">
                <div
                    class="absolute -left-1 top-1/2 -translate-y-1/2 h-1/2 w-[1px] bg-zinc-300"
                ></div>
                <LogoutButton />
            </div>
        </div>
    </div>
</template>

<script setup>
import { useRoute } from "vue-router";
import { computed } from "vue";

const route = useRoute();
const breadcrumb = computed(() => {
    if (route.path.includes("/address")) {
        return [{ name: "Thông tin địa chỉ", path: route.path, current: true }];
    }
    if (route.path.includes("/bill")) {
        return [{ name: "Lịch sử hóa đơn", path: route.path, current: true }];
    }
    if (route.path.includes("/bookStore/")) {
        return [{ name: "Thông tin liên hệ", path: "/bookStore", current: true }];
    }
    if (route.path.includes("/cart")) {
        return [{ name: "Giỏ hàng", path: "/cart", current: true }];
    }
    if (route.path.includes("/category/")) {
        return [{ name: "Tìm kiếm ngành hàng", path: "/category", current: true }];
    }
    if (route.path.includes("/search/")) {
        return [{ name: "Tìm kiếm sản phẩm", path: "/search", current: true }];
    }
    if (route.path.includes("userinformation/change-password/")) {
        return [
            { name: "Thông tin người dùng", path: "/userinformation" },
            { name: "Đổi mật khẩu", path: "userinformation/change-password", current: true },
        ];
    } else if (route.path.includes("/userinformation/")) {
        return [{ name: "Thông tin người dùng", path: "/userinformation", current: true }];
    }
    return [];
});
</script>
