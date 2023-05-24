import { EvaluarService } from 'src/app/services/evaluar.service';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-actualizar-evaluacion',
  templateUrl: './actualizar-evaluacion.component.html',
  styleUrls: ['./actualizar-evaluacion.component.css']
})
export class ActualizarEvaluacionComponent {

  titulo = new FormControl('', Validators.required);
  descripcion = new FormControl('', Validators.required);
  url = new FormControl('', Validators.required);
  respuestass = new FormControl('', Validators.required);
  comentarioss = new FormControl('', Validators.required);
  comentario = new FormControl('', Validators.required);

  evaluacion: any;
  principioEvaluacion: any;
  evaluacionId =0;

  constructor(private route: ActivatedRoute, private evaluarService: EvaluarService, private router: Router){}

  ngOnInit(): void {
    this.evaluacionId = this.route.snapshot.params['evaluacionId'];
    this.evaluarService.obtenerEvaluacion(this.evaluacionId).subscribe(
      (data) => {
        this.evaluacion = data
      }, (error) => {
        console.log(error)
      }
    )

  }


  actualizarEvaluacion(){
    this.evaluarService.actualizarEvaluacion(this.evaluacion).subscribe(
      (data) => {
        Swal.fire('Evaluación Actualizada', 'La evaluación se ha actualizado con exito', 'success').then(
          (e) => {
            this.router.navigate(['/admin-dash/evaluacion'])
          }
        );
      },
      (error) => {
        Swal.fire('Error al actualizar', 'No se ha podido actualizar la evaluación', 'error')
      }
    )
  }
}
