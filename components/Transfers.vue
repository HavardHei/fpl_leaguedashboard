<script setup>
import { User } from "fpl-ts";
import TransferedPlayers from "./Transfers/TransferedPlayers.vue";
import { store } from "~/store/store";
var isDoneLoading = ref(false);
onMounted(async () => {
  try {
    for (const user of store.league.standings.results) await GetTransfers(user);
  } catch (error) {
    console.log(error);
  } finally {
    isDoneLoading.value = true;
  }
});
var GetTransfers = async (user) => {
  var team = new User(user.entry);
  try {
    user.transfers = await team.getTransfers();
  } catch (error) {
    console.log(error);
  }
};
</script>

<template>
  <TransfersMade v-if="isDoneLoading"> </TransfersMade>
  <TransferedPlayers v-if="isDoneLoading"> </TransferedPlayers>
</template>
