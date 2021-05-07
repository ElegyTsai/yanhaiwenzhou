<template>
    <div class="firstpage">
        <hr class="line"/>
        <div class="data">
            <h1>{{msg1}}</h1>
            <h1>{{msg2}}</h1>
        </div>
        <search-box></search-box>
        <div class="intro">
            <h1>{{msg3}}</h1>
            <h2>{{msg4}}</h2>
            <div class="nav_ul1">
            <ul class="ul1">
                <li class="items1" v-for="item in items1" :key="item.title">
                    <div>
                        <img :src="item.icon">
                        <span>{{item.title}}</span>
                    </div>
                </li>
            </ul>
            </div>
            
        </div>
        <div class="img_intro">
                <h1>{{msg5}}</h1>
                <ul>
                    <li v-for="item in items2" :key="item.name">
                        <img :src="item.icon">
                        <h1>{{item.name}}</h1>
                        <h2>{{item.intro1}}</h2>
                        <h2>{{item.intro2}}</h2>
                    </li>
                </ul>
        </div>
        <div class="blanket">
        </div>
        <div class="like">
            <h1>{{msg6}}</h1>
            <img src="@/assets/images/flash.png">
            <hr/>
            <table>
                <tr v-for="row in rows" :key="row">
                    <td v-for="col in cols" :key="col">
                        <img :src="getUrl(row,col)">
                    </td>
                </tr>
            </table>
        </div>
        <div class="myslide">
            <h1>{{msg7}}</h1>
            <h2>{{msg8}}</h2>
            <!--<img src="../assets/images/bg1.png">-->
            <el-carousel :interval="4000" type="card" height="500px">
                <el-carousel-item v-for="item in items3" :key="item.title">
                <img :src="item.icon">
                </el-carousel-item>
            </el-carousel>
            <div class="temp"></div>
        </div>
        <div class="design">
            <h1>{{msg9}}</h1>
            <span v-for="(item,index) in msg10" :key="index">{{item}}</span>
            <div>
                <img src="@/assets/images/arrow.png">
                <h1>{{msg11}}</h1>
                <h1>{{msg12}}</h1>
                <!--<el-button>默认按钮</el-button>-->
                <img src="@/assets/images/price.png">
            </div>
        </div>
    <footer>
        <section class="qr">
            <img src="@/assets/images/logo2.png">
            <img src="@/assets/images/qr.png">
        </section>
        <section>
            <ul>
                <li v-for="item in items4" :key="item.title">
                    <div>
                    <h1>{{item.title}}</h1>
                    <ul>
                        <li v-for="temp in item.detail" :key="temp.name">
                            <h2>{{temp.name}}</h2>
                        </li>
                    </ul>
                    </div>
                </li>
                
            </ul>
        </section>
        <hr/>
        <div>
            <h1>{{msg13}}</h1>
            <h1>{{msg14}}</h1>
        </div>
    </footer>
    </div>
</template>
<script>
import SearchBox from '../common/SearchBox.vue'
export default {
    name:"firstpage",
    components:{
        SearchBox
    },
    data(){
        return{
            msg1:'Welcome to yanhaiwenzhou',
            msg2:'传播中国文化之美',
            msg3:'AI赋能，行业推荐',
            msg4:'针对不同行业提供专业智能设计，为您节约时间成本，精准把握市场动向。',
            items1:[
                {
                    title: '家纺家居',
                    icon:require('@/assets/images/items1_1.png')
                },
                {
                    title: '服装行业',
                    icon:require('@/assets/images/items1_2.png')
                },
                {
                    title: '印刷行业',
                    icon:require('@/assets/images/items1_3.png')
                },
                {
                    title: '广告传媒',
                    icon:require('@/assets/images/items1_4.png')
                },
                {
                    title: '文创设计',
                    icon:require('@/assets/images/items1_5.png')
                },
                {
                    title: '陶瓷艺术',
                    icon:require('@/assets/images/items1_6.png')
                },
                {
                    title: '其他行业',
                    icon:require('@/assets/images/items1_7.png')
                }
            ],
            msg5:'AI设计，提升设计效率',
            items2:[
                {
                    name:'智能排版',
                    icon:require('@/assets/images/items2_1.png'),
                    intro1:'10万+设计素材',
                    intro2:'自动生成百种方案'
                },
                {
                    name:'智能配色',
                    icon:require('@/assets/images/items2_2.png'),
                    intro1:'在线配色',
                    intro2:'兼容所有图案'
                },
                {
                    name:'AI元素创作',
                    icon:require('@/assets/images/items2_3.png'),
                    intro1:'相同图案',
                    intro2:'不同风格自动生成'
                },
            ],
            msg6:'猜你需求',
            rows:[1,2,3],
            cols:[1,2,3,4,5],
            msg7:'砚海文舟素材库',
            msg8:'海量高质量素材，供您低价使用。',
            items3:[
                {
                    title:'img1',
                    icon:require("@/assets/images/items3_1.png")
                },
                {
                    title:'img2',
                    icon:require("@/assets/images/items3_2.png")
                },
                {
                    title:'img3',
                    icon:require("@/assets/images/items3_3.png")
                }
            ],
            msg9:'产品定制',
            msg10:[
                '24小时出稿','主题定向开发','定向推荐'
            ],
            msg11:'自主定题，AI辅助',
            msg12:'AI DESIGN',
            items4:[
                {
                    title:'关于砚海文舟',
                    detail:[
                       {
                           name:'砚海文舟网站导航',
                       },
                       {
                           name:'砚海文舟通行证',
                       },
                       {
                          name:'关于我们',
                       },
                       {
                           name:'产品简介',
                       },
                       {
                           name:'公司发展大事记'
                       }
                    ]
                },
                 {
                    title:'砚海文舟智能设计',
                    detail:[
                        {
                            name:'智能设计编辑部',
                        },
                        {
                            name:'风格成象编辑器',
                        },
                        {
                            name:'砚海文舟素材库'
                        }
                    ]
                },
                {
                    title:'砚海文舟社区',
                    detail:[
                        {
                            name:'社区首页'
                        },
                        {
                            name:'相关文章'
                        },
                        {
                            name:'互动交流'
                        }
                    ]
                },
                {
                    title:'联系我们',
                    detail:[
                        {
                            name:'商务合作'
                        }
                    ]
                },
            ],
            msg13:'2020 杭州市仲山文化科技有限公司 All rights reserved 粤ICP备 1704720525',
            msg14:'地址：浙江省杭州市江干区蓝湖国际一幢3层209'
        }
    },
    methods:{
        getUrl: function(row, col){
            return require("@/assets/images/libriry/"+row+"_"+col+".png");
        }
    }
}
</script>
<style scoped>
footer{
    background-color: #566262;
    text-align: center;
    overflow: hidden;
    position: relative;
    height: 500px;
    padding: 40px 40px;
}
footer hr{
    clear: both;
    margin-top: 400px;
    margin-left: 15%;
    width: 70%;
    margin-bottom: 10px;
}
footer .qr{
    position:absolute;
    left:15%;
    top:20px;
}
footer>div h1{
    font-weight: normal;
    font-size: 1.2em;
}
footer section:nth-child(2){
    margin-left: 25%;
}
footer section img{
    display: block;
}
footer section img+img{
    margin-top:-40px;
}
footer section>ul li div{
    margin:0 100px;
}
footer section>ul li{
    float: left;
    padding:.2em;
    list-style-type: none;
}
footer section>ul li h1{
    font-size: 1.3em;
    letter-spacing: 0.15em;
    color: white;
    font-weight: normal;
}
footer section>ul li ul{
    text-align: left;
    clear: both;
}
footer section>ul li ul li{
    clear: both;
}
footer section>ul li ul li h2{
    font-weight: normal;
    font-size: 0.9em;
    margin-bottom: 0;
}
.design{
    padding: 20px;
}
.design>h1{
    font-weight: normal;
    padding:20px;
}
.design span{
    font-size: 1.5em;
    border-right: 5px solid black;
    letter-spacing: .1em;
    padding:0 20px;
}
.design span:nth-child(4){
    border-right: none;
}
.design div{
    margin:100px auto;
    background-image: url(../../assets/images/bg2.png);
    background-position: center center;
    background-size: cover;
}
.design div img{
    position:relative;
    top:-70px;
}
.design div h1{
    color: white;
    padding-top:20px;
}
.design div h1+h1{
    font-size: 7em;
}
.design div h1+img{
    max-width: 400px;
    padding:60px 0 20px 0;
}
.design .el-button{
    background-image: url(../../assets/images/price.png);
    width: 500px;
    height: 500px;
}
.myslide img{
    max-height: 200px;
}
.el-carousel__item h3 {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    line-height: 200px;
    margin: 0;
}

.el-carousel__item:nth-child(2n) {
background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n+1) {
background-color: #d3dce6;
}
.el-carousel__arrow .el-icon-arrow-left,.el-icon-arrow-right{
    display: inline-block;
}
.myslide .temp{
    height: 20px;
}

.myslide{
    width: 100%;
    background-image: url(../../assets/images/bg1.png);
    background-size: 100%;
    background-repeat: no-repeat;
    background-position: center center;
}
.myslide h1,h2{
    padding-top: 10px;
    letter-spacing: .15em;
    color: white;
}
.myslide h1{
    padding-top: 20px;
}
.myslide h2{
    font-weight: normal;
    padding-bottom: 20px;
}

.blanket{
    background-color: white;
    height: 40px;
}
.like{
    text-align: center;
    background-color: #F8F8F8;
    position: relative;
}
.like h1{
    text-align: left;
    border-left: 10px green solid;
    padding-left: 10px;
    margin:20px 50px;
    font-size: 1.8em;
    line-height: 2em;
}
.like>img{
    position: absolute;
    left:200px;
    top:13px;
}
.like table{
    padding: 50px;
    margin: 0 auto;
}
.like table tr{
    vertical-align: top;
}
.like img{
    display: inline-block;
    max-width: 250px;
    /*margin:-20px;*/
}
.img_intro{
    margin: 40px auto;
    text-align: center;
}
.img_intro ul{
    overflow: hidden;
    list-style-type: none;
    display: inline-block;
}
.img_intro ul li{
    float: left;
    margin:40px 80px;
    text-align: left;
}
.img_intro ul li h1{
    font-size: 1.5em;
    text-align: left;
}
.img_intro ul li h2{
    font-size: 1em;
    font-weight: normal;
    margin-bottom: 0;
}
.img_intro ul li img{
    width: 300px;
    height: 300px;
    background-color: #E9E9E9;
}
*{
    margin: 0;
    padding: 0;
}
.firstpage{
    height: 100%;
    margin: -8px auto;
    background-color: #F8F8F8;

}

.data{
    margin-top: 100px;
}
.line{
    height: 20px;
    border: none;
    background: #CECECE;
}
h1{
    vertical-align: middle;
    text-align: center;
    font-weight: normal;
    font-size: 60px;
   
}
.intro{
    background-color: #ECE8E5;
    width: 100%;  
    text-align: center;
}
.intro h1, h2{
    margin-bottom: 10px;
    letter-spacing: .15em;
}
.intro h2{
    color: black;
    font-weight: normal;
}
.intro .ul1{
    margin: 0 auto;
    padding-left: 200px;
    text-align: center;
    overflow: hidden;
    list-style-type: none;
    width:100%;
}
.intro .items1{
    float:left;
    padding: 4px 20px;
    font-size: 20px;
    margin:0 auto;  
}
.intro .items1 img{
    width: 80px;
    height: 80px;
    margin: .5em;
}
.nav_ul1{
    width: 100%;
    height: 200px;
    text-align: center;
    margin:0 auto;
    overflow: hidden;
}
.items1 img{
    display: block;
}
.items1 li span{
    display: block;
    width: 100%;
    height: 30px;
    line-height: 30px;
    
}

</style>