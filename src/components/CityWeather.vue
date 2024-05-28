<template>
  <v-card class="cards-list">
    <v-card-title class="card-list-title" :class="weatherClass">
      <div class="card-list-name-city">
        {{ city.name }}
      </div>
      <div class="info-weather">
        <div>
          <v-icon>mdi-weather-cloudy</v-icon>
        </div>
        <div>
          {{ weather?.weather[0]?.description || "Not available yet" }}
        </div>
      </div>
    </v-card-title>
    <v-divider :thickness="4"></v-divider>
    <v-card-subtitle class="card-list-subtitle">
      <div class="icon-cards-list">
        <div class="info-text-cards">
          <v-icon>mdi-thermometer</v-icon>
          <span>min:</span>
        </div>
        <div class="text-center font-weight-bold">
          {{ weather?.main?.temp_min || "Not available yet" }} °C
        </div>
      </div>
      <v-divider vertical></v-divider>
      <div class="icon-cards-list">
        <div class="info-text-cards">
          <v-icon>mdi-thermometer</v-icon>
          <span>max:</span>
        </div>
        <div class="text-center font-weight-bold">
          {{ weather?.main?.temp_max || "Not available yet" }} °C
        </div>
      </div>
      <v-divider vertical></v-divider>
      <div class="icon-cards-list">
        <div class="info-text-cards">
          <v-icon>mdi-water-percent</v-icon>
          <span>Humidity</span>
        </div>
        <div class="text-center font-weight-bold">
          {{ weather?.main?.humidity || "Not available yet" }} %
        </div>
      </div>
    </v-card-subtitle>
    <v-divider></v-divider>
    <v-card-text class="temp-main text-center">
      {{ weather?.main?.temp?.toFixed(0) || "Not available yet" }} °C
    </v-card-text>
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
  props: {
    city: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      weather: null as Weather | null
    };
  },
  computed: {
    weatherClass(): string {
      const description = this.weather?.weather[0]?.description;
      if (!description) {
        return "";
      }
      return this.normalizeClass(description);
    }
  },
  methods: {
    async fetchWeather() {
      const API_KEY = "9be05ca505af6cc5e1c637e92b89d0fe";
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${this.city.name}&appid=${API_KEY}&units=metric&lang=pt_br`;
      try {
        const response = await axios.get(url);
        this.weather = response.data;
        console.log("Weather data", this.weather);
      } catch (error) {
        console.error("Error fetching weather data", error);
      }
    },
    normalizeClass(description: string): string {
      return description
        .normalize('NFD') // Normalize to decomposed form
        .replace(/[\u0300-\u036f]/g, '') // Remove diacritics
        .replace(/\s+/g, '-') // Replace spaces with hyphens
        .toLowerCase(); // Convert to lowercase
    }
  },
  created() {
    this.fetchWeather();
  }
});
</script>
