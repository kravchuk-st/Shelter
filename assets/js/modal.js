const petModal = document.querySelector('[data-graph-target="data-modal"] .graph-modal__content');
const modalImg = document.querySelector('.modal__img img');
const modalTitle = document.querySelector('.modal-title');
const modalSubtitle = document.querySelector('.modal-subtitle');
const modalDescription = document.querySelector('.modal-description');
const age = document.querySelector('.age');
const inoculations = document.querySelector('.inoculations');
const diseases = document.querySelector('.diseases');
const parasites = document.querySelector('.parasites');


fetch('../assets/js/pets.json')
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    
    const loadModalData = (id = 0) => {
      modalImg.src = '';
      modalTitle.innerHTML = '';
      modalSubtitle.innerHTML = '';
      modalDescription.innerHTML = '';
      age.innerText = '';
      inoculations.innerText = '';
      diseases.innerText = '';
      parasites.innerText = '';
      
      for (let dataItem in data) {
        if (data[dataItem]['card-id'] == id) {
          modalImg.src = `${data[dataItem].img}`;
          modalTitle.innerHTML = `${data[dataItem].name}`;
          modalSubtitle.innerHTML = `${data[dataItem].type} - ${data[dataItem].breed}`;
          modalDescription.innerHTML = `${data[dataItem].description}`;
          age.innerText = `${data[dataItem].age}`;
          inoculations.innerText = `${data[dataItem].inoculations.join(', ')}`;
          diseases.innerText = `${data[dataItem].diseases.join(', ')}`;
          parasites.innerText = `${data[dataItem].parasites.join(', ')}`;
        }
      }
    };
    
    const createModal = (id) => new GraphModal({
      isOpen: () => {
        loadModalData(id);
      },
    });
    
    
    document.querySelector('.slider').addEventListener('click', (event) => {
      let target = event.target;
      let id;
      
      if (target.classList.contains('card')) {
        id = target.dataset.id;
      } else {
        id = target.closest('.card').dataset.id;
      }
    
      createModal(id);
    });
  });