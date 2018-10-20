<template>
  <div id="app">
    <Navbar></Navbar>
    <div class="contentCustom">
      <div class="row">
        <div class="col-md-12">
           <h1>Detail Information</h1>
        </div>
        <div class="col-md-12">
           <div id="detaildatasection"></div>
        </div>
      </div>
      <div class="row">
        <div class="col-md-3">
          <div class="card" style="width: 18rem;">
            <div class="card-body">
              <h5 class="card-title">Plan</h5>
            </div>
          </div>
          <!--
          <Plantask></Plantask>
          -->
          <Task :listtask="listplantask"
            :statusobject="planobject"
            @updatedlistplan="getupdatedlistplan"
            @detaildata="getdetaildata" ></Task>
        </div>
        <div class="col-md-3">
          <div class="card" style="width: 18rem;">
            <div class="card-body">
              <h5 class="card-title">Start</h5>
            </div>
          </div>
          <!--
          <Starttask></Starttask>
          -->
          <Task :listtask="liststarttask"
            :statusobject="startobject"
            @updatedliststart="getupdatedliststart"
            @detaildata="getdetaildata"></Task>
        </div>
        <div class="col-md-3">
          <div class="card" style="width: 18rem;">
            <div class="card-body">
              <h5 class="card-title">On Progress</h5>
            </div>
          </div>
          <!--
          <Onprogress></Onprogress>
          -->
          <Task :listtask="listonprogresstask"
            :statusobject="onprogressobject"
            @updatedlistonprogress="getupdatedlistonprogress"
            @detaildata="getdetaildata"></Task>
        </div>
        <div class="col-md-3">
          <div class="card" style="width: 18rem;">
            <div class="card-body">
              <h5 class="card-title">Finish</h5>
            </div>
          </div>
          <!--
          <Finished></Finished>
          -->
          <Task :listtask="listfinishtask"
            :statusobject="finishobject"
            @updatedlistfinish="getupdatedlistfinish"
            @detaildata="getdetaildata"></Task>
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
import db from '../googlekey.js'
import Navbar from '@/components/Navbar.vue'
// import Plantask from '@/components/Plantask.vue'
// import Starttask from '@/components/Starttask.vue'
// import Onprogress from '@/components/Onprogress.vue'
// import Finished from '@/components/Finished.vue'
import Task from '@/components/Task.vue'
export default {
  data () {
    return {
      listplantask: [],
      liststarttask: [],
      listonprogresstask: [],
      listfinishtask: [],
      planobject: {
        status: 'plan',
        forwardbutton: 'Start'
      },
      startobject: {
        status: 'start',
        backwardbutton: 'Plan',
        forwardbutton: 'On Progress'
      },
      onprogressobject: {
        status: 'onprogress',
        backwardbutton: 'Start',
        forwardbutton: 'Finish'
      },
      finishobject: {
        status: 'finish',
        backwardbutton: 'On Progress'
      },
      detaildata: {}
    }
  },
  components: {
    // Navbar, Plantask, Starttask, Onprogress, Finished, Task
    Navbar, Task
  },
  methods: {
    getlisttask () {
      let self = this
      // list plan task
      db.ref('/task/plan').on('value', function (snapshot) {
        self.listplantask = []
        let obj = {}
        // console.log('plan-----', snapshot.val())
        snapshot.forEach(detailsnapshot => {
          obj.taskid = detailsnapshot.key
          obj.taskdetail = detailsnapshot.val()
          self.listplantask.push(obj)
          obj = {}
        })
      })

      // list start task
      db.ref('/task/start').on('value', function (snapshot) {
        self.liststarttask = []
        let obj = {}
        // console.log('start----', snapshot.val())
        snapshot.forEach(detailsnapshot => {
          obj.taskid = detailsnapshot.key
          obj.taskdetail = detailsnapshot.val()
          self.liststarttask.push(obj)
          obj = {}
        })
      })

      // list on progress task
      db.ref('/task/onprogress').on('value', function (snapshot) {
        self.listonprogresstask = []
        let obj = {}
        // console.log('on progress----', snapshot.val())
        snapshot.forEach(detailsnapshot => {
          obj.taskid = detailsnapshot.key
          obj.taskdetail = detailsnapshot.val()
          self.listonprogresstask.push(obj)
          obj = {}
        })
      })

      // list finish task
      db.ref('/task/finish').on('value', function (snapshot) {
        self.listfinishtask = []
        let obj = {}
        // console.log('finish----', snapshot.val())
        snapshot.forEach(detailsnapshot => {
          obj.taskid = detailsnapshot.key
          obj.taskdetail = detailsnapshot.val()
          self.listfinishtask.push(obj)
          obj = {}
        })
      })
    },
    getupdatedlistplan (val) {
      this.listplantask = []
      // console.log('PLAN STATUS updated---', val)
      this.listplantask = val
    },
    getupdatedliststart (val) {
      this.liststarttask = []
      // console.log('PLAN STATUS updated---', val)
      this.liststarttask = val
    },
    getupdatedlistonprogress (val) {
      this.listonprogresstask = []
      // console.log('ON PROGRESS STATUS updated', val)
      this.listonprogresstask = val
    },
    getupdatedlistfinish (val) {
      this.listfinishtask = []
      // console.log('ON PROGRESS STATUS updated', val)
      this.listfinishtask = val
    },
    getdetaildata (val) {
      this.detaildata = val
    }
  },
  created () {
    this.getlisttask()
  },
  watch: {
    listplantask (val) {},
    liststarttask (val) {},
    listonprogresstask (val) {},
    listfinishtask (val) {},
    detaildata (val) {
      /* eslint-disable-next-line */
      $('#detaildatasection').empty()
      /* eslint-disable-next-line */
      $('#detaildatasection').append(
        `<h1>Detail information</h1>
        <hr>
        <b>Title: </b> <p>${this.detaildata.title}</p>
        <br>
        <b>Description: </b> <p>${this.detaildata.description}</p>
        <br>
        <b>Point: </b> <p>${this.detaildata.point}</p>
        `
      )
      setTimeout(() => {
        /* eslint-disable-next-line */
        $('#detaildatasection').empty()
      }, 5000)
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
