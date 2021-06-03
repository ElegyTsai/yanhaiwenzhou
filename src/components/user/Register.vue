<template>
<!--注册页-->
    <div class="regisPage">
        <section>
            <img src="@/assets/images/login/logo.png">
            <hr/>
        </section>
        <div class="data">
            <div class='tab'>
                <img class="info" src="@/assets/images/login/head.png">
                <div class="info">
                    <h1>{{msg1}}</h1>
                    <div class="photo_regis">
                        <el-input v-model="loginForm.username" placeholder="请输入用户名"/>
                        <el-input type="password" v-model="loginForm.password" placeholder="请输入密码"/>
                        <el-input type="password" v-model="loginForm.repassword" placeholder="请再次输入密码"/>
                        <el-input v-model="loginForm.phonenumber" placeholder="请输入手机号"/>
                        <el-input v-model="loginForm.verificationcode" placeholder="请输入验证码"/>
                        <el-button @click="register">{{msg2}}</el-button>
                    </div>
                </div>
            </div>
        </div>
    </div>
    
</template>

<script>
export default {
    name:'regisPage',
    data(){
        return{
            msg1:'砚海文舟工业图案设计服务平台',
            msg2:'注册',
            loginForm:{
                username: '',
                phonenumber:'',
                verificationcode: '',
                password:'',
                repassword: '',
            }
        }
    },
    methods:{
        register(){
            //暂时先不处理手机短信验证码
            if(!this.loginForm.username ){
                alert('用户名不能为空');
            }else if(!this.loginForm.password || !this.loginForm.repassword){
                alert('密码不能为空');
            }else if(this.loginForm.password!==this.loginForm.repassword){
                alert('两次密码不一致');
            }else if(!this.loginForm.phonenumber || this.loginForm.phonenumber.length!==11){
                alert('手机号不正确');
            }else if(!this.loginForm.verificationcode){
                alert('验证码为空');
            }else if(this.loginForm.verificationcode!='0000'){
                alert('验证码错误')
            }else{
                this.$http({
                    method:'post',
                    url:"http://localhost:8080/api/login/add",
                    params:{
                        telephone:this.loginForm.phonenumber.trim(),
                        username:this.loginForm.username.trim(),
                        password: this.loginForm.password.trim()
                    }
                  }).then((res)=>{
                      //console.log('res is ', res.status);
                      console.log('res is ', res);
                      if(res.status===200){
                          if(res.data.rescode==0){
                              //该手机号已被注册
                                alert('该手机号已注册');
                          }else{
                              //新注册
                              alert('注册成功');
                              this.$store.commit('setToken', res.data.username || res.data.telephone);
                              this.$router.push('/');
                          }
                      }else{
                          console.log('regis fail')
                      }
                    
                });
            }
        }
    }
}
</script>

<style scoped>
*{
    margin: 0;
    padding:0;
}
.regisPage{
    display: flex;
    background: #E7F0FF;
    position: relative;
    flex-direction:column;
    height: 100%;
    width: 100%;
    box-sizing: border-box;
    align-items: stretch;
}
.regisPage section{
    text-align: left;
    height: 80px;
    flex: 0 1 auto;
   /* border: 1px solid black;*/
}

.regisPage .data{
    /*border: 1px solid red;*/
    clear: both;
    margin-top:100px;
    flex: 1 1 auto;
    -webkit-flex: 1 1 auto; 
    text-align: center;
    left:25%;
}
.regisPage .data .tab{
    position: relative;
    left: 25%;
    width: 50%;
    height: 460px;
    display: flex;
    background: white;
    border-radius: 10px;
}
.regisPage .data .tab .info{
    margin-top: 50px;
}
.regisPage section img{
    position: relative;
    max-width:200px;
    left:100px;
    top:10px;
    
}
.regisPage .data img{
    max-height: 300px;
}


.regisPage .data h1{
    font-weight: normal;
    font-size: 1.2em;
    padding: 10px;
}

 .regisPage .data >>> .el-tabs{
    display:inline-block;
}
.regisPage .data >>> .el-tabs__nav-wrap::after{
    width: 0;
}
.regisPage .data >>> .el-input{
    width: 200px;
    margin: 0 auto;
    padding:5px 0;
    display: block;
}
.regisPage .data >>> .el-input__inner{
    border-radius: 20px;
    text-indent: 10px;
}
.regisPage >>> .el-button{
    margin-top: 5px ;
}

</style>