import layerOpen from '../vc-layer-open'
import { propsType as layerOpenPropsType } from '../vc-layer-open/propsType'
export default function layerAlert(content:string, options:layerOpenPropsType, onYes:()=>void){
  return layerOpen({
    shade: -1,
    ...options,
    content:content,
    onYes : onYes
  })
}
