import { TestBed } from '@angular/core/testing';

import { BoardgameapiService } from './boardgameapi.service';

describe('BoardgameapiService', () => {
  let service: BoardgameapiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BoardgameapiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
