import request from '@/utils/request';

/* 获取 视频列表 */
export function getVideos (params) {
  return request({
    url: '/yuedu/videos',
    method: 'post',
    data: params
  })
}

/* 获取 视频全部信息 */
export function getVideoInfos (params) {
  return request({
    url: '/yuedu/videoInfos',
    method: 'post',
    data: params
  })
}