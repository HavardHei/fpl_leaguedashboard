<script setup>
import { store } from "~/store/store";
</script>
<template>
  <div class="content-container" style="padding: 1em">
    <h2>Total transfers made</h2>
    <div
      v-for="(team, index) in store.league.standings.results.sort(
        (a, b) => b.transfers.length - a.transfers.length
      )"
      :key="index"
      style="display: flex; justify-content: space-between; padding: 0.3em"
    >
      {{ team.player_name }} {{ team.transfers.length }}
    </div>
  </div>
</template>
