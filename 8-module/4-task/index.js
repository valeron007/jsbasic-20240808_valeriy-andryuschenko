import createElement from '../../assets/lib/create-element.js';
import escapeHtml from '../../assets/lib/escape-html.js';

import Modal from '../../7-module/2-task/index.js';

export default class Cart {
  cartItems = []; // [product: {...}, count: N]

  constructor(cartIcon) {
    this.cartIcon = cartIcon;
    this.modal = new Modal();

    this.addEventListeners();
  }

  addProduct(product) {
    if (product === null) return;

    let item = {}

    let indexItem = this.searchProduct(product.id);
    let cart = null;

    if (indexItem !== 0 && (!indexItem || indexItem === -1)) {
      item.product = product;
      item.count = 1;
      this.cartItems.push(item);
      cart = this.cartItems[this.cartItems.length - 1];
    } else {
      this.cartItems[indexItem].count++;
      cart = this.cartItems[indexItem];
    }

    this.onProductUpdate(cart);
  }

  searchProduct(id) {
    if (this.cartItems.length === 0) return false;

    return this.cartItems.findIndex((item) => {
      return item.product.id === id.trim();
    });
  }
  updateProductCount(productId, amount) {
    let index = this.searchProduct(productId);
    if (index !== 0 && (!index || index === -1)) {
      return;
    }

    let cart = this.cartItems[index];
    cart.count += amount;

    if (cart.count !== 0) {
      this.onProductUpdate(cart);
      return;
    }

    this.cartItems.splice(index, index + 1);
    this.onProductUpdate(cart);
  }

  isEmpty() {
    if (this.cartItems.length === 0) {
      return true;
    }

    return false;
  }

  getTotalCount() {
    return this.cartItems.reduce(function(sum, current) {
      return sum + current.count;
    }, 0);
  }

  getTotalPrice() {
    let price = 0;
    this.cartItems.forEach((cart) => {
      price += (cart.count * cart.product.price);
    })

    return price;
  }

  renderProduct(product, count) {
    return createElement(`
    <div class="cart-product" data-product-id="${
      product.id
    }">
      <div class="cart-product__img">
        <img src="/assets/images/products/${product.image}" alt="product">
      </div>
      <div class="cart-product__info">
        <div class="cart-product__title">${escapeHtml(product.name)}</div>
        <div class="cart-product__price-wrap">
          <div class="cart-counter">
            <button type="button" class="cart-counter__button cart-counter__button_minus">
              <img src="/assets/images/icons/square-minus-icon.svg" alt="minus">
            </button>
            <span class="cart-counter__count">${count}</span>
            <button type="button" class="cart-counter__button cart-counter__button_plus">
              <img src="/assets/images/icons/square-plus-icon.svg" alt="plus">
            </button>
          </div>
          <div class="cart-product__price">€${product.price.toFixed(2)}</div>
        </div>
      </div>
    </div>`);
  }

  renderOrderForm() {
    return createElement(`<form class="cart-form">
      <h5 class="cart-form__title">Delivery</h5>
      <div class="cart-form__group cart-form__group_row">
        <input name="name" type="text" class="cart-form__input" placeholder="Name" required value="Santa Claus">
        <input name="email" type="email" class="cart-form__input" placeholder="Email" required value="john@gmail.com">
        <input name="tel" type="tel" class="cart-form__input" placeholder="Phone" required value="+1234567">
      </div>
      <div class="cart-form__group">
        <input name="address" type="text" class="cart-form__input" placeholder="Address" required value="North, Lapland, Snow Home">
      </div>
      <div class="cart-buttons">
        <div class="cart-buttons__buttons btn-group">
          <div class="cart-buttons__info">
            <span class="cart-buttons__info-text">total</span>
            <span class="cart-buttons__info-price">€${this.getTotalPrice().toFixed(
              2
            )}</span>
          </div>
          <button type="submit" class="cart-buttons__button btn-group__button button">order</button>
        </div>
      </div>
    </form>`);
  }

  templateModel = () => {
    return createElement(`<div>
      ${this.cartItems.map((item) => {
          return this.renderProduct(item.product, item.count).outerHTML;
      }).join('')}
      ${this.renderOrderForm().outerHTML}
      </div>
    `);
  }

  plusProduct = (event) => {
    let cartProduct = event.target.closest('.cart-product');
    this.updateProductCount(cartProduct.dataset.productId, 1);
  }

  minusProduct = (event) => {
    let cartProduct = event.target.closest('.cart-product');
    this.updateProductCount(cartProduct.dataset.productId, -1);
  }

  renderModal() {
    this.modal.setTitle('Your order');
    this.modal.setBody(this.templateModel());
    this.modal.open();

    let counters = [...document.body.querySelectorAll('.cart-counter')];
    counters.forEach((item) => {
      let buttonMinus = item.querySelector('.cart-counter__button_minus');
      let buttonPlus = item.querySelector('.cart-counter__button_plus');
      buttonMinus.onclick = this.minusProduct;
      buttonPlus.onclick = this.plusProduct;
    });

    let button = document.body.querySelector('.cart-form');
    button.onsubmit = this.onSubmit;

  }

  onProductUpdate(cartItem) {
    let classesList = [...document.body.classList];
    if (classesList.includes('is-modal-open')) {
      if (this.isEmpty()) {
        this.modal.close();
        return;
      }

      let productCount = document.body.querySelector(`[data-product-id="${cartItem.product.id}"] .cart-counter__count`);
      let productPrice = document.body.querySelector(`[data-product-id="${cartItem.product.id}"] .cart-product__price`);
      let infoPrice = document.body.querySelector(`.cart-buttons__info-price`);
      if (cartItem.count !== 0) {
        productCount.innerHTML = cartItem.count;
        productPrice.innerHTML = `€${(cartItem.count * cartItem.product.price).toFixed(2)}`;
      } else {
        let cartProductElement = document.body.querySelector(`[data-product-id="${cartItem.product.id}"]`);
        cartProductElement.remove();
      }

      infoPrice.innerHTML = `€${(this.getTotalPrice()).toFixed(2)}`;
    }

    this.cartIcon.update(this);
  }

  onSubmit = (event) => {
    event.preventDefault();

    let button = event.target.querySelector('button');
    button.classList.add('is-loading');
    const form = document.body.querySelector(".cart-form");

    let productData = new FormData(form);
    const url = 'https://httpbin.org/post';

    let response = fetch(url, {
      method: 'POST',
      body: productData
    });

    response.then((resp) => {
      this.modal.setTitle('Success!');
      this.modal.setBody(createElement(`<div class="modal__body-inner">
          <p>
            Order successful! Your order is being cooked :) <br>
            We’ll notify you about delivery time shortly.<br>
            <img src="/assets/images/delivery.gif">
          </p>
      </div>`));

      this.cartItems = [];

      resp.json().then((json) => {
        console.log(json);
      });
    })
      .catch(() => {

      });

  };

  addEventListeners() {
    this.cartIcon.elem.onclick = () => this.renderModal();
  }
}

