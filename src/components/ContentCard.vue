<template>
  <div class="cardContent">
    <br>
      <p > {{item.title}}</p>
      <p @click='toggleShowDetail' style='color: darkblue'>Show/Hide Details...</p>
      <div v-if='showDetail'>
        <div>Description:</div>
        <p> {{item.description}}</p>
        <div>Point:</div>
        <p> {{item.point}}</p>
        <div>Assigned to:</div>
        <p>{{item.assigned}}</p>
      </div>
    <div class="container-button">
      <div>
        <h4 @click="actionOne" v-if='buttonOne'><i class="fas fa-arrow-left"></i> {{buttonOne}}</h4>
      </div>
      <div>
        <h4 @click="actionTwo" v-if="buttonTwo">{{buttonTwo}} <i class="fas fa-arrow-right"></i></h4>
      </div>
      <div>
        <h4 @click="removeItem" style='color:red'><i class="fas fa-trash-alt" ></i> Delete</h4>
      </div>
    </div>
  </div>
</template>

<script>
import database from '../assets/config.js'

export default {
  name: 'ContentCard',
  data: function () {
    return {
      buttonOne: '',
      buttonTwo: '',
      showDetail: false
    }
  },
  props: ['item', 'status'],
  methods: {
    actionOne () {
      database.ref(`/${this.item.id}`).remove()
      database.ref('/').push({
        title: this.item.title,
        assigned: this.item.assigned,
        description: this.item.description,
        point: this.item.point,
        status: this.buttonOne
      })
    },
    actionTwo () {
      database.ref(`/${this.item.id}`).remove()
      database.ref('/').push({
        title: this.item.title,
        assigned: this.item.assigned,
        description: this.item.description,
        point: this.item.point,
        status: this.buttonTwo
      })
    },
    removeItem () {
      database.ref(`/${this.item.id}`).remove()
    },
    toggleShowDetail() {
      if(this.showDetail) {
        this.showDetail = false
      } else {
        this.showDetail = true
      }
    }
  },
  created () {
    console.log('status content->',this.status)
    if (this.status === 'Backlog') {
      this.buttonOne = null
      this.buttonTwo = 'To-Do'
    } else if (this.status === 'To-Do') {
      this.buttonOne = 'Backlog'
      this.buttonTwo = 'On-Going'
    } else if (this.status === 'On-Going') {
      this.buttonOne = 'To-Do'
      this.buttonTwo = 'Done'
    } else if (this.status === 'Done') {
      this.buttonOne = 'On-Going'
      this.buttonTwo = null
    }
  }
}
</script>

<style scoped>
.cardContent {
  font-size: 10px;
  color: whitesmoke;
  width: 80%;
  min-height: 100px;
  background-color: grey;
  -webkit-box-shadow: 0px 5px 4px #c0c0c09d;
  -moz-box-shadow: 0px 5px 4px #c0c0c09d;
  box-shadow: 0px 5px 4px #c0c0c09d;
  border-radius: 5px;
  margin-left: auto;
  margin-right: auto;
  text-align: center;
  margin-bottom: 50px;
  vertical-align: middle;
  cursor: pointer;
  padding-bottom: 20px;
}

.card h2 {
  padding-top: 20px;
  font-size: 20px;
}

.container-button h4 {
  color: black;
  border: 1px solid darkblue;
  background-color: #fff;
  margin-left: auto;
  margin-right: auto;
  text-align: center;
  width: auto;
  padding: 2%;
  border-radius: 5px;
}
</style>
