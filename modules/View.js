export default function View() {
    let _tempTodoText = "";

    const createElement = (tag, className) => {
        const element = document.createElement(tag);
        className && element.classList.add(className);
        return element;
    }; 
    
    const getElement = (selector) => {
        const element = document.querySelector(selector);
        return element;
    };

    const handleValues = () => {
        const input = getElement("input");
        const todoText = () => input.value;
        const resetInput = () => (input.value = "");
        return [todoText, resetInput];
    };

    //Add Todo Event Listener
    const bindAddTodo = (handler) => {
        const form = getElement("form");
        form.addEventListener("submit", (event) => {
            event.preventDefault();
            const [todoText, resetInput] = handleValues();
            handler(todoText());
            resetInput();
        });
    };

    //delete Todo Event Listener
    const bindDeleteTodo = (handler) => {
        const todoList = getElement(".todo-list");
        todoList.addEventListener("click", (event) => {
            if(event.target.className === 'delete') {
                let id = event.target.parentElement.id;
                console.log(id);
                handler(id);
            };
        });
    };

    //toggle Todo Event Listener
    const bindToggleTodo = (handler) => {
        const todoList = getElement(".todo-list");
        todoList.addEventListener("change", (event) => {
            if(event.target.type === "checkbox") {
                let id = event.target.parentElement.id;
                console.log(id);
                handler(id);
            };
        });
    };

    //edit Todo Event Listener
    const bindEditTodo = (handler) => {
        const todoList = getElement(".todo-list");
        todoList.addEventListener("focusout", (event) => {
            let id = event.target.parentElement.id;
            handler(id, _tempTodoText);
        });
    };

    const configure = () => {
        //create Title
        const root = getElement("#root");
        const title = createElement('h1', 'title');
        title.textContent = "Todos";

        //create Form
        const form = createElement('form');
        const input = createElement('input');
        input.type = "text";
        input.placeholder = "Add todo";
        input.name = "todo";

        //create Submit Button
        const submitButton = createElement('button');
        submitButton.type = 'submit';
        submitButton.textContent = "Add";

        //create todo list
        const todoList = createElement("ul", "todo-list");

        //append elements
        form.append(input, submitButton);
        root.append(title, form, todoList);
    };
    configure();

    //Listener for the Text
    const _initTempListener = () => {
        const todoList = document.querySelector(".todo-list");
        todoList.addEventListener("input", (event) => {
            if (event.target.className === "editable") {
                _tempTodoText = event.target.innerText;
            }
        });
    };
    _initTempListener();
    
    const renderTodos = (todos) => {
        //delete all todos
        const todoList = getElement('.todo-list');
        todoList.innerHTML = "";

        //show message if there are no todos
        if (todos.length === 0) {
            const message = createElement("p", "message");
            message.textContent = "Sorry, there are no todos!";
            todoList.append(message);
            return;
        } else {
            //render Todos
            todos.forEach((todo) => {
                //create list element
                const listElement = createElement("li");
                listElement.id = todo.id;

                //create Checkbox to toggle todos
                const checkbox = createElement('input');
                checkbox.type = 'checkbox';
                checkbox.checked = todo.completed;

                //span with content editable text
                const span = createElement("span", "editable");
                span.contentEditable = true;

                //strike through completed todps
                if (todo.completed) {
                    const strike = createElement("s");
                    strike.textContent = todo.text;
                    span.appendChild(strike);
                } else {
                    span.textContent = todo.text;
                }

                //create delete button
                const deleteButton = createElement("button", "delete");
                deleteButton.textContent = "Delete";

                //append elements to listElement
                listElement.append(checkbox, span, deleteButton);

                //append listElement to toDoList
                todoList.append(listElement);
            });
        }
    };

    return { createElement, getElement, renderTodos, handleValues, bindAddTodo, bindDeleteTodo, bindToggleTodo, bindEditTodo };
}