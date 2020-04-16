<template>
  <div class="header">
      <el-row>
        <el-col :span="6">
            <div class="left">
                后台管理系统
            </div>
        </el-col>
        <el-col :span="4" :offset="14">
            <el-row class='right'>
                <el-col :span='8' class='avater'>
                    <img :src="user.avater" alt="">
                </el-col>
                <el-col :span='14'>
                     欢迎
                    <p class='name'>{{user.name}}</p>
                </el-col>
                <el-col :span='2'>
                   <el-dropdown @command='command'>
                    <span class="el-dropdown-link">
                        <i  class="el-icon-arrow-down el-icon--right"></i>
                    </span>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item command='exit'>退出</el-dropdown-item>
                    </el-dropdown-menu>
                    </el-dropdown>
                </el-col>
            </el-row>
        </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
    data(){
        return{
            user:''
        }
    },
    created(){
        this.user = this.$store.getters.getUser
    },
    methods:{
        command(value){
            if(value=='exit'){
                this.logout();
            }
        },
        logout(){
            //清除token
            localStorage.removeItem('token')
            //改变vuex中的值
            this.$store.commit('clear')
            //返回主页
            this.$router.replace('/login')
        }
    }   
}
</script>

<style style="scss" scoped>
.el-dropdown-link {
    cursor: pointer;
    color: white;
  }
  .el-icon-arrow-down {
    font-size: 12px;
  }
.header{
    height: 100%;
    width: 100%;
}
.left{
    font-size: 25px;
    text-align: center;
    margin-top: 10px;
}
.right{
    text-align: center;
    margin-top:10px;
}
.name{
    color: #ffd04b;
}
img{
    width: 100%;
    height: 100%;
    display: block;
}
.avater{
    width:50px;
    height: 50px;
    border-radius: 50%;
    overflow: hidden;
}
</style>