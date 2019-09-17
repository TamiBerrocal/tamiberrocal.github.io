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

const setBackgroundColor = color => {
    return element => element.style.backgroundColor = color;
}

const setBorder = (style, color) => {
    return element => {
        element.style.borderStyle = style;
        element.style.borderColor = color;
    }
}

const setColor = color => {
    return element => element.style.color = color;
}


const addStyleToElements = (elements, style) => {
    [...elements].map(el => style(el));
}

const addEventToElements = (elements, event, callback) => {
    [...elements].map(el => el.addEventListener(event, () => callback(el)));
}

/*
const addColor = (element, color) => {
    return () => {
        element.setAttribute("data-color", color);
        element.style.backgroundColor = color;
    }
}

const addBorder = (element, style, color) => {
    return () => {
        element.style.borderStyle = style;
        element.style.borderColor = color;
    }
}
*/

const addRandomBackgroundColorOnHover = (elements, colors) => {
    addEventToElements(elements, "mouseover", setBackgroundColor());
    //addEventToElements(elements, "mouseover", setBorder("solid", getRandomElement(colors)));
    addEventToElements(elements, "mouseout", setBackgroundColor("inherit"));

    /*
    [...elements].map(el => {
        let color = getRandomElement(colors);
        el.addEventListener("mouseover", addColor(el, color));
        el.addEventListener("mouseover", addBorder(el, "solid", color));
        el.addEventListener("mouseout", addColor(el, "inherit"));
        el.addEventListener("mouseover", addBorder(el, "solid", "inherit"));
    });
*/
}

/*
const removeBackgroundColorOnHover = elements => {
    [...elements].map(el => {
        el.addEventListener("mouseover", function() {
            el.parentElement.parentElement.removeEventListener("mouseover", addColor);
            el.parentElement.parentElement.addEventListener("mouseover", addColor(el.parentElement.parentElement, "transparent"));
            el.parentElement.parentElement.addEventListener("mouseover", addBorder(el.parentElement.parentElement, "dashed", el.style.color));
        });
        el.addEventListener("mouseout", function() {
            el.parentElement.parentElement.removeEventListener("mouseover", addColor);
            el.parentElement.parentElement.removeEventListener("mouseover", addBorder);
            el.parentElement.parentElement.addEventListener("mouseover", addColor(el.parentElement.parentElement, "yellow"));
            addBorder(el, "solid", "white");
        });
    });
}
*/

window.onload = () => {
    const greeting = document.querySelectorAll(".greeting");
    const textES = document.querySelectorAll(".text.es, .es > .text");
    const textEN = document.querySelectorAll(".text.en, .en > .text");
    const section = document.querySelectorAll(".bio, .contact, .goodbye");
    const socialNetwork = document.querySelectorAll(".social-networks > a");
    const language = document.querySelector(".language");
    const es = document.querySelectorAll(".es");
    const en = document.querySelectorAll(".en");

    let typed = document.querySelector(".typed");

//    addRandomBackgroundColor(textEN, [...COLORS]);
//    addRandomBackgroundColor(textES, [...COLORS]);
//    addRandomColor(socialNetwork, [...COLORS]);
    addStyleToElements(textEN, setBackgroundColor(getRandomElement([...COLORS])));
    addStyleToElements(textES, setBackgroundColor(getRandomElement([...COLORS])));
    addStyleToElements(socialNetwork, setColor(getRandomElement([...COLORS])));

    addRandomBackgroundColorOnHover(section, [...BACKGROUND_COLORS]);
//    removeBackgroundColorOnHover(socialNetwork);

    language.addEventListener("click", () => {
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
