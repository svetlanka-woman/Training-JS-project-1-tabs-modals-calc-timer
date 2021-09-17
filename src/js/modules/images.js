const images = () => {
  const imgPopup = document.createElement('div'),
        worksSection = document.querySelector('.works'),
        bigImage = document.createElement('img');

  imgPopup.classList.add('popup');
  worksSection.appendChild(imgPopup);

  imgPopup.style.cssText = `justify-content: center;
                            align-items: center;
                            `;
  bigImage.style.cssText = `max-height: 100%;
                            max-width: 100%;`;
  imgPopup.appendChild(bigImage);

  worksSection.addEventListener('click', (e) => {
    e.preventDefault();

    let target = e.target;

    if (target && target.classList.contains('preview')) {
      imgPopup.style.display = "flex";
      document.body.style.overflow = "hidden";

      const path = target.parentNode.getAttribute('href');
      bigImage.setAttribute('src', path);
    }

    if (target && target.matches('div.popup')) {
      imgPopup.style.display = 'none';
      document.body.style.overflow = "";
    }
  });
};

export default images;