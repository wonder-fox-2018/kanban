<template>
   <div>
    <div v-for="(task,index) in onprogresstask" :key="index" class="card" style="width: 18rem;">
        <div class="card-body">
            <h5 class="card-title">{{ task.taskdetail.title }}</h5>
            <p class="card-text">{{ task.taskdetail.description }}</p>
            <button class="btn btn-danger" v-on:click= "changebackward(task.taskid, task.taskdetail)" >Start</button>
            <button class="btn btn-success" v-on:click= "changeforward(task.taskid, task.taskdetail)" >Finish</button>
        </div>
    </div>
  </div>
</template>
<script>
import db from '../../googlekey.js'
export default {
  name: 'Onprogress',
  data () {
    return {
      onprogresstask: []
    }
  },
  methods: {
    getallonprogress () {
      let self = this
      let obj = {}
      db.ref('/task/onprogress').on('value', function (snapshot) {
        self.onprogresstask = []
        snapshot.forEach(detailsnapshot => {
          obj.taskid = detailsnapshot.key
          obj.taskdetail = detailsnapshot.val()
          self.onprogresstask.push(obj)
          obj = {}
        })
      })
    },
    changebackward (taskid, taskdetail) {
      let self = this
      db.ref(`/task/onprogress/${taskid}`).remove()
      db.ref('/task/start').push({
        title: taskdetail.title,
        description: taskdetail.description,
        status: 'START'
      }, (error) => {
        if (!error) {
          this.$emit('changestatus', true)
          self.getallonprogress()
        } else {
          console.log('ERROR Get Data after change status back to start ', error)
        }
      })
    },
    changeforward (taskid, taskdetail) {
      let self = this
      db.ref(`/task/onprogress/${taskid}`).remove()
      db.ref('/task/finish').push({
        title: taskdetail.title,
        description: taskdetail.description,
        status: 'FINISHED'
      }, (error) => {
        if (!error) {
          this.$emit('changestatus', true)
          self.getallonprogress()
        } else {
          console.log('ERROR Get Data after change status to finished ', error)
        }
      })
    }
  },
  created () {
    this.getallonprogress()
  }
}
</script>

<style>

</style>
