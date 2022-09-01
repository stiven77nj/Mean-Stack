import { Component, Input, OnInit } from '@angular/core';
import { Perro } from 'src/app/auth/interfaces/interfaces';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'app-agregar-perro',
  templateUrl: './agregar-perro.component.html',
  styleUrls: ['./agregar-perro.component.css']
})
export class AgregarPerroComponent{
  @Input('nuevoPerro') np:Perro={
    nombre:'Pepe',
    edad:5,
    raza:'Chandito',
    preferencias:'Mimir',
    vacunas:'Rabia'
  }
  constructor(private authService:AuthService) { }

  get Perro(){
    return this.authService.Perros;
  }
  agregarPerro(){

    console.log(this.np);
    this.authService.agregar_perro(this.np);
    this.np={
      nombre:'',
      edad:0,
      raza:'',
      preferencias:'',
      vacunas:'',
    }
  }
}
