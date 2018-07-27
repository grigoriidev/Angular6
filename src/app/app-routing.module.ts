/**
 * This contains material which is the confidential, unpublished property of WinDEM.  Receipt or possession of it does not convey any rights
 * to divulge, reproduce, use, or allow others to use it without the specific written authorization of WinDEM and use must conform strictly 
 * to the license agreement between user and WinDEM.
 * Copyright @ 2018 WinDEM LLC.  All rights reserved. 
 */

import { NgModule } from '@angular/core';
import { SigninComponent } from './signin/signin.component';
import { RouterModule, Routes } from '@angular/router';
import { SignupComponent } from './signup/signup.component';
import { StateSignupComponent } from './signup/state-signup.component';
import { UserSignupComponent } from './user-signup/user-signup.component';
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
import { BlueAnglesContactComponent } from './blue-angles-contact/blue-angles-contact.component';
import { WindemHomeComponent } from './windem-home/windem-home.component';
import { WindemInviteComponent } from './windem-home/windem-invite.component';
import { WindemInvitationsComponent } from './windem-home/windem-invitations.component';
import { CreateInvitationComponent } from './create-invitation/create-invitation.component';
import { BlueAngelsContributionComponent } from './blue-angels-contribution/blue-angels-contribution.component';
import { BlueAngelsScoreboardComponent } from './blue-angels-scoreboard/blue-angels-scoreboard.component';
import { BlueAngelsReportComponent } from './blue-angels-report/blue-angels-report.component';
import { BlueAngelsQuestionnairesComponent } from './blue-angels-questionnaires/blue-angels-questionnaires.component';
import { AccessDeniedComponent } from './access-denied/access_denied.component';
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
import { ViewWeeklyMetricsComponent } from './federal-candidate-weekly-metrics/view-weekly-metrics.component';
import { SettingsComponent } from './settings/settings.component';
import { RolesComponent } from './roles/roles.component';
import { ManagersSignupComponent } from './managers-signup/managers-signup.component';
import { PriorPledgesComponent } from './prior-pledges/prior-pledges.component';
import { CreatePriorPledgeComponent } from './prior-pledges/create-prior-pledge.component';
import {ChangePassowrdCoponent} from './signup/change-password.component';
import {PolicyComponent} from './policy/policy.component';
import {TermsComponent} from './policy/terms.component';
import { VolunteerContactComponent } from './volunteer-contact/volunteer-contact.component';
import {ResetPasswordComponent} from './reset-password/reset-password.component';

import {EnterContributionComponent} from './enter-contributions/enter-contributions.component';
import {PledgeBiWeeklyContributionComponent} from './pledge-biweekly-contributions/pledge-biweekly-contributions.component';

const routes: Routes = [
  { path: '', redirectTo: '/signin', pathMatch: 'full'},
  { path: 'signin', component: SigninComponent },
  { path: 'signup/:token', component: SignupComponent },
  { path: 'state-signup/:token', component: StateSignupComponent },
  { path: 'user-signup/:token/:invitor_role_id', component: UserSignupComponent },
  { path: 'home', component: DashboardComponent },
  { path: 'review-candidate/:id', component: ReviewCandidateComponent },
  { path: 'weekly-metrics', component: WeeklyMetricsComponent },
  { path: 'pledge', component: InvestorPledgeComponent },
  { path: 'prior-contributions', component: PriorPledgesComponent },
  { path: 'create-prior-contribution', component: CreatePriorPledgeComponent },
  { path: 'edit-prior-contribution/:id', component: CreatePriorPledgeComponent },
  { path: 'investor-signup/:token', component: InvestorSignupComponent },
  { path: 'manager-staff-signup/:token', component: ManagersSignupComponent },
  { path: 'investor-contact', component: InvestorContactComponent },
  { path: 'investor-contribution', component: InvestorContributionComponent },
  { path: 'investor-scoreboard', component: InvestorScoreboardComponent },
  { path: 'investor-reports', component: InvestorReportComponent },
  // { path: 'windem-home/:role', component: WindemHomeComponent },
  { path: 'manage-invitations/:role', component: WindemInvitationsComponent },
  { path: 'invite-users/:role', component: WindemInviteComponent },
  { path: 'blue-angels-contact', component: BlueAnglesContactComponent },
  { path: 'blue-angels-contribution', component: BlueAngelsContributionComponent },
  { path: 'blue-angels-scoreboard', component: BlueAngelsScoreboardComponent },
  { path: 'blue-angels-report', component: BlueAngelsReportComponent },
  { path: 'blue-angels-review', component: BlueAngelsQuestionnairesComponent, data : {title : 'RunTogether Blue Angel Home'}  },
  { path: 'volunteer-review', component: BlueAngelsQuestionnairesComponent, data : {title : 'RunTogether Volunteer Home'} },
  { path: 'permission-allotment', component: PermissionAllotmentComponent },
  { path: 'getPermissionsByRoles/:role_id', component: PermissionAllotmentComponent },
  { path: 'validate-invitation/:token/:invitor_role_id', component: CreateInvitationComponent },
  { path: 'access-denied', component: AccessDeniedComponent },
  { path: 'state-candidate-home', component: StateCandidateContactComponent },
  { path: 'state-candidate-weekly-survey', component: StateCandidateWeeklySurveyComponent },
  { path: 'state-candidate-create-survey', component: StateCandidateCreateSurveyComponent },
  { path: 'state-candidate-past-survey', component: StateCandidatePastSurveyComponent },
  { path: 'state-candidate-events', component: StateCandidateEventsComponent },
  { path: 'federal-candidate-home', component: FederalCandidateContactComponent },
  { path: 'federal-candidate-weekly-metrics', component: FederalCandidateWeeklyMetricsComponent },
  { path: 'federal-candidate-create-event/:id', component: FederalCandidateCreateEventsComponent },
  { path: 'federal-candidate-create-metrics/:id', component: FederalCandidateCreateMetricsComponent },
  { path: 'federal-candidate-past-metrics', component: FederalCandidatePastMetricsComponent },
  { path: 'federal-candidate-scorecard', component: FederalCandidateScorecardComponent },
  { path: 'federal-candidate-report', component: FederalCandidateReportComponent },
  { path: 'view-weekly-metrics/:id', component: ViewWeeklyMetricsComponent },
  { path: 'settings', component: SettingsComponent },
  { path: 'roles', component: RolesComponent },
  { path: 'change-password', component: ChangePassowrdCoponent },
  { path: 'privacy-policy', component: PolicyComponent },
  { path: 'terms-conditions', component: TermsComponent },
  { path: 'volunteer-home', component: VolunteerContactComponent },
  { path: 'reset-password/:tokenId', component: ResetPasswordComponent },
  { path: 'enter-contributions', component: EnterContributionComponent },
  { path: 'pledge-biweekly-contributions', component: PledgeBiWeeklyContributionComponent },

];

@NgModule({
  exports: [ RouterModule ],
  imports: [ RouterModule.forRoot(routes, {useHash: true}) ]
})
export class AppRoutingModule {}