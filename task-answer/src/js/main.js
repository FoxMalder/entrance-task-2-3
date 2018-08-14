console.log("loading js");
/* Code just for some btton enteractivity not for production.
   For production use slider */
let top = 0,
    topMax = document.querySelector('.main-info__brief-cards-list').childElementCount * (-135);

document.querySelector('#brief-cards-next').addEventListener('click', (e) => {
  e.preventDefault();
  let list = document.querySelector('.main-info__brief-cards-list');
  top -= 135
  if(top > topMax)
    list.style.transform = `translateY(${top}px)`  
})

import popup from './popup'

popup('#favorite-scenarios__scenarios-list', '#modals-container__favorite-scenarios', '/data/scenarios.json', 'short');
popup('#favorite-devices__devices-list', '#modals-container__favorite-devices', '/data/devices.json', '', true);