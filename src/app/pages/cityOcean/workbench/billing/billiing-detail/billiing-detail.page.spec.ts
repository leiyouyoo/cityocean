import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { BilliingDetailPage } from './billiing-detail.page';

describe('BilliingDetailPage', () => {
  let component: BilliingDetailPage;
  let fixture: ComponentFixture<BilliingDetailPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BilliingDetailPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(BilliingDetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
