/**
 * This contains material which is the confidential, unpublished property of WinDEM.  Receipt or possession of it does not convey any rights
 * to divulge, reproduce, use, or allow others to use it without the specific written authorization of WinDEM and use must conform strictly 
 * to the license agreement between user and WinDEM.
 * Copyright @ 2018 WinDEM LLC.  All rights reserved. 
 */

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { MatStepperModule } from '@angular/material';
import { HttpClientModule } from '@angular/common/http';
import {LocalStorageModule} from 'angular-2-local-storage';
import {Ng2PaginationModule} from 'ng2-pagination';
import { MyDatePickerModule } from 'mydatepicker';
import { FullCalendarModule } from 'ng-fullcalendar';
import { OrderModule } from 'ngx-order-pipe';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { SigninComponent } from './signin/signin.component';
import { SignupComponent } from './signup/signup.component';
import { StateSignupComponent } from './signup/state-signup.component';
import { UserSignupComponent } from './user-signup/user-signup.component';
import { AppRoutingModule } from './/app-routing.module';
import { WeeklyMetricsComponent } from './weekly-metrics/weekly-metrics.component';
import { ReviewCandidateComponent } from './review-candidate/review-candidate.component';
import { InvestorPledgeComponent } from './investor-pledge/investor-pledge.component';
import { InvestorSignupComponent } from './investor-signup/investor-signup.component';
import { InvestorContactComponent } from './investor-contact/investor-contact.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { InvestorContributionComponent } from './investor-contribution/investor-contribution.component';
import { InvestorScoreboardComponent } from './investor-scoreboard/investor-scoreboard.component';
import { InvestorReportComponent } from './investor-report/investor-report.component';
import { PermissionAllotmentComponent } from './permission-allotment/permission-allotment.component';
import { AccessDeniedComponent } from './access-denied/access_denied.component';
import { BlueAnglesContactComponent } from './blue-angles-contact/blue-angles-contact.component';
import { WindemHomeComponent } from './windem-home/windem-home.component';
import { WindemInviteComponent } from './windem-home/windem-invite.component';
import { WindemInvitationsComponent } from './windem-home/windem-invitations.component';
import { CreateInvitationComponent } from './create-invitation/create-invitation.component';
import { StateCandidateContactComponent } from './state-candidate-contact/state-candidate-contact.component';
import { StateCandidateWeeklySurveyComponent } from './state-candidate-weekly-survey/state-candidate-weekly-survey.component';
import { StateCandidateCreateSurveyComponent } from './state-candidate-weekly-survey/state-candidate-create-survey.component';
import { StateCandidateEventsComponent } from './state-candidate-events/state-candidate-events.component';
import { StateCandidatePastSurveyComponent } from './state-candidate-past-survey/state-candidate-past-survey.component';
import { FederalCandidateContactComponent } from './federal-candidate-contact/federal-candidate-contact.component';
import { FederalCandidateWeeklyMetricsComponent } from './federal-candidate-weekly-metrics/federal-candidate-weekly-metrics.component';
import { FederalCandidateCreateEventsComponent } from './federal-candidate-weekly-metrics/federal-candidate-create-events.component';
import { FederalCandidateCreateMetricsComponent } from './federal-candidate-weekly-metrics/federal-candidate-create-metrics.component';
import { FederalCandidatePastMetricsComponent } from './federal-candidate-past-metrics/federal-candidate-past-metrics.component';
import { FederalCandidateScorecardComponent } from './federal-candidate-scorecard/federal-candidate-scorecard.component';
import { FederalCandidateReportComponent } from './federal-candidate-report/federal-candidate-report.component';
import { BlueAngelsContributionComponent } from './blue-angels-contribution/blue-angels-contribution.component';
import { BlueAngelsScoreboardComponent } from './blue-angels-scoreboard/blue-angels-scoreboard.component';
import { BlueAngelsReportComponent } from './blue-angels-report/blue-angels-report.component';
import { BlueAngelsQuestionnairesComponent } from './blue-angels-questionnaires/blue-angels-questionnaires.component';
import { SettingsComponent } from './settings/settings.component';
import { RolesComponent } from './roles/roles.component';
import { ManagersSignupComponent } from './managers-signup/managers-signup.component';
import { FederalCandidateHeaderComponent } from './federal-candidate-header/federal-candidate-header.component';
import { StateCandidateHeaderComponent } from './state-candidate-header/state-candidate-header.component';
import { InvestorHeaderComponent } from './investor-header/investor-header.component';
import { BlueAngelsHeaderComponent } from './blue-angels-header/blue-angels-header.component';
import { PriorPledgesComponent } from './prior-pledges/prior-pledges.component';
import { CreatePriorPledgeComponent } from './prior-pledges/create-prior-pledge.component';
import { ViewWeeklyMetricsComponent } from './federal-candidate-weekly-metrics/view-weekly-metrics.component';
import { FooterComponent } from './footer/footer.component';
import {ChangePassowrdCoponent} from './signup/change-password.component';
import {PolicyComponent} from './policy/policy.component';
import {TermsComponent} from './policy/terms.component';


import {TextMaskModule} from 'angular2-text-mask';
import { CookieService } from 'ngx-cookie-service';
import { CurrencyMaskModule } from "ng2-currency-mask";



import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { CustomHttpInterceptor } from './interceptors/http.interceptor';
import { AuthService } from './services/auth.service';
import { VolunteerContactComponent } from './volunteer-contact/volunteer-contact.component';
import { VolunteerHeaderComponent } from './volunteer-header/volunteer-header.component';
import {ResetPasswordComponent} from './reset-password/reset-password.component';
import {SharedService} from './services/shared.service';
import {EnterContributionComponent} from './enter-contributions/enter-contributions.component';
import {PledgeBiWeeklyContributionComponent} from './pledge-biweekly-contributions/pledge-biweekly-contributions.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SigninComponent,
    SignupComponent,
    StateSignupComponent,
    UserSignupComponent,
    WeeklyMetricsComponent,
    ReviewCandidateComponent,
    InvestorPledgeComponent,
    InvestorSignupComponent,
    InvestorContactComponent,
    DashboardComponent,
    InvestorContributionComponent,
    InvestorScoreboardComponent,
    InvestorReportComponent,
    PermissionAllotmentComponent,
    AccessDeniedComponent,
    BlueAnglesContactComponent,
    WindemHomeComponent,
    WindemInvitationsComponent,
    WindemInviteComponent,
    CreateInvitationComponent,
    StateCandidateContactComponent,
    StateCandidateWeeklySurveyComponent,
    StateCandidateCreateSurveyComponent,
    StateCandidateEventsComponent,
    StateCandidatePastSurveyComponent,
    FederalCandidateContactComponent,
    FederalCandidateWeeklyMetricsComponent,
    FederalCandidateCreateEventsComponent,
    FederalCandidateCreateMetricsComponent,
    FederalCandidatePastMetricsComponent,
    FederalCandidateScorecardComponent,
    FederalCandidateReportComponent,
    ViewWeeklyMetricsComponent,
    BlueAngelsContributionComponent,
    BlueAngelsScoreboardComponent,
    BlueAngelsReportComponent,
    BlueAngelsQuestionnairesComponent,
    SettingsComponent,
    RolesComponent,
    ManagersSignupComponent,
    FederalCandidateHeaderComponent,
    StateCandidateHeaderComponent,
    InvestorHeaderComponent,
    BlueAngelsHeaderComponent,
    PriorPledgesComponent,
    CreatePriorPledgeComponent,
    FooterComponent,
    ResetPasswordComponent,
    EnterContributionComponent,
    PledgeBiWeeklyContributionComponent,
    ChangePassowrdCoponent,
      PolicyComponent,
      TermsComponent,
      VolunteerContactComponent,
      VolunteerHeaderComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    NgbModule.forRoot(),
    Ng2PaginationModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MatStepperModule,
    AppRoutingModule,
    LocalStorageModule.withConfig({
      prefix: 'rtdems',
      storageType: 'localStorage'
    }),
    MyDatePickerModule,
      FullCalendarModule,
      OrderModule,
      TextMaskModule,
      CurrencyMaskModule
  ],
  providers: [
      AuthService,
      CookieService,
      SharedService,
      {
        provide: HTTP_INTERCEPTORS,
        useClass: CustomHttpInterceptor,
        multi: true
      }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
