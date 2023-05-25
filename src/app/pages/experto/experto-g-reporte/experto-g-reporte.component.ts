import { LoginService } from 'src/app/services/login.service';
import { EvaluarService } from './../../../services/evaluar.service';
import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import * as pdfMake from "pdfmake/build/pdfmake";
import * as pdfFonts from "pdfmake/build/vfs_fonts";
import { PrincipioService } from 'src/app/services/principio.service';
(pdfMake as any).vfs = pdfFonts.pdfMake.vfs;



@Component({
  selector: 'app-experto-g-reporte',
  templateUrl: './experto-g-reporte.component.html',
  styleUrls: ['./experto-g-reporte.component.css']
})
export class ExpertoGReporteComponent implements OnInit {
  user: any = null;
  evaluaciones: any = []
  evaluacion: any = null;
  principioEvaluaciones: any = [];
  principios: any = [];
  evaluacionId = 0;
  respuestas: any = [];
  valoresFinales: any = [];
  valorFinal= 0;
  promedio= 0;
  constructor(private evaluarService: EvaluarService, private loginService: LoginService, private principioService: PrincipioService) { }
  ngOnInit(): void {
    this.user = this.loginService.getUserId();
    this.evaluarService.obtenerEvaluacionPorUsuario(this.user).subscribe(
      (data: any) => {
        this.evaluaciones = data.filter((evaluacion: { activo: boolean }) => evaluacion.activo === false);

        console.log(data);
      }, (error) => {
        Swal.fire('Error!!', 'Error al cargar las evaluaciones', 'error')
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

  generarPDF(evaluacionId: string) {
    this.evaluarService.obtenerPrincipioEvaluacionxEvaluacion(evaluacionId).subscribe(
      (data: any) => {
        this.principioEvaluaciones = data;
        console.log(this.principioEvaluaciones);
        console.log(this.principios);
        for (const pe of this.principioEvaluaciones) {
          pe.respuesta = pe.respuesta || ''; // Asignar valor predeterminado si es nulo o indefinido
          pe.comentario = pe.comentario || ''; // Asignar valor predeterminado si es nulo o indefinido
        }
        for(let i = 0; i < this.principios.length; i++) {
          for(let j = 0; j < this.principioEvaluaciones.length; j++) {
            console.log(this.principios[i].principioId);
            console.log(this.principioEvaluaciones[j].principio.principioId);
            if(this.principios[i].principioId === this.principioEvaluaciones[j].principio.principioId) {
              this.respuestas.push(this.principios[i]);
              this.valoresFinales.push(this.principioEvaluaciones[j].respuesta);
            }
          }
        }
        console.log(this.respuestas);
        console.log(this.valoresFinales);
        this.valorFinal = this.valoresFinales.reduce((total: any, numero: any) => total + numero, 0);
        this.promedio = (this.valorFinal/this.valoresFinales.length) * 10;
        console.log(this.promedio);
        this.pdf(evaluacionId);
      }, (error) => {
        console.log(error)
        Swal.fire('Error!!', 'Error al cargar las categorias', 'error')
      }
    )


  }
  pdf(evaluacionId: string){
    this.evaluarService.obtenerEvaluacion(evaluacionId).subscribe((data: any) => {
      this.evaluacion = data;
      console.log(this.promedio);
      console.log(this.evaluacion);

      const pdfDefinition: any = {
        content: [
          {
            columns: [
              {
                text: this.evaluacion.titulo, style: 'header',alignment: 'bottom', verticalAlignment: 'bottom', fontSize:15
              },
              {
                text: this.promedio+'%', style: 'header',alignment: 'justify', fontSize:50
              }
            ]

          },'\n',
          {
            text: '', canvas: [{ type: 'line', x1: 0, y1: 10, x2: 595.28, y2: 10, lineWidth: 3 }]
          },
          {
            text: this.evaluacion.descripcion, style: 'subheader'
          },
          {
            text: this.evaluacion.url, style: 'subheader'
          }
        ]
      }
      this.valoresFinales = [];
      this.valorFinal = 0;
      this.promedio = 0;
      const pdf = pdfMake.createPdf(pdfDefinition);
      pdf.open();
    })
  }
}









