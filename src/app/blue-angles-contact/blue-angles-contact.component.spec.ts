/**
 * This contains material which is the confidential, unpublished property of WinDEM.  Receipt or possession of it does not convey any rights
 * to divulge, reproduce, use, or allow others to use it without the specific written authorization of WinDEM and use must conform strictly 
 * to the license agreement between user and WinDEM.
 * Copyright @ 2018 WinDEM LLC.  All rights reserved. 
 */

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BlueAnglesContactComponent } from './blue-angles-contact.component';

describe('InvestorContactComponent', () => {
  let component: BlueAnglesContactComponent;
  let fixture: ComponentFixture<BlueAnglesContactComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BlueAnglesContactComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BlueAnglesContactComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
