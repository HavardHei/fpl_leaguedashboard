<script setup>
import { User } from "fpl-ts";
import TransferedPlayers from "./Transfers/TransferedPlayers.vue";
import { store } from "~/store/store"

var props = defineProps({
  teamIds: Array,
});
var teams = ref([]);
var playerIds = ref([]);
var highestVal = ref(0);
onMounted(async () => {
  try {
    for (const teamId of props.teamIds) await GetTransfers(teamId);
  } catch (error) {
    console.log(error);
  } finally {
    var transfersByPlayers = teams.value.map((o) => o.player);
    var high = 0;
    high = transfersByPlayers
      .flat()
      .reduce((prev, cur) => (cur.event > prev ? cur.event : prev), high);
    highestVal.value = high;
    playerIds.value = teams.value;
  }
});
var GetTransfers = async (teamId) => {
  var team = new User(teamId.entry);
  try {
    var player = await team.getTransfers();
    console.log(player);
    teams.value.push({ name: teamId.player_name, player: player });
    store.transfers.push({ user: teamId, player: player })

  } catch (error) {
    console.log(error);
  }
};
</script>

<template>
  <div style="display:flex; flex-flow:wrap; gap:1em;">
    <TransfersMade :teams="teams"> </TransfersMade>
    <TransferedPlayers v-if="playerIds.length > 0 && highestVal > 0" :playerIds="playerIds" :lastGameweek="highestVal">
    </TransferedPlayers>
  </div>
</template>
