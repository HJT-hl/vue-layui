import { defineComponent, h, Ref, ref, watchEffect } from 'vue'

import Upload from '../packages/upload'
import Button from '../packages/button'

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
      <Upload
        url="http://localhost:8000/upload"
        style={{position: 'absolute',left:0,top : 0}}
        accept="images"
        field="name"
        data={(file: File) => {
          return {
            age: 18,
            filename: file.name,
            date: new Date().getMinutes()
          }
        }}
        size={5}
        multiple={true}
        drag={true}
        auto={false}
        onSuccess={console.log}
        onError={(status: number, file: File) => {
          if (status === 0) {
            console.error('文件类型错误')
          } else if (status === 1) {
            console.error('文件过大')
          }else if(status === 2){
            console.error('文件过多')
          }else if(status === 3){
            console.error('服务器错误')
          }
        }}
        onUploadBefore={(file: File,index: number,files: File[]) => {

        }}
        onPreview={(result: string) => {
          filePreviewList.value.push(result)
        }}
        onChoose={(files: File[],fs:File[])=>{
          console.log(files,fs)
        }}
        ref={up}
      >
        <Button >我是自定义的插槽</Button>
      </Upload>
      <Button onClick={()=>{
        up.value.upload();
      }}>确认上传</Button>
      <ul style={{ display: 'flex' }}>
        {
          filePreviewList.value.map((src) => {
            return <li><img src={src} alt=""/></li>
          })
        }
      </ul>

      <Button
        onClick={() => {
          const input = document.createElement('input')
          input.type = 'file'

          input.addEventListener("change",(e)=>{
            console.log(e.target.files)
          })
          input.click()
      }}>零零零零</Button>
    </div>
  }
})

export default App
