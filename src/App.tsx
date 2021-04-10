import { defineComponent, h, ref, watchEffect } from 'vue'

import Page from '../packages/page'
import Icon from '../packages/icon'
export default defineComponent({
  setup () {
    const children = ['skyblue', '#009688', 'green', '#5FB878', 'pink']
    const curr = ref(3)
    const limit = ref(5);
    const isEnd = ref(false);
    const isFirst = ref(true)
    return () => <div style='width:800px;margin: 100px auto;'>
      <Page v-model={curr.value}
            count={100}
            groups={5}
            limit={limit.value}
            layout={['prev', 'page', 'next', 'count', 'limit', ]}
            onJump={(obj: any) => {
              console.log(obj)
            }}
            v-slots={{
              prev : ()=><Icon
                icon="prev"
                color={isFirst.value ? "#d2d2d2":""}
              />,
              next : ()=><Icon
                icon="next"
                color={isEnd.value ?"#d2d2d2":""}
              />,
              first : ()=>"首页",
              end : ()=>"末尾",
            }}
      >
      </Page>
      {curr.value}
    </div>
  }
})
