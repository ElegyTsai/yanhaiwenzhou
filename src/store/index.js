import Vue from 'vue'
import Vuex from 'vuex'
import tools from './tools'
Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        objs: [],
        selected: {},
        isSelected: false,
        tools: tools,
        toolId: 1
    },
    mutations: {
        pushObj (state, obj){
            state.objs.push(obj);
            //console.log('zhuiming-vuex:', state.objs);
        },
        setSelected (state, selected){
            state.selected = selected;
        },
        setIsSelected (state, isSelected) {
            state.isSelected = isSelected;
        },
        changeToolId (state, index){
            state.toolId = index;
        }
    }
})
export default store
