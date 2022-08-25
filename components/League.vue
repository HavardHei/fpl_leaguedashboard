<template>
  <div class="components-container">
    <Standings :players="leagueDetails.standings.results"> </Standings>
  </div>
</template>

<script setup>
var props = defineProps({
  leagueDetails: {
    league: Object,
    standings: Object,
  },
});
onMounted(() => {
  console.log(props);
});
</script>
<style>
.components-container {
  display: grid;
}
</style>
