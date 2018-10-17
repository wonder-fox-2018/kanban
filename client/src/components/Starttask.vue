<template>
  <div>
    <div v-for="(task,index) in starttask" :key="index" class="card" style="width: 18rem;">
        <div class="card-body">
            <h5 class="card-title">{{ task.taskdetail.title }}</h5>
            <p class="card-text">{{ task.taskdetail.description }}</p>
            <button class="btn btn-danger" v-on:click= "changebackward(task.taskid, task.taskdetail)" >Plan</button>
            <button class="btn btn-success" v-on:click= "changeforward(task.taskid, task.taskdetail)" >On Progress</button>
        </div>
    </div>
  </div>
</template>
<script>
import db from '../../googlekey.js'
export default {
  name: 'Starttask',
  props: ['changestatus'],
  data () {
    return {
      starttask: []
    }
  },
  methods: {
    getallstart () {
      let self = this
      let obj = {}
      db.ref('/task/start').on('value', function (snapshot) {
        self.starttask = []
        snapshot.forEach(detailsnapshot => {
          // console.log('Start Detail----', detailsnapshot.val())
          obj.taskid = detailsnapshot.key
          obj.taskdetail = detailsnapshot.val()
          self.starttask.push(obj)
          obj = {}
        })
      })
    },
    changebackward (taskid, taskdetail) {
      let self = this
      db.ref(`/task/start/${taskid}`).remove()
      db.ref('/task/plan').push({
        title: taskdetail.title,
        description: taskdetail.description,
        status: 'PLAN'
      }, (error) => {
        if (!error) {
          this.$emit('changestatus', true)
          self.getallstart()
        } else {
          console.log('ERROR Get Data after change status back to plan ', error)
        }
      })
    },
    changeforward (taskid, taskdetail) {
      let self = this
      db.ref(`/task/start/${taskid}`).remove()
      db.ref('/task/onprogress').push({
        title: taskdetail.title,
        description: taskdetail.description,
        status: 'ONPROGRESS'
      }, (error) => {
        if (!error) {
          this.$emit('changestatus', true)
          self.getallstart()
        } else {
          console.log('ERROR Get Data after change status to on progress ', error)
        }
      })
    }
  },
  created () {
    this.getallstart()
  }
}
</script>

<style>

</style>
