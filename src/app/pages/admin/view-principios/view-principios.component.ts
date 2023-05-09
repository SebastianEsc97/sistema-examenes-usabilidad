import { Component, OnInit } from '@angular/core';
import { PrincipioService } from 'src/app/services/principio.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-principios',
  templateUrl: './view-principios.component.html',
  styleUrls: ['./view-principios.component.css']
})
export class ViewPrincipiosComponent implements OnInit {

  principios: any = []
  constructor(private principioService: PrincipioService) { }
  ngOnInit(): void {
    this.principioService.listarPrincipios().subscribe(
      (data: any) => {
        this.principios = data;
      }, (error) => {
        console.log(error)
        Swal.fire('Error!!', 'Error al cargar las categorias', 'error')
      }
    )
  }

  eliminarPrincipio(principioId: any) {
    Swal.fire({
      title: 'Eliminar Principio',
      text: '¿Está seguro de continuar?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '',
      cancelButtonColor: '',
      confirmButtonText: 'Eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.principioService.eliminarPrincipio(principioId).subscribe(
          (data) => {
            this.principios = this.principios.filter((prinpio: any) => prinpio.principioId != principioId);
            Swal.fire('Principio Eliminado', 'El principio ha sido eliminado con exito', 'success');
          }, (error) => {
            Swal.fire('Error', 'Error al eleminar el principio', 'error');
          }
        )
      }
    })
  }

}
