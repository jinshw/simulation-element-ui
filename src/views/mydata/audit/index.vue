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
            <el-form-item label="场景类型">
              <el-input v-model="searchObj.roadTypeName" auto-complete="off" readonly="readonly" @click.native="showSceneTypeTree('search')">
                <el-button slot="append" icon="el-icon-search" />
              </el-input>
            </el-form-item>
            <!-- <el-form-item label="场景类型">
              <el-select v-model="filters.options.sceneTypeOptions.value" placeholder="请选择">
                <el-option
                  v-for="item in filters.options.sceneTypeOptions.options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item> -->
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
            prop="scenetypeList"
            label="场景类型"
            :formatter="formatScenetypeList"
          />

          <!-- <el-table-column
            prop="roadTypeObj.stName"
            label="道路类型"
            sortable
          />

          <el-table-column
            prop="sceneTypeObj.stName"
            label="场景类型"
            sortable
          /> -->

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
          <!-- <el-table-column
            prop="previewFile"
            label="预览文件"
            :formatter="formatDataProgressOptions"
            sortable
          /> -->
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
            label="负责人"
            sortable
          />
          <!-- <el-table-column
            prop="updateTime"
            label="操作时间"
            :formatter="formatDate"
            sortable
          /> -->
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
              <el-button
                size="small"
                type="success"
                @click="handlePreviewImg(scope.$index, scope.row)"
              >预览</el-button>
              <el-button
                size="small"
                type="primary"
                :disabled="scope.row.filePath !== null && scope.row.filePath !== '' ? false : true"
                @click="handleDownload(scope.$index, scope.row)"
              >下载数据</el-button>
              <!-- <el-button
                size="small"
                type="danger"
                @click="handleDelete(scope.$index, scope.row)"
              >删除</el-button>
              <el-button
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
        <el-form :disabled="isShow" :model="data" label-width="120px" :inline="true">
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
          <el-form-item label="场景类型">
            <el-input v-model="data.roadTypeName" auto-complete="off" readonly="readonly" :disabled="true" />
          </el-form-item>
          <!-- <el-form-item label="道路类型">
            <el-input v-model="data.roadTypeName" auto-complete="off" readonly="readonly" :disabled="true" />
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
          </el-form-item> -->
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
          <!-- <el-form-item label="关键词">
            <el-select v-model="keywordOptions.value" multiple clearable filterable placeholder="请选择" :disabled="true">
              <el-option-group
                v-for="group in keywordOptions.options"
                :key="group.label"
                :label="group.label"
              >
                <el-option
                  v-for="item in group.options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-option-group>

            </el-select>
          </el-form-item> -->
          <el-form-item label="审核状态">
            <el-select v-model="options.reviewStatusOptions.value" placeholder="请选择">
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
          <br>
          <el-form-item label="场景预览文件">
            <el-input
              v-if="data.previewFile != ''"
              v-model="data.previewFile"
            />
          </el-form-item>
          <el-form-item>
            <el-upload
              ref="upload"
              class="upload-demo inline-block"
              action="https://jsonplacehoder.typeicon.com/posts/"
              :show-file-list="false"
              :on-preview="handlePreview"
              :on-remove="handleRemove"
              :auto-upload="true"
              :before-upload="beforeUpload"
              :on-success="onSuccess"
            >
              <el-button size="small" type="primary">点击上传</el-button>
            </el-upload>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="addDialogVisible = false">取 消</el-button>
          <el-button type="primary" :disabled="isShow" @click="submitData">确 定</el-button>
        </div>
      </el-dialog>

      <el-dialog title="选择" :visible.sync="sceneTypeTreeDialog" :close-on-click-modal="false">
        <el-container style="height: 400px;width:100%; border: 1px solid #eee;overflow-y: scroll;">
          <el-tree
            ref="tree"
            show-checkbox
            :check-strictly="true"
            style="width:100%;"
            :data="sceneTypeTree"
            node-key="stId"
            highlight-current
            :props="defaultProps"
            :default-expanded-keys="['0']"
            @node-click="handleNodeClick"
            @check-change="checkChange"
          />
        </el-container>
        <div slot="footer" class="dialog-footer">
          <el-button @click="sceneTypeTreeDialog = false">取 消</el-button>
          <el-button type="primary" @click="saveParentSceneType">确 定</el-button>
        </div>
      </el-dialog>

    </div>

    <el-dialog
      :title="previewImgTitle"
      :visible.sync="previewImgDialogVisible"
      width="50%"
    >
      <el-image :src="previewImgUrl" />
    </el-dialog>
  </div>
</template>

<script>
import { getCollectionDataListNotPage, findSceneDistributionList, addScene, editScene, deleteScene, imgUpload, sceneFileDownLoad, getPreviewFileUrl, getSceneTypeTree } from '@/api/simulation'
import moment from 'moment'

// import qs from 'qs'
export default {
  name: 'SseCollectionDatas',
  data() {
    return {
      isShow: false,
      dialogTitle: '新增',
      sceneTypeTree: [],
      sceneTypeTreeType: '',
      defaultProps: {
        children: 'children',
        label: 'stName',
        disabled: function(data, node) {
          if (node.childNodes.length > 0) {
            return true
          } else {
            return false
          }
        }
      },
      sceneTypeTreeDialog: false,
      editCheckId: '',
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

      previewImgDialogVisible: false,
      previewImgUrl: '',
      previewImgTitle: '',

      // 提交的表单
      data: {
        sid: '',
        scId: '',
        sceneName: '',
        sceneDescription: '',
        roadType: '',
        roadTypeName: '',
        sceneType: '',
        sceneSource: '',
        status: '',
        previewFile: '',
        reviewStatus: '',
        reviewComment: '',
        scenetypeList: []

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
        reviewComment: '',
        scenetypeList: []
      },
      options: {
        // roadTypeOptions: {
        //   options: [
        //     {
        //       value: 0,
        //       label: '请选择'
        //     },
        //     {
        //       value: 1,
        //       label: '高速'
        //     }, {
        //       value: 2,
        //       label: '国道'
        //     }, {
        //       value: 3,
        //       label: '省道'
        //     }
        //   ],
        //   value: ''
        // },
        sceneTypeOptions: {
          options: [
            // {
            //   value: 0,
            //   label: '请选择'
            // },
            // {
            //   value: 1,
            //   label: '动态场景'
            // }, {
            //   value: 2,
            //   label: '静态场景'
            // }
          ],
          value: ''
        },
        sceneSourceOptions: {
          options: [
            {
              value: 0,
              label: '请选择'
            },
            {
              value: 1,
              label: '车载采集'
            }, {
              value: 2,
              label: '路侧采集'
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
            // {
            //   value: 0,
            //   label: '未审核(待分发)'
            // },
            {
              value: 1,
              label: '待审核'
            },
            {
              value: 2,
              label: '审核通过'
            }, {
              value: 3,
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
            value: ''
          },
          sceneTypeOptions: {
            options: [
              // {
              //   value: 0,
              //   label: '请选择'
              // },
              // {
              //   value: 1,
              //   label: '动态场景'
              // }, {
              //   value: 2,
              //   label: '静态场景'
              // }
            ],
            value: ''
          },
          sceneSourceOptions: {
            options: [
              {
                value: 0,
                label: '请选择'
              },
              {
                value: 1,
                label: '车载采集'
              }, {
                value: 2,
                label: '路侧采集'
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
              // {
              //   value: 0,
              //   label: '未审核(待分发)'
              // },
              {
                value: 1,
                label: '待审核'
              },
              {
                value: 2,
                label: '审核通过'
              }, {
                value: 3,
                label: '审核未通过'
              }
            ],
            value: 1
          }
        }
      },
      keywordOptions: {
        options: [],
        value: []
      },
      keywordlist: []

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
      findSceneDistributionList(this.searchObj).then(response => {
        that.tableData = response.list.list
        that.totalCount = response.number
        that.keywordlist = response.keywordlist
        that.keywordList()
      })
    },
    showSceneTypeTree: function(type) {
      this.sceneTypeTreeType = type
      var that = this
      getSceneTypeTree({ stId: '0', stType: '0' }).then(response => {
        that.sceneTypeTree = [response.data]
        that.sceneTypeTreeDialog = true
        // that.defaultExpandedKeys = [that.data.roadType]
        // that.defaultCheckedKeys = [that.data.roadType]
        var tempList = []
        if (that.data.scenetypeList == null || that.data.scenetypeList === undefined) {
          that.data.scenetypeList = []
        }
        for (var i = 0; i < that.data.scenetypeList.length; i++) {
          tempList.push(that.data.scenetypeList[i].stId)
        }
        if (this.sceneTypeTreeType !== 'search') {
          that.defaultExpandedKeys = tempList
          that.defaultCheckedKeys = tempList
        } else {
          that.defaultExpandedKeys = ['0']
          that.defaultCheckedKeys = []
        }
      })

      // var that = this
      // getSceneTypeTree({ stId: '0', stType: '1' }).then(response => {
      //   that.sceneTypeTree = [response.data]
      //   console.log(response)
      //   that.sceneTypeTreeDialog = true
      // })
    },
    saveParentSceneType: function() {
      this.sceneTypeTreeDialog = false
      if (this.sceneTypeTreeType === 'search') {
        this.searchObj.scenetypeList = this.$refs.tree.getCheckedNodes()
        this.searchObj.roadTypeName = this.getSceneTypeNames(this.searchObj.scenetypeList)
      } else {
        this.data.scenetypeList = this.$refs.tree.getCheckedNodes()
        this.data.roadTypeName = this.getSceneTypeNames(this.data.scenetypeList)
      }
      /* this.currentNode = this.$refs.tree.getCheckedNodes()[0]
      this.sceneTypeTreeDialog = false
      this.data.roadType = this.currentNode.stId
      this.data.roadTypeName = this.currentNode.stName
      this.getSceneTypeList() */
    },
    getSceneTypeNames(list) {
      var result = ''
      var obj = null
      for (var i = 0; i < list.length; i++) {
        obj = list[i]
        result = result + ',' + obj.stName
      }
      return result
    },
    getSceneTypeList: function() {
      var that = this
      getSceneTypeTree({ stId: this.data.roadType }).then(response => {
        var item = null
        var _options = [{
          value: '',
          label: '请选择'
        }]
        var list = response.data.children
        for (var idx in list) {
          item = list[idx]
          _options.push({
            value: item.stId,
            label: item.stName
          })
        }
        that.options.sceneTypeOptions.options = _options
        // that.filters.options.sceneTypeOptions = that.options.sceneTypeOptions
        that.filters.options.sceneTypeOptions = JSON.parse(JSON.stringify(that.options.sceneTypeOptions))
        that.filters.options.sceneTypeOptions.value = ''
      })
    },
    handleNodeClick(item, node, self) { // 自己定义的editCheckId，防止单选出现混乱
      /* if (item.children.length === 0) {
        this.editCheckId = item.stId
        this.$refs.tree.setCheckedKeys([item.stId])
      } */
    },
    checkChange(item, node, self) {
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
    keywordList() {
      var that = this
      // keywordList({}).then(response => {
      // that.keywordlist = response.list
      var item = null
      var optionsOne = []
      var optionsTwo = []
      var optionsThree = []
      var oneObj = {
        label: '交互类型',
        options: []
      }
      var twoObj = {
        label: '区域类型',
        options: []
      }
      var threeObj = {
        label: '道路类型',
        options: []
      }

      for (var index in that.keywordlist) {
        item = that.keywordlist[index]
        switch (item.type) {
          case 1:
            optionsOne.push({
              value: item.kwId,
              label: item.kwName
            })
            break
          case 2:
            optionsTwo.push({
              value: item.kwId,
              label: item.kwName
            })
            break
          case 3:
            optionsThree.push({
              value: item.kwId,
              label: item.kwName
            })
            break
        }
      }
      oneObj.options = optionsOne
      twoObj.options = optionsTwo
      threeObj.options = optionsThree
      that.keywordOptions.options = []
      that.keywordOptions.options.push(oneObj)
      that.keywordOptions.options.push(twoObj)
      that.keywordOptions.options.push(threeObj)
      that.keywordOptions.value = []
      // })
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
        reviewComment: '',
        scenetypeList: []
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
      // this.data.roadTypeName = row.roadTypeObj.stName
      this.data.roadTypeName = ''
      for (var i in this.data.scenetypeList) {
        this.data.roadTypeName = this.data.roadTypeName + ',' + this.data.scenetypeList[i].stName
      }
      this.keywordOptions.value = []
      for (var index in this.data.keywordList) {
        this.keywordOptions.value.push(this.data.keywordList[index].kwId)
      }
      // this.getSceneTypeList()
      // this.options.sceneTypeOptions.value = row.sceneTypeObj.stId
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
    handlePreviewImg: function(index, row) {
      var that = this
      getPreviewFileUrl(row).then(response => {
        that.previewImgDialogVisible = true
        that.previewImgUrl = response.imgUrl + '?+' + Math.round(Math.random() * 100)
        that.previewImgTitle = '【场景名称】' + row.sceneName
      })
    },
    handleDownload: function(index, row) {
      sceneFileDownLoad(row).then(response => {
        const data = response.data
        if (!data) {
          this.$message({
            type: 'warning',
            message: '下载失败'
          })
          return
        }
        console.log(response)
        const fileName = row.filePath
        console.log('fileName=' + fileName)
        const url = window.URL.createObjectURL(new Blob([data]))
        const a = document.createElement('a')
        a.style.display = 'none'
        a.href = url
        a.setAttribute('download', fileName)
        document.body.appendChild(a)
        // 点击下载
        a.click()
        // 下载完成移除元素
        document.body.removeChild(a)
        // 释放掉blob对象
        window.URL.revokeObjectURL(url)
        console.log('下载完成')
      })
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
      // keywordOptions.value to this.data.keywordList
      this.data.keywordList = []
      for (var index in this.keywordOptions.value) {
        this.data.keywordList.push({
          kwId: this.keywordOptions.value[index]
        })
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
    formatScenetypeList(row, column) {
      // 获取单元格数据
      const val = row[column.property]
      var result = ''
      for (var i = 0; i < val.length; i++) {
        result = result + val[i].stName + ','
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
    },

    handleRemove(file, fileList) {
      console.log(file, fileList)
    },
    handlePreview(file) {
      console.log(file)
    },
    beforeUpload(file) {
      var that = this
      // var upLoadFileName = file.name
      // 如果上传的文件不符合条件
      var checkMessage = this.fileCheck(file)
      if (checkMessage !== '') {
        this.$message(checkMessage)
        return
      }
      var formData = new FormData()
      formData.append('file', file)
      var param = {
        sid: this.data.sid,
        scId: this.data.scId,
        previewFile: this.data.previewFile
      }

      // var filesCollectionParamTemp = this.pFilesCollectionMap[this.fileParam.fcType]
      // var filesCollectionParam = {
      //   fcId: filesCollectionParamTemp.fcId,
      //   preId: filesCollectionParamTemp.preId,
      //   reportFileName: filesCollectionParamTemp.reportFileName,
      //   reportFileNo: filesCollectionParamTemp.reportFileNo,
      //   situation: filesCollectionParamTemp.situation,
      //   problem: filesCollectionParamTemp.problem,
      //   fcType: this.fileParam.fcType
      // }
      // filesCollectionParam.fcType = this.fileParam.fcType
      // var filesParam = this.projectInfo.pPrework.pFilesCollectionMap[this.fileParam.fcType]['filesMap'][this.fileParam.pfClass]
      // var filesParamTemp = this.pFilesCollectionMap[this.fileParam.fcType]['filesMap'][this.fileParam.pfClass]
      // var filesParam = null
      // if (filesParamTemp === undefined || filesParamTemp === null) {
      //   filesParam = {
      //     fcType: this.fileParam.fcType,
      //     pfClass: this.fileParam.pfClass
      //   }
      // } else {
      //   filesParam = {
      //     pfId: filesParamTemp.pfId,
      //     fcId: filesParamTemp.fcId,
      //     pfClass: this.fileParam.pfClass,
      //     fcType: this.fileParam.fcType
      //   }
      // }
      formData.append('sseSceneDatasStr', JSON.stringify(param))
      imgUpload(formData).then(response => {
        console.log(response)
        if (response.status === 200) {
          this.$message({
            type: 'success',
            message: '文件上传成功'
          })
          that.data.previewFile = response.name
        } else if (response.status === 500) {
          this.$message({
            type: 'warning',
            message: `文件上传失败,失败原因${response.msg}`
          })
        }
      })
    },
    // setFileType(fcType, pfClass) {
    //   this.fileParam.fcType = fcType
    //   this.fileParam.pfClass = pfClass
    // },

    onSuccess(response, file, fileList) {
      console.log(response, file, fileList)
    },
    // 前端校验文件上传是否符合条件
    fileCheck(file) {
      var ret = ''
      if (file === undefined) {
        ret = ''
      }
      var max_file_size = 20 * 1024 * 1024
      if (file.size > max_file_size) {
        ret = '图片不能大于20Mb'
      }
      // var fileType = file.name.substring(file.name.lastIndexOf('.') + 1)
      // if (!this.validFile(fileType)) {
      //   ret = '文件类型不符合要求'
      // }
      return ret
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

