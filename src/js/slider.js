import "./../css/tiny-slider.css"
import { tns } from "./../../node_modules/tiny-slider/src/tiny-slider"

function initSlider(tag, params){
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
    fixedWidth: 200,
    gutter: 15,
    axis: document.documentElement.clientWidth > 1200 ? params.axis : 'horizontal',
    responsive: {
      0: {
        controls: false
      },
      376 : {        
        controls: true
      },
    }
  }

  if(params.prevButton) args.prevButton = tag + params.prevButton
  if(params.nextButton) args.nextButton = tag + params.nextButton
  //if(params.axis == 'vertical') args.nested = 'outer'
  var slider = tns(args);
  return slider;


  }


export default initSlider;
