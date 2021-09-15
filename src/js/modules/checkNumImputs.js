const checkNumImputs = (selector) => {
  const numImputs = document.querySelectorAll(selector);

  numImputs.forEach(item => {
    item.addEventListener('input', () => {
      item.value = item.value.replace(/\D/, '');
    });
    
    item.addEventListener('change', () => {
      if (isNaN(item.value)) {
        item.value = '';
      }
    });
  });

};

export default checkNumImputs;