const logo = document.getElementById('logo')
logo.addEventListener('click', () => {
    window.electronAPI.loadHTML('homepage')
})

let trackers_userdata = [];

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
    button.classList.add('button', 'is-primary', 'is-responsive', 'is-outlined', 'is-fullwidth');
    button.textContent = 'Mark as Done';
    cardFooterItem.appendChild(button);

    // add the card footer item to the card footer element
    cardFooter.appendChild(cardFooterItem);

    // add the card footer to the card element
    card.appendChild(cardFooter);

    return card;

}

const trackers = document.querySelector("div.trackers");
const firstChild = trackers.firstChild;
trackers.insertBefore(createCard("APUSH", "Due in 0 days"), firstChild);

trackers.querySelectorAll("p.title p.subtitle").forEach(function(node){
	node.ondblclick=function(){
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
