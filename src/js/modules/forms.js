const forms = () => {
  const form = document.querySelectorAll('form'),
        phoneInputs = document.querySelectorAll('input[name="user_phone"]');

  const message = {
    loading: 'Загрузка...',
    success: 'Спасибо. Мы скоро свяжемся с вами',
    failure: 'Что-то пошло не так'
  };

  phoneInputs.forEach(item => {
    item.addEventListener('input', () => {
      item.value = item.value.replace(/\D/, '');
    });
    item.addEventListener('change', () => {
      if (isNaN(item.value)) {
        item.value = '';
      }
      
    });
  });
  
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
          }, 3000); 
        });

      });
  });
};

export default forms;