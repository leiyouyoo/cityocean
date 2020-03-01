import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SailingSchedulesListPanelComponent } from './sailing-schedules-list-panel.component';

describe('SailingSchedulesListPanelComponent', () => {
  let component: SailingSchedulesListPanelComponent;
  let fixture: ComponentFixture<SailingSchedulesListPanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SailingSchedulesListPanelComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SailingSchedulesListPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
