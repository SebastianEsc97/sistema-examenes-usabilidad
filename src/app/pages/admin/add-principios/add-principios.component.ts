import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { PrincipioService } from 'src/app/services/principio.service';
import Swal from 'sweetalert2';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-principios',
  templateUrl: './add-principios.component.html',
  styleUrls: ['./add-principios.component.css']
})
export class AddPrincipiosComponent implements OnInit {

  titulo = new FormControl('', Validators.required);
  descripcion = new FormControl('', Validators.required);
  

  principio = {
    titulo: '',
    descripcion: ''
  }
  constructor(private principioService: PrincipioService, private snack: MatSnackBar, private router: Router) { }

  ngOnInit(): void {
  }

  formSubmit() {
    if (this.principio.titulo.trim() == '' || this.principio.titulo == null) {
      this.snack.open("El título es obligatorio!!", 'Aceptar', {
        duration: 2000
      })
      return;
    }
    this.principioService.agregarPrincipio(this.principio).subscribe(
      (dato: any) => {
        this.principio.titulo = '';
        this.principio.descripcion = '';
        Swal.fire('Principio agregado', 'El principio ha sido agregado con exito', 'success').then (function () { window.location.href ="/admin-dash/principios"});
        this.router.navigate(['/admin/principios'])
      }, (error) => {
        console.log(error);
        Swal.fire('Error!!', 'Error al guardar el principio', 'error')
      }
    )
  }
}
