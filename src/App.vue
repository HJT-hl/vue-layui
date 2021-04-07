<template>
  <div style='width:800px;margin: 100px auto;'>
    <Carousel
      ref="ele"
      :width='800'
      :height='400'
      :autoplay='true'
      :index='0'
    >
     <CarouselItem v-for="(child,i) of children" :style="{width:'100%',height:'100%',backgroundColor: child}">
        条目{{i}}
      </CarouselItem>
    </Carousel>
    <Button @click="prev">上一个</Button>
    <Button @click="next">下一个</Button>

  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watchEffect } from 'vue'
import Carousel from '../packages/carousel'
import CarouselItem from '../packages/carousel-item'
import Button from '../packages/button'

export default defineComponent({
  name: 'App',
  components: {
    Carousel,CarouselItem,Button
  },
  data(){
    return {
      children : ['skyblue' ,'#009688','green','#5FB878','pink'],
    }
  },
  setup(){
    const ele = ref();
    const prev = ()=>{
      ele.value.prev()
    }
    const next = ()=>{
      ele.value.next()
    }


    return {
      ele,
      prev,
      next
    }
  },

  methods: {
    onClick (name: string | string[]) {
      console.log(name)
    },

  }
})
</script>

