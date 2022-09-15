<script setup>
import FPLCard from "./..//UI/FPLCard.vue";
import { store } from "~/store/store.js";

var changedRank = (val) => {
  if (val < 0) return `<span style="color:red">(${val})</span>`;
  if (val > 0) return `<span style="color:green">(+${val})</span>`;
};
var GetTransfers = (id) => {
  var user_transfers = store.league.standings.results.find((t) => t.id == id);
  return user_transfers?.transfers?.filter(
    (p) => p.event == store.currentgameweek.id
  )?.length;
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
            <th>C</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(player, index) in store.league.standings.results.sort((a,b)=>{return a.rank - b.rank} )"
            :key="index">
            <td>
              {{ index + 1 }}
              <span v-html="changedRank(player.last_rank - player.rank)"></span>
            </td>
            <td>
              <div>
                {{ player.entry_name.replace("?", "").replace("�", "") }}
              </div>
              <span style="font-size: 0.7em; color: grey">{{
              player.player_name.replace("?", "").replace("�", "")
              }}</span>
            </td>
            <td style="text-align: center">{{ GetTransfers(player.id) }}</td>
            <td style="text-align: center">{{ player.event_total }}</td>
            <td style="text-align: center">{{ player.total }}</td>
            <td>{{ player.captain?.web_name }}</td>
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
