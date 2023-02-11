const notes_button = document.getElementById('notes')
notes_button.addEventListener('click', () => {
    window.electronAPI.loadHTML('notes')
})
