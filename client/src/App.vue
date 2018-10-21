<template>
  <div id="app">
    <div id="nav">
      <router-link to="/" class="mx-3 p-2">Home</router-link>
      <router-link to="/about" class="mx-3 p-2">About</router-link>
    </div>
    <router-view/>
  </div>
</template>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #1a0a19;
}
#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #1a0a19;
  text-decoration: none;
}

#nav a.router-link-exact-active {
  color: #412840;
  border-bottom: 3px solid #412840;
}
</style>
