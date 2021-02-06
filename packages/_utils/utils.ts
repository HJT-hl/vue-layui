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


