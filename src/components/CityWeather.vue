<template>
  <v-card :class="'cards-list ' + weatherClass">
    <v-card-title class="card-list-title" :class="weatherClass">
      <div class="card-list-name-city">{{ city.name }}</div>
    </v-card-title>
    <v-divider :thickness="4"></v-divider>
    <v-card-subtitle class="card-list-subtitle">
      <WeatherInfo icon="mdi-thermometer" label="min:" :value="minTemp" />
      <v-divider vertical></v-divider>
      <WeatherInfo icon="mdi-thermometer" label="max:" :value="maxTemp" />
    </v-card-subtitle>
    <v-divider></v-divider>
    <div class="info-weather">
      <v-chip :class="'chips-subtitle ' + weatherClass">
        {{ weatherDescription }}
      </v-chip>
    </div>
    <v-card-text class="temp-main text-center" :class="weatherClass">{{ mainTemp }} °C</v-card-text>
    <v-divider></v-divider>
    <v-card-actions>
      <v-btn @click="$emit('remove', city.name)">Remove</v-btn>
      <v-btn @click="$emit('details', city.name)">Details</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script lang="ts">
import Vue from "vue";
import axios from "axios";
import WeatherInfo from "@/components/WeatherInfo.vue"; // Assumindo que você crie este componente.

interface Weather {
  main: {
    temp?: number;
    temp_min?: number;
    temp_max?: number;
    humidity?: number;
  };
  weather: {
    description?: string;
    main?: string;
  }[];
}

export default Vue.extend({
  name: "CityWeather",
  components: { WeatherInfo },
  props: {
    city: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      weather: null as Weather | null,
    };
  },
  computed: {
    weatherClass(): string {
      return this.normalizeClass(this.weatherDescription);
    },
    weatherDescription(): string {
      return this.weather?.weather[0]?.description || "Not available yet";
    },
    minTemp(): string {
      return this.weather?.main?.temp_min?.toString() || "Not available yet";
    },
    maxTemp(): string {
      return this.weather?.main?.temp_max?.toString() || "Not available yet";
    },
    humidity(): string {
      return this.weather?.main?.humidity?.toString() || "Not available yet";
    },
    mainTemp(): string {
      return this.weather?.main?.temp?.toFixed(0) || "Not available yet";
    },
  },
  methods: {
    async fetchWeather() {
      const API_KEY = "9be05ca505af6cc5e1c637e92b89d0fe";
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${this.city.name}&appid=${API_KEY}&units=metric&lang=pt_br`;
      try {
        const response = await axios.get(url);
        this.weather = response.data;
      } catch (error) {
        console.error("Error fetching weather data", error);
      }
    },
    normalizeClass(description: string): string {
      return description
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/\s+/g, '-')
        .toLowerCase();
    },
  },
  created() {
    this.fetchWeather();
  },
});
</script>
