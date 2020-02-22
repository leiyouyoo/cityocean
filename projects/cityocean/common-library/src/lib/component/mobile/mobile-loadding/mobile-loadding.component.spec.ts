import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MobileLoaddingComponent } from './mobile-loadding.component';

describe('MobileLoaddingComponent', () => {
  let component: MobileLoaddingComponent;
  let fixture: ComponentFixture<MobileLoaddingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MobileLoaddingComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MobileLoaddingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
