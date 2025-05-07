<template>
    <nav class=" sidebar w-48 min-w-48 bg-white h-full py-2" style="height: calc(100vh - 56px)">
        <ul>
            <li>
                <div class="w-full h-fit font-medium text-zinc-500 p-2">Hóa đơn</div>
                <NuxtLink to="/bill/">
                    <button
                        @click="active = 1"
                        class="text-left cursor-pointer py-1 text-sm font-normal w-full h-fit pl-5"
                        :class="
                            active === 1
                                ? 'text-emerald-400 font-semibold'
                                : 'text-zinc-400 hover:text-emerald-400'
                        "
                    >
                    Theo dõi hóa đơn
                </button>
                </NuxtLink>
            </li>
            <li>
                <div class="w-full h-fit font-medium text-zinc-500 p-2">Quản lý tài khoản</div>
                <NuxtLink to="/userinformation/">
                    <button
                        @click="active = 2"
                        class="text-left cursor-pointer py-1 text-sm font-normal w-full h-fit pl-5"
                        :class="
                            active === 2
                                ? 'text-emerald-400 font-semibold'
                                : 'text-zinc-400 hover:text-emerald-400'
                        "
                    >
                        Thông tin cá nhân
                    </button>
                </NuxtLink>
                <NuxtLink to="/address/">
                    <button
                        @click="active = 3"
                        class="text-left cursor-pointer py-1 text-sm font-normal w-full h-fit pl-5"
                        :class="
                            active === 3
                                ? 'text-emerald-400 font-semibold'
                                : 'text-zinc-400 hover:text-emerald-400'
                        "
                    >
                        Thông tin nhận hàng
                    </button>
                </NuxtLink>
            </li>
            <li>
                <div class="w-full h-fit font-medium text-zinc-500 p-2">
                    Thông tin về nhà sách</div>
                <NuxtLink to="/BookStoreInformation/">
                    <button
                        @click="active = 4"
                        class="text-left cursor-pointer py-1 text-sm font-normal w-full h-fit pl-5"
                        :class="
                            active === 4
                                ? 'text-emerald-400 font-semibold'
                                : 'text-zinc-400 hover:text-emerald-400'
                        "
                    >
                    Thông tin nhà sách
                </button>
                </NuxtLink>
            </li>
        </ul>
    </nav>
</template>

<script setup>
const active = ref(0);
</script>
<style>
.sidebar::-webkit-scrollbar {
    width: 7px;
    height: 7px;
}

.sidebar::-webkit-scrollbar-track {
    background: transparent;
    border-radius: 10px;
}

.sidebar::-webkit-scrollbar-thumb {
    background: transparent;
    border-radius: 10px;
}

.sidebar:hover::-webkit-scrollbar-thumb {
    background: #d4d4d8;
}

.sidebar:hover::-webkit-scrollbar-thumb:hover {
    background: #9f9fa9;
}
</style>
