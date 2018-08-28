import briefCard from './popup';
import filters from './filters';

console.log("loading js");

new Promise ( (res, rej) => {
  briefCard('#main-info__brief-cards-list', '#modals-container__main-info', '/data/main-info.json', '', true);
  briefCard('#favorite-scenarios__scenarios-list', '#modals-container__favorite-scenarios', '/data/scenarios.json', 'short');
  briefCard('#favorite-devices__devices-list', '#modals-container__favorite-devices', '/data/devices.json', '', true, res);
}).then( () => {
    console.log('filters');
    filters('#favorite-devices');
})

document.querySelector('.color-button-list__item--toggle').addEventListener('click', (e) => {
  e.target.closest('.color-button-list').querySelector('.color-button-list-wrapper').classList.toggle('color-button-list-wrapper--show')
})

let menuToggler = document.querySelector('#toggle')
menuToggler.addEventListener('click', (e) => {
  menuToggler.classList.toggle('page-header__nav-toggle-button--menu-open')
  document.querySelector('.page-header__nav-list-container').classList.toggle('page-header__nav-list-container--show')
})
