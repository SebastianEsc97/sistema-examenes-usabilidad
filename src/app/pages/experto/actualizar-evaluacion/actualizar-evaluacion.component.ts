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

  tituloControl = new FormControl('', Validators.required);
  descripcion = new FormControl('', Validators.required);
  url = new FormControl('', [Validators.required, Validators.pattern('^(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})([/\\w .-]*)*/?$')]);
  calificacionPrincipios = new FormControl('', Validators.required);
  comentariosPrincipios = new FormControl('', Validators.required);
  comentario = new FormControl('', Validators.required);

  respuestas: any = [];
  comentarios: any = [];
  estados: any = [];
  activos: boolean[] = [];
  principiosAux: any = [];
  estado: boolean = false;
  fechaActual = new Date();

  evaluacion = {
    evaluacionId: 0,
    titulo: '',
    descripcion: '',
    url: '',
    activo: true,
    comentario: '',
    usuario: {
      id: ''
    },
    fecha: '',
    ultimaFecha: this.fechaActual.toISOString()
  }
  principioEvaluacion = {
    principiosEvaluacionesId: 0,
    respuesta: '',
    comentario: '',
    evaluacion: 0,
    principio: 0,
    estado: false
  }
  principios: any = [];
  principioEvaluaciones: any = [];
  evaluacionId = 0;
  fechaaux= Date;

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
        this.evaluacion.fecha = data.fecha;
        console.log(data);
      }, (error) => {
        console.log(error)
      }
    )
    this.principioService.listarPrincipios().subscribe(
      (data: any) => {
        this.principios = data;
      }, (error) => {
        console.log(error)
        Swal.fire('Error!!', 'Error al cargar los principios', 'error')
      }
    )

    this.evaluarService.obtenerPrincipioEvaluacionxEvaluacion(this.evaluacionId).subscribe(
      (data: any) => {
        this.principioEvaluaciones = data;
        console.log(data);
        console.log(this.principios);
        console.log(this.principioEvaluaciones);
        for (let i = 0; i < this.principios.length; i++) {
          for (const pe of this.principioEvaluaciones) {
            // console.log(this.principios[i].principioId);
            // console.log(pe.principio.principioId);
            if (this.principios[i].principioId === pe.principio.principioId) {
              this.principiosAux.push(this.principios[i]);
            }
          }
        }
        // console.log(this.principiosAux);
        console.log(this.principioEvaluaciones);
      }, (error) => {
        console.log(error)
        Swal.fire('Error!!', 'Error al cargar los principios', 'error')
      }
    )

  }

  actualizarEvaluacion() {
    console.log(this.evaluacion);
    //console.log(this.estados);
    this.evaluarService.actualizarEvaluacion(this.evaluacion).subscribe(
      (data) => {
        console.log(data);
        for (const pe of this.principioEvaluaciones) {
          //console.log(pe);

          this.principioEvaluacion.principiosEvaluacionesId = pe.principiosEvaluacionesId;
          this.principioEvaluacion.comentario = pe.comentario;
          this.principioEvaluacion.respuesta = pe.respuesta;
          this.principioEvaluacion.evaluacion = pe.evaluacion.evaluacionId;
          this.principioEvaluacion.principio = pe.principio.principioId;
          this.principioEvaluacion.estado = pe.estado;
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
    console.log(this.respuestas)
  }

  guardarComentario(indice: number, valor: string) {
    this.comentarios[indice] = valor;
    console.log(this.comentarios)
  }

  guardarActivo(indice: number, event: boolean) {
    if(event != true){
      event = false;
      console.log(event);
      this.activos[indice] = event;
    }else{
    this.activos[indice] = event;
    }
  }

  isEstadoChecked(pe: any): boolean {
    for (let i = 0; i < this.principioEvaluaciones.length; i++) {
      if(pe.principio.principioId === this.principioEvaluaciones[i].principio.principioId) {
        if(this.principioEvaluaciones[i].estado){
          this.estado = true;
        }else{
          this.estado = false;
        }
      }
    }
    return this.estado;
  }
}
