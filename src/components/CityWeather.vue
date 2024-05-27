<template>
  <v-card>
    <v-card-title>
      {{ city.name }}
    </v-card-title>
    <v-card-text>
      <div>
        Temperature: {{ weather?.main?.temp || "Not available yet" }} °C
      </div>
      <div>
        Humidity: {{ weather?.main?.humidity || "Not available yet" }} %
      </div>
      <div>
        Description:
        {{ weather?.weather[0]?.description || "Not available yet" }}
      </div>
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

interface Weather {
  main: {
    temp?: number;
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
  created() {
    this.fetchWeather();
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
    }
  }
});
</script>
