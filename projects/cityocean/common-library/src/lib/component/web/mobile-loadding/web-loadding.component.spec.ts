import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WebLoaddingComponent } from './web-loadding.component';

describe('WebLoaddingComponent', () => {
  let component: WebLoaddingComponent;
  let fixture: ComponentFixture<WebLoaddingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [WebLoaddingComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WebLoaddingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
