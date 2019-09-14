import request from '@/utils/request';

export function getOrders (params) {
  return request({
    url: '/orders',
    method: 'post',
    data: params
  })
}