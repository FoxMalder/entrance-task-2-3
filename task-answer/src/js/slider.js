/* import $ from 'jquery';
import slick from 'slick-carousel';

= window.slick = require('slick-carousel')

$(document).ready(function(){
  $('#favorite-devices__devices-list').slick({
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    prevArrow: '#favorite-devices__devices-list .brief-cards-list-nav__item-prev',
    nextArrow: '#favorite-devices__devices-list .brief-cards-list-nav__item-next'
  })
  console.log(slick, $('#favorite-devices__devices-list').slick('slickCurrentSlide'));
}) */
/* import $ from 'jquery';

import 'owl.carousel/dist/assets/owl.carousel.css';
//$.fn.owlCarousel = require('owl.carousel');
//$( '#favorite-devices__devices-list' ).owlCarousel();
import 'owl.carousel'; */

/*import 'flickity/dist/flickity.css'
import Flickity from 'flickity'

var flkty = new Flickity('#favorite-devices__devices-list');
flkty.next();
flkty.select( 3 );*/  

import "./../css/tiny-slider.css"
import { tns } from "./../../node_modules/tiny-slider/src/tiny-slider"

function initSlider(tag, params){
  console.log(tag, params);
  let args = {
    container: tag + ' .slider',
    axis: params.axis,
    loop: false,
    rewind: params.rewind,
    items: params.items,
    fixedWidth: 200,
    gutter: 15,
    slideBy: 1,
    touch: true,
    mouseDrag: true,
    autoplay: false,
    nav: false,
    controls: true,
    elastic:true
  }

  if(params.prevButton) args.prevButton = tag + params.prevButton
  if(params.nextButton) args.nextButton = tag + params.nextButton
  //if(params.axis == 'vertical') args.nested = 'outer'
  var slider = tns(args);


  }


export default initSlider;