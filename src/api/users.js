import request from '@/utils/request';

export function getUsers (params) {
  return request({
    url: '/apis/users',
    method: 'post',
    data: params
  })
}