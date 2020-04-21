<template>
  <div class="nav-container">
    <div class="nav-left">
      <el-menu
        :default-active="activeIndex"
        class="el-menu-demo"
        mode="horizontal"
        background-color="#1f2d3d"
        text-color="#fff"
        active-text-color="#409EFF"
        @select="handleSelect"
      >
        <el-menu-item index="1">
          <a href="main.html">
            <img v-if="logo" :src="logo" class="sidebar-logo">
            仿真平台
          </a>
        </el-menu-item>
        <el-menu-item index="2">
          <a href="mainlist.html">
            场景-树形搜索
          </a>
        </el-menu-item>
        <el-menu-item index="3">
          <a href="keywordlist.html">
            场景-关键词搜索
          </a>

        </el-menu-item>
        <!-- <el-menu-item index="4">联系我们</el-menu-item> -->

      </el-menu>
    </div>
    <div class="nav-right">
      <el-menu
        :default-active="activeIndex"
        class="el-menu-demo"
        mode="horizontal"
        background-color="#1f2d3d"
        text-color="#fff"
        active-text-color="#fff"
        @select="handleSelect"
      >
        <el-menu-item index="hello">您好，欢迎访问</el-menu-item>

      </el-menu>
    </div>

  </div>

</template>

<script>
export default {
  components: {
  },
  props: {
    activeIndex: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      logo: 'static/image/logo.png'
      // activeIndex: '2'
    }
  },
  mounted() {
  },
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath)
    }
  }
}
</script>
<style lang="scss" scoped>
  .nav-container{

  }
  .sidebar-logo {
    width: 38px;
    height: 38px;
    vertical-align: middle;
    margin-right: 12px;
  }
  .nav-right{
    position: absolute;
    top:0;
    right: 0;
  }
  .el-menu--horizontal>.el-menu-item{
    height: 65px;
    line-height: 65px;
  }
</style>
