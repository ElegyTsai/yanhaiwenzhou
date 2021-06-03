<template>
<!--sketchpad栏-->
    <div class="paintTool">
        <div class="section drawing">
          <div id="tool-pen" @click="selectTool('pen')" class="button"><i class="fa fa-pencil" aria-hidden="true"></i></div>
          <div id="tool-highlighter" @click="selectTool('highlighter')" class="button"><i class="fa fa-paint-brush" aria-hidden="true"></i></div>
          <div id="tool-rainbow" @click="selectTool('rainbow')" class="button rbw"><i class="fa fa-magic" aria-hidden="true"></i></div>
          <div id="tool-mandala" @click="selectTool('mandala')"  class="button mandala"><i class="fa fa-snowflake-o" aria-hidden="true"></i></div>
        </div>
        <div class="section drawing">
          <div id="tool-line" @click="selectTool('line')" class="button line">╱</div>
          <div id="tool-rectangle" @click="selectTool('rectangle')" class="button rect"><i class="fa fa-square-o" aria-hidden="true"></i></div>
          <div id="tool-circle" @click="selectTool('circle')" class="button circ"><i class="fa fa-circle-thin" aria-hidden="true"></i></div>
          <div id="tool-type" @click="selectTool('type')" class="button font"><i class="fa fa-font" aria-hidden="true"></i></div>
        </div>
        <div class="section rubber">
            <div id="tool-eraser" @click="selectTool('eraser')" class="button"><i class="fa fa-eraser" aria-hidden="true"></i></div>
            <div id="tool-cutout" @click="selectTool('cutout')" class="button"><i class="fa fa-scissors" aria-hidden="true"></i></div>
        </div>
        <div class="section special">
            <div id="tool-rotate-viewport" @click="selectTool('rotate-viewport')" class="button rotate-viewport"><i class="fa fa-circle-o-notch" aria-hidden="true"></i></div>
            <div id="tool-move-viewport" @click="selectTool('move-viewport')" class="button move-viewport"><i class="fa fa-hand-paper-o" aria-hidden="true"></i></div>
        </div>
        <div class="section special">
            <div id="tool-zoom-out" @click="selectTool('zoom-out')" class="button"><i class="fa fa-search-minus" aria-hidden="true"></i></div>
            <div id="tool-zoom-1" @click="selectTool('zoom-1')" class="button"><i class="fa fa-home" aria-hidden="true"></i></div>
            <div id="tool-zoom-in" @click="selectTool('zoom-in')"  class="button"><i class="fa fa-search-plus" aria-hidden="true"></i></div>
        </div>
        <div class="section special">
            <!--<div id="tool-fast-undo" @click="selectTool('fast-undo')" class="button f-backward"><i class="fa fa-fast-backward" aria-hidden="true"></i></div>-->
            <div id="tool-undo" @click="selectTool('undo')" class="button undo"><i class="fa fa-backward" aria-hidden="true"></i></div>
            <div id="tool-redo" @click="selectTool('redo')" class="button redo"><i class="fa fa-forward" aria-hidden="true"></i></div>
            <!--<div id="tool-fast-redo" @click="selectTool('fast-redo')" class="button f-forward"><i class="fa fa-fast-forward" aria-hidden="true"></i></div>-->
        </div>
        
        <!--
        <ul>
            <li v-for="(item, index) in paintTool" :key="index" @click="selectTool(item)">
                <el-tooltip class="item" effect="dark" :content="paintTool[index]" placement="right">
                    <img :src="require('@/assets/paintTool/'+paintTool[index]+'.png')" >
                </el-tooltip>
            </li>
        </ul>-->
    </div>
</template>

<script src="http://cdn.sketchpad.pro/dist/current/sketchpad.min.js"></script>
<script>
import paintTool from '../js/paintTool'
export default paintTool
</script>

<style scoped>
.paintTool {
    position: absolute;
    top: 35px;
    border: 1px blue solid;
}
.paintTool .section{
    border: 1px solie black;
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
.paintTool {
  width: 32px;
  min-width: 32px;
  background-color: #fafafa;
  text-align: center;
  display: inline-block;
}
.paintTool .section {
  clear:both;
  margin-bottom: 8px;
}
.paintTool .slider {
  width: 100%;
}

.paintTool .button {
  /*float: left;*/
  width: 32px;
  height: 32px;
  line-height: 32px;
  cursor: pointer;
  text-align: center;
}

.paintTool .button.active {
  background-color: rgba(0, 0, 0, .5);
  color: rgba(255, 255, 255, 1);
}

.paintTool .colorpalette{
    border: 1px solid green;
    z-index:2000;
}
</style>