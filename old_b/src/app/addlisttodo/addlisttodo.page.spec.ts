import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AddlisttodoPage } from './addlisttodo.page';

describe('AddlisttodoPage', () => {
  let component: AddlisttodoPage;
  let fixture: ComponentFixture<AddlisttodoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddlisttodoPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AddlisttodoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
