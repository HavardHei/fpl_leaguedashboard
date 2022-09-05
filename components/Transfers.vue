<script setup>
import { User } from "fpl-ts";
import TransferedPlayers from "./Transfers/TransferedPlayers.vue";

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
    console.log(transfersByPlayers);
    var high = 0;
    high = transfersByPlayers
      .flat()
      .reduce((prev, cur) => (cur.event > prev ? cur.event : prev), high);
    console.log(high);
    highestVal.value = high;
    playerIds.value = teams.value;
  }
});
var GetTransfers = async (teamId) => {
  var team = new User(teamId.entry);
  try {
    var player = await team.getTransfers();
    teams.value.push({ name: teamId.player_name, player: player });
  } catch (error) {
    console.log(error);
  }
};
</script>

<template>
  <TransfersMade :teams="teams"> </TransfersMade>
  <TransferedPlayers
    v-if="playerIds.length > 0 && highestVal > 0"
    :playerIds="playerIds"
    :lastGameweek="highestVal"
  ></TransferedPlayers>
</template>
