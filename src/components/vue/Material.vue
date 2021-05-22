<template>
    <div class="imgMaterial">
        <el-select 
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
        </el-select>
        <img v-for="(item, index) in imgTool" :key="index" :src="item.url" @click="tAddObj(item.url)">
    </div>
</template>

<script>
import material from '../js/material'
export default material
</script>

<style scoped>
.imgMaterial{
    width: 200px;
}
.imgMaterial img{
    width: 80px;
    height: 100px;
    margin-left: 15px;
}
</style>