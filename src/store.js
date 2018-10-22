import Vue from 'vue'
import Vuex from 'vuex'
import db from './assets/config.js'

const tasks = db.ref('/')

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    tasks: [],
    backlogTasks: [],
    todoTasks: [],
    doingTasks: [],
    doneTasks: []
  },
  getters: {
    tasks (state) {
      return state.tasks
    }
  },
  mutations: {
    setTasks (state, payload) {
      console.log(payload)
      state.tasks = payload
    }
  },
  actions: {
    getAllTasks ({ commit }) {
      tasks.on('value', (snapshot) => {
        commit('setTasks', snapshot.val())
      })
    },
    addNewTask ({ commit }, payload) {
      /* eslint-disable */
      console.log(commit, '===', payload)
      tasks.push(payload).key
    },
    removeTask ({ commit }, payload) {
      console.log('delete', payload)
      tasks.child(payload).remove()
    },
    editTask ({ commit }, payload) {
      console.log('update', payload)
      db.ref(`tasks/${payload.index}`).update({
        status: payload.status
      })
    }
  }
})
