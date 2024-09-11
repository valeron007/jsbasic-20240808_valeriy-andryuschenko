import createElement from '../../assets/lib/create-element.js';
export default class StepSlider {
  elem = null
  #steps = 0
  #value = 0
  sliderParams = 0
  constructor({ steps, value = 0 }) {
    this.#steps = steps;
    this.#value = value;
    this.#render();
  }

  #render() {
    this.elem = createElement(this.#template());

    this.elem.addEventListener('click', this.#sliderChange);

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

    let removeActiveSpan = this.elem.querySelector('.slider__step-active');
    removeActiveSpan.classList.remove('slider__step-active');

    let spans = [...this.elem.getElementsByTagName('span')];
    spans[this.#value].classList.toggle('slider__step-active');

    let sliderTumb = this.elem.querySelector('.slider__thumb');
    sliderTumb.style.setProperty('left', `${valuePercents}%`);

    let sliderProgress = this.elem.querySelector('.slider__progress');
    sliderProgress.style.setProperty('width', `${valuePercents}%`)

    const sliderChangeEvent = new CustomEvent("slider-change", {
      detail: this.#value,
      bubbles: true,
    });

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
