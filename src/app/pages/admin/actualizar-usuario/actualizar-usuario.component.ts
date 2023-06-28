import { UserService } from 'src/app/services/user.service';
import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-actualizar-usuario',
  templateUrl: './actualizar-usuario.component.html',
  styleUrls: ['./actualizar-usuario.component.css']
})
export class ActualizarUsuarioComponent implements OnInit {

  correo = new FormControl('', [Validators.required, Validators.pattern('^[a-zA-Z0-9_+&*-]+(?:\\.[a-zA-Z0-9_+&*-]+)*@(?:[a-zA-Z0-9-]+\\.)+[a-zA-Z]{2,7}$')]);
  nombre = new FormControl('', [Validators.required, Validators.pattern('^[a-zA-Z ]+$')]);
  apellido = new FormControl('', [Validators.required, Validators.pattern('^[a-zA-Z ]+$')]);
  telefono = new FormControl('', [Validators.required, Validators.pattern('^[0-9]+$')]);
  descripcion = new FormControl('', Validators.required);

  usuarioId = 0;
  usuario = {
    id: 0,
    username: '',
    password: '',
    nombre: '',
    apellido: '',
    email: '',
    descripcion: '',
    telefono: ''
  }

  constructor(private route: ActivatedRoute, private userService: UserService, private router: Router) { }

  ngOnInit(): void {
    this.usuarioId = this.route.snapshot.params['usuarioId'];
    console.log(this.usuarioId);
    this.userService.obtenerUsuario(this.usuarioId).subscribe(
      (data: any) => {
        this.usuario.id = this.usuarioId;
        this.usuario.username = data.username;
        this.usuario.password = data.password;
        this.usuario.nombre = data.nombre;
        this.usuario.apellido = data.apellido;
        this.usuario.email = data.email;
        this.usuario.descripcion = data.descripcion;
        this.usuario.telefono = data.telefono;
        console.log(data)
      }, (error) => {
        console.log(error)
      }
    )

  }


  public actualizarUsuario() {
    this.userService.actualizarUsuario(this.usuario).subscribe(
      (data) => {
        Swal.fire('Experto Actualizado', 'El experto se ha actualizado con exito', 'success').then(
          (e) => {
            this.router.navigate(['/admin-dash/users'])
          }
        );
      },
      (error) => {
        Swal.fire('Error al actualizar', 'No se ha podido actualizar el experto', 'error')
      }
    )
  }

}
