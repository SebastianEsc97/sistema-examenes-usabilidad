import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { PrincipioService } from 'src/app/services/principio.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-principios',
  templateUrl: './add-principios.component.html',
  styleUrls: ['./add-principios.component.css']
})
export class AddPrincipiosComponent implements OnInit {

  principio = {
    titulo: '',
    descripcion: ''
  }
  constructor(private principioService: PrincipioService, private snack: MatSnackBar, private router: Router) { }

  ngOnInit(): void {
  }

  formSubmit() {
    if (this.principio.titulo.trim() == '' || this.principio.titulo == null) {
      this.snack.open("El título es obligatorio!!", '', {
        duration: 2000
      })
      return;
    }
    this.principioService.agregarPrincipio(this.principio).subscribe(
      (dato: any) => {
        this.principio.titulo = '';
        this.principio.descripcion = '';
        Swal.fire('Principio agregado', 'El principio ha sido agregado con exito', 'success');
        this.router.navigate(['/admin/principios'])
      }, (error) => {
        console.log(error);
        Swal.fire('Error!!', 'Error al guardar el principio', 'error')
      }
    )
  }
}
