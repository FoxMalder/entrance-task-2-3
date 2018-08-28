export default function filter(containerCards){
  //console.dir(document.querySelector('#favorite-devices__devices-list').childNodes);
  let container = document.querySelector(containerCards)
  let nodes = container.querySelector('.slider').childNodes;
  let buttons = container.querySelectorAll('.color-button-list button');
  let devicesLocations = []
  nodes.forEach( (el) => {
    devicesLocations.push( el.dataset.location.split(' ') )
  })

  buttons[0].addEventListener('click', (e) => {
    e.preventDefault();
    let el = e.target;
    let location = el.dataset.location;
    container.querySelector('.color-button-list__item--active').classList.remove('color-button-list__item--active')
    el.classList.add('color-button-list__item--active')

    devicesLocations.forEach( (device, i) => {
      nodes[i].classList.remove('brief-card--hidden');
    })
  })

  for(let i = 1; i < buttons.length; i++){
    let button = buttons[i]
    button.addEventListener('click', (e) => {
      e.preventDefault();
      let el = e.target;
      let location = el.dataset.location;
      container.querySelector('.color-button-list__item--active').classList.remove('color-button-list__item--active')
      el.classList.add('color-button-list__item--active')

      devicesLocations.forEach( (device, i) => {
        if(!device.includes(location)){
          nodes[i].classList.add('brief-card--hidden');
        } else {
          nodes[i].classList.remove('brief-card--hidden');
        }
      })
    })
  }
}