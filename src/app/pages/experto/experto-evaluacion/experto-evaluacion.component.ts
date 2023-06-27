import { LoginService } from 'src/app/services/login.service';
import { EvaluarService } from './../../../services/evaluar.service';
import { Component, OnInit } from '@angular/core';

import Swal from 'sweetalert2';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-experto-evaluacion',
  templateUrl: './experto-evaluacion.component.html',
  styleUrls: ['./experto-evaluacion.component.css']
})
export class ExpertoEvaluacionComponent implements OnInit {
  user: any = null;

  evaluacion = {
    evaluacionId: 0,
    titulo: '',
    descripcion: '',
    url: '',
    activo: false,
    comentario: '',
    usuario: {
      id: ''
    },
    fecha: Date,
    ultimaFecha: Date
  }
  principioEvaluacion: any;
  evaluacionId = 0;

  evaluaciones: any = []
  constructor(private evaluarService: EvaluarService, private loginService: LoginService, private route: ActivatedRoute) { }
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

  actualizarEvaluacion(evaluacionId: any) {
    Swal.fire({
      title: 'Terminar Evaluación',
      text: '¿Estás seguro que deseas terminar esta evaluación?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '',
      cancelButtonColor: '',
      confirmButtonText: 'Terminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      this.evaluarService.obtenerEvaluacion(evaluacionId).subscribe(
        (data: any) => {
          this.evaluacion.evaluacionId = evaluacionId;
          this.evaluacion.titulo = data.titulo;
          this.evaluacion.descripcion = data.descripcion;
          this.evaluacion.url = data.url;
          this.evaluacion.comentario = data.comentario;
          this.evaluacion.usuario.id = data.usuario.id;
          this.evaluacion.fecha = data.fecha;
          this.evaluacion.ultimaFecha = data.ultimaFecha;
          console.log(this.evaluacion);
          this.evaluarService.actualizarEvaluacion(this.evaluacion).subscribe(
            (data) => {
              location.reload();
            },
            (error) => {

            }
          )
        }, (error) => {
          console.log(error)
        }
      )
    })

  }
}
