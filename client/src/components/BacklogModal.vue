<template>
    <div class="modal fade" id="modalBl" tabindex="-1" role="dialog" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" >Detail {{detail.title}}</h5>
                    <button type="button" class="close" data-dismiss="modal">
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
                        <button type="button" class="btn btn-danger mr-2" data-dismiss="modal" @click="remove" >Delete</button>
                        <button type="button" class="btn btn-success" data-dismiss="modal" @click="next">To do </button> 
                         <!-- <button @click="btnpopover" id="doconfirm" class="btn btn-primary" data-toggle="confirmation" data-placement="right">Confirmation on right</button>
                        
                          <div class="card mb-3">
      <div class="card-header">Directions</div>
      <div class="card-body">
        <button class="btn btn-primary" data-toggle="confirmation" data-placement="left">Confirmation on left</button>
        <button class="btn btn-primary" data-toggle="confirmation" data-placement="top">Confirmation on top</button>
        <button class="btn btn-primary" data-toggle="confirmation" data-placement="bottom">Confirmation on bottom
        </button>
        <button class="btn btn-primary" data-toggle="confirmation" data-placement="right">Confirmation on right</button>
      </div>
    </div> -->
                        <!-- <a @click="btnpopover" tabindex="-1"
         id="doconfirm"
         class="btn btn-lg btn-primary" 
         role="button" 
         data-html="true" 
         data-toggle="popover" 
         data-placement="bottom" 
         data-trigger="focus" 
         title="<b>Example popover</b> - title" 
         data-content="<div><input  type='text' placeholder='Search...' /> <button type='button' class='btn btn-success' data-dismiss='modal' @click='next'>To do </button> </div>">RSS</a>
                        <div class="btn btn-success popconfirm" onclick="alert('Test Onclick !');">Test Onclick Attribute</div> -->
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
    data () {
        return {
        }
    },
    methods: {
        btnpopover(){
           // $('#doconfirm').popover();  
           console.log('jalann')
           $('#doconfirm').confirmation('show');
        },
        remove () {
            let obj = {
                status: 'backlog',
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
