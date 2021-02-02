<template>
  <Collapse v-model="activeKey"></Collapse>

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
    const activeKey = ref('125125')
    return {activeKey}
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
