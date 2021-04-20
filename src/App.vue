<template>
  <div style='width:800px;margin: 100px auto;' >
    <Carousel
      ref="ele"
      :width='800'
      :height='400'
      :autoplay='false'
      :index='0'
    >
      <CarouselItem v-for="(child,i) of children" :style="{width:'100%',height:'100%',backgroundColor: child}">
        条目{{ i }}
      </CarouselItem>
    </Carousel>

  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watchEffect } from 'vue'
import {Carousel,CarouselItem} from '../packages'
// import Carousel from '../packages/carousel'
// import CarouselItem from '../packages/carousel-item'

export default defineComponent({
  name: 'App',
  components: {
    Carousel, CarouselItem
  },
  data () {
    return {
      children: ['skyblue', '#009688', 'green', '#5FB878', 'pink'],
      flowList: []
    }
  },
  setup () {
    const ele = ref()
    const prev = () => {
      ele.value.prev()
    }
    const next = () => {
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
    done (page: number, next: (a: boolean) => void) {
      setTimeout(() => {
        for (let i = page * 5; i < page * 5 + 10; i++) {
          this.flowList.push(i)
        }
        next(page < 8)
      }, 1000)
    }
  }
})
</script>

<style>
  body {
    background : #000;
  }
</style>


