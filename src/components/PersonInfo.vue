<template>
  <div class="person-info">
    <el-row class="row">
      <el-col :span="10" class="left">
        <el-avatar :size="150" :src="user.avater"></el-avatar>
        <p class="username">{{ user.name }}</p>
      </el-col>
      <el-col :span="10" class="right">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span class="title">个人信息</span>
          </div>
          <div class="title">
            姓名：
            <p class="content">{{ user.name }}</p>
            邮箱：
            <p class="content">{{ user.email }}</p>
            身份：
            <p class="content">{{ user.identity }}</p>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      user: ""
    };
  },
  created() {
    this.user = this.$store.state.user;
  }
};
</script>

<style scoped>
.person-info {
  width: 100%;
  height: 100%;
}
.row {
  height: 100%;
}
.left {
  height: 100%;
  text-align: center;
  padding-top: 120px;
}
.right {
  height: 100%;
}
.el-card{
  margin-top: 120px;
}
.title{
  font-size: 15px;
  font-weight: bold;
}
.content{
  font-size:15px;
  font-weight: normal;
  margin: 8px 0;
}
.username{
  font-size: 18px;
  font-weight: bold;
  margin-top: 5px;
}
</style>
