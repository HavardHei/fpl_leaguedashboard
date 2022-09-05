<script setup>
import NextGameWeek from "./GameWeek/NextGameWeek.vue";
import PreviousGameWeek from "./GameWeek/PreviousGameWeek.vue";
var props = defineProps({
  gameweeks: [],
});
var nextGameWeek = props?.gameweeks.find((x) => !x.finished);
var previousGameWeek = props?.gameweeks.find(
  (x) => x.id == nextGameWeek.id - 1
);
</script>
<template>
  <div
    class="components-container"
    style="
      display: grid;
      gap: 1em;
      grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
    "
  >
    <NextGameWeek :gameweek="nextGameWeek"></NextGameWeek>
    <PreviousGameWeek :gameweek="previousGameWeek"></PreviousGameWeek>
  </div>
</template>
