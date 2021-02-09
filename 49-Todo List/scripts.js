const form = document.getElementById('form')
const input = document.getElementById('input')
const todosList = document.getElementById('todos')

let todos = JSON.parse(localStorage.getItem('todos'))

if (todos) {
	todos.forEach(todo => addTodo(todo))
}

form.addEventListener('submit', e => {
	e.preventDefault()

	addTodo()
})

function addTodo (todo) {
	let todoText = input.value
	if (todo) {
		todoText = todo.text
	}

	if (todoText) {
		const todoEl = document.createElement('li')
		if (todo && todo.completed) {
			todoEl.classList.add('completed')
		}

		todoEl.addEventListener('click', () => {
			todoEl.classList.toggle('completed')
			updateLocalStorage()
		})
		todoEl.addEventListener('contextmenu', (e) => {
			e.preventDefault()
			todoEl.remove()
			updateLocalStorage()
		})

		todoEl.innerText = todoText
		todosList.appendChild(todoEl)

		input.value = ''

		updateLocalStorage()
	}
}

function updateLocalStorage () {
	todos = document.querySelectorAll('li')
	const todosItems = []
	todos.forEach(todo => {
		todosItems.push({
			text: todo.innerText,
			completed: todo.classList.contains('completed'),
		})
	})

	localStorage.setItem('todos', JSON.stringify(todosItems))
}
