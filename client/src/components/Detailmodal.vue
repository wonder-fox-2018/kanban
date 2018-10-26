<template>
    <div>
        <!-- Modal parts -->
        <div class="modal fade" id="detailModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">Detail Task</h5>
                    </div>
                    <div class="modal-body">
                        <label for="exampleInputEmail1"><h3>Title</h3></label>
                        <br>
                        <label aria-describedby="emailHelp">{{ detaildata.title }}</label>
                        <hr>
                        <label for="exampleInputEmail1"><h3>Description</h3></label>
                        <br>
                        <label aria-describedby="emailHelp">{{ detaildata.description }}</label>
                        <hr>
                        <label for="exampleInputEmail1"><h3>Point</h3></label>
                        <br>
                        <label aria-describedby="emailHelp">{{ detaildata.point }}</label>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary"
                            data-dismiss="modal">Close</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
// import db from '../../googlekey.js'
export default {
  name: 'Detailmodal',
  props: ['detaildata']
//   data () {
//     return {
//       detaildata: {}
//     }
//   },
//   watch: {
//     detailid (val) {
//       let self = this
//       db.ref(`/task/${self.detailstatus}/${self.detailid}`).on('value', function (snapshot) {
//         self.detaildata = snapshot.val()
//         console.log('Detail data -------------', self.detaildata)
//       })
//     },
//     detaildata (val) {}
//   }
}
</script>

<style>

</style>
