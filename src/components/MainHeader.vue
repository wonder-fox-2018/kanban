<template>
  <div class="main-header">
    <h1>Kanban Ku</h1>
    <i class="fas fa-plus-circle" @click='dialog=true' style='color:teal'> Add New Task</i><br>
    <v-dialog v-model="dialog" persistent max-width="500px">
      <v-card>
        <v-card-title>
          <span class="headline">Add Task</span>
        </v-card-title>
        <v-card-text>
          <v-container grid-list-md>
            <v-form v-model="valid" ref="form" lazy-validation>
              <v-layout wrap>
                <v-flex xs12>
                  <v-text-field 
                    v-model="form.title"
                    label="Task Title"
                    :rules="titleRules"
                    required
                  >
                  </v-text-field>
                </v-flex>
                <v-flex xs12>
                <v-textarea
                    name="title"
                    v-model="form.description"
                    label="Description"
                    :rules="descriptionRules"
                    multi-line
                    required
                  ></v-textarea>
                </v-flex>
                <v-flex xs12>
                  <v-text-field 
                    label="Point" 
                    required
                    v-model="form.point"
                    :rules="pointRules"
                    placeholder="0 - 100"
                    suffix="%"
                    :mask="mask"
                  >
                  </v-text-field>
                </v-flex>
                <v-flex xs12>
                  <v-text-field 
                    v-model="form.assigned"
                    label="Assigned To" 
                    required
                    :rules="assignedRules"
                  >
                  </v-text-field>
                </v-flex>
              </v-layout>
            </v-form>
          </v-container>
          <small>*indicates required field</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="orange" dark @click="clear()">Clear</v-btn>
          <v-btn color="red" dark @click.native="dialog = false">Close</v-btn>
          <v-btn color="blue" dark :disabled="!valid" @click="addTask(form)">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import database from '../assets/config.js'

export default {
  name: 'MainHeader',
  data () {
    return {
      taskName: '',
      valid: true,
      dialog: false,
      form: {
        title: '',
        description: '',
        point: 0,
        assigned: '',
        status: ''
      },
      titleRules: [(v) => !!v || 'Title is required'],
      descriptionRules: [(v) => !!v || 'Description is required'],
      pointRules: [
        (v) => !!v || 'Point is required',
        (v) => v <= 100 || 'Point mush be 0 - 100'
      ],
      assignedRules: [(v) => !!v || 'Assigned is required'],
      mask: '###'
    }
  },
  methods: {
    sendItem () {
      database.ref('/').push({
        title: this.taskName,
        status: 'Backlog'
      })
      this.taskName = ''
    },
    addTask (data) {
      if (this.$refs.form.validate()) {
        data.status = 'Backlog'
        this.$store.dispatch('addNewTask', data)
        this.dialog = false
        this.$refs.form.reset()
      }
    },
    clear () {
      this.$refs.form.reset()
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
.main-header {
  background-color:black;
}
.main-header h1 {
  color: grey;
  margin-left: auto;
  margin-left: auto;
  text-align: center;
  border-top: slategrey 3px solid;
  padding-top: 1.5%;
  font-size: 35px;
}
.main-header i {
  font-size: 20px;
  color: grey;
  text-align: center;
  margin-left: auto;
  margin-right: auto;
  display: block;
  margin-top: 50px;
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
}
</style>
