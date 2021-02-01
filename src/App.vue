<template>
  <Container>试试</Container>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Container from '../packages/container/index'

export default defineComponent({
  name: 'App',
  components: {
    Container
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
