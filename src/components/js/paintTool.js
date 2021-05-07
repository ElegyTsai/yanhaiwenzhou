import { mapState } from "vuex";

export default {
    data () {
        return {
            paintTool: ['amplification','brightness','brush','bucket','color','contrast',
            'eraser','gradient','narrow','straw','symbol','tailor','transparency']
        }
    },
    computed: {
        ...mapState([
            'tools',
            'toolId'
        ]),
    },
    methods: {
        selectTool (index) {
            console.log('zhuiming-toolindex:', index);
            this.$store.commit('changeToolId', index);
        }
    }
}