import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StateCandidatePastSurveyComponent } from './state-candidate-past-survey.component';

describe('StateCandidatePastSurveyComponent', () => {
  let component: StateCandidatePastSurveyComponent;
  let fixture: ComponentFixture<StateCandidatePastSurveyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StateCandidatePastSurveyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StateCandidatePastSurveyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
