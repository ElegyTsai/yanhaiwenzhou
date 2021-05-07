var tools = [
    {
      name: 'Select',
      title: '选择工具 (S)',
      description: '点击并拖拽去画一个选择区。',
      parameter: [{
        key: 0,
        title: '选择框',
        choose: '矩形',
        optional: ['矩形', '圆形']
      }]
    },
    {
      name: 'Move',
      title: '移动工具 (M)',
      description: '拖动选择可以移动位置。',
      parameter: []
    },
    {
      name: 'Lasso',
      title: '套索工具 (A)',
      description: '点击并拖拽为选择区画轮廓。',
      parameter: []
    },
    {
      name: 'ZoomAll',
      title: '缩放工具 (Z)',
      description: '左击放大，右击缩小。',
      parameter: [{
        key: 2,
        imgName: ['zoomin', 'zoomout']
      }]
    },
    // {
    //   name: 'Hand',
    //   title: '手抓工具 (H)',
    //   description: '点击按下并拖拽以沿想要的方向滚动图像。',
    //   parameter: []
    // },
    // {
    //   name: 'Fill',
    //   title: '填充工具 (F)',
    //   description: '点击按下想要的图像区域填充颜色。',
    //   parameter: []
    // },
    // {
    //   name: 'Gradient',
    //   title: '渐变工具 (N)',
    //   description: '点击按下并拖动产生渐变。',
    //   parameter: [{
    //     key: 0,
    //     title: '渐变模式',
    //     choose: '线性',
    //     optional: ['线性', '反射', '钻石', '放射']
    //   }]
    // },
    {
      name: 'PaintBrush',
      title: '画笔 (B)',
      description: '点击按下并拖动绘图。',
      parameter: [{
        key: 0,
        title: '笔型',
        choose: '书法画笔',
        optional: ['书法画笔', '喷枪', '蜡笔', '记号笔', '水彩画笔']
      }, {
        key: 3,
        title: '笔头大小',
        choose: 1
      }, {
        key: 3,
        title: '不透明度',
        choose: '100%'
      }, {
        key: 0,
        title: '笔头样式',
        choose: '粗',
        optional: ['粗', '圆', '平']
      }, {
        key: 3,
        title: '模糊程度',
        choose: '1%'
      }]
    },
    {
      name: 'Pencil',
      title: '铅笔 (P)',
      description: '点击按下并拖动绘图。',
      parameter: [{
        key: 3,
        title: '笔头大小',
        choose: 1
      }, {
        key: 3,
        title: '不透明度',
        choose: '100%'
      }, {
        key: 0,
        title: '笔头样式',
        choose: '粗',
        optional: ['粗', '圆', '平']
      }, {
        key: 3,
        title: '模糊程度',
        choose: '1%'
      }]
    },
    {
      name: 'Eraser',
      title: '橡皮擦 (E)',
      description: '点击按下并拖动清除图像。',
      parameter: [{
        key: 3,
        title: '宽度',
        choose: 8
      }]
    },
    // {
    //   name: 'ZoomMiro',
    //   title: '放大镜 (O)',
    //   description: '左击局部放大图像，右击局部缩小图像。',
    //   parameter: []
    // },
    {
      name: 'SelectCut',
      title: '裁剪 (C)',
      description: '点击按下并拖动选择需要裁剪的图像。',
      parameter: []
    },
    {
      name: 'Text',
      title: '文本 (T)',
      description: '左击放置文本光标，然后输入文字。',
      parameter: [{
        key: 0,
        title: '字体',
        choose: '微软雅黑',
        optional: ['微软雅黑', '宋体', '楷体', '隶书', '新宋体', '幼圆', '仿宋', '黑体', '华文彩云', 'Arial', 'Arial Black', 'Batang', 'Bell MT', 'Courier New', 'Courier', 'Calibri']
      }, {
        key: 0,
        title: '字号',
        choose: 8,
        optional: [8, 9, 10, 11, 12, 14, 16, 18, 20, 22, 24, 26, 28, 26, 48, 72]
      }, {
        key: 1,
        title: '加粗',
        isCheck: false
      }, {
        key: 1,
        title: '倾斜',
        isCheck: false
      }, {
        key: 1,
        title: '下划线',
        isCheck: false
      }, {
        key: 1,
        title: '删除线',
        isCheck: false
      }, {
        key: 0,
        title: '对齐',
        choose: '左对齐',
        optional: ['左对齐', '居中', '右对齐']
      }]
    },
    {
      name: 'Line',
      title: '直线 (L)',
      description: '左击并且拖动绘制直线。',
      parameter: [{
        key: 3,
        title: '笔头大小',
        choose: 1
      }, {
        key: 3,
        title: '不透明度',
        choose: '100%'
      }, {
        key: 0,
        title: '笔头样式',
        choose: '粗',
        optional: ['粗', '圆', '平']
      }, {
        key: 3,
        title: '模糊程度',
        choose: '1%'
      }, {
        key: 0,
        title: '线条样式',
        choose: '实线',
        optional: ['实线', '虚线1', '虚线2', '虚线3']
      }]
    },
    // {
    //   name: 'Curve',
    //   title: '曲线 (V)',
    //   description: '左击并且拖动绘制直线，然后选择点拖动变为曲线。',
    //   parameter: [{
    //     key: 3,
    //     title: '笔头大小',
    //     choose: 1
    //   }, {
    //     key: 3,
    //     title: '不透明度',
    //     choose: '100%'
    //   }, {
    //     key: 0,
    //     title: '笔头样式',
    //     choose: '粗',
    //     optional: ['粗', '圆', '平']
    //   }, {
    //     key: 3,
    //     title: '模糊程度',
    //     choose: '1%'
    //   }]
    // },
    {
      name: 'Rectangle',
      title: '矩形 (R)',
      description: '左击并且拖动绘制矩形。',
      parameter: [{
        key: 3,
        title: '笔头大小',
        choose: 1
      }, {
        key: 3,
        title: '不透明度',
        choose: '100%'
      }, {
        key: 3,
        title: '模糊程度',
        choose: '1%'
      }, {
        key: 1,
        title: '是否填充',
        isCheck: false
      }, {
        key: 1,
        title: '是否圆角',
        isCheck: false
      }]
    },
    {
      name: 'Ellipse',
      title: '椭圆 (I)',
      description: '左击并且拖动绘制椭圆。',
      parameter: [{
        key: 3,
        title: '笔头大小',
        choose: 1
      }, {
        key: 3,
        title: '不透明度',
        choose: '100%'
      }, {
        key: 3,
        title: '模糊程度',
        choose: '1%'
      }, {
        key: 1,
        title: '是否填充',
        isCheck: false
      }, {
        key: 1,
        title: '是否圆',
        isCheck: false
      }]
    },
    {
      name: 'Triangle',
      title: '三角形 (G)',
      description: '左击并且拖动绘制三角形。',
      parameter: [{
        key: 3,
        title: '笔头大小',
        choose: 1
      }, {
        key: 3,
        title: '不透明度',
        choose: '100%'
      }, {
        key: 3,
        title: '模糊程度',
        choose: '1%'
      }, {
        key: 1,
        title: '是否填充',
        isCheck: false
      }, {
        key: 0,
        title: '三角形',
        choose: '直角三角形',
        optional: ['直角三角形', '等腰三角形']
      }]
    }
    // {
    //   name: 'Polygon',
    //   title: '多边形 (Y)',
    //   description: '左击并且拖动绘制多边形。 尺寸：464x146',
    //   parameter: [{
    //     key: 3,
    //     title: '笔头大小',
    //     choose: 1
    //   }, {
    //     key: 3,
    //     title: '不透明度',
    //     choose: '100%'
    //   }, {
    //     key: 3,
    //     title: '模糊程度',
    //     choose: '1%'
    //   }, {
    //     key: 1,
    //     title: '是否填充',
    //     isCheck: false
    //   }, {
    //     key: 1,
    //     title: '是否为正多变形',
    //     isCheck: false
    //   }]
    // },
    // {
    //   name: 'OtherShap',
    //   title: '其他形状 (W)',
    //   description: '左击并且拖动绘制选择的形状。 尺寸：464x146',
    //   parameter: [{
    //     key: 3,
    //     title: '笔头大小',
    //     choose: 1
    //   }, {
    //     key: 3,
    //     title: '不透明度',
    //     choose: '100%'
    //   }, {
    //     key: 3,
    //     title: '模糊程度',
    //     choose: '1%'
    //   }, {
    //     key: 1,
    //     title: '是否填充',
    //     isCheck: false
    //   }, {
    //     key: 0,
    //     title: '选择形状',
    //     choose: '箭头',
    //     optional: ['箭头', '花', '人物', '太阳']
    //   }]
    // },
    // {
    //   name: 'Clone',
    //   title: '图章 (X)',
    //   description: '按Ctrl键的同时左击选择物体，然后左键拖动复制。 尺寸：464x146',
    //   parameter: [{
    //     key: 3,
    //     title: '宽度',
    //     choose: 8
    //   }]
    // },
    // {
    //   name: 'Alpha',
    //   title: '透明度 (D)',
    //   description: '点击减淡或加深按钮改变图像透明度。 尺寸：464x146',
    //   parameter: [{
    //     // 透明度
    //     key: 2,
    //     imgName: ['edit_add', 'edit_remove']
    //   }, {
    //     key: 3,
    //     title: '调节比例',
    //     choose: '1%'
    //   }]
    // }
  ]
  export default tools
  