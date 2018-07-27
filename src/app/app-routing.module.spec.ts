/**
 * This contains material which is the confidential, unpublished property of WinDEM.  Receipt or possession of it does not convey any rights
 * to divulge, reproduce, use, or allow others to use it without the specific written authorization of WinDEM and use must conform strictly 
 * to the license agreement between user and WinDEM.
 * Copyright @ 2018 WinDEM LLC.  All rights reserved. 
 */

import { AppRoutingModule } from './app-routing.module';

describe('AppRoutingModule', () => {
  let appRoutingModule: AppRoutingModule;

  beforeEach(() => {
    appRoutingModule = new AppRoutingModule();
  });

  it('should create an instance', () => {
    expect(appRoutingModule).toBeTruthy();
  });
});
