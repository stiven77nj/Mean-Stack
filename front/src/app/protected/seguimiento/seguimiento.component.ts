import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-seguimiento',
  templateUrl: './seguimiento.component.html',
  styleUrls: ['./seguimiento.component.css']
})
export class SeguimientoComponent implements OnInit {
  flag=false;
  datos=true;
  constructor() { }

  ngOnInit(): void {
  }

  desplegar(){
    this.flag=!this.flag
  }
  cambiarDatos(){
    this.datos=!this.datos
  }
}
