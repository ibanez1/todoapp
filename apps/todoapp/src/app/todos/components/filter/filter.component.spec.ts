import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FilterComponent } from './filter.component';
import { TodosService } from '../../services/todos.service';

const mockTodosService = {
  todosSig: jest.fn().mockReturnValue([]),
  addTodo: jest.fn(),
  filterSig: jest.fn().mockReturnValue('all')
}

describe('TodoComponent', () => {
  let component: FilterComponent;
  let fixture: ComponentFixture<FilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FilterComponent],
      providers: [{ provide: TodosService, useValue: mockTodosService }],
    }).compileComponents();

    fixture = TestBed.createComponent(FilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should update text property when changeText is called', () => {
    const inputElement: HTMLInputElement = document.createElement('input');
    inputElement.value = 'Updated Text';

    const event = new Event('input', {
      bubbles: true,
      cancelable: true,
    });

    // Assign the input element to event.target
    Object.defineProperty(event, 'target', { value: inputElement });

    component.changeText(event);

    // Verify that the component's text property is updated correctly
    expect(component.text).toBe('Updated Text');
  });

  it('should call todosService.addTodo and reset text property', () => {
    component.text = 'New Todo';

    component.addTodo();

    // Verify that the addTodo method of the todosService is called with the correct argument
    expect(mockTodosService.addTodo).toHaveBeenCalledWith('New Todo');

    // Verify that the text property is reset to an empty string
    expect(component.text).toBe('');
  });
});