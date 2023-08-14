
// const newItemForm = document.querySelector('#addItem');
// const taskList = document.querySelector('#actionItems');
// const removeButtons = document.querySelectorAll('li button');
// const actionItem = document.querySelector('input[name="actionItemName"]');
// for (let btn of removeButtons) {
// 	btn.addEventListener('click', function(e) {
// 		e.target.parentElement.remove();
// 	})
// }

// newItemForm.addEventListener('submit', function(e, ) {
// 	e.preventDefault();
// 	const inboxItem = addItemToInbox(actionItem.value);
// });

// function addItemToInbox(name) {
// 	const newActionItem = document.createElement('li');
// 	const actionItemDelete = document.createElement('button');
// 	actionItemDelete.innerText = 'x';
	
// 	newActionItem.innerText = name;
// 	newActionItem.value = '';
// 	const newTask = taskList.appendChild(newActionItem);
// 	newTask.appendChild(actionItemDelete);
	
	
// }


const newItemForm = document.querySelector('#addItem');
const taskList = document.querySelector('#actionItems');
const actionItem = document.querySelector('input[name="actionItemName"]');

taskList.addEventListener('click', function(event) {
	if (event.target.tagName === 'BUTTON') {
		event.target.parentElement.remove();
	}
	if (event.target.tagName === 'SPAN') {
		event.target.parentElement.classList.toggle('flagged');
	}
	if (event.target.tagName === 'INPUT') {
		event.target.parentElement.classList.toggle('complete');
	}
})


newItemForm.addEventListener('submit', function(e) {
	e.preventDefault();
	const inboxItem = addItemToInbox(actionItem.value);
});

function addItemToInbox(name) {
	const newActionItem = document.createElement('li');
	const actionItemName = document.createElement('span');
	const actionItemDelete = document.createElement('button');
	const flag = document.createElement('span');
	flag.innerHTML = '&#9873;'
	flag.classList.add('flag');
	actionItemDelete.innerText = 'x';
	actionItemName.innerText = name;
	actionItem.value = '';
	const newTask = taskList.appendChild(newActionItem);
	const actionItemNameText = newTask.appendChild(actionItemName);
	actionItemNameText.classList.add('task');
	newTask.appendChild(actionItemDelete);
	
	newTask.prepend(flag);
	const checkbox = document.createElement('input');
	checkbox.type = 'checkbox';
	newTask.prepend(checkbox);
}