const submitTask = document.getElementById("submit-task");
let todoData = [];

let db_Data = JSON.parse(localStorage.getItem("todos"));

submitTask.addEventListener("click", () => {
  let inputValue = document.getElementById("todo-input").value;

  if (Array.isArray(db_Data) && db_Data.length !== 0) {
    let addTodo = {
      todoId: db_Data[db_Data.length - 1].todoId + 1 ,
      todoValue: inputValue,
    };

    db_Data.push(addTodo);
    localStorage.setItem("todos", JSON.stringify(db_Data));
  } else {
    let addTodo = {
      todoId: 10000,
      todoValue: inputValue,
    };
    todoData.push(addTodo);
    localStorage.setItem("todos", JSON.stringify(todoData));
  }

  document.getElementById("todo-input").value = "";
  updateTodos();
});

let todoList = document.querySelector(".todo-list");
function updateTodos() {
  todoList.innerHTML = "";
  let db_Data = JSON.parse(localStorage.getItem("todos"));
  db_Data.forEach((todo) => {
    todoList.innerHTML += `<div class="wrapper d-flex justify-content-between align-items-center">
    <div class="wrap">
      <span id="todo-title">${todo.todoValue}</span>
    </div>
    <div class="wrap" style="position: relative; top: 4px">
      <span class="material-symbols-outlined mx-3" onclick="deleteTodo(${todo.todoId})"> delete_forever </span>

      <span class="material-symbols-outlined" onclick="editTodo(${todo.todoId})"> edit_square </span>
    </div>
  </div>`;
  });
}
updateTodos();

function deleteTodo(id) {
  swal({
    title: "Are you sure?",
    text: "Once deleted, you will not be able to recover this imaginary file!",
    icon: "warning",
    buttons: true,
    dangerMode: true,
  })
  .then((willDelete) => {
    if (willDelete) {
      swal("Poof! Your file has been deleted!", {
        icon: "success",
      });
      let index = db_Data.findIndex((e) => e.todoId == id);
      if (index !== -1) {
        db_Data.splice(index, 1);
        localStorage.setItem("todos", JSON.stringify(db_Data));
        updateTodos();
      };
    } else {
      swal("Your file is safe!");
    }
  });

};
function editTodo(id) {
  let index = db_Data.findIndex((e) => e.todoId == id);
  let submit = document.getElementById("submit-task");
  let edit = document.getElementById("Edit-task");
  let todoInput = document.getElementById("todo-input");

  if (index !== -1) {
    submit.style.display = "none";
    edit.style.display = "block";
    const todo = db_Data[index];
    todoInput.setAttribute("data-todo-id", todo.todoId);
    todoInput.value = todo.todoValue;
  }
}

document.getElementById("Edit-task").addEventListener("click", () => {
  let edit = document.getElementById("Edit-task");
  edit.style.display = "none";
  const editedText = document.getElementById("todo-input").value;
  const todoId = parseInt(document.getElementById("todo-input").getAttribute("data-todo-id"));

  if (!isNaN(todoId)) {
    let index = db_Data.findIndex((e) => e.todoId == todoId);

    if (index !== -1) {
      db_Data[index].todoValue = editedText;
      localStorage.setItem("todos", JSON.stringify(db_Data));
      document.getElementById("todo-input").value = "";
      submitTask.style.display = "block";
      updateTodos();
    }
  }
});
