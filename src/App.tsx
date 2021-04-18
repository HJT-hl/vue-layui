import { defineComponent, h, Ref, ref, watchEffect } from 'vue'

import Upload from '../packages/upload'

import ButtonContainer from '../packages/button-container'
import Button from '@p/button'
function memo (...arg: any) {
  console.log(arg)
}

// TODO : 上传组件无解性插槽
// TODO : 未完成 edit 组件
const App = defineComponent({
  setup () {
    const filePreviewList: Ref<string[]> = ref([])
    const up = ref();
    return () => <div style='width:800px;margin: 100px auto;'>



    </div>
  }
})

export default App
