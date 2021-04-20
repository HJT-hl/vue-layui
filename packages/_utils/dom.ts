export class JQuery {
  elem: Element | Element[] | null = null

  constructor (selector: string | Element | Element[]) {
    if (typeof selector === 'string') {
      // @ts-ignore
      this.elem = [...document.querySelectorAll(selector)]
    } else {
      this.elem = selector
    }
  }

  each (callback: (item: Element, index: number) => void): void {
    if (!this.elem) return
    if (Array.isArray(this.elem)) {
      this.elem.forEach(callback)
    } else {
      callback(this.elem, 0)
    }
  }

  eq (index: number): JQuery | null {
    if (Array.isArray(this.elem)) {
      return $(this.elem[index])
    }
    return this
  }

  find (selector: string): any {
    if (!this.elem) {
      return null
    }
    if (Array.isArray(this.elem)) {
      return null
    } else {
      // @ts-ignore
      return $([...this.elem.querySelectorAll(selector)])
    }
  }

  addClass (className: string): JQuery {
    this.each((item, index) => {
      item.classList.add(className)
    })
    return this
  }

  removeClass (className: string): JQuery {
    this.each((item, index) => {
      item.classList.remove(className)
    })
    return this
  }

  hasClass (className: string): boolean {
    if (!this.elem) return false
    if (Array.isArray(this.elem)) {
      return false
    } else {
      return this.elem.classList.contains(className)
    }
  }

  setAttr (key: string, value: string): JQuery {
    this.each((item, index) => {
      item.setAttribute(key, value)
    })
    return this
  }

  focus (): JQuery {
    if (!this.elem) return this
    if (!Array.isArray(this.elem)) {
      // @ts-ignore
      this.elem.focus()
    }
    return this
  }

  getAttr (key: string): string {
    if (!this.elem) return ''
    if (Array.isArray(this.elem)) {
      return ''
    } else {
      // @ts-ignore
      return this.elem.getAttribute(key)
    }
  }

  removeAttr (key: string): JQuery {
    return this
  }

  width (): number {
    if (!this.elem) return 0
    if (Array.isArray(this.elem)) {
      return 0
    } else {
      // @ts-ignore
      return this.elem.offsetWidth
    }
  }

  height (): number {
    if (!this.elem) return 0
    if (Array.isArray(this.elem)) {
      return 0
    } else {
      // @ts-ignore
      return this.elem.offsetHeight
    }
  }

  top (): number {
    // Relative distance to window
    if (!this.elem) return 0
    if (Array.isArray(this.elem)) {
      return 0
    } else {
      // @ts-ignore
      return this.elem.getBoundingClientRect().top
    }
  }

  left (): number {
    // Relative distance to window
    if (!this.elem) return 0
    if (Array.isArray(this.elem)) {
      return 0
    } else {
      // @ts-ignore
      return this.elem.getBoundingClientRect().left
    }
  }

  scrollTop (): number {
    if (!this.elem) return 0
    if (Array.isArray(this.elem)) {
      return 0
    } else {
      // @ts-ignore
      return this.elem.scrollTop
    }
  }

  scrollHeight (): number {
    if (!this.elem) return 0
    if (Array.isArray(this.elem)) {
      return 0
    } else {
      // @ts-ignore
      return this.elem.scrollHeight
    }
  }

  on (event: string, callback: (e: any) => void): JQuery {
    if (this.elem) {
      if (this.elem === document.documentElement) {
        document.addEventListener(event, callback)
      } else {
        this.each((item, index) => {
          item.addEventListener(event, callback)
        })
      }
    }
    return this
  }

  html (innerHTML: string): string | JQuery {
    if (!this.elem) return ''
    if (Array.isArray(this.elem)) {
      return ''
    } else {
      if (innerHTML !== undefined) {
        this.elem.innerHTML = innerHTML
        return this
      }
      // @ts-ignore
      return this.elem.innerHTML
    }
  }

  parent (): null | JQuery {
    if (!this.elem) return null
    if (Array.isArray(this.elem)) {
      return null
    } else {
      // @ts-ignore
      return $(this.elem.parentNode)
    }
  }

  getElem (): Element | Element[] | null {
    return this.elem
  }

  remove ():JQuery {
    this.each((item):void => {
      item.remove()
    })
    return this
  }

  setCss (obj: Record<string, string>):JQuery {
    for (const [key, value] of Object.entries(obj)) {
      this.each((item):void => {
        // @ts-ignore
        item.style[key] = value
      })
    }
    return this
  }

  getCSS (key: string): string | number {
    if (!this.elem) return ''
    if (Array.isArray(this.elem)) {
      return ''
    } else {
      // @ts-ignore
      return this.elem.style[key]
    }
  }
}

const $ = (selector: string | Element | null | Element[]): null | JQuery => {
  if (selector === null) return null
  if (typeof selector === 'string' && !document.querySelector(selector)) {
    return null
  }
  return new JQuery(selector)
}

export default $
