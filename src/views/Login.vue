<template>
  <div class="login">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span class="title">登陆界面</span>
      </div>
      <el-form
        :model="loginForm"
        :rules="loginRules"
        ref="loginFormRef"
        label-width="100px"
      >
        <el-form-item label="邮箱：" prop="email">
          <el-input placeholder='请输入邮箱' v-model="loginForm.email"></el-input>
        </el-form-item>
        <el-form-item label="密码：" prop="password">
          <el-input placeholder='请输入密码' type='password' v-model="loginForm.password"></el-input>
        </el-form-item>
          <el-button type="primary" @click="submitForm('loginFormRef')">登陆</el-button>
          <el-button @click="resetForm('loginFormRef')">重置</el-button>
      </el-form>
      <p class="text">还没注册？<a href="/register">点击注册</a></p>
    </el-card>
  </div>
</template>
<script>
import decode from 'jwt-decode'
export default {

  data() {
    return {
      //要提交的表单
      loginForm:{
        email:'',
        password:''
      },
      //表单验证
      loginRules:{
        email:[
          {required:true,message:'请输入邮箱',trigger:'blur'},
          {type:'email',message:'请输入正确格式',trigger:'blur'}
        ],
        password:[
            {required:true,message:'请输入密码',trigger:'blur'},
        ]
      }
    };
  },
  methods:{
    //登陆方法：
    submitForm(form){
      this.$refs[form].validate(async value=>{
        if(value){
          let result =await this.$axios.post('/login',this.loginForm)
          if(result.data.status==201) return this.$message.error(result.data.message)
          let { token  }= result.data.data
          localStorage.setItem('token',token)
          let UntieToken = decode(token)

          this.$store.dispatch("setAuthenticated",!this.isempty(UntieToken))
          this.$store.dispatch("setUser", UntieToken)

          this.$message.success(result.data.message)
          this.$router.push('index')
        }
      })
    },
    //表单重置
    resetForm(form){
       this.$refs[form].resetFields();
    },
    isempty(value){
      if(value){
        return false
      }else{
        return true
      }
    }
  }
};
</script>
<style lang="less" scoped>
.text{
  font-size:15px;
  text-align: right;
}
.login {
  text-align: center;
  overflow: hidden;
}
.title {
  font-size: 20px;
  font-weight: bold;
}
.el-card {
  margin: auto;
  margin-top: 200px;
}
.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}
.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both;
}

.box-card {
  width: 480px;
}
</style>
