const MAX_INPUT_LENGTH = 100;
const SAVE_BTN_VALUE = 'Сохранить';
const EDIT_BTN_VALUE = 'Редактировать';
const DELETE_BTN_VALUE = 'Удалить';
const ADD_BTN_VALUE = 'Добавить';
const BTN_CLASS = 'btn';
const DIV = 'div';
const HIDDEN_STATE = 'hidden';
const VISIBLE_STATE = 'visible';
const STORAGE_KEY = 'toDoListValues';

class ToDoList {
  constructor(values = []) {
    this.values = values;
  }

  create() {
    this.listBlock = document.createElement(DIV);
    this.listBlock.classList.add('wrapper');

    this._createTasksList();
    this._createAddBlock();

    this.listBlock.append(this._tasksList);
    this.listBlock.append(this._addBlock);
  }

  _createAddBlock() {
    this._addBlock = document.createElement(DIV);
    this._addBlock.classList.add('add_block');

    this._textInput = document.createElement('textarea');
    this._textInput.maxLength = MAX_INPUT_LENGTH;
    this._textInput.classList.add('add_input');

    const addBtn = document.createElement(DIV);
    addBtn.classList.add(BTN_CLASS);
    addBtn.innerText = ADD_BTN_VALUE;

    addBtn.addEventListener('click', this._addTask.bind(this));

    this._addBlock.append(this._textInput);
    this._addBlock.append(addBtn);
  }

  _addTask () {
    this.values.push(this._textInput.value);
    new TaskOfList(this._textInput.value, this._tasksList).render();
  }

  _createTasksList() {
    this._tasksList = document.createElement(DIV);
    this._tasksList.classList.add('tasks');

    for (const valueOfTask of this.values) {
      new TaskOfList(valueOfTask, this._tasksList, this.values).render();
    }

  }

  setDataToStorage() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(this.values));
  }

  getDataFromStorage() {
    const jsonValues = localStorage.getItem(STORAGE_KEY);

    if (jsonValues !== 'undefined') {
      this.values = JSON.parse(jsonValues);
    }
  }

  render() {
    document.body.append(this.listBlock);
  }
}

class TaskOfList {
  constructor(value, list, valuesList) {
    this.value = value;
    this.list = list;
    this.valuesList = valuesList;

    this.create()
  }

  create() {
    this._taskBlock = document.createElement(DIV);
    this._taskBlock.classList.add('task');

    this._taskValueBlock = document.createElement('input');
    this._taskValueBlock.classList.add('task_value');
    this._taskValueBlock.readOnly = true;
    this._taskValueBlock.value = this.value;

    this._taskBlock.append(this._taskValueBlock);
    this._createButtons();
  }

  _createButtons() {
    const buttons = document.createElement(DIV);
    buttons.classList.add('task__buttons');

    this._saveBtn = document.createElement(DIV);
    this._saveBtn.innerText = SAVE_BTN_VALUE;
    this._saveBtn.classList.add(BTN_CLASS);
    this._saveBtn.style.visibility = HIDDEN_STATE;

    this._editBtn = document.createElement(DIV);
    this._editBtn.innerText = EDIT_BTN_VALUE;
    this._editBtn.classList.add(BTN_CLASS);

    this._deleteBtn = document.createElement(DIV);
    this._deleteBtn.innerText = DELETE_BTN_VALUE;
    this._deleteBtn.classList.add(BTN_CLASS);

    this._saveBtn.addEventListener('click', this._saveTask.bind(this));
    this._editBtn.addEventListener('click', this._editTask.bind(this));
    this._deleteBtn.addEventListener('click', this._deleteTask.bind(this));

    buttons.append(this._saveBtn);
    buttons.append(this._editBtn);
    buttons.append(this._deleteBtn);

    this._taskBlock.append(buttons);
  }

  _saveTask() {
    this._taskValueBlock.readOnly = true;
    this._editBtn.style.visibility = VISIBLE_STATE;
    this._saveBtn.style.visibility = HIDDEN_STATE;
  }

  _editTask() {
    this._taskValueBlock.readOnly = false;
    this._taskValueBlock.focus();
    this._saveBtn.style.visibility = VISIBLE_STATE;
    this._editBtn.style.visibility = HIDDEN_STATE;
  }

  _deleteTask() {
    this.list.removeChild(this._taskBlock);
    const INDEX_OF_VALUE = this.valuesList.indexOf(this.value);
    this.valuesList = this.valuesList.splice(INDEX_OF_VALUE, 1);

    this._saveBtn.removeEventListener('click', this._saveTask);
    this._editBtn.removeEventListener('click', this._editTask);
    this._deleteBtn.removeEventListener('click', this._deleteTask);
  }

  render() {
    this.list.append(this._taskBlock);
  }
}