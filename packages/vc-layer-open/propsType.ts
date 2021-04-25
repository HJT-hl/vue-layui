import { CSSProperties } from "vue";
export enum OffsetEnum {
  AUTO = "auto",
  T = 't',
  R = 'r',
  B = 'b',
  L = 'l',
  LT = 'lt',
  LB = 'lb',
  RT = 'RT',
  RB = 'rb'
}
export interface BtnType extends CSSProperties{
  title : string;
}


export interface propsType {
  title?: string;
  content?: string;
  skin?: string;
  area? : string | string[];
  offset ?: string | OffsetEnum | string[];
  icon?: number;
  btn?:string|(BtnType|string)[];
  callback ? : ((() => boolean | void) | undefined)[] ;
  btnAlign? : string;
  closeBtn? : number;
  shade ? :number|[number,string];
  scrollbar? : boolean;
  maxWidth? : number;
  maxHeight? : number;
  zIndex? : number;
  anim ? : number;
  isOutAnim? : boolean;
  time?: number;
  isMove?:boolean;
  onMoveEnd ?: (e:MouseEvent) => void;
  onYes? : () => void|boolean;
  onCancel? : ()=>boolean | void;
  onEnd? :()=>void;
}
