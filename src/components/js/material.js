export default {
    data () {
        return {
            imgTool:[
                {url: require('@/assets/material/nangua/a1.png')},
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
        

    }
}