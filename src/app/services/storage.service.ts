import {Injectable} from '@angular/core';
import {Todo} from '../todo';

@Injectable({
  providedIn: 'root'
})
// @ts-ignore
export class StorageService {
  public nextId: number;


  constructor() {
    const todos = this.getTodos();

    if (todos.length === 0){
      this.nextId = 0;
    } else {
      const maxId = todos[todos.length - 1].id;
      this.nextId = maxId + 1;
    }
  }

  // getData(key: string): any {
  //   return JSON.parse(localStorage.getItem(key));
  // }
  //
  // setData(key: string, data: any) {
  //   localStorage.setItem(key, JSON.stringify(data));
  // }

  public addToList(text: string): void {
    const todo = new Todo(this.nextId, text);
    const todos = this.getTodos();
    todos.push(todo);
    this.setLocaleStorageTodos(todos);
    // this.todos.push(todo);
    // console.log(this.nextId);
    this.nextId++;
  }

  public getTodos(): Todo[] {
    const localStorageItem = JSON.parse(localStorage.getItem('todos'));
    return localStorageItem == null ? [] : localStorageItem.todos;
    // return this.todos;
  }

  public removeTodo(id: number): void {
    // console.log(id);
    let todos = this.getTodos();
    todos = todos.filter((todo) => todo.id !== id);
    this.setLocaleStorageTodos(todos);
  }

  private setLocaleStorageTodos(todos: Todo[]): void{
   localStorage.setItem('todos', JSON.stringify({ todos: todos }));
  }

}
