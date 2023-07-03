import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignupComponent } from './pages/admin/signup/signup.component';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { DashboardComponent } from './pages/admin/dashboard/dashboard.component';
import { ExpertoDashboardComponent } from './pages/experto/experto-dashboard/experto-dashboard.component';
import { ExpertoGuard } from './services/experto.guard';
import { AdminGuard } from './services/admin.guard';
import { ProfileComponent } from './pages/profile/profile.component';
import { WelcomeComponent } from './pages/admin/welcome/welcome.component';
import { ViewPrincipiosComponent } from './pages/admin/view-principios/view-principios.component';
import { AddPrincipiosComponent } from './pages/admin/add-principios/add-principios.component';
import { ActualizarPrincipioComponent } from './pages/admin/actualizar-principio/actualizar-principio.component';
import { ExpertoWelcomeComponent } from './pages/experto/experto-welcome/experto-welcome.component';
import { ExpertoEvaluacionComponent } from './pages/experto/experto-evaluacion/experto-evaluacion.component';
import { ExpertoEvaluarComponent } from './pages/experto/experto-evaluar/experto-evaluar.component';
import { ActualizarEvaluacionComponent } from './pages/experto/actualizar-evaluacion/actualizar-evaluacion.component';
import { ExpertoGReporteComponent } from './pages/experto/experto-g-reporte/experto-g-reporte.component';
import { ViewUsuariosComponent } from './pages/admin/view-usuarios/view-usuarios.component';
import { ActualizarUsuarioComponent } from './pages/admin/actualizar-usuario/actualizar-usuario.component';
import { ReporteEvaluacionesComponent } from './pages/admin/reporte-evaluaciones/reporte-evaluaciones.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
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
    canActivate: [AdminGuard],
    children: [
      {
        path: '',
        component: WelcomeComponent
      },
      {
        path: 'profile',
        component: ProfileComponent
      },
      {
        path: 'principios',
        component: ViewPrincipiosComponent
      },
      {
        path: 'add-principio',
        component: AddPrincipiosComponent
      },
      {
        path: 'principios/:principioId',
        component: ActualizarPrincipioComponent
      },
      {
        path: 'signup',
        component: SignupComponent,
        pathMatch: 'full'
      },
      {
        path: 'users',
        component: ViewUsuariosComponent
      },
      {
        path: 'usuarios/:usuarioId',
        component: ActualizarUsuarioComponent
      },
      {
        path: 'reporteEvaluaciones',
        component: ReporteEvaluacionesComponent
      },
    ]
  },
  {
    path: 'expert-dash',
    component: ExpertoDashboardComponent,
    canActivate: [ExpertoGuard],
    children: [
      {
        path: '',
        component: ExpertoWelcomeComponent
      },
      {
        path: 'profile',
        component: ProfileComponent
      },
      {
        path: 'principios',
        component: ViewPrincipiosComponent
      },
      {
        path: 'evaluacion',
        component: ExpertoEvaluacionComponent
      },
      {
        path: 'evaluar',
        component: ExpertoEvaluarComponent
      },
      {
        path: 'actualizar-evaluacion/:evaluacionId',
        component: ActualizarEvaluacionComponent
      },
      {
        path: 'reporte',
        component: ExpertoGReporteComponent
      },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
