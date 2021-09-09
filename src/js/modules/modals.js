import { bind } from "core-js/core/function";

const modals = () => {
  function bindModal(triggerSelector, modalSelector, closeSelector, closeClickOverlay = true) {  
    const trigger = document.querySelectorAll(triggerSelector),
          modal = document.querySelector(modalSelector),
          close = document.querySelector(closeSelector),
          windows = document.querySelectorAll('[data-modal]');

    function allWindowsHide() {
      windows.forEach(item => {
        item.style.display = 'none';
      });
    }
    
    trigger.forEach(item => {
      item.addEventListener('click', (e) => {
        if (e.target) {
          e.preventDefault();
        }

        allWindowsHide();
  
        modal.style.display = "block";
        document.body.style.overflow = "hidden";
        //document.body.classList.add('modal-open'); //class from bootstrap
      });
    });

    close.addEventListener('click', () => {
      allWindowsHide();
      modal.style.display = "none";
      document.body.style.overflow = "";
      //document.body.classList.remove('modal-open'); //class from bootstrap 
    });

    modal.addEventListener('click', (e) => {
      if (e.target === modal && closeClickOverlay) {
        allWindowsHide();
        modal.style.display = "none";
        document.body.style.overflow = "";
        //document.body.classList.remove('modal-open'); //class from bootstrap
      }
    });
  }

  function showModalByTime(modalSelector) {
    setInterval(() => {
      document.querySelector(modalSelector).style.display = "block";
      document.body.style.overflow = "hidden";
    }, 60000);
  }

  bindModal('.popup_engineer_btn', '.popup_engineer', '.popup_engineer .popup_close');
  bindModal('.phone_link', '.popup', '.popup .popup_close');
  bindModal('.popup_calc_btn', '.popup_calc', '.popup_calc_close', false);
  bindModal('.popup_calc_button', '.popup_calc_profile', '.popup_calc_profile_close');

  showModalByTime('.popup');

};

export default modals;