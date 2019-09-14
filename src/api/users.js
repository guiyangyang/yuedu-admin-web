import request from '@/utils/request';

export function getUsers (params) {
  return request({
    url: '/users',
    method: 'post',
    data: params
  })
}