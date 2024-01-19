<template>
<div class="relative overflow-x-auto shadow-md sm:rounded-lg">
    <div v-if="store.length < 1" class="text-2xl center_item">Empty... Try to click get current bitcoin value button above</div>
    <table v-else class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <BitcoinPriceHistoryHeader />
        <tbody>
            <tr class="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700"
                v-for="row in store" :key="row.id"
            >
                <BitcoinPriceHistoryItem :data="row" />
            </tr>
        </tbody>
    </table>
</div>
</template>

<script setup>

const store = ref([
    // Example data:
    // { id: 1, datetime: '18.01.2024 17:11:01', price: 42568.5862488 },
]);

defineExpose({updateStore});

await updateStore();

async function updateStore() 
{
    const { data, pending, error, refresh } = await useFetch("/api/getBitcoinHistoryPrice");

    if (!data.value || data.value.length < 1) {
        return;
    }

    store.value = [];

    let rows = data.value;
    rows.forEach(row => {
        store.value.push({
            id: row.id,
            datetime: formatDateTime(row.bph_date_time),
            price: row.bph_value
        });
    });
}

function formatDateTime(datetime)
{
    if (!datetime) {
        return '';
    }

    datetime = new Date(datetime);
    if (!datetime) {
        return '';
    }

    return datetime.toLocaleString();
}

</script>

<style scoped>
.center_item {
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
}
</style>