import VerifyCode from './src/index.vue'

/* istanbul ignore next */
VerifyCode.install = function (Vue) {
  Vue.component(VerifyCode.name, VerifyCode)
}

export default VerifyCode
