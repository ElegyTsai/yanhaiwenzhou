export default {
    data () {
        return {
            fileTool: ['clear','copy','delete','download','export','layercopy','layerdelete','link','merge','move','redo','save','undo']
        }
    },
    methods: {
        handleClick (item) {
            switch (item) {
                case 'clear':
                    this.clear();
                    break;
                case 'copy':
                    this.copy();
                    break;
                case 'delete':
                    this.delete();
                    break;
                case 'download':
                    this.copy();
                    break;
                case 'export':
                    this.download();
                    break;
                case 'layercopy':
                    this.layercopy();
                    break;
                case 'layerdelete':
                    this.layerdelete();
                    break;
                case 'link':
                    this.link();
                    break;
                case 'merge':
                    this.merge();
                    break;
                case 'move':
                    this.move();
                    break;
                case 'redo':
                    this.redo();
                    break;
                case 'save':
                    this.save();
                    break;
                case 'undo':
                    this.undo();
                    break;
            }
        },
        clear () {
            console.log('zhuiming-clear');
        }
    }
}