import createElement from '../../assets/lib/create-element.js';
export default class StepSlider {
  slider = null
  steps = 0
  value = 0
  segment = 0
  constructor({ steps, value = 0 }) {
    this.steps = steps;
    this.segment = steps - 1;
    this.value = value;
    this.#render();
    this.sliderChange()

    this.pointerClickSlider();
    this.pointerMoveslider();
  }

  #render() {
    this.elem = createElement(this.#template());
    this.tumb = this.elem.querySelector('.slider__thumb');

    return this.elem;
  }

  sliderChange = (accurate = 0) => {
    const sliderValue = this.elem.querySelector('.slider__value');
    const progress = this.elem.querySelector('.slider__progress');
    const steps = this.elem.querySelectorAll('.slider__steps span');
    const thumb = this.elem.querySelector('.slider__thumb');

    sliderValue.textContent = this.value;

    const valuePercents = (this.value / (this.steps - 1)) * 100;
    thumb.style.left = `${valuePercents - accurate}%`;
    progress.style.width = `${valuePercents - accurate}%`;

    steps.forEach((step, index) => {
      step.classList.toggle('slider__step-active', index === this.value);
    });
  }
  pointerClickSlider = (event) => {
    this.elem.addEventListener('click', (event) => {
      const rect = this.elem.getBoundingClientRect();
      const offsetX = event.clientX - rect.left;
      const totalWidth = rect.width;
      const stepWidth = totalWidth / (this.steps - 1);

      const newValue = Math.round(offsetX / stepWidth);
      this.value = Math.max(0, Math.min(newValue, this.steps - 1));

      const accurate = 0;
      this.sliderChange(accurate);

      const eventChange = new CustomEvent('slider-change', {
        detail: this.value,
        bubbles: true,
      });
      this.elem.dispatchEvent(eventChange);
    });
  }

  pointerMoveslider() {
    const thumb= this.elem.querySelector('.slider__thumb');

    thumb.ondragstart = () => false;

    thumb.addEventListener('pointerdown', (event) => {
      event.preventDefault();
      this.elem.classList.add('slider_dragging');

      const onPointerMove = (moveEvent) => {
        const rect = this.elem.getBoundingClientRect();
        const offsetX = moveEvent.clientX - rect.left;
        const totalWidth = rect.width;
        const stepWidth = totalWidth / (this.steps - 1);

        const newValue = Math.round(offsetX / stepWidth);
        this.value = Math.max(0, Math.min(newValue, this.steps - 1));

        const accurate = 20;
        this.sliderChange(accurate);
      };

      const onPointerUp = () => {
        this.elem.classList.remove('slider_dragging');
        document.removeEventListener('pointermove', onPointerMove);
        document.removeEventListener('pointerup', onPointerUp);

        const eventChange = new CustomEvent('slider-change', {
          detail: this.value,
          bubbles: true,
        });
        this.elem.dispatchEvent(eventChange);
      };
      document.addEventListener('pointermove', onPointerMove);
      document.addEventListener('pointerup', onPointerUp);
    });
  }

  #template() {
    return `
        <!--Корневой элемент слайдера-->
          <div class="slider">
            <!--Ползунок слайдера с активным значением-->
            <div class="slider__thumb" id="slider-button">
              <span class="slider__value">${this.value}</span>
            </div>

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
    for (let step = 0; step < this.steps; step++) {
      if (step === this.value) {
        templateSlider += '<span class="slider__step-active"></span>';
        continue;
      }
      templateSlider += '<span></span>';
    }
    return templateSlider;
  }

}
