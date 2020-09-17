import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {UserInterface} from '../Interfaces/UserInterface';
import {environment} from '../../environments/environment';
import {Observable} from 'rxjs';

@Injectable()
export class ApiService{

  constructor(private http: HttpClient){ }

  public getData(): Observable<any> {
    return this.http.get(`${environment.api}/user_lists`);
  }

  public pushData(body: {login: any, email: any, password: any}): Observable<any> {
    return this.http.post(`${environment.api}/user_list`, body);
  }

  public login( body: { email: string, password: string}): Observable<any> {
    return this.http.post(`${environment.api}/user_list/login`, body);
  }

  public getToDo(): Observable<any>{
    return this.http.get(`${environment.api}/todolist`);
  }

  public deleteTodo(id: number): Observable<any> {
    return this.http.delete(`${environment.api}/todolist/${id}`);
  }
}
