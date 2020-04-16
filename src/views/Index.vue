<template>
  <div class="index">
    <el-container>
      <el-header>
        <Header></Header>
      </el-header>
      <el-container>
        <el-aside width="180px">
          <el-menu
            :default-active = dafultIndex
            class="el-menu-vertical-demo"
            background-color="#272a38"
            text-color="#fff"
            active-text-color="#ffd04b"
            router
          >
            <el-menu-item index="/home">
                <i class="el-icon-s-home"></i>
                <span slot="title">首页</span>
              </el-menu-item>
            <el-submenu index='1'>
              <template slot="title">
                <i class="el-icon-s-release"></i>
                <span>资金管理</span>
              </template>
              <el-menu-item index="/money">资金流水</el-menu-item>
            </el-submenu>
            <el-submenu index='2'>
              <template slot="title">
                <i class="el-icon-user-solid"></i>
                <span>信息管理</span>
              </template>
              <el-menu-item index="/personInfo">个人信息</el-menu-item>
            </el-submenu>
          </el-menu>
        </el-aside>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import Header from "../components/Header";
export default {
  name: "index",
  data(){
    return{
      dafultIndex:""
    }
  },
  created(){
    this.dafultIndex = this.$route.path
  },
  components: {
    Header
  }
};
</script>

<style style="less" scoped>
.index {
  height: 100%;
}
.el-main{
  width: 100%;
  height: 100%;
}
.el-header,
.el-aside {
  padding: 0;
  margin: 0;
  background: #272a38;
  color: white;
}
.el-container {
  height: 100%;
}
.el-aside {
  height: 100%;
  overflow: hidden;
}
.el-menu {
  overflow: hidden;
}
</style>
