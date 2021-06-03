<template>
<!--元素设置页-->
    <div class="imgtool" >
        <div >
            <div class="pro-box">
                <div class="title">大小设置</div>
                <div class="item">
                    <div class="key">宽度:</div>
                    <div class="value">
                        <!--<input type="number" v-model="selected.width" placeholder="宽度"/>-->
                        <input type="number" v-model="selected.width" placeholder="宽度"/>
                        <span>px</span>
                    </div>
                </div>
                <div class="item">
                    <div class="key">高度:</div>
                    <div class="value">
                        <!--<input type="number" v-model="selected.height" placeholder="高度"/>-->
                        <input type="number" v-model="selected.height" placeholder="高度"/>
                        <span>px</span>
                    </div>
                </div>
            </div>
            <div class="pro-box">
                <div class="title">坐标设置</div>
                <div class="item">
                    <div class="key">X:</div>
                    <div class="value">
                        <!--<input type="number" v-model="selected.left"/>-->
                        <input v-model="selected.left" type="number"/>
                    </div>
                </div>
                <div class="item">
                    <div class="key">Y:</div>
                    <div class="value">
                        <!--<input type="number" v-model="selected.top"/>-->
                        <input v-model="selected.top" type="number"/>
                    </div>
                </div>
            </div>
            <div class="pro-box">
                <div class="title">旋转设置</div>
                <div class="item">
                    <div class="key">旋转:</div>
                    <div class="value">
                        <input v-model="selected.transform" type="number"/>
                        <span>度</span>
                    </div>
                </div>
            </div>
            <!--
            <div class="section special">
            <hr>
            <span id="toolName">Tool name</span>
            </div>
            
            <div id="size" class="section size">
                <input class="slider" id="size-slider" type ="range" min ="1" max="20" step ="1" value ="1"/>
            </div>

            <div id="colorpaletteSection"  class="section colorpicker">
                <div id="colorpalette" class="colorpalette"></div>
            </div>
            <div id="colorpaletteFillSection" class="section colorpicker">
                <div id="colorpaletteFill" class="colorpalette"></div>
            </div>-->
        </div>
    </div>
</template>
<script>
export default {
    data () {
        return{
            rotate: 0
        }
    },
    computed: {
        objs: function(){
            return this.$store.state.objs
        },
        isSelected: function(){
            return this.$store.state.isSelected
        },
        selected: function(){
            var temp = this.$store.state.selected;
            var minLeft = 1e9;
            var minTop = 1e9;
            var maxRight = 0;
            var maxBottom = 0;
            /*var nowchild = nowDom.getElementsByClassName('obj')[this.activeLi[i]];
            //console.log('zhuiming-nowchild:', nowchild.offsetWidth);
            //console.log('zhuiming-width:', nowchild.style.width,', height:', nowchild.style.height)
            minLeft = Math.min(nowchild.offsetLeft, minLeft);
            minTop = Math.min(nowchild.offsetTop, minTop);
            maxRight = Math.max(nowchild.offsetLeft+nowchild.offsetWidth, maxRight);
            maxBottom = Math.max(nowchild.offsetTop+ nowchild.offsetHeight, maxBottom);
            console.log('zhuiming-minLeft:', minLeft, ',minTop:', minTop);
            console.log('zhuiming-maxRight:', maxRight, ',maxBottom:', maxBottom);
            var childs = nowchild.childNodes;
            for(var j = childs.length - 1; j >= 1; j--) { 
                //alert(childs[i].nodeName); 
                nowchild.removeChild(childs[j]); 
            }*/
            for(var i=0; i<temp.length; i++){
                minLeft = Math.min(temp[i].left, minLeft);
                minTop = Math.min(temp[i].top, minTop);
                maxRight = Math.max(temp[i].left+temp[i].width, maxRight);
                maxBottom = Math.max(temp[i].top+ temp[i].height, maxBottom);
                //console.log('zhuiming-minLeft:', minLeft, ',minTop:', minTop);
            }
            var mergeObj = {
                left:minLeft,
                top:minTop,
                width:maxRight - minLeft,
                height:maxBottom - minTop,
                transform: 0
            }
            //return this.$store.state.selected
            return mergeObj;
        },
    },
    watch: {
        
    },
    methods: {
        
    }
}
</script>
<style scoped>
.pro-box{
    padding: 10px 0;
}
.pro-box .item{
    display: table;
    padding: 1px;
    width: 150px;
}
.pro-box .title{
    text-align: center;
    font-size:0.8em;
    padding-bottom: 5px;
}
.pro-box .item .key{
    display: table-cell;
    /*border: 1px solid red;*/
    text-align: right;
    font-size: 0.5em;
    width:40px;
}

.pro-box .item .value{
    display: table-cell;
    /*border: 1px solid red;*/
    width:80px;
}
.pro-box .item .value span{
    font-size:0.5em;
}
.pro-box .item .value input{
    width: 50px;
    margin-left: 5px;
}
.disable{
    display: none;
}
</style>