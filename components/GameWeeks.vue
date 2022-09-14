<script setup>
import { store } from "~/store/store.js";
import PreviousGameWeek from "./GameWeek/PreviousGameWeek.vue";

var previousGameWeek = store.gameweeks.find(
  (x) => x.id == store.gameweeks.find((x) => !x.finished).id - 1
);
store.currentgameweek = previousGameWeek;
</script>
<template>
  <PreviousGameWeek></PreviousGameWeek>
</template>
