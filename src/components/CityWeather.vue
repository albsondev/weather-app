<template>
  <v-card>
    <v-card-title>{{ city.name }}</v-card-title>
    <v-card-text>
      <div>Temperature: {{ weather.main.temp }} °C</div>
      <div>Humidity: {{ weather.main.humidity }}%</div>
    </v-card-text>
    <v-card-actions>
      <v-btn @click="$emit('remove', city.name)">Remove</v-btn>
      <v-btn @click="$emit('details', city.name)">Details</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script lang="ts">
import Vue from "vue";
import axios from "axios";

export default Vue.extend({
  name: "CityWeather",
  props: {
    city: Object,
  },
  data() {
    return {
      weather: null,
    };
  },
  created() {
    this.fetchWeather();
  },
  methods: {
    async fetchWeather() {
      const API_KEY = "YOUR_API_KEY";
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${this.city.name}&appid=${API_KEY}&units=metric`;
      const response = await axios.get(url);
      this.weather = response.data;
    },
  },
});
</script>
