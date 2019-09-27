import request from '@/utils/request';

export function getOrders (params) {
  return request({
    url: '/apis/orders',
    method: 'post',
    data: params
  })
}