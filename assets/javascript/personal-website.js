const COLORS = ["#ff9999", "#feff57", "#7af996"];
const BACKGROUND_COLORS = ["#f0c9d7", "#ffdfba", "#ffffba", "#baffc9", "#ffddd1", "#c0f0f4"];

const addClass = (element, added) => element.classList.add(added);

const removeClass = (element, removed) => element.classList.remove(removed);

const changeClasses = (element, added, removed) => {
    addClass(element, added);
    removeClass(element, removed);
}

const replaceText = (element) => {
    const DELETE = -1;
    const TYPE = 1;
    const WAIT = 1750;

    const updateText = (element, text, action) => {
        let periodAux = period;

        if(!element.classList.contains("typed")) {
            removeClass(element, "cursor");
            removeClass(element, "blinking-cursor");
            return;
        }

        if(element.innerHTML === texts[texts.length - 1]) {
            removeClass(element, "blinking-cursor");
            return;
        };

        if(element.innerHTML === "") {
            action = TYPE;
            text = texts[i];
            i++;
        } else if(element.innerHTML === text) {
            action = DELETE;
            changeClasses(element, "cursor", "blinking-cursor");
        };

        element.innerHTML = text.substring(0, element.innerHTML.length + action);

        if(element.innerHTML === text) {
            changeClasses(element, "blinking-cursor", "cursor");
            periodAux = WAIT;
        };

        setTimeout(() => updateText(element, text, action), periodAux);
    }

    let i = 0;
    let texts = JSON.parse(element.getAttribute('data-texts'));
    let period = parseInt(element.getAttribute('data-period'), 10) || 150;

    setTimeout(() => addClass(element, "blinking-cursor"), WAIT * 1 / 2);
    setTimeout(() => updateText(element, element.innerHTML, TYPE), WAIT);
}

const getRandomElement = array => array.splice([Math.floor(Math.random() * array.length)], 1)[0];

const setBackgroundColor = (element, color) => {
    return () => element.style.backgroundColor = color;
}

const setBorder = style => (element, color) => {
    return () => {
        element.style.borderStyle = style;
        element.style.borderColor = color;
    }
}

const setColor = (element, color) => {
    return () => element.style.color = color;
}

const assingColors = (elements, colors) => [...elements].map(element => element.setAttribute("data-color", getRandomElement(colors)));
const addStyle = (elements, style) => [...elements].map(element => style(element, element.getAttribute('data-color'))());

const addBackgroundColor = elements => addStyle(elements, setBackgroundColor);
const addBorder = (elements, style) => addStyle(elements, setBorder(style));
const addColor = elements => addStyle(elements, setColor);

const addBackgroundColorOnHover = elements => {
    [...elements].map(element => {
        let color = element.getAttribute('data-color');
        element.addEventListener("mouseover", setBackgroundColor(element, color));
        element.addEventListener("mouseover", setBorder("solid")(element, color));
        element.addEventListener("mouseout", setBackgroundColor(element, "inherit"));
        element.addEventListener("mouseout", setBorder("solid")(element, "transparent"));
    });
}

const removeGrandparentBackgroundColorOnHover = elements => {
    [...elements].map(element => {
        let grandparent = element.parentElement.parentElement;
        let color = grandparent.getAttribute('data-color');
        element.addEventListener("mouseover", function() {
            grandparent.removeEventListener("mouseover", setBackgroundColor);
            grandparent.removeEventListener("mouseover", setBorder);
            grandparent.addEventListener("mouseover", setBackgroundColor(grandparent, "inherit"));
            grandparent.addEventListener("mouseover", setBorder("dashed")(grandparent, element.style.color));
        });
        element.addEventListener("mouseout", function() {
            grandparent.removeEventListener("mouseover", setBackgroundColor);
            grandparent.removeEventListener("mouseover", setBorder);
            grandparent.addEventListener("mouseover", setBackgroundColor(grandparent, color));
            grandparent.addEventListener("mouseover", setBorder("solid")(grandparent, color));
        });
    });
}

window.onload = () => {
    const header = document.querySelector(".header");
    const main = document.querySelector(".main");
    const greeting = document.querySelectorAll(".greeting");
    const textES = document.querySelectorAll(".text.es, .es > .text");
    const textEN = document.querySelectorAll(".text.en, .en > .text");
    const section = document.querySelectorAll(".bio, .contact, .goodbye");
    const socialNetwork = document.querySelectorAll(".social-network");
    const language = document.querySelector(".language");
    const aboutMe = document.querySelectorAll(".about-me");
    const es = document.querySelectorAll(".es");
    const en = document.querySelectorAll(".en");

    let typed = document.querySelector(".typed");

    assingColors(textEN, [...COLORS]);
    addBackgroundColor(textEN);
    addBorder(textEN, "solid");
    assingColors(textES, [...COLORS]);
    addBackgroundColor(textES);
    addBorder(textES, "solid");
    assingColors(socialNetwork, [...COLORS]);
    addColor(socialNetwork);

    assingColors(section, [...BACKGROUND_COLORS]);
    addBackgroundColorOnHover(section);
    removeGrandparentBackgroundColorOnHover(socialNetwork);

    [...aboutMe].map(el => el.addEventListener("click", () => {
        [...aboutMe].map(el => el.classList.toggle("hidden"));
        header.classList.toggle("hidden");
        main.classList.toggle("hidden");
    }));

    language.addEventListener("click", () => {
        [...es].map(el => el.classList.toggle("hidden"));
        [...en].map(el => el.classList.toggle("hidden"));
        [...greeting].map(el => el.classList.toggle("typed"));

        typed = document.querySelector(".typed");
        typed.innerHTML = typed.getAttribute('data-initial-text');
        setTimeout(replaceText(typed), 1000);
    });

    typed.innerHTML = typed.getAttribute('data-initial-text');
};
