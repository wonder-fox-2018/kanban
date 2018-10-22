<template>
  <div class="container-fluid">
    <div class="row body">
      <div class="col-lg-3 p-1">
        <div class="card">
          <div class="card-header" style="background-color: red">
           <h6 class="text-white">Backlog</h6>
          </div>
          <div class="card-body">
          <Column :tasks="tasks.backlog"/>
          </div>
        </div>
      </div>
      <div class="col-lg-3 p-1">
        <div class="card">
          <div class="card-header" style="background-color: orange">
            <h6 class="text-white">Todo</h6>
          </div>
          <div class="card-body">
          <Column :tasks="tasks.todo" />
          </div>
        </div>
      </div>
      <div class="col-lg-3 p-1">
        <div class="card ">
          <div class="card-header" style="background-color: Blue">
            <h6 class="text-white">Doing</h6>
          </div>
          <div class="card-body">
          <Column :tasks="tasks.doing" />
          </div>
        </div> 
      </div>
      <div class="col-lg-3 p-1">
        <div class="card ">
          <div class="card-header" style="background-color: Green">
            <h6 class="text-white">Done</h6>
          </div>
          <div class="card-body">
          <Column :tasks="tasks.done"/>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import { mapState } from 'vuex'

import Column from '@/components/Column.vue'
export default {
  name: 'home',
  components: {
    Column
  },
  computed: {
    ...mapState( [
      'tasks'
    ])
  },
  methods: {

  },
  created () {
    this.$store.dispatch('getAllTask')
  }
}
</script>

<style>
.body {
  margin-top: 30px
}
</style>

