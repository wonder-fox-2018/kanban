<template>
    <div>
        <nav class="navbar navbar-expand-sm navbar-dark bg-dark mb-2">
            <a class="navbar-brand" style="color:white;font-size: 30px;">KANBAN</a>
            <div class="collapse navbar-collapse" >
                <ul class="navbar-nav mr-auto">
                </ul>
                <button class="btn btn-light my-2 my-sm-0" type="button" data-toggle="modal" data-target="#AddTaskModal" >Add Task</button>
            </div>
        </nav>
        <AddModal></AddModal>
    </div>
</template>

<script>
import AddModal from '@/components/AddModal.vue'
export default {
    components: {
        AddModal
    }
}
</script>

<style>

</style>
