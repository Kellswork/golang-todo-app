
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
const newTodoInput = document.querySelector("#new-todo input") as HTMLInputElement;
let submitButton = document.querySelector("#submit") as HTMLButtonElement;

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

async function createTodo(data: {title: string}) {
  try {
    // send POST request with user input as the req body
    const response = await fetch(localhostAddress, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const result:CreateTodoResponse = await response.json();
    console.log('success: ', result.message)

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
                <button class="edit">
                    <i class="fas fa-edit"></i>
                </button>
                 <button class="delete">
                <i class="far fa-trash-alt"></i>
                </button>
            <div>
            
        </div>
        `;
    });
  } 
}
displayTodos();

submitButton.addEventListener("click", () => addTask());
