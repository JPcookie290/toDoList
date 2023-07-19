export default function Controller(model, view) {
    const ontoDoChange = (todos) => {
        view.renderTodos(todos);
    };

    ontoDoChange(model.getTodos());

    //handle add Todo
    const _handleAddTodos = (todoText) => {
        model.addTodo(todoText);
    };
    

    //handle remove Todo
    const _handleRemoveTodos = (id) => {
        model.removeTodo(id);
    };

    //handle edit Todo
    const _handleEditTodos = (id, text) => {
        model.editTodo(id, text);
    };

    //handle toggle Todo
    const _handleToggleTodos = (id) => {
        model.toggleTodo(id);
    };

    view.bindAddTodo(_handleAddTodos);
    view.bindDeleteTodo(_handleRemoveTodos);
    view.bindToggleTodo(_handleToggleTodos);
    view.bindEditTodo(_handleEditTodos);
    model.bindTodoChanged(ontoDoChange);
    return {};
}