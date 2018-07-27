import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BlueAngelsScoreboardComponent } from './blue-angels-scoreboard.component';

describe('BlueAngelsScoreboardComponent', () => {
  let component: BlueAngelsScoreboardComponent;
  let fixture: ComponentFixture<BlueAngelsScoreboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BlueAngelsScoreboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BlueAngelsScoreboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
