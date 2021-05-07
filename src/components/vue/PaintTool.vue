<template>
    <div class="paintTool">
        <ul>
            <li v-for="(item, index) in paintTool" :key="index" @click="selectTool(index)">
                <el-tooltip class="item" effect="dark" :content="paintTool[index]" placement="right">
                    <img :src="require('@/assets/paintTool/'+paintTool[index]+'.png')" >
                </el-tooltip>
            </li>
        </ul>
    </div>
</template>
<script>
import paintTool from '../js/paintTool'
import {mapState} from 'vuex'
export default paintTool
</script>

<style>
.paintTool {
    position: absolute;
    width: 30px;
    top: 35px;
    border: 1px blue solid;
}

.paintTool ul{
    margin-block-start: 0em;
    margin-block-end: 0em;
    padding-inline-start: 5px;
    padding-inline-end: 5px;
}

.paintTool li{
    list-style-type: none;
    margin-top:5px ;
}
.paintTool li img{
    width: 25px;
    height: 25px;
}
</style>