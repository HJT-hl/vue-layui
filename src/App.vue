<template>
  <Timeline model="">
    <TimelineItem title="8月18日">
      layui 2.0 的一切准备工作似乎都已到位。发布之弦，一触即发。
      <br>不枉近百个日日夜夜与之为伴。因小而大，因弱而强。

    </TimelineItem>
    <TimelineItem title="8月19日">
      layui 2.0 的一切准备工作似乎都已到位。发布之弦，一触即发。
      <br>不枉近百个日日夜夜与之为伴。因小而大，因弱而强。
    </TimelineItem>
    <TimelineItem title="8月30日">
      layui 2.0 的一切准备工作似乎都已到位。发布之弦，一触即发。
      <br>不枉近百个日日夜夜与之为伴。因小而大，因弱而强。
    </TimelineItem>
    <TimelineItem title="8月54日">
      layui 2.0 的一切准备工作似乎都已到位。发布之弦，一触即发。
      <br>不枉近百个日日夜夜与之为伴。因小而大，因弱而强。
    </TimelineItem>
  </Timeline>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import Container from '../packages/container/index'
import Slider from '../packages/slider/index'
import Tab from '../packages/tab/index'
import TabPane from '../packages/tab-pane'
import Timeline from '../packages/timeline/index'
import TimelineItem from '../packages/timeline-item/index'

export default defineComponent({
  name: 'App',
  components: {
    Container,
    Slider,
    Tab,
    TabPane,
    Timeline,
    TimelineItem
  },
  data(){
    return {
      name : 1,
      arr :  [
        { label: '标题1', name: 1, content: '内容1' },
        { label: '标题2', name: 2, content: '内容2' },
        { label: '标题3', name: 3, content: '内容3' },
        { label: '标题4', name: 4, content: '内容4' },
      ],
      num : 5
    }
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

