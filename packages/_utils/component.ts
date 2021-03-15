import { App, VNode, Fragment } from 'vue'

export const withInstall = <T> (comp: T): T => {
  const c = comp as any
  c.install = function (app: App) {
    app.component(c.displayName || c.name, comp)
  }

  return comp as T & Plugin
}

export function childAddProps (child: VNode, props: Record<string, unknown>): VNode {
  child.props = { ...child.props, ...props }
  return child
}

export function childrenAddProps (children: VNode[], props: Record<string, unknown>): VNode[] {
  const c = []

  for (let i = 0; i < children.length; i++) {
    if (children[i].type === Fragment) {
      if (Array.isArray(children[i].children)) {
        // @ts-ignore
        c.push(...children[i].children.map(child =>
          childAddProps(child, props)
        ))
      }
    } else {
      c.push(childAddProps(children[i], props))
    }
  }
  return c
}

export function getChildren (children: VNode[], childrenName: string): VNode[] {
  let c: any[] = []
  if (children) {
    for (let i = 0; i < children.length; i++) {
      if (children[i].type === Fragment) {
        if (Array.isArray(children[i].children)) {
          // @ts-ignore
          const ch = children[i].children.filter((item) => item.type.name === childrenName)
          // @ts-ignore
          c = [...c, ...ch]
        }
      } else {
        // @ts-ignore
        if (children[i].type.name === childrenName) c.push(children[i])
      }
    }
  }
  return c
}
