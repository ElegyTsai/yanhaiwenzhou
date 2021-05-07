<template>
    <div class="layertool">
        <div class="title">{{title}}</div>
        <div class="layer" id='layer'>
            <ul>
                <li :class="{'selected':activeLi.indexOf(index)>-1}" class="layeritem" v-for="(item, index) in layers" :key="index" @click.prevent="pinSelect($event, index)" ref="list">
                    <i class="el-icon-view" @click="handleClick(index)"></i>
                    <img :src="item.value"/>
                    <span>图层{{index}}</span>
                </li>
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
            activeLi: []
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
        })
    },
    methods: {
        handleClick (index){
            this.isVisible = !this.isVisible;
            var nowDom = document.getElementById('layer');
            if(this.isVisible==false){
                this.layers[index].visibility = 'hidden';
                nowDom.getElementsByTagName('i')[index].className='noshow';
                //this.$strore.se
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
    border: 1px solid black;
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
    height: 16px;
    width: 16px;
    /*visibility: hidden;*/
    /*background: coral;*/
    font-style: normal;
   /* opacity: 0;*/
}

.layertool img{
    width: 30px;
    height: 30px;
}

</style>