<template>
  <div style='width:800px;margin: 100px auto;' >
    <Carousel
      ref="ele"
      :width='800'
      :height='400'
      :autoplay='true'
      :index='0'
    >
      <CarouselItem v-for="(child,i) of children" :style="{width:'100%',height:'100%',backgroundColor: child}">
        条目{{ i }}
      </CarouselItem>
    </Carousel>
    <Button @click="prev">上一个</Button>
    <Button @click="next">下一个</Button>
    <Flow @done="done"
          :isAuto="false"
          :mb="50"
          :height="600"
    >
      <div v-for="i of flowList">{{ i }}</div>
      <template v-slot:end>
        人家也是有底线的
      </template>
      <template v-slot:notAuto>
        点击加载
      </template>
      <template v-slot:loading>
        loading...
      </template>
    </Flow>
    <ButtonContainer></ButtonContainer>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watchEffect } from 'vue'
import Carousel from '../packages/carousel'
import CarouselItem from '../packages/carousel-item'
import Button from '../packages/button'
import Flow from '../packages/flow'
export default defineComponent({
  name: 'App',
  components: {
    Carousel, CarouselItem, Button, Flow,ButtonContainer
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

</style>


