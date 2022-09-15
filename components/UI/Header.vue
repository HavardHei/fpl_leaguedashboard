<script setup>
import NextGameWeek from "../GameWeek/NextGameWeek.vue";
import { store } from "~~/store/store";
</script>
<template>
  <div class="fpl_bg" style="padding: 1em; text-align: center">
    <h1>{{ store.league?.league?.name }}</h1>
    <div style="display: flex; justify-content: space-between">
      <NextGameWeek v-if="store.gameweeks" :gameweek="store.gameweeks.find((x) => !x.finished)"></NextGameWeek>
      <div>
        <p id="pCreatedHeader" style="margin: 0; margin-top: -1em">
          {{
          new Date(store.league?.league?.created).toLocaleDateString("nb-NO")
          }}
        </p>
        <label for="pCreatedHeader"> Created </label>
      </div>
    </div>
  </div>
</template>
