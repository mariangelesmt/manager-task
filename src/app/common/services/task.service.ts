import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TaskModel } from '../models/task.model';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private apiUrl = 'http://localhost:3000/tasks';
  constructor(private httpClient: HttpClient) {}

  getAll(): Observable<TaskModel[]> {
    return this.httpClient.get<TaskModel[]>(this.apiUrl);
  }

  delete(id: number) {
    return this.httpClient.delete<Response>(`${this.apiUrl}/${id}`);
  }

  addTask(newTask: TaskModel) {
    return this.httpClient.post<Response>(this.apiUrl, newTask);
  }
  
  updateTask(obj: any) {
    return this.httpClient.patch<Response>(`${this.apiUrl}/${obj.id}`, obj);
  }
}
