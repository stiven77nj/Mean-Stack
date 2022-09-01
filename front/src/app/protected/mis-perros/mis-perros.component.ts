import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/services/auth.service';
import { Usuario , Perro} from '../../auth/interfaces/interfaces';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-mis-perros',
  templateUrl: './mis-perros.component.html',
  styleUrls: ['./mis-perros.component.css']
})
export class MisPerrosComponent{


  constructor(private authService:AuthService ) { }

  get Perro(){
    return this.authService.Perros;
  }
  // np:Perro={
  //   nombre:'Pepe',
  //   edad:5,
  //   raza:'Chandito',
  //   preferencias:'Mimir',
  //   vacunas:'Rabia'
  // }





}


