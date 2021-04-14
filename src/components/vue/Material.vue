<template>
    <div class="imgMaterial">
        <img v-for="(item, index) in imgTool" :key="index" :src="item.url" @click="tAddObj(item.url)">
    </div>
</template>

<script>
import material from '../js/material'
export default material
</script>

<style>
.imgMaterial{
    width: 200px;
}
.imgMaterial img{
    width: 80px;
    height: 100px;
    margin-left: 15px;
}
</style>