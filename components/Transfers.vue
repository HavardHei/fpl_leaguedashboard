<script setup>
import { store } from "~~/store/store";
const emit = defineEmits(["tranferscomplete"]);

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
    emit("tranferscomplete");
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
var GetPicks = async (user) => {
  var data = await fetch(
    `/api/transfers?entry=${user.entry}&range=${store.currentgameweek.id}`
  );
  var json = await data.json();
  user.transfers = json;
};
</script>

<template>
  <TransfersMade v-if="isDoneLoading"> </TransfersMade>
  <TransfersTransferedPlayers v-if="isDoneLoading">
  </TransfersTransferedPlayers>
</template>
