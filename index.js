let toDoList = {};

window.onload = () => {
  toDoList = new ToDoList();
  toDoList.create();
  toDoList.render();
}

window.onunload = () => {
  toDoList.setDataToStorage();
}