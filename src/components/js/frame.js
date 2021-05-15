//var Utils = require('./utils')
import Material from '../vue/Material'
import PaintTool from '../vue/PaintTool'
import FileTool from '../vue/FileTool'
import Utils from '../vue/Utils'
import ImgTool from '../vue/ImgTool'
import LayerTool from '../vue/LayerTool'
import CanvasTool from '../vue/CanvasTool'
import TemplateDesign from '../vue/TemplateDesign'
export default {
  name: 'frame',
  components: {
    Material,
    PaintTool,
    FileTool,
    Utils,
    ImgTool,
    LayerTool,
    Sketchpad,
    CanvasTool,
    TemplateDesign
  },
  data () {
    return {
      //selected: {},
      //isSelected: false,
      /*objs: this.$store.state.objs, 
      selected: this.$store.state.selected,
      isSelected: this.$store.state.isSelected?true:false,*/
      show: true,
      category:['全部','家纺','服装','家居','广告传媒','印刷包装','文创设计','陶瓷设计'],
      configuration:['全部','散点构图','规矩构图','错行构图','组合构图','变形构图','底纹构图'],
      combination:['全部','单排','两两结合','三种相加','四种合成','五种结合'],
      activeIndex1: 0,
      activeIndex2: 0,
      activeIndex3: 0,
      dialogVisible1: false,
      dialogVisible2: false,
      dialogVisible3: false,
      //activeTemplate: false
    }
  },
  computed: {
    objs: function(){
      return this.$store.state.objs
    },
    selected: function(){
      return this.$store.state.selected
    },
    isSelected: function(){
      return this.$store.state.isSelected
    },
    bgcolor: function(){
      return this.$store.state.bgcolor
    },
    bgwidth: function(){
      return this.$store.state.bgwidth
    },
    bgheight: function(){
      return this.$store.state.bgheight
    },
    style: function(){
      return 'background:'+this.$store.state.bgcolor+";width:"+this.$store.state.bgwidth+'px;height:'+this.$store.state.bgheight+'px';
    },
    activeTemplate: function(){
      return this.$store.state.activeTemplate;
    }
  },
  mounted (){
    window.objs = this.objs,
    window.addObj = this.addObj,
    //window.addTemplate = this.addTemplate,
    window.initSketchpad = this.initSketchpad
  },
  methods: {
    selectTemplate(){
      //this.activeTemplate = true;
      this.$store.commit('changeActiveTemplate', true);
      //this.$store.commit('changeBgColor', val);
      this.$store.commit('changeBgWidth', 200);
      this.$store.commit('changeBgHeight', 800);
      this.$store.commit('changeElementCount', 6);
    },
    /*
    //模板匹配函数
    addTemplate(url, index){
      switch(index){
        case 0:
          this.commonTemplate(url, 'a-1');
          break;
        case 1:

      
        
      }
    },
    commonTemplate(url, className){
      //var aNode  = document.getElementsByClassName('element a a-1');
      var aNode  = document.getElementsByClassName(className);
      //aNode[0].removeChild(document.getElementById('test'));
      for(var i=0; i<aNode.length; i++){
        aNode[i].innerHTML='';
        var img = document.createElement("img");
        img.className = "imgTem";
        img.src = url;
        aNode[i].appendChild(img);
        console.log('aNode[i]', aNode[i]);
      }
    },*/
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done();
        })
        .catch(_ => {});
    },
    handleClick1(index){
      this.activeIndex1 = index;
      this.dialogVisible1 = true;
    },
    handleClick2(index){
      this.activeIndex2 = index;
      this.dialogVisible2 = true;
    },
    handleClick3(index){
      this.activeIndex3 = index;
      this.dialogVisible3 = true;
    },
    moveSelected(){
      //this.selected = [];
      //this.$store.commit('setSelected', null);
      this.selected.active = false;
      this.$store.commit('setIsSelected', false);
      //console.log('zhuiming-canvasclick')
    },
    selectObj (ev, obj) {
      //if(this.activeTemplate){
        //console.log('mubanpipei')
      //}else{
        this.objs.forEach(item => {
          item.active = false;
        });
        obj.active = true;
        var temp = [obj];
        this.objs.forEach(item => {
          if(item.zIndex==obj.zIndex){
            item.active = true;
            temp.push(item);
          }
        });
        if(ev){
          ev.preventDefault();
        }
        //this.selected = obj;
        //this.isSelected = true;
        //this.$store.commit('setSelected', obj);
        this.$store.commit('setSelected', temp);
        this.$store.commit('setIsSelected', true);//}
      //console.log('zhuiming-selectObj:', obj);
    },
    addObj (url, x, y) {
      x = x || 10;
      y = y || 10;
      var temp = {
        left: x,
        top: y,
        width: 100,
        height: 100,
        value: url,
        active: false,
        transform: 0,
        visibility: 'visible',
        zIndex: this.$store.state.zIndex
      };
      this.$store.commit('addZIndex', this.$store.state.zIndex+1);
      this.selectObj(null, temp);
      this.pushObj(temp);
      //console.log('zhuiming-addObj');
    },
    pushObj (obj) {
      //obj.id = this.getObjId();
      //this.objs.push(obj);
      this.$store.commit('pushObj', obj);
      //console.log('zhuiming-obj',obj)
    },
    /*
    getObjId(){
      return new Date().getTime() + "" + Math.floor(Math.random() * 89999 + 10000);
    },*/
    closeItem(){
      this.show = false;
      var div=document.getElementById('imgCanvas');
      div.style.width = '100%';
    },
    initSketchpad(){
      var sketchpadEl = document.getElementById("sketchpad");
      var sketchpad = new Sketchpad({
          containerEl: sketchpadEl,
          features: {
              displayCrosshair: false,
              displayGrid: false
          },
          createPageConfig: {
              /*no: 1,
              backgroundColor: "rgba(250,250,250,1)"*/
          }
      });

      var colorpalette = new Colorpalette({
        containerEl: document.getElementById("colorpalette")
      }).on("change", function (e) {
          sketchpad.getCurrentTool().setColor(e.color.red, e.color.green, e.color.blue, e.color.alpha);
      });
      window.colorpalette = colorpalette;

      /*var colorpaletteFill = new Colorpalette({
          containerEl: document.getElementById("colorpaletteFill")
      }).on("change", function (e) {
          sketchpad.getCurrentTool().setFillColor(e.color.red, e.color.green, e.color.blue, e.color.alpha);
      });
      window.colorpaletteFill = colorpaletteFill;*/

      //console.log('sketch-pad:', this.sketchpad)
      //return sketchpad;
      window.sketchpad = sketchpad;
    }
  }
}