import { TestBed } from '@angular/core/testing';

import { SportClassesService } from './sport-classes.service';

describe('SportClassesServiceService', () => {
  let service: SportClassesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SportClassesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
