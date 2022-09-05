<script setup>
var props = defineProps({
  players: [],
});
var changedRank = (val) => {
  if (val < 0) return `<span style="color:red">(${val})</span>`;
  if (val > 0) return `<span style="color:green">(+${val})</span>`;
};
</script>
<template>
  <div class="bg_white content-container">
    <h2 style="text-align: center">Standings</h2>
    <table style="text-align: left">
      <thead>
        <tr>
          <th>#</th>
          <td>Lag</td>
          <th>⚽</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(player, index) in players" :key="index">
          <td>
            #{{ index + 1 }}
            <span v-html="changedRank(player.last_rank - player.rank)"></span>
          </td>
          <td>
            <div>{{ player.entry_name.replace("?", "").replace("�", "") }}</div>
            <span style="font-size: 0.7em; color: grey">{{
              player.player_name.replace("?", "").replace("�", "")
            }}</span>
          </td>
          <td>{{ player.total }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style>
th,
td {
  padding: 5px 10px;
}
</style>
