<script setup>
import { Player } from "fpl-ts";
var props = defineProps({
  playerIds: Array,
  lastGameweek: Number,
});
var playersIncomming = ref([]);
var playersOutgoing = ref([]);
onMounted(() => {
  props.playerIds.forEach((i) => {
    i.player.forEach((x) => {
      if (x.event == props.lastGameweek) {
        if (playersIncomming.value.find((x) => x.in == x.element_in) != null)
          playersIncomming.value[x.element_in].users.push(i.name);
        else playersIncomming.value.push({ in: x.element_in, users: [i.name] });
        if (playersOutgoing.value.find((x) => x.out == x.element_out) != null)
          playersOutgoing.value[x.element_out].users.push(i.name);
        else
          playersOutgoing.value.push({ out: x.element_out, users: [i.name] });
      }
    });
  });
  GetPlayers();
});
var GetPlayers = async () => {
  var idsIncoming = playersIncomming.value.map((x) => x.in);
  var idsOutgoing = playersOutgoing.value.map((x) => x.out);
  var pi = new Player(idsIncoming);
  try {
    var playersSummary1 = await pi.getDetails();
    playersSummary1.forEach(
      (p) =>
        (playersIncomming.value.find((pi) => pi.in == p.id).name = p.web_name)
    );
  } catch (error) {
    console.log(error);
  }

  var po = new Player(idsOutgoing);
  try {
    var playersSummary2 = await po.getDetails();
    playersSummary2.forEach(
      (p) =>
        (playersOutgoing.value.find((pi) => pi.out == p.id).name = p.web_name)
    );
  } catch (error) {
    console.log(error);
  }
};
</script>
<template>
  <div class="content-container" style="padding: 1em">
    <div style="display: flex; whitespace: bre">
      <div>
        <h2>🟢Incoming</h2>
        <ul v-for="(playerid, index) in playersIncomming" :key="index">
          <p style="font-weight: bolder">{{ playerid.name }}</p>
          <div v-for="(user, index) in playerid.users" :key="index">
            {{ user }}
          </div>
        </ul>
      </div>
      <div>
        <h2>🔴Outgoing</h2>
        <ul v-for="(playerid, index) in playersOutgoing" :key="index">
          <p style="font-weight: bolder">{{ playerid.name }}</p>
          <div v-for="(user, index) in playerid.users" :key="index">
            {{ user }}
          </div>
        </ul>
      </div>
    </div>
  </div>
</template>
