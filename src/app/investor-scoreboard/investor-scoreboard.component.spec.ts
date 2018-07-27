import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InvestorScoreboardComponent } from './investor-scoreboard.component';

describe('InvestorScoreboardComponent', () => {
  let component: InvestorScoreboardComponent;
  let fixture: ComponentFixture<InvestorScoreboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InvestorScoreboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InvestorScoreboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
