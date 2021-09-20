function calcScroll() {
  const div = document.createElement('div');

  div.style.width = "50px";
  div.style.height = "50px";
  div.style.overflowY = "scroll";
  div.style.visibility = "hidden";

  document.body.append(div);
  let widthScroll = div.offsetWidth - div.clientWidth;
  div.remove();

  return widthScroll;
}

const modals = (state) => {
  
  function modalShow(selector) {
    document.querySelector(selector).style.display = "block";
    document.body.style.overflow = "hidden";
    //document.body.classList.add('modal-open'); //class from bootstrap
    document.body.style.marginRight = `${calcScroll()}px`;
  }

  function modalClose(selector) {
    document.querySelector(selector).style.display = "none";
    document.body.style.overflow = "";
    //document.body.classList.remove('modal-open'); //class from bootstrap
    document.body.style.marginRight = "0px";
  }

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
          modalShow(modalSelector);
        }
      });
    });

    close.addEventListener('click', () => {
      allWindowsHide();
      modalClose(modalSelector);
    });

    modal.addEventListener('click', (e) => {
      if (e.target === modal && closeClickOverlay) {
        allWindowsHide();
        modalClose(modalSelector);
      }
    });
  }

  function showModalByTime(modalSelector) {
    setInterval(() => {
      let openModal = false;
      document.querySelectorAll('[data-modal]').forEach(item => {
        if (item.style.display === 'block' || item.style.display === 'flex') {
          openModal = true;
        }
      });
        if (!openModal) {
          modalShow(modalSelector);
        }
    }, 60000);
  }

  bindModal('.popup_engineer_btn', '.popup_engineer', '.popup_engineer .popup_close');
  bindModal('.phone_link', '.popup[data-modal="show"]', '.popup .popup_close');
  bindModal('.popup_calc_btn', '.popup_calc', '.popup_calc_close', false);
  bindModal('.popup_calc_button', '.popup_calc_profile', '.popup_calc_profile_close', false);
  bindModal('.popup_calc_profile_button', '.popup_calc_end', '.popup_calc_end_close', false);

  showModalByTime('.popup[data-modal="show"]');

};

export default modals;
export {calcScroll};