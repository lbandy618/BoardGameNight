import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GameNightEventComponent } from './game-night-event.component';

describe('GameNightEventComponent', () => {
  let component: GameNightEventComponent;
  let fixture: ComponentFixture<GameNightEventComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GameNightEventComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GameNightEventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
