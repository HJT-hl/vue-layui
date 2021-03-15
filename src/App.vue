<template>
    <Slider/>
    <Tab v-model='name'

             type='brief'
             :closable='true'
    >
      <TabPane v-for="item of arr" :label='item.label' :name='item.name' :key="item.label">{{item.content}}</TabPane>

    </Tab>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import Container from '../packages/container/index'
import Slider from '../packages/slider/index'
import Tab from '../packages/tab/index'
import TabPane from '../packages/tab-pane'

export default defineComponent({
  name: 'App',
  components: {
    Container,
    Slider,
    Tab,
    TabPane
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

