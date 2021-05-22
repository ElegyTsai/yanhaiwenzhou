export default {
    data () {
        return {
            imgTool:[
                /*{url: require('@/assets/material/nangua/a1.png')},
                {url: require('@/assets/material/nangua/a2.png')},
                {url: require('@/assets/material/nangua/a3.png')},
                {url: require('@/assets/material/nangua/b1.png')},
                {url: require('@/assets/material/nangua/b2.png')},
                {url: require('@/assets/material/nangua/c1.png')},
                {url: require('@/assets/material/nangua/d1.png')},
                {url: require('@/assets/material/鸟1.png')},
                {url: require('@/assets/material/鸟2.png')},
                {url: require('@/assets/material/鸟3.png')},
                {url: require('@/assets/material/鸟4.png')},
                {url: require('@/assets/material/鸟5.png')},
                {url: require('@/assets/material/鸟6.png')},
                {url: require('@/assets/material/鸟7.png')},
                {url: require('@/assets/material/鸟8.png')},
                {url: require('@/assets/material/鸟9.png')},
                {url: require('@/assets/material/鸟10.png')},
                {url: require('@/assets/material/鸟11.png')},
                {url: require('@/assets/material/鸟12.png')},
                {url: require('@/assets/material/鸟13.png')},
                {url: require('@/assets/material/鸟14.png')},
                /*{url: require('@/assets/bigimg.png')},
                {url: require('@/assets/leaf.png')},
                {url: require('@/assets/img1.png')},
                {url: require('@/assets/img2.png')},
                {url: require('@/assets/img3.png')}*/
            ],
            //src:require('/Users/zhuiming/Documents/yanhai/yanhai_v2/src/assets/material/nangua/a1.png'),
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
            lastValue: ''

        }
        
    },
    computed: {
        activeTemplate: function () {
            return this.$store.state.activeTemplate;
        }
    },
    methods: {
        tAddObj(url, x, y){
            if(this.activeTemplate==false){
                addObj(url, x, y);
            }else{
                addTemplate(url);
            }
            
        },
        requestMaterial(query) {
            //console.log('query: ', query);
            //console.log('this.value:', this.value);
            //console.log('this.lastValue:', this.lastValue);
            //if(this.first==false && query !== ''){
            if(query !== this.lastValue && query!==''){
                this.lastValue = this.value;
                //this.loading = true;
                this.$http({
                    method:'get',
                    url:"http://localhost:8080/api/material/public/querybycate",
                    params:{
                        category:this.value
                      /*password:this.pwd.trim()*/
                    }
                  }).then((res)=>{
                      console.log('res is ', res.status);
                      console.log('res is ', res.data);
                      if(res.status===200){
                          var resLen = res.data.length;
                          this.imgTool = [];
                          for(var i=0; i<resLen; i++){
                              console.log('picture_url:',res.data[i].picture_url);
                              for(var j=0; j<res.data[i].count; j++){
                                  this.imgTool.push({url: require('/Users/zhuiming/Documents/yanhai/material/'+this.value+'/'+(j+1)+'.png')})
                                }
                              
                          }
                      }
                    
                  });
                
            }else{
                console.log('query is empty');
            }
        }
        

    }
}