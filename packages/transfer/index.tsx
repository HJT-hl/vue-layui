import { computed, defineComponent, h, Ref, ref, watchEffect } from 'vue'
import { withInstall } from '../_utils/component'
import './style/index'
import propsType, { item, TransferType } from './propsType'
import { className, deepCopy } from '../_utils/utils'

export default withInstall(defineComponent({
  name: 'LayTransfer',
  props: propsType,
  setup (props: TransferType, { emit }) {
    let { data, modelValue, onChange } = props
    data = deepCopy(data)
    const leftSearchKey = ref('')
    const rightSearchKey = ref('')
    const leftItem = ref(data.filter((item) => !modelValue.includes(item.value)))
    const rightItem = ref(data.filter((item) => modelValue.includes(item.value)))
    const leftSearchItem = computed(() => leftItem.value.filter((item) => item.title.includes(leftSearchKey.value)))
    const rightSearchItem = computed(() => rightItem.value.filter((item) => item.title.includes(rightSearchKey.value)))
    const leftChecked = computed(() => leftSearchItem.value.filter((item) => item.checked && !item.disabled))
    const rightChecked = computed(() => rightSearchItem.value.filter((item) => item.checked && !item.disabled))
    const isLeftAllCheck = computed(() => leftChecked.value.length === leftSearchItem.value.filter((item) => !item.disabled).length && leftSearchItem.value.length !== 0)
    const isRightAllCheck = computed(() => rightChecked.value.length === rightSearchItem.value.filter((item) => !item.disabled).length && rightSearchItem.value.length !== 0)
    const handleChecked = (item: { value: number | string, title: string, disabled?: boolean, checked?: boolean }) => {
      if (item.disabled) return
      item.checked = !item.checked
    }
    const handleTransfer = (type: 'left' | 'right') => {
      if (type === 'left') {
        const items = deepCopy(leftChecked.value)
        onChange && onChange(items, 'leftToRight')
        leftItem.value = leftItem.value.filter((item) => !leftChecked.value.includes(item))
        items.forEach((item: item) => {
          item.checked = false
        })
        rightItem.value = [...rightItem.value, ...items]
        emit('update:modelValue', rightItem.value.map((item: item) => item.value))
      } else {
        const items = deepCopy(rightChecked.value)
        onChange && onChange(items, 'rightToLeft')
        rightItem.value = rightItem.value.filter((item) => !rightChecked.value.includes(item))
        emit('update:modelValue', rightItem.value.map((item: item) => item.value))
        items.forEach((item: item) => {
          item.checked = false
        })
        leftItem.value = [...leftItem.value, ...items]
      }
    }
    const handelAllCheck = (type: 'left' | 'right') => {
      if (type === 'left') {
        if (isLeftAllCheck.value) {
          leftSearchItem.value.forEach((item) => {
            if (item.disabled) return
            item.checked = false
          })
        } else {
          leftSearchItem.value.forEach((item) => {
            if (item.disabled) return
            item.checked = true
          })
        }
      } else {
        if (isRightAllCheck.value) {
          rightSearchItem.value.forEach((item) => {
            if (item.disabled) return
            item.checked = false
          })
        } else {
          rightSearchItem.value.forEach((item) => {
            if (item.disabled) return
            item.checked = true
          })
        }
      }
    }
    return () => {
      const { width, height, title, text, showSearch } = props
      return <div class="layui-transfer layui-form layui-border-box">
        <div
          class="layui-transfer-box"
          style={{ height: height + 'px', width: width + 'px' }}
        >
          <div class="layui-transfer-header">
            <div class={className(['layui-unselect', ' layui-form-checkbox', {
              'layui-form-checked': isLeftAllCheck.value
            }])} onClick={() => handelAllCheck('left')}>
              <span>{title[0]}</span>
              <i class="layui-icon">&#xe605;</i>
            </div>
          </div>
          {
            showSearch && <div class="layui-transfer-search">
              <i class="layui-icon ">&#xe615;</i>
              <input type="text" class="layui-input" placeholder="关键词搜索" v-model={leftSearchKey.value}/>
            </div>
          }

          <ul class="layui-transfer-data" style={{ height: height - 48 - (showSearch ? 56 : 0) + 'px' }}>
            {
              leftSearchItem.value.length
                ? leftSearchItem.value.map(item => <li>
                  <div class={className(['layui-unselect', ' layui-form-checkbox', {
                    'layui-form-checked': item.checked,
                    'layui-disable': item.disabled
                  }])}
                       onClick={() => handleChecked(item)}
                  >
                    <span>{item.title}</span>
                    <i class="layui-icon">&#xe605;</i>
                  </div>
                </li>)
                : <p class="layui-none">{leftItem.value.length ? text.searchNone : text.none}</p>
            }
          </ul>
        </div>
        <div class="layui-transfer-active">
          <button type="button" class={className(['layui-transfer-btn', {
            'layui-btn-disabled': !leftChecked.value.length
          }])}
                  onClick={() => handleTransfer('left')}
          >
            <i class="layui-icon">&#xe65b;</i>
          </button>
          <button type="button" class={className(['layui-transfer-btn', {
            'layui-btn-disabled': !rightChecked.value.length
          }])}
                  onClick={() => handleTransfer('right')}
          >
            <i class="layui-icon">&#xe65a;</i>
          </button>
        </div>
        <div
          class="layui-transfer-box"
          style={{ height: height + 'px', width: width + 'px' }}
        >
          <div class="layui-transfer-header">
            <div class={className(['layui-unselect', ' layui-form-checkbox', {
              'layui-form-checked': isRightAllCheck.value
            }])} onClick={() => handelAllCheck('right')}>
              <span>{title[1]}</span>
              <i class="layui-icon">&#xe605;</i>
            </div>
          </div>
          {
            showSearch && <div class="layui-transfer-search">
              <i class="layui-icon ">&#xe615;</i>
              <input type="text" class="layui-input" placeholder="关键词搜索" v-model={rightSearchKey.value}/>
            </div>
          }
          <ul class="layui-transfer-data" style={{ height: height - 48 - (showSearch ? 56 : 0) + 'px' }}>
            {
              rightSearchItem.value.length
                ? rightSearchItem.value.map(item => <li>
                  <div class={className(['layui-unselect', ' layui-form-checkbox', {
                    'layui-form-checked': item.checked,
                    'layui-disable': item.disabled
                  }])}
                       onClick={() => handleChecked(item)}
                  >
                    <span>{item.title}</span>
                    <i class="layui-icon">&#xe605;</i>
                  </div>
                </li>)
                : <p class="layui-none">{rightItem.value.length ? text.searchNone : text.none}</p>
            }
          </ul>
        </div>
      </div>
    }
  }
}))
