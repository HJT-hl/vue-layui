import { App } from 'vue'

export const withInstall = <T> (comp: T):T => {
  const c = comp as any
  c.install = function (app: App) {
    app.component(c.displayName || c.name, comp)
  }

  return comp as T & Plugin
}
