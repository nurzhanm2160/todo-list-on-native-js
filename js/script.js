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
            <td>${item.action}</td>
            <td>${item.date}</td>
            <th>
                <a class="waves-effect red accent-4 btn-small" id="delete_${i}">
                    <img src="img/x.png">
                </a>
            </th>
            <th>
                <a class="waves-effect waves-teal btn-flat" id="edit_${i}">
                    Edit
                </a>
            </th>
        </tr>`
            actions.innerHTML = displayTodo;
    })   
    
    if(todos[0] == undefined) {
        actions.innerHTML = displayTodo;
    }
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
});

actions.addEventListener('click', function(e) {
    todoId = e.target.id.slice(1,2);
    console.log(todoId)
    delete todos[todoId];
    console.log(todos)
    displayTodos();
})

// actions.addEventListener('click', function(e) {
//     editId = e.target.id.slice(5,6);
//     console.log(editId)
// })
