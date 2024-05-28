<template>
  <v-container>
    <v-row>
      <v-col cols="12" sm="6" md="4">
        <v-text-field
          v-model="newCity"
          label="City"
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
</template>

<script lang="ts">
import Vue from "vue";
import CityWeather from "./CityWeather.vue";

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
        { name: "Londrina"},
        { name: "Picos"},
        { name: "Teresina"},
        { name: "Fortaleza"},
        { name: "Natal"},
        { name: "Joao Pessoa"},
        { name: "Recife"},
        { name: "Manaus"},
        { name: "Caruaru"},
        { name: "Paris"},
        { name: "Tokyo"},
        { name: "New York"},
        { name: "London"},
        { name: "Berlin"},
        { name: "Rome"},
        { name: "Madrid"},
        { name: "Lisbon"},
        { name: "Amsterdam"},
        { name: "Dublin"},
        { name: "Moscow"},
        { name: "Beijing"},
        { name: "Sydney"},
        { name: "Cairo"},
        { name: "Cape Town"},
        { name: "Rio de Janeiro"},
        { name: "Buenos Aires"},
        { name: "Santiago"},
        { name: "Lima"},
        { name: "Mexico City"},
        { name: "Los Angeles"},
        { name: "Toronto"},
        { name: "Vancouver"},
        { name: "Montreal"},
        { name: "Havana"},
        { name: "Bogota"},
        { name: "Lima"},
        { name: "Quito"},
        { name: "La Paz"},
        { name: "Sao Paulo"},
        { name: "Belo Horizonte"},
        { name: "Brasilia"},
        { name: "Curitiba"},
        { name: "Porto Alegre"},
        { name: "Florianopolis"},
        { name: "Foz do Iguacu"},
        { name: "Gramado"},
        { name: "Canela"},
        { name: "Anchorage"},
        { name: "Barrow"},
        { name: "Sitka"},
        { name: "Seward"},
        { name: "Juneau"},
        { name: "Rio Grande"},
        { name: "Santa Vitoria do Palmar"},
        { name: "Chui"},
        { name: "Uruguaiana"},
        { name: "Recife" },
        { name: "Manaus" },
        { name: "Caruaru" },
        { name: "Paris" },
        { name: "Tokyo"},
        { name: "New York"},
        { name: "London"},
        { name: "Berlin"},
        { name: "Rome"},
        { name: "Madrid"},
        { name: "Lisbon"},
        { name: "Amsterdam"},
        { name: "Dublin"},
        { name: "Moscow"},
        { name: "Beijing"},
        { name: "Sydney"},
        { name: "Cairo"},
        { name: "Cape Town"},
        { name: "Rio de Janeiro"},
        { name: "Buenos Aires"},
        { name: "Santiago"},
        { name: "Lima"},
        { name: "Mexico City"},
        { name: "Los Angeles"},
        { name: "Toronto"},
        { name: "Vancouver"},
        { name: "Montreal"},
        { name: "Havana"},
        { name: "Bogota"},
        { name: "Lima"},
        { name: "Quito"},
        { name: "La Paz"},
        { name: "Sao Paulo"},
        { name: "Belo Horizonte"},
        { name: "Brasilia"},
        { name: "Curitiba"},
        { name: "Porto Alegre"},
        { name: "Florianopolis"},
        { name: "Foz do Iguacu"},
        { name: "Gramado"},
        { name: "Canela"},
        { name: "Anchorage"},
        { name: "Barrow"},
        { name: "Sitka"},
        { name: "Seward"},
        { name: "Juneau"},
        { name: "Rio Grande"},
        { name: "Santa Vitoria do Palmar"},
        { name: "Chui"},
        { name: "Uruguaiana"},
        { name: "Santana do Livramento"},
        { name: "Rosario do Sul"},
        { name: "Alegrete"},
        { name: "Sao Borja"},
        { name: "Sao Gabriel"},
        { name: "Santa Maria"},
        { name: "Cruz Alta"},
        { name: "Ijui"},
        { name: "Panambi"},
        { name: "Santa Rosa"},
        { name: "Tramandai"},
        { name: "Capao da Canoa"},
        { name: "Torres"},
        { name: "Osorio"}
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

