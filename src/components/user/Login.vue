<template>
    <div class="loginPage">
        <section>
            <img src="@/assets/images/login/logo.png">
            <hr/>
        </section>
        <div class="data">
            <div class='tab'>
                <img class="info" src="@/assets/images/login/head.png">
                <div class="info">
                    <h1>{{msg1}}</h1>
                    <el-tabs v-model="activeName" >
                        <el-tab-pane v-for="item in items"  @tab-click="handleClick(item.name)" :key="item.id" :name="item.name" :label="item.msg">
                            <div class="phone_login" :class="activeName==='phone'?'show':'noshow'">
                                <el-input v-model="loginForm.phonenumber" placeholder="请输入手机号"/>
                                <el-input v-model="loginForm.vertificationcode" placeholder="请输入验证码"/> 
                            </div>
                            <div class="account_login" :class="activeName==='account'?'show':'noshow'">
                                <el-input v-model="loginForm.username" placeholder="请输入用户名"/>
                                <el-input v-model="loginForm.password" placeholder="请输入密码"/>
                            </div>
                            <el-button @click="login">{{msg2}}</el-button>
                        </el-tab-pane>
                    </el-tabs>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name:'loginPage',
    data(){
        return{
            msg1:'砚海文舟工业图案设计服务平台',
            activeName:'phone',
            items:[
                {name:'phone',
                 msg:'手机号登录'
                },
                {name:'account',
                msg:'账号登录'
                }
            ],
            msg2:'登录',
            loginForm:{
                username: '',
                phonenumber:'',
                password:'',
                vertificationcode: ''
            }
        }
    },
    methods:{
        handleClick(itemname){
            this.activeName = itemname;
        },
        login(){
            if(this.activeName==='phone'){
                //手机号登录（手机号和验证码）
                console.log('this.loginform.vc:',this.loginForm.vertificationcode)
                if(!this.loginForm.phonenumber){
                    alert('手机号不能为空');
                }else if(this.loginForm.phonenumber.length!=11){
                    alert('手机号不符合格式');
                }else if(!this.loginForm.vertificationcode){
                    alert('验证码不能为空');
                }else{
                    
                  this.$http({
                    method:'post',
                    url:'http://localhost:8080/api/login/querybytele',
                    //url:"http://localhost:8080/api/login/querybytele?telephone=1&vertification=a",
                    params:{
                        telephone:this.loginForm.phonenumber.trim(),
                        vertification: this.loginForm.vertificationcode.trim()
                    }
                  }).then((res)=>{
                      //console.log('res is ', res.status);
                      console.log('res is ', res);
                      if(res.status===200){
                        //新注册
                        alert('登录成功');
                        this.$store.commit('setToken', res.data.username);
                        //this.$router.push('/');
                      }else{
                          console.log('regis fail')
                      }
                    
                });
                }

            }else{
                //账号登录（账号和密码）
                if(!this.loginForm.username){
                    alert('用户名不能为空');
                }else if(!this.loginForm.password){
                    alert('密码不能为空')
                }else{
                    console.log(this.loginForm.username);
                    console.log(this.loginForm.password)
                  this.$http({
                    method:'post',
                    url:'http://localhost:8080/api/login/querybyusername',
                    //url:"http://localhost:8080/api/login/querybytele?telephone=1&vertification=a",
                    params:{
                        username:this.loginForm.username.trim(),
                        password: this.loginForm.password.trim()
                    }
                  }).then((res)=>{
                      //console.log('res is ', res.status);
                      console.log('res is ', res);
                      if(res.status===200){
                        //新注册
                        alert('登录成功');
                        this.$store.commit('setToken', res.data.username);
                        this.$router.push('/');
                      }else{
                          console.log('regis fail')
                      }
                    
                   });
                }
              
            }

            //let _this = this;

            /*if(this.loginForm.phonenumber==='' || this.loginForm.password===''){
                alert('手机号或密码不能为空');
            }else{
                this.axios({
                    method:'get',
                    url:'/api/test.txt',
                    data:_this.loginForm
                }).then(res=>{
                    console.log(res.data);
                    _this.userToken = 'zhuiming'+res.data.data.body.token;
                    //将用户token保存到vuex中
                    _this.changeLogin({Authorization: _this.userToken})
                    _this.$router.push('/');
                    alert('登录成功');
                }).catch(error=>{
                    alert('账号或密码错误');
                    console.log(error);
                })
            }*/
        }
    }
}
</script>
<style scoped>
*{
    margin: 0;
    padding:0;
}
.loginPage{
    display: flex;
    background: #E7F0FF;
    position: relative;
    flex-direction:column;
    height: 100%;
    width: 100%;
    box-sizing: border-box;
    align-items: stretch;
}
.loginPage section{
    text-align: left;
    height: 80px;
    flex: 0 1 auto;
   /* border: 1px solid black;*/
}

.loginPage .data{
    /*border: 1px solid red;*/
    clear: both;
    margin-top:100px;
    flex: 1 1 auto;
    -webkit-flex: 1 1 auto; 
    text-align: center;
    left:25%;
}
.loginPage .data .tab{
    position: relative;
    left: 25%;
    width: 50%;
    height: 400px;
    display: flex;
    background: white;
    border-radius: 10px;
}
.loginPage .data .tab .info{
    margin-top: 50px;
}
.loginPage .data .tab .info .show{
    display: block;
}
.loginPage .data .tab .info .noshow{
    display: none;
}
.loginPage section img{
    position: relative;
    max-width:200px;
    left:100px;
    top:10px;
    
}
.loginPage .data img{
    max-height: 300px;
}


.loginPage .data h1{
    font-weight: normal;
    font-size: 1.2em;
    padding: 10px;
}

.loginPage .data >>> .el-tabs{
    display:inline-block;
}
.loginPage .data >>> .el-tabs__nav-wrap::after{
    width: 0;
}
.loginPage .data >>> .el-input{
    width: 200px;
    margin: 0 auto;
    
    padding:10px 0;
    display: block;
}
.loginPage .data  >>> .el-input__inner{
    border-radius: 20px;
    text-indent: 10px;
}


</style>