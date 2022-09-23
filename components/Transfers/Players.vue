<script setup>
import { store } from "~/store/store";

var playersIncomming = ref({});
var playersOutgoing = ref({});
var incomingForView = ref([]);
var outgoingForView = ref([]);
onMounted(() => {
  store.league.standings.results.forEach((user) => {
    if (user.transfers.length > 0)
      user.transfers.forEach((transferEvent) => {
        if (transferEvent.event == store.currentgameweek.id) {
          if (playersIncomming.value[transferEvent.element_in] != null) {
            playersIncomming.value[transferEvent.element_in].users.push(
              user.player_name
            );
          } else
            playersIncomming.value[transferEvent.element_in] = {
              users: [user.player_name],
            };

          if (playersOutgoing.value[transferEvent.element_out] != null) {
            playersOutgoing.value[transferEvent.element_out].users.push(
              user.player_name
            );
          } else
            playersOutgoing.value[transferEvent.element_out] = {
              users: [user.player_name],
            };
        }
      });
  });
  GetPlayers();
});
var GetPlayers = async () => {
  var idsIncoming = Object.keys(playersIncomming.value);

  idsIncoming.forEach(id => {
    incomingForView.value.push(store.players.find(p => p.id == id))
  })
  incomingForView.value.forEach((incoming) => {
    incoming.users = playersIncomming.value[incoming.id].users;
  });

  var idsOutgoing = Object.keys(playersOutgoing.value); // Unique ids
  idsOutgoing.forEach(id => {
    outgoingForView.value.push(store.players.find(p => p.id == id))
  })

  outgoingForView.value.forEach((outgoing) => {
    outgoing.users = playersOutgoing.value[outgoing.id].users;
  });
};
</script>
<template>
  <UIFPLCard>
    <template v-slot:header>
      <div style="display: flex; justify-content: space-around; gap: 1em">
        <span>✍Incoming</span>
        <span>👋Outgoing</span>
      </div>
    </template>
    <template v-slot:content>
      <div style="display: flex; min-width: 350px; justify-content: space-evenly">
        <div>
          <div v-for="playerid in incomingForView" :key="index">
            <div style="font-weight: bolder; margin-top: 5px">
              <span style="font-size: 0.5em">🟢</span>
              {{ `${playerid?.web_name} (${playerid?.event_points})` }}
            </div>
            <div v-for="(user, index) in playerid.users" :key="index" style="font-size: 0.8em">
              {{ user }}
            </div>
          </div>
        </div>
        <div style="border: 1px solid lightgreen"></div>
        <div>
          <div v-for="playerid in outgoingForView" :key="index">
            <div style="font-weight: bolder; margin-top: 5px">
              <span style="font-size: 0.5em">🔴</span>
              {{ `${playerid?.web_name} (${playerid?.event_points})` }}
            </div>
            <div v-for="(user, index) in playerid.users" :key="index" style="font-size: 0.8em">
              {{ user }}
            </div>
          </div>
        </div>
      </div>
    </template>
  </UIFPLCard>
</template>
