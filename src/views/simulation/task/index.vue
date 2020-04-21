<template>
  <div>
    <h1 class="d2-mt-0">任务管理</h1>
    <div id="top">
      <el-row class="d2-mb">
        <el-form :inline="true">
          <el-form-item label="任务名称">
            <el-input v-model.trim="searchObj.taskName" type="text" placeholder="任务名称" />
          </el-form-item>
          <el-form-item label="任务状态">
            <el-select v-model="filters.options.statusOptions.value" placeholder="请选择">
              <el-option
                v-for="item in filters.options.statusOptions.options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button @click="search">查询</el-button>
            <el-button type="primary" @click="handleAdd">新增</el-button>
            <el-button type="primary" @click="distributionData">分发</el-button>
          </el-form-item>
        </el-form>
      </el-row>
    </div>

    <el-dialog :title="dialogTitle" :visible.sync="addDialogVisible" :close-on-click-modal="false">
      <el-form ref="taskRef" label-width="80px" :model="task">
        <el-form-item label="任务名称" prop="taskName">
          <el-input v-model="task.taskName" auto-complete="off" />
        </el-form-item>
        <el-form-item label="任务范围" prop="scope">
          <el-input
            v-model="task.scope"
            class="textarea-class"
            type="textarea"
            :rows="4"
            placeholder="请输入内容"
          />
        </el-form-item>
        <el-form-item label="任务要素" prop="element">
          <el-input
            v-model="task.element"
            class="textarea-class"
            type="textarea"
            :rows="4"
            placeholder="请输入内容"
          />
        </el-form-item>
        <el-form-item label="数据用途" prop="dataUsed">
          <el-input
            v-model="task.dataUsed"
            class="textarea-class"
            type="textarea"
            :rows="4"
            placeholder="请输入内容"
          />
        </el-form-item>
        <el-form-item label="任务状态">
          <el-select v-model="options.statusOptions.value" placeholder="请选择">
            <el-option
              v-for="item in options.statusOptions.options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="commitEvent('taskRef')">立即提交</el-button>
          <el-button @click="addDialogVisible=false">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>

    <el-table ref="taskTableRef" :data="tasks" style="width: 100%">
      <el-table-column type="selection" width="55" />
      <!-- <el-table-column prop="userId" label="主键" width="180" /> -->
      <el-table-column prop="taskName" label="任务名称" width="180" />
      <el-table-column prop="scope" label="任务范围" width="180" />
      <!-- <el-table-column prop="element" label="任务要素" />
      <el-table-column prop="dataUsed" label="数据用途" /> -->
      <el-table-column
        prop="status"
        label="任务状态"
        :formatter="formatOptions"
        sortable
      />

      <el-table-column prop="sysUser.nickname" label="负责人" />
      <!-- <el-table-column prop="remark" label="备注" /> -->
      <el-table-column
        prop="optTime"
        label="操作时间"
        :formatter="formatDate"
        sortable
      />
      <!-- <el-table-column prop="optPerson" label="操作人" /> -->
      <el-table-column label="操作" fixed="right" align="center" width="400">
        <template slot-scope="scope">
          <el-button size="small" type="success" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button size="small" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          <el-button size="small" type="danger" disabled>重新分发</el-button>
        </template>
      </el-table-column>
    </el-table>

    <div align="center">
      <el-pagination
        :current-page="currentPage"
        :page-sizes="[10, 20, 30, 40]"
        :page-size="pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="totalCount"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
    <DataDistributor
      ref="dataDistributorRef"
      :data-distributor-dialog-visible="dataDistributorDialogVisible"
      @changeDataDistributor="changeDataDistributor"
      @callback="callbackDataDistributor"
    />
  </div>
</template>

<script>
import { findTaskList, addTask, deleteTask, editTask, addTaskUser } from '@/api/simulation'
import DataDistributor from '@/views/data/datadistributor/index'
import moment from 'moment'

export default {
  name: 'DataTask',
  components: {
    DataDistributor
  },
  data() {
    return {
      dataDistributorDialogVisible: false,
      dialogTitle: '新增',
      tasks: [],
      addDialogVisible: false,
      searchText: '',
      task: {
        taskId: '',
        taskName: '',
        scope: '',
        element: '',
        dataUsed: '',
        status: 0,
        remark: ''
      },
      searchObj: {
        taskId: '',
        taskName: '',
        scope: '',
        element: '',
        dataUsed: '',
        status: 0,
        remark: ''
      },
      filters: {
        options: {
          statusOptions: {
            options: [
              {
                value: '',
                label: '请选择'
              },
              {
                value: 0,
                label: '新增'
              },
              {
                value: 1,
                label: '已下发'
              },
              {
                value: 2,
                label: '完成'
              }
            ],
            value: ''
          }
        }
      },
      options: {
        statusOptions: {
          options: [
            {
              value: 0,
              label: '新增'
            },
            {
              value: 1,
              label: '已下发'
            },
            {
              value: 2,
              label: '完成'
            }
          ],
          value: 0
        }

      },
      // 默认每页数据量
      pagesize: 10,
      // 当前页码
      currentPage: 1,
      // 查询的页码
      start: 1,
      // 默认数据总数
      totalCount: 1000
    }
  },
  mounted() {
    this.search()
  },
  methods: {
    // 搜索
    search: function() {
      this.getTasks(this.currentPage, this.pagesize)
    },
    getTasks: function(pageNum, pageSize) {
      const that = this
      this.getFilters()
      this.searchObj.pageNum = pageNum
      this.searchObj.pageSize = pageSize
      findTaskList(this.searchObj).then(response => {
        that.tasks = response.list.list
        that.totalCount = response.number
      })
    },
    addTask: function(event) {
      var that = this
      addTask(that.task).then(response => {
        if (response) {
          that.$message({
            type: 'success',
            message: '执行成功!'
          })
          that.search()
          that.addDialogVisible = false
        }
      })
    },
    handleDelete: function(index, row) {
      var that = this
      this.$confirm('此操作将永久删除该记录, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          deleteTask({ taskId: row.taskId }).then(response => {
            if (response) {
              that.$message({
                type: 'success',
                message: '执行成功'
              })
              that.search()
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
    handleAdd() {
      this.dialogTitle = '新增'
      this.addDialogVisible = true
      this.task = {
        taskId: '',
        taskName: '',
        scope: '',
        element: '',
        dataUsed: '',
        status: 0,
        remark: ''
      }
    },
    handleEdit: function(index, row) {
      var that = this
      that.dialogTitle = '编辑'
      that.addDialogVisible = true
      that.initRowToObj(row)
    },
    editTask: function(event) {
      var that = this
      editTask(that.task).then(response => {
        if (response) {
          that.$message({
            type: 'success',
            message: '执行成功!'
          })
          that.search()
          that.addDialogVisible = false
        }
      })
    },
    commitEvent: function(taskRef) {
      var that = this
      this.optionsToInfo()
      this.$refs[taskRef].validate((valid) => {
        if (valid) {
          if (this.dialogTitle === '新增') {
            that.addTask()
          } else {
            that.editTask()
          }
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    getFilters: function() {
      for (var key in this.filters.options) {
        var propKey = key.substr(0, key.length - 7)
        this.searchObj[propKey] = this.filters.options[key]['value']
      }
    },

    // 每页显示数据量变更
    handleSizeChange: function(val) {
      this.pagesize = val
      this.getTasks(this.currentPage, this.pagesize)
    },

    // 页码变更
    handleCurrentChange: function(val) {
      this.currentPage = val
      this.getTasks(this.currentPage, this.pagesize)
    },
    formatDate(row, column) {
      // 获取单元格数据
      const date = row[column.property]
      if (date === undefined || date === null) {
        return ''
      }
      return moment(date).format('YYYY-MM-DD HH:mm:ss')
    },

    initRowToObj: function(row) {
      this.task = JSON.parse(JSON.stringify(row))
      this.infoToOptions()
    },

    infoToOptions: function() {
      for (var key in this.options) {
        var propKey = key.substr(0, key.length - 7)
        this.options[key]['value'] = this.task[propKey]
      }
    },

    optionsToInfo: function() {
      for (var key in this.options) {
        var propKey = key.substr(0, key.length - 7)
        this.task[propKey] = this.options[key]['value']
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
    },
    changeDataDistributor(dialogVisible) {
      this.dataDistributorDialogVisible = dialogVisible
    },
    distributionData() {
      var selectedTable = this.$refs.taskTableRef.store.states.selection
      if (selectedTable.length === 0) {
        this.$message({
          message: '请先选择数据',
          type: 'warning'
        })
        return
      }
      for (var i = 0; i < selectedTable.length; i++) {
        if (selectedTable[i].status !== 0) {
          this.$message({
            message: '不能选择已下发的数据',
            type: 'warning'
          })
          return
        }
      }
      this.dataDistributorDialogVisible = true
      this.$refs.dataDistributorRef.init()
    },
    callbackDataDistributor(obj) {
      this.commitDistribution(obj)
    },
    commitDistribution(selectedUser) {
      var selectedTable = this.$refs.taskTableRef.store.states.selection
      for (var i = 0; i < selectedTable.length; i++) {
        selectedTable[i].sysUser = selectedUser
      }
      addTaskUser(selectedTable).then(response => {
        if (response.status === 20000) {
          this.$message({
            type: 'success',
            message: response.message
          })
          this.dataDistributorDialogVisible = false
          this.search()
        } else {
          this.$message({
            type: 'warning',
            message: response.message
          })
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
$dark_gray:#889aa4;
.show-pwd {
  position: absolute;
  right: 10px;
  top: 0px;
  font-size: 16px;
  color: $dark_gray;
  cursor: pointer;
  user-select: none;
}
</style>

