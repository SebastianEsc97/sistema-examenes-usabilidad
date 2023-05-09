import { LoginService } from 'src/app/services/login.service';
import { Component, OnInit } from '@angular/core';
import { PrincipioService } from 'src/app/services/principio.service';
import { EvaluarService } from './../../../services/evaluar.service';
import Swal from 'sweetalert2';



@Component({
  selector: 'app-experto-evaluar',
  templateUrl: './experto-evaluar.component.html',
  styleUrls: ['./experto-evaluar.component.css']
})
export class ExpertoEvaluarComponent implements OnInit {

  user: any = null;
  userId: any = null;
  principios: any = [

  ]

  evaluacion = {
    titulo: '',
    descripcion: '',
    url: '',
    activo: '',
    comentario: '',
    usuario: ''
  }

  principioEvaluacio = {
    respuesta: '',
    evaluacion: '',
    principios: ''
  }

  constructor(private principioService: PrincipioService, private evaluarService: EvaluarService, private loginService: LoginService) { }
  ngOnInit(): void {
    this.user = this.loginService.getUserId()
    console.log(this.user)
    this.principioService.listarPrincipios().subscribe(
      (data: any) => {
        this.principios = data;
      }, (error) => {
        console.log(error)
        Swal.fire('Error!!', 'Error al cargar las categorias', 'error')
      }
    )
  }



  formSubmit() {
    // if(this.principio.titulo.trim() == ''|| this.principio.titulo==null){
    //   this.snack.open("El título es obligatorio!!",'',{
    //     duration : 2000
    //   })
    //   return;
    // }
    // this.user = localStorage.getItem('user');
    var objeto = JSON.stringify(this.user);
    console.log(objeto)
    // this.userId = objeto.id;
    console.log(this.userId)
    this.evaluarService.agregarEvaluaciones(this.evaluacion).subscribe(
      (dato: any) => {
        this.evaluacion.titulo = '';
        this.evaluacion.descripcion = '';
        this.evaluacion.url = '';
        this.evaluacion.activo = '';
        this.evaluacion.comentario = '';
        this.evaluacion.usuario = this.user;
        console.log(this.evaluacion);
        Swal.fire('Evaluacion agregada', 'La evaluación ha sido agregada con exito', 'success');
      }, (error) => {
        console.log(error);
        Swal.fire('Error!!', 'Error al guardar la evaluación', 'error')
      }
    )
    // this.evaluarService.agregarPrincipioEvaluacion(this.evaluacion).subscribe(
    //   (dato:any)=>{
    //     this.evaluacion.titulo = '';
    //     this.evaluacion.descripcion = '';
    //     this.evaluacion.url = '';
    //     this.evaluacion.activo = '';
    //     this.evaluacion.comentario = '';
    //     Swal.fire('Evaluacion agregada','La evaluación ha sido agregada con exito','success');
    //   },(error)=>{
    //     console.log(error);
    //     Swal.fire('Error!!','Error al guardar la evaluación', 'error')
    //   }
    // )
  }


}
