const pageNumber = document.querySelector('.page-number'),
      firstPageBtn = document.querySelector('.first-item'),
      lastPageBtn = document.querySelector('.last-item'),
      prevPageBtn = document.querySelector('.left-item'),
      nextPageBtn = document.querySelector('.right-item'),
      page = document.querySelector('.slider');



const getAmountElements = () => {
  const width = window.innerWidth;
  
  if (width < 768 ) {
    return 3;
  } else if (width < 1280 ) {
    return 6;
  }
  
  return 8;
};


let amountElements = getAmountElements();
let pageNum = +pageNumber.innerText;

function createCards() {
  fetch('../assets/js/pets.json')
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    const arr = [].concat(data, data, data, data, data, data);
    page.innerHTML = '';
    let firstItem = (pageNum - 1) * amountElements;
    let lastItem = pageNum * amountElements;

    if (pageNum === 1) {
      firstPageBtn.disabled = true;
      firstPageBtn.classList.remove('active');
      prevPageBtn.disabled = true;
      prevPageBtn.classList.remove('active');
    } else {
      firstPageBtn.disabled = false;
      firstPageBtn.classList.add('active');
      prevPageBtn.disabled = false;
      prevPageBtn.classList.add('active');
    }
    
    
    if (pageNum === arr.length / amountElements) {
      nextPageBtn.disabled = true;
      nextPageBtn.classList.remove('active');
      lastPageBtn.disabled = true;
      lastPageBtn.classList.remove('active');
    } else {
      nextPageBtn.disabled = false;
      nextPageBtn.classList.add('active');
      lastPageBtn.disabled = false;
      lastPageBtn.classList.add('active');
    }

    let cards = arr.slice(firstItem, lastItem).sort(() => Math.random() > 0.5 ? 1 : -1);

    for (let item in cards) {
      let card = document.createElement('div');
      card.classList.add('card');
      card.setAttribute('data-graph-path', 'data-modal');
      card.setAttribute('data-id', `${cards[item]['card-id']}`);
      page.appendChild(card);

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
  });
}

createCards();

function firstPage() {
  pageNum = 1;
  pageNumber.innerText = pageNum;
  createCards();
}

function prevPage() {
  pageNum -= 1;
  pageNumber.innerText = pageNum;
  createCards();
}

function nextPage() {
  pageNum += 1;
  pageNumber.innerText = pageNum;
  createCards();
}

function lastPage() {
  pageNum = 48 / amountElements;
  pageNumber.innerText = pageNum;
  createCards();
}

firstPageBtn.addEventListener('click', firstPage);
prevPageBtn.addEventListener('click', prevPage);
nextPageBtn.addEventListener('click', nextPage);
lastPageBtn.addEventListener('click', lastPage);