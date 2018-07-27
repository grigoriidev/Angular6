import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BlueAngelsQuestionnairesComponent } from './blue-angels-questionnaires.component';

describe('BlueAngelsQuestionnairesComponent', () => {
  let component: BlueAngelsQuestionnairesComponent;
  let fixture: ComponentFixture<BlueAngelsQuestionnairesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BlueAngelsQuestionnairesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BlueAngelsQuestionnairesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
