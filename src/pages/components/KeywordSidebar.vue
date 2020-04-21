<template>
  <div class="keywordsidebar-container">
    <div v-for="(item,index) in itmeList" :key="index" class="keyword-main">
      <div class="keyword-header">{{ item.text }}</div>
      <div class="keyword-list">
        <span
          v-for="(chdItem,chdIndex) in item.list"
          :key="chdIndex"
          class="keyword-item"
          :class="activeClass[index] === chdItem.kwId ? 'active':''"
          @click="getItme(index,chdItem.kwId)"
        >
          {{ chdItem.kwName }}
        </span>
      </div>
    </div>

  </div>
</template>
<script>
import { keywordList } from '@/api/simulation'
export default {
  data() {
    return {
      tempIndex: 0,
      activeClass: [],
      itmeList: []
    }
  },
  mounted() {
    this.keywordList()
  },
  methods: {
    keywordList() {
      var that = this
      keywordList({}).then(response => {
        console.log(response.list)
        var item = null
        var oneObj = {}
        var twoObj = {}
        var threeObj = {}
        for (var index in response.list) {
          item = response.list[index]
          if (item.type === 1) {
            oneObj.text = '【交互类型】'
            if (oneObj.list == null || oneObj.list === undefined) {
              oneObj.list = []
            }
            oneObj.list.push(item)
          } else if (item.type === 2) {
            twoObj.text = '【区域类型】'
            if (twoObj.list == null || twoObj.list === undefined) {
              twoObj.list = []
            }
            twoObj.list.push(item)
          } else if (item.type === 3) {
            threeObj.text = '【道路类型】'
            if (threeObj.list == null || threeObj.list === undefined) {
              threeObj.list = []
            }
            threeObj.list.push(item)
          }
        }
        that.itmeList.push(oneObj)
        that.itmeList.push(twoObj)
        that.itmeList.push(threeObj)
      })
    },
    getItme(index, id) {
      if (this.activeClass[index] === id) {
        this.$set(this.activeClass, index, '-0')
      } else {
        this.$set(this.activeClass, index, id)
      }

      this.$emit('handleTreeNodeClick', this.activeClass)
    }
  }
}
</script>
<style scoped>
  .keywordsidebar-container {
    height: 100%;
    width: 100%;
    background-color: #304156;
    overflow-y:scroll;
    color:#fff;
    font-size: 14px;
  }
  .keyword-main {
    width: 100%;
  }
  .keyword-header {
    padding: 5px 10px;
    margin: 2px 4px;
    font-weight: bold;
  }
  .keyword-list {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
  }
  .keyword-item {
    display: block;
    padding: 5px 10px;
    margin: 8px 5px;
    cursor: pointer;
    box-shadow: 0px 2px 0px #1f2d3d;
    border-radius: 2px;
    /* background-color: red; */
  }
  .keyword-list>.active {
    color: #409EFF;
    box-shadow: 0px 2px 0px #409EFF;
  }
</style>
