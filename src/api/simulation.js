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
export function sceneWebList(data) {
  return request({
    url: '/sseSceneDatas/weblist',
    method: 'post',
    data
  })
}
export function sceneListByKeyword(data) {
  return request({
    url: '/sseSceneDatas/listByKeyword',
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
export function mySceneList(data) {
  return request({
    url: '/sseSceneDatas/mySceneList',
    method: 'post',
    data
  })
}

export function getSceneTypeTree(data) {
  return request({
    url: '/sceneType/getTree',
    method: 'post',
    data
  })
}
export function getSseSceneTypeTreeById(data) {
  return request({
    url: '/sceneType/getSseSceneTypeTreeById',
    method: 'post',
    data
  })
}
export function addSceneType(data) {
  return request({
    url: '/sceneType/addSceneType',
    method: 'post',
    data
  })
}
export function editSceneType(data) {
  return request({
    url: '/sceneType/editSceneType',
    method: 'post',
    data
  })
}
export function deleteSceneType(data) {
  return request({
    url: '/sceneType/deleteSceneType',
    method: 'post',
    data
  })
}

export function keywordList(data) {
  return request({
    url: '/keyword/list',
    method: 'post',
    data
  })
}
export function keywordPageList(data) {
  return request({
    url: '/keyword/pageList',
    method: 'post',
    data
  })
}
export function getTotalDatas(data) {
  return request({
    url: '/sseChart/getTotalDatas',
    method: 'post',
    data
  })
}
export function findLineChart(data) {
  return request({
    url: '/sseChart/findLineChart',
    method: 'post',
    data
  })
}
export function findPieChart(data) {
  return request({
    url: '/sseChart/findPieChart',
    method: 'post',
    data
  })
}
export function findTaskList(data) {
  return request({
    url: '/sseTask/taskList',
    method: 'post',
    data
  })
}
export function findDistributionList(data) {
  return request({
    url: '/sseTask/findDistributionList',
    method: 'post',
    data
  })
}
export function addTask(data) {
  return request({
    url: '/sseTask/addData',
    method: 'post',
    data
  })
}
export function deleteTask(data) {
  return request({
    url: '/sseTask/delete',
    method: 'post',
    data
  })
}
export function editTask(data) {
  return request({
    url: '/sseTask/edit',
    method: 'post',
    data
  })
}
export function addTaskUser(data) {
  return request({
    url: '/sseTask/addTaskUser',
    method: 'post',
    data
  })
}
export function addCollectionUser(data) {
  return request({
    url: '/sseCDDatas/addCollectionUser',
    method: 'post',
    data
  })
}
export function findCdDatasDistributionList(data) {
  return request({
    url: '/sseCDDatas/findDistributionList',
    method: 'post',
    data
  })
}
export function myCollectionList(data) {
  return request({
    url: '/sseCDDatas/myCollectionList',
    method: 'post',
    data
  })
}
export function addSceneUser(data) {
  return request({
    url: '/sseSceneDatas/addSceneUser',
    method: 'post',
    data
  })
}
export function findSceneDistributionList(data) {
  return request({
    url: '/sseSceneDatas/findSceneDistributionList',
    method: 'post',
    data
  })
}
export function todolist(data) {
  return request({
    url: '/sseChart/todolist',
    method: 'post',
    data
  })
}

