<template>
  <div class="card">
  <div class='statusName'>
    <div v-if='data.name=="Backlog"' style='background-color: #6280a4; margin-bottom:10px'>
      <h2>{{data.name}}</h2>
    </div>
    <div v-if='data.name=="To-Do"' style='background-color: #ff4444; margin-bottom:10px'>
      <h2>{{data.name}}</h2>
    </div>
    <div v-if='data.name=="On-Going"' style='background-color: #00ff00; margin-bottom:10px'>
      <h2>{{data.name}}</h2>
    </div>
    <div v-if='data.name=="Done"' style='background-color: #f0bd44; margin-bottom:10px; color:black'>
      <h2>{{data.name}}</h2>
    </div>
  </div>
    <ContentCard v-for="(item) in data.data" :key="item.id" :item="item" :status="item.status"></ContentCard>
  </div>
</template>

<script>
import ContentCard from '@/components/ContentCard.vue'
export default {
  name: 'KanbanCard',
  components: {
    ContentCard
  },
  data: function () {
    return {}
  },
  props: ['data'],
  created () {
    this.cardTitle = this.title
  }
}
</script>

<style scoped>
.card {
  background-color: #fffbe5;
  font-size: 10px;
  color: whitesmoke;
  width: 100%;
  min-height: 400px;
  height: 100%;
  background-color: white;
  -webkit-box-shadow: 0px 5px 4px #c0c0c09d;
  -moz-box-shadow: 0px 5px 4px #c0c0c09d;
  box-shadow: 0px 5px 4px #c0c0c09d;
  border-radius: 5px;
}

.card h2 {
  padding: 20px;
}
</style>
