// JavaScript to generate days dynamically based on the selected month
const monthsDropdown = document.getElementById('months');
const calendar = document.getElementById('calendar');
const selectvalueofDay = document.getElementById('selectvalueofday')
let unique_id=""
// Add an event listener to the dropdown to update days when a month is selected
monthsDropdown.addEventListener('change', updateDays);

// Initial update to set the default days for the initial month
window.onload = function () {
    // Your code to run when the entire page has loaded
    updateDays();
};

// Save tasks to local storage
function saveTasksToLocalStorage(dateId, tasks) {
    localStorage.setItem(dateId, JSON.stringify({ [dateId]: tasks }));
}


// Load tasks from local storage
function loadTasksFromLocalStorage(dateId) {
    const tasksJson = localStorage.getItem(dateId);
    const tasksData = tasksJson ? JSON.parse(tasksJson) : {};
    return tasksData[dateId] || [];
}

function updateDays() {
// Clear existing days
calendar.innerHTML = '';

// Get the selected month from the dropdown
const selectedMonth = parseInt(monthsDropdown.value);

// Get the number of days in the selected month
const daysInMonth = new Date(new Date().getFullYear(), selectedMonth + 1, 0).getDate();

var myday = new Date(new Date().getFullYear(),selectedMonth,1).getDay()   





var daysOfWeek = [1,2,3,4,5,6,0];    
var firstdate =1 
flag=0,j=0;
while(firstdate <=daysInMonth){
    if (daysOfWeek[j]==myday){
        flag=1
    }
    if(flag){
        //green dot
        var greenDot = document.createElement('div');
        greenDot.className = 'dot';
        //date box
        const dayBox = document.createElement('div');
        //generating and setting unique id for each date
        unique_id = "id_"+selectedMonth+'_'+firstdate

        let noOfTasks = loadTasksFromLocalStorage(unique_id);
        //const dotColorClass = dateTasks && dateTasks.length > 0 ? 'red-dot' : 'green-dot';
        if (noOfTasks && noOfTasks.length >0){
            greenDot.className='red-dot'
        }
        else{
            greenDot.className = 'green-dot'
        }


        dayBox.setAttribute('id',unique_id)
        dayBox.setAttribute('class','txtcontent')

        dayBox.classList.add('day-box');   //adding the css to doyBox
        dayBox.textContent = firstdate;
        
        dayBox.appendChild(greenDot);
        calendar.appendChild(dayBox);
        firstdate +=1 
                                                                            //Adding the Newpage
        dayBox.addEventListener('click',()=>{                                   
            var id= dayBox.getAttribute('id')
            const newpage = "task_manager.html"
            let fullurl = newpage+'?id='+encodeURIComponent(id)
            window.location.href =fullurl
        })
    }
    else{
    const dayBox = document.createElement('div');
        dayBox.classList.add('day-box');
        dayBox.textContent = "";
        calendar.appendChild(dayBox);
        
    }
    j+=1
    
}}
    
// Create a Date object for a specific date
// var myDate = new Date( new Date().getFullYear(),0,14); // Replace '2024-02-23' with your desired date
// console.log(myDate.getDay())
// // Get the day of the week (0 for Sunday, 1 for Monday, ..., 6 for Saturday)
// var dayOfWeek = myDate.getDay();

// // Define an array to map the day index to the day name
// var daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

// // Get the day name based on the index
// var dayName = daysOfWeek[dayOfWeek];

// // Output the result
// console.log('The day of the week for', myDate.toDateString(), 'is', dayName);

