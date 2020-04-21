<template>
  <div>
    <h1 class="d2-mt-0">采集管理</h1>
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
              <el-select v-model="options.dataStepOptions.value" placeholder="请选择">
                <el-option
                  v-for="item in options.dataStepOptions.options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
            <!-- <el-form-item label="所在进程">
              <el-select v-model="filters.options.dataProgressOptions.value" placeholder="请选择">
                <el-option
                  v-for="item in filters.options.dataProgressOptions.options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
                l-select>
              </el-select></el-form-item> -->
            <el-button type="primary" @click="search">查询</el-button>
            <el-button type="primary" @click="handleAdd">添加</el-button>
            <el-button type="primary" @click="distributionData">分发</el-button>
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
          ref="tableRef"
          :data="tableData"
          style="width:100%"
          border
        >
          <el-table-column type="selection" width="55" />
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
            prop="sysUser.username"
            label="负责人"
            sortable
          />

          <!-- <el-table-column
            prop="dataProgress"
            label="所在进程"
            :formatter="formatDataProgressOptions"
            sortable
          /> -->
          <!-- <el-table-column
            prop="sysUser.username"
            label="操作人"
            sortable
          /> -->
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
              <el-button
                size="small"
                type="danger"
                @click="handleDelete(scope.$index, scope.row)"
              >删除</el-button>
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
        <el-form ref="addRef" :disabled="isShow" :model="data" :rules="rules" label-width="120px">
          <el-form-item label="采集任务" prop="sseTask.taskId">
            <el-select v-model="data.sseTask.taskId" filterable placeholder="请选择">
              <el-option
                v-for="item in options.taskOptions.options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="数据编号" prop="cdId">
            <el-input v-model="data.cdId" :disabled="dialogTitle != '新增'" />
          </el-form-item>
          <el-form-item label="数据名称" prop="cdName">
            <el-input v-model="data.cdName" auto-complete="off" />
          </el-form-item>
          <el-form-item label="数据来源" prop="dataSource">
            <el-select v-model="data.dataSource" placeholder="请选择">
              <el-option
                v-for="item in options.dataSourceOptions.options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="数据类型" prop="dataType">
            <el-select v-model="data.dataType" placeholder="请选择">
              <el-option
                v-for="item in options.dataTypeOptions.options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
          <!-- <el-form-item label="处理步骤">
            <el-input v-model="data.dataStep" />
          </el-form-item>
          <el-form-item label="所在进程">
            <el-input v-model="data.dataProgress" />
          </el-form-item> -->
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="addDialogVisible = false">取 消</el-button>
          <el-button type="primary" :disabled="isShow" @click="submitData('addRef')">确 定</el-button>
        </div>
      </el-dialog>

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
import { myCollectionList, addData, editData, deleteData, findDistributionList, addCollectionUser } from '@/api/simulation'
import DataDistributor from '@/views/data/datadistributor/index'
import moment from 'moment'

// import qs from 'qs'
export default {
  name: 'SseCollectionDatas',
  components: {
    DataDistributor
  },
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
        dataStep: '100',
        dataProgress: '',
        fileUrl: '',
        sseTask: {
          taskId: ''
        }
      },
      searchObj: {
        cdName: '',
        dataSource: '',
        dataType: '',
        dataStep: '',
        dataProgress: ''
      },
      options: {
        taskOptions: {},
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
              label: '未分发'
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
                label: '未分发'
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
      },
      rules: {
        'sseTask.taskId': [
          { required: true, message: '请选择采集任务', trigger: 'change' }
        ],
        cdId: [
          { required: true, message: '请输入数据编号', trigger: ['blur', 'change'] },
          { min: 3, max: 50, message: '长度在3 到 30 个字符', trigger: ['blur', 'change'] }
        ],
        cdName: [
          { required: true, message: '请输入数据名称', trigger: ['blur', 'change'] },
          { min: 3, max: 50, message: '长度在3 到 30 个字符', trigger: ['blur', 'change'] }
        ],
        dataSource: [
          { required: true, message: '请选择数据来源', trigger: 'change' }
        ],
        dataType: [
          { required: true, message: '请选择数据类型', trigger: 'change' }
        ]
      },
      dataDistributorDialogVisible: false
    }
  },
  mounted() {
    this.loadData(this.currentPage, this.pagesize)
    this.getTasks()
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
      myCollectionList(this.searchObj).then(response => {
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
        dataStep: '100',
        dataProgress: '',
        fileUrl: '',
        sseTask: {
          taskId: ''
        }
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
      // 设置处理步骤：1新数据；2预处理；3场景生成;100 未分发
      this.data.dataStep = 100
      addData(this.data).then(response => {
        that.search()
        if (response.status === 20000) {
          that.$message({
            type: 'success',
            message: '执行成功!'
          })
          that.addDialogVisible = false
          that.search()
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

    submitData: function(ref) {
      this.$refs[ref].validate((valid) => {
        if (valid) {
          this.optionsToInfo()
          if (this.dialogTitle === '新增') {
            this.addData()
          } else if (this.dialogTitle === '编辑') {
            this.editData()
          }
        } else {
          console.log('error submit!!')
          return false
        }
      })
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
          result = '未分发'
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
    },

    getTasks() {
      var that = this
      findDistributionList({ pageNum: 1, pageSize: 10000 }).then(response => {
        var list = response.list.list
        var item = null
        var _options = [
          {
            value: null,
            label: '请选择'
          }
        ]
        for (var index in list) {
          item = list[index]
          _options.push({
            value: item.taskId,
            label: item.taskName
          })
        }
        that.options.taskOptions.options = _options
        that.options.taskOptions.index = null
      })
    },

    changeDataDistributor(dialogVisible) {
      this.dataDistributorDialogVisible = dialogVisible
    },
    distributionData() {
      var selectedTable = this.$refs.tableRef.store.states.selection
      if (selectedTable.length === 0) {
        this.$message({
          message: '请先选择数据',
          type: 'warning'
        })
        return
      }
      for (var i = 0; i < selectedTable.length; i++) {
        if (selectedTable[i].dataStep !== 100) {
          this.$message({
            message: '不能选择已分发的数据',
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
      var selectedTable = this.$refs.tableRef.store.states.selection
      for (var i = 0; i < selectedTable.length; i++) {
        selectedTable[i].sysUser = selectedUser
      }
      addCollectionUser(selectedTable).then(response => {
        if (response.status === 20000) {
          this.$message({
            type: 'success',
            message: response.message
          })
          this.dataDistributorDialogVisible = false
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

