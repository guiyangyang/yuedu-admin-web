import axios from 'axios'
import { Message, MessageBox } from 'element-ui'
import store from '../store'
import { getToken } from '@/utils/auth'

// 创建axios实例
const service = axios.create({
  baseURL: process.env.BASE_API, // api 的 base_url
  timeout: 5000 // 请求超时时间
})

// request拦截器
service.interceptors.request.use(
  config => {
    let token = getToken();
    if (token) {
      config.headers.common['Authorization'] = 'Bearer ' + token;
    }
    return config
  },
  error => {
    // console.log(error) // for debug
    Promise.reject(error)
  }
)

// response 拦截器
service.interceptors.response.use(
  response => {
    const res = response.data
    // console.log(res)
    if (res.code !== 200) {
      if (res.code == 401) {
        Message({
          message: '您的登录已过期，请重新登录！',
          type: 'error',
          showClose: true
        })
        // MessageBox.confirm(
        //   '您尚未登录或已登录过期, 是否立即登录?',
        //   '温馨提示',
        //   {
        //     confirmButtonText: '确定',
        //     cancelButtonText: '取消',
        //     type: 'warning'
        //   }
        // ).then(() => {
        //   store.dispatch('FedLogOut').then(() => {
        //     location.reload() // 为了重新实例化vue-router对象 避免bug
        //   })
        // })
      } else {
        Message({
          message: res.data.message,
          type: 'error',
          showClose: true
          // duration: 5 * 1000
        })
      }

      return Promise.reject('error')
    } else {
      return response.data
    }
  },
  error => {
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

export default service
