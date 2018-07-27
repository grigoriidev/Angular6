import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FederalCandidateReportComponent } from './federal-candidate-report.component';

describe('FederalCandidateReportComponent', () => {
  let component: FederalCandidateReportComponent;
  let fixture: ComponentFixture<FederalCandidateReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FederalCandidateReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FederalCandidateReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
