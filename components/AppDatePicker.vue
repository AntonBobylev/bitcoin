<template>
    <vue-date-picker v-model="date"/>
</template>

<script>
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css';

export default {
  components: { VueDatePicker },
  data() {
    return {
      date: null,
    };
  }
}
</script>

<style>
.dp__theme_light {
    --dp-hover-color: #b6b6b6;
    --dp-primary-color: #12b488;
}
</style>
