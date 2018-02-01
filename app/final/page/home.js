import React from 'react';
import ReactDOM from 'react-dom';
import ImaFigure from '../components/imaFigure';
// React.initializeTouchEvents(true)
var imageData = require('../data/imageData.json')
var imgsFigures = (function genImageUrl(imgArr) {
  for (var i = 0; i < imgArr.length; i++) {
    imgArr[i].imgUrl = '/static/images/' + imgArr[i].fileName
  }
  return imgArr
})(imageData)
let Home = React.createClass({
  Constant: {
    centerPos: {
      left: 0,
      right: 0,
      zIndex: 0,
      filter: 'grayscale(0)'
    },
    otherPos: {
      left: 0,
      right: 0
    },
    arrangeXS: 0,
    arrangeXB: 0,
    arrangeYB: 0,
    arrangeLS: 0,
    arrangeLB: 0
  },
  touchPosition: {
    startX: 0,
    startY: 0,
  },
  monmentImgIndex: 0,
  // 获取区间内的一个随机值
  getRangeRandom(low, high) {
    return Math.ceil(Math.random() * (high - low) + low)
  },
  getInitialState: function () {
    return {
      imgsArrangeArr: []
    }
  },
  // 重新布局所有的图片
  rearrange: function (centerIndex) {
    var imgsArrangeArr = this.state.imgsArrangeArr
    var imgsArrangeCenterArr = imgsArrangeArr.splice(centerIndex, 1)
    var imgsArrangeLeftArr = imgsArrangeArr.splice(0, 3)
    var imgsArrangeRightArr = imgsArrangeArr.splice(0, 3)
    imgsArrangeCenterArr[0].pos = JSON.parse(JSON.stringify(this.Constant.centerPos))
    imgsArrangeCenterArr[0].rotate = 0
    imgsArrangeLeftArr.forEach((element, key) => {
      element.pos.left = this.getRangeRandom(10, this.Constant.arrangeLS)
      element.pos.top = this.getRangeRandom(10, this.Constant.arrangeYB)
      element.pos.filter = 'grayscale(75%)'
      element.pos.opacity = '0.8'
      element.pos.zIndex = key
      element.rotate = this.getRangeRandom(-30, 30)
    })
    imgsArrangeRightArr.forEach((element, key) => {
      element.pos.zIndex = key
      element.pos.filter = 'grayscale(75%)'
      element.pos.opacity = '0.8'
      element.pos.left = this.getRangeRandom(this.Constant.arrangeXS, this.Constant.arrangeLB)
      element.pos.top = this.getRangeRandom(10, this.Constant.arrangeYB)
      element.rotate = this.getRangeRandom(-30, 30)
    })
    imgsArrangeArr[0].pos.left = this.getRangeRandom(10, this.Constant.arrangeYB)
    imgsArrangeArr[0].pos.top = this.getRangeRandom(10, this.Constant.arrangeYB)
    imgsArrangeArr[0].pos.filter = 'grayscale(75%)'
    imgsArrangeArr[0].pos.opacity = '0.8'
    imgsArrangeArr[0].pos.zIndex = 0
    imgsArrangeArr[0].rotate = this.getRangeRandom(-30, 30)
    imgsArrangeArr.splice(0, 0, imgsArrangeRightArr[0], imgsArrangeRightArr[1], imgsArrangeRightArr[2])
    imgsArrangeArr.splice(0, 0, imgsArrangeLeftArr[0], imgsArrangeLeftArr[1], imgsArrangeLeftArr[2])
    imgsArrangeArr.splice(centerIndex, 0, imgsArrangeCenterArr[0])
    this.setState({
      imgsArrangeArr: imgsArrangeArr
    })
  },
  componentDidMount: function () {
    var stageDom = ReactDOM.findDOMNode(this.refs.stage)
    var stageW = stageDom.offsetWidth
    var stageH = stageDom.offsetHeight
    var halfStageW = Math.ceil(stageW / 2)
    var halfStageH = Math.ceil(stageH / 2)
    //获取一个图片大小
    var imgFigureDOM = ReactDOM.findDOMNode(this.refs.imgFigure0),
      imgW = imgFigureDOM.offsetWidth,
      imgH = imgFigureDOM.offsetHeight,
      halfImgW = Math.ceil(imgW / 2),
      halfImgH = Math.ceil(imgH / 2)
    this.Constant.centerPos = {
      left: halfStageW - halfImgW,
      top: halfStageH - halfImgH,
      zIndex: 10
    }
    this.Constant.arrangeXS = halfStageW - halfImgW
    this.Constant.arrangeXB = stageW - halfImgW
    this.Constant.arrangeYB = stageH - imgH - 10
    this.Constant.arrangeLS = halfStageW - imgW
    this.Constant.arrangeLB = stageW - 10
    this.rearrange(this.monmentImgIndex)
  },
  imgTouchStart(e) {
    this.touchPosition.startX = e.touches[0].pageX
  },
  imgTouchEnd(e) {
    if (Math.abs(e.changedTouches[0].pageX - this.touchPosition.startX) > 5) {
      if (e.changedTouches[0].pageX - this.touchPosition.startX > 0) {
        --this.monmentImgIndex < 0 ? this.monmentImgIndex = 7 : this.monmentImgIndex
      } else {
        ++this.monmentImgIndex > 7 ? this.monmentImgIndex = 0 : this.monmentImgIndex
      }
      this.rearrange(this.monmentImgIndex)
    }
  },
  render() {
    var imgsArrangeArrs = []
    imgsFigures.forEach(function (element, key) {
      if (!this.state.imgsArrangeArr[key]) {
        this.state.imgsArrangeArr[key] = {
          pos: {
            left: 0,
            top: 0
          },
          rotate: 0
        }
      }
      imgsArrangeArrs.push(<ImaFigure data={element} key={key} ref={'imgFigure' + key} arrange={this.state.imgsArrangeArr[key]} />)
    }.bind(this));
    return (
      <div onTouchStart={this.imgTouchStart} onTouchEnd={this.imgTouchEnd} className="stage" ref="stage">
        <section className="img-sec" >
          {imgsArrangeArrs}
          <div className="bac-haden"></div>
        </section>
      </div>
    )
  }
})


export default Home;
