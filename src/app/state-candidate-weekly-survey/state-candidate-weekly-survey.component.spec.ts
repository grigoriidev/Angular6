import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StateCandidateWeeklySurveyComponent } from './state-candidate-weekly-survey.component';

describe('StateCandidateWeeklySurveyComponent', () => {
  let component: StateCandidateWeeklySurveyComponent;
  let fixture: ComponentFixture<StateCandidateWeeklySurveyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StateCandidateWeeklySurveyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StateCandidateWeeklySurveyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
