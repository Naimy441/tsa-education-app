const notes_button = document.getElementById('notes')
notes_button.addEventListener('click', () => {
    window.electronAPI.loadHTML('notes')
})

const study_button = document.getElementById('study')
study_button.addEventListener('click', () => {
    window.electronAPI.loadHTML('study')
})

/*
const timers_button = document.getElementById('timers')
timers_button.addEventListener('click', () => {
    window.electronAPI.loadHTML('timers')
})
*/

const tracker_button = document.getElementById('tracker')
tracker_button.addEventListener('click', () => {
    window.electronAPI.loadHTML('tracker')
})

/*
const about_us_button = document.getElementById('about_us')
about_us_button.addEventListener('click', () => {
    window.electronAPI.loadHTML('about_us')
})
*/

const initial_test_button = document.getElementById('inital_test')
initial_test_button.addEventListener('click', () => {
    userData = window.electronAPI.loadUserData()
    userData['initial-test-data']['is-test-active'] = true
    window.electronAPI.saveUserData(JSON.stringify(userData))
    window.electronAPI.loadHTML('study_set')
})
