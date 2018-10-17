<template>
  <div>
    <nav class="navbar navbar-expand-md navbar-dark fixed-top bg-dark">
      <a class="navbar-brand" href="#">Personal Kanban</a>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarCollapse">
        <ul class="navbar-nav mr-auto">
          <li class="nav-item active">
            <a class="nav-link" href="#"><span class="sr-only">(current)</span></a>
          </li>
        </ul>
      </div>
      <button class="btn btn-outline-success my-2 my-sm-0" data-toggle="modal" data-target="#addTaskModal" >Add Task</button>
    </nav>
    <!-- Modal Part -->
    <!-- Modal -->
    <div class="modal fade" id="addTaskModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Add Task</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
             <label for="exampleInputEmail1">Title</label>
             <input v-model="tasktitle" type="text" class="form-control" aria-describedby="emailHelp" placeholder="Enter Title">
             <label for="exampleInputEmail1">Description</label>
             <input v-model="taskdescription" type="text" class="form-control" aria-describedby="emailHelp" placeholder="Enter Description">
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
            <button type="button" class="btn btn-success" v-on:click.once="addTask()" >Add Task</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import db from '../../googlekey.js'
export default {
  name: 'Navbar',
  props: ['changestatus'],
  data () {
    return {
      tasktitle: '',
      taskdescription: '',
      taskstatus: 'PLAN'
    }
  },
  methods: {
    addTask () {
      let self = this
      db.ref('/task/plan').push({
        title: this.tasktitle,
        description: this.taskdescription,
        status: this.taskstatus
      }, (error) => {
        if (!error) {
          this.$emit('changestatus', true)
          self.tasktitle = ''
          self.taskdescription = ''
          // eslint-disable-next-line
          $('#addTaskModal').modal('hide')
        } else {
          console.log('ERROR Add Task to Firebase: ', error)
        }
      })
    }
  },
  watch: {
    changestatus (val) {}
  }
}
</script>

<style>

</style>
