const COLORS = ["#ff9999", "#feff57", "#7af996"];
const BACKGROUND_COLORS = ["#f0c9d7", "#ffdfba", "#ffffba", "#baffc9", "#ffddd1", "#c0f0f4"];

const addStyle = (element, style) => {
    element.classList.add(style);
}

const removeStyle = (element, style) => {
    element.classList.remove(style);
}

const changeStyles = (element, added, removed) => {
    addStyle(element, added);
    removeStyle(element, removed);
}

const replaceText = (element) => {
    const DELETE = -1;
    const TYPE = 1;
    const WAIT = 1750;

    const updateText = (element, text, action) => {
        let periodAux = period;

        if(!element.classList.contains("typed")) {
            removeStyle(element, "cursor");
            removeStyle(element, "blinking-cursor");
            return;
        }

        if(element.innerHTML === texts[texts.length - 1]) {
            removeStyle(element, "blinking-cursor");
            return;
        };

        if(element.innerHTML === "") {
            action = TYPE;
            text = texts[i];
            i++;
        } else if(element.innerHTML === text) {
            action = DELETE;
            changeStyles(element, "cursor", "blinking-cursor");
        };

        element.innerHTML = text.substring(0, element.innerHTML.length + action);

        if(element.innerHTML === text) {
            changeStyles(element, "blinking-cursor", "cursor");
            periodAux = WAIT;
        };

        setTimeout(() => updateText(element, text, action), periodAux);
    }

    let i = 0;
    let texts = JSON.parse(element.getAttribute('data-texts'));
    let period = parseInt(element.getAttribute('data-period'), 10) || 150;

    setTimeout(() => addStyle(element, "blinking-cursor"), WAIT * 1 / 2);
    setTimeout(() => updateText(element, element.innerHTML, TYPE), WAIT);
}

const getRandomElement = (array) => {
    return array.splice([Math.floor(Math.random() * array.length)], 1)[0];
}

const addBackgroundColor = (elements, colors) => {
    [...elements].map(el => {
        let color = getRandomElement(colors);
        el.style.backgroundColor = color;
        el.style.borderColor = color;
    });
}

const addColor = (elements, colors) => {
    [...elements].map(el => el.style.color = getRandomElement(colors));
}

const addBackgroundColorOnHover = (elements, colors) => {
    [...elements].map(el => {
        let color = getRandomElement(colors);
        el.addEventListener("mouseover", function() { this.style.backgroundColor = color; });
        el.addEventListener("mouseout", function() { this.style.backgroundColor = "inherit"; });
    });
}

window.onload = () => {
    const greeting = document.querySelectorAll(".greeting");
    const textES = document.querySelectorAll(".text.es, .es > .text");
    const textEN = document.querySelectorAll(".text.en, .en > .text");
    const bio = document.querySelectorAll(".bio");
    const contact = document.querySelectorAll(".contact");
    const socialNetwork = document.querySelectorAll(".social-network");
    const goodbye = document.querySelectorAll(".goodbye");
    const language = document.querySelector(".language");
    const es = document.querySelectorAll(".es");
    const en = document.querySelectorAll(".en");

    let typed = document.querySelector(".typed");
    let backgroundColors = [...BACKGROUND_COLORS];

    addBackgroundColor(textEN, [...COLORS]);
    addColor(socialNetwork, [...COLORS]);
    addBackgroundColorOnHover(bio, backgroundColors);
    addBackgroundColorOnHover(contact, backgroundColors);
    addBackgroundColorOnHover(goodbye, backgroundColors);

    language.addEventListener("click", () => {
        addBackgroundColor(textES, [...COLORS]);

        [...es].map(el => el.classList.toggle("hidden"));
        [...en].map(el => el.classList.toggle("hidden"));
        [...greeting].map(el => el.classList.toggle("typed"));

        typed = document.querySelector(".typed");
        typed.innerHTML = typed.getAttribute('data-initial-text');
        setTimeout(replaceText(typed), 1000);
    });

    typed.innerHTML = typed.getAttribute('data-initial-text');
    setTimeout(replaceText(typed), 1000);
};
