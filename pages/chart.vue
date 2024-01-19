<template>
  
  <div class="container card">
    <div v-if="chartData.datasets[0].data.length < 1"
      class="mt-6 text-4xl italic"
      style="text-align: center;"
    >
    Empty, try to get the current price 
      <NuxtLink to="/" class="green-color">here</NuxtLink>
    </div>

    <div v-else>
      <AppDatePicker
        placeholder="You can select a single date or range of dates here to affect the chart below"
        range
        model-auto
        :max-date="datePickerMaxDate"
        :min-date="datePickerMinDate"
        :enable-time-picker="false"
        v-model="currentDatePickerDate"
        @update:model-value="onDatePickerUpdate"
      />

      <AppChart :chartData="chartData" :chartOptions="chartOptions" />
    </div>
  </div>
</template>

<script setup>
const chartData = ref({
  labels: ["blank"],
  datasets: [
    {
      label: "blank",
      backgroundColor: "#f87979",
      data: [],
    },
  ],
});

const chartOptions = ref({
  responsive: true,
  scales: await getChartScales(),
});

const MIN_DATE = new Date(await getBitcoinMinSavedDate());
const MAX_DATE = new Date();

const datePickerMinDate = ref(MIN_DATE);
const datePickerMaxDate = ref(MAX_DATE);

const currentDatePickerDate = ref();

const chartYAxisOffset = 100;

updateChart();

/**
 * Updating main chart
 * 
 * @param {Date=} fromDate Minimal data for search // todo: rename to 'from'
 * @param {Date=} toDate 
 */
async function updateChart(fromDate = null, toDate = null) {
  let params = { sorting: "asc" };

  if (fromDate) {
    params.fromDate = fromDate;
  }

  if (toDate) {
    params.toDate = toDate;
  }

  const { data, pending, error, refresh } = await useFetch(
    "/api/getBitcoinHistoryPrice",
    { params: params }
  );

  if (!data.value || data.value.length < 1) {
    return;
  }

  let labels = [],
      values = [];

  data.value.forEach((row) => {
    labels.push(formatDateTime(row.bph_date_time));
    values.push(row.bph_value);
  });

  chartData.value = {
    labels: labels,
    datasets: [
      {
        label: "Bitcoin historical data",
        backgroundColor: "#12b488",
        data: values,
      },
    ],
  };
}

/**
 * Getting chart scales using getBitcoinMinMaxSavedPrice API method
 * Applying a chartYAxisOffset constant to Y axis for pretty chart printing
 */
async function getChartScales() {
  const { data, pending, error, refresh } = await useFetch(
    "/api/getBitcoinMinMaxSavedPrice"
  );

  if (!data.value || data.value.length < 1) {
    return;
  }

  return {
    y: {
      min: Number(data.value.min_price) - chartYAxisOffset, // $ 
      max: Number(data.value.max_price) + chartYAxisOffset, // $ 
    },
  };
}

/**
 * Getting bitcoin a minimum saved date using getBitcoinMinSavedDate API method
 */
async function getBitcoinMinSavedDate() {
  const { data, pending, error, refresh } = await useFetch(
    "/api/getBitcoinMinSavedDate"
  );

  if (!data.value || data.value.length < 1) {
    return;
  }

  return new Date(data.value);
}

/********************************EVENTS****************************************/

/**
 * @param {(Date|[])} value Date picker value
 */
function onDatePickerUpdate(value)
{
  if (!value) { // picker cleared
    updateChart();

    return;
  }

  // WARNING: it will return true for invalid dates too,
  // e.g. new Date('random_string') is also instance of Date
  // TODO: fix required
  if (value instanceof Date) {
    updateChart(Date.parse(value));

    return;
  }

  // range selected
  updateChart(Date.parse(value[0]), Date.parse(value[1]));
}

/********************************UTILS*****************************************/

/**
 * Format passed datetime string value to locale string
 * @param {string} datetime
 */
function formatDateTime(datetime)
{
  if (!datetime) {
    return "";
  }

  datetime = new Date(datetime);
  if (!datetime) {
    return "";
  }

  return datetime.toLocaleString();
}

/********************************META******************************************/
useSeoMeta({
  title: 'Anton Bobylev | Bitcoin Price Chart',
  description: 'Bitcoin Price Chart',
  ogDescription: 'Bitcoin Price Chart - a page that shows a graph of price changes for the cryptocurrency - Bitcoin',
})
</script>

<style scoped>
.container {
  height: 85vh;
}
.green-color {
  color: #12b488;
}
</style>