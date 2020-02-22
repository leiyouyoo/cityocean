import { TestBed } from '@angular/core/testing';

import { MsgServiceService } from './msg-service.service';

describe('MsgServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MsgServiceService = TestBed.get(MsgServiceService);
    expect(service).toBeTruthy();
  });
});
