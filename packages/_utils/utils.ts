export const toLine = (name: string): string => {
  return name.replace(/([A-Z])/g, '-$1').toLowerCase()
}
export const emptyFun = (): void => {
  // 空函数
}

export function triggerElement (arr: Array<any>, item: string | number): Array<any> {
  const index = arr.indexOf(item)
  if (index === -1) {
    arr.push(item)
  } else {
    arr.splice(index, 1)
  }
  return arr
}

export function arrayEqual (obj1: any[], obj2: any[]): boolean {
  for (let i = 0; i < obj1.length; i++) {
    if (obj1[i] !== obj2[i]) return false
  }
  return true
}

export function className (name: Array<string | Record<string, boolean|undefined|null>> | Record<string, boolean|undefined|null>): string {
  const classs: string[] = []
  if (name.toString() === '[object Object]') {
    for (const key in name) {
      // @ts-ignore
      if (name[key]) {
        classs.push(key)
      }
    }
  }
  if (Array.isArray(name)) {
    name.forEach((item) => {
      if (typeof item === 'string') {
        classs.push(item)
      } else if (item.toString() === '[object Object]') {
        for (const key in item) {
          if (item[key]) {
            classs.push(key)
          }
        }
      }
    })
  }
  return classs.join(' ')
}
export function deepCopy(obj:any):any{

  const deepClone1 = (obj:any):any=>{
    let res:any = obj;
    if(Array.isArray(obj)){
      res = [];
      for(let value of obj){
        res.push(deepClone1(value));
      }
    }else if(typeof obj === "object"){
      res = {}
      for(let key of Object.keys(obj)){
        res[key] = deepClone1(obj[key]);
      }
    }
    return res;
  }
  const deepClone2 = (obj:any):any=> JSON.parse(JSON.stringify(obj));
  return Object.keys(obj).length  > 1000?deepClone1(obj) : deepClone2(obj);
}



