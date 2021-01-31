import {  defineComponent } from 'vue'
import './style.less'
import img from './imgs/logo.png'
export default defineComponent({
    name: 'aaaa',
    setup(){
        return ()=>{
            return <div><img src={img} alt=""/></div>
        }
    }
})