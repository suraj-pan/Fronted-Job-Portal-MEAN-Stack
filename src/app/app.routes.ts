import { Routes } from '@angular/router';
import {JobListComponent} from "./components/jobs/job-list/job-list.component";
import {RegisterComponent} from "./components/auth/register/register.component";
import {LoginComponent} from "./components/auth/login/login.component";
import {ApplyJobsComponent} from "./components/applications/apply-jobs/apply-jobs.component";
import {RecruiterDashboardComponent} from "./components/dashboard/recruiter-dashboard/recruiter-dashboard.component";
import {JobseekerDashboardComponent} from "./components/dashboard/jobseeker-dashboard/jobseeker-dashboard.component";
import {JobDetailComponent} from "./components/jobs/job-detail/job-detail.component";
import {JobPostComponent} from "./components/jobs/job-post/job-post.component";
import {authGuard} from "./guard/auth.guard";
import {roleGuard} from "./guard/role.guard";
import {ProfileComponent} from "./components/profile/profile.component";
import {ApplicationsListComponent} from "./components/applications-list/applications-list.component";
export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'jobs', component: JobListComponent,canActivate: [authGuard] },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'job/:id', component: JobDetailComponent, canActivate: [authGuard] },
  { path: 'post-job', component: JobPostComponent,   canActivate: [roleGuard],
    data: { expectedRole: 'recruiter' }  },
  { path: 'application/:id/status', component: ApplicationsListComponent,canActivate: [roleGuard],
    data: { expectedRole: 'recruiter' }  },
  { path: 'apply/:id', component: ApplyJobsComponent, canActivate: [authGuard] },
  { path: 'profile', component: ProfileComponent, canActivate: [authGuard] },
  { path: 'recruiter-dashboard', component: RecruiterDashboardComponent,   canActivate: [roleGuard],
    data: { expectedRole: 'recruiter' }  },
  { path: 'jobseeker-dashboard', component: JobseekerDashboardComponent , canActivate: [authGuard] },
];
