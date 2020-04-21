<template>
  <div class="sidebar-container">
    <el-tree :data="data" :props="defaultProps" @node-click="handleNodeClick" />
  </div>
</template>
<script>
import { getSseSceneTypeTreeById } from '@/api/simulation'
export default {
  data() {
    return {
      data: [{
        label: '一级 1',
        children: [{
          label: '二级 1-1',
          children: [{
            label: '三级 1-1-1'
          }]
        }]
      }, {
        label: '一级 2',
        children: [{
          label: '二级 2-1',
          children: [{
            label: '三级 2-1-1'
          }]
        }, {
          label: '二级 2-2',
          children: [{
            label: '三级 2-2-1'
          }]
        }]
      }, {
        label: '一级 3',
        children: [{
          label: '二级 3-1',
          children: [{
            label: '三级 3-1-1'
          }]
        }, {
          label: '二级 3-2',
          children: [{
            label: '三级 3-2-1'
          }]
        }]
      }],
      defaultProps: {
        children: 'children',
        label: 'stName'
      }
    }
  },
  mounted() {
    this.getSseSceneTypeTreeById()
  },
  methods: {
    handleNodeClick(data) {
      console.log(data)
      this.$emit('handleTreeNodeClick', data, 'list')
    },
    getSseSceneTypeTreeById() {
      var that = this
      getSseSceneTypeTreeById({ stId: '0' }).then(response => {
        // var list = response.data.children
        console.log('getSseSceneTypeTreeById....', response)
        that.data = response.data.children
      })
    }
  }
}
</script>
<style>
    .sidebar-container{
        height: 100%;
        width: 100%;
        background-color: #304156;
        overflow-y:scroll;
    }

</style>
