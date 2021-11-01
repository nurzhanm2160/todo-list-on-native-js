let button = document.getElementById("saveTodo");
let input = document.getElementById("todo");
let actions = document.getElementById("action");
let todos = [];

const displayTodos = () => {
    let displayTodo = '';
    
    todos.forEach(function(item, i){
        displayTodo += !item.editing ? `<tr id="item_${i}">
            <td>
                <label>
                    <input type="checkbox" />
                <span></span>
                </label>
            </td>
            <td id="text_${i}">${item.action}</td>
            <td>${item.date}</td>
            <td>
                <a class="waves-effect waves-teal btn-flat" id="edit_${i}">
                    Edit
                </a>
            </td>
            <td>
                <a class="waves-effect red accent-4 btn-small" id="delete_${i}">
                    X
                </a>
            </td>
        </tr>
        `
        :
        displayTodo += `<tr id="item_${i}">
                <td>
                    <label>
                        <input type="checkbox" />
                    <span></span>
                    </label>
                </td>
                <td id="text_${i}">
                    <input value="${item.action}" id="todo_${i}" type="text" />    
                </td>
                <td>
                    <input value="${item.date}" id="date_${i}" type="text" />    
                </td>
                <td>
                    <a class="waves-effect waves-teal btn-flat">
                        Edit
                    </a>
                </th>
                <td>
                    <a class="waves-effect green accent-4 btn-small" id="save_${i}">
                        SAVE
                    </a>
                </td>
            </tr>
        `
       
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
        editing: false,
    }
    input.value = '';

    todos.push(newTodo);
    displayTodos();
    localStorage.setItem('todo', JSON.stringify(todos));
});

const editToDo = (todoId) => {
    let editable = todos[todoId];
    editable.editing = true;
}

const saveEditingToDo = (todoId) => {
    let newInput = document.getElementById(`todo_${todoId}`)
    let newDate = document.getElementById(`date_${todoId}`)
    todos[todoId].action = newInput.value;
    todos[todoId].date = newDate.value;
    todos[todoId].editing = false;
    
}

actions.addEventListener('click', function(e) {
    todoId = e.target.id.replace(/\D+/g,"");
    temp = e.target.id.slice(0,2);

    switch(temp) {
        case 'de':
            delete todos[todoId]
            displayTodos();
            break;
        case 'ed':
            editToDo(todoId);
            displayTodos();
            break;
        case 'sa':
            saveEditingToDo(todoId);
            displayTodos();
            break;
    }
    localStorage.setItem('todo', JSON.stringify(todos));
})
