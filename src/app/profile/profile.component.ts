import { Component, OnInit } from '@angular/core';
import {UserInterface} from '../Interfaces/UserInterface';
import {ApiService} from '../services/api.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor(private apiService: ApiService) { }

  public users: Array<UserInterface> = [];

  public ngOnInit(): void {

      this.apiService.getData().subscribe( (data: Array<UserInterface>) => {
        this.users = data;
      });
  }
}
