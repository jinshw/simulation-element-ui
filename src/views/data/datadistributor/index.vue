<template>
  <el-dialog
    title="分发"
    :visible.sync="dataDistributorDialogVisible"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    :show-close="false"
  >
    <div>
      <el-row class="d2-mb">
        <el-form :inline="true">
          <el-form-item label="账号">
            <el-input v-model.trim="searchObj.username" type="text" placeholder="账号" />
          </el-form-item>
          <el-form-item label="角色">
            <el-select
              v-model="searchObj.roles"
              style="width:100%;"
              filterable
              multiple
              allow-create
              default-first-option
              placeholder="请选择角色"
            >
              <el-option
                v-for="item in roles"
                :key="item.roleId"
                :label="item.roleName"
                :value="item.roleId"
              />
            </el-select>

          </el-form-item>
          <el-form-item>
            <el-button @click="search">查询</el-button>
          </el-form-item>
        </el-form>
      </el-row>
      <el-table ref="userTableRef" :data="users" style="width: 100%" @current-change="clickChange">
        <!-- <el-table-column type="selection" width="55" /> -->
        <el-table-column label="选择" width="55">
          <template slot-scope="scope">
            <el-radio v-model="tableRadio" :label="scope.row"><i /></el-radio>
          </template>
        </el-table-column>
        <!-- <el-table-column prop="userId" label="主键" width="180" /> -->
        <el-table-column prop="username" label="账号" width="180" />
        <el-table-column prop="nickname" label="昵称" width="180" />
        <!-- <el-table-column prop="email" label="邮箱" width="180" /> -->
        <!-- <el-table-column prop="mobile" label="手机" /> -->
        <el-table-column prop="roleList" label="角色" :formatter="formatRoles" />

        <el-table-column prop="status" label="状态">
          <template slot-scope="scope">
            <template v-if="scope.row.status == '0'">
              <el-tag type="info">禁用</el-tag>
            </template>
            <template v-else-if="scope.row.status == '1'">
              <el-tag type="success">正常</el-tag>
            </template>
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
    <div slot="footer" class="dialog-footer">
      <el-button @click="cancelClick">取 消</el-button>
      <el-button type="primary" @click="save">确 定</el-button>
    </div>
  </el-dialog>
</template>
<script>
import { listPage } from '@/api/user'
import { getList } from '@/api/role'
export default {
  name: 'DataDistributor',
  props: {
    dataDistributorDialogVisible: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      tableRadio: {},
      selectDialogVisible: false,
      users: [],
      searchObj: {
        userId: 0,
        username: '',
        nickname: '',
        password: '',
        email: '',
        mobile: '',
        status: '1',
        deptId: '',
        roles: [],
        roleList: [],
        menuList: []
      },
      roles: [],
      rolesSelect: [],
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
  },
  methods: {
    init() {
      this.searchObj = {
        userId: 0,
        username: '',
        nickname: '',
        password: '',
        email: '',
        mobile: '',
        status: '1',
        deptId: '',
        roles: [],
        roleList: [],
        menuList: []
      }
      this.search()
    },
    // 搜索
    search: function() {
      this.getUsers(this.currentPage, this.pagesize)
    },
    getUsers: function(pageNum, pageSize) {
      const that = this
      //   this.searchObj.username = this.searchText
      this.searchObj.pageNum = pageNum
      this.searchObj.pageSize = pageSize

      listPage(that.searchObj)
        .then(datas => {
          that.users = datas.data.list
          that.totalCount = datas.data.list.length
        })
        .catch(err => {
          console.log(err)
        })

      this.getRoles()
    },
    getRoles: function(event) {
      var that = this
      getList({}).then(response => {
        that.roles = response.data
      })
    },
    // 每页显示数据量变更
    handleSizeChange: function(val) {
      this.pagesize = val
      this.search()
    },

    // 页码变更
    handleCurrentChange: function(val) {
      this.currentPage = val
      this.search()
    },
    formatRoles(row, column) {
      var result = ''
      // 获取单元格数据
      const val = row[column.property]
      var temp = null
      for (var i = 0; i < val.length; i++) {
        temp = val[i]
        result = result + temp.roleName + '|'
      }
      return result
    },
    cancelClick() {
      this.$emit('changeDataDistributor', false)
    },
    save() {
    //   var selectedDatas = this.$refs.userTableRef.store.states.selection
      this.$emit('callback', this.tableRadio)
    //   console.log('this.tableRadio........', this.tableRadio)
    },
    clickChange(item) {
      this.tableRadio = item
    }
  }
}
</script>
