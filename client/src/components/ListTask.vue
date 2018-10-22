<template>
    <div>
        <div class="card text-center" v-for="(task, index) in listTasks" v-bind:key="index">
            <div class="card-header text-left">
               <b> {{task.title}} </b>
            </div>
            <div class="card-body text-left">
                <p class="card-text">Point: {{task.point}} </p>
                <p class="card-text">Assigned To: {{task.assignedTo}}  </p>
            </div>
            <div class="card-footer text-muted">
                <button class="btn btn-primary btn-sm" v-if="task.status == 'backlog'" data-toggle="modal" data-target="#modalBl" @click="getDetail(task, index, task.status)">show detail</button>
                <button class="btn btn-primary btn-sm" v-if="task.status == 'todo'" data-toggle="modal" data-target="#modalTodo"  @click="getDetail(task, index, task.status)">show detail </button>
                <button class="btn btn-primary btn-sm"  v-if="task.status == 'doing'" data-toggle="modal"  data-target="#modalDoing"  @click="getDetail(task, index, task.status)">show detail</button>
                <button  class="btn btn-primary btn-sm" v-if="task.status == 'done'" data-toggle="modal" data-target="#modalDone" @click="getDetail(task, index, task.status)">show detail</button>
            </div>
        </div>
        <BacklogModal v-if="isBacklog" :detail="task" :indexId="id"></BacklogModal>
        <TodoModal v-if="isTodo" :detail="task" :indexId="id"></TodoModal>
        <DoingModal v-if="isDoing" :detail="task" :indexId="id"></DoingModal>
        <DoneModal v-if="isDone" :detail="task" :indexId="id"></DoneModal>
    </div>
</template>

<script>
/* eslint-disable */
import BacklogModal from '@/components/BacklogModal'
import TodoModal from '@/components/TodoModal'
import DoingModal from '@/components/DoingModal'
import DoneModal from '@/components/DoneModal'
export default {
    props: ["listTasks"],
    data () {
        return {
            task: {},
            id: '',
            status: '',
            isBacklog: false,
            isTodo: false,
            isDoing: false,
            isDone: false,
        }
    },
    components: {
        BacklogModal,
        TodoModal,
        DoingModal,
        DoneModal,
    },
    methods: {
        getDetail(task, id, status) {
            this.task = task
            this.id = id
            this.status = status
            if (this.status == 'backlog') {
                this.isBacklog = true
            } else if (this.status == 'todo' ){
                this.isTodo = true
            } else if (this.status == 'doing' ){
                this.isDoing = true
            } else if (this.status == 'done' ){
                this.isDone = true
            }
        }
    }
};
</script>

<style>
</style>
