const leftBtn = document.querySelector('.arrow-left');
const rightBtn = document.querySelector('.arrow-right');
const slider = document.querySelector('.slider-wrapper');


const card_btn = document.querySelector('.card-btn');

card_btn.addEventListener('click', (ev) => {
  ev.preventDefault();
});

fetch('./assets/js/pet.json')
.then((response) => {
  return response.json();
})
.then((data) => {
  const arr = [...data];

  createCards();

  function createCards(move) {

    const getAmountElements = () => {
      const width = window.innerWidth;
      
      if (width < 768 ) {
        return 1;
      } else if (width < 1280 ) {
        return 2;
      }
      
      return 3;
    };

    let amountElements = getAmountElements();
    let cards;
    let arrCards = document.querySelectorAll('.card');
    
    if (arrCards.length){
      let cardsId = []
      arrCards.forEach(el => {
        cardsId.push(+el.dataset.id);
      })

      let newArr = arr.reduce( (acc, item) => {
        if (!cardsId.includes(item['card-id'])) acc.push(item); 
      return acc;} , []);

      cards = newArr.sort(() => Math.random() > 0.5 ? 1 : -1).slice(0, amountElements);
    } else {
      cards = arr.sort(() => Math.random() > 0.5 ? 1 : -1).slice(0, amountElements);
    };

    slider.innerHTML = '';

    for (let item in cards) {
      let card = document.createElement('div');
      card.classList.add('card');
      card.classList.add(move);
      card.setAttribute('data-graph-path', 'data-modal');
      card.setAttribute('data-id', `${cards[item]['card-id']}`);
      slider.appendChild(card);

      let cardImg = document.createElement('div');
      cardImg.classList.add('card__img');
      card.appendChild(cardImg);

      let img = document.createElement('img');
      img.src = `${cards[item]['img']}`;
      img.alt = "Card image";
      cardImg.appendChild(img);

      let title = document.createElement('h4');
      title.innerText = `${cards[item]['name']}`;
      card.appendChild(title);

      let btn = document.createElement('button');
      btn.setAttribute('data-id', `${cards[item]['card-id']}`);
      btn.classList.add('slider-btn', 'btn', 'btn-reset');
      btn.innerText = 'Learn more';
      card.appendChild(btn);
    }
  }

  
  function prevCards() {
    let cards = [...document.querySelectorAll('.card')];
    cards.forEach((el) => {
      el.classList='card';
    });

    cards.forEach((el) => {
      el.classList.add('fadeOutRight');
    });
    
    setTimeout(() =>{createCards('fadeInLeft')}, 355);
  }
  
  function nextCards() {
    let cards = [...document.querySelectorAll('.card')];
    cards.forEach((el) => {
      el.classList='card';
    });
    cards.forEach((el) => {
      el.classList.add('fadeOutLeft');
    });
    setTimeout(() =>{createCards('fadeInRight')}, 355);
  }
  
  leftBtn.addEventListener('click', prevCards);
  rightBtn.addEventListener('click', nextCards);

});
