import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CityOceanPage } from './CityOcean.page';

describe('TabsPage', () => {
  let component: CityOceanPage;
  let fixture: ComponentFixture<CityOceanPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CityOceanPage],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CityOceanPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
