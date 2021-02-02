export const toLine = (name: string): string => {
  return name.replace(/([A-Z])/g, '-$1').toLowerCase()
}
export const emptyFun = ():void => {
  // 空函数
}
