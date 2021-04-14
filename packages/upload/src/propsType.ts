import { PropType } from 'vue'

export type acceptType = 'images' | 'file' | 'video' | 'audio';

export enum ErrorStatus {
  extsError,
  sizeError,
  numberError,
  requestError
}

export interface AllDoneArg {
  total: number;
  successful: number;
  aborted: number;
}

export interface UploadType {
  accept: acceptType;
  acceptMime: string;
  exts: '';
  field: string;
  multiple: boolean;
  url: string;
  headers: Record<string, string>;
  data: Record<string, any> | ((file: File) => Record<string, any>);
  drag : boolean;
  size: number;
  limit : number;
  auto : boolean;
  onAllDone?: (res: AllDoneArg,files:File[]) => void;
  onSuccess?: (res: any, i: number) => void;
  onError?: (status: ErrorStatus, file: File,files:File[]) => void;
  onUploadBefore?: (file: File,index:number,files: File[]) => boolean;
  onPreview?: (result: string, file: File, index: number, files: File[]) => void;
  onChoose?: ( file: File,  files: File[]) => void;
}

export default {
  url: {
    type: String as PropType<string>,
    required: true
  },
  drag : {
    type : Boolean as PropType<boolean>,
    default : false
  },
  data: {
    type: [Object, Function] as PropType<Record<string, any> | ((file: File) => Record<string, any>)>,
    default: {}
  },
  auto: {
    type : Boolean as PropType<boolean>,
    default : true
  },
  acceptMime: {
    type: String as PropType<string>,
    default: 'image/*'
  },
  accept: {
    type: String as PropType<acceptType>,
    default: 'images'
  },
  exts: {
    type: String as PropType<string>,
    default: ''
  },
  field: {
    type: String as PropType<string>,
    default: 'file'
  },
  multiple: {
    type: Boolean as PropType<boolean>,
    default: false
  },
  headers: {
    type: Object as PropType<Record<string, string>>,
    default: {}
  },
  size: {
    type: Number as PropType<number>,
    default : 0
  },
  limit:{
    type : Number as PropType<number>,
    default : 0
  },
  onAllDone: {
    type: Function as PropType<(res: AllDoneArg,files: File[]) => void>
  },
  onSuccess: {
    type: Function as PropType<(res: any, i: number) => void>
  },
  onError: {
    type: Function as PropType<(status: ErrorStatus, file: File,files:File[]) => void>
  },
  onUploadBefore: {
    type: Function as PropType<(file: File,index:number,files: File[]) => boolean|void>
  },
  onPreview: {
    type: Function as PropType<(result: string, file: File, index: number, files: File[]) => void>
  },
  onChoose : {
    type: Function as PropType<( chooseFiles: File[],files: File[]) => void>
  }
}
