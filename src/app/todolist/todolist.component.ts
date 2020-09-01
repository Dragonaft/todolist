import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-todolist',
  templateUrl: './todolist.component.html',
  styleUrls: ['./todolist.component.css']
})
export class TodolistComponent{
  public items = [];
  public newTask;
  public addToList() {
    if (this.newTask === '') {
    }
    else {
      this.items.push(this.newTask);
      this.newTask = '';
    }
  }
  public deleteTask(index) {
    this.items.splice(index, 1);
  }
}
