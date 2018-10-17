<template>
  <div id="app">
    <Navbar v-on:changestatus="getchangestatus"></Navbar>
    <div class="contentCustom">
      <div class="row">
        <div class="col-md-3">
          <div class="card" style="width: 18rem;">
            <div class="card-body">
              <h5 class="card-title">Card title</h5>
              <h5 class="card-title">Plan</h5>
            </div>
          </div>
          <Plantask :changestatus="changestatus"
                v-on:changestatus="getchangestatus">
              </Plantask>
        </div>
        <div class="col-md-3">
          <div class="card" style="width: 18rem;">
            <div class="card-body">
              <h5 class="card-title">Card title</h5>
              <h5 class="card-title">Start</h5>
            </div>
          </div>
          <Starttask
            :changestatus="changestatus"
            v-on:changestatus="getchangestatus">
            </Starttask>
        </div>
        <div class="col-md-3">
          <div class="card" style="width: 18rem;">
            <div class="card-body">
              <h5 class="card-title">Card title</h5>
              <h5 class="card-title">On Progress</h5>
            </div>
          </div>
          <Onprogress
          :changestatus="changestatus"
            v-on:changestatus="getchangestatus">
          </Onprogress>
        </div>
        <div class="col-md-3">
          <div class="card" style="width: 18rem;">
            <div class="card-body">
              <h5 class="card-title">Card title</h5>
              <h5 class="card-title">Finish</h5>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!--
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div>
    <router-view/>
    -->
  </div>
</template>
<script>
import Navbar from '@/components/Navbar.vue'
import Plantask from '@/components/Plantask.vue'
import Starttask from '@/components/Starttask.vue'
import Onprogress from '@/components/Onprogress.vue'
export default {
  data () {
    return {
      changestatus: false
    }
  },
  components: {
    Navbar, Plantask, Starttask, Onprogress
  },
  methods: {
    getchangestatus (val) {
      this.changestatus = val
    }
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
}
#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}

#contentCustom {
  margin-top: 400px;
}
</style>
