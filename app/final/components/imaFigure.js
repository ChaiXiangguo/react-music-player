import React from 'react';
require('./imafigure.less');
let ImaFigure = React.createClass({
    render() {
        var styleObj = {}
        if (this.props.arrange.pos) {
            styleObj = this.props.arrange.pos
        }
        if (this.props.arrange.rotate) {
            styleObj['transform'] = 'rotate(' + this.props.arrange.rotate + 'deg)'
        }
        return (
           <div className="img-figure" style ={styleObj}>
              <img src={this.props.data.imgUrl}/>
              <span className="title-box">
                <h2 className="img-title">{this.props.data.title}</h2>
              </span>
           </div>
        )
    }
});

export default ImaFigure;