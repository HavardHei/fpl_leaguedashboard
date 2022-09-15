<script setup>
import { User } from "fpl-ts";
import TransferedPlayers from "./Transfers/TransferedPlayers.vue";
import { store } from "~/store/store";
var isDoneLoading = ref(false);
onMounted(async () => {
  try {
    for (const user of store.league.standings.results) {
      await GetTransfers(user);
      await GetChips(user);
      await GetPicks(user);
    }
  } catch (error) {
    console.error(error);
  } finally {
    isDoneLoading.value = true;
  }
});
var GetTransfers = async (user) => {
  var team = new User(user.entry);
  try {
    user.transfers = await team.getTransfers();
  } catch (error) {
    console.error(error);
  }
};
var GetChips = async (user) => {
  var u = new User(user.entry);
  try {
    user.chips = await u.getChipsHistory();
  } catch (error) {
    console.error(error);
  }
};
var GetPicks = async (user) => {
  var u = new User(user.entry);
  try {
    var picks = await u.getPicks(range);
    if (Object.values(picks).some((x) => x.status == 404)) user.picks = [];
    else user.picks = Object.values(picks);
    console.log(user.picks);
  } catch (error) {
    console.error(error);
  }
};
var range = Array.from({ length: store.currentgameweek.id }, (x, i) => i + 1);
</script>

<template>
  <TransfersMade v-if="isDoneLoading"> </TransfersMade>
  <TransferedPlayers v-if="isDoneLoading"> </TransferedPlayers>
</template>
