<script setup>
var props = defineProps({
  gameweek: Object,
});
// Set the date we're counting down to
var deadline = ref({
  hours: null,
  minutes: null,
  days: null,
});
function countdownTimeStart() {
  // Update the count down every 1 second
  setInterval(() => setTime(), 1000 * 60);
}
var setTime = () => {
  var countDownDate = new Date(props.gameweek.deadline_time);

  // Get todays date and time
  const msInDay = 1000 * 60 * 60 * 24;
  const msInHour = 1000 * 60 * 60;
  const msInMinutes = 1000 * 60;
  var days = Math.round(Math.abs(countDownDate - new Date()) / msInDay);
  var hours = Math.round(Math.abs(countDownDate - new Date()) / msInHour);
  var minutes = Math.round(Math.abs(countDownDate - new Date()) / msInMinutes);
  deadline.value.hours = hours;
  deadline.value.minutes = minutes;
  deadline.value.days = days;
};
if (props.gameweek) {
  setTime();
  countdownTimeStart();
}
</script>

<template>

  <div v-if="new Date(gameweek.deadline_time) - new Date() < 0">
    <p id="active">⚽Aktiv!</p>
  </div>
  <div v-else>
    <p id="deadline" style="margin: 0; margin-top: -1em">
      {{ deadline.days % (24 * 1044) }}d {{ deadline.hours % 24 }}h
      {{ deadline.minutes % 60 }}m
    </p>
    <label for="deadline">⏰Deadline</label>
  </div>

</template>
