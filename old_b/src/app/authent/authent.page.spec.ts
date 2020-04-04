import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AuthentPage } from './authent.page';

describe('AuthentPage', () => {
  let component: AuthentPage;
  let fixture: ComponentFixture<AuthentPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AuthentPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AuthentPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
