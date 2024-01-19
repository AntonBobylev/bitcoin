<template>
<th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
    {{data.datetime}}
</th>
<td class="px-6 py-4 dark:text-white">
    ${{data.price}}
</td>
</template>

<script setup>
defineProps({
    data: Object
});

</script>

<style scoped>

</style>