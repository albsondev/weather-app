<template>
  <div>
    <h1>Aqui é a tela de detalhes:</h1>
    <v-btn @click="$router.back()">Back</v-btn>
    <apexchart type="line" :options="chartOptions" :series="series"></apexchart>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import axios from "axios";
import VueApexCharts from "vue-apexcharts";

interface WeatherItem {
  date: string;
  temp: number;
}

interface Series {
  name: string;
  data: number[];
}

interface XAxis {
  categories: string[];
}

interface ChartOptions {
  chart: {
    id: string;
  };
  xaxis: XAxis;
}

export default Vue.extend({
  name: "WeatherDetails",
  components: {
    apexchart: VueApexCharts,
  },
  data(): { series: Series[]; chartOptions: ChartOptions } {
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
      const API_KEY = "9be05ca505af6cc5e1c637e92b89d0fe";
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric&lang=pt_br`
      );
      const data: WeatherItem[] = response.data.list
        .slice(0, 5)
        .map((item: any) => ({
          date: item.dt_txt,
          temp: item.main.temp,
        }));

      this.series = [
        {
          name: "Temperature",
          data: data.map((item: WeatherItem) => item.temp),
        },
      ];

      this.chartOptions.xaxis.categories = data.map(
        (item: WeatherItem) => item.date
      );
    },
  },
});
</script>
