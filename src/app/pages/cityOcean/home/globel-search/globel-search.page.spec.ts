import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { GlobelSearchPage } from './globel-search.page';

describe('GlobelSearchPage', () => {
  let component: GlobelSearchPage;
  let fixture: ComponentFixture<GlobelSearchPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GlobelSearchPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(GlobelSearchPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
