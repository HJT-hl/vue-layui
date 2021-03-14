import { defineComponent, h, ref, watchEffect } from 'vue'
import Tab from '../packages/tab'
import TabPane from '../packages/tabPane'
import Button from '../packages/button'
export default defineComponent({
  setup () {
    const v = ref(1)

    const color = ref('#5be22c')
    const arr = ref( [
      { label: '标题1', name: 1, content: '内容1' },
      { label: '标题2', name: 2, content: '内容2' },
      { label: '标题3', name: 3, content: '内容3' },
      { label: '标题4', name: 4, content: '内容4' },
    ])
    let num = 5;
    const add = ()=>{
      arr.value.push({label: '标题'+num,name: num,content:'内容'+num})
      num++;
    }

    return () => <div style='width:600px;margin: 100px auto;'>
      <Tab v-model={v.value}
           onClick={console.log}
           onRemove={console.log}
           type={'brief'}
           closable={true}
      >
        {arr.value.map((item) => <TabPane label={item.label} name={item.name}>{item.content}</TabPane>)}

      </Tab>
      <Button onClick={add}>增加</Button>
      <div>{v.value}</div>
    </div>
  }
})
