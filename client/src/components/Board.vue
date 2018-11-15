<template>

<div>
	<span class="badge badge-primary">
		<h2>{{status}}</h2>
	</span>

	<div v-for="(task, index) in tasks" :key="index">
		
		<Card :task="task" @showDetail="populateDetailModal"></Card>
	</div>


</div>
	

</template>

<script>
import db from '../../config/config.js';
import Card from './Card.vue';

export default {
	name: 'Board',
	props: ['status'],
	components: {
		Card
	},
	data() {
		return {
			tasks: undefined,
			detailTask: undefined
		}
	},
	mounted() {
		this.fetchTask();
	},
	methods: {
		fetchTask() {
			let ref = db.ref(`/${this.status}`)
			ref.on('value', (result) => {
				let tasks = result.val();

				this.tasks = [];

				for (let id in tasks) {
					let currTask = tasks[id];

					let task = {
						id: id,
						name: currTask.name,
						description: currTask.description,
						point: currTask.point,
						assigned_to: currTask.assigned_to,
						status: this.status
					}

					this.tasks.push(task);
				}
			})
		},

		populateDetailModal(val) {
			
			this.detailTask = val;
		}

	}

}



/* note


db.ref('/todo').on('value', (result) => {
				let tasks = result.val();

				this.todo = []
				
				for (let id in tasks) {
					let currTask = tasks[id];

					let task = {
						id: id,
						name: currTask.name,
						point: currTask.point
					}
					this.todo.push(task);
				}
				
			})



*/
</script>

<style scoped>
	.badge {
		width: 100%;
	}

	.card {
		margin-top: 5%;
		margin-bottom: 5%;
	}

</style>



