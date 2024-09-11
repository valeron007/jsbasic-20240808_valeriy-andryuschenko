import createElement from '../../assets/lib/create-element.js';

export default class Modal {
  elem = null
  title = null
  body = null
  constructor() {
    this.elem = this.#render();

  }

  #template() {
    return `
        <div class="modal">
      <!--Прозрачная подложка перекрывающая интерфейс-->
      <div class="modal__overlay"></div>

      <div class="modal__inner">
        <div class="modal__header">
          <!--Кнопка закрытия модального окна-->
          <button type="button" class="modal__close">
            <img src="/assets/images/icons/cross-icon.svg" alt="close-icon" />
          </button>

          <h3 class="modal__title">
            Вот сюда нужно добавлять заголовок
          </h3>
        </div>

        <div class="modal__body">
          A сюда нужно добавлять содержимое тела модального окна
        </div>
      </div>
    </div>
    `;
  }

  #render() {
    this.elem = createElement(this.#template());

    this.title = this.elem.querySelector('.modal__title');
    this.body = this.elem.querySelector('.modal__body');

    let buttonClosed = this.elem.querySelector('.modal__close');
    buttonClosed.addEventListener('click', this.close);

    document.addEventListener('keydown', this.closeKeyDown);

    return this.elem;
  }

  open() {
    document.body.append(this.elem);
    document.body.classList.add('is-modal-open')
  }

  setTitle(title = '') {
    this.title.textContent = title;
  }

  setBody(element) {
    this.body.innerHTML = '';
    this.body.append(element);
  }

  closeKeyDown = (event) => {
    if (event.code === 'Escape') {
      this.close();
      document.removeEventListener('keydown', this.closeKeyDown);
    }
  }
  close = (event) => {
    document.body.classList.remove('is-modal-open');
    this.elem.remove();
    document.removeEventListener('keydown', this.closeKeyDown);
  }

}
