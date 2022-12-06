function slider({container, slide, nextArrow, prevArrow, totalCounter, currentCounter, wrapper, field}) {
	//* Hard version slider
  const sliders = document.querySelectorAll(slide),
        slider = document.querySelector(container),
        prev = document.querySelector(prevArrow),
        next = document.querySelector(nextArrow),
        total = document.querySelector(totalCounter),
        current = document.querySelector(currentCounter),
        slidesWrapper = document.querySelector(wrapper),
        width = window.getComputedStyle(slidesWrapper).width,
        slidesField = document.querySelector(field);

  let slideIndex = 1;
  let offset = 0;

  if (sliders.length < 10) {
    total.textContent = `0${sliders.length}`;
    current.textContent = `0${slideIndex}`;
  } else {
    total.textContent = sliders.length;
    current.textContent = slideIndex;
  };

  slidesField.style.width = 100 * sliders.length + '%';
  slidesField.style.display = 'flex';
  slidesField.style.transition = '0.5s All';

  slidesWrapper.style.overflow = 'hidden';

  sliders.forEach(slider => {
    slider.style.width = width;
  });

  slider.style.position = 'relative';

  const indicators = document.createElement('ol'),
        dots = [];

  indicators.classList.add('carousel-indicators');
  // indicators.style.cssText = ``;
  slider.append(indicators);

  for (let i = 0; i < sliders.length; i++) {
    const dot = document.createElement('li');
    dot.setAttribute('data-slide-to', i + 1);
    dot.classList.add('dot');
    // dot.style.cssText = ``;
    if (i  == 0) {
      dot.style.opacity = 1;
    }
    indicators.append(dot);
    dots.push(dot);
  }

  function deleteNotDigits(str) {
    return +str.replace(/\D/g, '')
  }

  next.addEventListener('click', () => {
    if (offset === deleteNotDigits(width) * (sliders.length - 1)) {  // '500px'
      offset = 0;
    } else {
      offset += deleteNotDigits(width);
    }

    slidesField.style.transform = `translateX(-${offset}px)`;

    if (slideIndex == sliders.length) {
      slideIndex = 1;
    } else {
      slideIndex++;
    }

    if (sliders.length < 10) {
      current.textContent = `0${slideIndex}`;
    } else {
      current.textContent = slideIndex;
    }

    dots.forEach(dot => dot.style.opacity = '.5');
    dots[slideIndex - 1].style.opacity = 1;

  });

  prev.addEventListener('click', () => {
    if (offset === 0) { 
      offset = deleteNotDigits(width) * (sliders.length - 1);
    } else {
      offset -= deleteNotDigits(width);
    }

    slidesField.style.transform = `translateX(-${offset}px)`;

    if (slideIndex == 1) {
      slideIndex = sliders.length;
    } else {
      slideIndex--;
    }

    if (sliders.length < 10) {
      current.textContent = `0${slideIndex}`;
    } else {
      current.textContent = slideIndex;
    }

    dots.forEach(dot => dot.style.opacity = '.5');
    dots[slideIndex - 1].style.opacity = 1;

  });

  dots.forEach(dot => {
    dot.addEventListener('click', (e) => {
      const slideTo = e.target.getAttribute('data-slide-to');

      slideIndex = slideTo;
      offset = deleteNotDigits(width) * (slideTo - 1);

      slidesField.style.transform = `translateX(-${offset}px)`;

      if (sliders.length < 10) {
        current.textContent = `0${slideIndex}`;
      } else {
        current.textContent = slideIndex;
      }

      dots.forEach(dot => dot.style.opacity = '.5');
      dots[slideIndex - 1].style.opacity = 1;
    });
  });


  //* simple version slider
  // showSlides(slideIndex);
  
  // if (sliders.length < 10) {
  //   total.textContent = `0${sliders.length}`;
  // } else {
  //   total.textContent = sliders.length;
  // };

  // function showSlides(n) {
  //   if (n > sliders.length) {
  //     slideIndex = 1;
  //   }

  //   if (n < 1) {
  //     slideIndex = sliders.length
  //   }

  //   sliders.forEach(slide => slide.style.display = 'none');
  //   sliders[slideIndex - 1].style.display = 'block';

  //   if (sliders.length < 10) {
  //     current.textContent = `0${slideIndex}`;
  //   } else {
  //     current.textContent = slideIndex;
  //   };
  // }

  // function plusSlides(n) {
  //   showSlides(slideIndex += n);
  // }

  // prev.addEventListener('click', () => {
  //   plusSlides(-1);
  // });

  // next.addEventListener('click', () => {
  //   plusSlides(1);
  // });
}

export default slider;
