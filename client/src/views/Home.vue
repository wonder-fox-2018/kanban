<template>
  <div class="home row mx-auto">
    <div class="col-12 mt-2 mb-4">
      <button id='newTaskBtn' class="btn regBtn" v-on:click='newTaskModal()'><b>+ New Task</b></button>
    </div>
    <logcomp :title='"Back-Log"' :logs='backlog' :bgcolor='"#2c112b"' :showdetail='showDetail'></logcomp>
    <logcomp :title='"To-Do"' :logs='todo' :bgcolor='"#520833"' :showdetail='showDetail'></logcomp>
    <logcomp :title='"Doing"' :logs='doing' :bgcolor='"#c72a40"' :showdetail='showDetail'></logcomp>
    <logcomp :title='"Done"' :logs='done' :bgcolor='"#ff6c40"' :showdetail='showDetail'></logcomp>


    <!-- MODALS -->
    <div id='backdrop' v-if='showBackdrop'></div>

    <div v-if='openNTM'>
      <div id='newTask'>
        <button class='closeModal float-right mr-2 mt-2' v-on:click="newTaskModal()">X</button>
        <h5 class="mt-4 border-bottom pb-4">+ New Task</h5>
        <div id='newTaskInput'>
          <input v-model='newtitle' type="text" placeholder="Title"><br><br>
          <textarea rows=2 v-model='newdesc' placeholder="Short description"></textarea><br><br>
          <input v-model="newpoint" type="text" placeholder="Point"><br><br>
          <input v-model="newassign" type="text" placeholder="Assigned To"><br><br>
        </div>
        <h6 v-if='noblank' class='alert my-alert'>You must not leave any field blank</h6>
        <h6 v-else-if='pointguard' class='alert my-alert'>Point must be a number</h6>
        <h6 v-else class="placeholder alert alert-white">.</h6>
        <button class='btn regBtn mx-2 my-4 ntmBtn' v-on:click="newTaskModal()">Cancel</button>
        <button class='btn regBtn mx-2 my-4 ntmBtn' v-on:click="newTask()">Add Task</button><br>
      </div>
    </div>

    <div v-if='openDetail'>
      <detail :detailed='detailed' :showdetail='showDetail'></detail>
    </div>

  </div>
</template>

<script>
import db from '../../config.js'
import logcomp from '@/components/logcomp.vue'
import detail from '@/components/detail.vue'

export default {
  name: 'home',
  components: {
    logcomp,
    detail
  },
  data: function () {
    return {
      backlog: [],
      todo: [],
      doing: [],
      done: [],
      newtitle: '',
      newdesc: '',
      newpoint: '',
      newassign: '',
      pointguard: false,
      noblank: false,
      showBackdrop: false,
      openNTM: false,
      openDetail: false,
      detailed: {}
    }
  },
  methods: {
    getAll () {
      this.get(0, 'backlog')
      this.get(1, 'todo')
      this.get(2, 'doing')
      this.get(3, 'done')
    },
    get (num, title) {
      db.ref('/').orderByChild('status').equalTo(num).on('value', snapshot => {
        this[title] = snapshot.val()
      })
    },
    newTaskModal: function () {
      this.openNTM = !this.openNTM
      this.showBackdrop = !this.showBackdrop
      this.newtitle = ''
      this.newdesc = ''
      this.newpoint = ''
      this.newassign = ''
      this.pointguard = false
      this.noblank = false
    },
    newTask: function () {
      if (this.newtitle.length === 0 || this.newdesc.length === 0 || this.newpoint.length === 0 || this.newassign.length === 0) {
        this.pointguard = false
        this.noblank = true
      } else if (Number(this.newpoint) + 0 !== Number(this.newpoint)) {
        this.pointguard = true
        this.noblank = false
      } else {
        this.noblank = false
        this.pointguard = false
        db.ref('/').push({
          title: this.newtitle,
          desc: this.newdesc,
          point: this.newpoint,
          assignedTo: this.newassign,
          status: 0
        })
          .then(snapshot => {
            db.ref(`${snapshot.key}`).update({
              key: snapshot.key
            })
            this.get0()
          })
          .catch(err => {
            console.log(err)
          })
        this.newTaskModal()
      }
    },
    showDetail (log, title) {
      if (log && title) {
        this.detailed = log
        this.detailed.from = title
        this.showBackdrop = true
        this.openDetail = true
      } else {
        this.showBackdrop = false
        this.openDetail = false
      }
    }
  },
  created () {
    this.getAll()
  }
}
</script>

<style>
  .home {
    width: 90%;
  }
  button {
    color: white !important;
    font-weight: bold !important;
  }
  button:focus {
    outline: none;
  }
  #newTaskBtn {
    width: 100%;
  }
  .regBtn {
    background: #1a0a19;
  }
  .regBtn:hover {
    background: #6b586a;
  }
  .ntmBtn {
    width: 40%;
    margin: 5%;
  }
  .my-alert {
    background: #6b586a;
    color: white;
  }
  .colHead {
    color: white;
    font-family: 'Poppins', sans-serif;
    width: 100%;
  }
  .colHead .card {
    width: 100%;
  }
  .placeholder {
    color: white;
  }
  #backdrop {
    position: fixed;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    background: rgba(51,51,51,0.8);
    z-index: 2000;
  }
  .closeModal {
    border: none;
    background-color: white;
    font-size: 15px;
    cursor: pointer;
  }
  #newTask {
    position: fixed;
    background-color: white;
    left: 35%;
    top: 10%;
    width: 30%;
    max-height: 80%;
    overflow: auto;
    z-index: 2001;
  }
  #newTaskInput textarea {
    width: 90%;
    margin-top: 1%;
    padding: 10px 15px;
    font-size: 16px;
  }
  #newTaskInput input {
    width: 90%;
    margin-top: 1%;
    font-size: 20px;
    padding: 10px;
  }
  #detail {
    position: fixed;
    background-color: white;
    left: 37.5%;
    width: 25%;
    height: 25%;
    z-index: 2001;
  }
  #detail button {
    width: 40%;
    margin: 0px 5%;
    height: 10%;
  }
  .btn-backlog {
    background: #2c112b
  }
  .btn-todo {
    background: #520833
  }
  .btn-doing {
    background: #c72a40
  }
  .btn-done {
    background: #ff6c40
  }
</style>
