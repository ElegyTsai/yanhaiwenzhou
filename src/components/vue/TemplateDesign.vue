<template>
    <div class="nangua">
        <div class="element a a-1 a-1-1"><span>主元素1</span></div>
        <div class="element a a-1 a-1-2"><span>主元素1</span></div>
        <div class="element a a-2 a-2-1"><span>主元素2</span></div>
        <div class="element a a-3 a-3-1"> <span>主元素3</span></div>
        <div class="element b b-1 b-1-1"><span>次元素1</span></div>
        <div class="element b b-2 b-2-1"><span>次元素2</span></div>
        <div class="element b b-2 b-2-2"><span>次元素2</span></div>
        <div class="element b b-2 b-2-3"><span>次元素2</span></div>
        <div class="element c c-1 c-1-1"> <span>辅助元素1</span></div>
        <div class="element c c-1 c-1-2"><span >辅助元素1</span></div>
        <!--<slot name="a-element-1-1"><span class="element a-1-1">主元素1</span></slot>
        <slot name="a-element-1-2"><span class="element a-1-2">主元素1</span></slot>
        <slot name='a-element-2-1'><span class="element a-2-1">主元素2</span></slot>
        <slot name='a-element-3-1'><span class="element a-3-1">主元素3</span></slot>
        <slot name='b-element-1-2'><span class="element b-1-1">次元素1</span></slot>
        <slot name='b-element-2-1'><span class="element b-2-1">次元素2</span></slot>
        <slot name='b-element-2-2'><span class="element b-2-2">次元素2</span></slot>
        <slot name='b-element-2-3'><span class="element b-2-3">次元素2</span></slot>
        <slot name='c-element-1-1'><span class="element c-1-1" >辅助元素1</span></slot>
        <slot name='c-element-1-2'><span class="element c-1-2" >辅助元素1</span></slot>-->
        <!--<slot name='d-element-1'><span class="d-element-1">底纹</span></slot>-->
    </div>
</template>
<script>
export default {
    data (){
      return {
          index: 0
      }  
    },
    mounted() {
        window.addTemplate = this.addTemplate
    },
    computed:{
        elementCount: function(){
            return this.$store.state.elementCount;
        },
        bgwidth: function(){
            return this.$store.state.bgwidth;
        }
    },
    methods: {
        //模板匹配函数
        addTemplate(url){
            if(this.index<this.elementCount){
                switch(this.index){
                case 0:
                    this.commonTemplate(url, 'a-1');
                    this.index++;
                    break;
                case 1:
                    this.commonTemplate(url, 'a-2');
                    this.index++;
                    break;
                case 2:
                    this.commonTemplate(url, 'a-3');
                    this.index++;
                    break;
                case 3:
                    this.commonTemplate(url, 'b-1');
                    this.index++;
                    break;
                case 4:
                    this.commonTemplate(url, 'b-2');
                    this.index++;
                    break;
                case 5:
                    this.commonTemplate(url, 'c-1');
                    this.index++;
                    break;
                }
            }else{
                alert('超出可选个数。');
            
            }
        },
        commonTemplate(url, className){
            var aNode  = document.getElementsByClassName(className);
            for(var i=0; i<aNode.length; i++){
                aNode[i].innerHTML='';
                //计算transform属性的值
                var st = window.getComputedStyle(aNode[i], null);
                var tr = st.getPropertyValue("-webkit-transform") ||
                            st.getPropertyValue("-moz-transform") ||
                            st.getPropertyValue("-ms-transform") ||
                            st.getPropertyValue("-o-transform") ||
                            st.getPropertyValue("transform") ||
                            "FAIL";
                //console.log('tr:',tr);
                var values = tr.split('(')[1].split(')')[0].split(',');
                var a = values[0];
                var b = values[1];
                var angle = Math.round(Math.atan2(b, a) * (180 / Math.PI));
                //console.log('Rotate: ' + angle + 'deg');
                var temp = {
                        left: aNode[i].offsetLeft,
                        top: aNode[i].offsetTop,
                        width: aNode[i].offsetWidth,
                        height: aNode[i].offsetHeight,
                        value: url,
                        active: false,
                        transform: angle,
                        visibility: 'visible',
                        zIndex: this.$store.state.zIndex,
                        outline: false
                    };
                this.$store.commit('addZIndex', this.$store.state.zIndex+1);
                selectObj(null, temp);
                //this.$store.commit('pushObj', temp);
                pushObj(temp);
                if(temp.left+temp.width>this.bgwidth){
                //console.log('outline:',item.left-bgwidth);
                //item.outline = true;
                //console.log('outline:', item.outline)
                //this.$store.commit('pushObj', obj);
                //console.log('component-zIndex:',temp.zIndex);
                if(temp.outline==false){
                  var temp2 = {
                    left: temp.left-this.bgwidth,
                    top: temp.top,
                    width: temp.width,
                    height: temp.height,
                    value: temp.value,
                    active: temp.active,
                    transform: temp.transform,
                    visibility: temp.visibility,
                    zIndex: temp.zIndex,
                    outline: true,
                    /*id: item.id,*/
                    oldLeft: temp.oldLeft - this.bgwidth,
                    oldTop: temp.oldTop
                  };
                  //var temp = Object.assign({}, item);
                  //temp.left = 10;
                  //console.log('item:', item);
                  //console.log('temp:',temp);
                  pushObj(temp2);
                  temp.outline=true;
                  //console.log('index',1);
                }
                
              }
                //console.log('store.objs:', this.$store.state.objs);
            }
        },
    }
}
</script>

<style scoped>
.nangua{
    /*border: 1px solid green;*/
    position: relative;
}
.nangua .element{
    border: 1px solid red;
    position: absolute;
}
.nangua .imgTem{
    max-width: 80px;
    max-height: 60px;
}
.nangua .a-1-1{
    left:140px;
    top:100px;
    width:120px;
    height:100px;
    transform: rotate(0deg);
}
.nangua .a-1-2{
    left:50px;
    top:650px;
    width:120px;
    height:100px;
    transform: rotate(0deg);
}
.nangua .a-2-1{
    left:100px;
    top:300px;
    transform: rotate(30deg);
    width:80px;
    height:80px;
}
.nangua .a-3-1{

    left:0px;
    top:500px;
    width:50px;
    height:50px;
    transform: rotate(0deg);
}
.nangua .b-1-1{

    left:30px;
    top:200px;
    transform: rotate(200deg);
    width:50px;
    height:50px;
}
.nangua .b-2-1{

    left:80px;
    top:25px;
    transform: rotate(45deg);
    width:40px;
    height: 40px;
}
.nangua .b-2-2{
    left:5px;
    top:350px;
    width:40px;
    height: 40px;
    transform: rotate(0deg);
}
.nangua .b-2-3{
    left:140px;
    top: 550px;
    transform: rotate(320deg);
    width:40px;
    height: 40px;
}
.nangua .c-1-1{
    left:100px;
    top:400px;
    transform: rotate(330deg);
    width:80px;
    height:40px;
}
.nangua .c-1-2{
    left:20px;
    top:-15px;
    transform: rotate(330deg);
    width:80px;
    height:40px;

}

</style>