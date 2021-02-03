<template>
  <Container>
    <div style=' height: 100px;'></div>
    <Collapse v-model='a' @change='onClick'>
      <CollapseItem :name="'1'">
        <template v-slot:title>
          <span>1</span>
        </template>
        <template v-slot:content>
          1
        </template>
      </CollapseItem>
      <CollapseItem :name="'2'">
        <template v-slot:title>
          <span>2</span>
        </template>
        <template v-slot:content>
          2
        </template>
      </CollapseItem>
      <CollapseItem :name="'3'">
        <template v-slot:title>
          <span>3</span>
        </template>
        <template v-slot:content>
          3
        </template>
      </CollapseItem>
    </Collapse>
  </Container>

</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import Container from '../packages/container/index'
import Collapse from '../packages/collapse/index'
import CollapseItem from '../packages/collapseItem/index'

export default defineComponent({
  name: 'App',
  components: {
    Container,
    Collapse,
    CollapseItem
  },
  setup () {
    const a = ref(['1', '2'])
    return { a }
  },
  methods: {
    onClick (name: string | string[]) {
      console.log(name)
    }
  }
})
</script>

