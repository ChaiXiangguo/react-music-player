import React from 'react';
import ReactDOM from 'react-dom';
import ImaFigure from '../components/imaFigure';
import ContronllerUnit from '../components/contronllerUnit';
import { Link, hashHistory } from 'react-router';
var digit = require('../data/digit.js')
var balls = [];
var WINDOW_WIDTH = 1024;
var WINDOW_HEIGHT = 768;
var RADIUS = 8;
var MARGIN_TOP = 60;
var MARGIN_LEFT = 30;
var interval
const colors = ["#33B5E5", "#0099CC", "#AA66CC", "#9933CC", "#99CC00", "#669900", "#FFBB33", "#FF8800", "#FF4444", "#CC0000"]

require('./home.less')
let Home = React.createClass({
  // 获取区间内的一个随机值
  getRangeRandom(low, high) {
    return Math.ceil(Math.random() * (high - low) + low)
  },
  getInitialState: function () {
    return {
      imgsArrangeArr: [],
      packUp: false,
      curShowTimeSeconds: new Date()
    }
  },
  componentDidMount: function () {
    balls = []
    WINDOW_WIDTH = document.body.clientWidth > 500 ? 500 : document.body.clientWidth
    WINDOW_HEIGHT = document.body.clientHeight - 50

    MARGIN_LEFT = Math.round(WINDOW_WIDTH / 10);
    RADIUS = Math.round(WINDOW_WIDTH * 4 / 5 / 108) - 1

    MARGIN_TOP = Math.round(WINDOW_HEIGHT / 5);

    var canvas = this.refs.canvasTime;
    var context = canvas.getContext("2d");

    canvas.width = document.body.clientWidth-200;
    canvas.height = WINDOW_HEIGHT;
    interval = setInterval(
      function(){
          this.renderD( context );
          this.update();
      }.bind(this)
      ,
      50
  );
  },
  componentWillMount: function () {

  },
  componentWillUnmount() {
		clearInterval(interval) 
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
  update() {

    var nextShowTimeSeconds = new Date();

    var nextHours = nextShowTimeSeconds.getHours();
    var nextMinutes = nextShowTimeSeconds.getMinutes();
    var nextSeconds = nextShowTimeSeconds.getSeconds();

    var curHours = this.state.curShowTimeSeconds.getHours();
    var curMinutes = this.state.curShowTimeSeconds.getMinutes();
    var curSeconds = this.state.curShowTimeSeconds.getSeconds();

    if (nextSeconds != curSeconds) {
      if (parseInt(curHours / 10) != parseInt(nextHours / 10)) {
        this.addBalls(MARGIN_LEFT + 0, MARGIN_TOP, parseInt(curHours / 10));
      }
      if (parseInt(curHours % 10) != parseInt(nextHours % 10)) {
        this.addBalls(MARGIN_LEFT + 15 * (RADIUS + 1), MARGIN_TOP, parseInt(curHours / 10));
      }

      if (parseInt(curMinutes / 10) != parseInt(nextMinutes / 10)) {
        this.addBalls(MARGIN_LEFT + 39 * (RADIUS + 1), MARGIN_TOP, parseInt(curMinutes / 10));
      }
      if (parseInt(curMinutes % 10) != parseInt(nextMinutes % 10)) {
        this.addBalls(MARGIN_LEFT + 54 * (RADIUS + 1), MARGIN_TOP, parseInt(curMinutes % 10));
      }

      if (parseInt(curSeconds / 10) != parseInt(nextSeconds / 10)) {
        this.addBalls(MARGIN_LEFT + 78 * (RADIUS + 1), MARGIN_TOP, parseInt(curSeconds / 10));
      }
      if (parseInt(curSeconds % 10) != parseInt(nextSeconds % 10)) {
        this.addBalls(MARGIN_LEFT + 93 * (RADIUS + 1), MARGIN_TOP, parseInt(nextSeconds % 10));
      }
      this.setState({
        curShowTimeSeconds: nextShowTimeSeconds
      })
    }

    this.updateBalls();
  },
  addBalls(x, y, num) {
    for (var i = 0; i < digit[num].length; i++)
      for (var j = 0; j < digit[num][i].length; j++)
        if (digit[num][i][j] == 1) {
          var aBall = {
            x: x + j * 2 * (RADIUS + 1) + (RADIUS + 1),
            y: y + i * 2 * (RADIUS + 1) + (RADIUS + 1),
            g: 1.5 + Math.random(),
            vx: Math.pow(-1, Math.ceil(Math.random() * 1000)) * 4,
            vy: -5,
            color: colors[Math.floor(Math.random() * colors.length)]
          }

          balls.push(aBall)
        }
  },
  updateBalls() {

    for (var i = 0; i < balls.length; i++) {

      balls[i].x += balls[i].vx;
      balls[i].y += balls[i].vy;
      balls[i].vy += balls[i].g;

      if (balls[i].y >= WINDOW_HEIGHT - RADIUS) {
        balls[i].y = WINDOW_HEIGHT - RADIUS;
        balls[i].vy = - balls[i].vy * 0.75;
      }
    }

    var cnt = 0
    for (var i = 0; i < balls.length; i++)
      if (balls[i].x + RADIUS > 0 && balls[i].x - RADIUS < document.body.clientWidth-50)
        balls[cnt++] = balls[i]

    while (balls.length > cnt) {
      balls.pop();
    }
  },
  renderD(cxt) {
    cxt.clearRect(0, 0, document.body.clientWidth - 50, WINDOW_HEIGHT);

    var hours = this.state.curShowTimeSeconds.getHours();
    var minutes = this.state.curShowTimeSeconds.getMinutes();
    var seconds = this.state.curShowTimeSeconds.getSeconds();

    this.renderDigit(MARGIN_LEFT, MARGIN_TOP, parseInt(hours / 10), cxt)
    this.renderDigit(MARGIN_LEFT + 15 * (RADIUS + 1), MARGIN_TOP, parseInt(hours % 10), cxt)
    this.renderDigit(MARGIN_LEFT + 30 * (RADIUS + 1), MARGIN_TOP, 10, cxt)
    this.renderDigit(MARGIN_LEFT + 39 * (RADIUS + 1), MARGIN_TOP, parseInt(minutes / 10), cxt);
    this.renderDigit(MARGIN_LEFT + 54 * (RADIUS + 1), MARGIN_TOP, parseInt(minutes % 10), cxt);
    this.renderDigit(MARGIN_LEFT + 69 * (RADIUS + 1), MARGIN_TOP, 10, cxt);
    this.renderDigit(MARGIN_LEFT + 78 * (RADIUS + 1), MARGIN_TOP, parseInt(seconds / 10), cxt);
    this.renderDigit(MARGIN_LEFT + 93 * (RADIUS + 1), MARGIN_TOP, parseInt(seconds % 10), cxt);

    for (var i = 0; i < balls.length; i++) {
      cxt.fillStyle = balls[i].color;

      cxt.beginPath();
      cxt.arc(balls[i].x, balls[i].y, RADIUS, 0, 2 * Math.PI, true);
      cxt.closePath();

      cxt.fill();
    }
  },
  renderDigit(x, y, num, cxt) {
    cxt.fillStyle = "rgb(0,102,153)";
    for (var i = 0; i < digit[num].length; i++)
      for (var j = 0; j < digit[num][i].length; j++)
        if (digit[num][i][j] == 1) {
          cxt.beginPath();
          cxt.arc(x + j * 2 * (RADIUS + 1) + (RADIUS + 1), y + i * 2 * (RADIUS + 1) + (RADIUS + 1), RADIUS, 0, 2 * Math.PI)
          cxt.closePath()
          cxt.fill()
        }
  },
  render() {
    return (
      <header className="body-header">
        <div className="banner-text-box" id={`${this.state.packUp ? 'folded' : ''}`}>
          <h1 className="banner-title">guoger's blog</h1>
          <h1 className="sub-title">爱吃的孩子才是好孩子</h1>
          <span onClick={this.aboutMeFin} className="banner-button"><h2>了解我</h2></span>
          <div onClick={this.packUpFun} id="up-arrow" className={`${this.state.packUp ? 'img-down' : 'img-up'}`}>
          </div>
        </div>
        <div className="header-bac">
          <canvas ref="canvasTime" style={{ height: '100%' }}>
            当前浏览器不支持Canvas，请更换浏览器后再试
          </canvas>
        </div>
      </header>
    )
  }
})


export default Home;
