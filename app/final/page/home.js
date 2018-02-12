import React from 'react';
var FontAwesome = require('react-fontawesome');
import ReactDOM from 'react-dom';
import ImaFigure from '../components/imaFigure';
import ContronllerUnit from '../components/contronllerUnit';
import {Link, hashHistory} from 'react-router';

require('./home.less')
let Home = React.createClass({
  // 获取区间内的一个随机值
  getRangeRandom(low, high) {
    return Math.ceil(Math.random() * (high - low) + low)
  },
  getInitialState: function () {
    return {
      imgsArrangeArr: [],
      packUp: false
    }
  },
  componentDidMount: function () {

  },
  aboutMeFin(e) {
    hashHistory.push('/about')
    e.stopepropagation
  },
  packUpFun() {
    this.setState({
      packUp: !this.state.packUp
    })
  },
  render() {
    return (
      <header className="body-header">
        <div className="banner-text-box" id={`${this.state.packUp?'folded': ''}`}>
          <h1 className="banner-title">guoger's blog</h1>
          <h1 className="sub-title">爱吃的孩子才是好孩子</h1>
          <span onClick={this.aboutMeFin} className="banner-button"><h2>了解我</h2></span>
          <div onClick={this.packUpFun} id="up-arrow" className={`${this.state.packUp?'img-down': 'img-up'}`}>
          </div>
        </div>
        <div className="header-bac"></div>
      </header>
    )
  }
})


export default Home;
