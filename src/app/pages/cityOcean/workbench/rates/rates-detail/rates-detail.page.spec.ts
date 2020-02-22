import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { RatesDetailPage } from './rates-detail.page';

describe('RatesDetailPage', () => {
  let component: RatesDetailPage;
  let fixture: ComponentFixture<RatesDetailPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RatesDetailPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(RatesDetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
