import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Todo } from './todo';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  constructor(private http: HttpClient) {}

  getTodo(): Observable<Todo[]> {
    return this.http.get<Todo[]>(environment.api + 'todo');
  }
  addTodo(todo: any): Observable<Todo> {
    return this.http.post<Todo>(environment.api + 'todo', todo);
  }
  updateTodo(id: number, todo: any): Observable<Todo> {
    return this.http.patch<Todo>(environment.api + 'todo/' + id, todo);
  }
  deleteTodo(id: number) {
    return this.http.delete(environment.api + 'todo/' + id);
  }
  getTodoById(id: number) {
    return this.http.get<Todo[]>(environment.api + 'todo/' + id);
  }
}
