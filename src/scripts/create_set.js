userData = window.electronAPI.loadUserData()
document.getElementById('alloted_days_label').style.display = 'block'
document.getElementById('alloted_days').style.display = 'block'
document.getElementById('checkboxes-label').style.display = 'block'
document.getElementById('checkboxes').style.display = 'block'
document.getElementById('end-state-div').style.display = 'block'

edit_mode = false
target_category = userData['activeSets']['edit']['category']
target_title = userData['activeSets']['edit']['title']
if (target_category != null && target_title != null) {
    edit_mode = true
    set = userData['study-data'][target_category][target_title]

    if (set['type-of-deck'] == 'Normal') {
        document.getElementById('alloted_days_label').style.display = 'block'
        document.getElementById('alloted_days').style.display = 'block'
        document.getElementById('checkboxes-label').style.display = 'block'
        document.getElementById('checkboxes').style.display = 'block'
        document.getElementById('end-state-div').style.display = 'block'
    } else {
        document.getElementById('alloted_days_label').style.display = 'none'
        document.getElementById('alloted_days').style.display = 'none'
        document.getElementById('checkboxes-label').style.display = 'none'
        document.getElementById('checkboxes').style.display = 'none'
        document.getElementById('end-state-div').style.display = 'none'
    }

    document.getElementById('page_title').value = target_category + " - " + target_title
    document.getElementById('category').value = target_category
    document.getElementById('title').value = target_title
    document.getElementById('description').value = set['description']
    document.getElementById('mode').value = set['type-of-deck']
    document.getElementById('alloted_days').value = set['alloted_days']
    
    for (day in set['days-of-study']) {
        if (set['days-of-study'][day]) {
            document.getElementById(day).checked = true
        } else {
            document.getElementById(day).checked = false
        }
    }
}

const logo = document.getElementById('logo')
logo.addEventListener('click', () => {
    if (edit_mode) {
        userData['activeSets']['edit']['category'] = null
        userData['activeSets']['edit']['title'] = null
        window.electronAPI.saveUserData(JSON.stringify(userData))
    }
    window.electronAPI.loadHTML('homepage')
})

const select_mode = document.getElementById('mode')
select_mode.addEventListener('change', () => {
    if (select_mode.value == 'Crunch') {
        document.getElementById('alloted_days_label').style.display = 'none'
        document.getElementById('alloted_days').style.display = 'none'
        document.getElementById('checkboxes-label').style.display = 'none'
        document.getElementById('checkboxes').style.display = 'none'
        document.getElementById('end-state-div').style.display = 'none'
    } else {
        document.getElementById('alloted_days_label').style.display = 'block'
        document.getElementById('alloted_days').style.display = 'block'
        document.getElementById('checkboxes-label').style.display = 'block'
        document.getElementById('checkboxes').style.display = 'block'
        document.getElementById('end-state-div').style.display = 'block'
    }
})

function addSet(category, title, description, mode, alloted_days, expected_end_state, cards) {
    userData['study-data'][category][title] = {
        "description": description,
        "type-of-deck": mode,
        "date-of-start": window.electronAPI.getCurrentDate(),
        "alloted_days": alloted_days,
        "days-of-study": {
            "monday": document.getElementById('monday').checked,
            "tuesday": document.getElementById('tuesday').checked,
            "wednesday": document.getElementById('wednesday').checked,
            "thursday": document.getElementById('thursday').checked,
            "friday": document.getElementById('friday').checked,
            "saturday": document.getElementById('saturday').checked,
            "sunday": document.getElementById('sunday').checked
        },
        "expected-end-state": expected_end_state,
        "memory": {
            "a": null,
            "b": null,
            "S": []
        },
        "cards": cards
    }
    if (edit_mode) {
        userData['activeSets']['edit']['category'] = null
        userData['activeSets']['edit']['title'] = null
    }
    window.electronAPI.saveUserData(JSON.stringify(userData))
    window.electronAPI.loadHTML('study')
}

const submit_button = document.getElementById('submit')
submit_button.addEventListener('click', () => {
    category = document.getElementById('category').value
    if (!category) {
        document.getElementById('category').value = "Error: category cannot be blank"
        return
    }
    title = document.getElementById('title').value
    if (!title) {
        document.getElementById('title').value = "Error: title cannot be blank"
        return
    }
    description = document.getElementById('description').value
    mode = document.getElementById('mode').value
    alloted_days = document.getElementById('alloted_days').value
    if (document.getElementById('alloted_days').style.display == 'block') {
        if (alloted_days == 0 || alloted_days == "0") {
            document.getElementById('alloted_days').value = "Error: the number of alloted days cannot be zero"
            return
        }
        if (!(alloted_days >>> 0 === parseFloat(alloted_days)) && document.getElementById('alloted_days').style.display === 'block') {
            document.getElementById('alloted_days').value = "Error: the number of alloted days must be a positive integer"
            return
        }
    } else {
        alloted_days = null
    }
    if (mode == "Normal") {
        jsonData = JSON.stringify({
            'alloted-days': alloted_days,
            'days-of-study': {
                "Monday": document.getElementById('monday').checked,
                "Tuesday": document.getElementById('tuesday').checked,
                "Wednesday": document.getElementById('wednesday').checked,
                "Thursday": document.getElementById('thursday').checked,
                "Friday": document.getElementById('friday').checked,
                "Saturday": document.getElementById('saturday').checked,
                "Sunday": document.getElementById('sunday').checked
            }
        })
        window.electronAPI.getPythonData('CalendarInterpretation', 'expected-end-state', jsonData)
        setTimeout(() => {
            expected_end_state = window.electronAPI.loadUserData()['ipcData']
        }, 750)
    } else {
        expected_end_state = null
    }

    if (edit_mode) {
        cards = userData['study-data'][target_category][target_title]['cards']
        delete userData['study-data'][target_category][target_title]
        
        categories = Object.keys(userData['study-data'])
        if (categories.length > 0) {
            if (categories.includes(category)) {
                titles = Object.keys(userData['study-data'][category])
                addSet(category, title, description, mode, alloted_days, expected_end_state, cards)
            } else {
                userData['study-data'][category] = {}
                addSet(category, title, description, mode, alloted_days, expected_end_state, cards)
            }
        } else {
            userData['study-data'][category] = {}
            addSet(category, title, description, mode, alloted_days, expected_end_state, cards)
        }
    } else {
        categories = Object.keys(userData['study-data'])
        if (categories.length > 0) {
            if (categories.includes(category)) {
                titles = Object.keys(userData['study-data'][category])
                if (!(titles.includes(title))) {
                    addSet(category, title, description, mode, alloted_days, expected_end_state, [])
                } else {
                    document.getElementById('title').value = "Error: this title has already been used before"
                }
            } else {
                userData['study-data'][category] = {}
                addSet(category, title, description, mode, alloted_days, expected_end_state, [])
            }
        } else {
            userData['study-data'][category] = {}
            addSet(category, title, description, mode, alloted_days, expected_end_state, [])
        }
    }
})

const check_button = document.getElementById('check')
check_button.addEventListener('click', () => {
    alloted_days = document.getElementById('alloted_days').value
    if (document.getElementById('alloted_days').style.display == 'block') {
        if (alloted_days == 0 || alloted_days == "0") {
            document.getElementById('alloted_days').value = "Error: the number of alloted days cannot be zero"
            return
        }
        if (!(alloted_days >>> 0 === parseFloat(alloted_days)) && document.getElementById('alloted_days').style.display === 'block') {
            document.getElementById('alloted_days').value = "Error: the number of alloted days must be a positive integer"
            return
        }
    } else {
        alloted_days = null
    }

    jsonData = JSON.stringify({
        'alloted-days': alloted_days,
        'days-of-study': {
            "Monday": document.getElementById('monday').checked,
            "Tuesday": document.getElementById('tuesday').checked,
            "Wednesday": document.getElementById('wednesday').checked,
            "Thursday": document.getElementById('thursday').checked,
            "Friday": document.getElementById('friday').checked,
            "Saturday": document.getElementById('saturday').checked,
            "Sunday": document.getElementById('sunday').checked
        }
    })
    window.electronAPI.getPythonData('CalendarInterpretation', 'expected-end-state', jsonData)
    setTimeout(() => {
        userData = window.electronAPI.loadUserData()
        document.getElementById('end-state').innerText = (userData['ipcData']*100).toString() + '%'
    }, 500)
})

const cancel_button = document.getElementById('cancel')
cancel_button.addEventListener('click', () => {
    if (edit_mode) {
        userData['activeSets']['edit']['category'] = null
        userData['activeSets']['edit']['title'] = null
        window.electronAPI.saveUserData(JSON.stringify(userData))
    }
    window.electronAPI.loadHTML('study')
}) 
