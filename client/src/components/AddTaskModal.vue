<template>
  <div class="modal fade" id="modal-add-task" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">New Task</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <form>
            <div class="form-group">
              <label for="recipient-name" class="col-form-label">Name:</label>
              <input type="text" class="form-control" id="recipient-name" v-model="name">
            </div>
            <div class="form-group">
              <label for="message-text" class="col-form-label">Description:</label>
              <textarea class="form-control" id="message-text" v-model="description"></textarea>
            </div>
            <div class="form-group">
              <label for="recipient-name" class="col-form-label">Point:</label>
              <input type="number" class="form-control" id="recipient-name" v-model="point">
            </div>
            <div class="form-group">
              <label for="recipient-name" class="col-form-label">Assigned To:</label>
              <input type="text" class="form-control" id="recipient-name" v-model="assignedTo">
            </div>
          </form>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-primary" data-dismiss="modal" @click="addTask">submit</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import db from '../../config/config.js';

export default {
  name: 'modal',
    data() {
      return {
        name: '',
        description: '',
        point: '',
        assignedTo: ''
      }
    },
    methods: {
      addTask() {
        let ref = db.ref('/backlog');

        ref.push({
          name: this.name,
          description: this.description,
          point: this.point,
          assigned_to: this.assignedTo
        })

        this.name = '';
        this.description = '';
        this.point = '';
        this.assignedTo = '';
      }
    }
}
</script>

<style>

</style>
