// https://vuex.vuejs.org/en/modules.html
import auth from './auth'
import notify from './notify'
import report from './report'
import filter from './filter'

const requireModule = require.context('.', true, /\.js$/)
const modules = {
  auth,
  report,
  notify,
  filter
}

requireModule.keys().forEach(fileName => {
  if (fileName === './index.js') return

  // Replace ./ and .js
  const path = fileName.replace(/(\.\/|\.js)/g, '')
  const [moduleName, imported] = path.split('/')

  if (!modules[moduleName]) {
    modules[moduleName] = {
      namespaced: true
    }
  }

  modules[moduleName][imported] = requireModule(fileName).default
})

export default modules
