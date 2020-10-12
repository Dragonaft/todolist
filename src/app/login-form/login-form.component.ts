import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, Validators, FormGroup} from '@angular/forms';
import {select, Store} from '@ngrx/store';
import {ApiService} from '../services/api.service';
import {UserInterface} from '../Interfaces/UserInterface';
import {ActivatedRoute, Router} from '@angular/router';
import {map} from 'rxjs/operators';
import {LoginRequestAction, LogoutAction} from '../store/actions/user.actions';
import {selectActive} from '../store/selectors/user.selector';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})

export class LoginFormComponent implements OnInit, OnDestroy {

  constructor(private apiService: ApiService,
              private router: Router,
              private store: Store,
              private route: ActivatedRoute) {
  }

  public  hide = true;
  private user$ = this.store.pipe(select(selectActive));
  public subscriptions: Array<Subscription> = [];
  public loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required])
  });

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

  public login(): any{
    const body =  this.loginForm.getRawValue();
    console.log(body);
    this.store.dispatch(new LoginRequestAction(body));
  }

  ngOnInit(): void {
    this.subscriptions.push(
      this.user$.subscribe( (user) => {
        if (user) {
          this.router.navigateByUrl('main');
        }
      }),

    );
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach( s => s.unsubscribe());
  }
}





