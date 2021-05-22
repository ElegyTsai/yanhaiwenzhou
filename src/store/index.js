import Vue from 'vue'
import Vuex from 'vuex'
import tools from './tools'
Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        token: '',
        objs: [],
        selected: {},
        isSelected: false,
        tools: tools,
        toolId: 1,
        bgcolor:'rgba(19, 206, 102, 0.8)',
        bgwidth: 600,
        bgheight: 600,
        zIndex: 1,
        activeTemplate: false,
        elementCount: 0

    },
    mutations: {
        setToken(state, token){
            state.token = token;
            sessionStorage.token = token;
        },
        pushObj (state, obj){
            state.objs.push(obj);
            console.log('zhuiming-vuex:', state.objs);
        },
        clearObjs (state){
            state.objs = [];
        },
        setSelected (state, selected){
            state.selected = selected;
        },
        setIsSelected (state, isSelected) {
            state.isSelected = isSelected;
        },
        changeToolId (state, index){
            state.toolId = index;
        },
        changeBgColor (state, bgcolor){
            state.bgcolor = bgcolor;
        },
        changeBgWidth (state, bgwidth){
            state.bgwidth = bgwidth;
        },
        changeBgHeight (state, bgheight){
            state.bgheight = bgheight;
        },
        addZIndex(state, zIndex){
            state.zIndex = zIndex;
        },
        changeActiveTemplate(state, activeTemplate){
            state.activeTemplate = activeTemplate;
        },
        changeElementCount(state, elementCount){
            state.elementCount = elementCount;
        }
    },
    getters: {
        getToken(state){
            if(!state.token){
                state.token = sessionStorage.getItem('token');
            }
            return state.token;
        }
    }
})
export default store
