import drawSector from './draw-sector.js'
import knob from './knob.js'
import slider from './slider';

const colorButtons = {
  temperature: [
    {text: 'Вручную', active: true},
    {text: 'Холодно', active: false},
    {text: 'Тепло', active: false},
    {text: 'Жарко', active: false}
  ],
  light: [
    {text: 'Вручную', active: true},
    {text: 'Дневной свет', active: false},
    {text: 'Вечерний свет', active: false},
    {text: 'Рассвет', active: false}
  ]
}

var adaptiveSlider;

function _getAppearence(appearence){
  switch(appearence){
    case 'short':
      return 'brief-card--short';
    default:
      return '';
  }
}

function _renderCard(data){
  let card = document.createElement('LI');
  card.className = `brief-card ${data.icon ? 'brief-card--' + data.icon : ''} ${_getAppearence(data.appearence)}`;
  card.innerHTML = _renderTemplate(data, 'briefCardTemplate');
  return card;
}

function _renderModal(data){
  let modal = document.createElement('section');
  modal.className = 'modal-content';
  modal.innerHTML = _renderTemplate(data, 'modalContentTemplate');
  return modal;
}

function _renderTemplate(data, template){
  let inputType;

  if(data.icon == 'temperature' || data.icon == 'temperature-disabled')
    inputType = 'temperature'
  else if(data.icon == 'light' || data.icon == 'light-disabled')
    inputType = 'light';
  else if(data.icon == 'floor' || data.icon == 'floor-disabled')
    inputType = 'floor';
  else
    inputType = ''

  switch(template){
    case 'modalContentTemplate':
      return `        
        <div class="modal-content__settings">
            <header class="modal-content__header">
                <div class="modal-content__name">
                    <h3 class="modal-content__heading">${data.name}</h3>
                    <small class="modal-content__status">${data.status || ''}</small></div>
                <div class="modal-content__status-info">
                  ${ inputType == 'temperature' || inputType == 'floor' ? '<span class="modal-content__status-info-value">+23</span>' : ''}
                  <div class="modal-content__status-info-icon modal-content__status-info-icon--${data.icon}"></div>
                </div>
            </header>
            ${inputType != 'floor' ? `<div class="color-button-list">
                ${ colorButtons[inputType].map( (el) => `<button class="color-button-list__item ${el.active ? 'color-button-list__item--active' : ''}" type="button">${el.text}</button>`).join('') }
            </div>` : ''}
            <label class="range-slider range-slider--${data.icon}">
                ${inputType == 'floor'?
                  `<div class="circle-indicator">
                    <svg class="circle-indicator__diagram" width="220" height="220" data-percent="0">
                      <g>
                        <path class="circle-indicator__inactive" fill-opacity="0" d="" stroke="#333333" stroke-width="30" stroke-dasharray="1, 4" stroke-dashoffset="3" fill="none"></path>
                        <path class="circle-indicator__active"ill-opacity="0" d="" stroke="#F5A623" stroke-width="30" stroke-dasharray="1, 4" stroke-dashoffset="3" fill="none"></path>
                      </g>
                    </svg>                    
                    <div class="circle-indicator__value">+23</div>
                    <div class="circle-indicator__control-knob"></div>
                  </div>` : ''
                }
                <input class="range-slider__slider" type="range" ${ ( (inputType) => {
                  if(inputType == 'temperature')
                    return 'min="-10" max="30" value="23" data-type="' + inputType +'"';
                  else if(inputType == 'light')
                    return 'min="0" max="1000" value="300" data-type="' + inputType +'"';
                  else if(inputType == 'floor')
                    return 'input(type="range" min="0" max="30" value="23" data-type="' + inputType + '"';
                  else
                    return ''
                } )(inputType)}">
            </label>
        </div>
        <div class="modal-content__buttons">
            <button class="modal-content__button modal-content__button--apply" type="button">Применить</button>
            <button class="modal-content__button modal-content__button--close" type="button">Закрыть</button>
        </div>
      `
      break;
    case 'briefCardTemplate':
      return `
        <p class="brief-card__name">${data.name}</p>
        ${data.status ? '<small class="brief-card__status">'+ data.status +'</small>' : ''}
      `
      break;
    default:
      return ''
      break;
  }
}

export default function briefCard(containerCards, containerModals, url, appearence, hasModal){
  const cardsContainer = document.querySelector(containerCards),
        modalsContainer = document.querySelector(containerModals)
      
  fetch(url)
    .then( (data) => data.json() )
    .then( (data) => {

      data.map( (data) => {

        data.appearence = appearence

        let card = _renderCard(data)
        cardsContainer.appendChild(card);

        if(hasModal){
          const modalOverlay = document.querySelector('.modal-overlay'),
                bodyWrapper = document.querySelector('.body-wrapper')

          function toggleModal(action){
            switch(action){
              case 'open':
                modal.classList.add('modal-content--show');
                modalOverlay.classList.add('modal-overlay--show');
                bodyWrapper.classList.add('content-blur');
                break;
              case 'close':
                modalOverlay.classList.remove('modal-overlay--show')
                modal.classList.remove('modal-content--show');
                bodyWrapper.classList.remove('content-blur');
                break;
            }
          }

          function moveModal(modal, x, y){
            modal.style.left = x;
            modal.style.top =  y;

            
          }

          function setInitialCoords(card, modal){
            let cardCoords = card.getBoundingClientRect(),
                initialCoords = {
                  x: cardCoords.x + (parseInt(getComputedStyle(modal).width) / 2) + 'px',
                  y: cardCoords.y + (parseInt(getComputedStyle(modal).height) / 2) + 'px'
                }

            modal.style.left = initialCoords.x;
            modal.style.top = initialCoords.y;

            return initialCoords;
          }

          function watchInputChange(card, modal){
            let input = modal.querySelector('.range-slider__slider'),
                statusInfo = modal.querySelector('.modal-content__status-info-value')
            input.addEventListener('input', (e) => {
              let inputValue = e.target.value;
              statusInfo.textContent = inputValue >= 0 ? `+${inputValue}` : inputValue; 
            })
          }

          let modal = _renderModal(data)
          if(data.icon === 'floor' || data.icon === 'floor-disabled') {
            drawSector(modal);
            knob(modal);
            console.log(modal);
          }
          modalsContainer.appendChild(modal);
          let initialCoords = setInitialCoords(card, modal)

          card.addEventListener('click', (e) => {
            moveModal(modal, '50%', '50%');
            toggleModal('open');
          })
          modalOverlay.addEventListener('click', () => {
            moveModal(modal, initialCoords.x, initialCoords.y);
            toggleModal('close');
          })
          modal.querySelectorAll('.modal-content__button--apply, .modal-content__button--close').forEach((btn)=> {
            btn.addEventListener('click', () => {
              moveModal(modal, initialCoords.x, initialCoords.y);
              toggleModal('close');
            })
          })

          if(data.icon === 'temperature' || data.icon === 'temperature-disabled'){
            watchInputChange(card, modal)
          }
        }
      })
    })
    .then(() => {
      slider('#favorite-devices', {
        axis: 'horizontal',
        items: 5,
        rewind: false,
        prevButton: ' .brief-cards-list-nav__item-prev',
        nextButton: ' .brief-cards-list-nav__item-next'
      })
      slider('#main-info', {
        axis: 'vertical',
        items: 3,
        rewind: true,
        nextButton: ' .main-info__brief-cards-next',
        prevButton: ' .main-info__brief-cards-prev'
      });
      slider('#favorite-scenarios', {
        axis: 'horizontal',
        items: 1,
        rewind: false,
        nextButton: ' .brief-cards-list-nav__item-prev',
        prevButton: ' .brief-cards-list-nav__item-next'
      })
    })
}

