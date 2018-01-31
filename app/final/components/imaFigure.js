import React from 'react';
let ImaFigure = React.createClass({

    render() {
        return (
           <div>
              <img src={this.props.data.imageUrl}/>
              <span>
                <h2>ww</h2>
              </span>
           </div>
        )
    }
});

export default ImaFigure;