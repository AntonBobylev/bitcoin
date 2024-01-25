<template>
  <div>
    <div v-if="!currentBitcoinRate" class="italic text-2xl mb-4">
      Empty, try to click a button below
    </div>
    <div v-else class="text-3xl mb-4">${{ currentBitcoinRate }}</div>
    <div>
      <button :class="currentButtonClass" @click="onGetCurrentBitcoinValue">
        Get current bitcoin value
      </button>
    </div>
  </div>
</template>

<script setup>
const normalButtonClass = 'btn font-bold';
const emptyBitcoinButtonClass =
  normalButtonClass + ' button-empty-bitcoin-value';

var currentBitcoinRate = ref(false);
var currentButtonClass = emptyBitcoinButtonClass;

const emit = defineEmits(['historyTableShouldBeUpdated']);

async function onGetCurrentBitcoinValue() 
{
  const { data, pending, error, refresh } = await useFetch(
    '/api/getBitcoinCurrentPrice'
  );

  currentBitcoinRate.value = data.value;
  currentButtonClass = normalButtonClass;

  await rememberBitcoinValue(currentBitcoinRate.value);
  emit('historyTableShouldBeUpdated');
}

async function rememberBitcoinValue(value) 
{
  await useFetch('/api/rememberBitcoinCurrentPrice', {
    query: { bitcoin_value: value }
  });
}
</script>

<style scoped>
.btn {
  border: 4px solid transparent;
}
.button-empty-bitcoin-value {
  border: 4px solid transparent;
  --angle: 0deg;
  border-image: linear-gradient(var(--angle), #000, rgb(255, 72, 0)) 1;
  animation: 1s rotate linear infinite;
}
@keyframes rotate {
  to {
    --angle: 360deg;
  }
}
@property --angle {
  syntax: '<angle>';
  initial-value: 0deg;
  inherits: false;
}
</style>
