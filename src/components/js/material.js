//素材栏功能函数
export default {
    data () {
        return {
            imgMaterial:[],
            usedRecently:[],
            options:[
                {
                    name: '树',
                    category: 'tree'
                },
                {
                    name: '云',
                    category: 'cloud'
                },
                {
                    name: '人',
                    category: 'person'
                }
            ],
            value:'',
            loading: false,
            lastValue: '',
            activeName: 'cloudMaterial',
            cloudMaterialCategory: '',
            closeSidebar: true,
            cloudMaterialOptions:[
                {cname:'手绘',ename:'handpainted'},
                {cname:'抽象',ename:'abstraction'},
                {cname:'国风', ename:'chinoiserie'},
                {cname:'花卉', ename:'flowers'},
                {cname:'植物',ename:'botany'},
                {cname:'碎花', ename:'floral'},
                {cname:'几何', ename:'geometry'},
                {cname:'机理', ename:'mechanism'},
                {cname:'条格', ename:'lattice'},
                {cname:'卡通', ename:'cartoon'},
                {cname:'动物', ename:'animal'},
                {cname:'足虫', ename:'millipede'},
                {cname:'文字',ename:'word'},
                {cname:'鸟类',ename:'bird'},
                {cname:'风景', ename:'scenery'},
                {cname:'水墨', ename:'inkpainting'},
                {cname:'水彩', ename:'watercolor'},
                {cname:'其他', ename:'others'}
            ],
            currentSelection: 1
        }
        
    },
    computed: {
        activeTemplate: function () {
            return this.$store.state.activeTemplate;
        },
        objs: function () {
            return this.$store.state.objs;
        },
        replace: function (){
            return this.$store.state.replace;
        },
        replaceAll: function () {
            return this.$store.state.replaceAll;
        },
        selected: function (){
            return this.$store.state.selected;
        },
        clickStatus: function (){
            return this.$store.state.clickStatus;
        }
    },
    methods: {
        tAddObj(url, x, y){
            //根据frame.js中设置的clickStatus中进行点击响应
            switch (this.clickStatus){
                case 'ordinary':
                    addObj(url, x, y);
                    break;
                case 'replaceObj':
                    //替换一个元素
                    for(var i=0; i<this.selected.length; i++){
                        this.selected[i].value=url;
                    }
                    break;
                case 'replaceObjAll':
                    //替换一类元素
                    for(var i=0; i<this.selected.length; i++){
                        var obj = this.selected[i];
                        var tempStr = obj.value;//根据元素url判断是否需要替换
                        for(var j=0; j<this.objs.length; j++){
                            if(this.objs[j].value==tempStr){
                                this.objs[j].value=url;
                            }
                        }
                    }
                    break;
                case 'colorMatch':
                    console.log('colorMatch');
                    this.$http({
                        method:'post',
                        url:'http://localhost:8080/api/colormatch/',
                        params:{
                            uname:this.$store.state.token,
                            pid1:this.selected[0].value, //源
                            pid2:url //目标
                        }
                    }).then(res=>{
                        if(res.data==='success'){
                            console.log(res);
                        }
                    })
                    break;
            }
            this.$store.commit('changeClickStatus', 'ordinary');
            //将该元素添加至最近使用
            this.addUsedRecently(url);
        },
        addUsedRecently(url){
            this.$http({
                method:'post',
                url:'http://localhost:8080/api/material/used/add',
                params:{
                    uname:this.$store.state.token,
                    materials:url
                }
            }).then(res=>{
                if(res.status==200){
                    console.log('添加成功');
                }
            })
        },
        //tab的点击
        handleClick(tab, event){
            console.log(tab, event);
        },
        handleOpen(key, keyPath) {
            console.log(key, keyPath);
        },
        handleClose(key, keyPath) {
            console.log(key, keyPath);
        },
        //按category请求素材
        selectCategory(item){
            this.closeSidebar = true;
            this.currentSelection = 1;
            this.$http({
                method:'post',
                url:"http://localhost:8080/api/material/public/querybycate",
                params:{
                    category:item
                  /*password:this.pwd.trim()*/
                }
              }).then((res)=>{
                  console.log('res is ', res.status);
                  console.log('res is ', res.data);
                  if(res.status===200){
                      var resLen = res.data.length;
                      this.imgMaterial = [];
                      for(var i=0; i<resLen; i++){
                          //console.log('picture_url:',res.data[i].picture_url);
                          for(var j=0; j<res.data[i].count; j++){
                              //this.imgMaterial.push({url: require('/Users/zhuiming/Documents/yanhai/material/'+item+'/'+(j+1)+'.png')})
                              this.imgMaterial.push({url:res.data[i].picture_url+(j+1)+'.png'});
                            }
                          
                      }
                  }
                
              });
        },
        //左侧导航栏的关闭与开启
        close(){
            this.closeSidebar = true;
        },
        open(){
            this.closeSidebar = false;
        },
        //左侧导航栏的函数
        handleSelection(index){
            this.closeSidebar = true;
            this.currentSelection = index;
            switch (index){
                case 1:
                    //素材库
                    break;
                case 2:
                    //最近使用
                    this.$http({
                        method:'post',
                        url:'http://localhost:8080/api/material/used/querybyuid',
                        params:{
                            uname:this.$store.state.token
                        }
                    }).then(res=>{
                        if(res.status===200){
                            //console.log('res:', res);
                            var resLen = res.data.length;
                            this.usedRecently = [];
                            for(var i=0; i<resLen; i++){
                                console.log(res.data[i].material);
                                this.usedRecently.push({url:res.data[i].materials});
                            }
                        }
                    })
                    break;
                case 3:
                    break;
                case 4:
                    break;
            }
        }
        

    }
}