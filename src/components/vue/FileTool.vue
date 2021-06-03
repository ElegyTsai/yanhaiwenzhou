<template>
<!--文件工具栏-->
    <div class="fileTool">
        <ul>
            <li v-for="(item, index) in fileTool" :key="index" @click="handleClick(item)">
                <el-tooltip class="item" effect="dark" :content="fileTool[index]" placement="bottom">
                    <img :src="require('@/assets/fileTool/'+fileTool[index]+'.png')" >
                </el-tooltip>
            </li>
        </ul>
    </div>
</template>

<script>
import fileTool from '../js/fileTool'
export default fileTool
</script>

<style scoped>
.fileTool {
    position: absolute;
    left: 35px;
    height: 30px;
    border: 1px solid purple;
}
.fileTool ul {
    margin-block-start: 0em;
    margin-block-end: 0em;
    padding-inline-start: 0px;
}
.fileTool ul li{
    float: left;
    list-style-type: none;
    margin-left: 10px;
}
.fileTool li img{
    width: 25px;
    height: 25px;
}
</style>