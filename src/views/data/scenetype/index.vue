<template>
  <div>
    <h1 class="d2-mt-0">场景类型管理</h1>
    <el-row class="d2-mb" :gutter="10">
      <el-col :span="6">
        <el-input v-model="searchText" type="text" placeholder="部门名称" :disabled="true" />
      </el-col>
      <el-col :span="18">
        <el-button @click="search">查询</el-button>
        <el-button type="primary" @click="handleAdd()">新增</el-button>
        <!-- <el-button type="primary">修改</el-button>
        <el-button type="primary">删除</el-button> -->
      </el-col>
    </el-row>

    <!-- el-table -->
    <el-table :data="sceneTypes" row-key="stId" border :tree-props="{children: 'children'}">
      <el-table-column prop="stId" label="场景类型ID" />
      <el-table-column prop="stName" label="场景类型名称" />
      <el-table-column prop="stNameEnglish" label="英文名称" />
      <el-table-column prop="parentSceneType.stName" label="上级分类" />
      <el-table-column prop="stType" label="类型" :formatter="formatOptions" />
      <el-table-column prop="orders" label="排序号" />
      <el-table-column label="操作" fixed="right" align="center">
        <template slot-scope="scope">
          <el-button size="small" type="primary" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button size="small" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog :title="dialogTitle" :visible.sync="addDialogVisible" :close-on-click-modal="false">
      <el-form label-width="100px">
        <el-form-item label="类型名称">
          <el-input v-model="sceneType.stName" auto-complete="off" />
        </el-form-item>
        <el-form-item label="类型英文">
          <el-input v-model="sceneType.stNameEnglish" auto-complete="off" />
        </el-form-item>
        <el-form-item label="上级">
          <el-input
            v-model="sceneType.parentSceneType.stName"
            auto-complete="off"
            readonly="readonly"
            @click.native="showTree"
          />
        </el-form-item>
        <el-form-item label="类别">
          <el-select v-model="options.stTypeOptions.value" placeholder="请选择">
            <el-option
              v-for="item in options.stTypeOptions.options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <!-- <el-form-item label="上级部门">
          <el-input
            v-model="dept.parentName"
            auto-complete="off"
            readonly="readonly"
            @click.native="showTree"
          />
        </el-form-item> -->
        <el-form-item label="排序号">
          <el-input-number
            v-model="sceneType.orders"
            :step="1"
            :min="0"
            :max="1000000"
            controls-position="right"
          />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="commitEvent">立即提交</el-button>
          <el-button @click="addDialogVisible=false">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>

    <el-dialog title="上级类别" :visible.sync="treeDialog" :close-on-click-modal="false">
      <el-container style="height: 400px;width:100%; border: 1px solid #eee;overflow-y: scroll;">
        <el-tree
          ref="tree"
          style="width:100%;"
          :data="data2"
          node-key="stId"
          highlight-current
          :props="defaultProps"
          :default-expanded-keys="defaultExpandedKeys"
          :default-checked-keys="defaultCheckedKeys"
        />
      </el-container>
      <div slot="footer" class="dialog-footer">
        <el-button @click="treeDialog = false">取 消</el-button>
        <el-button type="primary" @click="saveParent">确 定</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
// import util from '@/libs/util.js'
import { getSceneTypeTree, addSceneType, editSceneType, deleteSceneType } from '@/api/simulation'
// import qs from 'qs'
// import treeToArray from '@/utils/eval.js'
export default {
  name: 'SceneType',
  data() {
    return {
      dialogTitle: '新增',
      searchText: '',
      addDialogVisible: false,
      sceneTypes: [],
      sceneType: {
        stId: '-1',
        pId: '',
        stName: '',
        stNameEnglish: '',
        stType: 0,
        orders: 0,
        parentSceneType: {
          stId: '-1',
          stName: ''
        }
      },
      options: {
        stTypeOptions: {
          options: [
            {
              value: 1,
              label: '类别'
            },
            {
              value: 2,
              label: '场景'
            }
          ],
          value: 1
        }
      },

      treeDialog: false,
      data2: [],
      defaultProps: {
        children: 'children',
        label: 'stName'
      },
      defaultExpandedKeys: ['-1'],
      defaultCheckedKeys: ['-1'],
      editCheckId: ''
    }
  },
  mounted() {
    this.search()
  },
  methods: {
    // 搜索
    search: function() {
      this.getSceneTypes()
    },
    getSceneTypes: function(event) {
      var that = this
      getSceneTypeTree({ stId: '0' }).then(response => {
        that.sceneTypes = response.data.children
      })
    },
    showTree: function() {
      var that = this
      getSceneTypeTree({ stId: '0', stType: 1 }).then(response => {
        that.data2 = [response.data]
        that.treeDialog = true
        that.defaultExpandedKeys = [that.sceneType.parentSceneType.stId]
        that.defaultCheckedKeys = [that.sceneType.stId]
      })
    },

    handleAdd() {
      this.dialogTitle = '新增'
      this.addDialogVisible = true
      this.sceneType = {
        stId: '-1',
        pId: '',
        stName: '',
        stNameEnglish: '',
        stType: 0,
        orders: 0,
        parentSceneType: {
          stId: '-1',
          stName: ''
        }
      }
    },
    handleEdit: function(index, row) {
      this.dialogTitle = '编辑'
      this.initRowToObj(row)
      this.addDialogVisible = true
    },
    initRowToObj: function(row) {
      this.sceneType = JSON.parse(JSON.stringify(row))
      this.infoToOptions()
    },
    // 单行删除
    handleDelete: function(index, row) {
      const that = this
      this.sceneType = row
      this.$confirm('此操作将永久删除该记录, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          deleteSceneType(this.sceneType).then(response => {
            that.search()
            if (response.status === 20000) {
              that.$message({
                type: 'success',
                message: '执行成功!'
              })
              that.addDialogVisible = false
            } else {
              that.$message({
                type: 'error',
                message: response.message
              })
            }
          })
        })
        .catch(() => {
          that.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    },
    saveParent: function() {
      this.currentNode = this.$refs.tree.getCurrentNode()
      this.treeDialog = false
      console.log(this.currentNode)
      this.sceneType.pId = this.currentNode.stId
      this.sceneType.parentSceneType.stName = this.currentNode.stName
    },
    addDept: function(event) {
      var that = this
      this.dialogTitle = '新增'
      addSceneType(that.sceneType).then(response => {
        that.search()
        if (response.status === 20000) {
          that.$message({
            type: 'success',
            message: '执行成功!'
          })
          that.addDialogVisible = false
        } else if (response.status === 50001) {
          that.$message({
            type: 'warning',
            message: '执行失败!'
          })
        }
      })
    },
    editDept: function(event) {
      var that = this
      this.dialogTitle = '编辑'
      editSceneType(that.sceneType).then(response => {
        that.search()
        if (response.status === 20000) {
          that.$message({
            type: 'success',
            message: '执行成功!'
          })
          that.addDialogVisible = false
        } else {
          that.$message({
            type: 'error',
            message: '执行失败!'
          })
        }
      })
    },
    commitEvent: function() {
      this.optionsToInfo()
      if (this.dialogTitle === '新增') {
        this.addDept()
      } else {
        this.editDept()
      }
    },
    infoToOptions: function() {
      for (var key in this.options) {
        var propKey = key.substr(0, key.length - 7)
        this.options[key]['value'] = this.sceneType[propKey]
      }
    },
    optionsToInfo: function() {
      for (var key in this.options) {
        var propKey = key.substr(0, key.length - 7)
        this.sceneType[propKey] = this.options[key]['value']
      }
    },

    formatOptions(row, column) {
      // 获取单元格数据
      const val = row[column.property]
      var result = ''
      var tempOptionsStr = column.property + 'Options'
      var tempOptionsObj = this.options[tempOptionsStr]
      for (var index in tempOptionsObj.options) {
        var item = tempOptionsObj.options[index]
        if (val === item.value) {
          result = item.label
        }
      }
      return result
    }
  }
}
</script>
