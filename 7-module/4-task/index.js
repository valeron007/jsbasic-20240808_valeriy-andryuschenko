import createElement from '../../assets/lib/create-element.js';
export default class StepSlider {
  elem = null
  #steps = 0
  #value = 0
  sliderParams = 0
  tumb = null
  shiftLeftSliderX = 0
  segment = 0
  constructor({ steps, value = 0 }) {
    this.#steps = steps;
    this.segment = steps - 1;
    this.#value = value;
    this.#render();
  }

  #render() {
    this.elem = createElement(this.#template());

    this.tumb = this.elem.querySelector('.slider__thumb');

    this.elem.addEventListener('click', this.#sliderChange);
    this.tumb.addEventListener('pointerdown', this.#sliderDown);

    this.tumb.ondragstart = () => false;

    return this.elem;
  }

  #sliderChange = (event) => {
    this.sliderParams = this.elem.getBoundingClientRect();
    let left = event.clientX - this.sliderParams.left;
    let leftRelative = left / this.elem.offsetWidth;
    let segments = this.#steps - 1;
    let approximateValue = leftRelative * segments;
    this.#value = Math.round(approximateValue);
    let valuePercents = this.#value / segments * 100;

    this.#addSpanActive();
    this.#sliderProcent(valuePercents);

    const sliderChangeEvent = new CustomEvent("slider-change", {
      detail: this.#value,
      bubbles: true,
    });

    this.elem.dispatchEvent(sliderChangeEvent);
  }
  #pointerUpSlider = (event) => {
    this.elem.classList.remove('slider_dragging');
    document.removeEventListener('pointermove', this.#moveSlider);
    document.removeEventListener('pointerup', this.#pointerUpSlider);
  }

  #addSpanActive = () => {
    let removeActiveSpan = this.elem.querySelector('.slider__step-active');
    if (removeActiveSpan) {
      removeActiveSpan.classList.remove('slider__step-active');
    }

    let spans = [...this.elem.getElementsByTagName('span')];
    spans[this.#value].classList.toggle('slider__step-active');
  }

  #sliderProcent = (procent) => {
    let sliderThumb = this.elem.querySelector('.slider__thumb');
    sliderThumb.style.setProperty('left', `${procent}%`);

    let sliderProgress = this.elem.querySelector('.slider__progress');
    sliderProgress.style.setProperty('width', `${procent}%`)
  }

  #moveSlider = (event) => {
    let newLeft = event.clientX - this.shiftLeftSliderX - this.elem.getBoundingClientRect().left;

    if (newLeft < 0) {
      newLeft = 0;
    }

    let rightEdge = this.elem.offsetWidth - this.tumb.offsetWidth;

    if (newLeft > rightEdge) {
      newLeft = rightEdge;
    }

    let leftRelative = newLeft / this.elem.offsetWidth;
    let approximateValue = leftRelative * this.segment;
    this.#value = Math.round(approximateValue);
    let valuePercents = this.#value / this.segment * 100;

    this.#addSpanActive();

    this.#sliderProcent(valuePercents);

    this.tumb.style.left = newLeft + 'px';

    const sliderMoveEvent = new CustomEvent("slider-move", {
      detail: this.#value,
      bubbles: true,
    });

    this.elem.dispatchEvent(sliderMoveEvent);
  }

  #sliderDown = (event) => {
    this.shiftLeftSliderX = event.clientX - this.tumb.getBoundingClientRect().left;

    this.tumb.setPointerCapture(event.pointerId);
    this.sliderParams = this.tumb.getBoundingClientRect();

    this.elem.classList.add('slider_dragging');

    const sliderChangeEvent = new CustomEvent("slider-change", {
      detail: this.#value,
      bubbles: true,
    });

    this.tumb.onpointermove = this.#sliderDown;
    this.tumb.onpointerup = this.#pointerUpSlider;

    this.elem.dispatchEvent(sliderChangeEvent);
  }

  #template() {
    return `
        <!--Корневой элемент слайдера-->
          <div class="slider">
            <!--Ползунок слайдера с активным значением-->
            <div class="slider__thumb">
              <span class="slider__value">${this.#value}</span>
            </div>

            <!--Заполненная часть слайдера-->
<!--            <div class="slider__progress" style="width: 10%;"></div>-->
            <div class="slider__progress" style="width: 0%;"></div>

            <!--Шаги слайдера-->
            <div class="slider__steps">
              ${this.generateSliderStep()}
            </div>
          </div>
    `;
  }

  generateSliderStep(){
    let templateSlider = '';
    for (let step = 0; step < this.#steps; step++) {
      if (step === this.#value) {
        templateSlider += '<span class="slider__step-active"></span>';
        continue;
      }
      templateSlider += '<span></span>';
    }
    return templateSlider;
  }

}
