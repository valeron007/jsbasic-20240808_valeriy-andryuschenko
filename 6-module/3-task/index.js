import createElement from '../../assets/lib/create-element.js';

export default class Carousel {
  slides = []
  elem = null
  arrowRight = null
  arrowLeft = null
  width = 0
  widthTranslate = 0
  carouselElement = null
  slideCount = 0
  widthCarousel = 0

  constructor(slides) {
    this.slides = slides;
    this.elem = this.#render();
  }

  #slideTemplate() {
    let templateSlides = '';
    this.slides.forEach((item) => {
      templateSlides += `<div class="carousel__slide" data-id="${item.id}">
                    <img src="/assets/images/carousel/${item.image}" class="carousel__img" alt="slide">
                    <div class="carousel__caption">
                      <span class="carousel__price">€${item.price.toFixed(2)}</span>
                      <div class="carousel__title">${item.name}</div>
                      <button type="button" class="carousel__button">
                        <img src="/assets/images/icons/plus-icon.svg" alt="icon">
                      </button>
                    </div>
                  </div>`
    })

    return templateSlides;
  }

  #template() {
    return `
      <div class="carousel">
        <!--Кнопки переключения-->
        <div class="carousel__arrow carousel__arrow_right">
          <img src="/assets/images/icons/angle-icon.svg" alt="icon">
        </div>
        <div class="carousel__arrow carousel__arrow_left">
          <img src="/assets/images/icons/angle-left-icon.svg" alt="icon">
        </div>
        <!--End Кнопки переключения-->
        <!--Контеёнер слайдера-->
        <div class="carousel__inner">
            ${this.#slideTemplate()}
        </div>
        <!--End Контеёнер слайдера-->
      </div>
    `;
  }

  #addToBasket = (event) => {
    const slide = event.target.closest('.carousel__slide');

    const addBasketEvent = new CustomEvent("product-add", {
      detail: slide.dataset.id,
      bubbles: true,
    });

    this.elem.dispatchEvent(addBasketEvent);
  }

  #render() {
    this.elem = createElement(this.#template());

    let buttons = [...this.elem.getElementsByTagName('button')];

    buttons.forEach(item => {
      item.addEventListener('click', this.#addToBasket);
    })

    this.initCarousel();

    return this.elem;
  }

  initCarousel() {
    this.arrowRight = this.elem.querySelector('.carousel__arrow_right');
    this.arrowLeft = this.elem.querySelector('.carousel__arrow_left');

    this.carouselElement = this.elem.querySelector('.carousel__inner');
    this.slideCount = this.slides.length - 1;

    if (this.widthTranslate === 0) {
      this.arrowLeft.style.display = 'none';
    }

    this.arrowRight.addEventListener('click', this.#clickRight)
    this.arrowLeft.addEventListener('click', this.#clickLeft)
  }

  #clickLeft = (event) => {
    this.width = this.elem.querySelector('.carousel__inner').offsetWidth;
    this.widthTranslate += this.width;

    if (this.widthTranslate === 0) {
      this.arrowLeft.style.display = 'none';
    }

    if (this.widthTranslate !== this.widthCarousel) {
      this.arrowRight.style.display = '';
    }

    this.carouselElement.style.transform = `translateX(${this.widthTranslate}px)`;
  }

  #clickRight = (event) => {
    if(this.widthCarousel === 0){
      this.widthCarousel = -(this.width * this.slideCount);
    }

    this.width = this.elem.querySelector('.carousel__inner').offsetWidth;
    this.widthTranslate -= this.width;

    if (this.widthTranslate < 0) {
      this.arrowLeft.style.display = '';
    }

    if (this.widthTranslate === this.widthCarousel) {
      this.arrowRight.style.display = 'none';
    }

    this.carouselElement.style.transform = `translateX(${this.widthTranslate}px)`;
  }

}
