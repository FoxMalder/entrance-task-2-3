import "./../css/tiny-slider.css"
import { tns } from "./../../node_modules/tiny-slider/src/tiny-slider"

function initSlider(tag, params){
  console.log(tag, params);
  let args = {
    container: tag + ' .slider',
    loop: false,
    rewind: params.rewind,
    items: params.items,
    slideBy: 1,
    touch: true,
    mouseDrag: true,
    autoplay: false,
    nav: false,
    controls: true,
    elastic:true,
    responsive: {
      0: {
        axis: 'horizontal',
        controls: false,
        fixedWidth: 200,
        gutter: 0
      },
      376: {        
        axis: params.axis,
        //fixedWidth: 200,    
        //gutter: 15,
        controls: true
      }
    }
  }

  if(params.prevButton) args.prevButton = tag + params.prevButton
  if(params.nextButton) args.nextButton = tag + params.nextButton
  //if(params.axis == 'vertical') args.nested = 'outer'
  var slider = tns(args);


  }


export default initSlider;