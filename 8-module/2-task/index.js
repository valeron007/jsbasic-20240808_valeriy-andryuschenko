import createElement from '../../assets/lib/create-element.js';
import ProductCard from '../../6-module/2-task/index.js';

export default class ProductGrid {
  constructor(products) {
    this.products = products;
    this.filters = {};
    this.result = [];
    this.elem = this.#render();
  }

  updateFilter = (filters) => {
    Object.assign(this.filters, filters);

    if (this.filters.noNuts && this.result.length === 0) {
      this.result = this.products.filter((product) => {
        if (!product.hasOwnProperty('nuts')) return true;
        if (!product.nuts) return true;
        //return (!product.hasOwnProperty('nuts') || !product.nuts)
      });
    } else if (this.result.length > 0) {
      this.result = this.result.filter((product) => {
        return (!product.hasOwnProperty('nuts') && !product.nuts)
      });
    }

    if (this.filters.vegeterianOnly && this.result.length === 0) {
      this.result = this.products.filter((product) => {
        return (product.hasOwnProperty('vegeterian') && product.vegeterian === this.filters.vegeterianOnly)
      });
    } else if (this.result.length > 0) {
      this.result = this.result.filter((product) => {
        return (product.hasOwnProperty('vegeterian') && product.vegeterian === this.filters.vegeterianOnly)
      });
    }

    //category
    if (this.filters.hasOwnProperty('category')
      && this.filters.category !== ''
      && this.result.length === 0) {
      this.result = this.products.filter((product) => {
        return product.hasOwnProperty('category') && product.category === this.filters.category;
      });
    } else if (this.filters.hasOwnProperty('category')
      && this.result.length > 0) {
      this.result = this.result.filter((product) => {
        return (product.hasOwnProperty('spiciness') && product.spiciness <= this.filters.maxSpiciness);
      });
    }

    if (this.filters.hasOwnProperty('maxSpiciness')
      && this.result.length === 0) {
      this.result = this.products.filter((product) => {
        return (product.hasOwnProperty('spiciness') && product.spiciness <= this.filters.maxSpiciness)
      });
    } else if (this.filters.hasOwnProperty('maxSpiciness')
      && this.result.length > 0) {
      this.result = this.result.filter((product) => {
        return (product.hasOwnProperty('spiciness') && product.spiciness <= this.filters.maxSpiciness)
      });
    }

    console.log('this.result=', this.result);
    console.log('this.result.length=', this.result.length);
    if (this.result.length > 0) {

      console.log('this.result', this.result);
      container.innerHTML = this.#filterTemplate(this.result);
    } else {
      container.innerHTML = this.elem.outerHTML;
    }
  }

  #render() {
    this.elem = createElement(this.#template());

    let filterRow = document.querySelector('.subheading');
    filterRow.addEventListener('click', this.updateFilter);

    return this.elem;
  }

  #filterTemplate(products) {
    return `
    <div class="products-grid">
        <div class="products-grid__inner">
            <!--ВОТ ТУТ БУДУТ КАРТОЧКИ ТОВАРОВ-->
            ${
              products.map((product) => {
                let productItem = new ProductCard(product);
                return productItem.elem.outerHTML;
              }).join('')
            }
        </div>
     </div>
    `;
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
