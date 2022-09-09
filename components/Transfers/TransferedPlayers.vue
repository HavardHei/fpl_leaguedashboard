<script setup>
import { Player } from "fpl-ts";
import FPLCard from "../UI/FPLCard.vue";
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
  var players = [];
  var pi = new Player(idsIncoming);
  try {
    var playersSummary1 = await pi.getDetails();

    playersSummary1.forEach((p) => {
      var toUpdate = playersIncomming.value.find(
        (pi) => pi.in == p.id
      );
      toUpdate.detailed = p;
    });
  } catch (error) {
    console.log(error);
  }

  var idsOutgoing = playersOutgoing.value.map((x) => x.out);
  var po = new Player(idsOutgoing);
  try {
    var playersSummary2 = await po.getDetails();
    playersSummary2.forEach(
      (p) => {
        var toUpdate = playersOutgoing.value.find(
          (pi) => pi.out == p.id
        );
        toUpdate.detailed = p;
      }
    );
  } catch (error) {
    console.log(error);
  }
};
</script>
<template>
  <FPLCard>
    <template v-slot:header>
      <div style="display:flex; justify-content:space-around; gap:1em;">
        <span>✍Incoming</span>
        <span>👋Outgoing</span>
      </div>
    </template>
    <template v-slot:content>
      <div style="display: flex; min-width: 350px; justify-content: space-evenly">
        <div>
          <div v-for="(playerid, index) in playersIncomming" :key="index">
            <div style="font-weight: bolder; margin-top: 5px">
              <span style="font-size: 0.5em">🟢</span>
              {{ `${playerid?.detailed?.web_name} (${playerid?.detailed?.event_points})` }}
            </div>
            <div v-for="(user, index) in playerid.users" :key="index" style="font-size: 0.8em">
              {{ user }}
            </div>
          </div>
        </div>
        <div style="border: 1px solid lightgreen;"></div>
        <div>
          <div v-for="(playerid, index) in playersOutgoing" :key="index">
            <div style="font-weight: bolder; margin-top: 5px">
              <span style="font-size: 0.5em">🔴</span>
              {{ `${playerid?.detailed?.web_name} (${playerid?.detailed?.event_points})` }}
            </div>
            <div v-for="(user, index) in playerid.users" :key="index" style="font-size: 0.8em">
              {{ user }}
            </div>
          </div>
        </div>
      </div>
    </template>
  </FPLCard>
</template>
