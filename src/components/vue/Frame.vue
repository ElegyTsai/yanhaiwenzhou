<template>
  <div class="frame">
    <div class="materialTool" :class="show?'':'noshow'">
      <i class="el-icon-circle-close" @click="closeItem()"></i>
      <material></material>
    </div>
    <div class="imgCanvas" id="imgCanvas" @click="moveSelected()">
      <file-tool></file-tool>
      <paint-tool></paint-tool>
      <div class="paintCanvas">
        <sketchpad></sketchpad>
        <obj class="obj" v-for="(obj, index) in objs" :key="index" :obj="obj" @click.prevent.stop.native="selectObj($event, obj)" v-drag="{obj:obj}"></obj>
      </div>
    </div>
    <div class="imgTool" :class="{disable:!isSelected}">
      <img-tool></img-tool>
    </div>
    <div class="layerTool">
      <layer-tool></layer-tool>
    </div>
    
  </div>
</template>

<script>
import frame from '../js/frame'
export default frame
</script>

<style>
.frame .materialTool {
  float: left;
  border: 1px solid red;
  /*width: 20%;*/
}
.frame .imgTool{
  float: left;
  margin-left: 5px;
  width: 160px;
  border: black solid 1px;
}
.frame .layerTool{
  float: left;
  width: 160px;
  border: red solid 1px;
  margin-left: 5px;
  margin-top: 5px;
}
.frame .imgCanvas {
  float: left;
  border: 1px solid green;
  width: calc(100% - 390px);
  min-height: 300px;
  height: calc(100vh - 0px);
  margin-left: 10px;
  position: relative;
  overflow: hidden;
}
.frame .paintCanvas{
  overflow: hidden;
  position: relative;
  height: inherit;
  width: 100%;
  white-space: nowrap;
  left: 35px;
  top: 35px;
  margin: 0px;
  border: 1px solid black;
  background: rgb(211, 209, 209);
  
}
.frame .obj{
  position: absolute;
  z-index: 22;
}
.frame .image{
  width: 100%;
  height: 100%;
}
.frame .image img{
  width: 100%;
  height: 100%;
}
.frame .el-icon-circle-close{
  position: absolute;
  float: right;
}
.frame .materialTool .noshow{
  display: none;
}

.frame .disable{
  display: none;
}
/*resize css */
.frame .border{
    border: #4a98be 1px solid;
    position: absolute;
    left: 0px;
    right: 0px;
    top: 0px;
    bottom: 0px;
    display: none;
    /*z-index: 99;*/
}
.frame .active .direction , .active .border, .active .rotate{
  display: block;
}

.frame .direction {
  position: absolute;
  width: 5px;
  height: 5px;
  border: 1px #4a98be solid;
  background: #7fd6ff;
  display: none;
  z-index: 100;
}

.nw {left: -3px; top:-3px; z-index:110;cursor:nw-resize;}
.w {left:-3px; top:50%; cursor:w-resize;}
.ws {left: -3px; bottom: -3px; cursor:sw-resize;}
.s {left:50%; bottom:-3px; cursor:s-resize;}

.se {right:-3px; bottom:-3px; cursor:se-resize;}
.e {right:-3px; top:50%; cursor:e-resize;}
.ne {right:-3px; top:-3px; cursor:ne-resize;}

.n {top:-3px; left:50%; cursor:n-resize;}
.r {left:50%; top:50%; cursor:wait; background: black; z-index:120}
</style>