export default class Cart {
  cartItems = []; // [product: {...}, count: N]

  constructor(cartIcon) {
    this.cartIcon = cartIcon;
  }

  addProduct(product) {
    if (product === null || product === undefined) return;

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

  onProductUpdate(cartItem) {
    // реализуем в следующей задаче

    this.cartIcon.update(this);
  }
}

