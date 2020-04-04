import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AdditemPage } from './additem.page';

describe('AdditemPage', () => {
  let component: AdditemPage;
  let fixture: ComponentFixture<AdditemPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdditemPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AdditemPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
