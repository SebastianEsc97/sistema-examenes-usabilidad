import { UserService } from 'src/app/services/user.service';
import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-actualizar-usuario',
  templateUrl: './actualizar-usuario.component.html',
  styleUrls: ['./actualizar-usuario.component.css']
})
export class ActualizarUsuarioComponent implements OnInit {

  constructor(private route: ActivatedRoute, private userService: UserService, private router: Router) { }

  usuarioId = 0;
  usuario: any;

  ngOnInit(): void {
    this.usuarioId = this.route.snapshot.params['usuarioId'];
    console.log(this.usuarioId);
    this.userService.obtenerUsuario(this.usuarioId).subscribe(
      (data) => {
        this.usuario = data
        console.log(this.usuario)
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
