import { App, VNode } from 'vue'

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
    if (typeof children[i].type === 'symbol') {
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
