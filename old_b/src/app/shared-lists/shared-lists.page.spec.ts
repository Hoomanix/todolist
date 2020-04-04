import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SharedListsPage } from './shared-lists.page';

describe('SharedListsPage', () => {
  let component: SharedListsPage;
  let fixture: ComponentFixture<SharedListsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SharedListsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SharedListsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
