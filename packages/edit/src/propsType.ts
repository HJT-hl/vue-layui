import { PropType } from "vue";

export default {
  name : {
    type :String as PropType<string>,
    default : true
  },
  tool: {
    type : Array as PropType<string[]>,
    default : [
      'strong', 'italic', 'underline', 'del'
      ,'|'
      ,'left', 'center', 'right'
      ,'|'
      ,'link', 'unlink', 'face', 'image'
    ]
  },
  hideTool : {
    type : Array as PropType<string[]>,
    default: []
  },
  height: {
    type : Number as PropType<number>,
    default : 200
  }
}
