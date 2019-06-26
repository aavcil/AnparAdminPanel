/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { TechnicalInfoService } from './TechnicalInfo.service';

describe('Service: TechnicalInfo', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TechnicalInfoService]
    });
  });

  it('should ...', inject([TechnicalInfoService], (service: TechnicalInfoService) => {
    expect(service).toBeTruthy();
  }));
});
