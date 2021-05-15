<template>
    <div class='canvastool'>
        <span>{{title1}}</span>
        <div class="title">大小设置</div>
        <div class="item">
            <div class="key">宽度:</div>
            <div class="value">
                <!--<input type="number" v-model="selected.width" placeholder="宽度"/>-->
                <input type="number" v-model="bgwidth" placeholder="宽度"/>
                <span>px</span>
            </div>
        </div>
        <div class="item">
            <div class="key">高度:</div>
            <div class="value">
                <!--<input type="number" v-model="selected.height" placeholder="高度"/>-->
                <input type="number"  v-model="bgheight" placeholder="高度"/>
                <span>px</span>
            </div>
        </div>
        <div>
            <!--
            <span>{{title2}}</span>
            <div class="item">
                <div class="key">R:</div>
                <div class="value">
                <input type="number" v-model="selected.height" placeholder="高度"/>-->
                <!--    <input type="number"  v-model="r" placeholder="R"/>
                </div>
                <div class="key">G:</div>
                <div class="value">-->
                <!--<input type="number" v-model="selected.height" placeholder="高度"/>-->
                <!--    <input type="number"  v-model="rgba[1]" placeholder="G"/>
                </div>
                <div class="key">B:</div>
                <div class="value">
                <input type="number" v-model="selected.height" placeholder="高度"/>-->
                <!--    <input type="number"  v-model="rgba[2]" placeholder="B"/>
                </div>
            </div>
            <div class="item">
                <div class="key">透明度:</div>
                <div class="value">
                    <input type="number" v-model="rgba[3]" placeholder="a">
                </div>-->
                <el-color-picker v-model="bgcolor" size="mini" show-alpha></el-color-picker>
            </div>
            <div class="section special">
            <hr>
            <span id="toolName">Tool Name</span>
            
            </div>
            
            <div id="size" class="section size">
                <input class="slider" id="size-slider" type ="range" min ="1" max="20" step ="1" value ="1"/>
            </div>

            <div id="colorpaletteSection"  class="section colorpicker">
                <div id="colorpalette" class="colorpalette"></div>
            </div>
            <div id="colorpaletteFillSection" class="section colorpicker">
                <div id="colorpaletteFill" class="colorpalette"></div>
            </div>
        </div>
    </div>
    
</template>

<script>
export default {
    data () {
        return {
            title1: '画布设置',
            title2: '背景色',
            bgcolor: this.$store.state.bgcolor,
            bgwidth: this.$store.state.bgwidth,
            bgheight: this.$store.state.bgheight,
            
        }
    },
    
    watch: {
        bgcolor(val, oldval){
            this.$store.commit('changeBgColor', val);
        },
        bgwidth(val, oldval){
            this.$store.commit('changeBgWidth', val);
        },
        bgheight(val, oldval){
            this.$store.commit('changeBgHeight', val);
        },
        
    
    },
    computed: {  
        rgba: function(){
            var result = this.bgcolor.match(/\(([^)]*)\)/);
            //console.log('result:', result[1].split(','))
            return result[1].split(', ');
        },
        //r: rgba[0]
    }
}
</script>

<style>
.canvastool{
    text-align: center;
}
.canvastool .el-color-picker{
    left: 10px;
    top: 10px;
}
.canvastool{
    padding: 10px 0;
}
.canvastool .item{
    display: table;
    padding: 1px;
    width: 150px;
}
.canvastool .title{
    text-align: center;
    font-size:0.8em;
    padding-bottom: 5px;
}
.canvastool .item .key{
    display: table-cell;
    /*border: 1px solid red;*/
    text-align: right;
    font-size: 0.5em;
    width:40px;
}

.canvastool .item .value{
    display: table-cell;
    /*border: 1px solid red;*/
    width:80px;
}
.canvastool .item .value span{
    font-size:0.5em;
}
.canvastool .item .value input{
    width: 50px;

    margin-left: 5px;
}
</style>