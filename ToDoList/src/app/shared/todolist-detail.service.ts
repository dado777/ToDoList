import { Injectable } from '@angular/core';
import { TodolistDetail } from './todolist-detail.model';
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class TodolistDetailService {
  formData: TodolistDetail;
  readonly apiURL = 'http://localhost:1957/api/';
  list: TodolistDetail[];

  constructor(private http: HttpClient) { }

  postToDoList() {
    return this.http.post(this.apiURL + 'ToDoLists', this.formData);
  }

  putToDoList() {
    return this.http.put(this.apiURL + 'ToDoLists/' + this.formData.Id, this.formData);
  }

  deleteToDoList(id: Number) {
    return this.http.delete(this.apiURL + 'ToDoLists/' + id);
  }

  updateList() {
    this.http.get(this.apiURL + 'ToDoLists').toPromise().then(result => this.list = result as TodolistDetail[])
  }
}
