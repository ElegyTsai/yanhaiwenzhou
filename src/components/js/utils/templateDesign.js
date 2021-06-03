//为数据库中模版表插入数据时使用
//模板表中objs字段
var a11 = {
    left: 140,
    top: 100,
    width: 120,
    height: 100,
    //value: require('/Users/zhuiming/Documents/yanhai/template/simple/1/a/1.png'),
    value:'http://localhost:8080/server_resource/template/simple/1/a/1.png',
    active: false,
    transform: 0,
    visibility: 'visible',
    zIndex: 1,
    outline: false,
};

var a12 = {
    left: 50,
    top: 650,
    width: 120,
    height: 100,
    value: 'http://localhost:8080/server_resource/template/simple/1/a/1.png',
    active: false,
    transform: 0,
    visibility: 'visible',
    zIndex: 2,
    outline: false,
};


var a21 = {
    left:100,
    top:300,
    width:80,
    height:80,
    value:'http://localhost:8080/server_resource/template/simple/1/a/2.png',
    active: false,
    transform:30,
    visibility:'visible',
    zIndex: 3,
    outline:false
}

var a31 = {
    left:0,
    top:500,
    width:50,
    height:50,
    value:'http://localhost:8080/server_resource/template/simple/1/a/3.png',
    active: false,
    transform:0,
    visibility:'visible',
    zIndex: 4,
    outline:false
}

var b11 = {
    left:30,
    top:200,
    width:50,
    height:50,
    value:'http://localhost:8080/server_resource/template/simple/1/b/1.png',
    active: false,
    transform:200,
    visibility:'visible',
    zIndex: 5,
    outline:false
}

var b21 = {
    left:80,
    top:25,
    width:40,
    height:40,
    value:'http://localhost:8080/server_resource/template/simple/1/b/2.png',
    active: false,
    transform:45,
    visibility:'visible',
    zIndex: 6,
    outline:false
}

var b22 = {
    left:5,
    top:350,
    width:40,
    height:40,
    value:'http://localhost:8080/server_resource/template/simple/1/b/2.png',
    active: false,
    transform:0,
    visibility:'visible',
    zIndex: 7,
    outline:false
}


var b23 = {
    left:140,
    top:550,
    width:40,
    height:40,
    value:'http://localhost:8080/server_resource/template/simple/1/b/2.png',
    active: false,
    transform:320,
    visibility:'visible',
    zIndex: 8,
    outline:false
}


var c11 = {
    left:100,
    top:400,
    width:80,
    height:40,
    value:'http://localhost:8080/server_resource/template/simple/1/c/1.png',
    active: false,
    transform:330,
    visibility:'visible',
    zIndex: 9,
    outline:false
}

var c12 = {
    left:20,
    top:-15,
    width:80,
    height:40,
    value:'http://localhost:8080/server_resource/template/simple/1/c/1.png',
    active: false,
    transform:330,
    visibility:'visible',
    zIndex: 10,
    outline:false
}

/*var d1 = {
    left:0,
    top:0,
    width:40,
    height:40,
    value:'http://localhost:8080/server_resource/template/simple/1/b/2.png',
    active: false,
    transform:0,
    visibility:'visible',
    zIndex: this.$store.state.zIndex,
    outline:false
}
this.$store.commit('addIndex', this.$store.state.zIndex+1);*/

var tempObj = [a11, a12, a21, a31, b11, b21, b22, b23, c11, c12];

export default tempObj;