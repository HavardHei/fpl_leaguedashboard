<script setup>
import { store } from "~~/store/store";

var isDoneLoading = ref(false);
onMounted(async () => {
  try {
    for (const user of store.league.standings.results) {
      await GetTransfers(user);
      await GetChips(user);
    }
  } catch (error) {
    console.error(error);
  } finally {
    isDoneLoading.value = true;
  }
});
var GetTransfers = async (user) => {
  var data = await fetch(`/api/transfers?entry=${user.entry}`);
  var json = await data.json();
  user.transfers = json;
};
var GetChips = async (user) => {
  var data = await fetch(`/api/chips?entry=${user.entry}`);
  var json = await data.json();
  user.chips = json;
};
</script>

<template>
  <TransfersPlayers v-if="isDoneLoading">
  </TransfersPlayers>
</template>
