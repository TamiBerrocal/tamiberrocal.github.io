/*
<img src="assets/javascript/libraries/fontawesome-free-5.10.1-web/svgs/brands/twitter-square.svg" alt="">
<img src="assets/javascript/libraries/fontawesome-free-5.10.1-web/svgs/brands/linkedin.svg" alt="">
<img src="assets/javascript/libraries/fontawesome-free-5.10.1-web/svgs/brands/github-square.svg" alt="">

<a href="https://www.linkedin.com/in/tamara-berrocal/" target="_blank"><i class="fab fa-linkedin social-network"></i></a>
<a href="https://github.com/tamiberrocal" target="_blank"><i class="fab fa-github-square social-network"></i></a>
<a href="https://twitter.com/TamiBerrocal" target="_blank"><i class="fab fa-twitter-square social-network"></i></a>
*/

const DELETE = -1;
const TYPE = 1;
const WAIT = 1750;

const replaceText = (element, texts, period) => {
    const updateText = (element, text, action) => {
        let periodAux = period;
        let currentText = element.innerHTML;

        if(currentText === "") {
            action = TYPE;
            text = texts[i];
            i++;
        };

        if(currentText === text) { action = DELETE; };

        if(currentText === texts[texts.length - 1]) {
            element.classList.remove("cursor");
            element.classList.remove("blinking-cursor");
            return;
        };

        currentText = text.substring(0, currentText.length + action);
        element.innerHTML = currentText;

        if(currentText === text) {
            element.classList.remove("cursor");
            element.classList.add("blinking-cursor");
            periodAux = WAIT;
        };

        setTimeout(() => updateText(element, text, action), periodAux);
    };

    let i = 0;
    period = parseInt(period, 10) || 150;

    setTimeout(() => {
        element.classList.add("cursor");
        updateText(element, element.innerHTML, DELETE)
    }, WAIT);
};

window.onload = () => {
    let elements = document.querySelectorAll('.typed');

    elements.forEach(element => {
        let texts = element.getAttribute('data-texts');
        let period = element.getAttribute('data-period');

        setTimeout(replaceText(element, JSON.parse(texts), period), 750);
    });
};
