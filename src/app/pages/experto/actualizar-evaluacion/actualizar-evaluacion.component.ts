import { EvaluarService } from 'src/app/services/evaluar.service';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { FormControl, Validators } from '@angular/forms';
import { PrincipioService } from 'src/app/services/principio.service';

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
  respuestas: any = [];
  comentarios: any = [];
  evaluacion = {
    evaluacionId: 0,
    titulo: '',
    descripcion: '',
    url: '',
    activo: true,
    comentario: '',
    usuario: {
      id: ''
    }
  }
  principioEvaluacion = {
    principiosEvaluacionesId: 0,
    respuesta: '',
    comentario: '',
    evaluacion: 0,
    principio: 0
  }
  principios: any = [];
  principioEvaluaciones: any = [];
  evaluacionId = 0;

  constructor(private route: ActivatedRoute, private evaluarService: EvaluarService, private router: Router, private principioService: PrincipioService) { }

  ngOnInit(): void {
    this.evaluacionId = this.route.snapshot.params['evaluacionId'];
    this.evaluarService.obtenerEvaluacion(this.evaluacionId).subscribe(
      (data: any) => {
        this.evaluacion.evaluacionId = this.evaluacionId;
        this.evaluacion.titulo = data.titulo;
        this.evaluacion.descripcion = data.descripcion;
        this.evaluacion.url = data.url;
        this.evaluacion.comentario = data.comentario;
        this.evaluacion.usuario.id = data.usuario.id;
      }, (error) => {
        console.log(error)
      }
    )

    this.evaluarService.obtenerPrincipioEvaluacionxEvaluacion(this.evaluacionId).subscribe(
      (data: any) => {
        this.principioEvaluaciones = data;
        console.log(this.principioEvaluaciones);
        for (const pe of this.principioEvaluaciones) {
          pe.respuesta = pe.respuesta || ''; // Asignar valor predeterminado si es nulo o indefinido
          pe.comentario = pe.comentario || ''; // Asignar valor predeterminado si es nulo o indefinido
        }
      }, (error) => {
        console.log(error)
        Swal.fire('Error!!', 'Error al cargar las categorias', 'error')
      }
    )
    this.principioService.listarPrincipios().subscribe(
      (data: any) => {
        this.principios = data;
      }, (error) => {
        console.log(error)
        Swal.fire('Error!!', 'Error al cargar las categorias', 'error')
      }
    )
  }

  actualizarEvaluacion() {
    console.log(this.evaluacion);
    this.evaluarService.actualizarEvaluacion(this.evaluacion).subscribe(
      (data) => {
        for (const pe of this.principioEvaluaciones) {
          console.log(pe);
          this.principioEvaluacion.principiosEvaluacionesId = pe.principiosEvaluacionesId;
          this.principioEvaluacion.comentario = pe.comentario;
          this.principioEvaluacion.respuesta = pe.respuesta;
          this.principioEvaluacion.evaluacion = pe.evaluacion.evaluacionId;
          this.principioEvaluacion.principio = pe.principio.principioId;
          this.evaluarService.actualizarPrincipioEvaluacion(this.principioEvaluacion)
            .subscribe(
              (data) => {
              },
              (error) => {
                Swal.fire('Error al actualizar', 'No se ha podido actualizar la evaluación', 'error')
              }
            );
        }
        Swal.fire('Evaluación Actualizada', 'La evaluación se ha actualizado con exito', 'success').then(
          (e) => {
            this.router.navigate(['/expert-dash/evaluacion'])
          }
        );
      },
      (error) => {
        Swal.fire('Error al actualizar', 'No se ha podido actualizar la evaluación', 'error')
      }
    )
  }

  guardarRespuesta(indice: number, valor: string) {
    this.respuestas[indice] = valor;
  }

  guardarComentario(indice: number, valor: string) {
    this.comentarios[indice] = valor;
  }
}
