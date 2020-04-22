<template>
  <div id="App">
    <navbar :active-index="activeIndex" />
    <el-row class="mainlist-row">
      <el-col class="mainlist-col" :span="4">
        <sidebar @handleTreeNodeClick="handleTreeNodeClick" />
      </el-col>
      <el-col class="mainlist-col" :span="20">
        <main-list ref="mainlistRef" :search-obj="searchObj" :fun-type="funType" />
      </el-col>
    </el-row>

  </div>
</template>

<script>

import { Navbar, Sidebar, MainList } from '../components'
export default {
  name: 'App',
  components: {
    Navbar,
    Sidebar,
    MainList
  },
  data() {
    return {
      activeIndex: '2',
      funType: 'list',
      searchObj: {
        sceneName: '',
        sceneDescription: '',
        roadType: '',
        sceneType: '',
        sceneSource: '',
        status: '',
        previewFile: '',
        reviewStatus: 2,
        reviewComment: '',
        scenetypeList: [],
        pageNum: 1,
        pageSize: 10
      }
    }
  },
  mounted() {
  },
  methods: {
    handleTreeNodeClick(obj, funType) {
      console.log('handleTreeNodeClick...', obj)
      this.searchObj.scenetypeList = obj
      // this.searchObj.scenetypeList = [{ stId: obj.stId }]
      this.$refs.mainlistRef.getSceneList(this.searchObj, funType)
    }
  }
}
</script>
<style lang="scss">
  #App {
    height: 100%;
  }
  .mainlist-row{
    height: calc(100% - 60px);
  }
  .mainlist-col {
    height: 100%;
  }

  .el-menu.el-menu--horizontal {
      border-bottom: none;
  }
  /* 设置tree最外层的背景色为none,字体颜色为白色 */
  .el-tree {
      background:none;
      color: #ffffff;
  }
  /* 设置三角图标的颜色 */
  .el-tree-node__expand-icon{
      color:#ffffff;
  }
  .el-tree-node__content {
      height: 40px;
  }
  /* 设置节点鼠标悬浮三角图标鼠标悬浮颜色 */
  .el-tree-node__content:hover .el-tree-node__expand-icon{
      color:#409EFF;
  }
  .el-tree-node__content:hover .el-tree-node__expand-icon.is-leaf{
      color:transparent;
  }

  /* 树节点鼠标悬浮时改变背景颜色为白色，字体为黑色 */
  .el-tree-node__content:hover{
      background-color: #1f2d3d!important;
      color: #409EFF!important;
  }
  /* 节点前边的三角图标并不会被节点样式影响，需要单独修改 */
  .el-tree-node:focus>.el-tree-node__content .el-tree-node__expand-icon{
      color:#409EFF;
  }
  /* 改变被点击节点背景颜色，背景颜色改为白色，字体为黑色 */
  .el-tree-node:focus>.el-tree-node__content{
      background-color: #304156;
      color: #409EFF;
  }
</style>
