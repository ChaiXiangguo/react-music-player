import React from 'react';
import ReactDOM from 'react-dom';
import ImaFigure from '../components/imaFigure';
import ContronllerUnit from '../components/contronllerUnit';
import Navi from '../components/navi';
import {Link} from 'react-router';

var FontAwesome = require('react-fontawesome');
let Home = React.createClass({
  // 获取区间内的一个随机值
  getRangeRandom(low, high) {
    return Math.ceil(Math.random() * (high - low) + low)
  },
  getInitialState: function () {
    return {
      imgsArrangeArr: []
    }
  },
  componentDidMount: function () {

  },
  imgTouchStart(e) {

  },
  render() {
    return (
      <header className="body-header">
        <Navi/>
        {/*<div className="banner-text-box">
          <h1 className="banner-title">guoger's blog</h1>
          <h1 className="sub-title">爱吃的孩子才是好孩子</h1>
          <span className="banner-button"><Link  to="/about">了解我</Link></span>
        </div>
        <div className="header-bac"></div>*/}
      </header>
    )
  }
})


export default Home;
