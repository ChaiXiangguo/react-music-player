import React from 'react';
require('./imafigure.less');
let ImaFigure = React.createClass({

    render() {
        return (
           <div className="img-figure">
              <img src={this.props.data.imgUrl}/>
              <span className="title-box">
                <h2 className="img-title">{this.props.data.title}</h2>
              </span>
           </div>
        )
    }
});

export default ImaFigure;