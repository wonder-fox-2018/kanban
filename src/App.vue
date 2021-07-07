<template>
  <div id="app">
    <mainboard></mainboard>

  </div>
</template>

<script>
import mainboard from './components/Mainboard'

export default {
  name: 'app',
  components: {
    mainboard
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  /* background-color: #2c3e50; */
}
</style>
