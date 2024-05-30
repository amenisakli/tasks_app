import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Todo } from '../todo/todo';
import { TodoService } from '../todo/todo.service';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule, FormsModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  todos: Todo[] | any;
  isPopupOpen = false;
  isPopupOpenUpdate = false;
  isPopupOpenDelete = false;
  todoUpdate: Todo[] | any;
  TodoForm = new FormGroup({
    title: new FormControl(''),
    description: new FormControl(''),
    etat: new FormControl('todo'),
  });

  id!: number;
  token: any;
  constructor(
    private todoService: TodoService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.todoService.getTodo().subscribe((data) => {
      this.todos = data.sort((a: any, b: any) => a.id - b.id);
    });
  }
  deconncter() {
    this.authService.deleteCookie('authToken');
    this.router.navigate(['']);
  }
  addItem() {
    this.todoService.addTodo(this.TodoForm.value).subscribe((data) => {
      this.todos.push(data);
      this.isPopupOpen = false;
      this.TodoForm.reset();
    });
  }
  openUpdate(idPop: any) {
    this.isPopupOpenUpdate = true;
    this.id = idPop;
    this.todoService.getTodoById(this.id).subscribe((data) => {
      this.todoUpdate = data;
    });
  }
  updateTask() {
    this.todoService
      .updateTodo(this.id, this.TodoForm.value)
      .subscribe((data) => {
        const index = this.todos.findIndex((todo: any) => todo.id === this.id);
        if (index !== -1) {
          this.todos[index] = data;
        }
        this.isPopupOpenUpdate = false;
        this.TodoForm.reset();
      });
  }
  openDelete(idPop: any) {
    this.isPopupOpenDelete = true;
    this.id = idPop;
  }
  deleteTask() {
    this.todoService.deleteTodo(this.id).subscribe(() => {
      const index = this.todos.findIndex((todo: any) => todo.id === this.id);
      if (index !== -1) {
        this.todos.splice(index, 1);
      }
      this.isPopupOpenDelete = false;
    });
  }
}
