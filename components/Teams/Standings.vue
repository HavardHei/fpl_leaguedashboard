<script setup>
import { store } from "~/store/store.js";
</script>
<template>
  <UIFPLCard>
    <template v-slot:header> Standings </template>
    <template v-slot:content>
      <table style="text-align: left">
        <thead>
          <tr>
            <th>#</th>
            <th>Team</th>
            <th>🔁</th>
            <th>Points</th>
            <th>Total</th>
            <th>Captain</th>
            <th>Chips</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(player, index) in store.league.standings.results.sort(
            (a, b) => {
              return a.rank - b.rank;
            }
          )" :key="index">
            <td>
              {{ index + 1 }}
              <span v-if="player.last_rank - player.rank < 0" style="color: red">
                {{ player.last_rank - player.rank }}
              </span>
              <span v-if="player.last_rank - player.rank > 0" style="color: green">
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
              ({{ player.transfers?.length }})
            </td>
            <td style="text-align: center">{{ player.event_total }}</td>
            <td style="text-align: center">{{ player.total }}</td>
            <td>{{ player.captain?.web_name ?? "--" }}</td>
            <td v-if="player.chips">
              <span v-for="(chip, index) in player.chips" :key="index">
                <span :title="
                {
                  wildcard: 'Wildcard', 
                  freehit: 'Freehit', 
                  bench_boost: 'Benchboost', 
                  '3xc':'👨Triple Captain', 
                }[chip.name]">
                  {{
                  {
                  wildcard: "🃏",
                  freehit: "🏏",
                  bench_boost: "💺",
                  "3xc":"👨‍✈️",
                  }[chip.name]
                  }}
                </span>
              </span>
            </td>
          </tr>
        </tbody>
      </table>
    </template>
  </UIFPLCard>
</template>

<style>
th,
td {
  padding: 5px 10px;
}
</style>
