import { Component, OnInit, ViewChild, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { MarcadorColor } from 'src/app/auth/interfaces/interfaces';
import { AuthService } from 'src/app/auth/services/auth.service';
import { AgregarPerroComponent } from '../agregar-perro/agregar-perro.component';

import { MapaMarcadorComponent } from '../mapa-marcador/mapa-marcador.component';

@Component({
  selector: 'app-solicitud',
  templateUrl: './solicitud.component.html',
  styleUrls: ['./solicitud.component.css']
})
export class SolicitudComponent implements AfterViewInit {
  @ViewChild(MapaMarcadorComponent) mark:any;

  get Perros(){
    return this.AuthService.Perro
  }
  loading=true;
  paseo_pers=true;
  paseo_grupal=false;
  flag=true;
  flag2=false;
  constructor(private AuthService:AuthService,private cd: ChangeDetectorRef) {

   }
  marcadores: MarcadorColor[]=[]
  ngAfterViewInit(): void {
    this.marcadores=this.mark.marcadores;
    this.loading=false;
    this.cd.detectChanges();


  }
  numero:number=30;
  base:number=30;


  acumular(number:number){
      if (this.numero >= 0 && this.numero <=120){

        this.numero+=number;
      }
      if (this.numero == -30){
        this.numero=0
      }
      if (this.numero == 150){
        this.numero=120
      }




  }

  irPersonalizado(){
    this.paseo_pers=true;
    this.paseo_grupal=false;
  }
  irGrupal(){
    this.paseo_pers=false;
    this.paseo_grupal=true;
  }

    // this.flag=this.paseo_pers

    // this.flag2=this.paseo_gurpa

}

