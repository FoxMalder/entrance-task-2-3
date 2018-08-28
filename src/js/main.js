import briefCard from './popup';
console.log("loading js");

briefCard('#main-info__brief-cards-list', '#modals-container__main-info', '/data/main-info.json', '', true);
briefCard('#favorite-scenarios__scenarios-list', '#modals-container__favorite-scenarios', '/data/scenarios.json', 'short');
briefCard('#favorite-devices__devices-list', '#modals-container__favorite-devices', '/data/devices.json', '', true);

document.querySelector('.color-button-list__item--toggle').addEventListener('click', (e) => {
  e.target.closest('.color-button-list').querySelector('.color-button-list-wrapper').classList.toggle('color-button-list-wrapper--show')
})

let menuToggler = document.querySelector('#toggle')
menuToggler.addEventListener('click', (e) => {
  menuToggler.classList.toggle('page-header__nav-toggle-button--menu-open')
  document.querySelector('.page-header__nav-list-container').classList.toggle('page-header__nav-list-container--show')
})
