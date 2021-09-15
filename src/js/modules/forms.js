import checkNumImputs from "./checkNumImputs";

const forms = (state) => {
  const form = document.querySelectorAll('form');

  const message = {
    loading: 'Загрузка...',
    success: 'Спасибо. Мы скоро свяжемся с вами',
    failure: 'Что-то пошло не так'
  };

  checkNumImputs('input[name="user_phone"]');
  
  const postData = async (url, data) => {
    document.querySelector('.status').textContent = message.loading;

    const result = await fetch(url, {
      method: "POST",
      body: data
    });
    return await result.text();
  };

  form.forEach(item => {
    item.addEventListener('submit', (e) => {
      e.preventDefault();

      let statusMessage = document.createElement('div');
      statusMessage.classList.add('status');
      item.append(statusMessage);

      const formData = new FormData(item);

      if (item.getAttribute('data-calc') === "end") {
        for (let key in state) {
          formData.append(key, state[key]);
          
          if (key == 'form') {
            state[key] = 0;
          } else if (key == 'type') {
              state[key] = 'tree';
            } else {
            delete state[key];
          } 
        }

        const tabContant = document.querySelectorAll('.big_img > img'),
              tab = document.querySelectorAll('.balcon_icons_img');
        
        tabContant.forEach((item, i) => {
          item.style.display = "none";
        });

        tabContant[0].style.display = "inline";       
    
        tab.forEach((item, i) => {
          item.classList.remove('do_image_more');
        });

        tab[0].classList.add('do_image_more');
        document.querySelector('#width').value = "";
        document.querySelector('#height').value = "";

        document.querySelector('#view_type > option').setAttribute('selected', 'selected');

        document.querySelectorAll('.popup_calc_profile .checkbox').forEach(item => {
          item.checked = false;
        });
      }

      postData('assets/server.php', formData)
        .then(data => {
          console.log(data);
          statusMessage.textContent = message.success;
        })
        .catch(() => statusMessage.textContent = message.failure)
        .finally(() => {
          item.reset();
          setTimeout(() => {
            statusMessage.remove();
            document.querySelectorAll('[data-modal]').forEach(item => {
              item.style.display = "none";
              document.body.style.overflow = "";
            });
          }, 1500); 
        });

      });
  });
};

export default forms;