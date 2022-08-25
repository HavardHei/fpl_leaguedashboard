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
    <table style="margin: 1em; text-align: left">
      <thead>
        <tr>
          <th>#</th>
          <td>Lag</td>
          <td></td>
          <th>⚽</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(player, index) in players" :key="index">
          <td>
            #{{ index + 1 }}
            <span v-html="changedRank(player.last_rank - player.rank)"></span>
          </td>
          <td>{{ player.entry_name.replace("?", "").replace("�", "") }}</td>
          <td>{{ player.player_name.replace("?", "").replace("�", "") }}</td>
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
