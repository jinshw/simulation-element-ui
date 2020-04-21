<template>
  <div>
    <h1 class="d2-mt-0">数据预处理</h1>
    <div>

      <div id="top">
        <el-row class="d2-mb">
          <el-form :inline="true">
            <el-form-item label="数据名称">
              <el-input v-model="searchObj.cdName" type="text" placeholder="数据名称" />
            </el-form-item>
            <el-form-item label="数据来源">
              <el-select v-model="filters.options.dataSourceOptions.value" placeholder="请选择">
                <el-option
                  v-for="item in filters.options.dataSourceOptions.options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
            <el-form-item label="数据类型">
              <el-select v-model="filters.options.dataTypeOptions.value" placeholder="请选择">
                <el-option
                  v-for="item in filters.options.dataTypeOptions.options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
            <el-form-item label="处理步骤">
              <el-select v-model="filters.options.dataStepOptions.value" placeholder="请选择">
                <el-option
                  v-for="item in filters.options.dataStepOptions.options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
            <el-form-item label="所在进程">
              <el-select v-model="filters.options.dataProgressOptions.value" placeholder="请选择">
                <el-option
                  v-for="item in filters.options.dataProgressOptions.options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
            <el-button type="primary" @click="search">查询</el-button>
            <!-- <el-button type="primary" @click="handleAdd">添加</el-button> -->
          </el-form>

          <!-- <el-col :span="6" />
          <el-col :span="18">
            <el-button type="primary" @click="search">查询</el-button>
            <el-button type="primary" @click="handleAdd">添加</el-button>
          </el-col> -->
        </el-row>
      </div>

      <div style="margin-top:15px">

        <el-table
          ref="testTable"
          :data="tableData"
          style="width:100%"
          border
        >
          <el-table-column
            prop="cdId"
            label="数据编码"
            sortable
            show-overflow-tooltip
          />
          <el-table-column
            prop="cdName"
            label="数据名称"
            sortable
            show-overflow-tooltip
          />

          <el-table-column
            prop="dataSource"
            label="数据来源"
            :formatter="formatDataSourceOptions"
            sortable
          />

          <el-table-column
            prop="dataType"
            label="数据类型"
            :formatter="formatDataTypeOptions"
            sortable
          />

          <el-table-column
            prop="dataStep"
            label="处理步骤"
            :formatter="formatDataStepOptions"
            sortable
          />

          <el-table-column
            prop="dataProgress"
            label="所在进程"
            :formatter="formatDataProgressOptions"
            sortable
          />
          <el-table-column
            prop="sysUser.username"
            label="负责人"
            sortable
          />
          <el-table-column
            prop="optTime"
            label="操作时间"
            :formatter="formatDate"
            sortable
          />
          <el-table-column label="操作" width="400">
            <template slot-scope="scope">
              <el-button
                size="small"
                type="primary"
                @click="handleShow(scope.$index, scope.row)"
              >查看</el-button>
              <el-button
                size="small"
                type="success"
                @click="handleEdit(scope.$index, scope.row)"
              >编辑</el-button>
              <!-- <el-button
                size="small"
                type="danger"
                @click="handleDelete(scope.$index, scope.row)"
              >删除</el-button> -->
              <el-button
                size="small"
                type="primary"
                disabled
                @click="handleDownload(scope.$index, scope.row)"
              >下载数据</el-button>
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

      <el-dialog :title="dialogTitle" :visible.sync="addDialogVisible" :close-on-click-modal="false">
        <el-form :disabled="isShow" :model="data" label-width="120px">
          <el-form-item label="数据编号">
            <el-input v-model="data.cdId" :disabled="true" />
          </el-form-item>
          <el-form-item label="数据名称">
            <el-input v-model="data.cdName" :disabled="true" />
          </el-form-item>
          <el-form-item label="数据来源">
            <el-select v-model="options.dataSourceOptions.value" :disabled="true">
              <el-option
                v-for="item in options.dataSourceOptions.options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="数据类型">
            <el-select v-model="options.dataTypeOptions.value" :disabled="true">
              <el-option
                v-for="item in options.dataTypeOptions.options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="处理步骤">
            <el-select v-model="options.dataStepOptions.value">
              <el-option
                v-for="item in options.dataStepOptions.options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="所在进程">
            <el-select v-model="options.dataProgressOptions.value" placeholder="请选择">
              <el-option
                v-for="item in options.dataProgressOptions.options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="addDialogVisible = false">取 消</el-button>
          <el-button type="primary" :disabled="isShow" @click="submitData">确 定</el-button>
        </div>
      </el-dialog>

    </div>
  </div>
</template>

<script>
import { list, addData, editData, deleteData } from '@/api/simulation'
import moment from 'moment'

// import qs from 'qs'
export default {
  name: 'SseCollectionDatas',
  data() {
    return {
      isShow: false,
      dialogTitle: '新增',
      searchText: '',
      // 表格当前页数据
      tableData: [],

      // 默认每页数据量
      pagesize: 10,

      // 当前页码
      currentPage: 1,

      // 查询的页码
      start: 1,

      // 默认数据总数
      totalCount: 1000,

      // 添加对话框默认可见性
      addDialogVisible: false,

      // 修改对话框默认可见性
      updateFormVisible: false,

      // 提交的表单
      data: {
        cdId: '',
        cdName: '',
        dataSource: '',
        dataType: '',
        dataStep: '',
        dataProgress: '',
        fileUrl: ''
      },
      searchObj: {
        cdName: '',
        dataSource: '',
        dataType: '',
        dataStep: '',
        dataProgress: ''
      },
      options: {
        dataSourceOptions: {
          options: [
            {
              value: 1,
              label: '车载采集'
            }, {
              value: 2,
              label: '路侧采集'
            }
          ],
          value: 1
        },
        dataTypeOptions: {
          options: [
            {
              value: 1,
              label: '动态场景'
            }, {
              value: 2,
              label: '静态场景'
            }
          ],
          value: 1
        },
        dataStepOptions: {
          options: [
            {
              value: 0,
              label: '请选择'
            },
            {
              value: 1,
              label: '新数据'
            }, {
              value: 2,
              label: '预处理'
            }, {
              value: 3,
              label: '场景生成'
            }, {
              value: 100,
              label: '已经分发'
            }

          ],
          value: 0
        },
        dataProgressOptions: {
          options: [
            {
              value: 1,
              label: '合并'
            }, {
              value: 2,
              label: 'image和gps数据保存'
            }, {
              value: 3,
              label: '生成图像识别'
            }, {
              value: 4,
              label: '生成GPS数据'
            }, {
              value: 5,
              label: '生成视频video'
            }
          ],
          value: 1
        }
      },
      filters: {
        options: {
          dataSourceOptions: {
            options: [
              {
                value: 0,
                label: '请选择'
              }, {
                value: 1,
                label: '车载采集'
              }, {
                value: 2,
                label: '路侧采集'
              }
            ],
            value: 0
          },
          dataTypeOptions: {
            options: [
              {
                value: 0,
                label: '请选择'
              }, {
                value: 1,
                label: '动态场景'
              }, {
                value: 2,
                label: '静态场景'
              }
            ],
            value: 0
          },
          dataStepOptions: {
            options: [
              {
                value: 0,
                label: '请选择'
              },
              {
                value: 1,
                label: '新数据'
              }, {
                value: 2,
                label: '预处理'
              }, {
                value: 3,
                label: '场景生成'
              }, {
                value: 100,
                label: '已经分发'
              }

            ],
            value: 0
          },
          dataProgressOptions: {
            options: [
              {
                value: 0,
                label: '请选择'
              }, {
                value: 1,
                label: '合并'
              }, {
                value: 2,
                label: 'image和gps数据保存'
              }, {
                value: 3,
                label: '生成图像识别'
              }, {
                value: 4,
                label: '生成GPS数据'
              }, {
                value: 5,
                label: '生成视频video'
              }
            ],
            value: 0
          }
        }
      }
    }
  },
  mounted() {
    this.loadData(this.currentPage, this.pagesize)
  },
  methods: {
    // 搜索
    search: function() {
      this.loadData(this.currentPage, this.pagesize)
    },
    // 从服务器读取数据
    loadData: function(pageNum, pageSize) {
      const that = this
      this.getFilters()
      this.searchObj.pageNum = pageNum
      this.searchObj.pageSize = pageSize
      list(this.searchObj).then(response => {
        that.tableData = response.list.list
        that.totalCount = response.number
      })
    },
    getFilters: function() {
      // this.searchObj = {}
      for (var key in this.filters.options) {
        var propKey = key.substr(0, key.length - 7)
        this.searchObj[propKey] = this.filters.options[key]['value']
      }
    },
    handleAdd: function() {
      this.isShow = false
      this.dialogTitle = '新增'
      this.addDialogVisible = true
      this.data = {
        cdId: '',
        cdName: '',
        dataSource: '',
        dataType: '',
        dataStep: '',
        dataProgress: '',
        fileUrl: ''
      }
    },

    handleShow: function(index, row) {
      this.dialogTitle = '查看'
      this.isShow = true
      this.initRowToObj(row)
      this.addDialogVisible = true
    },
    handleEdit: function(index, row) {
      this.isShow = false
      this.dialogTitle = '编辑'
      this.initRowToObj(row)
      this.addDialogVisible = true
    },
    initRowToObj: function(row) {
      this.data = JSON.parse(JSON.stringify(row))
      this.infoToOptions()
    },

    addData: function() {
      const that = this
      addData(this.data).then(response => {
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
            message: '数据编号已经存在!'
          })
        }
      })
    },

    editData: function() {
      const that = this
      editData(this.data).then(response => {
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

    submitData: function() {
      this.optionsToInfo()
      if (this.dialogTitle === '新增') {
        this.addData()
      } else if (this.dialogTitle === '编辑') {
        this.editData()
      }
    },

    // 单行删除
    handleDelete: function(index, row) {
      const that = this
      this.data = row
      this.$confirm('此操作将永久删除该记录, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          deleteData(this.data).then(response => {
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
        })
        .catch(() => {
          that.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    },
    handleDownload: function(index, row) {

    },
    // 每页显示数据量变更
    handleSizeChange: function(val) {
      this.pagesize = val
      this.loadData(this.currentPage, this.pagesize)
    },

    // 页码变更
    handleCurrentChange: function(val) {
      this.currentPage = val
      this.loadData(this.currentPage, this.pagesize)
    },

    optionsToInfo: function() {
      for (var key in this.options) {
        var propKey = key.substr(0, key.length - 7)
        this.data[propKey] = this.options[key]['value']
      }
    },
    infoToOptions: function() {
      for (var key in this.options) {
        var propKey = key.substr(0, key.length - 7)
        this.options[key]['value'] = this.data[propKey]
      }
    },
    formatDataSourceOptions(row, column) {
      // 获取单元格数据
      const val = row[column.property]
      var result = ''
      switch (val) {
        case 1:
          result = '车载采集'
          break
        case 2:
          result = '路侧采集'
          break
        default:
          result = ''
          break
      }
      return result
    },
    formatDataTypeOptions(row, column) {
      // 获取单元格数据
      const val = row[column.property]
      var result = ''
      switch (val) {
        case 1:
          result = '动态场景'
          break
        case 2:
          result = '静态场景'
          break
        default:
          result = ''
          break
      }
      return result
    },
    formatDataStepOptions(row, column) {
      // 获取单元格数据
      const val = row[column.property]
      var result = ''
      switch (val) {
        case 1:
          result = '新数据'
          break
        case 2:
          result = '预处理'
          break
        case 3:
          result = '场景生成'
          break
        case 100:
          result = '已经分发'
          break
        default:
          result = ''
          break
      }
      return result
    },
    formatDataProgressOptions(row, column) {
      // 获取单元格数据
      const val = row[column.property]
      var result = ''
      switch (val) {
        case 1:
          result = '合并'
          break
        case 2:
          result = 'image和gps数据保存'
          break
        case 3:
          result = '生成图像识别'
          break
        case 4:
          result = '生成GPS数据'
          break
        case 5:
          result = '生成视频video'
          break
        default:
          result = ''
          break
      }
      return result
    },
    formatDate(row, column) {
      // 获取单元格数据
      const date = row[column.property]
      if (date === undefined || date === null) {
        return ''
      }
      return moment(date).format('YYYY-MM-DD HH:mm:ss')
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

