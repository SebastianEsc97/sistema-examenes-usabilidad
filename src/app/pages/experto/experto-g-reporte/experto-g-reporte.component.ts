import { LoginService } from 'src/app/services/login.service';
import { EvaluarService } from './../../../services/evaluar.service';
import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import * as pdfMake from "pdfmake/build/pdfmake";
import * as pdfFonts from "pdfmake/build/vfs_fonts";
(pdfMake as any).vfs = pdfFonts.pdfMake.vfs;



@Component({
  selector: 'app-experto-g-reporte',
  templateUrl: './experto-g-reporte.component.html',
  styleUrls: ['./experto-g-reporte.component.css']
})
export class ExpertoGReporteComponent implements OnInit {
  user: any = null;
  evaluaciones: any = []
  constructor(private EvaluarService: EvaluarService, private loginService: LoginService) { }
  ngOnInit(): void {
    this.user = this.loginService.getUserId();
    this.EvaluarService.obtenerEvaluacionPorUsuario(this.user).subscribe(
      (data: any) => {
        this.evaluaciones = data.filter((evaluacion: { activo: boolean }) => evaluacion.activo === false);

        console.log(data);
      }, (error) => {
        Swal.fire('Error!!', 'Error al cargar las evaluaciones', 'error')
      }
    )
  }

  generarPDF(url: string){

  }

}









