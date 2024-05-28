<template>
  <div class="icon-cards-list">
    <div class="info-text-cards">
      <v-icon>{{ icon }}</v-icon>
      <span>{{ label }}</span>
    </div>
    <div class="text-center font-weight-bold">
      {{ value }} °C
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: "WeatherInfo",
  props: {
    icon: {
      type: String,
      required: true,
    },
    label: {
      type: String,
      required: true,
    },
    value: {
      type: String,
      required: true,
    },
  },
};
</script>
