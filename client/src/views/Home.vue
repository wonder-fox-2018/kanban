<template>
<div class="home">
	<div class="row">
		<div class="col-sm-3" v-for="(title, index) in boardTitles" :key="index">
			
			<Board :status="title"></Board>

		</div>
	</div>
</div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
import Board from '../components/Board';


export default {
name: 'home',
	components: {
		HelloWorld,
		Board
	},
	data() {
		return {
			boardTitles: ['backlog', 'todo', 'doing', 'done']
		}
	},
	created() {

		/* this.getDb(); */
	},
	methods: {

	}
}
</script>
