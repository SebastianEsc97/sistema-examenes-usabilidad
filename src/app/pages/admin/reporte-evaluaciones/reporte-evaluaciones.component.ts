import { PrincipioService } from './../../../services/principio.service';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import Chart, { ChartType, ChartOptions, ChartTypeRegistry } from 'chart.js/auto';
import { EvaluarService } from 'src/app/services/evaluar.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-reporte-evaluaciones',
  templateUrl: './reporte-evaluaciones.component.html',
  styleUrls: ['./reporte-evaluaciones.component.css']
})
export class ReporteEvaluacionesComponent implements OnInit {
  ctx: CanvasRenderingContext2D | null = null;
  ctx2: CanvasRenderingContext2D | null = null;
  ctx3: CanvasRenderingContext2D | null = null;
  evaluaciones: any = [];
  noTerminadas: any = [];
  terminadas: any = [];
  evaluacionesPorFecha: any = [];
  principios: any = [];

  constructor(private evaluarService: EvaluarService, private PrincipioService: PrincipioService) {}

  ngOnInit(): void {
    var canvas = document.getElementById('myChart') as HTMLCanvasElement;
    this.ctx = canvas.getContext('2d');
    var canvas2 = document.getElementById('myChart2') as HTMLCanvasElement;
    this.ctx2 = canvas2.getContext('2d');
    var canvas3 = document.getElementById('myChart3') as HTMLCanvasElement;
    this.ctx3 = canvas3.getContext('2d');
    this.PrincipioService.listarPrincipios().subscribe(
      (data: any) => {
        this.principios = data
        console.log(this.principios)

      }
    )
    this.evaluarService.listarEvaluaciones().subscribe(
      (data: any) => {
	          this.evaluaciones = data
        this.noTerminadas = data.filter((evaluacion: { activo: boolean }) => evaluacion.activo === true);
        console.log(this.evaluaciones);
        console.log(this.noTerminadas);
        var aux = this.evaluaciones.length - this.noTerminadas.length;
        this.terminadas.push(aux);
        this.terminadas.push(this.noTerminadas.length);
        console.log(this.terminadas);
        this.evaluaciones = data;
        this.evaluacionesPorFecha = this.obtenerEvaluacionesUltimosMeses(6);
        console.log(this.evaluacionesPorFecha);
        this.crearGrafico1();
        this.crearGrafico2();
      },
      (error) => {
        Swal.fire('Error!!', 'Error al cargar las evaluaciones', 'error');
      }
    );
  }

  obtenerEvaluacionesUltimosMeses(numMeses: number): any[] {
    const evaluacionesPorFecha = [];

    // Obtener la fecha actual
    const fechaActual = new Date();

    // Recorrer los últimos numMeses meses
    for (let i = numMeses - 1; i >= 0; i--) {
      const fecha = new Date();
      fecha.setMonth(fechaActual.getMonth() - i);

      // Filtrar las evaluaciones por mes
      const evaluacionesMes = this.evaluaciones.filter((evaluacion: { fecha: string }) => {
        const fechaEvaluacion = new Date(evaluacion.fecha);
        return fechaEvaluacion.getMonth() === fecha.getMonth() && fechaEvaluacion.getFullYear() === fecha.getFullYear();
      });

      evaluacionesPorFecha.push({
        fecha: fecha.toLocaleString('default', { month: 'long', year: 'numeric' }),
        cantidad: evaluacionesMes.length,
      });
    }

    return evaluacionesPorFecha;
  }

  crearGrafico1(): void {
    if (this.ctx) {
      const data = {
        labels: ['Finalizadas', 'Sin finalizar'],
        datasets: [{
          label: 'Evaluaciones',
          data: [this.terminadas[0], this.terminadas[1]],
          backgroundColor: ['rgba(0, 123, 255, 0.5)', 'rgba(255, 99, 132, 0.5)'],
          borderColor: ['rgba(0, 123, 255, 1)', 'rgba(255, 99, 132, 1)'],
          borderWidth: 1
        }]
      };

      const myChart = new Chart(this.ctx, {
        type: 'pie',
        data: data,
        options: {
          responsive: true,
          plugins: {
            legend: {
              position: 'top',
            },
            title: {
              display: true,
              text: 'Evaluaciones'
            }
          }
        }
      });
    } else {
      console.error('El contexto 2D no está disponible');
    }
  }

  crearGrafico2(): void {
    if (this.ctx2) {
      const labels = this.evaluacionesPorFecha.map((evaluacion: { fecha: string }) => evaluacion.fecha);
      const data = this.evaluacionesPorFecha.map((evaluacion: { cantidad: number }) => evaluacion.cantidad);

      const chartData = {
        labels: labels,
        datasets: [
          {
            label: 'Evaluaciones por fecha',
            data: data,
            backgroundColor: 'rgba(0, 123, 255, 0.5)',
            borderColor: 'rgba(0, 123, 255, 1)',
            borderWidth: 1,
          },
        ],
      };

      console.log(chartData);

      const myChart = new Chart(this.ctx2, {
        type: 'bar',
        data: chartData,
        options: {
          indexAxis: 'y',
          responsive: true,
          scales: {
            x: {
              beginAtZero: true,
            },
          },
        } as ChartOptions<"bar">,
      });
    } else {
      console.error('El contexto 2D no está disponible');
    }
  }
}
