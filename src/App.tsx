import { defineComponent, h, Ref, ref, watchEffect } from 'vue'

import Upload from '../packages/upload'
import Edit from '../packages/edit'
import ButtonContainer from '../packages/button-container'
import Button from '@p/button'
function memo (...arg: any) {
  console.log(arg)
}

// TODO : Button 本身事件要给他
// TODO : 无解性插槽
const App = defineComponent({
  setup () {
    const filePreviewList: Ref<string[]> = ref([])
    const up = ref();
    return () => <div style='width:800px;margin: 100px auto;'>
      {/*<Edit name={"ojifgdiog"}></Edit>*/}

      {/*我是用来复制的*/}
      {/*<iframe name={"test"} ref={(dom)=>{*/}

      {/*}}>*/}

      {/*</iframe>*/}

      <Button>sadhsah</Button>
      <ButtonContainer>行不行</ButtonContainer>

    </div>
  }
})

export default App
