<template>
    <div class="h-screen flex flex-col relative w-full">
        <!-- Header -->
        <Header />

        <div class="flex flex-1 h-full pt-14">
            <!-- Sidebar -->
            <aside class="w-fit text-white z-10 shadow-xl overflow-y-auto scrollbar-gutter-stable">
                <slot name="sidebar"> </slot>
            </aside>

            <!-- Main Content   -->
            <main class="flex-1 bg-zinc-100 overflow-auto scrollbar-gutter-stable">
                <div class="w-fit h-full mx-auto">
                    <div class="w-full h-fit p-6 min-w-5xl max-w-7xl">
                        <slot />
                    </div>
                </div>
            </main>
        </div>
    </div>
</template>

<script setup>
import Header from "@/components/header.vue";
</script>
<style>
.scrollbar-gutter-stable {
    scrollbar-gutter: stable;
}

::-webkit-scrollbar {
    width: 7px;
    height: 7px;
}

/* Track scrollbar */
::-webkit-scrollbar-track {
    background: transparent;
    border-radius: 10px;
}

::-webkit-scrollbar-thumb {
    background: #d4d4d8;
    border-radius: 10px;
}

::-webkit-scrollbar-thumb:hover {
    background: #9f9fa9;
}
</style>
