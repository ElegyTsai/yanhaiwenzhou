<template>
    <div class="layertool">
        <div class="title">{{title}}</div>
        
        <div class="layer" id='layer'>
            <ul>
                <li :class="{'selected':activeLi.indexOf(index)>-1}" class="layeritem" v-for="(item, index) in layers" :key="index" @contextmenu.prevent.stop="rightClick(item,$event)" @click.prevent="pinSelect($event, index)" ref="list">
                    <i class="el-icon-view" @click="handleClick(index)"></i>
                    <img :src="item.value"/>
                    <span>图层{{index}}</span>
                </li>
            </ul>
        </div>
        <div id="layerfun">
            <ul>
                <li @click="mergeLayer()"><span>合并图层</span></li>
                <li @clicek="deleteLayer()"><span>删除图层</span></li>
            </ul>
        </div>
    </div>
</template>

<script>
export default {
    data () {
        return {
            title: '图层',
            isVisible: true.objs,
            pin: false,//shift键是否被按下
            ctrl: false, //ctrl是否被按下
            origin: -1, //记录按下的起始点
            activeLi: [],
            rClick: false,
        }
    },
    computed: {
        layers: function (){
            return this.$store.state.objs;
        }
    },
    mounted() {
        window.addEventListener('keydown', code=>{
            if(code.keyCode==16 || code.shiftKey){
                console.log('shift is down')
                //判断按下shift键
                this.pin = true;
            }else if (code.ctrlKey){
                code.preventDefault()
                console.log('ctrl is down')
                this.ctrl = true;
                
            }
        });
        window.addEventListener('keyup', code=>{
            //console.log('shift is up')
            if(code.keyCode==16 || code.shiftKey){
                //shift键被松开
                console.log('shift is up')
                this.pin = false; 
            }else if(code.keyCode==17 || code.ctrlKey){
                console.log('ctrl is up')
                this.ctrl = false;
            }
        });
        //监听是否点击在图层控制区域
        window.addEventListener('mousedown', ev=>{
            //console.log('window.ev:', ev);
            var e = ev || window.event;
            var elem = e.target;
            var targetArea = document.getElementById('layerfun');
            if(!targetArea.contains(elem)){
                targetArea.style.display = 'none';
            }
        })
        
    },
    methods: {
        mergeLayer(){
            var layers = document.querySelectorAll(".layer .selected");
            console.log('layers:', layers) 
            console.log('activeLi:', this.activeLi)
            var len = this.activeLi.length;
            var nowDom = document.getElementById('sketchpad');
            var tempIndex = nowDom.getElementsByClassName('obj')[this.activeLi[0]].style.zIndex;
            var minLeft = 1e9;
            var minTop = 1e9;
            var maxRight = 0;
            var maxBottom = 0;
            for(var i=0; i<len; i++){
                nowDom.getElementsByClassName('obj')[this.activeLi[i]].style.zIndex=tempIndex;
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
                
            }
        },
        deleteLayer(){

        },
        rightClick(item, ev){
            var res = document.getElementById('layerfun');      //找到id为box的div
            console.log('ev:', ev);
            //console.log('ev.clientX:', ev.clientX,'ev.clientY:', ev.clientY)
            res.style.top = ev.y+80+'px';     //鼠标点击时给div定位Y轴
            res.style.left = ev.x+'px';    //鼠标点击时给div定位X轴
            res.style.display = 'block';        //显示div盒子
        },
        handleClick (index){
            this.isVisible = !this.isVisible;
            var nowDom = document.getElementById('layer');
            if(this.isVisible==false){
                this.layers[index].visibility = 'hidden';
                nowDom.getElementsByTagName('i')[index].className='noshow';
            }else{
                this.layers[index].visibility = 'visible';
                nowDom.getElementsByTagName('i')[index].className='el-icon-view';
            }
        },
        pinSelect(ev, index){
            
            ev.preventDefault();
            ev.stopPropagation();
            if(this.origin==-1){
                this.origin = index;
                this.activeLi.length = 0;
                this.activeLi.push(index);
            }else{
                
                const sum = Math.abs(index - this.origin) + 1;
                const min = Math.min(this.origin, index);
                console.log('sum:', sum);
                console.log('min:', min);
                if(this.pin){
                    let i = 0;
                    while(i<sum&& i<30){
                        this.activeLi.push(min+i);
                        i++;
                    }
                }else if(this.ctrl){
                    this.activeLi.push(index);
                }else{
                    this.activeLi.length = 0;
                    this.activeLi.push(index);
                }
                //this.activeLi.push(index);
            }
            
            /*const data =this.$refs.list;
            const origin = this.origin;
            const endIndex = index;
            if(this.pin && item.includes(data[index])){
                const sum = Math.abs(origin - endIndex) +1; //记录个数
                const min = Math.min(origin, endIndex);
                let i = 0 ;
                //console.log('zhuiming-li-click:', this.$refs.list, 'index:', index);
                var lis = document.getElementsByClassName('layeritem');
                console.log('zhuiming-lis:', lis)
                while(i<sum){
                    const index = min + i;
                    //this.$refs.list[index].className +="selected";
                    lis[index].className += 'selected';
                    //console.log('zhuiming-list:', this.$refs.list[index]);
                    i++;
                }
            }else{
                this.origin = index;
            }*/
        }
    }
}
</script>

<style>
.layertool #layerfun{
    position: absolute;;
    display: none;
    z-index: 2;
    background: burlywood;
    width: 80px;

}
.layertool #layerfun ul{
    list-style-type: none;
    font-size: .8em;
}
.layertool #layerfun ul li{
    padding: .2em;
    border-bottom: black ;
}
.layertool {
    border: red solid 1px;
    height: 400px;
}
.layertool .title {
    text-align: center;
}
.layertool ul{
    display: block;
    list-style-type: disc;
    margin-block-start: 0em;
    margin-block-end: 0em;
    margin-inline-start: 0px;
    margin-inline-end: 0px;
    padding-inline-start: 0px;
    /*border: 1px solid black;*/
    margin: 5px;

}
.layertool .layeritem{
    border: 1px solid pink;
    list-style-type: none;
    height: 35px;
    display: flex;
    margin-top:5px;
    
}
.layertool .selected {
    background: rgb(235, 232, 232);
}
.layertool .layeritem span{
    /*margin-top: auto;*/
    font-size: 0.8em;
    line-height:35px;
}
.layertool .layeritem i{
    border: 1px solid grey;
    margin: auto 2px;
    padding: 3px;
}
.layertool .noshow{
    border: 1px red solid;
    height: 24px;
    width: 24px;
    /*visibility: hidden;*/
    /*background: coral;*/
    font-style: normal;
   /* opacity: 0;*/
}

.layertool img{
    width: 30px;
    height: 30px;
}
/*.layertool .layer .noshow{
    display: none;
    
}
.layertool .layer .rightClick{
    list-style-type: none;
    display: block;
    position: relative;
}*/

</style>