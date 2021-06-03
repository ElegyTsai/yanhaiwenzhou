//画布上的操作函数
import Material from '../vue/Material'
import PaintTool from '../vue/PaintTool'
import FileTool from '../vue/FileTool'
import ImgTool from '../vue/ImgTool'
import LayerTool from '../vue/LayerTool'
import CanvasTool from '../vue/CanvasTool'
import Typography from '../vue/Typography'
export default {
  name: 'frame',
  components: {
    Material,
    PaintTool,
    FileTool,
    ImgTool,
    LayerTool,
    Sketchpad,
    CanvasTool,
    Typography
  },
  data () {
    return {
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
    }
  },
  computed: {
    objs: function(){
      //将objs挂载到window对象上以便component.js中使用
      window.objs = this.$store.state.objs;
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
    },
    zIndex: function (){
      return this.$store.state.zIndex;
    }
  },
  mounted (){
    window.objs = this.objs,
    window.addObj = this.addObj,
    window.pushObj = this.pushObj,
    window.selectObj = this.selectObj,
    window.initSketchpad = this.initSketchpad,

    //监听是否点击在元素右键列表区域
    window.addEventListener('mousedown', ev=>{
    var e = ev || window.event;
        var elem = e.target;
        var targetArea = document.getElementById('objfun');
        if(targetArea && !targetArea.contains(elem)){
         targetArea.style.display = 'none';
        }
    })
  },
  methods: {
    //元素上点击右键显示操作列表
    rightClick(ev, obj){
      var res = document.getElementById('objfun'); 
      res.style.top = obj.top + ev.offsetY + 'px';
      res.style.left = obj.left + ev.offsetX + 'px';
      res.style.display = 'block';
      ev.stopPropagation();
    },
    //元素右键列表函数，此处只是改变clickStatus的状态，以便material.js中元素点击时调用相应的函数
    //页面效果还需改进
    liClick(ev, clickStatus){
      ev.stopPropagation();
      document.getElementById('objfun').style.display='none';
      this.$store.commit('changeClickStatus', clickStatus);
      switch (clickStatus){
        //替换一个元素
        case 'replaceObj':
          this.$notify({
            title: '提示',
            message: '请在素材栏选择替换素材'
          });
          break;
        //替换一类元素
        case 'replaceObjAll':
          this.$notify({
            title: '提示',
            message: '请在素材栏选择替换素材，您所选的元素将替换本类所有元素'
          });
          break;
        //配色
        case 'colorMatch':
          this.$notify({
            title: '提示',
            message: '请选择配色参考图'
          });
          break;
        //删除
        case 'deleteObj':
          this.$confirm('确认删除?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            for(var i=0; i<this.selected.length; i++){
              var index = this.objs.indexOf(this.selected[i]); 
              if(index!=-1){
                this.objs.splice(index, 1);
                this.$message({
                  type: 'success',
                  message: '删除成功!'
                });
              }
            }
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消删除'
            });          
          });
          break;
        default:
          alert('暂不支持该选项');
      }
    },
    //点击画布，所有元素都未被选中
    removeSelected(){
      this.$store.commit('setIsSelected', false);
      this.$store.commit('setSelected', []);
      this.objs.forEach(item => {
          item.active = false;
      });
    },
    //选中元素
    selectObj (ev, obj) {
        this.objs.forEach(item => {
          item.active = false;
        });
        obj.active = true;
        var temp = [obj];
        this.objs.forEach(item => {
          if(item.zIndex==obj.zIndex && item!=obj){
            item.active = true;
            temp.push(item);
          }
        });
        if(ev){
          ev.preventDefault();
        }
        this.$store.commit('setSelected', temp);
        this.$store.commit('setIsSelected', true);
    },
    //添加元素
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
        zIndex: this.zIndex,
        outline: false,
      };
      
      this.$store.commit('addZIndex', this.$store.state.zIndex+1);//添加元素时默认新建一个图层
      this.selectObj(null, temp); //添加时默认选中
      this.pushObj(temp);
    },
    pushObj (obj) {
      this.$store.commit('pushObj', obj);
    },
    /*//暂时未用
    getObjId(){
      return new Date().getTime() + "" + Math.floor(Math.random() * 89999 + 10000);
    },*/
    //关闭素材栏
    closeItem(){
      this.show = false;
      var div=document.getElementById('imgCanvas');
      div.style.width = '100%';
    },
    //初始化画板
    //参考https://github.com/cojapacze/sketchpad
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