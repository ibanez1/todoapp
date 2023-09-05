import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TodoComponent } from './todo.component';
import { TodosService } from './../../services/todos.service';

const mockTodosService = {
  changeTodo: jest.fn(),
  removeTodo: jest.fn(),
  toggleTodo: jest.fn()
}

describe('TodoComponent', () => {
  let component: TodoComponent;
  let fixture: ComponentFixture<TodoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TodoComponent],
      providers: [{ provide: TodosService, useValue: mockTodosService }],
    }).compileComponents();

    fixture = TestBed.createComponent(TodoComponent);
    component = fixture.componentInstance;
    (component as any).todo = { id: '1', text: 'Sample Todo', isCompleted: false };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize editingText in ngOnInit', () => {
    component.ngOnInit();
    expect(component.editingText).toBe('Sample Todo');
  });

  it('should emit setEditingId event in setTodoInEditMode', () => {
    component.todo = { id: '1', text: 'Sample Todo', isCompleted: false };
    const emitSpy = jest.spyOn(component.setEditingId, 'emit');
    component.setTodoInEditMode();
    expect(emitSpy).toHaveBeenCalledWith('1');
  });

  it('should call todosService.changeTodo and emit setEditingId event in changeTodo', () => {
    component.todo = { id: '1', text: 'Sample Todo', isCompleted: false };
    component.editingText = 'Updated Text';
    const emitSpy = jest.spyOn(component.setEditingId, 'emit');
    component.changeTodo();
    expect(mockTodosService.changeTodo).toHaveBeenCalledWith('1', 'Updated Text');
    expect(emitSpy).toHaveBeenCalledWith(null);
  });

  it('should call todosService.removeTodo in removeTodo', () => {
    component.todo = { id: '1', text: 'Sample Todo', isCompleted: false };
    component.removeTodo();
    expect(mockTodosService.removeTodo).toHaveBeenCalledWith('1');
  });

  it('should call todosService.toggleTodo in toggleTodo', () => {
    component.todo = { id: '1', text: 'Sample Todo', isCompleted: false };
    component.toggleTodo();
    expect(mockTodosService.toggleTodo).toHaveBeenCalledWith('1');
  });
});