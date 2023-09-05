import { HttpClient } from '@angular/common/http';
import { FilterEnum } from '../types/filter.enum';
import { TodoInterface } from '../types/todo.interface';
import { TodosService } from './todos.service';

describe('TodosService', () => {
  let service: TodosService;

  beforeEach(() => {
    service = new TodosService({} as HttpClient);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should add a todo', () => {
    const initialTodos = service.todosSig().length;
    service.addTodo('New Todo');
    expect(service.todosSig().length).toBe(initialTodos + 1);
  });

  it('should change a todo', () => {
    const todo: TodoInterface = {
      id: '1',
      text: 'Old Text',
      isCompleted: false,
    };
    service.todosSig.set([todo]);
    service.changeTodo('1', 'New Text');
    expect(service.todosSig()[0].text).toBe('New Text');
  });

  it('should remove a todo', () => {
    const todo: TodoInterface = {
      id: '1',
      text: 'Todo to remove',
      isCompleted: false,
    };
    service.todosSig.set([todo]);
    service.removeTodo('1');
    expect(service.todosSig().length).toBe(0);
  });

  it('should toggle a todo', () => {
    const todo: TodoInterface = {
      id: '1',
      text: 'Toggle Todo',
      isCompleted: false,
    };
    service.todosSig.set([todo]);
    service.toggleTodo('1');
    expect(service.todosSig()[0].isCompleted).toBe(true);
  });

  it('should toggle all todos', () => {
    const todos: TodoInterface[] = [
      { id: '1', text: 'Todo 1', isCompleted: false },
      { id: '2', text: 'Todo 2', isCompleted: false },
    ];
    service.todosSig.set(todos);
    service.toggleAll(true);
    expect(service.todosSig().every((todo) => todo.isCompleted)).toBe(true);
  });

  it('should change filter', () => {
    service.filterSig.set(FilterEnum.all);
    service.changeFilter(FilterEnum.completed);
    expect(service.filterSig()).toBe(FilterEnum.completed);
  });
});
