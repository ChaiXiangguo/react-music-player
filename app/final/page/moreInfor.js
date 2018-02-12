import React from 'react';
require('./moreInfor.less')
var FontAwesome = require('react-fontawesome');
let moreInfor = React.createClass({
  render() {
    return (
      <div>
        <div className="blue-section">
          <h2 className="blue-name">读万卷书 行万里路</h2>  
          <h2>近游不广，浅游不奇，便游不畅，群游不久，自非置身物外，弃绝百事而孤行其意，虽游，弗游也</h2>
          <div className="rhombus-box">
              <span><FontAwesome name='diamond' size="3x" tag="i"></FontAwesome></span>
              <span><FontAwesome name='heart-o' size="3x" tag="i"></FontAwesome></span>
              <span><FontAwesome name='code' size="3x" tag="i"></FontAwesome></span>
          </div>
        </div>
        <div className="gray-section1">
            <img src="static/images/1.jpg"></img>
        </div>
        <div className="gray-section2">
          <img src="static/images/2.jpg"></img>
        </div>
        <div className="gray-section1">
          <img src="static/images/3.jpg"></img>        
        </div>
        <div className="violet-section">
            <h2 className="violet-title">自我介绍</h2>
            <hr/>
            <h2 className="violet-vice">近游不广，浅游不奇，便游不畅，群游不</h2>
            <div className="list-box">
              <span></span>
              <span></span>
              <span></span>
              <span></span>
            </div>
        </div>
        <footer className="footer-section">
          <div className="text-box">
            <div className="text-part">
              <h2>爱我就养我</h2>
            </div>
            <div className="button-part">
              <input className="button-money" type="button" value="给钱"/>
              <input className="button-eat" type="button" value="给吃的"/>
            </div>
          </div>
          <div className="foot-infor"></div>
        </footer>
      </div>
    );
  }
});

export default moreInfor;