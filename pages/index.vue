<template>
  <div class="grid grid-rows-3 grid-flow-col gap-4 mb-5 card">
    <div
      class="center_item row-span-3 text-4xl green-color font-bold font-mono"
    >
      BITCOIN
      <br />
      CURRENCY
    </div>
    <div class="center_item row-span-3 col-span-2">
      <BitcoinCurrentPrice
        @history-table-should-be-updated="historyTableShouldBeUpdated"
      />
    </div>
  </div>

  <div class="card">
    <div class="center_item mb-4 font-bold text-3xl">Bitcoin price history</div>
    <BitcoinPriceHistoryTable ref="bitcoinPriceHistoryTable" />
  </div>
</template>

<script setup>
const bitcoinPriceHistoryTable = ref();

function historyTableShouldBeUpdated() {
  bitcoinPriceHistoryTable.value.updateStore();
}
</script>

<style>
.center_item {
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
}

.green-color {
  color: #12b488;
}
</style>