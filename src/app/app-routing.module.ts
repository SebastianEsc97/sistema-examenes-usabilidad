import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignupComponent } from './pages/signup/signup.component';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { DashboardComponent } from './pages/admin/dashboard/dashboard.component';
import { ExpertoDashboardComponent } from './pages/experto/experto-dashboard/experto-dashboard.component';
import { ExpertoGuard } from './services/experto.guard';
import { AdminGuard } from './services/admin.guard';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    pathMatch: 'full'
  },
  {
    path: 'signup',
    component: SignupComponent,
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent,
    pathMatch: 'full'
  },
  {
    path: 'admin-dash',
    component: DashboardComponent,
    pathMatch: 'full',
    canActivate:[AdminGuard]
  },
  {
    path: 'expert-dash',
    component: ExpertoDashboardComponent,
    pathMatch: 'full',
    canActivate:[ExpertoGuard]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
