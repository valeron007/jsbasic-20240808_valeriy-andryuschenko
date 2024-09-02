function toggleText() {
  let toogleButton = document.querySelector('.toggle-text-button');

  toogleButton.addEventListener('click', (e) => {
    let hiddenElement = document.getElementById('text');
    hiddenElement.hidden = !hiddenElement.hidden;
  });

}
