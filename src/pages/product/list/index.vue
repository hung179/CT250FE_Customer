<template></template>
<script setup>
import { navigateTo } from "#app";

onMounted(() => {
  navigateTo("/product/list/all", { replace: true });
});
</script>
