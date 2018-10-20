<template>
    <div>
        <div v-for="(task,index) in updatedlisttask" :key="index" class="card" style="width: 18rem;">
            <div class="card-body">
                <h5 class="card-title">{{ task.taskdetail.title }}</h5>
                <button class="btn btn-warning"
                    v-if= "statusobject.status === 'start' || statusobject.status === 'onprogress' || statusobject.status === 'finish'"
                    v-on:click= "changebackward(task.taskid, task.taskdetail)" > {{ statusobject.backwardbutton }}</button>
                <button type="button" class="btn btn-info"
                     data-toggle="modal" data-target="#detailModal"
                     v-on:click="getdetailtask(task.taskdetail)">Detail</button>
                <button class="btn btn-success"
                    v-if= "statusobject.status === 'plan' || statusobject.status === 'start' || statusobject.status === 'onprogress'"
                    v-on:click= "changeforward(task.taskid, task.taskdetail)" > {{ statusobject.forwardbutton }}</button>
                <button v-if= "statusobject.status === 'finish' "
                    type="button" class="btn btn-danger"
                    v-on:click="deletetask(task.taskid)">Delete</button>
            </div>
        </div>
        <!-- Modal parts -->
        <div class="modal fade" id="detailModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">Detail Task</h5>
                    </div>
                    <div class="modal-body">
                        <label for="exampleInputEmail1"><h3>Title</h3></label>
                        <br>
                        <label aria-describedby="emailHelp">{{ detailtitle }}</label>
                        <hr>
                        <label for="exampleInputEmail1"><h3>Description</h3></label>
                        <br>
                        <label aria-describedby="emailHelp">{{ detaildescription }}</label>
                        <hr>
                        <label for="exampleInputEmail1"><h3>Point</h3></label>
                        <br>
                        <label aria-describedby="emailHelp"> {{ detailpoint }}</label>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary"
                            data-dismiss="modal"
                            v-on:click="closedetail()"
                            >Close</button>
                    </div>
                </div>
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
      detailtitle: '',
      detaildescription: '',
      detailpoint: ''
    }
  },
  methods: {
    getdetailtask (input) {
      console.log('Detail input----', input.title)
      this.detailtitle = input.title
      this.detaildescription = input.description
      this.detailpoint = input.point
    },
    closedetail () {
      this.detailtitle = ''
      this.detaildescription = ''
      this.detailpoint = ''
    },
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
    deletetask (taskid) {
      this.updatedlisttask = []
      db.ref(`/task/finish/${taskid}`).remove()
      this.getdetailtask()
      this.$emit('updatedlistfinish', this.updatedlisttask)
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
