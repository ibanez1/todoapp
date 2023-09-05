import { Component, inject } from '@angular/core';
import { FilterComponent } from './components/filter/filter.component';
import { HeaderComponent } from './components/header/header.component';
import { MainComponent } from './components/main/main.component';
import { TodosService } from './services/todos.service';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.scss'],
  standalone: true,
  imports: [FilterComponent, HeaderComponent, MainComponent],
})
export class TodosComponent {
  todosService = inject(TodosService);
  
  // ngOnInit(): void {
  //   this.todosService.getTodos();
  // }
}

