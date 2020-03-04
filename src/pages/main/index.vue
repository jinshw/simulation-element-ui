<template>
  <div id="app">
    <div class="main-top-container">
      <div class="main-head-top">
        <div class="main-head-top-inside">
          <aside class="main-head-top-operation">
            <a href="" class="main-head-top-operation-loginBtn main-head-top-btn">企业登录</a>
            <a href="" class="main-head-top-operation-registerBtn main-head-top-btn">下载</a>
          </aside>
          <a href="" class="main-head-top-title">
            <h1 class="main-head-top-title-inner">
              <span class="main-head-top-title-inner">仿真平台</span>
            </h1>
          </a>
        </div>
      </div>
    </div>
    <div class="main-carousel-container">
      <el-carousel indicator-position="outside" height="580px" :autoplay="false">
        <el-carousel-item v-for="item in 3" :key="item">
          <!-- <img src="static/image/bg1024.jpg" width="100%" height="100%" alt=""> -->
          <div class="main-head-background-img" />
          <div class="main-head-container">

            <div class="main-head-inside">
              <div class="main-head-info">
                <div class="main-head-info-title">让您体验真实的驾驶场景</div>
              </div>
              <div class="main-head-btns">
                <a href="" class="main-head-btns-welcome">欢迎进入</a>
              </div>
            </div>
          </div>
        </el-carousel-item>
      </el-carousel>
    </div>
    <div class="main-content-container">
      <div class="main-content-inside">
        <div class="main-content-section">
          <el-row>
            <el-col :span="6">
              <div class="main-content-section-item" style="">
                <div class="main-content-section-item-img main-csi-item-Feature3 " />
                <div class="main-content-section-item-title">
                  丰富的数据源
                </div>
                <ul class="main-content-section-item-list">
                  <li class="main-content-section-item-list-item">
                    <span class="main-content-section-item-list-item-text">
                      丰富的路侧及车载场景数据源。
                    </span>
                  </li>
                </ul>
              </div>
            </el-col>
            <el-col :span="6">
              <div class="main-content-section-item" style="">
                <div class="main-content-section-item-img main-csi-item-Feature3 " />
                <div class="main-content-section-item-title">
                  多样化场景
                </div>
                <ul class="main-content-section-item-list">
                  <li class="main-content-section-item-list-item">
                    <span class="main-content-section-item-list-item-text">
                      考虑多样化道路类型和交通参与者交互关系的场景分类体系。
                    </span>
                  </li>
                </ul>
              </div>
            </el-col>
            <el-col :span="6">
              <div class="main-content-section-item" style="">
                <div class="main-content-section-item-img main-csi-item-Feature3 " />
                <div class="main-content-section-item-title">
                  智能化构建
                </div>
                <ul class="main-content-section-item-list">
                  <li class="main-content-section-item-list-item">
                    <span class="main-content-section-item-list-item-text">
                      基于数据驱动的深度学习模型，实现智能化交互式场景构建。
                    </span>
                  </li>
                </ul>
              </div>
            </el-col>
            <el-col :span="6">
              <div class="main-content-section-item" style="">
                <div class="main-content-section-item-img main-csi-item-Feature3 " />
                <div class="main-content-section-item-title">
                  特色专题库
                </div>
                <ul class="main-content-section-item-list">
                  <li class="main-content-section-item-list-item">
                    <span class="main-content-section-item-list-item-text">
                      特色专题子库满足用户的专项测试需求。
                    </span>
                  </li>
                </ul>
              </div>
            </el-col>

          </el-row>
        </div>
      </div>
    </div>
    <div class="main-foot-container">
      <div class="main-foot-inside">
        <div class="main-foot-info" />
        <div class="main-foot-copyright">
          Copyright © 2019 四维图新中交宇科 版权所有 ICP证：XXXXXXXXX
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>
<style lang="scss" scoped>
  // 全局css初始化
  body, h1, h2, h3, h4, h5, h6, hr, p, blockquote, dl, dt, dd, ul, ol, li, pre, form, fieldset, legend, button, input, textarea, th, td { margin:0; padding:0; }
  body, button, input, select, textarea { font:12px/1.5tahoma, arial, \5b8b\4f53; }
  h1, h2, h3, h4, h5, h6{ font-size:100%; }
  address, cite, dfn, em, var { font-style:normal; }
  code, kbd, pre, samp { font-family:couriernew, courier, monospace; }
  small{ font-size:12px; }
  ul, ol { list-style:none; }
  a { text-decoration:none; }
  a:hover { text-decoration:none; }
  sup { vertical-align:text-top; }
  sub{ vertical-align:text-bottom; }
  legend { color:#000; }
  fieldset, img { border:0; }
  button, input, select, textarea { font-size:100%; }
  table { border-collapse:collapse; border-spacing:0; }

  .main-head-container{
  }
  .main-head-top {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    padding: 16px 0;
    display: block;
    z-index: 10;
  }
  .main-head-top-inside{
    position: relative;
    z-index: 2;
    width: 1145px;
    margin: 0 auto;
    text-align: center;
  }
  .main-head-top-operation{
    position: absolute;
    right: 0;
  }
  .main-head-top-operation-loginBtn{
    margin-right: 15px;
    border: 1px solid #FFF;
    background-color: transparent;
    color: #FFF;
  }
  .main-head-top-operation-registerBtn {
    border: 1px solid #FFF;
    background-color: #FFF;
    color: #000921;
  }
  .main-head-top-btn {
    vertical-align: top;
    display: inline-block;
    min-width: 58px;
    height: 28px;
    padding: 0 15px;
    border-radius: 2px;
    line-height: 27px;
    font-size: 15px;
    text-align: center;
    -webkit-font-smoothing: antialiased;
    -webkit-transition: all .2s;
    -o-transition: all .2s;
    transition: all .2s;
  }
  .main-head-top-title{
    float: left;
  }
  .main-head-top-title-inner{
    position: relative;
    color: #fff;
    font-size: 20px;
    font-weight: 400;
  }
  .main-head-inside {
    position: relative;
    z-index: 4;
    width: 1000px;
    margin: 0 auto;
    padding: 0;
    top: 200px;
  }
  .main-head-info {
    text-align: center;
    position: relative;
    margin: 0;
    padding: 0;
  }
  .main-head-info-title {
    margin: 0 auto;
    font-size: 48px;
    line-height: 67px;
    letter-spacing: 2.45px;
    z-index: 11;
    color: #FFF;
    position: relative;
    font-family: inherit;
    width: 631px;
    display: block;
    padding-top: 0;
    padding: 0;
  }
  .main-head-btns {
    position: relative;
    top: 110px;
    text-align: center;
  }
  .main-head-btns-welcome{
    font-size: 22px;
    background-color: #fff;
    text-align: center;
    line-height: 40px;
    padding: 10px 30px;
    border-radius: 2px;
  }
  .main-head-background-img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: url(/static/image/bg1024.jpg) center bottom no-repeat;
    background-size:100% 100%;
    background-color: #000921;
  }
  .main-content-section {
    width: 1145px;
    margin: 0 auto;
  }
  .main-content-section-item {
    text-align: center;
    margin: 0 30px;
  }

  .main-content-section-item-img{
    width: 200px;
    height: 176px;
    background-size: 100%;
    vertical-align: top;
    display: inline-block;
    text-align: center;
    margin-bottom: 14px;
  }
  .main-csi-item-Feature3 {
    background-image: url(/static/image/Feature3.png);
  }
  .main-content-section-item-title {
    font-size: 20px;
    color: #323232;
    margin-bottom: 10px;
    text-align: center;
  }

  .main-content-section-item-list {
    text-align: left;
  }
  .main-content-section-item-list-item {
    text-align: justify;
    line-height: 24px;
    font-size: 13px;
  }
  .main-content-section-item-list-item-text {
    font-size: 13px;
    color: #555;
  }
  .main-foot-container{
    margin: 20px 0;
    font-size: 12px;
  }
  .main-foot-inside{
    position: relative;
    z-index: 2;
    width: 1000px;
    margin: 0 auto;
    padding: 56px 0 32px;
  }
  .main-foot-copyright{
    line-height: 2;
    color: #828282;
    text-align: center;
  }

</style>
