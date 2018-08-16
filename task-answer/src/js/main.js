import $ from 'jquery';
import slick from 'slick-carousel';
import briefCard from './popup';
console.log("loading js");
/* Code just for some btton enteractivity not for production.
   For production use slider */

let top = 0
document.querySelector('#brief-cards-next').addEventListener('click', (e) => {
  let topMax = document.querySelector('.main-info__brief-cards-list').childElementCount * (-135);
  e.preventDefault();
  console.log(topMax);
  let list = document.querySelector('.main-info__brief-cards-list');
  top -= 135
  if(top > topMax)
    list.style.transform = `translateY(${top}px)`  
})


briefCard('#main-info__brief-cards-list', '#modals-container__main-info', '/data/main-info.json', '', true);
briefCard('#favorite-scenarios__scenarios-list', '#modals-container__favorite-scenarios', '/data/scenarios.json', 'short');
briefCard('#favorite-devices__devices-list', '#modals-container__favorite-devices', '/data/devices.json', '', true);