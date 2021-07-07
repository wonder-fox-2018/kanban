<template>
  <div class="main-header">
    <h1>8Kanban</h1>
    <input type="text" placeholder="Input Task Here" v-model="taskName">
    <input type="submit" style="width: 70px;" @click="sendItem">
  </div>
</template>

<script>
  import database from '../assets/config.js'
  export default {
    name: 'MainHeader',
    data() {
      return {
        taskName: ''
       }
    },
    methods: {
      sendItem() {
        database.ref('/').push({
          title: this.taskName,
          status: 'Pre-Log'
        })
        this.taskName = ''
      }
    }
  }
</script>

<style scoped>
  html,
  body {
    font-family: 'Lato';
    margin: 0;
    padding: 0;
    overflow-x: hidden;
  }
  
  h1,
  h2,
  h3 {
    padding: 0;
    margin: 0;
  }
  
  .main-header h1 {
    color: #2672ff;
    margin-left: auto;
    margin-left: auto;
    text-align: center;
    font-size: 35px;
  }
  
  .main-header i {
    font-size: 40px;
    color: #1969fd;
    text-align: center;
    margin-left: auto;
    margin-right: auto;
    display: block;
    cursor: pointer;
  }
  
  .main-header input {
    display: block;
    margin-left: auto;
    margin-right: auto;
    text-align: center;
  }
  
  input {
    height: 30px;
    width: 300px;
    margin-bottom: 20px;
    margin-top: 20px;
    border-radius: 5px;
  }
</style>
