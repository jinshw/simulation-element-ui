<template>
  <div id="App">
    <navbar :active-index="activeIndex" />
    <el-row class="mainlist-row">
      <el-col class="mainlist-col" :span="4">
        <keyword-sidebar @handleTreeNodeClick="handleTreeNodeClick" />
      </el-col>
      <el-col class="mainlist-col" :span="20">
        <search @search="search" />
        <main-list ref="mainlistRef" :search-obj="searchObj" :fun-type="funType" />
      </el-col>
    </el-row>

  </div>
</template>

<script>

import { Navbar, KeywordSidebar, MainList, Search } from '../components'
export default {
  name: 'App',
  components: {
    Navbar,
    KeywordSidebar,
    MainList,
    Search
  },
  data() {
    return {
      activeIndex: '3',
      funType: 'listByKeyword',
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
        pageNum: 1,
        pageSize: 10
      }
    }
  },
  mounted() {
  },
  methods: {
    search(text) {
      this.searchObj.sceneName = text
      this.searchObj.sceneDescription = text
      this.getSceneList()
    },
    handleTreeNodeClick(obj) {
      console.log('handleTreeNodeClick...', obj)
      this.searchObj.keywords = obj
      this.getSceneList()
    },
    getSceneList() {
      this.$refs.mainlistRef.getSceneList(this.searchObj, 'listByKeyword')
    }
  }
}
</script>
<style lang="scss" scoped>
  #App {
    height: 100%;
  }
  .mainlist-row{
    height: calc(100% - 60px);
  }
  .mainlist-col {
    height: 100%;
  }
</style>
