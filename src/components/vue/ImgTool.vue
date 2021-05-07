<template>
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
            return this.$store.state.selected
        },
    },
    watch: {
        
    },
    methods: {
        
    }
}
</script>
<style>
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