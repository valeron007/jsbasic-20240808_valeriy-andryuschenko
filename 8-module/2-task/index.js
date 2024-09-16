import createElement from '../../assets/lib/create-element.js';
import ProductCard from '../../6-module/2-task/index.js';

export default class ProductGrid {
  constructor(products) {
    this.products = products;
    this.filters = {};
    this.elem = this.#render();
  }

  updateFilter = (filters) => {
    Object.assign(this.filters, filters);

    let noNuts = this.products.filter((product) => {
      return (product.hasOwnProperty('nuts') && product.nuts === this.filters.noNuts)
    }).map(item => item.id);

    let vegetables = this.products.filter((product) => {
      return (product.hasOwnProperty('vegeterian') && product.vegeterian === this.filters.vegeterianOnly)
    }).map(item => item.id);

    let spicinessDish = this.products.filter((product) => {
      return (product.hasOwnProperty('spiciness') && product.spiciness <= this.filters.maxSpiciness)
    }).map(item => item.id);
    //category
    let soups = this.products.filter((product) => {
      return (product.hasOwnProperty('category') && product.category === this.filters.category)
    }).map(item => item.id);

    let result = [...new Set([...soups, ...spicinessDish, ...vegetables, ...noNuts])];
    let cards = [...this.elem.querySelectorAll('.card')];

    if (result.length) {
      cards.forEach((card) => {
        console.log('!result.includes(card.dataset.cardId)=', !result.includes(card.dataset.cardId));
        if (!result.includes(card.dataset.cardId)) {
          card.style.display = 'none';
        } else {
          card.style.display = 'block';
        }
      })
    } else {
      this.elem.querySelectorAll('.card').forEach((card) => card.style.display = 'block');
    }

  }

  #render() {
    this.elem = createElement(this.#template());

    let filterRow = document.querySelector('.subheading');
    filterRow.addEventListener('click', this.updateFilter);

    return this.elem;
  }

  #template() {
    return `
    <div class="products-grid">
        <div class="products-grid__inner">
            <!--ВОТ ТУТ БУДУТ КАРТОЧКИ ТОВАРОВ-->
            ${
              this.products.map((product) => {
                let productItem = new ProductCard(product);
                return productItem.elem.outerHTML;
              }).join('')
            }
        </div>
     </div>
    `;
  }

}
