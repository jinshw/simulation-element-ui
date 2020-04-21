<template>
  <dir class="search">
    <el-row class="d2-mb" :gutter="10">
      <el-col :span="6">
        <el-input v-model.trim="searchText" type="text" placeholder="模糊查询" />
      </el-col>
      <el-col :span="18">
        <el-button type="success" @click="handleSearch">查询</el-button>
      </el-col>
    </el-row>
  </dir>
</template>
<script>
export default {
  data() {
    return {
      searchText: ''
    }
  },
  methods: {
    handleSearch() {
      this.$emit('search', this.searchText)
    }
  }
}
</script>
<style scoped>
    .search {
        margin-left: -30px;
    }
</style>
