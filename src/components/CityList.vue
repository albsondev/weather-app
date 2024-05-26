<template>
  <div>
    <v-text-field
      v-model="newCity"
      label="Add City"
      @keyup.enter="addCity"
    ></v-text-field>
    <v-btn @click="addCity">Add</v-btn>
    <v-list>
      <CityWeather
        v-for="city in cities"
        :key="city.name"
        :city="city"
        @remove="removeCity"
        @details="showDetails"
      />
    </v-list>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import CityWeather from "./CityWeather.vue";
import { Route } from "vue-router";

interface City {
  name: string;
}

export default Vue.extend({
  name: "CityList",
  components: { CityWeather },
  data() {
    return {
      cities: [
        { name: "Maringa" },
        { name: "Recife" },
        { name: "Manaus" },
        { name: "Caruaru" },
        { name: "Paris" },
      ] as City[],
      newCity: "",
    };
  },
  methods: {
    addCity() {
      if (
        this.newCity &&
        !this.cities.some(
          (city) => city.name.toLowerCase() === this.newCity.toLowerCase()
        )
      ) {
        this.cities.push({ name: this.newCity });
        this.newCity = "";
      }
    },
    removeCity(cityName: string) {
      this.cities = this.cities.filter((city) => city.name !== cityName);
    },
    showDetails(cityName: string) {
      console.log(`Navegando para detalhes da cidade: ${cityName}`);
      this.$router.push(`/details/${cityName}`);
    },
  },
});
</script>
