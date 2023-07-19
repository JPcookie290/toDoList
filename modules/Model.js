export default function Model() {
    let _onTodoChange = () => { };

    let _todos = JSON.parse(localStorage.getItem("todos")) || [];

    const getTodos = () => _todos;

    const _pushTodos = (todos) => {
        _onTodoChange(todos);
        localStorage.setItem("todos", JSON.stringify(todos));
    }

    const addTodo = (text) => {
        if (text != "") {
            const todo = {
                id: Math.floor(Math.random()* 100000), // _todos.length + 1,
                text,
                completed: false,
            };
            _todos.push(todo);
            _pushTodos(_todos);
        }
    };

    const removeTodo = (id) => {
        _todos = _todos.filter((todo) => todo.id !== id);
        _pushTodos(_todos);
    };


    const editTodo = (id, text) => {
        _todos = _todos.map(todo => {
            if (todo.id !== id) return todo;
            return { ...todo, text };
        });
        _pushTodos(_todos);
    };

    const toggleTodo = (id) => {
        _todos = _todos.map(todo => {
            if (todo.id !== id) return todo;
            return { ...todo, completed: !todo.completed };
        });
        _pushTodos(_todos);
    };

    const bindTodoChanged = (callback) => {
        _onTodoChange = callback;
    };

    return { addTodo, removeTodo, editTodo, toggleTodo, getTodos, bindTodoChanged };
}