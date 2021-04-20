export const toLine = (name: string): string => {
  return name.replace(/([A-Z])/g, '-$1').toLowerCase()
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

export function className (name: Array<string | Record<string, boolean | undefined | null>> | Record<string, boolean | undefined | null>): string {
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

export function deepCopy (obj: unknown): any {
  return JSON.parse(JSON.stringify(obj))
}

export function ajax (options: {
  url: string,
  data: FormData,
  type: string,
  success: (res: any) => void;
  error: () => void;
  headers: Record<string, string>
}): void {
  const xhr = new XMLHttpRequest()
  xhr.onreadystatechange = function () {
    if (xhr.readyState === XMLHttpRequest.DONE) {
      if ((xhr.status >= 200 && xhr.status < 300) || xhr.status === 304) {
        options.success(JSON.parse(xhr.responseText))
      } else {
        options.error()
      }
    }
  }

  for (const key in options.headers) {
    xhr.setRequestHeader(key, options.headers[key])
  }
  xhr.open(options.type, options.url, true)
  xhr.send(options.data)
}
