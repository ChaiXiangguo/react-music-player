import React from 'react';
require('./moreInfor.less')

let moreInfor = React.createClass({
  render() {
    return (
      <div>
        <div className="blue-section"></div>
        <div className="gray-section1"></div>
        <div className="gray-section2"></div>
        <div className="gray-section1"></div>
        <div className="violet-section"></div>
        <footer className="footer-section">
          <div className="text-box">
            <div className="text-part">
              <h2>爱我就养我</h2>
            </div>
            <div className="button-part">
              <input className="button-part" type="button" value="给钱"/>
              <input className="button-part" type="button" value="给吃的"/>
            </div>
          </div>
          <div className="foot-infor"></div>
        </footer>
      </div>
    );
  }
});

export default moreInfor;