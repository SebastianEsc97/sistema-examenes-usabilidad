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

  principios: any = []

  evaluacion = {
    titulo: '',
    descripcion: '',
    url: '',
    activo: true,
    comentario: '',
    usuario: {
      id: ''
    }
  }
  constructor(private principioService: PrincipioService, private evaluarService: EvaluarService, private loginService: LoginService) { }
  ngOnInit(): void {

    this.evaluacion.usuario.id = JSON.stringify(this.loginService.getUserId())
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
    // if (this.principio.titulo.trim() == '' || this.principio.titulo == null) {
    //   this.snack.open("El título es obligatorio!!", '', {
    //     duration: 2000
    //   })
    //   return;
    // }
    this.evaluarService.agregarEvaluacion(this.evaluacion).subscribe(
      (dato: any) => {
        this.evaluacion.titulo = '';
        this.evaluacion.descripcion = '';
        this.evaluacion.url = '';
        this.evaluacion.comentario = '';
        Swal.fire('Principio agregado', 'El principio ha sido agregado con exito', 'success');
      }, (error) => {
        console.log(error);
        Swal.fire('Error!!', 'Error al guardar el principio', 'error')
      }
    )
  }
}
