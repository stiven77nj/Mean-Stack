import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/services/auth.service';
import { Usuario , Perro} from '../../auth/interfaces/interfaces';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-mis-perros',
  templateUrl: './mis-perros.component.html',
  styleUrls: ['./mis-perros.component.css']
})
export class MisPerrosComponent implements OnInit{

  perros: Perro[]=[];

  constructor(private authService:AuthService ) { }

  ngOnInit(): void {

    this.authService.listarPerro().subscribe(perros => this.perros = perros);

  }
  p(){

    console.log(Object.values(this.perros))
  }





}


