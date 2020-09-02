import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-todolist',
  templateUrl: './todolist.component.html',
  styleUrls: ['./todolist.component.css']
})
export class TodolistComponent{
  public items = [];
  // public itemtext = [];
  public title;
  public text;
  // tslint:disable-next-line:typedef
  public addToList() {
      this.items.push(this.title);
      // this.items.push(this.text);
      this.title = '';
      // this.text = '';
  }
  // tslint:disable-next-line:typedef
  public deleteTask(index) {
    this.items.splice(index, 1);
  }
}
