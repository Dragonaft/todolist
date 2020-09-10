import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {UserInterface} from '../Interfaces/UserInterface';

@Injectable()
export class ApiService{

  constructor(private http: HttpClient){ }

  public getData() {
    return this.http.get('http://localhost:8000/user_list');
  }

  public pushData(body: {login: any, email: any, password: any}) {
    return this.http.post('http://localhost:8000/user_list', body);
  }
}
