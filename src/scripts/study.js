fs = require('fs')
path = require('path')

const logo = document.getElementById('logo')
logo.addEventListener('click', () => {
    window.electronAPI.loadHTML('homepage')
})

function loadStudyData() {
    userDataFile = path.join(__dirname, '../', '../', 'user_data.json')
    fs.readFile(userDataFile, function(data) {
        const userData = JSON.parse(data)
    })
}
loadStudyData()

// document.addEventListener('DOMContentLoaded', () => {
//     function openModal($el) {
//       $el.classList.add('is-active');
//     }
  
//     function closeModal($el) {
//       $el.classList.remove('is-active');
//     }
  
//     (document.querySelectorAll('.js-modal-trigger') || []).forEach(($trigger) => {
//       const modal = $trigger.dataset.target;
//       const $target = document.getElementById(modal);
  
//       $trigger.addEventListener('click', () => {
//         openModal($target);
//       });
//     });
  
//     (document.querySelectorAll('.modal-background, .modal-close, .modal-card-head .delete, .modal-card-foot .button') || []).forEach(($close) => {
//       const $target = $close.closest('.modal');
  
//       $close.addEventListener('click', () => {
//         closeModal($target);
//       });
//     });
//   });
