import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SailingSchedulesPage } from './sailing-schedules.page';

describe('SailingSchedulesPage', () => {
  let component: SailingSchedulesPage;
  let fixture: ComponentFixture<SailingSchedulesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SailingSchedulesPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SailingSchedulesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
