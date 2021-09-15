import checkNumImputs from "./checkNumImputs";

const changeModalState = (state) => {
  const windowFormat = document.querySelectorAll('.balcon_icons_img '),
        windowWidth = document.querySelectorAll('#width'),
        windowHeight = document.querySelectorAll('#height'),
        windowType = document.querySelectorAll('#view_type'),
        windowProfile = document.querySelectorAll('.popup_calc_profile .checkbox');

  checkNumImputs('#width');
  checkNumImputs('#height');

  const bindActionToElems = (elem, event, prop) => {
    elem.forEach((item, i) => {
      item.addEventListener(event, () => {
        switch (item.nodeName) {
          case 'SPAN':
            state[prop] = i;
            break;
          case 'INPUT':
            if (item.getAttribute('type') === 'checkbox') {
              state[prop] = (i === 0) ? "Холодное" : "Теплое";
              //i === 0 ? state[prop] ="Холодное" : state[prop] ="Теплое";
              elem.forEach((box, j) => {
                box.checked = false;
                if (i == j) {
                  box.checked = true;
                }
              });
            } else {
              state[prop] = item.value;
            }
            break;
          case 'SELECT':
            state[prop] = item.value;
            break;
        }
        console.log(state);
      });
    });
  };
  
  bindActionToElems(windowFormat, 'click', 'form');
  bindActionToElems(windowWidth, 'input', 'width');
  bindActionToElems(windowHeight, 'input', 'height');
  bindActionToElems(windowType, 'change', 'type');
  bindActionToElems(windowProfile, 'change', 'profile');

};

export default changeModalState;