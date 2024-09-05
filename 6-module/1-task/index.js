
/**
 * Компонент, который реализует таблицу
 * с возможностью удаления строк
 *
 * Пример одного элемента, описывающего строку таблицы
 *
 *      {
 *          name: 'Ilia',
 *          age: 25,
 *          salary: '1000',
 *          city: 'Petrozavodsk'
 *      }
 *
 */
export default class UserTable {
  #rows = [];
  #titles = [];
  elem = null;
  constructor(rows) {
    this.#rows = rows || this.#rows;
    this.#titles = Object.keys(rows[0]);
    this.#titles.push('');

    this.elem = this.#render();
  }

  static createElement(html) {
    const temp = document.createElement('div');
    temp.innerHTML = html;
    return temp.firstElementChild;
  }

  #template() {
    return `
        <table class="table-style">
            <thead>
                <tr>
                    ${this.#titles.map(value => `<td class="coll-table">${value}</td>`).join('')}
                </tr>
            </thead>
            <tbody>
              ${this.#rows.map(item => `<tr>
                        ${Object.values(item).map(value => `<td class="coll-table">${value}</td>`)} + '<td class="coll-table"><button>X</button></td>'
                    </tr>`
              )}
            </tbody>
        </table>
    `;
  }

  #onDeleteClick = () => {
    const removeTrEvent = new CustomEvent("remove:tr", {
      bubbles: true
    });

    this.elem.dispatchEvent(removeTrEvent);
  }
  #render() {
    this.elem = UserTable.createElement(this.#template());

    let buttons = [...this.elem.getElementsByTagName('button')];

    buttons.forEach(item => {
      item.addEventListener('click', (event) => {
        let rowTable = event.target.closest('tr');
        rowTable.remove();
      });
    })

    return this.elem;
  }

}
