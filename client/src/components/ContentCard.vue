<template>
  <div class="card border border-dark mb-5 shadow rounded" style="width: 100%;background-color: #7bff7b;">
    <div class="card-body">
      <h4 class="card-title"><b>{{item.title}}</b></h4>
    </div>
    <ul class="list-group list-group-flush rounded-top rounded-bottom rounded-left rounded-right" style="width:100%;">
      <li class="list-group-item mr-2 ml-2"><b>Description :</b> {{item.description}}</li>
      <li class="list-group-item mr-2 ml-2"><b>Score :</b> {{item.score}}</li>
      <li class="list-group-item mr-2 ml-2"><b>Assigned To :</b> {{item.assignedto}}</li>
    </ul>
    <div class="container-button mt-4 mb-4">
      <button @click="removeItem" class="btn-sm btn-danger mb-2"><i class="fas fa-trash"></i></button>
      <br>
      <button @click="moveForward" v-if="previous" class="btn-sm btn-info"><i class="fas fa-backward"></i> {{previous}}</button>
      <button @click="moveBackward" v-if="next" class="btn-sm btn-sm btn-success ml-1">{{next}} <i class="fas fa-forward"></i></button>
    </div>
  </div>
</template>

<script>
import database from '../assets/config.js'
export default {
  name: 'ContentCard',
  data: function () {
    return {
      previous: '',
      next: ''
    }
  },
  props: ['item', 'name'],
  methods: {
    moveForward () {
      database.ref(`/${this.item.id}`).remove()
      database.ref('/').push({
        title: this.item.title,
        status: this.previous,
        description : this.item.description,
        score : this.item.score,
        assignedto : this.item.assignedto
      })
    },
    moveBackward () {
      database.ref(`/${this.item.id}`).remove()
      database.ref('/').push({
        title: this.item.title,
        status: this.next,
        description : this.item.description,
        score : this.item.score,
        assignedto : this.item.assignedto
      })
    },
    removeItem () {
      database.ref(`/${this.item.id}`).remove()
    }
  },
  created () {
    if (this.name === 'Back-Log') {
      this.previous = null
      this.next = 'To-Do'
    } else if (this.name === 'To-Do') {
      this.previous = 'Back-Log'
      this.next = 'On-Going'
    } else if (this.name === 'On-Going') {
      this.previous = 'To-Do'
      this.next = 'Finished'
    } else if (this.name === 'Finished') {
      this.previous = 'On-Going'
      this.next = null
    }
  }
}
</script>

<style>
</style>