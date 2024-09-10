import createElement from '../../assets/lib/create-element.js';

export default class RibbonMenu {
  scrollRightButton = null
  scrollLeftButton = null
  ribbonInner = null
  scrollRightWidth = 0
  constructor(categories) {
    this.categories = categories;
    this.elem = this.#render();

  }

  #template() {
    return `
      <div class="ribbon">
        <!--Кнопка прокрутки влево-->
        <button class="ribbon__arrow ribbon__arrow_left">
          <img src="/assets/images/icons/angle-icon.svg" alt="icon">
        </button>

        <!--Ссылки на категории-->
        <nav class="ribbon__inner">
            ${
                this.categories.map((category, index) => {
                    return `<a href="#" class="ribbon__item" data-id='${category.id}'>${category.name}</a>`
                }).join('')
            }
        </nav>

        <!--Кнопка прокрутки вправо-->
        <button class="ribbon__arrow ribbon__arrow_right">
          <img src="/assets/images/icons/angle-icon.svg" alt="icon">
        </button>
      </div>
    `;
  }

  #render() {
    this.elem = createElement(this.#template());

    this.scrollLeftButton = this.elem.querySelector('.ribbon__arrow_left');
    this.scrollRightButton = this.elem.querySelector('.ribbon__arrow_right');

    this.scrollLeftButton.addEventListener('click', this.#scrollLeftEvent);
    this.scrollRightButton.addEventListener('click', this.#scrollRightEvent);
    this.ribbonInner = this.elem.querySelector('.ribbon__inner');

    let categoryLinks = [...this.elem.getElementsByTagName('a')];

    categoryLinks.forEach(link => {
      link.addEventListener('click', this.#selectCategory);
    })

    if (this.ribbonInner.scrollLeft === 0) {
      this.scrollRightButton.classList.toggle('ribbon__arrow_visible');
    }

    return this.elem;
  }

  #selectCategory = (link) => {
    link.preventDefault();
    let linkOld = this.elem.getElementsByClassName('ribbon__item_active');

    if (linkOld.length) {
      linkOld[0].classList.remove('ribbon__item_active');
    }

    link.target.classList.add('ribbon__item_active');

    const selectCategoryEvent = new CustomEvent('ribbon-select', { // имя события должно быть именно 'ribbon-select'
      detail: link.target.dataset.id, // уникальный идентификатора категории из её объекта
      bubbles: true // это событие всплывает - это понадобится в дальнейшем
    });

    this.elem.dispatchEvent(selectCategoryEvent);
  }

  #scrollLeftEvent = () => {
    this.ribbonInner.scrollBy(-350,0);
    let scrollRight = this.ribbonInner.scrollWidth - this.ribbonInner.scrollLeft - this.ribbonInner.clientWidth;

    if (scrollRight <= 0) {
      this.scrollRightButton.classList.toggle('ribbon__arrow_visible');
    }

    if (this.ribbonInner.scrollLeft === 0) {
      this.scrollLeftButton.classList.toggle('ribbon__arrow_visible');
    }

  }

  #scrollRightEvent = () => {
    let scrollRight = this.ribbonInner.scrollWidth - this.ribbonInner.scrollLeft - this.ribbonInner.clientWidth;

    if (!this.scrollLeftButton.classList.contains('ribbon__arrow_visible')) {
      this.scrollLeftButton.classList.add('ribbon__arrow_visible');
    }

    this.ribbonInner.scrollBy(350,0);

    if (scrollRight <= 0) {
      this.scrollRightButton.classList.toggle('ribbon__arrow_visible');
    }

  }

}
