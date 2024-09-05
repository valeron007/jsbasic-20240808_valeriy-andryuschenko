import createElement from '../../assets/lib/create-element.js';

export default class Carousel {
  slides = []
  elem = null

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

  #addProduct = () => {
    const addProductEvent = new CustomEvent("product-add", {
      detail: this.product_id,
      bubbles: true,
    });

    this.elem.dispatchEvent(addBasketEvent);
  }

  #render() {
    this.elem = createElement(this.#template());



    return this.elem;
  }

}
