import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BlueAngelsReportComponent } from './blue-angels-report.component';

describe('BlueAngelsReportComponent', () => {
  let component: BlueAngelsReportComponent;
  let fixture: ComponentFixture<BlueAngelsReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BlueAngelsReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BlueAngelsReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
