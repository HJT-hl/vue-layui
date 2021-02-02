<template>
  <Container>
    <Field>
      <template v-slot:title>
        字段集区块 - 默认风格
      </template>
      <template v-slot:content>
        内容区域
      </template>
    </Field>
  </Container>

</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Container from '../packages/container/index'
import Field from '../packages/field/index'

export default defineComponent({
  name: 'App',
  components: {
    Container,
    Field
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
