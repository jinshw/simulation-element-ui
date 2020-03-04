import request from '@/utils/request'

export function list(data) {
  return request({
    url: '/sseCDDatas/list',
    method: 'post',
    data
  })
}
export function getCollectionDataListNotPage(data) {
  return request({
    url: '/sseCDDatas/getListNotPage',
    method: 'post',
    data
  })
}
export function addData(data) {
  return request({
    url: '/sseCDDatas/addData',
    method: 'post',
    data
  })
}
export function editData(data) {
  return request({
    url: '/sseCDDatas/editData',
    method: 'post',
    data
  })
}
export function deleteData(data) {
  return request({
    url: '/sseCDDatas/deleteData',
    method: 'post',
    data
  })
}
export function sceneList(data) {
  return request({
    url: '/sseSceneDatas/list',
    method: 'post',
    data
  })
}
export function addScene(data) {
  return request({
    url: '/sseSceneDatas/addData',
    method: 'post',
    data
  })
}
export function editScene(data) {
  return request({
    url: '/sseSceneDatas/editData',
    method: 'post',
    data
  })
}
export function deleteScene(data) {
  return request({
    url: '/sseSceneDatas/deleteScene',
    method: 'post',
    data
  })
}
export function imgUpload(data) {
  return request({
    url: '/sseSceneDatas/imgUpload',
    method: 'post',
    data
  })
}
export function getPreviewFileUrl(data) {
  return request({
    url: '/sseSceneDatas/getPreviewFileUrl',
    method: 'post',
    data
  })
}
