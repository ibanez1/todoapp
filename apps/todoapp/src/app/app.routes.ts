import { Route } from '@angular/router';
import { TodosComponent } from './todos/todos.component';

export const appRoutes: Route[] = [
  { path: '', redirectTo: '/todos', pathMatch: 'full' },
  {
    path: 'todos',
    component: TodosComponent,
  },
];
