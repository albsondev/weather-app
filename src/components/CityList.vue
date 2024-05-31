<template>
  <v-app class="app-main">
    <NavBar></NavBar>
    <v-main>
      <v-container>
        <v-row>
          <h1 class="display-1">Real-time weather information</h1>
          <p class="text--secondary">
            To add a new city to the list, type the name of the city and click the <strong>"Add new City"</strong> button or <strong>press the "Enter" key</strong>.
          </p>
        </v-row>
        <v-row>
          <v-col cols="12" sm="6" md="4">
            <v-text-field
              v-model="newCity"
              label="City Name"
              @keyup.enter="addCity"
            ></v-text-field>
            <v-btn @click="addCity">Add New City</v-btn>
          </v-col>
          <v-col cols="12" sm="12" md="12">
            <v-divider></v-divider>
          </v-col>
        </v-row>
        <v-row>
          <v-col
            cols="12"
            sm="6"
            md="3"
            xl="2"
            v-for="city in cities"
            :key="city.name"
          >
            <CityWeather
              :city="city"
              @remove="removeCity"
              @details="showDetails"
            ></CityWeather>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script lang="ts">
import Vue from "vue";
import CityWeather from "./CityWeather.vue";
import NavBar from "@/components/NavBar.vue";

interface City {
  name: string;
}

export default Vue.extend({
  name: "CityList",
  components: { NavBar, CityWeather },
  data() {
    return {
      app: {
        title: "Weather App",
        linkHome: "Home",
        linkAbout: "About",
      },
      cities: [
        { name: "Porto Alegre" },
        { name: "Rio de Janeiro"},
        { name: "Macapa"},
        { name: "Curitiba"},
        { name: "Belo Jardim"},
      ] as City[],
      newCity: ""
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
      this.$router.push(`/city/${cityName}`);
    }
  }
});
</script>