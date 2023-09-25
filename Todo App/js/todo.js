/* gets input field */
var input = document.getElementById('task');

/* triggers 'Add Item' button click on keyboard 'Enter' click */
input.addEventListener('keypress', function (event) {
    if (event.key === 'Enter') {
        event.preventDefault();
        document.getElementById('add').click();
    }
})

/* this function gets the task from input */
function get_todos() {

    /* this creates an array of tasks that are inputted */
    var todos = new Array;

    /* this pulls the task that was saved in the web browser memory */
    var todos_str = localStorage.getItem('todo');

    /* if the input is not null, JSON.parse will communicate with the
       web browser to make the task a JavaScript object */
    if (todos_str !== null) {
        todos = JSON.parse(todos_str);
    }
    return todos;
}

/* this function adds the inputted task to the get_todos function array */
function add() {

    /* this takes the inputted task and creates a variable of it */
    var task = document.getElementById('task').value;

    var todos = get_todos();

    /* this adds a new task to the end of the array */
    todos.push(task);

    /* this converts the task input to a JSON string */
    localStorage.setItem('todo', JSON.stringify(todos));
    document.getElementById('task').value = "";
    show();

    return false;
}

/* this function keeps the tasks permanently displayed on the screen */
function show() {

    /* this sets the task that was retrieved as a variable */
    var todos = get_todos();

    /* this sets up each task as an unordered list */
    var html = '<ul>';

    /* this displays a task to the list in the order that it is inputted */
    for (var taskIndex = 0; taskIndex < todos.length; taskIndex++) {

        /* this displays the task as a list and creates the button with the "X" */
        html += '<li>' + todos[taskIndex] + '&nbsp;&nbsp;<button class="remove" id="' + taskIndex
            + '" onclick="remove(this.id)">x</button></li>';
    };
    html += '</ul>';

    /* this displays the task as a list */
    document.getElementById('todos').innerHTML = html;
}

/* removes task when 'X' button is clicked */
function remove(btnId) {
    var id = btnId;
    var todos = get_todos();
    todos.splice(id, 1);
    localStorage.setItem('todo', JSON.stringify(todos));
    show();
}

/* this displays the inputted task when the 'Add Item' button is clicked */
document.getElementById('add').addEventListener('click', add);

/* this will keep the tasks displayed permanently on the screen */
show();

