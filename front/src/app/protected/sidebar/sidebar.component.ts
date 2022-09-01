import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
// import { menuItem } from 'src/app/auth/interfaces/interfaces';

export interface menuItem{
  ruta:string;
  nombre:string
}
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {

  constructor(private router: Router) { }

  isHomeRoute() {
    // if(this.router.url == this.router.url){
    //   this.router.navigateByUrl('#')
    // }
  }
  menuItems:menuItem[]=[
    {
      ruta:'/dashboard/solicitud',
      nombre:'Solicitud Servicio'
    },
    {
      ruta:'/dashboard/seguimiento',
      nombre:'Seguimiento a Servicio'
    },
    {
      ruta:'/dashboard/misPerros',
      nombre:'Mis Mascotas'
    },
    {
      ruta:'/dashboard/historial',
      nombre:'Historial'
    },
    {
      ruta:'/dashboard/soporte',
      nombre:'Soporte'
    }

  ]
}
