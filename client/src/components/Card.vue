<template>
<div>
    <div class="card" style="width: 100%;">
        <div class="card-body">
            <h3 class="card-title">{{task.name}}</h3>
            <div style="text-align:left">
                <p class="card-text">Description: {{task.description}}</p>
                <p class="card-text">Point: {{task.point}}</p>
                <p class="card-text">Assigned to: {{task.assigned_to}}</p>
            </div>
            <ul class="list-group list-group-flush option">
                <button class="btn btn-outline-primary" v-if="task.status !== 'backlog'" @click="moveToPrevStatus">
                    {{prevStatus}}
                </button>
                <button class="btn btn-outline-primary" v-if="task.status !== 'done'" @click="moveToNextStatus">
                    {{nextStatus}}
                </button>
                <button class="btn btn-outline-primary" @click="removeTask">
                    Remove
                </button>
            </ul>
        </div>

    </div>

</div>
</template>

<script>
import db from '../../config/config.js';

export default {
    name: 'Card',
    props: ['task'],
    components: {
       
    },
    data() {
        return {
            prevStatus: undefined,
            nextStatus: undefined
        }
    },
    methods: {
        assignButtons() {
            if (this.task.status === 'backlog') {
                this.nextStatus = 'todo';
            } else if (this.task.status === 'todo') {
                this.prevStatus = 'backlog';
                this.nextStatus = 'doing';
            } else if (this.task.status === 'doing') {
                this.prevStatus = 'todo';
                this.nextStatus = 'done';
            } else {
                this.prevStatus = 'doing';
            }
        },

        moveToPrevStatus() {
            let movedTask = this.task;
            this.removeTask();
            db.ref(`/${this.prevStatus}`).push({
                name: movedTask.name,
                description: movedTask.description,
                point: movedTask.point,
                assigned_to: movedTask.assigned_to
            });
        },

        moveToNextStatus() {
            let movedTask = this.task;
            this.removeTask();
            db.ref(`/${this.nextStatus}`).push({
                name: movedTask.name,
                description: movedTask.description,
                point: movedTask.point,
                assigned_to: movedTask.assigned_to
            });
        },

        removeTask() {
            db.ref(`/${this.task.status}/${this.task.id}`).remove();
        }
    },
    mounted() {
        this.assignButtons();
    }
}
</script>

<style scoped>
    .btn {
        margin-bottom: 3%;
    }
</style>
