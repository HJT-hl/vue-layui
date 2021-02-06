<template>
    <Slider/>

</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import Container from '../packages/container/index'
import Slider from '../packages/slider/index'


export default defineComponent({
  name: 'App',
  components: {
    Container,
    Slider
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

