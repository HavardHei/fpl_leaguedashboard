<script setup>
import { store } from "~~/store/store";

onMounted(async () => {
  GetTeams();
});

var isDoneLoading = ref(false);

watch(isDoneLoading, (val, oldval) => {
  if (val) GetPlayers()
})
var GetTeams = async () => {
  for (const user of store.league.standings.results) {
    await GetTeam(user);
  }
  isDoneLoading.value = true;
}
var GetTeam = async (result) => {
  return new Promise(async (res) => {
    try {
      var data = await fetch(
        `/api/picks?entry=${result.entry}&gw=${[store.currentgameweek.id]}`
      );
      var json = await data.json();
      result.team = json;
      res("fluff puff");
    } catch (error) { console.error(error) }
  })
};

var GetPlayers = async () => {
  const playerIds = [];
  var teams = store.league.standings.results.map((x) => x.team);
  teams.forEach((x) => {
    if (x)
      x[store.currentgameweek.id].map((y) => {
        if (y && y.is_captain) playerIds.push(y.element);
      });
  });
  store.league.standings.results.forEach((u) => {
    var re = u.team[store.currentgameweek.id].find((p) => p.is_captain);
    var captainId = re.element;
    u.captain = store.players.find((p) => p.id == captainId);
  });
  isDoneLoading.value = true;
};
</script>
<template>
  <UIFPLCard v-show="false">
    <template v-slot:header> Captain picks </template>
    <template v-slot:content v-if="isDoneLoading == true">
      <div v-for="(u, index) in store.league.standings.results" :key="index">
        {{ u.captain?.web_name }}
      </div>
    </template>
  </UIFPLCard>
</template>

<style>

</style>
