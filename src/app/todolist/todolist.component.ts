import { Component, OnInit } from '@angular/core';

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
