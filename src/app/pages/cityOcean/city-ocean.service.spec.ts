import { TestBed } from '@angular/core/testing';

import { CityOceanService } from './city-ocean.service';

describe('CityOceanService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CityOceanService = TestBed.get(CityOceanService);
    expect(service).toBeTruthy();
  });
});
