<script setup>
import { store } from "~~/store/store";

var chips = store.currentgameweek.chip_plays;
var chip_benchboost = chips.find((x) => x.chip_name == "bboost");
var chip_freehit = chips.find((x) => x.chip_name == "freehit");
var chip_wildcard = chips.find((x) => x.chip_name == "wildcard");
var chip_3xc = chips.find((x) => x.chip_name == "3xc");
</script>

<template>
  <UIFPLCard>
    <template v-slot:header>
      {{ store.currentgameweek.name }}
    </template>
    <template v-slot:content>

      <div style="display: flex; justify-content: space-between; gap: 2em">
        <div>
          <h4>Scores</h4>
          <p id="avgscore">{{ store.currentgameweek.highest_score }}</p>
          <label for="avgscore">Highest score</label>
          <p id="avgscore">{{ store.currentgameweek.average_entry_score }}</p>
          <label for="avgscore">Average score</label>
          <p id="mostCptnd">{{ store.currentgameweek.transfers_made }}</p>
          <label for="mostCptnd">Transfers made</label>
        </div>
        <div>
          <h4>Chips</h4>
          <p id="pBenchboost">{{ chip_benchboost?.num_played ?? 0 }}</p>
          <label for="pBenchboost"> Bench Boost</label>
          <p id="pFreehit">{{ chip_freehit?.num_played ?? 0 }}</p>
          <label for="pFreehit">Free Hit</label>
          <p id="pWildcard">{{ chip_wildcard?.num_played ?? 0 }}</p>
          <label for="pWildcard">Wildcard</label>
          <p id="p3xc">{{ chip_3xc?.num_played ?? 0 }}</p>
          <label for="p3xc">Triple Captain</label>
        </div>
      </div>
    </template>
  </UIFPLCard>
</template>
