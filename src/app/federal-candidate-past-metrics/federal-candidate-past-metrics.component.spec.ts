import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FederalCandidatePastMetricsComponent } from './federal-candidate-past-metrics.component';

describe('FederalCandidatePastMetricsComponent', () => {
  let component: FederalCandidatePastMetricsComponent;
  let fixture: ComponentFixture<FederalCandidatePastMetricsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FederalCandidatePastMetricsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FederalCandidatePastMetricsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
