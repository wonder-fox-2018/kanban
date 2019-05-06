<template>
  <div>
    <nav class="navbar navbar-light justify-content-between shadow" style="background-color: #30e07f;">
      <a class="navbar-brand"> <i class="fas fa-chevron-circle-left"></i> K A N B A N <i class="fas fa-chevron-circle-right"></i></a>
      <div class="form-inline">
        <button class="btn btn-warning my-2 my-sm-0" data-toggle="modal" data-target="#addNewTask">Add New Task</button>
      </div>
    </nav>

    <!-- Modal -->
    <div class="modal fade" id="addNewTask" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
      aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Add New Task</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
          Title :
          <br> 
          <input type="text" v-model="task_title">
          <br>
          Description :
          <br>
          <input type="text" v-model="task_description">
          <br>
          Score :
          <br>
          <input type="number" v-model="task_score">
          <br>
          Assigned To :
          <br>
          <input type="text" v-model="task_assignedto">
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-outline-success" @click="addTask()" data-dismiss="modal">Add Task</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import database from '../assets/config.js'

export default {
  name: 'Navbar',
  data() {
    return {
      task_title : '',
      task_description : '',
      task_score : '',
      task_assignedto : '',

      taskName: ''
    }
  },
  methods: {
    addTask() {
      database.ref('/').push({
        title: this.task_title,
        description : this.task_description,
        score : this.task_score,
        assignedto : this.task_assignedto,
        status: 'Back-Log'
      })
      this.task_title = ''
      this.task_description = ''
      this.task_score = ''
      this.task_assignedto = ''
    }
  }
}
</script>

<style scoped>
/* .nav {
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
} */
</style>