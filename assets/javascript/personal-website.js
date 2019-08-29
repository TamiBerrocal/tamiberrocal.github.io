const COLORS = ["#ffb3ba", "#ffdfba", "#ffffba", "#baffc9", "#bae1ff", "#ffddd1", "#f0c9d7", "#d4c2e1", "#bdd7ea", "#c0f0f4"];

const replaceText = (element, texts, period) => {
    const DELETE = -1;
    const TYPE = 1;
    const WAIT = 1750;

    const updateStyle = (element, style) => {
        element.classList.toggle(style);
    }

    const updateText = (element, text, action) => {
        let periodAux = period;
        let currentText = element.innerHTML;

        if(currentText === texts[texts.length - 1]) {
            updateStyle(element, "blinking-cursor"); //Remove
            return;
        };

        if(currentText === "") {
            action = TYPE;
            text = texts[i];
            i++;
        } else if(currentText === text) {
            updateStyle(element, "cursor"); //Add
            action = DELETE;
        };

        currentText = text.substring(0, currentText.length + action);
        element.innerHTML = currentText;

        if(currentText === text) {
            updateStyle(element, "cursor"); //Remove
            periodAux = WAIT;
        };

        setTimeout(() => updateText(element, text, action), periodAux);
    };

    let i = 0;
    period = parseInt(period, 10) || 150;

    setTimeout(() => {
        updateStyle(element, "blinking-cursor"); //Add
        updateText(element, element.innerHTML, TYPE);
    }, WAIT);
};

const getRandomElement = (array) => {
    return array.splice([Math.floor(Math.random() * array.length)], 1)[0];
}

window.onload = () => {
    const typed = document.querySelector('.typed');
    const aboutMe = document.querySelectorAll('.about-me');
    const contact = document.querySelectorAll('.contact');
    const contactContainer = document.querySelectorAll('.contact-container');
    const socialNetwork = document.querySelectorAll('.social-network');
    const goodbye = document.querySelectorAll('.goodbye');
    const language = document.querySelector('.language');
    const es = document.querySelectorAll('.es');
    const en = document.querySelectorAll('.en');

    let colors = [...COLORS];
    let coloredNodes = [];

    aboutMe.forEach(element => coloredNodes.push({ node: element, color: getRandomElement(colors) }));
    contact.forEach(element => coloredNodes.push({ node: element, color: getRandomElement(colors) }));
    contactContainer.forEach(element => coloredNodes.push({ node: element, color: getRandomElement(colors) }));
    socialNetwork.forEach(element => coloredNodes.push({ node: element, color: getRandomElement(colors) }));
    goodbye.forEach(element => coloredNodes.push({ node: element, color: getRandomElement(colors) }));

    coloredNodes.filter(el => el.node.classList.contains("social-network")).forEach(el => el.node.style.color = el.color);
    coloredNodes.forEach(el => el.node.addEventListener("mouseover", function() { this.style.backgroundColor = el.color; }));
    coloredNodes.forEach(el => el.node.addEventListener("mouseout", function() { this.style.backgroundColor = "white"; }));

    language.addEventListener("click", () => {
        es.forEach(el => el.classList.toggle("hidden"));
        en.forEach(el => el.classList.toggle("hidden"));
    });

    let texts = typed.getAttribute('data-texts');
    let period = typed.getAttribute('data-period');

    setTimeout(replaceText(typed, JSON.parse(texts), period), 1000);
};
