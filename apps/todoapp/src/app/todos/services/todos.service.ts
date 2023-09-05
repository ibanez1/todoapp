import { Injectable, signal } from '@angular/core';
import { TodoInterface, TodoResponse } from '../types/todo.interface';
import { FilterEnum } from '../types/filter.enum';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class TodosService {
  constructor(private httpClient: HttpClient){}
  todosSig = signal<TodoInterface[]>([]);
  filterSig = signal<FilterEnum>(FilterEnum.all);
  apiURL = 'http://demo3139023.mockable.io/'

  changeFilter(filterName: FilterEnum): void {
    this.filterSig.set(filterName);
  }

  getTodosRequest(): Observable<TodoResponse> {
		return this.httpClient.get<TodoResponse>(this.apiURL + '/todos')
    .pipe(retry(1), catchError(this.handleError));
	}

getTodos() {
  this.getTodosRequest().subscribe((response) => {
    this.todosSig.update(() => response.todos);
  });
}

  addTodo(text: string): void {
    const newTodo: TodoInterface = {
      text,
      isCompleted: false,
      id: Math.random().toString(16),
    };
    this.todosSig.update((todos) => [...todos, newTodo]);
  }

  changeTodo(id: string, text: string): void {
    this.todosSig.update((todos) =>
      todos.map((todo) => (todo.id === id ? { ...todo, text } : todo))
    );
  }

  removeTodo(id: string): void {
    this.todosSig.update((todos) => todos.filter((todo) => todo.id !== id));
  }

  toggleTodo(id: string): void {
    this.todosSig.update((todos) =>
      todos.map((todo) =>
        todo.id === id ? { ...todo, isCompleted: !todo.isCompleted } : todo
      )
    );
  }

  toggleAll(isCompleted: boolean): void {
    this.todosSig.update((todos) =>
      todos.map((todo) => ({ ...todo, isCompleted }))
    );
  }
  // Error handling
  handleError(error: any) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    window.alert(errorMessage);
    return throwError(() => {
      return errorMessage;
    });
  }
}


