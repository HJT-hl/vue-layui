import {PropType} from 'vue';
type CSSSIZE = number | string;
export enum ARROWMNUM {HOVER = 'hover',ALWAYS = 'always',NONE = 'none'}
export enum INDICATOR  {INSIDE = 'inside',OUTSIDE = 'outside',NONE = 'none'}
export enum ANIM {DEFAULT = 'default',UPDOWN = 'updown',FADE = 'fade'}
export enum TRIGGER {HOVER='hover',CLICK = 'click'}
export interface CarouselType {
  width ?: CSSSIZE;
  height ?: CSSSIZE;
  full ?: boolean;
  arrow ?: ARROWMNUM;
  indicator ?: INDICATOR;
  autoplay ?: boolean;
  interval:number;
  anim?: ANIM;
  trigger?:TRIGGER;
  index:number;
  onAfterChange?:(index:number) =>void;
  onBeforeChange?:(form:number,to:number) =>void;
  onGoto?:(index:number) =>number;
}
export default {
  width : {
    type: [String, Number] as PropType<CSSSIZE>,
    default : 600
  },
  height : {
    type: [String, Number] as PropType<CSSSIZE>,
    default : 280
  },
  full : {
    tyep : Boolean as PropType<boolean>,
    default : false
  },
  arrow : {
    type: String as PropType<ARROWMNUM>,
    default : ARROWMNUM.HOVER
  },
  indicator : {
    type : String as PropType<INDICATOR>,
    default : INDICATOR.INSIDE
  },
  autoplay : {
    type : Boolean as PropType<boolean>,
    default : true
  },
  interval : {
    type : Number as PropType<number>,
    default : 3000
  },
  anim : {
    type: String as PropType<ANIM>,
    default : ANIM.DEFAULT
  },
  trigger: {
    type : String as PropType<TRIGGER>,
    default : TRIGGER.CLICK
  },
  index : {
    type : Number as PropType<number>,
    default : 0
  },
  onBeforeChange:{
    type : Function as PropType<(form:number,to:number) =>void>
  },
  onAfterChange:{
    type : Function as PropType<(index:number) =>void>
  },
  onGoto: Function as PropType<(index:number) =>number>
}
