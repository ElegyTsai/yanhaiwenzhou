<template>
  <div>
    <div class="imgTool" :class="show?'':'noshow'">
      <i class="el-icon-circle-close" @click="closeItem()"></i>
      <material></material>
    </div>
    <div class="imgCanvas" id="imgCanvas">
      <!--<utils></utils>-->
      <file-tool></file-tool>
      <paint-tool></paint-tool>
      <div class="paintCanvas">
        <obj class="obj" v-for="(obj, index) in objs" :key="obj+index" :obj="obj" @click.prevent.stop.native="selectObj($event, obj)" v-drag="{obj:obj}"></obj>
      </div>
    </div>
    
  </div>
</template>

<script>
import frame from '../js/frame'
export default frame
</script>

<style>
.imgTool {
  float: left;
  border: 1px solid red;
  /*width: 20%;*/
}
.imgCanvas {
  float: left;
  border: 1px solid green;
  width: calc(100% - 220px);
  min-height: 300px;
  height: calc(100vh - 0px);
  margin-left: 10px;
  position: relative;
  overflow: hidden;
}
.paintCanvas{
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
.obj{
  position: absolute;
}
.el-icon-circle-close{
  position: absolute;
  float: right;
}
.noshow{
  display: none;
}
</style>