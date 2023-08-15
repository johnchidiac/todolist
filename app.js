const taskForm = document.querySelector('#taskForm');
const taskList = document.querySelector('#taskList');
const newTask = document.querySelector('input[name="taskName"]');

function getStoredTasks() {
	const storedTasksJSON = localStorage.getItem('Tasks');
	return (storedTasksJSON) ? JSON.parse(storedTasksJSON) : {};
}

function setStoredTasks(tasks) {
	localStorage.setItem('Tasks', JSON.stringify(tasks));
}

taskList.addEventListener('click', function(e) {

	const clickedItem = e.target;
	
	if (clickedItem.tagName === 'BUTTON') { // DELETE
		const taskName = clickedItem.parentElement.querySelector('.taskName').innerText;
		deleteTask(taskName);
		// clickedItem.parentElement.remove();
	}

	if (clickedItem.tagName === 'SPAN') { // FLAG
		const taskName = clickedItem.parentElement.querySelector('.taskName').innerText;
		const isFlagged = clickedItem.parentElement.classList.contains('flagged');
		if (isFlagged) {
			// clickedItem.parentElement.classList.remove('flagged');
			updateTask(taskName, 'isFlagged', 'false');
		} else {
			// clickedItem.parentElement.classList.add('flagged');
			updateTask(taskName, 'isFlagged', 'true');
		}
	}

	if (clickedItem.tagName === 'INPUT') { // CHECKBOX
		
		if (clickedItem.checked) {
			updateTask(clickedItem.parentElement.querySelector('.taskName').innerText, 'isComplete', 'false');
			// clickedItem.parentElement.classList.add('complete');
		} else {
			updateTask(clickedItem.parentElement.querySelector('.taskName').innerText, 'isComplete', 'true');
			// clickedItem.parentElement.classList.remove('complete');
		}
	}

});


function populateTaskList() {
    
	const storedTasks = getStoredTasks();
        
    // Clear the taskList before repopulating it
    taskList.textContent = '';
    
    if (storedTasks) {
        
        for (let task in storedTasks) {
            const taskListItem = document.createElement('li');
    
            const taskName = document.createElement('span');
            taskName.innerText = task;
            taskName.classList.add('taskName');
            taskListItem.appendChild(taskName);
            
            const taskFlag = document.createElement('span');
            taskFlag.innerHTML = '&#9873;';
            taskFlag.classList.add('flag');
            const isFlagged = (storedTasks[task].isFlagged === "true") ? 'flagged' : '';
            if (isFlagged) { taskFlag.classList.add(isFlagged); }
            taskListItem.prepend(taskFlag);
    
            const taskDeleteButton = document.createElement('button');
            taskDeleteButton.innerHTML = '&#x2715;';
			taskDeleteButton.classList.add('hidden');
            taskListItem.appendChild(taskDeleteButton);
    
            const taskStatusCheckbox = document.createElement('input');
            const completeStatus = (storedTasks[task].isComplete === "true") ? true : false;
            taskStatusCheckbox.type = 'checkbox';
            taskStatusCheckbox.checked = completeStatus;
            taskListItem.prepend(taskStatusCheckbox);
        
            taskList.appendChild(taskListItem);
        }
        
    } else {
        const emptyState = document.createElement('li');
        emptyState.innerText = "No tasks remaining to do!";
        emptyState.id = 'emptyList';
        taskList.appendChild(emptyState); // Changed from replaceChildren to appendChild
    }
}

populateTaskList();

function addTask(name) {
	const storedTasks = getStoredTasks();

	storedTasks[name] = {
		"isComplete": "false",
		"isFlagged": "false"
	};
	setStoredTasks(storedTasks);

	populateTaskList();
}


function updateTask(name, attribute, value) {
	// Get the storedTasks object from localStorage and parse it
	const storedTasks = getStoredTasks();
  
	// Update the task attribute in the storedTasks object
	if (storedTasks[name]) {
	  storedTasks[name][attribute] = value;
  
	  setStoredTasks(storedTasks);
	  
	  populateTaskList();

	} else {
	  console.error(`Task "${name}" not found!`);
	}
  }
  
  function deleteTask(name) {
	const storedTasks = getStoredTasks();

	delete storedTasks[name];
	setStoredTasks(storedTasks);

	populateTaskList();
}

taskForm.addEventListener('submit', function(e) {
	e.preventDefault();
	addTask(newTask.value);
	newTask.value = ''; // Clear field after submission
});
