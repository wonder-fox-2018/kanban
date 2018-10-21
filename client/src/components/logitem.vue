<template>
  <div>
    <h5 class="card-title"><strong>{{ log.title }}</strong></h5>
    <table class="table card-text text-left ml-2">
      <tbody>
        <tr>
          <th scope="row">Point</th>
          <td>{{ log.point }}</td>
        </tr>
        <tr>
          <th scope="row">Assigned To</th>
          <td>{{ log.assignedTo }}</td>
        </tr>
      </tbody>
    </table>
    <button class="btn" :style='{background: bgcolor}' v-on:click='showdetail(log, title)' style="width: 50%">Show Detail</button>
  </div>
</template>

<script>
export default {
  name: 'logitem',
  props: ['log', 'title', 'showdetail', 'bgcolor']
}
</script>

<style>

</style>
