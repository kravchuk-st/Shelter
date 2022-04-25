const burger = document.querySelector('#burger');
const menu = document.querySelector('.nav__list');
const backdrop = document.querySelector('.backdrop');
const logo = document.querySelector('.logo');
const navLogo = document.querySelector('.nav-logo');
const links = [...document.querySelectorAll('.nav__item')];

let closeMenu = () => {
  burger.classList.remove('burger_open');
  menu.classList.remove('nav__list_open');
  logo.classList.remove('hide');
  navLogo.classList.remove('show');
  backdrop.classList.remove('show');

  if (burger.classList.contains('burger_open')) {
    disableScroll();
  } else {
    enableScroll();
  }
}

let toggleMenu = () => {
  burger.classList.toggle('burger_open');
  menu.classList.toggle('nav__list_open');
  logo.classList.toggle('hide');
  navLogo.classList.toggle('show');
  backdrop.classList.toggle('show');

  if (burger.classList.contains('burger_open')) {
    disableScroll();
  } else {
    enableScroll();
  }
}

function disableScroll() {
  document.body.style.overflow = "hidden";
  document.body.style.userSelect = "none";
}

function enableScroll() {
  document.body.style.overflow = "auto";
  document.body.style.userSelect = "auto";
}

burger.addEventListener('click', toggleMenu);

backdrop.addEventListener('click', closeMenu);

links.forEach((el) => el.addEventListener('click', closeMenu));