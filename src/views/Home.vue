<template>
  <v-container>
    <CityList />
  </v-container>
</template>

<script lang="ts">
import Vue from "vue";
import CityList from "@/components/CityList.vue";

export default Vue.extend({
  components: {
    CityList,
  },
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Home",
});
</script>
