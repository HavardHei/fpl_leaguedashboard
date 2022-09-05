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

    playersSummary1.forEach((p) => {
      console.log(p);
      playersIncomming.value.find(
        (pi) => pi.in == p.id
      ).name = `${p.web_name} (${p.event_points})`;
    });
  } catch (error) {
    console.log(error);
  }

  var po = new Player(idsOutgoing);
  try {
    var playersSummary2 = await po.getDetails();
    playersSummary2.forEach(
      (p) =>
        (playersOutgoing.value.find(
          (pi) => pi.out == p.id
        ).name = `${p.web_name} (${p.event_points})`)
    );
  } catch (error) {
    console.log(error);
  }
};
</script>
<template>
  <div class="content-container" style="padding: 1em">
    <div style="display: flex; min-width: 350px; justify-content: space-evenly">
      <div>
        <h2>✍Incoming</h2>
        <div v-for="(playerid, index) in playersIncomming" :key="index">
          <div style="font-weight: bolder; margin-top: 5px">
            <span style="font-size: 0.5em">🟢</span>
            {{ playerid.name ?? "Unknown" }}
          </div>
          <div
            v-for="(user, index) in playerid.users"
            :key="index"
            style="font-size: 0.8em"
          >
            {{ user }}
          </div>
        </div>
      </div>
      <div style="border: 1px solid lightgreen; margin-top: 50px"></div>
      <div>
        <h2>👋Outgoing</h2>
        <div v-for="(playerid, index) in playersOutgoing" :key="index">
          <div style="font-weight: bolder; margin-top: 5px">
            <span style="font-size: 0.5em">🔴</span>
            {{ playerid.name ?? "Unknown" }}
          </div>
          <div
            v-for="(user, index) in playerid.users"
            :key="index"
            style="font-size: 0.8em"
          >
            {{ user }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
