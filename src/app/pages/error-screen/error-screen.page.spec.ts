import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ErrorScreenPage } from './error-screen.page';

describe('ErrorScreenPage', () => {
  let component: ErrorScreenPage;
  let fixture: ComponentFixture<ErrorScreenPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ErrorScreenPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ErrorScreenPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
