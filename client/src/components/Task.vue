<template>
    <div>
        <div v-for="(task,index) in updatedlisttask" :key="index" class="card" style="width: 18rem;">
            <div class="card-body">
                <h5 class="card-title">{{ task.taskdetail.title }}</h5>
                <button class="btn btn-danger"
                    v-if= "statusobject.status === 'start' || statusobject.status === 'onprogress' || statusobject.status === 'finish'"
                    v-on:click= "changebackward(task.taskid, task.taskdetail)" > {{ statusobject.backwardbutton }}</button>
                <button class="btn btn-success"
                    v-if= "statusobject.status === 'plan' || statusobject.status === 'start' || statusobject.status === 'onprogress'"
                    v-on:click= "changeforward(task.taskid, task.taskdetail)" > {{ statusobject.forwardbutton }}</button>
            </div>
        </div>
    </div>
</template>

<script>
import db from '../../googlekey.js'
export default {
  name: 'Task',
  props: ['listtask', 'statusobject'],
  data () {
    return {
      updatedlisttask: []
    }
  },
  methods: {
    getalltask () {
    //   console.log('OK GET DATA LAGI')
      let self = this
      let obj = {}
      db.ref(`/task/${this.statusobject.status}`).on('value', function (snapshot) {
        self.updatedlisttask = []
        snapshot.forEach(detailsnapshot => {
          obj.taskid = detailsnapshot.key
          obj.taskdetail = detailsnapshot.val()
          self.updatedlisttask.push(obj)
          obj = {}
        })
      })
    },
    changebackward (taskid, taskdetail) {
      // console.log('Backward-----', taskid, taskdetail)
      if (this.statusobject.status === 'start') {
        // console.log('STATUS-----', this.statusobject.status)
        this.updatedlisttask = []
        let self = this
        // delete and insert new to google firebase
        db.ref(`/task/start/${taskid}`).remove()
        db.ref('/task/plan').push({
          title: taskdetail.title,
          description: taskdetail.description,
          point: taskdetail.point,
          status: 'PLAN'
        }, (error) => {
          if (!error) {
            self.getalltask()
            this.$emit('updatedliststart', self.updatedlisttask)
          } else {
            console.log('ERROR Get Data after change status to start ', error)
          }
        })
      } else if (this.statusobject.status === 'onprogress') {
        // console.log('STATUS-----', this.statusobject.status)
        this.updatedlisttask = []
        let self = this
        // delete and insert new to google firebase
        db.ref(`/task/onprogress/${taskid}`).remove()
        db.ref('/task/start').push({
          title: taskdetail.title,
          description: taskdetail.description,
          point: taskdetail.point,
          status: 'START'
        }, (error) => {
          if (!error) {
            self.getalltask()
            this.$emit('updatedlistonprogress', self.updatedlisttask)
          } else {
            console.log('ERROR Get Data after change status to on progress ', error)
          }
        })
      } else if (this.statusobject.status === 'finish') {
        // console.log('STATUS-----', this.statusobject.status)
        this.updatedlisttask = []
        let self = this
        // delete and insert new to google firebase
        db.ref(`/task/finish/${taskid}`).remove()
        db.ref('/task/onprogress').push({
          title: taskdetail.title,
          description: taskdetail.description,
          point: taskdetail.point,
          status: 'ONPROGRESS'
        }, (error) => {
          if (!error) {
            self.getalltask()
            this.$emit('updatedlistfinish', self.updatedlisttask)
          } else {
            console.log('ERROR Get Data after change status to on progress ', error)
          }
        })
      }
    },
    changeforward (taskid, taskdetail) {
      // console.log('Forward-----', taskid, taskdetail)
      if (this.statusobject.status === 'plan') {
        // console.log('STATUS-----', this.statusobject.status)
        this.updatedlisttask = []
        let self = this
        // delete and insert new to google firebase
        db.ref(`/task/plan/${taskid}`).remove()
        db.ref('/task/start').push({
          title: taskdetail.title,
          description: taskdetail.description,
          point: taskdetail.point,
          status: 'START'
        }, (error) => {
          if (!error) {
            self.getalltask()
            this.$emit('updatedlistplan', self.updatedlisttask)
          } else {
            console.log('ERROR Get Data after change status to start ', error)
          }
        })
      } else if (this.statusobject.status === 'start') {
        // console.log('STATUS-----', this.statusobject.status)
        this.updatedlisttask = []
        let self = this
        // delete and insert new to google firebase
        db.ref(`/task/start/${taskid}`).remove()
        db.ref('/task/onprogress').push({
          title: taskdetail.title,
          description: taskdetail.description,
          point: taskdetail.point,
          status: 'ONPROGRESS'
        }, (error) => {
          if (!error) {
            self.getalltask()
            this.$emit('updatedliststart', self.updatedlisttask)
          } else {
            console.log('ERROR Get Data after change status to on progress ', error)
          }
        })
      } else if (this.statusobject.status === 'onprogress') {
        // console.log('STATUS-----', this.statusobject.status)
        this.updatedlisttask = []
        let self = this
        // delete and insert new to google firebase
        db.ref(`/task/onprogress/${taskid}`).remove()
        db.ref('/task/finish').push({
          title: taskdetail.title,
          description: taskdetail.description,
          point: taskdetail.point,
          status: 'FINISH'
        }, (error) => {
          if (!error) {
            self.getalltask()
            this.$emit('updatedlistonprogress', self.updatedlisttask)
          } else {
            console.log('ERROR Get Data after change status to finish ', error)
          }
        })
      }
    }
  },
  created () {
    this.updatedlisttask = []
    this.updatedlisttask = this.listtask
  },
  watch: {
    listtask (val) {
      this.updatedlisttask = []
      this.updatedlisttask = val
      // console.log('test list task----', val)
    }
  }
}
</script>

<style>

</style>
