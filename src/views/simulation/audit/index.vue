<template>
  <div>
    <h1 class="d2-mt-0">场景审核</h1>
    <div>

      <div id="top">
        <el-row class="d2-mb">
          <el-form :inline="true">
            <el-form-item label="场景名称">
              <el-input v-model="searchObj.sceneName" type="text" placeholder="场景名称" />
            </el-form-item>
            <el-form-item label="道路类型">
              <el-select v-model="filters.options.roadTypeOptions.value" placeholder="请选择">
                <el-option
                  v-for="item in filters.options.roadTypeOptions.options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
            <el-form-item label="场景类型">
              <el-select v-model="filters.options.sceneTypeOptions.value" placeholder="请选择">
                <el-option
                  v-for="item in filters.options.sceneTypeOptions.options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
            <el-form-item label="场景来源">
              <el-select v-model="filters.options.sceneSourceOptions.value" placeholder="请选择">
                <el-option
                  v-for="item in filters.options.sceneSourceOptions.options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
            <el-form-item label="场景状态">
              <el-select v-model="filters.options.statusOptions.value" placeholder="请选择">
                <el-option
                  v-for="item in filters.options.statusOptions.options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
            <el-form-item label="审核状态">
              <el-select v-model="filters.options.reviewStatusOptions.value" placeholder="请选择">
                <el-option
                  v-for="item in filters.options.reviewStatusOptions.options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
            <el-button type="primary" @click="search">查询</el-button>
            <!-- <el-button type="primary" @click="handleAdd">添加</el-button> -->
          </el-form>
        </el-row>
      </div>

      <div style="margin-top:15px">

        <el-table
          ref="testTable"
          :data="tableData"
          style="width:100%"
          border
        >
          <!-- <el-table-column
            prop="sid"
            label="场景ID"
            sortable
            show-overflow-tooltip
          /> -->
          <!-- <el-table-column
            prop="scId"
            label="数据源编码"
            sortable
            show-overflow-tooltip
          /> -->
          <el-table-column
            prop="sceneName"
            label="场景名称"
            sortable
            show-overflow-tooltip
          />
          <el-table-column
            prop="sceneDescription"
            label="场景描述"
            sortable
            show-overflow-tooltip
          />

          <el-table-column
            prop="roadType"
            label="道路类型"
            :formatter="formatOptions"
            sortable
          />

          <el-table-column
            prop="sceneType"
            label="场景类型"
            :formatter="formatOptions"
            sortable
          />

          <el-table-column
            prop="sceneSource"
            label="场景来源"
            :formatter="formatOptions"
            sortable
          />

          <el-table-column
            prop="status"
            label="场景状态"
            :formatter="formatOptions"
            sortable
          />
          <el-table-column
            prop="reviewStatus"
            label="审核状态"
            :formatter="formatOptions"
            sortable
          />
          <el-table-column
            prop="reviewComment"
            label="审核意见"
            sortable
            show-overflow-tooltip
          />
          <el-table-column
            prop="sysUser.username"
            label="操作人"
            sortable
          />
          <el-table-column
            prop="updateTime"
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
              >审核</el-button>
              <!-- <el-button
                size="small"
                type="danger"
                @click="handleDelete(scope.$index, scope.row)"
              >删除</el-button> -->
              <!-- <el-button
                size="small"
                type="primary"
                disabled
                @click="handleDownload(scope.$index, scope.row)"
              >下载数据</el-button> -->
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
        <el-form :model="data" label-width="120px" :inline="true">
          <el-form-item label="场景ID">
            <el-input v-model="data.sid" :disabled="true" />
          </el-form-item>
          <el-form-item label="源数据ID">
            <el-select v-model="options.scIdOptions.value" filterable placeholder="请选择" :disabled="true">
              <el-option
                v-for="item in options.scIdOptions.options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="场景名称">
            <el-input v-model="data.sceneName" :disabled="true" />
          </el-form-item>
          <el-form-item label="道路类型">
            <el-select v-model="options.roadTypeOptions.value" :disabled="true">
              <el-option
                v-for="item in options.roadTypeOptions.options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="场景类型">
            <el-select v-model="options.sceneTypeOptions.value" :disabled="true">
              <el-option
                v-for="item in options.sceneTypeOptions.options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="场景来源">
            <el-select v-model="options.sceneSourceOptions.value" :disabled="true">
              <el-option
                v-for="item in options.sceneSourceOptions.options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="处理状态">
            <el-select v-model="options.statusOptions.value" placeholder="请选择" :disabled="true">
              <el-option
                v-for="item in options.statusOptions.options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="审核状态">
            <el-select v-model="options.reviewStatusOptions.value" placeholder="请选择" :disabled="isShow">
              <el-option
                v-for="item in options.reviewStatusOptions.options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
          <br>
          <el-form-item label="审核意见">
            <el-input
              v-model="data.reviewComment"
              class="textarea-class"
              type="textarea"
              :rows="4"
              placeholder="请输入内容"
              :disabled="isShow"
            />
          </el-form-item>
          <br>
          <el-form-item label="场景描述">
            <el-input
              v-model="data.sceneDescription"
              class="textarea-class"
              type="textarea"
              :rows="4"
              placeholder="请输入内容"
              :disabled="true"
            />
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
import { getCollectionDataListNotPage, sceneList, addScene, editScene, deleteScene } from '@/api/simulation'
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
        sid: '',
        scId: '',
        sceneName: '',
        sceneDescription: '',
        roadType: '',
        sceneType: '',
        sceneSource: '',
        status: '',
        previewFile: '',
        reviewStatus: '',
        reviewComment: ''
      },
      searchObj: {
        sceneName: '',
        sceneDescription: '',
        roadType: '',
        sceneType: '',
        sceneSource: '',
        status: '',
        previewFile: '',
        reviewStatus: '',
        reviewComment: ''
      },
      options: {
        roadTypeOptions: {
          options: [
            {
              value: 0,
              label: '请选择'
            },
            {
              value: 1,
              label: '高速'
            }, {
              value: 2,
              label: '国道'
            }, {
              value: 3,
              label: '省道'
            }
          ],
          value: 1
        },
        sceneTypeOptions: {
          options: [
            {
              value: 0,
              label: '请选择'
            },
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
        sceneSourceOptions: {
          options: [
            {
              value: 0,
              label: '请选择'
            },
            {
              value: 1,
              label: '接口导入'
            }, {
              value: 2,
              label: '页面新增'
            }, {
              value: 3,
              label: '其他'
            }
          ],
          value: 1
        },
        statusOptions: {
          options: [
            {
              value: 0,
              label: '请选择'
            },
            {
              value: 1,
              label: '等待处理'
            }, {
              value: 2,
              label: '处理中'
            }, {
              value: 3,
              label: '已经完成'
            }
          ],
          value: 1
        },
        reviewStatusOptions: {
          options: [
            {
              value: 0,
              label: '请选择'
            },
            {
              value: 1,
              label: '审核通过'
            }, {
              value: 2,
              label: '审核未通过'
            }
          ],
          value: 1
        },
        scIdOptions: {}
      },
      filters: {
        options: {
          roadTypeOptions: {
            options: [
              {
                value: 0,
                label: '请选择'
              },
              {
                value: 1,
                label: '高速'
              }, {
                value: 2,
                label: '国道'
              }, {
                value: 3,
                label: '省道'
              }
            ],
            value: 0
          },
          sceneTypeOptions: {
            options: [
              {
                value: 0,
                label: '请选择'
              },
              {
                value: 1,
                label: '动态场景'
              }, {
                value: 2,
                label: '静态场景'
              }
            ],
            value: 0
          },
          sceneSourceOptions: {
            options: [
              {
                value: 0,
                label: '请选择'
              },
              {
                value: 1,
                label: '接口导入'
              }, {
                value: 2,
                label: '页面新增'
              }, {
                value: 3,
                label: '其他'
              }
            ],
            value: 0
          },
          statusOptions: {
            options: [
              {
                value: 0,
                label: '请选择'
              },
              {
                value: 1,
                label: '等待处理'
              }, {
                value: 2,
                label: '处理中'
              }, {
                value: 3,
                label: '已经完成'
              }
            ],
            value: 0
          },
          reviewStatusOptions: {
            options: [
              {
                value: 0,
                label: '请选择'
              },
              {
                value: 1,
                label: '审核通过'
              }, {
                value: 2,
                label: '审核未通过'
              }
            ],
            value: 1
          }
        }
      }
    }
  },
  mounted() {
    this.loadData(this.currentPage, this.pagesize)
    this.getCollectionDatas()
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
      sceneList(this.searchObj).then(response => {
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
        sid: '',
        scId: '',
        sceneName: '',
        sceneDescription: '',
        roadType: '',
        sceneType: '',
        sceneSource: '',
        status: '',
        previewFile: '',
        reviewStatus: '',
        reviewComment: ''
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
      addScene(this.data).then(response => {
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
            message: '场景ID已经存在!'
          })
        }
      })
    },

    editData: function() {
      const that = this
      editScene(this.data).then(response => {
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
          deleteScene(this.data).then(response => {
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
    formatDate(row, column) {
      // 获取单元格数据
      const date = row[column.property]
      if (date === undefined || date === null) {
        return ''
      }
      return moment(date).format('YYYY-MM-DD HH:mm:ss')
    },
    getCollectionDatas() {
      var that = this
      getCollectionDataListNotPage({}).then(response => {
        var list = response.list
        var item = null
        var _options = []
        for (var index in list) {
          item = list[index]
          _options.push({
            value: item.cdId,
            label: item.cdName
          })
        }
        that.options.scIdOptions.options = _options
        that.options.scIdOptions.index = ''
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
.textarea-class{
  width:540px;
}
</style>

