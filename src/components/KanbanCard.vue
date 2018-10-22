<template>
  <div class="card">
    <h2>{{data.name}}</h2>
    <ContentCard v-for="(item) in data.tasks" :key="item.id" :item="item" :name="data.name"></ContentCard>
  </div>
</template>

<script>
  import ContentCard from '@/components/ContentCard.vue'
  export default {
    name: 'KanbanCard',
    components: {
      ContentCard
    },
    data: function() {
      return {}
    },
    props: ['data'],
    created() {
      this.cardTitle = this.title
    }
  }
</script>

<style scoped>
  .card {
    font-size: 10px;
    color: #4684f6;
    width: 100%;
    min-height: 400px;
    height: 100%;
    background-color: white;
    box-shadow: 0px 0px 5px 5px #c0c0c09d;
  }
  
  .card h2 {
    padding: 5px;
  }
</style>