const logo = document.getElementById('logo')
logo.addEventListener('click', () => {
    window.electronAPI.loadHTML('homepage')
})

window.electronAPI.print('hello')
userData = window.electronAPI.loadUserData()
window.electronAPI.print(userData)
