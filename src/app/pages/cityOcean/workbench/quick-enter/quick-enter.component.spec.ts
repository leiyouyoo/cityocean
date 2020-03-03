import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { QuickEnterComponent } from './quick-enter.component';

describe('QuickEnterComponent', () => {
  let component: QuickEnterComponent;
  let fixture: ComponentFixture<QuickEnterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuickEnterComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(QuickEnterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
