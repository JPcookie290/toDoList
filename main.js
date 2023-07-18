import Controller from "./modules/Controller.js";
import Model from "./modules/Model.js";
import View from "./modules/View.js";



const app = Controller(Model(), View());
app.model.addTodo("Hello ToDo");
console.log(app.model.getTodos());