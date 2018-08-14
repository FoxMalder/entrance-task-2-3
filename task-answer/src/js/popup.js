const favoriteScanariosContainer = document.getElementById('favorite-scenarios__scenarios-list')      

export default function popup(){
  fetch('/data/scenarios.json')
    .then( (data) => data.json() )
    .then( (data) => {
      favoriteScanariosContainer.innerHTML = ''
      data.map( (scenario) => {
        let shortCard = true;
        favoriteScanariosContainer.innerHTML += _renderTemplate(scenario, shortCard);
      })
    })
  
}

function _renderTemplate(data, shortCard){
  const briefCardModalContentTemplate = `
    <section class="modal-content">
      <div class="modal-content__settings">
          <header class="modal-content__header">
              <div class="modal-content__name">
                  <h3 class="modal-content__heading">Elgato Eve Degree Connected</h3><small class="modal-content__status">Включено</small></div>
              <div class="modal-content__status-info"><span class="modal-content__status-info-value">+23</span>
                  <div class="modal-content__status-info-icon modal-content__status-info-icon--temperature"></div>
              </div>
          </header>
          <div class="color-button-list">
              <button class="color-button-list__item color-button-list__item--active" type="button">Вручную</button>
              <button class="color-button-list__item" type="button">Холодно</button>
              <button class="color-button-list__item" type="button">Тепло</button>
              <button class="color-button-list__item" type="button">Жарко</button>
          </div>
          <label class="range-slider">
              <input class="range-slider__slider" type="range" min="-10" max="30" value="23" id="range-slider-temperature">
          </label>
      </div>
      <div class="modal-content__buttons">
          <button class="modal-content__button modal-content__button--apply" type="button">Применить</button>
          <button class="modal-content__button modal-content__button--close" type="button">Закрыть</button>
      </div>
    </section>
  `, //  modal-content--show
  briefCardTemplate = `
    <li class="brief-card ${data.icon ? 'brief-card--' + data.icon : ''} ${shortCard ? 'brief-card--short' : ''}">
      <p class="brief-card__name">${data.name}</p>
      ${data.status ? '<small class="brief-card__status">Начнется в 18:00</small>' : ''}
      ${briefCardModalContentTemplate}
    </li>
  `;
  return briefCardTemplate
}