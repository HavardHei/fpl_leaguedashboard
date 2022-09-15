<script setup>
import { store } from "~~/store/store";
</script>

<template>
  <TeamsStandings v-if="store.league.standings.results.some((x) => x.transfers)">
  </TeamsStandings>
  <TeamsCaptainPicks v-if="store.currentgameweek"></TeamsCaptainPicks>
</template>
