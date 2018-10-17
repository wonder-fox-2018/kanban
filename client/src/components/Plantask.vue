<template>
    <div>
        <div v-for="(task,index) in plantask" :key="index" class="card" style="width: 18rem;">
            <div class="card-body">
                <h5 class="card-title">{{ task.taskdetail.title }}</h5>
                <p class="card-text">{{ task.taskdetail.description }}</p>
                <button class="btn btn-success" v-on:click= "changeforward(task.taskid, task.taskdetail)" >Start</button>
            </div>
        </div>
    </div>
</template>
<script>
import db from '../../googlekey.js'
export default {
  name: 'Plantask',
  props: ['changestatus'],
  data () {
    return {
      plantask: []
    }
  },
  methods: {
    getallplan () {
      let self = this
      let obj = {}
      db.ref('/task/plan').on('value', function (snapshot) {
        self.plantask = []
        snapshot.forEach(detailsnapshot => {
          obj.taskid = detailsnapshot.key
          obj.taskdetail = detailsnapshot.val()
          self.plantask.push(obj)
          obj = {}
        })
      })
    },
    changeforward (taskid, taskdetail) {
      this.plantask = []
      let self = this
      // delete and insert new to google firebase
      db.ref(`/task/plan/${taskid}`).remove()
      db.ref('/task/start').push({
        title: taskdetail.title,
        description: taskdetail.description,
        status: 'START'
      }, (error) => {
        if (!error) {
          this.$emit('changestatus', true)
          self.getallplan()
        } else {
          console.log('ERROR Get Data after change status to start ', error)
        }
      })
    }
  },
  created () {
    // get data from google
    this.getallplan()
  }
//   ,
//   watch: {
//     changestatus (val) {
//       this.getallplan()
//       return this.$emit('changestatus', false)
//     }
//   }
}
</script>

<style>

</style>
