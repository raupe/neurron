/**
 * Adobe Edge: symbol definitions
 */
(function($, Edge, compId){
//images folder
var im='images/';

var fonts = {};


var resources = [
];
var symbols = {
"stage": {
   version: "1.0.0",
   minimumCompatibleVersion: "0.1.7",
   build: "1.0.1.204",
   baseState: "Base State",
   initialState: "Base State",
   gpuAccelerate: false,
   resizeInstances: false,
   content: {
         dom: [
         {
            id:'red',
            type:'image',
            rect:['0','0','630px','360px','auto','auto'],
            fill:["rgba(0,0,0,0)",im+"red.jpg",'0px','0px']
         },
         {
            id:'tv',
            type:'image',
            rect:['-481px','22px','456px','280px','auto','auto'],
            fill:["rgba(0,0,0,0)",im+"tv.png",'0px','0px']
         },
         {
            id:'neurron2',
            type:'image',
            rect:['120px','79px','223px','176px','auto','auto'],
            fill:["rgba(0,0,0,0)",im+"neurron2.png",'0px','0px'],
            transform:[[],['0deg']]
         },
         {
            id:'i5',
            type:'image',
            rect:['251px','167px','243px','194px','auto','auto'],
            fill:["rgba(0,0,0,0)",im+"i5.png",'0px','0px']
         },
         {
            id:'swipe2',
            type:'image',
            rect:['343px','190px','138px','148px','auto','auto'],
            fill:["rgba(0,0,0,0)",im+"swipe.png",'0px','0px']
         },
         {
            id:'arm2',
            type:'image',
            rect:['396px','127px','278px','201px','auto','auto'],
            fill:["rgba(0,0,0,0)",im+"arm2.png",'0px','0px'],
            transform:[[],['-31deg']]
         },
         {
            id:'steve',
            type:'image',
            rect:['396px','6px','234px','360px','auto','auto'],
            fill:["rgba(0,0,0,0)",im+"steve.png",'0px','0px']
         },
         {
            id:'iris',
            type:'image',
            rect:['489px','127px','53px','51px','auto','auto'],
            fill:["rgba(0,0,0,0)",im+"iris.png",'0px','0px']
         },
         {
            id:'brille',
            type:'image',
            rect:['435px','94px','155px','102px','auto','auto'],
            fill:["rgba(0,0,0,0)",im+"brille.png",'0px','0px']
         },
         {
            id:'Text',
            type:'text',
            rect:['105px','139px','456px','194px','auto','auto'],
            text:"swype half circles<br>on your display",
            align:"center",
            font:['Tahoma, Geneva, sans-serif',35,"rgba(255,255,255,1.00)","700","none",""]
         }],
         symbolInstances: [

         ]
      },
   states: {
      "Base State": {
         "${_tv}": [
            ["style", "top", '27px'],
            ["style", "opacity", '1'],
            ["style", "left", '-463px']
         ],
         "${_steve}": [
            ["style", "top", '6px'],
            ["style", "opacity", '0'],
            ["style", "left", '396px']
         ],
         "${_brille}": [
            ["style", "top", '94px'],
            ["style", "opacity", '0'],
            ["style", "left", '435px']
         ],
         "${_i5}": [
            ["style", "top", '370px'],
            ["style", "opacity", '1'],
            ["style", "left", '338px']
         ],
         "${_iris}": [
            ["style", "top", '127px'],
            ["style", "opacity", '0'],
            ["style", "left", '489px']
         ],
         "${_neurron2}": [
            ["transform", "rotateZ", '0deg'],
            ["transform", "scaleX", '0.76682'],
            ["style", "opacity", '0'],
            ["style", "left", '120px'],
            ["style", "width", '223px'],
            ["style", "top", '79px'],
            ["transform", "scaleY", '0.76682'],
            ["style", "height", '176.1975308642px']
         ],
         "${_Text}": [
            ["style", "top", '139px'],
            ["style", "opacity", '0'],
            ["style", "text-align", 'center'],
            ["style", "font-weight", '700'],
            ["color", "color", 'rgba(255,255,255,1.00)'],
            ["style", "font-family", 'Tahoma, Geneva, sans-serif'],
            ["style", "left", '105px'],
            ["style", "font-size", '35px']
         ],
         "${_swipe2}": [
            ["style", "top", '190px'],
            ["style", "opacity", '0'],
            ["style", "left", '343px']
         ],
         "${_Stage}": [
            ["color", "background-color", 'rgba(255,255,255,1)'],
            ["style", "width", '630px'],
            ["style", "height", '360px'],
            ["style", "overflow", 'hidden']
         ],
         "${_arm2}": [
            ["style", "top", '127px'],
            ["transform", "rotateZ", '-31deg'],
            ["style", "opacity", '0'],
            ["style", "left", '396px'],
            ["style", "-webkit-transform-origin", [50,50], {valueTemplate:'@@0@@% @@1@@%'} ],
            ["style", "-moz-transform-origin", [50,50],{valueTemplate:'@@0@@% @@1@@%'}],
            ["style", "-ms-transform-origin", [50,50],{valueTemplate:'@@0@@% @@1@@%'}],
            ["style", "msTransformOrigin", [50,50],{valueTemplate:'@@0@@% @@1@@%'}],
            ["style", "-o-transform-origin", [50,50],{valueTemplate:'@@0@@% @@1@@%'}]
         ]
      }
   },
   timelines: {
      "Default Timeline": {
         fromState: "Base State",
         toState: "",
         duration: 14757.679678421,
         autoPlay: true,
         timeline: [
            { id: "eid12", tween: [ "style", "${_i5}", "left", '246px', { fromValue: '338px'}], position: 2474, duration: 220 },
            { id: "eid60", tween: [ "style", "${_i5}", "left", '289px', { fromValue: '246px'}], position: 2694, duration: 80 },
            { id: "eid84", tween: [ "style", "${_steve}", "opacity", '1', { fromValue: '0.000000'}], position: 1588, duration: 355 },
            { id: "eid244", tween: [ "style", "${_steve}", "opacity", '0', { fromValue: '1'}], position: 11233, duration: 381 },
            { id: "eid129", tween: [ "style", "${_swipe2}", "opacity", '1', { fromValue: '0.000000'}], position: 4493, duration: 323 },
            { id: "eid142", tween: [ "style", "${_swipe2}", "opacity", '0', { fromValue: '0.595137'}], position: 5214, duration: 850 },
            { id: "eid178", tween: [ "style", "${_swipe2}", "opacity", '1', { fromValue: '0.000000'}], position: 6890, duration: 323 },
            { id: "eid179", tween: [ "style", "${_swipe2}", "opacity", '0', { fromValue: '0.595137'}], position: 7611, duration: 850 },
            { id: "eid213", tween: [ "style", "${_swipe2}", "opacity", '1', { fromValue: '0.000000'}], position: 9093, duration: 323 },
            { id: "eid214", tween: [ "style", "${_swipe2}", "opacity", '0', { fromValue: '0.595137'}], position: 9814, duration: 850 },
            { id: "eid232", tween: [ "style", "${_swipe2}", "opacity", '0', { fromValue: '0'}], position: 10890, duration: 0 },
            { id: "eid240", tween: [ "style", "${_swipe2}", "opacity", '0', { fromValue: '0'}], position: 11156, duration: 0 },
            { id: "eid141", tween: [ "transform", "${_neurron2}", "rotateZ", '59deg', { fromValue: '0deg'}], position: 5144, duration: 244 },
            { id: "eid209", tween: [ "transform", "${_neurron2}", "rotateZ", '126deg', { fromValue: '59deg'}], position: 7403, duration: 301 },
            { id: "eid217", tween: [ "transform", "${_neurron2}", "rotateZ", '59deg', { fromValue: '126deg'}], position: 9579, duration: 294 },
            { id: "eid109", tween: [ "transform", "${_arm2}", "rotateZ", '40deg', { fromValue: '-31deg'}], position: 4402, duration: 384 },
            { id: "eid151", tween: [ "transform", "${_arm2}", "rotateZ", '-48deg', { fromValue: '40deg'}], position: 5566, duration: 130 },
            { id: "eid177", tween: [ "transform", "${_arm2}", "rotateZ", '55deg', { fromValue: '-48deg'}], position: 6738, duration: 430 },
            { id: "eid212", tween: [ "transform", "${_arm2}", "rotateZ", '-40deg', { fromValue: '55deg'}], position: 9019, duration: 368 },
            { id: "eid196", tween: [ "transform", "${_neurron2}", "scaleX", '0.76682', { fromValue: '0.76682'}], position: 3515, duration: 0 },
            { id: "eid269", tween: [ "style", "${_Text}", "opacity", '1', { fromValue: '0'}], position: 11877, duration: 370 },
            { id: "eid261", tween: [ "style", "${_Text}", "opacity", '0', { fromValue: '1'}], position: 12247, duration: 0 },
            { id: "eid262", tween: [ "style", "${_Text}", "opacity", '1', { fromValue: '0'}], position: 12248, duration: 13 },
            { id: "eid267", tween: [ "style", "${_Text}", "opacity", '0', { fromValue: '1'}], position: 14426, duration: 332 },
            { id: "eid86", tween: [ "style", "${_arm2}", "opacity", '1', { fromValue: '0.000000'}], position: 1595, duration: 355 },
            { id: "eid250", tween: [ "style", "${_arm2}", "opacity", '0', { fromValue: '1'}], position: 11233, duration: 381 },
            { id: "eid5", tween: [ "style", "${_tv}", "left", '9px', { fromValue: '-463px'}], position: 339, duration: 233 },
            { id: "eid89", tween: [ "style", "${_tv}", "left", '-21px', { fromValue: '9px'}], position: 572, duration: 138 },
            { id: "eid90", tween: [ "style", "${_tv}", "left", '8.88px', { fromValue: '-21px'}], position: 710, duration: 59 },
            { id: "eid138", tween: [ "style", "${_neurron2}", "top", '79px', { fromValue: '79px'}], position: 5144, duration: 0 },
            { id: "eid13", tween: [ "style", "${_i5}", "top", '193px', { fromValue: '370px'}], position: 2474, duration: 220 },
            { id: "eid61", tween: [ "style", "${_i5}", "top", '167px', { fromValue: '193px'}], position: 2694, duration: 80 },
            { id: "eid85", tween: [ "style", "${_brille}", "opacity", '1', { fromValue: '0.000000'}], position: 1586, duration: 355 },
            { id: "eid248", tween: [ "style", "${_brille}", "opacity", '0', { fromValue: '1'}], position: 11226, duration: 381 },
            { id: "eid105", tween: [ "style", "${_iris}", "left", '482px', { fromValue: '489px'}], position: 3988, duration: 124 },
            { id: "eid136", tween: [ "style", "${_iris}", "left", '480px', { fromValue: '482px'}], position: 4851, duration: 541 },
            { id: "eid157", tween: [ "style", "${_iris}", "left", '490px', { fromValue: '480px'}], position: 5880, duration: 35 },
            { id: "eid163", tween: [ "style", "${_iris}", "left", '483px', { fromValue: '490px'}], position: 6606, duration: 52 },
            { id: "eid180", tween: [ "style", "${_iris}", "left", '480px', { fromValue: '482px'}], position: 7169, duration: 541 },
            { id: "eid181", tween: [ "style", "${_iris}", "left", '490px', { fromValue: '480px'}], position: 8198, duration: 35 },
            { id: "eid182", tween: [ "style", "${_iris}", "left", '477.88px', { fromValue: '490px'}], position: 8925, duration: 52 },
            { id: "eid223", tween: [ "style", "${_iris}", "left", '479.87px', { fromValue: '477.88px'}], position: 9373, duration: 183 },
            { id: "eid255", tween: [ "style", "${_iris}", "left", '489.87px', { fromValue: '479.87px'}], position: 10348, duration: 38 },
            { id: "eid197", tween: [ "transform", "${_neurron2}", "scaleY", '0.76682', { fromValue: '0.76682'}], position: 3515, duration: 0 },
            { id: "eid100", tween: [ "style", "${_neurron2}", "opacity", '1', { fromValue: '0.000000'}], position: 3276, duration: 175 },
            { id: "eid249", tween: [ "style", "${_neurron2}", "opacity", '0', { fromValue: '1'}], position: 11233, duration: 381 },
            { id: "eid87", tween: [ "style", "${_iris}", "opacity", '1', { fromValue: '0.000000'}], position: 1588, duration: 355 },
            { id: "eid246", tween: [ "style", "${_iris}", "opacity", '0', { fromValue: '1'}], position: 11233, duration: 381 },
            { id: "eid245", tween: [ "style", "${_i5}", "opacity", '0', { fromValue: '1'}], position: 11233, duration: 381 },
            { id: "eid247", tween: [ "style", "${_tv}", "opacity", '0', { fromValue: '1'}], position: 11226, duration: 381 },
            { id: "eid106", tween: [ "style", "${_iris}", "top", '134px', { fromValue: '127px'}], position: 3988, duration: 131 },
            { id: "eid135", tween: [ "style", "${_iris}", "top", '123px', { fromValue: '134px'}], position: 4851, duration: 539 },
            { id: "eid156", tween: [ "style", "${_iris}", "top", '130px', { fromValue: '123px'}], position: 5880, duration: 35 },
            { id: "eid162", tween: [ "style", "${_iris}", "top", '134px', { fromValue: '130px'}], position: 6606, duration: 52 },
            { id: "eid183", tween: [ "style", "${_iris}", "top", '123px', { fromValue: '134px'}], position: 7169, duration: 539 },
            { id: "eid184", tween: [ "style", "${_iris}", "top", '130px', { fromValue: '123px'}], position: 8198, duration: 35 },
            { id: "eid185", tween: [ "style", "${_iris}", "top", '132.92px', { fromValue: '130px'}], position: 8925, duration: 52 },
            { id: "eid222", tween: [ "style", "${_iris}", "top", '132.12px', { fromValue: '132.92px'}], position: 9373, duration: 183 },
            { id: "eid252", tween: [ "style", "${_iris}", "top", '132.12px', { fromValue: '132.12px'}], position: 10348, duration: 0 },
            { id: "eid254", tween: [ "style", "${_iris}", "top", '132.12px', { fromValue: '132.12px'}], position: 10386, duration: 0 },
            { id: "eid137", tween: [ "style", "${_neurron2}", "left", '120px', { fromValue: '120px'}], position: 5144, duration: 0 }         ]
      }
   }
}
};


Edge.registerCompositionDefn(compId, symbols, fonts, resources);

/**
 * Adobe Edge DOM Ready Event Handler
 */
$(window).ready(function() {
     Edge.launchComposition(compId);
});
})(jQuery, AdobeEdge, "EDGE-33774443");
