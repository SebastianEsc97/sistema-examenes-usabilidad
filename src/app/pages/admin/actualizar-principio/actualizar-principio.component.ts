import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PrincipioService } from 'src/app/services/principio.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-actualizar-principio',
  templateUrl: './actualizar-principio.component.html',
  styleUrls: ['./actualizar-principio.component.css']
})
export class ActualizarPrincipioComponent implements OnInit {

  constructor(private route: ActivatedRoute, private principioService: PrincipioService, private router: Router) { }

  principioId = 0;
  principio: any;

  ngOnInit(): void {
    this.principioId = this.route.snapshot.params['principioId'];
    this.principioService.obtenerPrincipio(this.principioId).subscribe(
      (data) => {
        this.principio = data
        console.log(this.principio)
      }, (error) => {
        console.log(error)
      }
    )
    this.principioService.listarPrincipios().subscribe(
      (data: any) => {
        this.principio = data;
      },
      (error) => {
        alert('Error al cargar categorias')
      }
    )
  }

  public actualizarPrincipio() {
    this.principioService.actualizarPrincipio(this.principio).subscribe(
      (data) => {
        Swal.fire('Principio Actualizado', 'El principio se ha actualizado con exito', 'success').then(
          (e) => {
            this.router.navigate(['/admin-dash/principios'])
          }
        );
      },
      (error) => {
        Swal.fire('Error al actualizar', 'No se ha podido actualizar el principio', 'error')
      }
    )
  }

}
