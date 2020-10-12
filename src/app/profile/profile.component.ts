import { Component, OnInit } from '@angular/core';
import {UserInterface} from '../Interfaces/UserInterface';
import {ApiService} from '../services/api.service';
import {Store , select} from '@ngrx/store';
import {selectActive} from '../store/selectors/user.selector';
import {filter} from 'rxjs/operators';
import {Subscription} from 'rxjs';
import {UsersUpdateRequestAction} from '../store/actions/user.actions';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor(private apiService: ApiService,
              private store: Store) {
  }
  public subscriptions: Array<Subscription> = [];

  private $user = this.store.pipe(select(selectActive), filter(Boolean));
  public user: UserInterface;

  // public users: Array<UserInterface> = [];

  public ngOnInit(): void {

    this.subscriptions.push(
      this.$user.subscribe((data: any) => {
        this.user = data.user;
      })
    );

    //     this.apiService.getData().subscribe( (data: Array<UserInterface>) => {
    //       this.users = data;
    //     });
    // }
  }
  updateUser(): any {
    console.log('submit!');
    this.store.dispatch(new UsersUpdateRequestAction({id: this.user.id, first_name: this.user.first_name,
      last_name: this.user.last_name, login: this.user.login, email: this.user.email }));
  }
}
