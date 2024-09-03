function hideSelf() {
  let hideButton = document.querySelector('.hide-self-button')
  hideButton.addEventListener('click', (e) => {
    e.target.hidden = true;
  });
}
