import layerOpen from '../vc-layer-open'
import { propsType as layerOpenPropsType } from '../vc-layer-open/propsType'
export default function layerConfirm(content:string, options:layerOpenPropsType, onYes:()=>void|boolean,onCancel:()=>boolean|void){
  return layerOpen({
    shade: -1,
    btn:[ '确定',{title:'取消',color:'#333',backgroundColor:'#fff',border:'1px solid #dedede'}],
    ...options,
    callback : [
      onYes,
      onCancel
    ],
    content:content
  })
}
