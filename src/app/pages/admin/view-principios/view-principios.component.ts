import { Component, OnInit } from '@angular/core';
import { PrincipioService } from 'src/app/services/principio.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-principios',
  templateUrl: './view-principios.component.html',
  styleUrls: ['./view-principios.component.css']
})
export class ViewPrincipiosComponent implements OnInit {

  principios: any = [


  ]
  constructor(private principioService: PrincipioService) { }
  ngOnInit(): void {
    this.principioService.listarPrincipios().subscribe(
      (data: any) => {
        this.principios = data;
        console.log(this.principios)
      }, (error) => {
        console.log(error)
        Swal.fire('Error!!', 'Error al cargar las categorias', 'error')
      }
    )
  }

}
