<template>
<!--画布页-->
  <div class="frame">
    <div class="materialTool" :class="show?'':'noshow'">
      <i class="el-icon-circle-close" @click="closeItem()"></i>
      <material></material>
    </div>
    <typography></typography>
    
    <div class="imgCanvas" id="imgCanvas" @click="removeSelected()">
      <file-tool></file-tool>
      <paint-tool></paint-tool>
      <div class="paintCanvas" id='sketchpad' :style="style" :width="bgwidth+'px'">
        <!--<template-design :class="{'noshow':!activeTemplate}"></template-design>-->
        <obj class="obj" v-for="(obj, index) in objs" :key="index" :obj="obj" 
              @click.prevent.stop.native="selectObj($event, obj)" 
              @contextmenu.prevent.stop.native="rightClick($event, obj)" 
              v-drag="{obj:obj, bgwidth:bgwidth}">
              
        </obj>
        <div id="objfun">
                <ul>
                  <li @click="liClick($event, 'replaceObj')"><span>替换当前元素</span></li>
                  <li @click="liClick($event, 'replaceObjAll')"><span>替换当前元素所有相同元素</span></li>
                  <li @click="liClick($event, 'colorMatch')">配色<span></span></li>
                  <li @click="liClick($event, 'deleteObj')"><span>删除当前元素</span></li>
                </ul>
              </div>
      </div>
    </div>
    <div class="canvasTool">
      <canvas-tool></canvas-tool>
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

<style scoped>

.frame .canvasTool{
  float:left;
  width: 220px;
  margin-left: 5px;
  border:solid 1px blue;
}
.frame #sketchpad{
  background-color: white;
}
.frame .materialTool {
  float: left;
  border: 1px solid red;
  width: 200px;
  height: 100%;
  /*width: 20%;*/
}
.frame .imgTool{
  float: left;
  margin-left: 5px;
  width: 220px;
  border: black solid 1px;
}
.frame .layerTool{
  float: left;
  width: 220px;
  border: red solid 1px;
  margin-left: 5px;
  margin-top: 5px;
}
.frame .imgCanvas {
  float: left;
  border: 1px solid green;
  width: calc(100% - 450px);
  min-height: 300px;
  height: calc(100vh - 0px);
  margin-left: 10px;
  position: relative;
  overflow:auto;
}
.frame .paintCanvas{
  overflow: hidden;
  position: relative;
  height: inherit;
  width: 95%;
  white-space: nowrap;
  left: 35px;
  top: 35px;
  margin: 0px;
  border: 1px solid black;
  background: rgb(22, 22, 22);
  
}
.frame .paintCanvas #objfun{
  position: relative;
  display: none;
  z-index: 100;
  
}
.frame .paintCanvas #objfun ul{
  list-style-type: none;
  background: white;
  width: 250px;
}
.frame .paintCanvas #objfun ul li{
  padding: .2em;
  border-bottom:1px solid black ;
}
.frame .paintCanvas .noshow{
  display: none;
}
.frame >>> .obj{
  position: absolute;
  /*z-index: 22;*/
}
.frame >>> .image{
  width: 100%;
  height: 100%;
}
.frame >>> .image img{
  width: 100%;
  height: 100%;
}
.frame >>> .el-icon-circle-close{
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
.frame >>> .border{
    border: #4a98be 1px solid !important ;
    z-index: 20;
    position: absolute;
    left: 0px;
    right: 0px;
    top: 0px;
    bottom: 0px;
    display: none;
    /*z-index: 99;*/
}
.frame >>> .active .direction , .frame >>> .active .border, .frame >>> .active .rotate{
  display: block;
}

.frame >>> .direction {
  position: absolute;
  width: 5px;
  height: 5px;
  border: 1px #4a98be solid;
  background: #7fd6ff;
  display: none;
  /*z-index: 100;*/
}

.frame >>> .nw {left: -3px; top:-3px; cursor:nw-resize;}
.frame >>> .w {left:-3px; top:50%; cursor:w-resize;}
.frame >>> .ws {left: -3px; bottom: -3px; cursor:sw-resize;}
.frame >>> .s {left:50%; bottom:-3px; cursor:s-resize;}

.frame >>> .se {right:-3px; bottom:-3px; cursor:se-resize;}
.frame >>> .e {right:-3px; top:50%; cursor:e-resize;}
.frame >>> .ne {right:-3px; top:-3px; cursor:ne-resize;}

.frame >>> .n {top:-3px; left:50%; cursor:n-resize;}
.frame >>> .r {left:50%; top:50%; cursor:wait;}
</style>