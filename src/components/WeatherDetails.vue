<template>
  <div>
    <h1>Aqui é a tela de detalhes:</h1>
    <v-btn @click="$router.back()">Back</v-btn>
    <apexchart :options="chartOptions" :series="series" type="line"></apexchart>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import axios, { AxiosResponse } from "axios";
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

interface WeatherResponse {
  coord: {
    lat: number;
    lon: number;
  };
}

interface ForecastItem {
  dt: number;
  main: {
    temp: number;
  };
}

export default Vue.extend({
  name: "WeatherDetails",
  components: {
    apexchart: VueApexCharts
  },
  data(): { series: Series[]; chartOptions: ChartOptions } {
    return {
      series: [],
      chartOptions: {
        chart: {
          id: "temp-chart"
        },
        xaxis: {
          categories: []
        }
      }
    };
  },
  async created() {
    await this.fetchWeatherHistory();
  },
  methods: {
    async fetchWeatherHistory() {
      try {
        const city = this.$route.params.name;
        const API_KEY = "9be05ca505af6cc5e1c637e92b89d0fe";

        // Obter latitude e longitude da cidade
        const locationResponse: AxiosResponse<WeatherResponse> = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric&lang=pt_br`
        );
        const { coord } = locationResponse.data;

        // Obter previsão para os próximos 5 dias em intervalos de 3 horas
        const forecastResponse: AxiosResponse<{ list: ForecastItem[] }> = await axios.get(
          `https://api.openweathermap.org/data/2.5/forecast?lat=${coord.lat}&lon=${coord.lon}&appid=${API_KEY}&units=metric&lang=pt_br`
        );

        // Processar dados para obter temperaturas médias diárias
        const forecastList: ForecastItem[] = forecastResponse.data.list;
        const data: WeatherItem[] = [];
        const dates: Set<string> = new Set();

        forecastList.forEach((item: ForecastItem) => {
          const date = new Date(item.dt * 1000).toLocaleDateString();
          if (!dates.has(date)) {
            data.push({ date, temp: item.main.temp });
            dates.add(date);
          }
        });

        this.series = [
          {
            name: "Temperature",
            data: data.map((item: WeatherItem) => item.temp)
          }
        ];

        this.chartOptions.xaxis.categories = data.map(
          (item: WeatherItem) => item.date
        );
      } catch (error) {
        console.error("Error fetching weather data:", error);
      }
    }
  }
});
</script>
