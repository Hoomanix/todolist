import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ShareTodoPage } from './share-todo.page';

describe('ShareTodoPage', () => {
  let component: ShareTodoPage;
  let fixture: ComponentFixture<ShareTodoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShareTodoPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ShareTodoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
