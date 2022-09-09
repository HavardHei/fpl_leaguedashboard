<script setup>
import { store } from "~/store/store.js"
import PreviousGameWeek from "./GameWeek/PreviousGameWeek.vue";
var props = defineProps({
  gameweeks: [],
});
var previousGameWeek = props?.gameweeks.find(
  (x) => x.id == (props.gameweeks.find((x) => !x.finished).id) - 1
);
store.currentgameweek = previousGameWeek;
</script>
<template>
  <div style="display:flex; flex-flow:column; gap:1em;">
    <PreviousGameWeek :gameweek="previousGameWeek"></PreviousGameWeek>
  </div>
</template>
