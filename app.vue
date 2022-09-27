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
const LeagueDetails = async () => {
  try {
    var data = await fetch(`/api/leaguedetails?id=${LEAGUEID.value}`);
    var json = await data.json();
    store.league = json;
    store.currentgameweek = store.gameweeks.find(
      (x) => x.id == store.gameweeks.find((x) => !x.finished).id - 1
    );
  } catch (error) {
    console.error(error);
    LeagueDetails();
  }
};


const onInput = debounce((e) => {
  console.log(LEAGUEID);
}, 500);
var LEAGUEID = ref(leagues.jobbnorge);
onMounted(async () => {
  var response = await fetch('api/overview');
  var json = await response.json();
  store.gameweeks = json.events;
  store.players = json.elements;
  await LeagueDetails();
});
</script>

<template>
  <div>
    <div v-if="!store.league">
      <label for="iLeagueID">Your Fantasy League ID</label>
      <input @input="onInput" v-model="LEAGUEID" />
    </div>
    <div v-else>
      <UIHeader></UIHeader>
      <div class="layout">
        <League></League>
        <TransferOverview></TransferOverview>
        <GameWeeks v-if="store.gameweeks"></GameWeeks>
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
