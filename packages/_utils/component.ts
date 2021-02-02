import { App, VNode } from 'vue'

export const withInstall = <T> (comp: T): T => {
  const c = comp as any
  c.install = function (app: App) {
    app.component(c.displayName || c.name, comp)
  }

  return comp as T & Plugin
}

export function childAddProps (child: VNode, props: {}): VNode {
  child.props = { ...child.props, ...props }
  return child
}

export function childrenAddProps (children: VNode[], props: {}): VNode[] {
  return children.map(child =>
    childAddProps(child, props)
  )
}
