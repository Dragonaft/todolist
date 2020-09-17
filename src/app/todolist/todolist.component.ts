import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {UserInterface} from '../Interfaces/UserInterface';
import { Store, select, Action } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import * as ToDoActions from '../store/actions/todo.action';
import { ToDoReducer } from '../store/reducers/todo.reducers';
import ToDo from '../Interfaces/ToDoModel';
import ActionWithPayload from '../store/actions/ActionWithPayload';
import { map } from 'rxjs/operators';
import ToDoState from '../store/state/ToDoState';
import {ApiService} from '../services/api.service';
import ToDoModel from '../Interfaces/ToDoModel';

@Component({
  selector: 'app-todolist',
  templateUrl: './todolist.component.html',
  styleUrls: ['./todolist.component.css']
})
// export class TodolistComponent implements OnInit, OnDestroy{
  // public items = [];
  // // public itemtext = [];
  // public title: string;
  // public text;
  // constructor() {
  // }
  // constructor(public todoService: StorageService) {
  //   this.title = '';
  // }

  // tslint:disable-next-line:typedef
  // public addToList() {
  //     this.items.push(this.title);
  //     this.title = '';
  // }
  // tslint:disable-next-line:typedef
  // public deleteTask(index) {
  //   this.items.splice(index, 1);
  // }

  // public addToList(): void {
  //   this.todoService.addToList(this.title);
  //   this.title = '';
  // }

  //
  // ToDoState$: Observable<ToDoState>;
  // ToDoSubscription: Subscription;
  // Title: string;
  // ToDoList: ToDo[];

// }

export class TodolistComponent implements OnInit, OnDestroy {
  todo$: Observable<ToDoState>;
  ToDoSubscription: Subscription;
  ToDoList: ToDo[] = [];
  todos: Array<ToDoModel> = [];
  description = '';
  id: number;

  todoError: Error = null;
  constructor(private apiService: ApiService, private store: Store<{ todos: ToDoState }>) {
    this.todo$ = store.pipe(select('todos'));
  }

  ngOnInit(): void {
    this.ToDoSubscription = this.todo$
      .pipe(
        map(x => {
          this.ToDoList = x.ToDos;
          this.todoError = x.ToDoError;
        })
      )
      .subscribe();

    this.store.dispatch(ToDoActions.BeginGetToDoAction());
  }

  // tslint:disable-next-line:typedef
  createToDo() {
    const todo: ToDo = { id: this.id, description: this.description };
    this.store.dispatch(ToDoActions.BeginCreateToDoAction({ payload: todo }));
    this.description = '';
  }

  public deleteTodo(id: number): void {
    this.apiService.deleteTodo(id).subscribe( (data) => {
      this.todos = this.todos.filter( todo => todo.id !== id);
      this.store.dispatch(ToDoActions.BeginGetToDoAction());
    });
  }

  // tslint:disable-next-line:typedef


  ngOnDestroy(): void {
    if (this.ToDoSubscription) {
      this.ToDoSubscription.unsubscribe();
    }
  }
}
