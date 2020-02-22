import { TestBed } from '@angular/core/testing';

import { MyTabsService } from './myservice.service';

describe('TabsServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MyTabsService = TestBed.get(MyTabsService);
    expect(service).toBeTruthy();
  });
});
