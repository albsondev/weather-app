<template>
  <v-container>
    <CityList />
  </v-container>
</template>

<script lang="ts">
import Vue from "vue";
import CityList from "@/components/CityList.vue";

export default Vue.extend({
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Home",
  components: {
    CityList,
  },
});
</script>
