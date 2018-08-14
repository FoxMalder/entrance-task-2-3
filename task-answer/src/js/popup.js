function _getAppearence(appearence){
  switch(appearence){
    case 'short':
      return 'brief-card--short'
      break;
    default:
      return ''
  }
}

function _renderCard(data){
  let card = document.createElement('LI');
  card.className = `brief-card ${data.icon ? 'brief-card--' + data.icon : ''} ${_getAppearence(data.appearence)}`;
  card.innerHTML = _renderTemplate(data, 'briefCardTemplate')
  return card;
}

function _renderModal(data){
  let modal = document.createElement('section')
  modal.className = 'modal-content'
  modal.innerHTML = _renderTemplate(data, 'modalContentTemplate')
  return modal;
}

function _renderTemplate(data, template){
  switch(template){
    case 'modalContentTemplate':
      return `        
        <div class="modal-content__settings">
            <header class="modal-content__header">
                <div class="modal-content__name">
                    <h3 class="modal-content__heading">${data.name}</h3><small class="modal-content__status">Включено</small></div>
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
      `
      break;
    case 'briefCardTemplate':
      return `
        <p class="brief-card__name">${data.name}</p>
        ${data.status ? '<small class="brief-card__status">Начнется в 18:00</small>' : ''}
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

          let modal = _renderModal(data)
          modalsContainer.appendChild(modal);
          let initialCoords = setInitialCoords(card, modal)
          console.log(card, modal, initialCoords);

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
        }
        // card.addEventListener('click', (e) => {
          
        //   let cardElem = e.target.closest('li'),
        //       cardCoords = cardElem.getBoundingClientRect(),
        //       modalWindow = cardElem.querySelector('.modal-content'),
        //       modalCoords = modalWindow.getBoundingClientRect();

          
        //       // console.log(cardCoords, modalCoords);

        //   new Promise((res) => {
        //     console.log(document.body.appendChild(modalWindow));
        //     setTimeout(res, 10);
        //   })
        //     .then( () => {
              
        //     })
        //     .then( () => {
        //       modalWindow.classList.add('modal-content--show');
        //       modalOverlay.classList.add('modal-overlay--show');
        //       bodyWrapper.classList.add('content-blur');
        //     })
          
        //   /* modalWindow.style.left = cardCoords.x + (parseInt(getComputedStyle(modalWindow).width) / 2) + 'px';
        //   modalWindow.style.top = cardCoords.y + (parseInt(getComputedStyle(modalWindow).height) / 2) + 'px';
        //   console.log(getComputedStyle(modalWindow).transform); */

        //   //modalWindow.style.transform = `matrix(0, 0, 0, 0, ${cardCoords.x + (parseInt(getComputedStyle(modalWindow).width) / 2) + 'px'}, ${cardCoords.y + (parseInt(getComputedStyle(modalWindow).height) / 2) + 'px'})`
        //   //modalWindow.style.transform = `matrix(0, 0, 0, 0, 0, 10px)`
        //   /*setTimeout(() => {
        //     modalWindow.classList.add('modal-content--show');
        //     modalOverlay.classList.add('modal-overlay--show');
        //     bodyWrapper.classList.add('content-blur');
        //   }, 10)
        //   modalOverlay.addEventListener('click', () => {
        //     modalWindow.addEventListener('transitionend', () => {
        //       cardElem.appendChild(modalWindow)
        //     })
        //     modalOverlay.classList.remove('modal-overlay--show')
        //     modalWindow.classList.remove('modal-content--show');
        //     bodyWrapper.classList.remove('content-blur');
            
        //   })*/
        // })
        
      })
    })
  
}

