import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {UserInterface} from '../Interfaces/UserInterface';
import {environment} from '../../environments/environment';
import {Observable} from 'rxjs';
import {catchError, tap} from 'rxjs/operators';
import {LogoutAction} from '../store/actions/user.actions';
import {Router} from '@angular/router';
import {Store} from '@ngrx/store';

export interface AuthResponse {
  user: UserInterface;
  token: string;
  expiresIn: string;
}

@Injectable()
export class ApiService{

  constructor(private http: HttpClient,
              private store: Store,
              private router: Router){ }

  get token(): string {
    const expDate = new Date(localStorage.getItem('auth-token-exp'));
    if (new Date() > expDate) {
      this.logout();
      return null;
    }
    return localStorage.getItem('auth-token');
  }

  public logout(): void {
    this.setToken(null);
  }

  private setToken(response: AuthResponse | null): void {
    if (response) {
      const expDate = new Date(new Date().getTime() + +response.expiresIn * 1000);
      localStorage.setItem('auth-token', response.token);
      localStorage.setItem('auth-token-exp', expDate.toString());
    } else {
      localStorage.removeItem('auth-token');
      localStorage.removeItem('auth-token-exp');
    }
  }

  public isAuthenticated(): boolean {
    return !!this.token;
  }

  public createUser( body: { email: string, password: string, name: string}): Observable<any> {
    return this.http.post(`${environment.api}/user_lists`, body);
  }

  public getData(): Observable<any> {
    return this.http.get(`${environment.api}/user_lists`);
  }

  public pushData(body: {login: any, email: any, password: any}): Observable<any> {
    return this.http.post(`${environment.api}/user_lists`, body);
  }

  public login( body: { email: string, password: string}): Observable<any> {
    return this.http.post(`${environment.api}/user_lists/login`, body).pipe(
      tap(((response: AuthResponse ) => {
        this.setToken(response);
      })),
      catchError((err) => {
        this.setToken(null);
        return err;
      })
    );
  }

  public getToDo(): Observable<any>{
    return this.http.get(`${environment.api}/todolist/`);
  }

  public deleteTodo(id: number): Observable<any> {
    return this.http.delete(`${environment.api}/todolist/${id}`);
  }

  public createTodo( body: { description: string, userListId: number}): Observable<any> {
    return this.http.post(`${environment.api}/todolist`, body);
  }

  public updateTodo(data): Observable<any> {
    const {id, status} = data;
    return this.http.put(`${environment.api}/todolist/${id}/update`, {status});
  }

  public updateUser(data): Observable<any> {
    const {first_name, last_name, login} = data;
    return this.http.put(`${environment.api}/user_lists/`, {data});
  }

  public me(): Observable<any>{
    const token = this.token;
    console.log(token);
    return this.http.get(`${environment.api}/users/me`, {
      headers: {
        authorization: token,
        'Content-Type': 'application/json'
      }
    });
  }
}
