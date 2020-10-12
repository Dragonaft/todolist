import {Component, OnInit, OnDestroy} from '@angular/core';
import {Store, select} from '@ngrx/store';
import {filter, map} from 'rxjs/operators';
import {ApiService} from '../services/api.service';
import ToDoModel from '../Interfaces/ToDoModel';
import {environment} from '../../environments/environment';
import {selectTodosItems} from '../store/selectors/todo.selector';
import {TodosAddRequestAction, TodosListRequestAction, TodosRemoveRequestAction} from '../store/actions/todo.action';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Observable, Subscription} from 'rxjs';
import {Router} from '@angular/router';
import {LogoutAction} from '../store/actions/user.actions';
import {UserInterface} from '../Interfaces/UserInterface';
import {selectActive} from '../store/selectors/user.selector';

@Component({
  selector: 'app-todolist',
  templateUrl: './todolist.component.html',
  styleUrls: ['./todolist.component.css']
})

export class TodolistComponent implements OnInit, OnDestroy {
  constructor(private apiService: ApiService,
              private store: Store,
              private router: Router) {
  }

  public subscriptions: Array<Subscription> = [];
  todos: Array<ToDoModel>;
  public todos$ = this.store.pipe(select(selectTodosItems), filter(Boolean));
  private $user = this.store.pipe(select(selectActive), filter(Boolean));
  public user: UserInterface;

  public newTodo = new FormGroup(
    {
      description: new FormControl('', [
        Validators.required
      ]),
    }
  );

  ngOnInit(): void {
    this.load();
    this.subscriptions.push(
      this.$user.subscribe((data: any) => {
        this.user = data.user;
      })
    );
    this.subscriptions.push(
      this.todos$.subscribe((todos: Array<ToDoModel>) => {
        this.todos = todos.filter(x => x.userListId === this.user.id);
      })
    );
  }

  // tslint:disable-next-line:typedef
  public createToDo(): void {
    this.store.dispatch(new TodosAddRequestAction({...this.newTodo.getRawValue(), userListId: this.user.id}));
    // console.log(this.newTodo.getRawValue());
    // this.apiService.createTodo(this.newTodo.getRawValue()).subscribe((todo) => {
    //   this.todos = [...this.todos, todo];
    // });
    this.newTodo.reset();
  }

  public logOut(): void {
    this.store.dispatch(new LogoutAction());
    this.router.navigateByUrl('/');
  }

  public deleteTodo(id: number): void {
    this.store.dispatch(new TodosRemoveRequestAction(id));
    this.load();
  }

  public load(): void {
    this.store.dispatch(new TodosListRequestAction());
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(s => s.unsubscribe());
    this.store.dispatch(new TodosListRequestAction());
  }
}
