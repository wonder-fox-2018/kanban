<template>
<div>
<nav class="navbar navbar-dark bg-primary">
    <a class="navbar-brand" href="#">Kanban</a>
    
     <button class="btn btn-success my-2 my-sm-0" data-toggle="modal" data-target="#modal-add-task">New task</button>
    
</nav>
    <add-task-modal></add-task-modal>
</div>
</template>

<script>
import AddTaskModal from './AddTaskModal';

export default {
    name: 'Navbar',
    components: {
        AddTaskModal
    },
}
</script>

<style>

</style>
