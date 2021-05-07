<template>
  <div id="app">
    <div class="bar">
      <img class="logo" src="./assets/images/logo.png">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane v-for="item in options" :name="item.route" :key="item.route" :label="item.name">
        </el-tab-pane>
      </el-tabs>
      <span @click="register()">{{register_str}}</span><span @click="login()">{{login_str}}</span>
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

<style >
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
  margin-bottom: 20px;
}

.bar .el-tabs {
  display: inline-block;
  
}
.bar .el-tabs__item{
  color: white;
  font-size: 12px;
  margin-top: 10px;
  font-weight: bold;
  letter-spacing: 0.2em;
}
.bar .el-tabs__nav-wrap::after{
  background-color: black;
}
.bar .el-tabs__active-bar{
  position: relative;
  height: 4px;
}
.bar .el-tabs__active-bar.is-top{
  background:#53E4C7;
}
.bar .el-tabs__item.is-top.is-active{
    color:#53E4C7;
}
.content-wrap{
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
