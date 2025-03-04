<template>
    <nav class="sidebar w-full bg-white overflow-y-auto py-2" style="height: calc(100vh - 56px)">
        <ul>
            <li>
                <NuxtLink to="/product/list/all"
                    ><NavButton class="w-full h-fit">Quản lý sản phẩm</NavButton>
                </NuxtLink>
            </li>
        </ul>
    </nav>
</template>

<script setup>
import NavButton from "~/components/navButton.vue";
</script>
<style>
.sidebar::-webkit-scrollbar {
    width: 7px;
}

/* Track scrollbar */
.sidebar::-webkit-scrollbar-track {
    background: transparent;
    border-radius: 10px;
}

.sidebar::-webkit-scrollbar-thumb {
    background: transparent;
    border-radius: 10px;
}

.sidebar:hover::-webkit-scrollbar-thumb {
    background: var(--color-gray);
}

.sidebar:hover::-webkit-scrollbar-thumb:hover {
    background: var(--color-dark-gray);
}
</style>
