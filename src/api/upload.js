import request from "@/utils/request"

export function uploadFormDatas (datas) {// 上传 网盘资源
  return request({
    url: '/apis/uploadForm',
    method: 'post',
    data: datas
  })
}

export function uploadEpub (datas) {// 上传 epub书籍
  return request({
    url: '/apis/uploadForm/epub',
    method: 'post',
    // contentType:'application/x-www-form-urlencoded',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    data: datas
  })
}

export function uploadImg (datas) {  //单独 上传图片
  return request({
    url: '/apis/uploadImg',
    method: 'post',
    data: datas
  })
}

export function imageupload (datas) {  //单独 上传图片
  return request({
    url: '/apis/imageupload',
    method: 'post',
    data: datas
  })
}