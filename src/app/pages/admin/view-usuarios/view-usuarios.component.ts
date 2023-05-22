import { UserService } from 'src/app/services/user.service';
import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-usuarios',
  templateUrl: './view-usuarios.component.html',
  styleUrls: ['./view-usuarios.component.css']
})
export class ViewUsuariosComponent implements OnInit {

  usuarios: any = [];

  constructor(private userService: UserService){ }
  ngOnInit() {
    this.userService.listarUsuarios().subscribe(
      (data: any) => {
        this.usuarios= data;
      }, (error) => {
        console.log(error);
        Swal.fire('Error!!', 'Error al cargar los usuarios', 'error')
      }
    )

  }

  eliminarUsuario(usuarioId: any) {
    Swal.fire({
      title: 'Eliminar Usuario',
      text: '¿Está seguro de continuar?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '',
      cancelButtonColor: '',
      confirmButtonText: 'Eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.userService.eliminarUsuario(usuarioId).subscribe(
          (data) => {
            this.usuarios = this.usuarios.filter((user: any) => user.id != usuarioId);
            Swal.fire('Usuario Eliminado', 'El Usuario ha sido eliminado con exito', 'success');
          }, (error) => {
            Swal.fire('Error', 'Error al eliminar el usuario', 'error');
          }
        )
      }
    })
  }
}
