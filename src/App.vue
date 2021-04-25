<template>
  <div style='width:800px;margin: 100px auto;' class="home">
    <Carousel
      ref="ele"
      :width='800'
      :height='400'
      :autoplay='false'
      :index='0'
      class="test"
    >
      <CarouselItem v-for="(child,i) of children" :style="{width:'100%',height:'100%',backgroundColor: child}">
        条目{{ i }}
      </CarouselItem>
    </Carousel>
    <Button @click="onClick">点一下</Button>
  </div>

</template>

<script lang="ts">
import { defineComponent, ref, watchEffect } from 'vue'
import { Carousel, CarouselItem, Button } from '../packages'


export default defineComponent({
  name: 'App',
  components: {
    Carousel, CarouselItem, Button
  },
  data () {
    return {
      children: ['skyblue', '#009688', 'green', '#5FB878', 'pink'],
      flowList: [],
      closeId : 0
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

    onClick () {
      this.$message('只想弱弱提示')
      /*this.$confirm('is not?', {icon: 3, title:'提示'}, function(){
        //do something
        console.log('确定')
      },function(){
        console.log('取消')
      })*/
     /* this.$layerAlert('加了个图标', {icon: 1},function(){
        //do something
        console.log('加个回调')
      })*/
      // this.closeId = this.$layerOpen({
      //   title: '看看不错吧',
      //   content: '彼此彼此吧彼此彼此吧保持报错吧彼此彼此吧',
      //   icon: 1,
      //   btn: ['确认'],
      //   btnAlign: 'flex-end',
      //   onYes(){
      //     console.log(111)
      //   },
      //   skin: 'demo-class',
      //   closeBtn : 2,
      //   shade: 0.3,
      //   anim : 1,
      //   onCancel(){
      //     console.log("取消按钮")
      //   },
      //   onMoveEnd(e){
      //     console.log("移动结束",e)
      //   },
      // })

    },

  }
})
</script>
<style lang="less" >

</style>



