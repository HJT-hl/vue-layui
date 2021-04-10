import { PropType } from "vue"
interface onJumpType {
  limit : number;
  curr : number;
}
export interface propsType {
  modelValue : number;
  count : number;
  mode : number;
  limit : number;
  limits : number[];
  groups : number;
  layout : string[];
  theme : string;
  onJump ?: (obj:onJumpType)=>void;
}
export default {
  modelValue: {
    type : Number as PropType<number>
  },
  count : {
    type : Number as PropType<number>,
    required: true
  },

  limit : {
    type : Number as PropType<number>,
    default: 10
  },
  limits : {
    type : Array as PropType<number[]>,
    default: [10,20,30,40,50]
  },
  groups :{
    type : Number as PropType<number>,
    default: 5
  },
  layout :{
    type : Array as PropType<string[]>,
    default : ['pre','page','next']
  },
  theme :{
    type : String as PropType<string>,
    default : ''
  },
  onJump:{
    type : Function as PropType<(obj:onJumpType)=>void>
  }
}
