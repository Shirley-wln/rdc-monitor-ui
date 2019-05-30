<template>
  <div id="app">
    <monitor-dashboard/>
  </div>
</template>

<script>
import MonitorDashboard from "./components/MonitorDashboard.vue";

export default {
  name: "app",
  components: {
    MonitorDashboard
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  padding: 15px;
}
body {
  background-color: #f0f2f5 !important;
}
</style>
