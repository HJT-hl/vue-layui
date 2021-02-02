<template>
  <Collapse v-model:activeIndex="val"></Collapse>

</template>

<script lang="ts">
import { defineComponent,ref } from 'vue'
import Collapse from '../packages/collapse/index'

export default defineComponent({
  name: 'App',
  components: {
    Collapse
  },
  setup(){
    const val = ref('125125')
    return {val}
  }
})
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
