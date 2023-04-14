const logo = document.getElementById('logo')
logo.addEventListener('click', () => {
    window.electronAPI.loadHTML('homepage')
})

userData = window.electronAPI.loadUserData()
target_category = userData['activeSets']['view']['category']
target_title = userData['activeSets']['view']['title']
set = userData['study-data'][target_category][target_title]

document.getElementById('title').innerText = target_category + " - " + target_title
if (set['description'] != "") {
    document.getElementById('description').innerText = set['description']
} else {
    document.getElementById('description-label').style.display = 'none'
    document.getElementById('description').style.display = 'none'
}
document.getElementById('mode').innerText = set['type-of-deck']
if (set['type-of-deck'] == "Crunch") {
    document.getElementById('alloted-days-label').style.display = 'none'
    document.getElementById('alloted-days').style.display = 'none'
} else {
    document.getElementById('alloted-days').innerText = set['alloted_days']
}

document.getElementById('days-label').style.display = 'none'
document.getElementById('days').style.display = 'none'
for (day in set['days-of-study']) {
    if (set['days-of-study'][day]) {
        document.getElementById('days-label').style.display = 'block'
        document.getElementById('days').style.display = 'block'
        break
    }
}
for (day in set['days-of-study']) {
    if (set['days-of-study'][day]) {
        document.getElementById('days').innerText += day.charAt(0).toUpperCase() + day.slice(1) + '\n'
    }
}

loadCards()

function loadCards() {
    userData = window.electronAPI.loadUserData()
    cards = document.getElementById('cards')
    cards.innerHTML = ''
    for (card of userData['study-data'][target_category][target_title]['cards']) {
        box = document.createElement('div')
        box.classList.add('box')
        box.classList.add('has-background-link-light')

        content = document.createElement('div')
        content.classList.add('content')

        question = document.createElement('p')
        question_text = document.createTextNode(card['question'])
        question.classList.add('question')
        question.classList.add('underline')

        answer = document.createElement('p')
        answer_text = document.createTextNode(card['answer'])
        answer.classList.add('answer')

        del = document.createElement('button')
        del.classList.add('delete')
        
        question.appendChild(question_text)
        answer.appendChild(answer_text)
    
        content.appendChild(question)
        content.appendChild(answer)
    
        box.appendChild(del)
        box.appendChild(content)
    
        cards.appendChild(box)
    }

    for (button of document.getElementsByClassName('delete')) {
        button.addEventListener('click', delCard)
    }
}

function delCard(event) {
    userData = window.electronAPI.loadUserData()
    targetQuestion = event.target.nextElementSibling.firstChild.innerText
    for (card of userData['study-data'][target_category][target_title]['cards']) {
        index = userData['study-data'][target_category][target_title]['cards'].indexOf(card)
        if (userData['study-data'][target_category][target_title]['cards'][index]['question'] == targetQuestion) {
            userData['study-data'][target_category][target_title]['cards'].splice(index, 1)
        }
    }
    window.electronAPI.saveUserData(JSON.stringify(userData))
    loadCards()
}

const add_cards_button = document.getElementById('add_cards')
add_cards_button.addEventListener('click', () => {
    userData = window.electronAPI.loadUserData()
    question = document.getElementById('question')
    answer = document.getElementById('answer')

    for (card in userData['study-data'][target_category][target_title]['cards']) {
        if (userData['study-data'][target_category][target_title]['cards'][card]['question'] == question.value) {
            question.value = 'Error: this question is already in this set'
            return
        }
    }

    if (question.value == '') {
        question.value = 'Error: this field cannot be blank'
        return
    }

    if (answer.value == '') {
        answer.value = 'Error: this field cannot be blank'
        return
    }

    userData['study-data'][target_category][target_title]['cards'].push({
        "question": question.value,
        "answer": answer.value,
        "group": 0
    })
    question.value = ''
    answer.value = ''

    window.electronAPI.saveUserData(JSON.stringify(userData))
    loadCards()
})

const clear_button = document.getElementById('clear')
clear_button.addEventListener('click', () => {
    document.getElementById('question').value = ''
    document.getElementById('answer').value = ''
})
