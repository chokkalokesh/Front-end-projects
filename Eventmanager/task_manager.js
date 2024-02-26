document.addEventListener('DOMContentLoaded', () => {
    var urlParams = new URLSearchParams(window.location.search);
    var dateId = urlParams.get('id');
    const existingTasks = loadTasksFromLocalStorage(dateId);

    const parent_divOfh1 = document.getElementById("parent_div_h1");
    existingTasks.forEach(taskText => {
        createTaskElement(parent_divOfh1, dateId, taskText);
    });
});


function createTaskElement(parentDiv, dateId, taskText) {
    let taskDiv = document.createElement('div');
    taskDiv.setAttribute("class", "div_h1");


    let taskTextSpan = document.createElement('span');
    taskTextSpan.innerText = taskText;

   
    let deleteSymbolSpan = document.createElement('span');
    deleteSymbolSpan.setAttribute('class', 'deleteSymbolSpan'); // Add a class for styling
    deleteSymbolSpan.innerText = '❌';
    deleteSymbolSpan.style.cursor = 'pointer';

   
    taskDiv.appendChild(taskTextSpan);
    taskDiv.appendChild(deleteSymbolSpan);

    
    parentDiv.appendChild(taskDiv);

    
    deleteSymbolSpan.addEventListener('click', () => {
        // Remove the task div from the parent div visually
        parentDiv.removeChild(taskDiv);

        
        let listOfTasks = loadTasksFromLocalStorage(dateId);
        let updatedListOfTasks = listOfTasks.filter(task => task !== taskText);
        saveTasksToLocalStorage(dateId, updatedListOfTasks);
    });
}



const button = document.getElementById("button");
button.addEventListener('click', () => {
    let inputBarText = document.getElementById("tasks").value;

    if (inputBarText.length > 0) {
        const parent_divOfh1 = document.getElementById("parent_div_h1");
        var urlParams = new URLSearchParams(window.location.search);
        var dateId = urlParams.get('id');
        createTaskElement(parent_divOfh1, dateId, inputBarText);


        const listOfTasks = loadTasksFromLocalStorage(dateId);
        listOfTasks.push(inputBarText);
        saveTasksToLocalStorage(dateId, listOfTasks);
    }


    document.getElementById("tasks").value = '';
});



//local storage functions
function saveTasksToLocalStorage(dateId, tasks) {
    localStorage.setItem(dateId, JSON.stringify({ [dateId]: tasks }));
}


function loadTasksFromLocalStorage(dateId) {
    const tasksJson = localStorage.getItem(dateId);
    const tasksData = tasksJson ? JSON.parse(tasksJson) : {};
    return tasksData[dateId] || [];
}