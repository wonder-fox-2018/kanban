<template>
  <div>
    <div v-for="(task,index) in finishedtask" :key="index" class="card" style="width: 18rem;">
        <div class="card-body">
            <h5 class="card-title">{{ task.taskdetail.title }}</h5>
            <p class="card-text">{{ task.taskdetail.description }}</p>
            <button class="btn btn-danger" v-on:click= "changebackward(task.taskid, task.taskdetail)" >On Progress</button>
        </div>
    </div>
  </div>
</template>
<script>
import db from '../../googlekey.js'
export default {
  name: 'Finished',
  data () {
    return {
      finishedtask: []
    }
  },
  methods: {
    getfinished () {
      let self = this
      let obj = {}
      db.ref('/task/finish/').on('value', function (snapshot) {
        self.finishedtask = []
        snapshot.forEach(detailsnapshot => {
          obj.taskid = detailsnapshot.key
          obj.taskdetail = detailsnapshot.val()
          self.finishedtask.push(obj)
          obj = {}
        })
      })
    },
    changebackward (taskid, taskdetail) {
      let self = this
      db.ref(`/task/finish/${taskid}`).remove()
      db.ref('/task/onprogress').push({
        title: taskdetail.title,
        description: taskdetail.description,
        status: 'ONPROGRESS'
      }, (error) => {
        if (!error) {
          self.getfinished()
        } else {
          console.log('ERROR Get Data after change status back to on progress ', error)
        }
      })
    }
  },
  created () {
    this.getfinished()
  }
}
</script>

<style>

</style>
