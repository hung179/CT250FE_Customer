<template>
    <div class="h-screen flex flex-col">
        <!-- Header -->
        <Header />

        <div class="flex flex-1">
            <!-- Sidebar -->
            <aside class="w-48 text-white">
                <slot name="sidebar">
                    <Sidebar />
                </slot>
            </aside>

            <!-- Main Content   -->
            <main class="flex-1 py-6 px-8 bg-zinc-100">
                <slot />
            </main>
        </div>
    </div>
</template>

<script setup>
import Header from "@/components/header.vue";
import Sidebar from "@/components/sidebar.vue";
</script>
