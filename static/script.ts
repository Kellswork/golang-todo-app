interface Todo {
  id: string;
  title: string;
  completedAt: boolean;
  createdAt: number;
}

interface ResponseData {
  message: string;
  data: Todo[];
}

interface CreateTodoResponse {
  message: string;
  dataID: string;
}

const localhostAddress = "http://localhost:9000/todo";
const newTodoInput = document.querySelector(
  "#new-todo input"
) as HTMLInputElement;
const submitButton = document.querySelector("#submit") as HTMLButtonElement;
let isEditingTask = false;
let editButtonTodoID = "";

async function getTodos() {
  try {
    const response = await fetch(localhostAddress);
    const responseData: ResponseData = await response.json();
    return responseData.data;
  } catch (error) {
    console.error("Error:", error);
    return "could not getTodos: " + error;
  }
}

async function createTodo(data: { title: string }) {
  try {
    // send POST request with user input as the req body
    const response = await fetch(localhostAddress, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const result: CreateTodoResponse = await response.json();
    console.log("success: ", result.message);
  } catch (error) {
    console.error("Error:", error);
  }
}

async function deleteTodo(TodoID: string) {
  try {
    const response = await fetch(`${localhostAddress}/${TodoID}`, {
      method: "DELETE",
    });
    const result = await response.json();
    console.log("Success:", result.message);
  } catch (error) {
    console.error("Error:", error);
  }
}

async function updateTodo(
  id: string,
  data: { title: string; completed: boolean }
) {
  try {
    const response = await fetch(`${localhostAddress}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const result = await response.json();
    console.log("Success:", result);
  } catch (error) {
    console.error("Error:", error);
  }
}

async function addTask() {
  const data = { title: newTodoInput.value };
  await createTodo(data);
  displayTodos();

  newTodoInput.value = "";
}

async function editTask() {
  const data = { title: newTodoInput.value, completed: false };
  if (isEditingTask) await updateTodo(editButtonTodoID, data);
  displayTodos();

  newTodoInput.value = "";
  isEditingTask = false;
  submitButton.innerHTML = "Add";
}

async function displayTodos() {
  const todoList = await getTodos();

  if (typeof todoList === "string") {
    console.error(todoList);
    return;
  }

  let todoListContainer = document.querySelector("#todos") as HTMLDivElement;
  todoListContainer.innerHTML = "";

  if (todoList.length == 0) {
    todoListContainer.innerHTML += `
            <div class="todo">
                <span> You do not have any tasks </span>
            </div>
            `;
  } else {
    todoList.forEach((todo) => {
      todoListContainer.innerHTML += `
        <div class="todo">
            <span>${todo.title}</span>

            <div class="actions">
                <button data-id=${todo.id} class="edit">
                    <i class="fas fa-edit"></i>
                </button>
                <button data-id=${todo.id} class="delete">
                <i class="far fa-trash-alt"></i>
                </button>
            <div>
            
        </div>
        `;
    });
    deleteTaskButton();
    editTaskTitleButton();
  }
}
displayTodos();

function deleteTaskButton() {
  const deleteTodoButtons: HTMLButtonElement[] = Array.from(
    document.querySelectorAll(".delete")
  );

  for (const deleteButton of deleteTodoButtons) {
    deleteButton.onclick = async function () {
      const todoID = deleteButton.getAttribute("data-id") || "";
      await deleteTodo(todoID);
      displayTodos();
    };
  }
}

function editTaskTitleButton() {
  const editTodoTitleButtons: HTMLButtonElement[] = Array.from(
    document.querySelectorAll(".edit")
  );

  for (const editButton of editTodoTitleButtons) {
    const todoName = editButton.parentNode?.parentNode?.children[0] as HTMLSpanElement;

    editButton.onclick = async function () {
      newTodoInput.value = todoName.innerText;
      submitButton.innerHTML = "Edit";
      isEditingTask = true;

      editButtonTodoID = editButton.getAttribute("data-id") ?? '';
    };
  }
}


submitButton.addEventListener('click', () => isEditingTask ? editTask() : addTask())