<script setup>
var props = defineProps({
  gameweek: Object,
});
var chips = props.gameweek.chip_plays;
var chip_benchboost = chips.find((x) => x.chip_name == "bboost");
var chip_freehit = chips.find((x) => x.chip_name == "freehit");
var chip_wildcard = chips.find((x) => x.chip_name == "wildcard");
var chip_3xc = chips.find((x) => x.chip_name == "3xc");
</script>

<template>
  <div
    class="content-container"
    style="text-align: center; display: grid; grid-template-columns: 1fr 1fr"
  >
    <h2 style="grid-column: 1 / 2 span; margin-bottom: 0">
      {{ gameweek.name }}
    </h2>

    <div>
      <h4>Scores</h4>
      <p id="avgscore">{{ gameweek.highest_score }}</p>
      <label for="avgscore">Highest score</label>
      <p id="avgscore">{{ gameweek.average_entry_score }}</p>
      <label for="avgscore">Average score</label>
      <p id="mostCptnd">{{ gameweek.transfers_made }}</p>
      <label for="mostCptnd">Transfers made</label>
    </div>
    <div>
      <h4>Chips</h4>
      <p id="pBenchboost">{{ chip_benchboost.num_played }}</p>
      <label for="pBenchboost"> Bench Boost</label>
      <p id="pFreehit">{{ chip_freehit.num_played }}</p>
      <label for="pFreehit">Free Hit</label>
      <p id="pWildcard">{{ chip_wildcard.num_played }}</p>
      <label for="pWildcard">Wildcard</label>
      <p id="p3xc">{{ chip_3xc.num_played }}</p>
      <label for="p3xc">Triple Captain</label>
    </div>
  </div>
</template>
