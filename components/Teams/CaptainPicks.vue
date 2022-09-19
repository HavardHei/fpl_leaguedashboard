<script setup>
import { store } from "~~/store/store";

onMounted(async () => {
  await GetTeams();
  if (isDoneLoading.value) GetPlayers();
});
var isDoneLoading = ref(false);
var GetTeams = async () => {
  try {
    Promise.all(
      store.league.standings.results.forEach((u) => {
        GetTeam(u);
      })
    );
  } catch (error) {
    console.error(error);
  } finally {
    isDoneLoading.value = true;
  }
};
var GetTeam = async (u) => {
  try {
    var data = await fetch(
      `/api/picks?entry=${u.entry}&gw=${[store.currentgameweek.id]}`
    );
    var json = await data.json();

    u.team = json;
  } catch (error) {
    console.error(error);
  }
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
  console.log("LOL");
  var data = await fetch("/api/playerdetails", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(playerIds.join(",")),
  });
  var json = await data.json();
  store.players = json;
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
    <template v-slot:content v-if="isDoneLoading">
      <div v-for="(u, index) in store.league.standings.results" :key="index">
        {{ u.captain.web_name }}
      </div>
    </template>
  </UIFPLCard>
</template>

<style></style>
