import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ApiService} from '../services/api.service';

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

  public hide = true;
  constructor(private apiService: ApiService){}

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

  }

  public pushData(): void {
    const data = this.registerForm.getRawValue();
    console.log(data);
    // const loginV = (document.getElementById('login') as HTMLInputElement).value;
    // console.log(loginV);
    // const emailV = (document.getElementById('email') as HTMLInputElement).value;
    // console.log(emailV);
    // const passwordV = (document.getElementById('password') as HTMLInputElement).value;
    // console.log(passwordV);
    this.apiService.pushData(data).subscribe();
    // console.log('good');
  }
}
