<template>
<!--临时页-->
    <div class="router-template">
        <div class="template-wrap">
            {{$route.name}}
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return {};
    }
}
</script>
<style scoped>
.router-template{
    color: #000;
    font-size: 20px;
    font-weight: 700;
    height: 500px;
}
.template-wrap{
     height: 100%;
    display: flex;
    flex-flow: column;
    justify-content: center;
    align-items: center;
}
</style>