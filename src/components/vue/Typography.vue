<template>
<!--排版栏-->
<div class="typography">
    <div class="options">
        <div :class="{'active':activeIndex==index}" class="option" @click="changeIndex(index, item.ename)" v-for="(item, index) in category" :key="index">{{item.cname}}</div>
    </div>
    <div class="template">
        <img class="imgTemplate" @click="selectTemplate()" v-for="(item, index) in imgTemplate" :key="index" :src="item.url">
    </div>
</div>
    
</template>

<script>
export default {
    data () {
        return {
            category:[
                {cname:'简约', ename:'simple'},
                {cname:'田园', enmae:''},
                {cname:'古典',ename:''},
                {cname:'北欧',ename:''},
                {cname:'儿童',enmae:''},
                {cname:'淑女', ename:''},
                {cname:'中性', ename:''},
                {cname:'老年', ename:''},
                {cname:'优雅', enmae:''},
                {cname:'其他', ename:''}
            ],
            //configuration:['全部','散点构图','规矩构图','错行构图','组合构图','变形构图','底纹构图'],
            //combination:['全部','单排','两两结合','三种相加','四种合成','五种结合'],
            activeIndex: 0,
            imgTemplate: []
            
        }
    },
    computed: {
        activeTemplate: function(){
            return this.$store.state.activeTemplate;
        },
        objs: function(){
            return this.$store.state.objs;
        },
        bgwidth: function(){
            return this.$store.state.bgwidth;
        }
    },
    methods: {
        selectTemplate(){
            //this.activeTemplate = true;
            this.$store.commit('changeActiveTemplate', true);
            //this.$store.commit('changeBgColor', val);
            this.$store.commit('changeBgWidth', 200);
            this.$store.commit('changeBgHeight', 800);
            this.$store.commit('changeElementCount', 6);
            //this.$store.commit('clearObjs');
            this.requstTemplate();
            //this.addTemplate();
            

        },
        requstTemplate(){
            this.$http({
                method:'post',
                url:"http://localhost:8080/api/template/detail/querybycateandindex",
                params:{
                    category:'simple',
                    tindex:1
                }
              }).then((res)=>{
                  console.log('res is ', res.status);
                  //console.log('res is ', res.data);
                  if(res.status==200){
                    var objsStr = decodeURIComponent(res.data.objs);
                    var resObjs = JSON.parse(objsStr);
                    //console.log('78----this.objs:',this.objs);
                    //console.log('78----this.objs:',this.objs.length);
                    if(this.objs.length!==0){
                        //var len = this.objs.length;
                        var i=0, j=0;
                        for( ;i<resObjs.length && j<this.objs.length; i++, j++){
                            //var tempObj = this.objs.shift();
                            //console.log('tempObj:', tempObj)
                            //resObjs[i].value = tempObj.value;
                            //this.objs[this]
                            this.objs[j].left = resObjs[i].left;
                            this.objs[j].top = resObjs[i].top;
                            this.objs[j].width = resObjs[i].width;
                            this.objs[j].height = resObjs[i].height;
                            //this.objs[j].active = resObjs[i].active,
                            this.objs[j].transform= resObjs[i].transform,
                            this.objs[j].visibility = resObjs[i].visibility,
                            this.objs[j].zIndex = resObjs[i].zIndex,
                            this.objs[j].outline = resObjs[i].outline,
                            this.objs[j].oldLeft =  resObjs[i].oldLeft,
                            this.objs[j].oldTop = resObjs[i].oldTop
                            //var obj = this.objs[j]; 
                            //if(this.objs.length===0) break;
                        }
                        if(j<this.objs.length){
                            //说明画布上元素超过所需元素，将其弹出
                            this.objs.splice(j, this.objs.length);
                        }
                        if(i<resObjs.length){
                            //说明画布上元素少于所需元素，模板元素放入this.objs
                            for(; i<resObjs.length; i++){
                                var obj = resObjs[i];
                                this.objs.push(obj);
                                
                                if(obj.left+obj.width>this.bgwidth){
                                    if(obj.outline==false){
                                        var temp2 = {
                                            left: obj.left-this.bgwidth,
                                            top: obj.top,
                                            width: obj.width,
                                            height: obj.height,
                                            value: obj.value,
                                            active: obj.active,
                                            transform: obj.transform,
                                            visibility: obj.visibility,
                                            zIndex: obj.zIndex,
                                            outline: true,
                                            oldLeft: obj.oldLeft - this.bgwidth,
                                            oldTop: obj.oldTop
                                        };
                                        this.objs.push(temp2);
                                        obj.outline=true;
                                    }
                                }
                            }
                        }

                        for(var k=0; k<this.objs.length; k++){
                            //处理全部被割裂的元素
                            var obj = this.objs[k];
                            if(obj.left+obj.width>this.bgwidth){
                                    if(obj.outline==false){
                                        var temp2 = {
                                            left: obj.left-this.bgwidth,
                                            top: obj.top,
                                            width: obj.width,
                                            height: obj.height,
                                            value: obj.value,
                                            active: obj.active,
                                            transform: obj.transform,
                                            visibility: obj.visibility,
                                            zIndex: obj.zIndex,
                                            outline: true,
                                            oldLeft: obj.oldLeft - this.bgwidth,
                                            oldTop: obj.oldTop
                                        };
                                        this.objs.push(temp2);
                                        obj.outline=true;
                                    }
                            }
                        }
                        //画布上的元素不为空
                        /*var docObjs = document.getElementsByClassName('obj');
                        console.log('docObjs.length:', docObjs.length)
                        for(var i=0; i<docObjs.length; i++){
                            docObjs[i].classList.remove('active');
                            var minPath = 1e9;
                            var index = 0;
                            var w = docObjs[i].getElementsByTagName('img')[0].naturalWidth;
                            var h = docObjs[i].getElementsByTagName('img')[0].naturalHeight;
                            //console.log('w=:',w,';h=:',h);
                            for(var j=0; j<resObjs.length; j++){
                                if(resObjs[j].status) continue;
                                var path = Math.abs(resObjs[j].width-w)+Math.abs(resObjs[j].height-h);
                                if(path<minPath){
                                    minPath = path;
                                    index = j;
                                }
                            }
                            var tempValue = resObjs[index].value;
                            //console.log('tempValue:', tempValue)
                            var first = true;
                            for(var j=0; j<resObjs.length; j++){
                                //console.log('resObjs[',+j+'].value:',resObjs[j].value);
                                
                                if(resObjs[j].value==tempValue && !resObjs[j].status){
                                    resObjs[j].value = docObjs[i].getElementsByTagName('img')[0].src;
                                    resObjs[j].status = true;
                                    if(first===true){
                                        //console.log('first:', first);
                                        //console.log('j=', j);
                                        docObjs[i].style.left = resObjs[j].left+'px';
                                        docObjs[i].style.top = resObjs[j].top + 'px';
                                        first = false;
                                    }
                                    
                                }
                            }
                            
                        }
                        //this.objs.length = 0;
                        this.$store.commit('clearObjs');
                        //this.objs.splice(0);*/
                    }else{
                        //先选模板再选元素
                        //this.$store.commit('clearObjs');
                        console.log('106-objs:',this.objs.length);
                        console.log('108-this.objs:', this.objs);
                        var testIndex = 0;
                        for(var i=0; i<resObjs.length; i++){
                            var obj = resObjs[i];
                            this.objs.push(obj);
                            
                            if(obj.left+obj.width>this.bgwidth){
                                if(obj.outline==false){
                                    var temp2 = {
                                        left: obj.left-this.bgwidth,
                                        top: obj.top,
                                        width: obj.width,
                                        height: obj.height,
                                        value: obj.value,
                                        active: obj.active,
                                        transform: obj.transform,
                                        visibility: obj.visibility,
                                        zIndex: obj.zIndex,
                                        outline: true,
                                        oldLeft: obj.oldLeft - this.bgwidth,
                                        oldTop: obj.oldTop
                                    };
                                    this.objs.push(temp2);
                                    obj.outline=true;
                                }
                            }
                        }
                    }
                    //this.$forceUpdate()
                    this.$store.commit('addZIndex', resObjs.length+1);
                    
                }
                
              });
        },
        addTemplate(){
            /*var a1 = {
                left: 0,
                top: 0,
                width: 100,
                height: 100,
                //value: require('/Users/zhuiming/Documents/yanhai/template/simple/1/a/1.png'),
                value:'http://localhost:8080/server_resource/template/simple/1/a/1.png',
                active: false,
                transform: 0,
                visibility: 'visible',
                zIndex: this.$store.state.zIndex,
                outline: false,
            };
            var temp2 = {
                left: 100,
                top: 100,
                width: 100,
                height: 100,
                value: require('/Users/zhuiming/Documents/yanhai/template/simple/1/a/2.png'),
                active: false,
                transform: 0,
                visibility: 'visible',
                zIndex: this.$store.state.zIndex,
                outline: false,
            };
            this.objs.push(temp1);
            this.objs.push(temp2);
            console.log('toString:'+JSON.stringify(this.objs))*/
            this.$http({
                method:'post',
                url:"http://localhost:8080/api/template/detail/add",
                params:{
                    category:'simple',
                    tpid:'1', 
                    tindex:1,
                    objs:encodeURIComponent(JSON.stringify(tempObj)),
                    element:'|a-1,a-2,a-3|b-1,b-2|c-1'
                  /*password:this.pwd.trim()*/
                }
              }).then((res)=>{
                  console.log('res is ', res.status);
                  console.log('res is ', res.data);
                  if(res.status==200){
                      this.$store.commit('addZIndex', 11);
                  }
                  /*if(res.status===200){
                      var resLen = res.data.length;
                      this.imgTemplate = [];
                      for(var i=0; i<resLen; i++){
                          //console.log('picture_url:',res.data[i].picture_url);
                          for(var j=0; j<res.data[i].count; j++){
                              //console.log('/Users/zhuiming/Documents/yanhai/template/'+item+'/'+(j+1)+'/template.png')
                              this.imgTemplate.push({url: require('/Users/zhuiming/Documents/yanhai/template/'+item+'/'+(j+1)+'/template.png')})
                            }
                          
                      }
                  }*/
                
              });
        },
        handleClose(done) {
            this.$confirm('确认关闭？')
                .then(_ => {
                done();
                })
                .catch(_ => {});
        },
        changeIndex(index, item){
            this.activeIndex = index;
            this.$http({
                method:'post',
                url:"http://localhost:8080/api/template/public/querybycate",
                params:{
                    category:'simple'
                  /*password:this.pwd.trim()*/
                }
              }).then((res)=>{
                  console.log('res is ', res.status);
                  console.log('res is ', res.data);
                  if(res.status===200){
                      var resLen = res.data.length;
                      this.imgTemplate = [];
                      for(var i=0; i<resLen; i++){
                          //console.log('picture_url:',res.data[i].picture_url);
                          for(var j=0; j<res.data[i].count; j++){
                              //console.log('/Users/zhuiming/Documents/yanhai/template/'+item+'/'+(j+1)+'/template.png')
                              //this.imgTemplate.push({url: require('/Users/zhuiming/Documents/yanhai/template/'+item+'/'+(j+1)+'/template.png')})
                                this.imgTemplate.push({url:res.data[i].template_url+'/'+(j+1)+'/template.png'});
                            }
                          
                      }
                  }
                
              });
        },
        
    }
}
</script>

<style scoped>
 .typography{
  float: left;
  border: 1px solid red;
  height: 130px;
  width: calc(100% - 220px);
  margin: 0px 5px 10px 5px;
}
.typography .options{
    float: left;
    margin: 5px 0 0 5px;
    width:100px;
    display: grid;
    grid-template-columns: repeat(2, 50%);
    grid-template-rows: repeat(5, 20%);
}
.typography .options .option:hover{
    cursor:default;
}
.typography .options .active{
    color: #53E4C7;
}
.typography .template{
    float: left;
    display: grid;
    grid-template-rows: repeat(2, 50%);
}
.typography .template .imgTemplate {
    max-height: 120px;
    margin: 5px;
}
</style>