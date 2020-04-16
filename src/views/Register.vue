<template>
  <div class="register">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span class="title">注册界面</span>
      </div>
      <el-form
        :model="registerForm"
        :rules="registerRules"
        ref="registerFormRef"
        label-width="100px"
      >
        <el-form-item label="用户名：" prop="name">
          <el-input
            placeholder="请输入用户名"
            v-model="registerForm.name"
          ></el-input>
        </el-form-item>
        <el-form-item label="邮箱：" prop="email">
          <el-input
            placeholder="请输入邮箱"
            v-model="registerForm.email"
          ></el-input>
        </el-form-item>
        <el-form-item label="密码：" prop="password">
          <el-input
            placeholder="请输入密码"
            type="password"
            v-model="registerForm.password"
          ></el-input>
        </el-form-item>
        <el-form-item label="确定密码：" prop="checkPassword">
          <el-input
            placeholder="请输入密码"
            type="password"
            v-model="registerForm.checkPassword"
          ></el-input>
        </el-form-item>
        <el-form-item label="身份：" prop="identity" class="identity">
          <el-select v-model="registerForm.identity" placeholder="请选择身份">
            <el-option label="管理员" value="管理员"></el-option>
            <el-option label="普通用户" value="普通用户"></el-option>
          </el-select>
        </el-form-item>
        <el-button type="primary" @click="submitForm('registerFormRef')"
          >注册</el-button
        >
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
  data(){
     var validatePass = (rule, value, callback) => {
        if (value !== this.registerForm.password){
          callback(new Error('两次输入密码不一致'));
        } else {
          callback();
        }
     }
     var vaildateIdent = (rule,value,callback)=>{
       if(this.registerForm.identity === ''){
         callback(new Error('请填写身份！'))
       }else{
         callback()
       }
     }
    return{
      //注册的用户信息
      registerForm:{
        name:'',
        email:'',
        password:'',
        checkPassword:'',
        identity:''
      },
      //验证信息：
      registerRules:{
        name:[
           {required:true,message:'请输入用户名',trigger:'blur'},
           {min:3,max:6,message:'用户名应该在3-6位',trigger:'blur'}
        ],
        email:[
          {required:true,message:'请输入邮箱',trigger:'blur'},
          {type:'email',message:'请输入正确格式',trigger:'blur'}
        ],
        password:[
            {required:true,message:'请输入密码',trigger:'blur'},
        ],
        checkPassword:[
            {required:true,message:'请输入确定密码',trigger:'blur'},
            {validator: validatePass, trigger: 'blur'}
        ],
        identity:[
          {required:true,message:'请选择你的身份',trigger:'change'}
        ]
      }
    }
  },
  methods:{
     submitForm(form){
      this.$refs[form].validate(async value =>{
        if(value){
          //深拷贝
          let parmas = JSON.parse(JSON.stringify(this.registerForm))
          delete parmas.checkPassword
          let result = await this.$axios.post('/register',parmas) 
          if(result.data.status==201) return this.$message.error(result.data.message)
          this.$message.success('注册成功!')
          this.$router.replace({path:'/login'})
        }
      })
    }
  },
  components: {}
}
</script>
<style lang="less" scoped>
.register {
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
.identity {
  text-align: left;
}
</style>
