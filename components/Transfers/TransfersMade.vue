<script setup>
var props = defineProps({
  teams: Array,
});
</script>
<template>
  <div class="content-container" style="padding: 1em">
    <h2>Transfers made</h2>
    <div
      v-for="(team, index) in teams.sort((a, b) => {
        return b.player.length - a.player.length;
      })"
      :key="index"
      style="display: flex; justify-content: space-between; padding: 0.3em"
    >
      <span>
        {{ `${team.name.replace("?", "")}` }}
      </span>
      <span style="margin: 0 1em">
        {{ `${team.player.length}` }}
      </span>
    </div>
  </div>
</template>
