import { MatSnackBar } from '@angular/material/snack-bar';
import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  public user = {
    email: '',
    nombre: '',
    apellido: '',
    telefono: '',
    username: '',
    password: ''
  }

  ngOnInit(): void {
  }

  constructor(private userService: UserService, private snack: MatSnackBar) { }

  formSubmit() {
    // faltan poner validaciones
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
          title: '¡El usuario ha sido registrado exitosamente!',
          showConfirmButton: false,
          timer: 2500
        })
      }, (error) => {
        this.snack.open('El nombre de usuario ya ha sido registrado, escoga otro', 'Aceptar', {
          duration: 2500,
          verticalPosition: 'top',
          horizontalPosition: 'right'
        });
      }
    )
  }
}