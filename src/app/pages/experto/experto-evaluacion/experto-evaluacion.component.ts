import { LoginService } from 'src/app/services/login.service';
import { EvaluarService } from './../../../services/evaluar.service';
import { Component, OnInit } from '@angular/core';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-experto-evaluacion',
  templateUrl: './experto-evaluacion.component.html',
  styleUrls: ['./experto-evaluacion.component.css']
})
export class ExpertoEvaluacionComponent implements OnInit {
  user: any = null;
  evaluaciones: any = []
  constructor(private evaluarService: EvaluarService, private loginService: LoginService) { }
  ngOnInit(): void {
    this.user = this.loginService.getUserId();
    this.evaluarService.obtenerEvaluacionPorUsuario(this.user).subscribe(
      (data: any) => {
        this.evaluaciones = data.filter((evaluacion: { activo: boolean }) => evaluacion.activo === true);

        console.log(data);
      }, (error) => {
        Swal.fire('Error!!', 'Error al cargar las evaluaciones', 'error')
      }
    )
  }

  eliminarEvaluacion(evaluacionId: any) {
    Swal.fire({
      title: 'Eliminar Evaluación',
      text: '¿Estás seguro que deseas eliminar esta evaluación?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '',
      cancelButtonColor: '',
      confirmButtonText: 'Eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.evaluarService.eliminarEvaluacion(evaluacionId).subscribe(
          (data) => {
            this.evaluaciones = this.evaluaciones.filter((evaluacion: any) => evaluacion.evaluacionId != evaluacionId);
            Swal.fire('Evalución Eliminada', 'La evaluación ha sido eliminado con exito', 'success');
          }, (error) => {
            Swal.fire('Error', 'Error al eleminar la evaluación', 'error');
          }
        )
      }
    })
  }
}
