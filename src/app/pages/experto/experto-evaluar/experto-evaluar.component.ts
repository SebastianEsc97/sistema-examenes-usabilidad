import { Component, OnInit } from '@angular/core';
import { EvaluarService } from 'src/app/services/evaluar.service';
import { LoginService } from 'src/app/services/login.service';
import { PrincipioService } from 'src/app/services/principio.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-experto-evaluar',
  templateUrl: './experto-evaluar.component.html',
  styleUrls: ['./experto-evaluar.component.css']
})
export class ExpertoEvaluarComponent implements OnInit {

  principios: any = [];
  respuestas: any=[];
  comentarios: any = [];
  evaluacion = {
    id: '',
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
    principio: {
      principioId: ''
    },
    evaluacion: {
      evaluacionId: ''
    },
    respuesta: 0,
    comentario: ""
  }

  constructor(private principioService: PrincipioService, private evaluarService: EvaluarService, private loginService: LoginService) { }
  ngOnInit(): void {
    this.evaluacion.usuario.id = JSON.stringify(this.loginService.getUserId())
    this.principioService.listarPrincipios().subscribe(
      (data: any) => {
        this.principios = data;
        this.principioEvaluacion.principio.principioId = data.id;
      }, (error) => {
        console.log(error)
        Swal.fire('Error!!', 'Error al cargar las categorias', 'error')
      }
    )
    this.respuestas = new Array(this.principios.length).fill('');
    this.comentarios = new Array(this.comentarios.length).fill('');
  }
  formSubmit() {
    // if (this.principio.titulo.trim() == '' || this.principio.titulo == null) {
    //   this.snack.open("El título es obligatorio!!", '', {
    //     duration: 2000
    //   })
    //   return;
    // }
    this.evaluarService.agregarEvaluacion(this.evaluacion).subscribe(
      (dato: any) => {
        this.principioEvaluacion.evaluacion.evaluacionId = dato.evaluacionId;
        console.log(this.principioEvaluacion.evaluacion.evaluacionId);
        this.evaluacion.titulo = '';
        this.evaluacion.descripcion = '';
        this.evaluacion.url = '';
        this.evaluacion.comentario = '';
        this.principios.forEach((principio:any) => {
          this.principioEvaluacion.principio.principioId = principio.principioId;
          this.principioEvaluacion.respuesta = this.respuestas[principio.principioId - 1];
          this.principioEvaluacion.comentario = this.comentarios[principio.principioId - 1];
          console.log("principio"+this.principioEvaluacion.principio.principioId);
          console.log("evaluacion"+this.principioEvaluacion.evaluacion.evaluacionId);
          console.log("Respuesta"+this.principioEvaluacion.respuesta);
          this.evaluarService.agregarPrincipioEvaluacion(this.principioEvaluacion).subscribe(
            (dato: any) => {
              console.log(dato);
            }, (error) => {
              console.log(error);
            }
          )
        });
        Swal.fire('Principio agregado', 'El principio ha sido agregado con exito', 'success').then (function () { window.location.href ="/expert-dash/evaluacion"});
      }, (error) => {
        console.log(error);
        Swal.fire('Error!!', 'Error al guardar el principio', 'error')
      }
    )


  }
  guardarRespuesta(indice: number, valor: string) {
    this.respuestas[indice] = valor;
  }
  guardarComnetario(indice: number, valor: string){
    this.comentarios[indice] = valor;
  }
}




