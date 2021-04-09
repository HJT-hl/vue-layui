import { createApp } from 'vue'
// TypeScript error? Run VSCode command
// TypeScript: Select TypeScript version - > Use Workspace Version
import '../packages/_assets/base.less'
import App from './App.vue'

console.log(window.innerHeight)
createApp(App).mount('#app')
