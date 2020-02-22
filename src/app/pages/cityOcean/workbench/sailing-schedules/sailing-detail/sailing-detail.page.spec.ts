import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SailingDetailPage } from './sailing-detail.page';

describe('SailingDetailPage', () => {
  let component: SailingDetailPage;
  let fixture: ComponentFixture<SailingDetailPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SailingDetailPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SailingDetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
