<script setup>
import FPLCard from "./..//UI/FPLCard.vue";
import { store } from "~/store/store.js";

var GetChipSymbol = (chip) => {
  switch (chip.name) {
    case "wildcard":
      return "🃏";
    case "freehit":
      return "🏏";
    case "bench_boost":
      return "🛋";
    case "3xc":
      return "👨‍✈️";
    default:
      return "";
  }
};
</script>
<template>
  <FPLCard>
    <template v-slot:header> Standings </template>
    <template v-slot:content>
      <table style="text-align: left">
        <thead>
          <tr>
            <th>#</th>
            <th>Team</th>
            <th>Subs</th>
            <th>Points</th>
            <th>Total</th>
            <th>Captain</th>
            <th>Chips</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(player, index) in store.league.standings.results.sort(
              (a, b) => {
                return a.rank - b.rank;
              }
            )"
            :key="index"
          >
            <td>
              {{ index + 1 }}
              <span
                v-if="player.last_rank - player.rank < 0"
                style="color: red"
              >
                -{{ player.last_rank - player.rank }}
              </span>
              <span
                v-if="player.last_rank - player.rank > 0"
                style="color: green"
              >
                +{{ player.last_rank - player.rank }}
              </span>
            </td>
            <td>
              <div>
                {{ player.entry_name.replace("?", "").replace("�", "") }}
              </div>
              <span style="font-size: 0.7em; color: grey">{{
                player.player_name.replace("?", "").replace("�", "")
              }}</span>
            </td>
            <td style="text-align: center">
              {{
                player.transfers?.filter(
                  (p) => p.event == store.currentgameweek.id
                )?.length
              }}
            </td>
            <td style="text-align: center">{{ player.event_total }}</td>
            <td style="text-align: center">{{ player.total }}</td>
            <td>{{ player.captain?.web_name }}</td>
            <td>
              <span v-for="(chip, index) in player.chips" :key="index">
                {{ GetChipSymbol(chip) }}</span
              >
            </td>
          </tr>
        </tbody>
      </table>
    </template>
  </FPLCard>
</template>

<style>
th,
td {
  padding: 5px 10px;
}
</style>
