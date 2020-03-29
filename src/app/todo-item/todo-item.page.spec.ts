import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TodoItemPage } from './todo-item.page';

describe('TodoItemPage', () => {
  let component: TodoItemPage;
  let fixture: ComponentFixture<TodoItemPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TodoItemPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TodoItemPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
