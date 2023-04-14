const logo = document.getElementById('logo')
logo.addEventListener('click', () => {
    window.electronAPI.loadHTML('homepage')
})

userData = window.electronAPI.loadUserData()
document.getElementById('answer-block').style.display = 'none'
document.getElementById('false').style.display = 'none'
document.getElementById('true').style.display = 'none'
target_category = userData['activeSets']['study']['category']
target_title = userData['activeSets']['study']['title']
document.getElementById('page_title').innerText = target_category + " - " + target_title

isTestActive = false
if (userData['initial-test-data']['is-test-active']) {
    isTestActive = true

    userData['initial-test-data']['is-test-active'] = false
    window.electronAPI.saveUserData(JSON.stringify(userData))

    document.getElementById('page_title').innerText = 'Initial Test - Part ' + userData['initial-test-data']['test-number'].toString()
    set = 'set-' + userData['initial-test-data']['test-number'].toString()
    cards = userData['initial-test-data'][set]
} else {
    cards = userData['study-data'][target_category][target_title]['cards']
}

window.electronAPI.print(cards)
currentCardIndex = window.electronAPI.random(0, cards.length)
document.getElementById('question').innerText = cards[currentCardIndex]['question']

const reveal = document.getElementById('reveal')
reveal.addEventListener('click', () => {
    reveal.style.display = 'none'
    document.getElementById('false').style.display = 'block'
    document.getElementById('true').style.display = 'block'
    document.getElementById('answer-block').style.display = 'block'
    document.getElementById('answer').innerText = cards[currentCardIndex]['answer']
})

const trueBtn = document.getElementById('true')
trueBtn.addEventListener('click', () => {
    memoryButton(true)
})

const falseBtn = document.getElementById('false')
falseBtn.addEventListener('click', () => {
    memoryButton(false)
})

function memoryButton(is_current_card_answer_correct) {
    document.getElementById('false').style.display = 'none'
    document.getElementById('true').style.display = 'none'
    document.getElementById('answer-block').style.display = 'none'
    reveal.style.display = 'block'

    jsonData = JSON.stringify({
        'current-card-index': currentCardIndex,
        'is-current-card-answer-correct': is_current_card_answer_correct,
        'cards': cards
    })
    window.electronAPI.getPythonData('Leitner', 'next-card-index', jsonData)
    setTimeout(() => {
        userData = window.electronAPI.loadUserData()
        if (isTestActive) {
            set = 'set-' + userData['initial-test-data']['test-number'].toString()
            cards = userData['inital-test-data'][set]
        } else {
            cards = userData['study-data'][target_category][target_title]['cards']
        }
        currentCardIndex = userData['ipcData']
        document.getElementById('question').innerText = cards[currentCardIndex]['question']
    }, 500)
}
