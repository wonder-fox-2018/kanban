<template>
  <div>
    <div v-for="(task,index) in starttask" :key="index" class="card" style="width: 18rem;">
        <div class="card-body">
            <h5 class="card-title">{{ task.taskdetail.title }}</h5>
            <p class="card-text">{{ task.taskdetail.description }}</p>
            <button class="btn btn-danger" v-on:click= "changebackward(task.taskid, task.taskdetail)" >Plan</button>
            <button class="btn btn-success" v-on:click= "changeforward(task.taskid, task.taskdetail)" >Ongoing</button>
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
      this.starttask = []
      let self = this
      let obj = {}
      db.ref('/task/start').on('value', function (snapshot) {
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
        status: 'START'
      }, (error) => {
        if (!error) {
          this.$emit('changestatus', true)
          self.getallstart()
        }
      })
    }
  },
  created () {
    this.getallstart()
    // this.starttask = []
    // let self = this
    // let obj = {}
    // db.ref('/task/start').on('value', function (snapshot) {
    //   snapshot.forEach(detailsnapshot => {
    //     console.log('Start Detail Created----', detailsnapshot.val())
    //     obj.taskid = detailsnapshot.key
    //     obj.taskdetail = detailsnapshot.val()
    //     self.starttask.push(obj)
    //     obj = {}
    //   })
    // })
  },
  watch: {
    changestatus (val) {
      console.log('Start task watch -----', val)
      this.getallstart()
      return this.$emit('changestatus', false)
    }
  }
}
</script>

<style>

</style>
