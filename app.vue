<script setup>
import { Gameweek, ClassicLeague } from "fpl-ts";
import { store } from "~/store/store.js"
import debounce from "~/helpers/debounce";
import NextGameWeek from "./components/GameWeek/NextGameWeek.vue";

const LeagueDetails = async () => {
  const league = new ClassicLeague(LEAGUEID.value);
  try {
    const details = await league.getDetails();
    leaguedetails.value = details;
    details.standings.results.forEach((x) => teams.value.push(x));
  } catch (err) {
    console.error(err);
  }
};
const GameweekDetails = async () => {
  var range = Array.from({ length: 38 }, (x, i) => i + 1);
  const games = new Gameweek(range);
  try {
    const details = await games.getDetails();
    gameweeks.value = details;
  } catch (err) {
    console.error(err);
  }
};

onMounted(() => {
  LeagueDetails();
  GameweekDetails();
});
var LEAGUEID = ref(1224173);
//BACON - 1771345
//JOBBNORGE - 1224173
var leaguedetails = ref(null);
var gameweeks = ref(null);
var teams = ref([]);
const onInput = debounce((e) => {
  console.log(LEAGUEID);
}, 500);
</script>

<template>
  <div>
    <div v-if="leaguedetails" class="fpl_bg" style="padding: 1em; text-align: center">
      <h1>{{ leaguedetails.league.name }}</h1>
      <div style="display:flex; justify-content:space-between">
        <NextGameWeek v-if="gameweeks" :gameweek="gameweeks.find((x) => !x.finished)"></NextGameWeek>
        <div>
          <p id="pCreatedHeader" style="margin: 0; margin-top: -1em">
            {{
            new Date(leaguedetails.league.created).toLocaleDateString("nb-NO")
            }}
          </p>
          <label for="pCreatedHeader"> Created </label>
        </div>
      </div>
    </div>
    <div v-if="!leaguedetails">
      <label for="iLeagueID">Your Fantasy League ID</label>
      <input @input="onInput" v-model="LEAGUEID" />
    </div>
    <div style="
        padding: 1em;
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
        gap: 1.5em;
        justify-items:center;
      ">
      <League v-if="leaguedetails?.standings" :leagueDetails="leaguedetails">
      </League>
      <GameWeeks v-if="gameweeks" :gameweeks="gameweeks"></GameWeeks>
      <Transfers v-if="teams.length > 0" :teamIds="teams"></Transfers>
    </div>
  </div>
</template>

<style>
body {
  margin: 0;
  font-family: "PremierSans-Bold", Arial, "Helvetica Neue", Helvetica,
    sans-serif;
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
