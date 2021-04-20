import { defineComponent, h, Ref, ref, watchEffect } from 'vue'

import Upload from '../packages/upload'

import ButtonContainer from '../packages/button-container'
function memo (...arg: any) {
  console.log(arg)
}

const App = defineComponent({
  setup () {
    const filePreviewList: Ref<string[]> = ref([])
    const up = ref();
    return () => <div style='width:800px;margin: 100px auto;'>


    </div>
  }
})

export default App
