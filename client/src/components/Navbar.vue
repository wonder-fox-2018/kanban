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
          <div id="errortask">
          </div>
          <div class="modal-body">
             <label for="exampleInputEmail1">Title</label>
             <input v-model="tasktitle" type="text" class="form-control" aria-describedby="emailHelp" placeholder="Enter Title">
             <br>
             <label for="exampleInputEmail1">Description</label>
             <textarea v-model="taskdescription" type="text" class="form-control" aria-describedby="emailHelp" placeholder="Enter Description">
             </textarea>
             <br>
             <label for="exampleInputEmail1">Point</label>
             <input v-model="taskpoint" type="text" class="form-control" aria-describedby="emailHelp" placeholder="Enter Point">
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
  data () {
    return {
      tasktitle: '',
      taskdescription: '',
      taskpoint: '',
      error: ''
    }
  },
  methods: {
    addTask () {
      // validation
      if (this.tasktitle === '' || this.taskdescription === '' || this.taskpoint === '') {
        // empty all the fields immediately
        this.tasktitle = ''
        this.taskdescription = ''
        this.taskpoint = ''
        /* eslint-disable-next-line */
        $('#errortask').empty()
        /* eslint-disable-next-line */
        $('#errortask').append(
          `<button type="button" class="btn btn-danger">All fields must not be empty!</button>`
        )
        setTimeout(() => {
          /* eslint-disable-next-line */
          $('#errortask').empty()
        }, 3000)
        // put reload due to we can't add two new task in series
        // without refresh
        // location.reload()
      } else {
        let self = this
        db.ref('/task/plan').push({
          title: self.tasktitle,
          description: self.taskdescription,
          point: self.taskpoint,
          status: 'PLAN'
        }, (error) => {
          if (!error) {
            self.tasktitle = ''
            self.taskdescription = ''
            self.taskpoint = ''
            // eslint-disable-next-line
            $('#addTaskModal').modal('hide')
            // put reload due to we can't add two new task in series
            // without refresh
            // location.reload()
          } else {
            console.log('ERROR Add Task to Firebase: ', error)
          }
        })
      }
    }
  }
}
</script>

<style>

</style>
