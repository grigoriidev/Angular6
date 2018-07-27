import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FederalCandidateWeeklyMetricsComponent } from './federal-candidate-weekly-metrics.component';

describe('FederalCandidateWeeklyMetricsComponent', () => {
  let component: FederalCandidateWeeklyMetricsComponent;
  let fixture: ComponentFixture<FederalCandidateWeeklyMetricsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FederalCandidateWeeklyMetricsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FederalCandidateWeeklyMetricsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
