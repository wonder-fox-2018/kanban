<template>
  <div class="card" style="width: 100%;background-color: #30e07f;border: none;">
    <span class="border border-dark shadow p-3 rounded" style="background-color: #7bff7b;">
      <h2>{{data.name}}</h2>
    </span>
    <br>
    <ContentCard v-for="(item) in data.tasks" :key="item.id" :item="item" :name="data.name"></ContentCard>
  </div>
</template>

<script>
import ContentCard from '@/components/ContentCard.vue'
export default {
  name: 'GroupList',
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

<style>

</style>