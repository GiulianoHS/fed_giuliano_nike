// JavaScript Document
console.log("Yes javascript werken jongen");


// Javascript gekregen van Sanne en besproken

// de default colorMode opzoeken
// dat is value van de checked radio button in de html
var colorMode = document.querySelector("input:checked").value;

// de default systeem voorkeuren bepalen
// true of false
var systemMoreContrast = window.matchMedia("(prefers-contrast: more)").matches;
var systemDarkMode = window.matchMedia("(prefers-color-scheme: dark)").matches;

// de radio buttons
const colorModeInputs = document.querySelectorAll("[type='radio']");





/********************************/
/* bij het openen van de pagina */
/********************************/

// als de colorMode opgeslagen is in localstorage
// de radio buttons en :root initialiseren op basis van de opgeslagen colorMode
if( localStorage.getItem("colorMode") ) {
    // de colorMode ophalen
    colorMode = JSON.parse(localStorage.getItem("colorMode"));

    // de bijbehorende radio button opzoeken en aanzetten
    let selectedRadioButton = document.querySelector("#"+colorMode);
    selectedRadioButton.checked = true;

    // :root updaten
    updateColorModeOnRoot();
}





/**********************************************/
/* als een van de radio buttons wordt gekozen */
/**********************************************/
colorModeInputs.forEach(colorModeInput => {
    colorModeInput.addEventListener('change', radioChecked);
});

function radioChecked() {
    // de gekozen optie bepalen
    let checkedColorMode = this.value;

    // de gekozen optie opslaan in localstorage
    localStorage.setItem("colorMode", JSON.stringify(checkedColorMode));

    // global var setten
    colorMode = checkedColorMode;

    // :root updaten
    updateColorModeOnRoot();
}





/******************************************************************/
/* als de system prefers-color-scheme of prefers-contrast wijzigt */
/******************************************************************/
window.matchMedia("(prefers-color-scheme: dark)").addEventListener('change', (event) => {
    // de nieuwe waarde opslaan
    systemDarkMode = event.matches; // true or false

    // :root updaten
    updateColorModeOnRoot();
});


window.matchMedia("(prefers-contrast: more)").addEventListener('change', (event) => {
    // de nieuwe waarde opslaan
    systemMoreContrast = event.matches; // true or false

    // :root updaten
    updateColorModeOnRoot();
});





/****************************************/
/* data-color-mode van de :root updaten */
/****************************************/
function updateColorModeOnRoot() {
    // als licht of dark gekozen is
    if (colorMode == "light-mode" || colorMode == "dark-mode" || colorMode == "contrast-mode") {
        document.documentElement.dataset.colorMode = colorMode;
    }
        // als system is gekozen
    // bepalen welke system optie relevant is
    else {
        // als more contrast is gekozen
        if (systemMoreContrast) {
            document.documentElement.dataset.colorMode = "contrast-mode";
        }
        // als dark mode is gekozen
        else if (systemDarkMode) {
            document.documentElement.dataset.colorMode = "dark-mode";
        }
        // anders blijft light mode over
        else {
            document.documentElement.dataset.colorMode = "light-mode";
        }
    }
}