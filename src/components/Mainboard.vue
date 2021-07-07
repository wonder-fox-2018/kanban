<template>
  <div class="home">
    <MainHeader></MainHeader>
    <div class="container">
      <div class="container-card">
        <KanbanCard v-for="(data,index) in taskLists" :key="index" :data="data"></KanbanCard>
        
      </div>
    </div>
  </div>
</template>

<script>
  import MainHeader from '@/components/MainHeader.vue'
  import KanbanCard from '@/components/KanbanCard.vue'
  import database from '../assets/config.js'
  const taskData = [{
      name: 'Pre-Log',
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
  leadsRef.on('value', function(snapshot) {
    taskData[0].tasks = []
    taskData[1].tasks = []
    taskData[2].tasks = []
    taskData[3].tasks = []
    snapshot.forEach(function(childSnapshot) {
      if (childSnapshot.val().status === 'Pre-Log') {
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
      MainHeader,
      KanbanCard
    },
    data: function() {
      return {
        taskLists: taskData
      }
    },
    methods: {},
    created() {},
    mounted() {}
  }
</script>

<style>
  .container-card {
    padding-top: 2%;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    text-align: center;
    grid-gap: 20px;
  }
  
  .container {
    min-height: 675px;
  }
  
  @media only screen and (max-width: 800px) {
    .container-card {
      display: block;
    }
  }
</style>
