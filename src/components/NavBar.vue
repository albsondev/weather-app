<template>
  <v-app-bar app>
      <v-toolbar flat class="toolbar">
        <v-toolbar-title>{{app.title}}</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-toolbar-items class="hidden-sm-and-down">
          <v-btn text>{{app.linkAbout}}</v-btn>
        </v-toolbar-items>
      </v-toolbar>
    </v-app-bar>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "NavBar",
  data() {
    return {
      app: {
        title: "Weather App",
        linkHome: "Home",
        linkAbout: "About",
      },
    };
  },
});
</script>
