import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {UserInterface} from '../Interfaces/UserInterface';

@Component({
  selector: 'app-todolist',
  templateUrl: './todolist.component.html',
  styleUrls: ['./todolist.component.css']
})
export class TodolistComponent{
  public items = [];
  // public itemtext = [];
  public title: string;
  // public text;
  constructor() {
  }
  // constructor(public todoService: StorageService) {
  //   this.title = '';
  // }

  // tslint:disable-next-line:typedef
  // public addToList() {
  //     this.items.push(this.title);
  //     this.title = '';
  // }
  // tslint:disable-next-line:typedef
  // public deleteTask(index) {
  //   this.items.splice(index, 1);
  // }

  // public addToList(): void {
  //   this.todoService.addToList(this.title);
  //   this.title = '';
  // }

}

