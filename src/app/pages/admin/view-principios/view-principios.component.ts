import { Component, OnInit } from '@angular/core';
import { window } from 'rxjs';
import { PrincipioService } from 'src/app/services/principio.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-principios',
  templateUrl: './view-principios.component.html',
  styleUrls: ['./view-principios.component.css']
})
export class ViewPrincipiosComponent implements OnInit {

  principios: any = []
  principio = {
    principioId : 0,
    titulo: '',
    descripcion: '',
    activo: false
  }
  constructor(private principioService: PrincipioService) { }
  ngOnInit(): void {
    this.principioService.listarPrincipios().subscribe(
      (data: any) => {
        this.principios = data;
        this.principios = data.filter((principio: { activo: boolean }) => principio.activo === true);
      }, (error) => {
        console.log(error)
        Swal.fire('Error!!', 'Error al cargar los principios', 'error')
      }
    )
  }

  eliminarPrincipio(principioId: any) {
    console.log(principioId)
    Swal.fire({
      title: 'Eliminar Principio',
      text: '¿Estás seguro que deseas eliminar este principio?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '',
      cancelButtonColor: '',
      confirmButtonText: 'Eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      console.log(result);

        this.principioService.obtenerPrincipio(principioId).subscribe(
          (data: any) => {
            console.log(data);
            this.principio.principioId = principioId;
            this.principio.titulo = data.titulo;
            this.principio.descripcion = data.descripcion;
            this.principioService.actualizarPrincipio(this.principio).subscribe(
              (data) => {

              }
            )
            // location.reload();
            // this.principios = this.principios.filter((principio: any) => principio.principioId != principioId);
            Swal.fire('Principio Eliminado', 'El principio ha sido eliminado con exito', 'success');
            location.reload()
          }, (error) => {
            Swal.fire('Error', 'Error al eleminar el principio', 'error');
          }
        )

    })
  }

}
