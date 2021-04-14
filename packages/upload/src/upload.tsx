import { defineComponent, h, ref } from 'vue'
import './style.less'
import propsType, { ErrorStatus, UploadType } from './propsType'
import { ajax, className } from '../../_utils/utils'
// notice : 插槽不能使用定位

export default defineComponent({
  name: 'LayUpload',
  props: propsType,
  data () {
    return {
      dragOver: false
    }
  },
  render () {
    const {
      acceptMime,
      accept,
      exts,
      field,
      multiple,
      url,
      data,
      headers,
      size,
      limit,
      drag,
      auto,
      onSuccess,
      onError,
      onAllDone,
      onUploadBefore,
      onPreview,
      onChoose
    } = this.$props
    let successful = 0
    let aborted = 0
    // 判断文件类型
    const isExts = (file: File) => {
      const filename = file.name
      let check = true
      switch (accept) {
        case 'file': //一般文件
          if (exts && !RegExp('\\w\\.(' + exts + ')$', 'i').test(escape(filename))) {
            check = false
          }
          break
        case 'video': //视频文件
          if (!RegExp('\\w\\.(' + (exts || 'avi|mp4|wma|rmvb|rm|flash|3gp|flv') + ')$', 'i').test(escape(filename))) {
            check = false
          }
          break
        case 'audio': //音频文件
          if (!RegExp('\\w\\.(' + (exts || 'mp3|wav|mid') + ')$', 'i').test(escape(filename))) {
            return false

          }
          break
        default: //图片文件
          if (!RegExp('\\w\\.(' + (exts || 'jpg|png|gif|bmp|jpeg|webp$') + ')', 'i').test(escape(filename))) {
            return false
          }
          break
      }
      if (!check) {
        onError && onError(ErrorStatus.extsError, file, this.chooseFiles)
      }
      return check
    }
    // 上传文件
    this.upload = () => {
      // 多文件全部上传完毕的回调
      const allDone = () => {
        if (multiple && successful + aborted === this.chooseFiles.length) {
          onAllDone && onAllDone({
            total: this.chooseFiles.length,
            successful: successful,
            aborted: aborted
          }, this.chooseFiles)
          this.chooseFiles = []
        }
      }
      this.chooseFiles.forEach((file, i) => {
        const formData = new FormData()
        formData.append(field, file)
        if (typeof data === 'function') {
          const d = data(file)
          for (const key in d) {
            formData.append(key, JSON.stringify(d[key]))
          }
        } else {
          for (const key in data) {
            formData.append(key, JSON.stringify(data[key]))
          }
        }

        const opts = {
          url: url,
          type: 'POST',//统一采用 post 上传
          data: formData,
          headers: headers,
          success: (res: any) => {
            successful++
            onSuccess && onSuccess(res, i)
            allDone()
          },
          error: () => {
            aborted++
            onError && onError(ErrorStatus.requestError, file, this.chooseFiles)
            allDone()
          }
        }

        const isUpload = onUploadBefore && onUploadBefore(file, i, this.chooseFiles)

        if (isUpload === false) return
        // @ts-ignore
        ajax(opts)

      })
    }
    //设置当前选择的文件队列
    const setChooseFile = (files: FileList) => {
      const choose = Object.values(files)
      onChoose && onChoose(choose, this.chooseFiles)
      // 文件数量限定
      if (limit > 0 && this.chooseFiles.length > limit) {
        onError && onError(ErrorStatus.numberError, this.chooseFiles[0], this.chooseFiles)
        return
      }
      choose.forEach((file, i) => {
        if (!isExts(file)) return
        if (size > 0 && file.size > 1024 * size) {
          onError && onError(ErrorStatus.sizeError, file, this.chooseFiles)
          return
        }
        if (onPreview) {
          const reader = new FileReader()
          reader.readAsDataURL(file)
          reader.onload = () => {
            // @ts-ignore
            onPreview && onPreview(reader.result, file, i, this.chooseFiles)
          }
        }
        this.chooseFiles.push(file)
      })
      if (auto) this.upload()
    }
    const child = this.$slots.default
    return <div class="layui-upload">
      <div
             class={className({
               'layui-upload-drag': !child && drag,
               'lay-over': !child && drag && this.dragOver,
               'layui-btn': !child && !drag
             })}
             onClick={() => {
               const input = document.createElement('input')
               input.type = 'file'
               input.accept = acceptMime
               input.multiple = multiple
               input.addEventListener("change",(e)=>{
                 // @ts-ignore
                 setChooseFile(e.target.files)
               })
               input.click()
             }}

             onDragover={(e) => {
               if (!drag) return
               e.preventDefault()
               this.dragOver = true
             }}
             onDragleave={(e) => {
               if (!drag) return
               e.preventDefault()
               this.dragOver = false
             }}
             onDrop={(e) => {
               if (!drag) return
               e.preventDefault()
               // @ts-ignore
               const files = e.dataTransfer.files
               this.dragOver = false
               setChooseFile(files)
             }}
      >
        {
          child
            ? child()
            : drag
            ? <>
              <i class="layui-icon">&#xe67c;</i>
              <p>点击上传，或将文件拖拽到此处</p>
            </>
            : <>
              <i class="layui-icon">&#xe67c;</i>上传图片
            </>
        }
      </div>

    </div>


  },
  setup () {
    let upload: () => void
    let chooseFiles: File[] = []
    return {
      // @ts-ignore
      upload,
      chooseFiles
    }
  }

})
