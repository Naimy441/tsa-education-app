const logo = document.getElementById('logo')
logo.addEventListener('click', () => {
    window.electronAPI.loadHTML('homepage')
})

const create_button = document.getElementById('create')
create_button.addEventListener('click', () => {
    window.electronAPI.loadHTML('create_set')
})

displaySets()

function displaySets() {
    document.getElementById('sets').innerHTML = ''
    userData = window.electronAPI.loadUserData()
    for (category in userData['study-data']) {
        for (title in userData['study-data'][category]) {
            sets_div = document.getElementById('sets')

            root = document.createElement('article')
            root.classList.add('message')
            root.classList.add('is-info')

            // header
            header = document.createElement('div')
            header.classList.add('message-header')

            header_title = document.createElement('p')
            header_title.setAttribute('setCategory', category)
            header_title.setAttribute('setTitle', title)
            header_title.appendChild(document.createTextNode(category + ' - ' + title))

            buttons_div = document.createElement('div')
            buttons_div.classList.add('field')
            buttons_div.classList.add('is-grouped')

            study_p = document.createElement('p')
            study_p.classList.add('control')
            study_btn = document.createElement('button')
            study_btn.classList.add('button')
            study_btn.classList.add('study')
            study_btn.appendChild(document.createTextNode('Study Session'))
            study_p.appendChild(study_btn)

            view_p = document.createElement('p')
            view_p.classList.add('control')
            view_btn = document.createElement('button')
            view_btn.classList.add('button')
            view_btn.classList.add('view')
            view_btn.appendChild(document.createTextNode('View'))
            view_p.appendChild(view_btn)

            edit_p = document.createElement('p')
            edit_p.classList.add('control')
            edit_btn = document.createElement('button')
            edit_btn.classList.add('button')
            edit_btn.classList.add('edit')
            edit_btn.appendChild(document.createTextNode('Edit'))
            edit_p.appendChild(edit_btn)

            del_p = document.createElement('p')
            del_p.classList.add('control')
            del_btn = document.createElement('button')
            del_btn.classList.add('button')
            del_btn.classList.add('del')
            del_btn.appendChild(document.createTextNode('Delete'))
            del_p.appendChild(del_btn)

            buttons_div.appendChild(study_p)
            buttons_div.appendChild(view_p)
            buttons_div.appendChild(edit_p)
            buttons_div.appendChild(del_p)

            header.appendChild(header_title)
            header.appendChild(buttons_div)

            root.appendChild(header)
            
            // Body
            body = document.createElement('div')
            body.classList.add('message-body')
            
            date_of_start = document.createElement('p')
            date_of_start.appendChild(document.createTextNode('Date Started: '))
            node_p = document.createElement('p')
            node_p.classList.add('bold')
            node = document.createTextNode(userData['study-data'][category][title]['date-of-start'].split(' ')[0])
            node_p.appendChild(node)
            date_of_start.appendChild(node_p)

            type_of_deck = document.createElement('p')
            type_of_deck.appendChild(document.createTextNode('Type of Deck: '))
            node_p = document.createElement('p')
            node_p.classList.add('bold')
            node = document.createTextNode(userData['study-data'][category][title]['type-of-deck'])
            node_p.appendChild(node)
            type_of_deck.appendChild(node_p)

            total_number_of_cards = document.createElement('p')
            total_number_of_cards.appendChild(document.createTextNode('Total Number of Cards in Deck: '))
            node_p = document.createElement('p')
            node_p.classList.add('bold')
            node = document.createTextNode(userData['study-data'][category][title]['cards'].length)
            node_p.appendChild(node)
            total_number_of_cards.appendChild(node_p)

            body.appendChild(date_of_start)
            body.appendChild(type_of_deck)
            body.appendChild(total_number_of_cards)

            if (userData['study-data'][category][title]['expected-end-state'] != null) {
                expected_end = document.createElement('p')
                expected_end.appendChild(document.createTextNode('Expected Memorization by Completion: '))
                node_p = document.createElement('p')
                node_p.classList.add('bold')
                node = document.createTextNode((userData['study-data'][category][title]['expected-end-state']*100).toString() + '%')
                node_p.appendChild(node)
                expected_end.appendChild(node_p)
                body.appendChild(expected_end)
            }

            root.appendChild(body)
            sets_div.appendChild(root)

        }
    }
    for (button of document.getElementsByClassName('study')) {
        button.addEventListener('click', studySession)
    }
    for (button of document.getElementsByClassName('view')) {
        button.addEventListener('click', viewSet)
    }
    for (button of document.getElementsByClassName('edit')) {
        button.addEventListener('click', editSet)
    }
    for (button of document.getElementsByClassName('del')) {
        button.addEventListener('click', delSet)
    }
}

function studySession(event) {
    userData = window.electronAPI.loadUserData()
    target = event.currentTarget.parentElement.parentElement.previousElementSibling
    userData['activeSets']['study']['category'] = target.getAttribute('setCategory')
    userData['activeSets']['study']['title'] = target.getAttribute('setTitle')
    window.electronAPI.saveUserData(JSON.stringify(userData))
    window.electronAPI.loadHTML('study_set')
}

function viewSet(event) {
    userData = window.electronAPI.loadUserData()
    target = event.currentTarget.parentElement.parentElement.previousElementSibling
    userData['activeSets']['view']['category'] = target.getAttribute('setCategory')
    userData['activeSets']['view']['title'] = target.getAttribute('setTitle')
    window.electronAPI.saveUserData(JSON.stringify(userData))
    window.electronAPI.loadHTML('view_set')
}

function editSet(event) {
    userData = window.electronAPI.loadUserData()
    target = event.currentTarget.parentElement.parentElement.previousElementSibling
    userData['activeSets']['edit']['category'] = target.getAttribute('setCategory')
    userData['activeSets']['edit']['title'] = target.getAttribute('setTitle')
    window.electronAPI.saveUserData(JSON.stringify(userData))
    window.electronAPI.loadHTML('create_set')
}

function delSet(event) {
    if (event.currentTarget.innerText == 'Delete') {
        event.currentTarget.innerText = 'Confirm'

        del_btn = event.target
        setTimeout(() => {
            try {
                del_btn.innerText = 'Delete'
            }
            catch(error) {
                window.electronAPI.print(error)
            }
        }, 2000);
    } else {
        userData = window.electronAPI.loadUserData()
        target = event.currentTarget.parentElement.parentElement.previousElementSibling
        delete userData['study-data'][target.getAttribute('setCategory')][target.getAttribute('setTitle')]
        window.electronAPI.saveUserData(JSON.stringify(userData))
        displaySets()
    }
}
