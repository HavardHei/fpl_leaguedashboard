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
onMounted(() => {
  console.log(props.gameweeks);
});
</script>
<template>
  <div class="components-container" style="display: grid; gap: 1em">
    <NextGameWeek :gameweek="nextGameWeek"></NextGameWeek>
    <PreviousGameWeek :gameweek="previousGameWeek"></PreviousGameWeek>
  </div>
</template>
