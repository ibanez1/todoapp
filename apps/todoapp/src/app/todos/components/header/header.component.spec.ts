import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeaderComponent } from './header.component';
import { TodosService } from '../../services/todos.service';
import { FilterEnum } from '../../types/filter.enum';

const mockTodosService = {
  todosSig: jest.fn().mockReturnValue([]),
  changeFilter: jest.fn(),
  filterSig: jest.fn().mockReturnValue('all')
}

describe('TodoComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeaderComponent],
      providers: [{ provide: TodosService, useValue: mockTodosService }],
    }).compileComponents();

    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call todosService.changeFilter and prevent event default', () => {
    const event: Partial<Event> = {
      preventDefault: jest.fn(),
    };

    component.changeFilter(event as Event, FilterEnum.completed);

    // Verify that the changeFilter method of the todosService is called with the correct argument
    expect(mockTodosService.changeFilter).toHaveBeenCalledWith(FilterEnum.completed);

    // Verify that preventDefault was called on the event
    expect(event.preventDefault).toHaveBeenCalled();
  });
});