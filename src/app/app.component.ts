import {Component} from '@angular/core';
import {TodoService} from './app.service';
import Todo from './app.model';

declare var $: any;


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [TodoService]
})
export class AppComponent {

  constructor(private todoService: TodoService) {
  }

  get todoList() {
    return this.todoService.getAll();
  }

  appTitle = 'Todo Application';
  author = 'Ozcan Yarimdunya';
  newTodo: Todo = new Todo();

  static showNotification(message: string) {
    $.notify({
      message: message,
    }, {
      placement: {
        from: 'bottom',
        align: 'right'
      },
      delay: 5000,
    });

    $('input[type=text]').focus();
  }


  addTodo() {
    if (this.todoService.add(this.newTodo)) {
      AppComponent.showNotification(`<b>${this.newTodo.name}</b> added!`);
    }
    this.newTodo = new Todo();
  }

  toggleTodo(todo: Todo) {
    this.todoService.toggle(todo.name);
    AppComponent.showNotification(`<b>${todo.name}</b> is set to <code>${todo.isDone}!</code>`);
  }

  deleteTodo(todo: Todo) {
    if (this.todoService.delete(todo.name)) {
      AppComponent.showNotification(`<b>${todo.name}</b> <code>deleted!</code>`);
    }
  }
}
