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
  deadline.value.hours = hours % 24;
  deadline.value.minutes = minutes % 60;
  deadline.value.days = days - 1;
};
if (props.gameweek) {
  setTime();
  countdownTimeStart();
}
</script>

<template>
  <div class="content-container" style="padding: 1em">
    <h2>{{ gameweek.name }}</h2>
    <p id="deadline">
      {{ deadline.days % (24 * 1044) }}d {{ deadline.hours % 24 }}h
      {{ deadline.minutes }}m
    </p>
    <label for="deadline">⏰Deadline</label>
  </div>
</template>
