import { ComponentFixture, TestBed } from "@angular/core/testing";
import { MainComponent } from "./main.component";
import { TodosService } from './../../services/todos.service';

const mockTodosService = {
  todosSig: jest.fn().mockReturnValue([]),
  toggleAll: jest.fn(),
  filterSig: jest.fn().mockReturnValue('all')
};

describe('MainComponent', () => {
  let component: MainComponent;
  let fixture: ComponentFixture<MainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MainComponent],
      providers: [{ provide: TodosService, useValue: mockTodosService }],
    }).compileComponents();

    fixture = TestBed.createComponent(MainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set editingId to null when passed null', () => {
    // Act: Llamar al método setEditingId con un valor null
    component.setEditingId(null);

    // Assert: Comprobar que editingId se estableció correctamente en null
    expect(component.editingId).toBeNull();
  });

  it('should set editingId to a string when passed a string', () => {
    // Act: Llamar al método setEditingId con una cadena
    component.setEditingId('123');

    // Assert: Comprobar que editingId se estableció correctamente en la cadena proporcionada
    expect(component.editingId).toBe('123');
  });
  it('should toggle all todos', () => {
    const event = { target: { checked: true } } as any;
    component.toggleAllTodos(event);
    expect(mockTodosService.toggleAll).toHaveBeenCalled();
  });
});
