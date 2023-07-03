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
import { FormControl } from '@angular/forms';




@Component({
  selector: 'app-experto-g-reporte',
  templateUrl: './experto-g-reporte.component.html',
  styleUrls: ['./experto-g-reporte.component.css']
})
export class ExpertoGReporteComponent implements OnInit {
  user: any = null;
  control = new FormControl();
  filtro: any;
  evaluaciones: any = [];
  evaluacionesNombre: any = [];
  evaluacion: any = null;
  principioEvaluaciones: any = [];
  principios: any = [];
  evaluacionId = 0;
  respuestas: any = [];
  respuestas2: any = [];
  valoresFinales: any = [];
  valorFinal = 0;
  promedio = 0;
  activos: boolean[] = [];

  //datos del reporte 2
  promedios: any = [];
  principioEvaluaciones2: any = [];
  evaluaciones2: any = [];
  valoresGrafico: any = [];
  grafico = {
    fecha: new Date(),
    porcentaje: 0
  }
  valoresFinales2: any = [];
  valorFinal2 = 0;
  promedio2 = 0;
  promediosEvaluaciones: any = [];
  principios2: any = [];
  principiosFinales2: any = [];



  constructor(private evaluarService: EvaluarService, private loginService: LoginService, private principioService: PrincipioService) { }
  ngOnInit(): void {
    this.user = this.loginService.getUserId();
    this.evaluarService.obtenerEvaluacionPorUsuario(this.user).subscribe(
      (data: any) => {
        this.evaluaciones = data.filter((evaluacion: { activo: boolean }) => evaluacion.activo === false);
        this.evaluacionesNombre = this.evaluacion;
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

  buscar() {
    this.activos = [];
    // Filtrar la listaOriginal según el término de búsqueda
    this.evaluacionesNombre = this.evaluaciones.filter((item: any) => {
      // Aquí asumimos que 'item' es un objeto y que tiene una propiedad 'nombre' que deseamos filtrar
      return item.titulo.toLowerCase().includes(this.filtro.toLowerCase());
    });
  }

  guardarActivo(indice: number, event: boolean) {
    if (event != true) {
      event = false;
      //console.log(event);
      this.activos[indice] = event;
    } else {
      this.activos[indice] = event;
    }
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
            if (this.principios[i].principioId === this.principioEvaluaciones[j].principio.principioId) {
              if (this.principioEvaluaciones[j].estado) {
                this.respuestas.push(this.principios[i]);
                this.valoresFinales.push(this.principioEvaluaciones[j].respuesta);
                this.respuestas2.push(this.principioEvaluaciones[j]);
              }
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
      console.log(this.respuestas2);
      console.log(this.evaluacion.usuario.nombre);

      const pdfDefinition: any = {
        content: [
          {
            columns: [
              {
                text: this.evaluacion.titulo,
                style: 'header',
                width: '50%',
                alignment: 'bottom',
                verticalAlignment: 'bottom',
                fontSize: 15,
                bold: true
              },
              {
                text: this.promedio.toFixed(1) + '%',
                style: 'header',
                width: '50%',
                alignment: 'left',
                fontSize: 50,
                color: this.promedio < 50 ? 'red' : 'blue'
              }
            ]

          }, '\n',
          {
            text: 'Fecha de creación: ' + this.evaluacion.fecha, style: 'header', fontSize: 15, bold: true
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
            text: '\nEvaluación realizada por: ' + this.evaluacion.usuario.nombre + ' ' + this.evaluacion.usuario.apellido, style: 'header', fontSize: 15, bold: true
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
            text: '\n' + this.evaluacion.descripcion, style: 'subheader'
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
                  const aux = [this.respuestas[i].titulo, this.respuestas[i].descripcion, this.respuestas2[i].respuesta, this.respuestas2[i].comentario];
                  tableRows.push(aux);
                }

                return tableRows;
              })()
            }
          },
          {
            text: '\nComentarios adicionales', style: 'header', fontSize: 15, bold: true
          },
          {
            text: '\n' + this.evaluacion.comentario, style: 'subheader'
          }


        ],
        margin: [20, 20, 20, 20]
      }
      this.respuestas = [];
      this.valoresFinales = [];
      this.valorFinal = 0;
      this.promedio = 0;
      this.respuestas2 = [];
      const pdf = pdfMake.createPdf(pdfDefinition);
      pdf.open();
    })
  }

  reporteGeneral() {
    console.log(this.evaluacionesNombre)
    if (this.evaluacionesNombre === null) {
      this.evaluacionesNombre = this.evaluaciones
      console.log(this.evaluacionesNombre)
    }
    console.log(this.evaluacionesNombre);
    const promises = [];
    if (this.activos.length > 0) {
      for (let i = 0; i < this.evaluacionesNombre.length; i++) {
        const promise = this.evaluarService.obtenerPrincipioEvaluacionxEvaluacion(this.evaluacionesNombre[i].evaluacionId).toPromise();
        promises.push(promise);
        promise.then((data: any) => {
          console.log(data);
          for (let j = 0; j < data.length; j++) {
            if (this.activos[i]) {
              this.principioEvaluaciones2.push(data[j]);
            }
          }
        }).catch((error) => {
          console.log(error);
          Swal.fire('Error!!', 'Error al cargar las categorias', 'error');
        });
        if (this.activos[i]) {
          this.evaluaciones2.push(this.evaluacionesNombre[i]);
        }
      }

      Promise.all(promises).then(() => {
        this.generarPdf2();
      });
    } else {
      Swal.fire('Error!!', 'Debe seleccionar al menos una evaluación', 'error');
    }

  }



  generarPdf2() {
    for (let i = 0; i < this.evaluaciones2.length; i++) {
      for (let j = 0; j < this.principioEvaluaciones2.length; j++) {
        if (this.evaluaciones2[i].evaluacionId === this.principioEvaluaciones2[j].evaluacion.evaluacionId) {
          if (this.principioEvaluaciones2[j].respuesta > 0) {
            this.valoresFinales2.push(this.principioEvaluaciones2[j].respuesta)
          }
        }
      }
      for (let i = 0; i < this.principioEvaluaciones2.length; i++) {
        let existe = false; // Bandera para verificar si el elemento ya está en la lista
        for (let j = 0; j < this.principios2.length; j++) {
          if (this.principios2[j] === this.principioEvaluaciones2[i].principio.principioId) {
            existe = true; // El elemento ya está presente en la lista
            break;
          }
        }
        if (!existe) {
          this.principios2.push(this.principioEvaluaciones2[i].principio.principioId);
        }
      }

      console.log(this.principiosFinales2);
      console.log(this.principios);
      console.log(this.principios2);
      console.log(this.valoresFinales2);
      this.valorFinal2 = this.valoresFinales2.reduce((total: any, numero: any) => total + numero, 0);
      this.promedio2 = (this.valorFinal2 / this.valoresFinales2.length) * 10;
      this.promediosEvaluaciones.push(this.promedio2);
      this.valoresFinales2 = [];
    }
    console.log(this.principioEvaluaciones2);
    console.log(this.evaluaciones2);
    console.log(this.promediosEvaluaciones);


    const pdfDefinition: any = {
      content: [
        {
          text: 'Reporte general',
          style: 'header',
          width: '70%',
          alignment: 'center',
          verticalAlignment: 'center',
          fontSize: 30,
          bold: true
        },
        {
          text: '\n\nExperto evaluador: ' + this.evaluaciones2[0].usuario.nombre + ' ' + this.evaluaciones2[0].usuario.apellido,
          fontSize: 17,
          alignment: 'justify'
        },
        '\n',
        {
          text: '"' + this.evaluaciones2[0].usuario.descripcion + '"\n',
          fontSize: 15,
          alignment: 'justify'
        },'\n',
        {
          text: '\n',
          style: 'table',
          table: {
            widths: ['*', '*', '*', '*'],
            body: (() => {
              const tableRows = [['Evaluación No.', 'Fecha de Creación evaluación', 'Promedio']];

              for (let i = 0; i < this.evaluaciones2.length; i++) {
                const aux = [i + 1, this.evaluaciones2[i].fecha, this.promediosEvaluaciones[i] + '%'];
                tableRows.push(aux);
              }

              return tableRows;
            })()
          }
        },
        '\n',
        {
          text: 'Datos Adicionales de las evaluaciones:',
          fontSize: 20
        },
      ]
    };

    for (let i = 0; i < this.evaluaciones2.length; i++) {
      pdfDefinition.content.push(
        {
          text: [
            { text: i + 1 + '. ' + this.evaluaciones2[i].titulo, bold: true, fontSize: 17 },
            '\n',
            { text: 'Fecha creación: ', bold: true },
            this.evaluaciones2[i].fecha,
            '\n',
            { text: 'Descripción: ', bold: true },
            this.evaluaciones2[i].descripcion,
            '\n',
            { text: 'Comentarios de la evaluación: ', bold: true },
            this.evaluaciones2[i].comentario,
            '\n\n'
          ]
        }
      );
    }

    pdfDefinition.content.push(
      {
        text: 'Principios usados dentro de las evaluaciones: ',
        fontSize: 20,
        bold: true
      }
    );

    for (let i = 0; i < this.principios.length; i++) {
      for (let j = 0; j < this.principios2.length; j++) {
        if (this.principios2[j] === this.principios[i].principioId) {
          pdfDefinition.content.push(
            '\n',
            {
              text: [
                { text: i + 1 + '. ' + this.principios[i].titulo, bold: true, fontSize: 17 },
                '\n',
                this.principios[i].descripcion,
                '\n'
              ]
            },'\n',
            {
              text: 'Tabla de valores: ',
              fontSize: 20,
              bold: true
            },'\n');
          for (let k = 0; k < this.evaluaciones2.length; k++) {
            for (let l = 0; l < this.principioEvaluaciones2.length; l++) {
              if (this.evaluaciones2[k].evaluacionId === this.principioEvaluaciones2[l].evaluacion.evaluacionId) {
                if (this.principioEvaluaciones2[l].principio.principioId === this.principios[i].principioId) {
                  if (this.principioEvaluaciones2[l].respuesta > 0) {
                    pdfDefinition.content.push(

                      {
                        style: 'table',
                        table: {
                          widths: ['*', '*', '*', '*'],
                          body: (() => {
                            const tableRows = [['Evaluación No.', 'Valor Respuesta', 'Comentarios']];
                            const aux = [k + 1, this.principioEvaluaciones2[l].respuesta, this.principioEvaluaciones2[l].comentario];
                            tableRows.push(aux);
                            return tableRows;
                          })()
                        }
                      });
                  }
                }
              }
            }
          }
        }
      }
    }




    const pdf = pdfMake.createPdf(pdfDefinition);
    pdf.open();

    this.activos = [];
    this.principioEvaluaciones2 = [];
    this.evaluaciones2 = [];
    this.promediosEvaluaciones = [];
    console.log(this.principioEvaluaciones2);
    console.log(this.evaluaciones2);
    console.log(this.promediosEvaluaciones);
  }
}
