<template>
    <div>
      <ListTask :listTasks="tasks"></ListTask>
    </div>
</template>

<script>
import ListTask from '@/components/ListTask'
export default {
  name: "column",
  components: {
        ListTask
},
  props: ["tasks", "status"],
  methods: {
   
  }
};
</script>

<style>
</style>
