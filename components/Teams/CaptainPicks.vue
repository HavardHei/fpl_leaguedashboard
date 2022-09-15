<script setup>
import FPLCard from "../UI/FPLCard.vue";
import { Player, User } from "fpl-ts";
import { store } from "~~/store/store";
onMounted(async () => {
  await GetTeams();
  GetPlayers();
});
var isDoneLoading = ref(false);
var GetTeams = async () => {
  try {
    await Promise.all(
      store.league.standings.results.map(async (u) => {
        await GetTeam(u);
      })
    );
  } catch (error) {
    console.error(error);
  }
};
var GetTeam = async (u) => {
  const user = new User(u.entry);
  try {
    var team = await user.getPicks([store.currentgameweek.id]);
    u.team = team;
  } catch (error) {
    console.error(error);
  }
};
var GetPlayers = async () => {
  const playerIds = [];
  store.league.standings.results
    .map((x) => x.team)
    .forEach((x) => {
      x[store.currentgameweek.id].map((y) => {
        if (y.is_captain) playerIds.push(y.element);
      });
    });
  store.players = await new Player(playerIds).getDetails(true, false);
  store.league.standings.results.forEach((u) => {
    var captainId = u.team[store.currentgameweek.id].find(
      (p) => p.is_captain
    ).element;
    u.captain = store.players.find((p) => p.id == captainId);
  });
  isDoneLoading.value = true;
};
</script>
<template>
  <FPLCard v-show="false">
    <template v-slot:header> Captain picks </template>
    <template v-slot:content v-if="isDoneLoading">
      <div v-for="(u, index) in store.league.standings.results" :key="index">
        {{ u.captain.web_name }}
      </div>
    </template>
  </FPLCard>
</template>

<style></style>
