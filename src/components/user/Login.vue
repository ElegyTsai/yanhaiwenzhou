<template>
    <div class="loginPage">
        <section>
            <img src="@/assets/images/login/logo.png">
            <hr/>
        </section>
        <div>
           <!-- <img src="@/assets/images/login/head.png">-->
            <div class="data">
                <h1>{{msg1}}</h1>
                <el-tabs v-model="activeName" @tab-click="handleClick">
                    <el-tab-pane v-for="item in items" :key="item.id" :name="item.name" :label="item.msg">
                        <div class="photo_login">
                            <el-input v-model="loginForm.phonenumber" placeholder="请输入手机号"/>
                            <el-input v-model="loginForm.password" placeholder="请输入密码"/>
                            <el-button @click="login">{{msg2}}</el-button>
                        </div>
                        <div class="account_login">
                        </div>
                    </el-tab-pane>
                </el-tabs>
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
                phonenumber:'',
                password:''
            }
        }
    },
    methods:{
        handleClick(){

        },
        login(){
            let _this = this;
            if(this.loginForm.phonenumber==='' || this.loginForm.password===''){
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
            }
        }
    }
}
</script>
<style >
*{
    margin: 0;
    padding:0;
}
.loginPage{
    background: #E7F0FF;
}
.loginPage section{
    text-align: left;
}
.loginPage section img{
    max-width:200px;
    padding-left: 150px;
    
}

.loginPage>div{
    clear: both;
    background: white;

    margin:200px auto;
}
.loginPage div img{
    max-width: 300px;
}
.data h1{
    font-weight: normal;
    font-size: 1.2em;
    padding: 10px;
}
.data{
    text-align: center;
    height: 200px;
}
.data .el-tabs{
    display:inline-block;
}
.data .el-tabs__nav-wrap::after{
    width: 0;
}
.data .el-input{
    width: 200px;
    margin: 0 auto;
    padding:10px 0;
    display: block;
}

</style>