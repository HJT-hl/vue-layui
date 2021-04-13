import { PropType } from "vue";
export interface item {value: number|string;title: string;disabled?:boolean;checked?:boolean}
export interface TransferType {
  title: string[];
  width: number;
  height:number;
  data : item[];
  modelValue: (number|string)[];
  showSearch: boolean;
  text: {none: string,searchNone:string};
  onChange?: (items : item[],direction:"leftToRight"|"rightToLeft")=>void;
}
export default {
  data: {
    type : Array as PropType<item[]>,
    default: []
  },
  modelValue:{
    type : Array as PropType<(number|string)[]>,
    default: []
  },
  title : {
    type : Array as PropType<string[]>,
    default : ['列表一','列表二']
  },
  width:{
    type : Number as PropType<number>,
    default : 200
  },
  height:{
    type : Number as PropType<number>,
    default : 360
  },
  showSearch:{
    type : Boolean as PropType<boolean>,
    default : false
  },
  text:{
    type : Object as PropType<{none: string,searchNone:string}>,
    default : {
      none: '无数据' ,
      searchNone: '无匹配数据'
    }
  },
  onChange:{
    type : Function as PropType<(items : item[],direction:"leftToRight"|"rightToLeft")=>void>,
  }

}
