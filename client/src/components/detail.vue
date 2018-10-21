<template>
  <div id='detail'>
    <div class="card">
      <div class="card-body">
        <h5 class="card-title"><strong>{{ detailed.title }}</strong></h5>
        <table class="table card-text text-left ml-2">
          <tbody>
            <tr>
              <th scope="row">Desc</th>
              <td>{{ detailed.desc }}</td>
            </tr>
            <tr>
              <th scope="row">Point</th>
              <td>{{ detailed.point }}</td>
            </tr>
            <tr>
              <th scope="row">Assigned To</th>
              <td>{{ detailed.assignedTo }}</td>
            </tr>
          </tbody>
        </table>
        <button class="btn btn-backlog mt-0 mb-4" v-on:click='movePrev()' v-if='detailed.from === "To-Do"'>Back-Log</button>
        <button class="btn btn-todo mt-0 mb-4" v-on:click='movePrev()' v-else-if='detailed.from === "Doing"'>To-Do</button>
        <button class="btn btn-doing mt-0 mb-4" v-on:click='movePrev()' v-else-if='detailed.from === "Done"'>Doing</button>
        <button class="btn btn-todo mt-0 mb-4" v-on:click='moveNext()' v-if='detailed.from === "Back-Log"'>To-Do</button>
        <button class="btn btn-doing mt-0 mb-4" v-on:click='moveNext()' v-if='detailed.from === "To-Do"'>Doing</button>
        <button class="btn btn-done mt-0 mb-4" v-on:click='moveNext()' v-else-if='detailed.from === "Doing"'>Done</button>
        <br>
        <button class="btn" :class="{'btn-backlog': detailed.from === 'Back-Log', 'btn-todo': detailed.from === 'To-Do', 'btn-doing': detailed.from === 'Doing', 'btn-done': detailed.from === 'Done'}" @click='deleteTask(detailed.key)'>Delete</button>
        <button class="btn" :class="{'btn-backlog': detailed.from === 'Back-Log', 'btn-todo': detailed.from === 'To-Do', 'btn-doing': detailed.from === 'Doing', 'btn-done': detailed.from === 'Done'}" @click='showdetail()'>Close Detail</button>
      </div>
    </div>
  </div>
</template>

<script>
import db from '../../config.js'

export default {
  name: 'detail',
  props: ['detailed', 'showdetail'],
  methods: {
    movePrev () {
      db.ref(`${this.detailed.key}`).update({
        status: this.detailed.status - 1
      })
      this.showdetail()
    },
    moveNext () {
      db.ref(`${this.detailed.key}`).update({
        status: this.detailed.status + 1
      })
      this.showdetail()
    },
    deleteTask (key) {
      db.ref(`/${key}`).remove()
      this.showdetail()
    }
  }
}
</script>

<style>

</style>
