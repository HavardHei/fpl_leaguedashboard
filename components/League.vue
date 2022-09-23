<script setup>
import { store } from "~~/store/store";
var props = defineProps({
  tranferscomplete: Boolean,
});
</script>

<template>
  <TeamsStandings v-if="store.league?.standings?.results.some((x) => x.transfers)">
  </TeamsStandings>
  <TeamsCaptainPicks v-if=" store.league?.standings"></TeamsCaptainPicks>
</template>
