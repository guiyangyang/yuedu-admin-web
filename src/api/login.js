import request from '@/utils/request'

/* 登录 账号密码*/
export function loginByAccount (params) {
  return request({
    url: '/yuedu/loginByAccount',
    method: 'post',
    data: params
  })
}
/* 注册*/
export function register (params) {
  return request({
    url: '/yuedu/register',
    method: 'post',
    data: params
  })
}
export function getInfo (token) {
  return request({
    url: '/yuedu/info',
    method: 'get',
    params: { token }
  })
}

export function logout (params) {
  return request({
    url: '/logout',
    method: 'post',
    data: params
  })
}
