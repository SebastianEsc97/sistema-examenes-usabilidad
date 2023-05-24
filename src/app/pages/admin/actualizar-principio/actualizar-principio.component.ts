import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PrincipioService } from 'src/app/services/principio.service';
import Swal from 'sweetalert2';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-actualizar-principio',
  templateUrl: './actualizar-principio.component.html',
  styleUrls: ['./actualizar-principio.component.css']
})
export class ActualizarPrincipioComponent implements OnInit {

  titulo = new FormControl('', Validators.required);
  descripcion = new FormControl('', Validators.required);

  constructor(private route: ActivatedRoute, private principioService: PrincipioService, private router: Router, private snack: MatSnackBar) { }

  principioId = 0;
  principio: any;

  ngOnInit(): void {
    this.principioId = this.route.snapshot.params['principioId'];
    this.principioService.obtenerPrincipio(this.principioId).subscribe(
      (data) => {
        this.principio = data
      }, (error) => {
        console.log(error)
      }
    )
  }

  public actualizarPrincipio() {
    if (this.principio.titulo.trim() == '' || this.principio.titulo == null) {
      this.snack.open("El título es obligatorio!!", 'Aceptar', {
        duration: 2000
      })
      return;
    }
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
