export const toLine = (name: string): string => {
  return name.replace(/([A-Z])/g, '-$1').toLowerCase()
}
export const emptyFun = (): void => {
  // 空函数
}

export function triggerElement (arr: Array<any>, item : string | number):Array<any> {
  const index = arr.indexOf(item)
  if(index === -1){
    arr.push(item)
  } else {
    arr.splice(index, 1)
  }
  return arr
}


