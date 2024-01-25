<template>
  <div class="h-full">
    <Bar :data="chartData" :options="chartOptions" />
  </div>
</template>

<script setup>
import { Bar } from 'vue-chartjs';

// WARNING: This component requires chartData object as prop. It won't work without it!
// const chartData = ref({
//   labels: ['label_1', 'label_2'],
//   datasets: [
//     {
//       label: 'Example',
//       backgroundColor: '#f87979',
//       data: [0, 100],
//     },
//   ],
// });

// WARNING: This component requires chartOptions object as prop. It won't work without it!
// const chartOptions = ref({
//   responsive: true,
//   scales: {
//     y: {
//       min: 41000,
//       max: 42500,
//     },
//   },
// });

const item = defineProps({
  chartData: Object,
  chartOptions: Object
});


</script>
