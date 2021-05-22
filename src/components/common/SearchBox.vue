<template>
<div class="searchbox">
    <el-radio-group v-model="radio">
        <el-radio :label="1">全部</el-radio>
        <el-radio :label="2">家纺</el-radio>
        <el-radio :label="3">服装</el-radio>
        <el-radio :label="4">家居</el-radio>
        <el-radio :label="5">广告传媒</el-radio>
    </el-radio-group>
    <br/>
    <div class="input">
        <el-input placeholder="搜索主题/关键词" />
        <img class="search_logo" src="@/assets/images/search.png">
        <img id="logo2" class="search_logo" src="@/assets/images/search2.png">
    </div>
</div>
</template>
<script>
export default {
     data () {
      return {
        radio: 3
      };
    }
}
</script>
<style scoped>
*{
    margin: 0;
    padding: 0;
}
.searchbox >>> .el-radio__inner{
    width: 25px;
    height: 25px;
}
.searchbox >>> .el-radio-group{
    margin: 20px auto;
}
.searchbox >>> .el-radio__label{
    font-size: 20px;
    vertical-align: middle;
    color: white;
    font-weight: normal;
}

.searchbox >>> .search_logo{
    margin-left: -5px;
}
#logo2{
    margin-left: -18px;
}
.searchbox >>> .el-radio__input.is-checked >>> .el-radio__inner{
    border-color: white;
    background-color: green;
}
.searchbox >>> .el-radio__label{
    color:green;
}
.searchbox >>> .el-input{
    margin-top: 20px;
    width: 400px;
    height: 52px;
    font-size: 20px;
    outline: none;
}
.input{
    vertical-align: middle;
    display: flex;
    margin: 0 auto;
    justify-content: center;
    
}
.searchbox >>> .el-input__inner{
    height: 50px;
    border-radius: 10px;
}
.searchbox{
    background-color: #959595;
    width: 60%;
    margin: 100px auto;
    border-radius: 8px;
    text-align: center;
}
</style>