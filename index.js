//function to add image carousel
  function carousel(properties) {
    const mainId=properties.mainId;
  const dim = properties.dim;
  const delay = properties.holdDelay;
  const FPS = 50;
  let hold;
  let imageContainer = document.getElementById(mainId);
  imageContainer.style.display = 'block';
  imageContainer.style.backgroundColor = 'red';
  imageContainer.style.width = dim + 'px';
  imageContainer.style.height = dim + 'px';
  imageContainer.style.margin = '0 auto';
  imageContainer.style.position = 'relative';
  imageContainer.style.overflow = 'hidden';
  let pos = 0;
  let imageRow = document.querySelector(`#${mainId} div`);
  imageRow.style.position = 'relative';
  imageRow.style.left = '0px';
  let images = document.querySelectorAll(`#${mainId} div img`);

  imageRow.style.width = images[0].getAttribute('width') + 'px';

  imageContainer.style.width = images[0].getAttribute('width') + 'px';
  let index = 0;
  for (let i = 0; i < images.length; i++) {
    images[i].style.display = 'block';
    images[i].setAttribute('width', dim);
    images[i].setAttribute('height', dim);
    images[i].style.position = 'absolute';
    images[i].style.left = i * dim + 'px';
  }
  //setting transition delay
  let transDelayTotal = dim / ((FPS * properties.transDelay) / 1000);
  //button-left

  let buttonLeft = document.createElement('button');
  buttonLeft.setAttribute('id', mainId + 'btn-left');
  buttonLeft.style.fontSize = '85px';
  buttonLeft.innerHTML = '&#9001;';
  buttonLeft.style.zIndex = '5';
  buttonLeft.style.position = 'absolute';
  buttonLeft.style.backgroundColor = 'transparent';
  buttonLeft.style.color = 'white';
  buttonLeft.style.border = 'none';
  buttonLeft.style.top = dim/2+'px';
  imageContainer.appendChild(buttonLeft);

  //button-right
  let buttonRight = document.createElement('button');
  buttonRight.setAttribute('id', mainId + 'btn-right');
  buttonRight.style.fontSize = '85px';
  buttonRight.innerHTML = '&#9002;';
  buttonRight.style.zIndex = '5';
  buttonRight.style.position = 'absolute';
  buttonRight.style.backgroundColor = 'transparent';
  buttonRight.style.color = 'white';
  buttonRight.style.border = 'none';
  buttonRight.style.top = dim/2+'px';
  buttonRight.style.right = '0px';
  imageContainer.appendChild(buttonRight);
  //dots
  let dots = [];
  let dotsContainer = document.createElement('div');
  dotsContainer.setAttribute('id', 'dot-container');
  dotsContainer.style.margin = '0 -15%';
  dotsContainer.style.position = 'absolute';
  dotsContainer.style.zIndex = '10';
  dotsContainer.style.bottom = '0px';
  dotsContainer.style.alignItems='center';
  dotsContainer.style.left = dim/2 + 'px';
  imageContainer.appendChild(dotsContainer);
  //creating dot elements
  for (let i = 0; i < images.length; i++) {
    let dot = document.createElement('div');
    dot.style.padding = `${50 / images.length}px`;
    dot.style.display = 'inline-block';
    dot.style.margin = '10px';
    dot.style.backgroundColor = 'white';
    dot.setAttribute('id', mainId + 'dot' + i);
    dot.setAttribute('class', 'dots');
    dot.style.borderRadius = '50%';
    dot.addEventListener('click', handleDot);
    dots.push(dot);
    dotsContainer.appendChild(dots[i]);
    dots[0].style.backgroundColor = 'red';
  }
  //setting hold-transition
  function autoTranslate() {
    hold = setTimeout(() => {
      shiftLeft(transDelayTotal);
    }, delay);
  }
  autoTranslate();
  //adding event-listeners to the buttons
  buttonLeft.addEventListener('click', shift);
  buttonRight.addEventListener('click', shift);
  function shift(e) {
    pos = parseInt(imageRow.style.left);
    if (e.target.getAttribute('id') === mainId + 'btn-left') {
      shiftRight(transDelayTotal);
    } else if (e.target.getAttribute('id') === mainId + 'btn-right') {
      shiftLeft(transDelayTotal);
    }
  }
  let leftShifting;
  let rightShifting;
  function shiftLeft(d) {
    buttonLeft.disabled = true;
    buttonRight.disabled = true;
    clearTimeout(hold);
    if (index === -(images.length - 1)) {
      for (let i = 0; i < images.length - 1; i++) {
        shiftRight(100);
      }
      return;
    }
    leftShifting = window.requestAnimationFrame(() => shiftLeft(d));
    if (pos <= (index - 1) * dim) {
      pos = (index - 1) * dim;
      imageRow.style.left = pos + 'px';
      window.cancelAnimationFrame(leftShifting);
      index -= 1;
      colorizeDot(dots[-index]);
      buttonLeft.disabled = false;
      buttonRight.disabled = false;
      autoTranslate();
    } else {
      pos -= d;
      imageRow.style.left = pos + 'px';
    }
  }
  function shiftRight(d) {
    clearTimeout(hold);
    buttonLeft.disabled = true;
    buttonRight.disabled = true;
    if (index === 0) {
      for (let i = 0; i < images.length - 1; i++) {
        shiftLeft(100);
      }
      return;
    }
    rightShifting = window.requestAnimationFrame(() => shiftRight(d));
    if (pos >= (index + 1) * dim) {
      pos = (index + 1) * dim;
      imageRow.style.left = pos + 'px';
      window.cancelAnimationFrame(rightShifting);
      index += 1;
      colorizeDot(dots[-index]);
      buttonLeft.disabled = false;
      buttonRight.disabled = false;
      autoTranslate();
    } else {
      pos += d;
      imageRow.style.left = pos + 'px';
    }
  }

  //handling clicks on the dots
  function handleDot(e) {
    let ind = parseInt(e.target.getAttribute('id').slice(mainId.length + 3));
    let diff = -ind - index;
    if (diff < 0) {
      for (let i = 0; i < Math.abs(diff); i++) {
        shiftLeft(50);
      }
    } else {
      for (let i = 0; i < Math.abs(diff); i++) {
        shiftRight(50);
      }
    }
  }

  //colorizing the dots
  function colorizeDot(e) {
    for (let i = 0; i < dots.length; i++) {
      dots[i].style.backgroundColor = 'white';
    }
    e.style.backgroundColor = 'red';
  }
}
let properties1={
  mainId:'image-container',
  dim:500,
  holdDelay:5000,
  transDelay:1000

}
let properties2={
  mainId:'image-container2',
  dim:700,
  holdDelay:2000,
  transDelay:500

}
carousel(properties1);
carousel(properties2);
