import { TestBed } from '@angular/core/testing';

import { GameNightEventService } from './gamenightevent.service';

describe('EventService', () => {
  let service: GameNightEventService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GameNightEventService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
