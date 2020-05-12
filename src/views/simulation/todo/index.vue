<template>
  <div>
    <h1 class="d2-mt-0">待办任务</h1>

    <el-table ref="tableRef" :data="todos" style="width: 100%">
      <el-table-column prop="moduleName" label="模块名称" />
      <el-table-column prop="todoName" label="任务名称" />
      <el-table-column prop="statusName" label="状态" />
      <el-table-column
        prop="time"
        label="操作时间"
        :formatter="formatDate"
        sortable
      />
      <el-table-column label="操作" width="400">
        <template slot-scope="scope">
          <el-button
            size="small"
            type="primary"
            @click="handleProcess(scope.$index, scope.row)"
          >处理</el-button>
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
  </div>
</template>

<script>
import { todolist } from '@/api/simulation'
import moment from 'moment'

export default {
  name: 'DataTask',
  data() {
    return {
      todos: [],
      addDialogVisible: false,
      searchText: '',
      searchObj: {
        taskId: '',
        taskName: '',
        scope: '',
        element: '',
        dataUsed: '',
        status: 0,
        remark: ''
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
      this.getTodos(this.currentPage, this.pagesize)
    },
    getTodos: function(pageNum, pageSize) {
      const that = this
      this.searchObj.pageNum = pageNum
      this.searchObj.pageSize = pageSize
      todolist(this.searchObj).then(response => {
        that.todos = response.list.list
        that.totalCount = response.number
      })
    },

    // 每页显示数据量变更
    handleSizeChange: function(val) {
      this.pagesize = val
      this.getTodos(this.currentPage, this.pagesize)
    },

    // 页码变更
    handleCurrentChange: function(val) {
      this.currentPage = val
      this.getTodos(this.currentPage, this.pagesize)
    },
    formatDate(row, column) {
      // 获取单元格数据
      const date = row[column.property]
      if (date === undefined || date === null) {
        return ''
      }
      return moment(date).format('YYYY-MM-DD HH:mm:ss')
    },
    handleProcess(index, row) {
      const routerURL = row.routerURL
      console.log(routerURL)
      this.$router.push({ path: '/' + routerURL })
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
