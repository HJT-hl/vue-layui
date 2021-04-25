import layerOpen from '../vc-layer-open'
import { propsType as layerOpenPropsType } from '../vc-layer-open/propsType'
import './style'
export default function layerMessage(content:string, options:layerOpenPropsType,onEnd:()=>void){
  let skin = 'layui-layer-message '
  if( options?.icon === undefined) {
    skin += ' no-icon'
  }
  return layerOpen({
    time : 2000,
    shade: -1,
    skin: skin,
    ...options,
    content:content,
    onEnd: onEnd
  })
}
