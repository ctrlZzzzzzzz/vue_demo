<template>
    <div class="loginContainer">
        <div class="loginBox">
            <!-- 头像 -->
            <div class="pic"><img src="../assets/logo.png" alt=""></div>
            <!-- 登陆表单 -->
            <el-form label-width="0px" class="loginForm" :model='loginFormModel' :rules='rules' ref="loginFormRef">
                <el-form-item  prop='username'>
                  <el-input v-model="loginFormModel.username"></el-input>
                </el-form-item>
                <el-form-item prop='password'>
                    <el-input v-model="loginFormModel.password" type="password"></el-input>
                </el-form-item>
                <el-form-item class="btns">
                    <el-button type="primary" @click="login">登陆</el-button>
                    <el-button @click="resetLoginForm">重置</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return{
            loginFormModel:{
              username:'',
              password:''
            },
            rules:{
              username:[
                {
                  required:true,message:'请输入用户名',trigger:'blur'
                }
              ],
              password:[
                {
                  required:true,message:'请输入密码',trigger:'blur'
                }
              ]
            }

        }
    },
    methods:{
      resetLoginForm(){
        this.$refs.loginFormRef.resetFields()
      },
      login(){
        this.$refs.loginFormRef.validate((vaild)=>{
          if(vaild){
            this.$message.success('登陆成功');
            this.$router.push('/home')
          }else{
            this.$message.error('登陆失败')
          }
          
        })
      }
    }
}
</script>
<style lang="less" scoped>
    .loginContainer {
        height: 100%;
        background-color: #2b4b6b;
    }
    .loginBox {
        position: absolute;
        width: 450px;
        height: 300px;
        left: 50%;
        top: 50%;
        transform: translate(-50%,-50%);
        background-color: #fff;
        border-radius: 3px;
    }
    .pic {
        height: 130px;
        width: 130px;
        border: 1px solid #eee;
        border-radius: 50%;
        padding: 10px;
        box-shadow: 0 0 10px #ddd;
        position: absolute;
        left: 50%;
        transform: translate(-50%,-50%);
        background-color: #fff;
        img {
            height: 100%;
            width: 100%;
            border-radius: 50%;
            background-color: #eee;

        }
    }
    .loginForm {
        position: absolute;
        bottom: 0;
        width: 100%;
        padding: 0 20px;
        box-sizing: border-box;
    }
    .btns {
        display: flex;
        justify-content: flex-end;
    }
</style>
