import { defineComponent, h, ref, watchEffect } from 'vue'

import Page from '../packages/page'
import Icon from '../packages/icon'
import Transfer from '../packages/transfer'
export default defineComponent({
  setup () {
    const children = ['skyblue', '#009688', 'green', '#5FB878', 'pink']
    const curr = ref(3)
    const limit = ref(5)
    const value = ref(["1","2"])
    const   data1 = [
      {"value": "1", "title": "李白"}
      ,{"value": "2", "title": "杜甫"}
      ,{"value": "3", "title": "苏轼"}
      ,{"value": "4", "title": "李清照",checked: true}
      ,{"value": "5", "title": "鲁迅", "disabled": true,checked: true}
      ,{"value": "6", "title": "巴金"}
      ,{"value": "7", "title": "冰心"}
      ,{"value": "8", "title": "矛盾"}
      ,{"value": "10", "title": "贤心"}
      ,{"value": 11, "title": "天天"}
      ,{"value": 12, "title": "让人"}
      ,{"value": 13, "title": "威威"}
    ]

    return () => <div style='width:800px;margin: 100px auto;'>
      <Transfer data={data1} v-model={value.value} title={['总共', '选择']} width={200} height={300} onChange={(item,direction) =>{
        console.log(item,direction);
        console.log(data1)
      }} showSearch={false}/>
      <div>{value.value.toString()}</div>
      <Page v-model={curr.value}
            count={100}
            groups={5}
            limit={limit.value}
            layout={['prev', 'page', 'next', 'count']}
            onJump={(curr: number) => {
              limit.value = curr
            }}
            onNext={(curr: number) => curr + 2}
            onPrev={(curr: number) => curr - 2}
            v-slots={{
              prev: () => <Icon
                icon="prev"
              />,
              next: () => <Icon
                icon="next"
              />,
              first: () => '首页',
              end: () => '末尾'
            }}
      >
      </Page>

    </div>
  }
})
