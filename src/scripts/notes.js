const logo = document.getElementById('logo')
logo.addEventListener('click', () => {
    window.electronAPI.loadHTML('homepage')
})

notes = window.electronAPI.loadUserData()['notes-data']

menu = document.getElementsByClassName('buttons')[0]
for (note of notes) {
    for (item_name of Object.keys(note['items'])) {
        label = document.createElement('button')
        labelText = document.createTextNode(note['category-name'] + ' - ' + item_name)
        label.classList.add('menu-button')
        label.classList.add('button')
        label.classList.add('is-link')
        label.appendChild(labelText)

        menu.appendChild(label)
    }
}

function loadNote(event) {
    buttons = document.getElementsByClassName('menu-button')
    for (button of buttons) {
        if (button.classList.contains('is-primary')) {
            button.classList.remove('is-primary')
            button.classList.add('is-link')
        }
    }

    event.currentTarget.classList.remove('is-link')
    event.currentTarget.classList.add('is-primary')
    buttonName = event.currentTarget.innerHTML.split(' ')

    notes = window.electronAPI.loadUserData()['notes-data']
    for (note of notes) {
        if (buttonName[0] == note['category-name']) {
            for (item_name of Object.keys(note['items'])) {
                if (item_name == buttonName[2]) {
                    textbox = document.getElementById('textbox')
                    textbox.value = note['items'][item_name]
                }
            }
        }
    }
}

for (button of document.getElementsByClassName('menu-button')) {
    button.addEventListener('click', loadNote)
}

function saveUserData(event) {
    buttons = document.getElementsByClassName('menu-button')
    for (button of buttons) {
        if (button.classList.contains('is-primary')) {
            activeButton = button
            break
        }
    }
    buttonName = activeButton.innerHTML.split(' ')

    notes = window.electronAPI.loadUserData()
    for (note of notes['notes-data']) {
        if (note['category-name'] == buttonName[0]) {
            textbox = document.getElementById('textbox')
            note['items'][buttonName[2]] = textbox.value
            window.electronAPI.saveUserData(JSON.stringify(notes))
            break
        }
    }
}

saveButton = document.getElementById('save')
saveButton.addEventListener('click', saveUserData)

function deleteNote(event) {
    buttons = document.getElementsByClassName('menu-button')
    for (button of buttons) {
        if (button.classList.contains('is-primary')) {
            activeButton = button
            break
        }
    }
    buttonName = activeButton.innerHTML.split(' ')

    notes = window.electronAPI.loadUserData()
    for (note of notes['notes-data']) {
        if (note['category-name'] == buttonName[0]) {
            delete note['items'][buttonName[2]]
            textbox = document.getElementById('textbox')
            textbox.value = ''
            window.electronAPI.saveUserData(JSON.stringify(notes))
            break
        }
    }

    activeButton.remove()
}

delButton = document.getElementById('delete')
delButton.addEventListener('click', deleteNote)

function addNote(event) {
    categoryInput = document.getElementById('category-input')
    titleInput = document.getElementById('title-input')

    if (titleInput.value.split(' ').length > 1) {
        titleInput.value = 'Error: titles cannot contain spaces'
        return
    }

    notes = window.electronAPI.loadUserData()
    for (note of notes['notes-data']) {
        if (note['category-name'] == categoryInput.value) {
            for (item_name of Object.keys(note['items'])) {
                if (item_name == titleInput.value) {
                    titleInput.value = 'Error: this title name has already been used'
                    return
                }
            }
        }
    }

    for (note of notes['notes-data']) {
        if (note['category-name'] == categoryInput.value) {
            note['items'][titleInput.value] = ''
            window.electronAPI.saveUserData(JSON.stringify(notes))

            label = document.createElement('button')
            labelText = document.createTextNode(note['category-name'] + ' - ' + titleInput.value)
            label.classList.add('menu-button')
            label.classList.add('button')
            label.classList.add('is-link')
            label.appendChild(labelText)
            menu.appendChild(label)

            for (button of document.getElementsByClassName('menu-button')) {
                button.addEventListener('click', loadNote)
            }
            return
        }
    }

    notes = window.electronAPI.loadUserData()
    notes['notes-data'].push({
        "category-name": categoryInput.value,
        "items": {}
    })
    for (note of notes['notes-data']) {
        if (note['category-name'] == categoryInput.value) {
            note['items'][titleInput.value] = ''
            window.electronAPI.saveUserData(JSON.stringify(notes))

            label = document.createElement('button')
            labelText = document.createTextNode(note['category-name'] + ' - ' + titleInput.value)
            label.classList.add('menu-button')
            label.classList.add('button')
            label.classList.add('is-link')
            label.appendChild(labelText)
            menu.appendChild(label)

            for (button of document.getElementsByClassName('menu-button')) {
                button.addEventListener('click', loadNote)
            }
        }
    }
}

addButton = document.getElementById('add')
addButton.addEventListener('click', addNote)
