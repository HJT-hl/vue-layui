import { createApp } from 'vue'
// TypeScript error? Run VSCode command
// TypeScript: Select TypeScript version - > Use Workspace Version
import App from './App.vue'
import { LayerOpen, LayerClose, alert,confirm,message } from '../packages'

const app = createApp(App)
app.config.globalProperties.$layerOpen = LayerOpen
app.config.globalProperties.$layerClose = LayerClose
app.config.globalProperties.$alert = alert
app.config.globalProperties.$confirm = confirm
app.config.globalProperties.$message = message
app.mount('#app')
