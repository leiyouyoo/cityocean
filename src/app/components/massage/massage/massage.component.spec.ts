import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MassageComponent } from './massage.component';

describe('MassageComponent', () => {
  let component: MassageComponent;
  let fixture: ComponentFixture<MassageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MassageComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MassageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
