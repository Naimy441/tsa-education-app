const logo = document.getElementById('logo')
logo.addEventListener('click', () => {
    window.electronAPI.loadHTML('homepage')
})

const trackers = document.querySelector("div.trackers");
let user_data = window.electronAPI.loadUserData();

// Card html template
function createCard(titleText, subtitleText) {
    // create the card element
    const card = document.createElement('div');
    card.classList.add('card');

    // create the card content element
    const cardContent = document.createElement('div');
    cardContent.classList.add('card-content');

    // create the title element
    const title = document.createElement('p');
    title.classList.add('title');
    title.textContent = titleText; // change the title here
    cardContent.appendChild(title);

    // create the subtitle element
    const subtitle = document.createElement('p');
    subtitle.classList.add('subtitle');
    subtitle.textContent = subtitleText; // change the subtitle here
    cardContent.appendChild(subtitle);

    // add the card content to the card element
    card.appendChild(cardContent);

    // create the card footer element
    const cardFooter = document.createElement('footer');
    cardFooter.classList.add('card-footer');

    // create the card footer item element
    const cardFooterItem = document.createElement('p');
    cardFooterItem.classList.add('card-footer-item');

    // create the "Mark as Done" button element
    const button = document.createElement('button');
    button.classList.add('done', 'button', 'is-primary', 'is-responsive', 'is-outlined', 'is-fullwidth');
    button.textContent = 'Mark as Done';
    cardFooterItem.appendChild(button);

    // add the card footer item to the card footer element
    cardFooter.appendChild(cardFooterItem);

    // add the card footer to the card element
    card.appendChild(cardFooter);

    return card;

}

// Insert new cards at the beginning
document.getElementById('add-card').addEventListener('click', () => {
    const firstChild = trackers.firstChild;
    trackers.insertBefore(createCard("Untitled", "Due Date 0"), firstChild);
    user_data["tracker-data"].unshift({
        "title": "Untitled",
        "subtitle": "Due Date 0"
    });

    window.electronAPI.saveUserData(JSON.stringify(user_data));

    // Delete button function
    trackers.querySelectorAll("button.done").forEach(function(node) {
        node.onclick=function() {
            const parent_card = node.parentElement.parentElement.parentElement;
            user_data["tracker-data"].forEach((card, i) => {
                if (card["title"] == parent_card.querySelector("p.title").textContent) {
                    user_data["tracker-data"].splice(i,1);
                }
            })
            window.electronAPI.saveUserData(JSON.stringify(user_data));

            trackers.removeChild(parent_card);
        }
    });

    // Inline edit card function
    trackers.querySelectorAll("p.title, p.subtitle").forEach(function(node) {
        node.ondblclick = function() {
            var val=this.innerHTML;
            var input=document.createElement("input");
            input.value=val;
            input.onblur=function(){
                var val=this.value;
                this.parentNode.innerHTML=val;
            }
            this.innerHTML="";
            this.appendChild(input);
            input.focus();
        }
    });
});
