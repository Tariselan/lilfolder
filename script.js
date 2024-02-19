let todoMap;
const centrediv = document.getElementById("centre");


function click() {
    let audio = new Audio('click.wav');
    audio.play();
}

function playDingSound() {
    let audio = new Audio('ding.wav');
    audio.play();
}

function toggleTaskCompletion(taskElement) {
    const taskName = taskElement.id;
    const completed = taskElement.dataset.completed === "true"; // Check completion statusc
    console
    if (!completed) {
        // Task is not completed, mark it as completed
        taskElement.style.backgroundColor = "#4CAF50"; // Change background color visually
        click();
        taskElement.dataset.completed = "true"; // Update completion status
        todoMap[taskName] = true;
    } else {
        // Task is completed, mark it as incomplete
        taskElement.style.backgroundColor = "#AAA"; // Change background color visually
        click();
        taskElement.dataset.completed = "false"; // Update completion status
        todoMap[taskName] = false;
    }

    updateStatusBar();
}


function updateStatusBar() {
    const completedCount = document.querySelectorAll('#centre [data-completed="true"]').length;
    const totalCount = document.querySelectorAll('#centre [data-completed]').length;
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

document.getElementById('task').addEventListener('click', function () {
    let TODO = prompt("Enter your tasks separated by commas").split(",");
    todoMap = {};

    renderTasks();

    function createTaskElement(item, index) {
        const newSpan = document.createElement("span");
        newSpan.innerText = `${index + 1}. ${item}`;
        const taskId = `${item}_${Date.now()}`; // Generate a unique ID for the task
        newSpan.id = taskId;
        newSpan.dataset.completed = "false"; // Initialize the data attribute
        return newSpan;
    }

    function renderTasks() {
        centrediv.innerHTML = ""; // Clear previous tasks
        TODO.forEach((item, index) => {
            const taskElement = createTaskElement(item, index);
            centrediv.appendChild(taskElement);
            // Attach event listener for the newly created span
            taskElement.addEventListener("click", () => {
                toggleTaskCompletion(taskElement);
            });
        });
    }

    updateStatusBar();
});