import { MatSliderModule } from '@angular/material/slider';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SignupComponent } from './pages/admin/signup/signup.component';
import { LoginComponent } from './pages/login/login.component';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { HomeComponent } from './pages/home/home.component';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { AuthInterceptorProviders } from './services/auth.interceptor';
import { DashboardComponent } from './pages/admin/dashboard/dashboard.component';
import { ExpertoDashboardComponent } from './pages/experto/experto-dashboard/experto-dashboard.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { MatListModule } from '@angular/material/list';
import { SidebarComponent } from './pages/admin/sidebar/sidebar.component';
import { WelcomeComponent } from './pages/admin/welcome/welcome.component';
import { ViewPrincipiosComponent } from './pages/admin/view-principios/view-principios.component';
import { AddPrincipiosComponent } from './pages/admin/add-principios/add-principios.component';
import { NgxUiLoaderHttpModule, NgxUiLoaderModule } from "ngx-ui-loader";
import { ActualizarPrincipioComponent } from './pages/admin/actualizar-principio/actualizar-principio.component';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { ExpertoSidebarComponent } from './pages/experto/experto-sidebar/experto-sidebar.component';
import { ExpertoWelcomeComponent } from './pages/experto/experto-welcome/experto-welcome.component';
import { ExpertoEvaluacionComponent } from './pages/experto/experto-evaluacion/experto-evaluacion.component';
import { ExpertoEvaluarComponent } from './pages/experto/experto-evaluar/experto-evaluar.component';
import { ActualizarEvaluacionComponent } from './pages/experto/actualizar-evaluacion/actualizar-evaluacion.component';
import { ExpertoGReporteComponent } from './pages/experto/experto-g-reporte/experto-g-reporte.component';
import { ViewUsuariosComponent } from './pages/admin/view-usuarios/view-usuarios.component';
import { ActualizarUsuarioComponent } from './pages/admin/actualizar-usuario/actualizar-usuario.component';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatGridListModule } from '@angular/material/grid-list';
import { ReporteEvaluacionesComponent } from './pages/admin/reporte-evaluaciones/reporte-evaluaciones.component';



@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    SignupComponent,
    LoginComponent,
    HomeComponent,
    DashboardComponent,
    ExpertoDashboardComponent,
    ProfileComponent,
    SidebarComponent,
    WelcomeComponent,
    ViewPrincipiosComponent,
    AddPrincipiosComponent,
    ActualizarPrincipioComponent,
    ExpertoSidebarComponent,
    ExpertoWelcomeComponent,
    ExpertoEvaluacionComponent,
    ExpertoEvaluarComponent,
    ActualizarEvaluacionComponent,
    ExpertoGReporteComponent,
    ViewUsuariosComponent,
    ActualizarUsuarioComponent,
    ReporteEvaluacionesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatSnackBarModule,
    MatCardModule,
    MatToolbarModule,
    MatIconModule,
    MatListModule,
    NgxUiLoaderModule,
    MatMenuModule,
    MatSliderModule,
    MatProgressBarModule,
    MatSlideToggleModule,
    MatExpansionModule,
    MatGridListModule,
    NgxUiLoaderHttpModule.forRoot({
      showForeground: true
    })
  ],
  providers: [AuthInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
