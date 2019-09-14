import LogReg from './src/index.vue';

LogReg.install = function (Vue) {
  Vue.component(LogReg.name, LogReg)
}

export default LogReg