<template>
<!--注册页-->
    <div class="regisPage">
        <section>
            <img src="@/assets/images/login/logo.png">
            <hr/>
        </section>
        <div class="data">
            <div class='tab'>
                <img class="info1" src="@/assets/images/login/head.png">
                <div class="info2">
                    <h1>{{msg1}}</h1>
                    <div class="photo_regis">
                        <el-input v-model="loginForm.username" placeholder="请输入用户名"/>
                        <el-input type="password" v-model="loginForm.password" placeholder="请输入密码"/>
                        <el-input type="password" v-model="loginForm.repassword" placeholder="请再次输入密码"/>
                        <el-input v-model="loginForm.phonenumber" placeholder="请输入手机号"/>
                        <div class="code">
                            <el-input v-model="loginForm.verificationcode" placeholder="请输入验证码"/>
                            <el-button 
                                @click="getCode"
                                :disabled="disabled=!show"
                            >
                            <span v-show="show">发送验证码</span>
                            <span v-show="!show" class="count">{{count}} s</span>
                            </el-button>
                        </div>
                        <div class="agreement">
                            <input type="checkbox" v-model="agree" value="agreed"/>
                            <label for="agreed">已同意</label>
                            <el-button @click="text">{{msg2}}</el-button>
                        </div>
                        <div class="regist">
                            <el-button @click="register">{{msg3}}</el-button>
                        </div>
                        <div class="login">
                            <span>{{msg4}}</span>
                            <span><el-button @click="login">登录</el-button></span>
                        </div>                        
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
            msg2:'《砚海文舟用户协议》',
            msg3:'注册',
            msg4:'我已经注册，现在就',
            show: true,
            timer: null,
            count: "",
            agree: "",
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
        getCode(){
            // 验证手机号
            if (this.checkPhone() == false) {
                return false;
            } else {
                this.validateTime();
                this.$http({
                    method:'get',
                    url:"http://localhost:8081/api/home/getCode",
                    params:{
                        telephone:this.loginForm.phonenumber.trim()
                    }
                  }).then((res)=>{
                      console.log('res is ', res);
                      if(res.status==200){
                          this.$message.success('验证码已发送');
                      }                  
                });
            }
        },
        validateTime(){
            const TIME_COUNT = 60; 
            if (!this.timer) {
                this.count = TIME_COUNT;
                this.show = false;
                this.timer = setInterval(() => {
                    if (this.count == 0) {
                        this.show = true;
                        clearInterval(this.timer);
                        this.timer = null;
                    } else {
                        this.count--;
                    }
                }, 1000);
            }
        },
        checkPhone(){
            let phonenumber = this.loginForm.phonenumber;
            if (!/^1[3456789]\d{9}$/.test(phonenumber)) {
                this.$message.error("请输入正确的手机号");
                return false;
            }
            return true;
        },
        text(){
            //暂时不处理用户协议
        },
        register(){
            //暂时先不处理手机短信验证码
            if(!this.loginForm.username ){
                this.$message.warning('用户名不能为空');
            }else if(!this.loginForm.password || !this.loginForm.repassword){
                this.$message.warning('密码不能为空');
            }else if(this.loginForm.password!==this.loginForm.repassword){
                this.$message.error('两次密码不一致');
            }else if(!this.loginForm.phonenumber){
                this.$message.warning('手机号不能为空');
            }else if(!this.loginForm.verificationcode){
                this.$message.warning('验证码为空');
            }else if(!this.agree){
                this.$message.warning('请阅读用户协议并勾选同意');
            }
            else{
                this.$http({
                    method:'post',
                    url:"http://localhost:8081/api/home/register/mobile",
                    params:{
                        Mobile:this.loginForm.phonenumber.trim(),
                        username: this.loginForm.username.trim(),
                        password: this.loginForm.password.trim(),
                        validationCode: this.loginForm.verificationcode.trim()
                    }
                  }).then((res)=>{
                      //console.log('res is ', res.status);
                      console.log('res is ', res);
                      if(res.status===200){
                          if(res.data.rspCode!=2000){
                              //该手机号已被注册
                                this.$message.error(res.data.rspMsg);
                          }else{
                              //新注册
                              this.$message.success('注册成功');
                              this.$store.commit('setToken', res.headers.token);
                              this.$router.push('/');
                          }
                      }else{
                          console.log('regis fail');
                          this.$message.error('注册失败');
                      } 
                });
            }
        },
        login(){
            this.$router.push('/login');
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
    margin-top:20px;           /*100px*/
    flex: 1 1 auto;
    -webkit-flex: 1 1 auto; 
    text-align: center;
    left:25%;
}
.regisPage .data .tab{
    position: relative;
    left: 25%;
    width: 50%;
    height: 400px;
    display: flex;
    background: white;
    border-radius: 10px;
}
.regisPage .data .tab .info1{
    margin-top: 50px;
}
.regisPage .data .tab .info2{
    margin-top: 20px;
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
    width: 225px;
    margin: 0 auto;
    padding:5px 0;
    display: block;
}
.regisPage .data >>> .el-input__inner{
    border-radius: 20px;
    text-indent: 10px;
}
.code{
    position: relative;
}
.code .el-input{
    width: 225px;
}
.code .el-button{
    position: absolute;
    top: 17.5px;
    right: 50px;
    color: #50E5C5;
    background: none;
    border: none;
    outline: none;
}
.count{
    color: gray;
}
.regist .el-button{
    width: 225px;
    height: 35px;
    margin: 0 auto;
    padding: 5px 0;
    display: block;
    background: #50E5C5;
    margin-top: 5px;
    color: white;
    border-radius: 20px;
    letter-spacing: .15em;
}
.regist .el-button:hover{
    background: #99ffcc;
}
.agreement{
    font-size: 0.3em;
    display: block;
}
.agreement .el-button{
    font-size: 0.3em;
    color: #50E5C5;
    background: none;
    border: none;
    outline: none;
}
.login{
    font-size: 0.3em;
    display: block;
}
.login .el-button{
    font-size: 0.3em;
    color: #50E5C5;
    background: none;
    border: none;
    outline: none;
}
</style>