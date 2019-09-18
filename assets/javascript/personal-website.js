const COLORS = ["#ff9999", "#feff57", "#7af996"];
const BACKGROUND_COLORS = ["#f0c9d7", "#ffdfba", "#ffffba", "#baffc9", "#ffddd1", "#c0f0f4"];

const addStyle = (element, style) => element.classList.add(style);

const removeStyle = (element, style) => element.classList.remove(style);

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

const getRandomElement = array => {
    return array.splice([Math.floor(Math.random() * array.length)], 1)[0];
}

const setBackgroundColor = color => {
    return element => () => {
        element.style.backgroundColor = color;
    }
}

const setBorder = (style, color) => {
    return element => () => {
        element.style.borderStyle = style;
        element.style.borderColor = color;
    }
}

const setColor = color => {
    return element => () => {
        element.style.color = color;
    }
}

const addRandomBackgroundColor = (elements, colors) => {
        [...elements].map(element => {
        element.setAttribute("data-background-color", getRandomElement(colors));
        setBackgroundColor(element.getAttribute('data-background-color'))(element)();
        setBorder("solid", element.getAttribute('data-background-color'))(element)();
    });
}

const addRandomColor = (elements, colors) => [...elements].map(element => setColor(getRandomElement(colors))(element)());

const addRandomBackgroundColorOnHover = (elements, colors) => {
    [...elements].map(element => {
        element.setAttribute("data-background-color", getRandomElement(colors));
        element.addEventListener("mouseover", setBackgroundColor(element.getAttribute('data-background-color'))(element));
        element.addEventListener("mouseover", setBorder("solid", element.getAttribute('data-background-color'))(element));
        element.addEventListener("mouseout", setBackgroundColor("transparent")(element));
        element.addEventListener("mouseout", setBorder("solid", "transparent")(element));
    });
}

const removeGrandparentBackgroundColorOnHover = elements => {
    [...elements].map(element => {
        let grandparent = element.parentElement.parentElement;

        element.addEventListener("mouseover", function() {
            grandparent.removeEventListener("mouseover", setBackgroundColor);
            grandparent.removeEventListener("mouseover", setBorder);
            grandparent.addEventListener("mouseover", setBackgroundColor("transparent")(grandparent));
            grandparent.addEventListener("mouseover", setBorder("dashed", element.style.color)(grandparent));
        });
        element.addEventListener("mouseout", function() {
            grandparent.removeEventListener("mouseover", setBackgroundColor);
            grandparent.removeEventListener("mouseover", setBorder);
            grandparent.addEventListener("mouseover", setBackgroundColor(grandparent.getAttribute('data-background-color'))(grandparent));
            grandparent.addEventListener("mouseover", setBorder("solid", grandparent.getAttribute('data-background-color'))(grandparent));
        });
    });
}

window.onload = () => {
    const greeting = document.querySelectorAll(".greeting");
    const textES = document.querySelectorAll(".text.es, .es > .text");
    const textEN = document.querySelectorAll(".text.en, .en > .text");
    const section = document.querySelectorAll(".bio, .contact, .goodbye");
    const socialNetwork = document.querySelectorAll(".social-network");
    const language = document.querySelector(".language");
    const es = document.querySelectorAll(".es");
    const en = document.querySelectorAll(".en");

    let typed = document.querySelector(".typed");

    addRandomBackgroundColor(textEN, [...COLORS]);
    addRandomBackgroundColor(textES, [...COLORS]);
    addRandomColor(socialNetwork, [...COLORS]);

    addRandomBackgroundColorOnHover(section, [...BACKGROUND_COLORS]);
    removeGrandparentBackgroundColorOnHover(socialNetwork);

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
