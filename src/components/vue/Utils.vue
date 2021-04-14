<template>
<div class="utils">
    <i class="el-icon-s-tools" @click="showUtils()"></i>
    <ul :class="show?'show':'noshow'">
        <li v-for="(item, index) in utils" :key="index">
            {{item}}
        </li>
    </ul>
</div>
</template>
<script>
export default {
    data () {
        return {
            show: false,
            utils:['素材栏', '画具栏', '文件栏']
        }
    },
    methods: {
        showUtils () {
            this.show = true;
        }
    }
}
</script>

<style>
.utils {
    position: absolute;
}
.noshow {
    display: none;
}
.show{
    display: block;
}
</style>