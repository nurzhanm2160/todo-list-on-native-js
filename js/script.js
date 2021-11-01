let button = document.getElementById("saveTodo");
let input = document.getElementById("todo");
let actions = document.getElementById("action");
let todos = [];

const displayTodos = () => {
    let displayTodo = ''
    
    todos.forEach(function(item, i){
        displayTodo += `<tr id="item_${i}">
            <td>
                <label>
                    <input type="checkbox" />
                <span></span>
            </td>
            </label>
            <td id="text_${i}">${item.action}</td>
            <td>${item.date}</td>
            <th>
                <a class="waves-effect waves-teal btn-flat" id="edit_${i}">
                    Edit
                </a>
            </th>
            <th>
                <a class="waves-effect red accent-4 btn-small" id="delete_${i}">
                    X
                </a>
            </th>
        </tr>`
            actions.innerHTML = displayTodo;
    })   
    
    if(todos[0] == null) {
        actions.innerHTML = displayTodo;
    }
}


if(localStorage.getItem('todo')) {
    todos = JSON.parse(localStorage.getItem('todo'));
    todos.filter((element, i) => {
        if(element == null) {
            delete todos[i]
        }
    })
    displayTodos();
}

button.addEventListener('click', function() {
    let date = new Date().toJSON().slice(0,10).replace(/-/g,'/');
    let newTodo = {
        action: input.value,
        checked: false,
        date: date,
        important: false,
    }
    input.value = '';

    todos.push(newTodo);
    displayTodos();
    localStorage.setItem('todo', JSON.stringify(todos));
});

const editToDo = (todoId) => {
    let editable = todos[todoId];
    let message = ''
    let editSelector = document.getElementById(`item_${todoId}`);
    message = `<h1>Проверка редактирования<h1>`;
    editSelector.innerHTML += message;
    
}

actions.addEventListener('click', function(e) {
    todoId = e.target.id.replace(/\D+/g,"");
    if(e.target.id.slice(1,2) === 'e') {
        delete todos[todoId]
        localStorage.setItem('todo', JSON.stringify(todos));
    } else if (e.target.id.slice(1,2) === 'd') {
        editToDo(todoId);
    }
    displayTodos();
})

// TODO: complete todo editing 
// actions.addEventListener('dblclick', function(e){
//     todoId = e.target.id.replace(/\D+/g,"");
    
// })

// actions.addEventListener('click', function(e) {
//     editId = e.target.id.slice(5,6);
//     console.log(editId)
// })
