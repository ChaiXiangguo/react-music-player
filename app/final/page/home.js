import React from 'react';
import ImaFigure from '../components/imaFigure';
var imageData = require('../data/imageData.json') 
var imageDatas = (function genImageUrl(imgArr) {
  for (var i = 0; i < imgArr.length; i++) {
    imgArr[i].imgUrl = '../images/' + imgArr[i].fileName
  }
  return imgArr
})(imageData)
let Home = React.createClass({
    render() {
      var imaFigures = []
      imageDatas.forEach((element, key) => {
        imaFigures.push(<ImaFigure data={element} key={key}/>)
      });
      return (
        <section className="stage">
           <section className="img-sec" >
           {imaFigures}
           </section> 
        </section>
      )
    }
})


export default Home;
