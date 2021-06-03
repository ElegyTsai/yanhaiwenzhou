<template>
<!--素材栏-->
    <div class="imgMaterial">
        
        <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="云素材" name="cloudMaterial">
                <el-input
                    placeholder="请输入内容"
                    prefix-icon="el-icon-search"
                    v-model="cloudMaterialCategory">
                </el-input>
                <div class="content">
                    <span v-for="(item, index) in cloudMaterialOptions" :key="index" @click="selectCategory(item.ename)">
                        {{item.cname}}
                    </span>
                </div>
                
                 <div class="sidebar">
                    <el-menu default-active="1"  class="el-menu-vertical-demo" :collapse="true" :class="closeSidebar?'noshow':'show'">
                        <el-menu-item  index="1" @click="handleSelection(1)">
                            <i class="el-icon-menu"></i>
                            <span slot="title">素材库</span>
                        </el-menu-item >
                        <el-menu-item index="2" @click="handleSelection(2)">
                            <i class="el-icon-location"></i>
                            <span slot="title">最近使用</span>
                        </el-menu-item>
                        <el-menu-item index="3" @click="handleSelection(3)">
                            <i class="el-icon-document"></i>
                            <span slot="title">导航三</span>
                        </el-menu-item>
                        <el-menu-item index="4" @click="handleSelection(4)">
                            <i class="el-icon-setting"></i>
                            <span slot="title">导航四</span>
                        </el-menu-item>
                        <i class="el-icon-arrow-left" @click="close"></i>
                    </el-menu>
                    <i class="el-icon-arrow-right" :class="closeSidebar?'show':'noshow'" @click="open"></i>
                </div>
                <div class="materialArea" :class="currentSelection===1?'show':'noshow'">
                    <img v-for="(item, index) in imgMaterial" :key="index" :src="item.url" @click="tAddObj(item.url)">
                 </div> 
                <div class="recentUse" :class="currentSelection===2?'show':'noshow'">
                    <h6>最近使用</h6>
                    <div>
                        <img v-for="(item, index) in usedRecently" :key="index" :src="item.url" @click="tAddObj(item.url)">
                    </div>

                </div> 
            </el-tab-pane>
            <el-tab-pane label="本地素材" name="localMaterial">
                
            </el-tab-pane>
        </el-tabs>
        
        <!--<el-select 
            v-model="value" 
            filterable
            remote
            reserve-keyword
            :remote-method="requestMaterial(value)"
            :loading="loading"
            placeholder="请选择">
            <el-option
            v-for="item in options"
            :key="item.category"
            :label="item.name"
            :value="item.category">
            </el-option>
        </el-select>-->
        
    </div>
</template>

<script>
import material from '../js/material'
export default material
</script>

<style scoped>
.imgMaterial{
    width: 210px;
    position: relative;
    
}
.imgMaterial .noshow{
    display: none;
}
.imgMaterial .show{
    display: block;
}
.imgMaterial img{
    width: 80px;
    height: 100px;
    margin-left: 15px;
}
.imgMaterial >>> .el-tabs__header {
    left: 15%;
    width:160px;
}

.imgMaterial >>> .el-tabs__nav-wrap::after{
    width:0%;
}
.imgMaterial >>> .el-input__inner {
    width:90%;
    height: 30px;
    line-height: 30px;
    margin-left: 8px;
}
.imgMaterial >>> .el-input__icon{
    line-height: 30px;
}

.imgMaterial .content{
    padding: 20px;
    display: grid;
    grid-template-columns: repeat(3, 60px);
    grid-template-rows: repeat(6, 30px);
}
.imgMaterial >>> .el-tabs__content{
    height: 800px;
}
.imgMaterial >>> .el-menu {
    position: absolute;
    left: 0px;
    top: 350px;
}
.imgMaterial >>> .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
  }
.imgMaterial >>> .el-icon-arrow-left{
    position: absolute;
    left:80%;
    top:50%;
}
.imgMaterial >>> .el-icon-arrow-right{
    position: absolute;
    left:0px;
    top:450px;
}
.imgMaterial .materialArea{

    /*height: 400px;*/

}
.imgMaterial .recentUse{
    text-align: center;
}
</style>