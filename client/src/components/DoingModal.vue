<template>
    <div class="modal fade" id="modalDoing" tabindex="-1" role="dialog" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" >Detail {{detail.title}}</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body" style="text-align: left">
                    <table class="table">
                            <tr>
                                <th scope="row">Title</th>
                                <td> {{detail.title}} </td>
                            </tr>
                            <tr>
                                <th scope="row">Point</th>
                                <td> {{detail.point}} </td>
                            </tr>
                            <tr>
                                <th scope="row">Description</th>
                                <td> {{detail.description}} </td>
                            </tr>
                        </table>
                        <hr>
                    <center> 
                        <button type="button" class="btn btn-success mr-1" data-dismiss="modal" @click="back">To Do </button> 
                        <button type="button" class="btn btn-danger mr-1" data-dismiss="modal" @click="remove">Delete</button>
                        <button type="button" class="btn btn-success" data-dismiss="modal" @click="next">Doing</button>
                    </center>
                </div> 
                <div class="modal-footer text-center">
                    
                </div>
            </div>
        </div>
    </div>
</template>

<script>
/* eslint-disable */
import { mapState } from 'vuex'
import db from '../../googlekey.js'
export default {
    props: ['detail', 'indexId'],
    methods: {
        remove () {
             let obj = {
                status: 'doing',
                id: this.indexId
            }
            this.$store.dispatch('removeTask',obj)
        },

        next () {
            let obj = {
                title: this.detail.title,
                point: this.detail.point,
                description: this.detail.description,
                assignedTo: this.detail.assignedTo,
                status: 'done'
            }
            this.$store.dispatch('createTask',obj)
            db.ref(`tasks/${this.detail.status}/${this.indexId}`).remove()
            
        },

        back () {
            let obj = {
                title: this.detail.title,
                point: this.detail.point,
                description: this.detail.description,
                assignedTo: this.detail.assignedTo,
                status: 'todo'
            }
            this.$store.dispatch('createTask',obj)
            db.ref(`tasks/${this.detail.status}/${this.indexId}`).remove()
        }
    }

}
</script>

<style>

</style>
