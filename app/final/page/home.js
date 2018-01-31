import React from 'react';
import ReactDOM from 'react-dom';
import ImaFigure from '../components/imaFigure';
var imageData = require('../data/imageData.json')
var imgsArrangeArr = (function genImageUrl(imgArr) {
  for (var i = 0; i < imgArr.length; i++) {
    imgArr[i].imgUrl = '/static/images/' + imgArr[i].fileName
  }
  return imgArr
})(imageData)
// 获取区间内的一个随机值
function getRangeRandom(low, high) {
  return Math.ceil(Math.random() * (high - low))
}
let Home = React.createClass({
  // 重新布局所有的图片
  rearrange: function(centerIndex) {
    var imgsArrangeArr = this.state.imgsArrangeArr
    imgsArrangeCenterArr = imgsArrangeArr.splice(centerIndex,1)
    //首先居中 centerindex的图片
    imgsArrangeCenterArr[0].pos = centerPos
  },
  getInitialState: function() {
    return {
      imgsArrangeArr: []
    }
  },
  componentDidMount: function() {
     var stageDom = ReactDOM.findDOMNode(this.refs.stage)
     var stageW = stageDom.scrollWidth
     var stageH = stageDom.scrollHeight
     var halfStageW = Math.ceil(stageW/2)
     var halfStageH = Math.ceil(stageH/2)
  },
   render() {
    var imgsArrangeArr = []
    imgsArrangeArr.forEach(function(element, key){
      if(!this.state.imgsArrangeArr[index]) {
          this.state.imgsArrangeArr[index] = {
            pos: {
              left:0,
              top:0
            }
          }
      }
      imgsArrangeArr.push(<ImaFigure data={element} key={key} ref={'imgFigure' + key}/>)
    }.bind(this));
    return (
      <section className="stage" ref="stage">
        <section className="img-sec" >
          {imgsArrangeArr}
        </section>
      </section>
    )
  }
})


export default Home;
