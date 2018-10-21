<template>
  <div class="col-12 col-md-6 col-xl-3">
    <div id='todoHead' class="row colHead mx-auto" :style="{background: bgcolor}">
      <h4 class="my-2 ml-4">{{ title }}</h4>
    </div>
    <div class="card mx-auto">
      <div class="card-body border" v-for='(log, index) in logs' :key='index'>
        <logitem :log='log' :title="title" :showdetail='showdetail' :bgcolor='bgcolor'></logitem>
      </div>
    </div>
  </div>
</template>

<script>
import logitem from './logitem'

export default {
  name: 'logcomp',
  props: ['title', 'logs', 'bgcolor', 'showdetail'],
  components: {
    logitem
  }
}
</script>

<style>

</style>
