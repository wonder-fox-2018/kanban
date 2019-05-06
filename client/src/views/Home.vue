<template>
    <div class="container">
      <div class="container-card">
        <GroupList v-for="(data,index) in taskLists" :key="index" :data="data"></GroupList>
      </div>
    </div>
</template>

<script>
// @ is an alias to /src
import Navbar from '@/components/Navbar.vue'
import GroupList from '@/components/GroupList.vue'
import database from '../assets/config.js'
const taskData = [
  {
    name: 'Back-Log',
    tasks: []
  },
  {
    name: 'To-Do',
    tasks: []
  },
  {
    name: 'On-Going',
    tasks: []
  },
  {
    name: 'Finished',
    tasks: []
  }
]
var leadsRef = database.ref('/')
leadsRef.on('value', function (snapshot) {
  taskData[0].tasks = []
  taskData[1].tasks = []
  taskData[2].tasks = []
  taskData[3].tasks = []
  snapshot.forEach(function (childSnapshot) {
    if (childSnapshot.val().status === 'Back-Log') {
      const obj = childSnapshot.val()
      obj.id = childSnapshot.key
      taskData[0].tasks.push(obj)
    } else if (childSnapshot.val().status === 'To-Do') {
      const obj = childSnapshot.val()
      obj.id = childSnapshot.key
      taskData[1].tasks.push(obj)
    } else if (childSnapshot.val().status === 'On-Going') {
      const obj = childSnapshot.val()
      obj.id = childSnapshot.key
      taskData[2].tasks.push(obj)
    } else {
      const obj = childSnapshot.val()
      obj.id = childSnapshot.key
      taskData[3].tasks.push(obj)
    }
  })
})
export default {
  name: 'home',
  components: {
    Navbar,
    GroupList
  },
  data: function () {
    return {
      taskLists: taskData
    }
  },
  methods: {},
  created () { },
  mounted () { }
}
</script>

<style>
.container-card {
  margin-top: 30px;
  padding-top: 5%;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  margin-left: auto;
  margin-right: auto;
  text-align: center;
  width: 90%;
  grid-gap: 20px;
}
.container {
  width: 100%;
  min-height: 675px;
  background-color: #30e07f;
  border-top-left-radius: 10%;
  border-top-right-radius: 10%;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
}
@media only screen and (max-width: 800px) {
  .container-card {
    display: block;
  }
}
</style>
