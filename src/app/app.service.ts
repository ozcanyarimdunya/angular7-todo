import {Injectable} from '@angular/core';
import Todo from './app.model';


@Injectable()
export class TodoService {
  todoList: Todo[] = [];

  constructor() {
  }

  getAll(): Todo[] {
    return this.todoList;
  }

  get(name: string): Todo {
    return this.todoList.filter(todo => todo.name === name).pop();
  }

  add(todo: Todo): TodoService {
    const isExists = this.get(todo.name);
    if (isExists || todo.name === undefined || todo.name.trim() === '') {
      return;
    }

    this.todoList.push(todo);
    return this;
  }

  delete(name: string): TodoService {
    this.todoList = this.todoList.filter(todo => todo.name !== name);
    return this;
  }

  toggle(name: string): Todo {
    const todo = this.get(name);
    todo.isDone = !todo.isDone;
    return todo;
  }
}
