
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

async function getTodos() {
  const localhostAddress = "http://localhost:9000/todo";
  try {
    const response = await fetch(localhostAddress);
    const responseData: ResponseData = await response.json();
    return responseData.data;
  } catch (error) {
    console.error("Error:", error);
    return "could not getTodos: " + error;
  }
}

async function displayTodos() {
  const todoList = await getTodos();

  if (typeof todoList === "string") {
    console.error(todoList);
    return;
  }

  let todoListContainer = document.querySelector("#todos") as HTMLDivElement;

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
