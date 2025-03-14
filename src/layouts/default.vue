<template>
    <div class="h-screen flex flex-col relative w-full bg-white">
        <!-- Header -->
        <Header />

        <div class="flex flex-1 h-full pt-14">
            <!-- Sidebar -->
            <aside class="w-fit text-white z-10 shadow-lg overflow-y-auto scrollbar-gutter-stable">
                <Sidebar />
            </aside>

            <!-- Main Content   -->
            <main class="flex-1 bg-zinc-200/60 overflow-auto scrollbar-gutter-stable">
                <slot />
            </main>
        </div>
    </div>
</template>

<script setup></script>
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
