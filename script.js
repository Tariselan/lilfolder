// script.js
let TODO = prompt("Enter your tasks seperated by commas").split(",");
const centrediv = document.getElementById("centre");

function click() {
    let audio = new Audio('click.wav');
    audio.play();
}

function playDingSound() {
    let audio = new Audio('ding.wav');
    audio.play();
}


let todoMap = TODO.reduce((acc, item) => {
    acc[item] = false;
    return acc;
}, {})

function createTaskElement(item) {
    const newSpan = document.createElement("span");
    newSpan.innerText = `${TODO.indexOf(item) + 1}. ${item} ${todoMap[item]}`;
    newSpan.id = item;
    return newSpan;
}

function renderTasks() {
    TODO.forEach(item => {
        const taskElement = createTaskElement(item);
        centrediv.appendChild(taskElement);
        centrediv.appendChild(document.createElement("br"));
        centrediv.appendChild(document.createElement("div")).style.height = "30px";
    });
}

function toggleTaskCompletion(taskElement) {
    const taskName = taskElement.id;
    const span_parity = taskElement.innerText.slice(-5);

    if (span_parity === "false") {
        taskElement.innerText = taskElement.innerText.slice(0, -5) + "True";
        taskElement.style.backgroundColor = "#4CAF50";
        click();
        todoMap[taskName] = true;
        updateStatusBar();
    }
}

centrediv.addEventListener("click", (event) => {
    const target = event.target;
    if (target.tagName === "SPAN") {
        toggleTaskCompletion(target);
    }
});

function updateStatusBar() {
    const completedCount = Object.values(todoMap).filter(Boolean).length;
    const totalCount = Object.keys(todoMap).length;
    const percentage = (completedCount / totalCount) * 100;

    // Clamp the width between 0% and 100%
    const clampedWidth = Math.max(0, Math.min(100, percentage));

    document.getElementById("completion").style.width = clampedWidth + "%"; // Adjusted to use percentage units

    const red = Math.min(255, Math.round(255 * (100 - clampedWidth) / 100));
    const green = Math.min(255, Math.round(255 * clampedWidth / 100));
    document.getElementById("completion").style.backgroundColor = `rgb(${red}, ${green}, 0)`;

    const fractionText = `${completedCount}/${totalCount}`;
    const percentageText = `${clampedWidth.toFixed(2)}%`;

    document.getElementById("completion-info").innerText = `Completed: ${fractionText} (${percentageText})`;

    if (clampedWidth === 100) {
        playDingSound(); // Call the function to play the ding sound
    }
}


renderTasks();
updateStatusBar();