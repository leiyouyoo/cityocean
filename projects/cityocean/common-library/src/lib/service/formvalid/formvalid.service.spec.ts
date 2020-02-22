import { TestBed } from '@angular/core/testing';

import { formvalidService } from './formvalid.service';

describe('ServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: formvalidService = TestBed.get(formvalidService);
    expect(service).toBeTruthy();
  });
});
