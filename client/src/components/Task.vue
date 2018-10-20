<template>
    <div>
        <div v-for="(task,index) in updatedlisttask" :key="index" class="card" style="width: 18rem;">
            <div class="card-body">
                <h5 class="card-title">{{ task.taskdetail.title }}</h5>
                <div id="detaildata"></div>
                <button class="btn btn-warning"
                    v-if= "statusobject.status === 'start' || statusobject.status === 'onprogress' || statusobject.status === 'finish'"
                    v-on:click= "changebackward(task.taskid, task.taskdetail)" > {{ statusobject.backwardbutton }}</button>
                <button type="button" class="btn btn-info"
                    v-on:click="getdetailtask(task.taskdetail)">Detail</button>
                <button class="btn btn-success"
                    v-if= "statusobject.status === 'plan' || statusobject.status === 'start' || statusobject.status === 'onprogress'"
                    v-on:click= "changeforward(task.taskid, task.taskdetail)" > {{ statusobject.forwardbutton }}</button>
                <button v-if= "statusobject.status === 'finish' "
                    type="button" class="btn btn-danger"
                    v-on:click="deletetask(task.taskid)">Delete</button>
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
      updatedlisttask: [],
      detaildata: {}
    }
  },
  methods: {
    getalltask () {
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
    getdetailtask (input) {
      this.detaildata = input
      this.$emit('detaildata', this.detaildata)
    },
    deletetask (taskid) {
      this.updatedlisttask = []
      db.ref(`/task/finish/${taskid}`).remove()
      this.getalltask()
      this.$emit('updatedlistfinish', this.updatedlisttask)
    },
    changebackward (taskid, taskdetail) {
      if (this.statusobject.status === 'start') {
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
      if (this.statusobject.status === 'plan') {
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
    },
    detailtitle (val) {},
    detaildescription (val) {},
    detailpoint (val) {}
  }
}
</script>

<style>

</style>
