import { Component, OnInit } from '@angular/core';
import {filter} from 'rxjs/operators';
import {select, Store} from '@ngrx/store';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Subscription} from 'rxjs';

import {ApiService} from '../services/api.service';
import {LogoutAction, UsersListRequestAction} from '../store/actions/user.actions';
import ToDoModel from '../Interfaces/ToDoModel';
import {UserInterface} from '../Interfaces/UserInterface';
import {selectUsersItems} from '../store/selectors/user.selector';

@Component({
  selector: 'app-registration-form',
  templateUrl: './registration-form.component.html',
  styleUrls: ['./registration-form.component.css']
})
export class RegistrationFormComponent implements OnInit {

  public registerForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
    login: new FormControl('', [Validators.required]),
  });

  public users$ = this.store.pipe(select(selectUsersItems), filter(Boolean));
  public users: Array<UserInterface> = [];
  public subscriptions: Array<Subscription> = [];

  public hide = true;
  constructor(private apiService: ApiService,
              private store: Store,){}

  getErrorMessageEmail(): string {
    if (this.registerForm.controls.email.hasError('required')) {
      return 'You must enter a value';
    }

    return this.registerForm.controls.email.hasError ? 'Not a valid email' : '';
  }
  getErrorMessagePassword(): string {
    if (this.registerForm.controls.password.hasError('required')) {
      return 'You must enter a value';
    }
    return this.registerForm.controls.password.hasError ? 'Not a valid password' : '';
  }

  getErrorMessageLogin(): string {
    if (this.registerForm.controls.login.hasError('required')) {
      return 'You must enter a value';
    }
    return this.registerForm.controls.login.hasError ? 'Not a valid password' : '';
  }

  public ngOnInit(): void{
    this.load();
    this.subscriptions.push(
      this.users$.subscribe( (todos: Array<ToDoModel>) => {
        this.users = this.users;
      })
    );
  }

  public load(): void {
     this.store.dispatch( new UsersListRequestAction());
  }

  public register(): void {
    const body = this.registerForm.getRawValue();
    this.apiService.createUser(body).subscribe(console.log);
  }
}
