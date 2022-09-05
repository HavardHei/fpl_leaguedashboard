<template>
  <Standings :players="leagueDetails.standings.results"> </Standings>
</template>

<script setup>
var props = defineProps({
  leagueDetails: {
    standings: Object,
  },
});
</script>
