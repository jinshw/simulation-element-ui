<template>
  <div class="mainlist-container">
    <el-table
      ref="testTable"
      :data="tableData"
      style="width:100%"
      border
    >
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

      <el-table-column
        prop="sceneTypeObj.stName"
        label="场景类型"
        sortable
      />

      <el-table-column
        prop="sceneSource"
        label="场景来源"
        :formatter="formatOptions"
        sortable
      />

      <el-table-column label="场景数据" width="400">
        <template slot-scope="scope">
          <el-button
            size="small"
            type="success"
            @click="handlePreviewImg(scope.$index, scope.row)"
          >预览</el-button>
          <el-button
            size="small"
            type="success"
            @click="handleGetDatas(scope.$index, scope.row)"
          >获取数据</el-button>
        </template>
      </el-table-column>
    </el-table>

    <div align="center">
      <el-pagination
        :current-page="currentPage"
        :page-sizes="[10, 20, 30, 40]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="totalCount"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>

    <el-dialog
      :title="previewImgTitle"
      :visible.sync="previewImgDialogVisible"
      width="50%"
    >
      <el-image :src="previewImgUrl" />
    </el-dialog>

    <el-dialog
      title="数据"
      :visible.sync="getDatasDialogVisible"
      width="30%"
    >
      <div>
        <ul class="get-data-content">
          <li>联系我们</li>
          <li>公司名称：中交宇科（北京）空间信息技术有限公司所有限公司</li>
          <li>地址：北京市海淀区永丰路四维图新大厦C座4层</li>
          <li>电话：010-64907119</li>
          <li>传真：010-64907108</li>
          <li>邮箱：office@chtgeo.cn</li>
        </ul>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { sceneWebList, sceneListByKeyword, getPreviewFileUrl } from '@/api/simulation'
export default {
  props: {
    searchObj: {
      type: Object,
      required: true
    },
    funType: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      previewImgDialogVisible: false,
      getDatasDialogVisible: false,
      previewImgUrl: '',
      previewImgTitle: '',
      // 表格当前页数据
      tableData: [],
      // 默认每页数据量
      pageSize: 10,
      // 当前页码
      currentPage: 1,
      // 查询的页码
      start: 1,
      // 默认数据总数
      totalCount: 1000,
      options: {
        sceneTypeOptions: {
          options: [
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
      }
    }
  },
  mounted() {
    // this.$emit('getSceneList', { pageNum: this.currentPage, pageSize: this.pageSize })
    this.getSceneList(this.searchObj, this.funType)
  },
  methods: {
    getSceneList(obj, funType) {
      this.searchObj = obj
      if (funType === 'list') {
        this.sceneList()
      } else {
        this.sceneListByKeyword()
      }
    },
    sceneList() {
      var that = this
      sceneWebList(this.searchObj).then(response => {
        console.log('sceneList...', response)
        that.tableData = response.list.list
        that.totalCount = response.number
      })
    },
    sceneListByKeyword() {
      var that = this
      sceneListByKeyword(this.searchObj).then(response => {
        console.log('sceneList...', response)
        that.tableData = response.list.list
        that.totalCount = response.number
      })
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

    // 每页显示数据量变更
    handleSizeChange: function(val) {
      this.pageSize = val
      this.loadData(this.currentPage, this.pageSize)
    },

    // 页码变更
    handleCurrentChange: function(val) {
      this.currentPage = val
      this.loadData(this.currentPage, this.pageSize)
    },
    handlePreviewImg: function(index, row) {
      var that = this
      getPreviewFileUrl(row).then(response => {
        that.previewImgDialogVisible = true
        that.previewImgUrl = response.imgUrl + '?+' + Math.round(Math.random() * 100)
        that.previewImgTitle = '【场景名称】' + row.sceneName
      })
    },
    handleGetDatas: function(index, row) {
      this.getDatasDialogVisible = true
    },
    formatScenetypeList(row, column) {
      // 获取单元格数据
      const val = row[column.property]
      var result = ''
      for (var i = 0; i < val.length; i++) {
        result = result + val[i].stName + ','
      }
      return result
    }
  }
}
</script>
<style lang="scss" scoped>
    // 全局css初始化
    ul, ol, li { margin:0; padding:0; }
    ul, ol { list-style:none; }
    a { text-decoration:none; }
    a:hover { text-decoration:none; }

    .mainlist-container {
        height: 100%;
    }
    .get-data-content{
        background-color:#f7f7f7;
        padding: 10px 20px;
    }
    .get-data-content li {
        margin:5px 0;
    }
</style>
