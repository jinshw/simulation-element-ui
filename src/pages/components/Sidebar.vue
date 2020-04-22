<template>
  <div class="sidebar-container">
    <el-tree
      ref="tree"
      show-checkbox
      :check-strictly="true"
      :data="data"
      :props="defaultProps"
      node-key="stId"
      @node-click="handleNodeClick"
      @check-change="checkChange"
    />
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
        label: 'stName',
        disabled: function(data, node) {
          if (data.stType !== 2) { // 只能选择场景类型节点
            return true
          } else {
            return false
          }
        }
      }
    }
  },
  mounted() {
    this.getSseSceneTypeTreeById()
  },
  methods: {
    handleNodeClick(data) {
      // console.log(data)
      // this.$emit('handleTreeNodeClick', data, 'list')
    },
    // handleNodeClick(item, node, self) { // 自己定义的editCheckId，防止单选出现混乱
    //   /* if (item.children.length === 0) {
    //     this.editCheckId = item.stId
    //     this.$refs.tree.setCheckedKeys([item.stId])
    //   } */
    // },
    checkChange(item, node, self) {
      console.log('this.$refs.tree.getCheckedNodes()---', this.$refs.tree.getCheckedNodes())
      var nodes = this.$refs.tree.getCheckedNodes()
      this.$emit('handleTreeNodeClick', nodes, 'list')
      /* if (item.children.length === 0) {
        if (node === true) {
          this.editCheckId = item.stId
          this.$refs.tree.setCheckedKeys([item.stId])
        } else {
          if (this.editCheckId === item.stId) {
            this.$refs.tree.setCheckedKeys([item.stId])
          }
        }
      } else {
        this.$refs.tree.setChecked(item, false)
      } */
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
