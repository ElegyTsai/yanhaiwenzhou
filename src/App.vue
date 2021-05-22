<template>
  <div id="app">
    <div class="bar">
      <img class="logo" src="./assets/images/logo.png">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane v-for="item in options" :name="item.route" :key="item.route" :label="item.name">
        </el-tab-pane>
      </el-tabs>
      <span :class="{'noshow':username}" @click="register()">{{register_str}}</span>
      <span :class="{'noshow':username}" @click="login()">{{login_str}}</span>
      <span :class="{'noshow':!username}" @click="userSelection()">{{username}}</span>
    </div>
    <div class="content-wrap">
      <router-view/>
    </div>
  </div>
</template>

<script>
export default {
  name: 'App',
  data(){
    return{
      options:[
        {
                route:'/',
                name:"首页"
            },
            {
                route:'typography',
                name:'智能排版'
            },
            {
                route:'color',
                name:'智能配色'
            },
            {
                route:'create',
                name:'AI元素创作'
            },
            {
                route:'library',
                name:'素材库'
            },
            {
                route:'application',
                name:'应用模板'
            },
            {
                route:'shopping',
                name:'购买中心'
            }
      ],
      activeName:'/',
      register_str:'注册',
      login_str:'登录'
    }
  },
  computed: {
    username: function(){
      return this.$store.getters.getToken;
    }
  },
  methods:{
    handleClick(tab, event) {
      //console.log(tab, event);
      let path = this.activeName
      //console.log('zhuiming-activenmae:'+path)
      this.$router.push({path:path})
    },
    register(){
      this.$router.push('./register')
    },
    login(){
      this.$router.push('./login')
    },
    userSelection(){
      this.$confirm('您确定退出登录?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$store.commit('setToken','');
          this.$message({
            type: 'success',
            message: '退出登录!'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消'
          });          
        });
    }
  },
  /*
  watch:{
    '$route'(to){
      //console.log('zhuiming-to.ptah:'+to.path)
    }
  }*/
}
</script>

<style scoped>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /*text-align: center;*/
  color: #2c3e50;
  height: 100%;
  width: 100%;
  position: absolute;
}
.bar{
  background-color: black;
  margin: 0px;
  height: 70px;
  padding-left: 50px;
  padding-bottom: 10px;

}
.bar span{
  float: right;
  color:white;
  font-size:12px;
  padding-right: 60px;
  line-height: 70px;
}
.logo{
  display: inline-block;
  max-width: 100px;
  margin-right: 50px;
  margin-bottom: 60px;
}

.bar >>> .el-tabs {
  display: inline-block;
  
}
.bar >>> .el-tabs__item{
  color: white;
  font-size: 12px;
  margin-top: 10px;
  font-weight: bold;
  letter-spacing: 0.2em;
}
.bar >>> .el-tabs__nav-wrap::after{
  background-color: black;
}
.bar .noshow{
  display: none;
}
.bar >>> .el-tabs__active-bar{
  position: relative;
  height: 4px;
}
.bar >>> .el-tabs__active-bar.is-top{
  background:#53E4C7;
}
.bar >>> .el-tabs__item.is-top.is-active{
    color:#53E4C7;
}
.content-wrap{
  height: 100%;
  margin: 0px;
  padding: 0px;
}
</style>


<!-- old
<template>
  <div id="app">
    <frame></frame>
  </div>
</template>

<script>
import Frame from './components/vue/Frame'

export default {
  name: 'App',
  components: {
    Frame
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /*text-align: center;*/
  color: #2c3e50;
  /*margin-top: 60px;*/
}
</style>-->
