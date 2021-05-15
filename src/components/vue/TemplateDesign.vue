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
        },
    }
}
</script>

<style>
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
}
.nangua .a-1-2{
    left:50px;
    top:650px;
}
.nangua .a-2-1{
    left:100px;
    top:300px;
    transform: rotate(30deg);
}
.nangua .a-3-1{

    left:0px;
    top:500px;
}
.nangua .b-1-1{

    left:30px;
    top:200px;
    transform: rotate(200deg);
}
.nangua .b-2-1{

    left:80px;
    top:25px;
    transform: rotate(45deg);
}
.nangua .b-2-2{
    left:5px;
    top:350px;
}
.nangua .b-2-3{
    left:140px;
    top: 550px;
    transform: rotate(320deg);
}
.nangua .c-1-1{
    left:100px;
    top:400px;
    transform: rotate(330deg);
}
.nangua .c-1-2{
    left:20px;
    top:-15px;
    transform: rotate(330deg);
}

</style>