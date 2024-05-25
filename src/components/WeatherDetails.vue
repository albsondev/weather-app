<template>
  <div>
    <v-btn @click="$router.back()">Back</v-btn>
    <apexchart type="line" :options="chartOptions" :series="series"></apexchart>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import axios from "axios";
import VueApexCharts from "vue-apexcharts";

export default Vue.extend({
  name: "WeatherDetails",
  components: {
    apexchart: VueApexCharts,
  },
  data() {
    return {
      series: [],
      chartOptions: {
        chart: {
          id: "temp-chart",
        },
        xaxis: {
          categories: [],
        },
      },
    };
  },
  async created() {
    await this.fetchWeatherHistory();
  },
  methods: {
    async fetchWeatherHistory() {
      const city = this.$route.params.city;
      const API_KEY = "YOUR_API_KEY";
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric`
      );
      const data = response.data.list.slice(0, 5).map((item) => ({
        date: item.dt_txt,
        temp: item.main.temp,
      }));

      this.series = [
        {
          name: "Temperature",
          data: data.map((item) => item.temp),
        },
      ];

      this.chartOptions.xaxis.categories = data.map((item) => item.date);
    },
  },
});
</script>
