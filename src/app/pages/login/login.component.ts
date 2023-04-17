import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginData = {
    "username": '',
    "password": ''
  }

  constructor(private snack: MatSnackBar, private loginService: LoginService, private router: Router) {

  }
  ngOnInit(): void {

  }

  formSubmit() {
    if (this.loginData.username.trim() == '' || this.loginData.username.trim() == null) {
      this.snack.open('El nombre de usuario es obligatorio', 'Aceptar', {
        duration: 2000
      })
      return;
    }

    if (this.loginData.password.trim() == '' || this.loginData.password.trim() == null) {
      this.snack.open('La contraseña es obligatoria', 'Aceptar', {
        duration: 2000
      })
      return;
    }

    this.loginService.generateToken(this.loginData).subscribe(
      (data: any) => {
        console.log(data);
        this.loginService.loginUser(data.token);
        this.loginService.getCurrentUser().subscribe((user: any) => {
          this.loginService.setUser(user);
          console.log(user);

          if (this.loginService.getUserRole() == "ADMIN") {
            this.router.navigate(['admin-dash']);
            this.loginService.loginStatusSubject.next(true);

          } else if (this.loginService.getUserRole() == "EXPERTO") {
            this.router.navigate(['expert-dash']);
            this.loginService.loginStatusSubject.next(true);
          } else {
            this.loginService.logout();
          }
        })
      }, (error) => {
        this.snack.open('Información incorrecta, vuelva a intentarlo!!', 'Aceptar', {
          duration: 2000
        })
        console.log(error);
      })
  }

}
