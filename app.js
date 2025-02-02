// const display = document.getElementById("display");

// const clearDisplay = () => (display.textContent = "0");

// const addToDisplay = (value) => {
//     const lastChar = display.textContent.slice(-1);
//     if (display.textContent === "0" && !isNaN(value)) {
//         display.textContent = value;
//     } else if (!(['+', '-', '*', '/'].includes(lastChar) && ['+', '-', '*', '/'].includes(value))) {
//         display.textContent += value;
//     }
// };

// const toggleSign = () => {
//     if (display.textContent !== "0") {
//         display.textContent = (-parseFloat(display.textContent)).toString();
//     }
// };

// const calculateResult = () => {
//     try {
//         display.textContent = display.textContent.includes('%')
//             ? parseFloat(display.textContent.split('%')[0]) * (parseFloat(display.textContent.split('%')[1]) / 100)
//             : eval(display.textContent);
//     } catch {
//         display.textContent = "Error";
//     }
// };

// document.addEventListener("keydown", ({ key }) => {
//     if (!isNaN(key) || ['+', '-', '*', '/', '%'].includes(key)) addToDisplay(key);
//     else if (key === "Enter") calculateResult();
//     else if (key === "Backspace") display.textContent = display.textContent.slice(0, -1) || "0";
//     else if (key === "Escape") clearDisplay();
// });


const display = document.getElementById("display");
const clickSound = new Audio('ses/click-151673.mp3');

const clearDisplay = () => display.textContent = "0";

const addToDisplay = (v) => {
    if (v === 'e' || /[eE]/.test(display.textContent)) {
        return;
    }

    display.textContent = display.textContent === "0" && !isNaN(v)
        ? v
        : /[+\-*/]$/.test(display.textContent) && /[+\-*/]/.test(v)
            ? display.textContent
            : display.textContent + v;

    clickSound.play();
};

const toggleSign = () => {
    display.textContent = display.textContent !== "0"
        ? (-parseFloat(display.textContent)).toString()
        : "0";
    clickSound.play();
};

const calculateResult = () => {
    display.textContent = display.textContent.includes('%')
        ? eval(display.textContent.replace('%', '/100*'))
        : eval(display.textContent) || "Error";
    clickSound.play();
};

document.addEventListener("keydown", ({ key }) => {
    if (!isNaN(key) || /[+\-*/%]/.test(key)) addToDisplay(key);

    if (key === "Enter") calculateResult();

    if (key === "Backspace") display.textContent = display.textContent.slice(0, -1) || "0";

    if (key === "Delete") clearDisplay();
});

const buttons = document.querySelectorAll(".button div");
buttons.forEach(button => {
    button.addEventListener("click", () => {
        clickSound.play();
    });
});

