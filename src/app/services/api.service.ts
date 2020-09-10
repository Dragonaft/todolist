import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {UserInterface} from '../Interfaces/UserInterface';
import {environment} from '../../environments/environment';
import {Observable} from 'rxjs';

@Injectable()
export class ApiService{

  constructor(private http: HttpClient){ }

  public getData(): Observable<any> {
    return this.http.get('http://localhost:8000/user_list');
  }

  public pushData(body: {login: any, email: any, password: any}): Observable<any> {
    return this.http.post('http://localhost:8000/user_list', body);
  }

  public login( body: { email: string, password: string}): Observable<any> {
    return this.http.post(`${environment.api} /users/login`, body);
  }
}
