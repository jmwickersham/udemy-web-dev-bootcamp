// window.setTimeout(function() {
//   // put all of your JS code from the lecture here
// }, 500);

console.log('connected');

var todos = ["Buy New Turtle", "Feed Turtle"];

var input = prompt("What would you like to do?");

while (input !== 'quit') {
  // handle input
  if (input === 'new') {
    addTodos();
  }
  else if (input === 'list') {
    listTodos();
  }
  else if(input === 'delete') {
    deleteTodo();
  }

  // ask again for input
  input = prompt("What would you like to do?");
}

console.log('app quit');

function listTodos() {
  console.log('********************');

  todos.forEach(function(todo, index) {
    console.log(index + ': ' + todo);
  });

  console.log('********************');
}

function addTodos() {
  // ask for new todos
  var newTodo = prompt("Enter new todo");
  console.log(newTodo + ' added to the list.');

  // add to todos array
  todos.push(newTodo);
}

function deleteTodo() {
  // ask for index of todo to be deleted
  var index = prompt("Enter index of todo to delete");

  // delete that todo
  todos.splice(index, 1);
  console.log("deleted todo");
}
