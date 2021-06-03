//sketchpad功能函数
//参考https://github.com/cojapacze/sketchpad
export default {
    data () {
        return {
            paintTool: ['amplification','brightness','brush','bucket','color','contrast',
            'eraser','gradient','narrow','straw','symbol','tailor','transparency'],
            flag: false
        }
    },
    computed: {
    },
    methods: {
        selectTool (toolId) {
            console.log("selectTool", toolId);
            if(this.flag==false){
                window.initSketchpad();
                this.flag = true;
            }
            
            var sketchpad = window.sketchpad;
            sketchpad.setTool(toolId);
            document.querySelectorAll(".paintTool .button").forEach(function (el) {
                el.classList.remove("active");
            });
            if(document.getElementById("tool-" + toolId)){
                document.getElementById("tool-" + toolId).classList.add("active");
            }
            
    
            document.getElementById("size").style.display = "none";
            document.getElementById("colorpaletteSection").style.display = "none";
            document.getElementById("colorpaletteFillSection").style.display = "none";
    
            var tool = sketchpad.getCurrentTool();
    
            document.getElementById("toolName").innerHTML = tool.toolLabel || "Undefined";
            /**
             * set toolbar for tool
             */
    
            if (typeof tool.getColor === "function") {
                console.log('tool',tool);
                window.colorpalette.setColor(tool.getColor(), "noPropagate");
            }
    
            if (typeof tool.getFillColor === "function") {
                //console.log('color2');
                //colorpaletteFill.setColor(tool.getFillColor(), "noPropagate");
            }
    
            if (typeof tool.getSize === "function") {
                var size = tool.getSize();
                document.getElementById("size-slider").value = size;
            }
    
            switch (toolId) {
                case "pen":
                    document.getElementById("colorpaletteSection").style.display = "block";
                    document.getElementById("size").style.display = "block";
                    break;
                case "highlighter":
                    document.getElementById("colorpaletteSection").style.display = "block";
                    document.getElementById("size").style.display = "block";
                    break;
                case "eraser":
                    break;
                case "rectangle":
                    document.getElementById("colorpaletteSection").style.display = "block";
                    //document.getElementById("colorpaletteFillSection").style.display = "block";
                    document.getElementById("size").style.display = "block";
                    break;
                case "circle":
                    document.getElementById("colorpaletteSection").style.display = "block";
                    //document.getElementById("colorpaletteFillSection").style.display = "block";
                    document.getElementById("size").style.display = "block";
                    break;
                case "line":
                    document.getElementById("colorpaletteSection").style.display = "block";
                    document.getElementById("size").style.display = "block";
                    break;
                case "zoom-in":
                    window.sketchpad.setScale(sketchpad.scale * 2);
                    break;
                case "zoom-1":
                    window.sketchpad.setScale(1);
                    window.sketchpad.setViewportPosition(0, 0);
                    window.sketchpad.setRotation(0);
                    break;
                case "zoom-out":
                    window.sketchpad.setScale(sketchpad.scale / 2);
                    break;
                case "undo":
                    window.sketchpad.undo();
                    //console.log('zhuiming-undo');
                    break;
                case "redo":
                    window.sketchpad.redo();
                    break;
            }
        },
    }
}

