const modals = (state) => {
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
        
        function showMessage() {
          let message = document.createElement('div');
          message.classList.add('status');
          message.style.cssText = `padding-top: 20px`;
          message.textContent = "Заполните все поля";
          item.after(message);
          setTimeout(() => {
            message.remove();
          }, 1000);
        }

        if (item.getAttribute('data-calc') === "btn-calc" && 
        (!state.width || !state.height || state.width == 0 || state.height == 0)) {
          showMessage();
        } else if (item.getAttribute('data-calc') === "btn-calc-profile" && !state.profile) {
          showMessage();
        } else {
          allWindowsHide();

          modal.style.display = "block";
          document.body.style.overflow = "hidden";
          //document.body.classList.add('modal-open'); //class from bootstrap
        }
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
      let openModal = false;
      document.querySelectorAll('[data-modal]').forEach(item => {
        if (item.style.display === 'block') {
          openModal = true;
        }
      });
        if (!openModal) {
          document.querySelector(modalSelector).style.display = "block";
          document.body.style.overflow = "hidden";
        }
    }, 60000);
  }

  bindModal('.popup_engineer_btn', '.popup_engineer', '.popup_engineer .popup_close');
  bindModal('.phone_link', '.popup', '.popup .popup_close');
  bindModal('.popup_calc_btn', '.popup_calc', '.popup_calc_close', false);
  bindModal('.popup_calc_button', '.popup_calc_profile', '.popup_calc_profile_close', false);
  bindModal('.popup_calc_profile_button', '.popup_calc_end', '.popup_calc_end_close', false);

  showModalByTime('.popup');

};

export default modals;