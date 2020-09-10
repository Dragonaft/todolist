import {Component, OnInit} from '@angular/core';
import {FormControl, Validators, FormGroup} from '@angular/forms';
import {ApiService} from '../services/api.service';
import {UserInterface} from '../Interfaces/UserInterface';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})

export class LoginFormComponent implements OnInit {

  constructor(private apiService: ApiService) {
  }

  public loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required])
  });

  hide = true;

  public users: Array<UserInterface> = [];

  getErrorMessageEmail(): string {
    if (this.loginForm.controls.email.hasError('required')) {
      return 'You must enter a value';
    }

    return this.loginForm.controls.email.hasError ? 'Not a valid email' : '';
  }

  getErrorMessagePassword(): string {
    if (this.loginForm.controls.password.hasError('required')) {
      return 'You must enter a value';
    }
    return this.loginForm.controls.password.hasError ? 'Not a valid password' : '';
  }

  public passLogin(): any{
    this.apiService.getData().subscribe( (data: Array<UserInterface>) => {
      this.users = data;
    });

  }

  ngOnInit(): void {
  }
}


