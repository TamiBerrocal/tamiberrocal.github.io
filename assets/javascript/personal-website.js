const COLORS = ["#ffb3ba", "#ffdfba", "#ffffba", "#baffc9", "#bae1ff"];

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

const getRandomColor = () => {
    let color = COLORS[Math.floor(Math.random() * COLORS.length)];
    console.log(color);
    return color;
}

window.onload = () => {
    const typed = document.querySelector('.typed');
    const aboutMe = document.querySelectorAll('.about-me');
    const contact = document.querySelectorAll('.contact');
    const socialNetworks = document.querySelectorAll('.social-network');

    let texts = typed.getAttribute('data-texts');
    let period = typed.getAttribute('data-period');

    aboutMe.forEach(element => element.addEventListener("mouseover", function() { this.style.backgroundColor = getRandomColor(); }));
    aboutMe.forEach(element => element.addEventListener("mouseout", function() { this.style.backgroundColor = "#fff"; }));
    contact.forEach(element => element.addEventListener("mouseover", function() { this.style.backgroundColor = getRandomColor(); }));
    contact.forEach(element => element.addEventListener("mouseout", function() { this.style.backgroundColor = "#fff"; }));

    setTimeout(replaceText(typed, JSON.parse(texts), period), 1000);
};
