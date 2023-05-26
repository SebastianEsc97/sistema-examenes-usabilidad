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
  valorFinal = 0;
  promedio = 0;
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
        for (let i = 0; i < this.principios.length; i++) {
          for (let j = 0; j < this.principioEvaluaciones.length; j++) {
            console.log(this.principios[i].principioId);
            console.log(this.principioEvaluaciones[j].principio.principioId);
            if (this.principios[i].principioId === this.principioEvaluaciones[j].principio.principioId) {
              this.respuestas.push(this.principios[i]);
              this.valoresFinales.push(this.principioEvaluaciones[j].respuesta);
            }
          }
        }
        console.log(this.respuestas);
        console.log(this.valoresFinales);
        this.valorFinal = this.valoresFinales.reduce((total: any, numero: any) => total + numero, 0);
        this.promedio = (this.valorFinal / this.valoresFinales.length) * 10;
        console.log(this.promedio);
        this.pdf(evaluacionId);
      }, (error) => {
        console.log(error)
        Swal.fire('Error!!', 'Error al cargar las categorias', 'error')
      }
    )


  }
  pdf(evaluacionId: string) {
    this.evaluarService.obtenerEvaluacion(evaluacionId).subscribe((data: any) => {
      this.evaluacion = data;
      console.log(this.promedio);
      console.log(this.evaluacion);
      console.log(this.evaluacion.usuario.nombre);

      const pdfDefinition: any = {
        content: [
          {
            columns: [
              {
                text: this.evaluacion.titulo,
                style: 'header',
                alignment: 'bottom',
                verticalAlignment: 'bottom',
                fontSize: 15,
                bold: true
              },
              {
                text: this.promedio + '%',
                style: 'header',
                alignment: 'justify',
                fontSize: 50,
                color: this.promedio < 50 ? 'red' : 'blue'
              }
            ]

          }, '\n',
          {
            text: '', canvas: [{ type: 'line', x1: 0, y1: 10, x2: 595.28, y2: 10, lineWidth: 3 }]
          },
          {
            text: 'La usabilidad web se refiere a la facilidad con la que los usuarios pueden interactuar con un sitio web y lograr sus objetivos de manera eficiente y satisfactoria. Se trata de diseñar y desarrollar interfaces web que sean intuitivas, accesibles y que brinden una experiencia positiva al usuario.', alignment: 'justify'
          },
          {
            text: '\nLa importancia de evaluar la usabilidad web en las distintas páginas radica en varios aspectos:', style: 'header', fontSize: 15, bold: true
          },
          {
            ol: [
              'Experiencia del usuario: La usabilidad web influye directamente en la experiencia del usuario. Si un sitio web es difícil de navegar, confuso o presenta obstáculos para completar tareas, los usuarios se sentirán frustrados y es probable que abandonen el sitio. Por otro lado, si un sitio web es fácil de usar, los usuarios se sentirán más satisfechos y es más probable que vuelvan y recomienden el sitio a otros.',
              'Cumplimiento de objetivos: Los sitios web generalmente tienen objetivos específicos, como vender productos, brindar información o permitir la interacción con servicios. Evaluar la usabilidad web ayuda a garantizar que los usuarios puedan alcanzar estos objetivos de manera eficiente. Una buena usabilidad ayuda a reducir obstáculos y facilita a los usuarios encontrar lo que están buscando, realizar compras o completar formularios, lo cual contribuye al éxito del sitio web.',
              'Retención de usuarios:  Los usuarios tienen muchas opciones en línea, y si un sitio web no satisface sus necesidades o les resulta complicado, es probable que abandonen y busquen alternativas. Evaluar y mejorar la usabilidad web ayuda a retener a los usuarios al brindarles una experiencia agradable y efectiva, lo que puede generar fidelidad a largo plazo.',
              'Mejora del posicionamiento en los motores de búsqueda:  Los motores de búsqueda, como Google, consideran la usabilidad web como un factor importante para determinar el posicionamiento de un sitio web en los resultados de búsqueda. Si un sitio web tiene una buena usabilidad, es más probable que los usuarios pasen más tiempo en él, lo compartan en redes sociales y vuelvan a visitarlo. Estos factores pueden influir positivamente en el posicionamiento orgánico del sitio.'
            ],
            alignment: 'justify'
          },
          {
            text: '\nEvaluación realizada por: ' + this.evaluacion.usuario.nombre +' '+ this.evaluacion.usuario.apellido, style: 'header', fontSize: 15, bold: true
          },
          {
            text: '\n' + this.evaluacion.usuario.descripcion, style: 'subheader'
          },
          {
            text: '\nURL de la página web a la cual se le realizó la evaluación:', fontSize: 15, bold: true
          },
          {
            text: '\nEnlace al sitio web',
            link: this.evaluacion.url,
            style: 'subheader',
            decoration: 'underline',
            color: 'blue',
            bold: true
          },
          {
            text: '\nDescripción de la página brindada por el experto evaluador:', fontSize: 15, bold: true
          },
          {
            text: '\n'+this.evaluacion.descripcion, style: 'subheader'
          },
          {
            text: '\nResultados proporcionados por el experto evaluador:', style: 'header', fontSize: 15, bold: true
          },
          {
            style: 'table',
            table: {
              widths: ['*', '*', '*', '*'],
              body: (() => {
                const tableRows = [['Principio', 'Descripción', 'Resultado', 'Comentario']];

                for (let i = 0; i < this.respuestas.length; i++) {
                  const aux = [this.respuestas[i].titulo, this.respuestas[i].descripcion, this.principioEvaluaciones[i].respuesta, this.principioEvaluaciones[i].comentario];
                  tableRows.push(aux);
                }

                return tableRows;
              })()
            }
          },
          {
            text:'\nComentarios adicionales', style: 'header', fontSize: 15, bold: true
          },
          {
            text:'\n' + this.evaluacion.comentario, style: 'subheader'
          }


        ],
        margin: [20, 20, 20, 20]
      }
      this.respuestas = [];
      this.valoresFinales = [];
      this.valorFinal = 0;
      this.promedio = 0;
      const pdf = pdfMake.createPdf(pdfDefinition);
      pdf.open();
    })
  }
}









