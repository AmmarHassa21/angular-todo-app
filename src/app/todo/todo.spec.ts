import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { TodoComponent } from './todo';

describe('TodoComponent', () => {
  let component: TodoComponent;
  let fixture: ComponentFixture<TodoComponent>;

  beforeEach(async () => {
    localStorage.clear();

    await TestBed.configureTestingModule({
      imports: [TodoComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(TodoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('deletes the originally clicked task even when list order changes before timeout', fakeAsync(() => {
    component.tasks = [
      { name: 'A', completed: false },
      { name: 'B', completed: false },
      { name: 'C', completed: false }
    ];

    component.deleteTask(1);
    component.tasks.unshift({ name: 'Prepended', completed: false });

    tick(151);

    expect(component.tasks.map((task) => task.name)).toEqual(['Prepended', 'A', 'C']);
  }));

  it('adjusts edit index after deleting an earlier task', fakeAsync(() => {
    component.tasks = [
      { name: 'First', completed: false },
      { name: 'Second', completed: false },
      { name: 'Third', completed: false }
    ];
    component.startEdit(2, 'Third');

    component.deleteTask(0);
    tick(151);

    expect(component.editIndex).toBe(1);
    expect(component.editedTask).toBe('Third');
  }));
});
