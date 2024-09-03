function initCarousel() {
  let arrowRight = document.querySelector('.carousel__arrow_right');
  let arrowLeft = document.querySelector('.carousel__arrow_left');
  let width = document.querySelector('.carousel__inner').offsetWidth;
  let widthTranslate = 0;
  let carousel = document.querySelector('.carousel__inner');
  const slideCount = document.querySelectorAll(".carousel__slide").length - 1;
  const widthCarousel = -(width * slideCount);

  if (widthTranslate === 0) {
    arrowLeft.style.display = 'none';
  }

  arrowRight.addEventListener('click', (event) => {
    widthTranslate -= width;

    if (widthTranslate < 0) {
      arrowLeft.style.display = '';
    }

    if (widthTranslate === widthCarousel) {
      arrowRight.style.display = 'none';
    }

    carousel.style.transform = `translateX(${widthTranslate}px)`;
  })

  arrowLeft.addEventListener('click', (event) => {
    widthTranslate += width;

    if (widthTranslate === 0) {
      arrowLeft.style.display = 'none';
    }

    if (widthTranslate !== widthCarousel) {
      arrowRight.style.display = '';
    }

    carousel.style.transform = `translateX(${widthTranslate}px)`;
  })

}
