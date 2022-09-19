<script setup>
import { store } from "~/store/store.js";

var previousGameWeek = store.gameweeks.find(
  (x) => x.id == store.gameweeks.find((x) => !x.finished).id - 1
);
store.currentgameweek = previousGameWeek;
</script>
<template>
  <GameWeekPreviousGameWeek></GameWeekPreviousGameWeek>
</template>
