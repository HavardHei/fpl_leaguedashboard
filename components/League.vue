<script setup>
import { store } from "~~/store/store";
var props = defineProps({
  tranferscomplete: Boolean,
});
</script>

<template>
  <TeamsStandings
    v-if="store.league?.standings?.results.some((x) => x.transfers)"
    :tranferscomplete="props.tranferscomplete"
  >
  </TeamsStandings>
  <TeamsCaptainPicks v-if="props.tranferscomplete"></TeamsCaptainPicks>
</template>
