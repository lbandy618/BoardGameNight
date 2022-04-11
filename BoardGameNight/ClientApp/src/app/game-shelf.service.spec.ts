import { TestBed } from '@angular/core/testing';

import { GameShelfService } from './game-shelf.service';

describe('GameShelfService', () => {
  let service: GameShelfService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GameShelfService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
