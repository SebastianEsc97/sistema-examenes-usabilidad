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
  constructor(private EvaluarService: EvaluarService, private loginService: LoginService) { }
  ngOnInit(): void {
    this.user = this.loginService.getUserId();
    this.EvaluarService.obtenerEvaluacionPorUsuario(this.user).subscribe(
      (data: any) => {
        this.evaluaciones = data;
        console.log(data);
      }, (error) => {
        Swal.fire('Error!!', 'Error al cargar las evaluaciones', 'error')
      }
    )
  }
}
