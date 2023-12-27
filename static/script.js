var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var localhostAddress = "http://localhost:9000/todo";
var newTodoInput = document.querySelector("#new-todo input");
var submitButton = document.querySelector("#submit");
var isEditingTask = false;
var editButtonTodoID = "";
var isComplete = false;
function getTodos() {
    return __awaiter(this, void 0, void 0, function () {
        var response, responseData, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    return [4 /*yield*/, fetch(localhostAddress)];
                case 1:
                    response = _a.sent();
                    return [4 /*yield*/, response.json()];
                case 2:
                    responseData = _a.sent();
                    return [2 /*return*/, responseData.data];
                case 3:
                    error_1 = _a.sent();
                    console.error("Error:", error_1);
                    return [2 /*return*/, "could not getTodos: " + error_1];
                case 4: return [2 /*return*/];
            }
        });
    });
}
function createTodo(data) {
    return __awaiter(this, void 0, void 0, function () {
        var response, result, error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    return [4 /*yield*/, fetch(localhostAddress, {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json"
                            },
                            body: JSON.stringify(data)
                        })];
                case 1:
                    response = _a.sent();
                    return [4 /*yield*/, response.json()];
                case 2:
                    result = _a.sent();
                    console.log("success: ", result.message);
                    return [3 /*break*/, 4];
                case 3:
                    error_2 = _a.sent();
                    console.error("Error:", error_2);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
}
function deleteTodo(TodoID) {
    return __awaiter(this, void 0, void 0, function () {
        var response, result, error_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    return [4 /*yield*/, fetch(localhostAddress + "/" + TodoID, {
                            method: "DELETE"
                        })];
                case 1:
                    response = _a.sent();
                    return [4 /*yield*/, response.json()];
                case 2:
                    result = _a.sent();
                    console.log("Success:", result.message);
                    return [3 /*break*/, 4];
                case 3:
                    error_3 = _a.sent();
                    console.error("Error:", error_3);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
}
function updateTodo(id, data) {
    return __awaiter(this, void 0, void 0, function () {
        var response, result, error_4;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    return [4 /*yield*/, fetch(localhostAddress + "/" + id, {
                            method: "PUT",
                            headers: {
                                "Content-Type": "application/json"
                            },
                            body: JSON.stringify(data)
                        })];
                case 1:
                    response = _a.sent();
                    return [4 /*yield*/, response.json()];
                case 2:
                    result = _a.sent();
                    console.log("Success:", result);
                    return [3 /*break*/, 4];
                case 3:
                    error_4 = _a.sent();
                    console.error("Error:", error_4);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
}
function addTask() {
    return __awaiter(this, void 0, void 0, function () {
        var data;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    data = { title: newTodoInput.value };
                    return [4 /*yield*/, createTodo(data)];
                case 1:
                    _a.sent();
                    displayTodos();
                    newTodoInput.value = "";
                    return [2 /*return*/];
            }
        });
    });
}
function editTask() {
    return __awaiter(this, void 0, void 0, function () {
        var data;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    data = { title: newTodoInput.value, completed: isComplete };
                    if (!isEditingTask) return [3 /*break*/, 2];
                    return [4 /*yield*/, updateTodo(editButtonTodoID, data)];
                case 1:
                    _a.sent();
                    _a.label = 2;
                case 2:
                    displayTodos();
                    newTodoInput.value = "";
                    isEditingTask = false;
                    submitButton.innerHTML = "Add";
                    return [2 /*return*/];
            }
        });
    });
}
function displayTodos() {
    return __awaiter(this, void 0, void 0, function () {
        var todoList, todoListContainer;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, getTodos()];
                case 1:
                    todoList = _a.sent();
                    if (typeof todoList === "string") {
                        console.error(todoList);
                        return [2 /*return*/];
                    }
                    todoListContainer = document.querySelector("#todos");
                    todoListContainer.innerHTML = "";
                    if (todoList.length == 0) {
                        todoListContainer.innerHTML += "\n            <div class=\"todo\">\n                <span> You do not have any tasks </span>\n            </div>\n            ";
                    }
                    else {
                        todoList.forEach(function (todo) {
                            todoListContainer.innerHTML += "\n        <div class=\"todo\">\n          <span\n            id=\"todoname\"\n            style=\"text-decoration:" + (todo.completed ? "line-through" : "") + "\"\n            data-iscomplete=\"" + todo.completed + "\"\n            data-id=\"" + todo.id + "\"\n          >\n            " + todo.title + "\n            </span>\n\n            <div class=\"actions\">\n                <button data-id=" + todo.id + " class=\"edit\">\n                    <i class=\"fas fa-edit\"></i>\n                </button>\n                <button data-id=" + todo.id + " class=\"delete\">\n                <i class=\"far fa-trash-alt\"></i>\n                </button>\n            <div>\n            \n        </div>\n        ";
                        });
                        deleteTaskButton();
                        editTaskTitleButton();
                        toggleTaskCompletion();
                    }
                    return [2 /*return*/];
            }
        });
    });
}
displayTodos();
function deleteTaskButton() {
    var deleteTodoButtons = Array.from(document.querySelectorAll(".delete"));
    var _loop_1 = function (deleteButton) {
        deleteButton.onclick = function () {
            return __awaiter(this, void 0, void 0, function () {
                var todoID;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            todoID = deleteButton.getAttribute("data-id") || "";
                            return [4 /*yield*/, deleteTodo(todoID)];
                        case 1:
                            _a.sent();
                            displayTodos();
                            return [2 /*return*/];
                    }
                });
            });
        };
    };
    for (var _i = 0, deleteTodoButtons_1 = deleteTodoButtons; _i < deleteTodoButtons_1.length; _i++) {
        var deleteButton = deleteTodoButtons_1[_i];
        _loop_1(deleteButton);
    }
}
function editTaskTitleButton() {
    var _a, _b;
    var editTodoTitleButtons = Array.from(document.querySelectorAll(".edit"));
    var _loop_2 = function (editButton) {
        var todoName = (_b = (_a = editButton.parentNode) === null || _a === void 0 ? void 0 : _a.parentNode) === null || _b === void 0 ? void 0 : _b.children[0];
        editButton.onclick = function () {
            var _a;
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_b) {
                    newTodoInput.value = todoName.innerText;
                    submitButton.innerHTML = "Edit";
                    isEditingTask = true;
                    editButtonTodoID = (_a = editButton.getAttribute("data-id")) !== null && _a !== void 0 ? _a : "";
                    isComplete = JSON.parse(todoName.getAttribute("data-iscomplete"));
                    return [2 /*return*/];
                });
            });
        };
    };
    for (var _i = 0, editTodoTitleButtons_1 = editTodoTitleButtons; _i < editTodoTitleButtons_1.length; _i++) {
        var editButton = editTodoTitleButtons_1[_i];
        _loop_2(editButton);
    }
}
function toggleTaskCompletion() {
    var editTaskCompleted = Array.from(document.querySelectorAll("#todoname"));
    var _loop_3 = function (task) {
        task.onclick = function () {
            var _a;
            return __awaiter(this, void 0, void 0, function () {
                var isTaskDone, todoID, data;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            isTaskDone = JSON.parse(task.getAttribute("data-iscomplete"));
                            todoID = (_a = task.getAttribute("data-id")) !== null && _a !== void 0 ? _a : "";
                            data = { title: task.innerText, completed: !isTaskDone };
                            return [4 /*yield*/, updateTodo(todoID, data)];
                        case 1:
                            _b.sent();
                            displayTodos();
                            return [2 /*return*/];
                    }
                });
            });
        };
    };
    for (var _i = 0, editTaskCompleted_1 = editTaskCompleted; _i < editTaskCompleted_1.length; _i++) {
        var task = editTaskCompleted_1[_i];
        _loop_3(task);
    }
}
submitButton.addEventListener("click", function () {
    return isEditingTask ? editTask() : addTask();
});
