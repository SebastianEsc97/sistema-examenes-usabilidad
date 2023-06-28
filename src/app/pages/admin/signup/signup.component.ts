import { MatSnackBar } from '@angular/material/snack-bar';
import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  correo = new FormControl('', [Validators.required, Validators.pattern('^[a-zA-Z0-9_+&*-]+(?:\\.[a-zA-Z0-9_+&*-]+)*@(?:[a-zA-Z0-9-]+\\.)+[a-zA-Z]{2,7}$')]);
  nombre = new FormControl('', [Validators.required, Validators.pattern('^[a-zA-Z ]+$')]);
  apellido = new FormControl('', [Validators.required, Validators.pattern('^[a-zA-Z ]+$')]);
  telefono = new FormControl('', [Validators.required, Validators.pattern('^[0-9]+$')]);
  usuario = new FormControl('', Validators.required);
  contrasenia = new FormControl('', Validators.required);
  descripcion = new FormControl('', Validators.required);
  public user = {
    email: '',
    nombre: '',
    apellido: '',
    telefono: '',
    username: '',
    password: '',
    descripcion: ''
  }

  ngOnInit(): void {
  }

  constructor(private userService: UserService, private snack: MatSnackBar) { }

  formSubmit() {
    if (this.user.username == '' || this.user.username == null) {
      this.snack.open('El nombre de usuario es requerido', 'Aceptar', {
        duration: 2000,
        verticalPosition: 'bottom',
        horizontalPosition: 'center'
      });
      return;
    }
    this.userService.registrarUsuario(this.user).subscribe(
      (data) => {
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: '¡El experto ha sido registrado exitosamente!',
          showConfirmButton: true
        }).then(function () { window.location.href ="/admin-dash/users"})
      }, (error) => {
        this.snack.open('El nombre de usuario ya ha sido registrado, intenta con otro', 'Aceptar', {
          duration: 2500,
          verticalPosition: 'top',
          horizontalPosition: 'center'
        });
      }
    )
  }
}
