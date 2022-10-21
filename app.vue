<script setup>
import { store } from "~/store/store.js";
import debounce from "~/helpers/debounce";
import TransferOverview from "./components/TransferOverview.vue";

var leagues = {
  pusebabe: 823015,
  bacon: 1771345,
  jobbnorge: 1224173,
  folk_og_rovere: 77687,
};
var LEAGUEID = ref(null);

const LeagueDetails = async () => {
  try {
    var data = await fetch(`/api/leaguedetails?id=${LEAGUEID.value}`);
    var json = await data.json();
    store.league = json;

  } catch (error) {
    console.error(error);
    LeagueDetails();
  }
};


const onInput = debounce((e) => {
  console.log(LEAGUEID.value);
  initLeague();
}, 500);
onMounted(async () => {
  var response = await fetch('api/overview');
  var json = await response.json();
  store.gameweeks = json.events;
  store.players = json.elements;
  store.currentgameweek = store.gameweeks.find(
    (x) => x.id == store.gameweeks.find((x) => !x.finished).id - 1
  );
});
var initLeague = async () => {
  await LeagueDetails();
}
</script>

<template>
  <div>
    <UIHeader></UIHeader>
    <div v-if="!store.league" style="margin:40px 0; text-align: center;">
      <div style="display:flex; flex-direction:column; align-items: center; gap:1em;">
        <input @input="onInput" v-model="LEAGUEID" style="border:none; border-bottom: 1px solid; width:250px;" />
        <label for="iLeagueID">Your Fantasy League ID</label>
        <small>.../leagues/{THIS IS YOUR LEAGUEID}/standings/...</small>
      </div>
      <div style="display:flex; flex-direction:column; align-items: center; margin-top:40px">
        <h4>Leagues</h4>
        <h5 v-for="league in leagues" v-on:click="{LEAGUEID =  league; initLeague()}" class="hoverable" style="width:250px">
          {{Object.keys(leagues).find(key => leagues[key] === league)}}
        </h5>
      </div>
    </div>
    <div>
      <div v-if="store.league" class="layout">
        <League ></League>
        <TransferOverview></TransferOverview>
        <GameWeeks ></GameWeeks>
      </div>
    </div>
  </div>
</template>

<style>
body {
  margin: 0;
  font-family: "PremierSans-Bold", Arial, "Helvetica Neue", Helvetica,
    sans-serif;
}

.hoverable {
padding:0.75em;
margin:0;
border-radius: 5%;
transition: all 250ms;
}

.hoverable:hover {
  cursor: pointer;
  background-color: rgb(0, 255, 135);
}

.layout {

  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  flex-flow: wrap;
  gap: 1.5em;
  padding: 2.5em;
}

.fpl_bg {
  background-image: linear-gradient(to right,
      rgb(0, 255, 135),
      rgb(2, 239, 255));
}

.bg_white {
  background: #ffffff;
}

table {
  border-collapse: collapse;
  width: fit-content;
  white-space: nowrap;
}

tr {
  border-bottom: 1px solid gainsboro;
}

.content-container {
  padding-top: 1em;
  border-radius: 6px;
  background-repeat: no-repeat;
  background-repeat-x: no-repeat;
  background-repeat-y: no-repeat;
  background-position: 0px center, right top, 0px center;
  background-position-x: 0px, right, 0px;
  background-position-y: center, top, center;
  background-image: linear-gradient(rgba(255, 255, 255, 0) 10px,
      rgba(255, 255, 255, 0.2) 20px,
      white 50px),
    url(/static/media/bgtop.png),
    linear-gradient(to right, rgb(2, 239, 255), rgb(98, 123, 255));
  box-shadow: rgb(107 107 107 / 8%) 0px 8px 12px 0px;
  width: fit-content;
  height: fit-content;
  overflow: auto;
  padding: 1em;
}

label {
  color: grey;
  padding: 6px 0;
}

p {
  margin-bottom: 0.4em;
}

h1,
h2,
h3,
h4,
h5 {
  color: #37003c;
  white-space: nowrap;
}

.components-container {
  height: fit-content;
}
</style>
